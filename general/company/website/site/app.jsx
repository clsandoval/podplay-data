/* ============================================================
   App: hash-router + tweaks
   ============================================================ */

const ROUTES = ["home", "about", "projects", "helios", "atleta63", "podplay", "consulting", "contact"];

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "heroLayout": "stacked",
  "density": "comfortable",
  "showMarquee": true
}/*EDITMODE-END*/;

function App() {
  const parseHash = () => {
    const raw = (location.hash || "#home").replace("#", "");
    const [base, sub] = raw.split(":");
    return {
      route: ROUTES.includes(base) ? base : "home",
      sub: sub || "",
    };
  };
  const [{ route, sub }, setLoc] = useState(parseHash);

  const t = useTweaks(TWEAK_DEFAULTS);
  const setTweak = t.setTweak;

  // route handling
  useEffect(() => {
    const onHash = () => {
      setLoc(parseHash());
      window.scrollTo({ top: 0, behavior: "instant" });
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const go = (id, subKey) => {
    const target = "#" + id + (subKey ? ":" + subKey : "");
    if (location.hash === target) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      location.hash = target;
    }
  };

  // Apply tweaks via CSS vars (brand red is locked — only density is tweakable now)
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--pad-y", t.density === "tight" ? "clamp(48px, 6vw, 96px)" : t.density === "spacious" ? "clamp(80px, 11vw, 180px)" : "clamp(64px, 9vw, 140px)");
  }, [t.density]);

  // Determine if header should be dark for this route's hero
  const dark = ["home", "helios", "atleta63", "podplay", "consulting"].includes(route);

  let page;
  switch (route) {
    case "home":       page = <Home go={go} density={t.density} />; break;
    case "about":      page = <About go={go} />; break;
    case "projects":   page = <Projects go={go} />; break;
    case "helios":     page = <Helios go={go} />; break;
    case "atleta63":   page = <Atleta63 go={go} />; break;
    case "podplay":    page = <PodPlay go={go} />; break;
    case "consulting": page = <Consulting go={go} audience={sub} />; break;
    case "contact":    page = <Contact go={go} />; break;
    default:           page = <Home go={go} density={t.density} />;
  }

  return (
    <>
      <Header route={route} go={go} dark={dark} />
      {page}
      <Footer go={go} />

      {t.tweaksOpen && (
        <TweaksPanel onClose={t.closeTweaks} title="Tweaks">
          <TweakSection label="Layout">
            <TweakRadio label="Density"
              options={[
                { label: "Tight",       value: "tight" },
                { label: "Comfortable", value: "comfortable" },
                { label: "Spacious",    value: "spacious" },
              ]}
              value={t.density}
              onChange={(v) => setTweak("density", v)} />
            <TweakRadio label="Hero layout"
              options={[
                { label: "Stacked", value: "stacked" },
                { label: "Split",   value: "split" },
              ]}
              value={t.heroLayout}
              onChange={(v) => setTweak("heroLayout", v)} />
          </TweakSection>
          <TweakSection label="Effects">
            <TweakToggle label="Marquee ticker" value={t.showMarquee} onChange={(v) => setTweak("showMarquee", v)} />
          </TweakSection>
        </TweaksPanel>
      )}
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
