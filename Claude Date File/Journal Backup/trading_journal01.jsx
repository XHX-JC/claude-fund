import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "fund_journal_v1";

const INITIAL_STATE = {
  lastUpdated: "2026-03-25",
  fund: {
    account: "U24936508",
    netLiquidity: 100600,
    cash: 37000,
    dailyPnL: 982,
    unrealizedPnL: 600,
    broker: "IBKR Pro",
    baseCurrency: "USD",
    location: "UAE",
    ibkrEuropeanAccess: "Pending approval"
  },
  thesis: {
    title: "IRAN HOLDS HORMUZ — OIL STAYS ELEVATED",
    summary: "Master thesis: Iran controls Strait of Hormuz, oil stays structurally elevated. Exit triggers are OIL-BASED not ceasefire-based. 5-day pause expires 28-31 March — rebound catalyst. Goldman Q2 Brent target $110. GCC production 8-10mb/d below pre-war levels.",
    oilWTI: 87.68,
    oilBrent: 97.98,
    goldPrice: 4785,
    hormuzStatus: "Functionally closed — 5 vessels Mon under Iranian coordination",
    ceasefireFilter: "DISREGARD all US-led ceasefire news unless Iranian side CONFIRMS. Iran attacking Dubai today (Mar 25). Thesis intact.",
    keyDates: [
      { date: "28-31 Mar", event: "Trump 5-day pause expires — oil rebound catalyst", priority: "CRITICAL" },
      { date: "27 Mar", event: "CCL Q1 Earnings pre-market — wave season bookings", priority: "CRITICAL" },
      { date: "End Mar", event: "KTOS Orbit Technologies acquisition close", priority: "HIGH" },
      { date: "01 Apr", event: "ZENA DaaS-25 location target", priority: "MEDIUM" },
      { date: "05 Apr", event: "OPEC+ meeting — production freeze decision", priority: "HIGH" },
      { date: "06 May", event: "BKSY Q1 Earnings — guidance delivery test", priority: "MEDIUM" },
      { date: "07 May", event: "AMPX Q1 Earnings", priority: "MEDIUM" },
      { date: "11 May", event: "PLTR Q1 Earnings", priority: "HIGH" },
      { date: "13 May", event: "VST + PDYN Earnings", priority: "MEDIUM" }
    ]
  },
  positions: [
    { ticker: "CCL",  name: "Carnival Corp",         shares: 240,  avgPrice: 24.84,  costBasis: 5960,  stop: "Mental",       stopPrice: null,  target: 37.35, thesis: "Cruise — oil elevated = thesis intact. Earnings Thu 27 Mar pre-market.", flag: null },
    { ticker: "KTOS", name: "Kratos Defense",         shares: 100,  avgPrice: 81.01,  costBasis: 8101,  stop: "Mental",       stopPrice: 70,    target: 102,   thesis: "Counter-UAS + Orbit deal closing end-Mar. Dubai attacks confirm demand.", flag: "SELL ORDER CANCELLED — Orbit deal closing" },
    { ticker: "LEU",  name: "Centrus Energy",         shares: 13,   avgPrice: 188.87, costBasis: 2455,  stop: "None",         stopPrice: null,  target: 283,   thesis: "HALEU monopoly — completely unaffected by Iran ceasefire noise.", flag: null },
    { ticker: "ONDS", name: "Ondas Holdings",         shares: 250,  avgPrice: 10.91,  costBasis: 2726,  stop: "GTC $8.50 ✅", stopPrice: 8.50,  target: 18,    thesis: "Drone/AI autonomy — Q4 +629% YoY. Wait Q1 May to confirm $38-40M.", flag: "⚠️ 21 insider sales, 0 buys. 3x 424B7 filings Mar 16-18. Do NOT add." },
    { ticker: "PLTR", name: "Palantir Technologies",  shares: 49,   avgPrice: 161.63, costBasis: 7920,  stop: "Mental",       stopPrice: 130,   target: 200,   thesis: "Maven AI designated permanent DoD Program of Record. AI targeting in active Iran war.", flag: "SELL ORDER CANCELLED — Maven POR = structural DoD budget line" },
    { ticker: "RCL",  name: "Royal Caribbean",        shares: 36,   avgPrice: 273.57, costBasis: 9848,  stop: "Mental",       stopPrice: null,  target: 395,   thesis: "Cruise — watch WTI. Exit trigger if WTI closes below $85 for 2 consecutive days.", flag: null },
    { ticker: "SHLD", name: "Global X Defense ETF",   shares: 69,   avgPrice: 72.03,  costBasis: 4970,  stop: "Mental",       stopPrice: null,  target: null,  thesis: "Defence ETF — direct beneficiary of ongoing conflict. Hold.", flag: null },
    { ticker: "VST",  name: "Vistra Corp",            shares: 53,   avgPrice: 150.57, costBasis: 7980,  stop: "Mental",       stopPrice: null,  target: 234,   thesis: "Nuclear/AI power — completely unaffected by Iran noise.", flag: null }
  ],
  pendingOrders: [
    { ticker: "CCJ",  name: "Cameco Corp",    action: "BUY", qty: 49,  limitPrice: 104.00, tif: "GTC", stopPrice: null,  target: 136, status: "GTC LIVE", note: "Stock trading $111.43 — $7 above limit. DO NOT CHASE. Hold $104 GTC and wait for pullback. Uranium thesis intact — Christensen Ranch catalyst. CCJ has pulled back from $120 before. Patience." },
    { ticker: "CTRA", name: "Coterra Energy", action: "BUY", qty: 100, limitPrice: 35.25,  tif: "GTC", stopPrice: 29.00, target: 43,  status: "RESUBMIT TOMORROW", note: "Day order expired Mar 25 — stock opened $35.05 vs $34.50 limit. Devon merger floor moved higher. Resubmit GTC $35.25 at tomorrow open. Do not chase today — oil bounce will push higher." }
  ],
  standingInstructions: [
    { id: 1, title: "Dilution Flagging",       body: "Every recommendation must check: recent share offerings, insider selling past 90 days, FCF status, dilution %. Flag prominently before recommending." },
    { id: 2, title: "Momentum vs Thesis Hold", body: "State explicitly on every pick whether this is momentum or thesis hold. Never conflate." },
    { id: 3, title: "Iran Ceasefire Filter",   body: "Disregard ALL US-led ceasefire news unless Iranian side CONFIRMS. Iran is actively attacking Dubai. Thesis intact. Oil drop on ceasefire noise = BUY signal not exit." },
    { id: 4, title: "10-Min Pre-Open Rule",    body: "Place Iran-sensitive orders within 10 minutes of US open (5:30PM UAE). European markets: 11AM-7:30PM UAE." },
    { id: 5, title: "Full Scan Protocol",      body: "Every scan covers: all watchlist positions + overnight news + European defence scan for contract wins, breakthrough tech, entry points." },
    { id: 6, title: "Congress Trading Signals",body: "Monitor QuiverQuant and CapitolTrades.com for Armed Services committee members buying defence stocks." },
    { id: 7, title: "European Scan Mandate",   body: "Every full scan MUST include European-focused trawl across R3NK, HAG, LDO, HO, CHG, BA, BAB, CHRT and broader EU/UK small-cap defence universe. Scan for contract wins, breakthrough tech, entry points. Europe open 11AM-7:30PM UAE = structural trading advantage." },
    { id: 8, title: "IBKR EU Access",          body: "European market access request submitted. Once approved: Enter R3NK €52-54, HAG €75-78, CHG ~530p, LDO ~€62 as first European trades. IAG $10K reserved for oil spike re-entry 28-31 Mar." }
  ],
  watchlistUS: [
    { ticker: "IAG",   name: "IAG (ICAGY)",        exchange: "OTC",    current: null, entry: "Re-enter on oil spike 28-31 Mar when pause expires", target: null, thesis: "$10,000 reserved. Iran pause expires = oil spike = airline re-entry." },
    { ticker: "BKSY",  name: "BlackSky Tech",       exchange: "NYSE",   current: 26,   entry: "22-24 on pullback", target: 40,   thesis: "Guidance cut $120-145M to $105-130M. Wait for Q1 May earnings beat to re-rate." },
    { ticker: "GOLD",  name: "Barrick Mining",      exchange: "NYSE",   current: null, entry: "Wait gold reclaims $5,000", target: null, thesis: "Gold paradox: war = safe haven BUT energy inflation keeps Fed on hold suppressing gold. 18/24 analysts Buy. Wait." }
  ],
  watchlistEU: [
    { ticker: "R3NK",  name: "RENK Group AG",         exchange: "XETRA",  ibkr: "R3NK IBIS",   current: 52.20,  entry: "€52-54",     target: 77,    cur: "EUR", upside: 47, thesis: "Leopard 2 transmissions + naval + Iran ME expansion. CEO flagged ME demand surge. 42% off highs.", note: "PRIORITY 1 — Buy on EU access approval" },
    { ticker: "HAG",   name: "Hensoldt AG",           exchange: "XETRA",  ibkr: "HAG IBIS",    current: 77.15,  entry: "€75-78",     target: 96,    cur: "EUR", upside: 25, thesis: "Radar + EW + optronics. 62% order surge 2025. €8.83B backlog. Every drone detected over Dubai = Hensoldt sensor.", note: "PRIORITY 2 — Deutsche Bank Buy €101. Jefferies Buy €90." },
    { ticker: "LDO",   name: "Leonardo SpA",          exchange: "MILAN",  ibkr: "LDO BVME",    current: 62.00,  entry: "€60-63",     target: 80,    cur: "EUR", upside: 29, thesis: "Digital defence + Michelangelo Dome air defence + doubles profits 2030. Barclays OW.", note: "PRIORITY 3 — Barclays Overweight upgrade." },
    { ticker: "HO",    name: "Thales SA",             exchange: "PARIS",  ibkr: "HO ENEXT.BE", current: 235.60, entry: "€230-240",   target: 293,   cur: "EUR", upside: 24, thesis: "MBDA missiles + cybersecurity + SAMP/T NG air defence + IRIS2 satellite. 18 analysts avg €293.", note: "PRIORITY 4 — Triple-threat EU defence electronics." },
    { ticker: "CHG",   name: "Chemring Group",        exchange: "LSE",    ibkr: "CHG LSE",     current: 527,    entry: "500-530p",   target: 616,   cur: "GBP", upside: 27, thesis: "High explosives near-monopoly. Aircraft countermeasures. NATO restock critical.", note: "PRIORITY 5 — Strong Buy consensus. Earnings Jun 9 2026." },
    { ticker: "BA",    name: "BAE Systems",           exchange: "LSE",    ibkr: "BA LSE",      current: 2250,   entry: "2,200-2,300p", target: 2800, cur: "GBP", upside: 25, thesis: "AUKUS nuclear subs + BATS counter-drone system + AI-enabled. 45% US DoD revenue.", note: "PRIORITY 6 — BATS live-fire trials Q2 2026." },
    { ticker: "BAB",   name: "Babcock International", exchange: "LSE",    ibkr: "BAB LSE",     current: 1409,   entry: "1,300-1,420p", target: 1700, cur: "GBP", upside: 21, thesis: "Nuclear submarine MRO + AUKUS Barrow + helicopter MRO Gulf states.", note: "PRIORITY 7 — 6 analysts Buy, 0 Sell. Buyback ongoing." },
    { ticker: "CHRT",  name: "Cohort PLC",            exchange: "AIM",    ibkr: "CHRT LSE",    current: 1290,   entry: "1,250-1,350p", target: 1570, cur: "GBP", upside: 22, thesis: "Naval electronics + counter-drone + satellite comms. £135M Royal Navy Ancilia contract.", note: "PRIORITY 8 — RBC Outperform. 16% EPS CAGR. USE LIMIT ORDERS on AIM." },
    { ticker: "KOG",   name: "Kongsberg Gruppen",     exchange: "OSLO",   ibkr: "KOG OL",      current: 389,    entry: "Wait Apr spinoff", target: 500, cur: "NOK", upside: 28, thesis: "Maritime spinoff Apr 2026 leaves pure-play defence growing 20%+ annually.", note: "WATCH — Wait for April maritime spinoff announcement." },
    { ticker: "TKMS",  name: "TKMS AG",               exchange: "XETRA",  ibkr: "TKMS IBIS",   current: 85,     entry: "Watch",      target: null,  cur: "EUR", upside: null, thesis: "German submarine manufacturer. Post-Hormuz mine thesis. Iran has Maham 3+7 limpet mines in strait.", note: "WATCH — Submarine/mine clearance demand direct." },
    { ticker: "KNDS",  name: "KNDS (IPO 2026)",       exchange: "TBC",    ibkr: "TBC",         current: null,   entry: "Day-one buy", target: null,  cur: "EUR", upside: null, thesis: "Franco-German Leopard 2 maker. €23.5B backlog. Largest EU defence IPO 2026.", note: "IPO WATCH — Day-one buy when listed." }
  ],
  sessionNotes: [
    { date: "2026-03-25", note: "END OF DAY SUMMARY — Mar 25 2026. FILLS: PDYN 500 @ ~$6.56 market ✅ | UEC 206 @ $14.00 ✅ | AMPX 168 @ $18.50 ✅ | CODA 416 @ $12.00 ✅. NOT FILLED: CTRA Day order expired — stock opened $35.05 vs $34.50 limit. Decision: resubmit GTC $35.25 tomorrow. CCJ GTC $104 still working — stock trading $111.43, do not chase, hold $104 GTC for pullback. ORDERS IN PLACE: CODA stop $9.50 GTC ✅ | AMPX stop $14.00 GTC ✅ | AMPX sell $32 GTC ✅ | ONDS stop $8.50 GTC ✅ | CCJ buy $104 GTC still live. KEY DECISIONS TODAY: (1) PLTR sell cancelled — Pentagon designated Maven AI as official Program of Record, permanent DoD budget line. Pre-market $160, near breakeven, hold. (2) KTOS sell cancelled — Orbit Technologies acquisition closing end-March, counter-UAS demand confirmed by Dubai attacks. Mental stop $70. (3) AMPX raised $18.00→$18.50 on pre-market $18.38. (4) PDYN market order confirmed correct — pre-market was $6.56 not $9+ as stale data suggested. (5) LEU confirmed 13 shares not 14 — updated. MACRO: Iran rejected ceasefire (again) evening of Mar 25. Thesis 100% intact. Oil bounced from $87 WTI on rejection — IAG re-entry window may open before 28-31 Mar target. Keep $10K reserved. WTI $87.68 / Brent $97.98. Goldman Q2 target $110 unchanged. Hormuz functionally closed — 5 vessels Mon under Iranian coordination. Iran has Maham 3+7 limpet mines confirmed in strait per US intelligence. Dubai under active drone attack all day — air raid sirens confirmed by investor on ground. TOMORROW ACTIONS: (1) Resubmit CTRA GTC $35.25. (2) Check CCJ — if pullback toward $106-108 consider raising limit. (3) Check all fills from today settled correctly in IBKR. (4) Watch IAG/oil — if WTI spikes above $95 on Iran rejection, re-enter ICAGY $10K. (5) Run full scan including European defence trawl. (6) Check IBKR EU access approval status. EUROPEAN WATCHLIST: R3NK €52.20 PRIORITY 1 on access. HAG €77.15 PRIORITY 2. Full list in watchlist tab. FUND STATUS EOD: Net liquidity $100.6K. Cash ~$37K post-fills. Daily P&L +$982 +0.98%. Positions: CCL/KTOS/LEU/ONDS/PLTR/RCL/SHLD/VST live + PDYN/UEC/AMPX/CODA new fills today. ONDS FLAGS: 21 insider sales 0 buys. CEO sold $4.6M, Ron Stern $6.7M. Three 424B7 resale registrations Mar 16-18. Stop $8.50 in place. Do NOT add. Wait Q1 results May. BARRICK: Still watchlist only — gold at $4,785 down 14.5% from ATH $5,595. Wait gold reclaims $5,000 before entry. KTOS mental stop $70 confirmed. PLTR mental stop $130 confirmed." }
  ]
};

