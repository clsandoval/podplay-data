# Migration Plan — podplay-data → kosmas umbrella content

Operationalizes spikes 001–003. Goal: restructure `podplay-data`'s content into the kosmas-umbrella shape **in place** (repo name unchanged) so live hermit deployments keep working while the agent gains multi-venture context.

Source of truth for the target shape: `.planning/spikes/002-layout-sketch/kosmas-data/`. This plan replays it on `main`.

## Prerequisites

1. **Live deployment awareness.** Hermit reads this repo every time the bot is invoked. During the migration window, agent calls will see a half-moved tree. Two mitigations:
   - Do all moves locally on a branch, push as one PR, merge atomically.
   - Pause non-urgent agent traffic during the merge if possible (manual ops decision).
2. **Existing uncommitted work** on `main` (per `git status`):
   - `M CLAUDE.md` — modified
   - `?? pricing/` — untracked
   - `?? skills/{consistency-check.md, discovery-call.md}` — untracked
   - `?? data/notes/sales/` — untracked
   - **Decision required:** commit or stash these to `main` BEFORE starting the migration branch, so the migration's diff is purely structural. Don't try to bundle in-flight content with the restructure — it makes review impossible.

## Output shape (target)

```
podplay-data/                     # repo name unchanged
├── CLAUDE.md                     # NEW — root identity, venture routing, skills index
├── general/
│   ├── company/overview.md       # NEW
│   ├── people/                   # 12 files, was data/team/
│   ├── clients/                  # empty for now
│   ├── templates/project-template.md  # was templates/project-template.md
│   └── vendors/                  # empty (promotion target)
├── skills/                       # 5 shared (ingestion, meeting-to-tickets, slack-file-reading, proposal-writing, discovery-call)
└── ventures/
    ├── podplay/                  # 100+ files, was repo root
    │   ├── CLAUDE.md             # MOVED+TRIMMED from current root CLAUDE.md
    │   ├── README.md             # NEW
    │   ├── dashboards/           # was dashboards/
    │   ├── data/                 # was data/ (minus team/, minus 2 cross-pollinated files)
    │   ├── pricing/              # was pricing/
    │   ├── skills/consistency-check.md  # was skills/consistency-check.md
    │   └── templates/            # was templates/ (bom-*, checklist-deployment)
    ├── podplay-distribution/README.md   # NEW
    ├── helios-pickleball-center/README.md  # NEW
    ├── digital-wallet/
    │   ├── README.md             # NEW
    │   ├── knowledge/digital-wallet.md     # was data/notes/digital-wallet.md
    │   └── data/vendors/magpie.md          # was data/vendors/magpie.md
    ├── pickleball-consulting/README.md  # NEW
    └── athlete-management/README.md     # NEW
```

## Execution steps

Branch name: `claude/kosmas-umbrella-migration`.

### Step 0 — clean slate on main

Resolve the uncommitted changes per Prerequisites #2 first. Then:

```bash
git checkout main && git pull
git checkout -b claude/kosmas-umbrella-migration
```

### Step 1 — scaffold new directories

```bash
mkdir -p general/{company,people,clients,templates,vendors}
mkdir -p ventures/{podplay-distribution,helios-pickleball-center,pickleball-consulting,athlete-management}
mkdir -p ventures/podplay
mkdir -p ventures/digital-wallet/{knowledge,data/vendors}
```

No commit yet — empty dirs.

### Step 2 — move files with `git mv` (preserves history)

**Critical:** use `git mv`, not `cp`. The spike used `cp` because it was a throwaway sandbox; the real migration must preserve git blame for the moved files. GitHub will display these as renames, not delete+add, when the rename similarity is above ~50%.

#### 2a. Promote team to general/people/

```bash
git mv data/team/* general/people/
rmdir data/team
```

#### 2b. Move cross-pollinated files

```bash
git mv data/notes/digital-wallet.md ventures/digital-wallet/knowledge/digital-wallet.md
git mv data/vendors/magpie.md ventures/digital-wallet/data/vendors/magpie.md
```

