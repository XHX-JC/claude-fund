// CLAUDE FUND - TRADING JOURNAL S76
// Date: Monday 22 June 2026 — First live NYSE session after 4-day gap (Thu 18 Jun + Juneteenth Fri + weekend)
// Prev journal: trading_journal84.jsx (S73) | S74/S75 research-only, captured in DECISION_REGISTER + LESSONS_LEARNED
// Next: trading_journal86.jsx
// Session type: Live trading day — 4 new positions opened, major sector research (critical minerals, water/data centers),
// multiple document reviews (PATH/NOK/LUMN/ONDS/AMPX; GLW/GFS/NVTS), CRDO Stage 1 complete, AGI flagged.
// ===================================================================

const journalS76 = {

  session: "S76",
  date: "2026-06-22",
  dayOfWeek: "Monday",
  sessionType: "Live trading day — NYSE open 17:30 UAE. First session after 4-day gap including Juneteenth holiday.",
  marketsOpen: true,

  // ── TIME / DATE PROTOCOL ─────────────────────────────────────────────────────
  timeCheck: {
    uaeAtOpen: "10:08",
    utcAtOpen: "06:08",
    nyseOpenedAt: "17:30 UAE",
    lseXetraOpenedAt: "11:00 UAE",
    holidayCheck: "Confirmed: no US market holiday June 22. June 19 (Juneteenth) confirmed as holiday causing 4-day gap.",
    dateConflictCheck: "System prompt date and bash clock both showed Monday 22 June 2026 — CONFIRMED MATCH, no conflict.",
  },

  // ── IBKR RECONCILIATION AT CLOSE ─────────────────────────────────────────────
  ibkrClose: {
    netLiquidation: "$95,354.44",
    grossPositionValue: "$37,047.37",
    totalCashValue: "$58,211.91",
    leverage: "0.39",
    netLiqChangeVsOpen: "-$219.73 (NLV at session open was $95,574.17)",
  },

  // ── POSITIONS AT CLOSE ────────────────────────────────────────────────────────
  positions: [
    {
      ticker: "HNR1",
      shares: 40,
      avgCost: "EUR224.71",
      lastPrice: "EUR235.40",
      marketValue: "EUR9,416",
      unrealisedPnl: "+EUR427.51 (+4.8%)",
      dailyPnl: "+EUR48.00",
      stop: "EUR229.60 GTC STANDALONE",
      strategy: "A",
      notes: "Manual cancel required on exit. One stop only, confirmed REPLACED status.",
    },
    {
      ticker: "XSG",
      shares: 40000,
      avgCost: "1.5075p",
      lastPrice: "1.45p",
      marketValue: "GBP580",
      unrealisedPnl: "-GBP23 (-3.8%)",
      dailyPnl: "~0",
      stop: "None",
      strategy: "A",
      notes: "Micro position, no change.",
    },
    {
      ticker: "ZS",
      shares: 80,
      avgCost: "$122.613",
      lastPrice: "$126.48",
      marketValue: "$10,118",
      unrealisedPnl: "+$309.40 (+3.1%)",
      dailyPnl: "+$309.40",
      stop: "$114.00 GTC STOP (REPLACED status confirmed)",
      strategy: "A",
      notes: "NEW this session. Filled at NYSE open 09:30:01 EDT at $122.60 (below $125.50 limit). Strong first-session performance.",
    },
    {
      ticker: "KRMN",
      shares: 153,
      avgCost: "$49.057",
      lastPrice: "$46.35",
      marketValue: "$7,092",
      unrealisedPnl: "-$414.10 (-5.5%)",
      dailyPnl: "-$414.10",
      stop: "$44.50/$44.20 GTC STOP LIMIT (REPLACED status confirmed)",
      strategy: "A",
      notes: "NEW this session. Filled at NYSE open 09:30:01 EDT at $49.05. Post-holiday gap selling pushed price from ~$50 open high to $46.35 close. Well above stop. Greenshoe clears ~June 27.",
    },
    {
      ticker: "AIRJ",
      shares: 900,
      avgCost: "$4.955",
      lastPrice: "$4.84",
      marketValue: "$4,356",
      unrealisedPnl: "-$103.50 (-2.3%)",
      dailyPnl: "-$103.50",
      stop: "$3.85 GTC STOP (REPLACED status confirmed)",
      strategy: "SPECULATIVE (two-tranche structure)",
      notes: "NEW this session. Filled at NYSE open 09:30:02 EDT at $4.95 (below $5.14 limit). Max loss at fill: $990 (override from $1,161 at limit — override documented below). Tranche 2 trigger: named commercial agreement with data center operator.",
    },
    {
      ticker: "UAMY",
      shares: 526,
      avgCost: "$7.645",
      lastPrice: "$7.54",
      marketValue: "$3,966",
      unrealisedPnl: "-$55.23 (-1.1%)",
      dailyPnl: "-$55.23",
      stop: "$6.90 GTC STOP (REPLACED status confirmed)",
      strategy: "A",
      notes: "NEW this session. Filled at NYSE open 09:30:00 EDT in two partial fills (473sh + 53sh, both at $7.64, below $7.90 limit). Max loss at fill: $389. DLA antimony ramp thesis. P24 gate August 5.",
    },
  ],

  // ── TODAY'S FILLS (confirmed via get_account_trades) ─────────────────────────
  trades: [
    { ticker: "ZS",   side: "BUY", shares: 80,  price: "$122.60", time: "09:30:01 EDT", exchange: "NASDAQ", commission: "$1.00", net: "$9,808.00" },
    { ticker: "KRMN", side: "BUY", shares: 153, price: "$49.05",  time: "09:30:01 EDT", exchange: "NYSE",   commission: "$1.00", net: "$7,504.65" },
    { ticker: "AIRJ", side: "BUY", shares: 900, price: "$4.95",   time: "09:30:02 EDT", exchange: "NASDAQ", commission: "$4.50", net: "$4,455.00" },
    { ticker: "UAMY", side: "BUY", shares: 526, price: "$7.64",   time: "09:30:00 EDT", exchange: "NYSE",   commission: "$2.63", net: "$4,018.64", note: "Two partial fills: 473sh + 53sh, same price" },
  ],

  // ── ORDER SIZING OVERRIDES — DOCUMENTED ──────────────────────────────────────
  sizingOverrides: [
    {
      ticker: "ZS",
      tier: "HIGH CONVICTION (80sh vs standard 45sh)",
      maxLossAtLimit: "$920 (80 × ($125.50 - $114.00))",
      maxLossAtFill: "$688 (80 × ($122.60 - $114.00))",
      reason: "James decision at session. Strongest conviction new entry of the session — 35-47 analysts unanimous Buy, zero Sell ratings, 35% below consensus. Macro concern (banks signalling defensive repositioning) was cited as reason NOT to use high-conviction tier initially, then James upgraded ZS from 45sh to 80sh as the highest-conviction entry.",
      rr: "4.5x to $175, 6.3x to $194 consensus, 8.1x to $214 bull — all clear 3:1 floor.",
    },
    {
      ticker: "AIRJ",
      tier: "OVERRIDE — $990 max loss at fill (above $900 high-conviction cap)",
      maxLossAtLimit: "$1,161 (900 × ($5.14 - $3.85)) — override documented S76",
      maxLossAtFill: "$990 (900 × ($4.95 - $3.85)) — improvement at fill",
      reason: "James explicit override. High conviction on water/data center regulatory thesis — 69+ local government bans on data center projects, 27 states advancing legislation, AIRJ the only listed company with AWG (atmospheric water generation) from waste heat. R/R 5.3:1 to HC Wainwright $12 target. Position 4.8% of NLV, well inside 30% ceiling.",
      rr: "5.3:1 to HC Wainwright $12 PT",
    },
  ],

  // ── FILL QUALITY ANALYSIS ────────────────────────────────────────────────────
  fillQuality: {
    summary: "All four fills came in at or below limit prices. Combined improvement vs limits: $761.61. Combined max loss revised downward from $3,570 planned to $2,809 actual — a 21% improvement.",
    breakdown: [
      { ticker: "ZS",   limit: "$125.50", fill: "$122.60", saving: "$2.90/sh", totalSaving: "$232.00" },
      { ticker: "KRMN", limit: "$50.50",  fill: "$49.05",  saving: "$1.45/sh", totalSaving: "$221.85" },
      { ticker: "AIRJ", limit: "$5.14",   fill: "$4.95",   saving: "$0.19/sh", totalSaving: "$171.00" },
      { ticker: "UAMY", limit: "$7.90",   fill: "$7.64",   saving: "$0.26/sh", totalSaving: "$136.76" },
    ],
    note: "UAMY was originally entered as a MARKET order. Correctly cancelled and resubmitted as LIMIT $7.90 after I flagged that a 526-share market order in Blue Ocean ATS thin hours (200×$7.80 showing on ask) could walk up the book. The limit saved $136.76 on the fill.",
  },

  // ── KEY SESSION DECISIONS ────────────────────────────────────────────────────
  decisions: [
    {
      name: "RKLB NDX flow — resolved",
      decision: "NO ENTRY. Confirmed.",
      detail: "RKLB opened -2.6% on the NDX effective date (June 22), not +X% as would be expected if forced buying were still incoming. IBKR price snapshot confirmed $104.52 (-2.54%) at 10:08 UAE. This definitively settles the S75/journal84 debate: the NDX buying flow fired on June 18 (last session before the effective date), not on the effective date itself. The stock declined on the effective date, validating no-entry. See P54 in LESSONS_LEARNED.md for the data integrity lesson this generated.",
    },
    {
      name: "ZS NDX removal",
      decision: "CONFIRMED: forced selling also happened June 18, not June 22.",
      detail: "Same timing logic as RKLB. ZS's NDX removal selling was absorbed June 18 before the holiday. Today's ZS open at $122.60 and subsequent rally to $126+ confirms the mechanical headwind is gone. The original S75 instruction to 'watch first 30-60 min for forced selling' was superseded by this understanding.",
    },
    {
      name: "ZS position",
      decision: "ENTERED — 80sh at $122.60, stop $114.00",
      detail: "High conviction tier. Best performing position at session close (+$309.40, +3.1%). First candle was strong, VWAP at $125.99, stock broke above $126 during the session.",
    },
    {
      name: "KRMN position",
      decision: "ENTERED — 153sh at $49.05, stop-limit $44.50/$44.20",
      detail: "S74 order placed as agreed. Filled at $49.05. Post-holiday gap selling drove price from ~$50 open high to $46.35 by session close. Down 5.5% on position. Greenshoe clears ~June 27. Thesis intact. Stop $44.50 is well clear.",
    },
    {
      name: "AIRJ position",
      decision: "ENTERED — 900sh at $4.95, stop $3.85. Speculative override tier.",
      detail: "Water/data center regulatory thesis. Two-tranche structure: Tranche 1 complete. Tranche 2 trigger: named commercial agreement with data center operator. AIRJ up +3.71% intraday at the 30-min screener run.",
    },
    {
      name: "UAMY position",
      decision: "ENTERED — 526sh at $7.64, stop $6.90. Standard tier.",
      detail: "US Antimony Corp. DLA sole-source contract $248M, G7 antimony priority, only US integrated antimony supplier. ATS fill of $7.64 was below the June 18 regular close of $7.85 — meant we were flat on the position even as the stock showed -2.48% daily change. Stage 2 complete S76. P24 gate August 5.",
    },
    {
      name: "VRDN",
      decision: "PASS",
      detail: "PDUFA June 30 (8 days). Three-declaration structure built but EV calculation returned approximately -$0.49 from current price. REVEAL-2 precedent (May 5 spike to $20, fully faded within a week) visible on chart. Base case is approval with muted reaction, not a guaranteed pop. No statistical edge. Re-examine if price breaks meaningfully above $17 or below $15 before June 30.",
    },
    {
      name: "CODA",
      decision: "DEFER. New conditions + June 27 deadline.",
      detail: "DAVD Untethered Navy-approved for fleet deployment — partial hit on register condition (a), but not a named Hormuz MCM contract. Condition (c) building (base above $9.10) but still early (3-4 sessions). No Stage 2 built. Defer until: (a) confirmed news tying CODA/DAVD/Echoscope to Hormuz/MCM specifically, OR (b) five sessions of base holding above $9.50. Deadline June 27 — must be actioned or renewed.",
    },
    {
      name: "ICCM",
      decision: "PASS",
      detail: "IceCure Medical +91% on M&A-type event. Pre-penny-stock reverse split (1-for-30, June 4), same-day PIPE offering at $11.57 at the June 17 spike. Market cap $15M, TTM revenue $3.4M, -$15M operating loss. Classic reverse-split/PIPE pump. Technical trader's $11.50 target declined.",
    },
    {
      name: "CRDO",
      decision: "STAGE 1 COMPLETE. Entry zone $255-270 (post-Russell). Crash list corrected again.",
      detail: "FY2026 revenue $1.34B (+207% YoY), net income $472.3M (9x increase), 68.2% GAAP gross margins, Q1 FY2027 guidance $465-475M. Russell reconstitution (graduation to Russell 1000, effective June 26-29) drove +11.65% on 2M shares in first 33 minutes — confirmed as the flow mechanism. Fundamental thesis is extremely strong. NOT entering at $303 (52-week high on Russell flow day). Entry zone: $255-270 (post-Russell consolidation base). Formal ENTER/PASS/DEFER decision required next session after June 26.",
    },
    {
      name: "AGI (Alamos Gold)",
      decision: "WATCH — not in register, adding as Stage 1 candidate.",
      detail: "Down -15% at open on June 18 operational update: Q2 guidance cut -12% (seismic events at Young-Davidson damaged infrastructure). Island Gold District ramping on plan. Analyst consensus Strong Buy, average target $54.75 (77% above current $30.92). BofA kept Buy, cut to $50. Single-mine setback, not thesis break. Worth Stage 1 build at next session.",
    },
    {
      name: "QQ.L (QinetiQ)",
      decision: "MANUAL WATCH — 415-430p base zone. IBKR alerts do not work for UK stocks.",
      detail: "Stock fell from ~477p (June 12) to 427p (June 22) — -10.3% over 4 sessions. Iran peace deal removing defence premium across sector (LDO, HAG all down 2-4%). Not entering during active downtrend without a confirmed base. New watch level 415-430p. Prior 455p alert was in IBKR — now removed (UK alert bug confirmed, immediately triggers). Manual check every session.",
    },
    {
      name: "PATH (UiPath)",
      decision: "DEFER. Alert $9.50. Prior entry/exit on record.",
      detail: "Document review: EV $4.0B on $1.78B forward revenue, 82% gross margins, $1.42B cash, first Q1 GAAP operating profit. Real thesis. R/R 3.72:1 from $10.27 with stop $9.00 to $15 target. BUT: ARR decelerating from 25-30% to 12%, Microsoft Copilot Studio displacement risk understated in external assessment. Conviction 7/10, not 8/10. Prior entry and exit already on fund record. Alert $9.50, revisit at that level.",
    },
    {
      name: "Critical minerals sector — G7 declaration",
      decision: "UAMY entered. UUUU/ALM watch. Sector documented.",
      detail: "G7 Versailles declared critical minerals alliance: heavy rare earths, antimony, graphite, tungsten as first-tranche minerals. DOD $725M conditional loan to UUUU (June 18). USAR and UUUU both moved +8% and +4% on June 18 (pre-holiday). Today: USAR up 5%+, UUUU down 1%, UAMY (our position) up 1.8% before sector drift lower. Critical minerals universe added to register: UUUU (watch pullback $15.50-16), ALM (Almonty Industries, tungsten, watch pullback $16-17), CRML/NMG (speculative/pre-revenue, note only), USAR (high-beta trading vehicle only, no fundamental position).",
    },
    {
      name: "Water vs data centers — AIRJ thematic confirmed",
      decision: "Position entered. Sector confirmed as accelerating regulatory theme.",
      detail: "69+ local government bans on data center projects. $130B in build-outs blocked Q1 2026. 27 states advancing legislation. South Carolina and Kansas considering mandatory closed-loop cooling. Federal AI Data Center Moratorium Act introduced (Sanders/AOC). AIRJ is the only listed AWG-from-waste-heat company — genuinely differentiated position in the regulatory landscape. Adjacent names flagged: Watts Water (WTS), Ecolab (ECL post-CoolIT acquisition), Vertiv (VRT) — all higher-quality but already priced.",
    },
  ],

  // ── MARKET OBSERVATIONS ──────────────────────────────────────────────────────
  marketObservations: {
    spyPremarket: "$747.02 (+0.04%)",
    vix: "~16.78 (GREEN, below 18)",
    regimeConfirmed: "GREEN ~5/24, unchanged from S74",
    vixStreakCount: "2 of 5 (S74 was session 1, S76 is session 2 — S75 was research, no market, doesn't count)",
    suspensionStatus: "DO NOT SUSPEND. 3 more consecutive confirmed-GREEN sessions required.",
    broadMacroNote: "Big banks signalling defensive repositioning (BofA Bull & Bear near sell signal, CTAs at max long, SPX above BofA year-end target of 7,100). This influenced ZS sizing decision — standard tier initially recommended. James upgraded ZS to 80sh as highest-conviction. Macro concern documented but not blocking.",
    rklbNdxConfirmed: "RKLB opened -2.6% on NDX effective date — no forced buying at open. Confirms flow fired June 18 (last session before Juneteenth). No entry was correct.",
    screnerBNoResults: "CF-SCREEN-B (Quality at 52wk lows) returned zero results for the second time this session (pre-market and live). Confirms market elevation — no quality names in distress.",
    sectorNotes: "Semiconductor sector strong (INTC +4%, UMC +9% pre-market, Intel/Apple foundry deal). Critical minerals bid (USAR +5%, UAMY +1.8%). Defence broadly weak (LDO, QQ., HAG down 2-4% — Iran peace deal removing defence premium). Bitcoin ETFs (IBIT +2%) recovering from Extreme Fear.",
  },

  // ── SESSION NARRATIVE ────────────────────────────────────────────────────────
  sessionNarrative: `S76 was the most productive single session in fund history in terms of positions opened (4 new positions), research volume (critical minerals sector, water/data center theme, 5 external document reviews across 8 stocks), and register updates (CRDO Stage 1, QQ. manual watch correction, multiple new watch names added).

The session opened with a critical data integrity correction on RKLB: S75 had concluded the NDX flow was "likely still live" based on IBKR weekend volume data that didn't match journal84's 70.3M figure. S76's IBKR snapshot at 10:08 UAE confirmed RKLB at -2.54% from $107.24 — exactly what happens after a flow fires in the last pre-holiday session. James correctly called out that RKLB's pre-market was -2.55%, contradicting my "up 2.71%" reading from stale EOD data. Error owned and corrected. New lesson P54 added.

All four new positions filled at the NYSE open within 2 seconds of each other (09:30:00-02 EDT), all at or below limit prices. Combined improvement vs limits: $761.61.

UAMY was particularly well-timed: the stock shows -2.48% daily change but our position is essentially flat because the ATS fill of $7.64 was below the June 18 regular close of $7.85. James noted this explicitly. The limit order discipline and the conversion from market-to-limit before the open directly produced this outcome.

KRMN is the position to watch into next session — down 5.5% from fill at the close. The post-holiday gap selling pattern is consistent with supply-driven pressure (greenshoe still active, clears ~June 27). The thesis is intact and the stop is well clear at $44.50. Greenshoe clearing date is the next near-term catalyst.

ZS was the standout: +3.1% from fill in the first full session after the NDX removal. The thesis is working early.`,

  // ── SCREENER RESULTS SUMMARY ─────────────────────────────────────────────────
  screenerSummary: {
    screenD_VolumeAnomaly: "7 results. PPLT (physical platinum ETF) elevated volume — critical minerals sector confirmation. No register names.",
    screenA_RevenueMomentum: "2 results: AGI (Alamos Gold, -15.27% on operational guidance cut) and VELO3D (-11.92%). AGI added as Stage 1 watch candidate.",
    screenB_Quality52wkLow: "NO RESULTS — second time this session. Confirms market elevation.",
    screenC_EarningsSurprise: "41 results (winners and losers). No register names flagged. POWL (Powell Industries) noted as data center power infrastructure adjacent play.",
    screenSI39_ThesisDrill: "Not shown this session.",
    screenerPRE: "Top finds: GETY (Getty Images) +91.75% M&A event; CRDO (Credo Technology) +11.65% Russell reconstitution flow; SMCI +15%; UMC +15.6%. CRDO is the actionable Stage 1 find.",
    usLosers: "1 result: AGI -14.91% (single-mine operational setback, not systemic). Confirms stock-specific not sector-wide gold weakness.",
  },

  // ── CRITICAL MINERALS / RARE EARTHS SECTOR SCAN ─────────────────────────────
  criticalMineralsScan: {
    trigger: "Trump G7 Versailles declaration naming heavy rare earths, antimony, graphite, tungsten as first-tranche bilateral negotiation minerals. DOD $725M conditional loan to UUUU (June 18).",
    preHolidayMoves: "UUUU +8.24%, USAR +4.63%, UAMY +2.48%, ALM +2.8% — all on June 18 before the holiday. The sector already partially fired.",
    todayMoves: "USAR +5%+, UAMY +1.8% (our position), UUUU -1%.",
    universePriority: [
      "UAMY — ENTERED S76. DLA sole-source $248M, G7 antimony first-tranche, only US integrated antimony supplier.",
      "UUUU — WATCH. DOD $725M loan, infrastructure + uranium dual play. Entry on pullback $15.50-16.",
      "ALM (Almonty Industries) — WATCH. Tungsten, Sangdong mine (South Korea), binding US defense offtake. Entry on pullback $16-17. NYSE-listed, accessible IBKR.",
      "CRML — Note only. Greenland heavy rare earths, going-concern risk, pre-revenue. Not Strategy A.",
      "USAR — Trading vehicle only. Pre-revenue, $4.8B market cap, dilutive shelf filing risk.",
    ],
    nextCatalyst: "Japan bilateral critical minerals agreement (most likely G7 partner before end of June) — if announced, antimony and heavy rare earths specifically named. This is the Strategy B Declaration 1 for UAMY add / UUUU entry.",
  },

  // ── EXTERNAL DOCUMENTS REVIEWED ─────────────────────────────────────────────
  externalDocumentsReviewed: [
    {
      doc: "5-stock AI infrastructure assessment (PATH/NOK/LUMN/ONDS/AMPX)",
      verdict: "PATH best fund opportunity at $9.50-10.50 (prior entry/exit, alert $9.50). NOK 6.5/10, GFS alert $72. LUMN 6/10 watch. ONDS 5.5/10 no action. AMPX 6/10 wait below $13.",
    },
    {
      doc: "3-stock semiconductor assessment (GLW/GFS/NVTS)",
      verdict: "GLW business 9/10 but stock 6/10 — don't chase after +11% day. Alert $165. GFS business 8/10, stock 6.5/10. Alert $72. NVTS technology 8/10, stock 3/10 at $24 (138x annualised Q2 revenue). Pass below $15.",
    },
    {
      doc: "James's own critical minerals assessment (7 names)",
      verdict: "Framework agreed: UUUU best overall, UAMY best short-term high-beta, MP best quality. ALM most interesting undiscovered tungsten play. USAR trading only. Claude additions: MP CEO selling flag (185K shares June 3), USAR dilution risk (S-3/A shelf), UAMY single-analyst coverage (HC Wainwright also covers AIRJ).",
    },
  ],

  // ── LESSONS ADDED THIS SESSION ───────────────────────────────────────────────
  lessonsAdded: [
    {
      ref: "P54 — EOD API PRICE DATA VS IBKR REGULAR SESSION CLOSE PRICE",
      summary: "EOD API 'close' and 'volume' fields may include Blue Ocean ATS/extended-hours data, not exclusively the 4pm NYSE regular session close. This caused an incorrect 'NDX flow confirmed fired' conclusion on RKLB — EOD showed $107.24 and 70.3M volume as the 'close'; IBKR showed -2.54% from $107.24 (confirming $107.24 was indeed the regular session close), but the -2.54% fall in overnight ATS contradicted the 'flow is live' theory. The actual error was inferring a flow conclusion from EOD volume without confirming it was pure regular-session volume. Rule: do not use EOD volume to assert that a dated mechanical event (NDX/S&P 500/Russell MOC flow) has or has not fired. Regular-session volume must be pulled directly from IBKR get_price_history before any such claim. Also: never state a flow conclusion as fact without IBKR cross-reference. Originated: RKLB NDX analysis discrepancy across S73/S74/S75/S76.",
    },
  ],

  // ── OUTSTANDING ITEMS FOR NEXT SESSION ───────────────────────────────────────
  nextSessionActions: [
    "1. KRMN — watch closely. Down 5.5% from fill at close. Greenshoe clears ~June 27 (4 days). If thesis intact, hold through to greenshoe clearing. If new negative catalyst emerges, assess stop trail or early exit.",
    "2. CRDO Stage 1 complete — formal ENTER/PASS/DEFER required next session after June 26 Russell reconstitution effective date. Entry zone $255-270 (post-Russell fade). Do not enter during the forced-buying window.",
    "3. BTC Scorecard A/B — overdue since Friday, partial only done S76 (no direct Farside pull). Direct Farside pull and CoinGlass/on-chain required.",
    "4. VRDN — June 30 PDUFA is 8 days. PASS confirmed S76. Review one final time June 27-28 in case price action changes the EV math.",
    "5. FAC — entry window ~30 June-1 July is 8-9 days. Fresh chart (T71), fresh PIPE/volume check, and stop calculation including T75 slippage required before order. Must be actioned by July 1 or escalates.",
    "6. CODA — defer deadline June 27. Must be actioned or formally renewed.",
    "7. AGI — Stage 1 build. Operational setback, thesis intact, analysts at $54.75 average vs $30.92 current. Not urgent but worth building before it stabilises.",
    "8. UAMY P24 gate — flag for August 5. Add to session-open checklist from that date.",
    "9. Market health VIX streak count: 2/5. Third consecutive confirmed GREEN session needed before suspension can even be considered.",
    "10. QQ.L manual watch — 415-430p zone. Check every session. No IBKR alert (UK bug).",
    "11. MX alert $5.50 — trigger fired June 18, stock now $5.88-6.25 pre-market. Watch for a clean pullback to $5.50 zone at next session rather than chasing.",
  ],

  // ── GTC STOPS CONFIRMED AT CLOSE ─────────────────────────────────────────────
  stopsConfirmed: [
    { ticker: "HNR1", stop: "EUR229.60", type: "Stop",        status: "REPLACED, live", orderId: "278826083" },
    { ticker: "ZS",   stop: "$114.00",   type: "Stop",        status: "REPLACED, live", orderId: "1807166316" },
    { ticker: "KRMN", stop: "$44.50/$44.20", type: "Stop Limit", status: "REPLACED, live", orderId: "1807166343" },
    { ticker: "AIRJ", stop: "$3.85",     type: "Stop",        status: "REPLACED, live", orderId: "1807166367" },
    { ticker: "UAMY", stop: "$6.90",     type: "Stop",        status: "REPLACED, live", orderId: "1807166473" },
  ],

  processNotes: {
    dropboxProtocol: "DIRECT WRITE CONFIRMED via filesystem:write_file. DIRECT WRITE CONFIRMED via filesystem MCP.",
    journalVersion: "I17 compliant. New file trading_journal85.jsx. trading_journal84.jsx not overwritten.",
    nextJournal: "trading_journal86.jsx",
    sessionCharacter: "Most positions opened in a single session (4 new). Significant analytical work alongside live trading: critical minerals full sector scan, water/data center theme confirmed and documented, 8 external stock assessments reviewed and critiqued, CRDO Stage 1 complete, RKLB data integrity error corrected and lesson filed. All positions filled at or below limits — combined improvement $761. KRMN the only position of concern at close (down 5.5%), thesis intact.",
    netLiq: "$95,354.44 at close. Total new capital deployed today: $25,786. Strategy A allocation: ~39% of NLV (vs 50% target — still below target but meaningfully closer).",
    dailyPnl: "Estimated -$220 (ZS +$309, KRMN -$414, AIRJ -$104, UAMY -$55, HNR1 +$55 equiv, XSG ~$0).",
  },
};

export default journalS76;
