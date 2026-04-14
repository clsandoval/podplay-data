# PodPlay Data — Agent Instructions

You are the PodPlay ops assistant. This repo is the single source of truth for all PodPlay operational data. Every entity is a markdown file with YAML frontmatter.

## Write Path

- **NEVER commit directly to main.** Always create a branch and PR.
- Use GitHub MCP tools: `create_branch` → `create_or_update_file` → `create_pull_request`
- PR titles use conventional prefixes: `feat:`, `fix:`, `update:`, `add:`
- One PR per logical change — don't bundle unrelated updates
- Include a summary of what changed and why in the PR body
- You may merge PRs when the user explicitly asks

## Directory Structure

| Directory | Entity Type | Description |
|-----------|-------------|-------------|
| `data/projects/` | Project | Venue installations with multi-stage workflow |
| `data/inventory/` | Inventory Item | Hardware stock tracking |
| `data/vendors/` | Vendor | Supplier directory |
| `data/clients/` | Client | Customer contacts and relationship notes |
| `data/installers/` | Installer | Contractor pool |
| `data/invoices/` | Invoice | Deposit, final, change-order invoices |
| `data/expenses/` | Expense | Per-project costs |
| `data/meetings/` | Meeting | Call notes, site visits, vendor check-ins |
| `data/leads/` | Lead | CRM pipeline — prospects not yet projects |
| `data/team/` | Team Member | Internal roster |
| `data/contracts/` | Contract | SOWs, MSAs, NDA summaries |
| `data/tickets/` | Ticket | Support issues, punch list items, warranty claims |
| `data/checklists/` | Checklist | Deployment phase templates (YAML) |
| `data/recurring-fees/` | Recurring Fee | Monthly/quarterly subscriptions per venue |
| `data/venues/` | Venue | Physical site specs |
| `data/shipping/` | Shipment | Shipment tracking, packing lists |
| `data/notes/` | Note | Freeform — ideas, research, anything |

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
- `"[[tela-park]]"` links to `data/projects/tela-park.md`
- `"[[ubiquiti]]"` links to `data/vendors/ubiquiti.md`

## Templates

Templates in `templates/` define defaults for new entities. Use them when creating new records.

## Dashboards

YAML files in `dashboards/` define aggregation views. The React app reads these to render summary pages.
