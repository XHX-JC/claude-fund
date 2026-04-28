import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "fund_journal_v3";

// ═══════════════════════════════════════════════════════════════════
// SESSION CLOSE CHECKLIST — CLAUDE EXECUTES AT EVERY SESSION END
// filesystem:write_file → journal, FUND_SESSION_STATE.md, LESSONS_LEARNED.md
// Allowed paths: C:\Users\jcadb\claude-fund\
// ═══════════════════════════════════════════════════════════════════
// TIMEZONE REFERENCE — MANDATORY (E1 CORRECTED S30)
// NYSE: opens 17:30 UAE / closes 00:00 UAE
// LSE:  opens 11:00 UAE (BST/summer Apr-Oct) / 12:00 UAE (GMT/winter Nov-Mar)
// XETRA/BVME: opens 11:00 UAE / closes 19:00 UAE
// ═══════════════════════════════════════════════════════════════════

const INITIAL_STATE = {
  "lastUpdated": "2026-04-28 SESSION 31 CLOSE — Stop audit complete. ISRG E16 corrected (Trade #23). CODA P&L corrected. QCOM added watchlist. 6 stop raises. CRML add bracket cancelled.",
  "sessionNumber": "S31",
  "fund": {
    "account": "U24936508",
    "netLiquidity": 105600,
    "unrealizedPnL": 7345,
    "realizedPnL": -2737,
    "realizedPnLNote": "Corrected S31: ISRG +$272.24 added (Trade #23), CODA corrected to -$243.36 (fill $11.42 not $11.51)",
    "cashBase": 35620,
    "deployableCash": 14628,
    "broker": "IBKR Pro",
    "baseCurrency": "USD",
    "location": "UAE",
    "note": "JOURNAL v46. Tue 28 Apr 2026. 19 positions (ISRG removed — E16 corrected). Full stop audit complete. V earnings tonight AMC. ABBV/AMZN/MSFT/MSTR tomorrow."
  },
  "thesis": {
    "title": "DUAL BLOCKADE — PAKISTAN TALKS FAILED — WTI $96.37 — CEASEFIRE EXTENDED",
    "summary": "Pakistan talks failed. Trump suspended negotiations. Iran submitted new proposal via Pakistani mediators (extend ceasefire, postpone nuclear talks until US lifts blockade). Structural impasse. WTI $96.37 (+2% on Apr 27). SI-25 trigger $100.38 — gap ~$4. IEA: biggest energy supply shock on record. Mine-clearing operations active. NOG/CODA thesis intact.",
    "oilWTI": 96.37,
    "hormuzStatus": "DUAL BLOCKADE ACTIVE. Iran new proposal submitted Apr 27. No deal. Mine-clearing ops confirmed.",
    "SI25Status": "NOT TRIGGERED. $100.38 threshold. Gap ~$4 from $96.37.",
    "keyDates": [
      {"date": "TONIGHT AMC (01:00 UAE Wed)", "event": "V Q2 earnings — EPS consensus $3.09. Stop $285. P24 — DO NOT TOUCH.", "priority": "CRITICAL"},
      {"date": "Wed Apr 29 BMO", "event": "ABBV Q1 — Consensus $2.69. Stop $192. 2.7% clearance. Accept gap risk. DO NOT TOUCH.", "priority": "CRITICAL"},
      {"date": "Wed Apr 29 AMC", "event": "AMZN Q1 — AWS 28%+ target. Stop $234.39/SL$224. DO NOT TOUCH.", "priority": "CRITICAL"},
      {"date": "Wed Apr 29 AMC", "event": "MSFT Q3 — Azure CC 37-38% guided. Stop $400.43. DO NOT TOUCH.", "priority": "CRITICAL"},
      {"date": "Wed Apr 29 AMC", "event": "MSTR Q1 — Review print before Thursday entry decision.", "priority": "CRITICAL"},
      {"date": "Wed Apr 29 AMC", "event": "QCOM Q2 — EPS $2.58 consensus (below $2.85 prior). No position. Review post-print for Stage 2.", "priority": "HIGH"},
      {"date": "Thu Apr 30", "event": "NOG Q1 at war-premium WTI. Stop $24.49.", "priority": "CRITICAL"},
      {"date": "Thu May 1 open", "event": "MSTR entry — 12sh market if Q1 clean. Stop $135. Limit $420. SI-37 exception $2,000.", "priority": "CRITICAL"},
      {"date": "May 5 BMO", "event": "LDOS Q1 — catalyst gate. GTC $143 near miss (low $143.39 Apr 27).", "priority": "HIGH"},
      {"date": "May 5", "event": "LDO.MI Q1 — stop €50, clearance 3.8% TIGHT.", "priority": "HIGH"},
      {"date": "May 6", "event": "R3NK Q1 — 200M EUR deferred orders must appear.", "priority": "HIGH"},
      {"date": "May 7", "event": "AMPX Q1. Stop $18.92.", "priority": "HIGH"},
      {"date": "May 11", "event": "CEG Q1 — catalyst gate. Stop $278.", "priority": "HIGH"},
      {"date": "May 20", "event": "SNPS Q2 FY26 — catalyst gate. Stop $440.", "priority": "HIGH"},
      {"date": "May 28", "event": "MRVL Q1 FY27 — catalyst gate. Google ASIC confirmed. Stop $135.", "priority": "HIGH"},
      {"date": "Jun 2", "event": "HPE Q2 FY26 — entry review gate. $25-27 post-Q2.", "priority": "HIGH"},
      {"date": "ONGOING", "event": "CODA P11 — reassess Wed Apr 29. Target 250-300sh below $11.51. Stop <$10.50. 24hr hold elapsed.", "priority": "HIGH"},
      {"date": "ONGOING", "event": "LDOS GTC $143 pending — low Apr 27 was $143.39 (39 cents away). Near miss flag.", "priority": "HIGH"},
      {"date": "POST-WED", "event": "QCOM Stage 2 — post Q2 earnings review. OpenAI smartphone chip (2028). SI-48 tests required.", "priority": "MEDIUM"}
    ]
  },
  "positions": [
    {"ticker": "AMZN", "shares": 30, "avgPrice": 201.204, "costBasis": 6036, "last": 261.12, "unrealPnL": 1803, "unrealPct": 29.9, "stop": 234.39, "stopType": "Stop Limit", "stopLimit": 224, "target": 300, "status": "HOLD — EARNINGS WED APR 29 AMC — DO NOT TOUCH STOP", "note": "AWS growth rate key. Stop locked in $33/sh profit."},
    {"ticker": "ITM", "name": "ITM Power PLC", "shares": 1200, "avgPrice": 65.1, "costBasis": 781, "last": 143.30, "unrealPnL": 938, "unrealPct": 120.1, "stop": 130, "stopType": "Stop Limit", "stopLimit": 128, "target": 172, "cur": "GBP", "status": "HOLD — 172p GTC LIMIT ACTIVE — STOP LIMIT 130p/128p", "note": "172p limit active. AIM discipline. If fills reassess fresh thesis."},
    {"ticker": "MSFT", "shares": 25, "avgPrice": 372.77, "costBasis": 9319, "last": 424.82, "unrealPnL": 1275, "unrealPct": 13.7, "stop": 400.43, "target": 450, "status": "HOLD — EARNINGS WED APR 29 AMC — DO NOT TOUCH STOP", "note": "Azure CC 37-38% guided. Stop locks in $27.66/sh."},
    {"ticker": "CCJ", "shares": 49, "avgPrice": 104.021, "costBasis": 5097, "last": 123.07, "unrealPnL": 954, "unrealPct": 18.7, "stop": 116.96, "target": 136, "status": "HOLD — STOP $116.96 GTC — RAISED S31", "note": "Stop raised $114.99 → $116.96. Locks in $12.94/sh. Nuclear thesis intact."},
    {"ticker": "VST", "shares": 53, "avgPrice": 150.569, "costBasis": 7980, "last": 166.40, "unrealPnL": 839, "unrealPct": 10.5, "stop": 156.58, "target": 220, "status": "HOLD — STOP $156.58 GTC — RAISED S31", "note": "Stop raised $153 → $156.58. Locks in $6.01/sh."},
    {"ticker": "AMPX", "shares": 168, "avgPrice": 18.106, "costBasis": 3042, "last": 21.49, "unrealPnL": 569, "unrealPct": 18.7, "stop": 18.92, "target": 32, "status": "HOLD — STOP $18.92 GTC — RAISED S31 (T28 FIX) — LIMIT $32 GTC — EARNINGS MAY 7", "note": "T28 violation fixed. Stop raised $17.53 → $18.92 (above cost $18.106). Locks in $0.814/sh. Limit $32 standalone."},
    {"ticker": "CRML", "shares": 110, "avgPrice": 9.08, "costBasis": 999, "last": 14.45, "unrealPnL": 589, "unrealPct": 59.2, "stop": 10.51, "target": 15, "status": "HOLD — STOP $10.51 GTC — RAISED S31. ADD BRACKET CANCELLED.", "note": "Stop raised $9.47 → $10.51 (user set at price floor). Add bracket BUY $10/OCA stop $9.47 CANCELLED — price $14.45, bracket was dormant."},
    {"ticker": "NOG", "shares": 80, "avgPrice": 24.383, "costBasis": 1951, "last": 26.87, "unrealPnL": 200, "unrealPct": 10.4, "stop": 24.49, "target": null, "status": "HOLD — STOP $24.49 GTC — RAISED S31 — Q1 APR 30", "note": "Stop raised $23.92 → $24.49. Just above cost $24.383. Pakistan talks failed, WTI $96.37. War premium intact."},
    {"ticker": "CEG", "shares": 14, "avgPrice": 308.072, "costBasis": 4313, "last": 315.41, "unrealPnL": 103, "unrealPct": 2.4, "stop": 278, "target": 395, "status": "HOLD — STOP $278 GTC — CATALYST MAY 11", "note": "Filled S30. Nuclear scarcity + AI power demand."},
    {"ticker": "R3NK", "shares": 25, "avgPrice": 52.27, "costBasis": 1307, "last": 54.93, "unrealPnL": 66, "unrealPct": 5.0, "stop": 48, "stopType": "Stop Limit", "stopLimit": 47, "target": 76, "cur": "EUR", "status": "HOLD — STOP LIMIT 48/47 EUR GTC — EARNINGS MAY 6", "note": "200M EUR deferred orders must appear Q1."},
    {"ticker": "MRVL", "shares": 10, "avgPrice": 152.10, "costBasis": 1521, "last": 158.21, "unrealPnL": 61, "unrealPct": 4.0, "stop": 135, "target": 420, "status": "HOLD — STOP $135 GTC — POET cancellation = supply noise. THESIS INTACT. MAY 28", "note": "POET cancelled due to POET confidentiality breach — not thesis break for MRVL. Google ASIC (Dorado) thesis unchanged. T21 logged."},
    {"ticker": "V", "shares": 8, "avgPrice": 307.125, "costBasis": 2457, "last": 309.65, "unrealPnL": 20, "unrealPct": 0.8, "stop": 285, "target": 380, "status": "HOLD — EARNINGS TONIGHT AMC — P24 HOLD — STOP $285", "note": "Consensus EPS $3.09. Revenue $10.7B. Stop 7.9% below current price — adequate protection."},
    {"ticker": "SNPS", "shares": 8, "avgPrice": 495.125, "costBasis": 3961, "last": 498.30, "unrealPnL": 25, "unrealPct": 0.6, "stop": 440, "target": 630, "status": "HOLD — STOP $440 GTC — CATALYST MAY 20", "note": "EDA duopoly + Ansys integration. -23% from ATH. Catalyst May 20."},
    {"ticker": "CGCT", "shares": 291, "avgPrice": 10.295, "costBasis": 2996, "last": 10.31, "unrealPnL": 4, "unrealPct": 0.1, "stop": null, "status": "HOLD — NO STOP — SPAC TRUST FLOOR ~$10.27", "note": "Business combination ~May 2026."},
    {"ticker": "RR", "name": "Rolls-Royce Holdings PLC", "shares": 100, "avgPrice": 1128.6, "costBasis": 1129, "last": 1130.40, "unrealPnL": 2, "unrealPct": 0.2, "stop": 1050, "target": 1500, "cur": "GBP", "status": "HOLD — STOP 1050p GTC — H1 JUL 30", "note": "T27 re-entry. SMR/Wylfa + naval + civil aero."},
    {"ticker": "IES", "name": "Invinity Energy Systems PLC", "shares": 3000, "avgPrice": 17.49, "costBasis": 525, "last": 17.50, "unrealPnL": 0, "stop": null, "stopType": "MANUAL ALERT 12.5p", "target": 45, "cur": "GBP", "status": "HOLD — E15: NO IBKR STOPS FOR AIM — MANUAL ALERT 12.5p", "note": "LDES Cap and Floor decision imminent."},
    {"ticker": "PDYN", "shares": 250, "avgPrice": 6.595, "costBasis": 1649, "last": 6.31, "unrealPnL": -71, "unrealPct": -4.3, "stop": 5.75, "target": null, "status": "HOLD — STOP $5.75 GTC — EARNINGS MAY 13", "note": "250sh remaining."},
    {"ticker": "ABBV", "shares": 20, "avgPrice": 205.22, "costBasis": 4104, "last": 197.38, "unrealPnL": -157, "unrealPct": -3.8, "stop": 192, "target": 249, "status": "HOLD — STOP $192 GTC — EARNINGS WED APR 29 BMO — 2.7% CLEARANCE", "note": "WEDNESDAY BEFORE OPEN. Consensus $2.69 EPS. Stop 2.7% below current — accept gap risk. DO NOT TOUCH."},
    {"ticker": "LDO", "name": "Leonardo SpA", "shares": 35, "avgPrice": 56.086, "costBasis": 1963, "last": 52.54, "unrealPnL": -123, "unrealPct": -6.3, "stop": 50, "target": 76, "cur": "EUR", "status": "HOLD — STOP 50 EUR GTC — CLEARANCE 3.8% TIGHT — Q1 MAY 5", "note": "Do NOT widen stop."}
  ],
  "pendingOrders": [
    {"ticker": "LDOS", "action": "BUY", "type": "Limit", "qty": 45, "limitPrice": 143.00, "tif": "GTC", "status": "ACTIVE — ⚠️ NEAR MISS: Low Apr 27 = $143.39. 39 cents away. Monitor closely."},
    {"ticker": "LDOS", "action": "SELL", "type": "Stop", "qty": 45, "stopPrice": 136.00, "tif": "GTC", "status": "ACTIVE — OCA bracket"},
    {"ticker": "MRVL", "action": "SELL", "type": "Stop", "qty": 10, "stopPrice": 135.00, "tif": "GTC", "status": "ACTIVE"},
    {"ticker": "CEG", "action": "SELL", "type": "Stop", "qty": 14, "stopPrice": 278.00, "tif": "GTC", "status": "ACTIVE"},
    {"ticker": "SNPS", "action": "SELL", "type": "Stop", "qty": 8, "stopPrice": 440.00, "tif": "GTC", "status": "ACTIVE"},
    {"ticker": "MSTR", "action": "BUY", "type": "Market", "qty": 12, "tif": "DAY", "status": "NOT YET PLACED — THU MAY 1 POST Q1 REVIEW (Wed Apr 29 AMC). SI-37 exception $2,000."},
    {"ticker": "MSTR", "action": "SELL", "type": "Stop", "qty": 12, "stopPrice": 135.00, "tif": "GTC", "status": "NOT YET PLACED — enter with buy Thursday"},
    {"ticker": "MSTR", "action": "SELL", "type": "Limit", "qty": 12, "limitPrice": 420.00, "tif": "GTC", "status": "NOT YET PLACED — base case. Review if BTC breaks ATH."},
    {"ticker": "AMPX", "action": "SELL", "type": "Stop", "qty": 168, "stopPrice": 18.92, "tif": "GTC", "status": "ACTIVE — RAISED S31 from $17.53"},
    {"ticker": "AMPX", "action": "SELL", "type": "Limit", "qty": 168, "limitPrice": 32.00, "tif": "GTC", "status": "ACTIVE — standalone"},
    {"ticker": "ITM", "action": "SELL", "type": "Stop Limit", "qty": 1200, "stopPrice": 130, "limitPrice": 128, "tif": "GTC", "status": "ACTIVE", "cur": "GBP"},
    {"ticker": "ITM", "action": "SELL", "type": "Limit", "qty": 1200, "limitPrice": 172, "tif": "GTC", "status": "ACTIVE", "cur": "GBP"},
    {"ticker": "ABBV", "action": "SELL", "type": "Stop", "qty": 20, "stopPrice": 192.00, "tif": "GTC", "status": "ACTIVE — EARNINGS WED APR 29 BMO"},
    {"ticker": "RR", "action": "SELL", "type": "Stop", "qty": 100, "stopPrice": 1050, "tif": "GTC", "status": "ACTIVE", "cur": "GBP"},
    {"ticker": "BKR", "action": "BUY", "type": "Limit", "qty": 8, "limitPrice": 63.00, "tif": "GTC", "status": "ACTIVE — patient wait. Price ~$69."},
    {"ticker": "BKR", "action": "SELL", "type": "Stop", "qty": 8, "stopPrice": 53.50, "tif": "GTC", "status": "ACTIVE — OCA"},
    {"ticker": "GOOGL", "action": "BUY", "type": "Limit", "qty": 10, "limitPrice": 315.00, "tif": "GTC", "status": "ACTIVE — price $350, 11.2% above limit. EARNINGS APR 29 AMC."},
    {"ticker": "GOOGL", "action": "SELL", "type": "Stop", "qty": 10, "stopPrice": 285.00, "tif": "GTC", "status": "ACTIVE — OCA"},
    {"ticker": "NOG", "action": "SELL", "type": "Stop", "qty": 80, "stopPrice": 24.49, "tif": "GTC", "status": "ACTIVE — RAISED S31 from $23.92"},
    {"ticker": "V", "action": "SELL", "type": "Stop", "qty": 8, "stopPrice": 285.00, "tif": "GTC", "status": "ACTIVE — EARNINGS TONIGHT AMC"},
    {"ticker": "MP", "action": "BUY", "type": "Limit", "qty": 75, "limitPrice": 55.00, "tif": "GTC", "status": "ACTIVE"},
    {"ticker": "MP", "action": "SELL", "type": "Stop", "qty": 75, "stopPrice": 50.00, "tif": "GTC", "status": "ACTIVE — OCA"},
    {"ticker": "LDO", "action": "SELL", "type": "Stop", "qty": 35, "stopPrice": 50.00, "tif": "GTC", "status": "ACTIVE", "cur": "EUR"},
    {"ticker": "R3NK", "action": "SELL", "type": "Stop Limit", "qty": 25, "stopPrice": 48, "limitPrice": 47, "tif": "GTC", "status": "ACTIVE", "cur": "EUR"},
    {"ticker": "AMZN", "action": "SELL", "type": "Stop Limit", "qty": 30, "stopPrice": 234.39, "limitPrice": 224, "tif": "GTC", "status": "ACTIVE — EARNINGS APR 29 AMC"},
    {"ticker": "MSFT", "action": "SELL", "type": "Stop", "qty": 25, "stopPrice": 400.43, "tif": "GTC", "status": "ACTIVE — EARNINGS APR 29 AMC"},
    {"ticker": "VST", "action": "SELL", "type": "Stop", "qty": 53, "stopPrice": 156.58, "tif": "GTC", "status": "ACTIVE — RAISED S31 from $153.00"},
    {"ticker": "CCJ", "action": "SELL", "type": "Stop", "qty": 49, "stopPrice": 116.96, "tif": "GTC", "status": "ACTIVE — RAISED S31 from $114.99"},
    {"ticker": "PDYN", "action": "SELL", "type": "Stop", "qty": 250, "stopPrice": 5.75, "tif": "GTC", "status": "ACTIVE"},
    {"ticker": "CRML", "action": "SELL", "type": "Stop", "qty": 110, "stopPrice": 10.51, "tif": "GTC", "status": "ACTIVE — RAISED S31 from $9.47. Add bracket cancelled."}
  ],
  "watchlistUS": [
    {"ticker": "CODA", "status": "P11 ACTIVE — STOPPED $11.42 (actual fill) S30 — PRICE $11.22 < $11.51 THRESHOLD — 24HR HOLD → REASSESS WED APR 29", "note": "P21: Re-entry 250-300sh (reduced from 416sh — stop-out indicates imperfect timing). Stop below $10.50. SI-35 compliant. Thesis intact: mine-clearing ops active, US NAVSEA sonar systems, Hormuz dual blockade. May earnings catalyst. DO NOT CHASE above $11.51."},
    {"ticker": "QCOM", "status": "NEW S31 — STAGE 2 POST-WED EARNINGS — OpenAI smartphone chip partnership", "note": "Ming-Chi Kuo (Apr 27): QCOM + MediaTek developing smartphone chips for OpenAI device. Mass production 2028. NOT officially confirmed. QCOM surged 11% Apr 27, closed $150.26 (faded gains — smart money sold into spike). Q2 earnings Wed Apr 29: EPS $2.58 consensus vs $2.85 prior (expected miss). Trades at 50% discount to sector median. Lost Apple as customer — rerating risk. OpenAI angle = potential rejuvenation of commoditising mobile chip vendor. Stage 2: SI-48 tests, fwd PE, earnings trajectory, 2028 production vs near-term revenue catalyst. Assess R/R post-print."},
    {"ticker": "MSTR", "status": "STAGE 2 COMPLETE — ENTER THU MAY 1 POST Q1 REVIEW", "note": "12sh market Thu. Stop $135. Limit $420. SI-37 exception $2,000. Review Apr 29 AMC print first."},
    {"ticker": "LDOS", "status": "GTC $143 ACTIVE — ⚠️ NEAR MISS: Low Apr 27 = $143.39", "note": "45sh. Stop $136. Catalyst May 5 BMO. 39 cents from fill on Apr 27. Monitor closely."},
    {"ticker": "HPE", "status": "WAIT JUN 2 Q2", "note": "SI-48 pass. fwd PE 11.7x. Entry $25-27 post-Jun 2."},
    {"ticker": "BKR", "status": "GTC $63 ACTIVE — price ~$69", "note": "Q1 beat. Record IET orders $4.9B. Patient wait."},
    {"ticker": "GOOGL", "status": "GTC $315 ACTIVE — at $350, earnings Apr 29 AMC", "note": "SI-39 trigger. Limit 11.2% below current."},
    {"ticker": "CDNS", "status": "WATCH — SI-39 TRIGGER $301.16", "note": "Earnings Apr 27 AMC read-through to SNPS/MRVL confirmed."},
    {"ticker": "CRDO", "status": "TRIGGER $181.73 — MONITOR", "note": "Fri close ~$195. Not triggered."},
    {"ticker": "MU", "status": "WAIT — TRIGGER $430.94", "note": "ATH $506.99. -15% trigger. Do not chase."},
    {"ticker": "LEU", "status": "P11 — GTC $168 / STOP $150 / 27sh", "note": "Stopped $170.26. Re-entry only below $170.26."},
    {"ticker": "TTD", "status": "T15 — DO NOT ENTER", "note": "CFO vacancy. Entry: CFO named + 17%+ growth."}
  ],
  "watchlistEU": [
    {"ticker": "IES.L", "status": "IN PORTFOLIO — E15 MANUAL 12.5p", "note": "LDES decision imminent."},
    {"ticker": "ITM.L", "status": "IN PORTFOLIO — 172p LIMIT ACTIVE", "note": "AIM discipline."},
    {"ticker": "RR.L", "status": "IN PORTFOLIO — 100sh — Stop 1050p", "note": "H1 Jul 30."},
    {"ticker": "R3NK", "status": "IN PORTFOLIO — Q1 MAY 6", "note": "200M EUR deferred orders key."},
    {"ticker": "LDO.MI", "status": "IN PORTFOLIO — Stop 50 EUR — CLEARANCE 3.8% TIGHT", "note": "Q1 May 5."},
    {"ticker": "ENR.DE", "status": "SKIP — AWAIT -20% CORRECTION (~EUR 115)"}
  ],
  "sessionNotes": [
    {"date": "2026-04-28", "note": "SESSION 31 — STEP ZERO: Tuesday 28 April 2026. IBKR reconciliation: ISRG NOT in positions screenshot (E16 error). Journal v45 still listed ISRG as active. Stopped out S30 at $471.676 (stop $471.84, slippage $0.164). Trade #23 added: 22sh, entry $459.246, exit $471.676, +$272.24 net. Strong Q1 beat (EPS $2.50 vs $2.08-2.14 est, +17% procedures). Stop exit was not thesis break — stop discipline working. No re-entry at 52-57x earnings."},
    {"date": "2026-04-28", "note": "SESSION 31 CODA P&L CORRECTION — Trade #22 corrected. Image 3 (IBKR Orders) and Image 4 (Trades) confirm CODA filled at $11.42 not $11.51. Additional slippage: $0.09 × 416sh = -$37.44. Corrected P&L: -$243.36 (not -$205.92). Journal v45 had incorrect exit price."},
    {"date": "2026-04-28", "note": "SESSION 31 POET ASSESSMENT — POET collapsed 47% on Apr 27 ($15.10 → $7.95). Marvell cancelled all Celestial AI purchase orders — POET CFO violated confidentiality by disclosing order details in Stocktwits interview. Fund had NO POET position (P11 equivalent correctly applied at $15.10). MRVL fell 4-6% on same news — assessed as supply chain noise, not thesis break. Google ASIC (Dorado) thesis for MRVL unaffected. T21 logged: supplier misconduct cancellation ≠ buyer thesis break."},
    {"date": "2026-04-28", "note": "SESSION 31 QCOM — Surged 11% Apr 27 on OpenAI smartphone chip rumour (Ming-Chi Kuo). Mass production 2028. Not officially confirmed. Faded intraday: opened $156.31, closed $150.26. Q2 earnings Wednesday — EPS $2.58 consensus vs $2.85 prior (expected miss). Added to watchlist for Stage 2 post-Wed earnings. Frame: 'rejuvenation of commoditising mobile chip vendor' — assess whether OpenAI angle is structural or 2028 production story with no near-term catalyst."},
    {"date": "2026-04-28", "note": "SESSION 31 STOP AUDIT — Full T28 review completed. Six changes: CRML $9.47→$10.51 (user set at price floor), AMPX $17.53→$18.92 (T28 fix, above cost), NOG $23.92→$24.49 (above cost, Q1 Thu), CCJ $114.99→$116.96 (profit tighten), VST $153→$156.58 (profit tighten). CRML add bracket (BUY $10/OCA stop $9.47) CANCELLED — T22: dormant bracket 31% below market. No active T28 violations remaining."},
    {"date": "2026-04-28", "note": "SESSION 31 LDOS NEAR MISS — MMD confirms LDOS low Apr 27 was $143.39. GTC buy at $143.00. 39 cents away from fill. Stock closed $144.24. I12 flagged: GTC within 1% of prev session low = near miss flag. Monitor closely — may fill today."},
    {"date": "2026-04-28", "note": "SESSION 31 CODA P11 — Price $11.22 on Apr 27 close (below $11.51 stop-out threshold). 24hr hold elapsed (stop-out was Apr 27). Reassess Wednesday. Re-entry protocol: 250-300sh (P21 reduced sizing), stop below $10.50, SI-35 compliant. Geopolitical thesis intact: Pakistan talks failed, mine-clearing ops active, Iran new proposal structural impasse. Confirmed: will not see CODA name in operational reports (OPSEC). Watch SAM.gov for emergency sole-source awards and CODA May earnings call language."},
    {"date": "2026-04-28", "note": "SESSION 31 GEOPOLITICAL UPDATE — WTI $96.37 (Apr 27 close, +2%). Brent $108.23. Pakistan talks: Trump cancelled envoys Apr 26. Iran submitted new proposal via Pakistani mediators: extend ceasefire + postpone nuclear talks until US lifts blockade. Structural impasse. IEA: biggest energy supply shock on record. SI-25 trigger $100.38 — gap ~$4. Narrowed from $4.70 at S30. Mine-clearing ops confirmed. CODA thesis intact."}
  ],
  "tradeTracker": {
    "closedTrades": [
      {"id":1,"ticker":"CCL","dateIn":"2026-03-24","dateOut":"2026-03-26","qty":240,"entry":24.83,"exit":25.35,"ccy":"USD","pnlUSD":122.35,"note":"S07. +$122.35."},
      {"id":2,"ticker":"ONDS","dateIn":"2026-03-24","dateOut":"2026-03-30","qty":250,"entry":10.90,"exit":8.505,"ccy":"USD","pnlUSD":-601.30,"note":"Stopped. -$601.30."},
      {"id":3,"ticker":"KTOS","dateIn":"2026-03-24","dateOut":"2026-03-30","qty":100,"entry":81.00,"exit":64.977,"ccy":"USD","pnlUSD":-1604.27,"note":"P12. -$1,604.27."},
      {"id":4,"ticker":"UEC","dateIn":"2026-03-25","dateOut":"2026-03-31","qty":206,"entry":13.77,"exit":13.16,"ccy":"USD","pnlUSD":-127.76,"note":"Stopped. -$127.76."},
      {"id":5,"ticker":"IAG","dateIn":"2026-03-27","dateOut":"2026-04-01","qty":2200,"entry":3.55,"exit":3.70,"ccy":"GBP","pnlUSD":407.36,"note":"Peace thesis broken. +$407."},
      {"id":6,"ticker":"RCL","dateIn":"2026-03-24","dateOut":"2026-04-02","qty":36,"entry":273.54,"exit":269.91,"ccy":"USD","pnlUSD":-132.89,"note":"Stopped. -$132.89."},
      {"id":7,"ticker":"LEU","dateIn":"2026-03-24","dateOut":"2026-04-07","qty":13,"entry":188.79,"exit":170.26,"ccy":"USD","pnlUSD":-242.94,"note":"P11 ACTIVE. GTC $168."},
      {"id":8,"ticker":"LDO","dateIn":"2026-03-27","dateOut":"2026-04-07","qty":17,"entry":58.10,"exit":59.56,"ccy":"EUR","pnlUSD":20.51,"note":"T1 closed. T2 35sh active."},
      {"id":9,"ticker":"UPS","dateIn":"2026-04-08","dateOut":"2026-04-08","qty":50,"entry":100.17,"exit":99.60,"ccy":"USD","pnlUSD":-30.61,"note":"Same-day. -$30.61."},
      {"id":10,"ticker":"R3NK","dateIn":"2026-03-26","dateOut":"2026-04-08","qty":80,"entry":51.51,"exit":56.01,"ccy":"EUR","pnlUSD":385.86,"note":"First entry. +$386."},
      {"id":11,"ticker":"PLTR","dateIn":"2026-03-24","dateOut":"2026-04-09","qty":49,"entry":161.608,"exit":134.976,"ccy":"USD","pnlUSD":-1307.11,"note":"P6. -$1,307.11."},
      {"id":12,"ticker":"SHLD","dateIn":"2026-03-24","dateOut":"2026-04-10","qty":69,"entry":72.01,"exit":73.21,"ccy":"USD","pnlUSD":112.65,"note":"Tactical. +$112.65."},
      {"id":13,"ticker":"PDYN","dateIn":"2026-03-25","dateOut":"2026-04-14","qty":250,"entry":6.59,"exit":6.67,"ccy":"USD","pnlUSD":17.42,"note":"250 of 500sh sold."},
      {"id":14,"ticker":"AVAV","dateIn":"2026-03-26","dateOut":"2026-04-15","qty":25,"entry":195.05,"exit":197.945,"ccy":"USD","pnlUSD":70.27,"note":"SI-42. +$70.27."},
      {"id":15,"ticker":"ITM","dateIn":"2026-04-01","dateOut":"2026-04-17","qty":1100,"entry":65.1,"exit":124.60,"ccy":"GBP","pnlUSD":828.00,"note":"Trim 1. +$828."},
      {"id":16,"ticker":"LNG","dateIn":"2026-04-13","dateOut":"2026-04-17","qty":19,"entry":268.813,"exit":248.00,"ccy":"USD","pnlUSD":-396.54,"note":"Stopped. -$396.54."},
      {"id":17,"ticker":"PATK","dateIn":"2026-04-17","dateOut":"2026-04-17","qty":25,"entry":108.80,"exit":109.256,"ccy":"USD","pnlUSD":9.34,"note":"P17. +$9.34."},
      {"id":18,"ticker":"ABVX","dateIn":"2026-04-06","dateOut":"2026-04-21","qty":44,"entry":117.913,"exit":114.26,"ccy":"USD","pnlUSD":-158.53,"note":"Stopped. -$158.53."},
      {"id":19,"ticker":"RR","dateIn":"2026-03-26","dateOut":"2026-04-22","qty":150,"entry":1182.88,"exit":1150.00,"ccy":"GBP","pnlUSD":-62.39,"note":"Stopped. Re-entry 100sh."},
      {"id":20,"ticker":"ITM","dateIn":"2026-04-01","dateOut":"2026-04-24","qty":800,"entry":65.1,"exit":141.20,"ccy":"GBP","pnlUSD":770.00,"note":"Trim 2. +$770."},
      {"id":21,"ticker":"LLY","dateIn":"2026-04-16","dateOut":"2026-04-25","qty":3,"entry":905.344,"exit":875.54,"ccy":"USD","pnlUSD":-89.41,"note":"T28. -$89.41."},
      {"id":22,"ticker":"CODA","dateIn":"2026-04-08","dateOut":"2026-04-27","qty":416,"entry":12.005,"exit":11.42,"ccy":"USD","pnlUSD":-243.36,"note":"S30 stop-out. CORRECTED S31: fill $11.42 (not $11.51). Actual slippage $0.09/sh. Thesis intact. P11 active $11.51. P21: re-entry 250-300sh. E17. -$243.36."},
      {"id":23,"ticker":"ISRG","dateIn":"2026-03-24","dateOut":"2026-04-27","qty":22,"entry":459.246,"exit":471.676,"ccy":"USD","pnlUSD":272.24,"note":"ADDED S31 — E16 correction. Stop $471.84 triggered, filled $471.676 ($0.164 slippage). Q1 beat: EPS $2.50 vs $2.08 est (+20%), revenue +23%. Stop working as intended. No re-entry at 52-57x earnings. +$272.24."}
    ],
    "grossRealizedPnLUSD": -2736.97,
    "lastUpdated": "2026-04-28 S31 — ISRG #23 added, CODA #22 corrected"
  },
  "standingInstructions": [
    {"id":1,"title":"TIMEZONE — MANDATORY ARITHMETIC (E1 CORRECTED S30)","body":"NYSE opens 17:30 UAE / closes 00:00 UAE. LSE opens 11:00 UAE (BST Apr-Oct) / 12:00 UAE (GMT Nov-Mar) / closes 19:30 UAE. XETRA closes 19:00 UAE. COMPUTE — NEVER RECALL."},
    {"id":17,"title":"ERROR TAXONOMY — 17 TYPES","body":"E1:Timezone. E2:Stale position. E3:Fill re-flag. E4:Price verification. E5:Market timing. E6:Dividend. E7:Session discipline. E8:Stale quote. E9:GTC orphan. E10:Closed position scan. E11:52wk hallucination. E12:Tool routing. E13:EODHD delay. E14:Date discrepancy. E15:AIM stop. E16:Tracker-Journal drift. E17:Stop modification sequencing."},
    {"id":25,"title":"SI-25 EXIT TRIGGER","body":"WTI $96.37. Trigger $100.38. Gap ~$4. NOT TRIGGERED. Pakistan talks failed. Iran new proposal — structural impasse. Ceasefire extension is NOT SI-25 trigger."},
    {"id":35,"title":"SI-35: MAX RISK PER TRADE","body":"Maximum $500 loss per trade. No exceptions except SI-37 override. MSTR: SI-37 $2,000 approved."},
    {"id":47,"title":"SI-47: DATE VERIFICATION — STEP ZERO","body":"System prompt date is authoritative. State date before any analysis."},
    {"id":48,"title":"SI-48: AI THESIS ATH RULE","body":"Four tests: fwd PE, structural catalyst, no multiple expansion, PLTR P6 test. MRVL/CEG/SNPS passed. QCOM: assess post-Wed earnings."},
    {"id":57,"title":"SI-57: P11 LOG — LEU + CODA","body":"LEU: stopped $170.26, GTC $168/stop $150/27sh. CODA: stopped $11.42 actual (Apr 27 S30), re-entry 250-300sh below $11.51, stop <$10.50. Reassess Wed Apr 29."},
    {"id":59,"title":"SI-59: STOP MODIFICATION SEQUENCING (E17)","body":"Cancel existing stop FIRST. Confirm Cancelled in IBKR. Then debate new level. Then place new stop. Non-negotiable."}
  ],
  "priceVerificationProtocol": {
    "currentPriceUS": "MMD /v2/aggs/ticker/{TICKER}/prev — field c",
    "52wkRangeUS": "EOD:get_us_live_extended_quotes",
    "currentPriceEUUK": "web_fetch Yahoo Finance / Stockopedia",
    "memoryForbidden": "MEMORY ESTIMATES FOR PRICE OR FUNDAMENTAL DATA ARE FORBIDDEN"
  }
};

