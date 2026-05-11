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
  "lastUpdated": "2026-04-18",
  "sessionNumber": 23,
  "fund": {
    "account": "U24936508",
    "netLiquidity": 105600,
    "cash": 28234,
    "availableFunds": 83700,
    "dailyPnL": 1880.36,
    "unrealizedPnL": 7808.90,
    "realizedPnL": 495.38,
    "broker": "IBKR Pro",
    "baseCurrency": "USD",
    "location": "UAE",
    "ibkrEuropeanAccess": "APPROVED — March 26 2026",
    "cashUSD": 33853,
    "cashEUR": -937,
    "cashGBP": -2120,
    "cashBase": 29885,
    "cashFloorRule": "10% of NL = $10,560 minimum. NEVER go below.",
    "lastUpdated": "2026-04-18 SESSION 23 CLOSE — JOURNAL v32",
    "note": "JOURNAL v32 — SESSION 23 CLOSE (Saturday 18 Apr 2026). IBKR trades tab reconciled. CONFIRMED FILLS: LNG stopped at $248.00, loss -$396.54 (IBKR confirmed). ITM trim 1,100 shares @ 124.60p +£652 confirmed. NOG filled $24.37 (IBKR confirmed). CGCT 291 shares @ $10.29 confirmed. R3NK avg corrected to €52.15 (IBKR ground truth). PATK: 25 bought $108.80, 25 sold $109.256, +$9.34 — undocumented M&A tip trade, entered before analysis complete, immediately closed. Lesson P17 added. NFLX flagged as SI-45 catch: -27.4% from 52wk high ($134.12→$97.31), earnings miss soft guidance, Hastings exit. Stage 1 only — fails SI-41 (next earnings Jul 16, outside 8-week window). DO NOT ENTER this week. SI-25 STATUS: Hormuz declared open by Iran for ceasefire duration only. US blockade of Iranian ports CONTINUES. Iran parliament: will not stay open if blockade persists. NOT a formal permanent reopening — SI-25 remains on ELEVATED ALERT but NOT TRIGGERED. WTI fell 11.45% Friday to $83.85. DECISIONS: SLV BUY cancelled (war premium thesis removed). NOG market sell submitted for Monday open, stop $22.50 cancelled (E9 confirmed). CRML thesis confirmed INDEPENDENT of Hormuz — US critical minerals vs China supply chain structural play. CEASEFIRE EXPIRY DATE: journal says Apr 21, CBS News says Apr 22 — VERIFY MONDAY AGAINST 2+ PRIMARY SOURCES before any action. S22 CONFIRMED ACTIONS (carried): ITM trimmed to 2,000 shares. AMPX stop $15.79. RR.L stop 1150p/1130p SL. MSFT stop $400.43. CRML stop raised to $8.34. FULL SCAN completed S23. Weekly SI-45 screener flagged for Monday execution."
  },
  "thesis": {
    "title": "US NAVAL BLOCKADE OF IRANIAN PORTS ACTIVE — SI-25 ELEVATED ALERT — HORMUZ CONDITIONALLY OPEN CEASEFIRE ONLY",
    "summary": "SESSION 23 UPDATE: WTI $83.85 (-11.45% Friday) — SI-25 OIL CONDITION MET AND EXCEEDED (trigger $100.38, peak $111.54, now -24.9%). Formal permanent Hormuz reopening NOT confirmed — Iran declared open for ceasefire duration only, US blockade of Iranian ports remains in full force. Ceasefire expiry date DISPUTED: journal Apr 21, CBS News Apr 22 — VERIFY MONDAY. SI-25 dual-condition requires BOTH: formal permanent reopening CONFIRMED + oil -10% from peak. Oil condition met. Reopening condition: NOT met (conditional only). SI-25 NOT TRIGGERED. ALERT POSTURE ELEVATED.",
    "oilWTI": 83.85,
    "oilBrent": 87,
    "goldPrice": 4760,
    "hormuzStatus": "SESSION 23: Iran declared Hormuz 'completely open' for ceasefire duration only (Apr 17 1:18 PM UTC). US blockade of Iranian PORTS continues — Trump: 'blockade will remain in full force.' Iran parliament: 'will not stay open if blockade persists.' Only non-military vessels allowed, IRGC permission required, must use designated northerly route to avoid mines. Iran acknowledged mines still in water — mine clearance ongoing. NOT a formal permanent reopening. SI-25 ELEVATED ALERT — NOT TRIGGERED.",
    "ceasefireFilter": "SI-25 ELEVATED ALERT — OIL CONDITION EXCEEDED. WTI $83.85, peak $111.54, trigger $100.38 — MET AND EXCEEDED (-24.9%). Formal permanent Hormuz reopening NOT confirmed — ceasefire-linked declaration only, US port blockade active. CEASEFIRE EXPIRY: APR 21 (journal) vs APR 22 (CBS News) — VERIFY MONDAY WITH 2+ PRIMARY SOURCES. Both conditions required simultaneously for SI-25 to trigger.",
    "blockadeStatus": "US CENTCOM naval blockade of Iranian PORTS continues. Iran declared Hormuz open for ceasefire duration only. Iran parliament warned closure resumes if blockade persists. Sea mines remain in water — Iran lost track of some. USN mine clearance active (CODA catalyst). WTI $83.85 (-11.45% Friday on Hormuz announcement). Designated northerly route for vessels — not full freedom of navigation.",
    "keyDates": [
      {"date": "18 Apr (TODAY — S23)", "event": "SESSION 23 COMPLETE (Saturday). Reconciliation complete. LNG stop-out confirmed -$396.54. NOG market sell submitted Monday. SLV cancelled. NFLX flagged Stage 1. Journal v32 written.", "priority": "RESOLVED — SESSION 23 COMPLETE"},
      {"date": "21 Apr (Mon) OR 22 Apr (Wed)", "event": "CEASEFIRE EXPIRY — DATE DISPUTED. Journal says Apr 21, CBS News says Apr 22. VERIFY MONDAY WITH 2+ PRIMARY SOURCES BEFORE ANY ACTION. SI-25 dual trigger possible same day if formal permanent reopening announced.", "priority": "CRITICAL"},
      {"date": "21 Apr (Mon) AMC", "event": "ISRG Q1 2026 Earnings AMC — Stop $443.86. Watch: China da Vinci 5 placements, gross margin vs 67-68%, procedure volume. Do NOT tighten stop pre-earnings. Post-beat: raise stop to $455-460.", "priority": "CRITICAL"},
      {"date": "21 Apr (Mon) pre-mkt", "event": "RTX Q1 — watch only, no position. Re-entry $185-190 on peace deal selloff only.", "priority": "MONITOR"},
      {"date": "21 Apr (Mon) open", "event": "NOG market sell executes at open — 80 shares. Confirm fill. Log in trade tracker. Stop $22.50 already cancelled.", "priority": "CRITICAL"},
      {"date": "22 Apr (Tue)", "event": "BKR Q1 Earnings — post-earnings entry zone $58.50. Watch only.", "priority": "HIGH"},
      {"date": "23 Apr (Wed)", "event": "RR.L EX-DIVIDEND — ABSOLUTE HARD LOCK. DO NOT SELL BEFORE THIS DATE FOR ANY REASON.", "priority": "CRITICAL"},
      {"date": "23 Apr (Wed) AMC", "event": "AMZN Q1 Earnings — AWS growth rate, AI capex guidance. Stop $234.39/$224 Stop Limit live.", "priority": "CRITICAL"},
      {"date": "23 Apr (Wed)", "event": "SAP Q1 Earnings — cloud backlog. DO NOT enter SAP before this date.", "priority": "HIGH"},
      {"date": "28 Apr (Mon) AMC", "event": "V Q2 Earnings — BUY $307 limit still pending. Beat + volumes resilient → add 8 more shares Apr 29 open. Miss → exit below $295.", "priority": "CRITICAL"},
      {"date": "29 Apr (Tue) AMC", "event": "APH Q1 Earnings — reassess entry post-results. $138 order cancelled S21. New zone post-earnings.", "priority": "HIGH"},
      {"date": "29 Apr (Tue) AMC", "event": "MSFT Q3 FY2026 Earnings — Azure growth %, Copilot seats. Stop $400.43.", "priority": "CRITICAL"},
      {"date": "30 Apr (Wed)", "event": "NOG Q1 earnings — POSITION BEING CLOSED MONDAY. Monitor for re-entry thesis post-WTI stabilisation.", "priority": "MONITOR"},
      {"date": "~May 2026", "event": "CGCT BUSINESS COMBINATION CLOSE → FAC LISTING. POST-LISTING RULES NON-NEGOTIABLE: (1) >$12 → SELL 50%. (2) $10-12 → HOLD, stop $8.00. (3) <$10 → EXIT ENTIRELY.", "priority": "CRITICAL"},
      {"date": "5 May", "event": "TLN Q1 Earnings — key gate for entry decision. SI-44 Stage 2 mandatory before entry.", "priority": "CRITICAL"},
      {"date": "5 May", "event": "LDO.MI Q1 Earnings — first catalyst for pending buy.", "priority": "HIGH"},
      {"date": "6 May", "event": "R3NK Q1 Earnings — €200M deferred Q4 orders MUST appear.", "priority": "CRITICAL"},
      {"date": "7 May", "event": "AMPX Q1 Earnings", "priority": "MEDIUM"},
      {"date": "11 May", "event": "PLTR Q1 Earnings — Golden Dome + Maven POR. Reentry $120-130 on confirmed award.", "priority": "CRITICAL"},
      {"date": "13 May", "event": "VST + PDYN Earnings", "priority": "MEDIUM"},
      {"date": "16 Jul", "event": "NFLX Q2 2026 Earnings — Stage 1 candidate. Next catalyst gate for any entry consideration.", "priority": "MONITOR"},
      {"date": "30 Jul", "event": "RR.L H1 Earnings", "priority": "HIGH"},
      {"date": "17 Apr", "event": "SESSION 22 COMPLETE. CGCT entered. M&A scan done. Stop changes confirmed. ITM trim 1,100 @ 124.60p. SESSION 21: LLY entered $905.01. APH cancelled.", "priority": "RESOLVED"},
      {"date": "15 Apr", "event": "SESSION 20 COMPLETE. AVAV sold. ISRG stop corrected. SLV resubmitted.", "priority": "RESOLVED"}
    ]
  },
  "positions": [
    {
      "ticker": "NOG", "name": "Northern Oil and Gas Inc", "shares": 80,
      "avgPrice": 24.37, "costBasis": 1950, "last": 24.55, "marketVal": 1964,
      "unrealPnL": 14, "unrealPct": 0.7, "stop": null, "target": null,
      "status": "SELL SUBMITTED — MARKET ORDER MONDAY OPEN — STOP CANCELLED",
      "note": "FILLED S22/S23 at $24.37 avg (IBKR confirmed). Market sell submitted Monday Apr 21 open. Stop $22.50 CANCELLED (E9 confirmed). Thesis: oil war premium — REMOVED post-Hormuz conditional opening + WTI $83.85 (-11.45% Friday). Position near breakeven ($14 unrealised). Exit decision: thesis driver impaired, stop gap risk if WTI gaps further. Re-entry: watch $21.50-22.50 post-Hormuz digest + WTI stabilisation + Apr 30 earnings."
    },
    {
      "ticker": "CGCT", "name": "Cartesian Growth Corp III (Factorial Energy SPAC)", "shares": 291,
      "avgPrice": 10.29, "costBasis": 2994, "last": 10.30, "marketVal": 2997,
      "unrealPnL": 3, "unrealPct": 0.0, "stop": null, "target": null,
      "status": "HOLD — NO STOP (TRUST FLOOR ~$10.27) — PRE-CLOSE SPAC",
      "note": "291 shares confirmed IBKR trades tab (journal had 292 — corrected). Factorial Energy SPAC. Trust $10.27 floor. Deal close ~May 2026. POST-LISTING RULES: (1) >$12 → SELL 50%. (2) $10-12 → HOLD stop $8.00. (3) <$10 → EXIT. Tranche 2: $1,500 at $7.50-9.00 post-listing. Max exposure $4,500."
    },
    {
      "ticker": "CCJ", "name": "Cameco Corp", "shares": 49,
      "avgPrice": 104.021, "costBasis": 5097, "last": 120.66, "marketVal": 5912,
      "unrealPnL": 815, "unrealPct": 16.0, "stop": 108.37, "target": null,
      "status": "HOLD — STOP LIVE",
      "note": "Nuclear thesis structural — EU energy independence + global uranium demand. Stop $108.37 IBKR confirmed. Profit locked. Ceasefire/Hormuz does NOT reduce uranium demand."
    },
    {
      "ticker": "AMZN", "name": "Amazon.com Inc", "shares": 30,
      "avgPrice": 201.204, "costBasis": 6036, "last": 250.56, "marketVal": 7517,
      "unrealPnL": 1481, "unrealPct": 24.5, "stop": 234.39, "stopType": "Stop Limit", "stopLimit": 224, "target": 300,
      "status": "HOLD — STOP LIMIT LIVE",
      "note": "Stop $234.39/$224 Stop Limit GTC. Earnings Apr 23 AMC. AWS +24% last quarter, $100B capex guided 2026. Stop locks ~$1,000 profit."
    },
    {
      "ticker": "VST", "name": "Vistra Corp", "shares": 53,
      "avgPrice": 150.569, "costBasis": 7980, "last": 163.46, "marketVal": 8663,
      "unrealPnL": 683, "unrealPct": 8.6, "stop": 151.5, "target": null,
      "status": "HOLD — STOP LIVE",
      "note": "Stop $151.50 above cost. Earnings May 13. AI data centre power thesis intact. Independent of Hormuz."
    },
    {
      "ticker": "RR", "name": "Rolls-Royce Holdings", "shares": 150,
      "avgPrice": 1182.9, "costBasis": 1774, "last": 1310.60, "marketVal": 1966,
      "unrealPnL": 192, "unrealPct": 10.8, "stop": 1150, "stopType": "Stop Limit", "stopLimit": 1130, "target": 1600,
      "status": "HARD LOCK — NO SELL BEFORE APR 23 EX-DIV — STOP LIMIT 1150p/1130p", "cur": "GBP",
      "note": "EX-DIV APR 23 — ABSOLUTE HARD LOCK. Stop Limit 1150p/1130p GTC confirmed IBKR S22. After Apr 23: review stop, consider tightening to 1250p/1230p. H1 earnings Jul 30. Defence spending thesis intact — Hormuz partial opening does not impair RR thesis."
    },
    {
      "ticker": "ITM", "name": "ITM Power PLC", "shares": 2000,
      "avgPrice": 65.1, "costBasis": 1302, "last": 131.50, "marketVal": 2630,
      "unrealPnL": 1328, "unrealPct": 102.0, "stop": 100, "stopType": "Stop Limit", "stopLimit": 98, "target": 150,
      "status": "HOLD — STOP LIMIT 100p/98p GTC — TRIMMED S22 TO 2,000 SHARES", "cur": "GBP",
      "note": "S22: Trimmed 1,100 shares @ 124.60p, realised +£652. Now 2,000 shares (IBKR confirmed). Stop raised to 100p/98p Stop Limit GTC (IBKR confirmed S22). +102% unrealised. GBE equity package catalyst. Cash guidance raised £210-215M. Independent of Hormuz — green hydrogen thesis."
    },
    {
      "ticker": "AMPX", "name": "Amprius Technologies", "shares": 168,
      "avgPrice": 18.106, "costBasis": 3042, "last": 18.67, "marketVal": 3137,
      "unrealPnL": 95, "unrealPct": 3.1, "stop": 15.79, "target": 32,
      "status": "HOLD — STOP $15.79 GTC (CONFIRMED IBKR S22) + LIMIT $32 GTC",
      "note": "Stop $15.79 IBKR confirmed S22 (raised from $14.30). Limit $32 GTC active. Silicon anode battery/drone endurance thesis. Q1 earnings May 7. Independent of Hormuz."
    },
    {
      "ticker": "PDYN", "name": "Palladyne AI Corp", "shares": 250,
      "avgPrice": 6.595, "costBasis": 1649, "last": 6.57, "marketVal": 1643,
      "unrealPnL": -6, "unrealPct": -0.4, "stop": 5.75, "target": null,
      "status": "HOLD — STOP LIVE",
      "note": "Stop $5.75 GTC. May 13 earnings. No add until DoD contract news."
    },
    {
      "ticker": "CODA", "name": "Coda Octopus Group", "shares": 416,
      "avgPrice": 12.005, "costBasis": 4994, "last": 13.27, "marketVal": 5520,
      "unrealPnL": 526, "unrealPct": 10.5, "stop": 11.51, "target": 22,
      "status": "HOLD — STOP INTENTIONAL — MINE CLEARANCE THESIS STRENGTHENED",
      "note": "THESIS STRENGTHENED S23: Iran acknowledged sea mines in strait — some lost track of. USN mine clearance ops essential regardless of political settlement. CODA MCM/sonar thesis activating independent of ceasefire outcome. Stop $11.51 intentional. Raise to $12.50 when USN mine clearance contract publicly confirmed."
    },
    {
      "ticker": "ABVX", "name": "Abivax SA-ADR", "shares": 44,
      "avgPrice": 117.913, "costBasis": 5188, "last": 120.16, "marketVal": 5287,
      "unrealPnL": 99, "unrealPct": 1.9, "stop": 114.31, "target": null,
      "status": "HOLD — STOP $114.31 GTC (INTENTIONALLY BELOW COST — M&A OPTIONALITY)",
      "note": "Stop BELOW cost $117.913 — intentional decision S21. Max loss ~$158 if triggered. No M&A news yet. Grandfathered above SI-37 cap."
    },
    {
      "ticker": "ISRG", "name": "Intuitive Surgical Inc", "shares": 22,
      "avgPrice": 459.25, "costBasis": 10104, "last": 469.21, "marketVal": 10323,
      "unrealPnL": 219, "unrealPct": 2.2, "stop": 443.86, "target": 510,
      "status": "HOLD — STOP $443.86 GTC — EARNINGS MON APR 21 AMC — DO NOT TOUCH STOP",
      "note": "Stop $443.86 confirmed IBKR. Earnings Mon Apr 21 AMC. Do NOT tighten stop before earnings. Post-beat: raise stop to $455-460. Watch: China placements, gross margin vs 67-68%, procedure volume."
    },
    {
      "ticker": "MSFT", "name": "Microsoft Corp", "shares": 25,
      "avgPrice": 372.73, "costBasis": 9318, "last": 422.79, "marketVal": 10570,
      "unrealPnL": 1252, "unrealPct": 13.4, "stop": 400.43, "target": 430,
      "status": "HOLD — STOP $400.43 GTC (RAISED S22 CONFIRMED IBKR)",
      "note": "Stop $400.43 IBKR confirmed S22. Earnings Apr 29 AMC. Azure + Copilot thesis intact."
    },
    {
      "ticker": "R3NK", "name": "RENK Group AG", "shares": 25,
      "avgPrice": 52.15, "costBasis": 1304, "last": 54.68, "marketVal": 1367,
      "unrealPnL": 63, "unrealPct": 4.8, "stop": 48, "stopType": "Stop Limit", "stopLimit": 47, "target": 76,
      "status": "HOLD — STOP LIMIT €48/€47 GTC", "cur": "EUR",
      "note": "Avg corrected to €52.15 (IBKR trades tab ground truth — journal had €52.27). Stop Limit €48/€47 IBIS confirmed. Q1 earnings May 6 — €200M deferred Q4 orders must appear."
    },
    {
      "ticker": "LLY", "name": "Eli Lilly and Company", "shares": 3,
      "avgPrice": 905.01, "costBasis": 2715, "last": 927.03, "marketVal": 2781,
      "unrealPnL": 66, "unrealPct": 2.4, "stop": 850, "target": 1028,
      "status": "HOLD — STOP $850 GTC — SI-39 POSITION",
      "note": "SI-39 TRIGGERED S21 (-20.2%). 3 shares $905.01. Stop $850 GTC. GLP-1 thesis intact. Tranche 2 option: 1 share $862 limit if price pulls back. Forward PE 27x FY2026. Independent of Hormuz."
    },
    {
      "ticker": "CRML", "name": "Critical Metals Corp", "shares": 110,
      "avgPrice": 9.07, "costBasis": 999, "last": 12.56, "marketVal": 1382,
      "unrealPnL": 383, "unrealPct": 38.3, "stop": 8.34, "target": 15,
      "status": "HOLD — STOP $8.34 GTC (RAISED — IBKR CONFIRMED S22)",
      "note": "Stop raised to $8.34 (IBKR confirmed S22 — was $7.50 in journal). THESIS: US critical minerals strategic gap vs China — structural supply chain weakness at state level. Independent of Hormuz/Iran. Tanbreez Greenland 92.5% ownership. US EXIM interest up to $620M. Add order $10.50 GTC active for 40 shares on pullback."
    }
  ],
  "pendingOrders": [
    {"ticker": "V", "action": "BUY", "type": "Limit", "qty": 8, "limitPrice": 307, "stopPrice": null, "tif": "GTC", "status": "ACTIVE — S19",
     "note": "SI-39 TRIGGERED: -16% from 52wk high. Earnings Apr 28 AMC. Bracket stop $285 live."},
    {"ticker": "V", "action": "SELL", "type": "Stop", "qty": 8, "stopPrice": 285, "tif": "GTC", "status": "ACTIVE — bracket",
     "note": "Max loss $176. Below 52wk low $293.89 = structural failure."},
    {"ticker": "LLY", "action": "SELL", "type": "Stop", "qty": 3, "stopPrice": 850, "tif": "GTC", "status": "ACTIVE — S21",
     "note": "Stop $850. SI-39 tranche 1. Max loss $165."},
    {"ticker": "CCJ", "action": "SELL", "type": "Stop", "qty": 49, "stopPrice": 108.37, "tif": "GTC", "status": "ACTIVE",
     "note": "Above cost — profit locked."},
    {"ticker": "PDYN", "action": "SELL", "type": "Stop", "qty": 250, "stopPrice": 5.75, "tif": "GTC", "status": "ACTIVE",
     "note": "250 shares remaining."},
    {"ticker": "AMPX", "action": "SELL", "type": "Stop", "qty": 168, "stopPrice": 15.79, "tif": "GTC", "status": "ACTIVE — RAISED S22 CONFIRMED IBKR",
     "note": "Stop raised $13.00→$14.30 (S21)→$15.79 (S22 IBKR confirmed)."},
    {"ticker": "AMPX", "action": "SELL", "type": "Limit", "qty": 168, "limitPrice": 32, "tif": "GTC", "status": "ACTIVE",
     "note": "Profit target."},
    {"ticker": "VST", "action": "SELL", "type": "Stop", "qty": 53, "stopPrice": 151.5, "tif": "GTC", "status": "ACTIVE",
     "note": "Above cost — profit locked."},
    {"ticker": "AMZN", "action": "SELL", "type": "Stop Limit", "qty": 30, "limitPrice": 224, "stopPrice": 234.39, "tif": "GTC", "status": "ACTIVE",
     "note": "Locks ~$1,000 profit. Earnings Apr 23 AMC."},
    {"ticker": "ABVX", "action": "SELL", "type": "Stop", "qty": 44, "stopPrice": 114.31, "tif": "GTC", "status": "ACTIVE — BELOW COST INTENTIONAL",
     "note": "Stop below cost $117.913. Intentional M&A optionality. Max loss ~$158."},
    {"ticker": "ISRG", "action": "SELL", "type": "Stop", "qty": 22, "stopPrice": 443.86, "tif": "GTC", "status": "ACTIVE — DO NOT TOUCH PRE-EARNINGS",
     "note": "$443.86 IBKR confirmed. Earnings Mon Apr 21 AMC."},
    {"ticker": "MSFT", "action": "SELL", "type": "Stop", "qty": 25, "stopPrice": 400.43, "tif": "GTC", "status": "ACTIVE — RAISED S22 IBKR CONFIRMED",
     "note": "Raised $395.03→$400.43 S22."},
    {"ticker": "CODA", "action": "SELL", "type": "Stop", "qty": 416, "stopPrice": 11.51, "tif": "GTC", "status": "ACTIVE — INTENTIONAL",
     "note": "Do not raise until USN mine clearance contract confirmed."},
    {"ticker": "RR", "action": "SELL", "type": "Stop Limit", "qty": 150, "stopPrice": 1150, "limitPrice": 1130, "tif": "GTC", "status": "ACTIVE — CONFIRMED IBKR S22 — HARD LOCK UNTIL APR 23",
     "note": "1150p/1130p SL GTC confirmed S22. DO NOT CANCEL OR MOVE before Apr 23 ex-div."},
    {"ticker": "R3NK", "action": "SELL", "type": "Stop Limit", "qty": 25, "limitPrice": 47, "stopPrice": 48, "tif": "GTC", "status": "ACTIVE",
     "note": "€48/€47 IBIS confirmed."},
    {"ticker": "ITM", "action": "SELL", "type": "Stop Limit", "qty": 2000, "limitPrice": 98, "stopPrice": 100, "tif": "GTC", "status": "ACTIVE — 2,000 SHARES POST-TRIM — RAISED S22",
     "note": "100p/98p Stop Limit GTC for 2,000 shares (IBKR confirmed S22). Raised from 89.9p/88p."},
    {"ticker": "LDO", "action": "BUY", "type": "Limit", "qty": 35, "limitPrice": 56, "tif": "GTC", "status": "PENDING",
     "note": "LDO.MI BVME. May 5 earnings. Morningstar FV €75.60. Stop €50/€49 on fill."},
    {"ticker": "MP", "action": "BUY", "type": "Limit", "qty": 75, "limitPrice": 55, "tif": "GTC", "status": "ACTIVE",
     "note": "Critical minerals anchor. Only operating US REE mine. Pentagon 10-year magnet offtake."},
    {"ticker": "MP", "action": "SELL", "type": "Stop", "qty": 75, "stopPrice": 50, "tif": "GTC", "status": "ACTIVE",
     "note": "Bracket stop. Max loss $375."},
    {"ticker": "CRML", "action": "BUY", "type": "Limit", "qty": 40, "limitPrice": 10.50, "tif": "GTC", "status": "ACTIVE — S22",
     "note": "Pullback buy. Greenland 92.5% ownership confirmed Apr 17. On fill: raise CRML stop to $10.00 for all 150 shares."},
    {"ticker": "CRML", "action": "SELL", "type": "Stop", "qty": 110, "stopPrice": 8.34, "tif": "GTC", "status": "ACTIVE — RAISED S22 IBKR CONFIRMED",
     "note": "Stop raised $7.50→$8.34 IBKR confirmed S22. Raise to $10.00 for all 150 shares when 40-share buy fills."}
  ],
  "si39TierOneWatchlist": {
    "lastBatchPull": "2026-04-17",
    "tool": "EOD:get_us_live_extended_quotes",
    "batchSymbols": ["NVDA.US","META.US","GOOGL.US","AAPL.US","V.US","LLY.US","TSM.US","COST.US","ASML.US"],
    "note": "Run at EVERY session open — Section 0 BEFORE A-K. SI-45 weekly screener also mandatory first session of week.",
    "names": [
      {"ticker": "V", "52wkHigh": 375.51, "52wkLow": 293.89, "price": 315.72, "drawdown": -16.0, "trigger": -15, "triggerPrice": 319.18, "status": "TRIGGERED — BUY $307 GTC active. Earnings Apr 28 AMC."},
      {"ticker": "LLY", "52wkHigh": 1133.95, "52wkLow": 623.78, "price": 927.03, "drawdown": -18.2, "trigger": -20, "triggerPrice": 907.16, "status": "POSITION OPEN — 3 shares $905.01 stop $850. Tranche 2: 1 share $862 if pulls back."},
      {"ticker": "META", "52wkHigh": 796.25, "52wkLow": 479.80, "price": 671.13, "drawdown": -15.7, "trigger": -20, "triggerPrice": 637.00, "status": "MONITOR — alert at $637"},
      {"ticker": "AAPL", "52wkHigh": 288.62, "52wkLow": 189.81, "price": 266.13, "drawdown": -7.8, "trigger": -15, "triggerPrice": 245.33, "status": "MONITOR"},
      {"ticker": "GOOGL", "52wkHigh": 349.00, "52wkLow": 146.10, "price": 336.40, "drawdown": -3.6, "trigger": -18, "triggerPrice": 286.18, "status": "MONITOR"},
      {"ticker": "NVDA", "52wkHigh": 212.19, "52wkLow": 95.04, "price": 198.33, "drawdown": -6.5, "trigger": -25, "triggerPrice": 159.14, "status": "MONITOR"},
      {"ticker": "TSM", "52wkHigh": 390.21, "52wkLow": 145.84, "price": 376.62, "drawdown": -3.5, "trigger": -20, "triggerPrice": 312.17, "status": "MONITOR — Q1 beat Apr 16. Watch $372-376 entry zone."},
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
    "s23Notes": {
      "wti": "WTI $83.85 Friday Apr 17 close. -11.45% single day. -24.9% from $111.54 peak.",
      "nflx": "NFLX $97.31 Friday close. 52wk high $134.12. Drawdown -27.4%. Stage 1 only — SI-41 fail (next earnings Jul 16).",
      "hormuz": "Conditional ceasefire-linked opening only. Not SI-25 formal reopening."
    }
  },
  "cDriveProtocol": {
    "confirmed": "2026-04-18 SESSION 23",
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
    {"id": 19, "title": "STOPPED OUT / CLOSED POSITIONS — SI-19", "body": "ONDS: Loss ~$601. KTOS: Loss ~$1,601. CCL: Profit +$122. UEC: Loss ~$127. IAG.L: Profit ~£326. RCL: Loss ~$132. LDO.MI (first tranche): Profit +€21.52. LEU: Loss ~$238. PLTR: Loss -$1,307. PDYN partial: Profit +$17.42. AVAV: 25 shares sold S20 @ $197.945. Profit +$71.38. ITM TRIM S22: 1,100 shares @ 124.60p. Profit +£652. LNG: 19 shares, entry $268.76, exit $248.00, loss -$396.54 (IBKR confirmed S23). PATK: 25 shares, entry $108.80, exit $109.256, profit +$9.34 (M&A tip error — P17). NOG: 80 shares, entry $24.37, exit TBC Monday market open."},
    {"id": 20, "title": "BTC POSITION — ENTRY RULES", "body": "BTC target $55K. IBKR Paxos spot. 5-7.5% NAV. No order placed. BTC ~$70,700 (last check). Watch for pullback."},
    {"id": 21, "title": "ITM POWER — ENTRY RULES", "body": "ENTERED S08 @ 64.8-65p. TRIMMED S22: 1,100 shares sold @ 124.60p +£652. Now 2,000 shares. Stop 100p/98p GTC. Target 1: 130p. Target 2: 160p."},
    {"id": 24, "title": "CASH FLOOR — 10% RULE", "body": "Floor = 10% of NL. At $105,600 NL, floor = $10,560. Never go below. Deployable above floor."},
    {"id": 25, "title": "SI-25 EXIT TRIGGER — OIL BASED NOT CEASEFIRE BASED", "body": "EXIT TRIGGER: Formal PERMANENT Hormuz reopening CONFIRMED + WTI -10% from peak. BOTH simultaneously. A temporary ceasefire-linked opening does NOT meet the formal reopening condition.\nCurrent WTI peak: $111.54. Trigger: $100.38 (-10%). Current WTI: $83.85. OIL CONDITION EXCEEDED.\nFormal permanent reopening: NOT MET — Iran's Apr 17 declaration is ceasefire-linked only. US port blockade continues. Iran parliament warns closure resumes if blockade persists.\nSI-25 NOT TRIGGERED. ALERT POSTURE ELEVATED. Ceasefire expiry: VERIFY APR 21 vs APR 22 MONDAY."},
    {"id": 26, "title": "SECTOR THREAT MONITOR — SECTION K", "body": "SECTOR 1: DEFENCE [RR] — ITA canary.\nSECTOR 2: NUCLEAR [CCJ] — URA canary.\nSECTOR 3: AI/CLOUD [MSFT, AMZN, PDYN] — AI model news MANDATORY.\nSECTOR 4: MEDICAL ROBOTICS [ISRG] — IHI canary.\nSECTOR 5: BIOTECH [ABVX] — XBI canary.\nSECTOR 6: BATTERY/DRONE [AMPX].\nSECTOR 7: MARITIME [CODA] — MINE CLEARANCE ACTIVE.\nSECTOR 8: POWER [VST] — XLU canary.\nSECTOR 9: EU HYDROGEN [ITM].\nSECTOR 10: CRITICAL MINERALS [CRML, MP watchlist] — US vs China supply chain."},
    {"id": 34, "title": "TRADE TRACKER UPDATE PROTOCOL", "body": "FILE: Claude_Fund_Trade_Tracker.xlsx — C:\\Users\\jcadb\\claude-fund\\tracker\\\nPENDING ROWS TO ADD:\n1. AVAV: 25 shares, entry $195.09, exit $197.945, +$71.38 (S20)\n2. ITM TRIM: 1,100 shares, entry 65.1p, exit 124.60p, +£652 (S22)\n3. LNG: 19 shares, entry $268.76, exit $248.00, -$396.54 (S23 confirmed)\n4. PATK: 25 shares, entry $108.80, exit $109.256, +$9.34 (S23 — M&A error P17)\n5. NOG: 80 shares, entry $24.37, exit TBC Monday market open"},
    {"id": 35, "title": "DOLLAR-RISK SIZING — SI-35", "body": "Max loss per trade: $500. Stop%: (entry-stop)/entry. LLY: $55.01 × 3 = $165. ✅"},
    {"id": 36, "title": "MINIMUM 2:1 R:R FILTER", "body": "Min R:R to enter: 2.0:1. Below 2:1 = do not enter. Exemption: tactical binary <$2,000 at 1.5:1 min."},
    {"id": 37, "title": "SPECULATIVE CAP — $1,500 MAX", "body": "Speculative hard cap $1,500. AMPX $3,042 grandfathered. CODA $4,994 grandfathered (mine clearance catalyst). PDYN $1,649 within cap. CRML ~$999 within cap."},
    {"id": 39, "title": "SI-39: UNDERVALUED US LARGE CAP SCANNER — SECTION 0", "body": "TIER 1 TRIGGERS: NVDA -25%→$159.14 | META -20%→$637 | GOOGL -18%→$286.18 | AAPL -15%→$245.33 | V -15%→$319.18 [TRIGGERED — order active] | LLY -20%→$907.16 [TRIGGERED S21 — position open] | TSM -20%→$312.17 | COST -15%→$906.52 | ASML -20%→$1,237.78. Max per position: $4,000. Max aggregate: 20% NAV."},
    {"id": 40, "title": "52-WEEK DATA PROTOCOL", "body": "US 52wk: EOD:get_us_live_extended_quotes only. EU/UK: Yahoo Finance. Memory forbidden."},
    {"id": 41, "title": "CATALYST-ANCHORED ENTRY REQUIREMENT", "body": "Before entry: (A) Earnings within 8 weeks OR (B) Contract award within 8 weeks OR (C) Technical confirmation OR (D) Structural value below sector median. Barred: within 5% of 52wk high no catalyst. Pure thesis-only. Re-entry within 30 days of stop-out without new catalyst."},
    {"id": 42, "title": "SI-42: BROKEN THESIS EXIT DISCIPLINE", "body": "When PRIMARY thesis driver impaired by confirmed new datapoint + position within 5% of breakeven → EXIT at market on next open. Cancel GTC stops immediately (E9). Does not apply to macro drawdowns on intact thesis."},
    {"id": 43, "title": "CASH DEPLOYMENT TRIGGERS", "body": "Cash ~$28,234 (pre-NOG exit). Floor $10,560. Deployable ~$17,674.\nA: Islamabad fails + Hormuz closed 5+ days → ACTIVATED.\nB: Price in entry zone + catalyst within 8 weeks.\nC: Stop-out → redeploy 80% within 48hrs.\nD: BTC ≤ $55,000 → 5-7.5% NAV.\nTLN/CEG/DELL: post-ceasefire clarity + SI-44 Stage 2 complete."},
    {"id": 44, "title": "SI-44: TWO-STAGE RESEARCH PROTOCOL", "body": "STAGE 1 = scan candidate only. All specific figures UNVERIFIED until Stage 2.\nSTAGE 2 = mandatory before capital: read earnings, confirm dates from IR, live consensus, regulatory check, valuation metric, 50/200-day MA, SI-35/36/41 confirmed.\nHARD RULE: No scan-phase figure may appear in a recommendation without primary source verification."},
    {"id": 45, "title": "SI-45: WEEKLY BROAD US MARKET SCREENER", "body": "Run EVERY first session of trading week. EOD:stock_screener. Criteria: US market, cap ≥$5B, price ≤80% of 52wk high, avg volume >500K. Secondary: cap ≥$10B, price ≤85% of 52wk high. Output: raw candidate list only → Stage 1 SI-44. S23: NFLX caught post-hoc ($97.31, 52wk high $134.12, -27.4%). SI-45 must run Monday before markets open."},
    {"id": 46, "title": "P17 — PATK M&A TIP ENTRY ERROR (NEW S23)", "body": "ORIGIN: PATK 25 shares entered on third-party tip about LCII merger before cross-session analysis was complete. Position immediately closed +$9.34. The joint analysis concluded 'wait and watch' — proving entry was premature.\nLESSON: No entry on any M&A play until: (1) target company fully analysed, (2) deal terms, probability and R:R explicitly logged, (3) joint entry decision confirmed. A tip is not a thesis. Distinct from P6 (social media = not a catalyst) — this is specifically acting before your own analysis pipeline is complete.\nCONTEXT: PATK/LCII merger analysis conducted separately. Entry zone and conditions to be revisited when merger probability clarifies."}
  ],
  "watchlistUS": [
    {
      "ticker": "NFLX", "name": "Netflix Inc", "exchange": "NASDAQ",
      "status": "STAGE 1 CANDIDATE — DO NOT ENTER THIS WEEK — SI-41 FAIL",
      "currentPrice": 97.31, "52wkHigh": 134.12, "52wkLow": 75.01, "drawdown": -27.4,
      "entry": "TBD — Stage 2 verification required first", "stop": null, "target": null,
      "note": "FLAGGED S23 via SI-45 (protocol miss — should have been caught in weekly screener). Q1 2026: Revenue $12.25B (+16.2% YoY, slight miss vs $12.42B est). EPS $1.23 vs $0.78 est (strong beat). Q2 guidance +13% (below Street). Full year maintained (below $51.38B consensus). Reed Hastings stepped down from board. Stock -11.8% Friday. 52wk high $134.12, close $97.31, drawdown -27.4%. STAGE 1 ONLY. SI-41 FAIL: next earnings Jul 16 2026 — outside 8-week catalyst window. PE 42x on decelerating growth — Stage 2 valuation work required. Do not enter until July earnings cycle or confirmed catalyst."
    },
    {
      "ticker": "V", "name": "Visa Inc", "exchange": "NYSE",
      "status": "ACTIVE — BUY LIMIT $307 GTC — SI-39 TRIGGERED",
      "currentPrice": 315.72, "52wkHigh": 375.51, "drawdown": -16.0,
      "entry": "$307 GTC", "stop": 285, "target": 399,
      "note": "SI-39 TRIGGERED (-16.0%). FCF $22.9B, 97.8% gross margin. Earnings Apr 28 AMC. Tranche 2 on beat: add 8 shares Apr 29 open."
    },
    {
      "ticker": "LLY", "name": "Eli Lilly and Company", "exchange": "NYSE",
      "status": "POSITION OPEN — 3 shares $905.01 stop $850",
      "currentPrice": 927.03, "52wkHigh": 1133.95, "drawdown": -18.2, "trigger": -20,
      "entry": "ENTERED S21. Tranche 2: 1 share $862 if pulls back.", "stop": 850, "target": 1028,
      "note": "SI-39. GLP-1 thesis intact. Tranche 2 option: $862 limit."
    },
    {
      "ticker": "NOG", "name": "Northern Oil & Gas", "exchange": "NYSE",
      "status": "CLOSING MONDAY — MARKET SELL SUBMITTED — THESIS REMOVED",
      "currentPrice": 24.55, "entry": "Filled $24.37. Exiting Monday open.", "stop": null,
      "note": "Market sell submitted Monday Apr 21 open. Stop $22.50 cancelled. Thesis: oil war premium — removed post-WTI $83.85 and Hormuz conditional opening. Re-entry: watch $21.50-22.50 post-Hormuz digest + WTI stabilisation."
    },
    {
      "ticker": "SLV", "name": "iShares Silver Trust", "exchange": "NYSE",
      "status": "CANCELLED S23 — WAR PREMIUM THESIS REMOVED",
      "currentPrice": 71.69,
      "note": "BUY $70.00 and STOP $63.00 orders CANCELLED S23. Primary thesis was peace deal asymmetry / ceasefire binary. Hormuz conditionally opened, war premium diminished. Watch for independent silver thesis at lower entry."
    },
    {
      "ticker": "TLN", "name": "Talen Energy Corp", "exchange": "NASDAQ",
      "status": "WATCH — SI-44 STAGE 2 REQUIRED — POST MAY 5 EARNINGS",
      "currentPrice": 353.30, "52wkHigh": 451.28, "drawdown": -21.7,
      "entry": "$340-355 post May 5 earnings", "stop": 305, "target": 430,
      "note": "Nuclear + Amazon PPA 1,920 MW. PJM market power objection on Cornerstone acquisition. SI-44 Stage 2 mandatory. May 5 earnings = gate."
    },
    {
      "ticker": "CEG", "name": "Constellation Energy Corp", "exchange": "NASDAQ",
      "status": "WATCH — SI-44 STAGE 2 REQUIRED",
      "currentPrice": 295.18, "52wkHigh": 412.70, "drawdown": -28.5,
      "entry": "$285-295", "stop": 260, "target": 380,
      "note": "Pure-play US nuclear. Meta + Microsoft PPAs. 26% EPS growth 2026. Stage 2 required."
    },
    {
      "ticker": "OXY", "name": "Occidental Petroleum", "exchange": "NYSE",
      "status": "WATCH — REVIEW AFTER WTI STABILISES",
      "currentPrice": 55.38, "entry": "Reassess post-Hormuz — WTI $83.85 changes thesis", "stop": 48,
      "note": "Original thesis: post-blockade oil. WTI at $83.85 — oil thesis weakened. Reassess entry only after WTI finds floor and ceasefire situation clarifies."
    },
    {
      "ticker": "BKR", "name": "Baker Hughes", "exchange": "NYSE",
      "status": "WATCH — EARNINGS APR 22 — POST-RESULTS ONLY",
      "currentPrice": 61.49, "entry": "$58.50 post-Apr 22 earnings", "stop": 55,
      "note": "Oilfield services + LNG compression. Earnings Apr 22. Post-earnings entry only. WTI $83.85 changes near-term picture."
    },
    {
      "ticker": "RTX", "name": "RTX Corporation", "exchange": "NYSE",
      "status": "WATCH ONLY — Re-entry $185-190 on peace deal selloff",
      "currentPrice": 202.81, "entry": "$185-190 ON PEACE DEAL SELLOFF ONLY",
      "note": "Earnings Apr 21. Watch only. T12: never enter war-premium stock at ATH."
    },
    {
      "ticker": "AVAV", "name": "AeroVironment Inc", "exchange": "NASDAQ",
      "status": "CLOSED S20 — Re-entry requires SCAR clarity + below $195.09",
      "note": "SOLD S20 +$71.38. Thesis broken. Re-entry: SCAR resolved, below $195.09, Q4 normalisation. Jun 23 earnings earliest."
    },
    {
      "ticker": "DELL", "name": "Dell Technologies", "exchange": "NYSE",
      "status": "WATCH — SI-44 STAGE 2 REQUIRED", "currentPrice": 177.36, "52wkHigh": 191.37, "drawdown": -7.3,
      "entry": "$170-177", "stop": 158, "target": 220,
      "note": "$64B AI server orders. Forward PE 14.1x. Stage 2 required."
    },
    {
      "ticker": "KTOS", "name": "Kratos Defense", "exchange": "NASDAQ",
      "status": "WATCH — REENTRY $62-67", "currentPrice": 67.7,
      "note": "Stopped $64.98 Mar 30. Golden Dome contracts. Entry only on dip to $62-67."
    },
    {
      "ticker": "BTC", "name": "Bitcoin — IBKR Paxos spot", "exchange": "IBKR",
      "status": "WATCH — $55K target", "currentPrice": 70700,
      "note": "5-7.5% NAV via IBKR Paxos. Entry $55K. No order placed."
    }
  ],
  "watchlistEU": [
    {"ticker": "LDO.MI", "name": "Leonardo SpA", "exchange": "BVME", "cur": "EUR", "current": 56.00, "note": "BUY LIMIT €56 GTC active. May 5 earnings. Stop €50/€49 on fill."},
    {"ticker": "R3NK", "name": "RENK Group AG", "exchange": "IBIS", "cur": "EUR", "current": 54.68, "note": "IN PORTFOLIO. Q1 May 6. €200M deferred orders must appear."},
    {"ticker": "ITM.L", "name": "ITM Power PLC", "exchange": "LSE", "cur": "GBP", "current": 131.50, "note": "IN PORTFOLIO. 2,000 shares. Stop 100p/98p."},
    {"ticker": "RR.L", "name": "Rolls-Royce Holdings", "exchange": "LSE", "cur": "GBP", "current": 1310.60, "note": "IN PORTFOLIO. HARD LOCK until Apr 23 ex-div."},
    {"ticker": "CWR.L", "name": "Ceres Power", "exchange": "LSE", "cur": "GBP", "note": "Entry 250-270p only. Revenue flat. Watch."},
    {"ticker": "ALFEN.AS", "name": "Alfen NV", "exchange": "AMS", "cur": "EUR", "note": "May 12 earnings. EU grid infrastructure."}
  ],
  "sessionNotes": [
    {"date": "2026-04-18", "note": "SESSION 23 — Saturday close. Full reconciliation vs IBKR trades tab. LNG stopped $248 confirmed -$396.54. NOG filled $24.37 confirmed, market sell Monday submitted, stop cancelled. ITM trim 1,100 @ 124.60p +£652 confirmed. CGCT 291 shares confirmed. R3NK avg corrected €52.15. AMPX stop $15.79 confirmed. CRML stop $8.34 confirmed. RR.L stop 1150p/1130p confirmed. PATK undocumented trade flagged — P17 added. SLV cancelled. NFLX flagged Stage 1 (-27.4%, SI-41 fail). SI-25 elevated alert — not triggered. WTI $83.85. Hormuz conditional opening only. Ceasefire date dispute (Apr 21 vs Apr 22) — verify Monday. Journal v32 written to C drive."}
  ]
};

