---
name: proposal-writing
description: Draft a SOW / proposal for a venue installation — standard structure with PodPlay tier and scope flex points
---

# Proposal Writing — Venue Installations

When asked to write, draft, or revise a proposal for a venue, follow this skeleton. Proposals live in `data/contracts/` as the SOW record, with supporting detail in the linked `data/projects/` file.

## When this activates

- User says "write a proposal for [venue]", "draft the SOW for [client]", "put together pricing for the [client] deal", or similar.
- A lead is about to move from `qualified` to `proposal_sent`.

## Prerequisites

Before writing, read:

1. **The lead or project file** — `data/leads/<slug>.md` or `data/projects/<slug>.md` — for context, stage, estimated value, and contact.
2. **The client file** — `data/clients/<slug>.md` — for preferences, prior interactions, and communication style.
3. **The venue file** if it exists — `data/venues/<slug>.md` — for site specs (floor area, AP count, power, ISP).
4. **The relevant tier template** in `templates/` — `bom-pro.yaml`, `bom-autonomous-plus.yaml`, etc. — for the default scope and hardware BOM at that tier.
5. **Any meeting notes** — `data/meetings/*.md` linked to this client — for discovery context, expressed concerns, and constraints.
6. **Similar prior proposals** — scan `data/contracts/` for past SOWs to similar-tier venues. Reuse language that worked.

If any of these are missing, flag as `TODO` in the proposal draft rather than inventing facts.

## Proposal skeleton

Every venue proposal follows this order. Sections marked *(flex)* can expand or contract, but the information they represent must appear somewhere.

```
---
type: contract
name: [Venue Name] SOW
client: "[[client-slug]]"
contract_type: sow
tier: pro | autonomous | autonomous_plus | pbk
value: [amount]
status: draft
start_date: [YYYY-MM-DD]
end_date: [YYYY-MM-DD]
---

## Summary

## The Venue

## Scope of Work

### Hardware
### Network
### Deployment
### Post-install support             *(flex)*

## Deployment Plan

## What We Need From [Client]

## Investment

## Terms and Assumptions

## Next Steps
```

### Section rules

**Summary** — 1-2 short paragraphs. Who the venue is, what tier we're deploying, and the business outcome (coverage, capacity, reliability). Source from the lead or project file.

**The Venue** — Site specs: floor area, expected concurrency, existing infrastructure, power, ISP situation. Pull from `data/venues/<slug>.md`. If no venue file exists yet, flag the fields as `TODO` — don't fabricate.

**Scope of Work** — The concrete deliverable, split by subsystem.
- **Hardware**: bulleted BOM. Use the tier template's BOM as the default. Adjust quantities based on venue specs. Each line is `Qty × SKU — short description`.
- **Network**: AP layout, switch/router, VLANs, WAN redundancy. Plain language, not networking jargon.
- **Deployment**: who installs (PodPlay-vetted vs client-provided), duration on site, phasing if any.
- **Post-install support**: warranty window, response SLA, monitoring inclusion. Tie to the recurring-fee structure if applicable.

**Deployment Plan** — Phased. Always at least two phases:
- *Phase 1: Site prep and procurement* — duration, outcomes, who does what.
- *Phase 2: Install and commissioning* — duration, outcomes, sign-off criteria.
- *Phase 3 (optional): Post-install tuning* — duration, outcomes.
Each phase has: **Duration**, **Outcome** (1 sentence), **Deliverables** (bullets).

**What We Need From [Client]** — Specific bullets: building access, power confirmation, ISP circuit ID, on-site contact, any permits, sign-off stakeholders. This section builds trust — it shows we've thought about what's actually required, not hand-waved.

**Investment** — The price. Derived from the tier template plus any scope adjustments. Show:
- **Deposit**: 50% on signing (or per the tier default).
- **Final**: remaining balance on commissioning.
- **Recurring**: monthly monitoring / support fee if applicable.
Don't expose internal margin build-up. Don't contradict the tier template — if the venue needs scope beyond standard, either bundle it into the price or call it out as a change-order line.

**Terms and Assumptions** — Anything that materially affects price or timeline: assumes 220V 60Hz power, assumes client-provided cable runs, assumes single commissioning visit, etc. This is where you protect against scope creep.

**Next Steps** — 1-2 concrete asks: sign and return, pay deposit, schedule kickoff. Don't load up with five things.

## Flex points — where venue and client nuance lives

| Flex point | What varies |
|-----------|------------|
| Hardware BOM | Floor area, expected concurrency, existing infra, whether client provides displays |
| Phase count / duration | New build vs retrofit; single-visit vs phased install |
| Recurring-fee inclusion | Autonomous+ always includes monitoring; Pro may or may not |
| ISP provisioning | PodPlay-provisioned vs client-provided vs shared |
| Installer sourcing | PodPlay-vetted (metro_manila default) vs client-provided |
| Post-install support tier | Warranty-only, break-fix, or proactive monitoring |

## What does not vary

- Section order.
- The phased deployment plan structure.
- The "What We Need From [Client]" section — every proposal must make this explicit.
- Pricing alignment with the tier template in `templates/`.
- Tier name spelling: `pro`, `autonomous`, `autonomous_plus`, `pbk` — match the Project schema.

## Rules

- **Don't invent client facts.** Floor area, contact names, power specs — if unknown, use `TODO` and surface the list at the top of the PR body.
- **Don't contradict the tier template.** If the venue needs something outside the tier default, call it out as a separate line item.
- **Plain language, not sales fluff.** Clients reading this are operators — they want to know what they get, when, and for how much. No superlatives ("industry-leading", "world-class"). No jargon they'd need to Google.
- **Active voice.** "We install 24 APs" not "24 APs will be installed."
- **One price, not a menu.** Unless the client has explicitly asked to compare tiers, propose one tier with one price. Menus invite haggling.

## After drafting

1. **Link the contract to the project.** Add the contract wikilink to the project file's frontmatter or body.
2. **Create or update the client file** if the proposal surfaced new info (new contacts, new preferences, stated budget).
3. **Update the lead** — if this proposal moves a lead from `qualified` to `proposal_sent`, change the `stage` field in the lead file in the same PR.
4. **Flag all `TODO`s** in the PR body so the user can fill them in before sending.
5. **Report to the user** with a one-line summary, the list of `TODO`s, and the merged PR link.

## Revisioning

Proposals evolve during negotiation. Follow the Revisioning rule in CLAUDE.md:

- New revision gets a date suffix: `tela-park-sow_2604.md` → `tela-park-sow_2605.md`.
- Don't overwrite a prior version — create a new file.
- Tag the current version `[CURRENT SOT]` in its frontmatter.
- Mark superseded versions `[STALE]`.
- When pricing changes, cascade the update in the same PR: the contract, the linked invoice(s), the project file's `revenue_stage`, and any recurring-fee records.

## Quality checklist

Before handing the draft back:

- [ ] Every skeleton section present (or consciously omitted with reason).
- [ ] Summary stands alone — reader gets the full picture from it.
- [ ] BOM aligns with the tier template; scope adjustments are called out.
- [ ] Deployment plan has Duration + Outcome + Deliverables per phase.
- [ ] "What We Need From [Client]" is specific enough to act on.
- [ ] Pricing matches the tier template; deposit / final / recurring breakdown is explicit.
- [ ] No invented facts — all `TODO` markers flagged in the PR body.
- [ ] Tier name, venue name, client name are spelled consistently.
- [ ] Contract file is linked from the project and the client.
