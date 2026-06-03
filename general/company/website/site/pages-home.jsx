/* ============================================================
   Homepage + About page
   ============================================================ */

function Home({ go, density }) {
  return (
    <main data-screen-label="01 Home">
      {/* HERO */}
      <section className="bg-ink" style={{ position: "relative", overflow: "hidden", paddingTop: "clamp(72px, 10vw, 140px)", paddingBottom: "clamp(72px, 10vw, 140px)" }}>
        {/* angled red wedge accent */}
        <div aria-hidden style={{
          position: "absolute", top: 0, right: 0, width: "42%", height: "100%",
          background: "linear-gradient(135deg, transparent 0%, transparent 35%, rgba(214,40,40,0.18) 35%, rgba(214,40,40,0.06) 60%, transparent 60%)",
          pointerEvents: "none"
        }} />
        <div aria-hidden style={{
          position: "absolute", bottom: -2, left: 0, width: "100%", height: "1px",
          background: "linear-gradient(90deg, transparent, var(--kosmas-gold) 30%, var(--kosmas-gold) 70%, transparent)",
          opacity: 0.6
        }} />

        <div className="container" style={{ position: "relative" }}>
          <Reveal>
            <div className="eyebrow" style={{ color: "var(--kosmas-gold)" }}>
              <span className="dot" />Kosmas Athletic Ventures Co. · Manila
            </div>
          </Reveal>

          <Reveal delay={120}>
            <h1 className="display display-xl" style={{ color: "var(--bone)", marginTop: 24, marginBottom: 0 }}>
              Building the<br/>
              <span style={{ color: "var(--kosmas-red)" }}>Premier</span> Sports &<br/>
              Wellness Ecosystem<br/>
              <span style={{ color: "var(--kosmas-gold)", fontWeight: 600 }}>in the Philippines.</span>
            </h1>
          </Reveal>

          <Reveal delay={260}>
            <div className="hero-actions" style={{ display: "flex", flexWrap: "wrap", gap: "32px 64px", marginTop: 56, alignItems: "flex-end", justifyContent: "space-between" }}>
              <p className="lede" style={{ color: "rgba(255,255,255,0.78)", maxWidth: "52ch", margin: 0 }}>
                A strategic sports infrastructure and management firm. We design, activate, and operate
                the venues redefining how Filipinos live, train, and play.
              </p>
              <div className="hero-actions" style={{ display: "flex", gap: 12 }}>
                <a href="#projects" className="btn btn--red" onClick={(e) => { e.preventDefault(); go("projects"); }}>
                  See the projects <span className="arrow" />
                </a>
                <a href="#consulting" className="btn btn--ghost-light" onClick={(e) => { e.preventDefault(); go("consulting"); }}>
                  Work with us
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

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
              copy="Helios Beta — a 14-court professional-grade complex in Bridgetowne, opening soon — leads toward the 10-story, 20-court flagship arena in 2028."
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

Object.assign(window, { Home, About, CTAStrip, ProjectCard });
