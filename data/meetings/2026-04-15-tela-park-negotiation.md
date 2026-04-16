---
type: meeting
date: 2026-04-15
attendees: ["[[tela-park-client]]", "[[tela-park-venue]]"]
project: "[[tela-park]]"
meeting_type: site_visit
tags: [negotiation, pricing, hardware, booking-system]
---

## Agenda
- Review venue feedback (lights, ventilation, facility)
- Align on revised scope: 6 Basic Plus + 8 Pro courts
- Hardware sourcing approach
- Urgent: booking system activation
- Court camera/monitor layout walkthrough

## Attendees
- **Speaker 1** — Tela Park (owner/operator, likely Jonel/Ned)
- **Speaker 2** — Cosmas representative (Ernesto/Dicky)
- **Speaker 4** — PodPlay lead
- **Speaker 5** — PodPlay technical (Carlos/Marco)

## Notes

### Venue Feedback
- **Lighting:** 150W fixtures producing ~420 lux vs PVA standard 500 lux. Still playable; Tela Park accepted it.
- **Ventilation:** Natural ventilation + big fan installed. Manageable but warm; no aircon budget (~PHP 600K cost cited). Doors were not being opened — issue noted.
- **Bathroom:** Location is far from courts; architect's recommendation. No budget for additional bathrooms, no shower/toilet in current build.
- **Flooring:** Silica salt material.
- **New additions:** Stock room / dressing room added. IT room has PA system, all wiring (including fiber) centralized there.

### Pricing Agreed
- **6 Basic Plus courts:** Originally $460/month ($100 venue + $60/court × 6). Cosmas negotiated down to **$259/month all-in**.
- **8 Pro courts:** **$1,500/month** ($300 venue fee + $150/court × 8). To activate when Pro hardware is ready.
- **Setup fee (one-time):** **$2,500** — combination of software + hardware components. PodPlay to share breakdown: software portion vs. hardware list that client can self-source.
- **Per-court Pro setup (one-time):** ~$285,000 setup fee + ~$142,500/court hardware (historical reference from prior SOW).
- **Pricing denominated in USD** to avoid FX volatility (PHP/USD fluctuates 57–61).
- **Payment processing:** Moving from Stripe to **Magpie** (~5% per transaction fee). Client needs to adjust court pricing to absorb this.

### Hardware Sourcing Approach
- Tela Park / Cosmas will **self-source hardware** from PodPlay's lists.
- PodPlay will share two lists: (1) $2,500 setup component list, (2) per-court hardware list (iPad, Apple TV, cameras, clickers, monitors/TVs).
- **PodPlay not responsible for warranty** on client-sourced hardware.
- **Hard requirement:** Tela Park server must be **separate from PodPlay's server** — cannot share infrastructure for supportability reasons.
- **TV recommendation:** Commercial-grade, 55–65 inch. Residential TVs burn out under commercial operating hours.
- **Network:** Ubiquiti preferred. Tela Park will purchase their own Ubiquiti gear; PodPlay (Carlos/Marco) will configure.
- **Cameras:** Overhead/ceiling mount preferred (original PodPlay standard). Currently blocked by existing cable cuts — 6 cable cuts in place.
- **Power per court:** 3 power outlets + 3 cable cuts. PoE switches to be added at far court corners to avoid long power runs.
- **iPad:** PoE-powered. Monitor and Apple TV need dedicated power outlets.
- **Clickers/flick buttons:** Placement TBD — options are back or side of court; PodPlay will recommend.
- Cosmas has pricing from a supplier for 14 units; waiting on final quote for larger volumes.

### Booking System (Urgent)
- Tela Park has been running **manual Excel-based operations for 4 months**.
- Opened Feb 28 with 14 courts — double bookings, missed payments, untracked revenue.
- **Membership issue:** 111 active members; only 63 of 111 were charged for April. ~48 members not billed = significant lost recurring revenue. Down from 180 members due to lack of system.
- **Decision:** Activate booking system (software only) **immediately**, contract to follow in 1–2 weeks.
- New system: PurePH platform + GCash / other PH payment methods (no longer Messenger-based).
- Cosmas to signal PodPlay to expand/spin up the environment.

### Plan: SOW for 14 Courts
- Start all 14 courts as **Basic Plus** (since Pro hardware not yet ready).
- SOW to be signed for 14 courts with written acknowledgment that 8 will upgrade to Pro.
- Billing will be revised when Pro hardware is installed and activated.
- Tela Park willing to be a **PodPlay demo site** in the Philippines.

### Court Layout Walkthrough
- Championship courts will have a shared center **pole** — cameras mounted on both sides.
- Camera mount: Overhead/ceiling preferred over pole-top mount.
- Monitor placement: back-to-back per court. Advertising real estate concern raised — monitors facing wrong direction lose ad impressions.
- 6 cable cuts in place (3 + 3). Power outlets: 3 per court location.
- VLANs configured in corners. PoE switch to be added mid-run to extend reach.
- PodPlay team will handle all **configuration** (cameras, firewall, NVR, network). Installation/supervision by PodPlay; Tela Park's own network engineers to assist.
- PodPlay control center must retain access for remote troubleshooting/replay service.

### Content & Monetization
- Weekly highlights for social media from replays.
- Scoreboard shows ads + watermarks (Cosmos logo example shown).
- Replay/video can be sold per clip; transaction fee applies.

## Action Items
- [ ] PodPlay to share $2,500 setup component breakdown (software vs. hardware)
- [ ] PodPlay to share per-court hardware list (iPad, cameras, clickers, Apple TV, monitors)
- [ ] Cosmas to share supplier quote for 14-unit hardware batch
- [ ] Cosmas to signal PodPlay to expand environment (unblock booking system)
- [ ] PodPlay (Vicky) to draft SOW for 14 Basic Plus courts with 8 Pro acknowledgment
- [ ] Tela Park to decide pricing adjustment to absorb ~5% Magpie transaction fee
- [ ] PodPlay to confirm exact Magpie transaction fee %
- [ ] Determine commercial TV supplier (Samsung contact from Cosmas mentioned)
- [ ] Clicker placement recommendation from PodPlay (back vs. side of court)
- [ ] PodPlay to share Ubiquiti-compatible firewall/NVR specs for Tela Park to source
