---
type: inventory
name: UPS — 1500 VA (1.5 kVA) / 900 W minimum, 2U rack-mount
sku: INFRA-UPS-1500VA
vendor: ""
category: power
unit_cost: 0.00
currency: PHP
status: current
---

Rung for a **14-court venue on the Dahua HDW5459T-ZE-IL** (612 W with illumination locked to IR). The camera choice moves the rung — same venue on the Uniview is one rung lower.

The BOM line is a **rating, not a model** — the load is the sum of every item's max-draw wattage on the venue, capped at ≤70% of the UPS rating, expressed as a VA rung at PF 0.6 (the pessimistic end of line-interactive). Watts binds, not VA: an on-line unit at PF 0.9 can meet the same watts a rung lower. Line-interactive with AVR minimum (PH mains need buck/boost), never standby/offline. 230V. 2U rack-mount, rack depth ≥610mm. Capacity is not runtime — confirm ≥5 min at the venue load separately.

**What Kosmas actually buys:** the KSTAR MemoPower RT-III [[kstar-memopower-rt-iii-1k]] (900 W) or [[kstar-memopower-rt-iii-2k]] (1800 W), picked from the computed watts.
