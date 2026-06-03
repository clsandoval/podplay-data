/* ============================================================
   Consulting (Work With Us) + Contact
   ============================================================ */

/* ---------- Audience-specific content (Sophia's edited copy) ---------- */
const AUDIENCES = {
  mall: {
    key: "mall",
    label: "Mall Operators",
    img: "assets/consulting-mall-hero.jpg",
    eyebrow: "For Shopping Mall Operators",
    headline: <>The sports & wellness partner that turns your mall into a <span style={{ color: "var(--kosmas-gold)", fontWeight: 600 }}>destination.</span></>,
    lede: "A strategic operating partner for mall operators looking to stay ahead of where consumer behavior is heading.",
    intro: "As shoppers increasingly seek experiences over transactions, Kosmas provides the sports, wellness, and recreational programming that anchors foot traffic, extends dwell time, and gives people a reason to visit more than once a week. We specialize in building and operating active lifestyle environments that complement retail ecosystems and strengthen a mall's position as a true community destination.",
    bringsTitle: "What Kosmas does for malls",
    brings: "Kosmas helps mall operators move beyond traditional retail by introducing high-energy, high-frequency sports and wellness experiences that draw in families, young professionals, fitness communities, and organized sports groups. These are not one-time events — they are recurring programs that fill calendars, activate spaces on weekday mornings and weekend afternoons alike, and create the kind of consistent foot traffic that benefits every tenant in the building.",
    capabilities: [
      {
        n: "01",
        t: "Sports & Wellness Facility Development",
        d: "Indoor courts, multi-sport zones, boutique fitness spaces, wellness lounges, and recreational areas that fit within existing mall layouts. Vacant anchor spaces, underperforming upper floors, open parking structures, and newly developed wings all become candidates for transformation.",
        label: "indoor court · mall anchor conversion",
      },
      {
        n: "02",
        t: "Professional Facility Management",
        d: "Gyms, spas, and wellness centers operated with a focus on operational efficiency, customer experience, and membership retention. A dependable long-term tenant that brings its own loyal customer base and runs professionally without constant oversight.",
        label: "wellness · gym floor · member lounge",
      },
      {
        n: "03",
        t: "Sports Leagues & Event Programming",
        d: "Competitive leagues and tournaments across basketball, volleyball, pickleball, indoor football, and other high-demand sports. Teams, families, and spectators show up on a regular schedule — a game night drives dinner; a Saturday tournament fills a food court.",
        label: "tournament · league · spectators",
      },
      {
        n: "04",
        t: "Athletic Rehabilitation & Performance",
        d: "Physiotherapy, sports medicine, and performance training integrated into the facility. A steady, recurring clientele and a health-oriented tenant mix that aligns with growing consumer appetite for wellness and recovery.",
        label: "physio · recovery · performance",
      },
    ],
    closeTitle: "The case for partnership",
    closeBody: [
      "Mall operators who bring in Kosmas gain a tenant that does something most tenants cannot: it generates foot traffic for everyone else. Kosmas-operated facilities create habitual visitation, build a core customer base, and give a mall a clear identity as a place built around how people actually want to live today.",
      "In a market where online shopping continues to grow, the malls that win will be the ones that give people something worth leaving home for. Kosmas Athletic Ventures Corporation is built to be exactly that.",
    ],
  },
  developer: {
    key: "developer",
    label: "Property Developers",
    img: "assets/consulting-developer-hero.jpg",
    eyebrow: "For Real Estate Developers",
    headline: <>The active lifestyle partner built for <span style={{ color: "var(--kosmas-red)", fontWeight: 600 }}>real estate development.</span></>,
    lede: "A specialized operating partner for developers looking to strengthen property value, drive sustained foot traffic, and build communities that people genuinely want to live, work, and spend time in.",
    intro: "We develop, manage, and program world-class sports, wellness, and recreational facilities purpose-built to function as commercial anchors within residential, mixed-use, and township developments. The premise is straightforward: active lifestyle facilities have moved well beyond the category of amenities. Today, they are among the most powerful drivers of tenant attraction, community retention, and long-term commercial performance.",
    bringsTitle: "What Kosmas brings to a development",
    brings: "Kosmas enters a project as a turnkey partner — handling everything from facility design and construction to day-to-day operations and community programming. Developers gain a proven operator that converts open lots, underutilized commercial zones, and designated amenity spaces into revenue-generating destinations that keep people coming back. The result is a development that does not just look good on a brochure — it performs.",
    capabilities: [
      {
        n: "01",
        t: "Sports & Wellness Facility Development",
        d: "Multi-sport complexes, fitness centers, wellness hubs, and recreational environments tailored to the profile of each development — residential, commercial, or mixed-use. Standalone anchors or integrated components of a larger masterplan.",
        label: "masterplan · mixed-use anchor",
      },
      {
        n: "02",
        t: "Professional Facility Management",
        d: "Gyms, spas, wellness centers, and sports amenities operated with sharp focus on efficiency, member retention, and premium service. Developers hand off operational complexity and benefit from consistent quality, safety compliance, and a facility that reflects well on the property.",
        label: "operations · concierge · service",
      },
      {
        n: "03",
        t: "Sports Leagues & Community Activation",
        d: "Competitive leagues and events across basketball, volleyball, pickleball, football, and other high-demand sports. Year-round activation that generates organic foot traffic and the kind of community identity that translates directly into tenant satisfaction.",
        label: "community league · activation",
      },
      {
        n: "04",
        t: "Athletic Rehabilitation & Performance",
        d: "Physiotherapy, sports medicine, and performance enhancement integrated into the facility. A health-driven dimension that broadens appeal to families, professional athletes, and wellness-oriented consumers — while expanding the overall service mix on-property.",
        label: "sports medicine · performance",
      },
    ],
    closeTitle: "The case for partnership",
    closeBody: [
      "Developers who partner with Kosmas gain more than an amenity operator — they gain a strategic asset. Kosmas-managed facilities increase dwell time, support premium positioning, and give marketing teams a compelling story to tell.",
      "More importantly, they create the kind of lived experience that drives referrals, reduces vacancy, and builds communities with staying power. Kosmas Athletic Ventures Corporation is ready to be part of what you are building.",
    ],
  },
};