const COLORS = {
  bg: "#0a0c0f",
  surface: "#111318",
  border: "#1e2330",
  borderBright: "#2a3348",
  accent: "#e8a020",
  accentDim: "#a06a10",
  green: "#22c55e",
  red: "#ef4444",
  blue: "#3b82f6",
  muted: "#4a5568",
  text: "#c9d1d9",
  textDim: "#6e7f96",
  textBright: "#f0f4f8"
};

const css = `
  @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300;400;500;600&family=IBM+Plex+Sans:wght@300;400;500;600&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: ${COLORS.bg}; font-family: 'IBM Plex Sans', sans-serif; color: ${COLORS.text}; }
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: ${COLORS.bg}; }
  ::-webkit-scrollbar-thumb { background: ${COLORS.border}; border-radius: 2px; }
  .mono { font-family: 'IBM Plex Mono', monospace; }
  .blink { animation: blink 1.4s step-end infinite; }
  @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.2} }
  .pulse { animation: pulse 2s ease-in-out infinite; }
  @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.6} }
  .fade-in { animation: fadeIn 0.4s ease; }
  @keyframes fadeIn { from{opacity:0;transform:translateY(4px)} to{opacity:1;transform:translateY(0)} }
  .tab-btn { background: none; border: none; cursor: pointer; padding: 8px 16px; font-family: 'IBM Plex Mono', monospace; font-size: 11px; letter-spacing: 0.08em; color: ${COLORS.textDim}; border-bottom: 2px solid transparent; transition: all 0.2s; }
  .tab-btn:hover { color: ${COLORS.text}; }
  .tab-btn.active { color: ${COLORS.accent}; border-bottom-color: ${COLORS.accent}; }
  .badge { display: inline-block; padding: 2px 6px; border-radius: 3px; font-family: 'IBM Plex Mono', monospace; font-size: 10px; font-weight: 600; letter-spacing: 0.05em; }
  .badge-red { background: rgba(239,68,68,0.15); color: #ef4444; }
  .badge-green { background: rgba(34,197,94,0.15); color: #22c55e; }
  .badge-amber { background: rgba(232,160,32,0.15); color: #e8a020; }
  .badge-blue { background: rgba(59,130,246,0.15); color: #3b82f6; }
  .badge-grey { background: rgba(74,85,104,0.3); color: #8899aa; }
  .card { background: ${COLORS.surface}; border: 1px solid ${COLORS.border}; border-radius: 6px; padding: 16px; }
  .card-sm { background: ${COLORS.surface}; border: 1px solid ${COLORS.border}; border-radius: 4px; padding: 10px 12px; }
  .divider { border: none; border-top: 1px solid ${COLORS.border}; margin: 12px 0; }
  input, textarea { background: #0d1017; border: 1px solid ${COLORS.border}; color: ${COLORS.text}; border-radius: 4px; padding: 6px 10px; font-family: 'IBM Plex Sans', sans-serif; font-size: 13px; width: 100%; outline: none; }
  input:focus, textarea:focus { border-color: ${COLORS.accent}; }
  .btn { display: inline-flex; align-items: center; gap: 6px; padding: 6px 14px; border-radius: 4px; font-family: 'IBM Plex Mono', monospace; font-size: 11px; font-weight: 500; letter-spacing: 0.06em; cursor: pointer; border: none; transition: all 0.15s; }
  .btn-primary { background: ${COLORS.accent}; color: #0a0c0f; }
  .btn-primary:hover { background: #f0b030; }
  .btn-ghost { background: transparent; color: ${COLORS.textDim}; border: 1px solid ${COLORS.border}; }
  .btn-ghost:hover { border-color: ${COLORS.accent}; color: ${COLORS.accent}; }
  .btn-danger { background: transparent; color: #ef4444; border: 1px solid rgba(239,68,68,0.3); }
  .btn-danger:hover { background: rgba(239,68,68,0.1); }
  .row { display: flex; align-items: center; }
  .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
  .grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; }
`;