// ─── REACT COMPONENT (unchanged from v31) ────────────────────────
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
            <div style={{ fontSize: 18, fontWeight: 700, color: COLORS.textBright }}>CLAUDE FUND — JOURNAL v32</div>
            <div style={{ fontSize: 11, color: COLORS.textDim, marginTop: 2 }}>Session {data.sessionNumber} | {data.fund.account} | {data.lastUpdated}</div>
          </div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {[
              { label: "NET LIQ", val: `$${(data.fund.netLiquidity/1000).toFixed(1)}K` },
              { label: "UNREAL P&L", val: `$${(data.fund.unrealizedPnL/1000).toFixed(1)}K`, color: pnlColor(data.fund.unrealizedPnL) },
              { label: "REAL P&L", val: `$${data.fund.realizedPnL.toFixed(0)}`, color: pnlColor(data.fund.realizedPnL) },
              { label: "WTI", val: `$${data.thesis.oilWTI}`, color: COLORS.yellow }
            ].map(m => (
              <div key={m.label} className="card" style={{ textAlign: "center", minWidth: 80 }}>
                <div style={{ fontSize: 9, color: COLORS.textDim }}>{m.label}</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: m.color || COLORS.textBright, marginTop: 2 }}>{m.val}</div>
              </div>
            ))}
          </div>
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
            <div key={p.ticker} className="card">
              <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap", marginBottom: 6 }}>
                <span style={{ fontWeight: 700, fontSize: 14, color: COLORS.textBright }}>{p.ticker}</span>
                <span style={{ fontSize: 11, color: COLORS.textDim }}>{p.name}</span>
                {p.cur && <span className="badge badge-grey">{p.cur}</span>}
                <span className={`badge ${p.unrealPnL > 50 ? "badge-green" : p.unrealPnL < -50 ? "badge-red" : "badge-amber"}`}>
                  {p.unrealPnL >= 0 ? "+" : ""}{p.unrealPct?.toFixed(1)}%
                </span>
                <span className={`badge ${p.status?.includes("SELL SUBMITTED") || p.status?.includes("CLOSING") ? "badge-red" : p.status?.includes("HARD LOCK") ? "badge-amber" : "badge-grey"}`}>{p.status?.substring(0,35)}</span>
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
            <div key={i} className="card" style={{ borderLeft: `3px solid ${o.action === "BUY" ? COLORS.green : COLORS.red}` }}>
              <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap", marginBottom: 4 }}>
                <span style={{ fontWeight: 700 }}>{o.ticker}</span>
                <span className={`badge ${o.action === "BUY" ? "badge-green" : "badge-red"}`}>{o.action}</span>
                <span className="badge badge-grey">{o.type}</span>
                <span style={{ fontSize: 11 }}>Qty: <b>{o.qty}</b></span>
                {o.limitPrice && <span style={{ fontSize: 11 }}>Limit: <b>{o.limitPrice}</b></span>}
                {o.stopPrice && <span style={{ fontSize: 11 }}>Stop: <b>{o.stopPrice}</b></span>}
                <span className="badge badge-grey">{o.tif}</span>
                <span className={`badge ${o.status?.includes("ACTIVE") || o.status?.includes("CONFIRMED") ? "badge-green" : o.status?.includes("HARD LOCK") ? "badge-amber" : "badge-grey"}`}>{o.status?.substring(0,30)}</span>
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
                <span className={`badge ${w.status?.includes("CLOSED") || w.status?.includes("CANCELLED") ? "badge-red" : w.status?.includes("ACTIVE") || w.status?.includes("OPEN") ? "badge-green" : w.status?.includes("STAGE 1") || w.status?.includes("STAGE 2") || w.status?.includes("CLOSING") ? "badge-amber" : "badge-grey"}`}>{w.status?.substring(0, 40)}</span>
                {w.drawdown && <span style={{ fontSize: 11, color: COLORS.red }}>{w.drawdown?.toFixed(1)}% from 52wk</span>}
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
          <div className="card" style={{ marginBottom: 12, borderColor: COLORS.accent, borderLeftWidth: 3 }}>
            <div style={{ fontWeight: 700, color: COLORS.accent, marginBottom: 8 }}>{data.thesis.title}</div>
            <div style={{ fontSize: 12, color: COLORS.text, lineHeight: 1.8 }}>{data.thesis.summary}</div>
          </div>
          <div className="grid-2" style={{ marginBottom: 12 }}>
            <div className="card">
              <div style={{ fontSize: 10, color: COLORS.textDim }}>HORMUZ STATUS</div>
              <div style={{ marginTop: 6, fontSize: 12, color: COLORS.yellow, lineHeight: 1.6 }}>{data.thesis.hormuzStatus}</div>
            </div>
            <div className="card" style={{ background: "rgba(210,153,34,0.05)", borderColor: "rgba(210,153,34,0.3)" }}>
              <div style={{ fontSize: 10, color: COLORS.yellow }}>SI-25 — ELEVATED ALERT — NOT TRIGGERED</div>
              <div style={{ marginTop: 6, fontSize: 11, color: COLORS.yellow, lineHeight: 1.6 }}>{data.thesis.ceasefireFilter}</div>
            </div>
          </div>
          <div className="grid-3" style={{ marginBottom: 12 }}>
            {[{label:"WTI",val:`$${data.thesis.oilWTI}/bbl`,color:COLORS.red},{label:"BRENT",val:`$${data.thesis.oilBrent}/bbl`},{label:"GOLD",val:`$${data.thesis.goldPrice}/oz`}].map(m => (
              <div key={m.label} className="card">
                <div style={{ fontSize: 10, color: COLORS.textDim }}>{m.label}</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: m.color || COLORS.textBright, marginTop: 4 }}>{m.val}</div>
              </div>
            ))}
          </div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: COLORS.accent, marginBottom: 8 }}>KEY DATES</div>
            {data.thesis.keyDates?.filter(d => d.priority === "CRITICAL" || d.priority === "HIGH").map((d, i) => (
              <div key={i} className="card" style={{ marginBottom: 6, borderLeft: `3px solid ${d.priority === "CRITICAL" ? COLORS.red : COLORS.yellow}` }}>
                <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <span style={{ fontSize: 11, fontWeight: 600, minWidth: 90, color: COLORS.textBright }}>{d.date}</span>
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
            <div key={ins.id} className="card" style={{ display: "flex", gap: 12, borderLeft: ins.id === 44 ? `3px solid ${COLORS.blue}` : ins.id === 45 ? `3px solid ${COLORS.blue}` : ins.id === 46 ? `3px solid ${COLORS.yellow}` : ins.id === 25 ? `3px solid ${COLORS.red}` : undefined }}>
              <div style={{ fontSize: 11, color: ins.id >= 44 ? COLORS.blue : COLORS.accent, fontWeight: 700, minWidth: 28 }}>#{ins.id.toString().padStart(2,"0")}</div>
              <div>
                <div style={{ fontWeight: 600, color: ins.id === 46 ? COLORS.yellow : ins.id >= 44 ? COLORS.blue : COLORS.textBright, marginBottom: 4, fontSize: 12 }}>{ins.title}</div>
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
        <span style={{ fontSize: 10, color: COLORS.textDim }}>JOURNAL v32 // SESSION 23 // {data.fund.account} // C DRIVE WRITE CONFIRMED</span>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <span className="badge badge-amber">EU ACCESS: APPROVED</span>
          <span className="badge badge-red">CONFLICT: ACTIVE</span>
          <span className="badge badge-amber">SI-25: OIL EXCEEDED — ELEVATED ALERT</span>
          <span className="badge badge-blue">SI-39 SECTION 0 ACTIVE</span>
          <span className="badge badge-blue">SI-44 TWO-STAGE ACTIVE</span>
          <span className="badge badge-blue">SI-45 WEEKLY SCREENER ACTIVE</span>
        </div>
      </div>
    </div>
  );
}
