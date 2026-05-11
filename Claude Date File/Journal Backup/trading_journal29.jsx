import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "fund_journal_v2";

// ═══════════════════════════════════════════════════════════════════
// SESSION CLOSE CHECKLIST — CLAUDE EXECUTES AT EVERY SESSION END
// ═══════════════════════════════════════════════════════════════════
// Claude writes directly to C drive via filesystem MCP tools:
// filesystem:write_file → journal, FUND_SESSION_STATE.md, LESSONS_LEARNED.md
// filesystem:read_text_file → reads .md files at session open
// Allowed paths: C:\Users\jcadb\claude-fund\ and C:\Users\jcadb\Claude Date File\
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
  "lastUpdated": "2026-04-15",
  "sessionNumber": 19,
  "fund": {
    "account": "U24936508",
    "netLiquidity": 102600,
    "cash": 26013,
    "availableFunds": 80300,
    "dailyPnL": 332.69,
    "unrealizedPnL": 5576,
    "realizedPnL": 0,
    "broker": "IBKR Pro",
    "baseCurrency": "USD",
    "location": "UAE",
    "ibkrEuropeanAccess": "APPROVED — March 26 2026",
    "cashUSD": 31848,
    "cashEUR": -937,
    "cashGBP": -3488,
    "cashBase": 26013,
    "cashFloorRule": "10% of NL = $10,260 minimum. NEVER go below. 25% figure is stale — permanently retired.",
    "lastUpdated": "2026-04-15 SESSION 19 CLOSE — JOURNAL v29",
    "note": "JOURNAL v29 — SESSION 19 COMPLETE. Three new GTC orders placed: V BUY $307/285 (SI-39 trigger -17.1%), NOG BUY $25.08/22.50 (below entry zone, Citi Buy $36), SLV BUY $70.50/64.50 (peace deal asymmetry). AVAV stop raised $173.98→$186.21. LEU confirmed closed (stopped Apr 7). RTX removed from active entry — thesis fully priced at ATH $202.81, R:R inverted with ceasefire expiry Apr 22. CODA stop confirmed at IBKR level ($11.51) — intentional pending mine clearance catalyst. SI-39 SECTION 0 SCANNER added: fires FIRST at every full scan before A-K. SI-40 52-WEEK DATA PROTOCOL added: EOD:get_us_live_extended_quotes mandatory for all drawdown claims. CRITICAL ERROR CORRECTED: NVDA stated as ~$105 (actual $196.51), drawdown stated -40% (actual -7.4%), ASML stated -24% drawdown (actual -4.5%), META stated ~$570 (actual $662.49) — all from memory without tool verification. TSMC Q1 full earnings tomorrow Apr 16 10AM UAE. Ceasefire expires Apr 22 (7 days). US blockade of Iranian ports active Apr 13. Oil ~$97-104. SI-25 NOT TRIGGERED."
  },
  "thesis": {
    "title": "US NAVAL BLOCKADE OF IRANIAN PORTS ACTIVE — THESIS ESCALATED — STRUCTURALLY INTACT",
    "summary": "SESSION 19 UPDATE: Islamabad talks FAILED Apr 12. Vance confirmed no nuclear commitment from Iran after 21 hours. Trump announced US Navy blockade of all ships entering/exiting Iranian ports, effective Apr 13 10AM ET. WTI spiked to $104, Brent $102. Ceasefire expires Apr 22. UK leading 40+ nation coalition to reopen Strait. Chinese-owned tankers still attempting transit. IEA: demand destruction spreading. US Treasury: Iranian oil sanctions waiver NOT renewed — expires Apr 19. Fresh diplomacy signal Apr 14 (NBC: talks may resume this week) pulled oil back toward $91-97. SESSION 12 BACKGROUND: TWO-WEEK CEASEFIRE APR 7 8PM ET. Trump suspended attacks. Iran agreed to coordinate safe passage under Armed Forces management. Iran 10-point demands remain nonstarters. Thesis unchanged: SI-25 exit trigger requires formal reopening PLUS oil -10% from peak.",
    "oilWTI": 97,
    "oilBrent": 99,
    "goldPrice": 5003,
    "hormuzStatus": "SESSION 19: US naval blockade of Iranian ports active since Apr 13 10am ET. Islamabad talks FAILED Apr 12. Ceasefire expires Apr 22 (7 days from session close). SI-25 NOT TRIGGERED. WTI ~$97-104 range. Peak $111.54. Trigger $100.38. Not met. Fresh diplomacy signal Apr 14 — NBC reports talks may resume this week. Oil pulled back on hope.",
    "ceasefireFilter": "SI-25 NOT TRIGGERED. WTI ~$97 — peak $111.54, trigger $100.38. Not met. Hormuz under blockade — not formally reopened. Ceasefire expires Apr 22 — DOMINANT BINARY. Dual condition (formal reopening + oil -10% from peak $111.54) remains unmet. Exit trigger unchanged.",
    "blockadeStatus": "US CENTCOM blockade of Iranian ports + Strait active since Apr 13. Applies to vessels heading to/from Iranian ports only. Non-Iranian port vessels may transit. China condemned as 'dangerous and irresponsible'. IRGC threatened retaliation. 3 sanctioned tankers transited day 1.",
    "keyDates": [
      {"date": "15 Apr (Wednesday)", "event": "SESSION 19 COMPLETE. V BUY $307 placed. NOG BUY $25.08 placed. SLV BUY $70.50 placed. AVAV stop raised $186.21. RTX removed from entry. SI-39 Section 0 scanner added.", "priority": "RESOLVED — SESSION 19 COMPLETE"},
      {"date": "16 Apr (tomorrow)", "event": "TSMC Q1 full earnings 10:00 AM UAE — Q2 guidance + margin detail + Arizona update. Entry decision post-call. Watch: Q2 guidance vs $37-38B consensus, full-year revision.", "priority": "CRITICAL"},
      {"date": "19 Apr", "event": "US Iranian oil sanctions waiver expires 12:01 AM ET — secondary sanctions back in force", "priority": "HIGH"},
      {"date": "21 Apr", "event": "ISRG Q1 2026 Earnings (confirmed, AMC) — 6 days away. Stop $420. Watch: China placements, gross margin vs 67-68%, procedure vol. ALSO: RTX Q1 pre-market (watch only — no position).", "priority": "CRITICAL"},
      {"date": "22 Apr", "event": "CEASEFIRE EXPIRY BINARY — Tranche 2 review: OXY, BKR post-resolution. SLV primary catalyst. RR.L: no stop before Apr 23.", "priority": "CRITICAL"},
      {"date": "23 Apr", "event": "RR.L EX-DIVIDEND — HARD LOCK. DO NOT SELL BEFORE THIS DATE. ALSO: AMZN Q1 earnings AMC — AWS growth, AI capex guidance. Stop $234.39/224.", "priority": "CRITICAL"},
      {"date": "28 Apr", "event": "V Q2 earnings AMC — beat + volumes resilient → add 8 more shares Apr 29 open. Miss → exit if below $295.", "priority": "CRITICAL"},
      {"date": "29 Apr", "event": "MSFT Q3 FY2026 Earnings AMC — Azure growth %, Copilot seats, GPT-6 Azure signal. Stop $375.56.", "priority": "CRITICAL"},
      {"date": "23 Apr", "event": "SAP Q1 2026 Earnings — cloud backlog re-acceleration. Watch AI attach rate. DO NOT enter SAP before this date.", "priority": "HIGH"},
      {"date": "30 Apr", "event": "NOG Q1 earnings — oil revenue at $90-110 WTI, dividend confirmation", "priority": "MEDIUM"},
      {"date": "5 May", "event": "LDO.MI Q1 Earnings — first catalyst for pending buy position. May 5 earnings.", "priority": "HIGH"},
      {"date": "5 May", "event": "HAG Q1 Earnings — Hensoldt, EU defence watchlist", "priority": "MEDIUM"},
      {"date": "6 May", "event": "R3NK Q1 Earnings — €200M deferred Q4 orders MUST appear. Critical.", "priority": "CRITICAL"},
      {"date": "7 May", "event": "AMPX Q1 Earnings", "priority": "MEDIUM"},
      {"date": "11 May", "event": "PLTR Q1 Earnings — Golden Dome + Maven POR = key catalyst. Reentry zone $120-130 on confirmed award or this catalyst.", "priority": "CRITICAL"},
      {"date": "12 May", "event": "ALFEN Q1 Earnings — EU grid infrastructure watchlist", "priority": "MONITOR"},
      {"date": "12 May", "event": "SLDP Q1 Earnings", "priority": "MONITOR"},
      {"date": "13 May", "event": "VST + PDYN Earnings", "priority": "MEDIUM"},
      {"date": "18 May", "event": "ONDS Q1 Earnings — stopped out but monitoring sector", "priority": "MONITOR"},
      {"date": "23 Jun", "event": "AVAV Q1 Earnings", "priority": "HIGH"},
      {"date": "25 Jun", "event": "IAG.L Ex-dividend 4.33p — NO LONGER HELD, position closed S08", "priority": "RESOLVED"},
      {"date": "30 Jul", "event": "RR.L H1 Earnings", "priority": "HIGH"},
      {"date": "14 Apr", "event": "SESSION 18 COMPLETE. CRML 110 @ $9.07 FILLED. PDYN 250 shares sold ~$6.665 (+$17.42). GPT-6 launched — GREEN. ITM +41.3% total. NL NEW HIGH $102.1K. Multiple stop raises executed.", "priority": "RESOLVED"},
      {"date": "10 Apr", "event": "ISLAMABAD TALKS — FAILED. Vance confirmed no deal after 21hrs (Apr 12). Breakdown on nuclear + Hormuz.", "priority": "RESOLVED — FAILED"},
      {"date": "9 Apr", "event": "PLTR STOPPED OUT at $134.976. Loss -$1,307. Reentry zone $120-130 on confirmed Golden Dome award or May 11 earnings catalyst.", "priority": "RESOLVED"},
      {"date": "21 Apr", "event": "RTX Q1 2026 Earnings — watch only. No position. Munitions depletion/replenishment quantification. Re-entry $185-190 on peace deal selloff only.", "priority": "MONITOR"},
      {"date": "16 Apr", "event": "NFLX Q1 2026 Earnings — WATCH ONLY. Not held.", "priority": "MONITOR"}
    ]
  },
  "positions": [
    {
      "ticker": "CCJ", "name": "Cameco Corp", "shares": 49,
      "avgPrice": 104.021, "costBasis": 5097, "last": 116.06, "marketVal": 5687,
      "unrealPnL": 590, "unrealPct": 11.6, "stop": 108.37, "target": null,
      "status": "HOLD — STOP LIVE",
      "note": "Nuclear thesis structural — EU energy independence + global uranium supply. Stop RAISED $106.07→$108.37 S12 IBKR confirmed. Above cost $104.021 — profit locked. Ceasefire does not reduce uranium demand. CCJ +11.6% unrealized."
    },
    {
      "ticker": "AMZN", "name": "Amazon.com Inc", "shares": 30,
      "avgPrice": 201.204, "costBasis": 6036, "last": 249.02, "marketVal": 7471,
      "unrealPnL": 1434, "unrealPct": 23.7, "stop": 234.39, "stopType": "Stop Limit", "stopLimit": 224, "target": 300,
      "status": "HOLD — STOP LIMIT LIVE",
      "note": "S18 STOP RAISED $229.56→$234.39/224 Stop Limit GTC. Earnings Apr 23 AMC. AWS up 24% last quarter, $100B capex guided 2026. Stop $234.39 locks ~$1,000 profit. Next raise: post-earnings beat confirmed."
    },
    {
      "ticker": "VST", "name": "Vistra Corp", "shares": 53,
      "avgPrice": 150.569, "costBasis": 7980, "last": 163.97, "marketVal": 8690,
      "unrealPnL": 710, "unrealPct": 8.9, "stop": 151.5, "target": null,
      "status": "HOLD — STOP LIVE",
      "note": "S18 STOP RAISED $145.02→$151.50 (above cost $150.569 — profit locked). Earnings May 13. AI data centre power thesis intact. Morgan Stanley 9-18GW US power shortfall through 2028 = structural tailwind."
    },
    {
      "ticker": "RR", "name": "Rolls-Royce Holdings", "shares": 150,
      "avgPrice": 1182.9, "costBasis": 1774, "last": 1312, "marketVal": 1968,
      "unrealPnL": 194, "unrealPct": 10.9, "stop": null, "target": 1600,
      "status": "HOLD — NO STOP (ex-div Apr 23 — HARD LOCK)", "cur": "GBP",
      "note": "EX-DIV APR 23 — DO NOT SELL BEFORE THIS DATE. No stop order placed. After Apr 23 ex-div: set stop limit 1250p/1230p. H1 earnings Jul 30. UK leading 40+ nation coalition to reopen Strait = defence demand signal."
    },
    {
      "ticker": "ITM", "name": "ITM Power PLC", "shares": 3100,
      "avgPrice": 65.1, "costBasis": 2018, "last": 91, "marketVal": 2821,
      "unrealPnL": 803, "unrealPct": 39.8, "stop": 84, "target": 98,
      "status": "HOLD — STOP LIMIT 84p/82.5p GTC", "cur": "GBP",
      "note": "S18 STOP RAISED 78p/76.5p→84p/82.5p Stop Limit GTC LSE. ITM at ~91p (+39.8% from 65.1p). GBE £86.5M equity package (Apr 9) catalyst. Cash guidance raised £210-215M. Next stop raise: 90p/88.5p when confirmed close above 95p on volume."
    },
    {
      "ticker": "AMPX", "name": "Amprius Technologies", "shares": 168,
      "avgPrice": 18.106, "costBasis": 3042, "last": 17.97, "marketVal": 3019,
      "unrealPnL": -23, "unrealPct": -0.8, "stop": 13, "target": 32,
      "status": "HOLD — STOP $13 GTC + LIMIT $32 GTC",
      "note": "Silicon anode battery/drone endurance thesis intact. Q1 earnings May 7. Stop $13.00 GTC + Limit $32 GTC both live."
    },
    {
      "ticker": "AVAV", "name": "AeroVironment Inc", "shares": 25,
      "avgPrice": 195.09, "costBasis": 4877, "last": 194.52, "marketVal": 4863,
      "unrealPnL": -14, "unrealPct": -0.3, "stop": 186.21, "target": 311,
      "status": "HOLD — STOP LIVE",
      "note": "S19 STOP RAISED $173.98→$186.21. Now 4.6% below cost $195.09. Next raise: to $196+ when confirmed close above $200 on volume — profit-locks position. US Navy ISR contract (Apr 1) validates drone/ISR thesis. Earnings Jun 23."
    },
    {
      "ticker": "PDYN", "name": "Palladyne AI Corp", "shares": 250,
      "avgPrice": 6.595, "costBasis": 1649, "last": 6.32, "marketVal": 1580,
      "unrealPnL": -69, "unrealPct": -4.2, "stop": 5.75, "target": null,
      "status": "HOLD — STOP LIVE",
      "note": "S18 PARTIAL EXIT: 250 shares sold ~$6.665, realized +$17.42. Remaining 250 shares. Stop $5.75 GTC. Within SI-37 cap ($1,649 cost). May 13 earnings = next catalyst. No add until DoD contract news."
    },
    {
      "ticker": "CODA", "name": "Coda Octopus Group", "shares": 416,
      "avgPrice": 12.005, "costBasis": 4994, "last": 12.90, "marketVal": 5367,
      "unrealPnL": 372, "unrealPct": 7.4, "stop": 11.51, "target": 22,
      "status": "HOLD — STOP AT IBKR LEVEL (INTENTIONAL — mine clearance catalyst pending)",
      "note": "S19 STOP CONFIRMED AT IBKR LEVEL ($11.51). INTENTIONAL — mine clearance operations in Strait = direct CODA MCM/sonar catalyst. Tight stop risks shakeout before catalyst fires. Stop raise to $12.50 when USN mine clearance activity publicly confirmed. May 13 earnings."
    },
    {
      "ticker": "ABVX", "name": "Abivax SA-ADR", "shares": 44,
      "avgPrice": 117.913, "costBasis": 5188, "last": 125.80, "marketVal": 5535,
      "unrealPnL": 347, "unrealPct": 6.7, "stop": 118.36, "target": null,
      "status": "HOLD — STOP $118.36 GTC",
      "note": "S18 STOP RAISED $113.70→$118.36 GTC IBKR confirmed. Above cost $117.91 — profit locked. No M&A news. No Phase 3 data. Hold. GRANDFATHERED above SI-37 $1,500 cap — do not add."
    },
    {
      "ticker": "ISRG", "name": "Intuitive Surgical Inc", "shares": 22,
      "avgPrice": 459.2, "costBasis": 10103, "last": 467.22, "marketVal": 10279,
      "unrealPnL": 174, "unrealPct": 1.7, "stop": 420, "target": 510,
      "status": "HOLD — STOP $420 GTC",
      "note": "S13 FILLED at $459.20. Stop $420 GTC confirmed. Earnings Apr 21 AMC (6 days). Da Vinci procedure growth thesis. Do NOT tighten stop before earnings. Watch: China placements, gross margin vs 67-68%, Ion attach rates. Post-earnings: raise stop to $430-435 if beat confirmed. [SI-38]: $420 is round number — consider $419.13 post-earnings."
    },
    {
      "ticker": "MSFT", "name": "Microsoft Corp", "shares": 25,
      "avgPrice": 372.73, "costBasis": 9318, "last": 393.11, "marketVal": 9828,
      "unrealPnL": 509, "unrealPct": 5.5, "stop": 375.56, "target": 430,
      "status": "HOLD — STOP $375.56 GTC",
      "note": "S18 STOP RAISED $350→$375.56 (above cost $372.77 — profit locked). Earnings Apr 30 AMC. Azure 39% growth. GPT-6 via Azure = positive. SI-26 K-scan: GREEN."
    },
    {
      "ticker": "R3NK", "name": "RENK Group AG", "shares": 25,
      "avgPrice": 52.27, "costBasis": 1307, "last": 52.06, "marketVal": 1302,
      "unrealPnL": -6, "unrealPct": -0.5, "stop": 48, "target": 76,
      "status": "HOLD — STOP LIMIT €48/€47 GTC", "cur": "EUR",
      "note": "S17 FILLED €52.15. Stop Limit €48/€47 GTC IBIS confirmed. Q1 earnings May 6 — €200M deferred Q4 orders must appear. Second tranche add on May 6 confirmation only. EU defence rearmament structural. R:R to T2 (€76) = 3.9:1."
    },
    {
      "ticker": "LNG", "name": "Cheniere Energy Inc", "shares": 19,
      "avgPrice": 268.813, "costBasis": 5107, "last": 259.68, "marketVal": 4934,
      "unrealPnL": -173, "unrealPct": -3.4, "stop": 248, "target": 330,
      "status": "HOLD — STOP $248 GTC",
      "note": "S17 FILLED $268.76. Stop $248 GTC. Qatari Ras Laffan structural damage — 20% Qatar export capacity sidelined years. US blockade extends disruption. Non-Hormuz LNG premium structural. Jefferies/Citi/JPMorgan all PT $330-338. 15 analysts 0 Sells. Stop raise to $255 if closes >$285."
    },
    {
      "ticker": "CRML", "name": "Critical Metals Corp", "shares": 110,
      "avgPrice": 9.07, "costBasis": 999, "last": 8.88, "marketVal": 977,
      "unrealPnL": -22, "unrealPct": -2.2, "stop": 7.5, "target": 15,
      "status": "HOLD — STOP $7.50 GTC",
      "note": "S18 FILLED $9.07. Heavy rare earth from Tanbreez (Greenland). US EXIM interest up to $620M. SI-37 hard cap respected ($999 cost). Do not add until offtake/financing concrete. R:R to $15 = 2.8:1."
    }
  ],
  "pendingOrders": [
    {"ticker": "V", "action": "BUY", "type": "Limit", "qty": 8, "limitPrice": 307, "stopPrice": null, "tif": "GTC", "status": "ACTIVE — S19 NEW",
     "note": "SI-39 TRIGGERED: -17.1% from 52wk high $375.51. 36 Buy/3 Hold, consensus $399. FCF $22.9B. Earnings Apr 28 AMC. Bracket stop $285 live."},
    {"ticker": "V", "action": "SELL", "type": "Stop", "qty": 8, "limitPrice": null, "stopPrice": 285, "tif": "GTC", "status": "ACTIVE — bracket",
     "note": "Below 52wk low $293.89 = structural failure. Max loss $176."},
    {"ticker": "NOG", "action": "BUY", "type": "Limit", "qty": 80, "limitPrice": 25.08, "stopPrice": null, "tif": "GTC", "status": "ACTIVE — S19 NEW",
     "note": "Below entry zone $26-27.50. Citi Buy $36 (Apr 14 fresh). 6.5% dividend. Earnings Apr 30. Entry raised from $25.00 to $25.08 (avoid round number). Bracket stop $22.50 live."},
    {"ticker": "NOG", "action": "SELL", "type": "Stop", "qty": 80, "limitPrice": null, "stopPrice": 22.5, "tif": "GTC", "status": "ACTIVE — bracket",
     "note": "Below 52wk low support. Max loss $206 on 80 shares."},
    {"ticker": "SLV", "action": "BUY", "type": "Limit", "qty": 21, "limitPrice": 70.50, "stopPrice": null, "tif": "GTC", "status": "ACTIVE — S19 NEW",
     "note": "Peace deal asymmetry. Silver -36% from January ATH. Structural 6-year deficit. Binary catalyst Apr 22. Do not enter above $73."},
    {"ticker": "SLV", "action": "SELL", "type": "Stop", "qty": 21, "limitPrice": null, "stopPrice": 64.50, "tif": "GTC", "status": "ACTIVE — bracket",
     "note": "Below $64.42 technical support. Max loss $126 on 21 shares."},
    {"ticker": "ITM", "action": "SELL", "type": "Stop Limit", "qty": 3100, "limitPrice": 82.5, "stopPrice": 84, "tif": "GTC", "status": "ACTIVE",
     "note": "S18 RAISED 78p/76.5p→84p/82.5p. Next raise: 90p/88.5p on close above 95p on volume."},
    {"ticker": "CCJ", "action": "SELL", "type": "Stop", "qty": 49, "limitPrice": null, "stopPrice": 108.37, "tif": "GTC", "status": "ACTIVE",
     "note": "S12 IBKR CONFIRMED. Above cost $104.021 — profit locked."},
    {"ticker": "PDYN", "action": "SELL", "type": "Stop", "qty": 250, "limitPrice": null, "stopPrice": 5.75, "tif": "GTC", "status": "ACTIVE",
     "note": "S18 AMENDED 500→250 shares. Partial exit done. Remaining 250 shares protected."},
    {"ticker": "AVAV", "action": "SELL", "type": "Stop", "qty": 25, "limitPrice": null, "stopPrice": 186.21, "tif": "GTC", "status": "ACTIVE",
     "note": "S19 RAISED $173.98→$186.21. 4.6% below cost — not yet profit-locked. Next raise: above $195.09 cost when close above $200 on volume."},
    {"ticker": "AMPX", "action": "SELL", "type": "Stop", "qty": 168, "limitPrice": null, "stopPrice": 13, "tif": "GTC", "status": "ACTIVE",
     "note": "Stop $13.00 GTC. Wider buffer."},
    {"ticker": "AMPX", "action": "SELL", "type": "Limit", "qty": 168, "limitPrice": 32, "stopPrice": null, "tif": "GTC", "status": "ACTIVE",
     "note": "Profit target."},
    {"ticker": "VST", "action": "SELL", "type": "Stop", "qty": 53, "limitPrice": null, "stopPrice": 151.5, "tif": "GTC", "status": "ACTIVE",
     "note": "S18 RAISED $145.02→$151.50. Above cost $150.569 — profit locked."},
    {"ticker": "AMZN", "action": "SELL", "type": "Stop Limit", "qty": 30, "limitPrice": 224, "stopPrice": 234.39, "tif": "GTC", "status": "ACTIVE",
     "note": "S18 RAISED $229.56/224→$234.39/224 GTC. Locks ~$1,000 profit pre-Apr 23 earnings."},
    {"ticker": "ABVX", "action": "SELL", "type": "Stop", "qty": 44, "limitPrice": null, "stopPrice": 118.36, "tif": "GTC", "status": "ACTIVE",
     "note": "S18 RAISED $113.70→$118.36. Profit locked above cost $117.91."},
    {"ticker": "ISRG", "action": "SELL", "type": "Stop", "qty": 22, "limitPrice": null, "stopPrice": 420, "tif": "GTC", "status": "ACTIVE",
     "note": "Protective stop. $420 = structural level. Hold through Apr 21 earnings. Raise to $430-435 post-beat."},
    {"ticker": "MSFT", "action": "SELL", "type": "Stop", "qty": 25, "limitPrice": null, "stopPrice": 375.56, "tif": "GTC", "status": "ACTIVE",
     "note": "S18 RAISED $350→$375.56. Above cost $372.77 — profit locked. Earnings Apr 30 AMC."},
    {"ticker": "CODA", "action": "SELL", "type": "Stop", "qty": 416, "limitPrice": null, "stopPrice": 11.51, "tif": "GTC", "status": "ACTIVE — INTENTIONAL AT IBKR LEVEL",
     "note": "S19 CONFIRMED. Intentional below journal $12.14 — mine clearance catalyst pending. Do not raise until USN mine ops confirmed."},
    {"ticker": "LNG", "action": "SELL", "type": "Stop", "qty": 19, "limitPrice": null, "stopPrice": 248, "tif": "GTC", "status": "ACTIVE",
     "note": "S17 CONFIRMED GTC. Next raise: $255 if LNG closes >$285."},
    {"ticker": "R3NK", "action": "SELL", "type": "Stop Limit", "qty": 25, "limitPrice": 47, "stopPrice": 48, "tif": "GTC", "status": "ACTIVE",
     "note": "S17 Stop Limit €48.00/€47.00 GTC IBIS confirmed. Mandatory Stop Limit for EU exchange."},
    {"ticker": "LDO", "action": "BUY", "type": "Limit", "qty": 35, "limitPrice": 56, "stopPrice": null, "tif": "GTC", "status": "PENDING",
     "note": "S17 submitted. LDO.MI — BVME. Entry zone €53-56.50. May 5 earnings. Morningstar FV €75.60. Stop €50/€49 to add on fill only."},
    {"ticker": "MP", "action": "BUY", "type": "Limit", "qty": 75, "limitPrice": 55, "stopPrice": null, "tif": "GTC", "status": "ACTIVE S18",
     "note": "S18 SUBMITTED. Critical minerals anchor. Only operating US REE mine. Pentagon 10-year magnet offtake."},
    {"ticker": "MP", "action": "SELL", "type": "Stop", "qty": 75, "limitPrice": null, "stopPrice": 50, "tif": "GTC", "status": "ACTIVE S18",
     "note": "S18 bracket stop. Max loss $375 at 75 shares."},
    {"ticker": "APH", "action": "BUY", "type": "Limit", "qty": 20, "limitPrice": 138, "stopPrice": null, "tif": "GTC", "status": "ACTIVE S18",
     "note": "S18 SUBMITTED. Apr 29 earnings catalyst. Bracket stop $134 live."},
    {"ticker": "APH", "action": "SELL", "type": "Stop", "qty": 20, "limitPrice": null, "stopPrice": 134, "tif": "GTC", "status": "ACTIVE S18",
     "note": "S18 bracket stop. R:R from $138 entry to $170 consensus = 8:1."},
    {"ticker": "CRML", "action": "SELL", "type": "Stop", "qty": 110, "limitPrice": null, "stopPrice": 7.5, "tif": "GTC", "status": "ACTIVE",
     "note": "S18 bracket stop. Max loss $173 on 110 shares."}
  ],
  "si39TierOneWatchlist": {
    "lastBatchPull": "2026-04-15",
    "tool": "EOD:get_us_live_extended_quotes",
    "batchSymbols": ["NVDA.US","META.US","GOOGL.US","AAPL.US","V.US","LLY.US","TSM.US","COST.US","ASML.US"],
    "note": "Run at EVERY session open as Section 0 — BEFORE sections A-K. Use EOD:get_us_live_extended_quotes to get fiftyTwoWeekHigh and fiftyTwoWeekLow. MMD for current price.",
    "verified": "2026-04-15 EODHD extended quotes",
    "names": [
      {"ticker": "V", "52wkHigh": 375.51, "52wkLow": 293.89, "price": 311.37, "drawdown": -17.1, "trigger": -15, "triggerPrice": 319.18, "status": "TRIGGERED — buy order $307 placed S19"},
      {"ticker": "LLY", "52wkHigh": 1133.95, "52wkLow": 623.78, "price": 922.50, "drawdown": -18.6, "trigger": -20, "triggerPrice": 907.16, "status": "NEAR TRIGGER — 1.4% away. S20 deep dive priority."},
      {"ticker": "META", "52wkHigh": 796.25, "52wkLow": 479.80, "price": 662.49, "drawdown": -16.8, "trigger": -20, "triggerPrice": 637.00, "status": "APPROACHING — alert at $637"},
      {"ticker": "AAPL", "52wkHigh": 288.62, "52wkLow": 171.89, "price": 258.83, "drawdown": -10.3, "trigger": -15, "triggerPrice": 245.33, "status": "MONITOR"},
      {"ticker": "GOOGL", "52wkHigh": 349.00, "52wkLow": 143.91, "price": 332.91, "drawdown": -4.6, "trigger": -18, "triggerPrice": 286.18, "status": "MONITOR — missed at $280 March 2026 (origin of SI-39)"},
      {"ticker": "NVDA", "52wkHigh": 212.19, "52wkLow": 95.04, "price": 196.51, "drawdown": -7.4, "trigger": -25, "triggerPrice": 159.14, "status": "MONITOR"},
      {"ticker": "TSM", "52wkHigh": 390.21, "52wkLow": 137.90, "price": 379.89, "drawdown": -2.7, "trigger": -20, "triggerPrice": 312.17, "status": "MONITOR — earnings Apr 16"},
      {"ticker": "COST", "52wkHigh": 1067.08, "52wkLow": 844.06, "price": 999.20, "drawdown": -6.4, "trigger": -15, "triggerPrice": 906.52, "status": "MONITOR"},
      {"ticker": "ASML", "52wkHigh": 1547.22, "52wkLow": 606.87, "price": 1478, "drawdown": -4.5, "trigger": -20, "triggerPrice": 1237.78, "status": "NOT DRAWDOWN — up 22% YTD. Remove from active drawdown watch."}
    ]
  },
  "priceVerificationProtocol": {
    "title": "MANDATORY BEFORE ANY PRICE-BASED RECOMMENDATION — SI-1 + SI-40",
    "currentPriceUS": "MMD /v2/aggs/ticker/{TICKER}/prev — use field 'c' (close). Primary source.",
    "52wkRangeUS": "EOD:get_us_live_extended_quotes — fields fiftyTwoWeekHigh, fiftyTwoWeekLow. Batch all Tier 1 names together. ONLY AUTHORISED SOURCE for 52wk range.",
    "currentPriceEUUK": "Yahoo Finance web_fetch or web_search. EODHD has no LSE subscription.",
    "52wkRangeEUUK": "web_fetch https://finance.yahoo.com/quote/{TICKER}/ OR web_search '{TICKER} 52 week high 2026'. FT.com and Reuters also carry this data.",
    "crossCheck": "If MMD and EODHD current prices diverge >3%, flag it. EODHD previousCloseDate may show 4-6 days prior — do not use EODHD lastTradePrice as current price.",
    "memoryForbidden": "MEMORY ESTIMATES FOR ANY PRICE DATA ARE FORBIDDEN. No approximations. No qualifications. Run the tool or do not state the figure.",
    "session19Corrections": {
      "NVDA_price": "Memory stated ~$105. Actual: $196.51. Error: $91.51.",
      "NVDA_drawdown": "Memory stated -40%. Actual: -7.4%. Error: 32.6 percentage points.",
      "ASML_drawdown": "Memory stated -24%. Actual: -4.5%. Error: 19.5 percentage points.",
      "META_price": "Memory stated ~$570. Actual: $662.49. Error: $92.49."
    }
  },
  "cDriveProtocol": {
    "confirmed": "2026-04-15 SESSION 19",
    "readAccess": true,
    "writeAccess": true,
    "tools": ["filesystem:read_text_file", "filesystem:write_file", "filesystem:edit_file", "filesystem:list_directory", "filesystem:list_allowed_directories"],
    "allowedPaths": ["C:\\Users\\jcadb\\claude-fund", "C:\\Users\\jcadb\\Claude Date File"],
    "sessionOpenReads": [
      "C:\\Users\\jcadb\\claude-fund\\state\\FUND_SESSION_STATE.md",
      "C:\\Users\\jcadb\\claude-fund\\state\\LESSONS_LEARNED.md"
    ],
    "sessionCloseWrites": [
      "C:\\Users\\jcadb\\claude-fund\\journal\\trading_journal[N+1].jsx",
      "C:\\Users\\jcadb\\claude-fund\\state\\FUND_SESSION_STATE.md",
      "C:\\Users\\jcadb\\claude-fund\\state\\LESSONS_LEARNED.md"
    ],
    "note": "Claude writes directly to C drive at session close. No manual copy-paste for .md files. User only needs to: (1) upload new journal to Claude project, (2) run session-close.bat."
  },
  "standingInstructions": [
    {
      "id": 1,
      "title": "Price Verification — ZERO TOLERANCE. TOOL ROUTING MANDATORY.",
      "body": "NEVER state price, 52-week high, 52-week low, or drawdown from memory. Every claim requires a tool call BEFORE output. NO EXCEPTIONS.\n\nTOOL ROUTING TABLE (mandatory):\n(A) CURRENT US PRICE: MMD /v2/aggs/ticker/{TICKER}/prev → use 'c' field (close). Primary source.\n(B) 52-WEEK HIGH/LOW US STOCKS: EOD:get_us_live_extended_quotes with symbols=['TICKER.US'] → fiftyTwoWeekHigh, fiftyTwoWeekLow. Batch all Tier 1 names together. THIS IS THE ONLY AUTHORISED SOURCE FOR 52WK RANGE.\n(C) EU/UK PRICE: Yahoo Finance web_fetch or web_search. EODHD has no LSE subscription.\n(D) EU/UK 52-WEEK RANGE: web_fetch https://finance.yahoo.com/quote/{TICKER}/ OR web_search '{TICKER} 52 week high 2026'. FT.com and Reuters also carry this.\n(E) CROSS-CHECK: if MMD and EODHD current prices diverge >3%, flag discrepancy. EODHD lastTradePrice may be 4-6 days stale — use MMD for current price.\n\nTHE PRICE GATE: Before ANY price-based recommendation:\n□ Current price from tool — not memory\n□ 52wk high from EODHD extended quotes — not memory\n□ Drawdown calculated from verified figures only\n□ Source and timestamp stated in output\nIf any box unchecked → state 'unverified — checking' and run the tool first.\n\nORIGIN S19: NVDA stated $105 (actual $196.51). NVDA drawdown stated -40% (actual -7.4%). ASML drawdown stated -24% (actual -4.5%). META stated $570 (actual $662.49). All from memory. Fixed by tool routing table above."
    },
    {
      "id": 2,
      "title": "Analyst Data Verification",
      "body": "Before citing analyst targets or ratings, verify the note date. A target listed as 'recent' may be months old. Never construct a bullish narrative from a sequence of data points without confirming each is current."
    },
    {
      "id": 3,
      "title": "State Tracking — No Repetition",
      "body": "Before adding any item to pending orders or watchlist, check whether it already appears in the current session. IAG CLOSED S08 — never list as position again. ITM ENTERED S08 — track as live position. LEU CLOSED S09 APR 7 — never list as active position."
    },
    {
      "id": 4,
      "title": "Evidence Matching",
      "body": "The conclusion must match the evidence cited. If consensus target equals current price, do not describe as 'asymmetric'. If data is mixed, present it as mixed. No promotional language."
    },
    {
      "id": 5,
      "title": "Iran Ceasefire Filter — EVOLVED",
      "body": "EVOLVED S08: No longer filtering for ceasefire vs no ceasefire. New filter: speed and terms of Hormuz reopening. Watch for formal toll structure, preferential access nations, insurance/shipping normalisation. S19: US blockade active — thesis escalated, not resolved."
    },
    {
      "id": 6,
      "title": "Dilution Flagging",
      "body": "Every new recommendation must check: recent share offerings, insider selling past 90 days, FCF status, dilution %. Flag prominently before recommending."
    },
    {
      "id": 7,
      "title": "10-Min Pre-Open Rule",
      "body": "Place Iran-sensitive orders within 10 minutes of US open (17:30 UAE). European markets: 12:00-20:30 UAE."
    },
    {
      "id": 8,
      "title": "IAG Reserve — RESOLVED",
      "body": "IAG POSITION CLOSED S08 @ 370p. Profit ~£326. $10K reserve RELEASED back to general cash. SI RESOLVED."
    },
    {
      "id": 9,
      "title": "European Scan Mandate",
      "body": "Every full scan MUST include R3NK, HAG, LDO, HO, CHG, BA, BAB, CHRT, RR.L, THEON, SAF and broader EU/UK small-cap defence universe."
    },
    {
      "id": 10,
      "title": "Nuclear Scan Mandate",
      "body": "Every full scan includes: Germany legal ban movement, EU SMR funding (€200M EC guarantee announced Mar 2026), RR.L SMR contracts, LNG storage TTF prices, EDF milestones, BWXT contract wins. Add: Assystem ASY.PA, Costain COST.L, Yellow Cake YCA.L to nuclear supply chain scan."
    },
    {
      "id": 11,
      "title": "UEC Review Flag — RESOLVED",
      "body": "UEC EXITED Session 07 @ $13.16. LEU stopped out Apr 7 @ $170.54 (S09, confirmed S19). Nuclear thesis for US domestic plays de-prioritised. RR.L and CCJ remain core nuclear expression. RESOLVED."
    },
    {
      "id": 12,
      "title": "PDYN Stop Flag — RESOLVED",
      "body": "PDYN stop $5.75 GTC LIVE (amended to 250 shares after S18 partial exit). RESOLVED."
    },
    {
      "id": 13,
      "title": "ASTS Watchlist Scan",
      "body": "Every full scan MUST check ASTS: BlueBird launches, 45-satellite milestone, commercial service, MNO partners, dilution, insider activity, price. DO NOT enter above $95."
    },
    {
      "id": 14,
      "title": "Full Scan Checklist — SECTION 0 + SECTIONS A-K (v4.0)",
      "body": "FULL SCAN SEQUENCE — v4.0 (updated S19):\n\nSECTION 0 — RUNS FIRST, EVERY SESSION, NO EXCEPTIONS:\nTool: EOD:get_us_live_extended_quotes batch ['NVDA.US','META.US','GOOGL.US','AAPL.US','V.US','LLY.US','TSM.US','COST.US','ASML.US']\nPlus: MMD prev close for current prices on same names.\nOutput: Drawdown table. Any name at/beyond trigger = session research priority.\nTime: <2 minutes. No excuses. Prevents GOOGL-type misses.\n\nSECTIONS A-K:\nA: IBKR cross-check (screenshots mandatory)\nB: Iran/oil/Hormuz macro + thesis status\nC: Live position review\nD: European defence (SI-9 mandate)\nE: Nuclear thesis (SI-10 mandate)\nF: US watchlist + critical minerals + Tranche 2 candidates\nG: Speculative basket review\nH: Congressional trading (3-layer: broad >$50K, held names, committee drill)\nI: Macro environment (WTI, rates, USD, IMF/IEA)\nJ: Error check (journal vs IBKR discrepancies)\nK: SI-26 sector threat monitor (AI model search MANDATORY first)"
    },
    {
      "id": 15,
      "title": "Small Cap Rerating + Stock Watching Criteria",
      "body": "FULL SCAN SECTION G — STOCK WATCHING CRITERIA: (1) CONTRACT/CUSTOMER WIN. (2) TECHNOLOGY VALIDATION. (3) ANALYST INITIATION/UPGRADE. (4) INSIDER BUYING. (5) EARNINGS INFLECTION. (6) SHORT SQUEEZE SETUP. (7) SECTOR CATALYST. ENTRY: pullback on broad weakness, volume drying at support, insider buying at lows. EXIT: thesis-break, competitor superior tech, partner abandons, management failure."
    },
    {
      "id": 16,
      "title": "IAG Peace Dividend — CLOSED",
      "body": "IAG.L CLOSED SESSION 08. Bought 355.18p, sold 370p. Profit ~£326. SI RESOLVED."
    },
    {
      "id": 17,
      "title": "CLAUDE ERROR REDUCTION — 13 ERROR TYPES CODIFIED",
      "body": "ERRORS E1-E10 (see LESSONS_LEARNED.md for full taxonomy):\nE1: Timezone. E2: Stale position. E3: Fill re-flag. E4: Price verification. E5: Market timing. E6: Dividend capture. E7: Session discipline. E8: Stale quote. E9: GTC orphan. E10: Closed position scan.\n\nADDED SESSION 19:\nE11 — 52WK HIGH HALLUCINATION: Stating 52wk range from memory. Errors: NVDA -40% drawdown (actual -7.4%), NVDA price $105 (actual $196.51), ASML -24% drawdown (actual -4.5%), META price $570 (actual $662.49). Fix: EOD:get_us_live_extended_quotes mandatory for ALL drawdown claims. Memory forbidden.\nE12 — TOOL ROUTING GAP: Not knowing which tool provides what. MMD=current price. EODHD extended quotes=52wk range, P/E, market cap. Never conflate.\nE13 — EODHD PRICE DELAY: EODHD previousCloseDate may be 4-6 days stale. Use MMD for current session price. EODHD for fundamentals/52wk range only.\n\nRECURRING ERRORS (E1-E10 original text):\n(1) TIMEZONE — UAE is UTC+4, NY is UTC-4. US market opens 17:30 UAE, not 13:30. (2) STALE POSITION DATA — always cross-check with IBKR. (3) FILL RE-FLAG — check IBKR fills tab before flagging orders. (4) PRICE VERIFICATION — MMD primary, EODHD extended quotes for 52wk. (5) MARKET TIMING — LSE 12:00-20:30 UAE, NYSE 17:30-00:00 UAE. (6) DIVIDEND CAPTURE — RR.L ex-div Apr 23 hard lock. (7) LONG SESSION DISCIPLINE. (8) Always cross-reference. (9) CONGRESSIONAL SCAN — broad sweep ALL stocks >$50K, capitoltrades.com. (10) CLOSED POSITION IN LIVE SCAN — before any scan table, cross-reference SI-19 closed trades list."
    },
    {
      "id": 18,
      "title": "SLDP Research Report — Completed Mar 30 2026",
      "body": "Deep fundamental analysis completed. Entry: $2.20-2.50. Stop $1.80. Max $500-$1,000. WATCH — DO NOT BUY until decline stabilises."
    },
    {
      "id": 19,
      "title": "STOPPED OUT / CLOSED POSITIONS — REALIZED TRACKING (SI-19)",
      "body": "ONDS: 250 shares stopped $8.50 Mar 30. Loss ~$601. KTOS: 100 shares stopped $65 Mar 30. Loss ~$1,601. CCL: 240 shares sold Mar 26. Profit +$122. UEC: 206 shares sold Mar 31 @ $13.16. Loss ~$127. IAG.L: 2200 shares sold Apr 1 @ 370p. Profit ~£326. RCL: 36 shares stopped Apr 2 @ $269.91. Loss ~$132. LDO.MI: 17 shares stop limit Apr 7 @ €59.56. Profit +€21.52. LEU: 13 shares stopped Apr 7 @ $170.54. Loss ~$238. CONFIRMED CLOSED S19. PLTR: stopped Apr 9 @ $134.976. Loss -$1,307. PDYN partial: 250 shares sold S18 ~$6.665. Profit +$17.42. Total net realized since inception: ~$2,144 net loss. Capital preserved."
    },
    {
      "id": 20,
      "title": "BTC Position — Entry Rules",
      "body": "BTC PLANNED MATERIAL POSITION (5-7.5% portfolio). Vehicle: IBKR Paxos spot BTC (preferred over IBIT). Entry target $55K. Stop $48K. First target $100K. Second target $120K. NO ORDER PLACED. BTC ~$74,592 (Yahoo Finance Apr 15). Watch for pullback to $55K."
    },
    {
      "id": 21,
      "title": "ITM Power — Entry Rules + Breakout Protocol",
      "body": "ENTERED SESSION 08 @ 64.8-65p. 3100 shares. Cost £2,018. Stop 84p/82.5p GTC (S18 raised). Breakout management: above 95p on volume → raise stop to 90p/88.5p. Target 1: 98p. Target 2: 130p. Thesis: EU energy independence, green hydrogen demand structural post-Hormuz."
    },
    {
      "id": 22,
      "title": "EU Energy Basket — Watchlist",
      "body": "Priority: (1) ITM.L — IN PORTFOLIO. (2) CWR.L Ceres Power — entry 250-270p pullback only. (3) AFC.L AFC Energy — moonshot £500 max. (4) H2O.DE Enapter AG — research needed. (5) IKA.L Ilika — solid-state, £500 max. (6) ALFEN.AS Alfen NV — May 12 earnings, research needed. (7) YCA.L Yellow Cake — 500-520p pullback only. (8) COST.L Costain — nuclear infrastructure, P/E ~8x. (9) ASY.PA Assystem — strongest under-radar candidate."
    },
    {
      "id": 23,
      "title": "Supply Chain Disruption Plays — Watchlist",
      "body": "CF Industries (CF) — entry $115-120 on ceasefire pullback. NTR Nutrien — entry $70-73 on pullback. Both face DOJ antitrust inquiry risk. LIN Linde — WATCH ONLY under toll regime. VLO Valero — REMOVED."
    },
    {
      "id": 24,
      "title": "Cash Preservation — 10% Floor (REVISED S12)",
      "body": "MINIMUM CASH RESERVE = 10% OF NET LIQUIDITY. Confirmed S12, reconfirmed S17. At $102,600 NAV, floor = $10,260. The 25% figure is permanently retired. Deployable capital = cash minus 10% floor. Do NOT force entries outside SI-39 trigger conditions."
    },
    {
      "id": 25,
      "title": "SI-25 EXIT TRIGGER — OIL BASED NOT CEASEFIRE BASED",
      "body": "EXIT TRIGGER: Formal Hormuz reopening CONFIRMED + WTI -10% from peak. BOTH conditions must be met simultaneously.\nCurrent WTI peak: $111.54. Trigger: $100.38.\nCurrent WTI: ~$97. NOT TRIGGERED.\nUS blockade escalation = thesis STRENGTHENED, not weakened. Ceasefire expiry Apr 22 = dominant binary but does NOT automatically trigger exit."
    },
    {
      "id": 26,
      "title": "SECTOR THREAT MONITOR — MANDATORY FULL SCAN SECTION K",
      "body": "ADDED S13 — TRIGGERED BY MYTHOS MISS. Section K: mandatory at every full scan. AI model search (query a) NON-NEGOTIABLE every session.\n\nSECTOR 1: DEFENCE [AVAV, RR] — ETF canary: ITA. Query: 'defence contract award drone OR Rolls-Royce contract OR NATO budget cut'\nSECTOR 2: NUCLEAR [CCJ] — ETF canary: URA. Query: 'uranium spot price OR nuclear reactor incident OR SMR programme'\nSECTOR 3: AI/CLOUD [MSFT, AMZN, PDYN] — ETF canary: IGV. MANDATORY: 'AI model announcement Anthropic OR OpenAI OR Google OR Meta [month year]'\nSECTOR 4: MEDICAL ROBOTICS [ISRG] — ETF canary: IHI. Query: 'surgical robot competitor OR ISRG FDA OR da Vinci China'\nSECTOR 5: BIOTECH [ABVX] — ETF canary: XBI. Query: 'ulcerative colitis drug approval OR Abivax Phase 3'\nSECTOR 6: BATTERY/DRONE [AMPX] — Query: 'silicon anode battery breakthrough OR drone endurance battery'\nSECTOR 7: MARITIME [CODA] — Query: 'underwater defence sensor contract OR Coda Octopus'\nSECTOR 8: POWER [VST] — ETF canary: XLU. Query: 'AI data centre power demand OR ERCOT Texas OR Vistra'\nSECTOR 9: EU HYDROGEN [ITM] — Query: 'EU green hydrogen policy OR electrolyser contract OR ITM Power'\n\nEXECUTION: One search per sector per session. ETF canary -1.5%+ = flag immediately. Sector 3a is NON-NEGOTIABLE after Mythos miss."
    },
    {
      "id": 27,
      "title": "PRICE & NEWS SOURCE HIERARCHY",
      "body": "PRICE HIERARCHY:\n(1) EODHD MCP — primary for fundamentals, insider data, earnings. Ticker format: SYMBOL.EXCHANGE.\n(2) MMD — US equities current price. /v2/aggs/ticker/{TICKER}/prev.\n(3) IBKR screenshots — GROUND TRUTH. Overrides ALL sources.\n(4) Yahoo Finance — EU/UK current price fallback.\n(5) Reuters, FT.com — macro/corporate news.\n\nEODHD EXTENDED QUOTES — for 52-week range only. Use get_us_live_extended_quotes.\n\nPROHIBITED: GuruFocus, PitchBook, Macroaxis. EODHD earnings endpoint (403 — use web search)."
    },
    {
      "id": 28,
      "title": "SESSION CLOSE PROTOCOL — C DRIVE WRITE CONFIRMED (S19)",
      "body": "MANDATORY SESSION CLOSE SEQUENCE (S19 UPDATED — C DRIVE WRITE ACTIVE):\n\nClaude executes automatically:\n1. Build session-close block using standard template\n2. filesystem:write_file → C:\\Users\\jcadb\\claude-fund\\journal\\trading_journal[N+1].jsx\n3. filesystem:write_file → C:\\Users\\jcadb\\claude-fund\\state\\FUND_SESSION_STATE.md\n4. filesystem:write_file → C:\\Users\\jcadb\\claude-fund\\state\\LESSONS_LEARNED.md\n5. Update hormuz_log.md if thesis status changed\n6. Update trade tracker if fills confirmed\n\nUser executes:\n7. Delete OLD journal version from Claude project\n8. Upload new trading_journal[N+1].jsx to Claude project\n9. Run session-close.bat (GitHub backup)\n10. Verify project shows correct session number\n\nNOTE: filesystem:write_file is confirmed working (S19). Claude writes directly to C drive. No manual copy-paste for .md files. Priority is data preservation over file size — large files are fine."
    },
    {
      "id": 29,
      "title": "EU/UK POWER THESIS BASKET — PERMANENT SCAN SECTION",
      "body": "EU/UK Power Thesis Basket is a permanent full scan section. Grid diversification plays — alternative energy, storage, electrolysers, geothermal, cables, smart grid. ALL positions in this basket capped at MOONSHOT sizing (max £500-£1,500) unless reclassified.\n\nBASKET: (1) ITM.L — LIVE POSITION. (2) CWR.L — 250-270p pullback, max £750-1,000. (3) AFC.L — 10.36p zone, max £500. (4) H2O.DE — €1.20-1.60 zone, max €500. (5) IES.L Invinity — 14-15p, max £500. (6) 4DS.DE Daldrup Söhne — €23-24.50, max €1,000-1,500. (7) PRY.MI Prysmian — €85-92 pullback, max £2,000-3,000. (8) ALFEN.AS — research needed, May 12 earnings. (9) SSE.L — research needed. (10) SPIE.PA — research needed. (11) NEL.OL — research needed. (12) UKW.L — income play, any pullback, max £1,000-2,000."
    },
    {
      "id": 30,
      "title": "TACTICAL CEASEFIRE BOOK — RESOLVED S14",
      "body": "TACTICAL BOOK RESOLVED S14. UPS closed same day S12 -$30.61. UAL never filled — cancelled. Hard exit deadline Apr 21 — no tactical positions remain. SI-30 archived."
    },
    {
      "id": 31,
      "title": "ENTRY READINESS BASELINE — ARCHIVED (SEE SI-25, SI-39)",
      "body": "Superseded by SI-25 (exit trigger) and SI-39 (Section 0 scanner). See those SIs for current entry readiness protocol."
    },
    {
      "id": 32,
      "title": "SESSION START PROTOCOL — C DRIVE READ MANDATORY (S19 UPDATED)",
      "body": "MANDATORY SESSION START — EXECUTE IN EXACT ORDER:\n\nSTEP 1: filesystem:read_text_file('C:\\Users\\jcadb\\claude-fund\\state\\FUND_SESSION_STATE.md')\n→ Current positions, thesis, cash, active stops, deployment plan.\n\nSTEP 2: filesystem:read_text_file('C:\\Users\\jcadb\\claude-fund\\state\\LESSONS_LEARNED.md')\n→ Error taxonomy, strategic lessons, scan protocol. Permanent knowledge base.\n\nSTEP 3: Check journal lastUpdated vs today. If >1 session behind:\n→ FLAG: '⚠️ JOURNAL FRESHNESS: Shows Session [N], today is Session [N+X]. Confirm journal is current before proceeding.'\n\nSTEP 4: Request IBKR screenshots (positions + orders tabs).\n→ IBKR = ground truth. Cross-check against state file.\n\nSTEP 5: SECTION 0 — EOD:get_us_live_extended_quotes batch all Tier 1 SI-39 names.\n→ Drawdown table output. Triggered names = session research priority.\n\nSTEP 6: SI-14 full scan sections A-K.\n\nFALLBACK: If filesystem MCP unavailable → log FILESYSTEM UNAVAILABLE and use project journal + IBKR screenshots only.\nGOOGLE DRIVE: DEPRECATED."
    },
    {
      "id": 33,
      "title": "MEMORY HIERARCHY — TOKEN EFFICIENCY",
      "body": "FUND_SESSION_STATE.md: dynamic — updated every session. Current positions, stops, cash, key dates.\nLESSONS_LEARNED.md: permanent — updated when new error type or strategy insight. Stable.\ntrading_journal[N].jsx: structural — full state + SIs + watchlists. Rebuilt at session close.\nTrade Tracker XLSX: append-only. One row per fill.\nSESSION_RECAP.md: DEPRECATED — eliminated since C drive direct write confirmed S19. All updates go directly into journal and .md files."
    },
    {
      "id": 34,
      "title": "TRADE TRACKER UPDATE PROTOCOL",
      "body": "FILE: Claude_Fund_Trade_Tracker.xlsx\nLOCATION: C:\\Users\\jcadb\\claude-fund\\tracker\\\n\nTRIGGER: Any confirmed IBKR fill.\n\nPROTOCOL: (1) User confirms fill via IBKR. (2) Open existing tracker — do NOT rebuild. (3) Append one row: Trade#, Date In, Date Out, Ticker, Company, Qty, Entry Price, Exit Price, CCY, P&L Native, P&L USD, Status, Running Balance. (4) Save and present_files. (5) Confirm: 'Trade tracker updated — Trade #[N] added.'\n\nNEVER use estimated prices. IBKR fill confirmation only."
    },
    {
      "id": 35,
      "title": "DOLLAR-RISK POSITION SIZING — MANDATORY FOR ALL NEW ENTRIES",
      "body": "CODIFIED S16. Root cause: KTOS $8,100 @ 20% stop = $1,620 risk. Correct: $500/0.20 = $2,500.\n\nProtocol: (1) Max acceptable loss per trade: $500. (2) Stop%: (entry-stop)/entry. (3) Position: $500/stop% = max deployment. (4) Cap at SI-37 for speculative names.\n\nStop 5% → $10,000 max. 8% → $6,250. 10% → $5,000. 15% → $3,333. 20% → $2,500. 25% → $2,000.\n\nOverride: 1.5× permitted only for exceptional fundamental anchor with tight (<8%) stop — requires journal notation."
    },
    {
      "id": 36,
      "title": "MINIMUM 2:1 RISK-REWARD FILTER",
      "body": "CODIFIED S16. Min R:R to enter: 2.0:1. Below 2:1 = do not enter regardless of conviction.\n\nExemptions: Tactical binary-catalyst positions <$2,000, max 1.5:1. Existing holdings — applies to adds only.\n\nS19 NOTE: RTX removed partly because R:R at $202.81 was inverted given ceasefire timing. V added at $307 with R:R 4.2:1 to consensus $399."
    },
    {
      "id": 37,
      "title": "SPECULATIVE POSITION HARD CAP — $1,500 MAXIMUM",
      "body": "CODIFIED S16. Speculative = pre-revenue, no imminent catalyst, narrative-only entry, stopped-out within 90 days, or active short attack.\n\nHARD CAP: $1,500 per speculative name. No override.\n\nCurrent book: AMPX $3,042 (grandfathered — May 7 earnings), PDYN $1,649 (within cap post S18 partial exit), CODA $4,994 (grandfathered — thesis catalyst pending)."
    },
    {
      "id": 38,
      "title": "STRUCTURE-BASED STOP PLACEMENT — NO ROUND NUMBERS",
      "body": "CODIFIED S16. Place stops 1-2% BELOW confirmed support. Never AT the level. No round numbers (use $419.13 not $420, $7.85 not $8.00).\n\nS19 NOTE: AVAV stop raised to $186.21 (not $186 or $185). NOG stop at $22.50 — review if structural support level exists below this."
    },
    {
      "id": 39,
      "title": "SI-39: UNDERVALUED US LARGE CAP SCANNER — SECTION 0 OF EVERY FULL SCAN",
      "body": "PURPOSE: Identify quality large-cap US stocks in macro-driven drawdowns before recovery window closes. ORIGIN: GOOGL missed at $280 March 2026 — no protocol existed to flag it. Recovered +18.5% in 5 weeks.\n\nSECTION 0 EXECUTION (every full scan, fires FIRST):\n1. Call EOD:get_us_live_extended_quotes batch: ['NVDA.US','META.US','GOOGL.US','AAPL.US','V.US','LLY.US','TSM.US','COST.US','ASML.US']\n2. Pull current prices from MMD for same names\n3. Calculate drawdown: (current - 52wkHigh) / 52wkHigh\n4. Flag any name at/beyond trigger threshold\n5. Triggered names = session research priority\n\nTIER 1 TRIGGERS (EODHD verified S19):\nNVDA: trigger -25% → below $159.14 | META: trigger -20% → below $637.00 | GOOGL: trigger -18% → below $286.18 | AAPL: trigger -15% → below $245.33 | V: trigger -15% → below $319.18 [CURRENTLY TRIGGERED $311.37 — order placed] | LLY: trigger -20% → below $907.16 | TSM: trigger -20% → below $312.17 | COST: trigger -15% → below $906.02 | ASML: trigger -20% → below $1,237.78\n\nENTRY RULES:\n— Never enter on day of flagging (min 1 session research)\n— Dollar-risk sizing applies\n— Max per SI-39 position: $4,000\n— Max aggregate SI-39 exposure: 20% of NAV\n— Default hold: 4-8 weeks or to next earnings\n\nSECTION 0 OUTPUT: Tier 1 drawdown table + screener hits + priority research list."
    },
    {
      "id": 40,
      "title": "SI-40: 52-WEEK DATA PROTOCOL — MANDATORY TOOL ROUTING",
      "body": "THE ONLY AUTHORISED SOURCE for US stock 52wk high/low:\nTOOL: EOD:get_us_live_extended_quotes\nFIELDS: fiftyTwoWeekHigh, fiftyTwoWeekLow\nBATCH up to 9 symbols per call.\n\nFOR EU/UK: web_fetch https://finance.yahoo.com/quote/{TICKER}/ OR web_search '{TICKER} 52 week high 2026'. FT.com and Reuters also carry this.\n\nEODHD DELAY WARNING: previousCloseDate may show 4-6 days prior. 52wk range data is accurate regardless. Do NOT use EODHD lastTradePrice for current price — use MMD.\n\nMEMORY ESTIMATES FOR 52-WEEK RANGE ARE FORBIDDEN. No exceptions, no approximations.\n\nS19 ERRORS THIS PREVENTS: NVDA ~$105 (actual $196.51), NVDA -40% drawdown (actual -7.4%), ASML -24% drawdown (actual -4.5%), META ~$570 (actual $662.49)."
    },
    {
      "id": 41,
      "title": "CATALYST-ANCHORED ENTRY REQUIREMENT",
      "body": "Before any new entry, identify at least ONE: (A) EARNINGS within 8 weeks with specific metric. (B) CONTRACT/ORDER award expected within 8 weeks. (C) TECHNICAL CONFIRMATION: at entry zone + volume dry-up / RSI <40 / higher low. (D) STRUCTURAL VALUE: P/E or P/S below sector median + revenue growth.\n\nBARRED: Stock within 5% of 52-week high with no imminent catalyst. Pure thesis-only entry. Re-entry within 30 days of stop-out without new specific catalyst.\n\nRE-ENTRY RULE (P11): After stop-out, do NOT re-enter until price pulls back BELOW stop-out price."
    },
    {
      "id": 42,
      "title": "CASH DEPLOYMENT TRIGGERS",
      "body": "CURRENT CASH FLOOR: 10% of NAV ($10,260 at $102,600). Inviolable.\n\nDEPLOYMENT TRIGGERS:\nA: Islamabad fails + Hormuz closed 5+ days → ACTIVATED Apr 12.\nB: Price enters defined entry zone + catalyst within 8 weeks.\nC: Existing position stops out → redeploy 80% within 48hrs.\nD: BTC at or below $55,000 → 5-7.5% of NAV.\nE: Earnings catalyst within 3 days for watchlist name at entry zone.\n\nDEPLOYMENT TARGET: ~15% cash (current ~25%). Triggered entries only."
    }
  ],
  "watchlistUS": [
    {
      "ticker": "V", "name": "Visa Inc", "exchange": "NYSE",
      "status": "ACTIVE — BUY LIMIT $307 GTC — SI-39 TRIGGERED",
      "currentPrice": 311.37, "52wkHigh": 375.51, "drawdown": -17.1,
      "entry": "$307 GTC placed S19", "stop": 285, "target": 399,
      "note": "SI-39 TRIGGERED (-17.1% from 52wk high $375.51). ORDER PLACED 8 shares. FCF $22.9B, EBIT 67%, 97.8% gross margin. Earnings Apr 28 AMC (Q2 EPS consensus $3.09). 36 Buy/3 Hold/0 Sell. Consensus $399 = +28%. Consumer sentiment fear is the driver — business volumes intact. Stablecoin validator node + Canton Super Validator = optionality. Tranche 2 post-earnings: beat + volumes resilient → add 8 shares Apr 29 open at market."
    },
    {
      "ticker": "TSM", "name": "Taiwan Semiconductor", "exchange": "NYSE",
      "status": "WATCH — POST APR 16 EARNINGS ENTRY",
      "currentPrice": 379.89, "52wkHigh": 390.21, "drawdown": -2.7,
      "entry": "$372 (in-line) or $350 (miss/disappointment)", "stop": 340, "target": 450,
      "note": "Q1 revenue $35.7B beat (+35.1% YoY). Full earnings Apr 16 10AM UAE. Q2 guidance = key number ($37-38B consensus). PEG 0.53 — genuinely cheap for a monopoly. Post-earnings entry ONLY. Not a drawdown play at -2.7%. Earnings tomorrow — no entry today."
    },
    {
      "ticker": "LLY", "name": "Eli Lilly and Company", "exchange": "NYSE",
      "status": "NEAR SI-39 TRIGGER — S20 RESEARCH PRIORITY",
      "currentPrice": 922.50, "52wkHigh": 1133.95, "drawdown": -18.6, "trigger": -20, "triggerPrice": 907.16,
      "entry": "$900-920 if trigger confirmed", "stop": 850,
      "note": "S19 FLAG: 1.4% from -20% trigger ($907.16). Mounjaro/Tirzepatide GLP-1 demand intact. Decline from $1,134 on valuation concerns and competitive GLP-1 landscape. Run full research if price reaches $907.16. Session 20 deep dive priority."
    },
    {
      "ticker": "GOOGL", "name": "Alphabet Inc", "exchange": "NASDAQ",
      "status": "MONITOR — NEXT TRIGGER $286.18",
      "currentPrice": 332.91, "52wkHigh": 349.00, "drawdown": -4.6, "trigger": -18, "triggerPrice": 286.18,
      "note": "MISSED AT $280 MARCH 2026 — origin of SI-39. -20% macro selloff, recovered +18.5% in 5 weeks. Next trigger: $286.18. Business: Search monopoly, Cloud +28%, YouTube, $100B+ net cash. P/E ~20x at $286. If/when trigger re-hits: immediate entry, $4,000 max."
    },
    {
      "ticker": "ORCL", "name": "Oracle Corporation", "exchange": "NYSE",
      "status": "WATCH — 4 CONDITIONS MUST CLEAR BEFORE ENTRY",
      "currentPrice": 163.00, "entry": "$155-163 post-conditions", "stop": 142,
      "note": "S19 REJECTED. Conditions: (1) Fiduciary investigation filed Apr 14 — must resolve. (2) FCF -$13.18B LTM — must show improving trajectory. (3) No earnings until June. (4) OpenAI concentration risk. Mizuho $320 Buy (Apr 2), Barclays $240 Buy. At $163 = 58.9% upside to consensus $259. Not enough to justify entry with 4 open risks."
    },
    {
      "ticker": "RTX", "name": "RTX Corporation", "exchange": "NYSE",
      "status": "WATCH ONLY — DO NOT ENTER AT CURRENT LEVELS. Re-entry $185-190 on peace deal selloff only.",
      "currentPrice": 202.81, "entry": "$185-190 ON PEACE DEAL SELLOFF ONLY", "stop": 175, "target": 225,
      "note": "S19 REMOVED FROM ACTIVE ENTRY. Thesis fully priced at ATH. Consensus $216.34 = only 6.7% upside. De-escalation/peace deal would trigger -12 to -18% selloff. R:R inverted at $202.81. Ceasefire expiry Apr 22 = dominant risk. Re-entry ONLY on confirmed peace deal selloff to $185-190, where multi-year replenishment cycle provides floor. Earnings Apr 21 — watch only. Q4 2025: 850+ Tomahawks fired, $381M new contract, $6.6B F135."
    },
    {
      "ticker": "NOG", "name": "Northern Oil & Gas", "exchange": "NYSE",
      "status": "ACTIVE — BUY LIMIT $25.08 GTC",
      "currentPrice": 25.90, "entry": "$25.08 GTC placed", "stop": 22.50,
      "note": "S19 ORDER PLACED. Below entry zone $26-27.50. Citi Buy $36 (Apr 14 fresh). 6.5% dividend. Non-operated E&P. FCF scales with oil. Consensus $35.40 (+38.76% upside). Earnings Apr 30. Entry $25.08 (not $25.00 — avoid round number stop-hunt zone)."
    },
    {
      "ticker": "SLV", "name": "iShares Silver Trust", "exchange": "NYSE",
      "status": "ACTIVE — BUY LIMIT $70.50 GTC",
      "currentPrice": 72.04, "entry": "$70.50 GTC placed", "stop": 64.50,
      "note": "S19 ORDER PLACED. Silver -36% from January ATH. Structural 6-year supply deficit. Peace deal asymmetry: if Hormuz deal + oil drops below $100 → USD weakens → silver explodes. Do not enter above $73. Apr 22 ceasefire expiry = primary catalyst. JP Morgan average forecast $81 for 2026."
    },
    {
      "ticker": "OXY", "name": "Occidental Petroleum", "exchange": "NYSE",
      "status": "WATCH — TRANCHE 2 POST APR 22 CEASEFIRE EXPIRY",
      "currentPrice": 55.38, "entry": "$54.50 GTC post-Apr 22", "stop": 48,
      "note": "Post-blockade thesis. Permian Basin. Debt reduction ongoing. Vicki Hollub retiring — Richard Jackson CEO. Q1 earnings May 7. At $54.50 entry: R:R to $80 = 3.9:1. Place GTC after Apr 22 resolution clarity."
    },
    {
      "ticker": "BKR", "name": "Baker Hughes", "exchange": "NYSE",
      "status": "WATCH — ALERT $58.50 POST APR 22 EARNINGS",
      "currentPrice": 61.49, "entry": "$58.50 post-Apr 22 earnings", "stop": 55,
      "note": "Oilfield services + LNG compression equipment. Structural tailwinds beyond oil price binary. Earnings Apr 22. Do not enter pre-earnings. Post-earnings entry only at $58.50 alert."
    },
    {
      "ticker": "KTOS", "name": "Kratos Defense", "exchange": "NASDAQ",
      "status": "WATCH — REENTRY $62-67 on pullback",
      "currentPrice": 67.7, "entry": "$62-67 pullback", "stop": 58, "positionSizeMax": "$3,000-4,000",
      "note": "Stopped out $64.98 Mar 30 — bounced to $70.51 immediately. Golden Dome contracts, Valkyrie XQ-58A, hypersonic target drone. Entry only on dip to $62-67."
    },
    {
      "ticker": "CF", "name": "CF Industries", "exchange": "NYSE",
      "status": "WATCH — Entry $115-120 on ceasefire pullback",
      "currentPrice": 129.84, "entry": "$115-120 pullback", "stop": 100, "positionSizeMax": "$1,500-2,000",
      "note": "N. American nitrogen. Low-cost US gas vs global. DOJ antitrust inquiry risk."
    },
    {
      "ticker": "NTR", "name": "Nutrien Ltd", "exchange": "NYSE",
      "status": "WATCH — Entry $70-73 pullback",
      "currentPrice": 75.46, "entry": "$70-73", "stop": 62,
      "note": "Diversified fertiliser. Wells Fargo/Jefferies Buy $96-100."
    },
    {
      "ticker": "UMAC", "name": "Unusual Machines", "exchange": "NYSE American",
      "status": "WATCH — $11-13 pullback", "entry": "$11-13", "stop": 9,
      "note": "NDAA-compliant drone components. CFO/CRO selling. $150M dilutive offering."
    },
    {
      "ticker": "CCRN", "name": "Cross Country Healthcare", "exchange": "NASDAQ",
      "status": "WATCH — Q1 inflection", "currentPrice": 9.73, "entry": "$8-10", "stop": 7,
      "note": "Healthcare staffing turnaround. Wait for Q1 revenue stabilisation."
    },
    {
      "ticker": "SLDP", "name": "Solid Power Inc", "exchange": "NASDAQ",
      "status": "WATCH — $2.20-2.50 entry", "currentPrice": 2.92, "entry": "$2.20-2.50", "stop": 1.8,
      "note": "Solid-state battery electrolyte supplier. SK On site acceptance imminent."
    },
    {
      "ticker": "ASTS", "name": "AST SpaceMobile", "exchange": "NASDAQ",
      "status": "WATCH — DO NOT BUY above $95", "currentPrice": 93.4, "entry": "$80-85 pullback", "stop": 65,
      "note": "Space cellular broadband. Heavy insider selling. Optionality only."
    },
    {
      "ticker": "BTC", "name": "Bitcoin — IBKR Paxos spot", "exchange": "IBKR",
      "status": "WATCH — $55K target, NO ORDER PLACED", "currentPrice": 74592, "entry": "$55,000 GTC — NOT YET PLACED", "stop": 48000,
      "note": "SI-20: 5-7.5% portfolio via IBKR Paxos spot. Direct spot preferred over MSTR. Entry target $55K not in range."
    },
    {
      "ticker": "LEU", "name": "Centrus Energy Corp", "exchange": "NYSE",
      "status": "WATCHLIST — STOPPED OUT APR 7. CONFIRMED CLOSED S19.",
      "currentPrice": 170.54, "entry": "Re-entry only: US HALEU contract >$500M OR price $140-150 OR US grid emergency.", "stop": 145,
      "note": "Stopped Apr 7 @ $170.54. Loss ~$238. Nuclear thesis Tier 3 — US domestic only. Re-entry requires confirmed US policy catalyst."
    },
    {
      "ticker": "ONDS", "name": "Ondas Inc", "exchange": "NASDAQ",
      "status": "WATCH — re-entry $8.50-9.00 on pullback. STOPPED OUT Mar 30.",
      "currentPrice": 9.13, "entry": "$8.50-9.00 pullback", "stop": 7.5, "positionSizeMax": "$1,500",
      "note": "Stopped Mar 30 @ $8.50. FY2025 rev $50.7M (+605%). World View acquisition. May 18-21 earnings. Do not chase at $9.13."
    },
    {
      "ticker": "ZETA", "name": "Zeta Global", "exchange": "NYSE",
      "status": "DO NOT ENTER — Culper Research short attack active Apr 2026",
      "currentPrice": 14.61, "entry": "$11-13 only if Culper thesis refuted", "stop": 9,
      "note": "Culper Research: consentless data practices + round-trip revenue. GAAP losses. Uninvestable until refuted."
    },
    {
      "ticker": "MSTR", "name": "Strategy Inc", "exchange": "NASDAQ",
      "status": "WATCH — entry $90-105 only. SI-20 preference for spot BTC.",
      "currentPrice": 128.64, "entry": "$90-105", "stop": 75,
      "note": "Leveraged BTC proxy. SI-20 preference for direct spot via Paxos. Only consider if mNAV below 1.0x."
    }
  ],
  "watchlistEU": [
    {
      "ticker": "R3NK", "name": "RENK Group AG", "exchange": "XETRA", "ibkr": "R3NK IBIS",
      "current": 52.06, "entry": "IN PORTFOLIO", "target": 76, "cur": "EUR",
      "thesis": "IN PORTFOLIO. Stop Limit €48/€47. May 6 earnings. 14 analyst Buy consensus €68.",
      "note": "HELD. €200M deferred Q4 orders must appear May 6. EU rearmament 10-year cycle. R:R 3.9:1."
    },
    {
      "ticker": "HAG", "name": "Hensoldt AG", "exchange": "XETRA", "ibkr": "HAG IBIS",
      "current": 70, "entry": "€70-75", "target": 91, "cur": "EUR", "upside": 30,
      "thesis": "Radar + EW + optronics. €8.83B backlog. May 5 earnings. WATCH ONLY.",
      "note": "Adequate EU defence exposure in portfolio."
    },
    {
      "ticker": "LDO", "name": "Leonardo SpA", "exchange": "MILAN", "ibkr": "LDO BVME",
      "current": 55.87, "entry": "€53-56.50 (GTC €56 active)", "target": 68, "cur": "EUR", "upside": 11,
      "thesis": "EU defence prime. EU rearmament secular. May 5 earnings catalyst.",
      "note": "GTC €56 buy active. Stop €50/€49 to add on fill. Morningstar FV €75.60. R:R 3.5:1."
    },
    {
      "ticker": "CWR.L", "name": "Ceres Power", "exchange": "LSE", "ibkr": "CWR LSE",
      "current": 310, "entry": "250-270p pullback only", "target": "422p", "cur": "GBP", "upside": 36,
      "note": "ENTRY 250-270p ONLY. Do NOT chase at 310p."
    },
    {
      "ticker": "ITM.L", "name": "ITM Power PLC", "exchange": "LSE", "ibkr": "ITM LSE",
      "current": 91, "entry": "IN PORTFOLIO — 3100 shares @ 65.1p", "target": "98p / 130p", "cur": "GBP",
      "note": "HELD. Stop 84p/82.5p GTC. Next raise: 90p/88.5p on close above 95p on volume."
    },
    {
      "ticker": "AFC.L", "name": "AFC Energy", "exchange": "AIM", "ibkr": "AFC LSE",
      "current": 14.8, "entry": "Moonshot £500 max", "target": "22.6p", "cur": "GBP",
      "note": "HIGHEST RISK. Cash crunch incoming."
    },
    {
      "ticker": "H2O.DE", "name": "Enapter AG", "exchange": "Frankfurt", "ibkr": "H2O FRA",
      "current": null, "entry": "€1.20-1.60", "cur": "EUR", "note": "RESEARCH NEEDED."
    },
    {
      "ticker": "IKA.L", "name": "Ilika PLC", "exchange": "AIM", "ibkr": "IKA LSE",
      "current": "60-80p", "entry": "£500 moonshot max", "cur": "GBP", "note": "LOTTERY TICKET."
    },
    {
      "ticker": "ALFEN.AS", "name": "Alfen NV", "exchange": "Euronext Amsterdam", "ibkr": "ALFEN AMS",
      "current": null, "entry": "Research needed", "cur": "EUR", "note": "May 12 earnings. Research needed."
    },
    {
      "ticker": "YCA.L", "name": "Yellow Cake PLC", "exchange": "AIM/LSE", "ibkr": "YCA LSE",
      "current": "591-657p", "entry": "500-520p pullback only", "target": "743p", "cur": "GBP", "upside": 13,
      "note": "DO NOT CHASE near ATH. Wait for 500-520p."
    },
    {
      "ticker": "COST.L", "name": "Costain Group", "exchange": "LSE", "ibkr": "COST LSE",
      "current": "~135p", "entry": "Near current", "cur": "GBP",
      "note": "Nuclear decommissioning + Hinkley. P/E ~8x. RESEARCH NEEDED."
    },
    {
      "ticker": "ASY.PA", "name": "Assystem SA", "exchange": "Euronext Paris", "ibkr": "ASY EPA",
      "current": "47-52 EUR", "entry": "Research needed", "target": "55-60 EUR", "cur": "EUR",
      "note": "STRONGEST under-radar candidate. French nuclear engineering. EPR2 + EU SMR. RESEARCH NEEDED."
    },
    {
      "ticker": "HO", "name": "Thales SA", "exchange": "PARIS", "ibkr": "HO ENEXT.BE",
      "current": 235.6, "entry": "€230-240", "target": 293, "cur": "EUR", "upside": 24,
      "note": "MBDA missiles + cybersecurity + SAMP/T NG."
    },
    {
      "ticker": "CHG", "name": "Chemring Group", "exchange": "LSE", "ibkr": "CHG LSE",
      "current": 527, "entry": "500-530p", "target": 616, "cur": "GBP", "upside": 27,
      "note": "High explosives near-monopoly. NATO restock."
    },
    {
      "ticker": "BA", "name": "BAE Systems", "exchange": "LSE", "ibkr": "BA LSE",
      "current": 2250, "entry": "2200-2300p", "target": 2800, "cur": "GBP", "upside": 25,
      "note": "AUKUS nuclear subs + BATS counter-drone."
    },
    {
      "ticker": "BAB", "name": "Babcock International", "exchange": "LSE", "ibkr": "BAB LSE",
      "current": 1409, "entry": "1300-1420p", "target": 1700, "cur": "GBP", "upside": 21,
      "note": "Nuclear submarine MRO + AUKUS."
    },
    {
      "ticker": "CHRT", "name": "Cohort PLC", "exchange": "AIM", "ibkr": "CHRT LSE",
      "current": 1290, "entry": "1250-1350p", "target": 1570, "cur": "GBP", "upside": 22,
      "note": "Naval electronics + counter-drone. USE LIMIT ORDERS on AIM."
    },
    {
      "ticker": "KOG", "name": "Kongsberg Gruppen", "exchange": "OSLO", "ibkr": "KOG OL",
      "current": 389, "entry": "Wait Apr spinoff", "target": 500, "cur": "NOK", "upside": 28,
      "note": "Maritime spinoff Apr 2026 leaves pure-play defence."
    },
    {
      "ticker": "KNDS", "name": "KNDS (IPO 2026)", "exchange": "TBC", "ibkr": "TBC",
      "current": null, "entry": "Day-one buy", "cur": "EUR",
      "note": "Franco-German Leopard 2 maker. €23.5B backlog. Largest EU defence IPO 2026."
    }
  ],
  "sessionNotes": []
};

