# Spike Conventions

Patterns and decisions that emerged during this spike batch (kosmas-umbrella restructure). New spikes in this directory follow these unless the question requires otherwise.

## Repo identity

- **Repo name stays `podplay-data`** for now. Live hermit deployments bind to `default_repo=podplay-data`; renaming breaks them. Sandbox naming `kosmas-data/` is illustrative of eventual content shape.
- **One repo, content-restructured.** Single-tenant umbrella for Kosmas Athletic Ventures Co. Multi-tenant (other companies running their own kosmases) is hermit-cma's per-workspace `default_repo` problem and out of scope.

## Structure

Modeled on `pymc-labs/labs-internal-dpack`. Adapted from PyMC's "internal departments" axis to Kosmas's "business lines" axis.

```
.
├── CLAUDE.md           # Root identity, intellectual honesty, venture routing, skills index
├── general/            # Shared across all ventures
│   ├── company/         # Brand, mission, ventures table
│   ├── people/          # Kosmas team profiles (NOT per-venture)
│   ├── clients/         # Cross-venture clients
│   ├── templates/       # Reusable templates
│   └── vendors/         # Promote vendors here when 2+ ventures use them
├── ventures/           # Per-venture context
│   └── <venture>/
│       ├── CLAUDE.md    # Optional — venture-specific entity schemas, write-path rules
│       ├── README.md    # Stub-or-full venture orientation
│       ├── knowledge/   # Free-form venture context
│       ├── skills/      # Venture-specific skills (promote to root when shared)
│       ├── tasks/       # Venture-specific tasks
│       └── data/        # Entity directories (projects, clients, vendors, ...)
├── skills/             # Shared integration guides
└── tasks/              # Cross-venture tasks
```

## Naming

- **Container directory: `ventures/`.** Not `teams/` (dpack uses it for departments; Kosmas's lines aren't departments) or `lines/` or `businesses/`. The word matches the brand: Kosmas Athletic *Ventures* Co.
- **Venture slugs are kebab-case.** `podplay`, `podplay-distribution`, `helios-pickleball-center`, `digital-wallet`, `pickleball-consulting`, `athlete-management`.
- **Entity files are kebab-case** with no path prefix in the filename: `tela-park.md`, not `podplay-tela-park.md`. Path tells you the venture; filename stays clean.

## Wikilinks

- **Flat, filename-only.** `[[tela-park]]`, not `[[ventures/podplay/data/projects/tela-park]]`.
- **Filename uniqueness is enforced repo-wide.** If a future collision arises (two ventures both want `kickoff.md`), qualify with venture path then; don't pre-emptively over-qualify.
- **Cross-venture links are first-class.** `[[carlos-sandoval]]` from a podplay file resolves to `general/people/carlos-sandoval.md`. `[[magpie]]` from a podplay file resolves to `ventures/digital-wallet/data/vendors/magpie.md`. Resolution is by filename, not by directory proximity.

## CLAUDE.md split

- **Root `CLAUDE.md`** is concise: identity, intellectual honesty, venture routing, skills index, conventions, what-goes-where. Loaded for *every* request.
- **Venture-level `CLAUDE.md`** (e.g., `ventures/podplay/CLAUDE.md`) holds venture-specific entity schemas, write-path rules, revisioning, pricing SOT. Loaded *additionally* when the routed venture matches.
- **Don't duplicate** between root and venture. Shared conventions live at root only.

## Skills

- **Start specific, promote shared** (dpack convention). New skills land in the relevant venture's `skills/`. When a second venture would benefit, promote to root `skills/`.
- **Pre-promoted in initial migration:** `ingestion`, `meeting-to-tickets`, `slack-file-reading`, `proposal-writing`, `discovery-call`. These are obviously generic.
- **Stayed venture-specific:** `consistency-check.md` references podplay's project stage transitions explicitly.

## Vendors

- **Default to venture-specific.** `ventures/<v>/data/vendors/`.
- **Promote to `general/vendors/`** only when a second venture actually adds context for the same vendor — not preemptively. Stripe is a candidate but currently only podplay uses it; stays in podplay until digital-wallet (etc.) actually starts referencing it.

## Cross-venture content

When a thing has multiple venture lenses (e.g., Helios = a JV venture *and* a podplay install site):
- Each venture owns its facet in its own subtree.
- Cross-references via wikilinks or prose pointers; don't try to merge into one canonical file.
- Pattern: `ventures/helios-pickleball-center/README.md` describes the JV; `ventures/podplay/data/projects/helios.md` describes the install engagement; both reference each other.

## Migration rule of thumb

When in doubt: **prefer venture-specific.** Easier to promote up than to demote. Use the dpack rule: "if a second venture needs it, promote it then."
