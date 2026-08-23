// trading_journal99.jsx
// S89 — Wednesday 8 July 2026 — full session
// Written per reordered SESSION_CLOSE_PROTOCOL.md Step 2A (journal first, before
// register/state-file updates), the fix implemented this same session after S87/S88
// both skipped the journal entirely.

export const journal99 = {
  session: "S89",
  date: "2026-07-08",
  headline:
    "Session opened by discovering and fixing a two-session protocol failure (S87/S88 " +
    "journals never written), then ran through a live geopolitical shock: Trump declared " +
    "the Iran ceasefire 'over' mid-session, triggering fresh US strikes, Iranian retaliation " +
    "against Bahrain/Kuwait bases, an oil spike, and a broad chip-complex/defense-sector " +
    "risk-off that whipsawed the entire book. Three separate stop-execution failures " +
    "surfaced during the day (RHM limit missed a gap, ZS stop didn't fire outside RTH, " +
    "BP's stop couldn't be set outside RTH at all — likely a structural ADR limitation). " +
    "Net day: two large discretionary exits (RHM +12.4%, ZS +18%) outweighing several " +
    "smaller stop-outs (AIRJ, AGI, BP scalp), plus five new entries (PDYN, RIVN, AVAV " +
    "filled; UAMY, DUOT-then-cancelled resting). Full StratB sourcing protocol run late " +
    "session at James's explicit instruction, surfacing Castellum (CTM) and reconfirming " +
    "TLRY's DEA hearing as the most time-critical dated catalyst on the board (deadline " +
    "July 15). Close-protocol structural fix implemented: SESSION_CLOSE_PROTOCOL.md and " +
    "SESSION_OPEN_PROTOCOL.md both restructured this session — journal write moved earlier " +
    "in sequence, mandatory completion checklists added to both open and close.",

  protocolFixCompletedThisSession: {
    finding:
      "S87 and S88 both completed DECISION_REGISTER.md/FUND_SESSION_STATE.md/TRACK_RECORD.csv " +
      "updates correctly but skipped the journal entirely, two sessions running.",
    rootCause:
      "Journal write sat last in the old close sequence (Steps 3-4), after every file that " +
      "gates the next session's trading decisions. Nothing forced its completion the way " +
      "DECISION_REGISTER's own read requirement forces that file current.",
    fix:
      "Journal write moved to new Step 2A, immediately after IBKR reconciliation, before " +
      "register/track-record updates — survives even an interrupted close. Mandatory " +
      "completion checklist added as new Step 5, the literal last action of every close, " +
      "requiring explicit YES/NO per file. Matching Step 3F checklist added to " +
      "SESSION_OPEN_PROTOCOL.md for symmetry.",
    retroactiveWork:
      "trading_journal98.jsx written this session, reconstructing S87+S88 from " +
      "FUND_SESSION_STATE.md, DECISION_REGISTER.md, LESSONS_LEARNED.md, and TRACK_RECORD.csv. " +
      "TRACK_RECORD.csv also corrected: MP and KTOS were still showing OPEN despite S88 " +
      "stop-outs, and OKLO's S88 fill had no row at all. All three fixed.",
  },

  macroContext: {
    headline: "Iran ceasefire declared over mid-session, live military escalation",
    detail:
      "Trump, speaking at the NATO summit in Ankara, said the ceasefire is 'over' and " +
      "called continued talks pointless. This followed a fresh US strike wave (CENTCOM: " +
      "80+ targets, including 60+ IRGC boats) in retaliation for Iran striking three " +
      "commercial vessels in the Strait of Hormuz. Iran's IRGC responded with missiles/" +
      "drones at 85 targets across US bases in Bahrain and Kuwait same day. Oil spiked " +
      "(WTI briefly +6%+ intraday per some readings, confirmed at minimum +2.2-2.5% " +
      "earlier in the session), Kospi fell into a bear market (-20% from June high, " +
      "SK Hynix/Samsung-driven), European and US chip names whipsawed hard (premarket " +
      "weakness in Credo/Nebius/Marvell fully reversed to gains by the open — a real " +
      "short-covering squeeze, not two separate stories). Defense stocks did NOT confirm " +
      "the 'war means defense rallies' intuition — RHM, QinetiQ, Renk, Chemring, Cohort, " +
      "and the Korea defense ETF all traded red both premarket and through the regular " +
      "session, a genuine, sustained pattern confirmed independently in Europe (MTU Aero " +
      "Engines, Leonardo) via the afternoon screener review. Gold also failed to confirm " +
      "(GLD/GDX/AEM all red), consistent with yield/dollar strength overpowering safe-haven " +
      "demand — AGI's stop-out fits this pattern.",
    marketHealthReconciliation:
      "Mechanical 12-indicator composite score barely moved (~6-7/24, still GREEN) despite " +
      "the scale of the escalation — oil hadn't crossed the $90 GREEN threshold and VIX " +
      "hadn't spiked. This is treated as a genuine structural blind spot in the mechanical " +
      "score, not a reassurance: a manual geopolitical flag was raised alongside the " +
      "standing margin-debt flag, following the same precedent.",
  },

  tradesExecuted: [
    {
      ticker: "PDYN",
      action: "FILLED",
      detail:
        "1,000sh @ $5.30, stop $4.79 (corrected same session from an initial $4.70 that " +
        "didn't match James's stated $4.80 thesis-failure level). R:R 3.3:1 to T1 $7.00 " +
        "on the corrected stop. Stop trailed intraday as the position ran: $4.79 -> $5.18 " +
        "-> $5.33 by session end, unrealized +$125 at last check. P44 Stage-2-in-zone " +
        "mandatory decision from this morning's session open, resolved ENTER.",
    },
    {
      ticker: "UAMY",
      action: "RESTING, unfilled",
      detail:
        "Buy limit 1,000sh $6.30, stop $5.60 confirmed by James as a genuine thesis-failure " +
        "support level, not a round number. P44 resolved ENTER same morning, pending a fill " +
        "that never came this session. Real positive catalyst in the background: first DLA " +
        "antimony shipments confirmed delivered, cumulative government orders $57.3M.",
    },
    {
      ticker: "DUOT",
      action: "Stage 2 completed, resting order set then cancelled",
      detail:
        "Full V1 GO/NO-GO run, conviction 58%. Real find: $50.4M non-dilutive cash from " +
        "the New APR Energy stake sale, materially softening the balance-sheet concern from " +
        "the prior evening's research. Resting buy $9.20/stop $8.20 set watching for a base " +
        "at the 5-week April-May consolidation. Cancelled later in the session given the " +
        "elevated-volatility regime call (no live GTC entries into chip-complex-adjacent " +
        "names during the Iran escalation).",
    },
    {
      ticker: "MBOT",
      action: "Resting order cancelled",
      detail: "Same elevated-volatility-regime reasoning as DUOT.",
    },
    {
      ticker: "AIP",
      action: "Stage 1 PASS on entry, alert set",
      detail:
        "285-397% trailing-year run, no confirmed base after a 3-leg staircase decline " +
        "from ~$50 peak. Alert set $28.07 against the early-May consolidation level — the " +
        "best-supported candidate on the chart, not a confirmed floor.",
    },
    {
      ticker: "CRML",
      action: "Stage 2 completed, watching, not entered",
      detail:
        "Corrected European-Lithium-deal dilution math (net ~41% ownership dilution to " +
        "non-EUR shareholders, offset partially by ~$219M cash + full Tanbreez " +
        "consolidation). Governance flag: Tony Sage dual-chairmanship, ASIC disclosure " +
        "investigation. July 7 flush to $8.42 low, conviction on 'lows are in' rated only " +
        "35% given the base was under a day old and partly macro-driven, not stock-specific. " +
        "Watching $8.60 hold / $8.42 break as the actual confirmation trigger — neither " +
        "resolved by session end.",
    },
    {
      ticker: "ZS",
      action: "CLOSED — manual exit",
      detail:
        "Sold $144.71. Entry $122.61, +18% realized. Stop had been trailed through the " +
        "day ($138.84 -> $148 -> $145 -> $148 again per James's own adjustments) before " +
        "the discretionary exit. Followed a double-rejection pattern at ~$155 resistance " +
        "(two tests, two failures) flagged as the technical basis for tightening.",
    },
    {
      ticker: "RHM",
      action: "CLOSED — manual exit",
      detail:
        "Sold ~EUR1065.8. Entry EUR947.88, +12.4% realized. Exit reasoning: chart showed " +
        "the same rollover-before-crash pattern that preceded both the May 7 Q1-miss drop " +
        "and the June 24 F126-cancellation crash. Exit order itself (DAY limit 1085.6) " +
        "missed a premarket gap-down and never filled — position was actually closed later, " +
        "manually, near the stated exit price, after roughly 3 hours where the standalone " +
        "stop had already been cancelled on the assumption the limit would handle it. " +
        "Real gap in the mechanics, corrected verbally with James mid-session; he confirmed " +
        "he was manually monitoring throughout, which the record should reflect fairly, " +
        "not as a period of neglect.",
    },
    {
      ticker: "AIRJ",
      action: "STOPPED OUT",
      detail: "Confirmed by James, exact fill price not separately stated this session.",
    },
    {
      ticker: "BP",
      action: "ENTERED then STOPPED OUT same session",
      detail:
        "500sh @ $39.35 premarket, stop $38.00 (below the recent consolidation band, a real " +
        "thesis-relevant level). Exited $38.985 — the oil-driven surge the trade was built " +
        "on never came same-day. Explicitly framed by James as a scalp to offset the day's " +
        "broader losses. Real structural finding: BP's stop could not be set for " +
        "outside-RTH execution at all, likely a foreign-ADR platform limitation distinct " +
        "from ZS's fixable settings issue — flagged as a standing constraint for any future " +
        "ADR position, not resolved this session.",
    },
    {
      ticker: "AGI",
      action: "STOPPED OUT",
      detail:
        "Closed $29.40. Entry $31.007, -5.2% realized (~-$258, 161sh). Consistent with the " +
        "session's broader gold-not-confirming pattern (GLD/GDX/AEM all red on the day " +
        "despite the crisis) rather than a name-specific failure.",
    },
    {
      ticker: "RIVN",
      action: "ENTERED — speculative, small",
      detail:
        "500sh market fill $16.12. Entry followed the exact structural plan built earlier " +
        "in the session: waited for the $15.80-16.00 support zone to hold (offering-price-" +
        "anchored, from the $15.50 dilution offering July 7) rather than chasing the initial " +
        "crash. Stop initially $15.78 per the live order screenshot; end-of-session order " +
        "book showed $15.50 — a change James did not separately confirm verbally, flagged " +
        "for reconciliation next session. R:R against $17.20-18.00 T1 was 3.3-5.7:1 at the " +
        "original stop.",
    },
    {
      ticker: "AVAV",
      action: "ENTERED — speculative, explicitly flagged by James as 'may be wrong'",
      detail:
        "100sh @ $161.01, stop $155.00. Entered on the strength of a genuinely exceptional " +
        "run of confirmed positive news (133% YoY Q4 revenue beat, 24% EPS beat, four " +
        "separate contract wins in a week including two $500M Army IDIQs, July 8 Investor " +
        "Day) — but a material gap was found and corrected mid-session: an active " +
        "securities fraud class action (Norrell v. AeroVironment) tied to the SCAR/BADGER " +
        "Space Force program, plus a genuine financial restatement announced June 22 " +
        "('financial statements... should no longer be relied upon'). Both were public " +
        "before the huge post-earnings rally, so not a fresh shock, but a real second risk " +
        "layer that should have been surfaced before entry, not after. Position moved " +
        "against entry through the session (last seen $158.58, unrealized -$251). James's " +
        "explicit decision at session end: hold overnight at the original $155 stop rather " +
        "than the ~$157 tightening suggested given the new information — his call, logged " +
        "as his override, not re-argued. CRITICAL UNRESOLVED ITEM: the $155 stop is showing " +
        "DAY time-in-force in the order book, not GTC — flagged to James as needing " +
        "immediate correction before this journal was finalized, since a DAY stop will not " +
        "protect the position overnight as intended.",
    },
  ],

  stratBSourcingProtocolFullRun: {
    trigger: "James's explicit instruction: 'run it in full, not partial'",
    findings: [
      "TLRY / cannabis rescheduling: confirmed the DEA hearing is live right now, recessed " +
        "for July 4th, reconvened July 6, must legally conclude by July 15 — the most " +
        "time-critical dated catalyst found this session. Not entered; flagged as the " +
        "top-priority Stage 2 candidate for next session.",
      "Castellum (CTM): sourced via category 15 insider-cluster screener, fetched live. " +
        "Four officers (COO, CFO, General Counsel, President) bought the same day, July 1, " +
        "at $0.61 — a genuine dense cluster. Real defense/cyber/EW business fit, recent Navy " +
        "modernization subcontract win. Real caveats: sub-$1 stock, -$2.8M operating income, " +
        "thin NYSE American liquidity. Logged as a Stage 1 watch-list add, not sized.",
      "WULF: James's own post-mortem ('idea was correct, day was wrong') applied against " +
        "category 9's explicit re-entry discipline — stock was already +11.44% at the open, " +
        "correctly NOT re-chased per the rule against entering on day one of a 7%+ spike.",
      "Category 16 (patent filing acceleration) and category 18 (estimate revision " +
        "momentum) remain hard-blocked, no new workaround found this session.",
    ],
  },

  screenerReviewFindings: {
    trigger: "James ran five live CF-SCREEN queries and shared results for assessment",
    findings: [
      "Gold miner fundamentals-vs-price dislocation: CGAU, IAG, OR all showing 70-121% " +
        "EPS growth yet falling 2.4-3.6% same day, purely on the gold-price/dollar macro, " +
        "not company fundamentals. Verified CGAU directly: Zacks Rank #1, real forward " +
        "estimate revisions upward. Caveat: CGAU already up 220% over the past year, so " +
        "this is a tactical dip in an extended name, not a fresh discovery.",
      "Small-cap oilfield services cluster, distinct from the majors already covered: " +
        "ProFrac (ACDC), Patterson-UTI (PTEN), Liberty Energy (LBRT), W&T Offshore (WTI), " +
        "PBF Energy, Atlas Energy Solutions (AESI), all +5-10% on the day. Genuinely " +
        "undiligenced, flagged as the most differentiated find from the screener batch, " +
        "not yet taken to Stage 1.",
      "European defense-lagging pattern independently confirmed via MTU Aero Engines and " +
        "Leonardo, both showing real EPS growth while falling same day as RHM — corroborates " +
        "the sector-wide (not RHM-specific) read from earlier in the session.",
      "Shell (SHEL) identified as the single best-supported name across the entire session: " +
        "confirmed via primary source (company's own July 7 pre-results update) that Q2 " +
        "trading/optimization results are guided 'significantly higher' than Q1, which " +
        "itself beat consensus by 24% on the same volatility-trading dynamic. Real dated " +
        "catalyst: full Q2 results July 30, new buyback expected same day. Not entered this " +
        "session — the actual position taken in this theme was the smaller BP scalp, which " +
        "did not work.",
    ],
  },

  openItemsCarriedForward: [
    "AVAV stop showing DAY TIF — needs correction to GTC before this is genuinely " +
      "protected overnight, per James's explicit intent to hold the position.",
    "RIVN stop discrepancy: $15.78 (as seen on live chart mid-session) vs $15.50 (end-of-" +
      "session order book) — not separately confirmed verbally, needs reconciliation.",
    "HNR1 stop discrepancy: $239.8 (earlier in session) vs $242.6 (end-of-session order " +
      "book) — same, unconfirmed change.",
    "HNR1's standalone-stop structural risk remains live and by design — the $275.0 DAY " +
      "limit is a deliberate target order per James, will be cancelled if it fills; if it " +
      "doesn't fill today, it simply expires (DAY), leaving the $242.6/$239.8 stop as the " +
      "sole live order overnight, which is the intended, understood state.",
    "BP's outside-RTH stop limitation — confirm whether this is genuinely a foreign-ADR " +
      "platform constraint (as it appears) or fixable, before entering another ADR name " +
      "under time pressure.",
    "TLRY Stage 2 — the DEA hearing deadline (July 15) is now inside a one-week window.",
    "Small-cap oilfield services cluster (ACDC, PTEN, LBRT, WTI, PBF, AESI) — undiligenced, " +
      "flagged as the top candidate for fresh Stage 1 work next session if oil-theme " +
      "exposure is still wanted.",
    "Castellum (CTM) — Stage 1 watch-list add, not yet researched further.",
  ],

  marketContextClose:
    "Daily P&L -$2,176.45 (-2.24%) at last check, Net Liquidity $94.3K, Unrealized P&L " +
    "+$2,118.58 (portfolio-wide, reflecting the RHM/ZS gains still flowing through " +
    "alongside today's new entries). Realized P&L +$925.55 to +$957.98 across the last " +
    "two screenshots, driven by the RHM and ZS exits net of the AIRJ/AGI/BP stop-outs.",
};

export default journal99;
