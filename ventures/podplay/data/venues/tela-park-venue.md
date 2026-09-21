---
type: venue
name: Tela Park Venue
address: "Las Piñas, Metro Manila"
floor_area_sqm: 500
power_standard: 220v_60hz
isp_provider: PLDT
isp_circuit_id: ""
ap_count: 3
display_count: 8
tags: [manila, indoor, multi-court, padel]
---

Multi-court indoor padel facility in Las Piñas. **14 courts, 8 equipped** with the Pro build — the left side (COURT 1–6, VIP 1, VIP 2); the right side (COURT 7–12) is software-only. High ceilings — good for camera placement but needs ladder/rigging for installation.

## Facility notes
- IT room / **Command Center** near reception/admin: PA system, all wiring centralized (fiber, power, network). Hosts the UDM-SE head end — no Kosmas rack.
- Stock room / dressing room added
- Bathroom far from courts (architect design); no budget for additional bathrooms
- Natural ventilation + large fan; no aircon (cost ~PHP 600K)
- Flooring: silica salt
- Lighting: 150W fixtures producing ~420 lux (PVA standard 500 lux); accepted by client

## Court layout
- Championship courts share a center pole; cameras mount on both sides of the pole
- Camera mount: overhead/ceiling preferred over pole-top
- Monitor placement: back-to-back per court; orientation matters for ad impressions
- **Poles:** 5 on the replay side, each provisioned with **2× Cat6 + 220 V at pole height**, homed to the fiber switch. One pole switch each; ≤2 Pro courts per pole (4 PoE ports). Pole ↔ court mapping still to be confirmed with the client.

## Network (client-designed)
```
PLDT modem/edge (client IT)
 └── UDM-SE — Command Center (gateway · firewall · UniFi controller · 3× U7-LR on default LAN)
      ├── Mac mini 192.168.32.100
      └── SFP+ fiber → USW-Flex-2.5G-8-SFP (below beam, left fire exit)
            └── Cat6 → 5× USW-Lite-8-PoE (one per pole)
                  └── per Pro court: camera (PoE) · iPad adapter (PoE) · Apple TV (mains)
```
- REPLAY `192.168.32.0/24` is the only PodPlay VLAN; APs stay on the default LAN, firewalled off it
- Kosmas owns and controls the UDM-SE, all 6 switches, the APs and all config; the client owns the PLDT edge only
- **WAN:** public dynamic IP, non-CGNAT per the client — verify on-site. Static-IP business plan recommended.
- DDNS `telapark.fnasasin.com` (Cloudflare, DNS-only); port 4000 forward on the UDM-SE → Mac mini
- Remote admin via Teleport on the UDM-SE; Tailscale on the Mac mini as backup

## Site survey notes
- Power: 3-phase, 200A main panel. Adequate.
- Cable runs: longest ~45m from IDF to court 4 — within Cat6 spec
- Ceiling: exposed steel beams — APs can mount directly with U-bolts
- ISP entry: fiber demarc at front lobby, run to IDF in back office (~30m)
- 6 cable cuts in place across courts; 3 power outlets + 3 cable cuts per court location
- Per-pole PoE math: a 2-court pole is 4/4 PoE ports, 7/8 ports, ~34 W of ~52 W. If a pole ever needs 3 courts, cameras can run 12 V DC off the pole outlet to free PoE ports.

## Client contacts
- IT / network design: [[mark-colona]]
