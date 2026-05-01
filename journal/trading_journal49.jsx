import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "fund_journal_v3";

// ═══════════════════════════════════════════════════════════════════
// TIMEZONE REFERENCE — MANDATORY (E1 CORRECTED S30, RECURRENCE S32)
// NYSE: opens 17:30 UAE / closes 00:00 UAE (EDT = UTC-4; UAE = UTC+4)
// LSE:  opens 11:00 UAE (BST Apr-Oct) / 12:00 UAE (GMT Nov-Mar) / closes 19:30 UAE
// US AMC earnings: reported AFTER 00:00 UAE — NYSE is CLOSED at print.
// Stop is inactive until 17:30 UAE next session. Gap risk is live overnight.
// NEVER calculate market hours or earnings timing from memory.
// ALWAYS read this block before stating any open/close time.
//
// LIVE PRICE RULE (E20 — S33): During NYSE/LSE hours IBKR TWS is the ONLY
// authoritative live price source. Web search and MMD /prev return stale/
// previous-session data during live trading. NEVER contradict IBKR live
// prices using web search. Accept IBKR as ground truth. No exceptions.
//
// EXCHANGE HOLIDAY RULE (I12 — S34): Check exchange-specific holidays before
// every session. LSE closed Mon May 4 (UK Bank Holiday). Frankfurt/Milan
// closed May 1 (Labour Day). R3NK/LDO stops inactive on closed days.
//
// COMMODITY PRICE RULE (E21 — S34): Never use memory for commodity spot
// prices in thesis analysis. Fastmarkets/Trading Economics/SMM/EIA only.
// State the source and date explicitly in any commercial viability assessment.
// ═══════════════════════════════════════════════════════════════════

