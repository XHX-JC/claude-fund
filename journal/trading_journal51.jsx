import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "fund_journal_v3";

// ═══════════════════════════════════════════════════════════════════
// TIMEZONE REFERENCE — MANDATORY (E1)
// NYSE: opens 17:30 UAE / closes 00:00 UAE (EDT=UTC-4; UAE=UTC+4)
// LSE: opens 11:00 UAE (BST Apr-Oct) / closes 19:30 UAE
// Milan/Frankfurt: opens 11:00 UAE / closes 19:30 UAE
// AMC earnings: print AFTER 00:00 UAE. Stop inactive until 17:30 UAE.
// NEVER calculate market hours from memory. ALWAYS read this block.
//
// LIVE PRICE (E20): IBKR TWS ONLY during market hours. No exceptions.
// STATE MEDIA (E22): CENTCOM/Western source required for military claims.
// EU ENERGY (E23): Section N mandatory every full scan — core thesis.
// CLOSE TIMING (SI-68): Do NOT write close files until final screenshots.
// ═══════════════════════════════════════════════════════════════════

const INITIAL_STATE = {
  "lastUpdated": "2026-05-05 SESSION 36 FINAL — 22 positions. UUUU filled @$21.99. LMT filled @$516.73 (SMART -$5.27/sh). V stopped @$321.823 (+$117.58 trade 32). Net liq $105.6K. Daily +$309/+0.29%. SI-67 Section N EU Energy Transition codified. CWR miss = E23/T29. LMT stop RAISE TO $480 = S37 PRIORITY 1.",
  "sessionNumber": "S36-FINAL",
  "fund": {
    "account": "U24936508",
    "netLiquidity": 105600,
    "unrealizedPnL": 4475,
    "realizedPnL": 117.58,
    "realizedPnLNote": "Trade 32: V +$117.58. 30-day IBKR realized: ~+$1,054.",
    "cashUSD": 24857,
    "cashGBP": 637,
    "cashEUR": -2904,
    "broker": "IBKR Pro",
    "note": "v51 FINAL. Tue 5 May 2026. 22 positions. 2 pending GTCs (LAC/TXT). Options L3. LMT stop raise $465→$480 = S37 PRIORITY 1."
  },
  "thesis": {
    "title": "DUAL BLOCKADE — WTI ~$104 — IRAN ATTACKED UAE DIRECTLY — FUJAIRAH FIRE — THESIS AT MAXIMUM STRENGTH",
    "summary": "Iran attacked UAE May 4: 12 ballistic missiles, 3 cruise missiles, 4 drones intercepted. Fujairah oil terminal fire confirmed. CENTCOM denied warship strike (E22 — S35 journal corrected). WTI Mon close $106.42, Tue ~$104. 4 ships/day Hormuz vs 120+ pre-war. Goldman: global oil stocks to 98 days cover by end May. Iran: $140 oil warning. Project Freedom active — CODA potential operational relevance. SI-25 Condition 1 completely unmet. Thesis intact and at structural maximum.",
    "oilWTI": 104.00,
    "oilBrent": 112.67,
    "SI25Trigger": 105.87,
    "SI25PeakRef": 117.63,
    "SI25Status": "⚠️ WTI ~$104 — borderline vs $105.87 (Mon $106.42, Tue pullback). Condition 1 (reopening) COMPLETELY UNMET. Thesis INTACT.",
    "hormuzStatus": "DUAL BLOCKADE. Iran attacked UAE. Fujairah fire. 4 ships/day vs 120+ pre-war. Project Freedom active.",
    "keyDates": [
      {"date": "Wed May 6 — PRIORITY 1", "event": "LMT stop raise $465→$480 — FIRST PHYSICAL ACTION. UUUU Q1 print — ASM timeline, REE revenue. AMD AMC result. R3NK Q1 earnings.", "priority": "CRITICAL"},
      {"date": "Thu May 7 AMC", "event": "AMPX Q1 — T23 LOCKED. No stop changes.", "priority": "HIGH"},
      {"date": "Sat May 11", "event": "CEG Q1 — stop $278, 11.6% clearance.", "priority": "HIGH"},
      {"date": "Thu May 15", "event": "Warsh replaces Powell. Hawkish transition.", "priority": "MEDIUM"},
      {"date": "Sat May 23", "event": "MRVL T23 opens — last chance to raise stop $159.95 before T23 locks.", "priority": "HIGH"},
      {"date": "Wed May 20", "event": "SNPS Q2 — stop $440, 10% clearance.", "priority": "HIGH"},
      {"date": "Thu May 22", "event": "BAH Q4 FY2026 — second tranche gate.", "priority": "HIGH"},
      {"date": "Thu May 28", "event": "MRVL Q1 — T23 locked from May 23.", "priority": "HIGH"},
      {"date": "Mon Jul 28", "event": "V re-entry watch — Q3 FY2026 earnings. Monitor for $305-315 entry.", "priority": "MEDIUM"},
      {"date": "~Jul 2026", "event": "ASM acquisition closing. UUUU transformation gate.", "priority": "MEDIUM"},
      {"date": "S37 ONGOING", "event": "Create research/EU_ENERGY_TRANSITION_THESIS.md — Stage 1: PCELL/NCR/ORSTED/CNA.L", "priority": "HIGH"}
    ]
  },
  "positions": [
    {"ticker": "AMZN", "shares": 30, "avgPrice": 201.204, "last": 276.69, "unrealPnL": 2265, "unrealPct": 37.5, "stop": 251.38, "stopType": "Stop Limit", "stopLimit": 224, "status": "HOLD — STOP $251.38 / $224 SL", "note": "AWS thesis intact."},
    {"ticker": "ABVX", "shares": 50, "avgPrice": 109.89, "last": 120.42, "unrealPnL": 509, "unrealPct": 9.3, "stop": 109.93, "status": "HOLD — STOP $109.93 — M&A STRATEGIC EXCEPTION", "note": "Royalty buyback: sophisticated investors took equity at $111.57. M&A thesis reinforced. Maximum room strategy intact."},
    {"ticker": "AMPX", "shares": 168, "avgPrice": 18.106, "last": 20.76, "unrealPnL": 432, "unrealPct": 14.2, "stop": 18.92, "status": "HOLD — STOP $18.92 — ⚠️ T23 LOCKED — EARNINGS THU MAY 7 AMC", "note": "T23 locked. Standalone limit $32 active. Consider exit post-print if guidance flat."},
    {"ticker": "CRML", "shares": 110, "avgPrice": 9.08, "last": 13.03, "unrealPnL": 438, "unrealPct": 43.8, "stop": 11.20, "status": "HOLD — STOP $11.20 (deliberate buffer) — WTI THESIS", "note": "Deliberate $0.30 buffer below journal $11.50 on volatile name."},
    {"ticker": "MSFT", "shares": 25, "avgPrice": 403.052, "last": 411.35, "unrealPnL": 206, "unrealPct": 2.0, "stop": 373, "status": "HOLD — STOP $373", "note": "Azure +40%, $190B capex."},
    {"ticker": "CCJ", "shares": 50, "avgPrice": 117.02, "last": 121.90, "unrealPnL": 250, "unrealPct": 4.3, "stop": 110, "status": "HOLD — STOP $110 — Q1 BEAT CONFIRMED", "note": "Uranium thesis intact. T23 maintained."},
    {"ticker": "CEG", "shares": 14, "avgPrice": 308.072, "last": 320.00, "unrealPnL": 160, "unrealPct": 3.7, "stop": 278, "status": "HOLD — STOP $278 — EARNINGS SAT MAY 11", "note": "Nuclear power thesis. 11.6% clearance."},
    {"ticker": "MRVL", "shares": 10, "avgPrice": 152.10, "last": 167.48, "unrealPnL": 154, "unrealPct": 10.1, "stop": 159.95, "status": "HOLD — STOP $159.95 — ⚠️ REVIEW MAY 23 PRE-T23", "note": "3.0% clearance. T23 window opens May 23. Earnings May 28."},
    {"ticker": "MSTR", "shares": 15, "avgPrice": 181.067, "last": 187.74, "unrealPnL": 100, "unrealPct": 3.7, "stop": 153.14, "status": "HOLD — STOP $153.14 — BTC $79,831 — SCALE GATE $85K NOT TRIGGERED", "note": "mNAV 0.96x entry. Scale: BTC >$85K confirmed. Kill: BTC <$70K weekly."},
    {"ticker": "LMT", "name": "Lockheed Martin", "shares": 10, "avgPrice": 516.831, "last": 513.25, "unrealPnL": -35, "unrealPct": -0.7, "stop": 465, "status": "NEW S36 — FILLED @$516.73 — 🔴 RAISE STOP $465→$480 S37 PRIORITY 1", "note": "SMART: $516.73 fill vs $522 limit = $5.27/sh improvement. Stop $465 MUST be raised to $480 first action S37. Max loss at $480 = $367 ✅ within SI-35. PAC-3/THAAD thesis — UAE air defence theatre active."},
    {"ticker": "CODA", "shares": 250, "avgPrice": 11.105, "last": 11.52, "unrealPnL": 99, "unrealPct": 3.6, "stop": 10.90, "status": "HOLD — STOP $10.90 — BELOW P20 — DELIBERATE THESIS ROOM", "note": "P20 minimum $11.43. Deliberate. Project Freedom mine clearance thesis."},
    {"ticker": "RR", "name": "Rolls-Royce Holdings", "shares": 100, "avgPrice": 1128.6, "last": 1191.80, "unrealPnL": 63, "unrealPct": 5.6, "stop": 1050, "cur": "GBP", "status": "HOLD — STOP 1050p", "note": "H1 Jul 30 catalyst. EU energy transition position 1/4."},
    {"ticker": "R3NK", "shares": 25, "avgPrice": 52.27, "last": 55.27, "unrealPnL": 75, "unrealPct": 5.8, "stop": 48, "stopType": "Stop Limit", "stopLimit": 47, "cur": "EUR", "status": "HOLD — STOP 48/47 SL — EARNINGS WED MAY 6", "note": "200M EUR deferred orders key metric."},
    {"ticker": "SNPS", "shares": 8, "avgPrice": 495.125, "last": 504.70, "unrealPnL": 74, "unrealPct": 1.9, "stop": 440, "status": "HOLD — STOP $440 — EARNINGS MAY 20", "note": "EDA duopoly. 10% clearance."},
    {"ticker": "BAH", "name": "Booz Allen Hamilton", "shares": 33, "avgPrice": 76.531, "last": 76.62, "unrealPnL": -3, "unrealPct": -0.1, "stop": 69, "status": "HOLD — STOP $69 — MAY 22 Q4 GATE", "note": "Half-size. Civil revenue risk unresolved."},
    {"ticker": "IBM", "shares": 26, "avgPrice": 228.739, "last": 227.94, "unrealPnL": -22, "unrealPct": -0.4, "stop": 208, "status": "HOLD — STOP $208", "note": "Contrarian post-Q1 entry."},
    {"ticker": "CGCT", "shares": 291, "avgPrice": 10.295, "last": 10.39, "unrealPnL": 31, "unrealPct": 1.0, "stop": null, "status": "HOLD — NO STOP — SPAC", "note": "Trust floor ~$10.27."},
    {"ticker": "UUUU", "name": "Energy Fuels Inc", "shares": 50, "avgPrice": 22.011, "last": 22.05, "unrealPnL": 0, "unrealPct": 0.0, "stop": 16.50, "status": "NEW S36 — FILLED @$21.99 — P24 — MAY 6 EARNINGS GATE", "note": "P24 acknowledged. FIRB cleared. May 6 Q1 print = gate. Scale: ASM timeline + REE revenue confirmed. SI-37: $1,100/$1,500 cap used. Average down room: ~21sh additional within SI-37 cap."},
    {"ticker": "NOG", "shares": 200, "avgPrice": 26.771, "last": 26.45, "unrealPnL": -63, "unrealPct": -1.2, "stop": 24.50, "status": "HOLD — STOP $24.50 — RAISE IF WTI $105+ FOR 3 SESSIONS", "note": "WTI ~$104. Hold stop. Raise gate: WTI sustained $105+."},
    {"ticker": "IES", "name": "Invinity Energy Systems", "shares": 3000, "avgPrice": 17.49, "last": 17.05, "unrealPnL": -13, "unrealPct": -2.5, "stopType": "MANUAL ALERT 12.5p", "cur": "GBP", "status": "HOLD — MANUAL ALERT 12.5p", "note": "LDES decision pending."},
    {"ticker": "AVAV", "shares": 15, "avgPrice": 185.067, "last": 173.26, "unrealPnL": -172, "unrealPct": -6.2, "stop": 155, "status": "HOLD — STOP $155 — JUNE 30 Q4 GATE", "note": "Day 2. Backlog +51% YoY. 10.4% stop clearance."},
    {"ticker": "LDO", "name": "Leonardo SpA", "shares": 35, "avgPrice": 56.086, "last": 53.55, "unrealPnL": -88, "unrealPct": -4.5, "stop": 50, "cur": "EUR", "status": "HOLD — STOP €50 — T23 MAINTAINED", "note": "Rearmament thesis. 6.6% clearance. T23 holds."}
  ],
  "pendingGTCs": [
    {"ticker": "LAC", "name": "Lithium Americas", "action": "BUY", "limit": 4.80, "stop": 4.00, "qty": 220, "maxLoss": 176, "last": 5.71, "status": "GTC $4.80 / STOP $4.00 — SI-37 SPECULATIVE", "note": "Thacker Pass Phase 1. Kill: construction halt / DoE suspension / lithium below $10/kg."},
    {"ticker": "TXT", "name": "Textron Inc", "action": "BUY", "limit": 88.00, "stop": 79.00, "qty": 55, "maxLoss": 495, "last": 94.72, "status": "GTC $88 PENDING — ~7% PULLBACK NEEDED", "note": "Bell MV-75 Valor = 20yr military monopoly. 14.3x fwd PE."}
  ],
  "watchList": [
    {"ticker": "V", "name": "Visa Inc", "thesis": "Stopped @$321.823 (+$117.58 trade 32). Post-earnings positioning unwind — NOT thesis break. Q2 FY26 revenue +15%, EPS beat. Business intact. DOJ antitrust + stablecoin disruption are real but structural not immediate.", "entry": "$305-315 — DO NOT re-enter above $321.82 (exit price)", "stop": "$292-295", "gate": "Pullback to entry zone. Q3 earnings Jul 28.", "status": "WATCH — STOPPED OUT — T28 APPLIED"},
    {"ticker": "CWR", "name": "Ceres Power", "thesis": "SOFC/SOEC licensor. Bosch, Doosan, Weichai, Delta partners. +989% year. TODAY +16% on Delta catalyst. ARM model applied to clean energy. Capital-light. EU energy thesis core.", "entry": "500p ONLY — not at 739p current", "gate": "30%+ pullback. Do not chase.", "status": "WATCH — MOMENTUM TRAP RISK — WAIT FOR 500p — SI-67 SECTION N"},
    {"ticker": "PCELL", "name": "PowerCell Sweden (OMXSTO)", "thesis": "PEM hydrogen fuel cells. Bosch partner (S3 stack + refrigeration development). Maritime megawatt systems (MiNaMi EU project). 200K+ testing hours with Bosch. Down 45% from high after SVT critical report — company rebutted with data and certifications. Revenue SEK 95M Q4 2025. Market cap ~SEK 1.46B (~$140M USD). AS9100 aerospace certified.", "entry": "Stage 1 first. Target ~SEK 28-34", "stop": "SEK 22", "gate": "Stage 1 research required. Q1 2026 print (Apr 23) as reference point.", "status": "STAGE 1 REQUIRED S37 — EU ENERGY SECTION N"},
    {"ticker": "NCR", "name": "Thyssenkrupp Nucera (Frankfurt)", "thesis": "Industrial-scale alkaline water electrolysers. Largest in Europe. 300MW Moeve contract (Southern Europe's largest green H2 plant, FID March 2026). Stegra 700MW Sweden (operational 2026). Revenue guidance €450-550M FY2025/26 (trimmed but contracted backlog real). Jefferies Buy, €13 target from ~€8. SI-63 pattern: suppressed vs ATH.", "entry": "Stage 1 first. ~€7-9 entry zone", "stop": "€6", "gate": "Stage 1 research. Confirm order intake recovery.", "status": "STAGE 1 REQUIRED S37 — EU ENERGY SECTION N"},
    {"ticker": "ORSTED", "name": "Orsted (Copenhagen)", "thesis": "World's largest offshore wind developer. 10.2GW installed, 8.1GW under construction. 2026 EBITDA >DKK 28B guided. Sold onshore business ($1.7B) — now pure offshore. US wind project judicial recovery. DKK 165.80 current vs ATH DKK 400+. Beta 0.09. Hormuz conflict directly benefits EU energy independence spending = Orsted order book.", "entry": "Stage 1 first. ~DKK 155-170", "stop": "DKK 130", "gate": "Stage 1 research.", "status": "STAGE 1 REQUIRED S37 — EU ENERGY SECTION N"},
    {"ticker": "CNA", "name": "Centrica (LON)", "thesis": "UK's best nuclear renaissance play (Morningstar). Sizewell C stake embedded in valuation near zero. Leading UK retail gas supplier. Von der Leyen nuclear reversal accelerates Sizewell C pathway. Dividend paying — rare in energy transition sector.", "entry": "Stage 1 first", "stop": "TBD post-Stage 1", "gate": "Stage 1 research. Sizewell C funding progress.", "status": "STAGE 1 REQUIRED S37 — EU ENERGY SECTION N"},
    {"ticker": "ITM", "name": "ITM Power (LSE AIM)", "thesis": "PEM electrolysers. Rheinmetall NATO Giga PtX synthetic fuel network partnership = defence + energy convergence. Revenue guidance £40-43M 2026 (raised Feb 2026). 500MW deployed/contracted + 550MW reservations.", "entry": "135-140p pullback only (currently ~158p)", "gate": "Pullback to entry zone.", "status": "WATCH — RE-ADDED S36 — EXISTING WATCHLIST"},
    {"ticker": "LCII", "name": "LCI Industries", "thesis": "RV components. Merger with PATK collapsed. Stock ~$107 from $159 high. Fwd PE ~12x, yield ~4.3%. Energy headwind real for RV sector (WTI $104). Q1 print read required.", "entry": "$100-103 if Q1 guidance maintained", "gate": "Q1 print today.", "status": "WATCH — Q1 GATE"},
    {"ticker": "INTL", "name": "Intel Corp", "thesis": "Turnaround: 18A HVM, Terafab, NVIDIA $5B stake, US Gov 9.9% shareholder. Apple foundry talks (preliminary). T26/T27 pattern. Not at entry price.", "entry": "$75-82 pullback", "gate": "Apple confirmation OR pullback", "status": "WATCH — NOT AT ENTRY"},
    {"ticker": "AMD", "name": "Advanced Micro Devices", "thesis": "Reports AMC tonight. Data center bar $5.56B. React to miss only.", "entry": "React to miss only", "gate": "AMC print tonight", "status": "WATCH — AMC PRINT TONIGHT"}
  ],
  "shortWatchlist": [
    {"ticker": "PLTR", "thesis": "Q1 +85% YoY. DORMANT until Q2 July.", "status": "DORMANT UNTIL Q2 JULY 2026", "trigger": "Q2 guidance cut only"},
    {"ticker": "AAL", "thesis": "No fuel hedge, $36.5B debt, WTI $104+.", "trigger": "Dead-cat bounce $13-14", "status": "WATCH", "correlationRisk": "HIGH"},
    {"ticker": "CCL", "thesis": "Fuel 12-15% of costs. Consumer squeeze. Fund knows name.", "trigger": "Rally to $23-25", "status": "NEW S36"},
    {"ticker": "SNOW", "thesis": "18x fwd revenue, no earnings, hyperscaler competition.", "trigger": "Earnings miss + guidance trim", "status": "NEW S36"}
  ],
  "euEnergyTransition": {
    "title": "EU/UK ENERGY TRANSITION — SECTION N SCAN (SI-67)",
    "origin": "CWR +989% missed. EU energy transition discussed as core thesis multiple sessions — no formal scan existed. E23 codified. T29 documented. Section N now mandatory in every full scan.",
    "thesisContext": "EU structurally forced to diversify away from LNG/O&G. Hormuz blockade accelerates this. Von der Leyen nuclear reversal. NATO rearmament energy security. EU Grids Package summer 2026. Multi-decade structural transition.",
    "concentrationCeiling": "Maximum 4 positions (RR.L = 1/4, CEG = 1/4). Room for 2 more.",
    "nextCWRPattern": "Capital-light technology licensor + major corporate validation + multiple verticals + early commercial + LSE AIM or European small/mid cap £50M-£500M",
    "stage1Queue": ["PCELL.ST", "NCR.DE", "ORSTED.CO", "CNA.L"],
    "watchOnly": ["CWR.L at 500p", "ITM.L at 135-140p", "AFC.L speculative"],
    "avoided": ["LHYFE.PA — bankruptcy trajectory", "ALMCP.PA — in liquidation"],
    "scanFrequency": "First session of each month + any session with major Hormuz/EU energy news"
  },
  "criticalMineralsThesis": {
    "title": "CRITICAL MINERALS — NATIONAL SECURITY THEME",
    "concentrationCeiling": "CRML (held) + LAC (GTC) + UUUU (held) = MAXIMUM.",
    "candidates": [
      {"ticker": "CRML", "status": "HELD +43.8%", "thesis": "Dual critical minerals + European Lithium acquisition", "stop": "$11.20"},
      {"ticker": "UUUU", "status": "HELD @$21.99 — P24 — MAY 6 GATE", "thesis": "Only US licensed REE separator. FIRB cleared. ASM ~Jul 2026.", "classification": "SI-37 — $1,100/$1,500 cap"},
      {"ticker": "LAC", "status": "GTC $4.80 PENDING", "thesis": "Thacker Pass. DoE backed.", "classification": "SI-37 Speculative"}
    ]
  },
  "scanFramework": {
    "title": "SCAN FRAMEWORK — FULL SUITE (SI-62 to SI-68)",
    "sections": [
      {"section": "0", "si": "SI-39", "name": "Drawdown Screener", "frequency": "Every session", "description": "-15% to -20% from 52-week ATH. Limitation: does not catch multi-year ATH drawdowns (SI-63 supplements)."},
      {"section": "A-K", "si": "SI-14", "name": "Full Thesis Scan", "frequency": "Every session", "description": "Iran/Hormuz thesis, positions, sector threats, congressional trading."},
      {"section": "H L4", "si": "SI-62", "name": "Tier-1 Strategic Investment Monitor", "frequency": "Weekly", "description": "SEC EDGAR for >$500M investments by competitor/sovereign/Tier-1 tech. Same-session Stage 1."},
      {"section": "L", "si": "SI-63", "name": "Deep Turnaround Screen", "frequency": "Monthly", "description": ">40% below ALL-TIME HIGH + 3+ consecutive guidance beats + improving revenue."},
      {"section": "M", "si": "SI-65", "name": "Technology Milestone Calendar", "frequency": "Quarterly build / monthly review", "description": "research/MILESTONE_CALENDAR.md. 6-month forward milestone dates."},
      {"section": "N", "si": "SI-67", "name": "EU/UK Energy Transition Scan", "frequency": "Quarterly + thesis-triggered", "description": "CORE THESIS. CWR miss = E23. Screen: fuel cell/electrolyser tech, industrial H2, nuclear renaissance, grid infrastructure, offshore wind. Next CWR: capital-light IP licensor with major corporate validation, LSE AIM/EU small cap £50M-£500M."},
      {"section": "B ext", "si": "SI-66", "name": "New CEO Credibility Pattern", "frequency": "Quarterly", "description": "New technical CEO at >$5B company down >30% from 5yr high."},
      {"section": "H L5", "si": "SI-64", "name": "Government/National Security Asset Monitor", "frequency": "Quarterly + event-driven", "description": "CHIPS Act equity, DoD Trusted Foundry, ITAR-critical designations."}
    ]
  },
  "tradeTracker": {
    "closedTrades": [
      {"id":1,"ticker":"CCL","dateIn":"2026-03-24","dateOut":"2026-03-26","qty":240,"entry":24.83,"exit":25.35,"ccy":"USD","pnlUSD":122.35,"note":"S07."},
      {"id":2,"ticker":"ONDS","dateIn":"2026-03-24","dateOut":"2026-03-30","qty":250,"entry":10.90,"exit":8.505,"ccy":"USD","pnlUSD":-601.30,"note":"Stopped."},
      {"id":3,"ticker":"KTOS","dateIn":"2026-03-24","dateOut":"2026-03-30","qty":100,"entry":81.00,"exit":64.977,"ccy":"USD","pnlUSD":-1604.27,"note":"P12."},
      {"id":4,"ticker":"UEC","dateIn":"2026-03-25","dateOut":"2026-03-31","qty":206,"entry":13.77,"exit":13.16,"ccy":"USD","pnlUSD":-127.76,"note":"Stopped."},
      {"id":5,"ticker":"IAG","dateIn":"2026-03-27","dateOut":"2026-04-01","qty":2200,"entry":3.55,"exit":3.70,"ccy":"GBP","pnlUSD":407.36,"note":"Peace thesis broken."},
      {"id":6,"ticker":"RCL","dateIn":"2026-03-24","dateOut":"2026-04-02","qty":36,"entry":273.54,"exit":269.91,"ccy":"USD","pnlUSD":-132.89,"note":"Stopped."},
      {"id":7,"ticker":"LEU","dateIn":"2026-03-24","dateOut":"2026-04-07","qty":13,"entry":188.79,"exit":170.26,"ccy":"USD","pnlUSD":-242.94,"note":"P11."},
      {"id":8,"ticker":"LDO","dateIn":"2026-03-27","dateOut":"2026-04-07","qty":17,"entry":58.10,"exit":59.56,"ccy":"EUR","pnlUSD":20.51,"note":"Partial."},
      {"id":9,"ticker":"UPS","dateIn":"2026-04-08","dateOut":"2026-04-08","qty":50,"entry":100.17,"exit":99.60,"ccy":"USD","pnlUSD":-30.61,"note":"Same-day."},
      {"id":10,"ticker":"R3NK","dateIn":"2026-03-26","dateOut":"2026-04-08","qty":80,"entry":51.51,"exit":56.01,"ccy":"EUR","pnlUSD":385.86,"note":"First entry."},
      {"id":11,"ticker":"PLTR","dateIn":"2026-03-24","dateOut":"2026-04-09","qty":49,"entry":161.608,"exit":134.976,"ccy":"USD","pnlUSD":-1307.11,"note":"P6. SI-61 dormant Q1 beat."},
      {"id":12,"ticker":"SHLD","dateIn":"2026-03-24","dateOut":"2026-04-10","qty":69,"entry":72.01,"exit":73.21,"ccy":"USD","pnlUSD":112.65,"note":"Tactical."},
      {"id":13,"ticker":"PDYN","dateIn":"2026-03-25","dateOut":"2026-04-14","qty":250,"entry":6.59,"exit":6.67,"ccy":"USD","pnlUSD":17.42,"note":"Partial."},
      {"id":14,"ticker":"AVAV","dateIn":"2026-03-26","dateOut":"2026-04-15","qty":25,"entry":195.05,"exit":197.945,"ccy":"USD","pnlUSD":70.27,"note":"Re-entered S35 15sh."},
      {"id":15,"ticker":"ITM","dateIn":"2026-04-01","dateOut":"2026-04-17","qty":1100,"entry":65.1,"exit":124.60,"ccy":"GBP","pnlUSD":828.00,"note":"Trim 1. +$2,639 total ITM programme."},
      {"id":16,"ticker":"LNG","dateIn":"2026-04-13","dateOut":"2026-04-17","qty":19,"entry":268.813,"exit":248.00,"ccy":"USD","pnlUSD":-396.54,"note":"Stopped."},
      {"id":17,"ticker":"PATK","dateIn":"2026-04-17","dateOut":"2026-04-17","qty":25,"entry":108.80,"exit":109.256,"ccy":"USD","pnlUSD":9.34,"note":"P17."},
      {"id":18,"ticker":"ABVX","dateIn":"2026-04-06","dateOut":"2026-04-21","qty":44,"entry":117.913,"exit":114.26,"ccy":"USD","pnlUSD":-158.53,"note":"Stopped. Re-entry 50sh."},
      {"id":19,"ticker":"RR","dateIn":"2026-03-26","dateOut":"2026-04-22","qty":150,"entry":1182.88,"exit":1150.00,"ccy":"GBP","pnlUSD":-62.39,"note":"Stopped. Re-entry 100sh."},
      {"id":20,"ticker":"ITM","dateIn":"2026-04-01","dateOut":"2026-04-24","qty":800,"entry":65.1,"exit":141.20,"ccy":"GBP","pnlUSD":770.00,"note":"Trim 2."},
      {"id":21,"ticker":"LLY","dateIn":"2026-04-16","dateOut":"2026-04-25","qty":3,"entry":905.344,"exit":875.54,"ccy":"USD","pnlUSD":-89.41,"note":"T28."},
      {"id":22,"ticker":"CODA","dateIn":"2026-04-08","dateOut":"2026-04-27","qty":416,"entry":12.005,"exit":11.42,"ccy":"USD","pnlUSD":-243.36,"note":"Stopped. P11 re-entry."},
      {"id":23,"ticker":"ISRG","dateIn":"2026-03-24","dateOut":"2026-04-27","qty":22,"entry":459.246,"exit":471.676,"ccy":"USD","pnlUSD":272.24,"note":"Stop triggered. Q1 beat."},
      {"id":24,"ticker":"ITM","dateIn":"2026-04-01","dateOut":"2026-04-28","qty":1200,"entry":65.1,"exit":130.39,"ccy":"GBP","pnlUSD":1041.00,"note":"AIM wick. ITM total +$2,639. Re-added watchlist S36 at 135-140p."},
      {"id":25,"ticker":"ABBV","dateIn":"2026-04-22","dateOut":"2026-04-29","qty":20,"entry":205.22,"exit":191.1608,"ccy":"USD","pnlUSD":-282.27,"note":"Stop BMO."},
      {"id":26,"ticker":"PDYN","dateIn":"2026-03-25","dateOut":"2026-04-29","qty":250,"entry":6.595,"exit":5.815,"ccy":"USD","pnlUSD":-196.00,"note":"Manual exit. E9 created short."},
      {"id":27,"ticker":"CCJ","dateIn":"2026-03-24","dateOut":"2026-04-28","qty":49,"entry":104.021,"exit":119.97,"ccy":"USD","pnlUSD":782.00,"note":"T23 deliberate. Re-entry 50sh."},
      {"id":28,"ticker":"VST","dateIn":"2026-04-08","dateOut":"2026-04-29","qty":53,"entry":150.569,"exit":156.53,"ccy":"USD","pnlUSD":316.00,"note":"GTC stop triggered."},
      {"id":29,"ticker":"PDYN","dateIn":"2026-04-29","dateOut":"2026-04-30","qty":250,"entry":5.7507,"exit":5.85,"ccy":"USD","pnlUSD":-25,"note":"E9 accidental short covered S33."},
      {"id":30,"ticker":"MSFT","dateIn":"2026-04-14","dateOut":"2026-04-30","qty":25,"entry":372.77,"exit":410.38,"ccy":"USD","pnlUSD":940,"note":"Stop triggered. Re-entered 25sh @$403.01."},
      {"id":31,"ticker":"NOG","dateIn":"2026-03-26","dateOut":"2026-05-01","qty":80,"entry":24.383,"exit":26.50,"ccy":"USD","pnlUSD":169.36,"note":"Stop triggered. Re-entered S35 200sh @$26.771."},
      {"id":32,"ticker":"V","dateIn":"2026-03-24","dateOut":"2026-05-05","qty":8,"entry":307.125,"exit":321.823,"ccy":"USD","pnlUSD":117.58,"note":"T28: stop-out ≠ thesis break. Post-earnings positioning unwind. Fundamentals intact. Re-entry: $305-315. Do not chase above $321.82."}
    ],
    "grossRealizedPnLUSD": -650,
    "ibkr30DayRealized": 1054.00,
    "lastUpdated": "2026-05-05 S36 FINAL. Trade 32: V +$117.58. 32 total trades."
  },
  "sessionNotes": [
    {"date": "2026-05-04", "note": "SESSION 35 — IRAN ATTACKS UAE. IRGC fired missiles — 12 ballistic, 3 cruise, 4 drones intercepted. Fujairah oil hub fire. WTI settled $106.42. CENTCOM denied warship strike (E22 codified S36). Three fills: AVAV 15sh, MSTR 15sh, NOG 200sh. P11 revised. T9 amended."},
    {"date": "2026-05-05", "note": "SESSION 36 — PLTR Q1 massive beat (+85% revenue). SI-61 DORMANT. CCJ beat confirmed. LDOS EPS beat/revenue miss — GTC cancelled. LDO.MI T23 holds. ABVX +4.16% royalty buyback signal."},
    {"date": "2026-05-05", "note": "SESSION 36 — ORDER CHANGES. LMT GTC raised $512.96→$515.64→$522 (T25). MRVL stop $158.73→$159.95. UUUU GTC $21.99 submitted (P24 acknowledged). MRVL review gate May 23 calendared."},
    {"date": "2026-05-05", "note": "SESSION 36 — FILLS AND STOP-OUT. UUUU FILLED @$21.99 (avg $22.011). LMT FILLED @$516.73 (SMART -$5.27/sh vs $522 limit). V STOPPED @$321.823 — trade 32 +$117.58. T28 codified: stop-out ≠ thesis break. V re-entry zone $305-315."},
    {"date": "2026-05-05", "note": "SESSION 36 — PDYN Q1: Revenue $3.5M vs $24-27M FY guidance = H2 needs 4x ramp with no contracted anchor. CFO + CLO insider sales March 30. Accumulated deficit $493M. No re-entry. Watch Q3 2026 only."},
    {"date": "2026-05-05", "note": "SESSION 36 — EU ENERGY TRANSITION FORMALISED. CWR at 739p (+989% year). Discussed as core thesis multiple sessions — no formal scan existed. E23 codified (scan omission error). T29 (EU energy = core thesis). SI-67 (Section N scan). Section N added to SI-32 session open protocol. Stage 1 queue: PCELL.ST, NCR.DE, ORSTED.CO, CNA.L. Next CWR screening criteria documented. Research file EU_ENERGY_TRANSITION_THESIS.md to be created S37. Concentration ceiling: 4 positions max (RR.L + CEG = 2/4 occupied)."},
    {"date": "2026-05-05", "note": "SESSION 36 — NEW SIs SI-62 to SI-68 all codified. SI-68: do not write close files until final IBKR screenshots confirmed (learned from premature S36 write). Intel retrospective: SI-62 Tier-1 investment monitor, SI-63 deep turnaround, SI-64 gov/national security, SI-65 milestone calendar, SI-66 CEO pattern."},
    {"date": "2026-05-05", "note": "SESSION 36 FINAL CLOSE — Net liq $105,600 (-$600 vs session open $106,200). Daily P&L +$309/+0.29%. Realized +$117.58 (V). Unrealized +$4,475. 22 positions. 2 pending GTCs. AMD AMC tonight. UUUU May 6. R3NK May 6. LMT stop raise = S37 PRIORITY 1. Fund performance since inception: net liq $105,600 vs $100,000 start = +5.6%."}
  ]
};

