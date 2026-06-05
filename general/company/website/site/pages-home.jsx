/* ============================================================
   Homepage + About page
   ============================================================ */

/* PPA Asia Tour announcement bar.
   Flip to false to hide until the event is confirmed on the official PPA
   tournament calendar. Source: KAN-5 (internal, status: Planning) — 2nd week
   of January 2027 at Helios Beta. Team decision pending: publish now vs. wait. */
const SHOW_PPA_BANNER = true;

function PPABanner({ go }) {
  return (
    <div
      role="region"
      aria-label="PPA Asia Tour announcement"
      style={{
        background: "var(--kosmas-blue-ink)",
        borderBottom: "1px solid rgba(210,171,103,0.35)",
        color: "var(--bone)",
      }}>
      <div className="container ppa-bar" style={{
        display: "flex", alignItems: "center", gap: 18, flexWrap: "wrap",
        paddingTop: 12, paddingBottom: 12, justifyContent: "center",
      }}>
        <span className="eyebrow" style={{ color: "var(--kosmas-gold)", margin: 0 }}>
          <span className="dot" />Upcoming
        </span>
        <span className="body-m" style={{ margin: 0, color: "rgba(255,255,255,0.92)" }}>
          <strong style={{ fontWeight: 600 }}>PPA Asia Tour</strong> comes to Helios — January 2027
        </span>
        <a href="#helios" className="ppa-bar__link" onClick={(e) => { e.preventDefault(); go("helios"); }}
           style={{ color: "var(--kosmas-gold-soft)", fontFamily: "var(--font-mono)", fontSize: 13, letterSpacing: "0.08em", textTransform: "uppercase", display: "inline-flex", alignItems: "center", gap: 8 }}>
          Learn more <span className="arrow" />
        </a>
      </div>
    </div>
  );
}

/* Full-bleed hero banner — rotating facility photo with overlaid copy.
   Layout follows Eriell's peg (photo-forward, text lower-left, carousel);
   styling stays Kosmas (display type, navy/gold, angular buttons + dots). */
