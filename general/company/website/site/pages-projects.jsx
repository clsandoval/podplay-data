/* ============================================================
   Projects index, Helios, Atleta63, PodPlay
   ============================================================ */

function Projects({ go }) {
  return (
    <main data-screen-label="03 Projects">
      <section className="bg-bone" style={{ paddingTop: "clamp(72px, 9vw, 140px)", paddingBottom: "clamp(48px, 5vw, 88px)" }}>
        <div className="container">
          <Reveal>
            <div className="eyebrow on-light"><span className="dot" />Portfolio</div>
            <h1 className="display display-l" style={{ marginTop: 18, maxWidth: "18ch" }}>
              Four projects shaping <span style={{ color: "var(--kosmas-red)", fontWeight: 600 }}>Filipino sport.</span>
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="section--tight bg-bone">
        <div className="container" style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <BigProjectRow
            n="01"
            kicker="Pickleball · Opening Soon · Bridgetowne"
            title="Helios Beta"
            tag="The chic, premium face of Philippine pickleball."
            copy="A 14-court professional-grade complex in Bridgetowne — full hospitality, dedicated centre court, café and pro shop. Opening soon as the runway to the Helios flagship arena."
            label="helios beta · imagery coming soon"
            accent="var(--kosmas-red)"
            onGo={() => go("helios")}
          />
          <BigProjectRow
            n="02"
            kicker="Pickleball · Joint Venture · Robinsons Land"
            title="Helios"
            tag="A 10-story flagship arena. The future home of Philippine pickleball."
            copy="Rising at Bridgetowne in 2028 — 20 championship courts across a 10-story flagship arena, the permanent home of the Helios brand and the showcase venue for Philippine pickleball."
            label="helios flagship · concept render · bridgetowne"
            accent="var(--kosmas-red)"
            reverse
            src="assets/helios-exterior-card.jpg"
            onGo={() => go("helios")}
          />
          <BigProjectRow
            n="03"
            kicker="Football · FIFA Quality Pro"
            title="Atleta63"
            tag="The only FIFA Quality Pro pitch in the Philippines."
            copy="An all-weather, professional-grade stage at Bridgetowne that eliminates seasonal unpredictability for elite performance. Bar and recreation built into the experience."
            label="match day · atleta63"
            accent="var(--kosmas-gold)"
            src="assets/atleta63-pitch-card.jpg"
            onGo={() => go("atleta63")}
          />
          <BigProjectRow
            n="04"
            kicker="Technology · Exclusive Asian distribution"
            title="PodPlay"
            tag="The operating system of our venues."
            copy="An integrated booking and instant-replay platform — cloud reservations plus on-premises IP cameras and AI. Our primary competitive moat for the Filipino market."
            label="control room · venue ops"
            accent="var(--kosmas-blue)"
            reverse
            src="assets/podplay-venue-card.jpg"
            onGo={() => go("podplay")}
          />
        </div>
      </section>

      <CTAStrip go={go} />
    </main>
  );
}

function BigProjectRow({ n, kicker, title, tag, copy, label, accent, reverse, onGo, src }) {
  return (
    <Reveal>
      <div className="grid grid-12" style={{ gap: 32, alignItems: "stretch", padding: "48px 0", borderTop: "1px solid var(--line)" }}>
        <div style={{ gridColumn: reverse ? "span 7" : "span 5", order: reverse ? 2 : 1 }}>
          <div className="display" style={{ fontSize: 56, color: accent, lineHeight: 0.9 }}>{n}</div>
          <div className="eyebrow on-light" style={{ marginTop: 16, color: accent }}>{kicker}</div>
          <h2 className="display display-l" style={{ marginTop: 18, marginBottom: 18 }}>{title}</h2>
          <p className="lede" style={{ marginTop: 0, fontWeight: 500 }}>{tag}</p>
          <p className="body-l" style={{ color: "var(--ink-2)", marginTop: 16, maxWidth: "52ch" }}>{copy}</p>
          <a className="btn btn--blue" onClick={onGo} style={{ marginTop: 24 }}>
            Explore project <span className="arrow" />
          </a>
        </div>
        <div style={{ gridColumn: reverse ? "span 5" : "span 7", order: reverse ? 1 : 2 }}>
          <ImgPh label={label} code={n + " / IMG"} h={420} clip="clip-tl" src={src} alt={title + " — " + label} />
        </div>
      </div>
    </Reveal>
  );
}

/* ============================================================
   HELIOS — has its own sub-nav (Home, Book, Programming, Amenities, Visit, 2028)
   ============================================================ */
