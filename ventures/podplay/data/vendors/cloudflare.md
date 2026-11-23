---
type: vendor
name: Cloudflare
contact_name: ""
contact_email: ""
contact_phone: ""
website: https://www.cloudflare.com
payment_terms: Free plan
lead_time_days: 0
tags: [networking, tunnel, dns, software]
---

Runs the **Cloudflare Tunnel** that is the PH standard inbound path to each venue's Mac mini (no port forward, no DDNS, no public IP). Recommended by PodPlay 2026-11-04; live at Tela Park since 2026-11-05. How it fits the network: `notes/network-architecture.md`.

- **What Kosmas uses:** one tunnel + one `replay-CUSTOMERNAME` hostname per venue on the venue domain, a shared security rule on every `replay-*` hostname, and a Worker that masks camera passwords in the public logs. Free plan.
- **Account:** the venue domain (currently `fnasasin.com`) sits on a personal account that venues now depend on. A move to a Kosmas-owned account is planned; every venue's tunnel has to be recreated when it moves.
- **Setup tool:** `setup_venue_tunnel.py` in the `venue-tunnel` repo.
- **Credentials** (API token, tunnel tokens) live only in Cloudflare, on the configurer's MacBook and on each Mini. Never record them here.