function HeroBanner({ go }) {
  const slides = [
    { src: "assets/helios-centre-court.jpg", label: "Helios · centre court" },
    { src: "assets/atleta63-pitch.jpg",       label: "Atleta63 · FIFA-quality pitch" },
    { src: "assets/podplay-venue.jpg",         label: "PodPlay · venue technology" },
  ];
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI(p => (p + 1) % slides.length), 5500);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="bg-ink" style={{ position: "relative", overflow: "hidden", minHeight: "clamp(520px, 82vh, 760px)", display: "flex", alignItems: "flex-end" }}>
      {/* rotating photos */}
      {slides.map((s, idx) => (
        <div key={s.src} aria-hidden style={{
          position: "absolute", inset: 0,
          backgroundImage: `url("${s.src}")`, backgroundSize: "cover", backgroundPosition: "center",
          opacity: idx === i ? 1 : 0, transition: "opacity 1.1s ease",
        }} />
      ))}
      {/* legibility scrim: stronger at left + bottom */}
      <div aria-hidden style={{ position: "absolute", inset: 0,
        background: "linear-gradient(90deg, rgba(3,14,28,0.92) 0%, rgba(3,14,28,0.62) 42%, rgba(3,14,28,0.18) 100%)" }} />
      <div aria-hidden style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: "45%",
        background: "linear-gradient(0deg, rgba(3,14,28,0.85), transparent)" }} />
      {/* gold hairline */}
      <div aria-hidden style={{ position: "absolute", bottom: -2, left: 0, width: "100%", height: "1px",
        background: "linear-gradient(90deg, transparent, var(--kosmas-gold) 30%, var(--kosmas-gold) 70%, transparent)", opacity: 0.6 }} />

      <div className="container" style={{ position: "relative", paddingTop: "clamp(96px, 13vw, 150px)", paddingBottom: "clamp(48px, 6vw, 84px)" }}>
        <Reveal>
          <div className="eyebrow" style={{ color: "var(--kosmas-gold)" }}>
            <span className="dot" />Kosmas Athletic Ventures Co. · Manila
          </div>
        </Reveal>
        <Reveal delay={120}>
          <h1 className="display display-xl" style={{ color: "var(--bone)", marginTop: 22, marginBottom: 0, maxWidth: "15ch", textShadow: "0 2px 28px rgba(0,0,0,0.4)" }}>
            Building the <span style={{ color: "var(--kosmas-red)" }}>Premier</span> Sports & Wellness Ecosystem <span style={{ color: "var(--kosmas-gold)", fontWeight: 600 }}>in the Philippines.</span>
          </h1>
        </Reveal>
        <Reveal delay={260}>
          <p className="lede" style={{ color: "rgba(255,255,255,0.85)", maxWidth: "44ch", marginTop: 26, marginBottom: 0 }}>
            We design, activate, and operate the venues redefining how Filipinos live, train, and play.
          </p>
          <div className="hero-actions" style={{ display: "flex", gap: 12, marginTop: 32, flexWrap: "wrap" }}>
            <a href="#projects" className="btn btn--red" onClick={(e) => { e.preventDefault(); go("projects"); }}>
              See the projects <span className="arrow" />
            </a>
            <a href="#consulting" className="btn btn--ghost-light" onClick={(e) => { e.preventDefault(); go("consulting"); }}>
              Work with us
            </a>
          </div>
        </Reveal>
        {/* carousel indicators */}
        <div role="tablist" aria-label="Featured venues" style={{ display: "flex", gap: 10, marginTop: 44, alignItems: "center" }}>
          {slides.map((s, idx) => (
            <button key={s.src} type="button" role="tab" aria-selected={idx === i} aria-label={s.label}
              onClick={() => setI(idx)}
              style={{
                width: idx === i ? 30 : 11, height: 6, padding: 0, border: "none", cursor: "pointer",
                background: idx === i ? "var(--kosmas-gold)" : "rgba(255,255,255,0.4)",
                transition: "width .3s ease, background .3s ease",
              }} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* Interactive construction / status timeline for the flagship facilities.
   Click a milestone to expand its detail. Facts sourced from
   ventures/helios-pickleball-center/README.md (KAN-26 / KAN-5). */
function BuildTimeline() {
  const milestones = [
    {
      tag: "In construction",
      when: "2026",
      title: "Helios Beta",
      blurb: "A 14-court professional-grade complex in Bridgetowne — dedicated centre court, café, pro shop, and wellness/recovery lounge. Opening soon.",
      img: "assets/helios-centre-court.jpg",
      accent: "var(--kosmas-red)",
    },
    {
      tag: "Scheduled",
      when: "Jan 2027",
      title: "PPA Asia Tour",
      blurb: "The PPA Asia Tour is set to be hosted at Helios Beta — bringing professional pickleball to the Philippines.",
      img: "assets/helios-centre-court.jpg",
      accent: "var(--kosmas-gold)",
    },
    {
      tag: "Concept · target 2028",
      when: "2028",
      title: "Helios Flagship",
      blurb: "The 10-story, 24-court flagship arena — the showcase deployment for everything Kosmas does, from PodPlay technology to pro programming. Renders are concept.",
      img: "assets/helios-exterior.jpg",
      accent: "#ffffff",
    },
  ];
  const [active, setActive] = useState(0);
  const cur = milestones[active];

  return (
    <section className="section bg-ink-deep">
      <div className="container">
        <Reveal>
          <div className="eyebrow" style={{ color: "var(--kosmas-gold)" }}><span className="dot" />Now rising</div>
          <h2 className="display display-l" style={{ color: "var(--bone)", marginTop: 18, maxWidth: "18ch" }}>
            The build, on a timeline.
          </h2>
        </Reveal>

        {/* milestone rail */}
        <Reveal delay={100}>
          <div className="build-rail" style={{
            display: "grid", gridTemplateColumns: `repeat(${milestones.length}, 1fr)`,
            gap: 0, marginTop: 56, borderTop: "1px solid rgba(255,255,255,0.16)",
          }}>
            {milestones.map((m, i) => {
              const on = i === active;
              return (
                <button key={m.title} type="button"
                  onClick={() => setActive(i)}
                  aria-pressed={on}
                  className="build-node"
                  style={{
                    textAlign: "left", background: "transparent", border: "none", cursor: "pointer",
                    padding: "24px 20px 24px 0", position: "relative", color: "inherit",
                    borderTop: on ? `2px solid ${m.accent}` : "2px solid transparent", marginTop: -1,
                    opacity: on ? 1 : 0.6, transition: "opacity .2s ease",
                  }}>
                  <div className="eyebrow" style={{ color: m.accent, margin: 0 }}>{m.when}</div>
                  <div className="display display-s" style={{ color: "var(--bone)", marginTop: 10 }}>{m.title}</div>
                  <div className="body-m" style={{ color: "rgba(255,255,255,0.6)", marginTop: 4 }}>{m.tag}</div>
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* active detail */}
        <div className="grid grid-12" style={{ gap: 48, alignItems: "center", marginTop: 48 }}>
          <div style={{ gridColumn: "span 6" }}>
            <div className="eyebrow" style={{ color: cur.accent }}><span className="dot" />{cur.tag}</div>
            <h3 className="display display-m" style={{ color: "var(--bone)", marginTop: 14 }}>{cur.title}</h3>
            <p className="lede" style={{ color: "rgba(255,255,255,0.78)", marginTop: 16 }}>{cur.blurb}</p>
          </div>
          <div style={{ gridColumn: "span 6" }}>
            <ImgPh src={cur.img} alt={cur.title} label={cur.title.toLowerCase()} h={300} clip="clip-tl" style={{ width: "100%" }} />
          </div>
        </div>
      </div>
    </section>
  );
}

function Home({ go, density }) {
  return (
    <main data-screen-label="01 Home">
      {/* PPA TOUR ANNOUNCEMENT — toggle SHOW_PPA_BANNER (top of file) to publish/hide.
          Date is internal (KAN-5, status: Planning) and not yet on the official PPA calendar. */}
      {SHOW_PPA_BANNER && <PPABanner go={go} />}

      {/* HERO — full-bleed facility photo with overlaid copy + carousel (peg: Eriell) */}
      <HeroBanner go={go} />

      {/* MARQUEE */}
      <section className="bg-ink" style={{ color: "var(--kosmas-gold)", paddingTop: 0 }}>
        <div className="marquee" style={{ borderColor: "rgba(184,146,79,0.35)" }}>
          <div className="marquee__track">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="marquee__item">
                <span>Design</span><span className="sep" />
                <span>Activate</span><span className="sep" />
                <span>Operate</span><span className="sep" />
                <span>Joint Venture · Robinsons Land</span><span className="sep" />
                <span>FIFA Quality Pro</span><span className="sep" />
                <span>PodPlay · Exclusive SE Asia</span><span className="sep" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INTRO + PILLARS */}
      <section className="section bg-bone">
        <div className="container">
          <div className="grid grid-12" style={{ gap: 48, alignItems: "start" }}>
            <Reveal style={{ gridColumn: "span 4" }}>
              <div className="eyebrow on-light"><span className="dot" />The Demand Engine</div>
              <h2 className="display display-m" style={{ marginTop: 18 }}>
                Not a builder. An <span style={{ color: "var(--kosmas-red)", fontWeight: 600 }}>asset activator.</span>
              </h2>
            </Reveal>
            <Reveal delay={100} style={{ gridColumn: "span 8" }}>
              <p className="lede">
                KAVC engineers ecosystems that generate consistent foot traffic, extend dwell time,
                and elevate the value of the real estate around them. We deliver enduring sports
                and wellness assets — not just facilities.
              </p>
              <div className="grid grid-3" style={{ marginTop: 64, gap: 0, borderTop: "1px solid var(--line)" }}>
                {[
                  { n: "01", t: "Design", d: "Sport-specific infrastructure engineered to international certification standards." },
                  { n: "02", t: "Activate", d: "Proprietary programming, community leagues, and international tournaments drive utilization." },
                  { n: "03", t: "Operate", d: "A tech-driven management stack optimizes operations and captures actionable usage data." },
                ].map((p, i) => (
                  <div key={p.n} className="pillar-cell" style={{
                    padding: "28px 24px 28px 0",
                    borderRight: i < 2 ? "1px solid var(--line)" : "none",
                    paddingLeft: i > 0 ? 24 : 0,
                  }}>
                    <div className="eyebrow on-light" style={{ color: "var(--kosmas-gold)" }}>{p.n}</div>
                    <h3 className="display display-s" style={{ marginTop: 12, marginBottom: 8 }}>{p.t}</h3>
                    <p className="body-m" style={{ margin: 0, color: "var(--ink-2)" }}>{p.d}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* PROJECTS SNAPSHOT */}
      <section className="section bg-ink-deep">
        <div className="container">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 24, marginBottom: 56 }}>
            <Reveal>
              <div className="eyebrow" style={{ color: "var(--kosmas-gold)" }}><span className="dot" />Three flagships · One ecosystem</div>
              <h2 className="display display-l" style={{ color: "var(--bone)", marginTop: 18 }}>The portfolio.</h2>
            </Reveal>
            <Reveal delay={100}>
              <a href="#projects" className="btn btn--ghost-light" onClick={(e) => { e.preventDefault(); go("projects"); }}>
                View all projects <span className="arrow" />
              </a>
            </Reveal>
          </div>

          <div className="grid grid-3" style={{ gap: 24 }}>
            <ProjectCard
              code="01 / Pickleball"
              title="Helios"
              kicker="Joint Venture · Robinsons Land"
              copy="Helios Beta — a 14-court professional-grade complex in Bridgetowne, opening soon — leads toward the 10-story, 24-court flagship arena in 2028."
              imgLabel="helios flagship · concept render · bridgetowne"
              src="assets/helios-exterior-card.jpg"
              go={() => go("helios")}
              accent="var(--kosmas-red)"
            />
            <ProjectCard
              code="02 / Football"
              title="Atleta63"
              kicker="Only FIFA Quality Pro pitch in the Philippines"
              copy="The pinnacle of football infrastructure — an all-weather pitch with bar and recreation, built for elite performance."
              imgLabel="pitch · bridgetowne"
              src="assets/atleta63-pitch-card.jpg"
              go={() => go("atleta63")}
              accent="var(--kosmas-gold)"
            />
            <ProjectCard
              code="03 / Technology"
              title="PodPlay"
              kicker="Exclusive Asian distribution rights"
              copy="An integrated booking and instant-replay platform — the operating system for our venues, and our primary competitive moat."
              imgLabel="control room · venue ops"
              src="assets/podplay-venue-card.jpg"
              go={() => go("podplay")}
              accent="#ffffff"
            />
          </div>
        </div>
      </section>

      {/* CONSTRUCTION TIMELINE */}
      <BuildTimeline />

      {/* PROOF / STATS */}
      <section className="section bg-bone">
        <div className="container">
          <Reveal>
            <div className="eyebrow on-light"><span className="dot" />Proof points</div>
            <h2 className="display display-m" style={{ marginTop: 18, maxWidth: "20ch" }}>
              The model is defensible. The numbers say so.
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <div className="grid grid-4" style={{ marginTop: 72, gap: 32 }}>
              <Stat value="14" label="Pro courts · Helios Beta" suffix="" />
              <Stat value="1" label="FIFA Quality Pro pitch" suffix=" of 1" color="var(--kosmas-gold)" />
              <Stat value="SE" label="PodPlay distribution" suffix=" Asia" color="var(--kosmas-blue)" />
              <Stat value="2028" label="Helios flagship arena" suffix="" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA STRIP */}
      <section className="bg-blue" style={{ padding: "72px 0", position: "relative", overflow: "hidden" }}>
        <div aria-hidden style={{
          position: "absolute", top: 0, left: "60%", width: "60%", height: "100%",
          background: "linear-gradient(135deg, transparent 50%, rgba(214,40,40,0.45) 50%)",
        }} />
        <div className="container" style={{ position: "relative", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 32 }}>
          <div>
            <div className="eyebrow" style={{ color: "var(--kosmas-gold-soft)" }}><span className="dot" />Real estate developers · Operators</div>
            <h2 className="display display-m" style={{ color: "#fff", marginTop: 18, maxWidth: "20ch" }}>
              Building a sports asset?<br/>Let's talk economics.
            </h2>
          </div>
          <a className="btn btn--red" onClick={() => go("consulting")} style={{ marginTop: 8 }}>
            Work With Us <span className="arrow" />
          </a>
        </div>
      </section>
    </main>
  );
}

function ProjectCard({ code, title, kicker, copy, imgLabel, go, accent, src }) {
  return (
    <Reveal>
      <article style={{ display: "flex", flexDirection: "column", height: "100%", cursor: "pointer" }} onClick={go}>
        <ImgPh label={imgLabel} code={code} dark h={300} clip="clip-tl" src={src} alt={title + " — " + imgLabel} />
        <div style={{ padding: "24px 4px 4px", display: "flex", flexDirection: "column", flex: 1 }}>
          <div className="eyebrow" style={{ color: accent }}>{kicker}</div>
          <h3 className="display display-m" style={{ color: "var(--bone)", margin: "12px 0 12px" }}>{title}</h3>
          <p className="body-m" style={{ color: "rgba(255,255,255,0.7)", margin: 0, flex: 1 }}>{copy}</p>
          <div style={{ marginTop: 24, display: "inline-flex", alignItems: "center", gap: 10, color: accent, fontFamily: "var(--font-display)", fontSize: 13, letterSpacing: "0.14em", textTransform: "uppercase" }}>
            Explore <span className="arrow" />
          </div>
        </div>
      </article>
    </Reveal>
  );
}

/* ============================================================
   ABOUT — Sophia's edited KAVC copy
   ============================================================ */
function About({ go }) {
  const pillars = [
    {
      n: "01",
      t: "Facility Development",
      d: "State-of-the-art sports complexes, wellness centers, and recreational hubs across the Philippines — multi-court sports halls, outdoor fields, fitness centers, wellness lounges, and specialized training zones.",
      label: "facility · concept render · helios flagship",
      img: "assets/helios-centre-court.jpg",
    },
    {
      n: "02",
      t: "Facility Management",
      d: "Gyms, spas, and wellness spaces operated with a consistent focus on member experience — from group fitness and recovery to longevity training and lifestyle coaching.",
      label: "wellness · lounge · member experience",
      img: "assets/about-facility-management.jpg",
    },
    {
      n: "03",
      t: "Sports Leagues & Community Programs",
      d: "Competitive leagues and tournaments in basketball, volleyball, pickleball, and football — across youth, adult, corporate, and elite divisions. Raising the standard for grassroots sports.",
      label: "helios flagship · concept render",
      img: "assets/helios-exterior.jpg",
    },
    {
      n: "04",
      t: "Athletic Rehabilitation & Performance",
      d: "Physiotherapy, sports medicine support, and performance enhancement integrated directly into the facility network — so athletes get comprehensive, seamless care.",
      label: "rehab · recovery · sports medicine",
      img: "assets/about-rehab-performance.jpg",
    },
  ];

  return (
    <main data-screen-label="02 About">
      {/* Page header */}
      <section className="bg-bone" style={{ paddingTop: "clamp(72px, 9vw, 140px)", paddingBottom: "clamp(48px, 5vw, 88px)" }}>
        <div className="container">
          <Reveal>
            <div className="eyebrow on-light"><span className="dot" />About Kosmas Athletic Ventures Corporation</div>
            <h1 className="display display-l" style={{ marginTop: 18, maxWidth: "20ch" }}>
              Building the Philippines' home for <span style={{ color: "var(--kosmas-red)", fontWeight: 600 }}>sports, wellness, and active living.</span>
            </h1>
          </Reveal>
        </div>
      </section>

      {/* About the Company */}
      <section className="section--tight bg-bone">
        <div className="container">
          <div className="grid grid-12" style={{ gap: 48, alignItems: "start", borderTop: "1px solid var(--line)", paddingTop: 56 }}>
            <Reveal style={{ gridColumn: "span 5" }}>
              <div className="eyebrow on-light"><span className="dot" />About the Company</div>
              <h2 className="display display-m" style={{ marginTop: 18 }}>
                One integrated platform for Filipino sport.
              </h2>
            </Reveal>
            <Reveal delay={100} style={{ gridColumn: "span 7" }}>
              <p className="lede">
                Kosmas Athletic Ventures Corporation is a Philippine enterprise dedicated to developing
                and operating world-class sports, recreational, and wellness facilities across the country.
              </p>
              <p className="body-l" style={{ color: "var(--ink-2)", marginTop: 20 }}>
                Founded on the conviction that active lifestyles create stronger communities, the company
                brings together facility development, professional operations, organized sports programming,
                and athletic rehabilitation under a single integrated platform — serving everyone from
                casual participants and community leagues to competitive athletes requiring specialized
                performance and recovery care.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Vision / Strategic Direction */}
      <section className="section bg-ink">
        <div className="container">
          <div className="grid grid-12" style={{ gap: 48, alignItems: "start" }}>
            <Reveal style={{ gridColumn: "span 5" }}>
              <div className="eyebrow"><span className="dot" />Vision & Strategic Direction</div>
              <h2 className="display display-l" style={{ color: "var(--bone)", marginTop: 18 }}>
                The most complete <span style={{ color: "var(--kosmas-gold)", fontWeight: 600 }}>active lifestyle ecosystem</span> the Philippines and Southeast Asia has ever seen.
              </h2>
            </Reveal>
            <Reveal delay={120} style={{ gridColumn: "span 7" }}>
              <p className="lede" style={{ color: "rgba(255,255,255,0.85)" }}>
                Kosmas operates across four core areas — facility development, facility management,
                sports programming, and rehabilitation services — designed to support every stage
                of a person's athletic journey.
              </p>
              <p className="body-l" style={{ color: "rgba(255,255,255,0.72)", marginTop: 20 }}>
                By combining these pillars into one unified operation, Kosmas delivers a depth of
                service that standalone gyms, leagues, and wellness centers simply cannot match.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Core Business Areas */}
      <section className="section bg-bone">
        <div className="container">
          <Reveal>
            <div className="eyebrow on-light"><span className="dot" />Core Business Areas</div>
            <h2 className="display display-l" style={{ marginTop: 18, maxWidth: "22ch" }}>
              Four pillars. One ecosystem.
            </h2>
          </Reveal>

          <div style={{ marginTop: 64, borderTop: "1px solid var(--line)" }}>
            {pillars.map((p, i) => (
              <Reveal key={p.n} delay={i * 60}>
                <div className="grid grid-12" style={{
                  padding: "48px 0",
                  borderBottom: "1px solid var(--line)",
                  gap: 32,
                  alignItems: "center",
                }}>
                  <div style={{ gridColumn: "span 1" }}>
                    <div className="display" style={{ fontSize: 56, color: "var(--kosmas-red)", lineHeight: 0.9 }}>{p.n}</div>
                  </div>
                  <div style={{ gridColumn: "span 5" }}>
                    <h3 className="display display-m" style={{ margin: "0 0 12px" }}>{p.t}</h3>
                    <p className="body-l" style={{ color: "var(--ink-2)", margin: 0 }}>{p.d}</p>
                  </div>
                  <div style={{ gridColumn: "span 6" }}>
                    <ImgPh
                      label={p.label}
                      code={p.n + " / IMG"}
                      h={220}
                      clip="clip-tl"
                      src={p.img || undefined}
                      alt={p.t + " — " + p.label}
                    />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Purpose & Community Impact */}
      <section className="section bg-bone-2" style={{ background: "var(--bone-2)" }}>
        <div className="container">
          <div className="grid grid-12" style={{ gap: 48, alignItems: "start" }}>
            <Reveal style={{ gridColumn: "span 5" }}>
              <div className="eyebrow on-light"><span className="dot" />Purpose & Community Impact</div>
              <h2 className="display display-l" style={{ marginTop: 18 }}>
                Built with a responsibility to the communities we serve.
              </h2>
            </Reveal>
            <Reveal delay={120} style={{ gridColumn: "span 7" }}>
              <p className="lede">
                Sports and wellness are vital parts of community. They are essential to how people
                live, connect, and thrive.
              </p>
              <p className="body-l" style={{ color: "var(--ink-2)", marginTop: 20 }}>
                Kosmas's facilities, programs, and services are designed to make high-quality
                athletic experiences genuinely accessible — whether in Metro Manila or in regions
                that have long been underserved by quality sports infrastructure.
              </p>
              <p className="body-l" style={{ color: "var(--ink-2)", marginTop: 20 }}>
                Through this integrated approach, Kosmas is creating lasting value — <strong>healthier
                Filipinos, stronger communities, and a national sports culture built to endure.</strong>
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <CTAStrip go={go} />
    </main>
  );
}

function CTAStrip({ go }) {
  return (
    <section className="bg-blue" style={{ padding: "72px 0", position: "relative", overflow: "hidden" }}>
      <div aria-hidden style={{
        position: "absolute", top: 0, left: "60%", width: "60%", height: "100%",
        background: "linear-gradient(135deg, transparent 50%, rgba(214,40,40,0.45) 50%)",
      }} />
      <div className="container" style={{ position: "relative", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 32 }}>
        <div>
          <div className="eyebrow" style={{ color: "var(--kosmas-gold-soft)" }}><span className="dot" />Let's build</div>
          <h2 className="display display-m" style={{ color: "#fff", marginTop: 18, maxWidth: "22ch" }}>
            Real estate developers, operators, partners.
          </h2>
        </div>
        <a className="btn btn--red" onClick={() => go("consulting")}>
          Partner with us <span className="arrow" />
        </a>
      </div>
    </section>
  );
}

Object.assign(window, { Home, About, CTAStrip, ProjectCard, PPABanner, BuildTimeline, HeroBanner });
