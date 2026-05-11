import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "fund_journal_v2";

const INITIAL_STATE = {
  "lastUpdated": "2026-04-12",
  "fund": {
    "account": "U24936508",
    "netLiquidity": 99100,
    "cash": 32026,
    "availableFunds": 80900,
    "dailyPnL": 1312,
    "unrealizedPnL": 1636,
    "realizedPnL": -1307,
    "broker": "IBKR Pro",
    "baseCurrency": "USD",
    "location": "UAE",
    "ibkrEuropeanAccess": "APPROVED — March 26 2026",
    "cashUSD": 36288,
    "cashEUR": 370,
    "cashGBP": -3488,
    "cashBase": 32026,
    "lastUpdated": "2026-04-12 SESSION 15 — JOURNAL v20 FINAL",
    "note": "SESSION 15 FINAL — JOURNAL v20. Full rebuild from v17 base applying all v18/v19/v20 changes. Key changes: (1) SHLD fully closed Apr 10 — net +$115.86 (long $73.34 + short cover $72.846). (2) PLTR stopped Apr 9 @ $134.976 -$1,307. (3) MSFT + ISRG + ABVX added S13. (4) All GDrive refs purged — local filesystem MCP is sole memory system. (5) SI-32 session start protocol (filesystem-first). (6) SI-33 memory hierarchy added — token-efficient decision framework for what goes in RECAP vs LESSONS vs STATE vs JOURNAL. (7) SI-34 trade tracker protocol — XLSX updated on every executed trade. (8) AMZN stop upgraded to Stop Limit $222/$219. (9) ITM stop confirmed 65.95p (IBKR ground truth, not 60p as logged). (10) Cash confirmed $36,288 USD / $32,026 base (IBKR screenshot Apr 12). (11) 12 active watchlist entries added from target list documents. (12) ONDS elevated from MONITOR to active watchlist. (13) UPS trade logged — previously missed from closed trade history. (14) Claude_Fund_Trade_Tracker.xlsx added to project and Claude Date File — updated on trade execution."
  },
  "thesis": {
    "title": "ISLAMABAD TALKS IN PROGRESS — CEASEFIRE FRAGILE — HORMUZ UNRESOLVED — SAUDI INFRASTRUCTURE DAMAGED",
    "summary": "SESSION 12 UPDATE: TWO-WEEK CEASEFIRE CONFIRMED APR 7 8PM ET. Trump suspended attacks on Iran, Iran agreed to coordinate safe passage through Strait of Hormuz under Iranian Armed Forces management. Ceasefire came <2hrs before deadline. Iran claimed victory. Only 2 vessels transited Strait as of Apr 8 morning — 426 tankers still trapped. Shipping insurers say trade unlikely to resume immediately. IATA: jet fuel normalisation takes months, not weeks. Iran 10-point demands remain: US troop withdrawal from region, permanent war end, sanctions lifted, continued Iranian Hormuz control — all nonstarters for US negotiators. Islamabad talks scheduled Friday Apr 10 — Witkoff, Kushner, Vance attending. Israel continuing Lebanon operations (NOT included in ceasefire). New attacks in UAE, Kuwait reported hours after ceasefire. SI-25 EXIT TRIGGER NOT ACTIVATED — Iran retains military control of Strait, formal reopening with oil -10% from peak not yet confirmed. Oil: Brent ~3 (-13%), WTI ~4 (-16%) — biggest single-day oil drop since 1991 Gulf War. Still 0+ above pre-war levels. Thesis unchanged: structural positions hold. Tactical book: UPS live (fuel relief), UAL GTC pending. PLTR 5-session test Day 1 FAIL — monitor closely.",
    "oilWTI": 98,
    "oilBrent": 96,
    "goldPrice": 4450,
    "hormuzStatus": "CEASEFIRE DAY 5. Islamabad talks underway Apr 12 — both delegations on-site Serena Hotel. Modest goal: agree to continue talks. No breakthrough expected. Hormuz largely closed — Iran considering transit toll fees. Saudi Arabia -600k bpd production capacity + East-West Pipeline struck. EIA STEO: Brent peaks $115/b Q2 2026. Structural supply damage independent of diplomatic resolution.",
    "ceasefireFilter": "SI-25 NOT TRIGGERED. Oil ~12% below $111.54 peak (price condition borderline MET) BUT Hormuz not formally reopened (dual condition unmet). Saudi Arabia damage = supply shock structural beyond diplomatic resolution. EIA expects elevated prices through late 2026. Iran transit toll proposal if agreed = LNG non-Hormuz premium intact. Exit trigger unchanged: formal Hormuz reopening + oil -10% from peak. BOTH required simultaneously.",
    "keyDates": [
      {
        "date": "21 Apr",
        "event": "TACTICAL BOOK EXIT DEADLINE — UAL, UPS must be closed by this date regardless of P&L. Hard date, no extension.",
        "priority": "CRITICAL"
      },
      {
        "date": "10 Apr",
        "event": "ISLAMABAD TALKS — Witkoff, Kushner, Vance attending. Iran delegation invited. Key signal for ceasefire extension vs breakdown.",
        "priority": "CRITICAL"
      },
      {
        "date": "8 Apr",
        "event": "SESSION 12 — Ceasefire day 1. UPS filled 00.17. R3NK sold €56.01. RCL/CCL DAY orders expired. UAL GTC standing 2.08.",
        "priority": "RESOLVED"
      },
      {
        "date": "23 Apr",
        "event": "RR.L Ex-dividend — DO NOT SELL BEFORE THIS DATE",
        "priority": "HIGH"
      },
      {
        "date": "23 Apr",
        "event": "AMZN Q1 2026 Earnings — AWS growth and AI capex guidance key",
        "priority": "MEDIUM"
      },
      {
        "date": "30 Apr",
        "event": "NOG Q1 Earnings (watchlist)",
        "priority": "MONITOR"
      },
      {
        "date": "5 May",
        "event": "LDO.MI Q1 Earnings — first catalyst for position",
        "priority": "HIGH"
      },
      {
        "date": "5 May",
        "event": "HAG Q1 Earnings — Hensoldt, EU defence watchlist",
        "priority": "MEDIUM"
      },
      {
        "date": "6 May",
        "event": "R3NK Q1 Earnings — €200M deferred Q4 orders must appear. Critical.",
        "priority": "CRITICAL"
      },
      {
        "date": "7 May",
        "event": "AMPX Q1 Earnings",
        "priority": "MEDIUM"
      },
      {
        "date": "11 May",
        "event": "PLTR Q1 Earnings — Golden Dome + Maven POR = key catalyst",
        "priority": "CRITICAL"
      },
      {
        "date": "12 May",
        "event": "ALFEN Q1 Earnings — EU grid infrastructure watchlist",
        "priority": "MONITOR"
      },
      {
        "date": "12 May",
        "event": "SLDP Q1 Earnings",
        "priority": "MONITOR"
      },
      {
        "date": "13 May",
        "event": "VST + PDYN Earnings",
        "priority": "MEDIUM"
      },
      {
        "date": "18 May",
        "event": "ONDS Q1 Earnings — stopped out but monitoring sector",
        "priority": "MONITOR"
      },
      {
        "date": "23 Jun",
        "event": "AVAV Q1 Earnings",
        "priority": "HIGH"
      },
      {
        "date": "25 Jun",
        "event": "IAG.L Ex-dividend 4.33p — NO LONGER HELD, position closed S08",
        "priority": "RESOLVED"
      },
      {
        "date": "30 Jul",
        "event": "RR.L H1 Earnings",
        "priority": "HIGH"
      },
      {
        "date": "Post Apr 6",
        "event": "BTC ENTRY DISCUSSION — target $55K via IBKR Paxos. Watch Trump address reaction on crypto.",
        "priority": "HIGH"
      },
      {
        "date": "21 Apr",
        "event": "RTX Q1 2026 Earnings — first quantification of Iran war munitions depletion/replenishment pipeline. Key catalyst for RTX entry thesis. Guidance revision event.",
        "priority": "CRITICAL"
      },
      {
        "date": "16 Apr",
        "event": "NFLX Q1 2026 Earnings — WATCH ONLY. Not held. Monitor as sentiment read on streaming/consumer.",
        "priority": "MONITOR"
      },
      {
        "date": "21 Apr",
        "event": "ISRG Q1 2026 Earnings (confirmed, AMC) — KEY CATALYST for held position. Watch: China placements, da Vinci procedure vol, gross margin vs 67-68% guide, Ion attach rates.",
        "priority": "CRITICAL"
      },
      {
        "date": "30 Apr",
        "event": "MSFT Q3 FY2026 Earnings (AMC) — KEY CATALYST for held position. Watch: Azure growth %, Copilot commercial seat adds, guidance language on enterprise spend.",
        "priority": "CRITICAL"
      },
      {
        "date": "9 Apr",
        "event": "PLTR STOPPED OUT at $134.976. Loss -$1,307. 5-session test terminated Day 2. Reentry zone $120-130 on confirmed Golden Dome award or May 11 earnings catalyst.",
        "priority": "RESOLVED"
      }
    ]
  },
  "positions": [
    {
      "ticker": "CCJ",
      "name": "Cameco Corp",
      "shares": 49,
      "avgPrice": 104.021,
      "costBasis": 5097,
      "last": 113.76,
      "marketVal": 5574,
      "unrealPnL": 479,
      "unrealPct": 9.4,
      "stop": 108.37,
      "target": null,
      "status": "HOLD — STOP LIVE",
      "note": "Nuclear thesis structural — EU energy independence + global uranium supply. Stop RAISED 06.07→08.37 S12 IBKR confirmed. Above cost (04.021) — profit protected. CCJ +11.3% unrealized. Ceasefire does not reduce uranium demand thesis."
    },
    {
      "ticker": "AMZN",
      "name": "Amazon.com Inc",
      "shares": 30,
      "avgPrice": 201.204,
      "costBasis": 6036,
      "last": 227.45,
      "marketVal": 6824,
      "unrealPnL": 787,
      "unrealPct": 13,
      "stop": 222,
      "target": 300,
      "status": "HOLD",
      "note": "Stop upgraded to Stop Limit $222/$219 GTC (Apr 10, IBKR confirmed). Earnings Apr 23 AMC. AWS backlog $244B +40% YoY. Analyst consensus $295. Hold — tighten to $228/$224 ahead of Apr 23 if stock continues rising."
    },
    {
      "ticker": "VST",
      "name": "Vistra Corp",
      "shares": 53,
      "avgPrice": 150.569,
      "costBasis": 7980,
      "last": 159.81,
      "marketVal": 8470,
      "unrealPnL": 490,
      "unrealPct": 6.1,
      "stop": null,
      "target": null,
      "status": "HOLD",
      "note": "Energy/AI data centre power. Earnings May 13. Ceasefire lowers input cost pressures marginally — structural demand unchanged. Stop 45.02 GTC."
    },
    {
      "ticker": "RR",
      "name": "Rolls-Royce Holdings",
      "shares": 150,
      "avgPrice": 1182.9,
      "costBasis": 1774,
      "last": 1272.3,
      "marketVal": 1909,
      "unrealPnL": 134,
      "unrealPct": 7.6,
      "stop": null,
      "target": 1395,
      "status": "HOLD",
      "cur": "GBP",
      "note": "STAR PERFORMER S12: +10.13% (+115.80p). Defence engines + AUKUS + SMR thesis intact through ceasefire. Ex-div Apr 23 — DO NOT SELL. NO STOP BEFORE APR 23. Target 1395p. RR +6.4% unrealized from entry 1182.88p."
    },
    {
      "ticker": "ITM",
      "name": "ITM Power PLC",
      "shares": 3100,
      "avgPrice": 65.1,
      "costBasis": 2018,
      "last": 69.95,
      "marketVal": 2169,
      "unrealPnL": 152,
      "unrealPct": 7.5,
      "stop": 65.95,
      "target": 98,
      "status": "NEW — STOP LIVE",
      "cur": "GBP",
      "note": "Stop confirmed 65.95p (IBKR ground truth — raised above cost 65.1p to lock minor profit). EU hydrogen/energy independence. RWE 200MW delivery complete. EU H2 strategy revision Q2 2026 supportive. Target 98p."
    },
    {
      "ticker": "AMPX",
      "name": "Amprius Technologies",
      "shares": 168,
      "avgPrice": 18.106,
      "costBasis": 3042,
      "last": 16.79,
      "marketVal": 2821,
      "unrealPnL": -222,
      "unrealPct": -7.3,
      "stop": 13,
      "target": 32,
      "status": "STOP LIVE",
      "note": "Silicon anode battery/drone endurance thesis intact. Q1 earnings May 7. Stop 3.00 GTC + Limit 2 GTC both live. Ceasefire has no bearing on battery technology thesis."
    },
    {
      "ticker": "AVAV",
      "name": "AeroVironment Inc",
      "shares": 25,
      "avgPrice": 195.09,
      "costBasis": 4877,
      "last": 178.09,
      "marketVal": 4452,
      "unrealPnL": -426,
      "unrealPct": -8.7,
      "stop": 165,
      "target": 311,
      "status": "HOLD — STOP LIVE",
      "note": "Switchblade drone demand structural — Israel/NATO/regional partners ongoing regardless of US ceasefire. Stop 65.00 GTC. Thesis unbroken. Jun 23 Q1 earnings."
    },
    {
      "ticker": "PDYN",
      "name": "Palladyne AI Corp",
      "shares": 500,
      "avgPrice": 6.595,
      "costBasis": 3298,
      "last": 6.38,
      "marketVal": 3190,
      "unrealPnL": -77,
      "unrealPct": -2.4,
      "stop": 5.75,
      "target": null,
      "status": "HOLD — STOP LIVE",
      "note": "SwarmOS AI autonomy. Stop .75 GTC. May 13 earnings. Non-correlated to ceasefire."
    },
    {
      "ticker": "CODA",
      "name": "Coda Octopus Group",
      "shares": 416,
      "avgPrice": 12.005,
      "costBasis": 4994,
      "last": 12.17,
      "marketVal": 5063,
      "unrealPnL": 44,
      "unrealPct": 0.9,
      "stop": 10.49,
      "target": 22,
      "status": "STOP LIVE",
      "note": "Underwater defence sensors / maritime surveillance. Stop 0.49 GTC. Monitor — tightest stop in book at 10.3% gap."
    },
    {
      "ticker": "ABVX",
      "name": "Abivax SA-ADR",
      "shares": 44,
      "avgPrice": 117.913,
      "costBasis": 5188,
      "last": 124.2,
      "marketVal": 5465,
      "unrealPnL": 276,
      "unrealPct": 5.3,
      "stop": 100,
      "target": null,
      "status": "HOLD — STOP LIVE $100 GTC",
      "note": "M&A speculative. AstraZeneca exclusivity expired Mar 23. Q2 Phase 3 maintenance data binary. Morgan Stanley 45, BTIG 50 targets. Stop 00 GTC. Non-correlated to ceasefire."
    },
    {
      "ticker": "ISRG",
      "name": "Intuitive Surgical Inc",
      "shares": 22,
      "avgPrice": 459.2,
      "costBasis": 10103,
      "last": 454,
      "marketVal": 9988,
      "unrealPnL": -112,
      "unrealPct": -1.1,
      "stop": 420,
      "target": 510,
      "status": "NEW — STOP $420 GTC",
      "note": "S13 FILLED at $459.20 (market, Apr 9). Stop $420 GTC confirmed. Below entry -1.1%. Q1 2026 earnings Apr 21 AMC (confirmed). Thesis: oversold near 52wk low, RSI oversold on entry, da Vinci procedure growth 13-15% guided, Ion/SP adoption accelerating. Watch: China placements, gross margin vs 67-68%, procedure vol beat."
    },
    {
      "ticker": "MSFT",
      "name": "Microsoft Corp",
      "shares": 25,
      "avgPrice": 372.73,
      "costBasis": 9318,
      "last": 367.46,
      "marketVal": 9187,
      "unrealPnL": -132,
      "unrealPct": -1.4,
      "stop": 350,
      "target": 400,
      "status": "NEW — STOP $350 GTC",
      "note": "S13 FILLED at $372.73 (market, Apr 9). Stop $350 GTC confirmed. Below entry -1.4%. Q3 FY2026 earnings Apr 30 AMC. Thesis: Azure growth cycle + Copilot monetisation + tech rotation recovery. Watch: Azure % growth, Copilot seat adds, guidance language."
    }
  ],
  "pendingOrders": [
    {
      "ticker": "ITM",
      "action": "SELL",
      "type": "Stop",
      "qty": 3100,
      "limitPrice": null,
      "stopPrice": 65.95,
      "tif": "GTC",
      "status": "ACTIVE",
      "note": "IBKR confirmed 65.95p (not 60p). Raised above cost 65.1p — locks minor profit if stopped. IBKR ground truth."
    },
    {
      "ticker": "CCJ",
      "action": "SELL",
      "type": "Stop",
      "qty": 49,
      "limitPrice": null,
      "stopPrice": 108.37,
      "tif": "GTC",
      "status": "ACTIVE",
      "note": "SESSION 12 IBKR CONFIRMED: Stop RAISED 06.07→08.37. Above cost (04.021). Profit-locked."
    },
    {
      "ticker": "PDYN",
      "action": "SELL",
      "type": "Stop",
      "qty": 500,
      "limitPrice": null,
      "stopPrice": 5.75,
      "tif": "GTC",
      "status": "ACTIVE",
      "note": "SESSION 10 CONFIRMED IBKR: Stop TIGHTENED $5.00→$5.75. Max loss now ~$411 vs ~$797. Adequate room above $5.75 support."
    },
    {
      "ticker": "AVAV",
      "action": "SELL",
      "type": "Stop",
      "qty": 25,
      "limitPrice": null,
      "stopPrice": 165,
      "tif": "GTC",
      "status": "ACTIVE",
      "note": "Protective stop."
    },
    {
      "ticker": "AMPX",
      "action": "SELL",
      "type": "Stop",
      "qty": 168,
      "limitPrice": null,
      "stopPrice": 13,
      "tif": "GTC",
      "status": "ACTIVE",
      "note": "Stop adjusted $14→$13.00 — wider buffer. Limit $32 GTC also live."
    },
    {
      "ticker": "AMPX",
      "action": "SELL",
      "type": "Limit",
      "qty": 168,
      "limitPrice": 32,
      "stopPrice": null,
      "tif": "GTC",
      "status": "ACTIVE",
      "note": "Profit target."
    },
    {
      "ticker": "CODA",
      "action": "SELL",
      "type": "Stop",
      "qty": 416,
      "limitPrice": null,
      "stopPrice": 10.49,
      "tif": "GTC",
      "status": "ACTIVE",
      "note": "SESSION 10 CONFIRMED IBKR: Stop TIGHTENED $9.50→$10.49. Tighter loss cap on -1% position. Below $11 warning level."
    },
    {
      "ticker": "VST",
      "action": "SELL",
      "type": "Stop",
      "qty": 53,
      "limitPrice": null,
      "stopPrice": 145.02,
      "tif": "GTC",
      "status": "ACTIVE",
      "note": "Stop lowered 148.00→145.02 (user confirmed S11) — wider buffer through Iran deadline volatility. Cost $150.57. Stop below cost — accepts small defined loss for thesis room."
    },
    {
      "ticker": "AMZN",
      "action": "SELL",
      "type": "Stop Limit",
      "qty": 30,
      "limitPrice": 219,
      "stopPrice": 222,
      "tif": "GTC",
      "status": "ACTIVE",
      "note": "UPGRADED Apr 10: Stop Limit trigger $222 / limit $219 GTC (IBKR confirmed). Protects majority of +18.4% gain."
    },
    {
      "ticker": "ABVX",
      "action": "SELL",
      "type": "Stop",
      "qty": 44,
      "limitPrice": null,
      "stopPrice": 100,
      "tif": "GTC",
      "status": "ACTIVE",
      "note": "SESSION 11 CONFIRMED IBKR: Stop $100 GTC live. Protects M&A speculative position. $100 is above pre-deal-rumour range — triggers only on full thesis collapse. Max loss from entry ~$788."
    },
    {
      "ticker": "ISRG",
      "action": "SELL",
      "type": "Stop",
      "qty": 22,
      "limitPrice": null,
      "stopPrice": 420,
      "tif": "GTC",
      "status": "ACTIVE",
      "note": "S13: Protective stop. $420 = 9.1% below ~$462 entry. Max loss ~$924 on position. Below 52wk low support ($425) — below that level thesis fully broken."
    },
    {
      "ticker": "MSFT",
      "action": "SELL",
      "type": "Stop",
      "qty": 25,
      "limitPrice": null,
      "stopPrice": 350,
      "tif": "GTC",
      "status": "ACTIVE",
      "note": "S13: Stop $350 GTC CONFIRMED (corrected from DAY). Protects against >6.5% decline from entry."
    }
  ],
  "standingInstructions": [
    {
      "id": 1,
      "title": "Price Verification — MANDATORY",
      "body": "NEVER quote a stock price from a search snippet without checking the source publication date. Use Massive Market Data or IBKR for every price recommendation. State the verified price and timestamp explicitly. If fetch fails, state 'unverified — check IBKR before acting'."
    },
    {
      "id": 2,
      "title": "Analyst Data Verification",
      "body": "Before citing analyst targets or ratings, verify the note date. A target listed as 'recent' may be months old. Never construct a bullish narrative from a sequence of data points without confirming each is current."
    },
    {
      "id": 3,
      "title": "State Tracking — No Repetition",
      "body": "Before adding any item to pending orders or watchlist, check whether it already appears in the current session. IAG CLOSED S08 — never list as position again. ITM ENTERED S08 — track as live position."
    },
    {
      "id": 4,
      "title": "Evidence Matching",
      "body": "The conclusion must match the evidence cited. If consensus target equals current price, do not describe as 'asymmetric'. If data is mixed, present it as mixed. No promotional language."
    },
    {
      "id": 5,
      "title": "Iran Ceasefire Filter — EVOLVED",
      "body": "EVOLVED S08: No longer filtering for ceasefire vs no ceasefire. Trump withdrawing regardless. New filter: speed and terms of Hormuz reopening under toll regime. Watch for formal toll structure, preferential access nations, insurance/shipping normalisation, Israel independent ops."
    },
    {
      "id": 6,
      "title": "Dilution Flagging",
      "body": "Every new recommendation must check: recent share offerings, insider selling past 90 days, FCF status, dilution %. Flag prominently before recommending."
    },
    {
      "id": 7,
      "title": "10-Min Pre-Open Rule",
      "body": "Place Iran-sensitive orders within 10 minutes of US open (5:30PM UAE). European markets: 12:00-19:30 UAE."
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
      "body": "UEC EXITED Session 07 @ $13.16. LEU is the sole nuclear expression. RESOLVED."
    },
    {
      "id": 12,
      "title": "PDYN Stop Flag — RESOLVED",
      "body": "PDYN stop $5.00 GTC LIVE. RESOLVED."
    },
    {
      "id": 13,
      "title": "ASTS Watchlist Scan",
      "body": "Every full scan MUST check ASTS: BlueBird launches, 45-satellite milestone, commercial service, MNO partners, dilution, insider activity, price. DO NOT enter above $95."
    },
    {
      "id": 14,
      "title": "Full Scan Checklist — MANDATORY AT SESSION START",
      "body": "FULL SCAN EXECUTION — v2.0. Trigger phrases: 'full scan', 'FULL SCAN', 'morning scan', 'run scan'. EXECUTION: Read fullScanProtocol.sections[] in INITIAL_STATE. Execute each section A through K in strict sequence using the tool routing, queries, and output format defined in each section object. Do NOT improvise query wording. Do NOT skip sections. Section A always requires user IBKR screenshot. Section K mandatoryQuery (AI model search) fires FIRST before other K sectors. si26SectorMap.sectors provides all sector data for Section K. preOpenProtocol defines the 16:30 UAE daily lightweight check (NOT a full scan — 5 steps only). SUMMARY: user says 'full scan' + provides IBKR screenshots = complete execution with no further instruction required."
    },
    {
      "id": 15,
      "title": "Small Cap Rerating + Stock Watching Criteria",
      "body": "FULL SCAN SECTION G — applies to speculative basket, EU energy basket, and ongoing rerating sweep. STOCK WATCHING CRITERIA: (1) CONTRACT/CUSTOMER WIN. (2) TECHNOLOGY VALIDATION. (3) ANALYST INITIATION/UPGRADE. (4) INSIDER BUYING. (5) EARNINGS INFLECTION. (6) SHORT SQUEEZE SETUP. (7) SECTOR CATALYST. ENTRY: pullback on broad weakness, volume drying at support, insider buying at lows. EXIT: thesis-break, competitor superior tech, partner abandons, management failure."
    },
    {
      "id": 16,
      "title": "IAG Peace Dividend — CLOSED",
      "body": "IAG.L CLOSED SESSION 08. Bought 355.18p, sold 370p (limit 365p filled at 370p). Profit ~£326. Trade lasted 5 days. Thesis correctly identified as broken under revised Hormuz toll regime scenario. Tactical 1-week exit bracket worked perfectly. SI RESOLVED."
    },
    {
      "id": 17,
      "title": "CLAUDE ERROR REDUCTION — LESSONS LEARNED",
      "body": "RECURRING ERRORS TO ELIMINATE: (1) TIMEZONE ERRORS — always verify date/time before stating days-to-catalyst. (2) STALE POSITION DATA. (3) PRICE VERIFICATION (SI-27 — MMD primary, Yahoo/Investing.com/FT.com for EU/UK). (4) JOURNAL STATE TRACKING. (5) MARKET TIMING SEQUENCE. (6) DIVIDEND CAPTURE — verify ex-div on IBKR. (7) LONG SESSION DISCIPLINE. (8) Always cross-reference prices via MMD or IBKR before recommendations. SESSION 11: Stale GuruFocus price on 4DS (€7 vs actual €25.5) — eliminated by SI-27 enforcement. Date error (2 weeks vs 5 weeks to PLTR earnings) — enforce date verification on every catalyst reference."
    },
    {
      "id": 18,
      "title": "SLDP Research Report — Completed Mar 30 2026",
      "body": "Deep fundamental analysis completed. Entry: $2.20-2.50. Stop $1.80. Max $500-$1,000. WATCH — DO NOT BUY until decline stabilises."
    },
    {
      "id": 19,
      "title": "STOPPED OUT / CLOSED POSITIONS — REALIZED TRACKING",
      "body": "STOPPED OUT / CLOSED POSITIONS — REALIZED TRACKING: ONDS: 250 shares stopped $8.50 Mar 30. Loss ~$601. KTOS: 100 shares stopped $65 Mar 30. Loss ~$1,601. CCL: 240 shares sold Mar 26. Profit +$122. UEC: 206 shares sold Mar 31 @ $13.16. Loss ~$127. IAG.L: 2200 shares sold Apr 1 @ 370p. Profit ~£326 (~$410). RCL: 36 shares stopped Apr 2 @ $269.91. Loss ~$132. LDO.MI: 17 shares stop limit Apr 7 @ €59.56. Profit +€21.52 (+$23). LEU: 13 shares stopped Apr 7 at open @ $170.54. Loss ~$238. Total net realized since inception: ~$2,144 net loss (all USD equiv). Capital preserved — losses contained, thesis positions protected."
    },
    {
      "id": 20,
      "title": "BTC Position — Entry Rules",
      "body": "BTC PLANNED MATERIAL POSITION (5-7.5% portfolio). Vehicle: IBKR Paxos spot BTC (preferred over IBIT). Entry target $55K. Stop $48K. First target $100K. Second target $120K. NO ORDER PLACED. Watch Trump address reaction. If BTC rallies above $70K on withdrawal, $55K may not fill — reassess floor."
    },
    {
      "id": 21,
      "title": "ITM Power — Entry Rules",
      "body": "ENTERED SESSION 08 @ 64.8-65p. 3100 shares. Cost £2,018. Stop 55p GTC LIVE (recommend lowering to 50p). Breakout management: above 70p on volume → raise stop to 58p. Above 85p → raise stop to 70p. Target 1: 98p. Target 2: 130p. Thesis: EU energy independence, green hydrogen demand structural post-Hormuz."
    },
    {
      "id": 22,
      "title": "EU Energy Basket — Watchlist",
      "body": "Session 08 created EU energy breakout basket for stocks benefiting from EU grid diversification and energy independence. Priority order: (1) CWR.L Ceres Power — entry 250-270p on pullback to 200-day MA, momentum trap at current 310p. (2) ITM.L ITM Power — ENTERED S08. (3) AFC.L AFC Energy — moonshot £500 max, weak cash. (4) H2O.DE Enapter AG — AEM electrolysers, research next session. (5) IKA.L Ilika — solid-state batteries, moonshot £500 max. (6) ALFEN.AS Alfen NV — smart grids/storage, research next session. (7) YCA.L Yellow Cake — uranium price exposure, entry 500-520p on pullback only. (8) COST.L Costain — nuclear infrastructure, P/E ~8x, research deeper. (9) ASY.PA Assystem — EU nuclear engineering, under-covered, research deeper."
    },
    {
      "id": 23,
      "title": "Supply Chain Disruption Plays — Watchlist",
      "body": "Hormuz toll regime = fertiliser planting damage already done. North American producers benefit. CF Industries (CF) — entry $115-120 on ceasefire pullback. NTR Nutrien — entry $70-73 on pullback. Both face DOJ antitrust inquiry risk. LIN Linde — WATCH ONLY, helium thesis depends on closure duration not toll regime. VLO Valero — REMOVED, above Goldman target."
    },
    {
      "id": 24,
      "title": "Cash Preservation — 10% Floor (REVISED S12)",
      "body": "Minimum cash reserve: 10% of net liquidity at time of deployment decision. Flag any session where base cash falls or is projected to fall below 10% threshold post-deployment. REVISED S12 April 8 2026 from original 25% — changed to 10% percentage-based (not flat dollar) so floor scales correctly with fund growth. At 8.9K net liquidity, floor = ,890. Deployable capital above floor = ~4,900 (after current positions). Priority entries on pullback: KTOS reentry 2-67, RTX entry 95-200, R3NK reentry €46-49."
    },
    {
      "id": 25,
      "title": "DAILY ENTRY MONITORING — WATCHLIST ENTRY RECOMMENDATION PROTOCOL",
      "body": "STANDING INSTRUCTION — Active from Session 11 onwards. At every session open, BEFORE any other analysis, run the Entry Readiness Scan across all 19 watchlist names using this checklist per position: (1) PRICE CHECK: MMD verify current price vs stated entry zone — is it at or below target entry? (2) MACRO CHECK: Has Tuesday resolved? Which scenario played out? Does the macro still support the thesis for this name? (3) NEWS CHECK: Web search for company-specific news in past 48hrs — any adverse earnings preannouncements, regulatory issues, insider selling acceleration, or thesis-breaking events? (4) TREND CHECK: Is price trending toward entry zone (positive) or away from it (negative)? (5) CASH CHECK: Current USD cash balance — can this position be funded without breaching 15% minimum cash reserve? DECISION OUTPUT FORMAT — for each name assessed: STATE ticker, current price, entry zone, separation%, verdict (ENTER NOW / APPROACHING / HOLD / DETERIORATING / REMOVE). If ENTER NOW: state exact position size, stop, and order type. If APPROACHING: state the trigger price that changes verdict to ENTER. Priority order for cash deployment when multiple names ready simultaneously: (A) Highest annualised return; (B) Lowest Tuesday binary exposure; (C) Strongest macro tailwind in past 48hrs. NEVER make an entry recommendation without: (a) MMD-verified current price, (b) macro news check, (c) explicit cash availability confirmation."
    },
    {
      "id": 31,
      "title": "ENTRY READINESS BASELINE — SESSION 10 (ARCHIVED, SEE SI-25)",
      "body": "ENTRY READINESS BASELINE — Updated SESSION 11. 13 live positions (LDO closed +profit, LEU stopped -$238, ABVX added). PLTR 5-session test active (must close >$152 by Apr 14 or assess exit). RTX added as Tranche 2 priority entry: $198.41 current, target $225-240, stop $183, $3,500 fresh capital. EU/UK Power Basket formalised — 12 names, see SI-29. Cash USD ~$41,833. Minimum 15% reserve maintained. Tonight's deadline (Apr 7 8PM ET) — no new entries until tomorrow's post-deadline clarity established."
    },
    {
      "id": 27,
      "title": "PRICE & NEWS SOURCE HIERARCHY — FINAL (EODHD INTEGRATED)",
      "body": "REVISED S13 FINAL — EODHD connector added. Full hierarchy:\n\nPRICE VERIFICATION HIERARCHY (strict priority order):\n(1) EODHD MCP — PRIMARY for ALL equities when tools active. 60+ exchanges, 120K+ tickers. Ticker format: SYMBOL.EXCHANGE (RR.LSE, ITM.LSE, LDO.MI, R3NK.XETRA, AAPL.US). Tools: get_historical_stock_prices, get_live_stock_prices, get_fundamentals_data, get_insider_transactions, get_earnings_data, get_options_data. NOTE: verify LSE coverage on first use — requires All World subscription.\n(2) MMD Massive Market Data — US equities backup when EODHD rate-limited or unavailable. Endpoint: /v2/aggs/ticker/{ticker}/prev. Rate limit ~6 calls. Does NOT cover EU/UK.\n(3) IBKR screenshots — GROUND TRUTH. Overrides ALL other sources without exception.\n(4) Yahoo Finance — EU/UK fallback ONLY when EODHD unavailable. web_fetch finance.yahoo.com quote page. Always note \"Yahoo Finance [date]\".\n(5) Reuters (reuters.com) — breaking market/macro news primary source.\n(6) FT.com — EU corporate intelligence, sector depth. web_fetch for specific articles.\n(7) Investing.com — EU pricing tertiary fallback.\n\nNEWS HIERARCHY (Section B and K):\nPrimary: Reuters + FT.com | Secondary: Yahoo Finance news + EODHD get_company_news | Tertiary: web_search\n\nEU/UK NAMES PROTOCOL:\nFirst call: EODHD get_historical_stock_prices with SYMBOL.EXCHANGE format.\nIf EODHD unavailable: Yahoo Finance web_fetch.\nUK regulatory announcements: LSE RNS (londonstockexchange.com/rns) — often 1-2hrs ahead of Yahoo.\n\nEODHD ADDITIONAL DATA ENABLED:\n- Fundamentals: get_fundamentals_data({ticker}) — P/E, EPS, revenue, margins. Use for ISRG (P/E 57x check), MSFT (Azure metrics context), ABVX (revenue trajectory for M&A thesis).\n- Insider transactions: get_insider_transactions({ticker}) — replaces SEC EDGAR Form 4 web scraping in Section C.\n- Options: get_options_data({ticker}) — pre-earnings positioning for ISRG Apr 21, MSFT Apr 30, AMZN Apr 23.\n- Earnings calendar: get_earnings_data({ticker}) — auto-confirm upcoming earnings dates.\n\nPROHIBITED sources (unchanged): GuruFocus, PitchBook, Macroaxis — known EU small-cap data latency."
    },
    {
      "id": 28,
      "title": "JOURNAL UPDATE PROTOCOL — END OF SESSION ONLY",
      "body": "JOURNAL UPDATE PROTOCOL — END OF SESSION ONLY (v20 FINAL). At session close when instructed:\n(1) Rebuild journal using bracket-depth counting (Node.js). Never use regex or str_replace on INITIAL_STATE.\n(2) filesystem:write_file → FUND_SESSION_STATE.md (positions, thesis, cash, stops, deployment plan).\n(3) filesystem:write_file → LESSONS_LEARNED.md if new errors or protocol changes occurred.\n(4) If SESSION_RECAP.md exists → verify it has been integrated into journal, then DELETE it.\n(5) If a trade was executed this session → update Claude_Fund_Trade_Tracker.xlsx in project AND Claude Date File. Add one row per executed trade. Do not rebuild the entire file — append only.\n(6) present_files for journal download.\n(7) Confirm: 'Journal v[N] complete. Files updated. [N] positions, [N] orders.'\nDO NOT propose journal updates mid-session. DO NOT reference or use Google Drive."
    },
    {
      "id": 29,
      "title": "EU/UK POWER THESIS BASKET — PERMANENT SCAN SECTION",
      "body": "EU/UK Power Thesis Basket is a permanent full scan section complementing the nuclear thesis. These are grid diversification plays — alternative energy, storage, electrolysers, geothermal, cables, smart grid. At every full scan: check price vs entry zone (MMD or Yahoo/IBKR per SI-27), contract wins, EU/UK policy funding, earnings, dilution/cash runway, technology validation. ALL positions in this basket capped at MOONSHOT sizing (max £500-£1,500) unless reclassified to core thesis via SI-15 signals. BASKET NAMES: (1) ITM.L — LIVE POSITION (entry 64.8-65p, stop 55p). (2) CWR.L Ceres Power — 336p ABOVE ZONE, watch pullback 280-300p, max £750-1,000. (3) AFC.L AFC Energy — 10.36p IN ZONE, verify cash runway before entry, max £500. (4) H2O.DE Enapter AG — €1.295 IN ZONE €1.20-1.60, max €500, stop €0.90. (5) IES.L Invinity Energy — 16.85p HOLD OFF (revenue risk), entry 14-15p or contract win, max £500. (6) 4DS.DE Daldrup Söhne — €25.5 confirmed, entry zone €23-24.50, stop €20, max €1,000-1,500. (7) PRY.MI Prysmian SpA — ~€92-98, entry €85-92 on pullback, max £2,000-3,000, earnings Apr 29. (8) ALFEN.AS Alfen NV — price unverified, research next session, max £1,500. (9) SSE.L SSE PLC — price unverified, research next session, max £2,000-3,000. (10) SPIE.PA SPIE SA — price unverified, research next session, max £1,000-1,500. (11) NEL.OL Nel ASA — price unverified, research next session, max £500-1,000. (12) UKW.L Greencoat UK Wind — price unverified, income play, any pullback, max £1,000-2,000."
    },
    {
      "id": 30,
      "title": "TACTICAL CEASEFIRE BOOK — EXIT PROTOCOL (S12)",
      "body": "TACTICAL BOOK — RESOLVED S14. UPS position: filled Apr 8 and closed same day -$30.61 (logged in trade tracker). UAL GTC order: never filled — cancelled. Hard exit deadline Apr 21 — no tactical positions remain open. SI-30 archived. New ceasefire tactical plays require fresh assessment post-Islamabad."
    },
    {
      "id": 26,
      "title": "SECTOR THREAT MONITOR — MANDATORY FULL SCAN SECTION (K)",
      "body": "ADDED S13 — TRIGGERED BY MYTHOS MISS (Anthropic model caused PLTR -7%, MSFT sector drag undetected in morning scan).\n\nINSTRUCTION: At every full scan, run ONE targeted web search per active sector below. Flag any item scoring RED. This is SI-14 Section K. Run AFTER Section J (errors check) as the final scan layer.\n\nSECTOR MAP — LIVE POSITIONS ONLY. Update when positions change.\n\n▌ SECTOR 1: DEFENCE & AEROSPACE [AVAV, SHLD, RR]\n  ETF Canary: ITA (US), SHLD itself | EU: check EUAD/EXV1.DE\n  Threat categories: (1) Peace dividend — ceasefire/withdrawal announcement causing defence selloff. (2) Contract loss — competitor wins programme AVAV/RR bidding. (3) Export restriction — new ITAR/EAR controls on drone exports. (4) Budget cut — US DoD or EU defence budget revision downward.\n  Search query: \"defence contract award drone [AVAV OR Kratos OR Textron] OR Rolls-Royce contract OR NATO budget cut\"\n  Red flags: ITA premarket -2%+, US defence budget headline, AVAV/RR competitor contract win, Israeli-Lebanese ceasefire expansion reducing drone demand signal.\n\n▌ SECTOR 2: NUCLEAR & URANIUM [CCJ, RR-SMR]\n  ETF Canary: URA (Global X Uranium ETF)\n  Threat categories: (1) Reactor incident — any nuclear safety event globally triggers sentiment selloff. (2) Policy reversal — EU/US nuclear ban movement, Germany U-turn. (3) Uranium supply surprise — Kazatomprom output increase or SPR release. (4) SMR cancellation — RR SMR programme regulatory/funding setback.\n  Search query: \"uranium spot price OR nuclear reactor incident OR SMR programme UK OR Cameco contract\"\n  Red flags: URA -3%+ premarket, any reactor incident news, EU nuclear policy change, Kazatomprom production beat.\n\n▌ SECTOR 3: AI / ENTERPRISE CLOUD / AUTONOMOUS SYSTEMS [MSFT, AMZN, PDYN]\n  ETF Canary: IGV (iShares Expanded Tech-Software ETF)\n  Threat categories: (1) Frontier model release — Anthropic, OpenAI, Google, Meta announce capability step-jump in software/agentic tasks (REPEAT OF MYTHOS ERROR). (2) Short seller thesis — public short report on held AI name. (3) Enterprise spend signal — hyperscaler capex cut or cloud growth decel commentary. (4) Regulatory action — DOJ/FTC antitrust move on MSFT or AMZN. (5) AWS/Azure market share shift data.\n  Search queries: (a) \"AI model announcement Anthropic OR OpenAI OR Google OR Meta\" (b) \"[MSFT OR AMZN OR PDYN] short seller OR analyst downgrade\" (c) \"cloud spending enterprise 2026\"\n  Red flags: IGV premarket -1.5%+, ANY frontier model benchmark announcement, Burry/Einhorn/Hindenburg public post on held name, hyperscaler capex commentary.\n  NOTE: This search is NON-NEGOTIABLE after Mythos miss. Run (a) every session regardless of other news volume.\n\n▌ SECTOR 4: MEDICAL ROBOTICS & DEVICES [ISRG]\n  ETF Canary: IHI (iShares US Medical Devices ETF)\n  Threat categories: (1) Competitor approval — Medtronic Hugo, Chinese domestic surgical robot FDA/NMPA clearance. (2) FDA warning letter or recall on ISRG products. (3) Hospital capex freeze — macro signal that surgical volumes will decline. (4) China pricing pressure — NMPA tender results showing ASP compression.\n  Search query: \"surgical robot competitor approval OR Medtronic Hugo clearance OR ISRG FDA OR da Vinci China tender\"\n  Red flags: IHI -2%+ premarket, any new surgical robot approval, China hospital tender results, CMS reimbursement change for robotic procedures.\n\n▌ SECTOR 5: BIOTECH / PHARMA [ABVX]\n  ETF Canary: XBI (SPDR S&P Biotech ETF)\n  Threat categories: (1) Competitor drug approval in IBD/UC space (AbbVie, Pfizer, Roche). (2) Phase 3 trial failure for ANY IBD drug — sector sentiment contagion. (3) AstraZeneca M&A activity (ABVX M&A thesis depends on AZ exclusivity expiry). (4) FDA guidance change on IBD endpoints.\n  Search query: \"ulcerative colitis drug approval 2026 OR IBD Phase 3 trial OR Abivax Phase 3 OR AstraZeneca acquisition biotech\"\n  Red flags: XBI -3%+ premarket, any competing UC approval, AstraZeneca M&A announcement not involving ABVX, FDA guidance update on IBD.\n\n▌ SECTOR 6: ADVANCED BATTERY & DRONE ENDURANCE [AMPX]\n  ETF Canary: No direct ETF — monitor DRIV (autonomous/EV adjacent)\n  Threat categories: (1) Competitor silicon anode breakthrough — QuantumScape, SES AI, Solid Power announce significant energy density milestone. (2) DoD drone battery contract award to competitor. (3) Dilution — AMPX new equity offering (cash burn risk). (4) Customer loss — Airbus or drone manufacturer switches battery supplier.\n  Search query: \"silicon anode battery breakthrough OR drone endurance battery DoD contract OR Amprius Technologies news\"\n  Red flags: Any silicon anode peer >20% energy density improvement announced, DoD battery contract to non-AMPX supplier, AMPX S-3 filing.\n\n▌ SECTOR 7: MARITIME DEFENCE & SENSORS [CODA]\n  ETF Canary: None — manual monitoring only\n  Threat categories: (1) Contract loss — competing sonar/sensor system wins major navy contract in CODA's space. (2) Budget reallocation — US/NATO maritime budget cut. (3) M&A — larger player (Thales, Leonardo, Sonardyne) acquires CODA competitor, improving competitive position against CODA.\n  Search query: \"underwater defence sensor contract 2026 OR maritime surveillance navy OR Coda Octopus contract\"\n  Red flags: Any Thales/Sonardyne/Kongsberg contract announcement in CODA's product space, US Navy MCM budget cut, CODA insider selling.\n\n▌ SECTOR 8: POWER / ENERGY INFRASTRUCTURE [VST]\n  ETF Canary: XLU (SPDR Utilities Select ETF)\n  Threat categories: (1) AI data centre capex pause — any hyperscaler announcement reducing power purchase agreements. (2) ERCOT/Texas grid regulatory action against Vistra. (3) Natural gas price spike — input cost pressure on gas-peaking margins. (4) Interest rate spike — utilities are rate-sensitive, Fed hawkish surprise.\n  Search query: \"AI data centre power demand 2026 OR ERCOT Texas grid OR Vistra Energy contract OR natural gas price spike\"\n  Red flags: XLU -2%+ premarket, hyperscaler PPA cancellation, ERCOT capacity market ruling, Fed surprise rate move.\n\n▌ SECTOR 9: EU HYDROGEN / CLEAN ENERGY [ITM]\n  ETF Canary: No liquid ETF — monitor HYDR or sector manually\n  Threat categories: (1) EU green hydrogen subsidy cut or RePowerEU policy reversal. (2) Competitor electrolyser capacity ramp (Nel ASA, Enapter, ThyssenKrupp nucera) winning ITM's pipeline contracts. (3) ITM equity raise / cash runway concern — loss-making, dependent on project finance. (4) German/UK hydrogen demand collapse.\n  Search query: \"EU green hydrogen policy 2026 OR electrolyser contract OR ITM Power OR Nel ASA order\"\n  Red flags: EU state aid decision against hydrogen subsidies, Nel/Enapter major order announcement in ITM's addressable market, UK government hydrogen budget cut.\n\nEXECUTION RULES:\n(1) Run ONE search per sector per session — use the stated query verbatim. Do not skip sectors.\n(2) If ANY red flag condition is detected: STOP and flag BEFORE proceeding to portfolio position analysis.\n(3) ETF canary check: if canary ETF is down 1.5%+ premarket, flag immediately — do not wait for individual stock check.\n(4) Sector 3 (AI/Cloud) query (a) is MANDATORY EVERY SESSION regardless of other workload. Non-negotiable after Mythos miss.\n(5) Update sector map when positions are added or removed. New position = add sector scan immediately.\n(6) Pre-open reinforcement (16:30 UAE / 60 min before NYSE open): Re-run Sector 3(a) AI model search and check IGV premarket. This is the minimum pre-open check for all sessions."
    },
    {
      "id": 33,
      "title": "MEMORY HIERARCHY — TOKEN EFFICIENCY DECISION FRAMEWORK",
      "body": "PURPOSE: Retain core knowledge across sessions without wasting context window on redundant data. Every piece of information belongs in exactly ONE place. Use this decision tree:\n\n▌ SESSION_RECAP.md (TEMPORARY — deleted after integration)\nUse for: Changes that happened AFTER the last journal build that need to survive to the next session.\nExamples: stop price corrected mid-session, exact fill price confirmed, cash balance updated, order status change.\nNOT for: Permanent lessons, strategic decisions, thesis changes.\nLifecycle: Created at session close if journal not rebuilt → read at next session open → integrated into journal → DELETED.\nSize target: Under 2KB. If growing larger, it should be a journal rebuild instead.\n\n▌ LESSONS_LEARNED.md (PERMANENT — updated sparingly)\nUse for: Codified errors (E-series), strategic thesis lessons (T-series), position lessons (P-series), scan lessons (S-series), infrastructure lessons (I-series).\nNOT for: Current prices, open positions, pending orders, deployment plans.\nUpdate trigger: A genuinely new error type is encountered, a thesis insight changes strategy permanently, or a new infrastructure pattern is established.\nSize target: Stable. Only grows when a NEW lesson type is identified — not every session.\n\n▌ FUND_SESSION_STATE.md (DYNAMIC — updated every session close)\nUse for: Current positions with live prices, active orders, cash, deployment framework, key dates, thesis status, weekend watchlist.\nNOT for: Historical closed trades, error definitions, SI rules.\nUpdate: Always written at session close. This is the primary cross-session continuity file.\n\n▌ trading_journal[N].jsx (STRUCTURAL — rebuilt when significant changes accumulate)\nUse for: All Standing Instructions (SI rules), full watchlist, sector map, scan protocol definitions, position data (as secondary to IBKR).\nRebuild trigger: 3+ position changes OR new SI additions OR thesis restructure. NOT for small price corrections.\nToken cost: Highest — rebuild only when necessary.\n\n▌ Claude_Fund_Trade_Tracker.xlsx (TRADE HISTORY — append only)\nUse for: Every executed trade. One row per fill. Entry date, exit date, ticker, qty, entry price, exit price, P&L USD, running balance.\nUpdate: Immediately after trade confirmation. Append one row — do not rebuild entire file.\nDo NOT rebuild from scratch each session — open file, add row, save.\n\n▌ DECISION RULE (when unsure where something goes):\n→ Will this expire by next session? → RECAP\n→ Would a future Claude session benefit from knowing this permanently? → LESSONS_LEARNED\n→ Does it reflect current portfolio state? → FUND_SESSION_STATE\n→ Is it a rule, watchlist, or structural SI change? → JOURNAL (queue for next rebuild)\n→ Is it a trade execution? → TRADE TRACKER (append immediately)"
    },
    {
      "id": 34,
      "title": "TRADE TRACKER UPDATE PROTOCOL — ON EVERY EXECUTED TRADE",
      "body": "FILE: Claude_Fund_Trade_Tracker.xlsx\nLOCATIONS: (1) Claude project files, (2) C:\\\\Users\\\\jcadb\\\\Claude Date File\\\\\n\nTRIGGER: Any confirmed IBKR fill — buy or sell, intentional or stop-triggered.\n\nPROTOCOL:\n(1) User confirms fill via IBKR screenshot OR trade confirmation.\n(2) Open existing Claude_Fund_Trade_Tracker.xlsx — do NOT rebuild from scratch.\n(3) Append one row with: Trade#, Date In, Date Out (if closing), Ticker, Company, Qty, Entry Price, Exit Price, CCY, P&L Native, P&L USD, Status (OPEN/CLOSED), Running Balance.\n(4) For OPENING trades: Date Out = blank, Exit Price = blank, P&L = blank, Status = OPEN.\n(5) For CLOSING trades: complete all fields, update Status to CLOSED, calculate P&L USD, update Running Balance.\n(6) Save and present_files for download.\n(7) Confirm to user: 'Trade tracker updated — Trade #[N] added. Running realised P&L: $[X].'\n\nDATA SOURCES (strict priority):\n(1) IBKR fill confirmation screenshot — exact price and qty.\n(2) IBKR Activity Statement CSV if available.\nNEVER use estimated prices for the tracker — confirmed fills only.\n\nFX CONVERSION: For GBP/EUR trades, use IBKR-confirmed USD equivalent from the activity statement. If unavailable, note 'FX rate at fill TBC' and update when statement available.\n\nCOMPLEX TRADES (e.g. SHLD double-fill): Show net of all fills on one row with a note in the Company field explaining the complexity. Do not split into multiple rows unless the user requests it."
    },
    {
      "id": 32,
      "title": "SESSION START PROTOCOL — FILESYSTEM READ MANDATORY (replaces Drive/Chrome memory)",
      "body": "MANDATORY SESSION START — EXECUTE IN THIS EXACT ORDER BEFORE ANYTHING ELSE:\n\nSTEP 1: filesystem:read_text_file(\"C:\\\\Users\\\\jcadb\\\\Claude Date File\\\\FUND_SESSION_STATE.md\")\n→ Current positions, thesis, cash, active stops, deployment plan.\n\nSTEP 2: filesystem:read_text_file(\"C:\\\\Users\\\\jcadb\\\\Claude Date File\\\\LESSONS_LEARNED.md\")\n→ Error taxonomy, strategic lessons, scan protocol lessons. Permanent knowledge base.\n\nSTEP 3: filesystem:read_text_file(\"C:\\\\Users\\\\jcadb\\\\Claude Date File\\\\SESSION_RECAP.md\") — IF FILE EXISTS\n→ Post-journal corrections not yet integrated. Apply these to override stale FUND_SESSION_STATE.md data. If file does not exist, skip and note No recap pending.\n\nSTEP 4: Request IBKR screenshots (positions + orders tabs).\n→ IBKR = ground truth. Cross-check against FUND_SESSION_STATE.md. Flag discrepancies before proceeding.\n\nSTEP 5: Run SI-14 full scan sections A-K.\n\nFALLBACK: If filesystem MCP unavailable log FILESYSTEM UNAVAILABLE and use project journal + IBKR screenshots only.\nCHROME: Research/scraping only — NOT for memory or state.\nGOOGLE DRIVE: DEPRECATED."
    }
  ],
  "watchlistUS": [
    {
      "ticker": "KTOS",
      "name": "Kratos Defense & Security Solutions",
      "exchange": "NASDAQ",
      "status": "WATCH — REENTRY $62-67 on pullback",
      "addedDate": "2026-04-02",
      "currentPrice": 67.7,
      "priceVerified": "MMD Apr 1 close ✅",
      "entry": "$62-67 on pullback — tight entry only",
      "stopIfEntered": 58,
      "positionSizeMax": "$3,000-4,000",
      "thesis": "REENTRY CANDIDATE. Stopped out $64.98 Mar 30 — bad timing, good thesis. Bounced to $70.51 immediately after stop triggered (Mar 31). Current $67.70. Was trading $87-95 in early March before sector selloff. Significant news flow: Golden Dome satellite kill chain contracts, Valkyrie XQ-58A production ramp, hypersonic target drone wins. Defense budget tailwinds secular. Entry only on dip to $62-67 — avoid chasing.",
      "flags": "Previously stopped out Mar 30 @ $64.98 due to broad defense selloff. Fundamentals unchanged. Wait for setup — do not chase at $67-70."
    },
    {
      "ticker": "CF",
      "name": "CF Industries Holdings",
      "exchange": "NYSE",
      "status": "WATCH — Entry $115-120 on ceasefire-driven pullback",
      "addedDate": "2026-04-01",
      "currentPrice": 129.84,
      "priceVerified": "MMD Mar 31 ✅",
      "entry": "$115-120 on pullback after Trump withdrawal announcement",
      "stopIfEntered": 100,
      "positionSizeMax": "$1,500-2,000",
      "thesis": "Pure-play N. American nitrogen producer. Low-cost US gas ($1-3/MMBtu) vs global $10-17. Record margins from Hormuz disruption. Planting damage already done — CF benefits regardless of reopening timeline. Stock rallied 60% from 2025 lows. DOJ antitrust inquiry is risk cap.",
      "flags": "DOJ price-fixing inquiry opened. Mean reversion risk if Hormuz reopens. Already surged — do NOT chase at current levels."
    },
    {
      "ticker": "NTR",
      "name": "Nutrien Ltd",
      "exchange": "NYSE",
      "status": "WATCH — Entry $70-73 on pullback",
      "addedDate": "2026-04-01",
      "currentPrice": 75.46,
      "priceVerified": "MMD Mar 31 ✅",
      "entry": "$70-73 on pullback",
      "stopIfEntered": 62,
      "positionSizeMax": "$1,500-2,000",
      "thesis": "Diversified fertiliser (N, P, K). 20% global potash. $37B market cap. Wells Fargo/Jefferies upgraded to Buy ($96-100 targets). Safer than CF but less pure-play leverage."
    },
    {
      "ticker": "LIN",
      "name": "Linde PLC",
      "exchange": "NASDAQ",
      "status": "WATCH ONLY — depends on Hormuz closure duration",
      "addedDate": "2026-04-01",
      "currentPrice": 495.76,
      "priceVerified": "MMD Mar 31 ✅",
      "entry": "WATCH ONLY — helium thesis weakens under toll regime where non-oil shipments resume",
      "thesis": "World's largest industrial gas company. JPM upgraded to OW on helium shortage. But under toll regime scenario, helium from Qatar likely resumes with fees, reducing Linde's windfall. Higher risk entry than CF/NTR."
    },
    {
      "ticker": "BKSY",
      "name": "BlackSky Technology",
      "exchange": "NYSE",
      "status": "WATCH — Entry $20-22 pullback only",
      "addedDate": "2026-03-26",
      "currentPrice": 26.41,
      "entry": "$20-22 pullback only",
      "stopIfEntered": 16,
      "thesis": "Space intelligence platform. DO NOT chase at current levels."
    },
    {
      "ticker": "NOG",
      "name": "Northern Oil & Gas",
      "exchange": "NYSE",
      "status": "WATCH — Entry below $27.75 offering price",
      "currentPrice": "$30.75",
      "entry": "$26-27.50",
      "stopIfEntered": 23.5,
      "thesis": "Non-operated E&P. FCF scales with oil. 6.5% dividend. Earnings Apr 30."
    },
    {
      "ticker": "UMAC",
      "name": "Unusual Machines",
      "exchange": "NYSE American",
      "status": "WATCH — $11-13 on pullback",
      "entry": "$11-13",
      "stopIfEntered": 9,
      "thesis": "NDAA-compliant drone components. CFO/CRO selling. $150M dilutive offering."
    },
    {
      "ticker": "CCRN",
      "name": "Cross Country Healthcare",
      "exchange": "NASDAQ",
      "status": "WATCH — Q1 inflection",
      "currentPrice": 9.73,
      "entry": "$8-10",
      "stopIfEntered": 7,
      "thesis": "Healthcare staffing turnaround. Wait for Q1 revenue stabilisation signal."
    },
    {
      "ticker": "SLDP",
      "name": "Solid Power Inc",
      "exchange": "NASDAQ",
      "status": "WATCH — $2.20-2.50 entry",
      "currentPrice": 2.92,
      "entry": "$2.20-2.50 on further dip",
      "stopIfEntered": 1.8,
      "thesis": "Solid-state battery electrolyte supplier. SK On site acceptance imminent."
    },
    {
      "ticker": "ASTS",
      "name": "AST SpaceMobile",
      "exchange": "NASDAQ",
      "status": "WATCH — DO NOT BUY above $95",
      "currentPrice": 93.4,
      "entry": "$80-85 on pullback",
      "stopIfEntered": 65,
      "thesis": "Space-based cellular broadband. Heavy insider selling. Optionality only."
    },
    {
      "ticker": "LUNR",
      "name": "Intuitive Machines",
      "exchange": "NASDAQ",
      "status": "WATCH — NOT rerating candidate",
      "currentPrice": 20.55,
      "entry": "$16-18 pullback",
      "stopIfEntered": 13,
      "thesis": "Lunar infrastructure. $3.89B market cap — separate allocation decision."
    },
    {
      "ticker": "QSI",
      "name": "Quantum-Si Inc",
      "exchange": "NASDAQ",
      "status": "WATCH — $500 moonshot max",
      "currentPrice": 0.845,
      "entry": "$0.85-0.90",
      "stopIfEntered": 0.55,
      "thesis": "Protein sequencing. Pre-commercial. Weakest proof in basket."
    },
    {
      "ticker": "SES",
      "name": "SES AI Corp",
      "exchange": "NYSE",
      "status": "WATCH — Monitor for commercial signal",
      "currentPrice": 1.06,
      "entry": "$0.85-0.95",
      "stopIfEntered": 0.6,
      "thesis": "AI materials discovery. Monitor for commercial validation."
    },
    {
      "ticker": "BTC",
      "name": "Bitcoin (IBKR Paxos spot)",
      "exchange": "IBKR",
      "status": "WATCH — $55K target, NO ORDER PLACED",
      "currentPrice": 67643,
      "entry": "$55,000 GTC — NOT YET PLACED",
      "stopIfEntered": 48000,
      "thesis": "5-7.5% portfolio. Buy and hold. Post-Trump address timing. Direct via IBKR Paxos preferred."
    },
    {
      "ticker": "LEU",
      "name": "Centrus Energy Corp",
      "exchange": "NYSE",
      "status": "WATCHLIST — STOPPED OUT APR 7. Re-entry on confirmed US nuclear policy catalyst only.",
      "addedDate": "2026-04-07",
      "currentPrice": 170.54,
      "priceVerified": "IBKR stop fill Apr 7",
      "entry": "Re-entry only on: (1) confirmed US HALEU government contract expansion above current DoE programme; (2) EU utility announced direct HALEU procurement; (3) US nuclear policy pivot under Iran energy crisis — congressional action. Do NOT re-enter on thesis alone.",
      "stopIfEntered": 145,
      "positionSizeMax": "$2,000",
      "thesis": "HALEU enrichment monopoly. Stopped out Apr 7 @ $170.54 after nuclear thesis reclassification — US domestic oil security reduces urgency for US nuclear investment vs Europe. RR.L and CCJ retain thesis relevance as global/EU plays. LEU is US-domestic only. WATCH for re-entry signals: (1) US grid emergency declaration forcing nuclear acceleration; (2) LEU awarded contract >$500M above current pipeline; (3) price drops to $140-150 with confirming catalyst. No re-entry on sentiment alone.",
      "flags": "Nuclear thesis TIER 3 — US only. Core thesis supports EU nuclear (RR.L) and global uranium (CCJ). LEU re-entry requires confirmed US policy catalyst or price correction to $140-150 zone."
    },
    {
      "ticker": "RTX",
      "name": "RTX Corporation (Raytheon Technologies)",
      "exchange": "NYSE",
      "status": "TRANCHE 2 — PRIORITY ENTRY. Iran war munitions replenishment thesis.",
      "addedDate": "2026-04-07",
      "currentPrice": 198.41,
      "priceVerified": "MMD Apr 4 close ✅",
      "entry": "$195-200 — currently at entry zone. $3,500 fresh capital. Enter now or on any dip below $200.",
      "stopIfEntered": 183,
      "positionSizeMax": "$3,500",
      "thesis": "Direct Iran war munitions play. $268B backlog. Seven-year DoD framework agreements signed Feb 2026: Tomahawk 1,000+/yr, AMRAAM 1,900+/yr, SM-6 500+/yr — 2-4x current rates. UAE Patriot contract $281M. Q1 earnings Apr 21 — guidance revision event (not just beat). Iran war depletion quantities not yet public — upside surprise highly probable. Congressional $50B supplemental pending — direct RTX catalyst. Stock +50% past 12 months, +7% YTD. 25x earnings vs PLTR 234x. Analyst median $225, high $240. 13-21% upside to consensus. Hold multi-month — this is a 2026-2027 revenue cycle story, not a trade.",
      "flags": "Tariff headwind ~$850M at Collins/Pratt & Whitney. GTF powder metal inspection programme ongoing. Deutsche Bank downgraded to Hold on valuation. Earnings Apr 21 — if guidance raised above $225 consensus AND allied orders mentioned, add second tranche $2,000. If miss or guidance cut, exit immediately."
    }
  ],
  "watchlistEU": [
    {
      "ticker": "R3NK",
      "name": "RENK Group AG",
      "exchange": "XETRA",
      "ibkr": "R3NK IBIS",
      "current": 56.01,
      "entry": "REENTRY WATCHLIST — €46-49 on pullback ONLY. Do NOT re-enter above €52.",
      "target": 68,
      "cur": "EUR",
      "upside": 31,
      "thesis": "IN PORTFOLIO. Stop €42 GTC. May 6 earnings. 14 analyst Buy consensus €68.",
      "note": "CLOSED S12 @ €56.01. Peace dividend captured. Reentry zone €46-49. May 6 Q1 earnings critical — €200M deferred Q4 orders. EU rearmament is 10-year procurement cycle — thesis intact, just need better entry.",
      "status": "CLOSED S12 @ €56.01. Gain +€357. Moved to reentry watchlist."
    },
    {
      "ticker": "HAG",
      "name": "Hensoldt AG",
      "exchange": "XETRA",
      "ibkr": "HAG IBIS",
      "current": 70,
      "entry": "WATCH — €70-75",
      "target": 91,
      "cur": "EUR",
      "upside": 30,
      "thesis": "Radar + EW + optronics. 62% order surge. €8.83B backlog. Jefferies upgraded to Buy Mar 8. May 5 earnings. WATCH — not entering due to adequate EU defence exposure.",
      "note": "WATCH ONLY — adequate EU defence exposure already in portfolio."
    },
    {
      "ticker": "LDO",
      "name": "Leonardo SpA",
      "exchange": "MILAN",
      "ibkr": "LDO BVME",
      "current": 61.08,
      "entry": "IN PORTFOLIO — €58.28 avg",
      "target": 68,
      "cur": "EUR",
      "upside": 11,
      "thesis": "IN PORTFOLIO. NOW GREEN. Stop €50 GTC. May 5 earnings.",
      "note": "STOP €50 GTC LIVE"
    },
    {
      "ticker": "CWR.L",
      "name": "Ceres Power Holdings",
      "exchange": "LSE",
      "ibkr": "CWR LSE",
      "current": 310,
      "entry": "250-270p on pullback to 200-day MA. Conservative entry 200p.",
      "target": "422p (analyst consensus), 500p+ if thesis fires",
      "cur": "GBP",
      "upside": 36,
      "thesis": "PRIORITY EU ENERGY WATCHLIST. Fuel cell technology licensor. Partners: Bosch, Doosan, Centrica, Weichai. Debt free, £147.8M cash, 3+ years runway. Revenue flat at £22M with -£54M losses — licensing model not yet scaled. Already surged 339% from 44p lows. Momentum trap at current levels. Intrinsic value debate (Alpha Spread says 60p, analysts say 422p). Entry only on meaningful pullback. Grid delay thesis for distributed power is real but already partially priced.",
      "note": "ENTRY 250-270p ONLY. Do NOT chase at 310p."
    },
    {
      "ticker": "ITM.L",
      "name": "ITM Power PLC",
      "exchange": "LSE",
      "ibkr": "ITM LSE",
      "current": 65,
      "entry": "IN PORTFOLIO — 3100 shares @ 65.1p",
      "target": "98p / 130p",
      "cur": "GBP",
      "upside": 51,
      "thesis": "IN PORTFOLIO. ENTERED S08. Green hydrogen electrolyser. Record H1 revenue £18M. £152M backlog. £197.8M cash. 8-month pre-breakout base. Stop 55p GTC.",
      "note": "STOP 55p GTC LIVE — recommend lowering to 50p"
    },
    {
      "ticker": "AFC.L",
      "name": "AFC Energy",
      "exchange": "AIM",
      "ibkr": "AFC LSE",
      "current": 14.8,
      "entry": "Moonshot only — £500 max",
      "target": "22.6p (analyst consensus)",
      "cur": "GBP",
      "upside": 53,
      "thesis": "Hydrogen fuel cells. Revenue £3.6M, losses -£19.3M, only £4.3M cash. 1.13B shares outstanding — heavy dilution. Momentum trap. Funding round likely within 12 months. Maximum £500 allocation.",
      "note": "HIGHEST RISK in basket. Cash crunch incoming."
    },
    {
      "ticker": "H2O.DE",
      "name": "Enapter AG",
      "exchange": "Frankfurt",
      "ibkr": "H2O FRA",
      "current": null,
      "entry": "Research next session",
      "target": null,
      "cur": "EUR",
      "upside": null,
      "thesis": "AEM electrolyser manufacturer. Modular hydrogen generators. German small cap pure-play. Research fundamentals, cash position, revenue trajectory next session.",
      "note": "RESEARCH NEEDED — added S08"
    },
    {
      "ticker": "IKA.L",
      "name": "Ilika PLC",
      "exchange": "AIM",
      "ibkr": "IKA LSE",
      "current": "60-80p",
      "entry": "Current or dip — £500 moonshot max",
      "target": "100%+ on commercial validation",
      "cur": "GBP",
      "upside": null,
      "thesis": "UK solid-state battery developer. Stereax micro-batteries for IoT/medtech, Goliath cells for EVs. Comau/Stellantis partnership. Market cap ~£45-65M. Pre-revenue.",
      "note": "LOTTERY TICKET — £500 max"
    },
    {
      "ticker": "ALFEN.AS",
      "name": "Alfen NV",
      "exchange": "Euronext Amsterdam",
      "ibkr": "ALFEN AMS",
      "current": null,
      "entry": "Research next session",
      "target": null,
      "cur": "EUR",
      "upside": null,
      "thesis": "Smart grids, energy storage, EV charging. Market leading in Netherlands. EU grid infrastructure picks-and-shovels play. May 12 earnings. Research deeper.",
      "note": "RESEARCH NEEDED — added S08"
    },
    {
      "ticker": "YCA.L",
      "name": "Yellow Cake PLC",
      "exchange": "AIM/LSE",
      "ibkr": "YCA LSE",
      "current": "591-657p",
      "entry": "500-520p on pullback only",
      "target": "743p (analyst consensus)",
      "cur": "GBP",
      "upside": 13,
      "thesis": "Physical uranium holding company. 20.16M lbs U3O8 in storage. Kazatomprom supply agreement through 2027. Pure uranium price exposure without mining risk. Near ATH 750p — NOT a value entry. Debt free, 2 employees, <1% NAV operating costs. Watch for pullback on any 'war over' sentiment.",
      "note": "DO NOT CHASE near ATH. Wait for 500-520p."
    },
    {
      "ticker": "COST.L",
      "name": "Costain Group",
      "exchange": "LSE",
      "ibkr": "COST LSE",
      "current": "~135p",
      "entry": "Research next session — near current levels",
      "target": null,
      "cur": "GBP",
      "upside": null,
      "thesis": "UK infrastructure/engineering. Nuclear decommissioning + new-build contracts (Sellafield, NDA, Hinkley Point C). Market cap ~£230M. P/E ~8x. Cheap. Would benefit from UK SMR site preparation. Low analyst coverage.",
      "note": "RESEARCH NEEDED — added S08"
    },
    {
      "ticker": "ASY.PA",
      "name": "Assystem SA",
      "exchange": "Euronext Paris",
      "ibkr": "ASY EPA",
      "current": "47-52 EUR",
      "entry": "Research next session",
      "target": "55-60 EUR (analyst consensus)",
      "cur": "EUR",
      "upside": null,
      "thesis": "French nuclear engineering consultancy. Market cap ~€750M. 67% revenue from nuclear/energy. Direct beneficiary of France EPR2 programme + EU SMR buildout. Revenue ~€570M growing 8-10%. Under-covered (~4-5 analysts). Exactly the under-radar nuclear supply chain name that re-rates 30-50% as market catches up to policy pivot.",
      "note": "STRONGEST under-radar candidate. RESEARCH NEEDED — deep dive next session."
    },
    {
      "ticker": "HO",
      "name": "Thales SA",
      "exchange": "PARIS",
      "ibkr": "HO ENEXT.BE",
      "current": 235.6,
      "entry": "€230-240",
      "target": 293,
      "cur": "EUR",
      "upside": 24,
      "thesis": "MBDA missiles + cybersecurity + SAMP/T NG + IRIS2 satellite.",
      "note": "PRIORITY 4 — EU defence"
    },
    {
      "ticker": "CHG",
      "name": "Chemring Group",
      "exchange": "LSE",
      "ibkr": "CHG LSE",
      "current": 527,
      "entry": "500-530p",
      "target": 616,
      "cur": "GBP",
      "upside": 27,
      "thesis": "High explosives near-monopoly. NATO restock.",
      "note": "PRIORITY 5"
    },
    {
      "ticker": "BA",
      "name": "BAE Systems",
      "exchange": "LSE",
      "ibkr": "BA LSE",
      "current": 2250,
      "entry": "2200-2300p",
      "target": 2800,
      "cur": "GBP",
      "upside": 25,
      "thesis": "AUKUS nuclear subs + BATS counter-drone.",
      "note": "PRIORITY 6"
    },
    {
      "ticker": "BAB",
      "name": "Babcock International",
      "exchange": "LSE",
      "ibkr": "BAB LSE",
      "current": 1409,
      "entry": "1300-1420p",
      "target": 1700,
      "cur": "GBP",
      "upside": 21,
      "thesis": "Nuclear submarine MRO + AUKUS.",
      "note": "PRIORITY 7"
    },
    {
      "ticker": "CHRT",
      "name": "Cohort PLC",
      "exchange": "AIM",
      "ibkr": "CHRT LSE",
      "current": 1290,
      "entry": "1250-1350p",
      "target": 1570,
      "cur": "GBP",
      "upside": 22,
      "thesis": "Naval electronics + counter-drone.",
      "note": "PRIORITY 8 — USE LIMIT ORDERS on AIM"
    },
    {
      "ticker": "KOG",
      "name": "Kongsberg Gruppen",
      "exchange": "OSLO",
      "ibkr": "KOG OL",
      "current": 389,
      "entry": "Wait Apr spinoff",
      "target": 500,
      "cur": "NOK",
      "upside": 28,
      "thesis": "Maritime spinoff Apr 2026 leaves pure-play defence.",
      "note": "WATCH for spinoff"
    },
    {
      "ticker": "KNDS",
      "name": "KNDS (IPO 2026)",
      "exchange": "TBC",
      "ibkr": "TBC",
      "current": null,
      "entry": "Day-one buy",
      "target": null,
      "cur": "EUR",
      "upside": null,
      "thesis": "Franco-German Leopard 2 maker. €23.5B backlog. Largest EU defence IPO 2026.",
      "note": "IPO WATCH"
    }
  ],
  "sessionNotes": [
    {
      "date": "2026-04-08-SESSION12",
      "note": "SESSION 12 — 8 APR 2026. TWO-WEEK US-IRAN CEASEFIRE — biggest oil drop since 1991 Gulf War (-13-16% overnight). Brent ~3, WTI ~4. FILLS: UPS 50 @ 00.17 (fill), accidentally sold 9.60 — reentry 9.00 GTC submitted. R3NK CLOSED @ €56.01, gain +€357, moved to watchlist €46-49. RCL/CCL DAY orders expired unfilled — correct discipline, R/R broken at gap prices. UAL GTC 2.08 standing. ORDERS UPDATED: CCJ stop 06.07→08.37. SHLD stop trigger 2.60→3.89. AMZN stop 04→12.13. MSTR BUY CANCELLED. SI-24 REVISED: cash floor 25%→10% of net liquidity. KEY FLAGS: PLTR 5-session test Day 1 FAIL (46.48, needs >52). RR.L +10.13% session best. SHLD stop proximity 1.4% — monitor. Ceasefire fragile: only 2 vessels transited Strait, 426 tankers trapped, Iran retaining vetting/control. Islamabad talks Apr 10 next binary. SI-25 exit trigger NOT activated. Net liquidity 8.9K. 14 positions. Cash floor: 10% = ,890, current cash 4,784 — CLEAR."
    },
    {
      "date": "2026-04-02-SESSION09",
      "note": "SESSION 09 — 2 APR 2026. IBKR CROSS-CHECK COMPLETE. NET LIQ: $97.9K (stable). UNREALIZED: -$227.78 (SIGNIFICANTLY IMPROVED from -$822 in S08 and -$3,466 in S07). RCL CLOSED: Stop $270 triggered at $269.91. 36 shares × ($269.91 - $273.57 avg) = -$132 realized. Peace bounce to $295 did not materialize — stop discipline correct. Portfolio now 14 positions. ORDER AUDIT (IBKR Image 2): 11 active GTC orders confirmed. KEY CHANGES: (1) PLTR stop RAISED $130→$135.01 GTC — tighter protection. (2) AMPX stop ADJUSTED $14→$13.00 — confirmed IBKR. (3) LDO NEW Stop Limit $55.00/$53.50 GTC — upgrades flat €50 stop, locks in partial profit protection. KTOS ANALYSIS: Stopped out $64.98 Mar 30, immediately bounced to $70.51 Mar 31. Wrong timing, right thesis. Current $67.70. Reentry zone $62-67 on pullback. Golden Dome + Valkyrie production news ongoing. STRATEGY: Remain cash heavy. Base cash $36,456 + USD $46,988. Do not deploy into existing losers. Wait for thesis-aligned dips. Iran conflict shows no resolution — Hormuz toll regime solidifying. WTI ~$102, Brent ~$108. Trump address 9PM ET Apr 2 (5AM UAE Apr 3) — formal Iran withdrawal expected. Positions look healthy — 7 green, 7 red. Biggest red: PLTR -9%, AMPX -9.9%, AVAV -6%, CODA -5.9%. All have stops. SESSION 09 COMPLETE."
    },
    {
      "date": "2026-04-01-SESSION08",
      "note": "SESSION 08 — 1 APR 2026. THESIS REVISED: 'Trump exits Iran — Hormuz toll regime — supply chain premium replaces war premium.' Trump announced US withdrawal in 2-3 weeks from Oval Office, claiming regime change. Iran FM Araqchi says trust is zero, no negotiations, demands reparations + Hormuz sovereignty. Base case: Trump declares victory, leaves. Iran keeps Hormuz under toll control. War premium deflates, supply chain premium persists. IBKR CROSS-CHECK: Started with 15 positions. Net Liq $96K→$97.3K. Unrealized improved from -$3,466 to -$822. 10 of 16 positions now green — strongest recovery since fund inception. KEY TRADES: (1) IAG.L 2200 shares SOLD — limit 365p FILLED AT 370p. Profit ~£326. Peace dividend thesis correctly identified as broken under toll regime. Tactical exit bracket worked perfectly within hours. (2) ITM Power 3100 shares BOUGHT @ 64.8-65p. EU hydrogen/energy independence play. 8-month pre-breakout base. Record revenue, £152M backlog, £197.8M cash. Stop 55p GTC placed (recommend lowering to 50p). PORTFOLIO NOW: 15 positions. Cash improved — GBP debit reduced from -£9,604 to -£3,486 on IAG exit. NEW WATCHLISTS CREATED: (A) Supply chain disruption: CF $115-120 entry on pullback, NTR $70-73 on pullback, LIN watch only. VLO removed (above target). (B) EU Energy Basket: CWR.L (250-270p entry), ITM.L (ENTERED), AFC.L (moonshot), Enapter H2O.DE (research), Ilika IKA.L (moonshot), Alfen ALFEN.AS (research), Yellow Cake YCA.L (500-520p pullback), Costain COST.L (research), Assystem ASY.PA (research — strongest under-radar name). DEEP ANALYSIS COMPLETED: CWR fundamental deep dive — revenue flat £22M, losses widening to -£54M, debt free, £147.8M cash, 27x sales = expensive. Already surged 339%. Momentum trap at current levels. ITM preferred for fresh breakout potential. YCA near ATH — wait for pullback. CONGRESSIONAL: Fertilizer now politically hot — DOJ antitrust + Senate Fertilizer Transparency Act. Regulatory risk caps CF/NTR upside. EU NUCLEAR POLICY: Von der Leyen called nuclear phase-out 'strategic mistake'. EC announced €200M SMR guarantee. Germany's Merz agrees. Italy repealing ban. Belgium extending fleet. This is structural, not cyclical. TONIGHT: Trump address 9PM ET (5AM UAE Apr 2). Formal withdrawal timeline expected. Watch: oil reaction, airline bounce, BTC risk-on potential, defence pullback. IAG 370p fill validates the pre-speech bounce thesis."
    },
    {
      "date": "2026-03-31-SESSION07",
      "note": "SESSION 07 — 31 MAR 2026. IBKR CROSS-CHECK: 15 positions (down from 16). UEC 206 shares SOLD @ $13.16 — realized loss ~$127. NET LIQUIDITY: $94.2K. UNREALISED: -$3,466. Daily P&L +$1,785 (+1.93%). ALL 15 POSITIONS GREEN TODAY. AMZN now profitable. CCJ now profitable. AMPX recovered. PLTR improved. 10 GTC ORDERS CONFIRMED. IRAN ESCALATION: Al-Salmi VLCC struck by Iranian drone at Dubai Port. OIL: WTI ~$102, Brent ~$108-113. March = RECORD monthly surge. BTC: $67,643 on IBKR Paxos. F&G 11. NO ORDER PLACED. Thesis 100% INTACT AND HARDENING."
    },
    {
      "date": "2026-03-31-SESSION06",
      "note": "SESSION 06 — 31 MAR 2026. STOPS EXECUTED: ONDS $8.50 + KTOS $65. Realized ~$2,202. AMZN filled @ $201.20. NET LIQ: $92.2K. DANGER FLAGS: AMPX, PLTR. LEU stop recommended. UEC exit submitted. BTC added to watchlist."
    },
    {
      "date": "2026-03-30-SESSION05",
      "note": "SESSION 05 — 30 MAR 2026. CCJ 49 shares FILLED at $104.02. NET LIQ: $95.5K. SLDP deep fundamental analysis completed. AMZN submitted."
    },
    {
      "date": "2026-03-27-EOD",
      "note": "SESSION 04 — 27 MAR 2026. LDO.MI 17 shares + IAG.L 2200 shares filled. CCL closed +$122. PDYN/KTOS/R3NK stops placed. NET LIQ: $97.4K."
    },
    {
      "date": "2026-03-26-EOD",
      "note": "EOD — Mar 26 2026. AVAV 25 filled. CCL sold. R3NK + RR.L filled. 14 holdings. Migrating to new chat."
    },
    {
      "date": "2026-03-26",
      "note": "FULL SESSION — Mar 26 2026. IBKR EU ACCESS APPROVED. RR.L + R3NK filled. AVAV + CCL submitted."
    },
    {
      "date": "2026-03-25",
      "note": "END OF DAY — Mar 25 2026. PDYN + UEC + AMPX + CODA filled. CTRA skipped. Iran rejected ceasefire. Thesis intact."
    }
  ],
  "watchlist": [
    {
      "ticker": "LNG",
      "company": "Cheniere Energy Inc",
      "sector": "LNG Infrastructure",
      "exchange": "NYSE",
      "priority": "TIER 1 — ENTER THIS WEEK",
      "currentPrice": 281.16,
      "entryZone": "$265-285 post-Tuesday clarity",
      "stopSuggested": 240,
      "targetEoY2026": 400,
      "impliedUpside": "+42%",
      "allocationUSD": 5500,
      "thesis": "Most direct Hormuz/LNG thesis play. ~20% of global LNG transits Hormuz. Contracted revenue model — does not need spot prices high, needs supply security preference. $10B buyback 2026-2030. Multiple FERC expansion catalysts. Tuesday strike threat = pure catalyst.",
      "keyRisks": "Leverage $23B debt; regulatory/permitting dependency; project execution delays",
      "catalyst": "Tuesday strike escalation; FERC permitting progress; Q2 buyback cadence",
      "source": "High-Risk Portfolio Document — Session 10",
      "addedSession": "SESSION 10 — Apr 06 2026",
      "status": "WATCHLIST — NO ENTRY UNTIL TRIGGERS MET",
      "entryTriggers": [
        "Trump Tuesday threat resolves WITHOUT immediate market chaos",
        "LNG holds above $265 post-event (structural support confirmed)",
        "Hormuz remains restricted OR new escalation confirms thesis",
        "No adverse FERC/DOE permitting news",
        "MMD price verified < $290 on entry day"
      ],
      "avoidIf": "Peace agreement announced; Hormuz fully reopens; LNG breaks below $255",
      "decisionNote": "SESSION 10: NO ENTRY — Trump Tuesday uncertainty. Binary geopolitical risk too high. All entry deferred until post-Tuesday clarity and thesis confirmation. Capital preservation priority.",
      "lastReviewed": "2026-04-06 SESSION 10",
      "entryVerdict": "ENTER — Tranche 2, post-Tuesday",
      "annualisedReturn": "60%",
      "tranche": 2,
      "returnFilterApplied": "20% min annualised — SESSION 10",
      "readinessStatus": "TRANCHE 2 — AWAIT TUESDAY RESOLUTION",
      "urgency": "HIGH",
      "tuesdayExposure": "HIGH",
      "priceVsEntry": "AT ENTRY ($281.16)",
      "nextAction": "Enter within 48hrs of Tuesday if Hormuz remains restricted.",
      "baselinedSession": "SESSION 10 — Apr 06 2026"
    },
    {
      "ticker": "OXY",
      "company": "Occidental Petroleum Corp",
      "sector": "Oil & Gas — E&P",
      "exchange": "NYSE",
      "priority": "TIER 1 — ENTER THIS WEEK",
      "currentPrice": 62.97,
      "entryZone": "$58-67 on confirmed post-Tuesday dip or hold",
      "stopSuggested": 54,
      "targetEoY2026": 95,
      "impliedUpside": "+51%",
      "allocationUSD": 4500,
      "thesis": "Highest oil commodity torque. Permian shale + Gulf of America. WTI $102+ = massive FCF uplift above $55 breakeven. $1B FCF inflection in 2026 from non-oil sources (midstream $400M, Battleground $160M, STRATOS $250M). Morgan Stanley raised to $73, Raymond James to $64. CEO transition (Hollub) — uncertainty but strategic recalibration bullish. Tuesday strike = direct catalyst.",
      "keyRisks": "CEO transition risk; CrownRock dilution overhang; $15B debt; oil demand shock",
      "catalyst": "Q1 earnings May 5 2026; Tuesday strike; WTI sustained above $105",
      "source": "High-Risk Portfolio Document — Session 10",
      "addedSession": "SESSION 10 — Apr 06 2026",
      "status": "WATCHLIST — NO ENTRY UNTIL TRIGGERS MET",
      "entryTriggers": [
        "WTI oil confirmed above $95 post-Tuesday (not a temporary spike)",
        "Tuesday event resolves — market direction becomes clearer",
        "OXY Q1 earnings (May 5) guidance confirms FCF inflection narrative",
        "No new equity issuance or CrownRock dilution headlines",
        "MMD price verified in $58-67 range on entry day"
      ],
      "avoidIf": "Oil collapses below $80; peace deal removes risk premium; CEO transition creates strategic confusion",
      "decisionNote": "SESSION 10: NO ENTRY — Trump Tuesday uncertainty. Binary geopolitical risk too high. All entry deferred until post-Tuesday clarity and thesis confirmation. Capital preservation priority.",
      "lastReviewed": "2026-04-06 SESSION 10",
      "entryVerdict": "ENTER — Tranche 2, post-Tuesday",
      "annualisedReturn": "73%",
      "tranche": 2,
      "returnFilterApplied": "20% min annualised — SESSION 10",
      "readinessStatus": "TRANCHE 2 — AWAIT TUESDAY RESOLUTION",
      "urgency": "HIGH",
      "tuesdayExposure": "HIGH",
      "priceVsEntry": "AT ENTRY ($62.97)",
      "nextAction": "Enter within 48hrs of Tuesday if WTI holds above $95.",
      "baselinedSession": "SESSION 10 — Apr 06 2026"
    },
    {
      "ticker": "RTX",
      "company": "RTX Corporation",
      "sector": "US Defence — Mega-Cap",
      "exchange": "NYSE",
      "priority": "TIER 1 — ENTER THIS WEEK",
      "currentPrice": 196.21,
      "entryZone": "$190-200 post-Tuesday confirmation",
      "stopSuggested": 173,
      "targetEoY2026": 245,
      "impliedUpside": "+25%",
      "allocationUSD": 3800,
      "thesis": "Mega-cap war hedge — Tomahawk, Patriot, Raytheon radar. Locked multi-year government backlog. Tuesday strike = direct contract catalyst. Most conservative upside target (25%) but highest reliability. Non-overlapping with existing AVAV (tactical), SHLD (ETF), PDYN (software) — adds large-cap tier.",
      "keyRisks": "High debt; government spending constraints; programme risk",
      "catalyst": "Tuesday strike execution; defence budget approvals; backlog conversion",
      "source": "High-Risk Portfolio Document — Session 10",
      "addedSession": "SESSION 10 — Apr 06 2026",
      "status": "WATCHLIST — NO ENTRY UNTIL TRIGGERS MET",
      "entryTriggers": [
        "Tuesday resolves — strike executed OR credible threat maintained",
        "Defence sector does not sell off on \"relief rally\" if no strike",
        "RTX holds above $188 post-event",
        "No adverse earnings pre-announcement or programme failure news",
        "MMD price verified in $188-200 range on entry day"
      ],
      "avoidIf": "Rapid peace deal collapses defence premium; RTX breaks below $185; budget cut risk emerges",
      "decisionNote": "SESSION 10: NO ENTRY — Trump Tuesday uncertainty. Binary geopolitical risk too high. All entry deferred until post-Tuesday clarity and thesis confirmation. Capital preservation priority.",
      "lastReviewed": "2026-04-06 SESSION 10",
      "entryVerdict": "ENTER — Tranche 2, post-Tuesday",
      "annualisedReturn": "34%",
      "tranche": 2,
      "returnFilterApplied": "20% min annualised — SESSION 10",
      "readinessStatus": "TRANCHE 2 — AWAIT TUESDAY RESOLUTION",
      "urgency": "HIGH",
      "tuesdayExposure": "HIGH",
      "priceVsEntry": "AT ENTRY ($196.21)",
      "nextAction": "Enter post-Tuesday if defence sector holds or rallies.",
      "baselinedSession": "SESSION 10 — Apr 06 2026"
    },
    {
      "ticker": "STNG",
      "company": "Scorpio Tankers Inc",
      "sector": "Shipping — Product Tankers",
      "exchange": "NYSE",
      "priority": "TIER 2 — ENTER SMALL THIS WEEK",
      "currentPrice": 76.43,
      "entryZone": "$70-78 only after thesis confirmed post-Tuesday",
      "stopSuggested": 63,
      "targetEoY2026": 105,
      "impliedUpside": "+37%",
      "allocationUSD": 2500,
      "thesis": "Freight rate convexity play. Hormuz closure forces Cape of Good Hope rerouting — absorbs tanker fleet capacity, drives rates. $173M buyback remaining. Q2 2026 vessel sales ($35M x2 MR tankers). High volatility — sized small. Tuesday strike = tanker rate spike.",
      "keyRisks": "Cyclical freight rates — peace resolution collapses thesis fast; shipping volatility; wider stops required",
      "catalyst": "Tuesday escalation; freight rate data weekly; Q2 vessel sale completion",
      "source": "High-Risk Portfolio Document — Session 10",
      "addedSession": "SESSION 10 — Apr 06 2026",
      "status": "WATCHLIST — NO ENTRY UNTIL TRIGGERS MET",
      "entryTriggers": [
        "Tuesday escalation confirmed AND tanker rates shown rising (Baltic Clean Tanker Index)",
        "Hormuz closure confirmed as extended (not temporary)",
        "STNG holds above $70 post-event",
        "Q2 vessel sales ($35M x2) confirmed progressing",
        "MMD price verified above $70 on entry day"
      ],
      "avoidIf": "Peace deal announced; freight rates drop; STNG breaks below $68",
      "decisionNote": "SESSION 10: NO ENTRY — Trump Tuesday uncertainty. Binary geopolitical risk too high. All entry deferred until post-Tuesday clarity and thesis confirmation. Capital preservation priority.",
      "lastReviewed": "2026-04-06 SESSION 10",
      "entryVerdict": "ENTER — Tranche 2, post-Tuesday",
      "annualisedReturn": "53%",
      "tranche": 2,
      "returnFilterApplied": "20% min annualised — SESSION 10",
      "readinessStatus": "TRANCHE 2 — AWAIT TUESDAY RESOLUTION",
      "urgency": "MEDIUM",
      "tuesdayExposure": "HIGH",
      "priceVsEntry": "AT ENTRY ($76.43)",
      "nextAction": "Enter post-Tuesday if tanker rates rising. Size small.",
      "baselinedSession": "SESSION 10 — Apr 06 2026"
    },
    {
      "ticker": "BKR",
      "company": "Baker Hughes Co",
      "sector": "Energy Services",
      "exchange": "NASDAQ",
      "priority": "TIER 2 — ENTER ON DIP",
      "currentPrice": 60.38,
      "entryZone": "$56-60 on pullback — do not chase above $62",
      "stopSuggested": 51,
      "targetEoY2026": 85,
      "impliedUpside": "+41%",
      "allocationUSD": 3000,
      "thesis": "Picks-and-shovels energy services. Every LNG build, offshore drill, gas processing upgrade generates BKR revenue. Net share count decline. $1.3B buyback remaining. Benefits from sustained Hormuz energy capex boom without direct commodity exposure.",
      "keyRisks": "Capex cycle turns; LNG project delays; insider selling Form 4s; M&A distraction",
      "catalyst": "Energy capex confirmation; LNG project announcements; quarterly buyback update",
      "source": "High-Risk Portfolio Document — Session 10",
      "addedSession": "SESSION 10 — Apr 06 2026",
      "status": "WATCHLIST — NO ENTRY UNTIL TRIGGERS MET",
      "entryTriggers": [
        "Energy capex cycle confirmed sustained — major LNG/offshore project announcements",
        "BKR pulls back to $57-60 entry zone (currently at $60.38 — wait for dip)",
        "No adverse earnings pre-announcement or insider selling acceleration",
        "Tuesday resolves without oil demand destruction signal",
        "MMD price verified in $56-61 range on entry day"
      ],
      "avoidIf": "Energy capex cycle turns; LNG project delays; oil drops below $75",
      "decisionNote": "SESSION 10: NO ENTRY — Trump Tuesday uncertainty. Binary geopolitical risk too high. All entry deferred until post-Tuesday clarity and thesis confirmation. Capital preservation priority.",
      "lastReviewed": "2026-04-06 SESSION 10",
      "entryVerdict": "ENTER — Tranche 2, post-Tuesday",
      "annualisedReturn": "58%",
      "tranche": 2,
      "returnFilterApplied": "20% min annualised — SESSION 10",
      "readinessStatus": "TRANCHE 2 — AWAIT TUESDAY RESOLUTION",
      "urgency": "HIGH",
      "tuesdayExposure": "MODERATE",
      "priceVsEntry": "AT ENTRY ($60.38)",
      "nextAction": "Enter post-Tuesday at $57-61. Energy capex must confirm.",
      "baselinedSession": "SESSION 10 — Apr 06 2026"
    },
    {
      "ticker": "NVDA",
      "company": "NVIDIA Corporation",
      "sector": "AI Infrastructure / Semiconductors",
      "exchange": "NASDAQ",
      "priority": "TIER 3 — WATCHLIST, ENTER ON DIP",
      "currentPrice": 177.39,
      "entryZone": "$160-170 ONLY — do not enter above $175",
      "stopSuggested": 145,
      "targetEoY2026": 260,
      "impliedUpside": "+47%",
      "allocationUSD": 4000,
      "thesis": "AI infrastructure dominant. FY2026 revenue $215.94B +65%. $40.4B repurchased FY2026, $62.6B cash. Analyst consensus target $265-275 (exceeds document target). Structural AI demand from data centres. Not Hormuz-linked — enter on risk-off dips.",
      "keyRisks": "Export controls; hedge funds dumping at 13-year high pace; heavy insider selling; P/E 50x; geopolitical risk-off",
      "catalyst": "AI capex confirmation from hyperscalers; Blackwell ramp; GTC conference updates",
      "source": "High-Risk Portfolio Document — Session 10",
      "addedSession": "SESSION 10 — Apr 06 2026",
      "status": "WATCHLIST — NO ENTRY UNTIL TRIGGERS MET",
      "entryTriggers": [
        "NVDA pulls back to $160-170 risk-off entry zone (currently $177 — too high)",
        "Hedge fund selling pressure abates — volume normalises",
        "No new adverse export control announcements",
        "Tuesday Tuesday geopolitical risk-off creates the dip opportunity",
        "MMD price verified in $160-172 range on entry day"
      ],
      "avoidIf": "Export controls on H100/Blackwell announced; China revenue collapse; breaks below $150",
      "decisionNote": "SESSION 10: NO ENTRY — Trump Tuesday uncertainty. Binary geopolitical risk too high. All entry deferred until post-Tuesday clarity and thesis confirmation. Capital preservation priority.",
      "lastReviewed": "2026-04-06 SESSION 10",
      "entryVerdict": "ENTER — Tranche 3, at $165-170 only",
      "annualisedReturn": "47%",
      "tranche": 3,
      "returnFilterApplied": "20% min annualised — SESSION 10",
      "readinessStatus": "TRANCHE 3 — NEEDS PRICE DIP TO $165-170",
      "urgency": "MEDIUM",
      "tuesdayExposure": "LOW",
      "priceVsEntry": "ABOVE entry ($177 vs $165-170 needed)",
      "nextAction": "Do not enter above $175. Wait for risk-off dip.",
      "baselinedSession": "SESSION 10 — Apr 06 2026"
    },
    {
      "ticker": "BKNG",
      "company": "Booking Holdings Inc",
      "sector": "Travel / OTA",
      "exchange": "NASDAQ",
      "priority": "TIER 3 — POST-TUESDAY ENTRY",
      "currentPrice": 167.77,
      "entryZone": "$155-165 on post-Tuesday stabilisation or dip",
      "stopSuggested": 148,
      "targetEoY2026": 250,
      "impliedUpside": "+49%",
      "allocationUSD": 3500,
      "thesis": "Stabilisation beneficiary. $21.8B buyback remaining. $550M annual cost savings run-rate by end-2026. 25-for-1 split Apr 2 opens retail/options markets. World-class travel platform cash engine. Enter POST-Tuesday — this name sells off on escalation, re-rates on resolution.",
      "keyRisks": "Travel slowdown from recession; AI platform disintermediation; insider selling optics; escalation sell-off risk",
      "catalyst": "Post-Tuesday stabilisation; Q1 earnings; split-related liquidity expansion",
      "source": "High-Risk Portfolio Document — Session 10",
      "addedSession": "SESSION 10 — Apr 06 2026",
      "status": "WATCHLIST — NO ENTRY UNTIL TRIGGERS MET",
      "entryTriggers": [
        "Tuesday event resolves — peace/stabilisation narrative emerges",
        "BKNG dips to $155-165 on Tuesday risk-off sell-off (buy the dip)",
        "Travel demand data remains resilient post-event",
        "Buyback cadence confirmed in next earnings release",
        "MMD price verified in $155-168 range on entry day"
      ],
      "avoidIf": "Oil drives recession fears; travel demand collapses; BKNG breaks below $148",
      "decisionNote": "SESSION 10: NO ENTRY — Trump Tuesday uncertainty. Binary geopolitical risk too high. All entry deferred until post-Tuesday clarity and thesis confirmation. Capital preservation priority.",
      "lastReviewed": "2026-04-06 SESSION 10",
      "entryVerdict": "ENTER — Tranche 2, post-Tuesday",
      "annualisedReturn": "70%",
      "tranche": 2,
      "returnFilterApplied": "20% min annualised — SESSION 10",
      "readinessStatus": "TRANCHE 2 — AWAIT TUESDAY RESOLUTION",
      "urgency": "MEDIUM",
      "tuesdayExposure": "MODERATE",
      "priceVsEntry": "AT ENTRY ($167.77)",
      "nextAction": "Stabilisation play — enter post-Tuesday on any dip to $158-165.",
      "baselinedSession": "SESSION 10 — Apr 06 2026"
    },
    {
      "ticker": "AER",
      "company": "AerCap Holdings NV",
      "sector": "Aircraft Leasing",
      "exchange": "NYSE",
      "priority": "TIER 3 — POST-TUESDAY ENTRY",
      "currentPrice": 139.18,
      "entryZone": "$128-135 on post-Tuesday dip — do not enter above $142",
      "stopSuggested": 118,
      "targetEoY2026": 205,
      "impliedUpside": "+47%",
      "allocationUSD": 3000,
      "thesis": "Deep value aircraft leasing. Share count declined 186.8M → 166.9M in 2025 — clear anti-dilution signal. $1B buyback through June 2026. Stabilisation beneficiary — lessors are not direct fuel consumers. Travel normalisation improves lease economics.",
      "keyRisks": "Airline defaults/restructurings; aircraft residual value risk; funding market stress; high leverage $43.6B debt",
      "catalyst": "Post-Tuesday stabilisation; AER Q1 results; buyback cadence update H1 2026",
      "source": "High-Risk Portfolio Document — Session 10",
      "addedSession": "SESSION 10 — Apr 06 2026",
      "status": "WATCHLIST — NO ENTRY UNTIL TRIGGERS MET",
      "entryTriggers": [
        "Tuesday resolves without airline industry stress headlines",
        "AER dips to $128-135 on Tuesday risk-off (buy the dip)",
        "Credit spreads stable — funding market not stressed",
        "$1B buyback (through June 30 2026) confirmed continuing",
        "MMD price verified in $128-138 range on entry day"
      ],
      "avoidIf": "Major airline default/restructuring; credit spreads widen sharply; AER breaks below $120",
      "decisionNote": "SESSION 10: NO ENTRY — Trump Tuesday uncertainty. Binary geopolitical risk too high. All entry deferred until post-Tuesday clarity and thesis confirmation. Capital preservation priority.",
      "lastReviewed": "2026-04-06 SESSION 10",
      "entryVerdict": "ENTER — Tranche 2, post-Tuesday",
      "annualisedReturn": "47%",
      "tranche": 2,
      "returnFilterApplied": "20% min annualised — SESSION 10",
      "readinessStatus": "TRANCHE 2 — AWAIT TUESDAY RESOLUTION",
      "urgency": "MEDIUM",
      "tuesdayExposure": "MODERATE",
      "priceVsEntry": "AT ENTRY ($139.18)",
      "nextAction": "Enter post-Tuesday clarity. Credit spreads must be stable.",
      "baselinedSession": "SESSION 10 — Apr 06 2026"
    },
    {
      "ticker": "CF",
      "company": "CF Industries Holdings Inc",
      "sector": "Fertilizer / Nitrogen / Ammonia",
      "exchange": "NYSE",
      "priority": "TIER 1 — PRIORITY WATCHLIST",
      "currentPrice": 129.97,
      "entryZone": "$110-120",
      "stopSuggested": 95,
      "targetEoY2026": 145,
      "impliedUpside": "+12% from current but +32% from entry zone",
      "allocationUSD": 4000,
      "thesis": "PORTFOLIO GAP FILLED: 30% of global ammonia and 35% of urea transit Hormuz — CF is world largest ammonia producer, 100% North American. Direct beneficiary of Hormuz closure. Already up 76% YTD but thesis intact: European ammonia capacity down 20%, Iran production disrupted, China pulling back exports. Q4 2025 EBITDA $2.89B. UBS and BMO both raised to $140. Structural low-carbon ammonia platform (Yazoo City with ExxonMobil 2028 startup) provides floor beyond geopolitical premium. Spring planting season = peak demand timing.",
      "keyRisks": "DOJ price-fixing probe (Mar 2026) — primary risk. Peace deal = CF crashes to $100 per analyst. Already 76% YTD run limits upside. Senate investigation into pricing conduct.",
      "catalyst": "DOJ investigation resolution; Hormuz extended closure confirmed; Q1 2026 earnings (nitrogen pricing confirmation); spring planting demand data",
      "entryTriggers": [
        "DOJ probe resolves without enforcement action",
        "CF pulls back to $110-120 on peace headline or DOJ fear",
        "Nitrogen/urea prices remain elevated (check weekly)",
        "No equity issuance or output cuts ordered",
        "MMD price verified in $108-122 range on entry day"
      ],
      "avoidIf": "DOJ enforcement action announced; peace deal collapses thesis; CF breaks below $105",
      "decisionNote": "SESSION 10: BIGGEST PORTFOLIO GAP. Hormuz thesis has zero fertilizer coverage. CF is the direct expression. DO NOT chase at $130 — wait for DOJ or peace pullback to $110-120.",
      "source": "Extended Scan — Session 10",
      "addedSession": "SESSION 10 — Apr 06 2026",
      "status": "WATCHLIST — PRIORITY. AWAIT $110-120 ENTRY",
      "entryVerdict": "ENTER — Tranche 3, at $115 only",
      "annualisedReturn": "32%",
      "tranche": 3,
      "returnFilterApplied": "20% min annualised — SESSION 10",
      "readinessStatus": "TRANCHE 3 — NEEDS PRICE DIP TO $115",
      "urgency": "LOW",
      "tuesdayExposure": "LOW",
      "priceVsEntry": "ABOVE entry ($130 vs $115 needed)",
      "nextAction": "Wait for DOJ fear or peace sell-off to create entry.",
      "baselinedSession": "SESSION 10 — Apr 06 2026"
    },
    {
      "ticker": "GEV",
      "company": "GE Vernova Inc",
      "sector": "Power Infrastructure / Grid / Nuclear SMR",
      "exchange": "NYSE",
      "priority": "TIER 1 — WATCHLIST, WAIT FOR DIP",
      "currentPrice": 898.57,
      "entryZone": "$820-850",
      "stopSuggested": 750,
      "targetEoY2026": 1000,
      "impliedUpside": "+15-20% from entry zone",
      "allocationUSD": 4500,
      "thesis": "Best long-duration energy infrastructure play not yet covered. $150B backlog (+25% in 2025). Gas turbine slots sold out through 2028. BWRX-300 SMR in deployment (Canada, Poland, SE Asia via Hitachi JV). $10B buyback authorised. $22B cumulative FCF target by 2028. Dividend doubled to $0.50/quarter. AI data centre power demand driving 80GW gas turbine contract pipeline. Electrification backlog target doubled to $60B by 2028. 2026 revenue guidance $44-45B. Very low Tuesday exposure — $150B backlog is completely insulated from single geopolitical events.",
      "keyRisks": "Currently ABOVE analyst consensus ($898 vs $842 median) — do not chase. Offshore wind restructuring. Tariff exposure on critical minerals. High expectations embedded in price.",
      "catalyst": "BWRX-300 SMR commercial order flood; Q1 2026 earnings backlog update; Prolec GE acquisition close (mid-2026); electrification order momentum",
      "entryTriggers": [
        "GEV pulls back to $820-850 range (currently $898 — above consensus)",
        "Tuesday risk-off dip creates the entry",
        "Q1 earnings confirm backlog growth trajectory",
        "No adverse SMR programme delays",
        "MMD price verified in $815-855 range on entry day"
      ],
      "avoidIf": "GEV stays above $870 — not worth chasing above consensus; major offshore wind writedown; tariff escalation on grid components",
      "decisionNote": "SESSION 10: Best energy infrastructure stock not covered. CURRENTLY ABOVE ANALYST CONSENSUS — do not enter at $898. Wait for $820-850. Tuesday risk-off could create the entry opportunity.",
      "source": "Extended Scan — Session 10",
      "addedSession": "SESSION 10 — Apr 06 2026",
      "status": "WATCHLIST — DO NOT ENTER ABOVE $870. TARGET $820-850.",
      "entryVerdict": "WATCHLIST ONLY — fails 20% at $898. Need $835.",
      "annualisedReturn": "13%",
      "tranche": 0,
      "returnFilterApplied": "20% min annualised — SESSION 10",
      "readinessStatus": "WATCHLIST ONLY — FAILS 20% AT $898",
      "urgency": "NONE",
      "tuesdayExposure": "VERY LOW",
      "priceVsEntry": "ABOVE entry ($898 vs $835 needed)",
      "nextAction": "Do not enter. Fails return threshold at current price.",
      "baselinedSession": "SESSION 10 — Apr 06 2026"
    },
    {
      "ticker": "MP",
      "company": "MP Materials Corp",
      "sector": "Critical Minerals / Rare Earth / Defence Supply Chain",
      "exchange": "NYSE",
      "priority": "TIER 1 — PRIORITY WATCHLIST",
      "currentPrice": 49.73,
      "entryZone": "$44-48",
      "stopSuggested": 38,
      "targetEoY2026": 68,
      "impliedUpside": "+37% from entry zone",
      "allocationUSD": 3000,
      "thesis": "PORTFOLIO GAP: Sole large-scale US rare earth producer. Mines and processes neodymium-praseodymium (NdPr) oxide used in permanent magnets for every defence platform — drones (AVAV), missiles (RTX), electric motors, radar. Long-term DoD supply agreement = revenue visibility. US critical minerals independence is structural and bipartisan. Every defence platform in portfolio depends on materials MP produces. Very low Tuesday exposure — structural multi-year government-backed thesis.",
      "keyRisks": "China dominates global RE processing — policy risk if China restricts exports. Commodity price cycles. Processing scale-up execution. DoD contract terms.",
      "catalyst": "DoD contract milestones; magnet manufacturing ramp; critical minerals executive orders; China RE export restrictions (paradoxically bullish)",
      "entryTriggers": [
        "MP pulls back to $44-48 range",
        "DoD contract deliverables confirmed on schedule",
        "No adverse China RE policy that creates processing competition",
        "MMD price verified in $43-49 range on entry day"
      ],
      "avoidIf": "DoD contract cancelled or renegotiated; China floods RE market; processing ramp fails; breaks below $40",
      "decisionNote": "SESSION 10: CRITICAL MINERALS GAP IN PORTFOLIO. Every defence holding depends on rare earths MP produces. Unique DoD-backed revenue visibility. Enter $44-48 on pullback.",
      "source": "Extended Scan — Session 10",
      "addedSession": "SESSION 10 — Apr 06 2026",
      "status": "WATCHLIST — PRIORITY. ENTRY ZONE $44-48.",
      "entryVerdict": "ENTER — Tranche 1, this week",
      "annualisedReturn": "35%",
      "tranche": 1,
      "returnFilterApplied": "20% min annualised — SESSION 10",
      "readinessStatus": "TRANCHE 1 — ENTER WHEN PRICE OPTIMAL",
      "urgency": "HIGH",
      "tuesdayExposure": "VERY LOW",
      "priceVsEntry": "AT ENTRY ($49.73)",
      "nextAction": "Enter at market when cash available. No Tuesday dependency.",
      "baselinedSession": "SESSION 10 — Apr 06 2026"
    },
    {
      "ticker": "HAL",
      "company": "Halliburton Co",
      "sector": "Energy Services / Oilfield Services",
      "exchange": "NYSE",
      "priority": "TIER 2 — WATCHLIST, COMPARE vs BKR",
      "currentPrice": 38.17,
      "entryZone": "$34-37",
      "stopSuggested": 30,
      "targetEoY2026": 52,
      "impliedUpside": "+40% from entry zone",
      "allocationUSD": 3000,
      "thesis": "Energy services picks-and-shovels — comparable to BKR but potentially better value. Trading near bottom quartile of 52-week range while energy capex is booming. More international oilfield exposure than BKR, including Middle East operations. Benefits from same Hormuz-driven capex cycle. DEEP DIVE REQUIRED: compare HAL vs BKR on valuation, backlog, capital return, and international exposure before choosing one.",
      "keyRisks": "Capex cycle turn; oilfield services pricing pressure; international political exposure; energy demand shock",
      "catalyst": "Energy capex cycle confirmation; Q1 earnings; Middle East operations update",
      "entryTriggers": [
        "HAL vs BKR deep dive completed and HAL wins on value",
        "HAL pulls to $34-36",
        "Energy capex cycle confirmed sustained",
        "MMD price in $33-38 range on entry day"
      ],
      "avoidIf": "Energy capex cycle turns; BKR wins deep dive comparison; HAL breaks below $32",
      "decisionNote": "SESSION 10: HAL may be better value than BKR currently on watchlist. Needs head-to-head deep dive before choosing either. Do not enter both.",
      "source": "Extended Scan — Session 10",
      "addedSession": "SESSION 10 — Apr 06 2026",
      "status": "WATCHLIST — DEEP DIVE vs BKR REQUIRED BEFORE ENTRY",
      "entryVerdict": "ENTER — Tranche 1, this week",
      "annualisedReturn": "36%",
      "tranche": 1,
      "returnFilterApplied": "20% min annualised — SESSION 10",
      "readinessStatus": "TRANCHE 1 — ENTER WHEN PRICE OPTIMAL",
      "urgency": "MEDIUM",
      "tuesdayExposure": "MODERATE",
      "priceVsEntry": "AT ENTRY ($38.17)",
      "nextAction": "Enter at $36-38. Marginal Tuesday exposure — acceptable.",
      "baselinedSession": "SESSION 10 — Apr 06 2026"
    },
    {
      "ticker": "NXE",
      "company": "NexGen Energy Ltd",
      "sector": "Uranium — Developer (Pre-Production)",
      "exchange": "NYSE",
      "priority": "TIER 2 — WATCHLIST, LONG DURATION",
      "currentPrice": 11.73,
      "entryZone": "$10-11",
      "stopSuggested": 8.5,
      "targetEoY2028": 25,
      "impliedUpside": "+100%+ from entry zone (3-5yr horizon)",
      "allocationUSD": 2500,
      "thesis": "Long-duration uranium developer. Arrow deposit (Saskatchewan) is world highest-grade undeveloped uranium project. C$950M equity raise secures runway to production. Positioned to meet 20% of global uranium demand post-2026 per analyst estimates. Complements CCJ (producer) and LEU (enricher) with pre-production leverage. Very low Tuesday exposure — structural multi-year nuclear thesis play.",
      "keyRisks": "Pre-production — no revenue until late 2020s. Permitting risk. Dilution from further raises. Canadian regulatory timeline. Different risk profile to CCJ/LEU.",
      "catalyst": "Arrow project regulatory milestones; uranium spot price; nuclear buildout acceleration; partner agreements",
      "entryTriggers": [
        "NXE pulls to $10-11 entry zone",
        "Arrow project permitting milestone confirmed",
        "Uranium spot above $80/lb sustained",
        "MMD price in $9.50-11.50 range on entry day"
      ],
      "avoidIf": "Major permitting setback; uranium spot collapses; further large equity dilution",
      "decisionNote": "SESSION 10: Lower priority than CF/MP/GEV. Pre-production risk. Portfolio already has CCJ and LEU. Only add if specifically extending uranium exposure long-duration.",
      "source": "Extended Scan — Session 10",
      "addedSession": "SESSION 10 — Apr 06 2026",
      "status": "WATCHLIST — LOWER PRIORITY. LONG DURATION ONLY.",
      "entryVerdict": "ENTER — Tranche 1, this week",
      "annualisedReturn": "29%",
      "tranche": 1,
      "returnFilterApplied": "20% min annualised — SESSION 10",
      "readinessStatus": "TRANCHE 1 — ENTER WHEN PRICE OPTIMAL",
      "urgency": "MEDIUM",
      "tuesdayExposure": "VERY LOW",
      "priceVsEntry": "AT ENTRY ($11.73)",
      "nextAction": "Enter at market. Long-duration. No urgency but no downside to early entry.",
      "baselinedSession": "SESSION 10 — Apr 06 2026"
    },
    {
      "ticker": "PPTA",
      "company": "Perpetua Resources Corp",
      "sector": "Critical Minerals — Antimony + Gold",
      "exchange": "NASDAQ",
      "priority": "TIER 1 — HIGH CONVICTION CRITICAL MINERALS",
      "currentPrice": 29.43,
      "entryZone": "$25-28",
      "stopSuggested": 21,
      "targetEoY2027": 55,
      "impliedUpside": "+90% from entry zone (multi-year)",
      "allocationUSD": 3000,
      "thesis": "ONLY US antimony mine in development. Stibnite Gold Project Idaho — would provide 35% of US antimony demand. Critical for: flame retardants, munitions, semiconductors, batteries. Gold byproduct provides revenue floor. $2B+ EXIM financing decision SPRING 2026 — this is the near-term binary catalyst. DoD backing. Early Works construction already underway. China controls 60% of global antimony — any Chinese export restriction = PPTA price spike. Bipartisan support (Idaho senators, DoD). Spring 2026 EXIM financing decision is the stock catalyst.",
      "keyRisks": "Pre-production — no revenue until ~2028. Environmental permitting complexity (Idaho wilderness adjacent). EXIM financing rejection would be severe negative. Morningstar notes 576% premium to NAV — richly priced.",
      "catalyst": "Spring 2026 EXIM $2B+ financing decision; FAST-41 permitting milestones; Final Investment Decision; China antimony export restrictions",
      "entryTriggers": [
        "EXIM financing decision pending (spring 2026 — watch closely)",
        "PPTA pulls back to $25-28 on any market weakness",
        "Environmental permitting milestone confirmed",
        "No adverse EXIM or DoD decision",
        "MMD price verified in $24-30 range on entry day"
      ],
      "avoidIf": "EXIM financing rejected; major permitting setback; antimony prices collapse; breaks below $20",
      "decisionNote": "SESSION 10: Added as part of US Critical Minerals thesis. EXIM spring 2026 financing decision is the near-term binary. Pullback to $25-28 is the entry. Gold floor provides downside protection. Only US antimony source.",
      "thesisCategory": "US CRITICAL MINERALS",
      "source": "Critical Minerals Thesis — Session 10",
      "addedSession": "SESSION 10 — Apr 06 2026",
      "status": "WATCHLIST — AWAIT $25-28 OR EXIM CATALYST",
      "entryVerdict": "ENTER — Tranche 1, this week",
      "annualisedReturn": "37%",
      "tranche": 1,
      "returnFilterApplied": "20% min annualised — SESSION 10",
      "readinessStatus": "TRANCHE 1 — ENTER WHEN PRICE OPTIMAL",
      "urgency": "HIGH",
      "tuesdayExposure": "VERY LOW",
      "priceVsEntry": "AT ENTRY ($29.43)",
      "nextAction": "Enter at market when cash available. EXIM spring catalyst.",
      "baselinedSession": "SESSION 10 — Apr 06 2026"
    },
    {
      "ticker": "FCX",
      "company": "Freeport-McMoRan Inc",
      "sector": "Critical Minerals — Copper (Primary)",
      "exchange": "NYSE",
      "priority": "TIER 1 — COPPER KING",
      "currentPrice": 61.38,
      "entryZone": "$55-60",
      "stopSuggested": 48,
      "targetEoY2026": 85,
      "impliedUpside": "+40-50% from entry zone",
      "allocationUSD": 4000,
      "thesis": "Largest US copper producer + global scale. Copper is THE critical mineral for electrification, grid buildout, AI data centres (wiring), defence systems, and EVs. Trump 50% copper import tariff (summer 2025) is a direct FCX benefit — domestic producer protected. Copper demand is structurally exploding: each EV uses 4x more copper than ICE vehicle. Each data centre uses massive copper wiring. Grid buildout requires enormous copper conductor runs. Bingham Canyon Utah mine (largest open pit mine on earth) + global Grasberg Indonesia (recovering from landslide). Very low Tuesday exposure — copper demand is structural and multi-decade.",
      "keyRisks": "Indonesia Grasberg mine recovery (landslide 2025 — Goldman estimated 525K metric ton supply loss). Commodity cycle sensitivity. Indonesia political risk. Debt load.",
      "catalyst": "Grasberg recovery confirmation; copper tariff implementation; Q1 earnings; US grid infrastructure bill; AI capex driving copper demand data",
      "entryTriggers": [
        "FCX pulls to $55-60 entry zone",
        "Grasberg mine recovery confirmed operational",
        "Copper price holds above $4/lb",
        "No adverse Indonesia political development",
        "MMD price verified in $54-62 range on entry day"
      ],
      "avoidIf": "Copper demand destruction from recession; Grasberg further delays; Indonesia nationalisation risk; breaks below $50",
      "decisionNote": "SESSION 10: Added as core US Critical Minerals play. Copper is the most underappreciated critical mineral — demand is exploding from AI/grid/EVs. FCX is the largest US producer. Trump tariff is tailwind. Entry $55-60.",
      "thesisCategory": "US CRITICAL MINERALS",
      "source": "Critical Minerals Thesis — Session 10",
      "addedSession": "SESSION 10 — Apr 06 2026",
      "status": "WATCHLIST — ENTRY $55-60 ON PULLBACK",
      "entryVerdict": "ENTER — Tranche 1, this week",
      "annualisedReturn": "47%",
      "tranche": 1,
      "returnFilterApplied": "20% min annualised — SESSION 10",
      "readinessStatus": "TRANCHE 1 — ENTER WHEN PRICE OPTIMAL",
      "urgency": "HIGH",
      "tuesdayExposure": "LOW",
      "priceVsEntry": "AT ENTRY ($61.38)",
      "nextAction": "Enter at market when cash available. Copper tariff in force.",
      "baselinedSession": "SESSION 10 — Apr 06 2026"
    },
    {
      "ticker": "ALB",
      "company": "Albemarle Corporation",
      "sector": "Critical Minerals — Lithium",
      "exchange": "NYSE",
      "priority": "TIER 2 — CONTRARIAN LITHIUM GIANT",
      "currentPrice": 178.09,
      "entryZone": "$155-170",
      "stopSuggested": 135,
      "targetEoY2027": 280,
      "impliedUpside": "+65% from entry zone (multi-year)",
      "allocationUSD": 3500,
      "thesis": "Largest US lithium producer — Silver Peak Nevada mine (only US lithium brine operation), Kings Mountain NC spodumene restart (Trump fast-tracking). DEEP VALUE CONTRARIAN: ALB hammered -57% in last 12 months as Chinese predatory pricing destroyed lithium prices (lithium down 80% in 2024). But: US IRA domestic content requirements, EV mandate acceleration, and Trump critical minerals policy all support lithium price recovery. ALB has the balance sheet ($2.3B raised March 2025), the assets, the customer relationships (all major EV makers). 20% lithium sales volume CAGR guidance 2022-2027. Kings Mountain restart is the 2026/2027 catalyst. This is a patient multi-year trade.",
      "keyRisks": "Lithium price remains depressed if China continues predatory pricing. Equity dilution history. Long capital cycle. Recovery timeline uncertain.",
      "catalyst": "Lithium price recovery; Kings Mountain NC restart timeline; IRA domestic content enforcement; Chinese lithium production cuts; Q1 2026 earnings",
      "entryTriggers": [
        "ALB pulls to $155-170 entry zone",
        "Lithium carbonate price stabilises above $12,000/tonne",
        "Kings Mountain restart capital decision confirmed",
        "Chinese lithium overproduction shows signs of rationalisation",
        "MMD price in $154-175 range on entry day"
      ],
      "avoidIf": "Chinese predatory pricing continues another 12 months; EV demand collapses; Kings Mountain permitting fails; breaks below $140",
      "decisionNote": "SESSION 10: CONTRARIAN LITHIUM PLAY. ALB is a great company at a potentially distressed price. Patience required. Lithium is the MOST critical battery mineral — US has almost no domestic production. ALB solves that. Multi-year hold minimum.",
      "thesisCategory": "US CRITICAL MINERALS",
      "source": "Critical Minerals Thesis — Session 10",
      "addedSession": "SESSION 10 — Apr 06 2026",
      "status": "WATCHLIST — CONTRARIAN, PATIENT ENTRY $155-170",
      "entryVerdict": "ENTER — Tranche 1, this week (contrarian, patient)",
      "annualisedReturn": "35%",
      "tranche": 1,
      "returnFilterApplied": "20% min annualised — SESSION 10",
      "readinessStatus": "TRANCHE 1 — ENTER WHEN PRICE OPTIMAL",
      "urgency": "MEDIUM",
      "tuesdayExposure": "LOW",
      "priceVsEntry": "APPROACHING entry ($178 vs $155-170 target)",
      "nextAction": "Wait for dip to $155-170. Not yet at optimal entry.",
      "baselinedSession": "SESSION 10 — Apr 06 2026"
    },
    {
      "ticker": "LAC",
      "company": "Lithium Americas Corp",
      "sector": "Critical Minerals — Lithium Developer",
      "exchange": "NYSE",
      "priority": "TIER 3 — SPECULATIVE LOTTERY TICKET",
      "currentPrice": 4.04,
      "entryZone": "$3.50-4.00",
      "stopSuggested": 2.5,
      "targetEoY2028": 15,
      "impliedUpside": "+275% from entry (pre-production speculation)",
      "allocationUSD": 1500,
      "thesis": "Thacker Pass Nevada — largest lithium deposit in the United States. US government took direct equity stake as part of GM joint venture. DoD and EXIM backing. Pre-production but well-funded. If Thacker Pass produces at full capacity, LAC becomes a top-5 global lithium supplier. At $4 — this is a lottery ticket on the thesis that US lithium independence happens. Very small allocation appropriate. This is the highest-risk/highest-reward name in the critical minerals basket.",
      "keyRisks": "Pre-production — no revenue. Lithium prices must recover. GM JV execution risk. Environmental opposition (Nevada desert). Very long timeline to production. Capital raise dilution risk.",
      "catalyst": "Thacker Pass construction milestones; GM JV funding confirmation; lithium price recovery; DoD/EXIM additional funding; first production",
      "entryTriggers": [
        "Price at or below $4 entry zone",
        "Construction milestone confirmed",
        "No major environmental injunction",
        "Lithium price shows recovery signals"
      ],
      "avoidIf": "Major permitting setback; GM exits JV; breaks below $2.50; further equity dilution at distressed prices",
      "decisionNote": "SESSION 10: LOTTERY TICKET SIZING ONLY ($1,500 max). Highest risk in the critical minerals basket but also highest upside if Thacker Pass succeeds. US government equity stake provides floor support.",
      "thesisCategory": "US CRITICAL MINERALS",
      "source": "Critical Minerals Thesis — Session 10",
      "addedSession": "SESSION 10 — Apr 06 2026",
      "status": "WATCHLIST — SPECULATIVE. MAX $1,500 ALLOCATION.",
      "entryVerdict": "ENTER — Tranche 1, this week (lottery ticket, max $1,500)",
      "annualisedReturn": "69%",
      "tranche": 1,
      "returnFilterApplied": "20% min annualised — SESSION 10",
      "readinessStatus": "TRANCHE 1 — LOTTERY TICKET ONLY",
      "urgency": "LOW",
      "tuesdayExposure": "VERY LOW",
      "priceVsEntry": "AT ENTRY ($4.04)",
      "nextAction": "Enter $1,500 max at market. Accept loss risk.",
      "baselinedSession": "SESSION 10 — Apr 06 2026"
    },
    {
      "ticker": "REMX",
      "company": "VanEck Rare Earth/Strategic Metals ETF",
      "sector": "Critical Minerals — Diversified ETF",
      "exchange": "NYSE",
      "priority": "TIER 2 — DIVERSIFIED EXPOSURE",
      "currentPrice": 88.9,
      "entryZone": "$82-88",
      "stopSuggested": 72,
      "targetEoY2027": 130,
      "impliedUpside": "+48% from entry zone",
      "allocationUSD": 3000,
      "thesis": "Broadest single-instrument exposure to the entire critical minerals supply chain. Holdings include rare earth producers, lithium miners, cobalt producers, and strategic metals companies across US, Canada, Australia, and Allied nations. Lower single-name risk than individual miners. Appropriate as a CORE holding in the critical minerals thesis with individual names as satellite additions. No China exposure at fund level.",
      "keyRisks": "ETF expense ratio drag. Holdings include non-US companies which may not benefit equally from US policy. Market-cap weighted so dominated by large producers.",
      "catalyst": "Trump critical minerals EOs; China export restriction escalation; Project Vault capital deployment; Allied minerals investment wave",
      "entryTriggers": [
        "REMX pulls to $82-88 entry zone",
        "Policy catalyst confirmed (EXIM, Section 232)",
        "China escalates rare earth export controls (paradoxically bullish for REMX)"
      ],
      "avoidIf": "Peace deal leads to China minerals détente; ETF breaks below $72",
      "decisionNote": "SESSION 10: Consider as the anchor/core position in the critical minerals basket. Individual stocks (MP, PPTA, FCX, ALB) are satellites. REMX provides baseline exposure with lower single-name risk.",
      "thesisCategory": "US CRITICAL MINERALS",
      "source": "Critical Minerals Thesis — Session 10",
      "addedSession": "SESSION 10 — Apr 06 2026",
      "status": "WATCHLIST — CORE ETF, ENTRY $82-88",
      "entryVerdict": "ENTER — Tranche 1, this week",
      "annualisedReturn": "29%",
      "tranche": 1,
      "returnFilterApplied": "20% min annualised — SESSION 10",
      "readinessStatus": "TRANCHE 1 — ENTER WHEN PRICE OPTIMAL",
      "urgency": "MEDIUM",
      "tuesdayExposure": "LOW",
      "priceVsEntry": "AT ENTRY ($88.90)",
      "nextAction": "Enter at market. Core ETF, diversified, lowest risk in basket.",
      "baselinedSession": "SESSION 10 — Apr 06 2026"
    },
    {
      "ticker": "UUUU",
      "company": "Energy Fuels Inc",
      "sector": "Critical Minerals — Uranium + Rare Earths",
      "exchange": "NYSE",
      "priority": "TIER 2 — DUAL THESIS PLAY",
      "currentPrice": 17.75,
      "entryZone": "$15-17",
      "stopSuggested": 12,
      "targetEoY2027": 32,
      "impliedUpside": "+88% from entry zone",
      "allocationUSD": 2500,
      "thesis": "UNIQUE DUAL THESIS: (1) US uranium enrichment — White Mesa Mill Utah is only conventional uranium mill in US; benefits from Hormuz nuclear thesis and domestic uranium preference. (2) Rare earth carbonate processing — only US facility processing rare earth carbonate from monazite. Bridges the gap between mining and magnet manufacturing. DoD contract. At $17.75 has pulled back from recent highs. Both the Hormuz nuclear thesis AND the US critical minerals independence thesis apply simultaneously.",
      "keyRisks": "Smaller company, less liquid than MP. Uranium price cyclicality. Rare earth processing ramp-up complexity. Share dilution risk.",
      "catalyst": "Uranium price moves; rare earth processing scale-up; DoD contract milestones; Chinese export control escalation",
      "entryTriggers": [
        "Price pulls to $15-17 entry zone",
        "Uranium spot above $80/lb",
        "Rare earth processing contracts announced",
        "MMD verified in $14-18 range"
      ],
      "avoidIf": "Uranium price collapse; rare earth processing fails to scale; breaks below $12",
      "decisionNote": "SESSION 10: Dual-thesis play — fits BOTH Hormuz nuclear thesis AND US critical minerals thesis. Entry $15-17 on pullback.",
      "thesisCategory": "US CRITICAL MINERALS + HORMUZ NUCLEAR",
      "source": "Critical Minerals Thesis — Session 10",
      "addedSession": "SESSION 10 — Apr 06 2026",
      "status": "WATCHLIST — ENTRY $15-17 ON PULLBACK",
      "entryVerdict": "ENTER — Tranche 1, this week",
      "annualisedReturn": "48%",
      "tranche": 1,
      "returnFilterApplied": "20% min annualised — SESSION 10",
      "readinessStatus": "TRANCHE 1 — ENTER WHEN PRICE OPTIMAL",
      "urgency": "HIGH",
      "tuesdayExposure": "LOW",
      "priceVsEntry": "AT ENTRY ($17.75)",
      "nextAction": "Enter at market when cash available. Dual thesis.",
      "baselinedSession": "SESSION 10 — Apr 06 2026"
    }
  ],
  "secondaryThesis": {
    "criticalMinerals": {
      "title": "US CRITICAL MINERALS INDEPENDENCE — LONG-TERM STRUCTURAL THESIS",
      "addedSession": "SESSION 10 — Apr 06 2026",
      "horizon": "5-10 YEARS",
      "urgency": "HIGH — policy acceleration unprecedented under Trump",
      "summary": "US is 100% import-dependent on China for 12 critical minerals and >50% dependent on 29 more. China controls 60-90% of global processing capacity for rare earths, graphite, lithium, cobalt. China has demonstrated willingness to weaponize this via export controls (gallium 2023, germanium 2023, rare earths 2025). This is a STRUCTURAL national security emergency — bipartisan consensus for the first time in decades. Policy acceleration: $12B Project Vault, 50-nation minerals bloc, Section 232 investigation on processed minerals, DoD DPA Title III funding, direct government equity stakes in miners. Convergence of 4 demand drivers: (1) Military — every F-35, drone, missile uses rare earth magnets; (2) AI/data centres — copper wiring, backup batteries, motors; (3) EVs/electrification — lithium, cobalt, nickel, graphite; (4) Grid buildout — copper, rare earths for transformers. Timeline: buy BEFORE production — projects 2026-2028 setup, 2028-2032 production = when stock returns materialise.",
      "chinaWeapons": [
        "Rare earth export controls and licensing requirements (2025)",
        "Gallium and germanium export bans (2023, escalated 2025)",
        "Predatory pricing to destroy western mine economics (lithium -80% in 2024)",
        "Processing technology restrictions preventing western supply chain build",
        "Controls 40-90% of processing capacity even for minerals it does not mine"
      ],
      "usVulnerabilities": [
        "100% import dependent: arsenic, asbestos, caesium, fluorspar, gallium, graphite (natural), indium, manganese, niobium, rubidium, scandium, tantalum, yttrium",
        ">75% import dependent: rare earth elements, bismuth, germanium, tellurium",
        "Zero domestic rare earth magnet manufacturing at scale",
        "Zero domestic battery-grade graphite production",
        "Minimal domestic antimony (100% Chinese/Russian sourced until PPTA)",
        "US closed Bureau of Mines in 1996 — lost institutional knowledge"
      ],
      "policyTailwinds": [
        "Jan 2026: Trump EO — Section 232 investigation on processed critical minerals",
        "Feb 2026: Project Vault — $12B strategic stockpile ($10B EXIM + $2B private)",
        "Feb 2026: 54-nation Critical Minerals Ministerial — 11 new MOUs signed",
        "Feb 2026: US direct equity stake in Lithium Americas (Thacker Pass)",
        "DoD DPA Title III: direct grants to MP Materials, Energy Fuels, NOVONIX, Perpetua",
        "One Big Beautiful Bill Act: permitting streamlining for critical mineral projects",
        "50% copper import tariff (Trump, summer 2025)"
      ],
      "supplyChainLayers": {
        "miningLayer": [
          "MP Materials (MP) — rare earths Mountain Pass CA",
          "Freeport-McMoRan (FCX) — copper, Bingham Canyon UT + global",
          "Perpetua Resources (PPTA) — antimony + gold, Stibnite ID",
          "Lithium Americas (LAC) — lithium, Thacker Pass NV (US govt stake)",
          "Energy Fuels (UUUU) — uranium + rare earth, White Mesa UT"
        ],
        "processingLayer": [
          "MP Materials — rare earth oxide + magnet alloy Fort Worth TX",
          "Energy Fuels — rare earth carbonate processing (only US facility)",
          "Albemarle (ALB) — lithium carbonate/hydroxide conversion",
          "NOVONIX (NVX) — synthetic graphite Tennessee (DoD funded)"
        ],
        "manufacturingLayer": [
          "MP Materials — permanent magnets (Fort Worth, ramping 2026-27)",
          "Gap: almost zero US rare earth magnet manufacturing at scale",
          "Gap: zero US battery-grade graphite production"
        ],
        "etfLayer": [
          "REMX — VanEck Rare Earth/Strategic Metals ETF — broadest exposure"
        ]
      }
    }
  },
  "entryPlan": {
    "lastUpdated": "2026-04-06 SESSION 10",
    "filterApplied": "20% minimum annualised return",
    "totalWatchlistScreened": 19,
    "passed": 17,
    "failedAtCurrentPrice": 1,
    "waitForDip": 1,
    "tranche1_enterNow": {
      "description": "LOW TUESDAY EXPOSURE — Enter this week regardless of Tuesday outcome",
      "totalCapital": 26500,
      "positions": [
        {
          "ticker": "MP",
          "entry": 49.73,
          "stop": 38,
          "alloc": 3500,
          "annReturn": "35%",
          "holdMonths": 24,
          "priority": 1
        },
        {
          "ticker": "FCX",
          "entry": 61.38,
          "stop": 48,
          "alloc": 4000,
          "annReturn": "47%",
          "holdMonths": 12,
          "priority": 1
        },
        {
          "ticker": "UUUU",
          "entry": 17.75,
          "stop": 12,
          "alloc": 2500,
          "annReturn": "48%",
          "holdMonths": 18,
          "priority": 1
        },
        {
          "ticker": "PPTA",
          "entry": 29.43,
          "stop": 21,
          "alloc": 3000,
          "annReturn": "37%",
          "holdMonths": 24,
          "priority": 1
        },
        {
          "ticker": "HAL",
          "entry": 38.17,
          "stop": 30,
          "alloc": 3000,
          "annReturn": "36%",
          "holdMonths": 12,
          "priority": 2
        },
        {
          "ticker": "REMX",
          "entry": 88.9,
          "stop": 72,
          "alloc": 3000,
          "annReturn": "29%",
          "holdMonths": 18,
          "priority": 2
        },
        {
          "ticker": "NXE",
          "entry": 11.73,
          "stop": 8.5,
          "alloc": 2500,
          "annReturn": "29%",
          "holdMonths": 30,
          "priority": 3
        },
        {
          "ticker": "LAC",
          "entry": 4.04,
          "stop": 2.5,
          "alloc": 1500,
          "annReturn": "69%",
          "holdMonths": 30,
          "priority": 3,
          "note": "LOTTERY TICKET — max $1,500"
        },
        {
          "ticker": "ALB",
          "entry": 178.09,
          "stop": 135,
          "alloc": 3500,
          "annReturn": "35%",
          "holdMonths": 18,
          "priority": 2,
          "note": "CONTRARIAN — patient hold"
        }
      ]
    },
    "tranche2_postTuesday": {
      "description": "HIGH HORMUZ EXPOSURE — Enter within 48hrs of Tuesday resolution",
      "totalCapital": 25800,
      "cashConstraint": "May exceed available cash — prioritise LNG, OXY, RTX, BKR first",
      "priorityOrder": [
        "LNG",
        "OXY",
        "RTX",
        "BKR",
        "STNG",
        "BKNG",
        "AER"
      ],
      "positions": [
        {
          "ticker": "LNG",
          "entry": 281.16,
          "stop": 240,
          "alloc": 5500,
          "annReturn": "60%",
          "holdMonths": 9,
          "enterCondition": "Hormuz remains restricted post-Tuesday"
        },
        {
          "ticker": "OXY",
          "entry": 62.97,
          "stop": 54,
          "alloc": 4500,
          "annReturn": "73%",
          "holdMonths": 9,
          "enterCondition": "WTI holds above $95 post-event"
        },
        {
          "ticker": "RTX",
          "entry": 196.21,
          "stop": 173,
          "alloc": 3800,
          "annReturn": "34%",
          "holdMonths": 9,
          "enterCondition": "Defence sector holds or rallies"
        },
        {
          "ticker": "BKR",
          "entry": 60.38,
          "stop": 51,
          "alloc": 3000,
          "annReturn": "58%",
          "holdMonths": 9,
          "enterCondition": "Energy capex confirmed sustained; enter $57-61"
        },
        {
          "ticker": "STNG",
          "entry": 76.43,
          "stop": 63,
          "alloc": 2500,
          "annReturn": "53%",
          "holdMonths": 9,
          "enterCondition": "Tanker rates rising; Hormuz extended confirmed"
        },
        {
          "ticker": "BKNG",
          "entry": 167.77,
          "stop": 148,
          "alloc": 3500,
          "annReturn": "70%",
          "holdMonths": 9,
          "enterCondition": "Stabilisation signal; enter on Tuesday dip $158-165"
        },
        {
          "ticker": "AER",
          "entry": 139.18,
          "stop": 118,
          "alloc": 3000,
          "annReturn": "47%",
          "holdMonths": 12,
          "enterCondition": "Post-Tuesday clarity; no airline stress"
        }
      ]
    },
    "tranche3_onTrigger": {
      "description": "PRICE TRIGGER ONLY — Do not chase. Enter when price zone hit.",
      "positions": [
        {
          "ticker": "NVDA",
          "triggerPrice": 167.5,
          "stop": 145,
          "alloc": 4000,
          "annReturn": "47%",
          "holdMonths": 12,
          "currentPrice": 177.39,
          "note": "Risk-off dip required; Tuesday may create entry"
        },
        {
          "ticker": "CF",
          "triggerPrice": 115,
          "stop": 95,
          "alloc": 4000,
          "annReturn": "32%",
          "holdMonths": 9,
          "currentPrice": 129.97,
          "note": "DOJ fear or peace sell-off creates entry"
        },
        {
          "ticker": "GEV",
          "triggerPrice": 835,
          "stop": 750,
          "alloc": 4500,
          "annReturn": "20%",
          "holdMonths": 18,
          "currentPrice": 898.57,
          "note": "FAILS threshold at current price — wait"
        }
      ]
    },
    "existingPortfolioAudit": {
      "meetsThreshold": [
        "PLTR(48%)",
        "LEU(36%)",
        "LDO(28%)",
        "R3NK(31%)",
        "RR.(24%)",
        "CCJ(24%)",
        "VST(29%)",
        "AVAV(25%)",
        "ITM(44%)",
        "AMPX(100% spec)",
        "CODA(51%)",
        "PDYN(116% spec)"
      ],
      "borderline": [
        "AMZN(17% — hold for portfolio function)",
        "SHLD(18% — hold for portfolio function)"
      ],
      "action": "Hold all. AMZN and SHLD serve hedging/diversification role despite borderline return — both profit-stopped and protected."
    }
  },
  "fullScanProtocol": {
    "version": "3.0",
    "addedSession": "S14",
    "description": "Machine-readable scan execution spec. When trigger phrase detected, execute ALL sections A-K in strict sequence. No improvisation on tool selection or query wording — use spec exactly as written.",
    "triggerPhrases": [
      "full scan",
      "FULL SCAN",
      "morning scan",
      "run scan",
      "full scan and",
      "run full scan"
    ],
    "preOpenTriggerPhrases": [
      "pre-open check",
      "pre open check",
      "16:30 check"
    ],
    "sections": [
      {
        "id": "A",
        "name": "IBKR Cross-Check",
        "mode": "human_input_required",
        "instruction": "User provides IBKR screenshots (Positions + Orders tabs). Compare every row against positions[] and pendingOrders[]. IBKR is ground truth — overrides all other sources. Check: missing positions, fill price vs estimate, stop TIF (GTC not DAY), order count match, GBP cash deficit (RR/ITM funding). Never re-flag confirmed fills."
      },
      {
        "id": "B",
        "name": "Iran / Oil / Hormuz / Thesis",
        "mode": "auto",
        "tools": [
          "web_search",
          "web_fetch",
          "apify_rag_browser"
        ],
        "primarySources": [
          {
            "source": "Reuters",
            "query": "Iran Hormuz ceasefire oil today",
            "url": "reuters.com/world/middle-east"
          },
          {
            "source": "Al Jazeera",
            "query": "Iran war ceasefire update today"
          },
          {
            "source": "WTI/Brent price",
            "tool": "web_search",
            "query": "WTI Brent crude oil price today"
          },
          {
            "source": "EIA",
            "url": "eia.gov/petroleum",
            "notes": "Weekly petroleum status report — Wednesdays"
          },
          {
            "source": "Tanker tracking",
            "query": "Strait Hormuz tanker traffic today ship tracking"
          },
          {
            "source": "OPEC",
            "query": "OPEC statement oil production today"
          }
        ],
        "additionalSources": [
          {
            "source": "OilPrice.com",
            "url": "oilprice.com",
            "notes": "Energy sector commentary and upstream news"
          },
          {
            "source": "Platts/OPIS",
            "query": "Platts oil price Middle East today"
          },
          {
            "source": "MarineTraffic",
            "query": "site:marinetraffic.com Hormuz tanker"
          }
        ],
        "si25Check": "Confirm SI-25 exit trigger NOT activated. Trigger = formal Hormuz reopening confirmed + oil drops >10% from post-reopening peak. State explicitly: TRIGGERED / NOT TRIGGERED.",
        "output": "Thesis: INTACT/MODIFIED/EXIT TRIGGERED | Oil WTI/Brent | Hormuz status | Key development."
      },
      {
        "id": "C",
        "name": "Portfolio Positions — Price + Regulatory",
        "mode": "auto",
        "tools": [
          "eodhd_primary",
          "mmd_backup",
          "ibkr_screenshots_ground_truth"
        ],
        "priceTools": {
          "primary": "EODHD get_historical_stock_prices — use for ALL positions. Format: SYMBOL.EXCHANGE. RR.LSE, ITM.LSE, AAPL.US, CCJ.US etc.",
          "backup_us": "MMD /v2/aggs/ticker/{ticker}/prev — if EODHD unavailable for US names",
          "backup_eu_uk": "Yahoo Finance web_fetch — if EODHD LSE/Euronext subscription not active",
          "ground_truth": "IBKR screenshot — always overrides",
          "fundamentals": "EODHD get_fundamentals_data — run for ISRG, MSFT, ABVX each session (P/E, revenue, EPS context)",
          "insider_transactions": "EODHD get_insider_transactions — replaces SEC EDGAR Form 4 web scraping. Run for all held US names."
        },
        "regulatoryChecks": {
          "description": "FOR EVERY HELD US POSITION — run SEC EDGAR check for new filings in past 48hrs",
          "form4_insider": {
            "what": "Form 4 — insider buy/sell transactions. CRITICAL signal. Executive selling before earnings = warning. Insider buying = conviction signal.",
            "tool": "web_fetch",
            "url_template": "https://efts.sec.gov/LATEST/search-index?q=%22{TICKER}%22&forms=4&dateRange=custom&startdt={yesterday}&enddt={today}",
            "apify_actor": "constant_quadruped/sec-edgar-filings-scraper",
            "priority": "HIGH — check every session for all US positions"
          },
          "form8k_material": {
            "what": "8-K — material corporate events. Contract wins, CEO changes, guidance updates, M&A activity. Often filed before press release hits news.",
            "url_template": "https://efts.sec.gov/LATEST/search-index?q=%22{TICKER}%22&forms=8-K&dateRange=custom&startdt={yesterday}&enddt={today}",
            "priority": "HIGH — check every session"
          },
          "formS3_dilution": {
            "what": "S-3/S-1 — equity offerings, dilution warnings. CRITICAL for small caps: AMPX, CODA, PDYN, ABVX.",
            "url_template": "https://efts.sec.gov/LATEST/search-index?q=%22{TICKER}%22&forms=S-3,S-1&dateRange=custom&startdt={7days_ago}&enddt={today}",
            "smallCapTickers": [
              "AMPX",
              "CODA",
              "PDYN",
              "ABVX"
            ],
            "priority": "HIGH for small caps — weekly minimum"
          },
          "form13F_institutional": {
            "what": "13F — quarterly institutional position changes. Large fund exits = distribution warning. New entries = validation signal.",
            "frequency": "Quarterly filings (Feb, May, Aug, Nov deadlines). Check during earnings season.",
            "priority": "MEDIUM — check quarterly or when position >3% drawdown"
          }
        },
        "stopGapCheck": "Flag any position within 3% of stop as WARNING. Within 1% as CRITICAL.",
        "output": "Table: ticker | last | stop | gap% | flag | new_filings (Form4/8K/S3)"
      },
      {
        "id": "D",
        "name": "European Defence Watchlist",
        "mode": "auto",
        "tools": [
          "web_search",
          "web_fetch",
          "apify_rag_browser"
        ],
        "primarySources": [
          {
            "source": "Defense News",
            "url": "defensenews.com",
            "query": "European defence contract rearmament today"
          },
          {
            "source": "Breaking Defense",
            "url": "breakingdefense.com",
            "query": "NATO European defence news today"
          },
          {
            "source": "Jane's",
            "query": "Janes defence news R3NK RENK Leonardo today"
          },
          {
            "source": "Shephard Media",
            "url": "shephardmedia.com",
            "notes": "Defence procurement intelligence"
          },
          {
            "source": "EU Defence Agency",
            "url": "eda.europa.eu/news-and-events/news",
            "notes": "EDA procurement announcements"
          }
        ],
        "additionalSources": [
          {
            "source": "RENK Group IR",
            "url": "renk-group.com/en/investor-relations/",
            "notes": "Direct R3NK press releases"
          },
          {
            "source": "Leonardo IR",
            "url": "leonardocompany.com/en/investors",
            "notes": "LDO press releases and contracts"
          },
          {
            "source": "NATO procurement",
            "query": "NATO procurement contract award 2026 Europe"
          }
        ],
        "watchlistNames": [
          "R3NK",
          "LDO",
          "HAG",
          "RHM",
          "KNDS",
          "Thales",
          "BAE Systems"
        ],
        "output": "Reentry signals for R3NK (target €46-49). New EU defence budget/contract developments. Any sector repricing."
      },
      {
        "id": "E",
        "name": "Nuclear & Uranium",
        "mode": "auto",
        "tools": [
          "web_search",
          "web_fetch"
        ],
        "primarySources": [
          {
            "source": "World Nuclear News",
            "url": "world-nuclear-news.org",
            "query": "uranium nuclear energy news today"
          },
          {
            "source": "WNA",
            "url": "world-nuclear.org/information-library",
            "notes": "World Nuclear Association — policy and data"
          },
          {
            "source": "NEI",
            "url": "nei.org/news",
            "notes": "Nuclear Energy Institute — US policy"
          },
          {
            "source": "UxC",
            "query": "uranium spot price UxC today",
            "notes": "Uranium spot/term price benchmark"
          },
          {
            "source": "NRC",
            "url": "nrc.gov/reading-rm/doc-collections/news",
            "notes": "US Nuclear Regulatory Commission — incident/licence news"
          },
          {
            "source": "IAEA",
            "query": "IAEA nuclear news 2026"
          }
        ],
        "additionalSources": [
          {
            "source": "Cameco IR",
            "url": "cameco.com/investors/news",
            "notes": "Direct CCJ press releases — sometimes 6-8hrs before newswires"
          },
          {
            "source": "Rolls-Royce SMR",
            "url": "rolls-royce.com/innovation/small-modular-reactors.aspx",
            "notes": "RR SMR programme updates"
          },
          {
            "source": "Kazatomprom",
            "query": "Kazatomprom production output 2026",
            "notes": "Supply side check — CCJ competitor"
          }
        ],
        "scanItems": [
          "uranium spot price vs CCJ cost basis ($104)",
          "EU/UK nuclear policy",
          "RR SMR milestones",
          "Kazatomprom output vs guidance"
        ],
        "output": "Uranium spot price. CCJ thesis status. Reactor/policy news. Supply surprise flag."
      },
      {
        "id": "F",
        "name": "US Watchlist + Government Contracts",
        "mode": "auto",
        "tools": [
          "mmd_selective",
          "web_search",
          "web_fetch"
        ],
        "priceCheck": "MMD /v2/aggs/ticker/{ticker}/prev for all watchlistUS names",
        "governmentContracts": {
          "description": "CRITICAL for defence/tech watchlist names — contract awards often precede analyst upgrades by 24-72hrs",
          "sources": [
            {
              "source": "USASpending.gov",
              "url": "usaspending.gov",
              "query": "AVAV AeroVironment OR Kratos OR CODA Octopus contract award 2026 site:usaspending.gov"
            },
            {
              "source": "SAM.gov",
              "url": "sam.gov",
              "query": "AVAV OR Palladyne OR Amprius solicitation award 2026 site:sam.gov"
            },
            {
              "source": "DoD contract announcements",
              "url": "defense.gov/News/Contracts/",
              "notes": "Daily DoD contract list — check for any held/watchlist company names. Pentagon publishes every business day at 5PM ET."
            },
            {
              "source": "SBIR/STTR",
              "url": "sbir.gov",
              "notes": "R&D contracts relevant for AMPX, PDYN, CODA small-cap defence names"
            }
          ],
          "watchNames": [
            "AVAV",
            "KTOS",
            "CODA",
            "PDYN",
            "AMPX",
            "RTX"
          ]
        },
        "output": "ENTER NOW / APPROACHING / HOLD / DETERIORATING per watchlist name. Any DoD contract award for held/watch names."
      },
      {
        "id": "G",
        "name": "Speculative & EU Energy Basket",
        "mode": "auto",
        "tools": [
          "web_search",
          "web_fetch"
        ],
        "primarySources": [
          {
            "source": "Recharge News",
            "url": "rechargenews.com",
            "query": "green hydrogen electrolyser EU news today"
          },
          {
            "source": "H2 View",
            "url": "h2-view.com",
            "query": "hydrogen ITM Power electrolyser order 2026"
          },
          {
            "source": "Hydrogen Insight",
            "url": "hydrogeninsight.com",
            "notes": "Premium but headlines accessible — EU hydrogen contracts"
          },
          {
            "source": "EU Hydrogen Bank",
            "query": "EU Hydrogen Bank auction results 2026",
            "notes": "Direct subsidy signal"
          },
          {
            "source": "Ofgem / DESNZ",
            "query": "UK hydrogen policy announcement DESNZ 2026",
            "notes": "ITM direct policy risk"
          }
        ],
        "additionalSources": [
          {
            "source": "ITM Power IR",
            "url": "itm-power.com/investors",
            "notes": "Direct company announcements — often before mainstream news"
          },
          {
            "source": "Ceres Power IR",
            "url": "cerespower.com/investors/",
            "notes": "CWR.L direct announcements"
          },
          {
            "source": "Nel ASA announcements",
            "query": "Nel ASA order contract 2026",
            "notes": "ITM competitor — Nel wins = ITM threat"
          },
          {
            "source": "Enapter",
            "query": "Enapter electrolyser order 2026"
          }
        ],
        "watchlistNames": [
          "CWR.L",
          "AFC.L",
          "Enapter H2O.DE",
          "Alfen",
          "Yellow Cake YCA.L",
          "Ilika"
        ],
        "output": "Price-to-entry-zone alerts. EU hydrogen policy. Competitor order announcements."
      },
      {
        "id": "H",
        "name": "Congressional Trading + Political Signals",
        "mode": "auto",
        "tools": [
          "web_search",
          "web_fetch"
        ],
        "primarySources": [
          {
            "source": "Senate Stock Watcher",
            "url": "senatestockwatcher.com",
            "notes": "Aggregates Senate STOCK Act filings — best UI for quick scan"
          },
          {
            "source": "House Stock Watcher",
            "url": "housestockwatcher.com",
            "notes": "House disclosures aggregated"
          },
          {
            "source": "Quiver Quantitative",
            "url": "quiverquant.com/congresstrading",
            "notes": "Congressional trading with sector/committee metadata"
          },
          {
            "source": "Senate EDGAR direct",
            "url": "efts.senate.gov/LATEST/search-index",
            "notes": "Raw Senate filing search"
          },
          {
            "source": "House disclosures",
            "url": "disclosures.house.gov/FinancialDisclosure",
            "notes": "Raw House filing search"
          }
        ],
        "focusAreas": [
          "Armed Services Committee members — look for AVAV, KTOS, PLTR, RTX, CODA purchases",
          "Intelligence Committee — PLTR, MSFT, Palantir AI contracts",
          "Energy Committee — CCJ, VST, nuclear policy",
          "Any purchase in a held name BEFORE a known catalyst",
          "Trump family / close associates — Eric Trump XTEND pattern was a documented signal (S07)"
        ],
        "query": "congressional stock disclosure defence AI technology {MONTH} {YEAR} site:senatestockwatcher.com OR site:quiverquant.com",
        "output": "New disclosures in held or watchlist names. Committee membership noted. Flag any purchase within 30 days of known upcoming catalyst."
      },
      {
        "id": "I",
        "name": "Macro + Institutional Signals",
        "mode": "auto",
        "tools": [
          "web_search",
          "web_fetch",
          "eodhd_options",
          "eodhd_economic"
        ],
        "primarySources": [
          {
            "source": "Fed Watch",
            "query": "Federal Reserve CME FedWatch rate probability today"
          },
          {
            "source": "US 10Y yield",
            "query": "US 10 year Treasury yield today"
          },
          {
            "source": "VIX",
            "query": "VIX volatility index today"
          },
          {
            "source": "S&P premarket",
            "query": "S&P 500 futures premarket today"
          }
        ],
        "additionalSources": [
          {
            "source": "Options flow — Unusual Whales",
            "url": "unusualwhales.com",
            "query": "unusual options activity today {held_tickers}",
            "notes": "Smart money positioning. Particularly relevant pre-earnings for ISRG (Apr 21), MSFT (Apr 30), AMZN (Apr 23)"
          },
          {
            "source": "Short interest — Fintel",
            "query": "short interest {TICKER} today site:fintel.io",
            "notes": "Check ABVX short interest for squeeze potential. Check AMPX/PDYN for squeeze risk."
          },
          {
            "source": "13F alerts",
            "query": "13F institutional filing {TICKER} Q1 2026",
            "notes": "Watch for large fund entries/exits in held names"
          },
          {
            "source": "BLS / economic data",
            "query": "CPI PPI jobs data today 2026",
            "notes": "Inflation data affects Fed, rate-sensitive VST and AMZN"
          },
          {
            "source": "EIA Petroleum Status",
            "url": "eia.gov/petroleum/supply/weekly/",
            "notes": "Weekly Wednesday — crude inventory. Confirms/contradicts Hormuz supply thesis"
          }
        ],
        "output": "VIX. 10Y yield. S&P direction. Any unusual options in held names. Short interest flags. Fed news.",
        "eodhd": {
          "options_flow": "EODHD get_options_data — check ISRG, MSFT, AMZN options activity pre-earnings. Unusual volume = institutional positioning signal.",
          "economic_data": "EODHD get_economic_indicators — macro backdrop (inflation, GDP, rates) for VST and AMZN thesis context."
        }
      },
      {
        "id": "J",
        "name": "Errors Check",
        "mode": "auto_internal",
        "checks": [
          "timezone_accuracy: all event times in UAE GST",
          "price_verification: every price has MMD or IBKR source stated",
          "stop_tif_validation: new stops must be GTC not DAY",
          "confirmed_fill_not_reflagged: IBKR-confirmed fills not re-listed as actions",
          "position_count_match: positions[] count vs IBKR screenshot",
          "eu_market_timing: LSE/Euronext open 12:00 UAE, US 17:30 UAE",
          "stale_price: no prior session prices carried forward without re-verification",
          "source_date: all news citations must include publication date"
        ],
        "output": "ERRORS FOUND: [list] | NO ERRORS DETECTED."
      },
      {
        "id": "K",
        "name": "Sector Threat Monitor — Social + AI + Filings",
        "mode": "auto",
        "tools": [
          "web_search",
          "web_fetch",
          "apify_reddit",
          "apify_twitter",
          "apify_sec"
        ],
        "mandatoryQuery": {
          "query": "Anthropic OR OpenAI OR Google DeepMind OR Meta AI model announcement today",
          "note": "NON-NEGOTIABLE EVERY SESSION. Mythos miss (S13) rule.",
          "tool": "web_search"
        },
        "socialMediaSources": {
          "reddit": {
            "apify_actor": "benthepythondev/stock-sentiment-intelligence",
            "subreddits": [
              "wallstreetbets",
              "SecurityAnalysis",
              "investing",
              "stocks"
            ],
            "tickers_source": "positions[]",
            "query_pattern": "{TICKER} discussion mentions bullish bearish",
            "notes": "Particularly valuable for ABVX M&A rumours, PLTR/MSFT narrative shifts, small cap momentum. Run for any position >5% from stop."
          },
          "twitter_x": {
            "apify_actor": "pear_fight/twitter-scraper",
            "watchAccounts": [
              {
                "handle": "michaeljburry",
                "reason": "Short seller — pre-move thesis posts. Burry on PLTR was hours before -7% (S13 lesson)"
              },
              {
                "handle": "unusual_whales",
                "reason": "Options flow and congressional trades — real-time"
              },
              {
                "handle": "quiverquant",
                "reason": "Congressional trading disclosures as they file"
              },
              {
                "handle": "financialtimes",
                "reason": "FT breaking news on EU/UK positions"
              }
            ],
            "hashtagQueries": [
              "$PLTR",
              "$MSFT",
              "$ISRG",
              "$AMZN",
              "$CCJ",
              "$AVAV"
            ],
            "notes": "Check for short seller posts, breaking contract news, executive statements. Run if IGV premarket -1.5%+"
          },
          "seekingAlpha": {
            "url_template": "seekingalpha.com/symbol/{TICKER}/news",
            "notes": "Crowdsourced analyst coverage. Strong for ABVX (biotech community coverage), AMPX (battery tech). Often surfaces thesis risks before mainstream press."
          },
          "stocktwits": {
            "url_template": "stocktwits.com/symbol/{TICKER}",
            "notes": "Retail sentiment indicator. High noise, but extreme sentiment = contrarian signal. Check when stock moves >3% without obvious catalyst."
          }
        },
        "regulatorySignalSources": {
          "sec_form4": {
            "description": "Insider transactions — DAILY check for all US positions",
            "url_template": "https://efts.sec.gov/LATEST/search-index?q=%22{TICKER}%22&forms=4&dateRange=custom&startdt={yesterday}&enddt={today}",
            "apify_actor": "constant_quadruped/sec-edgar-filings-scraper",
            "redFlag": "C-suite SELL >$500K within 30 days of catalyst = WARNING"
          },
          "sec_8k": {
            "description": "Material events — DAILY check",
            "redFlag": "Any 8-K filed = read immediately before rest of scan"
          },
          "uk_rns": {
            "description": "LSE Regulatory News Service for RR.L, ITM.L",
            "url": "londonstockexchange.com/live-markets/market-data-and-news/rns",
            "notes": "UK-listed company announcements often hit RNS 1-2hrs before Yahoo Finance picks them up"
          },
          "dod_contracts": {
            "description": "Pentagon daily contract list",
            "url": "defense.gov/News/Contracts/",
            "time": "Published daily at 5PM ET / 1AM UAE next day",
            "notes": "Search for any held/watchlist name in daily list. AVAV, CODA, PDYN, KTOS most likely to appear."
          }
        },
        "industryPublications": {
          "defence": [
            "defensenews.com",
            "breakingdefense.com",
            "janes.com",
            "shephardmedia.com"
          ],
          "nuclear": [
            "world-nuclear-news.org",
            "nei.org",
            "nucnet.org"
          ],
          "medical_robotics": [
            "medtechdive.com",
            "medicaldevice-network.com",
            "massdevice.com"
          ],
          "energy_hydrogen": [
            "rechargenews.com",
            "h2-view.com",
            "hydrogeninsight.com"
          ],
          "ai_tech": [
            "theinformation.com",
            "semafor.com/technology",
            "techcrunch.com"
          ],
          "biotech": [
            "statnews.com",
            "biopharmadive.com",
            "fiercebiotech.com"
          ],
          "defence_eu": [
            "europeandefencereview.eu",
            "armyrecognition.com"
          ]
        },
        "sectors_source": "si26SectorMap",
        "output": "RED FLAGS: [list] | ALL SECTORS CLEAR. AI mandatory query result always stated. Social media signals: BULLISH/BEARISH/NEUTRAL per held name. New filings summary."
      }
    ],
    "preOpenProtocol": {
      "time_uae": "16:30 GST (60 minutes before NYSE open at 17:30)",
      "description": "Lightweight pre-open check. NOT a full scan. Run before every US session.",
      "steps": [
        "1. web_search: 'Anthropic OR OpenAI OR Google OR Meta AI model announcement today'",
        "2. web_search: 'IGV premarket' or 'iShares software ETF premarket'",
        "3. web_search: '[held positions near stop] news today' for any position within 5% of stop",
        "4. web_search: 'Iran Hormuz news today' — check for overnight developments",
        "5. If any red flag found: escalate immediately, review stops before open"
      ]
    },
    "revisedSession": "S14"
  },
  "si26SectorMap": {
    "version": "1.0",
    "addedSession": "S13",
    "revisedSession": "S14",
    "description": "Executable sector threat data for SI-14 Section K. One search query per sector per session. Update tickers[] when positions change.",
    "sectors": {
      "defence_aerospace": {
        "tickers": [
          "AVAV",
          "SHLD",
          "RR"
        ],
        "etfCanary": "ITA",
        "redFlagThreshold": "-2% premarket",
        "query": "defence contract drone AVAV OR Rolls-Royce contract OR NATO budget cut OR export licence drone",
        "redFlagConditions": [
          "ITA -2%+",
          "US defence budget headline",
          "AVAV/RR competitor contract win",
          "ITAR export restriction on UAS"
        ],
        "contractMonitor": {
          "dod_daily": "defense.gov/News/Contracts/ — check AVAV/SHLD daily",
          "usaspending": "usaspending.gov — check for AVAV (AeroVironment), Kratos, CODA new awards",
          "sam_gov": "sam.gov — solicitations signal pipeline 6-18 months ahead of awards"
        },
        "socialMediaMonitor": {
          "twitter": "$AVAV ticker search — contract announcement sometimes breaks on X before press release",
          "reddit": "r/investing, r/SecurityAnalysis for thesis discussion"
        },
        "eohdPriceCall": "Use EODHD get_historical_stock_prices with SYMBOL.EXCHANGE for all tickers in this sector before checking etfCanary via web_search."
      },
      "nuclear_uranium": {
        "tickers": [
          "CCJ"
        ],
        "etfCanary": "URA",
        "redFlagThreshold": "-3% premarket",
        "query": "uranium spot price OR nuclear reactor incident OR SMR UK programme OR Cameco contract news",
        "redFlagConditions": [
          "URA -3%+",
          "any reactor safety event globally",
          "Kazatomprom output increase surprise",
          "EU nuclear policy reversal"
        ],
        "eohdPriceCall": "Use EODHD get_historical_stock_prices with SYMBOL.EXCHANGE for all tickers in this sector before checking etfCanary via web_search."
      },
      "ai_cloud_software": {
        "tickers": [
          "MSFT",
          "AMZN",
          "PDYN"
        ],
        "etfCanary": "IGV",
        "redFlagThreshold": "-1.5% premarket",
        "queries": [
          "Anthropic OR OpenAI OR Google OR Meta AI model announcement today",
          "MSFT OR AMZN OR PDYN short seller analyst downgrade today",
          "enterprise cloud spending cut OR Azure AWS growth deceleration"
        ],
        "mandatoryQuery": "Anthropic OR OpenAI OR Google OR Meta AI model announcement today",
        "redFlagConditions": [
          "IGV -1.5%+",
          "ANY frontier AI model benchmark announcement",
          "Burry/Einhorn/Hindenburg post on held name",
          "hyperscaler capex commentary",
          "MSFT/AMZN/PDYN analyst downgrade"
        ],
        "lessonLearned": "S13 Mythos miss: Anthropic model with step-jump SWE benchmarks caused PLTR -7%, MSFT sector drag. Not detected in morning scan. This sector requires MANDATORY daily check.",
        "socialMediaMonitor": {
          "reddit": [
            "r/MachineLearning",
            "r/LocalLLaMA",
            "r/ChatGPT",
            "r/investing"
          ],
          "twitter_watchAccounts": [
            "michaeljburry",
            "unusual_whales"
          ],
          "notes": "Any frontier model capability announcement = immediate Section K escalation. Burry PLTR short post = execute pre-open check immediately."
        },
        "filingMonitor": {
          "form4": "Check MSFT, AMZN insider transactions — executive selling at elevated valuations is risk signal",
          "form8k": "MSFT/AMZN 8-K — any material AI partnership or contract = thesis confirmation or threat"
        },
        "eohdPriceCall": "Use EODHD get_historical_stock_prices with SYMBOL.EXCHANGE for all tickers in this sector before checking etfCanary via web_search."
      },
      "medical_robotics": {
        "tickers": [
          "ISRG"
        ],
        "etfCanary": "IHI",
        "redFlagThreshold": "-2% premarket",
        "query": "surgical robot competitor approval OR Medtronic Hugo clearance OR ISRG FDA warning OR da Vinci China tender results",
        "redFlagConditions": [
          "IHI -2%+",
          "new surgical robot FDA/NMPA approval",
          "China hospital tender showing ASP compression",
          "CMS reimbursement change for robotic procedures"
        ],
        "eohdPriceCall": "Use EODHD get_historical_stock_prices with SYMBOL.EXCHANGE for all tickers in this sector before checking etfCanary via web_search."
      },
      "biotech_pharma": {
        "tickers": [
          "ABVX"
        ],
        "etfCanary": "XBI",
        "redFlagThreshold": "-3% premarket",
        "query": "ulcerative colitis drug approval 2026 OR IBD Phase 3 trial result OR Abivax news OR AstraZeneca acquisition",
        "redFlagConditions": [
          "XBI -3%+",
          "competing UC/IBD drug approval",
          "AstraZeneca M&A announcement not involving ABVX",
          "FDA guidance change on IBD endpoints"
        ],
        "clinicalTrialMonitor": {
          "clinicaltrials_gov": "clinicaltrials.gov — ABVX trial status. New enrolment = positive signal. Pause = red flag.",
          "query": "Abivax obefazimod Phase 3 ulcerative colitis clinicaltrials.gov"
        },
        "socialMediaMonitor": {
          "reddit": [
            "r/biotech",
            "r/medicine",
            "r/CrohnsDisease r/UlcerativeColitis — patient community often surfaces trial data before press release"
          ],
          "twitter": "$ABVX — biotech community on X often discusses phase 3 interim signals"
        },
        "m_and_a_monitor": {
          "source": "Reuters M&A scanner",
          "query": "AstraZeneca acquisition biotech IBD 2026",
          "notes": "ABVX M&A thesis — AZ exclusivity expired Mar 23. Monitor for deal rumours."
        },
        "eohdPriceCall": "Use EODHD get_historical_stock_prices with SYMBOL.EXCHANGE for all tickers in this sector before checking etfCanary via web_search."
      },
      "battery_drone_tech": {
        "tickers": [
          "AMPX"
        ],
        "etfCanary": "DRIV",
        "redFlagThreshold": "-3% premarket",
        "query": "silicon anode battery breakthrough OR drone endurance battery DoD contract OR Amprius Technologies news",
        "redFlagConditions": [
          "Silicon anode peer >20% energy density improvement",
          "DoD drone battery contract to non-AMPX supplier",
          "AMPX S-3 equity offering filing"
        ],
        "patentMonitor": {
          "source": "Google Patents",
          "query": "silicon anode lithium battery patent 2026 site:patents.google.com",
          "notes": "Competitor IP filings signal technology progression 12-24 months before product launch. Particularly watch QuantumScape (QS), SES AI, Solid Power (SLDP)."
        },
        "hiringSignals": {
          "query": "Amprius Technologies hiring manufacturing engineer 2026 site:linkedin.com",
          "notes": "Scale-up hiring = commercial production imminent = positive catalyst"
        },
        "eohdPriceCall": "Use EODHD get_historical_stock_prices with SYMBOL.EXCHANGE for all tickers in this sector before checking etfCanary via web_search."
      },
      "maritime_defence": {
        "tickers": [
          "CODA"
        ],
        "etfCanary": null,
        "query": "underwater defence sensor contract 2026 OR maritime surveillance navy OR Coda Octopus Group news",
        "redFlagConditions": [
          "Thales/Sonardyne/Kongsberg major naval contract in CODA product space",
          "US Navy MCM budget cut",
          "CODA insider selling reported"
        ],
        "eohdPriceCall": "Use EODHD get_historical_stock_prices with SYMBOL.EXCHANGE for all tickers in this sector before checking etfCanary via web_search."
      },
      "power_energy_infra": {
        "tickers": [
          "VST"
        ],
        "etfCanary": "XLU",
        "redFlagThreshold": "-2% premarket",
        "query": "AI data centre power demand news OR ERCOT Texas grid ruling OR Vistra Energy news OR natural gas price spike",
        "redFlagConditions": [
          "XLU -2%+",
          "hyperscaler PPA cancellation",
          "ERCOT adverse capacity market ruling",
          "Fed surprise rate hike (VST rate-sensitive)"
        ],
        "eohdPriceCall": "Use EODHD get_historical_stock_prices with SYMBOL.EXCHANGE for all tickers in this sector before checking etfCanary via web_search."
      },
      "eu_hydrogen_energy": {
        "tickers": [
          "ITM"
        ],
        "etfCanary": null,
        "query": "EU green hydrogen policy subsidy 2026 OR electrolyser contract order OR ITM Power news OR Nel ASA order",
        "redFlagConditions": [
          "EU state aid decision against hydrogen subsidies",
          "Nel/Enapter major order announcement in ITM addressable market",
          "UK government hydrogen budget cut",
          "ITM Power equity raise announced"
        ],
        "eohdPriceCall": "Use EODHD get_historical_stock_prices with SYMBOL.EXCHANGE for all tickers in this sector before checking etfCanary via web_search."
      }
    }
  },
  "connectors": {
    "lastUpdated": "2026-04-09",
    "active": [
      {
        "name": "Massive Market Data (MMD)",
        "status": "ACTIVE",
        "coverage": "US equities only — NYSE, NASDAQ",
        "rateLimit": "~6 calls per session before throttle",
        "primaryUse": "US equity prev-close prices, daily bars",
        "endpoints": [
          "/v2/aggs/ticker/{ticker}/prev",
          "/v2/aggs/ticker/{ticker}/range/1/day/{from}/{to}"
        ],
        "limitations": "Does NOT cover LSE, AIM, Euronext, Xetra. No fundamentals. No news."
      },
      {
        "name": "EODHD (EOD Historical Data)",
        "status": "ACTIVE — tools load in fresh session",
        "mcpUrl": "https://mcp.alphavantage.co/mcp",
        "toolCount": 77,
        "coverage": "60+ exchanges including LSE, Euronext, Xetra, NYSE, NASDAQ. 120,000+ tickers.",
        "tickerFormat": "SYMBOL.EXCHANGE e.g. RR.LSE, ITM.LSE, LDO.MI, R3NK.XETRA, AAPL.US",
        "keyTools": [
          "get_historical_stock_prices — OHLCV for any exchange",
          "get_fundamentals_data — P/E, EPS, revenue, balance sheet",
          "get_company_news — per-ticker news feed",
          "get_technical_indicators — RSI, MACD, Bollinger",
          "get_stock_screener_data — filter by criteria",
          "get_insider_transactions — Form 4 equivalent",
          "get_options_data — US options contracts",
          "get_earnings_data — historical + upcoming with estimates",
          "get_economic_indicators — macro data",
          "resolve_ticker — company name/ISIN to SYMBOL.EXCHANGE",
          "get_live_stock_prices — real-time/delayed quotes"
        ],
        "primaryUse": "EU/UK price coverage (RR.LSE, ITM.LSE). Fundamentals. Insider transactions. Options flow. Earnings calendar.",
        "subscriptionNote": "EU/UK exchange coverage requires All World or higher subscription plan. Verify LSE access on first use with RR.LSE test call.",
        "replaces": "Yahoo Finance web_fetch for EU/UK prices. Web_search for insider transactions. Separate earnings date lookups."
      },
      {
        "name": "Apify",
        "status": "ACTIVE — occasional timeouts",
        "primaryUse": "RAG web browser for structured article retrieval. Reddit sentiment actor. Twitter/X scraper.",
        "keyActors": [
          "apify/rag-web-browser — general web scraping",
          "benthepythondev/stock-sentiment-intelligence — Reddit WSB/r/stocks/r/investing sentiment",
          "pear_fight/twitter-scraper — X/Twitter posts (free)",
          "constant_quadruped/sec-edgar-filings-scraper — SEC filings (free)",
          "pink_comic/sec-edgar-company-filings — Form 4/8-K/S-3 monitoring"
        ],
        "fallback": "If Apify times out use web_search + web_fetch as fallback"
      },
      {
        "name": "Coupler.io",
        "status": "CONNECTED — no active dataflows configured",
        "primaryUse": "Data pipeline — potential IBKR portfolio data automation if configured",
        "currentUse": "None active"
      },
      {
        "name": "Google Drive",
        "status": "CONNECTED — tools load in fresh session",
        "primaryUse": "Claude Fund Memory folder — FUND_SESSION_STATE.md, LESSONS_LEARNED.md, journal backups",
        "folder": "Claude Fund Memory",
        "files": [
          "FUND_SESSION_STATE.md",
          "LESSONS_LEARNED.md",
          "trading_journalXX.jsx (latest)"
        ],
        "workflow": "Write at session close. Read at session open for context continuity."
      }
    ]
  }
};

