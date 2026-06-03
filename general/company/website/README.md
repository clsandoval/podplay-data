# Kosmas Website

Marketing site for Kosmas Athletic Ventures Co. Tracked as [KAN-22](https://kosmaskavc.atlassian.net/browse/KAN-22) (`tasks/jira/KAN-22-kosmas-website.md`).

- **Live:** https://kosmas.com.ph/ (Netlify; preview URL `lighthearted-tapioca-ca567a.netlify.app`)
- **Deploys:** Netlify is linked to this GitHub repo. Pushes to `main` that touch `site/` (or root `netlify.toml`) trigger a redeploy. Publish directory and ignore rule are configured in root `netlify.toml`.

## Layout

```
website/
├── site/        # ← exactly what Netlify publishes — nothing else goes live
│   ├── index.html              # production page (self-contained, ~2MB)
│   ├── KAVC Website.html       # production export variant
│   ├── KAVC Website (Dev).html # dev page — loads the raw .jsx below via Babel standalone
│   ├── *.jsx                   # React source (app, chrome, pages-*, tweaks-panel)
│   ├── styles.css
│   └── assets/                 # imagery + logos
└── working/     # never deployed — kept private by the publish-dir split
    ├── image-prompts.md        # prompts for pending/generated imagery
    ├── uploads/                # brand guidelines PDF, pasted reference images
    └── screenshots/            # QA captures
```

## Editing

- No build step: it's static HTML/CSS/JSX (React + Babel standalone from CDN).
- Develop against `site/KAVC Website (Dev).html`, which loads the `.jsx` files directly.
- `site/index.html` is the self-contained production page — regenerate/update it when shipping changes.
- Brand: navy `#005490`, red `#E31F26`, gold `#D2AB67` (see `general/company/brand` guidance in root CLAUDE.md).
- Anything secret or work-in-progress goes in `working/`, never `site/`.
