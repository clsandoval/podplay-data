---
type: inventory
name: Dahua DH-IPC-HDW5459T-ZE-IL (EmpireTech IPC-HDW5459T-ZE-IL)
sku: REPLAY-CAMERA-DAHUA
vendor: "[[drextech]]"
category: camera
unit_cost: 0.00
currency: PHP
status: current
---

**PodPlay's Option-1 primary replay camera** and what Helios Beta is being built with. 4MP 1/1.8" turret, motorized 2.7–12mm F1.8 varifocal, built-in mic, Smart Dual Light (IR + warm white), 802.3at PoE+, IP67. **5W typical / 17.5W max** — budget the max. 1 per court.

Same camera under both brands; the `DH-` prefix is the PH channel and `-2712` is the lens code. PH distributors: Drextech, Avitech, ATR, MSI-ECS. US: ~$259.99 at empiretech01.com + import.

Config notes: factory IP `192.168.1.108`; **set illumination mode to IR, not white/dual** — indoor courts are lit, and the white LED pushes draw toward 24W, which changes both the switch PoE budget and the UPS rung. Set Video Standard = NTSC, Anti-Flicker = 60Hz.

Roughly 6× the PoE draw of the [[uniview-ipc3624le-owlview]] — at 14 courts that is 245W of a 600W switch budget and the 1500 VA UPS rung. PH price TBD.

Junction box is included with the camera — no separate line.