const COLORS = {
  bg: "#0a0c0f",
  surface: "#111318",
  border: "#1e2330",
  borderBright: "#2a3348",
  accent: "#e8a020",
  accentDim: "#a06a10",
  green: "#22c55e",
  red: "#ef4444",
  blue: "#3b82f6",
  muted: "#4a5568",
  text: "#c9d1d9",
  textDim: "#6e7f96",
  textBright: "#f0f4f8"
};

const css = `
  @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300;400;500;600&family=IBM+Plex+Sans:wght@300;400;500;600&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: ${COLORS.bg}; font-family: 'IBM Plex Sans', sans-serif; color: ${COLORS.text}; }
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: ${COLORS.bg}; }
  ::-webkit-scrollbar-thumb { background: ${COLORS.border}; border-radius: 2px; }
  .mono { font-family: 'IBM Plex Mono', monospace; }
  .blink { animation: blink 1.4s step-end infinite; }
  @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.2} }
  .pulse { animation: pulse 2s ease-in-out infinite; }
  @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.6} }
  .fade-in { animation: fadeIn 0.4s ease; }
  @keyframes fadeIn { from{opacity:0;transform:translateY(4px)} to{opacity:1;transform:translateY(0)} }
  .tab-btn { background: none; border: none; cursor: pointer; padding: 8px 16px; font-family: 'IBM Plex Mono', monospace; font-size: 11px; letter-spacing: 0.08em; color: ${COLORS.textDim}; border-bottom: 2px solid transparent; transition: all 0.2s; }
  .tab-btn:hover { color: ${COLORS.text}; }
  .tab-btn.active { color: ${COLORS.accent}; border-bottom-color: ${COLORS.accent}; }
  .badge { display: inline-block; padding: 2px 6px; border-radius: 3px; font-family: 'IBM Plex Mono', monospace; font-size: 10px; font-weight: 600; letter-spacing: 0.05em; }
  .badge-red { background: rgba(239,68,68,0.15); color: #ef4444; }
  .badge-green { background: rgba(34,197,94,0.15); color: #22c55e; }
  .badge-amber { background: rgba(232,160,32,0.15); color: #e8a020; }
  .badge-blue { background: rgba(59,130,246,0.15); color: #3b82f6; }
  .badge-grey { background: rgba(74,85,104,0.3); color: #8899aa; }
  .card { background: ${COLORS.surface}; border: 1px solid ${COLORS.border}; border-radius: 6px; padding: 16px; }
  .card-sm { background: ${COLORS.surface}; border: 1px solid ${COLORS.border}; border-radius: 4px; padding: 10px 12px; }
  .divider { border: none; border-top: 1px solid ${COLORS.border}; margin: 12px 0; }
  input, textarea { background: #0d1017; border: 1px solid ${COLORS.border}; color: ${COLORS.text}; border-radius: 4px; padding: 6px 10px; font-family: 'IBM Plex Sans', sans-serif; font-size: 13px; width: 100%; outline: none; }
  input:focus, textarea:focus { border-color: ${COLORS.accent}; }
  .btn { display: inline-flex; align-items: center; gap: 6px; padding: 6px 14px; border-radius: 4px; font-family: 'IBM Plex Mono', monospace; font-size: 11px; font-weight: 500; letter-spacing: 0.06em; cursor: pointer; border: none; transition: all 0.15s; }
  .btn-primary { background: ${COLORS.accent}; color: #0a0c0f; }
  .btn-primary:hover { background: #f0b030; }
  .btn-ghost { background: transparent; color: ${COLORS.textDim}; border: 1px solid ${COLORS.border}; }
  .btn-ghost:hover { border-color: ${COLORS.accent}; color: ${COLORS.accent}; }
  .btn-danger { background: transparent; color: #ef4444; border: 1px solid rgba(239,68,68,0.3); }
  .btn-danger:hover { background: rgba(239,68,68,0.1); }
  .row { display: flex; align-items: center; }
  .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
  .grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; }
`;

