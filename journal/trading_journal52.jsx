import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "fund_journal_v3";

// ===============================================================
// TIMEZONE REFERENCE -- MANDATORY (E1)
// NYSE: opens 17:30 UAE / closes 00:00 UAE (EDT=UTC-4; UAE=UTC+4)
// LSE: opens 11:00 UAE (BST Apr-Oct) / closes 19:30 UAE
// Milan/Frankfurt: opens 11:00 UAE / closes 19:30 UAE
// AMC earnings: print AFTER 00:00 UAE. Stop inactive until 17:30 UAE.
// NEVER calculate market hours from memory. ALWAYS read this block.
//
// LIVE PRICE (E20): IBKR TWS ONLY during market hours. No exceptions.
// STATE MEDIA (E22): CENTCOM/Western source required for military claims.
// EU ENERGY (E23): Section N mandatory every full scan -- core thesis.
// CLOSE TIMING (SI-68): Do NOT write close files until final screenshots.
// DATE DRIFT (E24): System prompt date = session init only. User statement
//   is authoritative. Never infer date from prices -- E25.
// E25: Never cite financial results without verifying fiscal year AND
//   publication date. Prior-year press releases share titles/URLs.
// STOP-LIMIT RULE: Two-leg stop-limit only for volatile/EU/UK stocks.
//   Major US liquid stocks use simple stops only.
// ===============================================================

