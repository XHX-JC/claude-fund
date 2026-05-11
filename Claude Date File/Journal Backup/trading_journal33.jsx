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
// ═══════════════════════════════════════════════════════════════════

const INITIAL_STATE = {
  "lastUpdated": "2026-04-19",
  "sessionNumber": 24,
  "fund": {
    "account": "U24936508",
    "netLiquidity": 105600,
    "cash": 28234,
    "availableFunds": 83700,
    "dailyPnL": 1880.36,
    "unrealizedPnL": 7804.35,
    "realizedPnL": 493.44,
    "broker": "IBKR Pro",
    "baseCurrency": "USD",
    "location": "UAE",
    "ibkrEuropeanAccess": "APPROVED — March 26 2026",
    "cashUSD": 33853,
    "cashEUR": -937,
    "cashGBP": -2120,
    "cashBase": 29885,
    "cashFloorRule": "10% of NL = $10,560 minimum. NEVER go below.",
    "lastUpdated": "2026-04-19 SESSION 24 CLOSE — JOURNAL v33 — SUNDAY REVIEW",
    "note": "JOURNAL v33 — SESSION 24 (Sunday 19 Apr 2026). KEY GEOPOLITICAL REVERSAL: Iran re-closed Hormuz Saturday Apr 18 after US refused to lift port blockade. IRGC declared strait 'returned to previous state.' WTI will spike Monday open — Friday $83.85 close will reverse. DECISIONS: NOG SELL (Market DAY) CANCELLED — Hormuz re-closure restores oil war premium thesis. NOG held 80 shares avg $24.37. NOG stop $22.50 also cancelled (S23) — MUST RESUBMIT $22.50 GTC STOP MONDAY OPEN BEFORE ANY OTHER ACTION. SLV BUY $70 CANCELLED — both SLV legs now fully cancelled. CANCELLATION CONFIRMATIONS: IBKR showing 'Pending' for cancel confirmations — will confirm at Monday market open Apr 20. SI-47 ADDED: Date Verification Protocol — system prompt date is authoritative, never override with session inference. I8 added to LESSONS_LEARNED. Ceasefire expiry: Tuesday Apr 21 (confirmed CNBC + multiple sources — not Monday). ISRG earnings Tuesday Apr 21 AMC. RR.L ex-div Wednesday Apr 23 HARD LOCK. CODA thesis further strengthened: Iran mine clearance ongoing regardless of political outcome — lost mines in strait cannot be recovered without USN support."
  },
  "thesis": {
    "title": "US NAVAL BLOCKADE OF IRANIAN PORTS ACTIVE — HORMUZ RE-CLOSED SAT APR 18 — SI-25 ELEVATED ALERT",
    "summary": "SUNDAY APR 19 UPDATE: HORMUZ RE-CLOSED. Iran opened Hormuz conditionally Friday Apr 17 (ceasefire-linked). Iran re-closed Saturday Apr 18 after US refused to lift port blockade. IRGC declared strait 'returned to previous state.' Ship tracking shows tankers turning back in Persian Gulf. WTI closed $83.85 Friday on opening news — will reverse Monday. Ceasefire expires Tuesday Apr 21. Second round US-Iran talks possible Monday. SI-25 status: oil condition exceeded (-24.9% from peak). Formal PERMANENT reopening: NOT met — re-closure confirms this was never a permanent opening. SI-25 NOT TRIGGERED. NOG thesis RESTORED — oil war premium back. SLV cancelled (both legs). NOG held.",
    "oilWTI": 83.85,
    "oilWTINote": "Friday close — pre re-closure. Expect spike Monday open on Hormuz re-closure news.",
    "oilBrent": 89.89,
    "goldPrice": 4760,
    "hormuzStatus": "SUNDAY APR 19: Hormuz RE-CLOSED. Iran opened Friday Apr 17 (ceasefire-linked). Iran re-closed Saturday Apr 18 — IRGC: strait 'returned to previous state.' US port blockade continues. Ship tracking: tankers turning back in Persian Gulf. WTI $83.85 Friday close — will spike Monday. Ceasefire expires Tuesday Apr 21. US refuses to lift port blockade until nuclear deal signed. Iran says open strait requires blockade removal. Impasse continues.",
    "ceasefireFilter": "SI-25 ELEVATED ALERT. Hormuz re-closed Saturday Apr 18. Ceasefire expiry Tuesday Apr 21. Oil condition exceeded (WTI $83.85 vs trigger $100.38 — -24.9% from $111.54 peak). BOTH conditions still required simultaneously for SI-25 trigger. Formal permanent reopening: NOT met — re-closure proves it was never permanent. SI-25 NOT TRIGGERED.",
    "blockadeStatus": "US CENTCOM naval blockade of Iranian PORTS continues. Iran re-closed Hormuz Saturday Apr 18 — IRGC 'previous state.' Tankers turning back in Gulf per MarineTraffic data. Iran lost track of mines — cannot fully open even if deal struck. USN mine clearance active (CODA catalyst confirmed multi-year). Second round talks possible Monday. Ceasefire expires Tuesday Apr 21.",
    "keyDates": [
      {"date": "19 Apr (TODAY — S24)", "event": "SUNDAY. No markets. NOG sell cancelled. SLV BUY cancelled. Hormuz re-closed confirmed. Journal v33 written.", "priority": "RESOLVED — SESSION 24 COMPLETE"},
      {"date": "20 Apr (Mon)", "event": "NYSE opens 13:30 UAE. PRIORITY 1: Resubmit NOG stop $22.50 GTC — position currently unprotected. Confirm NOG sell cancellation fill. Run SI-45 weekly screener. Section 0 SI-39. Monitor WTI open — will spike on re-closure news. Second round US-Iran talks possible.", "priority": "CRITICAL"},
      {"date": "21 Apr (Tue)", "event": "CEASEFIRE EXPIRY — confirmed Tuesday Apr 21 (CNBC + multiple sources). ISRG Q1 earnings AMC — stop $443.86, do NOT touch pre-earnings. Post-beat: raise stop to $455-460. RTX Q1 pre-market — watch only.", "priority": "CRITICAL"},
      {"date": "22 Apr (Wed)", "event": "BKR Q1 earnings — post-results entry zone $58.50. Watch only.", "priority": "HIGH"},
      {"date": "23 Apr (Wed)", "event": "RR.L EX-DIVIDEND — ABSOLUTE HARD LOCK. DO NOT SELL BEFORE THIS DATE FOR ANY REASON.", "priority": "CRITICAL"},
      {"date": "23 Apr (Wed) AMC", "event": "AMZN Q1 earnings — AWS growth rate, AI capex guidance. Stop $234.39/$224 Stop Limit live.", "priority": "CRITICAL"},
      {"date": "23 Apr (Wed)", "event": "SAP Q1 earnings — cloud backlog. DO NOT enter SAP before this date.", "priority": "HIGH"},
      {"date": "28 Apr (Mon) AMC", "event": "V Q2 earnings — BUY $307 limit still pending. Beat + volumes resilient → add 8 more shares Apr 29 open.", "priority": "CRITICAL"},
      {"date": "29 Apr (Tue) AMC", "event": "APH Q1 earnings — reassess entry post-results.", "priority": "HIGH"},
      {"date": "29 Apr (Tue) AMC", "event": "MSFT Q3 FY2026 earnings — Azure growth %, Copilot seats. Stop $400.43.", "priority": "CRITICAL"},
      {"date": "30 Apr (Wed)", "event": "NOG Q1 earnings — position held. Oil revenue at current WTI levels.", "priority": "HIGH"},
      {"date": "~May 2026", "event": "CGCT BUSINESS COMBINATION CLOSE → FAC LISTING. POST-LISTING RULES: (1) >$12 → SELL 50%. (2) $10-12 → HOLD stop $8.00. (3) <$10 → EXIT.", "priority": "CRITICAL"},
      {"date": "5 May", "event": "TLN Q1 earnings — key gate. SI-44 Stage 2 mandatory before entry.", "priority": "CRITICAL"},
      {"date": "5 May", "event": "LDO.MI Q1 earnings — catalyst for pending buy.", "priority": "HIGH"},
      {"date": "6 May", "event": "R3NK Q1 earnings — €200M deferred Q4 orders MUST appear.", "priority": "CRITICAL"},
      {"date": "7 May", "event": "AMPX Q1 earnings", "priority": "MEDIUM"},
      {"date": "11 May", "event": "PLTR Q1 earnings — Golden Dome + Maven POR. Reentry $120-130 on confirmed award.", "priority": "CRITICAL"},
      {"date": "13 May", "event": "VST + PDYN earnings", "priority": "MEDIUM"},
      {"date": "16 Jul", "event": "NFLX Q2 2026 earnings — Stage 1 candidate. Next catalyst gate.", "priority": "MONITOR"},
      {"date": "30 Jul", "event": "RR.L H1 earnings", "priority": "HIGH"},
      {"date": "18 Apr", "event": "SESSION 23 COMPLETE. LNG stopped -$396.54. ITM trimmed +£652. NOG filled. SLV cancelled. Journal v32.", "priority": "RESOLVED"},
      {"date": "17 Apr", "event": "SESSION 22 COMPLETE. CGCT entered. Stops raised. ITM trim executed.", "priority": "RESOLVED"}
    ]
  },
  "positions": [
    {
      "ticker": "NOG", "name": "Northern Oil and Gas Inc", "shares": 80,
      "avgPrice": 24.37, "costBasis": 1950, "last": 24.55, "marketVal": 1964,
      "unrealPnL": 14, "unrealPct": 0.7, "stop": null, "target": null,
      "status": "HOLD — NO STOP (MUST RESUBMIT $22.50 GTC MONDAY FIRST ACTION)",
      "note": "NOG sell (Market DAY) CANCELLED Sunday Apr 19 — Hormuz re-closure restores oil war premium thesis. Stop $22.50 was cancelled S23 (E9). CRITICAL: position currently has NO stop protection. MONDAY FIRST ACTION: resubmit SELL Stop $22.50 GTC before any analysis or other actions. Thesis: oil war premium restored — Hormuz re-closed Saturday Apr 18, ceasefire expires Tuesday Apr 21, WTI will spike at Monday open. Apr 30 Q1 earnings. Re-entry rationale now moot — position held."
    },
    {
      "ticker": "CGCT", "name": "Cartesian Growth Corp III (Factorial Energy SPAC)", "shares": 291,
      "avgPrice": 10.29, "costBasis": 2994, "last": 10.30, "marketVal": 2997,
      "unrealPnL": 3, "unrealPct": 0.0, "stop": null, "target": null,
      "status": "HOLD — NO STOP (TRUST FLOOR ~$10.27) — PRE-CLOSE SPAC",
      "note": "291 shares. Trust $10.27 floor. Deal close ~May 2026. POST-LISTING RULES: (1) >$12 → SELL 50%. (2) $10-12 → HOLD stop $8.00. (3) <$10 → EXIT. Tranche 2: $1,500 at $7.50-9.00 post-listing. Max exposure $4,500."
    },
    {
      "ticker": "CCJ", "name": "Cameco Corp", "shares": 49,
      "avgPrice": 104.021, "costBasis": 5097, "last": 120.50, "marketVal": 5912,
      "unrealPnL": 815, "unrealPct": 16.0, "stop": 108.37, "target": null,
      "status": "HOLD — STOP LIVE",
      "note": "Nuclear thesis structural. Stop $108.37 confirmed IBKR. Profit locked. Independent of Hormuz."
    },
    {
      "ticker": "AMZN", "name": "Amazon.com Inc", "shares": 30,
      "avgPrice": 201.204, "costBasis": 6036, "last": 250.74, "marketVal": 7522,
      "unrealPnL": 1486, "unrealPct": 24.6, "stop": 234.39, "stopType": "Stop Limit", "stopLimit": 224, "target": 300,
      "status": "HOLD — STOP LIMIT LIVE — EARNINGS WED APR 23 AMC",
      "note": "Stop $234.39/$224 Stop Limit GTC. Earnings Wednesday Apr 23 AMC. AWS growth rate primary watch. Stop locks ~$1,000 profit."
    },
    {
      "ticker": "VST", "name": "Vistra Corp", "shares": 53,
      "avgPrice": 150.569, "costBasis": 7980, "last": 164.00, "marketVal": 8692,
      "unrealPnL": 712, "unrealPct": 8.9, "stop": 151.5, "target": null,
      "status": "HOLD — STOP LIVE",
      "note": "Stop $151.50 above cost. Earnings May 13. AI data centre power thesis intact. Independent of Hormuz."
    },
    {
      "ticker": "RR", "name": "Rolls-Royce Holdings", "shares": 150,
      "avgPrice": 1182.9, "costBasis": 1774, "last": 1310.60, "marketVal": 1966,
      "unrealPnL": 192, "unrealPct": 10.8, "stop": 1150, "stopType": "Stop Limit", "stopLimit": 1130, "target": 1600,
      "status": "HARD LOCK — NO SELL BEFORE APR 23 EX-DIV — STOP LIMIT 1150p/1130p", "cur": "GBP",
      "note": "EX-DIV WEDNESDAY APR 23 — ABSOLUTE HARD LOCK. Stop Limit 1150p/1130p GTC confirmed IBKR S22. After Apr 23: review stop, consider tightening to 1250p/1230p. H1 earnings Jul 30."
    },
    {
      "ticker": "ITM", "name": "ITM Power PLC", "shares": 2000,
      "avgPrice": 65.1, "costBasis": 1302, "last": 131.50, "marketVal": 2630,
      "unrealPnL": 1328, "unrealPct": 102.0, "stop": 100, "stopType": "Stop Limit", "stopLimit": 98, "target": 150,
      "status": "HOLD — STOP LIMIT 100p/98p GTC", "cur": "GBP",
      "note": "2,000 shares post-S22 trim. Stop 100p/98p Stop Limit GTC confirmed IBKR. +102% unrealised. Green hydrogen thesis independent of Hormuz."
    },
    {
      "ticker": "AMPX", "name": "Amprius Technologies", "shares": 168,
      "avgPrice": 18.106, "costBasis": 3042, "last": 18.60, "marketVal": 3125,
      "unrealPnL": 83, "unrealPct": 2.7, "stop": 15.79, "target": 32,
      "status": "HOLD — STOP $15.79 GTC + LIMIT $32 GTC",
      "note": "Stop $15.79 IBKR confirmed S22. Limit $32 GTC active. Silicon anode battery/drone endurance thesis. Q1 earnings May 7."
    },
    {
      "ticker": "PDYN", "name": "Palladyne AI Corp", "shares": 250,
      "avgPrice": 6.595, "costBasis": 1649, "last": 6.68, "marketVal": 1670,
      "unrealPnL": 21, "unrealPct": 1.3, "stop": 5.75, "target": null,
      "status": "HOLD — STOP LIVE",
      "note": "Stop $5.75 GTC. May 13 earnings. No add until DoD contract news."
    },
    {
      "ticker": "CODA", "name": "Coda Octopus Group", "shares": 416,
      "avgPrice": 12.005, "costBasis": 4994, "last": 13.26, "marketVal": 5516,
      "unrealPnL": 522, "unrealPct": 10.5, "stop": 11.51, "target": 22,
      "status": "HOLD — STOP INTENTIONAL — MINE CLEARANCE THESIS CONFIRMED MULTI-YEAR",
      "note": "THESIS FURTHER STRENGTHENED S24: Iran re-closed Hormuz Saturday — mine clearance now confirmed multi-year programme regardless of political outcome. Iran lost track of mines in strait — cannot reopen without USN support. CODA MCM/sonar thesis independent of ceasefire result. Stop $11.51 intentional. Raise to $12.50 only when USN mine clearance contract publicly confirmed."
    },
    {
      "ticker": "ABVX", "name": "Abivax SA-ADR", "shares": 44,
      "avgPrice": 117.913, "costBasis": 5188, "last": 121.16, "marketVal": 5331,
      "unrealPnL": 143, "unrealPct": 2.8, "stop": 114.31, "target": null,
      "status": "HOLD — STOP $114.31 GTC (INTENTIONALLY BELOW COST — M&A OPTIONALITY)",
      "note": "Stop below cost $117.913 — intentional, max loss ~$158. No M&A news yet. Grandfathered above SI-37 cap."
    },
    {
      "ticker": "ISRG", "name": "Intuitive Surgical Inc", "shares": 22,
      "avgPrice": 459.25, "costBasis": 10104, "last": 470.55, "marketVal": 10352,
      "unrealPnL": 248, "unrealPct": 2.2, "stop": 443.86, "target": 510,
      "status": "HOLD — STOP $443.86 GTC — EARNINGS TUE APR 21 AMC — DO NOT TOUCH STOP",
      "note": "Stop $443.86 confirmed IBKR. Earnings Tuesday Apr 21 AMC. Do NOT tighten stop before earnings. Post-beat: raise stop to $455-460. Watch: China placements, gross margin vs 67-68%, procedure volume."
    },
    {
      "ticker": "MSFT", "name": "Microsoft Corp", "shares": 25,
      "avgPrice": 372.73, "costBasis": 9318, "last": 422.34, "marketVal": 10559,
      "unrealPnL": 1241, "unrealPct": 13.3, "stop": 400.43, "target": 430,
      "status": "HOLD — STOP $400.43 GTC — EARNINGS APR 29 AMC",
      "note": "Stop $400.43 IBKR confirmed S22. Earnings Apr 29 AMC. Azure + Copilot thesis intact."
    },
    {
      "ticker": "R3NK", "name": "RENK Group AG", "shares": 25,
      "avgPrice": 52.15, "costBasis": 1304, "last": 54.68, "marketVal": 1367,
      "unrealPnL": 63, "unrealPct": 4.8, "stop": 48, "stopType": "Stop Limit", "stopLimit": 47, "target": 76,
      "status": "HOLD — STOP LIMIT €48/€47 GTC", "cur": "EUR",
      "note": "Avg €52.15 (IBKR confirmed). Q1 earnings May 6 — €200M deferred Q4 orders must appear."
    },
    {
      "ticker": "LLY", "name": "Eli Lilly and Company", "shares": 3,
      "avgPrice": 905.01, "costBasis": 2715, "last": 926.07, "marketVal": 2778,
      "unrealPnL": 63, "unrealPct": 2.3, "stop": 850, "target": 1028,
      "status": "HOLD — STOP $850 GTC — SI-39 POSITION",
      "note": "SI-39 TRIGGERED S21. GLP-1 thesis intact. Stop $850 GTC. Tranche 2: 1 share $862 limit if pulls back. Independent of Hormuz."
    },
    {
      "ticker": "CRML", "name": "Critical Metals Corp", "shares": 110,
      "avgPrice": 9.07, "costBasis": 999, "last": 12.54, "marketVal": 1379,
      "unrealPnL": 380, "unrealPct": 38.0, "stop": 8.34, "target": 15,
      "status": "HOLD — STOP $8.34 GTC",
      "note": "THESIS: US critical minerals strategic gap vs China — structural supply chain weakness, state-level strategic push. Confirmed INDEPENDENT of Hormuz/Iran conflict. Tanbreez Greenland 92.5% ownership. US EXIM interest up to $620M. Add order $10.50 GTC active for 40 shares on pullback."
    }
  ],
  "pendingOrders": [
    {"ticker": "NOG", "action": "SELL", "type": "Stop", "qty": 80, "stopPrice": 22.50, "tif": "GTC", "status": "MUST RESUBMIT MONDAY — POSITION CURRENTLY UNPROTECTED",
     "note": "Stop cancelled S23 (E9 prevention for market sell). Market sell then cancelled S24. MONDAY FIRST ACTION: resubmit $22.50 GTC stop before any other action. Max loss $166 on 80 shares."},
    {"ticker": "V", "action": "BUY", "type": "Limit", "qty": 8, "limitPrice": 307, "stopPrice": null, "tif": "GTC", "status": "ACTIVE",
     "note": "SI-39 TRIGGERED. Earnings Apr 28 AMC. Bracket stop $285 live."},
    {"ticker": "V", "action": "SELL", "type": "Stop", "qty": 8, "stopPrice": 285, "tif": "GTC", "status": "ACTIVE",
     "note": "Max loss $176."},
    {"ticker": "LLY", "action": "SELL", "type": "Stop", "qty": 3, "stopPrice": 850, "tif": "GTC", "status": "ACTIVE",
     "note": "SI-39 tranche 1. Max loss $165."},
    {"ticker": "CCJ", "action": "SELL", "type": "Stop", "qty": 49, "stopPrice": 108.37, "tif": "GTC", "status": "ACTIVE",
     "note": "Above cost — profit locked."},
    {"ticker": "PDYN", "action": "SELL", "type": "Stop", "qty": 250, "stopPrice": 5.75, "tif": "GTC", "status": "ACTIVE",
     "note": "250 shares remaining."},
    {"ticker": "AMPX", "action": "SELL", "type": "Stop", "qty": 168, "stopPrice": 15.79, "tif": "GTC", "status": "ACTIVE — RAISED S22",
     "note": "Stop raised $13.00→$14.30→$15.79."},
    {"ticker": "AMPX", "action": "SELL", "type": "Limit", "qty": 168, "limitPrice": 32, "tif": "GTC", "status": "ACTIVE",
     "note": "Profit target."},
    {"ticker": "VST", "action": "SELL", "type": "Stop", "qty": 53, "stopPrice": 151.5, "tif": "GTC", "status": "ACTIVE",
     "note": "Above cost — profit locked."},
    {"ticker": "AMZN", "action": "SELL", "type": "Stop Limit", "qty": 30, "limitPrice": 224, "stopPrice": 234.39, "tif": "GTC", "status": "ACTIVE",
     "note": "Locks ~$1,000 profit. Earnings Wed Apr 23 AMC."},
    {"ticker": "ABVX", "action": "SELL", "type": "Stop", "qty": 44, "stopPrice": 114.31, "tif": "GTC", "status": "ACTIVE — BELOW COST INTENTIONAL",
     "note": "Max loss ~$158."},
    {"ticker": "ISRG", "action": "SELL", "type": "Stop", "qty": 22, "stopPrice": 443.86, "tif": "GTC", "status": "ACTIVE — DO NOT TOUCH PRE-EARNINGS TUE APR 21",
     "note": "Earnings Tuesday Apr 21 AMC."},
    {"ticker": "MSFT", "action": "SELL", "type": "Stop", "qty": 25, "stopPrice": 400.43, "tif": "GTC", "status": "ACTIVE",
     "note": "Earnings Apr 29 AMC."},
    {"ticker": "CODA", "action": "SELL", "type": "Stop", "qty": 416, "stopPrice": 11.51, "tif": "GTC", "status": "ACTIVE — INTENTIONAL",
     "note": "Do not raise until USN mine clearance contract confirmed."},
    {"ticker": "RR", "action": "SELL", "type": "Stop Limit", "qty": 150, "stopPrice": 1150, "limitPrice": 1130, "tif": "GTC", "status": "ACTIVE — HARD LOCK UNTIL APR 23",
     "note": "DO NOT CANCEL OR MOVE before Wednesday Apr 23 ex-div."},
    {"ticker": "R3NK", "action": "SELL", "type": "Stop Limit", "qty": 25, "limitPrice": 47, "stopPrice": 48, "tif": "GTC", "status": "ACTIVE",
     "note": "€48/€47 IBIS confirmed."},
    {"ticker": "ITM", "action": "SELL", "type": "Stop Limit", "qty": 2000, "limitPrice": 98, "stopPrice": 100, "tif": "GTC", "status": "ACTIVE — 2,000 SHARES",
     "note": "100p/98p Stop Limit GTC confirmed S22."},
    {"ticker": "LDO", "action": "BUY", "type": "Limit", "qty": 35, "limitPrice": 56, "tif": "GTC", "status": "PENDING",
     "note": "LDO.MI BVME. May 5 earnings. Stop €50/€49 on fill."},
    {"ticker": "MP", "action": "BUY", "type": "Limit", "qty": 75, "limitPrice": 55, "tif": "GTC", "status": "ACTIVE",
     "note": "Critical minerals anchor. Pentagon 10-year magnet offtake."},
    {"ticker": "MP", "action": "SELL", "type": "Stop", "qty": 75, "stopPrice": 50, "tif": "GTC", "status": "ACTIVE",
     "note": "Bracket stop. Max loss $375."},
    {"ticker": "CRML", "action": "BUY", "type": "Limit", "qty": 40, "limitPrice": 10.50, "tif": "GTC", "status": "ACTIVE",
     "note": "Pullback buy. On fill: raise CRML stop to $10.00 for all 150 shares."},
    {"ticker": "CRML", "action": "SELL", "type": "Stop", "qty": 110, "stopPrice": 8.34, "tif": "GTC", "status": "ACTIVE",
     "note": "Raise to $10.00 for all 150 shares when 40-share buy fills."}
  ],
  "si39TierOneWatchlist": {
    "lastBatchPull": "2026-04-19",
    "tool": "EOD:get_us_live_extended_quotes",
    "batchSymbols": ["NVDA.US","META.US","GOOGL.US","AAPL.US","V.US","LLY.US","TSM.US","COST.US","ASML.US"],
    "note": "Run at EVERY session open — Section 0 BEFORE A-K. SI-45 weekly screener mandatory first session of each week.",
    "names": [
      {"ticker": "V", "52wkHigh": 375.51, "52wkLow": 293.89, "price": 315.72, "drawdown": -16.0, "trigger": -15, "triggerPrice": 319.18, "status": "TRIGGERED — BUY $307 GTC active. Earnings Apr 28 AMC."},
      {"ticker": "LLY", "52wkHigh": 1133.95, "52wkLow": 623.78, "price": 927.03, "drawdown": -18.2, "trigger": -20, "triggerPrice": 907.16, "status": "POSITION OPEN — 3 shares $905.01 stop $850."},
      {"ticker": "META", "52wkHigh": 796.25, "52wkLow": 479.80, "price": 671.13, "drawdown": -15.7, "trigger": -20, "triggerPrice": 637.00, "status": "MONITOR — alert at $637"},
      {"ticker": "AAPL", "52wkHigh": 288.62, "52wkLow": 189.81, "price": 266.13, "drawdown": -7.8, "trigger": -15, "triggerPrice": 245.33, "status": "MONITOR"},
      {"ticker": "GOOGL", "52wkHigh": 349.00, "52wkLow": 146.10, "price": 336.40, "drawdown": -3.6, "trigger": -18, "triggerPrice": 286.18, "status": "MONITOR"},
      {"ticker": "NVDA", "52wkHigh": 212.19, "52wkLow": 95.04, "price": 198.33, "drawdown": -6.5, "trigger": -25, "triggerPrice": 159.14, "status": "MONITOR"},
      {"ticker": "TSM", "52wkHigh": 390.21, "52wkLow": 145.84, "price": 376.62, "drawdown": -3.5, "trigger": -20, "triggerPrice": 312.17, "status": "MONITOR"},
      {"ticker": "COST", "52wkHigh": 1067.08, "52wkLow": 844.06, "price": 983.85, "drawdown": -7.8, "trigger": -15, "triggerPrice": 906.52, "status": "MONITOR"},
      {"ticker": "ASML", "52wkHigh": 1547.22, "52wkLow": 614.06, "price": 1476.59, "drawdown": -4.6, "trigger": -20, "triggerPrice": 1237.78, "status": "NOT DRAWDOWN PLAY"}
    ]
  },
  "priceVerificationProtocol": {
    "title": "MANDATORY BEFORE ANY PRICE-BASED RECOMMENDATION — SI-1 + SI-40 + SI-44",
    "currentPriceUS": "MMD /v2/aggs/ticker/{TICKER}/prev — use field 'c'. Primary source.",
    "52wkRangeUS": "EOD:get_us_live_extended_quotes — fiftyTwoWeekHigh/Low. ONLY authorised source.",
    "currentPriceEUUK": "Yahoo Finance web_fetch or web_search.",
    "52wkRangeEUUK": "web_fetch https://finance.yahoo.com/quote/{TICKER}/",
    "memoryForbidden": "MEMORY ESTIMATES FOR ANY PRICE DATA ARE FORBIDDEN.",
    "s24Notes": {
      "wti": "WTI $83.85 Friday Apr 17 close. Hormuz re-closed Saturday Apr 18. WTI will spike Monday open — Friday price is stale.",
      "nflx": "NFLX $97.31. Stage 1 only — SI-41 fail (next earnings Jul 16).",
      "hormuz": "RE-CLOSED Saturday Apr 18. Not permanent reopening. SI-25 not triggered.",
      "nog": "NOG held. NO STOP. Monday first action: resubmit $22.50 GTC stop."
    }
  },
  "cDriveProtocol": {
    "confirmed": "2026-04-19 SESSION 24",
    "readAccess": true,
    "writeAccess": true,
    "tools": ["filesystem:read_text_file", "filesystem:write_file", "filesystem:edit_file", "filesystem:list_directory", "filesystem:list_allowed_directories"],
    "allowedPaths": ["C:\\Users\\jcadb\\claude-fund", "C:\\Users\\jcadb\\Claude Date File"],
    "sessionOpenReads": [
      "C:\\Users\\jcadb\\claude-fund\\state\\FUND_SESSION_STATE.md",
      "C:\\Users\\jcadb\\claude-fund\\state\\LESSONS_LEARNED.md"
    ]
  },
  "standingInstructions": [
    {"id": 1, "title": "FULL SCAN PROTOCOL — SI-14 v4.0", "body": "SECTION 0 (SI-39): EOD batch 9 Tier 1 names. Drawdown check. BEFORE A-K.\nSECTION A: Position health table — IBKR screenshots = ground truth.\nSECTION B: Individual thesis review.\nSECTION C: Pending orders review.\nSECTION D: Stop analysis.\nSECTION E: SI-39 drawdown scanner.\nSECTION F: SI-45 weekly broad screener (first session of week — MANDATORY).\nSECTION G: Geopolitical thesis (Hormuz/ceasefire).\nSECTION H: Thesis integrity.\nSECTION I: Macro update (WTI, rates, USD).\nSECTION J: Upcoming catalysts.\nSECTION K: Sector threat monitor + AI news check (T5 — non-negotiable)."},
    {"id": 2, "title": "IBKR SCREENSHOTS — GROUND TRUTH", "body": "IBKR screenshot overrides ALL other sources. Check before every scan. Error E2 if not done."},
    {"id": 3, "title": "POSITION SIZING — SI-35", "body": "Max loss per trade: $500. SI-37 speculative cap: $1,500 (AMPX $3,042 grandfathered, CODA $4,994 grandfathered)."},
    {"id": 4, "title": "TIMEZONE", "body": "UAE = UTC+4. NYSE open 13:30 UAE, close 00:00 UAE next day. LSE open 12:00 UAE, close 20:30 UAE. IBIS open 10:00 UAE, close 18:30 UAE."},
    {"id": 14, "title": "FULL SCAN = SI-14 SECTIONS 0 + A-K (v4.0)", "body": "Section 0 runs FIRST. Section F (SI-45) mandatory first session of each week. All 12 sections required for complete scan."},
    {"id": 17, "title": "ERROR TAXONOMY — 14 TYPES", "body": "E1: Timezone. E2: Stale position. E3: Fill re-flag. E4: Price verification. E5: Market timing. E6: Dividend capture. E7: Session discipline. E8: Stale quote. E9: GTC orphan. E10: Closed position scan. E11: 52wk hallucination. E12: Tool routing gap. E13: EODHD price delay. E14: Journal date discrepancy (key event dates — verify 2+ primary sources)."},
    {"id": 19, "title": "STOPPED OUT / CLOSED POSITIONS — SI-19", "body": "ONDS: Loss ~$601. KTOS: Loss ~$1,601. CCL: Profit +$122. UEC: Loss ~$127. IAG.L: Profit ~£326. RCL: Loss ~$132. LDO.MI (first tranche): Profit +€21.52. LEU: Loss ~$238. PLTR: Loss -$1,307. PDYN partial: Profit +$17.42. AVAV: 25 shares sold S20 @ $197.945. Profit +$71.38. ITM TRIM S22: 1,100 shares @ 124.60p. Profit +£652. LNG: 19 shares, entry $268.76, exit $248.00, loss -$396.54 (S23). PATK: 25 shares, entry $108.80, exit $109.256, profit +$9.34 (S23 — P17 error). NOG: market sell cancelled S24 — position held."},
    {"id": 20, "title": "BTC POSITION — ENTRY RULES", "body": "BTC target $55K. IBKR Paxos spot. 5-7.5% NAV. No order placed."},
    {"id": 21, "title": "ITM POWER — ENTRY RULES", "body": "ENTERED S08 @ 64.8-65p. TRIMMED S22: 1,100 shares sold @ 124.60p +£652. Now 2,000 shares. Stop 100p/98p GTC. Target 1: 130p. Target 2: 160p."},
    {"id": 24, "title": "CASH FLOOR — 10% RULE", "body": "Floor = 10% of NL. At $105,600 NL, floor = $10,560. Never go below."},
    {"id": 25, "title": "SI-25 EXIT TRIGGER — OIL BASED NOT CEASEFIRE BASED", "body": "EXIT TRIGGER: Formal PERMANENT Hormuz reopening CONFIRMED + WTI -10% from peak. BOTH simultaneously.\nCurrent WTI peak: $111.54. Trigger: $100.38. Current WTI: $83.85 (Friday close — stale, will spike Monday).\nFormal permanent reopening: NOT MET — Iran re-closed Hormuz Saturday Apr 18. US port blockade continues.\nSI-25 NOT TRIGGERED. ALERT POSTURE ELEVATED. Ceasefire expiry: Tuesday Apr 21 (CONFIRMED — CNBC + multiple sources)."},
    {"id": 26, "title": "SECTOR THREAT MONITOR — SECTION K", "body": "SECTOR 1: DEFENCE [RR] — ITA canary.\nSECTOR 2: NUCLEAR [CCJ] — URA canary.\nSECTOR 3: AI/CLOUD [MSFT, AMZN, PDYN] — AI model news MANDATORY.\nSECTOR 4: MEDICAL ROBOTICS [ISRG] — IHI canary.\nSECTOR 5: BIOTECH [ABVX] — XBI canary.\nSECTOR 6: BATTERY/DRONE [AMPX].\nSECTOR 7: MARITIME [CODA] — MINE CLEARANCE CONFIRMED MULTI-YEAR.\nSECTOR 8: POWER [VST] — XLU canary.\nSECTOR 9: EU HYDROGEN [ITM].\nSECTOR 10: CRITICAL MINERALS [CRML, MP watchlist] — US vs China supply chain."},
    {"id": 34, "title": "TRADE TRACKER UPDATE PROTOCOL", "body": "FILE: Claude_Fund_Trade_Tracker.xlsx — C:\\Users\\jcadb\\claude-fund\\tracker\\\nPENDING ROWS TO ADD:\n1. AVAV: 25 shares, entry $195.09, exit $197.945, +$71.38 (S20)\n2. ITM TRIM: 1,100 shares, entry 65.1p, exit 124.60p, +£652 (S22)\n3. LNG: 19 shares, entry $268.76, exit $248.00, -$396.54 (S23)\n4. PATK: 25 shares, entry $108.80, exit $109.256, +$9.34 (S23 — P17)\n5. NOG: exit cancelled S24 — position held"},
    {"id": 35, "title": "DOLLAR-RISK SIZING — SI-35", "body": "Max loss per trade: $500. Stop%: (entry-stop)/entry."},
    {"id": 36, "title": "MINIMUM 2:1 R:R FILTER", "body": "Min R:R to enter: 2.0:1. Exemption: tactical binary <$2,000 at 1.5:1 min."},
    {"id": 37, "title": "SPECULATIVE CAP — $1,500 MAX", "body": "Hard cap $1,500. AMPX $3,042 grandfathered. CODA $4,994 grandfathered. PDYN $1,649 within cap. CRML ~$999 within cap."},
    {"id": 39, "title": "SI-39: UNDERVALUED US LARGE CAP SCANNER — SECTION 0", "body": "TIER 1 TRIGGERS: NVDA -25%→$159.14 | META -20%→$637 | GOOGL -18%→$286.18 | AAPL -15%→$245.33 | V -15%→$319.18 [TRIGGERED] | LLY -20%→$907.16 [TRIGGERED S21 — position open] | TSM -20%→$312.17 | COST -15%→$906.52 | ASML -20%→$1,237.78. Max per position: $4,000. Max aggregate: 20% NAV."},
    {"id": 40, "title": "52-WEEK DATA PROTOCOL", "body": "US 52wk: EOD:get_us_live_extended_quotes only. EU/UK: Yahoo Finance. Memory forbidden."},
    {"id": 41, "title": "CATALYST-ANCHORED ENTRY REQUIREMENT", "body": "Before entry: (A) Earnings within 8 weeks OR (B) Contract award within 8 weeks OR (C) Technical confirmation OR (D) Structural value below sector median. Barred: within 5% of 52wk high no catalyst. Re-entry within 30 days of stop-out without new catalyst."},
    {"id": 42, "title": "SI-42: BROKEN THESIS EXIT DISCIPLINE", "body": "When PRIMARY thesis driver impaired by confirmed new datapoint + position within 5% of breakeven → EXIT at market on next open. Cancel GTC stops immediately (E9). Does not apply to macro drawdowns on intact thesis."},
    {"id": 43, "title": "CASH DEPLOYMENT TRIGGERS", "body": "Cash ~$28,234. Floor $10,560. Deployable ~$17,674.\nA: Islamabad fails + Hormuz closed 5+ days → ACTIVE.\nB: Price in entry zone + catalyst within 8 weeks.\nC: Stop-out → redeploy 80% within 48hrs.\nD: BTC ≤ $55,000 → 5-7.5% NAV."},
    {"id": 44, "title": "SI-44: TWO-STAGE RESEARCH PROTOCOL", "body": "STAGE 1 = scan candidate only. All specific figures UNVERIFIED until Stage 2.\nSTAGE 2 = mandatory before capital: read earnings, confirm dates from IR, live consensus, regulatory check, valuation metric, 50/200-day MA, SI-35/36/41 confirmed.\nHARD RULE: No scan-phase figure may appear in a recommendation without primary source verification."},
    {"id": 45, "title": "SI-45: WEEKLY BROAD US MARKET SCREENER", "body": "Run EVERY first session of trading week. EOD:stock_screener. Criteria: US market, cap ≥$5B, price ≤80% of 52wk high, avg volume >500K. Output: raw candidate list only → Stage 1 SI-44. S23: NFLX caught post-hoc — SI-45 must run Monday before markets open. Non-negotiable."},
    {"id": 46, "title": "P17 — PATK M&A TIP ENTRY ERROR", "body": "No entry on any M&A play until: (1) target fully analysed, (2) deal terms/probability/R:R logged, (3) joint entry decision confirmed. A tip is not a thesis."},
    {"id": 47, "title": "SI-47: DATE VERIFICATION PROTOCOL — STEP ZERO (NEW S24)", "body": "ORIGIN: S24 error — stated 'cancel before 13:30 UAE today' on a Sunday when markets were closed. Root cause: date inferred from session context instead of verified from authoritative source.\n\nSTEP ZERO — before any analysis, prices, or action items:\nSTATE EXPLICITLY: 'Today is [WEEKDAY] [FULL DATE]. UAE = UTC+4. NYSE opens [DATE] at 13:30 UAE. LSE opens [DATE] at 12:00 UAE.'\n\nRULES:\n1. SYSTEM PROMPT DATE IS AUTHORITATIVE. Never override with session number inference, IBKR screenshot inference, or conversation context.\n2. All action items must include the explicit calendar date — never just a time.\n3. If system prompt date and context conflict, FLAG THE DISCREPANCY before proceeding. Do not silently resolve it.\n4. Never use 'today,' 'tomorrow,' 'this morning' in action items without anchoring to a specific verified date.\n5. Earnings dates, ex-div dates, ceasefire expiries — all stated as explicit calendar dates, verified against 2+ sources before any recommendation.\n6. DAY orders, pre-market actions, and time-critical cancellations must state: the action, the date, and the time in UAE — all three together.\n\nCORRECT: 'Cancel NOG sell before Monday April 20, 13:30 UAE (NYSE open).'\nINCORRECT: 'Cancel before markets open today.' (no date anchor)"}
  ],
  "watchlistUS": [
    {
      "ticker": "NFLX", "name": "Netflix Inc", "exchange": "NASDAQ",
      "status": "STAGE 1 CANDIDATE — DO NOT ENTER — SI-41 FAIL",
      "currentPrice": 97.31, "52wkHigh": 134.12, "52wkLow": 75.01, "drawdown": -27.4,
      "note": "Flagged S23 via SI-45. Q1 EPS $1.23 beat, revenue slight miss, Q2 guidance soft, Hastings exit. -27.4% from 52wk high. SI-41 FAIL: next earnings Jul 16 — outside 8-week window. PE 42x on decelerating growth. Stage 2 required before any consideration."
    },
    {
      "ticker": "V", "name": "Visa Inc", "exchange": "NYSE",
      "status": "ACTIVE — BUY LIMIT $307 GTC — SI-39 TRIGGERED",
      "currentPrice": 315.72, "52wkHigh": 375.51, "drawdown": -16.0,
      "entry": "$307 GTC", "stop": 285, "target": 399,
      "note": "SI-39 TRIGGERED. Earnings Apr 28 AMC. Tranche 2 on beat: add 8 shares Apr 29 open."
    },
    {
      "ticker": "LLY", "name": "Eli Lilly and Company", "exchange": "NYSE",
      "status": "POSITION OPEN — 3 shares $905.01 stop $850",
      "currentPrice": 927.03, "52wkHigh": 1133.95, "drawdown": -18.2,
      "note": "SI-39. GLP-1 thesis intact. Tranche 2: 1 share $862 limit."
    },
    {
      "ticker": "NOG", "name": "Northern Oil & Gas", "exchange": "NYSE",
      "status": "HELD — SELL CANCELLED S24 — HORMUZ RE-CLOSED",
      "currentPrice": 24.55,
      "note": "Market sell cancelled Sunday Apr 19. Hormuz re-closed Saturday Apr 18 — oil war premium thesis restored. NO STOP — resubmit $22.50 GTC Monday Apr 20 first action. Apr 30 Q1 earnings."
    },
    {
      "ticker": "SLV", "name": "iShares Silver Trust", "exchange": "NYSE",
      "status": "FULLY CANCELLED — BOTH LEGS REMOVED",
      "note": "BUY $70 cancelled Sunday Apr 19. SELL stop $63 cancelled S23. War premium thesis removed. Watch for independent silver thesis at lower entry."
    },
    {
      "ticker": "TLN", "name": "Talen Energy Corp", "exchange": "NASDAQ",
      "status": "WATCH — SI-44 STAGE 2 REQUIRED — POST MAY 5 EARNINGS",
      "currentPrice": 353.30, "52wkHigh": 451.28, "drawdown": -21.7,
      "note": "Nuclear + Amazon PPA 1,920 MW. PJM market power objection. May 5 earnings = gate."
    },
    {
      "ticker": "CEG", "name": "Constellation Energy Corp", "exchange": "NASDAQ",
      "status": "WATCH — SI-44 STAGE 2 REQUIRED",
      "currentPrice": 295.18, "52wkHigh": 412.70, "drawdown": -28.5,
      "note": "Pure-play US nuclear. Meta + Microsoft PPAs. Stage 2 required."
    },
    {
      "ticker": "OXY", "name": "Occidental Petroleum", "exchange": "NYSE",
      "status": "WATCH — REASSESS POST WTI STABILISATION",
      "note": "Hormuz re-closed — oil thesis partially restored. Reassess Monday after WTI open."
    },
    {
      "ticker": "BKR", "name": "Baker Hughes", "exchange": "NYSE",
      "status": "WATCH — EARNINGS WED APR 22 — POST-RESULTS ONLY",
      "note": "Earnings Wednesday Apr 22. Post-earnings entry zone $58.50."
    },
    {
      "ticker": "RTX", "name": "RTX Corporation", "exchange": "NYSE",
      "status": "WATCH ONLY — Re-entry $185-190 on peace deal selloff",
      "note": "Earnings Tuesday Apr 21. Watch only. T12: never enter at ATH."
    },
    {
      "ticker": "KTOS", "name": "Kratos Defense", "exchange": "NASDAQ",
      "status": "WATCH — REENTRY $62-67",
      "note": "Golden Dome contracts. Entry only on dip to $62-67."
    },
    {
      "ticker": "BTC", "name": "Bitcoin — IBKR Paxos spot", "exchange": "IBKR",
      "status": "WATCH — $55K target", "currentPrice": 70700,
      "note": "5-7.5% NAV via IBKR Paxos. Entry $55K. No order placed."
    }
  ],
  "watchlistEU": [
    {"ticker": "LDO.MI", "name": "Leonardo SpA", "exchange": "BVME", "cur": "EUR", "current": 56.00, "note": "BUY LIMIT €56 GTC active. May 5 earnings. Stop €50/€49 on fill."},
    {"ticker": "R3NK", "name": "RENK Group AG", "exchange": "IBIS", "cur": "EUR", "current": 54.68, "note": "IN PORTFOLIO. Q1 May 6."},
    {"ticker": "ITM.L", "name": "ITM Power PLC", "exchange": "LSE", "cur": "GBP", "current": 131.50, "note": "IN PORTFOLIO. 2,000 shares. Stop 100p/98p."},
    {"ticker": "RR.L", "name": "Rolls-Royce Holdings", "exchange": "LSE", "cur": "GBP", "current": 1310.60, "note": "IN PORTFOLIO. HARD LOCK until Wednesday Apr 23 ex-div."},
    {"ticker": "CWR.L", "name": "Ceres Power", "exchange": "LSE", "cur": "GBP", "note": "Entry 250-270p only."},
    {"ticker": "ALFEN.AS", "name": "Alfen NV", "exchange": "AMS", "cur": "EUR", "note": "May 12 earnings."}
  ],
  "sessionNotes": [
    {"date": "2026-04-18", "note": "SESSION 23 — Saturday. LNG stopped -$396.54. NOG filled $24.37. ITM trim +£652. SLV cancelled. NFLX Stage 1. Journal v32."},
    {"date": "2026-04-19", "note": "SESSION 24 — Sunday. HORMUZ RE-CLOSED Saturday Apr 18 by IRGC. NOG sell (DAY market) cancelled — thesis restored. SLV BUY $70 cancelled (both legs now gone). SI-47 date protocol added. IBKR cancellation confirmations pending — will show at Monday Apr 20 market open. NOG has NO stop — first action Monday Apr 20 is resubmit $22.50 GTC. Ceasefire expiry confirmed Tuesday Apr 21."}
  ]
};

