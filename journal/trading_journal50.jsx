import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "fund_journal_v3";

// ═══════════════════════════════════════════════════════════════════
// TIMEZONE REFERENCE — MANDATORY (E1)
// NYSE: opens 17:30 UAE / closes 00:00 UAE (EDT = UTC-4; UAE = UTC+4)
// LSE:  opens 11:00 UAE (BST Apr-Oct) / closes 19:30 UAE
// US AMC earnings: reported AFTER 00:00 UAE — NYSE CLOSED at print.
// Stop is inactive until 17:30 UAE next session. Gap risk lives overnight.
// NEVER calculate market hours from memory. ALWAYS read this block first.
//
// LIVE PRICE RULE (E20): During NYSE/LSE hours IBKR TWS is the ONLY
// authoritative live price source. Web search returns stale data.
// NEVER contradict IBKR live prices using web search. No exceptions.
//
// EXCHANGE HOLIDAY RULE (I12): Check exchange-specific holidays before
// every session. LSE closed Mon May 4 (UK Bank Holiday) — RR.L stop
// was INACTIVE Monday. Frankfurt/Milan closed May 1 (Labour Day).
//
// COMMODITY PRICE RULE (E21): Never use memory for commodity spot
// prices. Fastmarkets/Trading Economics/SMM/EIA only. State source
// and date explicitly in any commercial viability assessment.
// ═══════════════════════════════════════════════════════════════════

