---
jira_key: KAN-22
jira_url: https://kosmaskavc.atlassian.net/browse/KAN-22
project: KAN
type: jira-issue
issue_type: Task
status: Review / QA
priority: Medium
assignee: Carlos Sandoval
reporter: Marco Van Basug
labels: ["marketing", "website"]
created: 2026-05-15T00:52:04.687+0800
updated: 2026-06-04T07:29:59.697+0800
synced_at: 2026-06-06
---

# KAN-22: Kosmas Website

## Description

Marketing site for Kosmas Athletic Ventures.

Live preview: [https://euphonious-gumption-ad6871.netlify.app/](https://euphonious-gumption-ad6871.netlify.app/)

Status (2026-05-14)

- Kosmas logo renders correctly in navbar and footer (assets/kosmas-logo.png loads, no failed requests).
- Hero, value prop, CTAs, services strip (DESIGN / ACTIVATE / OPERATE), and footer all render.
- Pending: feedback pass + the rest of the image assets (see below).

Missing images / empty visual blocks

Playwright audit found only 2 <img> tags on the page (both Kosmas logo). Several large layout blocks render empty where imagery is clearly expected:

- Portfolio section ("The portfolio.") — three cards for Helios, Atleta63, PodPlay. Card imagery missing (large white block in the mid-page).
- "The model is defensible. The numbers say so." — large navy block with no visible content. Stats/infographic or supporting visual expected.
- Partner / JV strip — currently a text-only marquee ("JOINT VENTURE - ROBINSONS LAND", "FIFA QUALITY PRO", "PODPLAY EXCLUSIVE SE ASIA"). Replace with actual partner logos (Robinsons Land, FIFA Quality Pro, etc.).
- Hero section background / accent imagery — currently a flat navy + red-triangle composition. Confirm whether a hero photo (facility / athletes) is intended.
- No imagery anywhere for Helios Pickleball, Atleta63, PodPlay — these are also linked in the footer projects list.

Brand colors observed (correct per CLAUDE.md update)

- Navy #005490 (primary)
- Red #E31F26 (energy accent / CTAs)
- Gold #D2AB67 (premium highlights)

Follow-up

- [ ] Source portfolio card images: Helios, Atleta63, PodPlay
- [ ] Source partner / JV logos: Robinsons Land, FIFA Quality Pro, others
- [ ] Decide hero treatment (flat brand or photo background)
- [ ] Stats / numbers infographic for the "model is defensible" section
- [ ] Collect team feedback pass

## Comments

### Marco Van Basug — 2026-05-15

add fix for broken cta buttons on home, about, and projects

### Marco Van Basug — 2026-05-24

Live preview URL updated to: [https://euphonious-gumption-ad6871.netlify.app/](https://euphonious-gumption-ad6871.netlify.app/)

### Richard Bachmann — 2026-05-24

We will hold our regular meeting tomorrow morning. Please ensure Marco attends so he can provide updates on the website and propose specific improvements.

### Carlos Sandoval — 2026-05-28

sorry I've been posting updates using marcos account on jira, let me know any feedback or requests, im currently basing off ninong Kim's requests for the site, also may I ask for what emails we want to use to populate the contact info?



fyi all the images are placeholder ai gen, except the building render

### Avvy Lapus — 2026-05-29



### Richard Bachmann — 2026-05-31

Met with Kim recently; he wants this live, and we can make corrections as we go.

### Carlos Sandoval — 2026-05-31

who has the domain credentials? do we have a domain yet? do we have to buy one? what domain are we looking at? [kosmas.ph](http://kosmas.ph)?

### Richard Bachmann — 2026-05-31

We already have [kosmas.com.ph](http://kosmas.com.ph) registered, so no need to purchase a new domain. Let’s confirm with Eric who currently has the domain credentials and access so we can move things forward.

### Carlos Sandoval — 2026-06-01

sounds good ill message him on whatsapp
