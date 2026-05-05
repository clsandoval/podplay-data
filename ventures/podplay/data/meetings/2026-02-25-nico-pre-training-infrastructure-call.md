---
type: meeting
date: 2026-02-25
attendees: ["[[nico]]", "[[carlos-sandoval]]"]
project: null
meeting_type: check_in
tags: [infrastructure, replay, philippines, training]
---

## Agenda
- Replay Service V1 architecture walkthrough
- Philippines-specific deployment considerations
- Escalation path

## Notes

### Replay Service Architecture
- **V1**: Mac Mini on VLAN 32, fixed IP `192.168.32.100`, service exposed on port 4000
- **V2** in progress: local GitHub-based deployment pipeline
- Deployment via `deploy.py` process
- Camera calibration: start with zero distortion coefficients, adjust if needed
- Health check via DDNS: `areaname.podplaydns.com`

### Network & Infrastructure
- Gigabit internet strongly recommended — estimated ~105 GB/week for a 6-court venue
- Philippines latency 300–400ms acceptable for replay service operation
- PDU is the **only** voltage-dependent item; all other gear is 100–240V auto-switching

### MDM & Software
- iPads require Mosyle MDM enrollment
- Philippines deployments need a **dedicated Mosyle instance for Asia** — cannot share the US instance

### Payments
- Stripe does not operate in the Philippines
- Use **Magpie** for Philippines payment processing (GCash + credit card)

### Escalation Path
- Tier 1: PH on-site team
- Tier 2: [[nico]]
- Tier 3: PodPlay engineering (contact TBD)

## Action Items
- [ ] Confirm Mosyle Asia instance setup before first Philippines deployment
- [ ] Confirm Magpie integration status with business team
