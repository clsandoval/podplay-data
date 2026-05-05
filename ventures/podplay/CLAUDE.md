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
- After auto-merging, tell the user plainly what you did and link the merged PR — don't make them fish through notifications

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

### Project

```yaml
---
type: project
name: Tela Park
status: intake | procurement | deployment | financial_close | completed | cancelled
tier: pro | autonomous | autonomous_plus | pbk
client: "[[tela-park-client]]"
venue: "[[tela-park-venue]]"
deployment_date: 2026-04-28
installer: "[[juan-dela-cruz]]"
isp_type: dedicated | shared | client_provided
revenue_stage: proposal | signed | deposit_invoiced | deposit_paid | final_invoiced | final_paid
tags: []
---

Notes and context about the project.
```

### Inventory Item

```yaml
---
type: inventory
name: Ubiquiti U6-Pro
sku: U6-PRO
vendor: "[[ubiquiti]]"
category: networking | display | compute | power | access_control | signage
unit_cost: 149.00
on_hand: 18
allocated: 24
on_order: 6
reorder_point: 5
---

Stock notes, vendor lead times, alternative SKUs.
```

### Vendor

```yaml
---
type: vendor
name: Ubiquiti
contact_name: Sales Team
contact_email: sales@ui.com
contact_phone: ""
website: https://ui.com
payment_terms: Net 30
lead_time_days: 14
tags: [networking, hardware]
---

Relationship notes, pricing history, negotiation context.
```

### Client

```yaml
---
type: client
name: Tela Park Holdings
contact_name: Maria Santos
contact_email: maria@telapark.ph
contact_phone: +63-917-xxx-xxxx
venue: "[[tela-park-venue]]"
tags: []
---

Relationship notes, preferences, feedback.
```

### Installer

```yaml
---
type: installer
name: Juan Dela Cruz
installer_type: podplay_vetted | client_provided
hourly_rate: 50.00
region: metro_manila | visayas | mindanao
is_active: true
certifications: []
tags: []
---

Experience notes, availability, performance history.
```

### Invoice

```yaml
---
type: invoice
project: "[[tela-park]]"
invoice_type: deposit | final | change_order
amount: 25000.00
status: draft | sent | paid | overdue | void
due_date: 2026-05-01
paid_date: null
tags: []
---

Invoice details and payment notes.
```

### Expense

```yaml
---
type: expense
project: "[[tela-park]]"
category: airfare | lodging | meals | shipping | equipment | labor | permits | misc
amount: 1200.00
vendor: "[[airline-vendor]]"
date: 2026-04-05
payment_method: corporate_card | reimbursement | wire
receipt: false
tags: []
---

Expense details.
```

### Meeting

```yaml
---
type: meeting
date: 2026-04-10
attendees: ["[[maria-santos]]", "[[agustin-reyes]]"]
project: "[[tela-park]]"
meeting_type: kickoff | check_in | site_visit | vendor_call
tags: []
---

## Agenda
- Item 1

## Notes
- Discussion points

## Action Items
- [ ] Action item with owner
```

### Lead

```yaml
---
type: lead
name: Makati Sports Hub
contact_name: John Cruz
contact_email: john@makati-sports.ph
source: referral | inbound | outreach
stage: initial_contact | qualified | proposal_sent | negotiating | won | lost
estimated_value: 50000.00
expected_close: 2026-06-01
tags: []
---

Lead context and conversation history.
```

### Team Member

```yaml
---
type: team
name: Agustin Reyes
role: Project Manager
email: agustin@podplay.co
phone: +63-917-xxx-xxxx
department: operations | sales | engineering | finance
tags: []
---

Responsibilities, expertise, escalation notes.
```

### Venue

```yaml
---
type: venue
name: Tela Park Venue
address: "123 Sports Ave, Makati City"
floor_area_sqm: 500
power_standard: 220v_60hz
isp_provider: PLDT
isp_circuit_id: ""
ap_count: 24
display_count: 8
tags: []
---

Site survey results, floor plan notes, cable run distances, power outlet locations.
```

### Ticket

```yaml
---
type: ticket
title: AP Dropout in Zone 3
project: "[[tela-park]]"
severity: low | medium | high | critical
status: open | in_progress | resolved | closed
assigned_to: "[[agustin-reyes]]"
created_date: 2026-04-12
resolved_date: null
tags: []
---

Issue description, troubleshooting steps, resolution.
```

### Contract

```yaml
---
type: contract
name: Tela Park SOW
client: "[[tela-park-client]]"
contract_type: sow | msa | nda | isp
start_date: 2026-03-01
end_date: 2026-12-31
value: 75000.00
status: draft | active | expired | terminated
tags: []
---

Key terms, renewal dates, special conditions.
```

### Recurring Fee

```yaml
---
type: recurring_fee
project: "[[tela-park]]"
description: Monthly monitoring subscription
amount: 500.00
frequency: monthly | quarterly | annually
start_date: 2026-05-01
end_date: null
status: active | paused | cancelled
tags: []
---

Fee details and billing notes.
```

### Shipment

```yaml
---
type: shipment
project: "[[tela-park]]"
carrier: LBC | FedEx | DHL | hand_carry
tracking_number: ""
status: packing | shipped | in_transit | delivered
ship_date: 2026-04-15
delivery_date: null
items: []
tags: []
---

Packing list and delivery notes.
```

## Linking

Use `[[wikilinks]]` to reference other entities by filename (without extension):
- `"[[tela-park]]"` → `data/projects/tela-park.md`
- `"[[ubiquiti]]"` → `data/vendors/ubiquiti.md`
- **Cross-venture link:** `"[[helios]]"` may resolve to either `ventures/podplay/data/projects/helios.md` (the Pod Play install) or `ventures/helios-pickleball-center/...` (the venture itself). When ambiguity matters, qualify the link target by including the venture path. See `data/projects/helios.md` for the cross-reference pattern.

## Revisioning client-facing artifacts

Proposals, invoices, contracts, and change orders can drift. When a number or term changes:

- **Version, don't overwrite.** New revision gets a date suffix: `tela-park-proposal_2604.md` → `tela-park-proposal_2605.md` (YYMM, or YYMMDD if same month).
- **Latest file = current source of truth.** Tag the current version `[CURRENT SOT]` in its frontmatter or the directory index. Mark superseded PDFs/files `[STALE]`.
- **Cascade in the same PR.** If `data/invoices/tela-park-deposit.md` changes, audit and update the linked project, contract, and dashboard entries in the same write. Don't leave one file stale and another current.

## Index-on-create

When you create a new file in `data/*/`, update any directory-level index or dashboard that references it in the same PR. Don't create orphan files. If an index doesn't exist for a directory but the entity volume makes one useful, create it.

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

YAML files in `dashboards/` define aggregation views. The React app reads these to render summary pages.

- `dashboards/pipeline.yaml` — Project pipeline by stage
- `dashboards/revenue.yaml` — Pod Play revenue rollup
