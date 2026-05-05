---
spike: 001
name: shared-vs-venture-split
type: standard
validates: "Given the current podplay-data tree, when each file is classified as kosmas-shared / podplay-venture / venture-overridable, then we have a concrete migration map for spike 002"
verdict: VALIDATED
related: []
tags: [classification, migration]
---

# Spike 001: shared-vs-venture-split

## What This Validates

**Given** the current `podplay-data/` tree (97 markdown files + dashboards + skills + templates),
**when** each file is classified as `kosmas-shared` (lives at root `general/`/`skills/`), `podplay-venture` (lives at `ventures/podplay/`), or `cross-pollinated` (currently in podplay-data but actually belongs to a different venture),
**then** we have a concrete migration map that drives spike 002's layout sketch.

## Method

Walked every file in the repo, classified by:
1. **Audience** — does this serve only Pod Play SEA work, or every Kosmas venture?
2. **Cardinality** — would each venture want its own copy/version, or do they share one?
3. **Cross-pollination check** — is the file actually about a different venture even though it lives here?

## Classification

### Root (kosmas-shared)

| Source | Target | Why |
|--------|--------|-----|
| `data/team/*` (12 files) | `general/people/` | These are Kosmas team members (Carlos, Richard, Isabel, Sophia, Kim, Marco, etc.) working across ventures. Confirmed via `cs/monorepo/entities/projects/pod-play-sea.md` Kosmas team table. |
| `skills/ingestion.md` | `skills/ingestion.md` | Proactive gap-watching pattern, generic across ventures. |
| `skills/meeting-to-tickets.md` | `skills/meeting-to-tickets.md` | Meetings → action items is a generic ops pattern. |
| `skills/slack-file-reading.md` | `skills/slack-file-reading.md` | Generic Slack integration. |
| `.env.example`, `.gitignore` | (root) | Repo-level. |

### Cross-pollinated (file misplaced — belongs to another venture)

| Source | Target | Why |
|--------|--------|-----|
| `data/notes/digital-wallet.md` | `ventures/digital-wallet/knowledge/` | Already a digital-wallet venture note sitting in podplay-data because there was nowhere else for it. Strongest signal that the umbrella restructure is overdue. |
| `data/vendors/magpie.md` | `ventures/digital-wallet/data/vendors/` (or `general/vendors/`) | Magpie is the digital-wallet partner per `cs/monorepo/entities/projects/digital-wallet.md`. |
| `data/projects/helios.md`, `data/venues/helios-venue.md` | **AMBIGUOUS** — see Investigation Trail. Either podplay client, or seed of `helios-pickleball-center` venture. |

### Venture-overridable (default at root, venture can override)

| Source | Target | Why |
|--------|--------|-----|
| `skills/proposal-writing.md` | `skills/proposal-writing.md` (root default) + per-venture override allowed at `ventures/<v>/skills/proposal-writing.md` | Every venture writes proposals; structure is shared but tier names / boilerplate differ. Mirrors dpack pattern: "start specific, promote shared." |
| `skills/discovery-call.md` | `skills/discovery-call.md` (root default) | First-call/site-visit prep applies broadly; podplay-specific bits (site survey for AP placement) move into a podplay override later if needed. |
| `templates/project-template.md` | `general/templates/project-template.md` | Generic project template; per-venture variants allowed. |

### Podplay-venture (everything else)

