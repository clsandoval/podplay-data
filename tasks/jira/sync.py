#!/usr/bin/env python3
"""Jira -> tasks/jira mirror sync.

Jira is the source of truth; this script regenerates the local markdown mirror
under tasks/jira/ for in-repo cross-referencing. Idempotent: re-running with no
Jira changes produces no diff (except synced_at when --stamp is given).

Usage:
    python3 tasks/jira/sync.py [--env PATH] [--stamp YYYY-MM-DD] [--dry-run]

Auth comes from an env file (default: ~/cs/monorepo/.env) providing
JIRA_BASE_URL, JIRA_EMAIL, JIRA_API_TOKEN. See skills/jira-sync.md.
"""
import argparse, base64, json, os, re, sys, urllib.parse, urllib.request
from pathlib import Path

PROJECTS = ["CRM", "KAN"]
HERE = Path(__file__).resolve().parent
FIELDS = ("summary,status,priority,assignee,reporter,labels,issuetype,"
          "parent,created,updated,description,comment,duedate")


def load_env(path):
    env = {}
    p = Path(path).expanduser()
    if not p.exists():
        sys.exit(f"env file not found: {p}")
    for line in p.read_text().splitlines():
        line = line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        k, v = line.split("=", 1)
        env[k.strip()] = v.strip().strip('"').strip("'")
    for k in ("JIRA_BASE_URL", "JIRA_EMAIL", "JIRA_API_TOKEN"):
        if not env.get(k):
            sys.exit(f"{k} missing from {p}")
    return env


def fetch_issues(base, email, token):
    auth = base64.b64encode(f"{email}:{token}".encode()).decode()

    def get(url):
        r = urllib.request.Request(
            url, headers={"Authorization": f"Basic {auth}", "Accept": "application/json"})
        return json.load(urllib.request.urlopen(r))

    jql = f"project in ({','.join(PROJECTS)}) ORDER BY key ASC"
    nxt, issues = None, []
    while True:
        params = {"jql": jql, "fields": FIELDS, "maxResults": 100}
        if nxt:
            params["nextPageToken"] = nxt
        d = get(f"{base}/rest/api/3/search/jql?{urllib.parse.urlencode(params)}")
        issues += d.get("issues", [])
        nxt = d.get("nextPageToken")
        if d.get("isLast", True) or not nxt:
            break
    return issues


# --- ADF (Atlassian Document Format) -> plain text -------------------------
def adf_to_text(node):
    if node is None:
        return ""
    t = node.get("type")
    if t == "text":
        txt = node.get("text", "")
        for m in node.get("marks", []):
            if m.get("type") == "link":
                href = m.get("attrs", {}).get("href", "")
                txt = f"[{txt}]({href})"
        return txt
    if t == "hardBreak":
        return "\n"
    if t == "paragraph":
        return "".join(adf_to_text(c) for c in node.get("content", []))
    if t in ("bulletList", "orderedList"):
        out = []
        for i, item in enumerate(node.get("content", []), 1):
            bullet = "- " if t == "bulletList" else f"{i}. "
            body = "".join(adf_to_text(c) for c in item.get("content", [])).strip()
            out.append(bullet + body)
        return "\n".join(out)
    if t in ("heading",):
        return "".join(adf_to_text(c) for c in node.get("content", []))
    if t == "codeBlock":
        return "```\n" + "".join(adf_to_text(c) for c in node.get("content", [])) + "\n```"
    if t == "doc" or "content" in node:
        sep = "\n\n" if t in ("doc", None) else "\n"
        return sep.join(adf_to_text(c) for c in node.get("content", []))
    return ""


def render_adf(field):
    if not field:
        return ""
    return adf_to_text(field).strip()


def slugify(s, maxlen=60):
    s = s.lower()
    s = re.sub(r"[^a-z0-9]+", "-", s).strip("-")
    return s[:maxlen].rstrip("-")


def existing_filenames():
    """Map KEY -> existing filename so we never rename a file on re-sync."""
    m = {}
    for f in HERE.glob("*.md"):
        mm = re.match(r"((CRM|KAN)-\d+)-", f.name)
        if mm:
            m[mm.group(1)] = f.name
    return m


def short_date(iso):
    return iso[:10] if iso else ""


