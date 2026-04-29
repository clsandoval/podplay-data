---
type: project
name: Tela Park
status: deployment
tier: autonomous_plus
client: "[[tela-park-client]]"
venue: "[[tela-park-venue]]"
deployment_date: 2026-04-28
installer: ""
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
- **Network hardware: Tela Park self-sourcing entirely** — do not include in any BOM or hardware lists for this project. This covers all Ubiquiti networking gear (UDM, switches, APs, patch panels, rack, PDU, UPS, DAC cables, etc.)
- PodPlay provides only the items listed below for the 8 Pro courts
- Client responsible for sourced hardware warranty
- Hard requirement: Tela Park server must be separate from PodPlay's infrastructure
- Cameras: ceiling/overhead mount preferred; existing 6 cable cuts in place
- PoE switches to be added at far court corners (client sourcing)
- Commercial-grade TVs required (55–65 inch)

## PodPlay-Provided Hardware (8 Pro Courts)

### Venue-Level (×1)
| Item | Qty |
|---|---|
| Mac Mini 16GB | 1 |
| Samsung T7 2TB SSD | 1 |

### Per-Court (×8)
| Item | Per Court | Total |
|---|---|---|
| EmpireTech Replay Camera | 1 | 8 |
| EmpireTech Junction Box | 1 | 8 |
| Flic Button | 2 | 16 |
| Aluminum Sign 6x8 | 1 | 8 |
| 65" TV Display | 1 | 8 |
| VESA 400x300 TV Tilt Wall Mount | 1 | 8 |
| Apple TV 4K with Ethernet | 1 | 8 |
| Amazon Basics 3ft HDMI Cable | 1 | 8 |
| HIDEit Apple TV Wall Mount | 1 | 8 |
| iPad 128GB WiFi+Cellular | 1 | 8 |
| iPad PoE Adapter | 1 | 8 |
| iPad Kiosk Case with Lock | 1 | 8 |

## Key Decisions
- Going with Ubiquiti U6-Pro APs (24 units) for full venue coverage (client sourcing)
- Mac Mini M4 as the compute node for replay processing
- 14 courts total; monitors back-to-back per court
- PodPlay control center must retain remote access for replay/support

## Risks
- ISP installation scheduled for April 20 — tight timeline before deployment
- Booking system blocked pending Kosmas go-signal and contract signature
- Membership revenue leaking: only 63 of 111 members billed in April; system urgently needed
- Magpie transaction fee (~5%) requires client to reprice courts before go-live
- Residential TV risk — client must use commercial-grade displays

## Status Updates
- **2026-04-15:** Partnership negotiation meeting at venue. Pricing and scope agreed verbally. Booking system activation unblocked pending Kosmas signal. Contract to be signed within 1–2 weeks. Court layout walked through on-site.
- Site survey done. Cabling complete.
- Blocked on: contract signature + Kosmas go-signal for environment spin-up