// ─── REACT COMPONENT (unchanged) ────────────────────────
const COLORS = {
  bg: "#0d1117", card: "#161b22", border: "#30363d", accent: "#58a6ff",
  green: "#3fb950", red: "#f85149", yellow: "#d29922", blue: "#388bfd",
  text: "#c9d1d9", textDim: "#8b949e", textBright: "#f0f6fc"
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

  const tabs = ["positions","orders","thesis","instructions","watchlist","notes"];
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
        .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
        .grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px; }
        input { background: ${COLORS.card}; border: 1px solid ${COLORS.border}; color: ${COLORS.text}; padding: 8px; border-radius: 4px; font-family: monospace; font-size: 12px; flex: 1; }
        @media (max-width: 600px) { .grid-2, .grid-3 { grid-template-columns: 1fr; } }
      `}</style>

      <div style={{ marginBottom: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8 }}>
          <div>
            <div style={{ fontSize: 18, fontWeight: 700, color: COLORS.textBright }}>CLAUDE FUND — JOURNAL v33</div>
            <div style={{ fontSize: 11, color: COLORS.textDim, marginTop: 2 }}>Session {data.sessionNumber} | {data.fund.account} | {data.lastUpdated}</div>
          </div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {[
              { label: "NET LIQ", val: `$${(data.fund.netLiquidity/1000).toFixed(1)}K` },
              { label: "UNREAL P&L", val: `$${(data.fund.unrealizedPnL/1000).toFixed(1)}K`, color: pnlColor(data.fund.unrealizedPnL) },
              { label: "REAL P&L", val: `$${data.fund.realizedPnL.toFixed(0)}`, color: pnlColor(data.fund.realizedPnL) },
              { label: "WTI", val: `$${data.thesis.oilWTI}*`, color: COLORS.yellow }
            ].map(m => (
              <div key={m.label} className="card" style={{ textAlign: "center", minWidth: 80 }}>
                <div style={{ fontSize: 9, color: COLORS.textDim }}>{m.label}</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: m.color || COLORS.textBright, marginTop: 2 }}>{m.val}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ marginTop: 6, padding: "6px 10px", background: "rgba(248,81,73,0.1)", border: "1px solid rgba(248,81,73,0.3)", borderRadius: 4, fontSize: 11, color: COLORS.red }}>
          ⚠️ NOG: NO STOP ACTIVE — RESUBMIT $22.50 GTC MONDAY APR 20 BEFORE 13:30 UAE (NYSE OPEN) — FIRST ACTION
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
            <div key={p.ticker} className="card" style={{ borderLeft: p.ticker === "NOG" ? `3px solid ${COLORS.red}` : undefined }}>
              <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap", marginBottom: 6 }}>
                <span style={{ fontWeight: 700, fontSize: 14, color: COLORS.textBright }}>{p.ticker}</span>
                <span style={{ fontSize: 11, color: COLORS.textDim }}>{p.name}</span>
                {p.cur && <span className="badge badge-grey">{p.cur}</span>}
                <span className={`badge ${p.unrealPnL > 50 ? "badge-green" : p.unrealPnL < -50 ? "badge-red" : "badge-amber"}`}>
                  {p.unrealPnL >= 0 ? "+" : ""}{p.unrealPct?.toFixed(1)}%
                </span>
                <span className={`badge ${p.status?.includes("NO STOP") ? "badge-red" : p.status?.includes("HARD LOCK") ? "badge-amber" : "badge-grey"}`}>{p.status?.substring(0,40)}</span>
              </div>
              <div style={{ display: "flex", gap: 16, flexWrap: "wrap", fontSize: 11, marginBottom: 6 }}>
                <span>Shares: <b>{p.shares}</b></span>
                <span>Avg: <b>{p.avgPrice}</b></span>
                <span>Last: <b>{p.last}</b></span>
                <span>P&L: <b style={{ color: pnlColor(p.unrealPnL) }}>{p.unrealPnL >= 0 ? "+" : ""}{p.unrealPnL?.toFixed(0)}</b></span>
                {p.stop && <span>Stop: <b style={{ color: COLORS.yellow }}>{p.stop}{p.stopType === "Stop Limit" ? `/${p.stopLimit}` : ""}</b></span>}
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
            <div key={i} className="card" style={{ borderLeft: `3px solid ${o.status?.includes("MUST RESUBMIT") ? COLORS.red : o.action === "BUY" ? COLORS.green : COLORS.red}` }}>
              <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap", marginBottom: 4 }}>
                <span style={{ fontWeight: 700 }}>{o.ticker}</span>
                <span className={`badge ${o.action === "BUY" ? "badge-green" : "badge-red"}`}>{o.action}</span>
                <span className="badge badge-grey">{o.type}</span>
                <span style={{ fontSize: 11 }}>Qty: <b>{o.qty}</b></span>
                {o.limitPrice && <span style={{ fontSize: 11 }}>Limit: <b>{o.limitPrice}</b></span>}
                {o.stopPrice && <span style={{ fontSize: 11 }}>Stop: <b>{o.stopPrice}</b></span>}
                <span className="badge badge-grey">{o.tif}</span>
                <span className={`badge ${o.status?.includes("MUST RESUBMIT") ? "badge-red" : o.status?.includes("ACTIVE") ? "badge-green" : "badge-grey"}`}>{o.status?.substring(0,35)}</span>
              </div>
              <div style={{ fontSize: 10, color: COLORS.textDim }}>{o.note}</div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "watchlist" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ fontWeight: 600, color: COLORS.accent, fontSize: 12, marginBottom: 4 }}>US WATCHLIST</div>
          {data.watchlistUS?.map((w) => (
            <div key={w.ticker} className="card">
              <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap", marginBottom: 6 }}>
                <span style={{ fontWeight: 700 }}>{w.ticker}</span>
                <span style={{ fontSize: 12, color: COLORS.textDim }}>{w.name}</span>
                <span className={`badge ${w.status?.includes("CANCELLED") ? "badge-red" : w.status?.includes("ACTIVE") || w.status?.includes("OPEN") || w.status?.includes("HELD") ? "badge-green" : w.status?.includes("STAGE") ? "badge-amber" : "badge-grey"}`}>{w.status?.substring(0,40)}</span>
              </div>
              <div style={{ fontSize: 11, color: COLORS.textDim }}>{w.note}</div>
            </div>
          ))}
          <div style={{ fontWeight: 600, color: COLORS.accent, fontSize: 12, marginTop: 8, marginBottom: 4 }}>EU / UK WATCHLIST</div>
          {data.watchlistEU?.map(w => (
            <div key={w.ticker} className="card">
              <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap", marginBottom: 4 }}>
                <span style={{ fontWeight: 700 }}>{w.ticker}</span>
                <span style={{ fontSize: 12, color: COLORS.textDim }}>{w.name}</span>
                <span className="badge badge-grey">{w.exchange}</span>
                {w.current && <span style={{ fontSize: 12 }}>{w.current} {w.cur}</span>}
              </div>
              <div style={{ fontSize: 11, color: COLORS.textDim }}>{w.note}</div>
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
          <div className="grid-2" style={{ marginBottom: 12 }}>
            <div className="card" style={{ borderColor: "rgba(248,81,73,0.4)" }}>
              <div style={{ fontSize: 10, color: COLORS.red }}>HORMUZ STATUS — RE-CLOSED SAT APR 18</div>
              <div style={{ marginTop: 6, fontSize: 12, color: COLORS.red, lineHeight: 1.6 }}>{data.thesis.hormuzStatus}</div>
            </div>
            <div className="card" style={{ background: "rgba(210,153,34,0.05)", borderColor: "rgba(210,153,34,0.3)" }}>
              <div style={{ fontSize: 10, color: COLORS.yellow }}>SI-25 — ELEVATED ALERT — NOT TRIGGERED</div>
              <div style={{ marginTop: 6, fontSize: 11, color: COLORS.yellow, lineHeight: 1.6 }}>{data.thesis.ceasefireFilter}</div>
            </div>
          </div>
          <div className="grid-3" style={{ marginBottom: 12 }}>
            {[{label:"WTI (Fri close)",val:`$${data.thesis.oilWTI}*`,color:COLORS.red,note:"*will spike Mon"},{label:"BRENT",val:`$${data.thesis.oilBrent}`},{label:"GOLD",val:`$${data.thesis.goldPrice}/oz`}].map(m => (
              <div key={m.label} className="card">
                <div style={{ fontSize: 10, color: COLORS.textDim }}>{m.label}</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: m.color || COLORS.textBright, marginTop: 4 }}>{m.val}</div>
                {m.note && <div style={{ fontSize: 9, color: COLORS.red, marginTop: 2 }}>{m.note}</div>}
              </div>
            ))}
          </div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: COLORS.accent, marginBottom: 8 }}>KEY DATES</div>
            {data.thesis.keyDates?.filter(d => d.priority === "CRITICAL" || d.priority === "HIGH").map((d, i) => (
              <div key={i} className="card" style={{ marginBottom: 6, borderLeft: `3px solid ${d.priority === "CRITICAL" ? COLORS.red : COLORS.yellow}` }}>
                <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <span style={{ fontSize: 11, fontWeight: 600, minWidth: 100, color: COLORS.textBright }}>{d.date}</span>
                  <span style={{ fontSize: 11, color: COLORS.textDim, flex: 1 }}>{d.event}</span>
                  <span className={`badge ${d.priority === "CRITICAL" ? "badge-red" : "badge-amber"}`}>{d.priority}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "instructions" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {data.standingInstructions?.map(ins => (
            <div key={ins.id} className="card" style={{ display: "flex", gap: 12, borderLeft: ins.id === 47 ? `3px solid ${COLORS.red}` : ins.id === 44 ? `3px solid ${COLORS.blue}` : ins.id === 25 ? `3px solid ${COLORS.red}` : undefined }}>
              <div style={{ fontSize: 11, color: ins.id === 47 ? COLORS.red : ins.id >= 44 ? COLORS.blue : COLORS.accent, fontWeight: 700, minWidth: 28 }}>#{ins.id.toString().padStart(2,"0")}</div>
              <div>
                <div style={{ fontWeight: 600, color: ins.id === 47 ? COLORS.red : ins.id >= 44 ? COLORS.blue : COLORS.textBright, marginBottom: 4, fontSize: 12 }}>{ins.title}</div>
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
          {(data.sessionNotes || []).map((n, i) => (
            <div key={i} className="card" style={{ marginBottom: 8 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ fontSize: 10, color: COLORS.textDim }}>{n.date}</span>
                <button className="btn" style={{ padding: "2px 8px", fontSize: 10, background: "rgba(239,68,68,0.15)", color: "#ef4444", border: "1px solid rgba(239,68,68,0.3)" }} onClick={() => update({ ...data, sessionNotes: data.sessionNotes.filter((_,j) => j !== i) })}>DELETE</button>
              </div>
              <div style={{ fontSize: 12, color: COLORS.text, lineHeight: 1.7 }}>{n.note}</div>
            </div>
          ))}
        </div>
      )}

      <div style={{ marginTop: 24, paddingTop: 12, borderTop: `1px solid ${COLORS.border}`, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <span style={{ fontSize: 10, color: COLORS.textDim }}>JOURNAL v33 // SESSION 24 // {data.fund.account} // C DRIVE WRITE CONFIRMED</span>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <span className="badge badge-amber">EU ACCESS: APPROVED</span>
          <span className="badge badge-red">CONFLICT: ACTIVE</span>
          <span className="badge badge-red">HORMUZ: RE-CLOSED SAT APR 18</span>
          <span className="badge badge-amber">SI-25: ELEVATED ALERT</span>
          <span className="badge badge-red">NOG: NO STOP — RESUBMIT MON APR 20</span>
          <span className="badge badge-blue">SI-47 DATE PROTOCOL ACTIVE</span>
        </div>
      </div>
    </div>
  );
}
