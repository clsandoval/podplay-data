---
type: project
name: Tela Park
status: deployment
tier: autonomous_plus
client: "[[tela-park-client]]"
venue: "[[tela-park-venue]]"
deployment_date: 2026-04-28
installer: "[[juan-dela-cruz]]"
isp_type: dedicated
revenue_stage: deposit_paid
tags: [manila, flagship, demo-site]
---

First autonomous-plus deployment in Metro Manila. Client wants full camera coverage with replay capabilities across all courts. ISP is PLDT dedicated fiber — 100Mbps symmetric confirmed.

Tela Park has agreed to be a PodPlay demo site in the Philippines.

## Scope (as of 2026-04-15)
- **Total courts: 14** — 6 Basic Plus + 8 Pro
- Starting all 14 as Basic Plus first; 8 Pro courts to activate when hardware is ready
- SOW to reflect 14 courts with written acknowledgment of 8 Pro upgrade path
- Booking system activation is the immediate priority (software-only, pre-hardware)

## Agreed Pricing
- 6 Basic Plus courts: $259/month all-in (discounted from $460)
- 8 Pro courts: $1,500/month ($300 venue + $150/court × 8) — pending Pro hardware
- One-time setup fee: $2,500 (software + hardware components; client self-sourcing hardware)
- Pricing denominated in USD
- Payment processor: Magpie (~5% per transaction); client to adjust court pricing accordingly

## Hardware Sourcing
- Tela Park / Cosmas self-sourcing hardware from PodPlay's provided lists
- PodPlay providing: (1) $2,500 setup component list, (2) per-court hardware list
- Client responsible for sourced hardware warranty
- Hard requirement: Tela Park server must be separate from PodPlay's infrastructure
- Network: Ubiquiti (client sourcing); PodPlay configuring
- Cameras: ceiling/overhead mount preferred; existing 6 cable cuts in place
- PoE switches to be added at far court corners
- Commercial-grade TVs required (55–65 inch)

## Key Decisions
- Going with Ubiquiti U6-Pro APs (24 units) for full venue coverage
- Mac Mini M4 as the compute node for replay processing
- 14 courts total; monitors back-to-back per court
- PodPlay control center must retain remote access for replay/support

## Risks
- ISP installation scheduled for April 20 — tight timeline before deployment
- Booking system blocked pending Cosmas go-signal and contract signature
- Membership revenue leaking: only 63 of 111 members billed in April; system urgently needed
- Magpie transaction fee (~5%) requires client to reprice courts before go-live
- Residential TV risk — client must use commercial-grade displays

## Status Updates
- **2026-04-15:** Partnership negotiation meeting at venue. Pricing and scope agreed verbally. Booking system activation unblocked pending Cosmas signal. Contract to be signed within 1–2 weeks. Court layout walked through on-site.
- Site survey done. Cabling complete.
- Blocked on: contract signature + Cosmas go-signal for environment spin-up
