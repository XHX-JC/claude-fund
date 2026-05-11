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
  "lastUpdated": "2026-04-21 SESSION 26 EOD CLOSE — JOURNAL v38 (SI-51 v2 FINAL)",
  "sessionNumber": 26,
  "fund": {
    "account": "U24936508",
    "netLiquidity": 105200,
    "cash": 26865,
    "availableFunds": 81900,
    "dailyPnL": 751.34,
    "unrealizedPnL": 7553,
    "realizedPnL": 493.44,
    "broker": "IBKR Pro",
    "baseCurrency": "USD",
    "location": "UAE",
    "ibkrEuropeanAccess": "APPROVED — March 26 2026",
    "cashUSD": 33853,
    "cashEUR": -2900,
    "cashGBP": -2645,
    "cashBase": 26865,
    "cashFloorRule": "10% of NL = $10,520 minimum. NEVER go below.",
    "deployableCash": 15177,
    "deployableCashNote": "cashBase $26,865 minus floor $10,520 minus FX deficit ~$1,168 = ~$15,177",
    "lastUpdated": "2026-04-21 SESSION 26 EOD — JOURNAL v38 FINAL. Net Liq $105.2K. Daily P&L +$751.34. ABVX STOPPED OUT $114.31 (-$158). LDO.MI FILLED €56.086 avg 35sh. ITM stop raised 100p→120p/118p (Rheinmetall Giga PtX NATO deal). CRML add $10.50 CANCELLED — $60M placement at $10.00. GOOGL BUY $315 + BKR BUY $58.50 brackets placed. AMPX stop corrected $15.79→$16.89. SI-51 v2 WEIGHTED JUDGEMENT FRAMEWORK replaces binary T8 block. POET now qualifies for entry. Three earnings overnight/tomorrow.",
    "note": "JOURNAL v38 FINAL SESSION 26 (Tuesday 21 Apr 2026). NET LIQ $105.2K. 17 positions. ABVX stopped out -$158.53 (P4 clean). LDO.MI filled. ITM stop 120p/118p target 175p/200p. CRML add cancelled (dilution). GOOGL+BKR live. SI-51 v2: binary T8 block replaced with weighted scoring framework for Tier 3. POET scores +7/7, now qualifies for entry on next pullback."
  },
  "thesis": {
    "title": "CEASEFIRE EXPIRED — NO DEAL — HORMUZ BLOCKED — WTI ~$87 — THREE EARNINGS OVERNIGHT",
    "summary": "EOD TUESDAY APR 21. Ceasefire expired with no extension and no second round of talks confirmed. Iran did not attend Islamabad talks. Hormuz remains largely blocked. WTI ~$87 — SI-25 NOT TRIGGERED (trigger $100.38). NOG thesis intact. CODA mine clearance thesis intact — kinetic naval action in Hormuz strengthens case. Three major earnings overnight and tomorrow: ISRG Q1 (00:30 UAE Wed), AMZN Q1 (Wed AMC), LRCX Q3 (Wed AMC). ITM.L Rheinmetall Giga PtX collaboration adds defence/NATO e-fuel layer to existing energy transition thesis.",
    "oilWTI": 87.0,
    "oilWTINote": "WTI ~$87 at session close. Ceasefire expired Apr 21 with no deal. Hormuz blocked. SI-25 trigger $100.38 — not triggered.",
    "oilBrent": 91.0,
    "hormuzStatus": "CLOSED. Ceasefire expired April 21 with no extension. Iran did not attend Islamabad talks. US naval blockade active. Mine clearance multi-year thesis (CODA) intact.",
    "ceasefireFilter": "SI-25 WATCH. Ceasefire expired APR 21 — no extension. WTI ~$87 (vs SI-25 trigger $100.38). SI-25 NOT TRIGGERED.",
    "blockadeStatus": "US CENTCOM naval blockade continues. Iran blockading Hormuz. No second round of talks confirmed. Mine clearance multi-year (CODA). Iran rebuilding stockpiles confirmed.",
    "keyDates": [
      {"date": "TONIGHT 00:30 UAE Wed", "event": "ISRG Q1 2026 earnings — non-GAAP consensus EPS $2.11, rev $2.62B. Beat → raise stop $455-460. Miss → let $443.86 execute.", "priority": "CRITICAL"},
      {"date": "Wed Apr 22 AMC", "event": "AMZN Q1 earnings — AWS + AI capex key. Beat → raise stop $242-245. Strong beat → consider +10sh add.", "priority": "CRITICAL"},
      {"date": "Wed Apr 22 AMC", "event": "LRCX Q3 FY26 — beat + dip -5%+ → BUY $245 / stop $220 / 10sh. Check analyst upgrades first.", "priority": "CRITICAL"},
      {"date": "Wed Apr 22 AMO", "event": "VRT + GEV earnings — AI infra read-across.", "priority": "HIGH"},
      {"date": "Thu Apr 23 AMC", "event": "BKR earnings — BUY $58.50 GTC live. May fill pre-earnings.", "priority": "HIGH"},
      {"date": "Mon Apr 28 AMC", "event": "V Q2 earnings — BUY $307 GTC active.", "priority": "CRITICAL"},
      {"date": "Tue Apr 29 AMC", "event": "MSFT Q3 FY2026 — Azure growth %.", "priority": "CRITICAL"},
      {"date": "Tue Apr 29 AMC", "event": "GOOGL Q1 — BUY $315 GTC active. Cloud + AI capex.", "priority": "CRITICAL"},
      {"date": "Wed Apr 30", "event": "NOG Q1 at WTI war-premium levels.", "priority": "HIGH"},
      {"date": "Spring 2026 (IMMINENT)", "event": "IES.L LDES Initial Decision List — binary catalyst.", "priority": "CRITICAL"},
      {"date": "May 5", "event": "LDO.MI Q1 — first earnings post-entry.", "priority": "CRITICAL"},
      {"date": "May 6", "event": "R3NK Q1 — €200M deferred orders must appear.", "priority": "CRITICAL"},
      {"date": "May 7", "event": "AMPX Q1. Stop $16.89 live.", "priority": "HIGH"},
      {"date": "Mid-May", "event": "SNPS Q2 FY26 — margin recovery >20% = entry signal.", "priority": "CRITICAL"},
      {"date": "After May 17", "event": "MU SI-41 window opens — $440-445 / stop $420 / 14sh.", "priority": "CRITICAL"},
      {"date": "~May 2026", "event": "CGCT business combination close → FAC listing.", "priority": "CRITICAL"},
      {"date": "Jul 1", "event": "MU Q3 FY26 earnings AMC.", "priority": "HIGH"}
    ]
  },
  "positions": [
    {
      "ticker": "ITM", "name": "ITM Power PLC", "shares": 2000, "avgPrice": 65.1, "costBasis": 1302,
      "last": 138.90, "marketVal": 2778, "unrealPnL": 1472, "unrealPct": 113.1,
      "stop": 120, "stopType": "Stop Limit", "stopLimit": 118, "target": 175,
      "status": "HOLD — STOP LIMIT 120p/118p GTC (RAISED S26)", "cur": "GBP",
      "note": "Rheinmetall Giga PtX NATO deal Apr 17 — +46% single day. Stop raised 100p→120p/118p SL (P10+P23). Target revised 150p→175p/200p. Giga PtX: hundreds of plants across Europe, each up to 50MW, NATO sovereign e-fuel. Repeatable deployment. At 150p: raise stop to 130p, hold to 175p."
    },
    {
      "ticker": "CRML", "name": "Critical Metals Corp", "shares": 110, "avgPrice": 9.08, "costBasis": 999,
      "last": 11.39, "marketVal": 1253, "unrealPnL": 254, "unrealPct": 25.5,
      "stop": 8.34, "target": 15, "status": "HOLD — STOP $8.34 GTC — ADD CANCELLED S26",
      "note": "$60M placement at $10.00 announced Apr 21. Add $10.50 cancelled — buying above placement price into dilution. Existing 110sh at $9.08 HELD — below institutional entry. Watch $10.00 as near-term ceiling. Re-entry at $9.80-10.00 after overhang clears. China critical minerals thesis intact."
    },
    {
      "ticker": "AMZN", "name": "Amazon.com Inc", "shares": 30, "avgPrice": 201.204, "costBasis": 6036,
      "last": 255.09, "marketVal": 7653, "unrealPnL": 1617, "unrealPct": 26.8,
      "stop": 234.39, "stopType": "Stop Limit", "stopLimit": 224, "target": 300,
      "status": "HOLD — EARNINGS TONIGHT AMC", "note": "Stop $234.39/$224 GTC. Earnings TONIGHT. Beat + AWS strong → raise stop $242-245."
    },
    {
      "ticker": "CCJ", "name": "Cameco Corp", "shares": 49, "avgPrice": 104.021, "costBasis": 5097,
      "last": 124.03, "marketVal": 6077, "unrealPnL": 980, "unrealPct": 19.2,
      "stop": 108.37, "target": null, "status": "HOLD — STOP LIVE", "note": "Nuclear thesis structural."
    },
    {
      "ticker": "MSFT", "name": "Microsoft Corp", "shares": 25, "avgPrice": 372.77, "costBasis": 9319,
      "last": 419.48, "marketVal": 10487, "unrealPnL": 1168, "unrealPct": 12.5,
      "stop": 400.43, "target": 430, "status": "HOLD — EARNINGS APR 29 AMC", "note": "Azure + Copilot intact."
    },
    {
      "ticker": "AMPX", "name": "Amprius Technologies", "shares": 168, "avgPrice": 18.106, "costBasis": 3042,
      "last": 20.10, "marketVal": 3377, "unrealPnL": 335, "unrealPct": 11.0,
      "stop": 16.89, "target": 32, "status": "HOLD — STOP $16.89 GTC (CORRECTED S26)", "note": "Stop raised to $16.89 in S25 — journal corrected S26 (P16). Q1 May 7."
    },
    {
      "ticker": "CODA", "name": "Coda Octopus Group", "shares": 416, "avgPrice": 12.005, "costBasis": 4994,
      "last": 12.59, "marketVal": 5237, "unrealPnL": 243, "unrealPct": 4.9,
      "stop": 11.51, "target": 22, "status": "HOLD — MINE CLEARANCE MULTI-YEAR", "note": "Ceasefire expired — Hormuz blocked. Thesis intact."
    },
    {
      "ticker": "VST", "name": "Vistra Corp", "shares": 53, "avgPrice": 150.569, "costBasis": 7980,
      "last": 160.88, "marketVal": 8527, "unrealPnL": 547, "unrealPct": 6.9,
      "stop": 151.5, "target": null, "status": "HOLD — STOP LIVE", "note": "VRT earnings Wed AM — AI infra read-across."
    },
    {
      "ticker": "R3NK", "name": "RENK Group AG", "shares": 25, "avgPrice": 52.27, "costBasis": 1307,
      "last": 55.86, "marketVal": 1397, "unrealPnL": 90, "unrealPct": 6.9,
      "stop": 48, "stopType": "Stop Limit", "stopLimit": 47, "target": 76,
      "status": "HOLD — STOP LIMIT €48/€47 GTC", "cur": "EUR", "note": "Q1 May 6."
    },
    {
      "ticker": "PDYN", "name": "Palladyne AI Corp", "shares": 250, "avgPrice": 6.595, "costBasis": 1649,
      "last": 6.85, "marketVal": 1713, "unrealPnL": 64, "unrealPct": 3.9,
      "stop": 5.75, "target": null, "status": "HOLD — STOP LIVE", "note": "May 13 earnings."
    },
    {
      "ticker": "NOG", "name": "Northern Oil and Gas Inc", "shares": 80, "avgPrice": 24.38, "costBasis": 1950,
      "last": 24.99, "marketVal": 1999, "unrealPnL": 49, "unrealPct": 2.0,
      "stop": 22.50, "target": null, "status": "HOLD — STOP $22.50 GTC (Order ID 133934373)", "note": "Ceasefire expired. WTI ~$87. Thesis intact. Q1 Apr 30."
    },
    {
      "ticker": "RR", "name": "Rolls-Royce Holdings", "shares": 150, "avgPrice": 1182.9, "costBasis": 1774,
      "last": 1200.90, "marketVal": 1801, "unrealPnL": 27, "unrealPct": 1.5,
      "stop": 1150, "stopType": "Stop Limit", "stopLimit": 1130, "target": 1600,
      "status": "HOLD — EX-DIV COMPLETE — HARD LOCK EXPIRED", "cur": "GBP",
      "note": "Ex-div Apr 21 complete. Hard lock expires. £2.5bn buyback active. Can review stop tomorrow."
    },
    {
      "ticker": "ISRG", "name": "Intuitive Surgical Inc", "shares": 22, "avgPrice": 459.25, "costBasis": 10104,
      "last": 469.98, "marketVal": 10340, "unrealPnL": 236, "unrealPct": 2.3,
      "stop": 443.86, "target": 510, "status": "HOLD — EARNINGS TONIGHT 00:30 UAE — DO NOT TOUCH",
      "note": "Q1 TONIGHT. Non-GAAP consensus $2.11 (not $1.63 GAAP). Beat → raise stop $455-460. Miss → let $443.86 execute."
    },
    {
      "ticker": "LLY", "name": "Eli Lilly and Company", "shares": 3, "avgPrice": 905.34, "costBasis": 2716,
      "last": 920.10, "marketVal": 2760, "unrealPnL": 44, "unrealPct": 1.6,
      "stop": 850, "target": 1028, "status": "HOLD — STOP $850 GTC", "note": "GLP-1 intact."
    },
    {
      "ticker": "IES", "name": "Invinity Energy Systems PLC", "shares": 3000, "avgPrice": 17.49, "costBasis": 525,
      "last": 17.45, "marketVal": 524, "unrealPnL": -2, "unrealPct": -0.2,
      "stop": null, "stopType": "MANUAL ALERT 12.5p", "target": 45,
      "status": "HOLD — MANUAL ALERT 12.5p (AIM — E15)", "cur": "GBP",
      "note": "E15: no IBKR stops for AIM. Manual alert 12.5p. LDES Initial Decision List IMMINENT."
    },
    {
      "ticker": "LDO", "name": "Leonardo SpA", "shares": 35, "avgPrice": 56.086, "costBasis": 1963,
      "last": 55.78, "marketVal": 1952, "unrealPnL": -11, "unrealPct": -0.6,
      "stop": 50, "target": 76, "status": "HOLD — NEW S26 — STOP €50 GTC", "cur": "EUR",
      "note": "FILLED S26. -3.99% first day = Italian market rotation, not news. Defence: European rearmament, Eurofighter, F-35, GCAP, Leonardo-Rheinmetall Military Vehicles JV. Q1 May 5."
    },
    {
      "ticker": "CGCT", "name": "Cartesian Growth Corp III (Factorial Energy SPAC)", "shares": 291, "avgPrice": 10.295, "costBasis": 2994,
      "last": 10.30, "marketVal": 2997, "unrealPnL": 3, "unrealPct": 0.1,
      "stop": null, "target": null, "status": "HOLD — NO STOP (TRUST FLOOR ~$10.27)", "note": "Trust floor. Deal close ~May 2026."
    }
  ],
  "pendingOrders": [
    {"ticker": "GOOGL", "action": "BUY", "type": "Limit", "qty": 10, "limitPrice": 315, "tif": "GTC", "status": "ACTIVE — S26", "note": "SI-39. Stop $285 OCA. Earnings Apr 29."},
    {"ticker": "GOOGL", "action": "SELL", "type": "Stop", "qty": 10, "stopPrice": 285, "tif": "GTC", "status": "ACTIVE — OCA"},
    {"ticker": "BKR", "action": "BUY", "type": "Limit", "qty": 8, "limitPrice": 58.50, "tif": "GTC", "status": "ACTIVE — S26", "note": "Hormuz thesis. Earnings Thu Apr 23. Stop $53.50 OCA."},
    {"ticker": "BKR", "action": "SELL", "type": "Stop", "qty": 8, "stopPrice": 53.50, "tif": "GTC", "status": "ACTIVE — OCA"},
    {"ticker": "ITM", "action": "SELL", "type": "Stop Limit", "qty": 2000, "limitPrice": 118, "stopPrice": 120, "tif": "GTC", "status": "ACTIVE — RAISED S26", "note": "Locks in min £1,099 gain."},
    {"ticker": "IES", "action": "SELL", "type": "MANUAL ALERT", "qty": 3000, "alertPrice": "12.5p", "tif": "N/A", "status": "MANUAL — E15", "note": "Alert 12.5p → immediate Market Sell. Max loss £150."},
    {"ticker": "V", "action": "BUY", "type": "Limit", "qty": 8, "limitPrice": 307, "tif": "GTC", "status": "ACTIVE", "note": "SI-39. Earnings Apr 28. Stop $285 OCA."},
    {"ticker": "V", "action": "SELL", "type": "Stop", "qty": 8, "stopPrice": 285, "tif": "GTC", "status": "ACTIVE"},
    {"ticker": "NOG", "action": "SELL", "type": "Stop", "qty": 80, "stopPrice": 22.50, "tif": "GTC", "status": "ACTIVE — ID 133934373"},
    {"ticker": "CRML", "action": "SELL", "type": "Stop", "qty": 110, "stopPrice": 8.34, "tif": "GTC", "status": "ACTIVE"},
    {"ticker": "RR", "action": "SELL", "type": "Stop Limit", "qty": 150, "stopPrice": 1150, "limitPrice": 1130, "tif": "GTC", "status": "ACTIVE"},
    {"ticker": "LLY", "action": "SELL", "type": "Stop", "qty": 3, "stopPrice": 850, "tif": "GTC", "status": "ACTIVE"},
    {"ticker": "MP", "action": "BUY", "type": "Limit", "qty": 75, "limitPrice": 55, "tif": "GTC", "status": "ACTIVE"},
    {"ticker": "MP", "action": "SELL", "type": "Stop", "qty": 75, "stopPrice": 50, "tif": "GTC", "status": "ACTIVE"},
    {"ticker": "LDO", "action": "SELL", "type": "Stop", "qty": 35, "stopPrice": 50, "tif": "GTC", "status": "ACTIVE — S26"},
    {"ticker": "CCJ", "action": "SELL", "type": "Stop", "qty": 49, "stopPrice": 108.37, "tif": "GTC", "status": "ACTIVE"},
    {"ticker": "PDYN", "action": "SELL", "type": "Stop", "qty": 250, "stopPrice": 5.75, "tif": "GTC", "status": "ACTIVE"},
    {"ticker": "AMPX", "action": "SELL", "type": "Stop", "qty": 168, "stopPrice": 16.89, "tif": "GTC", "status": "ACTIVE — CORRECTED S26"},
    {"ticker": "AMPX", "action": "SELL", "type": "Limit", "qty": 168, "limitPrice": 32, "tif": "GTC", "status": "ACTIVE"},
    {"ticker": "VST", "action": "SELL", "type": "Stop", "qty": 53, "stopPrice": 151.5, "tif": "GTC", "status": "ACTIVE"},
    {"ticker": "AMZN", "action": "SELL", "type": "Stop Limit", "qty": 30, "limitPrice": 224, "stopPrice": 234.39, "tif": "GTC", "status": "ACTIVE — EARNINGS TONIGHT"},
    {"ticker": "MSFT", "action": "SELL", "type": "Stop", "qty": 25, "stopPrice": 400.43, "tif": "GTC", "status": "ACTIVE"},
    {"ticker": "ISRG", "action": "SELL", "type": "Stop", "qty": 22, "stopPrice": 443.86, "tif": "GTC", "status": "ACTIVE — EARNINGS TONIGHT"},
    {"ticker": "CODA", "action": "SELL", "type": "Stop", "qty": 416, "stopPrice": 11.51, "tif": "GTC", "status": "ACTIVE"},
    {"ticker": "R3NK", "action": "SELL", "type": "Stop Limit", "qty": 25, "limitPrice": 47, "stopPrice": 48, "tif": "GTC", "status": "ACTIVE"}
  ],
  "ukCleanEnergyBasket": {
    "thesis": "UK energy transition — ITM (PEM electrolyser + NATO Rheinmetall Giga PtX e-fuel) + IES (vanadium LDES). AIM pair. Macro: EU energy independence, NATO sovereign fuel, LDES policy.",
    "combinedCost": "ITM £1,302 + IES £525 = £1,827 (~1.7% NAV)",
    "positions": [
      {"ticker": "ITM.L", "technology": "PEM electrolyser + NATO Giga PtX e-fuel", "shares": 2000, "avgPrice": "65.1p", "last": "138.90p", "stop": "120p/118p SL GTC (raised S26)", "unrealPct": "+113.1%", "target": "175p/200p"},
      {"ticker": "IES.L", "technology": "Vanadium flow LDES", "shares": 3000, "avgPrice": "17.49p", "last": "17.45p", "stop": "Manual 12.5p (E15)", "unrealPct": "-0.2%", "target": "61.81p"}
    ]
  },
  "watchlistUS": [
    {"ticker": "POET", "name": "POET Technologies", "exchange": "NASDAQ", "status": "SI-51 v2 QUALIFIED — ENTRY ON PULLBACK", "note": "Silicon photonics / CPO. Wolfpack short Apr 14 — company rebutted Apr 20 (PFIC clarification). SI-51 v2 score +7/7. Hard blocks all clear. +40% from identification price. Entry: limit on next pullback, stop -10% below entry, size $1,000-1,500 (SI-37 cap). Primary catalyst: production order shipments H2 2026, Q2 revenue ramp."},
    {"ticker": "GOOGL", "name": "Alphabet Inc", "exchange": "NASDAQ", "status": "ACTIVE — BUY $315 GTC", "note": "SI-39 -25% from ATH. Earnings Apr 29. Stop $285 OCA live."},
    {"ticker": "BKR", "name": "Baker Hughes", "exchange": "NYSE", "status": "ACTIVE — BUY $58.50 GTC", "note": "Hormuz energy services. Earnings Thu Apr 23. Stop $53.50 OCA."},
    {"ticker": "V", "name": "Visa Inc", "exchange": "NYSE", "status": "ACTIVE — BUY $307 GTC", "note": "SI-39. Earnings Apr 28. Stop $285 OCA."},
    {"ticker": "LRCX", "name": "Lam Research Corp", "exchange": "NASDAQ", "status": "STAGE 1 PASS — ENTRY CONDITIONAL TOMORROW", "note": "Earnings Wed Apr 22 AMC. Beat + dip -5%+ → $245 limit / $220 stop / 10sh. Check analyst upgrades first. Fwd PE 39.4, 8 consecutive beats."},
    {"ticker": "MU", "name": "Micron Technology", "exchange": "NASDAQ", "status": "STAGE 2 CONFIRMED — WAIT SI-41 (after May 17)", "note": "SCA confirmed. Entry $440-445 / $420 stop / 14sh."},
    {"ticker": "SNPS", "name": "Synopsys", "exchange": "NASDAQ", "status": "MONITOR — MID-MAY EARNINGS", "note": "Entry only if margin recovery >20%."},
    {"ticker": "CRDO", "name": "Credo Technology", "exchange": "NASDAQ", "status": "CONDITIONAL — WAIT $140-145"},
    {"ticker": "OXY", "name": "Occidental Petroleum", "exchange": "NYSE", "status": "CONDITIONAL — WTI $90+ THREE DAYS", "note": "WTI ~$87 — below threshold. Monitor."},
    {"ticker": "CDNS", "name": "Cadence Design Systems", "exchange": "NASDAQ", "status": "MONITOR — TRIGGER $301.16"},
    {"ticker": "TLN", "name": "Talen Energy Corp", "exchange": "NASDAQ", "status": "WATCH — POST MAY 5 ONLY"},
    {"ticker": "NFLX", "name": "Netflix Inc", "exchange": "NASDAQ", "status": "SI-41 FAIL until June"}
  ],
  "watchlistEU": [
    {"ticker": "IES.L", "name": "Invinity Energy Systems PLC", "exchange": "AIM", "cur": "GBP", "status": "IN PORTFOLIO — E15 MANUAL 12.5p", "note": "LDES decision imminent."},
    {"ticker": "ITM.L", "name": "ITM Power PLC", "exchange": "LSE", "cur": "GBP", "status": "IN PORTFOLIO — Stop 120p/118p", "note": "Rheinmetall NATO. +113.1%. Target 175p."},
    {"ticker": "RR.L", "name": "Rolls-Royce Holdings", "exchange": "LSE", "cur": "GBP", "status": "IN PORTFOLIO — Ex-div complete", "note": "Stop 1150p/1130p. Hard lock expired."},
    {"ticker": "R3NK", "name": "RENK Group AG", "exchange": "IBIS", "cur": "EUR", "status": "IN PORTFOLIO", "note": "Q1 May 6."},
    {"ticker": "LDO.MI", "name": "Leonardo SpA", "exchange": "BVME", "cur": "EUR", "status": "IN PORTFOLIO — 35sh @ €56.086, stop €50", "note": "FILLED S26. May 5 earnings."},
    {"ticker": "CWR.L", "name": "Ceres Power", "exchange": "LSE", "cur": "GBP", "note": "Entry 250-270p only."},
    {"ticker": "ENR.DE", "name": "Siemens Energy AG", "exchange": "XETRA", "cur": "EUR", "note": "AI THESIS TIER 2 — Stage 2 pending."}
  ],
  "sessionNotes": [
    {"date": "2026-04-18", "note": "SESSION 23 — LNG stopped -$396.54. NOG filled $24.37. ITM trim +£652. Journal v32."},
    {"date": "2026-04-19", "note": "SESSION 24 — Hormuz re-closed. NOG sell cancelled. SI-47/48/49. AI thesis Stage 1. Journal v35."},
    {"date": "2026-04-20", "note": "SESSION 25 EOD — IES.L filled 17.39p £525. E15 confirmed. NOG stop $22.50 live. WTI $88.36. Journal v37."},
    {"date": "2026-04-21", "note": "SESSION 26 EOD FINAL — ABVX stopped $114.31, loss -$158.53 (P4 clean). LDO.MI filled €56.086 35sh. ITM stop raised 100p→120p/118p, target →175p/200p (Rheinmetall). CRML add cancelled (dilution $60M at $10.00). GOOGL $315 + BKR $58.50 live. AMPX stop corrected →$16.89. POET +40% vs identification: SI-51 v2 written — weighted judgement replaces binary T8 block for Tier 3. POET scores +7/7, qualifies for entry on pullback. SI-52 Wide Net live. Journal v38 final."}
  ],
  "tradeTracker": {
    "pendingRows": [
      {"id": 1, "ticker": "AVAV", "shares": 25, "entryPrice": 195.09, "exitPrice": 197.945, "pnl": "+$71.38", "session": "S20"},
      {"id": 2, "ticker": "ITM TRIM", "shares": 1100, "entryPrice": "65.1p", "exitPrice": "124.60p", "pnl": "+£652", "session": "S22"},
      {"id": 3, "ticker": "LNG", "shares": 19, "entryPrice": 268.76, "exitPrice": 248.00, "pnl": "-$396.54", "session": "S23"},
      {"id": 4, "ticker": "PATK", "shares": 25, "entryPrice": 108.80, "exitPrice": 109.256, "pnl": "+$9.34", "session": "S23"},
      {"id": 5, "ticker": "NOG", "note": "Market sell cancelled S24 — position held", "session": "S24"},
      {"id": 6, "ticker": "ABVX", "shares": 44, "entryPrice": 117.913, "exitPrice": 114.31, "pnl": "-$158.53", "session": "S26", "note": "P4 stop executed cleanly. Intentional stop below cost for M&A optionality. Max loss defined and accepted."}
    ]
  },
  "standingInstructions": [
    {"id": 1, "title": "FULL SCAN — SI-14 v4.0", "body": "Section 0: SI-39 + AI Tier 2. Section 0-B: SI-52 Wide Net (15 min). Then A-K."},
    {"id": 17, "title": "ERROR TAXONOMY — 15 TYPES", "body": "E1: Timezone. E2: Stale position. E3: Fill re-flag. E4: Price verification. E5: Market timing. E6: Dividend capture. E7: Session discipline. E8: Stale quote. E9: GTC orphan. E10: Closed position scan. E11: 52wk hallucination. E12: Tool routing gap. E13: EODHD delay. E14: Date discrepancy. E15: AIM stop limitation — manual alert only."},
    {"id": 19, "title": "CLOSED POSITIONS — SI-19", "body": "ONDS -$601. KTOS -$1,601. CCL +$122. UEC -$127. IAG.L +£326. RCL -$132. LEU -$238. PLTR -$1,307. PDYN partial +$17.42. AVAV +$71.38. ITM TRIM +£652. LNG -$396.54. PATK +$9.34. NOG sell cancelled S24. ABVX -$158.53 (S26 P4)."},
    {"id": 24, "title": "CASH FLOOR — 10% RULE", "body": "Floor = 10% NL. At $105.2K → $10,520. Deployable ~$15,177. FX deficits: EUR -€2,900, GBP -£2,645."},
    {"id": 25, "title": "SI-25 EXIT TRIGGER", "body": "Permanent Hormuz reopening + WTI -10% from $111.54 peak = trigger at $100.38. WTI ~$87. NOT TRIGGERED."},
    {"id": 37, "title": "SPECULATIVE CAP — $1,500 MAX", "body": "AMPX $3,377 + PDYN $1,713 + CRML $1,253 + CGCT $2,997 + IES ~$664 = ~$10,004 (~9.5% NAV). Any new Tier 3 entry via SI-51 v2 must stay within 15% NAV total."},
    {"id": 47, "title": "SI-47: DATE VERIFICATION — STEP ZERO", "body": "System prompt date is authoritative. State date before any analysis."},
    {"id": 48, "title": "SI-48: AI THESIS ATH RULE", "body": "Four tests: valuation, structural catalyst, no multiple expansion, PLTR P6 test. MU passes. LRCX Stage 1 pass — entry conditional post-earnings dip."},
    {"id": 49, "title": "SI-49: STAGE 2 DATA ROUTING", "body": "Price: MMD. 52wk: EOD extended. Fundamentals: Alpha. Transcripts: Alpha EARNINGS_CALL_TRANSCRIPT. Charts: MMD + Visualizer. EU/UK: Yahoo Finance. NEVER use memory for price data."},
    {"id": 50, "title": "SI-50: TWICE-WEEKLY SCAN", "body": "Monday full + Thursday brief. Thursday watch: MU, CDNS, CRDO, OXY, NOG, IES.L. First Thursday: April 24 2026."},
    {"id": 51, "title": "SI-51 v2: TIER 3 ENTRY FRAMEWORK — WEIGHTED JUDGEMENT (REVISED S26 EOD)", "body": "CORE PRINCIPLE: For Tier 3 positions (SI-37 cap ≤$1,500, SI-35 stop ≤$500 loss), entry is a WEIGHTED JUDGEMENT, not a binary pass/fail. A single doubt does not block if multiple positives outweigh it and the stop bounds the downside.\n\nHARD BLOCKS (cannot be overridden by score):\n• No company rebuttal published yet on active short → BLOCK\n• Spec allocation at/above 15% NAV → BLOCK\n• P6: pure narrative momentum, no fundamental anchor → BLOCK\n• DO NOT ENTER list → BLOCK\n\nSCORING — Entry requires net ≥ +3 AND all hard blocks clear:\n(+1) Real IP/product/revenue path visible\n(+1) Specific factual rebuttal addresses core short claims\n(+1) Price stable/rising above pre-attack close ≥1 session\n(+1) Binary catalyst within 60 days\n(+1) Cash runway >12 months, no dilution overhang\n(+1) Upside >3× capped max loss\n(+1) Macro/structural tailwind behind thesis\n\nPOET SCORE (as of Apr 21 2026): +7/7. All hard blocks clear. Entry permitted on next pullback.\n\nDOCUMENT before entry: score table with evidence, hard block check, entry/stop/max loss, catalyst.\n\nT8 for Tier 1/2: hard block unchanged. Dollar exposure too large during active attack."},
    {"id": 52, "title": "SI-52: WIDE NET SURFACE SCAN", "body": "Section 0-B daily, 15 min max. Step 1: Alpha TOP_GAINERS_LOSERS — flag >8% moves on >2x volume. Step 2: 30-sec news filter (fundamental/regulatory/technical). Step 3: 60-sec Stage 1 filter (mkt cap >$500M, not blocked, thesis relevance). Any pass → Stage 1 within 24hrs."}
  ],
  "priceVerificationProtocol": {
    "currentPriceUS": "MMD /v2/aggs/ticker/{TICKER}/prev — field 'c'",
    "52wkRangeUS": "EOD:get_us_live_extended_quotes",
    "currentPriceEUUK": "web_fetch Yahoo Finance",
    "memoryForbidden": "MEMORY ESTIMATES FOR PRICE OR FUNDAMENTAL DATA ARE FORBIDDEN"
  },
  "cDriveProtocol": {
    "confirmed": "2026-04-21 SESSION 26",
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
            <div style={{ fontSize: 18, fontWeight: 700, color: COLORS.textBright }}>CLAUDE FUND — JOURNAL v38 FINAL</div>
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
        <div style={{ marginTop: 6, padding: "6px 10px", background: "rgba(248,81,73,0.1)", border: "1px solid rgba(248,81,73,0.3)", borderRadius: 4, fontSize: 11, color: COLORS.red }}>
          ⚠️ ISRG EARNINGS 00:30 UAE — AMZN + LRCX EARNINGS WED AMC — CEASEFIRE EXPIRED NO DEAL
        </div>
        <div style={{ marginTop: 4, padding: "6px 10px", background: "rgba(63,185,80,0.1)", border: "1px solid rgba(63,185,80,0.3)", borderRadius: 4, fontSize: 11, color: COLORS.green }}>
          ✅ ITM +113% stop 120p | ✅ LDO filled | ✅ GOOGL $315 + BKR $58.50 live | ✅ ABVX P4 clean | ✅ SI-51 v2 live — POET qualified
        </div>
        <div style={{ marginTop: 4, padding: "6px 10px", background: "rgba(210,153,34,0.1)", border: "1px solid rgba(210,153,34,0.3)", borderRadius: 4, fontSize: 11, color: COLORS.yellow }}>
          ⚠️ CRML dilution — add cancelled | LRCX entry conditional Wed | IES.L LDES IMMINENT | POET entry on next pullback
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
              borderLeft: p.ticker === "ITM" ? `3px solid ${COLORS.green}` :
                          p.ticker === "LDO" ? `3px solid ${COLORS.blue}` :
                          p.status?.includes("EARNINGS") ? `3px solid ${COLORS.purple}` :
                          p.ticker === "IES" ? `3px solid ${COLORS.purple}` : undefined
            }}>
              <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap", marginBottom: 6 }}>
                <span style={{ fontWeight: 700, fontSize: 14, color: COLORS.textBright }}>{p.ticker}</span>
                <span style={{ fontSize: 11, color: COLORS.textDim }}>{p.name}</span>
                {p.cur && <span className="badge badge-grey">{p.cur}</span>}
                {p.ticker === "LDO" && <span className="badge badge-blue">NEW S26</span>}
                {p.ticker === "ITM" && <span className="badge badge-green">RHEINMETALL</span>}
                <span className={`badge ${p.unrealPnL > 50 ? "badge-green" : p.unrealPnL < -20 ? "badge-red" : "badge-amber"}`}>
                  {p.unrealPnL >= 0 ? "+" : ""}{p.unrealPct?.toFixed(1)}%
                </span>
                <span className="badge badge-grey">{p.status?.substring(0,40)}</span>
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
            <div key={i} className="card" style={{ borderLeft: `3px solid ${o.type === "MANUAL ALERT" ? COLORS.yellow : o.action === "BUY" ? COLORS.green : COLORS.red}` }}>
              <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap", marginBottom: 4 }}>
                <span style={{ fontWeight: 700 }}>{o.ticker}</span>
                <span className={`badge ${o.action === "BUY" ? "badge-green" : "badge-red"}`}>{o.action}</span>
                <span className={`badge ${o.type === "MANUAL ALERT" ? "badge-amber" : "badge-grey"}`}>{o.type}</span>
                <span style={{ fontSize: 11 }}>Qty: <b>{o.qty}</b></span>
                {o.limitPrice && <span style={{ fontSize: 11 }}>Limit: <b>{o.limitPrice}</b></span>}
                {o.stopPrice && <span style={{ fontSize: 11 }}>Stop: <b>{o.stopPrice}</b></span>}
                {o.alertPrice && <span style={{ fontSize: 11 }}>Alert: <b>{o.alertPrice}</b></span>}
                <span className={`badge ${o.status?.includes("ACTIVE") ? "badge-green" : o.status?.includes("MANUAL") ? "badge-amber" : "badge-grey"}`}>{o.status?.substring(0,40)}</span>
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
            <div key={w.ticker} className="card" style={{ borderLeft: w.ticker === "POET" ? `3px solid ${COLORS.purple}` : undefined }}>
              <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap", marginBottom: 4 }}>
                <span style={{ fontWeight: 700 }}>{w.ticker}</span>
                <span style={{ fontSize: 12, color: COLORS.textDim }}>{w.name}</span>
                {w.ticker === "POET" && <span className="badge badge-purple">SI-51 v2 QUALIFIED</span>}
                <span className={`badge ${w.status?.includes("ACTIVE") || w.status?.includes("QUALIFIED") ? "badge-green" : w.status?.includes("CONDITIONAL") || w.status?.includes("MONITOR") || w.status?.includes("STAGE") ? "badge-amber" : "badge-grey"}`}>{w.status?.substring(0,40)}</span>
              </div>
              {w.note && <div style={{ fontSize: 11, color: COLORS.textDim }}>{w.note}</div>}
            </div>
          ))}
          <div style={{ fontWeight: 600, color: COLORS.accent, fontSize: 12, marginTop: 8, marginBottom: 4 }}>EU / UK WATCHLIST</div>
          {data.watchlistEU?.map(w => (
            <div key={w.ticker} className="card" style={{ borderLeft: w.status?.includes("IN PORTFOLIO") ? `3px solid ${COLORS.green}` : undefined }}>
              <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap", marginBottom: 4 }}>
                <span style={{ fontWeight: 700 }}>{w.ticker}</span>
                <span style={{ fontSize: 12, color: COLORS.textDim }}>{w.name}</span>
                <span className="badge badge-grey">{w.exchange}</span>
                {w.status?.includes("IN PORTFOLIO") && <span className="badge badge-green">IN PORTFOLIO</span>}
              </div>
              {w.note && <div style={{ fontSize: 11, color: COLORS.textDim }}>{w.note}</div>}
            </div>
          ))}
        </div>
      )}

      {activeTab === "instructions" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {data.standingInstructions?.map(ins => (
            <div key={ins.id} className="card" style={{ display: "flex", gap: 12,
              borderLeft: ins.id === 51 ? `3px solid ${COLORS.purple}` :
                          ins.id === 52 ? `3px solid ${COLORS.green}` :
                          ins.id === 17 ? `3px solid ${COLORS.red}` :
                          ins.id === 48 ? `3px solid ${COLORS.blue}` : undefined }}>
              <div style={{ fontSize: 11, color: ins.id === 51 ? COLORS.purple : ins.id === 52 ? COLORS.green : ins.id === 17 ? COLORS.red : ins.id === 48 ? COLORS.blue : COLORS.accent, fontWeight: 700, minWidth: 28 }}>#{ins.id.toString().padStart(2,"0")}</div>
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
        <span style={{ fontSize: 10, color: COLORS.textDim }}>JOURNAL v38 FINAL // SESSION 26 // {data.fund.account} // NL $105.2K // 17 POSITIONS // SI-51 v2</span>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <span className="badge badge-red">ISRG 00:30</span>
          <span className="badge badge-red">AMZN + LRCX WED</span>
          <span className="badge badge-green">ITM 120p</span>
          <span className="badge badge-green">LDO FILLED</span>
          <span className="badge badge-purple">POET QUALIFIED</span>
          <span className="badge badge-amber">IES LDES IMMINENT</span>
          <span className="badge badge-amber">CRML WATCH $10</span>
        </div>
      </div>
    </div>
  );
}
