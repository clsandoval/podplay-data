---
spike: 002
name: layout-sketch
type: standard
validates: "Given the migration map from spike 001, when we build a candidate kosmas-data/ tree with podplay nested + stub ventures + adapted CLAUDE.md, then the layout is concretely walkable and demonstrates routing across ventures works"
verdict: VALIDATED
related: [001]
tags: [layout, claude-md]
---

# Spike 002: layout-sketch

## What This Validates

**Given** spike 001's migration map,
**when** we build a candidate `kosmas-data/` content tree with all 97 podplay-data markdown files placed per the map, six venture stubs, root `general/`, root `skills/`, and a root `CLAUDE.md` adapted from `labs-internal-dpack`'s pattern,
**then** the layout is concretely walkable, the routing model is demonstrable, and the cross-venture cross-references (like Helios) are visible in the structure.

> Note: the sandbox tree is named `kosmas-data/` to make the eventual content shape obvious. Per MANIFEST requirement, this content actually lands inside the existing `podplay-data` repo to avoid breaking live hermit deployments. Repo rename is deferred.

## How to walk it

```bash
cd .planning/spikes/002-layout-sketch/kosmas-data
ls
cat CLAUDE.md                                  # root identity + venture routing
cat general/company/overview.md                # Kosmas company-level
ls general/people/                             # 12 Kosmas team profiles (was data/team/)
cat ventures/podplay/CLAUDE.md                 # podplay-specific guidance (entity schemas, write-path)
ls ventures/podplay/data/                      # all 14 entity dirs
cat ventures/digital-wallet/README.md          # cross-pollinated content lives here now
cat ventures/helios-pickleball-center/README.md # the JV venture (separate from podplay's install at Helios)
```

## What got built

### Final tree (top 3 levels)

```
kosmas-data/
├── CLAUDE.md                  # 1 file — root identity, intellectual honesty, venture routing, skills index
├── general/
│   ├── company/overview.md    # Kosmas brand, ventures table, key relationships
│   ├── people/                # 12 Kosmas team profiles (promoted from podplay data/team/)
│   ├── clients/               # (empty — populate when cross-venture client exists)
│   ├── templates/             # project-template.md
│   └── vendors/               # (empty — promote here when a vendor serves 2+ ventures)
├── skills/                    # 5 shared skills
│   ├── ingestion.md
│   ├── meeting-to-tickets.md
│   ├── slack-file-reading.md
│   ├── proposal-writing.md
│   └── discovery-call.md
└── ventures/
    ├── podplay/               # 102 files — full original podplay content nested
    │   ├── CLAUDE.md           # Pod-play-specific guidance: write-path rules, entity schemas
    │   ├── README.md
    │   ├── dashboards/        # pipeline.yaml, revenue.yaml
    │   ├── data/              # 14 entity dirs (projects, inventory, vendors, ...)
    │   ├── pricing/rate-card.md
    │   ├── skills/consistency-check.md
    │   └── templates/         # bom-pro, bom-autonomous-plus, checklist-deployment
    ├── podplay-distribution/  # stub README — franchise distribution
    ├── helios-pickleball-center/  # stub README — Robinsons JV flagship
    ├── digital-wallet/        # README + cross-pollinated content (digital-wallet.md note + magpie vendor)
    ├── pickleball-consulting/ # stub README — PH facility consulting
    └── athlete-management/    # stub README
```

### File count check

| Area | Files | Notes |
|------|-------|-------|
| `general/` | 14 | 12 people + 1 template + 1 company overview |
| `skills/` (root) | 5 | shared skills |
| `ventures/podplay/` | 102 | 92 from migration map + CLAUDE.md + README.md + ~8 from data subdirs (dashboards, pricing, etc.) |
| `ventures/digital-wallet/` | 3 | README + digital-wallet.md note (cross-pollinated) + magpie vendor |
| Other venture stubs | 1 each | README only |
| **Total** | **129** | (vs 97 source markdown files; difference = added READMEs, CLAUDE.md, scaffolding) |

## Investigation Trail