const Label = ({ children, style }) => (
  <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, letterSpacing: "0.08em", color: COLORS.textDim, textTransform: "uppercase", ...style }}>{children}</span>
);

const Val = ({ children, color, size }) => (
  <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: size || 13, fontWeight: 500, color: color || COLORS.textBright }}>{children}</span>
);

const SectionHeader = ({ children, action }) => (
  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <div style={{ width: 3, height: 14, background: COLORS.accent, borderRadius: 2 }} />
      <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", color: COLORS.accent, textTransform: "uppercase" }}>{children}</span>
    </div>
    {action}
  </div>
);

export default function TradingJournal() {
  const [data, setData] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [saving, setSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);
  const [newNote, setNewNote] = useState("");
  const [status, setStatus] = useState("LOADING");
  const [editThesis, setEditThesis] = useState(false);
  const [thesisDraft, setThesisDraft] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const result = await window.storage.get(STORAGE_KEY);
      if (result && result.value) {
        setData(JSON.parse(result.value));
        setStatus("LOADED");
      } else {
        setData(INITIAL_STATE);
        setStatus("NEW — SEEDED WITH SESSION DATA");
      }
    } catch {
      setData(INITIAL_STATE);
      setStatus("NEW — SEEDED WITH SESSION DATA");
    }
  };

  const save = useCallback(async (d) => {
    setSaving(true);
    try {
      const payload = { ...d, lastUpdated: new Date().toISOString().split("T")[0] };
      await window.storage.set(STORAGE_KEY, JSON.stringify(payload));
      setLastSaved(new Date().toLocaleTimeString());
      setStatus("SAVED");
    } catch (e) {
      setStatus("SAVE ERROR");
    }
    setSaving(false);
  }, []);

  const update = useCallback((newData) => {
    setData(newData);
    save(newData);
  }, [save]);

  const addNote = () => {
    if (!newNote.trim()) return;
    const d = { ...data, sessionNotes: [{ date: new Date().toISOString().split("T")[0], note: newNote }, ...data.sessionNotes] };
    setNewNote("");
    update(d);
  };

  const resetToSeed = async () => {
    if (!window.confirm("Reset to seed data? This overwrites current saved state.")) return;
    update(INITIAL_STATE);
  };

  if (!data) return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", background: COLORS.bg }}>
      <div style={{ fontFamily: "'IBM Plex Mono'", color: COLORS.accent, fontSize: 13 }}>
        <span className="blink">▊</span> LOADING JOURNAL...
      </div>
    </div>
  );

  const totalCost = data.positions.reduce((s, p) => s + p.costBasis, 0);
  const tabs = ["overview", "positions", "orders", "watchlist", "thesis", "instructions", "notes"];

  return (
    <>
      <style>{css}</style>
      <div style={{ minHeight: "100vh", background: COLORS.bg, padding: "16px" }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20, paddingBottom: 16, borderBottom: `1px solid ${COLORS.border}` }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: COLORS.green }} className="pulse" />
              <span style={{ fontFamily: "'IBM Plex Mono'", fontSize: 15, fontWeight: 600, color: COLORS.textBright, letterSpacing: "0.06em" }}>FUND JOURNAL</span>
              <span style={{ fontFamily: "'IBM Plex Mono'", fontSize: 11, color: COLORS.textDim }}>// {data.fund.account}</span>
            </div>
            <div style={{ marginTop: 4, display: "flex", gap: 12 }}>
              <Label>{data.fund.broker}</Label>
              <Label>·</Label>
              <Label>{data.fund.location}</Label>
              <Label>·</Label>
              <Label>Updated {data.lastUpdated}</Label>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {lastSaved && <Label>Saved {lastSaved}</Label>}
            <span className={`badge ${status.includes("ERROR") ? "badge-red" : status === "SAVED" ? "badge-green" : "badge-amber"}`}>{saving ? "SAVING..." : status}</span>
            <button className="btn btn-ghost" onClick={resetToSeed} style={{ fontSize: 10 }}>RESET</button>
            <button className="btn btn-primary" onClick={() => save(data)}>SAVE NOW</button>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", borderBottom: `1px solid ${COLORS.border}`, marginBottom: 20, gap: 4 }}>
          {tabs.map(t => (
            <button key={t} className={`tab-btn ${activeTab === t ? "active" : ""}`} onClick={() => setActiveTab(t)}>
              {t.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="fade-in">

          {/* OVERVIEW TAB */}
          {activeTab === "overview" && (
            <div>
              {/* Fund Stats */}
              <div className="grid-3" style={{ marginBottom: 16 }}>
                {[
                  { label: "Net Liquidity", val: `$${(data.fund.netLiquidity/1000).toFixed(1)}K`, color: COLORS.green },
                  { label: "Cash Available", val: `$${(data.fund.cash/1000).toFixed(1)}K`, color: COLORS.textBright },
                  { label: "Daily P&L", val: `+$${data.fund.dailyPnL}`, color: COLORS.green },
                  { label: "Unrealized P&L", val: `+$${data.fund.unrealizedPnL}`, color: COLORS.green },
                  { label: "Positions", val: data.positions.length, color: COLORS.textBright },
                  { label: "Pending Orders", val: data.pendingOrders.length, color: COLORS.accent },
                ].map(s => (
                  <div key={s.label} className="card-sm" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Label>{s.label}</Label>
                    <Val color={s.color}>{s.val}</Val>
                  </div>
                ))}
              </div>

              {/* Thesis Banner */}
              <div className="card" style={{ marginBottom: 16, borderColor: COLORS.accent, borderLeftWidth: 3 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                  <Label style={{ color: COLORS.accent }}>MASTER THESIS</Label>
                  <div style={{ display: "flex", gap: 8 }}>
                    <span className="badge badge-red">ACTIVE CONFLICT</span>
                    <span className="badge badge-amber">THESIS INTACT</span>
                  </div>
                </div>
                <div style={{ fontFamily: "'IBM Plex Mono'", fontSize: 13, fontWeight: 600, color: COLORS.accent, marginBottom: 8 }}>{data.thesis.title}</div>
                <div style={{ fontSize: 12, color: COLORS.textDim, lineHeight: 1.6 }}>{data.thesis.summary}</div>
                <hr className="divider" />
                <div style={{ display: "flex", gap: 24 }}>
                  <div><Label>WTI</Label> <Val color={COLORS.red} size={12}>${data.thesis.oilWTI}</Val></div>
                  <div><Label>Brent</Label> <Val color={COLORS.red} size={12}>${data.thesis.oilBrent}</Val></div>
                  <div><Label>Gold</Label> <Val size={12}>${data.thesis.goldPrice}</Val></div>
                  <div><Label>Hormuz</Label> <Val color={COLORS.red} size={12}>{data.thesis.hormuzStatus}</Val></div>
                </div>
              </div>

              {/* Ceasefire Filter */}
              <div className="card" style={{ marginBottom: 16, background: "rgba(239,68,68,0.05)", borderColor: "rgba(239,68,68,0.3)" }}>
                <Label style={{ color: "#ef4444" }}>⚠ CEASEFIRE FILTER — STANDING INSTRUCTION</Label>
                <div style={{ marginTop: 8, fontFamily: "'IBM Plex Mono'", fontSize: 11, color: "#ef8888", lineHeight: 1.7 }}>{data.thesis.ceasefireFilter}</div>
              </div>

              {/* Catalyst Calendar */}
              <SectionHeader>CATALYST CALENDAR</SectionHeader>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {data.thesis.keyDates.map((d, i) => (
                  <div key={i} className="card-sm" style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <Val size={11} color={COLORS.accent}>{d.date}</Val>
                    <div style={{ flex: 1, fontSize: 12, color: COLORS.text }}>{d.event}</div>
                    <span className={`badge ${d.priority === "CRITICAL" ? "badge-red" : d.priority === "HIGH" ? "badge-amber" : "badge-grey"}`}>{d.priority}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* POSITIONS TAB */}
          {activeTab === "positions" && (
            <div>
              <SectionHeader>LIVE POSITIONS — {data.positions.length} HOLDINGS</SectionHeader>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {data.positions.map(p => (
                  <div key={p.ticker} className="card" style={{ borderLeftWidth: p.flag ? 2 : 1, borderLeftColor: p.flag ? COLORS.accent : COLORS.border }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <Val size={15}>{p.ticker}</Val>
                        <span style={{ fontSize: 12, color: COLORS.textDim }}>{p.name}</span>
                        <span className="badge badge-grey">{p.shares} shares</span>
                      </div>
                      <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                        <div style={{ textAlign: "right" }}>
                          <Label>AVG</Label> <Val size={12}>${p.avgPrice}</Val>
                        </div>
                        <div style={{ textAlign: "right" }}>
                          <Label>COST</Label> <Val size={12}>${p.costBasis.toLocaleString()}</Val>
                        </div>
                        {p.target && <div style={{ textAlign: "right" }}>
                          <Label>TARGET</Label> <Val size={12} color={COLORS.green}>${p.target}</Val>
                        </div>}
                        {p.stopPrice && <div style={{ textAlign: "right" }}>
                          <Label>STOP</Label> <Val size={12} color={COLORS.red}>${p.stopPrice}</Val>
                        </div>}
                      </div>
                    </div>
                    <div style={{ fontSize: 12, color: COLORS.textDim, lineHeight: 1.5 }}>{p.thesis}</div>
                    {p.flag && <div style={{ marginTop: 8, fontFamily: "'IBM Plex Mono'", fontSize: 11, color: COLORS.accent, padding: "4px 8px", background: "rgba(232,160,32,0.08)", borderRadius: 3 }}>▶ {p.flag}</div>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ORDERS TAB */}
          {activeTab === "orders" && (
            <div>
              <SectionHeader>PENDING ORDERS — US OPEN 5:30PM UAE</SectionHeader>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {data.pendingOrders.map(o => (
                  <div key={o.ticker} className="card">
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <span className={`badge ${o.action === "BUY" ? "badge-green" : "badge-red"}`}>{o.action}</span>
                        <Val size={15}>{o.ticker}</Val>
                        <span style={{ fontSize: 12, color: COLORS.textDim }}>{o.name}</span>
                      </div>
                      <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                        <div><Label>QTY</Label> <Val size={12}>{o.qty}</Val></div>
                        <div><Label>LIMIT</Label> <Val size={12} color={COLORS.accent}>{typeof o.limitPrice === "number" ? `$${o.limitPrice}` : o.limitPrice}</Val></div>
                        <div><Label>TIF</Label> <Val size={12}>{o.tif}</Val></div>
                        {o.stopPrice && <div><Label>STOP</Label> <Val size={12} color={COLORS.red}>${o.stopPrice}</Val></div>}
                        {o.target && <div><Label>TARGET</Label> <Val size={12} color={COLORS.green}>${o.target}</Val></div>}
                        <span className="badge badge-blue">{o.status}</span>
                      </div>
                    </div>
                    <div style={{ fontSize: 12, color: COLORS.textDim }}>{o.note}</div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: 20, padding: 16, background: "rgba(34,197,94,0.05)", border: "1px solid rgba(34,197,94,0.2)", borderRadius: 6 }}>
                <Label style={{ color: COLORS.green }}>COMPLETED TODAY</Label>
                <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 4 }}>
                  {["CODA Stop $9.50 GTC ✅", "AMPX Stop $14.00 GTC ✅", "AMPX Sell $32.00 GTC ✅", "ONDS Stop $8.50 GTC ✅", "PLTR sell order CANCELLED — Maven POR", "KTOS sell order CANCELLED — Orbit deal closing"].map(c => (
                    <div key={c} style={{ fontFamily: "'IBM Plex Mono'", fontSize: 11, color: COLORS.green }}>✓ {c}</div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* WATCHLIST TAB */}
          {activeTab === "watchlist" && (
            <div>
              <SectionHeader>US WATCHLIST</SectionHeader>
              <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 24 }}>
                {data.watchlistUS.map(w => (
                  <div key={w.ticker} className="card-sm" style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                    <Val size={13}>{w.ticker}</Val>
                    <span style={{ fontSize: 12, color: COLORS.textDim, flex: 1 }}>{w.name}</span>
                    <span style={{ fontSize: 11, color: COLORS.accent, fontFamily: "IBM Plex Mono" }}>{w.entry}</span>
                    {w.target && <span style={{ fontSize: 11, color: COLORS.green, fontFamily: "IBM Plex Mono" }}>T: ${w.target}</span>}
                    <span style={{ fontSize: 11, color: COLORS.textDim, maxWidth: 300 }}>{w.thesis}</span>
                  </div>
                ))}
              </div>

              <SectionHeader>
                EU / UK WATCHLIST
                <span className={`badge ${data.fund.ibkrEuropeanAccess === "Approved" ? "badge-green" : "badge-amber"}`}>
                  IBKR EU: {data.fund.ibkrEuropeanAccess}
                </span>
              </SectionHeader>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {data.watchlistEU.map((w, i) => (
                  <div key={w.ticker} className="card" style={{ borderLeftWidth: i < 4 ? 3 : 1, borderLeftColor: i < 4 ? COLORS.accent : COLORS.border }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                        {i < 8 && <span className="badge badge-amber">P{i+1}</span>}
                        <Val size={14}>{w.ticker}</Val>
                        <span style={{ fontSize: 12, color: COLORS.textDim }}>{w.name}</span>
                        <span className="badge badge-grey">{w.exchange}</span>
                        <span style={{ fontFamily: "'IBM Plex Mono'", fontSize: 10, color: COLORS.textDim }}>{w.ibkr}</span>
                      </div>
                      <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                        {w.current && <div><Label>NOW</Label> <Val size={12}>{w.current} {w.cur}</Val></div>}
                        <div><Label>ENTRY</Label> <Val size={12} color={COLORS.accent}>{w.entry}</Val></div>
                        {w.target && <div><Label>TARGET</Label> <Val size={12} color={COLORS.green}>{w.target} {w.cur}</Val></div>}
                        {w.upside && <span className="badge badge-green">+{w.upside}%</span>}
                      </div>
                    </div>
                    <div style={{ fontSize: 12, color: COLORS.textDim, marginBottom: 4 }}>{w.thesis}</div>
                    <div style={{ fontFamily: "'IBM Plex Mono'", fontSize: 11, color: COLORS.accent }}>{w.note}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* THESIS TAB */}
          {activeTab === "thesis" && (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <SectionHeader>IRAN WAR THESIS</SectionHeader>
                <button className="btn btn-ghost" onClick={() => { setEditThesis(!editThesis); setThesisDraft(data.thesis.summary); }}>
                  {editThesis ? "CANCEL" : "EDIT"}
                </button>
              </div>

              {editThesis ? (
                <div className="card" style={{ marginBottom: 16 }}>
                  <textarea value={thesisDraft} onChange={e => setThesisDraft(e.target.value)} rows={6} style={{ marginBottom: 8 }} />
                  <button className="btn btn-primary" onClick={() => { update({ ...data, thesis: { ...data.thesis, summary: thesisDraft } }); setEditThesis(false); }}>SAVE THESIS</button>
                </div>
              ) : (
                <div className="card" style={{ marginBottom: 16, borderColor: COLORS.accent, borderLeftWidth: 3 }}>
                  <div style={{ fontFamily: "'IBM Plex Mono'", fontSize: 13, fontWeight: 600, color: COLORS.accent, marginBottom: 12 }}>{data.thesis.title}</div>
                  <div style={{ fontSize: 13, color: COLORS.text, lineHeight: 1.8 }}>{data.thesis.summary}</div>
                </div>
              )}

              <div className="grid-2" style={{ marginBottom: 16 }}>
                <div className="card">
                  <Label>HORMUZ STATUS</Label>
                  <div style={{ marginTop: 8, fontFamily: "'IBM Plex Mono'", fontSize: 12, color: COLORS.red }}>{data.thesis.hormuzStatus}</div>
                </div>
                <div className="card" style={{ background: "rgba(239,68,68,0.05)", borderColor: "rgba(239,68,68,0.3)" }}>
                  <Label style={{ color: "#ef4444" }}>CEASEFIRE FILTER</Label>
                  <div style={{ marginTop: 8, fontFamily: "'IBM Plex Mono'", fontSize: 11, color: "#ef8888", lineHeight: 1.6 }}>{data.thesis.ceasefireFilter}</div>
                </div>
              </div>

              <SectionHeader>KEY MACRO DATA</SectionHeader>
              <div className="grid-3">
                {[
                  { label: "WTI Crude", val: `$${data.thesis.oilWTI}/bbl`, color: COLORS.red, note: "6% drop on ceasefire noise" },
                  { label: "Brent Crude", val: `$${data.thesis.oilBrent}/bbl`, color: COLORS.red, note: "Goldman Q2 target $110" },
                  { label: "Gold Spot", val: `$${data.thesis.goldPrice}/oz`, color: COLORS.textDim, note: "-14.5% from ATH $5,595" },
                ].map(m => (
                  <div key={m.label} className="card">
                    <Label>{m.label}</Label>
                    <div style={{ marginTop: 6 }}><Val size={18} color={m.color}>{m.val}</Val></div>
                    <div style={{ marginTop: 4, fontSize: 11, color: COLORS.textDim }}>{m.note}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* INSTRUCTIONS TAB */}
          {activeTab === "instructions" && (
            <div>
              <SectionHeader>STANDING INSTRUCTIONS — PERMANENT</SectionHeader>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {data.standingInstructions.map(ins => (
                  <div key={ins.id} className="card" style={{ display: "flex", gap: 14 }}>
                    <div style={{ fontFamily: "'IBM Plex Mono'", fontSize: 11, color: COLORS.accent, fontWeight: 600, minWidth: 20 }}>#{ins.id.toString().padStart(2,"0")}</div>
                    <div>
                      <div style={{ fontFamily: "'IBM Plex Mono'", fontSize: 12, fontWeight: 600, color: COLORS.textBright, marginBottom: 4 }}>{ins.title}</div>
                      <div style={{ fontSize: 12, color: COLORS.textDim, lineHeight: 1.6 }}>{ins.body}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* NOTES TAB */}
          {activeTab === "notes" && (
            <div>
              <SectionHeader>SESSION NOTES</SectionHeader>
              <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
                <input value={newNote} onChange={e => setNewNote(e.target.value)} placeholder="Add session note..." onKeyDown={e => e.key === "Enter" && !e.shiftKey && addNote()} />
                <button className="btn btn-primary" onClick={addNote} style={{ whiteSpace: "nowrap" }}>ADD NOTE</button>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {data.sessionNotes.map((n, i) => (
                  <div key={i} className="card">
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                      <Label>{n.date}</Label>
                      <button className="btn btn-danger" style={{ padding: "2px 8px", fontSize: 10 }} onClick={() => {
                        const notes = data.sessionNotes.filter((_, j) => j !== i);
                        update({ ...data, sessionNotes: notes });
                      }}>DELETE</button>
                    </div>
                    <div style={{ fontSize: 12, color: COLORS.text, lineHeight: 1.7 }}>{n.note}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div style={{ marginTop: 24, paddingTop: 12, borderTop: `1px solid ${COLORS.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Label>FUND JOURNAL v1 // UAE-BASED $100K IBKR PRO // USE AT NEXT SESSION: OPEN THIS ARTIFACT FIRST</Label>
          <div style={{ display: "flex", gap: 8 }}>
            <span className="badge badge-amber">EU ACCESS: {data.fund.ibkrEuropeanAccess}</span>
            <span className="badge badge-red">CONFLICT: ACTIVE</span>
          </div>
        </div>

      </div>
    </>
  );
}