const INITIAL_STATE = {
  "lastUpdated": "2026-05-07 S37 FINAL (CORRECTED). T35: R3NK BUY 25sh @EUR52.00 filled. T36: AMPX SELL 168sh @$17.94 (-$27.89). T37: MRVL SELL 10sh @$160.02 (+$79.20). T38: CEG SELL 14sh @$314.77 (+$93.77). NCH2 order CANCELLED (E25 -- Q2 FY25/26 not published until May 12). E9 RISK: CEG stop $278 may still be submitted -- CANCEL FIRST ACTION S38. SNPS stop $440 BELOW COST $495.125 -- raise urgently. 18 positions.",
  "sessionNumber": "S37",
  "fund": {
    "account": "U24936508",
    "netLiquidity": 105200,
    "unrealizedPnL": 4260,
    "cashUSD": 38978,
    "cashGBP": 641,
    "cashEUR": -2881,
    "broker": "IBKR Pro",
    "note": "v52 S37 FINAL. Thu 7 May 2026. 18 positions. 2 GTCs. T35-T38 logged. NCH2 cancelled. Restore after session errors."
  },
  "thesis": {
    "title": "IRAN DEAL FRAMEWORK ACTIVE -- WTI BOUNCED -- SI-25 CONDITION 1 UNMET -- THESIS INTACT",
    "summary": "Iran deal one-page MOU framework under review. Nuclear enrichment remains US red line. WTI touched $93 on deal noise then bounced toward $100. Saudi structural damage (~600K bpd) ongoing. SI-25 Condition 1 unmet. Thesis intact.",
    "oilWTI": 100.00,
    "SI25Trigger": 105.87,
    "SI25PeakRef": 117.63,
    "SI25Status": "WTI ~$100. Iran nuclear enrichment = US red line. Condition 1 UNMET. Thesis INTACT.",
    "hormuzStatus": "One-page MOU being reviewed. Fundamental gaps remain. Not a commercial reopening.",
    "keyDates": [
      {"date": "S38 FIRST ACTIONS", "event": "1) Cancel CEG stop $278 (E9). 2) Verify AMPX Sell Limit $32 cancelled (E9). 3) Raise SNPS stop above cost $495.125 urgently.", "priority": "CRITICAL"},
      {"date": "Overnight May 7 AMC", "event": "AMPX Q1 earnings. Read print before market open.", "priority": "HIGH"},
      {"date": "Fri May 8", "event": "Check: AMD Q1, UUUU Q1, R3NK Q1, LDOS. Full scan.", "priority": "HIGH"},
      {"date": "Mon May 12", "event": "NCH2 Q2 FY25/26 results published (07:00 CEST). Read H1 report. Confirm order intake >150M EUR before any entry.", "priority": "HIGH"},
      {"date": "Sun May 11", "event": "CEG Q1 earnings AMC (already closed T38 -- monitoring only).", "priority": "LOW"},
      {"date": "Thu May 22", "event": "BAH Q4 FY2026 earnings gate -- second tranche decision.", "priority": "HIGH"},
      {"date": "Tue May 27 AMC", "event": "SNPS Q2 FY2026 earnings. T23 locks ~May 25. Stop must be raised before then.", "priority": "HIGH"},
      {"date": "Thu May 28", "event": "MRVL Q1 earnings (monitoring -- position closed T37).", "priority": "LOW"},
      {"date": "Wed Jul 30", "event": "RR.L H1 results. Review stop 1149.4p pre-H1.", "priority": "HIGH"}
    ]
  },
  "positions": [
    {"ticker": "CRML", "shares": 110, "avgPrice": 9.08, "last": 13.10, "unrealPnL": 443, "unrealPct": 44.3, "stop": 11.20, "status": "HOLD -- STOP $11.20 (deliberate buffer) -- WTI THESIS", "note": "Deliberate P14. Critical metals thesis intact."},
    {"ticker": "AMZN", "shares": 30, "avgPrice": 201.204, "last": 272.69, "unrealPnL": 2145, "unrealPct": 35.5, "stop": 259.88, "status": "HOLD -- STOP $259.88 -- SIMPLE STOP", "note": "AWS thesis intact."},
    {"ticker": "ABVX", "shares": 50, "avgPrice": 109.89, "last": 127.00, "unrealPnL": 856, "unrealPct": 15.6, "stop": 109.93, "status": "HOLD -- STOP $109.93 -- M&A STRATEGIC EXCEPTION", "note": "Royalty buyback signal. Maximum room strategy."},
    {"ticker": "RR", "name": "Rolls-Royce Holdings", "shares": 100, "avgPrice": 1128.6, "last": 1259.00, "unrealPnL": 130, "unrealPct": 11.6, "stop": 1149.4, "cur": "GBP", "status": "HOLD -- STOP 1149.4p -- RAISED S37 -- H1 JUL 30 -- EU ENERGY 1/4", "note": "Q1 beat +6.47%. Stop raised S37. P20 min 1204p -- deliberate H1 Jul 30 room."},
    {"ticker": "UUUU", "name": "Energy Fuels Inc", "shares": 50, "avgPrice": 22.011, "last": 23.94, "unrealPnL": 97, "unrealPct": 8.8, "stop": 16.50, "status": "HOLD -- STOP $16.50 -- Q1 PRINT TONIGHT -- ASM JULY", "note": "Q1 earnings out tonight. ASM July 2026. SI-37 remaining ~$400. Scale: $21-22 pullback only."},
    {"ticker": "CODA", "shares": 250, "avgPrice": 11.105, "last": 12.00, "unrealPnL": 224, "unrealPct": 8.1, "stop": 10.90, "status": "HOLD -- STOP $10.90 -- BELOW P20 -- DELIBERATE", "note": "P14 deliberate. Project Freedom mine clearance."},
    {"ticker": "CCJ", "shares": 50, "avgPrice": 117.02, "last": 119.35, "unrealPnL": 120, "unrealPct": 2.1, "stop": 114.21, "status": "HOLD -- STOP $114.21 -- RAISE WHEN >$127", "note": "P20 min $119.79. Raise when sustains >$127."},
    {"ticker": "MSFT", "shares": 25, "avgPrice": 403.052, "last": 421.81, "unrealPnL": 466, "unrealPct": 4.7, "stop": 373, "status": "HOLD -- STOP $373 -- ⚠️ STALE -- RAISE TO $412 S38", "note": "Stop stale. P20 min $412.43. Raise to $412 in S38. Simple stop only."},
    {"ticker": "SNPS", "shares": 8, "avgPrice": 495.125, "last": 510.00, "unrealPnL": 119, "unrealPct": 3.0, "stop": 440, "status": "🔴 SNPS STOP $440 BELOW COST $495.125 -- RAISE URGENTLY S38", "note": "CRITICAL: Stop $440 is BELOW cost basis $495.125 while stock at $510. Must raise to minimum $495 (breakeven), target P20 ~$502. T23 locks ~May 25 (48-72h before May 27 AMC earnings). Act before T23 lock."},
    {"ticker": "MSTR", "shares": 15, "avgPrice": 181.067, "last": 179.80, "unrealPnL": -19, "unrealPct": -0.7, "stop": 153.14, "status": "HOLD -- STOP $153.14 -- BTC GATE $85K", "note": "BTC ~$80K. Scale gate $85K not triggered. Kill: BTC <$70K weekly."},
    {"ticker": "BAH", "name": "Booz Allen Hamilton", "shares": 33, "avgPrice": 76.531, "last": 76.67, "unrealPnL": 4, "unrealPct": 0.2, "stop": 69, "status": "HOLD -- STOP $69 -- MAY 22 Q4 GATE", "note": "Half-size. Civil revenue risk unresolved."},
    {"ticker": "CGCT", "shares": 291, "avgPrice": 10.295, "last": 10.39, "unrealPnL": 27, "unrealPct": 0.9, "stop": null, "status": "HOLD -- NO STOP -- SPAC", "note": "Trust floor ~$10.27."},
    {"ticker": "R3NK", "name": "Renk Group AG", "shares": 25, "avgPrice": 52.00, "last": 51.79, "unrealPnL": -8, "unrealPct": -0.4, "stop": 47.00, "cur": "EUR", "status": "HOLD -- STOP 47 EUR -- NEW T35 -- NATO REARMAMENT", "note": "T35: GTC €52 filled S37. Thesis intact. T30 applied (sold T34 @€53.44, rebought @€52.00 better cost). Max loss €125."},
    {"ticker": "IBM", "shares": 26, "avgPrice": 228.739, "last": 229.78, "unrealPnL": 27, "unrealPct": 0.5, "stop": 208, "status": "HOLD -- STOP $208", "note": "Contrarian post-Q1 entry."},
    {"ticker": "LMT", "name": "Lockheed Martin", "shares": 10, "avgPrice": 516.831, "last": 508.46, "unrealPnL": -84, "unrealPct": -1.6, "stop": 479.77, "status": "HOLD -- STOP $479.77 -- RAISED S37", "note": "Stop raised $465→$479.77 in S37. Max loss $368."},
    {"ticker": "LDO", "name": "Leonardo SpA", "shares": 35, "avgPrice": 56.086, "last": 54.87, "unrealPnL": -43, "unrealPct": -2.2, "stop": 50, "cur": "EUR", "status": "HOLD -- STOP 50 EUR", "note": "Rearmament thesis."},
    {"ticker": "IES", "name": "Invinity Energy Systems", "shares": 3000, "avgPrice": 17.49, "last": 17.00, "unrealPnL": -15, "unrealPct": -2.8, "stopType": "MANUAL ALERT 12.5p", "cur": "GBP", "status": "HOLD -- MANUAL ALERT 12.5p", "note": "LDES decision pending."},
    {"ticker": "AVAV", "shares": 15, "avgPrice": 185.067, "last": 167.66, "unrealPnL": -262, "unrealPct": -9.4, "stop": 155, "status": "HOLD -- STOP $155 -- JUNE 30 Q4 GATE", "note": "LASSO Switchblade 400 deal (May 4). Backlog +51% YoY. June 30 Q4 gate."}
  ],
  "pendingGTCs": [
    {"ticker": "LAC", "name": "Lithium Americas", "action": "BUY", "limit": 4.80, "stop": 4.00, "qty": 220, "maxLoss": 176, "status": "GTC $4.80 / STOP $4.00 -- SI-37 SPECULATIVE", "note": "Thacker Pass Phase 1."},
    {"ticker": "TXT", "name": "Textron Inc", "action": "BUY", "limit": 88.00, "stop": 79.00, "qty": 55, "maxLoss": 495, "status": "GTC $88 PENDING -- ~7% PULLBACK NEEDED", "note": "Bell MV-75 Valor = 20yr military monopoly."}
  ],
  "watchList": [
    {"ticker": "NCH2", "name": "Thyssenkrupp Nucera (Frankfurt)", "thesis": "World's largest industrial alkaline electrolyser. EV ~EUR370M vs EUR648M net cash. Stage 2 analysis complete. Gate: Q2 FY25/26 order intake >EUR150M. Middle East CA contract (Dec 2025) expected in Q2. Spain 300MW in H2. Order intake guidance EUR350-900M for FY.", "entry": "Enter at market ~EUR8.265 if gate confirmed. Stop EUR6.50. 230sh. Max loss EUR406. EU energy slot 2/4.", "stop": "EUR 6.50", "gate": "Q2 FY25/26 results due MAY 12. Read H1 half-year report -- confirm order intake >EUR150M AND no new guidance cut since March 18. Do NOT enter before May 12.", "status": "STAGE 2 DONE -- DO NOT ENTER BEFORE MAY 12 -- GATE UNCONFIRMED"},
    {"ticker": "V", "name": "Visa Inc", "thesis": "Stopped @$321.823 T32 (+$117.58). Q2 FY26 revenue +15%, EPS beat. Thesis intact.", "entry": "$305-315 zone only.", "stop": "$292-295", "gate": "Q3 earnings Jul 28.", "status": "WATCH -- STOPPED T32 -- RE-ENTRY $305-315"},
    {"ticker": "NOG", "name": "Northern Oil and Gas", "thesis": "WTI beta play. Sold T33 @$25.11 on Iran deal noise. Re-entry ONLY after confirmed deal collapse + WTI >$105 sustained.", "entry": "Monitor only. No entry during uncertainty.", "gate": "SI-25 Condition 1 confirmed failure.", "status": "WATCH -- SOLD T33 -- MONITOR ONLY"},
    {"ticker": "CEG", "name": "Constellation Energy", "thesis": "Closed T38 @$314.77 (+$93.77). Q1 earnings May 11. Calpine integration. Data center pipeline. Long-term nuclear thesis strong.", "entry": "Re-entry if >5% pullback post-Q1 creates opportunity.", "gate": "Q1 earnings May 11 AMC. PJM data center deal announcement.", "status": "WATCH -- CLOSED T38 -- MONITOR"},
    {"ticker": "MRVL", "name": "Marvell Technology", "thesis": "Closed T37 @$160.02 (+$79.20). POET/Celestial AI controversy caused underperformance. Core AI chip thesis intact (Q3 FY26 +37% YoY). Q1 earnings May 28.", "entry": "Monitor. Re-entry if SI-39 flags on next drawdown.", "gate": "Q1 earnings May 28.", "status": "WATCH -- CLOSED T37 -- MONITOR"},
    {"ticker": "PCELL", "name": "PowerCell Sweden (OMXSTO)", "thesis": "PEM hydrogen fuel cells. Bosch partner. Stage 1 done S37.", "entry": "SEK 28-32. Stop SEK 22.", "gate": "EBITDA confirmation.", "status": "STAGE 1 DONE S37 -- MONITOR"},
    {"ticker": "INTL", "name": "Intel Corp", "thesis": "Turnaround: 18A HVM, NVIDIA $5B stake, US Gov 9.9% shareholder.", "entry": "$75-82 pullback", "gate": "Apple confirmation OR pullback", "status": "WATCH -- NOT AT ENTRY"}
  ],
  "shortWatchlist": [
    {"ticker": "PLTR", "thesis": "Dormant until Q2 July.", "status": "DORMANT UNTIL Q2 JULY 2026", "trigger": "Q2 guidance cut only"},
    {"ticker": "AAL", "thesis": "No fuel hedge, $36.5B debt.", "trigger": "Dead-cat bounce $13-14. WTI >$100 condition met.", "status": "WATCH"},
    {"ticker": "CCL", "thesis": "Fuel 12-15% of costs.", "trigger": "Rally to $23-25", "status": "WATCH"},
    {"ticker": "SNOW", "thesis": "18x fwd revenue.", "trigger": "Earnings miss + guidance trim", "status": "WATCH"}
  ],
  "euEnergyTransition": {
    "title": "EU/UK ENERGY TRANSITION -- SECTION N (SI-67)",
    "concentrationCeiling": "Maximum 4 positions. CURRENT: RR.L (1/4). Room for 3 more (CEG closed).",
    "stage1Queue": ["NCH2 Stage 2 done -- gate May 12", "PCELL.ST done S37 -- monitor"],
    "watchOnly": ["CWR.L at 500p", "ITM.L at 135-140p"],
    "gateNote": "NCH2: DO NOT ENTER before May 12. Q2 FY25/26 results not yet published.",
    "scanFrequency": "First session each month + thesis-triggered"
  },
  "criticalMineralsThesis": {
    "title": "CRITICAL MINERALS -- NATIONAL SECURITY THEME",
    "concentrationCeiling": "CRML (held) + LAC (GTC) + UUUU (held) = MAXIMUM.",
    "candidates": [
      {"ticker": "CRML", "status": "HELD +44.3%", "thesis": "Dual critical minerals + European Lithium acquisition", "stop": "$11.20"},
      {"ticker": "UUUU", "status": "HELD @$22.011 -- Q1 PRINT TONIGHT", "thesis": "Only US licensed REE separator. ASM July 2026. SI-37 remaining ~$400.", "classification": "SI-37"},
      {"ticker": "LAC", "status": "GTC $4.80 PENDING", "thesis": "Thacker Pass. DoE backed.", "classification": "SI-37 Speculative"}
    ]
  },
  "tradeTracker": {
    "closedTrades": [
      {"id":1,"ticker":"CCL","dateIn":"2026-03-24","dateOut":"2026-03-26","qty":240,"entry":24.83,"exit":25.35,"ccy":"USD","pnlUSD":122.35,"note":"S07."},
      {"id":2,"ticker":"ONDS","dateIn":"2026-03-24","dateOut":"2026-03-30","qty":250,"entry":10.90,"exit":8.505,"ccy":"USD","pnlUSD":-601.30,"note":"Stopped."},
      {"id":3,"ticker":"KTOS","dateIn":"2026-03-24","dateOut":"2026-03-30","qty":100,"entry":81.00,"exit":64.977,"ccy":"USD","pnlUSD":-1604.27,"note":"P12."},
      {"id":4,"ticker":"UEC","dateIn":"2026-03-25","dateOut":"2026-03-31","qty":206,"entry":13.77,"exit":13.16,"ccy":"USD","pnlUSD":-127.76,"note":"Stopped."},
      {"id":5,"ticker":"IAG","dateIn":"2026-03-27","dateOut":"2026-04-01","qty":2200,"entry":3.55,"exit":3.70,"ccy":"GBP","pnlUSD":407.36,"note":"Peace thesis broken."},
      {"id":6,"ticker":"RCL","dateIn":"2026-03-24","dateOut":"2026-04-02","qty":36,"entry":273.54,"exit":269.91,"ccy":"USD","pnlUSD":-132.89,"note":"Stopped."},
      {"id":7,"ticker":"LEU","dateIn":"2026-03-24","dateOut":"2026-04-07","qty":13,"entry":188.79,"exit":170.26,"ccy":"USD","pnlUSD":-242.94,"note":"P11."},
      {"id":8,"ticker":"LDO","dateIn":"2026-03-27","dateOut":"2026-04-07","qty":17,"entry":58.10,"exit":59.56,"ccy":"EUR","pnlUSD":20.51,"note":"Partial."},
      {"id":9,"ticker":"UPS","dateIn":"2026-04-08","dateOut":"2026-04-08","qty":50,"entry":100.17,"exit":99.60,"ccy":"USD","pnlUSD":-30.61,"note":"Same-day."},
      {"id":10,"ticker":"R3NK","dateIn":"2026-03-26","dateOut":"2026-04-08","qty":80,"entry":51.51,"exit":56.01,"ccy":"EUR","pnlUSD":385.86,"note":"First entry."},
      {"id":11,"ticker":"PLTR","dateIn":"2026-03-24","dateOut":"2026-04-09","qty":49,"entry":161.608,"exit":134.976,"ccy":"USD","pnlUSD":-1307.11,"note":"P6."},
      {"id":12,"ticker":"SHLD","dateIn":"2026-03-24","dateOut":"2026-04-10","qty":69,"entry":72.01,"exit":73.21,"ccy":"USD","pnlUSD":112.65,"note":"Tactical."},
      {"id":13,"ticker":"PDYN","dateIn":"2026-03-25","dateOut":"2026-04-14","qty":250,"entry":6.59,"exit":6.67,"ccy":"USD","pnlUSD":17.42,"note":"Partial."},
      {"id":14,"ticker":"AVAV","dateIn":"2026-03-26","dateOut":"2026-04-15","qty":25,"entry":195.05,"exit":197.945,"ccy":"USD","pnlUSD":70.27,"note":"Re-entered S35 15sh."},
      {"id":15,"ticker":"ITM","dateIn":"2026-04-01","dateOut":"2026-04-17","qty":1100,"entry":65.1,"exit":124.60,"ccy":"GBP","pnlUSD":828.00,"note":"Trim 1."},
      {"id":16,"ticker":"LNG","dateIn":"2026-04-13","dateOut":"2026-04-17","qty":19,"entry":268.813,"exit":248.00,"ccy":"USD","pnlUSD":-396.54,"note":"Stopped."},
      {"id":17,"ticker":"PATK","dateIn":"2026-04-17","dateOut":"2026-04-17","qty":25,"entry":108.80,"exit":109.256,"ccy":"USD","pnlUSD":9.34,"note":"P17."},
      {"id":18,"ticker":"ABVX","dateIn":"2026-04-06","dateOut":"2026-04-21","qty":44,"entry":117.913,"exit":114.26,"ccy":"USD","pnlUSD":-158.53,"note":"Stopped. Re-entry 50sh."},
      {"id":19,"ticker":"RR","dateIn":"2026-03-26","dateOut":"2026-04-22","qty":150,"entry":1182.88,"exit":1150.00,"ccy":"GBP","pnlUSD":-62.39,"note":"Stopped. Re-entry 100sh."},
      {"id":20,"ticker":"ITM","dateIn":"2026-04-01","dateOut":"2026-04-24","qty":800,"entry":65.1,"exit":141.20,"ccy":"GBP","pnlUSD":770.00,"note":"Trim 2."},
      {"id":21,"ticker":"LLY","dateIn":"2026-04-16","dateOut":"2026-04-25","qty":3,"entry":905.344,"exit":875.54,"ccy":"USD","pnlUSD":-89.41,"note":"Stopped."},
      {"id":22,"ticker":"CODA","dateIn":"2026-04-08","dateOut":"2026-04-27","qty":416,"entry":12.005,"exit":11.42,"ccy":"USD","pnlUSD":-243.36,"note":"Stopped. P11 re-entry."},
      {"id":23,"ticker":"ISRG","dateIn":"2026-03-24","dateOut":"2026-04-27","qty":22,"entry":459.246,"exit":471.676,"ccy":"USD","pnlUSD":272.24,"note":"Stop triggered."},
      {"id":24,"ticker":"ITM","dateIn":"2026-04-01","dateOut":"2026-04-28","qty":1200,"entry":65.1,"exit":130.39,"ccy":"GBP","pnlUSD":1041.00,"note":"AIM wick. ITM total +$2,639."},
      {"id":25,"ticker":"ABBV","dateIn":"2026-04-22","dateOut":"2026-04-29","qty":20,"entry":205.22,"exit":191.1608,"ccy":"USD","pnlUSD":-282.27,"note":"Stop BMO."},
      {"id":26,"ticker":"PDYN","dateIn":"2026-03-25","dateOut":"2026-04-29","qty":250,"entry":6.595,"exit":5.815,"ccy":"USD","pnlUSD":-196.00,"note":"Manual exit."},
      {"id":27,"ticker":"CCJ","dateIn":"2026-03-24","dateOut":"2026-04-28","qty":49,"entry":104.021,"exit":119.97,"ccy":"USD","pnlUSD":782.00,"note":"T23 deliberate. Re-entry 50sh."},
      {"id":28,"ticker":"VST","dateIn":"2026-04-08","dateOut":"2026-04-29","qty":53,"entry":150.569,"exit":156.53,"ccy":"USD","pnlUSD":316.00,"note":"GTC stop triggered."},
      {"id":29,"ticker":"PDYN","dateIn":"2026-04-29","dateOut":"2026-04-30","qty":250,"entry":5.7507,"exit":5.85,"ccy":"USD","pnlUSD":-25,"note":"E9 short covered."},
      {"id":30,"ticker":"MSFT","dateIn":"2026-04-14","dateOut":"2026-04-30","qty":25,"entry":372.77,"exit":410.38,"ccy":"USD","pnlUSD":940,"note":"Stop triggered. Re-entered 25sh."},
      {"id":31,"ticker":"NOG","dateIn":"2026-03-26","dateOut":"2026-05-01","qty":80,"entry":24.383,"exit":26.50,"ccy":"USD","pnlUSD":169.36,"note":"Stop triggered."},
      {"id":32,"ticker":"V","dateIn":"2026-03-24","dateOut":"2026-05-05","qty":8,"entry":307.125,"exit":321.823,"ccy":"USD","pnlUSD":117.58,"note":"T28. Re-entry $305-315."},
      {"id":33,"ticker":"NOG","dateIn":"2026-05-04","dateOut":"2026-05-07","qty":200,"entry":26.771,"exit":25.11,"ccy":"USD","pnlUSD":-332.20,"note":"S37: Iran deal noise. WTI $93. T3/T17."},
      {"id":34,"ticker":"R3NK","dateIn":"2026-04-08","dateOut":"2026-05-07","qty":25,"entry":52.27,"exit":53.44,"ccy":"EUR","pnlUSD":31.59,"note":"S37: Iran deal noise. T30. Rebuy GTC placed."},
      {"id":35,"ticker":"R3NK","dateIn":"2026-05-07","dateOut":null,"qty":25,"entry":52.00,"exit":null,"ccy":"EUR","pnlUSD":null,"note":"T35: GTC EUR52 filled S37. Rebuy per T30. Cost improvement vs EUR52.27. Stop EUR47. OPEN."},
      {"id":36,"ticker":"AMPX","dateIn":"2026-05-05","dateOut":"2026-05-07","qty":168,"entry":18.106,"exit":17.94,"ccy":"USD","pnlUSD":-27.89,"note":"T36: Stop $18.92 gapped through on intraday selling. Pre-earnings pressure. Q1 print AMC May 7."},
      {"id":37,"ticker":"MRVL","dateIn":"2026-03-24","dateOut":"2026-05-07","qty":10,"entry":152.10,"exit":160.02,"ccy":"USD","pnlUSD":79.20,"note":"T37: Stop $159.95 triggered. POET/Celestial AI controversy serial underperformance. Core AI thesis intact."},
      {"id":38,"ticker":"CEG","dateIn":"2026-05-04","dateOut":"2026-05-07","qty":14,"entry":308.072,"exit":314.77,"ccy":"USD","pnlUSD":93.77,"note":"T38: Stop raised then triggered at $314.77. +$93.77. Q1 earnings May 11. Thesis intact."}
    ],
    "lastUpdated": "2026-05-07 S37 FINAL. T35-T38 complete. 37 closed + T35 R3NK open = 38 rows total."
  },
  "sessionNotes": [
    {"date": "2026-05-07", "note": "S37: LMT stop raised $465->$479.77. RR.L Q1 beat +6.47%, stop raised 1050p->1149.4p. NOG sold T33 @$25.11 (-$332.20) on Iran deal noise, WTI $93. R3NK sold T34 @EUR53.44 (+$31.59) on deal noise. Rebuy GTC EUR52 placed (T30). RR.L Q1 beat confirmed."},
    {"date": "2026-05-07", "note": "S37 CONTINUATION: T35 R3NK GTC EUR52 FILLED. T36 AMPX stopped @$17.94 (pre-earnings sell-off, stop $18.92 gapped). T37 MRVL stopped @$160.02 (POET controversy). T38 CEG stopped @$314.77 (+$93.77). NCH2 market order placed then CANCELLED (E25 -- cited Q2 FY24/25 press release as FY25/26). Journal corrupted with fictional S38/S39/S40 content (date error E24) -- now corrected. E9 RISK: Verify CEG stop $278 and AMPX Sell Limit $32 cancelled in IBKR."}
  ]
};