const Label = ({ children, style }) => (
  <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, letterSpacing: "0.08em", color: COLORS.textDim, textTransform: "uppercase", ...style }}>{children}</span>
);

const Val = ({ children, color, size }) => (
  <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: size || 13, fontWeight: 500, color: color || COLORS.textBright }}>{children}</span>
);

const SectionHeader = ({ children, action }) => (
  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <div style={{ width: 3, height: 14, background: COLORS.accent, borderRadius: 2 }} />
      <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", color: COLORS.accent, textTransform: "uppercase" }}>{children}</span>
    </div>
    {action}
  </div>
);

export default function TradingJournal() {
  const [data, setData] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [saving, setSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);
  const [newNote, setNewNote] = useState("");
  const [status, setStatus] = useState("LOADING");
  const [editThesis, setEditThesis] = useState(false);
  const [thesisDraft, setThesisDraft] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const fallback = setTimeout(() => {
      setData(INITIAL_STATE);
      setStatus("TIMEOUT — SEEDED WITH SESSION DATA");
    }, 2000);
    try {
      const result = await window.storage.get(STORAGE_KEY);
      clearTimeout(fallback);
      if (result && result.value) {
        try {
          setData(JSON.parse(result.value));
          setStatus("LOADED");
        } catch {
          setData(INITIAL_STATE);
          setStatus("PARSE ERROR — SEEDED WITH SESSION DATA");
        }
      } else {
        setData(INITIAL_STATE);
        setStatus("NEW — SEEDED WITH SESSION DATA");
      }
    } catch {
      clearTimeout(fallback);
      setData(INITIAL_STATE);
      setStatus("NEW — SEEDED WITH SESSION DATA");
    }
  };

  const save = useCallback(async (d) => {
    setSaving(true);
    try {
      const payload = { ...d, lastUpdated: new Date().toISOString().split("T")[0] };
      await window.storage.set(STORAGE_KEY, JSON.stringify(payload));
      setLastSaved(new Date().toLocaleTimeString());
      setStatus("SAVED");
    } catch (e) {
      setStatus("SAVE ERROR");
    }
    setSaving(false);
  }, []);

  const update = useCallback((newData) => {
    setData(newData);
    save(newData);
  }, [save]);

  const addNote = () => {
    if (!newNote.trim()) return;
    const d = { ...data, sessionNotes: [{ date: new Date().toISOString().split("T")[0], note: newNote }, ...data.sessionNotes] };
    setNewNote("");
    update(d);
  };

  const resetToSeed = async () => {
    if (!window.confirm("Reset to seed data? This overwrites current saved state.")) return;
    update(INITIAL_STATE);
  };

  if (!data) return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", background: COLORS.bg }}>
      <div style={{ fontFamily: "'IBM Plex Mono'", color: COLORS.accent, fontSize: 13 }}>
        <span className="blink">▊</span> LOADING JOURNAL...
      </div>
    </div>
  );

  const totalCost = data.positions.reduce((s, p) => s + p.costBasis, 0);
  const tabs = ["overview", "positions", "orders", "watchlist", "thesis", "instructions", "notes"];

  return (
    <>
      <style>{css}</style>
      <div style={{ minHeight: "100vh", background: COLORS.bg, padding: "16px" }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20, paddingBottom: 16, borderBottom: `1px solid ${COLORS.border}` }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: COLORS.green }} className="pulse" />
              <span style={{ fontFamily: "'IBM Plex Mono'", fontSize: 15, fontWeight: 600, color: COLORS.textBright, letterSpacing: "0.06em" }}>FUND JOURNAL</span>
              <span style={{ fontFamily: "'IBM Plex Mono'", fontSize: 11, color: COLORS.textDim }}>// {data.fund.account}</span>
            </div>
            <div style={{ marginTop: 4, display: "flex", gap: 12 }}>
              <Label>{data.fund.broker}</Label>
              <Label>·</Label>
              <Label>{data.fund.location}</Label>
              <Label>·</Label>
              <Label>Updated {data.lastUpdated}</Label>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {lastSaved && <Label>Saved {lastSaved}</Label>}
            <span className={`badge ${status.includes("ERROR") ? "badge-red" : status === "SAVED" ? "badge-green" : "badge-amber"}`}>{saving ? "SAVING..." : status}</span>
            <button className="btn btn-ghost" onClick={resetToSeed} style={{ fontSize: 10 }}>RESET</button>
            <button className="btn btn-primary" onClick={() => save(data)}>SAVE NOW</button>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", borderBottom: `1px solid ${COLORS.border}`, marginBottom: 20, gap: 4 }}>
          {tabs.map(t => (
            <button key={t} className={`tab-btn ${activeTab === t ? "active" : ""}`} onClick={() => setActiveTab(t)}>
              {t.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="fade-in">

          {/* OVERVIEW TAB */}
          {activeTab === "overview" && (
            <div>
              {/* Fund Stats */}
              <div className="grid-3" style={{ marginBottom: 16 }}>
                {[
                  { label: "Net Liquidity", val: `$${(data.fund.netLiquidity/1000).toFixed(1)}K`, color: COLORS.green },
                  { label: "Cash Available", val: `$${(data.fund.cash/1000).toFixed(1)}K`, color: COLORS.textBright },
                  { label: "Daily P&L", val: `+$${data.fund.dailyPnL}`, color: COLORS.green },
                  { label: "Unrealized P&L", val: `+$${data.fund.unrealizedPnL}`, color: COLORS.green },
                  { label: "Positions", val: data.positions.length, color: COLORS.textBright },
                  { label: "Pending Orders", val: data.pendingOrders.length, color: COLORS.accent },
                ].map(s => (
                  <div key={s.label} className="card-sm" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Label>{s.label}</Label>
                    <Val color={s.color}>{s.val}</Val>
                  </div>
                ))}
              </div>

              {/* Thesis Banner */}
              <div className="card" style={{ marginBottom: 16, borderColor: COLORS.accent, borderLeftWidth: 3 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                  <Label style={{ color: COLORS.accent }}>MASTER THESIS</Label>
                  <div style={{ display: "flex", gap: 8 }}>
                    <span className="badge badge-red">ACTIVE CONFLICT</span>
                    <span className="badge badge-amber">THESIS INTACT</span>
                  </div>
                </div>
                <div style={{ fontFamily: "'IBM Plex Mono'", fontSize: 13, fontWeight: 600, color: COLORS.accent, marginBottom: 8 }}>{data.thesis.title}</div>
                <div style={{ fontSize: 12, color: COLORS.textDim, lineHeight: 1.6 }}>{data.thesis.summary}</div>
                <hr className="divider" />
                <div style={{ display: "flex", gap: 24 }}>
                  <div><Label>WTI</Label> <Val color={COLORS.red} size={12}>${data.thesis.oilWTI}</Val></div>
                  <div><Label>Brent</Label> <Val color={COLORS.red} size={12}>${data.thesis.oilBrent}</Val></div>
                  <div><Label>Gold</Label> <Val size={12}>${data.thesis.goldPrice}</Val></div>
                  <div><Label>Hormuz</Label> <Val color={COLORS.red} size={12}>{data.thesis.hormuzStatus}</Val></div>
                </div>
              </div>

              {/* Ceasefire Filter */}
              <div className="card" style={{ marginBottom: 16, background: "rgba(239,68,68,0.05)", borderColor: "rgba(239,68,68,0.3)" }}>
                <Label style={{ color: "#ef4444" }}>⚠ CEASEFIRE FILTER — STANDING INSTRUCTION</Label>
                <div style={{ marginTop: 8, fontFamily: "'IBM Plex Mono'", fontSize: 11, color: "#ef8888", lineHeight: 1.7 }}>{data.thesis.ceasefireFilter}</div>
              </div>

              {/* Catalyst Calendar */}
              <SectionHeader>CATALYST CALENDAR</SectionHeader>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {data.thesis.keyDates.map((d, i) => (
                  <div key={i} className="card-sm" style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <Val size={11} color={COLORS.accent}>{d.date}</Val>
                    <div style={{ flex: 1, fontSize: 12, color: COLORS.text }}>{d.event}</div>
                    <span className={`badge ${d.priority === "CRITICAL" ? "badge-red" : d.priority === "HIGH" ? "badge-amber" : "badge-grey"}`}>{d.priority}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* POSITIONS TAB */}
          {activeTab === "positions" && (
            <div>
              <SectionHeader>LIVE POSITIONS — {data.positions.length} HOLDINGS</SectionHeader>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {data.positions.map(p => (
                  <div key={p.ticker} className="card" style={{ borderLeftWidth: p.flag ? 2 : 1, borderLeftColor: p.flag ? COLORS.accent : COLORS.border }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <Val size={15}>{p.ticker}</Val>
                        <span style={{ fontSize: 12, color: COLORS.textDim }}>{p.name}</span>
                        <span className="badge badge-grey">{p.shares} shares</span>
                      </div>
                      <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                        <div style={{ textAlign: "right" }}>
                          <Label>AVG</Label> <Val size={12}>${p.avgPrice}</Val>
                        </div>
                        <div style={{ textAlign: "right" }}>
                          <Label>COST</Label> <Val size={12}>${p.costBasis.toLocaleString()}</Val>
                        </div>
                        {p.target && <div style={{ textAlign: "right" }}>
                          <Label>TARGET</Label> <Val size={12} color={COLORS.green}>${p.target}</Val>
                        </div>}
                        {p.stopPrice && <div style={{ textAlign: "right" }}>
                          <Label>STOP</Label> <Val size={12} color={COLORS.red}>${p.stopPrice}</Val>
                        </div>}
                      </div>
                    </div>
                    <div style={{ fontSize: 12, color: COLORS.textDim, lineHeight: 1.5 }}>{p.thesis}</div>
                    {p.flag && <div style={{ marginTop: 8, fontFamily: "'IBM Plex Mono'", fontSize: 11, color: COLORS.accent, padding: "4px 8px", background: "rgba(232,160,32,0.08)", borderRadius: 3 }}>▶ {p.flag}</div>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ORDERS TAB */}
          {activeTab === "orders" && (
            <div>
              <SectionHeader>PENDING ORDERS — US OPEN 5:30PM UAE</SectionHeader>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {data.pendingOrders.map(o => (
                  <div key={o.ticker} className="card">
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <span className={`badge ${o.action === "BUY" ? "badge-green" : "badge-red"}`}>{o.action}</span>
                        <Val size={15}>{o.ticker}</Val>
                        <span style={{ fontSize: 12, color: COLORS.textDim }}>{o.name}</span>
                      </div>
                      <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                        <div><Label>QTY</Label> <Val size={12}>{o.qty}</Val></div>
                        <div><Label>LIMIT</Label> <Val size={12} color={COLORS.accent}>{typeof o.limitPrice === "number" ? `$${o.limitPrice}` : o.limitPrice}</Val></div>
                        <div><Label>TIF</Label> <Val size={12}>{o.tif}</Val></div>
                        {o.stopPrice && <div><Label>STOP</Label> <Val size={12} color={COLORS.red}>${o.stopPrice}</Val></div>}
                        {o.target && <div><Label>TARGET</Label> <Val size={12} color={COLORS.green}>${o.target}</Val></div>}
                        <span className="badge badge-blue">{o.status}</span>
                      </div>
                    </div>
                    <div style={{ fontSize: 12, color: COLORS.textDim }}>{o.note}</div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: 20, padding: 16, background: "rgba(34,197,94,0.05)", border: "1px solid rgba(34,197,94,0.2)", borderRadius: 6 }}>
                <Label style={{ color: COLORS.green }}>COMPLETED TODAY</Label>
                <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 4 }}>
                  {["CODA Stop $9.50 GTC ✅", "AMPX Stop $14.00 GTC ✅", "AMPX Sell $32.00 GTC ✅", "ONDS Stop $8.50 GTC ✅", "PLTR sell order CANCELLED — Maven POR", "KTOS sell order CANCELLED — Orbit deal closing"].map(c => (
                    <div key={c} style={{ fontFamily: "'IBM Plex Mono'", fontSize: 11, color: COLORS.green }}>✓ {c}</div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* WATCHLIST TAB */}
          {activeTab === "watchlist" && (
            <div>
              <SectionHeader>US WATCHLIST</SectionHeader>
              <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 24 }}>
                {data.watchlistUS.map(w => (
                  <div key={w.ticker} className="card-sm" style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                    <Val size={13}>{w.ticker}</Val>
                    <span style={{ fontSize: 12, color: COLORS.textDim, flex: 1 }}>{w.name}</span>
                    <span style={{ fontSize: 11, color: COLORS.accent, fontFamily: "IBM Plex Mono" }}>{w.entry}</span>
                    {w.target && <span style={{ fontSize: 11, color: COLORS.green, fontFamily: "IBM Plex Mono" }}>T: ${w.target}</span>}
                    <span style={{ fontSize: 11, color: COLORS.textDim, maxWidth: 300 }}>{w.thesis}</span>
                  </div>
                ))}
              </div>

              <SectionHeader>
                EU / UK WATCHLIST
                <span className={`badge ${data.fund.ibkrEuropeanAccess === "Approved" ? "badge-green" : "badge-amber"}`}>
                  IBKR EU: {data.fund.ibkrEuropeanAccess}
                </span>
              </SectionHeader>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {data.watchlistEU.map((w, i) => (
                  <div key={w.ticker} className="card" style={{ borderLeftWidth: i < 4 ? 3 : 1, borderLeftColor: i < 4 ? COLORS.accent : COLORS.border }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                        {i < 8 && <span className="badge badge-amber">P{i+1}</span>}
                        <Val size={14}>{w.ticker}</Val>
                        <span style={{ fontSize: 12, color: COLORS.textDim }}>{w.name}</span>
                        <span className="badge badge-grey">{w.exchange}</span>
                        <span style={{ fontFamily: "'IBM Plex Mono'", fontSize: 10, color: COLORS.textDim }}>{w.ibkr}</span>
                      </div>
                      <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                        {w.current && <div><Label>NOW</Label> <Val size={12}>{w.current} {w.cur}</Val></div>}
                        <div><Label>ENTRY</Label> <Val size={12} color={COLORS.accent}>{w.entry}</Val></div>
                        {w.target && <div><Label>TARGET</Label> <Val size={12} color={COLORS.green}>{w.target} {w.cur}</Val></div>}
                        {w.upside && <span className="badge badge-green">+{w.upside}%</span>}
                      </div>
                    </div>
                    <div style={{ fontSize: 12, color: COLORS.textDim, marginBottom: 4 }}>{w.thesis}</div>
                    <div style={{ fontFamily: "'IBM Plex Mono'", fontSize: 11, color: COLORS.accent }}>{w.note}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* THESIS TAB */}
          {activeTab === "thesis" && (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <SectionHeader>IRAN WAR THESIS</SectionHeader>
                <button className="btn btn-ghost" onClick={() => { setEditThesis(!editThesis); setThesisDraft(data.thesis.summary); }}>
                  {editThesis ? "CANCEL" : "EDIT"}
                </button>
              </div>

              {editThesis ? (
                <div className="card" style={{ marginBottom: 16 }}>
                  <textarea value={thesisDraft} onChange={e => setThesisDraft(e.target.value)} rows={6} style={{ marginBottom: 8 }} />
                  <button className="btn btn-primary" onClick={() => { update({ ...data, thesis: { ...data.thesis, summary: thesisDraft } }); setEditThesis(false); }}>SAVE THESIS</button>
                </div>
              ) : (
                <div className="card" style={{ marginBottom: 16, borderColor: COLORS.accent, borderLeftWidth: 3 }}>
                  <div style={{ fontFamily: "'IBM Plex Mono'", fontSize: 13, fontWeight: 600, color: COLORS.accent, marginBottom: 12 }}>{data.thesis.title}</div>
                  <div style={{ fontSize: 13, color: COLORS.text, lineHeight: 1.8 }}>{data.thesis.summary}</div>
                </div>
              )}

              <div className="grid-2" style={{ marginBottom: 16 }}>
                <div className="card">
                  <Label>HORMUZ STATUS</Label>
                  <div style={{ marginTop: 8, fontFamily: "'IBM Plex Mono'", fontSize: 12, color: COLORS.red }}>{data.thesis.hormuzStatus}</div>
                </div>
                <div className="card" style={{ background: "rgba(239,68,68,0.05)", borderColor: "rgba(239,68,68,0.3)" }}>
                  <Label style={{ color: "#ef4444" }}>CEASEFIRE FILTER</Label>
                  <div style={{ marginTop: 8, fontFamily: "'IBM Plex Mono'", fontSize: 11, color: "#ef8888", lineHeight: 1.6 }}>{data.thesis.ceasefireFilter}</div>
                </div>
              </div>

              <SectionHeader>KEY MACRO DATA</SectionHeader>
              <div className="grid-3">
                {[
                  { label: "WTI Crude", val: `$${data.thesis.oilWTI}/bbl`, color: COLORS.red, note: "6% drop on ceasefire noise" },
                  { label: "Brent Crude", val: `$${data.thesis.oilBrent}/bbl`, color: COLORS.red, note: "Goldman Q2 target $110" },
                  { label: "Gold Spot", val: `$${data.thesis.goldPrice}/oz`, color: COLORS.textDim, note: "-14.5% from ATH $5,595" },
                ].map(m => (
                  <div key={m.label} className="card">
                    <Label>{m.label}</Label>
                    <div style={{ marginTop: 6 }}><Val size={18} color={m.color}>{m.val}</Val></div>
                    <div style={{ marginTop: 4, fontSize: 11, color: COLORS.textDim }}>{m.note}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* INSTRUCTIONS TAB */}
          {activeTab === "instructions" && (
            <div>
              <SectionHeader>STANDING INSTRUCTIONS — PERMANENT</SectionHeader>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {data.standingInstructions.map(ins => (
                  <div key={ins.id} className="card" style={{ display: "flex", gap: 14 }}>
                    <div style={{ fontFamily: "'IBM Plex Mono'", fontSize: 11, color: COLORS.accent, fontWeight: 600, minWidth: 20 }}>#{ins.id.toString().padStart(2,"0")}</div>
                    <div>
                      <div style={{ fontFamily: "'IBM Plex Mono'", fontSize: 12, fontWeight: 600, color: COLORS.textBright, marginBottom: 4 }}>{ins.title}</div>
                      <div style={{ fontSize: 12, color: COLORS.textDim, lineHeight: 1.6 }}>{ins.body}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* NOTES TAB */}
          {activeTab === "notes" && (
            <div>
              <SectionHeader>SESSION NOTES</SectionHeader>
              <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
                <input value={newNote} onChange={e => setNewNote(e.target.value)} placeholder="Add session note..." onKeyDown={e => e.key === "Enter" && !e.shiftKey && addNote()} />
                <button className="btn btn-primary" onClick={addNote} style={{ whiteSpace: "nowrap" }}>ADD NOTE</button>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {data.sessionNotes.map((n, i) => (
                  <div key={i} className="card">
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                      <Label>{n.date}</Label>
                      <button className="btn btn-danger" style={{ padding: "2px 8px", fontSize: 10 }} onClick={() => {
                        const notes = data.sessionNotes.filter((_, j) => j !== i);
                        update({ ...data, sessionNotes: notes });
                      }}>DELETE</button>
                    </div>
                    <div style={{ fontSize: 12, color: COLORS.text, lineHeight: 1.7 }}>{n.note}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div style={{ marginTop: 24, paddingTop: 12, borderTop: `1px solid ${COLORS.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Label>FUND JOURNAL v1 // UAE-BASED $100K IBKR PRO // USE AT NEXT SESSION: OPEN THIS ARTIFACT FIRST</Label>
          <div style={{ display: "flex", gap: 8 }}>
            <span className="badge badge-amber">EU ACCESS: {data.fund.ibkrEuropeanAccess}</span>
            <span className="badge badge-red">CONFLICT: ACTIVE</span>
          </div>
        </div>

      </div>
    </>
  );
}
