#!/usr/bin/env python3
"""
generate-port-template.py

Generates a switch port assignment YAML for a PodPlay project by reading
the project and venue files to determine court count, AP count, and tier.

Usage:
  python scripts/generate-port-template.py --project tela-park
  python scripts/generate-port-template.py --project tela-park \\
      --pro-courts 8 --basic-courts 6 --aps 24 \\
      --security-cameras 8 --edge-switches 2

Output: data/switch-ports/<project>-switch-ports.yaml

Port assignment order:
  1. UDM-SE uplink
  2. Mac Mini
  3. NVR (autonomous_plus only)
  4. APs
  5. Per Pro court: Replay Camera → Apple TV → iPad
  6. Per Basic Plus court: iPad only
  7. Security cameras (variable, autonomous_plus)
  8. Kisi Controller (autonomous / autonomous_plus)
  9. Edge switch uplinks
  10. 3x VACANT (always reserved at the end)
"""

import argparse
import os
import re
import sys
import yaml
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent
SWITCH_CAPACITY = 48
RESERVED_VACANT = 3


def parse_frontmatter(filepath):
    with open(filepath) as f:
        content = f.read()
    match = re.match(r"^---\n(.*?)\n---", content, re.DOTALL)
    if not match:
        return {}
    return yaml.safe_load(match.group(1))


def extract_wikilink(value):
    if isinstance(value, str):
        m = re.match(r"\[\[(.+?)\]\]", value)
        if m:
            return m.group(1)
    return value


def load_project(slug):
    path = REPO_ROOT / "data" / "projects" / f"{slug}.md"
    if not path.exists():
        sys.exit(f"ERROR: Project file not found: {path}")
    return parse_frontmatter(path)


def load_venue(slug):
    path = REPO_ROOT / "data" / "venues" / f"{slug}.md"
    if not path.exists():
        return {}
    return parse_frontmatter(path)


def build_ports(pro_courts, basic_courts, ap_count, tier, security_cameras, edge_switches):
    ports = []
    port_num = 1

    def add(device, location, vlan, poe, notes=""):
        nonlocal port_num
        entry = {
            "port": port_num,
            "device": device,
            "location": location,
            "vlan": vlan if vlan != "" else "",
            "poe": poe,
        }
        if notes:
            entry["notes"] = notes
        ports.append(entry)
        port_num += 1

    # ── Uplinks ────────────────────────────────────────────────────────────────────────────
    add("UDM-SE", "rack", "management", False, "SFP+ DAC uplink — use SFP+ port, not RJ45")

    # ── Compute ────────────────────────────────────────────────────────────────────────
    add("Mac Mini", "rack", 32, False, "Fixed IP 192.168.32.100")

    # ── NVR (autonomous_plus only) ────────────────────────────────────────────────────
    if tier == "autonomous_plus":
        nvr_model = "UNVR-Pro" if security_cameras > 4 else "UNVR"
        add(nvr_model, "rack", 32, False, "SFP+ DAC uplink — use SFP+ port, not RJ45")

    # ── Access Points ─────────────────────────────────────────────────────────────────
    for i in range(1, ap_count + 1):
        add("U6-Pro AP", f"ap-{i}", 32, True)

    # ── Pro courts: Replay Camera + Apple TV + iPad ─────────────────────────────────
    for i in range(1, pro_courts + 1):
        add("Replay Camera",      f"court-{i}", 32, True)
        add("Apple TV",           f"court-{i}", 32, False)
        add("iPad (PoE adapter)", f"court-{i}", 32, True)

    # ── Basic Plus courts: iPad only ──────────────────────────────────────────────
    for i in range(pro_courts + 1, pro_courts + basic_courts + 1):
        add("iPad (PoE adapter)", f"court-{i}", 32, True)

    # ── Security cameras (autonomous_plus, variable) ──────────────────────────────
    for i in range(1, security_cameras + 1):
        add("Security Camera (G5 Turret Ultra)", f"court-{i}", 32, True)

    # ── Access control (autonomous / autonomous_plus) ───────────────────────────
    if tier in ("autonomous", "autonomous_plus"):
        add("Kisi Controller Pro 2", "rack", 32, True)

    # ── Edge switch uplinks ─────────────────────────────────────────────────────────
    for i in range(1, edge_switches + 1):
        add(f"Edge Switch {i}", f"court-corner-{i}", 32, False,
            "PoE switch uplink at far court corner")

    assigned = port_num - 1

    # ── VACANT (always 3) ───────────────────────────────────────────────────────────
    for notes in ("Reserved for expansion", "Reserved for expansion", "Reserved for troubleshooting"):
        ports.append({
            "port": port_num,
            "device": "VACANT",
            "location": "",
            "vlan": "",
            "poe": False,
            "notes": notes,
        })
        port_num += 1

    return ports, assigned


