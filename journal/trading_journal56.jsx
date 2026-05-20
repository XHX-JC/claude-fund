import { useState, useEffect, useCallback } from "react";
const STORAGE_KEY = "fund_journal_v4";
// TIME: UAE=UTC+4. LSE/EU open 11:00 UAE. NYSE open 17:30 UAE. Frankfurt 11:00 UAE.
// E20: IBKR TWS only for live prices. E28: Never widen stop within 1pt of trigger.
// SI-68: No close files until screenshots confirmed. I17: NEW FILE EVERY SESSION — NEVER OVERWRITE.
// T31: Stop below 52W low on 40%+ ATH names. SI-35: Max loss $500/trade.

const INITIAL_STATE = {
  "lastUpdated": "2026-05-13 S42 CLOSE. T47 CCL 250sh @$24.70 (+$0.30 improvement). T48 NCLH 75sh @$15.90 (+$0.10 improvement). T49 MSFT stopped $402.09 (-$24). T50 CCJ stopped $112.17 (-$243). T51 BAH stopped $69.00 (-$249). Net realized S42 -$516. 18 positions. PATH $9.45 stop $9.20 CRITICAL $0.25 buffer. CLARITY tonight 18:30 UAE. Trump-Xi Beijing tomorrow.",
  "sessionNumber": "S42",
  "fund": {
    "account": "U24936508",
    "netLiquidity": 101000,
    "unrealizedPnL": -490,
    "cashUSD": 47000,
    "cashGBP": 641,
    "cashEUR": -465,
    "broker": "IBKR Pro",
    "note": "v56 S42 CLOSE. Wed 13 May 2026. 18 positions. 2 GTCs. Daily -$1,716 (-1.67%). Realized -$516. T49 MSFT -$24, T50 CCJ -$243, T51 BAH -$249. T47 CCL + T48 NCLH peace deal longs entered at improved prices."
  },
  "thesis": {
    "title": "TRUMP-XI BEIJING TOMORROW — HORMUZ ON AGENDA — SI-25 CONDITION 1 UNMET — THESIS INTACT",
    "summary": "WTI ~$102 rising. China hosted Iran FM last week. Trump-Xi May 14-15 with Hormuz explicitly on agenda. CLARITY Act markup tonight 18:30 UAE. Peace deal portfolio ACTIVE: T47 CCL + T48 NCLH.",
    "oilWTI": 102.00,
    "SI25Trigger": 105.87,
    "SI25PeakRef": 117.63,
    "SI25Status": "WTI ~$102. Trump-Xi Hormuz on agenda. Condition 1 UNMET. Thesis INTACT AND STRENGTHENING.",
    "hormuzStatus": "China intermediary signal strongest yet. Trump-Xi May 14-15. CENTCOM strikes ongoing.",
    "keyDates": [
      {"date":"TONIGHT Thu 14 May","event":"CLARITY Act Senate Banking markup 18:30 UAE. CHECK S43. BTC ~$81K vs $85K gate. Clean pass + BTC $85K = MSTR scale.","priority":"CRITICAL"},
      {"date":"Thu-Fri 14-15 May","event":"Trump-Xi Beijing. Iran/Hormuz on agenda. China hosted Iran FM last week. Monitor joint statement.","priority":"CRITICAL"},
      {"date":"Wed 21 May","event":"RYAAY FY earnings. P24 block lifts. Best R/R peace deal after CCL. Prepare $52-55 entry.","priority":"HIGH"},
      {"date":"Thu 22 May","event":"BAH Q4 gate (moot — stopped T51). POET Q1 gate ($500K+ rev required).","priority":"HIGH"},
      {"date":"~Mon 25 May","event":"SNPS T23 lock. DO NOT move stop after lock date.","priority":"HIGH"},
      {"date":"Wed 27 May AMC","event":"SNPS Q2 + CRM Q1. Post-print CRM entry if intact.","priority":"HIGH"},
      {"date":"Thu 28 May","event":"PATH earnings. T23 lock ~May 26. PATH $0.25 buffer — critical watch.","priority":"HIGH"},
      {"date":"End May","event":"CCJ re-entry watch. Bridge fix expected. P11 gate: fix confirmed + $112-115 stabilisation.","priority":"MEDIUM"},
      {"date":"Late Jul 2026","event":"IBM Q2 FINAL GATE. Consulting 5%+ constant currency + guidance raised = hold. If not = managed exit.","priority":"HIGH"},
      {"date":"Wed 30 Jul","event":"RR.L H1 results.","priority":"HIGH"},
      {"date":"Aug 12 2026","event":"IonQ Q2. IONQ dip-buy $38-45. T23 lock ~Aug 10.","priority":"HIGH"}
    ]
  },
  "positions": [
    {"ticker":"CRML","shares":110,"avgPrice":9.08,"last":11.51,"unrealPnL":267,"unrealPct":26.7,"stop":11.20,"status":"HOLD — STOP $11.20 — $0.31 BUFFER — P21","note":"P21 speculative. Kill switch $11.20. Buffer $0.31 S42."},
    {"ticker":"ABVX","shares":50,"avgPrice":109.89,"last":119.32,"unrealPnL":461,"unrealPct":8.4,"stop":109.93,"status":"HOLD — STOP $109.93 — M&A EXCEPTION","note":"Maximum room strategy."},
    {"ticker":"IES","name":"Invinity Energy Systems","shares":3000,"avgPrice":17.49,"last":23.30,"unrealPnL":180,"unrealPct":33.2,"stopType":"MANUAL ALERT 12.5p","cur":"GBP","status":"HOLD — MANUAL ALERT 12.5p — +12.56% S42","note":"LDES decision pending."},
    {"ticker":"CODA","shares":250,"avgPrice":11.105,"last":11.83,"unrealPnL":111,"unrealPct":7.0,"stop":9.95,"status":"HOLD — STOP $9.95 — P14","note":"P14 deliberate."},
    {"ticker":"RR","name":"Rolls-Royce Holdings","shares":100,"avgPrice":1128.6,"last":1197.20,"unrealPnL":69,"unrealPct":6.1,"stop":1149.4,"cur":"GBP","status":"HOLD — STOP 1149.4p — EU ENERGY 1/4","note":"H1 Jul 30 gate. Buffer 47.8p."},
    {"ticker":"MSTR","shares":15,"avgPrice":181.067,"last":178.32,"unrealPnL":-41,"unrealPct":-1.5,"stop":153.14,"status":"HOLD — STOP $153.14 — CHECK CLARITY OUTCOME S43","note":"CLARITY tonight. BTC ~$81K vs $85K. Scale on clean pass + $85K. Kill <$70K."},
    {"ticker":"SNPS","shares":8,"avgPrice":495.125,"last":509.74,"unrealPnL":117,"unrealPct":3.0,"stop":496.76,"status":"HOLD — STOP $496.76 — T23 LOCK ~MAY 25","note":"T23 lock ~May 25. DO NOT move after lock. Earnings May 27 AMC."},
    {"ticker":"CGCT","shares":291,"avgPrice":10.295,"last":10.37,"unrealPnL":22,"unrealPct":0.7,"stop":null,"status":"HOLD — NO STOP — SPAC","note":"Trust floor ~$10.27."},
    {"ticker":"IREN","name":"IREN Ltd","shares":24,"avgPrice":55.042,"last":55.08,"unrealPnL":0,"unrealPct":0.0,"stop":52.00,"status":"HOLD — STOP $52.00 — T42 — SI-37","note":"T42. SI-37. Hold to stop."},
    {"ticker":"LMT","name":"Lockheed Martin","shares":10,"avgPrice":516.831,"last":511.47,"unrealPnL":-53,"unrealPct":-1.0,"stop":479.77,"status":"HOLD — STOP $479.77","note":"Buffer $31.70. Fine."},
    {"ticker":"PATH","name":"UiPath","shares":320,"avgPrice":10.726,"last":9.45,"unrealPnL":-408,"unrealPct":-11.9,"stop":9.20,"status":"HOLD — STOP $9.20 — ⚠️ $0.25 BUFFER — EARNINGS MAY 28","note":"T44. CRITICAL $0.25 buffer. Stabilised $9.45 S42 close. T23 lock ~May 26. DO NOT widen (E28)."},
    {"ticker":"PYPL","name":"PayPal Holdings","shares":55,"avgPrice":45.639,"last":44.72,"unrealPnL":-50,"unrealPct":-2.0,"stop":37.50,"status":"HOLD — STOP $37.50 — T39","note":"T39. Q1 beat EPS $1.34."},
    {"ticker":"UUUU","name":"Energy Fuels Inc","shares":50,"avgPrice":22.011,"last":20.20,"unrealPnL":-92,"unrealPct":-8.3,"stop":16.50,"status":"HOLD — STOP $16.50 — URANIUM","note":"T22 ceiling at max."},
    {"ticker":"IBM","shares":26,"avgPrice":228.739,"last":213.50,"unrealPnL":-396,"unrealPct":-6.7,"stop":210.08,"status":"HOLD — STOP $210.08 — ⚠️ BELOW 52WK LOW — Q2 GATE JULY","note":"New 52wk low. Q2 July FINAL GATE: consulting 5%+ ccy + guidance raised. Buffer $3.42."},
    {"ticker":"ZETA","name":"Zeta Global","shares":191,"avgPrice":16.866,"last":15.74,"unrealPnL":-215,"unrealPct":-6.7,"stop":14.50,"status":"HOLD — STOP $14.50 — T43 — AUG 4","note":"T43. 19 consecutive beats. Buffer $1.24."},
    {"ticker":"AVAV","shares":15,"avgPrice":185.067,"last":158.30,"unrealPnL":-401,"unrealPct":-14.5,"stop":155.00,"status":"HOLD — STOP $155 — ⚠️ AT 52WK LOW — JUN 30 GATE","note":"At 52wk low. T31 structural stop. Buffer $3.30. Jun 30 gate."},
    {"ticker":"CCL","name":"Carnival Corporation","shares":250,"avgPrice":24.70,"last":24.55,"unrealPnL":-37,"unrealPct":-0.6,"stop":23.00,"status":"HOLD — STOP $23.00 — T47 NEW — PEACE DEAL PRIMARY","note":"T47: S42. Filled $24.70 (+$0.30). Zero fuel hedge. Stop $23.00 GTC. R/R 4.75:1. Jun 30 earnings."},
    {"ticker":"NCLH","name":"Norwegian Cruise Line","shares":75,"avgPrice":15.90,"last":15.79,"unrealPnL":-8,"unrealPct":-0.7,"stop":14.50,"status":"HOLD — STOP $14.50 — T48 NEW — PEACE DEAL SECONDARY — SI-37","note":"T48: S42. Filled $15.90 (+$0.10). SI-37. Goldman $14 at stop. Elliott 10%+. R/R 5.6:1."}
  ],
  "pendingGTCs": [
    {"ticker":"LAC","name":"Lithium Americas","action":"BUY","limit":4.80,"stop":4.00,"qty":220,"maxLoss":176,"status":"GTC $4.80 / STOP $4.00 — SI-37","note":"Thacker Pass Phase 1."},
    {"ticker":"TXT","name":"Textron Inc","action":"BUY","limit":88.00,"stop":79.00,"qty":55,"maxLoss":495,"status":"GTC $88 PENDING","note":"Bell MV-75 Valor."}
  ],
  "watchList": [
    {"ticker":"IONQ","name":"IonQ Inc","thesis":"Stage 1 COMPLETE. Trapped-ion quantum. Q1 rev $64.7M +755% YoY. GROWTH THESIS.","entry":"$38-45. Stop $27.","gate":"Q2 Aug 12.","status":"ACTIVE — DIP BUY $38-45"},
    {"ticker":"TUI1","name":"TUI AG","thesis":"H1 published May 13. EBIT €1.1-1.4bn guidance. Peace deal re-rating to €9-12.","entry":"€5.80-6.20. Stop €4.90.","gate":"Above zone ~€6.75. Wait.","status":"ACTIVE — ABOVE ZONE — WAIT"},
    {"ticker":"SIX2","name":"Sixt SE","thesis":"Q1 -45% EPS miss. Entry zone €62-65.","entry":"€62-65. Stop €54.","gate":"Above zone. Wait.","status":"ACTIVE — ABOVE ZONE — WAIT"},
    {"ticker":"RYAAY","name":"Ryanair","thesis":"European LCC. Best R/R peace deal after CCL.","entry":"$52-55. Stop $47.","gate":"P24 until May 21 FY print.","status":"ACTIVE — P24 BLOCK UNTIL MAY 21"},
    {"ticker":"RCL","name":"Royal Caribbean","thesis":"Peace deal cruise. In zone $259. No third cruise while CCL+NCLH active.","entry":"$255-270. Stop $245.","gate":"Concentration limit.","status":"MONITORING — NO THIRD CRUISE"},
    {"ticker":"COHR","name":"Coherent Corp","thesis":"NVIDIA $2B strategic stake (T26). AI optical. PEG 1.9x. At ATH — do not enter.","entry":"$295-310.","gate":"Wait -18-20% pullback.","status":"MONITORING — WAIT PULLBACK $295-310"},
    {"ticker":"KRMN","name":"Karman Holdings","thesis":"Hypersonics/missile defence. $1B+ backlog. Golden Dome. FCF negative. -52.7% ATH. $56 S42.","entry":"$50-58. Stop ~$45.","gate":"Stage 1 first: Q1 call, Golden Dome status, FCF timeline.","status":"MONITORING — STAGE 1 REQUIRED"},
    {"ticker":"ENGIE","name":"Engie SA","thesis":"EU Energy slot 2/4. Belgian nuclear+LNG.","entry":"TBD.","gate":"Stage 1 required.","status":"MONITORING — STAGE 1 REQUIRED"},
    {"ticker":"GTT","name":"Gaztransport Technigaz","thesis":"LNG royalty. 68% EBITDA. Post-dividend dip.","entry":"€170-175. Stop €158.","gate":"Ex-div Jun 17. P13 blocks ~€202.","status":"MONITORING — WATCH €170-175"},
    {"ticker":"MSTR_SCALE","name":"MicroStrategy scale","thesis":"BTC $85K gate + CLARITY clean pass.","entry":"Market on both conditions.","gate":"Check CLARITY outcome S43.","status":"MONITORING — CHECK CLARITY S43"},
    {"ticker":"CRM","name":"Salesforce","thesis":"Down 30% 2026. Fwd P/E 13.8x. Agentforce AI.","entry":"Post May 27.","gate":"May 27 AMC. P24.","status":"MONITORING — MAY 27 AMC"},
    {"ticker":"LULU","name":"Lululemon","thesis":"60% below ATH.","entry":"Post May 28.","gate":"May 28. P24.","status":"MONITORING — MAY 28"},
    {"ticker":"SOFI","name":"SoFi Technologies","thesis":"T27 pattern. 52% below ATH.","entry":"$13-14. Stop $11.50.","gate":"PYPL resolved first.","status":"MONITORING — PYPL GATE"},
    {"ticker":"ANET","name":"Arista Networks","thesis":"#1 AI DC switching. +35% rev.","entry":"$130-138. Stop $125.","gate":"Wait for pullback.","status":"UNIVERSE — $130-138"},
    {"ticker":"POET","name":"POET Technologies","thesis":"Silicon photonics. $430M cash. Marvell governance flag.","entry":"Post May 22 Q1.","gate":"Q1 rev $500K+.","status":"UNIVERSE — MAY 22 GATE"},
    {"ticker":"V","name":"Visa Inc","thesis":"Stopped T32. Thesis intact.","entry":"$305-315. Stop $292-295.","gate":"Q3 Jul 28.","status":"WATCH — RE-ENTRY $305-315"},
    {"ticker":"LITE","name":"Lumentum Holdings","thesis":"AI optics. +1,276% YTD. P/E 265x. DO NOT ENTER.","entry":"DO NOT ENTER.","gate":"Observe only. Re-assess on 30-40% correction.","status":"UNIVERSE — DO NOT ENTER — P/E 265x"},
    {"ticker":"ANDURIL","name":"Anduril Industries","thesis":"PRIVATE. S-1 = same-week Stage 1.","entry":"IPO only.","gate":"S-1 with SEC.","status":"IPO WATCH — PRIVATE"}
  ],
  "shortWatchlist": [
    {"ticker":"PLTR","thesis":"Dormant Q2 July.","status":"DORMANT","trigger":"Q2 guidance cut only"},
    {"ticker":"AAL","thesis":"No fuel hedge $36.5B debt.","trigger":"$13-14 dead-cat.","status":"WATCH"},
    {"ticker":"SNOW","thesis":"18x fwd revenue.","trigger":"Earnings miss.","status":"WATCH"}
  ],
  "euEnergyTransition": {
    "title":"EU/UK ENERGY TRANSITION — SECTION N",
    "concentrationCeiling":"Max 4. CURRENT: RR.L (1/4). 3 slots available.",
    "stage1Queue":["ENGIE.PA Stage 1 required.","GTT.PA €170-175 post-Jun 17 dividend."],
    "gateNote":"3 slots available. ENGIE Stage 1 next. GTT post-dividend dip."
  },
  "criticalMineralsThesis": {
    "title":"CRITICAL MINERALS — T22 AT CEILING",
    "concentrationCeiling":"CRML + LAC GTC + UUUU = MAXIMUM. T22. CCJ stopped T50 but T22 ceiling remains.",
    "candidates":[
      {"ticker":"CRML","status":"HELD +26.7% — $0.31 BUFFER","thesis":"Tanbreez 92.5%. EUR pending.","stop":"$11.20"},
      {"ticker":"UUUU","status":"HELD -8.3%","thesis":"US REE separator. Q1 $35.8M.","classification":"SI-37"},
      {"ticker":"LAC","status":"GTC $4.80 PENDING","thesis":"Thacker Pass. DoE backed.","classification":"SI-37"}
    ]
  },
  "peaceDealPortfolio": {
    "title":"PEACE DEAL PORTFOLIO — ACTIVE S42",
    "status":"LIVE — T47 CCL @$24.70 + T48 NCLH @$15.90",
    "primaryVehicle":{"ticker":"CCL","shares":250,"entry":24.70,"stop":23.00,"target":37,"rr":"4.75:1","thesis":"Zero fuel hedge. $2.5B buyback. 85% capacity booked. Mechanical EPS recovery on oil drop."},
    "secondaryVehicle":{"ticker":"NCLH","shares":75,"entry":15.90,"stop":14.50,"target":25,"rr":"5.6:1","thesis":"SI-37. Elliott 10%+ activist. Goldman $14 at stop. EPS $1.45→$2.38+ on peace."},
    "pendingVehicle":{"ticker":"RYAAY","status":"P24 until May 21. Prepare post-print $52-55."},
    "notEntered":{"ticker":"RCL","reason":"No third cruise while CCL+NCLH active."},
    "watchNotes":"Binary event trade. Designed to sit dormant then gap. Do not exit for small gains."
  },
  "clarityAct": {
    "title":"CLARITY ACT — CHECK OUTCOME S43",
    "what":"Digital Asset Market Clarity Act. BTC = commodity under CFTC. Senate Banking markup was TONIGHT Thu 14 May 18:30 UAE.",
    "houseStatus":"Passed July 2025 (294-134)",
    "senateStatus":"Markup TONIGHT — check result first thing S43",
    "btcCurrent":81000,
    "mstrScaleGate":85000,
    "action":"Clean pass + BTC $85K = MSTR scale. Either fails = no action.",
    "killSwitch":"BTC weekly close <$70K"
  },
  "tradeTracker": {
    "closedTrades": [
      {"id":1,"ticker":"CCL","dateIn":"2026-03-24","dateOut":"2026-03-26","qty":240,"entry":24.83,"exit":25.35,"ccy":"USD","pnlUSD":122,"note":"S07."},
      {"id":2,"ticker":"ONDS","dateIn":"2026-03-24","dateOut":"2026-03-30","qty":250,"entry":10.90,"exit":8.505,"ccy":"USD","pnlUSD":-601,"note":"Stopped."},
      {"id":3,"ticker":"KTOS","dateIn":"2026-03-24","dateOut":"2026-03-30","qty":100,"entry":81.00,"exit":64.977,"ccy":"USD","pnlUSD":-1604,"note":"P12."},
      {"id":4,"ticker":"UEC","dateIn":"2026-03-25","dateOut":"2026-03-31","qty":206,"entry":13.77,"exit":13.16,"ccy":"USD","pnlUSD":-128,"note":"Stopped."},
      {"id":5,"ticker":"IAG","dateIn":"2026-03-27","dateOut":"2026-04-01","qty":2200,"entry":3.55,"exit":3.70,"ccy":"GBP","pnlUSD":407,"note":"Peace thesis broken."},
      {"id":6,"ticker":"RCL","dateIn":"2026-03-24","dateOut":"2026-04-02","qty":36,"entry":273.54,"exit":269.91,"ccy":"USD","pnlUSD":-133,"note":"Stopped."},
      {"id":7,"ticker":"LEU","dateIn":"2026-03-24","dateOut":"2026-04-07","qty":13,"entry":188.79,"exit":170.26,"ccy":"USD","pnlUSD":-243,"note":"P11."},
      {"id":8,"ticker":"LDO","dateIn":"2026-03-27","dateOut":"2026-04-07","qty":17,"entry":58.10,"exit":59.56,"ccy":"EUR","pnlUSD":21,"note":"Partial."},
      {"id":9,"ticker":"UPS","dateIn":"2026-04-08","dateOut":"2026-04-08","qty":50,"entry":100.17,"exit":99.60,"ccy":"USD","pnlUSD":-31,"note":"Same-day."},
      {"id":10,"ticker":"R3NK","dateIn":"2026-03-26","dateOut":"2026-04-08","qty":80,"entry":51.51,"exit":56.01,"ccy":"EUR","pnlUSD":386,"note":"First entry."},
      {"id":11,"ticker":"PLTR","dateIn":"2026-03-24","dateOut":"2026-04-09","qty":49,"entry":161.608,"exit":134.976,"ccy":"USD","pnlUSD":-1307,"note":"P6."},
      {"id":12,"ticker":"SHLD","dateIn":"2026-03-24","dateOut":"2026-04-10","qty":69,"entry":72.01,"exit":73.21,"ccy":"USD","pnlUSD":113,"note":"Tactical."},
      {"id":13,"ticker":"PDYN","dateIn":"2026-03-25","dateOut":"2026-04-14","qty":250,"entry":6.59,"exit":6.67,"ccy":"USD","pnlUSD":17,"note":"Partial."},
      {"id":14,"ticker":"AVAV","dateIn":"2026-03-26","dateOut":"2026-04-15","qty":25,"entry":195.05,"exit":197.945,"ccy":"USD","pnlUSD":70,"note":"Re-entered 15sh."},
      {"id":15,"ticker":"ITM","dateIn":"2026-04-01","dateOut":"2026-04-17","qty":1100,"entry":65.1,"exit":124.60,"ccy":"GBP","pnlUSD":828,"note":"Trim 1."},
      {"id":16,"ticker":"LNG","dateIn":"2026-04-13","dateOut":"2026-04-17","qty":19,"entry":268.813,"exit":248.00,"ccy":"USD","pnlUSD":-397,"note":"Stopped."},
      {"id":17,"ticker":"PATK","dateIn":"2026-04-17","dateOut":"2026-04-17","qty":25,"entry":108.80,"exit":109.256,"ccy":"USD","pnlUSD":9,"note":"P17."},
      {"id":18,"ticker":"ABVX","dateIn":"2026-04-06","dateOut":"2026-04-21","qty":44,"entry":117.913,"exit":114.26,"ccy":"USD","pnlUSD":-159,"note":"Stopped. Re-entry 50sh."},
      {"id":19,"ticker":"RR","dateIn":"2026-03-26","dateOut":"2026-04-22","qty":150,"entry":1182.88,"exit":1150.00,"ccy":"GBP","pnlUSD":-62,"note":"Stopped. Re-entry 100sh."},
      {"id":20,"ticker":"ITM","dateIn":"2026-04-01","dateOut":"2026-04-24","qty":800,"entry":65.1,"exit":141.20,"ccy":"GBP","pnlUSD":770,"note":"Trim 2."},
      {"id":21,"ticker":"LLY","dateIn":"2026-04-16","dateOut":"2026-04-25","qty":3,"entry":905.344,"exit":875.54,"ccy":"USD","pnlUSD":-89,"note":"Stopped."},
      {"id":22,"ticker":"CODA","dateIn":"2026-04-08","dateOut":"2026-04-27","qty":416,"entry":12.005,"exit":11.42,"ccy":"USD","pnlUSD":-243,"note":"Stopped. P11 re-entry."},
      {"id":23,"ticker":"ISRG","dateIn":"2026-03-24","dateOut":"2026-04-27","qty":22,"entry":459.246,"exit":471.676,"ccy":"USD","pnlUSD":272,"note":"Stop triggered."},
      {"id":24,"ticker":"ITM","dateIn":"2026-04-01","dateOut":"2026-04-28","qty":1200,"entry":65.1,"exit":130.39,"ccy":"GBP","pnlUSD":1041,"note":"AIM wick. ITM total +$2,639."},
      {"id":25,"ticker":"ABBV","dateIn":"2026-04-22","dateOut":"2026-04-29","qty":20,"entry":205.22,"exit":191.1608,"ccy":"USD","pnlUSD":-282,"note":"Stop BMO."},
      {"id":26,"ticker":"PDYN","dateIn":"2026-03-25","dateOut":"2026-04-29","qty":250,"entry":6.595,"exit":5.815,"ccy":"USD","pnlUSD":-196,"note":"Manual exit."},
      {"id":27,"ticker":"CCJ","dateIn":"2026-03-24","dateOut":"2026-04-28","qty":49,"entry":104.021,"exit":119.97,"ccy":"USD","pnlUSD":782,"note":"T23 deliberate. Re-entry 50sh @$117.02."},
      {"id":28,"ticker":"VST","dateIn":"2026-04-08","dateOut":"2026-04-29","qty":53,"entry":150.569,"exit":156.53,"ccy":"USD","pnlUSD":316,"note":"GTC stop."},
      {"id":29,"ticker":"PDYN","dateIn":"2026-04-29","dateOut":"2026-04-30","qty":250,"entry":5.7507,"exit":5.85,"ccy":"USD","pnlUSD":-25,"note":"E9 covered."},
      {"id":30,"ticker":"MSFT","dateIn":"2026-04-14","dateOut":"2026-04-30","qty":25,"entry":372.77,"exit":410.38,"ccy":"USD","pnlUSD":940,"note":"Stop. Re-entered @$403.052."},
      {"id":31,"ticker":"NOG","dateIn":"2026-03-26","dateOut":"2026-05-01","qty":80,"entry":24.383,"exit":26.50,"ccy":"USD","pnlUSD":169,"note":"Stop."},
      {"id":32,"ticker":"V","dateIn":"2026-03-24","dateOut":"2026-05-05","qty":8,"entry":307.125,"exit":321.823,"ccy":"USD","pnlUSD":118,"note":"T28. Re-entry $305-315."},
      {"id":33,"ticker":"NOG","dateIn":"2026-05-04","dateOut":"2026-05-07","qty":200,"entry":26.771,"exit":25.11,"ccy":"USD","pnlUSD":-332,"note":"Iran noise."},
      {"id":34,"ticker":"R3NK","dateIn":"2026-04-08","dateOut":"2026-05-07","qty":25,"entry":52.27,"exit":53.44,"ccy":"EUR","pnlUSD":32,"note":"T30."},
      {"id":35,"ticker":"R3NK","dateIn":"2026-05-07","dateOut":"2026-05-11","qty":25,"entry":52.00,"exit":47.01,"ccy":"EUR","pnlUSD":-136,"note":"T35. T31 codified."},
      {"id":36,"ticker":"AMPX","dateIn":"2026-05-05","dateOut":"2026-05-07","qty":168,"entry":18.106,"exit":17.94,"ccy":"USD","pnlUSD":-28,"note":"Gap stop."},
      {"id":37,"ticker":"MRVL","dateIn":"2026-03-24","dateOut":"2026-05-07","qty":10,"entry":152.10,"exit":160.02,"ccy":"USD","pnlUSD":79,"note":"Stop."},
      {"id":38,"ticker":"CEG","dateIn":"2026-05-04","dateOut":"2026-05-07","qty":14,"entry":308.072,"exit":314.77,"ccy":"USD","pnlUSD":94,"note":"Stop raised."},
      {"id":39,"ticker":"PYPL","dateIn":"2026-05-08","dateOut":null,"qty":55,"entry":45.639,"exit":null,"ccy":"USD","pnlUSD":null,"note":"T39. Q1 beat. Stop $37.50. OPEN."},
      {"id":41,"ticker":"R3NK","dateIn":"2026-05-11","dateOut":"2026-05-12","qty":200,"entry":46.485,"exit":43.9925,"ccy":"EUR","pnlUSD":-543,"note":"T41. Net R3NK all trades: -$261. CLOSED."},
      {"id":42,"ticker":"IREN","dateIn":"2026-05-11","dateOut":null,"qty":24,"entry":55.042,"exit":null,"ccy":"USD","pnlUSD":null,"note":"T42. NVIDIA deal. SI-37. Stop $52. OPEN."},
      {"id":43,"ticker":"ZETA","dateIn":"2026-05-11","dateOut":null,"qty":191,"entry":16.866,"exit":null,"ccy":"USD","pnlUSD":null,"note":"T43. 19 beats. Stop $14.50. Aug 4. OPEN."},
      {"id":44,"ticker":"PATH","dateIn":"2026-05-11","dateOut":null,"qty":320,"entry":10.726,"exit":null,"ccy":"USD","pnlUSD":null,"note":"T44. Stop $9.20. $0.25 buffer S42. May 28 earnings. OPEN."},
      {"id":45,"ticker":"LDO","dateIn":"2026-03-27","dateOut":"2026-05-12","qty":35,"entry":56.086,"exit":50.00,"ccy":"EUR","pnlUSD":-232,"note":"T45. Stop €50. P28 codified. CLOSED."},
      {"id":46,"ticker":"AMZN","dateIn":"2026-03-24","dateOut":"2026-05-12","qty":30,"entry":201.204,"exit":263.943,"ccy":"USD","pnlUSD":1882,"note":"T46. +31.2%. CLOSED."},
      {"id":47,"ticker":"CCL","dateIn":"2026-05-13","dateOut":null,"qty":250,"entry":24.70,"exit":null,"ccy":"USD","pnlUSD":null,"note":"T47: S42 PEACE DEAL PRIMARY. Limit $25.00 filled $24.70 (+$0.30). Stop $23.00 GTC. Zero fuel hedge. R/R 4.75:1. OPEN."},
      {"id":48,"ticker":"NCLH","dateIn":"2026-05-13","dateOut":null,"qty":75,"entry":15.90,"exit":null,"ccy":"USD","pnlUSD":null,"note":"T48: S42 PEACE DEAL SECONDARY. Limit $16.00 filled $15.90 (+$0.10). Stop $14.50 GTC. SI-37. Goldman $14 at stop. R/R 5.6:1. OPEN."},
      {"id":49,"ticker":"MSFT","dateIn":"2026-04-30","dateOut":"2026-05-13","qty":25,"entry":403.052,"exit":402.09,"ccy":"USD","pnlUSD":-24,"note":"T49: S42 stop $403.89 triggered $402.09 ($1.80 slippage). TCI unresolved. IBM Q2 July final gate. CLOSED."},
      {"id":50,"ticker":"CCJ","dateIn":"2026-04-29","dateOut":"2026-05-13","qty":50,"entry":117.02,"exit":112.17,"ccy":"USD","pnlUSD":-243,"note":"T50: S42 stop $112.14 triggered $112.17 (+$0.03). Saskatchewan bridge = operational disruption NOT thesis break (T28). Re-entry P11: bridge fix + $112-115 stabilisation. CLOSED."},
      {"id":51,"ticker":"BAH","dateIn":"2026-04-08","dateOut":"2026-05-13","qty":33,"entry":76.531,"exit":69.00,"ccy":"USD","pnlUSD":-249,"note":"T51: S42 stop $69.00 triggered. Half-size — civil revenue risk unresolved. May 22 gate not reached. No re-entry without specific catalyst. CLOSED."}
    ],
    "lastUpdated":"2026-05-13 S42 CLOSE. 45 closed + 6 open = 51 rows. Open: T39 PYPL, T42 IREN, T43 ZETA, T44 PATH, T47 CCL, T48 NCLH. Net realized S42 -$516."
  },
  "sessionNotes": [
    {"date":"2026-05-07","note":"S37: LMT stop raised. NOG sold. R3NK T34/T35. AMPX/MRVL/CEG closed."},
    {"date":"2026-05-08","note":"S38: Stops raised SNPS/MSFT. T39 PYPL 55sh @$45.64. UUUU Q1 beat."},
    {"date":"2026-05-09","note":"S39: Framework overhauled. SI-69-76 added. ZETA/PATH Stage 2 actionable."},
    {"date":"2026-05-11","note":"S40: T35 R3NK stopped. T41 rebuy 200sh. T42 IREN. T43 ZETA. T44 PATH. AMZN stop $263.93."},
    {"date":"2026-05-12","note":"S41: T45 LDO -$232. T41 R3NK -$543. T46 AMZN +$1,882. Net +$1,107. CCJ $1.12 buffer. P28 codified. Net liq $102.3K."},
    {"date":"2026-05-13","note":"S42: IBM Q2 gate. KRMN MONITORING $50-58. POET May 22 gate. LITE no entry P/E 265x. COHR MONITORING $295-310 NVIDIA T26. SI-62 8-K amendment. T47 CCL @$24.70. T48 NCLH @$15.90. T49 MSFT -$24. T50 CCJ -$243. T51 BAH -$249. Net realized -$516. PATH $9.45 stop $9.20 CRITICAL. CLARITY tonight. Trump-Xi tomorrow. 18 positions."}
  ]
};

