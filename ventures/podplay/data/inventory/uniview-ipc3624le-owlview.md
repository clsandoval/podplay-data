---
type: inventory
name: Uniview IPC3624LE-ADF28K-WP (Owlview)
sku: REPLAY-CAMERA-UNIVIEW
vendor: "[[drextech]]"
category: camera
unit_cost: 5390.00
currency: PHP
status: current
---

**Current default replay camera** — the stocked PH pick and the unit on the Tela Park rig. 4MP 1/1.8" Owlview sensor, **2.8mm fixed lens**, dual-power DC12V or 802.3af PoE. ~2.8W idle, up to ~7W with IR active. 1 per court.

Fixed lens is an accepted substitute for PodPlay's motorized-varifocal standard: the install guide pins the mount at 16–20 ft behind the baseline, 11 ft AFF, ~30° down, so a ~90° HFOV frames the court without zoom. Trade-off: framing is set by mount distance — a miss means re-mounting.

Config notes: no fixed factory IP (DHCP on the default VLAN); web UI is **HTTPS**; RTSP path is `/unicast/c1/s0/live` (not Dahua's `/cam/realmonitor`); set illumination to **IR**, not white light. UniFi fingerprints it as "Uniview Tec IPV428" — trust the IP, not the label.

The lighter PoE draw vs the [[dahua-ipc-hdw5459t-ze-il]] is a full UPS rung at 14 courts (1000 VA vs 1500 VA) — the camera choice is per venue.

Price per Tela Park Pricing (2026-07-20).

Junction box is included with the camera — no separate line.
