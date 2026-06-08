// CLAUDE FUND - TRADING JOURNAL S60
// Session: S60 | Date: Monday 8 June 2026
// Prev journal: trading_journal73.jsx (S59 Weekend) | Next: trading_journal75.jsx
// Session type: Full market session — NYSE open, LSE open
// ===================================================================

const journalS60 = {

  session: "S60",
  date: "2026-06-08",
  dayOfWeek: "Monday",
  openNetLiq: 103338.61,
  closeNetLiq: 103529.62,
  dailyPnL: 191.01,
  unrealisedPnL: 573.39,
  cashUSD: 43709.85,
  cashGBP: 2261,
  cashEUR: -9458,
  positionsActive: 11,

  ibkrConnector: {
    status: "RESTORED — working cleanly from session open",
  },

  trades: [
    {
      symbol: "CCL", side: "SELL", qty: 250, price: 26.98,
      type: "STOP GTC triggered", realisedPnL: 567.54, entryPrice: 24.706,
      thesis: "Stop triggered on Israel-Iran exchange of fire. T67 Condition 3 — mechanical stop, correct by definition. Re-entry watchlist: SI-25 conditions must restore.",
    },
    {
      symbol: "NVO", side: "SELL", qty: 55, price: 42.30,
      type: "MARKET DAY", realisedPnL: -123.33, entryPrice: 44.524,
      thesis: "ADA REIMAGINE 1-3 data met endpoints but stock -1.8% — catalyst exhausted. T67 Condition 2.",
    },
    {
      symbol: "PYPL", side: "SELL", qty: 55, price: 41.25,
      type: "MARKET DAY", realisedPnL: -242.41, entryPrice: 45.639,
      thesis: "Thesis broken. T67 Condition 2.",
    },
    {
      symbol: "SERV", side: "SELL", qty: 75, price: 7.93,
      type: "MARKET DAY", realisedPnL: -82.28, entryPrice: 9.014,
      thesis: "Thesis broken. T67 Condition 2.",
    },
    {
      symbol: "SNPS", side: "BUY", qty: 41, price: 466.00,
      type: "LIMIT DAY", realisedPnL: 0, stop: 466.70,
      target: 480, exitDeadline: "Wednesday 10 June close — before SpaceX IPO Thursday",
      convictionDeclaration: "HIGH CONVICTION SHORT-TERM RECOVERY TRADE. Catalyst: Friday Broadcom contagion selloff, no SNPS-specific news. Stop at Friday low. Hard exit Wednesday pre-SpaceX.",
      currentUnrealisedPnL: 420.90,
      postEntryNote: "T68 lesson — Elliott activist board seat and GAAP earnings collapse not flagged pre-entry. News check mandatory before future entry recommendations.",
    },
  ],

  ordersLive: [
    { symbol: "SNPS", type: "STOP SELL", qty: 41, stop: 466.70, note: "Raise daily through Wednesday. Hard exit Wednesday close." },
    { symbol: "NCLH", type: "STOP SELL", qty: 75, stop: 17.94 },
    { symbol: "CEG",  type: "STOP SELL", qty: 30, stop: 250.00 },
    { symbol: "CODA", type: "STOP SELL", qty: 250, stop: 10.73 },
    { symbol: "ACM",  type: "STOP SELL", qty: 65, stop: 67.43 },
    { symbol: "EXE",  type: "STOP SELL", qty: 55, stop: 89.92 },
    { symbol: "HNR1", type: "STOP SELL", qty: 40, stop: 219.60, note: "STANDALONE EUR STOP — manual cancel required on exit" },
    { symbol: "LMT",  type: "STOP SELL", qty: 10, stop: 501.44 },
    { symbol: "LW",   type: "STOP SELL", qty: 35, stop: 39.95 },
    { symbol: "FRSH", type: "LIMIT BUY DAY", qty: 600, limit: 9.21, pairedStop: 8.00, note: "Did not fill today. Reassess Tuesday." },
    { symbol: "LRCX", type: "LIMIT BUY DAY", qty: 65, limit: 308.06, note: "Stock ran to $319. Recovery trade missed. Cancel Tuesday." },
    { symbol: "ZENA", type: "LIMIT BUY GTC", qty: 1000, limit: 1.36, pairedStop: 1.05, note: "Stock at $1.41. Hold GTC at $1.36." },
  ],

  positions: [
    { symbol: "SNPS", qty: 41,    avgCost: 466.02, closePrice: 476.29, unrealisedPnL: 420.90,  stop: 466.70 },
    { symbol: "NCLH", qty: 75,    avgCost: 15.913, closePrice: 18.94,  unrealisedPnL: 226.99,  stop: 17.94  },
    { symbol: "CEG",  qty: 30,    avgCost: 267.33, closePrice: 254.78, unrealisedPnL: -376.60, stop: 250.00 },
    { symbol: "CODA", qty: 250,   avgCost: 11.105, closePrice: 11.88,  unrealisedPnL: 193.94,  stop: 10.73  },
    { symbol: "ACM",  qty: 65,    avgCost: 69.155, closePrice: 70.63,  unrealisedPnL: 95.71,   stop: 67.43  },
    { symbol: "EXE",  qty: 55,    avgCost: 91.568, closePrice: 91.16,  unrealisedPnL: -22.36,  stop: 89.92  },
    { symbol: "HNR1", qty: 40,    avgCost: 224.71, closePrice: 225.08, unrealisedPnL: 14.71,   stop: 219.60, currency: "EUR" },
    { symbol: "LMT",  qty: 10,    avgCost: 516.83, closePrice: 520.91, unrealisedPnL: 40.85,   stop: 501.44 },
    { symbol: "LW",   qty: 35,    avgCost: 42.869, closePrice: 42.50,  unrealisedPnL: -12.82,  stop: 39.95  },
    { symbol: "IES",  qty: 1500,  avgCost: 17.49,  closePrice: 35.80,  unrealisedPnL: 274.65,  stop: null, currency: "GBP", note: "+105% free carry" },
    { symbol: "XSG",  qty: 40000, avgCost: 1.5075, closePrice: 1.4486, unrealisedPnL: -23.56,  stop: null, currency: "GBP" },
  ],

  macro: {
    WTI: 92.00,
    VIX: 21.51,
    tenYrYield: 4.55,
    SPX: 7383.74,
    marketHealthScore: "13/24 AMBER",
    israelIran: "Exchanged fire overnight. Lebanon ceasefire fragile. WTI spiking.",
    spaceXIPO: "SPCX June 12 — Thursday. $135/share $1.75T valuation. Key market event.",
    SI25_C1: "UNMET",
    SI25_C2: "BREACHED",
  },

  snpsExitPlan: {
    currentStop: 466.70,
    raiseMondayClose: "Above $473 — raise stop to $471",
    raiseTuesdayClose: "Above $478 — raise stop to $475",
    wednesdayClose: "EXIT AT MARKET regardless — out before SpaceX IPO Thursday",
    earlyExitTrigger: "$480 — Morningstar 5-star price, T67 Condition 4 ceiling judgement",
  },

  watchlistAdditions: [
    { symbol: "CCL",  tier: "MONITORING", thesis: "Re-entry on SI-25 restoration + WTI below $88. Target $34. Stop $24.", analysts: "26 analysts Buy, avg target $34.57" },
    { symbol: "LUNR", tier: "MONITORING", entryZone: "$22-26", alert: "$27", note: "Wait for SPCX June 12 reaction" },
    { symbol: "CRWV", tier: "MONITORING", entryZone: "$90-100", alert: "$105" },
    { symbol: "FAC",  tier: "MONITORING", note: "DTC Chill active. Alert $12. Tranche 1 $5K, Tranche 2 $5K. 12-month hold. Stop $9.00." },
    { symbol: "ZS",   tier: "MONITORING", entryZone: "$120-128", alert: "$128" },
    { symbol: "ABVX", tier: "MONITORING", note: "High conviction bar. Re-entry conditions: 25mg safety resolved, NDA filed, M&A approach or price $80-85" },
    { symbol: "AMD",  tier: "MONITORING", alert: "$455", note: "Export control headwind on MI350x" },
    { symbol: "ZENA", tier: "MONITORING", note: "Blue UAS certification trigger. Limit $1.36 GTC live." },
  ],

  lessonsAdded: [
    {
      ref: "T67",
      summary: "Premature exits without stated thesis completion. Every exit requires one of four conditions: target reached, thesis broken, stop triggered, or ceiling judgement stated in writing. MRVL miss: $1,565 foregone.",
    },
    {
      ref: "T68",
      summary: "News check mandatory before any entry recommendation. Material overhangs must be stated before order confirmation screen. SNPS Elliott activist and GAAP earnings collapse missed pre-entry.",
    },
    {
      ref: "SI-35 REVISION",
      summary: "Standard: $500 max loss. High conviction exception: $900 max loss. Requires explicit three-point declaration at entry — conviction reason, stop at genuine thesis-break level, position size from $900 ceiling. Without all three: defaults to $500.",
    },
    {
      ref: "SHORT-TERM BOUNCE STRATEGY",
      summary: "Large position tight stop recovery trades permitted on occasion. $15K-$25K with very tight stops to capture short-term bounces. Does NOT replace core $500 max loss or 3:1 R/R standards. Three mandatory declarations at entry: (1) specific short-term catalyst and time horizon in days, (2) stop at genuine thesis-break level, (3) hard exit date. Without all three: defaults to standard sizing. SNPS S60 is proof of concept.",
    },
    {
      ref: "TOOL PATH RULE PERMANENT",
      summary: "C:\\...Dropbox\\ paths: use filesystem MCP tools only (filesystem:write_file, filesystem:edit_file). /home/claude/ or /mnt/ paths: use str_replace, bash_tool, create_file. Never cross.",
    },
  ],

  processNotes: {
    dropboxProtocol: "DIRECT WRITE CONFIRMED via filesystem MCP.",
    journalVersion: "I17 compliant — new file, not overwrite. trading_journal74.jsx is the S60 record.",
    nextJournal: "trading_journal75.jsx",
  },
};

export default journalS60;
