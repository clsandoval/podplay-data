# Spike Manifest

## Idea

Restructure `podplay-data` into `kosmas-data` — an umbrella monorepo for **Kosmas Athletic Ventures Co** that holds context for every Kosmas business line, not just Pod Play. More Kosmas folks across more ventures are using the bot than originally scoped, and the single-venture shape is becoming a constraint.

North star: `pymc-labs/labs-internal-dpack`. Same pattern (root `general/` for shared, per-domain subdirs with `knowledge/skills/tasks/`, root `skills/` for shared integrations, `CLAUDE.md` as the agent contract with channel-style routing). Shape adapted from PyMC's internal-departments axis to Kosmas's business-lines axis.

## Requirements

Decisions locked in during decomposition. Non-negotiable for the real build unless explicitly revisited.

- **Single tenant.** Kosmas is one company; this is not a multi-tenant repo. Other companies running their own kosmases are out of scope (handled by hermit-cma's existing per-workspace `default_repo` binding).
- **Single repo, monorepo shape.** Not a multi-repo / org / submodule approach. One repository.
- **No repo rename — content restructure only.** The repo stays named `podplay-data` for now. Live hermit deployments bind to `default_repo=podplay-data` and renaming would break them. The umbrella becomes a *content* fact: the repo's internal layout becomes kosmas-shaped (root `general/` + `ventures/podplay/` + sibling ventures), but the repo name lies temporarily. Rename to `kosmas-data` is a deferred follow-up after deployment routing is migrated. **Sandbox naming `kosmas-data/` in spike 002 is illustrative of the eventual content shape — that content lands inside the existing `podplay-data` repo.**
- **Container directory: `ventures/`.** Each business line is a venture (Kosmas Athletic *Ventures* Co — the word matches the brand). Not `teams/`, `lines/`, or `businesses/`.
- **Shape mirrors `labs-internal-dpack` exactly.** Root has `general/` (cross-venture), `skills/` (cross-venture integrations), `tasks/` (cross-venture), and `ventures/<name>/` for per-venture context. Each venture has its own `knowledge/skills/tasks/data/` as needed.
- **`CLAUDE.md` adapts dpack's pattern.** Identity, intellectual honesty, decision flow, channel/workspace routing → venture, skills index, repo structure. PodPlay's existing CLAUDE.md (write-path routing rules, entity schemas, wikilinks, revisioning, index-on-create, pricing SOT) merges in as `ventures/podplay/CLAUDE.md` — venture-scoped guidance that the venture-routed agent loads on top of root.
- **Initial ventures (stubs allowed):** `podplay`, `podplay-distribution` (was working name "pingpod-franchise"; renamed to be accurate — it's Pod Play distribution into SEA), `helios-pickleball-center`, `digital-wallet`, `pickleball-consulting`, `athlete-management` (athlete representation/management).

## Spikes

| # | Name | Type | Validates | Verdict | Tags |
|---|------|------|-----------|---------|------|
| 001 | shared-vs-venture-split | standard | Every podplay-data file classified as kosmas-shared / podplay-venture / venture-overridable → migration map | ✓ VALIDATED | classification, migration |
| 002 | layout-sketch | standard | Walkable `kosmas-data/` tree with podplay nested + stub ventures + adapted root CLAUDE.md | ✓ VALIDATED | layout, claude-md |
| 003 | wikilink-blast-radius | standard | `[[wikilink]]` rewrite rule and concrete breakage report after files move under `ventures/podplay/data/` | ✓ VALIDATED | links, migration |

Order is migration map → build the tree → check what breaks. Highest-info-yield first.
