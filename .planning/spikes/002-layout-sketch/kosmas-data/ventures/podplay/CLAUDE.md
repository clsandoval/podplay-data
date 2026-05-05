# PodPlay venture — Agent Guidance

This file extends the root `/CLAUDE.md`. Read it after the root has identified the routed venture as `podplay`. PodPlay = Pod Play Southeast Asia — venue installations across Asia.

## Write Path

PodPlay users are operators, not engineers. Default to **doing the thing**, not asking them to review a PR queue. Git is an audit trail, not a review gate.

### Routing rules

| Change | How to write |
|--------|-------------|
| New entity file in `data/*/` | Commit directly to `main` |
| Edit to existing entity file in `data/*/` | Branch → PR → **auto-merge (squash)** in the same flow |
| Delete any file | Branch → PR → **ask user before merging** |
| Change to this `CLAUDE.md`, `templates/`, `skills/`, `dashboards/` | Branch → PR → **ask user before merging** |
| Bulk change (>5 files in one pass) | Branch → PR → **ask user before merging** |

Use GitHub MCP tools: `create_branch` → `create_or_update_file` → `create_pull_request` → (when auto-merging) `merge_pull_request` with squash.

### Conventions

- PR titles use conventional prefixes: `feat:`, `fix:`, `update:`, `add:`, `remove:`
- One PR per logical change — don't bundle unrelated updates
- PR body: one-line summary of what changed and why
- After auto-merging, tell the user plainly what you did and link the merged PR

### Default to action

When the user describes a change, **make it**. Don't open an issue asking them to confirm. Don't bounce it back as "do you want me to…" unless the change lands in the ask-before-merging column above.

## Directory Structure (this venture)

| Directory | Entity Type | Description |
|-----------|-------------|-------------|
| `data/projects/` | Project | Venue installations with multi-stage workflow |
| `data/inventory/` | Inventory Item | Hardware stock tracking |
| `data/vendors/` | Vendor | Pod-play-specific vendor directory (cross-venture vendors → root `general/vendors/`) |
| `data/clients/` | Client | Pod Play customer contacts |
| `data/installers/` | Installer | Contractor pool |
| `data/invoices/` | Invoice | Deposit, final, change-order invoices |
| `data/expenses/` | Expense | Per-project costs |
| `data/meetings/` | Meeting | Call notes, site visits, vendor check-ins |
| `data/leads/` | Lead | Pod Play CRM pipeline — prospects not yet projects |
| `data/contracts/` | Contract | SOWs, MSAs, NDA summaries |
| `data/tickets/` | Ticket | Support issues, punch list items, warranty claims |
| `data/checklists/` | Checklist | Deployment phase templates (YAML) |
| `data/recurring-fees/` | Recurring Fee | Monthly/quarterly subscriptions per venue |
| `data/venues/` | Venue | Physical site specs |
| `data/shipping/` | Shipment | Shipment tracking, packing lists |
| `data/notes/` | Note | Freeform — ideas, research, anything pod-play-flavored |

> **Team profiles live at root `general/people/`**, not here. They're Kosmas-wide.

## File Naming

- Use kebab-case: `tela-park.md`, `ubiquiti-u6-pro.md`
- Meetings are date-prefixed: `2026-04-10-tela-park-kickoff.md`
- Shipments are numbered: `tela-park-shipment-001.md`

## Entity Schemas

[Schemas from the original podplay-data CLAUDE.md — Project, Inventory, Vendor, Client, Installer, Invoice, Expense, Meeting, Lead, Venue, Ticket, Contract, Recurring Fee, Shipment — copy in unchanged. Omitted here in spike to keep README readable; in the real migration these copy verbatim from the existing CLAUDE.md.]

## Linking

Use `[[wikilinks]]` to reference other entities by filename (without extension):
- `"[[tela-park]]"` → `data/projects/tela-park.md`
- `"[[ubiquiti]]"` → `data/vendors/ubiquiti.md`
- **Cross-venture link:** `"[[helios]]"` may resolve to either `ventures/podplay/data/projects/helios.md` (the Pod Play install) or `ventures/helios-pickleball-center/...` (the venture itself). When ambiguity matters, qualify the link target by including the venture path. See `data/projects/helios.md` for the cross-reference pattern.

## Revisioning client-facing artifacts

Proposals, invoices, contracts, and change orders can drift. When a number or term changes:

- **Version, don't overwrite.** New revision gets a date suffix: `tela-park-proposal_2604.md` → `tela-park-proposal_2605.md`.
- **Latest file = current SOT.** Tag the current version `[CURRENT SOT]` in its frontmatter or directory index. Mark superseded files `[STALE]`.
- **Cascade in the same PR.** If invoice changes, audit and update linked project, contract, dashboard entries in the same write.

## Index-on-create

When you create a new file in `data/*/`, update any directory-level index or dashboard that references it in the same PR. Don't create orphan files.

## Pricing

`pricing/rate-card.md` is the single source of truth for Pod Play tier pricing (Pro / Autonomous / Autonomous+ / PBK). Proposals, invoices, and contracts must align with it. When it changes, cascade updates to active drafts in the same PR.

## Skills (this venture)

- **Audit a project / lead for drift** (runs automatically before stage transitions) → `skills/consistency-check.md`

Other relevant skills (proposal-writing, discovery-call, meeting-to-tickets, ingestion, slack-file-reading) live at root `/skills/` and are shared across ventures.

## Templates (this venture)

- `templates/bom-pro.yaml` — Pod Play Pro tier bill of materials
- `templates/bom-autonomous-plus.yaml` — Autonomous+ tier BOM
- `templates/checklist-deployment.yaml` — Deployment phase checklist

## Dashboards (this venture)

- `dashboards/pipeline.yaml` — Project pipeline by stage
- `dashboards/revenue.yaml` — Pod Play revenue rollup

The React app reads these to render summary pages.
