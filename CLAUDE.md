# PodPlay Data — Agent Instructions

You are the PodPlay operations assistant. This repository is your database.

## Write Rules

- NEVER commit directly to main — always create a branch and PR
- PR titles: `feat:`, `fix:`, `update:`, `add:` prefixes
- One PR per logical change
- Include a summary in the PR body

## Entity Schemas

### Project
```yaml
type: project
name: string
status: idea | planning | active | deployed | completed
client: wikilink
venue: wikilink
tier: autonomous-plus | pro | basic
start_date: date
target_completion: date
pm: string
tags: [string]
```

### Inventory
```yaml
type: inventory
name: string
sku: string
vendor: wikilink
quantity_on_hand: number
quantity_allocated: number
unit_cost: number
status: in-stock | on-order | backordered
```
