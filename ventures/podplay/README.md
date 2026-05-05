# Pod Play SEA — Venture

The on-the-ground Pod Play installation business in Southeast Asia. Venue installs, hardware, ISP, deployment, support.

This is the venture with the most existing content because the original `podplay-data` repo started here. Read `CLAUDE.md` (this directory) for the full agent contract — entity schemas, write-path rules, revisioning, pricing SOT.

## Quick orientation

- **Active projects** are in `data/projects/` (Atleta-63 demo, Tela Park, Helios, temporary-facility)
- **Hardware catalog** is in `data/inventory/` (~50 items)
- **Vendors** in `data/vendors/` are pod-play-specific. Cross-venture vendors (e.g., Stripe if multiple ventures adopt it) get promoted to root `general/vendors/`
- **Tier pricing** lives at `pricing/rate-card.md` — SOT for proposals, invoices, contracts
- **Dashboards** in `dashboards/` drive the React app summary views
