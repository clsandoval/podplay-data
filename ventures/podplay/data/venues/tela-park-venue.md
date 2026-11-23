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

Multi-court indoor padel facility in Las Piñas. **14 courts, 8 equipped** with the Pro build: Championship 1–2 + Premium 3–8 (the master plan's VIP 1–2 + COURT 1–6). Standard 1–6 are software-only. Staffed, not 24/7. High ceilings: good for camera placement but needs ladder/rigging for installation.

## Facility notes
- IT room / **Command Center** near reception/admin: PA system, all wiring centralized (fiber, power, network). Hosts the UDM-SE head end; no Kosmas rack.
- Stock room / dressing room added
- Bathroom far from courts (architect design); no budget for additional bathrooms
- Natural ventilation + large fan; no aircon (cost ~PHP 600K)
- Flooring: silica salt
- Lighting: 150W fixtures producing ~420 lux (PVA standard 500 lux); accepted by client

## Court layout
- Championship courts share a center pole; cameras mount on both sides of the pole
- Camera mount: overhead/ceiling preferred over pole-top
- Monitor placement: back-to-back per court; orientation matters for ad impressions
- **Poles:** each provisioned with **2× Cat6 + 220 V at pole height**, fed from the client's fiber LAN through client-bought PoE pole switches

## Network (client-designed, client-bought switches, Tela Park-maintained)
```
PLDT modem (Huawei HG8145X6, LAN 192.168.1.x)
 └── UDM-SE PL-TelaPark-UDM, WAN 192.168.1.247 — Command Center (gateway · firewall · UniFi controller · Teleport)
      ├── Mac mini 192.168.32.100 ── Cloudflare Tunnel (outbound only)
      ├── U7-LR APs on the default LAN (4 delivered; placement not recorded)
      └── client fiber LAN → USW 24-port (non-PoE) → PoE pole switches
            └── per Pro court: camera (PoE) · iPad adapter (PoE) · Apple TV (mains)
```
- Default `192.168.30.0/24` (UniFi management); REPLAY `192.168.32.0/24`, VLAN 32, the only PodPlay network
- Tela Park maintains the network since 2026-10-28; Marco stays UI.com owner, so Kosmas keeps admin + Teleport
- **WAN:** PLDT Home Fiber (residential), public dynamic IP, not CGNAT by traceroute. Modem admin only on `https://192.168.1.1`
- **No inbound ports.** Replays reach the Mac mini via Cloudflare Tunnel `telapark` (`https://replay-telapark.fnasasin.com`); the old 4000 forward + DDNS were removed 2026-11-16
- Remote admin via UniFi Teleport only (Tailscale removed 2026-11-09)

## Site survey notes
- Power: 3-phase, 200A main panel. Adequate.
- Cable runs: longest ~45m from IDF to court 4, within Cat6 spec
- Ceiling: exposed steel beams; APs can mount directly with U-bolts
- ISP entry: fiber demarc at front lobby, run to IDF in back office (~30m)
- 6 cable cuts in place across courts; 3 power outlets + 3 cable cuts per court location

## Client contacts
- IT / network design: [[mark-colona]]
