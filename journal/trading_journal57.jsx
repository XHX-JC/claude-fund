import { useState, useEffect, useCallback } from "react";
const STORAGE_KEY = "fund_journal_v4";
// TIME: UAE=UTC+4. LSE 11:00 UAE. NYSE 17:30 UAE.
// E20: IBKR TWS only for live prices. E28: Never widen stop within 1pt of trigger.
// SI-68: No close files until screenshots confirmed. I17: NEW FILE EVERY SESSION — NEVER OVERWRITE.
// T31: Stop below 52W low on 40%+ ATH names. SI-35: Max loss $500/trade. T10: Thesis not sizing input.

const INITIAL_STATE = {
  "lastUpdated": "2026-05-14 S43 CLOSE. T52 LEU 15sh @~$191.90 market fill. Stop $159 GTC (raised from $155 to comply SI-35 at 15sh: 15x$32.90=$493). No closed trades. ABVX GTC orphan $114.90 CRITICAL cancel S44. CLARITY markup tonight — check S44. CGCT hold confirmed, vote May 27. 19 positions.",
  "sessionNumber": "S43",
  "fund": {
    "account": "U24936508",
    "netLiquidity": 100800,
    "unrealizedPnL": -600,
    "cashUSD": 44100,
    "cashGBP": 641,
    "cashEUR": -465,
    "broker": "IBKR Pro",
    "note": "v57 S43 CLOSE. Thu 14 May 2026. 19 positions. T52 LEU entered. ABVX GTC orphan to cancel. CLARITY result pending. Trump-Xi summit ongoing."
  },
  "thesis": {
    "title": "TRUMP-XI BEIJING SUMMIT ONGOING — HORMUZ ON AGENDA — SI-25 CONDITION 1 UNMET — THESIS INTACT",
    "summary": "WTI ~$102. Trump-Xi summit May 14-15 with Hormuz explicitly on agenda. CLARITY Act markup tonight 18:30 UAE — check result S44. T52 LEU entered. T47 CCL +4.8%, T48 NCLH +5.3% working. CGCT hold through merger confirmed, vote May 27.",
    "oilWTI": 102.00,
    "SI25Trigger": 105.87,
    "SI25Status": "WTI ~$102. Trump-Xi Hormuz on agenda. Condition 1 UNMET. Thesis INTACT.",
    "hormuzStatus": "China as intermediary — strongest signal yet. Monitor joint statement for Hormuz language.",
    "keyDates": [
      {"date":"S44 MORNING","event":"CHECK: (1) CLARITY Act markup outcome — clean pass + BTC $85K = MSTR scale. (2) Trump-Xi joint statement — any Hormuz language. (3) CANCEL ABVX GTC $114.90 — E9 orphan URGENT.","priority":"CRITICAL"},
      {"date":"Thu 21 May","event":"RYAAY FY earnings. P24 block lifts post-print. Best peace deal R/R after CCL. Prepare $52-55 entry post-print.","priority":"HIGH"},
      {"date":"Tue 27 May 10am ET","event":"CGCT extraordinary shareholder vote. 10am ET = 2pm UAE. Hold through merger confirmed. Post-merger ticker FAC. Confirm no redemption submitted with IBKR before this date.","priority":"CRITICAL"},
      {"date":"~Mon 25 May","event":"SNPS T23 lock (~48-72h before May 27 AMC). DO NOT move stop after lock date. Stop $496.76 confirmed.","priority":"HIGH"},
      {"date":"Wed 27 May AMC","event":"SNPS Q2 FY2026 + CRM Q1 FY2027. Post-print CRM entry if intact ($165-180, stop ~$155).","priority":"HIGH"},
      {"date":"~Mon 26 May","event":"PATH T23 lock (~48-72h before May 28). PATH $0.25 buffer CRITICAL. Do NOT widen (E28).","priority":"HIGH"},
      {"date":"Thu 28 May","event":"PATH Q1 FY2027 earnings. T23 lock ~May 26.","priority":"HIGH"},
      {"date":"Jul 4 2026","event":"OKLO Groves test reactor criticality target. Immediate Stage 1 on confirmation. SI-37 entry on post-announcement dip ~$12-13. $1B ATM overhang means any spike gets sold — enter the dip.","priority":"HIGH"},
      {"date":"End May","event":"CCJ bridge repair expected. P11 gate: fix confirmed + $112-115 stabilisation. T22 ceiling blocks re-entry regardless of price.","priority":"LOW"},
      {"date":"H2 2026","event":"LEU: $900M DOE HALEU task order definitization (final negotiation ongoing). High-conviction catalyst.","priority":"HIGH"},
      {"date":"Aug 2026","event":"LEU Q2 results. OKLO Q2 Aug 18.","priority":"MEDIUM"},
      {"date":"Late Jul 2026","event":"IBM Q2 FINAL GATE. Consulting 5%+ constant currency + guidance raised = hold. If not = managed exit.","priority":"HIGH"},
      {"date":"Wed 30 Jul","event":"RR.L H1 results. Review stop 1149.4p.","priority":"HIGH"},
      {"date":"Aug 12 2026","event":"IonQ Q2. IONQ dip-buy $38-45 watchlist. T23 lock ~Aug 10.","priority":"HIGH"},
      {"date":"Jan 1 2028","event":"Russian TENEX uranium ban fully effective. LEU structural demand surge. 25% of US enriched uranium supply gap created.","priority":"HIGH"}
    ]
  },
  "positions": [
    {"ticker":"CRML","shares":110,"avgPrice":9.08,"last":11.51,"unrealPnL":267,"unrealPct":26.7,"stop":11.20,"status":"HOLD — STOP $11.20 — WARNING $0.31 BUFFER — P21","note":"P21 speculative. $450M needed/$80M held. Kill switch $11.20."},
    {"ticker":"ABVX","shares":50,"avgPrice":109.89,"last":119.32,"unrealPnL":461,"unrealPct":8.4,"stop":109.93,"status":"HOLD — STOP $109.93 — WARNING CANCEL GTC ORPHAN $114.90 S44","note":"M&A exception. ABVX GTC stop $114.90 is E9 orphan from S42 close — cancel immediately S44 before market open."},
    {"ticker":"IES","name":"Invinity Energy Systems","shares":3000,"avgPrice":17.49,"last":23.30,"unrealPnL":180,"unrealPct":33.2,"stopType":"MANUAL ALERT 12.5p","cur":"GBP","status":"HOLD — MANUAL ALERT 12.5p","note":"LDES decision pending."},
    {"ticker":"CODA","shares":250,"avgPrice":11.105,"last":11.83,"unrealPnL":111,"unrealPct":7.0,"stop":9.95,"status":"HOLD — STOP $9.95 — P14 DELIBERATE","note":"P14 deliberate. More time given."},
    {"ticker":"RR","name":"Rolls-Royce Holdings","shares":100,"avgPrice":1128.6,"last":1197.20,"unrealPnL":69,"unrealPct":6.1,"stop":1149.4,"cur":"GBP","status":"HOLD — STOP 1149.4p — EU ENERGY 1/4","note":"H1 Jul 30 gate. Buffer 47.8p."},
    {"ticker":"MSTR","shares":15,"avgPrice":181.067,"last":177.89,"unrealPnL":-47,"unrealPct":-1.7,"stop":153.14,"status":"HOLD — STOP $153.14 — CHECK CLARITY OUTCOME S44","note":"CLARITY markup tonight. BTC ~$81K vs $85K gate. Scale on clean pass + $85K. Kill: BTC less than $70K weekly."},
    {"ticker":"SNPS","shares":8,"avgPrice":495.125,"last":509.74,"unrealPnL":117,"unrealPct":3.0,"stop":496.76,"status":"HOLD — STOP $496.76 — T23 LOCK ~MAY 25","note":"T23 lock ~May 25. DO NOT move stop after lock. Earnings May 27 AMC."},
    {"ticker":"CGCT","shares":291,"avgPrice":10.295,"last":10.38,"unrealPnL":25,"unrealPct":0.7,"stop":null,"status":"HOLD — NO STOP — HOLD THROUGH MERGER — VOTE MAY 27","note":"HOLD through merger CONFIRMED. Shareholder vote May 27 10am ET (2pm UAE). Post-merger ticker FAC on Nasdaq. Expected close June 2026. Stellantis + Mercedes validation = T26 signal. Redemption defeats SPAC thesis. DO NOT submit redemption."},
    {"ticker":"IREN","name":"IREN Ltd","shares":24,"avgPrice":55.042,"last":55.08,"unrealPnL":0,"unrealPct":0.0,"stop":52.00,"status":"HOLD — STOP $52.00 — T42 — SI-37","note":"T42. NVIDIA $3.4B deal. SI-37. Hold to stop."},
    {"ticker":"LMT","name":"Lockheed Martin","shares":10,"avgPrice":516.831,"last":511.47,"unrealPnL":-53,"unrealPct":-1.0,"stop":479.77,"status":"HOLD — STOP $479.77","note":"Buffer $31.70."},
    {"ticker":"PATH","name":"UiPath","shares":320,"avgPrice":10.726,"last":9.45,"unrealPnL":-408,"unrealPct":-11.9,"stop":9.20,"status":"HOLD — STOP $9.20 — WARNING $0.25 BUFFER — EARNINGS MAY 28","note":"T44. CRITICAL $0.25 buffer. T23 lock ~May 26. DO NOT widen (E28). Earnings May 28."},
    {"ticker":"PYPL","name":"PayPal Holdings","shares":55,"avgPrice":45.639,"last":44.72,"unrealPnL":-50,"unrealPct":-2.0,"stop":37.50,"status":"HOLD — STOP $37.50 — T39","note":"T39: Q1 beat EPS $1.34. TPV +11%."},
    {"ticker":"UUUU","name":"Energy Fuels Inc","shares":50,"avgPrice":22.011,"last":19.51,"unrealPnL":-125,"unrealPct":-8.3,"stop":16.50,"status":"HOLD — STOP $16.50 — URANIUM SECTOR WEAK","note":"Uranium sector -2-5% today. T22 ceiling. Stop $16.50 comfortable."},
    {"ticker":"IBM","shares":26,"avgPrice":228.739,"last":216.63,"unrealPnL":-315,"unrealPct":-5.3,"stop":210.08,"status":"HOLD — STOP $210.08 — WARNING BELOW 52WK LOW — Q2 GATE JULY","note":"Below 52wk low. Q2 July FINAL GATE: consulting 5%+ constant ccy + guidance raised. Buffer $6.55."},
    {"ticker":"ZETA","name":"Zeta Global","shares":191,"avgPrice":16.866,"last":15.74,"unrealPnL":-215,"unrealPct":-6.7,"stop":14.50,"status":"HOLD — STOP $14.50 — T43 — AUG 4 EARNINGS","note":"T43. 19 consecutive beats. Buffer $1.24."},
    {"ticker":"AVAV","shares":15,"avgPrice":185.067,"last":164.50,"unrealPnL":-307,"unrealPct":-11.5,"stop":155.00,"status":"HOLD — STOP $155 — T31 — JUN 30 GATE","note":"Recovered from 52wk low. Buffer $9.50. Jun 30 Q4 gate. T31 structural reference."},
    {"ticker":"CCL","name":"Carnival Corporation","shares":250,"avgPrice":24.70,"last":25.88,"unrealPnL":295,"unrealPct":4.8,"stop":23.00,"status":"HOLD — STOP $23.00 — T47 — PEACE DEAL PRIMARY OK","note":"T47 working +4.8%. $25.3B net debt declining from $30.7B peak. Fuel thesis intact. Earnings Jun 30."},
    {"ticker":"NCLH","name":"Norwegian Cruise Line","shares":75,"avgPrice":15.90,"last":16.74,"unrealPnL":63,"unrealPct":5.3,"stop":14.50,"status":"HOLD — STOP $14.50 — T48 — PEACE DEAL SECONDARY OK","note":"T48 working +5.3%. Elliott 10%+. SI-37 sized."},
    {"ticker":"LEU","name":"Centrus Energy Corp","shares":15,"avgPrice":191.90,"last":191.65,"unrealPnL":-4,"unrealPct":-0.1,"stop":159.00,"status":"HOLD — STOP $159.00 — T52 NEW — HALEU TOLL ROAD","note":"T52: S43. Only US NRC-licensed HALEU producer. $3.9B backlog to 2040. $900M DOE task order pending definitization. OKLO JV. Russian ban Jan 2028 = structural demand surge. 15sh @~$191.90 market. Stop $159 GTC. Max loss $493 (SI-35 compliant). T53 conditional: $170-175 pullback, 13sh, stop $150."}
  ],
  "pendingGTCs": [
    {"ticker":"LAC","name":"Lithium Americas","action":"BUY","limit":4.80,"stop":4.00,"qty":220,"maxLoss":176,"status":"GTC $4.80 / STOP $4.00 — SI-37","note":"Thacker Pass Phase 1."},
    {"ticker":"TXT","name":"Textron Inc","action":"BUY","limit":88.00,"stop":79.00,"qty":55,"maxLoss":495,"status":"GTC $88 PENDING","note":"Bell MV-75 Valor."}
  ],
  "watchList": [
    {"ticker":"IONQ","name":"IonQ Inc","thesis":"Stage 1 COMPLETE. Trapped-ion quantum. Q1 rev $64.7M +755% YoY. RPO $470M. $3.1B cash. GROWTH THESIS.","entry":"Dip buy $38-45. Stop $27. Target $80-100.","gate":"Q2 earnings Aug 12. T23 lock ~Aug 10.","status":"ACTIVE — DIP BUY $38-45"},
    {"ticker":"TUI1","name":"TUI AG","thesis":"H1 published May 13. Guidance cut EBIT 1.1-1.4bn EUR. Peace deal re-rating thesis.","entry":"5.80-6.20 EUR. Stop 4.90 EUR. Target 9.20 EUR.","gate":"Above zone ~6.75 EUR. Wait.","status":"ACTIVE — ABOVE ZONE — WAIT FOR ZONE"},
    {"ticker":"SIX2","name":"Sixt SE","thesis":"German premium car rental. Q1 -45% EPS miss. Peace deal / consumer recovery.","entry":"62-65 EUR. Stop 54 EUR. Target 97 EUR.","gate":"Above zone. Wait for pullback.","status":"ACTIVE — ABOVE ZONE — WAIT"},
    {"ticker":"RYAAY","name":"Ryanair","thesis":"European LCC down 22% from ATH. Peace deal = fuel cost drop + Med booking recovery. Best peace deal R/R after CCL.","entry":"$52-55 post-earnings. Stop $47.","gate":"P24 block until May 21 FY print.","status":"ACTIVE — P24 BLOCK UNTIL MAY 21"},
    {"ticker":"T53_LEU","name":"LEU Conditional Second Tranche","thesis":"If LEU pulls back to $170-175 on sector noise without thesis break, second entry. T10 applies — staged entry not oversizing.","entry":"$170-175. Stop $150. 13 shares. Max loss $325.","gate":"Price $170-175 AND no DOE failure AND no moat development AND no thesis break. Combined max loss with T52: ~$820.","status":"MONITORING — CONDITIONAL TRANCHE — PULLBACK TRIGGER"},
    {"ticker":"RCL","name":"Royal Caribbean","thesis":"Peace deal bounce. 60% fuel hedged. Quality operator.","entry":"$255-270. Stop $245. Target $320-340.","gate":"No third cruise while CCL+NCLH active.","status":"MONITORING — NO THIRD CRUISE UNTIL CCL/NCLH RESOLVED"},
    {"ticker":"COHR","name":"Coherent Corp","thesis":"AI optical interconnect. NVIDIA $2B T26 stake. Q3 rev $1.81B +21%.","entry":"$295-310 on pullback.","gate":"At ATH — wait. Fails SI-48 at current price.","status":"MONITORING — WAIT PULLBACK $295-310"},
    {"ticker":"ENGIE","name":"Engie SA","thesis":"EU Energy slot 2/4. Belgian nuclear extended to 2035. LNG infrastructure.","entry":"TBD after Stage 1.","gate":"Stage 1 required.","status":"MONITORING — STAGE 1 REQUIRED"},
    {"ticker":"GTT","name":"Gaztransport Technigaz","thesis":"Capital-light LNG royalty. 68% EBITDA margin. Hormuz = LNG demand = GTT royalties.","entry":"170-175 EUR. Stop 158 EUR. Target 235 EUR.","gate":"P13 blocks at ~202 EUR. Watch post-dividend dip (ex-div Jun 17).","status":"MONITORING — WATCH 170-175 EUR POST-JUN 17"},
    {"ticker":"MSTR_SCALE","name":"MicroStrategy scale","thesis":"BTC gate $85K. CLARITY clean pass required.","entry":"Market on BTC $85K + CLARITY pass.","gate":"Check CLARITY outcome S44.","status":"MONITORING — CHECK CLARITY S44"},
    {"ticker":"CRM","name":"Salesforce","thesis":"Down 30% in 2026. Fwd P/E 13.8x. $25B buyback. Agentforce AI.","entry":"Post May 27 earnings only. $165-180, stop ~$155.","gate":"Q1 FY2027 May 27 AMC. P24 block.","status":"MONITORING — EARNINGS MAY 27 AMC"},
    {"ticker":"LULU","name":"Lululemon","thesis":"60% below ATH. Fwd P/E 10.5x.","entry":"Post May 28 earnings.","gate":"Q3 FY2026 May 28. P24 block.","status":"MONITORING — EARNINGS MAY 28"},
    {"ticker":"OKLO","name":"Oklo Inc","thesis":"SMR/advanced fission. Aurora powerhouse 15-75MW. Q1 net loss -$33.1M, revenue $0. $1.4B cash. $1B ATM offering filed. July 4 Groves criticality target. NRC PDC approved. NVIDIA partnership. Meta 1.2GW (2030-2034). Customer pipeline 14GW. ATM overhang caps rallies — enter post-criticality DIP not spike.","entry":"Post July 4 criticality dip. SI-37 cap $1,500. Zone ~$12-13 on post-announcement correction.","gate":"July 4 Groves criticality. Immediate Stage 1 on confirmation. ATM overhang. Wait for catalyst.","status":"UNIVERSE — JULY 4 CRITICALITY GATE"},
    {"ticker":"BWXT","name":"BWX Technologies","thesis":"Nuclear defense/infrastructure. Revenue $3.19B +18% YoY, EPS +20%, margin 10.3%. Own SMR (BANR). Profitable unlike OKLO. Defense caution applies.","entry":"$183 on pullback (-15% from $216 reference).","gate":"Currently $208 — need -15% correction. Defense caution means lower priority.","status":"UNIVERSE — SI-39 WATCHLIST AT $183"},
    {"ticker":"SOFI","name":"SoFi Technologies","thesis":"T27 turnaround pattern. 52% below ATH. Fintech.","entry":"$13-14 on pullback. Stop $11.50.","gate":"PYPL (T39) resolved first.","status":"MONITORING — PYPL GATE FIRST"},
    {"ticker":"V","name":"Visa Inc","thesis":"Stopped T32 @$321.82. Thesis intact.","entry":"$305-315. Stop $292-295.","gate":"Q3 earnings Jul 28.","status":"WATCH — RE-ENTRY $305-315"},
    {"ticker":"POET","name":"POET Technologies","thesis":"Silicon photonics. $430M cash. Governance flag (Marvell/Celestial).","entry":"Post May 22 Q1 earnings only.","gate":"Q1 rev must exceed $500K. Governance flag active.","status":"UNIVERSE — MAY 22 GATE"},
    {"ticker":"ANDURIL","name":"Anduril Industries","thesis":"PRIVATE. S-1 filing = same-week Stage 1.","entry":"IPO only.","gate":"S-1 filing watch.","status":"IPO WATCH"}
  ],
  "shortWatchlist": [
    {"ticker":"PLTR","thesis":"Dormant until Q2 July 2026.","status":"DORMANT UNTIL Q2 JULY","trigger":"Q2 guidance cut only"},
    {"ticker":"AAL","thesis":"No fuel hedge, $36.5B debt.","trigger":"Dead-cat bounce $13-14.","status":"WATCH"},
    {"ticker":"SNOW","thesis":"18x forward revenue.","trigger":"Earnings miss + guidance trim.","status":"WATCH"}
  ],
  "euEnergyTransition": {
    "title":"EU/UK ENERGY TRANSITION — SECTION N (SI-67)",
    "concentrationCeiling":"Maximum 4 positions. CURRENT: RR.L (1/4). 3 slots available.",
    "stage1Queue":["ENGIE.PA — Stage 1 required. LNG + Belgian nuclear.", "GTT.PA — Watch 170-175 EUR post-dividend (ex-div Jun 17)."],
    "gateNote":"3 slots available. ENGIE Stage 1 next priority. GTT post-dividend pullback.",
    "scanFrequency":"First session each month + thesis-triggered"
  },
  "criticalMineralsThesis": {
    "title":"CRITICAL MINERALS — T22 AT CEILING",
    "concentrationCeiling":"CRML (held) + LAC (GTC) + UUUU (held) = MAXIMUM. CCJ stopped — uranium slot freed but T22 ceiling still applies. NOTE: LEU classified as nuclear INFRASTRUCTURE (enrichment technology), not critical minerals mining. Does not count toward T22.",
    "candidates":[
      {"ticker":"CRML","status":"HELD +26.7% — $0.31 BUFFER","thesis":"Tanbreez 92.5%. EUR acquisition pending. Dilution risk.","stop":"$11.20"},
      {"ticker":"UUUU","status":"HELD -8.3% — URANIUM SECTOR WEAK","thesis":"Only US licensed REE separator. ASM July 2026.","classification":"SI-37"},
      {"ticker":"LAC","status":"GTC $4.80 PENDING","thesis":"Thacker Pass Phase 1.","classification":"SI-37 Speculative"}
    ]
  },
  "peaceDealPortfolio": {
    "title":"PEACE DEAL PORTFOLIO — WORKING",
    "status":"T47 CCL +4.8% | T48 NCLH +5.3% | Both working.",
    "primaryVehicle":{"ticker":"CCL","shares":250,"entry":24.70,"stop":23.00,"target":37,"rr":"4.75:1","last":25.88,"unrealPnL":295,"thesis":"Zero fuel hedging. $25.3B net debt declining. $2.5B buyback. 85% capacity pre-booked. Earnings Jun 30."},
    "secondaryVehicle":{"ticker":"NCLH","shares":75,"entry":15.90,"stop":14.50,"target":25,"rr":"5.6:1","last":16.74,"unrealPnL":63,"thesis":"SI-37 size. Elliott 10%+ activist. EPS $1.45 to $2.38+ on peace deal."},
    "pendingVehicle":{"ticker":"RYAAY","status":"P24 block until May 21 FY print. $52-55 entry post-print."},
    "notEntered":{"ticker":"RCL","reason":"No third cruise while CCL+NCLH active."},
    "watchNotes":"Binary event — designed to gap 10-15% overnight on peace signal. Do not exit for small gains. If weekend announcement: Monday gap expected — enter on first pullback."
  },
  "clarityAct": {
    "title":"CLARITY ACT — CHECK RESULT S44",
    "what":"Digital Asset Market Clarity Act. BTC = commodity under CFTC. Markup was Thu 14 May 18:30 UAE.",
    "senateStatus":"MARKUP TONIGHT — CHECK RESULT FIRST THING S44",
    "btcCurrent":81000,
    "mstrScaleGate":85000,
    "action":"If markup passes cleanly AND BTC is at or above $85K: execute MSTR scale. If either condition fails: no action.",
    "killSwitch":"BTC weekly close less than $70K"
  },
  "leuThesis": {
    "title":"LEU — CENTRUS ENERGY — T52 ENTERED S43",
    "status":"LIVE — 15sh @~$191.90. Stop $159 GTC. Max loss $493.",
    "coreThesis":"Only US NRC-licensed HALEU producer. HALEU required by ALL advanced reactor designs: OKLO, NuScale, X-Energy, TerraPower. Broke Russian monopoly Nov 2023. Competitors 3-5 years behind. $3.9B backlog to 2040.",
    "keyMetrics":{
      "price":191.90,"stop":159.00,"shares":15,"maxLoss":493,
      "backlog":"$3.9B to 2040","cash":"$1.87B unrestricted","debt":"$1.21B convertible notes","netCash":"$660M",
      "q12026Revenue":"$76.7M (+5% YoY)","guidance2026":"$450-500M (raised twice)",
      "ttmNetIncome":"$60.6M GAAP / $87.8M non-GAAP"
    },
    "catalysts":[
      "$900M DOE task order definitization (H2 2026) — currently in negotiation, most critical near-term catalyst",
      "OKLO JV on HALEU deconversion (near-term announcement)",
      "Russian TENEX ban fully effective January 1, 2028 — eliminates 25% US enriched uranium supply",
      "LEU Q2 results August 2026",
      "Commercial HALEU deliveries 2026-2027"
    ],
    "thesisBreak":[
      "DOE $900M task order explicitly cancelled or denied",
      "HALEU commercial demand delayed beyond 2028 by DOE",
      "Urenco or Orano achieve US HALEU production ahead of schedule",
      "Cash burn exceeds $200M/quarter without corresponding contract wins"
    ],
    "t53Conditional":"Second tranche 13sh at $170-175 pullback, stop $150, max loss ~$325. Combined max loss ~$820. Triggers: price zone AND no DOE failure AND no competitive moat development."
  },
  "cgctFactorial": {
    "title":"CGCT to FACTORIAL HOLDINGS (FAC) — HOLD THROUGH MERGER",
    "status":"HOLD CONFIRMED. Do not redeem. Shareholder vote May 27.",
    "shares":291,"avgCost":10.295,"trustFloor":10.38,
    "what":"CGCT is taking Factorial Inc. (solid-state battery technology) public via de-SPAC. Post-merger company: Factorial Holdings Inc., ticker FAC on Nasdaq.",
    "validation":"Stellantis + Mercedes-Benz engineering validation = T26 Tier-1 strategic investment signal. OEMs with engineering teams who evaluated actual battery IP.",
    "voteDate":"May 27, 2026 at 10:00am ET (14:00 UAE)",
    "mergerClose":"Expected June 2026",
    "postMergerTicker":"FAC on Nasdaq",
    "lockupNote":"Factorial shareholders and sponsor locked up 6-12 months post-close. PIPE investors ($100M) have registration rights. Selling pressure first 60-90 days. Do not stop out on sentiment noise.",
    "thesisBreak":"Loss of Stellantis or Mercedes partnership, cash runway below 18 months, or commercial battery technology failure confirmed by OEM partner.",
    "action":"Confirm with IBKR: no redemption election submitted. Position held through May 27 shareholder vote."
  },
  "tradeTracker": {
    "closedTrades": [
      {"id":1,"ticker":"CCL","dateIn":"2026-03-24","dateOut":"2026-03-26","qty":240,"entry":24.83,"exit":25.35,"ccy":"USD","pnlUSD":122.35,"note":"S07."},
      {"id":2,"ticker":"ONDS","dateIn":"2026-03-24","dateOut":"2026-03-30","qty":250,"entry":10.90,"exit":8.505,"ccy":"USD","pnlUSD":-601.30,"note":"Stopped."},
      {"id":3,"ticker":"KTOS","dateIn":"2026-03-24","dateOut":"2026-03-30","qty":100,"entry":81.00,"exit":64.977,"ccy":"USD","pnlUSD":-1604.27,"note":"P12."},
      {"id":4,"ticker":"UEC","dateIn":"2026-03-25","dateOut":"2026-03-31","qty":206,"entry":13.77,"exit":13.16,"ccy":"USD","pnlUSD":-127.76,"note":"Stopped."},
      {"id":5,"ticker":"IAG","dateIn":"2026-03-27","dateOut":"2026-04-01","qty":2200,"entry":3.55,"exit":3.70,"ccy":"GBP","pnlUSD":407.36,"note":"Peace thesis broken."},
      {"id":6,"ticker":"RCL","dateIn":"2026-03-24","dateOut":"2026-04-02","qty":36,"entry":273.54,"exit":269.91,"ccy":"USD","pnlUSD":-132.89,"note":"Stopped."},
      {"id":7,"ticker":"LEU","dateIn":"2026-03-24","dateOut":"2026-04-07","qty":13,"entry":188.79,"exit":170.26,"ccy":"USD","pnlUSD":-242.94,"note":"T7 stop too tight. Re-entered T52 with wider stop $159."},
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
      {"id":27,"ticker":"CCJ","dateIn":"2026-03-24","dateOut":"2026-04-28","qty":49,"entry":104.021,"exit":119.97,"ccy":"USD","pnlUSD":782.00,"note":"T23 deliberate. Re-entry 50sh @$117.02 avg."},
      {"id":28,"ticker":"VST","dateIn":"2026-04-08","dateOut":"2026-04-29","qty":53,"entry":150.569,"exit":156.53,"ccy":"USD","pnlUSD":316.00,"note":"GTC stop triggered."},
      {"id":29,"ticker":"PDYN","dateIn":"2026-04-29","dateOut":"2026-04-30","qty":250,"entry":5.7507,"exit":5.85,"ccy":"USD","pnlUSD":-25,"note":"E9 short covered."},
      {"id":30,"ticker":"MSFT","dateIn":"2026-04-14","dateOut":"2026-04-30","qty":25,"entry":372.77,"exit":410.38,"ccy":"USD","pnlUSD":940,"note":"Stop triggered. Re-entered 25sh @$403.052."},
      {"id":31,"ticker":"NOG","dateIn":"2026-03-26","dateOut":"2026-05-01","qty":80,"entry":24.383,"exit":26.50,"ccy":"USD","pnlUSD":169.36,"note":"Stop triggered."},
      {"id":32,"ticker":"V","dateIn":"2026-03-24","dateOut":"2026-05-05","qty":8,"entry":307.125,"exit":321.823,"ccy":"USD","pnlUSD":117.58,"note":"T28. Re-entry $305-315."},
      {"id":33,"ticker":"NOG","dateIn":"2026-05-04","dateOut":"2026-05-07","qty":200,"entry":26.771,"exit":25.11,"ccy":"USD","pnlUSD":-332.20,"note":"Iran noise."},
      {"id":34,"ticker":"R3NK","dateIn":"2026-04-08","dateOut":"2026-05-07","qty":25,"entry":52.27,"exit":53.44,"ccy":"EUR","pnlUSD":31.59,"note":"T30. Rebuy GTC placed."},
      {"id":35,"ticker":"R3NK","dateIn":"2026-05-07","dateOut":"2026-05-11","qty":25,"entry":52.00,"exit":47.01,"ccy":"EUR","pnlUSD":-136,"note":"T35. T31 codified."},
      {"id":36,"ticker":"AMPX","dateIn":"2026-05-05","dateOut":"2026-05-07","qty":168,"entry":18.106,"exit":17.94,"ccy":"USD","pnlUSD":-27.89,"note":"Gapped stop."},
      {"id":37,"ticker":"MRVL","dateIn":"2026-03-24","dateOut":"2026-05-07","qty":10,"entry":152.10,"exit":160.02,"ccy":"USD","pnlUSD":79.20,"note":"Stop $159.95."},
      {"id":38,"ticker":"CEG","dateIn":"2026-05-04","dateOut":"2026-05-07","qty":14,"entry":308.072,"exit":314.77,"ccy":"USD","pnlUSD":93.77,"note":"Stop raised then triggered."},
      {"id":39,"ticker":"PYPL","dateIn":"2026-05-08","dateOut":null,"qty":55,"entry":45.639,"exit":null,"ccy":"USD","pnlUSD":null,"note":"T39: Q1 beat. Stop $37.50. OPEN."},
      {"id":41,"ticker":"R3NK","dateIn":"2026-05-11","dateOut":"2026-05-12","qty":200,"entry":46.485,"exit":43.9925,"ccy":"EUR","pnlUSD":-543,"note":"T41: Stop vindicated. CLOSED."},
      {"id":42,"ticker":"IREN","dateIn":"2026-05-11","dateOut":null,"qty":24,"entry":55.042,"exit":null,"ccy":"USD","pnlUSD":null,"note":"T42: NVIDIA $3.4B deal. SI-37. OPEN."},
      {"id":43,"ticker":"ZETA","dateIn":"2026-05-11","dateOut":null,"qty":191,"entry":16.866,"exit":null,"ccy":"USD","pnlUSD":null,"note":"T43: 19 consecutive beats. Aug 4. OPEN."},
      {"id":44,"ticker":"PATH","dateIn":"2026-05-11","dateOut":null,"qty":320,"entry":10.726,"exit":null,"ccy":"USD","pnlUSD":null,"note":"T44: Agentic AI. Stop $9.20. $0.25 buffer. Earnings May 28. OPEN."},
      {"id":45,"ticker":"LDO","dateIn":"2026-03-27","dateOut":"2026-05-12","qty":35,"entry":56.086,"exit":50.00,"ccy":"EUR","pnlUSD":-232,"note":"T45: Stop 50 EUR. P28 codified. CLOSED."},
      {"id":46,"ticker":"AMZN","dateIn":"2026-03-24","dateOut":"2026-05-12","qty":30,"entry":201.204,"exit":263.943,"ccy":"USD","pnlUSD":1882,"note":"T46: +31.2%. CLOSED."},
      {"id":47,"ticker":"CCL","dateIn":"2026-05-13","dateOut":null,"qty":250,"entry":24.70,"exit":null,"ccy":"USD","pnlUSD":null,"note":"T47: S42. Peace deal primary. +4.8% S43. Stop $23. OPEN."},
      {"id":48,"ticker":"NCLH","dateIn":"2026-05-13","dateOut":null,"qty":75,"entry":15.90,"exit":null,"ccy":"USD","pnlUSD":null,"note":"T48: S42. Peace deal secondary. +5.3% S43. Stop $14.50. OPEN."},
      {"id":49,"ticker":"MSFT","dateIn":"2026-04-30","dateOut":"2026-05-13","qty":25,"entry":403.052,"exit":402.09,"ccy":"USD","pnlUSD":-24,"note":"T49: S42 stop triggered. CLOSED."},
      {"id":50,"ticker":"CCJ","dateIn":"2026-04-29","dateOut":"2026-05-13","qty":50,"entry":117.02,"exit":112.17,"ccy":"USD","pnlUSD":-243,"note":"T50: S42 bridge collapse. T22 ceiling blocks re-entry. CLOSED."},
      {"id":51,"ticker":"BAH","dateIn":"2026-04-08","dateOut":"2026-05-13","qty":33,"entry":76.531,"exit":69.00,"ccy":"USD","pnlUSD":-249,"note":"T51: S42 stop triggered. No re-entry without catalyst. CLOSED."},
      {"id":52,"ticker":"LEU","dateIn":"2026-05-14","dateOut":null,"qty":15,"entry":191.90,"exit":null,"ccy":"USD","pnlUSD":null,"note":"T52: S43 NEW. HALEU toll road. Only US NRC-licensed HALEU producer. $3.9B backlog to 2040. $900M DOE task order. OKLO JV. Stop $159 GTC (SI-35: 15x$32.90=$493). T53 conditional: $170-175 pullback, 13sh, stop $150. OPEN."}
    ],
    "lastUpdated":"2026-05-14 S43 CLOSE. 45 closed + 7 open = 52 rows. Open: T39 PYPL, T42 IREN, T43 ZETA, T44 PATH, T47 CCL, T48 NCLH, T52 LEU."
  },
  "sessionNotes": [
    {"date":"2026-05-07","note":"S37: LMT stop raised. RR.L Q1 beat. NOG T33 sold. R3NK T34/T35. AMPX/MRVL/CEG closed. NCH2 cancelled."},
    {"date":"2026-05-08","note":"S38: SNPS+MSFT stops raised. T39 PYPL. UUUU Q1 beat. CENTCOM strikes."},
    {"date":"2026-05-09","note":"S39: Rules framework overhauled. SI-69-76 added. 4 stop changes. 15 new watchlist entries."},
    {"date":"2026-05-11","note":"S40: T35 R3NK stopped. T41/T42/T43/T44 entered. AMZN stop raised. Net liq $104.2K."},
    {"date":"2026-05-12","note":"S41: T45 LDO -$232. T41 R3NK -$543. T46 AMZN +$1,882. Net +$1,107. Framework v2.0. Net liq $102.3K."},
    {"date":"2026-05-13","note":"S42: T47 CCL @$24.70. T48 NCLH @$15.90. T49 MSFT -$24. T50 CCJ -$243. T51 BAH -$249. Net -$516. PATH $0.25 buffer critical. CLARITY tonight. Trump-Xi tomorrow. Net liq ~$101.0K."},
    {"date":"2026-05-14","note":"S43: CGCT hold through merger confirmed (earlier analyst error — P29 codified). Factorial Holdings vote May 27, close June 2026, ticker FAC. CCL debt $25.3B declining, thesis intact. Yellow cake/nuclear list scanned: LEU standout (HALEU monopoly). OKLO analyzed: UNIVERSE, July 4 watch, $1B ATM overhang. LEU Stage 2 completed: $3.9B backlog, $900M DOE task order, OKLO JV, $660M net cash, stop $159. T52 LEU 15sh @~$191.90 entered. ABVX GTC orphan $114.90 flagged — cancel S44 URGENT. CLARITY result pending. Trump-Xi ongoing. Net liq ~$100.8K. 19 positions."}
  ]
};

