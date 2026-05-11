import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "fund_journal_v2";

// ═══════════════════════════════════════════════════════════════════
// SESSION CLOSE CHECKLIST — CLAUDE EXECUTES AT EVERY SESSION END
// ═══════════════════════════════════════════════════════════════════
// Claude writes directly to C drive via filesystem MCP tools:
// filesystem:write_file → journal, FUND_SESSION_STATE.md, LESSONS_LEARNED.md
// Allowed paths: C:\Users\jcadb\claude-fund\
//
// Claude actions (automatic):
// □ 1. Write trading_journal[N+1].jsx → C:\Users\jcadb\claude-fund\journal\
// □ 2. Write FUND_SESSION_STATE.md   → C:\Users\jcadb\claude-fund\state\
// □ 3. Write LESSONS_LEARNED.md      → C:\Users\jcadb\claude-fund\state\
// □ 4. Update hormuz_log.md if thesis changed → \intelligence\
// □ 5. Update trade tracker if confirmed fills occurred
// □ 6. Update thesis files in \research\ if thesis research conducted
//
// User actions required:
// □ 7. Delete OLD journal version from Claude project
// □ 8. Upload NEW trading_journal[N+1].jsx to Claude project
// □ 9. Run session-close.bat (GitHub backup)
// □ 10. Verify: Claude project shows correct session number
// ═══════════════════════════════════════════════════════════════════

