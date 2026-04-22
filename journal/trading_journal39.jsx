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
//
// ═══════════════════════════════════════════════════════════════════
// TIMEZONE REFERENCE — MANDATORY CHECK BEFORE ANY MARKET STATUS CALL
// Dubai = UTC+4 year-round (no DST)
// NYSE: opens 17:30 UAE / closes 00:00 UAE (EDT Mar-Nov, UTC-4, diff +8)
// LSE:  opens 12:00 UAE / closes 19:30 UAE (BST Mar-Oct, UTC+1, diff +3)
// XETRA/BVME: opens 11:00 UAE / closes 19:00 UAE (CEST Mar-Oct, UTC+2, diff +2)
// PROCEDURE: State UAE time. Is it before close? Then OPEN. Compute — never recall.
// ═══════════════════════════════════════════════════════════════════

const INITIAL_STATE = {
  "lastUpdated": "2026-04-22 SESSION 27 CLOSE — JOURNAL v39",
  "sessionNumber": 27,
  "fund": {
    "account": "U24936508",
    "netLiquidity": 105400,
    "cash": 30120,
    "availableFunds": 83000,
    "dailyPnL": 1601.80,
    "dailyPnLPct": 1.54,
    "unrealizedPnL": 7885.77,
    "realizedPnL": -70.72,
    "broker": "IBKR Pro",
    "baseCurrency": "USD",
    "location": "UAE",
    "ibkrEuropeanAccess": "APPROVED — March 26 2026",
    "cashBase": 30120,
    "cashUSD": 34775,
    "cashEUR": -2904,
    "cashGBP": -923,
    "cashFloorRule": "10% of NL = $10,540 minimum. NEVER go below.",
    "deployableCash": 19580,
    "deployableCashNote": "cashBase $30,120 minus floor $10,540 = ~$19,580 gross (before FX deficit reconciliation)",
    "lastUpdated": "2026-04-22 SESSION 27 CLOSE. NL $105.4K. Daily P&L +$1,601.80 (+1.54%). ISRG +8.46% post Q1 beat — stop raised $447.31→$468. ABBV filled $205.17. RR.L stopped out 1150p (−£49.35), re-entry BUY 1120p GTC placed. E1 timezone error fixed permanently in LESSONS_LEARNED. AMZN earnings April 29 (NOT tonight). LRCX Q3 reporting after 00:00 UAE tonight.",
    "note": "JOURNAL v39 SESSION 27 (Wednesday 22 Apr 2026). NL $105.4K new high. 17 positions. ISRG stop $468 after 8.46% earnings surge. ABBV new position $205.17. RR.L re-entry pending 1120p. Nuclear thesis building (CCJ +3.94%). E1 TIMEZONE BUG FIXED — NYSE opens 17:30 UAE, closes 00:00 UAE."
  },
  "thesis": {
    "title": "CEASEFIRE EXTENDED INDEFINITELY — HORMUZ BLOCKED — NUCLEAR SURGE — EARNINGS WEEK",
    "summary": "Trump extended ceasefire indefinitely pending Iranian proposal. Hormuz blockade continues. WTI ~$87-88 range. NOG/CODA/ITM theses intact. ISRG Q1 massive beat (+18.7% EPS). CCJ +3.94% nuclear thesis building. LRCX Q3 reporting tonight after 00:00 UAE. AMZN/MSFT/GOOGL earnings April 29.",
    "oilWTI": 87.5,
    "oilWTINote": "WTI ~$87.51 close Apr 22 (down 4% from $92.13 — ceasefire extension repriced). Blockade continues. SI-25 trigger $100.38 NOT triggered.",
    "hormuzStatus": "BLOCKED. Ceasefire extended indefinitely by Trump Apr 22 pending Iranian proposal. US naval blockade continues. NOG/CODA thesis intact.",
    "ceasefireFilter": "SI-25 WATCH. WTI ~$87.51 vs trigger $100.38. NOT TRIGGERED. Ceasefire extended indefinitely.",
    "keyDates": [
      {"date": "Tonight after 00:00 UAE", "event": "LRCX Q3 FY26 results — consensus $1.36 EPS / $5.73B rev. Beat + dip ≥−5% Thursday open → BUY limit $245 / stop $220 / 10sh", "priority": "CRITICAL"},
      {"date": "Thu Apr 23", "event": "BKR Q1 earnings — BUY $58.50 GTC active. Check result.", "priority": "HIGH"},
      {"date": "Mon Apr 27 AMC", "event": "CDNS Q1 — watch for SI-39 dip entry ≥−7% post-print (~$305)", "priority": "HIGH"},
      {"date": "Tue Apr 28", "event": "V earnings — BUY $307 GTC active", "priority": "HIGH"},
      {"date": "Tue Apr 29 AMC", "event": "AMZN Q1 — AWS growth key. Beat → raise stop $242-245. Strong beat → consider +10sh.", "priority": "CRITICAL"},
      {"date": "Tue Apr 29 AMC", "event": "MSFT Q3 — Azure growth key. Stop $400.43.", "priority": "CRITICAL"},
      {"date": "Tue Apr 29 AMC", "event": "GOOGL Q1 — BUY $315 GTC active. Earnings Apr 29.", "priority": "CRITICAL"},
      {"date": "Wed Apr 30", "event": "NOG Q1 at WTI war-premium levels.", "priority": "HIGH"},
      {"date": "IMMINENT", "event": "IES.L LDES Initial Decision List — binary catalyst. Stock +4.12% today.", "priority": "CRITICAL"},
      {"date": "May 5", "event": "LDO.MI Q1 — first earnings post-entry.", "priority": "HIGH"},
      {"date": "May 6", "event": "R3NK Q1 — €200M deferred orders must appear.", "priority": "HIGH"},
      {"date": "May 7", "event": "AMPX Q1. Stop $17.53.", "priority": "HIGH"},
      {"date": "After May 17", "event": "MU entry window opens — $440-445 / stop $420 / 14sh.", "priority": "CRITICAL"},
      {"date": "Mid-May", "event": "SNPS Q2 — margin recovery >20% = entry signal.", "priority": "CRITICAL"},
      {"date": "~May 2026", "event": "CGCT business combination close → FAC listing.", "priority": "HIGH"},
      {"date": "Jul 1", "event": "MU Q3 FY26 earnings AMC.", "priority": "HIGH"},
      {"date": "Jul 30", "event": "RR.L H1 2026 results.", "priority": "HIGH"}
    ]
  },
  "positions": [
    {
      "ticker": "ITM", "name": "ITM Power PLC", "shares": 2000, "avgPrice": 65.1, "costBasis": 1302,
      "last": 140.00, "marketVal": 2800, "unrealPnL": 1498, "unrealPct": 115.1,
      "stop": 120, "stopType": "Stop Limit", "stopLimit": 118, "target": 175,
      "status": "HOLD — STOP LIMIT 120p/118p GTC", "cur": "GBP",
      "note": "Rheinmetall Giga PtX NATO deal. +115.1%. Target 175p/200p stretch. At 150p: raise stop to 130p."
    },
    {
      "ticker": "AMZN", "name": "Amazon.com Inc", "shares": 30, "avgPrice": 201.204, "costBasis": 6036,
      "last": 253.24, "marketVal": 7597, "unrealPnL": 1562, "unrealPct": 25.9,
      "stop": 234.39, "stopType": "Stop Limit", "stopLimit": 224, "target": 300,
      "status": "HOLD — EARNINGS APR 29 AMC", "note": "Stop $234.39/$224 GTC. Q1 earnings APRIL 29 (NOT tonight). Beat + AWS strong → raise stop $242-245."
    },
    {
      "ticker": "CCJ", "name": "Cameco Corp", "shares": 49, "avgPrice": 104.021, "costBasis": 5097,
      "last": 121.20, "marketVal": 5939, "unrealPnL": 842, "unrealPct": 16.5,
      "stop": 108.37, "target": 136,
      "status": "HOLD — NUCLEAR THESIS BUILDING", "note": "India LTA $2.6B signed. US DOE loans for first 5-10 reactors confirmed. Uranium $85/lb structural floor. CCJ +3.94% today. Analyst target $136."
    },
    {
      "ticker": "MSFT", "name": "Microsoft Corp", "shares": 25, "avgPrice": 372.77, "costBasis": 9319,
      "last": 431.00, "marketVal": 10775, "unrealPnL": 1456, "unrealPct": 15.6,
      "stop": 400.43, "target": 450,
      "status": "HOLD — EARNINGS APR 29 AMC", "note": "Azure + Copilot intact. Q3 earnings April 29. Stop $400.43."
    },
    {
      "ticker": "AMPX", "name": "Amprius Technologies", "shares": 168, "avgPrice": 18.106, "costBasis": 3042,
      "last": 21.31, "marketVal": 3580, "unrealPnL": 532, "unrealPct": 17.5,
      "stop": 17.53, "target": 32,
      "status": "HOLD — STOP $17.53 GTC (S27 raise)", "note": "Stop raised $16.89→$17.53 intra-session S27. Q1 May 7."
    },
    {
      "ticker": "CRML", "name": "Critical Metals Corp", "shares": 110, "avgPrice": 9.08, "costBasis": 999,
      "last": 10.88, "marketVal": 1197, "unrealPnL": 198, "unrealPct": 19.8,
      "stop": 8.34, "target": 15,
      "status": "HOLD — STOP $8.34 GTC — WATCH $10 CEILING", "note": "$60M placement at $10. Watch $10 as institutional ceiling. Re-entry only at $9.80-10.00 after overhang clears. Thesis intact."
    },
    {
      "ticker": "NOG", "name": "Northern Oil and Gas Inc", "shares": 80, "avgPrice": 24.383, "costBasis": 1951,
      "last": 26.09, "marketVal": 2087, "unrealPnL": 137, "unrealPct": 7.0,
      "stop": 22.50, "target": null,
      "status": "HOLD — STOP $22.50 GTC (ID 133934373)", "note": "WTI $87.51. Ceasefire extended indefinitely, blockade continues. Thesis intact. Q1 Apr 30."
    },
    {
      "ticker": "VST", "name": "Vistra Corp", "shares": 53, "avgPrice": 150.569, "costBasis": 7980,
      "last": 155.31, "marketVal": 8231, "unrealPnL": 246, "unrealPct": 3.1,
      "stop": 151.50, "target": null,
      "status": "HOLD — TIGHT STOP 2.5% CLEARANCE", "note": "Stop $151.50 at 2.5% clearance. VRT/GEV printed today — check results. Do not move stop preemptively."
    },
    {
      "ticker": "R3NK", "name": "RENK Group AG", "shares": 25, "avgPrice": 52.27, "costBasis": 1307,
      "last": 55.51, "marketVal": 1388, "unrealPnL": 82, "unrealPct": 6.2,
      "stop": 48, "stopType": "Stop Limit", "stopLimit": 47, "target": 76,
      "status": "HOLD — STOP LIMIT €48/€47 GTC", "cur": "EUR", "note": "Q1 May 6. €200M deferred orders must appear."
    },
    {
      "ticker": "PDYN", "name": "Palladyne AI Corp", "shares": 250, "avgPrice": 6.595, "costBasis": 1649,
      "last": 6.83, "marketVal": 1708, "unrealPnL": 56, "unrealPct": 3.4,
      "stop": 5.75, "target": null,
      "status": "HOLD — STOP LIVE", "note": "May 13 earnings."
    },
    {
      "ticker": "CODA", "name": "Coda Octopus Group Inc", "shares": 416, "avgPrice": 12.005, "costBasis": 4994,
      "last": 12.30, "marketVal": 5117, "unrealPnL": 89, "unrealPct": 1.8,
      "stop": 11.51, "target": 22,
      "status": "HOLD — MINE CLEARANCE MULTI-YEAR", "note": "Hormuz blockade continues. Mine clearance thesis intact."
    },
    {
      "ticker": "IES", "name": "Invinity Energy Systems PLC", "shares": 3000, "avgPrice": 17.49, "costBasis": 525,
      "last": 17.70, "marketVal": 531, "unrealPnL": 6, "unrealPct": 1.2,
      "stop": null, "stopType": "MANUAL ALERT 12.5p", "target": 45,
      "status": "HOLD — MANUAL ALERT 12.5p — LDES DECISION IMMINENT", "cur": "GBP",
      "note": "+4.12% today. No confirmed RNS catalyst — likely anticipatory buying ahead of LDES Cap & Floor decision. E15: no IBKR stops for AIM."
    },
    {
      "ticker": "ISRG", "name": "Intuitive Surgical Inc", "shares": 22, "avgPrice": 459.246, "costBasis": 10104,
      "last": 489.47, "marketVal": 10768, "unrealPnL": 669, "unrealPct": 6.6,
      "stop": 468.00, "target": 598,
      "status": "HOLD — STOP RAISED $447.31→$468 S27", "note": "Q1 MASSIVE BEAT: EPS $2.50 vs $2.11 (+18.7%), rev $2.77B vs $2.62B. Procedures +17%. Guidance raised. +8.46% today. Stop raised to $468 (below today open $469.05). Analyst median target $598-610."
    },
    {
      "ticker": "LLY", "name": "Eli Lilly and Company", "shares": 3, "avgPrice": 905.344, "costBasis": 2716,
      "last": 920.91, "marketVal": 2763, "unrealPnL": 46, "unrealPct": 1.7,
      "stop": 850, "target": 1028,
      "status": "HOLD — STOP $850 GTC", "note": "GLP-1 intact."
    },
    {
      "ticker": "CGCT", "name": "Cartesian Growth Corp III (Factorial Energy SPAC)", "shares": 291, "avgPrice": 10.295, "costBasis": 2996,
      "last": 10.29, "marketVal": 2994, "unrealPnL": -1, "unrealPct": -0.0,
      "stop": null, "target": null,
      "status": "HOLD — NO STOP (TRUST FLOOR ~$10.27)", "note": "Deal close ~May 2026."
    },
    {
      "ticker": "ABBV", "name": "AbbVie Inc", "shares": 20, "avgPrice": 205.17, "costBasis": 4104,
      "last": 204.05, "marketVal": 4081, "unrealPnL": -22, "unrealPct": -0.5,
      "stop": 192.00, "target": 249,
      "status": "HOLD — NEW S27 — STOP $192 GTC (OCA 384334982)", "note": "NEW S27. Filled market $205.17 at 17:30:01 UAE. 13.92x fwd PE. EPS +45% to $14.54 in 2026. Skyrizi+Rinvoq $31B combined. $18.5B FCF. Q1 earnings ~Apr 28. Target $249 analyst consensus."
    },
    {
      "ticker": "LDO", "name": "Leonardo SpA", "shares": 35, "avgPrice": 56.086, "costBasis": 1963,
      "last": 54.79, "marketVal": 1918, "unrealPnL": -46, "unrealPct": -2.3,
      "stop": 50, "target": 76,
      "status": "HOLD — STOP €50 GTC", "cur": "EUR",
      "note": "Day 3. Minor rotation weakness, no news. Defence thesis intact. Q1 May 5."
    }
  ],
  "pendingOrders": [
    {"ticker": "GOOGL", "action": "BUY", "type": "Limit", "qty": 10, "limitPrice": 315, "tif": "GTC", "status": "ACTIVE", "note": "SI-39 -21% from ATH. Earnings Apr 29. Stop $285 OCA."},
    {"ticker": "GOOGL", "action": "SELL", "type": "Stop", "qty": 10, "stopPrice": 285, "tif": "GTC", "status": "ACTIVE — OCA"},
    {"ticker": "BKR", "action": "BUY", "type": "Limit", "qty": 8, "limitPrice": 58.50, "tif": "GTC", "status": "ACTIVE", "note": "Energy services Hormuz. Earnings Apr 23."},
    {"ticker": "BKR", "action": "SELL", "type": "Stop", "qty": 8, "stopPrice": 53.50, "tif": "GTC", "status": "ACTIVE — OCA"},
    {"ticker": "RR", "action": "BUY", "type": "Limit", "qty": 100, "limitPrice": 1120, "tif": "GTC", "status": "ACTIVE — NOT YET FILLED (price ~1160p)", "cur": "GBP", "note": "Re-entry S27. P11 compliant (below 1150p stop-out). Wylfa SMR contract, naval nuclear, defence."},
    {"ticker": "RR", "action": "SELL", "type": "Stop", "qty": 100, "stopPrice": 1050, "tif": "GTC", "status": "ACTIVE — OCA with buy", "cur": "GBP"},
    {"ticker": "NOG", "action": "SELL", "type": "Stop", "qty": 80, "stopPrice": 22.50, "tif": "GTC", "status": "ACTIVE — ID 133934373"},
    {"ticker": "CRML", "action": "SELL", "type": "Stop", "qty": 110, "stopPrice": 8.34, "tif": "GTC", "status": "ACTIVE"},
    {"ticker": "LLY", "action": "SELL", "type": "Stop", "qty": 3, "stopPrice": 850, "tif": "GTC", "status": "ACTIVE"},
    {"ticker": "V", "action": "BUY", "type": "Limit", "qty": 8, "limitPrice": 307, "tif": "GTC", "status": "ACTIVE", "note": "SI-39. Earnings Apr 28."},
    {"ticker": "V", "action": "SELL", "type": "Stop", "qty": 8, "stopPrice": 285, "tif": "GTC", "status": "ACTIVE — OCA"},
    {"ticker": "MP", "action": "BUY", "type": "Limit", "qty": 75, "limitPrice": 55, "tif": "GTC", "status": "ACTIVE"},
    {"ticker": "MP", "action": "SELL", "type": "Stop", "qty": 75, "stopPrice": 50, "tif": "GTC", "status": "ACTIVE"},
    {"ticker": "LDO", "action": "SELL", "type": "Stop", "qty": 35, "stopPrice": 50, "tif": "GTC", "status": "ACTIVE", "cur": "EUR"},
    {"ticker": "ITM", "action": "SELL", "type": "Stop Limit", "qty": 2000, "stopPrice": 120, "limitPrice": 118, "tif": "GTC", "status": "ACTIVE"},
    {"ticker": "R3NK", "action": "SELL", "type": "Stop Limit", "qty": 25, "stopPrice": 48, "limitPrice": 47, "tif": "GTC", "status": "ACTIVE"},
    {"ticker": "AMZN", "action": "SELL", "type": "Stop Limit", "qty": 30, "limitPrice": 224, "stopPrice": 234.39, "tif": "GTC", "status": "ACTIVE — EARNINGS APR 29"},
    {"ticker": "MSFT", "action": "SELL", "type": "Stop", "qty": 25, "stopPrice": 400.43, "tif": "GTC", "status": "ACTIVE"},
    {"ticker": "ISRG", "action": "SELL", "type": "Stop", "qty": 22, "stopPrice": 468.00, "tif": "GTC", "status": "ACTIVE — RAISED S27 from $447.31"},
    {"ticker": "VST", "action": "SELL", "type": "Stop", "qty": 53, "stopPrice": 151.50, "tif": "GTC", "status": "ACTIVE — TIGHT"},
    {"ticker": "CCJ", "action": "SELL", "type": "Stop", "qty": 49, "stopPrice": 108.37, "tif": "GTC", "status": "ACTIVE"},
    {"ticker": "PDYN", "action": "SELL", "type": "Stop", "qty": 250, "stopPrice": 5.75, "tif": "GTC", "status": "ACTIVE"},
    {"ticker": "AMPX", "action": "SELL", "type": "Stop", "qty": 168, "stopPrice": 17.53, "tif": "GTC", "status": "ACTIVE — RAISED S27"},
    {"ticker": "AMPX", "action": "SELL", "type": "Limit", "qty": 168, "limitPrice": 32, "tif": "GTC", "status": "ACTIVE"},
    {"ticker": "CODA", "action": "SELL", "type": "Stop", "qty": 416, "stopPrice": 11.51, "tif": "GTC", "status": "ACTIVE"},
    {"ticker": "ABBV", "action": "SELL", "type": "Stop", "qty": 20, "stopPrice": 192.00, "tif": "GTC", "status": "ACTIVE — OCA 384334982"}
  ],
  "watchlistUS": [
    {"ticker": "LRCX", "name": "Lam Research Corp", "status": "EARNINGS TONIGHT — CONDITIONAL ENTRY", "note": "Q3 FY26 reporting after 00:00 UAE. Consensus $1.36 EPS / $5.73B rev. Beat + dip ≥−5% Thursday open (≤$245.45) → limit $245 / stop $220 / 10sh. Check analyst upgrades first."},
    {"ticker": "GOOGL", "name": "Alphabet Inc", "status": "ACTIVE — BUY $315 GTC", "note": "SI-39 -21% from ATH. Earnings Apr 29."},
    {"ticker": "BKR", "name": "Baker Hughes", "status": "ACTIVE — BUY $58.50 GTC", "note": "Hormuz energy services. Earnings Apr 23."},
    {"ticker": "V", "name": "Visa Inc", "status": "ACTIVE — BUY $307 GTC", "note": "SI-39. Earnings Apr 28."},
    {"ticker": "MU", "name": "Micron Technology", "status": "STAGE 2 CONFIRMED — WAIT SI-41 (after May 17)", "note": "Entry $440-445 / stop $420 / 14sh."},
    {"ticker": "SNPS", "name": "Synopsys", "status": "MONITOR — MID-MAY EARNINGS", "note": "Entry only if margin recovery >20%."},
    {"ticker": "CDNS", "name": "Cadence Design Systems", "status": "WATCH — EARNINGS APR 27 AMC", "note": "SI-39 trigger $301.16. Dip ≥−7% post-print = entry ~$305."},
    {"ticker": "CEG", "name": "Constellation Energy", "status": "STAGE 2 PRIORITY — MONDAY S28", "note": "24.58x fwd PE, $401 target, −18% YTD. Largest US nuclear operator. Microsoft/Meta PPAs. Research Monday."},
    {"ticker": "MRVL", "name": "Marvell Technology", "status": "STAGE 1 — MONDAY S28", "note": "AI networking gap. Custom ASIC + 800G Ethernet."},
    {"ticker": "TLN", "name": "Talen Energy Corp", "status": "WATCH — POST MAY 5 ONLY"},
    {"ticker": "CRDO", "name": "Credo Technology", "status": "CONDITIONAL — WAIT $140-145"},
    {"ticker": "OXY", "name": "Occidental Petroleum", "status": "CONDITIONAL — WTI $90+ THREE DAYS"}
  ],
  "watchlistEU": [
    {"ticker": "IES.L", "name": "Invinity Energy Systems PLC", "status": "IN PORTFOLIO — E15 MANUAL 12.5p", "note": "+4.12% today. LDES decision IMMINENT."},
    {"ticker": "ITM.L", "name": "ITM Power PLC", "status": "IN PORTFOLIO — Stop 120p/118p", "note": "Rheinmetall NATO. +115.1%. Target 175p."},
    {"ticker": "RR.L", "name": "Rolls-Royce Holdings", "status": "BUY 1120p GTC PENDING", "note": "Re-entry S27. Stop 1050p. Wylfa SMR + naval nuclear + civil aero. H1 results Jul 30."},
    {"ticker": "R3NK", "name": "RENK Group AG", "status": "IN PORTFOLIO", "note": "Q1 May 6."},
    {"ticker": "LDO.MI", "name": "Leonardo SpA", "status": "IN PORTFOLIO — Stop €50", "note": "Day 3. Q1 May 5."},
    {"ticker": "ENGIE.PA", "name": "Engie SA", "status": "STAGE 1 — MONDAY S28", "note": "EU nuclear/LNG. Belgian fleet extended. ~12-14x fwd PE estimate. Best EU energy value play."},
    {"ticker": "ENR.DE", "name": "Siemens Energy AG", "status": "SKIP — AWAIT -20% CORRECTION (~€115)", "note": "+200% in 1yr, fwd PE 36x, at analyst targets. Add to SI-39 at €115."}
  ],
  "sessionNotes": [
    {"date": "2026-04-18", "note": "SESSION 23 — LNG stopped. NOG filled. ITM trim. Journal v32."},
    {"date": "2026-04-19", "note": "SESSION 24 — Hormuz re-closed. NOG sell cancelled. SI-47/48/49. AI thesis Stage 1. Journal v35."},
    {"date": "2026-04-20", "note": "SESSION 25 — IES.L filled 17.39p. NOG stop $22.50 live. WTI $88.36. Journal v37."},
    {"date": "2026-04-21", "note": "SESSION 26 — ABVX stopped -$158. LDO filled. ITM stop 120p. CRML add cancelled. GOOGL+BKR live. SI-51 v2. POET qualified. SI-52. Journal v38."},
    {"date": "2026-04-22", "note": "SESSION 27 — RR.L stopped 1150p (−£49.35, macro noise, thesis intact). RR.L re-entry BUY 1120p GTC placed. ABBV BUY 20sh filled $205.17. ISRG Q1 massive beat: EPS $2.50 vs $2.11 (+18.7%), stock +8.46% to $489.47, stop raised $447.31→$468. CCJ +3.94% nuclear thesis building. AMZN earnings April 29 (NOT tonight — earlier error corrected). LRCX Q3 reporting tonight after 00:00 UAE. E1 timezone error PERMANENTLY fixed in LESSONS_LEARNED. Energy/Nuclear thesis written to AI_INFRASTRUCTURE_THESIS.md: CEG/MRVL/ENGIE.PA for Stage 2 Monday. SI-53 (nuclear scan) + SI-54 (AI networking) added. Daily P&L +$1,601.80 (+1.54%). NL $105.4K new high."}
  ],
  "tradeTracker": {
    "pendingRows": [
      {"id": 1, "ticker": "AVAV", "shares": 25, "entryPrice": 195.09, "exitPrice": 197.945, "pnl": "+$71.38", "session": "S20"},
      {"id": 2, "ticker": "ITM TRIM", "shares": 1100, "entryPrice": "65.1p", "exitPrice": "124.60p", "pnl": "+£652", "session": "S22"},
      {"id": 3, "ticker": "LNG", "shares": 19, "entryPrice": 268.76, "exitPrice": 248.00, "pnl": "-$396.54", "session": "S23"},
      {"id": 4, "ticker": "PATK", "shares": 25, "entryPrice": 108.80, "exitPrice": 109.256, "pnl": "+$9.34", "session": "S23"},
      {"id": 5, "ticker": "NOG", "note": "Market sell cancelled S24 — position held", "session": "S24"},
      {"id": 6, "ticker": "ABVX", "shares": 44, "entryPrice": 117.913, "exitPrice": 114.31, "pnl": "-$158.53", "session": "S26", "note": "P4 stop executed cleanly."},
      {"id": 7, "ticker": "RR", "shares": 150, "entryPrice": "1182.9p", "exitPrice": "1150p", "pnl": "-£49.35", "session": "S27", "cur": "GBP", "note": "Stop-out on macro noise (WTI -4% ceasefire extension). Thesis intact. Re-entry BUY 1120p placed same session."}
    ]
  },
  "standingInstructions": [
    {"id": 1, "title": "TIMEZONE — MANDATORY ARITHMETIC BEFORE MARKET STATUS", "body": "BEFORE stating any market is open or closed: write UAE time now = X. NYSE closes 00:00 UAE. Is X before 00:00? LSE closes 19:30 UAE. Is X before 19:30? COMPUTE — NEVER RECALL. NYSE opens 17:30 UAE / closes 00:00 UAE. LSE opens 12:00 UAE / closes 19:30 UAE. XETRA opens 11:00 UAE / closes 19:00 UAE."},
    {"id": 17, "title": "ERROR TAXONOMY — 15 TYPES", "body": "E1: Timezone COMPUTE don't recall. E2: Stale position. E3: Fill re-flag. E4: Price verification. E5: Market timing. E6: Dividend capture. E7: Session discipline. E8: Stale quote. E9: GTC orphan. E10: Closed position scan. E11: 52wk hallucination. E12: Tool routing gap. E13: EODHD delay. E14: Date discrepancy. E15: AIM stop limitation."},
    {"id": 25, "title": "SI-25 EXIT TRIGGER", "body": "Permanent Hormuz reopening + WTI -10% from $111.54 peak = trigger at $100.38. WTI ~$87.51. NOT TRIGGERED."},
    {"id": 47, "title": "SI-47: DATE VERIFICATION — STEP ZERO", "body": "System prompt date is authoritative. State date before any analysis."},
    {"id": 48, "title": "SI-48: AI THESIS ATH RULE", "body": "Four tests: valuation, structural catalyst, no multiple expansion, PLTR P6 test."},
    {"id": 51, "title": "SI-51 v2: TIER 3 WEIGHTED JUDGEMENT", "body": "Entry requires net ≥+3 AND all hard blocks clear. POET +7/7 qualified. Hard blocks: no rebuttal published, spec >15% NAV, P6, DO NOT ENTER list."},
    {"id": 52, "title": "SI-52: WIDE NET SURFACE SCAN", "body": "Section 0-B daily. Alpha TOP_GAINERS_LOSERS >8% moves on >2x volume. 15 min max."},
    {"id": 53, "title": "SI-53: NUCLEAR/ENERGY SCAN (NEW S27)", "body": "Section 0-C weekly Monday. Names: CEG, TLN, ENGIE.PA, UUUU, RR.L fill status. Thesis: AI electricity demand + Iran/Hormuz EU energy diversification converging on nuclear."},
    {"id": 54, "title": "SI-54: AI NETWORKING SCAN (NEW S27)", "body": "Section 0-D weekly Monday. Names: MRVL + existing AI thesis triggers (MU, CDNS post-earnings, SNPS). MRVL Stage 1 required Monday S28."}
  ],
  "priceVerificationProtocol": {
    "currentPriceUS": "MMD /v2/aggs/ticker/{TICKER}/prev — field 'c'",
    "52wkRangeUS": "EOD:get_us_live_extended_quotes",
    "currentPriceEUUK": "web_fetch Yahoo Finance",
    "memoryForbidden": "MEMORY ESTIMATES FOR PRICE OR FUNDAMENTAL DATA ARE FORBIDDEN"
  },
  "cDriveProtocol": {
    "confirmed": "2026-04-22 SESSION 27",
    "readAccess": true,
    "writeAccess": true,
    "allowedPaths": ["C:\\Users\\jcadb\\claude-fund"]
  }
};

