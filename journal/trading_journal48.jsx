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
// ═══════════════════════════════════════════════════════════════════

const INITIAL_STATE = {
  "lastUpdated": "2026-04-30 SESSION 33 FINAL CLOSE — 19 positions (incl MSFT re-entry). Trades: #29 PDYN cover -$25, #30 MSFT stop-out +$940. New GTCs: BAH $76.50, TXT $88.00. Options L3 confirmed. SI-60/61/P23/T25/E20 codified. WTI $107.94. RR +7.03%. CRML +8.26%.",
  "sessionNumber": "S33-CLOSE",
  "fund": {
    "account": "U24936508",
    "netLiquidity": 103600,
    "unrealizedPnL": 2829,
    "realizedPnL": -27.40,
    "realizedPnLNote": "IBKR header -$27.40. Trade #30 MSFT stop-out +$940 confirmed (position row shows $939 realised). Trade #29 PDYN cover ~-$25. Full reconciliation vs IBKR trades tab required S34.",
    "cashBase": 43216,
    "cashUSD": 45752,
    "cashEUR": -2904,
    "cashGBP": 637,
    "broker": "IBKR Pro",
    "note": "JOURNAL v48 FINAL. Thu 30 Apr 2026. 19 active positions. Options Level 3 confirmed. E20 codified. SI-60/SI-61 active."
  },
  "thesis": {
    "title": "DUAL BLOCKADE — WTI $107.94 — SI-25 DUAL CONDITION UNMET — THESIS INTACT",
    "summary": "WTI $107.94 at session close, up ~7% on day. Largest single-session gain. US cancelled Pakistan talks. Iran proposal rejected. Trump signed extended blockade order. IEA: largest supply shock on record. UAE exited OPEC (accelerates post-peace oil price collapse — tightens NOG exit timing). FOMC held 3.50-3.75%. Warsh replaces Powell May 15. Mag 7 all beat. NOG Q1 record 148K BOE/day. SI-25 dual condition: requires PERMANENT Hormuz reopening + WTI -10% from peak. WTI moving UP does NOT trigger. 52-week WTI high was $117.63 — corrected SI-25 exit threshold: $117.63 × 0.90 = $105.87. NOTE: WTI at $107.94 is ABOVE corrected threshold but reopening condition still unmet — thesis intact, do not exit.",
    "oilWTI": 107.94,
    "SI25Trigger": 105.87,
    "SI25PeakRef": 117.63,
    "SI25Status": "⚠️ WTI $107.94 ABOVE CORRECTED $105.87 THRESHOLD — BUT REOPENING CONDITION UNMET. SI-25 requires BOTH: (1) permanent Hormuz reopening confirmed AND (2) WTI -10% from $117.63 peak = $105.87. Condition (2) technically breached but (1) not met. Thesis intact. DO NOT EXIT.",
    "hormuzStatus": "DUAL BLOCKADE. Extended blockade order signed. US-Iran talks collapsed. WTI +7% single session.",
    "keyDates": [
      {"date": "COMPLETE ✅", "event": "V Q2 BEAT + AMZN Q1 BEAT + GOOGL Q1 BEAT + META Q1 BEAT + MSFT Q3 BEAT. All after 00:00 UAE (E1). Stops managed accordingly.", "priority": "HIGH"},
      {"date": "COMPLETE ✅ Apr 28 AMC", "event": "NOG Q1: Record 148K BOE/day, Adj EBITDA $342.5M. Stop raised $26.47.", "priority": "HIGH"},
      {"date": "COMPLETE — S33 17:30 UAE", "event": "MSFT stop $411.89 triggered at NYSE open. Trade #30: exit $410.38, +$940. Re-entry 25sh @$403.01, stop $373. SI-35 exception: $750 risk documented.", "priority": "HIGH"},
      {"date": "COMPLETE — S33", "event": "PDYN -250 short covered $5.85. Trade #29 ~-$25. E9 accidental short closed.", "priority": "HIGH"},
      {"date": "COMPLETE — S33", "event": "CODA P11 re-entry: 250sh @$11.10, stop $10.00.", "priority": "HIGH"},
      {"date": "PENDING — will fill on pullback", "event": "TXT GTC $88.00 / stop $79. Currently $93.46 — needs ~6% pullback. Industrial separation announced S33 — catalyst active.", "priority": "HIGH"},
      {"date": "PENDING — imminent", "event": "BAH GTC $76.50 / stop $69. Currently $76.74, bid $76.60 — $0.24 from fill.", "priority": "HIGH"},
      {"date": "Mon May 4 AMC", "event": "PLTR Q1 — SI-61 SHORT WATCHLIST. $1.54B revenue expected (+74% YoY). Watch for guidance miss → put entry. Consensus is beat expected.", "priority": "MEDIUM"},
      {"date": "Mon May 5 BMO", "event": "CCJ Q1 — 50sh @$117.02, stop $110, currently below cost. T23: DO NOT WIDEN.", "priority": "HIGH"},
      {"date": "Mon May 5 BMO", "event": "LDO.MI Q1 — stop €50, 3.8% clearance. Thesis intact. DO NOT WIDEN.", "priority": "HIGH"},
      {"date": "Mon May 5 BMO", "event": "LDOS Q1 — GTC 45sh @$143, stop $136 active.", "priority": "HIGH"},
      {"date": "Wed May 6", "event": "R3NK Q1 — 200M EUR deferred orders. Stop 48/47 SL.", "priority": "HIGH"},
      {"date": "Wed May 7", "event": "AMPX Q1 — stop $18.92.", "priority": "HIGH"},
      {"date": "Thu May 7 — POST EARNINGS", "event": "SARO Q1 results May 7. DO NOT ENTER before print. If EBITDA margins hold + LEAP/CFM56 ramp confirmed → enter. Carlyle/GIC PE overhang noted.", "priority": "HIGH"},
      {"date": "Post-May 5", "event": "MSTR: BTC $76,300. Entry deferred — MSTR May 5 BMO. Check BTC May 6 morning. If >$75K enter 12sh market, stop $135.", "priority": "HIGH"},
      {"date": "May 11", "event": "CEG Q1 — catalyst gate. Stop $278.", "priority": "HIGH"},
      {"date": "May 22", "event": "BAH Q4 FY2026 — CRITICAL for BAH GTC thesis. Watch for civil revenue bottoming + bookings improvement. Staged entry only until confirmed.", "priority": "HIGH"},
      {"date": "May 20", "event": "SNPS Q2 — catalyst gate. Stop $440.", "priority": "HIGH"},
      {"date": "May 28", "event": "MRVL Q1 — Google ASIC. Stop $135.", "priority": "HIGH"},
      {"date": "ONGOING SI-61", "event": "SHORT WATCHLIST: PLTR (108x fwd PE, watch May 4 print), AAL (wait for bounce $13-14). Scan-fed via SI-39/SI-45 each session.", "priority": "MEDIUM"}
    ]
  },
  "positions": [
    {"ticker": "AMZN", "shares": 30, "avgPrice": 201.204, "last": 259.13, "unrealPnL": 1737, "unrealPct": 28.8, "stop": 249.88, "stopType": "Stop Limit", "stopLimit": 224, "status": "HOLD — BEAT — STOP $249.88", "note": "Q1: EPS $2.78 vs $1.64, AWS +28%. Stop raised S33."},
    {"ticker": "MSFT", "shares": 25, "avgPrice": 403.052, "last": 401.68, "unrealPnL": -33, "unrealPct": -0.3, "stop": 373, "status": "HOLD — RE-ENTRY S33 — STOP $373 — SI-35 EXCEPTION", "note": "Original position stopped $410.38 at open (Trade #30 +$940). Re-entry 25sh @$403.01 S33. Stop $373 = $30/sh risk × 25 = $750 — SI-35 exception: stop level is at original cost basis floor. Thesis intact: Azure +40%, $190B capex is sentiment not fundamental break. Pattern mirrors Jan Q2 reaction which recovered."},
    {"ticker": "AMPX", "shares": 168, "avgPrice": 18.106, "last": 20.92, "unrealPnL": 468, "unrealPct": 15.4, "stop": 18.92, "status": "HOLD — STOP $18.92 — MAY 7", "note": "Standalone limit $32 active. Earnings May 7."},
    {"ticker": "CRML", "shares": 110, "avgPrice": 9.08, "last": 12.32, "unrealPnL": 355, "unrealPct": 35.6, "stop": 10.51, "status": "HOLD — STOP $10.51 — +8.26% TODAY", "note": "$835M European Lithium acquisition. Dual critical minerals. Thesis strengthening."},
    {"ticker": "NOG", "shares": 80, "avgPrice": 24.383, "last": 27.37, "unrealPnL": 241, "unrealPct": 12.4, "stop": 26.47, "status": "HOLD — STOP $26.47 — WTI $107.94", "note": "Record Q1. Stop raised above cost. WTI at thesis maximum."},
    {"ticker": "V", "shares": 8, "avgPrice": 307.125, "last": 329.98, "unrealPnL": 183, "unrealPct": 7.5, "stop": 312.82, "status": "HOLD — STOP $312.82 — PROFIT LOCKED", "note": "Q2 beat. Stop $312.82 = $5.70 above cost. Profit locked."},
    {"ticker": "MRVL", "shares": 10, "avgPrice": 152.10, "last": 159.38, "unrealPnL": 73, "unrealPct": 4.8, "stop": 135, "status": "HOLD — STOP $135 — MAY 28", "note": "Google ASIC thesis intact."},
    {"ticker": "RR", "name": "Rolls-Royce Holdings", "shares": 100, "avgPrice": 1128.6, "last": 1175.80, "unrealPnL": 47, "unrealPct": 4.2, "stop": 1050, "cur": "GBP", "status": "HOLD — STOP 1050p — +7.03% TODAY", "note": "Strong session. Stop 1050p now 11% clearance. H1 Jul 30 catalyst."},
    {"ticker": "R3NK", "shares": 25, "avgPrice": 52.27, "last": 54.38, "unrealPnL": 52, "unrealPct": 4.0, "stop": 48, "stopType": "Stop Limit", "stopLimit": 47, "cur": "EUR", "status": "HOLD — STOP 48/47 — MAY 6", "note": "200M EUR deferred orders."},
    {"ticker": "CGCT", "shares": 291, "avgPrice": 10.295, "last": 10.35, "unrealPnL": 16, "unrealPct": 0.5, "stop": null, "status": "HOLD — NO STOP — SPAC", "note": "Trust floor ~$10.27."},
    {"ticker": "IES", "name": "Invinity Energy Systems", "shares": 3000, "avgPrice": 17.49, "last": 17.70, "unrealPnL": 6, "stop": null, "stopType": "MANUAL ALERT 12.5p", "cur": "GBP", "status": "HOLD — MANUAL ALERT 12.5p (E15)", "note": "LDES decision pending."},
    {"ticker": "CEG", "shares": 14, "avgPrice": 308.072, "last": 307.54, "unrealPnL": -7, "unrealPct": -0.2, "stop": 278, "status": "HOLD — STOP $278 — MAY 11", "note": "+3.55% today. Approaching cost basis."},
    {"ticker": "CCJ", "shares": 50, "avgPrice": 117.02, "last": 116.59, "unrealPnL": 0, "unrealPct": 0.0, "stop": 110, "status": "HOLD — RE-ENTRY — STOP $110 — MAY 5 Q1", "note": "At breakeven. T23: do not widen pre-earnings."},
    {"ticker": "CODA", "shares": 250, "avgPrice": 11.105, "last": 10.90, "unrealPnL": -11, "unrealPct": -0.4, "stop": 10.00, "status": "HOLD — P11 RE-ENTRY S33 — STOP $10.00", "note": "P11 re-entry. Risk $245. Mine clearance thesis: WTI $108 = blockade active."},
    {"ticker": "SNPS", "shares": 8, "avgPrice": 495.125, "last": 472.51, "unrealPnL": -169, "unrealPct": -4.3, "stop": 440, "status": "HOLD — STOP $440 — MAY 20", "note": "EDA duopoly. Stop well below."},
    {"ticker": "ABVX", "name": "Abivax SA", "shares": 50, "avgPrice": 109.89, "last": 109.06, "unrealPnL": -31, "unrealPct": -0.6, "stop": 100, "status": "HOLD — STOP $100 — REVIEW MAY 12-19", "note": "+2.65% today. M&A play. Review gate May 12-19."},
    {"ticker": "LDO", "name": "Leonardo SpA", "shares": 35, "avgPrice": 56.086, "last": 53.05, "unrealPnL": -107, "unrealPct": -5.4, "stop": 50, "cur": "EUR", "status": "HOLD — STOP €50 — DO NOT WIDEN — MAY 5 Q1", "note": "+1.75% today. ATH €66.26 Mar 2026. Rearmament thesis intact. Analyst target €68-69. Stop €50 = 5.7% clearance. May 5 catalyst."},
    {"ticker": "BAH", "name": "Booz Allen Hamilton", "shares": 0, "avgPrice": null, "last": 76.74, "unrealPnL": 0, "stop": 69.00, "status": "GTC $76.50 PENDING — IMMINENT — STAGED ENTRY", "note": "Bid $76.60 at session close — $0.24 from fill. 33sh GTC $76.50 + stop $69. Max loss $247 (half-size deliberately). Civil revenue risk unresolved. May 22 Q4 results catalyst for second tranche. Contrarian recovery: P/E 12.7x vs 44x sector avg. $38B backlog. Federal consulting overhang = mispricing not terminal decline."},
    {"ticker": "TXT", "name": "Textron Inc", "shares": 0, "avgPrice": null, "last": 93.46, "unrealPnL": 0, "stop": 79.00, "status": "GTC $88.00 PENDING — NEEDS ~6% PULLBACK", "note": "Industrial separation announced S33 — stock up 4.10% to $93.46. GTC $88 needs pullback from separation excitement. 55sh GTC $88 + stop $79. Max loss $495. Bell MV-75 Valor = 20yr military monopoly. Aviation backlog $8B. 14.3x fwd PE. Best current setup of new entries."}
  ],
  "shortWatchlist": [
    {"ticker": "PLTR", "thesis": "108x forward PE vs 18x software sector median. Reports May 4 AMC. Guidance miss or cut = repricing catalyst.", "fwdPE": 108, "sectorMedian": 18, "currentPrice": 137.97, "trigger": "May 4 AMC guidance cut or revenue miss. Wait for print — consensus expects beat.", "status": "WATCH — DO NOT ENTER BEFORE MAY 4 PRINT", "correlationRisk": "Low"},
    {"ticker": "AAL", "thesis": "No fuel hedging, $36.5B debt, FY EPS guidance -$0.40 to -$1.10 at $4/gal assumptions stale at WTI $108.", "currentPrice": 11.31, "trigger": "Dead-cat bounce to $13-14 range. WTI must stay above $100 into Q2.", "status": "WATCH — WAIT FOR BOUNCE", "correlationRisk": "HIGH — NOG correlated. Peace deal hits both."}
  ],
  "optionsCapability": {
    "status": "CONFIRMED ACTIVE",
    "level": "Options Level 3",
    "markets": "US Options approved",
    "sizeRule": "Max premium 2.5% NAV (~$2,600). Premium = stop. 1 contract only until familiar.",
    "qqqDeclined": "S33: QQQ Dec $600 put — break-even -13.3%, risk $2,450 for $1,550 on -15% = negative asymmetry. DECLINED per P23. Correct.",
    "nextStep": "PLTR post-May 4 print is first live candidate if guidance misses."
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
      {"id":11,"ticker":"PLTR","dateIn":"2026-03-24","dateOut":"2026-04-09","qty":49,"entry":161.608,"exit":134.976,"ccy":"USD","pnlUSD":-1307.11,"note":"P6. On SI-61 short watchlist."},
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
      {"id":29,"ticker":"PDYN","dateIn":"2026-04-29","dateOut":"2026-04-30","qty":250,"entry":5.7507,"exit":5.85,"ccy":"USD","pnlUSD":-25,"note":"E9 accidental short covered S33 at open. ~-$25."},
      {"id":30,"ticker":"MSFT","dateIn":"2026-04-14","dateOut":"2026-04-30","qty":25,"entry":372.77,"exit":410.38,"ccy":"USD","pnlUSD":940,"note":"GTC stop $411.89 triggered at S33 NYSE open. Exit $410.38. Beat Q3 but $190B capex guidance drove sell-off. Trade #30 +$940. Immediately re-entered 25sh @$403.01, stop $373 (Trade open)."}
    ],
    "grossRealizedPnLUSD": -1547,
    "lastUpdated": "2026-04-30 S33 Final. Trade #29 PDYN cover -$25. Trade #30 MSFT stop-out +$940. Est gross ~-$607 after adding #30. Reconcile vs IBKR at S34."
  },
  "sessionNotes": [
    {"date": "2026-04-30", "note": "SESSION 33 OPEN — MAG 7 ALL BEAT. MSFT Q3: EPS $4.27 vs $4.07, Azure +40%, Rev $82.9B. -5.37% today on $190B capex guidance ($35B above consensus). Pattern mirrors Jan Q2 reaction which fell -10% then recovered. AMZN: AWS $37.6B +28% (15Q high). GOOGL: Cloud +63% to $20B. META: Rev +33%. AI capex arms race across all four confirmed."},
    {"date": "2026-04-30", "note": "SESSION 33 — NOG Q1 + WTI. Record 148K BOE/day. GAAP loss $522.8M entirely non-cash. Revenue +5.57%. WTI $107.94 = war premium at maximum. Trump signed extended blockade order. IEA: largest supply shock on record. Stop raised $24.49→$26.47. SI-25 corrected: 52-week high $117.63. Exit threshold = $105.87 (-10%). WTI currently above threshold but reopening condition still unmet."},
    {"date": "2026-04-30", "note": "SESSION 33 — MSFT STOP-OUT + RE-ENTRY. Stop $411.89 triggered at NYSE open (17:30 UAE). Fill $410.38 (slippage $1.51 — gap open normal). Trade #30: +$940 on 25sh. P11 re-entry criteria immediately met at $401-404 intraday. Re-entry 25sh @$403.01, stop $373. SI-35 exception: $750 risk vs $500 rule — stop is at original cost basis ($372.77) providing defensive floor. E20 incident: web search returned stale previous-session prices during live trading, leading to incorrect contradiction of IBKR live price of ~$401-403. IBKR was correct throughout. E20 now codified."},
    {"date": "2026-04-30", "note": "SESSION 33 — NEW POSITIONS. Stops raised: NOG $26.47, AMZN $249.88, V $312.82. CODA P11 re-entry: 250sh @$11.10, stop $10.00. PDYN short covered $5.85 (-$25). BKR GTC cancelled. GOOGL GTC $315 cancelled (GOOGL at $377 post-beat — 16% OTM, no realistic fill path). BAH GTC 33sh @$76.50 + stop $69 submitted. TXT GTC 55sh @$88 + stop $79 submitted. SARO — no entry, wait for May 7 Q1 print."},
    {"date": "2026-04-30", "note": "SESSION 33 — OPTIONS AND SHORT FRAMEWORK. Options Level 3 + US market confirmed IBKR Pro. QQQ Dec $600 put explored — DECLINED. Break-even -13.3%, risk $2,450 for $1,550 on -15% = negative asymmetry. P23 codified: one-sentence test. SI-60 (short/options protocol) and SI-61 (watchlist) established. Scan-to-watchlist pipeline (S15): SI-39/SI-45 now feed SI-61 as secondary output. T25: trading down as well as up is a core fund capability. PLTR (108x fwd PE, May 4) and AAL (no fuel hedge) on watchlist."},
    {"date": "2026-04-30", "note": "SESSION 33 — E20 CODIFIED. Root cause: web search and most financial sites cache previous session data and do not reflect intraday moves during live market hours. IBKR TWS is the ONLY authoritative source for live prices. During NYSE hours (17:30-00:00 UAE) or LSE hours (11:00-19:30 UAE), never contradict IBKR live prices using web search results. MMD /prev endpoint gives PREVIOUS DAY close only — not intraday. Accept IBKR as ground truth. No verification attempt via web search during live session. Added to TIMEZONE REFERENCE block at journal header and to LESSONS_LEARNED.md error taxonomy."},
    {"date": "2026-04-30", "note": "SESSION 33 — NOTABLE MOVERS EOD. RR +7.03% (+77.20p) to 1175.80p — stop 1050p now 11% clearance, thesis intact, H1 Jul 30. CRML +8.26% — $835M European Lithium acquisition thesis confirming. CEG +3.55% — approaching cost basis. ABVX +2.65%. MRVL +1.79%. Weak: SNPS -1.81% (EDA multiple compression), V -1.46% (broad market), AMZN -1.49%."}
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
  const tabs=["positions","shorts","thesis","tracker","notes"];
  const pnlColor=(v)=>v>0?COLORS.green:v<0?COLORS.red:COLORS.textDim;

  return(
    <div style={{background:COLORS.bg,minHeight:"100vh",color:COLORS.text,fontFamily:"monospace",padding:16,maxWidth:1200,margin:"0 auto"}}>
      <style>{`.card{background:${COLORS.card};border:1px solid ${COLORS.border};border-radius:6px;padding:12px}.badge{font-size:10px;padding:2px 6px;border-radius:4px;font-weight:600;display:inline-block}.badge-green{background:rgba(63,185,80,0.15);color:${COLORS.green};border:1px solid rgba(63,185,80,0.3)}.badge-red{background:rgba(248,81,73,0.15);color:${COLORS.red};border:1px solid rgba(248,81,73,0.3)}.badge-amber{background:rgba(210,153,34,0.15);color:${COLORS.yellow};border:1px solid rgba(210,153,34,0.3)}.badge-orange{background:rgba(240,136,62,0.15);color:${COLORS.orange};border:1px solid rgba(240,136,62,0.3)}.badge-grey{background:rgba(139,148,158,0.15);color:${COLORS.textDim};border:1px solid rgba(139,148,158,0.3)}.badge-purple{background:rgba(163,113,247,0.15);color:${COLORS.purple};border:1px solid rgba(163,113,247,0.3)}.btn{background:${COLORS.card};border:1px solid ${COLORS.border};color:${COLORS.text};padding:6px 12px;border-radius:4px;cursor:pointer;font-family:monospace;font-size:12px}.btn:hover{background:#21262d}.btn-primary{background:rgba(88,166,255,0.15);border-color:rgba(88,166,255,0.4);color:${COLORS.accent}}input{background:${COLORS.card};border:1px solid ${COLORS.border};color:${COLORS.text};padding:8px;border-radius:4px;font-family:monospace;font-size:12px;flex:1}`}</style>

      <div style={{marginBottom:16}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:8}}>
          <div>
            <div style={{fontSize:18,fontWeight:700,color:COLORS.textBright}}>CLAUDE FUND — JOURNAL v48</div>
            <div style={{fontSize:11,color:COLORS.textDim,marginTop:2}}>Session 33 Final — Thu 30 Apr 2026 | {data.fund.account} | 19 positions | Options L3 ✅</div>
          </div>
          <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
            {[
              {label:"NET LIQ",val:"$103.6K"},
              {label:"UNREAL",val:"+$2,829",color:COLORS.green},
              {label:"REALIZED",val:"-$27.40",color:COLORS.red},
              {label:"WTI",val:"$107.94",color:COLORS.orange}
            ].map(m=>(
              <div key={m.label} className="card" style={{textAlign:"center",minWidth:80}}>
                <div style={{fontSize:9,color:COLORS.textDim}}>{m.label}</div>
                <div style={{fontSize:14,fontWeight:700,color:m.color||COLORS.textBright,marginTop:2}}>{m.val}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{marginTop:6,padding:"6px 10px",background:"rgba(248,81,73,0.1)",border:"1px solid rgba(248,81,73,0.3)",borderRadius:4,fontSize:11,color:COLORS.red,fontWeight:600}}>
          ⚠️ E20 CODIFIED: Web search = STALE during live hours. IBKR is authoritative. Never contradict IBKR live prices via web search.
        </div>
        <div style={{marginTop:4,padding:"6px 10px",background:"rgba(240,136,62,0.15)",border:"1px solid rgba(240,136,62,0.4)",borderRadius:4,fontSize:11,color:COLORS.orange,fontWeight:600}}>
          WTI $107.94 | RR +7.03% | CRML +8.26% | MSFT re-entry $403 | BAH/TXT GTCs submitted
        </div>
        <div style={{marginTop:4,padding:"6px 10px",background:"rgba(163,113,247,0.1)",border:"1px solid rgba(163,113,247,0.3)",borderRadius:4,fontSize:11,color:COLORS.purple}}>
          SI-60/61 ACTIVE | SHORT WATCHLIST: PLTR (May 4) + AAL | Scan pipeline feeds watchlist each session
        </div>
      </div>

      <div style={{display:"flex",gap:4,marginBottom:12}}>
        {tabs.map(t=>(<button key={t} className={`btn ${activeTab===t?"btn-primary":""}`} onClick={()=>setActiveTab(t)} style={{textTransform:"uppercase",fontSize:11}}>{t}</button>))}
      </div>

      {activeTab==="positions"&&(
        <div style={{display:"flex",flexDirection:"column",gap:6}}>
          {data.positions?.map((p)=>(
            <div key={p.ticker} className="card" style={{borderLeft:p.status?.includes("GTC")?"3px solid "+COLORS.blue:p.unrealPnL>300?"3px solid "+COLORS.green:p.unrealPnL<-100?"3px solid "+COLORS.red:p.status?.includes("WTI")||p.status?.includes("TODAY")?"3px solid "+COLORS.orange:undefined}}>
              <div style={{display:"flex",gap:10,alignItems:"center",flexWrap:"wrap",marginBottom:3}}>
                <span style={{fontWeight:700,fontSize:13,color:COLORS.textBright}}>{p.ticker}</span>
                {p.cur&&<span className="badge badge-grey">{p.cur}</span>}
                {p.shares>0&&<span className={`badge ${p.unrealPnL>50?"badge-green":p.unrealPnL<-50?"badge-red":"badge-amber"}`}>{p.unrealPnL>=0?"+":""}{p.unrealPct?.toFixed(1)}%</span>}
                {p.status?.includes("GTC")&&<span className="badge badge-purple">PENDING GTC</span>}
                <span style={{fontSize:9,color:COLORS.textDim,marginLeft:"auto"}}>Stop: <b style={{color:COLORS.yellow}}>{p.stop||"—"}</b></span>
              </div>
              <div style={{fontSize:10,color:COLORS.accent,marginBottom:2}}>{p.status}</div>
              <div style={{fontSize:9,color:COLORS.textDim}}>{p.note}</div>
            </div>
          ))}
        </div>
      )}

      {activeTab==="shorts"&&(
        <div>
          <div className="card" style={{marginBottom:10,borderLeft:`4px solid ${COLORS.purple}`}}>
            <div style={{fontWeight:700,color:COLORS.purple,fontSize:13,marginBottom:4}}>SHORT WATCHLIST — SI-61 | Scan-fed via SI-39/SI-45 | P23 one-sentence test required</div>
            <div style={{fontSize:10,color:COLORS.textDim}}>Names enter from scans (SI-39/SI-45) or session research. Max 5 entries. Exit when catalyst passes or thesis breaks.</div>
          </div>
          {data.shortWatchlist?.map((s,i)=>(
            <div key={i} className="card" style={{marginBottom:8,borderLeft:`3px solid ${COLORS.purple}`}}>
              <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:4}}>
                <span style={{fontWeight:700,color:COLORS.textBright}}>{s.ticker}</span>
                <span className="badge badge-purple">WATCH</span>
                {s.correlationRisk?.includes("HIGH")&&<span className="badge badge-red">OIL CORR.</span>}
              </div>
              <div style={{fontSize:11,fontStyle:"italic",color:COLORS.textBright,marginBottom:4}}>"{s.thesis}"</div>
              <div style={{fontSize:10,color:COLORS.yellow}}>Trigger: {s.trigger}</div>
              <div style={{fontSize:9,color:COLORS.textDim,marginTop:2}}>Correlation: {s.correlationRisk}</div>
            </div>
          ))}
          <div className="card" style={{marginTop:8,fontSize:10,color:COLORS.textDim,lineHeight:1.8,borderLeft:`2px solid ${COLORS.textDim}`}}>
            <b style={{color:COLORS.textBright}}>SCAN TRIGGER CRITERIA (auto-added from SI-39/SI-45):</b><br/>
            SI-39: fwd PE ≥ 3× sector median + deteriorating fundamentals<br/>
            SI-45: near 52wk HIGH + fwd PE {'>'} 50x + decelerating revenue growth QoQ<br/>
            <b style={{color:COLORS.yellow}}>Context:</b> Shiller P/E {'>'} 40 | AI capex $400B vs $15-20B revenues | WTI $108 = macro stress building
          </div>
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
                <span style={{fontSize:10,fontWeight:600,minWidth:200,color:COLORS.textBright}}>{d.date}</span>
                <span style={{fontSize:10,color:COLORS.textDim,flex:1}}>{d.event}</span>
                <span className={`badge ${d.priority==="CRITICAL"?"badge-red":d.priority==="HIGH"?"badge-amber":d.priority==="MEDIUM"?"badge-purple":"badge-grey"}`}>{d.priority}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab==="tracker"&&(
        <div>
          <div style={{fontSize:12,fontWeight:600,color:COLORS.accent,marginBottom:6}}>TRADE TRACKER — {data.tradeTracker?.closedTrades?.length} CLOSED</div>
          <div style={{marginBottom:6,padding:"6px 10px",background:"rgba(63,185,80,0.1)",border:"1px solid rgba(63,185,80,0.3)",borderRadius:4,fontSize:10,color:COLORS.green}}>
            S33: #29 PDYN cover ~-$25 | #30 MSFT stop-out +$940 | ITM programme total +$2,639
          </div>
          {data.tradeTracker?.closedTrades?.map((t)=>(
            <div key={t.id} className="card" style={{marginBottom:3,borderLeft:`3px solid ${t.pnlUSD>0?COLORS.green:COLORS.red}`}}>
              <div style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap"}}>
                <span style={{fontSize:9,color:COLORS.textDim}}>#{t.id}</span>
                <span style={{fontWeight:600,fontSize:12}}>{t.ticker}</span>
                <span style={{fontSize:9,color:COLORS.textDim}}>{t.dateOut}</span>
                <span style={{fontWeight:700,color:pnlColor(t.pnlUSD)}}>{t.pnlUSD>0?"+$":"−$"}{Math.abs(t.pnlUSD).toFixed(0)}</span>
                <span className="badge badge-grey">{t.ccy}</span>
                {t.id>=29&&<span className="badge badge-amber">S33</span>}
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
        <span style={{fontSize:10,color:COLORS.textDim}}>v48 FINAL | S33 | 19 positions | WTI $107.94 | E20 codified</span>
        <div style={{display:"flex",gap:4,flexWrap:"wrap"}}>
          <span className="badge badge-orange">WTI $107.94</span>
          <span className="badge badge-green">RR +7% CRML +8%</span>
          <span className="badge badge-red">MSFT -5.4% (re-entered)</span>
          <span className="badge badge-purple">SI-61 ACTIVE</span>
        </div>
      </div>
    </div>
  );
}