function Helios({ go }) {
  const [section, setSection] = useState("home");
  const [secOpen, setSecOpen] = useState(false);
  const secRef = useRef(null);
  const sections = [
    { id: "home", label: "Overview" },
    { id: "book", label: "Book a Court" },
    { id: "programming", label: "Programming" },
    { id: "amenities", label: "Amenities" },
    { id: "visit", label: "Visit" },
    { id: "2028", label: "Helios 2028" },
  ];
  useEffect(() => {
    const onClick = (e) => { if (secRef.current && !secRef.current.contains(e.target)) setSecOpen(false); };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);
  const currentSec = sections.find(s => s.id === section) || sections[0];

  return (
    <main data-screen-label="04 Helios">
      {/* Hero */}
      <section className="bg-ink-deep" style={{ position: "relative", paddingTop: "clamp(72px, 8vw, 120px)", paddingBottom: 0 }}>
        {/* Decorative backdrop — clipped to the hero bounds */}
        <div aria-hidden style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
          {/* Flat brand backdrop — Beta photography pending; flagship renders intentionally
              not used here to avoid conflating Beta (14 courts) with the 2028 flagship */}
          <div aria-hidden style={{
            position: "absolute", inset: 0,
            background:
              "linear-gradient(180deg, rgba(10,18,28,0.55) 0%, rgba(10,18,28,0.75) 55%, rgba(10,18,28,0.95) 100%)," +
              "linear-gradient(90deg, rgba(10,18,28,0.85) 0%, rgba(10,18,28,0.25) 60%, rgba(10,18,28,0.55) 100%)",
          }} />
          <div aria-hidden style={{
            position: "absolute", top: 0, right: -100, width: 600, height: 600,
            background: "radial-gradient(circle, rgba(214,40,40,0.28) 0%, transparent 60%)",
            pointerEvents: "none"
          }} />
        </div>
        <div className="container" style={{ position: "relative" }}>
          <Reveal>
            <div className="eyebrow" style={{ color: "var(--kosmas-gold)" }}>
              <span className="dot" />Helios Beta · Bridgetowne, Pasig · Opening Soon
            </div>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="display display-xl" style={{ color: "var(--bone)", marginTop: 24, marginBottom: 24 }}>
              Elevated <span style={{ color: "var(--kosmas-red)" }}>Pickleball.</span><br/>
              Grounded in <span style={{ color: "var(--kosmas-gold)", fontWeight: 600 }}>Bridgetowne.</span>
            </h1>
          </Reveal>
          <Reveal delay={180}>
            <p className="lede" style={{ color: "rgba(255,255,255,0.78)", maxWidth: "60ch", marginBottom: 56 }}>
              Helios Beta — a 14-court professional-grade complex designed for the full athlete
              lifecycle, from high-intensity competitive play to social recovery. Opening soon,
              ahead of the 10-story Helios flagship arena in 2028. The Gold Standard of Play.
            </p>
            <div className="hero-actions helios-section-bar" style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 56, alignItems: "center" }}>
              <a className="btn btn--red" onClick={() => setSection("2028")}>
                Get notified <span className="arrow" />
              </a>

              {/* Section selector dropdown — replaces the sub-tab strip */}
              <div ref={secRef} style={{ position: "relative" }}>
                <button
                  type="button"
                  onClick={() => setSecOpen(o => !o)}
                  aria-haspopup="listbox"
                  aria-expanded={secOpen}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 14,
                    padding: "14px 22px",
                    fontFamily: "var(--font-display)",
                    fontWeight: 600,
                    fontSize: 13,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    background: "transparent",
                    color: "var(--bone)",
                    border: "1.5px solid rgba(255,255,255,0.4)",
                    cursor: "pointer",
                    transition: "background 0.15s ease, border-color 0.15s ease",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.borderColor = "var(--bone)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)"; }}>
                  <span style={{ color: "rgba(255,255,255,0.6)", fontWeight: 400 }}>Section:</span>
                  <span>{currentSec.label}</span>
                  <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden style={{ transform: secOpen ? "rotate(180deg)" : "none", transition: "transform 0.18s ease" }}>
                    <path d="M2 4 L6 8 L10 4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
                  </svg>
                </button>
                {secOpen && (
                  <ul role="listbox" style={{
                    position: "absolute",
                    top: "calc(100% + 6px)",
                    left: 0,
                    minWidth: 240,
                    margin: 0, padding: 0,
                    listStyle: "none",
                    background: "var(--kosmas-blue-ink)",
                    border: "1px solid var(--line-dark)",
                    boxShadow: "0 24px 48px -8px rgba(0,0,0,0.5)",
                    zIndex: 20,
                  }}>
                    {sections.map((s, i) => {
                      const selected = s.id === section;
                      return (
                        <li key={s.id} role="option" aria-selected={selected}>
                          <button
                            type="button"
                            onClick={() => { setSection(s.id); setSecOpen(false); }}
                            style={{
                              width: "100%",
                              textAlign: "left",
                              padding: "14px 22px",
                              fontFamily: "var(--font-display)",
                              fontWeight: 600,
                              fontSize: 13,
                              letterSpacing: "0.12em",
                              textTransform: "uppercase",
                              color: selected ? "var(--kosmas-red)" : "rgba(255,255,255,0.9)",
                              background: "transparent",
                              cursor: "pointer",
                              borderTop: i === 0 ? "none" : "1px solid var(--line-dark)",
                              display: "flex",
                              alignItems: "center",
                              gap: 12,
                            }}
                            onMouseEnter={(e) => { if (!selected) e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}
                            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}>
                            {s.label}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Section content */}
      {section === "home" && <HeliosOverview />}
      {section === "book" && <HeliosBook />}
      {section === "programming" && <HeliosProgramming />}
      {section === "amenities" && <HeliosAmenities />}
      {section === "visit" && <HeliosVisit />}
      {section === "2028" && <Helios2028 />}

      <CTAStrip go={go} />
    </main>
  );
}

function HeliosOverview() {
  return (
    <>
      <section className="section bg-bone">
        <div className="container">
          <div className="grid grid-4" style={{ gap: 24, marginBottom: 80 }}>
            {[
              { v: "14", l: "Pro courts" },
              { v: "1", l: "Dedicated centre court" },
              { v: "24/7", l: "PodPlay booking" },
              { v: "Full", l: "Hospitality" },
            ].map(s => (
              <div key={s.l} style={{ padding: "28px 0", borderTop: "2px solid var(--ink)" }}>
                <div className="display" style={{ fontSize: "clamp(48px, 5vw, 88px)", color: "var(--ink)", lineHeight: 0.9 }}>{s.v}</div>
                <div className="eyebrow on-light" style={{ marginTop: 12, color: "var(--ink-2)" }}>{s.l}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-12" style={{ gap: 32, alignItems: "start" }}>
            <Reveal style={{ gridColumn: "span 5" }}>
              <div className="eyebrow on-light"><span className="dot" />The Concept</div>
              <h2 className="display display-l" style={{ marginTop: 18 }}>
                A high-energy social and athletic hub.
              </h2>
            </Reveal>
            <Reveal delay={120} style={{ gridColumn: "span 7" }}>
              <p className="lede">
                Unlike a standard pop-up, Helios Beta offers full-service hospitality —
                a dedicated centre court, premium restrooms and showers, a lounge area, café,
                and pro shop. Designed for the player, the spectator, and everything in between.
              </p>
              <p className="body-l" style={{ marginTop: 16, color: "var(--ink-2)" }}>
                Helios Beta is built to establish a dominant market presence and cultivate
                high-value brand equity ahead of the Helios flagship arena launch in 2028.
              </p>
            </Reveal>
          </div>

          <div className="grid grid-12" style={{ gap: 24, marginTop: 80 }}>
            {/* Beta photography pending — flagship renders removed to avoid scale confusion */}
            <ImgPh
              label="helios beta · centre court · imagery coming soon"
              code="BETA / SOON"
              h={520}
              style={{ gridColumn: "span 8" }}
              clip="clip-tl"
            />
            <div style={{ gridColumn: "span 4", display: "flex", flexDirection: "column", gap: 24 }}>
              <ImgPh label="lounge area · coming soon" code="LNG" h={248} clip="clip-tl" />
              <ImgPh label="café · coming soon" code="CAF" h={248} clip="clip-tl" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function HeliosBook() {
  return (
    <section className="section bg-bone">
      <div className="container">
        <div className="grid grid-12" style={{ gap: 48 }}>
          <Reveal style={{ gridColumn: "span 5" }}>
            <div className="eyebrow on-light"><span className="dot" />Book a Court</div>
            <h2 className="display display-l" style={{ marginTop: 18 }}>
              Frictionless<br/>Play.
            </h2>
            <p className="lede" style={{ marginTop: 24 }}>
              Secure your court in seconds. From corporate networking to tournament-level training,
              book your spot at the center of the action.
            </p>
            <div className="body-m" style={{ marginTop: 32, padding: 24, background: "var(--bone-2)", borderLeft: "3px solid var(--kosmas-red)" }}>
              <div className="eyebrow on-light" style={{ color: "var(--kosmas-red)", display: "flex", alignItems: "center", gap: 10 }}>
                <span>Powered by</span>
                <img src="assets/podplay-logo.png" alt="PodPlay" style={{ height: 16, width: "auto", display: "block", transform: "translateY(-1px)" }} />
              </div>
              <p style={{ margin: "8px 0 0" }}>Cloud-based reservations, on-premises IP cameras, AI-powered instant replay.</p>
            </div>
          </Reveal>

          {/* PodPlay embed placeholder */}
          <div style={{ gridColumn: "span 7" }}>
            <div className="helios-schedule-scroll">
            <div className="clip-tl" style={{
              background: "#fff",
              border: "1px solid var(--line)",
              padding: 24,
              minHeight: 540,
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: 16, borderBottom: "1px solid var(--line)" }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <img src="assets/podplay-logo.png" alt="PodPlay" style={{ height: 18, width: "auto", display: "block" }} />
                    <span className="eyebrow on-light" style={{ color: "var(--ink-2)" }}>· Bridgetowne</span>
                  </div>
                  <div className="display display-s" style={{ marginTop: 6 }}>Select a court & time</div>
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <button style={{ padding: "8px 14px", border: "1px solid var(--line)", fontFamily: "var(--font-mono)", fontSize: 12 }}>{"<"}</button>
                  <button style={{ padding: "8px 14px", border: "1px solid var(--line)", fontFamily: "var(--font-mono)", fontSize: 12 }}>{"Today"}</button>
                  <button style={{ padding: "8px 14px", border: "1px solid var(--line)", fontFamily: "var(--font-mono)", fontSize: 12 }}>{">"}</button>
                </div>
              </div>

              {/* schedule grid */}
              <div style={{ marginTop: 20, display: "grid", gridTemplateColumns: "60px repeat(8, 1fr)", gap: 4, fontFamily: "var(--font-mono)", fontSize: 11 }}>
                <div></div>
                {["7AM","9AM","11AM","1PM","3PM","5PM","7PM","9PM"].map(t => (
                  <div key={t} style={{ textAlign: "center", padding: "6px 0", color: "var(--ink-2)" }}>{t}</div>
                ))}
                {["Court 01","Court 02","Centre","Court 04","Court 05","Court 06"].map((c, ri) => (
                  <React.Fragment key={c}>
                    <div style={{ padding: "10px 0", color: "var(--ink-2)", textTransform: "uppercase", letterSpacing: "0.1em" }}>{c}</div>
                    {Array.from({ length: 8 }).map((_, ci) => {
                      const seed = (ri * 7 + ci * 3) % 5;
                      const booked = seed === 0;
                      const yours  = ri === 2 && ci === 4;
                      return (
                        <div key={ci} style={{
                          height: 32,
                          background: yours ? "var(--kosmas-red)" : booked ? "var(--bone-2)" : "var(--paper)",
                          border: "1px solid " + (yours ? "var(--kosmas-red)" : "var(--line)"),
                          color: yours ? "#fff" : "transparent",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          cursor: booked ? "not-allowed" : "pointer",
                          fontSize: 10, letterSpacing: "0.1em",
                        }}>
                          {yours ? "YOU" : booked ? "" : ""}
                        </div>
                      );
                    })}
                  </React.Fragment>
                ))}
              </div>

              <div style={{ marginTop: 24, padding: 20, background: "var(--paper)", border: "1px solid var(--line)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
                <div>
                  <div className="eyebrow on-light" style={{ color: "var(--kosmas-blue)" }}>Selected</div>
                  <div className="body-l" style={{ marginTop: 4, fontWeight: 600 }}>Centre Court · Wed · 3:00–4:30 PM</div>
                  <div className="body-s" style={{ color: "var(--ink-2)", marginTop: 4 }}>Rates pending · introductory pricing applies</div>
                </div>
                <a className="btn btn--red">Reserve <span className="arrow" /></a>
              </div>

              <div style={{ marginTop: 16, fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.1em", color: "var(--ink-2)", textTransform: "uppercase" }}>
                ▸ PodPlay widget · production embed pending
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HeliosProgramming() {
  const tiers = [
    { t: "Open Play",  s: "Drop-in",   d: "Social drop-in sessions organized by skill and DUPR levels. Show up, get matched, play.", color: "var(--kosmas-blue)" },
    { t: "Lessons",    s: "1:1 / Semi", d: "Direct booking for private coaching, semi-privates, and beginner clinics with certified pros.", color: "var(--kosmas-red)" },
    { t: "Leagues",    s: "Competitive", d: "Competitive ladders, DUPR-rated tournaments, and the Helios Cup series.", color: "var(--kosmas-gold)" },
  ];
  return (
    <section className="section bg-bone">
      <div className="container">
        <Reveal>
          <div className="eyebrow on-light"><span className="dot" />Programming</div>
          <h2 className="display display-l" style={{ marginTop: 18, maxWidth: "20ch" }}>
            For every player.<br/>Every level.
          </h2>
        </Reveal>
        <div className="grid grid-3" style={{ marginTop: 64, gap: 24 }}>
          {tiers.map((t, i) => (
            <Reveal key={t.t} delay={i * 80}>
              <div style={{
                padding: 32,
                background: "#fff",
                border: "1px solid var(--line)",
                height: "100%",
                display: "flex", flexDirection: "column",
                minHeight: 360,
              }} className="clip-tl">
                <div className="eyebrow on-light" style={{ color: t.color }}>{t.s}</div>
                <h3 className="display display-l" style={{ margin: "16px 0 16px", fontSize: "clamp(40px, 4vw, 64px)" }}>{t.t}</h3>
                <p className="body-l" style={{ margin: 0, color: "var(--ink-2)", flex: 1 }}>{t.d}</p>
                <div style={{ marginTop: 32, paddingTop: 20, borderTop: "1px solid var(--line)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span className="eyebrow on-light" style={{ color: "var(--ink-2)" }}>Schedule</span>
                  <span className="arrow" style={{ color: t.color }} />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function HeliosAmenities() {
  const items = [
    /* Beta photography pending — flagship renders removed to avoid scale confusion */
    { t: "The Café",          d: "Locally-sourced fuel for athletes and spectators alike.", l: "café · coming soon" },
    { t: "The Pro Shop",      d: "Paddles, apparel, and on-court essentials — curated.",     l: "pro shop · coming soon" },
    { t: "The Lounge",        d: "Premium social area for between-match recovery.",          l: "lounge · coming soon" },
    { t: "Wellness & Recovery", d: "Showers, recovery zone, and post-match programming.",     l: "wellness · coming soon" },
  ];
  return (
    <section className="section bg-bone">
      <div className="container">
        <Reveal>
          <div className="eyebrow on-light"><span className="dot" />Amenities</div>
          <h2 className="display display-l" style={{ marginTop: 18, maxWidth: "22ch" }}>
            More than a court. A clubhouse.
          </h2>
        </Reveal>
        <div className="grid grid-2" style={{ marginTop: 64, gap: 32 }}>
          {items.map((it, i) => (
            <Reveal key={it.t} delay={i * 60}>
              <ImgPh label={it.l} code={"AM/0" + (i+1)} h={300} clip="clip-tl" src={it.src} alt={it.t + " — " + it.l} />
              <h3 className="display display-m" style={{ marginTop: 24, marginBottom: 8 }}>{it.t}</h3>
              <p className="body-l" style={{ color: "var(--ink-2)", margin: 0 }}>{it.d}</p>
              <div className="body-s" style={{ marginTop: 8, fontFamily: "var(--font-mono)", color: "var(--ink-2)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                ▸ Information to follow
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function HeliosVisit() {
  return (
    <section className="section bg-bone">
      <div className="container">
        <div className="grid grid-12" style={{ gap: 48, alignItems: "start" }}>
          <Reveal style={{ gridColumn: "span 5" }}>
            <div className="eyebrow on-light"><span className="dot" />Visit Helios</div>
            <h2 className="display display-l" style={{ marginTop: 18 }}>
              Bridgetowne,<br/>Pasig.
            </h2>
            <div style={{ marginTop: 32, display: "flex", flexDirection: "column", gap: 24 }}>
              <InfoRow k="Location"       v="Bridgetowne · Pasig City, Metro Manila" />
              <InfoRow k="Hours"          v="Information to follow" mono />
              <InfoRow k="Parking"        v="Information to follow" mono />
              <InfoRow k="Contact"        v="hello@helios.ph" />
              <InfoRow k="Inquiries"      v="Corporate / private events" />
            </div>
            <a className="btn btn--blue" style={{ marginTop: 32 }}>
              Send an inquiry <span className="arrow" />
            </a>
          </Reveal>

          <div style={{ gridColumn: "span 7" }}>
            <div className="imgph clip-tl" style={{ height: 540, position: "relative" }}>
              {/* mock map */}
              <div aria-hidden style={{
                position: "absolute", inset: 0,
                background:
                  "linear-gradient(45deg, transparent 49.5%, rgba(0,84,144,0.10) 49.5%, rgba(0,84,144,0.10) 50.5%, transparent 50.5%)," +
                  "linear-gradient(135deg, transparent 49.5%, rgba(0,84,144,0.10) 49.5%, rgba(0,84,144,0.10) 50.5%, transparent 50.5%)," +
                  "var(--bone-2)",
                backgroundSize: "60px 60px"
              }} />
              <div style={{
                position: "absolute", left: "52%", top: "44%",
                transform: "translate(-50%, -100%)",
                display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
              }}>
                <div style={{ background: "var(--kosmas-red)", color: "#fff", padding: "8px 12px", fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                  HELIOS · Bridgetowne
                </div>
                <div style={{ width: 0, height: 0, borderLeft: "8px solid transparent", borderRight: "8px solid transparent", borderTop: "10px solid var(--kosmas-red)" }} />
              </div>
              <span className="imgph__corner">MAP / INTERACTIVE</span>
              <span className="imgph__label">map · pinned to facility entrance</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoRow({ k, v, mono }) {
  return (
    <div className="info-row" style={{ display: "grid", gridTemplateColumns: "120px 1fr", gap: 24, padding: "12px 0", borderBottom: "1px solid var(--line)" }}>
      <div className="eyebrow on-light" style={{ color: "var(--kosmas-gold)" }}>{k}</div>
      <div className={mono ? "body-m" : "body-l"} style={mono ? { fontFamily: "var(--font-mono)", color: "var(--ink-2)" } : {}}>{v}</div>
    </div>
  );
}

function Helios2028() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  return (
    <section className="bg-ink-deep" style={{ paddingTop: "clamp(72px, 9vw, 140px)", paddingBottom: "clamp(72px, 9vw, 140px)", position: "relative", overflow: "hidden" }}>
      <div aria-hidden style={{
        position: "absolute", top: -100, right: -100, width: 700, height: 700,
        background: "radial-gradient(circle, rgba(184,146,79,0.18) 0%, transparent 60%)",
      }} />
      <div className="container" style={{ position: "relative" }}>
        <div className="grid grid-12" style={{ gap: 48, alignItems: "center" }}>
          <Reveal style={{ gridColumn: "span 7" }}>
            <div className="eyebrow" style={{ color: "var(--kosmas-gold)" }}><span className="dot" />Helios 2028 · Flagship Arena</div>
            <h2 className="display display-xl" style={{ color: "var(--bone)", marginTop: 24, marginBottom: 24 }}>
              The Future is<br/>
              <span style={{ color: "var(--kosmas-red)" }}>10 Stories</span> High.
            </h2>
            <p className="lede" style={{ color: "rgba(255,255,255,0.78)", maxWidth: "52ch" }}>
              Helios Beta is just the beginning. The flagship Helios arena — 20 championship
              courts across 10 stories at Bridgetowne, in joint venture with Robinsons Land —
              arrives in 2028. Be the first to receive exclusive updates and founding
              membership access.
            </p>
          </Reveal>
          <Reveal delay={120} style={{ gridColumn: "span 5" }}>
            <div className="clip-tl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid var(--line-dark)", padding: 32 }}>
              {!submitted ? (
                <>
                  <div className="eyebrow" style={{ color: "var(--kosmas-gold)" }}>Founding Members List</div>
                  <h3 className="display display-m" style={{ color: "var(--bone)", marginTop: 12, marginBottom: 24 }}>
                    Get exclusive updates.
                  </h3>
                  <form onSubmit={(e) => { e.preventDefault(); if (email) setSubmitted(true); }}>
                    <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      style={{
                        width: "100%", padding: "16px 18px",
                        background: "rgba(0,0,0,0.25)", color: "var(--bone)",
                        border: "1px solid var(--line-dark)",
                        fontFamily: "var(--font-mono)", fontSize: 14,
                        outline: "none",
                      }}
                      onFocus={(e) => e.target.style.borderColor = "var(--kosmas-gold)"}
                      onBlur={(e) => e.target.style.borderColor = "var(--line-dark)"}
                    />
                    <button type="submit" className="btn btn--red" style={{ width: "100%", marginTop: 12, justifyContent: "center" }}>
                      Reserve my spot <span className="arrow" />
                    </button>
                  </form>
                  <p className="body-s" style={{ marginTop: 16, color: "rgba(255,255,255,0.55)", margin: "16px 0 0" }}>
                    Founding members receive priority access, charter rates, and naming consideration.
                  </p>
                </>
              ) : (
                <div>
                  <div className="eyebrow" style={{ color: "var(--kosmas-gold)" }}>✓ You're on the list</div>
                  <h3 className="display display-m" style={{ color: "var(--bone)", marginTop: 12 }}>See you in 2028.</h3>
                  <p className="body-m" style={{ color: "rgba(255,255,255,0.7)", marginTop: 16 }}>
                    We'll be in touch from <span style={{ color: "var(--bone)", fontFamily: "var(--font-mono)" }}>founding@helios.ph</span>.
                  </p>
                </div>
              )}
            </div>
          </Reveal>
        </div>

        <div style={{ marginTop: 80 }}>
          <ImgPh
            src="assets/helios-exterior.jpg"
            alt="Helios flagship arena exterior render — Bridgetowne"
            label="helios flagship · exterior render · bridgetowne"
            code="2028 / RENDER"
            dark
            h={560}
            clip="clip-tl"
          />
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   ATLETA63
   ============================================================ */
function Atleta63({ go }) {
  return (
    <main data-screen-label="05 Atleta63">
      <section className="bg-ink-deep" style={{ paddingTop: "clamp(72px, 9vw, 140px)", paddingBottom: "clamp(48px, 6vw, 96px)", position: "relative", overflow: "hidden" }}>
        {/* Pitch render — atmospheric backdrop */}
        <div aria-hidden style={{
          position: "absolute", inset: 0,
          backgroundImage: 'url("assets/atleta63-pitch.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center 40%",
          opacity: 0.45,
          filter: "saturate(0.9) contrast(1.05)",
        }} />
        <div aria-hidden style={{
          position: "absolute", inset: 0,
          background:
            "linear-gradient(180deg, rgba(10,18,28,0.55) 0%, rgba(10,18,28,0.72) 55%, rgba(10,18,28,0.95) 100%)," +
            "linear-gradient(90deg, rgba(10,18,28,0.85) 0%, rgba(10,18,28,0.25) 60%, rgba(10,18,28,0.5) 100%)",
        }} />
        <div aria-hidden style={{
          position: "absolute", top: 0, left: 0, width: "100%", height: 4,
          background: "linear-gradient(90deg, var(--kosmas-gold) 0%, var(--kosmas-red) 50%, var(--kosmas-blue) 100%)",
        }} />
        <div className="container">
          <Reveal>
            <div className="eyebrow" style={{ color: "var(--kosmas-gold)" }}><span className="dot" />Atleta63 · Football · Bridgetowne</div>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="display display-xl" style={{ color: "var(--bone)", marginTop: 24 }}>
              The pinnacle of<br/>
              <span style={{ color: "var(--kosmas-gold)", fontWeight: 600 }}>football</span> in the<br/>
              Philippines.
            </h1>
          </Reveal>
          <Reveal delay={180}>
            <p className="lede" style={{ color: "rgba(255,255,255,0.78)", maxWidth: "60ch", marginTop: 32 }}>
              The only FIFA Quality Pro-rated pitch in the country. An all-weather, professional-grade stage
              that eliminates seasonal unpredictability for elite performance.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section--tight bg-bone">
        <div className="container">
          <div className="grid grid-3" style={{ borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>
            {[
              { v: "FIFA", l: "Quality Pro Rated", c: "var(--kosmas-gold)" },
              { v: "All-Weather", l: "Professional turf system", c: "var(--ink)" },
              { v: "Bridgetowne", l: "Pasig · Metro Manila", c: "var(--kosmas-blue)" },
            ].map((s, i) => (
              <div key={s.l} style={{ padding: "40px 24px", borderRight: i < 2 ? "1px solid var(--line)" : "none" }}>
                <div className="display" style={{ fontSize: "clamp(36px, 3.5vw, 56px)", color: s.c, lineHeight: 0.95 }}>{s.v}</div>
                <div className="eyebrow on-light" style={{ marginTop: 14, color: "var(--ink-2)" }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-bone">
        <div className="container">
          <div className="grid grid-12" style={{ gap: 48 }}>
            <Reveal style={{ gridColumn: "span 5" }}>
              <div className="eyebrow on-light"><span className="dot" />The Pitch</div>
              <h2 className="display display-l" style={{ marginTop: 18 }}>Engineered for elite play.</h2>
              <p className="lede" style={{ marginTop: 24 }}>
                Located at Bridgetowne, the FIFA Quality Pro rating means every metric — surface,
                bounce, traction, energy return — meets the benchmarks used at international level.
              </p>
              <p className="body-l" style={{ color: "var(--ink-2)", marginTop: 16 }}>
                For academies, clubs, and corporate leagues, Atleta63 offers a dependable
                professional-grade environment where weather is no longer a variable.
              </p>
            </Reveal>
            <ImgPh src="assets/atleta63-pitch.jpg" alt="Atleta63 — FIFA Quality Pro pitch at Bridgetowne" h={520} clip="clip-tl" style={{ gridColumn: "span 7" }} />
          </div>
        </div>
      </section>

      <section className="section bg-blue-deep">
        <div className="container">
          <Reveal>
            <div className="eyebrow" style={{ color: "var(--kosmas-gold)" }}><span className="dot" />Bar & Recreation</div>
            <h2 className="display display-l" style={{ color: "var(--bone)", marginTop: 18, maxWidth: "20ch" }}>
              The full athlete and community experience.
            </h2>
          </Reveal>
          <div className="grid grid-3" style={{ marginTop: 56, gap: 24 }}>
            {[
              { t: "The Bar",         d: "Post-match, pre-match, no-match. The clubhouse extension." },
              { t: "Recreation",      d: "Social pitches, viewing decks, and event-ready spaces." },
              { t: "Programming",     d: "Academies, clinics, leagues, corporate tournaments." },
            ].map((c, i) => (
              <Reveal key={c.t} delay={i * 80}>
                <div className="clip-tl" style={{ padding: 32, background: "rgba(255,255,255,0.05)", border: "1px solid var(--line-dark)" }}>
                  <h3 className="display display-m" style={{ color: "var(--bone)", margin: "0 0 16px" }}>{c.t}</h3>
                  <p className="body-m" style={{ color: "rgba(255,255,255,0.72)", margin: 0 }}>{c.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="body-m" style={{ marginTop: 40, color: "rgba(255,255,255,0.55)", fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
            ▸ For inquiries, direct to Tito Eric
          </p>
        </div>
      </section>

      <CTAStrip go={go} />
    </main>
  );
}

/* ============================================================
   PODPLAY
   ============================================================ */
function PodPlay({ go }) {
  return (
    <main data-screen-label="06 PodPlay">
      <section className="bg-ink" style={{ paddingTop: "clamp(72px, 9vw, 140px)", paddingBottom: "clamp(48px, 6vw, 96px)", position: "relative", overflow: "hidden" }}>
        {/* Venue render — atmospheric backdrop */}
        <div aria-hidden style={{
          position: "absolute", inset: 0,
          backgroundImage: 'url("assets/podplay-venue.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center center",
          opacity: 0.38,
          filter: "saturate(0.9) contrast(1.05)",
        }} />
        <div aria-hidden style={{
          position: "absolute", inset: 0,
          background:
            "linear-gradient(180deg, rgba(10,18,28,0.55) 0%, rgba(10,18,28,0.78) 55%, rgba(10,18,28,0.95) 100%)," +
            "linear-gradient(90deg, rgba(10,18,28,0.88) 0%, rgba(10,18,28,0.30) 55%, rgba(10,18,28,0.6) 100%)",
        }} />
        <div aria-hidden style={{
          position: "absolute", top: 0, right: -100, width: 600, height: 600,
          background: "radial-gradient(circle, rgba(0,107,168,0.22) 0%, transparent 60%)",
          pointerEvents: "none"
        }} />
        <div aria-hidden style={{
          position: "absolute", inset: 0,
          background:
            "repeating-linear-gradient(0deg, transparent 0, transparent 40px, rgba(255,255,255,0.025) 40px, rgba(255,255,255,0.025) 41px)," +
            "repeating-linear-gradient(90deg, transparent 0, transparent 40px, rgba(255,255,255,0.025) 40px, rgba(255,255,255,0.025) 41px)",
          pointerEvents: "none",
        }} />
        <div className="container" style={{ position: "relative" }}>
          <Reveal>
            <img
              src="assets/podplay-logo-light.png"
              alt="PodPlay"
              style={{ height: "clamp(48px, 5.5vw, 88px)", width: "auto", display: "block", marginBottom: 28 }}
            />
            <div className="eyebrow" style={{ color: "var(--kosmas-gold)" }}><span className="dot" />Exclusive Distribution · SE Asia</div>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="display display-xl" style={{ color: "var(--bone)", marginTop: 24 }}>
              The operating system<br/>
              for <span style={{ color: "var(--kosmas-red)" }}>professional-grade</span><br/>
              venues.
            </h1>
          </Reveal>
          <Reveal delay={180}>
            <p className="lede" style={{ color: "rgba(255,255,255,0.78)", maxWidth: "60ch", marginTop: 32 }}>
              Cloud-based reservations meet on-premises hardware — IP cameras and AI — to deliver
              professional venue technology to the Filipino market. KAVC's primary competitive moat.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section bg-bone">
        <div className="container">
          <Reveal>
            <div className="eyebrow on-light"><span className="dot" />The Stack</div>
            <h2 className="display display-l" style={{ marginTop: 18, maxWidth: "20ch" }}>
              Booking, replay, ops — one system.
            </h2>
          </Reveal>
          <div className="grid grid-3" style={{ marginTop: 64, gap: 24 }}>
            {[
              { n: "01", t: "Cloud Booking",    d: "Instant reservations, smart scheduling, dynamic pricing — across every court and pitch in the network.", c: "var(--kosmas-blue)" },
              { n: "02", t: "AI Instant Replay", d: "On-premises IP cameras paired with AI deliver broadcast-grade replays of every play, instantly.", c: "var(--kosmas-red)" },
              { n: "03", t: "Venue Analytics",   d: "Operator dashboards turn usage into actionable signal — utilization, revenue, retention.", c: "var(--kosmas-gold)" },
            ].map((p, i) => (
              <Reveal key={p.n} delay={i * 80}>
                <div className="clip-tl" style={{ background: "#fff", border: "1px solid var(--line)", padding: 32, height: "100%" }}>
                  <div className="display" style={{ fontSize: 48, color: p.c, lineHeight: 0.9 }}>{p.n}</div>
                  <h3 className="display display-m" style={{ marginTop: 16, marginBottom: 12 }}>{p.t}</h3>
                  <p className="body-l" style={{ color: "var(--ink-2)", margin: 0 }}>{p.d}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <div style={{ marginTop: 80 }}>
            <ImgPh
              src="assets/podplay-venue.jpg"
              alt="PodPlay venue — scan-to-enter kiosk, automated entry, AI instant-replay cameras and courtside LED wall"
              label="kiosk · auto-entry · ai cameras · replay wall"
              code="VENUE / LIVE"
              h={560}
              clip="clip-tl"
            />
          </div>
        </div>
      </section>

      <section className="bg-ink" style={{ padding: "72px 0" }}>
        <div className="container">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 24 }}>
            <div>
              <div className="eyebrow" style={{ color: "var(--kosmas-gold)" }}><span className="dot" />The Moat</div>
              <h2 className="display display-l" style={{ color: "var(--bone)", marginTop: 18, maxWidth: "22ch" }}>
                Exclusive distribution rights across Southeast Asia.
              </h2>
            </div>
            <a className="btn btn--red" onClick={() => go("consulting")}>
              Partner with us <span className="arrow" />
            </a>
          </div>
        </div>
      </section>

      <CTAStrip go={go} />
    </main>
  );
}

Object.assign(window, { Projects, Helios, Atleta63, PodPlay });
