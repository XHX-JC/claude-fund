import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "fund_journal_v3";

// ═══════════════════════════════════════════════════════════════════
// SESSION CLOSE CHECKLIST — CLAUDE EXECUTES AT EVERY SESSION END
// filesystem:write_file → journal, FUND_SESSION_STATE.md, LESSONS_LEARNED.md
// Allowed paths: C:\Users\jcadb\claude-fund\
// ═══════════════════════════════════════════════════════════════════
// TIMEZONE REFERENCE — MANDATORY (E1 CORRECTED S30)
// NYSE: opens 17:30 UAE / closes 00:00 UAE
// LSE:  opens 11:00 UAE (BST/summer) / 12:00 UAE (GMT/winter) / closes 19:30 UAE (BST)
// XETRA/BVME: opens 11:00 UAE / closes 19:00 UAE
// ⚠️ E1 CORRECTION S30: LSE opens 11:00 UAE during BST (Apr-Oct). Previous 12:00 was GMT winter hours. Always verify BST vs GMT before LSE orders.
// ═══════════════════════════════════════════════════════════════════

const INITIAL_STATE = {
  "lastUpdated": "2026-04-27 SESSION 30 CLOSE — 3 fills (MRVL/CEG/SNPS) — CODA stopped out — MSTR Stage 2 complete",
  "sessionNumber": "S30",
  "fund": {
    "account": "U24936508",
    "netLiquidity": 105200,
    "unrealizedPnL": 7182,
    "realizedPnL": 350.61,
    "cashBase": 25148,
    "cashFloorRule": "10% of NL = $10,520 minimum. NEVER go below.",
    "deployableCash": 14628,
    "deployableCashNote": "LDOS $143 GTC pending — $6,435 when filled. MSTR $2,040 Thursday pending. Remaining deployable ~$8,193 after both.",
    "broker": "IBKR Pro",
    "baseCurrency": "USD",
    "location": "UAE",
    "ibkrEuropeanAccess": "APPROVED — March 26 2026",
    "lastUpdated": "2026-04-27 S30 close. NL ~$105.2K. 20 positions. MRVL/CEG/SNPS filled. CODA stopped -$205.92 P11 active. MSTR Thursday May 1 entry. Heavy earnings week V/ABBV/AMZN/MSFT/NOG.",
    "note": "JOURNAL v45. Monday 27 Apr 2026. 20 positions. 3 fills today. CODA stopped out. E17 new error. E1 BST correction. MSTR Stage 2 done — enter Thursday post Q1 earnings."
  },
  "thesis": {
    "title": "DUAL BLOCKADE — PAKISTAN TALKS FAILED — WTI RISING — CEASEFIRE EXTENDED",
    "summary": "Pakistan talks (Apr 25-26) produced no deal. Trump cancelled envoys, Iran sent revised proposal, Araghchi left without meeting US officials. No breakthrough. Ceasefire extended indefinitely. WTI rising to $95.66+ on talks collapse. Hormuz dual blockade continues. Mine-clearing ops active — CODA thesis intact despite stop-out. NOG/thesis solid.",
    "oilWTI": 95.66,
    "oilWTINote": "WTI rising from $94.40 to $95.66+ on Pakistan talks collapse. SI-25 trigger $100.38 — gap ~$4.70. Not triggered. War premium intact.",
    "hormuzStatus": "DUAL BLOCKADE ACTIVE. US seizing Iranian tankers. Iran seizing cargo ships. Mine-clearing ops active — CODA thesis confirmed but position stopped on noise. P11 re-entry watch $11.51.",
    "keyDates": [
      {"date": "Tue Apr 28 AMC", "event": "V earnings — 8sh held. Consensus EPS $3.09. Stop $285. P24 hold. DO NOT TOUCH.", "priority": "CRITICAL"},
      {"date": "Wed Apr 29 BMO", "event": "ABBV Q1 — WEDNESDAY BEFORE OPEN. Consensus EPS $2.69. Stop $192. DO NOT TOUCH.", "priority": "CRITICAL"},
      {"date": "Wed Apr 29 AMC", "event": "AMZN Q1 — AWS growth key. Consensus $1.63. Stop $234.39. DO NOT TOUCH.", "priority": "CRITICAL"},
      {"date": "Wed Apr 29 AMC", "event": "MSFT Q3 — Azure CC 37-38% guided. Stop $400.43. DO NOT TOUCH.", "priority": "CRITICAL"},
      {"date": "Wed Apr 30 AMC", "event": "MSTR Q1 earnings — review print before Thursday entry decision.", "priority": "CRITICAL"},
      {"date": "Thu May 1 open", "event": "MSTR entry decision — 12sh market entry if Q1 clean. Stop $135. Sell limit $420. SI-37 exception $2,000.", "priority": "CRITICAL"},
      {"date": "Thu Apr 30", "event": "NOG Q1 at war-premium WTI. Stop $23.92.", "priority": "HIGH"},
      {"date": "May 5 BMO", "event": "LDOS Q1 — catalyst gate. EPS $2.88. Watch bookings vs 1.02x.", "priority": "HIGH"},
      {"date": "May 5", "event": "LDO.MI Q1 — stop €50, clearance 3.8% TIGHT.", "priority": "HIGH"},
      {"date": "May 6", "event": "R3NK Q1 — 200M EUR deferred orders must appear.", "priority": "HIGH"},
      {"date": "May 7", "event": "AMPX Q1. Stop $17.53.", "priority": "HIGH"},
      {"date": "May 11", "event": "CEG Q1 — catalyst gate. Stop $278.", "priority": "HIGH"},
      {"date": "May 20", "event": "SNPS Q2 FY26 — catalyst gate. Stop $440.", "priority": "HIGH"},
      {"date": "May 28", "event": "MRVL Q1 FY27 — catalyst gate. Google ASIC confirmed. Stop $135.", "priority": "HIGH"},
      {"date": "Jun 2", "event": "HPE Q2 FY26 — entry review gate. Entry $25-27 post-Q2.", "priority": "HIGH"},
      {"date": "ONGOING", "event": "CODA P11 watch — re-entry below $11.51 OR on confirmed mine-clearing contract/emergency order. DO NOT CHASE above $11.51.", "priority": "HIGH"},
      {"date": "ONGOING", "event": "LDOS GTC $143 pending fill. Catalyst May 5 BMO.", "priority": "HIGH"}
    ]
  },
  "positions": [
    {"ticker": "AMZN", "name": "Amazon.com Inc", "shares": 30, "avgPrice": 201.204, "costBasis": 6036, "last": 261.56, "unrealPnL": 1815, "unrealPct": 30.0, "stop": 234.39, "stopType": "Stop Limit", "stopLimit": 224, "target": 300, "status": "HOLD — EARNINGS WED APR 29 AMC — DO NOT TOUCH STOP", "note": "AWS growth rate key. 93% beat probability. If AWS 28%+ raise stop to $242-245 post-results."},
    {"ticker": "ITM", "name": "ITM Power PLC", "shares": 1200, "avgPrice": 65.1, "costBasis": 781, "last": 149.40, "unrealPnL": 1012, "unrealPct": 129.5, "stop": 130, "stopType": "Stop Limit", "stopLimit": 128, "target": 172, "cur": "GBP", "status": "HOLD — 172p GTC LIMIT ACTIVE — STOP LIMIT 130p/128p — Thesis: defence angle + LDES + Rheinmetall synthetic fuel", "note": "172p limit placed S30. Decision: keep limit — stock at 40% above analyst consensus (Berenberg 110p), AIM risk management discipline. If 172p fills reassess fresh thesis. Do not remove limit speculatively."},
    {"ticker": "MSFT", "name": "Microsoft Corp", "shares": 25, "avgPrice": 372.77, "costBasis": 9319, "last": 420.36, "unrealPnL": 1189, "unrealPct": 12.8, "stop": 400.43, "target": 450, "status": "HOLD — EARNINGS WED APR 29 AMC — DO NOT TOUCH STOP", "note": "Azure CC 37-38% guided. Fairwater live ahead of schedule. Stop $400.43 profit-locked."},
    {"ticker": "CCJ", "name": "Cameco Corp", "shares": 49, "avgPrice": 104.021, "costBasis": 5097, "last": 122.37, "unrealPnL": 890, "unrealPct": 17.5, "stop": 114.99, "target": 136, "status": "HOLD — STOP $114.99 GTC", "note": "Nuclear thesis intact."},
    {"ticker": "ISRG", "name": "Intuitive Surgical Inc", "shares": 22, "avgPrice": 459.246, "costBasis": 10103, "last": 482.30, "unrealPnL": 512, "unrealPct": 5.1, "stop": 471.84, "target": 598, "status": "HOLD — STOP $471.84 GTC CONFIRMED IBKR", "note": "Stop raised $468 to $471.84 (S29-SUPP). P16 logged."},
    {"ticker": "AMPX", "name": "Amprius Technologies", "shares": 168, "avgPrice": 18.106, "costBasis": 3042, "last": 20.90, "unrealPnL": 469, "unrealPct": 15.4, "stop": 17.53, "target": 32, "status": "HOLD — STOP $17.53 GTC — LIMIT $32 GTC STANDALONE — EARNINGS MAY 7", "note": "Two standalone SELL orders confirmed 168sh each. OCA linkage not possible via separate entry — simultaneous fill risk near zero given price gap $17.53 to $32."},
    {"ticker": "VST", "name": "Vistra Corp", "shares": 53, "avgPrice": 150.569, "costBasis": 7980, "last": 163.71, "unrealPnL": 696, "unrealPct": 8.7, "stop": 153.00, "target": 220, "status": "HOLD — STOP RAISED $151.50 TO $153 S30", "note": "Stop raised Monday. Fri close $164.35 confirmed trigger met."},
    {"ticker": "CRML", "name": "Critical Metals Corp", "shares": 110, "avgPrice": 9.08, "costBasis": 999, "last": 11.63, "unrealPnL": 280, "unrealPct": 28.0, "stop": 9.47, "target": 15, "status": "HOLD — STOP $9.47 GTC — ADD ORDER $10.00 GTC LIVE (OCA)", "note": "US EXIM $620M interest. Add bracket active."},
    {"ticker": "NOG", "name": "Northern Oil and Gas Inc", "shares": 80, "avgPrice": 24.383, "costBasis": 1951, "last": 26.90, "unrealPnL": 201, "unrealPct": 10.3, "stop": 23.92, "target": null, "status": "HOLD — STOP $23.92 GTC — Pakistan talks failed, WTI rising — Q1 APR 30", "note": "Stop just below cost $24.383. War premium intact. Pakistan talks no deal — thesis confirmed today."},
    {"ticker": "R3NK", "name": "RENK Group AG", "shares": 25, "avgPrice": 52.27, "costBasis": 1307, "last": 55.37, "unrealPnL": 72, "unrealPct": 5.5, "stop": 48, "stopType": "Stop Limit", "stopLimit": 47, "target": 76, "cur": "EUR", "status": "HOLD — STOP LIMIT 48/47 EUR GTC — EARNINGS MAY 6", "note": "200M EUR deferred orders must appear Q1."},
    {"ticker": "MRVL", "name": "Marvell Technology Inc", "shares": 10, "avgPrice": 152.10, "costBasis": 1521, "last": 154.29, "unrealPnL": 23, "unrealPct": 1.5, "stop": 135, "target": 420, "status": "HOLD — FILLED S30 $152 — STOP $135 GTC — CATALYST MAY 28", "note": "Filled at open S30 as stock gapped down -6.1% on CDNS read-through. Excellent bracket discipline — GTC captured the move. Google ASIC confirmed. SI-48: all 4 tests passed. Conservative target $420, bull case $600+."},
    {"ticker": "V", "name": "Visa Inc-Class A", "shares": 8, "avgPrice": 307.125, "costBasis": 2457, "last": 309.24, "unrealPnL": 18, "unrealPct": 0.7, "stop": 285, "target": 380, "status": "HOLD — EARNINGS TUE APR 28 AMC — P24 HOLD — STOP $285", "note": "Oil war premium = higher nominal transaction values = EPS tailwind. Consensus $3.09."},
    {"ticker": "RR", "name": "Rolls-Royce Holdings PLC", "shares": 100, "avgPrice": 1128.6, "costBasis": 1129, "last": 1140.40, "unrealPnL": 12, "unrealPct": 1.0, "stop": 1050, "target": 1500, "cur": "GBP", "status": "HOLD — STOP 1050p GTC — H1 JUL 30", "note": "T27 re-entry at 1128.6p. SMR/Wylfa + naval + civil aero."},
    {"ticker": "CGCT", "name": "Cartesian Growth Corp III", "shares": 291, "avgPrice": 10.295, "costBasis": 2996, "last": 10.31, "unrealPnL": 4, "unrealPct": 0.1, "stop": null, "target": null, "status": "HOLD — NO STOP — SPAC TRUST FLOOR ~$10.27", "note": "Business combination ~May 2026 — FAC listing."},
    {"ticker": "SNPS", "name": "Synopsys Inc", "shares": 8, "avgPrice": 495.125, "costBasis": 3961, "last": 493.97, "unrealPnL": -8, "unrealPct": -0.2, "stop": 440, "target": 630, "status": "HOLD — FILLED S30 $495 — STOP $440 GTC — CATALYST MAY 20", "note": "Filled S30. EDA duopoly + Ansys integration + Nvidia $2B investment. CDNS earnings tonight drove SNPS lower — GTC captured the move. -23% from ATH. Stop $440 bracket active."},
    {"ticker": "IES", "name": "Invinity Energy Systems PLC", "shares": 3000, "avgPrice": 17.49, "costBasis": 525, "last": 17.50, "unrealPnL": 0, "unrealPct": 0.1, "stop": null, "stopType": "MANUAL ALERT 12.5p", "target": 45, "cur": "GBP", "status": "HOLD — E15: NO IBKR STOPS FOR AIM — MANUAL ALERT 12.5p", "note": "LDES Cap and Floor decision imminent."},
    {"ticker": "CEG", "name": "Constellation Energy Corp", "shares": 14, "avgPrice": 308.072, "costBasis": 4313, "last": 309.40, "unrealPnL": 21, "unrealPct": 0.5, "stop": 278, "target": 395, "status": "HOLD — FILLED S30 $308 — STOP $278 GTC — CATALYST MAY 11", "note": "Filled S30 at exact limit $308. Nuclear scarcity + AI power demand. Calpine acquisition complete. 20%+ EPS growth guided 2026-2029. Stop $278 bracket active."},
    {"ticker": "ABBV", "name": "AbbVie Inc", "shares": 20, "avgPrice": 205.22, "costBasis": 4104, "last": 200.18, "unrealPnL": -99, "unrealPct": -2.4, "stop": 192.00, "target": 249, "status": "HOLD — STOP $192 GTC — EARNINGS WED APR 29 BMO — E14 CORRECTED", "note": "WEDNESDAY BEFORE OPEN. Consensus $2.69 EPS, Skyrizi $4.41B."},
    {"ticker": "PDYN", "name": "Palladyne AI Corp", "shares": 250, "avgPrice": 6.595, "costBasis": 1649, "last": 6.13, "unrealPnL": -116, "unrealPct": -7.1, "stop": 5.75, "target": null, "status": "HOLD — STOP $5.75 GTC — EARNINGS MAY 13", "note": "250sh remaining after S18 partial exit."},
    {"ticker": "LDO", "name": "Leonardo SpA", "shares": 35, "avgPrice": 56.086, "costBasis": 1963, "last": 52.83, "unrealPnL": -115, "unrealPct": -5.8, "stop": 50, "target": 76, "cur": "EUR", "status": "HOLD — STOP 50 EUR GTC — CLEARANCE 3.8% TIGHT — Q1 MAY 5", "note": "Stop 3.8% clearance extremely tight. Do NOT widen stop."}
  ],
  "pendingOrders": [
    {"ticker": "LDOS", "action": "BUY", "type": "Limit", "qty": 45, "limitPrice": 143.00, "tif": "GTC", "status": "ACTIVE — NOT YET FILLED. Catalyst Q1 May 5 BMO."},
    {"ticker": "LDOS", "action": "SELL", "type": "Stop", "qty": 45, "stopPrice": 136.00, "tif": "GTC", "status": "ACTIVE — OCA bracket with LDOS BUY $143"},
    {"ticker": "MRVL", "action": "SELL", "type": "Stop", "qty": 10, "stopPrice": 135.00, "tif": "GTC", "status": "ACTIVE — child bracket from S30 fill"},
    {"ticker": "CEG", "action": "SELL", "type": "Stop", "qty": 14, "stopPrice": 278.00, "tif": "GTC", "status": "ACTIVE — child bracket from S30 fill"},
    {"ticker": "SNPS", "action": "SELL", "type": "Stop", "qty": 8, "stopPrice": 440.00, "tif": "GTC", "status": "ACTIVE — child bracket from S30 fill"},
    {"ticker": "MSTR", "action": "BUY", "type": "Market", "qty": 12, "tif": "DAY", "status": "NOT YET PLACED — THURSDAY MAY 1 POST Q1 EARNINGS REVIEW. SI-37 exception $2,000. Review Apr 30 AMC print first."},
    {"ticker": "MSTR", "action": "SELL", "type": "Stop", "qty": 12, "stopPrice": 135.00, "tif": "GTC", "status": "NOT YET PLACED — enter with buy Thursday as bracket"},
    {"ticker": "MSTR", "action": "SELL", "type": "Limit", "qty": 12, "limitPrice": 420.00, "tif": "GTC", "status": "NOT YET PLACED — base case exit. Review if BTC breaks ATH — consider raising to $600+. Tiered exit option: 6sh @$420 then raise stop on remaining 6sh."},
    {"ticker": "AMPX", "action": "SELL", "type": "Stop", "qty": 168, "stopPrice": 17.53, "tif": "GTC", "status": "ACTIVE — standalone (not OCA linked)"},
    {"ticker": "AMPX", "action": "SELL", "type": "Limit", "qty": 168, "limitPrice": 32.00, "tif": "GTC", "status": "ACTIVE — standalone (not OCA linked). Simultaneous fill risk near zero."},
    {"ticker": "ITM", "action": "SELL", "type": "Stop Limit", "qty": 1200, "stopPrice": 130, "limitPrice": 128, "tif": "GTC", "status": "ACTIVE", "cur": "GBP"},
    {"ticker": "ITM", "action": "SELL", "type": "Limit", "qty": 1200, "limitPrice": 172, "tif": "GTC", "status": "ACTIVE — placed S30 before LSE open", "cur": "GBP"},
    {"ticker": "CRML", "action": "BUY", "type": "Limit", "qty": 40, "limitPrice": 10.00, "tif": "GTC", "status": "ACTIVE — OCA with stop $9.47"},
    {"ticker": "CRML", "action": "SELL", "type": "Stop", "qty": 40, "stopPrice": 9.47, "tif": "GTC", "status": "ACTIVE — OCA"},
    {"ticker": "CRML", "action": "SELL", "type": "Stop", "qty": 110, "stopPrice": 9.47, "tif": "GTC", "status": "ACTIVE"},
    {"ticker": "ABBV", "action": "SELL", "type": "Stop", "qty": 20, "stopPrice": 192.00, "tif": "GTC", "status": "ACTIVE — EARNINGS WED APR 29 BMO"},
    {"ticker": "RR", "action": "SELL", "type": "Stop", "qty": 100, "stopPrice": 1050, "tif": "GTC", "status": "ACTIVE", "cur": "GBP"},
    {"ticker": "BKR", "action": "BUY", "type": "Limit", "qty": 8, "limitPrice": 63.00, "tif": "GTC", "status": "ACTIVE — raised from $58.50 S30. BKR at $68.94 — 8.5% above limit, patient wait."},
    {"ticker": "BKR", "action": "SELL", "type": "Stop", "qty": 8, "stopPrice": 53.50, "tif": "GTC", "status": "ACTIVE — OCA stays $53.50"},
    {"ticker": "GOOGL", "action": "BUY", "type": "Limit", "qty": 10, "limitPrice": 315.00, "tif": "GTC", "status": "ACTIVE — earnings APR 29 AMC"},
    {"ticker": "GOOGL", "action": "SELL", "type": "Stop", "qty": 10, "stopPrice": 285.00, "tif": "GTC", "status": "ACTIVE — OCA"},
    {"ticker": "NOG", "action": "SELL", "type": "Stop", "qty": 80, "stopPrice": 23.92, "tif": "GTC", "status": "ACTIVE"},
    {"ticker": "V", "action": "SELL", "type": "Stop", "qty": 8, "stopPrice": 285.00, "tif": "GTC", "status": "ACTIVE — EARNINGS TUE APR 28 AMC"},
    {"ticker": "MP", "action": "BUY", "type": "Limit", "qty": 75, "limitPrice": 55.00, "tif": "GTC", "status": "ACTIVE"},
    {"ticker": "MP", "action": "SELL", "type": "Stop", "qty": 75, "stopPrice": 50.00, "tif": "GTC", "status": "ACTIVE — OCA"},
    {"ticker": "LDO", "action": "SELL", "type": "Stop", "qty": 35, "stopPrice": 50.00, "tif": "GTC", "status": "ACTIVE", "cur": "EUR"},
    {"ticker": "R3NK", "action": "SELL", "type": "Stop Limit", "qty": 25, "stopPrice": 48, "limitPrice": 47, "tif": "GTC", "status": "ACTIVE", "cur": "EUR"},
    {"ticker": "AMZN", "action": "SELL", "type": "Stop Limit", "qty": 30, "stopPrice": 234.39, "limitPrice": 224, "tif": "GTC", "status": "ACTIVE — EARNINGS APR 29 AMC"},
    {"ticker": "MSFT", "action": "SELL", "type": "Stop", "qty": 25, "stopPrice": 400.43, "tif": "GTC", "status": "ACTIVE — EARNINGS APR 29 AMC"},
    {"ticker": "ISRG", "action": "SELL", "type": "Stop", "qty": 22, "stopPrice": 471.84, "tif": "GTC", "status": "ACTIVE — CONFIRMED IBKR"},
    {"ticker": "VST", "action": "SELL", "type": "Stop", "qty": 53, "stopPrice": 153.00, "tif": "GTC", "status": "ACTIVE — RAISED $151.50 TO $153 S30"},
    {"ticker": "CCJ", "action": "SELL", "type": "Stop", "qty": 49, "stopPrice": 114.99, "tif": "GTC", "status": "ACTIVE"},
    {"ticker": "PDYN", "action": "SELL", "type": "Stop", "qty": 250, "stopPrice": 5.75, "tif": "GTC", "status": "ACTIVE"}
  ],
  "watchlistUS": [
    {"ticker": "CODA", "name": "Coda Octopus Group Inc", "status": "P11 ACTIVE — STOPPED $11.51 S30 — RE-ENTRY ONLY BELOW $11.51 OR ON CONFIRMED CATALYST", "note": "Stopped out S30 at $11.51, -$205.92 (trade #22). Thesis INTACT — mine-clearing operations in Strait of Hormuz active. US shoot-and-kill orders on Iranian mine-laying vessels confirmed. Re-entry triggers: (1) price below $11.51 on low volume, (2) named contract or emergency procurement order. DO NOT CHASE. E17 lesson: stop modification must precede discussion. CODA May earnings — flag for fresh Stage 2 if re-entry conditions met."},
    {"ticker": "MSTR", "name": "Strategy Inc", "status": "STAGE 2 COMPLETE — ENTER THURSDAY MAY 1 MARKET — POST Q1 REVIEW", "note": "Stage 2 complete S30. 815,061 BTC held at $75,527 avg. mNAV 1.22x. BTC $77,800 today. Q1 earnings Apr 30 AMC — review first. Entry: 12sh market open Thu May 1. Stop $135 OCA. Sell limit $420 OCA (base case). SI-37 exception: $2,000 allocation deliberately approved. Scenario map: BTC $100-125K = MSTR $300-450 (base, $420 limit captures). BTC $150-175K = MSTR $600-950 (bull, raise limit). Tiered exit option: 6sh @$420, raise stop remaining 6sh if BTC breaks ATH. T29 logged."},
    {"ticker": "LDOS", "name": "Leidos Holdings", "status": "GTC $143 ACTIVE — PENDING FILL — Q1 MAY 5", "note": "Stage 2 complete. Entrust CLOSED Mar 30. Leverage 2.6x — bridge converted permanent bonds. DOGE actual $560K. Book-to-bill 1.02x (not 1.3x — S1 correction). $49B backlog 2.9x TTM. Analyst consensus $211 (45% upside). GTC $143 + stop $136. 45sh. $315 max loss."},
    {"ticker": "HPE", "name": "Hewlett Packard Enterprise", "status": "WAIT JUN 2 Q2", "note": "All 4 SI-48 tests pass. fwd PE 11.7x. Entry post-Jun 2 at $25-27."},
    {"ticker": "CEG", "name": "Constellation Energy Corp", "status": "IN PORTFOLIO — FILLED S30 $308", "note": "Filled. Stop $278. Catalyst May 11."},
    {"ticker": "SNPS", "name": "Synopsys Inc", "status": "IN PORTFOLIO — FILLED S30 $495", "note": "Filled. Stop $440. Catalyst May 20."},
    {"ticker": "MRVL", "name": "Marvell Technology Inc", "status": "IN PORTFOLIO — FILLED S30 $152", "note": "Filled at open on CDNS read-through gap down. Stop $135. Catalyst late May/early June."},
    {"ticker": "CRDO", "name": "Credo Technology Group", "status": "NEW TRIGGER $181.73 — MONITOR", "note": "Trigger $181.73. Fri close ~$195. Not triggered."},
    {"ticker": "BKR", "name": "Baker Hughes", "status": "ACTIVE — BUY $63 GTC — price $68.94 — 8.5% above limit", "note": "Q1 beat EPS $0.58 vs $0.49. Record IET orders $4.9B. Patient wait at $63."},
    {"ticker": "GOOGL", "name": "Alphabet Inc", "status": "ACTIVE — BUY $315 GTC — EARNINGS APR 29 AMC", "note": "SI-39 trigger. Price ~$344. Q1 earnings Apr 29 AMC."},
    {"ticker": "CDNS", "name": "Cadence Design Systems", "status": "WATCH — EARNINGS TONIGHT APR 27 AMC — SI-39 TRIGGER $301.16", "note": "Fri close $332.89. If 7%+ gap down (~$309) review SI-39 trigger $301.16. CDNS move read-through to SNPS/MRVL confirmed today."},
    {"ticker": "MU", "name": "Micron Technology", "status": "WAIT — ATH $506.99 — TRIGGER $430.94", "note": "New ATH $506.99. Trigger $430.94 (-15%). Do not chase."},
    {"ticker": "LEU", "name": "Centrus Energy Corp", "status": "P11 ACTIVE — GTC $168 / STOP $150 / 27sh", "note": "Trade #7: stopped $170.26. P11 re-entry only below $170.26. Current $205.63 blocks entry."},
    {"ticker": "TTD", "name": "The Trade Desk", "status": "T15 WATCH — DO NOT ENTER", "note": "CFO vacancy. Entry requires: CFO named + 17%+ growth."},
    {"ticker": "NXPI", "name": "NXP Semiconductors", "status": "DEFERRED — STAGE 2 NEXT WEEK", "note": "Fri close $244.04. Research needed."},
    {"ticker": "MOH", "name": "Molina Healthcare", "status": "POLITICAL BINARY — WATCHLIST ONLY", "note": "8.4x fwd PE. Medicaid cuts primary risk."},
    {"ticker": "MCHP", "name": "Microchip Technology", "status": "P13 HARD BLOCK — AT ATH $89.19 — SI-39 TRIGGER $75.81", "note": "At ATH. P13 HARD BLOCK. Watch May 11 earnings."},
    {"ticker": "OXY", "name": "Occidental Petroleum", "status": "PASSED — CAPITAL BETTER DEPLOYED ELSEWHERE", "note": "NOG provides oil premium exposure."}
  ],
  "watchlistEU": [
    {"ticker": "IES.L", "name": "Invinity Energy Systems", "status": "IN PORTFOLIO — E15 MANUAL 12.5p", "note": "LDES Cap and Floor decision imminent."},
    {"ticker": "ITM.L", "name": "ITM Power PLC", "status": "IN PORTFOLIO — 172p LIMIT ACTIVE", "note": "172p GTC placed S30. Decision: maintain 172p — AIM discipline at 40% above analyst consensus. If fills, reassess fresh thesis."},
    {"ticker": "RR.L", "name": "Rolls-Royce Holdings", "status": "IN PORTFOLIO — 100sh — Stop 1050p", "note": "T27 re-entry. H1 Jul 30."},
    {"ticker": "R3NK", "name": "RENK Group AG", "status": "IN PORTFOLIO — Q1 MAY 6", "note": "200M EUR deferred orders key."},
    {"ticker": "LDO.MI", "name": "Leonardo SpA", "status": "IN PORTFOLIO — Stop 50 EUR — CLEARANCE 3.8% TIGHT", "note": "Q1 May 5."},
    {"ticker": "ENR.DE", "name": "Siemens Energy AG", "status": "SKIP — AWAIT -20% CORRECTION (~EUR 115)"}
  ],
  "sessionNotes": [
    {"date": "2026-04-27", "note": "SESSION 30 — STEP ZERO: Monday 27 April 2026. E1 CORRECTION: LSE opens 11:00 UAE (BST) not 12:00 — winter GMT hours were incorrect. ITM 172p GTC placed before LSE open. All four bracket orders entered: CEG $308/14sh, SNPS $495/8sh, MRVL $152/10sh, LDOS $143/45sh. BKR limit raised $58.50→$63. VST stop raised $151.50→$153."},
    {"date": "2026-04-27", "note": "SESSION 30 FILLS — Three GTC limits triggered at NYSE open (17:30 UAE): MRVL filled $152.00 (stock gapped -6.10% on CDNS EDA read-through — bracket discipline excellent, entered $12.29 below Friday close). CEG filled $308.00 exactly at limit. SNPS filled $495.00. LDOS pending. All three stop brackets confirmed active in IBKR orders tab."},
    {"date": "2026-04-27", "note": "SESSION 30 CODA STOP-OUT — CODA stopped at $11.51, -$205.92, trade #22. No news driving decline — micro-cap noise on thin volume. Thesis intact (mine-clearing operations, Hormuz dual blockade, CODA sonar technology). E17 NEW ERROR: stop modification discussion occurred BEFORE cancelling the existing stop order — the stop executed during the discussion. Protocol fix: cancel existing stop IMMEDIATELY when modification is requested, then debate new level. P11 active at $11.51. Re-entry: below $11.51 or on confirmed catalyst. Waited 24 hours minimum — not re-entering today on emotion."},
    {"date": "2026-04-27", "note": "SESSION 30 AMPX FIX — AMPX stop quantity error caught: Stop $17.53 was entered as 100sh not 168sh. Corrected to 168sh. Limit $32 was correct at 168sh. Both orders standalone (not OCA linked) — acceptable given simultaneous fill probability near zero between $17.53 and $32."},
    {"date": "2026-04-27", "note": "SESSION 30 MSTR — Stage 2 complete. 815,061 BTC at $75,527 avg cost. mNAV 1.22x. BTC $77,800 (above cost basis — first time in profit). Q1 earnings Apr 30 AMC. Entry decision Thursday May 1 at market open after reviewing Q1 print. 12sh, stop $135, sell limit $420. SI-37 exception: $2,000 allocation deliberately approved based on high conviction BTC ATH thesis (>$126,080 by Dec 2026). BTC cycle: summer consolidation, September surge historical pattern. External scenario map: BTC $100-125K = MSTR $300-450 (base). BTC $150-175K = MSTR $600-950 (bull). T29 logged."},
    {"date": "2026-04-27", "note": "SESSION 30 GEOPOLITICAL — Pakistan talks (Apr 25-26) failed. Trump cancelled envoys, Araghchi left without meeting US officials. No deal. Ceasefire extended indefinitely. WTI rising $94.40→$95.66+ on talks collapse. SI-25 trigger $100.38 — gap ~$4.70. Not triggered. War premium intact. NOG +0.71%, RR.L +0.97%. CODA thesis intact despite stop-out."},
    {"date": "2026-04-27", "note": "SESSION 30 ITM THESIS — Discussed whether to remove 172p limit and target 300p+. Decision: maintain 172p limit. Reasoning: stock at 40% above highest analyst consensus (Berenberg 110p), AIM stock with negative EBITDA at 2,300x revenue equivalent risk profile, momentum-only hold above 172p. Defence angle (Rheinmetall synthetic fuel) and LDES scheme are genuine catalysts but not yet contracted revenue. Protocol: let 172p execute, reassess fresh if fills, re-enter on confirmed Rheinmetall contract or LDES scheme passage."},
    {"date": "2026-04-27", "note": "SESSION 30 WATCHLIST NOTES — IQE +15.97% today on ongoing M&A/takeover speculation (offer period active since Sep 2025, no firm bid named). Correct not to hold — AIM stock, no IBKR stop available, binary M&A outcome incompatible with stop-based framework. POET at $15.10, up 267% YoY, 2300x revenue multiple — P11 equivalent logic applies, no entry above stop-out level equivalent. MSTR was $128.64 at April 12 assessment, now $171 — entry zone $90-105 never triggered. All three observed with no action taken — correct protocol."}
  ],
  "tradeTracker": {
    "closedTrades": [
      {"id":1,"ticker":"CCL","dateIn":"2026-03-24","dateOut":"2026-03-26","qty":240,"entry":24.83,"exit":25.35,"ccy":"USD","pnlUSD":122.35,"note":"S07. +$122.35."},
      {"id":2,"ticker":"ONDS","dateIn":"2026-03-24","dateOut":"2026-03-30","qty":250,"entry":10.90,"exit":8.505,"ccy":"USD","pnlUSD":-601.30,"note":"Stopped. -$601.30."},
      {"id":3,"ticker":"KTOS","dateIn":"2026-03-24","dateOut":"2026-03-30","qty":100,"entry":81.00,"exit":64.977,"ccy":"USD","pnlUSD":-1604.27,"note":"Stopped. P12 sizing error. -$1,604.27."},
      {"id":4,"ticker":"UEC","dateIn":"2026-03-25","dateOut":"2026-03-31","qty":206,"entry":13.77,"exit":13.16,"ccy":"USD","pnlUSD":-127.76,"note":"Stopped. -$127.76."},
      {"id":5,"ticker":"IAG","dateIn":"2026-03-27","dateOut":"2026-04-01","qty":2200,"entry":3.55,"exit":3.70,"ccy":"GBP","pnlUSD":407.36,"note":"Peace dividend thesis broken. +$407."},
      {"id":6,"ticker":"RCL","dateIn":"2026-03-24","dateOut":"2026-04-02","qty":36,"entry":273.54,"exit":269.91,"ccy":"USD","pnlUSD":-132.89,"note":"Stopped. -$132.89."},
      {"id":7,"ticker":"LEU","dateIn":"2026-03-24","dateOut":"2026-04-07","qty":13,"entry":188.79,"exit":170.26,"ccy":"USD","pnlUSD":-242.94,"note":"P11 ACTIVE. Stopped $170.26. GTC $168 re-entry."},
      {"id":8,"ticker":"LDO","dateIn":"2026-03-27","dateOut":"2026-04-07","qty":17,"entry":58.10,"exit":59.56,"ccy":"EUR","pnlUSD":20.51,"note":"T1 closed. T2 35sh active."},
      {"id":9,"ticker":"UPS","dateIn":"2026-04-08","dateOut":"2026-04-08","qty":50,"entry":100.17,"exit":99.60,"ccy":"USD","pnlUSD":-30.61,"note":"Same-day round trip. -$30.61."},
      {"id":10,"ticker":"R3NK","dateIn":"2026-03-26","dateOut":"2026-04-08","qty":80,"entry":51.51,"exit":56.01,"ccy":"EUR","pnlUSD":385.86,"note":"First entry. +$386. Reentry active."},
      {"id":11,"ticker":"PLTR","dateIn":"2026-03-24","dateOut":"2026-04-09","qty":49,"entry":161.608,"exit":134.976,"ccy":"USD","pnlUSD":-1307.11,"note":"P6 lesson. -$1,307.11."},
      {"id":12,"ticker":"SHLD","dateIn":"2026-03-24","dateOut":"2026-04-10","qty":69,"entry":72.01,"exit":73.21,"ccy":"USD","pnlUSD":112.65,"note":"Tactical. +$112.65."},
      {"id":13,"ticker":"PDYN","dateIn":"2026-03-25","dateOut":"2026-04-14","qty":250,"entry":6.59,"exit":6.67,"ccy":"USD","pnlUSD":17.42,"note":"250 of 500sh sold. 250 remain."},
      {"id":14,"ticker":"AVAV","dateIn":"2026-03-26","dateOut":"2026-04-15","qty":25,"entry":195.05,"exit":197.945,"ccy":"USD","pnlUSD":70.27,"note":"SI-42 broken thesis exit. +$70.27."},
      {"id":15,"ticker":"ITM","dateIn":"2026-04-01","dateOut":"2026-04-17","qty":1100,"entry":65.1,"exit":124.60,"ccy":"GBP","pnlUSD":828.00,"note":"S22 Trim 1. +$828."},
      {"id":16,"ticker":"LNG","dateIn":"2026-04-13","dateOut":"2026-04-17","qty":19,"entry":268.813,"exit":248.00,"ccy":"USD","pnlUSD":-396.54,"note":"S23 stop-out. -$396.54."},
      {"id":17,"ticker":"PATK","dateIn":"2026-04-17","dateOut":"2026-04-17","qty":25,"entry":108.80,"exit":109.256,"ccy":"USD","pnlUSD":9.34,"note":"S23 tactical. P17. +$9.34."},
      {"id":18,"ticker":"ABVX","dateIn":"2026-04-06","dateOut":"2026-04-21","qty":44,"entry":117.913,"exit":114.26,"ccy":"USD","pnlUSD":-158.53,"note":"S26 stop-out. -$158.53."},
      {"id":19,"ticker":"RR","dateIn":"2026-03-26","dateOut":"2026-04-22","qty":150,"entry":1182.88,"exit":1150.00,"ccy":"GBP","pnlUSD":-62.39,"note":"S27 stop-out. Re-entry 100sh @1128.6p active."},
      {"id":20,"ticker":"ITM","dateIn":"2026-04-01","dateOut":"2026-04-24","qty":800,"entry":65.1,"exit":141.20,"ccy":"GBP","pnlUSD":770.00,"note":"S29 Trim 2. +$770."},
      {"id":21,"ticker":"LLY","dateIn":"2026-04-16","dateOut":"2026-04-25","qty":3,"entry":905.344,"exit":875.54,"ccy":"USD","pnlUSD":-89.41,"note":"S29-SUPP post-session stop. T28. -$89.41."},
      {"id":22,"ticker":"CODA","dateIn":"2026-04-08","dateOut":"2026-04-27","qty":416,"entry":12.005,"exit":11.51,"ccy":"USD","pnlUSD":-205.92,"note":"S30 stop-out. No news — micro-cap noise. Thesis INTACT. P11 active at $11.51. E17 lesson: stop modification discussion must follow stop cancellation, not precede it. Re-entry: below $11.51 or confirmed mine-clearing catalyst. -$205.92."}
    ],
    "grossRealizedPnLUSD": -2971.77,
    "lastUpdated": "2026-04-27 S30 — CODA #22 added"
  },
  "standingInstructions": [
    {"id":1,"title":"TIMEZONE — MANDATORY ARITHMETIC (E1 CORRECTED S30)","body":"BEFORE stating any market is open or closed: write UAE time = X. NYSE opens 17:30 UAE / closes 00:00 UAE. LSE opens 11:00 UAE (BST Apr-Oct) / 12:00 UAE (GMT Nov-Mar) / closes 19:30 UAE (BST). XETRA closes 19:00 UAE. The 12:00 figure is WINTER ONLY. Always verify BST vs GMT before placing LSE orders. COMPUTE — NEVER RECALL."},
    {"id":17,"title":"ERROR TAXONOMY — 17 TYPES","body":"E1:Timezone(BST corrected). E2:Stale position. E3:Fill re-flag. E4:Price verification. E5:Market timing. E6:Dividend capture. E7:Session discipline. E8:Stale quote. E9:GTC orphan. E10:Closed position scan. E11:52wk hallucination. E12:Tool routing gap. E13:EODHD delay. E14:Date discrepancy. E15:AIM stop limitation. E16:Tracker-Journal drift. E17:Stop Modification Sequencing — cancel stop BEFORE discussion, never during."},
    {"id":25,"title":"SI-25 EXIT TRIGGER","body":"Permanent Hormuz reopening + WTI -10% from $111.54 peak = trigger at $100.38. WTI $95.66 rising. Gap ~$4.70. NOT TRIGGERED. Pakistan talks failed. Ceasefire extension is NOT SI-25 trigger."},
    {"id":35,"title":"SI-35: MAX RISK PER TRADE","body":"Maximum $500 loss per trade (stop distance x shares). No exceptions except explicit SI-37 override with documented rationale. MSTR: SI-37 exception approved — $2,000 allocation, T29 logged."},
    {"id":47,"title":"SI-47: DATE VERIFICATION — STEP ZERO","body":"System prompt date is authoritative. State date before any analysis. Non-negotiable."},
    {"id":48,"title":"SI-48: AI THESIS ATH RULE","body":"Four tests: (1) fwd PE below sector or PEG under 1.5, (2) structural catalyst multi-year backlog, (3) no multiple expansion required, (4) PLTR P6 test. MRVL/CEG/SNPS: all pass. LDOS: standard SI-39 entry (not at ATH)."},
    {"id":55,"title":"SI-55: WEEKEND DISCOVERY SCAN PROTOCOL","body":"Run SI-45 + 6-angle discovery scan on non-trading days. Results to watchlist. No trades on discovery day."},
    {"id":56,"title":"SI-56: TRACKER-JOURNAL SYNC MANDATORY","body":"Every session close: verify tracker matches journal. E16 if drift detected."},
    {"id":57,"title":"SI-57: P11 LOG — LEU + CODA","body":"LEU: stopped $170.26 (Apr 7), re-entry GTC $168/stop $150/27sh. CODA: stopped $11.51 (Apr 27, S30), re-entry below $11.51 or on confirmed mine-clearing catalyst. Both P11 active."},
    {"id":58,"title":"SI-58: EXTERNAL CAPITAL RULES","body":"External capital only when: 75%+ conviction, Stage 2 complete, catalyst within 4 weeks, upside >30%. Cash floor $10,570 always applies."},
    {"id":59,"title":"SI-59: STOP MODIFICATION SEQUENCING (E17 — NEW S30)","body":"When a stop adjustment is requested — for any position — the FIRST action is to cancel the existing stop order in IBKR BEFORE any discussion about the new level begins. A stop left active during modification discussion is a live risk. Cancel first. Confirm cancellation. Then debate new level. Then enter new stop. This sequence is non-negotiable after CODA S30 stop-out during modification discussion."}
  ],
  "priceVerificationProtocol": {
    "currentPriceUS": "MMD /v2/aggs/ticker/{TICKER}/prev — field c",
    "52wkRangeUS": "EOD:get_us_live_extended_quotes",
    "currentPriceEUUK": "web_fetch Yahoo Finance",
    "memoryForbidden": "MEMORY ESTIMATES FOR PRICE OR FUNDAMENTAL DATA ARE FORBIDDEN"
  },
  "cDriveProtocol": {
    "confirmed": "2026-04-27 S30",
    "allowedPaths": ["C:\\Users\\jcadb\\claude-fund"],
    "journalLocation": "C:\\Users\\jcadb\\claude-fund\\journal\\",
    "stateLocation": "C:\\Users\\jcadb\\claude-fund\\state\\",
    "trackerLocation": "C:\\Users\\jcadb\\claude-fund\\tracker\\"
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
            <div style={{fontSize:18,fontWeight:700,color:COLORS.textBright}}>CLAUDE FUND — JOURNAL v45</div>
            <div style={{fontSize:11,color:COLORS.textDim,marginTop:2}}>Session 30 Close — Mon 27 Apr 2026 | {data.fund.account} | {data.lastUpdated}</div>
          </div>
          <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
            {[{label:"NET LIQ",val:`$${(data.fund.netLiquidity/1000).toFixed(1)}K`},{label:"UNREAL",val:`+$${(data.fund.unrealizedPnL/1000).toFixed(1)}K`,color:COLORS.green},{label:"POSITIONS",val:"20",color:COLORS.textBright},{label:"WTI",val:`$${data.thesis.oilWTI}`,color:COLORS.yellow}].map(m=>(
              <div key={m.label} className="card" style={{textAlign:"center",minWidth:80}}>
                <div style={{fontSize:9,color:COLORS.textDim}}>{m.label}</div>
                <div style={{fontSize:14,fontWeight:700,color:m.color||COLORS.textBright,marginTop:2}}>{m.val}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{marginTop:6,padding:"6px 10px",background:"rgba(248,81,73,0.1)",border:"1px solid rgba(248,81,73,0.3)",borderRadius:4,fontSize:11,color:COLORS.red}}>
          EARNINGS WEEK: V Tue AMC | ABBV Wed BMO | AMZN+MSFT Wed AMC | NOG Thu | MSTR Q1 Wed AMC → ENTER THURSDAY
        </div>
        <div style={{marginTop:4,padding:"6px 10px",background:"rgba(63,185,80,0.1)",border:"1px solid rgba(63,185,80,0.3)",borderRadius:4,fontSize:11,color:COLORS.green}}>
          S30 FILLS: MRVL $152 ✅ CEG $308 ✅ SNPS $495 ✅ | LDOS $143 pending | MSTR Thursday May 1
        </div>
        <div style={{marginTop:4,padding:"6px 10px",background:"rgba(248,81,73,0.1)",border:"1px solid rgba(248,81,73,0.3)",borderRadius:4,fontSize:11,color:COLORS.red}}>
          CODA STOPPED $11.51 (-$205.92) — P11 ACTIVE — E17 NEW ERROR — WAIT 24H MIN BEFORE REASSESSING RE-ENTRY
        </div>
        <div style={{marginTop:4,padding:"6px 10px",background:"rgba(210,153,34,0.1)",border:"1px solid rgba(210,153,34,0.3)",borderRadius:4,fontSize:11,color:COLORS.yellow}}>
          E1 CORRECTED: LSE opens 11:00 UAE (BST) not 12:00 | E17 NEW: Cancel stop BEFORE modification discussion
        </div>
      </div>

      <div style={{display:"flex",gap:4,marginBottom:12,flexWrap:"wrap"}}>
        {tabs.map(t=>(<button key={t} className={`btn ${activeTab===t?"btn-primary":""}`} onClick={()=>setActiveTab(t)} style={{textTransform:"uppercase",fontSize:11}}>{t}</button>))}
      </div>

      {activeTab==="positions"&&(
        <div style={{display:"flex",flexDirection:"column",gap:8}}>
          {data.positions?.map((p)=>(
            <div key={p.ticker} className="card" style={{borderLeft:p.unrealPnL>500?`3px solid ${COLORS.green}`:p.unrealPnL<-50?`3px solid ${COLORS.red}`:p.status?.includes("EARNINGS")?`3px solid ${COLORS.yellow}`:p.status?.includes("FILLED S30")?`3px solid ${COLORS.purple}`:undefined}}>
              <div style={{display:"flex",gap:10,alignItems:"center",flexWrap:"wrap",marginBottom:6}}>
                <span style={{fontWeight:700,fontSize:14,color:COLORS.textBright}}>{p.ticker}</span>
                <span style={{fontSize:11,color:COLORS.textDim}}>{p.name}</span>
                {p.cur&&<span className="badge badge-grey">{p.cur}</span>}
                {p.status?.includes("EARNINGS")&&<span className="badge badge-amber">EARNINGS</span>}
                {p.status?.includes("FILLED S30")&&<span className="badge badge-purple">NEW S30</span>}
                <span className={`badge ${p.unrealPnL>50?"badge-green":p.unrealPnL<-20?"badge-red":"badge-amber"}`}>{p.unrealPnL>=0?"+":""}{p.unrealPct?.toFixed(1)}%</span>
              </div>
              <div style={{display:"flex",gap:16,flexWrap:"wrap",fontSize:11,marginBottom:6}}>
                <span>Shares: <b>{p.shares}</b></span><span>Avg: <b>{p.avgPrice}</b></span><span>Last: <b>{p.last}</b></span>
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
            <div key={i} className="card" style={{borderLeft:`3px solid ${o.status?.includes("NOT YET")||o.status?.includes("PENDING")?COLORS.red:o.status?.includes("RAISE")||o.status?.includes("VERIFY")||o.status?.includes("THURSDAY")?COLORS.yellow:o.action==="BUY"?COLORS.green:COLORS.red}`}}>
              <div style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap"}}>
                <span style={{fontWeight:700}}>{o.ticker}</span>
                <span className={`badge ${o.action==="BUY"?"badge-green":"badge-red"}`}>{o.action}</span>
                <span className="badge badge-grey">{o.type}</span>
                <span style={{fontSize:11}}>Qty: <b>{o.qty}</b></span>
                {o.limitPrice&&<span style={{fontSize:11}}>Lmt: <b>{o.limitPrice}</b></span>}
                {o.stopPrice&&<span style={{fontSize:11}}>Stp: <b>{o.stopPrice}</b></span>}
                <span className={`badge ${o.status?.includes("NOT YET")||o.status?.includes("THURSDAY")?"badge-red":o.status?.includes("ACTIVE")?"badge-green":"badge-amber"}`}>{o.status?.substring(0,65)}</span>
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
          </div>
          <div style={{fontSize:12,fontWeight:600,color:COLORS.accent,marginBottom:8}}>KEY DATES & ACTIONS</div>
          {data.thesis.keyDates?.map((d,i)=>(
            <div key={i} className="card" style={{marginBottom:6,borderLeft:`3px solid ${d.priority==="CRITICAL"?COLORS.red:COLORS.yellow}`}}>
              <div style={{display:"flex",gap:12,alignItems:"flex-start"}}>
                <span style={{fontSize:11,fontWeight:600,minWidth:200,color:COLORS.textBright}}>{d.date}</span>
                <span style={{fontSize:11,color:COLORS.textDim,flex:1}}>{d.event}</span>
                <span className={`badge ${d.priority==="CRITICAL"?"badge-red":"badge-amber"}`}>{d.priority}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab==="watchlist"&&(
        <div style={{display:"flex",flexDirection:"column",gap:8}}>
          <div style={{fontWeight:600,color:COLORS.accent,fontSize:12,marginBottom:4}}>US WATCHLIST ({data.watchlistUS?.length} names)</div>
          {data.watchlistUS?.map((w)=>(
            <div key={w.ticker} className="card" style={{borderLeft:w.status?.includes("P11")?`3px solid ${COLORS.red}`:w.status?.includes("IN PORTFOLIO")||w.status?.includes("STAGE 2 COMPLETE")?`3px solid ${COLORS.green}`:w.status?.includes("P13")||w.status?.includes("T15")||w.status?.includes("PASSED")||w.status?.includes("DEFERRED")?`3px solid ${COLORS.red}`:`3px solid ${COLORS.yellow}`}}>
              <div style={{display:"flex",gap:10,alignItems:"center",flexWrap:"wrap",marginBottom:4}}>
                <span style={{fontWeight:700}}>{w.ticker}</span>
                <span style={{fontSize:12,color:COLORS.textDim}}>{w.name}</span>
                <span className={`badge ${w.status?.includes("IN PORTFOLIO")||w.status?.includes("STAGE 2 COMPLETE")?"badge-green":w.status?.includes("P11")||w.status?.includes("P13")||w.status?.includes("T15")||w.status?.includes("PASSED")?"badge-red":"badge-amber"}`}>{w.status?.substring(0,55)}</span>
              </div>
              {w.note&&<div style={{fontSize:10,color:COLORS.textDim}}>{w.note}</div>}
            </div>
          ))}
          <div style={{fontWeight:600,color:COLORS.accent,fontSize:12,marginTop:8,marginBottom:4}}>EU / UK WATCHLIST</div>
          {data.watchlistEU?.map(w=>(
            <div key={w.ticker} className="card">
              <div style={{display:"flex",gap:10,alignItems:"center",flexWrap:"wrap",marginBottom:4}}>
                <span style={{fontWeight:700}}>{w.ticker}</span>
                <span style={{fontSize:12,color:COLORS.textDim}}>{w.name}</span>
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
            P11 ACTIVE — LEU #7: stop-out $170.26 | CODA #22: stop-out $11.51 — both re-entry only below stop-out price or confirmed catalyst
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
                {t.note?.includes("E17")&&<span className="badge badge-amber">E17</span>}
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
        <span style={{fontSize:10,color:COLORS.textDim}}>JOURNAL v45 | S30 | {data.fund.account} | NL ~$105.2K | 20 POSITIONS | 3 FILLS | CODA P11</span>
        <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
          <span className="badge badge-green">MRVL $152 ✅</span>
          <span className="badge badge-green">CEG $308 ✅</span>
          <span className="badge badge-green">SNPS $495 ✅</span>
          <span className="badge badge-red">CODA P11 $11.51</span>
          <span className="badge badge-amber">MSTR THU MAY 1</span>
          <span className="badge badge-red">E17 NEW</span>
        </div>
      </div>
    </div>
  );
}
