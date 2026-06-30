// CLAUDE FUND - TRADING JOURNAL S64
// Session: S64 | Date: Thursday 11 June 2026
// Prev journal: trading_journal76.jsx (S63) | Next: trading_journal78.jsx
// Session type: Full market session — SPCX listing eve. LSE open AM, NYSE open PM.
// Most consequential loss session in fund history. Two FAC entries, one catastrophic.
// ===================================================================

const journalS64 = {

  session: "S64",
  date: "2026-06-11",
  dayOfWeek: "Thursday",

  openNetLiq: 103183.86,
  closeNetLiq: 97329.08,
  dailyPnL: -5854.78,
  realisedPnL_USD: -5007.00,  // FAC1 -5122, ZENA +115, LW +47, ACM -20
  unrealisedChange: -847.78,
  totalCashValue: 55491.49,
  positionsActive: 7,
  leverage: 0.43,

  macro: {
    VIX: "22.22 close S63. Elevated throughout S64.",
    tenYr: "~4.52-4.55%",
    WTI: "~$91-92. Brent spiked $94.31 on Trump Kharg Island post, faded to $92. Market not believing oil infrastructure threat.",
    NasdaqFutures: "+1.40% pre-open, faded to flat after Trump Kharg Island Truth Social post 16:25 UAE. NQ1 dropped 270 points then recovered.",
    iranIsrael: "Trump posted 'US will hit Iran VERY HARD TONIGHT' and threatened Kharg Island (90% Iranian oil exports). Market discounted — Brent faded. Qatar mediating ceasefire drafts. Pattern: Trump threatens oil infrastructure, strikes military targets only, Hormuz stays open.",
    SPCX: "Prices tonight June 11. Lists tomorrow June 12 on Nasdaq. $135/sh, $75B raise, $250B demand (3.3x oversub), ~3-4% float. Overnight catalyst for space adjacency names.",
    marketHealthScore: "~12/24 AMBER.",
  },

  stage1Completions: [
    { ticker: "LITE", verdict: "MONITORING", zone: "$780-830", catalyst: "Aug 11 earnings / Nvidia photonics announcement", thesis: "AI photonics supercycle. 80-90% annual revenue growth guided. 23% drawdown from ATH $1,085." },
    { ticker: "ORCL", verdict: "ACTIVE Strategy A", zone: "$172-185", stop: "$165", target: "$225", maxLoss: "$490 (35sh)", catalyst: "Sep 8 Q1 FY27 earnings", thesis: "Double beat Q4. Sold off on $40B capex raise. $638B RPO, $75B customer-prepaid. Forward PE 22.2x vs 5yr avg 32x. Crash test PASS." },
    { ticker: "BKSY", verdict: "UNIVERSE", notes: "$250M ATM overhang. Revisit below $25 or ATM complete." },
    { ticker: "FLYW", verdict: "MONITORING", zone: "$12.50-14.50", catalyst: "Aug 4 earnings", thesis: "Rev +41%, profitable, $50M buyback. Sub-1% churn. CFO sold 30K shares April — flag." },
  ],

  trades: [
    {
      symbol: "LW", side: "SELL", qty: 35, type: "MARKET DAY",
      realisedPnL: "+$47 approx",
      thesis: "T67 C4 — no catalyst, capital better deployed. Position too small at $1,500.",
    },
    {
      symbol: "ZENA", side: "SELL", qty: 1000, type: "STOP GTC $1.48 triggered",
      realisedPnL: "+$115 approx",
      thesis: "Stop raised S64 from $1.38 to $1.48. Triggered at open. Correct — slot too small at $1,365.",
    },
    {
      symbol: "ACM", side: "SELL", qty: 65, type: "STOP GTC triggered $68.85 overnight",
      realisedPnL: "-$20",
      thesis: "Mechanical stop. Correct by definition.",
    },
    {
      symbol: "FAC",
      entry: "BUY 870sh @ $24.97 MARKET — Strategy B",
      stop: "$21.00 GTC",
      deployed: 21723,
      catalyst: "Stellantis press release 08:05 ET June 11: first North American automotive solid-state battery integration into Dodge Charger Daytona. Road testing confirmed. SPCX listing tonight. June 17 Bell ceremony. Float mechanics 10-15M tradeable shares.",
      declarations: {
        d1: "Stellantis OEM road testing + SPCX tonight + June 17 Bell",
        d2: "$21.00 — below prior day close $21.94",
        d3: "June 17 before 20:00 UAE",
      },
      outcome: "CATASTROPHIC LOSS — E35 app freeze caused stop cancellation during open waterfall.",
      exitPrice: 19.083172,
      exitQty: 870,
      realisedPnL: -5122,
      errorCode: "E35 — IBKR APP FREEZE STOP CANCELLATION",
      notes: "Open-drive fake-out (June 9 pattern repeat): opened $25.00, spike $25.20, waterfall to $19.08. PIPE sellers distributing from $10.07 cost. Entry was correct and justified. Loss caused by stop cancellation during app freeze, not bad thesis.",
    },
    {
      symbol: "FAC",
      entry: "BUY 800sh @ $17.75 LIMIT — Strategy B RE-ENTRY",
      stop: "$16.80 GTC — PLACED SIMULTANEOUSLY, confirmed on chart",
      deployed: 14200,
      catalyst: "Same thesis. June 9 base pattern match. Volume exhaustion signal 18:13 UAE (5.07K green volume). SPCX pricing tonight as overnight recovery catalyst.",
      declarations: {
        d1: "SPCX pricing tonight + June 17 Bell + Stellantis validation",
        d2: "$16.80 — below session low $17.40",
        d3: "June 17 before 20:00 UAE",
      },
      status: "OPEN — $17.03 last, stop $16.80 GTC live and confirmed on chart at close",
      unrealisedPnL: -578,
      notes: "E35 protocol applied: stop placed simultaneously with entry, confirmed visible on chart before any other action. If stop triggers: reassess floor at $15.40 (June 9 low), wait for base confirmation, re-enter ahead of June 17 Bell.",
    },
  ],

  positions: [
    { symbol: "FAC",  qty: 800,   avgCost: 17.755,  last: 17.03,  unrealisedPnL: -578,   stop: 16.80,   strategy: "B", note: "SPCX tonight. Bell June 17. Stop live confirmed on chart." },
    { symbol: "CODA", qty: 250,   avgCost: 11.105,  last: 11.47,  unrealisedPnL: 91,     stop: 11.01,   strategy: "A" },
    { symbol: "FRSH", qty: 265,   avgCost: 9.305,   last: 9.065,  unrealisedPnL: -64,    stop: 8.81,    strategy: "A" },
    { symbol: "HNR1", qty: 40,    avgCost: 224.71,  last: 231.40, unrealisedPnL: 268,    stop: 225.80,  strategy: "A", currency: "EUR", note: "STANDALONE — manual cancel on exit. ONE stop only." },
    { symbol: "LMT",  qty: 10,    avgCost: 516.83,  last: 540.97, unrealisedPnL: 241,    stop: 519.92,  strategy: "A" },
    { symbol: "RKLB", qty: 55,    avgCost: 110.538, last: 109.75, unrealisedPnL: -43,    stop: 104.99,  strategy: "B", note: "HARD EXIT TOMORROW June 12 close — SPCX listing day. No exceptions." },
    { symbol: "XSG",  qty: 40000, avgCost: 1.5075,  last: 1.425,  unrealisedPnL: -33,    stop: null,    strategy: "A", currency: "GBP" },
  ],

  ordersLive: [
    { symbol: "FAC",  type: "STOP SELL", qty: 800,   stop: 16.80,  note: "GTC — confirmed on chart" },
    { symbol: "CODA", type: "STOP SELL", qty: 250,   stop: 11.01,  note: "GTC" },
    { symbol: "FRSH", type: "STOP SELL", qty: 265,   stop: 8.81,   note: "GTC" },
    { symbol: "HNR1", type: "STOP SELL", qty: 40,    stop: 225.80, note: "GTC STANDALONE EUR" },
    { symbol: "LMT",  type: "STOP SELL", qty: 10,    stop: 519.92, note: "GTC" },
    { symbol: "RKLB", type: "STOP SELL", qty: 55,    stop: 104.99, note: "GTC — Strategy B" },
  ],

  lessonsAdded: [
    {
      ref: "E35 — IBKR APP FREEZE STOP CANCELLATION PROTOCOL",
      rule: "If IBKR app freezes during any active position, the SINGLE FIRST ACTION on restart is to verify and replace the stop. Not the chart. Not the price. Stop first. Everything else second. Non-negotiable. Applied immediately on second FAC entry — stop placed simultaneously with entry, confirmed on chart.",
    },
    {
      ref: "T73 — DE-SPAC ATH OPEN REJECTION PATTERN",
      rule: "Low-float de-SPAC names testing prior ATH on open produce open-drive fake-outs as PIPE sellers distribute into the bid. ATH break requires DAILY CLOSE above resistance, not intraday touch. Large sizing requires daily close confirmation, not intraday spike.",
    },
    {
      ref: "T74 — PIPE SELLER DISTRIBUTION PATTERN",
      rule: "Identifiable by unbroken lower highs and lower lows, no sustained bounces, consistent red volume. Cannot be fought. Must be waited out. Recovery requires capitulation volume spike (5-10x normal) followed by volume dry-up. PIPE selling on FAC from $10.07 basis at $17-25 = 70-150% gain for sellers.",
    },
    {
      ref: "P41 — MANAGEMENT QUALITY AS CONVICTION ANCHOR",
      rule: "FAC management known personally. Institutional demand at $100+ valuation confirmed. In-Q-Tel, Mercedes, Stellantis, Hyundai, Kia backing. Use for thesis conviction and re-entry resolve. Does not override short-term float mechanics or stop discipline.",
    },
  ],

  facThesis: {
    catalysts: [
      "Stellantis road testing June 11 — first North American OEM solid-state integration",
      "SPCX pricing tonight — new listings narrative",
      "June 17 Nasdaq Opening Bell — exhibition vehicles outside Nasdaq 10:00-11:30am ET",
      "Mercedes 1,205km single-charge Q3 2025",
      "In-Q-Tel strategic investor",
      "Hyundai/Kia OEM validation",
    ],
    floatStructure: "~10-15M tradeable. PIPE basis $10.07, ~10M shares, registration effective imminently.",
    reEntryIfStoppedOut: "Floor at $15.40 (June 9 low) if $16.80 triggers. Capitulation volume spike required before re-entry. Re-enter on confirmed base with tight stop ahead of June 17 Bell.",
  },

  nextSessionActions: [
    "1. FAC overnight — stop triggered or SPCX drove recovery? First check at open.",
    "2. RKLB — SPCX listing day. Raise stop on strength. HARD EXIT today close no exceptions.",
    "3. ORCL — floor at $172-185? Entry if base confirmed.",
    "4. HNR1 standalone stop — ONE stop €225.80 confirmed.",
    "5. Market health re-score — VIX, 10yr, WTI post-Trump strikes.",
    "6. Iran — Trump struck Iran tonight. Oil market reaction at open.",
    "7. Friday scan — CF-SCREEN-D first, then A, B, C, SI39.",
    "8. MRVL S&P 500 inclusion June 22 — Stage 2 this week.",
    "9. DECISION_REGISTER — FAC re-entry conditions, ORCL zone, LRCX removed.",
  ],

  processNotes: {
    dropboxProtocol: "DIRECT WRITE CONFIRMED via filesystem MCP.",
    journalVersion: "I17 compliant — new file trading_journal77.jsx.",
    nextJournal: "trading_journal78.jsx",
    sessionCharacter: "Worst single-day loss in fund history. -$5,854 daily P&L. Primary cause: E35 app freeze stop cancellation on FAC first entry. Entry thesis correct and justified by Stellantis catalyst. Second FAC entry $17.75 stop $16.80 live and confirmed — overnight thesis intact for June 17 Bell.",
    fundHealthNote: "Net liq $97,329. Still above $90K floor. $55K cash available. No existential threat.",
  },
};

export default journalS64;