const INITIAL_STATE = {
  "lastUpdated": "2026-04-20 SESSION 25 EOD CLOSE — JOURNAL v37",
  "sessionNumber": 25,
  "fund": {
    "account": "U24936508",
    "netLiquidity": 104800,
    "cash": 29168,
    "availableFunds": 82800,
    "dailyPnL": -603.92,
    "unrealizedPnL": 7156,
    "realizedPnL": 493.44,
    "broker": "IBKR Pro",
    "baseCurrency": "USD",
    "location": "UAE",
    "ibkrEuropeanAccess": "APPROVED — March 26 2026",
    "cashUSD": 33853,
    "cashEUR": -937,
    "cashGBP": -2645,
    "cashBase": 29168,
    "cashFloorRule": "10% of NL = $10,480 minimum. NEVER go below.",
    "deployableCash": 17140,
    "deployableCashNote": "cashBase $29,168 minus floor $10,480 minus FX deficit ~$1,548 = ~$17,140",
    "lastUpdated": "2026-04-20 SESSION 25 EOD — JOURNAL v37 — IES.L filled 17.39p (IBKR avg 17.49p), £525 cost. WTI closed $88.36 (+6.99%). Ceasefire expires TOMORROW. ISRG earnings TONIGHT. E15: AIM stops not supported.",
    "note": "JOURNAL v37 EOD SESSION 25 (Monday 20 Apr 2026). NET LIQ $104.8K. Daily P&L -$603.92. IES.L OPEN: 3,000sh filled 17.39p (IBKR avg 17.49p), £525. AIM STOP LIMITATION E15 CONFIRMED: IBKR supports only Limit/Market/MoC/LoC for AIM — no stop orders. Manual price alert 12.5p only protection. WTI closed $88.36 (+6.99%) — US Navy seized Iranian vessel. CEASEFIRE EXPIRES TOMORROW. ISRG Q1 earnings AMC tonight — EPS cons $1.63. RR.L -3.68% civil aviation concern + pre-ex-div — thesis intact hard lock. AMPX +6.70% strongest mover. OXY: WTI $88.36 — below $90 threshold, Day 1 borderline."
  },
  "thesis": {
    "title": "US NAVAL BLOCKADE ACTIVE — HORMUZ CLOSED — CEASEFIRE EXPIRES TOMORROW APR 21 — US NAVY SEIZED IRANIAN VESSEL",
    "summary": "EOD MONDAY APR 20. WTI closed $88.36 (+6.99%) — US Navy fired on and seized Iranian vessel in Gulf of Oman. Hormuz remains closed. Ceasefire expires TOMORROW Tuesday Apr 21 with no deal in place and no confirmed second round of talks. Iran rejected talks Sunday citing excessive demands. Iran simultaneously rebuilding weapons stockpiles. SI-25 NOT TRIGGERED (WTI $88.36 vs trigger $100.38). NOG thesis intact. CODA mine clearance thesis strengthening. Conflict structural — not near-term resolved.",
    "oilWTI": 88.36,
    "oilWTINote": "EOD Monday close $88.36 (+$5.77, +6.99%). Opened $93.18, retreated on talk-of-talks rumours but still closed strongly up. Ceasefire expiry tomorrow will be decisive.",
    "oilBrent": 92.50,
    "goldPrice": 4820,
    "hormuzStatus": "CLOSED. US Navy fired on and seized Iranian vessel Sunday. Iran vowed retaliation. Ceasefire expires TOMORROW. No deal in place. No confirmed second round of talks.",
    "ceasefireFilter": "SI-25 ELEVATED ALERT. Ceasefire expires TOMORROW APR 21. WTI $88.36 (vs SI-25 trigger $100.38 — still -12% away). SI-25 NOT TRIGGERED. Watch overnight for ceasefire extension or resumption of hostilities.",
    "blockadeStatus": "US CENTCOM naval blockade continues. Iran blockading Hormuz. US Navy seized Iranian vessel Sunday. Mine clearance multi-year (CODA). Iran rebuilding stockpiles confirmed.",
    "keyDates": [
      {"date": "TONIGHT 00:30 UAE Wed", "event": "ISRG Q1 2026 earnings — 1:30 PM PDT. Consensus EPS $1.63, rev $2.61B. Beat: raise stop $455-460. Miss: let stop $443.86 execute.", "priority": "CRITICAL"},
      {"date": "TOMORROW Tue Apr 21", "event": "CEASEFIRE EXPIRY — binary event. Monitor from 07:00 UAE. SI-25 watch. RR.L EX-DIVIDEND — hard lock confirmed.", "priority": "CRITICAL"},
      {"date": "Wed Apr 23 AMC", "event": "AMZN Q1 earnings — AWS + AI capex guidance key.", "priority": "CRITICAL"},
      {"date": "Mon Apr 28 AMC", "event": "V Q2 earnings — BUY $307 GTC active.", "priority": "CRITICAL"},
      {"date": "Tue Apr 29 AMC", "event": "MSFT Q3 FY2026 earnings — Azure growth %.", "priority": "CRITICAL"},
      {"date": "Wed Apr 30", "event": "NOG Q1 earnings at WTI war-premium levels.", "priority": "HIGH"},
      {"date": "Spring 2026 (IMMINENT)", "event": "IES.L LDES Initial Decision List — Ofgem. 16.7 GWh Endurium bids eligible. Binary catalyst.", "priority": "CRITICAL"},
      {"date": "H1 2026", "event": "IES.L Copwood 20.7 MWh commercial operation — first recurring revenue.", "priority": "HIGH"},
      {"date": "May 5", "event": "TLN Q1 + LDO.MI Q1 earnings.", "priority": "CRITICAL"},
      {"date": "May 6", "event": "R3NK Q1 — €200M deferred orders must appear.", "priority": "CRITICAL"},
      {"date": "Mid-May", "event": "SNPS Q2 FY26 — margin recovery above 20% = entry signal.", "priority": "CRITICAL"},
      {"date": "After May 17", "event": "MU SI-41 window opens — $440-445 limit, stop $420, 14sh.", "priority": "CRITICAL"},
      {"date": "Summer 2026", "event": "IES.L LDES final decisions — Ofgem contract awards.", "priority": "CRITICAL"},
      {"date": "Jul 1", "event": "MU Q3 FY26 earnings AMC.", "priority": "HIGH"},
      {"date": "~May 2026", "event": "CGCT business combination close → FAC listing.", "priority": "CRITICAL"}
    ]
  },
  "positions": [
    {"ticker": "NOG", "name": "Northern Oil and Gas Inc", "shares": 80, "avgPrice": 24.37, "costBasis": 1950, "last": 24.90, "marketVal": 1992, "unrealPnL": 42, "unrealPct": 2.2, "stop": 22.50, "target": null, "status": "HOLD — STOP $22.50 GTC (Order ID 133934373)", "note": "WTI closed $88.36 +6.99%. US Navy seized Iranian vessel. Ceasefire expires tomorrow. Stop confirmed live. Apr 30 Q1 earnings."},
    {"ticker": "CGCT", "name": "Cartesian Growth Corp III (Factorial Energy SPAC)", "shares": 291, "avgPrice": 10.29, "costBasis": 2994, "last": 10.29, "marketVal": 2994, "unrealPnL": -1, "unrealPct": 0.0, "stop": null, "target": null, "status": "HOLD — NO STOP (TRUST FLOOR ~$10.27)", "note": "Trust floor. Deal close ~May 2026."},
    {"ticker": "CCJ", "name": "Cameco Corp", "shares": 49, "avgPrice": 104.021, "costBasis": 5097, "last": 122.13, "marketVal": 5984, "unrealPnL": 887, "unrealPct": 17.1, "stop": 108.37, "target": null, "status": "HOLD — STOP LIVE", "note": "Nuclear thesis structural. +1.22% today."},
    {"ticker": "AMZN", "name": "Amazon.com Inc", "shares": 30, "avgPrice": 201.204, "costBasis": 6036, "last": 246.66, "marketVal": 7400, "unrealPnL": 1364, "unrealPct": 22.6, "stop": 234.39, "stopType": "Stop Limit", "stopLimit": 224, "target": 300, "status": "HOLD — STOP LIMIT LIVE — EARNINGS TOMORROW AMC", "note": "Stop $234.39/$224 GTC. Earnings TOMORROW Apr 23 AMC. AWS + AI capex the key metrics."},
    {"ticker": "VST", "name": "Vistra Corp", "shares": 53, "avgPrice": 150.569, "costBasis": 7980, "last": 161.59, "marketVal": 8564, "unrealPnL": 584, "unrealPct": 7.2, "stop": 151.5, "target": null, "status": "HOLD — STOP LIVE", "note": "Stop $151.50. Earnings May 13."},
    {"ticker": "RR", "name": "Rolls-Royce Holdings", "shares": 150, "avgPrice": 1182.9, "costBasis": 1774, "last": 1262.40, "marketVal": 1894, "unrealPnL": 119, "unrealPct": 6.7, "stop": 1150, "stopType": "Stop Limit", "stopLimit": 1130, "target": 1600, "status": "HARD LOCK — EX-DIV TOMORROW APR 21", "cur": "GBP", "note": "-3.68% today. Civil aviation war concern + pre-ex-div selling. Thesis intact — £2.5bn buyback active. Stop 1,150p = 8.9% below current. HARD LOCK until ex-div passes."},
    {"ticker": "ITM", "name": "ITM Power PLC", "shares": 2000, "avgPrice": 65.1, "costBasis": 1302, "last": 126.70, "marketVal": 2534, "unrealPnL": 1232, "unrealPct": 94.6, "stop": 100, "stopType": "Stop Limit", "stopLimit": 98, "target": 150, "status": "HOLD — STOP LIMIT 100p/98p GTC", "cur": "GBP", "note": "2,000 shares post-S22 trim. Pulled back to 126.70p. Stop -21% away. S22 trim proceeds funded IES.L."},
    {"ticker": "IES", "name": "Invinity Energy Systems PLC", "shares": 3000, "avgPrice": 17.49, "costBasis": 525, "last": 16.85, "marketVal": 506, "unrealPnL": -19, "unrealPct": -2.8, "stop": null, "stopType": "MANUAL ALERT 12.5p", "target": 45, "status": "OPEN S25 — MANUAL ALERT 12.5p (AIM — NO IBKR STOP — E15)", "cur": "GBP", "note": "FILLED S25 @ 17.39p (IBKR avg 17.49p inc commission). £525 cost confirmed. E15: IBKR does not support stop/stop-limit for AIM securities. Manual alert 12.5p — Market Sell 3,000 on trigger. Max loss £150. THESIS: LDES Initial Decision List IMMINENT. 16.7 GWh bids eligible. Copwood H1 2026. Target 61.81p. Risk: Li-ion."},
    {"ticker": "AMPX", "name": "Amprius Technologies", "shares": 168, "avgPrice": 18.106, "costBasis": 3042, "last": 19.92, "marketVal": 3347, "unrealPnL": 306, "unrealPct": 10.0, "stop": 15.79, "target": 32, "status": "HOLD — STOP $15.79 GTC + LIMIT $32 GTC", "note": "+6.70% today — strongest position mover. Drone/defence sector rotation likely. Q1 earnings May 7. Consider stop raise if holds above $21."},
    {"ticker": "PDYN", "name": "Palladyne AI Corp", "shares": 250, "avgPrice": 6.595, "costBasis": 1649, "last": 6.70, "marketVal": 1675, "unrealPnL": 26, "unrealPct": 1.6, "stop": 5.75, "target": null, "status": "HOLD — STOP LIVE", "note": "May 13 earnings."},
    {"ticker": "CODA", "name": "Coda Octopus Group", "shares": 416, "avgPrice": 12.005, "costBasis": 4994, "last": 13.08, "marketVal": 5441, "unrealPnL": 418, "unrealPct": 8.4, "stop": 11.51, "target": 22, "status": "HOLD — STOP INTENTIONAL — MINE CLEARANCE MULTI-YEAR", "note": "US Navy kinetic action in Hormuz strengthens mine clearance thesis. Stop $11.51 intentional."},
    {"ticker": "ABVX", "name": "Abivax SA-ADR", "shares": 44, "avgPrice": 117.913, "costBasis": 5188, "last": 117.19, "marketVal": 5156, "unrealPnL": -32, "unrealPct": -0.6, "stop": 114.31, "target": null, "status": "HOLD — STOP $114.31 GTC (BELOW COST — INTENTIONAL)", "note": "NOW BELOW COST $117.91. Intentional — stop $114.31 = max loss ~$158. M&A optionality. Do not adjust stop."},
    {"ticker": "ISRG", "name": "Intuitive Surgical Inc", "shares": 22, "avgPrice": 459.25, "costBasis": 10104, "last": 468.15, "marketVal": 10299, "unrealPnL": 196, "unrealPct": 1.9, "stop": 443.86, "target": 510, "status": "HOLD — STOP $443.86 — EARNINGS TONIGHT AMC — DO NOT TOUCH", "note": "Q1 earnings TONIGHT 1:30 PM PDT = 00:30 UAE Wed. Consensus EPS $1.63 / rev $2.61B. Beat → raise stop $455-460. Miss → let stop execute."},
    {"ticker": "MSFT", "name": "Microsoft Corp", "shares": 25, "avgPrice": 372.73, "costBasis": 9318, "last": 417.70, "marketVal": 10443, "unrealPnL": 1124, "unrealPct": 12.1, "stop": 400.43, "target": 430, "status": "HOLD — STOP $400.43 GTC — EARNINGS APR 29 AMC", "note": "Stop 5.3% below. Azure + Copilot thesis intact."},
    {"ticker": "R3NK", "name": "RENK Group AG", "shares": 25, "avgPrice": 52.15, "costBasis": 1304, "last": 54.83, "marketVal": 1371, "unrealPnL": 67, "unrealPct": 4.9, "stop": 48, "stopType": "Stop Limit", "stopLimit": 47, "target": 76, "status": "HOLD — STOP LIMIT €48/€47 GTC", "cur": "EUR", "note": "Q1 earnings May 6."},
    {"ticker": "LLY", "name": "Eli Lilly and Company", "shares": 3, "avgPrice": 905.01, "costBasis": 2715, "last": 928.27, "marketVal": 2785, "unrealPnL": 70, "unrealPct": 2.5, "stop": 850, "target": 1028, "status": "HOLD — STOP $850 GTC — SI-39 POSITION", "note": "GLP-1 thesis intact."},
    {"ticker": "CRML", "name": "Critical Metals Corp", "shares": 110, "avgPrice": 9.07, "costBasis": 999, "last": 11.93, "marketVal": 1312, "unrealPnL": 313, "unrealPct": 31.5, "stop": 8.34, "target": 15, "status": "HOLD — STOP $8.34 GTC", "note": "US critical minerals vs China thesis."}
  ],
  "pendingOrders": [
    {"ticker": "NOG", "action": "SELL", "type": "Stop", "qty": 80, "stopPrice": 22.50, "tif": "GTC", "status": "SUBMITTED — Order ID 133934373", "note": "Auto-cancels 2026-09-30."},
    {"ticker": "IES", "action": "SELL", "type": "MANUAL ALERT", "qty": 3000, "alertPrice": "12.5p", "tif": "N/A", "status": "MANUAL — PRICE ALERT 12.5p. E15: AIM STOPS NOT SUPPORTED.", "note": "IBKR AIM limitation E15 confirmed. Alert at 12.5p → Market Sell 3,000 IES immediately. Max loss £150."},
    {"ticker": "V", "action": "BUY", "type": "Limit", "qty": 8, "limitPrice": 307, "tif": "GTC", "status": "ACTIVE", "note": "SI-39. Earnings Apr 28 AMC. Bracket stop $285 live."},
    {"ticker": "V", "action": "SELL", "type": "Stop", "qty": 8, "stopPrice": 285, "tif": "GTC", "status": "ACTIVE"},
    {"ticker": "LLY", "action": "SELL", "type": "Stop", "qty": 3, "stopPrice": 850, "tif": "GTC", "status": "ACTIVE"},
    {"ticker": "CCJ", "action": "SELL", "type": "Stop", "qty": 49, "stopPrice": 108.37, "tif": "GTC", "status": "ACTIVE"},
    {"ticker": "PDYN", "action": "SELL", "type": "Stop", "qty": 250, "stopPrice": 5.75, "tif": "GTC", "status": "ACTIVE"},
    {"ticker": "AMPX", "action": "SELL", "type": "Stop", "qty": 168, "stopPrice": 15.79, "tif": "GTC", "status": "ACTIVE"},
    {"ticker": "AMPX", "action": "SELL", "type": "Limit", "qty": 168, "limitPrice": 32, "tif": "GTC", "status": "ACTIVE"},
    {"ticker": "VST", "action": "SELL", "type": "Stop", "qty": 53, "stopPrice": 151.5, "tif": "GTC", "status": "ACTIVE"},
    {"ticker": "AMZN", "action": "SELL", "type": "Stop Limit", "qty": 30, "limitPrice": 224, "stopPrice": 234.39, "tif": "GTC", "status": "ACTIVE — EARNINGS TOMORROW AMC"},
    {"ticker": "ABVX", "action": "SELL", "type": "Stop", "qty": 44, "stopPrice": 114.31, "tif": "GTC", "status": "ACTIVE — BELOW COST INTENTIONAL"},
    {"ticker": "ISRG", "action": "SELL", "type": "Stop", "qty": 22, "stopPrice": 443.86, "tif": "GTC", "status": "ACTIVE — EARNINGS TONIGHT — DO NOT TOUCH"},
    {"ticker": "MSFT", "action": "SELL", "type": "Stop", "qty": 25, "stopPrice": 400.43, "tif": "GTC", "status": "ACTIVE"},
    {"ticker": "CODA", "action": "SELL", "type": "Stop", "qty": 416, "stopPrice": 11.51, "tif": "GTC", "status": "ACTIVE — INTENTIONAL"},
    {"ticker": "RR", "action": "SELL", "type": "Stop Limit", "qty": 150, "stopPrice": 1150, "limitPrice": 1130, "tif": "GTC", "status": "ACTIVE — EX-DIV TOMORROW — HARD LOCK"},
    {"ticker": "R3NK", "action": "SELL", "type": "Stop Limit", "qty": 25, "limitPrice": 47, "stopPrice": 48, "tif": "GTC", "status": "ACTIVE"},
    {"ticker": "ITM", "action": "SELL", "type": "Stop Limit", "qty": 2000, "limitPrice": 98, "stopPrice": 100, "tif": "GTC", "status": "ACTIVE — 2,000 SHARES"},
    {"ticker": "LDO", "action": "BUY", "type": "Limit", "qty": 35, "limitPrice": 56, "tif": "GTC", "status": "PENDING — EARNINGS MAY 5"},
    {"ticker": "MP", "action": "BUY", "type": "Limit", "qty": 75, "limitPrice": 55, "tif": "GTC", "status": "ACTIVE"},
    {"ticker": "MP", "action": "SELL", "type": "Stop", "qty": 75, "stopPrice": 50, "tif": "GTC", "status": "ACTIVE"},
    {"ticker": "CRML", "action": "BUY", "type": "Limit", "qty": 40, "limitPrice": 10.50, "tif": "GTC", "status": "ACTIVE"},
    {"ticker": "CRML", "action": "SELL", "type": "Stop", "qty": 110, "stopPrice": 8.34, "tif": "GTC", "status": "ACTIVE"}
  ],
  "ukCleanEnergyBasket": {
    "thesis": "UK energy transition — ITM (green hydrogen electrolyser) + IES (vanadium flow LDES). AIM-listed pair. Macro tailwind: EU energy independence, UK LDES policy, grid decarbonisation.",
    "combinedCost": "ITM £1,302 + IES £525 = £1,827 (~1.7% NAV)",
    "correlationNote": "Both move together in AIM clean energy selloffs. Total <2% NAV. E15: AIM stops not supported — IES manually monitored.",
    "positions": [
      {"ticker": "ITM.L", "technology": "PEM green hydrogen electrolyser", "shares": 2000, "avgPrice": "65.1p", "last": "126.70p", "stop": "100p/98p SL GTC", "unrealPct": "+94.6%", "nextCatalyst": "EU hydrogen structural — no near-term binary"},
      {"ticker": "IES.L", "technology": "Vanadium flow battery LDES", "shares": 3000, "avgPrice": "17.49p", "last": "16.85p", "stop": "Manual alert 12.5p (E15: AIM no IBKR stop)", "unrealPct": "-2.8%", "nextCatalyst": "LDES Initial Decision List IMMINENT — binary"}
    ]
  },
  "watchlistUS": [
    {"ticker": "V", "name": "Visa Inc", "exchange": "NYSE", "status": "ACTIVE — BUY $307 GTC — SI-39 TRIGGERED", "currentPrice": 317.02, "52wkHigh": 375.51, "drawdown": -15.6, "note": "Earnings Apr 28 AMC. Bracket $285 live."},
    {"ticker": "MU", "name": "Micron Technology", "exchange": "NASDAQ", "status": "STAGE 2 CONFIRMED — WAIT SI-41 (after May 17)", "currentPrice": 455.07, "52wkHigh": 471.34, "note": "Entry $440-445 limit, stop $420, 14sh."},
    {"ticker": "SNPS", "name": "Synopsys", "exchange": "NASDAQ", "status": "MONITOR — WAIT MID-MAY EARNINGS", "currentPrice": 449.58, "52wkHigh": 651.73, "drawdown": -31.0},
    {"ticker": "CRDO", "name": "Credo Technology", "exchange": "NASDAQ", "status": "CONDITIONAL — WAIT $140-145", "currentPrice": 160.69, "52wkHigh": 213.80, "drawdown": -24.8},
    {"ticker": "OXY", "name": "Occidental Petroleum", "exchange": "NYSE", "status": "CONDITIONAL — WTI $90+ DAY 1 BORDERLINE", "currentPrice": 53.79, "note": "WTI $88.36 EOD — below $90 threshold. Day 1 borderline. Confirm Tuesday."},
    {"ticker": "CDNS", "name": "Cadence Design Systems", "exchange": "NASDAQ", "status": "MONITOR — TRIGGER $301.16 (-20%)", "currentPrice": 311.03, "52wkHigh": 376.45, "drawdown": -17.4},
    {"ticker": "TLN", "name": "Talen Energy Corp", "exchange": "NASDAQ", "status": "WATCH — POST MAY 5 ONLY", "currentPrice": 365.35},
    {"ticker": "BKR", "name": "Baker Hughes", "exchange": "NYSE", "status": "WATCH — EARNINGS WED APR 22", "currentPrice": 59.78, "note": "Post-earnings $58.50 entry only."},
    {"ticker": "NFLX", "name": "Netflix Inc", "exchange": "NASDAQ", "status": "STAGE 1 — SI-41 FAIL until June", "currentPrice": 97.31, "52wkHigh": 134.12, "drawdown": -27.4}
  ],
  "watchlistEU": [
    {"ticker": "IES.L", "name": "Invinity Energy Systems PLC", "exchange": "AIM", "cur": "GBP", "current": "16.85p", "status": "IN PORTFOLIO — 3,000sh @ 17.49p avg — E15 MANUAL ALERT 12.5p", "note": "LDES Initial Decision List imminent. E15 confirmed — no IBKR stop for AIM."},
    {"ticker": "ITM.L", "name": "ITM Power PLC", "exchange": "LSE", "cur": "GBP", "current": "126.70p", "note": "IN PORTFOLIO. 2,000 shares. +94.6%."},
    {"ticker": "RR.L", "name": "Rolls-Royce Holdings", "exchange": "LSE", "cur": "GBP", "current": "1262.40p", "note": "IN PORTFOLIO. EX-DIV TOMORROW APR 21. HARD LOCK."},
    {"ticker": "R3NK", "name": "RENK Group AG", "exchange": "IBIS", "cur": "EUR", "current": "54.83", "note": "IN PORTFOLIO. Q1 May 6."},
    {"ticker": "LDO.MI", "name": "Leonardo SpA", "exchange": "BVME", "cur": "EUR", "note": "BUY LIMIT €56 GTC active. May 5 earnings."},
    {"ticker": "CWR.L", "name": "Ceres Power", "exchange": "LSE", "cur": "GBP", "note": "Entry 250-270p only."},
    {"ticker": "ENR.DE", "name": "Siemens Energy AG", "exchange": "XETRA", "cur": "EUR", "note": "AI THESIS TIER 2 — Stage 2 pending."},
    {"ticker": "SU.PA", "name": "Schneider Electric", "exchange": "XPAR", "cur": "EUR", "note": "AI thesis adjacent — earnings April 30."}
  ],
  "sessionNotes": [
    {"date": "2026-04-18", "note": "SESSION 23 — LNG stopped -$396.54. NOG filled $24.37. ITM trim +£652 confirmed. Journal v32."},
    {"date": "2026-04-19", "note": "SESSION 24 — HORMUZ RE-CLOSED Apr 18. NOG sell cancelled. SI-47/48/49 added. AI thesis Stage 1 (40+ candidates). Journal v35."},
    {"date": "2026-04-20", "note": "SESSION 25 AM — NOG stop $22.50 GTC resubmitted (ID 133934373). Stage 2 AI complete. SI-50 twice-weekly scan formalised. Journal v36."},
    {"date": "2026-04-20", "note": "SESSION 25 MID — IES.L FILLED @ 17.39p (IBKR avg 17.49p), £525 cost. E15 CONFIRMED: IBKR does not support stop/stop-limit for AIM securities — Limit/Market/MoC/LoC only. Manual price alert 12.5p set. Journal v37."},
    {"date": "2026-04-20", "note": "SESSION 25 EOD CLOSE. Net Liq $104.8K. Daily P&L -$603.92. Unrealized $7,156. WTI closed $88.36 (+6.99%) — US Navy seized Iranian vessel. Ceasefire expires TOMORROW. ISRG earnings AMC tonight. RR.L -3.68% civil aviation concern + pre-ex-div, thesis intact, hard lock. AMPX +6.70% strongest mover. ABVX now below cost at $117.19 vs $117.91 — intentional, stop $114.31. IES 16.85p first day. OXY WTI Day 1 borderline ($88.36 vs $90 threshold). Ceasefire overnight binary watch."}
  ],
  "tradeTracker": {
    "pendingRows": [
      {"id": 1, "ticker": "AVAV", "shares": 25, "entryPrice": 195.09, "exitPrice": 197.945, "pnl": "+$71.38", "session": "S20", "note": "outstanding"},
      {"id": 2, "ticker": "ITM TRIM", "shares": 1100, "entryPrice": "65.1p", "exitPrice": "124.60p", "pnl": "+£652", "session": "S22", "note": "Proceeds recycled into IES.L S25"},
      {"id": 3, "ticker": "LNG", "shares": 19, "entryPrice": 268.76, "exitPrice": 248.00, "pnl": "-$396.54", "session": "S23"},
      {"id": 4, "ticker": "PATK", "shares": 25, "entryPrice": 108.80, "exitPrice": 109.256, "pnl": "+$9.34", "session": "S23 P17"},
      {"id": 5, "ticker": "NOG", "note": "Market sell cancelled S24 — position held", "session": "S24"}
    ]
  },
  "standingInstructions": [
    {"id": 1, "title": "FULL SCAN — SI-14 v4.0", "body": "Section 0 first: SI-39 Tier 1 + AI Tier 2 + SI-50 candidates. Then A-K."},
    {"id": 17, "title": "ERROR TAXONOMY — 15 TYPES (E15 NEW S25)", "body": "E1-E14 unchanged. E15 (NEW S25): AIM Stop Limitation — IBKR does not support stop or stop-limit order types for AIM-listed securities. Available: Limit, Market, Market on Close, Limit on Close only. Manual price alert is the only protection mechanism. Must be noted before any AIM entry and documented in position note."},
    {"id": 19, "title": "CLOSED POSITIONS — SI-19", "body": "ONDS -$601. KTOS -$1,601. CCL +$122. UEC -$127. IAG.L +£326. RCL -$132. LDO.MI +€21.52. LEU -$238. PLTR -$1,307. PDYN partial +$17.42. AVAV +$71.38. ITM TRIM +£652. LNG -$396.54. PATK +$9.34. NOG sell cancelled S24."},
    {"id": 24, "title": "CASH FLOOR — 10% RULE", "body": "Floor = 10% of NL. At $104.8K NL, floor = $10,480. Deployable ~$17,140."},
    {"id": 25, "title": "SI-25 EXIT TRIGGER", "body": "Formal PERMANENT Hormuz reopening + WTI -10% from $111.54 peak = trigger at $100.38. WTI EOD $88.36. NOT TRIGGERED. Ceasefire expires tomorrow."},
    {"id": 37, "title": "SPECULATIVE CAP — $1,500 / ~£500 MAX", "body": "IES.L £525 (marginal £25 over, acceptable). Current spec: AMPX $3,042 + PDYN $1,649 + CRML $999 + CGCT $2,994 + IES £525 (~$666) = ~$9,350. No further spec entries without trim."},
    {"id": 47, "title": "SI-47: DATE VERIFICATION — STEP ZERO", "body": "System prompt date is authoritative. State date at start of every session."},
    {"id": 48, "title": "SI-48: AI THESIS ATH RULE", "body": "Four tests: valuation, structural catalyst, no multiple expansion, PLTR P6 test. MU passes. HPE fails test 3. SNPS N/A."},
    {"id": 49, "title": "SI-49: STAGE 2 DATA ROUTING", "body": "Price: MMD. 52wk: EOD extended quotes. Fundamentals: Alpha. Transcripts: Alpha EARNINGS_CALL_TRANSCRIPT. Charts: Alpha + Visualizer."},
    {"id": 50, "title": "SI-50: TWICE-WEEKLY SCAN — MONDAY + THURSDAY", "body": "Monday: Full SI-39 + SI-45. Thursday: Brief refresh flagged names. Thu Apr 24 watch: MU, CDNS, CRDO, OXY (Day 2/3 WTI check), NOG, IES.L (LDES announcement?). Dip classification: No fundamental damage + macro driver + no guidance cut → investigate."}
  ],
  "priceVerificationProtocol": {
    "currentPriceUS": "MMD /v2/aggs/ticker/{TICKER}/prev — field 'c'",
    "52wkRangeUS": "EOD:get_us_live_extended_quotes",
    "currentPriceEUUK": "web_fetch Yahoo Finance / Stockopedia",
    "memoryForbidden": "MEMORY ESTIMATES FOR PRICE OR FUNDAMENTAL DATA ARE FORBIDDEN"
  },
  "cDriveProtocol": {
    "confirmed": "2026-04-20 SESSION 25",
    "readAccess": true,
    "writeAccess": true,
    "allowedPaths": ["C:\\Users\\jcadb\\claude-fund"]
  }
};

