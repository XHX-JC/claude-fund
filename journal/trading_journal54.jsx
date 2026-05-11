import { useState, useEffect, useCallback } from "react";
const STORAGE_KEY = "fund_journal_v4";
// TIME: UAE=UTC+4. LSE/EU open 11:00 UAE. NYSE open 17:30 UAE. Frankfurt 11:00 UAE.
// E20: IBKR TWS only for live prices. E22: CENTCOM required for military claims.
// E26: GTC cancel protocol — >5% adverse premarket on material news = cancel before 17:30 UAE.
// SI-68: No close files until screenshots confirmed. T31: Stop below 52W low on 40%+ ATH names.

const INITIAL_STATE = {
  "lastUpdated": "2026-05-11 S40 FINAL. T40 R3NK stopped -$136. T41 R3NK rebuy 200sh @€46.461 stop €44. T42 IREN 24sh @$55.042 stop $52. T43 ZETA 191sh @$16.866 stop $14.50. T44 PATH 320sh @$10.726 stop $9.20. AMZN stop raised $263.93. 22 positions. CLARITY Act May 14 markup. NCH2 H1 tomorrow 09:00 UAE.",
  "sessionNumber": "S40",
  "fund": {
    "account": "U24936508",
    "netLiquidity": 104200,
    "unrealizedPnL": 3249,
    "cashUSD": 28494,
    "cashGBP": 641,
    "cashEUR": -11006,
    "broker": "IBKR Pro",
    "note": "v54 S40 FINAL. Mon 11 May 2026. 22 positions. 2 GTCs. Daily P&L -$432 (-0.40%). Realized -$154.12."
  },
  "thesis": {
    "title": "TRUMP REJECTED IRAN COUNTER-OFFER — THESIS INTACT — SI-25 CONDITION 1 UNMET",
    "summary": "Trump rejected Iran counter-offer. CENTCOM strikes ongoing. No commercial Hormuz reopening. WTI ~$95 (Fri close). Saudi structural damage ~600K bpd ongoing. SI-25 Condition 1 unmet. Thesis intact.",
    "oilWTI": 95.00,
    "SI25Trigger": 105.87,
    "SI25PeakRef": 117.63,
    "SI25Status": "WTI ~$95. Trump rejected Iran deal. Condition 1 UNMET. Thesis INTACT.",
    "hormuzStatus": "Iran counter-offer rejected. CENTCOM strikes. No commercial reopening.",
    "keyDates": [
      {"date": "Tue 12 May 09:00 UAE", "event": "NCH2 H1 report (07:00 CEST). Gate met (€316M order intake). EBIT -€65M needs assessment. Entry ~€8.27, stop €6.50, 230sh, max loss €406. EU energy slot 2/4.", "priority": "CRITICAL"},
      {"date": "Tue 12 May", "event": "DPRO Q1 earnings — gate for watchlist entry. Revenue must show acceleration toward $5M+ quarterly run.", "priority": "HIGH"},
      {"date": "Tue 12 May", "event": "TE T1 Energy Q1 earnings — gate for watchlist entry. Margin expansion required.", "priority": "HIGH"},
      {"date": "Thu 14 May", "event": "CLARITY Act Senate Banking Committee markup. MSTR scale gate: BTC $80K now, gate $85K. Prepare scale order if markup passes cleanly.", "priority": "HIGH"},
      {"date": "Thu 22 May", "event": "BAH Q4 FY2026 earnings. Second tranche decision gate.", "priority": "HIGH"},
      {"date": "~Mon 25 May", "event": "SNPS T23 lock (48-72h before May 27 AMC). DO NOT move stop after this date.", "priority": "HIGH"},
      {"date": "Wed 27 May AMC", "event": "SNPS Q2 FY2026 + CRM Q1 FY2027. Post-print CRM entry if thesis intact.", "priority": "HIGH"},
      {"date": "Thu 28 May", "event": "PATH Q1 FY2027 earnings + LULU Q3 + MRVL Q1. PATH: decision on sizing. LULU: entry if pullback to ~$127.", "priority": "HIGH"},
      {"date": "Wed 30 Jul", "event": "RR.L H1 results. Review stop 1149.4p pre-H1.", "priority": "HIGH"}
    ]
  },
  "positions": [
    {"ticker":"AMZN","shares":30,"avgPrice":201.204,"last":271.56,"unrealPnL":2111,"unrealPct":35.0,"stop":263.93,"status":"HOLD — STOP $263.93 — RAISED S40 — NEAR 52W HIGH $278.56","note":"Stop raised S40 from $259.88. 52W high $278.56, current 97.5% of ATH. AWS thesis intact."},
    {"ticker":"CRML","shares":110,"avgPrice":9.08,"last":12.45,"unrealPnL":370,"unrealPct":37.0,"stop":11.20,"status":"HOLD — STOP $11.20 — ⚠️ $1.25 BUFFER — P21 SPECULATIVE","note":"P21 speculative. $450M needed, $80M held. EUR exclusivity extended. Dilution risk. Kill switch $11.20. Recovered to $12.45 from $11.69 intraday low today."},
    {"ticker":"CODA","shares":250,"avgPrice":11.105,"last":12.19,"unrealPnL":254,"unrealPct":9.1,"stop":9.95,"status":"HOLD — STOP $9.95 — P14 DELIBERATE — PROJECT FREEDOM CATALYST","note":"P14 deliberate. More time given. Stop lowered S39 $10.90→$9.95."},
    {"ticker":"ABVX","shares":50,"avgPrice":109.89,"last":122.94,"unrealPnL":661,"unrealPct":12.0,"stop":109.93,"status":"HOLD — STOP $109.93 — M&A EXCEPTION","note":"Royalty buyback signal. Maximum room strategy."},
    {"ticker":"RR","name":"Rolls-Royce Holdings","shares":100,"avgPrice":1128.6,"last":1207.80,"unrealPnL":79,"unrealPct":7.0,"stop":1149.4,"cur":"GBP","status":"HOLD — STOP 1149.4p — H1 JUL 30 — EU ENERGY 1/4","note":"Q1 beat +6.47%. H1 Jul 30 gate."},
    {"ticker":"IES","name":"Invinity Energy Systems","shares":3000,"avgPrice":17.49,"last":18.30,"unrealPnL":30,"unrealPct":5.8,"stopType":"MANUAL ALERT 12.5p","cur":"GBP","status":"HOLD — MANUAL ALERT 12.5p — +4.57% TODAY","note":"LDES decision pending. Positive move today."},
    {"ticker":"MSTR","shares":15,"avgPrice":181.067,"last":187.25,"unrealPnL":87,"unrealPct":3.2,"stop":153.14,"status":"HOLD — STOP $153.14 — BTC GATE $85K — CLARITY MAY 14","note":"BTC ~$80K. CLARITY Act Senate markup May 14. Scale gate $85K. Kill: BTC <$70K weekly."},
    {"ticker":"SNPS","shares":8,"avgPrice":495.125,"last":514.59,"unrealPnL":155,"unrealPct":3.9,"stop":496.76,"status":"HOLD — STOP $496.76 — T23 LOCK ~MAY 25 — EARNINGS MAY 27 AMC","note":"T23 lock ~May 25. DO NOT MOVE stop after lock. Earnings May 27 AMC."},
    {"ticker":"CGCT","shares":291,"avgPrice":10.295,"last":10.41,"unrealPnL":33,"unrealPct":1.1,"stop":null,"status":"HOLD — NO STOP — SPAC","note":"Trust floor ~$10.27."},
    {"ticker":"MSFT","shares":25,"avgPrice":403.052,"last":410.34,"unrealPnL":184,"unrealPct":1.8,"stop":403.89,"status":"HOLD — STOP $403.89 — ⚠️ $6.45 BUFFER (1.5%) — TCI OVERHANG","note":"TCI $8B stake exit = overhang. $6.45 above stop. Watch daily."},
    {"ticker":"BAH","name":"Booz Allen Hamilton","shares":33,"avgPrice":76.531,"last":76.33,"unrealPnL":-7,"unrealPct":-0.3,"stop":69,"status":"HOLD — STOP $69 — MAY 22 Q4 GATE","note":"Half-size. Civil revenue risk unresolved. May 22 gate."},
    {"ticker":"IBM","shares":26,"avgPrice":228.739,"last":226.81,"unrealPnL":-52,"unrealPct":-0.9,"stop":210.08,"status":"HOLD — STOP $210.08 — SI-35 COMPLIANT","note":"Contrarian. Declining trend — monitor."},
    {"ticker":"PATH","name":"UiPath","shares":320,"avgPrice":10.726,"last":10.75,"unrealPnL":6,"unrealPct":0.2,"stop":9.20,"status":"HOLD — STOP $9.20 — NEW T44 — AGENTIC AI","note":"T44 S40. Fill $10.72. 83% gross margin, $1.6B cash, zero debt, 108% NRR. Earnings May 28 — T23 lock ~May 26."},
    {"ticker":"ZETA","name":"Zeta Global Holdings","shares":191,"avgPrice":16.866,"last":16.70,"unrealPnL":-33,"unrealPct":-1.0,"stop":14.50,"status":"HOLD — STOP $14.50 — NEW T43 — AI MARKETING","note":"T43 S40. Fill $16.86. 19 consecutive beat-and-raise. Rev +50% Q1 2026. Next earnings Aug 4."},
    {"ticker":"IREN","name":"IREN Ltd","shares":24,"avgPrice":55.042,"last":55.89,"unrealPnL":21,"unrealPct":1.6,"stop":52.00,"status":"HOLD — STOP $52.00 — NEW T42 — NVIDIA DEAL — SI-37","note":"T42 S40. GTC filled $55.00. Gate not met (premarket -9%). $2B convert overhang. NVIDIA $3.4B deal. 4 consec rev misses. SI-37 max $1,500. See P27."},
    {"ticker":"PYPL","name":"PayPal Holdings","shares":55,"avgPrice":45.639,"last":45.26,"unrealPnL":-22,"unrealPct":-0.9,"stop":37.50,"status":"HOLD — STOP $37.50 — T39 — FINTECH TURNAROUND","note":"T39: Market fill S38. Q1 beat EPS $1.34. TPV +11%. Next earnings ~Aug 2026. SOFI gate: resolve PYPL first."},
    {"ticker":"UUUU","name":"Energy Fuels Inc","shares":50,"avgPrice":22.011,"last":22.30,"unrealPnL":14,"unrealPct":1.2,"stop":16.50,"status":"HOLD — STOP $16.50 — Q1 BEAT — ASM JULY 2026","note":"Q1 $35.8M beat. ASM July 2026. +4.30% today. Back above cost."},
    {"ticker":"R3NK","name":"Renk Group AG","shares":200,"avgPrice":46.485,"last":45.635,"unrealPnL":-172,"unrealPct":-1.8,"stop":44.00,"cur":"EUR","status":"HOLD — STOP €44.00 — T41 — T31 APPLIED — RAISE STOP ≥€44.20 ON BOUNCE","note":"T41 S40. T31 applied: stop below 52W low €45.97. Full SI-35 sizing. SI-35 pending compliance: raise stop to ≥€44.20 on first bounce. €6.9B backlog, record order intake."},
    {"ticker":"LMT","name":"Lockheed Martin","shares":10,"avgPrice":516.831,"last":511.16,"unrealPnL":-60,"unrealPct":-1.2,"stop":479.77,"status":"HOLD — STOP $479.77 — RAISED S37","note":"Stop raised $465→$479.77 S37. Max loss $368."},
    {"ticker":"CCJ","shares":50,"avgPrice":117.02,"last":119.55,"unrealPnL":120,"unrealPct":2.1,"stop":112.14,"status":"HOLD — STOP $112.14 — RAISE WHEN >$127","note":"Stop lowered S39 $114.21→$112.14. Multi-year uranium thesis. Raise when sustains >$127."},
    {"ticker":"LDO","name":"Leonardo SpA","shares":35,"avgPrice":56.086,"last":50.66,"unrealPnL":-190,"unrealPct":-9.7,"stop":50.00,"cur":"EUR","status":"HOLD — STOP €50.00 — ⚠️ €0.66 BUFFER — IF STOPS LEAVE IT","note":"€0.66 buffer. -4.70% today. If stops out per agreement: do not re-enter without compelling specific catalyst (not just rearmament thesis)."},
    {"ticker":"AVAV","shares":15,"avgPrice":185.067,"last":164.50,"unrealPnL":-308,"unrealPct":-11.1,"stop":155.00,"status":"HOLD — STOP $155 — JUNE 30 Q4 GATE — STOP = 52W LOW","note":"Stop $155 = 52W low $155.69. LASSO deal live. Backlog +51%. June 30 Q4 gate intact."}
  ],
  "pendingGTCs": [
    {"ticker":"LAC","name":"Lithium Americas","action":"BUY","limit":4.80,"stop":4.00,"qty":220,"maxLoss":176,"status":"GTC $4.80 / STOP $4.00 — SI-37 SPECULATIVE","note":"Thacker Pass Phase 1."},
    {"ticker":"TXT","name":"Textron Inc","action":"BUY","limit":88.00,"stop":79.00,"qty":55,"maxLoss":495,"status":"GTC $88 PENDING — ~7% PULLBACK NEEDED","note":"Bell MV-75 Valor = 20yr military monopoly."}
  ],
  "watchList": [
    {"ticker":"NCH2","name":"Thyssenkrupp Nucera","thesis":"Largest industrial alkaline electrolyser. EV ~EUR370M vs EUR648M net cash. Stage 2 done.","entry":"Market ~€8.27 if gate confirmed. Stop €6.50. 230sh. Max loss €406.","gate":"H1 REPORT TUE 12 MAY 09:00 UAE. Gate MET: €316M order intake. Read EBIT decomposition before entry. EU energy 2/4.","status":"STAGE 2 — READ REPORT TOMORROW 09:00 UAE"},
    {"ticker":"CRM","name":"Salesforce","thesis":"Down 30% in 2026. Fwd P/E 13.8x. $25B buyback. Agentforce AI.","entry":"Post May 27 earnings ONLY.","gate":"Q1 FY2027 earnings May 27 AMC. P24 prevents pre-entry.","status":"WATCH — EARNINGS MAY 27"},
    {"ticker":"LULU","name":"Lululemon","thesis":"60% below ATH. Fwd P/E 10.5x. Near 52wk low $127.","entry":"Post May 28 earnings. Pullback ~$127: enter, stop $124.","gate":"Q3 FY2026 earnings May 28.","status":"WATCH — EARNINGS MAY 28"},
    {"ticker":"V","name":"Visa Inc","thesis":"Stopped T32 @$321.823. Q2 FY26 rev +15%. Thesis intact.","entry":"$305-315 zone only. Stop $292-295.","gate":"Q3 earnings Jul 28. Ex-div passed May 12.","status":"WATCH — RE-ENTRY $305-315"},
    {"ticker":"NOG","name":"Northern Oil and Gas","thesis":"Sold T33 Iran noise. Iran rejected deal. Re-entry if WTI >$105 sustained.","entry":"No entry until SI-25 Condition 1 confirmed failure + WTI >$105.","gate":"WTI sustained >$105.","status":"WATCH — THESIS GATE"},
    {"ticker":"CEG","name":"Constellation Energy","thesis":"Closed T38. Q1 today. Nuclear/data centre thesis strong.","entry":"Re-entry >5% post-Q1 pullback only. EU energy slot 2/4 available (after NCH2).","gate":"Q1 earnings May 11 (today). Monitor for pullback entry.","status":"WATCH — POST Q1 ONLY"},
    {"ticker":"MRVL","name":"Marvell Technology","thesis":"Closed T37. AI chip thesis intact.","entry":"Post May 28 earnings if SI-39 flags.","gate":"Q1 earnings May 28.","status":"WATCH — EARNINGS MAY 28"},
    {"ticker":"PATH_SCALE","name":"UiPath scale","thesis":"T44 open 320sh. If earnings May 28 beat, consider scaling.","entry":"Post-earnings only.","gate":"May 28 Q1 FY2027.","status":"SCALE GATE — MAY 28"},
    {"ticker":"SOFI","name":"SoFi Technologies","thesis":"T27 turnaround. Fwd P/E low. 52% below ATH.","entry":"$13-14 on macro pullback. Stop $11.50.","gate":"PYPL (T39) resolved first. Price must pull back to zone.","status":"STAGE 1 — GATE: PYPL RESOLVED + PRICE $13-14"},
    {"ticker":"ANET","name":"Arista Networks","thesis":"#1 AI data centre switching. Q1 2026 rev $2.71B +35%.","entry":"$130-138 on pullback. Stop $125.","gate":"Wait for Q2 (Aug 4) or macro pullback to zone. Do not chase $142.","status":"STAGE 1 — ENTRY $130-138 — DO NOT CHASE"},
    {"ticker":"IREN_ADD","name":"IREN additional","thesis":"T42 open 24sh. If $2B convert absorbed and AI cloud revenue accelerates, reassess sizing.","entry":"Reassess post Q4 FY26 results.","gate":"Q4 FY26: AI cloud rev >10% of total + convert terms confirmed non-punitive.","status":"WATCH — HOLD T42 TO STOP FIRST"},
    {"ticker":"RDW","name":"Redwire Corp","thesis":"Space/defence. Q1 rev +57.9% YoY. $498M backlog. $350M equity offering = dilution.","entry":"$9.90-10.50 if equity offering absorbed. Stop $8.80.","gate":"Equity offering absorption + hold above $10.","status":"STAGE 1 — WAIT FOR EQUITY OFFERING ABSORPTION"},
    {"ticker":"LUMN","name":"Lumen Technologies","thesis":"Telecom turnaround. FCF $1.9-2.1B guide. Alkira NaaS acquisition.","entry":"$7.50-8.00 on pullback. Research Alkira first.","gate":"JP Morgan conference May 18 catalyst. Understand Alkira.","status":"STAGE 1 — ENTRY $7.50-8.00 — RESEARCH ALKIRA"},
    {"ticker":"NOK","name":"Nokia","thesis":"AI/Cloud net sales +49% YoY. Optical Networks +20%.","entry":"$10.50-11.00 on pullback only. Current $12.81 too high.","gate":"Pullback to zone required. P13 applies at current levels.","status":"WATCH — ENTRY $10.50-11.00 ON PULLBACK"},
    {"ticker":"DPRO","name":"Draganfly Inc","thesis":"Canadian NDAA drone. Q1 earnings today (May 12). Gate: revenue acceleration.","entry":"Post May 12 print only if revenue >$5M quarterly run-rate.","gate":"Q1 earnings May 12. P24 rule.","status":"WATCH — GATE: TODAY Q1 PRINT"},
    {"ticker":"TE","name":"T1 Energy Inc","thesis":"US solar. G1_Dallas 5GW. 45X tax credit. Q1 today.","entry":"Post May 12 Q1 — margin expanding required.","gate":"Q1 earnings May 12. Leverage concern.","status":"WATCH — GATE: TODAY Q1 PRINT"},
    {"ticker":"ZETA_SCALE","name":"Zeta scale","thesis":"T43 open 191sh @$16.866. 19 consec beats. If next quarter confirms, scale.","entry":"Post Aug 4 earnings Q2 beat.","gate":"Q2 2026 earnings Aug 4.","status":"WATCH — SCALE GATE AUG 4"},
    {"ticker":"ANDURIL","name":"Anduril Industries","thesis":"PRIVATE. Lattice OS. Revenue ~$1B→$4.3B guide. Arsenal-1. Series H ~$60B val.","entry":"IPO listing only. S-1 filing = Stage 1 same week.","gate":"S-1 filing with SEC. Monitor web search.","status":"IPO WATCH — PRIVATE"},
    {"ticker":"JOBY","name":"Joby Aviation","thesis":"eVTOL. SR3 complete. Cash $2.5B. FAA TC is the only gate.","entry":"Post FAA Type Certification only.","gate":"FAA TC announcement.","status":"WATCH — GATE: FAA TYPE CERT ONLY"},
    {"ticker":"VALE","name":"Vale SA","thesis":"Iron ore/base metals. Fwd PE 7.9x. Yield 7.77%. Pool B income candidate.","entry":"$15.50-16.00 on pullback. Stop ~$14.50.","gate":"Near 52W high $17.94. Wait for pullback. No thesis fit at current price.","status":"WATCH — ENTRY $15.50-16.00 ON PULLBACK"}
  ],
  "shortWatchlist": [
    {"ticker":"PLTR","thesis":"Dormant until Q2 July.","status":"DORMANT UNTIL Q2 JULY 2026","trigger":"Q2 guidance cut only"},
    {"ticker":"AAL","thesis":"No fuel hedge, $36.5B debt.","trigger":"Dead-cat bounce $13-14.","status":"WATCH"},
    {"ticker":"CCL","thesis":"Fuel 12-15% costs.","trigger":"Rally to $23-25","status":"WATCH"},
    {"ticker":"SNOW","thesis":"18x fwd revenue.","trigger":"Earnings miss + guidance trim","status":"WATCH"}
  ],
  "euEnergyTransition": {
    "title":"EU/UK ENERGY TRANSITION — SECTION N (SI-67)",
    "concentrationCeiling":"Maximum 4 positions. CURRENT: RR.L (1/4). Room for 3 more.",
    "stage1Queue":["NCH2 Stage 2 done — GATE MAY 12 H1 REPORT 09:00 UAE"],
    "watchOnly":["CWR.L at 500p","ITM.L at 135-140p"],
    "gateNote":"NCH2: Read H1 report TOMORROW 09:00 UAE. Gate met (€316M). EBIT -€65M needs assessment before entry.",
    "scanFrequency":"First session each month + thesis-triggered"
  },
  "criticalMineralsThesis": {
    "title":"CRITICAL MINERALS — NATIONAL SECURITY THEME",
    "concentrationCeiling":"CRML (held) + LAC (GTC) + UUUU (held) = MAXIMUM. T22.",
    "candidates":[
      {"ticker":"CRML","status":"HELD +37.0% — ⚠️ NEAR STOP","thesis":"Tanbreez 92.5%. EUR acquisition pending. Dilution risk $450M needed/$80M held.","stop":"$11.20"},
      {"ticker":"UUUU","status":"HELD +1.2% — Q1 BEAT","thesis":"Only US licensed REE separator. Q1 $35.8M. ASM July 2026.","classification":"SI-37"},
      {"ticker":"LAC","status":"GTC $4.80 PENDING","thesis":"Thacker Pass. DoE backed.","classification":"SI-37 Speculative"}
    ]
  },
  "clarityAct": {
    "title":"CLARITY ACT — MSTR GATE EVENT",
    "what":"Digital Asset Market Clarity Act. BTC = digital commodity under CFTC (not security). Banks can custody BTC. Institutional adoption gateway.",
    "houseStatus":"Passed July 2025 (294-134)",
    "senateStatus":"Banking Committee markup THURSDAY 14 MAY 2026",
    "btcCurrent":80000,
    "mstrScaleGate":85000,
    "action":"If May 14 markup passes cleanly: prepare MSTR scale order per P22. BTC $5K from gate.",
    "killSwitch":"BTC weekly close <$70K"
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
      {"id":11,"ticker":"PLTR","dateIn":"2026-03-24","dateOut":"2026-04-09","qty":49,"entry":161.608,"exit":134.976,"ccy":"USD","pnlUSD":-1307.11,"note":"P6."},
      {"id":12,"ticker":"SHLD","dateIn":"2026-03-24","dateOut":"2026-04-10","qty":69,"entry":72.01,"exit":73.21,"ccy":"USD","pnlUSD":112.65,"note":"Tactical."},
      {"id":13,"ticker":"PDYN","dateIn":"2026-03-25","dateOut":"2026-04-14","qty":250,"entry":6.59,"exit":6.67,"ccy":"USD","pnlUSD":17.42,"note":"Partial."},
      {"id":14,"ticker":"AVAV","dateIn":"2026-03-26","dateOut":"2026-04-15","qty":25,"entry":195.05,"exit":197.945,"ccy":"USD","pnlUSD":70.27,"note":"Re-entered S35 15sh."},
      {"id":15,"ticker":"ITM","dateIn":"2026-04-01","dateOut":"2026-04-17","qty":1100,"entry":65.1,"exit":124.60,"ccy":"GBP","pnlUSD":828.00,"note":"Trim 1."},
      {"id":16,"ticker":"LNG","dateIn":"2026-04-13","dateOut":"2026-04-17","qty":19,"entry":268.813,"exit":248.00,"ccy":"USD","pnlUSD":-396.54,"note":"Stopped."},
      {"id":17,"ticker":"PATK","dateIn":"2026-04-17","dateOut":"2026-04-17","qty":25,"entry":108.80,"exit":109.256,"ccy":"USD","pnlUSD":9.34,"note":"P17."},
      {"id":18,"ticker":"ABVX","dateIn":"2026-04-06","dateOut":"2026-04-21","qty":44,"entry":117.913,"exit":114.26,"ccy":"USD","pnlUSD":-158.53,"note":"Stopped. Re-entry 50sh."},
      {"id":19,"ticker":"RR","dateIn":"2026-03-26","dateOut":"2026-04-22","qty":150,"entry":1182.88,"exit":1150.00,"ccy":"GBP","pnlUSD":-62.39,"note":"Stopped. Re-entry 100sh."},
      {"id":20,"ticker":"ITM","dateIn":"2026-04-01","dateOut":"2026-04-24","qty":800,"entry":65.1,"exit":141.20,"ccy":"GBP","pnlUSD":770.00,"note":"Trim 2."},
      {"id":21,"ticker":"LLY","dateIn":"2026-04-16","dateOut":"2026-04-25","qty":3,"entry":905.344,"exit":875.54,"ccy":"USD","pnlUSD":-89.41,"note":"Stopped."},
      {"id":22,"ticker":"CODA","dateIn":"2026-04-08","dateOut":"2026-04-27","qty":416,"entry":12.005,"exit":11.42,"ccy":"USD","pnlUSD":-243.36,"note":"Stopped. P11 re-entry."},
      {"id":23,"ticker":"ISRG","dateIn":"2026-03-24","dateOut":"2026-04-27","qty":22,"entry":459.246,"exit":471.676,"ccy":"USD","pnlUSD":272.24,"note":"Stop triggered."},
      {"id":24,"ticker":"ITM","dateIn":"2026-04-01","dateOut":"2026-04-28","qty":1200,"entry":65.1,"exit":130.39,"ccy":"GBP","pnlUSD":1041.00,"note":"AIM wick. ITM total +$2,639."},
      {"id":25,"ticker":"ABBV","dateIn":"2026-04-22","dateOut":"2026-04-29","qty":20,"entry":205.22,"exit":191.1608,"ccy":"USD","pnlUSD":-282.27,"note":"Stop BMO."},
      {"id":26,"ticker":"PDYN","dateIn":"2026-03-25","dateOut":"2026-04-29","qty":250,"entry":6.595,"exit":5.815,"ccy":"USD","pnlUSD":-196.00,"note":"Manual exit."},
      {"id":27,"ticker":"CCJ","dateIn":"2026-03-24","dateOut":"2026-04-28","qty":49,"entry":104.021,"exit":119.97,"ccy":"USD","pnlUSD":782.00,"note":"T23 deliberate. Re-entry 50sh."},
      {"id":28,"ticker":"VST","dateIn":"2026-04-08","dateOut":"2026-04-29","qty":53,"entry":150.569,"exit":156.53,"ccy":"USD","pnlUSD":316.00,"note":"GTC stop triggered."},
      {"id":29,"ticker":"PDYN","dateIn":"2026-04-29","dateOut":"2026-04-30","qty":250,"entry":5.7507,"exit":5.85,"ccy":"USD","pnlUSD":-25,"note":"E9 short covered."},
      {"id":30,"ticker":"MSFT","dateIn":"2026-04-14","dateOut":"2026-04-30","qty":25,"entry":372.77,"exit":410.38,"ccy":"USD","pnlUSD":940,"note":"Stop triggered. Re-entered 25sh."},
      {"id":31,"ticker":"NOG","dateIn":"2026-03-26","dateOut":"2026-05-01","qty":80,"entry":24.383,"exit":26.50,"ccy":"USD","pnlUSD":169.36,"note":"Stop triggered."},
      {"id":32,"ticker":"V","dateIn":"2026-03-24","dateOut":"2026-05-05","qty":8,"entry":307.125,"exit":321.823,"ccy":"USD","pnlUSD":117.58,"note":"T28. Re-entry $305-315."},
      {"id":33,"ticker":"NOG","dateIn":"2026-05-04","dateOut":"2026-05-07","qty":200,"entry":26.771,"exit":25.11,"ccy":"USD","pnlUSD":-332.20,"note":"Iran deal noise. WTI $93."},
      {"id":34,"ticker":"R3NK","dateIn":"2026-04-08","dateOut":"2026-05-07","qty":25,"entry":52.27,"exit":53.44,"ccy":"EUR","pnlUSD":31.59,"note":"Iran deal noise. T30. Rebuy GTC placed."},
      {"id":35,"ticker":"R3NK","dateIn":"2026-05-07","dateOut":"2026-05-11","qty":25,"entry":52.00,"exit":47.01,"ccy":"EUR","pnlUSD":-136,"note":"T35 GTC EUR52 filled S37. Stop triggered S40. T31 codified: stop was above 52W low €45.97."},
      {"id":36,"ticker":"AMPX","dateIn":"2026-05-05","dateOut":"2026-05-07","qty":168,"entry":18.106,"exit":17.94,"ccy":"USD","pnlUSD":-27.89,"note":"Stop $18.92 gapped. Pre-earnings."},
      {"id":37,"ticker":"MRVL","dateIn":"2026-03-24","dateOut":"2026-05-07","qty":10,"entry":152.10,"exit":160.02,"ccy":"USD","pnlUSD":79.20,"note":"Stop $159.95. POET controversy."},
      {"id":38,"ticker":"CEG","dateIn":"2026-05-04","dateOut":"2026-05-07","qty":14,"entry":308.072,"exit":314.77,"ccy":"USD","pnlUSD":93.77,"note":"Stop raised then triggered. +$93.77."},
      {"id":39,"ticker":"PYPL","dateIn":"2026-05-08","dateOut":null,"qty":55,"entry":45.639,"exit":null,"ccy":"USD","pnlUSD":null,"note":"T39: S38 market fill. Q1 beat EPS $1.34. Stop $37.50. OPEN."},
      {"id":41,"ticker":"R3NK","dateIn":"2026-05-11","dateOut":null,"qty":200,"entry":46.485,"exit":null,"ccy":"EUR","pnlUSD":null,"note":"T41: S40 conviction rebuy. T31 applied. Stop €44.00. Raise stop ≥€44.20 on first bounce. OPEN."},
      {"id":42,"ticker":"IREN","dateIn":"2026-05-11","dateOut":null,"qty":24,"entry":55.042,"exit":null,"ccy":"USD","pnlUSD":null,"note":"T42: S40. GTC filled. Gate not met (premarket -9%, $2B convert). SI-37. Stop $52. P27. OPEN."},
      {"id":43,"ticker":"ZETA","dateIn":"2026-05-11","dateOut":null,"qty":191,"entry":16.866,"exit":null,"ccy":"USD","pnlUSD":null,"note":"T43: S40. Fill $16.86. 19 consec beats. Stop $14.50. Next earnings Aug 4. OPEN."},
      {"id":44,"ticker":"PATH","dateIn":"2026-05-11","dateOut":null,"qty":320,"entry":10.726,"exit":null,"ccy":"USD","pnlUSD":null,"note":"T44: S40. Fill $10.72. Agentic AI. Stop $9.20. Earnings May 28 — T23 ~May 26. OPEN."}
    ],
    "lastUpdated":"2026-05-11 S40 FINAL. T35 closed (T40 stop). T41-T44 open. 39 closed + 5 open = 44 rows."
  },
  "sessionNotes": [
    {"date":"2026-05-07","note":"S37: LMT stop raised. RR.L Q1 beat +6.47%. NOG T33 sold Iran noise. R3NK T34 sold, T35 rebuy €52. AMPX T36, MRVL T37, CEG T38 all closed. NCH2 cancelled E25."},
    {"date":"2026-05-08","note":"S38: SNPS stop $440→$500.10→$496.76. MSFT stop $373→$412.10. T39 PYPL 55sh @$45.64. UUUU Q1 beat. Iran rejected US proposal. CENTCOM strikes."},
    {"date":"2026-05-09","note":"S39: Saturday framework session. Rules framework overhauled. P20 amended. ATH rule consolidated. T26 amended. SI-69-76 added. 4 stop changes live in IBKR. 15 new watchlist entries. ZETA/PATH Stage 2 actionable. Full scan complete."},
    {"date":"2026-05-11","note":"S40: T35 R3NK stopped €47.010 (-$136). T31 codified. T41 R3NK rebuy 200sh @€46.461 stop €44 (T31 applied, conviction sizing). T42 IREN 24sh @$55.042 stop $52 (GTC gate breach — E26 codified). T43 ZETA 191sh @$16.866 stop $14.50. T44 PATH 320sh @$10.726 stop $9.20. AMZN stop raised $263.93. CLARITY Act research — Senate markup May 14. NCH2 date corrected to May 12. LDO €50.66 (€0.66 above stop). CRML recovered $12.45 (was $11.69 intraday). R3NK drifted -5.14% to €45.635. Daily P&L -$432. Net liq $104.2K. 22 positions."}
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
  const tabs=["positions","gtcs","watch","shorts","eu-energy","minerals","clarity","thesis","tracker","notes"];
  const pnlColor=(v)=>v>0?COLORS.green:v<0?COLORS.red:COLORS.textDim;
  const stageColor=(s)=>s?.includes("STAGE 2")?COLORS.green:s?.includes("STAGE 1")?COLORS.accent:s?.includes("IPO")?COLORS.purple:COLORS.yellow;
  const urgentBorder=(pos)=>{
    if(pos.status?.includes("⚠️"))return"3px solid "+COLORS.red;
    if(pos.unrealPnL>300)return"3px solid "+COLORS.green;
    if(pos.unrealPnL<-200)return"3px solid "+COLORS.red;
    if(pos.status?.includes("NEW")||pos.status?.includes("T4"))return"3px solid "+COLORS.blue;
    return undefined;
  };
  return(
    <div style={{background:COLORS.bg,minHeight:"100vh",color:COLORS.text,fontFamily:"monospace",padding:16,maxWidth:1200,margin:"0 auto"}}>
      <style>{`.card{background:${COLORS.card};border:1px solid ${COLORS.border};border-radius:6px;padding:12px}.badge{font-size:10px;padding:2px 6px;border-radius:4px;font-weight:600;display:inline-block}.badge-green{background:rgba(63,185,80,0.15);color:${COLORS.green};border:1px solid rgba(63,185,80,0.3)}.badge-red{background:rgba(248,81,73,0.15);color:${COLORS.red};border:1px solid rgba(248,81,73,0.3)}.badge-amber{background:rgba(210,153,34,0.15);color:${COLORS.yellow};border:1px solid rgba(210,153,34,0.3)}.badge-blue{background:rgba(56,139,253,0.15);color:${COLORS.blue};border:1px solid rgba(56,139,253,0.3)}.badge-purple{background:rgba(163,113,247,0.15);color:${COLORS.purple};border:1px solid rgba(163,113,247,0.3)}.badge-grey{background:rgba(139,148,158,0.15);color:${COLORS.textDim};border:1px solid rgba(139,148,158,0.3)}.btn{background:${COLORS.card};border:1px solid ${COLORS.border};color:${COLORS.text};padding:6px 12px;border-radius:4px;cursor:pointer;font-family:monospace;font-size:12px}.btn:hover{background:#21262d}.btn-primary{background:rgba(88,166,255,0.15);border-color:rgba(88,166,255,0.4);color:${COLORS.accent}}input{background:${COLORS.card};border:1px solid ${COLORS.border};color:${COLORS.text};padding:8px;border-radius:4px;font-family:monospace;font-size:12px;flex:1}`}</style>
      <div style={{marginBottom:16}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:8}}>
          <div>
            <div style={{fontSize:18,fontWeight:700,color:COLORS.textBright}}>CLAUDE FUND — JOURNAL v54 S40</div>
            <div style={{fontSize:11,color:COLORS.textDim,marginTop:2}}>Session 40 — Mon 11 May 2026 | {data.fund.account} | 22 positions | 2 GTCs</div>
          </div>
          <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
            {[{label:"NET LIQ",val:"~$104.2K"},{label:"CASH USD",val:"$28,494",color:COLORS.yellow},{label:"DAILY P&L",val:"-$432",color:COLORS.red},{label:"NCH2",val:"TOMORROW",color:COLORS.yellow}].map(m=>(
              <div key={m.label} className="card" style={{textAlign:"center",minWidth:80}}>
                <div style={{fontSize:9,color:COLORS.textDim}}>{m.label}</div>
                <div style={{fontSize:14,fontWeight:700,color:m.color||COLORS.textBright,marginTop:2}}>{m.val}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{marginTop:6,padding:"6px 10px",background:"rgba(248,81,73,0.1)",border:"1px solid rgba(248,81,73,0.3)",borderRadius:4,fontSize:11,color:COLORS.red,fontWeight:700}}>
          ⚠️ LDO €0.66 above stop | MSFT $6.45 above stop | CRML $1.25 above stop | R3NK: raise stop ≥€44.20 on bounce
        </div>
        <div style={{marginTop:4,padding:"6px 10px",background:"rgba(210,153,34,0.15)",border:"1px solid rgba(210,153,34,0.4)",borderRadius:4,fontSize:11,color:COLORS.yellow}}>
          S41: NCH2 H1 09:00 UAE | CLARITY ACT MAY 14 (MSTR gate) | DPRO+TE earnings today | LDO watch at EU open
        </div>
      </div>
      <div style={{display:"flex",gap:4,marginBottom:12,flexWrap:"wrap"}}>
        {tabs.map(t=>(<button key={t} className={`btn ${activeTab===t?"btn-primary":""}`} onClick={()=>setActiveTab(t)} style={{textTransform:"uppercase",fontSize:11}}>{t}</button>))}
      </div>
      {activeTab==="positions"&&(<div style={{display:"flex",flexDirection:"column",gap:6}}>{data.positions?.map((p)=>(<div key={p.ticker} className="card" style={{borderLeft:urgentBorder(p)}}><div style={{display:"flex",gap:10,alignItems:"center",flexWrap:"wrap",marginBottom:3}}><span style={{fontWeight:700,fontSize:13,color:COLORS.textBright}}>{p.ticker}</span>{p.cur&&<span className="badge badge-grey">{p.cur}</span>}{p.unrealPnL!==undefined&&<span className={`badge ${p.unrealPnL>50?"badge-green":p.unrealPnL<-50?"badge-red":"badge-amber"}`}>{p.unrealPnL>=0?"+":""}{p.unrealPct?.toFixed(1)}%</span>}<span style={{fontSize:9,color:COLORS.textDim,marginLeft:"auto"}}>Stop: <b style={{color:COLORS.yellow}}>{p.stop||p.stopType||"--"}</b></span></div><div style={{fontSize:10,color:COLORS.accent,marginBottom:2}}>{p.status}</div><div style={{fontSize:9,color:COLORS.textDim}}>{p.note}</div></div>))}</div>)}
      {activeTab==="gtcs"&&(<div style={{display:"flex",flexDirection:"column",gap:6}}>{data.pendingGTCs?.map((g)=>(<div key={g.ticker} className="card" style={{borderLeft:"3px solid "+COLORS.blue}}><div style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap",marginBottom:3}}><span style={{fontWeight:700,fontSize:13,color:COLORS.textBright}}>{g.ticker}</span><span className="badge badge-blue">BUY GTC</span><span style={{fontSize:11,color:COLORS.accent}}>Limit: {g.limit} / Stop: {g.stop}</span><span className={`badge ${g.maxLoss<=200?"badge-green":g.maxLoss<=400?"badge-amber":"badge-red"}`}>Max ${g.maxLoss}</span></div><div style={{fontSize:9,color:COLORS.textDim}}>{g.note}</div></div>))}</div>)}
      {activeTab==="watch"&&(<div><div style={{fontSize:11,color:COLORS.textDim,marginBottom:8}}>{data.watchList?.length} entries</div><div style={{display:"flex",flexDirection:"column",gap:6}}>{data.watchList?.map((w,i)=>(<div key={i} className="card" style={{borderLeft:"3px solid "+stageColor(w.status)}}><div style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap",marginBottom:3}}><span style={{fontWeight:700,fontSize:13,color:COLORS.textBright}}>{w.ticker}</span>{w.name&&<span style={{fontSize:10,color:COLORS.textDim}}>{w.name}</span>}</div><div style={{fontSize:10,color:stageColor(w.status),marginBottom:2,fontWeight:600}}>{w.status}</div><div style={{fontSize:9,fontStyle:"italic",color:COLORS.textBright,marginBottom:3}}>{w.thesis?.substring(0,120)}{w.thesis?.length>120?"...":""}</div>{w.gate&&<div style={{fontSize:9,color:COLORS.yellow}}>Gate: {w.gate?.substring(0,100)}</div>}</div>))}</div></div>)}
      {activeTab==="shorts"&&(<div>{data.shortWatchlist?.map((s,i)=>(<div key={i} className="card" style={{marginBottom:6,borderLeft:"3px solid "+(s.status?.includes("DORMANT")?COLORS.textDim:COLORS.purple)}}><div style={{display:"flex",gap:8,alignItems:"center",marginBottom:3}}><span style={{fontWeight:700,color:COLORS.textBright}}>{s.ticker}</span>{s.status?.includes("DORMANT")?<span className="badge badge-grey">DORMANT</span>:<span className="badge badge-purple">WATCH</span>}</div><div style={{fontSize:10,color:COLORS.textDim,marginBottom:2}}>{s.thesis}</div><div style={{fontSize:9,color:COLORS.yellow}}>Trigger: {s.trigger}</div></div>))}</div>)}
      {activeTab==="eu-energy"&&(<div><div className="card" style={{marginBottom:8,borderLeft:"4px solid "+COLORS.yellow}}><div style={{fontWeight:700,color:COLORS.yellow,fontSize:13,marginBottom:4}}>{data.euEnergyTransition?.title}</div><div style={{fontSize:10,color:COLORS.green,marginBottom:4,fontWeight:600}}>{data.euEnergyTransition?.concentrationCeiling}</div><div style={{padding:"8px",background:"rgba(248,81,73,0.1)",borderRadius:4,fontSize:11,color:COLORS.red,fontWeight:700}}>{data.euEnergyTransition?.gateNote}</div></div></div>)}
      {activeTab==="minerals"&&(<div><div className="card" style={{marginBottom:8,borderLeft:"4px solid "+COLORS.green}}><div style={{fontWeight:700,color:COLORS.green,fontSize:13,marginBottom:4}}>{data.criticalMineralsThesis?.title}</div><div style={{padding:"6px 10px",background:"rgba(248,81,73,0.1)",borderRadius:4,fontSize:11,color:COLORS.red,fontWeight:600}}>CEILING: {data.criticalMineralsThesis?.concentrationCeiling}</div></div>{data.criticalMineralsThesis?.candidates?.map((c,i)=>(<div key={i} className="card" style={{marginBottom:6,borderLeft:"3px solid "+(c.status?.includes("HELD")?"#3fb950":"#388bfd")}}><div style={{display:"flex",gap:8,alignItems:"center",marginBottom:3}}><span style={{fontWeight:700,color:COLORS.textBright}}>{c.ticker}</span><span className={`badge ${c.status?.includes("HELD")?"badge-green":"badge-blue"}`}>{c.status}</span></div><div style={{fontSize:10,color:COLORS.textDim}}>{c.thesis}</div>{c.stop&&<div style={{fontSize:9,color:COLORS.yellow,marginTop:2}}>Stop: {c.stop}</div>}</div>))}</div>)}
      {activeTab==="clarity"&&(<div><div className="card" style={{borderLeft:"4px solid "+COLORS.purple}}><div style={{fontWeight:700,color:COLORS.purple,fontSize:13,marginBottom:6}}>{data.clarityAct?.title}</div><div style={{fontSize:11,marginBottom:8,lineHeight:1.7}}>{data.clarityAct?.what}</div><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:8}}><div className="card"><div style={{fontSize:9,color:COLORS.textDim}}>Senate markup</div><div style={{fontSize:14,fontWeight:700,color:COLORS.red}}>THU MAY 14</div></div><div className="card"><div style={{fontSize:9,color:COLORS.textDim}}>BTC now / Gate</div><div style={{fontSize:14,fontWeight:700,color:COLORS.yellow}}>$80K / $85K</div></div></div><div style={{padding:"8px",background:"rgba(163,113,247,0.1)",borderRadius:4,fontSize:11,color:COLORS.purple,fontWeight:600}}>{data.clarityAct?.action}</div></div></div>)}
      {activeTab==="thesis"&&(<div><div className="card" style={{marginBottom:8,borderLeft:"4px solid "+COLORS.orange}}><div style={{fontWeight:700,color:COLORS.orange,fontSize:13,marginBottom:4}}>{data.thesis.title}</div><div style={{fontSize:11,lineHeight:1.8,marginBottom:6}}>{data.thesis.summary}</div><div style={{padding:"6px 10px",background:"rgba(210,153,34,0.1)",borderRadius:4,fontSize:11,color:COLORS.yellow}}>{data.thesis.SI25Status}</div></div>{data.thesis.keyDates?.map((d,i)=>(<div key={i} className="card" style={{marginBottom:4,borderLeft:"3px solid "+(d.priority==="CRITICAL"?COLORS.red:d.priority==="HIGH"?COLORS.yellow:COLORS.textDim)}}><div style={{display:"flex",gap:8,alignItems:"flex-start"}}><span style={{fontSize:10,fontWeight:600,minWidth:160,color:COLORS.textBright}}>{d.date}</span><span style={{fontSize:10,color:COLORS.textDim,flex:1}}>{d.event}</span><span className={`badge ${d.priority==="CRITICAL"?"badge-red":d.priority==="HIGH"?"badge-amber":"badge-grey"}`}>{d.priority}</span></div></div>))}</div>)}
      {activeTab==="tracker"&&(<div><div style={{fontSize:12,fontWeight:600,color:COLORS.accent,marginBottom:6}}>TRADE TRACKER — 39 CLOSED + 5 OPEN (T39 PYPL, T41 R3NK, T42 IREN, T43 ZETA, T44 PATH) | 44 rows</div>{data.tradeTracker?.closedTrades?.slice().reverse().map((t)=>(<div key={t.id} className="card" style={{marginBottom:3,borderLeft:"3px solid "+(t.pnlUSD===null?COLORS.blue:t.pnlUSD>0?COLORS.green:COLORS.red)}}><div style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap"}}><span style={{fontSize:9,color:COLORS.textDim}}>#{t.id}</span><span style={{fontWeight:600,fontSize:12}}>{t.ticker}</span><span style={{fontSize:9,color:COLORS.textDim}}>{t.dateOut||"OPEN"}</span>{t.pnlUSD!==null?<span style={{fontWeight:700,color:pnlColor(t.pnlUSD)}}>{t.pnlUSD>0?"+$":"-$"}{Math.abs(t.pnlUSD).toFixed(0)}</span>:<span className="badge badge-blue">OPEN</span>}<span className="badge badge-grey">{t.ccy}</span></div><div style={{fontSize:9,color:COLORS.textDim,marginTop:1}}>{t.note}</div></div>))}</div>)}
      {activeTab==="notes"&&(<div><div style={{display:"flex",gap:8,marginBottom:10}}><input value={newNote} onChange={e=>setNewNote(e.target.value)} placeholder="Add note..." onKeyDown={e=>e.key==="Enter"&&addNote()}/><button className="btn btn-primary" onClick={addNote}>ADD</button></div>{(data.sessionNotes||[]).slice().reverse().map((n,i)=>(<div key={i} className="card" style={{marginBottom:6}}><div style={{fontSize:10,color:COLORS.textDim,marginBottom:3}}>{n.date}</div><div style={{fontSize:11,lineHeight:1.7}}>{n.note}</div></div>))}</div>)}
      <div style={{marginTop:16,paddingTop:10,borderTop:"1px solid "+COLORS.border,display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:6,alignItems:"center"}}>
        <span style={{fontSize:10,color:COLORS.textDim}}>v54 S40 | Mon 11 May 2026 | 22 pos | Daily -$432 | Thesis INTACT</span>
        <div style={{display:"flex",gap:4,flexWrap:"wrap"}}>
          <span className="badge badge-red">LDO €0.66 stop ⚠️</span>
          <span className="badge badge-amber">NCH2 TOMORROW 09:00</span>
          <span className="badge badge-purple">CLARITY MAY 14</span>
          <span className="badge badge-amber">R3NK raise stop on bounce</span>
        </div>
      </div>
    </div>
  );
}
