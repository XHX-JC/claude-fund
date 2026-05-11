import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "fund_journal_v2";

const INITIAL_STATE = {
  "lastUpdated": "2026-04-08",
  "fund": {
    "account": "U24936508",
    "netLiquidity": 98900,
    "cash": 34784,
    "availableFunds": 80900,
    "dailyPnL": 1312,
    "unrealizedPnL": 550,
    "realizedPnL": 414,
    "broker": "IBKR Pro",
    "baseCurrency": "USD",
    "location": "UAE",
    "ibkrEuropeanAccess": "APPROVED — March 26 2026",
    "cashUSD": 39036,
    "cashEUR": 370,
    "cashGBP": -3488,
    "cashBase": 34784,
    "lastUpdated": "2026-04-08 SESSION 12 — FINAL",
    "note": "SESSION 12 FINAL. Key events: (1) TWO-WEEK US-IRAN CEASEFIRE ANNOUNCED — Trump suspended attacks, Iran agreed to coordinate Strait of Hormuz transit. Brent -13% to ~3, WTI -16% to ~4. S&P500 futures +2.1%. (2) R3NK SOLD @ €56.01 — peace dividend captured. Gain +€357 (~+85). Reentry watchlist €46-49. (3) UPS 50 shares FILLED @ 00.17 (limit 01.03 DAY) — tactical ceasefire play. (4) UPS accidentally sold at 9.60 — reentry BUY 50 @ 9.00 GTC submitted, stop 1.00 GTC live. (5) UAL BUY 60 @ 2.08 converted DAY→GTC. (6) RCL BUY 20 @ 70.58 DAY — EXPIRED unfilled. (7) CCL BUY 200 @ 5.98 DAY — EXPIRED unfilled. (8) MSTR BUY CANCELLED. (9) CCJ stop raised 06.07→08.37. (10) SHLD stop limit raised trigger 2.60→3.89. (11) AMZN stop limit raised trigger 04→12.13. (12) SI-24 revised: cash floor = 10% of net liquidity (from 25%). (13) PLTR 5-session test Day 1: 46.48 — FAIL. 4 sessions remain (Apr 9,10,14,15). (14) RR.L +10.13% today — 1258.40p. No stop — ex-div Apr 23 hard hold. Islamabad talks Friday Apr 10 — Witkoff/Kushner/Vance attending. 14 live positions. 19 orders (post-session: ~17 active)."
  },
  "thesis": {
    "title": "TWO-WEEK CEASEFIRE — HORMUZ PARTIALLY REOPENING — TALKS ISLAMABAD APR 10",
    "summary": "SESSION 12 UPDATE: TWO-WEEK CEASEFIRE CONFIRMED APR 7 8PM ET. Trump suspended attacks on Iran, Iran agreed to coordinate safe passage through Strait of Hormuz under Iranian Armed Forces management. Ceasefire came <2hrs before deadline. Iran claimed victory. Only 2 vessels transited Strait as of Apr 8 morning — 426 tankers still trapped. Shipping insurers say trade unlikely to resume immediately. IATA: jet fuel normalisation takes months, not weeks. Iran 10-point demands remain: US troop withdrawal from region, permanent war end, sanctions lifted, continued Iranian Hormuz control — all nonstarters for US negotiators. Islamabad talks scheduled Friday Apr 10 — Witkoff, Kushner, Vance attending. Israel continuing Lebanon operations (NOT included in ceasefire). New attacks in UAE, Kuwait reported hours after ceasefire. SI-25 EXIT TRIGGER NOT ACTIVATED — Iran retains military control of Strait, formal reopening with oil -10% from peak not yet confirmed. Oil: Brent ~3 (-13%), WTI ~4 (-16%) — biggest single-day oil drop since 1991 Gulf War. Still 0+ above pre-war levels. Thesis unchanged: structural positions hold. Tactical book: UPS live (fuel relief), UAL GTC pending. PLTR 5-session test Day 1 FAIL — monitor closely.",
    "oilWTI": 94,
    "oilBrent": 93,
    "goldPrice": 4450,
    "hormuzStatus": "CEASEFIRE DAY 1. Two vessels transited as of Apr 8 AM UTC. 426 tankers still trapped in Persian Gulf. Iranian Armed Forces coordinating passage — vetting process (ownership, management, insurance, charter history checked for US/Israel affiliation) unchanged since midnight. Shipping insurers: region remains at heightened risk, trade unlikely to resume fully. IATA: jet fuel normalisation months away. Iran retains military control — not a free reopening. SI-25 EXIT TRIGGER NOT ACTIVATED.",
    "ceasefireFilter": "SESSION 12 RECLASSIFIED: CEASEFIRE ACTIVE BUT FRAGILE. Two-week pause only. Iran 10-point demands irreconcilable with US position: (1) US troop withdrawal from region — nonstarter; (2) Continued Iranian Hormuz control — Trump resists; (3) Permanent war end — US wants nuclear disarmament first; (4) Sanctions lifted — Congress opposes. Islamabad talks Apr 10 are next binary. Watch for: (1) Actual vessel flow through Strait — only 2 ships in 12hrs post-announcement; (2) Iranian vetting process — same IRGC screening in place; (3) Islamabad talks tone — Witkoff/Kushner hardline vs Iran maximalist demands; (4) Any resumption of strikes — Netanyahu explicitly excluded Lebanon; (5) Oil sustaining below 5 or rebounding toward 05. Exit trigger remains SI-25: formal Hormuz reopening + oil -10% from peak. NOT YET MET.",
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
      "last": 115.83,
      "marketVal": 5673,
      "unrealPnL": 575,
      "unrealPct": 11.3,
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
      "last": 220.65,
      "marketVal": 6620,
      "unrealPnL": 584,
      "unrealPct": 9.7,
      "stop": 212.13,
      "target": 300,
      "status": "HOLD",
      "note": "AWS/AI diversification play. Earnings Apr 23 key catalyst. Stop RAISED 04→12.13 S12. Locks in ~80 unrealized gain. Consumer confidence revival on ceasefire = near-term tailwind."
    },
    {
      "ticker": "VST",
      "name": "Vistra Corp",
      "shares": 53,
      "avgPrice": 150.569,
      "costBasis": 7980,
      "last": 157.41,
      "marketVal": 8342,
      "unrealPnL": 351,
      "unrealPct": 4.4,
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
      "last": 1258.4,
      "marketVal": 1887,
      "unrealPnL": 113,
      "unrealPct": 6.4,
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
      "last": 63.5,
      "marketVal": 1969,
      "unrealPnL": -49,
      "unrealPct": -2.5,
      "stop": 55,
      "target": 98,
      "status": "NEW — STOP LIVE",
      "cur": "GBP",
      "note": "EU hydrogen/energy independence. Entry 64.8-65p S08. Ceasefire constructive medium-term — EU energy independence policy is political mandate, not just economic. Stop 55p GTC live. Target 98p."
    },
    {
      "ticker": "SHLD",
      "name": "Global X Defence ETF",
      "shares": 69,
      "avgPrice": 72.025,
      "costBasis": 4970,
      "last": 74.92,
      "marketVal": 5169,
      "unrealPnL": 199,
      "unrealPct": 4,
      "stop": 73.89,
      "target": null,
      "status": "HOLD",
      "note": "Defence ETF. Stop limit RAISED trigger 2.60→3.89 S12. Locks in majority of S12 gain. Gap to stop only 1.4% — very tight. Peace dividend selling risk on EU defence open. Above cost 2.025."
    },
    {
      "ticker": "AMPX",
      "name": "Amprius Technologies",
      "shares": 168,
      "avgPrice": 18.106,
      "costBasis": 3042,
      "last": 17.19,
      "marketVal": 2889,
      "unrealPnL": -152,
      "unrealPct": -5,
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
      "last": 190.17,
      "marketVal": 4751,
      "unrealPnL": -126,
      "unrealPct": -2.6,
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
      "last": 6.44,
      "marketVal": 3205,
      "unrealPnL": -92,
      "unrealPct": -2.8,
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
      "last": 11.7,
      "marketVal": 4907,
      "unrealPnL": -87,
      "unrealPct": -1.7,
      "stop": 10.49,
      "target": 22,
      "status": "STOP LIVE",
      "note": "Underwater defence sensors / maritime surveillance. Stop 0.49 GTC. Monitor — tightest stop in book at 10.3% gap."
    },
    {
      "ticker": "PLTR",
      "name": "Palantir Technologies",
      "shares": 49,
      "avgPrice": 161.629,
      "costBasis": 7920,
      "last": 146.48,
      "marketVal": 7179,
      "unrealPnL": -741,
      "unrealPct": -9.4,
      "stop": 135.01,
      "target": null,
      "status": "HOLD — STOP $135.01 — 5-SESSION TEST ACTIVE",
      "note": "5-SESSION TEST — DAY 1 FAIL. Apr 8 close 46.48 < 52 threshold. 4 sessions remain: Apr 9, 10, 14, 15. Must close above 52 by Apr 15 or reassess exit. Stop 35.01 GTC. Ceasefire rotated money OUT of AI/defence names today. Golden Dome + Maven POR thesis intact. Q1 earnings May 11."
    },
    {
      "ticker": "ABVX",
      "name": "Abivax SA-ADR",
      "shares": 44,
      "avgPrice": 117.913,
      "costBasis": 5188,
      "last": 117.71,
      "marketVal": 5180,
      "unrealPnL": -12,
      "unrealPct": -0.2,
      "stop": 100,
      "target": null,
      "status": "HOLD — STOP LIVE $100 GTC",
      "note": "M&A speculative. AstraZeneca exclusivity expired Mar 23. Q2 Phase 3 maintenance data binary. Morgan Stanley 45, BTIG 50 targets. Stop 00 GTC. Non-correlated to ceasefire."
    },
    {
      "ticker": "UPS",
      "name": "United Parcel Service",
      "shares": 50,
      "avgPrice": 100.19,
      "costBasis": 5010,
      "last": 99.54,
      "marketVal": 4979,
      "unrealPnL": -31,
      "unrealPct": -0.6,
      "stop": 91,
      "target": 112,
      "status": "TACTICAL — STOP LIVE — EXIT BY APR 21",
      "note": "ENTERED S12 @ 00.17 (fill), accidentally sold 9.60, reentry BUY 9.00 GTC pending fill. Stop 1.00 GTC live. Fuel cost relief play — every /bbl Brent drop saves UPS ~0M annually. IATA: jet fuel normalisation months away, extends trade window beyond 2-week ceasefire. Target 10-114. Hard exit Apr 21 — no exceptions."
    }
  ],
  "pendingOrders": [
    {
      "ticker": "ITM",
      "action": "SELL",
      "type": "Stop",
      "qty": 3100,
      "limitPrice": null,
      "stopPrice": 55,
      "tif": "GTC",
      "status": "ACTIVE",
      "note": "Protective stop on new ITM position. Consolidation floor is 55p — recommend lowering to 50p for buffer. Filled at 64.8-65p."
    },
    {
      "ticker": "PLTR",
      "action": "SELL",
      "type": "Stop",
      "qty": 49,
      "limitPrice": null,
      "stopPrice": 135.01,
      "tif": "GTC",
      "status": "ACTIVE",
      "note": "Stop RAISED to $135.01 GTC. Locks in tighter exit above $130."
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
      "ticker": "SHLD",
      "action": "SELL",
      "type": "Stop Limit",
      "qty": 69,
      "limitPrice": 72.6,
      "stopPrice": 73.89,
      "tif": "GTC",
      "status": "ACTIVE",
      "note": "SESSION 12: Stop Limit RAISED trigger 2.60→3.89, limit 2.60. Above cost (2.025). Locks in majority of S12 ceasefire gain."
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
      "limitPrice": 205,
      "stopPrice": 212.13,
      "tif": "GTC",
      "status": "ACTIVE",
      "note": "SESSION 12: Stop RAISED 04→12.13. Trigger 12.13, limit 05.00. Above cost (01.204). Q1 earnings Apr 23."
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
      "ticker": "UAL",
      "action": "BUY",
      "type": "Limit",
      "qty": 60,
      "limitPrice": 92.08,
      "stopPrice": null,
      "tif": "GTC",
      "status": "ACTIVE",
      "note": "S12: Tactical ceasefire play. Converted DAY→GTC. Fuel relief thesis — UAL highest Brent oil exposure of major US carriers. Fill on intraday dip. Stop 0.00 to be placed on fill. Exit by Apr 21."
    },
    {
      "ticker": "UPS",
      "action": "BUY",
      "type": "Limit",
      "qty": 50,
      "limitPrice": 99,
      "stopPrice": null,
      "tif": "GTC",
      "status": "ACTIVE",
      "note": "S12: Reentry after accidental sale at 9.60. Entry /bin/sh.60 below original fill — improved R/R. Thesis intact. Stop 1.00 GTC live separately."
    },
    {
      "ticker": "UPS",
      "action": "SELL",
      "type": "Stop",
      "qty": 50,
      "limitPrice": null,
      "stopPrice": 91,
      "tif": "GTC",
      "status": "ACTIVE",
      "note": "S12: Protective stop. Below war low 4.06. If ceasefire collapses and oil reverses, exit with defined loss. Exit by Apr 21 regardless."
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
      "body": "EVERY SESSION opens with this scan in full. No exceptions. Run each section in order: (A) IBKR SCREENSHOT FIRST. (B) IRAN / OIL / HORMUZ — now focused on toll regime transition, not ceasefire. (C) PORTFOLIO POSITIONS. (D) EUROPEAN DEFENCE. (E) NUCLEAR + SUPPLY CHAIN. (F) US WATCHLIST. (G) SPECULATIVE BASKET + EU ENERGY BASKET (CWR, ITM, AFC, Enapter, Ilika, Alfen). (H) CONGRESSIONAL TRADING. (I) MACRO. (J) ERRORS CHECK."
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
      "id": 26,
      "title": "ENTRY READINESS BASELINE — SESSION 10 FINAL STATE",
      "body": "ENTRY READINESS BASELINE — Updated SESSION 11. 13 live positions (LDO closed +profit, LEU stopped -$238, ABVX added). PLTR 5-session test active (must close >$152 by Apr 14 or assess exit). RTX added as Tranche 2 priority entry: $198.41 current, target $225-240, stop $183, $3,500 fresh capital. EU/UK Power Basket formalised — 12 names, see SI-29. Cash USD ~$41,833. Minimum 15% reserve maintained. Tonight's deadline (Apr 7 8PM ET) — no new entries until tomorrow's post-deadline clarity established."
    },
    {
      "id": 27,
      "title": "MMD MANDATORY CROSS-REFERENCE — ALL PRICES (FINAL)",
      "body": "Price verification hierarchy: (1) MMD /v2/aggs/ticker/{ticker}/prev — primary for all US-listed names. (2) IBKR user-provided prices — always ground truth, override all sources. (3) EU/UK/European names where MMD returns no data: use Yahoo Finance, Investing.com, TradingView, or FT.com — verified LIVE at scan time. PROHIBITED sources: GuruFocus, PitchBook, Macroaxis — known EU small-cap data latency. Prior-session research prices never carried forward without re-verification. Notation: 'Yahoo Finance [date]', 'Investing.com [date]', 'FT.com [date]', 'IBKR user-confirmed [date]'. FT.com SCAN MANDATE: At every full scan, ft.com checked for company announcements, sector news (EU/UK energy, defence, nuclear, biotech), macro developments (Iran/Hormuz, EU energy policy, NATO spending, M&A), and emerging companies/themes not yet on watchlist. FT.com is primary EU corporate intelligence source. Use web_fetch on specific FT articles when warranted. Approved price and news sources: MMD → IBKR → Yahoo Finance → Investing.com → TradingView → FT.com → web_search."
    },
    {
      "id": 28,
      "title": "JOURNAL UPDATE PROTOCOL — END OF SESSION ONLY",
      "body": "The trading journal is ONLY updated when explicitly instructed by the user. Do NOT propose or execute journal updates mid-session. At the natural close of each session, prompt with a summary of all pending journal changes and ask for confirmation before proceeding. Mid-session note-taking is done in scan output only — not written to the journal file. This preserves context window efficiency and ensures journal updates are batched, accurate, and user-confirmed."
    },
    {
      "id": 29,
      "title": "EU/UK POWER THESIS BASKET — PERMANENT SCAN SECTION",
      "body": "EU/UK Power Thesis Basket is a permanent full scan section complementing the nuclear thesis. These are grid diversification plays — alternative energy, storage, electrolysers, geothermal, cables, smart grid. At every full scan: check price vs entry zone (MMD or Yahoo/IBKR per SI-27), contract wins, EU/UK policy funding, earnings, dilution/cash runway, technology validation. ALL positions in this basket capped at MOONSHOT sizing (max £500-£1,500) unless reclassified to core thesis via SI-15 signals. BASKET NAMES: (1) ITM.L — LIVE POSITION (entry 64.8-65p, stop 55p). (2) CWR.L Ceres Power — 336p ABOVE ZONE, watch pullback 280-300p, max £750-1,000. (3) AFC.L AFC Energy — 10.36p IN ZONE, verify cash runway before entry, max £500. (4) H2O.DE Enapter AG — €1.295 IN ZONE €1.20-1.60, max €500, stop €0.90. (5) IES.L Invinity Energy — 16.85p HOLD OFF (revenue risk), entry 14-15p or contract win, max £500. (6) 4DS.DE Daldrup Söhne — €25.5 confirmed, entry zone €23-24.50, stop €20, max €1,000-1,500. (7) PRY.MI Prysmian SpA — ~€92-98, entry €85-92 on pullback, max £2,000-3,000, earnings Apr 29. (8) ALFEN.AS Alfen NV — price unverified, research next session, max £1,500. (9) SSE.L SSE PLC — price unverified, research next session, max £2,000-3,000. (10) SPIE.PA SPIE SA — price unverified, research next session, max £1,000-1,500. (11) NEL.OL Nel ASA — price unverified, research next session, max £500-1,000. (12) UKW.L Greencoat UK Wind — price unverified, income play, any pullback, max £1,000-2,000."
    },
    {
      "id": 30,
      "title": "TACTICAL CEASEFIRE BOOK — EXIT PROTOCOL (S12)",
      "body": "TACTICAL BOOK active from S12. Positions: UPS (BUY GTC 9.00 pending), UAL (BUY GTC 2.08 pending). These are ceasefire fuel-relief plays with HARD EXIT DATE April 21 2026. Exit protocol: (1) Day 7-8 (Apr 16-17): assess all positions, set trailing stops if not at target. (2) Apr 21 LATEST: exit ALL tactical positions regardless of P&L. (3) If any position +10% before Day 7: take half off table, let rest run with tight trailing stop. (4) If ceasefire collapses before Apr 21: exit immediately on confirmed breakdown news. Stops: UAL 0.00 (to be placed on fill), UPS 1.00 (live). DO NOT HOLD TACTICAL POSITIONS THROUGH CEASEFIRE EXPIRY."
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
  }
}
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