def main():
    parser = argparse.ArgumentParser(
        description="Generate a switch port assignment YAML for a PodPlay project."
    )
    parser.add_argument("--project", required=True, help="Project slug, e.g. tela-park")
    parser.add_argument("--pro-courts", type=int, default=None,
                        help="Number of Pro tier courts (replay + display)")
    parser.add_argument("--basic-courts", type=int, default=0,
                        help="Number of Basic Plus courts (iPad only)")
    parser.add_argument("--aps", type=int, default=None,
                        help="Number of access points (overrides venue ap_count)")
    parser.add_argument("--security-cameras", type=int, default=0,
                        help="Number of security cameras (Autonomous Plus only)")
    parser.add_argument("--edge-switches", type=int, default=0,
                        help="Number of edge PoE switches at far court corners")
    args = parser.parse_args()

    project = load_project(args.project)
    tier = project.get("tier", "pro")

    venue_slug = extract_wikilink(project.get("venue", ""))
    venue = load_venue(venue_slug) if venue_slug else {}

    # AP count: CLI flag > venue frontmatter > 0
    ap_count = args.aps if args.aps is not None else venue.get("ap_count", 0)

    pro_courts = args.pro_courts
    basic_courts = args.basic_courts

    if pro_courts is None:
        display_count = venue.get("display_count", 0)
        pro_courts = display_count
        print(f"  --pro-courts not specified, defaulting to venue display_count: {pro_courts}")
        print("  Use --pro-courts and --basic-courts explicitly for mixed-tier venues.")

    print(f"\nProject : {args.project}")
    print(f"Tier    : {tier}")
    print(f"APs     : {ap_count}")
    print(f"Courts  : {pro_courts} Pro + {basic_courts} Basic Plus")
    if args.security_cameras:
        print(f"Sec cams: {args.security_cameras}")
    if args.edge_switches:
        print(f"Edge sw : {args.edge_switches}")

    ports, assigned = build_ports(
        pro_courts=pro_courts,
        basic_courts=basic_courts,
        ap_count=ap_count,
        tier=tier,
        security_cameras=args.security_cameras,
        edge_switches=args.edge_switches,
    )

    total_with_vacant = assigned + RESERVED_VACANT

    if total_with_vacant > SWITCH_CAPACITY:
        print(f"\n  WARNING: {total_with_vacant} ports needed ({assigned} assigned + {RESERVED_VACANT} vacant)")
        print(f"  Exceeds single USW-Pro-48-POE capacity ({SWITCH_CAPACITY} ports).")
        print("  Consider aggregating per-court devices through edge switches.")
    else:
        headroom = SWITCH_CAPACITY - total_with_vacant
        print(f"\n  Ports used : {assigned} / {SWITCH_CAPACITY}")
        print(f"  Vacant     : {RESERVED_VACANT} reserved")
        print(f"  Headroom   : {headroom} free after reserved")

    output = {
        "project": f"[[{args.project}]]",
        "switch": "USW-Pro-48-POE",
        "total_ports": SWITCH_CAPACITY,
        "assigned_ports": assigned,
        "vacant_reserved": RESERVED_VACANT,
        "ports": ports,
    }

    out_dir = REPO_ROOT / "data" / "switch-ports"
    out_dir.mkdir(exist_ok=True)
    out_path = out_dir / f"{args.project}-switch-ports.yaml"

    with open(out_path, "w") as f:
        yaml.dump(output, f, default_flow_style=False, sort_keys=False, allow_unicode=True)

    print(f"\n  Output: {out_path}\n")


if __name__ == "__main__":
    main()
