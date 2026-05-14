---
jira_key: KAN-22
jira_url: https://kosmaskavc.atlassian.net/browse/KAN-22
project: KAN
type: jira-issue
issue_type: Task
status: In Progress
priority: Medium
assignee: Carlos Sandoval
reporter: Marco Van Basug
labels: [website, marketing]
created: 2026-05-14
updated: 2026-05-14
synced_at: 2026-05-14
---

# KAN-22: Kosmas Website

Marketing site for Kosmas Athletic Ventures.

**Live preview:** https://lighthearted-tapioca-ca567a.netlify.app/#home

## Status (2026-05-14)
- Kosmas logo renders correctly in navbar and footer (`assets/kosmas-logo.png` loads, no failed requests).
- Hero, value prop, CTAs, services strip (DESIGN / ACTIVATE / OPERATE), and footer all render.
- Pending: feedback pass + the rest of the image assets (see below).

## Missing images / empty visual blocks
Playwright audit (2026-05-14) found only 2 `<img>` tags on the page (both the Kosmas logo). Several large layout blocks render empty where imagery is clearly expected:

- **Portfolio section** ("The portfolio.") — three cards for Helios, Atleta63, PodPlay. Card imagery missing (large white block mid-page).
- **"The model is defensible. The numbers say so."** — large navy block with no visible content. Stats/infographic or supporting visual expected.
- **Partner / JV strip** — currently a text-only marquee ("JOINT VENTURE - ROBINSONS LAND", "FIFA QUALITY PRO", "PODPLAY EXCLUSIVE SE ASIA"). Replace with actual partner logos (Robinsons Land, FIFA Quality Pro, etc.).
- **Hero section background / accent imagery** — currently flat navy + red-triangle composition. Confirm whether a hero photo (facility / athletes) is intended.
- No imagery anywhere for **Helios Pickleball, Atleta63, PodPlay** (also linked in the footer projects list).

## Brand colors observed (correct per [[overview]] update)
- Navy `#005490` (primary)
- Red `#E31F26` (energy accent / CTAs)
- Gold `#D2AB67` (premium highlights)

## Follow-up
- [ ] Source portfolio card images: Helios, Atleta63, PodPlay
- [ ] Source partner / JV logos: Robinsons Land, FIFA Quality Pro, others
- [ ] Decide hero treatment (flat brand or photo background)
- [ ] Stats / numbers infographic for the "model is defensible" section
- [ ] Collect team feedback pass
