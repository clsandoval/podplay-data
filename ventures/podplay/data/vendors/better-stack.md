---
type: vendor
name: Better Stack
contact_name: ""
contact_email: ""
contact_phone: ""
website: https://betterstack.com
payment_terms: Free plan
lead_time_days: 0
tags: [monitoring, uptime, software]
---

Uptime monitoring for each venue's replay server. One monitor per venue on `https://replay-CUSTOMERNAME.<venue domain>/health` (through the Cloudflare Tunnel), every 3 minutes, email alert when the URL becomes unavailable. Tela Park's has been up since 2026-11-05.

- **Why Better Stack:** replaced GCP on 2026-10-21 when the GCP free trial ended. Kosmas won't put a card on a cloud account with no hard spending cap; the free plan needs none and allows commercial use. UptimeRobot's free plan is out (no commercial use).
- **Limit:** the free plan has **10 monitors**. Near 10 venues, revisit: Better Stack paid, or GCP on a company-owned billing account.
- Add the monitor as part of each venue's tunnel setup, after `/health` passes from cellular.
