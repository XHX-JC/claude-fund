// CLAUDE FUND - TRADING JOURNAL S65
// Session: S65 | Date: Friday 12 June 2026
// Prev journal: trading_journal77.jsx (S64) | Next: trading_journal79.jsx
// Session type: Full Friday session. SPCX listing day. Iran ceasefire confirmation.
// Most active session in fund history: 4 exits, 2 entries, 3 stop modifications.
// FAC third entry and third loss. ORCL $20K conviction entry.
// ===================================================================

const journalS65 = {

  session: "S65",
  date: "2026-06-12",
  dayOfWeek: "Friday",

  openNetLiq: 97329.08,
  closeNetLiq: 95399.00,
  dailyPnL: -1930.08,
  realisedPnL_USD: -1206.00,
  unrealisedPnL: -220.00,
  totalCashValue_USD: 56069.00,
  positionsActive: 5,
  leverage: 0.41,

  macro: {
    VIX: "~20, improving from 22.22 prior close",
    tenYr: "~4.53%",
    WTI: "~$86-87 (collapsed $6.50+ on Iran peace)",
    iranCeasefire: "BOTH SIDES CONFIRMING for first time. Iran posted social media confirmation. Trump cancelled strikes Thu, announced 'signing this weekend in Europe.' Not yet signed. Naval blockade remains. Fund rule: SIGNED DEAL ONLY for peace basket entry. Closest to deal since April 8 ceasefire.",
    SPCX: "Listed Friday June 12 on Nasdaq. $135/sh, $75B raise, $250B demand. SELL THE NEWS across space sector: ASTS -10.5%, LUNR -10%, RKLB -7%, RDW -8%, PL -8%. Space proxy trade was a one-day event (Thursday premarket).",
    marketHealthScore: "~11/24 AMBER (improving: VIX <20, WTI <$90 on peace, oil dropping)",
    tape: "Bifurcated: EU peace trades rallied (TUI +7%, IAG +5.5%, LHA +5.5%), space sector crashed, US broad market mixed/down. Fed June 17 remains key risk.",
    facSuper8K: "Factorial filed Super 8-K with Q1 2026 financials. Q2 results August 13.",
    adbeEarnings: "ADBE beat Q2 (rev $6.62B +13%, EPS $5.96 vs $5.81). Fell 7.8% on CFO departure (going to MRVL) + AI disruption fears. Screen B hit at P/E 11.8x.",
  },

  trades: [
    {
      symbol: "FAC", side: "BUY", qty: 579, avgPrice: 17.389,
      type: "LIMIT DAY $17.50 (premarket fill, outside RTH enabled)",
      stop: 15.40, stopType: "GTC, placed simultaneously E35 protocol",
      deployed: 10068,
      strategy: "A",
      entryLogic: "Third entry. $10K conviction sizing. Stop at $15.40 (below June 9 absolute low). Premarket entry after EMA cross signal and FRVP volume support at $17 confirmed. James override on premarket entry (correct: saved $0.11/share vs open).",
      exitPrice: 14.71,
      exitType: "STOP triggered, GAPPED THROUGH. Stop $15.40, fill $14.71. Slippage $0.69.",
      realisedPnL: -1551,
      notes: "Third FAC loss. Total FAC damage across three entries: -$7,564. PIPE distribution overwhelmed all buying interest at every entry. T73/T74 patterns repeated. Cooling-off rule activated: no fourth entry without full session gap + fresh Stage 2 + confirmed PIPE exhaustion. Thesis (Stellantis, Bell June 17, management $100+ view) unchanged. Entry timing during PIPE distribution week is the problem, not the thesis.",
    },
    {
      symbol: "RKLB", side: "SELL", qty: 55, price: 114.56,
      type: "STOP GTC triggered ($114.57 stop, $114.56 fill)",
      realisedPnL: 221,
      notes: "SPCX listing day. Premarket showed $123. Limit sell $139.98 placed but CANCELLED (never reached). Stop at $114.57 triggered at open as space sector crashed on sell-the-news. RKLB fell from $120 premarket to $106 by mid-session. Stop exit was correct. Lesson: limit was set too high at $139.98 (should have been $125-130 range for a realistic fill on a hard exit day).",
    },
    {
      symbol: "CODA", side: "SELL", qty: 250, price: 11.60,
      type: "STOP GTC triggered ($11.80 stop, $11.60 fill, $0.20 slippage)",
      realisedPnL: 124,
      notes: "Stop raised from $11.01 to $11.80 at session open. Correct: locked in profit. Triggered in broad open selloff. Mechanical, correct by definition.",
    },
    {
      symbol: "ORCL", side: "BUY", qty: 108, avgPrice: 184.51,
      type: "LIMIT DAY $184.50 (filled at open $184.50 via OCA bracket)",
      stop: 170.00, stopType: "GTC, OCA bracket linked",
      deployed: 19927,
      strategy: "A",
      entryLogic: "Oversized conviction entry $20K. Stage 2 complete S64. Down 46% from ATH on capex guidance selloff. P/E 22x vs 32x historical. $638B RPO, $75B customer prepaid. Crash stress test PASS. R/R 2.9:1 to $225 target. Catalyst Sep 8 Q1 FY27 earnings. Fed probability analysis: 75-80% benign outcome. Chart confirmed: $172 capitulation low tested and held Thursday, FRVP showed heavy buyer accumulation at $182-186.",
      status: "OPEN at ~$180.63. Unrealised -$419. Stop $170 has 5.9% buffer.",
    },
  ],

  positions: [
    { symbol: "ORCL", qty: 108,   avgCost: 184.51,  last: 180.63,  unrealisedPnL: -419, stop: 170.00, strategy: "A", note: "$20K conviction. Sep 8 catalyst. Stop has room." },
    { symbol: "LMT",  qty: 10,    avgCost: 516.83,  last: 543.87,  unrealisedPnL: 270,  stop: 527.97, strategy: "A", note: "Stop raised today from $519.92" },
    { symbol: "HNR1", qty: 40,    avgCost: 224.71,  last: 229.80,  unrealisedPnL: 204,  stop: 225.80, strategy: "A", currency: "EUR", note: "STANDALONE. Stop raised to 228 then lowered back to 225.80 (broad selloff buffer). ONE stop only." },
    { symbol: "FRSH", qty: 265,   avgCost: 9.305,   last: 9.15,    unrealisedPnL: -41,  stop: 8.81,   strategy: "A", note: "Aug 4 earnings catalyst" },
    { symbol: "XSG",  qty: 40000, avgCost: 1.5075,  last: 1.425,   unrealisedPnL: -33,  stop: null,   strategy: "A", currency: "GBP" },
  ],

  ordersLive: [
    { symbol: "ORCL", type: "STOP SELL", qty: 108,  stop: 170.00,  note: "GTC OCA bracket" },
    { symbol: "LMT",  type: "STOP SELL", qty: 10,   stop: 527.97,  note: "GTC, raised S65" },
    { symbol: "HNR1", type: "STOP SELL", qty: 40,   stop: 225.80,  note: "GTC STANDALONE EUR, lowered from 228 during selloff" },
    { symbol: "FRSH", type: "STOP SELL", qty: 265,  stop: 8.81,    note: "GTC" },
  ],

  research: {
    MRVL: "Stage 2 COMPLETE. S&P 500 inclusion June 22. Category 4 catalyst. $279.60 at analysis. PASSED by James: P/E 85-102x, YTD +210%, insider selling $32M, R/R only 1.4:1 at best. Fed June 17 risk directly threatens high-multiple names. Correct decision: capital better deployed in ORCL.",
    BABA: "Stage 1 COMPLETE. Cloud revenue +40%, AI revenue $5.3B annualised, P/E 10-11x. Cheapest major AI/cloud play globally. BUT: VIE structure risk, US delisting risk, US-China tariffs 145%. MONITORING via 9988.HK (Hong Kong listing preferred over US ADR). Entry zone HK$780-840 on confirmed base. $5K volatile tier.",
    PL: "Added to UNIVERSE. Planet Labs, earth observation satellite company. $240M revenue, 200+ satellites. Corrected 39% from $52 to $31.49. SPCX sell-the-news dragged it further. Stage 1 required to identify selloff catalyst.",
    ADBE: "Screen B hit at $201.87. P/E 11.8x (historical 30-40x). Beat on revenue +13% and EPS. CFO departing for MRVL + CEO also stepping down = dual management exodus. AI disruption thesis (Claude Design, Midjourney). WATCH but Stage 1 needed. Not entered today.",
    RYAAY: "Analysed as peace bounce vehicle. +11% on April 8 ceasefire, best EU airline bounce. Moved from $56 to $62 on today's peace news. Confirmed Day 2 bounce fades for US names. EU names have their Day 1 today. Watch for Monday if Iran deal signs this weekend.",
    WIZZ: "LSE listed. Up ~10% on double catalyst: annual earnings beat + peace bounce. Strongest EU airline today. WATCH for Monday alongside RYAAY.",
    peaceBasketAnalysis: "Systematic review of April 8 ceasefire gainers. Cruise (NCLH +11.75%, CCL +11.23%) and budget airlines (RYAAY +11%, LUV +10.38%) lead. Day 2 historically fades. EU names today having their Day 1. Peace bounce is a single-session event for each market's first open after the news.",
  },

  sizingFrameworkUpdate: {
    note: "S65 codified new conviction-weighted sizing framework per James's direction from S63 discussions.",
    tiers: {
      volatileSpeculative: "$5,000 deployed (de-SPACs, micro-caps, China ADRs, pre-revenue names)",
      largerCap: "$10,000 deployed (established companies, proven revenue, liquid markets)",
      convictionOverride: "$20,000 deployed (requires: crash stress test PASS, fundamental thesis quantified, stop below structural support, documented override reasoning). ORCL S65 is the first conviction override position.",
    },
    rule: "Fewer positions held aggressively. Quality over quantity. This replaces the $500/$900 max loss ceiling for Strategy A. Max loss is now a function of sizing tier + stop width, not a fixed ceiling.",
  },

  lessonsAdded: [
    {
      ref: "T75 — DE-SPAC STOP SLIPPAGE RULE",
      summary: "Three FAC stops, three significant slippages: $0.164 (S64 first), $0.164 (S64 second), $0.69 (S65). On de-SPAC float (10-15M shares), assume $0.50-0.70 slippage when calculating max loss. Actual max loss = (shares x stop width) + (shares x $0.60 slippage estimate). Applied retroactively to all future low-float entries.",
    },
    {
      ref: "T76 — LIMIT/STOP COORDINATION ON HARD EXIT DAY",
      summary: "RKLB S65: limit sell at $139.98 was cancelled (never reached), stop at $114.57 triggered at $114.56. Lesson: on a hard exit day, the limit should be set at a REALISTIC level near current price, not at aspirational ATH targets. A $125-130 limit might have filled on the premarket spike; $139.98 was never realistic given the sell-the-news dynamics. The limit exists to capture spikes, not to set a target price.",
    },
    {
      ref: "T77 — PREMARKET ENTRY VALIDATION",
      summary: "FAC premarket entry at $17.389 saved $0.11/share vs the $17.50 limit. James's instinct to enter premarket was correct on the mechanics: with a $15.40 stop giving $2+ of room, the $0.18 difference between premarket and open entry is immaterial to risk but material to upside. On high-conviction Strategy A entries with wide stops, premarket entry is valid IF the bid/ask spread is <$0.30 and the limit is set at or near the ask.",
    },
    {
      ref: "P42 — FAC COOLING-OFF RULE (S65)",
      summary: "Three entries, three losses, -$7,564 total. Thesis not disproven but entry timing during PIPE distribution week is wrong. Rule: no fourth FAC entry without (1) full session gap, (2) fresh Stage 2 reassessment with cash runway and PIPE distribution status, (3) confirmed PIPE exhaustion via volume dry-up at a tested base. The Bell June 17 catalyst alone does not override this rule.",
    },
    {
      ref: "P43 — IBKR MARKET DATA UPGRADE (S65)",
      summary: "Upgraded from complimentary non-consolidated to paid streaming Level 1 (US Securities Snapshot + US Equity/Options Streaming Bundle, $14.50/month). Live bid/ask, last price, volume across NYSE/Nasdaq/AMEX. Eliminates delayed data issues on open timing decisions. Standing note for all future sessions.",
    },
  ],

  fridayScanResults: {
    screenD: "5 results, all ETFs. No individual stocks with volume anomaly. Screen filter needs ETF exclusion for future runs.",
    screenA: "5 space names crashing: ASTS -10.5%, FLY -12%, LUNR -10%, VELO -20%, SIDU -10%. SPCX sell-the-news. Not actionable.",
    screenB: "3 results: ADBE $201.87 P/E 11.8x (strongest, needs Stage 1), CRDO $251 P/E 101x (too expensive), RDDT $162 P/E 46x (growth but no catalyst).",
    screenC: "43 results. Notable: POWL $303 (above zone), FUTU $98.69 +3.31% (UNIVERSE confirmed), CRS $570, TSM $424, NVDA $206, NXPI $302 (above $280 alert).",
    screenSI39: "Blank. No thesis drawdown names in range.",
    peaceTradeEU: "IAG +5.56%, LHA +5.53%, TUI +6.97% — EU Day 1 peace bounce. Confirmed thesis: peace bounce is single-session per market.",
    screenDfix: "Action item: add ETF exclusion to CF-SCREEN-D filter to prevent ETF-only results.",
  },

  btcWeeklyCheck: {
    price: 63305,
    entryConditions: "0/3 met. Price $63.3K above $53-58K zone. SPX above 50d MA. F&G improving on peace news.",
    action: "MONITOR. No change.",
  },

  nextSessionActions: [
    "1. IRAN DEAL: check weekend signing. If signed, prepare RYAAY (Nasdaq ADR) or UAL for Monday peace basket entry with full Strategy B declarations.",
    "2. ORCL: check overnight. Stop $170, 5.9% buffer. First week of ownership. Watch for stabilisation above $180.",
    "3. FAC: OBSERVE ONLY. Cooling-off period. Watch for PIPE exhaustion (volume dry-up at base). June 17 Bell is Tuesday. If FAC bases $13-14 and volume dries, re-entry ahead of Bell can be evaluated Monday. But not today.",
    "4. ASTS: watch for base formation after SPCX crash. June 17 BlueBird launch. Potential Monday Strategy B if it stabilises.",
    "5. ADBE: Stage 1 investigation (CFO/CEO departure, AI disruption thesis). If bases at $195-200.",
    "6. ZS: alert $120 briefly triggered. Zone $114-120. Stage 2 required before entry.",
    "7. Market health re-score Monday. VIX falling, WTI collapsing on peace. Score may improve toward GREEN.",
    "8. STRATEGY_FRAMEWORK.md: codify new sizing tiers ($5K/$10K/$20K) at next session.",
    "9. CF-SCREEN-D: fix ETF exclusion filter.",
    "10. BABA: added to MONITORING. 9988.HK preferred route. Watch for base.",
    "11. PL: added to UNIVERSE. Stage 1 when base forms.",
    "12. Weekly review: net liq down from $103K (S63 open) to $95.4K. -$7.6K in two sessions. FAC accounts for $7,564 of that. Without FAC, fund is approximately flat. The FAC experiment is the lesson, not the fund performance.",
  ],

  processNotes: {
    dropboxProtocol: "DIRECT WRITE CONFIRMED via filesystem MCP.",
    journalVersion: "I17 compliant. New file trading_journal78.jsx.",
    nextJournal: "trading_journal79.jsx",
    sessionCharacter: "Most active session in fund history. 4 exits (FAC -$1,551, RKLB +$221, CODA +$124), 2 entries (ORCL $20K, FAC $10K). ORCL is the highest-conviction position the fund has taken. FAC third loss triggers cooling-off. James noted: 'not emotional or annoyed, finds Strategy B more interesting, will find the floor on FAC and the correct StratB trades.' Correct mindset.",
    fundHealthNote: "Net liq $95,399. Down from $103K peak (S63). FAC is $7,564 of the $7,600 decline. Without FAC, the fund is approximately flat with improved position quality (ORCL replaces multiple small positions). Cash $56K = 59% cash. Well capitalised for Monday opportunities.",
    weeklyReview: "Net liq -$7.6K over S63-S65 (3 sessions). FAC accounts for 99.5% of the loss. Excluding FAC: +$36. The fund is not losing money on its strategy. It lost money on one name where entry timing was wrong during PIPE distribution. The lesson is specific and documented.",
  },
};

export default journalS65;
