---
type: inventory
name: UPS — 2000 VA (2 kVA) / 1200 W minimum, 2U rack-mount
sku: INFRA-UPS-2000VA
vendor: ""
category: power
unit_cost: 0.00
currency: PHP
status: current
---

Dense venues, or a 14-court venue on a Dahua with the white illuminator left on (706 W) — which is why the IR-only config step is load-bearing. Autonomous+ with an NVR lands here or above.

The BOM line is a **rating, not a model** — the load is the sum of every item's max-draw wattage on the venue, capped at ≤70% of the UPS rating, expressed as a VA rung at PF 0.6 (the pessimistic end of line-interactive). Watts binds, not VA: an on-line unit at PF 0.9 can meet the same watts a rung lower. Line-interactive with AVR minimum (PH mains need buck/boost), never standby/offline. 230V. 2U rack-mount, rack depth ≥610mm. Capacity is not runtime — confirm ≥5 min at the venue load separately.
