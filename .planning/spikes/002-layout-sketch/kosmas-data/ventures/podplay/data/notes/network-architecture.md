---
type: note
title: Network Architecture
tags: [networking, vlan, replay, infrastructure, ddns]
---

## VLAN Layout

All PodPlay gear runs on **VLAN 32** (the REPLAY network), subnet `192.168.32.x`.

This isolates PodPlay equipment from general venue or ISP traffic and provides a predictable addressing scheme across all deployments.

## Replay Server

- **Device:** Mac Mini
- **Fixed IP:** `192.168.32.100`
- **Service port:** `4000` (critical — must be forwarded from ISP static IP)
- The ISP must provision a static IP and forward port 4000 to `192.168.32.100`.

## Health Monitoring

- DDNS hostname format: `areaname.podplaydns.com`
- Google Cloud monitoring pings the DDNS endpoint every **5 minutes**
- Alerting fires if the endpoint goes unreachable

## ISP Requirements

- **Static IP** required for port 4000 forwarding
- **Gigabit internet** strongly recommended
  - Estimated bandwidth: ~105 GB/week for a 6-court venue
  - Scale proportionally for larger venues

## Philippines Latency

- Round-trip latency to US cloud: **300–400ms**
- This is acceptable for the replay service — no synchronous US cloud dependency in the critical path

## Equipment

- Gateway: UniFi UDM-SE (default) — see `templates/bom-pro.yaml` for full rack layout
- Switch: See switch sizing guidance below
- NVR (Autonomous Plus only): connected to switch via SFP+ DAC

## Switch Sizing

**Default: USW-Pro-48-POE** for any venue with 8+ courts or 10+ APs.

The old rule (24-POE for ≤8 courts) was too simple — it doesn't account for AP density, edge switches, or security cameras. Count ports before committing to a switch.

### Port consumption per device type

| Device | Ports per unit | Notes |
|--------|---------------|-------|
| Replay camera | 1 | Per court |
| iPad (PoE) | 1 | Per court |
| Apple TV | 1 | Per court |
| UniFi AP | 1 | Coverage-based, not per court |
| Edge PoE switch | 1 (uplink) | For far court clusters |
| Mac Mini | 1 | Venue-level |
| NVR (Autonomous Plus) | 1 | Via SFP+ DAC |
| UDM gateway | 1 (uplink) | Via SFP+ DAC |

### Worked example — Tela Park (8 Pro courts, 24 APs)

| Device | Qty | Ports |
|--------|-----|-------|
| Replay cameras | 8 | 8 |
| iPads | 8 | 8 |
| Apple TVs | 8 | 8 |
| UniFi APs | 24 | 24 |
| Mac Mini | 1 | 1 |
| **Total** | | **49** |

49 ports required — exceeds the USW-Pro-24-POE's 24 ports even before adding cameras (Autonomous Plus) or edge switch uplinks. USW-Pro-48-POE is the correct choice.

### Rule of thumb

- **USW-Pro-48-POE** — default for 8+ courts or 10+ APs
- **USW-Pro-24-POE** — only for small venues with fewer than 8 courts and fewer than 10 APs
- When in doubt, do a port count before ordering

## Related
- `data/meetings/2026-02-25-nico-pre-training-infrastructure-call.md`
- `templates/bom-pro.yaml`
- `data/checklists/tela-park-deployment.yaml`
