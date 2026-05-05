---
name: consistency-check
description: Audit a project / lead / client for drift — mismatched numbers, orphan files, stale statuses, missing links — before any stage transition or client-facing send
---

# Consistency Check

When things are spread across entity files, they drift. An invoice says $15,000; the project's linked contract says $14,500; the lead's `estimated_value` is $12,000. None of these are caught by the user because they'd have to open four files to see it. This skill catches them.

## When this runs

- User says "check [project]", "audit [lead]", "is everything aligned on [client]", or similar.
- **Automatically before** any of these:
  - Advancing a lead `stage` (qualified → proposal_sent → negotiating → won/lost).
  - Advancing a project `status` (intake → procurement → deployment → financial_close → completed).
  - Advancing a project `revenue_stage` (proposal → signed → deposit_invoiced → …).
  - Creating or sending an invoice.
  - Marking a contract `active`.

If you're about to do any of these and this skill hasn't been run in the current session on the entity, run it first. If it finds issues, fix them in the same PR as the transition.

## How to run

### 1. Scope the entity

Start from one root file (project, lead, or client). Collect every file that links to it — follow `[[wikilinks]]` forward and grep for inbound references. For a project, that typically means:

- The project file itself (`data/projects/*.md`).
- Its client (`data/clients/*.md`).
- Its venue (`data/venues/*.md`).
- Its contract(s) (`data/contracts/*.md`).
- Its invoices (`data/invoices/*.md`).
- Its recurring fees (`data/recurring-fees/*.md`).
- Its meetings (`data/meetings/*.md`).
- Its shipments (`data/shipping/*.md`).
- Its tickets (`data/tickets/*.md`).
- Its expenses (`data/expenses/*.md`).
- Its installer (`data/installers/*.md`).

### 2. Run the checks

Walk the collected set and flag each item below. Every flag goes in the output report, even if you fix it automatically.

**Pricing drift**
- Sum of invoices (deposit + final + change-orders) should equal the contract `value`.
- Contract `value` should match what the rate card produces from the tier + court count.
- If the project links to a lead, lead `estimated_value` should be within 10% of the contract `value` (or the lead's value should be marked as superseded).

**Stage / status coherence**
- Project `revenue_stage: deposit_invoiced` requires a matching `data/invoices/*.md` with `invoice_type: deposit` and `status: sent` or `paid`.
- Project `revenue_stage: deposit_paid` requires the deposit invoice to have `status: paid` with a `paid_date`.
- Project `status: deployment` requires a `data/shipping/*.md` with `status: delivered` or later.
- Project `status: completed` requires all invoices `paid` and at least one recurring fee active (if the tier includes recurring).
- Lead `stage: won` should either already be converted to a project, or get converted in the same PR.

**Name and link drift**
- Every wikilink resolves to an existing file. Broken `[[links]]` get flagged.
- Client, contact, and team-member names are spelled identically across files.
- Tier names use the schema values exactly: `pro`, `autonomous`, `autonomous_plus`, `pbk`.
- SKU references in inventory/shipments match `data/inventory/*.md` files.

**Orphan and index drift**
- Every file in `data/*/` linked from at least one other entity (pure notes excepted).
- If the directory has a dashboard or index, every file is listed.

**Revisioning drift**
- If a file has a `_YYMM` or `_YYMMDD` sibling, the latest timestamp should carry `[CURRENT SOT]`. Older versions should be marked `[STALE]` or archived.
- Invoice totals match the latest contract SOT, not an older revision.

**Timeline gaps**
- Meeting dates for a project are chronological — no gaps where the project obviously advanced without a logged conversation.
- `deposit_invoiced` date ≤ `deposit_paid` date ≤ `final_invoiced` date ≤ `final_paid` date.

### 3. Report

Output a plain summary, not a blob of JSON. Group by severity.

```
Consistency check — Tela Park

Fixed automatically (2):
- Updated data/projects/tela-park.md revenue_stage to deposit_paid (deposit invoice is paid)
- Fixed wikilink in data/invoices/tela-park-deposit.md (was [[tela park]], now [[tela-park]])

Needs your attention (3):
- Contract value ($15,000) does not match rate card for 4-court Pro ($15,000 ✓) BUT final invoice is $14,500 — $500 gap unaccounted for
- data/clients/tela-park-holdings.md spells contact "Maria Santos"; data/meetings/2026-04-10-tela-park-kickoff.md spells it "Marina Santos" — which is correct?
- data/projects/tela-park.md status is deployment but no shipment file exists yet

PR: <link>
```

## Rules

- **Fix silently, report loudly.** Small automatic fixes (broken links, trivial status updates) get made without asking — but every fix is listed in the report so the user can spot-check.
- **Never fabricate values to close a gap.** If the invoice is $500 short, don't invent an explanation. Flag the gap.
- **Don't cascade changes through multiple entities without confirmation** if the change is material (pricing, stage, dates). Small corrections (wikilink fixes, index additions) are fine to auto-apply.
- **One PR per audit.** Bundle all fixes into one PR, not one per issue.
- **Run is idempotent.** Running the check a second time with no changes should produce "all clean" — no phantom findings.

## Scope limits

- This skill audits entity consistency, not content quality. It does not read a proposal and evaluate whether it's good — that's the proposal skill's job.
- It does not invent missing entities. If a project has no contract file, it flags the absence rather than drafting one.
- It does not check external systems (accounting software, GitHub issues, Slack). It only audits files in this repo.
