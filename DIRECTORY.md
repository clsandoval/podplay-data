# Podplay Data Repository - Complete Directory Structure

## Root Level
```
podplay-data/
├── CLAUDE.md                 # Task tracking & context (what we're working on)
├── .env.example              # Environment variables template
├── .gitignore                # Git ignore rules
├── general/                  # Kosmas company-wide data
├── ventures/                 # Individual business ventures
├── skills/                   # Shared automation skills
└── tmp/                      # Temporary files
```

---

## 📋 GENERAL/ - Kosmas Company Level

### `general/company/`
- `overview.md` - Company overview & context

### `general/people/`
Team members (12 people documented):
- andy-korzeniacki.md
- avvy-lapus.md
- carlos-sandoval.md
- chad.md
- eric-mallari.md
- ernesto-ebuen.md
- jc-golez.md
- kim-lapis.md
- marco-basug.md
- nico.md
- richard-bachmann.md
- sophia-lapus.md

### `general/templates/`
- `project-template.md` - Base template for new projects

---

## 🚀 VENTURES/ - Kosmas Business Divisions

### **1. Podplay** (Primary - Most Detailed)
```
podplay/
├── README.md                 # Overview
├── CLAUDE.md                 # Podplay-specific tasks
├── skills/                   # Podplay-specific skills
│   └── consistency-check.md
├── templates/                # Business templates
│   ├── bom-autonomous-plus.yaml
│   ├── bom-pro.yaml
│   └── checklist-deployment.yaml
├── dashboards/               # Business metrics
│   ├── pipeline.yaml
│   └── revenue.yaml
├── pricing/
│   └── rate-card.md
└── data/
    ├── clients/              # 2 clients documented
    │   ├── atleta-63-client.md
    │   └── tela-park-client.md
    ├── venues/               # 4 venues documented
    │   ├── atleta-63-venue.md
    │   ├── helios-venue.md
    │   ├── tela-park-venue.md
    │   └── temporary-facility-venue.md
    ├── projects/             # Active projects
    │   ├── atleta-63-demo.md
    │   ├── helios.md
    │   ├── tela-park.md
    │   └── temporary-facility.md
    ├── inventory/            # 50+ equipment items
    │   ├── Network gear (UniFi switches, cameras, UDM Pro)
    │   ├── Display tech (TVs, Apple TV, iPad mounts)
    │   ├── Kiosk systems (iPad, Mosyle profiles)
    │   ├── Access control (Kisi readers/controllers)
    │   ├── Cameras (Empiretch Replay, UniFi turrets)
    │   ├── Buttons (Flic smart buttons)
    │   ├── Storage (Samsung T7 drives)
    │   ├── Power (APC UPS, PDU, surge protection)
    │   └── Physical (signage, mounts, cable)
    ├── vendors/              # 11 vendors documented
    │   ├── amazon.md
    │   ├── apple.md
    │   ├── cta-digital.md
    │   ├── empiretch.md
    │   ├── fast-signs.md
    │   ├── flic.md
    │   ├── hideit.md
    │   ├── kisi.md
    │   ├── poe-texas.md
    │   ├── stripe.md
    │   └── ubiquiti.md
    ├── contracts/            # Agreements
    │   └── tela-park-sow.md
    ├── recurring-fees/       # Subscription/recurring revenue
    │   ├── tela-park-basic-plus.md
    │   └── tela-park-pro.md
    ├── checklists/           # Operational checklists
    │   └── tela-park-deployment.yaml
    ├── leads/                # Sales opportunities
    │   ├── reset-pickleball.md
    │   └── thai-prospects.md
    ├── meetings/             # Meeting notes
    │   ├── 2026-02-19-podplay-sync.md
    │   ├── 2026-02-25-nico-pre-training-infrastructure-call.md
    │   ├── 2026-03-02-nj-training-trip.md
    │   └── 2026-04-15-tela-park-negotiation.md
    ├── notes/                # Technical & business notes
    │   ├── bom-pro-14-court.md
    │   ├── mosyle-kiosk-ipad-profiles.md
    │   ├── network-architecture.md
    │   ├── replay-flow.md
    │   ├── revenue-model-philippines.md
    │   ├── service-tiers.md
    │   ├── sales/
    │   │   └── icp.md (Ideal Customer Profile)
    │   └── tela-park-brief.pdf
    ├── tickets/              # Transactions/invoices
    │   └── tela-park-apple-device-payment.md
    ├── invoices/             # (empty - .gitkeep only)
    ├── expenses/             # (empty - .gitkeep only)
    └── shipping/             # (empty - .gitkeep only)
```

### **2. Helios Pickleball Center**
```
helios-pickleball-center/
└── README.md                 # Overview
```
*Status: Light documentation - mostly referenced within Podplay*

### **3. Digital Wallet**
```
digital-wallet/
├── README.md                 # Overview
├── knowledge/
│   └── digital-wallet.md
└── data/
    └── vendors/
        └── magpie.md
```

### **4. Athlete Management**
```
athlete-management/
└── README.md                 # Overview
```

### **5. Pickleball Consulting**
```
pickleball-consulting/
└── README.md                 # Overview
```

### **6. Podplay Distribution**
```
podplay-distribution/
└── README.md                 # Overview
```

---

## 🛠️ SKILLS/ - Shared Automation

Reusable skills/tools:
- `discovery-call.md` - Discovery call framework
- `ingestion.md` - Data ingestion process
- `meeting-to-tickets.md` - Meeting notes → tickets automation
- `proposal-writing.md` - Proposal generation
- `slack-file-reading.md` - Slack file reading capability

---

## Summary: What Information We Have About Kosmas

### ✅ **Detailed Data**
1. **Podplay (Primary business)**
   - 4 active venues
   - 2 main clients + multiple leads
   - 50+ inventory items with specs
   - 11 vendor relationships
   - Network architecture & technical specs
   - Service tiers & pricing models
   - Deployment checklists & SoW

2. **Team** - 12 people documented
3. **Templates** - Project & business templates
4. **Skills** - 5 automation capabilities

### 📝 **Moderate Data**
- Helios Pickleball Center (referenced, light docs)
- Digital Wallet (basic overview)
- Athlete Management (basic overview)
- Pickleball Consulting (basic overview)
- Podplay Distribution (basic overview)

### ⚠️ **Gaps for KAVC Website**
- No comprehensive brand guidelines (colors, fonts mentioned but not centralized)
- No service/product catalog
- No company mission/vision statement
- No competitive positioning
- No audience research
- No feature/capability inventory
- No marketing messaging

---

## Next Steps for KAVC Website

To create a comprehensive website, we should add:
1. **Company overview** - Mission, vision, values
2. **Services catalog** - All 6 ventures explained
3. **Brand assets** - Colors, typography, logo files
4. **Team bios** - For about page
5. **Case studies** - Success stories (Tela Park, Atleta 63, Helios)
6. **Audience segments** - Who are we talking to?
7. **Competitive analysis** - Market positioning
8. **Content structure** - Site map & navigation

