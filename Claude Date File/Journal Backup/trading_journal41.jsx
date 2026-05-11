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
//
// User actions required:
// □ 6. Delete OLD journal version from Claude project
// □ 7. Upload NEW trading_journal[N+1].jsx to Claude project
// □ 8. Run session-close.bat (GitHub backup)
// □ 9. Verify: Claude project shows correct session number
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
  "lastUpdated": "2026-04-24 SESSION 29 CLOSE — JOURNAL v41",
  "sessionNumber": 29,
  "fund": {
    "account": "U24936508",
    "netLiquidity": 105900,
    "cash": 27669,
    "availableFunds": 83600,
    "dailyPnL": 808.42,
    "dailyPnLPct": 0.77,
    "unrealizedPnL": 7659.26,
    "realizedPnL": 818.01,
    "broker": "IBKR Pro",
    "baseCurrency": "USD",
    "location": "UAE",
    "ibkrEuropeanAccess": "APPROVED — March 26 2026",
    "cashBase": 27669,
    "cashUSD": 32318,
    "cashEUR": -2904,
    "cashGBP": -925,
    "cashFloorRule": "10% of NL = $10,590 minimum. NEVER go below.",
    "deployableCash": 17079,
    "deployableCashNote": "cashBase $27,669 minus floor $10,590 = ~$17,079 gross",
    "lastUpdated": "2026-04-24 SESSION 29 CLOSE. NL $105.9K. Daily P&L +$808.42 (+0.77%). ITM trim 800sh filled 141.2p — realized +£570. ITM now 1,200sh stop 130p/128p. 172p GTC limit NOT YET PLACED — Monday action. ISRG stop raise $468→$472 pending Monday. LLY stop clearance 2.7% — T28 flag.",
    "note": "JOURNAL v41 SESSION 29 (Friday 24 Apr 2026). NL $105.9K. 19 positions. ITM trim confirmed 141.2p. Good day +0.77%. Three Monday actions: ITM 172p limit, ISRG stop raise, LLY stop review."
  },
  "thesis": {
    "title": "CEASEFIRE EXTENDED INDEFINITELY — HORMUZ BLOCKED + ESCALATING — MEGA EARNINGS WEEK",
    "summary": "WTI now $97-98/bbl — approaching SI-25 trigger $100.38 (gap ~2.5%). Iran and US tit-for-tat ship seizures active. Hormuz shut. Ceasefire extended indefinitely pending Iranian unified proposal. BKR Q1 beat confirmed — EPS +17.5%, record IET orders $4.9B. Thesis intact. ITM trim 800sh executed 141.2p. Mega earnings week: V/ABBV Apr 28, AMZN/MSFT/GOOGL Apr 29, NOG Apr 30.",
    "oilWTI": 97.5,
    "oilWTINote": "WTI ~$97-98/bbl. SI-25 trigger $100.38 — gap now ~2.5%. CRITICAL — monitor closely. Iran/US ship seizures ongoing.",
    "hormuzStatus": "BLOCKED + ESCALATING. US and Iran seizing ships tit-for-tat. IRGC gunboats active. US naval blockade continues. Ceasefire extended indefinitely.",
    "ceasefireFilter": "SI-25 WATCH. WTI ~$97-98 vs trigger $100.38. GAP NOW ~2.5% — NEAR TRIGGER. Indefinite extension is NOT SI-25 trigger. Permanent reopening + WTI -10% from $111.54 peak required simultaneously.",
    "keyDates": [
      {"date": "Mon Apr 27", "event": "SI-45 weekly screener — mandatory first session of week", "priority": "HIGH"},
      {"date": "Mon Apr 27", "event": "Place ITM 172p GTC limit sell 1,200sh — OUTSTANDING ACTION", "priority": "CRITICAL"},
      {"date": "Mon Apr 27", "event": "ISRG stop raise $468→$472 at NYSE open 17:30 UAE — log P16", "priority": "CRITICAL"},
      {"date": "Mon Apr 27", "event": "LLY stop review — $900 vs $875.86 stop = 2.7% clearance (T28)", "priority": "HIGH"},
      {"date": "Mon Apr 27 AMC", "event": "CDNS Q1 — dip ≥7% post-print = SI-39 entry ~$301.16", "priority": "HIGH"},
      {"date": "Tue Apr 28 AMC", "event": "V earnings — held 8sh $307.125. Stop $285. P24 logged: hold.", "priority": "CRITICAL"},
      {"date": "Tue Apr 28 AMC", "event": "ABBV Q1 — held 20sh $205.22. Stop $192. $744M IPR&D charge — verify Monday.", "priority": "CRITICAL"},
      {"date": "Tue Apr 29 AMC", "event": "AMZN Q1 — AWS growth rate key. Stop $234.39/$224.", "priority": "CRITICAL"},
      {"date": "Tue Apr 29 AMC", "event": "MSFT Q3 — Azure growth + Copilot. Stop $400.43. Clearance ~5.3%.", "priority": "CRITICAL"},
      {"date": "Tue Apr 29 AMC", "event": "GOOGL Q1 — BUY $315 GTC active. Price ~$339.", "priority": "CRITICAL"},
      {"date": "Wed Apr 30", "event": "NOG Q1 at WTI ~$97-98 war-premium levels. Stop $22.50.", "priority": "HIGH"},
      {"date": "May 5", "event": "LDO.MI Q1 — first earnings post-entry.", "priority": "HIGH"},
      {"date": "May 6", "event": "R3NK Q1 — €200M deferred orders must appear.", "priority": "HIGH"},
      {"date": "May 7", "event": "AMPX Q1. Stop $17.53.", "priority": "HIGH"},
      {"date": "After May 17", "event": "MU entry window opens — $440-445 / stop $420 / 14sh.", "priority": "HIGH"},
      {"date": "Mid-May", "event": "SNPS Q2 — margin recovery >20% = entry signal.", "priority": "HIGH"},
      {"date": "~May 2026", "event": "CGCT business combination close → FAC listing.", "priority": "HIGH"},
      {"date": "Jul 1", "event": "MU Q3 FY26 earnings AMC.", "priority": "HIGH"},
      {"date": "Jul 30", "event": "RR.L H1 2026 results.", "priority": "HIGH"}
    ]
  },
  "positions": [
    {
      "ticker": "ITM", "name": "ITM Power PLC", "shares": 1200, "avgPrice": 65.1, "costBasis": 781,
      "last": 160.40, "marketVal": 1920, "unrealPnL": 1139, "unrealPct": 145.8,
      "stop": 130, "stopType": "Stop Limit", "stopLimit": 128, "target": 172,
      "status": "HOLD — STOP LIMIT 130p/128p GTC — TARGET 172p GTC LIMIT NOT YET PLACED",
      "cur": "GBP",
      "note": "Trim S29: 800sh sold at 141.2p. Remaining 1,200sh. Stop raised to 130p/128p SL. 172p GTC limit sell MUST BE PLACED Monday before LSE open 12:00 UAE. Rheinmetall Giga PtX thesis intact."
    },
    {
      "ticker": "AMZN", "name": "Amazon.com Inc", "shares": 30, "avgPrice": 201.204, "costBasis": 6036,
      "last": 257.49, "marketVal": 7722, "unrealPnL": 1686, "unrealPct": 27.9,
      "stop": 234.39, "stopType": "Stop Limit", "stopLimit": 224, "target": 300,
      "status": "HOLD — EARNINGS APR 29 AMC — DO NOT TOUCH STOP",
      "note": "Stop $234.39/$224 GTC. Q1 earnings APR 29 AMC. AWS growth rate key. Beat → raise stop $242-245."
    },
    {
      "ticker": "AMPX", "name": "Amprius Technologies", "shares": 168, "avgPrice": 18.106, "costBasis": 3042,
      "last": 22.20, "marketVal": 3730, "unrealPnL": 688, "unrealPct": 22.6,
      "stop": 17.53, "target": 32,
      "status": "HOLD — STOP $17.53 GTC — EARNINGS MAY 7",
      "note": "Stop $17.53 GTC. Below cost basis — intentional pre-earnings positioning. Revisit post-May 7."
    },
    {
      "ticker": "CCJ", "name": "Cameco Corp", "shares": 49, "avgPrice": 104.021, "costBasis": 5097,
      "last": 125.12, "marketVal": 6192, "unrealPnL": 1095, "unrealPct": 21.5,
      "stop": 114.99, "target": 136,
      "status": "HOLD — STOP $114.99 GTC",
      "note": "Stop raised S28. Nuclear thesis building. +21.5%. Analyst target $136."
    },
    {
      "ticker": "CRML", "name": "Critical Metals Corp", "shares": 110, "avgPrice": 9.08, "costBasis": 999,
      "last": 11.13, "marketVal": 1226, "unrealPnL": 226, "unrealPct": 22.6,
      "stop": 9.47, "target": 15,
      "status": "HOLD — STOP $9.47 GTC — ADD ORDER $10.00 GTC LIVE",
      "note": "Stop above cost basis. ADD order: BUY 40sh @ $10.00 GTC with OCA stop $9.47."
    },
    {
      "ticker": "MSFT", "name": "Microsoft Corp", "shares": 25, "avgPrice": 372.77, "costBasis": 9319,
      "last": 421.92, "marketVal": 10548, "unrealPnL": 1229, "unrealPct": 13.2,
      "stop": 400.43, "target": 450,
      "status": "HOLD — EARNINGS APR 29 AMC — STOP CLEARANCE 5.3%",
      "note": "Stop $400.43. Clearance improved to 5.3% Friday. Azure growth + Copilot attach rate are key metrics. Do not touch stop pre-earnings."
    },
    {
      "ticker": "NOG", "name": "Northern Oil and Gas Inc", "shares": 80, "avgPrice": 24.383, "costBasis": 1951,
      "last": 26.90, "marketVal": 2135, "unrealPnL": 185, "unrealPct": 9.5,
      "stop": 22.50, "target": null,
      "status": "HOLD — STOP $22.50 GTC — Q1 APR 30",
      "note": "WTI ~$97-98. Approaching SI-25 trigger $100.38. Q1 Apr 30 at war-premium levels. Stop intentionally wide — geopolitical binary."
    },
    {
      "ticker": "R3NK", "name": "RENK Group AG", "shares": 25, "avgPrice": 52.27, "costBasis": 1307,
      "last": 55.87, "marketVal": 1397, "unrealPnL": 90, "unrealPct": 6.9,
      "stop": 48, "stopType": "Stop Limit", "stopLimit": 47, "target": 76,
      "status": "HOLD — STOP LIMIT €48/€47 GTC — EARNINGS MAY 6", "cur": "EUR",
      "note": "Q1 May 6. €200M deferred orders must appear."
    },
    {
      "ticker": "VST", "name": "Vistra Corp", "shares": 53, "avgPrice": 150.569, "costBasis": 7980,
      "last": 157.32, "marketVal": 8392, "unrealPnL": 412, "unrealPct": 5.2,
      "stop": 151.50, "target": 220,
      "status": "HOLD — TIGHT STOP $151.50 — 3.7% CLEARANCE",
      "note": "Stop above cost basis. Do not lower. Raise to $153 when price clears $160."
    },
    {
      "ticker": "ISRG", "name": "Intuitive Surgical Inc", "shares": 22, "avgPrice": 459.246, "costBasis": 10103,
      "last": 479.30, "marketVal": 10545, "unrealPnL": 441, "unrealPct": 4.4,
      "stop": 468.00, "target": 598,
      "status": "HOLD — STOP RAISE $468→$472 PENDING MONDAY OPEN",
      "note": "Stop raise to $472 pending — execute Monday NYSE open 17:30 UAE. Log per P16. Clearance currently 2.4% — T28 flag."
    },
    {
      "ticker": "CODA", "name": "Coda Octopus Group Inc", "shares": 416, "avgPrice": 12.005, "costBasis": 4994,
      "last": 12.31, "marketVal": 5171, "unrealPnL": 177, "unrealPct": 3.5,
      "stop": 11.51, "target": 22,
      "status": "HOLD — MINE CLEARANCE THESIS INTACT",
      "note": "Hormuz escalating — mine clearance thesis strengthening. WTI ~$97-98. Stop $11.51."
    },
    {
      "ticker": "IES", "name": "Invinity Energy Systems PLC", "shares": 3000, "avgPrice": 17.49, "costBasis": 525,
      "last": 18.00, "marketVal": 540, "unrealPnL": 15, "unrealPct": 2.9,
      "stop": null, "stopType": "MANUAL ALERT 12.5p", "target": 45,
      "status": "HOLD — MANUAL ALERT 12.5p — LDES DECISION IMMINENT", "cur": "GBP",
      "note": "E15: no IBKR stops for AIM — manual alert only. LDES Cap & Floor decision imminent."
    },
    {
      "ticker": "RR", "name": "Rolls-Royce Holdings PLC", "shares": 100, "avgPrice": 1128.6, "costBasis": 1129,
      "last": 1158.50, "marketVal": 1159, "unrealPnL": 30, "unrealPct": 2.6,
      "stop": 1050, "target": 1500,
      "status": "HOLD — STOP 1050p GTC", "cur": "GBP",
      "note": "T27 re-entry S28 at 1128.6p. Thesis intact: Wylfa SMR, Calpine, naval nuclear. H1 Jul 30."
    },
    {
      "ticker": "V", "name": "Visa Inc-Class A Shares", "shares": 8, "avgPrice": 307.125, "costBasis": 2457,
      "last": 306.50, "marketVal": 2463, "unrealPnL": 6, "unrealPct": 0.3,
      "stop": 285, "target": 380,
      "status": "HOLD — ⚠️ EARNINGS TUESDAY APR 28 AMC",
      "note": "P24 decision logged S29: hold $285 stop through earnings. Consumer confidence argument noted but Visa earns on transaction value not volume — petrol price rise is a tailwind not headwind."
    },
    {
      "ticker": "LLY", "name": "Eli Lilly and Company", "shares": 3, "avgPrice": 905.344, "costBasis": 2716,
      "last": 900.00, "marketVal": 2709, "unrealPnL": -7, "unrealPct": -0.3,
      "stop": 875.86, "target": 1028,
      "status": "HOLD — STOP $875.86 — ⚠️ CLEARANCE 2.7% T28 FLAG",
      "note": "T28 flag: $900 vs $875.86 stop = 2.7% clearance. Review Monday — consider raising stop or accepting current level given GLP-1 thesis intact. Analyst target $1028."
    },
    {
      "ticker": "CGCT", "name": "Cartesian Growth Corp III", "shares": 291, "avgPrice": 10.295, "costBasis": 2996,
      "last": 10.31, "marketVal": 3000, "unrealPnL": 4, "unrealPct": 0.1,
      "stop": null, "target": null,
      "status": "HOLD — NO STOP (TRUST FLOOR ~$10.27)",
      "note": "Deal close ~May 2026. SPAC trust floor provides downside protection."
    },
    {
      "ticker": "PDYN", "name": "Palladyne AI Corp", "shares": 250, "avgPrice": 6.595, "costBasis": 1649,
      "last": 6.55, "marketVal": 1650, "unrealPnL": 1, "unrealPct": 0.1,
      "stop": 5.75, "target": null,
      "status": "HOLD — STOP $5.75 GTC — EARNINGS MAY 13",
      "note": "Effectively at breakeven. May 13 earnings."
    },
    {
      "ticker": "ABBV", "name": "AbbVie Inc", "shares": 20, "avgPrice": 205.22, "costBasis": 4104,
      "last": 200.45, "marketVal": 4011, "unrealPnL": -93, "unrealPct": -2.3,
      "stop": 192.00, "target": 249,
      "status": "HOLD — STOP $192 GTC — ⚠️ EARNINGS APR 28 AMC",
      "note": "P24 decision: hold $192 stop through earnings. $744M IPR&D charge pre-announced — verify nature Monday before earnings. Skyrizi+Rinvoq $31B combined thesis intact."
    },
    {
      "ticker": "LDO", "name": "Leonardo SpA", "shares": 35, "avgPrice": 56.086, "costBasis": 1963,
      "last": 53.72, "marketVal": 1880, "unrealPnL": -83, "unrealPct": -4.2,
      "stop": 50, "target": 76,
      "status": "HOLD — STOP €50 GTC — Q1 MAY 5", "cur": "EUR",
      "note": "Day 5. -4.2%. No news. Defence thesis intact. Q1 May 5. Stop €50 = 6.9% clearance."
    }
  ],
  "pendingOrders": [
    {"ticker": "ITM", "action": "SELL", "type": "Stop Limit", "qty": 1200, "stopPrice": 130, "limitPrice": 128, "tif": "GTC", "status": "ACTIVE", "cur": "GBP"},
    {"ticker": "ITM", "action": "SELL", "type": "Limit", "qty": 1200, "limitPrice": 172, "tif": "GTC", "status": "⚠️ NOT YET PLACED — MONDAY ACTION", "cur": "GBP"},
    {"ticker": "CRML", "action": "BUY", "type": "Limit", "qty": 40, "limitPrice": 10.00, "tif": "GTC", "status": "ACTIVE — OCA with stop $9.47"},
    {"ticker": "CRML", "action": "SELL", "type": "Stop", "qty": 40, "stopPrice": 9.47, "tif": "GTC", "status": "ACTIVE — OCA with CRML BUY $10"},
    {"ticker": "CRML", "action": "SELL", "type": "Stop", "qty": 110, "stopPrice": 9.47, "tif": "GTC", "status": "ACTIVE"},
    {"ticker": "ABBV", "action": "SELL", "type": "Stop", "qty": 20, "stopPrice": 192.00, "tif": "GTC", "status": "ACTIVE"},
    {"ticker": "RR", "action": "SELL", "type": "Stop", "qty": 100, "stopPrice": 1050, "tif": "GTC", "status": "ACTIVE", "cur": "GBP"},
    {"ticker": "BKR", "action": "BUY", "type": "Limit", "qty": 8, "limitPrice": 58.50, "tif": "GTC", "status": "ACTIVE — BELOW MARKET PATIENT RE-ENTRY"},
    {"ticker": "BKR", "action": "SELL", "type": "Stop", "qty": 8, "stopPrice": 53.50, "tif": "GTC", "status": "ACTIVE — OCA"},
    {"ticker": "GOOGL", "action": "BUY", "type": "Limit", "qty": 10, "limitPrice": 315.00, "tif": "GTC", "status": "ACTIVE — price ~$339, 7.1% above limit"},
    {"ticker": "GOOGL", "action": "SELL", "type": "Stop", "qty": 10, "stopPrice": 285.00, "tif": "GTC", "status": "ACTIVE — OCA"},
    {"ticker": "NOG", "action": "SELL", "type": "Stop", "qty": 80, "stopPrice": 22.50, "tif": "GTC", "status": "ACTIVE"},
    {"ticker": "LLY", "action": "SELL", "type": "Stop", "qty": 3, "stopPrice": 875.86, "tif": "GTC", "status": "ACTIVE — T28 REVIEW MONDAY"},
    {"ticker": "V", "action": "SELL", "type": "Stop", "qty": 8, "stopPrice": 285.00, "tif": "GTC", "status": "ACTIVE — EARNINGS APR 28"},
    {"ticker": "MP", "action": "BUY", "type": "Limit", "qty": 75, "limitPrice": 55.00, "tif": "GTC", "status": "ACTIVE"},
    {"ticker": "MP", "action": "SELL", "type": "Stop", "qty": 75, "stopPrice": 50.00, "tif": "GTC", "status": "ACTIVE — OCA"},
    {"ticker": "LDO", "action": "SELL", "type": "Stop", "qty": 35, "stopPrice": 50.00, "tif": "GTC", "status": "ACTIVE", "cur": "EUR"},
    {"ticker": "ITM", "action": "SELL", "type": "Stop Limit", "qty": 1200, "stopPrice": 130, "limitPrice": 128, "tif": "GTC", "status": "ACTIVE", "cur": "GBP"},
    {"ticker": "R3NK", "action": "SELL", "type": "Stop Limit", "qty": 25, "stopPrice": 48, "limitPrice": 47, "tif": "GTC", "status": "ACTIVE", "cur": "EUR"},
    {"ticker": "AMZN", "action": "SELL", "type": "Stop Limit", "qty": 30, "stopPrice": 234.39, "limitPrice": 224, "tif": "GTC", "status": "ACTIVE — EARNINGS APR 29"},
    {"ticker": "MSFT", "action": "SELL", "type": "Stop", "qty": 25, "stopPrice": 400.43, "tif": "GTC", "status": "ACTIVE — EARNINGS APR 29"},
    {"ticker": "ISRG", "action": "SELL", "type": "Stop", "qty": 22, "stopPrice": 468.00, "tif": "GTC", "status": "ACTIVE — RAISE TO $472 MONDAY"},
    {"ticker": "VST", "action": "SELL", "type": "Stop", "qty": 53, "stopPrice": 151.50, "tif": "GTC", "status": "ACTIVE"},
    {"ticker": "CCJ", "action": "SELL", "type": "Stop", "qty": 49, "stopPrice": 114.99, "tif": "GTC", "status": "ACTIVE"},
    {"ticker": "PDYN", "action": "SELL", "type": "Stop", "qty": 250, "stopPrice": 5.75, "tif": "GTC", "status": "ACTIVE"},
    {"ticker": "AMPX", "action": "SELL", "type": "Stop", "qty": 168, "stopPrice": 17.53, "tif": "GTC", "status": "ACTIVE"},
    {"ticker": "AMPX", "action": "SELL", "type": "Limit", "qty": 168, "limitPrice": 32.00, "tif": "GTC", "status": "ACTIVE — VERIFY OCA LINKAGE WITH STOP $17.53"},
    {"ticker": "CODA", "action": "SELL", "type": "Stop", "qty": 416, "stopPrice": 11.51, "tif": "GTC", "status": "ACTIVE"}
  ],
  "watchlistUS": [
    {"ticker": "BKR", "name": "Baker Hughes", "status": "ACTIVE — BUY $58.50 GTC PATIENT RE-ENTRY", "note": "Q1 beat confirmed: EPS $0.58 vs $0.49 (+17.5%), Rev $6.59B vs $6.33B. Thesis confirmed. $58.50 limit = patient pullback entry."},
    {"ticker": "GOOGL", "name": "Alphabet Inc", "status": "ACTIVE — BUY $315 GTC", "note": "SI-39 -21% from ATH. Earnings Apr 29 AMC. Price ~$339 — 7.1% above limit."},
    {"ticker": "CDNS", "name": "Cadence Design Systems", "status": "WATCH — EARNINGS APR 27 AMC", "note": "SI-39 trigger $301.16. Dip ≥7% post-print = entry ~$301. Consensus EPS $1.91."},
    {"ticker": "MU", "name": "Micron Technology", "status": "WAIT — ENTRY AFTER MAY 17 (SI-41)", "note": "Entry $440-445 / stop $420 / 14sh. Price broke above old ATH. July 1 earnings."},
    {"ticker": "CEG", "name": "Constellation Energy", "status": "STAGE 2 PRIORITY — MONDAY SESSION 30", "note": "-33% from ATH. 24.58x fwd PE. $401 analyst target. Largest US nuclear. AI PPAs."},
    {"ticker": "SNPS", "name": "Synopsys", "status": "MONITOR — MID-MAY EARNINGS", "note": "Entry only if margin recovery >20%."},
    {"ticker": "HPE", "name": "Hewlett Packard Enterprise", "status": "STAGE 2 — SI-48 QUALIFIED", "note": "fwd PE 10.7 at ATH. $27.93 (+5.6% above old ATH). Stage 2 deferred."},
    {"ticker": "IBM", "name": "IBM Corp", "status": "WATCHLIST ONLY — SI-39 AT -35%", "note": "Beat/drop -7.8%. AI disruption concern on mainframe. Add to SI-39 at -35% drawdown only."},
    {"ticker": "OXY", "name": "Occidental Petroleum", "status": "CONDITIONAL — WTI $90+ THREE DAYS", "note": "WTI now ~$97-98. Three-day confirmation rule applies before entry."},
    {"ticker": "CRDO", "name": "Credo Technology", "status": "CONDITIONAL — WAIT $140-145"}
  ],
  "watchlistEU": [
    {"ticker": "IES.L", "name": "Invinity Energy Systems PLC", "status": "IN PORTFOLIO — E15 MANUAL 12.5p", "note": "LDES decision imminent. 18.0p Friday close."},
    {"ticker": "ITM.L", "name": "ITM Power PLC", "status": "IN PORTFOLIO — 1,200sh Stop 130p/128p — 172p TARGET LIMIT PENDING", "note": "Trim S29 800sh at 141.2p. 172p GTC limit MUST BE PLACED Monday 12:00 UAE."},
    {"ticker": "RR.L", "name": "Rolls-Royce Holdings", "status": "IN PORTFOLIO — Stop 1050p", "note": "T27 re-entry S28 at 1128.6p. H1 Jul 30."},
    {"ticker": "R3NK", "name": "RENK Group AG", "status": "IN PORTFOLIO", "note": "Q1 May 6."},
    {"ticker": "LDO.MI", "name": "Leonardo SpA", "status": "IN PORTFOLIO — Stop €50 — -4.2%", "note": "Day 5. Q1 May 5. Clearance 6.9%."},
    {"ticker": "ENR.DE", "name": "Siemens Energy AG", "status": "SKIP — AWAIT -20% CORRECTION (~€115)"}
  ],
  "sessionNotes": [
    {"date": "2026-04-18", "note": "SESSION 23 — LNG stopped. NOG filled. ITM trim. Journal v32."},
    {"date": "2026-04-19", "note": "SESSION 24 — Hormuz re-closed. NOG sell cancelled. SI-47/48. AI thesis Stage 1. Journal v35."},
    {"date": "2026-04-20", "note": "SESSION 25 — IES.L filled 17.39p. NOG stop $22.50 live. WTI $88.36. Journal v37."},
    {"date": "2026-04-21", "note": "SESSION 26 — ABVX stopped -$158. LDO filled. ITM stop 120p. GOOGL+BKR live. Journal v38."},
    {"date": "2026-04-22", "note": "SESSION 27 — RR.L stopped 1150p. RR.L BUY 1120p placed. ABBV filled. ISRG stop $468. Journal v39."},
    {"date": "2026-04-23", "note": "SESSION 28 — RR.L filled 1128.6p. V filled $307.125. Stop raises: CCJ/CRML/LLY. BKR Q1 beat. Journal v40."},
    {"date": "2026-04-24", "note": "SESSION 29 — ITM trim 800sh at 141.2p. Position now 1,200sh. Stop 130p/128p active. 172p GTC limit NOT YET PLACED. V decision: hold $285 stop through Apr 28 earnings. ABBV: hold $192 stop, verify $744M IPR&D charge Monday. WTI ~$97-98 approaching SI-25 trigger. Routines explored and abandoned — too much complexity vs value. Journal v41."}
  ],
  "tradeTracker": {
    "pendingRows": [
      {"id": 1, "ticker": "AVAV", "shares": 25, "entryPrice": 195.09, "exitPrice": 197.945, "pnl": "+$71.38", "session": "S20"},
      {"id": 2, "ticker": "ITM TRIM 1", "shares": 1100, "entryPrice": "65.1p", "exitPrice": "124.60p", "pnl": "+£652", "session": "S22"},
      {"id": 3, "ticker": "LNG", "shares": 19, "entryPrice": 268.76, "exitPrice": 248.00, "pnl": "-$396.54", "session": "S23"},
      {"id": 4, "ticker": "PATK", "shares": 25, "entryPrice": 108.80, "exitPrice": 109.256, "pnl": "+$9.34", "session": "S23"},
      {"id": 5, "ticker": "NOG", "note": "Market sell cancelled S24 — position held", "session": "S24"},
      {"id": 6, "ticker": "ABVX", "shares": 44, "entryPrice": 117.913, "exitPrice": 114.31, "pnl": "-$158.53", "session": "S26"},
      {"id": 7, "ticker": "RR", "shares": 150, "entryPrice": "1182.9p", "exitPrice": "1150p", "pnl": "-£49.35", "session": "S27", "cur": "GBP", "note": "Stop-out. Re-entry S28 at 1128.6p."},
      {"id": 8, "ticker": "ITM TRIM 2", "shares": 800, "entryPrice": "65.1p", "exitPrice": "141.2p", "pnl": "+£608.80", "session": "S29", "cur": "GBP", "note": "Second trim. Position reduced to 1,200sh."}
    ]
  },
  "standingInstructions": [
    {"id": 1, "title": "TIMEZONE — MANDATORY ARITHMETIC BEFORE MARKET STATUS", "body": "BEFORE stating any market is open or closed: write UAE time now = X. NYSE closes 00:00 UAE. Is X before 00:00? LSE closes 19:30 UAE. Is X before 19:30? XETRA closes 19:00 UAE. COMPUTE — NEVER RECALL. NYSE opens 17:30 UAE. LSE opens 12:00 UAE. XETRA opens 11:00 UAE."},
    {"id": 17, "title": "ERROR TAXONOMY — 15 TYPES", "body": "E1: Timezone COMPUTE. E2: Stale position. E3: Fill re-flag. E4: Price verification. E5: Market timing. E6: Dividend capture. E7: Session discipline. E8: Stale quote. E9: GTC orphan. E10: Closed position scan. E11: 52wk hallucination. E12: Tool routing gap. E13: EODHD delay. E14: Date discrepancy. E15: AIM stop limitation."},
    {"id": 25, "title": "SI-25 EXIT TRIGGER", "body": "Permanent Hormuz reopening + WTI -10% from $111.54 peak = trigger at $100.38. WTI NOW ~$97-98. GAP ~2.5% — NEAR TRIGGER. NOT TRIGGERED. Indefinite ceasefire extension is NOT SI-25 trigger."},
    {"id": 47, "title": "SI-47: DATE VERIFICATION — STEP ZERO", "body": "System prompt date is authoritative. State date before any analysis. Non-negotiable."},
    {"id": 48, "title": "SI-48: AI THESIS ATH RULE", "body": "Four tests: (1) valuation reasonable fwd PE below sector or PEG<1.5, (2) structural catalyst path multi-year backlog, (3) no multiple expansion required, (4) PLTR P6 test — if primary case is narrative reject."},
    {"id": 51, "title": "SI-51 v2: TIER 3 WEIGHTED JUDGEMENT", "body": "Entry requires net ≥+3 AND all hard blocks clear. Hard blocks: no rebuttal published, spec >15% NAV, P6, DO NOT ENTER list."},
    {"id": 52, "title": "SI-52: WIDE NET SURFACE SCAN", "body": "Section 0-B daily. Alpha TOP_GAINERS_LOSERS >8% moves on >2x volume. 15 min max."},
    {"id": 53, "title": "SI-53: NUCLEAR/ENERGY SCAN", "body": "Section 0-C weekly Monday. Names: CEG, TLN, ENGIE.PA, UUUU, RR.L."},
    {"id": 54, "title": "SI-54: AI NETWORKING SCAN", "body": "Section 0-D weekly Monday. Names: MRVL + AI thesis triggers (MU, CDNS, SNPS)."}
  ],
  "priceVerificationProtocol": {
    "currentPriceUS": "MMD /v2/aggs/ticker/{TICKER}/prev — field 'c'",
    "52wkRangeUS": "EOD:get_us_live_extended_quotes",
    "currentPriceEUUK": "web_fetch Yahoo Finance",
    "memoryForbidden": "MEMORY ESTIMATES FOR PRICE OR FUNDAMENTAL DATA ARE FORBIDDEN"
  },
  "cDriveProtocol": {
    "confirmed": "2026-04-24 SESSION 29",
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
            <div style={{ fontSize: 18, fontWeight: 700, color: COLORS.textBright }}>CLAUDE FUND — JOURNAL v41</div>
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
          ✅ ITM trim 800sh filled 141.2p | ✅ Stop 130p/128p active | ✅ BKR Q1 beat confirmed | ✅ Good day +$808
        </div>
        <div style={{ marginTop: 4, padding: "6px 10px", background: "rgba(248,81,73,0.1)", border: "1px solid rgba(248,81,73,0.3)", borderRadius: 4, fontSize: 11, color: COLORS.red }}>
          ⚠️ ITM 172p GTC LIMIT NOT PLACED — MONDAY | ⚠️ ISRG STOP RAISE PENDING MONDAY | ⚠️ WTI $97-98 — SI-25 GAP 2.5% | ⚠️ V+ABBV EARNINGS TUE APR 28
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
                          p.status?.includes("PENDING") || p.status?.includes("NOT YET") ? `3px solid ${COLORS.red}` : undefined
            }}>
              <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap", marginBottom: 6 }}>
                <span style={{ fontWeight: 700, fontSize: 14, color: COLORS.textBright }}>{p.ticker}</span>
                <span style={{ fontSize: 11, color: COLORS.textDim }}>{p.name}</span>
                {p.cur && <span className="badge badge-grey">{p.cur}</span>}
                {p.status?.includes("NOT YET PLACED") && <span className="badge badge-red">LIMIT PENDING</span>}
                {p.status?.includes("EARNINGS") && <span className="badge badge-amber">EARNINGS</span>}
                {p.status?.includes("T28") && <span className="badge badge-amber">T28 FLAG</span>}
                {p.status?.includes("PENDING MONDAY") && <span className="badge badge-amber">STOP PENDING</span>}
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
            <div key={i} className="card" style={{ borderLeft: `3px solid ${o.status?.includes("NOT YET") ? COLORS.red : o.action === "BUY" ? COLORS.green : COLORS.red}` }}>
              <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap", marginBottom: 4 }}>
                <span style={{ fontWeight: 700 }}>{o.ticker}</span>
                <span className={`badge ${o.action === "BUY" ? "badge-green" : "badge-red"}`}>{o.action}</span>
                <span className="badge badge-grey">{o.type}</span>
                <span style={{ fontSize: 11 }}>Qty: <b>{o.qty}</b></span>
                {o.limitPrice && <span style={{ fontSize: 11 }}>Limit: <b>{o.limitPrice}</b></span>}
                {o.stopPrice && <span style={{ fontSize: 11 }}>Stop: <b>{o.stopPrice}</b></span>}
                <span className={`badge ${o.status?.includes("NOT YET") ? "badge-red" : o.status?.includes("PENDING") || o.status?.includes("T28") ? "badge-amber" : "badge-green"}`}>{o.status?.substring(0,45)}</span>
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
                <span className={`badge ${w.status?.includes("ACTIVE") || w.status?.includes("STAGE 2") || w.status?.includes("IN PORTFOLIO") ? "badge-green" : w.status?.includes("CONDITIONAL") || w.status?.includes("WATCH") || w.status?.includes("STAGE 1") || w.status?.includes("WAIT") ? "badge-amber" : "badge-grey"}`}>{w.status?.substring(0,45)}</span>
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
            <div key={ins.id} className="card" style={{ borderLeft: ins.id === 1 ? `3px solid ${COLORS.red}` : ins.id === 25 ? `3px solid ${COLORS.yellow}` : undefined }}>
              <div style={{ display: "flex", gap: 12 }}>
                <div style={{ fontSize: 11, color: ins.id === 1 ? COLORS.red : ins.id === 25 ? COLORS.yellow : COLORS.accent, fontWeight: 700, minWidth: 28 }}>#{ins.id.toString().padStart(2,"0")}</div>
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
        <span style={{ fontSize: 10, color: COLORS.textDim }}>JOURNAL v41 // SESSION 29 // {data.fund.account} // NL $105.9K // 19 POSITIONS</span>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <span className="badge badge-green">ITM TRIM DONE</span>
          <span className="badge badge-red">ITM 172p LIMIT PENDING</span>
          <span className="badge badge-red">WTI $97-98 SI-25 GAP 2.5%</span>
          <span className="badge badge-amber">V+ABBV EARNINGS TUE</span>
          <span className="badge badge-amber">ISRG STOP RAISE MON</span>
        </div>
      </div>
    </div>
  );
}