const COLORS = {
  bg:"#0d1117",card:"#161b22",border:"#30363d",accent:"#58a6ff",
  green:"#3fb950",red:"#f85149",yellow:"#d29922",blue:"#388bfd",
  text:"#c9d1d9",textDim:"#8b949e",textBright:"#f0f6fc",purple:"#a371f7",orange:"#f0883e"
};

export default function TradingJournal() {
  const [data,setData]=useState(()=>{try{const s=localStorage.getItem(STORAGE_KEY);return s?JSON.parse(s):INITIAL_STATE;}catch{return INITIAL_STATE;}});
  const [activeTab,setActiveTab]=useState("positions");
  const [newNote,setNewNote]=useState("");
  useEffect(()=>{try{localStorage.setItem(STORAGE_KEY,JSON.stringify(data));}catch{}},[data]);
  const update=useCallback((d)=>setData(d),[]);
  const addNote=()=>{if(!newNote.trim())return;update({...data,sessionNotes:[...(data.sessionNotes||[]),{date:new Date().toISOString().slice(0,10),note:newNote}]});setNewNote("");};
  const tabs=["positions","gtcs","watch","peace","clarity","thesis","tracker","notes"];
  const pnlColor=(v)=>v>0?COLORS.green:v<0?COLORS.red:COLORS.textDim;
  const sc=(s)=>s?.includes("ACTIVE")?COLORS.green:s?.includes("MONITORING")?COLORS.accent:s?.includes("DO NOT")?COLORS.red:COLORS.yellow;
  const ub=(p)=>{if(p.status?.includes("⚠️"))return"3px solid "+COLORS.red;if(p.unrealPnL>300)return"3px solid "+COLORS.green;if(p.unrealPnL<-200)return"3px solid "+COLORS.red;if(p.status?.includes("NEW"))return"3px solid "+COLORS.blue;return undefined;};
  return(
    <div style={{background:COLORS.bg,minHeight:"100vh",color:COLORS.text,fontFamily:"monospace",padding:16,maxWidth:1200,margin:"0 auto"}}>
      <style>{`
        .card{background:${COLORS.card};border:1px solid ${COLORS.border};border-radius:6px;padding:12px}
        .badge{font-size:10px;padding:2px 6px;border-radius:4px;font-weight:600;display:inline-block}
        .badge-green{background:rgba(63,185,80,.15);color:${COLORS.green};border:1px solid rgba(63,185,80,.3)}
        .badge-red{background:rgba(248,81,73,.15);color:${COLORS.red};border:1px solid rgba(248,81,73,.3)}
        .badge-amber{background:rgba(210,153,34,.15);color:${COLORS.yellow};border:1px solid rgba(210,153,34,.3)}
        .badge-blue{background:rgba(56,139,253,.15);color:${COLORS.blue};border:1px solid rgba(56,139,253,.3)}
        .badge-purple{background:rgba(163,113,247,.15);color:${COLORS.purple};border:1px solid rgba(163,113,247,.3)}
        .badge-grey{background:rgba(139,148,158,.15);color:${COLORS.textDim};border:1px solid rgba(139,148,158,.3)}
        .btn{background:${COLORS.card};border:1px solid ${COLORS.border};color:${COLORS.text};padding:6px 12px;border-radius:4px;cursor:pointer;font-family:monospace;font-size:12px}
        .btn:hover{background:#21262d}
        .btn-primary{background:rgba(88,166,255,.15);border-color:rgba(88,166,255,.4);color:${COLORS.accent}}
        input{background:${COLORS.card};border:1px solid ${COLORS.border};color:${COLORS.text};padding:8px;border-radius:4px;font-family:monospace;font-size:12px;flex:1}
      `}</style>
      <div style={{marginBottom:16}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:8}}>
          <div>
            <div style={{fontSize:18,fontWeight:700,color:COLORS.textBright}}>CLAUDE FUND — JOURNAL v56 S42</div>
            <div style={{fontSize:11,color:COLORS.textDim,marginTop:2}}>Wed 13 May 2026 | {data.fund.account} | 18 positions | 2 GTCs</div>
          </div>
          <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
            {[{l:"NET LIQ",v:"~$101.0K"},{l:"CASH USD",v:"~$47K",c:COLORS.yellow},{l:"REALIZED",v:"-$516",c:COLORS.red},{l:"POSITIONS",v:"18"}].map(m=>(
              <div key={m.l} className="card" style={{textAlign:"center",minWidth:76}}>
                <div style={{fontSize:9,color:COLORS.textDim}}>{m.l}</div>
                <div style={{fontSize:14,fontWeight:700,color:m.c||COLORS.textBright,marginTop:2}}>{m.v}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{marginTop:6,padding:"6px 10px",background:"rgba(248,81,73,.1)",border:"1px solid rgba(248,81,73,.3)",borderRadius:4,fontSize:11,color:COLORS.red,fontWeight:700}}>
          ⚠️ PATH $9.45 stop $9.20 ($0.25 buffer) | IBM below 52wk low | AVAV at 52wk low | T51 BAH -$249 | T50 CCJ -$243
        </div>
        <div style={{marginTop:4,padding:"6px 10px",background:"rgba(88,166,255,.15)",border:"1px solid rgba(88,166,255,.4)",borderRadius:4,fontSize:11,color:COLORS.accent}}>
          S43: CHECK CLARITY outcome | Trump-Xi Beijing Hormuz | T47 CCL + T48 NCLH active
        </div>
      </div>
      <div style={{display:"flex",gap:4,marginBottom:12,flexWrap:"wrap"}}>
        {tabs.map(t=>(<button key={t} className={`btn${activeTab===t?" btn-primary":""}`} onClick={()=>setActiveTab(t)} style={{textTransform:"uppercase",fontSize:11}}>{t}</button>))}
      </div>
      {activeTab==="positions"&&(
        <div style={{display:"flex",flexDirection:"column",gap:6}}>
          {data.positions?.map(p=>(
            <div key={p.ticker} className="card" style={{borderLeft:ub(p)}}>
              <div style={{display:"flex",gap:10,alignItems:"center",flexWrap:"wrap",marginBottom:3}}>
                <span style={{fontWeight:700,fontSize:13,color:COLORS.textBright}}>{p.ticker}</span>
                {p.cur&&<span className="badge badge-grey">{p.cur}</span>}
                {p.unrealPnL!==undefined&&<span className={`badge badge-${p.unrealPnL>50?"green":p.unrealPnL<-50?"red":"amber"}`}>{p.unrealPnL>=0?"+":""}{p.unrealPct?.toFixed(1)}%</span>}
                <span style={{fontSize:9,color:COLORS.textDim,marginLeft:"auto"}}>Stop: <b style={{color:COLORS.yellow}}>{p.stop||p.stopType||"--"}</b></span>
              </div>
              <div style={{fontSize:10,color:COLORS.accent,marginBottom:2}}>{p.status}</div>
              <div style={{fontSize:9,color:COLORS.textDim}}>{p.note}</div>
            </div>
          ))}
        </div>
      )}
      {activeTab==="gtcs"&&(
        <div style={{display:"flex",flexDirection:"column",gap:6}}>
          {data.pendingGTCs?.map(g=>(
            <div key={g.ticker} className="card" style={{borderLeft:"3px solid "+COLORS.blue}}>
              <div style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap",marginBottom:3}}>
                <span style={{fontWeight:700,fontSize:13,color:COLORS.textBright}}>{g.ticker}</span>
                <span className="badge badge-blue">BUY GTC</span>
                <span style={{fontSize:11,color:COLORS.accent}}>Limit: {g.limit} / Stop: {g.stop}</span>
                <span className={`badge badge-${g.maxLoss<=200?"green":g.maxLoss<=400?"amber":"red"}`}>Max ${g.maxLoss}</span>
              </div>
              <div style={{fontSize:9,color:COLORS.textDim}}>{g.note}</div>
            </div>
          ))}
        </div>
      )}
      {activeTab==="watch"&&(
        <div>
          <div style={{fontSize:11,color:COLORS.textDim,marginBottom:8}}>{data.watchList?.length} entries</div>
          <div style={{display:"flex",flexDirection:"column",gap:6}}>
            {data.watchList?.map((w,i)=>(
              <div key={i} className="card" style={{borderLeft:"3px solid "+sc(w.status)}}>
                <div style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap",marginBottom:3}}>
                  <span style={{fontWeight:700,fontSize:13,color:COLORS.textBright}}>{w.ticker}</span>
                  {w.name&&<span style={{fontSize:10,color:COLORS.textDim}}>{w.name}</span>}
                </div>
                <div style={{fontSize:10,color:sc(w.status),marginBottom:2,fontWeight:600}}>{w.status}</div>
                <div style={{fontSize:9,fontStyle:"italic",color:COLORS.textBright,marginBottom:3}}>{w.thesis?.substring(0,120)}{w.thesis?.length>120?"...":""}</div>
                {w.gate&&<div style={{fontSize:9,color:COLORS.yellow}}>Gate: {w.gate}</div>}
              </div>
            ))}
          </div>
        </div>
      )}
      {activeTab==="peace"&&(
        <div className="card" style={{borderLeft:"4px solid "+COLORS.blue}}>
          <div style={{fontWeight:700,color:COLORS.blue,fontSize:13,marginBottom:6}}>{data.peaceDealPortfolio?.title}</div>
          <div style={{fontSize:11,color:COLORS.green,fontWeight:600,marginBottom:8}}>{data.peaceDealPortfolio?.status}</div>
          {[data.peaceDealPortfolio?.primaryVehicle,data.peaceDealPortfolio?.secondaryVehicle].map((v,i)=>v&&(
            <div key={i} className="card" style={{marginBottom:6,borderLeft:"3px solid "+(i===0?COLORS.green:COLORS.yellow)}}>
              <div style={{display:"flex",gap:8,marginBottom:3,flexWrap:"wrap"}}>
                <span style={{fontWeight:700,color:COLORS.textBright}}>{v.ticker}</span>
                <span className={`badge badge-${i===0?"green":"amber"}`}>{i===0?"PRIMARY":"SECONDARY"}</span>
                <span style={{fontSize:10,color:COLORS.textDim}}>{v.shares}sh @${v.entry} | Stop ${v.stop} | R/R {v.rr}</span>
              </div>
              <div style={{fontSize:9,color:COLORS.textDim}}>{v.thesis}</div>
            </div>
          ))}
          <div style={{marginTop:8,padding:"6px 10px",background:"rgba(210,153,34,.1)",borderRadius:4,fontSize:11,color:COLORS.yellow}}>{data.peaceDealPortfolio?.watchNotes}</div>
        </div>
      )}
      {activeTab==="clarity"&&(
        <div className="card" style={{borderLeft:"4px solid "+COLORS.purple}}>
          <div style={{fontWeight:700,color:COLORS.purple,fontSize:13,marginBottom:6}}>{data.clarityAct?.title}</div>
          <div style={{fontSize:11,marginBottom:8}}>{data.clarityAct?.what}</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:8}}>
            <div className="card"><div style={{fontSize:9,color:COLORS.textDim}}>Senate markup</div><div style={{fontSize:13,fontWeight:700,color:COLORS.red}}>CHECK S43</div></div>
            <div className="card"><div style={{fontSize:9,color:COLORS.textDim}}>BTC / Gate</div><div style={{fontSize:13,fontWeight:700,color:COLORS.yellow}}>~$81K / $85K</div></div>
          </div>
          <div style={{padding:"8px",background:"rgba(163,113,247,.1)",borderRadius:4,fontSize:11,color:COLORS.purple,fontWeight:600}}>{data.clarityAct?.action}</div>
        </div>
      )}
      {activeTab==="thesis"&&(
        <div>
          <div className="card" style={{marginBottom:8,borderLeft:"4px solid "+COLORS.orange}}>
            <div style={{fontWeight:700,color:COLORS.orange,fontSize:13,marginBottom:4}}>{data.thesis.title}</div>
            <div style={{fontSize:11,lineHeight:1.8,marginBottom:6}}>{data.thesis.summary}</div>
            <div style={{padding:"6px 10px",background:"rgba(210,153,34,.1)",borderRadius:4,fontSize:11,color:COLORS.yellow}}>{data.thesis.SI25Status}</div>
          </div>
          {data.thesis.keyDates?.map((d,i)=>(
            <div key={i} className="card" style={{marginBottom:4,borderLeft:"3px solid "+(d.priority==="CRITICAL"?COLORS.red:d.priority==="HIGH"?COLORS.yellow:COLORS.textDim)}}>
              <div style={{display:"flex",gap:8,alignItems:"flex-start"}}>
                <span style={{fontSize:10,fontWeight:600,minWidth:160,color:COLORS.textBright}}>{d.date}</span>
                <span style={{fontSize:10,color:COLORS.textDim,flex:1}}>{d.event}</span>
                <span className={`badge badge-${d.priority==="CRITICAL"?"red":d.priority==="HIGH"?"amber":"grey"}`}>{d.priority}</span>
              </div>
            </div>
          ))}
        </div>
      )}
      {activeTab==="tracker"&&(
        <div>
          <div style={{fontSize:12,fontWeight:600,color:COLORS.accent,marginBottom:6}}>
            TRADE TRACKER — 45 CLOSED + 6 OPEN | 51 ROWS | T39 PYPL · T42 IREN · T43 ZETA · T44 PATH · T47 CCL · T48 NCLH
          </div>
          {data.tradeTracker?.closedTrades?.slice().reverse().map(t=>(
            <div key={t.id} className="card" style={{marginBottom:3,borderLeft:"3px solid "+(t.pnlUSD===null?COLORS.blue:t.pnlUSD>0?COLORS.green:COLORS.red)}}>
              <div style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap"}}>
                <span style={{fontSize:9,color:COLORS.textDim}}>#{t.id}</span>
                <span style={{fontWeight:600,fontSize:12}}>{t.ticker}</span>
                <span style={{fontSize:9,color:COLORS.textDim}}>{t.dateOut||"OPEN"}</span>
                {t.pnlUSD!==null?<span style={{fontWeight:700,color:pnlColor(t.pnlUSD)}}>{t.pnlUSD>0?"+$":"-$"}{Math.abs(t.pnlUSD)}</span>:<span className="badge badge-blue">OPEN</span>}
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
            <input value={newNote} onChange={e=>setNewNote(e.target.value)} placeholder="Add session note..." onKeyDown={e=>e.key==="Enter"&&addNote()}/>
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
      <div style={{marginTop:16,paddingTop:10,borderTop:"1px solid "+COLORS.border,display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:6,alignItems:"center"}}>
        <span style={{fontSize:10,color:COLORS.textDim}}>v56 S42 | Wed 13 May 2026 | 18 pos | Realized -$516 | T47 CCL + T48 NCLH</span>
        <div style={{display:"flex",gap:4,flexWrap:"wrap"}}>
          <span className="badge badge-red">PATH $0.25 stop ⚠️</span>
          <span className="badge badge-red">IBM 52wk low ⚠️</span>
          <span className="badge badge-purple">CHECK CLARITY S43</span>
          <span className="badge badge-blue">Trump-Xi tomorrow</span>
          <span className="badge badge-amber">T51 BAH -$249 | T50 CCJ -$243</span>
        </div>
      </div>
    </div>
  );
}