#### 2c. Move shared skills to root skills/

The current `skills/` directory becomes the *root shared skills/* — 5 of its 6 files stay. Only `consistency-check.md` moves into the venture.

```bash
# consistency-check is podplay-specific
git mv skills/consistency-check.md ventures/podplay/skills/consistency-check.md
# the other 5 files stay where they are (they ARE root skills/ already)
```

(No move needed for the 5 shared skills — they're already at `skills/` which becomes root shared skills. Just verify after step 4 that `ventures/podplay/skills/` doesn't accidentally inherit them.)

#### 2d. Move general template

```bash
git mv templates/project-template.md general/templates/project-template.md
```

#### 2e. Bulk-move podplay venture content

```bash
# Top-level dirs that wholesale become podplay-venture
git mv dashboards ventures/podplay/dashboards
git mv pricing ventures/podplay/pricing

# data/ moves whole, then we already removed team/ above
git mv data ventures/podplay/data

# remaining templates (bom-*, checklist-deployment) — project-template was moved in 2d
mkdir -p ventures/podplay/templates
git mv templates/* ventures/podplay/templates/  # whatever's left
rmdir templates
```

After this, `data/team/` no longer exists, `data/notes/digital-wallet.md` no longer exists, `data/vendors/magpie.md` no longer exists — these were moved in 2a–2b *before* the bulk move in 2e, so 2e is clean.

**Order matters.** Run 2a–2d before 2e, otherwise the bulk move in 2e re-includes files we wanted promoted.

#### 2f. Move and trim the existing CLAUDE.md

```bash
git mv CLAUDE.md ventures/podplay/CLAUDE.md
```

Then **edit `ventures/podplay/CLAUDE.md`** to remove the bits that now live at root:
- Strip the title/identity block — root provides identity
- Keep: Write Path, Routing rules, Conventions, Default to action, Directory Structure (this venture), File Naming, Entity Schemas (all 14 of them, verbatim from current), Linking, Revisioning, Index-on-create, Pricing, Skills (this venture), Templates, Dashboards
- Add a one-line preamble: `This file extends the root /CLAUDE.md.`

Reference the spike's `ventures/podplay/CLAUDE.md` for the trimmed structure (`.planning/spikes/002-layout-sketch/kosmas-data/ventures/podplay/CLAUDE.md`). Note: the spike version stubbed entity schemas with a placeholder — the real version must paste all 14 schemas verbatim from the original.

Commit after 2a–2f as one structural commit:
```bash
git commit -m "refactor: move content into kosmas umbrella shape (general/, ventures/podplay/)"
```

### Step 3 — author new root CLAUDE.md

Copy from `.planning/spikes/002-layout-sketch/kosmas-data/CLAUDE.md` to repo root `CLAUDE.md`. No edits needed if you accept the spike's authoring; review it once before committing.

```bash
cp .planning/spikes/002-layout-sketch/kosmas-data/CLAUDE.md CLAUDE.md
git add CLAUDE.md
git commit -m "feat: add root CLAUDE.md — kosmas umbrella identity + venture routing"
```

### Step 4 — write venture stub READMEs

Same source: copy each from the spike sandbox.

```bash
for v in podplay podplay-distribution helios-pickleball-center digital-wallet pickleball-consulting athlete-management; do
  cp .planning/spikes/002-layout-sketch/kosmas-data/ventures/$v/README.md ventures/$v/README.md
done
git add ventures/*/README.md
git commit -m "docs: venture stub READMEs"
```

Also copy the company overview:
```bash
cp .planning/spikes/002-layout-sketch/kosmas-data/general/company/overview.md general/company/overview.md
git add general/company/overview.md
git commit -m "docs: kosmas company overview at general/company/"
```

### Step 5 — verify wikilinks on the live tree

Replay spike 003's check against the actual moved files (not the sandbox):

```bash
# Extract wikilinks
grep -rohE '\[\[[a-z0-9._/-]+\]\]' --include="*.md" --exclude-dir=.git --exclude-dir=.planning . | sort -u > /tmp/links.txt