def render_ticket(issue, stamp):
    f = issue["fields"]
    key = issue["key"]
    base = os.environ["JIRA_BASE_URL"]
    assignee = (f.get("assignee") or {}).get("displayName") or ""
    reporter = (f.get("reporter") or {}).get("displayName") or ""
    parent = (f.get("parent") or {}).get("key") or ""
    labels = json.dumps(f.get("labels", []))
    fm = [
        "---",
        f"jira_key: {key}",
        f"jira_url: {base}/browse/{key}",
        f"project: {key.split('-')[0]}",
        "type: jira-issue",
        f"issue_type: {f['issuetype']['name']}",
        f"status: {f['status']['name']}",
        f"priority: {(f.get('priority') or {}).get('name','')}",
        f"assignee: {assignee}",
        f"reporter: {reporter}",
        f"labels: {labels}",
    ]
    if parent:
        fm.append(f"parent: {parent}")
    if f.get("duedate"):
        fm.append(f"due: {f['duedate']}")
    fm += [
        f"created: {f.get('created','')}",
        f"updated: {f.get('updated','')}",
        f"synced_at: {stamp}",
        "---",
    ]

    desc = render_adf(f.get("description")) or "_(no description)_"
    parts = ["\n".join(fm), "", f"# {key}: {f['summary']}", "",
             "## Description", "", desc, "", "## Comments", ""]
    comments = (f.get("comment") or {}).get("comments", [])
    if not comments:
        parts.append("_(no comments)_")
    else:
        for c in comments:
            author = (c.get("author") or {}).get("displayName", "Unknown")
            body = render_adf(c.get("body"))
            parts.append(f"### {author} — {short_date(c.get('created'))}")
            parts.append("")
            parts.append(body)
            parts.append("")
    return "\n".join(parts).rstrip() + "\n"


STATUS_NULL = {None, "", "—"}


def build_readme(issues, stamp, fnames):
    rows = []
    for i in issues:
        f = i["fields"]
        key = i["key"]
        assignee = (f.get("assignee") or {}).get("displayName") or "—"
        parent = (f.get("parent") or {}).get("key") or "—"
        due = f.get("duedate") or "—"
        summary = f["summary"].replace("|", "\\|")
        rows.append(
            f"| [{key}](./{fnames[key]}) | {key.split('-')[0]} | "
            f"{f['issuetype']['name']} | {f['status']['name']} | "
            f"{(f.get('priority') or {}).get('name','')} | {assignee} | "
            f"{due} | {parent} | {summary} |")
    counts = {p: sum(1 for i in issues if i["key"].startswith(p + "-")) for p in PROJECTS}
    head = f"""# Jira Sync — Source of Truth Mirror

Synced from `{os.environ['JIRA_BASE_URL']}` on {stamp}. Auth: `{os.environ['JIRA_EMAIL']}`.

Jira is the source of truth. This directory mirrors current ticket state for in-repo cross-referencing. Re-sync with `python3 tasks/jira/sync.py` (see `skills/jira-sync.md`).

## Projects

- **CRM** — Sales Pipeline ({counts['CRM']} tickets)
- **KAN** — Kosmas KAVC ({counts['KAN']} tickets)

## All tickets

| Key | Project | Type | Status | Priority | Assignee | Due | Parent | Summary |
|---|---|---|---|---|---|---|---|---|
"""
    return head + "\n".join(rows) + "\n"


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--env", default="~/cs/monorepo/.env")
    ap.add_argument("--stamp", required=True, help="sync date YYYY-MM-DD (Date.now unavailable to agent)")
    ap.add_argument("--dry-run", action="store_true")
    args = ap.parse_args()

    env = load_env(args.env)
    os.environ.update(env)
    issues = fetch_issues(env["JIRA_BASE_URL"], env["JIRA_EMAIL"], env["JIRA_API_TOKEN"])
    issues.sort(key=lambda i: (i["key"].split("-")[0], int(i["key"].split("-")[1])))

    fnames = existing_filenames()
    new_keys, status_changes = [], []
    for i in issues:
        key = i["key"]
        if key not in fnames:
            fnames[key] = f"{key}-{slugify(i['fields']['summary'])}.md"
            new_keys.append((key, i["fields"]["summary"]))

    print(f"Fetched {len(issues)} issues. New: {len(new_keys)}")
    for k, s in new_keys:
        print(f"  + {k}: {s}")

    if args.dry_run:
        return

    for i in issues:
        path = HERE / fnames[i["key"]]
        path.write_text(render_ticket(i, args.stamp))
    (HERE / "README.md").write_text(build_readme(issues, args.stamp, fnames))
    print(f"Wrote {len(issues)} ticket files + README.md")


if __name__ == "__main__":
    main()
