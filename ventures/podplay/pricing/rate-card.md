---
type: rate_card
status: current
last_updated: 2026-04-22
---

# PodPlay Rate Card

**This is the single source of truth for pricing.** Proposals, invoices, and dashboards must not contradict it. When a number changes here, cascade the update to any linked contracts, invoices, and projects in the same PR.

## Tier pricing

| Tier | Venue fee | Per-court fee | Monthly recurring |
|------|-----------|---------------|-------------------|
| Pro | $5,000 | $2,500 | TODO |
| Autonomous | $7,500 | $2,500 | TODO |
| Autonomous Plus | TODO | TODO | TODO |
| PBK | TODO | TODO | TODO |

Venue fee covers the rack, gateway, switch, UPS, Mac Mini, and shared infrastructure. Per-court fee covers the court-level hardware (replay camera, displays, Flic buttons, iPad kiosk). See `templates/bom-pro.yaml` and `templates/bom-autonomous-plus.yaml` for the full BOM per tier.

**Example — 4-court Pro venue:** `$5,000 + (4 × $2,500) = $15,000` one-time, plus monthly recurring if included.

## Payment structure

- **Deposit:** 50% on contract signing.
- **Final:** 50% on commissioning sign-off.
- **Recurring:** billed monthly starting on the first day of the month following commissioning.

Adjust only with explicit user confirmation — don't negotiate a different split without flagging it.

## Scope changes

Anything outside the standard tier BOM is a change order, not a discount or a bundle:

- Additional courts beyond the initial count: charged at the per-court fee.
- Client-provided hardware (displays, cameras, networking): subtract the corresponding BOM line item at **cost**, not at retail. Never discount the venue fee.
- Additional Kisi readers (beyond 1 per venue on Autonomous): $TODO per reader.
- Expedited deployment (<4 weeks from contract): $TODO surcharge.
- Remote region travel premium (outside Metro Manila): flagged on the proposal, priced per-trip.

## What is NOT included

State these explicitly in every proposal so there's no ambiguity later:

- Electrical work (outlets, circuit additions) — client's contractor.
- Structural or ceiling work for camera and display mounting beyond standard VESA mounts.
- Internet service — client provides unless `isp_type: dedicated` is explicitly contracted.
- Ongoing software subscriptions (Mosyle MDM, Kisi cloud) — covered under the monthly recurring fee only if the tier includes it.
- Training beyond a single commissioning walkthrough.

## Revisioning

When any number on this rate card changes:

1. Save the prior version as `rate-card_YYMM.md` (or YYMMDD if more than one change in a month).
2. Update `last_updated` in the frontmatter.
3. Note the change in a short changelog at the bottom of this file.
4. Audit active proposals in `data/contracts/` with `status: draft` — re-price them against the new card.
5. Do **not** retroactively re-price already-signed contracts unless the client renegotiates.

## TODO before this is usable

- Fill in Autonomous Plus tier pricing.
- Fill in PBK tier pricing.
- Fill in monthly recurring fees per tier.
- Fill in change-order line-item pricing (Kisi readers, expedited surcharge).
- Confirm deposit split matches current practice.

## Changelog

- 2026-04-22 — initial rate card created from `data/notes/service-tiers.md`.
