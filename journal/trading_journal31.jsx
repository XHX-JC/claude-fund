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
  "lastUpdated": "2026-04-16",
  "sessionNumber": 21,
  "fund": {
    "account": "U24936508",
    "netLiquidity": 103300,
    "cash": 28234,
    "availableFunds": 78000,
    "dailyPnL": 0,
    "unrealizedPnL": 6500,
    "realizedPnL": 71.38,
    "broker": "IBKR Pro",
    "baseCurrency": "USD",
    "location": "UAE",
    "ibkrEuropeanAccess": "APPROVED — March 26 2026",
    "cashUSD": 34080,
    "cashEUR": -937,
    "cashGBP": -3488,
    "cashBase": 28234,
    "cashFloorRule": "10% of NL = $10,330 minimum. NEVER go below. 25% figure is stale — permanently retired.",
    "lastUpdated": "2026-04-16 SESSION 21 CLOSE — JOURNAL v31",
    "note": "JOURNAL v31 — SESSION 21 CLOSE. LLY 3 shares ENTERED $905.01 stop $850 — SI-39 triggered -20.2%, tranche 1 deployed per two-stage protocol. Tranche 2 option: 1 share $862 limit (~$1,285 remaining SI-39 room). Stop adjustments confirmed via IBKR screenshots: MSFT $375.56→$395.03 (profit lock upgrade), ABVX $118.36→$114.31 (intentional below cost — M&A optionality, max loss $158 accepted), AMPX $13.00→$14.30 (tightened), ITM 84p/82.5p→89.9p/88p (SI-21 trigger met — closed >95p S20). APH $138 BUY ORDER CANCELLED — 6.5% above limit, earnings Apr 29, reassess post-earnings. NEW SI-44: Two-Stage Research Protocol — scan generates candidates only, deep verification mandatory before capital deployed per S11 LESSONS_LEARNED.md. NEW WATCHLIST: TLN (nuclear/Amazon PPA, May 5 earnings — deep verify required), CEG (nuclear Meta/MSFT PPAs — deep verify required), DELL (AI server 14x fwd PE — deep verify required), ALAB (AI connectivity chips, post-earnings only — deep verify required), CRWV (GPU cloud $66B backlog, speculative — deep verify required). All 5 require S11 Stage 2 before entry. TSMC Q1 $35.71B beat (+35.1% YoY) — Q2 guidance from Apr 16 call TBC, watch $372-376 entry zone. Apr 21 ceasefire binary remains dominant risk. ABVX: stop now below cost $117.913 — accepted risk for M&A optionality. LLY TLN assessment corrected: 7 errors documented in S11/LESSONS_LEARNED.md."
  },
  "thesis": {
    "title": "US NAVAL BLOCKADE OF IRANIAN PORTS ACTIVE — SI-25 OIL CONDITION MET — FORMAL REOPENING PENDING",
    "summary": "SESSION 21 UPDATE: WTI ~$93 — SI-25 OIL CONDITION MET (trigger $100.38). Formal Hormuz reopening NOT confirmed. Ceasefire expiry APR 21 — dominant binary event 5 days away. Second round US-Iran talks active. Vance: 'ball in Iran's court.' Trump: 'something could be happening over next two days.' SI-25 dual-condition requires BOTH: formal reopening CONFIRMED + oil -10% from peak. Alert posture ELEVATED. BLOCKADE: CENTCOM says commerce completely halted into/out of Iranian ports. Iran threatens to block ALL Persian Gulf/Gulf of Oman/Red Sea. Ceasefire probability of deal elevated but not guaranteed — renewed hostilities risk non-trivial.",
    "oilWTI": 93,
    "oilBrent": 96,
    "goldPrice": 4760,
    "hormuzStatus": "SESSION 21: WTI ~$93 — SI-25 oil trigger MET ($100.38). Blockade active. CENTCOM: commerce completely halted. Second round talks possible before Apr 21 expiry. Trump: 'close to over.' Iran commander threatened to block ALL Persian Gulf. Iran lost track of mines — cannot fully open even if deal struck. USN mine clearance ops active (CODA catalyst activating). CEASEFIRE EXPIRY: APR 21.",
    "ceasefireFilter": "SI-25 ALERT POSTURE ELEVATED — OIL CONDITION MET. WTI ~$93, peak $111.54, trigger $100.38 — MET. Formal Hormuz reopening NOT confirmed. Both conditions required simultaneously. IF peace deal + formal reopening → SI-25 triggers immediately. CEASEFIRE EXPIRY: APR 21.",
    "blockadeStatus": "US CENTCOM blockade active. Commerce 'completely halted' per CENTCOM. Applies to vessels to/from Iranian ports only. Iran commander: will block ALL Persian Gulf/Gulf of Oman/Red Sea if blockade continues. Iran lost track of mines. USN mine clearance active. Some Iranian tankers transiting Strait per Fars News Agency.",
    "keyDates": [
      {"date": "16 Apr (TODAY — S21)", "event": "SESSION 21 COMPLETE. LLY entered $905.01. Stops adjusted: MSFT $395.03, ABVX $114.31, AMPX $14.30, ITM 89.9p/88p. APH cancelled. SI-44 added. Watchlist expanded: TLN/CEG/DELL/ALAB/CRWV. TSMC Q1 $35.71B beat — Q2 guidance from 10AM UAE call pending.", "priority": "RESOLVED — SESSION 21 COMPLETE"},
      {"date": "19 Apr", "event": "US Iranian oil sanctions waiver expires 12:01 AM ET — secondary sanctions back in force", "priority": "HIGH"},
      {"date": "21 Apr", "event": "CEASEFIRE EXPIRY BINARY. SI-25 dual-condition could trigger same day if formal reopening announced. Tranche 2 review: OXY, BKR post-resolution. SLV primary catalyst. RR.L: no stop before Apr 23.", "priority": "CRITICAL"},
      {"date": "21 Apr", "event": "ISRG Q1 2026 Earnings AMC — Stop $443.86. Watch: China placements, gross margin vs 67-68%, procedure vol. Do NOT tighten stop pre-earnings.", "priority": "CRITICAL"},
      {"date": "21 Apr", "event": "RTX Q1 pre-market — watch only, no position. Re-entry $185-190 on peace deal selloff only.", "priority": "MONITOR"},
      {"date": "23 Apr", "event": "RR.L EX-DIVIDEND — HARD LOCK. DO NOT SELL BEFORE THIS DATE.", "priority": "CRITICAL"},
      {"date": "23 Apr", "event": "AMZN Q1 earnings AMC — AWS growth, AI capex guidance. Stop $234.39/224.", "priority": "CRITICAL"},
      {"date": "28 Apr", "event": "V Q2 earnings AMC — beat + volumes resilient → add 8 more shares Apr 29 open. Miss → exit if below $295.", "priority": "CRITICAL"},
      {"date": "29 Apr", "event": "MSFT Q3 FY2026 Earnings AMC — Azure growth %, Copilot seats. Stop $395.03 (raised S21 from $375.56).", "priority": "CRITICAL"},
      {"date": "23 Apr", "event": "SAP Q1 2026 Earnings — cloud backlog. DO NOT enter SAP before this date.", "priority": "HIGH"},
      {"date": "29 Apr", "event": "APH Q1 Earnings AMC — reassess entry post-results. Original $138 order cancelled S21. New entry zone to be defined post-earnings.", "priority": "HIGH"},
      {"date": "30 Apr", "event": "NOG Q1 earnings — oil revenue at $90-110 WTI, dividend confirmation", "priority": "MEDIUM"},
      {"date": "5 May", "event": "TLN Q1 2026 Earnings — KEY GATE for entry decision. PJM Cornerstone market power objection status. Cornerstone accretion guidance. Amazon PPA volume ramp update. DEEP VERIFY per SI-44 before entry.", "priority": "CRITICAL"},
      {"date": "5 May", "event": "LDO.MI Q1 Earnings — first catalyst for pending buy position.", "priority": "HIGH"},
      {"date": "5 May", "event": "HAG Q1 Earnings — Hensoldt, EU defence watchlist", "priority": "MEDIUM"},
      {"date": "6 May", "event": "R3NK Q1 Earnings — €200M deferred Q4 orders MUST appear. Critical.", "priority": "CRITICAL"},
      {"date": "7 May", "event": "AMPX Q1 Earnings", "priority": "MEDIUM"},
      {"date": "11 May", "event": "PLTR Q1 Earnings — Golden Dome + Maven POR = key catalyst. Reentry zone $120-130 on confirmed award or this catalyst.", "priority": "CRITICAL"},
      {"date": "12 May", "event": "ALFEN Q1 Earnings — EU grid infrastructure watchlist", "priority": "MONITOR"},
      {"date": "12 May", "event": "SLDP Q1 Earnings", "priority": "MONITOR"},
      {"date": "13 May", "event": "VST + PDYN Earnings", "priority": "MEDIUM"},
      {"date": "15 May", "event": "RCAT Q4 Earnings — monitor for securities litigation update before any entry consideration.", "priority": "MONITOR"},
      {"date": "18 May", "event": "ONDS Q1 Earnings — stopped out but monitoring sector", "priority": "MONITOR"},
      {"date": "23 Jun", "event": "AVAV Q1 Earnings — POSITION CLOSED S20. Monitor for re-entry thesis clarification.", "priority": "MONITOR"},
      {"date": "30 Jul", "event": "RR.L H1 Earnings", "priority": "HIGH"},
      {"date": "15 Apr", "event": "SESSION 19 COMPLETE. V BUY $307 placed. NOG BUY $25.08 placed. SLV BUY $70.50 placed.", "priority": "RESOLVED"},
      {"date": "15 Apr", "event": "SESSION 20 COMPLETE. AVAV sold $197.945 (+$71.38). ISRG stop corrected $443.86. SLV resubmitted 35 shares $70/$63. Ceasefire corrected Apr 21. WTI $93, Gold $4,760.", "priority": "RESOLVED"},
      {"date": "9 Apr", "event": "PLTR STOPPED OUT at $134.976. Loss -$1,307. Reentry zone $120-130.", "priority": "RESOLVED"}
    ]
  },
  "positions": [
    {
      "ticker": "CCJ", "name": "Cameco Corp", "shares": 49,
      "avgPrice": 104.021, "costBasis": 5097, "last": 119.78, "marketVal": 5869,
      "unrealPnL": 772, "unrealPct": 15.2, "stop": 108.37, "target": null,
      "status": "HOLD — STOP LIVE",
      "note": "Nuclear thesis structural — EU energy independence + global uranium supply. Stop $108.37 IBKR confirmed. Profit locked. Ceasefire does not reduce uranium demand."
    },
    {
      "ticker": "AMZN", "name": "Amazon.com Inc", "shares": 30,
      "avgPrice": 201.204, "costBasis": 6036, "last": 248.50, "marketVal": 7455,
      "unrealPnL": 1419, "unrealPct": 23.5, "stop": 234.39, "stopType": "Stop Limit", "stopLimit": 224, "target": 300,
      "status": "HOLD — STOP LIMIT LIVE",
      "note": "Stop $234.39/224 Stop Limit GTC. Earnings Apr 23 AMC. AWS +24% last quarter, $100B capex guided 2026. Stop locks ~$1,000 profit."
    },
    {
      "ticker": "VST", "name": "Vistra Corp", "shares": 53,
      "avgPrice": 150.569, "costBasis": 7980, "last": 163.75, "marketVal": 8679,
      "unrealPnL": 699, "unrealPct": 8.8, "stop": 151.5, "target": null,
      "status": "HOLD — STOP LIVE",
      "note": "Stop $151.50 above cost — profit locked. Earnings May 13. AI data centre power thesis intact."
    },
    {
      "ticker": "RR", "name": "Rolls-Royce Holdings", "shares": 150,
      "avgPrice": 1182.9, "costBasis": 1774, "last": 1286.80, "marketVal": 1930,
      "unrealPnL": 156, "unrealPct": 8.8, "stop": null, "target": 1600,
      "status": "HOLD — NO STOP (ex-div Apr 23 — HARD LOCK)", "cur": "GBP",
      "note": "EX-DIV APR 23 — DO NOT SELL BEFORE THIS DATE. After Apr 23: set stop limit 1250p/1230p. H1 earnings Jul 30."
    },
    {
      "ticker": "ITM", "name": "ITM Power PLC", "shares": 3100,
      "avgPrice": 65.1, "costBasis": 2018, "last": 95.55, "marketVal": 2962,
      "unrealPnL": 944, "unrealPct": 46.7, "stop": 89.9, "target": 98,
      "status": "HOLD — STOP LIMIT 89.9p/88p GTC — RAISED S21", "cur": "GBP",
      "note": "S21: Stop raised from 84p/82.5p to 89.9p/88p per SI-21 trigger (closed >95p S20). 52wk high 98p — ITM at 97.5% of 52wk high. GBE equity package catalyst. Cash guidance raised £210-215M."
    },
    {
      "ticker": "AMPX", "name": "Amprius Technologies", "shares": 168,
      "avgPrice": 18.106, "costBasis": 3042, "last": 18.30, "marketVal": 3074,
      "unrealPnL": 33, "unrealPct": 1.1, "stop": 14.30, "target": 32,
      "status": "HOLD — STOP $14.30 GTC (RAISED S21 from $13.00) + LIMIT $32 GTC",
      "note": "Silicon anode battery/drone endurance thesis intact. Q1 earnings May 7. Stop tightened $13.00→$14.30 S21. Limit $32 GTC both live."
    },
    {
      "ticker": "PDYN", "name": "Palladyne AI Corp", "shares": 250,
      "avgPrice": 6.595, "costBasis": 1649, "last": 6.59, "marketVal": 1648,
      "unrealPnL": -1, "unrealPct": -0.1, "stop": 5.75, "target": null,
      "status": "HOLD — STOP LIVE",
      "note": "Remaining 250 shares. Stop $5.75 GTC. Within SI-37 cap. May 13 earnings = next catalyst. No add until DoD contract news."
    },
    {
      "ticker": "CODA", "name": "Coda Octopus Group", "shares": 416,
      "avgPrice": 12.005, "costBasis": 4994, "last": 13.05, "marketVal": 5429,
      "unrealPnL": 435, "unrealPct": 8.7, "stop": 11.51, "target": 22,
      "status": "HOLD — STOP INTENTIONAL — MINE CLEARANCE THESIS ACTIVATING",
      "note": "USN mine clearance operations active in Strait. Iran lost track of mines. CODA MCM/sonar thesis activating. Stop $11.51 intentional. Raise to $12.50 when USN mine clearance contract publicly confirmed. May 13 earnings."
    },
    {
      "ticker": "ABVX", "name": "Abivax SA-ADR", "shares": 44,
      "avgPrice": 117.913, "costBasis": 5188, "last": 121.19, "marketVal": 5332,
      "unrealPnL": 144, "unrealPct": 2.8, "stop": 114.31, "target": null,
      "status": "HOLD — STOP $114.31 GTC (S21 — INTENTIONALLY BELOW COST)",
      "note": "S21: Stop LOWERED from $118.36 to $114.31 — intentional decision for M&A event optionality. Stop is now BELOW cost $117.913 — if triggered, loss ~$158. Accepted risk. No M&A news yet. No Phase 3 data. GRANDFATHERED above SI-37 cap — do not add."
    },
    {
      "ticker": "ISRG", "name": "Intuitive Surgical Inc", "shares": 22,
      "avgPrice": 459.2, "costBasis": 10103, "last": 472.60, "marketVal": 10397,
      "unrealPnL": 294, "unrealPct": 2.9, "stop": 443.86, "target": 510,
      "status": "HOLD — STOP $443.86 GTC — EARNINGS APR 21 AMC",
      "note": "Stop $443.86 confirmed IBKR (corrected S20 from stale $420). Earnings Apr 21 AMC. 41 analysts, avg PT $621 (+31.4% upside). Do NOT tighten stop before earnings. Post-earnings: raise to $455-460 if beat confirmed."
    },
    {
      "ticker": "MSFT", "name": "Microsoft Corp", "shares": 25,
      "avgPrice": 372.73, "costBasis": 9318, "last": 417.80, "marketVal": 10445,
      "unrealPnL": 1127, "unrealPct": 12.1, "stop": 400.43, "target": 430,
      "status": "HOLD — STOP $400.43 GTC (RAISED S22 from $395.03)",
      "note": "S22: Stop further raised $395.03→$400.43 — confirmed IBKR screenshot S22. P16 error caught: stop had been raised at IBKR level without journal update. Earnings Apr 30 AMC. Azure growth + GPT-6 via Azure = positive. Price $418.86 IBKR confirmed S22."
    },
    {
      "ticker": "R3NK", "name": "RENK Group AG", "shares": 25,
      "avgPrice": 52.27, "costBasis": 1307, "last": 53.40, "marketVal": 1335,
      "unrealPnL": 28, "unrealPct": 2.2, "stop": 48, "target": 76,
      "status": "HOLD — STOP LIMIT €48/€47 GTC", "cur": "EUR",
      "note": "Stop Limit €48/€47 GTC IBIS confirmed. Q1 earnings May 6 — €200M deferred Q4 orders must appear. Second tranche add on May 6 confirmation only. R:R to T2 (€76) = 3.9:1."
    },
    {
      "ticker": "LNG", "name": "Cheniere Energy Inc", "shares": 19,
      "avgPrice": 268.813, "costBasis": 5107, "last": 256.75, "marketVal": 4878,
      "unrealPnL": -229, "unrealPct": -4.5, "stop": 248, "target": 330,
      "status": "HOLD — STOP $248 GTC",
      "note": "Stop $248 GTC. Qatari Ras Laffan structural damage — 20% Qatar export capacity sidelined. US blockade extends disruption. Non-Hormuz LNG premium structural. WTI at $93 modest headwind but Qatar thesis independent. Next raise: $255 if LNG closes >$285."
    },
    {
      "ticker": "CRML", "name": "Critical Metals Corp", "shares": 110,
      "avgPrice": 9.07, "costBasis": 999, "last": 8.97, "marketVal": 987,
      "unrealPnL": -11, "unrealPct": -1.1, "stop": 7.5, "target": 15,
      "status": "HOLD — STOP $7.50 GTC",
      "note": "Heavy rare earth from Tanbreez (Greenland). US EXIM interest up to $620M. SI-37 hard cap respected. Do not add until offtake/financing concrete."
    },
    {
      "ticker": "LLY", "name": "Eli Lilly and Company", "shares": 3,
      "avgPrice": 905.01, "costBasis": 2715, "last": 905.00, "marketVal": 2715,
      "unrealPnL": 0, "unrealPct": 0.0, "stop": 850, "target": 1028,
      "status": "HOLD — NEW POSITION S21 — STOP $850 GTC",
      "note": "SI-39 TRIGGERED S21 (-20.2% from 52wk high $1133.95). Tranche 1: 3 shares $905.01. Stop $850 (structure-based). Tranche 2 option: 1 share $862 limit (~$1,285 remaining SI-39 cap). R:R: 1.27:1 to $975, 2.24:1 to $1,028 (base case top), 4.16:1 to $1,134 (ATH). Entered as quality compounder in macro-driven drawdown. Forward PE 27x on FY2026 est ~$22-24/share. GLP-1 thesis intact. DO NOT USE TRAILING STOP — give room through volatility."
    }
  ],
  "pendingOrders": [
    {"ticker": "V", "action": "BUY", "type": "Limit", "qty": 8, "limitPrice": 307, "stopPrice": null, "tif": "GTC", "status": "ACTIVE — S19",
     "note": "SI-39 TRIGGERED: -16.0% from 52wk high $375.51. Earnings Apr 28 AMC. Bracket stop $285 live."},
    {"ticker": "V", "action": "SELL", "type": "Stop", "qty": 8, "limitPrice": null, "stopPrice": 285, "tif": "GTC", "status": "ACTIVE — bracket",
     "note": "Below 52wk low $293.89 = structural failure. Max loss $176."},
    {"ticker": "NOG", "action": "BUY", "type": "Limit", "qty": 80, "limitPrice": 25.08, "stopPrice": null, "tif": "GTC", "status": "ACTIVE — S19",
     "note": "Below entry zone $26-27.50. Citi Buy $36. 6.5% dividend. Earnings Apr 30. Bracket stop $22.50 live. WTI at $93 acceptable."},
    {"ticker": "NOG", "action": "SELL", "type": "Stop", "qty": 80, "limitPrice": null, "stopPrice": 22.5, "tif": "GTC", "status": "ACTIVE — bracket",
     "note": "Max loss $206 on 80 shares."},
    {"ticker": "SLV", "action": "BUY", "type": "Limit", "qty": 35, "limitPrice": 70, "stopPrice": null, "tif": "GTC", "status": "ACTIVE — S20 CONFIRMED",
     "note": "35 shares $70.00 GTC (confirmed IBKR actuals S20). Peace deal asymmetry. Apr 21 ceasefire binary. Gold at $4,760."},
    {"ticker": "SLV", "action": "SELL", "type": "Stop", "qty": 35, "limitPrice": null, "stopPrice": 63, "tif": "GTC", "status": "ACTIVE — S20 CONFIRMED",
     "note": "35 shares $63.00 GTC. Max loss $245. IBKR actuals."},
    {"ticker": "ITM", "action": "SELL", "type": "Stop Limit", "qty": 3100, "limitPrice": 88, "stopPrice": 89.9, "tif": "GTC", "status": "ACTIVE — RAISED S21",
     "note": "S21: Raised from 84p/82.5p to 89.9p/88p Stop Limit GTC LSE. SI-21 trigger executed (closed >95p S20)."},
    {"ticker": "CCJ", "action": "SELL", "type": "Stop", "qty": 49, "limitPrice": null, "stopPrice": 108.37, "tif": "GTC", "status": "ACTIVE",
     "note": "Above cost $104.021 — profit locked."},
    {"ticker": "PDYN", "action": "SELL", "type": "Stop", "qty": 250, "limitPrice": null, "stopPrice": 5.75, "tif": "GTC", "status": "ACTIVE",
     "note": "250 shares remaining post S18 partial exit."},
    {"ticker": "AMPX", "action": "SELL", "type": "Stop", "qty": 168, "limitPrice": null, "stopPrice": 14.30, "tif": "GTC", "status": "ACTIVE — RAISED S21",
     "note": "Stop raised $13.00→$14.30 GTC S21."},
    {"ticker": "AMPX", "action": "SELL", "type": "Limit", "qty": 168, "limitPrice": 32, "stopPrice": null, "tif": "GTC", "status": "ACTIVE",
     "note": "Profit target."},
    {"ticker": "VST", "action": "SELL", "type": "Stop", "qty": 53, "limitPrice": null, "stopPrice": 151.5, "tif": "GTC", "status": "ACTIVE",
     "note": "Above cost $150.569 — profit locked."},
    {"ticker": "AMZN", "action": "SELL", "type": "Stop Limit", "qty": 30, "limitPrice": 224, "stopPrice": 234.39, "tif": "GTC", "status": "ACTIVE",
     "note": "Locks ~$1,000 profit pre-Apr 23 earnings."},
    {"ticker": "ABVX", "action": "SELL", "type": "Stop", "qty": 44, "limitPrice": null, "stopPrice": 114.31, "tif": "GTC", "status": "ACTIVE — S21 ADJUSTED",
     "note": "S21: Stop LOWERED to $114.31 (from $118.36). Now below cost $117.913. Intentional — M&A optionality. Max loss ~$158."},
    {"ticker": "ISRG", "action": "SELL", "type": "Stop", "qty": 22, "limitPrice": null, "stopPrice": 443.86, "tif": "GTC", "status": "ACTIVE — S20 CORRECTED",
     "note": "$443.86 (corrected S20 from stale $420). Hold through Apr 21 earnings. Raise to $455-460 post-beat."},
    {"ticker": "MSFT", "action": "SELL", "type": "Stop", "qty": 25, "limitPrice": null, "stopPrice": 400.43, "tif": "GTC", "status": "ACTIVE — RAISED S22",
     "note": "S22: Raised $395.03→$400.43. Confirmed IBKR screenshot. Earnings Apr 30 AMC."},
    {"ticker": "CODA", "action": "SELL", "type": "Stop", "qty": 416, "limitPrice": null, "stopPrice": 11.51, "tif": "GTC", "status": "ACTIVE — INTENTIONAL",
     "note": "Mine clearance catalyst pending. Do not raise until USN mine ops contract confirmed."},
    {"ticker": "LNG", "action": "SELL", "type": "Stop", "qty": 19, "limitPrice": null, "stopPrice": 248, "tif": "GTC", "status": "ACTIVE",
     "note": "Next raise: $255 if LNG closes >$285."},
    {"ticker": "R3NK", "action": "SELL", "type": "Stop Limit", "qty": 25, "limitPrice": 47, "stopPrice": 48, "tif": "GTC", "status": "ACTIVE",
     "note": "€48.00/€47.00 GTC IBIS confirmed."},
    {"ticker": "LDO", "action": "BUY", "type": "Limit", "qty": 35, "limitPrice": 56, "stopPrice": null, "tif": "GTC", "status": "PENDING",
     "note": "LDO.MI — BVME. Entry zone €53-56.50. May 5 earnings. Morningstar FV €75.60. Stop €50/€49 to add on fill only."},
    {"ticker": "MP", "action": "BUY", "type": "Limit", "qty": 75, "limitPrice": 55, "stopPrice": null, "tif": "GTC", "status": "ACTIVE S18",
     "note": "Critical minerals anchor. Only operating US REE mine. Pentagon 10-year magnet offtake. Current $59.60 — patience order."},
    {"ticker": "MP", "action": "SELL", "type": "Stop", "qty": 75, "limitPrice": null, "stopPrice": 50, "tif": "GTC", "status": "ACTIVE S18",
     "note": "Bracket stop. Max loss $375 at 75 shares."},
    {"ticker": "LLY", "action": "SELL", "type": "Stop", "qty": 3, "limitPrice": null, "stopPrice": 850, "tif": "GTC", "status": "ACTIVE — NEW S21",
     "note": "Stop $850 GTC. SI-39 tranche 1. Max loss $165.03 ($55.01/share × 3). Tranche 2 option: 1 share limit $862 — decision pending."},
    {"ticker": "CRML", "action": "SELL", "type": "Stop", "qty": 110, "limitPrice": null, "stopPrice": 7.5, "tif": "GTC", "status": "ACTIVE",
     "note": "Max loss $173 on 110 shares."}
  ],
  "si39TierOneWatchlist": {
    "lastBatchPull": "2026-04-16",
    "tool": "EOD:get_us_live_extended_quotes",
    "batchSymbols": ["NVDA.US","META.US","GOOGL.US","AAPL.US","V.US","LLY.US","TSM.US","COST.US","ASML.US"],
    "note": "Run at EVERY session open as Section 0 — BEFORE sections A-K. S21: EOD API functional — retry each session open.",
    "verified": "2026-04-16 EOD confirmed",
    "names": [
      {"ticker": "V", "52wkHigh": 375.51, "52wkLow": 293.89, "price": 315.72, "drawdown": -16.0, "trigger": -15, "triggerPrice": 319.18, "status": "TRIGGERED — BUY $307 GTC active. Earnings Apr 28 AMC."},
      {"ticker": "LLY", "52wkHigh": 1133.95, "52wkLow": 623.78, "price": 904.999, "drawdown": -20.2, "trigger": -20, "triggerPrice": 907.16, "status": "TRIGGERED S21 — POSITION OPENED. 3 shares $905.01 stop $850. Tranche 2: 1 share $862 option."},
      {"ticker": "META", "52wkHigh": 796.25, "52wkLow": 479.80, "price": 671.13, "drawdown": -15.7, "trigger": -20, "triggerPrice": 637.00, "status": "APPROACHING — alert at $637"},
      {"ticker": "AAPL", "52wkHigh": 288.62, "52wkLow": 189.81, "price": 266.13, "drawdown": -7.8, "trigger": -15, "triggerPrice": 245.33, "status": "MONITOR"},
      {"ticker": "GOOGL", "52wkHigh": 349.00, "52wkLow": 146.10, "price": 336.40, "drawdown": -3.6, "trigger": -18, "triggerPrice": 286.18, "status": "MONITOR — missed at $280 March 2026 (origin of SI-39)"},
      {"ticker": "NVDA", "52wkHigh": 212.19, "52wkLow": 95.04, "price": 198.33, "drawdown": -6.5, "trigger": -25, "triggerPrice": 159.14, "status": "MONITOR"},
      {"ticker": "TSM", "52wkHigh": 390.21, "52wkLow": 145.84, "price": 376.62, "drawdown": -3.5, "trigger": -20, "triggerPrice": 312.17, "status": "MONITOR — Q1 earnings Apr 16 10AM UAE complete. Watch $372-376 entry zone post-reaction."},
      {"ticker": "COST", "52wkHigh": 1067.08, "52wkLow": 844.06, "price": 983.85, "drawdown": -7.8, "trigger": -15, "triggerPrice": 906.52, "status": "MONITOR"},
      {"ticker": "ASML", "52wkHigh": 1547.22, "52wkLow": 614.06, "price": 1476.59, "drawdown": -4.6, "trigger": -20, "triggerPrice": 1237.78, "status": "NOT DRAWDOWN — remove from active drawdown watch."}
    ]
  },
  "priceVerificationProtocol": {
    "title": "MANDATORY BEFORE ANY PRICE-BASED RECOMMENDATION — SI-1 + SI-40 + SI-44",
    "currentPriceUS": "MMD /v2/aggs/ticker/{TICKER}/prev — use field 'c' (close). Primary source.",
    "52wkRangeUS": "EOD:get_us_live_extended_quotes — fields fiftyTwoWeekHigh, fiftyTwoWeekLow. Batch all Tier 1 names together. ONLY AUTHORISED SOURCE for 52wk range.",
    "currentPriceEUUK": "Yahoo Finance web_fetch or web_search. EODHD has no LSE subscription.",
    "52wkRangeEUUK": "web_fetch https://finance.yahoo.com/quote/{TICKER}/ OR web_search '{TICKER} 52 week high 2026'.",
    "crossCheck": "If MMD and EODHD current prices diverge >3%, flag it.",
    "memoryForbidden": "MEMORY ESTIMATES FOR ANY PRICE DATA ARE FORBIDDEN.",
    "s21Notes": {
      "newProtocol": "SI-44 TWO-STAGE RESEARCH: scan outputs are candidates only — all specific figures require primary source verification before recommendation.",
      "LLYEntry": "LLY $905.01 S21 — SI-39 triggered. 3 shares tranche 1.",
      "stopChanges": "MSFT $395.03, ABVX $114.31 (below cost — intentional), AMPX $14.30, ITM 89.9p/88p."
    }
  },
  "cDriveProtocol": {
    "confirmed": "2026-04-16 SESSION 21",
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
      "body": "Before citing analyst targets or ratings, verify the note date. Never construct a bullish narrative from stale data. Pull live consensus from verified aggregator — not article summary (S21: TLN error — stated 12/13 Strong Buy, actual ~12 Buy/2 Hold/1 Sell)."
    },
    {
      "id": 3, "title": "State Tracking — No Repetition",
      "body": "Before adding any item to pending orders or watchlist, check whether it already appears. IAG CLOSED S08. ITM ENTERED S08. LEU CLOSED S09. AVAV CLOSED S20. APH ORDER CANCELLED S21 — never re-list as active order."
    },
    {
      "id": 4, "title": "Evidence Matching",
      "body": "The conclusion must match the evidence cited. If consensus target equals current price, do not describe as 'asymmetric'. No promotional language."
    },
    {
      "id": 5, "title": "Iran Ceasefire Filter — EVOLVED",
      "body": "EVOLVED S08: Filter: speed and terms of Hormuz reopening. S21: SI-25 OIL CONDITION MET ($93 < $100.38). Formal reopening NOT confirmed. Alert posture elevated. Ceasefire expiry APR 21 — 5 days away."
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
      "body": "SECTION 0 — RUNS FIRST, EVERY SESSION:\nBatch EOD:get_us_live_extended_quotes ['NVDA.US','META.US','GOOGL.US','AAPL.US','V.US','LLY.US','TSM.US','COST.US','ASML.US']\nPlus MMD prev close for current prices.\nOutput: Drawdown table. Triggered names = session priority.\n\nSECTIONS A-K:\nA: IBKR cross-check | B: Iran/oil/Hormuz | C: Live positions | D: EU defence | E: Nuclear | F: US watchlist | G: Speculative | H: Congressional | I: Macro | J: Error check | K: Sector threat\n\nNOTE S21: Watchlist names flagged in scan require SI-44 Stage 2 deep verify before entry — see SI-44."
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
      "body": "E1: Timezone. E2: Stale position. E3: Fill re-flag. E4: Price verification. E5: Market timing. E6: Dividend capture. E7: Session discipline. E8: Stale quote. E9: GTC orphan (cancel stop BEFORE/immediately after market sell). E10: Closed position scan.\nE11: 52WK HIGH HALLUCINATION — use EODHD extended quotes mandatory.\nE12: TOOL ROUTING GAP — MMD=current price, EODHD=52wk range.\nE13: EODHD PRICE DELAY — may be 4-6 days stale, use MMD for current price.\nE14: JOURNAL DATE DISCREPANCY — cross-reference key event dates with 2+ primary sources."
    },
    {
      "id": 18, "title": "SLDP Research Report — Completed Mar 30 2026",
      "body": "Entry: $2.20-2.50. Stop $1.80. Max $500-1,000. WATCH — DO NOT BUY until decline stabilises."
    },
    {
      "id": 19, "title": "STOPPED OUT / CLOSED POSITIONS — REALIZED TRACKING (SI-19)",
      "body": "ONDS: Loss ~$601. KTOS: Loss ~$1,601. CCL: Profit +$122. UEC: Loss ~$127. IAG.L: Profit ~£326. RCL: Loss ~$132. LDO.MI (first tranche): Profit +€21.52. LEU: Loss ~$238. PLTR: Loss -$1,307. PDYN partial: Profit +$17.42. AVAV: 25 shares sold S20 @ $197.945. Profit +$71.38. Thesis exit.\nTotal net realized since inception: ~-$2,073 (improving)."
    },
    {
      "id": 20, "title": "BTC Position — Entry Rules",
      "body": "BTC PLANNED 5-7.5% portfolio. Vehicle: IBKR Paxos spot BTC. Entry target $55K. Stop $48K. NO ORDER PLACED. BTC ~$70,700 (Apr 15). Watch for pullback to $55K."
    },
    {
      "id": 21, "title": "ITM Power — Entry Rules + Breakout Protocol",
      "body": "ENTERED S08 @ 64.8-65p. 3100 shares. Stop RAISED S21: 89.9p/88p Stop Limit GTC LSE. Target 1: 98p. Target 2: 130p."
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
      "id": 24, "title": "Cash Preservation — 10% Floor (REVISED S21)",
      "body": "MINIMUM CASH RESERVE = 10% OF NET LIQUIDITY. At ~$103,300 NAV, floor = $10,330. Cash now ~$28,234 (post-LLY entry $2,715). Deployable above floor. Do NOT force entries outside SI-39 trigger conditions."
    },
    {
      "id": 25, "title": "SI-25 EXIT TRIGGER — OIL BASED NOT CEASEFIRE BASED",
      "body": "EXIT TRIGGER: Formal Hormuz reopening CONFIRMED + WTI -10% from peak. BOTH simultaneously.\nCurrent WTI peak: $111.54. Trigger: $100.38.\nCurrent WTI: ~$93. OIL CONDITION MET ($93 < $100.38).\nFormal reopening: NOT MET — blockade active.\nSI-25 NOT TRIGGERED but ALERT POSTURE ELEVATED. Ceasefire expiry Apr 21 — 5 days away."
    },
    {
      "id": 26, "title": "SECTOR THREAT MONITOR — MANDATORY FULL SCAN SECTION K",
      "body": "SECTOR 1: DEFENCE [RR] — ETF canary: ITA.\nSECTOR 2: NUCLEAR [CCJ] — ETF canary: URA.\nSECTOR 3: AI/CLOUD [MSFT, AMZN, PDYN] — MANDATORY: AI model search.\nSECTOR 4: MEDICAL ROBOTICS [ISRG] — ETF canary: IHI.\nSECTOR 5: BIOTECH [ABVX] — ETF canary: XBI.\nSECTOR 6: BATTERY/DRONE [AMPX] — silicon anode + drone endurance.\nSECTOR 7: MARITIME [CODA] — MINE CLEARANCE THESIS ACTIVATING.\nSECTOR 8: POWER [VST] — ETF canary: XLU.\nSECTOR 9: EU HYDROGEN [ITM] — EU green hydrogen policy.\nSECTOR 10: AI POWER/NUCLEAR [TLN, CEG WATCHLIST] — AI data centre PPA thesis. Deep verify before entry."
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
      "id": 31, "title": "ENTRY READINESS BASELINE — ARCHIVED (SEE SI-25, SI-39, SI-44)", "body": "Superseded by SI-25, SI-39, and SI-44."
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
      "body": "FILE: Claude_Fund_Trade_Tracker.xlsx — C:\\Users\\jcadb\\claude-fund\\tracker\\\nTRIGGER: Any confirmed IBKR fill.\nPROTOCOL: Append one row. IBKR fill confirmation only. Never estimated prices.\nS20 PENDING (carry to S22): Add AVAV close — 25 shares, entry $195.09, exit $197.945, profit +$71.38."
    },
    {
      "id": 35, "title": "DOLLAR-RISK POSITION SIZING — MANDATORY FOR ALL NEW ENTRIES",
      "body": "Max acceptable loss per trade: $500. Stop%: (entry-stop)/entry. Position: $500/stop% = max deployment. Cap at SI-37 for speculative names.\nStop 5%→$10,000. 8%→$6,250. 10%→$5,000. 15%→$3,333. 20%→$2,500.\nS21 LLY: $55.01 stop distance × 3 shares = $165.03. ✅ Within limits."
    },
    {
      "id": 36, "title": "MINIMUM 2:1 RISK-REWARD FILTER",
      "body": "Min R:R to enter: 2.0:1. Below 2:1 = do not enter. Exemptions: Tactical binary-catalyst <$2,000, max 1.5:1.\nS21 LLY NOTE: R:R 1.27:1 to near-term base case, 2.24:1 to $1,028 (base case top), 4.16:1 to ATH. Entered as quality compounder — target anchored to base case top per session analysis."
    },
    {
      "id": 37, "title": "SPECULATIVE POSITION HARD CAP — $1,500 MAXIMUM",
      "body": "Speculative = pre-revenue, no imminent catalyst, narrative-only, stopped-out within 90 days, or active short attack.\nHARD CAP: $1,500 per name. Current: AMPX $3,042 (grandfathered), PDYN $1,649 (within cap), CODA $4,994 (grandfathered — mine clearance catalyst).\nS21 NEW WATCHLIST SPECULATIVE: CRWV $1,500 max. ALAB $1,500 max (treat as speculative given PE 72x)."
    },
    {
      "id": 38, "title": "STRUCTURE-BASED STOP PLACEMENT — NO ROUND NUMBERS",
      "body": "Place stops 1-2% BELOW confirmed support. Never AT the level. No round numbers.\nISRG: $443.86 (IBKR). LLY: $850 (structure-based). NOG: $22.50 (review)."
    },
    {
      "id": 39, "title": "SI-39: UNDERVALUED US LARGE CAP SCANNER — SECTION 0",
      "body": "PURPOSE: Flag quality large-caps in macro-driven drawdowns before recovery window closes.\nSECTION 0: EOD:get_us_live_extended_quotes batch 9 Tier 1 names. MMD for current prices. Calculate drawdown. Triggered names = session research priority.\n\nTIER 1 TRIGGERS (verified S21):\nNVDA -25%→$159.14 | META -20%→$637.00 | GOOGL -18%→$286.18 | AAPL -15%→$245.33 | V -15%→$319.18 [TRIGGERED — order active] | LLY -20%→$907.16 [TRIGGERED S21 — position opened] | TSM -20%→$312.17 | COST -15%→$906.02 | ASML -20%→$1,237.78\n\nMAX per SI-39 position: $4,000. Max aggregate: 20% NAV."
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
      "body": "ORIGIN: AVAV closed S20 at $197.945 (+$71.38) — near breakeven. Thesis broken by: (1) SCAR program $1.4B at risk. (2) Q3 FY2026 operating loss -$179M vs -$3.1M. (3) Pomerantz securities investigation. (4) No near-term catalyst.\n\nLESSON: When thesis breaks with position near breakeven, EXIT IMMEDIATELY.\n\nAPPLICATION: If PRIMARY thesis driver impaired by confirmed new datapoint + position within 5% of breakeven → exit at market on next open.\n\nCANCEL GTC STOPS IMMEDIATELY after market exit order — E9 orphan prevention."
    },
    {
      "id": 43, "title": "CASH DEPLOYMENT TRIGGERS (UPDATED S21)",
      "body": "CURRENT CASH: ~$28,234 (post-LLY entry). Floor $10,330. Deployable above floor: ~$17,904.\nA: Islamabad fails + Hormuz closed 5+ days → ACTIVATED Apr 12.\nB: Price enters defined entry zone + catalyst within 8 weeks.\nC: Existing position stops out → redeploy 80% within 48hrs.\nD: BTC at or below $55,000 → 5-7.5% of NAV.\nE: Earnings catalyst within 3 days for watchlist name at entry zone.\nLLY tranche 2: 1 share $862 option (~$1,285 remaining SI-39 room).\nTLN/CEG/DELL: deploy post Apr 21 binary + SI-44 Stage 2 verification complete."
    },
    {
      "id": 44, "title": "SI-44: TWO-STAGE RESEARCH PROTOCOL — SCAN vs PRE-ENTRY VERIFICATION (NEW S21)",
      "body": "ORIGIN: TLN S21 write-up contained 7 material errors from presenting scan-level research with recommendation-level confidence. See S11 in LESSONS_LEARNED.md for full case study and error list.\n\nSTAGE 1 — SCAN (correct for candidate list generation only):\n- Price/drawdown verified via tools\n- Broad thesis described at sector level\n- R:R directional estimate only\n- ALL specific figures (acquisition multiples, analyst counts, earnings dates, regulatory status) must be labelled UNVERIFIED — deep check required before entry\n- Output = WATCHLIST CANDIDATE, not a recommendation\n\nSTAGE 2 — PRE-ENTRY DEEP VERIFICATION (mandatory before capital is committed):\n□ Read most recent earnings release + guidance from SEC EDGAR or company IR website\n□ Confirm earnings date from company IR calendar directly — not from article or memory\n□ Pull live analyst consensus from verified aggregator — not article summary\n□ Check active regulatory proceedings (FERC, FTC, DOJ, SEC litigation) affecting thesis\n□ Confirm acquisition status: open/pending/closed — correct accretion figures for current transaction\n□ Verify valuation metric suits financial stage: PE only for profitable companies; EV/EBITDA + FCF yield for leveraged/complex; EV/Revenue for pre-profit\n□ State price vs 50-day vs 200-day — all three data points\n□ Cross-reference pullback drivers: macro rotation vs company-specific vs deal/regulatory risk — do not default to macro only\n□ SI-35 dollar-risk sizing confirmed\n□ SI-36 R:R ≥2:1 verified\n□ SI-41 catalyst within 8 weeks confirmed\n□ Correlation with existing positions checked\n\nHARD RULE: No specific acquisition multiple, analyst count, earnings date, regulatory status or valuation figure from scan phase may appear in a recommendation without primary source verification. Scan-phase figures are hypotheses. Only verified figures become recommendations.\n\nS21 WATCHLIST STATUS: TLN, CEG, DELL, ALAB, CRWV all at Stage 1 only. Stage 2 required before any entry."
    },
    {
      "id": 45,
      "title": "SI-45: WEEKLY BROAD US MARKET DRAWDOWN SCREENER (NEW S22)",
      "body": "ORIGIN: TSM missed as a drawdown entry during S22 review. SI-39 Section 0 scans only 9 pre-selected names and cannot catch quality names not already on the Tier 1 list. TSM went through a -62.6% drawdown during the Iran war selloff, crossing the SI-39 -20% trigger at $312.17 for an extended period before the window closed.\n\nPURPOSE: Weekly broad US market screener to catch quality names in macro-driven drawdowns not covered by the fixed SI-39 Tier 1 batch.\n\nFREQUENCY: EVERY WEEK. Run on the first session of each trading week (Monday, or Tuesday if Monday is a holiday). Non-negotiable. Do not skip.\n\nTOOL: EOD:stock_screener\n\nSCREENER CRITERIA (PRIMARY — broader):\n- Exchange: US (NYSE + NASDAQ)\n- Market cap: >= $5B\n- Current price <= 80% of 52-week high (i.e. -20% or worse from 52wk high)\n- Average daily volume > 500,000 (liquidity)\n- Exclude: names already in SI-39 Tier 1 batch, names already held\n\nSCREENER CRITERIA (SECONDARY — shallower but higher quality):\n- Market cap >= $10B only\n- Current price <= 85% of 52-week high (-15% or worse)\n- Same volume and exchange filters\n\nOUTPUT: Raw candidate list — ticker, price, 52wk high, drawdown %. No recommendations. All candidates enter Stage 1 of SI-44 immediately.\n\nNOISE POLICY: Do not filter aggressively before presenting. Return the full list. Noise is acceptable — the cost of missing a TSM-type entry far exceeds the cost of reviewing 20 false positives. Rapid review takes 2-3 minutes.\n\nSI-39 TIER 1 PROMOTION: Any name appearing at -20% or worse for 2 consecutive weekly scans should be evaluated for permanent addition to the SI-39 Tier 1 fixed batch.\n\nRELATIONSHIP TO SI-39 SECTION 0: Section 0 is the daily fast-twitch response on 9 known names. SI-45 is the weekly catch-all audit across the full US market. Both run independently and neither replaces the other."
    }
  ],
  "watchlistUS": [
    {
      "ticker": "V", "name": "Visa Inc", "exchange": "NYSE",
      "status": "ACTIVE — BUY LIMIT $307 GTC — SI-39 TRIGGERED",
      "currentPrice": 315.72, "52wkHigh": 375.51, "drawdown": -16.0,
      "entry": "$307 GTC placed S19", "stop": 285, "target": 399,
      "note": "SI-39 TRIGGERED (-16.0%). ORDER PLACED 8 shares. FCF $22.9B, 97.8% gross margin. Earnings Apr 28 AMC. Consensus $399. Tranche 2 post-earnings on beat: add 8 shares Apr 29 open."
    },
    {
      "ticker": "LLY", "name": "Eli Lilly and Company", "exchange": "NYSE",
      "status": "POSITION OPENED S21 — 3 shares $905.01 stop $850",
      "currentPrice": 905.00, "52wkHigh": 1133.95, "drawdown": -20.2, "trigger": -20, "triggerPrice": 907.16,
      "entry": "ENTERED S21 — 3 shares $905.01. Tranche 2 option: 1 share $862.", "stop": 850, "target": 1028,
      "note": "SI-39 TRIGGERED S21 (-20.2%). GLP-1/Mounjaro/Zepbound thesis intact. Drawdown valuation-driven not thesis-impaired. Forward PE 27x FY2026. R:R 4.1:1 to ATH. Tranche 2: 1 share $862 limit (~$1,285 remaining SI-39 room). Stop $850 GTC."
    },
    {
      "ticker": "TSM", "name": "Taiwan Semiconductor", "exchange": "NYSE",
      "status": "WATCH — POST APR 16 EARNINGS ENTRY ZONE $372-376",
      "currentPrice": 376.62, "52wkHigh": 390.21, "drawdown": -3.5,
      "entry": "$372 (in-line) or $350 (miss/disappointment)", "stop": 340, "target": 450,
      "note": "Q1 2026 earnings Apr 16 10AM UAE. Revenue $35.71B beat (+35.1% YoY). Q2 guidance from call TBC. Post-earnings entry ONLY. Watch $372-376 intraday. Not a drawdown play at -3.5%."
    },
    {
      "ticker": "GOOGL", "name": "Alphabet Inc", "exchange": "NASDAQ",
      "status": "MONITOR — NEXT TRIGGER $286.18",
      "currentPrice": 336.40, "52wkHigh": 349.00, "drawdown": -3.6,
      "note": "MISSED AT $280 MARCH 2026 — origin of SI-39. Next trigger: $286.18. At $286: Search monopoly, Cloud +28%, $100B+ net cash. P/E ~20x. Immediate entry $4,000 max."
    },
    {
      "ticker": "AVAV", "name": "AeroVironment Inc", "exchange": "NASDAQ",
      "status": "CLOSED S20 — WATCH ONLY. Re-entry requires SCAR clarity.",
      "currentPrice": 197.945, "entry": "RE-ENTRY: SCAR resolution + Q3 op loss normalisation + below $195.09 per P11", "stop": null,
      "note": "SOLD S20 at $197.945 (+$71.38). Thesis broken: SCAR $1.4B at risk, Q3 op loss -$179M, Pomerantz litigation. Re-entry conditions: (1) SCAR resolved, (2) Below $195.09, (3) Q4 earnings show normalisation. June 23 earnings earliest."
    },
    {
      "ticker": "NOG", "name": "Northern Oil & Gas", "exchange": "NYSE",
      "status": "ACTIVE — BUY LIMIT $25.08 GTC",
      "currentPrice": 26.45, "entry": "$25.08 GTC placed", "stop": 22.50,
      "note": "Citi Buy $36. 6.5% dividend. Earnings Apr 30. WTI at $93 reduces upside but dividend yield provides floor. R:R adequate."
    },
    {
      "ticker": "SLV", "name": "iShares Silver Trust", "exchange": "NYSE",
      "status": "ACTIVE — BUY LIMIT $70.00 GTC (35 shares)",
      "currentPrice": 71.69, "entry": "$70.00 GTC — 35 shares", "stop": 63.00,
      "note": "S20 CONFIRMED: 35 shares $70.00/$63.00. Silver Apr 21 ceasefire expiry = primary catalyst. Gold at $4,760. JP Morgan avg forecast $81 for 2026."
    },
    {
      "ticker": "OXY", "name": "Occidental Petroleum", "exchange": "NYSE",
      "status": "WATCH — TRANCHE 2 POST APR 21 CEASEFIRE EXPIRY",
      "currentPrice": 55.38, "entry": "$54.50 GTC post-Apr 21", "stop": 48,
      "note": "Post-blockade thesis. Ceasefire expiry Apr 21. Place GTC after resolution clarity."
    },
    {
      "ticker": "BKR", "name": "Baker Hughes", "exchange": "NYSE",
      "status": "WATCH — ALERT $58.50 POST APR 22 EARNINGS",
      "currentPrice": 61.49, "entry": "$58.50 post-Apr 22 earnings", "stop": 55,
      "note": "Oilfield services + LNG compression. Earnings Apr 22. Post-earnings entry only."
    },
    {
      "ticker": "RTX", "name": "RTX Corporation", "exchange": "NYSE",
      "status": "WATCH ONLY — Re-entry $185-190 on peace deal selloff only",
      "currentPrice": 202.81, "entry": "$185-190 ON PEACE DEAL SELLOFF ONLY",
      "note": "Removed from active entry S19. Thesis priced at ATH. Earnings Apr 21 — watch only."
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
    },
    {
      "ticker": "TLN", "name": "Talen Energy Corp", "exchange": "NASDAQ",
      "status": "WATCH — S21 CANDIDATE — SI-44 STAGE 2 REQUIRED BEFORE ENTRY",
      "currentPrice": 353.30, "52wkHigh": 451.28, "drawdown": -21.7,
      "entry": "$340-355 post May 5 earnings — Stage 2 verify first", "stop": 305, "target": 430,
      "note": "Nuclear power + Amazon PPA (1,920 MW through 2042 front-of-meter). 2026 adj EBITDA guided $1.75-2.05B. Pending Cornerstone acquisition (2.6GW natgas, +15% accretion — NOT in 2026 guidance). RISK: PJM independent market monitor filed market power objection on Cornerstone. Amazon PPA restructured once after FERC rejected behind-the-meter model. Already below 200-day MA (~$365). Pullback = macro + deal/regulatory risk. Q1 EARNINGS MAY 5 2026 — key gate for entry. SI-44 STAGE 2 MANDATORY: verify Cornerstone status, PJM objection outcome, live consensus, EV/EBITDA valuation (GAAP net loss — PE meaningless)."
    },
    {
      "ticker": "CEG", "name": "Constellation Energy Corp", "exchange": "NASDAQ",
      "status": "WATCH — S21 CANDIDATE — SI-44 STAGE 2 REQUIRED BEFORE ENTRY",
      "currentPrice": 295.18, "52wkHigh": 412.70, "drawdown": -28.5,
      "entry": "$285-295", "stop": 260, "target": 380,
      "note": "Pure-play US nuclear. Long-term PPAs: Meta (Clinton Clean Energy Center full output) + Microsoft AI operations. 26% EPS growth guided 2026. Nuclear Production Tax Credit backstop. Forward PE ~26x. R:R 2.8:1. SI-44 STAGE 2 REQUIRED: confirm earnings date, live consensus, regulatory status, technical posture (50-day vs 200-day) before entry."
    },
    {
      "ticker": "DELL", "name": "Dell Technologies Inc", "exchange": "NYSE",
      "status": "WATCH — S21 CANDIDATE — SI-44 STAGE 2 REQUIRED BEFORE ENTRY",
      "currentPrice": 177.36, "52wkHigh": 191.37, "drawdown": -7.3,
      "entry": "$170-177", "stop": 158, "target": 220,
      "note": "$64B AI server orders, $43B backlog entering year. Forward PE 14.1x, dividend 1.4%. 17% earnings growth estimate. AI infrastructure backbone at legacy hardware valuation. Drawdown only -7.3% — limited pullback. SI-44 STAGE 2 REQUIRED: confirm earnings date (est. late May FY2027 Q1), live consensus, backlog conversion rate, margin trajectory."
    },
    {
      "ticker": "ALAB", "name": "Astera Labs Inc", "exchange": "NASDAQ",
      "status": "WATCH — S21 CANDIDATE — POST EARNINGS ENTRY ONLY — SI-44 STAGE 2 REQUIRED",
      "currentPrice": 172.09, "52wkHigh": 262.90, "drawdown": -34.5,
      "entry": "$160-172 POST EARNINGS ONLY", "stop": 140, "target": 230,
      "note": "PCIe/CXL connectivity chips — bottleneck layer in AI rack architecture. Revenue ~100% YoY. Forward PE 72x (expensive but compressing from ATH levels). Q1 earnings May — DO NOT ENTER BEFORE RESULTS. SI-37 CAP: $1,500 (treat as speculative given forward PE). SI-44 STAGE 2 REQUIRED: confirm earnings date, customer concentration, revenue quality, live consensus."
    },
    {
      "ticker": "CRWV", "name": "CoreWeave Inc", "exchange": "NASDAQ",
      "status": "WATCH — S21 CANDIDATE — SPECULATIVE $1,500 CAP — SI-44 STAGE 2 REQUIRED",
      "currentPrice": 117.79, "52wkHigh": 187.00, "drawdown": -37.0,
      "entry": "$110-118", "stop": 92, "target": 165,
      "note": "GPU cloud rental. $5.1B revenue 2025, guiding $12-13B 2026 (+140%). $66B contracted backlog vs ~$61B market cap. Pre-profit, debt-heavy IPO March 2025. SI-37 HARD CAP $1,500. SI-44 STAGE 2 REQUIRED: confirm Q1 earnings date, debt structure details, customer concentration (Microsoft dependency), cash burn rate."
    }
  ],
  "watchlistEU": [
    {"ticker": "R3NK", "name": "RENK Group AG", "exchange": "XETRA", "current": 53.40, "entry": "IN PORTFOLIO", "target": 76, "cur": "EUR", "note": "HELD. May 6 earnings. €200M deferred orders must appear."},
    {"ticker": "HAG", "name": "Hensoldt AG", "exchange": "XETRA", "current": 70, "entry": "€70-75", "target": 91, "cur": "EUR", "note": "May 5 earnings. WATCH ONLY."},
    {"ticker": "LDO", "name": "Leonardo SpA", "exchange": "MILAN", "current": 55.87, "entry": "€53-56.50 (GTC €56 active)", "target": 68, "cur": "EUR", "note": "GTC €56 buy active. May 5 earnings. Morningstar FV €75.60."},
    {"ticker": "CWR.L", "name": "Ceres Power", "exchange": "LSE", "current": 310, "entry": "250-270p pullback only", "cur": "GBP", "note": "ENTRY 250-270p ONLY."},
    {"ticker": "ITM.L", "name": "ITM Power PLC", "exchange": "LSE", "current": 95.55, "entry": "IN PORTFOLIO", "cur": "GBP", "note": "HELD. 95.55p. Stop raised S21: 89.9p/88p. 52wk high 98p."},
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
            <span className="badge badge-blue">SI-44 ACTIVE</span>
          </div>
        </div>
        <div style={{ marginTop: 8, fontSize: 10, color: COLORS.textDim, lineHeight: 1.5 }}>{data.fund.note.substring(0, 400)}...</div>
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
                <span className={`badge ${o.status?.includes("S21") ? "badge-blue" : o.status?.includes("S20") ? "badge-blue" : o.status?.includes("PENDING") ? "badge-amber" : "badge-grey"}`}>{o.status?.includes("S21") ? "S21" : o.status?.includes("S20") ? "S20" : o.status?.includes("S19") ? "S19" : o.status?.includes("S18") ? "S18" : "GTC"}</span>
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
                <span className={`badge ${w.status?.includes("CLOSED") ? "badge-red" : w.status?.includes("ACTIVE") || w.status?.includes("OPENED") ? "badge-green" : w.status?.includes("NEAR") || w.status?.includes("STAGE 2") ? "badge-amber" : "badge-grey"}`}>{w.status?.substring(0, 40)}</span>
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
            <div key={ins.id} className="card" style={{ display: "flex", gap: 12, borderLeft: ins.id === 44 ? `3px solid ${COLORS.blue}` : ins.id === 42 ? `3px solid ${COLORS.accent}` : ins.id === 25 ? `3px solid ${COLORS.red}` : undefined }}>
              <div style={{ fontSize: 11, color: ins.id === 44 ? COLORS.blue : COLORS.accent, fontWeight: 700, minWidth: 28 }}>#{ins.id.toString().padStart(2,"0")}</div>
              <div>
                <div style={{ fontWeight: 600, color: ins.id === 44 ? COLORS.blue : ins.id === 42 ? COLORS.yellow : COLORS.textBright, marginBottom: 4, fontSize: 12 }}>{ins.title}</div>
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
        <span style={{ fontSize: 10, color: COLORS.textDim }}>JOURNAL v31 // SESSION 21 // {data.fund.account} // C DRIVE WRITE CONFIRMED</span>
        <div style={{ display: "flex", gap: 8 }}>
          <span className="badge badge-amber">EU ACCESS: APPROVED</span>
          <span className="badge badge-red">CONFLICT: ACTIVE</span>
          <span className="badge badge-red">SI-25: OIL MET — ALERT</span>
          <span className="badge badge-blue">SI-39 SECTION 0 ACTIVE</span>
          <span className="badge badge-blue">SI-44 TWO-STAGE ACTIVE</span>
          <span className="badge badge-blue">SI-45 WEEKLY SCREENER ACTIVE</span>
        </div>
      </div>
    </div>
  );
}
