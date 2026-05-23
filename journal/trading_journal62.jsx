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
  "lastUpdated": "2026-05-21 S49 CLOSE. IES +48.44% FlexBase GWh world-record contract RNS. IBM +6.67% Project Glasswing + NVDA halo. IBM stop moved to $219.78. IES 1,500sh partial sell order 32p limit DAY — unconfirmed fill, check IBKR tomorrow. CGCT no-redemption confirmed, voting with directors. SGOV deferred — hold cash ($42,363, IBKR earns ~3.3%). META Stage 1 complete → MONITORING. INTU identified at $305-310 → UNIVERSE, check gates tomorrow open. RYAAY gate suspended ($56.88, gap $4.88 above $52). AECOM + Jacobs added UNIVERSE. WTI $97.33 (SI-25 gap $2.05 — closest since Hormuz crisis began). Daily P&L +$738.48 (+0.73%). Net Liq $102.5K. 14 positions.",
  "sessionNumber": "S49",
  "fund": {
    "account": "U24936508",
    "netLiquidity": 102500,
    "unrealizedPnL": 590.92,
    "dailyPnL": 738.48,
    "dailyPnLPct": 0.73,
    "cashUSD": 42363,
    "cashGBP": 1787,
    "cashEUR": -465,
    "broker": "IBKR Pro",
    "note": "v62 S49 CLOSE. Thu 21 May 2026. 14 positions. SGOV deferred — cash held on IBKR at ~3.3% (immaterial gap vs SGOV 3.53%). IES partial sell 1,500sh @ 32p DAY limit submitted — unconfirmed fill. IBM stop raised to $219.78. Unrealised P&L flipped to +$591 — first positive unrealised session since Hormuz crisis began. Net Liq $102.5K."
  },
  "offAccountReserves": {
    "note": "MATERIAL PORTFOLIO FACT: Significant cash reserves exist off the IBKR account. Available for deployment at market bottom or crash opportunity. IBKR account is the active trading and hedging vehicle, not the sole capital base. Crash deployment plan: IAU gains + external reserves deployed simultaneously at CAPE normalisation (20-25x target). Do not force IBKR cash into growth names ahead of crash.",
    "crashDeploymentPlan": "When CAPE falls to 20-25x (from current 40.93x): aggressively deploy both IBKR freed cash (from stops + SGOV) and external reserves into highest-conviction quality names at distressed valuations."
  },
  "thesis": {
    "title": "PEACE DEAL IMMINENT — WTI $97.33 — SI-25 GAP $2.05 — NVDA BEAT MUTED — INTU WATCH",
    "summary": "Trump 'final stages' comment drove WTI down 5.7% to $97.33. SI-25 Condition 2 threshold $95.28 = $2.05 gap — closest since Hormuz crisis began. Both SI-25 conditions still technically unmet but market is aggressively pricing resolution. NVDA Q1 FY2027: revenue $81.6B (+85%) beat, Q2 guide $91B (vs $86B street). Stock muted +1.5% — pattern of last two prints fading confirmed. China revenue zero despite H200 authorisation. BTC $77.7-77.9K. Rate hike probability RISEN to 63% (CME) even as oil falls — Fed April minutes hawkish. INTU fell 23.7% to $305-306 at regular session open on Q3 earnings + 17% workforce cut + Mailchimp -21% — UNIVERSE watch for tomorrow gates.",
    "oilWTI": 97.33,
    "SI25Trigger": 105.87,
    "SI25Status": "Condition 1: UNMET (operational Hormuz commercial transit required). Condition 2: $97.33 vs $95.28 threshold = $2.05 GAP. CLOSEST SINCE CRISIS. Do NOT execute SI-25 manually. Both conditions must be met simultaneously and verifiably. Trump 'final stages' comment weighted per 10% protocol. Peace deal announcement could arrive any session before May 25.",
    "hormuzStatus": "Trump stated US in 'final stages' with Iran AMC May 20. WTI fell 5.7% in single session. Talks mediated by Pakistan. Issues: Hormuz freedom of navigation, nuclear programme, sanctions, reconstruction, long-term peace. EIA STEO May 12 assumes Hormuz effectively closed until late May, traffic picking up June. Trump early-next-week deadline = Mon 25 May.",
    "rateHikeAlert": "Fed rate hike probability RISEN to 63% (CME, confirmed May 21) despite falling oil. April Fed minutes opened door to hike — independent of peace deal. Warsh hawkish. SGOV deferred but rate hike thesis intact. If peace deal resolves and oil falls to $80s, hike probability should retreat.",
    "nvdaEarnings": "NVDA Q1 FY2027 REPORTED: Revenue $81.6B (+85.2% YoY), beat $79.2B est. Data Center $75.2B (+92% YoY). Non-GAAP EPS $1.87, beat $1.77. Q2 guidance $91.0B (±2%) vs $86B street — massive beat. China revenue zero (no H200 revenue assumed in Q2 guide either). Dividend raised $0.25/qtr. Buyback +$80B. Jensen: 'Demand has gone parabolic. Agentic AI has arrived.' Stock reaction: MUTED +1.5%. SI-39 $159.14 non-actionable. Pattern confirmed — last two prints faded.",
    "keyDates": [
      {"date":"Fri 22 May","event":"PATH T23 lock activates. No new PATH entries from today. LULU earnings AMC (watchlist only). INTU gates check at open: did it hold $295-300? Volume trend? IES order status confirm.","priority":"HIGH"},
      {"date":"Mon 25 May","event":"Trump Iran deadline. SI-25 monitor. CRM T23 lock activates. Last CRM observation window this session. CGCT no-redemption confirm sent.","priority":"CRITICAL"},
      {"date":"Tue 27 May 10am ET","event":"CGCT extraordinary shareholder vote 10am ET (14:00 UAE). Post-merger ticker FAC. No-redemption already confirmed with director votes.","priority":"HIGH"},
      {"date":"Tue 27 May AMC","event":"CRM Q1 FY2027 earnings. CONDITIONAL: beat + Agentforce ARR >$1B required. T23 lock from Mon 25. Max 27sh at $165-185. User away — reassess May 31.","priority":"CRITICAL"},
      {"date":"Wed 28 May AMC","event":"PATH Q1 FY2027 earnings. T23 lock May 26. Stop $9.20. DO NOT WIDEN (E28). Current buffer $1.55 (14.4%). User away — stop handles downside.","priority":"HIGH"},
      {"date":"Wed 28 May AMC","event":"LULU Q1 earnings. Watchlist only. Post-earnings review Saturday if gate conditions met.","priority":"LOW"},
      {"date":"Sun 31 May","event":"USER RETURNS. S50 full reassessment: INTU gates review, CRM result, PATH result, peace deal status, WTI level, SGOV decision, META Stage 2 planning, NVDA chart fade check.","priority":"CRITICAL"},
      {"date":"Jun 17","event":"GTT.PA ex-dividend. Watch for post-div dip to EUR170-175 entry zone.","priority":"MEDIUM"},
      {"date":"Jun 23","event":"AVAV Q4 FY2026 earnings. Stop $155. T23 lock Jun 21. Buffer $8.87.","priority":"HIGH"},
      {"date":"Jun 30","event":"CCL Q2 earnings. Peace deal primary catalyst. Stop $23.00.","priority":"HIGH"},
      {"date":"Jul 4","event":"OKLO Groves test reactor criticality. Entry post-criticality dip $50-55.","priority":"HIGH"},
      {"date":"Jul 28","event":"LEU Q2 earnings. IBM Q2 FINAL GATE (consulting 5%+ CCY + raised guidance = hold).","priority":"HIGH"},
      {"date":"Aug 4","event":"ZETA Q2 earnings. T23 lock ~Aug 2.","priority":"HIGH"},
      {"date":"Jan 1 2028","event":"Russian TENEX uranium ban effective. LEU structural demand surge catalyst.","priority":"HIGH"}
    ]
  },
  "positions": [
    {"ticker":"IES","name":"Invinity Energy Systems","shares":3000,"avgPrice":17.49,"last":33.40,"unrealPnL":640,"unrealPct":91.0,"stopType":"MANUAL ALERT 12.5p","cur":"GBX","status":"HOLD 3,000sh — 1,500sh SELL ORDER 32p LIMIT UNCONFIRMED — CHECK IBKR TOMORROW","note":"RNS CONFIRMED: Selected by FlexBase Group to design world-record 1.5 GWh (expandable 2.1 GWh) VFB system at Technology Centre Laufenburg, Switzerland. AI data centre + VFB integrated site. FlexBase privately funded CHF 1B+ by DACH family offices. Construction underway 12 months. Swissgrid grid connection committed. Engineering phase 2026-2027 generates revenue. Purchase order expected post-engineering-phase completion. SELL ORDER: 1,500sh limit 32p DAY submitted. Bid was 30p, ask 31.5p — order likely NOT filled. Confirm tomorrow. If unfilled: resubmit at market open or lower limit to 31p. Target: recover original £525 cost (1,590sh at 33p) leaving 1,410sh as free ride on purchase order catalyst."},
    {"ticker":"ZETA","shares":191,"avgPrice":16.866,"last":18.24,"unrealPnL":262,"unrealPct":8.1,"stop":16.98,"status":"HOLD — STOP $16.98 — P20 ACTIVE — AUG 4 EARNINGS","note":"P20 protocol active. -0.55% today. Buffer $1.26 (6.9%). NVDA 'Agentic AI' commentary positive for AI software names. T23 lock ~Aug 2. Aug 4 earnings gate."},
    {"ticker":"CODA","shares":250,"avgPrice":11.105,"last":11.40,"unrealPnL":74,"unrealPct":2.7,"stop":9.95,"status":"HOLD — STOP $9.95 — P14 DELIBERATE","note":"P14. +0.53% today. Buffer $1.45. Small position."},
    {"ticker":"CCL","shares":250,"avgPrice":24.706,"last":25.89,"unrealPnL":296,"unrealPct":4.8,"stop":23.00,"status":"HOLD — STOP $23.00 — T47 — PEACE DEAL PRIMARY — PROFITABLE","note":"T47. -0.54% today giving back some of yesterday's +9.46% intraday spike. Unrealised now +$296 (+4.8%). Buffer $2.89. Stop $23.00 intact. Peace deal primary catalyst. WTI $97.33 driving thesis."},
    {"ticker":"CGCT","shares":291,"avgPrice":10.295,"last":10.42,"unrealPnL":36,"unrealPct":1.2,"stop":null,"status":"HOLD — NO STOP — NO-REDEMPTION CONFIRMED — VOTE TUE 27 MAY 10AM ET","note":"No-redemption election confirmed. Voting with director recommendation. Vote Tue 27 May 10am ET (14:00 UAE). Post-merger ticker FAC on Nasdaq. No further action required until vote."},
    {"ticker":"LMT","shares":10,"avgPrice":516.831,"last":521.77,"unrealPnL":49,"unrealPct":1.0,"stop":479.77,"status":"HOLD — STOP $479.77 — STRUCTURAL REARMAMENT THESIS","note":"-0.16% today. Buffer $41.11. Structural rearmament (German budget, NATO, DoD munitions) survives any peace deal. Stop $479.77 intact."},
    {"ticker":"NCLH","shares":75,"avgPrice":15.914,"last":16.00,"unrealPnL":6,"unrealPct":0.6,"stop":14.50,"status":"HOLD — STOP $14.50 — RECOVERED — BUFFER $1.50","note":"T48. -0.19% today. Buffer $1.50 (9.4%). Recovered from 7c critical (S47). Stop $14.50 intact. Peace deal primary catalyst. Elliott >10% stake independent floor."},
    {"ticker":"PATH","shares":320,"avgPrice":10.726,"last":10.77,"unrealPnL":14,"unrealPct":0.5,"stop":9.20,"status":"HOLD — STOP $9.20 — T23 LOCK FRI 22 MAY — EARNINGS WED 28 MAY AMC","note":"T23 lock TOMORROW (Fri 22 May). Earnings May 28 AMC. Buffer $1.55 (14.4%). DO NOT WIDEN stop (E28). Stop handles downside during user absence. NVDA 'Agentic AI' positive for thesis."},
    {"ticker":"IAU","name":"iShares Gold Trust","shares":175,"avgPrice":86.006,"last":85.19,"unrealPnL":-143,"unrealPct":-0.9,"stop":null,"status":"PORTFOLIO ALLOCATION — NO STOP — T57 — MACRO HEDGE","note":"T57. -0.40% today. No stop: physical gold, patient capital. Manual review triggers: (1) Hormuz operational reopening, (2) Warsh surprise rate cut. SGOV thesis deferred — cash held on IBKR instead. If rate hike materialises, IAU may face headwind but crash hedge function remains."},
    {"ticker":"IBM","shares":26,"avgPrice":228.739,"last":240.01,"unrealPnL":293,"unrealPct":5.1,"stop":219.78,"status":"HOLD — STOP $219.78 RAISED TODAY — PROJECT GLASSWING + NVDA HALO","note":"+6.67% today to $240.01. Catalysts: (1) Project Glasswing — IBM joined Anthropic cybersecurity coalition alongside Apple, Google, NVDA, MSFT. (2) IBM exec tipped for CISA leadership. (3) NVDA sector halo. Stop RAISED from $210.08 to $219.78 — protecting ~$520 of unrealised gain. Buffer $20.23. Q2 July gate: consulting 5%+ CCY + raised guidance = hold. Otherwise managed exit."},
    {"ticker":"PYPL","shares":55,"avgPrice":45.639,"last":44.37,"unrealPnL":-70,"unrealPct":-2.8,"stop":37.50,"status":"HOLD — STOP $37.50 — T39","note":"T39. Flat today. TPV +11% structural thesis intact. Buffer $6.87."},
    {"ticker":"MSTR","shares":15,"avgPrice":181.067,"last":166.88,"unrealPnL":-213,"unrealPct":-7.8,"stop":153.14,"status":"HOLD — STOP $153.14 — BTC ~$77.8K — KILL SWITCH $70K","note":"BTC ~$77.7-77.9K. Kill switch $70K (~$7.8K buffer). Scale gate $85K (~$7.1K away). +0.65% today. Buffer $13.74. CLARITY Act 45% Polymarket."},
    {"ticker":"LEU","shares":15,"avgPrice":191.697,"last":169.66,"unrealPnL":-331,"unrealPct":-11.5,"stop":158.17,"status":"HOLD — STOP $158.17 — T52 — HALEU — THESIS INTACT","note":"T52. +0.21% today. $900M DOE HALEU confirmed. Russian ban 2028 structural. Stop $158.17 below Feb capitulation base. Buffer $11.49. Jul 28 earnings checkpoint."},
    {"ticker":"AVAV","shares":15,"avgPrice":185.067,"last":163.87,"unrealPnL":-318,"unrealPct":-11.5,"stop":155.00,"status":"HOLD — STOP $155.00 — T31 — EARNINGS JUN 23","note":"T31. C$163.87 (closing price). Buffer $8.87 (5.4%). Contract pipeline intact. Stop $155 below 52wk low. Jun 23 earnings. DO NOT EXIT MANUALLY (E28)."}
  ],
  "closedToday": [],
  "openedToday": [],
  "pendingOrders": [
    {"ticker":"IES","action":"SELL","qty":1500,"limit":0.32,"currency":"GBP","type":"DAY_LIMIT","status":"UNCONFIRMED — DAY ORDER EXPIRED OR PENDING FILL","note":"Submitted Thu 21 May. Limit 32p. Bid was 30p at submission — likely did not fill. DAY order expires at LSE close (16:30 BST = 19:30 UAE). Check IBKR Friday morning. If unfilled: decision to resubmit at 31-32p or accept full 3,000sh hold."},
    {"ticker":"LAC","action":"BUY","limit":4.80,"stop":4.00,"qty":220,"maxLoss":176,"status":"GTC $4.80 / STOP $4.00 — SI-37","note":"Thacker Pass Phase 1. Still active."},
    {"ticker":"TXT","action":"BUY","limit":88.00,"stop":79.00,"qty":55,"maxLoss":495,"status":"GTC $88 PENDING","note":"Bell MV-75 Valor. Still active."}
  ],
  "watchList": [
    {"ticker":"IONQ","thesis":"Trapped-ion quantum. Stage 2 complete. Q1 rev $64.7M +755% YoY. Above $38-45 entry zone.","entry":"$38-45 dip ONLY. Stop $27. Target $80-100.","gate":"Q2 Aug 12. T23 lock ~Aug 10. No entry above $45.","status":"ACTIVE — DIP BUY $38-45 — ABOVE ZONE"},
    {"ticker":"TUI1","name":"TUI AG","thesis":"Peace deal re-rating. Entry zone EUR5.80-6.20.","entry":"EUR5.80-6.20. Stop EUR4.90. Target EUR9.20.","gate":"Above zone. CCL/NCLH peace deal signals accelerating.","status":"ACTIVE — ABOVE ZONE — PEACE DEAL WATCH"},
    {"ticker":"SIX2","name":"Sixt SE","thesis":"German premium car rental. Peace deal consumer recovery.","entry":"EUR62-65. Stop EUR54. Target EUR97.","gate":"Above zone. Wait.","status":"ACTIVE — ABOVE ZONE — WAIT"},
    {"ticker":"RYAAY","name":"Ryanair","thesis":"FY26 record profit +40%. 80% jet fuel hedged $67/bbl. GATE SUSPENDED — stock at $56.88 vs $52 gate. Peace bounce priced in. R/R below 1:1 at current price.","entry":"$52 or below ONLY. Stop $47. R/R only compelling sub-$54.","gate":"GATE SUSPENDED at $56.88. Reactivates on pullback to $52-54. Do not chase. Peace deal full resolution could drive $65+ but entry discipline holds.","status":"ACTIVE — GATE SUSPENDED $56.88 — REACTIVATES SUB-$54"},
    {"ticker":"CRM","name":"Salesforce","thesis":"Stage 2 complete. 12.73x forward PE. Agentforce ARR $800M. T23 lock Mon 25 May.","entry":"$165-185 post-earnings. Stop ~$152. Max 27sh.","gate":"Earnings Tue 27 May AMC. CONDITIONAL: beat + Agentforce ARR >$1B. DO NOT ENTER PRE-EARNINGS. User away — reassess May 31.","status":"ACTIVE — T23 LOCK MON 25 MAY — EARNINGS TUE 27 MAY AMC — USER AWAY"},
    {"ticker":"META","name":"Meta Platforms","thesis":"S49 STAGE 1 COMPLETE. 18.5x NTM forward PE with 33% revenue growth. PEG ~0.55 — cheapest hyperscaler. Q1 2026: revenue $56.31B (+33% YoY), beat estimate. Q2 guide $58-61B. TurboTax analogy does not apply — META AI advertising ROI already in numbers (19% impression growth + 12% price/ad). 17% workforce cut = profitability unlock. $1.6B buybacks Q3 alone. Entry zone $570-610. Stop $525. Target $750-800. R/R 2.5:1 at $604, 4:1 at $580. Max 6sh (SI-35 $79 risk x 6 = $474). Peace deal = risk-on = growth multiple expansion. Stage 2 required before entry.","entry":"$570-610. Stop $525. Target $750-800. Max 6 shares. Alert at $595.","gate":"Q2 earnings Jul 28. CONDITIONAL: Q2 revenue at/above $59-60B midpoint AND no third consecutive capex raise. T23 lock Jul 26. Stage 2 required before entry.","status":"MONITORING — S49 NEW — STAGE 1 COMPLETE — STAGE 2 REQUIRED — ALERT $595"},
    {"ticker":"V","name":"Visa Inc","thesis":"S48 Stage 1 complete. Payment network toll road. 80%+ gross margins, ~15% EPS growth, ~27x forward PE. Entry zone $318-322.","entry":"$318-322. Stop $298. Target $375. R/R 2.5:1.","gate":"Price alert $322. Stage 2 required.","status":"MONITORING — S48 — STAGE 2 REQUIRED — ALERT $322"},
    {"ticker":"SPGI","name":"S&P Global","thesis":"S48 Stage 1 complete. Ratings duopoly. Down 28-30% from ATH. Entry $400-408. Rate hike 45% suppresses near-term issuance.","entry":"$400-408. Stop $383. Target $480. R/R 3.5:1.","gate":"Alert $408. Lower highs pattern must break first.","status":"MONITORING — S48 — STAGE 2 REQUIRED — ALERT $408"},
    {"ticker":"T53_LEU","name":"LEU Second Tranche","thesis":"Pullback entry $170-175 zone.","entry":"$170-175. Stop $150. 13 shares.","gate":"No DOE failure. Combined T52+T53 max ~$820.","status":"MONITORING — CONDITIONAL — PATIENCE REQUIRED"},
    {"ticker":"MSFT","name":"Microsoft","thesis":"Stage 1 complete S47. 21.7x forward PE. Azure +40%, AI run rate $37B +123% YoY. 23.8% below ATH.","entry":"$395-410. Stop $358. Alert $410.","gate":"Q4 FY2026 earnings July 2026. Stage 2 required.","status":"MONITORING — STAGE 1 COMPLETE S47 — STAGE 2 REQUIRED — ALERT $410"},
    {"ticker":"RCL","name":"Royal Caribbean","thesis":"Peace deal bounce. 60% hedged. Lower R/R than CCL.","entry":"$255-270. Stop $245. Target $320-340.","gate":"CCL/NCLH resolution first.","status":"MONITORING — GATE: CCL/NCLH RESOLUTION FIRST"},
    {"ticker":"GTT","name":"Gaztransport Technigaz","thesis":"LNG royalty. 68% EBITDA margin. Post-div June 17 dip watch.","entry":"EUR170-175. Stop EUR158. Target EUR235.","gate":"Ex-div Jun 17. Post-div dip watch.","status":"MONITORING — ABOVE ZONE — WAIT POST-JUN 17"},
    {"ticker":"MSTR_SCALE","name":"MicroStrategy scale gate","thesis":"BTC $85K scale gate. CLARITY Act 45%.","entry":"Market on BTC $85K + CLARITY floor vote.","gate":"BTC ~$7.1K below gate.","status":"MONITORING — BTC BELOW GATE"},
    {"ticker":"MU","name":"Micron Technology","thesis":"HBM supercycle. SI-35 prevents sizing. Jul 1 earnings.","entry":"2-3 shares speculative, stop $580.","gate":"Jul 1 earnings.","status":"MONITORING — SI-35 PREVENTS ACTIVE"},
    {"ticker":"LULU","name":"Lululemon","thesis":"52-week low $119. Forward PE 9.6x. Earnings May 28 AMC.","entry":"Post May 28 ONLY if: beat + guidance stabilisation.","gate":"Q1 earnings May 28 AMC.","status":"MONITORING — EARNINGS MAY 28"},
    {"ticker":"SOFI","name":"SoFi Technologies","thesis":"T27 pattern. Fintech.","entry":"$13-14 pullback.","gate":"PYPL gate first.","status":"MONITORING — PYPL GATE FIRST"},
    {"ticker":"INTU","name":"Intuit Inc","thesis":"S49 NEW UNIVERSE. Fallen-growth deep value. ATH $813.70, current $305-306 (-62.5%). 12.8x NTM forward PE on $23.82 EPS guide. Near-monopoly: TurboTax ~30% US tax prep, QuickBooks ~80% SMB accounting. Bear: Mailchimp -21% revenue, IRS Direct File structural threat, AI disruption of DIY tax. Bull: TurboTax Live +36% revenue +38% customers (AI hybrid pivot working), QuickBooks Online ex-Mailchimp +22%, $1.6B buybacks Q3 alone. 12.8x PE = 75% discount to 5-year average of 52x. GATES: (1) Today's close above $295? (2) Tomorrow volume below 1.5M (selling exhausted)? (3) $300 holds two consecutive closes? Entry zone $295-315 if gates met. Stop $265. Target $480-520. R/R 5:1 at $300. Max 12sh (SI-35: $35 risk x 12 = $420).","entry":"$295-315. Stop $265. Target $480-520. Max 12 shares. ALL THREE GATES MUST BE MET.","gate":"Gate 1: INTU closes above $295 today. Gate 2: Tomorrow volume below 1.5M first 30 min. Gate 3: $300 holds two consecutive closes. Check Fri 22 May open.","status":"UNIVERSE — S49 NEW — THREE GATES REQUIRED — CHECK FRI 22 MAY OPEN"},
    {"ticker":"AECOM","name":"AECOM Technology","thesis":"S49 NEW UNIVERSE. Post-war reconstruction third-order peace deal play. Largest global infrastructure engineering firm. Government/sovereign wealth clients. Middle East presence via prior contracts. Post-Hormuz Gulf reconstruction contracts (damaged ports, pipelines, Vision 2030 acceleration). Revenue ~$22B, ~15x forward PE. Not yet re-rated on peace deal.","entry":"Stage 1 required. Screen B check (near 52-week lows?).","gate":"Stage 1 required. Activate post-peace deal announcement.","status":"UNIVERSE — S49 NEW — STAGE 1 PENDING"},
    {"ticker":"J","name":"Jacobs Solutions","thesis":"S49 NEW UNIVERSE. Same profile as AECOM. Critical infrastructure, government clients, Middle East presence. Third-order peace deal: Gulf reconstruction spending. Stage 1 pending.","entry":"Stage 1 required.","gate":"Stage 1 required. Activate post-peace deal.","status":"UNIVERSE — S49 NEW — STAGE 1 PENDING"},
    {"ticker":"HD","name":"Home Depot","thesis":"Q1 flat. Not compelling at $302.","entry":"Below $280 only.","gate":"Class action investigation. Stage 1 incomplete.","status":"UNIVERSE — NOT COMPELLING — WAIT $280"},
    {"ticker":"XLF_KRE","name":"US Financials / Regional Banks","thesis":"Rate hike 63% (risen from 45%). NIM expansion direct beneficiary.","entry":"Stage 1 required.","gate":"Stage 1 urgent.","status":"UNIVERSE — STAGE 1 URGENT"},
    {"ticker":"OKLO","name":"Oklo Inc","thesis":"SMR. July 4 Groves criticality. Entry post-criticality dip.","entry":"Post Jul 4 dip ~$50-55.","gate":"Jul 4 criticality target.","status":"UNIVERSE — JULY 4 GATE"},
    {"ticker":"BKNG","name":"Booking Holdings","thesis":"20-22x forward PE, 20%+ EPS compounder. Peace deal = Gulf corridor reopens.","entry":"Stage 1 required, below $4,500.","gate":"Stage 1 required.","status":"UNIVERSE — STAGE 1 REQUIRED"},
    {"ticker":"ORCL","name":"Oracle","thesis":"Cloud database migration. $130B contracted backlog. Stage 1 required.","entry":"Stage 1 required, below $165.","gate":"Stage 1 required.","status":"UNIVERSE — STAGE 1 REQUIRED"},
    {"ticker":"ENGIE_PA","name":"Engie SA","thesis":"Demoted S44. Near ATH.","entry":"EUR22-24 pullback only.","gate":"Stage 2 required.","status":"UNIVERSE — DEMOTED — DO NOT ENTER AT EUR27"},
    {"ticker":"BWXT","name":"BWX Technologies","thesis":"Nuclear defense. SI-39 at $183.","entry":"$183 SI-39 trigger.","gate":"Currently ~$208.","status":"UNIVERSE — SI-39 AT $183"}
  ],
  "shortWatchlist": [
    {"ticker":"PLTR","thesis":"Dormant until Q2 July 2026.","status":"DORMANT UNTIL Q2 JULY","trigger":"Q2 guidance cut only"},
    {"ticker":"AAL","thesis":"No fuel hedge, $36.5B debt.","trigger":"Dead-cat bounce $13-14.","status":"WATCH"},
    {"ticker":"SNOW","thesis":"18x forward revenue.","trigger":"Earnings miss + guidance trim.","status":"WATCH"}
  ],
  "macroRisk": {
    "title": "PEACE DEAL IMMINENT — SI-25 GAP $2.05 — RATE HIKE 63% — CAPE 40.93x — NVDA BEAT MUTED",
    "shillerCAPE": "40.93x — 97th percentile historically.",
    "rateHike": "63% probability Fed hike by end 2026 (CME, May 21). April minutes opened door. Warsh hawkish. Oil falling reduces cost-push justification but Warsh may focus on demand-pull.",
    "si25Update": "WTI $97.33 — SI-25 Condition 2 threshold $95.28 — gap $2.05. Closest since Hormuz crisis began. Both conditions still unmet. Do NOT execute manually.",
    "peaceCounterweight": "Trump 'final stages' comment drove WTI -5.7% single session. CCL +$296 unrealised (+4.8%). NCLH buffer $1.50. Market pricing imminent resolution.",
    "hedgeStrategy": "IAU (macro hedge -$143, no stop), hold USD cash $42,363 on IBKR (~3.3%), external reserves (crash deployment at CAPE 20-25x). Stops protect downside on all equity positions."
  },
  "btcState": {
    "currentPrice": 77800,
    "killSwitch": 70000,
    "scaleGate": 85000,
    "bufferToKillSwitch": 7800,
    "bufferToScaleGate": -7200,
    "mstrAction": "Hold to stop $153.14. No scale action until BTC weekly close above $85K.",
    "clarityAct": "45% Polymarket. Ethics provision unresolved. Monitor."
  },
  "processNotes": {
    "i17JournalRule": "NEW FILE EVERY SESSION. Today: trading_journal62.jsx (S49). Next session: trading_journal63.jsx (S50).",
    "dropboxProtocol": "DIRECT WRITE CONFIRMED. Claude writes directly to C:\\Users\\James Cadbury\\Dropbox\\Claude-Fund\\journal\\ via filesystem MCP tool.",
    "si83Check": "META Stage 1 overdue (S47-S48) — COMPLETED S49, now MONITORING. Stage 2 required before entry. CRM Stage 2 already complete. No other overdue Stage 2s.",
    "si84Check": "RYAAY chart reviewed S49 (2h 3-month). Gate suspended. META chart reviewed S49. IBM chart reviewed implicitly via price action. INTU 1h chart provided — confirms institutional selling, first 30 minutes not the bottom.",
    "sgov": "DEFERRED — decision moved to Tue 27 May post-Iran deadline and CRM earnings. IBKR cash earns ~3.3% (gap vs SGOV 3.53% = immaterial $20 per 10 days). Cash preserved for post-peace deployment or crash deployment.",
    "absenceNote": "User away Mon 26 May to Sun 31 May. All stops submitted GTC. Maximum controlled loss if all stops trigger simultaneously: ~$3,705 (3.7% of net liq). CRM May 27 and PATH May 28 earnings during absence — stops handle downside. CRM entry opportunity may pass if beat + ARR >$1B confirmed Wed 28 while user away."
  },
  "tensordynePrivate": {
    "note": "Private investment — not tracked as IBKR position.",
    "currentForgePrice": 14.50,
    "forgeDate": "2026-03-08",
    "totalFunding": 209000000,
    "keyTech": "LNS (Logarithmic Number System). 8x claimed power efficiency vs NVDA Blackwell NVL72. 1/3 capex per token. Air-cooled. TSMC 3nm.",
    "productStatus": "Pre-silicon. Tape-out imminent. Product launch target mid-2026.",
    "binaryEvent": "3-month silicon validation window. LNS addition correction factor is the key technical risk."
  },
  "tradeTracker": {
    "closedTrades": [
      {"id":1,"ticker":"CCL","dateIn":"2026-03-24","dateOut":"2026-03-26","qty":240,"entry":24.83,"exit":25.35,"ccy":"USD","pnlUSD":122.35,"note":"S07."},
      {"id":2,"ticker":"ONDS","dateIn":"2026-03-24","dateOut":"2026-03-30","qty":250,"entry":10.90,"exit":8.505,"ccy":"USD","pnlUSD":-601.30,"note":"Stopped."},
      {"id":3,"ticker":"KTOS","dateIn":"2026-03-24","dateOut":"2026-03-30","qty":100,"entry":81.00,"exit":64.977,"ccy":"USD","pnlUSD":-1604.27,"note":"P12."},
      {"id":4,"ticker":"UEC","dateIn":"2026-03-25","dateOut":"2026-03-31","qty":206,"entry":13.77,"exit":13.16,"ccy":"USD","pnlUSD":-127.76,"note":"Stopped."},
      {"id":5,"ticker":"IAG","dateIn":"2026-03-27","dateOut":"2026-04-01","qty":2200,"entry":3.55,"exit":3.70,"ccy":"GBP","pnlUSD":407.36,"note":"Peace thesis."},
      {"id":6,"ticker":"RCL","dateIn":"2026-03-24","dateOut":"2026-04-02","qty":36,"entry":273.54,"exit":269.91,"ccy":"USD","pnlUSD":-132.89,"note":"Stopped."},
      {"id":7,"ticker":"LEU","dateIn":"2026-03-24","dateOut":"2026-04-07","qty":13,"entry":188.79,"exit":170.26,"ccy":"USD","pnlUSD":-242.94,"note":"T7. Re-entered T52."},
      {"id":8,"ticker":"LDO","dateIn":"2026-03-27","dateOut":"2026-04-07","qty":17,"entry":58.10,"exit":59.56,"ccy":"EUR","pnlUSD":20.51,"note":"Partial."},
      {"id":9,"ticker":"UPS","dateIn":"2026-04-08","dateOut":"2026-04-08","qty":50,"entry":100.17,"exit":99.60,"ccy":"USD","pnlUSD":-30.61,"note":"Same-day."},
      {"id":10,"ticker":"R3NK","dateIn":"2026-03-26","dateOut":"2026-04-08","qty":80,"entry":51.51,"exit":56.01,"ccy":"EUR","pnlUSD":385.86,"note":"First entry."},
      {"id":11,"ticker":"PLTR","dateIn":"2026-03-24","dateOut":"2026-04-09","qty":49,"entry":161.608,"exit":134.976,"ccy":"USD","pnlUSD":-1307.11,"note":"P6."},
      {"id":12,"ticker":"SHLD","dateIn":"2026-03-24","dateOut":"2026-04-10","qty":69,"entry":72.01,"exit":73.21,"ccy":"USD","pnlUSD":112.65,"note":"Tactical."},
      {"id":13,"ticker":"PDYN","dateIn":"2026-03-25","dateOut":"2026-04-14","qty":250,"entry":6.59,"exit":6.67,"ccy":"USD","pnlUSD":17.42,"note":"Partial."},
      {"id":14,"ticker":"AVAV","dateIn":"2026-03-26","dateOut":"2026-04-15","qty":25,"entry":195.05,"exit":197.945,"ccy":"USD","pnlUSD":70.27,"note":"Re-entered 15sh."},
      {"id":15,"ticker":"ITM","dateIn":"2026-04-01","dateOut":"2026-04-17","qty":1100,"entry":65.1,"exit":124.60,"ccy":"GBP","pnlUSD":828.00,"note":"Trim 1."},
      {"id":16,"ticker":"LNG","dateIn":"2026-04-13","dateOut":"2026-04-17","qty":19,"entry":268.813,"exit":248.00,"ccy":"USD","pnlUSD":-396.54,"note":"Stopped."},
      {"id":17,"ticker":"PATK","dateIn":"2026-04-17","dateOut":"2026-04-17","qty":25,"entry":108.80,"exit":109.256,"ccy":"USD","pnlUSD":9.34,"note":"P17."},
      {"id":18,"ticker":"ABVX","dateIn":"2026-04-06","dateOut":"2026-04-21","qty":44,"entry":117.913,"exit":114.26,"ccy":"USD","pnlUSD":-158.53,"note":"Stopped. Re-entry 50sh."},
      {"id":19,"ticker":"RR","dateIn":"2026-03-26","dateOut":"2026-04-22","qty":150,"entry":1182.88,"exit":1150.00,"ccy":"GBP","pnlUSD":-62.39,"note":"Stopped. Re-entry T56."},
      {"id":20,"ticker":"ITM","dateIn":"2026-04-01","dateOut":"2026-04-24","qty":800,"entry":65.1,"exit":141.20,"ccy":"GBP","pnlUSD":770.00,"note":"Trim 2."},
      {"id":21,"ticker":"LLY","dateIn":"2026-04-16","dateOut":"2026-04-25","qty":3,"entry":905.344,"exit":875.54,"ccy":"USD","pnlUSD":-89.41,"note":"Stopped."},
      {"id":22,"ticker":"CODA","dateIn":"2026-04-08","dateOut":"2026-04-27","qty":416,"entry":12.005,"exit":11.42,"ccy":"USD","pnlUSD":-243.36,"note":"Stopped. Re-entry."},
      {"id":23,"ticker":"ISRG","dateIn":"2026-03-24","dateOut":"2026-04-27","qty":22,"entry":459.246,"exit":471.676,"ccy":"USD","pnlUSD":272.24,"note":"Stop triggered."},
      {"id":24,"ticker":"ITM","dateIn":"2026-04-01","dateOut":"2026-04-28","qty":1200,"entry":65.1,"exit":130.39,"ccy":"GBP","pnlUSD":1041.00,"note":"AIM wick. ITM total +$2,639."},
      {"id":25,"ticker":"ABBV","dateIn":"2026-04-22","dateOut":"2026-04-29","qty":20,"entry":205.22,"exit":191.1608,"ccy":"USD","pnlUSD":-282.27,"note":"Stop BMO."},
      {"id":26,"ticker":"PDYN","dateIn":"2026-03-25","dateOut":"2026-04-29","qty":250,"entry":6.595,"exit":5.815,"ccy":"USD","pnlUSD":-196.00,"note":"Manual exit."},
      {"id":27,"ticker":"CCJ","dateIn":"2026-03-24","dateOut":"2026-04-28","qty":49,"entry":104.021,"exit":119.97,"ccy":"USD","pnlUSD":782.00,"note":"T23. Re-entry."},
      {"id":28,"ticker":"VST","dateIn":"2026-04-08","dateOut":"2026-04-29","qty":53,"entry":150.569,"exit":156.53,"ccy":"USD","pnlUSD":316.00,"note":"GTC triggered."},
      {"id":29,"ticker":"PDYN","dateIn":"2026-04-29","dateOut":"2026-04-30","qty":250,"entry":5.7507,"exit":5.85,"ccy":"USD","pnlUSD":-25,"note":"E9 short covered."},
      {"id":30,"ticker":"MSFT","dateIn":"2026-04-14","dateOut":"2026-04-30","qty":25,"entry":372.77,"exit":410.38,"ccy":"USD","pnlUSD":940,"note":"Stop triggered."},
      {"id":31,"ticker":"NOG","dateIn":"2026-03-26","dateOut":"2026-05-01","qty":80,"entry":24.383,"exit":26.50,"ccy":"USD","pnlUSD":169.36,"note":"Stop triggered."},
      {"id":32,"ticker":"V","dateIn":"2026-03-24","dateOut":"2026-05-05","qty":8,"entry":307.125,"exit":321.823,"ccy":"USD","pnlUSD":117.58,"note":"T28."},
      {"id":33,"ticker":"NOG","dateIn":"2026-05-04","dateOut":"2026-05-07","qty":200,"entry":26.771,"exit":25.11,"ccy":"USD","pnlUSD":-332.20,"note":"Iran noise."},
      {"id":34,"ticker":"R3NK","dateIn":"2026-04-08","dateOut":"2026-05-07","qty":25,"entry":52.27,"exit":53.44,"ccy":"EUR","pnlUSD":31.59,"note":"T30."},
      {"id":35,"ticker":"R3NK","dateIn":"2026-05-07","dateOut":"2026-05-11","qty":25,"entry":52.00,"exit":47.01,"ccy":"EUR","pnlUSD":-136,"note":"T35."},
      {"id":36,"ticker":"AMPX","dateIn":"2026-05-05","dateOut":"2026-05-07","qty":168,"entry":18.106,"exit":17.94,"ccy":"USD","pnlUSD":-27.89,"note":"Gapped stop."},
      {"id":37,"ticker":"MRVL","dateIn":"2026-03-24","dateOut":"2026-05-07","qty":10,"entry":152.10,"exit":160.02,"ccy":"USD","pnlUSD":79.20,"note":"Stop triggered."},
      {"id":38,"ticker":"CEG","dateIn":"2026-05-04","dateOut":"2026-05-07","qty":14,"entry":308.072,"exit":314.77,"ccy":"USD","pnlUSD":93.77,"note":"Stop raised."},
      {"id":39,"ticker":"PYPL","dateIn":"2026-05-08","dateOut":null,"qty":55,"entry":45.639,"exit":null,"ccy":"USD","pnlUSD":null,"note":"T39. Stop $37.50. OPEN."},
      {"id":40,"ticker":"_UNUSED","dateIn":null,"dateOut":null,"qty":0,"entry":0,"exit":null,"ccy":"USD","pnlUSD":null,"note":"T40 reserved."},
      {"id":41,"ticker":"R3NK","dateIn":"2026-05-11","dateOut":"2026-05-12","qty":200,"entry":46.485,"exit":43.9925,"ccy":"EUR","pnlUSD":-543,"note":"T41. CLOSED."},
      {"id":42,"ticker":"IREN","dateIn":"2026-05-11","dateOut":"2026-05-18","qty":24,"entry":55.042,"exit":51.98,"ccy":"USD","pnlUSD":-73.49,"note":"T42. Stop triggered."},
      {"id":43,"ticker":"ZETA","dateIn":"2026-05-11","dateOut":null,"qty":191,"entry":16.866,"exit":null,"ccy":"USD","pnlUSD":null,"note":"T43. P20 active. Stop $16.98. OPEN."},
      {"id":44,"ticker":"PATH","dateIn":"2026-05-11","dateOut":null,"qty":320,"entry":10.726,"exit":null,"ccy":"USD","pnlUSD":null,"note":"T44. T23 lock Fri 22. Earnings May 28. OPEN."},
      {"id":45,"ticker":"LDO","dateIn":"2026-03-27","dateOut":"2026-05-12","qty":35,"entry":56.086,"exit":50.00,"ccy":"EUR","pnlUSD":-232,"note":"T45. CLOSED."},
      {"id":46,"ticker":"AMZN","dateIn":"2026-03-24","dateOut":"2026-05-12","qty":30,"entry":201.204,"exit":263.943,"ccy":"USD","pnlUSD":1882,"note":"T46. Largest gain. CLOSED."},
      {"id":47,"ticker":"CCL","dateIn":"2026-05-13","dateOut":null,"qty":250,"entry":24.706,"exit":null,"ccy":"USD","pnlUSD":null,"note":"T47. Stop $23.00. +4.8% unrealised. OPEN."},
      {"id":48,"ticker":"NCLH","dateIn":"2026-05-13","dateOut":null,"qty":75,"entry":15.914,"exit":null,"ccy":"USD","pnlUSD":null,"note":"T48. Stop $14.50. Buffer $1.50. OPEN."},
      {"id":49,"ticker":"MSFT","dateIn":"2026-04-30","dateOut":"2026-05-13","qty":25,"entry":403.052,"exit":402.09,"ccy":"USD","pnlUSD":-24,"note":"T49. CLOSED."},
      {"id":50,"ticker":"CCJ","dateIn":"2026-04-29","dateOut":"2026-05-13","qty":50,"entry":117.02,"exit":112.17,"ccy":"USD","pnlUSD":-243,"note":"T50. CLOSED."},
      {"id":51,"ticker":"BAH","dateIn":"2026-04-08","dateOut":"2026-05-13","qty":33,"entry":76.531,"exit":69.00,"ccy":"USD","pnlUSD":-249,"note":"T51. CLOSED."},
      {"id":52,"ticker":"LEU","dateIn":"2026-05-14","dateOut":null,"qty":15,"entry":191.697,"exit":null,"ccy":"USD","pnlUSD":null,"note":"T52. Stop $158.17. OPEN."},
      {"id":53,"ticker":"CRML","dateIn":"2026-03-24","dateOut":"2026-05-15","qty":110,"entry":9.08,"exit":11.1744,"ccy":"USD","pnlUSD":230.38,"note":"S44. CLOSED."},
      {"id":54,"ticker":"ABVX","dateIn":"2026-04-06","dateOut":"2026-05-15","qty":50,"entry":109.89,"exit":120.909,"ccy":"USD","pnlUSD":550.95,"note":"S44. M&A. CLOSED."},
      {"id":55,"ticker":"SNPS","dateIn":"2026-03-24","dateOut":"2026-05-15","qty":8,"entry":495.125,"exit":496.65,"ccy":"USD","pnlUSD":12.20,"note":"S45. CLOSED."},
      {"id":56,"ticker":"RR","dateIn":"2026-04-23","dateOut":"2026-05-15","qty":100,"entry":1128.60,"exit":1149.20,"ccy":"GBP","pnlUSD":26.16,"note":"S45. CLOSED."},
      {"id":57,"ticker":"IAU","dateIn":"2026-05-18","dateOut":null,"qty":175,"entry":86.006,"exit":null,"ccy":"USD","pnlUSD":null,"note":"T57. No stop. Macro hedge. OPEN."},
      {"id":58,"ticker":"UUUU","dateIn":"2026-03-24","dateOut":"2026-05-20","qty":50,"entry":22.011,"exit":16.48,"ccy":"USD","pnlUSD":-276.55,"note":"T58. Stop triggered S48. CLOSED."},
      {"id":59,"ticker":"IES","dateIn":null,"dateOut":null,"qty":1500,"entry":null,"exit":null,"ccy":"GBP","pnlUSD":null,"note":"T59 PENDING. IES partial sell 1,500sh @ 32p limit DAY order submitted S49. UNCONFIRMED FILL. Check IBKR Fri 22 May. If filled: pnl = 1500 x (32p - 17.49p) = 1500 x 14.51p = £217.65 gross. If not filled: resubmit."}
    ],
    "lastUpdated":"2026-05-21 S49 CLOSE. 59 rows (44 closed + 14 open + T59 IES partial sell pending). Open: T39 PYPL, T43 ZETA, T44 PATH, T47 CCL, T48 NCLH, T52 LEU, T57 IAU + IES/CODA/CGCT/LMT/IBM/MSTR/AVAV. T40 unused."
  },
  "sessionNotes": [
    {"date":"2026-05-07","note":"S37: LMT stop raised. RR.L Q1 beat. NOG/R3NK/AMPX/MRVL/CEG closed."},
    {"date":"2026-05-08","note":"S38: T39 PYPL. UUUU Q1 beat. CENTCOM strikes."},
    {"date":"2026-05-09","note":"S39: Rules framework overhauled. SI-69-76 added."},
    {"date":"2026-05-11","note":"S40: T41/T42/T43/T44 entered. Net liq $104.2K."},
    {"date":"2026-05-12","note":"S41: Framework v2.0. T46 AMZN +$1,882. Net liq $102.3K."},
    {"date":"2026-05-13","note":"S42: T47 CCL @$24.70. T48 NCLH @$15.90."},
    {"date":"2026-05-14","note":"S43: T52 LEU entered. CLARITY passed committee."},
    {"date":"2026-05-15","note":"S44: CRML +$230. ABVX +$551. Trump-Xi Hormuz statement."},
    {"date":"2026-05-16","note":"S45: SNPS+RR.L stopped +$38. BTC $79K. Warsh confirmed."},
    {"date":"2026-05-18","note":"S46: T42 IREN stopped -$73.49. T57 IAU opened @$86.00. Rate hike 45%."},
    {"date":"2026-05-19","note":"S47: Full scan. AVAV SI-84 chart reviewed. NCLH 7c from stop (critical). 15 positions."},
    {"date":"2026-05-20","note":"S48: UUUU stopped -$277. CCL +3.73% peace signal. NCLH recovered. NVDA earnings pending. V+SPGI Stage 1 complete."},
    {"date":"2026-05-21","note":"S49 CLOSE: IES +48.44% FlexBase world-record GWh contract RNS. FlexBase confirmed funded CHF 1B+ DACH family offices + Swissgrid grid connection committed. IES partial sell 1,500sh @ 32p DAY limit submitted — UNCONFIRMED FILL. IBM +6.67% Project Glasswing + NVDA halo. IBM stop raised $210.08 → $219.78. CGCT no-redemption confirmed. SGOV deferred — hold $42,363 IBKR cash (~3.3%). META Stage 1 complete → MONITORING ($570-610 entry, stop $525, target $750-800). INTU identified — 62.5% below ATH, 12.8x NTM PE, three gates before entry ($295-315). RYAAY gate suspended ($56.88 vs $52 gate). AECOM + Jacobs added UNIVERSE. WTI $97.33 (SI-25 gap $2.05 — closest since crisis). Rate hike prob risen 63%. Unrealised P&L first positive session since Hormuz began (+$591). Daily P&L +$738.48. Net Liq $102.5K. USER AWAY Mon 26 — Sun 31. Next file: trading_journal63.jsx (S50). Next session: Fri 22 May."}
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
            <div style={{fontSize:18,fontWeight:700,color:COLORS.textBright}}>CLAUDE FUND — JOURNAL v62 S49</div>
            <div style={{fontSize:11,color:COLORS.textDim,marginTop:2}}>Session 49 — Thu 21 May 2026 | {data.fund.account} | 14 positions | Daily +$738.48 (+0.73%)</div>
          </div>
          <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
            {[{l:"NET LIQ",v:"$102.5K",c:COLORS.green},{l:"CASH USD",v:"$42,363",c:COLORS.yellow},{l:"DAILY P&L",v:"+$738.48",c:COLORS.green},{l:"UNREAL",v:"+$591",c:COLORS.green}].map(m=>(
              <div key={m.l} className="card" style={{textAlign:"center",minWidth:80}}>
                <div style={{fontSize:9,color:COLORS.textDim}}>{m.l}</div>
                <div style={{fontSize:14,fontWeight:700,color:m.c||COLORS.textBright,marginTop:2}}>{m.v}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{marginTop:6,padding:"6px 10px",background:"rgba(63,185,80,.1)",border:"1px solid rgba(63,185,80,.3)",borderRadius:4,fontSize:11,color:COLORS.green}}>S49: IES +48.44% FlexBase GWh world record | IBM +6.67% Project Glasswing | First positive unrealised since Hormuz began | Daily +$738</div>
        <div style={{marginTop:4,padding:"6px 10px",background:"rgba(88,166,255,.15)",border:"1px solid rgba(88,166,255,.4)",borderRadius:4,fontSize:11,color:COLORS.accent}}>PENDING: IES 1,500sh 32p limit unconfirmed | IBM stop $219.78 raised | CGCT no-redemption confirmed | SGOV deferred | META MONITORING</div>
        <div style={{marginTop:4,padding:"6px 10px",background:"rgba(248,81,73,.1)",border:"1px solid rgba(248,81,73,.3)",borderRadius:4,fontSize:11,color:COLORS.red}}>SI-25 GAP $2.05 (WTI $97.33) | RATE HIKE 63% | INTU $305 check Fri gates | USER AWAY Mon 26 — Sun 31 | Next: trading_journal63.jsx (S50)</div>
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
      </div>)}
      {activeTab==="watch"&&(<div>
        <div style={{fontSize:11,color:COLORS.textDim,marginBottom:8}}>ACTIVE: IONQ, TUI1, SIX2, RYAAY (SUSPENDED $56.88), CRM (T23 Mon) | MONITORING: META★, V, SPGI, LEU-T53, MSFT, RCL, GTT, MSTR-SCALE, MU, LULU, SOFI | UNIVERSE: INTU★, AECOM★, J★, HD, XLF/KRE, OKLO, BKNG, ORCL, ENGIE, BWXT | ★=S49 NEW</div>
        <div style={{display:"flex",flexDirection:"column",gap:6}}>
          {data.watchList?.map((w,i)=>(<div key={i} className="card" style={{borderLeft:"3px solid "+sc(w.status)}}>
            <div style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap",marginBottom:3}}>
              <span style={{fontWeight:700,fontSize:13,color:COLORS.textBright}}>{w.ticker}</span>
              {w.name&&<span style={{fontSize:10,color:COLORS.textDim}}>{w.name}</span>}
            </div>
            <div style={{fontSize:10,color:sc(w.status),marginBottom:2,fontWeight:600}}>{w.status}</div>
            <div style={{fontSize:9,fontStyle:"italic",color:COLORS.textBright,marginBottom:2}}>{w.thesis?.substring(0,180)}{w.thesis?.length>180?"...":""}</div>
            {w.gate&&<div style={{fontSize:9,color:COLORS.yellow}}>Gate: {w.gate?.substring(0,140)}</div>}
          </div>))}
        </div>
      </div>)}
      {activeTab==="macro"&&(<div style={{display:"flex",flexDirection:"column",gap:6}}>
        <div className="card" style={{borderLeft:"4px solid "+COLORS.red}}>
          <div style={{fontWeight:700,color:COLORS.red,fontSize:13,marginBottom:6}}>RATE HIKE 63% — CAPE 40.93x — NVDA BEAT MUTED</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:8}}>
            {[{l:"Shiller CAPE",v:"40.93x",c:COLORS.red},{l:"Rate hike prob",v:"63% (risen)",c:COLORS.red},{l:"WTI",v:"$97.33",c:COLORS.orange},{l:"SI-25 gap",v:"$2.05",c:COLORS.orange},{l:"BTC",v:"~$77.8K",c:COLORS.yellow},{l:"NVDA reaction",v:"Muted +1.5%",c:COLORS.yellow}].map((m,i)=>(<div key={i} className="card"><div style={{fontSize:9,color:COLORS.textDim}}>{m.l}</div><div style={{fontSize:12,fontWeight:700,color:m.c||COLORS.textBright}}>{m.v}</div></div>))}
          </div>
          <div style={{fontSize:10,color:COLORS.yellow}}>HEDGE: IAU -$143 (no stop, patient capital) + $42,363 cash IBKR (~3.3%) + external reserves. Do not force cash into growth names.</div>
        </div>
        <div className="card" style={{borderLeft:"4px solid "+COLORS.green}}>
          <div style={{fontWeight:700,color:COLORS.green,fontSize:12,marginBottom:4}}>SI-25 GAP $2.05 — CLOSEST SINCE HORMUZ CRISIS BEGAN</div>
          <div style={{fontSize:10,color:COLORS.textDim}}>WTI $97.33 vs threshold $95.28. Trump 'final stages' drove -5.7% single session. Condition 1 (commercial Hormuz transit) still unmet. Do NOT execute SI-25 manually. Both conditions simultaneously required.</div>
        </div>
      </div>)}
      {activeTab==="peace"&&(<div className="card" style={{borderLeft:"4px solid "+COLORS.green}}>
        <div style={{fontWeight:700,color:COLORS.green,fontSize:13,marginBottom:8}}>PEACE DEAL PORTFOLIO — FIRST POSITIVE UNREALISED SESSION</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:10}}>
          {[{l:"CCL unrealised",v:"+$296 (+4.8%)",c:COLORS.green},{l:"CCL buffer",v:"$2.89 vs stop $23",c:COLORS.green},{l:"NCLH unrealised",v:"+$6 (+0.6%)",c:COLORS.green},{l:"NCLH buffer",v:"$1.50 vs stop $14.50",c:COLORS.green},{l:"WTI",v:"$97.33 (-5.7% Thu)",c:COLORS.green},{l:"SI-25 gap",v:"$2.05 remaining",c:COLORS.orange}].map((m,i)=>(<div key={i} className="card"><div style={{fontSize:9,color:COLORS.textDim}}>{m.l}</div><div style={{fontSize:12,fontWeight:700,color:m.c}}>{m.v}</div></div>))}
        </div>
        <div style={{fontSize:11,color:COLORS.textBright,marginBottom:6}}>Both SI-25 conditions technically unmet. Oil at $97.33 needs to fall to $95.28 AND commercial Hormuz transit must resume simultaneously. Do not act manually. Stops protect downside if deal collapses.</div>
        <div style={{fontSize:10,color:COLORS.yellow}}>TRUMP DEADLINE: Mon 25 May (early next week). EIA baseline: Hormuz closed until late May, traffic picks up June. Third-order plays: AECOM + Jacobs added UNIVERSE for reconstruction angle.</div>
      </div>)}
      {activeTab==="tracker"&&(<div>
        <div style={{fontSize:12,fontWeight:600,color:COLORS.accent,marginBottom:6}}>TRADE TRACKER — 14 OPEN | 44 CLOSED | T59 IES partial sell PENDING</div>
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
        <span style={{fontSize:10,color:COLORS.textDim}}>v62 S49 | Thu 21 May 2026 | 14 pos | Next: trading_journal63.jsx (S50) | Dropbox: Claude-Fund/journal/</span>
        <div style={{display:"flex",gap:4,flexWrap:"wrap"}}>
          <span className="badge badge-green">Daily +$738</span>
          <span className="badge badge-green">IES +48%</span>
          <span className="badge badge-green">IBM +6.7%</span>
          <span className="badge badge-amber">IES sell pending</span>
          <span className="badge badge-blue">META MONITORING</span>
          <span className="badge badge-red">INTU gates Fri</span>
          <span className="badge badge-amber">SI-25 gap $2.05</span>
        </div>
      </div>
    </div>
  );
}
