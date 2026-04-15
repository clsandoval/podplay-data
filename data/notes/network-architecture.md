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
- Switch: UniFi USW-Pro-24-POE (≤8 courts) or USW-Pro-48-POE (9+ courts)
- NVR (Autonomous Plus only): connected to switch via SFP+ DAC

## Related
- `data/meetings/2026-02-25-nico-pre-training-infrastructure-call.md`
- `templates/bom-pro.yaml`
- `data/checklists/tela-park-deployment.yaml`
