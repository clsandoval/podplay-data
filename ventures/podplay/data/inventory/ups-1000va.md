---
type: inventory
name: UPS — 1000 VA (1 kVA) / 600 W minimum, 2U rack-mount
sku: INFRA-UPS-1000VA
vendor: ""
category: power
unit_cost: 0.00
currency: PHP
status: current
---

Typical rung for a mid-size Pro venue, and for a **14-court venue on the Uniview Owlview** (406 W). 1 kVA = 1000 VA — PH sellers use both, often in the same listing.

The BOM line is a **rating, not a model** — the load is the sum of every item's max-draw wattage on the venue, capped at ≤70% of the UPS rating, expressed as a VA rung at PF 0.6 (the pessimistic end of line-interactive). Watts binds, not VA: an on-line unit at PF 0.9 can meet the same watts a rung lower. Line-interactive with AVR minimum (PH mains need buck/boost), never standby/offline. 230V. 2U rack-mount, rack depth ≥610mm. Capacity is not runtime — confirm ≥5 min at the venue load separately.
