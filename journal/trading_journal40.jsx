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
  "lastUpdated": "2026-04-23 SESSION 28 CLOSE — JOURNAL v40",
  "sessionNumber": 28,
  "fund": {
    "account": "U24936508",
    "netLiquidity": 105100,
    "cash": 26153,
    "availableFunds": 81900,
    "dailyPnL": -603.91,
    "dailyPnLPct": -0.56,
    "unrealizedPnL": 7780.12,
    "realizedPnL": 0.00,
    "broker": "IBKR Pro",
    "baseCurrency": "USD",
    "location": "UAE",
    "ibkrEuropeanAccess": "APPROVED — March 26 2026",
    "cashBase": 26153,
    "cashUSD": 32318,
    "cashEUR": -2904,
    "cashGBP": -2051,
    "cashFloorRule": "10% of NL = $10,510 minimum. NEVER go below.",
    "deployableCash": 15643,
    "deployableCashNote": "cashBase $26,153 minus floor $10,510 = ~$15,643 gross (before FX deficit reconciliation)",
    "lastUpdated": "2026-04-23 SESSION 28 CLOSE. NL $105.1K. Daily P&L -$603.91 (-0.56%). MSFT -3.45% ($417.99) pre-earnings weakness — stop clearance 4.1%. RR.L filled 1128.6p re-entry confirmed. V filled $307.125 ⚠️ EARNINGS TOMORROW APR 28. Stop raises: CCJ $108.37→$114.99, CRML $8.34→$9.47, LLY $850→$875.86. BKR Q1 results tonight 21:00 UAE.",
    "note": "JOURNAL v40 SESSION 28 (Thursday 23 Apr 2026). NL $105.1K. 19 positions. RR.L re-entry filled 1128.6p. V filled $307 — EARNINGS APR 28 tomorrow. Three stop raises logged. MSFT stop clearance 4.1% pre-earnings Apr 29."
  },
  "thesis": {
    "title": "CEASEFIRE EXTENDED INDEFINITELY — HORMUZ BLOCKED — IRAN SEIZING SHIPS — MEGA EARNINGS WEEK",
    "summary": "Ceasefire extended indefinitely by Trump pending Iranian unified proposal. Iran seized 3 commercial ships in Hormuz on Apr 22 — active escalation not de-escalation. Second-round US-Iran talks (Vance Pakistan trip) cancelled. WTI ~$89-92 range. Blockade continues. NOG/CODA/ITM thesis fully intact and strengthening. MSFT -3.45% today on pre-earnings repositioning and Azure ROI concerns. RR.L re-entry filled 1128.6p. V filled $307 — earnings tomorrow Apr 28. Mega earnings night Apr 29: AMZN/MSFT/GOOGL/ABBV.",
    "oilWTI": 89.5,
    "oilWTINote": "WTI ~$89-92 range. Iran seized 3 ships Apr 22. Blockade active. SI-25 trigger $100.38 NOT triggered. Demand destruction estimates 4-5M bpd.",
    "hormuzStatus": "BLOCKED + ESCALATING. Iran seized MSC Francesca and 2 other vessels Apr 22. IRGC gunboats active. US naval blockade continues — 31 ships turned back. Second-round talks cancelled. Ceasefire extended indefinitely.",
    "ceasefireFilter": "SI-25 WATCH. WTI ~$89-92 vs trigger $100.38. NOT TRIGGERED. Ceasefire extended indefinitely — indefinite extension is NOT SI-25 trigger.",
    "keyDates": [
      {"date": "Tonight 21:00 UAE", "event": "BKR Q1 results — $58.50 BUY GTC active. Consensus $0.50 EPS / $6.34B rev. Beat + guidance raise = Hormuz energy services thesis confirmed.", "priority": "HIGH"},
      {"date": "Fri Apr 24 17:30 UAE", "event": "BKR webcast — review guidance after tonight's print.", "priority": "HIGH"},
      {"date": "Mon Apr 27 AMC", "event": "CDNS Q1 — SI-39 dip entry ≥−7% post-print (~$305). BUY limit $305 / stop $275 if triggered.", "priority": "HIGH"},
      {"date": "Tue Apr 28 AMC", "event": "V earnings — ⚠️ JUST FILLED TODAY at $307.125. Stop $285. Earnings risk day 2. Pre-earnings decision required.", "priority": "CRITICAL"},
      {"date": "Tue Apr 28 AMC", "event": "ABBV Q1 — held 20sh avg $205.22. Stop $192. Watch closely.", "priority": "HIGH"},
      {"date": "Tue Apr 29 AMC", "event": "AMZN Q1 — AWS growth key. Beat → raise stop $242-245. Strong beat → consider +10sh.", "priority": "CRITICAL"},
      {"date": "Tue Apr 29 AMC", "event": "MSFT Q3 — Azure growth + Copilot attach rate. Stop $400.43 at 4.1% clearance. Beat required.", "priority": "CRITICAL"},
      {"date": "Tue Apr 29 AMC", "event": "GOOGL Q1 — BUY $315 GTC active.", "priority": "CRITICAL"},
      {"date": "Wed Apr 30", "event": "NOG Q1 at WTI war-premium levels. Stop $22.50 GTC confirmed.", "priority": "HIGH"},
      {"date": "IMMINENT", "event": "IES.L LDES Initial Decision List — binary catalyst. +2.86% today to 18.0p.", "priority": "CRITICAL"},
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
      "last": 140.60, "marketVal": 2812, "unrealPnL": 1510, "unrealPct": 116.0,
      "stop": 120, "stopType": "Stop Limit", "stopLimit": 118, "target": 175,
      "status": "HOLD — STOP LIMIT 120p/118p GTC", "cur": "GBP",
      "note": "Rheinmetall Giga PtX NATO deal. +116.0%. Target 175p/200p stretch. Protocol: at 150p raise stop to 130p. Currently 140.60p — 9.4p from trigger."
    },
    {
      "ticker": "AMZN", "name": "Amazon.com Inc", "shares": 30, "avgPrice": 201.204, "costBasis": 6036,
      "last": 255.14, "marketVal": 7654, "unrealPnL": 1618, "unrealPct": 26.8,
      "stop": 234.39, "stopType": "Stop Limit", "stopLimit": 224, "target": 300,
      "status": "HOLD — EARNINGS APR 29 AMC — DO NOT TOUCH STOP",
      "note": "Stop $234.39/$224 GTC. Q1 earnings APRIL 29 AMC. AWS growth rate key. Beat → raise stop $242-245. Do not adjust stop pre-earnings."
    },
    {
      "ticker": "CCJ", "name": "Cameco Corp", "shares": 49, "avgPrice": 104.021, "costBasis": 5097,
      "last": 127.67, "marketVal": 6252, "unrealPnL": 1155, "unrealPct": 22.7,
      "stop": 115.00, "target": 136,
      "status": "HOLD — STOP RAISED S28 $108.37→$114.99 (IBKR $114.99)",
      "note": "Stop raised S28. Nuclear thesis building. +22.7%. Analyst target $136. Stop $114.99 IBKR (journalled $115.00)."
    },
    {
      "ticker": "MSFT", "name": "Microsoft Corp", "shares": 25, "avgPrice": 372.77, "costBasis": 9319,
      "last": 417.99, "marketVal": 10451, "unrealPnL": 1133, "unrealPct": 12.2,
      "stop": 400.43, "target": 450,
      "status": "HOLD — EARNINGS APR 29 AMC — STOP CLEARANCE 4.1% — MONITOR",
      "note": "-3.45% today. Stop clearance narrowed to 4.1%. Azure backlog $625B (45% OpenAI concentration risk). Earnings Apr 29 — Azure acceleration + Copilot attach rate are the two metrics. Do not touch stop pre-earnings."
    },
    {
      "ticker": "AMPX", "name": "Amprius Technologies", "shares": 168, "avgPrice": 18.106, "costBasis": 3042,
      "last": 21.83, "marketVal": 3686, "unrealPnL": 644, "unrealPct": 21.2,
      "stop": 17.53, "target": 32,
      "status": "HOLD — STOP $17.53 GTC — EARNINGS MAY 7",
      "note": "Stop raised S27 $16.89→$17.53. Below cost basis — intentional pre-earnings positioning. Revisit post-May 7."
    },
    {
      "ticker": "CRML", "name": "Critical Metals Corp", "shares": 110, "avgPrice": 9.08, "costBasis": 999,
      "last": 10.80, "marketVal": 1189, "unrealPnL": 190, "unrealPct": 19.1,
      "stop": 9.50, "target": 15,
      "status": "HOLD — STOP RAISED S28 $8.34→$9.47 (IBKR $9.47) — ADD ORDER $10.00 GTC LIVE",
      "note": "Stop raised S28 above cost basis. Volatile — -8.90% today. ADD order: BUY 40sh @ $10.00 GTC with OCA stop $9.47 — intentional, discussed S28."
    },
    {
      "ticker": "NOG", "name": "Northern Oil and Gas Inc", "shares": 80, "avgPrice": 24.383, "costBasis": 1951,
      "last": 26.60, "marketVal": 2122, "unrealPnL": 172, "unrealPct": 8.8,
      "stop": 22.50, "target": null,
      "status": "HOLD — STOP $22.50 GTC — Q1 APR 30",
      "note": "WTI ~$89-92. Iran seized 3 ships Apr 22 — escalation. Hormuz thesis intact and strengthening. Q1 Apr 30 at war-premium WTI levels. Stop intentionally wide — geopolitical binary."
    },
    {
      "ticker": "R3NK", "name": "RENK Group AG", "shares": 25, "avgPrice": 52.27, "costBasis": 1307,
      "last": 55.74, "marketVal": 1394, "unrealPnL": 87, "unrealPct": 6.6,
      "stop": 48, "stopType": "Stop Limit", "stopLimit": 47, "target": 76,
      "status": "HOLD — STOP LIMIT €48/€47 GTC — EARNINGS MAY 6", "cur": "EUR",
      "note": "Q1 May 6. €200M deferred orders must appear."
    },
    {
      "ticker": "ISRG", "name": "Intuitive Surgical Inc", "shares": 22, "avgPrice": 459.246, "costBasis": 10104,
      "last": 482.65, "marketVal": 10611, "unrealPnL": 508, "unrealPct": 5.0,
      "stop": 468.00, "target": 598,
      "status": "HOLD — STOP $468.00 GTC (RAISED S27)",
      "note": "Q1 massive beat. Stop raised S27 $447.31→$468. Clearance 3.2%. Analyst median target $598-610."
    },
    {
      "ticker": "VST", "name": "Vistra Corp", "shares": 53, "avgPrice": 150.569, "costBasis": 7980,
      "last": 155.38, "marketVal": 8235, "unrealPnL": 254, "unrealPct": 3.2,
      "stop": 151.50, "target": 220,
      "status": "HOLD — TIGHT STOP $151.50 — 2.2% CLEARANCE",
      "note": "Stop above cost basis $150.57 — protecting break-even. Do not lower stop. Analyst target $220+. Raise stop to $153 when price clears $160."
    },
    {
      "ticker": "IES", "name": "Invinity Energy Systems PLC", "shares": 3000, "avgPrice": 17.49, "costBasis": 525,
      "last": 18.00, "marketVal": 540, "unrealPnL": 15, "unrealPct": 2.9,
      "stop": null, "stopType": "MANUAL ALERT 12.5p", "target": 45,
      "status": "HOLD — MANUAL ALERT 12.5p — LDES DECISION IMMINENT — +2.86% TODAY", "cur": "GBP",
      "note": "+2.86% today to 18.0p. No confirmed RNS yet. LDES Cap & Floor Ofgem final assessment H1 2026 imminent. E15: no IBKR stops for AIM — manual alert only."
    },
    {
      "ticker": "LLY", "name": "Eli Lilly and Company", "shares": 3, "avgPrice": 905.344, "costBasis": 2716,
      "last": 923.48, "marketVal": 2771, "unrealPnL": 55, "unrealPct": 2.0,
      "stop": 875.86, "target": 1028,
      "status": "HOLD — STOP RAISED S28 $850→$875.86 (IBKR $875.86)",
      "note": "Stop raised S28 — previous $850 was below cost basis. GLP-1 thesis intact. Analyst target $1028."
    },
    {
      "ticker": "RR", "name": "Rolls-Royce Holdings PLC", "shares": 100, "avgPrice": 1128.6, "costBasis": 1129,
      "last": 1147.80, "marketVal": 1148, "unrealPnL": 20, "unrealPct": 1.7,
      "stop": 1050, "target": 1500,
      "status": "HOLD — NEW S28 RE-ENTRY FILLED 1128.6p — STOP 1050p GTC", "cur": "GBP",
      "note": "T27 re-entry after S27 stop-out at 1150p on macro noise. Thesis intact: Wylfa SMR contract Apr 13, Calpine acquisition, naval nuclear, civil aero. H1 results Jul 30."
    },
    {
      "ticker": "V", "name": "Visa Inc-Class A Shares", "shares": 8, "avgPrice": 307.125, "costBasis": 2457,
      "last": 307.60, "marketVal": 2461, "unrealPnL": 4, "unrealPct": 0.2,
      "stop": 285, "target": 380,
      "status": "HOLD — NEW S28 — ⚠️ EARNINGS TOMORROW APR 28 AMC",
      "note": "NEW S28. Filled $307.125 (GTC limit $307). SI-39 quality entry. ⚠️ Earnings April 28 AMC — day 2 of position is earnings night. Stop $285 GTC (OCA). P24: pre-earnings decision required tomorrow."
    },
    {
      "ticker": "CGCT", "name": "Cartesian Growth Corp III (Factorial Energy SPAC)", "shares": 291, "avgPrice": 10.295, "costBasis": 2996,
      "last": 10.30, "marketVal": 2997, "unrealPnL": 1, "unrealPct": 0.0,
      "stop": null, "target": null,
      "status": "HOLD — NO STOP (TRUST FLOOR ~$10.27)",
      "note": "Deal close ~May 2026. SPAC trust floor provides downside protection."
    },
    {
      "ticker": "CODA", "name": "Coda Octopus Group Inc", "shares": 416, "avgPrice": 12.005, "costBasis": 4994,
      "last": 12.01, "marketVal": 4996, "unrealPnL": 2, "unrealPct": 0.0,
      "stop": 11.51, "target": 22,
      "status": "HOLD — MINE CLEARANCE THESIS INTACT",
      "note": "Hormuz blockade active and escalating — mine clearance thesis intact. Stop $11.51."
    },
    {
      "ticker": "PDYN", "name": "Palladyne AI Corp", "shares": 250, "avgPrice": 6.595, "costBasis": 1649,
      "last": 6.54, "marketVal": 1649, "unrealPnL": 0, "unrealPct": -0.0,
      "stop": 5.75, "target": null,
      "status": "HOLD — STOP $5.75 GTC — EARNINGS MAY 13",
      "note": "Effectively at breakeven. May 13 earnings."
    },
    {
      "ticker": "ABBV", "name": "AbbVie Inc", "shares": 20, "avgPrice": 205.22, "costBasis": 4104,
      "last": 201.85, "marketVal": 4037, "unrealPnL": -68, "unrealPct": -1.7,
      "stop": 192.00, "target": 249,
      "status": "HOLD — STOP $192 GTC — EARNINGS APR 28 AMC",
      "note": "Day 2. -1.7%. Earnings April 28 AMC — same night as V. Skyrizi+Rinvoq $31B combined thesis. EPS +45% forecast 2026. Target $249."
    },
    {
      "ticker": "LDO", "name": "Leonardo SpA", "shares": 35, "avgPrice": 56.086, "costBasis": 1963,
      "last": 54.27, "marketVal": 1899, "unrealPnL": -64, "unrealPct": -3.3,
      "stop": 50, "target": 76,
      "status": "HOLD — STOP €50 GTC — DAY 4", "cur": "EUR",
      "note": "Day 4. -3.3%. No news. Defence thesis intact. Q1 May 5."
    }
  ],
  "pendingOrders": [
    {"ticker": "CRML", "action": "BUY", "type": "Limit", "qty": 40, "limitPrice": 10.00, "tif": "GTC", "status": "ACTIVE — OCA with stop $9.47", "note": "Intentional add order — discussed S28. $10 support level entry."},
    {"ticker": "CRML", "action": "SELL", "type": "Stop", "qty": 40, "stopPrice": 9.47, "tif": "GTC", "status": "ACTIVE — OCA with CRML BUY $10"},
    {"ticker": "ABBV", "action": "SELL", "type": "Stop", "qty": 20, "stopPrice": 192.00, "tif": "GTC", "status": "ACTIVE"},
    {"ticker": "RR", "action": "SELL", "type": "Stop", "qty": 100, "stopPrice": 1050, "tif": "GTC", "status": "ACTIVE", "cur": "GBP"},
    {"ticker": "BKR", "action": "BUY", "type": "Limit", "qty": 8, "limitPrice": 58.50, "tif": "GTC", "status": "ACTIVE — Q1 RESULTS TONIGHT 21:00 UAE"},
    {"ticker": "BKR", "action": "SELL", "type": "Stop", "qty": 8, "stopPrice": 53.50, "tif": "GTC", "status": "ACTIVE — OCA"},
    {"ticker": "GOOGL", "action": "BUY", "type": "Limit", "qty": 10, "limitPrice": 315.00, "tif": "GTC", "status": "ACTIVE", "note": "SI-39 -21% from ATH. Earnings Apr 29."},
    {"ticker": "GOOGL", "action": "SELL", "type": "Stop", "qty": 10, "stopPrice": 285.00, "tif": "GTC", "status": "ACTIVE — OCA"},
    {"ticker": "NOG", "action": "SELL", "type": "Stop", "qty": 80, "stopPrice": 22.50, "tif": "GTC", "status": "ACTIVE"},
    {"ticker": "LLY", "action": "SELL", "type": "Stop", "qty": 3, "stopPrice": 875.86, "tif": "GTC", "status": "ACTIVE — RAISED S28 from $850"},
    {"ticker": "V", "action": "SELL", "type": "Stop", "qty": 8, "stopPrice": 285.00, "tif": "GTC", "status": "ACTIVE — OCA — ⚠️ EARNINGS APR 28"},
    {"ticker": "CRML", "action": "SELL", "type": "Stop", "qty": 110, "stopPrice": 9.47, "tif": "GTC", "status": "ACTIVE — RAISED S28 from $8.34"},
    {"ticker": "MP", "action": "BUY", "type": "Limit", "qty": 75, "limitPrice": 55.00, "tif": "GTC", "status": "ACTIVE"},
    {"ticker": "MP", "action": "SELL", "type": "Stop", "qty": 75, "stopPrice": 50.00, "tif": "GTC", "status": "ACTIVE — OCA"},
    {"ticker": "LDO", "action": "SELL", "type": "Stop", "qty": 35, "stopPrice": 50.00, "tif": "GTC", "status": "ACTIVE", "cur": "EUR"},
    {"ticker": "ITM", "action": "SELL", "type": "Stop Limit", "qty": 2000, "stopPrice": 120, "limitPrice": 118, "tif": "GTC", "status": "ACTIVE", "cur": "GBP"},
    {"ticker": "R3NK", "action": "SELL", "type": "Stop Limit", "qty": 25, "stopPrice": 48, "limitPrice": 47, "tif": "GTC", "status": "ACTIVE", "cur": "EUR"},
    {"ticker": "AMZN", "action": "SELL", "type": "Stop Limit", "qty": 30, "stopPrice": 234.39, "limitPrice": 224, "tif": "GTC", "status": "ACTIVE — EARNINGS APR 29"},
    {"ticker": "MSFT", "action": "SELL", "type": "Stop", "qty": 25, "stopPrice": 400.43, "tif": "GTC", "status": "ACTIVE — EARNINGS APR 29 — CLEARANCE 4.1%"},
    {"ticker": "ISRG", "action": "SELL", "type": "Stop", "qty": 22, "stopPrice": 468.00, "tif": "GTC", "status": "ACTIVE — RAISED S27"},
    {"ticker": "VST", "action": "SELL", "type": "Stop", "qty": 53, "stopPrice": 151.50, "tif": "GTC", "status": "ACTIVE — TIGHT"},
    {"ticker": "CCJ", "action": "SELL", "type": "Stop", "qty": 49, "stopPrice": 114.99, "tif": "GTC", "status": "ACTIVE — RAISED S28 from $108.37"}
  ],
  "watchlistUS": [
    {"ticker": "BKR", "name": "Baker Hughes", "status": "ACTIVE — BUY $58.50 GTC — EARNINGS TONIGHT 21:00 UAE", "note": "Q1 results tonight. Consensus $0.50 EPS. Beat + guidance raise = Hormuz energy services thesis confirmed."},
    {"ticker": "GOOGL", "name": "Alphabet Inc", "status": "ACTIVE — BUY $315 GTC", "note": "SI-39 -21% from ATH. Earnings Apr 29."},
    {"ticker": "V", "name": "Visa Inc", "status": "IN PORTFOLIO — ⚠️ EARNINGS APR 28 TOMORROW", "note": "Filled S28 $307.125. Stop $285. Earnings tomorrow night. P24 pre-earnings decision required."},
    {"ticker": "MU", "name": "Micron Technology", "status": "STAGE 2 CONFIRMED — WAIT SI-41 (after May 17)", "note": "Entry $440-445 / stop $420 / 14sh. July 1 earnings."},
    {"ticker": "SNPS", "name": "Synopsys", "status": "MONITOR — MID-MAY EARNINGS", "note": "Entry only if margin recovery >20%."},
    {"ticker": "CDNS", "name": "Cadence Design Systems", "status": "WATCH — EARNINGS APR 27 AMC", "note": "SI-39 trigger $301.16. Dip ≥−7% post-print = entry ~$305."},
    {"ticker": "CEG", "name": "Constellation Energy", "status": "STAGE 2 PRIORITY — NEXT SESSION", "note": "24.58x fwd PE, $401 target, −18% YTD. Largest US nuclear operator. Microsoft/Meta PPAs."},
    {"ticker": "MRVL", "name": "Marvell Technology", "status": "STAGE 1 — NEXT SESSION", "note": "AI networking gap. Custom ASIC + 800G Ethernet."},
    {"ticker": "LRCX", "name": "Lam Research Corp", "status": "WATCH — NO ENTRY S28 (~$277)", "note": "Q3 FY26: EPS $1.47 vs $1.38 beat. Rev slight miss. +4.24% post-earnings. Entry threshold $245.45 NOT met. SI-39 drawdown watchlist."},
    {"ticker": "CRDO", "name": "Credo Technology", "status": "CONDITIONAL — WAIT $140-145"},
    {"ticker": "OXY", "name": "Occidental Petroleum", "status": "CONDITIONAL — WTI $90+ THREE DAYS"}
  ],
  "watchlistEU": [
    {"ticker": "IES.L", "name": "Invinity Energy Systems PLC", "status": "IN PORTFOLIO — E15 MANUAL 12.5p", "note": "+2.86% today to 18.0p. LDES decision IMMINENT."},
    {"ticker": "ITM.L", "name": "ITM Power PLC", "status": "IN PORTFOLIO — Stop 120p/118p", "note": "Rheinmetall NATO. +116.0%. Target 175p. Raise stop to 130p at 150p."},
    {"ticker": "RR.L", "name": "Rolls-Royce Holdings", "status": "IN PORTFOLIO — FILLED S28 1128.6p — Stop 1050p", "note": "T27 re-entry confirmed. H1 results Jul 30."},
    {"ticker": "R3NK", "name": "RENK Group AG", "status": "IN PORTFOLIO", "note": "Q1 May 6."},
    {"ticker": "LDO.MI", "name": "Leonardo SpA", "status": "IN PORTFOLIO — Stop €50", "note": "Day 4. Q1 May 5."},
    {"ticker": "ENGIE.PA", "name": "Engie SA", "status": "STAGE 1 — NEXT SESSION", "note": "EU nuclear/LNG. Belgian fleet extended. ~12-14x fwd PE estimate."},
    {"ticker": "ENR.DE", "name": "Siemens Energy AG", "status": "SKIP — AWAIT -20% CORRECTION (~€115)", "note": "+200% in 1yr, fwd PE 36x. Add to SI-39 at €115."}
  ],
  "sessionNotes": [
    {"date": "2026-04-18", "note": "SESSION 23 — LNG stopped. NOG filled. ITM trim. Journal v32."},
    {"date": "2026-04-19", "note": "SESSION 24 — Hormuz re-closed. NOG sell cancelled. SI-47/48. AI thesis Stage 1. Journal v35."},
    {"date": "2026-04-20", "note": "SESSION 25 — IES.L filled 17.39p. NOG stop $22.50 live. WTI $88.36. Journal v37."},
    {"date": "2026-04-21", "note": "SESSION 26 — ABVX stopped -$158. LDO filled. ITM stop 120p. GOOGL+BKR live. SI-51 v2. Journal v38."},
    {"date": "2026-04-22", "note": "SESSION 27 — RR.L stopped 1150p (−£49.35). RR.L BUY 1120p placed. ABBV filled $205.17. ISRG +8.46% stop $468. CCJ +3.94%. E1 timezone fixed. Journal v39."},
    {"date": "2026-04-23", "note": "SESSION 28 — RR.L BUY filled 1128.6p (re-entry confirmed, T27). V BUY filled $307.125 ⚠️ earnings Apr 28. Stop raises: CCJ $108.37→$114.99, CRML $8.34→$9.47, LLY $850→$875.86 (all P16 compliant). MSFT -3.45% pre-earnings — stop clearance 4.1%. LRCX EPS beat, no entry triggered ($277). BKR Q1 tonight 21:00 UAE. CRML add $10.00 GTC confirmed intentional. T28 + P24 added to lessons."}
  ],
  "tradeTracker": {
    "pendingRows": [
      {"id": 1, "ticker": "AVAV", "shares": 25, "entryPrice": 195.09, "exitPrice": 197.945, "pnl": "+$71.38", "session": "S20"},
      {"id": 2, "ticker": "ITM TRIM", "shares": 1100, "entryPrice": "65.1p", "exitPrice": "124.60p", "pnl": "+£652", "session": "S22"},
      {"id": 3, "ticker": "LNG", "shares": 19, "entryPrice": 268.76, "exitPrice": 248.00, "pnl": "-$396.54", "session": "S23"},
      {"id": 4, "ticker": "PATK", "shares": 25, "entryPrice": 108.80, "exitPrice": 109.256, "pnl": "+$9.34", "session": "S23"},
      {"id": 5, "ticker": "NOG", "note": "Market sell cancelled S24 — position held", "session": "S24"},
      {"id": 6, "ticker": "ABVX", "shares": 44, "entryPrice": 117.913, "exitPrice": 114.31, "pnl": "-$158.53", "session": "S26"},
      {"id": 7, "ticker": "RR", "shares": 150, "entryPrice": "1182.9p", "exitPrice": "1150p", "pnl": "-£49.35", "session": "S27", "cur": "GBP", "note": "Stop-out macro noise. Re-entry S28 at 1128.6p."}
    ]
  },
  "standingInstructions": [
    {"id": 1, "title": "TIMEZONE — MANDATORY ARITHMETIC BEFORE MARKET STATUS", "body": "BEFORE stating any market is open or closed: write UAE time now = X. NYSE closes 00:00 UAE. Is X before 00:00? LSE closes 19:30 UAE. Is X before 19:30? XETRA closes 19:00 UAE. COMPUTE — NEVER RECALL. NYSE opens 17:30 UAE. LSE opens 12:00 UAE. XETRA opens 11:00 UAE."},
    {"id": 17, "title": "ERROR TAXONOMY — 15 TYPES", "body": "E1: Timezone COMPUTE. E2: Stale position. E3: Fill re-flag. E4: Price verification. E5: Market timing. E6: Dividend capture. E7: Session discipline. E8: Stale quote. E9: GTC orphan. E10: Closed position scan. E11: 52wk hallucination. E12: Tool routing gap. E13: EODHD delay. E14: Date discrepancy. E15: AIM stop limitation."},
    {"id": 25, "title": "SI-25 EXIT TRIGGER", "body": "Permanent Hormuz reopening + WTI -10% from $111.54 peak = trigger at $100.38. WTI ~$89-92. NOT TRIGGERED. Iran seizing ships Apr 22 — escalation not de-escalation."},
    {"id": 47, "title": "SI-47: DATE VERIFICATION — STEP ZERO", "body": "System prompt date is authoritative. State date before any analysis. Non-negotiable."},
    {"id": 48, "title": "SI-48: AI THESIS ATH RULE", "body": "Four tests: (1) valuation reasonable fwd PE below sector or PEG<1.5, (2) structural catalyst path multi-year backlog, (3) no multiple expansion required, (4) PLTR P6 test — if primary case is narrative reject."},
    {"id": 51, "title": "SI-51 v2: TIER 3 WEIGHTED JUDGEMENT", "body": "Entry requires net ≥+3 AND all hard blocks clear. Hard blocks: no rebuttal published, spec >15% NAV, P6, DO NOT ENTER list. Score 7 factors +1/-1 each."},
    {"id": 52, "title": "SI-52: WIDE NET SURFACE SCAN", "body": "Section 0-B daily. Alpha TOP_GAINERS_LOSERS >8% moves on >2x volume. 15 min max."},
    {"id": 53, "title": "SI-53: NUCLEAR/ENERGY SCAN (S27)", "body": "Section 0-C weekly Monday. Names: CEG, TLN, ENGIE.PA, UUUU, RR.L fill status."},
    {"id": 54, "title": "SI-54: AI NETWORKING SCAN (S27)", "body": "Section 0-D weekly Monday. Names: MRVL + AI thesis triggers (MU, CDNS, SNPS)."}
  ],
  "priceVerificationProtocol": {
    "currentPriceUS": "MMD /v2/aggs/ticker/{TICKER}/prev — field 'c'",
    "52wkRangeUS": "EOD:get_us_live_extended_quotes",
    "currentPriceEUUK": "web_fetch Yahoo Finance",
    "memoryForbidden": "MEMORY ESTIMATES FOR PRICE OR FUNDAMENTAL DATA ARE FORBIDDEN"
  },
  "cDriveProtocol": {
    "confirmed": "2026-04-23 SESSION 28",
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
            <div style={{ fontSize: 18, fontWeight: 700, color: COLORS.textBright }}>CLAUDE FUND — JOURNAL v40</div>
            <div style={{ fontSize: 11, color: COLORS.textDim, marginTop: 2 }}>Session {data.sessionNumber} | {data.fund.account} | {data.lastUpdated}</div>
          </div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {[
              { label: "NET LIQ", val: `$${(data.fund.netLiquidity/1000).toFixed(1)}K` },
              { label: "UNREAL", val: `$${(data.fund.unrealizedPnL/1000).toFixed(1)}K`, color: pnlColor(data.fund.unrealizedPnL) },
              { label: "DAY P&L", val: `${data.fund.dailyPnL >= 0 ? "+" : ""}$${data.fund.dailyPnL.toFixed(0)}`, color: pnlColor(data.fund.dailyPnL) },
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
          ✅ RR.L filled 1128.6p | ✅ V filled $307.125 | ✅ CCJ stop→$114.99 | ✅ CRML stop→$9.47 | ✅ LLY stop→$875.86
        </div>
        <div style={{ marginTop: 4, padding: "6px 10px", background: "rgba(248,81,73,0.1)", border: "1px solid rgba(248,81,73,0.3)", borderRadius: 4, fontSize: 11, color: COLORS.red }}>
          ⚠️ V EARNINGS TOMORROW APR 28 | ⚠️ ABBV EARNINGS APR 28 | ⚠️ MSFT STOP CLEARANCE 4.1% | ⚠️ BKR Q1 TONIGHT 21:00 UAE | ⚠️ IES LDES IMMINENT
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
              borderLeft: p.unrealPnL > 500 ? `3px solid ${COLORS.green}` :
                          p.unrealPnL < -50 ? `3px solid ${COLORS.red}` :
                          p.status?.includes("EARNINGS") ? `3px solid ${COLORS.yellow}` :
                          p.status?.includes("IMMINENT") ? `3px solid ${COLORS.purple}` : undefined
            }}>
              <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap", marginBottom: 6 }}>
                <span style={{ fontWeight: 700, fontSize: 14, color: COLORS.textBright }}>{p.ticker}</span>
                <span style={{ fontSize: 11, color: COLORS.textDim }}>{p.name}</span>
                {p.cur && <span className="badge badge-grey">{p.cur}</span>}
                {p.status?.includes("NEW S28") && <span className="badge badge-blue">NEW S28</span>}
                {p.status?.includes("RAISED S28") && <span className="badge badge-amber">STOP RAISED S28</span>}
                {p.status?.includes("TOMORROW") && <span className="badge badge-red">EARNINGS TOMORROW</span>}
                {p.status?.includes("EARNINGS APR 28") && !p.status?.includes("TOMORROW") && <span className="badge badge-amber">EARNINGS APR 28</span>}
                {p.status?.includes("EARNINGS APR 29") && <span className="badge badge-amber">EARNINGS APR 29</span>}
                {p.status?.includes("IMMINENT") && <span className="badge badge-purple">LDES IMMINENT</span>}
                {p.status?.includes("TIGHT") && <span className="badge badge-red">TIGHT STOP</span>}
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
                <span className={`badge ${o.status?.includes("TONIGHT") || o.status?.includes("TOMORROW") ? "badge-red" : "badge-green"}`}>{o.status?.substring(0,40)}</span>
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
                <span style={{ fontSize: 11, fontWeight: 600, minWidth: 160, color: COLORS.textBright }}>{d.date}</span>
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
                <span className={`badge ${w.status?.includes("ACTIVE") || w.status?.includes("STAGE 2") || w.status?.includes("IN PORTFOLIO") ? "badge-green" : w.status?.includes("CONDITIONAL") || w.status?.includes("WATCH") || w.status?.includes("STAGE 1") ? "badge-amber" : "badge-grey"}`}>{w.status?.substring(0,45)}</span>
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
                  <div style={{ fontSize: 11, color: COLORS.textDim, lineHeight: 1.6 }}>{ins.body}</div>
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
        <span style={{ fontSize: 10, color: COLORS.textDim }}>JOURNAL v40 // SESSION 28 // {data.fund.account} // NL $105.1K // 19 POSITIONS</span>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <span className="badge badge-green">RR.L FILLED</span>
          <span className="badge badge-green">V FILLED</span>
          <span className="badge badge-green">3 STOPS RAISED</span>
          <span className="badge badge-red">V EARNINGS APR 28</span>
          <span className="badge badge-red">ABBV EARNINGS APR 28</span>
          <span className="badge badge-amber">MSFT 4.1% CLEARANCE</span>
          <span className="badge badge-purple">IES LDES IMMINENT</span>
        </div>
      </div>
    </div>
  );
}
