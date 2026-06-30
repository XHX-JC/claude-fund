// TRADING JOURNAL S82 — Monday 29 June 2026
// File: trading_journal91.jsx
// Session close: ~21:30 UAE
// Character: Full active session. Two fills (LEU + CAPR). Stop raises across ZS/FISV/AGI. KRMN order modified.
// Stage 2 BAH complete. GTBIF Stage 1 PASS — DEFERRED September 2026.
// FAC bear case assessed — DEFERRED July 6 decision gate.
// HPE alert $39 set. New protocol T91 (GTC Overhang Pre-Open Check) added.
// DATE NOTE: State file said "S82 Monday 30 June 2026" — corrected to Monday 29 June 2026.
// NYSE: Active session 17:30-00:00 UAE.

const journalS82 = {

  session: "S82",
  date: "Monday 29 June 2026",
  closeTime: "~21:30 UAE",
  marketStatus: "NYSE ACTIVE — session running",
  nextSession: "S83 — Tuesday 30 June 2026",
  nextJournal: "trading_journal92.jsx",

  processNotes: {
    dropboxProtocol: "DIRECT WRITE CONFIRMED via filesystem MCP.",
    dateCorrection: "State file S81 close noted 'Next session: S82 Monday 30 June 2026'. June 30 is a Tuesday. Corrected to Monday 29 June 2026. Cascaded: LEU DOE contract expires Tuesday 30 June (not Monday), UAMY G7 bilateral deadline Tuesday 30 June (not today), DEA hearing started TODAY June 29 as scheduled.",
    newProtocol: "T91 GTC Overhang Pre-Open Check added to SESSION_OPEN_PROTOCOL. Trigger: GTC active near market price + negative news within 48-72h + catalyst >14 days away. Mandatory decision before NYSE open. Applied retroactively: CAPR GTC at $26.50 was $0.05 below Friday close after -12% drop. Should have been reviewed at 08:00 UAE. Cost ~$400 in avoidable slippage.",
  },

  ibkrReconciliation: {
    nlvOpen: "$93,405.93",
    nlvClose: "$93,591.73",
    sessionChange: "+$185.80",
    cashUSD: "$19,634.85",
    cashEUR: "-EUR19,339.92",
    cashGBP: "GBP2,117.11",
    positionsHeld: 10,
    gtcPendingOrders: 15,
    fillsToday: 2,
  },

  positionChanges: [
    {
      ticker: "LEU",
      action: "FILLED",
      shares: 40,
      fillPrice: "$165.00",
      fillTime: "13:23:33 UTC (17:23 UAE) — DRCTEDGE — pre-market open",
      stopPlaced: "$149.91 GTC (order 806304671)",
      costBasis: "$6,600.00",
      maxLoss: "$602 (40 × $15.09)",
      notes: "Filled pre-open. LEU gapped down ~4% from Friday close ~$172 to $165 at open — GTC caught the gap. No new negative news found. Pre-expiry position liquidation by event traders reducing risk ahead of Tuesday DOE contract expiry. Thesis intact. Hold per extended decision tree to Tuesday close.",
    },
    {
      ticker: "CAPR",
      action: "FILLED",
      shares: 189,
      fillPrice: "$26.50",
      fillTime: "13:31:26 UTC (17:31 UAE) — DRCTEDGE — NYSE open",
      stopPlaced: "$23.50 GTC (order 806304698)",
      costBasis: "$5,008.50",
      maxLoss: "$567 (189 × $3.00)",
      notes: "GTC OVERHANG PROTOCOL FAILURE: CAPR filled at $26.50 into continuation selling from Friday -12% AdCom announcement drop. GTC was $0.05 below Friday close. Should have been reviewed at 08:00 UAE pre-session under T91 protocol (added this session). Stock opened lower and filled immediately, then continued to $23.82 intra-session. Stop at $23.50 is $0.32 buffer at session close. Thesis intact — AdCom July 29, PDUFA August 22, no new adverse news. NS Pharma lawsuit acknowledged as post-approval commercial risk only.",
    },
  ],

  stopModifications: [
    {
      ticker: "ZS",
      orderId: "1807166316",
      oldStop: "$114.00",
      newStop: "$124.88",
      rationale: "Raised above cost basis $122.61. Position +$1,221 unrealised (+12.4%). Locks in minimum +$182 gain. All prior exit triggers (senior leadership departure, close below $118 on volume) CLEARED this session — stale. Q4 FY2026 September 8 binary only.",
    },
    {
      ticker: "FISV",
      orderId: "1124369353",
      oldStop: "$43.50/$43.00",
      newStop: "$46.90/$43.00 (confirmed upward from live IBKR screenshot)",
      rationale: "Stop trigger raised. 9.61M share volume spike morning June 27 investigated — no insider selling found. OpenInsider confirms cluster BUY by 4 insiders (Chief Legal Officer + 3 Directors) June 16 at $48-49.57 total $1.07M. Quarterly window dressing/institutional block. Thesis reinforced.",
    },
    {
      ticker: "AGI",
      orderId: "1165625692",
      oldStop: "$29.00/$28.50",
      newStop: "$29.42/$28.50 (confirmed upward from live IBKR screenshot)",
      rationale: "Stop trigger raised. AGI deteriorated during session -3.19% to $30.32. Stop proximity at close: $0.90 buffer = 3.0%. Watch closely S83.",
    },
  ],

  orderModifications: [
    {
      ticker: "KRMN",
      orderId: "1239301989",
      change: "Limit $43.50 → $46.00. Shares 200 → 150. Stop $39.00 → $40.00.",
      rationale: "GTC at $43.50 was $0.13 below 52-week low of $43.63 — would only fill on new 52-week low. Stock recovering to $46 range. Raised to capture entry. Reduced shares to 150 (from 200) to maintain $900 high conviction max loss ceiling at $6 stop width (150 × $6 = $900). Stop raised to $40 (James's stated thesis-collapse level: below $40 drops to low $30s). R/R to $105.60 analyst consensus: 9.9:1.",
      hardExitAdded: "MANDATORY EXIT JULY 26 — PE sponsor TCFIII lock-up window opens July 27. Exit all 150 shares on July 26 regardless of price. Cannot set IBKR date alert — flagged in files instead. Re-entry framework documented post-lock-up conditional on Q2 Aug 3-6 results and price action.",
    },
  ],

  decisionsReached: [
    {
      name: "GTBIF",
      decision: "Stage 1 PASS. DEFERRED. Alert $7.00. Re-engage September 2026.",
      detail: "Stage 1 V1 table completed from primary sources (SEC 8-K Q1 2026, DEA Federal Register, company IR). Current price $7.47 at session time — above $6.00 original plan but within range. DEFERRED because: (1) DEA hearing is a 2-week process, no ALJ outcome for months post-July 15. (2) ALJ recommendation conviction reassessed: 65-72% for recommendation alone (not 80-85% as prior framework stated). Full chain compound probability: 30-38% for 2026 effectiveness. (3) Stock at $7.47 has already moved on Day 1 hearing sentiment — not near fundamental value. Alert $7.00. If triggered before September: run fresh Stage 2. Entry decision: September 2026 as ALJ recommendation window approaches. If stock runs above $9.00 before recommendation, reassess R/R.",
    },
    {
      name: "BAH (Booz Allen Hamilton)",
      decision: "Stage 2 COMPLETE. Entry zone $58-68, optimal $60-65. Stop $55 hard floor. Target $88-95. Entry July 21-22.",
      detail: "BAH not in fund files — prior position undocumented. Stage 2 run from primary sources (SEC 8-K Q4 FY2026 May 22, BAH newsroom, OpenInsider). Stock declined $115 → $62 due to DOGE civilian agency cuts (-23% Civil Q4) and Treasury contract termination post-Littlejohn data breach. National Security segment resilient (+1.6% Q4). Q1 FY2027 earnings July 24 is the catalyst — management guided Q1 as weakest quarter with sequential improvement thereafter. Low expectations bar set. Golden Dome Space Force OTA + Ultra I&C Mission Solutions acquisition ($720M, close September 30) validates national security pivot. 10x forward PE on $6.00-$6.35 EPS guidance. $38B backlog. Analyst consensus $94.50 (+51% upside). R/R at $62/$55/$90: 4:1. Hard floor $55 — no further lowering. HIGH LEVERAGE FLAG: post-Ultra acquisition net leverage ~3.6x — acknowledged. Insider activity neutral (no buying or selling).",
    },
    {
      name: "FAC (Factorial Energy Inc.)",
      decision: "DEFER. Decision gate July 6. Full position or no position.",
      detail: "FAC = Factorial Energy Inc. (Nasdaq: FAC). SPAC merger with Cartesian Growth Corp III completed June 8, 2026. Solid-state battery technology. Backers: In-Q-Tel, Stellantis (9.5%), Mercedes, Hyundai, Kia. $1.3B equity value. Current price ~$10.71. BEAR CASE: (1) QuantumScape parallel — identical SPAC/OEM backer structure, solid-state batteries have failed to scale for decades. (2) Cantor Fitzgerald initiated June 23 at $18 Overweight — ZERO price reaction. Market voted no. (3) FACWW warrants exercisable at $11.50 create structural ceiling. (4) Revenue reality: $1.68M/quarter net income at $1.3B equity = enormous scale-up assumption required. ENTRY STRUCTURE if July 6 positive: 616 shares at $10.71, stop $9.25, max loss $900, target $18, R/R 5:1. DECISION GATE: July 6 (Monday after July 3 quiet period end — NYSE closed July 3). If additional analyst initiations July 3 AND price reacts positively July 6 open: enter at high conviction sizing. If no reaction: PASS permanently. James: full position or no position — confirmed.",
    },
    {
      name: "HPE (Hewlett Packard Enterprise)",
      decision: "Alert $39 set. Stage 2 if triggered. Watchlist retained.",
      detail: "HPE rerated $36 → $60+ driven by Q2 FY2026 blowout (revenue +40% YoY to $10.7B, EPS $0.79 vs $0.53 expected). Full-year EPS guidance raised to $3.35-$3.45 — two years ahead of 2028 targets. AI server backlog $5.9B, enterprise/sovereign focus. Pullback from $60 to $43 driven by supply constraints limiting revenue conversion, AI server margin pressure (12.4% operating margin vs 21.6% networking), and lumpiness concerns. At $43: forward PE 12.6x = cheap for 40% growth company. R/R at $43/$39/$54.40: 2.85:1 — BELOW 3:1 minimum. R/R at $39/$35/$54.40: 3.85:1 ✓. Alert $39. Stage 2 at trigger ahead of Q3 FY2026 earnings September 2026.",
    },
    {
      name: "ZS thesis refresh",
      decision: "All prior exit triggers cleared. Stop raised above cost basis. Q4 September 8 binary.",
      detail: "Original thesis was 'buy low after -30% earnings crash'. Entry $122.61 post-crash from ~$182. Stock crashed on FY2027 ARR growth guidance 16-17% (vs consensus 22%) and sales leadership departure. ZS now +9% at $137.86. All prior exit triggers (senior leadership departure, close below $118 on volume) removed as stale. New framework: hold to Q4 FY2026 earnings September 8. Guide upgraded → hold $180-200. Guide maintained at 16-17% → exit same session (re-rating won't happen without guidance upgrade). Stop raised to $124.88 (above cost basis — position cannot now result in a loss).",
    },
    {
      name: "CAPR risk register update",
      decision: "NS Pharma lawsuit acknowledged. Spec sizing maintained. No extension to PDUFA without separate V1.",
      detail: "Capricor sued NS Pharma (Nippon Shinyaku) April 14, 2026 over US distribution rights. This is a commercial dispute — does not affect FDA review. Does create post-approval commercialization uncertainty. Spec sizing (not standard) is correct. Do NOT extend position to PDUFA August 22 without running separate V1 table post-AdCom (July 29). AdCom July 29 is the only current binary.",
    },
    {
      name: "FISV 9.61M volume spike investigation",
      decision: "Distribution confirmed as institutional, NOT insider. Thesis reinforced.",
      detail: "Large red volume bar morning June 27 at $49 (~70x normal 15m volume). OpenInsider Form 4 check: ZERO insider selling. Four insiders BOUGHT $48-49.57 on June 16 for $1.07M total. Volume spike is quarter-end institutional rebalancing into Burry-driven bid. Stock absorbed 9.61M shares and closed higher. Demand > supply. Thesis intact.",
    },
    {
      name: "T91 — GTC Overhang Pre-Open Check (NEW PROTOCOL)",
      decision: "Protocol added to SESSION_OPEN_PROTOCOL and STRATEGY_FRAMEWORK.",
      detail: "Trigger conditions (ALL THREE): (1) GTC buy order active at or near current market price. (2) Negative news within prior 48-72 hours for that name. (3) Primary catalyst more than 14 days away. When triggered: mandatory decision before NYSE open — KEEP / LOWER to 3-5% below Friday close / CANCEL and reassess on stabilisation. Applied to CAPR today retrospectively: Friday close $26.55, GTC $26.50 ($0.05 below), AdCom 33 days away, -12% Friday drop. Should have lowered to $24.50-25.00 or cancelled. ~$400 avoidable slippage from filling at $26.50 into continuation selling.",
    },
    {
      name: "KRMN PE lock-up — July 26 mandatory exit",
      decision: "Hard exit July 26 documented in all files. IBKR date alert unavailable — file-based flag only.",
      detail: "PE sponsor TCFIII lock-up window opens July 27. Exit all 150 KRMN shares on July 26 regardless of price. Q2 earnings August 3-6 falls inside lock-up window — double risk. Re-entry framework: if stock holds above $40 and Q2 doesn't disappoint, re-enter post-lock-up with fresh Stage 2. If stock drops below $40 on lock-up selling: thesis collapse, do not re-enter. Phone calendar reminder recommended as redundant failsafe.",
    },
    {
      name: "LEU exit decision — extended to Tuesday close",
      decision: "Decision tree extended: hold through Tuesday June 30 close (actual contract expiry day).",
      detail: "State file date error: DOE HALEU contract expires Tuesday June 30 (not Monday as the file assumed). Original decision tree 'exit Tuesday open if no Monday announcement' was designed for expiry-day trade. With correct dates: Monday June 29 is one day before expiry. DOE may announce on either day. Extended exit to Tuesday close — if no announcement by Tuesday close, exit Wednesday open. No new negative news found on LEU. -4.2% day decline is pre-expiry position liquidation by event traders, not thesis signal.",
    },
  ],

  decisionsNotExecuted: [
    {
      name: "MSFT Options",
      decision: "CARRIED TO S83",
      reason: "V1 rows 5 (Form 4 Nadella/Hood 90-day) and 7 (live chart) not completed during session due to session volume. Structure confirmed: 2 × $380/$450 bull call spread June 17 2027, net debit $5,280. MSFT in $350-380 entry zone. S83 first action before NYSE open.",
    },
    {
      name: "UAMY re-entry",
      decision: "G7 bilateral deadline TOMORROW (June 30 Tuesday, not today as state file said)",
      reason: "No bilateral announcement today. UAMY at $6.86-6.96, below $7.00 re-entry threshold. Monitor Tuesday NYSE session. If bilateral confirmed and UAMY holds $7+: Stage 2 complete, mandatory entry decision same session.",
    },
  ],

  screenerResults: {
    cfScreenD: "5 results. TBPH (Theravance Biopharma) notable: $880M cap, RVOL 22,735, -3.12% on volume spike. Likely corporate event. No existing thesis.",
    cfScreenA: "1 result. BLD (TopBuild Corp) -13.71% on 17.2% revenue growth — large gap down. No current thesis.",
    cfScreenB: "5 results. SNDK, LITE, ARM, TSEM, VZ at 52-week lows. ARM on $336B market cap most notable. No existing thesis actioned.",
    cfScreenC: "42 results. Standard quality names. NVDA, WFC, PANW, AXON notable movers. No new fund entries triggered.",
    cfScreenEuUk: "178 results. HNR1 confirmed in screener at EUR239.40 (+0.42%). RHM at EUR1,105.70 (+2.60%). Both healthy.",
    cfScreenEuCont: "97 results. HNR1 EUR239.40 ✓. RHM EUR1,105.70 ✓. No new European names actioned.",
    cfScreenPre: "745 results. ASTS rank 19 at +9.31% $78.10 — CRITICAL. GTC at $64.50 is 21% below current. No chase — GTC remains at $64.50. ASTS news: BlueBirds 8/9/10 fully operational, BlueBirds 11/12/13 August Cape Canaveral launch targeted. Thesis validated, entry not available at current price. RKLB +8.75% notable space sector momentum.",
  },

  positionProximityFlags: {
    capr: "CRITICAL — $23.82 vs stop $23.50. Buffer $0.32 = 1.3%. One bad candle. Thesis intact. Do not move stop.",
    agi: "WARNING — $30.32 vs stop trigger $29.42. Buffer $0.90 = 3.0%. Below 5% threshold. Deteriorating all session.",
    hnr1: "WARNING — EUR240.60 vs stop EUR229.60. Buffer EUR11.00 = 4.6%. Below 5% threshold.",
    fisv: "WARNING — $48.91 vs stop trigger $46.90. Buffer $2.01 = 4.1%. Below 5% threshold.",
  },

  portfolioSummary: {
    heldPositions: ["ZS", "HNR1", "OKLO", "FISV", "RHM", "AGI", "AIRJ", "XSG", "LEU (new)", "CAPR (new)"],
    dayMovers: {
      best: "ZS +4.23% ($137.86). OKLO +3.22% ($51.61). RHM +2.83% (EUR973.40).",
      worst: "CAPR -9.91% ($23.82 — first day fill into continuation). AGI -3.19% ($30.32). LEU -3.90% ($159.07 — pre-expiry selling).",
    },
    unrealisedUSD: "+$523 approximate (ZS +$1,221, OKLO +$309, FISV +$268, AIRJ -$347, LEU -$222, AGI -$102, CAPR -$503)",
    unrealisedEUR: "+EUR884 approximate (HNR1 +EUR636, RHM +EUR248)",
    unrealisedGBP: "-GBP33 (XSG)",
    gtcPending: ["ASTS $64.50 (50sh)", "KRMN $46.00 (150sh — modified)", "RHM T2 EUR880 (6sh)"],
    strategyB: ["OKLO (active — hard exit July 7)", "LEU (active — hold Tuesday close)", "CAPR (active — hard exit July 29 AdCom)"],
  },

  criticalS83Actions: [
    "1. LEU — DOE HALEU announcement watch. Hold through Tuesday June 30 NYSE session (17:30-00:00 UAE Tuesday). Decision tree active. If no announcement by Tuesday close: exit Wednesday open.",
    "2. UAMY — G7 bilateral deadline TODAY (Tuesday June 30). Check DOE/State news at session open. If bilateral confirmed + UAMY holds $7+: mandatory entry decision same session.",
    "3. CAPR — Monitor stop $23.50. $0.32 buffer at S82 close. If stop fires: accept exit, thesis collapse confirmed. Do NOT move stop down.",
    "4. AGI — Stop proximity $0.90 = 3.0%. Monitor closely. If triggers $29.42: position exits at $28.50 limit.",
    "5. MSFT — V1 rows 5 (Form 4 Nadella/Hood) and 7 (live chart) FIRST action before NYSE open S83. Then options order if both complete.",
    "6. OKLO — Hard exit July 7. Groves criticality target July 4 (Saturday). First market reaction Monday July 6. If gap up July 6 open: place sell at open, do not wait for close.",
    "7. KRMN — Hard exit July 26 MANDATORY. PE lock-up window opens July 27.",
    "8. BAH — Entry window July 21-22. Stage 2 complete. Stop $55 hard floor. R/R 4:1.",
    "9. FAC — Decision gate July 6. Full position 616sh or no position. If initiations fire and price reacts: enter. If no reaction: PASS permanently.",
    "10. HPE — Alert $39. Stage 2 on trigger. Q3 earnings September 2026.",
  ],

  notes: [
    "Session date error in state file corrected. All timestamp-sensitive decisions (LEU, UAMY, DEA) recalibrated to correct dates.",
    "T91 protocol gap cost approximately $400 on CAPR. The information to avoid it was available at 08:00 UAE. Protocol now exists to prevent recurrence.",
    "ASTS running 21% above GTC. This is the correct outcome — thesis validated, but entry not available at current price. GTC at $64.50 remains. If stock never returns to $64.50, the trade is missed, not chased.",
    "KRMN PE lock-up framework is clean: enter, take gains before July 26, buy back cheaper post-PE selling if Q2 holds. Second entry could be at $40-42 with R/R multiples of 15:1 to consensus.",
    "BAH Stage 2 is the cleanest new setup in the fund — 10x PE, $38B backlog, national security pivot, defined catalyst July 24, hard floor at $55. Entry July 21-22 is 22 days away.",
    "FISV insider cluster buy on June 16 at $48-49 is the most important new data point of the session. Chief Legal Officer buying $500K worth 11 days before Q2 earnings. They know something.",
    "Cannabis thesis discipline maintained: GTBIF deferred rather than chased at $7.47. The structure works at $7.00, not at the hearing-open premium.",
  ],

};

export default journalS82;
