---
type: project
name: Tela Park
status: deployment
tier: pro
client: "[[tela-park-client]]"
venue: "[[tela-park-venue]]"
deployment_date: 2026-11-11
installer: ""
isp_type: client_provided
revenue_stage: deposit_paid
tags: [manila, flagship, demo-site, basic-plus-2, live]
---

First PodPlay deployment in Metro Manila and the PH demo site. Padel facility in Las Piñas, 14 courts, **8 equipped with the Pro build**.

**Plan: Basic+2** (confirmed 2026-08-14): the Basic+ software layer venue-wide (booking, the venue's own player app, push, chat) *and* Pro on the 8 equipped courts, both live on one account. Not "Basic+" and not "Pro"; the two halves differ in scope. Hardware, network and setup follow the Pro build on the 8 courts; the other 6 add nothing physical. No Kisi, no NVR, no security cameras.

## Status

**Live since 2026-11-11** (saved replays work end to end). Network, cameras, Mac mini, iPads, Apple TVs and the Cloudflare Tunnel are done; the old port-forward + DDNS path was removed 2026-11-16. `status` stays `deployment` until the open items below close.

## Courts

| Courts | Build |
|---|---|
| Championship 1–2, Premium 3–8 (the master plan's VIP 1–2 + COURT 1–6) | **Pro**: replay camera, iPad kiosk, Apple TV + 65" display, Flic buttons, signs |
| Standard 1–6 | software only: booking/app, no court-side hardware |

Court number = name number. Booking short names overlap (Standard `C1–C6` and Championship `C1–C2`), so use the slugs, not "C1". The camera IDs on the Mac mini can't change ([[nico]], 2026-11-07), so Premium 3–8 run on IDs `premium-court-1` … `-6`; the dashboard camera names match the courts.

| Court | Camera ID on the Mini | Camera | Apple TV (Mosyle) | iPad (Mosyle) |
|---|---|---|---|---|
| Championship 1 | `championship-court-1` | `.31` | `AppleTV CH1` | `iPad CH1` |
| Championship 2 | `championship-court-2` | `.32` | `AppleTV CH2` | `iPad CH2` |
| Premium 3 | `premium-court-1` | `.33` | `AppleTV P3` | `iPad P3` |
| Premium 4 | `premium-court-2` | `.34` | `AppleTV P4` | `iPad P4` |
| Premium 5 | `premium-court-3` | `.35` | `AppleTV P5` | `iPad P5` |
| Premium 6 | `premium-court-4` | `.36` | `AppleTV P6` | `iPad P6` |
| Premium 7 | `premium-court-5` | `.37` | `AppleTV P7` | `iPad P7` |
| Premium 8 | `premium-court-6` | `.38` | `AppleTV P8` | `iPad P8` |

Only the 8 equipped courts take IP addresses. Equipping a 9th court would move the venue to the wide blocks and re-address every camera and Apple TV, so plan the cutover if it ever happens.

## Pricing

**Basic+2 (current, per the Aug 2026 PH client pricing):**
- Venue fee: **$150/month** (the Basic+ rate, the venue-wide layer)
- Court fee: **$60/month per court** (discounted Pro rate)
- ⚠️ **Open with PodPlay:** does the court fee count all 14 courts ($990/mo) or only the 8 equipped ($630/mo)? Tela Park is exactly the venue where this matters.
- One-time setup: **$2,500** (agreed 2026-04-15; software + hardware components)
- USD-denominated. Payment processor Magpie; transaction fees still being finalized (see [[tela-park-sow]]).

**Superseded, verbal agreement of 2026-04-15:** 6 Basic Plus courts at $259/mo all-in (discounted from $460) + 8 Pro courts at $1,500/mo ($300 venue + $150 × 8). Replaced by the Basic+2 plan above once the tier lineup and PH pricing were confirmed.

## Hardware

**Kosmas delivered (2026-10-16):** 8 iPads, 8 iPad PoE adapters, 8 wall mounts, 8 Apple TV 4K (Ethernet), 18 Flics (16 + 2 spares), Mac mini, Kingston XS1000 2TB, UDM-SE, 4× U7-LR. The 8 Uniview cameras and 8 Samsung TVs went on 2026-10-14. Tela Park mounted the iPads and Apple TVs to PodPlay's specs.

### Court kit (8 Pro courts), quote of 2026-07-20

| Item | Qty | Unit price |
|---|---:|---:|
| [[ipad-128gb-wifi-cellular]] (iPad A16 128GB) | 8 | ₱24,990 |
| [[ipad-poe-adapter]] (UACC-Adapter-PoE-USBC) | 8 | ₱1,332 |
| [[ipad-locking-wall-mount]] | 8 | $81.92 |
| [[apple-tv-4k-ethernet]] (Apple TV 4K 128GB Ethernet) | 8 | ₱11,600 |
| [[tv-65in]] (Samsung 65" U8000F) | 8 | ₱36,399 |
| [[uniview-ipc3624le-owlview]] (replay camera) | 8 | ₱5,390 |
| [[flic-button]] (Flic Gen 2) | 16 | $35 |
| [[mac-mini-16gb]] (Mac mini M4) | 1 | ₱36,490 |
| [[kingston-xs1000-2tb]] (replay SSD) | 1 | ₱19,900 |
| [[aluminum-sign-6x8]] | 16 | TBD |

PHP items ₱810,678 on the quote (it included the network gear below); USD items $1,215.36. Quantities follow the 8-court Pro rules: 16 Flic (2/court) + 2 spares, 16 signs (2/court).

### Network gear

| Item | Qty | Owner | Role |
|---|---:|---|---|
| [[unifi-udm-se]] `PL-TelaPark-UDM` | 1 | Kosmas-delivered | Head end in the **Command Center**: gateway, DHCP, firewall, UniFi controller, Teleport |
| [[unifi-u7-lr]] | 4 | Kosmas-delivered | Facility Wi-Fi on the default LAN (where they connect isn't recorded) |
| Switches | — | **Client-bought** (2026-10-19) | Managed UniFi: a USW 24-port (non-PoE) + PoE pole switches over the client's fiber LAN. Exact models not recorded |

The USW-Flex-2.5G-8-SFP + 5× USW-Lite-8-PoE that Kosmas bought for the poles (delivered 2026-07-23) were **not used**: the client bought their own switches. They're unallocated Kosmas stock.

### Not in Kosmas scope
- **UPS**: Tela Park buys, places and maintains them. Not tracked by Kosmas.
- Rack, patch panel, rack Cat6, C14 adapters, PDU: the client's Command Center hosts the head end.
- Switches (client-bought, above). Junction boxes (ship with the cameras).

## Who owns what

| Part | Owner |
|---|---|
| Network: UDM-SE, switches, PLDT edge | **Tela Park** maintains it (since 2026-10-28). Marco stays the **UI.com owner** of the console, so Kosmas keeps admin + Teleport; ownership transfers only if the client leaves. `unifi@podplay.app` invited 2026-11-06 |
| Mounting iPads + Apple TVs, UPS | Tela Park |
| Mac mini, replay service, dashboard, Mosyle, Cloudflare | Kosmas |

## Network config (as built)

- **Default** `192.168.30.0/24` (off `.1.x` because the PLDT modem's LAN is `192.168.1.x`); UniFi gear management only.
- **REPLAY** `192.168.32.0/24`, VLAN 32, gateway `.32.254`. Allow Internet ON, Isolate Network OFF. Switch uplinks: Default untagged + REPLAY tagged; court ports native REPLAY.
- **IP blocks** (chosen by Tela Park IT): Apple TVs `.11–.18`, iPads `.21–.28` (bound to the PoE adapter's MAC), cameras `.31–.38` (camera `.3N` = court N), Mac mini `.100`. Devices on DHCP with a Fixed IP set in UniFi. The Apple TV block differs from the standard `.41–.48` and stays.
- **WAN:** UDM-SE `192.168.1.247` behind the PLDT modem (Huawei HG8145X6). Public IP dynamic, not CGNAT by traceroute.
- **Replay path in:** Cloudflare Tunnel `telapark` → `https://replay-telapark.fnasasin.com`. **No inbound ports**: the UDM-SE 4000 forward was deleted 2026-11-16; the PLDT forward never existed. Outbound TCP/UDP 7844 must stay open on REPLAY.
- **Monitoring:** Better Stack on `https://replay-telapark.fnasasin.com/health` every 3 min, email alerts (replaced the GCP uptime check).
- **Remote admin:** UniFi Teleport on the UDM-SE only; connect to the Mac mini by IP `192.168.32.100`, not `.local`. The Tailscale backup was removed 2026-11-09.

## Mac mini + replay service

- `PL-telapark`, user `pl-telapark`, M4. IP `192.168.32.100` set by hand with DNS `1.1.1.1 8.8.8.8` (empty DNS broke registration on 2026-10-27). Paired with the dashboard 2026-10-27.
- Replay service **2.1.2** (self-updated). Upload key installed by [[nico]] 2026-11-11; survived the 2.1.2 update; recheck after every self-update.
- SSD Kingston XS1000 2TB `Replays`, mounted at boot by a root LaunchDaemon. **Plug it in before powering the Mini.**
- Auto-login ON, screen lock OFF ([[nico]], 2026-11-06), FileVault OFF, Wi-Fi OFF, Remote Login + Screen Sharing ON, Full Disk Access on the replay service.
- Dashboard: `telapark.podplay.app` → Settings → Venues → Las Piñas → Replays → `PL-telapark`. `LOCATION_ID` / tenant id `telapark`. Server URL = the tunnel URL, local IP `192.168.32.100`, auto-cleanup ON (3 days).

## Cameras, Mosyle + Flics

- 8× Uniview Owlview `IPC3624LE-ADF28K-WP`, IR illumination. Main H.264 1920×1080 30 fps, audio G.711 µ-law, all 8 read 2026-11-07.
- Mosyle groups `iPad telapark`, `AppleTV telapark`; P-List `id = telapark` on PodPlay - Kiosk and PodPlay - TV. Court number set on all 16 devices; a replay shows on each court's TV (2026-11-16). AirPlay disabled on the Apple TVs.
- Courts 1–2 Apple TVs were swapped for two pre-enrolled units from the inbound batch (the originals on tvOS 26.5 hit the 26.4+ enrollment bug). All 8 enrolled and handed over 2026-10-16.
- Flics paired 2026-11-09, 2 per court: single press = score, double = undo, long = replay.

## Key decisions
- **Basic+2, not Pro** (2026-08-14). The Basic+ half is software only, so the build is plain Pro.
- **Client-designed distributed switching, client-bought** (2026-10-19) instead of one USW-Pro-24. REPLAY works across the pole switches because it's one VLAN.
- **Network handed to Tela Park (2026-10-28), UI.com ownership kept** by Kosmas per PodPlay's rule for contract clients.
- **Cloudflare Tunnel instead of port forward + DDNS.** The PLDT forward was never set up, so replays never worked ("clip processing failed"). PodPlay recommended the tunnel (2026-11-04); live 2026-11-05; old path removed 2026-11-16 after the cellular test.
- **Auto-login ON, screen lock OFF.** The replay service only runs with a user logged in; keep the Mini somewhere secure.
- **Mosyle names `AppleTV CH1` / `iPad P3`**, matching the court names, instead of the standard `{Device} telapark Court #` (2026-11-08).
- **Recording follows reservations** (replay service 2.1.0+; deliberate per [[nico]], 2026-11-06, because 24/7 wore out SSDs). Recording starts ~30 min before a reservation.
- Uniview Owlview replay camera (fixed 2.8 mm, 802.3af); Mac mini M4 as the replay server, separate from PodPlay's infrastructure (hard client requirement).

## Open items
- [ ] Re-aim and calibrate seven cameras (Championship 1 done)
- [ ] Mount the Flics, waiting on the custom aluminium printed signs
- [ ] Turn on App Lock on the iPads once the Flics are mounted
- [ ] Billing basis: court fee on 8 or 14 courts (PodPlay)
- [ ] Ask [[nico]] which reservation types start recording
- [ ] Contract counterpart signed (see [[tela-park-sow]])
- [ ] Apple devices from PodPlay paid / billed (see `tickets/tela-park-apple-device-payment.md`)

## Status updates
- **2026-04-15:** Negotiation meeting at the venue. Pricing and scope agreed verbally (6 Basic Plus + 8 Pro). See `meetings/2026-04-15-tela-park-negotiation.md`.
- **2026-05-04:** Client received lab network hardware (UPS, 24-port switch, UDM). Replay camera: 1 test unit before full order.
- **2026-05-21:** Contract terms aligned per KAN-2: 1-year term, 6-month introductory pricing, Magpie included in setup.
- **2026-06-02:** Intake meeting. PLDT, dynamic IP, Pro build on 8 courts.
- **2026-07-06:** Client proposed distributed switching over their fiber LAN; standard rack/switch dropped.
- **2026-07-20:** Hardware quote issued (table above).
- **2026-07-23:** Kosmas pole switches + APs delivered (switches later unused).
- **2026-08-14:** Plan confirmed as **Basic+2**.
- **2026-10-14 / 10-16:** Cameras + TVs, then the rest of the court kit, delivered to the venue. All 8 Apple TVs enrolled and handed over.
- **2026-10-19:** Client bought their own switches.
- **2026-10-27:** Mac mini paired with the dashboard; REPLAY moved to `.32`.
- **2026-10-28:** Network handed to Tela Park to maintain.
- **2026-11-05:** Cloudflare Tunnel live.
- **2026-11-09:** Flics paired; Tailscale removed.
- **2026-11-11:** **Live**: saved replays work end to end.
- **2026-11-16:** Old port-forward + DDNS path removed; replay shows on every court TV.
- **2026-11-23:** Championship 1 camera re-aimed by then; seven to go.
