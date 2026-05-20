import { useState } from "react";
const STORAGE_KEY = "fund_journal_v4";
// TIME: UAE=UTC+4. LSE 11:00 UAE. NYSE 17:30 UAE.
// E20: IBKR TWS only for live prices. E28: Never widen stop within 1pt of trigger.
// SI-68: No close files until screenshots confirmed. I17: NEW FILE EVERY SESSION — NEVER OVERWRITE.
// T31: Stop below 52W low on 40%+ ATH names. SI-35: Max loss $500/trade. T10: Thesis not sizing input.
// SI-83: Stage 2 Active Request — state overdue Stage 2s at every session open Step 1b.
// SI-84: Chart Screenshot Request — proactively request weekly charts before ACTIVE elevation.
// P20: Stop protection review activates at >10% unrealised profit.
// DROPBOX: Claude writes directly to C:\Users\James Cadbury\Dropbox\Claude-Fund\journal\ via filesystem MCP. Confirmed working every session.

const INITIAL_STATE = {
  "lastUpdated": "2026-05-20 S48 CLOSE. Full analysis session. UUUU confirmed stopped out (~-$277, cash reconciled). CCL +3.73% strongest peace deal signal to date. NCLH recovered from 7c critical buffer to $0.85 buffer. IAU +0.93% recovery. NVDA Q1 FY2027 earnings reported AMC tonight — results pending, review S49. Stage 1 complete: V MONITORING ($318-322 alert $322) and SPGI MONITORING ($400-408 alert $408). Tensordyne valuation analysis completed. AI capex structural analysis completed. Daily P&L +$383.69 (+0.38%). Net Liq $101.1K. 14 positions.",
  "sessionNumber": "S48",
  "fund": {
    "account": "U24936508",
    "netLiquidity": 101100,
    "unrealizedPnL": -857.55,
    "dailyPnL": 383.69,
    "dailyPnLPct": 0.38,
    "cashUSD": 42363,
    "cashGBP": 1787,
    "cashEUR": -465,
    "broker": "IBKR Pro",
    "note": "v61 S48 CLOSE. Wed 20 May 2026. 14 positions. UUUU stopped out confirmed via cash reconciliation: USD cash +$824 = 50sh x ~$16.48 fill = -$277 realised loss. CCL +3.73% best daily gain since entry. NCLH recovered to $0.85 above stop. NVDA earnings pending. V and SPGI added to MONITORING. SGOV $30K still due Friday 22 May."
  },
  "offAccountReserves": {
    "note": "MATERIAL PORTFOLIO FACT: Significant cash reserves exist off the IBKR account. Available for deployment at market bottom or crash opportunity. IBKR account is the active trading and hedging vehicle, not the sole capital base. Crash deployment plan: IAU gains + external reserves deployed simultaneously at CAPE normalisation (20-25x target). Do not force IBKR cash into growth names ahead of crash.",
    "crashDeploymentPlan": "When CAPE falls to 20-25x (from current 40.93x): aggressively deploy both IBKR freed cash (from stops + SGOV) and external reserves into highest-conviction quality names at distressed valuations."
  },
  "thesis": {
    "title": "PEACE DEAL SIGNALS STRENGTHENING — OIL $103 — NVDA EARNINGS TONIGHT — BTC ~$77K",
    "summary": "Trump called off Iran strike Monday, stated Iran being reasonable, gave early next week deadline for peace deal. CCL +3.73% and NCLH +3.79% today — strongest single-session peace deal signal since April 8 ceasefire. WTI still $103 (SI-25 Condition 2 at $95.28 unmet). Trump comments weighted at 10% per established protocol — direction matters more than precision. NVDA Q1 FY2027 earnings reported AMC tonight, results pending. BTC ~$76-77K, kill switch $70K. Rate hike probability 45%.",
    "oilWTI": 103.00,
    "SI25Trigger": 105.87,
    "SI25Status": "Condition 1: UNMET (operational Hormuz reopening required). Condition 2: UNMET ($95.28 target, oil still $103). HOWEVER: CCL +3.73% and NCLH +3.79% today suggest market is beginning to price peace probability. Do NOT execute SI-25 manually. Stops protect downside. Trump deadline early next week — weighted 10% per protocol.",
    "hormuzStatus": "Trump called off Iran strike May 19. Stated Iran being reasonable. Gulf allies asked for more time. NATO considering escort operations. Market reading this as genuine de-escalation signal despite unresolved operational status.",
    "rateHikeAlert": "Fed rate hike probability 45% (was 1% one month ago). Warsh hawkish. WTI $103 = entrenched cost-push inflation. SGOV yield rises if hike materialises. SGOV order due Friday.",
    "nvdaEarnings": "NVDA Q1 FY2027 reported AMC tonight. Consensus: $79.2B revenue (+79.5% YoY), $1.78 EPS. Key watches: data centre revenue (consensus ~$73B), gross margin (74.5% consensus), Q2 guide (whisper ~$90B). Not actionable for fund — SI-39 trigger $159.14. Results will drive AI sector sentiment for PATH, ZETA, MSTR tomorrow.",
    "keyDates": [
      {"date":"Thu 21 May BMO","event":"NVDA results review at S49 open. AI sector sentiment assessment. Check PATH and ZETA pre-market.","priority":"HIGH"},
      {"date":"Fri 22 May","event":"SGOV $30K order submission. Remaining liquid USD ~$42,363 post-UUUU. RYAAY gate $52 still live (~$54.30 pre-market yesterday).","priority":"CRITICAL"},
      {"date":"Mon 25 May","event":"CRM T23 lock. Trump Iran deadline — early next week. Monitor peace signals. RYAAY gate $52 still open if stock drifts down.","priority":"CRITICAL"},
      {"date":"Tue 27 May 10am ET","event":"CGCT extraordinary shareholder vote. 10am ET = 2pm UAE. Post-merger ticker FAC. CONFIRM no redemption with IBKR before 25 May.","priority":"CRITICAL"},
      {"date":"Tue 27 May AMC","event":"CRM Q1 FY2027 earnings. CONDITIONAL: beat + Agentforce ARR >$1B required. T23 lock May 25. Max 27sh at $165-185.","priority":"CRITICAL"},
      {"date":"Wed 28 May AMC","event":"PATH Q1 FY2027 earnings. T23 lock May 26. Stop $9.20. DO NOT WIDEN (E28). Key risk: net new ARR -30% YoY.","priority":"HIGH"},
      {"date":"Fri 30 May","event":"IAU thesis review trigger check. Has peace deal been announced? Has Warsh cut rates unexpectedly? If either: manual review.","priority":"MEDIUM"},
      {"date":"Jun 17","event":"GTT.PA ex-dividend. Watch for post-div dip to EUR170-175 entry zone.","priority":"MEDIUM"},
      {"date":"Jun 23","event":"AVAV Q4 FY2026 earnings. Stop $155 still active. T23 lock Jun 21.","priority":"HIGH"},
      {"date":"Jun 30","event":"CCL Q2 earnings. Peace deal primary. Stop $23.00.","priority":"HIGH"},
      {"date":"Jul 1","event":"MU Q3 FY2026 earnings. MONITORING only — SI-35 prevents active sizing at $778+.","priority":"MEDIUM"},
      {"date":"Jul 4","event":"OKLO Groves test reactor criticality target. Entry post-criticality dip $50-55.","priority":"HIGH"},
      {"date":"Jul 28","event":"LEU Q2 earnings. Next LEU thesis checkpoint. GTT.PA H1 results same day.","priority":"HIGH"},
      {"date":"Late Jul","event":"IBM Q2 FINAL GATE. Consulting 5%+ constant currency + guidance raised = hold. Otherwise managed exit.","priority":"HIGH"},
      {"date":"Aug 4","event":"ZETA Q2 earnings. T23 lock ~Aug 2.","priority":"HIGH"},
      {"date":"Aug 12","event":"IonQ Q2 earnings. IONQ dip-buy $38-45 active.","priority":"HIGH"},
      {"date":"Jan 1 2028","event":"Russian TENEX uranium ban effective. LEU structural demand surge catalyst.","priority":"HIGH"}
    ]
  },
  "positions": [
    {"ticker":"IES","name":"Invinity Energy Systems","shares":3000,"avgPrice":17.49,"last":22.80,"unrealPnL":159,"unrealPct":30.4,"stopType":"MANUAL ALERT 12.5p","cur":"GBX","status":"HOLD — MANUAL ALERT 12.5p — LDES DECISION PENDING","note":"+30.4% unrealised. +0.22% today. LDES long-duration energy storage decision still pending. No stop — illiquid AIM stock, manual alert at 12.5p."},
    {"ticker":"ZETA","shares":191,"avgPrice":16.866,"last":18.28,"unrealPnL":270,"unrealPct":8.4,"stop":16.98,"status":"HOLD — STOP $16.98 — P20 ACTIVE — AUG 4 EARNINGS","note":"P20 protocol active. Stop $16.98 above breakeven. -0.11% today. Buffer $1.30 (7.1%). NVDA results tonight may affect AI software sentiment. T23 lock ~Aug 2. Aug 4 earnings gate."},
    {"ticker":"CODA","shares":250,"avgPrice":11.105,"last":11.26,"unrealPnL":33,"unrealPct":1.2,"stop":9.95,"status":"HOLD — STOP $9.95 — P14 DELIBERATE","note":"P14. Stop intentionally below journal level. Small position. +1.26% today. Buffer $1.31."},
    {"ticker":"LMT","shares":10,"avgPrice":516.831,"last":524.73,"unrealPnL":80,"unrealPct":1.6,"stop":479.77,"status":"HOLD — STOP $479.77 — PEACE DEAL RISK MONITOR","note":"-0.36% today. Buffer $44.96. Structural rearmament thesis (German budget, DoD munitions) survives peace deal. Stop $479.77 intact."},
    {"ticker":"CGCT","shares":291,"avgPrice":10.295,"last":10.40,"unrealPnL":31,"unrealPct":1.0,"stop":null,"status":"HOLD — NO STOP — VOTE MAY 27 10AM ET — CONFIRM NO REDEMPTION BEFORE MAY 25","note":"Vote May 27 10am ET (2pm UAE). Post-merger ticker FAC on Nasdaq. DO NOT redeem. Confirm no-redemption with IBKR before May 25."},
    {"ticker":"IAU","name":"iShares Gold Trust","shares":175,"avgPrice":86.006,"last":85.10,"unrealPnL":-162,"unrealPct":-1.1,"stop":null,"status":"PORTFOLIO ALLOCATION — NO STOP — T57 — MACRO HEDGE — RECOVERED","note":"T57. +0.93% today. Recovery from -$305 to -$162 unrealised. No stop: physical gold, patient capital, off-account reserves. Manual review triggers: (1) credible Hormuz operational reopening, (2) Warsh surprise rate cut."},
    {"ticker":"PATH","shares":320,"avgPrice":10.726,"last":10.47,"unrealPnL":-80,"unrealPct":-2.3,"stop":9.20,"status":"HOLD — STOP $9.20 — T23 LOCK MAY 26 — EARNINGS MAY 28","note":"-0.76% today. T23 lock May 26. Earnings May 28 AMC. Buffer $1.27 (12.1%). DO NOT WIDEN (E28). NVDA results tonight affect AI software sentiment."},
    {"ticker":"CCL","shares":250,"avgPrice":24.706,"last":24.78,"unrealPnL":18,"unrealPct":0.3,"stop":23.00,"status":"HOLD — STOP $23.00 — T47 — PEACE DEAL PRIMARY — BEST SESSION SINCE ENTRY","note":"T47. +3.73% TODAY — strongest single-session move since entry. Now marginally positive unrealised. Stop buffer widened from $0.73 to $1.78. CCL +$221 daily P&L = largest contributor today. Stop $23.00 intact. Do not widen. Let thesis play."},
    {"ticker":"IBM","shares":26,"avgPrice":228.739,"last":220.61,"unrealPnL":-213,"unrealPct":-3.6,"stop":210.08,"status":"HOLD — STOP $210.08 — Q2 JULY GATE","note":"-0.77% today. Buffer $10.53. Q2 July: consulting 5%+ constant ccy + raised guidance = hold. Otherwise managed exit."},
    {"ticker":"PYPL","shares":55,"avgPrice":45.639,"last":43.39,"unrealPnL":-124,"unrealPct":-4.9,"stop":37.50,"status":"HOLD — STOP $37.50 — T39","note":"T39. -1.00% today. TPV +11% structural thesis intact. Buffer $5.89."},
    {"ticker":"NCLH","shares":75,"avgPrice":15.914,"last":15.35,"unrealPnL":-43,"unrealPct":-3.6,"stop":14.50,"status":"HOLD — STOP $14.50 — RECOVERED FROM CRITICAL — BUFFER $0.85","note":"T48. +3.79% TODAY. CRITICAL BUFFER RESOLVED: was 7c this morning, now $0.85 above stop. Peace deal primary. Stop $14.50 confirmed. Hold to stop or peace deal resolution."},
    {"ticker":"MSTR","shares":15,"avgPrice":181.067,"last":165.96,"unrealPnL":-226,"unrealPct":-8.3,"stop":153.14,"status":"HOLD — STOP $153.14 — BTC ~$77K — KILL SWITCH $70K","note":"BTC ~$76-77K range. Kill switch $70K. Scale gate $85K. +0.81% today. Buffer $12.82 (7.7%). CLARITY Act 45% Polymarket odds."},
    {"ticker":"LEU","shares":15,"avgPrice":191.697,"last":172.00,"unrealPnL":-292,"unrealPct":-10.1,"stop":158.17,"status":"HOLD — STOP $158.17 — T52 — HALEU — THESIS INTACT","note":"T52. +1.78% today. $900M DOE HALEU confirmed. Russian ban 2028 structural. Stop $158.17 below Feb capitulation base. Buffer $13.83 (8.0%). July 28 earnings checkpoint."},
    {"ticker":"AVAV","shares":15,"avgPrice":185.067,"last":161.00,"unrealPnL":-362,"unrealPct":-13.0,"stop":155.00,"status":"HOLD — STOP $155.00 — T31 — EARNINGS JUN 23 — PEACE DEAL RISK","note":"T31. +0.48% today. Buffer $6.00 (3.7%). Contract pipeline intact (PANTHER $43M, LASSO, MAYHEM). Stop $155 below 52wk low $156. Jun 23 earnings. DO NOT EXIT MANUALLY (E28)."}
  ],
  "closedToday": [
    {"ticker":"UUUU","action":"STOPPED OUT","shares":50,"avgCost":22.011,"exitPrice":16.48,"estimatedRealizedPnL":-276.55,"note":"Stop $16.50 triggered. Estimated fill ~$16.48 (confirmed via cash reconciliation: USD cash +$824 = 50sh x $16.48). Entry $22.011. Loss: 50 x ($22.011 - $16.48) = -$276.55. Uranium spot retreat from $100 high drove sector pressure. Thesis intact but stop correctly triggered. Verify exact fill in IBKR Trades tab."}
  ],
  "openedToday": [],
  "macroHedge": {
    "title": "IAU PORTFOLIO ALLOCATION — T57 — RECOVERING",
    "entry": 86.006,
    "shares": 175,
    "currentPrice": 85.10,
    "unrealisedPnL": -162,
    "noStopRationale": "Physical gold, patient capital, off-account reserves remove forced liquidation risk.",
    "thesisBreakTriggers": ["Credible Hormuz operational reopening", "Warsh surprise rate cut"],
    "keyLevels": {
      "support": ["$84.00 (confirmed 4-5 bounces)", "$80-82 (structural)"],
      "resistance": ["$88-90", "$92-96", "$99.99", "$104 (Feb panic high)"]
    }
  },
  "sgov": {
    "title": "SGOV $30K — DUE FRIDAY 22 MAY",
    "amount": 30000,
    "yield": 3.94,
    "monthlyIncome": 98.50,
    "note": "Submit Friday May 22. T+1 settlement. Rate hike 45% = SGOV yield rises at T-bill reset (every 90 days). USD cash $42,363. Remainder after SGOV: $12,363 covers RYAAY ($5,200) and CRM ($4,455) if both triggered.",
    "rateHikeNote": "SGOV is one of few instruments that mechanically benefits from rate hikes."
  },
  "pendingGTCs": [
    {"ticker":"LAC","action":"BUY","limit":4.80,"stop":4.00,"qty":220,"maxLoss":176,"status":"GTC $4.80 / STOP $4.00 — SI-37","note":"Thacker Pass Phase 1. Still active."},
    {"ticker":"TXT","action":"BUY","limit":88.00,"stop":79.00,"qty":55,"maxLoss":495,"status":"GTC $88 PENDING","note":"Bell MV-75 Valor. Still active."}
  ],
  "watchList": [
    {"ticker":"IONQ","thesis":"Trapped-ion quantum. Stage 2 complete. Q1 rev $64.7M +755% YoY. Above $38-45 entry zone.","entry":"$38-45 dip ONLY. Stop $27. Target $80-100.","gate":"Q2 Aug 12. T23 lock ~Aug 10. No entry above $45.","status":"ACTIVE — DIP BUY $38-45 — ABOVE ZONE"},
    {"ticker":"TUI1","name":"TUI AG","thesis":"Peace deal re-rating. Entry zone EUR5.80-6.20.","entry":"EUR5.80-6.20. Stop EUR4.90. Target EUR9.20.","gate":"Above zone. CCL/NCLH peace deal signals strengthening — TUI re-rating follows.","status":"ACTIVE — ABOVE ZONE — PEACE DEAL WATCH"},
    {"ticker":"SIX2","name":"Sixt SE","thesis":"German premium car rental. Peace deal consumer recovery.","entry":"EUR62-65. Stop EUR54. Target EUR97.","gate":"Above zone. Wait.","status":"ACTIVE — ABOVE ZONE — WAIT"},
    {"ticker":"RYAAY","name":"Ryanair","thesis":"LCC. Peace deal. FY26 profit record +40% (EUR2.26B). 80% jet fuel hedged at $67/bbl. Gate $52.","entry":"$52 or below. Stop $47. 100sh = $5,200.","gate":"Earnings done May 18. Stock ~$54.30 pre-market May 20. Gate $52 = ~$2.30 away. Peace deal = stronger catalyst than guidance caution.","status":"ACTIVE — EARNINGS DONE — GATE $52 LIVE — MONITOR DAILY"},
    {"ticker":"CRM","name":"Salesforce","thesis":"Stage 2 complete. 12.73x forward PE. Agentforce ARR $800M. T23 lock May 25.","entry":"$165-185 post-earnings. Stop ~$152. Max 27sh.","gate":"Earnings May 27 AMC. CONDITIONAL: beat + Agentforce ARR >$1B. DO NOT ENTER PRE-EARNINGS.","status":"ACTIVE — T23 LOCK MAY 25 — EARNINGS MAY 27 AMC"},
    {"ticker":"V","name":"Visa Inc","thesis":"S48 Stage 1 COMPLETE. Payment network toll road. No commodity/Hormuz exposure. Peace deal consumer recovery upside. 80%+ gross margins, ~15% EPS growth, ~27x forward PE. Entry zone $318-322 on pullback from $332 resistance. R/R 2.5:1 at $320 (target $375). Stop $298.","entry":"$318-322 pullback only. Stop $298. Target $375. R/R 2.5:1.","gate":"Price alert set at $322. Stage 2 required before entry. Do not enter at $330 approaching resistance.","status":"MONITORING — S48 NEW — STAGE 1 COMPLETE — ALERT $322"},
    {"ticker":"SPGI","name":"S&P Global","thesis":"S48 Stage 1 COMPLETE. Ratings duopoly with MCO. Every bond issuance globally pays toll. Market Intelligence 80%+ retention. Down 28-30% from Aug 2025 ATH (~$570). Lower highs pattern since Feb 2026 crash — not yet stabilised. Rate hike 45% suppresses near-term issuance. Entry $400-408. Stop $383. Target $480. R/R 3.5:1.","entry":"$400-408. Stop $383. Target $480. R/R 3.5:1.","gate":"Price alert set at $408. Wait for lower highs pattern to break. Catalyst: credible Fed rate peak signal OR issuance surge.","status":"MONITORING — S48 NEW — STAGE 1 COMPLETE — ALERT $408"},
    {"ticker":"T53_LEU","name":"LEU Conditional Second Tranche","thesis":"Pullback entry. Chart bearish near-term. Wait for $170-175 zone.","entry":"$170-175. Stop $150. 13 shares.","gate":"No DOE failure. No thesis break. Combined T52+T53 max ~$820.","status":"MONITORING — CONDITIONAL — PATIENCE REQUIRED"},
    {"ticker":"HD","name":"Home Depot","thesis":"Q1 FY2026: EPS $3.43 vs $3.41 est (0.7% beat). Revenue $41.77B in line. Same-store sales +0.6% (flat). Operating margin fell 11.9% from 12.9%. Guidance reaffirmed. Stock flat ~$302. NOT a thesis-confirming beat. Class action lawsuit (filed May 15) still under investigation.","entry":"Below $280 only (Screen B candidate). No entry at $302.","gate":"Class action investigation required. Stage 1 incomplete.","status":"UNIVERSE — POST-EARNINGS FLAT — NOT COMPELLING — WAIT $280"},
    {"ticker":"RCL","name":"Royal Caribbean","thesis":"Peace deal bounce. 60% hedged. Lower R/R than CCL.","entry":"$255-270. Stop $245. Target $320-340.","gate":"CCL/NCLH resolution first. No third cruise position while both active.","status":"MONITORING — GATE: CCL/NCLH RESOLUTION FIRST"},
    {"ticker":"GTT","name":"Gaztransport Technigaz","thesis":"LNG royalty. 68% EBITDA margin. Above entry zone. Ex-div Jun 17 (~EUR9). Post-div price ~EUR198 still above zone.","entry":"EUR170-175. Stop EUR158. Target EUR235.","gate":"Ex-div Jun 17. Post-div dip watch.","status":"MONITORING — ABOVE ZONE — WAIT POST-JUN 17"},
    {"ticker":"MSTR_SCALE","name":"MicroStrategy scale","thesis":"BTC ~$77K. Scale gate $85K. Kill switch $70K. CLARITY Act 45%.","entry":"Market on BTC $85K + CLARITY floor vote.","gate":"BTC moving away from scale gate. Monitor weekly.","status":"MONITORING — BTC BELOW GATE"},
    {"ticker":"MU","name":"Micron Technology","thesis":"HBM supercycle. SI-35 prevents sizing at current levels. July 1 earnings.","entry":"Speculative only: 2-3 shares, stop $580.","gate":"July 1 earnings.","status":"MONITORING — SI-35 PREVENTS ACTIVE"},
    {"ticker":"SOFI","name":"SoFi Technologies","thesis":"T27 pattern. Fintech.","entry":"$13-14 on pullback.","gate":"PYPL gate first.","status":"MONITORING — PYPL GATE FIRST"},
    {"ticker":"LULU","name":"Lululemon","thesis":"52-week low $119. Down 65% ATH. Forward PE 9.6x. Earnings May 28 AMC.","entry":"Post May 28 ONLY if: beat + guidance stabilisation.","gate":"Q1 earnings May 28 AMC.","status":"MONITORING — EARNINGS MAY 28"},
    {"ticker":"MSFT","name":"Microsoft","thesis":"Stage 1 complete S47. 21.7x forward PE. Azure +40%, AI run rate $37B +123% YoY. Margins guided UP despite capex. 23.8% below ATH.","entry":"$395-410 (50dma zone). Stop $358. Alert $410.","gate":"Q4 FY2026 earnings July 2026. Stage 2 required before entry.","status":"MONITORING — STAGE 1 COMPLETE S47 — STAGE 2 REQUIRED — ALERT $410"},
    {"ticker":"META","name":"Meta Platforms","thesis":"HIGHEST CONVICTION NEW CANDIDATE S48. 19x forward PE with 25% revenue growth. PEG <1. AI advertising ROI already in reported numbers. Cheapest megacap by PEG. Peace deal = consumer confidence = ad spend recovery. Stage 1 required urgently.","entry":"Stage 1 required. Approximate zone $550-580.","gate":"Stage 1 this week or next.","status":"UNIVERSE — S48 PRIORITY UPGRADE — STAGE 1 REQUIRED URGENTLY"},
    {"ticker":"BKNG","name":"Booking Holdings","thesis":"S48 NEW. 20-22x forward PE for 20%+ EPS compounder. 85%+ gross margins. 15-20% of all global online hotel/flight bookings. Peace deal = Gulf corridor reopens. Asset-light toll road. Not correlated with oil or rates. $7B+ FCF with aggressive buybacks.","entry":"Stage 1 required. Approximate zone below $4,500.","gate":"Stage 1 required.","status":"UNIVERSE — S48 NEW — STAGE 1 REQUIRED"},
    {"ticker":"ORCL","name":"Oracle","thesis":"S48 NEW. Cloud database migration of enterprise captive base. $130B contracted backlog. Revenue growth accelerating 8-10% to 15-17%. AI training workloads on OCI. Forward PE ~22-24x. No Hormuz exposure. Not rate-sensitive (enterprise contracts).","entry":"Stage 1 required. Approximate zone below $165.","gate":"Stage 1 required.","status":"UNIVERSE — S48 NEW — STAGE 1 REQUIRED"},
    {"ticker":"XLF_KRE","name":"US Financials / Regional Banks","thesis":"Rate hike 45% = NIM expansion direct beneficiary. Fund has zero financial sector exposure.","entry":"Stage 1 required. XLF vs KRE comparison needed.","gate":"Stage 1 this week.","status":"UNIVERSE — STAGE 1 URGENT"},
    {"ticker":"OKLO","name":"Oklo Inc","thesis":"SMR. July 4 Groves criticality. $1B ATM overhang. Entry post-criticality dip.","entry":"Post July 4 criticality dip ~$50-55. SI-37 cap $1,500.","gate":"July 4 criticality target.","status":"UNIVERSE — JULY 4 GATE"},
    {"ticker":"CSCO","name":"Cisco Systems","thesis":"Q3 FY2026: AI orders raised $5B to $9B. P13 applies at current levels.","entry":"Pullback to ~$100-108.","gate":"Stage 1 needed. P13 active.","status":"UNIVERSE — P13 APPLIES — WAIT"},
    {"ticker":"DELL","name":"Dell Technologies","thesis":"Q4 FY2026: +39% revenue, AI server backlog $43B. P13 applies.","entry":"Pullback to $120-130.","gate":"Stage 1 needed. P13 active.","status":"UNIVERSE — P13 APPLIES — WAIT"},
    {"ticker":"POET","name":"POET Technologies","thesis":"THESIS BREAK: Marvell order cancelled. Meme momentum only. Q1 earnings May 22 — observe only.","entry":"Do not enter.","gate":"Thesis break disqualifies.","status":"UNIVERSE — THESIS BREAK — OBSERVE ONLY"},
    {"ticker":"ENGIE_PA","name":"Engie SA","thesis":"Demoted S44. Near ATH. Morningstar premium unresolved.","entry":"EUR22-24 pullback only.","gate":"Stage 2 required.","status":"UNIVERSE — DEMOTED S44 — DO NOT ENTER AT EUR27"},
    {"ticker":"BWXT","name":"BWX Technologies","thesis":"Nuclear defense. SI-39 at $183.","entry":"$183 SI-39 trigger.","gate":"Currently ~$208.","status":"UNIVERSE — SI-39 AT $183"}
  ],
  "shortWatchlist": [
    {"ticker":"PLTR","thesis":"Dormant until Q2 July 2026.","status":"DORMANT UNTIL Q2 JULY","trigger":"Q2 guidance cut only"},
    {"ticker":"AAL","thesis":"No fuel hedge, $36.5B debt.","trigger":"Dead-cat bounce $13-14.","status":"WATCH"},
    {"ticker":"SNOW","thesis":"18x forward revenue.","trigger":"Earnings miss + guidance trim.","status":"WATCH"}
  ],
  "macroRisk": {
    "title":"STAGFLATION CRASH RISK — RATE HIKE 45% — CAPE 40.93x — PEACE DEAL COUNTERWEIGHT EMERGING",
    "shillerCAPE":"40.93x — 97th percentile historically.",
    "rateHike":"45% probability Fed hike to 3.75-4%. Was 1% one month ago.",
    "peaceCounterweight":"CCL +3.73%, NCLH +3.79% May 20. Oil falling from $108 toward SI-25 Condition 2 ($95.28). Peace deal = oil decline = inflation relief = rate hike odds fall. Risks partially offset.",
    "hedgeStrategy":"IAU (stagflation hedge, recovering), SGOV (T-bill, benefits from hike, $30K Friday), external reserves (crash deployment at CAPE 20-25x). Do not add growth equity. Let stops work."
  },
  "btcState": {
    "currentPrice": 77000,
    "killSwitch": 70000,
    "scaleGate": 85000,
    "bufferToKillSwitch": 7000,
    "bufferToScaleGate": -8000,
    "mstrAction": "Hold to stop $153.14. No scale action until BTC weekly close above $85K.",
    "clarityAct": "Committee passed 15-9. Full Senate floor vote needs 60 votes. 45% Polymarket odds. Ethics provision unresolved."
  },
  "processNotes": {
    "i17JournalRule": "NEW FILE EVERY SESSION. Today: trading_journal61.jsx (S48). Next session: trading_journal62.jsx (S49). File name increments every session regardless of whether trades occur.",
    "dropboxProtocol": "DIRECT WRITE CONFIRMED. Claude writes directly to C:\\Users\\James Cadbury\\Dropbox\\Claude-Fund\\journal\\ via filesystem MCP tool. This has worked every session. The allowed directory is the Dropbox folder. No manual steps required.",
    "si83Check": "No overdue Stage 2 items at S48 open. CRM Stage 2 complete (ACTIVE). META Stage 1 overdue — flagged as PRIORITY UPGRADE. Target Stage 1 completion by S50.",
    "si84Check": "V and SPGI charts reviewed S48 (4 charts provided). Both Stage 1 decisions driven by chart structure. Protocol working."
  },
  "tensordynePrivate": {
    "note": "Private investment — not tracked as IBKR position. Analysis completed S48.",
    "currentForgePrice": 14.50,
    "forgeDate": "2026-03-08",
    "totalFunding": 209000000,
    "keyTech": "Logarithmic Number System (LNS). Replaces floating-point matrix multiplication with log-domain addition. 8x claimed power efficiency vs Nvidia Blackwell NVL72. 1/3 capex per token. Air-cooled. TSMC 3nm. 144GB HBM3e.",
    "productStatus": "Pre-silicon as of Sep 2025. Tape-out imminent. Product launch target mid-2026 (3 months from now per owner).",
    "valuationScenarios": {
      "conservative": {"trigger":"1-2 hyperscaler wins, $300-500M ARR","valuation":"$7-12B","multipleOfForge":"14-24x"},
      "groqComp": {"trigger":"Major hyperscaler commitment, $1B ARR","valuation":"$24B","multipleOfForge":"~48x"},
      "ipoBaseCase": {"trigger":"3yr post-launch, $1.5-2.5B ARR","valuation":"$20-40B","multipleOfForge":"40-80x"},
      "failure": {"trigger":"Silicon misses LNS accuracy/power spec","valuation":"Write-off","multipleOfForge":"0"}
    },
    "keyComps": "Groq acquired by Nvidia Dec 2025 at $20B. Cerebras IPO May 14 2026 at ~$56B day-one valuation. AI acquisition multiple: 24x revenue.",
    "binaryEvent": "3-month silicon validation window. LNS addition correction factor (Pareto approximation) is the key technical risk. Monitor technical publications and Tensordyne press releases for first silicon benchmark results."
  },
  "tradeTracker": {
    "closedTrades": [
      {"id":1,"ticker":"CCL","dateIn":"2026-03-24","dateOut":"2026-03-26","qty":240,"entry":24.83,"exit":25.35,"ccy":"USD","pnlUSD":122.35,"note":"S07."},
      {"id":2,"ticker":"ONDS","dateIn":"2026-03-24","dateOut":"2026-03-30","qty":250,"entry":10.90,"exit":8.505,"ccy":"USD","pnlUSD":-601.30,"note":"Stopped."},
      {"id":3,"ticker":"KTOS","dateIn":"2026-03-24","dateOut":"2026-03-30","qty":100,"entry":81.00,"exit":64.977,"ccy":"USD","pnlUSD":-1604.27,"note":"P12. Lesson: no momentum entries without defined catalyst edge."},
      {"id":4,"ticker":"UEC","dateIn":"2026-03-25","dateOut":"2026-03-31","qty":206,"entry":13.77,"exit":13.16,"ccy":"USD","pnlUSD":-127.76,"note":"Stopped."},
      {"id":5,"ticker":"IAG","dateIn":"2026-03-27","dateOut":"2026-04-01","qty":2200,"entry":3.55,"exit":3.70,"ccy":"GBP","pnlUSD":407.36,"note":"Peace thesis."},
      {"id":6,"ticker":"RCL","dateIn":"2026-03-24","dateOut":"2026-04-02","qty":36,"entry":273.54,"exit":269.91,"ccy":"USD","pnlUSD":-132.89,"note":"Stopped."},
      {"id":7,"ticker":"LEU","dateIn":"2026-03-24","dateOut":"2026-04-07","qty":13,"entry":188.79,"exit":170.26,"ccy":"USD","pnlUSD":-242.94,"note":"T7. Re-entered T52."},
      {"id":8,"ticker":"LDO","dateIn":"2026-03-27","dateOut":"2026-04-07","qty":17,"entry":58.10,"exit":59.56,"ccy":"EUR","pnlUSD":20.51,"note":"Partial."},
      {"id":9,"ticker":"UPS","dateIn":"2026-04-08","dateOut":"2026-04-08","qty":50,"entry":100.17,"exit":99.60,"ccy":"USD","pnlUSD":-30.61,"note":"Same-day."},
      {"id":10,"ticker":"R3NK","dateIn":"2026-03-26","dateOut":"2026-04-08","qty":80,"entry":51.51,"exit":56.01,"ccy":"EUR","pnlUSD":385.86,"note":"First entry."},
      {"id":11,"ticker":"PLTR","dateIn":"2026-03-24","dateOut":"2026-04-09","qty":49,"entry":161.608,"exit":134.976,"ccy":"USD","pnlUSD":-1307.11,"note":"P6 lesson. Narrative entry without valuation discipline."},
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
      {"id":32,"ticker":"V","dateIn":"2026-03-24","dateOut":"2026-05-05","qty":8,"entry":307.125,"exit":321.823,"ccy":"USD","pnlUSD":117.58,"note":"T28. Re-entry zone $318-322 now defined."},
      {"id":33,"ticker":"NOG","dateIn":"2026-05-04","dateOut":"2026-05-07","qty":200,"entry":26.771,"exit":25.11,"ccy":"USD","pnlUSD":-332.20,"note":"Iran noise."},
      {"id":34,"ticker":"R3NK","dateIn":"2026-04-08","dateOut":"2026-05-07","qty":25,"entry":52.27,"exit":53.44,"ccy":"EUR","pnlUSD":31.59,"note":"T30."},
      {"id":35,"ticker":"R3NK","dateIn":"2026-05-07","dateOut":"2026-05-11","qty":25,"entry":52.00,"exit":47.01,"ccy":"EUR","pnlUSD":-136,"note":"T35."},
      {"id":36,"ticker":"AMPX","dateIn":"2026-05-05","dateOut":"2026-05-07","qty":168,"entry":18.106,"exit":17.94,"ccy":"USD","pnlUSD":-27.89,"note":"Gapped stop."},
      {"id":37,"ticker":"MRVL","dateIn":"2026-03-24","dateOut":"2026-05-07","qty":10,"entry":152.10,"exit":160.02,"ccy":"USD","pnlUSD":79.20,"note":"Stop triggered."},
      {"id":38,"ticker":"CEG","dateIn":"2026-05-04","dateOut":"2026-05-07","qty":14,"entry":308.072,"exit":314.77,"ccy":"USD","pnlUSD":93.77,"note":"Stop raised."},
      {"id":39,"ticker":"PYPL","dateIn":"2026-05-08","dateOut":null,"qty":55,"entry":45.639,"exit":null,"ccy":"USD","pnlUSD":null,"note":"T39: Q1 beat. Stop $37.50. OPEN."},
      {"id":41,"ticker":"R3NK","dateIn":"2026-05-11","dateOut":"2026-05-12","qty":200,"entry":46.485,"exit":43.9925,"ccy":"EUR","pnlUSD":-543,"note":"T41. CLOSED. T33 lesson — entered post-re-rating."},
      {"id":42,"ticker":"IREN","dateIn":"2026-05-11","dateOut":"2026-05-18","qty":24,"entry":55.042,"exit":51.98,"ccy":"USD","pnlUSD":-73.49,"note":"T42: Stop $52.00 triggered S46."},
      {"id":43,"ticker":"ZETA","dateIn":"2026-05-11","dateOut":null,"qty":191,"entry":16.866,"exit":null,"ccy":"USD","pnlUSD":null,"note":"T43: +8.4% unrealised. P20 active. Stop $16.98. OPEN."},
      {"id":44,"ticker":"PATH","dateIn":"2026-05-11","dateOut":null,"qty":320,"entry":10.726,"exit":null,"ccy":"USD","pnlUSD":null,"note":"T44: T23 lock May 26. Earnings May 28. OPEN."},
      {"id":45,"ticker":"LDO","dateIn":"2026-03-27","dateOut":"2026-05-12","qty":35,"entry":56.086,"exit":50.00,"ccy":"EUR","pnlUSD":-232,"note":"T45. CLOSED. T33 lesson."},
      {"id":46,"ticker":"AMZN","dateIn":"2026-03-24","dateOut":"2026-05-12","qty":30,"entry":201.204,"exit":263.943,"ccy":"USD","pnlUSD":1882,"note":"T46. Largest gain. CLOSED. Quality compounder patience rewarded."},
      {"id":47,"ticker":"CCL","dateIn":"2026-05-13","dateOut":null,"qty":250,"entry":24.706,"exit":null,"ccy":"USD","pnlUSD":null,"note":"T47: Peace deal primary. Stop $23.00. +3.73% today. Now marginally positive. OPEN."},
      {"id":48,"ticker":"NCLH","dateIn":"2026-05-13","dateOut":null,"qty":75,"entry":15.914,"exit":null,"ccy":"USD","pnlUSD":null,"note":"T48: Peace deal secondary. Stop $14.50. +3.79% today. Recovered from 7c critical buffer to $0.85 buffer. OPEN."},
      {"id":49,"ticker":"MSFT","dateIn":"2026-04-30","dateOut":"2026-05-13","qty":25,"entry":403.052,"exit":402.09,"ccy":"USD","pnlUSD":-24,"note":"T49. CLOSED."},
      {"id":50,"ticker":"CCJ","dateIn":"2026-04-29","dateOut":"2026-05-13","qty":50,"entry":117.02,"exit":112.17,"ccy":"USD","pnlUSD":-243,"note":"T50. CLOSED."},
      {"id":51,"ticker":"BAH","dateIn":"2026-04-08","dateOut":"2026-05-13","qty":33,"entry":76.531,"exit":69.00,"ccy":"USD","pnlUSD":-249,"note":"T51. CLOSED. Thesis not specific enough."},
      {"id":52,"ticker":"LEU","dateIn":"2026-05-14","dateOut":null,"qty":15,"entry":191.697,"exit":null,"ccy":"USD","pnlUSD":null,"note":"T52: HALEU. Stop $158.17. +1.78% today. July 28 earnings. OPEN."},
      {"id":53,"ticker":"CRML","dateIn":"2026-03-24","dateOut":"2026-05-15","qty":110,"entry":9.08,"exit":11.1744,"ccy":"USD","pnlUSD":230.38,"note":"S44. CLOSED."},
      {"id":54,"ticker":"ABVX","dateIn":"2026-04-06","dateOut":"2026-05-15","qty":50,"entry":109.89,"exit":120.909,"ccy":"USD","pnlUSD":550.95,"note":"S44. M&A. CLOSED."},
      {"id":55,"ticker":"SNPS","dateIn":"2026-03-24","dateOut":"2026-05-15","qty":8,"entry":495.125,"exit":496.65,"ccy":"USD","pnlUSD":12.20,"note":"S45. CLOSED."},
      {"id":56,"ticker":"RR","dateIn":"2026-04-23","dateOut":"2026-05-15","qty":100,"entry":1128.60,"exit":1149.20,"ccy":"GBP","pnlUSD":26.16,"note":"S45. CLOSED."},
      {"id":57,"ticker":"IAU","dateIn":"2026-05-18","dateOut":null,"qty":175,"entry":86.006,"exit":null,"ccy":"USD","pnlUSD":null,"note":"T57: Portfolio allocation macro hedge. No stop. +0.93% today, recovering. OPEN."},
      {"id":58,"ticker":"UUUU","dateIn":"2026-03-24","dateOut":"2026-05-20","qty":50,"entry":22.011,"exit":16.48,"ccy":"USD","pnlUSD":-276.55,"note":"Stop $16.50 triggered May 20 S48. Estimated fill $16.48 confirmed via USD cash reconciliation: +$824 = 50sh x $16.48. Uranium spot retreat from $100 high drove sector pressure. Thesis intact at exit but stop correctly triggered. Verify exact fill in IBKR Trades tab. CLOSED."}
    ],
    "lastUpdated":"2026-05-20 S48 CLOSE. 58 rows (44 closed + 14 open). T58 UUUU stopped out -$276.55 estimated. Open: T39 PYPL, T43 ZETA, T44 PATH, T47 CCL, T48 NCLH, T52 LEU, T57 IAU + IES/CODA/CGCT/LMT/IBM/MSTR/AVAV. T40 unused."
  },
  "sessionNotes": [
    {"date":"2026-05-07","note":"S37: LMT stop raised. RR.L Q1 beat. NOG T33 sold. R3NK T34/T35. AMPX/MRVL/CEG closed."},
    {"date":"2026-05-08","note":"S38: SNPS+MSFT stops raised. T39 PYPL. UUUU Q1 beat. CENTCOM strikes."},
    {"date":"2026-05-09","note":"S39: Rules framework overhauled. SI-69-76 added."},
    {"date":"2026-05-11","note":"S40: T35 R3NK stopped. T41/T42/T43/T44 entered. Net liq $104.2K."},
    {"date":"2026-05-12","note":"S41: Framework v2.0. T46 AMZN +$1,882. Net liq $102.3K."},
    {"date":"2026-05-13","note":"S42: T47 CCL @$24.70. T48 NCLH @$15.90. CLARITY tonight."},
    {"date":"2026-05-14","note":"S43: CGCT hold confirmed. T52 LEU entered. CLARITY passed committee."},
    {"date":"2026-05-15","note":"S44: CRML +$230. ABVX +$551. CLARITY 15-9. Trump-Xi Hormuz statement."},
    {"date":"2026-05-16","note":"S45: SNPS+RR.L discovered stopped +$38. 15 positions. BTC $79K. Warsh confirmed."},
    {"date":"2026-05-18","note":"S46: T42 IREN stopped -$73.49. T57 IAU opened @$86.00. Rate hike 45%. Net liq $101.7K."},
    {"date":"2026-05-19","note":"S47: Full scan. AVAV SI-84 chart reviewed. Apex Tech World report integrated. MSFT MONITORING. NCLH 7c from stop (critical). UUUU 28c from stop. Daily P&L -$700. 15 positions."},
    {"date":"2026-05-20","note":"S48: UUUU confirmed stopped out -$277 (cash reconciliation). CCL +3.73% best session since entry — peace deal signals. NCLH recovered from 7c critical buffer to $0.85 buffer. IAU +0.93% recovery. NVDA earnings AMC tonight — results pending S49. Stage 1 complete V ($318-322 MONITORING) and SPGI ($400-408 MONITORING). Tensordyne valuation analysis: $7-24B acquisition range, $20-40B IPO range if silicon validates. AI capex structural analysis completed. Dropbox direct write confirmed via filesystem MCP. I17 corrected. Daily P&L +$383.69 (+0.38%). Net Liq $101.1K. 14 positions."}
  ]
};

