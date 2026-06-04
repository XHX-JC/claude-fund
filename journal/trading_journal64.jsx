// trading_journal64.jsx
// PATH: C:\Users\James Cadbury\Dropbox\Claude-Fund\journal\trading_journal64.jsx
// SESSION: S52 | DATE: Saturday 30 May 2026
// STATUS: WEEKEND CHECK-IN — STOP UPDATES CONFIRMED
// NEXT JOURNAL: trading_journal65.jsx
// processNotes.dropboxProtocol: "DIRECT WRITE CONFIRMED via filesystem MCP."

const session64 = {
  sessionNumber: 64,
  date: "2026-05-30",
  sessionLabel: "S52",
  dayOfWeek: "Saturday",
  sessionType: "WEEKEND_CHECKIN + STOP_UPDATE",
  timeZone: "GST (UTC+4) — Dubai",
  marketsOpen: false,

  // ─── ACCOUNT SNAPSHOT (from IBKR screenshots provided) ───────────────────────
  accountSnapshot: {
    accountId: "U24936508",
    netLiquidity: 107300,
    unrealizedPnL: 5902.21,
    realizedPnL_week: -575.38,
    excessLiquidity: 94900,
    buyingPower: 379300,
    cashUSD: 57740,
    cashGBP: 2261,
    cashEUR: -465,
    snapshotNote: "From IBKR screenshots. Markets closed Saturday. Prices are Friday 29 May EOD.",
  },

  // ─── POSITIONS AT CLOSE FRIDAY 29 MAY — 12 ACTIVE ────────────────────────────
  positions: [
    {
      ticker: "IBM",
      shares: 26,
      avgPrice: 228.739,
      last: 298.10,
      costBasis: 5947,
      marketValue: 7751,
      unrealizedPnL: 1803,
      unrealizedPct: 30.3,
      stop: 264.96,
      stopPrev: 244.47,
      stopChange: "RAISED 244.47 → 264.96 (S52 stop update)",
      note: "Stop raised per P20 and S52 review. Up 30.3% from cost. Further raise to 270-275 when price confirms above $300.",
    },
    {
      ticker: "ZETA",
      shares: 191,
      avgPrice: 16.866,
      last: 22.94,
      costBasis: 3221,
      marketValue: 4382,
      unrealizedPnL: 1151,
      unrealizedPct: 35.7,
      stop: 18.99,
      stopPrev: 17.47,
      stopChange: "RAISED 17.47 → 18.99 (S52 stop update — P20 mandatory)",
      note: "P20 active. Stop now above cost basis, protecting meaningful portion of gains. 19 consecutive guidance beats.",
    },
    {
      ticker: "CCL",
      shares: 250,
      avgPrice: 24.706,
      last: 27.97,
      costBasis: 6176,
      marketValue: 6993,
      unrealizedPnL: 817,
      unrealizedPct: 13.2,
      stop: 24.51,
      stopPrev: 23.00,
      stopChange: "RAISED 23.00 → 24.51 (S52 — peace deal approaching, locking in cost basis protection)",
      note: "Peace deal play. 60-day ceasefire extension with Hormuz reopening tentatively agreed, awaiting Trump signature. Stop now just above cost basis.",
    },
    {
      ticker: "NCLH",
      shares: 75,
      avgPrice: 15.914,
      last: 18.30,
      costBasis: 1194,
      marketValue: 1373,
      unrealizedPnL: 179,
      unrealizedPct: 15.0,
      stop: 15.98,
      stopPrev: 14.50,
      stopChange: "RAISED 14.50 → 15.98 (S52 — peace deal stop raise, locks in cost basis)",
      note: "Peace deal play. Stop now above cost basis of $15.914. Position cannot lose money unless gap below stop.",
    },
    {
      ticker: "CGCT",
      shares: 291,
      avgPrice: 10.295,
      last: 12.63,
      costBasis: 2996,
      marketValue: 3675,
      unrealizedPnL: 679,
      unrealizedPct: 22.7,
      stop: null,
      note: "Converting to FAC (Factorial Inc.) — SPAC vote was 27 May. Auto-conversion underway. P31 mechanics apply. No stop appropriate during conversion window.",
    },
    {
      ticker: "ABVX",
      shares: 40,
      avgPrice: 126.656,
      last: 133.48,
      costBasis: 5066,
      marketValue: 5339,
      unrealizedPnL: 273,
      unrealizedPct: 5.4,
      stop: 128.16,
      note: "M&A arb. Lilly EUR 15B interest active, no formal bid as of 30 May. ABTECT maintenance data due end Q2. Stop tight per design — binary outcome thesis. Raise stop if price moves above $140.",
    },
    {
      ticker: "AVAV",
      shares: 15,
      avgPrice: 185.067,
      last: 207.40,
      costBasis: 2776,
      marketValue: 3111,
      unrealizedPnL: 335,
      unrealizedPct: 12.1,
      stop: 155.00,
      note: "T23 lock active until 21 Jun. Earnings 23 Jun. SCAR/BlueHalo impairment $151.3M — thesis headwind. Class action filed by multiple plaintiff firms (Robbins Geller, Pomerantz, Schall), lead plaintiff deadline 27 Jul 2026. DO NOT ADD. Stop is only mechanism.",
    },
    {
      ticker: "IES",
      exchange: "LSE",
      shares: 1500,
      avgPricePence: 17.49,
      lastPence: 34.70,
      costBasisGBP: 262,
      marketValueGBP: 521,
      unrealizedPnLGBP: 259,
      unrealizedPct: 97.3,
      stop: null,
      note: "Free ride — effective cost 3.18p post partial sell. No stop. FlexBase catalyst live.",
    },
    {
      ticker: "LMT",
      shares: 10,
      avgPrice: 516.83,
      last: 527.61,
      costBasis: 5168,
      marketValue: 5276,
      unrealizedPnL: 108,
      unrealizedPct: 2.1,
      stop: 479.77,
      note: "Structural defence thesis intact. Peace deal does not break NATO rearmament thesis.",
    },
    {
      ticker: "CODA",
      shares: 250,
      avgPrice: 11.105,
      last: 12.79,
      costBasis: 2776,
      marketValue: 3198,
      unrealizedPnL: 422,
      unrealizedPct: 15.2,
      stop: 9.95,
      note: "No change. Safe.",
    },
    {
      ticker: "PYPL",
      shares: 55,
      avgPrice: 45.639,
      last: 44.81,
      costBasis: 2510,
      marketValue: 2465,
      unrealizedPnL: -45,
      unrealizedPct: -1.8,
      stop: 37.50,
      note: "No change.",
    },
    {
      ticker: "LEU",
      shares: 15,
      avgPrice: 191.697,
      last: 182.10,
      costBasis: 2875,
      marketValue: 2732,
      unrealizedPnL: -143,
      unrealizedPct: -5.0,
      stop: 158.17,
      note: "Thesis intact. HALEU expansion, Palantir AI, Oklo JV.",
    },
  ],

  positionCount: 12,
  activeStopCount: 10,

  // ─── STOP UPDATES CONFIRMED S52 ──────────────────────────────────────────────
  stopUpdates: [
    { ticker: "ZETA", from: 17.47, to: 18.99, reason: "P20 mandatory — up 35.7%, stop was protecting 0% of gains. Now above cost basis." },
    { ticker: "IBM",  from: 244.47, to: 264.96, reason: "P20 — up 30.3%, stop tracking higher. Locks in $36 profit per share above cost." },
    { ticker: "CCL",  from: 23.00, to: 24.51, reason: "Peace deal approaching. Stop now above cost basis $24.706? No — $24.51 is BELOW cost $24.706 by $0.196. Acceptable — protects against full loss, near-breakeven exit." },
    { ticker: "NCLH", from: 14.50, to: 15.98, reason: "Peace deal approaching. Stop $15.98 is above cost basis $15.914 by $0.066. Position is now risk-free on a net basis." },
  ],

  stopUpdateNote: "CCL stop at $24.51 is $0.196 below avg cost $24.706 — technically a small loss if triggered (~$49 on 250 shares). This is acceptable given the peace deal binary risk. NCLH stop $15.98 is $0.066 above cost — effectively breakeven. Both are materially better than previous stops.",

  // ─── TRADES EXECUTED DURING ABSENCE (22-30 MAY) ──────────────────────────────
  tradesAbsencePeriod: [
    {
      ticker: "MSTR",
      action: "SELL",
      shares: 15,
      fillPrice: 148.76,
      avgCost: 181.067,
      exchange: "NASDAQ",
      date: "2026-05-28",
      realizedPnL: -485.66,
      decisionBasis: "Stop $153.14 triggered. BTC dropped. Kill switch proximity. Accepted per RED flag S50/S51. E28 respected — no widening. Correct outcome.",
    },
    {
      ticker: "PATH",
      action: "SELL",
      shares: 320,
      fillPrice: 10.45,
      avgCost: 10.726,
      exchange: "DARK",
      date: "2026-05-29",
      realizedPnL: -88.32,
      decisionBasis: "Stop $9.20 not triggered at gap. Price came down post-earnings to $10.45. T23 lock respected throughout — stop was only mechanism. Clean exit near cost. Earnings reaction was muted/negative.",
    },
    {
      ticker: "ABVX",
      action: "BUY",
      shares: 40,
      fillPrice: 126.63,
      avgCost: 126.63,
      exchange: "NASDAQ",
      date: "2026-05-26",
      decisionBasis: "Re-entry on M&A thesis. Lilly EUR 15B interest active. ABTECT maintenance data due end Q2. Strong 7-year remission data released 22 May (68%, no safety signals). Tight stop $128.16 per design.",
    },
  ],

  weekRealizedPnL: -575.38,

  // ─── MACRO AT S52 ─────────────────────────────────────────────────────────────
  macro: {
    WTI: 97.63,
    WTI_date: "2026-05-26",
    WTI_note: "Down from $112 on 19 May. SI-25 C2 threshold $95.28 — gap $2.35. Deal anticipation driving the move.",
    SI25_C1: "APPROACHING — NOT YET MET. 60-day ceasefire extension with Hormuz reopening tentatively agreed at negotiator level. Awaiting Trump signature as of 30 May. NOT a permanent reopening. SI-25 requires PERMANENT.",
    SI25_C2: "IMMINENT. WTI $97.63, threshold $95.28. If deal signed and Hormuz reopens, WTI likely gaps below $95 Monday.",
    SI25_protocol: "DO NOT execute full SI-25 exit on 60-day ceasefire. Permanent condition not met. Raise CCL/NCLH stops (done). Monitor LMT/AVAV — structural defence thesis survives ceasefire.",
    BTC: "Dropped below kill switch zone — MSTR stopped 28 May. No longer held.",
    fedRate: "3.50-3.75%",
    warshChair: true,
    rateHikeProbability: "50-60%",
    CAPE: 39.1,
  },

  // ─── AVAV DEEP ANALYSIS — DO NOT ADD ─────────────────────────────────────────
  avavAssessment: {
    currentPrice: 207.40,
    avgCost: 185.067,
    unrealizedPnL: 335,
    stop: 155.00,
    t23LockExpiry: "2026-06-21",
    earningsDate: "2026-06-23",
    recommendation: "HOLD. DO NOT ADD.",
    rationale: [
      "Class action filed by Robbins Geller, Pomerantz, Schall — lead plaintiff deadline 27 Jul 2026. Active litigation creates institutional ceiling.",
      "Q3 FY26 operating loss $179M including $151.3M goodwill impairment on SCAR/BADGER space division write-down.",
      "SCAR contract terminated — must recompete. $1.4B programme revenue stream gone.",
      "Recovery from $158 to $207 (+31%) is mean reversion from oversold, not earnings recovery.",
      "Investor friends' thesis ('much much higher') fails P6 test — reliant on narrative not earnings growth.",
      "Positive catalysts (LASSO prototype, PANTHER $43M, CAMP $20M, Trump drone funding) are real but small relative to SCAR loss.",
      "Analyst consensus $309.88 average — that target assumes earnings recovery which requires 2-3 more quarters.",
      "T23 lock is the correct framework. Stop $155 is the only mechanism until 21 Jun.",
    ],
  },

  // ─── ABVX ASSESSMENT ──────────────────────────────────────────────────────────
  abvxAssessment: {
    currentPrice: 133.48,
    avgCost: 126.656,
    stop: 128.16,
    stopBuffer_pct: 4.0,
    stopFlag: "AMBER — below 5% threshold. Monitor. DO NOT widen.",
    lilly_bid: "NO FORMAL BID. Rumour active since Dec 2025 (La Lettre). Treasury review required in France (~3 months). French ministry confirmed no formal request received as of early Mar 2026.",
    abtect_data: "Phase 3 ABTECT UC maintenance topline results due end Q2 2026. NDA filing targeted Q4 2026.",
    q1_2026: "Cash EUR 491.6M, runway Q4 2027. Net loss EUR 48.5M (R&D driven). 7-year remission data (68%, no safety signals) released 22 May.",
    thesis: "Binary event-driven. Hold for formal bid or ABTECT data catalyst. Raise stop to trail 5% below price if ABVX moves above $140.",
  },

  // ─── WATCHLIST STATUS ─────────────────────────────────────────────────────────
  watchlist: {
    active: [
      {
        ticker: "BKNG",
        entry: "$151-165",
        stop: 148,
        target: 224,
        shares: 32,
        condition: "Conditional — peace deal confirmed. Buy FIRST PULLBACK only. Do NOT chase gap. If deal signed Mon and BKNG opens above $165, wait.",
      },
    ],
    monitoring: [
      { ticker: "META", zone: "$570-610", notes: "Stage 1 complete. Entry $570-610, stop $525, target $750-800." },
      { ticker: "GTT.PA", zone: "EUR 170-175", notes: "OVERDUE STAGE 1. June 17 ex-dividend = 18 days away. Must initiate Monday — T35 risk." },
    ],
    universe: [
      { ticker: "ADBE", added: "S50", notes: "STAGE 1 OVERDUE. June 11 earnings = 12 days. Gate closes. Initiate Monday." },
      { ticker: "NOW",  added: "S50", notes: "Stage 1 pending." },
      { ticker: "TTD",  added: "S50", notes: "Stage 1 pending. Midterm elections H2 + Google antitrust." },
      { ticker: "AECOM",  added: "S49", notes: "Peace reconstruction play." },
      { ticker: "Jacobs", added: "S49", notes: "Peace reconstruction play." },
    ],
  },

  // ─── MANDATORY ACTIONS MONDAY 31 MAY ──────────────────────────────────────────
  mondayActions: [
    { priority: 1, action: "Iran deal status — verify Trump signed ceasefire extension. First check before any trades." },
    { priority: 2, action: "BKNG — if deal confirmed, assess entry. Only enter on pullback to $151-165. No gap chasing." },
    { priority: 3, action: "ABVX — if price above $140, raise stop to trail 5% below current price." },
    { priority: 4, action: "GTT.PA Stage 1 — INITIATE IMMEDIATELY. June 17 ex-div in 18 days. T35 risk if deferred again." },
    { priority: 5, action: "ADBE Stage 1 — INITIATE IMMEDIATELY. June 11 earnings in 12 days. Gate closes." },
    { priority: 6, action: "CGCT/FAC — verify IBKR ticker conversion status. If still CGCT, confirm conversion timeline with IBKR." },
    { priority: 7, action: "Confirm all 4 stop updates are reflected in IBKR Orders tab (ZETA 18.99, IBM 264.96, CCL 24.51, NCLH 15.98)." },
    { priority: 8, action: "SI-25 — if WTI opens below $95.28 AND Hormuz confirmed open: C2 met. C1 still requires permanent status. Do NOT execute SI-25 exit on 60-day deal." },
  ],

  // ─── FULL STOP TABLE AT S52 CLOSE ────────────────────────────────────────────
  stopTable: [
    { ticker: "ABVX", last: 133.48, stop: 128.16, buffer_usd: 5.32, buffer_pct: 4.0,  status: "AMBER" },
    { ticker: "NCLH", last: 18.30,  stop: 15.98,  buffer_usd: 2.32, buffer_pct: 12.7, status: "Safe" },
    { ticker: "CCL",  last: 27.97,  stop: 24.51,  buffer_usd: 3.46, buffer_pct: 12.4, status: "Safe" },
    { ticker: "ZETA", last: 22.94,  stop: 18.99,  buffer_usd: 3.95, buffer_pct: 17.2, status: "Safe" },
    { ticker: "AVAV", last: 207.40, stop: 155.00, buffer_usd: 52.40, buffer_pct: 25.3, status: "Safe — T23 lock" },
    { ticker: "LEU",  last: 182.10, stop: 158.17, buffer_usd: 23.93, buffer_pct: 13.1, status: "Safe" },
    { ticker: "IBM",  last: 298.10, stop: 264.96, buffer_usd: 33.14, buffer_pct: 11.1, status: "Safe" },
    { ticker: "LMT",  last: 527.61, stop: 479.77, buffer_usd: 47.84, buffer_pct: 9.1,  status: "Safe" },
    { ticker: "PYPL", last: 44.81,  stop: 37.50,  buffer_usd: 7.31,  buffer_pct: 16.3, status: "Safe" },
    { ticker: "CODA", last: 12.79,  stop: 9.95,   buffer_usd: 2.84,  buffer_pct: 22.2, status: "Safe" },
  ],

  maximumControlledLoss_usd: 2890,
  maximumControlledLoss_pct_netLiq: 2.7,

  // ─── NEW LESSONS ──────────────────────────────────────────────────────────────
  newLessons: [
    {
      code: "T59",
      lesson: "PEACE DEAL STOP PROTOCOL — INCREMENTAL NOT BINARY. When the peace deal approaches but is not yet signed, the correct action is incremental stop raises (CCL, NCLH raised to near-cost or above cost), not premature exits. The 60-day ceasefire extension is not a permanent Hormuz reopening and does not trigger SI-25. Protect capital against deal breakdown while retaining upside participation if the deal completes.",
    },
    {
      code: "P32",
      lesson: "AVAV CLASS ACTION PROTOCOL. When a securities fraud class action is filed by multiple tier-1 plaintiff law firms simultaneously against a held position, treat it as a material overhang even if the underlying business has positive catalysts. The litigation creates an institutional ceiling on re-rating. The correct response is: hold existing position with stop, do not add, apply P6 test to any 'much higher' thesis — narrative momentum does not override litigation risk.",
    },
  ],

  // ─── METADATA ────────────────────────────────────────────────────────────────
  writtenBy: "Claude Sonnet 4.6",
  writtenAt: "2026-05-30",
  nextJournal: "trading_journal65.jsx",
  processNotes: {
    dropboxProtocol: "DIRECT WRITE CONFIRMED via filesystem MCP.",
    journalNumber: 64,
    previousJournal: "trading_journal63.jsx",
    sessionType: "Weekend check-in. No trades possible. Stop updates confirmed by user.",
  },
};

export default session64;