**Iteration 1 — directory scaffold first.** Created the empty structure before copying any content. Made it obvious where each venture's `data/`, `knowledge/`, `skills/`, etc. live. Easier than trying to scaffold-as-you-go.

**Iteration 2 — bulk copy with exclusions.** Used `cp -r` for the bulk podplay subtrees, with explicit per-file exclusions for the cross-pollinated cases (`digital-wallet.md` from notes, `magpie.md` from vendors) and the structural reclassification (team → general/people). Confirmed via file-count matching that nothing got duplicated or lost.

**Iteration 3 — root vs venture CLAUDE.md split.** The original `podplay-data/CLAUDE.md` was 373 lines and mixed three concerns: (a) identity/routing, (b) venture-specific entity schemas + write-path rules, (c) generic conventions like wikilinks. Split into:
- **Root `CLAUDE.md`** — identity, intellectual honesty, venture routing, skills index, conventions, what-goes-where (modeled on dpack's CLAUDE.md). Concise — designed to be loaded for *every* request.
- **`ventures/podplay/CLAUDE.md`** — pod-play-specific entity schemas, write-path table, revisioning, index-on-create, pricing SOT, BOM templates. Loaded *additionally* when the routed venture is podplay.

The venture CLAUDE.md contains a placeholder section ("Entity Schemas — copy in unchanged from original") in the spike rather than re-pasting all 14 schemas; in real migration these copy verbatim.

**Iteration 4 — Helios as cross-venture exemplar.** Spike 001 identified Helios as the cleanest illustration of why the umbrella restructure helps. In the sandbox:
- `ventures/helios-pickleball-center/README.md` describes the JV venture (Robinsons partnership, 10-story building, 20 courts)
- `ventures/podplay/data/projects/helios.md` (kept where it was, in podplay's project list) is the install engagement
- `ventures/podplay/data/venues/helios-venue.md` (kept where it was) is the install site spec
- Both podplay files cross-reference the venture's README via wikilinks; the venture README cross-references back

This pattern — same physical thing, multiple venture lenses, explicit cross-links — is the umbrella's payoff. Spike 003 will validate that the wikilinks survive the move mechanically.

**Iteration 5 — venture stubs sized to current reality.** Each non-podplay venture got a README with: status, what-it-owns, what-lives-elsewhere, likely structure when content lands, cross-references. Sized so that even at "stub" stage the venture has clear ownership boundaries — no ambiguity about where new content goes.

## Surprising findings

1. **The cross-pollination wasn't hypothetical.** `data/notes/digital-wallet.md` and `data/vendors/magpie.md` are real files in the live repo today, sitting in podplay-data because there was nowhere else for them. They're the strongest evidence the umbrella is overdue.
2. **Skills demarcation was harder than data demarcation.** Most data is unambiguously pod-play (BOMs, network architecture, deployment checklists). But skills like `proposal-writing` and `discovery-call` could go either way. Resolved by adopting dpack's "start specific, promote shared" convention but pre-promoting the obvious five.
3. **Helios's dual nature surfaced naturally.** Wasn't a forced classification call; the file content (Robinsons JV, 10-story building, "flagship") made it self-evidently a venture in its own right, with podplay's role being a tenant/installer at that venture.

## Verdict

**VALIDATED.** The structure works concretely. 129 files placed unambiguously, root CLAUDE.md provides clean venture routing, venture-level CLAUDE.md extends without duplicating, cross-venture references modeled. Open from spike 001 (Stripe vendor promotion, sales/icp content read) deferred to follow-up — they don't change the structure, just one or two file destinations.

## Open follow-ups

- Spike 003 will mechanically verify wikilinks survive the move.
- Real migration must copy the 14 entity schemas from original CLAUDE.md into `ventures/podplay/CLAUDE.md` verbatim (placeholder in spike).
- `general/company/brand/` should hold `logokosmasfinal.jpg` (currently in `cs/monorepo/projects/kosmas/brand/`); copy when this repo becomes canonical.
- Per MANIFEST: repo stays named `podplay-data`; sandbox tree's `kosmas-data/` name is illustrative.
