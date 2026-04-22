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
- Always reserve **3 vacant ports** at the end of every port assignment — 2 for expansion, 1 for troubleshooting.
- At very high densities where a single 48-port switch is insufficient, plan for a second switch with an SFP+ DAC uplink between them.

## Port Assignment Template Generator

Use the generator script to produce a per-project port assignment file:

```bash
python scripts/generate-port-template.py --project <slug>

# Mixed-tier venues require explicit court counts:
python scripts/generate-port-template.py --project tela-park \
  --pro-courts 8 --basic-courts 6 --aps 24 \
  --security-cameras 8 --edge-switches 2
```

Output is written to `data/switch-ports/<project>-switch-ports.yaml`. The generator:
- Always sets USW-Pro-48-POE as the switch
- Assigns ports in a consistent order (uplinks → compute → NVR → APs → per-court → access control → edge switches)
- Appends 3 VACANT ports at the end
- Warns if total port count exceeds 48

## Related
- `data/meetings/2026-02-25-nico-pre-training-infrastructure-call.md`
- `templates/bom-pro.yaml`
- `scripts/generate-port-template.py`
- `data/checklists/tela-park-deployment.yaml`
