---
type: project
name: Tela Park
status: deployment
tier: pro
client: "[[tela-park-client]]"
venue: "[[tela-park-venue]]"
deployment_date: null
installer: ""
isp_type: client_provided
revenue_stage: deposit_paid
tags: [manila, flagship, demo-site, basic-plus-2]
---

First PodPlay deployment in Metro Manila and the PH demo site. Padel facility in Las Piñas, 14 courts, **8 equipped with the Pro build**.

**Plan: Basic+2** (confirmed 2026-08-14) — the Basic+ software layer venue-wide (booking, the venue's own player app, push, chat) *and* Pro on the 8 equipped courts, both live on one account. Not "Basic+" and not "Pro"; the two halves differ in scope. Hardware, network and setup follow the Pro build on the 8 courts; the other 6 add nothing physical. No Kisi, no NVR, no security cameras.

## Status

**Pending.**

## Courts

| Side | Courts | Build |
|---|---|---|
| Left | COURT 1–6, VIP 1, VIP 2 | **Pro** — replay camera, iPad kiosk, Apple TV + 65" display, Flic buttons, signs |
| Right | COURT 7–12 | software only — booking/app, no court-side hardware |

Only the 8 equipped courts take IP addresses, so the ≤8-court REPLAY blocks apply (`notes/network-architecture.md`). Equipping a 9th court would move the venue to the wide blocks and re-address every camera and Apple TV — plan the cutover if it ever happens.

## Pricing

**Basic+2 (current, per the Aug 2026 PH client pricing):**
- Venue fee: **$150/month** (the Basic+ rate — the venue-wide layer)
- Court fee: **$60/month per court** (discounted Pro rate)
- ⚠️ **Open with PodPlay:** does the court fee count all 14 courts ($990/mo) or only the 8 equipped ($630/mo)? Tela Park is exactly the venue where this matters.
- One-time setup: **$2,500** (agreed 2026-04-15; software + hardware components)
- USD-denominated. Payment processor Magpie — transaction fees still being finalized (see [[tela-park-sow]]).

**Superseded — verbal agreement of 2026-04-15:** 6 Basic Plus courts at $259/mo all-in (discounted from $460) + 8 Pro courts at $1,500/mo ($300 venue + $150 × 8). Replaced by the Basic+2 plan above once the tier lineup and PH pricing were confirmed.

## Hardware

**Kosmas purchases all hardware** — court kit *and* network gear (corrected 2026-07-13; an earlier note that the client self-sources network gear was recorded in error). The client **designed** the network; Kosmas bought it and configures it. Client responsible for warranty on anything they source themselves.

### Court kit (8 Pro courts) — quote of 2026-07-20

| Item | Qty | Unit price |
|---|---:|---:|
| [[ipad-128gb-wifi-cellular]] — iPad (A16) 128GB | 8 | ₱24,990 |
| [[ipad-poe-adapter]] — UACC-Adapter-PoE-USBC | 8 | ₱1,332 |
| [[ipad-locking-wall-mount]] | 8 | $81.92 |
| [[apple-tv-4k-ethernet]] — Apple TV 4K 128GB Ethernet | 8 | ₱11,600 |
| [[tv-65in]] — Samsung 65" U8000F | 8 | ₱36,399 |
| [[uniview-ipc3624le-owlview]] — replay camera | 8 | ₱5,390 |
| [[flic-button]] — Flic (Gen 2) | 16 | $35 |
| [[mac-mini-16gb]] — Mac mini (M4) | 1 | ₱36,490 |
| [[kingston-xs1000-2tb]] — replay SSD | 1 | ₱19,900 |
| [[aluminum-sign-6x8]] | 16 | TBD |

PHP items ₱810,678 (incl. the network gear below); USD items $1,215.36. Quantities follow the 8-court Pro rules — 16 Flic (2/court; the 2 venue spares are on hand separately), 16 signs (2/court).

### Network (client-designed, Kosmas-purchased)

Distributed switching over the client's existing fiber-star LAN instead of the standard single rack switch:

| Item | Qty | Unit price | Role |
|---|---:|---:|---|
| [[unifi-udm-se]] | 1 | ₱39,900 | Head end in the **Command Center** (reception/admin): gateway, DHCP, firewall, UniFi controller, TCP+UDP 4000 forward → Mac mini |
| UniFi USW-Flex-2.5G-8-SFP | 1 | ₱11,100 | "Fiber switch" below the beam by the left fire exit; SFP+ uplink to the UDM-SE; Cat6 to each pole |
| UniFi USW-Lite-8-PoE | 5 | ₱9,000 | One per pole (4 PoE ports, ~52 W); serves ≤2 courts each |
| [[unifi-u7-lr]] | 3 (4 delivered, +1 spare) | ₱13,500 | Facility Wi-Fi, ceiling drops, default LAN — firewalled off REPLAY |

The two Flex/Lite switches are Tela Park-specific and not catalog SKUs. Delivered 2026-07-23 (₱123,312 for the APs + switches); the UDM-SE was already on hand. **10 UniFi devices** for the controller to adopt.

**Per-pole budget:** each Pro court needs 2 PoE ports (camera ~2.8–7 W + iPad adapter ~10 W); Apple TVs are mains. A 2-court pole uses 4 of 4 PoE ports and 7 of 8 ports — ~34 W of 52 W. A 3-court pole doesn't fit; the escape hatch is powering cameras off the pole's 220 V outlet via 12 V DC to free PoE ports. Each pole has 2× Cat6 provisioned (1 active + 1 spare) and 220 V at pole height.

### Not in Kosmas scope
- Rack, patch panel, rack Cat6, C14 adapters, PDU — the client's Command Center hosts the head end; no rack in the delivery.
- **UPS** — unresolved. Client floated 7 units (Command Center + fiber switch + 5 poles) and asked their electrician about one breaker; a shared breaker alone doesn't reduce UPS count. Whose budget is open.
- The standard USW-Pro-24-PoE — reallocated to a different facility 2026-07-13.
- Junction boxes (ship with the cameras).

## Network config

- **REPLAY** `192.168.32.0/24` only — no surveillance or access-control VLANs (Pro build). Mac mini `.32.100`; iPads `.21–.28`, cameras `.31–.38`, Apple TVs `.41–.48`, MAC-bound reservations (iPad = the PoE adapter's MAC). Confirm the client's LAN doesn't already use `192.168.32.x` / `.30.x`.
- REPLAY gets internet (Mosyle, updates, NTP); block inter-VLAN; APs on the default LAN.
- **WAN:** PLDT, **public dynamic IP** — client says non-CGNAT, **must verify** (`whatismyip.com` vs modem WAN). How the public IP reaches the UDM-SE (static / DMZ / port-forward / bridge) is Tela Park IT's call; the acceptance test is public TCP+UDP 4000 reaching the Mac mini. A business plan with static IP is the recommendation.
- **DDNS:** `telapark.fnasasin.com` on a Kosmas-controlled Cloudflare zone, DNS-only, TTL 60; cron on the Mac mini. Dashboard API URL `http://telapark.fnasasin.com:4000`, local `http://192.168.32.100:4000`. (PodPlay's `podplaydns.com` is not available to us.)
- **Health:** GCP uptime check on `/health` every 5 min; alert policy held off until live.
- **Remote admin:** Teleport on the UDM-SE (by IP `192.168.32.100`, not `.local`); Tailscale on the Mac mini as backup. Mac mini account `pl-telapark`, host `PL-telapark`.
- **Responsibility split:** Kosmas owns and controls the UDM-SE, all 6 switches, the APs and all network config. The client owns only the PLDT edge.

## Key decisions
- Uniview Owlview replay camera (fixed 2.8 mm, 802.3af) — bench-tested, RTSP verified.
- Kingston XS1000 2TB replay store; headless automount via a root LaunchDaemon on the M4 Mac mini.
- Mac mini M4 as the replay server; separate from PodPlay's infrastructure (hard client requirement).
- Cameras overhead/ceiling mount preferred; championship courts share a center pole with cameras on both sides; monitors back-to-back per court.
- Commercial-grade 55–65" TVs required.

## Open items
- [ ] Billing basis — court fee on 8 or 14 courts (PodPlay)
- [ ] Pole ↔ court mapping (client) — ≤2 Pro courts per pole
- [ ] UPS scope and placements — whose budget
- [ ] Confirm non-CGNAT line; client's existing LAN subnets
- [ ] Contract counterpart signed (see [[tela-park-sow]])

## Status updates
- **2026-04-15:** Negotiation meeting at the venue. Pricing and scope agreed verbally (6 Basic Plus + 8 Pro). Booking system activation unblocked pending Kosmas signal. See `meetings/2026-04-15-tela-park-negotiation.md`.
- **2026-05-04:** Client received lab network hardware (UPS, 24-port switch, UDM). Replay camera: 1 test unit before full order.
- **2026-05-21:** Contract terms aligned per KAN-2 — 1-year term, 6-month introductory pricing, Magpie included in setup.
- **2026-06-02:** Intake meeting. PLDT, dynamic IP, Pro build on 8 courts.
- **2026-07-06:** Client proposed distributed switching over their fiber LAN; standard rack/switch dropped. Network to be configured on-site.
- **2026-07-13:** Sourcing corrected — Kosmas buys the network hardware; the client only designed it. USW-Pro-24 reallocated elsewhere.
- **2026-07-20:** Hardware quote issued (table above).
- **2026-07-23:** Network hardware delivered.
- **2026-08-14:** Plan confirmed as **Basic+2**.
- **Current: Pending.**
