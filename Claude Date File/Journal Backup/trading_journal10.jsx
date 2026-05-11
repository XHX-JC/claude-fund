import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "fund_journal_v2";

const INITIAL_STATE = {
  "lastUpdated": "2026-04-06",
  "fund": {
    "account": "U24936508",
    "netLiquidity": 97900,
    "cash": 36456,
    "availableFunds": 80200,
    "dailyPnL": 37.69,
    "unrealizedPnL": -227.78,
    "realizedPnL": -132.89,
    "broker": "IBKR Pro",
    "baseCurrency": "USD",
    "location": "UAE",
    "ibkrEuropeanAccess": "APPROVED — March 26 2026",
    "cashUSD": 46988,
    "cashEUR": -5116,
    "cashGBP": -3486,
    "cashBase": 36456,
    "lastUpdated": "2026-04-06 SESSION 10 — FINAL",
    "note": "SESSION 10 FINAL. No new positions entered today — decision: hold cash, watch Hormuz Tuesday resolution. 14 live positions fully protected (16 GTC orders, all stops above cost on profitable positions). DUAL THESIS ESTABLISHED: (1) Hormuz/Iran/Energy — 7 Tranche 2 names awaiting Tuesday; (2) US Critical Minerals Independence — 9 Tranche 1 names ready to enter as cash becomes available. Full entry plan locked: 19 watchlist names, 17 pass ≥20% annualised return filter. SI-25 enacted: daily entry monitoring scan runs at every session open from Session 11. Entry proceeds name-by-name as: (a) price optimal; (b) macro confirms; (c) cash available. Minimum 15% cash reserve maintained. Session 11 opens with Entry Readiness Scan as priority action."
  },
  "thesis": {
    "title": "TRUMP EXITS — HORMUZ TOLL REGIME — SUPPLY CHAIN PREMIUM REPLACES WAR PREMIUM",
    "summary": "REVISED SESSION 08: Trump announced US withdrawal from Iran in 2-3 weeks, claiming regime change achieved. Iran FM Araqchi says trust is zero, no negotiations taking place, demands reparations and Hormuz sovereignty. Base case: Trump declares victory and leaves. Iran does not challenge this publicly but insists no active negotiations occurred. Hormuz transitions from closed to Iranian toll regime (Suez-type charges under pretext of war reparations). War premium deflates 10-20% on oil. Supply chain premium persists — fertiliser planting damage already done, helium disruption ongoing but likely to ease under toll regime, EU energy independence policy pivot is STRUCTURAL and permanent. European defence thesis intact as Trump NATO fallout continues. Nuclear buildout accelerated by third energy crisis in 4 years. Key sectors to benefit: EU defence, nuclear supply chain, green hydrogen/electrolysis, fertiliser (N. American producers). Key sectors at risk: airlines, cruise lines, Asian semiconductors (short-term helium), EM equities.",
    "oilWTI": 102,
    "oilBrent": 108,
    "goldPrice": 4580,
    "hormuzStatus": "TRANSITIONING — toll booth regime forming. Yuan-based tolls for China/Russia. Iran allowing selective passage (China, Russia, India, Pakistan, Malaysia, Thailand, humanitarian). Trump announced withdrawal in 2-3 weeks. Iran demanding sovereignty recognition and war reparations. Full reopening unlikely for months even after US withdrawal.",
    "ceasefireFilter": "EVOLVED: Trump claiming victory and withdrawing regardless of deal. Iran FM says no negotiations. Filter now shifts from 'ceasefire vs no ceasefire' to 'speed and terms of Hormuz reopening under toll regime'. Watch for: (1) formal toll fee structure announcement, (2) which nations get preferential access, (3) insurance/shipping rate normalisation timeline, (4) Israel's independent operations continuing.",
    "keyDates": [
      {
        "date": "1 Apr",
        "event": "TRUMP ADDRESS TO NATION 9PM ET (Apr 2 5AM UAE) — expected withdrawal announcement with timeline. Markets will react. Watch oil, airlines, defence.",
        "priority": "CRITICAL"
      },
      {
        "date": "6 Apr",
        "event": "TRUMP ENERGY STRIKE PAUSE EXPIRES 8PM ET — now likely extended or moot if withdrawal announced. Monitor.",
        "priority": "HIGH"
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
      "last": 112.2,
      "marketVal": 5500,
      "unrealPnL": 402,
      "unrealPct": 7.9,
      "stop": 88,
      "target": null,
      "status": "HOLD — STOP LIVE",
      "note": "Nuclear thesis strengthened by EU energy independence push. Stop $88 GTC live."
    },
    {
      "ticker": "AMZN",
      "name": "Amazon.com Inc",
      "shares": 30,
      "avgPrice": 201.204,
      "costBasis": 6036,
      "last": 210.3,
      "marketVal": 6310,
      "unrealPnL": 274,
      "unrealPct": 4.5,
      "stop": null,
      "target": 300,
      "status": "HOLD",
      "note": "AWS/AI diversification play. Earnings Apr 23. Counter-cyclical to oil thesis."
    },
    {
      "ticker": "VST",
      "name": "Vistra Corp",
      "shares": 53,
      "avgPrice": 150.569,
      "costBasis": 7980,
      "last": 153.03,
      "marketVal": 8117,
      "unrealPnL": 137,
      "unrealPct": 1.7,
      "stop": null,
      "target": null,
      "status": "HOLD",
      "note": "Energy/AI data centre power. Earnings May 13."
    },
    {
      "ticker": "RR",
      "name": "Rolls-Royce Holdings",
      "shares": 150,
      "avgPrice": 1182.9,
      "costBasis": 1774,
      "last": 1191.5,
      "marketVal": 1787,
      "unrealPnL": 13,
      "unrealPct": 0.7,
      "stop": null,
      "target": 1395,
      "status": "HOLD",
      "cur": "GBP",
      "note": "NOW GREEN. Defence engines + AUKUS + SMR. Ex-div Apr 23 — hold. Long-term nuclear supply chain anchor."
    },
    {
      "ticker": "LDO.MI",
      "name": "Leonardo SpA",
      "shares": 17,
      "avgPrice": 58.277,
      "costBasis": 991,
      "last": 62.18,
      "marketVal": 1057,
      "unrealPnL": 66,
      "unrealPct": 6.7,
      "stop": 55,
      "target": 68,
      "status": "HOLD — STOP LIMIT LIVE",
      "cur": "EUR",
      "note": "NOW GREEN. EU defence structural thesis. Stop Limit €55.00 trigger / €53.50 limit GTC (upgraded from flat €50 stop — locks in profit). May 5 earnings. Barclays OW €68."
    },
    {
      "ticker": "ITM",
      "name": "ITM Power PLC",
      "shares": 3100,
      "avgPrice": 65.1,
      "costBasis": 2018,
      "last": 62.75,
      "marketVal": 1944,
      "unrealPnL": -74,
      "unrealPct": -3.7,
      "stop": 55,
      "target": 98,
      "status": "NEW — STOP LIVE",
      "cur": "GBP",
      "note": "ENTERED SESSION 08 @ 64.8-65p. EU hydrogen/energy independence play. Record H1 revenue £18M, £152M backlog, £197.8M cash. Currently 62.75p (-3.7% from entry). 8-month consolidation base at 55-70p — still in zone. Stop 55p GTC LIVE. Target 1: 98p. Target 2: 130p."
    },
    {
      "ticker": "R3NK",
      "name": "RENK Group AG",
      "shares": 80,
      "avgPrice": 51.548,
      "costBasis": 4124,
      "last": 54.3,
      "marketVal": 4344,
      "unrealPnL": 220,
      "unrealPct": 5.3,
      "stop": 42,
      "target": 68,
      "status": "HOLD — STOP LIVE",
      "cur": "EUR",
      "note": "NOW GREEN. EU defence backlog €6.68B. Stop €42 GTC. May 6 earnings critical — €200M deferred Q4 orders must appear."
    },
    {
      "ticker": "SHLD",
      "name": "Global X Defence ETF",
      "shares": 69,
      "avgPrice": 72.025,
      "costBasis": 4970,
      "last": 73.97,
      "marketVal": 5105,
      "unrealPnL": 135,
      "unrealPct": 2.7,
      "stop": null,
      "target": null,
      "status": "HOLD",
      "note": "ETF hedge. Near breakeven."
    },
    {
      "ticker": "LEU",
      "name": "Centrus Energy",
      "shares": 13,
      "avgPrice": 188.867,
      "costBasis": 2455,
      "last": 185.66,
      "marketVal": 2417,
      "unrealPnL": -38,
      "unrealPct": -1.6,
      "stop": 145,
      "target": null,
      "status": "HOLD — STOP LIVE",
      "note": "HALEU monopoly. Nuclear supply chain anchor. Stop $145 GTC."
    },
    {
      "ticker": "AMPX",
      "name": "Amprius Technologies",
      "shares": 168,
      "avgPrice": 18.106,
      "costBasis": 3042,
      "last": 16.28,
      "marketVal": 2742,
      "unrealPnL": -300,
      "unrealPct": -9.9,
      "stop": 13,
      "target": 32,
      "status": "STOP LIVE",
      "note": "Stop $13.00 GTC + Limit $32 GTC both live. Stop adjusted from $14 — wider buffer below consolidation lows."
    },
    {
      "ticker": "AVAV",
      "name": "AeroVironment Inc",
      "shares": 25,
      "avgPrice": 195.09,
      "costBasis": 4877,
      "last": 183.28,
      "marketVal": 4585,
      "unrealPnL": -292,
      "unrealPct": -6,
      "stop": 165,
      "target": 311,
      "status": "HOLD — STOP LIVE",
      "note": "Switchblade drone demand persists regardless of US withdrawal — Israel/regional partners continue. Stop $165 GTC."
    },
    {
      "ticker": "PDYN",
      "name": "Palladyne AI Corp",
      "shares": 500,
      "avgPrice": 6.595,
      "costBasis": 3298,
      "last": 6.51,
      "marketVal": 3255,
      "unrealPnL": -42,
      "unrealPct": -1.3,
      "stop": 5,
      "target": null,
      "status": "HOLD — STOP LIVE",
      "note": "Stop $5.00 GTC. SwarmOS. May 13 earnings."
    },
    {
      "ticker": "CODA",
      "name": "Coda Octopus Group",
      "shares": 416,
      "avgPrice": 12.005,
      "costBasis": 4994,
      "last": 12,
      "marketVal": 4959,
      "unrealPnL": -27,
      "unrealPct": -0.5,
      "stop": 9.5,
      "target": 22,
      "status": "STOP LIVE",
      "note": "Underwater defence sensors. Mine-clearing relevance post-Hormuz. Stop $9.50 GTC."
    },
    {
      "ticker": "PLTR",
      "name": "Palantir Technologies",
      "shares": 49,
      "avgPrice": 161.629,
      "costBasis": 7920,
      "last": 147.1,
      "marketVal": 7207,
      "unrealPnL": -712,
      "unrealPct": -9,
      "stop": 135.01,
      "target": null,
      "status": "HOLD — STOP LIVE $135.01 GTC",
      "note": "Golden Dome $185B + Maven POR. Thesis not oil-dependent. Stop RAISED to $135.01 GTC (from $130). May 11 earnings."
    }
  ],
  "pendingOrders": [
    {
      "ticker": "LDO.MI",
      "action": "SELL",
      "type": "Stop Limit",
      "qty": 17,
      "limitPrice": 59,
      "stopPrice": 59.6,
      "tif": "GTC",
      "status": "ACTIVE",
      "note": "SESSION 10 CONFIRMED IBKR: Stop Limit — trigger €59.60, limit €59.00 (confirmed; limit adjusted from €58.50). Above cost (€58.277). Profit-locked."
    },
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
      "ticker": "LEU",
      "action": "SELL",
      "type": "Stop",
      "qty": 13,
      "limitPrice": null,
      "stopPrice": 170.54,
      "tif": "GTC",
      "status": "ACTIVE",
      "note": "SESSION 10 CONFIRMED IBKR: Stop TIGHTENED $145→$170.54. Max loss now ~$163 vs ~$569 at old stop. Allows thesis room above $170 support."
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
      "stopPrice": 106.07,
      "tif": "GTC",
      "status": "ACTIVE",
      "note": "SESSION 10: Stop RAISED $88→$106.07. Above cost ($104.021) — profit-locking stop confirmed IBKR."
    },
    {
      "ticker": "R3NK",
      "action": "SELL",
      "type": "Stop",
      "qty": 80,
      "limitPrice": null,
      "stopPrice": 52.03,
      "tif": "GTC",
      "status": "ACTIVE",
      "note": "SESSION 10: Stop RAISED €42→€52.03. Above cost (€51.548) — profit-locking confirmed IBKR. Q1 earnings 6 May critical."
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
      "stopPrice": 72.5,
      "tif": "GTC",
      "status": "ACTIVE",
      "note": "SESSION 10 CONFIRMED IBKR: Stop Limit — trigger $72.50, limit $72.60. Above cost ($72.025). Profit-locked. Raise to $74.50+ if SHLD rallies on Tuesday strike news."
    },
    {
      "ticker": "VST",
      "action": "SELL",
      "type": "Stop",
      "qty": 53,
      "limitPrice": null,
      "stopPrice": 148,
      "tif": "GTC",
      "status": "ACTIVE",
      "note": "SESSION 10 CONFIRMED IBKR: NEW Stop $148.00. Pragmatic — below cost ($150.57) by $2.57 to avoid noise-triggering on thin gain. Raise to $151+ once VST breaks $155."
    },
    {
      "ticker": "AMZN",
      "action": "SELL",
      "type": "Stop Limit",
      "qty": 30,
      "limitPrice": 205,
      "stopPrice": 204,
      "tif": "GTC",
      "status": "ACTIVE",
      "note": "SESSION 10 CONFIRMED IBKR: NEW Stop Limit — trigger $204.00, limit $205.00. Above cost ($201.204). Profit-locked. Better than flat stop — protects against slippage on gap down. Q1 earnings 23 Apr."
    },
    {
      "ticker": "ABVX",
      "action": "BUY",
      "type": "Limit",
      "qty": 44,
      "limitPrice": 118,
      "stopPrice": null,
      "tif": "GTC",
      "status": "ACTIVE",
      "note": "SESSION 10: BUY Limit $118.00. M&A thesis — Eli Lilly €15bn rumoured. Top biotech takeover target 2026 per Truist. Hold 30 days. June maintenance data binary. CEO not rushing deal."
    },
    {
      "ticker": "MSTR",
      "action": "BUY",
      "type": "Limit",
      "qty": null,
      "limitPrice": 113.5,
      "stopPrice": null,
      "tif": "GTC",
      "status": "ACTIVE",
      "note": "SESSION 10: BUY Limit $113.50 (5,000 USD notional). BTC proxy. Entry 5.3% below market ($119.83). Only fills on BTC/risk-off dip. Hold order this week. Reassess Friday if unfilled."
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
      "body": "RECURRING ERRORS TO ELIMINATE: (1) TIMEZONE ERRORS. (2) STALE POSITION DATA. (3) PRICE VERIFICATION (SI-1). (4) JOURNAL STATE TRACKING. (5) MARKET TIMING SEQUENCE. (6) DIVIDEND CAPTURE — verify ex-div on IBKR. (7) LONG SESSION DISCIPLINE. (8) NEW S08: Always cross-reference prices via Massive Market Data or IBKR before recommendations."
    },
    {
      "id": 18,
      "title": "SLDP Research Report — Completed Mar 30 2026",
      "body": "Deep fundamental analysis completed. Entry: $2.20-2.50. Stop $1.80. Max $500-$1,000. WATCH — DO NOT BUY until decline stabilises."
    },
    {
      "id": 19,
      "title": "STOPPED OUT / CLOSED POSITIONS — REALIZED TRACKING",
      "body": "ONDS: 250 shares stopped $8.50 Mar 30. Loss ~$601. KTOS: 100 shares stopped $65 Mar 30. Loss ~$1,601. CCL: 240 shares sold Mar 26. Profit +$122. UEC: 206 shares sold Mar 31 @ $13.16. Loss ~$127. IAG.L: 2200 shares sold Apr 1 @ 370p. Profit ~£326 (~$410). RCL: 36 shares stopped Apr 2 @ $269.91 (stop $270.00). Loss ~$132. Total net realized since inception: ~$1,519 net loss. Cash position strong — realised losses tracking tighter."
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
      "title": "Cash Preservation — Remain Heavy Post-RCL",
      "body": "STRATEGY S09: Cash position strong (~$37K base). Remain cash heavy in high-volatility environment. Iran conflict ongoing — no resolution imminent. Entry criteria: thesis-aligned dips on watchlist names only. No chasing. Minimum 25% cash reserve maintained. Priority entries on pullback: CF $115-120, NTR $70-73, KTOS reentry $62-67 range, ASY.PA on any dip. Do NOT deploy cash into existing losers to average down."
    },
    {
      "id": 25,
      "title": "DAILY ENTRY MONITORING — WATCHLIST ENTRY RECOMMENDATION PROTOCOL",
      "body": "STANDING INSTRUCTION — Active from Session 11 onwards. At every session open, BEFORE any other analysis, run the Entry Readiness Scan across all 19 watchlist names using this checklist per position: (1) PRICE CHECK: MMD verify current price vs stated entry zone — is it at or below target entry? (2) MACRO CHECK: Has Tuesday resolved? Which scenario played out? Does the macro still support the thesis for this name? (3) NEWS CHECK: Web search for company-specific news in past 48hrs — any adverse earnings preannouncements, regulatory issues, insider selling acceleration, or thesis-breaking events? (4) TREND CHECK: Is price trending toward entry zone (positive) or away from it (negative)? (5) CASH CHECK: Current USD cash balance — can this position be funded without breaching 15% minimum cash reserve? DECISION OUTPUT FORMAT — for each name assessed: STATE ticker, current price, entry zone, separation%, verdict (ENTER NOW / APPROACHING / HOLD / DETERIORATING / REMOVE). If ENTER NOW: state exact position size, stop, and order type. If APPROACHING: state the trigger price that changes verdict to ENTER. Priority order for cash deployment when multiple names ready simultaneously: (A) Highest annualised return; (B) Lowest Tuesday binary exposure; (C) Strongest macro tailwind in past 48hrs. NEVER make an entry recommendation without: (a) MMD-verified current price, (b) macro news check, (c) explicit cash availability confirmation."
    },
    {
      "id": 26,
      "title": "ENTRY READINESS BASELINE — SESSION 10 FINAL STATE",
      "body": "BASELINE SET SESSION 10 — Apr 06 2026. 19 watchlist names. 17 pass ≥20% annualised return filter. NO ENTRIES TODAY — decision: watch Hormuz thesis play out, Tuesday event resolves first. TRANCHE 1 (low Tuesday exposure — enter when price optimal): MP@$49.73 target$90 2yr, FCX@$61.38 target$90 1yr, UUUU@$17.75 target$32 18mo, PPTA@$29.43 target$55 2yr, HAL@$38.17 target$52 1yr, REMX@$88.90 target$130 18mo, NXE@$11.73 target$22 30mo, LAC@$4.04 target$15 30mo, ALB@$178.09 target$280 18mo. TRANCHE 2 (post-Tuesday Hormuz — enter when Tuesday resolved AND thesis holds): LNG@$281 target$400, OXY@$63 target$95, RTX@$196 target$245, BKR@$60 target$85, STNG@$76 target$105, BKNG@$168 target$250, AER@$139 target$205. TRANCHE 3 (price trigger only): NVDA needs $165-170, CF needs $115, GEV needs $835. CASH AVAILABLE: ~$47K USD. EXISTING PORTFOLIO: 14 positions, all holds confirmed. RR. ex-div 23 Apr — DO NOT SELL. Session 11 opens with SI-25 Entry Readiness Scan as first action."
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
    }
  ],
  "watchlistEU": [
    {
      "ticker": "R3NK",
      "name": "RENK Group AG",
      "exchange": "XETRA",
      "ibkr": "R3NK IBIS",
      "current": 52,
      "entry": "IN PORTFOLIO — €51.55 avg",
      "target": 68,
      "cur": "EUR",
      "upside": 31,
      "thesis": "IN PORTFOLIO. Stop €42 GTC. May 6 earnings. 14 analyst Buy consensus €68.",
      "note": "STOP €42 GTC LIVE"
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