// ─── REACT COMPONENT ────────────────────────
const COLORS = {
  bg: "#0d1117", card: "#161b22", border: "#30363d", accent: "#58a6ff",
  green: "#3fb950", red: "#f85149", yellow: "#d29922", blue: "#388bfd",
  text: "#c9d1d9", textDim: "#8b949e", textBright: "#f0f6fc",
  purple: "#a371f7"
};

export default function TradingJournal() {
  const [data, setData] = useState(() => {
    try { const s = localStorage.getItem(STORAGE_KEY); return s ? JSON.parse(s) : INITIAL_STATE; } catch { return INITIAL_STATE; }
  });
  const [activeTab, setActiveTab] = useState("positions");
  const [newNote, setNewNote] = useState("");

  useEffect(() => { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch {} }, [data]);
  const update = useCallback((d) => setData(d), []);
  const addNote = () => {
    if (!newNote.trim()) return;
    update({ ...data, sessionNotes: [...(data.sessionNotes || []), { date: new Date().toISOString().slice(0,10), note: newNote }] });
    setNewNote("");
  };

  const tabs = ["positions","orders","thesis","watchlist","instructions","notes"];
  const pnlColor = (v) => v > 0 ? COLORS.green : v < 0 ? COLORS.red : COLORS.textDim;

  return (
    <div style={{ background: COLORS.bg, minHeight: "100vh", color: COLORS.text, fontFamily: "monospace", padding: 16, maxWidth: 1200, margin: "0 auto" }}>
      <style>{`
        .card { background: ${COLORS.card}; border: 1px solid ${COLORS.border}; border-radius: 6px; padding: 12px; }
        .badge { font-size: 10px; padding: 2px 6px; border-radius: 4px; font-weight: 600; display: inline-block; }
        .badge-green { background: rgba(63,185,80,0.15); color: ${COLORS.green}; border: 1px solid rgba(63,185,80,0.3); }
        .badge-red { background: rgba(248,81,73,0.15); color: ${COLORS.red}; border: 1px solid rgba(248,81,73,0.3); }
        .badge-amber { background: rgba(210,153,34,0.15); color: ${COLORS.yellow}; border: 1px solid rgba(210,153,34,0.3); }
        .badge-grey { background: rgba(139,148,158,0.15); color: ${COLORS.textDim}; border: 1px solid rgba(139,148,158,0.3); }
        .badge-blue { background: rgba(56,139,253,0.15); color: ${COLORS.blue}; border: 1px solid rgba(56,139,253,0.3); }
        .badge-purple { background: rgba(163,113,247,0.15); color: ${COLORS.purple}; border: 1px solid rgba(163,113,247,0.3); }
        .btn { background: ${COLORS.card}; border: 1px solid ${COLORS.border}; color: ${COLORS.text}; padding: 6px 12px; border-radius: 4px; cursor: pointer; font-family: monospace; font-size: 12px; }
        .btn:hover { background: #21262d; }
        .btn-primary { background: rgba(88,166,255,0.15); border-color: rgba(88,166,255,0.4); color: ${COLORS.accent}; }
        input { background: ${COLORS.card}; border: 1px solid ${COLORS.border}; color: ${COLORS.text}; padding: 8px; border-radius: 4px; font-family: monospace; font-size: 12px; flex: 1; }
      `}</style>

      <div style={{ marginBottom: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8 }}>
          <div>
            <div style={{ fontSize: 18, fontWeight: 700, color: COLORS.textBright }}>CLAUDE FUND — JOURNAL v37 EOD</div>
            <div style={{ fontSize: 11, color: COLORS.textDim, marginTop: 2 }}>Session {data.sessionNumber} | {data.fund.account} | {data.lastUpdated}</div>
          </div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {[
              { label: "NET LIQ", val: `$${(data.fund.netLiquidity/1000).toFixed(1)}K` },
              { label: "UNREAL", val: `$${(data.fund.unrealizedPnL/1000).toFixed(1)}K`, color: pnlColor(data.fund.unrealizedPnL) },
              { label: "DAY P&L", val: `$${data.fund.dailyPnL.toFixed(0)}`, color: pnlColor(data.fund.dailyPnL) },
              { label: "WTI EOD", val: `$${data.thesis.oilWTI}`, color: COLORS.yellow }
            ].map(m => (
              <div key={m.label} className="card" style={{ textAlign: "center", minWidth: 80 }}>
                <div style={{ fontSize: 9, color: COLORS.textDim }}>{m.label}</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: m.color || COLORS.textBright, marginTop: 2 }}>{m.val}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ marginTop: 6, padding: "6px 10px", background: "rgba(248,81,73,0.1)", border: "1px solid rgba(248,81,73,0.3)", borderRadius: 4, fontSize: 11, color: COLORS.red }}>
          ⚠️ CEASEFIRE EXPIRES TOMORROW — ISRG EARNINGS TONIGHT 00:30 UAE — RR.L EX-DIV TOMORROW — AMZN EARNINGS WED AMC
        </div>
        <div style={{ marginTop: 4, padding: "6px 10px", background: "rgba(63,185,80,0.1)", border: "1px solid rgba(63,185,80,0.3)", borderRadius: 4, fontSize: 11, color: COLORS.green }}>
          ✅ WTI $88.36 +6.99% | ✅ NOG stop $22.50 live | ✅ AMPX +6.70% | ✅ IES.L 3,000sh filled
        </div>
        <div style={{ marginTop: 4, padding: "6px 10px", background: "rgba(210,153,34,0.1)", border: "1px solid rgba(210,153,34,0.3)", borderRadius: 4, fontSize: 11, color: COLORS.yellow }}>
          ⚠️ E15: AIM stops not supported on IBKR — IES.L manual alert 12.5p only | ABVX below cost $117.19 vs $117.91 (intentional)
        </div>
      </div>

      <div style={{ display: "flex", gap: 4, marginBottom: 12, flexWrap: "wrap" }}>
        {tabs.map(t => (
          <button key={t} className={`btn ${activeTab === t ? "btn-primary" : ""}`} onClick={() => setActiveTab(t)} style={{ textTransform: "uppercase", fontSize: 11 }}>{t}</button>
        ))}
      </div>

      {activeTab === "positions" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {data.positions?.map((p) => (
            <div key={p.ticker} className="card" style={{
              borderLeft: p.status?.includes("EX-DIV") ? `3px solid ${COLORS.yellow}` :
                          p.status?.includes("BELOW COST") ? `3px solid ${COLORS.red}` :
                          p.status?.includes("EARNINGS") ? `3px solid ${COLORS.purple}` :
                          p.ticker === "IES" ? `3px solid ${COLORS.purple}` : undefined
            }}>
              <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap", marginBottom: 6 }}>
                <span style={{ fontWeight: 700, fontSize: 14, color: COLORS.textBright }}>{p.ticker}</span>
                <span style={{ fontSize: 11, color: COLORS.textDim }}>{p.name}</span>
                {p.cur && <span className="badge badge-grey">{p.cur}</span>}
                {p.ticker === "IES" && <span className="badge badge-purple">NEW S25</span>}
                {p.ticker === "AMPX" && <span className="badge badge-green">+6.70% TODAY</span>}
                <span className={`badge ${p.unrealPnL > 50 ? "badge-green" : p.unrealPnL < -10 ? "badge-red" : "badge-amber"}`}>
                  {p.unrealPnL >= 0 ? "+" : ""}{p.unrealPct?.toFixed(1)}%
                </span>
                <span className={`badge ${p.status?.includes("EX-DIV") ? "badge-amber" : p.status?.includes("BELOW") ? "badge-red" : "badge-grey"}`}>{p.status?.substring(0,45)}</span>
              </div>
              <div style={{ display: "flex", gap: 16, flexWrap: "wrap", fontSize: 11, marginBottom: 6 }}>
                <span>Shares: <b>{p.shares}</b></span>
                <span>Avg: <b>{p.avgPrice}</b></span>
                <span>Last: <b>{p.last}</b></span>
                <span>P&L: <b style={{ color: pnlColor(p.unrealPnL) }}>{p.unrealPnL >= 0 ? "+" : ""}{p.unrealPnL?.toFixed(0)}</b></span>
                {(p.stop || p.stopAlert) && <span>Stop: <b style={{ color: COLORS.yellow }}>{p.stop || p.stopType}</b></span>}
                {p.target && <span>Target: <b style={{ color: COLORS.blue }}>{p.target}</b></span>}
              </div>
              <div style={{ fontSize: 10, color: COLORS.textDim }}>{p.note}</div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "orders" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {data.pendingOrders?.map((o, i) => (
            <div key={i} className="card" style={{ borderLeft: `3px solid ${o.type === "MANUAL ALERT" ? COLORS.yellow : o.action === "BUY" ? COLORS.green : COLORS.red}` }}>
              <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap", marginBottom: 4 }}>
                <span style={{ fontWeight: 700 }}>{o.ticker}</span>
                <span className={`badge ${o.action === "BUY" ? "badge-green" : "badge-red"}`}>{o.action}</span>
                <span className={`badge ${o.type === "MANUAL ALERT" ? "badge-amber" : "badge-grey"}`}>{o.type}</span>
                <span style={{ fontSize: 11 }}>Qty: <b>{o.qty}</b></span>
                {o.limitPrice && <span style={{ fontSize: 11 }}>Limit: <b>{o.limitPrice}</b></span>}
                {o.stopPrice && <span style={{ fontSize: 11 }}>Stop: <b>{o.stopPrice}</b></span>}
                {o.alertPrice && <span style={{ fontSize: 11 }}>Alert: <b>{o.alertPrice}</b></span>}
                <span className={`badge ${o.status?.includes("MANUAL") ? "badge-amber" : o.status?.includes("ACTIVE") || o.status?.includes("SUBMITTED") ? "badge-green" : "badge-grey"}`}>{o.status?.substring(0,40)}</span>
              </div>
              {o.note && <div style={{ fontSize: 10, color: COLORS.textDim }}>{o.note}</div>}
            </div>
          ))}
        </div>
      )}

      {activeTab === "thesis" && (
        <div>
          <div className="card" style={{ marginBottom: 12, borderColor: COLORS.red, borderLeftWidth: 3 }}>
            <div style={{ fontWeight: 700, color: COLORS.red, marginBottom: 8 }}>{data.thesis.title}</div>
            <div style={{ fontSize: 12, color: COLORS.text, lineHeight: 1.8 }}>{data.thesis.summary}</div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 12 }}>
            <div className="card" style={{ borderColor: "rgba(248,81,73,0.4)" }}>
              <div style={{ fontSize: 10, color: COLORS.red }}>HORMUZ — CLOSED</div>
              <div style={{ marginTop: 6, fontSize: 12, color: COLORS.red, lineHeight: 1.6 }}>{data.thesis.hormuzStatus}</div>
            </div>
            <div className="card" style={{ borderColor: "rgba(210,153,34,0.3)" }}>
              <div style={{ fontSize: 10, color: COLORS.yellow }}>SI-25 — NOT TRIGGERED</div>
              <div style={{ marginTop: 6, fontSize: 11, color: COLORS.yellow, lineHeight: 1.6 }}>{data.thesis.ceasefireFilter}</div>
            </div>
          </div>
          <div style={{ fontSize: 12, fontWeight: 600, color: COLORS.accent, marginBottom: 8 }}>KEY DATES</div>
          {data.thesis.keyDates?.map((d, i) => (
            <div key={i} className="card" style={{ marginBottom: 6, borderLeft: `3px solid ${d.priority === "CRITICAL" ? COLORS.red : COLORS.yellow}` }}>
              <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <span style={{ fontSize: 11, fontWeight: 600, minWidth: 130, color: COLORS.textBright }}>{d.date}</span>
                <span style={{ fontSize: 11, color: COLORS.textDim, flex: 1 }}>{d.event}</span>
                <span className={`badge ${d.priority === "CRITICAL" ? "badge-red" : "badge-amber"}`}>{d.priority}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "watchlist" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ fontWeight: 600, color: COLORS.accent, fontSize: 12, marginBottom: 4 }}>US WATCHLIST</div>
          {data.watchlistUS?.map((w) => (
            <div key={w.ticker} className="card">
              <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap", marginBottom: 6 }}>
                <span style={{ fontWeight: 700 }}>{w.ticker}</span>
                <span style={{ fontSize: 12, color: COLORS.textDim }}>{w.name}</span>
                <span className={`badge ${w.status?.includes("CONFIRMED") || w.status?.includes("ACTIVE") ? "badge-green" : w.status?.includes("CONDITIONAL") || w.status?.includes("MONITOR") ? "badge-amber" : "badge-grey"}`}>{w.status?.substring(0,45)}</span>
              </div>
              <div style={{ fontSize: 11, color: COLORS.textDim }}>{w.note}</div>
            </div>
          ))}
          <div style={{ fontWeight: 600, color: COLORS.accent, fontSize: 12, marginTop: 8, marginBottom: 4 }}>EU / UK WATCHLIST</div>
          {data.watchlistEU?.map(w => (
            <div key={w.ticker} className="card" style={{ borderLeft: w.status?.includes("IN PORTFOLIO") ? `3px solid ${COLORS.green}` : undefined }}>
              <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap", marginBottom: 4 }}>
                <span style={{ fontWeight: 700 }}>{w.ticker}</span>
                <span style={{ fontSize: 12, color: COLORS.textDim }}>{w.name}</span>
                <span className="badge badge-grey">{w.exchange}</span>
                {w.current && <span style={{ fontSize: 12 }}>{w.current} {w.cur}</span>}
                {w.status?.includes("IN PORTFOLIO") && <span className="badge badge-green">IN PORTFOLIO</span>}
              </div>
              <div style={{ fontSize: 11, color: COLORS.textDim }}>{w.note}</div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "instructions" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {data.standingInstructions?.map(ins => (
            <div key={ins.id} className="card" style={{ display: "flex", gap: 12, borderLeft: ins.id === 17 ? `3px solid ${COLORS.red}` : ins.id === 50 ? `3px solid ${COLORS.green}` : ins.id === 48 ? `3px solid ${COLORS.purple}` : undefined }}>
              <div style={{ fontSize: 11, color: ins.id === 17 ? COLORS.red : ins.id === 50 ? COLORS.green : ins.id === 48 ? COLORS.purple : COLORS.accent, fontWeight: 700, minWidth: 28 }}>#{ins.id.toString().padStart(2,"0")}</div>
              <div>
                <div style={{ fontWeight: 600, color: COLORS.textBright, marginBottom: 4, fontSize: 12 }}>{ins.title}</div>
                <div style={{ fontSize: 11, color: COLORS.textDim, lineHeight: 1.6, whiteSpace: "pre-wrap" }}>{ins.body}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "notes" && (
        <div>
          <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
            <input value={newNote} onChange={e => setNewNote(e.target.value)} placeholder="Add session note..." onKeyDown={e => e.key === "Enter" && !e.shiftKey && addNote()} />
            <button className="btn btn-primary" onClick={addNote}>ADD</button>
          </div>
          {(data.sessionNotes || []).slice().reverse().map((n, i) => (
            <div key={i} className="card" style={{ marginBottom: 8 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ fontSize: 10, color: COLORS.textDim }}>{n.date}</span>
                <button className="btn" style={{ padding: "2px 8px", fontSize: 10, background: "rgba(239,68,68,0.15)", color: "#ef4444", border: "1px solid rgba(239,68,68,0.3)" }} onClick={() => { const rev = [...data.sessionNotes].reverse(); rev.splice(i,1); update({ ...data, sessionNotes: rev.reverse() }); }}>DEL</button>
              </div>
              <div style={{ fontSize: 12, color: COLORS.text, lineHeight: 1.7 }}>{n.note}</div>
            </div>
          ))}
        </div>
      )}

      <div style={{ marginTop: 24, paddingTop: 12, borderTop: `1px solid ${COLORS.border}`, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <span style={{ fontSize: 10, color: COLORS.textDim }}>JOURNAL v37 EOD // SESSION 25 // {data.fund.account} // NL $104.8K // E15 AIM STOP LIMITATION</span>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <span className="badge badge-green">NOG STOP LIVE</span>
          <span className="badge badge-red">CEASEFIRE EXPIRES TUE</span>
          <span className="badge badge-red">ISRG EARNINGS TONIGHT</span>
          <span className="badge badge-amber">RR EX-DIV TOMORROW</span>
          <span className="badge badge-amber">IES ALERT 12.5p E15</span>
          <span className="badge badge-green">WTI $88.36 +7%</span>
          <span className="badge badge-green">AMPX +6.7%</span>
          <span className="badge badge-green">SI-50 ACTIVE</span>
        </div>
      </div>
    </div>
  );
}
