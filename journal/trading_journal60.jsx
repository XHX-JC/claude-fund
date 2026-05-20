import { useState, useEffect, useCallback } from "react";
const STORAGE_KEY = "fund_journal_v4";
// TIME: UAE=UTC+4. LSE 11:00 UAE. NYSE 17:30 UAE.
// E20: IBKR TWS only for live prices. E28: Never widen stop within 1pt of trigger.
// SI-68: No close files until screenshots confirmed. I17: NEW FILE EVERY SESSION — NEVER OVERWRITE.
// T31: Stop below 52W low on 40%+ ATH names. SI-35: Max loss $500/trade. T10: Thesis not sizing input.
// SI-83: Stage 2 Active Request — state overdue Stage 2s at every session open Step 1b.
// SI-84: Chart Screenshot Request — proactively request weekly charts before ACTIVE elevation.
// P20: Stop protection review activates at >10% unrealised profit.

const INITIAL_STATE = {
  "lastUpdated": "2026-05-19 S47 CLOSE. Full scan session. AVAV SI-84 chart reviewed (bearish, stop $155 intact). UUUU/LEU sector sweep (thesis intact, sector pressure). Apex Tech World report integrated (MSFT Stage 1, META+AI Photonics added UNIVERSE). RYAAY date corrected (reported Mon 18 May not Thu 21 May). NCLH thesis review: weakened not broken. HD earnings BMO — no entry triggered ($300, gate $280). TWO CRITICAL STOPS: NCLH $14.57 vs stop $14.50 (7c away), UUUU $16.78 vs stop $16.50 (28c away). Daily P&L -$700 (-0.69%). 15 positions.",
  "sessionNumber": "S47",
  "fund": {
    "account": "U24936508",
    "netLiquidity": 100900,
    "unrealizedPnL": -1205.20,
    "dailyPnL": -700.39,
    "dailyPnLPct": -0.69,
    "cashUSD": 41539,
    "cashGBP": 1787,
    "cashEUR": -465,
    "broker": "IBKR Pro",
    "note": "v60 S47 CLOSE. Tue 19 May 2026. 15 positions. Full scan + Apex report integrated. NCLH stop 7c away (CRITICAL). UUUU stop 28c away (CRITICAL). CCL stop 73c away (WATCH). AVAV stop 425c away (WATCH). MSFT promoted to MONITORING (Stage 1 complete, $395-410 entry). SGOV Friday $30K confirmed."
  },
  "offAccountReserves": {
    "note": "MATERIAL PORTFOLIO FACT: Significant cash reserves exist off the IBKR account. These are available for deployment at market bottom / crash opportunity. IBKR account is the active trading and hedging vehicle, not the sole capital base. This changes portfolio construction: IBKR should remain defensive (SGOV + IAU + active positions with stops). Crash deployment plan: IAU gains + external reserves deployed simultaneously at CAPE normalisation (20-25x target). Do not force IBKR cash into growth names ahead of crash.",
    "crashDeploymentPlan": "When CAPE falls to 20-25x (from current 40.93x): aggressively deploy both IBKR freed cash (from stops + SGOV) and external reserves into highest-conviction quality names at distressed valuations."
  },
  "thesis": {
    "title": "RATE HIKE PROBABILITY 45% — OIL $103-106 — BTC $76.9K — IAU ENTERED AS MACRO HEDGE",
    "summary": "Rate hike probability climbed to 45% (from 1% one month ago). WTI $103-106, up 11% last week. Hormuz effectively closed. Drone attacks this weekend. IEA: market undersupplied through October even if conflict resolves. Warsh hawkish. 10-year yield at 4.5%+. BTC fell to $76.9K. IAU entered as portfolio allocation macro hedge (no stop). SGOV $30K Friday. NVDA earnings Wednesday May 20 AMC. RYAAY Thursday May 21 AMC — entry gate $52 or below.",
    "oilWTI": 103.24,
    "SI25Trigger": 105.87,
    "SI25Status": "WTI $103-106. Condition 1: UNMET (operational reopening required). Condition 2: UNMET (need $95.28 — oil moving WRONG direction). Drone attacks weekend. IEA warns undersupply through Oct. Thesis INTACT AND STRENGTHENING.",
    "hormuzStatus": "Effectively closed. Drone attacks weekend. IEA warns global market materially undersupplied through October 2026 even if conflict resolved. US-Iran talks stalled on ethics provision and sanctions framework.",
    "rateHikeAlert": "MAJOR MACRO SHIFT: Fed rate hike probability 45% (was 1% one month ago). Highest odds: hike to 3.75%-4%. Driven by Hormuz oil inflation. This is stagflation scenario. Warsh cannot cut while oil at $103+. SGOV yield will rise if hike materialises — positive for T-bill allocation.",
    "keyDates": [
      {"date":"Tue 19 May BMO","event":"HOME DEPOT (HD) Q1 FY2026 earnings. Consensus $3.41 EPS, $41.5B revenue. Stock at 52-week low $296-299. Stage 1 begins post-print. Options pricing +/-3.72% swing. P24 block lifted post-print. Class action lawsuit filed May 15 — investigate before entry.","priority":"HIGH"},
      {"date":"Wed 20 May AMC","event":"NVDA Q1 FY2027 earnings. Consensus $78.76B revenue, $1.74 EPS. Not actionable — SI-39 trigger $159.14. Watch AI sector sentiment for ZETA/PATH/MSTR impact.","priority":"HIGH"},
      {"date":"Thu 21 May AMC","event":"RYAAY FY2026 earnings. ENTRY ONLY at $52 or below Friday. Current $53.70 — $1.70 from gate. P24 block lifts post-print. If gaps above $58 remove from ACTIVE. If drops to $52: 100sh, stop $47, $5,200 cost.","priority":"CRITICAL"},
      {"date":"Fri 22 May","event":"RYAAY post-earnings check at NYSE open (17:30 UAE). SGOV $30K order submission.","priority":"CRITICAL"},
      {"date":"Mon 25 May","event":"CRM T23 lock (48-72h before May 27 AMC). HD Stage 1 review due if not completed earlier.","priority":"HIGH"},
      {"date":"Tue 27 May 10am ET","event":"CGCT extraordinary shareholder vote. 10am ET = 2pm UAE. Hold confirmed. Post-merger ticker FAC. CONFIRM no redemption with IBKR before May 25.","priority":"CRITICAL"},
      {"date":"Tue 27 May AMC","event":"CRM Q1 FY2027 earnings. CONDITIONAL: beat + Agentforce ARR >$1B required. T23 lock May 25. Max 27sh at $165-185.","priority":"CRITICAL"},
      {"date":"Wed 28 May AMC","event":"PATH Q1 FY2027 earnings. T23 lock May 26. Stop $9.20. Key risk: net new ARR -30% YoY.","priority":"HIGH"},
      {"date":"Thu 29 May","event":"IAU thesis review trigger check: Has peace deal been announced? Has Warsh cut rates unexpectedly? If either: manual review. Otherwise hold.","priority":"MEDIUM"},
      {"date":"Jun 17","event":"GTT.PA ex-dividend. Watch for post-div dip to €170-175 entry zone.","priority":"MEDIUM"},
      {"date":"Jun 23","event":"AVAV Q4 FY2026 earnings. Stop $155 still active. T23 lock Jun 21.","priority":"HIGH"},
      {"date":"Jun 30","event":"CCL Q2 earnings. Peace deal primary.","priority":"HIGH"},
      {"date":"Jul 1","event":"MU Q3 FY2026 earnings. MONITORING only.","priority":"MEDIUM"},
      {"date":"Jul 4","event":"OKLO Groves test reactor criticality target. Entry post-criticality dip $50-55.","priority":"HIGH"},
      {"date":"Jul 28","event":"LEU Q2 earnings. Next LEU thesis checkpoint. GTT.PA H1 results same day.","priority":"HIGH"},
      {"date":"Late Jul","event":"IBM Q2 FINAL GATE. Consulting 5%+ constant currency + guidance raised = hold. Otherwise managed exit.","priority":"HIGH"},
      {"date":"Aug 4","event":"ZETA Q2 earnings.","priority":"HIGH"},
      {"date":"Aug 12","event":"IonQ Q2 earnings. IONQ dip-buy $38-45 active.","priority":"HIGH"},
      {"date":"Jan 1 2028","event":"Russian TENEX uranium ban effective. LEU structural demand surge.","priority":"HIGH"}
    ]
  },
  "positions": [
    {"ticker":"IES","name":"Invinity Energy Systems","shares":3000,"avgPrice":17.49,"last":23.00,"unrealPnL":165,"unrealPct":31.5,"stopType":"MANUAL ALERT 12.5p","cur":"GBP","status":"HOLD — MANUAL ALERT 12.5p","note":"LDES decision pending. +31.5% unrealised. +2.22% today."},
    {"ticker":"ZETA","shares":191,"avgPrice":16.866,"last":19.07,"unrealPnL":415,"unrealPct":12.9,"stop":16.98,"status":"HOLD — STOP RAISED $14.50→$16.98 — P20 ACTIVE — AUG 4 EARNINGS","note":"P20 protocol active. Stop $16.98 above breakeven. -0.63% today. Buffer $2.09 (11%). T23 lock ~Aug 2."},
    {"ticker":"CODA","shares":250,"avgPrice":11.105,"last":11.43,"unrealPnL":79,"unrealPct":2.8,"stop":9.95,"status":"HOLD — STOP $9.95 — P14 DELIBERATE","note":"P14. Stop intentionally below journal level. Small position. Flat day."},
    {"ticker":"CCL","shares":250,"avgPrice":24.706,"last":23.73,"unrealPnL":-242,"unrealPct":-3.9,"stop":23.00,"status":"HOLD — STOP $23.00 — T47 — PEACE DEAL PRIMARY — STOP 73c AWAY","note":"T47. DOWN 4.74% TODAY. Stop $23.00 = $0.73 away. Check news S48. SI-25 Conditions 1+2 both unmet. Buffer $0.73 (3.1%)."},
    {"ticker":"CGCT","shares":291,"avgPrice":10.295,"last":10.40,"unrealPnL":31,"unrealPct":1.0,"stop":null,"status":"HOLD — NO STOP — VOTE MAY 27 10AM ET — CONFIRM NO REDEMPTION BEFORE MAY 25","note":"Vote May 27. FAC post-merger. DO NOT redeem. Confirm no-redemption with IBKR before May 25. 3 sessions remaining."},
    {"ticker":"LMT","shares":10,"avgPrice":516.831,"last":525.46,"unrealPnL":90,"unrealPct":1.7,"stop":479.77,"status":"HOLD — STOP $479.77","note":"Buffer $45.69. Structural rearmament thesis. -0.54% today. Hormuz conflict supports thesis."},
    {"ticker":"IAU","name":"iShares Gold Trust","shares":175,"avgPrice":86.006,"last":84.26,"unrealPnL":-305,"unrealPct":-2.0,"stop":null,"status":"PORTFOLIO ALLOCATION — NO STOP — T57 — MACRO HEDGE","note":"T57. DOWN 1.75% today (-$1.50). Gold under pressure from rising rate hike expectations (45-60%). No stop: physical gold backing, patient capital. Japan 30yr yield at 4.079% (1997 highs) strengthens long-term thesis. Manual review triggers: (1) credible Hormuz operational reopening, (2) Warsh surprise rate cut. Key resistance: $92-96, $99.99, $104. Support: $84, $80-82."},
    {"ticker":"NCLH","shares":75,"avgPrice":15.914,"last":14.57,"unrealPnL":-101,"unrealPct":-8.4,"stop":14.50,"status":"HOLD — STOP $14.50 — CRITICAL: 7c BUFFER — EXPECT TRIGGER S48","note":"T48. STOP $0.07 AWAY. Down 4.52% today. Guidance cut May 4-5: -3% to -5% net yield (from approx flat), EPS -31.9%. Thesis WEAKENED not broken. Baupost (Klarman) initiated position. Stop $14.50 confirmed. Hold to stop — do not manually exit (E28). If triggered: realised loss ~-$106."},
    {"ticker":"PYPL","shares":55,"avgPrice":45.639,"last":44.09,"unrealPnL":-85,"unrealPct":-3.4,"stop":37.50,"status":"HOLD — STOP $37.50 — T39","note":"T39. -0.65% today. TPV +11%. Buffer $6.59."},
    {"ticker":"PATH","shares":320,"avgPrice":10.726,"last":10.94,"unrealPnL":62,"unrealPct":1.8,"stop":9.20,"status":"HOLD — STOP $9.20 — T23 LOCK MAY 26 — EARNINGS MAY 28","note":"+2.82% today. T23 lock May 26. Earnings May 28 AMC. Buffer $1.74 (15.9%). DO NOT WIDEN (E28). ARR -30% YoY is key risk at earnings. Best performer today."},
    {"ticker":"IBM","shares":26,"avgPrice":228.739,"last":223.40,"unrealPnL":-137,"unrealPct":-2.3,"stop":210.08,"status":"HOLD — STOP $210.08 — Q2 JULY GATE","note":"+0.29% today. Buffer $13.32. Q2 July: consulting 5%+ constant ccy + raised guidance = hold. Post-quantum thesis via Azure Quantum adjacent (see MSFT MONITORING)."},
    {"ticker":"LEU","shares":15,"avgPrice":191.697,"last":168.49,"unrealPnL":-348,"unrealPct":-12.1,"stop":158.17,"status":"HOLD — STOP $158.17 — T52 — HALEU — CHART BEARISH NEAR-TERM","note":"S47 sector sweep: uranium spot $85.95/lb (retreat from $100 high). Thesis intact — REE expansion cost phase depressing near-term GAAP, HALEU services growing, $900M DOE confirmed, Russian ban 2028 unchanged. Down 2.58% today (sector pressure). Stop $158.17 below Feb capitulation base. July 28 earnings next checkpoint. Buffer $10.32 (6.1%)."},
    {"ticker":"MSTR","shares":15,"avgPrice":181.067,"last":165.85,"unrealPnL":-229,"unrealPct":-8.4,"stop":153.14,"status":"HOLD — STOP $153.14 — BTC $76,657 — KILL SWITCH $70K = $6,657 AWAY","note":"BTC $76,657 (Alpha Vantage live). Kill switch $70K = $6,657 away. Scale gate $85K = $8,343 away. -0.47% today. Buffer $12.71 (7.7%). Rate hike 45-60% = BTC macro headwind. CLARITY Act 45% Polymarket odds."},
    {"ticker":"AVAV","shares":15,"avgPrice":185.067,"last":159.25,"unrealPnL":-391,"unrealPct":-14.1,"stop":155.00,"status":"HOLD — STOP $155.00 — T31 — EARNINGS JUN 23 — STOP 425c AWAY","note":"SI-84 chart review S47: 1D bearish confirmed. Lower highs since March crash. 15m: week of May 12-19 shows no conviction buying, each recovery sold. Down $3.25 today to $159.25. Buffer $4.25 (2.7%). Recent contract wins: PANTHER $43M, LASSO, MAYHEM 10 evolution. Thesis intact — price action sector-wide not company-specific. Stop $155 confirmed below 52wk low $156. Jun 23 earnings. DO NOT EXIT MANUALLY (E28)."},
    {"ticker":"UUUU","shares":50,"avgPrice":22.011,"last":16.78,"unrealPnL":-261,"unrealPct":-23.8,"stop":16.50,"status":"HOLD — STOP $16.50 — CRITICAL: 28c BUFFER — T22 CEILING","note":"S47 sector sweep: Q1 2026 revenue +112% YoY but net loss $10.8M from REE expansion costs (temporary). REE buildout ($410M capex, White Mesa Mill mid-2027) consistent with critical minerals thesis. Uranium spot $85.95/lb retreat from $100 high = sector pressure. Down 3.56% today. Stop $16.50 = $0.28 away. If triggered: realised loss ~-$276. Thesis intact — stop will work."}
  ],
  "closedToday": [
    {"id":"T42","ticker":"IREN","action":"STOPPED OUT","shares":24,"avgCost":55.042,"exitPrice":51.98,"realizedPnL":-73.49,"note":"Stop $52.00 triggered. Fill $51.98 ($0.02 below — normal execution). Thesis intact structurally (NVIDIA $3.4B deal, $3.1B ARR contracted) but convertible dilution + BTC pressure drove stock below stop. System worked correctly. T42 CLOSED."}
  ],
  "openedToday": [
    {"id":"T57","ticker":"IAU","action":"OPENED","shares":175,"fillPrice":86.00,"avgPrice":86.006,"totalCost":15051,"note":"Market order filled $86.00. Slight slippage from $85.51 discussed ($0.49/sh, $85.75 total — normal). Portfolio allocation, not a trade. No stop. Thesis: stagflation macro hedge, CAPE 41x, Hormuz inflation, Warsh hawkish Fed. SI-35 exempt. Manual review triggers: Hormuz reopening OR Warsh rate cut. IAU thesis review IAU chart: entry at lower consolidation range ($84-92), just above confirmed $84 support. February blow-off top to $104 was war panic — correctly sold. Distribution pattern post-Feb. Near-term technically bearish (lower highs since Feb). Long-term macro thesis entry, not technical momentum trade."}
  ],
  "macroHedge": {
    "title": "IAU PORTFOLIO ALLOCATION — MACRO HEDGE — T57",
    "rationale": "Stagflation scenario: oil $103-106 → inflation entrenched → Warsh cannot cut → real yields rise → equity multiples compress at CAPE 41x. Gold historically the primary beneficiary of stagflation. Physical backing means no zero risk. Patient capital approach explicitly chosen. Off-account reserves mean IBKR position does not need to be liquidated at worst point.",
    "keyLevels": {
      "resistance": ["$88-90 (immediate)", "$92-96 (multiple failed recoveries)", "$99.99 (dashed reference)", "$104 (Feb panic high)"],
      "support": ["$84.00 (confirmed — 4-5 bounces)", "$80-82 (structural pre-spike base)", "$76 (Sep-Oct 2025 base)"],
      "entry": 86.006,
      "upsideTargets": ["$99-104 (re-test Feb levels, +15-21%)", "$109+ (Goldman $4,900/oz thesis, +27%+)"]
    },
    "thesisBreakTriggers": ["Credible Hormuz operational reopening announced", "Warsh surprise rate cut delivered"],
    "noStopRationale": "Physical gold backing, no earnings risk, no leverage, patient capital with off-account reserves removing forced liquidation risk. Recovery from any dip is historically assured with patience."
  },
  "sgov": {
    "title": "SGOV $30K — FRIDAY 22 MAY",
    "amount": 30000,
    "yield": 3.94,
    "monthlyIncome": 98.50,
    "annualIncome": 1182,
    "note": "Submit Friday May 22. T+1 settlement. Remaining liquid cash ~$6,836 covers RYAAY entry if triggered ($5,200). CRM entry (May 27) can be funded via SGOV T+1 sell if needed. Rate hike at 45% probability = SGOV yield rises if hike materialises.",
    "rateHikeNote": "If Warsh hikes to 3.75-4%, SGOV yield rolls up at T-bill reset (every 90 days). SGOV is one of few instruments that BENEFITS from rate hikes."
  },
  "pendingGTCs": [
    {"ticker":"LAC","action":"BUY","limit":4.80,"stop":4.00,"qty":220,"maxLoss":176,"status":"GTC $4.80 / STOP $4.00 — SI-37","note":"Thacker Pass Phase 1. Still active."},
    {"ticker":"TXT","action":"BUY","limit":88.00,"stop":79.00,"qty":55,"maxLoss":495,"status":"GTC $88 PENDING","note":"Bell MV-75 Valor. Still active."}
  ],
  "watchList": [
    {"ticker":"IONQ","thesis":"Trapped-ion quantum. Stage 2 complete. Q1 rev $64.7M +755% YoY. $51.77 — above $38-45 entry zone.","entry":"$38-45 dip ONLY. Stop $27. Target $80-100.","gate":"Q2 Aug 12. T23 lock ~Aug 10. No entry above $45.","status":"ACTIVE — DIP BUY $38-45 — ABOVE ZONE"},
    {"ticker":"TUI1","name":"TUI AG","thesis":"Peace deal re-rating. H1 published.","entry":"€5.80-6.20. Stop €4.90. Target €9.20.","gate":"Above zone. Wait.","status":"ACTIVE — ABOVE ZONE — WAIT"},
    {"ticker":"SIX2","name":"Sixt SE","thesis":"German premium car rental. Peace deal consumer recovery.","entry":"€62-65. Stop €54. Target €97.","gate":"Above zone. Wait.","status":"ACTIVE — ABOVE ZONE — WAIT"},
    {"ticker":"RYAAY","name":"Ryanair","thesis":"LCC. Peace deal thesis. EARNINGS REPORTED MON 18 MAY BMO. FY26 profit +40% record (€2.26B). Cautious summer outlook: fares trending flat July-Sept. Stock last $53.28. Gate $52 = $1.28 away.","entry":"$52 or below. Stop $47. 100sh = $5,200.","gate":"EARNINGS DONE. Gate still live this week. Stock drifting toward $52 on summer caution. Monitor daily.","status":"ACTIVE — EARNINGS DONE MAY 18 — GATE $52 LIVE — $1.28 FROM ENTRY"},
    {"ticker":"CRM","name":"Salesforce","thesis":"Stage 2 complete. 12.73x forward PE. Agentforce ARR $800M. $173 — IN ENTRY ZONE. T23 lock May 25.","entry":"$165-185 post-earnings. Stop ~$152. Max 27sh.","gate":"Earnings May 27 AMC. CONDITIONAL: beat + Agentforce ARR >$1B. DO NOT ENTER PRE-EARNINGS.","status":"ACTIVE — CONDITIONAL — T23 LOCK MAY 25 — EARNINGS MAY 27 AMC"},
    {"ticker":"T53_LEU","name":"LEU Conditional Second Tranche","thesis":"Pullback entry. Chart bearish near-term. Wait for $170-175 zone.","entry":"$170-175. Stop $150. 13 shares.","gate":"No DOE failure. No thesis break. Combined T52+T53 max ~$820.","status":"MONITORING — CONDITIONAL — CHART BEARISH — PATIENCE REQUIRED"},
    {"ticker":"HD","name":"Home Depot","thesis":"UNIVERSE — STAGE 1 TRIGGERED S46. 52-week low $296.88 (May 15). Down 30% from ATH $426.75. 3.13% dividend yield. GMS annualisation headwinds temporary. Pro contractor business growing. Revenue +4.2% YoY. EPS $3.41 consensus tomorrow (pre-guided decline). Forward PE 22.3x = 5yr avg. TIKR fair value $445 (+32% upside). BUT: class action lawsuit filed May 15 — investigate. Earnings BMO tomorrow.","entry":"Post-earnings only. Stage 1 required. If drops below $280 on earnings: compelling Screen B candidate.","gate":"Earnings Tue May 19 BMO. P24 block today. Stage 1 post-print. Class action investigation required before elevation to MONITORING.","status":"UNIVERSE — STAGE 1 INITIATED S46 — P24 TODAY — EARNINGS TOMORROW"},
    {"ticker":"RCL","name":"Royal Caribbean","thesis":"Peace deal bounce. 60% hedged.","entry":"$255-270. Stop $245. Target $320-340.","gate":"No third cruise while CCL+NCLH active.","status":"MONITORING — GATE: CCL/NCLH RESOLUTION FIRST"},
    {"ticker":"GTT","name":"Gaztransport Technigaz","thesis":"LNG royalty. 68% EBITDA margin. €207 — above entry zone €170-175. ATH €215 (Mar 19 2026). Ex-div Jun 17 (~€9 dividend). Post-div price ~€198 — still 13% above entry zone.","entry":"€170-175. Stop €158. Target €235.","gate":"Ex-div Jun 17. Post-div dip might approach zone. Monitor.","status":"MONITORING — ABOVE ZONE — WAIT POST-JUN 17 EX-DIV"},
    {"ticker":"MSTR_SCALE","name":"MicroStrategy scale","thesis":"BTC $76.9K. Scale gate $85K = $8.1K away (moving further). Kill switch $70K = $6.9K away. CLARITY floor vote still unresolved.","entry":"Market on BTC $85K + CLARITY floor vote.","gate":"BTC moving AWAY from scale gate. Monitor weekly. Kill switch alert if BTC approaches $72K.","status":"MONITORING — BTC $8.1K BELOW GATE AND FALLING"},
    {"ticker":"MU","name":"Micron Technology","thesis":"HBM supercycle. SI-35 prevents sizing. July 1 earnings.","entry":"Speculative only: 2-3 shares, stop $580.","gate":"July 1 earnings.","status":"MONITORING — SI-35 PREVENTS ACTIVE"},
    {"ticker":"SOFI","name":"SoFi Technologies","thesis":"T27 pattern. 52% below ATH. Fintech.","entry":"$13-14 on pullback.","gate":"PYPL gate first.","status":"MONITORING — PYPL GATE FIRST"},
    {"ticker":"LULU","name":"Lululemon","thesis":"52-week low $119. Down 65% ATH. Forward PE 9.6x. EPS declining. NOT a T27. Post-May 28 evaluation only.","entry":"Post May 28 ONLY if: beat + guidance stabilisation.","gate":"Q1 earnings May 28 AMC.","status":"MONITORING — EARNINGS MAY 28 — THESIS REASSESSMENT"},
    {"ticker":"ENGIE_PA","name":"Engie SA","thesis":"Demoted S44. Near ATH. Re-entry €22-24 only.","entry":"€22-24 pullback only.","gate":"Stage 2 required. Morningstar premium unresolved.","status":"UNIVERSE — DEMOTED S44 — DO NOT ENTER AT €27"},
    {"ticker":"OKLO","name":"Oklo Inc","thesis":"SMR. July 4 Groves criticality. $1B ATM overhang. Entry post-criticality dip.","entry":"Post July 4 criticality dip ~$50-55. SI-37 cap $1,500.","gate":"July 4 criticality target.","status":"UNIVERSE — JULY 4 GATE — ENTRY $50-55"},
    {"ticker":"CSCO","name":"Cisco Systems","thesis":"Q3 FY2026: Revenue $15.8B +12%, AI orders raised $5B→$9B. P13 applies at current levels.","entry":"Pullback to ~$100-108.","gate":"Stage 1 needed. P13 active.","status":"UNIVERSE — P13 APPLIES — WAIT CONSOLIDATION"},
    {"ticker":"DELL","name":"Dell Technologies","thesis":"Q4 FY2026: +39% revenue, AI server $9B +342%. $43B backlog. P13 applies.","entry":"Pullback to $120-130.","gate":"Stage 1 needed. P13 active.","status":"UNIVERSE — P13 APPLIES — WAIT CONSOLIDATION"},
    {"ticker":"LOW","name":"Lowes Companies","thesis":"HD peer. Added S46 for parallel Stage 1 evaluation. If HD becomes MONITORING, Lowe's assessed simultaneously for relative value.","entry":"Post HD Stage 1 comparative assessment.","gate":"HD Stage 1 completion first.","status":"UNIVERSE — PARALLEL HD EVALUATION"},
    {"ticker":"XLF_KRE","name":"US Financials / Regional Banks ETF","thesis":"Rate hike probability 45-60% (CME + Apex swaps). Net interest margin expansion direct beneficiary. Fund has zero financial sector exposure. Apex report S47 upgraded validation.","entry":"Stage 1 required urgently. Evaluate XLF (broad) vs KRE (regional) exposure.","gate":"Stage 1 this week. Priority elevated S47.","status":"UNIVERSE — PRIORITY UPGRADED S47 — STAGE 1 URGENT"},
    {"ticker":"MSFT","name":"Microsoft Corporation","thesis":"Stage 1 complete S47. Quality compounder at 3-year valuation low (21.7x forward PE). Revenue $82.9B +18%, Azure +40%, AI run rate $37B +123% YoY. Capex fear ($190B CY2026) created the entry opportunity. Margins guided UP 1pt YoY despite capex. Dip-buy pattern confirmed on 2h/3m chart (three identical dips, each recovered). 23.8% below ATH.","entry":"$395-410 (50dma zone). Stop $358 (below Apr 7 structural low). Alert set at $410.","gate":"Q4 FY2026 earnings July 2026. Stage 2 required before entry. Do not enter above $410.","status":"MONITORING — S47 NEW — STAGE 1 COMPLETE — STAGE 2 REQUIRED — ALERT AT $410"},
    {"ticker":"META","name":"Meta Platforms","thesis":"Cheapest hyperscaler: 19x forward earnings with 25% revenue growth. AI capex ROI flowing through ad-targeting P&L improvement (not a separate revenue line waiting to materialise). Llama infrastructure reducing inference costs. Stage 1 required.","entry":"Stage 1 required. Approximate zone $550-580 pending research.","gate":"Stage 1 this week.","status":"UNIVERSE — S47 NEW — STAGE 1 REQUIRED"},
    {"ticker":"AI_PHOTONICS","name":"AI Photonics / Optical Connectivity Sector","thesis":"AI data centres require massive optical interconnect upgrades. LITE/COHR are liquid proxies. All names currently bubble-priced (LITE 120x forward, COHR 70x forward). SOX at 64% above 200dma (1999-like). Entry only when SOX corrects and brings these names back to tradeable multiples. Stage 1 on LITE when price within 20% of its 200dma.","entry":"NO ENTRY NOW. Sector watch only. Entry on meaningful SOX correction.","gate":"SOX correction from 64% above 200dma. Track LITE as lead indicator.","status":"UNIVERSE — S47 NEW — SECTOR WATCH — NO INDIVIDUAL ENTRIES NOW"},
    {"ticker":"BWXT","name":"BWX Technologies","thesis":"Nuclear defense. Rev $3.19B +18%. Own SMR (BANR).","entry":"$183 SI-39 trigger.","gate":"Currently ~$208.","status":"UNIVERSE — SI-39 AT $183"},
    {"ticker":"ANDURIL","name":"Anduril Industries","thesis":"Private. S-1 watch.","entry":"IPO only.","gate":"S-1 filing.","status":"IPO WATCH"},
    {"ticker":"POET","name":"POET Technologies","thesis":"Silicon photonics. Marvell order cancelled — THESIS BREAK. Meme-like momentum. 2x ETF (POEL) launched. Q1 earnings May 22. Do not enter — thesis break disqualifies.","entry":"Do not enter. Thesis break (Marvell cancellation).","gate":"May 22 earnings observe only.","status":"UNIVERSE — THESIS BREAK (MARVELL) — OBSERVE ONLY — DO NOT ENTER"}
  ],
  "shortWatchlist": [
    {"ticker":"PLTR","thesis":"Dormant until Q2 July 2026.","status":"DORMANT UNTIL Q2 JULY","trigger":"Q2 guidance cut only"},
    {"ticker":"AAL","thesis":"No fuel hedge, $36.5B debt.","trigger":"Dead-cat bounce $13-14.","status":"WATCH"},
    {"ticker":"SNOW","thesis":"18x forward revenue.","trigger":"Earnings miss + guidance trim.","status":"WATCH"}
  ],
  "macroRisk": {
    "title":"STAGFLATION CRASH RISK — RATE HIKE PROBABILITY 45% — CAPE 40.93x — ACTIVE FLAG",
    "shillerCAPE":"40.93x (May 2026) — 97th percentile historically. Second highest ever. Only exceeded 39x during 3% of months since 1957. Implied 10yr return: ~1.5%.",
    "ratehike":"45% probability of Fed hike to 3.75-4% by year end. Was 1% one month ago. Driven by WTI $103+, Warsh hawkish bias, CPI sticky.",
    "forwardPE":"~21.5x — above 5yr avg 20x and 10yr avg 18.8x",
    "fedChange":"Kevin Warsh confirmed as new Fed Chair. More hawkish than Powell. 10-year yield 4.5%+. Import prices +4.2% YoY. Oil $103 = cost-push inflation.",
    "crashScenario":"Stagflation (1970s analogy, not 2008): oil stays high → inflation entrenched → Warsh hikes into slowdown → earnings compress at CAPE 41x → double compression. S&P fell 49% in 1999-2002 from comparable CAPE levels.",
    "hedgeStrategy":"IAU (stagflation hedge, no stop), SGOV (T-bill parking, benefits from hikes), managed futures CTA (consider), external reserves for crash deployment. DO NOT add equity exposure. Let stops work and park freed cash defensively.",
    "fundImplications":[
      "P6 test mandatory for every new entry — no narrative multiples",
      "Stops are primary protection — never widen on losing positions (E28)",
      "Let stops trigger and park proceeds in SGOV — do not redeploy into more growth",
      "IAU held as inflation hedge — no stop, patient capital",
      "External reserves reserved for CAPE 20-25x deployment window (likely 12-36mo away)",
      "Rate hike at 45% = SGOV yield rises, TLT wrong, long-duration bonds avoid entirely"
    ]
  },
  "btcState": {
    "currentPrice": 76907,
    "killSwitch": 70000,
    "scaleGate": 85000,
    "bufferToKillSwitch": 6907,
    "bufferToScaleGate": -8093,
    "chart1min": "Reviewed S46. Pattern: bull trap confirmed. AM low $76,700 → rally to $77,754 resistance → failed breakout → NYSE open selling → current $76,907 declining. Kill switch $70K = $6.9K away. Scale gate moving further away. MSTR stop $153.14 is primary protection.",
    "mstrAction": "Hold to stop $153.14. No scale action until BTC weekly close above $85K.",
    "clarityAct": "Committee passed 15-9. Full Senate floor vote needs 60 votes (7+ Democrat crossovers). Ethics provision unresolved. White House vs Senate Democrats standoff. 45% Polymarket odds by year-end. Medium-term bullish, no near-term BTC catalyst."
  },
  "weeklyReview": {
    "title":"WEEKLY REVIEW #2 PENDING — WEEK OF MAY 18 2026",
    "note":"First review of Week 2. S46 = Monday open. SGOV to be submitted Friday. RYAAY gate Thursday. NVDA Wednesday. HD tomorrow. Full weekly review due Friday S47."
  },
  "tradeTracker": {
    "closedTrades": [
      {"id":1,"ticker":"CCL","dateIn":"2026-03-24","dateOut":"2026-03-26","qty":240,"entry":24.83,"exit":25.35,"ccy":"USD","pnlUSD":122.35,"note":"S07."},
      {"id":2,"ticker":"ONDS","dateIn":"2026-03-24","dateOut":"2026-03-30","qty":250,"entry":10.90,"exit":8.505,"ccy":"USD","pnlUSD":-601.30,"note":"Stopped."},
      {"id":3,"ticker":"KTOS","dateIn":"2026-03-24","dateOut":"2026-03-30","qty":100,"entry":81.00,"exit":64.977,"ccy":"USD","pnlUSD":-1604.27,"note":"P12."},
      {"id":4,"ticker":"UEC","dateIn":"2026-03-25","dateOut":"2026-03-31","qty":206,"entry":13.77,"exit":13.16,"ccy":"USD","pnlUSD":-127.76,"note":"Stopped."},
      {"id":5,"ticker":"IAG","dateIn":"2026-03-27","dateOut":"2026-04-01","qty":2200,"entry":3.55,"exit":3.70,"ccy":"GBP","pnlUSD":407.36,"note":"Peace thesis broken."},
      {"id":6,"ticker":"RCL","dateIn":"2026-03-24","dateOut":"2026-04-02","qty":36,"entry":273.54,"exit":269.91,"ccy":"USD","pnlUSD":-132.89,"note":"Stopped."},
      {"id":7,"ticker":"LEU","dateIn":"2026-03-24","dateOut":"2026-04-07","qty":13,"entry":188.79,"exit":170.26,"ccy":"USD","pnlUSD":-242.94,"note":"T7. Re-entered T52."},
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
      {"id":19,"ticker":"RR","dateIn":"2026-03-26","dateOut":"2026-04-22","qty":150,"entry":1182.88,"exit":1150.00,"ccy":"GBP","pnlUSD":-62.39,"note":"Stopped. Re-entry 100sh T56."},
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
      {"id":35,"ticker":"R3NK","dateIn":"2026-05-07","dateOut":"2026-05-11","qty":25,"entry":52.00,"exit":47.01,"ccy":"EUR","pnlUSD":-136,"note":"T35."},
      {"id":36,"ticker":"AMPX","dateIn":"2026-05-05","dateOut":"2026-05-07","qty":168,"entry":18.106,"exit":17.94,"ccy":"USD","pnlUSD":-27.89,"note":"Gapped stop."},
      {"id":37,"ticker":"MRVL","dateIn":"2026-03-24","dateOut":"2026-05-07","qty":10,"entry":152.10,"exit":160.02,"ccy":"USD","pnlUSD":79.20,"note":"Stop triggered."},
      {"id":38,"ticker":"CEG","dateIn":"2026-05-04","dateOut":"2026-05-07","qty":14,"entry":308.072,"exit":314.77,"ccy":"USD","pnlUSD":93.77,"note":"Stop raised."},
      {"id":39,"ticker":"PYPL","dateIn":"2026-05-08","dateOut":null,"qty":55,"entry":45.639,"exit":null,"ccy":"USD","pnlUSD":null,"note":"T39: Q1 beat. Stop $37.50. OPEN."},
      {"id":41,"ticker":"R3NK","dateIn":"2026-05-11","dateOut":"2026-05-12","qty":200,"entry":46.485,"exit":43.9925,"ccy":"EUR","pnlUSD":-543,"note":"T41. CLOSED."},
      {"id":42,"ticker":"IREN","dateIn":"2026-05-11","dateOut":"2026-05-18","qty":24,"entry":55.042,"exit":51.98,"ccy":"USD","pnlUSD":-73.49,"note":"T42: Stop $52.00 triggered. Fill $51.98 ($0.02 below — normal execution). BTC $76.9K + convertible dilution drove stock below stop. NVIDIA $3.4B deal thesis intact but stop was correct. CLOSED S46."},
      {"id":43,"ticker":"ZETA","dateIn":"2026-05-11","dateOut":null,"qty":191,"entry":16.866,"exit":null,"ccy":"USD","pnlUSD":null,"note":"T43: +12.1% unrealised. +9.89% today. P20 triggered — stop raised $14.50→$16.98. Above breakeven. Aug 4 earnings gate. OPEN."},
      {"id":44,"ticker":"PATH","dateIn":"2026-05-11","dateOut":null,"qty":320,"entry":10.726,"exit":null,"ccy":"USD","pnlUSD":null,"note":"T44: +4.67% today, just positive. T23 lock May 26. Earnings May 28. OPEN."},
      {"id":45,"ticker":"LDO","dateIn":"2026-03-27","dateOut":"2026-05-12","qty":35,"entry":56.086,"exit":50.00,"ccy":"EUR","pnlUSD":-232,"note":"T45. CLOSED."},
      {"id":46,"ticker":"AMZN","dateIn":"2026-03-24","dateOut":"2026-05-12","qty":30,"entry":201.204,"exit":263.943,"ccy":"USD","pnlUSD":1882,"note":"T46. Largest gain. CLOSED."},
      {"id":47,"ticker":"CCL","dateIn":"2026-05-13","dateOut":null,"qty":250,"entry":24.70,"exit":null,"ccy":"USD","pnlUSD":null,"note":"T47: Peace deal primary. Stop $23. +3.18% today. OPEN."},
      {"id":48,"ticker":"NCLH","dateIn":"2026-05-13","dateOut":null,"qty":75,"entry":15.90,"exit":null,"ccy":"USD","pnlUSD":null,"note":"T48: Peace deal secondary. Stop $14.50. +1.68% today. OPEN."},
      {"id":49,"ticker":"MSFT","dateIn":"2026-04-30","dateOut":"2026-05-13","qty":25,"entry":403.052,"exit":402.09,"ccy":"USD","pnlUSD":-24,"note":"T49. CLOSED."},
      {"id":50,"ticker":"CCJ","dateIn":"2026-04-29","dateOut":"2026-05-13","qty":50,"entry":117.02,"exit":112.17,"ccy":"USD","pnlUSD":-243,"note":"T50. CLOSED."},
      {"id":51,"ticker":"BAH","dateIn":"2026-04-08","dateOut":"2026-05-13","qty":33,"entry":76.531,"exit":69.00,"ccy":"USD","pnlUSD":-249,"note":"T51. CLOSED."},
      {"id":52,"ticker":"LEU","dateIn":"2026-05-14","dateOut":null,"qty":15,"entry":191.697,"exit":null,"ccy":"USD","pnlUSD":null,"note":"T52: HALEU. Stop $158.17. Chart bearish near-term (lower highs since Oct ATH). Thesis intact. July 28 earnings checkpoint. OPEN."},
      {"id":53,"ticker":"CRML","dateIn":"2026-03-24","dateOut":"2026-05-15","qty":110,"entry":9.08,"exit":11.1744,"ccy":"USD","pnlUSD":230.38,"note":"S44. CLOSED."},
      {"id":54,"ticker":"ABVX","dateIn":"2026-04-06","dateOut":"2026-05-15","qty":50,"entry":109.89,"exit":120.909,"ccy":"USD","pnlUSD":550.95,"note":"S44. M&A. CLOSED."},
      {"id":55,"ticker":"SNPS","dateIn":"2026-03-24","dateOut":"2026-05-15","qty":8,"entry":495.125,"exit":496.65,"ccy":"USD","pnlUSD":12.20,"note":"S45. CLOSED."},
      {"id":56,"ticker":"RR","dateIn":"2026-04-23","dateOut":"2026-05-15","qty":100,"entry":1128.60,"exit":1149.20,"ccy":"GBP","pnlUSD":26.16,"note":"S45. CLOSED."},
      {"id":57,"ticker":"IAU","dateIn":"2026-05-18","dateOut":null,"qty":175,"entry":86.006,"exit":null,"ccy":"USD","pnlUSD":null,"note":"T57: Portfolio allocation macro hedge. Fill $86.00 market order. No stop (physical gold, patient capital, off-account reserves). Gold -2.7% today on metals rout. Thesis: stagflation, CAPE 41x, Warsh hawkish, Hormuz. Review triggers: Hormuz reopening OR Warsh rate cut. OPEN."}
    ],
    "lastUpdated":"2026-05-18 S46 CLOSE. 59 rows (48 closed + 9 open). T42 IREN closed -$73.49. T57 IAU opened @$86.00. Open: T39 PYPL, T43 ZETA, T44 PATH, T47 CCL, T48 NCLH, T52 LEU, T57 IAU + positions IES/CODA/CGCT/LMT/IBM/MSTR/AVAV/UUUU (no T numbers for pre-existing). Note: T40 unused."
  },
  "sessionNotes": [
    {"date":"2026-05-07","note":"S37: LMT stop raised. RR.L Q1 beat. NOG T33 sold. R3NK T34/T35. AMPX/MRVL/CEG closed."},
    {"date":"2026-05-08","note":"S38: SNPS+MSFT stops raised. T39 PYPL. UUUU Q1 beat. CENTCOM strikes."},
    {"date":"2026-05-09","note":"S39: Rules framework overhauled. SI-69-76 added."},
    {"date":"2026-05-11","note":"S40: T35 R3NK stopped. T41/T42/T43/T44 entered. Net liq $104.2K."},
    {"date":"2026-05-12","note":"S41: Framework v2.0. T46 AMZN +$1,882. Net liq $102.3K."},
    {"date":"2026-05-13","note":"S42: T47 CCL @$24.70. T48 NCLH @$15.90. CLARITY tonight."},
    {"date":"2026-05-14","note":"S43: CGCT hold confirmed (P29). T52 LEU entered @$191.63. CLARITY passed committee."},
    {"date":"2026-05-15","note":"S44: CRML stopped +$230. ABVX closed +$551. CLARITY 15-9. BTC $81K. Trump-Xi Hormuz statement — SI-25 Condition 1 UNMET."},
    {"date":"2026-05-16","note":"S45: SNPS+RR.L discovered stopped May 15 (+$38). Position count corrected to 15. BTC $81K→$79K. Warsh confirmed. Full scan + chart reviews."},
    {"date":"2026-05-18","note":"S46: FULL SCAN DAY. T42 IREN stopped $51.98 (-$73.49). T57 IAU opened @$86.00 (no stop, portfolio allocation). ZETA +9.89%, P20 triggered, stop raised $14.50→$16.98. Rate hike probability 45% (WAS 1% one month ago — MAJOR macro). BTC bull trap confirmed 1min chart: AM rally $76,700→$77,754 sold at resistance, NYSE open selling. Gold -2.7% metals rout. UUUU/LEU sector weakness — no company news, thesis intact. HD added UNIVERSE (52wk low, earnings tomorrow). SGOV $30K Friday. Off-account reserves documented as material portfolio fact. Daily P&L +$512.68 (+0.52%) despite IREN stop. Net liq $101.7K. 15 positions."}
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
  const tabs=["positions","watch","macro","iau","sgov","btc","peace","leu","cgct","tracker","notes"];
  const pnlColor=(v)=>v>0?COLORS.green:v<0?COLORS.red:COLORS.textDim;
  const sc=(s)=>s?.includes("ACTIVE")?COLORS.green:s?.includes("MONITORING")?COLORS.accent:s?.includes("DO NOT")||s?.includes("UNIVERSE")?COLORS.red:s?.includes("PORTFOLIO")?COLORS.purple:s?.includes("ENTERED")?COLORS.purple:COLORS.yellow;
  const ub=(p)=>{if(p.status?.includes("WARNING")||p.status?.includes("CRITICAL"))return"3px solid "+COLORS.red;if(p.unrealPnL>300)return"3px solid "+COLORS.green;if(p.unrealPnL<-300)return"3px solid "+COLORS.red;if(p.status?.includes("PORTFOLIO"))return"3px solid "+COLORS.purple;return undefined;};

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
            <div style={{fontSize:18,fontWeight:700,color:COLORS.textBright}}>CLAUDE FUND — JOURNAL v60 S46</div>
            <div style={{fontSize:11,color:COLORS.textDim,marginTop:2}}>Session 46 — Mon 18 May 2026 | {data.fund.account} | 15 positions | Daily +$512.68 (+0.52%)</div>
          </div>
          <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
            {[{l:"NET LIQ",v:"$101.7K"},{l:"CASH USD",v:"$41,539",c:COLORS.yellow},{l:"DAILY P&L",v:"+$512.68",c:COLORS.green},{l:"POSITIONS",v:"15"}].map(m=>(
              <div key={m.l} className="card" style={{textAlign:"center",minWidth:80}}>
                <div style={{fontSize:9,color:COLORS.textDim}}>{m.l}</div>
                <div style={{fontSize:14,fontWeight:700,color:m.c||COLORS.textBright,marginTop:2}}>{m.v}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{marginTop:6,padding:"6px 10px",background:"rgba(63,185,80,.1)",border:"1px solid rgba(63,185,80,.3)",borderRadius:4,fontSize:11,color:COLORS.green}}>
          S46 COMPLETE: IREN T42 stopped -$73.49 ✓ | IAU T57 opened @$86.00 ✓ | ZETA stop raised $14.50→$16.98 (P20) ✓ | Daily P&L +$512 despite stop
        </div>
        <div style={{marginTop:4,padding:"6px 10px",background:"rgba(248,81,73,.1)",border:"1px solid rgba(248,81,73,.3)",borderRadius:4,fontSize:11,color:COLORS.red}}>
          ⚠️ RATE HIKE PROBABILITY 45% (was 1% one month ago) | BTC $76.9K bull trap | Gold -2.7% below support | Stagflation regime active
        </div>
        <div style={{marginTop:4,padding:"6px 10px",background:"rgba(88,166,255,.15)",border:"1px solid rgba(88,166,255,.4)",borderRadius:4,fontSize:11,color:COLORS.accent}}>
          NEXT: HD earnings BMO tomorrow | NVDA earnings Wed 20 AMC | RYAAY earnings Thu 21 AMC (gate $52) | SGOV $30K Friday | CRM T23 lock May 25
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
                {p.name&&<span style={{fontSize:10,color:COLORS.textDim}}>{p.name}</span>}
                {p.cur&&<span className="badge badge-grey">{p.cur}</span>}
                {p.unrealPnL!==undefined&&<span className={"badge badge-"+(p.unrealPnL>=50?"green":p.unrealPnL<=-50?"red":"amber")}>{p.unrealPnL>=0?"+":""}{p.unrealPct?.toFixed(1)}%</span>}
                <span style={{fontSize:9,color:COLORS.textDim,marginLeft:"auto"}}>Stop: <b style={{color:COLORS.yellow}}>{p.stop||p.stopType||"NONE"}</b></span>
              </div>
              <div style={{fontSize:10,color:sc(p.status),marginBottom:2,fontWeight:600}}>{p.status}</div>
              <div style={{fontSize:9,color:COLORS.textDim}}>{p.note}</div>
            </div>
          ))}
        </div>
      )}

      {activeTab==="iau"&&(
        <div className="card" style={{borderLeft:"4px solid "+COLORS.purple}}>
          <div style={{fontWeight:700,color:COLORS.purple,fontSize:13,marginBottom:8}}>IAU — PORTFOLIO ALLOCATION — T57 — MACRO HEDGE</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:10}}>
            {[{l:"Fill",v:"$86.00"},{l:"175 shares",v:"$15,051"},{l:"Unrealised",v:"-$41 (-0.3%)",c:COLORS.red},{l:"Stop",v:"NONE",c:COLORS.purple},{l:"Gold today",v:"-2.7%",c:COLORS.red},{l:"Support",v:"$84.00"}].map((m,i)=>(
              <div key={i} className="card"><div style={{fontSize:9,color:COLORS.textDim}}>{m.l}</div><div style={{fontSize:12,fontWeight:700,color:m.c||COLORS.textBright}}>{m.v}</div></div>
            ))}
          </div>
          <div style={{fontSize:11,marginBottom:8,color:COLORS.textBright}}>Portfolio Allocation Rationale: Stagflation macro hedge. Gold historically the primary beneficiary when oil-driven inflation prevents rate cuts. CAPE 41x = equity risk premium compressed. Physical gold = no earnings risk, no leverage. No stop because patient capital with off-account reserves removes forced liquidation risk.</div>
          <div style={{fontSize:10,color:COLORS.yellow,marginBottom:6}}>THESIS REVIEW TRIGGERS (not stops): (1) Credible Hormuz operational reopening confirmed — gold premium unwinds 12-18%. (2) Warsh surprise rate cut — risk-on, gold premium reduces. Neither event is probable near-term.</div>
          {[{l:"Resistance",v:"$88-90 / $92-96 / $99.99 / $104"},{l:"Support",v:"$84.00 (confirmed 4-5 bounces) / $80-82 (structural)"},{l:"Upside",v:"$99-104 re-test Feb levels (+15-21%) | $109+ Goldman $4,900/oz (+27%)"}].map((m,i)=>(
            <div key={i} style={{display:"flex",gap:8,fontSize:10,marginBottom:4}}>
              <span style={{color:COLORS.textDim,minWidth:80}}>{m.l}:</span>
              <span style={{color:COLORS.textBright}}>{m.v}</span>
            </div>
          ))}
        </div>
      )}

      {activeTab==="sgov"&&(
        <div className="card" style={{borderLeft:"4px solid "+COLORS.green}}>
          <div style={{fontWeight:700,color:COLORS.green,fontSize:13,marginBottom:8}}>SGOV — $30K ALLOCATION — FRIDAY 22 MAY</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:10}}>
            {[{l:"Allocation",v:"$30,000"},{l:"Yield (annualised)",v:"3.94%",c:COLORS.green},{l:"Monthly income",v:"~$98.50",c:COLORS.green},{l:"Annual income",v:"~$1,182",c:COLORS.green},{l:"Remaining liquid",v:"~$6,836"},{l:"Settlement",v:"T+1"}].map((m,i)=>(
              <div key={i} className="card"><div style={{fontSize:9,color:COLORS.textDim}}>{m.l}</div><div style={{fontSize:13,fontWeight:700,color:m.c||COLORS.textBright}}>{m.v}</div></div>
            ))}
          </div>
          <div style={{padding:"8px",background:"rgba(63,185,80,.1)",borderRadius:4,fontSize:11,color:COLORS.green,marginBottom:6}}>RATE HIKE UPSIDE: If Warsh hikes to 3.75-4% (45% probability), SGOV yield rolls up at T-bill reset every 90 days. SGOV is one of few instruments that mechanically BENEFITS from rate hikes. Entry price irrelevant — sawtooth chart explained (monthly dividend accrual/distribution cycle).</div>
          <div style={{fontSize:10,color:COLORS.textDim}}>$6,836 remaining liquid covers RYAAY entry if triggered Friday ($5,200 = 100sh at $52). CRM (May 27) funded via T+1 SGOV sell if needed. SGOV is the liquidity reserve, not a permanent lock-up.</div>
        </div>
      )}

      {activeTab==="btc"&&(
        <div className="card" style={{borderLeft:"4px solid "+COLORS.orange}}>
          <div style={{fontWeight:700,color:COLORS.orange,fontSize:13,marginBottom:8}}>BTC — $76,907 — BULL TRAP CONFIRMED</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:10}}>
            {[{l:"BTC current",v:"$76,907",c:COLORS.red},{l:"Kill switch",v:"$70,000 (BTC weekly close)",c:COLORS.red},{l:"Scale gate",v:"$85,000",c:COLORS.yellow},{l:"Buffer to kill",v:"$6,907"},{l:"Buffer to gate",v:"-$8,093 (below)"},{l:"MSTR stop",v:"$153.14"}].map((m,i)=>(
              <div key={i} className="card"><div style={{fontSize:9,color:COLORS.textDim}}>{m.l}</div><div style={{fontSize:13,fontWeight:700,color:m.c||COLORS.textBright}}>{m.v}</div></div>
            ))}
          </div>
          <div style={{fontSize:10,color:COLORS.textDim,marginBottom:6}}>1min chart review S46: AM grind lower → capitulation spike $76,700 → sharp rally $77,754 → FAILED at resistance (dashed line) → NYSE open selling → current $76,907 declining. Classic bull trap. Sellers waiting at $77,754.</div>
          <div style={{padding:"8px",background:"rgba(248,81,73,.1)",borderRadius:4,fontSize:11,color:COLORS.red}}>CLARITY Act: Ethics provision stalemate. 45% Polymarket odds (down from 80%). Medium-term bullish but no near-term catalyst. Rate hike fears (45%) directly suppress BTC as risk asset. Kill switch $70K alert if BTC approaches $72K this week.</div>
        </div>
      )}

      {activeTab==="macro"&&(
        <div className="card" style={{borderLeft:"4px solid "+COLORS.red}}>
          <div style={{fontWeight:700,color:COLORS.red,fontSize:13,marginBottom:8}}>STAGFLATION CRASH RISK — RATE HIKE 45% — CAPE 40.93x</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:10}}>
            {[{l:"Shiller CAPE",v:"40.93x",c:COLORS.red},{l:"Rate hike prob",v:"45% (was 1%)",c:COLORS.red},{l:"10yr yield",v:"4.5%+",c:COLORS.red},{l:"WTI Crude",v:"$103-106",c:COLORS.orange},{l:"Fed Chair",v:"Warsh (hawkish)",c:COLORS.red},{l:"IEA warning",v:"Undersupplied to Oct",c:COLORS.orange}].map((m,i)=>(
              <div key={i} className="card"><div style={{fontSize:9,color:COLORS.textDim}}>{m.l}</div><div style={{fontSize:12,fontWeight:700,color:m.c||COLORS.textBright}}>{m.v}</div></div>
            ))}
          </div>
          <div style={{fontSize:11,fontWeight:700,color:COLORS.yellow,marginBottom:6}}>HEDGE STRATEGY: IAU (stagflation hedge, no stop) + SGOV (T-bill, benefits from hikes) + external reserves (crash deployment at CAPE 20-25x). DO NOT add growth equity exposure.</div>
          {data.macroRisk?.fundImplications?.map((imp,i)=>(
            <div key={i} style={{fontSize:10,color:COLORS.textDim,marginBottom:4,paddingLeft:8,borderLeft:"2px solid "+COLORS.red}}>{imp}</div>
          ))}
        </div>
      )}

      {activeTab==="watch"&&(
        <div>
          <div style={{fontSize:11,color:COLORS.textDim,marginBottom:8}}>{data.watchList?.length} entries | ACTIVE: IONQ, TUI1, SIX2, RYAAY (gate Thu), CRM (May 27)</div>
          <div style={{display:"flex",flexDirection:"column",gap:6}}>
            {data.watchList?.map((w,i)=>(
              <div key={i} className="card" style={{borderLeft:"3px solid "+sc(w.status)}}>
                <div style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap",marginBottom:3}}>
                  <span style={{fontWeight:700,fontSize:13,color:COLORS.textBright}}>{w.ticker}</span>
                  {w.name&&<span style={{fontSize:10,color:COLORS.textDim}}>{w.name}</span>}
                </div>
                <div style={{fontSize:10,color:sc(w.status),marginBottom:2,fontWeight:600}}>{w.status}</div>
                <div style={{fontSize:9,fontStyle:"italic",color:COLORS.textBright,marginBottom:2}}>{w.thesis?.substring(0,140)}{w.thesis?.length>140?"...":""}</div>
                {w.gate&&<div style={{fontSize:9,color:COLORS.yellow}}>Gate: {w.gate?.substring(0,120)}</div>}
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab==="peace"&&(
        <div className="card" style={{borderLeft:"4px solid "+COLORS.yellow}}>
          <div style={{fontWeight:700,color:COLORS.yellow,fontSize:13,marginBottom:6}}>PEACE DEAL PORTFOLIO — OIL HEADWIND ACTIVE</div>
          <div style={{padding:"6px 10px",background:"rgba(248,81,73,.1)",borderRadius:4,fontSize:11,color:COLORS.red,marginBottom:8}}>WTI $103-106. Drone attacks weekend. IEA: undersupplied through October. SI-25 Conditions 1+2 BOTH UNMET. Peace deal thesis under structural pressure. Stops are the protection.</div>
          {[data.positions?.find(p=>p.ticker==="CCL"),data.positions?.find(p=>p.ticker==="NCLH")].filter(Boolean).map((p,i)=>(
            <div key={i} className="card" style={{marginBottom:6,borderLeft:"3px solid "+(i===0?COLORS.green:COLORS.yellow)}}>
              <div style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap"}}>
                <span style={{fontWeight:700}}>{p.ticker}</span>
                <span className={"badge badge-"+(i===0?"green":"amber")}>{i===0?"PRIMARY":"SECONDARY"}</span>
                <span style={{fontSize:11,color:p.unrealPnL>=0?COLORS.green:COLORS.red}}>{p.unrealPnL>=0?"+$":"-$"}{Math.abs(p.unrealPnL)} ({p.unrealPct?.toFixed(1)}%)</span>
                <span style={{fontSize:9,color:COLORS.textDim}}>Stop: {p.stop}</span>
              </div>
              <div style={{fontSize:9,color:COLORS.textDim,marginTop:2}}>{p.note}</div>
            </div>
          ))}
        </div>
      )}

      {activeTab==="leu"&&(
        <div className="card" style={{borderLeft:"4px solid "+COLORS.blue}}>
          <div style={{fontWeight:700,color:COLORS.blue,fontSize:13,marginBottom:8}}>LEU — CENTRUS ENERGY — T52 — CHART BEARISH NEAR-TERM</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:10}}>
            {[{l:"Entry",v:"$191.697"},{l:"Current",v:"$175.25",c:COLORS.red},{l:"Stop (IBKR)",v:"$158.17",c:COLORS.yellow},{l:"Buffer",v:"$17.08 (9.7%)"},{l:"Unrealised",v:"-$247 (-8.6%)",c:COLORS.red},{l:"Next gate",v:"Jul 28 earnings"}].map((m,i)=>(
              <div key={i} className="card"><div style={{fontSize:9,color:COLORS.textDim}}>{m.l}</div><div style={{fontSize:12,fontWeight:700,color:m.c||COLORS.textBright}}>{m.v}</div></div>
            ))}
          </div>
          <div style={{fontSize:11,fontWeight:700,color:COLORS.red,marginBottom:6}}>CHART (1D): Blow-off top Oct 2025 $460 → confirmed downtrend lower highs → entry $191.70 underwater → failed recovery attempts post-Feb crash → volume heavier on down days. Stop $158.17 below Feb capitulation base — structurally correct. Hold to stop.</div>
          <div style={{fontSize:10,color:COLORS.textDim,marginBottom:6}}>Q1 2026: GAAP EPS $0.45 (down 63% YoY) BUT: raised guidance $450-500M + $900M DOE HALEU award confirmed + operating margin compressed by expansion costs (temporary). Stock down 11.9% after raising guidance — T27 pattern in formation. July 28 earnings is the next rerating catalyst.</div>
          <div style={{padding:"6px 10px",background:"rgba(248,81,73,.1)",borderRadius:4,fontSize:10,color:COLORS.red}}>THESIS BREAK signals: DOE task order cancellation | HALEU delayed past 2028 | Urenco achieves US HALEU certification ahead of schedule</div>
        </div>
      )}

      {activeTab==="cgct"&&(
        <div className="card" style={{borderLeft:"4px solid "+COLORS.purple}}>
          <div style={{fontWeight:700,color:COLORS.purple,fontSize:13,marginBottom:6}}>CGCT → FAC (FACTORIAL HOLDINGS)</div>
          <div style={{fontSize:11,color:COLORS.red,fontWeight:700,marginBottom:6}}>VOTE MAY 27 10AM ET (2PM UAE) — CONFIRM NO REDEMPTION WITH IBKR BEFORE MAY 25</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:8}}>
            {[{l:"Shares",v:"291 @ $10.295"},{l:"Post-merger",v:"FAC on Nasdaq"},{l:"Vote",v:"May 27 10am ET"},{l:"Close expected",v:"June 2026"}].map((m,i)=>(
              <div key={i} className="card"><div style={{fontSize:9,color:COLORS.textDim}}>{m.l}</div><div style={{fontSize:12,fontWeight:700,color:COLORS.textBright}}>{m.v}</div></div>
            ))}
          </div>
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
        <span style={{fontSize:10,color:COLORS.textDim}}>v60 S47 | Tue 19 May 2026 | 15 pos | NCLH 7c from stop | UUUU 28c from stop | CCL 73c from stop</span>
        <div style={{display:"flex",gap:4,flexWrap:"wrap"}}>
          <span className="badge badge-red">Daily -$700 ⚠</span>
          <span className="badge badge-red">NCLH STOP CRITICAL</span>
          <span className="badge badge-red">UUUU STOP CRITICAL</span>
          <span className="badge badge-amber">NVDA AMC tonight</span>
          <span className="badge badge-green">MSFT MONITORING ✓</span>
          <span className="badge badge-amber">SGOV Friday</span>
        </div>
      </div>
    </div>
  );
}
