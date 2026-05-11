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
// □ 6. NEW S24: Update thesis files in \research\ if thesis research conducted
//
// User actions required:
// □ 7. Delete OLD journal version from Claude project
// □ 8. Upload NEW trading_journal[N+1].jsx to Claude project
// □ 9. Run session-close.bat (GitHub backup)
// □ 10. Verify: Claude project shows correct session number
// ═══════════════════════════════════════════════════════════════════

const INITIAL_STATE = {
  "lastUpdated": "2026-04-19 SUPPLEMENTARY — SI-49 DATA STACK PROTOCOL ADDED",
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
    "lastUpdated": "2026-04-19 SESSION 24 SUPPLEMENTARY — JOURNAL v35 — SI-49 DATA STACK ROUTING PROTOCOL ADDED",
    "note": "JOURNAL v35 — SESSION 24 SUPPLEMENTARY (Sunday 19 Apr 2026). AI INFRASTRUCTURE THESIS DEEP DIVE COMPLETED. Full Stage 1 research in C:\\Users\\jcadb\\claude-fund\\research\\AI_INFRASTRUCTURE_THESIS.md (40+ candidates). Key additions: SI-48 + SI-49 ADDED. Tier 1 Stage 2 priorities: MU, HPE, SNPS. PLTR P6 lesson remains governing guardrail. NOG has NO STOP — MUST RESUBMIT $22.50 GTC MONDAY APR 20 FIRST ACTION BEFORE 13:30 UAE."
  },
  "thesis": {
    "title": "US NAVAL BLOCKADE OF IRANIAN PORTS ACTIVE — HORMUZ RE-CLOSED SAT APR 18 — SI-25 ELEVATED ALERT",
    "summary": "SUNDAY APR 19 UPDATE: HORMUZ RE-CLOSED. Iran opened Hormuz conditionally Friday Apr 17 (ceasefire-linked). Iran re-closed Saturday Apr 18 after US refused to lift port blockade. IRGC declared strait 'returned to previous state.' Ship tracking shows tankers turning back in Persian Gulf. WTI closed $83.85 Friday on opening news — will reverse Monday. Ceasefire expires Tuesday Apr 21. SI-25 NOT TRIGGERED. NOG thesis RESTORED. SLV cancelled (both legs). NOG held.",
    "oilWTI": 83.85,
    "oilWTINote": "Friday close — pre re-closure. Expect spike Monday open on Hormuz re-closure news.",
    "oilBrent": 89.89,
    "goldPrice": 4760,
    "hormuzStatus": "SUNDAY APR 19: Hormuz RE-CLOSED. Iran re-closed Saturday Apr 18 — IRGC: strait 'returned to previous state.' US port blockade continues. WTI $83.85 Friday close — will spike Monday. Ceasefire expires Tuesday Apr 21.",
    "ceasefireFilter": "SI-25 ELEVATED ALERT. Hormuz re-closed Saturday Apr 18. Ceasefire expiry Tuesday Apr 21. Oil condition exceeded (WTI $83.85 vs trigger $100.38 — -24.9% from $111.54 peak). SI-25 NOT TRIGGERED.",
    "blockadeStatus": "US CENTCOM naval blockade of Iranian PORTS continues. Iran re-closed Hormuz Saturday Apr 18. Mine clearance multi-year program (CODA catalyst). Ceasefire expires Tuesday Apr 21.",
    "keyDates": [
      {"date": "20 Apr (Mon)", "event": "NYSE opens 13:30 UAE. PRIORITY 1: Resubmit NOG stop $22.50 GTC. Confirm NOG sell + SLV BUY cancellations. Run SI-45 weekly screener. Section 0 SI-39 (AI Tier 2 watchlist). Begin Stage 2 on MU/HPE/SNPS.", "priority": "CRITICAL"},
      {"date": "21 Apr (Tue)", "event": "CEASEFIRE EXPIRY — confirmed Tuesday Apr 21. ISRG Q1 earnings AMC — stop $443.86, do NOT touch pre-earnings. RTX Q1 pre-market — watch only.", "priority": "CRITICAL"},
      {"date": "22 Apr (Wed)", "event": "BKR Q1 earnings — post-results entry zone $58.50. Watch only.", "priority": "HIGH"},
      {"date": "23 Apr (Wed)", "event": "RR.L EX-DIVIDEND — ABSOLUTE HARD LOCK. DO NOT SELL BEFORE THIS DATE FOR ANY REASON.", "priority": "CRITICAL"},
      {"date": "23 Apr (Wed) AMC", "event": "AMZN Q1 earnings — AWS growth rate, AI capex guidance. Stop $234.39/$224 Stop Limit live.", "priority": "CRITICAL"},
      {"date": "28 Apr (Mon) AMC", "event": "V Q2 earnings — BUY $307 limit still pending. Beat + volumes resilient → add 8 more shares Apr 29 open.", "priority": "CRITICAL"},
      {"date": "29 Apr (Tue) AMC", "event": "MSFT Q3 FY2026 earnings — Azure growth %, Copilot seats. Stop $400.43.", "priority": "CRITICAL"},
      {"date": "30 Apr (Wed)", "event": "NOG Q1 earnings — position held. Schneider Electric (SU.PA) earnings — AI thesis catalyst.", "priority": "HIGH"},
      {"date": "5 May", "event": "TLN Q1 earnings — key gate. LDO.MI Q1 earnings — catalyst for pending buy.", "priority": "CRITICAL"},
      {"date": "6 May", "event": "R3NK Q1 earnings — €200M deferred Q4 orders MUST appear.", "priority": "CRITICAL"},
      {"date": "11 May", "event": "PLTR Q1 earnings — Golden Dome + Maven POR. Reentry $120-130 on confirmed award.", "priority": "CRITICAL"},
      {"date": "1 Jul", "event": "MU Q3 FY2026 earnings AMC — AI thesis Tier 1 candidate; HBM supercycle catalyst", "priority": "HIGH"},
      {"date": "16 Jul", "event": "NFLX Q2 2026 earnings — Stage 1 candidate. Next catalyst gate.", "priority": "MONITOR"},
      {"date": "~May 2026", "event": "CGCT BUSINESS COMBINATION CLOSE → FAC LISTING. POST-LISTING RULES: (1) >$12 → SELL 50%. (2) $10-12 → HOLD stop $8.00. (3) <$10 → EXIT.", "priority": "CRITICAL"}
    ]
  },
  "positions": [
    {"ticker": "NOG", "name": "Northern Oil and Gas Inc", "shares": 80, "avgPrice": 24.37, "costBasis": 1950, "last": 24.55, "marketVal": 1964, "unrealPnL": 14, "unrealPct": 0.7, "stop": null, "target": null, "status": "HOLD — NO STOP (MUST RESUBMIT $22.50 GTC MONDAY FIRST ACTION)", "note": "MONDAY FIRST ACTION: resubmit SELL Stop $22.50 GTC before any analysis. Apr 30 Q1 earnings."},
    {"ticker": "CGCT", "name": "Cartesian Growth Corp III (Factorial Energy SPAC)", "shares": 291, "avgPrice": 10.29, "costBasis": 2994, "last": 10.30, "marketVal": 2997, "unrealPnL": 3, "unrealPct": 0.0, "stop": null, "target": null, "status": "HOLD — NO STOP (TRUST FLOOR ~$10.27) — PRE-CLOSE SPAC", "note": "Trust $10.27 floor. Deal close ~May 2026."},
    {"ticker": "CCJ", "name": "Cameco Corp", "shares": 49, "avgPrice": 104.021, "costBasis": 5097, "last": 120.50, "marketVal": 5912, "unrealPnL": 815, "unrealPct": 16.0, "stop": 108.37, "target": null, "status": "HOLD — STOP LIVE", "note": "Nuclear thesis structural. Independent of Hormuz."},
    {"ticker": "AMZN", "name": "Amazon.com Inc", "shares": 30, "avgPrice": 201.204, "costBasis": 6036, "last": 250.74, "marketVal": 7522, "unrealPnL": 1486, "unrealPct": 24.6, "stop": 234.39, "stopType": "Stop Limit", "stopLimit": 224, "target": 300, "status": "HOLD — STOP LIMIT LIVE — EARNINGS WED APR 23 AMC", "note": "Stop $234.39/$224 Stop Limit GTC. Earnings Wednesday Apr 23 AMC."},
    {"ticker": "VST", "name": "Vistra Corp", "shares": 53, "avgPrice": 150.569, "costBasis": 7980, "last": 164.00, "marketVal": 8692, "unrealPnL": 712, "unrealPct": 8.9, "stop": 151.5, "target": null, "status": "HOLD — STOP LIVE", "note": "Stop $151.50 above cost. Earnings May 13. AI data centre power thesis intact."},
    {"ticker": "RR", "name": "Rolls-Royce Holdings", "shares": 150, "avgPrice": 1182.9, "costBasis": 1774, "last": 1310.60, "marketVal": 1966, "unrealPnL": 192, "unrealPct": 10.8, "stop": 1150, "stopType": "Stop Limit", "stopLimit": 1130, "target": 1600, "status": "HARD LOCK — NO SELL BEFORE APR 23 EX-DIV", "cur": "GBP", "note": "EX-DIV WEDNESDAY APR 23 — ABSOLUTE HARD LOCK."},
    {"ticker": "ITM", "name": "ITM Power PLC", "shares": 2000, "avgPrice": 65.1, "costBasis": 1302, "last": 131.50, "marketVal": 2630, "unrealPnL": 1328, "unrealPct": 102.0, "stop": 100, "stopType": "Stop Limit", "stopLimit": 98, "target": 150, "status": "HOLD — STOP LIMIT 100p/98p GTC", "cur": "GBP", "note": "2,000 shares post-S22 trim. +102% unrealised."},
    {"ticker": "AMPX", "name": "Amprius Technologies", "shares": 168, "avgPrice": 18.106, "costBasis": 3042, "last": 18.60, "marketVal": 3125, "unrealPnL": 83, "unrealPct": 2.7, "stop": 15.79, "target": 32, "status": "HOLD — STOP $15.79 GTC + LIMIT $32 GTC", "note": "Silicon anode battery/drone endurance thesis. Q1 earnings May 7."},
    {"ticker": "PDYN", "name": "Palladyne AI Corp", "shares": 250, "avgPrice": 6.595, "costBasis": 1649, "last": 6.68, "marketVal": 1670, "unrealPnL": 21, "unrealPct": 1.3, "stop": 5.75, "target": null, "status": "HOLD — STOP LIVE", "note": "May 13 earnings. No add until DoD contract news."},
    {"ticker": "CODA", "name": "Coda Octopus Group", "shares": 416, "avgPrice": 12.005, "costBasis": 4994, "last": 13.26, "marketVal": 5516, "unrealPnL": 522, "unrealPct": 10.5, "stop": 11.51, "target": 22, "status": "HOLD — STOP INTENTIONAL — MINE CLEARANCE THESIS CONFIRMED MULTI-YEAR", "note": "Iran lost track of mines — cannot reopen without USN support. Multi-year program."},
    {"ticker": "ABVX", "name": "Abivax SA-ADR", "shares": 44, "avgPrice": 117.913, "costBasis": 5188, "last": 121.16, "marketVal": 5331, "unrealPnL": 143, "unrealPct": 2.8, "stop": 114.31, "target": null, "status": "HOLD — STOP $114.31 GTC (INTENTIONALLY BELOW COST — M&A OPTIONALITY)", "note": "Max loss ~$158 intentional. Grandfathered above SI-37 cap."},
    {"ticker": "ISRG", "name": "Intuitive Surgical Inc", "shares": 22, "avgPrice": 459.25, "costBasis": 10104, "last": 470.55, "marketVal": 10352, "unrealPnL": 248, "unrealPct": 2.2, "stop": 443.86, "target": 510, "status": "HOLD — STOP $443.86 GTC — EARNINGS TUE APR 21 AMC — DO NOT TOUCH STOP", "note": "Earnings Tuesday Apr 21 AMC. Post-beat: raise stop to $455-460."},
    {"ticker": "MSFT", "name": "Microsoft Corp", "shares": 25, "avgPrice": 372.73, "costBasis": 9318, "last": 422.34, "marketVal": 10559, "unrealPnL": 1241, "unrealPct": 13.3, "stop": 400.43, "target": 430, "status": "HOLD — STOP $400.43 GTC — EARNINGS APR 29 AMC", "note": "Azure + Copilot thesis intact. Core AI thesis exposure."},
    {"ticker": "R3NK", "name": "RENK Group AG", "shares": 25, "avgPrice": 52.15, "costBasis": 1304, "last": 54.68, "marketVal": 1367, "unrealPnL": 63, "unrealPct": 4.8, "stop": 48, "stopType": "Stop Limit", "stopLimit": 47, "target": 76, "status": "HOLD — STOP LIMIT €48/€47 GTC", "cur": "EUR", "note": "Q1 earnings May 6. €200M deferred Q4 orders must appear."},
    {"ticker": "LLY", "name": "Eli Lilly and Company", "shares": 3, "avgPrice": 905.01, "costBasis": 2715, "last": 926.07, "marketVal": 2778, "unrealPnL": 63, "unrealPct": 2.3, "stop": 850, "target": 1028, "status": "HOLD — STOP $850 GTC — SI-39 POSITION", "note": "GLP-1 thesis intact. Independent of Hormuz."},
    {"ticker": "CRML", "name": "Critical Metals Corp", "shares": 110, "avgPrice": 9.07, "costBasis": 999, "last": 12.54, "marketVal": 1379, "unrealPnL": 380, "unrealPct": 38.0, "stop": 8.34, "target": 15, "status": "HOLD — STOP $8.34 GTC", "note": "US critical minerals strategic gap vs China. Add order $10.50 GTC active for 40 shares on pullback."}
  ],
  "pendingOrders": [
    {"ticker": "NOG", "action": "SELL", "type": "Stop", "qty": 80, "stopPrice": 22.50, "tif": "GTC", "status": "MUST RESUBMIT MONDAY — POSITION CURRENTLY UNPROTECTED", "note": "MONDAY APR 20 FIRST ACTION: resubmit $22.50 GTC stop before any other action."},
    {"ticker": "V", "action": "BUY", "type": "Limit", "qty": 8, "limitPrice": 307, "tif": "GTC", "status": "ACTIVE", "note": "SI-39 TRIGGERED. Earnings Apr 28 AMC. Bracket stop $285 live."},
    {"ticker": "V", "action": "SELL", "type": "Stop", "qty": 8, "stopPrice": 285, "tif": "GTC", "status": "ACTIVE"},
    {"ticker": "LLY", "action": "SELL", "type": "Stop", "qty": 3, "stopPrice": 850, "tif": "GTC", "status": "ACTIVE"},
    {"ticker": "CCJ", "action": "SELL", "type": "Stop", "qty": 49, "stopPrice": 108.37, "tif": "GTC", "status": "ACTIVE"},
    {"ticker": "PDYN", "action": "SELL", "type": "Stop", "qty": 250, "stopPrice": 5.75, "tif": "GTC", "status": "ACTIVE"},
    {"ticker": "AMPX", "action": "SELL", "type": "Stop", "qty": 168, "stopPrice": 15.79, "tif": "GTC", "status": "ACTIVE — RAISED S22"},
    {"ticker": "AMPX", "action": "SELL", "type": "Limit", "qty": 168, "limitPrice": 32, "tif": "GTC", "status": "ACTIVE"},
    {"ticker": "VST", "action": "SELL", "type": "Stop", "qty": 53, "stopPrice": 151.5, "tif": "GTC", "status": "ACTIVE"},
    {"ticker": "AMZN", "action": "SELL", "type": "Stop Limit", "qty": 30, "limitPrice": 224, "stopPrice": 234.39, "tif": "GTC", "status": "ACTIVE — EARNINGS WED APR 23 AMC"},
    {"ticker": "ABVX", "action": "SELL", "type": "Stop", "qty": 44, "stopPrice": 114.31, "tif": "GTC", "status": "ACTIVE — BELOW COST INTENTIONAL"},
    {"ticker": "ISRG", "action": "SELL", "type": "Stop", "qty": 22, "stopPrice": 443.86, "tif": "GTC", "status": "ACTIVE — DO NOT TOUCH PRE-EARNINGS TUE APR 21"},
    {"ticker": "MSFT", "action": "SELL", "type": "Stop", "qty": 25, "stopPrice": 400.43, "tif": "GTC", "status": "ACTIVE"},
    {"ticker": "CODA", "action": "SELL", "type": "Stop", "qty": 416, "stopPrice": 11.51, "tif": "GTC", "status": "ACTIVE — INTENTIONAL"},
    {"ticker": "RR", "action": "SELL", "type": "Stop Limit", "qty": 150, "stopPrice": 1150, "limitPrice": 1130, "tif": "GTC", "status": "ACTIVE — HARD LOCK UNTIL APR 23"},
    {"ticker": "R3NK", "action": "SELL", "type": "Stop Limit", "qty": 25, "limitPrice": 47, "stopPrice": 48, "tif": "GTC", "status": "ACTIVE"},
    {"ticker": "ITM", "action": "SELL", "type": "Stop Limit", "qty": 2000, "limitPrice": 98, "stopPrice": 100, "tif": "GTC", "status": "ACTIVE — 2,000 SHARES"},
    {"ticker": "LDO", "action": "BUY", "type": "Limit", "qty": 35, "limitPrice": 56, "tif": "GTC", "status": "PENDING"},
    {"ticker": "MP", "action": "BUY", "type": "Limit", "qty": 75, "limitPrice": 55, "tif": "GTC", "status": "ACTIVE"},
    {"ticker": "MP", "action": "SELL", "type": "Stop", "qty": 75, "stopPrice": 50, "tif": "GTC", "status": "ACTIVE"},
    {"ticker": "CRML", "action": "BUY", "type": "Limit", "qty": 40, "limitPrice": 10.50, "tif": "GTC", "status": "ACTIVE"},
    {"ticker": "CRML", "action": "SELL", "type": "Stop", "qty": 110, "stopPrice": 8.34, "tif": "GTC", "status": "ACTIVE"}
  ],
  "si39TierOneWatchlist": {
    "lastBatchPull": "2026-04-19",
    "tool": "EOD:get_us_live_extended_quotes",
    "batchSymbols": ["NVDA.US","META.US","GOOGL.US","AAPL.US","V.US","LLY.US","TSM.US","COST.US","ASML.US"],
    "note": "Run at EVERY session open — Section 0 BEFORE A-K. SI-45 weekly screener mandatory first session of each week.",
    "names": [
      {"ticker": "V", "52wkHigh": 375.51, "price": 315.72, "drawdown": -16.0, "trigger": -15, "triggerPrice": 319.18, "status": "TRIGGERED — BUY $307 GTC active."},
      {"ticker": "LLY", "52wkHigh": 1133.95, "price": 927.03, "drawdown": -18.2, "trigger": -20, "triggerPrice": 907.16, "status": "POSITION OPEN — 3 shares $905.01 stop $850."},
      {"ticker": "META", "52wkHigh": 796.25, "price": 671.13, "drawdown": -15.7, "trigger": -20, "triggerPrice": 637.00, "status": "MONITOR"},
      {"ticker": "AAPL", "52wkHigh": 288.62, "price": 266.13, "drawdown": -7.8, "trigger": -15, "triggerPrice": 245.33, "status": "MONITOR"},
      {"ticker": "GOOGL", "52wkHigh": 349.00, "price": 336.40, "drawdown": -3.6, "trigger": -18, "triggerPrice": 286.18, "status": "MONITOR"},
      {"ticker": "NVDA", "52wkHigh": 212.19, "price": 201.30, "drawdown": -5.1, "trigger": -25, "triggerPrice": 159.14, "status": "MONITOR"},
      {"ticker": "TSM", "52wkHigh": 390.21, "price": 370.62, "drawdown": -5.0, "trigger": -20, "triggerPrice": 312.17, "status": "MONITOR"},
      {"ticker": "COST", "52wkHigh": 1067.08, "price": 983.85, "drawdown": -7.8, "trigger": -15, "triggerPrice": 906.52, "status": "MONITOR"},
      {"ticker": "ASML", "52wkHigh": 1547.22, "price": 1476.59, "drawdown": -4.6, "trigger": -20, "triggerPrice": 1237.78, "status": "NOT DRAWDOWN PLAY"}
    ]
  },
  "si39TierTwoAIThesisWatchlist": {
    "addedSession": 24,
    "lastPull": "2026-04-19 (prices 2026-04-16 close)",
    "researchFile": "C:\\Users\\jcadb\\claude-fund\\research\\AI_INFRASTRUCTURE_THESIS.md",
    "note": "AI infrastructure thesis Tier 2 watchlist. Governed by SI-48 (ATH rule amendment). Stage 2 required before any entry. Monitor at every Section 0 scan alongside Tier 1.",
    "tier1Priorities": [
      {"ticker": "MU", "name": "Micron Technology", "priority": 1, "price": 454.20, "52wkHigh": 471.34, "drawdown": -3.6, "fwdPE": 7.86, "trigger": -15, "triggerPrice": 400.64, "thesisOneLine": "HBM memory supercycle — Q2 FY26 EPS $12.20 vs $8.42 guidance; Q3 guidance $19.15 EPS; HBM sold out through 2026", "nextEarnings": "2026-07-01 AMC", "si48Status": "PASSES scan — anomalous fwd PE, structural catalyst, no multiple expansion required", "stage2Questions": "LTA price/volume flex vs take-or-pay? Memory cycle history vs HBM custom-design argument?", "status": "STAGE 2 PRIORITY #1"},
      {"ticker": "HPE", "name": "Hewlett Packard Enterprise", "priority": 2, "price": 26.44, "52wkHigh": 26.44, "drawdown": 0.0, "fwdPE": 10.74, "trigger": "SI-48 enables now OR -10% = $23.80", "thesisOneLine": "At ATH but fwd PE 10.74 (cheapest AI name); Juniper acquired, $5B AI backlog, $600M synergy target", "nextEarnings": "Early June 2026 Q2 FY26", "si48Status": "PASSES scan — cheap multiple + contracted backlog + earnings-growth-driven upside", "stage2Questions": "AI backlog customer composition? Juniper synergy timeline? Memory cost exposure?", "status": "STAGE 2 PRIORITY #2 — SI-48 enables entry at current levels pending verification"},
      {"ticker": "SNPS", "name": "Synopsys", "priority": 3, "price": 449.00, "52wkHigh": 651.73, "drawdown": -31.1, "fwdPE": 30.58, "trigger": "Already triggered — at -31%", "thesisOneLine": "EDA duopoly toll on all chip design (31% market share); China export shock selloff; structural 60% GM", "nextEarnings": "Mid-May 2026 approximate", "si48Status": "N/A — already drawn down, standard SI-39 trigger satisfied", "stage2Questions": "Ansys integration timeline? China revenue detail (~16%)? Fwd PE vs sustainable growth?", "status": "STAGE 2 PRIORITY #3"}
    ],
    "tier2Priorities": [
      {"ticker": "CRDO", "name": "Credo Technology", "priority": 4, "price": 159.70, "52wkHigh": 213.80, "drawdown": -25.3, "fwdPE": 32.47, "thesisOneLine": "AEC (Active Electrical Cable) pioneer, FY26 +170% growth, 4 hyperscaler customers >10%", "criticalRisk": "Top 10 customers = 90% of revenue, single customer 67% in FY25", "status": "STAGE 2 — size at SI-37 speculative cap given concentration risk"},
      {"ticker": "ENR.DE", "name": "Siemens Energy", "priority": 5, "price": "~€157.50", "52wkHigh": "TBD Stage 2", "fwdPE": "TBD Stage 2", "thesisOneLine": "EU grid/turbine at ~60% discount to GE Vernova P/E multiple; AI-linked demand replacing wind", "accessNote": "IBKR EU access approved 2026-03-26", "status": "STAGE 2 — size at half normal position for FX and less familiar market"},
      {"ticker": "MRCY", "name": "Mercury Systems", "priority": 6, "price": 84.45, "52wkHigh": 103.84, "drawdown": -18.7, "fwdPE": 56.50, "thesisOneLine": "Defense AI edge compute; overlaps Golden Dome thesis", "concern": "Fwd PE 56 needs Stage 2 validation — possible P13/PLTR trap", "status": "STAGE 2 — fwd PE concern"}
    ],
    "tier3Speculative": [
      {"ticker": "POET", "name": "POET Technologies", "priority": 7, "price": 7.23, "marketCap": "$1.1B", "drawdown": -23.2, "thesisOneLine": "Silicon photonics Optical Interposer — one of few public CPO pure-plays", "reality": "Pre-revenue (Q3 2025 revenue $298K, net loss $9.4M); $5.6M initial production orders", "cashRunway": ">$300M post recent raise, multi-year", "sizing": "SI-37 speculative cap, max $1,000 — pure optionality", "status": "STAGE 2 — binary outcome, only if speculative allocation available"}
    ],
    "doNotEnter": [
      {"ticker": "SMCI", "reason": "T8 blocked — Hindenburg short-seller attack, accounting"},
      {"ticker": "CRWV", "reason": "Debt-heavy neocloud, customer concentration, -37.5% drawdown reflects structural issues"},
      {"ticker": "PLTR", "reason": "P6 blocked — presidential Truth Social entry failed, -$1,307 realised"},
      {"ticker": "IONQ/RGTI/QBTS", "reason": "Quantum — not inference/training infrastructure"},
      {"ticker": "NBIS", "reason": "Neocloud PE 1442 too speculative"},
      {"ticker": "KULR", "reason": "Microcap, -82% drawdown, broken chart"},
      {"ticker": "LWLG", "reason": "At ATH, no revenue model proven"}
    ],
    "failedSI48": [
      {"ticker": "VRT", "reason": "Fwd PE 51.8 — thesis requires multiple expansion (PLTR trap)"},
      {"ticker": "PRY.MI", "reason": "+157% YoY gain, multiple-expansion driven"},
      {"ticker": "ALAB", "reason": "Fwd PE 72.5 even after -34% drawdown"},
      {"ticker": "GEV", "reason": "Fwd PE 67 at ATH — stretched"}
    ],
    "speculativeAllocationConcern": "Current speculative = AMPX $3,042 + CODA $4,994 + PDYN $1,649 + CRML $999 + CGCT $2,994 = $13,678 (~13% NAV). Any POET entry requires trim decision first."
  },
  "priceVerificationProtocol": {
    "title": "MANDATORY BEFORE ANY PRICE-BASED RECOMMENDATION — SI-1 + SI-40 + SI-44 + SI-49",
    "currentPriceUS": "MMD /v2/aggs/ticker/{TICKER}/prev — use field 'c'. Primary source.",
    "52wkRangeUS": "EOD:get_us_live_extended_quotes — fiftyTwoWeekHigh/Low. ONLY authorised source.",
    "currentPriceEUUK": "web_fetch Yahoo Finance. MEMORY FORBIDDEN.",
    "fundamentalsUS": "Alpha:INCOME_STATEMENT, Alpha:EARNINGS, Alpha:EARNINGS_ESTIMATES, Alpha:EARNINGS_CALL_TRANSCRIPT",
    "secFilings": "data.sec.gov/api/xbrl/companyfacts/CIK{10-digit}.json — FREE, no key",
    "fundamentalsEUUK": "stockanalysis.com/stocks/{ticker}/financials/ via web_fetch",
    "memoryForbidden": "MEMORY ESTIMATES FOR ANY PRICE OR FUNDAMENTAL DATA ARE FORBIDDEN.",
    "stage2Required": "SI-44 + SI-49 reaffirmed S24 — consult SI-49 routing table before every Stage 2 session"
  },
  "cDriveProtocol": {
    "confirmed": "2026-04-19 SESSION 24 SUPP",
    "readAccess": true,
    "writeAccess": true,
    "tools": ["filesystem:read_text_file", "filesystem:write_file", "filesystem:edit_file", "filesystem:list_directory", "filesystem:list_allowed_directories", "filesystem:create_directory"],
    "allowedPaths": ["C:\\Users\\jcadb\\claude-fund", "C:\\Users\\jcadb\\Claude Date File"],
    "sessionOpenReads": ["C:\\Users\\jcadb\\claude-fund\\state\\FUND_SESSION_STATE.md", "C:\\Users\\jcadb\\claude-fund\\state\\LESSONS_LEARNED.md"],
    "thesisResearchFiles": ["C:\\Users\\jcadb\\claude-fund\\research\\AI_INFRASTRUCTURE_THESIS.md (S24 — 40+ AI candidates)"]
  },
  "standingInstructions": [
    {"id": 1, "title": "FULL SCAN PROTOCOL — SI-14 v4.0", "body": "SECTION 0 (SI-39): EOD batch 9 Tier 1 names + AI Tier 2 watchlist. Drawdown check. BEFORE A-K.\nSECTION A: Position health table.\nSECTION B: Individual thesis review.\nSECTION C: Pending orders review.\nSECTION D: Stop analysis.\nSECTION E: SI-39 drawdown scanner.\nSECTION F: SI-45 weekly broad screener.\nSECTION G: Geopolitical thesis.\nSECTION H: Thesis integrity.\nSECTION I: Macro update.\nSECTION J: Upcoming catalysts.\nSECTION K: Sector threat monitor + AI news check."},
    {"id": 2, "title": "IBKR SCREENSHOTS — GROUND TRUTH", "body": "IBKR screenshot overrides ALL other sources."},
    {"id": 3, "title": "POSITION SIZING — SI-35", "body": "Max loss per trade: $500. SI-37 speculative cap: $1,500."},
    {"id": 4, "title": "TIMEZONE", "body": "UAE = UTC+4. NYSE open 13:30 UAE, close 00:00 UAE. LSE open 12:00 UAE, close 20:30 UAE. IBIS open 10:00 UAE, close 18:30 UAE."},
    {"id": 14, "title": "FULL SCAN = SI-14 SECTIONS 0 + A-K (v4.0)", "body": "Section 0 runs FIRST including AI Tier 2 watchlist. Section F (SI-45) mandatory first session of each week."},
    {"id": 17, "title": "ERROR TAXONOMY — 14 TYPES", "body": "E1-E14. E9: GTC orphan. E14: Journal date discrepancy."},
    {"id": 19, "title": "STOPPED OUT / CLOSED POSITIONS — SI-19", "body": "ONDS -$601. KTOS -$1,601. CCL +$122. UEC -$127. IAG.L +£326. RCL -$132. LDO.MI (first) +€21.52. LEU -$238. PLTR -$1,307 (P6 governing lesson). PDYN partial +$17.42. AVAV +$71.38. ITM TRIM +£652. LNG -$396.54. PATK +$9.34 (P17). NOG: sell cancelled S24."},
    {"id": 20, "title": "BTC POSITION — ENTRY RULES", "body": "BTC target $55K. IBKR Paxos spot. 5-7.5% NAV."},
    {"id": 21, "title": "ITM POWER — ENTRY RULES", "body": "Now 2,000 shares. Stop 100p/98p GTC. Target 1: 130p. Target 2: 160p."},
    {"id": 24, "title": "CASH FLOOR — 10% RULE", "body": "Floor = 10% of NL. At $105,600 NL, floor = $10,560."},
    {"id": 25, "title": "SI-25 EXIT TRIGGER — OIL BASED NOT CEASEFIRE BASED", "body": "EXIT TRIGGER: Formal PERMANENT Hormuz reopening + WTI -10% from peak. Oil condition met. Reopening: NOT met — re-closed Apr 18. SI-25 NOT TRIGGERED."},
    {"id": 26, "title": "SECTOR THREAT MONITOR — SECTION K", "body": "10 sectors tracked including AI/CLOUD with mandatory AI news check."},
    {"id": 34, "title": "TRADE TRACKER UPDATE PROTOCOL", "body": "5 rows pending. See I7 in LESSONS_LEARNED.md"},
    {"id": 35, "title": "DOLLAR-RISK SIZING — SI-35", "body": "Max loss per trade: $500."},
    {"id": 36, "title": "MINIMUM 2:1 R:R FILTER", "body": "Min R:R to enter: 2.0:1. Exemption: tactical binary <$2,000 at 1.5:1 min."},
    {"id": 37, "title": "SPECULATIVE CAP — $1,500 MAX", "body": "Hard cap $1,500. AMPX $3,042 grandfathered. CODA $4,994 grandfathered. Current spec allocation ~13% NAV."},
    {"id": 39, "title": "SI-39: UNDERVALUED US LARGE CAP SCANNER — SECTION 0", "body": "TIER 1: 9 names with specific triggers. TIER 2 (NEW S24): AI thesis watchlist with SI-48 override available. Max per position: $4,000. Max aggregate: 20% NAV."},
    {"id": 40, "title": "52-WEEK DATA PROTOCOL", "body": "US 52wk: EOD:get_us_live_extended_quotes only. EU/UK: Yahoo Finance. Memory forbidden. Full routing: SI-49."},
    {"id": 41, "title": "CATALYST-ANCHORED ENTRY REQUIREMENT", "body": "Before entry: (A) Earnings within 8 weeks OR (B) Contract award within 8 weeks OR (C) Technical confirmation OR (D) Structural value below sector median."},
    {"id": 42, "title": "SI-42: BROKEN THESIS EXIT DISCIPLINE", "body": "When PRIMARY thesis driver impaired + position within 5% of breakeven → EXIT at market on next open."},
    {"id": 43, "title": "CASH DEPLOYMENT TRIGGERS", "body": "Cash ~$28,234. Floor $10,560. Deployable ~$17,674."},
    {"id": 44, "title": "SI-44: TWO-STAGE RESEARCH PROTOCOL", "body": "STAGE 1 = scan candidate only. All figures UNVERIFIED. STAGE 2 = mandatory before capital: primary-source verification via SI-49 routing. HARD RULE: No scan-phase figure in a recommendation without primary source verification."},
    {"id": 45, "title": "SI-45: WEEKLY BROAD US MARKET SCREENER", "body": "Run EVERY first session of trading week. EOD:stock_screener. Non-negotiable."},
    {"id": 46, "title": "P17 — PATK M&A TIP ENTRY ERROR", "body": "No entry on any M&A play until: (1) target fully analysed, (2) deal terms/probability/R:R logged, (3) joint entry decision confirmed."},
    {"id": 47, "title": "SI-47: DATE VERIFICATION PROTOCOL — STEP ZERO", "body": "System prompt date is authoritative. Never override with session inference. State weekday + full date + market open times in UAE at start of every session before any analysis. All action items must include explicit calendar dates."},
    {"id": 48, "title": "SI-48: AI THESIS ATH RULE AMENDMENT (NEW S24)", "body": "SCOPE: AI infrastructure thesis candidates ONLY. Does not modify P13 for any other thesis.\n\nRULE: For AI-thesis-tagged candidate at or near 52wk high, entry may proceed WITHOUT SI-39 drawdown trigger if ALL FOUR tests pass in Stage 2:\n1. Valuation reasonable: Fwd PE below sector median OR PEG < 1.5\n2. Structural catalyst path: Multi-year contracted backlog, LTAs, or order book visibility beyond next earnings\n3. No multiple expansion required: Upside from earnings growth alone\n4. PLTR P6 test: If primary case is 'narrative will continue' → REJECT\n\nCONSTRAINTS: SI-41 (8-week catalyst) applies. SI-37 ($1,500 spec cap) applies. SI-35 (dollar-risk) applies. Position size REDUCED vs drawdown entry for lower margin of safety.\n\nDOCUMENTATION: Four tests must be explicitly logged in journal entry before SI-48 entry.\n\nCURRENT SI-48 CANDIDATES (S24 scan): HPE ($26.44 at ATH, fwd PE 10.74) passes all four tests; MU ($454.20 -3.6%, anomalous fwd PE) passes; ETN/AVGO borderline.\n\nEXPLICITLY FAILS SI-48: VRT (fwd PE 51.8), PRY.MI (+157% YoY), ALAB (fwd PE 72.5), GEV (fwd PE 67) — all require multiple expansion to work.\n\nGOVERNING LESSON: P6 (PLTR -$1,307 realised loss) — narrative/multiple expansion entries have failed before and will fail again."},
    {"id": 49, "title": "SI-49: STAGE 2 DATA STACK ROUTING PROTOCOL (NEW S24)", "body": "Authoritative guide — which connected tool for each data need. Consult BEFORE every Stage 2 session. Prevents E12 (tool routing gap).\n\nPRICE — US:\n• Current price: MMD /v2/aggs/ticker/{T}/prev field 'c'\n• 52wk high/low: EOD:get_us_live_extended_quotes — ONLY authorised source\n• Historical OHLCV: EOD:get_historical_stock_prices or Alpha:TIME_SERIES_DAILY_ADJUSTED\n• Batch prices: EOD:get_us_live_extended_quotes (up to 100 tickers)\n\nPRICE — EU/UK:\n• Current + 52wk: web_fetch Yahoo Finance. MEMORY FORBIDDEN.\n• Historical: web_fetch stockanalysis.com\n\nFUNDAMENTALS — US STAGE 2 (ALL CONNECTED VIA ALPHA VANTAGE):\n• Income statement: Alpha:INCOME_STATEMENT\n• Balance sheet: Alpha:BALANCE_SHEET\n• Cash flow: Alpha:CASH_FLOW\n• Company overview + ratios: Alpha:COMPANY_OVERVIEW\n• Earnings history + EPS surprise: Alpha:EARNINGS\n• EPS estimates + revision history: Alpha:EARNINGS_ESTIMATES\n• EARNINGS CALL TRANSCRIPT: Alpha:EARNINGS_CALL_TRANSCRIPT (15yr — MANDATORY FOR STAGE 2)\n• Institutional holders (13F): Alpha:INSTITUTIONAL_HOLDINGS\n• Insider transactions: Alpha:INSIDER_TRANSACTIONS\n• News + sentiment scored: Alpha:NEWS_SENTIMENT\n\nSEC FILINGS — FREE, NO API KEY REQUIRED:\n• All financial facts (XBRL): web_fetch data.sec.gov/api/xbrl/companyfacts/CIK{10-digit-padded}.json\n• Filing list: web_fetch data.sec.gov/submissions/CIK{10-digit}.json\n• Full-text search: web_fetch efts.sec.gov/LATEST/search-index?q={term}\n• CIKs: MU=0000723125 | HPE=0001645590 | SNPS=0000883241 | AMZN=0001018724 | MSFT=0000789019 | NVDA=0001045810\n\nFUNDAMENTALS — EU/UK STAGE 2:\n• Financials/ratios: web_fetch stockanalysis.com/stocks/{ticker}/financials/\n• 20yr ratio history: web_fetch macrotrends.net\n• Analyst estimates: web_fetch Yahoo Finance /analysis/\n\nCHARTING — MANDATORY FOR EVERY STAGE 2 CANDIDATE:\n• Pull Alpha:TIME_SERIES_DAILY_ADJUSTED then render with Visualizer tool\n• Include 1yr price, 50d/200d MA, key events marked\n\nMACRO — US:\n• Alpha:REAL_GDP | Alpha:CPI | Alpha:FEDERAL_FUNDS_RATE | Alpha:TREASURY_YIELD\n• Alpha:UNEMPLOYMENT | Alpha:NONFARM_PAYROLL | EOD:get_macro_indicator (non-US)\n\nCOMMODITIES / FX:\n• Alpha:WTI | Alpha:BRENT | Alpha:GOLD_SILVER_SPOT | Alpha:CURRENCY_EXCHANGE_RATE\n\nOPTIONS:\n• Alpha:REALTIME_OPTIONS | Alpha:REALTIME_PUT_CALL_RATIO | Alpha:HISTORICAL_OPTIONS\n\nSCREENING:\n• US broad: EOD:stock_screener | SQL on price data: MMD store_as + query_data\n• Top gainers/losers: Alpha:TOP_GAINERS_LOSERS\n\nSHORT INTEREST: web_fetch FINRA (bi-monthly, free, no key)\n\nGENUINE GAPS (no free solution):\n• EU/UK earnings transcripts — web_fetch Motley Fool or company IR pages\n• Real-time options flow — no good free source; not relevant to current strategy\n• Credit market data — Bloomberg only; not needed currently"}
  ],
  "watchlistUS": [
    {"ticker": "NFLX", "name": "Netflix Inc", "exchange": "NASDAQ", "status": "STAGE 1 CANDIDATE — DO NOT ENTER — SI-41 FAIL", "currentPrice": 97.31, "52wkHigh": 134.12, "drawdown": -27.4, "note": "SI-41 FAIL: next earnings Jul 16 — outside 8-week window."},
    {"ticker": "V", "name": "Visa Inc", "exchange": "NYSE", "status": "ACTIVE — BUY LIMIT $307 GTC — SI-39 TRIGGERED", "currentPrice": 315.72, "52wkHigh": 375.51, "drawdown": -16.0, "note": "Earnings Apr 28 AMC."},
    {"ticker": "NOG", "name": "Northern Oil & Gas", "exchange": "NYSE", "status": "HELD — SELL CANCELLED S24 — HORMUZ RE-CLOSED", "note": "NO STOP — resubmit $22.50 GTC Monday Apr 20 first action. Apr 30 Q1 earnings."},
    {"ticker": "SLV", "name": "iShares Silver Trust", "exchange": "NYSE", "status": "FULLY CANCELLED — BOTH LEGS REMOVED", "note": "BUY $70 cancelled S24. SELL stop $63 cancelled S23."},
    {"ticker": "TLN", "name": "Talen Energy Corp", "exchange": "NASDAQ", "status": "WATCH — SI-44 STAGE 2 REQUIRED — POST MAY 5 EARNINGS", "currentPrice": 353.30, "52wkHigh": 451.28, "drawdown": -21.7, "note": "Nuclear + Amazon PPA 1,920 MW. May 5 earnings = gate."},
    {"ticker": "CEG", "name": "Constellation Energy Corp", "exchange": "NASDAQ", "status": "WATCH — SI-44 STAGE 2 REQUIRED", "currentPrice": 295.18, "52wkHigh": 412.70, "drawdown": -28.5, "note": "Pure-play US nuclear. Meta + Microsoft PPAs."},
    {"ticker": "OXY", "name": "Occidental Petroleum", "exchange": "NYSE", "status": "WATCH — REASSESS POST WTI STABILISATION", "note": "Reassess Monday after WTI open."},
    {"ticker": "BKR", "name": "Baker Hughes", "exchange": "NYSE", "status": "WATCH — EARNINGS WED APR 22 — POST-RESULTS ONLY", "note": "Post-earnings entry zone $58.50."},
    {"ticker": "RTX", "name": "RTX Corporation", "exchange": "NYSE", "status": "WATCH ONLY — Re-entry $185-190 on peace deal selloff", "note": "Earnings Tuesday Apr 21."},
    {"ticker": "KTOS", "name": "Kratos Defense", "exchange": "NASDAQ", "status": "WATCH — REENTRY $62-67", "note": "Entry only on dip to $62-67."},
    {"ticker": "BTC", "name": "Bitcoin — IBKR Paxos spot", "exchange": "IBKR", "status": "WATCH — $55K target", "currentPrice": 70700, "note": "5-7.5% NAV via IBKR Paxos. Entry $55K. No order placed."}
  ],
  "watchlistEU": [
    {"ticker": "LDO.MI", "name": "Leonardo SpA", "exchange": "BVME", "cur": "EUR", "current": 56.00, "note": "BUY LIMIT €56 GTC active. May 5 earnings."},
    {"ticker": "R3NK", "name": "RENK Group AG", "exchange": "IBIS", "cur": "EUR", "current": 54.68, "note": "IN PORTFOLIO. Q1 May 6."},
    {"ticker": "ITM.L", "name": "ITM Power PLC", "exchange": "LSE", "cur": "GBP", "current": 131.50, "note": "IN PORTFOLIO. 2,000 shares."},
    {"ticker": "RR.L", "name": "Rolls-Royce Holdings", "exchange": "LSE", "cur": "GBP", "current": 1310.60, "note": "IN PORTFOLIO. HARD LOCK until Wednesday Apr 23 ex-div."},
    {"ticker": "CWR.L", "name": "Ceres Power", "exchange": "LSE", "cur": "GBP", "note": "Entry 250-270p only."},
    {"ticker": "ALFEN.AS", "name": "Alfen NV", "exchange": "AMS", "cur": "EUR", "note": "May 12 earnings."},
    {"ticker": "ENR.DE", "name": "Siemens Energy AG", "exchange": "XETRA", "cur": "EUR", "current": "~€157.50", "note": "AI THESIS TIER 2 #5 — EU grid/turbine at ~60% discount to GEV; IBKR EU access enabled; Stage 2 priority; see AI_INFRASTRUCTURE_THESIS.md"},
    {"ticker": "SU.PA", "name": "Schneider Electric", "exchange": "XPAR", "cur": "EUR", "current": "€278.65", "note": "AI thesis adjacent — at ATH (-1.0%), earnings April 30 catalyst. Stage 2 for SI-48 case."}
  ],
  "sessionNotes": [
    {"date": "2026-04-18", "note": "SESSION 23 — Saturday. LNG stopped -$396.54. NOG filled $24.37. ITM trim +£652. SLV cancelled. NFLX Stage 1. Journal v32."},
    {"date": "2026-04-19", "note": "SESSION 24 — Sunday. HORMUZ RE-CLOSED Saturday Apr 18 by IRGC. NOG sell (DAY market) cancelled. SLV BUY $70 cancelled. SI-47 date protocol added. NOG has NO stop — first action Monday Apr 20 is resubmit $22.50 GTC."},
    {"date": "2026-04-19", "note": "SESSION 24 SUPPLEMENTARY — AI INFRASTRUCTURE THESIS DEEP DIVE. Full Stage 1 research in research/AI_INFRASTRUCTURE_THESIS.md. Tier 1 Stage 2 priorities: MU → HPE → SNPS. SI-48 added. Journal v34 written."},
    {"date": "2026-04-19", "note": "SESSION 24 SUPPLEMENTARY (2) — SI-49 DATA STACK ROUTING PROTOCOL added and locked. Alpha Vantage earnings transcripts, institutional holders, estimates confirmed as connected and mandatory for Stage 2. EDGAR free API (data.sec.gov) locked in with known CIKs. EU/UK gap addressed via stockanalysis.com + macrotrends.net. Charts via Visualizer now mandatory for every Stage 2 candidate. Journal v35 written."}
  ]
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
            <div style={{ fontSize: 18, fontWeight: 700, color: COLORS.textBright }}>CLAUDE FUND — JOURNAL v35</div>
            <div style={{ fontSize: 11, color: COLORS.textDim, marginTop: 2 }}>Session {data.sessionNumber} SUPP | {data.fund.account} | {data.lastUpdated}</div>
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
        <div style={{ marginTop: 6, padding: "6px 10px", background: "rgba(163,113,247,0.1)", border: "1px solid rgba(163,113,247,0.3)", borderRadius: 4, fontSize: 11, color: COLORS.purple }}>
          🧠 SI-49 DATA STACK PROTOCOL ACTIVE — Alpha transcripts/estimates/EDGAR CIKs locked in. Charts mandatory Stage 2. MU→HPE→SNPS queue.
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

      {activeTab === "aiwatch" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <div className="card" style={{ borderColor: COLORS.purple, borderLeftWidth: 3 }}>
            <div style={{ fontWeight: 700, color: COLORS.purple, fontSize: 13, marginBottom: 6 }}>AI INFRASTRUCTURE THESIS WATCHLIST (S24)</div>
            <div style={{ fontSize: 11, color: COLORS.textDim, lineHeight: 1.6 }}>
              Governed by SI-48 (ATH amendment) + SI-49 (data routing). Stage 2 required before any entry. Full research: C:\Users\jcadb\claude-fund\research\AI_INFRASTRUCTURE_THESIS.md
            </div>
          </div>
          <div style={{ fontWeight: 600, color: COLORS.accent, fontSize: 12 }}>TIER 1 — STAGE 2 PRIORITY</div>
          {data.si39TierTwoAIThesisWatchlist?.tier1Priorities?.map(w => (
            <div key={w.ticker} className="card" style={{ borderLeft: `3px solid ${COLORS.purple}` }}>
              <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap", marginBottom: 6 }}>
                <span style={{ fontWeight: 700, color: COLORS.textBright }}>#{w.priority} {w.ticker}</span>
                <span style={{ fontSize: 11, color: COLORS.textDim }}>{w.name}</span>
                <span className="badge badge-purple">Fwd PE {w.fwdPE}</span>
                <span className={`badge ${w.drawdown < -15 ? "badge-red" : w.drawdown < -5 ? "badge-amber" : "badge-grey"}`}>{w.drawdown}% from ATH</span>
              </div>
              <div style={{ fontSize: 11, color: COLORS.text, marginBottom: 4 }}><b>Thesis:</b> {w.thesisOneLine}</div>
              <div style={{ fontSize: 11, color: COLORS.textDim, marginBottom: 4 }}><b>Next earnings:</b> {w.nextEarnings}</div>
              <div style={{ fontSize: 11, color: COLORS.yellow, marginBottom: 4 }}><b>SI-48:</b> {w.si48Status}</div>
              <div style={{ fontSize: 10, color: COLORS.textDim }}><b>Stage 2 Qs:</b> {w.stage2Questions}</div>
              <div style={{ fontSize: 10, color: COLORS.accent, marginTop: 4 }}>{w.status}</div>
            </div>
          ))}
          <div style={{ fontWeight: 600, color: COLORS.accent, fontSize: 12, marginTop: 8 }}>TIER 2</div>
          {data.si39TierTwoAIThesisWatchlist?.tier2Priorities?.map(w => (
            <div key={w.ticker} className="card">
              <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap", marginBottom: 6 }}>
                <span style={{ fontWeight: 700 }}>#{w.priority} {w.ticker}</span>
                <span style={{ fontSize: 11, color: COLORS.textDim }}>{w.name}</span>
              </div>
              <div style={{ fontSize: 11, color: COLORS.text, marginBottom: 4 }}>{w.thesisOneLine}</div>
              {w.criticalRisk && <div style={{ fontSize: 10, color: COLORS.red }}>⚠️ {w.criticalRisk}</div>}
              {w.concern && <div style={{ fontSize: 10, color: COLORS.yellow }}>⚠️ {w.concern}</div>}
              <div style={{ fontSize: 10, color: COLORS.accent, marginTop: 4 }}>{w.status}</div>
            </div>
          ))}
          <div style={{ fontWeight: 600, color: COLORS.accent, fontSize: 12, marginTop: 8 }}>TIER 3 — SPECULATIVE (SI-37 CAP)</div>
          {data.si39TierTwoAIThesisWatchlist?.tier3Speculative?.map(w => (
            <div key={w.ticker} className="card" style={{ borderLeft: `3px solid ${COLORS.yellow}` }}>
              <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap", marginBottom: 6 }}>
                <span style={{ fontWeight: 700 }}>#{w.priority} {w.ticker}</span>
                <span style={{ fontSize: 11, color: COLORS.textDim }}>{w.name}</span>
                <span className="badge badge-amber">SPECULATIVE</span>
              </div>
              <div style={{ fontSize: 11, color: COLORS.text, marginBottom: 4 }}>{w.thesisOneLine}</div>
              <div style={{ fontSize: 10, color: COLORS.red, marginBottom: 4 }}><b>Reality:</b> {w.reality}</div>
              <div style={{ fontSize: 10, color: COLORS.yellow }}><b>Sizing:</b> {w.sizing}</div>
            </div>
          ))}
          <div style={{ fontWeight: 600, color: COLORS.red, fontSize: 12, marginTop: 8 }}>DO NOT ENTER</div>
          {data.si39TierTwoAIThesisWatchlist?.doNotEnter?.map((w, i) => (
            <div key={i} className="card" style={{ borderLeft: `3px solid ${COLORS.red}`, padding: 8 }}>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <span style={{ fontWeight: 700, color: COLORS.red }}>{w.ticker}</span>
                <span style={{ fontSize: 11, color: COLORS.textDim }}>{w.reason}</span>
              </div>
            </div>
          ))}
          <div style={{ fontWeight: 600, color: COLORS.yellow, fontSize: 12, marginTop: 8 }}>FAILS SI-48</div>
          {data.si39TierTwoAIThesisWatchlist?.failedSI48?.map((w, i) => (
            <div key={i} className="card" style={{ borderLeft: `3px solid ${COLORS.yellow}`, padding: 8 }}>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <span style={{ fontWeight: 700, color: COLORS.yellow }}>{w.ticker}</span>
                <span style={{ fontSize: 11, color: COLORS.textDim }}>{w.reason}</span>
              </div>
            </div>
          ))}
          <div className="card" style={{ marginTop: 8, background: "rgba(248,81,73,0.05)", borderColor: "rgba(248,81,73,0.3)" }}>
            <div style={{ fontSize: 11, color: COLORS.red }}>⚠️ <b>Allocation concern:</b> {data.si39TierTwoAIThesisWatchlist?.speculativeAllocationConcern}</div>
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
                <span className={`badge ${w.status?.includes("CANCELLED") ? "badge-red" : w.status?.includes("ACTIVE") || w.status?.includes("HELD") ? "badge-green" : w.status?.includes("STAGE") ? "badge-amber" : "badge-grey"}`}>{w.status?.substring(0,40)}</span>
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
            <div key={ins.id} className="card" style={{ display: "flex", gap: 12, borderLeft: ins.id === 49 ? `3px solid ${COLORS.blue}` : ins.id === 48 ? `3px solid ${COLORS.purple}` : ins.id === 47 ? `3px solid ${COLORS.red}` : ins.id === 44 ? `3px solid ${COLORS.blue}` : ins.id === 25 ? `3px solid ${COLORS.red}` : undefined }}>
              <div style={{ fontSize: 11, color: ins.id === 49 ? COLORS.blue : ins.id === 48 ? COLORS.purple : ins.id === 47 ? COLORS.red : ins.id >= 44 ? COLORS.blue : COLORS.accent, fontWeight: 700, minWidth: 28 }}>#{ins.id.toString().padStart(2,"0")}</div>
              <div>
                <div style={{ fontWeight: 600, color: ins.id === 49 ? COLORS.blue : ins.id === 48 ? COLORS.purple : ins.id === 47 ? COLORS.red : ins.id >= 44 ? COLORS.blue : COLORS.textBright, marginBottom: 4, fontSize: 12 }}>{ins.title}</div>
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
        <span style={{ fontSize: 10, color: COLORS.textDim }}>JOURNAL v35 // SESSION 24 SUPP // {data.fund.account} // SI-49 DATA STACK PROTOCOL ACTIVE</span>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <span className="badge badge-amber">EU ACCESS: APPROVED</span>
          <span className="badge badge-red">CONFLICT: ACTIVE</span>
          <span className="badge badge-red">HORMUZ: RE-CLOSED</span>
          <span className="badge badge-amber">SI-25: ELEVATED ALERT</span>
          <span className="badge badge-red">NOG: NO STOP — RESUBMIT MON APR 20</span>
          <span className="badge badge-blue">SI-47 DATE PROTOCOL</span>
          <span className="badge badge-purple">SI-48 AI THESIS RULE</span>
          <span className="badge badge-blue">SI-49 DATA STACK</span>
        </div>
      </div>
    </div>
  );
}
