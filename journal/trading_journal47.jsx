import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "fund_journal_v3";

// ═══════════════════════════════════════════════════════════════════
// TIMEZONE REFERENCE — MANDATORY (E1 CORRECTED S30)
// NYSE: opens 17:30 UAE / closes 00:00 UAE
// LSE:  opens 11:00 UAE (BST Apr-Oct) / 12:00 UAE (GMT Nov-Mar) / closes 19:30 UAE
// ═══════════════════════════════════════════════════════════════════

const INITIAL_STATE = {
  "lastUpdated": "2026-04-29 SESSION 32 FINAL CLOSE — 17 positions. Trades #25 ABBV -$282, #26 PDYN -$196. MSFT stop $411.89. WTI $103.47. MSFT/AMZN/GOOGL/META reporting ~21:00 UAE. Gross realised ~-$2,174.",
  "sessionNumber": "S32-FINAL",
  "fund": {
    "account": "U24936508",
    "netLiquidity": 103900,
    "unrealizedPnL": 4094,
    "realizedPnL": -2174,
    "realizedPnLNote": "S32 Close: Trade #25 ABBV -$282.27, Trade #26 PDYN -$196. Gross ~-$2,174.",
    "cashBase": 36090,
    "broker": "IBKR Pro",
    "note": "JOURNAL v47. Wed 29 Apr 2026 close. 17 positions. ABBV stopped BMO. PDYN manual exit. WTI $103.47 — SI-25 WTI leg breached (dual condition still unmet). Mag 7 results dropping now."
  },
  "thesis": {
    "title": "DUAL BLOCKADE — WTI $103.47 — BRENT $113.47 — SI-25 WTI LEG EXCEEDED",
    "summary": "WTI $103.47 (8th consecutive session gain), Brent $113.47 — highest since June 2022. IEA calls this largest supply shock on record. US cancelled Pakistan talks. Trump dissatisfied with Iran proposal. UAE left OPEC May 1 (bearish on resolution — accelerates post-peace price collapse). SI-25 WTI leg technically exceeded BUT dual condition unmet: no permanent Hormuz reopening. NOG Q1 Thu at $103 WTI — very supportive print expected.",
    "oilWTI": 103.47,
    "oilWTIBrent": 113.47,
    "SI25Trigger": 100.38,
    "SI25Gap": null,
    "SI25Status": "⚠️ WTI $103.47 ABOVE $100.38 TRIGGER — BUT SI-25 IS EXIT-ON-PEACE SIGNAL. Requires PERMANENT Hormuz reopening + WTI -10% from $111.54 peak ($100.38). WTI moving UP does NOT trigger. Thesis strengthening. UAE OPEC exit = faster/larger oil drop when resolution comes — tightens NOG exit timing on any peace deal.",
    "hormuzStatus": "DUAL BLOCKADE. US cancelled Pakistan talks. Iran new proposal rejected. 8 consecutive sessions of gains.",
    "keyDates": [
      {"date": "COMPLETE — Wed 29 Apr", "event": "V Q2 earnings BEAT — EPS $3.31 vs $3.09, rev $11.2B +17%. Stop raised $298.59. Position clear. ✅", "priority": "HIGH"},
      {"date": "COMPLETE — Wed 29 Apr BMO", "event": "ABBV Q1 STOPPED — stop $192 triggered, filled $191.1608 (DARK). BEAT post-fill: EPS $2.65 in line, rev $15B +12.4%, FY guidance raised. Stock recovered. Trade #25 -$282.27. Position closed. ✅", "priority": "HIGH"},
      {"date": "TONIGHT ~21:00 UAE", "event": "MSFT Q3 — stop RAISED $400.43→$411.89 S32. Market open at print. Azure ≥39% = beat. ≤37% = miss, stop market fills best price all the way down. Re-entry plan on miss.", "priority": "CRITICAL"},
      {"date": "TONIGHT ~21:00 UAE", "event": "AMZN Q1 — AWS $36.8B consensus. Stop Limit $234.39/$224. ±3.43% implied.", "priority": "CRITICAL"},
      {"date": "TONIGHT ~21:00 UAE", "event": "GOOGL Q1 — GTC buy $315 active. ±5.67% implied. Fills only on miss-driven drop to $315.", "priority": "HIGH"},
      {"date": "TONIGHT ~21:00 UAE", "event": "META Q1 — no position. AI capex guidance key read for sector thesis.", "priority": "MEDIUM"},
      {"date": "ONGOING", "event": "WTI $103.47 — SI-25 WTI leg exceeded. DUAL CONDITION still unmet (no Hormuz reopening). UAE OPEC exit accelerates post-peace oil collapse. Monitor pre-open every session.", "priority": "CRITICAL"},
      {"date": "Thu Apr 30", "event": "NOG Q1 at WTI ~$103.47 — WAR PREMIUM AT MAX. Very supportive print expected. Stop $24.49. Consider raising post-earnings if beat confirmed.", "priority": "CRITICAL"},
      {"date": "Post-May 5", "event": "MSTR entry — DEFERRED to post-May 5 Q1 review. 12sh market, stop $135, SI-37 $2,000. Do not enter May 1.", "priority": "HIGH"},
      {"date": "May 5 BMO", "event": "LDOS Q1 — GTC $143 near miss (low $143.39 Apr 27).", "priority": "HIGH"},
      {"date": "May 5", "event": "LDO.MI Q1 — stop €50, 3.8% clearance TIGHT.", "priority": "HIGH"},
      {"date": "May 6", "event": "R3NK Q1 — 200M EUR deferred orders key.", "priority": "HIGH"},
      {"date": "May 7", "event": "AMPX Q1 — stop $18.92.", "priority": "HIGH"},
      {"date": "May 11", "event": "CEG Q1 — catalyst gate. Stop $278.", "priority": "HIGH"},
      {"date": "May 20", "event": "SNPS Q2 — catalyst gate. Stop $440.", "priority": "HIGH"},
      {"date": "May 28", "event": "MRVL Q1 — Google ASIC. Stop $135.", "priority": "HIGH"},
      {"date": "ONGOING", "event": "CODA P11 — 48hr hold. Reassess Wed. Target 250-300sh below $11.51. Stop <$10.50.", "priority": "HIGH"},
      {"date": "POST-WED", "event": "QCOM Stage 2 — post Q2 earnings. OpenAI phone 2028. SI-48 tests.", "priority": "MEDIUM"}
    ]
  },
  "positions": [
    {"ticker": "AMZN", "shares": 30, "avgPrice": 201.204, "last": 265.50, "unrealPnL": 1929, "unrealPct": 32.0, "stop": 234.39, "stopType": "Stop Limit", "stopLimit": 224, "status": "HOLD — EARNINGS TONIGHT ~21:00 UAE — DO NOT TOUCH", "note": "AWS $36.8B consensus. ±3.43% implied. Stop Limit $234.39/$224 locks +$33/sh."},
    {"ticker": "MSFT", "shares": 25, "avgPrice": 372.77, "last": 424.87, "unrealPnL": 1302, "unrealPct": 14.0, "stop": 411.89, "status": "HOLD — STOP $411.89 — EARNINGS TONIGHT ~21:00 UAE", "note": "Stop raised $400.43→$411.89 pre-earnings S32. Rationale: market open at results (21:00 UAE, NYSE closes 00:00 UAE), standard stop converts to market on trigger and fills at best available price all the way down — no downside to raising. $411.89 = 3.1% below $424.87 close, outside afternoon noise range (~±$6), inside genuine pre-announcement selloff threshold. On miss: approx fill $409–413, locks ~$980 profit. On beat: stop irrelevant, position runs. Azure growth rate (±37–38% guided) is the key number."},
    {"ticker": "CCJ", "shares": 49, "avgPrice": 104.021, "last": 123.11, "unrealPnL": 906, "unrealPct": 17.8, "stop": 116.96, "status": "HOLD — STOP $116.96 GTC", "note": "Nuclear thesis intact."},
    {"ticker": "VST", "shares": 53, "avgPrice": 150.569, "last": 165.13, "unrealPnL": 791, "unrealPct": 9.9, "stop": 156.58, "status": "HOLD — STOP $156.58 GTC", "note": "Raised S31. Locks $6/sh."},
    {"ticker": "AMPX", "shares": 168, "avgPrice": 18.106, "last": 21.60, "unrealPnL": 511, "unrealPct": 16.8, "stop": 18.92, "status": "HOLD — STOP $18.92 — EARNINGS MAY 7", "note": "Above cost. Limit $32 standalone."},
    {"ticker": "CRML", "shares": 110, "avgPrice": 9.08, "last": 13.73, "unrealPnL": 512, "unrealPct": 51.2, "stop": 10.51, "status": "HOLD — STOP $10.51 — ACQUISITION NEWS — $835M EUROPEAN LITHIUM", "note": "Major corporate: acquiring European Lithium $835M (Wolfsberg lithium + Tanbreez). Dual asset critical minerals. Thesis confirmed. -5% today = profit-taking post-announcement. Hold."},
    {"ticker": "NOG", "shares": 80, "avgPrice": 24.383, "last": 26.87, "unrealPnL": 199, "unrealPct": 10.2, "stop": 24.49, "status": "HOLD — STOP $24.49 — ⚠️ WTI $98.97 — SI-25 GAP $1.41 — Q1 THU", "note": "War premium thesis at maximum tension. Q1 earnings Thu at ~$99 WTI = very supportive print expected. SI-25 gap $1.41 — monitor pre-open daily."},
    {"ticker": "CEG", "shares": 14, "avgPrice": 308.072, "last": 314.00, "unrealPnL": 69, "unrealPct": 1.6, "stop": 278, "status": "HOLD — STOP $278 — CATALYST MAY 11", "note": "Nuclear + AI power demand."},
    {"ticker": "R3NK", "shares": 25, "avgPrice": 52.27, "last": 54.39, "unrealPnL": 54, "unrealPct": 4.1, "stop": 48, "stopType": "Stop Limit", "stopLimit": 47, "cur": "EUR", "status": "HOLD — STOP LIMIT 48/47 — EARNINGS MAY 6", "note": "200M EUR deferred orders key."},
    {"ticker": "V", "shares": 8, "avgPrice": 307.125, "last": 323.99, "unrealPnL": 135, "unrealPct": 5.5, "stop": 298.59, "status": "HOLD — EARNINGS BEAT — STOP RAISED $298.59 — S32", "note": "Q2 beat: EPS $3.31 vs $3.09, rev $11.2B +17% YoY. New $20B buyback. Guidance raised to low double-digit/low teens. Stop raised $285→$298.59 post-earnings S32. Locks above cost. Catalyst clear."},
    {"ticker": "MRVL", "shares": 10, "avgPrice": 152.10, "last": 153.46, "unrealPnL": 15, "unrealPct": 1.0, "stop": 135, "status": "HOLD — STOP $135 — POET RESIDUAL DRAG — THESIS INTACT — MAY 28", "note": "-3% today on residual POET/Celestial AI sentiment. Google ASIC thesis unchanged. Stop $135 gives 12% room."},
    {"ticker": "SNPS", "shares": 8, "avgPrice": 495.125, "last": 498.54, "unrealPnL": -1, "unrealPct": -0.1, "stop": 440, "status": "HOLD — STOP $440 — CATALYST MAY 20", "note": "EDA duopoly. Slightly underwater on mark-to-market, well above stop."},
    {"ticker": "CGCT", "shares": 291, "avgPrice": 10.295, "last": 10.31, "unrealPnL": 4, "unrealPct": 0.1, "stop": null, "status": "HOLD — NO STOP — SPAC", "note": "Trust floor ~$10.27."},
    {"ticker": "RR", "name": "Rolls-Royce Holdings", "shares": 100, "avgPrice": 1128.6, "last": 1125.60, "unrealPnL": -3, "unrealPct": -0.3, "stop": 1050, "cur": "GBP", "status": "HOLD — STOP 1050p — H1 JUL 30", "note": "Slight unrealised loss, thesis intact."},
    {"ticker": "IES", "name": "Invinity Energy Systems", "shares": 3000, "avgPrice": 17.49, "last": 17.50, "unrealPnL": 0, "stop": null, "stopType": "MANUAL ALERT 12.5p", "cur": "GBP", "status": "HOLD — E15 MANUAL ALERT 12.5p", "note": "LDES decision pending."},


    {"ticker": "ABVX", "name": "Abivax SA", "shares": 50, "avgPrice": 109.89, "last": 110.00, "unrealPnL": 0, "unrealPct": 0.0, "stop": 100, "status": "HOLD — STOP $100 — M&A RUMOUR — REVIEW ~MAY 12-19", "note": "Re-entry S32 at $110. Stop $100 = 9.1% below entry. Risk $10/sh × 50sh = $500 — SI-35 maintained. Stop logic: breach of $100 signals M&A rumour fully faded; below that level stock reverts to pre-revenue biotech fundamentals, outside fund risk parameters. P11 compliant ($110 < $114.26 prior stop-out). Prior thesis P4. REVIEW GATE ~May 12-19: if no M&A or confirmatory news in 2-3 weeks, consider exit at market. Drug announcement ~Jun 5 is backstop binary. Asymmetric: limited drift expected vs significant upside on confirmed takeover."},
    {"ticker": "LDO", "name": "Leonardo SpA", "shares": 35, "avgPrice": 56.086, "last": 52.24, "unrealPnL": -135, "unrealPct": -6.9, "stop": 50, "cur": "EUR", "status": "HOLD — STOP €50 — TIGHT 3.8% — Q1 MAY 5", "note": "Do NOT widen stop."}
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
      {"id":8,"ticker":"LDO","dateIn":"2026-03-27","dateOut":"2026-04-07","qty":17,"entry":58.10,"exit":59.56,"ccy":"EUR","pnlUSD":20.51,"note":"T1. T2 35sh active."},
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
      {"id":22,"ticker":"CODA","dateIn":"2026-04-08","dateOut":"2026-04-27","qty":416,"entry":12.005,"exit":11.42,"ccy":"USD","pnlUSD":-243.36,"note":"S30 stop. CORRECTED S31: fill $11.42. E17. P11 active. -$243.36."},
      {"id":23,"ticker":"ISRG","dateIn":"2026-03-24","dateOut":"2026-04-27","qty":22,"entry":459.246,"exit":471.676,"ccy":"USD","pnlUSD":272.24,"note":"E16 corrected S31. Stop triggered. Q1 beat EPS $2.50. +$272.24."},
      {"id":24,"ticker":"ITM","dateIn":"2026-04-01","dateOut":"2026-04-28","qty":1200,"entry":65.1,"exit":130.39,"ccy":"GBP","pnlUSD":1041.00,"note":"ADDED S31 EVE. Stop Limit 130p/128p triggered on AIM intraday wick. Stock recovered to ~138p post-fill — no news catalyst. 172p limit auto-cancelled (OCA). Final ITM tranche. Total ITM programme: #15 +$828 + #20 +$770 + #24 +$1,041 = +$2,639. +$1,041."},
      {"id":25,"ticker":"ABBV","dateIn":"2026-04-22","dateOut":"2026-04-29","qty":20,"entry":205.22,"exit":191.1608,"ccy":"USD","pnlUSD":-282.27,"note":"S32. Stop $192 triggered BMO earnings day. Filled DARK $191.1608. Q1 BEAT post-fill: EPS $2.65 vs $2.65, rev $15B +12.4%, FY guidance raised — stop did its job protecting against gap open, stock recovered later. Clean execution. -$282.27."},
      {"id":26,"ticker":"PDYN","dateIn":"2026-03-25","dateOut":"2026-04-29","qty":250,"entry":6.595,"exit":5.815,"ccy":"USD","pnlUSD":-196.00,"note":"S32. Manual exit $5.815 — stop $5.75 was $0.09 from trigger, effectively at market. Earnings May 5 created gap risk on remaining 6 days. No negative news catalyst — broad AI small-cap sentiment drag. Decision: manual exit marginally better than letting stop fill + removes earnings gap risk. -$195 + commission ≈ -$196."}
    ],
    "grossRealizedPnLUSD": -2174,
    "lastUpdated": "2026-04-29 S32 Close — Trade #25 ABBV -$282.27, Trade #26 PDYN -$196. Gross ~-$2,174."
  },
  "sessionNotes": [
    {"date": "2026-04-28", "note": "SESSION 31 EVENING — ITM STOP-OUT. Stop Limit 130p/128p filled at 130.39p on 1,200 shares. No news catalyst — AIM intraday wick on thin volume, stock recovered to ~138p post-fill. 172p GTC limit auto-cancelled (OCA behaviour confirmed). Trade #24 added: entry 65.1p, exit 130.39p, +£783/+$1,041. Total ITM programme realised +$2,639 across three tranches. P11 does NOT apply — stop was placed deliberately at 130p, this is normal exit, not a thesis break. No re-entry contemplated. GBP cash confirmed +£637 in IBKR balances."},
    {"date": "2026-04-28", "note": "SESSION 31 EVENING — WTI CRITICAL. WTI hit $99.23 intraday, settled ~$98.97. SI-25 trigger $100.38 — gap reduced to ~$1.41, the narrowest since thesis established. Pakistan mediators hinting at new talks temporarily capped prices at $99.23. Iran new proposal (extend ceasefire, postpone nuclear talks) remains unresolved. SI-25 condition NOT triggered — requires permanent Hormuz reopening + WTI -10% from $111.54 peak, neither condition met. Monitor pre-open every session. NOG Q1 Thursday at this price level will be very supportive."},
    {"date": "2026-04-28", "note": "SESSION 31 EVENING — CRML ACQUISITION. Critical Metals announced $835M acquisition of European Lithium, adding Wolfsberg lithium project (Austria) to existing Tanbreez rare earths (Greenland). CRML +7% on announcement, gave back to -5% ($13.73) on profit-taking. Stop $10.51 — 26% clearance. Thesis confirmed and expanding: dual-asset critical minerals (REE + lithium) with European jurisdiction, US EXIM $620M interest, Saudi JV term sheet. No action — hold and allow thesis to develop. $10.51 stop appropriate — do not raise again immediately after recent adjustment."},
    {"date": "2026-04-28", "note": "SESSION 31 EVENING — MRVL -3%. Closed $153.46 vs $158.21 yesterday. Residual POET/Celestial AI sentiment drag on semiconductor supply chain theme broadly. No new specific MRVL news. Google ASIC (Dorado) thesis unaffected. Stop $135 = 12% below current. No action. Catalyst May 28."},
    {"date": "2026-04-28", "note": "SESSION 31 EVENING — EARNINGS PREVIEW. V reports tonight (consensus $3.09 EPS, $10.7B revenue). ABBV, AMZN, MSFT, MSTR, GOOGL all tomorrow. Options pricing MSFT ±6.77% (largest Mag 7 implied move) — stop $400.43 is within the downside risk range but accepted within SI-35. AMZN ±3.28% (calmest). Key AI bubble signal to watch: FCF compression across AMZN/MSFT/META from $630B+ capex plans. No changes to stops pre-earnings per standing protocol."},
    {"date": "2026-04-29", "note": "SESSION 32 — ABVX RE-ENTRY (REVISED). M&A rumours circulating again. Re-entered 50sh at $110. Stop revised to $100 (from initial $90): tighter stop at 9.1% below entry allows 50sh at same $500 SI-35 cap ($10 risk/sh × 50sh). Stop $100 rationale: $100 is the Nov 2025 technical support floor — price has not breached this level since Nov 2025. Breach = thesis broken, rumour fully faded, stock reverts to pre-revenue biotech fundamentals. Technical level, not a round-number guess. P11 compliant ($110 < $114.26 prior stop-out). Prior thesis P4. REVIEW GATE: if no M&A or confirmatory news by ~May 12-19 (2-3 weeks), consider exit at market regardless of price. Drug announcement ~Jun 5 is backstop binary event — gap risk acknowledged. Position 19th active. Position size $5,500 = ~5.2% NAV."},
    {"date": "2026-04-29", "note": "SESSION 32 — V STOP RAISED. V Q2 2026 earnings beat confirmed: EPS $3.31 vs $3.09 consensus, revenue $11.2B +17% YoY (highest growth since 2022). New $20B buyback program announced. Full-year guidance raised to low double-digit/low teens revenue growth. Stock +4.75% to $323.99. Stop raised $285 → $298.59 post-earnings clearance. NOTE: Stop $298.59 is $8.54 below avg cost $307.125 — reduces max loss from ~$177 to ~$68 but does NOT yet lock a profit. To lock profit, stop would need to exceed $307.13. P24 protocol respected — stop was not touched pre-earnings."},
    {"date": "2026-04-29", "note": "SESSION 32 FINAL CLOSE. Full session summary: (1) ABBV stop $192 triggered BMO at $191.1608 — Trade #25 -$282.27. Bitter irony: Q1 beat confirmed post-fill (rev $15B +12.4%, guidance raised), stock recovered. Stop correct given pre-earnings clearance of 3%. (2) ABVX filled $109.87 not $110 — market order slippage $6.50 total, immaterial. Stop $100 confirmed. (3) PDYN manual exit $5.815 — Trade #26 -$196. Stop $5.75 was $0.09 from trigger, earnings May 5 = gap risk. Clean decision. (4) V continued to $338.07 +9.3% on earnings continuation. Stop $298.59 holds. (5) WTI $103.47, Brent $113.47 — 8th consecutive session gain. Highest since June 2022. IEA largest supply shock on record. US cancelled Pakistan talks. SI-25 WTI leg exceeded, dual condition still unmet. (6) FOMC held 3.50-3.75% as expected. Powell likely final meeting as chair — Warsh succeeds May 15 (more hawkish). (7) MSFT stop raised $400.43→$411.89 in-place edit (no new order). Rationale: NYSE open until 00:00 UAE, MSFT reports ~21:00 UAE — market live at print, standard stop converts to market and fills best available all the way down. (8) ERROR CORRECTION S32: Earlier advice stated MSFT results dropped at 01:00 UAE with market closed — WRONG. NYSE closes 00:00 UAE, results at 21:00 UAE — market is open for ~3 hours post-announcement. Stop gap analysis was based on false premise. Corrected and stop strategy revised accordingly. (9) MSTR entry date corrected: earnings May 5 not Apr 29. Do not enter before May 5 result. (10) CCJ position discrepancy flagged for S33: journal shows 49sh @$104.021/stop $116.96 but IBKR shows 50sh @$117.02/stop $110 following Apr 28 restructure. Full CCJ block rewrite required S33 open. Fund: 17 positions, gross realised ~-$2,174, net liq $103.9K."}}
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
  const tabs=["positions","thesis","tracker","notes"];
  const pnlColor=(v)=>v>0?COLORS.green:v<0?COLORS.red:COLORS.textDim;

  return(
    <div style={{background:COLORS.bg,minHeight:"100vh",color:COLORS.text,fontFamily:"monospace",padding:16,maxWidth:1200,margin:"0 auto"}}>
      <style>{`.card{background:${COLORS.card};border:1px solid ${COLORS.border};border-radius:6px;padding:12px}.badge{font-size:10px;padding:2px 6px;border-radius:4px;font-weight:600;display:inline-block}.badge-green{background:rgba(63,185,80,0.15);color:${COLORS.green};border:1px solid rgba(63,185,80,0.3)}.badge-red{background:rgba(248,81,73,0.15);color:${COLORS.red};border:1px solid rgba(248,81,73,0.3)}.badge-amber{background:rgba(210,153,34,0.15);color:${COLORS.yellow};border:1px solid rgba(210,153,34,0.3)}.badge-orange{background:rgba(240,136,62,0.15);color:${COLORS.orange};border:1px solid rgba(240,136,62,0.3)}.badge-grey{background:rgba(139,148,158,0.15);color:${COLORS.textDim};border:1px solid rgba(139,148,158,0.3)}.btn{background:${COLORS.card};border:1px solid ${COLORS.border};color:${COLORS.text};padding:6px 12px;border-radius:4px;cursor:pointer;font-family:monospace;font-size:12px}.btn:hover{background:#21262d}.btn-primary{background:rgba(88,166,255,0.15);border-color:rgba(88,166,255,0.4);color:${COLORS.accent}}input{background:${COLORS.card};border:1px solid ${COLORS.border};color:${COLORS.text};padding:8px;border-radius:4px;font-family:monospace;font-size:12px;flex:1}`}</style>

      <div style={{marginBottom:16}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:8}}>
          <div>
            <div style={{fontSize:18,fontWeight:700,color:COLORS.textBright}}>CLAUDE FUND — JOURNAL v47</div>
            <div style={{fontSize:11,color:COLORS.textDim,marginTop:2}}>S31 Evening — Tue 28 Apr 2026 | {data.fund.account} | 18 positions</div>
          </div>
          <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
            {[
              {label:"NET LIQ",val:"$105.1K"},
              {label:"UNREAL",val:"+$5,779",color:COLORS.green},
              {label:"REALIZED",val:"~-$1,696",color:COLORS.red},
              {label:"WTI",val:"$98.97",color:COLORS.orange}
            ].map(m=>(
              <div key={m.label} className="card" style={{textAlign:"center",minWidth:80}}>
                <div style={{fontSize:9,color:COLORS.textDim}}>{m.label}</div>
                <div style={{fontSize:14,fontWeight:700,color:m.color||COLORS.textBright,marginTop:2}}>{m.val}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{marginTop:6,padding:"8px 12px",background:"rgba(240,136,62,0.15)",border:"2px solid rgba(240,136,62,0.5)",borderRadius:4,fontSize:12,color:COLORS.orange,fontWeight:600}}>
          ⚠️ SI-25 CRITICAL — WTI $98.97 | INTRADAY HIGH $99.23 | TRIGGER $100.38 | GAP ONLY $1.41
        </div>
        <div style={{marginTop:4,padding:"6px 10px",background:"rgba(248,81,73,0.1)",border:"1px solid rgba(248,81,73,0.3)",borderRadius:4,fontSize:11,color:COLORS.red}}>
          ITM STOPPED 130.39p (Trade #24 +$1,041) | V EARNINGS TONIGHT | ABBV/AMZN/MSFT/MSTR TMW
        </div>
        <div style={{marginTop:4,padding:"6px 10px",background:"rgba(63,185,80,0.1)",border:"1px solid rgba(63,185,80,0.3)",borderRadius:4,fontSize:11,color:COLORS.green}}>
          CRML: $835M European Lithium acquisition ✅ | ITM programme total +$2,639 across 3 tranches ✅
        </div>
      </div>

      <div style={{display:"flex",gap:4,marginBottom:12}}>
        {tabs.map(t=>(<button key={t} className={`btn ${activeTab===t?"btn-primary":""}`} onClick={()=>setActiveTab(t)} style={{textTransform:"uppercase",fontSize:11}}>{t}</button>))}
      </div>

      {activeTab==="positions"&&(
        <div style={{display:"flex",flexDirection:"column",gap:8}}>
          {data.positions?.map((p)=>(
            <div key={p.ticker} className="card" style={{borderLeft:p.status?.includes("SI-25")?`3px solid ${COLORS.orange}`:p.status?.includes("EARNINGS")?`3px solid ${COLORS.yellow}`:p.status?.includes("ACQUISITION")?`3px solid ${COLORS.green}`:p.unrealPnL>500?`3px solid ${COLORS.green}`:p.unrealPnL<-50?`3px solid ${COLORS.red}`:undefined}}>
              <div style={{display:"flex",gap:10,alignItems:"center",flexWrap:"wrap",marginBottom:6}}>
                <span style={{fontWeight:700,fontSize:14,color:COLORS.textBright}}>{p.ticker}</span>
                {p.cur&&<span className="badge badge-grey">{p.cur}</span>}
                {p.status?.includes("EARNINGS")&&<span className="badge badge-amber">EARNINGS</span>}
                {p.status?.includes("SI-25")&&<span className="badge badge-orange">SI-25 WATCH</span>}
                {p.status?.includes("ACQUISITION")&&<span className="badge badge-green">ACQUISITION</span>}
                <span className={`badge ${p.unrealPnL>50?"badge-green":p.unrealPnL<-20?"badge-red":"badge-amber"}`}>{p.unrealPnL>=0?"+":""}{p.unrealPct?.toFixed(1)}%</span>
              </div>
              <div style={{display:"flex",gap:16,flexWrap:"wrap",fontSize:11,marginBottom:4}}>
                <span>Avg: <b>{p.avgPrice}</b></span>
                <span>Last: <b>{p.last}</b></span>
                <span>P&L: <b style={{color:pnlColor(p.unrealPnL)}}>{p.unrealPnL>=0?"+":""}{p.unrealPnL?.toFixed(0)}</b></span>
                {p.stop&&<span>Stop: <b style={{color:COLORS.yellow}}>{p.stop}</b></span>}
              </div>
              <div style={{fontSize:10,color:COLORS.textDim}}>{p.note}</div>
            </div>
          ))}
        </div>
      )}

      {activeTab==="thesis"&&(
        <div>
          <div className="card" style={{marginBottom:12,borderLeft:`4px solid ${COLORS.orange}`}}>
            <div style={{fontWeight:700,color:COLORS.orange,marginBottom:6,fontSize:13}}>{data.thesis.title}</div>
            <div style={{fontSize:12,lineHeight:1.8,marginBottom:8}}>{data.thesis.summary}</div>
            <div style={{padding:"6px 10px",background:"rgba(240,136,62,0.1)",borderRadius:4,fontSize:11,color:COLORS.orange}}>{data.thesis.SI25Status}</div>
          </div>
          {data.thesis.keyDates?.map((d,i)=>(
            <div key={i} className="card" style={{marginBottom:5,borderLeft:`3px solid ${d.priority==="CRITICAL"?COLORS.red:d.priority==="HIGH"?COLORS.yellow:COLORS.textDim}`}}>
              <div style={{display:"flex",gap:12,alignItems:"flex-start"}}>
                <span style={{fontSize:10,fontWeight:600,minWidth:200,color:COLORS.textBright}}>{d.date}</span>
                <span style={{fontSize:10,color:COLORS.textDim,flex:1}}>{d.event}</span>
                <span className={`badge ${d.priority==="CRITICAL"?"badge-red":d.priority==="HIGH"?"badge-amber":"badge-grey"}`}>{d.priority}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab==="tracker"&&(
        <div>
          <div style={{fontSize:12,fontWeight:600,color:COLORS.accent,marginBottom:8}}>
            TRADE TRACKER — {data.tradeTracker?.closedTrades?.length} CLOSED | Gross Realized: ${data.tradeTracker?.grossRealizedPnLUSD?.toFixed(0)}
          </div>
          <div style={{marginBottom:6,padding:"6px 10px",background:"rgba(63,185,80,0.1)",border:"1px solid rgba(63,185,80,0.3)",borderRadius:4,fontSize:11,color:COLORS.green}}>
            ITM PROGRAMME COMPLETE: Trade #15 +$828 | #20 +$770 | #24 +$1,041 = TOTAL +$2,639
          </div>
          {data.tradeTracker?.closedTrades?.map((t)=>(
            <div key={t.id} className="card" style={{marginBottom:4,borderLeft:`3px solid ${t.pnlUSD>0?COLORS.green:COLORS.red}`}}>
              <div style={{display:"flex",gap:10,alignItems:"center",flexWrap:"wrap"}}>
                <span style={{fontSize:10,color:COLORS.textDim,minWidth:20}}>#{t.id}</span>
                <span style={{fontWeight:700}}>{t.ticker}</span>
                <span style={{fontSize:10,color:COLORS.textDim}}>{t.dateOut}</span>
                <span style={{fontWeight:700,color:pnlColor(t.pnlUSD)}}>{t.pnlUSD>=0?"+":""}${t.pnlUSD?.toFixed(2)}</span>
                <span className="badge badge-grey">{t.ccy}</span>
                {t.id===24&&<span className="badge badge-green">NEW S31</span>}
              </div>
              <div style={{fontSize:9,color:COLORS.textDim,marginTop:2}}>{t.note}</div>
            </div>
          ))}
        </div>
      )}

      {activeTab==="notes"&&(
        <div>
          <div style={{display:"flex",gap:8,marginBottom:12}}>
            <input value={newNote} onChange={e=>setNewNote(e.target.value)} placeholder="Add note..." onKeyDown={e=>e.key==="Enter"&&addNote()}/>
            <button className="btn btn-primary" onClick={addNote}>ADD</button>
          </div>
          {(data.sessionNotes||[]).slice().reverse().map((n,i)=>(
            <div key={i} className="card" style={{marginBottom:8}}>
              <div style={{fontSize:10,color:COLORS.textDim,marginBottom:4}}>{n.date}</div>
              <div style={{fontSize:11,lineHeight:1.7}}>{n.note}</div>
            </div>
          ))}
        </div>
      )}

      <div style={{marginTop:24,paddingTop:12,borderTop:`1px solid ${COLORS.border}`,display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:8,alignItems:"center"}}>
        <span style={{fontSize:10,color:COLORS.textDim}}>v47 | S31-EVE | 18 positions | WTI $98.97 | SI-25 GAP $1.41</span>
        <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
          <span className="badge badge-orange">SI-25 $1.41 GAP</span>
          <span className="badge badge-red">ITM STOPPED</span>
          <span className="badge badge-green">CRML ACQUISITION</span>
          <span className="badge badge-amber">V EARNINGS TONIGHT</span>
        </div>
      </div>
    </div>
  );
}
