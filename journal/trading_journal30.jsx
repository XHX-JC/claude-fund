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
  "sessionNumber": 20,
  "fund": {
    "account": "U24936508",
    "netLiquidity": 102800,
    "cash": 30962,
    "availableFunds": 80300,
    "dailyPnL": 0,
    "unrealizedPnL": 5505,
    "realizedPnL": 71.38,
    "broker": "IBKR Pro",
    "baseCurrency": "USD",
    "location": "UAE",
    "ibkrEuropeanAccess": "APPROVED — March 26 2026",
    "cashUSD": 36797,
    "cashEUR": -937,
    "cashGBP": -3488,
    "cashBase": 30962,
    "cashFloorRule": "10% of NL = $10,280 minimum. NEVER go below. 25% figure is stale — permanently retired.",
    "lastUpdated": "2026-04-15 SESSION 20 CLOSE — JOURNAL v30",
    "note": "JOURNAL v30 — SESSION 20 COMPLETE. AVAV 25 shares SOLD at $197.945, profit +$71.38. Thesis exit: SCAR program ($1.4B contract at risk, Raymond James Underperform Mar 2), Q3 FY2026 operating loss -$179M vs -$3.1M prior year, securities litigation (Pomerantz Apr 14). Disciplined exit at near-breakeven vs holding impaired thesis. AVAV stop $186.21 GTC CANCELLED (E9 orphan prevention). ISRG stop corrected $420→$443.86 (IBKR ground truth confirmed). SLV orders resubmitted per IBKR actuals: 35 shares GTC $70.00 buy + $63.00 stop (updated from journal 21 shares $70.50/$64.50). Ceasefire expiry corrected Apr 22→Apr 21 per Bloomberg/CNBC/CNN. WTI ~$93 (was $97), Gold ~$4,760 (was $5,003). Iran: second round talks possible within days. SI-25 OIL CONDITION NOW MET ($93 < $100.38) but Hormuz formal reopening NOT confirmed — SI-25 NOT TRIGGERED. CODA mine clearance thesis activating — USN mine ops confirmed in Strait. ITM closed 95.45p — stop raise trigger met (>95p). RAISE STOP to 90p/88.5p on S21 open IF volume confirms. LLY: 1.4% from SI-39 trigger $907.16 — S21 deep dive MANDATORY. TSMC Q1 full earnings Apr 16 10AM UAE. NEW LESSON T15: broken thesis exit at near-breakeven beats holding for hope."
  },
  "thesis": {
    "title": "US NAVAL BLOCKADE OF IRANIAN PORTS ACTIVE — SI-25 OIL CONDITION MET — FORMAL REOPENING PENDING",
    "summary": "SESSION 20 UPDATE: WTI ~$93 — SI-25 OIL CONDITION NOW MET (trigger was $100.38). BUT Hormuz formal reopening NOT confirmed. SI-25 dual-condition requires BOTH: formal reopening CONFIRMED + oil -10% from peak. One of two conditions met. This is the closest SI-25 has been to triggering since inception. Second round of US-Iran talks being arranged — could happen within days before Apr 21 ceasefire expiry. Trump says war 'close to over'. If talks succeed and Hormuz formally reopens, SI-25 triggers immediately. Alert posture ELEVATED. BLOCKADE STATUS: US CENTCOM says commerce completely halted into/out of Iran by sea. Iran commander threatened to block ALL Persian Gulf/Gulf of Oman/Red Sea if blockade continues — tail risk not priced by equities (S&P erased all war losses). CEASEFIRE EXPIRY: APR 21 (CORRECTED from Apr 22 — Bloomberg, CNBC, CNN all confirm Apr 21).",
    "oilWTI": 93,
    "oilBrent": 96,
    "goldPrice": 4760,
    "hormuzStatus": "SESSION 20: WTI ~$93 — SI-25 oil trigger MET ($100.38). Blockade active Day 2. CENTCOM says commerce completely halted. Second round talks possible before Apr 21 expiry. Trump: war 'close to over'. Iran commander threatened to block ALL Persian Gulf if blockade continues — unpriced tail risk. Iran lost track of mines in Strait — cannot fully open even if deal struck. USN mine clearance ops active (CODA catalyst).",
    "ceasefireFilter": "SI-25 ALERT POSTURE ELEVATED — OIL CONDITION MET. WTI ~$93, peak $111.54, trigger $100.38 — MET. But formal Hormuz reopening NOT confirmed. Blockade active. Both conditions must be met simultaneously. IF peace deal struck AND Hormuz formally reopens → SI-25 triggers immediately. CEASEFIRE EXPIRY: APR 21 (CORRECTED — was Apr 22 in prior journals).",
    "blockadeStatus": "US CENTCOM blockade Day 2. Commerce 'completely halted' per CENTCOM. Applies to vessels to/from Iranian ports. Non-Iranian port vessels may transit. Iran commander: will block ALL Persian Gulf/Gulf of Oman/Red Sea if blockade continues — escalation threat. Iran lost track of mines — cannot fully open Strait. USN mine clearance active.",
    "keyDates": [
      {"date": "15 Apr (today)", "event": "SESSION 20 COMPLETE. AVAV sold $197.945 (+$71.38). ISRG stop corrected $443.86. SLV resubmitted 35 shares $70/$63. Ceasefire expiry corrected Apr 21. WTI $93, Gold $4,760 noted.", "priority": "RESOLVED — SESSION 20 COMPLETE"},
      {"date": "16 Apr (tomorrow)", "event": "TSMC Q1 full earnings 10:00 AM UAE — Q2 guidance ($37-38B consensus) + margin + capex revision. Entry decision post-call only. Watch: Q2 guidance vs $37-38B, full-year revision above 30%.", "priority": "CRITICAL"},
      {"date": "19 Apr", "event": "US Iranian oil sanctions waiver expires 12:01 AM ET — secondary sanctions back in force", "priority": "HIGH"},
      {"date": "21 Apr", "event": "CEASEFIRE EXPIRY BINARY (CORRECTED — was Apr 22). SI-25 dual-condition could trigger same day if formal reopening announced. Tranche 2 review: OXY, BKR post-resolution. SLV primary catalyst. RR.L: no stop before Apr 23.", "priority": "CRITICAL"},
      {"date": "21 Apr", "event": "ISRG Q1 2026 Earnings AMC — Stop $443.86 (corrected from $420). Watch: China placements, gross margin vs 67-68%, procedure vol.", "priority": "CRITICAL"},
      {"date": "21 Apr", "event": "RTX Q1 pre-market — watch only, no position. Re-entry $185-190 on peace deal selloff only.", "priority": "MONITOR"},
      {"date": "23 Apr", "event": "RR.L EX-DIVIDEND — HARD LOCK. DO NOT SELL BEFORE THIS DATE.", "priority": "CRITICAL"},
      {"date": "23 Apr", "event": "AMZN Q1 earnings AMC — AWS growth, AI capex guidance. Stop $234.39/224.", "priority": "CRITICAL"},
      {"date": "28 Apr", "event": "V Q2 earnings AMC — beat + volumes resilient → add 8 more shares Apr 29 open. Miss → exit if below $295.", "priority": "CRITICAL"},
      {"date": "29 Apr", "event": "MSFT Q3 FY2026 Earnings AMC — Azure growth %, Copilot seats. Stop $375.56.", "priority": "CRITICAL"},
      {"date": "23 Apr", "event": "SAP Q1 2026 Earnings — cloud backlog. DO NOT enter SAP before this date.", "priority": "HIGH"},
      {"date": "30 Apr", "event": "NOG Q1 earnings — oil revenue at $90-110 WTI, dividend confirmation", "priority": "MEDIUM"},
      {"date": "5 May", "event": "LDO.MI Q1 Earnings — first catalyst for pending buy position.", "priority": "HIGH"},
      {"date": "5 May", "event": "HAG Q1 Earnings — Hensoldt, EU defence watchlist", "priority": "MEDIUM"},
      {"date": "6 May", "event": "R3NK Q1 Earnings — €200M deferred Q4 orders MUST appear. Critical.", "priority": "CRITICAL"},
      {"date": "7 May", "event": "AMPX Q1 Earnings", "priority": "MEDIUM"},
      {"date": "11 May", "event": "PLTR Q1 Earnings — Golden Dome + Maven POR = key catalyst. Reentry zone $120-130 on confirmed award or this catalyst.", "priority": "CRITICAL"},
      {"date": "12 May", "event": "ALFEN Q1 Earnings — EU grid infrastructure watchlist", "priority": "MONITOR"},
      {"date": "12 May", "event": "SLDP Q1 Earnings", "priority": "MONITOR"},
      {"date": "13 May", "event": "VST + PDYN Earnings", "priority": "MEDIUM"},
      {"date": "18 May", "event": "ONDS Q1 Earnings — stopped out but monitoring sector", "priority": "MONITOR"},
      {"date": "23 Jun", "event": "AVAV Q1 Earnings — POSITION CLOSED S20. Monitor for re-entry thesis clarification.", "priority": "MONITOR"},
      {"date": "25 Jun", "event": "IAG.L Ex-dividend 4.33p — NO LONGER HELD, position closed S08", "priority": "RESOLVED"},
      {"date": "30 Jul", "event": "RR.L H1 Earnings", "priority": "HIGH"},
      {"date": "15 Apr", "event": "SESSION 19 COMPLETE. V BUY $307 placed. NOG BUY $25.08 placed. SLV BUY $70.50 placed (subsequently resubmitted as $70, 35 shares). AVAV stop raised $186.21.", "priority": "RESOLVED"},
      {"date": "14 Apr", "event": "SESSION 18 COMPLETE. CRML 110 @ $9.07 FILLED. PDYN 250 shares sold ~$6.665 (+$17.42). GPT-6 launched. NL NEW HIGH $102.1K.", "priority": "RESOLVED"},
      {"date": "9 Apr", "event": "PLTR STOPPED OUT at $134.976. Loss -$1,307. Reentry zone $120-130 on confirmed Golden Dome award or May 11 earnings.", "priority": "RESOLVED"}
    ]
  },
  "positions": [
    {
      "ticker": "CCJ", "name": "Cameco Corp", "shares": 49,
      "avgPrice": 104.021, "costBasis": 5097, "last": 116.60, "marketVal": 5713,
      "unrealPnL": 616, "unrealPct": 12.1, "stop": 108.37, "target": null,
      "status": "HOLD — STOP LIVE",
      "note": "Nuclear thesis structural — EU energy independence + global uranium supply. Stop $108.37 IBKR confirmed. Above cost $104.021 — profit locked. Ceasefire does not reduce uranium demand. CCJ +12.1% unrealized."
    },
    {
      "ticker": "AMZN", "name": "Amazon.com Inc", "shares": 30,
      "avgPrice": 201.204, "costBasis": 6036, "last": 249.10, "marketVal": 7473,
      "unrealPnL": 1437, "unrealPct": 23.8, "stop": 234.39, "stopType": "Stop Limit", "stopLimit": 224, "target": 300,
      "status": "HOLD — STOP LIMIT LIVE",
      "note": "Stop $234.39/224 Stop Limit GTC. Earnings Apr 23 AMC. AWS +24% last quarter, $100B capex guided 2026. Stop locks ~$1,000 profit. Next raise: post-earnings beat confirmed."
    },
    {
      "ticker": "VST", "name": "Vistra Corp", "shares": 53,
      "avgPrice": 150.569, "costBasis": 7980, "last": 165.60, "marketVal": 8777,
      "unrealPnL": 797, "unrealPct": 10.0, "stop": 151.5, "target": null,
      "status": "HOLD — STOP LIVE",
      "note": "Stop $151.50 above cost $150.569 — profit locked. Earnings May 13. AI data centre power thesis intact."
    },
    {
      "ticker": "RR", "name": "Rolls-Royce Holdings", "shares": 150,
      "avgPrice": 1182.9, "costBasis": 1774, "last": 1295, "marketVal": 1943,
      "unrealPnL": 168, "unrealPct": 9.5, "stop": null, "target": 1600,
      "status": "HOLD — NO STOP (ex-div Apr 23 — HARD LOCK)", "cur": "GBP",
      "note": "EX-DIV APR 23 — DO NOT SELL BEFORE THIS DATE. No stop order placed. After Apr 23 ex-div: set stop limit 1250p/1230p. H1 earnings Jul 30. RR recovering from YTD low 1,080p toward ATH 1,420p. Civil aviation stabilizing. FCF £5.0-5.3B guided."
    },
    {
      "ticker": "ITM", "name": "ITM Power PLC", "shares": 3100,
      "avgPrice": 65.1, "costBasis": 2018, "last": 95.45, "marketVal": 2959,
      "unrealPnL": 941, "unrealPct": 46.6, "stop": 84, "target": 98,
      "status": "HOLD — STOP LIMIT 84p/82.5p GTC — STOP RAISE PENDING S21", "cur": "GBP",
      "note": "CLOSED ABOVE 95p on Apr 15 (95.45p). Stop raise trigger MET per SI-21. S21 ACTION: raise to 90p/88.5p Stop Limit GTC LSE IF volume confirms. 52wk high 98p — ITM at 97.4% of 52wk high. GBE £86.5M equity package catalyst. Cash guidance raised £210-215M."
    },
    {
      "ticker": "AMPX", "name": "Amprius Technologies", "shares": 168,
      "avgPrice": 18.106, "costBasis": 3042, "last": 17.76, "marketVal": 2984,
      "unrealPnL": -58, "unrealPct": -1.9, "stop": 13, "target": 32,
      "status": "HOLD — STOP $13 GTC + LIMIT $32 GTC",
      "note": "Silicon anode battery/drone endurance thesis intact. Q1 earnings May 7. Stop $13.00 GTC + Limit $32 GTC both live."
    },
    {
      "ticker": "PDYN", "name": "Palladyne AI Corp", "shares": 250,
      "avgPrice": 6.595, "costBasis": 1649, "last": 6.40, "marketVal": 1600,
      "unrealPnL": -49, "unrealPct": -3.0, "stop": 5.75, "target": null,
      "status": "HOLD — STOP LIVE",
      "note": "Remaining 250 shares. Stop $5.75 GTC. Within SI-37 cap ($1,649 cost). May 13 earnings = next catalyst. No add until DoD contract news."
    },
    {
      "ticker": "CODA", "name": "Coda Octopus Group", "shares": 416,
      "avgPrice": 12.005, "costBasis": 4994, "last": 12.90, "marketVal": 5367,
      "unrealPnL": 372, "unrealPct": 7.4, "stop": 11.51, "target": 22,
      "status": "HOLD — STOP AT IBKR LEVEL — MINE CLEARANCE THESIS ACTIVATING",
      "note": "USN mine clearance operations active in Strait (CNN confirmed Apr 15). Iran lost track of mines — cannot fully reopen Strait. CODA MCM/sonar thesis activating in real time. Stop $11.51 intentional. Raise to $12.50 when USN mine clearance contract publicly confirmed. May 13 earnings."
    },
    {
      "ticker": "ABVX", "name": "Abivax SA-ADR", "shares": 44,
      "avgPrice": 117.913, "costBasis": 5188, "last": 125.81, "marketVal": 5536,
      "unrealPnL": 348, "unrealPct": 6.7, "stop": 118.36, "target": null,
      "status": "HOLD — STOP $118.36 GTC",
      "note": "Stop $118.36 GTC above cost $117.91 — profit locked. No M&A news. No Phase 3 data. Hold. GRANDFATHERED above SI-37 $1,500 cap — do not add."
    },
    {
      "ticker": "ISRG", "name": "Intuitive Surgical Inc", "shares": 22,
      "avgPrice": 459.2, "costBasis": 10103, "last": 467.22, "marketVal": 10279,
      "unrealPnL": 174, "unrealPct": 1.7, "stop": 443.86, "target": 510,
      "status": "HOLD — STOP $443.86 GTC (CORRECTED S20 — was $420 in journal)",
      "note": "S20 CORRECTION: IBKR stop confirmed at $443.86 — journal was stale at $420. Stop $443.86 = 4.98% below current $467.22. Earnings Apr 21 AMC (6 days). 41 analysts, avg PT $621 (+32.5% upside). Do NOT tighten stop before earnings. Post-earnings: raise to $455-460 if beat confirmed. Watch: China placements, gross margin vs 67-68%, Ion attach rates."
    },
    {
      "ticker": "MSFT", "name": "Microsoft Corp", "shares": 25,
      "avgPrice": 372.73, "costBasis": 9318, "last": 396.95, "marketVal": 9924,
      "unrealPnL": 605, "unrealPct": 6.5, "stop": 375.56, "target": 430,
      "status": "HOLD — STOP $375.56 GTC",
      "note": "Stop $375.56 above cost $372.77 — profit locked. Earnings Apr 30 AMC. Azure growth + GPT-6 via Azure = positive. SI-26 K-scan: GREEN."
    },
    {
      "ticker": "R3NK", "name": "RENK Group AG", "shares": 25,
      "avgPrice": 52.27, "costBasis": 1307, "last": 53.38, "marketVal": 1335,
      "unrealPnL": 28, "unrealPct": 2.1, "stop": 48, "target": 76,
      "status": "HOLD — STOP LIMIT €48/€47 GTC", "cur": "EUR",
      "note": "Stop Limit €48/€47 GTC IBIS confirmed. Q1 earnings May 6 — €200M deferred Q4 orders must appear. Second tranche add on May 6 confirmation only. EU defence rearmament structural. R:R to T2 (€76) = 3.9:1."
    },
    {
      "ticker": "LNG", "name": "Cheniere Energy Inc", "shares": 19,
      "avgPrice": 268.813, "costBasis": 5107, "last": 259.35, "marketVal": 4928,
      "unrealPnL": -169, "unrealPct": -3.3, "stop": 248, "target": 330,
      "status": "HOLD — STOP $248 GTC",
      "note": "Stop $248 GTC. Qatari Ras Laffan structural damage — 20% Qatar export capacity sidelined years. US blockade extends disruption. Non-Hormuz LNG premium structural. WTI at $93 is modest headwind but Qatar thesis is independent. Jefferies/Citi/JPMorgan PT $330-338. Next raise: $255 if LNG closes >$285."
    },
    {
      "ticker": "CRML", "name": "Critical Metals Corp", "shares": 110,
      "avgPrice": 9.07, "costBasis": 999, "last": 8.93, "marketVal": 982,
      "unrealPnL": -15, "unrealPct": -1.5, "stop": 7.5, "target": 15,
      "status": "HOLD — STOP $7.50 GTC",
      "note": "Heavy rare earth from Tanbreez (Greenland). US EXIM interest up to $620M. SI-37 hard cap respected ($999 cost). Do not add until offtake/financing concrete. R:R to $15 = 2.8:1."
    }
  ],
  "pendingOrders": [
    {"ticker": "V", "action": "BUY", "type": "Limit", "qty": 8, "limitPrice": 307, "stopPrice": null, "tif": "GTC", "status": "ACTIVE — S19",
     "note": "SI-39 TRIGGERED: -17.1% from 52wk high $375.51. Earnings Apr 28 AMC. Bracket stop $285 live."},
    {"ticker": "V", "action": "SELL", "type": "Stop", "qty": 8, "limitPrice": null, "stopPrice": 285, "tif": "GTC", "status": "ACTIVE — bracket",
     "note": "Below 52wk low $293.89 = structural failure. Max loss $176."},
    {"ticker": "NOG", "action": "BUY", "type": "Limit", "qty": 80, "limitPrice": 25.08, "stopPrice": null, "tif": "GTC", "status": "ACTIVE — S19",
     "note": "Below entry zone $26-27.50. Citi Buy $36. 6.5% dividend. Earnings Apr 30. Bracket stop $22.50 live. WTI at $93 acceptable — dividend yield underpins floor."},
    {"ticker": "NOG", "action": "SELL", "type": "Stop", "qty": 80, "limitPrice": null, "stopPrice": 22.5, "tif": "GTC", "status": "ACTIVE — bracket",
     "note": "Max loss $206 on 80 shares."},
    {"ticker": "SLV", "action": "BUY", "type": "Limit", "qty": 35, "limitPrice": 70, "stopPrice": null, "tif": "GTC", "status": "ACTIVE — S20 RESUBMITTED",
     "note": "S20 CORRECTED: 35 shares $70.00 GTC (was journal 21 shares $70.50). IBKR actuals take precedence. Peace deal asymmetry. Apr 21 ceasefire binary. Pre-market $71.70 at submission. Gold at $4,760."},
    {"ticker": "SLV", "action": "SELL", "type": "Stop", "qty": 35, "limitPrice": null, "stopPrice": 63, "tif": "GTC", "status": "ACTIVE — S20 RESUBMITTED",
     "note": "S20 CORRECTED: 35 shares $63.00 GTC (was $64.50 for 21 shares). Max loss $245 at 35 shares. IBKR actuals."},
    {"ticker": "ITM", "action": "SELL", "type": "Stop Limit", "qty": 3100, "limitPrice": 82.5, "stopPrice": 84, "tif": "GTC", "status": "ACTIVE — RAISE PENDING S21",
     "note": "S21 ACTION REQUIRED: ITM closed 95.45p (>95p trigger). Raise to 90p/88.5p Stop Limit GTC IF S21 open volume confirms. Current 84p/82.5p remains live until confirmed."},
    {"ticker": "CCJ", "action": "SELL", "type": "Stop", "qty": 49, "limitPrice": null, "stopPrice": 108.37, "tif": "GTC", "status": "ACTIVE",
     "note": "Above cost $104.021 — profit locked."},
    {"ticker": "PDYN", "action": "SELL", "type": "Stop", "qty": 250, "limitPrice": null, "stopPrice": 5.75, "tif": "GTC", "status": "ACTIVE",
     "note": "250 shares remaining post S18 partial exit."},
    {"ticker": "AMPX", "action": "SELL", "type": "Stop", "qty": 168, "limitPrice": null, "stopPrice": 13, "tif": "GTC", "status": "ACTIVE",
     "note": "Stop $13.00 GTC."},
    {"ticker": "AMPX", "action": "SELL", "type": "Limit", "qty": 168, "limitPrice": 32, "stopPrice": null, "tif": "GTC", "status": "ACTIVE",
     "note": "Profit target."},
    {"ticker": "VST", "action": "SELL", "type": "Stop", "qty": 53, "limitPrice": null, "stopPrice": 151.5, "tif": "GTC", "status": "ACTIVE",
     "note": "Above cost $150.569 — profit locked."},
    {"ticker": "AMZN", "action": "SELL", "type": "Stop Limit", "qty": 30, "limitPrice": 224, "stopPrice": 234.39, "tif": "GTC", "status": "ACTIVE",
     "note": "Locks ~$1,000 profit pre-Apr 23 earnings."},
    {"ticker": "ABVX", "action": "SELL", "type": "Stop", "qty": 44, "limitPrice": null, "stopPrice": 118.36, "tif": "GTC", "status": "ACTIVE",
     "note": "Profit locked above cost $117.91."},
    {"ticker": "ISRG", "action": "SELL", "type": "Stop", "qty": 22, "limitPrice": null, "stopPrice": 443.86, "tif": "GTC", "status": "ACTIVE — S20 CORRECTED",
     "note": "S20 CORRECTED: $443.86 (was $420 in journal — IBKR ground truth). Hold through Apr 21 earnings. Raise to $455-460 post-beat."},
    {"ticker": "MSFT", "action": "SELL", "type": "Stop", "qty": 25, "limitPrice": null, "stopPrice": 375.56, "tif": "GTC", "status": "ACTIVE",
     "note": "Above cost $372.77 — profit locked. Earnings Apr 30 AMC."},
    {"ticker": "CODA", "action": "SELL", "type": "Stop", "qty": 416, "limitPrice": null, "stopPrice": 11.51, "tif": "GTC", "status": "ACTIVE — INTENTIONAL",
     "note": "Mine clearance catalyst pending. Do not raise until USN mine ops contract confirmed."},
    {"ticker": "LNG", "action": "SELL", "type": "Stop", "qty": 19, "limitPrice": null, "stopPrice": 248, "tif": "GTC", "status": "ACTIVE",
     "note": "Next raise: $255 if LNG closes >$285."},
    {"ticker": "R3NK", "action": "SELL", "type": "Stop Limit", "qty": 25, "limitPrice": 47, "stopPrice": 48, "tif": "GTC", "status": "ACTIVE",
     "note": "€48.00/€47.00 GTC IBIS confirmed. Mandatory Stop Limit for EU exchange."},
    {"ticker": "LDO", "action": "BUY", "type": "Limit", "qty": 35, "limitPrice": 56, "stopPrice": null, "tif": "GTC", "status": "PENDING",
     "note": "LDO.MI — BVME. Entry zone €53-56.50. May 5 earnings. Morningstar FV €75.60. Stop €50/€49 to add on fill only."},
    {"ticker": "MP", "action": "BUY", "type": "Limit", "qty": 75, "limitPrice": 55, "stopPrice": null, "tif": "GTC", "status": "ACTIVE S18",
     "note": "Critical minerals anchor. Only operating US REE mine. Pentagon 10-year magnet offtake."},
    {"ticker": "MP", "action": "SELL", "type": "Stop", "qty": 75, "limitPrice": null, "stopPrice": 50, "tif": "GTC", "status": "ACTIVE S18",
     "note": "Bracket stop. Max loss $375 at 75 shares."},
    {"ticker": "APH", "action": "BUY", "type": "Limit", "qty": 20, "limitPrice": 138, "stopPrice": null, "tif": "GTC", "status": "ACTIVE S18",
     "note": "Apr 29 earnings catalyst. Bracket stop $134 live."},
    {"ticker": "APH", "action": "SELL", "type": "Stop", "qty": 20, "limitPrice": null, "stopPrice": 134, "tif": "GTC", "status": "ACTIVE S18",
     "note": "Bracket stop. R:R from $138 entry to $170 consensus = 8:1."},
    {"ticker": "CRML", "action": "SELL", "type": "Stop", "qty": 110, "limitPrice": null, "stopPrice": 7.5, "tif": "GTC", "status": "ACTIVE",
     "note": "Max loss $173 on 110 shares."}
  ],
  "si39TierOneWatchlist": {
    "lastBatchPull": "2026-04-15",
    "tool": "EOD:get_us_live_extended_quotes",
    "batchSymbols": ["NVDA.US","META.US","GOOGL.US","AAPL.US","V.US","LLY.US","TSM.US","COST.US","ASML.US"],
    "note": "Run at EVERY session open as Section 0 — BEFORE sections A-K. S21 NOTE: EOD extended quotes API returned error Apr 15 — supplemented with MMD + web data. Retry EOD batch at S21 open.",
    "verified": "2026-04-15 MMD + web search (EOD API error)",
    "names": [
      {"ticker": "V", "52wkHigh": 375.51, "52wkLow": 293.89, "price": 311.37, "drawdown": -17.1, "trigger": -15, "triggerPrice": 319.18, "status": "TRIGGERED — BUY $307 GTC active. Earnings Apr 28 AMC."},
      {"ticker": "LLY", "52wkHigh": 1133.95, "52wkLow": 623.78, "price": 922.50, "drawdown": -18.6, "trigger": -20, "triggerPrice": 907.16, "status": "NEAR TRIGGER — 1.4% away. S21 DEEP DIVE MANDATORY."},
      {"ticker": "META", "52wkHigh": 796.25, "52wkLow": 479.80, "price": 662.49, "drawdown": -16.8, "trigger": -20, "triggerPrice": 637.00, "status": "APPROACHING — alert at $637"},
      {"ticker": "AAPL", "52wkHigh": 288.62, "52wkLow": 171.89, "price": 258.83, "drawdown": -10.3, "trigger": -15, "triggerPrice": 245.33, "status": "MONITOR"},
      {"ticker": "GOOGL", "52wkHigh": 349.00, "52wkLow": 143.91, "price": 332.91, "drawdown": -4.6, "trigger": -18, "triggerPrice": 286.18, "status": "MONITOR — missed at $280 March 2026 (origin of SI-39)"},
      {"ticker": "NVDA", "52wkHigh": 212.19, "52wkLow": 95.04, "price": 196.51, "drawdown": -7.4, "trigger": -25, "triggerPrice": 159.14, "status": "MONITOR"},
      {"ticker": "TSM", "52wkHigh": 390.21, "52wkLow": 137.90, "price": 379.89, "drawdown": -2.7, "trigger": -20, "triggerPrice": 312.17, "status": "MONITOR — FULL EARNINGS APR 16 10AM UAE"},
      {"ticker": "COST", "52wkHigh": 1067.08, "52wkLow": 844.06, "price": 999.20, "drawdown": -6.4, "trigger": -15, "triggerPrice": 906.52, "status": "MONITOR"},
      {"ticker": "ASML", "52wkHigh": 1547.22, "52wkLow": 606.87, "price": 1478, "drawdown": -4.5, "trigger": -20, "triggerPrice": 1237.78, "status": "NOT DRAWDOWN — remove from active drawdown watch."}
    ]
  },
  "priceVerificationProtocol": {
    "title": "MANDATORY BEFORE ANY PRICE-BASED RECOMMENDATION — SI-1 + SI-40",
    "currentPriceUS": "MMD /v2/aggs/ticker/{TICKER}/prev — use field 'c' (close). Primary source.",
    "52wkRangeUS": "EOD:get_us_live_extended_quotes — fields fiftyTwoWeekHigh, fiftyTwoWeekLow. Batch all Tier 1 names together. ONLY AUTHORISED SOURCE for 52wk range.",
    "currentPriceEUUK": "Yahoo Finance web_fetch or web_search. EODHD has no LSE subscription.",
    "52wkRangeEUUK": "web_fetch https://finance.yahoo.com/quote/{TICKER}/ OR web_search '{TICKER} 52 week high 2026'.",
    "crossCheck": "If MMD and EODHD current prices diverge >3%, flag it.",
    "memoryForbidden": "MEMORY ESTIMATES FOR ANY PRICE DATA ARE FORBIDDEN.",
    "session20Corrections": {
      "ISRG_stop": "Journal stated $420. IBKR actual: $443.86. Journal stale — corrected S20.",
      "SLV_orders": "Journal stated 21 shares $70.50/$64.50. IBKR submitted: 35 shares $70.00/$63.00. Journal updated to IBKR actuals.",
      "ceasefire_expiry": "Journal stated Apr 22. Correct: Apr 21 per Bloomberg/CNBC/CNN. Corrected S20.",
      "WTI": "Journal stated $97. Actual: ~$93. Updated S20.",
      "Gold": "Journal stated $5,003. Actual: ~$4,760. Updated S20."
    }
  },
  "cDriveProtocol": {
    "confirmed": "2026-04-15 SESSION 20",
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
    ]
  },
  "standingInstructions": [
    {
      "id": 1,
      "title": "Price Verification — ZERO TOLERANCE. TOOL ROUTING MANDATORY.",
      "body": "NEVER state price, 52-week high, 52-week low, or drawdown from memory. Every claim requires a tool call BEFORE output.\n\nTOOL ROUTING TABLE:\n(A) CURRENT US PRICE: MMD /v2/aggs/ticker/{TICKER}/prev → use 'c' field.\n(B) 52-WEEK HIGH/LOW US: EOD:get_us_live_extended_quotes → fiftyTwoWeekHigh/Low. Batch all Tier 1 together.\n(C) EU/UK PRICE: Yahoo Finance web_fetch or web_search.\n(D) EU/UK 52-WEEK RANGE: web_fetch https://finance.yahoo.com/quote/{TICKER}/\n(E) CROSS-CHECK: MMD and EODHD diverge >3% → flag.\n\nS19 ORIGIN: NVDA $105 (actual $196.51). NVDA -40% drawdown (actual -7.4%). ASML -24% (actual -4.5%). META $570 (actual $662.49)."
    },
    {
      "id": 2, "title": "Analyst Data Verification",
      "body": "Before citing analyst targets or ratings, verify the note date. Never construct a bullish narrative from stale data."
    },
    {
      "id": 3, "title": "State Tracking — No Repetition",
      "body": "Before adding any item to pending orders or watchlist, check whether it already appears. IAG CLOSED S08. ITM ENTERED S08. LEU CLOSED S09. AVAV CLOSED S20 — never list as active position again."
    },
    {
      "id": 4, "title": "Evidence Matching",
      "body": "The conclusion must match the evidence cited. If consensus target equals current price, do not describe as 'asymmetric'. No promotional language."
    },
    {
      "id": 5, "title": "Iran Ceasefire Filter — EVOLVED",
      "body": "EVOLVED S08: No longer filtering ceasefire vs no ceasefire. Filter: speed and terms of Hormuz reopening. S20: SI-25 OIL CONDITION MET ($93 < $100.38). Formal reopening NOT confirmed. Alert posture elevated."
    },
    {
      "id": 6, "title": "Dilution Flagging",
      "body": "Every new recommendation must check: recent share offerings, insider selling past 90 days, FCF status, dilution %. Flag prominently before recommending."
    },
    {
      "id": 7, "title": "10-Min Pre-Open Rule",
      "body": "Place Iran-sensitive orders within 10 minutes of US open (17:30 UAE). European markets: 12:00-20:30 UAE."
    },
    {
      "id": 8, "title": "IAG Reserve — RESOLVED", "body": "IAG CLOSED S08. $10K reserve RELEASED. SI RESOLVED."
    },
    {
      "id": 9, "title": "European Scan Mandate",
      "body": "Every full scan MUST include R3NK, HAG, LDO, HO, CHG, BA, BAB, CHRT, RR.L, THEON, SAF and broader EU/UK small-cap defence universe."
    },
    {
      "id": 10, "title": "Nuclear Scan Mandate",
      "body": "Every full scan includes: Germany legal ban movement, EU SMR funding, RR.L SMR contracts, LNG storage TTF prices, EDF milestones, BWXT contract wins. Add: Assystem ASY.PA, Costain COST.L, Yellow Cake YCA.L."
    },
    {
      "id": 11, "title": "UEC Review Flag — RESOLVED", "body": "LEU stopped Apr 7. Nuclear thesis de-prioritised for US domestic plays. RESOLVED."
    },
    {
      "id": 12, "title": "PDYN Stop Flag — RESOLVED", "body": "PDYN stop $5.75 GTC LIVE (250 shares). RESOLVED."
    },
    {
      "id": 13, "title": "ASTS Watchlist Scan",
      "body": "Every full scan MUST check ASTS. DO NOT enter above $95."
    },
    {
      "id": 14, "title": "Full Scan Checklist — SECTION 0 + SECTIONS A-K (v4.0)",
      "body": "SECTION 0 — RUNS FIRST, EVERY SESSION:\nBatch EOD:get_us_live_extended_quotes ['NVDA.US','META.US','GOOGL.US','AAPL.US','V.US','LLY.US','TSM.US','COST.US','ASML.US']\nPlus MMD prev close for current prices.\nOutput: Drawdown table. Triggered names = session priority.\n\nSECTIONS A-K:\nA: IBKR cross-check | B: Iran/oil/Hormuz | C: Live positions | D: EU defence | E: Nuclear | F: US watchlist | G: Speculative | H: Congressional | I: Macro | J: Error check | K: Sector threat"
    },
    {
      "id": 15, "title": "Small Cap Rerating + Stock Watching Criteria",
      "body": "ENTRY: (1) CONTRACT WIN (2) TECHNOLOGY VALIDATION (3) ANALYST INITIATION (4) INSIDER BUYING (5) EARNINGS INFLECTION (6) SHORT SQUEEZE (7) SECTOR CATALYST. EXIT: thesis-break, competitor tech, partner abandonment, management failure."
    },
    {
      "id": 16, "title": "IAG Peace Dividend — CLOSED", "body": "IAG.L CLOSED SESSION 08. SI RESOLVED."
    },
    {
      "id": 17, "title": "CLAUDE ERROR REDUCTION — 13 ERROR TYPES CODIFIED",
      "body": "E1: Timezone. E2: Stale position. E3: Fill re-flag. E4: Price verification. E5: Market timing. E6: Dividend capture. E7: Session discipline. E8: Stale quote. E9: GTC orphan (cancel stop BEFORE/immediately after market sell — AVAV stop $186.21 cancelled S20). E10: Closed position scan.\nE11: 52WK HIGH HALLUCINATION — use EODHD extended quotes mandatory.\nE12: TOOL ROUTING GAP — MMD=current price, EODHD=52wk range.\nE13: EODHD PRICE DELAY — may be 4-6 days stale, use MMD for current price."
    },
    {
      "id": 18, "title": "SLDP Research Report — Completed Mar 30 2026",
      "body": "Entry: $2.20-2.50. Stop $1.80. Max $500-1,000. WATCH — DO NOT BUY until decline stabilises."
    },
    {
      "id": 19, "title": "STOPPED OUT / CLOSED POSITIONS — REALIZED TRACKING (SI-19)",
      "body": "ONDS: Loss ~$601. KTOS: Loss ~$1,601. CCL: Profit +$122. UEC: Loss ~$127. IAG.L: Profit ~£326. RCL: Loss ~$132. LDO.MI (first tranche): Profit +€21.52. LEU: Loss ~$238. PLTR: Loss -$1,307. PDYN partial: Profit +$17.42. AVAV: 25 shares sold S20 @ $197.945. Profit +$71.38. Thesis exit — SCAR program + Q3 operating loss.\nTotal net realized since inception: ~-$2,073 (improving)."
    },
    {
      "id": 20, "title": "BTC Position — Entry Rules",
      "body": "BTC PLANNED 5-7.5% portfolio. Vehicle: IBKR Paxos spot BTC. Entry target $55K. Stop $48K. NO ORDER PLACED. BTC ~$70,700 (Apr 15). Watch for pullback to $55K."
    },
    {
      "id": 21, "title": "ITM Power — Entry Rules + Breakout Protocol",
      "body": "ENTERED S08 @ 64.8-65p. 3100 shares. Stop 84p/82.5p (current). S21 ACTION: ITM closed 95.45p (>95p trigger) — raise to 90p/88.5p Stop Limit GTC if volume confirms. Target 1: 98p. Target 2: 130p."
    },
    {
      "id": 22, "title": "EU Energy Basket — Watchlist",
      "body": "(1) ITM.L — IN PORTFOLIO. (2) CWR.L — 250-270p pullback only. (3) AFC.L — £500 max. (4) H2O.DE — research needed. (5) IKA.L — £500 max. (6) ALFEN.AS — May 12 earnings. (7) YCA.L — 500-520p pullback only. (8) COST.L — research needed. (9) ASY.PA — strongest under-radar candidate."
    },
    {
      "id": 23, "title": "Supply Chain Disruption Plays — Watchlist",
      "body": "CF Industries: entry $115-120 on ceasefire pullback. NTR Nutrien: $70-73. Both face DOJ antitrust risk."
    },
    {
      "id": 24, "title": "Cash Preservation — 10% Floor (REVISED S12)",
      "body": "MINIMUM CASH RESERVE = 10% OF NET LIQUIDITY. At ~$102,800 NAV, floor = $10,280. Cash now ~$30,962 (post-AVAV exit adds ~$4,949). Deployable above floor. Do NOT force entries outside SI-39 trigger conditions."
    },
    {
      "id": 25, "title": "SI-25 EXIT TRIGGER — OIL BASED NOT CEASEFIRE BASED",
      "body": "EXIT TRIGGER: Formal Hormuz reopening CONFIRMED + WTI -10% from peak. BOTH simultaneously.\nCurrent WTI peak: $111.54. Trigger: $100.38.\nCurrent WTI: ~$93. OIL CONDITION MET ($93 < $100.38).\nFormal reopening: NOT MET — blockade active.\nSI-25 NOT TRIGGERED but ALERT POSTURE ELEVATED. Dual condition closer than ever. If peace deal struck in next 48-72hrs → SI-25 triggers immediately."
    },
    {
      "id": 26, "title": "SECTOR THREAT MONITOR — MANDATORY FULL SCAN SECTION K",
      "body": "SECTOR 1: DEFENCE [RR] — ETF canary: ITA. (AVAV CLOSED S20 — no longer held)\nSECTOR 2: NUCLEAR [CCJ] — ETF canary: URA.\nSECTOR 3: AI/CLOUD [MSFT, AMZN, PDYN] — MANDATORY: AI model search.\nSECTOR 4: MEDICAL ROBOTICS [ISRG] — ETF canary: IHI.\nSECTOR 5: BIOTECH [ABVX] — ETF canary: XBI.\nSECTOR 6: BATTERY/DRONE [AMPX] — silicon anode + drone endurance.\nSECTOR 7: MARITIME [CODA] — MINE CLEARANCE THESIS ACTIVATING.\nSECTOR 8: POWER [VST] — ETF canary: XLU.\nSECTOR 9: EU HYDROGEN [ITM] — EU green hydrogen policy."
    },
    {
      "id": 27, "title": "PRICE & NEWS SOURCE HIERARCHY",
      "body": "(1) EODHD MCP — fundamentals, insider data, earnings.\n(2) MMD — US equities current price.\n(3) IBKR screenshots — GROUND TRUTH. Overrides ALL sources.\n(4) Yahoo Finance — EU/UK current price fallback.\n(5) Reuters, FT.com — macro/corporate news.\nPROHIBITED: GuruFocus, PitchBook, Macroaxis. EODHD earnings endpoint (403)."
    },
    {
      "id": 28, "title": "SESSION CLOSE PROTOCOL — C DRIVE WRITE CONFIRMED",
      "body": "Claude executes automatically:\n1. Build session-close block\n2. Write trading_journal[N+1].jsx → C:\\Users\\jcadb\\claude-fund\\journal\\\n3. Write FUND_SESSION_STATE.md → C:\\Users\\jcadb\\claude-fund\\state\\\n4. Write LESSONS_LEARNED.md → C:\\Users\\jcadb\\claude-fund\\state\\\n5. Update hormuz_log.md if thesis changed\n6. Update trade tracker if fills confirmed\n\nUser executes:\n7. Delete OLD journal from Claude project\n8. Upload new trading_journal[N+1].jsx\n9. Run session-close.bat\n10. Verify project shows correct session number"
    },
    {
      "id": 29, "title": "EU/UK POWER THESIS BASKET — PERMANENT SCAN SECTION",
      "body": "BASKET (all moonshot sizing unless reclassified):\n(1) ITM.L — LIVE. (2) CWR.L — 250-270p. (3) AFC.L — 10.36p zone. (4) H2O.DE — €1.20-1.60. (5) IES.L — 14-15p. (6) 4DS.DE — €23-24.50. (7) PRY.MI Prysmian — €85-92. (8) ALFEN.AS — May 12 earnings. (9) SSE.L. (10) SPIE.PA. (11) NEL.OL. (12) UKW.L."
    },
    {
      "id": 30, "title": "TACTICAL CEASEFIRE BOOK — RESOLVED S14", "body": "RESOLVED. Hard exit deadline Apr 21. No tactical positions remain."
    },
    {
      "id": 31, "title": "ENTRY READINESS BASELINE — ARCHIVED (SEE SI-25, SI-39)", "body": "Superseded by SI-25 and SI-39."
    },
    {
      "id": 32, "title": "SESSION START PROTOCOL — C DRIVE READ MANDATORY",
      "body": "STEP 1: filesystem:read_text_file FUND_SESSION_STATE.md\nSTEP 2: filesystem:read_text_file LESSONS_LEARNED.md\nSTEP 3: Check journal lastUpdated vs today\nSTEP 4: Request IBKR screenshots\nSTEP 5: SECTION 0 — EOD batch Tier 1 SI-39\nSTEP 6: SI-14 full scan A-K\nFALLBACK: If filesystem MCP unavailable → log and use project journal + IBKR screenshots only."
    },
    {
      "id": 33, "title": "MEMORY HIERARCHY — TOKEN EFFICIENCY",
      "body": "FUND_SESSION_STATE.md: dynamic. LESSONS_LEARNED.md: permanent. trading_journal[N].jsx: structural. Trade Tracker XLSX: append-only. SESSION_RECAP.md: DEPRECATED."
    },
    {
      "id": 34, "title": "TRADE TRACKER UPDATE PROTOCOL",
      "body": "FILE: Claude_Fund_Trade_Tracker.xlsx — C:\\Users\\jcadb\\claude-fund\\tracker\\\nTRIGGER: Any confirmed IBKR fill.\nPROTOCOL: Append one row. IBKR fill confirmation only. Never estimated prices.\nS20 PENDING: Add AVAV close — 25 shares, entry $195.09, exit $197.945, profit +$71.38."
    },
    {
      "id": 35, "title": "DOLLAR-RISK POSITION SIZING — MANDATORY FOR ALL NEW ENTRIES",
      "body": "Max acceptable loss per trade: $500. Stop%: (entry-stop)/entry. Position: $500/stop% = max deployment. Cap at SI-37 for speculative names.\nStop 5%→$10,000. 8%→$6,250. 10%→$5,000. 15%→$3,333. 20%→$2,500."
    },
    {
      "id": 36, "title": "MINIMUM 2:1 RISK-REWARD FILTER",
      "body": "Min R:R to enter: 2.0:1. Below 2:1 = do not enter. Exemptions: Tactical binary-catalyst <$2,000, max 1.5:1."
    },
    {
      "id": 37, "title": "SPECULATIVE POSITION HARD CAP — $1,500 MAXIMUM",
      "body": "Speculative = pre-revenue, no imminent catalyst, narrative-only, stopped-out within 90 days, or active short attack.\nHARD CAP: $1,500 per name. Current: AMPX $3,042 (grandfathered), PDYN $1,649 (within cap), CODA $4,994 (grandfathered — mine clearance catalyst)."
    },
    {
      "id": 38, "title": "STRUCTURE-BASED STOP PLACEMENT — NO ROUND NUMBERS",
      "body": "Place stops 1-2% BELOW confirmed support. Never AT the level. No round numbers.\nISRG: $443.86 (IBKR). AVAV was $186.21 (now closed). NOG: $22.50 (review)."
    },
    {
      "id": 39, "title": "SI-39: UNDERVALUED US LARGE CAP SCANNER — SECTION 0",
      "body": "PURPOSE: Flag quality large-caps in macro-driven drawdowns before recovery window closes.\nSECTION 0: EOD:get_us_live_extended_quotes batch 9 Tier 1 names. MMD for current prices. Calculate drawdown. Triggered names = session research priority.\n\nTIER 1 TRIGGERS (verified S19):\nNVDA -25%→$159.14 | META -20%→$637.00 | GOOGL -18%→$286.18 | AAPL -15%→$245.33 | V -15%→$319.18 [TRIGGERED] | LLY -20%→$907.16 [NEAR TRIGGER] | TSM -20%→$312.17 | COST -15%→$906.02 | ASML -20%→$1,237.78\n\nMAX per SI-39 position: $4,000. Max aggregate: 20% NAV."
    },
    {
      "id": 40, "title": "SI-40: 52-WEEK DATA PROTOCOL",
      "body": "ONLY AUTHORISED SOURCE for US 52wk: EOD:get_us_live_extended_quotes → fiftyTwoWeekHigh/Low.\nEU/UK: Yahoo Finance web_fetch.\nEODHD DELAY WARNING: previousCloseDate may be 4-6 days prior.\nMEMORY ESTIMATES FOR 52WK RANGE FORBIDDEN."
    },
    {
      "id": 41, "title": "CATALYST-ANCHORED ENTRY REQUIREMENT",
      "body": "Before any new entry: (A) EARNINGS within 8 weeks (B) CONTRACT award within 8 weeks (C) TECHNICAL CONFIRMATION (D) STRUCTURAL VALUE below sector median.\nBARRED: within 5% of 52wk high with no catalyst. Pure thesis-only. Re-entry within 30 days of stop-out without new catalyst."
    },
    {
      "id": 42, "title": "SI-42: BROKEN THESIS EXIT DISCIPLINE (NEW S20)",
      "body": "ORIGIN: AVAV closed S20 at $197.945 (+$71.38) — near breakeven. Thesis broken by: (1) SCAR program $1.4B at risk (Raymond James Underperform Mar 2). (2) Q3 FY2026 operating loss -$179M vs -$3.1M prior year. (3) Pomerantz securities investigation Apr 14. (4) No near-term catalyst — earnings June 23.\n\nLESSON: When thesis breaks with position near breakeven, EXIT IMMEDIATELY. Near-zero P&L today becomes a significant loss if you hold waiting for recovery that requires thesis repair. The opportunity cost of dead capital plus the downside risk of continued deterioration both argue for exit.\n\nAPPLICATION: If the PRIMARY thesis driver (not macro noise, not temporary setback) is impaired by a confirmed new datapoint (regulatory loss, contract cancellation, material earnings miss above normal variance), and position is within 5% of breakeven, exit at market on next open.\n\nCANCEL GTC STOPS IMMEDIATELY after market exit order — E9 orphan prevention."
    },
    {
      "id": 43, "title": "CASH DEPLOYMENT TRIGGERS (UPDATED S20)",
      "body": "CURRENT CASH: ~$30,962 (post-AVAV exit). Floor $10,280. Deployable above floor: ~$20,682.\nA: Islamabad fails + Hormuz closed 5+ days → ACTIVATED Apr 12.\nB: Price enters defined entry zone + catalyst within 8 weeks.\nC: Existing position stops out → redeploy 80% within 48hrs.\nD: BTC at or below $55,000 → 5-7.5% of NAV.\nE: Earnings catalyst within 3 days for watchlist name at entry zone.\nLLY AT TRIGGER: If LLY hits $907.16 in S21, deploy per SI-39 ($4,000 max, SI-35 dollar-risk sizing)."
    }
  ],
  "watchlistUS": [
    {
      "ticker": "V", "name": "Visa Inc", "exchange": "NYSE",
      "status": "ACTIVE — BUY LIMIT $307 GTC — SI-39 TRIGGERED",
      "currentPrice": 311.37, "52wkHigh": 375.51, "drawdown": -17.1,
      "entry": "$307 GTC placed S19", "stop": 285, "target": 399,
      "note": "SI-39 TRIGGERED (-17.1%). ORDER PLACED 8 shares. FCF $22.9B, 97.8% gross margin. Earnings Apr 28 AMC. 36 Buy/3 Hold/0 Sell. Consensus $399. Tranche 2 post-earnings on beat: add 8 shares Apr 29 open."
    },
    {
      "ticker": "LLY", "name": "Eli Lilly and Company", "exchange": "NYSE",
      "status": "S21 RESEARCH PRIORITY — 1.4% FROM SI-39 TRIGGER",
      "currentPrice": 922.50, "52wkHigh": 1133.95, "drawdown": -18.6, "trigger": -20, "triggerPrice": 907.16,
      "entry": "$900-920 if trigger confirmed", "stop": 850,
      "note": "S20 FLAG: 1.4% from -20% trigger ($907.16). MANDATORY S21 DEEP DIVE before trigger hit. Mounjaro/GLP-1 demand intact. Decline from $1,134 on valuation + competitive GLP-1 landscape — thesis not impaired. Run full research. $4,000 max SI-39 position."
    },
    {
      "ticker": "TSM", "name": "Taiwan Semiconductor", "exchange": "NYSE",
      "status": "WATCH — POST APR 16 EARNINGS ENTRY",
      "currentPrice": 379.89, "52wkHigh": 390.21, "drawdown": -2.7,
      "entry": "$372 (in-line) or $350 (miss/disappointment)", "stop": 340, "target": 450,
      "note": "FULL EARNINGS APR 16 10AM UAE. Q1 revenue $35.7B beat (+35.1% YoY). Q2 guidance = key number ($37-38B consensus). Post-earnings entry ONLY. Not a drawdown play at -2.7%."
    },
    {
      "ticker": "GOOGL", "name": "Alphabet Inc", "exchange": "NASDAQ",
      "status": "MONITOR — NEXT TRIGGER $286.18",
      "currentPrice": 332.91, "52wkHigh": 349.00, "drawdown": -4.6,
      "note": "MISSED AT $280 MARCH 2026 — origin of SI-39. Next trigger: $286.18. At $286: Search monopoly, Cloud +28%, $100B+ net cash. P/E ~20x. Immediate entry $4,000 max."
    },
    {
      "ticker": "AVAV", "name": "AeroVironment Inc", "exchange": "NASDAQ",
      "status": "CLOSED S20 — $197.945. WATCH ONLY. Re-entry requires SCAR clarity.",
      "currentPrice": 197.945, "entry": "RE-ENTRY: SCAR program resolution + Q3 operating loss normalisation + stop-out price below $195.09 per P11", "stop": null,
      "note": "SOLD S20 at $197.945 (+$71.38). Thesis broken: SCAR $1.4B at risk (Raymond James Underperform Mar 2), Q3 FY2026 op loss -$179M, Pomerantz litigation. Re-entry: (1) SCAR formally resolved/confirmed, (2) Price below $195.09 per P11, (3) Q4 FY2026 earnings show op loss normalisation. June 23 earnings earliest catalyst."
    },
    {
      "ticker": "NOG", "name": "Northern Oil & Gas", "exchange": "NYSE",
      "status": "ACTIVE — BUY LIMIT $25.08 GTC",
      "currentPrice": 25.90, "entry": "$25.08 GTC placed", "stop": 22.50,
      "note": "Citi Buy $36 (Apr 14). 6.5% dividend. Earnings Apr 30. WTI at $93 reduces upside vs $110 scenario but dividend yield provides floor. R:R still adequate."
    },
    {
      "ticker": "SLV", "name": "iShares Silver Trust", "exchange": "NYSE",
      "status": "ACTIVE — BUY LIMIT $70.00 GTC (35 shares)",
      "currentPrice": 72.04, "entry": "$70.00 GTC — 35 shares", "stop": 63.00,
      "note": "S20 CORRECTED: 35 shares $70.00/$63.00 (updated from journal 21/$70.50/$64.50). Silver -36% from January ATH. Apr 21 ceasefire expiry = primary catalyst. Gold at $4,760 vs peak $5,003. JP Morgan avg forecast $81 for 2026."
    },
    {
      "ticker": "OXY", "name": "Occidental Petroleum", "exchange": "NYSE",
      "status": "WATCH — TRANCHE 2 POST APR 21 CEASEFIRE EXPIRY",
      "currentPrice": 55.38, "entry": "$54.50 GTC post-Apr 21", "stop": 48,
      "note": "Post-blockade thesis. Ceasefire expiry Apr 21 (corrected). Place GTC after resolution clarity."
    },
    {
      "ticker": "BKR", "name": "Baker Hughes", "exchange": "NYSE",
      "status": "WATCH — ALERT $58.50 POST APR 21/22 EARNINGS",
      "currentPrice": 61.49, "entry": "$58.50 post-Apr 21/22 earnings", "stop": 55,
      "note": "Oilfield services + LNG compression. Earnings Apr 22. Post-earnings entry only."
    },
    {
      "ticker": "RTX", "name": "RTX Corporation", "exchange": "NYSE",
      "status": "WATCH ONLY — Re-entry $185-190 on peace deal selloff only",
      "currentPrice": 202.81, "entry": "$185-190 ON PEACE DEAL SELLOFF ONLY",
      "note": "Removed from active entry S19. Thesis priced at ATH. Consensus $216 = 6.7% upside vs 12-18% downside on peace deal. R:R inverted. Earnings Apr 21 — watch only."
    },
    {
      "ticker": "KTOS", "name": "Kratos Defense", "exchange": "NASDAQ",
      "status": "WATCH — REENTRY $62-67 on pullback", "currentPrice": 67.7, "entry": "$62-67",
      "note": "Stopped $64.98 Mar 30. Golden Dome contracts, Valkyrie XQ-58A. Entry only on dip to $62-67."
    },
    {
      "ticker": "ASTS", "name": "AST SpaceMobile", "exchange": "NASDAQ",
      "status": "WATCH — DO NOT BUY above $95", "currentPrice": 93.4, "entry": "$80-85 pullback",
      "note": "Heavy insider selling. Space cellular broadband. Optionality only."
    },
    {
      "ticker": "BTC", "name": "Bitcoin — IBKR Paxos spot", "exchange": "IBKR",
      "status": "WATCH — $55K target, NO ORDER PLACED", "currentPrice": 70700, "entry": "$55,000",
      "note": "SI-20: 5-7.5% portfolio via IBKR Paxos spot. Entry target $55K not in range."
    },
    {
      "ticker": "ONDS", "name": "Ondas Inc", "exchange": "NASDAQ",
      "status": "WATCH — $8.50-9.00 pullback. STOPPED OUT Mar 30.",
      "note": "Stopped Mar 30 @ $8.50. May 18-21 earnings. Do not chase."
    },
    {
      "ticker": "SLDP", "name": "Solid Power Inc", "exchange": "NASDAQ",
      "status": "WATCH — $2.20-2.50 entry", "currentPrice": 2.92,
      "note": "Solid-state battery. SK On site acceptance imminent. Entry only on stabilisation."
    },
    {
      "ticker": "ZETA", "name": "Zeta Global", "exchange": "NYSE",
      "status": "DO NOT ENTER — Culper Research short attack active Apr 2026",
      "note": "Culper: consentless data + round-trip revenue. Uninvestable until refuted."
    }
  ],
  "watchlistEU": [
    {"ticker": "R3NK", "name": "RENK Group AG", "exchange": "XETRA", "current": 53.38, "entry": "IN PORTFOLIO", "target": 76, "cur": "EUR", "note": "HELD. May 6 earnings. €200M deferred orders must appear."},
    {"ticker": "HAG", "name": "Hensoldt AG", "exchange": "XETRA", "current": 70, "entry": "€70-75", "target": 91, "cur": "EUR", "note": "May 5 earnings. WATCH ONLY."},
    {"ticker": "LDO", "name": "Leonardo SpA", "exchange": "MILAN", "current": 55.87, "entry": "€53-56.50 (GTC €56 active)", "target": 68, "cur": "EUR", "note": "GTC €56 buy active. May 5 earnings. Morningstar FV €75.60."},
    {"ticker": "CWR.L", "name": "Ceres Power", "exchange": "LSE", "current": 310, "entry": "250-270p pullback only", "cur": "GBP", "note": "ENTRY 250-270p ONLY."},
    {"ticker": "ITM.L", "name": "ITM Power PLC", "exchange": "LSE", "current": 95.45, "entry": "IN PORTFOLIO", "cur": "GBP", "note": "HELD. 95.45p. Stop raise PENDING S21 (closed >95p trigger). 52wk high 98p."},
    {"ticker": "HO", "name": "Thales SA", "exchange": "PARIS", "current": 235.6, "entry": "€230-240", "target": 293, "cur": "EUR", "note": "MBDA missiles + cybersecurity."},
    {"ticker": "CHG", "name": "Chemring Group", "exchange": "LSE", "current": 527, "entry": "500-530p", "target": 616, "cur": "GBP", "note": "High explosives near-monopoly. NATO restock."},
    {"ticker": "BA", "name": "BAE Systems", "exchange": "LSE", "current": 2250, "entry": "2200-2300p", "target": 2800, "cur": "GBP", "note": "AUKUS nuclear subs + BATS counter-drone."},
    {"ticker": "BAB", "name": "Babcock International", "exchange": "LSE", "current": 1409, "entry": "1300-1420p", "target": 1700, "cur": "GBP", "note": "Nuclear submarine MRO + AUKUS."},
    {"ticker": "CHRT", "name": "Cohort PLC", "exchange": "AIM", "current": 1290, "entry": "1250-1350p", "target": 1570, "cur": "GBP", "note": "Naval electronics + counter-drone. USE LIMIT ORDERS on AIM."},
    {"ticker": "KOG", "name": "Kongsberg Gruppen", "exchange": "OSLO", "current": 389, "entry": "Wait Apr spinoff", "cur": "NOK", "note": "Maritime spinoff Apr 2026 leaves pure-play defence."},
    {"ticker": "ASY.PA", "name": "Assystem SA", "exchange": "Euronext Paris", "entry": "Research needed", "cur": "EUR", "note": "STRONGEST under-radar. French nuclear engineering. EPR2 + EU SMR."},
    {"ticker": "KNDS", "name": "KNDS (IPO 2026)", "exchange": "TBC", "entry": "Day-one buy", "cur": "EUR", "note": "Franco-German Leopard 2 maker. €23.5B backlog. Largest EU defence IPO 2026."}
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
        input, textarea { background: ${COLORS.cardBg}; border: 1px solid ${COLORS.border}; border-radius: 6px; padding: 8px 12px; color: ${COLORS.text}; font-family: 'IBM Plex Mono'; font-size: 12px; width: 100%; }
        .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; }
      `}</style>

      <div style={{ marginBottom: 16, padding: "12px 16px", background: COLORS.cardBg, border: `1px solid ${COLORS.border}`, borderRadius: 8, borderLeft: `3px solid ${COLORS.accent}` }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.textBright }}>CLAUDE FUND — SESSION {data.sessionNumber} — {data.lastUpdated}</div>
            <div style={{ fontSize: 11, color: COLORS.textDim, marginTop: 2 }}>{data.fund.account} | {data.fund.broker} | {data.fund.location}</div>
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <span className="badge badge-green">NL: ${(data.fund.netLiquidity / 1000).toFixed(1)}K</span>
            <span className="badge badge-amber">CASH: ${(data.fund.cash / 1000).toFixed(1)}K</span>
            <span className="badge badge-red">CEASEFIRE: APR 21</span>
            <span className="badge badge-red">BLOCKADE ACTIVE</span>
            <span className="badge badge-amber">SI-25 OIL: MET</span>
          </div>
        </div>
        <div style={{ marginTop: 8, fontSize: 10, color: COLORS.textDim, lineHeight: 1.5 }}>{data.fund.note.substring(0, 350)}...</div>
      </div>

      <div style={{ display: "flex", gap: 4, marginBottom: 16, flexWrap: "wrap" }}>
        {tabs.map(t => (
          <button key={t.id} className="btn" onClick={() => setActiveTab(t.id)}
            style={{ background: activeTab === t.id ? COLORS.accent : "transparent", color: activeTab === t.id ? "white" : COLORS.textDim, border: `1px solid ${activeTab === t.id ? COLORS.accent : COLORS.border}` }}>
            {t.label}
          </button>
        ))}
      </div>

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
                <span className={`badge ${o.status?.includes("S20") ? "badge-blue" : o.status?.includes("PENDING") ? "badge-amber" : "badge-grey"}`}>{o.status?.includes("S20") ? "S20" : o.status?.includes("S19") ? "S19" : o.status?.includes("S18") ? "S18" : "GTC"}</span>
              </div>
              {o.note && <div style={{ marginTop: 6, fontSize: 11, color: COLORS.textDim }}>{o.note}</div>}
            </div>
          ))}
        </div>
      )}

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

      {activeTab === "watchlist" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ fontWeight: 600, color: COLORS.accent, fontSize: 12, marginBottom: 4 }}>US WATCHLIST</div>
          {data.watchlistUS?.map((w) => (
            <div key={w.ticker} className="card">
              <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap", marginBottom: 6 }}>
                <span style={{ fontWeight: 700 }}>{w.ticker}</span>
                <span style={{ fontSize: 12, color: COLORS.textDim }}>{w.name}</span>
                <span className={`badge ${w.status?.includes("CLOSED") ? "badge-red" : w.status?.includes("ACTIVE") ? "badge-green" : w.status?.includes("NEAR") ? "badge-amber" : "badge-grey"}`}>{w.status?.substring(0, 35)}</span>
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
              <div style={{ marginTop: 6, fontSize: 12, color: COLORS.red, lineHeight: 1.6 }}>{data.thesis.hormuzStatus}</div>
            </div>
            <div className="card" style={{ background: "rgba(239,68,68,0.05)", borderColor: "rgba(239,68,68,0.3)" }}>
              <div style={{ fontSize: 10, color: "#ef4444" }}>SI-25 EXIT TRIGGER — OIL CONDITION MET</div>
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

      {activeTab === "instructions" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {data.standingInstructions?.map(ins => (
            <div key={ins.id} className="card" style={{ display: "flex", gap: 12, borderLeft: ins.id === 42 ? `3px solid ${COLORS.accent}` : ins.id === 25 ? `3px solid ${COLORS.red}` : undefined }}>
              <div style={{ fontSize: 11, color: ins.id === 42 ? COLORS.accent : COLORS.accent, fontWeight: 700, minWidth: 28 }}>#{ins.id.toString().padStart(2,"0")}</div>
              <div>
                <div style={{ fontWeight: 600, color: ins.id === 42 ? COLORS.yellow : COLORS.textBright, marginBottom: 4, fontSize: 12 }}>{ins.title}</div>
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
        <span style={{ fontSize: 10, color: COLORS.textDim }}>JOURNAL v30 // SESSION 20 // {data.fund.account} // C DRIVE WRITE CONFIRMED</span>
        <div style={{ display: "flex", gap: 8 }}>
          <span className="badge badge-amber">EU ACCESS: APPROVED</span>
          <span className="badge badge-red">CONFLICT: ACTIVE</span>
          <span className="badge badge-red">SI-25: OIL MET — ALERT</span>
          <span className="badge badge-blue">SI-39 SECTION 0 ACTIVE</span>
        </div>
      </div>
    </div>
  );
}
