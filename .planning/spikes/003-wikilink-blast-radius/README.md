---
spike: 003
name: wikilink-blast-radius
type: standard
validates: "Given the layout from spike 002, when wikilink targets are resolved against the new tree, then we know which links break, which still work, and what the rewrite rule is"
verdict: VALIDATED
related: [001, 002]
tags: [links, migration]
---

# Spike 003: wikilink-blast-radius

## What This Validates

**Given** spike 002's `kosmas-data/` layout sketch with 129 files placed,
**when** every `[[wikilink]]` in the source repo is resolved against the new tree's filenames,
**then** we know whether the migration breaks links and what (if any) rewrite rule is needed.

## Method

1. Extracted every unique `[[wikilink]]` target from `*.md` files in podplay-data (excluding `.git/`, `.planning/`, `tmp/`).
2. Built an index of all `.md` filenames (basename, no extension) in the spike-002 sandbox.
3. For each wikilink target, checked whether a file with that exact basename exists in the sandbox.
4. For unresolved targets, cross-checked whether the file existed in the source — distinguishes "migration broke it" from "it was already broken / never existed."
5. Cross-spot-checked the cross-venture cases (`[[helios]]`, `[[magpie]]`, `[[carlos-sandoval]]`) to confirm they land in the right venture.

## Results

**40 unique wikilink targets in the source repo.**

| Bucket | Count | Verdict |
|--------|-------|---------|
| Resolved in sandbox (link still works after migration) | 22 | ✓ |
| Unresolved in sandbox **AND** unresolved in source (pre-existing) | 18 | not a migration issue |
| Unresolved in sandbox **only** (migration-caused breakage) | **0** | ✓✓✓ |

### Why the 18 pre-existing unresolved are pre-existing, not bugs to fix here

| Type | Examples | Why |
|------|----------|-----|
| Schema doc placeholders | `[[client-slug]]`, `[[agustin-reyes]]`, `[[maria-santos]]`, `[[juan-dela-cruz]]`, `[[airline-vendor]]` | Used as illustrative *examples* inside CLAUDE.md's entity schemas, not real links. |
| Vendor shorthand | `[[anker]]` (file is `anker-powerconf-c200.md`), `[[apc]]` (`apc-1500va-ups.md`), `[[bbpos]]` (`bbpos-wisepos-e.md`), `[[monoprice]]` (3 files), `[[samsung]]`, `[[pyle]]`, `[[tripplite]]`, `[[wd]]`, `[[iwillink]]` | Writer used vendor name; canonical file uses full SKU. Pre-existing data hygiene gap. |
| Prose-as-link | `[[wikilinks]]`, `[[links]]` | CLAUDE.md says "Use `[[wikilinks]]`" — the brackets are descriptive prose, not real link targets. |
| Forward references | `[[tela-park-ticket-012]]` | Ticket file that hasn't been created yet. |

None of these are caused by the move. The migration is link-neutral.

### Cross-venture wikilink resolution (the interesting cases)

Verified manually because these are the structural test of the umbrella:

| Wikilink | Resolves to | Comment |
|---------|-------------|---------|
| `[[carlos-sandoval]]` | `general/people/carlos-sandoval.md` | Was in podplay's `data/team/`; promoted to root general/people/ during migration. **Link still works because resolution is filename-based.** |
| `[[richard-bachmann]]` | `general/people/richard-bachmann.md` | Same. |
| `[[magpie]]` | `ventures/digital-wallet/data/vendors/magpie.md` | Was in podplay's `data/vendors/`; moved to digital-wallet venture. **Link still works.** |
| `[[helios]]` | `ventures/podplay/data/projects/helios.md` | The install engagement. |
| `[[helios-venue]]` | `ventures/podplay/data/venues/helios-venue.md` | The install site spec. |
| `[[tela-park]]` | `ventures/podplay/data/projects/tela-park.md` | Standard intra-venture link, unchanged behavior. |

**Conclusion:** PodPlay's existing `[[wikilink]]` convention (filename-only, no path) is migration-safe by construction. Files can move arbitrarily within the repo and links still resolve as long as filenames stay unique repo-wide.

### Filename collisions

| Filename | Where it appears |
|----------|------------------|
| `CLAUDE.md` | root + `ventures/podplay/CLAUDE.md` (each venture may have one) |
| `README.md` | root + every venture stub |

Neither is a wikilink target in practice (`[[CLAUDE]]` and `[[README]]` aren't used). No risk.

## Investigation Trail

**Iteration 1 — naive scan.** Initial run reported 18 unresolved out of 40 and I was about to flag breakage. Then ran the cross-check against the source repo and discovered every single one was already unresolved before any migration. Plot twist: the migration broke nothing.

**Iteration 2 — venture-specific qualification?** Considered whether wikilinks should grow a venture qualifier (e.g., `[[podplay/tela-park]]`) once cross-venture content lives in the same repo. Decided: no — as long as filenames stay unique repo-wide, flat wikilinks are fine, and they're consistent with how Obsidian / dpack treat them. If a future collision arises (e.g., two ventures want their own "kickoff-meeting.md"), the convention can grow at that point. Not now.

**Iteration 3 — convention to add to CONVENTIONS.md.** Cleaned up the recommendation: keep wikilinks filename-only, enforce filename uniqueness across the whole repo, when ambiguity arises later, qualify with the venture path. Document in `CONVENTIONS.md` from this spike batch.

## Surprising findings

1. **The vendor-shorthand pattern (`[[anker]]` → no file).** This isn't a migration bug, but the spike surfaced it. There's a real data hygiene cleanup waiting: either create vendor stub files for the shorthand names that link to the SKU files, or rewrite the shorthand links to canonical SKU filenames. Logged as a follow-up cleanup, not in scope for the umbrella migration.
2. **Schema doc placeholders look like real links to a scanner.** CLAUDE.md examples like `"[[maria-santos]]"` get caught by any wikilink regex. If the migration strategy involves any automated link-rewriting later, those need an exclusion (only rewrite links inside `data/`, not inside CLAUDE.md prose).
3. **`[[wikilinks]]` itself is in the unresolved bucket.** Funny but real — CLAUDE.md instructs "use `[[wikilinks]]`" and the regex caught it.

## Verdict

**VALIDATED.** Migration is link-neutral. No rewrite rule needed. Convention to lock in: keep flat filename-only wikilinks, enforce repo-wide filename uniqueness, qualify with venture path only if a collision appears.

## Open follow-ups (not blockers)

- Vendor-shorthand cleanup: 9 vendor wikilinks point at non-existent files where a SKU file exists. Either create stub vendor files (e.g., `anker.md`) or rewrite links to canonical SKU names. Out of scope for umbrella migration.
- If `general/clients/` later contains files with names that overlap a venture's `data/clients/` (e.g., a client doing business with multiple ventures), the wikilink convention will need extension. Cross that bridge when a real collision appears.