const COLORS = {
  bg:"#0d1117",card:"#161b22",border:"#30363d",accent:"#58a6ff",
  green:"#3fb950",red:"#f85149",yellow:"#d29922",blue:"#388bfd",
  text:"#c9d1d9",textDim:"#8b949e",textBright:"#f0f6fc",purple:"#a371f7"
};

export default function TradingJournal() {
  const [data,setData]=useState(()=>{try{const s=localStorage.getItem(STORAGE_KEY);return s?JSON.parse(s):INITIAL_STATE;}catch{return INITIAL_STATE;}});
  const [activeTab,setActiveTab]=useState("positions");
  const [newNote,setNewNote]=useState("");
  useEffect(()=>{try{localStorage.setItem(STORAGE_KEY,JSON.stringify(data));}catch{}},[data]);
  const update=useCallback((d)=>setData(d),[]);
  const addNote=()=>{if(!newNote.trim())return;update({...data,sessionNotes:[...(data.sessionNotes||[]),{date:new Date().toISOString().slice(0,10),note:newNote}]});setNewNote("");};
  const tabs=["positions","orders","thesis","watchlist","tracker","instructions","notes"];
  const pnlColor=(v)=>v>0?COLORS.green:v<0?COLORS.red:COLORS.textDim;

  return(
    <div style={{background:COLORS.bg,minHeight:"100vh",color:COLORS.text,fontFamily:"monospace",padding:16,maxWidth:1200,margin:"0 auto"}}>
      <style>{`.card{background:${COLORS.card};border:1px solid ${COLORS.border};border-radius:6px;padding:12px}.badge{font-size:10px;padding:2px 6px;border-radius:4px;font-weight:600;display:inline-block}.badge-green{background:rgba(63,185,80,0.15);color:${COLORS.green};border:1px solid rgba(63,185,80,0.3)}.badge-red{background:rgba(248,81,73,0.15);color:${COLORS.red};border:1px solid rgba(248,81,73,0.3)}.badge-amber{background:rgba(210,153,34,0.15);color:${COLORS.yellow};border:1px solid rgba(210,153,34,0.3)}.badge-grey{background:rgba(139,148,158,0.15);color:${COLORS.textDim};border:1px solid rgba(139,148,158,0.3)}.badge-purple{background:rgba(163,113,247,0.15);color:${COLORS.purple};border:1px solid rgba(163,113,247,0.3)}.btn{background:${COLORS.card};border:1px solid ${COLORS.border};color:${COLORS.text};padding:6px 12px;border-radius:4px;cursor:pointer;font-family:monospace;font-size:12px}.btn:hover{background:#21262d}.btn-primary{background:rgba(88,166,255,0.15);border-color:rgba(88,166,255,0.4);color:${COLORS.accent}}input{background:${COLORS.card};border:1px solid ${COLORS.border};color:${COLORS.text};padding:8px;border-radius:4px;font-family:monospace;font-size:12px;flex:1}`}</style>

      <div style={{marginBottom:16}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:8}}>
          <div>
            <div style={{fontSize:18,fontWeight:700,color:COLORS.textBright}}>CLAUDE FUND — JOURNAL v46</div>
            <div style={{fontSize:11,color:COLORS.textDim,marginTop:2}}>Session 31 Close — Tue 28 Apr 2026 | {data.fund.account} | {data.lastUpdated}</div>
          </div>
          <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
            {[{label:"NET LIQ",val:`$${(data.fund.netLiquidity/1000).toFixed(1)}K`},{label:"UNREAL",val:`+$${(data.fund.unrealizedPnL/1000).toFixed(1)}K`,color:COLORS.green},{label:"POSITIONS",val:"19",color:COLORS.textBright},{label:"WTI",val:`$${data.thesis.oilWTI}`,color:COLORS.yellow}].map(m=>(
              <div key={m.label} className="card" style={{textAlign:"center",minWidth:80}}>
                <div style={{fontSize:9,color:COLORS.textDim}}>{m.label}</div>
                <div style={{fontSize:14,fontWeight:700,color:m.color||COLORS.textBright,marginTop:2}}>{m.val}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{marginTop:6,padding:"6px 10px",background:"rgba(248,81,73,0.1)",border:"1px solid rgba(248,81,73,0.3)",borderRadius:4,fontSize:11,color:COLORS.red}}>
          EARNINGS: V TONIGHT AMC | ABBV TMW BMO | AMZN+MSFT+MSTR TMW AMC | NOG THU | MSTR ENTRY THU MAY 1
        </div>
        <div style={{marginTop:4,padding:"6px 10px",background:"rgba(63,185,80,0.1)",border:"1px solid rgba(63,185,80,0.3)",borderRadius:4,fontSize:11,color:COLORS.green}}>
          S31: 6 STOPS RAISED ✅ | CRML ADD BRACKET CANCELLED ✅ | ISRG E16 CORRECTED ✅ | QCOM WATCHLIST ADDED ✅
        </div>
        <div style={{marginTop:4,padding:"6px 10px",background:"rgba(210,153,34,0.1)",border:"1px solid rgba(210,153,34,0.3)",borderRadius:4,fontSize:11,color:COLORS.yellow}}>
          LDOS NEAR MISS: Low $143.39 vs GTC $143 (39¢ away) | CODA P11 MET $11.22 — REASSESS WED | WTI $96.37 — SI-25 GAP ~$4
        </div>
      </div>

      <div style={{display:"flex",gap:4,marginBottom:12,flexWrap:"wrap"}}>
        {tabs.map(t=>(<button key={t} className={`btn ${activeTab===t?"btn-primary":""}`} onClick={()=>setActiveTab(t)} style={{textTransform:"uppercase",fontSize:11}}>{t}</button>))}
      </div>

      {activeTab==="positions"&&(
        <div style={{display:"flex",flexDirection:"column",gap:8}}>
          {data.positions?.map((p)=>(
            <div key={p.ticker} className="card" style={{borderLeft:p.unrealPnL>500?`3px solid ${COLORS.green}`:p.unrealPnL<-50?`3px solid ${COLORS.red}`:p.status?.includes("EARNINGS")?`3px solid ${COLORS.yellow}`:p.status?.includes("RAISED S31")?`3px solid ${COLORS.purple}`:undefined}}>
              <div style={{display:"flex",gap:10,alignItems:"center",flexWrap:"wrap",marginBottom:6}}>
                <span style={{fontWeight:700,fontSize:14,color:COLORS.textBright}}>{p.ticker}</span>
                <span style={{fontSize:11,color:COLORS.textDim}}>{p.name||""}</span>
                {p.cur&&<span className="badge badge-grey">{p.cur}</span>}
                {p.status?.includes("EARNINGS")&&<span className="badge badge-amber">EARNINGS</span>}
                {p.status?.includes("RAISED S31")&&<span className="badge badge-purple">↑ S31</span>}
                {p.status?.includes("T28")&&<span className="badge badge-red">T28✓</span>}
                <span className={`badge ${p.unrealPnL>50?"badge-green":p.unrealPnL<-20?"badge-red":"badge-amber"}`}>{p.unrealPnL>=0?"+":""}{p.unrealPct?.toFixed(1)}%</span>
              </div>
              <div style={{display:"flex",gap:16,flexWrap:"wrap",fontSize:11,marginBottom:6}}>
                <span>Shares: <b>{p.shares}</b></span>
                <span>Avg: <b>{p.avgPrice}</b></span>
                <span>Last: <b>{p.last}</b></span>
                <span>P&L: <b style={{color:pnlColor(p.unrealPnL)}}>{p.unrealPnL>=0?"+":""}{p.unrealPnL?.toFixed(0)}</b></span>
                {p.stop&&<span>Stop: <b style={{color:COLORS.yellow}}>{p.stop}</b></span>}
                {p.target&&<span>Target: <b style={{color:COLORS.blue}}>{p.target}</b></span>}
              </div>
              <div style={{fontSize:10,color:COLORS.textDim}}>{p.note}</div>
            </div>
          ))}
        </div>
      )}

      {activeTab==="orders"&&(
        <div style={{display:"flex",flexDirection:"column",gap:6}}>
          {data.pendingOrders?.map((o,i)=>(
            <div key={i} className="card" style={{borderLeft:`3px solid ${o.status?.includes("NOT YET")||o.status?.includes("NEAR MISS")?COLORS.red:o.status?.includes("RAISED")?COLORS.purple:o.action==="BUY"?COLORS.green:COLORS.red}`}}>
              <div style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap"}}>
                <span style={{fontWeight:700}}>{o.ticker}</span>
                <span className={`badge ${o.action==="BUY"?"badge-green":"badge-red"}`}>{o.action}</span>
                <span className="badge badge-grey">{o.type}</span>
                <span style={{fontSize:11}}>Qty: <b>{o.qty}</b></span>
                {o.limitPrice&&<span style={{fontSize:11}}>Lmt: <b>{o.limitPrice}</b></span>}
                {o.stopPrice&&<span style={{fontSize:11}}>Stp: <b>{o.stopPrice}</b></span>}
                <span className={`badge ${o.status?.includes("NOT YET")?"badge-red":o.status?.includes("NEAR MISS")?"badge-red":o.status?.includes("RAISED")?"badge-purple":o.status?.includes("ACTIVE")?"badge-green":"badge-amber"}`}>{o.status?.substring(0,70)}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab==="thesis"&&(
        <div>
          <div className="card" style={{marginBottom:12,borderLeft:`3px solid ${COLORS.red}`}}>
            <div style={{fontWeight:700,color:COLORS.red,marginBottom:8}}>{data.thesis.title}</div>
            <div style={{fontSize:12,lineHeight:1.8}}>{data.thesis.summary}</div>
            <div style={{marginTop:8,fontSize:11,color:COLORS.yellow}}>{data.thesis.SI25Status}</div>
          </div>
          <div style={{fontSize:12,fontWeight:600,color:COLORS.accent,marginBottom:8}}>KEY DATES & ACTIONS</div>
          {data.thesis.keyDates?.map((d,i)=>(
            <div key={i} className="card" style={{marginBottom:6,borderLeft:`3px solid ${d.priority==="CRITICAL"?COLORS.red:d.priority==="HIGH"?COLORS.yellow:COLORS.textDim}`}}>
              <div style={{display:"flex",gap:12,alignItems:"flex-start"}}>
                <span style={{fontSize:11,fontWeight:600,minWidth:220,color:COLORS.textBright}}>{d.date}</span>
                <span style={{fontSize:11,color:COLORS.textDim,flex:1}}>{d.event}</span>
                <span className={`badge ${d.priority==="CRITICAL"?"badge-red":d.priority==="HIGH"?"badge-amber":"badge-grey"}`}>{d.priority}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab==="watchlist"&&(
        <div style={{display:"flex",flexDirection:"column",gap:8}}>
          <div style={{fontWeight:600,color:COLORS.accent,fontSize:12,marginBottom:4}}>US WATCHLIST ({data.watchlistUS?.length} names)</div>
          {data.watchlistUS?.map((w)=>(
            <div key={w.ticker} className="card" style={{borderLeft:w.status?.includes("P11")?`3px solid ${COLORS.red}`:w.status?.includes("NEW S31")?`3px solid ${COLORS.purple}`:w.status?.includes("IN PORTFOLIO")||w.status?.includes("STAGE 2 COMPLETE")?`3px solid ${COLORS.green}`:w.status?.includes("P13")||w.status?.includes("T15")||w.status?.includes("PASSED")?`3px solid ${COLORS.red}`:`3px solid ${COLORS.yellow}`}}>
              <div style={{display:"flex",gap:10,alignItems:"center",flexWrap:"wrap",marginBottom:4}}>
                <span style={{fontWeight:700}}>{w.ticker}</span>
                {w.status?.includes("NEW S31")&&<span className="badge badge-purple">NEW S31</span>}
                {w.status?.includes("P11")&&<span className="badge badge-red">P11</span>}
                <span className={`badge ${w.status?.includes("IN PORTFOLIO")||w.status?.includes("STAGE 2 COMPLETE")?"badge-green":w.status?.includes("P11")||w.status?.includes("P13")||w.status?.includes("T15")?"badge-red":"badge-amber"}`}>{w.status?.substring(0,60)}</span>
              </div>
              {w.note&&<div style={{fontSize:10,color:COLORS.textDim}}>{w.note}</div>}
            </div>
          ))}
          <div style={{fontWeight:600,color:COLORS.accent,fontSize:12,marginTop:8,marginBottom:4}}>EU / UK WATCHLIST</div>
          {data.watchlistEU?.map(w=>(
            <div key={w.ticker} className="card">
              <div style={{display:"flex",gap:10,alignItems:"center",flexWrap:"wrap",marginBottom:4}}>
                <span style={{fontWeight:700}}>{w.ticker}</span>
                {w.status?.includes("IN PORTFOLIO")&&<span className="badge badge-green">IN PORTFOLIO</span>}
                {w.status?.includes("SKIP")&&<span className="badge badge-red">SKIP</span>}
              </div>
              {w.note&&<div style={{fontSize:10,color:COLORS.textDim}}>{w.note}</div>}
            </div>
          ))}
        </div>
      )}

      {activeTab==="tracker"&&(
        <div>
          <div style={{fontSize:12,fontWeight:600,color:COLORS.accent,marginBottom:8}}>
            TRADE TRACKER — {data.tradeTracker?.closedTrades?.length} CLOSED | Gross Realized: ${data.tradeTracker?.grossRealizedPnLUSD?.toFixed(2)}
          </div>
          <div style={{marginBottom:6,padding:"6px 10px",background:"rgba(248,81,73,0.1)",border:"1px solid rgba(248,81,73,0.3)",borderRadius:4,fontSize:11,color:COLORS.red}}>
            P11 ACTIVE — LEU #7: stop $170.26 | CODA #22: stop $11.42 (corrected S31) — re-entry only below stop-out price or confirmed catalyst
          </div>
          <div style={{marginBottom:6,padding:"6px 10px",background:"rgba(163,113,247,0.1)",border:"1px solid rgba(163,113,247,0.3)",borderRadius:4,fontSize:11,color:COLORS.purple}}>
            S31 CORRECTIONS: #22 CODA fill corrected $11.51→$11.42 | #23 ISRG ADDED (E16 fix) +$272.24
          </div>
          {data.tradeTracker?.closedTrades?.map((t)=>(
            <div key={t.id} className="card" style={{marginBottom:4,borderLeft:`3px solid ${t.pnlUSD>0?COLORS.green:COLORS.red}`}}>
              <div style={{display:"flex",gap:10,alignItems:"center",flexWrap:"wrap"}}>
                <span style={{fontSize:10,color:COLORS.textDim,minWidth:20}}>#{t.id}</span>
                <span style={{fontWeight:700}}>{t.ticker}</span>
                <span style={{fontSize:10,color:COLORS.textDim}}>{t.dateIn} → {t.dateOut}</span>
                <span style={{fontSize:11}}>{t.qty}sh @ {t.entry} → {t.exit}</span>
                <span style={{fontWeight:700,color:pnlColor(t.pnlUSD)}}>{t.pnlUSD>=0?"+":""}${t.pnlUSD?.toFixed(2)}</span>
                <span className="badge badge-grey">{t.ccy}</span>
                {t.note?.includes("P11")&&<span className="badge badge-red">P11</span>}
                {t.note?.includes("corrected")&&<span className="badge badge-purple">CORRECTED</span>}
                {t.note?.includes("E16")&&<span className="badge badge-amber">E16✓</span>}
              </div>
              <div style={{fontSize:9,color:COLORS.textDim,marginTop:3}}>{t.note}</div>
            </div>
          ))}
        </div>
      )}

      {activeTab==="instructions"&&(
        <div style={{display:"flex",flexDirection:"column",gap:8}}>
          {data.standingInstructions?.map(ins=>(
            <div key={ins.id} className="card" style={{borderLeft:ins.id===59||ins.id===1?`3px solid ${COLORS.red}`:ins.id===25?`3px solid ${COLORS.yellow}`:undefined}}>
              <div style={{display:"flex",gap:12}}>
                <div style={{fontSize:11,color:ins.id===59||ins.id===1?COLORS.red:ins.id===25?COLORS.yellow:COLORS.accent,fontWeight:700,minWidth:28}}>#{String(ins.id).padStart(2,"0")}</div>
                <div>
                  <div style={{fontWeight:600,color:COLORS.textBright,marginBottom:4,fontSize:12}}>{ins.title}</div>
                  <div style={{fontSize:11,color:COLORS.textDim,lineHeight:1.6}}>{ins.body}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab==="notes"&&(
        <div>
          <div style={{display:"flex",gap:8,marginBottom:12}}>
            <input value={newNote} onChange={e=>setNewNote(e.target.value)} placeholder="Add session note..." onKeyDown={e=>e.key==="Enter"&&!e.shiftKey&&addNote()}/>
            <button className="btn btn-primary" onClick={addNote}>ADD</button>
          </div>
          {(data.sessionNotes||[]).slice().reverse().map((n,i)=>(
            <div key={i} className="card" style={{marginBottom:8}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
                <span style={{fontSize:10,color:COLORS.textDim}}>{n.date}</span>
                <button className="btn" style={{padding:"2px 8px",fontSize:10,color:"#ef4444"}} onClick={()=>{const rev=[...data.sessionNotes].reverse();rev.splice(i,1);update({...data,sessionNotes:rev.reverse()});}}>DEL</button>
              </div>
              <div style={{fontSize:12,lineHeight:1.7}}>{n.note}</div>
            </div>
          ))}
        </div>
      )}

      <div style={{marginTop:24,paddingTop:12,borderTop:`1px solid ${COLORS.border}`,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:8}}>
        <span style={{fontSize:10,color:COLORS.textDim}}>JOURNAL v46 | S31 | {data.fund.account} | 19 POSITIONS | STOP AUDIT COMPLETE</span>
        <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
          <span className="badge badge-green">STOPS RAISED ✅</span>
          <span className="badge badge-green">ISRG E16 FIXED ✅</span>
          <span className="badge badge-purple">QCOM WATCHLIST</span>
          <span className="badge badge-red">CODA P11 REASSESS WED</span>
          <span className="badge badge-amber">V EARNINGS TONIGHT</span>
        </div>
      </div>
    </div>
  );
}
