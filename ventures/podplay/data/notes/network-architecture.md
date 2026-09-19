---
type: note
title: Network Architecture & Sizing Rules
tags: [networking, vlan, replay, infrastructure, ddns, sizing, ups, poe]
---

The sizing rules behind `templates/bom-*.yaml`. Every formula takes the same inputs:

| Input | Meaning | Tiers |
|---|---|---|
| `courts` | Pro (replay-equipped) courts | all hardware tiers |
| `doors` | Kisi access-controlled doors | Autonomous, Autonomous+ |
| `security_cameras` | surveillance cameras — a **manual count** from the site plan, never derived from courts; replay cameras don't count | Autonomous+ |
| `backup_internet` | second WAN uplink on the UDM | Autonomous, Autonomous+ |

Basic and Basic+ have no hardware — nothing below applies to them.

**Derived:** `total_ports = courts × 3` (replay camera + iPad + Apple TV per court) `+ security_cameras + readers that overflowed off the gateway`.

---

## VLANs and IP plan

VLAN ID = third octet. Everything PodPlay-side is isolated from the venue's facility LAN; the APs live on the default LAN, firewalled off REPLAY, so stray Wi-Fi clients can't reach cameras or the replay server. REPLAY needs internet (Mosyle enrollment, updates, NTP) — block inter-VLAN, allow REPLAY → WAN.

| Network | Subnet | Tier |
|---|---|---|
| SURVEILLANCE | `192.168.31.0/24` | Autonomous+ only |
| **REPLAY** | **`192.168.32.0/24`** | every hardware tier |
| ACCESS CONTROL | `192.168.33.0/24` | Autonomous, Autonomous+ |

Every fixed IP is a MAC-bound DHCP reservation. For an iPad the wired identity is the **PoE adapter's** MAC, not the iPad's.

**REPLAY — venues of ≤8 courts** (N = court number):

| Device | Host | Range |
|---|---|---|
| iPad C*N* | `.20 + N` | `.21 – .28` |
| Replay camera C*N* | `.30 + N` | `.31 – .38` |
| Apple TV C*N* | `.40 + N` | `.41 – .48` |
| Mac mini | `.100` | the port-4000 forward target |

**REPLAY — venues of 9+ courts.** The 10-wide blocks collide at 11 courts (iPad C11 and camera C1 are both `.31`), so two of the three blocks move:

| Device | Host | Range at 32 courts |
|---|---|---|
| iPad C*N* | `.20 + N` | `.21 – .52` |
| Replay camera C*N* | `.120 + N` | `.121 – .152` |
| Apple TV C*N* | `.160 + N` | `.161 – .192` |
| Mac mini | `.100` | |

> Crossing 8 equipped courts re-addresses every camera and Apple TV. Plan the cutover; don't discover it on site.

**SURVEILLANCE:** security camera *N* at `.20 + N`; NVR at `.100`. **ACCESS CONTROL:** controller *N* at `.10 + N` (`.11–.18`), reader *N* at `.20 + N` (`.21–.52`). Readers are numbered across the whole venue whether they sit on the gateway or the switch.

---

## Replay server and WAN

