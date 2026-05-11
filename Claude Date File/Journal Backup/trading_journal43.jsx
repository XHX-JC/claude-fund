import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "fund_journal_v3";

// ═══════════════════════════════════════════════════════════════════
// SESSION CLOSE CHECKLIST — CLAUDE EXECUTES AT EVERY SESSION END
// filesystem:write_file → journal, FUND_SESSION_STATE.md, LESSONS_LEARNED.md
// Allowed paths: C:\Users\jcadb\claude-fund\
// ═══════════════════════════════════════════════════════════════════
// TIMEZONE REFERENCE — MANDATORY
// Dubai = UTC+4 year-round (no DST)
// NYSE: opens 17:30 UAE / closes 00:00 UAE
// LSE:  opens 12:00 UAE / closes 19:30 UAE
// XETRA/BVME: opens 11:00 UAE / closes 19:00 UAE
// ═══════════════════════════════════════════════════════════════════

const INITIAL_STATE = {
  "lastUpdated": "2026-04-26 RESEARCH DAY (S29-SUPP+1) — Pre-S30 journal v43",
  "sessionNumber": "Research-26Apr",
  "fund": {
    "account": "U24936508",
    "netLiquidity": 105700,
    "unrealizedPnL": 7468.51,
    "realizedPnL": 819.68,
    "cashBase": 27669,
    "cashUSD": 34943,
    "cashFloorRule": "10% of NL = $10,570 minimum. NEVER go below.",
    "deployableCash": 17100,
    "deployableCashNote": "~$17,100 gross. Net ~$7,308 after CEG $4,312 + SNPS $3,960 + MRVL $1,520 pending.",
    "broker": "IBKR Pro",
    "baseCurrency": "USD",
    "location": "UAE",
    "ibkrEuropeanAccess": "APPROVED — March 26 2026",
    "lastUpdated": "2026-04-26 Research Day. NL $105,700. 18 positions confirmed IBKR screenshot. Full SI-45 + MRVL Stage 2 + 8-name discovery scan complete. Tracker reconciled S23-S29. New watchlist: LDOS, LEU (P11), MCHP, TTD, MOH, INCY, ALGN, NXPI.",
    "note": "JOURNAL v43. Sunday 26 Apr 2026 research session. 18 positions. Tracker gap S23-S29 closed. LEU P11 active. All Monday S30 orders queued."
  },
  "thesis": {
    "title": "DUAL BLOCKADE — PAKISTAN TALKS FAILED WEEKEND — CEASEFIRE EXTENDED — WTI $94.40",
    "summary": "Second-round Pakistan talks (Apr 25-26) produced no deal. Araghchi met Pakistan PM Sharif Sat Apr 25, Trump cancelled envoys then Iran sent 'much better proposal.' Araghchi returns Pakistan Sunday before heading to Moscow. Ceasefire extended indefinitely. Hormuz dual blockade continues: US naval blockade Iranian ports + Iran controls Strait. WTI $94.40 Fri close. Gap to SI-25 trigger $100.38 = ~$6. War premium intact. NOG/CODA thesis solid.",
    "oilWTI": 94.40,
    "oilWTINote": "WTI Fri close $94.40. Gap to SI-25 trigger $100.38 ~$6. Pulled back from $97-98 peak on diplomacy hopes. Pakistan talks produced no deal — WTI may recover Monday.",
    "hormuzStatus": "DUAL BLOCKADE ACTIVE. US seizing Iranian tankers. Iran seizing cargo ships. Mine-clearing ops active — CODA thesis confirmed. BBC investigation: systematic trading BEFORE Trump oil announcements — T17 reinforced.",
    "keyDates": [
      {"date": "Mon Apr 27 STEP ZERO", "event": "State date. SI-47 non-negotiable.", "priority": "CRITICAL"},
      {"date": "Mon Apr 27 CHECK FIRST", "event": "Pakistan talks weekend outcome — check before any NOG/OIL order.", "priority": "CRITICAL"},
      {"date": "Mon Apr 27 before 12:00 UAE", "event": "ITM 172p GTC SELL 1,200sh — OUTSTANDING SINCE S29", "priority": "CRITICAL"},
      {"date": "Mon Apr 27 at open", "event": "CEG BUY $308 GTC + stop $278 (14sh OCA) — Stage 2 authorised", "priority": "CRITICAL"},
      {"date": "Mon Apr 27 at open", "event": "SNPS BUY $495 GTC + stop $440 (8sh OCA) — Stage 2 authorised", "priority": "CRITICAL"},
      {"date": "Mon Apr 27 at 17:30 UAE", "event": "BKR raise limit $58.50 to $63 (stop $53.50 stays)", "priority": "HIGH"},
      {"date": "Mon Apr 27 at 17:30 UAE", "event": "Verify MRVL via MMD. If $160-165 — GTC $152 + stop $135 (10sh). Google ASIC confirmed. SI-48 all 4 tests passed.", "priority": "HIGH"},
      {"date": "Mon Apr 27 at 17:30 UAE", "event": "VST stop raise $151.50 to $153 if price still above $160", "priority": "HIGH"},
      {"date": "Mon Apr 27 at 17:30 UAE", "event": "AMPX OCA verify: stop $17.53 + limit $32 both active and linked", "priority": "HIGH"},
      {"date": "Mon Apr 27", "event": "SI-45 weekly screener. ATH table MUST be updated — MU/VRT/ETN/GEV/ANET/AVGO all above S24 reference levels.", "priority": "HIGH"},
      {"date": "Mon Apr 27 AMC", "event": "CDNS Q1 — consensus EPS $1.89. Beat likely. Watch for 7%+ dip from $332.89 (~$309) → SI-39 entry $301.16.", "priority": "HIGH"},
      {"date": "Mon Apr 27 RESEARCH", "event": "LDOS Stage 2: Entrust $2.4B acquisition leverage check before GTC $143 + stop $136 (45sh)", "priority": "HIGH"},
      {"date": "Tue Apr 28 AMC", "event": "V earnings — 8sh held. Consensus EPS $3.09. Stop $285. P24 hold.", "priority": "CRITICAL"},
      {"date": "Wed Apr 29 BMO", "event": "ABBV Q1 — WEDNESDAY BEFORE OPEN (E14 corrected). Consensus EPS $2.69, Skyrizi $4.41B. Stop $192.", "priority": "CRITICAL"},
      {"date": "Wed Apr 29 AMC", "event": "AMZN Q1 — AWS growth key. Consensus EPS $1.63. Stop $234.39.", "priority": "CRITICAL"},
      {"date": "Wed Apr 29 AMC", "event": "MSFT Q3 — Azure CC growth guided 37-38%. Fairwater live ahead of schedule. Stop $400.43.", "priority": "CRITICAL"},
      {"date": "Thu Apr 30", "event": "NOG Q1 at war-premium WTI. Stop $23.92 (raised from $22.50).", "priority": "HIGH"},
      {"date": "May 5", "event": "LDO.MI Q1 — stop 50 EUR, clearance 3.8% TIGHT. LDOS Q1 — Stage 2 catalyst gate.", "priority": "HIGH"},
      {"date": "May 6", "event": "R3NK Q1 — 200M EUR deferred orders must appear.", "priority": "HIGH"},
      {"date": "May 7", "event": "AMPX Q1. Stop $17.53.", "priority": "HIGH"},
      {"date": "May 11", "event": "CEG Q1 earnings — catalyst gate. Also MCHP earnings (P13 blocked, SI-39 trigger $75.81 if miss).", "priority": "HIGH"},
      {"date": "May 20", "event": "SNPS Q2 FY26 — catalyst gate.", "priority": "HIGH"},
      {"date": "May 28", "event": "MRVL Q1 FY27 earnings — catalyst gate. Google ASIC confirmed.", "priority": "HIGH"},
      {"date": "Jun 2", "event": "HPE Q2 FY26 — entry review gate.", "priority": "HIGH"}
    ]
  },
  "positions": [
    {
      "ticker": "ITM", "name": "ITM Power PLC", "shares": 1200, "avgPrice": 65.1, "costBasis": 781,
      "last": 154.80, "marketVal": 1858, "unrealPnL": 1077, "unrealPct": 137.8,
      "stop": 130, "stopType": "Stop Limit", "stopLimit": 128, "target": 172, "cur": "GBP",
      "status": "HOLD — STOP LIMIT 130p/128p GTC — 172p GTC LIMIT NOT PLACED — MONDAY ACTION #1",
      "note": "1,200sh after 2 trims (Trim1: 1100sh @124.6p S22; Trim2: 800sh @141.2p S29). 172p GTC limit MUST be placed before LSE open 12:00 UAE Monday. Outstanding since S29."
    },
    {
      "ticker": "AMZN", "name": "Amazon.com Inc", "shares": 30, "avgPrice": 201.204, "costBasis": 6036,
      "last": 264.22, "marketVal": 7927, "unrealPnL": 1891, "unrealPct": 31.3,
      "stop": 234.39, "stopType": "Stop Limit", "stopLimit": 224, "target": 300,
      "status": "HOLD — EARNINGS WED APR 29 AMC — DO NOT TOUCH STOP",
      "note": "AWS growth rate key. Polymarket 93% beat probability. If AWS 28%+ raise stop to $242-245 post-results."
    },
    {
      "ticker": "CRML", "name": "Critical Metals Corp", "shares": 110, "avgPrice": 9.08, "costBasis": 999,
      "last": 11.36, "marketVal": 1250, "unrealPnL": 251, "unrealPct": 25.1,
      "stop": 9.47, "target": 15,
      "status": "HOLD — STOP $9.47 GTC — ADD ORDER $10.00 GTC LIVE (OCA)",
      "note": "Add order: BUY 40sh @$10.00 GTC OCA with stop $9.47. US EXIM $620M interest. Tanbreez Greenland."
    },
    {
      "ticker": "AMPX", "name": "Amprius Technologies", "shares": 168, "avgPrice": 18.106, "costBasis": 3042,
      "last": 20.82, "marketVal": 3498, "unrealPnL": 456, "unrealPct": 14.1,
      "stop": 17.53, "target": 32,
      "status": "HOLD — STOP $17.53 GTC — VERIFY OCA WITH LIMIT $32 MONDAY — EARNINGS MAY 7",
      "note": "Stop below cost intentional pre-earnings. Verify OCA linkage Monday."
    },
    {
      "ticker": "CCJ", "name": "Cameco Corp", "shares": 49, "avgPrice": 104.021, "costBasis": 5097,
      "last": 122.15, "marketVal": 5985, "unrealPnL": 888, "unrealPct": 17.4,
      "stop": 114.99, "target": 136,
      "status": "HOLD — STOP $114.99 GTC (raised S28 from $108.37 — profit-locked)",
      "note": "Nuclear thesis intact. +17.4%."
    },
    {
      "ticker": "MSFT", "name": "Microsoft Corp", "shares": 25, "avgPrice": 372.77, "costBasis": 9319,
      "last": 423.88, "marketVal": 10597, "unrealPnL": 1278, "unrealPct": 13.7,
      "stop": 400.43, "target": 450,
      "status": "HOLD — EARNINGS WED APR 29 AMC — DO NOT TOUCH STOP",
      "note": "Azure CC growth guided 37-38%. Fairwater data centre live ahead of schedule. Stop $400.43 profit-locked."
    },
    {
      "ticker": "VST", "name": "Vistra Corp", "shares": 53, "avgPrice": 150.569, "costBasis": 7980,
      "last": 164.84, "marketVal": 8737, "unrealPnL": 757, "unrealPct": 9.5,
      "stop": 151.50, "target": 220,
      "status": "HOLD — RAISE STOP $151.50 TO $153 MONDAY (VST above $160 trigger met Fri close)",
      "note": "Stop raise trigger: VST above $160. Fri close $164.84 confirmed. Raise stop Monday at session open."
    },
    {
      "ticker": "NOG", "name": "Northern Oil and Gas Inc", "shares": 80, "avgPrice": 24.383, "costBasis": 1951,
      "last": 26.71, "marketVal": 2137, "unrealPnL": 186, "unrealPct": 9.5,
      "stop": 23.92, "target": null,
      "status": "HOLD — STOP $23.92 GTC — CHECK PAKISTAN TALKS BEFORE ANY MONDAY OIL ORDER — Q1 APR 30",
      "note": "Stop $23.92 just below cost $24.383. Peace deal = small loss then re-entry. War continues = thesis intact."
    },
    {
      "ticker": "R3NK", "name": "RENK Group AG", "shares": 25, "avgPrice": 52.27, "costBasis": 1307,
      "last": 54.07, "marketVal": 1352, "unrealPnL": 45, "unrealPct": 3.4,
      "stop": 48, "stopType": "Stop Limit", "stopLimit": 47, "target": 76, "cur": "EUR",
      "status": "HOLD — STOP LIMIT 48/47 EUR GTC — EARNINGS MAY 6",
      "note": "200M EUR deferred orders must appear in Q1. -4.99% Fri but stop clearance 11.3% adequate."
    },
    {
      "ticker": "ISRG", "name": "Intuitive Surgical Inc", "shares": 22, "avgPrice": 459.246, "costBasis": 10103,
      "last": 482.70, "marketVal": 10619, "unrealPnL": 516, "unrealPct": 5.1,
      "stop": 471.84, "target": 598,
      "status": "HOLD — STOP $471.84 GTC CONFIRMED IBKR",
      "note": "Stop raised $468 to $471.84 (IBKR-calculated, S29-SUPP). Logged per P16."
    },
    {
      "ticker": "CODA", "name": "Coda Octopus Group Inc", "shares": 416, "avgPrice": 12.005, "costBasis": 4994,
      "last": 12.19, "marketVal": 5071, "unrealPnL": 77, "unrealPct": 1.5,
      "stop": 11.51, "target": 22,
      "status": "HOLD — STOP $11.51 CONFIRMED — MINE CLEARANCE THESIS ACTIVATING",
      "note": "Trump ordered shoot-and-kill on Iranian mine-laying vessels. US mine-clearing ops active since Apr 11."
    },
    {
      "ticker": "IES", "name": "Invinity Energy Systems PLC", "shares": 3000, "avgPrice": 17.49, "costBasis": 525,
      "last": 18.00, "marketVal": 540, "unrealPnL": 15, "unrealPct": 2.9,
      "stop": null, "stopType": "MANUAL ALERT 12.5p", "target": 45, "cur": "GBP",
      "status": "HOLD — E15: NO IBKR STOPS FOR AIM — MANUAL ALERT 12.5p",
      "note": "LDES Cap and Floor policy decision imminent. Target 45p."
    },
    {
      "ticker": "RR", "name": "Rolls-Royce Holdings PLC", "shares": 100, "avgPrice": 1128.6, "costBasis": 1129,
      "last": 1129.40, "marketVal": 1129, "unrealPnL": 1, "unrealPct": 0.1,
      "stop": 1050, "target": 1500, "cur": "GBP",
      "status": "HOLD — STOP 1050p GTC — H1 JUL 30",
      "note": "T27 re-entry 100sh @1128.6p (S28). Original 150sh stopped at 1150p (S27, trade #19 tracker). SMR/Wylfa + naval + civil aero thesis."
    },
    {
      "ticker": "V", "name": "Visa Inc-Class A", "shares": 8, "avgPrice": 307.125, "costBasis": 2457,
      "last": 309.20, "marketVal": 2474, "unrealPnL": 17, "unrealPct": 0.7,
      "stop": 285, "target": 380,
      "status": "HOLD — EARNINGS TUE APR 28 AMC — P24 HOLD $285 STOP",
      "note": "Visa earns on transaction VALUE not volume. War-premium oil = higher nominal values = tailwind. Consensus EPS $3.09 +12% YoY."
    },
    {
      "ticker": "CGCT", "name": "Cartesian Growth Corp III", "shares": 291, "avgPrice": 10.295, "costBasis": 2996,
      "last": 10.32, "marketVal": 3003, "unrealPnL": 7, "unrealPct": 0.2,
      "stop": null, "target": null,
      "status": "HOLD — NO STOP — SPAC TRUST FLOOR ~$10.27",
      "note": "Business combination ~May 2026 — FAC listing. Trust floor protection."
    },
    {
      "ticker": "PDYN", "name": "Palladyne AI Corp", "shares": 250, "avgPrice": 6.595, "costBasis": 1649,
      "last": 6.35, "marketVal": 1588, "unrealPnL": -61, "unrealPct": -3.7,
      "stop": 5.75, "target": null,
      "status": "HOLD — STOP $5.75 GTC — EARNINGS MAY 13",
      "note": "250sh remaining (250 partially exited S18 at $6.67 +$17.42 — tracker trade #13)."
    },
    {
      "ticker": "ABBV", "name": "AbbVie Inc", "shares": 20, "avgPrice": 205.22, "costBasis": 4104,
      "last": 198.71, "marketVal": 3974, "unrealPnL": -130, "unrealPct": -3.2,
      "stop": 192.00, "target": 249,
      "status": "HOLD — STOP $192 GTC — EARNINGS WED APR 29 BMO — E14 CORRECTED",
      "note": "E14: ABBV reports Wednesday April 29 BEFORE bell (BMO). Consensus $2.69 EPS, Skyrizi $4.41B. IPR&D $744M is pipeline licensing not impairment."
    },
    {
      "ticker": "LDO", "name": "Leonardo SpA", "shares": 35, "avgPrice": 56.086, "costBasis": 1963,
      "last": 51.96, "marketVal": 1819, "unrealPnL": -144, "unrealPct": -7.4,
      "stop": 50, "target": 76, "cur": "EUR",
      "status": "HOLD — STOP 50 EUR GTC — CLEARANCE 3.8% TIGHT — Q1 MAY 5",
      "note": "T2 (35sh). Stop 50 EUR = 3.8% clearance extremely tight. Land defence acquisition confirmed positive thesis. Do NOT widen stop reactively. If triggered P11 applies."
    }
  ],
  "pendingOrders": [
    {"ticker": "ITM", "action": "SELL", "type": "Stop Limit", "qty": 1200, "stopPrice": 130, "limitPrice": 128, "tif": "GTC", "status": "ACTIVE", "cur": "GBP"},
    {"ticker": "ITM", "action": "SELL", "type": "Limit", "qty": 1200, "limitPrice": 172, "tif": "GTC", "status": "NOT YET PLACED — MONDAY ACTION #1 BEFORE 12:00 UAE", "cur": "GBP"},
    {"ticker": "CEG", "action": "BUY", "type": "Limit", "qty": 14, "limitPrice": 308.00, "tif": "GTC", "status": "PENDING PLACEMENT MONDAY — Stage 2 authorised"},
    {"ticker": "CEG", "action": "SELL", "type": "Stop", "qty": 14, "stopPrice": 278.00, "tif": "GTC", "status": "PENDING — OCA with CEG BUY $308"},
    {"ticker": "SNPS", "action": "BUY", "type": "Limit", "qty": 8, "limitPrice": 495.00, "tif": "GTC", "status": "PENDING PLACEMENT MONDAY — Stage 2 authorised"},
    {"ticker": "SNPS", "action": "SELL", "type": "Stop", "qty": 8, "stopPrice": 440.00, "tif": "GTC", "status": "PENDING — OCA with SNPS BUY $495"},
    {"ticker": "MRVL", "action": "BUY", "type": "Limit", "qty": 10, "limitPrice": 152.00, "tif": "GTC", "status": "PENDING — Verify price via MMD at 17:30 UAE Monday. If $160-165 place GTC $152. Google ASIC confirmed. SI-48 all 4 tests passed."},
    {"ticker": "MRVL", "action": "SELL", "type": "Stop", "qty": 10, "stopPrice": 135.00, "tif": "GTC", "status": "PENDING — OCA with MRVL BUY $152"},
    {"ticker": "CRML", "action": "BUY", "type": "Limit", "qty": 40, "limitPrice": 10.00, "tif": "GTC", "status": "ACTIVE — OCA with stop $9.47"},
    {"ticker": "CRML", "action": "SELL", "type": "Stop", "qty": 40, "stopPrice": 9.47, "tif": "GTC", "status": "ACTIVE — OCA with CRML BUY $10"},
    {"ticker": "CRML", "action": "SELL", "type": "Stop", "qty": 110, "stopPrice": 9.47, "tif": "GTC", "status": "ACTIVE"},
    {"ticker": "ABBV", "action": "SELL", "type": "Stop", "qty": 20, "stopPrice": 192.00, "tif": "GTC", "status": "ACTIVE — EARNINGS WED APR 29 BMO"},
    {"ticker": "RR", "action": "SELL", "type": "Stop", "qty": 100, "stopPrice": 1050, "tif": "GTC", "status": "ACTIVE", "cur": "GBP"},
    {"ticker": "BKR", "action": "BUY", "type": "Limit", "qty": 8, "limitPrice": 63.00, "tif": "GTC", "status": "RAISE FROM $58.50 TO $63 MONDAY — Q1 beat, $58.50 now 17.9% below market"},
    {"ticker": "BKR", "action": "SELL", "type": "Stop", "qty": 8, "stopPrice": 53.50, "tif": "GTC", "status": "ACTIVE — OCA stays $53.50 when limit raised to $63"},
    {"ticker": "GOOGL", "action": "BUY", "type": "Limit", "qty": 10, "limitPrice": 315.00, "tif": "GTC", "status": "ACTIVE — price ~$344, 9.3% above limit"},
    {"ticker": "GOOGL", "action": "SELL", "type": "Stop", "qty": 10, "stopPrice": 285.00, "tif": "GTC", "status": "ACTIVE — OCA"},
    {"ticker": "NOG", "action": "SELL", "type": "Stop", "qty": 80, "stopPrice": 23.92, "tif": "GTC", "status": "ACTIVE — RAISED FROM $22.50"},
    {"ticker": "V", "action": "SELL", "type": "Stop", "qty": 8, "stopPrice": 285.00, "tif": "GTC", "status": "ACTIVE — EARNINGS TUE APR 28 AMC"},
    {"ticker": "MP", "action": "BUY", "type": "Limit", "qty": 75, "limitPrice": 55.00, "tif": "GTC", "status": "ACTIVE"},
    {"ticker": "MP", "action": "SELL", "type": "Stop", "qty": 75, "stopPrice": 50.00, "tif": "GTC", "status": "ACTIVE — OCA"},
    {"ticker": "LDO", "action": "SELL", "type": "Stop", "qty": 35, "stopPrice": 50.00, "tif": "GTC", "status": "ACTIVE", "cur": "EUR"},
    {"ticker": "R3NK", "action": "SELL", "type": "Stop Limit", "qty": 25, "stopPrice": 48, "limitPrice": 47, "tif": "GTC", "status": "ACTIVE", "cur": "EUR"},
    {"ticker": "AMZN", "action": "SELL", "type": "Stop Limit", "qty": 30, "stopPrice": 234.39, "limitPrice": 224, "tif": "GTC", "status": "ACTIVE — EARNINGS APR 29 AMC"},
    {"ticker": "MSFT", "action": "SELL", "type": "Stop", "qty": 25, "stopPrice": 400.43, "tif": "GTC", "status": "ACTIVE — EARNINGS APR 29 AMC"},
    {"ticker": "ISRG", "action": "SELL", "type": "Stop", "qty": 22, "stopPrice": 471.84, "tif": "GTC", "status": "ACTIVE — CONFIRMED IBKR"},
    {"ticker": "VST", "action": "SELL", "type": "Stop", "qty": 53, "stopPrice": 151.50, "tif": "GTC", "status": "ACTIVE — RAISE TO $153 MONDAY above $160 trigger met"},
    {"ticker": "CCJ", "action": "SELL", "type": "Stop", "qty": 49, "stopPrice": 114.99, "tif": "GTC", "status": "ACTIVE"},
    {"ticker": "PDYN", "action": "SELL", "type": "Stop", "qty": 250, "stopPrice": 5.75, "tif": "GTC", "status": "ACTIVE"},
    {"ticker": "AMPX", "action": "SELL", "type": "Stop", "qty": 168, "stopPrice": 17.53, "tif": "GTC", "status": "ACTIVE — VERIFY OCA WITH LIMIT $32"},
    {"ticker": "AMPX", "action": "SELL", "type": "Limit", "qty": 168, "limitPrice": 32.00, "tif": "GTC", "status": "ACTIVE — VERIFY OCA LINKAGE MONDAY"},
    {"ticker": "CODA", "action": "SELL", "type": "Stop", "qty": 416, "stopPrice": 11.51, "tif": "GTC", "status": "ACTIVE — CONFIRMED PAGE 2 ORDERS"}
  ],
  "watchlistUS": [
    {"ticker": "CEG", "name": "Constellation Energy Corp", "status": "STAGE 2 DONE — BUY $308 GTC MONDAY", "note": "All 4 SI-48 tests pass. PEG 1.37. -24% from ATH. Stop $278. 14sh. Catalyst: May 11 Q1."},
    {"ticker": "SNPS", "name": "Synopsys Inc", "status": "STAGE 2 DONE — BUY $495 GTC MONDAY", "note": "Conditional pass. -23% drawdown. Nvidia $2B equity investment. $11.3B backlog. 8sh. Stop $440. Catalyst: May 20 Q2."},
    {"ticker": "HPE", "name": "Hewlett Packard Enterprise", "status": "STAGE 2 DONE — WAIT JUN 2 Q2", "note": "All 4 SI-48 tests pass. fwd PE 11.7x. Entry preferred post-Jun 2 at $25-27."},
    {"ticker": "MRVL", "name": "Marvell Technology Inc", "status": "STAGE 2 DONE — VERIFY MONDAY — GTC $152 + STOP $135 (10sh)", "note": "Google ASIC CONFIRMED not just talks. Nvidia $2B strategic investment. FY2026 rev $8.2B +42% YoY. 18 hyperscaler design wins. SI-48: PEG 1.07, multi-year contracted backlog, no multiple expansion required, not PLTR-style narrative — all 4 pass. Fri close $164.31. Verify Monday via MMD."},
    {"ticker": "CRDO", "name": "Credo Technology Group", "status": "NEW TRIGGER $181.73 — MONITOR", "note": "Entry at $159.70 missed — ran to $194.69. Fri close $195.04 (-8.8% from ATH $213.80). Trigger $181.73 (-15% from ATH)."},
    {"ticker": "BKR", "name": "Baker Hughes", "status": "ACTIVE — RAISE BUY $58.50 TO $63 MONDAY", "note": "Q1 beat: EPS $0.58 vs $0.49. Record IET orders $4.9B. $58.50 now 17.9% below market."},
    {"ticker": "GOOGL", "name": "Alphabet Inc", "status": "ACTIVE — BUY $315 GTC — EARNINGS APR 29 AMC", "note": "SI-39 -21% from ATH. Price ~$344 (9.3% above limit). Q1 earnings Apr 29 AMC."},
    {"ticker": "CDNS", "name": "Cadence Design Systems", "status": "WATCH — EARNINGS MON APR 27 AMC — SI-39 TRIGGER $301.16", "note": "Fri close $332.89 (-11.6% from ATH $376.45). Trigger not yet hit. Beat likely. If 7%+ dip from $332.89 (~$309) then review SI-39 entry $301.16."},
    {"ticker": "MU", "name": "Micron Technology", "status": "WAIT — ATH UPDATED $506.99 — NEW TRIGGER $430.94", "note": "New ATH $506.99 hit Apr 24. Old trigger $400.64 stale. New SI-39 trigger: $430.94 (-15% from $506.99). Do not chase at $497."},
    {"ticker": "IBM", "name": "IBM Corp", "status": "WATCHLIST ONLY — SI-39 AT -35%", "note": "Trigger -35% from ATH only."},
    {"ticker": "OXY", "name": "Occidental Petroleum", "status": "PASSED — CAPITAL BETTER DEPLOYED ELSEWHERE", "note": "Conditional triggered (WTI >$90 for 6+ weeks) but thesis too Hormuz-dependent. NOG already provides oil premium exposure. Capital redirected to LDOS/MRVL/LEU."},
    {"ticker": "LDOS", "name": "Leidos Holdings", "status": "SI-39 TRIGGERED (-29% from ATH $205.77) — STAGE 2 MONDAY", "note": "Fri close $146.06. 52wk H $205.77, L $139.69. DOGE fear driving selloff not fundamental impairment. $49B backlog, 1.3x book-to-bill, EPS +21% on +3% revenue. Forward PE 12.04x. Q1 earnings May 5. STAGE 2 MONDAY: Entrust $2.4B acquisition leverage check. Proposed: GTC $143, stop $136, 45sh, $315 risk."},
    {"ticker": "LEU", "name": "Centrus Energy Corp", "status": "P11 ACTIVE — PRIOR STOP-OUT $170.26 — GTC $168", "note": "FUND HISTORY: Trade #7 in tracker — 13sh entered $188.79 (Mar 24), stopped $170.26 (Apr 7), -$242.94. P11: Re-entry ONLY after price pulls back BELOW $170.26. Current $205.63 above stop-out. P11-compliant GTC: $168, stop $150, 27sh, $486 risk. Thesis: HALEU monopoly, $900M DOE award, Russian uranium ban 2028, $2.3B commercial backlog. 52wk range $66-$464."},
    {"ticker": "MCHP", "name": "Microchip Technology", "status": "P13 HARD BLOCK — AT 52wk HIGH $89.19 — SI-39 TRIGGER $75.81", "note": "Fri close $89.44 at ATH. P13 HARD BLOCK no entry. 84.5% FY2027 EPS growth. Inventory recovery. Gross margins toward 65%. Earnings May 11 — if miss then SI-39 trigger $75.81."},
    {"ticker": "TTD", "name": "The Trade Desk", "status": "T15 WATCH — GROWTH IMPAIRED — DO NOT ENTER", "note": "Down ~75% from ATH. 19x fwd PE. Q1 2026 growth decelerated to 10% (was 25-30%). CFO vacancy. Entry requires: (1) CFO named, (2) growth re-accelerates 17%+. Both needed simultaneously."},
    {"ticker": "MOH", "name": "Molina Healthcare", "status": "POLITICAL BINARY — WATCHLIST ONLY", "note": "8.4x fwd PE. Earnings could double by 2029. PRIMARY RISK: Medicaid cuts under Trump. Political binary blocks entry. Watch for Medicaid legislation clarity."},
    {"ticker": "INCY", "name": "Incyte Corporation", "status": "STAGE 2 NEEDED — JAKAFI CLIFF RESEARCH", "note": "55% fwd EPS growth. 19% revenue growth. 15/15 analyst revisions upward (90 days). Fri close $94.65. Near ATH. Stage 2: Jakafi patent cliff ~2028, pipeline composition, post-Jakafi revenue bridge."},
    {"ticker": "ALGN", "name": "Align Technology", "status": "PASSED ENTRY — WATCH $155-160", "note": "Elliott Management stake. Already re-rated +38% from 2025 lows. Only 4-6% to consensus target ~$198. Risk/reward insufficient at $189. Re-enter at $155-160 if Elliott catalyst disappoints."},
    {"ticker": "NXPI", "name": "NXP Semiconductors", "status": "DEFERRED — STAGE 2 NEXT WEEK", "note": "Automotive/IoT semiconductor. Same inventory cycle as MCHP. Fri close $244.04. Research needed before any action."}
  ],
  "watchlistEU": [
    {"ticker": "IES.L", "name": "Invinity Energy Systems PLC", "status": "IN PORTFOLIO — E15 MANUAL 12.5p", "note": "LDES Cap and Floor decision imminent."},
    {"ticker": "ITM.L", "name": "ITM Power PLC", "status": "IN PORTFOLIO — 1,200sh — 172p LIMIT PENDING MONDAY", "note": "172p GTC limit MUST be placed before 12:00 UAE Monday."},
    {"ticker": "RR.L", "name": "Rolls-Royce Holdings", "status": "IN PORTFOLIO — 100sh — Stop 1050p", "note": "T27 re-entry 1128.6p. H1 Jul 30."},
    {"ticker": "R3NK", "name": "RENK Group AG", "status": "IN PORTFOLIO — Q1 MAY 6", "note": "200M EUR deferred orders key."},
    {"ticker": "LDO.MI", "name": "Leonardo SpA", "status": "IN PORTFOLIO — Stop 50 EUR — CLEARANCE 3.8% TIGHT", "note": "Q1 May 5. -4.38% Fri. Stop extremely tight."},
    {"ticker": "ENR.DE", "name": "Siemens Energy AG", "status": "SKIP — AWAIT -20% CORRECTION (~EUR 115)"}
  ],
  "sessionNotes": [
    {"date": "2026-04-17", "note": "SESSION 23 — LNG stopped. NOG filled. Journal v32."},
    {"date": "2026-04-19", "note": "SESSION 24 — Hormuz re-closed. NOG sell cancelled. SI-47/48. AI thesis Stage 1."},
    {"date": "2026-04-20", "note": "SESSION 25 — IES.L filled. NOG stop $22.50 live. WTI $88.36."},
    {"date": "2026-04-21", "note": "SESSION 26 — ABVX stopped -$158. LDO filled. GOOGL+BKR live."},
    {"date": "2026-04-22", "note": "SESSION 27 — RR.L stopped 1150p. RR.L BUY 1120p placed. ABBV filled."},
    {"date": "2026-04-23", "note": "SESSION 28 — RR.L filled 1128.6p. V filled $307.125. Stop raises CCJ/CRML/LLY. BKR Q1 beat."},
    {"date": "2026-04-24", "note": "SESSION 29 — ITM trim 800sh 141.2p (+GBP 608.80). V/ABBV P24 holds. WTI ~$97-98. LLY stopped post-close -$89.41."},
    {"date": "2026-04-25", "note": "SESSION 29-SUPP — Full scan. LLY stop-out confirmed. Stops: ISRG $471.84, NOG $23.92. Stage 2s: CEG/SNPS authorised, HPE wait, MRVL GTC $152, CRDO reassessed. OXY conditional — passed. BKR raise $63 Mon. ABBV date corrected Wed BMO."},
    {"date": "2026-04-26", "note": "RESEARCH DAY — SI-45 screener: MCHP P13 block at ATH, all AI infra names above old ATH reference. Geopolitical: Pakistan talks no deal, ceasefire extended, WTI $94.40. MRVL Stage 2: Google ASIC CONFIRMED, all SI-48 tests pass, GTC $152 confirmed. OXY PASSED — too Hormuz-dependent. 8-name discovery scan: LDOS SI-39 triggered Stage 2 Mon, LEU P11 active GTC $168, MCHP P13 block, TTD T15 watch, MOH political binary, INCY Stage 2 needed, ALGN passed entry, NXPI deferred. TRACKER RECONCILED S23-S29: 21 closed trades, 18 open. LEU confirmed as trade #7 (closed -$242.94 Apr 7). P11 active. NEW LESSONS: T21 discovery scan methodology, T22 DOGE fear vs fundamental impairment, P21 P11 active position tracking, S13 tracker-journal drift, S14 ATH table staleness, I17 tracker sync mandatory, I18 C Drive structure confirmed. NEW SIs: 55 weekend scan, 56 tracker sync, 57 P11 LEU log. NEW ERRORS: E16 tracker-journal drift."}
  ],
  "tradeTracker": {
    "closedTrades": [
      {"id":1,"ticker":"CCL","company":"Carnival Corp","dateIn":"2026-03-24","dateOut":"2026-03-26","qty":240,"entry":24.83,"exit":25.35,"ccy":"USD","pnlUSD":122.35,"note":"S07 tactical. +$122.35."},
      {"id":2,"ticker":"ONDS","company":"Ondas Inc","dateIn":"2026-03-24","dateOut":"2026-03-30","qty":250,"entry":10.90,"exit":8.505,"ccy":"USD","pnlUSD":-601.30,"note":"Stopped Mar 30. -$601.30."},
      {"id":3,"ticker":"KTOS","company":"Kratos Defense","dateIn":"2026-03-24","dateOut":"2026-03-30","qty":100,"entry":81.00,"exit":64.977,"ccy":"USD","pnlUSD":-1604.27,"note":"Stopped Mar 30. P12 sizing error. -$1,604.27."},
      {"id":4,"ticker":"UEC","company":"Uranium Energy Corp","dateIn":"2026-03-25","dateOut":"2026-03-31","qty":206,"entry":13.77,"exit":13.16,"ccy":"USD","pnlUSD":-127.76,"note":"Stopped Mar 31. -$127.76."},
      {"id":5,"ticker":"IAG","company":"International Airlines Group","dateIn":"2026-03-27","dateOut":"2026-04-01","qty":2200,"entry":3.55,"exit":3.70,"ccy":"GBP","pnlUSD":407.36,"note":"Peace dividend thesis broken. +$407."},
      {"id":6,"ticker":"RCL","company":"Royal Caribbean Cruises","dateIn":"2026-03-24","dateOut":"2026-04-02","qty":36,"entry":273.54,"exit":269.91,"ccy":"USD","pnlUSD":-132.89,"note":"Stopped Apr 2. -$132.89."},
      {"id":7,"ticker":"LEU","company":"Centrus Energy Corp","dateIn":"2026-03-24","dateOut":"2026-04-07","qty":13,"entry":188.79,"exit":170.26,"ccy":"USD","pnlUSD":-242.94,"note":"P11 ACTIVE. Stopped Apr 7 at $170.26. -$242.94. P11-compliant re-entry: GTC $168 (below $170.26 stop-out), stop $150, 27sh."},
      {"id":8,"ticker":"LDO","company":"Leonardo SpA T1","dateIn":"2026-03-27","dateOut":"2026-04-07","qty":17,"entry":58.10,"exit":59.56,"ccy":"EUR","pnlUSD":20.51,"note":"T1 closed. T2 (35sh) active."},
      {"id":9,"ticker":"UPS","company":"United Parcel Service","dateIn":"2026-04-08","dateOut":"2026-04-08","qty":50,"entry":100.17,"exit":99.60,"ccy":"USD","pnlUSD":-30.61,"note":"Same-day round trip. -$30.61."},
      {"id":10,"ticker":"R3NK","company":"RENK Group AG (first entry)","dateIn":"2026-03-26","dateOut":"2026-04-08","qty":80,"entry":51.51,"exit":56.01,"ccy":"EUR","pnlUSD":385.86,"note":"First entry. +$386. Reentry active."},
      {"id":11,"ticker":"PLTR","company":"Palantir Technologies","dateIn":"2026-03-24","dateOut":"2026-04-09","qty":49,"entry":161.608,"exit":134.976,"ccy":"USD","pnlUSD":-1307.11,"note":"P6 lesson — no confirmed catalyst. -$1,307.11."},
      {"id":12,"ticker":"SHLD","company":"Shield AI Inc","dateIn":"2026-03-24","dateOut":"2026-04-10","qty":69,"entry":72.01,"exit":73.21,"ccy":"USD","pnlUSD":112.65,"note":"Tactical round-trip. +$112.65."},
      {"id":13,"ticker":"PDYN","company":"Palladyne AI (partial exit)","dateIn":"2026-03-25","dateOut":"2026-04-14","qty":250,"entry":6.59,"exit":6.67,"ccy":"USD","pnlUSD":17.42,"note":"250 of 500sh sold. 250 remain open."},
      {"id":14,"ticker":"AVAV","company":"AeroVironment Inc","dateIn":"2026-03-26","dateOut":"2026-04-15","qty":25,"entry":195.05,"exit":197.945,"ccy":"USD","pnlUSD":70.27,"note":"SI-42 broken thesis exit. +$70.27."},
      {"id":15,"ticker":"ITM","company":"ITM Power PLC (Trim 1)","dateIn":"2026-04-01","dateOut":"2026-04-17","qty":1100,"entry":65.1,"exit":124.60,"ccy":"GBP","pnlUSD":828.00,"note":"S22 trim 1100sh at 124.6p. +GBP 654.50 / +$828."},
      {"id":16,"ticker":"LNG","company":"Cheniere Energy Inc","dateIn":"2026-04-13","dateOut":"2026-04-17","qty":19,"entry":268.813,"exit":248.00,"ccy":"USD","pnlUSD":-396.54,"note":"S23 stop-out. -$396.54."},
      {"id":17,"ticker":"PATK","company":"Patrick Industries Inc","dateIn":"2026-04-17","dateOut":"2026-04-17","qty":25,"entry":108.80,"exit":109.256,"ccy":"USD","pnlUSD":9.34,"note":"S23 tactical. P17 lesson — M&A tip entry. +$9.34."},
      {"id":18,"ticker":"ABVX","company":"Abivax SA-ADR","dateIn":"2026-04-06","dateOut":"2026-04-21","qty":44,"entry":117.913,"exit":114.26,"ccy":"USD","pnlUSD":-158.53,"note":"S26 stop-out. -$158.53."},
      {"id":19,"ticker":"RR","company":"Rolls-Royce (original 150sh)","dateIn":"2026-03-26","dateOut":"2026-04-22","qty":150,"entry":1182.88,"exit":1150.00,"ccy":"GBP","pnlUSD":-62.39,"note":"S27 stop-out. Re-entry 100sh at 1128.6p (active)."},
      {"id":20,"ticker":"ITM","company":"ITM Power PLC (Trim 2)","dateIn":"2026-04-01","dateOut":"2026-04-24","qty":800,"entry":65.1,"exit":141.20,"ccy":"GBP","pnlUSD":770.00,"note":"S29 trim 800sh at 141.2p. +GBP 608.80 / ~$770."},
      {"id":21,"ticker":"LLY","company":"Eli Lilly and Company","dateIn":"2026-04-16","dateOut":"2026-04-25","qty":3,"entry":905.344,"exit":875.54,"ccy":"USD","pnlUSD":-89.41,"note":"S29-SUPP post-session stop. T28 stop staleness lesson. -$89.41."}
    ],
    "grossRealizedPnLUSD": -2765.85,
    "lastUpdated": "2026-04-26 Research Day — all S23-S29 trades reconciled"
  },
  "standingInstructions": [
    {"id":1,"title":"TIMEZONE — MANDATORY ARITHMETIC","body":"BEFORE stating any market is open or closed: write UAE time now = X. NYSE closes 00:00 UAE. LSE closes 19:30 UAE. XETRA closes 19:00 UAE. COMPUTE — NEVER RECALL."},
    {"id":17,"title":"ERROR TAXONOMY — 16 TYPES","body":"E1:Timezone. E2:Stale position. E3:Fill re-flag. E4:Price verification. E5:Market timing. E6:Dividend capture. E7:Session discipline. E8:Stale quote. E9:GTC orphan. E10:Closed position scan. E11:52wk hallucination. E12:Tool routing gap. E13:EODHD delay. E14:Date discrepancy (ABBV: Wed Apr 29 BMO not Tue AMC). E15:AIM stop limitation. E16:Tracker-Journal drift — position in journal not in tracker or vice versa. Prevention: cross-reference both at session open AND close. Any position/stop change in journal requires same-session tracker row update."},
    {"id":25,"title":"SI-25 EXIT TRIGGER","body":"Permanent Hormuz reopening + WTI -10% from $111.54 peak = trigger at $100.38. WTI Fri close $94.40. Gap ~$6. NOT TRIGGERED. Pakistan talks no deal. Ceasefire extended indefinitely. Indefinite extension is NOT SI-25 trigger."},
    {"id":47,"title":"SI-47: DATE VERIFICATION — STEP ZERO","body":"System prompt date is authoritative. State date before any analysis. Non-negotiable."},
    {"id":48,"title":"SI-48: AI THESIS ATH RULE","body":"Four tests: (1) fwd PE below sector or PEG less than 1.5, (2) structural catalyst multi-year backlog, (3) no multiple expansion required, (4) PLTR P6 test. MRVL: all 4 pass. CEG/SNPS: authorised."},
    {"id":51,"title":"SI-51: TIER 3 WEIGHTED JUDGEMENT","body":"Net +3 or higher AND all hard blocks clear for entry."},
    {"id":55,"title":"SI-55: WEEKEND DISCOVERY SCAN PROTOCOL","body":"When tokens available on non-trading days, run SI-45 + broad 6-angle discovery scan: (1) semiconductor cycles, (2) defence IT, (3) nuclear supply chain, (4) beaten-down growth platforms, (5) healthcare value, (6) international opportunities. Apply P13/SI-39/T15/P11 as normal filters before any entry recommendation. Results committed to watchlist. No trades executed on discovery day — all positions queued for Monday Stage 2."},
    {"id":56,"title":"SI-56: TRACKER-JOURNAL SYNC MANDATORY","body":"At every session close, any position change, stop change, fill, or new position MUST have a corresponding tracker row updated in the SAME SESSION. Tracker (xlsx) is the permanent record. Journal (jsx) is the operational record. Any drift between them is E16. Tracker xlsx must be downloaded from Claude output and saved to C:\\Users\\jcadb\\claude-fund\\tracker\\ — MCP cannot write binary files directly."},
    {"id":57,"title":"SI-57: P11 APPLICATION LOG — LEU","body":"LEU previously held: 13sh entered $188.79 (2026-03-24), stopped $170.26 (2026-04-07), P&L -$242.94 (tracker trade #7). P11: re-entry requires price below prior stop-out level $170.26. Current $205.63 above $170.26 — P11 BLOCKS any entry above $170.26. P11-compliant GTC: $168, stop $150, 27sh, $486 risk. Update this entry when P11 condition is met."}
  ],
  "priceVerificationProtocol": {
    "currentPriceUS": "MMD /v2/aggs/ticker/{TICKER}/prev — field c",
    "52wkRangeUS": "EOD:get_us_live_extended_quotes",
    "currentPriceEUUK": "web_fetch Yahoo Finance",
    "memoryForbidden": "MEMORY ESTIMATES FOR PRICE OR FUNDAMENTAL DATA ARE FORBIDDEN"
  },
  "si45ATHTable": {
    "lastUpdated": "2026-04-26 Research Day — all AI infra names above S24 reference ATH levels",
    "note": "MANDATORY UPDATE AT S30 OPEN — ATH levels stale for VRT, ETN, AVGO, ANET, GEV",
    "triggers": [
      {"ticker":"CDNS","currentATH":376.45,"current":332.89,"triggerAt":301.16,"pctFromATH":-11.6,"triggered":false},
      {"ticker":"CRDO","currentATH":213.80,"current":195.04,"triggerAt":181.73,"pctFromATH":-8.8,"triggered":false},
      {"ticker":"MU","currentATH":506.99,"current":496.72,"triggerAt":430.94,"pctFromATH":-2.0,"triggered":false,"note":"ATH UPDATED from $471.34 to $506.99"},
      {"ticker":"VRT","currentATH":"above 312.46","current":323.46,"triggerAt":"TBD","pctFromATH":"above old ATH","triggered":false,"note":"ABOVE OLD ATH — update required Monday"},
      {"ticker":"ETN","currentATH":"above 408.45","current":423.92,"triggerAt":"TBD","pctFromATH":"above old ATH","triggered":false,"note":"ABOVE OLD ATH"},
      {"ticker":"AVGO","currentATH":"above 414.61","current":422.76,"triggerAt":"TBD","pctFromATH":"above old ATH","triggered":false,"note":"ABOVE OLD ATH"},
      {"ticker":"ANET","currentATH":"above 164.94","current":176.91,"triggerAt":"TBD","pctFromATH":"above old ATH","triggered":false,"note":"ABOVE OLD ATH"},
      {"ticker":"GEV","currentATH":"above 1007.38","current":1149.19,"triggerAt":"TBD","pctFromATH":"above old ATH","triggered":false,"note":"ABOVE OLD ATH"}
    ]
  },
  "cDriveProtocol": {
    "confirmed": "2026-04-26 Research Day",
    "readAccess": true,
    "writeAccess": true,
    "allowedPaths": ["C:\\Users\\jcadb\\claude-fund", "C:\\Users\\jcadb\\Claude Date File"],
    "journalLocation": "C:\\Users\\jcadb\\claude-fund\\journal\\",
    "stateLocation": "C:\\Users\\jcadb\\claude-fund\\state\\",
    "trackerLocation": "C:\\Users\\jcadb\\claude-fund\\tracker\\",
    "trackerNote": "xlsx tracker must be downloaded from Claude output and copied manually — filesystem MCP writes text only"
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

  const tabs = ["positions","orders","thesis","watchlist","tracker","instructions","notes"];
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
        .badge-purple { background: rgba(163,113,247,0.15); color: ${COLORS.purple}; border: 1px solid rgba(163,113,247,0.3); }
        .btn { background: ${COLORS.card}; border: 1px solid ${COLORS.border}; color: ${COLORS.text}; padding: 6px 12px; border-radius: 4px; cursor: pointer; font-family: monospace; font-size: 12px; }
        .btn:hover { background: #21262d; }
        .btn-primary { background: rgba(88,166,255,0.15); border-color: rgba(88,166,255,0.4); color: ${COLORS.accent}; }
        input { background: ${COLORS.card}; border: 1px solid ${COLORS.border}; color: ${COLORS.text}; padding: 8px; border-radius: 4px; font-family: monospace; font-size: 12px; flex: 1; }
      `}</style>

      <div style={{ marginBottom: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8 }}>
          <div>
            <div style={{ fontSize: 18, fontWeight: 700, color: COLORS.textBright }}>CLAUDE FUND — JOURNAL v43</div>
            <div style={{ fontSize: 11, color: COLORS.textDim, marginTop: 2 }}>Research Day 26 Apr 2026 | {data.fund.account} | {data.lastUpdated}</div>
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
          MONDAY: ITM 172p GTC | CEG $308 | SNPS $495 | BKR raise $63 | MRVL verify $152 | VST stop $153 | AMPX OCA verify
        </div>
        <div style={{ marginTop: 4, padding: "6px 10px", background: "rgba(163,113,247,0.1)", border: "1px solid rgba(163,113,247,0.3)", borderRadius: 4, fontSize: 11, color: COLORS.purple }}>
          RESEARCH QUEUE: LDOS Stage 2 (Entrust leverage) | LEU P11 GTC $168 | MCHP watch $75.81 | INCY Stage 2 | NXPI Stage 2
        </div>
        <div style={{ marginTop: 4, padding: "6px 10px", background: "rgba(210,153,34,0.1)", border: "1px solid rgba(210,153,34,0.3)", borderRadius: 4, fontSize: 11, color: COLORS.yellow }}>
          EARNINGS WEEK: V Tue 28 AMC | ABBV Wed 29 BMO | AMZN+MSFT Wed 29 AMC | NOG Thu 30 | LDO+LDOS May 5
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
                          p.status?.includes("NOT PLACED") || p.status?.includes("RAISE") ? `3px solid ${COLORS.red}` : undefined
            }}>
              <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap", marginBottom: 6 }}>
                <span style={{ fontWeight: 700, fontSize: 14, color: COLORS.textBright }}>{p.ticker}</span>
                <span style={{ fontSize: 11, color: COLORS.textDim }}>{p.name}</span>
                {p.cur && <span className="badge badge-grey">{p.cur}</span>}
                {p.status?.includes("EARNINGS") && <span className="badge badge-amber">EARNINGS</span>}
                {p.status?.includes("RAISE") && <span className="badge badge-red">ACTION MON</span>}
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
            <div key={i} className="card" style={{ borderLeft: `3px solid ${o.status?.includes("NOT YET") || o.status?.includes("PENDING PLACEMENT") ? COLORS.red : o.status?.includes("RAISE") || o.status?.includes("VERIFY") ? COLORS.yellow : o.action === "BUY" ? COLORS.green : COLORS.red}` }}>
              <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                <span style={{ fontWeight: 700 }}>{o.ticker}</span>
                <span className={`badge ${o.action === "BUY" ? "badge-green" : "badge-red"}`}>{o.action}</span>
                <span className="badge badge-grey">{o.type}</span>
                <span style={{ fontSize: 11 }}>Qty: <b>{o.qty}</b></span>
                {o.limitPrice && <span style={{ fontSize: 11 }}>Lmt: <b>{o.limitPrice}</b></span>}
                {o.stopPrice && <span style={{ fontSize: 11 }}>Stp: <b>{o.stopPrice}</b></span>}
                <span className={`badge ${o.status?.includes("NOT YET") || o.status?.includes("PENDING PLACEMENT") ? "badge-red" : o.status?.includes("RAISE") || o.status?.includes("VERIFY") ? "badge-amber" : "badge-green"}`}>{o.status?.substring(0,55)}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "thesis" && (
        <div>
          <div className="card" style={{ marginBottom: 12, borderLeft: `3px solid ${COLORS.red}` }}>
            <div style={{ fontWeight: 700, color: COLORS.red, marginBottom: 8 }}>{data.thesis.title}</div>
            <div style={{ fontSize: 12, lineHeight: 1.8 }}>{data.thesis.summary}</div>
          </div>
          <div style={{ fontSize: 12, fontWeight: 600, color: COLORS.accent, marginBottom: 8 }}>KEY DATES & ACTIONS</div>
          {data.thesis.keyDates?.map((d, i) => (
            <div key={i} className="card" style={{ marginBottom: 6, borderLeft: `3px solid ${d.priority === "CRITICAL" ? COLORS.red : COLORS.yellow}` }}>
              <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <span style={{ fontSize: 11, fontWeight: 600, minWidth: 200, color: COLORS.textBright }}>{d.date}</span>
                <span style={{ fontSize: 11, color: COLORS.textDim, flex: 1 }}>{d.event}</span>
                <span className={`badge ${d.priority === "CRITICAL" ? "badge-red" : "badge-amber"}`}>{d.priority}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "watchlist" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ fontWeight: 600, color: COLORS.accent, fontSize: 12, marginBottom: 4 }}>US WATCHLIST ({data.watchlistUS?.length} names)</div>
          {data.watchlistUS?.map((w) => (
            <div key={w.ticker} className="card" style={{ borderLeft: w.status?.includes("P11") ? `3px solid ${COLORS.red}` : w.status?.includes("STAGE 2 DONE") || w.status?.includes("BUY") ? `3px solid ${COLORS.green}` : w.status?.includes("P13") || w.status?.includes("T15") || w.status?.includes("PASSED") ? `3px solid ${COLORS.red}` : `3px solid ${COLORS.yellow}` }}>
              <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap", marginBottom: 4 }}>
                <span style={{ fontWeight: 700 }}>{w.ticker}</span>
                <span style={{ fontSize: 12, color: COLORS.textDim }}>{w.name}</span>
                <span className={`badge ${w.status?.includes("DONE") || w.status?.includes("BUY") ? "badge-green" : w.status?.includes("P11") || w.status?.includes("P13") || w.status?.includes("T15") || w.status?.includes("PASSED") ? "badge-red" : "badge-amber"}`}>{w.status?.substring(0,55)}</span>
              </div>
              {w.note && <div style={{ fontSize: 10, color: COLORS.textDim }}>{w.note}</div>}
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
              {w.note && <div style={{ fontSize: 10, color: COLORS.textDim }}>{w.note}</div>}
            </div>
          ))}
        </div>
      )}

      {activeTab === "tracker" && (
        <div>
          <div style={{ fontSize: 12, fontWeight: 600, color: COLORS.accent, marginBottom: 8 }}>
            TRADE TRACKER — {data.tradeTracker?.closedTrades?.length} CLOSED | Gross Realized: ${data.tradeTracker?.grossRealizedPnLUSD?.toFixed(2)}
          </div>
          <div style={{ marginBottom: 6, padding: "6px 10px", background: "rgba(248,81,73,0.1)", border: "1px solid rgba(248,81,73,0.3)", borderRadius: 4, fontSize: 11, color: COLORS.red }}>
            P11 ACTIVE — LEU: prior stop-out $170.26. Re-entry only below $170.26. GTC $168 proposed (27sh, stop $150, $486 risk).
          </div>
          {data.tradeTracker?.closedTrades?.map((t) => (
            <div key={t.id} className="card" style={{ marginBottom: 4, borderLeft: `3px solid ${t.pnlUSD > 0 ? COLORS.green : COLORS.red}` }}>
              <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
                <span style={{ fontSize: 10, color: COLORS.textDim, minWidth: 20 }}>#{t.id}</span>
                <span style={{ fontWeight: 700 }}>{t.ticker}</span>
                <span style={{ fontSize: 10, color: COLORS.textDim }}>{t.dateIn} to {t.dateOut}</span>
                <span style={{ fontSize: 11 }}>{t.qty}sh @ {t.entry} to {t.exit}</span>
                <span style={{ fontWeight: 700, color: pnlColor(t.pnlUSD) }}>{t.pnlUSD >= 0 ? "+" : ""}${t.pnlUSD?.toFixed(2)}</span>
                <span className="badge badge-grey">{t.ccy}</span>
                {t.note?.includes("P11") && <span className="badge badge-red">P11</span>}
              </div>
              <div style={{ fontSize: 9, color: COLORS.textDim, marginTop: 3 }}>{t.note}</div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "instructions" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {data.standingInstructions?.map(ins => (
            <div key={ins.id} className="card" style={{ borderLeft: ins.id === 1 || ins.id === 57 ? `3px solid ${COLORS.red}` : ins.id === 25 ? `3px solid ${COLORS.yellow}` : undefined }}>
              <div style={{ display: "flex", gap: 12 }}>
                <div style={{ fontSize: 11, color: ins.id === 1 || ins.id === 57 ? COLORS.red : ins.id === 25 ? COLORS.yellow : COLORS.accent, fontWeight: 700, minWidth: 28 }}>#{String(ins.id).padStart(2,"0")}</div>
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
                <button className="btn" style={{ padding: "2px 8px", fontSize: 10, color: "#ef4444" }}
                  onClick={() => { const rev = [...data.sessionNotes].reverse(); rev.splice(i,1); update({ ...data, sessionNotes: rev.reverse() }); }}>DEL</button>
              </div>
              <div style={{ fontSize: 12, lineHeight: 1.7 }}>{n.note}</div>
            </div>
          ))}
        </div>
      )}

      <div style={{ marginTop: 24, paddingTop: 12, borderTop: `1px solid ${COLORS.border}`, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <span style={{ fontSize: 10, color: COLORS.textDim }}>JOURNAL v43 | RESEARCH-26APR | {data.fund.account} | NL $105.7K | 18 POSITIONS | 21 CLOSED TRADES</span>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <span className="badge badge-red">ITM 172p MON</span>
          <span className="badge badge-red">CEG+SNPS MON</span>
          <span className="badge badge-amber">MRVL $152 VERIFY</span>
          <span className="badge badge-red">LEU P11 $168</span>
          <span className="badge badge-amber">WTI $94.40</span>
        </div>
      </div>
    </div>
  );
}
