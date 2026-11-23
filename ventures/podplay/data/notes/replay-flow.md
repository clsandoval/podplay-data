---
type: note
title: Replay Flow
tags: [replay, player-experience, ipad, kingston-ssd, mac-mini]
---

## Overview

The replay system runs on its own once the installation team sets it up. Players don't configure anything at the court.

## How It Works

1. **Cameras record during reservations.** Since replay service 2.1.0, PodPlay's cloud sends each court's recording windows from the venue's bookings, and recording starts about **30 minutes before** a reservation. This is deliberate (PodPlay, 2026-11-06): 24/7 recording wore out SSDs. There is no recording-hours setting.
2. **Player saves a clip from the iPad** (or a Flic button) on the court. It captures the moment just played, so there's no need to trigger it beforehand.
3. **Footage is stored locally** on the replay SSD (Kingston XS1000 / XS2000) connected to the Mac mini on-site. With Auto-cleanup on, footage older than **3 days** is deleted, so the SSD is sized to hold 3 days of fully booked courts.
4. **Saved clips are cut on request and uploaded** to PodPlay; the request reaches the Mac mini through the venue's Cloudflare Tunnel (see `notes/network-architecture.md`).
5. **Player retrieves their clip** via the **venue's own website** or by email.
6. **Instant replay** plays on the court's Apple TV over the venue network.

## Consumer Explanation

> "During your booking, the court's camera is recording. Tap the iPad when something good happens and it saves the moment you just played. After your session, your clips are waiting for you on your venue's website or in your email."

## Key Points

- **Clip after the fact** — players save after the moment, not before.
- **Reservations drive recording** — no booking, no recording. Test replays during a real reservation; outside one, instant replay can show an old clip.
- **Local storage** — footage lives on the SSD at the venue, not in PodPlay's cloud. This is why each venue needs its own server.
- **Retrieval** — via the venue's own website or email. No special app required at the court.

## Related
- `data/notes/network-architecture.md`
- `data/inventory/kingston-xs1000-2tb.md`, `data/inventory/kingston-xs2000-4tb.md`