| Source dir | File count | Target |
|-----------|-----------|--------|
| `CLAUDE.md` | 1 | `ventures/podplay/CLAUDE.md` (entity schemas + write-path rules + revisioning + index-on-create are all podplay-specific guidance) |
| `dashboards/*.yaml` | 2 | `ventures/podplay/dashboards/` |
| `data/checklists/` | 1 | `ventures/podplay/data/checklists/` |
| `data/clients/` | 2 | `ventures/podplay/data/clients/` |
| `data/contracts/` | 1 | `ventures/podplay/data/contracts/` |
| `data/inventory/` | 50 | `ventures/podplay/data/inventory/` (venue-install hardware — strongly podplay) |
| `data/leads/` | 1 | `ventures/podplay/data/leads/` |
| `data/meetings/` | 4 | `ventures/podplay/data/meetings/` (all podplay context — sync, training, tela-park) |
| `data/notes/*` (minus digital-wallet) | 6 | `ventures/podplay/data/notes/` (mosyle-kiosk, network-architecture, replay-flow, revenue-model-philippines, service-tiers, sales/icp) |
| `data/projects/` (minus helios) | 3 | `ventures/podplay/data/projects/` (atleta-63-demo, tela-park, temporary-facility) |
| `data/recurring-fees/` | 2 | `ventures/podplay/data/recurring-fees/` |
| `data/tickets/` | 1 | `ventures/podplay/data/tickets/` |
| `data/vendors/` (minus magpie, debatable: stripe) | 11 | `ventures/podplay/data/vendors/` |
| `data/venues/` (minus helios) | 3 | `ventures/podplay/data/venues/` |
| `pricing/rate-card.md` | 1 | `ventures/podplay/pricing/rate-card.md` (Pod Play tier pricing — Pro / Autonomous / Autonomous+ / PBK) |
| `skills/consistency-check.md` | 1 | `ventures/podplay/skills/consistency-check.md` (references project stage transitions specific to podplay) |
| `templates/bom-*.yaml`, `templates/checklist-deployment.yaml` | 3 | `ventures/podplay/templates/` (BOMs and deployment checklists are pod-play-specific) |

### Empty placeholders (.gitkeep)

`data/expenses/`, `data/invoices/`, `data/shipping/` are empty in podplay-data. They become `ventures/podplay/data/expenses/` etc. — but the *pattern* (every venture has expenses/invoices) is a candidate for the venture template.

## Investigation Trail

**Iteration 1 — first pass.** Classified `data/team/` as podplay until I cross-referenced `cs/monorepo/entities/projects/pod-play-sea.md`, which lists Kosmas team. Promoted to `general/people/`. This is the strongest-evidence shared bucket.

**Iteration 2 — vendor scrutiny.** Considered promoting Stripe (cross-venture payments) to `general/vendors/`. Decided against premature promotion: per dpack convention, "start specific, promote shared" — keep all at podplay until a second venture actually adds Stripe context. Note in CONVENTIONS.

**Iteration 3 — helios ambiguity, resolved.** Read both files. Helios = "10-story building, 20 courts, flagship, JV with Robinsons Land Corporation, opening 2028". So Helios is **both**:
- The `helios-pickleball-center` venture (Kosmas+Robinsons JV operating a flagship facility) → owns the building, the partnership, the operating business
- A podplay *engagement* installing Pod Play tech at that venue → podplay's flagship installation project

Today these are conflated in podplay-data because there's no other home. **This is the clearest single illustration of why the umbrella restructure helps.** After restructure:
- `ventures/helios-pickleball-center/` — the venture (JV terms, building, operations, partnership with Robinsons)
- `ventures/podplay/data/projects/helios.md` — podplay's installation engagement, cross-references `[[../../helios-pickleball-center]]` or similar

`data/venues/helios-venue.md` stays under podplay (it's the install site spec — power, ISP, AP count) but cross-references the venture. Decision: split intentionally; don't try to merge. Two facets of the same physical thing, modeled in their respective ventures.

**Iteration 4 — skills demarcation.** Started with all skills at venture-level. Pulled out the ones that are clearly generic (ingestion, meeting-to-tickets, slack-file-reading). Held the venture-overridable middle category for proposal-writing and discovery-call: dpack supports both team-level and root-level skills with the same name; agent loads both, venture override wins.

## Migration map summary

| Bucket | Count | Lives at |
|--------|-------|----------|
| Kosmas-shared (people, generic skills) | 15 files | root `general/`, `skills/` |
| Cross-pollinated (other ventures' content) | 1–3 files | their respective `ventures/<v>/` |
| Venture-overridable (root default) | 3 files | root with venture override allowed |
| Podplay-venture | ~92 files | `ventures/podplay/` |
| Helios-cross-cutting | 2 files | Split: venture file → `ventures/helios-pickleball-center/`, install-site file → `ventures/podplay/data/{projects,venues}/` |

## Open questions for spike 002

1. **`data/vendors/stripe.md` promotion** — defer per "start specific, promote shared".
2. **Sales notes (`data/notes/sales/icp.md`)** — likely venture-specific (podplay's ICP), but verify content.

## Verdict

**VALIDATED.** Migration map is concrete enough to drive spike 002. Three files need a content read to fully resolve (helios×2, stripe), tracked as open questions rather than blockers — they don't affect the overall structure, just which directory two specific files end up in.
