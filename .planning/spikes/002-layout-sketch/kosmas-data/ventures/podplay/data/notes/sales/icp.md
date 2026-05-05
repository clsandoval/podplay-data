---
type: note
title: Ideal Customer Profile — PodPlay
tags: [sales, icp, qualification]
---

# Ideal Customer Profile

Who PodPlay sells best to. Use this to qualify leads before investing time in a proposal, and to recognize leads that should be politely declined.

## Venue profile

| Attribute | Ideal | Acceptable | Disqualify |
|-----------|-------|------------|------------|
| Sport / use case | Pickleball, padel, indoor racquet sports | Multi-sport indoor facilities | Outdoor-only venues, single-use-case micro-venues |
| Court count | 4–12 courts | 2–3 or 13+ (scope needs adjustment) | 1 court |
| Operator type | Chain or multi-venue operator, venue-tech-forward single operator | Single-venue operator open to tech | Pure real-estate landlord with no ops involvement |
| Existing ISP | Business fiber, dedicated circuit possible | Consumer cable with room to upgrade | Remote / satellite-only |
| Power | 220V 60Hz standard panel with spare capacity | Upgradable | Critical-care power constraints |
| Region | Metro Manila, Visayas hubs, Mindanao hubs | Outside Metro but with local installer access | Remote islands with no install path |

## Buyer personas

### Primary — The Venue Operator / GM

- **Titles:** GM, Venue Manager, Head of Operations, Owner-Operator
- **Mindset:** Feels the pain of running check-ins, bookings, disputes, and court-time allocation manually. Wants to reduce staffing cost and player friction.
- **Cares about:** Member experience, operational cost, uptime, and whether the system just works on game day.
- **Budget authority:** Usually can sign on Pro tier; Autonomous and above need owner sign-off.

### Secondary — The Owner / Investor

- **Titles:** Founder, Owner, Managing Partner
- **Mindset:** Looking at the venue as an asset. Wants the unit economics to work and the venue to feel premium without a large permanent staff.
- **Cares about:** Payback period, brand positioning, liability coverage (cameras), ability to scale to additional venues.
- **Budget authority:** Signs on everything. Reads proposals for total cost and recurring commitment.

### Tertiary — The IT / Ops Lead

- **Titles:** IT lead (at chain operators), Facilities Manager
- **Mindset:** Cares about whether the install will break existing infrastructure. Skeptical of vendors.
- **Cares about:** Network architecture, handoff documentation, who to call when something breaks.
- **Role in deal:** Gatekeeper — a "no" here kills a deal the GM wanted. Get them onside early.

## Buying triggers

Signals that a venue is likely ready to buy:

1. **Opening a new location** — spec'ing the venue from scratch is the cheapest time to install.
2. **Staff cost pressure** — struggling to hire front-desk staff or running at a loss on labor.
3. **Player churn** — members complaining about check-in friction, booking disputes, or replay disagreements.
4. **Insurance / incident** — a recent liability event is pushing them toward camera coverage.
5. **Expansion mode** — operator is planning 2nd/3rd venue and wants a repeatable tech stack.
6. **Competitor reference** — they heard another venue is using PodPlay and want the same.
7. **Renovation window** — ceiling or electrical work already planned; tech can piggyback.

## Disqualification signals

Don't spend cycles on leads with these traits:

- No budget conversation after 2+ calls.
- Owner wants "just the replay feature" at consumer-hardware pricing.
- Client-provided hardware request where what they want is materially non-standard (random brand switches, consumer APs).
- Facility with structural issues (low ceilings, insufficient power) that the venue is unwilling to address.
- Pure reseller / white-label ask without operator relationship.
- One-off demo for marketing photos with no real install intent.

## How this connects to lead stages

A lead should move from `initial_contact` to `qualified` only when:

- Venue profile is Acceptable or Ideal (not Disqualify).
- At least one buying trigger is clearly present.
- The primary buyer persona is identified by name in `contact_name`.
- `estimated_value` has been computed from the rate card, not from a guess.
- No disqualification signal is active.

If any of these isn't true, the lead stays in `initial_contact` and the skill should say so rather than advancing it.
