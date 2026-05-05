---
name: ingestion
description: Proactive data capture — watches for missing entity signals and suggests creating files
---

# Ingestion Skill — Proactive Data Capture

When processing a conversation, watch for signals that suggest data should be captured but doesn't exist yet. Don't force creation — suggest it.

## Pattern: "I noticed we don't have X tracked. Want me to create a file for it?"

## Signals to Watch For

| Category | Signal | What to create |
|----------|--------|----------------|
| Warranties & SLAs | Project hits deployment complete | `data/contracts/venue-warranty.md` |
| Vendor pricing history | PO or invoice mentions unit costs | Append pricing section to `data/vendors/*.md` |
| Site survey results | Meeting notes mention site visit | Update `data/venues/*.md` with measurements |
| ISP contracts | Project has ISP selected | `data/contracts/venue-isp.md` |
| Training records | Installer onboarded or upskilled | Update `data/installers/*.md` certifications |
| Post-install metrics | Venue goes live | Update `data/venues/*.md` with coverage results |
| Client feedback | Meeting notes or follow-up calls | Update `data/clients/*.md` with satisfaction notes |
| Competitor intel | Mentioned in meetings or leads | `data/notes/competitors/competitor-name.md` |
| Regulatory/permits | Venue in new region or country | `data/notes/regulatory/region-name.md` |
| Insurance | Equipment shipped or installed | `data/contracts/venue-insurance.md` |
| Maintenance schedules | Venue operational > 30 days | `data/tickets/venue-maintenance-schedule.md` |
| Spare parts inventory | Multiple venues operational | `data/inventory/spares-item.md` |
| Travel logistics | Team travel for deployment | `data/notes/travel/region-name.md` |
| Lessons learned | Project completed or major issue resolved | `data/notes/retrospectives/topic.md` |
| Escalation paths | Support ticket unresolved > 48h | Update `data/team/*.md` or `data/vendors/*.md` with escalation contacts |
| Revenue forecasting | New lead or project milestone | Update `dashboards/pipeline.yaml` |
| Equipment lifecycle | Hardware > 2 years old at a venue | Flag for refresh planning in project notes |

## Behavior

- Only suggest when the conversation naturally touches a gap
- One suggestion per conversation turn — don't overwhelm
- If the user declines, don't ask again in the same session
- When creating, use the entity schemas from CLAUDE.md
