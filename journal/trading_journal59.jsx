import { useState, useEffect, useCallback } from "react";
const STORAGE_KEY = "fund_journal_v4";
// TIME: UAE=UTC+4. LSE 11:00 UAE. NYSE 17:30 UAE.
// E20: IBKR TWS only for live prices. E28: Never widen stop within 1pt of trigger.
// SI-68: No close files until screenshots confirmed. I17: NEW FILE EVERY SESSION — NEVER OVERWRITE.
// T31: Stop below 52W low on 40%+ ATH names. SI-35: Max loss $500/trade. T10: Thesis not sizing input.
// SI-83: Stage 2 Active Request — state overdue Stage 2s at every session open Step 1b.
// SI-84: Chart Screenshot Request — proactively request weekly charts before ACTIVE elevation.

const INITIAL_STATE = {
  "lastUpdated": "2026-05-16 S45 CLOSE. Full scan + chart review completed. SNPS stopped May 15 +$12.20. RR.L stopped May 15 +~$26. 15 positions (not 17). BTC fell $81K→$79K. AVAV earnings corrected Jun 23 (not Jun 30). OKLO entry zone corrected $50-55 (not $12-13). IREN stop $0.87 from trigger. PATH capitulation confirmed on 15m chart — recovery intact. AVAV hold to stop — do not exit manually. CRM chart bullish base, entry conditional May 27 AMC. CSCO+DELL added UNIVERSE.",
  "sessionNumber": "S45",
  "fund": {
    "account": "U24936508",
    "netLiquidity": 101000,
    "unrealizedPnL": -1100,
    "cashUSD": 51800,
    "cashGBP": 641,
    "cashEUR": -465,
    "broker": "IBKR Pro",
    "note": "v59 S45 CLOSE. Sat 16 May 2026. 15 positions. SNPS+RR.L stopped May 15. Full scan done. Chart review: IREN critical, AVAV hold to stop, PATH recovery intact, CRM base solid, LEU stop well-placed."
  },
  "thesis": {
    "title": "TRUMP-XI JOINT STATEMENT: HORMUZ MUST REMAIN OPEN — SI-25 CONDITION 1 STILL UNMET — BTC FELL $81K→$79K",
    "summary": "Trump-Xi Beijing summit: Hormuz must remain open, Xi offered intermediary role, will not supply military equipment to Iran. SI-25 Condition 1 UNMET — diplomatic statement only, physical reopening required. Ship seized near UAE same day. WTI rose to $102 this week — moving wrong direction. Kevin Warsh confirmed as new Fed Chair (hawkish). 10-year yields at 4.416%. BTC fell from $81K to $79K — moving away from $85K MSTR scale gate. NVDA earnings Wed May 20 critical for all AI positions.",
    "oilWTI": 102.04,
    "SI25Trigger": 105.87,
    "SI25Status": "WTI ~$102.04. Condition 1: UNMET (diplomatic signal only). Condition 2: UNMET (need $95.28). Oil moved WRONG direction this week. Thesis INTACT.",
    "hormuzStatus": "Trump-Xi joint statement strongest diplomatic signal to date. Xi intermediary role formalised at head-of-state level. Physical conflict ongoing — ship seized near UAE. SI-25 requires permanent reopening.",
    "keyDates": [
      {"date":"Mon 18 May S46","event":"SI-83 CHECK: State all Stage 2 overdue. CRM Stage 2 verify pre-lock. RYAAY May 21 prep — entry only at $52 or below. Confirm CGCT no-redemption with IBKR. Verify IREN/AVAV stops active.","priority":"CRITICAL"},
      {"date":"Wed 20 May","event":"NVDA Q1 FY2027 earnings AMC. Consensus $78B revenue. Not actionable — SI-39 trigger at $159.14. Watch for AI sector sentiment impact on IREN, ZETA, PATH.","priority":"HIGH"},
      {"date":"Wed 21 May","event":"RYAAY FY earnings AMC. P24 block lifts post-print. Entry ONLY at $52 or below — R/R 4.4:1. Current $53.70 fails 3:1 minimum. If gaps below $52 post-print, verify thesis not broken before entering.","priority":"CRITICAL"},
      {"date":"~Mon 25 May","event":"CRM T23 lock (48-72h before May 27 AMC). DO NOT move stop after lock. Entry conditional: beat + Agentforce ARR >$1B required.","priority":"HIGH"},
      {"date":"Tue 27 May 10am ET","event":"CGCT extraordinary shareholder vote. 10am ET = 2pm UAE. Hold confirmed. Post-merger ticker FAC. Confirm no redemption with IBKR before May 25.","priority":"CRITICAL"},
      {"date":"Tue 27 May AMC","event":"CRM Q1 FY2027 earnings. Entry conditional on beat + Agentforce ARR >$1B. Max 27sh at $170 approx. SNPS Q2 FY2026 earnings — monitoring only (position closed).","priority":"HIGH"},
      {"date":"~Mon 26 May","event":"PATH T23 lock. DO NOT widen stop $9.20 (E28). 15m chart confirms capitulation at $9.20 with V-recovery. Earnings May 28.","priority":"HIGH"},
      {"date":"Wed 28 May AMC","event":"PATH Q1 FY2027 earnings. Consensus $0.13 EPS, $397M revenue. Watch ARR stabilisation — net new ARR -30% YoY is the key risk. T23 lock ~May 26. Also: LULU Q1 earnings same day — post-earnings evaluation only.","priority":"HIGH"},
      {"date":"Jun 17","event":"GTT.PA ex-dividend. Watch for post-div dip to €170-175 entry zone.","priority":"MEDIUM"},
      {"date":"Jun 23 2026","event":"AVAV Q4 FY2026 earnings. CORRECTED from Jun 30. Stop $155 — buffer $2.94 at current $157.94. T31 structural reference. Binary event.","priority":"HIGH"},
      {"date":"Jun 30","event":"CCL Q2 earnings. Peace deal primary. Zero fuel hedges.","priority":"HIGH"},
      {"date":"Jul 1 2026","event":"MU Q3 FY2026 earnings. MONITORING only. SI-35 prevents meaningful entry at $724. Speculative 2-3 shares only if chosen (SI-37 allocation).","priority":"MEDIUM"},
      {"date":"Jul 4 2026","event":"OKLO Groves test reactor criticality target. Enter post-criticality dip ~$50-55 (CORRECTED from $12-13 — stale). SI-37 cap $1,500. $1B ATM overhang — do not buy the spike.","priority":"HIGH"},
      {"date":"Jul 28 2026","event":"V re-entry gate. $305-315 only.","priority":"MEDIUM"},
      {"date":"Late Jul","event":"IBM Q2 FINAL GATE. Consulting 5%+ constant currency + guidance raised = hold. Otherwise managed exit.","priority":"HIGH"},
      {"date":"Aug 4","event":"ZETA Q2 earnings.","priority":"MEDIUM"},
      {"date":"Aug 12","event":"IonQ Q2 earnings. IONQ dip-buy $38-45 active — not triggered yet ($51.77).","priority":"HIGH"},
      {"date":"Jan 1 2028","event":"Russian TENEX uranium ban fully effective. LEU structural demand surge.","priority":"HIGH"}
    ]
  },
  "positions": [
    {"ticker":"IES","name":"Invinity Energy Systems","shares":3000,"avgPrice":17.49,"last":22.30,"unrealPnL":144,"unrealPct":27.5,"stopType":"MANUAL ALERT 12.5p","cur":"GBP","status":"HOLD — MANUAL ALERT 12.5p","note":"LDES decision pending."},
    {"ticker":"CODA","shares":250,"avgPrice":11.105,"last":11.47,"unrealPnL":91,"unrealPct":3.3,"stop":9.95,"status":"HOLD — STOP $9.95 — P14 DELIBERATE","note":"P14. More time given."},
    {"ticker":"ZETA","shares":191,"avgPrice":16.866,"last":17.25,"unrealPnL":73,"unrealPct":2.3,"stop":14.50,"status":"HOLD — STOP $14.50 — T43 — AUG 4 EARNINGS","note":"T43. 19 consecutive beats. Buffer $2.75. Aug 4 earnings gate."},
    {"ticker":"CGCT","shares":291,"avgPrice":10.295,"last":10.38,"unrealPnL":25,"unrealPct":0.8,"stop":null,"status":"HOLD — NO STOP — HOLD THROUGH MERGER — VOTE MAY 27","note":"HOLD confirmed. Vote May 27 10am ET (2pm UAE). Post-merger: FAC. DO NOT redeem. Confirm no-redemption with IBKR before May 25."},
    {"ticker":"LMT","shares":10,"avgPrice":516.831,"last":516.01,"unrealPnL":-8,"unrealPct":-0.2,"stop":479.77,"status":"HOLD — STOP $479.77","note":"Buffer $36.24. Structural rearmament thesis intact independent of Hormuz."},
    {"ticker":"CCL","shares":250,"avgPrice":24.70,"last":24.65,"unrealPnL":-13,"unrealPct":-0.2,"stop":23.00,"status":"HOLD — STOP $23.00 — T47 — PEACE DEAL PRIMARY","note":"T47. Zero fuel hedges — max earnings leverage on oil drop. Earnings Jun 30."},
    {"ticker":"NCLH","shares":75,"avgPrice":15.90,"last":15.54,"unrealPnL":-27,"unrealPct":-2.3,"stop":14.50,"status":"HOLD — STOP $14.50 — T48 — PEACE DEAL SECONDARY","note":"T48. Elliott 10%+ stake. Buffer $1.04 — watch. SI-37 sized."},
    {"ticker":"PYPL","shares":55,"avgPrice":45.639,"last":44.34,"unrealPnL":-71,"unrealPct":-2.8,"stop":37.50,"status":"HOLD — STOP $37.50 — T39","note":"T39: Q1 beat. TPV +11%. Buffer $6.84."},
    {"ticker":"MSTR","shares":15,"avgPrice":181.067,"last":176.15,"unrealPnL":-74,"unrealPct":-2.7,"stop":153.14,"status":"HOLD — STOP $153.14 — BTC $79K — $85K GATE UNMET — BTC FELL THIS WEEK","note":"CLARITY passed committee 15-9. BTC fell $81K→$79K this week — moving away from scale gate. Scale at $85K + CLARITY floor vote. Kill: BTC weekly close <$70K. Buffer $23.01."},
    {"ticker":"PATH","shares":320,"avgPrice":10.726,"last":10.27,"unrealPnL":-146,"unrealPct":-4.2,"stop":9.20,"status":"HOLD — STOP $9.20 — T23 LOCK MAY 26 — EARNINGS MAY 28","note":"15m chart confirms capitulation at $9.2002 (52wk low) with V-recovery to $10.37+. Higher lows since spike. Stop correctly placed at structural low. T23 lock May 26. DO NOT WIDEN (E28). ARR growth -30% YoY is key earnings risk."},
    {"ticker":"IBM","shares":26,"avgPrice":228.739,"last":219.12,"unrealPnL":-250,"unrealPct":-4.2,"stop":210.08,"status":"HOLD — STOP $210.08 — Q2 JULY GATE","note":"52wk low $212.34. Buffer $9.04. Q2 July: consulting 5%+ constant ccy + guidance raised = hold. Otherwise exit."},
    {"ticker":"IREN","shares":24,"avgPrice":55.042,"last":52.87,"unrealPnL":-52,"unrealPct":-3.9,"stop":52.00,"status":"HOLD — STOP $52.00 — T42 — SI-37 — CRITICAL $0.87 BUFFER","note":"CRITICAL: $52.87 vs stop $52.00 = $0.87 buffer. $2B convertible notes offering (dilutive) + Q3 miss ($144.8M vs $220M est) + BTC $79K = pressure. NVIDIA $3.4B + MSFT $9.7B contracts intact. Stop at structural March 2026 support — do NOT widen. If triggered Monday, accept. Do not add."},
    {"ticker":"LEU","shares":15,"avgPrice":191.63,"last":181.62,"unrealPnL":-150,"unrealPct":-5.2,"stop":158.17,"status":"HOLD — STOP $158.17 — T52 — HALEU TOLL ROAD","note":"Chart confirms stop at $158.17 is below March 2026 structural base. $3.9B backlog. $900M DOE task order. OKLO JV. Russian TENEX ban Jan 2028. T53 conditional pullback at $170-175 still valid."},
    {"ticker":"AVAV","shares":15,"avgPrice":185.067,"last":157.94,"unrealPnL":-408,"unrealPct":-14.7,"stop":155.00,"status":"HOLD — STOP $155 — T31 — EARNINGS JUN 23 — BUFFER $2.94","note":"EARNINGS DATE CORRECTED: Jun 23 (not Jun 30). Buffer $2.94. 52wk low $156. 15m chart: sharp crash May 13, failed recovery, grinding lower. Stop at structural floor — likely triggered this week. DO NOT exit manually (E28 + rules discipline). T31 structural reference."},
    {"ticker":"UUUU","shares":50,"avgPrice":22.011,"last":18.38,"unrealPnL":-183,"unrealPct":-16.5,"stop":16.50,"status":"HOLD — STOP $16.50 — T22 CEILING","note":"Uranium sector weak. T22 ceiling at CRML+LAC+UUUU. LEU is nuclear infrastructure — separate bucket. Buffer $1.88."}
  ],
  "pendingGTCs": [
    {"ticker":"LAC","action":"BUY","limit":4.80,"stop":4.00,"qty":220,"maxLoss":176,"status":"GTC $4.80 / STOP $4.00 — SI-37","note":"Thacker Pass Phase 1."},
    {"ticker":"TXT","action":"BUY","limit":88.00,"stop":79.00,"qty":55,"maxLoss":495,"status":"GTC $88 PENDING","note":"Bell MV-75 Valor."}
  ],
  "watchList": [
    {"ticker":"IONQ","thesis":"Stage 2 COMPLETE. Trapped-ion quantum. Q1 rev $64.7M +755% YoY. RPO $470M. $3.1B cash. GROWTH THESIS. Current $51.77 — well above $38-45 dip-buy zone. R/R at $51.77 fails 3:1 minimum (1.5:1). No entry at current levels.","entry":"Dip buy $38-45 ONLY. Stop $27. Target $80-100.","gate":"Q2 earnings Aug 12. T23 lock ~Aug 10. No entry above $45.","status":"ACTIVE — DIP BUY $38-45 — ABOVE ZONE AT $51.77"},
    {"ticker":"TUI1","name":"TUI AG","thesis":"Peace deal re-rating. H1 published. EBIT guidance €1.1-1.4B EUR.","entry":"€5.80-6.20. Stop €4.90. Target €9.20.","gate":"Currently above zone. Wait for pullback.","status":"ACTIVE — ABOVE ZONE — WAIT"},
    {"ticker":"SIX2","name":"Sixt SE","thesis":"German premium car rental. Q1 miss. Peace deal / consumer recovery.","entry":"€62-65. Stop €54. Target €97.","gate":"Above zone. Wait for pullback.","status":"ACTIVE — ABOVE ZONE — WAIT"},
    {"ticker":"RYAAY","name":"Ryanair","thesis":"European LCC. Peace deal = fuel cost drop + Med booking recovery. Current $53.70. R/R at $53.70: 3.03:1 — just at 3:1 minimum but BELOW 4:1 T32 event bounce requirement. Entry ONLY at $52 or below for 4.4:1 R/R.","entry":"$52 or below ONLY. Stop $47. Target $74 (52wk high).","gate":"May 21 FY earnings. P24 block lifts post-print. If gaps below $52 — verify thesis not broken before entering. Do not chase above $52.","status":"ACTIVE — P24 BLOCK UNTIL MAY 21 — ENTRY ONLY AT $52 OR BELOW"},
    {"ticker":"CRM","name":"Salesforce","thesis":"STAGE 2 COMPLETE. Down 43% from ATH. 12.73x forward PE — cheapest large-cap SaaS. Agentforce ARR $800M up 169% YoY. 29,000 deals. RPO $72.4B. $25B buyback. Current $173.51 — IN ENTRY ZONE. Chart: clean base forming at $165-185 after downtrend from $300. 6-7 weeks of consolidation — constructive structure. P6 test: PASS.","entry":"$165-185 post-earnings. Stop ~$152. Max 27sh at $170 entry.","gate":"Earnings May 27 AMC. CONDITIONAL: beat + Agentforce ARR >$1B required. T23 lock May 25. DO NOT ENTER PRE-EARNINGS.","status":"ACTIVE — CONDITIONAL — EARNINGS MAY 27 AMC — IN ZONE"},
    {"ticker":"T53_LEU","name":"LEU Conditional Second Tranche","thesis":"Pullback entry on sector noise. Chart shows structural support zone $170-180. Stop $150. 13sh.","entry":"$170-175. Stop $150. 13 shares.","gate":"No DOE failure. No thesis break. Combined max loss T52+T53 ~$820.","status":"MONITORING — CONDITIONAL PULLBACK TRIGGER"},
    {"ticker":"RCL","name":"Royal Caribbean","thesis":"Peace deal bounce. 60% hedged. Quality operator.","entry":"$255-270. Stop $245. Target $320-340.","gate":"No third cruise while CCL+NCLH active.","status":"MONITORING — GATE: CCL/NCLH RESOLUTION FIRST"},
    {"ticker":"MU","name":"Micron Technology","thesis":"MONITORING ONLY. HBM supercycle. FY26 EPS ~$58. Forward PE 7.89x at $724.73. Stage 2 missed — price ran $454→$724 (+71%). SI-35 prevents meaningful sizing (max 3 shares at 20% stop = $434 risk). Cyclical risk: PE based on peak earnings. July 1 earnings catalyst. T35 lesson permanently filed.","entry":"Speculative only: 2-3 shares, stop $580 (-20%), max loss ~$435. Not a thesis position.","gate":"July 1 earnings. MONITORING only. Cannot be ACTIVE under SI-35 constraints.","status":"MONITORING — SI-35 PREVENTS ACTIVE — SPECULATIVE ONLY"},
    {"ticker":"GTT","name":"Gaztransport Technigaz","thesis":"Capital-light LNG royalty. 68% EBITDA margin. Hormuz = LNG demand. Currently €209.40 — above €170-175 entry zone.","entry":"€170-175. Stop €158. Target €235.","gate":"Ex-div June 17. Watch for post-div dip to €170-175.","status":"MONITORING — WAIT POST-JUNE 17 EX-DIV"},
    {"ticker":"MSTR_SCALE","name":"MicroStrategy scale","thesis":"CLARITY Act passed committee 15-9. Full Senate floor vote needs 60 votes. BTC fell $81K→$79K this week — moving away from scale gate. Monitor weekly close.","entry":"Market on BTC $85K + CLARITY floor vote pass.","gate":"BTC now $6K below gate. Monitor. No action until $85K close.","status":"MONITORING — BTC $6K BELOW GATE"},
    {"ticker":"LULU","name":"Lululemon","thesis":"At 52-week low $119.04 (EOD). Down 65% from ATH. Forward PE 9.6x. HOWEVER: fundamental deterioration — EPS declining (FY26 guide $12.10-12.30 vs $13.26 in 2025), revenue decelerating to 4.9%, FCF -41.8%, proxy fight (Chip Wilson vs board), controversial Nike CEO hire. NOT a T27 turnaround (guidance cuts not beats). Elliott >$1B stake provides floor. Post-May 28 earnings evaluation only.","entry":"Post May 28 earnings ONLY if: beat + guidance stabilisation + ARR trajectory confirmed. No pre-earnings entry.","gate":"Q1 FY2027 earnings May 28 AMC. P24 block. Re-evaluate thesis post-print.","status":"MONITORING — EARNINGS MAY 28 — THESIS REASSESSMENT REQUIRED"},
    {"ticker":"OKLO","name":"Oklo Inc","thesis":"SMR/advanced fission. July 4 Groves criticality target. $1.4B cash. NVIDIA partnership. Meta 1.2GW pipeline. Current $62. $1B ATM overhang — enter POST-criticality DIP not spike. ENTRY ZONE CORRECTED: $50-55 (old $12-13 entry was completely stale).","entry":"Post July 4 criticality dip ~$50-55. SI-37 cap $1,500. Do not buy spike.","gate":"July 4 criticality target. ATM overhang caps any rally. Entry zone updated.","status":"UNIVERSE — JULY 4 CRITICALITY GATE — ENTRY $50-55"},
    {"ticker":"CSCO","name":"Cisco Systems","thesis":"UNIVERSE — STAGE 1 INITIATED S45. Q3 FY2026: Revenue $15.8B +12% YoY, AI hyperscaler orders raised $5B→$9B for FY26, networking +25%, product orders +35%. Stock +13-14% post-earnings. FY26 guidance $62.8-63B, EPS $4.27-4.29. At $116: forward PE ~27x. P13 applies — do not enter within 5% of post-earnings breakout. Wait for consolidation.","entry":"Stage 1 needed. P13 applies at current levels. Wait for pullback to ~$100-108 range.","gate":"Stage 1 complete before entry consideration. P13 — post-breakout zone off-limits.","status":"UNIVERSE — P13 APPLIES — WAIT FOR CONSOLIDATION"},
    {"ticker":"DELL","name":"Dell Technologies","thesis":"UNIVERSE — STAGE 1 INITIATED S45. Q4 FY2026: Revenue $33.4B +39% YoY, AI server revenue $9B +342%, $43B backlog. FY27 guidance: $138-142B (+23%), AI server revenue ~$50B (+103%). Stock +22% on May 15. At $148: forward PE ~11.5x for 23% growth. Anomalously cheap IF margins hold. Risk: thin margins (ISG 14.8%), assembler not manufacturer, hyperscaler direct-procurement risk.","entry":"Stage 1 needed. P13 applies. Wait for pullback to $120-130.","gate":"Stage 1 required. P13 — post-earnings move off-limits. Margin trajectory is Stage 2 primary question.","status":"UNIVERSE — P13 APPLIES — WAIT FOR CONSOLIDATION"},
    {"ticker":"BWXT","name":"BWX Technologies","thesis":"Nuclear defense/infrastructure. Rev $3.19B +18%. Own SMR (BANR). Defense caution applies.","entry":"$183 SI-39 trigger (-15% from $216 reference).","gate":"Currently ~$208 — need -15% correction.","status":"UNIVERSE — SI-39 WATCHLIST AT $183"},
    {"ticker":"SOFI","name":"SoFi Technologies","thesis":"T27 turnaround pattern. 52% below ATH. Fintech.","entry":"$13-14 on pullback.","gate":"PYPL (T39) resolved first.","status":"MONITORING — PYPL GATE FIRST"},
    {"ticker":"ENGIE_PA","name":"Engie SA","thesis":"DEMOTED TO UNIVERSE S44. Chart shows near all-time high after rally €12 to €29. Morningstar 235% premium to fair value — unresolved. Re-entry zone €22-24. Belgian nuclear asset sale resolution + UKPN close (mid-2026) are catalysts.","entry":"€22-24 on pullback only.","gate":"Stage 2 required. Morningstar premium must be specifically disproven. Chart must show consolidation not distribution.","status":"UNIVERSE — DEMOTED S44 — DO NOT ENTER AT CURRENT €27"},
    {"ticker":"POET","name":"POET Technologies","thesis":"Silicon photonics. Q1 earnings May 22. Governance flag active. ALERT: price appears to have moved significantly from $7.23 (journal) — verify actual price at S46 open before any action.","entry":"Post May 22 Q1 earnings only. Rev must exceed $500K. Verify current price first.","gate":"Q1 May 22 gate. Governance flag requires T34 triage.","status":"UNIVERSE — MAY 22 GATE — VERIFY PRICE"},
    {"ticker":"ANDURIL","name":"Anduril Industries","thesis":"PRIVATE. S-1 filing = same-week Stage 1.","entry":"IPO only.","gate":"S-1 filing watch.","status":"IPO WATCH"}
  ],
  "shortWatchlist": [
    {"ticker":"PLTR","thesis":"Dormant until Q2 July 2026.","status":"DORMANT UNTIL Q2 JULY","trigger":"Q2 guidance cut only"},
    {"ticker":"AAL","thesis":"No fuel hedge, $36.5B debt.","trigger":"Dead-cat bounce $13-14.","status":"WATCH"},
    {"ticker":"SNOW","thesis":"18x forward revenue.","trigger":"Earnings miss + guidance trim.","status":"WATCH"}
  ],
  "macroRisk": {
    "title":"MARKET OVERVALUATION + HAWKISH FED REGIME CHANGE — ACTIVE FLAG",
    "shillerCAPE":"~39.1x as of May 2026 — 46% above 20yr average of 27.6. Implied 10yr forward return: 1.5%.",
    "forwardPE":"~21.5x — above 5yr avg 20x and 10yr avg 18.8x",
    "fedChange":"Kevin Warsh confirmed as new Fed Chair (May 15). More hawkish than Powell. 10-year yield at 4.416% multi-month high. Import prices +1.9% April = +4.2% YoY. Oil $102 = cost-push inflation Fed cannot control with rate hikes.",
    "context":"Stagflation-adjacent: high oil, rising yields, hawkish new Fed chair, CAPE 39x. Every growth multiple under pressure.",
    "fundImplications":[
      "Every new entry must explicitly pass P6 test — no narrative-justified multiples",
      "Stops are primary correction protection — never widen on losing positions (E28)",
      "ATH entries require SI-48 pass with specific valuation case",
      "Event bounce plays require minimum 3:1 R/R arithmetic written out before entry (T32)",
      "New hawkish Fed regime = compression risk on high-multiple positions — size accordingly"
    ]
  },
  "clarityAct": {
    "title":"CLARITY ACT — COMMITTEE PASSED 15-9 — BTC FELL THIS WEEK",
    "status":"Senate Banking Committee passed 15-9 bipartisan. Full Senate floor vote required. Needs 60 votes (7+ Democrat crossovers). Legislative window: July-October 2026.",
    "btcCurrent":79000,
    "mstrScaleGate":85000,
    "action":"BTC fell $81K→$79K this week — moving AWAY from scale gate. CLARITY positive medium-term. No MSTR action until BTC weekly close above $85K. Kill switch $70K remains distant.",
    "killSwitch":"BTC weekly close less than $70K"
  },
  "weeklyReview": {
    "title":"WEEKLY REVIEW #1 — WEEK ENDING 16 MAY 2026 — COMPLETED S44/S45",
    "verdict":"FLAT/IMPROVING",
    "keyReason":"Framework v2.0 operational. Full scan + chart review completed S45. Two unrecorded stop-outs identified (SNPS, RR.L). IREN at critical stop proximity. AVAV grinding toward stop. PATH capitulation confirmed constructive. CRM chart base intact pre-earnings.",
    "improvementsImplemented":["SI-83: Stage 2 Active Request Protocol","SI-84: Chart Screenshot Request Protocol","S45: Inline scan responses (no document creation)"]
  },
  "tradeTracker": {
    "closedTrades": [
      {"id":1,"ticker":"CCL","dateIn":"2026-03-24","dateOut":"2026-03-26","qty":240,"entry":24.83,"exit":25.35,"ccy":"USD","pnlUSD":122.35,"note":"S07."},
      {"id":2,"ticker":"ONDS","dateIn":"2026-03-24","dateOut":"2026-03-30","qty":250,"entry":10.90,"exit":8.505,"ccy":"USD","pnlUSD":-601.30,"note":"Stopped."},
      {"id":3,"ticker":"KTOS","dateIn":"2026-03-24","dateOut":"2026-03-30","qty":100,"entry":81.00,"exit":64.977,"ccy":"USD","pnlUSD":-1604.27,"note":"P12."},
      {"id":4,"ticker":"UEC","dateIn":"2026-03-25","dateOut":"2026-03-31","qty":206,"entry":13.77,"exit":13.16,"ccy":"USD","pnlUSD":-127.76,"note":"Stopped."},
      {"id":5,"ticker":"IAG","dateIn":"2026-03-27","dateOut":"2026-04-01","qty":2200,"entry":3.55,"exit":3.70,"ccy":"GBP","pnlUSD":407.36,"note":"Peace thesis broken."},
      {"id":6,"ticker":"RCL","dateIn":"2026-03-24","dateOut":"2026-04-02","qty":36,"entry":273.54,"exit":269.91,"ccy":"USD","pnlUSD":-132.89,"note":"Stopped."},
      {"id":7,"ticker":"LEU","dateIn":"2026-03-24","dateOut":"2026-04-07","qty":13,"entry":188.79,"exit":170.26,"ccy":"USD","pnlUSD":-242.94,"note":"T7 stop too tight. Re-entered T52."},
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
      {"id":19,"ticker":"RR","dateIn":"2026-03-26","dateOut":"2026-04-22","qty":150,"entry":1182.88,"exit":1150.00,"ccy":"GBP","pnlUSD":-62.39,"note":"Stopped. Re-entry 100sh as T56."},
      {"id":20,"ticker":"ITM","dateIn":"2026-04-01","dateOut":"2026-04-24","qty":800,"entry":65.1,"exit":141.20,"ccy":"GBP","pnlUSD":770.00,"note":"Trim 2."},
      {"id":21,"ticker":"LLY","dateIn":"2026-04-16","dateOut":"2026-04-25","qty":3,"entry":905.344,"exit":875.54,"ccy":"USD","pnlUSD":-89.41,"note":"Stopped."},
      {"id":22,"ticker":"CODA","dateIn":"2026-04-08","dateOut":"2026-04-27","qty":416,"entry":12.005,"exit":11.42,"ccy":"USD","pnlUSD":-243.36,"note":"Stopped. P11 re-entry."},
      {"id":23,"ticker":"ISRG","dateIn":"2026-03-24","dateOut":"2026-04-27","qty":22,"entry":459.246,"exit":471.676,"ccy":"USD","pnlUSD":272.24,"note":"Stop triggered."},
      {"id":24,"ticker":"ITM","dateIn":"2026-04-01","dateOut":"2026-04-28","qty":1200,"entry":65.1,"exit":130.39,"ccy":"GBP","pnlUSD":1041.00,"note":"AIM wick. ITM total +$2,639."},
      {"id":25,"ticker":"ABBV","dateIn":"2026-04-22","dateOut":"2026-04-29","qty":20,"entry":205.22,"exit":191.1608,"ccy":"USD","pnlUSD":-282.27,"note":"Stop BMO."},
      {"id":26,"ticker":"PDYN","dateIn":"2026-03-25","dateOut":"2026-04-29","qty":250,"entry":6.595,"exit":5.815,"ccy":"USD","pnlUSD":-196.00,"note":"Manual exit."},
      {"id":27,"ticker":"CCJ","dateIn":"2026-03-24","dateOut":"2026-04-28","qty":49,"entry":104.021,"exit":119.97,"ccy":"USD","pnlUSD":782.00,"note":"T23. Re-entry 50sh."},
      {"id":28,"ticker":"VST","dateIn":"2026-04-08","dateOut":"2026-04-29","qty":53,"entry":150.569,"exit":156.53,"ccy":"USD","pnlUSD":316.00,"note":"GTC triggered."},
      {"id":29,"ticker":"PDYN","dateIn":"2026-04-29","dateOut":"2026-04-30","qty":250,"entry":5.7507,"exit":5.85,"ccy":"USD","pnlUSD":-25,"note":"E9 short covered."},
      {"id":30,"ticker":"MSFT","dateIn":"2026-04-14","dateOut":"2026-04-30","qty":25,"entry":372.77,"exit":410.38,"ccy":"USD","pnlUSD":940,"note":"Stop triggered. Re-entered 25sh."},
      {"id":31,"ticker":"NOG","dateIn":"2026-03-26","dateOut":"2026-05-01","qty":80,"entry":24.383,"exit":26.50,"ccy":"USD","pnlUSD":169.36,"note":"Stop triggered."},
      {"id":32,"ticker":"V","dateIn":"2026-03-24","dateOut":"2026-05-05","qty":8,"entry":307.125,"exit":321.823,"ccy":"USD","pnlUSD":117.58,"note":"T28. Re-entry $305-315."},
      {"id":33,"ticker":"NOG","dateIn":"2026-05-04","dateOut":"2026-05-07","qty":200,"entry":26.771,"exit":25.11,"ccy":"USD","pnlUSD":-332.20,"note":"Iran noise."},
      {"id":34,"ticker":"R3NK","dateIn":"2026-04-08","dateOut":"2026-05-07","qty":25,"entry":52.27,"exit":53.44,"ccy":"EUR","pnlUSD":31.59,"note":"T30."},
      {"id":35,"ticker":"R3NK","dateIn":"2026-05-07","dateOut":"2026-05-11","qty":25,"entry":52.00,"exit":47.01,"ccy":"EUR","pnlUSD":-136,"note":"T35. T31 vindicated."},
      {"id":36,"ticker":"AMPX","dateIn":"2026-05-05","dateOut":"2026-05-07","qty":168,"entry":18.106,"exit":17.94,"ccy":"USD","pnlUSD":-27.89,"note":"Gapped stop."},
      {"id":37,"ticker":"MRVL","dateIn":"2026-03-24","dateOut":"2026-05-07","qty":10,"entry":152.10,"exit":160.02,"ccy":"USD","pnlUSD":79.20,"note":"Stop triggered."},
      {"id":38,"ticker":"CEG","dateIn":"2026-05-04","dateOut":"2026-05-07","qty":14,"entry":308.072,"exit":314.77,"ccy":"USD","pnlUSD":93.77,"note":"Stop raised then triggered."},
      {"id":39,"ticker":"PYPL","dateIn":"2026-05-08","dateOut":null,"qty":55,"entry":45.639,"exit":null,"ccy":"USD","pnlUSD":null,"note":"T39: Q1 beat. Stop $37.50. OPEN."},
      {"id":41,"ticker":"R3NK","dateIn":"2026-05-11","dateOut":"2026-05-12","qty":200,"entry":46.485,"exit":43.9925,"ccy":"EUR","pnlUSD":-543,"note":"T41: Stop vindicated. CLOSED."},
      {"id":42,"ticker":"IREN","dateIn":"2026-05-11","dateOut":null,"qty":24,"entry":55.042,"exit":null,"ccy":"USD","pnlUSD":null,"note":"T42: NVIDIA $3.4B. SI-37. CRITICAL: $0.87 from stop. OPEN."},
      {"id":43,"ticker":"ZETA","dateIn":"2026-05-11","dateOut":null,"qty":191,"entry":16.866,"exit":null,"ccy":"USD","pnlUSD":null,"note":"T43: 19 beats. Aug 4. OPEN."},
      {"id":44,"ticker":"PATH","dateIn":"2026-05-11","dateOut":null,"qty":320,"entry":10.726,"exit":null,"ccy":"USD","pnlUSD":null,"note":"T44: Agentic AI. Stop $9.20. 15m chart: capitulation at $9.2002 confirmed, V-recovery intact. Earnings May 28. T23 lock May 26. OPEN."},
      {"id":45,"ticker":"LDO","dateIn":"2026-03-27","dateOut":"2026-05-12","qty":35,"entry":56.086,"exit":50.00,"ccy":"EUR","pnlUSD":-232,"note":"T45: Stop €50. P28 codified. CLOSED."},
      {"id":46,"ticker":"AMZN","dateIn":"2026-03-24","dateOut":"2026-05-12","qty":30,"entry":201.204,"exit":263.943,"ccy":"USD","pnlUSD":1882,"note":"T46: +31.2%. Largest gain. CLOSED."},
      {"id":47,"ticker":"CCL","dateIn":"2026-05-13","dateOut":null,"qty":250,"entry":24.70,"exit":null,"ccy":"USD","pnlUSD":null,"note":"T47: Peace deal primary. Stop $23. OPEN."},
      {"id":48,"ticker":"NCLH","dateIn":"2026-05-13","dateOut":null,"qty":75,"entry":15.90,"exit":null,"ccy":"USD","pnlUSD":null,"note":"T48: Peace deal secondary. Stop $14.50. Buffer $1.04 — watch. OPEN."},
      {"id":49,"ticker":"MSFT","dateIn":"2026-04-30","dateOut":"2026-05-13","qty":25,"entry":403.052,"exit":402.09,"ccy":"USD","pnlUSD":-24,"note":"T49: Stop triggered. CLOSED."},
      {"id":50,"ticker":"CCJ","dateIn":"2026-04-29","dateOut":"2026-05-13","qty":50,"entry":117.02,"exit":112.17,"ccy":"USD","pnlUSD":-243,"note":"T50: Bridge collapse. T22 ceiling. CLOSED."},
      {"id":51,"ticker":"BAH","dateIn":"2026-04-08","dateOut":"2026-05-13","qty":33,"entry":76.531,"exit":69.00,"ccy":"USD","pnlUSD":-249,"note":"T51: Stop triggered. CLOSED."},
      {"id":52,"ticker":"LEU","dateIn":"2026-05-14","dateOut":null,"qty":15,"entry":191.63,"exit":null,"ccy":"USD","pnlUSD":null,"note":"T52: HALEU toll road. Fill $191.63. Stop $158.17 IBKR. Chart confirms stop below March 2026 structural base. OPEN."},
      {"id":53,"ticker":"CRML","dateIn":"2026-03-24","dateOut":"2026-05-15","qty":110,"entry":9.08,"exit":11.1744,"ccy":"USD","pnlUSD":230.38,"note":"S44: Stop $11.20 triggered. P21 speculative. T22 ceiling blocks re-entry. CLOSED."},
      {"id":54,"ticker":"ABVX","dateIn":"2026-04-06","dateOut":"2026-05-15","qty":50,"entry":109.89,"exit":120.909,"ccy":"USD","pnlUSD":550.95,"note":"S44: Voluntary close. M&A exception. P4 worked. CLOSED."},
      {"id":55,"ticker":"SNPS","dateIn":"2026-03-24","dateOut":"2026-05-15","qty":8,"entry":495.125,"exit":496.65,"ccy":"USD","pnlUSD":12.20,"note":"S45: Stop $496.76 triggered at $496.65 (filled $0.11 below — normal). Recovered to $499.81 post-stop. Do not chase — T23 lock May 25 ahead of May 27 AMC earnings. Small gain. CLOSED."},
      {"id":56,"ticker":"RR","dateIn":"2026-04-23","dateOut":"2026-05-15","qty":100,"entry":1128.60,"exit":1149.20,"ccy":"GBP","pnlUSD":26.16,"note":"S45: Stop 1149.4p triggered at 1149.20p (filled 0.20p below — normal DARK execution). RR.L fell further to 1140p after stop — stop protected additional losses. Re-entry after T19. Approx entry date. CLOSED."}
    ],
    "lastUpdated":"2026-05-16 S45 CLOSE. 56 rows (48 closed + 8 open). T55 SNPS +$12.20, T56 RR.L +$26.16 — both stopped May 15, confirmed from IBKR Trades tab. Open: T39 PYPL, T42 IREN, T43 ZETA, T44 PATH, T47 CCL, T48 NCLH, T52 LEU. Note: T40 unused."
  },
  "sessionNotes": [
    {"date":"2026-05-07","note":"S37: LMT stop raised. RR.L Q1 beat. NOG T33 sold. R3NK T34/T35. AMPX/MRVL/CEG closed. NCH2 cancelled."},
    {"date":"2026-05-08","note":"S38: SNPS+MSFT stops raised. T39 PYPL. UUUU Q1 beat. CENTCOM strikes."},
    {"date":"2026-05-09","note":"S39: Rules framework overhauled. SI-69-76 added. 4 stop changes. 15 new watchlist entries."},
    {"date":"2026-05-11","note":"S40: T35 R3NK stopped. T41/T42/T43/T44 entered. AMZN stop raised. Net liq $104.2K."},
    {"date":"2026-05-12","note":"S41: T45 LDO -$232. T41 R3NK -$543. T46 AMZN +$1,882. Net +$1,107. Framework v2.0. Net liq $102.3K."},
    {"date":"2026-05-13","note":"S42: T47 CCL @$24.70. T48 NCLH @$15.90. T49 MSFT -$24. T50 CCJ -$243. T51 BAH -$249. Net -$516. PATH $0.25 buffer critical. CLARITY tonight. Trump-Xi tomorrow."},
    {"date":"2026-05-14","note":"S43: CGCT hold through Factorial merger confirmed (P29). LEU Stage 2 complete. T52 LEU 15sh @$191.63 entered. ABVX GTC orphan $114.90 flagged. CLARITY result pending. Net liq ~$100.8K. 19 positions."},
    {"date":"2026-05-15","note":"S44: CRML stopped +$230.38. ABVX voluntarily closed +$550.95. LEU fill confirmed $191.63 stop $158.17. CLARITY passed 15-9 committee. BTC ~$81K. Trump-Xi: Hormuz must remain open — SI-25 Condition 1 UNMET. PATH intraday low $9.2002 stop NOT triggered. ENGIE.PA demoted UNIVERSE. CRM elevated ACTIVE conditional. First weekly review completed. SI-83+SI-84 added. 17 positions (journal — corrected to 15 in S45)."},
    {"date":"2026-05-16","note":"S45 SAT: Full scan completed. DISCOVERED: SNPS stopped May 15 at $496.65 (+$12.20, T55) and RR.L stopped May 15 at 1149.20p (+$26.16, T56) — neither in journal. Actual position count 15 not 17. BTC fell $81K→$79K. WTI rose to $102 — SI-25 Condition 2 moving wrong direction. Kevin Warsh confirmed new Fed Chair (hawkish). 10yr yield 4.416%. Chart reviews: IREN $0.87 from stop — hold to stop, no action. AVAV $2.94 from stop — hold to stop, no manual exit (E28 discipline confirmed). PATH 15m chart shows capitulation at $9.20 with V-recovery — constructive, hold. LEU chart confirms stop below structural base — well placed. CRM chart shows clean base at $165-185 — entry setup valid for May 27. Corrections: AVAV earnings Jun 23 (not Jun 30). OKLO entry $50-55 (not $12-13). CSCO+DELL added UNIVERSE. Net liq ~$101K est."}
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
  const tabs=["positions","gtcs","watch","peace","leu","cgct","clarity","macro","shorts","tracker","notes"];
  const pnlColor=(v)=>v>0?COLORS.green:v<0?COLORS.red:COLORS.textDim;
  const sc=(s)=>s?.includes("ACTIVE")?COLORS.green:s?.includes("MONITORING")?COLORS.accent:s?.includes("DO NOT")||s?.includes("UNIVERSE")?COLORS.red:s?.includes("ENTERED")?COLORS.purple:COLORS.yellow;
  const ub=(p)=>{if(p.status?.includes("WARNING")||p.status?.includes("CRITICAL"))return"3px solid "+COLORS.red;if(p.unrealPnL>200)return"3px solid "+COLORS.green;if(p.unrealPnL<-200)return"3px solid "+COLORS.red;if(p.status?.includes("NEW"))return"3px solid "+COLORS.blue;return undefined;};
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
            <div style={{fontSize:18,fontWeight:700,color:COLORS.textBright}}>CLAUDE FUND — JOURNAL v59 S45</div>
            <div style={{fontSize:11,color:COLORS.textDim,marginTop:2}}>Session 45 — Sat 16 May 2026 | {data.fund.account} | 15 positions</div>
          </div>
          <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
            {[{l:"NET LIQ",v:"~$101.0K"},{l:"CASH USD",v:"~$51.8K",c:COLORS.yellow},{l:"POSITIONS",v:"15"},{l:"S45 CLOSED",v:"SNPS+RR.L",c:COLORS.green}].map(m=>(
              <div key={m.l} className="card" style={{textAlign:"center",minWidth:76}}>
                <div style={{fontSize:9,color:COLORS.textDim}}>{m.l}</div>
                <div style={{fontSize:14,fontWeight:700,color:m.c||COLORS.textBright,marginTop:2}}>{m.v}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{marginTop:6,padding:"6px 10px",background:"rgba(248,81,73,.1)",border:"1px solid rgba(248,81,73,.3)",borderRadius:4,fontSize:11,color:COLORS.red}}>
          CRITICAL: IREN $0.87 from stop | AVAV $2.94 from stop (hold to stop — E28) | NCLH $1.04 buffer | BTC $79K falling
        </div>
        <div style={{marginTop:4,padding:"6px 10px",background:"rgba(88,166,255,.15)",border:"1px solid rgba(88,166,255,.4)",borderRadius:4,fontSize:11,color:COLORS.accent}}>
          S46 MON: SI-83 check | Verify IREN/AVAV stops | CGCT no-redemption confirm IBKR | RYAAY May 21 prep | NVDA earnings Wed 20
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
          <div style={{fontSize:11,color:COLORS.textDim,marginBottom:8}}>{data.watchList?.length} entries | ACTIVE slots: 5/5</div>
          <div style={{display:"flex",flexDirection:"column",gap:6}}>
            {data.watchList?.map((w,i)=>(
              <div key={i} className="card" style={{borderLeft:"3px solid "+sc(w.status)}}>
                <div style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap",marginBottom:3}}>
                  <span style={{fontWeight:700,fontSize:13,color:COLORS.textBright}}>{w.ticker}</span>
                  {w.name&&<span style={{fontSize:10,color:COLORS.textDim}}>{w.name}</span>}
                </div>
                <div style={{fontSize:10,color:sc(w.status),marginBottom:2,fontWeight:600}}>{w.status}</div>
                <div style={{fontSize:9,fontStyle:"italic",color:COLORS.textBright,marginBottom:3}}>{w.thesis?.substring(0,150)}{w.thesis?.length>150?"...":""}</div>
                {w.gate&&<div style={{fontSize:9,color:COLORS.yellow}}>Gate: {w.gate?.substring(0,120)}</div>}
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab==="peace"&&(
        <div className="card" style={{borderLeft:"4px solid "+COLORS.green}}>
          <div style={{fontWeight:700,color:COLORS.green,fontSize:13,marginBottom:4}}>PEACE DEAL PORTFOLIO</div>
          <div style={{fontSize:11,color:COLORS.yellow,fontWeight:600,marginBottom:8}}>CCL flat | NCLH -2.3% | RYAAY May 21 earnings — entry only at $52</div>
          {[data.positions?.find(p=>p.ticker==="CCL"),data.positions?.find(p=>p.ticker==="NCLH")].filter(Boolean).map((p,i)=>(
            <div key={i} className="card" style={{marginBottom:6,borderLeft:"3px solid "+(i===0?COLORS.green:COLORS.yellow)}}>
              <div style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap"}}>
                <span style={{fontWeight:700}}>{p.ticker}</span>
                <span className={"badge badge-"+(i===0?"green":"amber")}>{i===0?"PRIMARY":"SECONDARY"}</span>
                <span style={{fontSize:11,color:p.unrealPnL>=0?COLORS.green:COLORS.red}}>{p.unrealPnL>=0?"+$":"-$"}{Math.abs(p.unrealPnL)} ({p.unrealPct?.toFixed(1)}%)</span>
              </div>
              <div style={{fontSize:9,color:COLORS.textDim,marginTop:2}}>{p.note}</div>
            </div>
          ))}
          <div style={{padding:"8px",background:"rgba(248,81,73,.1)",borderRadius:4,fontSize:11,color:COLORS.red,marginTop:8}}>OIL RISK: WTI rose to $102 this week — moving wrong direction for CCL/NCLH. SI-25 Condition 2 further away. Positions are thesis-correct: waiting for deal, not reacting to daily oil moves.</div>
        </div>
      )}

      {activeTab==="leu"&&(
        <div className="card" style={{borderLeft:"4px solid "+COLORS.blue}}>
          <div style={{fontWeight:700,color:COLORS.blue,fontSize:13,marginBottom:4}}>LEU — CENTRUS ENERGY — T52 ACTIVE</div>
          <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:8}}>
            {[{l:"Fill",v:"$191.63"},{l:"Last",v:"$181.62"},{l:"Stop",v:"$158.17 (IBKR)"},{l:"Shares",v:"15"},{l:"Buffer",v:"$23.45"}].map((m,i)=>(
              <div key={i} className="card" style={{minWidth:80}}>
                <div style={{fontSize:9,color:COLORS.textDim}}>{m.l}</div>
                <div style={{fontSize:11,fontWeight:700,color:COLORS.textBright}}>{m.v}</div>
              </div>
            ))}
          </div>
          <div style={{fontSize:10,marginBottom:6}}>Chart: Stop at $158.17 confirmed below March 2026 structural base. Position in base zone $170-200. Only US NRC-licensed HALEU producer. $3.9B backlog. $900M DOE task order. OKLO JV. Russian TENEX ban Jan 2028.</div>
          <div style={{padding:"6px 10px",background:"rgba(248,81,73,.1)",borderRadius:4,fontSize:10,color:COLORS.red}}>THESIS BREAK: DOE task order explicitly cancelled | HALEU demand delayed past 2028 | Urenco/Orano achieve US HALEU ahead of schedule</div>
          <div style={{marginTop:6,padding:"6px 10px",background:"rgba(88,166,255,.1)",borderRadius:4,fontSize:10,color:COLORS.accent}}>T53 CONDITIONAL: $170-175 pullback, 13sh, stop $150. Combined T52+T53 max ~$827.</div>
        </div>
      )}

      {activeTab==="cgct"&&(
        <div className="card" style={{borderLeft:"4px solid "+COLORS.purple}}>
          <div style={{fontWeight:700,color:COLORS.purple,fontSize:13,marginBottom:4}}>CGCT → FACTORIAL HOLDINGS (FAC)</div>
          <div style={{fontSize:11,color:COLORS.red,fontWeight:700,marginBottom:6}}>VOTE MAY 27 10AM ET (2PM UAE) — CONFIRM NO REDEMPTION WITH IBKR BEFORE MAY 25</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:8}}>
            {[{l:"Shares",v:"291 @ $10.295"},{l:"Post-merger ticker",v:"FAC on Nasdaq",c:COLORS.blue},{l:"Vote date",v:"May 27 10am ET",c:COLORS.red},{l:"Merger close",v:"Expected June 2026"}].map((m,i)=>(
              <div key={i} className="card"><div style={{fontSize:9,color:COLORS.textDim}}>{m.l}</div><div style={{fontSize:12,fontWeight:700,color:m.c||COLORS.textBright}}>{m.v}</div></div>
            ))}
          </div>
          <div style={{fontSize:10,color:COLORS.textDim}}>Hold through merger. Redemption defeats thesis. Lock-up 6-12mo post-close.</div>
        </div>
      )}

      {activeTab==="clarity"&&(
        <div className="card" style={{borderLeft:"4px solid "+COLORS.purple}}>
          <div style={{fontWeight:700,color:COLORS.purple,fontSize:13,marginBottom:4}}>CLARITY ACT — COMMITTEE PASSED 15-9 — BTC FELL TO $79K</div>
          <div style={{fontSize:11,marginBottom:6}}>Senate Banking passed 15-9 bipartisan. Full Senate floor vote — needs 60 votes. Legislative window July-October 2026.</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:8}}>
            <div className="card"><div style={{fontSize:9,color:COLORS.textDim}}>BTC (fell this week)</div><div style={{fontSize:14,fontWeight:700,color:COLORS.red}}>~$79K</div></div>
            <div className="card"><div style={{fontSize:9,color:COLORS.textDim}}>Scale gate</div><div style={{fontSize:14,fontWeight:700,color:COLORS.yellow}}>$85K</div></div>
          </div>
          <div style={{padding:"8px",background:"rgba(248,81,73,.1)",borderRadius:4,fontSize:11,color:COLORS.red}}>BTC fell $81K→$79K this week — $6K below scale gate and moving wrong direction. No MSTR scale action. Kill switch $70K still distant ($9K away).</div>
        </div>
      )}

      {activeTab==="macro"&&(
        <div className="card" style={{borderLeft:"4px solid "+COLORS.red}}>
          <div style={{fontWeight:700,color:COLORS.red,fontSize:13,marginBottom:4}}>MACRO — HAWKISH FED REGIME CHANGE + OVERVALUATION ACTIVE</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:8}}>
            <div className="card"><div style={{fontSize:9,color:COLORS.textDim}}>Shiller CAPE</div><div style={{fontSize:14,fontWeight:700,color:COLORS.red}}>~39.1x</div></div>
            <div className="card"><div style={{fontSize:9,color:COLORS.textDim}}>10yr Treasury</div><div style={{fontSize:14,fontWeight:700,color:COLORS.red}}>4.416%</div></div>
            <div className="card"><div style={{fontSize:9,color:COLORS.textDim}}>WTI Crude</div><div style={{fontSize:14,fontWeight:700,color:COLORS.orange}}>~$102</div></div>
            <div className="card"><div style={{fontSize:9,color:COLORS.textDim}}>New Fed Chair</div><div style={{fontSize:14,fontWeight:700,color:COLORS.red}}>Warsh (hawkish)</div></div>
          </div>
          {data.macroRisk?.fundImplications?.map((imp,i)=>(
            <div key={i} style={{fontSize:10,color:COLORS.textDim,marginBottom:4,paddingLeft:8,borderLeft:"2px solid "+COLORS.red}}>{imp}</div>
          ))}
        </div>
      )}

      {activeTab==="shorts"&&(
        <div style={{display:"flex",flexDirection:"column",gap:6}}>
          {data.shortWatchlist?.map((s,i)=>(
            <div key={i} className="card" style={{borderLeft:"3px solid "+(s.status?.includes("DORMANT")?COLORS.textDim:COLORS.purple)}}>
              <div style={{fontWeight:700,marginBottom:2}}>{s.ticker} <span className={"badge badge-"+(s.status?.includes("DORMANT")?"grey":"purple")}>{s.status}</span></div>
              <div style={{fontSize:10,color:COLORS.textDim}}>{s.thesis} — Trigger: {s.trigger}</div>
            </div>
          ))}
        </div>
      )}

      {activeTab==="tracker"&&(
        <div>
          <div style={{fontSize:12,fontWeight:600,color:COLORS.accent,marginBottom:6}}>
            TRADE TRACKER — {data.tradeTracker?.closedTrades?.filter(t=>t.dateOut===null).length} OPEN | {data.tradeTracker?.closedTrades?.filter(t=>t.dateOut!==null).length} CLOSED
          </div>
          {data.tradeTracker?.closedTrades?.slice().reverse().map(t=>(
            <div key={t.id} className="card" style={{marginBottom:3,borderLeft:"3px solid "+(t.pnlUSD===null?COLORS.blue:t.pnlUSD>0?COLORS.green:COLORS.red)}}>
              <div style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap"}}>
                <span style={{fontSize:9,color:COLORS.textDim}}>#{t.id}</span>
                <span style={{fontWeight:600,fontSize:12}}>{t.ticker}</span>
                <span style={{fontSize:9,color:COLORS.textDim}}>{t.dateOut||"OPEN"}</span>
                {t.pnlUSD!==null?<span style={{fontWeight:700,color:pnlColor(t.pnlUSD)}}>{t.pnlUSD>0?"+$":"-$"}{Math.abs(t.pnlUSD).toFixed(0)}</span>:<span className="badge badge-blue">OPEN</span>}
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
        <span style={{fontSize:10,color:COLORS.textDim}}>v59 S45 | Sat 16 May 2026 | 15 pos | SNPS+RR.L stopped | Full scan done</span>
        <div style={{display:"flex",gap:4,flexWrap:"wrap"}}>
          <span className="badge badge-red">IREN $0.87 from stop</span>
          <span className="badge badge-red">AVAV $2.94 from stop</span>
          <span className="badge badge-amber">BTC $79K falling</span>
          <span className="badge badge-green">PATH capitulation confirmed</span>
          <span className="badge badge-green">CRM base intact</span>
          <span className="badge badge-red">Warsh — hawkish Fed</span>
        </div>
      </div>
    </div>
  );
}
