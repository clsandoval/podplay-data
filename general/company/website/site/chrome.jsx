/* ============================================================
   Shared chrome: Header, Footer, helpers
   ============================================================ */
const { useState, useEffect, useRef, useMemo } = React;

const NAV = [
  { id: "home",     label: "Home" },
  { id: "about",    label: "About" },
  { id: "projects", label: "Projects" },
  { id: "consulting", label: "Work With Us" },
  { id: "contact",  label: "Contact" },
];

function Header({ route, go, dark }) {
  const [openSub, setOpenSub] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerSubOpen, setDrawerSubOpen] = useState(null);

  // Lock body scroll while drawer is open
  useEffect(() => {
    if (drawerOpen) document.body.classList.add("kav-drawer-open");
    else document.body.classList.remove("kav-drawer-open");
    return () => document.body.classList.remove("kav-drawer-open");
  }, [drawerOpen]);

  // Close drawer on Escape
  useEffect(() => {
    if (!drawerOpen) return;
    const onKey = (e) => { if (e.key === "Escape") setDrawerOpen(false); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [drawerOpen]);

  const navTo = (id, sub) => { setDrawerOpen(false); setDrawerSubOpen(null); go(id, sub); };

  return (
    <header className={"kav-header" + (dark ? " is-dark" : "")} data-screen-label="Header">
      <div className="container kav-header__inner">
        <div className="kav-logo" onClick={() => go("home")}>
          <img src="assets/kosmas-logo.png" alt="Kosmas Athletic Ventures" style={dark ? { filter: "brightness(0) invert(1)" } : undefined} />
        </div>
        <nav className="kav-nav">
          {NAV.map(n => {
            const isActive = route.startsWith(n.id) || (n.id === "projects" && ["helios","atleta63","podplay"].some(p => route.startsWith(p)));
            if (n.id === "consulting") {
              return (
                <div
                  key={n.id}
                  className="kav-nav__group"
                  onMouseEnter={() => setOpenSub("consulting")}
                  onMouseLeave={() => setOpenSub(null)}>
                  <a
                    className={isActive ? "active" : ""}
                    onClick={(e) => { e.preventDefault(); go(n.id); }}
                    href={"#" + n.id}
                    aria-haspopup="menu"
                    aria-expanded={openSub === "consulting"}>
                    {n.label}
                    <span className="kav-nav__caret" aria-hidden>
                      <svg width="10" height="10" viewBox="0 0 10 10"><path d="M2 4 L5 7 L8 4" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square" /></svg>
                    </span>
                  </a>
                  <div className={"kav-submenu" + (openSub === "consulting" ? " open" : "")} role="menu">
                    <a role="menuitem"
                       onClick={(e) => { e.preventDefault(); go("consulting", "mall"); setOpenSub(null); }}
                       href="#consulting:mall">
                      <span className="kav-submenu__title">Kosmas for <strong>Mall Operators</strong></span>
                    </a>
                    <a role="menuitem"
                       onClick={(e) => { e.preventDefault(); go("consulting", "developer"); setOpenSub(null); }}
                       href="#consulting:developer">
                      <span className="kav-submenu__title">Kosmas for <strong>Property Developers</strong></span>
                    </a>
                  </div>
                </div>
              );
            }
            if (n.id === "projects") {
              return (
                <div
                  key={n.id}
                  className="kav-nav__group"
                  onMouseEnter={() => setOpenSub("projects")}
                  onMouseLeave={() => setOpenSub(null)}>
                  <a
                    className={isActive ? "active" : ""}
                    onClick={(e) => { e.preventDefault(); go(n.id); }}
                    href={"#" + n.id}
                    aria-haspopup="menu"
                    aria-expanded={openSub === "projects"}>
                    {n.label}
                    <span className="kav-nav__caret" aria-hidden>
                      <svg width="10" height="10" viewBox="0 0 10 10"><path d="M2 4 L5 7 L8 4" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square" /></svg>
                    </span>
                  </a>
                  <div className={"kav-submenu" + (openSub === "projects" ? " open" : "")} role="menu">
                    <a role="menuitem"
                       onClick={(e) => { e.preventDefault(); go("projects"); setOpenSub(null); }}
                       href="#projects">
                      <span className="kav-submenu__title">All Projects</span>
                    </a>
                    <a role="menuitem"
                       onClick={(e) => { e.preventDefault(); go("helios"); setOpenSub(null); }}
                       href="#helios">
                      <span className="kav-submenu__title"><strong>Helios</strong> Pickleball</span>
                    </a>
                    <a role="menuitem"
                       onClick={(e) => { e.preventDefault(); go("atleta63"); setOpenSub(null); }}
                       href="#atleta63">
                      <span className="kav-submenu__title"><strong>Atleta63</strong> Football</span>
                    </a>
                    <a role="menuitem"
                       onClick={(e) => { e.preventDefault(); go("podplay"); setOpenSub(null); }}
                       href="#podplay">
                      <span className="kav-submenu__title"><strong>PodPlay</strong> Technology</span>
                    </a>
                  </div>
                </div>
              );
            }
            return (
              <a key={n.id}
                 className={isActive ? "active" : ""}
                 onClick={(e) => { e.preventDefault(); go(n.id); }}
                 href={"#" + n.id}>
                {n.label}
              </a>
            );
          })}
        </nav>
        <a href="#contact" className="kav-cta" onClick={(e) => { e.preventDefault(); go("contact"); }}>
          Partner with us <span className="arrow" />
        </a>
        <button
          type="button"
          className="kav-burger"
          aria-label={drawerOpen ? "Close menu" : "Open menu"}
          aria-expanded={drawerOpen}
          aria-controls="kav-mobile-drawer"
          onClick={() => setDrawerOpen(o => !o)}>
          <span className="kav-burger__bars" aria-hidden><span /></span>
        </button>
      </div>

      {/* Mobile drawer */}
      <div id="kav-mobile-drawer" className={"kav-drawer" + (drawerOpen ? " open" : "")} role="dialog" aria-modal="true" aria-hidden={!drawerOpen}>
        <div className="kav-drawer__top">
          <div className="kav-logo" onClick={() => navTo("home")}>
            <img src="assets/kosmas-logo.png" alt="Kosmas Athletic Ventures" style={{ filter: "brightness(0) invert(1)", height: 28 }} />
          </div>
          <button type="button" className="kav-drawer__close" aria-label="Close menu" onClick={() => setDrawerOpen(false)}>
            <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden><path d="M1 1 L13 13 M13 1 L1 13" stroke="currentColor" strokeWidth="1.5" fill="none" /></svg>
          </button>
        </div>
        <nav>
          {NAV.map(n => {
            const isActive = route.startsWith(n.id) || (n.id === "projects" && ["helios","atleta63","podplay"].some(p => route.startsWith(p)));
            if (n.id === "projects") {
              const open = drawerSubOpen === "projects";
              return (
                <div key={n.id} className={"kav-drawer__group" + (open ? " open" : "")}>
                  <button type="button" className="kav-drawer__trigger"
                    aria-expanded={open}
                    onClick={() => setDrawerSubOpen(open ? null : "projects")}>
                    <span className={isActive ? "active" : ""} style={isActive ? { color: "var(--kosmas-red)" } : undefined}>{n.label}</span>
                    <span className="kav-drawer__caret" aria-hidden>
                      <svg width="14" height="14" viewBox="0 0 10 10"><path d="M2 4 L5 7 L8 4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" /></svg>
                    </span>
                  </button>
                  <div className="kav-drawer__sub">
                    <a onClick={(e) => { e.preventDefault(); navTo("projects"); }} href="#projects">All Projects</a>
                    <a onClick={(e) => { e.preventDefault(); navTo("helios"); }} href="#helios"><strong>Helios</strong> Pickleball</a>
                    <a onClick={(e) => { e.preventDefault(); navTo("atleta63"); }} href="#atleta63"><strong>Atleta63</strong> Football</a>
                    <a onClick={(e) => { e.preventDefault(); navTo("podplay"); }} href="#podplay"><strong>PodPlay</strong> Technology</a>
                  </div>
                </div>
              );
            }
            if (n.id === "consulting") {
              const open = drawerSubOpen === "consulting";
              return (
                <div key={n.id} className={"kav-drawer__group" + (open ? " open" : "")}>
                  <button type="button" className="kav-drawer__trigger"
                    aria-expanded={open}
                    onClick={() => setDrawerSubOpen(open ? null : "consulting")}>
                    <span className={isActive ? "active" : ""} style={isActive ? { color: "var(--kosmas-red)" } : undefined}>{n.label}</span>
                    <span className="kav-drawer__caret" aria-hidden>
                      <svg width="14" height="14" viewBox="0 0 10 10"><path d="M2 4 L5 7 L8 4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" /></svg>
                    </span>
                  </button>
                  <div className="kav-drawer__sub">
                    <a onClick={(e) => { e.preventDefault(); navTo("consulting"); }} href="#consulting">Overview</a>
                    <a onClick={(e) => { e.preventDefault(); navTo("consulting", "mall"); }} href="#consulting:mall">For <strong>Mall Operators</strong></a>
                    <a onClick={(e) => { e.preventDefault(); navTo("consulting", "developer"); }} href="#consulting:developer">For <strong>Property Developers</strong></a>
                  </div>
                </div>
              );
            }
            return (
              <a key={n.id}
                 className={isActive ? "active" : ""}
                 onClick={(e) => { e.preventDefault(); navTo(n.id); }}
                 href={"#" + n.id}>
                {n.label}
              </a>
            );
          })}
        </nav>
        <a href="#contact" className="btn btn--red kav-drawer__cta" onClick={(e) => { e.preventDefault(); navTo("contact"); }}>
          Partner with us <span className="arrow" />
        </a>
      </div>
    </header>
  );
}

function Footer({ go }) {
  return (
    <footer className="kav-footer" data-screen-label="Footer">
      <div className="container">
        <div className="kav-footer__grid">
          <div>
            <div className="kav-footer__logo">
              <img src="assets/kosmas-logo.png" alt="Kosmas" style={{ filter: "brightness(0) invert(1)" }} />
            </div>
            <p className="body-m" style={{ color: "rgba(255,255,255,0.75)", maxWidth: "44ch" }}>
              Building the Premier Sports & Wellness Ecosystem in the Philippines.
            </p>
          </div>
          <div>
            <h4>Company</h4>
            <ul>
              <li><a href="#about" onClick={(e) => { e.preventDefault(); go("about"); }}>About</a></li>
              <li><a href="#consulting" onClick={(e) => { e.preventDefault(); go("consulting"); }}>Work With Us</a></li>
              <li><a href="#contact" onClick={(e) => { e.preventDefault(); go("contact"); }}>Contact</a></li>
            </ul>
          </div>
          <div>
            <h4>Projects</h4>
            <ul>
              <li><a href="#helios" onClick={(e) => { e.preventDefault(); go("helios"); }}>Helios Pickleball</a></li>
              <li><a href="#atleta63" onClick={(e) => { e.preventDefault(); go("atleta63"); }}>Atleta63</a></li>
              <li><a href="#podplay" onClick={(e) => { e.preventDefault(); go("podplay"); }}>PodPlay</a></li>
            </ul>
          </div>
          <div>
            <h4>Get in touch</h4>
            <ul>
              <li><a href="mailto:partners@kosmas.ph">partners@kosmas.ph<br/><span style={{ color: "rgba(255,255,255,0.45)", fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "var(--font-mono)" }}>Partnerships</span></a></li>
              <li><a href="mailto:hello@helios.ph">hello@helios.ph<br/><span style={{ color: "rgba(255,255,255,0.45)", fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "var(--font-mono)" }}>Helios bookings</span></a></li>
              <li><a href="mailto:info@atleta63.ph">info@atleta63.ph<br/><span style={{ color: "rgba(255,255,255,0.45)", fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "var(--font-mono)" }}>Atleta63</span></a></li>
              <li><a href="mailto:podplay@kosmas.ph">podplay@kosmas.ph<br/><span style={{ color: "rgba(255,255,255,0.45)", fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "var(--font-mono)" }}>PodPlay</span></a></li>
            </ul>
          </div>
        </div>
        <div className="kav-footer__bottom">
          <span>© 2026 Kosmas Athletic Ventures Co.</span>
          <span>Design · Activate · Operate</span>
        </div>
      </div>
    </footer>
  );
}

/* ---------- Scroll-reveal hook ---------- */
function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { el.classList.add("in"); io.unobserve(el); }});
    }, { threshold: 0.12 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

function Reveal({ children, as: Tag = "div", delay = 0, className = "", style = {}, ...rest }) {
  const ref = useReveal();
  return (
    <Tag ref={ref} className={"fade-in " + className} style={{ ...style, transitionDelay: delay + "ms" }} {...rest}>
      {children}
    </Tag>
  );
}

/* ---------- Image placeholder ---------- */
function ImgPh({ label, code, h = 320, dark = false, clip = "", style = {}, src, alt, position = "center" }) {
  const hasImg = !!src;
  const imgStyle = hasImg ? {
    backgroundImage: `url("${src}")`,
    backgroundSize: "cover",
    backgroundPosition: position,
    backgroundRepeat: "no-repeat",
  } : {};
  return (
    <div className={"imgph " + (dark || hasImg ? "imgph--dark " : "") + (hasImg ? "imgph--filled " : "") + clip}
         style={{ height: h, ...imgStyle, ...style }}
         role={hasImg ? "img" : undefined}
         aria-label={hasImg ? (alt || label) : undefined}>
      {/* placeholder is a blank patterned tile — no overlay text */}
    </div>
  );
}

/* ---------- Stat ---------- */
function Stat({ value, label, suffix = "", color = "var(--kosmas-red)" }) {
  return (
    <div>
      <div className="display" style={{ fontSize: "clamp(56px, 6vw, 96px)", color, lineHeight: 0.9 }}>
        {value}<span style={{ fontSize: "0.5em", verticalAlign: "top", marginLeft: 4 }}>{suffix}</span>
      </div>
      <div className="eyebrow on-light" style={{ marginTop: 10 }}>{label}</div>
    </div>
  );
}

Object.assign(window, { Header, Footer, Reveal, useReveal, ImgPh, Stat, NAV });
