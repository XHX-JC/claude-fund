import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "fund_journal_v2";

// ═══════════════════════════════════════════════════════════════════
// SESSION CLOSE CHECKLIST — CLAUDE EXECUTES AT EVERY SESSION END
// filesystem:write_file → journal, FUND_SESSION_STATE.md, LESSONS_LEARNED.md
// Allowed paths: C:\Users\jcadb\claude-fund\
// Claude actions: Write journal + .md files to C drive
// User actions: Delete old journal from Claude project, upload new, run session-close.bat
// ═══════════════════════════════════════════════════════════════════
// TIMEZONE REFERENCE — MANDATORY CHECK BEFORE ANY MARKET STATUS CALL
// Dubai = UTC+4 year-round (no DST)
// NYSE: opens 17:30 UAE / closes 00:00 UAE
// LSE:  opens 12:00 UAE / closes 19:30 UAE
// XETRA/BVME: opens 11:00 UAE / closes 19:00 UAE
// PROCEDURE: State UAE time. Compute — never recall.
// ═══════════════════════════════════════════════════════════════════

const INITIAL_STATE = {
  "lastUpdated": "2026-04-25 SESSION 29 SUPPLEMENTARY RESEARCH — JOURNAL v42",
  "sessionNumber": "29-SUPP",
  "fund": {
    "account": "U24936508",
    "netLiquidity": 105700,
    "unrealizedPnL": 7468.51,
    "realizedPnL": 819.68,
    "cashBase": 27669,
    "cashUSD": 34943,
    "cashEUR": -2904,
    "cashGBP": -925,
    "cashFloorRule": "10% of NL = $10,570 minimum. NEVER go below.",
    "deployableCash": 17100,
    "deployableCashNote": "~$17,100 gross. Net ~$8,700 after CEG $4,400 + SNPS $4,000 pending.",
    "broker": "IBKR Pro",
    "baseCurrency": "USD",
    "location": "UAE",
    "ibkrEuropeanAccess": "APPROVED — March 26 2026",
    "lastUpdated": "2026-04-25 S29 SUPP. NL $105,700. 18 positions. LLY stopped out -$89.41. ISRG stop $471.84. NOG stop $23.92. CEG+SNPS entries authorised. ABBV earnings corrected Wed Apr 29 BMO.",
    "note": "JOURNAL v42. Saturday 25 Apr 2026 research session. 18 positions. 5 Stage 2s complete. CEG+SNPS orders pending Monday placement. Weekend binary: US-Iran Pakistan talks."
  },
  "thesis": {
    "title": "CEASEFIRE EXTENDED INDEFINITELY — DUAL BLOCKADE — WEEKEND BINARY: US-IRAN PAKISTAN TALKS",
    "summary": "WTI ~$94-95 Friday close after pulling back from $97-98 Thursday on Pakistan peace talk hopes. Trump sending envoys to Pakistan this weekend; Iranian FM may be in Islamabad. Binary: breakthrough = WTI -$10-20 Monday open; talks fail = WTI resumes toward SI-25 trigger $100.38 (gap now ~$6). Hormuz effectively closed. Mine-clearing ops active — CODA thesis strengthening. NOG stop raised to $23.92 (just below cost $24.383) for ceasefire binary management.",
    "oilWTI": 94.5,
    "oilWTINote": "WTI Fri close ~$94-95. SI-25 trigger $100.38 — gap ~$6. NOT TRIGGERED. Pulled back from $97-98 peak on diplomacy hopes. Weekend Pakistan talks = binary event. Monitor before any Monday order.",
    "hormuzStatus": "DUAL BLOCKADE ACTIVE. US naval blockade of Iranian ports + Iranian control of Strait. US seizing Iranian tankers. Iran seizing cargo ships. Trump ordered shoot-and-kill on Iranian mine-laying vessels. Mine-clearing ops confirm CODA thesis.",
    "ceasefireFilter": "SI-25 WATCH. Indefinite extension ≠ SI-25 trigger. Permanent reopening + WTI -10% from $111.54 peak BOTH required simultaneously. Gap to trigger: ~$6.",
    "keyDates": [
      {"date": "Weekend Apr 25-26", "event": "US-Iran Pakistan talks — LIVE BINARY. Check before any Monday order.", "priority": "CRITICAL"},
      {"date": "Mon Apr 27 STEP ZERO", "event": "State date. Compute UAE time vs all closes. SI-47 non-negotiable.", "priority": "CRITICAL"},
      {"date": "Mon Apr 27 before 12:00 UAE", "event": "Place ITM 172p GTC limit sell 1,200sh — OUTSTANDING SINCE S29", "priority": "CRITICAL"},
      {"date": "Mon Apr 27 before 12:00 UAE", "event": "Place CEG BUY $308 GTC + stop $278 (14sh OCA) — Stage 2 authorised", "priority": "CRITICAL"},
      {"date": "Mon Apr 27 before 12:00 UAE", "event": "Place SNPS BUY $495 GTC + stop $440 (8sh OCA) — Stage 2 authorised", "priority": "CRITICAL"},
      {"date": "Mon Apr 27 at 17:30 UAE", "event": "Raise BKR BUY $58.50 → $63 (stop $53.50 OCA stays)", "priority": "HIGH"},
      {"date": "Mon Apr 27 at 17:30 UAE", "event": "Verify MRVL price via MMD. If ~$160-165 → place GTC $152 + stop $135 (10sh)", "priority": "HIGH"},
      {"date": "Mon Apr 27 at 17:30 UAE", "event": "Decide OXY — check Pakistan talks first. If no deal: 15sh @$57, stop $48", "priority": "HIGH"},
      {"date": "Mon Apr 27 at 17:30 UAE", "event": "Verify AMPX OCA: stop $17.53 + limit $32 both active and linked", "priority": "HIGH"},
      {"date": "Mon Apr 27", "event": "SI-45 weekly screener — mandatory first session of week", "priority": "HIGH"},
      {"date": "Mon Apr 27 AMC", "event": "CDNS Q1 — if ≥7% dip from $332.89 (~$309) → review SI-39 entry $301.16", "priority": "HIGH"},
      {"date": "Tue Apr 28 AMC", "event": "V earnings — 8sh held, stop $285. P24 hold. Visa earns on transaction value — oil tailwind.", "priority": "CRITICAL"},
      {"date": "Wed Apr 29 BMO", "event": "⚠️ ABBV Q1 — WEDNESDAY BEFORE OPEN (E14 corrected from Tue AMC). Stop $192. Watch Skyrizi $4.4B qtr.", "priority": "CRITICAL"},
      {"date": "Wed Apr 29 AMC", "event": "AMZN Q1 — AWS growth rate key. Stop $234.39/$224 SL.", "priority": "CRITICAL"},
      {"date": "Wed Apr 29 AMC", "event": "MSFT Q3 — Azure + Copilot. Stop $400.43.", "priority": "CRITICAL"},
      {"date": "Wed Apr 29 AMC", "event": "GOOGL Q1 — BUY $315 GTC active. Price ~$344, 9.3% above limit.", "priority": "HIGH"},
      {"date": "Thu Apr 30", "event": "NOG Q1 at war-premium WTI. Stop $23.92 (raised from $22.50).", "priority": "HIGH"},
      {"date": "May 5", "event": "LDO.MI Q1 — stop €50, clearance 3.8%. OXY Q1 earnings May 5.", "priority": "HIGH"},
      {"date": "May 6", "event": "R3NK Q1 — €200M deferred orders must appear.", "priority": "HIGH"},
      {"date": "May 7", "event": "AMPX Q1. Stop $17.53.", "priority": "HIGH"},
      {"date": "May 11", "event": "CEG Q1 earnings — catalyst gate for entry thesis. Clean Q1 = Calpine overhang clears.", "priority": "HIGH"},
      {"date": "May 20", "event": "SNPS Q2 FY26 — catalyst gate. China stabilisation + Ansys synergy = re-rate signal.", "priority": "HIGH"},
      {"date": "Jun 2", "event": "HPE Q2 FY26 — formal review gate for HPE entry. Stage 2 authorises entry if confirmed.", "priority": "HIGH"},
      {"date": "After May 17", "event": "MU entry window opens. Re-entry trigger $460 (old ATH support). Entry $440-445 missed — new ATH $506.99.", "priority": "MEDIUM"},
      {"date": "~May 2026", "event": "CGCT business combination → FAC listing.", "priority": "MEDIUM"},
      {"date": "Jul 1", "event": "MU Q3 FY26 earnings AMC.", "priority": "HIGH"},
      {"date": "Jul 30", "event": "RR.L H1 2026 results.", "priority": "HIGH"}
    ]
  },
  "positions": [
    {
      "ticker": "ITM", "name": "ITM Power PLC", "shares": 1200, "avgPrice": 65.1, "costBasis": 781,
      "last": 154.80, "marketVal": 1858, "unrealPnL": 1077, "unrealPct": 137.8,
      "stop": 130, "stopType": "Stop Limit", "stopLimit": 128, "target": 172, "cur": "GBP",
      "status": "HOLD — STOP LIMIT 130p/128p GTC — ⚠️ 172p GTC LIMIT NOT PLACED — MONDAY ACTION #1",
      "note": "172p GTC limit sell 1,200sh MUST be placed before LSE open 12:00 UAE Monday. Outstanding since S29."
    },
    {
      "ticker": "AMZN", "name": "Amazon.com Inc", "shares": 30, "avgPrice": 201.204, "costBasis": 6036,
      "last": 264.22, "marketVal": 7927, "unrealPnL": 1891, "unrealPct": 31.3,
      "stop": 234.39, "stopType": "Stop Limit", "stopLimit": 224, "target": 300,
      "status": "HOLD — EARNINGS WED APR 29 AMC — DO NOT TOUCH STOP",
      "note": "Stop $234.39/$224 GTC. AWS growth rate key. Beat → raise stop $242-245."
    },
    {
      "ticker": "CRML", "name": "Critical Metals Corp", "shares": 110, "avgPrice": 9.08, "costBasis": 999,
      "last": 11.36, "marketVal": 1250, "unrealPnL": 251, "unrealPct": 25.1,
      "stop": 9.47, "target": 15,
      "status": "HOLD — STOP $9.47 GTC — ADD ORDER $10.00 GTC LIVE",
      "note": "Add order: BUY 40sh @$10.00 GTC OCA with stop $9.47."
    },
    {
      "ticker": "AMPX", "name": "Amprius Technologies", "shares": 168, "avgPrice": 18.106, "costBasis": 3042,
      "last": 20.82, "marketVal": 3498, "unrealPnL": 456, "unrealPct": 14.1,
      "stop": 17.53, "target": 32,
      "status": "HOLD — STOP $17.53 GTC — VERIFY OCA WITH LIMIT $32 MONDAY — EARNINGS MAY 7",
      "note": "Stop below cost — intentional pre-earnings. Verify OCA linkage Monday."
    },
    {
      "ticker": "CCJ", "name": "Cameco Corp", "shares": 49, "avgPrice": 104.021, "costBasis": 5097,
      "last": 122.15, "marketVal": 5985, "unrealPnL": 888, "unrealPct": 17.4,
      "stop": 114.99, "target": 136,
      "status": "HOLD — STOP $114.99 GTC",
      "note": "Nuclear thesis intact. +17.4%."
    },
    {
      "ticker": "MSFT", "name": "Microsoft Corp", "shares": 25, "avgPrice": 372.77, "costBasis": 9319,
      "last": 423.88, "marketVal": 10597, "unrealPnL": 1278, "unrealPct": 13.7,
      "stop": 400.43, "target": 450,
      "status": "HOLD — EARNINGS WED APR 29 AMC — DO NOT TOUCH STOP",
      "note": "Azure + Copilot attach rate key. Stop $400.43."
    },
    {
      "ticker": "VST", "name": "Vistra Corp", "shares": 53, "avgPrice": 150.569, "costBasis": 7980,
      "last": 164.84, "marketVal": 8737, "unrealPnL": 757, "unrealPct": 9.5,
      "stop": 151.50, "target": 220,
      "status": "HOLD — TIGHT STOP $151.50 — RAISE TO $153 WHEN CLEARS $160",
      "note": "Stop above cost. Raise to $153 when price clears $160 and holds."
    },
    {
      "ticker": "NOG", "name": "Northern Oil and Gas Inc", "shares": 80, "avgPrice": 24.383, "costBasis": 1951,
      "last": 26.71, "marketVal": 2137, "unrealPnL": 186, "unrealPct": 9.5,
      "stop": 23.92, "target": null,
      "status": "HOLD — STOP RAISED $22.50→$23.92 — JUST BELOW COST — Q1 APR 30",
      "note": "Stop raised S29-SUPP to $23.92 (just below cost $24.383). Peace deal → small loss, re-entry later. War continues → thesis intact. Q1 Apr 30. Weekend binary Pakistan talks."
    },
    {
      "ticker": "R3NK", "name": "RENK Group AG", "shares": 25, "avgPrice": 52.27, "costBasis": 1307,
      "last": 54.07, "marketVal": 1352, "unrealPnL": 45, "unrealPct": 3.4,
      "stop": 48, "stopType": "Stop Limit", "stopLimit": 47, "target": 76, "cur": "EUR",
      "status": "HOLD — STOP LIMIT €48/€47 GTC — EARNINGS MAY 6",
      "note": "€200M deferred orders must appear in Q1."
    },
    {
      "ticker": "ISRG", "name": "Intuitive Surgical Inc", "shares": 22, "avgPrice": 459.246, "costBasis": 10103,
      "last": 482.70, "marketVal": 10619, "unrealPnL": 516, "unrealPct": 5.1,
      "stop": 471.84, "target": 598,
      "status": "HOLD — STOP $471.84 GTC CONFIRMED — IBKR-CALCULATED LEVEL",
      "note": "Stop raised $468→$471.84 (IBKR-confirmed, equivalent to $472 intent). Logged per P16."
    },
    {
      "ticker": "CODA", "name": "Coda Octopus Group Inc", "shares": 416, "avgPrice": 12.005, "costBasis": 4994,
      "last": 12.19, "marketVal": 5071, "unrealPnL": 77, "unrealPct": 1.5,
      "stop": 11.51, "target": 22,
      "status": "HOLD — STOP $11.51 CONFIRMED PAGE 2 ORDERS — MINE CLEARANCE THESIS STRENGTHENING",
      "note": "Stop $11.51 confirmed active. Trump ordered shoot-and-kill on Iranian mine-laying vessels — direct CODA thesis confirmation. Waiting for CODA to be named as contractor in mine-clearing operations."
    },
    {
      "ticker": "IES", "name": "Invinity Energy Systems PLC", "shares": 3000, "avgPrice": 17.49, "costBasis": 525,
      "last": 18.00, "marketVal": 540, "unrealPnL": 15, "unrealPct": 2.9,
      "stop": null, "stopType": "MANUAL ALERT 12.5p", "target": 45, "cur": "GBP",
      "status": "HOLD — MANUAL ALERT 12.5p — LDES CAP & FLOOR DECISION IMMINENT",
      "note": "E15: no IBKR stops for AIM — manual alert only."
    },
    {
      "ticker": "RR", "name": "Rolls-Royce Holdings PLC", "shares": 100, "avgPrice": 1128.6, "costBasis": 1129,
      "last": 1129.40, "marketVal": 1129, "unrealPnL": 1, "unrealPct": 0.1,
      "stop": 1050, "target": 1500, "cur": "GBP",
      "status": "HOLD — STOP 1050p GTC",
      "note": "T27 re-entry S28 at 1128.6p. SMR/Wylfa + naval nuclear + Calpine adjacency. H1 Jul 30."
    },
    {
      "ticker": "V", "name": "Visa Inc-Class A Shares", "shares": 8, "avgPrice": 307.125, "costBasis": 2457,
      "last": 309.20, "marketVal": 2474, "unrealPnL": 17, "unrealPct": 0.7,
      "stop": 285, "target": 380,
      "status": "HOLD — ⚠️ EARNINGS TUESDAY APR 28 AMC",
      "note": "P24 decision: hold $285 stop. Visa earns on transaction VALUE not volume — war-premium oil prices = higher nominal transaction values = Visa tailwind."
    },
    {
      "ticker": "CGCT", "name": "Cartesian Growth Corp III", "shares": 291, "avgPrice": 10.295, "costBasis": 2996,
      "last": 10.32, "marketVal": 3003, "unrealPnL": 7, "unrealPct": 0.2,
      "stop": null, "target": null,
      "status": "HOLD — NO STOP (TRUST FLOOR ~$10.27)",
      "note": "Deal close ~May 2026. SPAC trust floor."
    },
    {
      "ticker": "PDYN", "name": "Palladyne AI Corp", "shares": 250, "avgPrice": 6.595, "costBasis": 1649,
      "last": 6.35, "marketVal": 1588, "unrealPnL": -61, "unrealPct": -3.7,
      "stop": 5.75, "target": null,
      "status": "HOLD — STOP $5.75 GTC — EARNINGS MAY 13",
      "note": "Small loss. May 13 earnings."
    },
    {
      "ticker": "ABBV", "name": "AbbVie Inc", "shares": 20, "avgPrice": 205.22, "costBasis": 4104,
      "last": 198.71, "marketVal": 3974, "unrealPnL": -130, "unrealPct": -3.2,
      "stop": 192.00, "target": 249,
      "status": "HOLD — STOP $192 GTC — ⚠️ EARNINGS WED APR 29 BMO — E14 DATE CORRECTED",
      "note": "E14 CORRECTION: ABBV reports Wednesday April 29 BEFORE the bell (BMO), NOT Tuesday April 28 AMC. $744M IPR&D charge = pipeline licensing payment, NOT impairment. EPS revised $2.56-2.60 Q1. Watch Skyrizi $4.4B quarterly. P24 hold $192 stop."
    },
    {
      "ticker": "LDO", "name": "Leonardo SpA", "shares": 35, "avgPrice": 56.086, "costBasis": 1963,
      "last": 51.96, "marketVal": 1819, "unrealPnL": -144, "unrealPct": -7.4,
      "stop": 50, "target": 76, "cur": "EUR",
      "status": "HOLD — STOP €50 GTC — Q1 MAY 5 — CLEARANCE 3.8% MONITOR",
      "note": "Day 9. -7.4%. Defence thesis intact. Q1 May 5. Stop €50 = 3.8% — tight."
    }
  ],
  "pendingOrders": [
    {"ticker": "ITM", "action": "SELL", "type": "Stop Limit", "qty": 1200, "stopPrice": 130, "limitPrice": 128, "tif": "GTC", "status": "ACTIVE", "cur": "GBP"},
    {"ticker": "ITM", "action": "SELL", "type": "Limit", "qty": 1200, "limitPrice": 172, "tif": "GTC", "status": "⚠️ NOT YET PLACED — MONDAY FIRST ACTION BEFORE 12:00 UAE", "cur": "GBP"},
    {"ticker": "CEG", "action": "BUY", "type": "Limit", "qty": 14, "limitPrice": 308.00, "tif": "GTC", "status": "PENDING PLACEMENT MONDAY — Stage 2 authorised S29-SUPP"},
    {"ticker": "CEG", "action": "SELL", "type": "Stop", "qty": 14, "stopPrice": 278.00, "tif": "GTC", "status": "PENDING — OCA with CEG BUY $308"},
    {"ticker": "SNPS", "action": "BUY", "type": "Limit", "qty": 8, "limitPrice": 495.00, "tif": "GTC", "status": "PENDING PLACEMENT MONDAY — Stage 2 authorised S29-SUPP"},
    {"ticker": "SNPS", "action": "SELL", "type": "Stop", "qty": 8, "stopPrice": 440.00, "tif": "GTC", "status": "PENDING — OCA with SNPS BUY $495"},
    {"ticker": "CRML", "action": "BUY", "type": "Limit", "qty": 40, "limitPrice": 10.00, "tif": "GTC", "status": "ACTIVE — OCA with stop $9.47"},
    {"ticker": "CRML", "action": "SELL", "type": "Stop", "qty": 40, "stopPrice": 9.47, "tif": "GTC", "status": "ACTIVE — OCA with CRML BUY $10"},
    {"ticker": "CRML", "action": "SELL", "type": "Stop", "qty": 110, "stopPrice": 9.47, "tif": "GTC", "status": "ACTIVE"},
    {"ticker": "ABBV", "action": "SELL", "type": "Stop", "qty": 20, "stopPrice": 192.00, "tif": "GTC", "status": "ACTIVE — EARNINGS WED APR 29 BMO"},
    {"ticker": "RR", "action": "SELL", "type": "Stop", "qty": 100, "stopPrice": 1050, "tif": "GTC", "status": "ACTIVE", "cur": "GBP"},
    {"ticker": "BKR", "action": "BUY", "type": "Limit", "qty": 8, "limitPrice": 58.50, "tif": "GTC", "status": "ACTIVE — ⚠️ RAISE TO $63 MONDAY (17.9% below market after Q1 beat)"},
    {"ticker": "BKR", "action": "SELL", "type": "Stop", "qty": 8, "stopPrice": 53.50, "tif": "GTC", "status": "ACTIVE — OCA (stays $53.50 when limit raised to $63)"},
    {"ticker": "GOOGL", "action": "BUY", "type": "Limit", "qty": 10, "limitPrice": 315.00, "tif": "GTC", "status": "ACTIVE — price ~$344, 9.3% above limit"},
    {"ticker": "GOOGL", "action": "SELL", "type": "Stop", "qty": 10, "stopPrice": 285.00, "tif": "GTC", "status": "ACTIVE — OCA"},
    {"ticker": "NOG", "action": "SELL", "type": "Stop", "qty": 80, "stopPrice": 23.92, "tif": "GTC", "status": "ACTIVE — RAISED FROM $22.50 — JUST BELOW COST $24.383"},
    {"ticker": "V", "action": "SELL", "type": "Stop", "qty": 8, "stopPrice": 285.00, "tif": "GTC", "status": "ACTIVE — EARNINGS TUE APR 28"},
    {"ticker": "MP", "action": "BUY", "type": "Limit", "qty": 75, "limitPrice": 55.00, "tif": "GTC", "status": "ACTIVE — 9.4% below $60.73 close — keep as-is"},
    {"ticker": "MP", "action": "SELL", "type": "Stop", "qty": 75, "stopPrice": 50.00, "tif": "GTC", "status": "ACTIVE — OCA"},
    {"ticker": "LDO", "action": "SELL", "type": "Stop", "qty": 35, "stopPrice": 50.00, "tif": "GTC", "status": "ACTIVE", "cur": "EUR"},
    {"ticker": "R3NK", "action": "SELL", "type": "Stop Limit", "qty": 25, "stopPrice": 48, "limitPrice": 47, "tif": "GTC", "status": "ACTIVE", "cur": "EUR"},
    {"ticker": "AMZN", "action": "SELL", "type": "Stop Limit", "qty": 30, "stopPrice": 234.39, "limitPrice": 224, "tif": "GTC", "status": "ACTIVE — EARNINGS APR 29"},
    {"ticker": "MSFT", "action": "SELL", "type": "Stop", "qty": 25, "stopPrice": 400.43, "tif": "GTC", "status": "ACTIVE — EARNINGS APR 29"},
    {"ticker": "ISRG", "action": "SELL", "type": "Stop", "qty": 22, "stopPrice": 471.84, "tif": "GTC", "status": "ACTIVE — CONFIRMED IBKR"},
    {"ticker": "VST", "action": "SELL", "type": "Stop", "qty": 53, "stopPrice": 151.50, "tif": "GTC", "status": "ACTIVE"},
    {"ticker": "CCJ", "action": "SELL", "type": "Stop", "qty": 49, "stopPrice": 114.99, "tif": "GTC", "status": "ACTIVE"},
    {"ticker": "PDYN", "action": "SELL", "type": "Stop", "qty": 250, "stopPrice": 5.75, "tif": "GTC", "status": "ACTIVE"},
    {"ticker": "AMPX", "action": "SELL", "type": "Stop", "qty": 168, "stopPrice": 17.53, "tif": "GTC", "status": "ACTIVE — VERIFY OCA WITH LIMIT $32"},
    {"ticker": "AMPX", "action": "SELL", "type": "Limit", "qty": 168, "limitPrice": 32.00, "tif": "GTC", "status": "ACTIVE — VERIFY OCA LINKAGE"},
    {"ticker": "CODA", "action": "SELL", "type": "Stop", "qty": 416, "stopPrice": 11.51, "tif": "GTC", "status": "ACTIVE — CONFIRMED PAGE 2 ORDERS"}
  ],
  "watchlistUS": [
    {"ticker": "CEG", "name": "Constellation Energy Corp", "status": "STAGE 2 DONE — BUY $308 GTC MONDAY", "note": "All 4 SI-48 tests pass. PEG 1.37. Price $313.53, -24% from $412.70 ATH. Stop $278 (below Apr 2 trough). 14sh. Max loss $420. Target $370. Catalyst: May 11 Q1. Key risk: Crane delay to 2031 = revenue deferred, NOT cancelled. Calpine FCF $2B+. 147M MWh uncontracted nuclear."},
    {"ticker": "SNPS", "name": "Synopsys Inc", "status": "STAGE 2 DONE — BUY $495 GTC MONDAY", "note": "Conditional pass. PEG 2.07x fails strict test but -23% drawdown + fully-priced China + $11.3B backlog + Nvidia $2B equity investment justify. 8sh. Stop $440. Max loss $440. Target $537. Catalyst: May 20 Q2."},
    {"ticker": "HPE", "name": "Hewlett Packard Enterprise", "status": "STAGE 2 DONE — WAIT JUN 2 Q2", "note": "All 4 SI-48 tests pass. fwd PE 11.7x, PEG 0.58. BUT analyst consensus $26 below current $28.16 and seasonal Q2 step-down approaching. Entry preferred post-Jun 2 Q2: $25-27, stop $23, 125-150sh."},
    {"ticker": "MRVL", "name": "Marvell Technology Inc", "status": "STAGE 2 DONE — VERIFY PRICE MONDAY → GTC $152", "note": "FY27 revenue ~$11B (40% growth). PEG ~1.06. Verify price Mon via MMD. If ~$160-165, place GTC $152 + stop $135 (10sh). Do not chase above $165 before Google ASIC confirmation."},
    {"ticker": "CRDO", "name": "Credo Technology Group", "status": "REASSESSED S29-SUPP — NEW TRIGGER $181.73", "note": "Entry at $159.70 missed — price ran to $194.69 (+22% in 9 days). Now -8.9% from ATH. P13 approaching. Key de-risk: Customer A concentration 67%→39%, 4 hyperscalers >10%, DustPhotonics acquisition. New SI-39 trigger: $181.73 (-15% from ATH $213.80)."},
    {"ticker": "BKR", "name": "Baker Hughes", "status": "ACTIVE — RAISE BUY $58.50 → $63 MONDAY", "note": "Q1 beat: EPS $0.58 vs $0.49 (+17.5%), record IET orders $4.9B. $58.50 now 17.9% below market — stale post-beat. Raise to $63. Stop $53.50 OCA stays."},
    {"ticker": "GOOGL", "name": "Alphabet Inc", "status": "ACTIVE — BUY $315 GTC — EARNINGS APR 29 AMC", "note": "SI-39 -21% from ATH. Price ~$344 — 9.3% above limit. Q1 earnings Apr 29 AMC."},
    {"ticker": "OXY", "name": "Occidental Petroleum", "status": "CONDITIONAL TRIGGERED — DECISION MONDAY", "note": "WTI $90+ for 6+ weeks — condition met. Price ~$57 (52wk $38.72-$67.45). FCF $6.1B baseline, $265M per $1 oil move. Berkshire 32% stake. IF no Pakistan breakthrough: 15sh @$57, stop $48, risk $135. Check Pakistan talks first."},
    {"ticker": "CDNS", "name": "Cadence Design Systems", "status": "WATCH — EARNINGS MON APR 27 AMC", "note": "SI-39 trigger $301.16. Earnings Monday AMC. If ≥7% dip from $332.89 close (~$309), review entry at $301.16."},
    {"ticker": "MU", "name": "Micron Technology", "status": "WAIT — RE-ENTRY TRIGGER $460", "note": "New ATH $506.99 hit April 24. Entry $440-445 missed. SK Hynix record profit confirmed AI memory structural shortage. Re-entry trigger $460 (old ATH support). SI-41: July 1 earnings outside 8-week window. Do not chase at $497."},
    {"ticker": "IBM", "name": "IBM Corp", "status": "WATCHLIST ONLY — SI-39 AT -35%", "note": "Beat/drop -7.8% on AI disruption concern. Add at -35% drawdown only."}
  ],
  "watchlistEU": [
    {"ticker": "IES.L", "name": "Invinity Energy Systems PLC", "status": "IN PORTFOLIO — E15 MANUAL 12.5p", "note": "LDES Cap & Floor decision imminent."},
    {"ticker": "ITM.L", "name": "ITM Power PLC", "status": "IN PORTFOLIO — 1,200sh Stop 130p/128p — 172p LIMIT PENDING MONDAY", "note": "172p GTC limit MUST be placed before 12:00 UAE Monday."},
    {"ticker": "RR.L", "name": "Rolls-Royce Holdings", "status": "IN PORTFOLIO — Stop 1050p", "note": "T27 re-entry 1128.6p. H1 Jul 30."},
    {"ticker": "R3NK", "name": "RENK Group AG", "status": "IN PORTFOLIO — Q1 MAY 6", "note": "€200M deferred orders key."},
    {"ticker": "LDO.MI", "name": "Leonardo SpA", "status": "IN PORTFOLIO — Stop €50 — CLEARANCE 3.8% MONITOR", "note": "Q1 May 5. Tight stop."},
    {"ticker": "ENR.DE", "name": "Siemens Energy AG", "status": "SKIP — AWAIT -20% CORRECTION (~€115)"}
  ],
  "sessionNotes": [
    {"date": "2026-04-17", "note": "SESSION 23 — LNG stopped. NOG filled. Journal v32."},
    {"date": "2026-04-19", "note": "SESSION 24 — Hormuz re-closed. NOG sell cancelled. SI-47/48. AI thesis Stage 1. Journal v35."},
    {"date": "2026-04-20", "note": "SESSION 25 — IES.L filled. NOG stop $22.50 live. WTI $88.36. Journal v37."},
    {"date": "2026-04-21", "note": "SESSION 26 — ABVX stopped -$158. LDO filled. GOOGL+BKR live. Journal v38."},
    {"date": "2026-04-22", "note": "SESSION 27 — RR.L stopped 1150p. RR.L BUY 1120p placed. ABBV filled. Journal v39."},
    {"date": "2026-04-23", "note": "SESSION 28 — RR.L filled 1128.6p. V filled $307.125. Stop raises CCJ/CRML/LLY. BKR Q1 beat. Journal v40."},
    {"date": "2026-04-24", "note": "SESSION 29 — ITM trim 800sh 141.2p (+£608.80). V/ABBV P24 holds. WTI ~$97-98. Journal v41. LLY stopped post-close at $875.54 (-$89.41)."},
    {"date": "2026-04-25", "note": "SESSION 29 SUPP (Saturday research) — Full scan. LLY stop-out confirmed. Stops: ISRG $471.84, NOG $23.92. Stage 2s: CEG (ENTRY AUTH $308), HPE (wait Jun 2), SNPS (ENTRY AUTH $495), CRDO (reassessed - no entry, new trigger $181.73), MRVL (watchlist, GTC $152 Mon). OXY conditional triggered. BKR raise $63 Mon. ABBV date corrected: Wed Apr 29 BMO. WTI ~$94-95. Weekend binary Pakistan talks. Journal v42."}
  ],
  "tradeTracker": {
    "pendingRows": [
      {"id": 1, "ticker": "AVAV", "shares": 25, "entryPrice": 195.09, "exitPrice": 197.945, "pnl": "+$71.38", "session": "S20"},
      {"id": 2, "ticker": "ITM TRIM 1", "shares": 1100, "entryPrice": "65.1p", "exitPrice": "124.60p", "pnl": "+£652", "session": "S22"},
      {"id": 3, "ticker": "LNG", "shares": 19, "entryPrice": 268.76, "exitPrice": 248.00, "pnl": "-$396.54", "session": "S23"},
      {"id": 4, "ticker": "PATK", "shares": 25, "entryPrice": 108.80, "exitPrice": 109.256, "pnl": "+$9.34", "session": "S23"},
      {"id": 5, "ticker": "NOG", "note": "Market sell cancelled S24 — position held", "session": "S24"},
      {"id": 6, "ticker": "ABVX", "shares": 44, "entryPrice": 117.913, "exitPrice": 114.26, "pnl": "-$158.53", "session": "S26"},
      {"id": 7, "ticker": "RR", "shares": 150, "entryPrice": "1182.9p", "exitPrice": "1150p", "pnl": "-£49.35", "session": "S27", "cur": "GBP", "note": "Stop-out. Re-entry S28 at 1128.6p."},
      {"id": 8, "ticker": "ITM TRIM 2", "shares": 800, "entryPrice": "65.1p", "exitPrice": "141.2p", "pnl": "+£608.80", "session": "S29", "cur": "GBP", "note": "Second trim. Position reduced to 1,200sh."},
      {"id": 9, "ticker": "LLY", "shares": 3, "entryPrice": 905.344, "exitPrice": 875.54, "pnl": "-$89.41", "session": "S29-post", "note": "Stop $875.86 triggered at $875.54 post-S29 file write. Slippage $0.32/sh."}
    ]
  },
  "standingInstructions": [
    {"id": 1, "title": "TIMEZONE — MANDATORY ARITHMETIC BEFORE MARKET STATUS", "body": "BEFORE stating any market is open or closed: write UAE time now = X. NYSE closes 00:00 UAE (midnight). Is X before 00:00? If yes = OPEN. LSE closes 19:30 UAE. XETRA closes 19:00 UAE. COMPUTE — NEVER RECALL. NYSE opens 17:30 UAE. LSE opens 12:00 UAE. XETRA opens 11:00 UAE."},
    {"id": 17, "title": "ERROR TAXONOMY — 15 TYPES", "body": "E1: Timezone COMPUTE. E2: Stale position. E3: Fill re-flag. E4: Price verification. E5: Market timing. E6: Dividend capture. E7: Session discipline. E8: Stale quote. E9: GTC orphan. E10: Closed position scan. E11: 52wk hallucination. E12: Tool routing gap. E13: EODHD delay. E14: Date discrepancy (S29-SUPP example: ABBV stated Tue Apr 28 AMC — correct is Wed Apr 29 BMO). E15: AIM stop limitation."},
    {"id": 25, "title": "SI-25 EXIT TRIGGER", "body": "Permanent Hormuz reopening + WTI -10% from $111.54 peak = trigger at $100.38. WTI Fri close ~$94-95. Gap ~$6. NOT TRIGGERED. Weekend Pakistan talks = live binary. Indefinite ceasefire extension is NOT SI-25 trigger."},
    {"id": 47, "title": "SI-47: DATE VERIFICATION — STEP ZERO", "body": "System prompt date is authoritative. State date before any analysis. Non-negotiable."},
    {"id": 48, "title": "SI-48: AI THESIS ATH RULE", "body": "Four tests: (1) fwd PE below sector or PEG<1.5, (2) structural catalyst multi-year backlog, (3) no multiple expansion required, (4) PLTR P6 test. S29-SUPP: CEG pass all 4. SNPS borderline pass. HPE pass (wait Jun 2). CRDO entry missed — price ran through drawdown trigger."},
    {"id": 51, "title": "SI-51 v2: TIER 3 WEIGHTED JUDGEMENT", "body": "Entry requires net ≥+3 AND all hard blocks clear."},
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
    "confirmed": "2026-04-25 SESSION 29 SUPP",
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
        .btn { background: ${COLORS.card}; border: 1px solid ${COLORS.border}; color: ${COLORS.text}; padding: 6px 12px; border-radius: 4px; cursor: pointer; font-family: monospace; font-size: 12px; }
        .btn:hover { background: #21262d; }
        .btn-primary { background: rgba(88,166,255,0.15); border-color: rgba(88,166,255,0.4); color: ${COLORS.accent}; }
        input { background: ${COLORS.card}; border: 1px solid ${COLORS.border}; color: ${COLORS.text}; padding: 8px; border-radius: 4px; font-family: monospace; font-size: 12px; flex: 1; }
      `}</style>

      <div style={{ marginBottom: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8 }}>
          <div>
            <div style={{ fontSize: 18, fontWeight: 700, color: COLORS.textBright }}>CLAUDE FUND — JOURNAL v42</div>
            <div style={{ fontSize: 11, color: COLORS.textDim, marginTop: 2 }}>Session {data.sessionNumber} | {data.fund.account} | {data.lastUpdated}</div>
          </div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {[
              { label: "NET LIQ", val: `$${(data.fund.netLiquidity/1000).toFixed(1)}K` },
              { label: "UNREAL", val: `+$${(data.fund.unrealizedPnL/1000).toFixed(1)}K`, color: COLORS.green },
              { label: "POSITIONS", val: "18", color: COLORS.textBright },
              { label: "WTI", val: `$${data.thesis.oilWTI}`, color: COLORS.yellow }
            ].map(m => (
              <div key={m.label} className="card" style={{ textAlign: "center", minWidth: 80 }}>
                <div style={{ fontSize: 9, color: COLORS.textDim }}>{m.label}</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: m.color || COLORS.textBright, marginTop: 2 }}>{m.val}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ marginTop: 6, padding: "6px 10px", background: "rgba(248,81,73,0.1)", border: "1px solid rgba(248,81,73,0.3)", borderRadius: 4, fontSize: 11, color: COLORS.red }}>
          ⚠️ ITM 172p GTC NOT PLACED | ⚠️ CEG $308 + SNPS $495 PENDING | ⚠️ BKR RAISE $63 | ⚠️ WEEKEND BINARY: US-IRAN PAKISTAN TALKS | ⚠️ V APR 28 + ABBV APR 29 BMO
        </div>
        <div style={{ marginTop: 4, padding: "6px 10px", background: "rgba(63,185,80,0.1)", border: "1px solid rgba(63,185,80,0.3)", borderRadius: 4, fontSize: 11, color: COLORS.green }}>
          ✅ LLY stopped out -$89.41 (logged row 9) | ✅ ISRG stop $471.84 | ✅ NOG stop $23.92 | ✅ CODA stop confirmed | ✅ 5 Stage 2s complete
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
                          p.status?.includes("NOT PLACED") ? `3px solid ${COLORS.red}` : undefined
            }}>
              <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap", marginBottom: 6 }}>
                <span style={{ fontWeight: 700, fontSize: 14, color: COLORS.textBright }}>{p.ticker}</span>
                <span style={{ fontSize: 11, color: COLORS.textDim }}>{p.name}</span>
                {p.cur && <span className="badge badge-grey">{p.cur}</span>}
                {p.status?.includes("EARNINGS") && <span className="badge badge-amber">EARNINGS</span>}
                {p.status?.includes("RAISED") && <span className="badge badge-blue">STOP RAISED</span>}
                {p.status?.includes("CONFIRMED") && <span className="badge badge-green">CONFIRMED</span>}
                {p.status?.includes("NOT PLACED") && <span className="badge badge-red">ORDER PENDING</span>}
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
            <div key={i} className="card" style={{ borderLeft: `3px solid ${o.status?.includes("NOT YET") || o.status?.includes("PENDING PLACEMENT") ? COLORS.red : o.status?.includes("RAISE") ? COLORS.yellow : o.action === "BUY" ? COLORS.green : COLORS.red}` }}>
              <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap", marginBottom: 4 }}>
                <span style={{ fontWeight: 700 }}>{o.ticker}</span>
                <span className={`badge ${o.action === "BUY" ? "badge-green" : "badge-red"}`}>{o.action}</span>
                <span className="badge badge-grey">{o.type}</span>
                <span style={{ fontSize: 11 }}>Qty: <b>{o.qty}</b></span>
                {o.limitPrice && <span style={{ fontSize: 11 }}>Limit: <b>{o.limitPrice}</b></span>}
                {o.stopPrice && <span style={{ fontSize: 11 }}>Stop: <b>{o.stopPrice}</b></span>}
                <span className={`badge ${o.status?.includes("NOT YET") || o.status?.includes("PENDING PLACEMENT") ? "badge-red" : o.status?.includes("RAISE") ? "badge-amber" : "badge-green"}`}>{o.status?.substring(0,50)}</span>
              </div>
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
          <div style={{ fontSize: 12, fontWeight: 600, color: COLORS.accent, marginBottom: 8 }}>KEY DATES & ACTIONS</div>
          {data.thesis.keyDates?.map((d, i) => (
            <div key={i} className="card" style={{ marginBottom: 6, borderLeft: `3px solid ${d.priority === "CRITICAL" ? COLORS.red : COLORS.yellow}` }}>
              <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <span style={{ fontSize: 11, fontWeight: 600, minWidth: 180, color: COLORS.textBright }}>{d.date}</span>
                <span style={{ fontSize: 11, color: COLORS.textDim, flex: 1 }}>{d.event}</span>
                <span className={`badge ${d.priority === "CRITICAL" ? "badge-red" : d.priority === "DONE" ? "badge-green" : "badge-amber"}`}>{d.priority}</span>
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
                <span className={`badge ${w.status?.includes("BUY") || w.status?.includes("ENTRY") ? "badge-red" : w.status?.includes("WAIT") || w.status?.includes("VERIFY") || w.status?.includes("DECISION") ? "badge-amber" : w.status?.includes("REASSESSED") || w.status?.includes("NEW TRIGGER") ? "badge-grey" : "badge-green"}`}>{w.status?.substring(0,50)}</span>
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
        <span style={{ fontSize: 10, color: COLORS.textDim }}>JOURNAL v42 // SESSION 29-SUPP // {data.fund.account} // NL $105.7K // 18 POSITIONS</span>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <span className="badge badge-red">ITM 172p PENDING</span>
          <span className="badge badge-red">CEG $308 PENDING</span>
          <span className="badge badge-red">SNPS $495 PENDING</span>
          <span className="badge badge-amber">V APR 28 + ABBV APR 29 BMO</span>
          <span className="badge badge-amber">WTI $94-95 — PAKISTAN BINARY</span>
        </div>
      </div>
    </div>
  );
}