const COLORS = {
  bg:"#0d1117",card:"#161b22",border:"#30363d",accent:"#58a6ff",
  green:"#3fb950",red:"#f85149",yellow:"#d29922",blue:"#388bfd",
  text:"#c9d1d9",textDim:"#8b949e",textBright:"#f0f6fc",purple:"#a371f7",
  orange:"#f0883e"
};

export default function TradingJournal() {
  const [data,setData]=useState(()=>{try{const s=localStorage.getItem(STORAGE_KEY);return s?JSON.parse(s):INITIAL_STATE;}catch{return INITIAL_STATE;}});
  const [activeTab,setActiveTab]=useState("positions");
  const [newNote,setNewNote]=useState("");
  useEffect(()=>{try{localStorage.setItem(STORAGE_KEY,JSON.stringify(data));}catch{}},[data]);
  const update=useCallback((d)=>setData(d),[]);
  const addNote=()=>{if(!newNote.trim())return;update({...data,sessionNotes:[...(data.sessionNotes||[]),{date:new Date().toISOString().slice(0,10),note:newNote}]});setNewNote("");};
  const tabs=["positions","gtcs","watch","shorts","eu-energy","minerals","thesis","tracker","notes"];
  const pnlColor=(v)=>v>0?COLORS.green:v<0?COLORS.red:COLORS.textDim;

  return(
    <div style={{background:COLORS.bg,minHeight:"100vh",color:COLORS.text,fontFamily:"monospace",padding:16,maxWidth:1200,margin:"0 auto"}}>
      <style>{`.card{background:${COLORS.card};border:1px solid ${COLORS.border};border-radius:6px;padding:12px}.badge{font-size:10px;padding:2px 6px;border-radius:4px;font-weight:600;display:inline-block}.badge-green{background:rgba(63,185,80,0.15);color:${COLORS.green};border:1px solid rgba(63,185,80,0.3)}.badge-red{background:rgba(248,81,73,0.15);color:${COLORS.red};border:1px solid rgba(248,81,73,0.3)}.badge-amber{background:rgba(210,153,34,0.15);color:${COLORS.yellow};border:1px solid rgba(210,153,34,0.3)}.badge-orange{background:rgba(240,136,62,0.15);color:${COLORS.orange};border:1px solid rgba(240,136,62,0.3)}.badge-grey{background:rgba(139,148,158,0.15);color:${COLORS.textDim};border:1px solid rgba(139,148,158,0.3)}.badge-purple{background:rgba(163,113,247,0.15);color:${COLORS.purple};border:1px solid rgba(163,113,247,0.3)}.badge-blue{background:rgba(56,139,253,0.15);color:${COLORS.blue};border:1px solid rgba(56,139,253,0.3)}.btn{background:${COLORS.card};border:1px solid ${COLORS.border};color:${COLORS.text};padding:6px 12px;border-radius:4px;cursor:pointer;font-family:monospace;font-size:12px}.btn:hover{background:#21262d}.btn-primary{background:rgba(88,166,255,0.15);border-color:rgba(88,166,255,0.4);color:${COLORS.accent}}input{background:${COLORS.card};border:1px solid ${COLORS.border};color:${COLORS.text};padding:8px;border-radius:4px;font-family:monospace;font-size:12px;flex:1}`}</style>

      <div style={{marginBottom:16}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:8}}>
          <div>
            <div style={{fontSize:18,fontWeight:700,color:COLORS.textBright}}>CLAUDE FUND -- JOURNAL v52 S37</div>
            <div style={{fontSize:11,color:COLORS.textDim,marginTop:2}}>Session 37 -- Thu 7 May 2026 | {data.fund.account} | 18 positions | 2 GTCs</div>
          </div>
          <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
            {[{label:"NET LIQ",val:"$105.2K"},{label:"CASH USD",val:"$38,978",color:COLORS.green},{label:"SNPS STOP",val:"$440 ⚠️",color:COLORS.red},{label:"NCH2",val:"MAY 12",color:COLORS.yellow}].map(m=>(
              <div key={m.label} className="card" style={{textAlign:"center",minWidth:80}}>
                <div style={{fontSize:9,color:COLORS.textDim}}>{m.label}</div>
                <div style={{fontSize:14,fontWeight:700,color:m.color||COLORS.textBright,marginTop:2}}>{m.val}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{marginTop:6,padding:"6px 10px",background:"rgba(248,81,73,0.15)",border:"1px solid rgba(248,81,73,0.4)",borderRadius:4,fontSize:11,color:COLORS.red,fontWeight:700}}>
          🔴 S38 FIRST: CANCEL CEG STOP $278 (E9) | VERIFY AMPX SELL LIMIT $32 CANCELLED | RAISE SNPS STOP ABOVE $495 COST
        </div>
        <div style={{marginTop:4,padding:"6px 10px",background:"rgba(63,185,80,0.1)",border:"1px solid rgba(63,185,80,0.3)",borderRadius:4,fontSize:11,color:COLORS.green,fontWeight:600}}>
          ✅ T35 R3NK +0 | T36 AMPX -$28 | T37 MRVL +$79 | T38 CEG +$94 | NCH2 CANCELLED
        </div>
        <div style={{marginTop:4,padding:"6px 10px",background:"rgba(210,153,34,0.15)",border:"1px solid rgba(210,153,34,0.4)",borderRadius:4,fontSize:11,color:COLORS.yellow}}>
          NCH2: DO NOT ENTER BEFORE MAY 12 -- Q2 FY25/26 RESULTS DUE MAY 12 | SNPS STOP STALE ($440 BELOW COST $495) | MSFT STOP STALE ($373)
        </div>
      </div>

      <div style={{display:"flex",gap:4,marginBottom:12,flexWrap:"wrap"}}>
        {tabs.map(t=>(<button key={t} className={`btn ${activeTab===t?"btn-primary":""}`} onClick={()=>setActiveTab(t)} style={{textTransform:"uppercase",fontSize:11}}>{t}</button>))}
      </div>

      {activeTab==="positions"&&(
        <div style={{display:"flex",flexDirection:"column",gap:6}}>
          {data.positions?.map((p)=>(
            <div key={p.ticker} className="card" style={{borderLeft:p.status?.includes("🔴")||p.status?.includes("BELOW COST")?"3px solid "+COLORS.red:p.status?.includes("STALE")?"3px solid "+COLORS.orange:p.unrealPnL>300?"3px solid "+COLORS.green:p.unrealPnL<-100?"3px solid "+COLORS.red:undefined}}>
              <div style={{display:"flex",gap:10,alignItems:"center",flexWrap:"wrap",marginBottom:3}}>
                <span style={{fontWeight:700,fontSize:13,color:COLORS.textBright}}>{p.ticker}</span>
                {p.cur&&<span className="badge badge-grey">{p.cur}</span>}
                {p.status?.includes("NEW T35")&&<span className="badge badge-blue">NEW T35</span>}
                {(p.status?.includes("🔴")||p.status?.includes("BELOW COST"))&&<span className="badge badge-red">STOP URGENT</span>}
                {p.status?.includes("STALE")&&<span className="badge badge-orange">STOP STALE</span>}
                {p.unrealPnL!==undefined&&<span className={`badge ${p.unrealPnL>50?"badge-green":p.unrealPnL<-50?"badge-red":"badge-amber"}`}>{p.unrealPnL>=0?"+":""}{p.unrealPct?.toFixed(1)}%</span>}
                <span style={{fontSize:9,color:COLORS.textDim,marginLeft:"auto"}}>Stop: <b style={{color:p.status?.includes("🔴")||p.status?.includes("BELOW COST")?COLORS.red:COLORS.yellow}}>{p.stop||p.stopType||"--"}</b></span>
              </div>
              <div style={{fontSize:10,color:COLORS.accent,marginBottom:2}}>{p.status}</div>
              <div style={{fontSize:9,color:COLORS.textDim}}>{p.note}</div>
            </div>
          ))}
        </div>
      )}

      {activeTab==="gtcs"&&(
        <div style={{display:"flex",flexDirection:"column",gap:6}}>
          {data.pendingGTCs?.map((g)=>(
            <div key={g.ticker} className="card" style={{borderLeft:"3px solid "+COLORS.blue}}>
              <div style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap",marginBottom:3}}>
                <span style={{fontWeight:700,fontSize:13,color:COLORS.textBright}}>{g.ticker}</span>
                <span className="badge badge-blue">BUY GTC</span>
                <span style={{fontSize:11,color:COLORS.accent}}>Limit: {g.limit} / Stop: {g.stop}</span>
                <span className={`badge ${g.maxLoss<=200?"badge-green":g.maxLoss<=400?"badge-amber":"badge-red"}`}>Max loss ${g.maxLoss}</span>
              </div>
              <div style={{fontSize:9,color:COLORS.textDim}}>{g.note}</div>
            </div>
          ))}
        </div>
      )}

      {activeTab==="watch"&&(
        <div style={{display:"flex",flexDirection:"column",gap:6}}>
          {data.watchList?.map((w,i)=>(
            <div key={i} className="card" style={{borderLeft:"3px solid "+(w.status?.includes("DO NOT")?"3px solid "+COLORS.yellow:w.status?.includes("CLOSED")?COLORS.textDim:COLORS.blue).replace("3px solid ","")}}> 
              <div style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap",marginBottom:3}}>
                <span style={{fontWeight:700,fontSize:13,color:COLORS.textBright}}>{w.ticker}</span>
                {w.status?.includes("DO NOT")&&<span className="badge badge-amber">MAY 12</span>}
                {w.status?.includes("CLOSED")&&<span className="badge badge-grey">CLOSED</span>}
              </div>
              <div style={{fontSize:10,color:COLORS.yellow,marginBottom:2}}>{w.status}</div>
              <div style={{fontSize:10,fontStyle:"italic",color:COLORS.textBright,marginBottom:2}}>{w.thesis?.substring(0,120)}{w.thesis?.length>120?"...":""}</div>
              {w.gate&&<div style={{fontSize:9,color:COLORS.textDim}}>Gate: {w.gate?.substring(0,120)}</div>}
            </div>
          ))}
        </div>
      )}

      {activeTab==="shorts"&&(
        <div>{data.shortWatchlist?.map((s,i)=>(<div key={i} className="card" style={{marginBottom:6,borderLeft:"3px solid "+(s.status?.includes("DORMANT")?COLORS.textDim:COLORS.purple)}}><div style={{display:"flex",gap:8,alignItems:"center",marginBottom:3}}><span style={{fontWeight:700,color:COLORS.textBright}}>{s.ticker}</span>{s.status?.includes("DORMANT")?<span className="badge badge-grey">DORMANT</span>:<span className="badge badge-purple">WATCH</span>}</div><div style={{fontSize:10,color:COLORS.textDim,marginBottom:2}}>{s.thesis}</div><div style={{fontSize:9,color:COLORS.yellow}}>Trigger: {s.trigger}</div></div>))}</div>
      )}

      {activeTab==="eu-energy"&&(
        <div>
          <div className="card" style={{marginBottom:8,borderLeft:"4px solid "+COLORS.yellow}}>
            <div style={{fontWeight:700,color:COLORS.yellow,fontSize:13,marginBottom:4}}>{data.euEnergyTransition?.title}</div>
            <div style={{fontSize:10,color:COLORS.green,marginBottom:4,fontWeight:600}}>{data.euEnergyTransition?.concentrationCeiling}</div>
            <div style={{padding:"8px",background:"rgba(248,81,73,0.1)",borderRadius:4,fontSize:11,color:COLORS.red,fontWeight:700}}>
              {data.euEnergyTransition?.gateNote}
            </div>
          </div>
        </div>
      )}

      {activeTab==="minerals"&&(
        <div>
          <div className="card" style={{marginBottom:8,borderLeft:"4px solid "+COLORS.green}}>
            <div style={{fontWeight:700,color:COLORS.green,fontSize:13,marginBottom:4}}>{data.criticalMineralsThesis?.title}</div>
            <div style={{padding:"6px 10px",background:"rgba(248,81,73,0.1)",borderRadius:4,fontSize:11,color:COLORS.red,fontWeight:600}}>CEILING: {data.criticalMineralsThesis?.concentrationCeiling}</div>
          </div>
          {data.criticalMineralsThesis?.candidates?.map((c,i)=>(<div key={i} className="card" style={{marginBottom:6,borderLeft:"3px solid "+(c.status?.includes("HELD")?"#3fb950":"#388bfd")}}><div style={{display:"flex",gap:8,alignItems:"center",marginBottom:3}}><span style={{fontWeight:700,color:COLORS.textBright}}>{c.ticker}</span><span className={`badge ${c.status?.includes("HELD")?"badge-green":"badge-blue"}`}>{c.status}</span></div><div style={{fontSize:10,color:COLORS.textDim}}>{c.thesis}</div>{c.stop&&<div style={{fontSize:9,color:COLORS.yellow,marginTop:2}}>Stop: {c.stop}</div>}</div>))}
        </div>
      )}

      {activeTab==="thesis"&&(
        <div>
          <div className="card" style={{marginBottom:8,borderLeft:"4px solid "+COLORS.orange}}>
            <div style={{fontWeight:700,color:COLORS.orange,fontSize:13,marginBottom:4}}>{data.thesis.title}</div>
            <div style={{fontSize:11,lineHeight:1.8,marginBottom:6}}>{data.thesis.summary}</div>
            <div style={{padding:"6px 10px",background:"rgba(210,153,34,0.1)",borderRadius:4,fontSize:11,color:COLORS.yellow}}>{data.thesis.SI25Status}</div>
          </div>
          {data.thesis.keyDates?.map((d,i)=>(<div key={i} className="card" style={{marginBottom:4,borderLeft:"3px solid "+(d.priority==="CRITICAL"?COLORS.red:d.priority==="HIGH"?COLORS.yellow:COLORS.textDim)}}><div style={{display:"flex",gap:8,alignItems:"flex-start"}}><span style={{fontSize:10,fontWeight:600,minWidth:180,color:COLORS.textBright}}>{d.date}</span><span style={{fontSize:10,color:COLORS.textDim,flex:1}}>{d.event}</span><span className={`badge ${d.priority==="CRITICAL"?"badge-red":d.priority==="HIGH"?"badge-amber":"badge-grey"}`}>{d.priority}</span></div></div>))}
        </div>
      )}

      {activeTab==="tracker"&&(
        <div>
          <div style={{fontSize:12,fontWeight:600,color:COLORS.accent,marginBottom:6}}>TRADE TRACKER -- 37 CLOSED + 1 OPEN (T35 R3NK) | 38 rows</div>
          {data.tradeTracker?.closedTrades?.slice().reverse().map((t)=>(<div key={t.id} className="card" style={{marginBottom:3,borderLeft:"3px solid "+(t.pnlUSD===null?COLORS.blue:t.pnlUSD>0?COLORS.green:COLORS.red)}}><div style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap"}}><span style={{fontSize:9,color:COLORS.textDim}}>#{t.id}</span><span style={{fontWeight:600,fontSize:12}}>{t.ticker}</span><span style={{fontSize:9,color:COLORS.textDim}}>{t.dateOut||"OPEN"}</span>{t.pnlUSD!==null?<span style={{fontWeight:700,color:pnlColor(t.pnlUSD)}}>{t.pnlUSD>0?"+$":"-$"}{Math.abs(t.pnlUSD).toFixed(0)}</span>:<span className="badge badge-blue">OPEN</span>}<span className="badge badge-grey">{t.ccy}</span></div><div style={{fontSize:9,color:COLORS.textDim,marginTop:1}}>{t.note}</div></div>))}
        </div>
      )}

      {activeTab==="notes"&&(
        <div>
          <div style={{display:"flex",gap:8,marginBottom:10}}>
            <input value={newNote} onChange={e=>setNewNote(e.target.value)} placeholder="Add note..." onKeyDown={e=>e.key==="Enter"&&addNote()}/>
            <button className="btn btn-primary" onClick={addNote}>ADD</button>
          </div>
          {(data.sessionNotes||[]).slice().reverse().map((n,i)=>(<div key={i} className="card" style={{marginBottom:6}}><div style={{fontSize:10,color:COLORS.textDim,marginBottom:3}}>{n.date}</div><div style={{fontSize:11,lineHeight:1.7}}>{n.note}</div></div>))}
        </div>
      )}

      <div style={{marginTop:16,paddingTop:10,borderTop:"1px solid "+COLORS.border,display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:6,alignItems:"center"}}>
        <span style={{fontSize:10,color:COLORS.textDim}}>v52 S37 CORRECTED | Thu 7 May 2026 | 18 pos | Iran thesis INTACT</span>
        <div style={{display:"flex",gap:4,flexWrap:"wrap"}}>
          <span className="badge badge-red">CANCEL CEG $278 STOP ⚠️</span>
          <span className="badge badge-red">SNPS STOP BELOW COST ⚠️</span>
          <span className="badge badge-amber">NCH2 WAIT MAY 12</span>
          <span className="badge badge-green">T36-T38 ✅</span>
        </div>
      </div>
    </div>
  );
}
