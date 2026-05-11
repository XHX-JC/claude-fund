import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "fund_journal_v2";

const INITIAL_STATE = {
  "lastUpdated": "2026-03-27",
  "fund": {
    "account": "U24936508",
    "netLiquidity": 97400,
    "cash": 18412,
    "availableFunds": 76900,
    "dailyPnL": -224,
    "unrealizedPnL": -2713,
    "realizedPnL": 122.35,
    "broker": "IBKR Pro",
    "baseCurrency": "USD",
    "location": "UAE",
    "ibkrEuropeanAccess": "APPROVED — March 26 2026",
    "cashUSD": 37073,
    "cashEUR": -5114,
    "cashGBP": -9588,
    "cashBase": 18412,
    "lastUpdated": "2026-03-27 EOD",
    "note": "Session 04. IAG.L 2200@355.18p filled. LDO.MI 17@58.10 filled. PDYN/KTOS/R3NK stops placed. CCL closed +$122.35. 16 positions live. SI-8 $10K deployed to IAG."
  },
  "thesis": {
    "title": "IRAN HOLDS HORMUZ — OIL STAYS ELEVATED",
    "summary": "Master thesis: Iran controls Strait of Hormuz, oil stays structurally elevated. NEW (Mar 27): Iran parliament formally legislating Hormuz toll fees — at least 2 vessels paid in yuan. GCC confirms de facto toll booth regime. IRGC Navy commander Tangsiri killed (Mar 26) — architect of blockade removed. Iran allowed 10 tankers through as good faith gesture but rejected US 15-point plan and submitted own 5-point plan demanding Hormuz sovereignty. Trump extended pause to April 6 at Iran's request. Thesis 100% intact and hardening structurally. Goldman Q2 Brent target $110 reached intraday. WTI $94.48 (+4.6% Mar 27). Brent $108.01. QatarEnergy Ras Laffan struck March 2. Europe gas storage 46 bcm — lowest since 2022. TTF +34% since March 1.",
    "oilWTI": 94.48,
    "oilBrent": 108.01,
    "goldPrice": 4435,
    "hormuzStatus": "TOLL BOOTH REGIME — Iran parliament formalising fees. 2 vessels paid in yuan. 10 tankers allowed through as good faith. IRGC Navy commander Tangsiri killed Mar 26. Structurally controlled not temporarily disrupted.",
    "ceasefireFilter": "DISREGARD ALL US-LED ceasefire news unless Iranian side CONFIRMS. Iran rejected 15-point plan and submitted own 5-point counter (demands Hormuz sovereignty). Trump pause extended to April 6 AT IRAN'S REQUEST — qualifies as Iran-side engagement but is tactical not capitulation. Thesis 100% intact. APRIL 6 IS HARD WATCH DATE.",
    "keyDates": [
      {
        "date": "30 Mar",
        "event": "RR.L GTD — CONFIRMED FILLED at 1182.9p. No action needed.",
        "priority": "DONE"
      },
      {
        "date": "6 Apr",
        "event": "TRUMP ENERGY STRIKE PAUSE EXPIRES 8PM ET (April 7 00:00 UAE) — BINARY EVENT FOR IAG. If talks collapse and strikes resume → EXIT IAG immediately. If extended again or ceasefire signal → HOLD/ADD IAG.",
        "priority": "CRITICAL"
      },
      {
        "date": "23 Apr",
        "event": "RR.L Ex-dividend — DO NOT SELL BEFORE THIS DATE",
        "priority": "HIGH"
      },
      {
        "date": "30 Apr",
        "event": "NOG Q1 Earnings (watchlist)",
        "priority": "MONITOR"
      },
      {
        "date": "5 May",
        "event": "LDO.MI Q1 Earnings — first catalyst for new position",
        "priority": "HIGH"
      },
      {
        "date": "6 May",
        "event": "R3NK Q1 Earnings — €200M deferred Q4 orders must appear here. HAG also reports.",
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
        "date": "13 May",
        "event": "VST + PDYN Earnings",
        "priority": "MEDIUM"
      },
      {
        "date": "18 May",
        "event": "ONDS Q1 Earnings — first call post-Mistral acquisition",
        "priority": "HIGH"
      },
      {
        "date": "23 Jun",
        "event": "AVAV Q1 Earnings",
        "priority": "HIGH"
      },
      {
        "date": "30 Jul",
        "event": "RR.L H1 Earnings",
        "priority": "HIGH"
      }
    ]
  },
  "positions": [
    {
      "ticker": "AMPX",
      "name": "Amprius Technologies",
      "shares": 168,
      "avgPrice": 18.106,
      "costBasis": 3042,
      "last": 17.36,
      "marketVal": 2916,
      "unrealPnL": -125,
      "unrealPct": -4.1,
      "stop": 14,
      "target": 32,
      "status": "STOP LIVE",
      "note": "Stop 4 GTC. Limit sell 2 GTC."
    },
    {
      "ticker": "AVAV",
      "name": "AeroVironment Inc",
      "shares": 25,
      "avgPrice": 195.09,
      "costBasis": 4877,
      "last": 196.11,
      "marketVal": 4903,
      "unrealPnL": 26,
      "unrealPct": 0.5,
      "stop": 165,
      "target": 311,
      "status": "HOLD",
      "note": "Filled Mar 26 market. Stop $165 GTC live. Thesis: Switchblade Iran. Earnings Jun 23."
    },
    {
      "ticker": "CODA",
      "name": "Coda Octopus Group",
      "shares": 416,
      "avgPrice": 12.005,
      "costBasis": 4994,
      "last": 11.55,
      "marketVal": 4805,
      "unrealPnL": -189,
      "unrealPct": -3.8,
      "stop": 9.5,
      "target": 22,
      "status": "STOP LIVE",
      "note": "Stop .50 GTC."
    },
    {
      "ticker": "KTOS",
      "name": "Kratos Defense",
      "shares": 100,
      "avgPrice": 81.01,
      "costBasis": 8101,
      "last": 76.28,
      "marketVal": 7628,
      "unrealPnL": -473,
      "unrealPct": -5.8,
      "stop": 65,
      "target": 130,
      "status": "HOLD — STOP LIVE",
      "note": "ORBIT DEAL CLOSED MAR 2 (not end Mar — journal was stale). $352.7M cash deal complete. $1.2B dilutive equity raise. CEO DeMarco sold 800K shares (0 purchases) — SI-6 flag. Stop $65 GTC placed Mar 27. $49M Naval Surface Warfare contract awarded Mar 27. Analyst targets $115–$134. May 6 earnings."
    },
    {
      "ticker": "LEU",
      "name": "Centrus Energy",
      "shares": 13,
      "avgPrice": 188.87,
      "costBasis": 2455,
      "last": 194.5,
      "marketVal": 2529,
      "unrealPnL": 73,
      "unrealPct": 3,
      "stop": null,
      "target": null,
      "status": "HOLD",
      "note": "HALEU monopoly. Profitable. Superior to UEC."
    },
    {
      "ticker": "ONDS",
      "name": "Ondas Inc",
      "shares": 250,
      "avgPrice": 10.905,
      "costBasis": 2726,
      "last": 9.68,
      "marketVal": 2420,
      "unrealPnL": -306,
      "unrealPct": -11.2,
      "stop": 8.5,
      "target": 19,
      "status": "HOLD — STOP LIVE ⚠️",
      "note": "Stop $8.50 GTC live. -12.8% unrealised. IBKR warning flag visible. THESIS UPGRADE Mar 27: Mistral Inc acquisition announced Mar 9 ($175M all-stock). Gives ONDS prime contractor access to $1B+ DoD IDIQ contracts (US Army, Special Operations). Close expected Q2 2026. May 18 Q1 earnings = first post-Mistral call. Hold thesis."
    },
    {
      "ticker": "PDYN",
      "name": "Palladyne AI Corp",
      "shares": 500,
      "avgPrice": 6.595,
      "costBasis": 3298,
      "last": 6.35,
      "marketVal": 3175,
      "unrealPnL": -122,
      "unrealPct": -3.7,
      "stop": 5,
      "target": null,
      "status": "HOLD — STOP LIVE",
      "note": "Stop $5.00 GTC placed Mar 27 (SI-12 actioned). SwarmOS HANGTIME contract. Revenue guidance 4-27M 2026. May 13 earnings."
    },
    {
      "ticker": "PLTR",
      "name": "Palantir Technologies",
      "shares": 49,
      "avgPrice": 161.629,
      "costBasis": 7920,
      "last": 148.99,
      "marketVal": 7299,
      "unrealPnL": -621,
      "unrealPct": -7.8,
      "stop": 130,
      "target": null,
      "status": "HOLD — MENTAL STOP 30",
      "note": "Golden Dome software confirmed (85B). Maven POR. Mental stop 30. Q1 earnings May 11. -7.8% below avg but thesis intact."
    },
    {
      "ticker": "R3NK",
      "name": "RENK Group AG",
      "shares": 80,
      "avgPrice": 51.548,
      "costBasis": 4124,
      "last": 46.63,
      "marketVal": 3730,
      "unrealPnL": -393,
      "unrealPct": -9.5,
      "stop": 42,
      "target": 68,
      "status": "HOLD — STOP LIVE",
      "cur": "EUR",
      "note": "Stop €42.00 GTC placed Mar 27. Support broken at €50.14 — next support €43.35. Stop below that. May 6 earnings: €200M deferred Q4 orders must appear. 14-analyst consensus €68.46 (Berenberg €76). Ceasefire noise causing weakness — thesis intact. Backlog €6.68B."
    },
    {
      "ticker": "RCL",
      "name": "Royal Caribbean",
      "shares": 36,
      "avgPrice": 273.568,
      "costBasis": 9848,
      "last": 277.62,
      "marketVal": 9994,
      "unrealPnL": 146,
      "unrealPct": 1.5,
      "stop": null,
      "target": null,
      "status": "HOLD",
      "note": "Watch CCL Q1 earnings reaction."
    },
    {
      "ticker": "RR",
      "name": "Rolls-Royce Holdings",
      "shares": 150,
      "avgPrice": 1182.9,
      "costBasis": 1774,
      "last": 1150,
      "marketVal": 1725,
      "unrealPnL": -49,
      "unrealPct": -2.8,
      "stop": null,
      "target": 1395,
      "status": "HOLD",
      "cur": "GBP",
      "note": "Filled Mar 26 GTD. Long-term: defence engines + AUKUS + SMR. Ex-div Apr 23 — hold before date."
    },
    {
      "ticker": "SHLD",
      "name": "Global X Defence ETF",
      "shares": 69,
      "avgPrice": 72.025,
      "costBasis": 4970,
      "last": 71.8,
      "marketVal": 4954,
      "unrealPnL": -15,
      "unrealPct": -0.3,
      "stop": null,
      "target": null,
      "status": "HOLD",
      "note": "ETF hedge."
    },
    {
      "ticker": "UEC",
      "name": "Uranium Energy Corp",
      "shares": 206,
      "avgPrice": 13.775,
      "costBasis": 2838,
      "last": 13.13,
      "marketVal": 2705,
      "unrealPnL": -133,
      "unrealPct": -4.7,
      "stop": null,
      "target": null,
      "status": "REVIEW — consider exit",
      "note": "Pre-revenue junior. -03M EBITDA. LEU is superior expression. Exit on bounce."
    },
    {
      "ticker": "VST",
      "name": "Vistra Corp",
      "shares": 53,
      "avgPrice": 150.569,
      "costBasis": 7980,
      "last": 153.06,
      "marketVal": 8056,
      "unrealPnL": 132,
      "unrealPct": 1.7,
      "stop": null,
      "target": null,
      "status": "HOLD",
      "note": "Energy/AI. Earnings May 13."
    },
    {
      "ticker": "IAG.L",
      "name": "Intl Consolidated Airlines Group",
      "shares": 2200,
      "avgPrice": 355.18,
      "costBasis": 7814,
      "last": 354.40,
      "marketVal": 7797,
      "unrealPnL": -26,
      "unrealPct": -0.3,
      "stop": 310,
      "target": 464,
      "status": "HOLD — STOP LIVE",
      "cur": "GBP",
      "note": "PEACE DIVIDEND TRADE. Filled Mar 27 @ 355.18p. Stop 310p GTC bracket active. Counter-thesis: de-escalation = oil drops = airlines re-rate. April 6 is hard watch date — if strikes resume EXIT immediately. If Kharg Island operation begins EXIT. Target 1: 464p (pre-war high). Target 2: 492p (analyst consensus). IAG well fuel-hedged, Barclays OW, €500M buyback. 15 Buy / 1 Sell."
    },
    {
      "ticker": "LDO.MI",
      "name": "Leonardo SpA",
      "shares": 17,
      "avgPrice": 58.277,
      "costBasis": 991,
      "last": 57.74,
      "marketVal": 982,
      "unrealPnL": -9,
      "unrealPct": -0.9,
      "stop": 50,
      "target": 68,
      "status": "HOLD — STOP LIVE",
      "cur": "EUR",
      "note": "Filled Mar 27 @ €58.10 (avg 58.277 incl commission). Stop €50.00 GTC. BVME (Milan). Barclays OW €68, Equita €71. 30% Italian govt shareholder — no dilution risk. €23.8B FY2025 orders (+14.5%). May 5 earnings. Best earnings momentum in EU defence peer group. Lowest ceasefire risk (civilian helicopter revenue 29.5%)."
    }
  ],
  "pendingOrders": [
    {
      "ticker": "IAG.L",
      "action": "SELL",
      "type": "Stop",
      "qty": 2200,
      "limitPrice": null,
      "stopPrice": 310,
      "tif": "GTC",
      "status": "ACTIVE — BRACKET",
      "note": "Bracket stop on IAG.L peace dividend position. Activates automatically. EXIT if Kharg Island operation begins or strikes resume Apr 6."
    },
    {
      "ticker": "KTOS",
      "action": "SELL",
      "type": "Stop",
      "qty": 100,
      "limitPrice": null,
      "stopPrice": 65,
      "tif": "GTC",
      "status": "ACTIVE",
      "note": "Stop placed Mar 27. CEO insider selling flag (SI-6). Orbit deal closed Mar 2."
    },
    {
      "ticker": "PDYN",
      "action": "SELL",
      "type": "Stop",
      "qty": 500,
      "limitPrice": null,
      "stopPrice": 5,
      "tif": "GTC",
      "status": "ACTIVE",
      "note": "SI-12 actioned Mar 27. Previously no stop — now protected."
    },
    {
      "ticker": "R3NK",
      "action": "SELL",
      "type": "Stop",
      "qty": 80,
      "limitPrice": null,
      "stopPrice": 42,
      "tif": "GTC",
      "status": "ACTIVE",
      "note": "Stop placed Mar 27. Below €43.35 next support. May 6 earnings catalyst. Hold to then."
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
      "note": "Protective stop on position."
    },
    {
      "ticker": "CCJ",
      "action": "BUY",
      "type": "Limit",
      "qty": 49,
      "limitPrice": 104,
      "stopPrice": null,
      "tif": "GTC",
      "status": "WORKING — stock ~$111",
      "note": "Patience. Stock above limit."
    },
    {
      "ticker": "AMPX",
      "action": "SELL",
      "type": "Stop",
      "qty": 168,
      "limitPrice": null,
      "stopPrice": 14,
      "tif": "GTC",
      "status": "ACTIVE",
      "note": "Downside protection."
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
      "stopPrice": 9.5,
      "tif": "GTC",
      "status": "ACTIVE",
      "note": "Downside protection."
    },
    {
      "ticker": "ONDS",
      "action": "SELL",
      "type": "Stop",
      "qty": 250,
      "limitPrice": null,
      "stopPrice": 8.5,
      "tif": "GTC",
      "status": "ACTIVE ⚠️",
      "note": "IBKR warning flag on position. Stop 12% below current .68. Hold."
    }
  ],
  "standingInstructions": [
    {
      "id": 1,
      "title": "Price Verification — MANDATORY",
      "body": "NEVER quote a stock price from a search snippet without checking the source publication date. Use web_fetch on Yahoo Finance quote page directly for every price recommendation. State the verified price and timestamp explicitly. If fetch fails, state 'unverified — check IBKR before acting'."
    },
    {
      "id": 2,
      "title": "Analyst Data Verification",
      "body": "Before citing analyst targets or ratings, verify the note date. A target listed as 'recent' may be months old. Never construct a bullish narrative from a sequence of data points without confirming each is current."
    },
    {
      "id": 3,
      "title": "State Tracking — No Repetition",
      "body": "Before adding any item to pending orders or watchlist, check whether it already appears in the current session. R3NK filled Mar 26 — never list as pending again. CCL sold Mar 26 — never list as position again."
    },
    {
      "id": 4,
      "title": "Evidence Matching",
      "body": "The conclusion must match the evidence cited. If consensus target equals current price, do not describe as 'asymmetric'. If data is mixed, present it as mixed. No promotional language."
    },
    {
      "id": 5,
      "title": "Iran Ceasefire Filter",
      "body": "Disregard ALL US-led ceasefire news unless Iranian side CONFIRMS. Iran rejected 15-point plan. Hormuz sovereignty demand is a non-starter for US. Thesis intact until Iran confirms."
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
      "title": "IAG $10K Reserve",
      "body": "$10,000 reserved for IAG re-entry on oil spike when 5-day pause expires 28-31 March. Do not deploy this cash for anything else."
    },
    {
      "id": 9,
      "title": "European Scan Mandate",
      "body": "Every full scan MUST include R3NK, HAG, LDO, HO, CHG, BA, BAB, CHRT, RR.L, THEON, SAF and broader EU/UK small-cap defence universe."
    },
    {
      "id": 10,
      "title": "Nuclear Scan Mandate",
      "body": "Every full scan includes: Germany legal ban movement, EU SMR funding, RR.L SMR contracts, LNG storage TTF prices, EDF milestones, BWXT contract wins."
    },
    {
      "id": 11,
      "title": "UEC Review Flag",
      "body": "UEC is a pre-revenue junior with negative EBITDA -$103M. LEU is the superior nuclear expression — profitable HALEU monopoly. Consider exiting UEC on any bounce."
    },
    {
      "id": 12,
      "title": "PDYN Stop Flag",
      "body": "PDYN has no stop in place. Recommend setting GTC stop at $5.00. Very early stage company, negative margins."
    },
    {
      "id": 13,
      "title": "ASTS Watchlist Scan",
      "body": "Every full scan MUST check ASTS: (1) BlueBird satellite launch confirmations — any new launches? (2) 45-satellite milestone progress — on track? (3) Commercial service activation news. (4) New MNO partner signings. (5) Additional equity or convertible note raises — dilution flag. (6) Insider buying vs selling balance. (7) Stock price — if drops to $80-85 range, flag for potential entry at 1% portfolio size max with $65 stop. DO NOT enter above $95. Added to watchlist Mar 26 at $93.40."
    },
    {
      "id": 14,
      "title": "Full Scan Checklist — MANDATORY AT SESSION START",
      "body": "EVERY SESSION opens with this scan in full. No exceptions. Run each section in order: (A) IBKR SCREENSHOT FIRST — share fresh positions + orders screenshot. Cross-check every ticker, share count, avg price, stop and limit order against journal. Flag any discrepancy before discussing anything else. (B) IRAN / OIL / HORMUZ — WTI and Brent prices verified via web_fetch. Hormuz status. Any Iranian confirmation of ceasefire? (Iran Filter: disregard ALL US-led news unless IRAN side confirms — see SI5.) IAG window status — is 0K reserve still needed? (C) PORTFOLIO POSITIONS — for each live position: any news since last session, earnings date approaching, stop levels still appropriate, any reason to exit or add. Flag ONDS warning, PLTR mental stop 30, UEC exit consideration, PDYN stop needed. (D) EUROPEAN DEFENCE — mandatory scan: R3NK, HAG, LDO, HO, CHG, BA, BAB, CHRT, RR.L, THEON, SAF. Contract wins, earnings, order intake, entry opportunities. (E) NUCLEAR — Germany legal ban movement, EU SMR funding, RR.L SMR pipeline, LNG/TTF storage, EDF milestones, BWXT contract wins, LEU vs UEC comparison. (F) US WATCHLIST — IAG trigger check, BKSY entry zone check, GOLD price, ASTS satellite launch progress, LUNR contract updates, CCRN earnings inflection, SLDP SK On site acceptance, SES commercial validation, QSI Proteus update, CWR.L licensing news. (G) SPECULATIVE BASKET SCAN — for BKSY, SES, SLDP, QSI, CWR.L: any news separating one from the pack? Market chatter suggesting timing is right for entry? Apply stock watching criteria from SI15. (H) CONGRESSIONAL TRADING — QuiverQuant and CapitolTrades for Armed Services / Intelligence / Energy committee buys in defence and energy names. (I) MACRO — Fed rates, oil inflation trajectory, US-Iran war status, tariff developments, USD strength. (J) ERRORS CHECK — verify every price via web_fetch Yahoo Finance before recommending any action. Never use search snippet prices."
    },
    {
      "id": 15,
      "title": "Small Cap Rerating + Stock Watching Criteria",
      "body": "FULL SCAN SECTION G — applies to both the speculative basket and the ongoing rerating sweep. STOCK WATCHING CRITERIA (what to look for to separate a name from the pack or confirm timing for entry): (1) CONTRACT OR CUSTOMER WIN — a named commercial deal, not an MOU. Revenue impact quantifiable. (2) TECHNOLOGY VALIDATION — lab result moves to customer test or pilot. For SLDP: SK On site acceptance. For QSI: first pharma/enterprise contract. For SES: named commercial materials customer. (3) ANALYST INITIATION OR UPGRADE — from a firm that has not previously covered the name. First analyst coverage is a liquidity signal. (4) INSIDER BUYING — C-suite purchase of stock on open market. Meaningful dollar amount vs salary. Weight positively. (5) EARNINGS INFLECTION — revenue acceleration or first profitable quarter signals that the thesis is crystallising. (6) SHORT SQUEEZE SETUP — high short interest + positive catalyst = violent upside. (7) SECTOR CATALYST — a news event affecting the whole sector that disproportionately benefits one name (eg NDAA enforcement benefiting UMAC). ENTRY TIMING SIGNALS: stock pulling back on broad market weakness not company-specific news, volume drying up at support, insider buying at lows. EXIT / REMOVE FROM WATCH SIGNALS: thesis-breaking event, competitor proves superior technology, key partner abandons, management credibility failure. RERATING SWEEP CRITERIA (cross-sector, all sectors, run each session): market cap 00M-00M strictly, NOT surged >40% past 12 months, unfashionable / under 5 analyst ratings, binary catalyst with 12-month timeline, real revenue or signed contract pipeline, check insider buying and short interest. Flag each name with: verified price, market cap, 12M performance, analyst count, binary catalyst + timeline, upside if catalyst fires, red flags. Position size max 1-2% portfolio. Hard stop mandatory."
    },
    {
      "id": 16,
      "title": "IAG Peace Dividend Position — Exit Rules",
      "body": "IAG.L 2200 shares @ 355.18p. Stop 310p GTC bracket. HARD EXIT TRIGGERS (do not wait, exit at market open): (1) US resumes strikes on Iranian energy infrastructure after April 6 deadline. (2) Kharg Island ground operation begins. (3) Iran formally closes Hormuz completely (beyond current partial). (4) Oil breaks above $115 sustained. HOLD/ADD TRIGGERS: April 6 pause extended again. Iran confirms ceasefire framework. Oil drops 15%+ confirming de-escalation. Target 1: 440-464p (pre-war high). At T1 trim 50% and raise stop to 380p. Target 2: 492p (analyst consensus)."
    },
    {
      "id": 17,
      "title": "CLAUDE ERROR REDUCTION — LESSONS LEARNED SESSION 04",
      "body": "RECURRING ERRORS TO ELIMINATE: (1) TIMEZONE ERRORS — Always verify UAE time = UTC+4. Milan opens 12:00 UAE (09:00 CET). London opens 12:00 UAE (08:00 GMT). US opens 17:30 UAE (13:30 ET). NEVER assert a market is open or closed without checking the current UAE time against these. (2) STALE POSITION DATA — Cross-check journal against IBKR screenshot before flagging any pending catalyst as upcoming. KTOS Orbit deal was already closed Mar 2 but journal said 'closing end Mar'. Check news before repeating journal text as current. (3) RR.L GTD — Was confirmed filled in the IBKR screenshot but flagged as action item 4+ times. Once a fill is visible in IBKR positions tab with shares and avg price, it is CONFIRMED. Do not add it to action lists again. (4) PRICE VERIFICATION (SI-1) — Never use prices from search snippets. Always state the date of the source. If price is stale say so. NOG was quoted at $27-28 when IBKR showed $30.75 — a $3 gap that changed the entire entry thesis. (5) JOURNAL STATE TRACKING — Before every session, ingest all journal data and do not contradict it mid-session. If a stop was set, do not re-flag it as missing later. (6) MARKET TIMING SEQUENCE — Milan opens 12:00 UAE. Do not state market is open when it is 10:57 AM UAE. Do not assume Friday is a market holiday. (7) DIVIDEND CAPTURE — Always verify ex-div date on IBKR directly before suggesting dividend capture. Sources conflict. IBKR is ground truth. (8) LONG SESSION DISCIPLINE — In long sessions, re-read the open action items list before closing to ensure nothing was double-counted or left unresolved."
    }
  ],
  "watchlistUS": [
    {
      "ticker": "IAG",
      "name": "IAG.L (LSE)",
      "exchange": "LSE",
      "current": "355p",
      "entry": "IN PORTFOLIO — 2200 shares @ 355.18p",
      "target": "464p / 492p",
      "status": "IN PORTFOLIO — STOP 310p",
      "thesis": "Peace dividend trade. De-escalation = oil drops = airlines re-rate. Stop 310p bracket. April 6 hard watch date."
    },
    {
      "ticker": "VLO",
      "name": "Valero Energy Corp",
      "exchange": "NYSE",
      "current": null,
      "entry": "Verify on IBKR — only on pullback",
      "target": "$237",
      "status": "WATCH — IRAN THESIS ALIGNED",
      "thesis": "Goldman Sachs top oil refiner pick 2026 (target $237). US refiners benefit when Hormuz disrupted — process domestic WTI, gain margin advantage vs global peers. +48% 3-month. Only enter on pullback. 1-2% max."
    },
    {
      "ticker": "NOG",
      "name": "Northern Oil & Gas",
      "exchange": "NYSE",
      "current": "$30.75",
      "entry": "$26-27.50 — below $27.75 offering price",
      "target": "$32-34",
      "status": "WATCH — ENTRY BELOW OFFERING PRICE ONLY",
      "thesis": "Non-operated E&P. FCF scales 1:1 with oil price above $68 hedge floor. 6.5% dividend yield ($1.80/yr). 45K bbl/day hedged H1 2026 at $68/bbl floor. Utica acquisition adds scale. BofA $32, Mizuho $31. SI-6 flag: $200M dilutive equity offering Mar 13 at $27.75. Do not enter above offering price. Ex-div Mar 30 — already passed for Q1 2026 dividend. Next div Q2. Stop: $23.50. Earnings Apr 30."
    },
    {
      "ticker": "LNG",
      "name": "Cheniere Energy",
      "exchange": "NYSE American",
      "current": null,
      "entry": "Verify on IBKR",
      "target": null,
      "status": "WATCH — LNG THESIS",
      "thesis": "Largest US LNG exporter. Direct beneficiary of European/Asian demand replacing Qatar (Ras Laffan struck Mar 2) and Russia. TTF +34% since Mar 1. Long-term contracted supply to Europe. Complements LEU nuclear thesis — both are European energy security plays. 1-2% max. Verify price and stop before entry."
    },
    {
      "ticker": "BKSY",
      "name": "BlackSky Technology Inc",
      "exchange": "NYSE",
      "status": "WATCH — DO NOT BUY AT CURRENT PRICE. Entry on pullback to $20-22 only.",
      "addedDate": "2026-03-26",
      "currentPrice": 26.41,
      "priceVerified": "TradingView Mar 26 ✅",
      "priceNote": "Up 7.21% today, +29% this week, +196% past 12 months. Market cap $1.03B — has crossed $900M ceiling.",
      "stopIfEntered": 16,
      "positionSizeMax": "1-2% portfolio on pullback only",
      "analystTargets": {
        "consensus": 27.625,
        "high": 42,
        "low": 20,
        "analysts": 7,
        "rating": "Strong Buy"
      },
      "nextEarnings": "2026-05-13",
      "thesis": "Space-based intelligence platform. FY2025 revenue $107M. Backlog $345M (+32% YoY). 2026 guidance $120-145M, adj. EBITDA $6-18M positive. 4th Gen-3 satellite commissioned March 12 — 35cm imagery + AI analytics now in general availability. 8-figure sovereign contract Feb 17. 7-figure Assured extension March 17. International revenues >50% of total. Gross margin 66.88%. Category shift thesis: satellite operator → defence intelligence platform on recurring sovereign subscriptions.",
      "binaryRerating": "Q1 May earnings beat on guidance trajectory. Pilot customers converting to multi-year Assured subscriptions. Additional 8-figure sovereign contracts. 8-9 satellite constellation by end-2026.",
      "flags": "⚠️ Move already happened — 196% in 12 months, 29% this week alone. Debt/Equity 212%. Net loss -$70M FY2025. Consensus target barely above current price. Entry only on meaningful pullback.",
      "scanTriggers": [
        "New 8-figure sovereign contracts",
        "Gen-3 pilot-to-Assured conversions",
        "Price pull to $20-22 entry zone",
        "Q1 earnings May 13"
      ],
      "lastScanUpdate": "2026-03-26: $26.41. Above entry. Market cap $1.03B. WAIT for pullback.",
      "entry": "$20-22 pullback only. Consensus $27.63 = only 4.6% upside from $26. DO NOT chase."
    },
    {
      "ticker": "GOLD",
      "name": "Barrick Mining",
      "exchange": "NYSE",
      "current": null,
      "entry": "Wait gold reclaims $5,000",
      "target": null,
      "status": "WATCH",
      "thesis": "Gold paradox: war = safe haven BUT energy inflation keeps Fed on hold suppressing gold. 18/24 analysts Buy. Wait."
    },
    {
      "ticker": "UMAC",
      "name": "Unusual Machines Inc",
      "exchange": "NYSE American",
      "status": "WATCH — Small Cap Rerating Candidate",
      "addedDate": "2026-03-26",
      "currentPrice": "~$14.66-15.54 (unverified — check IBKR)",
      "marketCap": "~$587-711M — within $100M-$900M criteria ✓",
      "stopIfEntered": 9,
      "positionSizeMax": "1-2% portfolio (~$1,000-2,000) maximum",
      "analystTargets": {
        "consensus": 24.2,
        "high": 30,
        "low": 20,
        "rating": "Strong Buy (5 Buy, 0 Sell)"
      },
      "nextEarnings": "2026-05-20",
      "thesis": "Vertically integrated US drone component manufacturer — NDAA-compliant motors, FPV components, drones. Section 1709 NDAA ban on foreign drone components is structural tailwind. Pivoting from consumer retail to defence supply chain. US Army 101st Airborne Division agreement. Performance Drone Works supply deal. Revenue $11.2M 2025 (+101% YoY). $150M raise completed March 2026 = no near-term liquidity risk.",
      "binaryRerating": "Large DoD prime contract for NDAA-compliant component supply — would shift from ~$11M annual run rate to $50M+ immediately and force institutional rerating. Drone Dominance Program participation. PBAS Tranche 1.1 Army selection.",
      "flags": "⚠️ CFO sold 11,413 shares March 2026. CRO sold 13,750 shares March 2026. $150M dilutive offering at $17 completed March 23. Revenue $11.2M vs ~$650M market cap — early stage. EBITDA margin -223%. Pullback from $17 offering price creates better entry opportunity.",
      "watchFor": "DoD prime contract wins, US Army NDAA supply awards, Drone Dominance Program selection, any stock price drop to $11-13 zone",
      "entry": "$11-13 on pullback — near 52-week support"
    },
    {
      "ticker": "CCRN",
      "name": "Cross Country Healthcare",
      "exchange": "NASDAQ",
      "status": "WATCH — Rerating Candidate. Revenue still declining. Wait for Q1 inflection.",
      "addedDate": "2026-03-26",
      "currentPrice": 9.73,
      "priceVerified": "Robinhood Mar 25 ✅",
      "marketCap": "~$314M",
      "perfLast12M": "-53% ✓",
      "stopIfEntered": 7,
      "positionSizeMax": "1-2% portfolio",
      "analystTargets": {
        "consensus": 9.66,
        "high": 11,
        "wedbush": 15,
        "analysts": "handful",
        "rating": "Mixed — Wedbush Outperform, others Hold"
      },
      "nextEarnings": "Q1 2026 — DATE TBC, key catalyst",
      "thesis": "Healthcare staffing turnaround. Zero debt, $109M cash entering 2026. Revenue $1.05B FY2025 vs $314M market cap. CEO Kevin Clark (founder, returned). Technology pivot via IntelliFi platform — licensing to other staffing companies. Goal: exit 2026 with $1B revenue run rate + 4-5% EBITDA margin.",
      "q4ScanFindings": "Q4 2025 earnings March 4: Revenue $236.8M, down 24% YoY and 5% sequentially — worse than consensus $254M. EPS -$0.06 vs estimate +$0.03. Q1 2026 guidance: revenue $235-240M (still declining 18-20% YoY), adj EBITDA $4-5M. Non-cash impairment charges $78M from Aya merger termination. Cash $109M, zero debt. Management guided sequential improvement through 2026 with YoY growth targeted by Q3. CEO said industry has stabilised and is poised for growth.",
      "binaryRerating": "Q1 2026 earnings showing revenue stabilisation or first sequential beat. Management guided YoY growth by Q3 — if Q1 beats low $235-240M guidance, market will re-rate. IntelliFi licensing contracts would be additional catalyst.",
      "flags": "⚠️ Q1 guidance still declining 18-20% YoY — trough not yet confirmed. Revenue miss in Q4. The inflection is coming but may be Q2-Q3 not Q1. Patience required. Watch Q1 earnings date once announced.",
      "scanTriggers": [
        "Q1 earnings date announcement",
        "Any revenue guidance revision upward",
        "IntelliFi licensing deal announcements",
        "First quarter showing YoY growth (targeted Q3)"
      ],
      "lastScanUpdate": "2026-03-26: Q4 earnings confirmed still declining. Q1 guidance $235-240M still weak. Inflection thesis intact but pushed to Q2-Q3 2026. No change to watch status — thesis requires patience.",
      "entry": "$8-10 — near current levels"
    },
    {
      "ticker": "SLDP",
      "name": "Solid Power Inc",
      "exchange": "NASDAQ",
      "status": "WATCH — Imminent catalysts. Small position consideration at $2.50-3.10.",
      "addedDate": "2026-03-26",
      "currentPrice": 3.09,
      "priceVerified": "Investing.com Mar 25 ✅",
      "marketCap": "~$629M",
      "perfLast12M": "Surged $0.68→$8.86 on partnerships, now $3.09 (-65% from high). Upstream catalysts fired; downstream commercial validation NOT YET.",
      "stopIfEntered": 1.8,
      "positionSizeMax": "1% portfolio max (~$1,000) — speculative",
      "analystTargets": {
        "consensus": 7,
        "analysts": 2,
        "rating": "Strong Buy",
        "impliedUpside": "+126%"
      },
      "nextEarnings": "2026-05-12",
      "thesis": "Solid-state battery electrolyte supplier — NOT an EV battery maker. Business model: supply sulfide electrolyte + license cell designs to Samsung SDI, SK On, BMW. $21.7M 2025 revenue (grant/milestone-driven). $336.5M liquidity after Jan $130M raise. Zero debt. 2026 cash burn $85-100M — runway 3x+ covered. Partners: SK On (pilot line installed in Korea), Samsung SDI + BMW (Joint Evaluation Agreement Oct 2025), Ford (JDA extended to Mar 2026).",
      "q4ScanFindings": "Feb 24 earnings: FY2025 revenue $21.7M, net loss $93.4M. SK On site acceptance testing nearing completion — expected Q1 2026. After completion, SLDP begins electrolyte deliveries to SK On for validation. Continuous electrolyte production pilot line to be installed/commissioned by end-2026, expanding capacity to 75 metric tons. Korea JV exploration active in 2026 targeting 500 metric ton commercial facility. Samsung SDI may target production 2027. SK On production target accelerated to 2029. SLDP also exploring LG Energy Solution and Hyundai Motor Group partnerships.",
      "binaryRerating": "IMMINENT: SK On Q1 2026 site acceptance completion announcement (any day). MEDIUM-TERM: Korea commercial JV partnership announcement. END-2026: Continuous pilot line commissioning. Any one of these = market re-rates manufacturability from lab to industrial reality.",
      "flags": "⚠️ Revenue grant-driven not commercial. $8 overhang from retail buyers who chased the surge. Cash burn $85-100M in 2026. Commercialisation still 2027-2030 timeframe. SK On production 2029. This is optionality on a 3-7 year thesis — size accordingly.",
      "scanTriggers": [
        "SK On site acceptance completion (IMMINENT — watch daily)",
        "Korea JV partnership announcement",
        "Samsung SDI commercialisation timeline update",
        "Continuous pilot line commissioning progress",
        "Any new partnership — LG Energy, Hyundai"
      ],
      "positionNote": "Asymmetric small position case: stop $1.80 = ~42% downside. SK On announcement could push to $5-7 = 60-130% upside. Risk/reward favours small position now over waiting for the announcement and buying 20-30% higher.",
      "lastScanUpdate": "2026-03-26: SK On site acceptance imminent. $336M cash. Binary catalysts lined up through 2026. Consider small position at current price.",
      "entry": "$2.50-3.10 current range"
    },
    {
      "ticker": "ASTS",
      "name": "AST SpaceMobile Inc",
      "exchange": "NASDAQ",
      "status": "WATCH — DO NOT BUY YET",
      "addedDate": "2026-03-26",
      "currentPrice": 93.4,
      "stopIfEntered": 65,
      "positionSizeMax": "1% of portfolio (~$1,000) — optionality position only",
      "analystTargets": {
        "low": 41.2,
        "consensus": 88.53,
        "high": 139,
        "deutscheBank": 139,
        "scotiabank": 41.2
      },
      "nextEarnings": "2026-05-11",
      "thesis": "Building first space-based cellular broadband network accessible by unmodified smartphones. 50+ MNO partners covering ~3B potential subscribers. $1.2B+ contracted revenue commitments. $3.9B liquidity — no near-term funding risk. Dual-use military contract with US Space Development Agency $30M. TELUS deal March 2026. Target 45-60 satellites in orbit by end 2026.",
      "bullCase": "If commercial launch succeeds on schedule, category-creating technology at global scale. Deutsche Bank $139 target. SpaceX IPO momentum lifts entire sector.",
      "bearCase": "476x price-to-sales. Revenue $70.9M vs $37B market cap. Beta 2.78 — extremely volatile. Launch delays already shown. CTO sold 40,000 shares March 23. Starlink competition. Every delay pushes commercial revenue out further.",
      "scanTriggers": [
        "BlueBird satellite launch confirmations — check every full scan",
        "45-satellite milestone progress — flag if behind schedule by Q3 2026",
        "Commercial service activation announcements",
        "New MNO partner signings",
        "Additional equity/convertible note raises — dilution flag",
        "Insider buying vs selling balance",
        "Any stock price drop below $80 — reassess entry"
      ],
      "exitTrigger": "If 45-satellite target clearly not on track by Q3 2026, remove from watchlist",
      "flags": "⚠️ CTO sold 40K shares Mar 23. President sold 47K shares. Insider selling pattern. Do NOT enter above $95. Do NOT size above 1% portfolio. This is optionality only — not conviction.",
      "horizon": "12-18 months — needs satellite launch confirmation and first commercial revenue",
      "entry": "80-85 on pullback — near consensus analyst target"
    },
    {
      "ticker": "LUNR",
      "name": "Intuitive Machines Inc",
      "exchange": "NASDAQ",
      "status": "WATCH — Growth conviction hold. NOT a rerating scan candidate. Different category.",
      "addedDate": "2026-03-26",
      "currentPrice": 20.55,
      "priceVerified": "Mar 25 close ✅",
      "marketCap": "~$3.89B — ABOVE $900M rerating scan ceiling. This is a separate allocation decision.",
      "perfLast12M": "YTD +10% before NASA contract surge. Not in the rerating scan universe.",
      "stopIfEntered": 13,
      "positionSizeMax": "1-2% portfolio — medium-term hold, not binary bet",
      "analystTargets": {
        "consensus": 24,
        "high": 26,
        "analysts": 8,
        "rating": "~90% Buy per FactSet"
      },
      "nextEarnings": "TBC — monitor",
      "thesis": "Lunar surface infrastructure company. 5th NASA CLPS task order ($180.4M) awarded March 24 for IM-5 mission to Lunar South Pole using Nova-D lander. $4.8B Space Data Network contract (cislunar communications). 2026 revenue target $900M-$1B. Lanteris acquisition Jan 2026 adds satellite manufacturing. L3Harris SDA Tranche 3 contract. SiriusXM satellite delivery H1 2026. Lunar Terrain Vehicle contract decision upcoming. NASA Gateway pause actually positive — shifts focus to lunar surface infrastructure where LUNR operates.",
      "binaryRerating": "Lunar Terrain Vehicle contract decision (winner = violent re-rate). IM-5 mission success. SDA proliferated warfighter contracts. SpaceX IPO lifting entire space sector.",
      "flags": "⚠️ Market cap $3.89B — not small cap. CEO sold 3,086,803 shares ($52M) in 6 months, zero purchases. CTO sold 723K shares. Very heavy insider selling. Both IM-1 and IM-2 landers toppled on landing — execution risk is real. Funded by government contracts — DOGE/budget risk. Do not oversize.",
      "notReratingCandidate": "This is a government-contract space infrastructure growth story — a different risk profile from the $100M-$900M binary catalyst names. Size separately.",
      "scanTriggers": [
        "Lunar Terrain Vehicle contract announcement",
        "IM-5 mission launch date",
        "SDA Tranche 3 delivery milestones",
        "Any price pull to $16-18",
        "SpaceX IPO filing date — sector catalyst"
      ],
      "lastScanUpdate": "2026-03-26: $20.55 after 14% surge on $180M NASA contract. Insider selling heavy. Wait for price to settle before adding.",
      "entry": "Current or any pullback toward $16-18. DO NOT chase above $22 after NASA pop."
    },
    {
      "ticker": "QSI",
      "name": "Quantum-Si Inc",
      "exchange": "NASDAQ",
      "status": "WATCH — Moonshot only. Smallest possible sleeve ($500 max). Very weak commercial proof.",
      "addedDate": "2026-03-26",
      "currentPrice": 0.845,
      "priceVerified": "Investing.com Mar 22 ✅",
      "marketCap": "~$166-196M ✓ within criteria",
      "perfLast12M": "-17% ✓ has not surged",
      "stopIfEntered": 0.55,
      "positionSizeMax": "$500 MAXIMUM — pure speculation",
      "analystTargets": {
        "consensus": 2.5,
        "high": 4,
        "analysts": 2,
        "rating": "Buy",
        "impliedUpside": "+196%"
      },
      "nextEarnings": "2026-05-07",
      "thesis": "Next-generation protein sequencing platform (proteomics). Proprietary single-molecule detection using semiconductor technology. Platinum instrument launched. Proteus next-gen platform development targeting late 2026 launch. 40+ customers evaluating. $92.9M EBITDA loss vs $166M market cap — burning cash rapidly. Strong cash position relative to cap. Category could be enormous if platform works at scale.",
      "binaryRerating": "Proteus platform launch late 2026 + commercial traction from early customers. Any meaningful enterprise contract or academic institution adoption at scale. 2026 is explicitly a 'transition year' per management.",
      "flags": "⚠️ 2026 revenue guidance ~$1M — this is pre-commercial. Q4 revenue was $451K. NIH funding delays and tariff uncertainties flagged by management. EBITDA margin -3,800%. Stock down 73% from 52-week high. Pure technology optionality, not a business yet. This is the weakest commercial proof of any name on any watchlist.",
      "scanTriggers": [
        "Proteus platform launch announcement (late 2026)",
        "First enterprise or pharma adoption contract",
        "Any revenue guidance increase above $1M",
        "Price approaching $0.55 stop = reassess exit"
      ],
      "lastScanUpdate": "2026-03-26: $0.845. Only add if comfortable losing entire position. Maximum $500.",
      "entry": "Near current $0.85-0.90"
    },
    {
      "ticker": "SES",
      "name": "SES AI Corp",
      "exchange": "NYSE",
      "status": "WATCH — Speculative basket. Monitor for commercial validation signal.",
      "addedDate": "2026-03-26",
      "currentPrice": 1.06,
      "priceNote": "Up 116% in 12 months — fails no-surge criterion but included per speculative basket instruction",
      "marketCap": "~84-611M",
      "entry": "Current or any pullback toward /bin/sh.85-0.95",
      "stopIfEntered": 0.6,
      "positionSizeMax": "1% portfolio max — speculative basket",
      "analystTargets": {
        "note": "Limited coverage"
      },
      "nextEarnings": "TBC",
      "thesis": "AI-for-materials discovery platform. Molecular Universe platform discovered 6 materials breakthroughs tested by 40+ customers. 2025 revenue 1M, 2026 guidance 0-35M (+43-67% YoY). JV with Hisun provides potential 150,000-ton annual capacity. Business model evolution: from battery hopeful to AI materials-discovery platform with commercial output. If investors reprice as AI-materials platform rather than EV battery company, category shift re-rate possible.",
      "binaryRerating": "Commercial materials contract from major battery or chemical customer. Hisun JV production validation. Any enterprise adopting Molecular Universe platform at scale.",
      "flags": "⚠️ Up 116% past 12 months — move already significant. 1M revenue vs ~00M cap. Not yet a proven commercial platform. Weaker operating proof than BKSY or SLDP. Monitor for commercial signal before entering.",
      "scanTriggers": [
        "Hisun JV capacity activation",
        "Enterprise materials customer contract",
        "Molecular Universe platform commercial adoption",
        "Revenue guidance raise above 5M",
        "Price pullback to /bin/sh.85-0.95 entry zone"
      ],
      "lastScanUpdate": "2026-03-26: .06. Added to speculative watchlist basket per session instruction. Watch for commercial proof before entry."
    },
    {
      "ticker": "CWR.L",
      "name": "Ceres Power Holdings PLC",
      "exchange": "LSE",
      "status": "WATCH — Speculative basket. Monitor for distributed power adoption catalyst.",
      "addedDate": "2026-03-26",
      "currentPrice": "~314-333p",
      "priceNote": "Up 339% in 12 months — fails no-surge criterion but included per speculative basket instruction. Earnings today Mar 26.",
      "marketCap": "~£585-612M (~(-780M)",
      "entry": "Any meaningful pullback below 280p",
      "stopIfEntered": "220p",
      "positionSizeMax": "1% portfolio max — speculative basket",
      "analystTargets": {
        "consensus": "381-421p",
        "high": "570p",
        "analysts": 7,
        "rating": "Strong Buy"
      },
      "nextEarnings": "Full year results TODAY Mar 26, 2026",
      "thesis": "UK fuel cell and electrolyser technology licensor. Asset-light licensing model — partners Bosch, Doosan, Delta, Weichai. SteelCell technology for distributed power (data centres, commercial, industrial, marine) and green hydrogen. Centrica partnership announced today to accelerate fuel-cell deployment amid grid delays — exactly the commercial validation catalyst. Reuters also reported China data centre power deal in Nov 2025. If grid constraints drive distributed power adoption at scale, Ceres licences proliferate.",
      "binaryRerating": "Today full year 2025 results + Centrica partnership details. Additional data centre power deals. Bosch or Weichai production ramp confirmation. Grid delay emergency creating distributed power demand surge.",
      "flags": "⚠️ ALREADY SURGED 339% past year — the re-rate has largely happened. Classified as momentum trap by Stockopedia. Earnings losses expected to continue. Trading well above 200-day MA. UK-listed — needs IBKR LSE access (confirmed active). Entry only on significant pullback.",
      "ibkrAccess": "LSE — confirmed active Mar 26",
      "scanTriggers": [
        "Full year results today Mar 26 — flag any revenue/licensing guidance",
        "Centrica partnership rollout news",
        "Additional data centre power contracts",
        "Bosch/Weichai production volume updates",
        "Price pullback below 280p entry zone"
      ],
      "lastScanUpdate": "2026-03-26: ~314-333p. Centrica partnership announced today. Full year results today. Watch results carefully before any entry."
    }
  ],
  "watchlistEU": [
    {
      "ticker": "R3NK",
      "name": "RENK Group AG",
      "exchange": "XETRA",
      "ibkr": "R3NK IBIS",
      "current": 46.63,
      "entry": "IN PORTFOLIO — €51.55 avg",
      "target": 68,
      "cur": "EUR",
      "upside": 46,
      "thesis": "IN PORTFOLIO. Stop €42 GTC. May 6 earnings key — €200M deferred Q4 orders must appear. 14 analyst Buy consensus €68.",
      "note": "STOP €42 GTC LIVE — do not remove"
    },
    {
      "ticker": "HAG",
      "name": "Hensoldt AG",
      "exchange": "XETRA",
      "ibkr": "HAG IBIS",
      "current": 77.15,
      "entry": "€75-78",
      "target": 96,
      "cur": "EUR",
      "upside": 25,
      "thesis": "Radar + EW + optronics. 62% order surge 2025. €8.83B backlog. Every drone detected over Dubai = Hensoldt sensor.",
      "note": "PRIORITY 2 — Deutsche Bank Buy €101. Jefferies Buy €90."
    },
    {
      "ticker": "LDO",
      "name": "Leonardo SpA",
      "exchange": "MILAN",
      "ibkr": "LDO BVME",
      "current": 57.74,
      "entry": "IN PORTFOLIO — €58.10 avg",
      "target": 68,
      "cur": "EUR",
      "upside": 18,
      "thesis": "IN PORTFOLIO. 17 shares @ €58.10. Stop €50.00 GTC. May 5 earnings. Barclays OW €68. Lowest ceasefire risk in EU defence.",
      "note": "STOP €50 GTC LIVE — do not remove. 30% Italian govt shareholder."
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
      "thesis": "MBDA missiles + cybersecurity + SAMP/T NG air defence + IRIS2 satellite. 18 analysts avg €293.",
      "note": "PRIORITY 4 — Triple-threat EU defence electronics."
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
      "thesis": "High explosives near-monopoly. Aircraft countermeasures. NATO restock critical.",
      "note": "PRIORITY 5 — Strong Buy consensus. Earnings Jun 9 2026."
    },
    {
      "ticker": "BA",
      "name": "BAE Systems",
      "exchange": "LSE",
      "ibkr": "BA LSE",
      "current": 2250,
      "entry": "2,200-2,300p",
      "target": 2800,
      "cur": "GBP",
      "upside": 25,
      "thesis": "AUKUS nuclear subs + BATS counter-drone system + AI-enabled. 45% US DoD revenue.",
      "note": "PRIORITY 6 — BATS live-fire trials Q2 2026."
    },
    {
      "ticker": "BAB",
      "name": "Babcock International",
      "exchange": "LSE",
      "ibkr": "BAB LSE",
      "current": 1409,
      "entry": "1,300-1,420p",
      "target": 1700,
      "cur": "GBP",
      "upside": 21,
      "thesis": "Nuclear submarine MRO + AUKUS Barrow + helicopter MRO Gulf states.",
      "note": "PRIORITY 7 — 6 analysts Buy, 0 Sell. Buyback ongoing."
    },
    {
      "ticker": "CHRT",
      "name": "Cohort PLC",
      "exchange": "AIM",
      "ibkr": "CHRT LSE",
      "current": 1290,
      "entry": "1,250-1,350p",
      "target": 1570,
      "cur": "GBP",
      "upside": 22,
      "thesis": "Naval electronics + counter-drone + satellite comms. £135M Royal Navy Ancilia contract.",
      "note": "PRIORITY 8 — RBC Outperform. 16% EPS CAGR. USE LIMIT ORDERS on AIM."
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
      "thesis": "Maritime spinoff Apr 2026 leaves pure-play defence growing 20%+ annually.",
      "note": "WATCH — Wait for April maritime spinoff announcement."
    },
    {
      "ticker": "TKMS",
      "name": "TKMS AG",
      "exchange": "XETRA",
      "ibkr": "TKMS IBIS",
      "current": 85,
      "entry": "Watch",
      "target": null,
      "cur": "EUR",
      "upside": null,
      "thesis": "German submarine manufacturer. Post-Hormuz mine thesis. Iran has Maham 3+7 limpet mines in strait.",
      "note": "WATCH — Submarine/mine clearance demand direct."
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
      "note": "IPO WATCH — Day-one buy when listed."
    }
  ],
  "sessionNotes": [
    {
      "date": "2026-03-27-EOD",
      "note": "SESSION 04 COMPLETE — 27 MAR 2026. PORTFOLIO: 16 positions (up from 14). NET LIQUIDITY: $97.4K. UNREALISED: -$2,713. REALISED P&L TODAY: +$122.35 (CCL close). DAILY P&L: -$224 (-0.23%). FILLS THIS SESSION: (1) LDO.MI 17 shares @ €58.10 GTC BVME — filled during Milan session. Stop €50.00 GTC. (2) IAG.L 2200 shares @ 355.18p LSE — filled at 11:xx UAE. Stop 310p bracket active. SI-8 $10K reserve deployed. STOPS PLACED: PDYN $5.00 GTC (SI-12 actioned). KTOS $65.00 GTC (CEO insider selling — SI-6). R3NK €42.00 GTC (support broken, earnings catalyst May 6). CCL CLOSED: +$122.35 realised profit. Sold Mar 26 ahead of Q1 earnings — correct decision. CCL Q1 results showed -2.14% on earnings day, vindicating exit. KTOS CORRECTION: Orbit deal closed Mar 2 — not end of March as journal stated. Journal updated. ONDS UPGRADE: Mistral Inc $175M acquisition announced Mar 9 — gives prime contractor access to $1B+ DoD contracts. Thesis upgraded. IBKR CROSS-CHECKS: Two full cross-checks both clean — zero discrepancies on 14-16 positions and all orders. IRAN UPDATE: Trump extended pause to April 6 at Iran's request (SI-5 qualifies as Iran-side engagement). Iran parliament formalising Hormuz toll fees — paid in yuan. IRGC Navy commander Tangsiri killed. 10 tankers allowed through as good faith. APRIL 6 IS NOW THE BINARY DATE FOR IAG. PORTFOLIO BRIEFING DOC: Created v1 and v2 (CODA added). Ready to share. WATCHLIST ADDS: VLO (Goldman top oil refiner), NOG (non-operated E&P, 6.5% yield — enter below $27.75 offering price only), LNG (Cheniere, European LNG replacement thesis), HAG (Hensoldt, May 6 earnings)."
    },
    {
      "date": "2026-03-26-EOD",
      "note": "EOD CONFIRMED — Mar 26 2026. FILLS CONFIRMED: CCL 240 sold (profit taken) ✅ | AVAV 25 shares filled @195.09 avg ✅. POSITIONS NOW: 14 holdings. AVAV replaces CCL. Daily P&L: +00 / +0.62% — positive close despite broad weakness. Net liquidity 7.9K. USD cash 7,073. NOTABLE: ONDS -11.2% with IBKR warning flag — stop .50 intact, 12% buffer remaining, thesis unchanged. PLTR -7.8% — Golden Dome confirmed (85B), Maven POR confirmed, mental stop 30 (13% below). R3NK -5.2% — ceasefire noise, thesis intact, May 6 earnings. IRAN: Rejected US 15-point plan. FM stated no direct talks. Hormuz sovereignty demand non-starter. THESIS 100% INTACT. Oil rebound this morning Brent +3.8% to 06. IAG WINDOW OPENS 28-31 MAR — 0K reserved. ORDERS REMAINING: 6 GTC orders (AVAV stop, CCJ limit, AMPX stop+limit, CODA stop, ONDS stop). MIGRATING TO NEW CHAT NEXT SESSION."
    },
    {
      "date": "2026-03-26",
      "note": "FULL SESSION SUMMARY — Mar 26 2026. IBKR EU ACCESS APPROVED. FILLS TODAY: RR.L 150 shares @ 1,175p GTD ✅ | R3NK 80 shares @ €51.51 market ✅. SUBMITTED TONIGHT: AVAV 25 shares market + stop $165 GTC ✅ | CCL 240 shares market sell ✅ (took +$133 profit ahead of earnings — Iran war fuel cost risk). STILL WORKING: CCJ BUY 49 @ $104 GTC. POSITIONS NOW LIVE: AMPX/AVAV/CODA/KTOS/LEU/ONDS/PDYN/PLTR/R3NK/RCL/RR.L/SHLD/UEC/VST. Total unrealised approx -$702. DECISIONS: (1) CCL SOLD — small profit taken ahead of Q1 earnings tomorrow. Iran fuel cost risk outweighs potential upside. (2) AVAV 25 shares — small position. Entry ~$199, stop $165, target $311. Earnings Jun 23. (3) CTRA — SKIPPED. Stock at $35.18 vs consensus $35.17 — no asymmetry. Analyst data was unreliable in initial assessment. (4) R3NK — filled €51.51 this morning. Thesis: €6.68B backlog, 42% off ATH, May 6 earnings. (5) RR.L — filled 1,175p. Long-term hold: defence engines + AUKUS + SMR option. ETF RESEARCH: WDEF approved ($5.6B AUM WisdomTree) — buy when confirmed on IBKR LSE. ARMY rejected (€191M AUM, closure risk). WDEF higher priority. PLTR STATUS: Down -$406 / -5.1%. Golden Dome software role confirmed with Anduril ($185B programme). Maven AI permanent DoD Program of Record. Thesis stronger not weaker. Hold. Mental stop $130 stands. Q1 earnings May 11 is rerating catalyst. UEC FLAG: Consider exit — negative EBITDA -$103M vs LEU which is profitable HALEU monopoly. PDYN FLAG: No stop in place — recommend $5.00 GTC. IAG RESERVE: $10K reserved, untouched. Pause expires 28-31 Mar. ERRORS THIS SESSION: (1) LNG price quoted $205 vs actual $284 — stale search snippet used without date verification. (2) CTRA analyst targets — Argus note described as upgrade was actually a downgrade. Never construct narrative from data without verifying each source date. (3) R3NK listed as pending after confirming filled — state tracking failure in long session. (4) Claude Code setup — recommended wrong install script for Windows before checking. (5) CTRA described as 'clearest asymmetric setup' — conclusion not supported by evidence (stock at consensus target). MACRO: Mediators Turkey/Egypt/Pakistan attempting US-Iran talks. US presented 15-point plan. Iran has NOT confirmed. Thesis intact. Pause expiry 28-31 Mar remains primary oil catalyst. TOMORROW: Confirm AVAV fill | Watch CCL earnings (no longer held) | Watch RCL reaction to CCL | IAG window opens 28-31 Mar."
    },
    {
      "date": "2026-03-25",
      "note": "END OF DAY SUMMARY — Mar 25 2026. FILLS: PDYN 500 @ ~$6.56 market ✅ | UEC 206 @ $14.00 ✅ | AMPX 168 @ $18.50 ✅ | CODA 416 @ $12.00 ✅. NOT FILLED: CTRA Day order expired. CCJ GTC $104 still working. ORDERS: CODA stop $9.50 GTC ✅ | AMPX stop $14.00 GTC ✅ | AMPX sell $32 GTC ✅ | ONDS stop $8.50 GTC ✅. KEY DECISIONS: PLTR hold — Maven POR confirmed. KTOS hold — Orbit deal closing. MACRO: Iran rejected ceasefire. Thesis 100% intact. IAG $10K reserved. WTI $87.68 / Brent $97.98. Goldman Q2 target $110 unchanged."
    }
  ]
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
