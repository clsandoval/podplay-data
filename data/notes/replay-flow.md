---
type: note
title: Replay Flow
tags: [replay, player-experience, flic, samsung-ssd, mac-mini]
---

## Overview

The replay system is always running once set up by the installation team. Players do not need to configure anything at the court.

## How It Works

1. **Cameras run continuously** in the background — no player action needed to start recording.
2. **Player presses the Flic button** on the court to save a clip. This captures the **last ~1 minute** of footage (rolling buffer — no need to press before the moment happens).
3. **Clip is stored locally** on a Samsung SSD connected to the Mac Mini on-site.
4. **Player retrieves their clip** via the PodPlay website or receives it by email.

## Consumer Explanation

> "Cameras are always running at the court. Press the button when something good happens and it saves the last minute of footage automatically. After your session, your clips are waiting for you on the PodPlay website or in your email."

## Key Points

- **Rolling buffer** — players clip after the fact, not before. No need to anticipate the moment.
- **Local storage** — clips live on the Samsung SSD on the Mac Mini at the venue, not in PodPlay's cloud. This is why each venue requires its own separate server.
- **Retrieval** — website or email delivery. No special app required at the court.

## Related
- `data/notes/network-architecture.md`
- `data/inventory/samsung-t7-1tb.md`
- `data/inventory/flic-button.md`
- `data/inventory/mac-mini-16gb.md`