const COLORS = {
  bg:"#0d1117",card:"#161b22",border:"#30363d",accent:"#58a6ff",
  green:"#3fb950",red:"#f85149",yellow:"#d29922",blue:"#388bfd",
  text:"#c9d1d9",textDim:"#8b949e",textBright:"#f0f6fc",purple:"#a371f7",
  orange:"#f0883e"
};

export default function TradingJournal() {
  const [data,setData]=useState(()=>{try{const s=localStorage.getItem(STORAGE_KEY);return s?JSON.parse(s):INITIAL_STATE;}catch{return INITIAL_STATE;}});
  const [activeTab,setActiveTab]=useState("positions");
  const [newNote,setNewNote]=useState("");
  useEffect(()=>{try{localStorage.setItem(STORAGE_KEY,JSON.stringify(data));}catch{}},[data]);
  const update=useCallback((d)=>setData(d),[]);
  const addNote=()=>{if(!newNote.trim())return;update({...data,sessionNotes:[...(data.sessionNotes||[]),{date:new Date().toISOString().slice(0,10),note:newNote}]});setNewNote("");};
  const tabs=["positions","gtcs","watch","shorts","eu-energy","scan-sis","minerals","thesis","tracker","notes"];
  const pnlColor=(v)=>v>0?COLORS.green:v<0?COLORS.red:COLORS.textDim;

  return(
    <div style={{background:COLORS.bg,minHeight:"100vh",color:COLORS.text,fontFamily:"monospace",padding:16,maxWidth:1200,margin:"0 auto"}}>
      <style>{`.card{background:${COLORS.card};border:1px solid ${COLORS.border};border-radius:6px;padding:12px}.badge{font-size:10px;padding:2px 6px;border-radius:4px;font-weight:600;display:inline-block}.badge-green{background:rgba(63,185,80,0.15);color:${COLORS.green};border:1px solid rgba(63,185,80,0.3)}.badge-red{background:rgba(248,81,73,0.15);color:${COLORS.red};border:1px solid rgba(248,81,73,0.3)}.badge-amber{background:rgba(210,153,34,0.15);color:${COLORS.yellow};border:1px solid rgba(210,153,34,0.3)}.badge-orange{background:rgba(240,136,62,0.15);color:${COLORS.orange};border:1px solid rgba(240,136,62,0.3)}.badge-grey{background:rgba(139,148,158,0.15);color:${COLORS.textDim};border:1px solid rgba(139,148,158,0.3)}.badge-purple{background:rgba(163,113,247,0.15);color:${COLORS.purple};border:1px solid rgba(163,113,247,0.3)}.badge-blue{background:rgba(56,139,253,0.15);color:${COLORS.blue};border:1px solid rgba(56,139,253,0.3)}.btn{background:${COLORS.card};border:1px solid ${COLORS.border};color:${COLORS.text};padding:6px 12px;border-radius:4px;cursor:pointer;font-family:monospace;font-size:12px}.btn:hover{background:#21262d}.btn-primary{background:rgba(88,166,255,0.15);border-color:rgba(88,166,255,0.4);color:${COLORS.accent}}input{background:${COLORS.card};border:1px solid ${COLORS.border};color:${COLORS.text};padding:8px;border-radius:4px;font-family:monospace;font-size:12px;flex:1}`}</style>

      <div style={{marginBottom:16}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:8}}>
          <div>
            <div style={{fontSize:18,fontWeight:700,color:COLORS.textBright}}>CLAUDE FUND — JOURNAL v51 FINAL</div>
            <div style={{fontSize:11,color:COLORS.textDim,marginTop:2}}>Session 36 Final — Tue 5 May 2026 | {data.fund.account} | 22 positions | 2 pending GTCs</div>
          </div>
          <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
            {[
              {label:"NET LIQ",val:"$105.6K"},
              {label:"UNREAL",val:"+$4,475",color:COLORS.green},
              {label:"DAILY",val:"+$309",color:COLORS.green},
              {label:"WTI",val:"~$104",color:COLORS.orange}
            ].map(m=>(
              <div key={m.label} className="card" style={{textAlign:"center",minWidth:80}}>
                <div style={{fontSize:9,color:COLORS.textDim}}>{m.label}</div>
                <div style={{fontSize:14,fontWeight:700,color:m.color||COLORS.textBright,marginTop:2}}>{m.val}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{marginTop:6,padding:"6px 10px",background:"rgba(248,81,73,0.1)",border:"1px solid rgba(248,81,73,0.3)",borderRadius:4,fontSize:11,color:COLORS.red,fontWeight:600}}>
          🔴 LMT STOP RAISE $465→$480 = S37 PRIORITY 1 | ⚠️ UAE ATTACKED — FUJAIRAH FIRE — THESIS INTACT
        </div>
        <div style={{marginTop:4,padding:"6px 10px",background:"rgba(240,136,62,0.15)",border:"1px solid rgba(240,136,62,0.4)",borderRadius:4,fontSize:11,color:COLORS.orange,fontWeight:600}}>
          FILLS: UUUU @$21.99 ✅ | LMT @$516.73 ✅ (SMART -$5.27) | V STOPPED @$321.82 → Trade 32 +$117.58
        </div>
        <div style={{marginTop:4,padding:"6px 10px",background:"rgba(56,139,253,0.1)",border:"1px solid rgba(56,139,253,0.3)",borderRadius:4,fontSize:11,color:COLORS.blue}}>
          SI-67 SECTION N CODIFIED — EU ENERGY TRANSITION IN SCANS | CWR MISS = E23/T29 | Stage 1: PCELL/NCR/ORSTED/CNA
        </div>
      </div>

      <div style={{display:"flex",gap:4,marginBottom:12,flexWrap:"wrap"}}>
        {tabs.map(t=>(<button key={t} className={`btn ${activeTab===t?"btn-primary":""}`} onClick={()=>setActiveTab(t)} style={{textTransform:"uppercase",fontSize:11}}>{t}</button>))}
      </div>

      {activeTab==="positions"&&(
        <div style={{display:"flex",flexDirection:"column",gap:6}}>
          {data.positions?.map((p)=>(
            <div key={p.ticker} className="card" style={{borderLeft:p.unrealPnL>300?"3px solid "+COLORS.green:p.unrealPnL<-50?"3px solid "+COLORS.red:p.status?.includes("PRIORITY 1")?"3px solid "+COLORS.red:p.status?.includes("T23")||p.status?.includes("LOCKED")?"3px solid "+COLORS.yellow:p.status?.includes("NEW S36")?"3px solid "+COLORS.blue:undefined}}>
              <div style={{display:"flex",gap:10,alignItems:"center",flexWrap:"wrap",marginBottom:3}}>
                <span style={{fontWeight:700,fontSize:13,color:COLORS.textBright}}>{p.ticker}</span>
                {p.cur&&<span className="badge badge-grey">{p.cur}</span>}
                {p.unrealPnL!==undefined&&<span className={`badge ${p.unrealPnL>50?"badge-green":p.unrealPnL<-50?"badge-red":"badge-amber"}`}>{p.unrealPnL>=0?"+":""}{p.unrealPct?.toFixed(1)}%</span>}
                {p.status?.includes("NEW S36")&&<span className="badge badge-blue">NEW S36</span>}
                {(p.status?.includes("T23")||p.status?.includes("LOCKED"))&&<span className="badge badge-amber">T23</span>}
                {p.status?.includes("PRIORITY 1")&&<span className="badge badge-red">RAISE STOP S37</span>}
                {p.status?.includes("P24")&&<span className="badge badge-orange">P24</span>}
                <span style={{fontSize:9,color:COLORS.textDim,marginLeft:"auto"}}>Stop: <b style={{color:COLORS.yellow}}>{p.stop||p.stopType||"—"}</b></span>
              </div>
              <div style={{fontSize:10,color:COLORS.accent,marginBottom:2}}>{p.status}</div>
              <div style={{fontSize:9,color:COLORS.textDim}}>{p.note}</div>
            </div>
          ))}
        </div>
      )}

      {activeTab==="gtcs"&&(
        <div style={{display:"flex",flexDirection:"column",gap:6}}>
          <div className="card" style={{marginBottom:4,borderLeft:`4px solid ${COLORS.blue}`,fontSize:11,color:COLORS.textDim}}>2 pending GTC orders. UUUU and LMT have filled — now in positions.</div>
          {data.pendingGTCs?.map((g)=>(
            <div key={g.ticker} className="card" style={{borderLeft:`3px solid ${COLORS.blue}`}}>
              <div style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap",marginBottom:3}}>
                <span style={{fontWeight:700,fontSize:13,color:COLORS.textBright}}>{g.ticker}</span>
                <span className="badge badge-blue">BUY GTC</span>
                <span style={{fontSize:11,color:COLORS.accent}}>Limit: ${g.limit} / Stop: ${g.stop}</span>
                <span className={`badge ${g.maxLoss<=200?"badge-green":g.maxLoss<=400?"badge-amber":"badge-red"}`}>Max loss ${g.maxLoss}</span>
              </div>
              <div style={{fontSize:10,color:COLORS.yellow,marginBottom:2}}>{g.status}</div>
              <div style={{fontSize:9,color:COLORS.textDim}}>{g.note}</div>
            </div>
          ))}
        </div>
      )}

      {activeTab==="watch"&&(
        <div style={{display:"flex",flexDirection:"column",gap:6}}>
          {data.watchList?.map((w,i)=>(
            <div key={i} className="card" style={{borderLeft:`3px solid ${w.status?.includes("STAGE 1")?COLORS.blue:w.status?.includes("STOPPED")?COLORS.red:COLORS.yellow}`}}>
              <div style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap",marginBottom:3}}>
                <span style={{fontWeight:700,fontSize:13,color:COLORS.textBright}}>{w.ticker}</span>
                {w.status?.includes("STAGE 1")&&<span className="badge badge-blue">STAGE 1</span>}
                {w.status?.includes("STOPPED")&&<span className="badge badge-red">STOPPED OUT</span>}
                {w.status?.includes("SECTION N")&&<span className="badge badge-green">SECTION N</span>}
                {w.entry&&<span style={{fontSize:10,color:COLORS.green}}>Entry: {w.entry}</span>}
              </div>
              <div style={{fontSize:10,color:COLORS.yellow,marginBottom:2}}>{w.status}</div>
              <div style={{fontSize:10,fontStyle:"italic",color:COLORS.textBright,marginBottom:3}}>{w.thesis}</div>
              {w.gate&&<div style={{fontSize:9,color:COLORS.textDim}}>Gate: {w.gate}</div>}
            </div>
          ))}
        </div>
      )}

      {activeTab==="shorts"&&(
        <div>
          <div className="card" style={{marginBottom:8,borderLeft:`4px solid ${COLORS.purple}`}}>
            <div style={{fontWeight:700,color:COLORS.purple,fontSize:13}}>SHORT WATCHLIST — P23 test required | PLTR DORMANT Q2 July</div>
          </div>
          {data.shortWatchlist?.map((s,i)=>(
            <div key={i} className="card" style={{marginBottom:6,borderLeft:`3px solid ${s.status?.includes("DORMANT")?COLORS.textDim:COLORS.purple}`}}>
              <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:3}}>
                <span style={{fontWeight:700,color:COLORS.textBright}}>{s.ticker}</span>
                {s.status?.includes("DORMANT")?<span className="badge badge-grey">DORMANT</span>:<span className="badge badge-purple">WATCH</span>}
                {s.status?.includes("NEW")&&<span className="badge badge-blue">NEW S36</span>}
              </div>
              <div style={{fontSize:10,fontStyle:"italic",color:COLORS.textBright,marginBottom:3}}>{s.thesis}</div>
              <div style={{fontSize:9,color:COLORS.yellow}}>Trigger: {s.trigger}</div>
            </div>
          ))}
        </div>
      )}

      {activeTab==="eu-energy"&&(
        <div>
          <div className="card" style={{marginBottom:8,borderLeft:`4px solid ${COLORS.green}`}}>
            <div style={{fontWeight:700,color:COLORS.green,fontSize:13,marginBottom:4}}>{data.euEnergyTransition?.title}</div>
            <div style={{padding:"6px 10px",background:"rgba(248,81,73,0.1)",borderRadius:4,fontSize:11,color:COLORS.red,fontWeight:600,marginBottom:6}}>
              CWR MISS: +989% year — E23 CODIFIED — SECTION N NOW MANDATORY EVERY FULL SCAN
            </div>
            <div style={{fontSize:10,color:COLORS.textDim,marginBottom:4}}>{data.euEnergyTransition?.thesisContext}</div>
            <div style={{fontSize:10,color:COLORS.yellow,marginBottom:4}}>CEILING: {data.euEnergyTransition?.concentrationCeiling}</div>
            <div style={{fontSize:10,color:COLORS.blue}}>NEXT CWR PATTERN: {data.euEnergyTransition?.nextCWRPattern}</div>
          </div>
          <div style={{fontSize:11,fontWeight:600,color:COLORS.accent,marginBottom:6}}>STAGE 1 QUEUE — S37</div>
          {data.watchList?.filter(w=>w.status?.includes("STAGE 1 REQUIRED"))?.map((w,i)=>(
            <div key={i} className="card" style={{marginBottom:6,borderLeft:`3px solid ${COLORS.blue}`}}>
              <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:3}}>
                <span style={{fontWeight:700,color:COLORS.textBright}}>{w.ticker}</span>
                <span style={{fontWeight:600,color:COLORS.accent}}>{w.name}</span>
                <span className="badge badge-blue">STAGE 1 S37</span>
              </div>
              <div style={{fontSize:10,fontStyle:"italic",color:COLORS.textBright,marginBottom:3}}>{w.thesis}</div>
              <div style={{fontSize:9,color:COLORS.yellow}}>Entry target: {w.entry} | Gate: {w.gate}</div>
            </div>
          ))}
        </div>
      )}

      {activeTab==="scan-sis"&&(
        <div>
          <div className="card" style={{marginBottom:8,borderLeft:`4px solid ${COLORS.accent}`}}>
            <div style={{fontWeight:700,color:COLORS.accent,fontSize:13}}>{data.scanFramework?.title}</div>
          </div>
          {data.scanFramework?.sections?.map((s,i)=>(
            <div key={i} className="card" style={{marginBottom:6,borderLeft:`3px solid ${s.si==="SI-67"?COLORS.green:COLORS.accent}`}}>
              <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:3}}>
                <span style={{fontWeight:700,color:COLORS.textBright}}>{s.si}</span>
                <span style={{fontWeight:600,color:COLORS.accent}}>{s.name}</span>
                {s.si==="SI-67"&&<span className="badge badge-green">NEW — CWR FIX</span>}
                <span style={{fontSize:9,color:COLORS.textDim,marginLeft:"auto"}}>{s.frequency}</span>
              </div>
              <div style={{fontSize:9,color:COLORS.textDim}}>{s.description}</div>
            </div>
          ))}
        </div>
      )}

      {activeTab==="minerals"&&(
        <div>
          <div className="card" style={{marginBottom:8,borderLeft:`4px solid ${COLORS.green}`}}>
            <div style={{fontWeight:700,color:COLORS.green,fontSize:13,marginBottom:4}}>{data.criticalMineralsThesis?.title}</div>
            <div style={{padding:"6px 10px",background:"rgba(248,81,73,0.1)",borderRadius:4,fontSize:11,color:COLORS.red,fontWeight:600}}>
              CEILING: {data.criticalMineralsThesis?.concentrationCeiling}
            </div>
          </div>
          {data.criticalMineralsThesis?.candidates?.map((c,i)=>(
            <div key={i} className="card" style={{marginBottom:6,borderLeft:`3px solid ${c.status?.includes("HELD")?"#3fb950":c.status?.includes("GTC")?"#388bfd":"#d29922"}`}}>
              <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:3}}>
                <span style={{fontWeight:700,color:COLORS.textBright}}>{c.ticker}</span>
                <span className={`badge ${c.status?.includes("HELD")?"badge-green":c.status?.includes("GTC")?"badge-blue":"badge-amber"}`}>{c.status}</span>
                {c.classification&&<span className="badge badge-grey">{c.classification}</span>}
              </div>
              <div style={{fontSize:10,color:COLORS.textDim}}>{c.thesis}</div>
              {c.stop&&<div style={{fontSize:9,color:COLORS.yellow,marginTop:2}}>Stop: {c.stop}</div>}
            </div>
          ))}
        </div>
      )}

      {activeTab==="thesis"&&(
        <div>
          <div className="card" style={{marginBottom:8,borderLeft:`4px solid ${COLORS.red}`}}>
            <div style={{fontWeight:700,color:COLORS.red,fontSize:13,marginBottom:4}}>{data.thesis.title}</div>
            <div style={{fontSize:11,lineHeight:1.8,marginBottom:6}}>{data.thesis.summary}</div>
            <div style={{padding:"6px 10px",background:"rgba(210,153,34,0.1)",borderRadius:4,fontSize:11,color:COLORS.yellow}}>{data.thesis.SI25Status}</div>
          </div>
          {data.thesis.keyDates?.map((d,i)=>(
            <div key={i} className="card" style={{marginBottom:4,borderLeft:`3px solid ${d.priority==="CRITICAL"?COLORS.red:d.priority==="HIGH"?COLORS.yellow:d.priority==="MEDIUM"?COLORS.purple:COLORS.textDim}`}}>
              <div style={{display:"flex",gap:8,alignItems:"flex-start"}}>
                <span style={{fontSize:10,fontWeight:600,minWidth:200,color:COLORS.textBright}}>{d.date}</span>
                <span style={{fontSize:10,color:COLORS.textDim,flex:1}}>{d.event}</span>
                <span className={`badge ${d.priority==="CRITICAL"?"badge-red":d.priority==="HIGH"?"badge-amber":d.priority==="MEDIUM"?"badge-purple":"badge-grey"}`}>{d.priority}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab==="tracker"&&(
        <div>
          <div style={{fontSize:12,fontWeight:600,color:COLORS.accent,marginBottom:6}}>
            TRADE TRACKER — {data.tradeTracker?.closedTrades?.length} CLOSED | 30-day IBKR: +${data.tradeTracker?.ibkr30DayRealized?.toFixed(0)}
          </div>
          {data.tradeTracker?.closedTrades?.slice().reverse().map((t)=>(
            <div key={t.id} className="card" style={{marginBottom:3,borderLeft:`3px solid ${t.pnlUSD>0?COLORS.green:COLORS.red}`}}>
              <div style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap"}}>
                <span style={{fontSize:9,color:COLORS.textDim}}>#{t.id}</span>
                <span style={{fontWeight:600,fontSize:12}}>{t.ticker}</span>
                <span style={{fontSize:9,color:COLORS.textDim}}>{t.dateOut}</span>
                <span style={{fontWeight:700,color:pnlColor(t.pnlUSD)}}>{t.pnlUSD>0?"+$":"−$"}{Math.abs(t.pnlUSD).toFixed(0)}</span>
                <span className="badge badge-grey">{t.ccy}</span>
              </div>
              <div style={{fontSize:9,color:COLORS.textDim,marginTop:1}}>{t.note}</div>
            </div>
          ))}
        </div>
      )}

      {activeTab==="notes"&&(
        <div>
          <div style={{display:"flex",gap:8,marginBottom:10}}>
            <input value={newNote} onChange={e=>setNewNote(e.target.value)} placeholder="Add note..." onKeyDown={e=>e.key==="Enter"&&addNote()}/>
            <button className="btn btn-primary" onClick={addNote}>ADD</button>
          </div>
          {(data.sessionNotes||[]).slice().reverse().map((n,i)=>(
            <div key={i} className="card" style={{marginBottom:6}}>
              <div style={{fontSize:10,color:COLORS.textDim,marginBottom:3}}>{n.date}</div>
              <div style={{fontSize:11,lineHeight:1.7}}>{n.note}</div>
            </div>
          ))}
        </div>
      )}

      <div style={{marginTop:16,paddingTop:10,borderTop:`1px solid ${COLORS.border}`,display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:6,alignItems:"center"}}>
        <span style={{fontSize:10,color:COLORS.textDim}}>v51 FINAL | S36 | 22 positions | WTI ~$104 | SI-62→SI-68 codified</span>
        <div style={{display:"flex",gap:4,flexWrap:"wrap"}}>
          <span className="badge badge-red">LMT STOP RAISE S37</span>
          <span className="badge badge-orange">V STOPPED +$117</span>
          <span className="badge badge-blue">UUUU+LMT FILLED</span>
          <span className="badge badge-green">SECTION N LIVE</span>
          <span className="badge badge-amber">AMD TONIGHT</span>
        </div>
      </div>
    </div>
  );
}