- **Mac mini** at `192.168.32.100`, service on **port 4000**. 1 per venue regardless of court count.
- The gateway forwards **TCP+UDP 4000** → `192.168.32.100`. Forward is deferred until the replay service is running (no live target before then).
- **ISP:** business plan with a **static IP** is the requirement — PH residential plans use CGNAT, which blocks all inbound. Verify: `whatismyip.com` vs the modem's WAN IP; mismatch = CGNAT = hard stop. Dynamic-but-non-CGNAT works with DDNS as a load-bearing dependency.
- **DDNS:** a per-venue hostname on a Kosmas-controlled Cloudflare zone, A record **DNS-only (grey cloud)**, TTL 60. A cron on the Mac mini PATCHes the record every 5 min. Proxied mode won't pass port 4000.
- **Health monitoring:** a GCP uptime check hits `http://<venue-host>:4000/health` every 5 min and alerts by email. Keep the alert policy disabled until the venue is live or it fires every 5 min.
- **Bandwidth:** gigabit strongly recommended; ~105 GB/week for a 6-court venue, scale proportionally. PH latency to US cloud (300–400 ms) is fine — nothing synchronous in the replay path.
- **Remote admin:** Teleport (built into the UDM) from WiFiman Desktop on the console-owning UI.com account; reach the Mac mini by **IP**, not `.local` (Bonjour doesn't cross the tunnel). Works behind CGNAT — no port-forward or DDNS needed for admin. Tailscale on the Mac mini (`tailscaled` daemon variant, node tagged so its key never expires) is the backup path. Never port-forward SSH/VNC.

---

## Gateway

| Condition | Gateway |
|---|---|
| `doors > 0` (Autonomous / Autonomous+) | **UDM-SE** |
| `courts == 1` | **UDM-SE** — no switch; the gateway's 8 PoE ports power the court gear directly |
| otherwise (multi-court Pro) | **UDM-Pro** — nothing PoE hangs off the gateway in a switched venue, so the SE's PoE and 2.5G WAN buy nothing |

The UDM ↔ switch uplink is an SFP DAC and consumes no RJ45 port.

---

## Switch

**SKU:** Pro variant (`USW-Pro-24-POE`, 400W PoE) when `security_cameras > 0` **or** `doors > 0` **or** `courts ≥ 4`; otherwise the non-Pro `USW-24-POE` (**95W** PoE — a 3-court venue runs it at ~96%). The 48-port is always `USW-Pro-48-POE` (600W).

**Quantity** by `total_ports`:

| total_ports | Switches | Pro-tier courts |
|---|---|---|
| — (`courts == 1`) | none | 1 |
| 1–24 | 1× 24-port | 2–8 |
| 25–48 | 1× 48-port | 9–16 |
| 49–72 | 1× 24 + 1× 48 | 17–24 |
| 73–96 | 2× 48 | |
| 97–120 | 1× 24 + 2× 48 | … continues in 24-port steps to 264 |

**8 courts fills a 24-port switch exactly** (24 = 8 × 3). That is the breaking point for Autonomous: any reader that overflows onto the switch forces the 48-port — which is why readers go on the gateway (below).

**PoE budget check:** Σ(PoE watts × qty) of everything on the switch against 400W / 600W / 95W (or 180W on the gateway for a 1-court venue). Warn at 80%, critical at 90%. Readers on the UDM-SE draw from its own 180W and are excluded. Worst standard case: 14 courts on the Dahua camera = 14 × 17.5 + 14 × 13 = **427W of 600W (71%)** — fine, but never use the 25W UACC-PoE+-USBC iPad adapter there.

---

## Kisi port accounting (Autonomous / Autonomous+)

- **Controllers:** `ceil(doors ÷ 4)`, non-PoE, always on the **UDM** — 1 RJ45 port each.
- **Readers:** 1 per door, 7W 802.3af. **UDM-SE PoE ports first**, overflow to the switch. This is a deliberate deviation from PodPlay's convention (every reader on the switch) and an installer following the PodPlay guide won't do it — record the placement per venue.
- **Free UDM-SE ports** = `8 − 1 (Mac mini) − controllers − (1 if backup_internet)` — normally **6**.
- **1-court venue:** the court gear is on the gateway too, so `free = 8 − 1 − 3 − security_cameras − controllers − backup`. Holds 3 doors, or 2 with backup WAN. Past that the venue needs a decision, not a 24-port switch for one reader.
- **Switch port demand** = `courts × 3 + security_cameras + overflow readers`.

Take the 48-port at 8 courts anyway if `doors > 4`, the venue wants spare switch capacity, or you want to stay strictly on PodPlay's all-on-the-switch convention.

---

## Patch panels and cables

- **SFP DAC:** `1 per switch + 1 per NVR` — UDM ↔ each switch, switch ↔ NVR. Consumes no RJ45.
- **Patch panel:** 1 per switch, matching size — 24-port coupler panel per 24-port switch, **1× 48-port coupler panel** per 48-port switch (2× 24-port is the fallback if no 48-port coupler panel is sourceable, at +1U). Cat6, pass-through couplers, front → switch, back → court runs. Punch-down is not a substitute.
- **Cat6 0.5M:** `total_ports + 2` (panel front → switch, one per port + 2 spare)
- **Cat6 1M:** 2 (UDM ↔ Mac mini + spare)
- **Cat6 3M:** `2 + doors` (spares + one per reader)

---

## UPS

**Specify by rating, not model.**

```
load           = Σ(max-draw W × qty for every item on the venue) + 10 W ISP modem + NVR
required_watts = load ÷ 0.70
required_VA    = required_watts ÷ 0.6
rung           = first of 750 / 1000 / 1500 / 2000 / 3000 VA ≥ required_VA
```

Max draw, not typical: replay camera **17.5W** (Dahua) or **2.8W** (Uniview), iPad adapter 13W, reader 7W, controller 20W, UDM 50W, USW-Pro-24 50W / USW-Pro-48 60W / USW-24 25W, Mac mini 65W. NVR by security-camera count: ≤20 → 100W, ≤35 → 160W, ≤40 → 200W, ≤60 → 320W.

| Venue | Load | Rung |
|---|---|---|
| 5-court Pro, Uniview | 254W | 750 VA |
| 8-court Pro, Uniview | 301W | 750 VA |
| 8-court Pro, Dahua | 419W | 1000 VA |
| 14-court Pro, Uniview | 406W | 1000 VA |
| 14-court Pro, Dahua | 612W | 1500 VA |
| 14-court Pro, Dahua with white illuminator left on (24W) | 703W | 2000 VA |

The camera choice moves the rung — and the "set illumination to IR" config step is load-bearing for the number, not a picture preference. Watts bind, not VA: an on-line unit at PF 0.9 meets the same watts a rung lower. Line-interactive with AVR minimum. 230V, 2U rack-mount, chassis depth against the rack. **No PDU** — the UPS's C13 socket plate distributes power: UDM and switch on native C13 cords, Mac mini and ISP modem via **2× C14-to-universal adapters** per venue. Autonomous+ adds the NVR as a 5th outlet — size the plate at 5.

---

## Rack

Sum the rack-U of the gear + **1U ISP modem allowance**, then take the next bracket up:

| Total U | Rack |
|---|---|
| ≤ 10 | 12U |
| 11–14 | 16U |
| 15–19 | 21U |
| 20–25 | 27U |

Per item: Mac mini on shelf 2U · UPS 2U · UNVR-Pro 2U · UDM, switch, patch panel, UNVR 1U each · Kisi controller records no U (verify its bracket). A PH Pro rack is ~8U → 12U; only an NVR-Pro or second switch pushes it to 16U. Internal depth ≥610mm — confirm against the UPS chassis.

---

## Replay storage

| Courts | SSD |
|---|---|
| 1–4 | 1TB |
| 5+ | 2TB |
| 20+ or extended retention | 4TB |

Kingston XS1000 / XS2000; Samsung T7 is an acceptable alternate. USB-C, erased APFS as `Replays`, mounted at `/Volumes/Replays`, kept under 80%. On an M4 Mac mini a root LaunchDaemon is required for headless automount.

---

## Per-court and per-venue quantities

| Item | Qty |
|---|---|
| Replay camera, iPad, iPad PoE adapter, iPad wall mount, Apple TV, TV | 1 per court |
| Apple TV mount | 1 per Apple TV |
| TV tilt mount | 1 per TV (no catalog SKU) |
| C14-to-universal adapters | 2 per venue (Mac mini + modem) |
| SFP DAC | 1 per switch + 1 per NVR |
| Push-to-exit | 1 per mag-lock door (Autonomous tiers) |
| Flic buttons | `(courts × 2) + 2` |
| Aluminum signs | `courts × 2` |
| Mac mini + shelf | 1 per venue |
| Access points | **optional** — only if the client wants facility Wi-Fi or a survey recommends it; qty from the coverage plan |
| Junction boxes | none — ship with the camera |
| HDMI cables | none — ship with the TV |
| Security cameras | `security_cameras` as specified (Autonomous+) |
| Kisi controllers / readers | `ceil(doors ÷ 4)` / `doors` |

## Related
- `templates/bom-pro.yaml`, `templates/bom-autonomous.yaml`, `templates/bom-autonomous-plus.yaml`
- `data/notes/replay-flow.md`
- `data/notes/bom-pro-14-court.md` — worked example
