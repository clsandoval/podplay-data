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
- Switch: See switch selection guidance below
- NVR (Autonomous Plus only): connected to switch via SFP+ DAC

## Switch Selection

Court count alone is not a sufficient basis for switch selection. The following all consume ports on the main switch and must be tallied together:

| Device | Ports per unit |
|---|---|
| Access point (U6-Pro) | 1 |
| Replay camera | 1 |
| Apple TV | 1 |
| iPad (via PoE adapter) | 1 |
| Mac Mini | 1 |
| Edge switch uplink (far court corners) | 1 |
| Security camera (Autonomous Plus) | 1 |

**Rule of thumb:**
- Use **USW-Pro-24-POE** only for small, low-AP-density deployments where total port count is confirmed to be ≤20 (leaving headroom for future devices).
- Use **USW-Pro-48-POE** as the default for any venue with 8+ courts or 10+ APs, regardless of tier.
- At very high densities (24+ APs + full per-court stack), verify that a single 48-port switch is sufficient or plan for a second switch.

**Example — 8-court Pro deployment with 24 APs:**

| Device | Count | Ports |
|---|---|---|
| U6-Pro APs | 24 | 24 |
| Replay cameras | 8 | 8 |
| Apple TVs | 8 | 8 |
| iPads (PoE) | 8 | 8 |
| Mac Mini | 1 | 1 |
| **Total** | | **49** |

This exceeds the USW-Pro-24-POE capacity even without security cameras or edge switch uplinks — the USW-Pro-48-POE is required.

## Related
- `data/meetings/2026-02-25-nico-pre-training-infrastructure-call.md`
- `templates/bom-pro.yaml`
- `data/checklists/tela-park-deployment.yaml`
