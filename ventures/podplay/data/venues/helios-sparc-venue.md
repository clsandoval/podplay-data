---
type: venue
name: Helios SPARC Venue
address: "Bridgetowne, Pasig, Metro Manila"
floor_area_sqm: null
power_standard: 220v_60hz
isp_provider: ""
isp_circuit_id: ""
ap_count: null
display_count: 14
tags: [manila, bridgetowne, indoor, pickleball, helios]
---

Interim 14-court pickleball facility at Bridgetowne (formerly "Helios Beta"), with a dedicated center court and a ping pong area. Distinct from the 2028 flagship ([[helios-venue]]). Project: [[helios-sparc]].

## Layout (architect's plan A-2.0, ground level, issued 2026-11-11)
- **MDF:** the SERVER ROOM (bottom right of A-2.0, between the admin office and the manager's office). PodPlay's hardware plan (base dated 2026-08-04) shows a TELCO/CAB and an ELECTRICAL room at the top of the building that are storage on the 2026-11-11 A-2.0, so confirm on the site visit.
- **West IDF:** the STORAGE room by the west stair (door GD20, above the west Food & Drink). Needs power, a lockable wall cabinet (≥6U) and the fiber run from the MDF.
- **Ping pong area:** 5 tables drawn; doors GD01 (outside), GD08 (court hall) and GD14 (pro shop) touch it; its west side is open to the café seating.
- **Center court:** LED screens at both baselines, which affects the camera position.

## Court fit-out (per PodPlay's hardware plan)
- Kiosk: 65" TV at 8'9" AFF + fence-mounted iPad at 4'8" AFF, 2 Cat6 + 1 duplex outlet.
- Camera: 1 Cat6 with a 6 ft coil; 16 ft from the baseline, ~11 ft AFF (minimum ~8–9 ft).
- Every device on its own Cat6 home run to the MDF or IDF switch.

## Run lengths (from A-2.0 in UniFi Design Center, pending the site survey)
- From the server room, west courts 10–13 come out at ~96–118 m along the walls (with ~8 m of climb and drop + 10% slack), court 14 kiosk and court 11 camera ~89–92 m → served from the west IDF.
- Courts on the MDF stay ≤ ~80 m even with 15 m of climb and drop (worst: court 1 camera ~76 m, courts 1/2 kiosk ~82 m).
- From the IDF spot, the longest run is the court 9 Apple TV, ~72 m with climb and slack.
- MDF ↔ IDF: ~80 m on the plan, ~86–92 m in the wall → fiber.
- Design Center draws straight lines, so it understates long runs; draw the real tray path once surveyed.

## Site survey
Not surveyed yet (as of 2026-11-16).

## Contacts
- Venue side: [[richard-bachmann]]
