---
jira_key: KAN-22
jira_url: https://kosmaskavc.atlassian.net/browse/KAN-22
project: KAN
type: jira-issue
issue_type: Task
status: Ready To Execute
priority: Medium
assignee: Carlos Sandoval
reporter: Marco Van Basug
labels: ["marketing", "website"]
created: 2026-05-15T00:52:04.687+0800
updated: 2026-05-17T18:36:51.928+0800
synced_at: 2026-05-21
---

# KAN-22: Kosmas Website

## Description

Marketing site for Kosmas Athletic Ventures.Live preview: 

https://lighthearted-tapioca-ca567a.netlify.app/#homeStatus (2026-05-14)- Kosmas logo renders correctly in navbar and footer (assets/kosmas-logo.png loads, no failed requests).


- Hero, value prop, CTAs, services strip (DESIGN / ACTIVATE / OPERATE), and footer all render.


- Pending: feedback pass + the rest of the image assets (see below).
Missing images / empty visual blocksPlaywright audit found only 2 <img> tags on the page (both Kosmas logo). Several large layout blocks render empty where imagery is clearly expected:- Portfolio section ("The portfolio.")

 — three cards for Helios, Atleta63, PodPlay. Card imagery missing (large white block in the mid-page).


- "The model is defensible. The numbers say so."

 — large navy block with no visible content. Stats/infographic or supporting visual expected.


- Partner / JV strip

 — currently a text-only marquee ("JOINT VENTURE - ROBINSONS LAND", "FIFA QUALITY PRO", "PODPLAY EXCLUSIVE SE ASIA"). Replace with actual partner logos (Robinsons Land, FIFA Quality Pro, etc.).


- Hero section background / accent imagery

 — currently a flat navy + red-triangle composition. Confirm whether a hero photo (facility / athletes) is intended.


- No imagery anywhere for 

Helios Pickleball, Atleta63, PodPlay

 — these are also linked in the footer projects list.
Brand colors observed (correct per CLAUDE.md update)- Navy #005490 (primary)


- Red #E31F26 (energy accent / CTAs)


- Gold #D2AB67 (premium highlights)
Follow-up- [ ] Source portfolio card images: Helios, Atleta63, PodPlay


- [ ] Source partner / JV logos: Robinsons Land, FIFA Quality Pro, others


- [ ] Decide hero treatment (flat brand or photo background)


- [ ] Stats / numbers infographic for the "model is defensible" section


- [ ] Collect team feedback pass

## Repo Notes (local, not synced to Jira)

- **2026-06-03:** Website source imported into this repo at `general/company/website/` (`site/` = Netlify publish dir, `working/` = non-deployed artifacts). Root `netlify.toml` configures the deploy. Live at https://kosmas.com.ph/ (Netlify site `lighthearted-tapioca-ca567a`). Once the Netlify site is linked to this GitHub repo, pushes to `main` touching `site/` auto-redeploy.

## Feedback — Eriell (new Kosmas member), 2026-06-05

Verbatim feedback on the Home Page layout:

> Here are some of my comments regarding the Kosmas' website layout. I have also included some ideas and suggestions for the Home Page layout:
>
> The Home Tab is bombarded with texts. The perfect balance of texts with relevant photos keep a website enticing for readers and invites casual visitors to render even more time on the site. I'm pitching here my sample peg for the Home Page Banner: https://canva.link/fj19pr6mylsnf6t . Feel free to improve but stay within the balance of short text with relevant photos.
>
> It could be better to have an interactive type of construction timeline or status of flagship soon-to-rise facilities at the home tab. (Maybe in a form of timeline or infographic)
>
> Likewise, the upcoming PPA Tour should be atop the Home Page, or maybe we can just wait until it officially appears in the tournament calendar of PPA Website

### Recommendations (assistant)

1. **Rebalance Home text vs. imagery** — Home is currently text-heavy with only the logo as an `<img>` (matches the earlier Playwright audit: 2 `<img>` tags, both the logo). Cut hero/body copy to short punchy lines and pair each section with a relevant photo. Addresses Eriell's first point *and* the existing "missing imagery" follow-ups above. Review Eriell's Canva peg (`https://canva.link/fj19pr6mylsnf6t`) for the target text/photo ratio before implementing.
2. **Interactive construction timeline / status for flagship facilities** — Add a Home-tab timeline or infographic showing build status of soon-to-rise facilities (Helios flagship, Atleta63). Could double as the "stats / numbers infographic" already flagged for the *"the model is defensible"* section. Source data from `ventures/helios-pickleball-center/` and `ventures/podplay/data/projects/`.
3. **PPA Tour callout atop Home** — Two paths: (a) add now as a prominent top-of-Home banner, or (b) defer until the date is confirmed on the official PPA tournament calendar to avoid publishing an unconfirmed date. Cross-refs KAN-5 (PPA Asia Tour 2027) and KAN-6 (PPA125).

**Open decisions for team:** (a) confirm Eriell's Canva peg direction before reworking Home, (b) PPA Tour — publish now vs. wait for official PPA calendar.

## Comments

### Marco Van Basug — 2026-05-15

add fix for broken cta buttons on home, about, and projects
