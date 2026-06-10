// CLAUDE FUND - TRADING JOURNAL S63
// Session: S63 | Date: Wednesday 10 June 2026
// Prev journal: trading_journal75.jsx (S61/S62) | Next: trading_journal77.jsx
// Session type: Full market session — CPI day. LSE open, NYSE open.
// Journal written BEFORE 20:00 UAE 10yr auction — auction result lands post-close.
// REWRITE NOTE: original close-protocol write went to container storage, not Dropbox
// (wrong tool — E34 logged). Rewritten via filesystem MCP ~19:00 UAE, content identical
// plus post-close additions (P39/P40, FAC rewrite) noted at bottom.
// ===================================================================

const journalS63 = {

  session: "S63",
  date: "2026-06-10",
  dayOfWeek: "Wednesday",

  openNetLiq: 103854.74,
  closeNetLiq: 103183.86,
  dailyPnL: -670.88,
  realisedPnL_USD: -498.90,   // NCLH +191.46, CEG -690.36
  realisedPnL_GBP: 196.65,    // IES exit
  unrealisedPnL: 295.0,       // approx at close, incl LUNR -336 / RKLB -144 marks
  totalCashValue: 58592.90,
  positionsActive: 10,        // 8 Strategy A + 2 Strategy B
  leverage: 0.43,

  // ═══════════════════════════════════════════════════════════════
  // MACRO — CPI DAY
  // ═══════════════════════════════════════════════════════════════
  macro: {
    CPI: "Headline 4.2% YoY (+0.5% MoM) IN LINE. Core +0.2% MoM — BELOW 0.3% consensus, down from 0.4% April. Energy = 60%+ of monthly gain. BENIGN print.",
    cpiIncident: "Initial '4.43' reading was a TIMESTAMP misread (16:43), not the print. Session briefly ran HOT protocols before bond/VIX tape + published data corrected it. T72 created.",
    bondReaction: "10yr futures flushed and fully recovered within minutes. 10yr ~4.53-4.55%. TLT flat-green pre-open was the tell.",
    VIX: "Spiked ~22.5 post-print, faded to ~21. Below NBIS 22 gate at close.",
    WTI: "~$87-88 overnight low (-4% trigger fired) — oil recovered intraday on Iran strikes news. Peace basket re-entry trigger technically fired but stood down.",
    iranIsrael: "ACTIVE EXCHANGE OF FIRE overnight: CENTCOM struck Iranian targets (Apache downing response); Iran hit bases in Jordan/Bahrain/Kuwait. Peace trades fully stood down. Signed/verified deal now the ONLY re-entry trigger.",
    hormuz: "Energy Secretary: ship traffic 'rising very meaningfully' despite strikes.",
    tenYrAuction: "20:00 UAE 10yr auction PENDING at journal write — first check at S64 open.",
    marketHealthScore: "11-12/24 AMBER (provisional, pre-auction). Soft core prevented RED.",
    SPCX: "Lists TOMORROW Thursday June 12. $135/sh, $75B raise, $250B demand (3.3x oversub), ~3-4% float, 366-day founder lockup. Violent day-1 pop = base case. Nasdaq-100 fast-track possible after 15 days (Category 4 pipeline, early July).",
    tape: "Bifurcated: high-beta AI optics/quantum/space complex ripped (LITE +6.7%, CRDO +7.8%, IONQ +5.4%, SIDU +7.4%) while broad market digested. Speculative junk tier led; liquid orbit names (LUNR/RKLB) popped at open then faded all afternoon — distribution into listing still the dominant flow. POST-CLOSE: FAC +20%, ICHR +10% — see P39/P40.",
  },

  // ═══════════════════════════════════════════════════════════════
  // TRADES S63
  // ═══════════════════════════════════════════════════════════════
  trades: [
    {
      symbol: "IES", side: "SELL", qty: 1500, price: 30.8, currency: "GBP",
      type: "LIMIT GTC (lowered 34.50p→30p, filled 30.8p)",
      realisedPnL_GBP: 196.65,
      thesis: "T67 Condition 4 declared S62 (+105%, declining momentum). Price fell away from 34.50 limit; chased down correctly rather than anchoring. +75% realized vs 17.49p cost.",
    },
    {
      symbol: "NCLH", side: "SELL", qty: 75, price: 18.48,
      type: "LIMIT DAY (18.70→18.65→18.48 chase-down at open)",
      realisedPnL: 191.46,
      thesis: "T67 Condition 4 stated by James: peace upside captured (+19% at decision, +16.1% at fill), holding through escalation peaks/troughs not good use of capital. Stop $18.13 cancelled FIRST, then limit — orphan-stop double-sell risk avoided (T65/T66 class). Moves to Strategy B pipeline as confirmation-only re-entry vehicle.",
    },
    {
      symbol: "CEG", side: "SELL", qty: 30, price: 244.36,
      type: "STOP GTC triggered (hard floor 244.51, slight slippage)",
      realisedPnL: -690.36,
      thesis: "T67 Condition 3 — mechanical, correct by definition. Hard floor never lowered after documented S61 exception. Second-largest realized loss after MU. Favorable sequencing: exited BEFORE June 30 Calpine lock-up supply. James: thesis good, fundamentals good, technicals/macro went against us. Back on watchlist, unemotional re-entry conditions set. P38 entry-timing lesson logged.",
    },
    {
      symbol: "LUNR", side: "BUY", qty: 330, avgPrice: 27.6535,
      type: "LIMIT DAY — Strategy B ENTRY (fills: 100 @ 27.65, 230 @ 27.655)",
      stop: 26.35, stopType: "GTC, below 26.44 premarket per T69",
      deployed: 9125.65, riskToStop: 430,
      strategyB_declarations: {
        catalyst: "SPCX IPO listing Thursday June 12 — most oversubscribed mega-IPO ever ($250B demand / ~3% float). Sector sentiment bid. Horizon 24-30 hours.",
        stop: "26.35 — just below 26.44 premarket reference (T69). Back through premarket = hype bid evaporated.",
        hardExit: "Thursday June 12 close at latest. Working plan: sell INTO listing-day strength.",
      },
      entryLogic: "Post-CPI benign + open reversal: opened above premarket, reclaimed toward yday close on volume. Conditions gate passed: CPI benign, VIX<22, T71 charts reviewed.",
      eveningStatus: "Faded to ~26.64 by close-of-session. Above premarket thesis line. Stop NOT raised — planned 26.75 raise cancelled as noise-stop when price fell to session low region. Stop below cost overnight — JAMES OVERRIDE RECORDED: holds with phone monitoring, 'if the stop hits it hits.'",
    },
    {
      symbol: "RKLB", side: "BUY", qty: 55, price: 110.52,
      type: "LIMIT DAY — Strategy B ENTRY (one raise 109.29→110.52, no chase past it; filled on retrace)",
      stop: 104.15, stopType: "GTC, below 104.25 premarket per T69",
      deployed: 6078.60, riskToStop: 350,
      strategyB_declarations: {
        catalyst: "Same as LUNR — SPCX listing Thursday. Horizon 24-30 hours.",
        stop: "104.15 — below premarket reference.",
        hardExit: "Thursday June 12 close at latest. Sell into listing-day strength.",
      },
      entryLogic: "Trigger fired first (reclaimed yday close 108.37 on volume). One-raise rule held: did not chase 110.98 vertical; limit caught the retrace. Discipline note: ~$1.20 slippage cost of building ticket after trigger — next time ticket pre-built at trigger.",
      eveningStatus: "Faded to ~107.93, settled 108.30 by 18:45. Planned 18:30 raise to 106.70 CANCELLED (noise-stop). Stop stays 104.15 thesis level overnight — raise re-references to listing-day premarket at S64 open per T69. Same James override re overnight below-cost stop.",
    },
  ],

  // ═══════════════════════════════════════════════════════════════
  // POSITIONS AT CLOSE (IBKR reconciled)
  // ═══════════════════════════════════════════════════════════════
  positions: [
    { symbol: "ACM",  qty: 65,    avgCost: 69.155,  last: 70.75,  unrealisedPnL: 103.64,  stop: 68.85,  strategy: "A" },
    { symbol: "CODA", qty: 250,   avgCost: 11.105,  last: 11.515, unrealisedPnL: 102.50,  stop: 11.01,  strategy: "A" },
    { symbol: "FRSH", qty: 265,   avgCost: 9.305,   last: 9.355,  unrealisedPnL: 13.25,   stop: 8.81,   strategy: "A", note: "Did NOT stop out as S62 predicted — recovered. Aug 4 thesis intact." },
    { symbol: "HNR1", qty: 40,    avgCost: 224.71,  last: 229.90, unrealisedPnL: 207.51,  stop: 225.80, strategy: "A", currency: "EUR", note: "STANDALONE stop — manual cancel on exit. One stop verified S63." },
    { symbol: "LMT",  qty: 10,    avgCost: 516.83,  last: 529.76, unrealisedPnL: 129.30,  stop: 519.92, strategy: "A" },
    { symbol: "LUNR", qty: 330,   avgCost: 27.6535, last: 26.64,  unrealisedPnL: -336.10, stop: 26.35,  strategy: "B", note: "SPCX catalyst. Hard exit Thu close." },
    { symbol: "LW",   qty: 35,    avgCost: 42.869,  last: 44.20,  unrealisedPnL: 46.60,   stop: 43.00,  strategy: "A", note: "Stop now above cost" },
    { symbol: "RKLB", qty: 55,    avgCost: 110.538, last: 107.93, unrealisedPnL: -143.61, stop: 104.15, strategy: "B", note: "SPCX catalyst. Hard exit Thu close." },
    { symbol: "XSG",  qty: 40000, avgCost: 1.5075,  last: 1.425,  unrealisedPnL: -33.00,  stop: null,   strategy: "A", currency: "GBP" },
    { symbol: "ZENA", qty: 1000,  avgCost: 1.365,   last: 1.57,   unrealisedPnL: 205.00,  stop: 1.38,   strategy: "A", note: "+7.9% today. Stop above cost. Raise candidate to ~1.48 at S64." },
  ],

  ordersLive: [
    { symbol: "CODA", type: "STOP SELL", qty: 250,  stop: 11.01,  note: "GTC" },
    { symbol: "LMT",  type: "STOP SELL", qty: 10,   stop: 519.92, note: "GTC" },
    { symbol: "ACM",  type: "STOP SELL", qty: 65,   stop: 68.85,  note: "GTC" },
    { symbol: "LW",   type: "STOP SELL", qty: 35,   stop: 43.00,  note: "GTC" },
    { symbol: "HNR1", type: "STOP SELL", qty: 40,   stop: 225.80, note: "GTC STANDALONE EUR" },
    { symbol: "ZENA", type: "STOP SELL", qty: 1000, stop: 1.38,   note: "GTC" },
    { symbol: "FRSH", type: "STOP SELL", qty: 265,  stop: 8.81,   note: "GTC" },
    { symbol: "LUNR", type: "STOP SELL", qty: 330,  stop: 26.35,  note: "GTC — Strategy B" },
    { symbol: "RKLB", type: "STOP SELL", qty: 55,   stop: 104.15, note: "GTC — Strategy B" },
  ],

  // ═══════════════════════════════════════════════════════════════
  // RESEARCH COMPLETED S63 (10 names assessed)
  // ═══════════════════════════════════════════════════════════════
  research: {
    UEC: "Stage 1 COMPLETE: crash is STOCK-SPECIFIC (Q3 earnings miss, unhedged pre-profit miner). Register $9.50-10.50 'sector-driven' zone STRUCK — premise false. Not Strategy B (no quality, no catalyst).",
    CRDO: "Catalyst identified: June 1 blowout Q4 (rev +157%, FY27 +80% guide, PT raises to $260-290). No dated event before Sept 2 earnings. $185 register zone DEAD — struck.",
    FAC: "Stage 2 structural COMPLETE: float ~14.5M sh (23.05M of 27.6M SPAC shares redeemed + 9.93M PIPE @ ~$10.07 basis). ~85% of 144M FD shares behind lockups. PIPE = standing seller above $10. Strategy A FAILS on structure. POST-CLOSE: +20% — zone falsified, dual-entry rewrite per P40. See register.",
    OSCR: "Morning policy-risk pass CORRECTED: APTC subsidies already lapsed Dec (priced); Cigna/Aetna ACA exits = share-gain story; 5yr high on Goldman conf momentum. UNIVERSE: 'ACA consolidation share-gainer', alert ~$24, no chase at highs. Q1 MLR seasonality caveat stands.",
    CLOV: "No news — 52-week-high breakout + squeeze mechanics on profit-turnaround stack. Meme history, $0.05/qtr EPS, +66% YTD. Observation only.",
    AAOI: "Premarket 'anomaly' resolved: dead-cat bounce after -17.2% Tuesday inside +311% YTD parabola. 2x leveraged single-stock ETF amplifying. Insiders selling. PASS — momentum casino.",
    SMCI: "Screen A sole hit. -13%+ on $7B raise (~30% of mkt cap incl ATM) + co-founder INDICTMENT (chip smuggling) + export-control review + sector deleveraging. PASS on dilution/governance/margin-quality (SI-90 compliant grounds). Watch: post-offering-pricing stabilization only.",
    ICHR: "Catalyst: post-May-4 beat analyst PT raises. Read as range $63-77 with triple top; zone set $63-66 only. POST-CLOSE: broke out +10% — ascending-lows compression misread, P39 created. Breakout-trigger treatment retroactive at S64 if it bases above $77.",
    FLYW: "Best of discord list: rev +41%, profitable, $50M buyback at $1.8B cap. KEY RISK writeup missed: education vertical = US visa/immigration policy exposure. UNIVERSE, Stage 1 this week, GM slide 60.3→56.8% to investigate.",
    UNFI: "Event candidate, candle strong (opened -19%, closed -10% at HOD = absorption) but FAILS Decl 1 (no dated catalyst) and Cat 2 quality test (sub-2% margin distributor). Conditional watch: needs named catalyst.",
    FUTU: "Three screens in one day (premarket green, Screen C, +3.7%). $13B Chinese broker, 10.5x P/E, 53% off high, EPS +51%. UNIVERSE one-liner for Friday scan.",
  },

  // ═══════════════════════════════════════════════════════════════
  // LESSONS ADDED S63 (full text in LESSONS_LEARNED.md)
  // ═══════════════════════════════════════════════════════════════
  lessonsAdded: [
    { ref: "T71 — CHART REQUIRED BEFORE ANY ENTRY", summary: "Codified into STRATEGY_FRAMEWORK.md (both strategies). No chart, no entry. Exits exempt." },
    { ref: "T72 — MACRO PRINTS PASSED WITH LABELS", summary: "'4.43' timestamp read as CPI headline; HOT protocols briefly ran. Rule: labeled numbers, verified vs second source + bond tape before regime decisions." },
    { ref: "SI-90 — STANDALONE MERIT RULE", summary: "Codified into STRATEGY_FRAMEWORK.md. Names never rejected for theme non-fit. Themes = where we hunt, not a fence." },
    { ref: "P38 — RATE-SENSITIVE ENTRY TIMING", summary: "CEG bought at highs into rising yields + dated lock-up supply. Check yield trend + supply events before entry on rate-sensitive names." },
    { ref: "P39 — DUAL-ENTRY DEFINITIONS (post-close, ICHR +10%)", summary: "Consolidation-under-resistance with live catalyst gets BOTH floor zone AND breakout trigger. Extended same evening to ALL register names. Misses: ascending-lows compression, PT migration to ceiling, absorption read as rejection." },
    { ref: "P40 — ABSORPTION = BULLISH SIGNAL (post-close, FAC +20%)", summary: "Known supply being absorbed (price up against PIPE selling) = demand exceeding visible supply = bullish, esp. low float. Float symmetry: overhang AND scarcity fuel. Operator tape-read is data — conflicts produce two entry designs, not a verdict." },
    { ref: "E34 — WRONG WRITE TOOL ON JOURNAL (this file)", summary: "Close-protocol journal write used container-local create_file instead of filesystem MCP; 'success' returned but file never reached Dropbox. James caught it. Rule: ALL fund file writes use filesystem MCP tools ONLY, and the close-protocol verify step means RE-LISTING THE DIRECTORY and confirming the file appears — never trusting the write tool's success message." },
    { ref: "STRATEGY B EXECUTION NOTES", summary: "One-raise rule validated (RKLB). Ticket-at-trigger (~$1.20 slippage lesson). Noise-stop rule: raises on strength only, never <1.5% buffer on high-beta. CF-SCREEN-PRE saved; TLT flat after 'hot' headline = best pre-open tell." },
  ],

  // ═══════════════════════════════════════════════════════════════
  // S64 (THURSDAY JUNE 11) MANDATORY FIRST ACTIONS
  // NOTE: SPCX LISTS THURSDAY JUNE 12 per all sources. VERIFY date at open.
  // ═══════════════════════════════════════════════════════════════
  nextSessionActions: [
    "1. 10yr AUCTION RESULT from 20:00 UAE tonight — first check. Weak auction = regime re-score, stops exposed.",
    "2. LUNR/RKLB overnight status — stops hit or held? If held: T69 premarket re-reference for listing day, raise stops on strength (RKLB raise could reach cost on premarket strength), exits INTO listing-day strength, Thursday close hard limit.",
    "3. VERIFY SPCX listing date (register keyed to Thursday June 12).",
    "4. NBIS four conditions at SPCX observation: outcome neutral+, 30-min close >$225 on >300K vol, VIX <22, trendline intact. Ticket pre-built: BUY LIMIT $226 DAY, 47sh, stop $223.85.",
    "5. Market health re-score post-auction: VIX, 10yr, WTI (Iran strikes vs Hormuz traffic).",
    "6. Iran/Israel overnight — signed deal = peace basket evaluation (UAL vehicle, fresh declarations).",
    "7. FAC vs new dual-entry design: strength entry if basing above $19 into June 17 Bell (half size), retrace entry $16-18 only with repeated absorption.",
    "8. ZENA stop raise to ~$1.48.",
    "9. ICHR — apply P39 retroactively: breakout-trigger entry if basing above $77.",
    "10. CEG orphan-order check. Re-entry conditions in register, alert $235.",
    "11. Carried: FLYW Stage 1, AAL/UAL stop-raise retrospective.",
  ],

  processNotes: {
    dropboxProtocol: "DIRECT WRITE CONFIRMED via filesystem MCP — VERIFIED BY DIRECTORY RE-LIST (E34 fix).",
    journalVersion: "I17 compliant — new file trading_journal76.jsx. Rewritten ~19:00 UAE after E34 catch; original write never reached Dropbox.",
    nextJournal: "trading_journal77.jsx",
    overrideLog: "James override recorded: Strategy B stops held below cost overnight with phone monitoring. 'If the stop hits then it hits.' Both stops GTC-verified live.",
    closeProtocolNote: "Core close ~18:45 UAE pre-auction. Post-close additions: P39 (ICHR +10%), P40 (FAC +20%), FAC register rewrite, E34 (this file's recovery). DECISION_REGISTER, FUND_SESSION_STATE, LESSONS_LEARNED all updated and verified on Dropbox.",
  },
};

export default journalS63;
