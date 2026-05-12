import { useState, useEffect, useCallback } from "react";
const STORAGE_KEY = "fund_journal_v4";
// TIME: UAE=UTC+4. LSE/EU open 11:00 UAE. NYSE open 17:30 UAE. Frankfurt 11:00 UAE.
// E20: IBKR TWS only for live prices. E22: CENTCOM required for military claims.
// E26: GTC cancel protocol — >5% adverse premarket on material news = cancel before 17:30 UAE.
// SI-68: No close files until screenshots confirmed. T31: Stop below 52W low on 40%+ ATH names.
// E28: Never widen stop on losing position within 1pt of trigger — SI-35 governs.

const INITIAL_STATE = {
  "lastUpdated": "2026-05-12 S41 CLOSE. T45 LDO stopped €50.00 (-$232). T46 AMZN stopped $263.943 (+$1,882). T41 R3NK stopped €43.9925 (-$543). Net realized today +$1,107. 19 positions. CCJ ⚠️ $1.12 buffer. CRML ⚠️ $0.47 buffer. CLARITY Act markup tonight 18:30 UAE.",
  "sessionNumber": "S41",
  "fund": {
    "account": "U24936508",
    "netLiquidity": 102300,
    "unrealizedPnL": 398,
    "cashUSD": 36411,
    "cashGBP": 641,
    "cashEUR": -465,
    "broker": "IBKR Pro",
    "note": "v55 S41 CLOSE. Tue 12 May 2026. 19 positions. 2 GTCs. Daily P&L -$1,945 (-1.86%). Realized -$843.21. Three stops: LDO -$232, R3NK -$543, AMZN +$1,882. Net realized today +$1,107."
  },
  "thesis": {
    "title": "TRUMP CEASEFIRE ON LIFE SUPPORT — THESIS INTACT — SI-25 CONDITION 1 UNMET",
    "summary": "Trump called ceasefire 'on massive life support' May 12. Iran counter-offer rejected as 'garbage'. WTI $99.15 bouncing from $95 lows. SI-25 Condition 1 unmet. Thesis intact and strengthening. Trump-Xi meeting Beijing May 14-15.",
    "oilWTI": 99.15,
    "SI25Trigger": 105.87,
    "SI25PeakRef": 117.63,
    "SI25Status": "WTI ~$99. Ceasefire on life support. Condition 1 UNMET. Thesis INTACT.",
    "hormuzStatus": "Iran counter-offer rejected. Trump-Xi meeting May 14-15. CENTCOM strikes ongoing.",
    "keyDates": [
      {"date": "Thu 14 May TONIGHT", "event": "CLARITY Act Senate Banking Committee markup 10:30 AM EST = 18:30 UAE. MSTR scale gate BTC $85K. BTC ~$81K now. MSTR -6.21% today pre-markup. Democrat opposition risk.", "priority": "CRITICAL"},
      {"date": "Thu 14-15 May", "event": "Trump-Xi meeting Beijing. Monitor for any Iran/Hormuz signals. China is Iran's primary oil buyer.", "priority": "HIGH"},
      {"date": "Thu 22 May", "event": "BAH Q4 FY2026 earnings. Second tranche decision gate.", "priority": "HIGH"},
      {"date": "~Mon 25 May", "event": "SNPS T23 lock (48-72h before May 27 AMC). DO NOT move stop after this date.", "priority": "HIGH"},
      {"date": "Wed 27 May AMC", "event": "SNPS Q2 FY2026 + CRM Q1 FY2027. Post-print CRM entry if thesis intact.", "priority": "HIGH"},
      {"date": "Thu 28 May", "event": "PATH Q1 FY2027 earnings + LULU Q3 + MRVL Q1. PATH: decision on sizing. T23 lock ~May 26.", "priority": "HIGH"},
      {"date": "Wed 30 Jul", "event": "RR.L H1 results. Review stop 1149.4p pre-H1.", "priority": "HIGH"},
      {"date": "Aug 12 2026", "event": "IonQ Q2 2026 earnings. IONQ stage 1 complete — watchlist dip-buy $38-45. T23 lock ~Aug 10.", "priority": "HIGH"}
    ]
  },
  "positions": [
    {"ticker":"CRML","shares":110,"avgPrice":9.08,"last":11.67,"unrealPnL":284,"unrealPct":28.4,"stop":11.20,"status":"HOLD — STOP $11.20 — ⚠️ $0.47 BUFFER — P21 SPECULATIVE","note":"P21 speculative. $450M needed, $80M held. Dilution risk. Kill switch $11.20. Buffer tightened $0.87→$0.47 in S41."},
    {"ticker":"ABVX","shares":50,"avgPrice":109.89,"last":121.72,"unrealPnL":600,"unrealPct":10.9,"stop":109.93,"status":"HOLD — STOP $109.93 — M&A EXCEPTION","note":"Royalty buyback signal. Maximum room strategy."},
    {"ticker":"IES","name":"Invinity Energy Systems","shares":3000,"avgPrice":17.49,"last":20.10,"unrealPnL":78,"unrealPct":14.9,"stopType":"MANUAL ALERT 12.5p","cur":"GBP","status":"HOLD — MANUAL ALERT 12.5p — +4.42% S41","note":"LDES decision pending. +4.42% today. Positive momentum."},
    {"ticker":"CODA","shares":250,"avgPrice":11.105,"last":11.88,"unrealPnL":194,"unrealPct":7.0,"stop":9.95,"status":"HOLD — STOP $9.95 — P14 DELIBERATE — PROJECT FREEDOM CATALYST","note":"P14 deliberate. More time given. Stop lowered S39 $10.90→$9.95."},
    {"ticker":"RR","name":"Rolls-Royce Holdings","shares":100,"avgPrice":1128.6,"last":1187.80,"unrealPnL":59,"unrealPct":5.2,"stop":1149.4,"cur":"GBP","status":"HOLD — STOP 1149.4p — H1 JUL 30 — EU ENERGY 1/4","note":"Q1 beat +6.47%. H1 Jul 30 gate. -3.24% today."},
    {"ticker":"MSTR","shares":15,"avgPrice":181.067,"last":183.77,"unrealPnL":40,"unrealPct":1.5,"stop":153.14,"status":"HOLD — STOP $153.14 — CLARITY TONIGHT 18:30 UAE — BTC GATE $85K","note":"CLARITY Act markup tonight. BTC ~$81K, gate $85K. MSTR -6.21% today pre-markup. Scale on clean pass + BTC $85K. Kill: BTC <$70K weekly."},
    {"ticker":"SNPS","shares":8,"avgPrice":495.125,"last":509.10,"unrealPnL":111,"unrealPct":2.8,"stop":496.76,"status":"HOLD — STOP $496.76 — T23 LOCK ~MAY 25 — EARNINGS MAY 27 AMC","note":"T23 lock ~May 25. DO NOT MOVE stop after lock. Earnings May 27 AMC."},
    {"ticker":"MSFT","shares":25,"avgPrice":403.052,"last":407.97,"unrealPnL":122,"unrealPct":1.2,"stop":403.89,"status":"HOLD — STOP $403.89 — $4.08 BUFFER — TCI OVERHANG","note":"TCI $8B stake overhang. Buffer $4.08 (1.0%). Majorana 1 topological qubit optionality embedded."},
    {"ticker":"CCJ","shares":50,"avgPrice":117.02,"last":113.26,"unrealPnL":-193,"unrealPct":-3.3,"stop":112.14,"status":"HOLD — STOP $112.14 — ⚠️ $1.12 BUFFER — -5.73% TODAY — URANIUM SELLOFF","note":"CRITICAL: $1.12 buffer (0.99%). CCJ and UUUU both hit hard today — uranium sector selloff. Check sector news S42. Multi-year uranium thesis intact."},
    {"ticker":"CGCT","shares":291,"avgPrice":10.295,"last":10.39,"unrealPnL":28,"unrealPct":0.9,"stop":null,"status":"HOLD — NO STOP — SPAC","note":"Trust floor ~$10.27."},
    {"ticker":"IREN","name":"IREN Ltd","shares":24,"avgPrice":55.042,"last":53.68,"unrealPnL":-33,"unrealPct":-2.5,"stop":52.00,"status":"HOLD — STOP $52.00 — T42 — NVIDIA DEAL — SI-37","note":"T42 S40. $2B convert overhang. NVIDIA $3.4B deal. Stop $52. SI-37 max $1,500. Hold to stop. Do not add."},
    {"ticker":"LMT","name":"Lockheed Martin","shares":10,"avgPrice":516.831,"last":517.05,"unrealPnL":2,"unrealPct":0.0,"stop":479.77,"status":"HOLD — STOP $479.77 — RAISED S37","note":"Stop raised $465→$479.77 S37. +0.94% today."},
    {"ticker":"PATH","name":"UiPath","shares":320,"avgPrice":10.726,"last":10.20,"unrealPnL":-168,"unrealPct":-4.9,"stop":9.20,"status":"HOLD — STOP $9.20 — T44 — AGENTIC AI — EARNINGS MAY 28","note":"T44 S40. 83% gross margin, $1.6B cash, zero debt, 108% NRR. -4.32% today. Earnings May 28 — T23 lock ~May 26."},
    {"ticker":"PYPL","name":"PayPal Holdings","shares":55,"avgPrice":45.639,"last":45.18,"unrealPnL":-25,"unrealPct":-1.0,"stop":37.50,"status":"HOLD — STOP $37.50 — T39 — FINTECH TURNAROUND","note":"T39: Q1 beat EPS $1.34. TPV +11%. Next earnings ~Aug 2026."},
    {"ticker":"UUUU","name":"Energy Fuels Inc","shares":50,"avgPrice":22.011,"last":20.00,"unrealPnL":-100,"unrealPct":-9.1,"stop":16.50,"status":"HOLD — STOP $16.50 — ⚠️ -9.26% TODAY — URANIUM SELLOFF — CHECK NEWS","note":"Uranium sector hit hard today: CCJ -5.73%, UUUU -9.26%. Check uranium-specific news S42. Q1 $35.8M beat. ASM July 2026. Stop $16.50 comfortable."},
    {"ticker":"BAH","name":"Booz Allen Hamilton","shares":33,"avgPrice":76.531,"last":76.69,"unrealPnL":6,"unrealPct":0.2,"stop":69,"status":"HOLD — STOP $69 — MAY 22 Q4 GATE","note":"Half-size. Civil revenue risk unresolved. +2.32% today. May 22 gate."},
    {"ticker":"IBM","shares":26,"avgPrice":228.739,"last":220.86,"unrealPnL":-207,"unrealPct":-3.5,"stop":210.08,"status":"HOLD — STOP $210.08 — CONTRARIAN — DECLINING TREND","note":"Contrarian. Declining trend continues. -1.20% today. Quantum exposure embedded."},
    {"ticker":"ZETA","name":"Zeta Global Holdings","shares":191,"avgPrice":16.866,"last":16.00,"unrealPnL":-166,"unrealPct":-5.2,"stop":14.50,"status":"HOLD — STOP $14.50 — T43 — AI MARKETING","note":"T43 S40. 19 consecutive beat-and-raise. -3.09% today. Next earnings Aug 4."},
    {"ticker":"AVAV","shares":15,"avgPrice":185.067,"last":166.22,"unrealPnL":-283,"unrealPct":-10.2,"stop":155.00,"status":"HOLD — STOP $155 — JUNE 30 Q4 GATE — STOP = 52W LOW","note":"Stop $155 = 52W low territory. LASSO deal live. Backlog +51%. June 30 Q4 gate intact."}
  ],
  "pendingGTCs": [
    {"ticker":"LAC","name":"Lithium Americas","action":"BUY","limit":4.80,"stop":4.00,"qty":220,"maxLoss":176,"status":"GTC $4.80 / STOP $4.00 — SI-37 SPECULATIVE","note":"Thacker Pass Phase 1."},
    {"ticker":"TXT","name":"Textron Inc","action":"BUY","limit":88.00,"stop":79.00,"qty":55,"maxLoss":495,"status":"GTC $88 PENDING — ~7% PULLBACK NEEDED","note":"Bell MV-75 Valor = 20yr military monopoly."}
  ],
  "watchList": [
    {"ticker":"NCH2","name":"Thyssenkrupp Nucera","thesis":"Largest industrial alkaline electrolyser. Moeve 300MW confirmed. EV ~EUR225M vs EUR648M net cash. Stage 2 done.","entry":"Deferred to Q3 Aug 2026. If stock at €8 or below at that point, re-evaluate with confirmed Moeve revenue.","gate":"Q3 FY2026 results August 2026. Gate: Moeve in revenue recognition + no new cost overrun disclosures.","status":"DEFERRED — R/R 1.09:1 INSUFFICIENT — REVIEW AUG 2026"},
    {"ticker":"CCL","name":"Carnival Corporation","thesis":"Peace deal primary vehicle. Zero fuel hedging = maximum oil cost leverage. 85% booked. Mechanical recovery on Hormuz reopening.","entry":"$24.50-25.50. Stop $23. Target $33-35.","gate":"Hormuz peace deal. R/R 4.5:1. No earnings gate until June 2026.","status":"PEACE DEAL LONG — ENTRY ZONE $24.50-25.50 — APPROACHING"},
    {"ticker":"TUI1","name":"TUI AG","thesis":"Europe's largest package tour operator. Mediterranean bookings -7% YoY. Full-year guidance suspended. Maximum peace deal leverage: flights+hotels+cruises all recover simultaneously.","entry":"€5.80-6.20 post-H1 print. Stop €4.90. Target €9.20.","gate":"H1 printed May 12. Read report. R/R 3.5-3.8:1. SI-37 sizing (debt risk).","status":"PEACE DEAL — POST-H1 ENTRY WATCH — READ REPORT"},
    {"ticker":"SIX2","name":"Sixt SE","thesis":"German premium car rental. Airport-focused. Mediterranean summer revenue. No fuel cost complexity. Strong Buy consensus €96.86 target.","entry":"€62-65 post-Q1 print. Stop €54. Target €97.","gate":"Q1 printed May 12-13. R/R 4.4:1 at €62.","status":"PEACE DEAL — POST-Q1 ENTRY WATCH"},
    {"ticker":"RYAAY","name":"Ryanair","thesis":"European LCC. Down 22% from ATH $74.24. Peace deal = fuel cost drop + Mediterranean booking recovery.","entry":"$52-55 post-earnings. Stop $47. Target $74-76.","gate":"FY earnings May 21. P24 blocks until post-print. R/R 3.8-4.8:1 at $52.","status":"PEACE DEAL — P24 BLOCK UNTIL MAY 21"},
    {"ticker":"RCL","name":"Royal Caribbean","thesis":"Premium cruise. Peace deal bounce. Quality vehicle.","entry":"$255-270. Stop $245. Target $320-340.","gate":"Needs pullback. July 2026 earnings.","status":"PEACE DEAL — ENTRY $255-270 — NEEDS PULLBACK"},
    {"ticker":"IONQ","name":"IonQ Inc","thesis":"Stage 1 COMPLETE. Trapped-ion quantum. 99.99% fidelity world record. Q1 2026 rev $64.7M +755% YoY. RPO $470M +554%. $3.1B cash. DARPA/MDA/SDA contracts. Full-stack platform. GROWTH THESIS.","entry":"Dip buy $38-45. Stop $27. Target $80-100.","gate":"Q2 earnings Aug 12. T23 lock ~Aug 10. Growth thesis — not event bounce, no 3:1 requirement.","status":"STAGE 1 COMPLETE — DIP BUY $38-45 — SI-37 SPECULATIVE"},
    {"ticker":"CRM","name":"Salesforce","thesis":"Down 30% in 2026. Fwd P/E 13.8x. $25B buyback. Agentforce AI.","entry":"Post May 27 earnings ONLY.","gate":"Q1 FY2027 earnings May 27 AMC. P24 prevents pre-entry.","status":"WATCH — EARNINGS MAY 27"},
    {"ticker":"LULU","name":"Lululemon","thesis":"60% below ATH. Fwd P/E 10.5x. Near 52wk low $127.","entry":"Post May 28 earnings. Pullback ~$127: enter, stop $124.","gate":"Q3 FY2026 earnings May 28.","status":"WATCH — EARNINGS MAY 28"},
    {"ticker":"V","name":"Visa Inc","thesis":"Stopped T32 @$321.823. Q2 FY26 rev +15%. Thesis intact.","entry":"$305-315 zone only. Stop $292-295.","gate":"Q3 earnings Jul 28.","status":"WATCH — RE-ENTRY $305-315"},
    {"ticker":"NOG","name":"Northern Oil and Gas","thesis":"Sold T33 Iran noise. Iran rejected deal. Thesis intact. Re-entry if WTI >$105 sustained.","entry":"No entry until SI-25 Condition 1 confirmed failure + WTI >$105.","gate":"WTI sustained >$105.","status":"WATCH — THESIS GATE"},
    {"ticker":"MRVL","name":"Marvell Technology","thesis":"Closed T37. AI chip thesis intact.","entry":"Post May 28 earnings if SI-39 flags.","gate":"Q1 earnings May 28.","status":"WATCH — EARNINGS MAY 28"},
    {"ticker":"PATH_SCALE","name":"UiPath scale","thesis":"T44 open 320sh. If earnings May 28 beat, consider scaling.","entry":"Post-earnings only.","gate":"May 28 Q1 FY2027.","status":"SCALE GATE — MAY 28"},
    {"ticker":"SOFI","name":"SoFi Technologies","thesis":"T27 turnaround. Fwd P/E low. 52% below ATH.","entry":"$13-14 on macro pullback. Stop $11.50.","gate":"PYPL (T39) resolved first. Price must pull back to zone.","status":"STAGE 1 — GATE: PYPL RESOLVED + PRICE $13-14"},
    {"ticker":"DPRO","name":"Draganfly Inc","thesis":"Canadian NDAA drone. Gate: revenue acceleration.","entry":"Gate not met. Q1 rev $2.31M vs $5M+ required. Re-examine when quarterly revenue reaches $4M+.","gate":"Q1 revenue $2.31M (+49.4% YoY but far below gate). Stage 1 watch only.","status":"GATE NOT MET — Q1 $2.31M vs $5M+ — STAGE 1 WATCH"},
    {"ticker":"ANET","name":"Arista Networks","thesis":"#1 AI data centre switching. Q1 2026 rev $2.71B +35%.","entry":"$130-138 on pullback. Stop $125.","gate":"Wait for Q2 (Aug 4) or macro pullback to zone. Do not chase $142.","status":"STAGE 1 — ENTRY $130-138 — DO NOT CHASE"},
    {"ticker":"ZETA_SCALE","name":"Zeta scale","thesis":"T43 open 191sh @$16.866. 19 consec beats. If next quarter confirms, scale.","entry":"Post Aug 4 earnings Q2 beat.","gate":"Q2 2026 earnings Aug 4.","status":"WATCH — SCALE GATE AUG 4"},
    {"ticker":"ENGIE","name":"Engie SA","thesis":"Morgan Stanley top pick 2026. Belgian nuclear fleet (extended to 2035). LNG infrastructure = Hormuz beneficiary. Fwd PE ~12-14x. NOT re-rated like GTT/NKT. EU Energy slot candidate.","entry":"Stage 1 research needed. Entry zone TBD after research.","gate":"H1 results May/June 2026. Stage 1 first.","status":"STAGE 1 REQUIRED — EU ENERGY CANDIDATE"},
    {"ticker":"GTT","name":"Gaztransport Technigaz","thesis":"Capital-light royalty on every LNG carrier built globally. 68% EBITDA margin. Hormuz = LNG demand = GTT royalties. Perfect thesis fit.","entry":"€170-175 after pullback. Stop €158. Target €235. R/R 4:1.","gate":"Near ATH €215. P13 blocks at current €202. Wait for post-dividend dip (ex-div Jun 17).","status":"EU ENERGY — WATCH €170-175 — P13 BLOCKS NOW"},
    {"ticker":"ANDURIL","name":"Anduril Industries","thesis":"PRIVATE. Lattice OS. Revenue ~$1B→$4.3B guide. Arsenal-1. Series H ~$60B val.","entry":"IPO listing only. S-1 filing = Stage 1 same week.","gate":"S-1 filing with SEC. Monitor web search.","status":"IPO WATCH — PRIVATE"},
    {"ticker":"JOBY","name":"Joby Aviation","thesis":"eVTOL. SR3 complete. Cash $2.5B. FAA TC is the only gate.","entry":"Post FAA Type Certification only.","gate":"FAA TC announcement.","status":"WATCH — GATE: FAA TYPE CERT ONLY"}
  ],
  "shortWatchlist": [
    {"ticker":"PLTR","thesis":"Dormant until Q2 July.","status":"DORMANT UNTIL Q2 JULY 2026","trigger":"Q2 guidance cut only"},
    {"ticker":"AAL","thesis":"No fuel hedge, $36.5B debt.","trigger":"Dead-cat bounce $13-14.","status":"WATCH"},
    {"ticker":"SNOW","thesis":"18x fwd revenue.","trigger":"Earnings miss + guidance trim","status":"WATCH"}
  ],
  "euEnergyTransition": {
    "title":"EU/UK ENERGY TRANSITION — SECTION N (SI-67)",
    "concentrationCeiling":"Maximum 4 positions. CURRENT: RR.L (1/4). 3 slots available. CEG T38 closed — slot freed S37.",
    "stage1Queue":["ENGIE.PA — Stage 1 required (H1 May/Jun). LNG + Belgian nuclear.", "GTT.PA — Watch €170-175 post-dividend dip (ex-div Jun 17)."],
    "watchOnly":["NCH2 deferred to Aug 2026", "ITM.L at 135-140p", "NKT.CO at DKK 820-850 post-Q1"],
    "gateNote":"No forced entries. 3 slots available but better empty than wrong name at wrong price. ENGIE stage 1 is next priority. GTT watching for post-dividend pullback.",
    "scanFrequency":"First session each month + thesis-triggered"
  },
  "criticalMineralsThesis": {
    "title":"CRITICAL MINERALS — NATIONAL SECURITY THEME",
    "concentrationCeiling":"CRML (held) + LAC (GTC) + UUUU (held) = MAXIMUM. T22.",
    "candidates":[
      {"ticker":"CRML","status":"HELD +28.4% — ⚠️ $0.47 BUFFER — CRITICAL","thesis":"Tanbreez 92.5%. EUR acquisition pending. Dilution risk $450M needed/$80M held.","stop":"$11.20"},
      {"ticker":"UUUU","status":"HELD -9.1% — ⚠️ -9.26% TODAY — URANIUM SELLOFF","thesis":"Only US licensed REE separator. Q1 $35.8M. ASM July 2026. Check uranium sector news S42.","classification":"SI-37"},
      {"ticker":"LAC","status":"GTC $4.80 PENDING","thesis":"Thacker Pass. DoE backed.","classification":"SI-37 Speculative"}
    ]
  },
  "clarityAct": {
    "title":"CLARITY ACT — MSTR GATE EVENT — TONIGHT",
    "what":"Digital Asset Market Clarity Act. BTC = digital commodity under CFTC (not security). Banks can custody BTC. Senate Banking Committee markup TONIGHT 18:30 UAE.",
    "houseStatus":"Passed July 2025 (294-134)",
    "senateStatus":"Banking Committee markup TONIGHT 14 MAY 2026 — 18:30 UAE",
    "btcCurrent":81000,
    "mstrScaleGate":85000,
    "action":"If markup passes cleanly tonight: prepare MSTR scale order for Friday open. BTC $4K from gate. Democrat opposition is the risk.",
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
      {"id":41,"ticker":"R3NK","dateIn":"2026-05-11","dateOut":"2026-05-12","qty":200,"entry":46.485,"exit":43.9925,"ccy":"EUR","pnlUSD":-543,"note":"T41: S40 conviction rebuy. T31 applied. Stop €44.00 triggered €43.9925. Stop-widening request declined S41 morning — vindicated same afternoon. R3NK net all trades: -$261. CLOSED."},
      {"id":42,"ticker":"IREN","dateIn":"2026-05-11","dateOut":null,"qty":24,"entry":55.042,"exit":null,"ccy":"USD","pnlUSD":null,"note":"T42: S40. GTC filled. Gate not met (premarket -9%, $2B convert). SI-37. Stop $52. P27. OPEN."},
      {"id":43,"ticker":"ZETA","dateIn":"2026-05-11","dateOut":null,"qty":191,"entry":16.866,"exit":null,"ccy":"USD","pnlUSD":null,"note":"T43: S40. Fill $16.86. 19 consec beats. Stop $14.50. Next earnings Aug 4. OPEN."},
      {"id":44,"ticker":"PATH","dateIn":"2026-05-11","dateOut":null,"qty":320,"entry":10.726,"exit":null,"ccy":"USD","pnlUSD":null,"note":"T44: S40. Fill $10.72. Agentic AI. Stop $9.20. Earnings May 28 — T23 ~May 26. OPEN."},
      {"id":45,"ticker":"LDO","name":"Leonardo SpA","dateIn":"2026-03-27","dateOut":"2026-05-12","qty":35,"entry":56.086,"exit":50.00,"ccy":"EUR","pnlUSD":-232,"note":"T45: Stop €50.00 triggered EU open May 12. Per agreement: leave it. Do not re-enter without compelling specific catalyst beyond rearmament thesis. P28 codified. CLOSED."},
      {"id":46,"ticker":"AMZN","dateIn":"2026-03-24","dateOut":"2026-05-12","qty":30,"entry":201.204,"exit":263.943,"ccy":"USD","pnlUSD":1882,"note":"T46: Stop $263.93 triggered May 12. Entry ~S01 March 2026. Stop raised multiple times — final raise S40 $259.88→$263.93 added $91.50 incremental gain. AWS thesis intact. +31.2% total return. CLOSED."}
    ],
    "lastUpdated":"2026-05-12 S41 CLOSE. T41 R3NK closed €43.9925 (-$543). T45 LDO closed €50.00 (-$232). T46 AMZN closed $263.943 (+$1,882). Net realized today +$1,107. 42 closed + 4 open (T39, T42, T43, T44) = 46 rows."
  },
  "sessionNotes": [
    {"date":"2026-05-07","note":"S37: LMT stop raised. RR.L Q1 beat +6.47%. NOG T33 sold Iran noise. R3NK T34 sold, T35 rebuy €52. AMPX T36, MRVL T37, CEG T38 all closed. NCH2 cancelled E25."},
    {"date":"2026-05-08","note":"S38: SNPS stop $440→$500.10→$496.76. MSFT stop $373→$412.10. T39 PYPL 55sh @$45.64. UUUU Q1 beat. Iran rejected US proposal. CENTCOM strikes."},
    {"date":"2026-05-09","note":"S39: Saturday framework session. Rules framework overhauled. P20 amended. ATH rule consolidated. T26 amended. SI-69-76 added. 4 stop changes live in IBKR. 15 new watchlist entries. ZETA/PATH Stage 2 actionable. Full scan complete."},
    {"date":"2026-05-11","note":"S40: T35 R3NK stopped €47.010 (-$136). T31 codified. T41 R3NK rebuy 200sh @€46.461 stop €44 (T31 applied, conviction sizing). T42 IREN 24sh @$55.042 stop $52. T43 ZETA 191sh @$16.866 stop $14.50. T44 PATH 320sh @$10.726 stop $9.20. AMZN stop raised $263.93. CLARITY Act research. Daily P&L -$432. Net liq $104.2K. 22 positions."},
    {"date":"2026-05-12","note":"S41: Three stops triggered. T45 LDO €50.00 (-$232) — per agreement leave it. T41 R3NK €43.9925 (-$543) — stop-widening request declined AM, vindicated PM. T46 AMZN $263.943 (+$1,882) — stop raised S40 added $91.50 incremental. Net realized today +$1,107. Daily P&L -$1,945 (unrealized drawdown on remaining 19 positions). CCJ -5.73% ($1.12 buffer), UUUU -9.26% — uranium sector selloff. MSTR -6.21% pre-CLARITY markup tonight. NCH2 deferred to Aug 2026 (R/R 1.09:1). IonQ Stage 1 complete — dip buy $38-45 watchlist. EU rearmament: LDO/R3NK both stopped — sector re-rated, better entries needed. Peace deal watchlist: CCL approaching zone, TUI/Sixt post-print. Net liq $102.3K."}
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
            <div style={{fontSize:18,fontWeight:700,color:COLORS.textBright}}>CLAUDE FUND — JOURNAL v55 S41</div>
            <div style={{fontSize:11,color:COLORS.textDim,marginTop:2}}>Session 41 — Tue 12 May 2026 | {data.fund.account} | 19 positions | 2 GTCs</div>
          </div>
          <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
            {[{label:"NET LIQ",val:"~$102.3K"},{label:"CASH USD",val:"$36,411",color:COLORS.yellow},{label:"DAILY P&L",val:"-$1,945",color:COLORS.red},{label:"CLARITY",val:"TONIGHT",color:COLORS.red}].map(m=>(
              <div key={m.label} className="card" style={{textAlign:"center",minWidth:80}}>
                <div style={{fontSize:9,color:COLORS.textDim}}>{m.label}</div>
                <div style={{fontSize:14,fontWeight:700,color:m.color||COLORS.textBright,marginTop:2}}>{m.val}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{marginTop:6,padding:"6px 10px",background:"rgba(248,81,73,0.1)",border:"1px solid rgba(248,81,73,0.3)",borderRadius:4,fontSize:11,color:COLORS.red,fontWeight:700}}>
          ⚠️ CCJ $1.12 buffer (stop $112.14) | CRML $0.47 buffer (stop $11.20) | UUUU -9.26% today | MSTR -6.21% pre-CLARITY
        </div>
        <div style={{marginTop:4,padding:"6px 10px",background:"rgba(210,153,34,0.15)",border:"1px solid rgba(210,153,34,0.4)",borderRadius:4,fontSize:11,color:COLORS.yellow}}>
          S42: CLARITY ACT TONIGHT 18:30 UAE | Check CCJ/UUUU uranium news | TUI+Sixt post-earnings entry zones | IonQ dip-buy $38-45
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
      {activeTab==="clarity"&&(<div><div className="card" style={{borderLeft:"4px solid "+COLORS.purple}}><div style={{fontWeight:700,color:COLORS.purple,fontSize:13,marginBottom:6}}>{data.clarityAct?.title}</div><div style={{fontSize:11,marginBottom:8,lineHeight:1.7}}>{data.clarityAct?.what}</div><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:8}}><div className="card"><div style={{fontSize:9,color:COLORS.textDim}}>Senate markup</div><div style={{fontSize:14,fontWeight:700,color:COLORS.red}}>TONIGHT 18:30</div></div><div className="card"><div style={{fontSize:9,color:COLORS.textDim}}>BTC now / Gate</div><div style={{fontSize:14,fontWeight:700,color:COLORS.yellow}}>$81K / $85K</div></div></div><div style={{padding:"8px",background:"rgba(163,113,247,0.1)",borderRadius:4,fontSize:11,color:COLORS.purple,fontWeight:600}}>{data.clarityAct?.action}</div></div></div>)}
      {activeTab==="thesis"&&(<div><div className="card" style={{marginBottom:8,borderLeft:"4px solid "+COLORS.orange}}><div style={{fontWeight:700,color:COLORS.orange,fontSize:13,marginBottom:4}}>{data.thesis.title}</div><div style={{fontSize:11,lineHeight:1.8,marginBottom:6}}>{data.thesis.summary}</div><div style={{padding:"6px 10px",background:"rgba(210,153,34,0.1)",borderRadius:4,fontSize:11,color:COLORS.yellow}}>{data.thesis.SI25Status}</div></div>{data.thesis.keyDates?.map((d,i)=>(<div key={i} className="card" style={{marginBottom:4,borderLeft:"3px solid "+(d.priority==="CRITICAL"?COLORS.red:d.priority==="HIGH"?COLORS.yellow:COLORS.textDim)}}><div style={{display:"flex",gap:8,alignItems:"flex-start"}}><span style={{fontSize:10,fontWeight:600,minWidth:160,color:COLORS.textBright}}>{d.date}</span><span style={{fontSize:10,color:COLORS.textDim,flex:1}}>{d.event}</span><span className={`badge ${d.priority==="CRITICAL"?"badge-red":d.priority==="HIGH"?"badge-amber":"badge-grey"}`}>{d.priority}</span></div></div>))}</div>)}
      {activeTab==="tracker"&&(<div><div style={{fontSize:12,fontWeight:600,color:COLORS.accent,marginBottom:6}}>TRADE TRACKER — 42 CLOSED + 4 OPEN (T39 PYPL, T42 IREN, T43 ZETA, T44 PATH) | 46 rows</div>{data.tradeTracker?.closedTrades?.slice().reverse().map((t)=>(<div key={t.id} className="card" style={{marginBottom:3,borderLeft:"3px solid "+(t.pnlUSD===null?COLORS.blue:t.pnlUSD>0?COLORS.green:COLORS.red)}}><div style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap"}}><span style={{fontSize:9,color:COLORS.textDim}}>#{t.id}</span><span style={{fontWeight:600,fontSize:12}}>{t.ticker}</span><span style={{fontSize:9,color:COLORS.textDim}}>{t.dateOut||"OPEN"}</span>{t.pnlUSD!==null?<span style={{fontWeight:700,color:pnlColor(t.pnlUSD)}}>{t.pnlUSD>0?"+$":"-$"}{Math.abs(t.pnlUSD).toFixed(0)}</span>:<span className="badge badge-blue">OPEN</span>}<span className="badge badge-grey">{t.ccy}</span></div><div style={{fontSize:9,color:COLORS.textDim,marginTop:1}}>{t.note}</div></div>))}</div>)}
      {activeTab==="notes"&&(<div><div style={{display:"flex",gap:8,marginBottom:10}}><input value={newNote} onChange={e=>setNewNote(e.target.value)} placeholder="Add note..." onKeyDown={e=>e.key==="Enter"&&addNote()}/><button className="btn btn-primary" onClick={addNote}>ADD</button></div>{(data.sessionNotes||[]).slice().reverse().map((n,i)=>(<div key={i} className="card" style={{marginBottom:6}}><div style={{fontSize:10,color:COLORS.textDim,marginBottom:3}}>{n.date}</div><div style={{fontSize:11,lineHeight:1.7}}>{n.note}</div></div>))}</div>)}
      <div style={{marginTop:16,paddingTop:10,borderTop:"1px solid "+COLORS.border,display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:6,alignItems:"center"}}>
        <span style={{fontSize:10,color:COLORS.textDim}}>v55 S41 | Tue 12 May 2026 | 19 pos | Daily -$1,945 | Thesis INTACT</span>
        <div style={{display:"flex",gap:4,flexWrap:"wrap"}}>
          <span className="badge badge-red">CCJ $1.12 stop ⚠️</span>
          <span className="badge badge-red">CRML $0.47 stop ⚠️</span>
          <span className="badge badge-purple">CLARITY TONIGHT 18:30</span>
          <span className="badge badge-amber">UUUU -9.26% check uranium</span>
        </div>
      </div>
    </div>
  );
}
