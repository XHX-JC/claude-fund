// TRADING JOURNAL S83 — Tuesday 30 June 2026
// File: trading_journal92.jsx
// Session close: ~16:00 UAE
// Character: Live session. MSFT entered via stock after options-ticket execution confusion (PUT vs CALL mixup,
// James pulled back from options entirely citing comfort level — correct call). LCII speculative rumor trade,
// round trip same day, confirmed real (PATK $8.1B merger). CAPR confirmed stopped out from S82 same-day hit.
// KRMN deferred to post-July 27 capitulation watch, GTC cancelled. FAC P42 reassessed — conditions not met.
// AIRJ +17% day on Prime system unveiling, stop raised. New permanent lesson P62 written (early-investor
// discount-basis overhang screen), prompted by James reviewing newly-built TRACK_RECORD.csv and naming SPCX
// as the forward example. Full historical TRACK_RECORD.csv built from broker statement (95 closed round trips,
// realised P/L -$9,619.12 pre-S83). Cowork setup prompt drafted as separate research/prep layer.

const journalS83 = {

  session: "S83",
  date: "Tuesday 30 June 2026",
  closeTime: "~16:00 UAE",
  marketStatus: "NYSE ACTIVE — session running",
  nextSession: "S84 — Wednesday 1 July 2026",
  nextJournal: "trading_journal93.jsx",

  processNotes: {
    dropboxProtocol: "DIRECT WRITE CONFIRMED via filesystem MCP.",
    newInfrastructure: "TRACK_RECORD.csv created this session at James's request — condensed trade ledger, separate from journal/LESSONS_LEARNED, updated at every entry/exit per new TRACK_RECORD_PROTOCOL.md (routines/). Backfilled from IBKR activity statement (U24936508_20260101_20260629.csv): 95 closed round trips reconciled fill-by-fill, all 9 then-open positions validated exactly against live IBKR. Pre-S83 realised P/L on closed stock trades: -$9,619.12, 44.2% win rate (stock-only, excludes unrealised/dividends/commissions netted separately). Two dominant losses: FAC three-leg IPO day (-$7,579.38) and ABVX three round trips (-$1,419.69). Wired into SESSION_OPEN_PROTOCOL (mandatory read) and SESSION_CLOSE_PROTOCOL (Step 2C reconciliation) as permanent infrastructure.",
    newLesson: "P62 — Early-Investor Discount-Basis Overhang Screen written to LESSONS_LEARNED.md. Generalises T74/P42 (both written reactively after FAC losses) into a mandatory PRE-ENTRY Stage 1 check on any new candidate: does an early-investor/PIPE/founder cohort hold shares at a deep discount basis with no binding lockup or an already-lapsed one. SPCX named as the live forward example — do not enter until any operative lockup expires AND a T74-pattern capitulation/volume-dry-up signal confirms distribution exhausted.",
    executionIncident: "MSFT options spread (2x 380/450 bull call) attempted but never transmitted — order ticket twice produced the wrong contract (450 CALL shown as Buy when Sell was needed; then 380 PUT shown instead of CALL). James correctly cancelled both times and stated he did not have enough comfort with options mechanics to proceed safely. Pivoted to plain stock entry instead: 50sh limit $360 GTC, paired stop, adjusted twice on James's instruction to $345 (max loss $750, fits standard sizing tier). This was the right call — a trade not understood well enough to execute confidently is not a trade that should be forced through.",
  },

  ibkrReconciliation: {
    nlvOpen: "$93,962.33",
    nlvClose: "$94,668.10",
    sessionChange: "+$705.77",
    cashUSD: "$43,416.65",
    cashEUR: "-EUR19,339.91",
    cashGBP: "GBP2,117.11",
    positionsHeld: 9,
    gtcPendingOrders: "ASTS (buy+stop), RHM T2 (buy+stop), MSFT (buy+stop) — 6 resting orders across 3 pairs",
    fillsToday: 3,
  },

  positionChanges: [
    {
      ticker: "CAPR",
      action: "CONFIRMED STOPPED OUT",
      detail: "Position absent from IBKR at S83 open. Stop fired same-day June 29 (S82) at $23.491, 189sh, pierced the $23.50 stop on continuation selling. Realised -$570.85, within the pre-planned $567 max loss. Confirmed via cash delta (+$4,469 matching 189 × $23.50) and trades pull. No action — already closed entering this session.",
    },
    {
      ticker: "LCII",
      action: "FILLED then CLOSED same session",
      shares: 100,
      fillPrice: "Buy $99.05 (13:30 UTC), Sell $99.67 market (13:36 UTC)",
      notes: "Speculative entry on an unverified US-investor network tip about takeover rumours — no public corroboration found at time of entry, explicitly flagged as a rumour trade not a sourced one. Disciplined sizing throughout: $500 max loss, $10K capital, DAY order (not GTC), so no overnight exposure on an unverified basis. James sold immediately on the actual announcement. Deal confirmed real same session: Patrick Industries and LCI Industries entered a definitive $8.1B all-stock merger, 1.2440 PATK shares per LCII share, Patrick 52%/LCI 48%, closing H1 2027. Realised +$59.77. Stock continued to an intraday high near $103 before fading back below James's exit by session end — exit timing held up well in hindsight, not premature. Orphaned stop (100sh STP $95 GTC, nothing left to protect) flagged immediately and confirmed cancelled by James same session.",
    },
    {
      ticker: "MSFT",
      action: "ORDER PLACED, unfilled",
      shares: 50,
      orderDetail: "Buy Limit $360 GTC (order 1215513877), paired Sell Stop GTC, adjusted twice — $340 initially, raised to $342 (fitting $900 high-conviction sizing exactly per register's own tiers), then James lowered to $345 ('see if it closes') for $750 max loss, tighter than required.",
      notes: "Stock ran to $372 intraday, well clear of the $360 limit — unfilled all session. Crash stress test run: PASS with caveat, defined risk caps the downside but the name will likely move WITH a macro reset given this month's -20% sentiment-driven beta, not against it. Concentration flag raised: MSFT + LEU + OKLO together represent 37.3% of NAV if MSFT fills, all leaning on the same AI-infrastructure macro thesis holding up.",
    },
  ],

  stopModifications: [
    {
      ticker: "AIRJ",
      orderId: "1807166367",
      oldStop: "$3.85",
      newStop: "$4.38",
      rationale: "AirJoule unveiled its full-scale Prime atmospheric water generation system at the Newark, DE facility, press release dated today with Delaware Governor Matt Meyer and Senator Chris Coons in attendance. Stock ran as much as +17% intraday (IBKR live: $4.60 to $5.38). Genuine dated catalyst tying into the same AI-data-center theme as LEU/OKLO, not just trend continuation — confirmed via primary GlobeNewswire release. James raised the stop partway, explicitly deferring a further raise to breakeven ($4.96) until the post-news range settles, avoiding a same-day whipsaw exit.",
    },
    {
      ticker: "OKLO",
      orderId: "2043807781",
      oldStop: "$46.00",
      newStop: "$50.04 (UNCONFIRMED)",
      rationale: "Discrepancy discovered during S83 final checks — IBKR shows $50.04, was $46.00 at session open, no change discussed in this session's conversation. Flagged directly to James at the portfolio screenshot review; not yet confirmed as deliberate. Logged as fact with explicit unconfirmed flag in DECISION_REGISTER for S84 open verification.",
    },
  ],

  orderModifications: [
    {
      ticker: "KRMN",
      change: "GTC buy (150sh $46.00) and paired stop ($40.00) CANCELLED — confirmed gone from IBKR orders list mid-session.",
      rationale: "Stock ran +7.88% to $51.13 on sector sympathy (AVAV earnings reaction + Blue Origin/New Glenn return-to-flight read-through for supplier Karman), not company-specific news. James initially asked for a Stage 1 reassessment with intent to raise the resting buy to a new dip level. Stage 1 surfaced live distribution risk matching the P62 pattern: TCFIII PE sponsor sold 14M shares at $61 in a May 29 secondary, $22M trailing-90-day insider selling, a real Q1 earnings miss May 12 (-10% same day). Recommended against chasing today's pop into a new limit. James then proposed waiting until after the July 26/27 mandatory lock-up exit/expiry to see if forced selling creates a real entry window — correctly inverts the problem: wait for distribution to happen and exhaust (T74 pattern) rather than guess whether today's strength holds. Q2 earnings Aug 3-6 falls inside the same window, extending the watch period to July 27-Aug 6. GTC cancelled so it can't fire by accident into the wrong window before then.",
    },
  ],

  decisionsReached: [
    {
      name: "FAC — P42 reassessment",
      decision: "DEFER. Decision gate July 6 unchanged, but entry zone must be redrawn against wherever price actually bases, not the stale $10.60-10.80 figure.",
      detail: "James asked for Stage 2 on FAC; correctly identified this would mean either fabricating post-catalyst stability data or skipping P42's own conditions — declined and ran a P42 reassessment instead. Conditions 3 (PIPE exhaustion, tested base) and 4 (price stable 2+ sessions) both fail: stock down 33.5% week, 34% month, no tested floor, currently $10.14, below the original entry zone. James separately asked for a PIPE composition breakdown distinguishing strategic/partner holders from speculative ones. Pulled from SEC filings: Mercedes-Benz (8,669,995sh, 8.1-9.5%) and Stellantis (8,669,995sh, 9.5%) arose from conversion of legacy preferred/warrants/notes, staged lock-up up to one year, board seats, genuinely low near-term sell risk — confirms James's 'partner not speculator' framing. The Gatemore/GVP Climate/WAVE Equity early-VC cohort (James specifically referenced Gatemore) also checks out as a 2021-vintage growth-equity backer under the same merger lock-up, not a flip-oriented PIPE account. The real unidentified wildcard: founders Siyu Huang + Yingchao Yu jointly hold ~20% (21.6M shares), staggered lock-up but with registration rights enabling resale once a resale registration statement is declared effective — status unconfirmed, needs checking via EDGAR before July 6. Original $10.07-basis PIPE investors (the ones P42 was originally built around) not identified by name in this pass — flagged as the next research task.",
    },
    {
      name: "ABVX — historical gap closed",
      decision: "Confirmed via past-conversation search, written into permanent files for the first time.",
      detail: "James referenced a prior ABVX loss 'getting caught on the wrong side of initial results' that was not found anywhere in current LESSONS_LEARNED.md or DECISION_REGISTER.md — a real documentation gap, not a memory error on James's part. Found via conversation_search: three round trips April-June, net -$1,419.69. The dominant loss (-$1,807.68) came despite genuinely strong June 1 Phase 3 ABTECT maintenance data (both doses hit primary and secondary endpoints) — the stock fell 23.8% the same day anyway, driven by a concurrent ADS dilution/resale registration event landing on top of the catalyst. This is now the documented origin case referenced by P62.",
    },
    {
      name: "Cowork parallel project — setup prompt drafted",
      decision: "Standalone prep-layer prompt built and delivered as a file, not yet executed by James.",
      detail: "Checked Cowork's current finance capabilities (Feb 2026 plugin launch: financial analysis/equity research/private equity/IB/wealth management plugins, FactSet/MSCI MCP connectors; May 2026: ten ready-to-run finance agent templates; Dispatch feature for assigning background tasks, though confirmed to still require the desktop session running, not a true server-side background process). Recommended two-layer structure: this project stays the protocol-governed decision layer, a new Cowork project becomes a research/prep layer with write access scoped only to research\\ and intelligence\\ in Dropbox, explicitly barred from state\\/routines\\/journal\\ and from any IBKR-adjacent action. For genuine scheduled background alerts independent of desktop state, flagged Claude Code Remote's trigger system as the more precise tool, separate product, not yet activated.",
    },
    {
      name: "LunarCrush connector",
      decision: "Tested, found non-functional on current plan, James will cancel.",
      detail: "Three endpoint types tested (topic, search, list) — all returned 'Subscription required' uniformly. Confirmed live/connected but functionally empty on the free tier. Separately, James was shown what appeared to be marketing copy plus a directory link prompting reconnection — flagged as a social-engineering pattern and declined to act on it without James confirming the source directly. James will disconnect via Settings rather than reconnect through the link.",
    },
  ],

  decisionsNotExecuted: [
    {
      name: "ASTS re-entry",
      decision: "DEFERRED explicitly by James",
      reason: "Running 35% above the $64.50 GTC (now $87.26). James chose to defer and watch rather than chase or revise the entry, consistent with the fund's no-chase discipline already applied to KRMN the same session.",
    },
    {
      name: "UAMY re-entry",
      decision: "Deadline passed, unmet",
      reason: "G7 bilateral deadline was today. No binding agreement confirmed by close — only a general G7 critical-minerals declaration and a stated US intent to present a bilateral proposal, not sign one. Stock held below the $7.00 re-entry threshold all session. Deferred to next trigger: Q2 earnings July 31 or a new bilateral date.",
    },
  ],

  positionProximityFlags: {
    fisv: "WARNING — buffer tightened to ~1.8% from 4.3% at session open. Already on warning status before today.",
    agi: "WARNING — back below the $30.50 alert level set this morning, buffer ~3.3%.",
    oklo: "Stop discrepancy, not a proximity issue — see stopModifications.",
  },

  portfolioSummary: {
    heldPositions: ["ZS", "HNR1", "OKLO", "FISV", "RHM", "AGI", "AIRJ", "XSG", "LEU"],
    dayMovers: {
      best: "AIRJ +17% (Prime system unveiling). RHM +3.62% to ~EUR1,000 (best day in book). ZS +1.95%.",
      worst: "AGI -1.01%. FISV -2.19%. OKLO roughly flat to slightly down despite stop discrepancy.",
    },
    gtcPending: ["ASTS $64.50 (50sh, deferred by James, not chasing)", "RHM T2 EUR880 (6sh, running away)", "MSFT $360 (50sh, unfilled, running away)"],
    strategyB: ["OKLO (active — hard exit July 7, stop discrepancy unconfirmed)", "LEU (active — DOE decision still pending as of close)"],
  },

  criticalS84Actions: [
    "1. LEU — DOE HALEU decision may have landed after this session closed (announcements typically land 17:00-21:00 UAE, inside tonight's NYSE session). Check first action S84 open. If no announcement found: exit Wednesday open per the extended decision tree.",
    "2. OKLO — CONFIRM whether the $50.04 stop (vs $46.00 at S83 open) was deliberate. Unresolved at S83 close.",
    "3. FAC — pull the Schedule of Selling Securityholders from FAC's resale S-1 on EDGAR before July 6 to identify the original $10.07-basis PIPE investors by name, and check whether the founders' resale registration statement has been declared effective.",
    "4. KRMN — no live exposure, no resting orders. Watch July 27-Aug 6 window specifically for a T74-pattern capitulation candle, not the calendar date alone.",
    "5. AIRJ — raise stop to breakeven ($4.96) once the post-Prime-news range visibly settles, per James's stated intent.",
    "6. MSFT — still unfilled at $360 vs ~$372 current. No action needed unless it pulls back into range.",
    "7. ASTS — deferred by James. No action unless a genuine pullback approaches $64.50.",
    "8. P62 is now a permanent always-scanned lesson (added to SESSION_OPEN_PROTOCOL's evergreen list) — apply at Stage 1 on any new candidate with a plausible early-investor discount-basis cohort.",
    "9. TRACK_RECORD.csv — confirm it gets checked/updated at every entry and exit going forward, not just at session close (Step 2C is the safety net, not the primary mechanism).",
  ],

  notes: [
    "MSFT execution sequence is worth remembering on its own: two failed order tickets (wrong side, wrong contract type) followed by James explicitly saying he didn't have enough comfort to proceed on an instrument he didn't fully understand, and stopping rather than pushing through. That's the correct response to confusion mid-trade, not a failure — better evaluated as good process than as a missed options trade.",
    "LCII is a genuinely uncomfortable case worth sitting with rather than filing away cleanly: an unverified network rumour turned out to be entirely correct, on the same day it was acted on. The sizing discipline (DAY order, $500 max loss) meant the process was sound regardless of the outcome — but it's a real data point that this specific risk (acting on unverified tips) did not get punished this time, and shouldn't be read as validation that the underlying practice is fine going forward.",
    "P62 is the most structurally important addition this session — it converts two reactive, after-the-loss lessons (T74, P42) into a forward screen applied before any capital is at risk. Tested same-session on KRMN (correctly flagged the PE distribution risk before a chase) and on ONDS (informational, no position) — the pattern held up in live use immediately after being written, not just in theory.",
    "AVAV's 30%+ beat-driven move and the subsequent earnings-calendar scan (RKLB, ASTS, RCAT, KTOS) is worth revisiting going into August — several names in the same basket report within days of each other, and AVAV's number was unusually large, not the typical bar for a re-rate.",
    "The TRACK_RECORD.csv build surfaced a number worth sitting with honestly: -$9,619.12 realised on 95 closed stock trades pre-S83, a 44.2% win rate. Two single events (FAC, ABVX) account for the bulk of it. Worth keeping in view as the fund's actual historical baseline, not the narrative version of it.",
  ],

};

export default journalS83;
