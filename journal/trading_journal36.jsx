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
  "lastUpdated": "2026-04-20 SESSION 25 — STAGE 2 AI THESIS COMPLETE — SI-50 TWICE-WEEKLY SCAN ADDED",
  "sessionNumber": 25,
  "fund": {
    "account": "U24936508",
    "netLiquidity": 105600,
    "cash": 28234,
    "availableFunds": 83700,
    "dailyPnL": 0,
    "unrealizedPnL": 7395,
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
    "deployableCash": 17674,
    "deployableCashNote": "cashBase $29,885 minus floor $10,560 minus FX deficit ~$1,651 = ~$17,674",
    "lastUpdated": "2026-04-20 SESSION 25 — JOURNAL v36 — SI-50 TWICE-WEEKLY SCAN. STAGE 2 AI THESIS COMPLETE. MU CONFIRMED PENDING SI-41. HPE PASS. SNPS MONITOR MAY. NOG STOP RESUBMITTED.",
    "note": "JOURNAL v36 — SESSION 25 (Monday 20 Apr 2026). NOG stop $22.50 GTC resubmitted Order ID 133934373. NOG sell + SLV buy both confirmed Cancelled. STAGE 2 AI THESIS COMPLETE: MU confirmed (entry after May 17, $440-445 limit, stop $420); HPE pass (analyst target = current price); SNPS monitor mid-May; CRDO conditional $140-145; OXY conditional WTI $90+. SI-50 twice-weekly scan added. Iran rejected second round of talks Sunday Apr 19. Ceasefire expires TOMORROW Apr 21. WTI bouncing from $83.85 toward $86-93."
  },
  "thesis": {
    "title": "US NAVAL BLOCKADE ACTIVE — HORMUZ RE-CLOSED APR 18 — IRAN REJECTED TALKS APR 19 — CEASEFIRE EXPIRES TOMORROW APR 21",
    "summary": "MONDAY APR 20 UPDATE: Hormuz remains closed. Iran rejected second round of US-Iran talks Sunday Apr 19, citing 'excessive demands and ongoing naval blockade as breach of ceasefire.' Iran also confirmed it is rebuilding weapons stockpiles during ceasefire. Two tankers attacked Saturday near the strait. Ceasefire expires TOMORROW Tuesday Apr 21. WTI bouncing from Friday's $83.85 close toward $86-93 range on Hormuz re-closure news. SI-25 NOT TRIGGERED. NOG thesis intact and strengthening. Conflict dragging — Iran position is structural, not near-term resolved. Fund AI thesis stage 2 complete — MU confirmed as priority entry when SI-41 window opens after May 17.",
    "oilWTI": 86.25,
    "oilWTINote": "Monday open bounce from $83.85 Friday close. Hormuz re-closure + Iran rejected talks driving reversal. Polymarket 78% probability WTI UP today. Range seen $86-93.",
    "oilBrent": 90.5,
    "goldPrice": 4832,
    "hormuzStatus": "CLOSED. Re-closed Saturday Apr 18 after US refused to lift port blockade. Iran rejected second round of talks Sunday Apr 19. Two tankers attacked Saturday. IRGC said any vessel approaching strait 'will be targeted.' Ceasefire expires tomorrow Apr 21.",
    "ceasefireFilter": "SI-25 ELEVATED ALERT. Ceasefire expires TOMORROW Apr 21. Iran rejected second round of talks. WTI $86-93 range (vs SI-25 oil trigger $100.38 — still -17% from $111.54 peak). SI-25 NOT TRIGGERED. Monitor ceasefire expiry closely — binary event.",
    "blockadeStatus": "US CENTCOM naval blockade of Iranian ports continues. Iran blockading Hormuz. Two vessels attacked Saturday. Mine clearance multi-year (CODA). Iran rebuilding weapon stockpiles during ceasefire. Iran conflict expected to drag per fund assessment.",
    "keyDates": [
      {"date": "TODAY Mon Apr 20", "event": "Monitor WTI at 13:30 UAE open. Confirm holds above $85. Monitor ceasefire expiry news build-up.", "priority": "HIGH"},
      {"date": "TOMORROW Tue Apr 21", "event": "CEASEFIRE EXPIRY — confirmed Tuesday Apr 21. Binary event. ISRG Q1 earnings AMC — stop $443.86, do NOT touch. RTX Q1 pre-market — watch only.", "priority": "CRITICAL"},
      {"date": "Wed Apr 23", "event": "RR.L EX-DIVIDEND — ABSOLUTE HARD LOCK. AMZN Q1 earnings AMC — AWS growth + AI capex.", "priority": "CRITICAL"},
      {"date": "Mon Apr 28 AMC", "event": "V Q2 earnings — BUY $307 limit still pending. Beat + volumes resilient → add 8 shares Apr 29 open.", "priority": "CRITICAL"},
      {"date": "Tue Apr 29 AMC", "event": "MSFT Q3 FY2026 earnings — Azure growth %, Copilot seats. Stop $400.43.", "priority": "CRITICAL"},
      {"date": "Wed Apr 30", "event": "NOG Q1 earnings — position held. Schneider Electric (SU.PA) — AI thesis catalyst.", "priority": "HIGH"},
      {"date": "May 5", "event": "TLN Q1 earnings — key gate. LDO.MI Q1 earnings.", "priority": "CRITICAL"},
      {"date": "May 6", "event": "R3NK Q1 earnings — €200M deferred Q4 orders MUST appear.", "priority": "CRITICAL"},
      {"date": "Mid-May", "event": "SNPS Q2 FY26 earnings — operating margin recovery above 20% = entry signal. Watch carefully.", "priority": "CRITICAL"},
      {"date": "After May 17", "event": "MU SI-41 WINDOW OPENS — place $440-445 buy limit, stop $420, 14 shares (~$6,200). July 1 earnings now within 8 weeks.", "priority": "CRITICAL"},
      {"date": "May 11", "event": "PLTR Q1 earnings — Golden Dome + Maven POR. Reentry $120-130 on confirmed award.", "priority": "CRITICAL"},
      {"date": "Jul 1", "event": "MU Q3 FY2026 earnings AMC — AI thesis Tier 1 primary catalyst gate.", "priority": "HIGH"},
      {"date": "~May 2026", "event": "CGCT BUSINESS COMBINATION CLOSE → FAC LISTING. POST-LISTING RULES: (1) >$12 → SELL 50%. (2) $10-12 → HOLD stop $8.00. (3) <$10 → EXIT.", "priority": "CRITICAL"}
    ]
  },
  "positions": [
    {"ticker": "NOG", "name": "Northern Oil and Gas Inc", "shares": 80, "avgPrice": 24.37, "costBasis": 1950, "last": 25.00, "marketVal": 2000, "unrealPnL": 50, "unrealPct": 2.6, "stop": 22.50, "target": null, "status": "HOLD — STOP $22.50 GTC RESUBMITTED S25 (Order ID 133934373)", "note": "Stop confirmed submitted Mon Apr 20. Apr 30 Q1 earnings at WTI war-premium levels. WTI bouncing on Hormuz re-closure."},
    {"ticker": "CGCT", "name": "Cartesian Growth Corp III (Factorial Energy SPAC)", "shares": 291, "avgPrice": 10.29, "costBasis": 2994, "last": 10.30, "marketVal": 2997, "unrealPnL": 3, "unrealPct": 0.0, "stop": null, "target": null, "status": "HOLD — NO STOP (TRUST FLOOR ~$10.27) — PRE-CLOSE SPAC", "note": "Trust $10.27 floor. Deal close ~May 2026."},
    {"ticker": "CCJ", "name": "Cameco Corp", "shares": 49, "avgPrice": 104.021, "costBasis": 5097, "last": 120.66, "marketVal": 5912, "unrealPnL": 815, "unrealPct": 16.0, "stop": 108.37, "target": null, "status": "HOLD — STOP LIVE", "note": "Nuclear thesis structural. Independent of Hormuz."},
    {"ticker": "AMZN", "name": "Amazon.com Inc", "shares": 30, "avgPrice": 201.204, "costBasis": 6036, "last": 248.90, "marketVal": 7467, "unrealPnL": 1431, "unrealPct": 23.7, "stop": 234.39, "stopType": "Stop Limit", "stopLimit": 224, "target": 300, "status": "HOLD — STOP LIMIT LIVE — EARNINGS WED APR 23 AMC", "note": "Stop $234.39/$224 Stop Limit GTC. Earnings Wednesday Apr 23 AMC."},
    {"ticker": "VST", "name": "Vistra Corp", "shares": 53, "avgPrice": 150.569, "costBasis": 7980, "last": 162.51, "marketVal": 8613, "unrealPnL": 633, "unrealPct": 7.9, "stop": 151.5, "target": null, "status": "HOLD — STOP LIVE", "note": "Stop $151.50. Earnings May 13. AI data centre power thesis."},
    {"ticker": "RR", "name": "Rolls-Royce Holdings", "shares": 150, "avgPrice": 1182.9, "costBasis": 1774, "last": 1310.60, "marketVal": 1966, "unrealPnL": 192, "unrealPct": 10.8, "stop": 1150, "stopType": "Stop Limit", "stopLimit": 1130, "target": 1600, "status": "HARD LOCK — NO SELL BEFORE APR 23 EX-DIV", "cur": "GBP", "note": "EX-DIV WEDNESDAY APR 23 — ABSOLUTE HARD LOCK."},
    {"ticker": "ITM", "name": "ITM Power PLC", "shares": 2000, "avgPrice": 65.1, "costBasis": 1302, "last": 131.50, "marketVal": 2630, "unrealPnL": 1328, "unrealPct": 102.0, "stop": 100, "stopType": "Stop Limit", "stopLimit": 98, "target": 150, "status": "HOLD — STOP LIMIT 100p/98p GTC", "cur": "GBP", "note": "2,000 shares post-S22 trim. +102% unrealised."},
    {"ticker": "AMPX", "name": "Amprius Technologies", "shares": 168, "avgPrice": 18.106, "costBasis": 3042, "last": 18.39, "marketVal": 3090, "unrealPnL": 48, "unrealPct": 1.6, "stop": 15.79, "target": 32, "status": "HOLD — STOP $15.79 GTC + LIMIT $32 GTC", "note": "Silicon anode battery/drone endurance. Q1 earnings May 7."},
    {"ticker": "PDYN", "name": "Palladyne AI Corp", "shares": 250, "avgPrice": 6.595, "costBasis": 1649, "last": 6.56, "marketVal": 1640, "unrealPnL": -9, "unrealPct": -0.5, "stop": 5.75, "target": null, "status": "HOLD — STOP LIVE", "note": "May 13 earnings. No add until DoD contract news."},
    {"ticker": "CODA", "name": "Coda Octopus Group", "shares": 416, "avgPrice": 12.005, "costBasis": 4994, "last": 13.27, "marketVal": 5520, "unrealPnL": 526, "unrealPct": 10.5, "stop": 11.51, "target": 22, "status": "HOLD — STOP INTENTIONAL — MINE CLEARANCE MULTI-YEAR", "note": "Iran attacking tankers Saturday. Mine clearance programme confirmed multi-year."},
    {"ticker": "ABVX", "name": "Abivax SA-ADR", "shares": 44, "avgPrice": 117.913, "costBasis": 5188, "last": 120.16, "marketVal": 5287, "unrealPnL": 99, "unrealPct": 1.9, "stop": 114.31, "target": null, "status": "HOLD — STOP $114.31 GTC (INTENTIONALLY BELOW COST — M&A OPTIONALITY)", "note": "Max loss ~$158 intentional. Grandfathered above SI-37 cap."},
    {"ticker": "ISRG", "name": "Intuitive Surgical Inc", "shares": 22, "avgPrice": 459.25, "costBasis": 10104, "last": 465.00, "marketVal": 10230, "unrealPnL": 193, "unrealPct": 1.9, "stop": 443.86, "target": 510, "status": "HOLD — STOP $443.86 GTC — EARNINGS TOMORROW TUE APR 21 AMC — DO NOT TOUCH STOP", "note": "Earnings Tuesday Apr 21 AMC (1:30 PM PDT = 00:30 UAE Wed). Post-beat: raise stop $455-460."},
    {"ticker": "MSFT", "name": "Microsoft Corp", "shares": 25, "avgPrice": 372.73, "costBasis": 9318, "last": 418.50, "marketVal": 10463, "unrealPnL": 1145, "unrealPct": 12.3, "stop": 400.43, "target": 430, "status": "HOLD — STOP $400.43 GTC — EARNINGS APR 29 AMC", "note": "Azure + Copilot thesis intact. Premarket -1.01% noise."},
    {"ticker": "R3NK", "name": "RENK Group AG", "shares": 25, "avgPrice": 52.15, "costBasis": 1304, "last": 55.01, "marketVal": 1375, "unrealPnL": 71, "unrealPct": 5.2, "stop": 48, "stopType": "Stop Limit", "stopLimit": 47, "target": 76, "status": "HOLD — STOP LIMIT €48/€47 GTC", "cur": "EUR", "note": "Q1 earnings May 6. €200M deferred Q4 orders must appear."},
    {"ticker": "LLY", "name": "Eli Lilly and Company", "shares": 3, "avgPrice": 905.01, "costBasis": 2715, "last": 922.43, "marketVal": 2767, "unrealPnL": 52, "unrealPct": 1.9, "stop": 850, "target": 1028, "status": "HOLD — STOP $850 GTC — SI-39 POSITION", "note": "GLP-1 thesis intact. Independent of Hormuz."},
    {"ticker": "CRML", "name": "Critical Metals Corp", "shares": 110, "avgPrice": 9.07, "costBasis": 999, "last": 12.31, "marketVal": 1354, "unrealPnL": 355, "unrealPct": 35.6, "stop": 8.34, "target": 15, "status": "HOLD — STOP $8.34 GTC", "note": "US critical minerals vs China thesis. Add order $10.50 GTC active 40 shares."}
  ],
  "pendingOrders": [
    {"ticker": "NOG", "action": "SELL", "type": "Stop", "qty": 80, "stopPrice": 22.50, "tif": "GTC", "status": "SUBMITTED — Order ID 133934373 (resubmitted S25 Mon Apr 20)", "note": "Confirmed submitted Mon Apr 20 before 13:30 UAE. Auto-cancels 2026-09-30."},
    {"ticker": "V", "action": "BUY", "type": "Limit", "qty": 8, "limitPrice": 307, "tif": "GTC", "status": "ACTIVE", "note": "SI-39 TRIGGERED. Earnings Apr 28 AMC. Bracket stop $285 live."},
    {"ticker": "V", "action": "SELL", "type": "Stop", "qty": 8, "stopPrice": 285, "tif": "GTC", "status": "ACTIVE"},
    {"ticker": "LLY", "action": "SELL", "type": "Stop", "qty": 3, "stopPrice": 850, "tif": "GTC", "status": "ACTIVE"},
    {"ticker": "CCJ", "action": "SELL", "type": "Stop", "qty": 49, "stopPrice": 108.37, "tif": "GTC", "status": "ACTIVE"},
    {"ticker": "PDYN", "action": "SELL", "type": "Stop", "qty": 250, "stopPrice": 5.75, "tif": "GTC", "status": "ACTIVE"},
    {"ticker": "AMPX", "action": "SELL", "type": "Stop", "qty": 168, "stopPrice": 15.79, "tif": "GTC", "status": "ACTIVE"},
    {"ticker": "AMPX", "action": "SELL", "type": "Limit", "qty": 168, "limitPrice": 32, "tif": "GTC", "status": "ACTIVE"},
    {"ticker": "VST", "action": "SELL", "type": "Stop", "qty": 53, "stopPrice": 151.5, "tif": "GTC", "status": "ACTIVE"},
    {"ticker": "AMZN", "action": "SELL", "type": "Stop Limit", "qty": 30, "limitPrice": 224, "stopPrice": 234.39, "tif": "GTC", "status": "ACTIVE — EARNINGS WED APR 23 AMC"},
    {"ticker": "ABVX", "action": "SELL", "type": "Stop", "qty": 44, "stopPrice": 114.31, "tif": "GTC", "status": "ACTIVE — BELOW COST INTENTIONAL"},
    {"ticker": "ISRG", "action": "SELL", "type": "Stop", "qty": 22, "stopPrice": 443.86, "tif": "GTC", "status": "ACTIVE — EARNINGS TOMORROW TUE APR 21 AMC — DO NOT TOUCH"},
    {"ticker": "MSFT", "action": "SELL", "type": "Stop", "qty": 25, "stopPrice": 400.43, "tif": "GTC", "status": "ACTIVE"},
    {"ticker": "CODA", "action": "SELL", "type": "Stop", "qty": 416, "stopPrice": 11.51, "tif": "GTC", "status": "ACTIVE — INTENTIONAL"},
    {"ticker": "RR", "action": "SELL", "type": "Stop Limit", "qty": 150, "stopPrice": 1150, "limitPrice": 1130, "tif": "GTC", "status": "ACTIVE — HARD LOCK UNTIL APR 23"},
    {"ticker": "R3NK", "action": "SELL", "type": "Stop Limit", "qty": 25, "limitPrice": 47, "stopPrice": 48, "tif": "GTC", "status": "ACTIVE"},
    {"ticker": "ITM", "action": "SELL", "type": "Stop Limit", "qty": 2000, "limitPrice": 98, "stopPrice": 100, "tif": "GTC", "status": "ACTIVE — 2,000 SHARES"},
    {"ticker": "LDO", "action": "BUY", "type": "Limit", "qty": 35, "limitPrice": 56, "tif": "GTC", "status": "PENDING — EARNINGS MAY 5"},
    {"ticker": "MP", "action": "BUY", "type": "Limit", "qty": 75, "limitPrice": 55, "tif": "GTC", "status": "ACTIVE"},
    {"ticker": "MP", "action": "SELL", "type": "Stop", "qty": 75, "stopPrice": 50, "tif": "GTC", "status": "ACTIVE"},
    {"ticker": "CRML", "action": "BUY", "type": "Limit", "qty": 40, "limitPrice": 10.50, "tif": "GTC", "status": "ACTIVE"},
    {"ticker": "CRML", "action": "SELL", "type": "Stop", "qty": 110, "stopPrice": 8.34, "tif": "GTC", "status": "ACTIVE"}
  ],
  "si39TierOneWatchlist": {
    "lastBatchPull": "2026-04-20",
    "tool": "EOD:get_us_live_extended_quotes",
    "batchSymbols": ["NVDA.US","META.US","GOOGL.US","AAPL.US","V.US","LLY.US","TSM.US","COST.US","ASML.US"],
    "note": "Run at EVERY session open — Section 0 BEFORE A-K. SI-45 weekly screener mandatory first session of each week (full). SI-50 Thursday brief re-check added S25.",
    "names": [
      {"ticker": "V", "52wkHigh": 375.51, "price": 316.64, "drawdown": -15.7, "trigger": -15, "triggerPrice": 319.18, "status": "TRIGGERED — BUY $307 GTC active. Earnings Apr 28 AMC."},
      {"ticker": "LLY", "52wkHigh": 1133.95, "price": 926.01, "drawdown": -18.3, "trigger": -20, "triggerPrice": 907.16, "status": "POSITION OPEN — 3 shares $905.01 stop $850."},
      {"ticker": "META", "52wkHigh": 796.25, "price": 688.50, "drawdown": -13.6, "trigger": -20, "triggerPrice": 637.00, "status": "MONITOR"},
      {"ticker": "AAPL", "52wkHigh": 288.62, "price": 270.34, "drawdown": -6.3, "trigger": -15, "triggerPrice": 245.33, "status": "MONITOR"},
      {"ticker": "GOOGL", "52wkHigh": 349.00, "price": 341.30, "drawdown": -2.2, "trigger": -18, "triggerPrice": 286.18, "status": "MONITOR"},
      {"ticker": "NVDA", "52wkHigh": 212.19, "price": 201.30, "drawdown": -5.1, "trigger": -25, "triggerPrice": 159.14, "status": "MONITOR"},
      {"ticker": "TSM", "52wkHigh": 390.21, "price": 370.62, "drawdown": -5.0, "trigger": -20, "triggerPrice": 312.17, "status": "MONITOR"},
      {"ticker": "COST", "52wkHigh": 1067.08, "price": 998.38, "drawdown": -6.4, "trigger": -15, "triggerPrice": 906.52, "status": "MONITOR"},
      {"ticker": "ASML", "52wkHigh": 1547.22, "price": null, "drawdown": null, "trigger": -20, "triggerPrice": 1237.78, "status": "NOT DRAWDOWN PLAY — IBKR EU only"}
    ]
  },
  "si39TierTwoAIThesisWatchlist": {
    "addedSession": 24,
    "lastPull": "2026-04-20 (S25 Stage 2 complete)",
    "researchFile": "C:\\Users\\jcadb\\claude-fund\\research\\AI_INFRASTRUCTURE_THESIS.md",
    "note": "AI infrastructure thesis Tier 2 watchlist. Governed by SI-48 (ATH rule amendment) + SI-49 (data routing) + SI-50 (twice-weekly scan). Stage 2 completed S25 for MU, HPE, SNPS. Stage 2 partial for CRDO.",
    "tier1Priorities": [
      {"ticker": "MU", "name": "Micron Technology", "priority": 1, "price": 454.20, "52wkHigh": 471.34, "drawdown": -3.6, "fwdPE": 7.84, "pegRatio": 0.265, "trigger": -15, "triggerPrice": 400.64, "analystTarget": 533.73, "analystBuys": 38, "analystHolds": 5, "analystSells": 0, "thesisOneLine": "HBM supercycle — Q2 FY26 EPS $12.20 vs $9.31 estimate (+31% beat). Five consecutive beats avg +20%. FY26 EPS estimate $57.95. PEG 0.265.", "nextEarnings": "2026-07-01 AMC", "si48Status": "ALL FOUR TESTS PASSED — primary source confirmed", "stage2Status": "CONFIRMED BUY. 5yr SCA signed with hyperscaler (primary source: Q2 FY26 earnings call). HBM4 volume production began for NVIDIA Vera Rubin. CEO: supply tightness extends beyond 2026. 30% dividend increase. Zero analyst downward EPS revisions in 30 days (26 upward). Entry $440-445 limit, stop $420, 14 shares (~$6,200). WAIT: SI-41 window opens after May 17 (July 1 earnings then within 8 weeks).", "stage2OpenQuestions": "LTA price/volume flex vs take-or-pay now ANSWERED — five-year SCA confirmed with specific commitments.", "status": "STAGE 2 COMPLETE — CONFIRMED. Entry $440-445 after May 17. Stop $420."},
      {"ticker": "HPE", "name": "Hewlett Packard Enterprise", "priority": 2, "price": 26.44, "52wkHigh": 26.44, "drawdown": 0.0, "fwdPE": 10.98, "pegRatio": 0.851, "trigger": "SI-48 or -10%", "analystTarget": 26.43, "analystBuys": 9, "analystHolds": 12, "analystSells": 0, "thesisOneLine": "At ATH, fwd PE 10.74, Juniper acquired, $5B AI backlog — but analyst target = current price.", "nextEarnings": "Early June 2026 Q2 FY26", "si48Status": "FAILS — Test 3: No upside modelled at current price", "stage2Status": "PASS — DO NOT ENTER AT CURRENT LEVELS. Analyst target $26.43 vs current $26.44 = zero upside. Trailing EPS -$0.17 (negative). Quarterly earnings -30.3% YoY. 12 holds vs 9 buys — tepid conviction. Stage 2 killed the Stage 1 thesis at this price. Re-evaluate if HPE pulls back to $22-23 (50-day/200-day MA zone ~$22.76-22.86).", "status": "STAGE 2 COMPLETE — PASS. Re-evaluate at $22-23."},
      {"ticker": "SNPS", "name": "Synopsys", "priority": 3, "price": 449.00, "52wkHigh": 651.73, "drawdown": -31.1, "fwdPE": 30.58, "pegRatio": 2.965, "trigger": "Already triggered — at -31%", "analystTarget": 535.68, "analystBuys": 19, "analystHolds": 5, "analystSells": 1, "thesisOneLine": "EDA duopoly (31% market share), 82% gross margins, Ansys integration, China export shock selloff.", "nextEarnings": "Mid-May 2026 Q2 FY26", "si48Status": "N/A — standard SI-39 trigger satisfied at -31%", "stage2Status": "MONITOR — wait for mid-May Q2 FY26 earnings to confirm Ansys integration charges are normalising. Key trigger: operating margin recovering above 20% (current 13.3%). If confirmed, entry at market post-results. Stop ~$410. Target $535 (+19%). 82% gross margin = structural moat. PEG 2.965 is elevated — need earnings proof before entry. China revenue ~16% risk partially priced. Do NOT enter before May earnings.", "status": "STAGE 2 COMPLETE — MONITOR. Entry trigger: mid-May Q2 FY26 margin recovery."}
    ],
    "tier2Priorities": [
      {"ticker": "CRDO", "name": "Credo Technology", "priority": 4, "price": 159.70, "52wkHigh": 213.80, "drawdown": -25.3, "fwdPE": 32.79, "beta": 2.72, "50dayMA": 115.92, "200dayMA": 132.69, "analystTarget": 207.53, "analystBuys": 15, "analystHolds": 1, "analystSells": 0, "thesisOneLine": "AEC pioneer — revenue +201% YoY, earnings +412% YoY, operating margin 36.8%, gross margin 68%.", "criticalRisk": "Beta 2.72. 50-day MA $115.92 — current price 38% above 50-day. Customer concentration: top 10 = 90% of revenue.", "stage2Status": "CONDITIONAL — growth confirmed (primary source). DO NOT enter at $159.70 — 38% above 50-day MA on beta-2.72 stock without catalyst. Wait pullback to $140-145 (near 200-day MA $132.69 + margin). SI-37 speculative cap $1,500 max. Check Thursday SI-45 for pullback.", "status": "STAGE 2 PARTIAL — CONDITIONAL. Wait $140-145. SI-37 cap."},
      {"ticker": "ENR.DE", "name": "Siemens Energy", "priority": 5, "price": "~€157.50", "52wkHigh": "TBD", "fwdPE": "TBD", "thesisOneLine": "EU grid/turbine at ~60% discount to GE Vernova P/E; AI-linked demand replacing wind", "status": "STAGE 1 ONLY — EU, lower priority"},
      {"ticker": "MRCY", "name": "Mercury Systems", "priority": 6, "price": 84.45, "52wkHigh": 103.84, "drawdown": -18.7, "fwdPE": 56.50, "thesisOneLine": "Defense AI edge compute; overlaps Golden Dome thesis", "status": "STAGE 1 ONLY — fwd PE concern"}
    ],
    "tier3Speculative": [
      {"ticker": "POET", "name": "POET Technologies", "priority": 7, "price": 7.23, "thesisOneLine": "Silicon photonics Optical Interposer pure-play", "sizing": "SI-37 cap $1,000 max", "status": "STAGE 2 required if speculative allocation available"}
    ],
    "newCandidatesFromSI50": [
      {"ticker": "OXY", "name": "Occidental Petroleum", "priority": 1, "price": 53.74, "52wkHigh": 67.45, "drawdown": -20.3, "fwdPE": 12.33, "evEBITDA": 7.12, "50dayMA": 55.47, "200dayMA": 46.48, "analystTarget": 62.32, "analystBuys": 8, "analystHolds": 15, "analystSells": 3, "berkshireInsider": "27% (Berkshire Hathaway)", "thesisOneLine": "Oil E&P leveraged to WTI. EvEBITDA 7.12, fwd PE 12.33. Buffett anchor. Hormuz-correlated.", "stage2Status": "CONDITIONAL — WTI $90+ three-session confirmation required before entry. Currently $53.74 below 50-day MA $55.47 — technically weak despite thesis. 15 holds, 3 sells = tepid consensus. Entry $50-52, stop $48, ~50 shares. OXY is secondary oil add — NOG is primary thesis position. Only enter if WTI confirms and holds. Monitor Thursday SI-45.", "status": "CONDITIONAL — WTI $90+ confirmation needed"},
      {"ticker": "CDNS", "name": "Cadence Design Systems", "priority": 2, "price": 311.08, "52wkHigh": 376.45, "drawdown": -17.3, "trigger": -20, "triggerPrice": 301.16, "thesisOneLine": "EDA duopoly twin to SNPS — cleaner P&L, no Ansys integration drag. -17.3% from ATH.", "stage2Status": "APPROACHING SI-39 TRIGGER. At -20% ($301.16) becomes buy candidate. Structurally identical to SNPS thesis but cleaner earnings profile. No Ansys-equivalent one-off charges. Check Thursday SI-45 for -20% trigger.", "status": "MONITOR — SI-39 trigger $301.16 (-20%)"}
    ],
    "doNotEnter": [
      {"ticker": "SMCI", "reason": "T8 blocked — Hindenburg short-seller attack, accounting"},
      {"ticker": "CRWV", "reason": "Debt-heavy neocloud, customer concentration"},
      {"ticker": "PLTR", "reason": "P6 blocked — -$1,307 realised loss"},
      {"ticker": "IONQ/RGTI/QBTS", "reason": "Quantum — not inference/training infrastructure"},
      {"ticker": "KULR", "reason": "Microcap, -82% drawdown, broken chart"},
      {"ticker": "LWLG", "reason": "At ATH, no revenue model proven"}
    ],
    "failedSI48": [
      {"ticker": "HPE", "reason": "Analyst target = current price ($26.43 vs $26.44). Zero upside. Trailing EPS negative. Re-evaluate $22-23."},
      {"ticker": "VRT", "reason": "Fwd PE 51.8 — thesis requires multiple expansion (PLTR trap)"},
      {"ticker": "ALAB", "reason": "Fwd PE 72.5 even after -34% drawdown"},
      {"ticker": "GEV", "reason": "Fwd PE 67 at ATH — stretched"}
    ],
    "speculativeAllocationConcern": "Current speculative = AMPX $3,042 + CODA $4,994 + PDYN $1,649 + CRML $999 + CGCT $2,994 = $13,678 (~13% NAV). Any new SI-37 entry requires trim decision first."
  },
  "priceVerificationProtocol": {
    "title": "MANDATORY BEFORE ANY PRICE-BASED RECOMMENDATION — SI-1 + SI-40 + SI-44 + SI-49 + SI-50",
    "currentPriceUS": "MMD /v2/aggs/ticker/{TICKER}/prev — use field 'c'. Primary source.",
    "52wkRangeUS": "EOD:get_us_live_extended_quotes — fiftyTwoWeekHigh/Low. ONLY authorised source.",
    "currentPriceEUUK": "web_fetch Yahoo Finance. MEMORY FORBIDDEN.",
    "fundamentalsUS": "Alpha:COMPANY_OVERVIEW, Alpha:INCOME_STATEMENT, Alpha:EARNINGS, Alpha:EARNINGS_ESTIMATES, Alpha:EARNINGS_CALL_TRANSCRIPT",
    "secFilings": "data.sec.gov/api/xbrl/companyfacts/CIK{10-digit}.json — FREE, no key",
    "charts": "Alpha:TIME_SERIES_WEEKLY then Visualizer tool — MANDATORY for every Stage 2 candidate",
    "memoryForbidden": "MEMORY ESTIMATES FOR ANY PRICE OR FUNDAMENTAL DATA ARE FORBIDDEN."
  },
  "cDriveProtocol": {
    "confirmed": "2026-04-20 SESSION 25",
    "readAccess": true,
    "writeAccess": true,
    "tools": ["filesystem:read_text_file", "filesystem:write_file", "filesystem:edit_file", "filesystem:list_directory", "filesystem:list_allowed_directories", "filesystem:create_directory"],
    "allowedPaths": ["C:\\Users\\jcadb\\claude-fund", "C:\\Users\\jcadb\\Claude Date File"],
    "sessionOpenReads": ["C:\\Users\\jcadb\\claude-fund\\state\\FUND_SESSION_STATE.md", "C:\\Users\\jcadb\\claude-fund\\state\\LESSONS_LEARNED.md"],
    "thesisResearchFiles": ["C:\\Users\\jcadb\\claude-fund\\research\\AI_INFRASTRUCTURE_THESIS.md (S24 — 40+ AI candidates, S25 Stage 2 updates)"]
  },
  "standingInstructions": [
    {"id": 1, "title": "FULL SCAN PROTOCOL — SI-14 v4.0", "body": "SECTION 0 (SI-39): EOD batch Tier 1 + AI Tier 2 + SI-50 new candidates. Drawdown check. BEFORE A-K.\nSECTION A: Position health table.\nSECTION B: Individual thesis review.\nSECTION C: Pending orders review.\nSECTION D: Stop analysis.\nSECTION E: SI-39 drawdown scanner.\nSECTION F: SI-45/SI-50 weekly + twice-weekly screen.\nSECTION G: Geopolitical thesis.\nSECTION H: Thesis integrity.\nSECTION I: Macro update.\nSECTION J: Upcoming catalysts.\nSECTION K: Sector threat monitor + AI news check."},
    {"id": 2, "title": "IBKR SCREENSHOTS — GROUND TRUTH", "body": "IBKR screenshot overrides ALL other sources."},
    {"id": 3, "title": "POSITION SIZING — SI-35", "body": "Max loss per trade: $500. SI-37 speculative cap: $1,500."},
    {"id": 4, "title": "TIMEZONE", "body": "UAE = UTC+4. NYSE open 13:30 UAE, close 00:00 UAE. LSE open 12:00 UAE, close 20:30 UAE. IBIS open 10:00 UAE, close 18:30 UAE."},
    {"id": 14, "title": "FULL SCAN = SI-14 SECTIONS 0 + A-K (v4.0)", "body": "Section 0 runs FIRST including AI Tier 2 + SI-50 new candidates. Section F mandatory first session of each week (full) + Thursday brief."},
    {"id": 17, "title": "ERROR TAXONOMY — 14 TYPES", "body": "E1-E14. E9: GTC orphan. E14: Journal date discrepancy."},
    {"id": 19, "title": "STOPPED OUT / CLOSED POSITIONS — SI-19", "body": "ONDS -$601. KTOS -$1,601. CCL +$122. UEC -$127. IAG.L +£326. RCL -$132. LDO.MI (first) +€21.52. LEU -$238. PLTR -$1,307. PDYN partial +$17.42. AVAV +$71.38. ITM TRIM +£652. LNG -$396.54. PATK +$9.34. NOG sell cancelled S24."},
    {"id": 24, "title": "CASH FLOOR — 10% RULE", "body": "Floor = 10% of NL. At $105,600 NL, floor = $10,560. Deployable ~$17,674."},
    {"id": 25, "title": "SI-25 EXIT TRIGGER — OIL BASED NOT CEASEFIRE BASED", "body": "EXIT TRIGGER: Formal PERMANENT Hormuz reopening + WTI -10% from peak. Oil condition technically met. Hormuz CLOSED — re-closed Apr 18. SI-25 NOT TRIGGERED."},
    {"id": 35, "title": "DOLLAR-RISK SIZING — SI-35", "body": "Max loss per trade: $500."},
    {"id": 36, "title": "MINIMUM 2:1 R:R FILTER", "body": "Min R:R to enter: 2.0:1. Exemption: tactical binary <$2,000 at 1.5:1 min."},
    {"id": 37, "title": "SPECULATIVE CAP — $1,500 MAX", "body": "Hard cap $1,500. AMPX/CODA grandfathered. Current spec allocation ~13% NAV."},
    {"id": 39, "title": "SI-39: UNDERVALUED US LARGE CAP SCANNER — SECTION 0", "body": "TIER 1: 9 names with specific triggers. TIER 2: AI thesis watchlist. SI-50 candidates added S25. Max per position: $4,000. Max aggregate: 20% NAV."},
    {"id": 40, "title": "52-WEEK DATA PROTOCOL", "body": "US 52wk: EOD:get_us_live_extended_quotes only. EU/UK: Yahoo Finance. Memory forbidden."},
    {"id": 41, "title": "CATALYST-ANCHORED ENTRY REQUIREMENT", "body": "Before entry: (A) Earnings within 8 weeks OR (B) Contract award within 8 weeks OR (C) Technical confirmation OR (D) Structural value below sector median. MU: SI-41 window opens after May 17 (July 1 earnings then within 8 weeks)."},
    {"id": 44, "title": "SI-44: TWO-STAGE RESEARCH PROTOCOL", "body": "STAGE 1 = scan candidate only. STAGE 2 = mandatory before capital: primary-source verification via SI-49."},
    {"id": 45, "title": "SI-45: WEEKLY BROAD US MARKET SCREENER", "body": "Run EVERY first session of trading week (Monday). Non-negotiable. Now extended by SI-50 Thursday brief refresh."},
    {"id": 47, "title": "SI-47: DATE VERIFICATION PROTOCOL — STEP ZERO", "body": "System prompt date is authoritative. State weekday + full date + market open times in UAE at start of every session before any analysis."},
    {"id": 48, "title": "SI-48: AI THESIS ATH RULE AMENDMENT", "body": "SCOPE: AI infrastructure thesis candidates ONLY.\nRULE: For AI-thesis candidate at or near 52wk high, entry may proceed WITHOUT SI-39 drawdown trigger if ALL FOUR tests pass in Stage 2:\n1. Valuation reasonable: Fwd PE below sector median OR PEG < 1.5\n2. Structural catalyst path: Multi-year contracted backlog/LTAs beyond next earnings\n3. No multiple expansion required: Upside from earnings growth alone\n4. PLTR P6 test: If primary case is narrative → REJECT\nCURRENT VERDICTS (S25): MU PASSES all four. HPE FAILS test 3 (zero analyst upside modelled at current price). SNPS N/A (already -31% drawdown)."},
    {"id": 49, "title": "SI-49: STAGE 2 DATA STACK ROUTING PROTOCOL", "body": "Authoritative guide — which tool for each data need. Consult BEFORE every Stage 2 session.\nPRICE US: MMD prev field 'c' (current). EOD:get_us_live_extended_quotes (52wk).\nFUNDAMENTALS US: Alpha:COMPANY_OVERVIEW, INCOME_STATEMENT, EARNINGS, EARNINGS_ESTIMATES, EARNINGS_CALL_TRANSCRIPT (MANDATORY for Stage 2).\nSEC: data.sec.gov XBRL free API.\nCHARTS: Alpha:TIME_SERIES_WEEKLY + Visualizer — MANDATORY every Stage 2.\nFUNDAMENTALS EU/UK: web_fetch stockanalysis.com + macrotrends.net."},
    {"id": 50, "title": "SI-50: TWICE-WEEKLY BROAD MARKET SCAN — MONDAY + THURSDAY (NEW S25)", "body": "MANDATORY DUAL CADENCE from S25 onwards. Purpose: spot discounted quality stocks as early as possible. Best entries come in the first 48 hours of a macro-driven selloff — Thursday check catches mid-week dislocations missed until Monday.\n\nMONDAY (every week): Full SI-39 Section 0 batch (Tier 1 + AI Tier 2 + SI-50 new candidates) + SI-45 broad US screen. Identify new drawdown entrants. This is the primary scan of the week — no exceptions.\n\nTHURSDAY (every week): Brief SI-45 refresh — price pull on flagged watchlist names only. No full scan required. Focus: (1) Did flagged names move toward entry zones? (2) Any new SI-39 triggers from week's earnings reactions? (3) Classify any significant moves: macro-driven dip vs broken thesis. Current Thursday watchlist: MU ($440-445 entry zone?), CDNS (approaching $301 trigger?), CRDO (pullback to $140-145?), OXY (WTI confirmation status?), NOG (post-ceasefire positioning).\n\nDIP CLASSIFICATION RULE (mandatory before any drawdown flag becomes a buy candidate):\n(A) Has the company reported negative fundamental news this week? (B) Is the sector drawdown macro/geopolitical or company-specific? (C) Has guidance been cut or is next print threatened?\nIf answers are No / Macro / No → candidate for further Stage 2 investigation.\nIf any answer differs → broken thesis — wait or pass.\n\nThis rule operationalises T20 (T21 — see Lessons): the edge in this fund comes from identifying structural dislocation early, not from buying broken businesses."}
  ],
  "watchlistUS": [
    {"ticker": "NFLX", "name": "Netflix Inc", "exchange": "NASDAQ", "status": "STAGE 1 CANDIDATE — SI-41 FAIL until early June", "currentPrice": 97.31, "52wkHigh": 134.12, "drawdown": -27.4, "note": "SI-41 FAIL: next earnings Jul 16 — outside 8-week window. Re-check when window opens."},
    {"ticker": "V", "name": "Visa Inc", "exchange": "NYSE", "status": "ACTIVE — BUY LIMIT $307 GTC — SI-39 TRIGGERED", "currentPrice": 316.64, "52wkHigh": 375.51, "drawdown": -15.7, "note": "Earnings Apr 28 AMC. Bracket stop $285 GTC live."},
    {"ticker": "NOG", "name": "Northern Oil & Gas", "exchange": "NYSE", "status": "HELD — STOP $22.50 GTC RESUBMITTED S25", "note": "Order ID 133934373. Stop confirmed Mon Apr 20. Apr 30 Q1 earnings."},
    {"ticker": "SLV", "name": "iShares Silver Trust", "exchange": "NYSE", "status": "FULLY CANCELLED — BOTH LEGS REMOVED", "note": "BUY $70 + SELL $63 both confirmed Cancelled."},
    {"ticker": "MU", "name": "Micron Technology", "exchange": "NASDAQ", "status": "STAGE 2 CONFIRMED — WAITING SI-41 WINDOW (after May 17)", "currentPrice": 454.20, "52wkHigh": 471.34, "drawdown": -3.6, "note": "Entry $440-445 limit, stop $420, 14 shares (~$6,200). SI-41 window opens after May 17 (Jul 1 earnings within 8 weeks). Five-year SCA signed — primary source confirmed S25."},
    {"ticker": "SNPS", "name": "Synopsys", "exchange": "NASDAQ", "status": "STAGE 2 MONITOR — WAIT MID-MAY EARNINGS", "currentPrice": 449.00, "52wkHigh": 651.73, "drawdown": -31.1, "note": "Wait Q2 FY26 mid-May. Entry trigger: operating margin recovery above 20%. Stop ~$410. Target $535."},
    {"ticker": "CRDO", "name": "Credo Technology", "exchange": "NASDAQ", "status": "STAGE 2 CONDITIONAL — WAIT $140-145", "currentPrice": 159.70, "52wkHigh": 213.80, "drawdown": -25.3, "note": "Revenue +201% YoY confirmed. Wait pullback to 200-day MA $132.69 area. SI-37 cap only ($1,500). Beta 2.72."},
    {"ticker": "OXY", "name": "Occidental Petroleum", "exchange": "NYSE", "status": "CONDITIONAL — WTI $90+ 3-SESSION CONFIRMATION NEEDED", "currentPrice": 53.74, "52wkHigh": 67.45, "drawdown": -20.3, "note": "EvEBITDA 7.12, fwd PE 12.33, Berkshire 27% insider. Entry $50-52 stop $48 ~50 shares. Tepid analyst consensus (15 hold, 3 sell). Secondary oil add — NOG is primary. WTI $90+ must hold 3 sessions."},
    {"ticker": "CDNS", "name": "Cadence Design Systems", "exchange": "NASDAQ", "status": "MONITOR — SI-39 TRIGGER $301.16 (-20%)", "currentPrice": 311.08, "52wkHigh": 376.45, "drawdown": -17.3, "note": "EDA duopoly twin to SNPS. Cleaner P&L (no Ansys). At -17.3% — approaching -20% trigger $301.16. Check Thursday SI-45."},
    {"ticker": "TLN", "name": "Talen Energy Corp", "exchange": "NASDAQ", "status": "WATCH — POST MAY 5 EARNINGS ONLY", "currentPrice": 353.30, "52wkHigh": 451.28, "drawdown": -21.7, "note": "Nuclear + Amazon PPA 1,920 MW. May 5 earnings gate."},
    {"ticker": "BKR", "name": "Baker Hughes", "exchange": "NYSE", "status": "WATCH — EARNINGS WED APR 22 — POST-RESULTS ENTRY $58.50", "currentPrice": 59.78, "52wkHigh": 67.00, "note": "Post-earnings entry zone $58.50 only. No pre-earnings entry."},
    {"ticker": "BTC", "name": "Bitcoin — IBKR Paxos spot", "exchange": "IBKR", "status": "WATCH — $55K target", "currentPrice": 70700, "note": "5-7.5% NAV via IBKR Paxos. Entry $55K. No order placed."}
  ],
  "watchlistEU": [
    {"ticker": "LDO.MI", "name": "Leonardo SpA", "exchange": "BVME", "cur": "EUR", "current": 56.00, "note": "BUY LIMIT €56 GTC active. May 5 earnings."},
    {"ticker": "R3NK", "name": "RENK Group AG", "exchange": "IBIS", "cur": "EUR", "current": 55.01, "note": "IN PORTFOLIO. Q1 May 6."},
    {"ticker": "ITM.L", "name": "ITM Power PLC", "exchange": "LSE", "cur": "GBP", "current": 131.50, "note": "IN PORTFOLIO. 2,000 shares."},
    {"ticker": "RR.L", "name": "Rolls-Royce Holdings", "exchange": "LSE", "cur": "GBP", "current": 1310.60, "note": "IN PORTFOLIO. HARD LOCK — ex-div Wednesday Apr 23."},
    {"ticker": "CWR.L", "name": "Ceres Power", "exchange": "LSE", "cur": "GBP", "note": "Entry 250-270p only."},
    {"ticker": "ENR.DE", "name": "Siemens Energy AG", "exchange": "XETRA", "cur": "EUR", "current": "~€157.50", "note": "AI THESIS TIER 2 #5 — EU grid/turbine. Stage 2 pending."},
    {"ticker": "SU.PA", "name": "Schneider Electric", "exchange": "XPAR", "cur": "EUR", "current": "€278.65", "note": "AI thesis adjacent — earnings April 30 catalyst. Stage 2 for SI-48 case."}
  ],
  "sessionNotes": [
    {"date": "2026-04-18", "note": "SESSION 23 — Saturday. LNG stopped -$396.54. NOG filled $24.37. ITM trim +£652. SLV cancelled. NFLX Stage 1. Journal v32."},
    {"date": "2026-04-19", "note": "SESSION 24 — Sunday. HORMUZ RE-CLOSED Saturday Apr 18 by IRGC. NOG sell cancelled. SLV BUY $70 cancelled. SI-47 date protocol added. AI thesis Stage 1 deep dive (40+ candidates). SI-48 + SI-49 added. Journal v35."},
    {"date": "2026-04-20", "note": "SESSION 25 — Monday. SI-47 STEP ZERO: Today is Monday April 20 2026. NOG stop $22.50 GTC RESUBMITTED (Order ID 133934373) before 13:30 UAE — confirmed submitted. NOG DAY sell + SLV BUY both confirmed Cancelled (screenshots). Full scan run. WTI bouncing from $83.85 Friday close to $86-93 on Hormuz re-closure. Iran rejected second round of talks Sunday Apr 19. ISRG earnings tomorrow AMC — stop $443.86 do NOT touch. RR.L ex-div Wednesday — hard lock. S&P 500 futures +1.2%. Journal v36."},
    {"date": "2026-04-20", "note": "SESSION 25 — STAGE 2 AI THESIS COMPLETE. MU: CONFIRMED BUY pending SI-41 window after May 17. Primary source (Q2 FY26 earnings call): five-year SCA signed with hyperscaler, HBM4 in volume production for NVIDIA Vera Rubin, supply tightness confirmed beyond 2026. Entry $440-445 limit, stop $420, 14 shares ~$6,200. HPE: PASS — analyst target $26.43 = current $26.44, zero upside, trailing EPS negative, 12 holds vs 9 buys. Re-evaluate $22-23. SNPS: MONITOR — wait mid-May Q2 FY26 earnings, need operating margin recovery above 20% to confirm Ansys charges normalising. CRDO: CONDITIONAL — growth confirmed (revenue +201% YoY), wait pullback to $140-145 near 200-day MA $132.69, SI-37 cap $1,500. OXY: CONDITIONAL — WTI $90+ three-session confirmation required, entry $50-52 stop $48. CDNS: approaching -20% trigger $301.16 — check Thursday. SI-50 twice-weekly scan (Monday full + Thursday brief) formalised as standing protocol. Iran conflict assessment: dragging — structural not near-term resolved. Fund entering next phase with clear prioritised entry queue."}
  ],
  "tradeTracker": {
    "pendingRows": [
      {"id": 1, "ticker": "AVAV", "shares": 25, "entryPrice": 195.09, "exitPrice": 197.945, "pnl": "+$71.38", "session": "S20", "note": "outstanding"},
      {"id": 2, "ticker": "ITM TRIM", "shares": 1100, "entryPrice": "65.1p", "exitPrice": "124.60p", "pnl": "+£652", "session": "S22"},
      {"id": 3, "ticker": "LNG", "shares": 19, "entryPrice": 268.76, "exitPrice": 248.00, "pnl": "-$396.54", "session": "S23"},
      {"id": 4, "ticker": "PATK", "shares": 25, "entryPrice": 108.80, "exitPrice": 109.256, "pnl": "+$9.34", "session": "S23 P17"},
      {"id": 5, "ticker": "NOG", "note": "Market sell cancelled S24 — position held", "session": "S24"}
    ]
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

  const tabs = ["positions","orders","thesis","aiwatch","instructions","watchlist","notes"];
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
        .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
        .grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px; }
        input { background: ${COLORS.card}; border: 1px solid ${COLORS.border}; color: ${COLORS.text}; padding: 8px; border-radius: 4px; font-family: monospace; font-size: 12px; flex: 1; }
        @media (max-width: 600px) { .grid-2, .grid-3 { grid-template-columns: 1fr; } }
      `}</style>

      <div style={{ marginBottom: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8 }}>
          <div>
            <div style={{ fontSize: 18, fontWeight: 700, color: COLORS.textBright }}>CLAUDE FUND — JOURNAL v36</div>
            <div style={{ fontSize: 11, color: COLORS.textDim, marginTop: 2 }}>Session {data.sessionNumber} | {data.fund.account} | {data.lastUpdated}</div>
          </div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {[
              { label: "NET LIQ", val: `$${(data.fund.netLiquidity/1000).toFixed(1)}K` },
              { label: "UNREAL P&L", val: `$${(data.fund.unrealizedPnL/1000).toFixed(1)}K`, color: pnlColor(data.fund.unrealizedPnL) },
              { label: "DEPLOYABLE", val: `$${(data.fund.deployableCash/1000).toFixed(1)}K`, color: COLORS.blue },
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
          ✅ NOG stop $22.50 GTC submitted — Order ID 133934373 — confirmed Mon Apr 20
        </div>
        <div style={{ marginTop: 4, padding: "6px 10px", background: "rgba(248,81,73,0.1)", border: "1px solid rgba(248,81,73,0.3)", borderRadius: 4, fontSize: 11, color: COLORS.red }}>
          ⚠️ CEASEFIRE EXPIRES TOMORROW TUE APR 21 — ISRG EARNINGS AMC — RR.L EX-DIV WED APR 23
        </div>
        <div style={{ marginTop: 4, padding: "6px 10px", background: "rgba(163,113,247,0.1)", border: "1px solid rgba(163,113,247,0.3)", borderRadius: 4, fontSize: 11, color: COLORS.purple }}>
          🧠 SI-50 ACTIVE — Monday full scan + Thursday brief scan. MU entry after May 17. Stage 2 complete.
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
            <div key={p.ticker} className="card" style={{ borderLeft: p.status?.includes("NO STOP") ? `3px solid ${COLORS.red}` : p.status?.includes("HARD LOCK") ? `3px solid ${COLORS.yellow}` : undefined }}>
              <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap", marginBottom: 6 }}>
                <span style={{ fontWeight: 700, fontSize: 14, color: COLORS.textBright }}>{p.ticker}</span>
                <span style={{ fontSize: 11, color: COLORS.textDim }}>{p.name}</span>
                {p.cur && <span className="badge badge-grey">{p.cur}</span>}
                <span className={`badge ${p.unrealPnL > 50 ? "badge-green" : p.unrealPnL < -50 ? "badge-red" : "badge-amber"}`}>
                  {p.unrealPnL >= 0 ? "+" : ""}{p.unrealPct?.toFixed(1)}%
                </span>
                <span className={`badge ${p.status?.includes("HARD LOCK") ? "badge-amber" : "badge-grey"}`}>{p.status?.substring(0,45)}</span>
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
            <div key={i} className="card" style={{ borderLeft: `3px solid ${o.status?.includes("SUBMITTED") && o.ticker === "NOG" ? COLORS.green : o.action === "BUY" ? COLORS.green : COLORS.red}` }}>
              <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap", marginBottom: 4 }}>
                <span style={{ fontWeight: 700 }}>{o.ticker}</span>
                <span className={`badge ${o.action === "BUY" ? "badge-green" : "badge-red"}`}>{o.action}</span>
                <span className="badge badge-grey">{o.type}</span>
                <span style={{ fontSize: 11 }}>Qty: <b>{o.qty}</b></span>
                {o.limitPrice && <span style={{ fontSize: 11 }}>Limit: <b>{o.limitPrice}</b></span>}
                {o.stopPrice && <span style={{ fontSize: 11 }}>Stop: <b>{o.stopPrice}</b></span>}
                <span className="badge badge-grey">{o.tif}</span>
                <span className={`badge ${o.status?.includes("SUBMITTED") ? "badge-green" : o.status?.includes("ACTIVE") ? "badge-green" : "badge-grey"}`}>{o.status?.substring(0,40)}</span>
              </div>
              {o.note && <div style={{ fontSize: 10, color: COLORS.textDim }}>{o.note}</div>}
            </div>
          ))}
        </div>
      )}

      {activeTab === "aiwatch" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <div className="card" style={{ borderColor: COLORS.purple, borderLeftWidth: 3 }}>
            <div style={{ fontWeight: 700, color: COLORS.purple, fontSize: 13, marginBottom: 4 }}>AI INFRASTRUCTURE THESIS — STAGE 2 COMPLETE (S25)</div>
            <div style={{ fontSize: 11, color: COLORS.textDim }}>MU confirmed. HPE pass. SNPS monitor May. CRDO conditional. OXY conditional. Research: C:\Users\jcadb\claude-fund\research\AI_INFRASTRUCTURE_THESIS.md</div>
          </div>
          {[
            ...(data.si39TierTwoAIThesisWatchlist?.tier1Priorities || []),
            ...(data.si39TierTwoAIThesisWatchlist?.tier2Priorities || []),
            ...(data.si39TierTwoAIThesisWatchlist?.newCandidatesFromSI50 || [])
          ].map(w => (
            <div key={w.ticker} className="card" style={{ borderLeft: `3px solid ${w.stage2Status?.includes("CONFIRMED") ? COLORS.green : w.stage2Status?.includes("PASS") || w.stage2Status?.includes("DO NOT") ? COLORS.red : w.stage2Status?.includes("CONDITIONAL") ? COLORS.yellow : COLORS.purple}` }}>
              <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap", marginBottom: 6 }}>
                <span style={{ fontWeight: 700, color: COLORS.textBright }}>#{w.priority} {w.ticker}</span>
                <span style={{ fontSize: 11, color: COLORS.textDim }}>{w.name}</span>
                {w.fwdPE && <span className="badge badge-purple">Fwd PE {w.fwdPE}</span>}
                {w.drawdown && <span className={`badge ${w.drawdown < -20 ? "badge-red" : w.drawdown < -10 ? "badge-amber" : "badge-grey"}`}>{w.drawdown}% from ATH</span>}
              </div>
              <div style={{ fontSize: 11, color: COLORS.text, marginBottom: 4 }}>{w.thesisOneLine}</div>
              {w.stage2Status && <div style={{ fontSize: 10, color: COLORS.textDim, marginBottom: 4, lineHeight: 1.5 }}><b>Stage 2:</b> {w.stage2Status}</div>}
              <div style={{ fontSize: 10, color: COLORS.accent }}>{w.status}</div>
            </div>
          ))}
          <div style={{ fontWeight: 600, color: COLORS.red, fontSize: 12, marginTop: 8 }}>PASS / DO NOT ENTER</div>
          {data.si39TierTwoAIThesisWatchlist?.failedSI48?.map((w, i) => (
            <div key={i} className="card" style={{ borderLeft: `3px solid ${COLORS.red}`, padding: 8 }}>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <span style={{ fontWeight: 700, color: COLORS.red }}>{w.ticker}</span>
                <span style={{ fontSize: 11, color: COLORS.textDim }}>{w.reason}</span>
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
          <div className="grid-2" style={{ marginBottom: 12 }}>
            <div className="card" style={{ borderColor: "rgba(248,81,73,0.4)" }}>
              <div style={{ fontSize: 10, color: COLORS.red }}>HORMUZ — CLOSED</div>
              <div style={{ marginTop: 6, fontSize: 12, color: COLORS.red, lineHeight: 1.6 }}>{data.thesis.hormuzStatus}</div>
            </div>
            <div className="card" style={{ background: "rgba(210,153,34,0.05)", borderColor: "rgba(210,153,34,0.3)" }}>
              <div style={{ fontSize: 10, color: COLORS.yellow }}>SI-25 — ELEVATED ALERT — NOT TRIGGERED</div>
              <div style={{ marginTop: 6, fontSize: 11, color: COLORS.yellow, lineHeight: 1.6 }}>{data.thesis.ceasefireFilter}</div>
            </div>
          </div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: COLORS.accent, marginBottom: 8 }}>KEY DATES</div>
            {data.thesis.keyDates?.map((d, i) => (
              <div key={i} className="card" style={{ marginBottom: 6, borderLeft: `3px solid ${d.priority === "CRITICAL" ? COLORS.red : COLORS.yellow}` }}>
                <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <span style={{ fontSize: 11, fontWeight: 600, minWidth: 110, color: COLORS.textBright }}>{d.date}</span>
                  <span style={{ fontSize: 11, color: COLORS.textDim, flex: 1 }}>{d.event}</span>
                  <span className={`badge ${d.priority === "CRITICAL" ? "badge-red" : "badge-amber"}`}>{d.priority}</span>
                </div>
              </div>
            ))}
          </div>
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
                <span className={`badge ${w.status?.includes("CONFIRMED") ? "badge-green" : w.status?.includes("PASS") || w.status?.includes("CANCELLED") ? "badge-red" : w.status?.includes("MONITOR") || w.status?.includes("CONDITIONAL") ? "badge-amber" : w.status?.includes("ACTIVE") || w.status?.includes("HELD") ? "badge-green" : "badge-grey"}`}>{w.status?.substring(0,45)}</span>
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

      {activeTab === "instructions" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {data.standingInstructions?.map(ins => (
            <div key={ins.id} className="card" style={{ display: "flex", gap: 12, borderLeft: ins.id === 50 ? `3px solid ${COLORS.green}` : ins.id === 49 ? `3px solid ${COLORS.blue}` : ins.id === 48 ? `3px solid ${COLORS.purple}` : ins.id === 47 ? `3px solid ${COLORS.red}` : undefined }}>
              <div style={{ fontSize: 11, color: ins.id === 50 ? COLORS.green : ins.id === 49 ? COLORS.blue : ins.id === 48 ? COLORS.purple : ins.id === 47 ? COLORS.red : COLORS.accent, fontWeight: 700, minWidth: 28 }}>#{ins.id.toString().padStart(2,"0")}</div>
              <div>
                <div style={{ fontWeight: 600, color: ins.id === 50 ? COLORS.green : ins.id === 49 ? COLORS.blue : ins.id === 48 ? COLORS.purple : ins.id === 47 ? COLORS.red : COLORS.textBright, marginBottom: 4, fontSize: 12 }}>{ins.title}</div>
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
        <span style={{ fontSize: 10, color: COLORS.textDim }}>JOURNAL v36 // SESSION 25 // {data.fund.account} // SI-50 TWICE-WEEKLY SCAN ACTIVE</span>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <span className="badge badge-green">NOG STOP LIVE</span>
          <span className="badge badge-red">CEASEFIRE EXPIRES TUE APR 21</span>
          <span className="badge badge-red">HORMUZ: CLOSED</span>
          <span className="badge badge-amber">SI-25: ELEVATED ALERT</span>
          <span className="badge badge-green">MU: CONFIRMED — WAIT MAY 17</span>
          <span className="badge badge-blue">SI-47 DATE PROTOCOL</span>
          <span className="badge badge-purple">SI-48 AI THESIS</span>
          <span className="badge badge-green">SI-50 TWICE-WEEKLY SCAN</span>
        </div>
      </div>
    </div>
  );
}
