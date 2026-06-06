---
name: jira-sync
description: Re-sync the tasks/jira/ mirror from Jira (source of truth) — pulls all CRM + KAN tickets, regenerates markdown + README, reports what changed
---

# Jira Sync Skill

`tasks/jira/` is a **read-only mirror** of Jira, which is the source of truth. This skill
regenerates that mirror from the live Jira instance so tickets can be cross-referenced
(`[[wikilinks]]`) from venture data. Never edit ticket files by hand — they are overwritten
on every sync.

## When to use

- User says "do a jira sync", "re-sync jira", "pull latest tickets", or similar.
- Before any work that depends on current ticket status (pipeline reviews, planning).

## How it works

A self-contained Python script, `tasks/jira/sync.py`, does the whole job:

1. Loads `JIRA_BASE_URL`, `JIRA_EMAIL`, `JIRA_API_TOKEN` from an env file.
2. Pulls every issue in projects **CRM** + **KAN** via the `/rest/api/3/search/jql`
   endpoint (the old `/search` endpoint is deprecated → HTTP 410).
3. Renders each issue to `tasks/jira/<KEY>-<slug>.md` (ADF → readable markdown for
   description + comments) and regenerates `tasks/jira/README.md` (the ticket index table).
4. Idempotent: re-running with no Jira changes yields no diff except `synced_at:`.

## Credentials

The API token lives in the **cs monorepo env**, not in this repo:

```
~/cs/monorepo/.env   →   JIRA_BASE_URL, JIRA_EMAIL, JIRA_API_TOKEN
```

Auth account: `mvbasug@kosmas.com.ph` (Marco Van Basug). The token is **never** committed —
`sync.py` reads it at runtime and embeds nothing.

## Run it

`Date.now()` is unavailable to the agent runtime, so pass today's date explicitly via `--stamp`
(use the `currentDate` from the session context):

```bash
# preview what's new without writing anything
python3 tasks/jira/sync.py --stamp <YYYY-MM-DD> --dry-run

# real sync (default env path is ~/cs/monorepo/.env)
python3 tasks/jira/sync.py --stamp <YYYY-MM-DD>

# custom env file
python3 tasks/jira/sync.py --stamp <YYYY-MM-DD> --env /path/to/.env
```

## After running — report & persist

1. **Summarize substantive changes** (not formatting): new tickets, status transitions,
   re-scoped summaries, assignee changes. Diff frontmatter vs `HEAD` to find them, e.g.:
   ```bash
   git diff --cached tasks/jira | grep -E '^[-+](status|assignee|summary):'
   ```
2. **Propagate signal to venture data.** A status change may warrant an update to a
   `ventures/*/data/` entity (e.g. a CRM lead moving to CONTRACTING). Surface these to the
   user; don't auto-edit venture files from a sync.
3. **Commit on a dedicated branch + PR** — PRs are the persistence mechanism. Conventional
   commit subject: `sync: Jira → tasks/jira (<date>)`. Put the change summary in the body.
   Co-author line per repo convention. Paste the PR URL back to the user.

## Notes / gotchas

- **New tickets** get a filename slug truncated to 60 chars; existing files keep their
  filename (the script maps `KEY → existing filename` so a re-slug never renames a file).
- The script faithfully mirrors Jira, including quirks like trailing spaces in summaries.
- ADF rendering improved over the original hand-render (proper paragraph/list breaks), so the
  first sync after adopting `sync.py` shows formatting churn on existing files. That's expected
  and is a one-time normalization.
- If you add a third Jira project, extend `PROJECTS` in `sync.py`.