const INITIAL_STATE = {
  "lastUpdated": "2026-05-04 SESSION 35 CLOSE — 21 positions. Iran struck US warship during Project Freedom — WTI ~$106. Filled: AVAV 15sh@$185.07, MSTR 15sh@$181.07, NOG 200sh@$26.77. Stops raised: MRVL→$158.73, CODA→$10.90, CRML→$11.50, ABVX→$109.93. P11 revised. T9 amended. LDOS cancelled. LMT GTC pending.",
  "sessionNumber": "S35-CLOSE",
  "fund": {
    "account": "U24936508",
    "netLiquidity": 105700,
    "unrealizedPnL": 4690,
    "realizedPnL": 0,
    "realizedPnLNote": "No closes S35. 30-day IBKR realized: +$936.",
    "cashUSD": 28552,
    "cashGBP": 637,
    "cashEUR": -2904,
    "broker": "IBKR Pro",
    "note": "JOURNAL v50. Mon 4 May 2026. 21 active positions. 3 pending GTCs. Options Level 3 confirmed. P11 revised. T9 amended."
  },
  "thesis": {
    "title": "DUAL BLOCKADE — WTI ~$106 — IRAN FIRED ON US WARSHIP — THESIS AT MAXIMUM STRENGTH",
    "summary": "Iran IRGC fired two missiles at US Navy vessel near Jask during Project Freedom operation (Trump's initiative to guide stranded ships out of the strait). Vessel struck and forced to retreat per Iranian media. Trump had promised 'forceful' response to any interference. Situation Room held Monday — military options under active consideration. WTI +4% to ~$106, back above SI-25 price threshold of $105.87. Deal probability near zero after Trump rejected Iran 14-point counter-proposal. Dual blockade: US blockading Iranian ports, Iran effectively blocking commercial transit. SI-25 dual condition requires BOTH simultaneously — reopening condition (1) remains unmet. Thesis at maximum structural strength.",
    "oilWTI": 106.00,
    "SI25Trigger": 105.87,
    "SI25PeakRef": 117.63,
    "SI25Status": "✅ WTI ~$106 — BACK ABOVE $105.87 THRESHOLD on warship attack. Reopening condition (1) UNMET. Thesis INTACT AND STRENGTHENED.",
    "hormuzStatus": "DUAL BLOCKADE. Iran fired missiles at US Navy warship during Project Freedom. Situation Room held. Military response under consideration.",
    "keyDates": [
      {"date": "Mon May 4 AMC TONIGHT", "event": "PLTR Q1 — SI-61 short watch. Consensus beat expected. Only short on guidance cut. P23 test required first.", "priority": "HIGH"},
      {"date": "Tue May 5 BMO", "event": "CCJ Q1 — T23: DO NOT WIDEN stop $110. LDO.MI Q1 — Milan 11:00 UAE, stop €50 active. LDOS Q1 — read before considering GTC re-entry.", "priority": "CRITICAL"},
      {"date": "Wed May 6", "event": "R3NK Q1 — earnings in position, stop 47/48 SL. UUUU Q1 — ENTRY GATE. Confirm ASM timeline. Have GTC $18.50-20 / stop $16.50 ready.", "priority": "HIGH"},
      {"date": "Thu May 7 AMC", "event": "AMPX Q1 — T23 ACTIVE FROM TODAY. Stop $18.92 frozen. No changes permitted.", "priority": "HIGH"},
      {"date": "Sun May 11", "event": "CEG Q1 — stop $278, 11.6% clearance.", "priority": "HIGH"},
      {"date": "Thu May 15", "event": "Warsh replaces Powell. Hawkish transition watch.", "priority": "MEDIUM"},
      {"date": "Wed May 20", "event": "SNPS Q2 — stop $440, 10% clearance.", "priority": "HIGH"},
      {"date": "Thu May 22", "event": "BAH Q4 FY2026 — second tranche gate. Civil revenue bottoming + bookings improvement needed.", "priority": "HIGH"},
      {"date": "Thu May 28", "event": "MRVL Q1 — stop $158.73, 3.4% clearance. Review pre-earnings whether adequate.", "priority": "HIGH"},
      {"date": "May 14-15", "event": "Trump-Xi Beijing — potential Iran diplomatic channel.", "priority": "MEDIUM"},
      {"date": "ONGOING", "event": "CODA stop $10.90 — BELOW COST $11.105. Raise to $11.50 (P20 compliant) Tuesday. NOG stop $24.50 — raise toward $26.50 if WTI holds $105+ this week.", "priority": "HIGH"}
    ]
  },
  "positions": [
    {"ticker": "AMZN", "shares": 30, "avgPrice": 201.204, "last": 273.53, "unrealPnL": 2170, "unrealPct": 35.9, "stop": 251.38, "stopType": "Stop Limit", "stopLimit": 224, "status": "HOLD — STOP $251.38 / $224 SL", "note": "AWS +28% thesis intact. Stop raised S34."},
    {"ticker": "CRML", "shares": 110, "avgPrice": 9.08, "last": 13.58, "unrealPnL": 495, "unrealPct": 49.6, "stop": 11.50, "status": "HOLD — STOP $11.50 RAISED S35 — WTI THESIS", "note": "+9.16% today on Iran warship attack. Stop raised from $10.51 to $11.50. P20 compliant. Dual critical minerals thesis."},
    {"ticker": "AMPX", "shares": 168, "avgPrice": 18.106, "last": 20.19, "unrealPnL": 369, "unrealPct": 12.1, "stop": 18.92, "status": "HOLD — STOP $18.92 — ⚠️ T23 ACTIVE FROM TODAY — EARNINGS THU MAY 7 AMC", "note": "T23 in effect: no stop changes until post-earnings print. Standalone limit $32 active."},
    {"ticker": "ABVX", "shares": 50, "avgPrice": 109.89, "last": 116.91, "unrealPnL": 355, "unrealPct": 6.5, "stop": 109.93, "status": "HOLD — STOP $109.93 (4¢ ABOVE COST) — M&A STRATEGIC EXCEPTION", "note": "Not P20 compliant — deliberate. M&A holdout strategy: maximum room for takeout premium bid. Thesis: ABVX #1 biotech acquisition target 2026 per Truist."},
    {"ticker": "MSFT", "shares": 25, "avgPrice": 403.052, "last": 415.98, "unrealPnL": 324, "unrealPct": 3.2, "stop": 373, "status": "HOLD — STOP $373 — RE-ENTRY S33", "note": "Azure +40%, $190B capex. SI-35 exception documented."},
    {"ticker": "CEG", "shares": 14, "avgPrice": 308.072, "last": 320.86, "unrealPnL": 180, "unrealPct": 4.2, "stop": 278, "status": "HOLD — STOP $278 — EARNINGS SUN MAY 11", "note": "Nuclear power thesis. 11.6% clearance."},
    {"ticker": "V", "shares": 8, "avgPrice": 307.125, "last": 327.95, "unrealPnL": 167, "unrealPct": 6.8, "stop": 321.83, "status": "HOLD — STOP $321.83 — ⚠️ THIN 1.87% CLEARANCE — HOLD, DO NOT WIDEN", "note": "Stop raised S34 from $312.82. Now protecting 56% of gain. Cannot widen — stops only move up."},
    {"ticker": "CODA", "shares": 250, "avgPrice": 11.105, "last": 11.76, "unrealPnL": 164, "unrealPct": 5.9, "stop": 10.90, "status": "HOLD — STOP $10.90 — ⚠️ BELOW COST — RAISE TO $11.50 TUESDAY", "note": "Stop below cost $11.105 — deliberate on escalation day. P20 requires $11.45. Raise Tuesday."},
    {"ticker": "CCJ", "shares": 50, "avgPrice": 117.02, "last": 120.18, "unrealPnL": 160, "unrealPct": 2.7, "stop": 110, "status": "HOLD — STOP $110 — T23: DO NOT WIDEN — EARNINGS TUE MAY 5 BMO", "note": "T23: no stop changes pre-earnings. Accept binary."},
    {"ticker": "MRVL", "shares": 10, "avgPrice": 152.10, "last": 163.91, "unrealPnL": 118, "unrealPct": 7.7, "stop": 158.73, "status": "HOLD — STOP $158.73 RAISED S35 — EARNINGS MAY 28", "note": "P20 violation corrected. Stop raised $135→$158.73. Protects 53% of gain. 3.4% clearance — review pre-T23 window before May 28."},
    {"ticker": "RR", "name": "Rolls-Royce Holdings", "shares": 100, "avgPrice": 1128.6, "last": 1199, "unrealPnL": 71, "unrealPct": 6.3, "stop": 1050, "cur": "GBP", "status": "HOLD — STOP 1050p — LSE RE-ACTIVE TUESDAY", "note": "LSE closed Mon May 4 (UK Bank Holiday) — stop was inactive. Re-active Tuesday 11:00 UAE. H1 Jul 30 catalyst."},
    {"ticker": "BAH", "name": "Booz Allen Hamilton", "shares": 33, "avgPrice": 76.531, "last": 79.08, "unrealPnL": 84, "unrealPct": 3.3, "stop": 69, "status": "HOLD — STOP $69 — MAY 22 Q4 GATE", "note": "Half-size entry. Civil revenue risk unresolved. May 22 = second tranche gate."},
    {"ticker": "NOG", "shares": 200, "avgPrice": 26.771, "last": 27.08, "unrealPnL": 62, "unrealPct": 1.2, "stop": 24.50, "status": "HOLD — NEW S35 — STOP $24.50 — REVISED P11 RE-ENTRY", "note": "Re-entered S35 on Iran warship attack. Revised P11 (5% band). 200sh @$26.771. Stop $24.50 = $453 max loss. Raise toward $26.50 if WTI holds $105+ this week."},
    {"ticker": "IBM", "shares": 26, "avgPrice": 228.739, "last": 231.01, "unrealPnL": 58, "unrealPct": 1.0, "stop": 208, "status": "HOLD — STOP $208 — POST-EARNINGS ENTRY S33", "note": "Contrarian post-Q1 entry. Azure competitive pressure monitored."},
    {"ticker": "R3NK", "shares": 25, "avgPrice": 52.27, "last": 53.97, "unrealPnL": 46, "unrealPct": 3.5, "stop": 48, "stopType": "Stop Limit", "stopLimit": 47, "cur": "EUR", "status": "HOLD — STOP 48/47 SL — EARNINGS WED MAY 6", "note": "Frankfurt open Monday. Stop active. 200M EUR deferred orders."},
    {"ticker": "MSTR", "shares": 15, "avgPrice": 181.067, "last": 182.98, "unrealPnL": 27, "unrealPct": 1.0, "stop": 153.14, "status": "HOLD — NEW S35 — STOP $153.14 — BTC ATH THESIS", "note": "Filled @$181.067 (SMART -$5.38 improvement). mNAV 0.96x at entry. BTC→ATH end 2026. Scale-up gate: BTC >$85K. Kill: BTC weekly close <$70K."},
    {"ticker": "CGCT", "shares": 291, "avgPrice": 10.295, "last": 10.39, "unrealPnL": 26, "unrealPct": 0.9, "stop": null, "status": "HOLD — NO STOP — SPAC", "note": "Trust floor ~$10.27."},
    {"ticker": "IES", "name": "Invinity Energy Systems", "shares": 3000, "avgPrice": 17.49, "last": 18.00, "unrealPnL": 1, "stopType": "MANUAL ALERT 12.5p", "cur": "GBP", "status": "HOLD — MANUAL ALERT 12.5p", "note": "LDES decision pending."},
    {"ticker": "SNPS", "shares": 8, "avgPrice": 495.125, "last": 493.33, "unrealPnL": -14, "unrealPct": -0.4, "stop": 440, "status": "HOLD — STOP $440 — EARNINGS MAY 20", "note": "EDA duopoly. Multiple compression ongoing. 10% clearance."},
    {"ticker": "AVAV", "shares": 15, "avgPrice": 185.067, "last": 178.89, "unrealPnL": -83, "unrealPct": -3.0, "stop": 155, "status": "HOLD — NEW S35 — STOP $155 — JUNE 30 Q4 GATE", "note": "Filled @$185.067 (SMART -$4.93 improvement). Drawdown -55.7% from $417.86 ATH. Backlog $1.1B +51% YoY. Book-to-bill 1.6. Day 1. Second tranche +8sh on positive June 30 print."},
    {"ticker": "LDO", "name": "Leonardo SpA", "shares": 35, "avgPrice": 56.086, "last": 53.02, "unrealPnL": -103, "unrealPct": -5.2, "stop": 50, "cur": "EUR", "status": "HOLD — STOP €50 — T23: DO NOT WIDEN — EARNINGS TUE MAY 5 BMO", "note": "Milan open Monday. Stop active. T23: no changes. Rearmament thesis intact."}
  ],
  "pendingGTCs": [
    {"ticker": "LMT", "name": "Lockheed Martin", "action": "BUY", "limit": 512.96, "stop": 465, "qty": 10, "maxLoss": 470, "last": 512.77, "status": "GTC PENDING — DID NOT FILL S35 — DEFENCE RALLY", "note": "PAC-3/THAAD production ramp thesis. $186.4B backlog. 25% guided op profit growth FY2026. Warship attack = PAC-3 thesis strengthened. Hold limit — do not raise above $513 to chase."},
    {"ticker": "LAC", "name": "Lithium Americas", "action": "BUY", "limit": 4.80, "stop": 4.00, "qty": 220, "maxLoss": 176, "last": 5.71, "status": "GTC $4.80 / STOP $4.00 SUBMITTED — SI-37 SPECULATIVE", "note": "Thacker Pass Phase 1. DoE $867M drawn. Lithium seaborne CJK $18-20/kg (Fastmarkets Mar 2026). Commercial at $15/kg. Kill switch: construction halt / DoE suspension / lithium below $10/kg."},
    {"ticker": "TXT", "name": "Textron Inc", "action": "BUY", "limit": 88.00, "stop": 79.00, "qty": 55, "maxLoss": 495, "last": 94.72, "status": "GTC PENDING — NEEDS ~6% PULLBACK", "note": "Industrial separation announced S33. Bell MV-75 Valor = 20yr military monopoly. 14.3x fwd PE."}
  ],
  "watchList": [
    {"ticker": "UUUU", "name": "Energy Fuels Inc", "thesis": "Only US licensed monazite→REE oxide facility. Only US producer dysprosium and terbium. ASM acquisition adds Korean alloy plant — moves from oxide seller to alloy producer. 6 uranium LT contracts through 2032.", "entry": "$18.50-$20.00 GTC post May 6 print", "stop": "$16.50", "maxLoss": 497, "gate": "May 6 Q1 — confirm ASM closing timeline + REE revenue trajectory", "status": "WATCH — DO NOT ENTER BEFORE MAY 6 PRINT", "last": 21.66},
    {"ticker": "PLTR", "thesis": "SI-61 SHORT — 108x fwd PE. Reports AMC tonight. Consensus beat expected. Only enter puts on guidance cut or revenue miss.", "entry": "June expiry ATM-5% puts if guidance cut", "gate": "Tonight's print — guidance cut required", "status": "WATCH — PRINT FIRST TONIGHT", "last": 144.07},
    {"ticker": "LDOS", "name": "Leidos Holdings", "thesis": "Federal IT and defense services. GTC $143 cancelled pre-earnings. Reassess post-Tuesday print.", "entry": "Reassess GTC $143 / stop $136 after reading Q1 release", "gate": "Tue May 5 BMO print", "status": "WATCH — READ EARNINGS TUE BEFORE DECIDING", "last": 149.23},
    {"ticker": "SARO", "thesis": "Engine MRO — LEAP/CFM56 ramp. Carlyle/GIC PE overhang noted.", "entry": "Post May 7 earnings", "gate": "EBITDA margins hold + LEAP ramp confirmed", "status": "WATCH — NO ENTRY BEFORE MAY 7 PRINT"},
    {"ticker": "USAR", "thesis": "Serra Verde acquisition. 100% DoD cost-plus offtake. Near ATH — wait for pullback.", "entry": "Below $22 only", "gate": "Pullback required", "status": "WATCH — NEAR ATH"}
  ],
  "shortWatchlist": [
    {"ticker": "PLTR", "thesis": "108x forward PE. Reports AMC tonight. Guidance cut or revenue miss = repricing catalyst. Iran warship attack slightly reduces probability of guidance miss — government AI spend tailwind.", "currentPrice": 144.07, "trigger": "Tonight's print. Guidance cut only. P23 test first.", "status": "WATCH — PRINT TONIGHT", "correlationRisk": "Low"},
    {"ticker": "AAL", "thesis": "No fuel hedging, $36.5B debt. WTI $106 = fuel cost crisis. Unhedged exposure accelerating.", "currentPrice": 11.84, "trigger": "Dead-cat bounce to $13-14. WTI must stay above $100.", "status": "WATCH — BELOW BOUNCE LEVEL", "correlationRisk": "HIGH — oil correlated"}
  ],
  "criticalMineralsThesis": {
    "title": "CRITICAL MINERALS / RARE EARTH — NATIONAL SECURITY THEME",
    "concentrationCeiling": "CRML (held) + LAC (GTC) + UUUU (watch) = MAXIMUM. No further additions.",
    "candidates": [
      {"ticker": "CRML", "status": "HELD +49.6%", "thesis": "Dual critical minerals + European Lithium acquisition", "stop": "$11.50"},
      {"ticker": "LAC", "status": "GTC $4.80 PENDING", "thesis": "Thacker Pass construction underway. DoE backed. Commercial at $15/kg.", "classification": "SI-37 Speculative"},
      {"ticker": "UUUU", "status": "WATCH POST MAY 6", "thesis": "Only US licensed REE separator. ASM deal = alloy capability.", "classification": "SI-39 drawdown triggered"}
    ]
  },
  "newPositionsS35": {
    "title": "NEW POSITIONS ADDED SESSION 35",
    "positions": [
      {"ticker": "AVAV", "thesis": "Drone warfare — loitering munitions (Switchblade), counter-UAS (Titan/LOCUST), tactical ISR (JUMP 20/Puma). Funded backlog $1.1B +51% YoY. Book-to-bill 1.6. -55.7% from ATH on SCAR non-cash impairment — one-time event, not structural damage to Autonomous Systems segment. June 30 Q4 gate: record revenue + margin recovery confirmation required for second tranche.", "fills": "15sh @$185.067 (SMART -$4.93 improvement)", "stop": "$155.00", "maxLoss": "$453", "secondTranche": "+8sh on positive June 30 Q4 print"},
      {"ticker": "MSTR", "thesis": "BTC ATH by end 2026. mNAV at entry ~0.96x (essentially at asset value). Historical bull-phase premium 1.25-2.5x. Two compounding variables: BTC appreciation + premium expansion. Separate BTC spot account held externally — MSTR is the premium vehicle, not BTC proxy. Scale-up: BTC >$85K confirmed close.", "fills": "15sh @$181.067 (SMART -$5.38 improvement)", "stop": "$153.14", "maxLoss": "$419", "scaleUp": "+8sh when BTC confirmed >$85K on closing basis"},
      {"ticker": "NOG", "thesis": "US E&P direct WTI leverage. Hormuz dual blockade intact. Iran warship attack materially strengthens thesis. Revised P11 applied — 5% flexibility band justified by warship escalation event. Stop $24.50 implies WTI structural breakdown below ~$95 — not the base case.", "fills": "200sh @$26.771 (market order)", "stop": "$24.50", "maxLoss": "$454", "stopRaise": "Raise toward $26.50 when WTI confirms $105+ for 3+ sessions"}
    ]
  },
  "optionsCapability": {
    "status": "CONFIRMED ACTIVE",
    "level": "Options Level 3",
    "markets": "US Options approved",
    "sizeRule": "Max premium 2.5% NAV (~$2,650). 1 contract only until familiar.",
    "p23Test": "If this option expired worthless, would the fund survive and the thesis still make sense?",
    "nextCandidate": "PLTR — if guidance cut tonight. June expiry ATM-5% puts. P23 test first."
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
      {"id":11,"ticker":"PLTR","dateIn":"2026-03-24","dateOut":"2026-04-09","qty":49,"entry":161.608,"exit":134.976,"ccy":"USD","pnlUSD":-1307.11,"note":"P6. Now SI-61 short watchlist."},
      {"id":12,"ticker":"SHLD","dateIn":"2026-03-24","dateOut":"2026-04-10","qty":69,"entry":72.01,"exit":73.21,"ccy":"USD","pnlUSD":112.65,"note":"Tactical."},
      {"id":13,"ticker":"PDYN","dateIn":"2026-03-25","dateOut":"2026-04-14","qty":250,"entry":6.59,"exit":6.67,"ccy":"USD","pnlUSD":17.42,"note":"Partial."},
      {"id":14,"ticker":"AVAV","dateIn":"2026-03-26","dateOut":"2026-04-15","qty":25,"entry":195.05,"exit":197.945,"ccy":"USD","pnlUSD":70.27,"note":"SI-42. Re-entered S35 15sh @$185.067."},
      {"id":15,"ticker":"ITM","dateIn":"2026-04-01","dateOut":"2026-04-17","qty":1100,"entry":65.1,"exit":124.60,"ccy":"GBP","pnlUSD":828.00,"note":"Trim 1."},
      {"id":16,"ticker":"LNG","dateIn":"2026-04-13","dateOut":"2026-04-17","qty":19,"entry":268.813,"exit":248.00,"ccy":"USD","pnlUSD":-396.54,"note":"Stopped."},
      {"id":17,"ticker":"PATK","dateIn":"2026-04-17","dateOut":"2026-04-17","qty":25,"entry":108.80,"exit":109.256,"ccy":"USD","pnlUSD":9.34,"note":"P17."},
      {"id":18,"ticker":"ABVX","dateIn":"2026-04-06","dateOut":"2026-04-21","qty":44,"entry":117.913,"exit":114.26,"ccy":"USD","pnlUSD":-158.53,"note":"Stopped. Re-entry 50sh @$109.89."},
      {"id":19,"ticker":"RR","dateIn":"2026-03-26","dateOut":"2026-04-22","qty":150,"entry":1182.88,"exit":1150.00,"ccy":"GBP","pnlUSD":-62.39,"note":"Stopped. Re-entry 100sh."},
      {"id":20,"ticker":"ITM","dateIn":"2026-04-01","dateOut":"2026-04-24","qty":800,"entry":65.1,"exit":141.20,"ccy":"GBP","pnlUSD":770.00,"note":"Trim 2."},
      {"id":21,"ticker":"LLY","dateIn":"2026-04-16","dateOut":"2026-04-25","qty":3,"entry":905.344,"exit":875.54,"ccy":"USD","pnlUSD":-89.41,"note":"T28."},
      {"id":22,"ticker":"CODA","dateIn":"2026-04-08","dateOut":"2026-04-27","qty":416,"entry":12.005,"exit":11.42,"ccy":"USD","pnlUSD":-243.36,"note":"Stopped. P11 re-entry S33."},
      {"id":23,"ticker":"ISRG","dateIn":"2026-03-24","dateOut":"2026-04-27","qty":22,"entry":459.246,"exit":471.676,"ccy":"USD","pnlUSD":272.24,"note":"Stop triggered. Q1 beat."},
      {"id":24,"ticker":"ITM","dateIn":"2026-04-01","dateOut":"2026-04-28","qty":1200,"entry":65.1,"exit":130.39,"ccy":"GBP","pnlUSD":1041.00,"note":"AIM wick. ITM total +$2,639."},
      {"id":25,"ticker":"ABBV","dateIn":"2026-04-22","dateOut":"2026-04-29","qty":20,"entry":205.22,"exit":191.1608,"ccy":"USD","pnlUSD":-282.27,"note":"Stop BMO. Beat post-fill."},
      {"id":26,"ticker":"PDYN","dateIn":"2026-03-25","dateOut":"2026-04-29","qty":250,"entry":6.595,"exit":5.815,"ccy":"USD","pnlUSD":-196.00,"note":"Manual exit. E9 created short."},
      {"id":27,"ticker":"CCJ","dateIn":"2026-03-24","dateOut":"2026-04-28","qty":49,"entry":104.021,"exit":119.97,"ccy":"USD","pnlUSD":782.00,"note":"T23 deliberate. Re-entry 50sh."},
      {"id":28,"ticker":"VST","dateIn":"2026-04-08","dateOut":"2026-04-29","qty":53,"entry":150.569,"exit":156.53,"ccy":"USD","pnlUSD":316.00,"note":"GTC stop triggered."},
      {"id":29,"ticker":"PDYN","dateIn":"2026-04-29","dateOut":"2026-04-30","qty":250,"entry":5.7507,"exit":5.85,"ccy":"USD","pnlUSD":-25,"note":"E9 accidental short covered S33."},
      {"id":30,"ticker":"MSFT","dateIn":"2026-04-14","dateOut":"2026-04-30","qty":25,"entry":372.77,"exit":410.38,"ccy":"USD","pnlUSD":940,"note":"Stop $411.89 triggered S33 open. Re-entered 25sh @$403.01."},
      {"id":31,"ticker":"NOG","dateIn":"2026-03-26","dateOut":"2026-05-01","qty":80,"entry":24.383,"exit":26.50,"ccy":"USD","pnlUSD":169.36,"note":"Stop $26.47 triggered S34. Thesis intact at exit. Re-entered S35 200sh @$26.771 on revised P11."}
    ],
    "grossRealizedPnLUSD": -768,
    "ibkr30DayRealized": 936.00,
    "lastUpdated": "2026-05-04 S35. No new closes. 31 total trades."
  },
  "sessionNotes": [
    {"date": "2026-05-04", "note": "SESSION 35 OPEN — SI-47: Monday 4 May 2026. LSE CLOSED (UK Bank Holiday). NYSE/Frankfurt/Milan OPEN. IBKR reconciliation: 18 positions carried from S34 all reconcile. LDOS GTC both legs cancelled before open. ABVX stop modified $100→$109.93 (M&A strategic exception — deliberate below P20). V stop $321.83 confirmed — 1.87% clearance, hold no widen. MRVL P20 violation flagged."},
    {"date": "2026-05-04", "note": "SESSION 35 — IRAN FIRES MISSILES AT US WARSHIP. IRGC fired 2 missiles at US Navy vessel near Jask during Project Freedom operation. Vessel struck and forced to retreat per Al Jazeera/Times of Israel. WTI +4% to ~$106. Situation Room held. Trump promised 'forceful response' — credibility test now live. Deal probability near zero. SI-25 dual condition: both unmet. Thesis at maximum structural strength."},
    {"date": "2026-05-04", "note": "SESSION 35 — THREE NEW FILLS. AVAV 15sh @$185.067 (SMART -$4.93 improvement). MSTR 15sh @$181.067 (SMART -$5.38 improvement). NOG 200sh @$26.771 market order. All three stops submitted and confirmed in IBKR orders tab. Total new capital deployed: ~$10,761. USD cash post-fills: $28,552."},
    {"date": "2026-05-04", "note": "SESSION 35 — STOP CHANGES. MRVL: $135→$158.73 (P20 violation corrected — now protects 53% of gain). CODA: $10.00→$10.90 (partial raise, still below cost, deliberate on escalation day — raise to $11.50 Tuesday). CRML: $10.51→$11.50 (P20 violation corrected — +49.6% position needed stop updated, now protects $266 locked gain). All confirmed in IBKR orders tab."},
    {"date": "2026-05-04", "note": "SESSION 35 — RULE AMENDMENTS. P11 revised: 5% flexibility band around stop-out level when thesis intact or strengthened. Origin: NOG at $26.70 vs $26.47 gate — 0.86% gap was mechanical not meaningful while warship attack was live. T9 amended: MSTR eligible as standalone mNAV premium-expansion vehicle. Separate BTC spot account held externally. T25 documented as new thesis lesson: rule rigidity vs thesis conviction."},
    {"date": "2026-05-04", "note": "SESSION 35 — SI-45 WEEKLY SCREENER COMPLETE. LMT Stage 2 authorised: GTC $512.96 / stop $465 submitted. PAC-3/THAAD ramp ($186.4B backlog, 25% op profit growth FY2026, fwd PE 17.2x). Did not fill S35 — defence rally. Hold limit. AVAV Stage 2 authorised and filled: 15sh @$185.067, stop $155, June 30 Q4 gate. AI SI-39 screener: zero new triggers. All names at or above S24 ATH baselines."},
    {"date": "2026-05-04", "note": "SESSION 35 CLOSE — Daily P&L +$452 +0.43%. Net Liq $105,700. Unrealised +$4,690. 21 positions. 3 pending GTCs (LMT/LAC/TXT). PLTR reports AMC tonight — wait for print, no pre-positioning. CCJ/LDO.MI earnings Tue BMO — T23 in effect on both. CODA stop raise to $11.50 first action Tuesday. AMPX T23 active from Tuesday."}
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
  const tabs=["positions","gtcs","watch","shorts","new-s35","minerals","thesis","tracker","notes"];
  const pnlColor=(v)=>v>0?COLORS.green:v<0?COLORS.red:COLORS.textDim;

  return(
    <div style={{background:COLORS.bg,minHeight:"100vh",color:COLORS.text,fontFamily:"monospace",padding:16,maxWidth:1200,margin:"0 auto"}}>
      <style>{`.card{background:${COLORS.card};border:1px solid ${COLORS.border};border-radius:6px;padding:12px}.badge{font-size:10px;padding:2px 6px;border-radius:4px;font-weight:600;display:inline-block}.badge-green{background:rgba(63,185,80,0.15);color:${COLORS.green};border:1px solid rgba(63,185,80,0.3)}.badge-red{background:rgba(248,81,73,0.15);color:${COLORS.red};border:1px solid rgba(248,81,73,0.3)}.badge-amber{background:rgba(210,153,34,0.15);color:${COLORS.yellow};border:1px solid rgba(210,153,34,0.3)}.badge-orange{background:rgba(240,136,62,0.15);color:${COLORS.orange};border:1px solid rgba(240,136,62,0.3)}.badge-grey{background:rgba(139,148,158,0.15);color:${COLORS.textDim};border:1px solid rgba(139,148,158,0.3)}.badge-purple{background:rgba(163,113,247,0.15);color:${COLORS.purple};border:1px solid rgba(163,113,247,0.3)}.badge-blue{background:rgba(56,139,253,0.15);color:${COLORS.blue};border:1px solid rgba(56,139,253,0.3)}.btn{background:${COLORS.card};border:1px solid ${COLORS.border};color:${COLORS.text};padding:6px 12px;border-radius:4px;cursor:pointer;font-family:monospace;font-size:12px}.btn:hover{background:#21262d}.btn-primary{background:rgba(88,166,255,0.15);border-color:rgba(88,166,255,0.4);color:${COLORS.accent}}input{background:${COLORS.card};border:1px solid ${COLORS.border};color:${COLORS.text};padding:8px;border-radius:4px;font-family:monospace;font-size:12px;flex:1}`}</style>

      <div style={{marginBottom:16}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:8}}>
          <div>
            <div style={{fontSize:18,fontWeight:700,color:COLORS.textBright}}>CLAUDE FUND — JOURNAL v50</div>
            <div style={{fontSize:11,color:COLORS.textDim,marginTop:2}}>Session 35 Final — Mon 4 May 2026 | {data.fund.account} | 21 positions | 3 pending GTCs | Options L3 ✅</div>
          </div>
          <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
            {[
              {label:"NET LIQ",val:"$105.7K"},
              {label:"UNREAL",val:"+$4,690",color:COLORS.green},
              {label:"CASH",val:"$28.6K"},
              {label:"WTI",val:"~$106",color:COLORS.orange}
            ].map(m=>(
              <div key={m.label} className="card" style={{textAlign:"center",minWidth:80}}>
                <div style={{fontSize:9,color:COLORS.textDim}}>{m.label}</div>
                <div style={{fontSize:14,fontWeight:700,color:m.color||COLORS.textBright,marginTop:2}}>{m.val}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{marginTop:6,padding:"6px 10px",background:"rgba(248,81,73,0.1)",border:"1px solid rgba(248,81,73,0.3)",borderRadius:4,fontSize:11,color:COLORS.red,fontWeight:600}}>
          🚨 IRAN FIRED MISSILES AT US NAVY WARSHIP — PROJECT FREEDOM — SITUATION ROOM HELD — MILITARY RESPONSE PENDING
        </div>
        <div style={{marginTop:4,padding:"6px 10px",background:"rgba(240,136,62,0.15)",border:"1px solid rgba(240,136,62,0.4)",borderRadius:4,fontSize:11,color:COLORS.orange,fontWeight:600}}>
          NEW S35: AVAV 15sh@$185.07 | MSTR 15sh@$181.07 | NOG 200sh@$26.77 | Stops: MRVL→$158.73 CRML→$11.50 CODA→$10.90
        </div>
        <div style={{marginTop:4,padding:"6px 10px",background:"rgba(210,153,34,0.1)",border:"1px solid rgba(210,153,34,0.3)",borderRadius:4,fontSize:11,color:COLORS.yellow}}>
          PLTR AMC TONIGHT | CCJ/LDO earnings Tue BMO (T23) | CODA stop raise $11.50 Tue | AMPX T23 active from today
        </div>
      </div>

      <div style={{display:"flex",gap:4,marginBottom:12,flexWrap:"wrap"}}>
        {tabs.map(t=>(<button key={t} className={`btn ${activeTab===t?"btn-primary":""}`} onClick={()=>setActiveTab(t)} style={{textTransform:"uppercase",fontSize:11}}>{t}</button>))}
      </div>

      {activeTab==="positions"&&(
        <div style={{display:"flex",flexDirection:"column",gap:6}}>
          {data.positions?.map((p)=>(
            <div key={p.ticker} className="card" style={{borderLeft:p.unrealPnL>300?"3px solid "+COLORS.green:p.unrealPnL<-50?"3px solid "+COLORS.red:p.status?.includes("NEW S35")?"3px solid "+COLORS.blue:p.status?.includes("WIDEN")?"3px solid "+COLORS.red:p.status?.includes("T23")?"3px solid "+COLORS.yellow:undefined}}>
              <div style={{display:"flex",gap:10,alignItems:"center",flexWrap:"wrap",marginBottom:3}}>
                <span style={{fontWeight:700,fontSize:13,color:COLORS.textBright}}>{p.ticker}</span>
                {p.cur&&<span className="badge badge-grey">{p.cur}</span>}
                {p.status?.includes("NEW S35")&&<span className="badge badge-blue">NEW S35</span>}
                {p.unrealPnL!==undefined&&<span className={`badge ${p.unrealPnL>50?"badge-green":p.unrealPnL<-50?"badge-red":"badge-amber"}`}>{p.unrealPnL>=0?"+":""}{p.unrealPct?.toFixed(1)}%</span>}
                {p.status?.includes("T23")&&<span className="badge badge-amber">T23 ACTIVE</span>}
                {p.status?.includes("RAISED")&&<span className="badge badge-green">STOP RAISED</span>}
                {p.status?.includes("THIN")&&<span className="badge badge-red">THIN STOP</span>}
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
          <div className="card" style={{marginBottom:4,borderLeft:`4px solid ${COLORS.blue}`,fontSize:11,color:COLORS.textDim}}>Pending GTC orders — not yet in positions.</div>
          {data.pendingGTCs?.map((g)=>(
            <div key={g.ticker} className="card" style={{borderLeft:`3px solid ${COLORS.blue}`}}>
              <div style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap",marginBottom:3}}>
                <span style={{fontWeight:700,fontSize:13,color:COLORS.textBright}}>{g.ticker}</span>
                <span className="badge badge-blue">BUY GTC</span>
                <span style={{fontSize:11,color:COLORS.accent}}>Limit: ${g.limit} / Stop: ${g.stop}</span>
                <span style={{fontSize:11,color:COLORS.textDim}}>{g.qty}sh</span>
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
            <div key={i} className="card" style={{borderLeft:`3px solid ${COLORS.yellow}`}}>
              <div style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap",marginBottom:3}}>
                <span style={{fontWeight:700,fontSize:13,color:COLORS.textBright}}>{w.ticker}</span>
                <span className="badge badge-amber">WATCH</span>
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
          <div className="card" style={{marginBottom:10,borderLeft:`4px solid ${COLORS.purple}`}}>
            <div style={{fontWeight:700,color:COLORS.purple,fontSize:13,marginBottom:4}}>SHORT WATCHLIST — SI-61 | P23 test required before entry</div>
          </div>
          {data.shortWatchlist?.map((s,i)=>(
            <div key={i} className="card" style={{marginBottom:8,borderLeft:`3px solid ${COLORS.purple}`}}>
              <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:4}}>
                <span style={{fontWeight:700,color:COLORS.textBright}}>{s.ticker}</span>
                <span className="badge badge-purple">SI-61</span>
                {s.correlationRisk?.includes("HIGH")&&<span className="badge badge-red">OIL CORR.</span>}
              </div>
              <div style={{fontSize:11,fontStyle:"italic",color:COLORS.textBright,marginBottom:4}}>{s.thesis}</div>
              <div style={{fontSize:10,color:COLORS.yellow}}>Trigger: {s.trigger}</div>
            </div>
          ))}
        </div>
      )}

      {activeTab==="new-s35"&&(
        <div>
          <div className="card" style={{marginBottom:10,borderLeft:`4px solid ${COLORS.blue}`}}>
            <div style={{fontWeight:700,color:COLORS.blue,fontSize:13,marginBottom:4}}>{data.newPositionsS35?.title}</div>
          </div>
          {data.newPositionsS35?.positions?.map((p,i)=>(
            <div key={i} className="card" style={{marginBottom:8,borderLeft:`3px solid ${COLORS.blue}`}}>
              <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:4}}>
                <span style={{fontWeight:700,color:COLORS.textBright}}>{p.ticker}</span>
                <span className="badge badge-blue">NEW S35</span>
                <span style={{fontSize:10,color:COLORS.green}}>{p.fills}</span>
              </div>
              <div style={{fontSize:11,fontStyle:"italic",color:COLORS.textBright,marginBottom:4}}>{p.thesis}</div>
              <div style={{fontSize:9,color:COLORS.yellow}}>Stop: {p.stop} | Max loss: {p.maxLoss}</div>
              {p.secondTranche&&<div style={{fontSize:9,color:COLORS.textDim,marginTop:2}}>Scale-up: {p.secondTranche}</div>}
              {p.scaleUp&&<div style={{fontSize:9,color:COLORS.textDim,marginTop:2}}>Scale-up: {p.scaleUp}</div>}
              {p.stopRaise&&<div style={{fontSize:9,color:COLORS.textDim,marginTop:2}}>Stop raise: {p.stopRaise}</div>}
            </div>
          ))}
        </div>
      )}

      {activeTab==="minerals"&&(
        <div>
          <div className="card" style={{marginBottom:10,borderLeft:`4px solid ${COLORS.green}`}}>
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
          <div className="card" style={{marginBottom:10,borderLeft:`4px solid ${COLORS.red}`}}>
            <div style={{fontWeight:700,color:COLORS.red,fontSize:13,marginBottom:4}}>{data.thesis.title}</div>
            <div style={{fontSize:11,lineHeight:1.8,marginBottom:6}}>{data.thesis.summary}</div>
            <div style={{padding:"6px 10px",background:"rgba(63,185,80,0.1)",borderRadius:4,fontSize:11,color:COLORS.green}}>{data.thesis.SI25Status}</div>
          </div>
          {data.thesis.keyDates?.map((d,i)=>(
            <div key={i} className="card" style={{marginBottom:4,borderLeft:`3px solid ${d.priority==="CRITICAL"?COLORS.red:d.priority==="HIGH"?COLORS.yellow:d.priority==="MEDIUM"?COLORS.purple:COLORS.textDim}`}}>
              <div style={{display:"flex",gap:8,alignItems:"flex-start"}}>
                <span style={{fontSize:10,fontWeight:600,minWidth:180,color:COLORS.textBright}}>{d.date}</span>
                <span style={{fontSize:10,color:COLORS.textDim,flex:1}}>{d.event}</span>
                <span className={`badge ${d.priority==="CRITICAL"?"badge-red":d.priority==="HIGH"?"badge-amber":d.priority==="MEDIUM"?"badge-purple":"badge-grey"}`}>{d.priority}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab==="tracker"&&(
        <div>
          <div style={{fontSize:12,fontWeight:600,color:COLORS.accent,marginBottom:6}}>TRADE TRACKER — {data.tradeTracker?.closedTrades?.length} CLOSED | 30-day IBKR: +${data.tradeTracker?.ibkr30DayRealized?.toFixed(0)}</div>
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
        <span style={{fontSize:10,color:COLORS.textDim}}>v50 FINAL | S35 | 21 positions | WTI ~$106 | Iran struck US warship</span>
        <div style={{display:"flex",gap:4,flexWrap:"wrap"}}>
          <span className="badge badge-red">WARSHIP STRUCK</span>
          <span className="badge badge-orange">WTI ~$106</span>
          <span className="badge badge-blue">3 NEW FILLS</span>
          <span className="badge badge-amber">PLTR TONIGHT</span>
          <span className="badge badge-green">P11 REVISED</span>
        </div>
      </div>
    </div>
  );
}