const COLORS = {
  bg: "#0d1117", card: "#161b22", border: "#30363d", accent: "#58a6ff",
  green: "#3fb950", red: "#f85149", yellow: "#d29922", blue: "#388bfd",
  text: "#c9d1d9", textDim: "#8b949e", textBright: "#f0f6fc", purple: "#a371f7"
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
            <div style={{ fontSize: 18, fontWeight: 700, color: COLORS.textBright }}>CLAUDE FUND — JOURNAL v39</div>
            <div style={{ fontSize: 11, color: COLORS.textDim, marginTop: 2 }}>Session {data.sessionNumber} | {data.fund.account} | {data.lastUpdated}</div>
          </div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {[
              { label: "NET LIQ", val: `$${(data.fund.netLiquidity/1000).toFixed(1)}K` },
              { label: "UNREAL", val: `$${(data.fund.unrealizedPnL/1000).toFixed(1)}K`, color: pnlColor(data.fund.unrealizedPnL) },
              { label: "DAY P&L", val: `+$${data.fund.dailyPnL.toFixed(0)}`, color: COLORS.green },
              { label: "WTI", val: `$${data.thesis.oilWTI}`, color: COLORS.yellow }
            ].map(m => (
              <div key={m.label} className="card" style={{ textAlign: "center", minWidth: 80 }}>
                <div style={{ fontSize: 9, color: COLORS.textDim }}>{m.label}</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: m.color || COLORS.textBright, marginTop: 2 }}>{m.val}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ marginTop: 6, padding: "6px 10px", background: "rgba(63,185,80,0.1)", border: "1px solid rgba(63,185,80,0.3)", borderRadius: 4, fontSize: 11, color: COLORS.green }}>
          ✅ ISRG +8.46% stop→$468 | ✅ ABBV filled $205.17 | ✅ CCJ +3.94% nuclear | ✅ NL $105.4K new high | ✅ E1 timezone FIXED
        </div>
        <div style={{ marginTop: 4, padding: "6px 10px", background: "rgba(248,81,73,0.1)", border: "1px solid rgba(248,81,73,0.3)", borderRadius: 4, fontSize: 11, color: COLORS.red }}>
          ⚠️ LRCX Q3 reporting tonight after 00:00 UAE — conditional entry watch | AMZN earnings APR 29 (not tonight) | IES LDES IMMINENT
        </div>
        <div style={{ marginTop: 4, padding: "6px 10px", background: "rgba(210,153,34,0.1)", border: "1px solid rgba(210,153,34,0.3)", borderRadius: 4, fontSize: 11, color: COLORS.yellow }}>
          ⚠️ NYSE: opens 17:30 UAE / closes 00:00 UAE | LSE: opens 12:00 UAE / closes 19:30 UAE | ALWAYS COMPUTE — NEVER RECALL
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
              borderLeft: p.ticker === "ISRG" ? `3px solid ${COLORS.green}` :
                          p.ticker === "ITM" ? `3px solid ${COLORS.green}` :
                          p.ticker === "ABBV" ? `3px solid ${COLORS.blue}` :
                          p.ticker === "IES" ? `3px solid ${COLORS.purple}` :
                          p.ticker === "VST" ? `3px solid ${COLORS.yellow}` : undefined
            }}>
              <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap", marginBottom: 6 }}>
                <span style={{ fontWeight: 700, fontSize: 14, color: COLORS.textBright }}>{p.ticker}</span>
                <span style={{ fontSize: 11, color: COLORS.textDim }}>{p.name}</span>
                {p.cur && <span className="badge badge-grey">{p.cur}</span>}
                {p.ticker === "ABBV" && <span className="badge badge-blue">NEW S27</span>}
                {p.ticker === "ISRG" && <span className="badge badge-green">+8.46% BEAT</span>}
                {p.ticker === "IES" && <span className="badge badge-purple">LDES IMMINENT</span>}
                {p.ticker === "VST" && <span className="badge badge-amber">TIGHT STOP</span>}
                <span className={`badge ${p.unrealPnL > 50 ? "badge-green" : p.unrealPnL < -20 ? "badge-red" : "badge-amber"}`}>
                  {p.unrealPnL >= 0 ? "+" : ""}{p.unrealPct?.toFixed(1)}%
                </span>
              </div>
              <div style={{ display: "flex", gap: 16, flexWrap: "wrap", fontSize: 11, marginBottom: 6 }}>
                <span>Shares: <b>{p.shares}</b></span>
                <span>Avg: <b>{p.avgPrice}</b></span>
                <span>Last: <b>{p.last}</b></span>
                <span>P&L: <b style={{ color: pnlColor(p.unrealPnL) }}>{p.unrealPnL >= 0 ? "+" : ""}{p.unrealPnL?.toFixed(0)}</b></span>
                {p.stop && <span>Stop: <b style={{ color: COLORS.yellow }}>{p.stop}</b></span>}
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
            <div key={i} className="card" style={{ borderLeft: `3px solid ${o.action === "BUY" ? COLORS.green : COLORS.red}` }}>
              <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap", marginBottom: 4 }}>
                <span style={{ fontWeight: 700 }}>{o.ticker}</span>
                <span className={`badge ${o.action === "BUY" ? "badge-green" : "badge-red"}`}>{o.action}</span>
                <span className="badge badge-grey">{o.type}</span>
                <span style={{ fontSize: 11 }}>Qty: <b>{o.qty}</b></span>
                {o.limitPrice && <span style={{ fontSize: 11 }}>Limit: <b>{o.limitPrice}</b></span>}
                {o.stopPrice && <span style={{ fontSize: 11 }}>Stop: <b>{o.stopPrice}</b></span>}
                <span className="badge badge-green">{o.status?.substring(0,35)}</span>
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
          <div style={{ fontSize: 12, fontWeight: 600, color: COLORS.accent, marginBottom: 8 }}>KEY DATES</div>
          {data.thesis.keyDates?.map((d, i) => (
            <div key={i} className="card" style={{ marginBottom: 6, borderLeft: `3px solid ${d.priority === "CRITICAL" ? COLORS.red : COLORS.yellow}` }}>
              <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <span style={{ fontSize: 11, fontWeight: 600, minWidth: 140, color: COLORS.textBright }}>{d.date}</span>
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
              <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap", marginBottom: 4 }}>
                <span style={{ fontWeight: 700 }}>{w.ticker}</span>
                <span style={{ fontSize: 12, color: COLORS.textDim }}>{w.name}</span>
                <span className={`badge ${w.status?.includes("ACTIVE") || w.status?.includes("STAGE 2") ? "badge-green" : w.status?.includes("CONDITIONAL") || w.status?.includes("WATCH") || w.status?.includes("STAGE 1") ? "badge-amber" : "badge-grey"}`}>{w.status?.substring(0,40)}</span>
              </div>
              {w.note && <div style={{ fontSize: 11, color: COLORS.textDim }}>{w.note}</div>}
            </div>
          ))}
          <div style={{ fontWeight: 600, color: COLORS.accent, fontSize: 12, marginTop: 8, marginBottom: 4 }}>EU / UK WATCHLIST</div>
          {data.watchlistEU?.map(w => (
            <div key={w.ticker} className="card">
              <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap", marginBottom: 4 }}>
                <span style={{ fontWeight: 700 }}>{w.ticker}</span>
                <span style={{ fontSize: 12, color: COLORS.textDim }}>{w.name}</span>
                {w.status?.includes("IN PORTFOLIO") && <span className="badge badge-green">IN PORTFOLIO</span>}
                {w.status?.includes("PENDING") && <span className="badge badge-amber">PENDING FILL</span>}
                {w.status?.includes("STAGE") && <span className="badge badge-amber">{w.status.substring(0,20)}</span>}
                {w.status?.includes("SKIP") && <span className="badge badge-red">SKIP</span>}
              </div>
              {w.note && <div style={{ fontSize: 11, color: COLORS.textDim }}>{w.note}</div>}
            </div>
          ))}
        </div>
      )}

      {activeTab === "instructions" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {data.standingInstructions?.map(ins => (
            <div key={ins.id} className="card" style={{
              borderLeft: ins.id === 1 ? `3px solid ${COLORS.red}` :
                          ins.id === 53 || ins.id === 54 ? `3px solid ${COLORS.green}` :
                          ins.id === 51 ? `3px solid ${COLORS.purple}` : undefined
            }}>
              <div style={{ display: "flex", gap: 12 }}>
                <div style={{ fontSize: 11, color: ins.id === 1 ? COLORS.red : ins.id === 53 || ins.id === 54 ? COLORS.green : ins.id === 51 ? COLORS.purple : COLORS.accent, fontWeight: 700, minWidth: 28 }}>#{ins.id.toString().padStart(2,"0")}</div>
                <div>
                  <div style={{ fontWeight: 600, color: COLORS.textBright, marginBottom: 4, fontSize: 12 }}>{ins.title}</div>
                  <div style={{ fontSize: 11, color: COLORS.textDim, lineHeight: 1.6, whiteSpace: "pre-wrap" }}>{ins.body}</div>
                </div>
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
        <span style={{ fontSize: 10, color: COLORS.textDim }}>JOURNAL v39 // SESSION 27 // {data.fund.account} // NL $105.4K // 17 POSITIONS</span>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <span className="badge badge-green">ISRG STOP $468</span>
          <span className="badge badge-green">ABBV FILLED</span>
          <span className="badge badge-green">CCJ NUCLEAR</span>
          <span className="badge badge-red">LRCX TONIGHT</span>
          <span className="badge badge-purple">IES LDES IMMINENT</span>
          <span className="badge badge-amber">AMZN APR 29</span>
        </div>
      </div>
    </div>
  );
}
