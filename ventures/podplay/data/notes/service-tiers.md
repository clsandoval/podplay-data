---
type: note
title: Service Tiers
tags: [tiers, pricing, product]
---

**Five tiers, confirmed with PodPlay 2026-08-11:** Basic · Basic+ · Pro · Autonomous · Autonomous+. Plans are strictly cumulative — each tier includes everything below it.

Pricing below is what the **venue pays PodPlay** (PH & SEA client pricing, effective August 2026). It is not hardware cost. Amounts are USD.

> **There is no Pro+ and no PBK tier.** Pro+ was removed 2026-08-11 — door access is all-or-nothing, so any venue wanting a Kisi door is Autonomous. An old "Pro+" quote is a Pro deal if it had no doors, an Autonomous one if it did — decide per deal. PBK (Pickleball Kingdom) is a venue operator brand, not a tier.

---

## Basic

Core booking software, web-only. Reservations, events, coaches, memberships, payment integration, admin dashboard, basic analytics — all through the browser.

**Pricing:**
- Monthly venue fee: $75
- Per-court fee: none
- One-time setup: software setup $2,500 (per venue)

**Hardware:** none.

Uncommon in PH (customers generally want a customized deployment), but it is a tier we sell — not retired.

---

## Basic+

Basic plus the venue's own **player-facing booking app** (native iOS + Android, built and provided by PodPlay to the facility owner), push notifications, and social chat.

**Pricing:**
- Monthly venue fee: $150
- Per-court fee: none
- One-time setup: software setup $2,500 (per venue)

**Hardware:** none. The Basic+ app runs on the player's own phone — it is **not** the court-side software on the iPads / Apple TVs (that arrives with Pro).

> The $259/month figure previously recorded here was Tela Park's negotiated rate, not the tier price. See [[tela-park]].

---

## Pro

Core replay + display package. Premium tech-enabled club. Adds API access, court scoreboards, and video replay. PH default — nearly every PH deployment is Pro.

**Includes per court:**
- TV display (65") with Apple TV
- iPad kiosk (court booking + check-in)
- Replay camera
- Flic buttons (mounted on aluminum sign, for scoreboard)

**Rack:** Mac mini · UDM · USW-Pro switch · UPS · patch panel.

**Pricing:**
- Monthly venue fee: $300
- Per-court fee: $150/month
- One-time setup: see [Setup fees](#one-time-setup-fees) below

Example — 14-court Pro venue: `$300 + (14 × $150)` = $2,400/month.

**BOM reference:** `templates/bom-pro.yaml`

---

## Autonomous

Pro plus **remote door access**. Staff-light operations — doors controlled via Kisi and managed remotely.

**Adds on top of Pro:**
- Kisi Controller Pro 2 — 1 per 4 doors, rack-mounted
- Kisi Reader Pro 2.1 — 1 per access-controlled door (the 2.1, not the Pro 2 — PH supplier doesn't stock the older gen)
- Push-to-exit button — 1 per mag-lock door only (panic-bar doors with electric strikes need none)

**No NVR, no security cameras.** Autonomous's only "security" capability is access control.

**Pricing:**
- Monthly venue fee: $500
- Per-court fee: $150/month
- One-time setup: see [Setup fees](#one-time-setup-fees) below

Kisi hardware isn't stocked locally — ships from US/HK. Plan for lead time.

---

## Autonomous+

Autonomous plus **24/7 remote monitoring** via full security camera recording. Fully autonomous venue.

**Adds on top of Autonomous:**
- UniFi UNVR (up to 20 security cameras) or UNVR-Pro (21+), gated by **security camera count**, not court count
- Ubiquiti Enterprise 8TB HDDs (qty scales with camera count)
- PoE security cameras — **no PH SKU chosen yet**; count is a manual input, not derived from courts

**Pricing:**
- Monthly venue fee: $500
- Per-court fee: $350/month
- One-time setup: see [Setup fees](#one-time-setup-fees) below

Auto vs Auto+ differ only in court fee — the surveillance premium is priced per court.

**BOM reference:** `templates/bom-autonomous-plus.yaml`

---

## One-time setup fees

| Item | Price |
|---|---:|
| Software setup (per venue) | $2,500 |
| Hardware setup (per venue) | $5,000 |
| Hardware setup (per court) | $2,500 |

Hardware setup is charged **both** per venue and per court, so a hardware tier's one-time bill is `$2,500 + $5,000 + (courts × $2,500)`. The pricing sheet doesn't say whether software setup is also charged on hardware tiers or is the software-only alternative — **confirm per deal**.

---

## Basic+2 — Basic+ and Pro combined

**Not a sixth tier.** Basic+2 is Basic+ *and* Pro held together on one account — given to venues that **started on Basic+ and then added Pro**. The Basic+ subscription stays venue-wide; Pro is added on the courts that were actually equipped.

**Pricing:**
- Monthly venue fee: $150 (Basic+'s, not Pro's $300)
- Per-court fee: $60/month (discounted Pro court rate)

**Never quote Basic+2 to a new customer.** Eligibility is historical. A venue arriving new to Pro pays Pro.

**Known Basic+2 venue:** [[tela-park]] — 14 courts, 8 Pro-equipped. Hardware build and lab flow on the equipped courts are identical to Pro; only the billing record distinguishes it.

**Still unconfirmed with PodPlay:**
1. Does the $60 court fee count every court or only the Pro-equipped ones? Live at Tela Park: $990/mo (14 courts) vs $630/mo (8 courts).
2. Is the rate permanent or transitional?
3. Is there an equivalent combination for Basic+ with Auto/Auto+?