# Build filename index
find . -path ./.git -prune -o -path ./.planning -prune -o -type f -name "*.md" -print | \
  sed -E 's|.*/([^/]+)\.md$|\1|' | sort -u > /tmp/files.txt

# Compare — any new unresolved links beyond the 18 pre-existing ones?
while read link; do
  target=$(echo "$link" | sed -E 's/^\[\[(.+)\]\]$/\1/')
  grep -qx "$target" /tmp/files.txt || echo "UNRESOLVED: $target"
done < /tmp/links.txt
```

**Expected output:** the same 18 pre-existing unresolved links from spike 003 (vendor shorthand, schema doc placeholders, etc.). If the count differs, investigate before pushing — something moved that shouldn't have.

### Step 6 — push and open PR

```bash
git push -u origin claude/kosmas-umbrella-migration
gh pr create --title "refactor: kosmas umbrella content restructure" --body-file .planning/MIGRATION-PR-BODY.md
```

PR body should include:
- One-line summary
- Link to this MIGRATION-PLAN.md
- Link to spike 002 sandbox
- Wikilink verification result (Step 5 output)
- File count verification: `find . -path ./.git -prune -o -path ./.planning -prune -o -type f -print | wc -l` matches the 129 from the spike (modulo the prereq cleanup files)
- **Explicit ask: do not auto-merge.** This is a structural / CLAUDE.md / >5-files change — the existing podplay CLAUDE.md routing rules say "ask user before merging" for all three reasons. Wait for human approval.

### Step 7 — post-merge sanity

After merge to main:
1. Tail hermit-cma logs (if accessible) for the next agent invocation against this repo. Watch for any "file not found" or routing-confusion errors.
2. Manually trigger a benign agent task (e.g., "summarize the tela-park project status") and confirm it loads root + venture CLAUDE.md correctly and finds the file.
3. Update `.planning/MIGRATION-PLAN.md` with a "Done — merged in PR #N on YYYY-MM-DD" line at the top.

## Out of scope (explicitly)

- **Repo rename `podplay-data → kosmas-data`.** Deferred. Live hermit `default_repo` bindings would break. Revisit when a coordinated repo+binding migration is feasible.
- **Vendor-shorthand cleanup** (e.g., `[[anker]]` → `anker-powerconf-c200.md`). Pre-existing data hygiene gap surfaced by spike 003. Separate task.
- **Populating venture stubs.** Each non-podplay venture has a stub README only. Real content lands as engagements happen.
- **Helios cross-references.** The spike documented the pattern (venture README ↔ podplay project file ↔ podplay venue file) but didn't add the actual cross-link prose to the live podplay files. Could be a small follow-up commit on the same branch, or a separate cleanup.

## Risk register

| Risk | Likelihood | Mitigation |
|------|-----------|------------|
| Live agent invocation hits half-moved tree | Low (single atomic merge) | Single PR, atomic merge; coordinate quiet window if possible |
| `git mv` rename detection fails for some files (treats as delete+add) | Low (similarity is high — files unchanged) | Spot-check `git log --follow` for a couple of moved files post-merge |
| New root CLAUDE.md routing confuses the agent on first invocation | Medium | Keep a manual rollback ready (`git revert <merge-commit>`); test on a benign task first |
| Vendor-shorthand wikilinks now look "more broken" because surrounding context changed | Low | They were already broken; this isn't a regression. Document in PR body. |
| Uncommitted main changes get tangled with migration | Medium | **Commit/stash them BEFORE branching.** This is Prerequisites #2. Don't skip. |

## Estimated effort

- Step 0 (cleanup): 5–15 min depending on what to do with the uncommitted work
- Steps 1–2 (moves): 15 min
- Step 3 (root CLAUDE): 5 min (copy from spike)
- Step 4 (READMEs): 5 min (copy from spike)
- Step 5 (verify links): 5 min
- Step 6 (PR): 5 min
- Step 7 (post-merge): 15 min watching + a benign test invocation

**Total: ~1 hour of focused work**, plus PR review time and the merge coordination window.