const COLORS = {
  bg:"#0d1117",card:"#161b22",border:"#30363d",accent:"#58a6ff",
  green:"#3fb950",red:"#f85149",yellow:"#d29922",blue:"#388bfd",
  text:"#c9d1d9",textDim:"#8b949e",textBright:"#f0f6fc",purple:"#a371f7",orange:"#f0883e"
};

export default function TradingJournal() {
  const [data] = useState(INITIAL_STATE);
  const [activeTab, setActiveTab] = useState("positions");
  const [newNote, setNewNote] = useState("");
  const [notes, setNotes] = useState(INITIAL_STATE.sessionNotes || []);
  const addNote = () => { if (!newNote.trim()) return; setNotes([...notes, {date: new Date().toISOString().slice(0,10), note: newNote}]); setNewNote(""); };
  const tabs = ["positions","watch","macro","peace","tracker","notes"];
  const pnlColor = (v) => v > 0 ? COLORS.green : v < 0 ? COLORS.red : COLORS.textDim;
  const sc = (s) => s?.includes("ACTIVE") ? COLORS.green : s?.includes("MONITORING") ? COLORS.accent : s?.includes("DO NOT") || s?.includes("UNIVERSE") ? COLORS.red : s?.includes("PORTFOLIO") || s?.includes("ALLOCATION") ? COLORS.purple : COLORS.yellow;
  const bl = (p) => { if (p.unrealPnL > 200) return "3px solid "+COLORS.green; if (p.unrealPnL < -300) return "3px solid "+COLORS.red; if (p.status?.includes("PORTFOLIO")||p.status?.includes("ALLOCATION")) return "3px solid "+COLORS.purple; return undefined; };

  return (
    <div style={{background:COLORS.bg,minHeight:"100vh",color:COLORS.text,fontFamily:"monospace",padding:16,maxWidth:1200,margin:"0 auto"}}>
      <style>{`.card{background:${COLORS.card};border:1px solid ${COLORS.border};border-radius:6px;padding:12px}.badge{font-size:10px;padding:2px 6px;border-radius:4px;font-weight:600;display:inline-block}.badge-green{background:rgba(63,185,80,.15);color:${COLORS.green};border:1px solid rgba(63,185,80,.3)}.badge-red{background:rgba(248,81,73,.15);color:${COLORS.red};border:1px solid rgba(248,81,73,.3)}.badge-amber{background:rgba(210,153,34,.15);color:${COLORS.yellow};border:1px solid rgba(210,153,34,.3)}.badge-blue{background:rgba(56,139,253,.15);color:${COLORS.blue};border:1px solid rgba(56,139,253,.3)}.badge-purple{background:rgba(163,113,247,.15);color:${COLORS.purple};border:1px solid rgba(163,113,247,.3)}.badge-grey{background:rgba(139,148,158,.15);color:${COLORS.textDim};border:1px solid rgba(139,148,158,.3)}.btn{background:${COLORS.card};border:1px solid ${COLORS.border};color:${COLORS.text};padding:6px 12px;border-radius:4px;cursor:pointer;font-family:monospace;font-size:12px}.btn:hover{background:#21262d}.btn-primary{background:rgba(88,166,255,.15);border-color:rgba(88,166,255,.4);color:${COLORS.accent}}input{background:${COLORS.card};border:1px solid ${COLORS.border};color:${COLORS.text};padding:8px;border-radius:4px;font-family:monospace;font-size:12px;flex:1}`}</style>
      <div style={{marginBottom:16}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:8}}>
          <div>
            <div style={{fontSize:18,fontWeight:700,color:COLORS.textBright}}>CLAUDE FUND — JOURNAL v61 S48</div>
            <div style={{fontSize:11,color:COLORS.textDim,marginTop:2}}>Session 48 — Wed 20 May 2026 | {data.fund.account} | 14 positions | Daily +$383.69 (+0.38%)</div>
          </div>
          <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
            {[{l:"NET LIQ",v:"$101.1K"},{l:"CASH USD",v:"$42,363",c:COLORS.yellow},{l:"DAILY P&L",v:"+$383.69",c:COLORS.green},{l:"POSITIONS",v:"14"}].map(m=>(
              <div key={m.l} className="card" style={{textAlign:"center",minWidth:80}}>
                <div style={{fontSize:9,color:COLORS.textDim}}>{m.l}</div>
                <div style={{fontSize:14,fontWeight:700,color:m.c||COLORS.textBright,marginTop:2}}>{m.v}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{marginTop:6,padding:"6px 10px",background:"rgba(63,185,80,.1)",border:"1px solid rgba(63,185,80,.3)",borderRadius:4,fontSize:11,color:COLORS.green}}>S48 CLOSE: CCL +3.73% +$221 (peace deal) | NCLH +3.79% recovered to $0.85 buffer | IAU +0.93% | UUUU stopped -$277 | Dropbox write confirmed</div>
        <div style={{marginTop:4,padding:"6px 10px",background:"rgba(88,166,255,.15)",border:"1px solid rgba(88,166,255,.4)",borderRadius:4,fontSize:11,color:COLORS.accent}}>PENDING: NVDA AMC tonight (S49 review) | SGOV $30K Friday | CRM T23 lock Mon 25 May | CGCT no-redemption confirm before 25 May</div>
        <div style={{marginTop:4,padding:"6px 10px",background:"rgba(248,81,73,.1)",border:"1px solid rgba(248,81,73,.3)",borderRadius:4,fontSize:11,color:COLORS.red}}>RATE HIKE 45% | BTC ~$77K (kill $70K) | CAPE 40.93x | Next file: trading_journal62.jsx (S49)</div>
      </div>
      <div style={{display:"flex",gap:4,marginBottom:12,flexWrap:"wrap"}}>
        {tabs.map(t=>(<button key={t} className={"btn"+(activeTab===t?" btn-primary":"")} onClick={()=>setActiveTab(t)} style={{textTransform:"uppercase",fontSize:11}}>{t}</button>))}
      </div>
      {activeTab==="positions"&&(<div style={{display:"flex",flexDirection:"column",gap:6}}>
        {data.positions?.map(p=>(<div key={p.ticker} className="card" style={{borderLeft:bl(p)}}>
          <div style={{display:"flex",gap:10,alignItems:"center",flexWrap:"wrap",marginBottom:3}}>
            <span style={{fontWeight:700,fontSize:13,color:COLORS.textBright}}>{p.ticker}</span>
            {p.name&&<span style={{fontSize:10,color:COLORS.textDim}}>{p.name}</span>}
            {p.cur&&<span className="badge badge-grey">{p.cur}</span>}
            <span className={"badge badge-"+(p.unrealPnL>=50?"green":p.unrealPnL<=-100?"red":"amber")}>{p.unrealPnL>=0?"+":""}{p.unrealPct?.toFixed(1)}%</span>
            <span style={{fontSize:9,color:COLORS.textDim,marginLeft:"auto"}}>Stop: <b style={{color:COLORS.yellow}}>{p.stop||p.stopType||"NONE"}</b></span>
          </div>
          <div style={{fontSize:10,color:sc(p.status),marginBottom:2,fontWeight:600}}>{p.status}</div>
          <div style={{fontSize:9,color:COLORS.textDim}}>{p.note}</div>
        </div>))}
        <div className="card" style={{borderLeft:"3px solid "+COLORS.red}}>
          <div style={{fontWeight:700,fontSize:11,color:COLORS.red}}>CLOSED TODAY — T58 UUUU — STOP $16.50 TRIGGERED</div>
          <div style={{fontSize:9,color:COLORS.textDim,marginTop:3}}>{data.closedToday?.[0]?.note}</div>
        </div>
      </div>)}
      {activeTab==="watch"&&(<div>
        <div style={{fontSize:11,color:COLORS.textDim,marginBottom:8}}>{data.watchList?.length} entries | ACTIVE: IONQ, TUI1, SIX2, RYAAY ($52 gate), CRM (T23 May 25) | NEW MONITORING: V ($322), SPGI ($408)</div>
        <div style={{display:"flex",flexDirection:"column",gap:6}}>
          {data.watchList?.map((w,i)=>(<div key={i} className="card" style={{borderLeft:"3px solid "+sc(w.status)}}>
            <div style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap",marginBottom:3}}>
              <span style={{fontWeight:700,fontSize:13,color:COLORS.textBright}}>{w.ticker}</span>
              {w.name&&<span style={{fontSize:10,color:COLORS.textDim}}>{w.name}</span>}
            </div>
            <div style={{fontSize:10,color:sc(w.status),marginBottom:2,fontWeight:600}}>{w.status}</div>
            <div style={{fontSize:9,fontStyle:"italic",color:COLORS.textBright,marginBottom:2}}>{w.thesis?.substring(0,160)}{w.thesis?.length>160?"...":""}</div>
            {w.gate&&<div style={{fontSize:9,color:COLORS.yellow}}>Gate: {w.gate?.substring(0,120)}</div>}
          </div>))}
        </div>
      </div>)}
      {activeTab==="macro"&&(<div style={{display:"flex",flexDirection:"column",gap:6}}>
        <div className="card" style={{borderLeft:"4px solid "+COLORS.red}}>
          <div style={{fontWeight:700,color:COLORS.red,fontSize:13,marginBottom:6}}>STAGFLATION — RATE HIKE 45% — CAPE 40.93x</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:8}}>
            {[{l:"Shiller CAPE",v:"40.93x",c:COLORS.red},{l:"Rate hike prob",v:"45%",c:COLORS.red},{l:"WTI",v:"~$103",c:COLORS.orange},{l:"Fed Chair",v:"Warsh (hawkish)",c:COLORS.red},{l:"10yr yield",v:"4.5%+",c:COLORS.red},{l:"NVDA results",v:"AMC tonight",c:COLORS.accent}].map((m,i)=>(<div key={i} className="card"><div style={{fontSize:9,color:COLORS.textDim}}>{m.l}</div><div style={{fontSize:12,fontWeight:700,color:m.c||COLORS.textBright}}>{m.v}</div></div>))}
          </div>
          <div style={{fontSize:10,color:COLORS.yellow}}>HEDGE: IAU (recovering -$162, no stop) + SGOV $30K Friday + external reserves (CAPE 20-25x deployment). Do not add growth equity.</div>
        </div>
        <div className="card" style={{borderLeft:"4px solid "+COLORS.green}}>
          <div style={{fontWeight:700,color:COLORS.green,fontSize:12,marginBottom:4}}>PEACE DEAL COUNTERWEIGHT — SIGNALS STRENGTHENING</div>
          <div style={{fontSize:10,color:COLORS.textDim}}>CCL +3.73%, NCLH +3.79% today. Oil fell $108 to $103 on Trump pause. SI-25 Condition 2 ($95.28) getting closer. Trump comments weighted 10% per protocol. Next trigger: Trump early next week deadline.</div>
        </div>
        <div className="card" style={{borderLeft:"4px solid "+COLORS.orange}}>
          <div style={{fontWeight:700,color:COLORS.orange,fontSize:12,marginBottom:4}}>BTC ~$77K | MSTR STOP $153.14</div>
          <div style={{fontSize:10,color:COLORS.textDim}}>Kill switch $70K ($7K buffer). Scale gate $85K ($8K away). CLARITY 45% Polymarket. Hold to stop.</div>
        </div>
      </div>)}
      {activeTab==="peace"&&(<div className="card" style={{borderLeft:"4px solid "+COLORS.green}}>
        <div style={{fontWeight:700,color:COLORS.green,fontSize:13,marginBottom:8}}>PEACE DEAL PORTFOLIO — STRONGEST SESSION SINCE ENTRY</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:10}}>
          {[{l:"CCL today",v:"+3.73% +$221",c:COLORS.green},{l:"NCLH today",v:"+3.79% +$42",c:COLORS.green},{l:"CCL buffer",v:"$1.78 (was $0.73)",c:COLORS.green},{l:"NCLH buffer",v:"$0.85 (was $0.07)",c:COLORS.green},{l:"CCL unrealised",v:"+$18 (+0.3%)",c:COLORS.green},{l:"NCLH unrealised",v:"-$43 (-3.6%)",c:COLORS.yellow}].map((m,i)=>(<div key={i} className="card"><div style={{fontSize:9,color:COLORS.textDim}}>{m.l}</div><div style={{fontSize:12,fontWeight:700,color:m.c}}>{m.v}</div></div>))}
        </div>
        <div style={{fontSize:11,color:COLORS.textBright,marginBottom:6}}>SI-25 Conditions technically unmet. Oil $103, need $95.28. Do not exit manually. Let thesis play or stops trigger. The design is working.</div>
        <div style={{fontSize:10,color:COLORS.yellow}}>KEY DATES: Mon 25 May Trump deadline. CCL Q2 Jun 30. NCLH Q2 Aug. RCL available after CCL/NCLH resolution.</div>
      </div>)}
      {activeTab==="tracker"&&(<div>
        <div style={{fontSize:12,fontWeight:600,color:COLORS.accent,marginBottom:6}}>TRADE TRACKER — {data.tradeTracker?.closedTrades?.filter(t=>t.dateOut===null).length} OPEN | {data.tradeTracker?.closedTrades?.filter(t=>t.dateOut!==null).length} CLOSED | T58 UUUU -$277 latest</div>
        {data.tradeTracker?.closedTrades?.slice().reverse().map(t=>(<div key={t.id} className="card" style={{marginBottom:3,borderLeft:"3px solid "+(t.pnlUSD===null?COLORS.blue:t.pnlUSD>0?COLORS.green:COLORS.red)}}>
          <div style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap"}}>
            <span style={{fontSize:9,color:COLORS.textDim}}>#{t.id}</span>
            <span style={{fontWeight:600,fontSize:12}}>{t.ticker}</span>
            <span style={{fontSize:9,color:COLORS.textDim}}>{t.dateOut||"OPEN"}</span>
            {t.pnlUSD!==null?<span style={{fontWeight:700,color:pnlColor(t.pnlUSD)}}>{t.pnlUSD>0?"+$":"-$"}{Math.abs(t.pnlUSD).toFixed(0)}</span>:<span className="badge badge-blue">OPEN</span>}
            <span className="badge badge-grey">{t.ccy}</span>
          </div>
          <div style={{fontSize:9,color:COLORS.textDim,marginTop:1}}>{t.note}</div>
        </div>))}
      </div>)}
      {activeTab==="notes"&&(<div>
        <div style={{display:"flex",gap:8,marginBottom:10}}>
          <input value={newNote} onChange={e=>setNewNote(e.target.value)} placeholder="Add session note..." onKeyDown={e=>e.key==="Enter"&&addNote()}/>
          <button className="btn btn-primary" onClick={addNote}>ADD</button>
        </div>
        {notes.slice().reverse().map((n,i)=>(<div key={i} className="card" style={{marginBottom:6}}><div style={{fontSize:10,color:COLORS.textDim,marginBottom:3}}>{n.date}</div><div style={{fontSize:11,lineHeight:1.7}}>{n.note}</div></div>))}
      </div>)}
      <div style={{marginTop:16,paddingTop:10,borderTop:"1px solid "+COLORS.border,display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:6,alignItems:"center"}}>
        <span style={{fontSize:10,color:COLORS.textDim}}>v61 S48 | Wed 20 May 2026 | 14 pos | Dropbox: Claude-Fund/journal/trading_journal61.jsx | Next: trading_journal62.jsx</span>
        <div style={{display:"flex",gap:4,flexWrap:"wrap"}}>
          <span className="badge badge-green">Daily +$384</span>
          <span className="badge badge-green">CCL +3.73%</span>
          <span className="badge badge-green">NCLH recovered</span>
          <span className="badge badge-red">UUUU -$277</span>
          <span className="badge badge-amber">NVDA pending</span>
          <span className="badge badge-blue">V+SPGI MONITORING</span>
          <span className="badge badge-green">Dropbox confirmed</span>
        </div>
      </div>
    </div>
  );
}