const COLORS = {
  bg:"#0d1117",card:"#161b22",border:"#30363d",accent:"#58a6ff",
  green:"#3fb950",red:"#f85149",yellow:"#d29922",blue:"#388bfd",
  text:"#c9d1d9",textDim:"#8b949e",textBright:"#f0f6fc",purple:"#a371f7",orange:"#f0883e"
};

export default function TradingJournal() {
  const [data,setData]=useState(INITIAL_STATE);
  const [activeTab,setActiveTab]=useState("positions");
  const [newNote,setNewNote]=useState("");
  const update=useCallback((d)=>setData(d),[]);
  const addNote=()=>{if(!newNote.trim())return;update({...data,sessionNotes:[...(data.sessionNotes||[]),{date:new Date().toISOString().slice(0,10),note:newNote}]});setNewNote("");};
  const tabs=["positions","gtcs","watch","peace","leu","cgct","clarity","shorts","eu-energy","minerals","thesis","tracker","notes"];
  const pnlColor=(v)=>v>0?COLORS.green:v<0?COLORS.red:COLORS.textDim;
  const sc=(s)=>s?.includes("ACTIVE")?COLORS.green:s?.includes("MONITORING")?COLORS.accent:s?.includes("DO NOT")?COLORS.red:s?.includes("ENTERED")?COLORS.purple:COLORS.yellow;
  const ub=(p)=>{if(p.status?.includes("WARNING"))return"3px solid "+COLORS.red;if(p.unrealPnL>300)return"3px solid "+COLORS.green;if(p.unrealPnL<-200)return"3px solid "+COLORS.red;if(p.status?.includes("NEW"))return"3px solid "+COLORS.blue;return undefined;};
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
            <div style={{fontSize:18,fontWeight:700,color:COLORS.textBright}}>CLAUDE FUND — JOURNAL v57 S43</div>
            <div style={{fontSize:11,color:COLORS.textDim,marginTop:2}}>Session 43 — Thu 14 May 2026 | {data.fund.account} | 19 positions</div>
          </div>
          <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
            {[{l:"NET LIQ",v:"~$100.8K"},{l:"CASH USD",v:"~$44.1K",c:COLORS.yellow},{l:"POSITIONS",v:"19"},{l:"OPEN TRADES",v:"7"}].map(m=>(
              <div key={m.l} className="card" style={{textAlign:"center",minWidth:76}}>
                <div style={{fontSize:9,color:COLORS.textDim}}>{m.l}</div>
                <div style={{fontSize:14,fontWeight:700,color:m.c||COLORS.textBright,marginTop:2}}>{m.v}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{marginTop:6,padding:"6px 10px",background:"rgba(248,81,73,.1)",border:"1px solid rgba(248,81,73,.3)",borderRadius:4,fontSize:11,color:COLORS.red,fontWeight:700}}>
          S44 FIRST: CANCEL ABVX GTC $114.90 (E9 orphan) | PATH $0.25 stop buffer CRITICAL | CHECK CLARITY outcome
        </div>
        <div style={{marginTop:4,padding:"6px 10px",background:"rgba(88,166,255,.15)",border:"1px solid rgba(88,166,255,.4)",borderRadius:4,fontSize:11,color:COLORS.accent}}>
          T52 LEU entered 15sh @~$191.90, stop $159 | CGCT vote May 27 10am ET | CCL +4.8% NCLH +5.3% working | Trump-Xi ongoing
        </div>
      </div>

      <div style={{display:"flex",gap:4,marginBottom:12,flexWrap:"wrap"}}>
        {tabs.map(t=>(<button key={t} className={"btn"+(activeTab===t?" btn-primary":"")} onClick={()=>setActiveTab(t)} style={{textTransform:"uppercase",fontSize:11}}>{t}</button>))}
      </div>

      {activeTab==="positions"&&(
        <div style={{display:"flex",flexDirection:"column",gap:6}}>
          {data.positions?.map(p=>(
            <div key={p.ticker} className="card" style={{borderLeft:ub(p)}}>
              <div style={{display:"flex",gap:10,alignItems:"center",flexWrap:"wrap",marginBottom:3}}>
                <span style={{fontWeight:700,fontSize:13,color:COLORS.textBright}}>{p.ticker}</span>
                {p.cur&&<span className="badge badge-grey">{p.cur}</span>}
                {p.unrealPnL!==undefined&&<span className={"badge badge-"+(p.unrealPnL>=50?"green":p.unrealPnL<=-50?"red":"amber")}>{p.unrealPnL>=0?"+":""}{p.unrealPct?.toFixed(1)}%</span>}
                <span style={{fontSize:9,color:COLORS.textDim,marginLeft:"auto"}}>Stop: <b style={{color:COLORS.yellow}}>{p.stop||p.stopType||"--"}</b></span>
              </div>
              <div style={{fontSize:10,color:sc(p.status),marginBottom:2,fontWeight:600}}>{p.status}</div>
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
                <span className={"badge badge-"+(g.maxLoss<=300?"green":g.maxLoss<=450?"amber":"red")}>Max ${g.maxLoss}</span>
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
                <div style={{fontSize:9,fontStyle:"italic",color:COLORS.textBright,marginBottom:3}}>{w.thesis?.substring(0,130)}{w.thesis?.length>130?"...":""}</div>
                {w.gate&&<div style={{fontSize:9,color:COLORS.yellow}}>Gate: {w.gate?.substring(0,100)}</div>}
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab==="peace"&&(
        <div>
          <div className="card" style={{borderLeft:"4px solid "+COLORS.green,marginBottom:8}}>
            <div style={{fontWeight:700,color:COLORS.green,fontSize:13,marginBottom:4}}>{data.peaceDealPortfolio?.title}</div>
            <div style={{fontSize:11,color:COLORS.green,fontWeight:600,marginBottom:8}}>{data.peaceDealPortfolio?.status}</div>
            {[data.peaceDealPortfolio?.primaryVehicle,data.peaceDealPortfolio?.secondaryVehicle].map((v,i)=>v&&(
              <div key={i} className="card" style={{marginBottom:6,borderLeft:"3px solid "+(i===0?COLORS.green:COLORS.yellow)}}>
                <div style={{display:"flex",gap:8,marginBottom:3,flexWrap:"wrap",alignItems:"center"}}>
                  <span style={{fontWeight:700,color:COLORS.textBright}}>{v.ticker}</span>
                  <span className={"badge badge-"+(i===0?"green":"amber")}>{i===0?"PRIMARY":"SECONDARY"}</span>
                  <span style={{fontSize:10,color:COLORS.textDim}}>{v.shares}sh @${v.entry}</span>
                  <span style={{fontSize:10,color:COLORS.yellow}}>Stop ${v.stop}</span>
                  <span style={{fontSize:12,fontWeight:700,color:COLORS.green}}>{v.unrealPnL>0?"+$":"$"}{v.unrealPnL} ({v.last})</span>
                </div>
                <div style={{fontSize:9,color:COLORS.textDim}}>{v.thesis}</div>
              </div>
            ))}
            <div style={{marginTop:8,padding:"6px 10px",background:"rgba(210,153,34,.1)",borderRadius:4,fontSize:11,color:COLORS.yellow}}>{data.peaceDealPortfolio?.watchNotes}</div>
          </div>
        </div>
      )}

      {activeTab==="leu"&&(
        <div className="card" style={{borderLeft:"4px solid "+COLORS.blue}}>
          <div style={{fontWeight:700,color:COLORS.blue,fontSize:13,marginBottom:6}}>{data.leuThesis?.title}</div>
          <div style={{fontSize:11,color:COLORS.green,fontWeight:600,marginBottom:6}}>{data.leuThesis?.status}</div>
          <div style={{fontSize:11,lineHeight:1.7,marginBottom:8}}>{data.leuThesis?.coreThesis}</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:6,marginBottom:8}}>
            {Object.entries(data.leuThesis?.keyMetrics||{}).map(([k,v])=>(
              <div key={k} className="card">
                <div style={{fontSize:9,color:COLORS.textDim}}>{k.replace(/([A-Z])/g,' $1').toUpperCase()}</div>
                <div style={{fontSize:11,fontWeight:600,color:COLORS.textBright,marginTop:2}}>{v}</div>
              </div>
            ))}
          </div>
          <div style={{marginBottom:6}}>
            <div style={{fontSize:10,color:COLORS.green,fontWeight:700,marginBottom:4}}>CATALYSTS</div>
            {data.leuThesis?.catalysts?.map((c,i)=><div key={i} style={{fontSize:9,color:COLORS.textDim,marginBottom:2}}>to {c}</div>)}
          </div>
          <div style={{padding:"6px 10px",background:"rgba(248,81,73,.1)",borderRadius:4,fontSize:10,color:COLORS.red}}>
            <b>THESIS BREAK:</b> {data.leuThesis?.thesisBreak?.join(" | ")}
          </div>
          <div style={{marginTop:6,padding:"6px 10px",background:"rgba(88,166,255,.1)",borderRadius:4,fontSize:10,color:COLORS.accent}}>
            T53: {data.leuThesis?.t53Conditional}
          </div>
        </div>
      )}

      {activeTab==="cgct"&&(
        <div className="card" style={{borderLeft:"4px solid "+COLORS.purple}}>
          <div style={{fontWeight:700,color:COLORS.purple,fontSize:13,marginBottom:4}}>{data.cgctFactorial?.title}</div>
          <div style={{fontSize:11,color:COLORS.green,fontWeight:700,marginBottom:6}}>{data.cgctFactorial?.status}</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:8}}>
            {[
              {l:"Shares held",v:data.cgctFactorial?.shares+" @ $"+data.cgctFactorial?.avgCost},
              {l:"Trust floor",v:"~$"+data.cgctFactorial?.trustFloor},
              {l:"Shareholder vote",v:data.cgctFactorial?.voteDate,c:COLORS.red},
              {l:"Post-merger ticker",v:data.cgctFactorial?.postMergerTicker,c:COLORS.blue},
              {l:"Merger close",v:data.cgctFactorial?.mergerClose},
              {l:"Battery co.",v:"Factorial Inc. — solid-state"}
            ].map((m,i)=>(
              <div key={i} className="card">
                <div style={{fontSize:9,color:COLORS.textDim}}>{m.l}</div>
                <div style={{fontSize:12,fontWeight:700,color:m.c||COLORS.textBright,marginTop:2}}>{m.v}</div>
              </div>
            ))}
          </div>
          <div style={{marginBottom:6,fontSize:10,color:COLORS.textDim}}>{data.cgctFactorial?.validation}</div>
          <div style={{padding:"6px 10px",background:"rgba(163,113,247,.1)",borderRadius:4,fontSize:11,color:COLORS.purple,fontWeight:600}}>{data.cgctFactorial?.action}</div>
          <div style={{marginTop:6,padding:"6px 10px",background:"rgba(248,81,73,.1)",borderRadius:4,fontSize:10,color:COLORS.red}}>THESIS BREAK: {data.cgctFactorial?.thesisBreak}</div>
          <div style={{marginTop:6,fontSize:10,color:COLORS.textDim}}>LOCK-UP: {data.cgctFactorial?.lockupNote}</div>
        </div>
      )}

      {activeTab==="clarity"&&(
        <div className="card" style={{borderLeft:"4px solid "+COLORS.purple}}>
          <div style={{fontWeight:700,color:COLORS.purple,fontSize:13,marginBottom:4}}>{data.clarityAct?.title}</div>
          <div style={{fontSize:11,color:COLORS.red,fontWeight:700,marginBottom:6}}>{data.clarityAct?.senateStatus}</div>
          <div style={{fontSize:11,marginBottom:8}}>{data.clarityAct?.what}</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:8}}>
            <div className="card"><div style={{fontSize:9,color:COLORS.textDim}}>BTC current</div><div style={{fontSize:14,fontWeight:700,color:COLORS.yellow}}>~$81K</div></div>
            <div className="card"><div style={{fontSize:9,color:COLORS.textDim}}>MSTR scale gate</div><div style={{fontSize:14,fontWeight:700,color:COLORS.green}}>$85K</div></div>
          </div>
          <div style={{padding:"8px",background:"rgba(163,113,247,.1)",borderRadius:4,fontSize:11,color:COLORS.purple,fontWeight:600}}>{data.clarityAct?.action}</div>
        </div>
      )}

      {activeTab==="shorts"&&(
        <div>
          {data.shortWatchlist?.map((s,i)=>(
            <div key={i} className="card" style={{marginBottom:6,borderLeft:"3px solid "+(s.status?.includes("DORMANT")?COLORS.textDim:COLORS.purple)}}>
              <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:3}}>
                <span style={{fontWeight:700,color:COLORS.textBright}}>{s.ticker}</span>
                {s.status?.includes("DORMANT")?<span className="badge badge-grey">DORMANT</span>:<span className="badge badge-purple">WATCH</span>}
              </div>
              <div style={{fontSize:10,color:COLORS.textDim,marginBottom:2}}>{s.thesis}</div>
              <div style={{fontSize:9,color:COLORS.yellow}}>Trigger: {s.trigger}</div>
            </div>
          ))}
        </div>
      )}

      {activeTab==="eu-energy"&&(
        <div className="card" style={{borderLeft:"4px solid "+COLORS.yellow}}>
          <div style={{fontWeight:700,color:COLORS.yellow,fontSize:13,marginBottom:4}}>{data.euEnergyTransition?.title}</div>
          <div style={{fontSize:10,color:COLORS.green,fontWeight:600,marginBottom:4}}>{data.euEnergyTransition?.concentrationCeiling}</div>
          <div style={{padding:"8px",background:"rgba(210,153,34,.1)",borderRadius:4,fontSize:11,color:COLORS.yellow,marginBottom:8}}>{data.euEnergyTransition?.gateNote}</div>
          {data.euEnergyTransition?.stage1Queue?.map((q,i)=><div key={i} style={{fontSize:10,color:COLORS.textDim,marginBottom:2}}>to {q}</div>)}
        </div>
      )}

      {activeTab==="minerals"&&(
        <div>
          <div className="card" style={{marginBottom:8,borderLeft:"4px solid "+COLORS.green}}>
            <div style={{fontWeight:700,color:COLORS.green,fontSize:13,marginBottom:4}}>{data.criticalMineralsThesis?.title}</div>
            <div style={{padding:"6px 10px",background:"rgba(248,81,73,.1)",borderRadius:4,fontSize:11,color:COLORS.red,fontWeight:600}}>{data.criticalMineralsThesis?.concentrationCeiling}</div>
          </div>
          {data.criticalMineralsThesis?.candidates?.map((c,i)=>(
            <div key={i} className="card" style={{marginBottom:6,borderLeft:"3px solid "+(c.status?.includes("HELD")?"#3fb950":"#388bfd")}}>
              <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:3}}>
                <span style={{fontWeight:700,color:COLORS.textBright}}>{c.ticker}</span>
                <span className={"badge badge-"+(c.status?.includes("HELD")?"green":"blue")}>{c.status}</span>
              </div>
              <div style={{fontSize:10,color:COLORS.textDim}}>{c.thesis}</div>
            </div>
          ))}
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
                <span style={{fontSize:10,fontWeight:600,minWidth:150,color:COLORS.textBright}}>{d.date}</span>
                <span style={{fontSize:10,color:COLORS.textDim,flex:1}}>{d.event}</span>
                <span className={"badge badge-"+(d.priority==="CRITICAL"?"red":d.priority==="HIGH"?"amber":"grey")}>{d.priority}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab==="tracker"&&(
        <div>
          <div style={{fontSize:12,fontWeight:600,color:COLORS.accent,marginBottom:6}}>
            TRADE TRACKER — 45 CLOSED + 7 OPEN = 52 ROWS | T39 PYPL T42 IREN T43 ZETA T44 PATH T47 CCL T48 NCLH T52 LEU
          </div>
          {data.tradeTracker?.closedTrades?.slice().reverse().map(t=>(
            <div key={t.id} className="card" style={{marginBottom:3,borderLeft:"3px solid "+(t.pnlUSD===null?COLORS.blue:t.pnlUSD>0?COLORS.green:COLORS.red)}}>
              <div style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap"}}>
                <span style={{fontSize:9,color:COLORS.textDim}}>#{t.id}</span>
                <span style={{fontWeight:600,fontSize:12}}>{t.ticker}</span>
                <span style={{fontSize:9,color:COLORS.textDim}}>{t.dateOut||"OPEN"}</span>
                {t.pnlUSD!==null
                  ?<span style={{fontWeight:700,color:pnlColor(t.pnlUSD)}}>{t.pnlUSD>0?"+$":"-$"}{Math.abs(t.pnlUSD).toFixed(0)}</span>
                  :<span className="badge badge-blue">OPEN</span>}
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
        <span style={{fontSize:10,color:COLORS.textDim}}>v57 S43 | Thu 14 May 2026 | 19 pos | T52 LEU new | 7 open trades</span>
        <div style={{display:"flex",gap:4,flexWrap:"wrap"}}>
          <span className="badge badge-red">CANCEL ABVX GTC $114.90</span>
          <span className="badge badge-red">PATH $0.25 buffer</span>
          <span className="badge badge-purple">CHECK CLARITY S44</span>
          <span className="badge badge-blue">CGCT vote May 27</span>
          <span className="badge badge-green">CCL +4.8% NCLH +5.3%</span>
          <span className="badge badge-blue">T52 LEU new @$191.90</span>
        </div>
      </div>
    </div>
  );
}