const COLORS = {
  bg: "#0a0a0f", cardBg: "#12121a", border: "#1e1e2e", accent: "#7c3aed",
  green: "#22c55e", red: "#ef4444", yellow: "#eab308", blue: "#3b82f6",
  text: "#e2e8f0", textDim: "#64748b", textBright: "#f8fafc"
};

export default function TradingJournal() {
  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : INITIAL_STATE;
    } catch { return INITIAL_STATE; }
  });
  const [activeTab, setActiveTab] = useState("positions");
  const [newNote, setNewNote] = useState("");
  const [editThesis, setEditThesis] = useState(false);
  const [thesisDraft, setThesisDraft] = useState("");

  const update = useCallback((newData) => {
    setData(newData);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(newData)); } catch {}
  }, []);

  const addNote = () => {
    if (!newNote.trim()) return;
    const note = { date: new Date().toISOString().split("T")[0], note: newNote };
    update({ ...data, sessionNotes: [note, ...(data.sessionNotes || [])] });
    setNewNote("");
  };

  const tabs = [
    { id: "positions", label: "Positions" },
    { id: "orders", label: "Orders" },
    { id: "watchlist", label: "Watchlist" },
    { id: "thesis", label: "Thesis" },
    { id: "scanner", label: "SI-39 Scanner" },
    { id: "instructions", label: "SIs" },
    { id: "notes", label: "Notes" }
  ];

  return (
    <div style={{ fontFamily: "'IBM Plex Mono', monospace", background: COLORS.bg, color: COLORS.text, minHeight: "100vh", padding: "16px" }}>
      <style>{`
        * { box-sizing: border-box; }
        .card { background: ${COLORS.cardBg}; border: 1px solid ${COLORS.border}; border-radius: 8px; padding: 14px; }
        .badge { display: inline-flex; align-items: center; padding: 2px 8px; border-radius: 4px; font-size: 10px; font-weight: 600; font-family: 'IBM Plex Mono'; }
        .badge-green { background: rgba(34,197,94,0.15); color: #22c55e; border: 1px solid rgba(34,197,94,0.3); }
        .badge-red { background: rgba(239,68,68,0.15); color: #ef4444; border: 1px solid rgba(239,68,68,0.3); }
        .badge-amber { background: rgba(234,179,8,0.15); color: #eab308; border: 1px solid rgba(234,179,8,0.3); }
        .badge-grey { background: rgba(100,116,139,0.15); color: #94a3b8; border: 1px solid rgba(100,116,139,0.3); }
        .badge-blue { background: rgba(59,130,246,0.15); color: #3b82f6; border: 1px solid rgba(59,130,246,0.3); }
        .btn { padding: 6px 14px; border-radius: 6px; border: none; cursor: pointer; font-family: 'IBM Plex Mono'; font-size: 11px; font-weight: 600; }
        .btn-primary { background: ${COLORS.accent}; color: white; }
        .btn-ghost { background: transparent; color: ${COLORS.textDim}; border: 1px solid ${COLORS.border}; }
        .btn-danger { background: rgba(239,68,68,0.15); color: #ef4444; border: 1px solid rgba(239,68,68,0.3); }
        input, textarea, select { background: ${COLORS.cardBg}; border: 1px solid ${COLORS.border}; border-radius: 6px; padding: 8px 12px; color: ${COLORS.text}; font-family: 'IBM Plex Mono'; font-size: 12px; width: 100%; }
        .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; }
      `}</style>

      {/* Header */}
      <div style={{ marginBottom: 16, padding: "12px 16px", background: COLORS.cardBg, border: `1px solid ${COLORS.border}`, borderRadius: 8, borderLeft: `3px solid ${COLORS.accent}` }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.textBright }}>CLAUDE FUND — SESSION {data.sessionNumber} — {data.lastUpdated}</div>
            <div style={{ fontSize: 11, color: COLORS.textDim, marginTop: 2 }}>{data.fund.account} | {data.fund.broker} | {data.fund.location}</div>
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <span className="badge badge-green">NL: ${(data.fund.netLiquidity / 1000).toFixed(1)}K</span>
            <span className="badge badge-amber">CASH: ${(data.fund.cash / 1000).toFixed(1)}K</span>
            <span className="badge badge-red">CEASEFIRE: APR 22</span>
            <span className="badge badge-red">BLOCKADE ACTIVE</span>
          </div>
        </div>
        <div style={{ marginTop: 8, fontSize: 10, color: COLORS.textDim, lineHeight: 1.5 }}>{data.fund.note.substring(0, 300)}...</div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 4, marginBottom: 16, flexWrap: "wrap" }}>
        {tabs.map(t => (
          <button key={t.id} className="btn" onClick={() => setActiveTab(t.id)}
            style={{ background: activeTab === t.id ? COLORS.accent : "transparent", color: activeTab === t.id ? "white" : COLORS.textDim, border: `1px solid ${activeTab === t.id ? COLORS.accent : COLORS.border}` }}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Positions Tab */}
      {activeTab === "positions" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {data.positions.map(p => (
            <div key={p.ticker} className="card" style={{ borderLeft: `3px solid ${p.unrealPnL >= 0 ? COLORS.green : COLORS.red}` }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8 }}>
                <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                  <span style={{ fontWeight: 700, fontSize: 14, color: COLORS.textBright }}>{p.ticker}</span>
                  {p.cur && <span className="badge badge-grey">{p.cur}</span>}
                  <span style={{ fontSize: 12, color: COLORS.textDim }}>{p.name}</span>
                </div>
                <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
                  <div><span style={{ fontSize: 10, color: COLORS.textDim }}>LAST </span><span style={{ fontSize: 13, fontWeight: 600, color: COLORS.textBright }}>{p.last}</span></div>
                  <div><span style={{ fontSize: 10, color: COLORS.textDim }}>COST </span><span style={{ fontSize: 12 }}>${p.costBasis?.toLocaleString()}</span></div>
                  <div><span style={{ fontSize: 10, color: COLORS.textDim }}>STOP </span><span style={{ fontSize: 12, color: COLORS.yellow }}>{p.stop || "NONE"}</span></div>
                  <span className={`badge ${p.unrealPnL >= 0 ? "badge-green" : "badge-red"}`}>{p.unrealPnL >= 0 ? "+" : ""}{p.unrealPnL?.toFixed(0)} ({p.unrealPct >= 0 ? "+" : ""}{p.unrealPct?.toFixed(1)}%)</span>
                </div>
              </div>
              <div style={{ marginTop: 6, fontSize: 11, color: COLORS.textDim, lineHeight: 1.6 }}>{p.note}</div>
            </div>
          ))}
        </div>
      )}

      {/* Orders Tab */}
      {activeTab === "orders" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {data.pendingOrders.map((o, i) => (
            <div key={i} className="card" style={{ borderLeft: `3px solid ${o.action === "BUY" ? COLORS.green : COLORS.red}` }}>
              <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
                <span style={{ fontWeight: 700, color: COLORS.textBright }}>{o.ticker}</span>
                <span className={`badge ${o.action === "BUY" ? "badge-green" : "badge-red"}`}>{o.action}</span>
                <span className="badge badge-grey">{o.type}</span>
                <span style={{ fontSize: 12 }}>Qty: {o.qty}</span>
                {o.limitPrice && <span style={{ fontSize: 12 }}>Limit: {o.limitPrice}</span>}
                {o.stopPrice && <span style={{ fontSize: 12, color: COLORS.yellow }}>Stop: {o.stopPrice}</span>}
                <span className="badge badge-grey">{o.tif}</span>
                <span className={`badge ${o.status?.includes("S19") ? "badge-blue" : "badge-amber"}`}>{o.status?.includes("S19") ? "NEW S19" : o.status}</span>
              </div>
              {o.note && <div style={{ marginTop: 6, fontSize: 11, color: COLORS.textDim }}>{o.note}</div>}
            </div>
          ))}
        </div>
      )}

      {/* SI-39 Scanner Tab */}
      {activeTab === "scanner" && (
        <div>
          <div style={{ marginBottom: 12, padding: 12, background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.3)", borderRadius: 8 }}>
            <div style={{ fontWeight: 700, color: COLORS.accent, marginBottom: 4 }}>SECTION 0 — RUNS FIRST AT EVERY FULL SCAN</div>
            <div style={{ fontSize: 11, color: COLORS.textDim }}>Tool: EOD:get_us_live_extended_quotes | Batch: {data.si39TierOneWatchlist?.batchSymbols?.join(", ")}</div>
            <div style={{ fontSize: 11, color: COLORS.textDim }}>Last verified: {data.si39TierOneWatchlist?.verified}</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {data.si39TierOneWatchlist?.names?.map(n => (
              <div key={n.ticker} className="card" style={{ borderLeft: `3px solid ${n.drawdown <= -(Math.abs(n.trigger)) ? COLORS.red : n.drawdown <= -(Math.abs(n.trigger) * 0.85) ? COLORS.yellow : COLORS.border}` }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
                  <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                    <span style={{ fontWeight: 700, fontSize: 14 }}>{n.ticker}</span>
                    <span style={{ fontSize: 12 }}>${n.price}</span>
                    <span style={{ fontSize: 12, color: COLORS.textDim }}>52wk high: ${n["52wkHigh"]}</span>
                  </div>
                  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <span className={`badge ${n.drawdown <= -(Math.abs(n.trigger)) ? "badge-red" : n.drawdown <= -(Math.abs(n.trigger) * 0.85) ? "badge-amber" : "badge-green"}`}>{n.drawdown?.toFixed(1)}%</span>
                    <span style={{ fontSize: 11, color: COLORS.textDim }}>trigger: {n.trigger}%</span>
                  </div>
                </div>
                <div style={{ marginTop: 4, fontSize: 11, color: COLORS.textDim }}>{n.status}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Watchlist Tab */}
      {activeTab === "watchlist" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ fontWeight: 600, color: COLORS.accent, fontSize: 12, marginBottom: 4 }}>US WATCHLIST</div>
          {data.watchlistUS?.map((w, i) => (
            <div key={w.ticker} className="card">
              <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap", marginBottom: 6 }}>
                <span style={{ fontWeight: 700 }}>{w.ticker}</span>
                <span style={{ fontSize: 12, color: COLORS.textDim }}>{w.name}</span>
                <span className={`badge ${w.status?.includes("ACTIVE") ? "badge-green" : w.status?.includes("DO NOT") ? "badge-red" : w.status?.includes("NEAR") ? "badge-amber" : "badge-grey"}`}>{w.status?.substring(0, 30)}</span>
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
                {w.upside && <span className="badge badge-green">+{w.upside}%</span>}
              </div>
              <div style={{ fontSize: 11, color: COLORS.textDim }}>{w.note}</div>
            </div>
          ))}
        </div>
      )}

      {/* Thesis Tab */}
      {activeTab === "thesis" && (
        <div>
          <div className="card" style={{ marginBottom: 12, borderColor: COLORS.accent, borderLeftWidth: 3 }}>
            <div style={{ fontWeight: 700, color: COLORS.accent, marginBottom: 8 }}>{data.thesis.title}</div>
            <div style={{ fontSize: 12, color: COLORS.text, lineHeight: 1.8 }}>{data.thesis.summary}</div>
          </div>
          <div className="grid-2" style={{ marginBottom: 12 }}>
            <div className="card">
              <div style={{ fontSize: 10, color: COLORS.textDim }}>HORMUZ STATUS</div>
              <div style={{ marginTop: 6, fontSize: 12, color: COLORS.red, lineHeight: 1.6 }}>{data.thesis.hormuzStatus}</div>
            </div>
            <div className="card" style={{ background: "rgba(239,68,68,0.05)", borderColor: "rgba(239,68,68,0.3)" }}>
              <div style={{ fontSize: 10, color: "#ef4444" }}>SI-25 EXIT TRIGGER</div>
              <div style={{ marginTop: 6, fontSize: 11, color: "#ef8888", lineHeight: 1.6 }}>{data.thesis.ceasefireFilter}</div>
            </div>
          </div>
          <div className="grid-3">
            {[{label:"WTI",val:`$${data.thesis.oilWTI}/bbl`},{label:"BRENT",val:`$${data.thesis.oilBrent}/bbl`},{label:"GOLD",val:`$${data.thesis.goldPrice}/oz`}].map(m => (
              <div key={m.label} className="card">
                <div style={{ fontSize: 10, color: COLORS.textDim }}>{m.label}</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: COLORS.textBright, marginTop: 4 }}>{m.val}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 12 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: COLORS.accent, marginBottom: 8 }}>KEY DATES</div>
            {data.thesis.keyDates?.filter(d => d.priority === "CRITICAL" || d.priority === "HIGH").map((d, i) => (
              <div key={i} className="card" style={{ marginBottom: 6, borderLeft: `3px solid ${d.priority === "CRITICAL" ? COLORS.red : COLORS.yellow}` }}>
                <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <span style={{ fontSize: 11, fontWeight: 600, minWidth: 80, color: COLORS.textBright }}>{d.date}</span>
                  <span style={{ fontSize: 11, color: COLORS.textDim, flex: 1 }}>{d.event}</span>
                  <span className={`badge ${d.priority === "CRITICAL" ? "badge-red" : "badge-amber"}`}>{d.priority}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Standing Instructions Tab */}
      {activeTab === "instructions" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {data.standingInstructions?.map(ins => (
            <div key={ins.id} className="card" style={{ display: "flex", gap: 12, borderLeft: ins.id === 1 || ins.id === 39 || ins.id === 40 ? `3px solid ${COLORS.accent}` : undefined }}>
              <div style={{ fontSize: 11, color: COLORS.accent, fontWeight: 700, minWidth: 28 }}>#{ins.id.toString().padStart(2,"0")}</div>
              <div>
                <div style={{ fontWeight: 600, color: COLORS.textBright, marginBottom: 4, fontSize: 12 }}>{ins.title}</div>
                <div style={{ fontSize: 11, color: COLORS.textDim, lineHeight: 1.6, whiteSpace: "pre-wrap" }}>{ins.body}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Notes Tab */}
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
                <button className="btn btn-danger" style={{ padding: "2px 8px", fontSize: 10 }} onClick={() => update({ ...data, sessionNotes: data.sessionNotes.filter((_,j) => j !== i) })}>DELETE</button>
              </div>
              <div style={{ fontSize: 12, color: COLORS.text, lineHeight: 1.7 }}>{n.note}</div>
            </div>
          ))}
        </div>
      )}

      {/* Footer */}
      <div style={{ marginTop: 24, paddingTop: 12, borderTop: `1px solid ${COLORS.border}`, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <span style={{ fontSize: 10, color: COLORS.textDim }}>JOURNAL v29 // SESSION 19 // {data.fund.account} // C DRIVE WRITE CONFIRMED</span>
        <div style={{ display: "flex", gap: 8 }}>
          <span className="badge badge-amber">EU ACCESS: {data.fund.ibkrEuropeanAccess}</span>
          <span className="badge badge-red">CONFLICT: ACTIVE</span>
          <span className="badge badge-blue">SI-39 SECTION 0 ACTIVE</span>
        </div>
      </div>
    </div>
  );
}
