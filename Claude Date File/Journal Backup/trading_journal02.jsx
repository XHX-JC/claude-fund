import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "fund_journal_v1";

const INITIAL_STATE = {
  lastUpdated: "2026-03-26",
  fund: {
    account: "U24936508",
    netLiquidity: 99700,
    cash: 28736,
    availableFunds: 83700,
    dailyPnL: 163,
    unrealizedPnL: -702,
    broker: "IBKR Pro",
    baseCurrency: "USD",
    location: "UAE",
    ibkrEuropeanAccess: "APPROVED — March 26 2026"
  },
  thesis: {
    title: "IRAN HOLDS HORMUZ — OIL STAYS ELEVATED",
    summary: "Master thesis: Iran controls Strait of Hormuz, oil stays structurally elevated. Exit triggers are OIL-BASED not ceasefire-based. 5-day pause expires 28-31 March — oil rebound catalyst imminent. Iran rejected 15-point US ceasefire plan. Goldman Q2 Brent target $110. QatarEnergy Ras Laffan struck March 2. Europe gas storage 46 bcm — lowest since 2022.",
    oilWTI: 87.68,
    oilBrent: 97.98,
    goldPrice: 4510,
    hormuzStatus: "Functionally closed — 5 ships/day only. 200+ tankers anchored outside. Iran demanding toll fees.",
    ceasefireFilter: "DISREGARD all US-led ceasefire news unless Iranian side CONFIRMS. Iran rejected 15-point peace plan. Hormuz sovereignty demand = non-starter. Thesis 100% intact.",
    keyDates: [
      { date: "27 Mar", event: "CCL Q1 Earnings pre-market — SOLD CCL ahead of earnings", priority: "MONITOR" },
      { date: "28-31 Mar", event: "Trump 5-day pause expires — IAG re-entry window $10K reserved", priority: "CRITICAL" },
      { date: "End Mar", event: "KTOS Orbit Technologies acquisition close", priority: "HIGH" },
      { date: "30 Mar", event: "RR.L GTD expires — confirm fill or resubmit", priority: "HIGH" },
      { date: "06 May", event: "R3NK Q1 Earnings", priority: "HIGH" },
      { date: "07 May", event: "AMPX Q1 Earnings", priority: "MEDIUM" },
      { date: "11 May", event: "PLTR Q1 Earnings", priority: "HIGH" },
      { date: "13 May", event: "VST + PDYN Earnings", priority: "MEDIUM" },
      { date: "23 Jun", event: "AVAV Q1 Earnings", priority: "HIGH" },
      { date: "30 Jul", event: "RR.L H1 Earnings", priority: "HIGH" }
    ]
  },
  positions: [
    { ticker: "AMPX", name: "Amprius Technologies",   shares: 168,  avgPrice: 18.11,   costBasis: 3042,  stop: "GTC $14.00 ✅", stopPrice: 14.00, target: 32,    thesis: "Silicon anode batteries — military/commercial UAV power. Q1 earnings May 7.", flag: "Stop $14 GTC live. Limit sell $32 GTC live." },
    { ticker: "AVAV", name: "AeroVironment",           shares: 25,   avgPrice: 199.00,  costBasis: 4975,  stop: "GTC $165 ✅",   stopPrice: 165,   target: 311,   thesis: "Switchblade loitering munitions validated in Iran theatre. $4.6B backlog. BlueHalo SCAR only 5% of revenue. Raymond James upgraded Mar 23.", flag: "NEW POSITION Mar 26. Small size intentional. Stop $165 GTC live." },
    { ticker: "CODA", name: "Coda Octopus Group",      shares: 416,  avgPrice: 12.01,   costBasis: 4994,  stop: "GTC $9.50 ✅",  stopPrice: 9.50,  target: 22,    thesis: "Naval sonar/underwater surveillance. Iran naval threat = demand for undersea ISR.", flag: "Stop $9.50 GTC live." },
    { ticker: "KTOS", name: "Kratos Defense",          shares: 100,  avgPrice: 81.01,   costBasis: 8101,  stop: "Mental $70",    stopPrice: 70,    target: 102,   thesis: "Counter-UAS + Orbit Technologies acquisition closing end-March. Dubai attacks confirm demand.", flag: null },
    { ticker: "LEU",  name: "Centrus Energy",          shares: 13,   avgPrice: 188.87,  costBasis: 2455,  stop: "None",          stopPrice: null,  target: 283,   thesis: "HALEU monopoly — nuclear energy structural demand. European energy crisis accelerating nuclear revival.", flag: null },
    { ticker: "ONDS", name: "Ondas Holdings",          shares: 250,  avgPrice: 10.91,   costBasis: 2726,  stop: "GTC $8.50 ✅",  stopPrice: 8.50,  target: 18,    thesis: "Drone/AI autonomy — Palantir partnership confirmed Mar 12. Wait Q1 May results.", flag: "⚠️ 21 insider sales, 0 buys. 3x 424B7 filings Mar 16-18. DO NOT ADD." },
    { ticker: "PDYN", name: "Palladyne AI",            shares: 500,  avgPrice: 6.60,    costBasis: 3298,  stop: "None — set $5", stopPrice: 5.00,  target: 13,    thesis: "Embodied AI autonomy + AFRL swarming contract + Palantir partnership. 2026 guidance $24-27M.", flag: "⚠️ No stop in place — recommend setting $5.00 GTC. Very early stage, negative FCF." },
    { ticker: "PLTR", name: "Palantir Technologies",   shares: 49,   avgPrice: 161.63,  costBasis: 7920,  stop: "Mental $130",   stopPrice: 130,   target: 194,   thesis: "Maven AI = permanent DoD Program of Record. Golden Dome $185B software role confirmed. Iran war = active deployment.", flag: "Down 5.1% / -$406. HOLD — thesis strengthened not weakened. Two DoD catalysts. Q1 earnings May 11." },
    { ticker: "R3NK", name: "RENK Group AG",           shares: 80,   avgPrice: 51.51,   costBasis: 4121,  stop: "Mental €41",    stopPrice: 41,    target: 77,    thesis: "Leopard 2 transmissions + naval + Iran ME expansion. €6.68B record backlog. 42% off ATH. May 6 earnings.", flag: "NEW POSITION Mar 26. Filled €51.51 at Xetra open. EU access approved." },
    { ticker: "RCL",  name: "Royal Caribbean",        shares: 36,   avgPrice: 273.57,  costBasis: 9848,  stop: "Mental",        stopPrice: null,  target: 395,   thesis: "Cruise — watch WTI. Exit if WTI closes below $85 two consecutive days.", flag: "REASSESS — same fuel cost risk as CCL. Monitor." },
    { ticker: "RR",   name: "Rolls-Royce Holdings",   shares: 150,  avgPrice: 1182,    costBasis: 1774,  stop: "Mental 950p",   stopPrice: 950,   target: 1395,  thesis: "Defence aero engines + nuclear submarine propulsion AUKUS + SMR division. Long-term hold. UBS target 1,625p.", flag: "NEW POSITION Mar 26. Filled 1,175p GTD. Ex-div Apr 23 — hold before this date." },
    { ticker: "SHLD", name: "Global X Defense ETF",   shares: 69,   avgPrice: 72.03,   costBasis: 4970,  stop: "Mental",        stopPrice: null,  target: null,  thesis: "Defence ETF — direct beneficiary of ongoing conflict.", flag: null },
    { ticker: "UEC",  name: "Uranium Energy Corp",    shares: 206,  avgPrice: 13.78,   costBasis: 2838,  stop: "None",          stopPrice: null,  target: 22,    thesis: "US uranium producer — nuclear energy demand. BUT: negative EBITDA -$103M, no FCF.", flag: "⚠️ REASSESS vs LEU. Down 4.2%. Pre-revenue junior vs LEU which is profitable HALEU monopoly. Consider exit." },
    { ticker: "VST",  name: "Vistra Corp",            shares: 53,   avgPrice: 150.57,  costBasis: 7980,  stop: "Mental",        stopPrice: null,  target: 234,   thesis: "Nuclear/AI power — completely unaffected by Iran noise. Earnings May 13.", flag: null }
  ],
  pendingOrders: [
    { ticker: "CCJ",  name: "Cameco Corp",    action: "BUY",  qty: 49,  limitPrice: 104.00, tif: "GTC", stopPrice: null, target: 136, status: "GTC LIVE",   note: "Stock at ~$111. $7 above limit. Do not chase. Patience — uranium thesis intact. Christensen Ranch catalyst." },
    { ticker: "AVAV", name: "AeroVironment",  action: "SELL", qty: 25,  limitPrice: null,   tif: "GTC", stopPrice: 165,  target: 311, status: "STOP LIVE",  note: "Stop $165 GTC active. Entry ~$199. Max loss ~$850. Earnings Jun 23 is primary catalyst." },
    { ticker: "AMPX", name: "Amprius Tech",   action: "SELL", qty: 168, limitPrice: 32.00,  tif: "GTC", stopPrice: 14,   target: 32,  status: "BOTH LIVE",  note: "Stop $14 GTC and limit $32 GTC both active. Q1 earnings May 7." },
    { ticker: "CODA", name: "Coda Octopus",   action: "SELL", qty: 416, limitPrice: null,   tif: "GTC", stopPrice: 9.50, target: 22,  status: "STOP LIVE",  note: "Stop $9.50 GTC active." },
    { ticker: "ONDS", name: "Ondas Holdings", action: "SELL", qty: 250, limitPrice: null,   tif: "GTC", stopPrice: 8.50, target: 18,  status: "STOP LIVE",  note: "Stop $8.50 GTC active. Do not add." }
  ],
  standingInstructions: [
    { id: 1,  title: "Price Verification — MANDATORY",   body: "NEVER quote a stock price from a search snippet without checking the source publication date. Use web_fetch on Yahoo Finance quote page directly for every price recommendation. State the verified price and timestamp explicitly. If fetch fails, state 'unverified — check IBKR before acting'." },
    { id: 2,  title: "Analyst Data Verification",        body: "Before citing analyst targets or ratings, verify the note date. A target listed as 'recent' may be months old. Never construct a bullish narrative from a sequence of data points without confirming each is current." },
    { id: 3,  title: "State Tracking — No Repetition",   body: "Before adding any item to pending orders or watchlist, check whether it already appears in the current session. R3NK filled Mar 26 — never list as pending again. CCL sold Mar 26 — never list as position again." },
    { id: 4,  title: "Evidence Matching",                body: "The conclusion must match the evidence cited. If consensus target equals current price, do not describe as 'asymmetric'. If data is mixed, present it as mixed. No promotional language." },
    { id: 5,  title: "Iran Ceasefire Filter",            body: "Disregard ALL US-led ceasefire news unless Iranian side CONFIRMS. Iran rejected 15-point plan. Hormuz sovereignty demand is a non-starter for US. Thesis intact until Iran confirms." },
    { id: 6,  title: "Dilution Flagging",                body: "Every new recommendation must check: recent share offerings, insider selling past 90 days, FCF status, dilution %. Flag prominently before recommending." },
    { id: 7,  title: "10-Min Pre-Open Rule",             body: "Place Iran-sensitive orders within 10 minutes of US open (5:30PM UAE). European markets: 12:00-19:30 UAE." },
    { id: 8,  title: "IAG $10K Reserve",                 body: "$10,000 reserved for IAG re-entry on oil spike when 5-day pause expires 28-31 March. Do not deploy this cash for anything else." },
    { id: 9,  title: "European Scan Mandate",            body: "Every full scan MUST include R3NK, HAG, LDO, HO, CHG, BA, BAB, CHRT, RR.L, THEON, SAF and broader EU/UK small-cap defence universe." },
    { id: 10, title: "Nuclear Scan Mandate",             body: "Every full scan includes: Germany legal ban movement, EU SMR funding, RR.L SMR contracts, LNG storage TTF prices, EDF milestones, BWXT contract wins." },
    { id: 11, title: "UEC Review Flag",                  body: "UEC is a pre-revenue junior with negative EBITDA -$103M. LEU is the superior nuclear expression — profitable HALEU monopoly. Consider exiting UEC on any bounce." },
    { id: 12, title: "PDYN Stop Flag",                   body: "PDYN has no stop in place. Recommend setting GTC stop at $5.00. Very early stage company, negative margins." },
    { id: 13, title: "ASTS Watchlist Scan",              body: "Every full scan MUST check ASTS: (1) BlueBird satellite launch confirmations — any new launches? (2) 45-satellite milestone progress — on track? (3) Commercial service activation news. (4) New MNO partner signings. (5) Additional equity or convertible note raises — dilution flag. (6) Insider buying vs selling balance. (7) Stock price — if drops to $80-85 range, flag for potential entry at 1% portfolio size max with $65 stop. DO NOT enter above $95. Added to watchlist Mar 26 at $93.40." },
    { id: 14, title: "Full Scan Checklist",              body: "Every full scan covers ALL of the following: (A) PORTFOLIO: all live positions news + stop review. (B) IRAN/OIL: WTI/Brent prices, Hormuz status, ceasefire signals — only from Iranian side. (C) EUROPEAN DEFENCE: R3NK, HAG, LDO, HO, CHG, BA, BAB, CHRT, RR.L, THEON, SAF — contract wins, earnings, entry points. (D) NUCLEAR: Germany legal ban movement, EU SMR funding, RR.L SMR, LNG/TTF storage, EDF, BWXT. (E) WATCHLIST US: IAG oil spike trigger, BKSY earnings, GOLD price, ASTS launch progress. (F) CONGRESS TRADING: QuiverQuant and CapitolTrades for Armed Services/Energy committee defence buys. (G) MACRO: Fed rates, oil inflation, tariff developments. (H) ERRORS CHECK: verify all prices via web_fetch before any recommendation." }
  ],
  watchlistUS: [
    { ticker: "IAG",   name: "IAG (ICAGY)",        exchange: "OTC",    current: null,  entry: "Re-enter on oil spike 28-31 Mar when pause expires", target: null,  status: "ACTIVE — $10K reserved", thesis: "$10,000 reserved. Iran pause expires = oil spike = airline re-entry." },
    { ticker: "BKSY",  name: "BlackSky Tech",       exchange: "NYSE",   current: 26,    entry: "22-24 on pullback",                                   target: 40,    status: "WATCH", thesis: "Guidance cut $120-145M to $105-130M. Wait for Q1 May earnings beat to re-rate." },
    { ticker: "GOLD",  name: "Barrick Mining",      exchange: "NYSE",   current: null,  entry: "Wait gold reclaims $5,000",                           target: null,  status: "WATCH", thesis: "Gold paradox: war = safe haven BUT energy inflation keeps Fed on hold suppressing gold. 18/24 analysts Buy. Wait." },
    {
      ticker: "ASTS",
      name: "AST SpaceMobile Inc",
      exchange: "NASDAQ",
      status: "WATCH — DO NOT BUY YET",
      addedDate: "2026-03-26",
      currentPrice: 93.40,
      entryTarget: "80-85 on pullback — near consensus analyst target",
      stopIfEntered: 65,
      positionSizeMax: "1% of portfolio (~$1,000) — optionality position only",
      analystTargets: { low: 41.20, consensus: 88.53, high: 139, deutscheBank: 139, scotiabank: 41.20 },
      nextEarnings: "2026-05-11",
      thesis: "Building first space-based cellular broadband network accessible by unmodified smartphones. 50+ MNO partners covering ~3B potential subscribers. $1.2B+ contracted revenue commitments. $3.9B liquidity — no near-term funding risk. Dual-use military contract with US Space Development Agency $30M. TELUS deal March 2026. Target 45-60 satellites in orbit by end 2026.",
      bullCase: "If commercial launch succeeds on schedule, category-creating technology at global scale. Deutsche Bank $139 target. SpaceX IPO momentum lifts entire sector.",
      bearCase: "476x price-to-sales. Revenue $70.9M vs $37B market cap. Beta 2.78 — extremely volatile. Launch delays already shown. CTO sold 40,000 shares March 23. Starlink competition. Every delay pushes commercial revenue out further.",
      scanTriggers: [
        "BlueBird satellite launch confirmations — check every full scan",
        "45-satellite milestone progress — flag if behind schedule by Q3 2026",
        "Commercial service activation announcements",
        "New MNO partner signings",
        "Additional equity/convertible note raises — dilution flag",
        "Insider buying vs selling balance",
        "Any stock price drop below $80 — reassess entry"
      ],
      exitTrigger: "If 45-satellite target clearly not on track by Q3 2026, remove from watchlist",
      flags: "⚠️ CTO sold 40K shares Mar 23. President sold 47K shares. Insider selling pattern. Do NOT enter above $95. Do NOT size above 1% portfolio. This is optionality only — not conviction.",
      horizon: "12-18 months — needs satellite launch confirmation and first commercial revenue"
    }
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
    { date: "2026-03-26", note: "FULL SESSION SUMMARY — Mar 26 2026. IBKR EU ACCESS APPROVED. FILLS TODAY: RR.L 150 shares @ 1,175p GTD ✅ | R3NK 80 shares @ €51.51 market ✅. SUBMITTED TONIGHT: AVAV 25 shares market + stop $165 GTC ✅ | CCL 240 shares market sell ✅ (took +$133 profit ahead of earnings — Iran war fuel cost risk). STILL WORKING: CCJ BUY 49 @ $104 GTC. POSITIONS NOW LIVE: AMPX/AVAV/CODA/KTOS/LEU/ONDS/PDYN/PLTR/R3NK/RCL/RR.L/SHLD/UEC/VST. Total unrealised approx -$702. DECISIONS: (1) CCL SOLD — small profit taken ahead of Q1 earnings tomorrow. Iran fuel cost risk outweighs potential upside. (2) AVAV 25 shares — small position. Entry ~$199, stop $165, target $311. Earnings Jun 23. (3) CTRA — SKIPPED. Stock at $35.18 vs consensus $35.17 — no asymmetry. Analyst data was unreliable in initial assessment. (4) R3NK — filled €51.51 this morning. Thesis: €6.68B backlog, 42% off ATH, May 6 earnings. (5) RR.L — filled 1,175p. Long-term hold: defence engines + AUKUS + SMR option. ETF RESEARCH: WDEF approved ($5.6B AUM WisdomTree) — buy when confirmed on IBKR LSE. ARMY rejected (€191M AUM, closure risk). WDEF higher priority. PLTR STATUS: Down -$406 / -5.1%. Golden Dome software role confirmed with Anduril ($185B programme). Maven AI permanent DoD Program of Record. Thesis stronger not weaker. Hold. Mental stop $130 stands. Q1 earnings May 11 is rerating catalyst. UEC FLAG: Consider exit — negative EBITDA -$103M vs LEU which is profitable HALEU monopoly. PDYN FLAG: No stop in place — recommend $5.00 GTC. IAG RESERVE: $10K reserved, untouched. Pause expires 28-31 Mar. ERRORS THIS SESSION: (1) LNG price quoted $205 vs actual $284 — stale search snippet used without date verification. (2) CTRA analyst targets — Argus note described as upgrade was actually a downgrade. Never construct narrative from data without verifying each source date. (3) R3NK listed as pending after confirming filled — state tracking failure in long session. (4) Claude Code setup — recommended wrong install script for Windows before checking. (5) CTRA described as 'clearest asymmetric setup' — conclusion not supported by evidence (stock at consensus target). MACRO: Mediators Turkey/Egypt/Pakistan attempting US-Iran talks. US presented 15-point plan. Iran has NOT confirmed. Thesis intact. Pause expiry 28-31 Mar remains primary oil catalyst. TOMORROW: Confirm AVAV fill | Watch CCL earnings (no longer held) | Watch RCL reaction to CCL | IAG window opens 28-31 Mar." },
    { date: "2026-03-25", note: "END OF DAY SUMMARY — Mar 25 2026. FILLS: PDYN 500 @ ~$6.56 market ✅ | UEC 206 @ $14.00 ✅ | AMPX 168 @ $18.50 ✅ | CODA 416 @ $12.00 ✅. NOT FILLED: CTRA Day order expired. CCJ GTC $104 still working. ORDERS: CODA stop $9.50 GTC ✅ | AMPX stop $14.00 GTC ✅ | AMPX sell $32 GTC ✅ | ONDS stop $8.50 GTC ✅. KEY DECISIONS: PLTR hold — Maven POR confirmed. KTOS hold — Orbit deal closing. MACRO: Iran rejected ceasefire. Thesis 100% intact. IAG $10K reserved. WTI $87.68 / Brent $97.98. Goldman Q2 target $110 unchanged." }
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
