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
- Switch: **USW-Pro-48-POE (default)** — see switch selection guidance below
- NVR (Autonomous Plus only): connected to switch via SFP+ DAC

## Switch Selection

The **USW-Pro-48-POE is the default switch for all deployments.** Court count alone is not a sufficient basis for switch selection. The following all consume ports on the main switch and must be tallied together:

| Device | Ports per unit |
|---|---|
| Access point (U6-Pro) | 1 |
| Replay camera | 1 |
| Apple TV | 1 |
| iPad (via PoE adapter) | 1 |
| Mac Mini | 1 |
| Edge switch uplink (far court corners) | 1 |
| Security camera (Autonomous Plus, variable) | 1 |

**Rules:**
- **USW-Pro-48-POE is the default.** Only downgrade to USW-Pro-24-POE if total port count is confirmed ≤20.
- Always reserve **2–3 vacant ports** in the port assignment template for future expansion and troubleshooting headroom.
- At very high densities where a single 48-port switch is insufficient, plan for a second switch with an SFP+ DAC uplink between them.

**Example — 8-court Pro deployment with 24 APs:**

| Device | Count | Ports |
|---|---|---|
| U6-Pro APs | 24 | 24 |
| Replay cameras | 8 | 8 |
| Apple TVs | 8 | 8 |
| iPads (PoE) | 8 | 8 |
| Mac Mini | 1 | 1 |
| Reserved (vacant) | — | 3 |
| **Total** | | **52 → use 48-port + edge switch** |

See `templates/switch-port-template.yaml` for the standard port assignment template.

## Related
- `data/meetings/2026-02-25-nico-pre-training-infrastructure-call.md`
- `templates/bom-pro.yaml`
- `templates/switch-port-template.yaml`
- `data/checklists/tela-park-deployment.yaml`
