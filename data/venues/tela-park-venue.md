---
type: venue
name: Tela Park Venue
address: "123 Sports Ave, Makati City"
floor_area_sqm: 500
power_standard: 220v_60hz
isp_provider: PLDT
isp_circuit_id: ""
ap_count: 24
display_count: 14
tags: [manila, indoor, multi-court, padel]
---

Multi-court indoor padel facility in Makati. 14 padel courts total: 6 Basic Plus, 8 Pro. High ceilings — good for AP and camera placement but requires ladder/rigging work for installation.

## Facility Notes
- IT room on-site: PA system, all wiring centralized (fiber, power, network)
- Stock room / dressing room added
- Bathroom far from courts (architect design); no budget for additional bathrooms
- Natural ventilation + large fan; no aircon (cost ~PHP 600K)
- Flooring: silica salt
- Lighting: 150W fixtures producing ~420 lux (PVA standard 500 lux); accepted by client

## Court Layout
- Championship courts share a center pole; cameras mount on both sides of pole
- Camera mount: overhead/ceiling preferred over pole-top
- Monitor placement: back-to-back per court
- Per-court infrastructure: 3 power outlets + 3 cable cuts in place
- PoE switches to be added at far court corners for reach
- VLANs configured at court corners

## Network
- Preferred equipment: Ubiquiti (client sourcing, PodPlay configuring)
- Separate server required — cannot share with PodPlay infrastructure
- Firewall + NVR: client sourcing per PodPlay specs
- PodPlay retains remote access via control center

## Site Survey Notes
- Power: 3-phase, 200A main panel. Adequate for deployment.
- Cable runs: longest run is ~45m from IDF to court 4 — within Cat6 spec.
- Ceiling: exposed steel beams — can mount APs directly with U-bolts.
- ISP entry: fiber demarc at front lobby, need to run to IDF in back office (~30m).
- 6 cable cuts currently in place across courts.
