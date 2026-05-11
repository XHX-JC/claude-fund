import { useState, useEffect, useCallback } from "react";
const STORAGE_KEY = "fund_journal_v3";
// TIME: Run bash clock (TIME_PROTOCOL.md) at every session open. Never state times from memory.
// UAE=UTC+4. LSE/EU open 11:00 UAE. NYSE open 17:30 UAE.
// E20: IBKR TWS only for live prices. E22: CENTCOM required for military claims.
// E23: Section N EU Energy mandatory every full scan. SI-68: No close files until screenshots.
// E24: Computer clock authoritative. str_replace DOES NOT WORK on Windows paths -- use write_file only.

const INITIAL_STATE = {
  "lastUpdated": "2026-05-09 S39 SCAN SESSION. 15 new watchlist entries added from S39 scans: DPRO, RDW, TE, LUMN, JOBY, ANET, CIFR, NOK, IREN, ANDURIL, SOFI, RCAT, ONDS, ZETA, PATH. Watchlist now 24 entries. Priority entries: ZETA (Stage 2, enter $16-17.50 stop $14.50), PATH (Stage 2 fast-track, enter ~$10.76 stop $9.20).",
  "sessionNumber": "S39",
  "fund": {
    "account": "U24936508",
    "netLiquidity": 104820,
    "unrealizedPnL": 4100,
    "cashUSD": 36468,
    "cashGBP": 641,
    "cashEUR": -2881,
    "broker": "IBKR Pro",
    "note": "v53 S39. Sat 9 May 2026. 19 positions. 2 GTCs. 24-entry watchlist. Framework session + full scan complete."
  },
  "thesis": {
    "title": "IRAN REJECTED US PROPOSAL -- CENTCOM STRIKES FRI -- BRENT >$101 -- THESIS INTACT",
    "summary": "Iran FM demanded reparations, rejected MOU framework. CENTCOM defensive strikes Fri May 8. Brent recovering above $101. WTI $94.81 Thu close. Saudi structural damage ~600K bpd ongoing. SI-25 Condition 1 unmet. Thesis intact.",
    "oilWTI": 94.81,
    "SI25Trigger": 105.87,
    "SI25PeakRef": 117.63,
    "SI25Status": "WTI $94.81. Brent >$101 Fri. Iran rejected deal. Condition 1 UNMET. Thesis INTACT.",
    "hormuzStatus": "Deal collapsed. Iran demanded reparations. CENTCOM strikes Fri. No commercial reopening.",
    "keyDates": [
      {"date": "S39 MONDAY OPEN", "event": "1) Read NCH2 H1 results (Mon 12 May 07:00 CEST = 09:00 UAE). Order intake >EUR150M gate before any entry. 2) Check CEG Q1 (Sun May 11 AMC) -- re-entry >5% pullback only. 3) Monitor MSFT open (stop $403.89, TCI risk). 4) Monitor R3NK open (stop EUR47, Iran deal weekend risk). 5) SNPS T23 locks ~May 25.", "priority": "CRITICAL"},
      {"date": "Mon May 12", "event": "NCH2 Q2 FY25/26 H1 results. Confirm order intake >EUR150M + no new guidance cut. Entry ~EUR8.27, stop EUR6.50, 230sh, max loss EUR406.", "priority": "HIGH"},
      {"date": "Mon May 12", "event": "DPRO Q earnings. Gate for watchlist entry. Also TE (T1 Energy) Q1 2026 at 6am ET / 8am ET call.", "priority": "HIGH"},
      {"date": "Sun May 11 AMC", "event": "CEG Q1 earnings. Monitoring only. Re-entry only on >5% post-earnings pullback.", "priority": "HIGH"},
      {"date": "Thu May 22", "event": "BAH Q4 FY2026 earnings. Second tranche decision gate.", "priority": "HIGH"},
      {"date": "~Mon May 25", "event": "SNPS T23 lock (48-72h before May 27 AMC). Do not move stop after lock.", "priority": "HIGH"},
      {"date": "Wed May 27 AMC", "event": "SNPS Q2 FY2026 + CRM Q1 FY2027 earnings same day. Enter CRM post-print if thesis intact.", "priority": "HIGH"},
      {"date": "Thu May 28", "event": "LULU Q3 + MRVL Q1 earnings. Enter LULU post-print if pullback to 52wk low ~$127.", "priority": "HIGH"},
      {"date": "Wed Jul 30", "event": "RR.L H1 results. Review stop 1149.4p pre-H1.", "priority": "HIGH"}
    ]
  },
  "positions": [
    {"ticker":"CRML","shares":110,"avgPrice":9.08,"last":13.04,"unrealPnL":435,"unrealPct":43.6,"stop":11.20,"status":"HOLD -- STOP $11.20 -- DELIBERATE -- WTI THESIS","note":"P14 deliberate. Critical metals thesis intact."},
    {"ticker":"AMZN","shares":30,"avgPrice":201.204,"last":272.00,"unrealPnL":2124,"unrealPct":35.2,"stop":259.88,"status":"HOLD -- STOP $259.88 -- SIMPLE STOP","note":"AWS thesis intact."},
    {"ticker":"ABVX","shares":50,"avgPrice":109.89,"last":124.38,"unrealPnL":724,"unrealPct":13.2,"stop":109.93,"status":"HOLD -- STOP $109.93 -- M&A EXCEPTION","note":"Royalty buyback signal. Maximum room strategy."},
    {"ticker":"RR","name":"Rolls-Royce Holdings","shares":100,"avgPrice":1128.6,"last":1259.00,"unrealPnL":130,"unrealPct":11.6,"stop":1149.4,"cur":"GBP","status":"HOLD -- STOP 1149.4p -- H1 JUL 30 -- EU ENERGY 1/4","note":"Q1 beat +6.47%. P20 min 1204p -- deliberate H1 Jul 30 room."},
    {"ticker":"UUUU","name":"Energy Fuels Inc","shares":50,"avgPrice":22.011,"last":23.62,"unrealPnL":80,"unrealPct":7.3,"stop":16.50,"status":"HOLD -- STOP $16.50 -- Q1 BEAT -- ASM JULY 2026","note":"Q1: $35.8M rev beat. Loss -$10.8M vs -$26.3M. ASM July 2026. Scale: $21-22 pullback only."},
    {"ticker":"CODA","shares":250,"avgPrice":11.105,"last":12.67,"unrealPnL":391,"unrealPct":14.1,"stop":9.95,"status":"HOLD -- STOP $9.95 -- P14 DELIBERATE -- MORE TIME GIVEN","note":"P14 deliberate. Stop lowered S39 $10.90->$9.95. More time for Project Freedom catalyst. Max loss $288.75 within SI-35."},
    {"ticker":"CCJ","shares":50,"avgPrice":117.02,"last":120.65,"unrealPnL":182,"unrealPct":3.1,"stop":112.14,"status":"HOLD -- STOP $112.14 -- RAISE WHEN >$127","note":"Stop lowered S39 $114.21->$112.14. Mechanical raise had no technical basis. Multi-year uranium thesis needs room. Raise when sustains >$127."},
    {"ticker":"MSFT","shares":25,"avgPrice":403.052,"last":419.44,"unrealPnL":410,"unrealPct":4.1,"stop":403.89,"status":"HOLD -- STOP $403.89 -- P20 AMENDMENT S39","note":"Stop lowered S39 $412.10->$403.89. P20 amendment: rule does not apply at +3% gain. Entry-based technical level. TCI $8B exit = overhang risk Monday."},
    {"ticker":"SNPS","shares":8,"avgPrice":495.125,"last":503.00,"unrealPnL":63,"unrealPct":1.6,"stop":496.76,"status":"HOLD -- STOP $496.76 -- T23 LOCKS ~MAY 25 -- EARNINGS MAY 27","note":"Stop $440->$500.10->$496.76 S38 (weekend risk). Above cost $495.125. T23 ~May 25. Do not move after lock."},
    {"ticker":"MSTR","shares":15,"avgPrice":181.067,"last":178.85,"unrealPnL":-33,"unrealPct":-1.2,"stop":153.14,"status":"HOLD -- STOP $153.14 -- BTC GATE $85K","note":"BTC ~$80K. Scale gate $85K not triggered. Kill: BTC <$70K weekly."},
    {"ticker":"BAH","name":"Booz Allen Hamilton","shares":33,"avgPrice":76.531,"last":77.16,"unrealPnL":21,"unrealPct":0.8,"stop":69,"status":"HOLD -- STOP $69 -- MAY 22 Q4 GATE","note":"Half-size. Civil revenue risk unresolved."},
    {"ticker":"CGCT","shares":291,"avgPrice":10.295,"last":10.39,"unrealPnL":27,"unrealPct":0.9,"stop":null,"status":"HOLD -- NO STOP -- SPAC","note":"Trust floor ~$10.27."},
    {"ticker":"R3NK","name":"Renk Group AG","shares":25,"avgPrice":52.00,"last":51.39,"unrealPnL":-15,"unrealPct":-1.2,"stop":47.00,"cur":"EUR","status":"HOLD -- STOP 47 EUR -- T35 -- NATO REARMAMENT","note":"T35: GTC EUR52 filled S37. T30 applied. Max loss EUR125."},
    {"ticker":"IBM","shares":26,"avgPrice":228.739,"last":228.64,"unrealPnL":-2,"unrealPct":-0.0,"stop":210.08,"status":"HOLD -- STOP $210.08 -- SI-35 COMPLIANT","note":"Stop raised S39 $208->$210.08. SI-35 compliance: old stop gave $539 max loss vs $500 cap. New stop = $479.21 max loss. Contrarian post-Q1 entry."},
    {"ticker":"LMT","name":"Lockheed Martin","shares":10,"avgPrice":516.831,"last":512.32,"unrealPnL":-45,"unrealPct":-0.9,"stop":479.77,"status":"HOLD -- STOP $479.77 -- RAISED S37","note":"Stop raised $465->$479.77 S37. Max loss $368."},
    {"ticker":"LDO","name":"Leonardo SpA","shares":35,"avgPrice":56.086,"last":54.87,"unrealPnL":-43,"unrealPct":-2.2,"stop":50,"cur":"EUR","status":"HOLD -- STOP 50 EUR","note":"Rearmament thesis."},
    {"ticker":"IES","name":"Invinity Energy Systems","shares":3000,"avgPrice":17.49,"last":17.00,"unrealPnL":-15,"unrealPct":-2.8,"stopType":"MANUAL ALERT 12.5p","cur":"GBP","status":"HOLD -- MANUAL ALERT 12.5p","note":"LDES decision pending."},
    {"ticker":"AVAV","shares":15,"avgPrice":185.067,"last":168.30,"unrealPnL":-250,"unrealPct":-9.1,"stop":155,"status":"HOLD -- STOP $155 -- JUNE 30 Q4 GATE","note":"LASSO deal May 4. AMPX confirmed battery partner. Backlog +51%. June 30 Q4 gate."},
    {"ticker":"PYPL","name":"PayPal Holdings","shares":55,"avgPrice":45.64,"last":46.10,"unrealPnL":25,"unrealPct":1.0,"stop":37.50,"status":"HOLD -- STOP $37.50 -- NEW T39 -- FINTECH TURNAROUND","note":"T39: Market fill S38 @$45.64. Q1 beat (EPS $1.34 vs $1.27 est). TPV $464B +11%. Fwd P/E 8.7x. 41% below 52wk high. Next earnings ~Aug 2026."}
  ],
  "pendingGTCs": [
    {"ticker":"LAC","name":"Lithium Americas","action":"BUY","limit":4.80,"stop":4.00,"qty":220,"maxLoss":176,"status":"GTC $4.80 / STOP $4.00 -- SI-37 SPECULATIVE","note":"Thacker Pass Phase 1."},
    {"ticker":"TXT","name":"Textron Inc","action":"BUY","limit":88.00,"stop":79.00,"qty":55,"maxLoss":495,"status":"GTC $88 PENDING -- ~7% PULLBACK NEEDED","note":"Bell MV-75 Valor = 20yr military monopoly."}
  ],
  "watchList": [
    {"ticker":"NCH2","name":"Thyssenkrupp Nucera","thesis":"Largest industrial alkaline electrolyser. EV ~EUR370M vs EUR648M net cash. Stage 2 done. Gate: order intake >EUR150M in Q2 FY25/26.","entry":"Market ~EUR8.27 if gate confirmed. Stop EUR6.50. 230sh. Max loss EUR406.","gate":"Q2 FY25/26 H1 results MAY 12 07:00 CEST. Read before entry. Do NOT enter before May 12.","status":"STAGE 2 DONE -- GATE MAY 12 -- DO NOT ENTER BEFORE"},
    {"ticker":"CRM","name":"Salesforce","thesis":"Down 30% in 2026. Fwd P/E 13.8x. $25B buyback. Agentforce AI revenue. World's largest CRM at multi-year low.","entry":"Post May 27 earnings ONLY. Beat: enter May 28 open. Miss: entry at 52wk low ~$163, stop $155.","gate":"Q1 FY2027 earnings May 27 AMC. P24 rule prevents pre-earnings entry.","status":"WATCH -- EARNINGS MAY 27 -- POST-PRINT ONLY"},
    {"ticker":"LULU","name":"Lululemon Athletica","thesis":"60% below ATH. Fwd P/E 10.5x. EBITDA 24.6%. Revenue +7%. CEO overhang is sentiment not fundamental. Near 52wk low $127.80.","entry":"Post May 28 earnings ONLY. Pullback to ~$127: enter, stop $124.","gate":"Q3 FY2026 earnings May 28. P24 prevents pre-entry.","status":"WATCH -- EARNINGS MAY 28 -- POST-PRINT ONLY"},
    {"ticker":"V","name":"Visa Inc","thesis":"Stopped T32 @$321.823 (+$117.58). Q2 FY26 rev +15%. Thesis intact.","entry":"$305-315 zone only. Stop $292-295.","gate":"Q3 earnings Jul 28. Ex-div May 12 $0.67.","status":"WATCH -- STOPPED T32 -- RE-ENTRY $305-315"},
    {"ticker":"NOG","name":"Northern Oil and Gas","thesis":"Sold T33 @$25.11 Iran deal noise. Iran rejected deal. Re-entry if WTI >$105 sustained.","entry":"No entry until SI-25 Condition 1 confirmed failure + WTI >$105.","gate":"WTI sustained >$105.","status":"WATCH -- SOLD T33 -- IRAN REJECTED DEAL"},
    {"ticker":"CEG","name":"Constellation Energy","thesis":"Closed T38 @$314.77 (+$93.77). Q1 May 11. Nuclear/data centre thesis strong.","entry":"Re-entry >5% post-Q1 pullback only. EU energy slot 2/4 available.","gate":"Q1 earnings May 11 AMC.","status":"WATCH -- CLOSED T38 -- Q1 MAY 11"},
    {"ticker":"MRVL","name":"Marvell Technology","thesis":"Closed T37 @$160.02. AI chip thesis intact. AMD Q1 confirms demand.","entry":"Post May 28 earnings if SI-39 flags.","gate":"Q1 earnings May 28.","status":"WATCH -- CLOSED T37"},
    {"ticker":"PCELL","name":"PowerCell Sweden","thesis":"PEM H2 fuel cells. Bosch partner. Stage 1 done S37.","entry":"SEK 28-32. Stop SEK 22.","gate":"EBITDA confirmation.","status":"STAGE 1 DONE S37 -- MONITOR"},
    {"ticker":"INTL","name":"Intel Corp","thesis":"Turnaround: 18A HVM, NVIDIA stake, US Gov shareholder. Entry $75-82 MISSED -- stock at $110 ATH.","entry":"Entry window missed. Do not chase.","gate":"None at current levels.","status":"WATCH -- ENTRY MISSED -- $110 ATH"},
    {"ticker":"PATH","name":"UiPath","thesis":"Enterprise agentic automation. Fwd P/E 13.2x. $1.6B cash, zero debt. 97% gross retention, 108% NRR. ARR $1.693B +12%. Agentic revenue impact FY2027. 45.8% below ATH. Cheapest AI software valuation in large-cap. S39 Stage 2 fast-track.","entry":"~$10.76 current. Stop $9.20 (below 52wk low $9.28). SI-35 sizing: 320sh, max loss $499.","gate":"No gate -- thesis confirmed, entry at current levels. Next earnings Aug 2026.","status":"STAGE 2 FAST-TRACK -- ENTER ~$10.76 -- STOP $9.20"},
    {"ticker":"ZETA","name":"Zeta Global Holdings","thesis":"AI marketing cloud. 19 consecutive beat-and-raise quarters. Rev +50% Q1 2026. FY2026 guide $1.785B (+37%). EBITDA $397M guide. FCF $235M. Athena AI platform driving enterprise consolidation. 2.4x EV/Rev. Targeting GAAP EPS positive FY2026. 31.3% below ATH. S39 Stage 2.","entry":"$16.00-17.50 (current $17.11). Stop $14.50. SI-35: ~191sh, max loss ~$500.","gate":"No gate -- Q1 results fresh, 19th beat confirmed. Next earnings Aug 4.","status":"STAGE 2 -- ENTER $16-17.50 -- STOP $14.50"},
    {"ticker":"ANET","name":"Arista Networks","thesis":"#1 high-speed Ethernet switching for AI data centres. Q1 2026 rev $2.71B +35.1%. FY guide raised to $11.5B (+27.7%). AI fabric $3.5B target. 38.3% net margins. CEO demand: 'best ever seen'. 40x fwd P/E. Supply chain 1-2yr constraint. Pool B quality compounder. 21% below ATH.","entry":"$130-138 on pullback (200-day $138.50). Stop $125. Do not chase current $142.","gate":"CEO sold 1.1M shares Apr at $150-178. Wait for Q2 (Aug 4) or macro pullback to zone.","status":"STAGE 1 -- ENTRY $130-138 -- DO NOT CHASE"},
    {"ticker":"IREN","name":"IREN Ltd","thesis":"Ex-Bitcoin miner pivoting to GPU AI cloud. Microsoft $9.7B contract, NVIDIA $3.54B deal + $2.1B investment. Target 140K GPUs / $3.4B ARR by end-2026. Cash $2.6B. AI cloud rev +94% QoQ to $33.6M. Q3 FY26 revenue miss was transitional (BTC ramp-down). Childress 300MW under construction. 20% below ATH.","entry":"$58-62 if stabilises Mon open. Stop $52. SI-37: 24sh, max loss ~$216.","gate":"Monitor Monday open post-Q3 miss. Needs to hold above $58. If breaks $58 watch $50-52.","status":"STAGE 1 -- MONITOR MONDAY OPEN -- GATE $58 HOLD"},
    {"ticker":"NOK","name":"Nokia Corporation","thesis":"Finnish telecoms equipment. AI/Cloud net sales +49% YoY. Optical Networks +20%. EUR1B AI/Cloud orders Q1. Book-to-bill 3x AI/Cloud. Network Infrastructure guide raised to 12-14%. Optical+IP 18-20%. AI addressable market revised from 16% to 27% CAGR. FY26 op profit EUR2.0-2.5B. +220% from 52wk low -- near ATH.","entry":"$10.50-11.00 on pullback only (current $12.81 is 91% of ATH $13.98). Stop $9.50.","gate":"Near ATH -- wait for pullback. P13 considerations apply at current level.","status":"WATCH -- ENTRY $10.50-11.00 ON PULLBACK ONLY"},
    {"ticker":"SOFI","name":"SoFi Technologies","thesis":"Digital financial super-app. Q1 2026 rev $1.1B +41%, Rule-of-40 score 72 (18th consecutive). Net income $167M (2.3x YoY). FY guide $4.655B +30%, EPS $0.60. 14.7M members +35%. T27 pattern: 52% below ATH. Credit cycle risk in higher-for-longer environment. Fintech turnaround.","entry":"$13-14 on macro pullback. Stop $11.50. SI-35 sizing.","gate":"PYPL (T39) open -- do not add second fintech. Gate: PYPL resolved first. Next earnings Jul 28.","status":"STAGE 1 -- GATE: PYPL RESOLVED FIRST"},
    {"ticker":"ONDS","name":"Ondas Inc","thesis":"Autonomous drone/robotics platform (OAS) + railroad private wireless (Networks). FY2025 rev $50.7M +605% YoY. 2026 guide raised to $375M+ (from $170M). Backlog $65.3M +180% QoQ. Cash $1.5B+. Iron Drone counter-UAS, Roboteam ground robots, Optimus FAA-certified. AAR selected dot16 as railroad wireless standard. T2 history: stopped @$8.505 (-$601). P11 re-entry eligible above 5% of exit.","entry":"Break above $10.00 on above-average volume. Stop $8.30 (200-day). SI-37: 150sh, max loss $255.","gate":"Must reclaim $10 on volume before entry. Currently below 50-day $9.99. T2 discipline.","status":"STAGE 1 -- GATE: RECLAIM $10 ON VOLUME -- T2 HISTORY"},
    {"ticker":"RCAT","name":"Red Cat Holdings","thesis":"US NDAA-compliant military drone manufacturer. Q1 2026 rev $15.5M +849% YoY. Gross margin 12.7% vs -52.1% prior year. Black Widow sUAS -- Army SRR programme. NATO ally + Asia-Pacific ally orders. Drone Dominance Program. Blue Ops maritime USVs. Apium swarm robotics acquired. FRIP contract = potential 100x unit scale. NDAA Section 1709 restricts Chinese drones -- structural tailwind. 44.9% below ATH.","entry":"$8.50-9.50 on pullback. Stop $7.50. SI-37: ~150sh, max loss ~$300.","gate":"FRIP (Full Rate Initial Production) announcement OR quarterly rev demonstrating $150M+ run-rate path. Currently revenue lumpy -- government procurement cycles.","status":"WATCH -- GATE: FRIP CONTRACT OR $150M ARR TRACK"},
    {"ticker":"DPRO","name":"Draganfly Inc","thesis":"Canadian NDAA-compliant drone company pivoting to US/NATO defence. FY2025 rev $7.73M +17.8%. Cash ~$145M (raised $50M Feb 2026 @$7/share). Palladyne AI swarm integration. USAF SOCOM supply. Drone Dominance Program Phase 1 perfect score. Ukraine/NATO exposure. Q1 earnings May 12. 62% below 52wk ATH $14.40. Micro-cap ($140M mkt cap).","entry":"Post May 12 print only. SI-37 speculative max $1,500. Entry only if revenue accelerating toward $5M+ quarterly run.","gate":"Read May 12 Q1 earnings first. P24 rule: no pre-earnings entry. Revenue must show acceleration.","status":"WATCH -- GATE: MAY 12 Q1 PRINT FIRST"},
    {"ticker":"RDW","name":"Redwire Corp","thesis":"Integrated space infrastructure + defence tech. Q1 2026 rev $96.97M +57.9% YoY. Record contracted backlog $498.1M, book-to-bill 1.92. FY2026 guide $450-500M. EPS miss (-$0.40 vs -$0.15) from non-recurring charges. $175M liquidity. $1.8B Andromeda IDIQ win. Two segments: Space + Defence Tech. Artemis 2 mission camera delivered. 50% below 52wk ATH $22.25.","entry":"$9.90-10.50 if holds above $10 post-earnings base. Stop $8.80. SI-37: ~136sh, max loss ~$163.","gate":"Understand Q1 non-recurring charges -- are they genuinely one-off? Stock must hold $10+ support. Next earnings ~Aug 2026.","status":"STAGE 1 -- ENTRY $9.90-10.50 -- HOLD ABOVE $10"},
    {"ticker":"TE","name":"T1 Energy Inc","thesis":"US solar module manufacturer (formerly FREYR Battery). 5GW G1_Dallas operating. G2_Austin 5.3GW cell fab under construction (production end-2026). 45X tax credit monetisation ($160M sold). Rev TTM $755M. Net loss -$334M. Debt/equity 170%. $125M convertible notes May 2026 (dilution overhang). Q1 2026 earnings May 12. Serial diluter history. Only US company with P-type and N-type tech at scale.","entry":"Post May 12 Q1 print. Entry only if margin expanding and path to profitability credible. $5.50-6.00, stop $4.80.","gate":"May 12 Q1 earnings -- is module margin expanding? Leverage at 5.5x is a risk. Convertible overhang caps every rally.","status":"WATCH -- GATE: MAY 12 Q1 PRINT -- LEVERAGE CONCERN"},
    {"ticker":"LUMN","name":"Lumen Technologies","thesis":"Telecom transformation: sold fibre-to-home to AT&T for $5.72B, cut debt from $17.3B to $12.9B. Strategic revenue 51% of total (first time > legacy). FCF guidance raised to $1.9-2.1B. Acquiring Alkira $475M for NaaS/AI workload networking. Q1 2026 rev $2.899B (-9% YoY). EBITDA $849M, margin 44.1%. Net loss $200M. Legacy declining -14%. T27 turnaround pattern. Still $12.9B debt vs $8.78B market cap.","entry":"$7.50-8.00 on pullback. Stop $6.80. Research Alkira deal before entry.","gate":"Understand Alkira NaaS traction before entry. JP Morgan conference May 18 catalyst. Debt load remains the guillotine risk.","status":"STAGE 1 -- ENTRY $7.50-8.00 -- RESEARCH ALKIRA FIRST"},
    {"ticker":"JOBY","name":"Joby Aviation","thesis":"eVTOL air taxi. SR3 audit complete (3 of 4 FAA milestones). First FAA-conforming aircraft flew. White House eIPP: early ops in up to 11 states pre-certification. JFK-Manhattan demo complete. Cash $2.5B. Revenue $24M Q1 (BLADE). Net loss $110M. Toyota partner. $10.6B market cap at 48% below ATH. Plans: 140K GPUs by 2027, $1B+ revenue.","entry":"Post FAA Type Certification (SR4 complete + TC). Do not enter pre-TC -- certification binary.","gate":"FAA Type Certification announcement is the only valid entry gate. eIPP pre-cert ops are marketing not revenue. Cash runway ~3.4 years at current burn.","status":"WATCH -- GATE: FAA TYPE CERTIFICATION ONLY"},
    {"ticker":"CIFR","name":"Cipher Digital","thesis":"Ex-Bitcoin miner (rebranded Feb 2026) pivoting to AI hyperscale data centre landlord. 15yr 300MW AWS lease + 10yr 300MW Google/Fluidstack lease = $9.3B contracted. Black Pearl AWS delivery phased 2026. Barber Lake Google build. $3.73B HY bonds (incl. $1.4B at 7.125%). Q1 loss $114M. BTC rev declining. AI revenue not yet flowing. 19.4% below ATH.","entry":"Only after Black Pearl phase 1 first revenue delivery to AWS is confirmed. Do not enter pre-revenue.","gate":"Black Pearl phase 1 live delivery = entry gate. $3.73B HY bond stack is the guillotine if delivery delayed. Check quarterly for first AI revenue print.","status":"WATCH ONLY -- GATE: BLACK PEARL PHASE 1 LIVE"},
    {"ticker":"ANDURIL","name":"Anduril Industries","thesis":"PRIVATE. Not publicly traded. Lattice OS autonomous defence platform. Revenue ~$1B 2024, CEO guide $4.3B 2026. $20B Army enterprise contract (Mar 2026). Fury CCA production started at Arsenal-1. Series H raising ~$4B at ~$60B valuation (Thrive + a16z). Palmer Luckey: IPO 'definitely' on roadmap -- after Arsenal-1 proven. No S-1 filed. Secondary market ~$68/sh (Hiive). Pre-IPO min $50K -- incompatible with fund size.","entry":"IPO listing only. Do not use pre-IPO platforms (min $50K = 48% of fund). If S-1 filed: Stage 1 same week. At listing: SI-37 initial ($1,500), no chasing open.","gate":"S-1 filing with SEC = immediate Stage 1. Monitor via web search. IPO window: late 2026 to 2027 speculative.","status":"IPO WATCH -- PRIVATE -- GATE: S-1 FILING"}
  ],
  "shortWatchlist": [
    {"ticker":"PLTR","thesis":"Dormant until Q2 July.","status":"DORMANT UNTIL Q2 JULY 2026","trigger":"Q2 guidance cut only"},
    {"ticker":"AAL","thesis":"No fuel hedge, $36.5B debt.","trigger":"Dead-cat bounce $13-14. WTI recovery >$100 required.","status":"WATCH"},
    {"ticker":"CCL","thesis":"Fuel 12-15% costs.","trigger":"Rally to $23-25","status":"WATCH"},
    {"ticker":"SNOW","thesis":"18x fwd revenue.","trigger":"Earnings miss + guidance trim","status":"WATCH"}
  ],
  "euEnergyTransition": {
    "title":"EU/UK ENERGY TRANSITION -- SECTION N (SI-67)",
    "concentrationCeiling":"Maximum 4 positions. CURRENT: RR.L (1/4). Room for 3 more.",
    "stage1Queue":["NCH2 Stage 2 done -- gate May 12","PCELL.ST done S37 -- monitor"],
    "watchOnly":["CWR.L at 500p","ITM.L at 135-140p"],
    "gateNote":"NCH2: DO NOT ENTER before May 12. Results 07:00 CEST = 09:00 UAE.",
    "scanFrequency":"First session each month + thesis-triggered"
  },
  "criticalMineralsThesis": {
    "title":"CRITICAL MINERALS -- NATIONAL SECURITY THEME",
    "concentrationCeiling":"CRML (held) + LAC (GTC) + UUUU (held) = MAXIMUM. T22.",
    "candidates":[
      {"ticker":"CRML","status":"HELD +43.6%","thesis":"Critical metals + European Lithium","stop":"$11.20"},
      {"ticker":"UUUU","status":"HELD -- Q1 BEAT -- ASM JULY","thesis":"Only US licensed REE separator. Q1 $35.8M beat.","classification":"SI-37"},
      {"ticker":"LAC","status":"GTC $4.80 PENDING","thesis":"Thacker Pass. DoE backed.","classification":"SI-37 Speculative"}
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
      {"id":33,"ticker":"NOG","dateIn":"2026-05-04","dateOut":"2026-05-07","qty":200,"entry":26.771,"exit":25.11,"ccy":"USD","pnlUSD":-332.20,"note":"Iran deal noise. WTI $93. T3/T17."},
      {"id":34,"ticker":"R3NK","dateIn":"2026-04-08","dateOut":"2026-05-07","qty":25,"entry":52.27,"exit":53.44,"ccy":"EUR","pnlUSD":31.59,"note":"Iran deal noise. T30. Rebuy GTC placed."},
      {"id":35,"ticker":"R3NK","dateIn":"2026-05-07","dateOut":null,"qty":25,"entry":52.00,"exit":null,"ccy":"EUR","pnlUSD":null,"note":"T35: GTC EUR52 filled S37. Rebuy T30. Stop EUR47. OPEN."},
      {"id":36,"ticker":"AMPX","dateIn":"2026-05-05","dateOut":"2026-05-07","qty":168,"entry":18.106,"exit":17.94,"ccy":"USD","pnlUSD":-27.89,"note":"T36: Stop $18.92 gapped. Pre-earnings selling. Q1 beat revenue but EPS miss."},
      {"id":37,"ticker":"MRVL","dateIn":"2026-03-24","dateOut":"2026-05-07","qty":10,"entry":152.10,"exit":160.02,"ccy":"USD","pnlUSD":79.20,"note":"T37: Stop $159.95. POET controversy. Core AI thesis intact."},
      {"id":38,"ticker":"CEG","dateIn":"2026-05-04","dateOut":"2026-05-07","qty":14,"entry":308.072,"exit":314.77,"ccy":"USD","pnlUSD":93.77,"note":"T38: Stop raised then triggered. +$93.77. Q1 May 11. Thesis intact."},
      {"id":39,"ticker":"PYPL","dateIn":"2026-05-08","dateOut":null,"qty":55,"entry":45.64,"exit":null,"ccy":"USD","pnlUSD":null,"note":"T39: Market order S38. Q1 beat EPS $1.34. TPV +11%. Stop $37.50. Next earnings ~Aug 2026. OPEN."}
    ],
    "lastUpdated":"2026-05-09 S39 SCAN. T35+T39 open. 37 closed. 39 total rows."
  },
  "sessionNotes": [
    {"date":"2026-05-07","note":"S37: LMT stop $465->$479.77. RR.L Q1 beat +6.47%, stop $1050->$1149.4p. NOG sold T33 @$25.11 Iran deal noise WTI $93. R3NK sold T34 @EUR53.44. Rebuy GTC EUR52 placed T30. RR.L Q1 beat confirmed."},
    {"date":"2026-05-07","note":"S37 CONT: T35 R3NK EUR52 filled. T36 AMPX @$17.94 pre-earnings gap. T37 MRVL @$160.02 POET controversy. T38 CEG @$314.77 +$93.77. NCH2 cancelled E25. E9 risks identified."},
    {"date":"2026-05-08","note":"S38: TIME_PROTOCOL.md created -- bash clock replaces E1 timezone arithmetic. E1 error self-corrected (stated LSE OPEN at 09:30 UAE). Path bug fixed (jcadb vs James Cadbury). S38 priority actions confirmed: CEG stop cleared, AMPX limit cleared, SNPS above cost. MSFT stop $373->$412.10. SNPS $440->$500.10->$496.76 (weekend risk). T39 PYPL 55sh @$45.64 market fill. UUUU Q1 beat $35.8M. Iran rejected US proposal. CENTCOM strikes Fri. Thesis intact. Daily P&L ~-$380. No screenshots (app upload failure -- Claude.ai side issue)."},
    {"date":"2026-05-09","note":"S39 PRE-OPEN (Saturday). Full scan run. Thesis intact, SI-25 Condition 1 unmet, WTI $95.42 Fri, Brent $101.29. Iran attacked UAE Friday, CENTCOM defensive strikes. No deal signed. Rules framework overhauled: three-tier classification, P20 amended (activates >10% gain), ATH rule consolidated, T26 amended (same-week not same-session). New SIs 69-76 written. Scanning framework established using free tools only (EOD/Alpha free tiers + web_fetch). Upgrade trigger $150K net liquidity. Stop changes confirmed live in IBKR: MSFT $412.10->$403.89, CCJ $114.21->$112.14, IBM $208->$210.08, CODA $10.90->$9.95. Unusual Whales chargeback lodged with ENBD."},
    {"date":"2026-05-09","note":"S39 SCAN SESSION (Saturday continued). 3 full scans completed. 15 new watchlist entries added: DPRO (drone micro-cap, gate May 12), RDW (space/defence Stage 1 $9.90-10.50), TE (US solar gate May 12), LUMN (telecom turnaround Stage 1), JOBY (eVTOL gate FAA TC), ANET (AI networking Stage 1 $130-138), CIFR (AI data centre watch-only gate AWS delivery), NOK (optical networking watch $10.50-11.00), IREN (AI cloud Stage 1 gate $58 hold Mon), ANDURIL (private IPO watch), SOFI (fintech T27 Stage 1 gate PYPL resolved), RCAT (defence drone watch gate FRIP), ONDS (autonomous drone Stage 1 gate $10 reclaim T2 history), ZETA (AI marketing Stage 2 enter $16-17.50 stop $14.50), PATH (agentic automation Stage 2 fast-track enter ~$10.76 stop $9.20). Priority entries Monday: none (markets closed). Priority entries this week: ZETA and PATH are actionable on open."}
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
  const tabs=["positions","gtcs","watch","shorts","eu-energy","minerals","thesis","tracker","notes"];
  const pnlColor=(v)=>v>0?COLORS.green:v<0?COLORS.red:COLORS.textDim;
  const stageColor=(s)=>s?.includes("STAGE 2")?COLORS.green:s?.includes("STAGE 1")?COLORS.accent:s?.includes("IPO")?COLORS.purple:COLORS.yellow;
  return(
    <div style={{background:COLORS.bg,minHeight:"100vh",color:COLORS.text,fontFamily:"monospace",padding:16,maxWidth:1200,margin:"0 auto"}}>
      <style>{`.card{background:${COLORS.card};border:1px solid ${COLORS.border};border-radius:6px;padding:12px}.badge{font-size:10px;padding:2px 6px;border-radius:4px;font-weight:600;display:inline-block}.badge-green{background:rgba(63,185,80,0.15);color:${COLORS.green};border:1px solid rgba(63,185,80,0.3)}.badge-red{background:rgba(248,81,73,0.15);color:${COLORS.red};border:1px solid rgba(248,81,73,0.3)}.badge-amber{background:rgba(210,153,34,0.15);color:${COLORS.yellow};border:1px solid rgba(210,153,34,0.3)}.badge-orange{background:rgba(240,136,62,0.15);color:${COLORS.orange};border:1px solid rgba(240,136,62,0.3)}.badge-grey{background:rgba(139,148,158,0.15);color:${COLORS.textDim};border:1px solid rgba(139,148,158,0.3)}.badge-blue{background:rgba(56,139,253,0.15);color:${COLORS.blue};border:1px solid rgba(56,139,253,0.3)}.badge-purple{background:rgba(163,113,247,0.15);color:${COLORS.purple};border:1px solid rgba(163,113,247,0.3)}.btn{background:${COLORS.card};border:1px solid ${COLORS.border};color:${COLORS.text};padding:6px 12px;border-radius:4px;cursor:pointer;font-family:monospace;font-size:12px}.btn:hover{background:#21262d}.btn-primary{background:rgba(88,166,255,0.15);border-color:rgba(88,166,255,0.4);color:${COLORS.accent}}input{background:${COLORS.card};border:1px solid ${COLORS.border};color:${COLORS.text};padding:8px;border-radius:4px;font-family:monospace;font-size:12px;flex:1}`}</style>
      <div style={{marginBottom:16}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:8}}>
          <div>
            <div style={{fontSize:18,fontWeight:700,color:COLORS.textBright}}>CLAUDE FUND -- JOURNAL v53 S39</div>
            <div style={{fontSize:11,color:COLORS.textDim,marginTop:2}}>Session 39 -- Sat 9 May 2026 | {data.fund.account} | 19 positions | 2 GTCs | 24 watch</div>
          </div>
          <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
            {[{label:"NET LIQ",val:"~$104.8K"},{label:"CASH USD",val:"$36,468",color:COLORS.green},{label:"WATCH",val:"24 names",color:COLORS.accent},{label:"NCH2",val:"MAY 12",color:COLORS.yellow}].map(m=>(
              <div key={m.label} className="card" style={{textAlign:"center",minWidth:80}}>
                <div style={{fontSize:9,color:COLORS.textDim}}>{m.label}</div>
                <div style={{fontSize:14,fontWeight:700,color:m.color||COLORS.textBright,marginTop:2}}>{m.val}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{marginTop:6,padding:"6px 10px",background:"rgba(63,185,80,0.1)",border:"1px solid rgba(63,185,80,0.3)",borderRadius:4,fontSize:11,color:COLORS.green,fontWeight:700}}>
          ✅ S39 SCAN COMPLETE: 15 NEW ENTRIES | PRIORITY: PATH ~$10.76 stop $9.20 | ZETA $16-17.50 stop $14.50
        </div>
        <div style={{marginTop:4,padding:"6px 10px",background:"rgba(210,153,34,0.15)",border:"1px solid rgba(210,153,34,0.4)",borderRadius:4,fontSize:11,color:COLORS.yellow}}>
          S39 MONDAY: NCH2 H1 READ 09:00 UAE | CEG Q1 CHECK SUN AMC | MSFT OPEN WATCH | R3NK IRAN RISK | IREN STABILISE >$58
        </div>
      </div>
      <div style={{display:"flex",gap:4,marginBottom:12,flexWrap:"wrap"}}>
        {tabs.map(t=>(<button key={t} className={`btn ${activeTab===t?"btn-primary":""}`} onClick={()=>setActiveTab(t)} style={{textTransform:"uppercase",fontSize:11}}>{t}</button>))}
      </div>
      {activeTab==="positions"&&(<div style={{display:"flex",flexDirection:"column",gap:6}}>{data.positions?.map((p)=>(<div key={p.ticker} className="card" style={{borderLeft:p.unrealPnL>300?"3px solid "+COLORS.green:p.unrealPnL<-100?"3px solid "+COLORS.red:p.status?.includes("NEW")?"3px solid "+COLORS.blue:undefined}}><div style={{display:"flex",gap:10,alignItems:"center",flexWrap:"wrap",marginBottom:3}}><span style={{fontWeight:700,fontSize:13,color:COLORS.textBright}}>{p.ticker}</span>{p.cur&&<span className="badge badge-grey">{p.cur}</span>}{p.status?.includes("NEW")&&<span className="badge badge-blue">NEW</span>}{p.unrealPnL!==undefined&&<span className={`badge ${p.unrealPnL>50?"badge-green":p.unrealPnL<-50?"badge-red":"badge-amber"}`}>{p.unrealPnL>=0?"+":""}{p.unrealPct?.toFixed(1)}%</span>}<span style={{fontSize:9,color:COLORS.textDim,marginLeft:"auto"}}>Stop: <b style={{color:COLORS.yellow}}>{p.stop||p.stopType||"--"}</b></span></div><div style={{fontSize:10,color:COLORS.accent,marginBottom:2}}>{p.status}</div><div style={{fontSize:9,color:COLORS.textDim}}>{p.note}</div></div>))}</div>)}
      {activeTab==="gtcs"&&(<div style={{display:"flex",flexDirection:"column",gap:6}}>{data.pendingGTCs?.map((g)=>(<div key={g.ticker} className="card" style={{borderLeft:"3px solid "+COLORS.blue}}><div style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap",marginBottom:3}}><span style={{fontWeight:700,fontSize:13,color:COLORS.textBright}}>{g.ticker}</span><span className="badge badge-blue">BUY GTC</span><span style={{fontSize:11,color:COLORS.accent}}>Limit: {g.limit} / Stop: {g.stop}</span><span className={`badge ${g.maxLoss<=200?"badge-green":g.maxLoss<=400?"badge-amber":"badge-red"}`}>Max loss ${g.maxLoss}</span></div><div style={{fontSize:9,color:COLORS.textDim}}>{g.note}</div></div>))}</div>)}
      {activeTab==="watch"&&(
        <div>
          <div style={{fontSize:11,color:COLORS.textDim,marginBottom:8}}>
            {data.watchList?.length} entries | <span style={{color:COLORS.green}}>Stage 2: {data.watchList?.filter(w=>w.status?.includes("STAGE 2")).length}</span> | <span style={{color:COLORS.accent}}>Stage 1: {data.watchList?.filter(w=>w.status?.includes("STAGE 1")).length}</span> | <span style={{color:COLORS.yellow}}>Watch: {data.watchList?.filter(w=>w.status?.startsWith("WATCH")).length}</span> | <span style={{color:COLORS.purple}}>IPO: {data.watchList?.filter(w=>w.status?.includes("IPO")).length}</span>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:6}}>
            {data.watchList?.map((w,i)=>(
              <div key={i} className="card" style={{borderLeft:"3px solid "+stageColor(w.status)}}>
                <div style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap",marginBottom:3}}>
                  <span style={{fontWeight:700,fontSize:13,color:COLORS.textBright}}>{w.ticker}</span>
                  {w.name&&<span style={{fontSize:10,color:COLORS.textDim}}>{w.name}</span>}
                </div>
                <div style={{fontSize:10,color:stageColor(w.status),marginBottom:2,fontWeight:600}}>{w.status}</div>
                <div style={{fontSize:9,fontStyle:"italic",color:COLORS.textBright,marginBottom:3}}>{w.thesis?.substring(0,150)}{w.thesis?.length>150?"...":""}</div>
                {w.entry&&<div style={{fontSize:9,color:COLORS.green,marginBottom:1}}>Entry: {w.entry?.substring(0,100)}</div>}
                {w.gate&&<div style={{fontSize:9,color:COLORS.textDim}}>Gate: {w.gate?.substring(0,100)}</div>}
              </div>
            ))}
          </div>
        </div>
      )}
      {activeTab==="shorts"&&(<div>{data.shortWatchlist?.map((s,i)=>(<div key={i} className="card" style={{marginBottom:6,borderLeft:"3px solid "+(s.status?.includes("DORMANT")?COLORS.textDim:COLORS.purple)}}><div style={{display:"flex",gap:8,alignItems:"center",marginBottom:3}}><span style={{fontWeight:700,color:COLORS.textBright}}>{s.ticker}</span>{s.status?.includes("DORMANT")?<span className="badge badge-grey">DORMANT</span>:<span className="badge badge-purple">WATCH</span>}</div><div style={{fontSize:10,color:COLORS.textDim,marginBottom:2}}>{s.thesis}</div><div style={{fontSize:9,color:COLORS.yellow}}>Trigger: {s.trigger}</div></div>))}</div>)}
      {activeTab==="eu-energy"&&(<div><div className="card" style={{marginBottom:8,borderLeft:"4px solid "+COLORS.yellow}}><div style={{fontWeight:700,color:COLORS.yellow,fontSize:13,marginBottom:4}}>{data.euEnergyTransition?.title}</div><div style={{fontSize:10,color:COLORS.green,marginBottom:4,fontWeight:600}}>{data.euEnergyTransition?.concentrationCeiling}</div><div style={{padding:"8px",background:"rgba(248,81,73,0.1)",borderRadius:4,fontSize:11,color:COLORS.red,fontWeight:700}}>{data.euEnergyTransition?.gateNote}</div></div></div>)}
      {activeTab==="minerals"&&(<div><div className="card" style={{marginBottom:8,borderLeft:"4px solid "+COLORS.green}}><div style={{fontWeight:700,color:COLORS.green,fontSize:13,marginBottom:4}}>{data.criticalMineralsThesis?.title}</div><div style={{padding:"6px 10px",background:"rgba(248,81,73,0.1)",borderRadius:4,fontSize:11,color:COLORS.red,fontWeight:600}}>CEILING: {data.criticalMineralsThesis?.concentrationCeiling}</div></div>{data.criticalMineralsThesis?.candidates?.map((c,i)=>(<div key={i} className="card" style={{marginBottom:6,borderLeft:"3px solid "+(c.status?.includes("HELD")?"#3fb950":"#388bfd")}}><div style={{display:"flex",gap:8,alignItems:"center",marginBottom:3}}><span style={{fontWeight:700,color:COLORS.textBright}}>{c.ticker}</span><span className={`badge ${c.status?.includes("HELD")?"badge-green":"badge-blue"}`}>{c.status}</span></div><div style={{fontSize:10,color:COLORS.textDim}}>{c.thesis}</div>{c.stop&&<div style={{fontSize:9,color:COLORS.yellow,marginTop:2}}>Stop: {c.stop}</div>}</div>))}</div>)}
      {activeTab==="thesis"&&(<div><div className="card" style={{marginBottom:8,borderLeft:"4px solid "+COLORS.orange}}><div style={{fontWeight:700,color:COLORS.orange,fontSize:13,marginBottom:4}}>{data.thesis.title}</div><div style={{fontSize:11,lineHeight:1.8,marginBottom:6}}>{data.thesis.summary}</div><div style={{padding:"6px 10px",background:"rgba(210,153,34,0.1)",borderRadius:4,fontSize:11,color:COLORS.yellow}}>{data.thesis.SI25Status}</div></div>{data.thesis.keyDates?.map((d,i)=>(<div key={i} className="card" style={{marginBottom:4,borderLeft:"3px solid "+(d.priority==="CRITICAL"?COLORS.red:d.priority==="HIGH"?COLORS.yellow:COLORS.textDim)}}><div style={{display:"flex",gap:8,alignItems:"flex-start"}}><span style={{fontSize:10,fontWeight:600,minWidth:180,color:COLORS.textBright}}>{d.date}</span><span style={{fontSize:10,color:COLORS.textDim,flex:1}}>{d.event}</span><span className={`badge ${d.priority==="CRITICAL"?"badge-red":d.priority==="HIGH"?"badge-amber":"badge-grey"}`}>{d.priority}</span></div></div>))}</div>)}
      {activeTab==="tracker"&&(<div><div style={{fontSize:12,fontWeight:600,color:COLORS.accent,marginBottom:6}}>TRADE TRACKER -- 37 CLOSED + 2 OPEN (T35 R3NK, T39 PYPL) | 39 rows</div>{data.tradeTracker?.closedTrades?.slice().reverse().map((t)=>(<div key={t.id} className="card" style={{marginBottom:3,borderLeft:"3px solid "+(t.pnlUSD===null?COLORS.blue:t.pnlUSD>0?COLORS.green:COLORS.red)}}><div style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap"}}><span style={{fontSize:9,color:COLORS.textDim}}>#{t.id}</span><span style={{fontWeight:600,fontSize:12}}>{t.ticker}</span><span style={{fontSize:9,color:COLORS.textDim}}>{t.dateOut||"OPEN"}</span>{t.pnlUSD!==null?<span style={{fontWeight:700,color:pnlColor(t.pnlUSD)}}>{t.pnlUSD>0?"+$":"-$"}{Math.abs(t.pnlUSD).toFixed(0)}</span>:<span className="badge badge-blue">OPEN</span>}<span className="badge badge-grey">{t.ccy}</span></div><div style={{fontSize:9,color:COLORS.textDim,marginTop:1}}>{t.note}</div></div>))}</div>)}
      {activeTab==="notes"&&(<div><div style={{display:"flex",gap:8,marginBottom:10}}><input value={newNote} onChange={e=>setNewNote(e.target.value)} placeholder="Add note..." onKeyDown={e=>e.key==="Enter"&&addNote()}/><button className="btn btn-primary" onClick={addNote}>ADD</button></div>{(data.sessionNotes||[]).slice().reverse().map((n,i)=>(<div key={i} className="card" style={{marginBottom:6}}><div style={{fontSize:10,color:COLORS.textDim,marginBottom:3}}>{n.date}</div><div style={{fontSize:11,lineHeight:1.7}}>{n.note}</div></div>))}</div>)}
      <div style={{marginTop:16,paddingTop:10,borderTop:"1px solid "+COLORS.border,display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:6,alignItems:"center"}}>
        <span style={{fontSize:10,color:COLORS.textDim}}>v53 S39 | Sat 9 May 2026 | 19 pos | 24 watch | Iran thesis INTACT | Scan session complete</span>
        <div style={{display:"flex",gap:4,flexWrap:"wrap"}}>
          <span className="badge badge-green">PATH $9.20 stop ✅</span>
          <span className="badge badge-green">ZETA $14.50 stop ✅</span>
          <span className="badge badge-amber">NCH2 MAY 12</span>
          <span className="badge badge-amber">IREN MON OPEN</span>
        </div>
      </div>
    </div>
  );
}