const INITIAL_STATE = {
  "lastUpdated": "2026-05-01 SESSION 34 CLOSE — 18 positions. NOG stopped +$169 (Trade #31). V stop $321.83, AMZN stop $251.38. LAC GTC $4.80/$4.00 submitted. UUUU watch post May 6. Critical minerals ceiling set. Geopolitical: Situation Room Monday. WTI ~$106.",
  "sessionNumber": "S34-CLOSE",
  "fund": {
    "account": "U24936508",
    "netLiquidity": 105600,
    "unrealizedPnL": 4588,
    "realizedPnL": 168.34,
    "realizedPnLNote": "Trade #31 NOG +$169.36. Full 30-day realized per IBKR trades tab: +$936.",
    "cashUSD": 39398,
    "cashGBP": 637,
    "cashEUR": -2904,
    "broker": "IBKR Pro",
    "note": "JOURNAL v49. Fri 1 May 2026. 18 active positions. 3 pending GTCs (TXT/LDOS/LAC). Options Level 3 confirmed. E20/E21 codified."
  },
  "thesis": {
    "title": "DUAL BLOCKADE — WTI ~$106 — SI-25 DUAL CONDITION UNMET — THESIS INTACT",
    "summary": "Hormuz dual blockade continues. WTI trading $103-111 intraday, closing ~$106. Trump rejected Iran Hormuz proposal (Hormuz-for-blockade-lifting without nuclear concessions). Trump: 'The blockade is more effective than the bombing.' Iran: 'practical and unprecedented action' threatened. CENTCOM briefing received Friday. Situation Room meeting Monday May 4. SI-25 dual condition: (1) PERMANENT Hormuz reopening + (2) WTI -10% from $117.63 peak = $105.87. Condition (2) technically breached intraday at ~$103-104 but unstable and reopening condition (1) unmet. Thesis intact. EIA Q2 peak forecast ~$115. Goldman Sachs Brent avg >$100. Key: Trump-Xi Beijing May 14-15 = potential diplomatic channel.",
    "oilWTI": 106.00,
    "SI25Trigger": 105.87,
    "SI25PeakRef": 117.63,
    "SI25Status": "⚠️ WTI ~$106 NEAR CORRECTED $105.87 THRESHOLD — REOPENING CONDITION (1) UNMET. Dual condition requires BOTH simultaneously. Thesis intact. Do not exit. Monitor Monday Situation Room outcome.",
    "hormuzStatus": "DUAL BLOCKADE. Trump rejected Iran proposal. CENTCOM military options briefed. Situation Room Monday May 4.",
    "keyDates": [
      {"date": "Mon May 4", "event": "Trump Situation Room — Iran military options review. LSE CLOSED (UK Bank Holiday). PLTR Q1 AMC.", "priority": "CRITICAL"},
      {"date": "Mon May 5 BMO", "event": "CCJ Q1 — T23: DO NOT WIDEN stop pre-earnings. LDO.MI Q1 — Milan open, stop €50. LDOS Q1 — confirms/breaks GTC thesis.", "priority": "HIGH"},
      {"date": "Wed May 6", "event": "UUUU Q1 — ENTRY DECISION GATE. Confirm ASM closing timeline + REE revenue. Entry $18.50-20 / Stop $16.50 if positive.", "priority": "HIGH"},
      {"date": "Thu May 7 AMC", "event": "AMPX Q1 — stop $18.92. Limit $32 active.", "priority": "HIGH"},
      {"date": "Thu May 7", "event": "SARO Q1 — WATCH, NO POSITION. Entry only if EBITDA margins hold + LEAP/CFM56 ramp confirmed.", "priority": "MEDIUM"},
      {"date": "Sun May 11", "event": "CEG Q1 — stop $278, 11.6% clearance.", "priority": "HIGH"},
      {"date": "Thu May 15", "event": "Warsh replaces Powell. Hawkish transition — watch rate-sensitive positions.", "priority": "MEDIUM"},
      {"date": "Wed May 20", "event": "SNPS Q2 — EDA duopoly. Stop $440, 10.3% clearance.", "priority": "HIGH"},
      {"date": "Thu May 22", "event": "BAH Q4 FY2026 — second tranche catalyst gate. Civil revenue bottoming + bookings improvement needed.", "priority": "HIGH"},
      {"date": "Thu May 28", "event": "MRVL Q1 — Google ASIC. Stop $135, 17.6% clearance.", "priority": "HIGH"},
      {"date": "May 14-15", "event": "Trump-Xi Beijing — potential Iran diplomatic channel. China asked to 'help a lot more'.", "priority": "MEDIUM"},
      {"date": "ONGOING", "event": "SI-61 SHORT WATCHLIST: PLTR (May 4 AMC — 108x fwd PE), AAL (bounce $13-14 needed, WTI >$100 required).", "priority": "MEDIUM"}
    ]
  },
  "positions": [
    {"ticker": "AMZN", "shares": 30, "avgPrice": 201.204, "last": 269.30, "unrealPnL": 2043, "unrealPct": 33.9, "stop": 251.38, "stopType": "Stop Limit", "stopLimit": 224, "status": "HOLD — STOP $251.38 / $224 SL — STOP RAISED S34", "note": "Q1 beat: AWS $37.6B +28%. Stop raised S34 from $249.88, below recent swings."},
    {"ticker": "MSFT", "shares": 25, "avgPrice": 403.052, "last": 415.89, "unrealPnL": 320, "unrealPct": 3.2, "stop": 373, "status": "HOLD — RE-ENTRY S33 — STOP $373 — SI-35 EXCEPTION", "note": "Trade #30 +$940 then re-entered S33 @$403.01. Stop $373 = original cost basis floor. $750 risk exception documented. Azure +40%, $190B capex thesis intact."},
    {"ticker": "AMPX", "shares": 168, "avgPrice": 18.106, "last": 21.50, "unrealPnL": 569, "unrealPct": 18.7, "stop": 18.92, "status": "HOLD — STOP $18.92 — EARNINGS THU MAY 7 AMC", "note": "Standalone limit $32 active. Earnings May 7."},
    {"ticker": "CRML", "shares": 110, "avgPrice": 9.08, "last": 12.58, "unrealPnL": 386, "unrealPct": 38.6, "stop": 10.51, "status": "HOLD — STOP $10.51 — CRITICAL MINERALS", "note": "$835M European Lithium acquisition. Dual critical minerals. Concentration ceiling: CRML + LAC(GTC) + UUUU(watch) = max."},
    {"ticker": "ABVX", "shares": 50, "avgPrice": 109.89, "last": 118.10, "unrealPnL": 411, "unrealPct": 7.5, "stop": 100, "status": "HOLD — STOP $100 — CONSIDER RAISE $106 — REVIEW MAY 12-19", "note": "M&A play. Re-entry 50sh @$109.87. Stop $100. At $118.10, consider raising to $106 (P20 rule: protect 50% of gain)."},
    {"ticker": "CCJ", "shares": 50, "avgPrice": 117.02, "last": 120.08, "unrealPnL": 153, "unrealPct": 2.6, "stop": 110, "status": "HOLD — STOP $110 — T23: DO NOT WIDEN — EARNINGS MON MAY 5 BMO", "note": "T23: No stop changes 48-72h before earnings. Accept binary."},
    {"ticker": "V", "shares": 8, "avgPrice": 307.125, "last": 330.65, "unrealPnL": 187, "unrealPct": 7.6, "stop": 321.83, "status": "HOLD — STOP $321.83 — RAISED S34", "note": "Stop raised S34: was $312.82 (protecting only 21% of gain). Now $321.83 protecting 56%. P20 lesson applied."},
    {"ticker": "MRVL", "shares": 10, "avgPrice": 152.10, "last": 165.68, "unrealPnL": 136, "unrealPct": 8.9, "stop": 135, "status": "HOLD — STOP $135 — EARNINGS MAY 28", "note": "Google ASIC thesis intact. 17.6% stop clearance."},
    {"ticker": "IBM", "shares": 26, "avgPrice": 228.739, "last": 233.60, "unrealPnL": 126, "unrealPct": 2.1, "stop": 208, "status": "HOLD — POST-EARNINGS ENTRY S33 — STOP $208", "note": "Entered S33 18:55 UAE @$228.70. Post-Q1 contrarian entry. Stop $208 = 10.5% clearance."},
    {"ticker": "CEG", "shares": 14, "avgPrice": 308.072, "last": 313.30, "unrealPnL": 71, "unrealPct": 1.6, "stop": 278, "status": "HOLD — STOP $278 — EARNINGS SUN MAY 11", "note": "11.6% clearance. Nuclear power thesis."},
    {"ticker": "RR", "name": "Rolls-Royce Holdings", "shares": 100, "avgPrice": 1128.6, "last": 1199.20, "unrealPnL": 71, "unrealPct": 6.3, "stop": 1050, "cur": "GBP", "status": "HOLD — STOP 1050p — LSE CLOSED MON MAY 4", "note": "LSE CLOSED Monday May 4 (UK Bank Holiday). Stop INACTIVE Monday. H1 results Jul 30 catalyst. +1.46% today."},
    {"ticker": "CODA", "shares": 250, "avgPrice": 11.105, "last": 11.48, "unrealPnL": 99, "unrealPct": 3.6, "stop": 10.00, "status": "HOLD — P11 RE-ENTRY S33 — STOP $10.00", "note": "P11 re-entry @$11.10. Mine clearance thesis. WTI $106 = blockade active. 12.9% clearance."},
    {"ticker": "R3NK", "shares": 25, "avgPrice": 52.27, "last": 53.75, "unrealPnL": 37, "unrealPct": 2.8, "stop": 48, "stopType": "Stop Limit", "stopLimit": 47, "cur": "EUR", "status": "HOLD — STOP 48/47 SL — FRANKFURT CLOSED MAY 1 — EARNINGS MAY 6", "note": "Frankfurt closed May 1. Stop re-active Monday May 4. Earnings May 6. 200M EUR deferred orders."},
    {"ticker": "BAH", "name": "Booz Allen Hamilton", "shares": 33, "avgPrice": 76.531, "last": 78.24, "unrealPnL": 55, "unrealPct": 2.2, "stop": 69, "status": "HOLD — FILLED S33 18:28 UAE — STOP $69", "note": "GTC filled Apr 30 @$76.50. Half-size entry: civil revenue risk unresolved. May 22 Q4 = second tranche gate. P/E 12.7x vs 44x sector."},
    {"ticker": "CGCT", "shares": 291, "avgPrice": 10.295, "last": 10.39, "unrealPnL": 28, "unrealPct": 0.9, "stop": null, "status": "HOLD — NO STOP — SPAC", "note": "Trust floor ~$10.27."},
    {"ticker": "IES", "name": "Invinity Energy Systems", "shares": 3000, "avgPrice": 17.49, "last": 18.00, "unrealPnL": 15, "stopType": "MANUAL ALERT 12.5p", "cur": "GBP", "status": "HOLD — MANUAL ALERT 12.5p (E15)", "note": "LDES decision pending. +2.86% today."},
    {"ticker": "SNPS", "shares": 8, "avgPrice": 495.125, "last": 491.57, "unrealPnL": -29, "unrealPct": -0.7, "stop": 440, "status": "HOLD — STOP $440 — EARNINGS MAY 20", "note": "EDA duopoly. Multiple compression ongoing. Stop 10.3% clearance."},
    {"ticker": "LDO", "name": "Leonardo SpA", "shares": 35, "avgPrice": 56.086, "last": 52.97, "unrealPnL": -109, "unrealPct": -5.6, "stop": 50, "cur": "EUR", "status": "HOLD — STOP €50 — DO NOT WIDEN — MILAN CLOSED MAY 1 — EARNINGS MON MAY 5 BMO", "note": "Milan closed May 1. Stop re-active Monday. Earnings May 5 BMO. ATH €66.26. Rearmament thesis. DO NOT WIDEN."}
  ],
  "pendingGTCs": [
    {"ticker": "TXT", "name": "Textron Inc", "action": "BUY", "limit": 88.00, "stop": 79.00, "qty": 55, "maxLoss": 495, "last": 93.46, "status": "GTC PENDING — NEEDS ~6% PULLBACK", "note": "Industrial separation announced S33. Bell MV-75 Valor = 20yr military monopoly. Aviation backlog $8B. 14.3x fwd PE."},
    {"ticker": "LDOS", "name": "Leidos Holdings", "action": "BUY", "limit": 143.00, "stop": 136.00, "qty": 45, "maxLoss": 315, "status": "GTC PENDING — EARNINGS MON MAY 5 BMO", "note": "Earnings Monday May 5 BMO confirms/breaks thesis for this GTC. Federal IT and defense services."},
    {"ticker": "LAC", "name": "Lithium Americas", "action": "BUY", "limit": 4.80, "stop": 4.00, "qty": 220, "maxLoss": 176, "last": 5.73, "status": "GTC $4.80 / STOP $4.00 SUBMITTED — SI-37 SPECULATIVE — OCA LINKED", "note": "Thacker Pass Phase 1: 40,000 tpa capacity. DoE loan $2.23B ($867M drawn). 93% engineering complete. Peak construction 2026. Mech. completion late 2027. Commercial viability: $15/kg realised = $200-280M EBITDA vs $130M debt service — serviceable (E21: price verified Fastmarkets March 2026 $18.05/kg CJK). Kill switch: construction halt / DoE suspension / lithium sustained below $10/kg North American."}
  ],
  "watchList": [
    {"ticker": "UUUU", "name": "Energy Fuels Inc", "thesis": "Only US licensed monazite→REE oxide facility (White Mesa Mill). Only US producer of dysprosium and terbium oxide (China restricted exports). ASM acquisition (H1 2026) adds operating Korean alloy plant — moves from oxide seller to alloy producer. 6 uranium LT contracts through 2032 fund transition.", "entry": "$18.50-$20.00 GTC post May 6 print", "stop": "$16.50", "maxLoss": 497, "gate": "May 6 Q1 earnings — confirm ASM closing timeline + REE revenue trajectory + uranium volume", "status": "WATCH — DO NOT ENTER BEFORE MAY 6 PRINT", "last": 21.64},
    {"ticker": "NOG", "thesis": "P11 re-entry. Thesis intact at stop-out: WTI $106, Hormuz closed, dual blockade hardening. Stop triggered on intraday CENTCOM briefing dip, not thesis break.", "entry": "< $26.47 (P11 gate)", "gate": "Post-Monday Situation Room outcome. WTI must be stable.", "status": "P11 GATE — ASSESS MONDAY", "last": 27.16},
    {"ticker": "USAR", "thesis": "Serra Verde acquisition = only asset outside Asia producing all 4 magnetic REEs at scale. 100% DoD cost-plus offtake. Best in class mine-to-magnet platform.", "entry": "< $22 (15-20% pullback needed)", "gate": "Near ATH $26. Wait for pullback.", "status": "WATCH — NEAR ATH — WAIT FOR PULLBACK"},
    {"ticker": "SARO", "thesis": "Engine MRO — LEAP/CFM56 ramp. Carlyle/GIC PE overhang noted.", "entry": "Post May 7 earnings", "gate": "EBITDA margins hold + LEAP ramp confirmed", "status": "WATCH — NO ENTRY BEFORE MAY 7 PRINT"}
  ],
  "shortWatchlist": [
    {"ticker": "PLTR", "thesis": "108x forward PE vs 18x software sector median. Reports May 4 AMC. Guidance miss or cut = repricing catalyst.", "fwdPE": 108, "currentPrice": 139.11, "trigger": "May 4 AMC guidance cut or revenue miss. Consensus expects beat — wait for print.", "status": "WATCH — DO NOT ENTER BEFORE MAY 4 PRINT", "correlationRisk": "Low"},
    {"ticker": "AAL", "thesis": "No fuel hedging, $36.5B debt, FY EPS guidance impaired at WTI $106. Fuel cost assumption stale.", "currentPrice": 11.31, "trigger": "Dead-cat bounce to $13-14. WTI must stay above $100 into Q2.", "status": "WATCH — WAIT FOR BOUNCE", "correlationRisk": "HIGH — oil correlated. Peace deal hits both."}
  ],
  "criticalMineralsThesis": {
    "title": "CRITICAL MINERALS / RARE EARTH — NATIONAL SECURITY THEME",
    "summary": "China controls 70%+ of US rare earth imports and dominates global lithium processing. US policy response: $5B Industrial Base Fund, DoD equity stakes, DoE project loans. Stage-propped vs commercially viable is the key distinction. Companies with globally scalable, integrated supply chains (processing + alloy + DoD offtake) are the target.",
    "concentrationCeiling": "CRML (held) + LAC (GTC) + UUUU (watch) = MAXIMUM. No further additions until one resolves.",
    "concentrationRationale": "China pricing monopoly means all names move together on geopolitical/policy news. Adding more = correlation amplification not diversification.",
    "candidates": [
      {"ticker": "CRML", "status": "HELD +38.6%", "thesis": "Dual critical minerals + European Lithium acquisition", "stop": "$10.51"},
      {"ticker": "LAC", "status": "GTC $4.80 PENDING", "thesis": "Thacker Pass construction underway. DoE backed. Commercial at $15/kg.", "classification": "SI-37 Speculative"},
      {"ticker": "UUUU", "status": "WATCH POST MAY 6", "thesis": "Only US licensed REE separator. ASM deal = alloy capability.", "classification": "SI-39 drawdown triggered"},
      {"ticker": "USAR", "status": "WATCH — near ATH", "thesis": "Serra Verde = DoD 100% cost-plus offtake. Entry below $22 only.", "classification": "Monitor"},
      {"ticker": "PPTA", "status": "WATCH — near ATH", "thesis": "Antimony + gold. DoD $234M loan. Entry $18-20 only.", "classification": "Monitor"},
      {"ticker": "ALB", "status": "WATCH — no catalyst", "thesis": "Quality compounder at -42% from ATH. Needs lithium >$15/kg.", "classification": "Low priority"},
      {"ticker": "LAC", "note": "Lithium price: seaborne CJK $18-20/kg (Fastmarkets March 2026). North American $9-10/kg March 2026 but converging. Commercial at $15/kg realised on GM LT contract. Source: Fastmarkets/IMARC March 2026 verified S34 (E21 correction)."}
    ]
  },
  "optionsCapability": {
    "status": "CONFIRMED ACTIVE",
    "level": "Options Level 3",
    "markets": "US Options approved",
    "sizeRule": "Max premium 2.5% NAV (~$2,600). Premium = stop. 1 contract only until familiar.",
    "p23Test": "One-sentence test: if this option expired worthless, would the fund survive and the thesis still make sense?",
    "nextCandidate": "PLTR post May 4 print if guidance misses. Have parameters ready beforehand."
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
      {"id":11,"ticker":"PLTR","dateIn":"2026-03-24","dateOut":"2026-04-09","qty":49,"entry":161.608,"exit":134.976,"ccy":"USD","pnlUSD":-1307.11,"note":"P6. Now on SI-61 short watchlist."},
      {"id":12,"ticker":"SHLD","dateIn":"2026-03-24","dateOut":"2026-04-10","qty":69,"entry":72.01,"exit":73.21,"ccy":"USD","pnlUSD":112.65,"note":"Tactical."},
      {"id":13,"ticker":"PDYN","dateIn":"2026-03-25","dateOut":"2026-04-14","qty":250,"entry":6.59,"exit":6.67,"ccy":"USD","pnlUSD":17.42,"note":"Partial."},
      {"id":14,"ticker":"AVAV","dateIn":"2026-03-26","dateOut":"2026-04-15","qty":25,"entry":195.05,"exit":197.945,"ccy":"USD","pnlUSD":70.27,"note":"SI-42."},
      {"id":15,"ticker":"ITM","dateIn":"2026-04-01","dateOut":"2026-04-17","qty":1100,"entry":65.1,"exit":124.60,"ccy":"GBP","pnlUSD":828.00,"note":"Trim 1."},
      {"id":16,"ticker":"LNG","dateIn":"2026-04-13","dateOut":"2026-04-17","qty":19,"entry":268.813,"exit":248.00,"ccy":"USD","pnlUSD":-396.54,"note":"Stopped."},
      {"id":17,"ticker":"PATK","dateIn":"2026-04-17","dateOut":"2026-04-17","qty":25,"entry":108.80,"exit":109.256,"ccy":"USD","pnlUSD":9.34,"note":"P17."},
      {"id":18,"ticker":"ABVX","dateIn":"2026-04-06","dateOut":"2026-04-21","qty":44,"entry":117.913,"exit":114.26,"ccy":"USD","pnlUSD":-158.53,"note":"Stopped. Re-entry 50sh."},
      {"id":19,"ticker":"RR","dateIn":"2026-03-26","dateOut":"2026-04-22","qty":150,"entry":1182.88,"exit":1150.00,"ccy":"GBP","pnlUSD":-62.39,"note":"Stopped. Re-entry 100sh."},
      {"id":20,"ticker":"ITM","dateIn":"2026-04-01","dateOut":"2026-04-24","qty":800,"entry":65.1,"exit":141.20,"ccy":"GBP","pnlUSD":770.00,"note":"Trim 2."},
      {"id":21,"ticker":"LLY","dateIn":"2026-04-16","dateOut":"2026-04-25","qty":3,"entry":905.344,"exit":875.54,"ccy":"USD","pnlUSD":-89.41,"note":"T28."},
      {"id":22,"ticker":"CODA","dateIn":"2026-04-08","dateOut":"2026-04-27","qty":416,"entry":12.005,"exit":11.42,"ccy":"USD","pnlUSD":-243.36,"note":"Stopped. P11 re-entry S33."},
      {"id":23,"ticker":"ISRG","dateIn":"2026-03-24","dateOut":"2026-04-27","qty":22,"entry":459.246,"exit":471.676,"ccy":"USD","pnlUSD":272.24,"note":"Stop triggered. Q1 beat."},
      {"id":24,"ticker":"ITM","dateIn":"2026-04-01","dateOut":"2026-04-28","qty":1200,"entry":65.1,"exit":130.39,"ccy":"GBP","pnlUSD":1041.00,"note":"AIM wick. ITM total +$2,639."},
      {"id":25,"ticker":"ABBV","dateIn":"2026-04-22","dateOut":"2026-04-29","qty":20,"entry":205.22,"exit":191.1608,"ccy":"USD","pnlUSD":-282.27,"note":"Stop BMO. Beat post-fill."},
      {"id":26,"ticker":"PDYN","dateIn":"2026-03-25","dateOut":"2026-04-29","qty":250,"entry":6.595,"exit":5.815,"ccy":"USD","pnlUSD":-196.00,"note":"Manual exit. E9 created short."},
      {"id":27,"ticker":"CCJ","dateIn":"2026-03-24","dateOut":"2026-04-28","qty":49,"entry":104.021,"exit":119.97,"ccy":"USD","pnlUSD":782.00,"note":"T23 deliberate. Re-entry 50sh."},
      {"id":28,"ticker":"VST","dateIn":"2026-04-08","dateOut":"2026-04-29","qty":53,"entry":150.569,"exit":156.53,"ccy":"USD","pnlUSD":316.00,"note":"GTC stop triggered."},
      {"id":29,"ticker":"PDYN","dateIn":"2026-04-29","dateOut":"2026-04-30","qty":250,"entry":5.7507,"exit":5.85,"ccy":"USD","pnlUSD":-25,"note":"E9 accidental short covered S33."},
      {"id":30,"ticker":"MSFT","dateIn":"2026-04-14","dateOut":"2026-04-30","qty":25,"entry":372.77,"exit":410.38,"ccy":"USD","pnlUSD":940,"note":"Stop $411.89 triggered S33 open. +$940. Re-entered 25sh @$403.01."},
      {"id":31,"ticker":"NOG","dateIn":"2026-03-26","dateOut":"2026-05-01","qty":80,"entry":24.383,"exit":26.50,"ccy":"USD","pnlUSD":169.36,"note":"Stop $26.47 triggered S34 17:39 UAE. WTI intraday dip on CENTCOM briefing. Thesis intact at exit. P11 gate: re-entry < $26.47 post-Monday Situation Room outcome."}
    ],
    "grossRealizedPnLUSD": -768,
    "ibkr30DayRealized": 936.00,
    "lastUpdated": "2026-05-01 S34 Final. Trade #31 NOG +$169.36. 30-day IBKR realized: +$936."
  },
  "sessionNotes": [
    {"date": "2026-05-01", "note": "SESSION 34 OPEN — SI-47: Friday 1 May 2026. Frankfurt/Milan CLOSED (Labour Day). LSE OPEN. NYSE OPEN from 17:30 UAE. NOG stop $26.47 flagged thin (2.5% clearance). WTI ~$106 — SI-25 price threshold briefly breached intraday but reopening condition unmet. Thesis intact."},
    {"date": "2026-05-01", "note": "SESSION 34 — NOG STOPPED. Stop $26.47 triggered at 17:39 UAE (9 minutes after NYSE open). Fill $26.50 — minimal slippage. P&L +$169.36 (Trade #31). WTI pullback from $111 on reports of CENTCOM military briefing to Trump — market priced deal-resolution risk on strike plans. Thesis intact throughout. NOG stopped on mechanical stop not thesis break. P11 gate: re-entry requires price < $26.47 post-Monday Situation Room outcome."},
    {"date": "2026-05-01", "note": "SESSION 34 — STOP RAISES. V: $312.82 → $321.83 (was protecting only 21% of $212 unrealised gain — P20 lesson applied, raised to protect 56%). AMZN: $249.88 → $251.38 (modest raise below recent swings, Stop Limit structure: trigger $251.38 / floor $224). Both confirmed in IBKR orders tab."},
    {"date": "2026-05-01", "note": "SESSION 34 — CRITICAL MINERALS RESEARCH. Stage 1 scan across UUUU, USAR, PPTA, ALB, LAC, SLI. Stage 2 complete on UUUU and LAC. UUUU: only US licensed REE separator, ASM acquisition adds Korean alloy plant, May 6 earnings gate, entry $18.50-20 / stop $16.50. LAC: Thacker Pass construction underway (93% engineering, $867M DoE drawn), commercial viability revised upward — lithium seaborne CJK $18-20/kg (E21: was using stale $10-12 data), project serviceable at $15/kg realised. Critical minerals concentration ceiling set: CRML + LAC + UUUU = max."},
    {"date": "2026-05-01", "note": "SESSION 34 — LAC GTC SUBMITTED. BUY 220sh @ $4.80 Limit / Sell 220sh @ $4.00 Stop GTC. OCA linked. Total cost if filled $1,056. Max loss $176. SI-37 speculative. Confirmed IBKR orders tab. IBKR warning noted: if LAC gaps sharply below $4.80 in single session, limit may be rejected — monitor on any large single-day moves."},
    {"date": "2026-05-01", "note": "SESSION 34 — GEOPOLITICAL CLOSE. Trump dissatisfied with Iranian proposal (Hormuz-for-blockade-lifting). Confirmed CENTCOM military options briefing. Situation Room Monday May 4. Iran threatens 'practical and unprecedented action'. Trump-Xi Beijing May 14-15 = potential diplomatic channel. EIA Q2 WTI peak forecast ~$115. Goldman Sachs Brent avg >$100. UAE exited OPEC May 1. Thesis: dual blockade hardening, not softening. SI-25 dual condition unmet. CODA and RR.L are primary remaining oil-thesis positions."},
    {"date": "2026-05-01", "note": "SESSION 34 — S33 CAPTURES. IBM 26sh @$228.739 stop $208 now in journal (filled S33 18:55 UAE post-journal close). BAH 33sh @$76.531 stop $69 now in journal (filled S33 18:28 UAE). MP orders confirmed CANCELLED (red X in orders tab). Portfolio now fully reconciled."}
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
  const tabs=["positions","gtcs","watch","shorts","minerals","thesis","tracker","notes"];
  const pnlColor=(v)=>v>0?COLORS.green:v<0?COLORS.red:COLORS.textDim;

  return(
    <div style={{background:COLORS.bg,minHeight:"100vh",color:COLORS.text,fontFamily:"monospace",padding:16,maxWidth:1200,margin:"0 auto"}}>
      <style>{`.card{background:${COLORS.card};border:1px solid ${COLORS.border};border-radius:6px;padding:12px}.badge{font-size:10px;padding:2px 6px;border-radius:4px;font-weight:600;display:inline-block}.badge-green{background:rgba(63,185,80,0.15);color:${COLORS.green};border:1px solid rgba(63,185,80,0.3)}.badge-red{background:rgba(248,81,73,0.15);color:${COLORS.red};border:1px solid rgba(248,81,73,0.3)}.badge-amber{background:rgba(210,153,34,0.15);color:${COLORS.yellow};border:1px solid rgba(210,153,34,0.3)}.badge-orange{background:rgba(240,136,62,0.15);color:${COLORS.orange};border:1px solid rgba(240,136,62,0.3)}.badge-grey{background:rgba(139,148,158,0.15);color:${COLORS.textDim};border:1px solid rgba(139,148,158,0.3)}.badge-purple{background:rgba(163,113,247,0.15);color:${COLORS.purple};border:1px solid rgba(163,113,247,0.3)}.badge-blue{background:rgba(56,139,253,0.15);color:${COLORS.blue};border:1px solid rgba(56,139,253,0.3)}.btn{background:${COLORS.card};border:1px solid ${COLORS.border};color:${COLORS.text};padding:6px 12px;border-radius:4px;cursor:pointer;font-family:monospace;font-size:12px}.btn:hover{background:#21262d}.btn-primary{background:rgba(88,166,255,0.15);border-color:rgba(88,166,255,0.4);color:${COLORS.accent}}input{background:${COLORS.card};border:1px solid ${COLORS.border};color:${COLORS.text};padding:8px;border-radius:4px;font-family:monospace;font-size:12px;flex:1}`}</style>

      <div style={{marginBottom:16}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:8}}>
          <div>
            <div style={{fontSize:18,fontWeight:700,color:COLORS.textBright}}>CLAUDE FUND — JOURNAL v49</div>
            <div style={{fontSize:11,color:COLORS.textDim,marginTop:2}}>Session 34 Final — Fri 1 May 2026 | {data.fund.account} | 18 positions | 3 pending GTCs | Options L3 ✅</div>
          </div>
          <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
            {[
              {label:"NET LIQ",val:"$105.6K"},
              {label:"UNREAL",val:"+$4,588",color:COLORS.green},
              {label:"REALIZED",val:"+$168",color:COLORS.green},
              {label:"WTI",val:"~$106",color:COLORS.orange}
            ].map(m=>(
              <div key={m.label} className="card" style={{textAlign:"center",minWidth:80}}>
                <div style={{fontSize:9,color:COLORS.textDim}}>{m.label}</div>
                <div style={{fontSize:14,fontWeight:700,color:m.color||COLORS.textBright,marginTop:2}}>{m.val}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{marginTop:6,padding:"6px 10px",background:"rgba(248,81,73,0.1)",border:"1px solid rgba(248,81,73,0.3)",borderRadius:4,fontSize:11,color:COLORS.red,fontWeight:600}}>
          ⚠️ SITUATION ROOM MON MAY 4 — Military options on table. LSE CLOSED Mon. Frankfurt/Milan OPEN Mon. E20: IBKR only for live prices. E21: Verify commodity prices from primary source.
        </div>
        <div style={{marginTop:4,padding:"6px 10px",background:"rgba(240,136,62,0.15)",border:"1px solid rgba(240,136,62,0.4)",borderRadius:4,fontSize:11,color:COLORS.orange,fontWeight:600}}>
          NOG stopped +$169 (Trade #31) | V stop → $321.83 | AMZN stop → $251.38 | LAC GTC $4.80 submitted | UUUU watch May 6
        </div>
        <div style={{marginTop:4,padding:"6px 10px",background:"rgba(163,113,247,0.1)",border:"1px solid rgba(163,113,247,0.3)",borderRadius:4,fontSize:11,color:COLORS.purple}}>
          SI-61: PLTR May 4 AMC + AAL bounce watch | Critical minerals ceiling: CRML+LAC+UUUU=MAX
        </div>
      </div>

      <div style={{display:"flex",gap:4,marginBottom:12,flexWrap:"wrap"}}>
        {tabs.map(t=>(<button key={t} className={`btn ${activeTab===t?"btn-primary":""}`} onClick={()=>setActiveTab(t)} style={{textTransform:"uppercase",fontSize:11}}>{t}</button>))}
      </div>

      {activeTab==="positions"&&(
        <div style={{display:"flex",flexDirection:"column",gap:6}}>
          {data.positions?.map((p)=>(
            <div key={p.ticker} className="card" style={{borderLeft:p.unrealPnL>300?"3px solid "+COLORS.green:p.unrealPnL<-50?"3px solid "+COLORS.red:p.status?.includes("WIDEN")?"3px solid "+COLORS.red:p.status?.includes("RAISED")?"3px solid "+COLORS.green:undefined}}>
              <div style={{display:"flex",gap:10,alignItems:"center",flexWrap:"wrap",marginBottom:3}}>
                <span style={{fontWeight:700,fontSize:13,color:COLORS.textBright}}>{p.ticker}</span>
                {p.cur&&<span className="badge badge-grey">{p.cur}</span>}
                {p.shares>0&&<span className={`badge ${p.unrealPnL>50?"badge-green":p.unrealPnL<-50?"badge-red":"badge-amber"}`}>{p.unrealPnL>=0?"+":""}{p.unrealPct?.toFixed(1)}%</span>}
                {p.status?.includes("CLOSED")&&<span className="badge badge-grey">CLOSED TODAY</span>}
                {p.status?.includes("RAISED")&&<span className="badge badge-green">STOP RAISED</span>}
                {p.status?.includes("WIDEN")&&<span className="badge badge-red">DO NOT WIDEN</span>}
                <span style={{fontSize:9,color:COLORS.textDim,marginLeft:"auto"}}>Stop: <b style={{color:COLORS.yellow}}>{p.stop||p.stopType||"—"}</b></span>
              </div>
              <div style={{fontSize:10,color:COLORS.accent,marginBottom:2}}>{p.status}</div>
              <div style={{fontSize:9,color:COLORS.textDim}}>{p.note}</div>
            </div>
          ))}
        </div>
      )}

      {activeTab==="gtcs"&&(
        <div style={{display:"flex",flexDirection:"column",gap:6}}>
          <div className="card" style={{marginBottom:4,borderLeft:`4px solid ${COLORS.blue}`,fontSize:11,color:COLORS.textDim}}>
            Pending GTC orders — not yet in positions. Fills create positions automatically.
          </div>
          {data.pendingGTCs?.map((g)=>(
            <div key={g.ticker} className="card" style={{borderLeft:`3px solid ${COLORS.blue}`}}>
              <div style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap",marginBottom:3}}>
                <span style={{fontWeight:700,fontSize:13,color:COLORS.textBright}}>{g.ticker}</span>
                <span className="badge badge-blue">BUY {g.action}</span>
                <span style={{fontSize:11,color:COLORS.accent}}>Limit: ${g.limit} / Stop: ${g.stop}</span>
                <span style={{fontSize:11,color:COLORS.textDim}}>{g.qty}sh</span>
                <span className={`badge ${g.maxLoss<=200?"badge-green":g.maxLoss<=400?"badge-amber":"badge-red"}`}>Max loss ${g.maxLoss}</span>
              </div>
              <div style={{fontSize:10,color:COLORS.yellow,marginBottom:2}}>{g.status}</div>
              <div style={{fontSize:9,color:COLORS.textDim}}>{g.note}</div>
            </div>
          ))}
        </div>
      )}

      {activeTab==="watch"&&(
        <div style={{display:"flex",flexDirection:"column",gap:6}}>
          {data.watchList?.map((w,i)=>(
            <div key={i} className="card" style={{borderLeft:`3px solid ${COLORS.yellow}`}}>
              <div style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap",marginBottom:3}}>
                <span style={{fontWeight:700,fontSize:13,color:COLORS.textBright}}>{w.ticker}</span>
                <span className="badge badge-amber">WATCH</span>
                {w.entry&&<span style={{fontSize:10,color:COLORS.green}}>Entry: {w.entry}</span>}
              </div>
              <div style={{fontSize:10,color:COLORS.yellow,marginBottom:2}}>{w.status}</div>
              <div style={{fontSize:10,fontStyle:"italic",color:COLORS.textBright,marginBottom:3}}>{w.thesis}</div>
              {w.gate&&<div style={{fontSize:9,color:COLORS.textDim}}>Gate: {w.gate}</div>}
            </div>
          ))}
        </div>
      )}

      {activeTab==="shorts"&&(
        <div>
          <div className="card" style={{marginBottom:10,borderLeft:`4px solid ${COLORS.purple}`}}>
            <div style={{fontWeight:700,color:COLORS.purple,fontSize:13,marginBottom:4}}>SHORT WATCHLIST — SI-61 | P23 one-sentence test required before entry</div>
            <div style={{fontSize:10,color:COLORS.textDim}}>P23: "If this option expired worthless, would the fund survive and thesis still make sense?"</div>
          </div>
          {data.shortWatchlist?.map((s,i)=>(
            <div key={i} className="card" style={{marginBottom:8,borderLeft:`3px solid ${COLORS.purple}`}}>
              <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:4}}>
                <span style={{fontWeight:700,color:COLORS.textBright}}>{s.ticker}</span>
                <span className="badge badge-purple">WATCH</span>
                {s.correlationRisk?.includes("HIGH")&&<span className="badge badge-red">OIL CORR.</span>}
              </div>
              <div style={{fontSize:11,fontStyle:"italic",color:COLORS.textBright,marginBottom:4}}>{s.thesis}</div>
              <div style={{fontSize:10,color:COLORS.yellow}}>Trigger: {s.trigger}</div>
            </div>
          ))}
        </div>
      )}

      {activeTab==="minerals"&&(
        <div>
          <div className="card" style={{marginBottom:10,borderLeft:`4px solid ${COLORS.green}`}}>
            <div style={{fontWeight:700,color:COLORS.green,fontSize:13,marginBottom:4}}>{data.criticalMineralsThesis?.title}</div>
            <div style={{fontSize:11,color:COLORS.text,marginBottom:6}}>{data.criticalMineralsThesis?.summary}</div>
            <div style={{padding:"6px 10px",background:"rgba(248,81,73,0.1)",borderRadius:4,fontSize:11,color:COLORS.red,fontWeight:600}}>
              CEILING: {data.criticalMineralsThesis?.concentrationCeiling}
            </div>
            <div style={{marginTop:4,fontSize:10,color:COLORS.textDim}}>{data.criticalMineralsThesis?.concentrationRationale}</div>
          </div>
          {data.criticalMineralsThesis?.candidates?.filter(c=>c.thesis).map((c,i)=>(
            <div key={i} className="card" style={{marginBottom:6,borderLeft:`3px solid ${c.status?.includes("HELD")?"#3fb950":c.status?.includes("GTC")?"#388bfd":c.status?.includes("WATCH — near ATH")?"#d29922":"#8b949e"}`}}>
              <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:3}}>
                <span style={{fontWeight:700,color:COLORS.textBright}}>{c.ticker}</span>
                <span className={`badge ${c.status?.includes("HELD")?"badge-green":c.status?.includes("GTC")?"badge-blue":c.status?.includes("WATCH")?"badge-amber":"badge-grey"}`}>{c.status}</span>
                {c.classification&&<span className="badge badge-grey">{c.classification}</span>}
              </div>
              <div style={{fontSize:10,color:COLORS.textDim}}>{c.thesis}</div>
              {c.stop&&<div style={{fontSize:9,color:COLORS.yellow,marginTop:2}}>Stop: {c.stop}</div>}
            </div>
          ))}
        </div>
      )}

      {activeTab==="thesis"&&(
        <div>
          <div className="card" style={{marginBottom:10,borderLeft:`4px solid ${COLORS.orange}`}}>
            <div style={{fontWeight:700,color:COLORS.orange,fontSize:13,marginBottom:4}}>{data.thesis.title}</div>
            <div style={{fontSize:11,lineHeight:1.8,marginBottom:6}}>{data.thesis.summary}</div>
            <div style={{padding:"6px 10px",background:"rgba(240,136,62,0.1)",borderRadius:4,fontSize:11,color:COLORS.orange}}>{data.thesis.SI25Status}</div>
          </div>
          {data.thesis.keyDates?.map((d,i)=>(
            <div key={i} className="card" style={{marginBottom:4,borderLeft:`3px solid ${d.priority==="CRITICAL"?COLORS.red:d.priority==="HIGH"?COLORS.yellow:d.priority==="MEDIUM"?COLORS.purple:COLORS.textDim}`}}>
              <div style={{display:"flex",gap:8,alignItems:"flex-start"}}>
                <span style={{fontSize:10,fontWeight:600,minWidth:160,color:COLORS.textBright}}>{d.date}</span>
                <span style={{fontSize:10,color:COLORS.textDim,flex:1}}>{d.event}</span>
                <span className={`badge ${d.priority==="CRITICAL"?"badge-red":d.priority==="HIGH"?"badge-amber":d.priority==="MEDIUM"?"badge-purple":"badge-grey"}`}>{d.priority}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab==="tracker"&&(
        <div>
          <div style={{fontSize:12,fontWeight:600,color:COLORS.accent,marginBottom:6}}>TRADE TRACKER — {data.tradeTracker?.closedTrades?.length} CLOSED | 30-day IBKR Realized: +${data.tradeTracker?.ibkr30DayRealized?.toFixed(0)}</div>
          <div style={{marginBottom:6,padding:"6px 10px",background:"rgba(63,185,80,0.1)",border:"1px solid rgba(63,185,80,0.3)",borderRadius:4,fontSize:10,color:COLORS.green}}>
            S34: #31 NOG stop-out +$169.36 | ITM programme total +$2,639 | MSFT #30 +$940
          </div>
          {data.tradeTracker?.closedTrades?.slice().reverse().map((t)=>(
            <div key={t.id} className="card" style={{marginBottom:3,borderLeft:`3px solid ${t.pnlUSD>0?COLORS.green:COLORS.red}`}}>
              <div style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap"}}>
                <span style={{fontSize:9,color:COLORS.textDim}}>#{t.id}</span>
                <span style={{fontWeight:600,fontSize:12}}>{t.ticker}</span>
                <span style={{fontSize:9,color:COLORS.textDim}}>{t.dateOut}</span>
                <span style={{fontWeight:700,color:pnlColor(t.pnlUSD)}}>{t.pnlUSD>0?"+$":"−$"}{Math.abs(t.pnlUSD).toFixed(0)}</span>
                <span className="badge badge-grey">{t.ccy}</span>
                {t.id===31&&<span className="badge badge-orange">S34</span>}
                {(t.id===29||t.id===30)&&<span className="badge badge-amber">S33</span>}
              </div>
              <div style={{fontSize:9,color:COLORS.textDim,marginTop:1}}>{t.note}</div>
            </div>
          ))}
        </div>
      )}

      {activeTab==="notes"&&(
        <div>
          <div style={{display:"flex",gap:8,marginBottom:10}}>
            <input value={newNote} onChange={e=>setNewNote(e.target.value)} placeholder="Add note..." onKeyDown={e=>e.key==="Enter"&&addNote()}/>
            <button className="btn btn-primary" onClick={addNote}>ADD</button>
          </div>
          {(data.sessionNotes||[]).slice().reverse().map((n,i)=>(
            <div key={i} className="card" style={{marginBottom:6}}>
              <div style={{fontSize:10,color:COLORS.textDim,marginBottom:3}}>{n.date}</div>
              <div style={{fontSize:11,lineHeight:1.7}}>{n.note}</div>
            </div>
          ))}
        </div>
      )}

      <div style={{marginTop:16,paddingTop:10,borderTop:`1px solid ${COLORS.border}`,display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:6,alignItems:"center"}}>
        <span style={{fontSize:10,color:COLORS.textDim}}>v49 FINAL | S34 | 18 positions | WTI ~$106 | Trade #31 NOG +$169</span>
        <div style={{display:"flex",gap:4,flexWrap:"wrap"}}>
          <span className="badge badge-orange">WTI ~$106</span>
          <span className="badge badge-red">SITUATION ROOM MON</span>
          <span className="badge badge-green">NOG +$169 (stopped)</span>
          <span className="badge badge-blue">LAC GTC $4.80</span>
          <span className="badge badge-purple">UUUU WATCH MAY 6</span>
        </div>
      </div>
    </div>
  );
}