/* ---------- Audience selector — two-tile segmented control ---------- */
function AudienceDropdown({ value, onChange }) {
  const options = Object.values(AUDIENCES);
  return (
    <div role="tablist" aria-label="Choose your role" className="audience-dropdown" style={{
      display: "grid",
      gridTemplateColumns: "repeat(2, 1fr)",
      gap: 0,
      border: "1px solid var(--line-dark)",
      background: "rgba(255,255,255,0.02)",
    }}>
      {options.map((o, i) => {
        const selected = o.key === value;
        return (
          <button
            key={o.key}
            role="tab"
            type="button"
            aria-selected={selected}
            onClick={() => onChange(o.key)}
            style={{
              position: "relative",
              padding: "28px 32px 26px",
              textAlign: "left",
              background: selected ? "var(--kosmas-red)" : "transparent",
              color: selected ? "#fff" : "rgba(255,255,255,0.7)",
              borderLeft: i === 0 ? "none" : "1px solid var(--line-dark)",
              cursor: "pointer",
              transition: "background 0.18s ease, color 0.18s ease",
              display: "flex",
              flexDirection: "column",
              gap: 8,
              overflow: "hidden",
            }}
            onMouseEnter={(e) => { if (!selected) { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.color = "var(--bone)"; } }}
            onMouseLeave={(e) => { if (!selected) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "rgba(255,255,255,0.7)"; } }}>
            <span style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: selected ? "rgba(255,255,255,0.85)" : "var(--kosmas-gold)",
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
            }}>
              <span style={{
                width: 16, height: 16,
                border: "1.5px solid currentColor",
                borderRadius: "50%",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
                {selected && <span style={{ width: 7, height: 7, borderRadius: "50%", background: "currentColor" }} />}
              </span>
              {String(i + 1).padStart(2, "0")} · I am a
            </span>
            <span style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(26px, 3vw, 38px)",
              fontWeight: 300,
              letterSpacing: "-0.015em",
              lineHeight: 1.05,
            }}>
              {o.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function Consulting({ go, audience: initialAudience }) {
  const [audience, setAudience] = useState(initialAudience && AUDIENCES[initialAudience] ? initialAudience : "mall");
  const [form, setForm] = useState({ name: "", company: "", email: "", project: "", scope: "Mall Operators", message: "" });
  const [sent, setSent] = useState(false);
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const a = AUDIENCES[audience];
  const other = audience === "mall" ? AUDIENCES.developer : AUDIENCES.mall;

  // keep state in sync with hash sub-key (when user changes via nav dropdown)
  useEffect(() => {
    if (initialAudience && AUDIENCES[initialAudience] && initialAudience !== audience) {
      setAudience(initialAudience);
    }
  }, [initialAudience]);

  // keep form scope in sync with the active audience
  useEffect(() => {
    setForm(f => ({ ...f, scope: a.label }));
  }, [audience]);

  return (
    <main data-screen-label="07 Work With Us">
      {/* Hero */}
      <section className="bg-ink" style={{ paddingTop: "clamp(72px, 9vw, 140px)", paddingBottom: "clamp(48px, 6vw, 96px)", position: "relative", overflow: "hidden" }}>
        <div aria-hidden style={{
          position: "absolute", bottom: 0, right: 0, width: "55%", height: "100%",
          background: "linear-gradient(135deg, transparent 50%, rgba(184,146,79,0.18) 50%)",
        }} />
        <div className="container" style={{ position: "relative" }}>
          <Reveal>
            <div className="eyebrow" style={{ color: "var(--kosmas-gold)" }}><span className="dot" />Work With Us</div>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="display display-xl" style={{ color: "var(--bone)", marginTop: 24, maxWidth: "20ch" }}>
              Partner with the operator building the Philippines' active lifestyle ecosystem.
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="lede" style={{ color: "rgba(255,255,255,0.78)", maxWidth: "58ch", marginTop: 32 }}>
              Kosmas Athletic Ventures works alongside mall operators and real estate developers
              to turn underutilized space into revenue-generating sports, wellness, and recreation
              destinations. Choose your role below to see how we partner.
            </p>
          </Reveal>
          <Reveal delay={220}>
            <div style={{ marginTop: 56, display: "flex", flexWrap: "wrap", gap: 32, alignItems: "center", justifyContent: "space-between", paddingTop: 28, borderTop: "1px solid var(--line-dark)" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <span style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "var(--kosmas-gold)",
                }}>
                  Now viewing
                </span>
                <span style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(22px, 2.2vw, 28px)",
                  fontWeight: 300,
                  letterSpacing: "-0.01em",
                  color: "var(--bone)",
                }}>
                  Kosmas for <strong style={{ fontWeight: 600, color: "var(--kosmas-red)" }}>{a.label}</strong>
                </span>
              </div>
              <button type="button" onClick={() => go("consulting", other.key)} style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 12,
                fontFamily: "var(--font-display)",
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--bone)",
                background: "transparent",
                border: "1px solid rgba(255,255,255,0.35)",
                padding: "14px 22px",
                cursor: "pointer",
                transition: "background 0.15s ease, border-color 0.15s ease",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.borderColor = "var(--bone)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.35)"; }}>
                Switch to {other.label}
                <span className="arrow" />
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Audience-specific content */}
      <section className="section bg-bone" key={audience /* re-mount on switch so Reveal fades replay */}>
        <div className="container">
          <Reveal>
            <div className="eyebrow on-light"><span className="dot" />{a.eyebrow}</div>
            <h2 className="display display-l" style={{ marginTop: 18, maxWidth: "22ch" }}>
              {a.headline}
            </h2>
          </Reveal>

          <div className="grid grid-12" style={{ gap: 48, marginTop: 56, alignItems: "start" }}>
            <Reveal delay={80} style={{ gridColumn: "span 5" }}>
              <p className="lede">{a.lede}</p>
              <p className="body-l" style={{ color: "var(--ink-2)", marginTop: 20 }}>{a.intro}</p>
            </Reveal>
            <Reveal delay={140} style={{ gridColumn: "span 7" }}>
              <ImgPh
                src={a.img || undefined}
                label={audience === "mall" ? "mall · activation · indoor courts" : "masterplan · mixed-use · facility anchor"}
                code={a.label.toUpperCase().slice(0, 4)}
                h={420}
                clip="clip-tl"
                alt={a.label + " — Kosmas partnership"}
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* What Kosmas brings */}
      <section className="section bg-bone-2" style={{ background: "var(--bone-2)" }}>
        <div className="container">
          <div className="grid grid-12" style={{ gap: 48 }}>
            <Reveal style={{ gridColumn: "span 5" }}>
              <div className="eyebrow on-light"><span className="dot" />The Partnership</div>
              <h2 className="display display-l" style={{ marginTop: 18 }}>{a.bringsTitle}</h2>
            </Reveal>
            <Reveal delay={120} style={{ gridColumn: "span 7" }}>
              <p className="lede">{a.brings}</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Core capabilities */}
      <section className="section bg-bone">
        <div className="container">
          <Reveal>
            <div className="eyebrow on-light"><span className="dot" />Core Capabilities</div>
            <h2 className="display display-l" style={{ marginTop: 18, maxWidth: "22ch" }}>
              A turnkey operating model — built to perform.
            </h2>
          </Reveal>

          <div className="grid grid-2" style={{ marginTop: 56, gap: 24 }}>
            {a.capabilities.map((c, i) => (
              <Reveal key={c.n} delay={i * 80}>
                <div className="clip-tl" style={{
                  background: "#fff",
                  border: "1px solid var(--line)",
                  padding: 32,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 24 }}>
                    <div className="display" style={{ fontSize: 48, color: "var(--kosmas-red)", lineHeight: 0.9 }}>{c.n}</div>
                    <div className="eyebrow on-light" style={{ color: "var(--kosmas-gold)", textAlign: "right" }}>{c.label}</div>
                  </div>
                  <h3 className="display display-m" style={{ margin: 0 }}>{c.t}</h3>
                  <p className="body-l" style={{ color: "var(--ink-2)", margin: 0 }}>{c.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Case for partnership */}
      <section className="section bg-ink">
        <div className="container">
          <div className="grid grid-12" style={{ gap: 48, alignItems: "start" }}>
            <Reveal style={{ gridColumn: "span 5" }}>
              <div className="eyebrow" style={{ color: "var(--kosmas-gold)" }}><span className="dot" />{a.closeTitle}</div>
              <h2 className="display display-l" style={{ color: "var(--bone)", marginTop: 18 }}>
                A partner that <span style={{ color: "var(--kosmas-red)", fontWeight: 600 }}>moves the numbers.</span>
              </h2>
            </Reveal>
            <Reveal delay={120} style={{ gridColumn: "span 7" }}>
              {a.closeBody.map((p, i) => (
                <p key={i} className={i === 0 ? "lede" : "body-l"} style={{
                  color: i === 0 ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.72)",
                  marginTop: i === 0 ? 0 : 20,
                }}>{p}</p>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      <section id="inquiry" className="section bg-bone-2" style={{ background: "var(--bone-2)" }}>
        <div className="container">
          <div className="grid grid-12" style={{ gap: 48, alignItems: "center" }}>
            <Reveal style={{ gridColumn: "span 5" }}>
              <div className="eyebrow on-light"><span className="dot" />Inquiries</div>
              <h2 className="display display-l" style={{ marginTop: 18 }}>Let's start<br/>the conversation.</h2>
              <p className="body-l" style={{ marginTop: 24, color: "var(--ink-2)", maxWidth: "44ch" }}>
                Whether you have a specific site in mind or you're just exploring the partnership —
                drop us a note. We respond within 2 business days.
              </p>
              <div style={{ marginTop: 32, display: "flex", flexDirection: "column", gap: 12, fontFamily: "var(--font-mono)", fontSize: 13, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--ink-2)" }}>
                <div>▸ partners@kosmas.ph</div>
              </div>
            </Reveal>

            <div style={{ gridColumn: "span 7" }}>
              <div className="clip-tl" style={{ background: "#fff", border: "1px solid var(--line)", padding: 32 }}>
                {!sent ? (
                  <form onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
                    <div className="grid grid-2" style={{ gap: 16 }}>
                      <Field label="Name"     value={form.name}    onChange={set("name")} required />
                      <Field label="Company"  value={form.company} onChange={set("company")} />
                      <Field label="Email"    value={form.email}   onChange={set("email")} type="email" required />
                      <Field label="Project / Site (optional)" value={form.project} onChange={set("project")} />
                    </div>
                    <div style={{ marginTop: 16 }}>
                      <div className="eyebrow on-light" style={{ color: "var(--kosmas-blue)", marginBottom: 10 }}>I am a...</div>
                      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                        {["Mall Operators", "Property Developers", "Other"].map(s => (
                          <button type="button" key={s} onClick={() => setForm({ ...form, scope: s })}
                            style={{
                              padding: "10px 16px",
                              fontFamily: "var(--font-display)",
                              fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase",
                              background: form.scope === s ? "var(--ink)" : "transparent",
                              color: form.scope === s ? "var(--bone)" : "var(--ink)",
                              outline: "1.5px solid var(--ink)",
                              outlineOffset: "-1.5px",
                            }}>
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div style={{ marginTop: 16 }}>
                      <Field label="Message" value={form.message} onChange={set("message")} textarea />
                    </div>
                    <button type="submit" className="btn btn--red" style={{ marginTop: 24 }}>
                      Send inquiry <span className="arrow" />
                    </button>
                  </form>
                ) : (
                  <div style={{ padding: "48px 0", textAlign: "center" }}>
                    <div className="eyebrow on-light" style={{ color: "var(--kosmas-red)" }}>✓ Inquiry received</div>
                    <h3 className="display display-l" style={{ margin: "16px 0 12px" }}>We'll be in touch.</h3>
                    <p className="body-l" style={{ color: "var(--ink-2)" }}>
                      Expect a reply from <span style={{ fontFamily: "var(--font-mono)" }}>partners@kosmas.ph</span> within 2 business days.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function Field({ label, value, onChange, type = "text", required, textarea }) {
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <span className="eyebrow on-light" style={{ color: "var(--ink-2)" }}>{label}{required && <span style={{ color: "var(--kosmas-red)" }}> *</span>}</span>
      {textarea ? (
        <textarea rows={4} value={value} onChange={onChange} required={required}
          style={{
            padding: "12px 14px", fontFamily: "var(--font-body)", fontSize: 14,
            border: "1px solid var(--line)", outline: "none", resize: "vertical",
            background: "var(--paper)",
          }}
          onFocus={(e) => e.target.style.borderColor = "var(--kosmas-red)"}
          onBlur={(e) => e.target.style.borderColor = "var(--line)"}
        />
      ) : (
        <input type={type} value={value} onChange={onChange} required={required}
          style={{
            padding: "12px 14px", fontFamily: "var(--font-body)", fontSize: 14,
            border: "1px solid var(--line)", outline: "none",
            background: "var(--paper)",
          }}
          onFocus={(e) => e.target.style.borderColor = "var(--kosmas-red)"}
          onBlur={(e) => e.target.style.borderColor = "var(--line)"}
        />
      )}
    </label>
  );
}

function Contact({ go }) {
  const [form, setForm] = useState({ name: "", company: "", email: "", topic: "General", message: "" });
  const [sent, setSent] = useState(false);
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const channels = [
    { kicker: "Partnerships",     email: "partners@kosmas.ph", sub: "Mall operators, real estate, JV, corporate" },
    { kicker: "Helios Pickleball", email: "hello@helios.ph",    sub: "Bookings, programming, events" },
    { kicker: "Atleta63",          email: "info@atleta63.ph",   sub: "Pitch hire, leagues — direct to Tito Eric" },
    { kicker: "PodPlay",           email: "podplay@kosmas.ph",  sub: "Distribution, venue technology" },
  ];

  return (
    <main data-screen-label="08 Contact">
      <section className="bg-bone" style={{ paddingTop: "clamp(72px, 9vw, 140px)", paddingBottom: "clamp(48px, 6vw, 96px)" }}>
        <div className="container">
          <Reveal>
            <div className="eyebrow on-light"><span className="dot" />Contact</div>
            <h1 className="display display-l" style={{ marginTop: 18, maxWidth: "20ch" }}>
              Let's <span style={{ color: "var(--kosmas-red)", fontWeight: 600 }}>start the conversation.</span>
            </h1>
            <p className="lede" style={{ marginTop: 24, maxWidth: "56ch", color: "var(--ink-2)" }}>
              Investors, partners, athletes, press — drop us a note. For specific partnership
              tracks, head to <a onClick={(e) => { e.preventDefault(); go("consulting"); }} href="#consulting" style={{ color: "var(--kosmas-red)", borderBottom: "1px solid currentColor", paddingBottom: 1, cursor: "pointer" }}>Work With Us</a>.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section--tight bg-bone">
        <div className="container">
          <div className="grid grid-12" style={{ gap: 48, alignItems: "start" }}>
            {/* Direct emails — skip the form */}
            <div style={{ gridColumn: "span 5" }}>
              <div className="eyebrow on-light" style={{ marginBottom: 20 }}><span className="dot" />Direct channels</div>
              <p className="body-l" style={{ color: "var(--ink-2)", maxWidth: "44ch", marginTop: 0, marginBottom: 32 }}>
                Prefer email? Reach the right team directly — typically a reply within 2 business days.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                {channels.map((c, i) => (
                  <a key={c.email} href={"mailto:" + c.email} style={{
                    display: "grid",
                    gridTemplateColumns: "1fr auto",
                    rowGap: 6,
                    columnGap: 16,
                    padding: "20px 0",
                    borderTop: i === 0 ? "1px solid var(--line)" : "none",
                    borderBottom: "1px solid var(--line)",
                    alignItems: "center",
                    transition: "padding 0.15s ease",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.paddingLeft = "8px"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.paddingLeft = "0"; }}>
                    <div className="eyebrow on-light" style={{ color: "var(--kosmas-gold)" }}>{c.kicker}</div>
                    <span className="arrow" style={{ color: "var(--kosmas-red)" }} />
                    <div style={{ gridColumn: "1 / span 2" }}>
                      <div className="display display-s" style={{ margin: 0, fontFamily: "var(--font-mono)", fontWeight: 500, letterSpacing: "0.02em" }}>{c.email}</div>
                      <div className="body-m" style={{ color: "var(--ink-2)", marginTop: 4 }}>{c.sub}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* General contact form */}
            <div style={{ gridColumn: "span 7" }}>
              <div className="clip-tl" style={{ background: "#fff", border: "1px solid var(--line)", padding: 32 }}>
                {!sent ? (
                  <form onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
                    <div className="eyebrow on-light"><span className="dot" />Send a message</div>
                    <h3 className="display display-m" style={{ marginTop: 12, marginBottom: 24 }}>How can we help?</h3>

                    <div style={{ marginBottom: 20 }}>
                      <div className="eyebrow on-light" style={{ color: "var(--kosmas-blue)", marginBottom: 10 }}>What is this about?</div>
                      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                        {["General", "Partnerships", "Helios bookings", "PodPlay", "Press / media", "Careers"].map(s => (
                          <button type="button" key={s} onClick={() => setForm({ ...form, topic: s })}
                            style={{
                              padding: "10px 16px",
                              fontFamily: "var(--font-display)",
                              fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase",
                              background: form.topic === s ? "var(--kosmas-red)" : "transparent",
                              color: form.topic === s ? "#fff" : "var(--ink)",
                              outline: "1.5px solid " + (form.topic === s ? "var(--kosmas-red)" : "var(--ink)"),
                              outlineOffset: "-1.5px",
                              cursor: "pointer",
                            }}>
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-2" style={{ gap: 16 }}>
                      <Field label="Name"    value={form.name}    onChange={set("name")} required />
                      <Field label="Company / Organization (optional)" value={form.company} onChange={set("company")} />
                    </div>
                    <div style={{ marginTop: 16 }}>
                      <Field label="Email" value={form.email} onChange={set("email")} type="email" required />
                    </div>
                    <div style={{ marginTop: 16 }}>
                      <Field label="Message" value={form.message} onChange={set("message")} textarea />
                    </div>
                    <button type="submit" className="btn btn--red" style={{ marginTop: 24 }}>
                      Send message <span className="arrow" />
                    </button>
                  </form>
                ) : (
                  <div style={{ padding: "48px 0", textAlign: "center" }}>
                    <div className="eyebrow on-light" style={{ color: "var(--kosmas-red)" }}>✓ Message sent</div>
                    <h3 className="display display-l" style={{ margin: "16px 0 12px" }}>Thanks — we'll be in touch.</h3>
                    <p className="body-l" style={{ color: "var(--ink-2)" }}>
                      Expect a reply within 2 business days.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

Object.assign(window, { Consulting, Contact });
