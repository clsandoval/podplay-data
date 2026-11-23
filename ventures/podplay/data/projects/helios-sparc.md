---
type: project
name: Helios SPARC
status: procurement
tier: pro
client: ""
venue: "[[helios-sparc-venue]]"
deployment_date: 2027-01-14
installer: ""
isp_type: ""
revenue_stage: ""
tags: [manila, bridgetowne, indoor, pickleball, ppa, helios]
---

The second PH PodPlay venue: **Helios SPARC**, the interim 14-court facility at Bridgetowne (formerly "Helios Beta"). **Not** the 2028 flagship, which is [[helios]]. The venture side lives at `ventures/helios-pickleball-center/`.

A mixed-tier venue: **14 pickleball courts on Pro**, plus a **ping pong area on Autonomous** (Kisi door access) after the opening. `tier: pro` covers the courts; the ping pong area is recorded here, not in the enum.

## Status

**Procurement.** Some hardware is "already ordered" (which items isn't recorded), but **no switches yet**: they wait on the first site visit and run measurements. Site not surveyed yet. Switch layout is a draft.

| Milestone | Date |
|---|---|
| Construction complete | End of December 2026 |
| **Target opening** | **2027-01-14, PPA event** ([[ppa-asia-tour-2027]]) |

**Installation:** [[marco-basug]] leads the physical install with an outsourced AV / low-voltage contractor (cable runs and the MDF ↔ IDF fiber are the contractor's scope).

## Network

- 3 devices per court or table (camera, iPad, Apple TV), each on its own Cat6 home run to a PoE switch. No small switches at the courts (unlike Tela Park's pole switches).
- iPads are **fence-mounted**, Ethernet run through the fence. Per PodPlay's hardware plan: kiosk = 65" TV at 8'9" AFF + iPad at 4'8" AFF, 2 Cat6 + 1 duplex outlet; camera = 1 Cat6 with a 6 ft coil.
- **Cloudflare Tunnel from day one**, no port forward or DDNS. First real run of the `venue-tunnel` setup script (Tela Park was built by hand).
- **UniFi:** Kosmas owns the console; invite `unifi@podplay.app`.

### Switch layout (draft, pending the site survey)

| | MDF (server room on A-2.0) | West IDF (storage room by the west stair, door GD20) |
|---|---|---|
| Gateway | [[unifi-udm-se]] (Kisi readers on its PoE ports) | — |
| Switch | [[unifi-usw-pro-48-poe]] | [[unifi-usw-pro-24-poe]] (the unallocated on-hand unit) |
| Serves | Courts 1–8 + 5 ping pong tables = 39 of 48 ports | Courts 9–14 = 18 of 24 ports |
| PoE at max draw | ≈ 397 W of 600 W (66%) | ≈ 183 W of 400 W (46%) |
| UPS | ≈ 610 W → **2K** | ≈ 233 W → its own **1K** (26%) |
| Uplink | — | **Fiber**, SFP+ both ends (~80 m on the plan, ~86–92 m in the wall) |

- **Why an IDF:** from the server room, west courts 10–13 run ~96–118 m along the walls, past Cat6's limit. From the IDF spot the longest run is ~72 m.
- **Why fiber:** the MDF ↔ IDF route is at or past 90 m once it climbs and drops. Match the SFP+ modules to the fiber the contractor pulls (single-mode vs multimode), and buy them after. Pre-terminated LC-LC, next standard length up from the measured route.
- **Second wiring option:** both switches straight into the UDM (IDF fiber on the UDM-SE's SFP+ LAN port, the 48 on a short Cat6, Mac mini on the UDM), so a 48 outage only drops courts 1–8. Same parts cost.

### IP plan

REPLAY `192.168.32.0/24` (VLAN 32, gateway `.254`), Default `192.168.30.x`. 14 courts is past the ≤8-court blocks, so it uses the **9+ court table**: iPad `.20 + N`, camera `.120 + N`, Apple TV `.160 + N`, with N running across the whole venue.

| N | What | iPad | Camera | Apple TV |
|---|---|---|---|---|
| 1–14 | Pickleball courts 1–14 | `.21–.34` | `.121–.134` | `.161–.174` |
| 15, 16, … | Ping pong table 1, 2, … | `.35`, … | `.135`, … | `.175`, … |
| — | Mac mini | `.100` | | |

Holds up to N = 40 (26 ping pong tables). Name tables distinctly in UniFi and Mosyle (e.g. `iPad TT1` = N 15).

## Hardware

Starts from the 14-court Pro worked example, with the switch layout above, Kisi for the ping pong area and a 4TB SSD.

**MDF rack (server room):** [[unifi-udm-se]] · [[unifi-usw-pro-48-poe]] (**not ordered**, waits on the site survey) · [[unifi-sfp-dac]] · SFP+ fiber module + fiber run · 2× [[cat6-24-port-patch-panel]] · [[kisi-controller-pro-2]] (1 per 4 doors) · [[ups-2000va]] (KSTAR MP RT 2K S, **not the 1K**; needs 5 outlets) · 2× [[c14-universal-adapter]] · [[12u-network-rack]] (≥610 mm deep, ~10U used) · [[mac-mini-16gb]] (M4/M5, bought new from Power Mac Center) + 2U shelf · [[kingston-xs2000-4tb]] · [[vention-cat6-0-5m]] ×41, [[vention-cat6-1m]] ×2, [[vention-cat6-3m]] ×2.

**West IDF (courts 9–14):** [[unifi-usw-pro-24-poe]] (on hand) · SFP+ fiber module (same type as the MDF end) · [[cat6-24-port-patch-panel]] · [[ups-1000va]] on its own outlet · lockable wall cabinet ≥6U · [[vention-cat6-0-5m]] ×20.

**Per court (×14):**

| Item | Qty | Notes |
|---|---:|---|
| [[dahua-ipc-hdw5459t-ze-il]] replay camera | 14 | 8 Dahuas on hand, not yet allocated; if they come here, buy 6 more. Don't mix camera models |
| [[ipad-128gb-wifi-cellular]] (iPad A16) | 14 | On hand |
| iPad PoE → USB-C adapter, low-power 802.3af | 14 | 8 on hand, buy 6. **Not** the 25 W `UACC-PoE+-USBC` |
| [[ipad-locking-wall-mount]] | 14 | Fence hardware comes in the kit |
| [[apple-tv-4k-ethernet]] | 14 | On hand (pre-enrolled batch, Ethernet model) |
| [[hideit-appletv-mount]] | 14 | |
| [[tv-65in]] + tilt mount | 14 + 14 | HDMI comes with the TVs |
| [[flic-button]] | 30 | `(14 × 2) + 2`, covered by the 120 on hand (held by Tito Kim). **May not be needed**, see below |
| [[aluminum-sign-6x8]] | 28 | Supplier TBD |

**Ping pong area (Autonomous, after the opening):** court kit per table ×5 (assumed; 5 drawn on A-2.0, count unconfirmed) · [[kisi-reader-pro-2-1]] 1 per door (on the UDM-SE) · push-to-exit button per mag-lock door. Doors not decided.

**Door access option 2: UniFi Access**: no monthly licence. Per door a UA-Hub-Door (one PoE++ port, up to 50 W, on the 48's PoE++ ports) + a reader (e.g. UA-G3-Pro) + the lock. Not yet known whether PodPlay's Autonomous booking can unlock UniFi Access doors; its door integration is Kisi. Either way, keep 2–3 of the 48's PoE++ ports free for door hardware.

**Not in this list:** cable runs and the MDF ↔ IDF fiber (contractor), Wi-Fi APs (a coverage decision; the sizing gives 0), junction boxes.

## Cameras

- Mount per PodPlay: **16 ft** from the baseline, **~11 ft** AFF, minimum ~8–9 ft.
- ⚠️ **Center court has LED screens at both baselines.** Its camera position waits on [[richard-bachmann]]'s screen dimensions + photos.

## Support

Two Slack channels with PodPlay for Kosmas's team: one with the replay devs, one with the iOS devs. Not set up yet.

## Key decisions
- **MDF + west IDF with home runs**, not small court switches: run lengths force a second switch; home runs keep gear and UPS in two places, not one per pole.
- **USW-Pro-48-POE at the MDF** (39 ports past a 24); **USW-Pro-24-POE at the IDF** (on hand, room to spare; a 16 fits only courts 9–13 at 85% of its PoE).
- **UDM-SE, not UDM-Pro**: Kisi readers go on the SE's PoE. If [[nico]] confirms Autonomous can unlock UniFi Access doors and the doors go Access, buy the **UDM-Pro** instead (~$120 less); if the gateway must be ordered before that answer, buy the SE.
- **Kingston XS2000 4TB, not 2TB**: recordings follow reservations and are kept 3 days; at the Dahua 8 Mbps cap, 2TB holds ~10 booked hours per court per day before the 80% alert, the 4TB ~21.
- **Fiber uplink to the IDF**, not Cat6 (distance, not bandwidth).
- **KSTAR 2K UPS at the MDF**: ~610 W is 68–69% of a 1K, no headroom.
- **Low-power 802.3af iPad adapters**: keeps the PoE budget comfortable at 14 courts.
- **Cloudflare Tunnel from day one**: Tela Park's replays failed for weeks on a missing ISP forward.
- **Flics vs gesture scoring**: PodPlay plans to move scoring, replay and undo to arm gestures at the camera. Not confirmed whether it's live by 2027-01-14 or which cameras it needs, so bring the 30 Flics as the fallback.
