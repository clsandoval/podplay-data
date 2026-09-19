---
type: note
title: BOM — Pro Tier, 14 Courts (worked example)
tags: [bom, pro, sizing, example]
---

# Bill of Materials — Pro Tier, 14 Courts

Generated from `templates/bom-pro.yaml` with `courts = 14`. Rules in `network-architecture.md`.

**Derived:** `total_ports = 14 × 3 = 42` → 1× 48-port switch (25–48 band), 1× 48-port patch panel, 12U rack (8U of gear). Replay camera assumed **Uniview** (default); the Dahua alternative is shown where it changes a line.

Prices are last-known PH prices from `data/inventory/` (USD where that's all we have). Blank = unknown. **Do not sum the column** — currencies are mixed and several lines are TBD.

## Venue-level items

| SKU | Item | Qty | Rule | Unit price |
|---|---|---:|---|---:|
| NET-UDM-PRO | UniFi UDM-Pro Gateway | 1 | multi-court Pro, no doors → UDM-Pro | $379 |
| NET-USW-PRO-48-POE | UniFi USW-Pro-48-POE Switch | 1 | 42 ports → 48-port | ₱75,500 |
| NET-SFP-DAC | UniFi SFP+ DAC Cable 0.5m | 1 | UDM ↔ switch | ₱1,750 |
| NET-PATCH-PANEL-48-COUPLER | Cat6 48-Port Patch Panel | 1 | 1 per 48-port switch | — |
| NET-PATCH-0-5M | Vention Cat6 UTP 0.5M | 44 | 42 + 2 | ₱50 |
| NET-PATCH-1M | Vention Cat6 UTP 1M | 2 | fixed | ₱80 |
| NET-PATCH-3M | Vention Cat6 UTP 3M | 2 | 2 + 0 doors | ₱150 |
| INFRA-UPS-1000VA | UPS — 1000 VA / 600 W min | 1 | 406 W ÷ 0.7 ÷ 0.6 = 967 VA → 1000 VA | — |
| INFRA-C14-ADAPTER | C14-to-Universal Adapter Plug | 2 | fixed | ₱69 |
| INFRA-RACK | 12U Network Rack Enclosure | 1 | 8U of gear → 12U | ₱8,400 |
| INFRA-RACK-SHELF | Pyle 1U Vented Rack Shelf | 1 | 1 per venue | ₱2,000 |
| REPLAY-MACMINI | Mac mini (M4) 16GB 256GB | 1 | 1 per venue | ₱36,490 |
| REPLAY-SSD-2TB-KINGSTON | Kingston XS1000 2TB | 1 | 5+ courts → 2TB | ₱19,900 |

## Per-court items (× 14)

| SKU | Item | Per court | Total | Unit price |
|---|---|---:|---:|---:|
| REPLAY-CAMERA-UNIVIEW | Uniview IPC3624LE-ADF28K-WP (Owlview) | 1 | 14 | ₱5,390 |
| DISPLAY-IPAD | iPad (A16) 128GB | 1 | 14 | ₱24,990 |
| DISPLAY-IPAD-POE-GENERIC | PoE to USB-C Adapter, generic | 1 | 14 | ₱236 |
| DISPLAY-IPAD-MOUNT | iPad Locking Wall Mount | 1 | 14 | $81.92 |
| DISPLAY-TV-65 | Samsung 65" TV (U8000F) | 1 | 14 | ₱36,399 |
| DISPLAY-APPLETV | Apple TV 4K (Wi-Fi + Ethernet) 128GB | 1 | 14 | ₱11,600 |
| DISPLAY-ATV-MOUNT | HIDEit ATV4K 3G Apple TV Wall Mount | 1 | 14 | $25 |
| REPLAY-FLIC | Flic Button (Gen 2) | 2 (+2 venue spares) | 30 | $35 |
| REPLAY-SIGN | Aluminum Printed Sign 6x8 | 2 | 28 | $25 |

## Not sized — decide per venue

| Item | Qty | Why |
|---|---|---|
| PP-WIFI-AP-U7LR — UniFi U7-LR | TBD | coverage survey, never a formula |
| TV tilt mount (VESA 400×300) | 14 | by hand, 1 per TV, no catalog SKU |

## Not in the BOM

Junction boxes (ship with the camera) · HDMI cables (ship with the TV) · PDU (UPS socket plate) · rack-side Kisi / NVR (Autonomous tiers only).

## Power and PoE

| | Uniview (default) | Dahua alternative |
|---|---|---|
| Per-court draw | 2.8 + 13 = 15.8 W | 17.5 + 13 = 30.5 W |
| Total load (14 courts + UDM 50 + switch 60 + Mac mini 65 + modem 10) | **406 W** | **612 W** |
| UPS rung | **1000 VA** | **1500 VA** |
| Purchase | KSTAR RT-III 1K (900 W, 45%) | KSTAR RT-III 1K (900 W, 68% — 2 points under the 70% cap) or 2K |
| Switch PoE load | 221 W of 600 W (37%) | 427 W of 600 W (71%) |

Switching camera SKU after the rack is bought is a UPS-rung change, not just a line swap. If a Dahua venue ever ships with the white illuminator on (24 W), the load is 703 W → 2000 VA.

## IP plan

14 courts is a **9+ court venue** — use the wide REPLAY blocks: iPads `.21–.34`, replay cameras `.121–.134`, Apple TVs `.161–.174`, Mac mini `.100`. The ≤8-court blocks (`.31–.38` / `.41–.48`) collide at 11 courts.
