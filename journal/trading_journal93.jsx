// trading_journal93.jsx
// Session S84 — Wednesday 1 July 2026
// Written at close, 18:43 UAE, NYSE mid-session
// James: "This has been the best session to date."

export const journal93 = {
  session: "S84",
  date: "2026-07-01",
  closeTimeUAE: "18:43",
  marketStatusAtClose: "NYSE OPEN (mid-session close, per standing rule)",

  headline:
    "Three new entries (ONDS, KTOS, CEG), two GTC re-entries (KRMN, CODA) after resolving stale overhangs, one structural retirement of a hard-exit rule (OKLO) that no longer matched the underlying catalyst, and one live sector rotation identified and traded into (CEG) rather than reacted to.",

  netLiquidity: 97500,
  dailyPnL: 1607.80,
  dailyPnLPercent: 1.68,
  unrealizedPnL: 5660.84,

  entriesToday: [
    {
      ticker: "ONDS",
      shares: 600,
      price: 8.256,
      strategy: "B",
      thesis:
        "Pre-earnings positioning. Q2 orders already $110M+ against a $66.5M consensus revenue estimate, FY26 guidance already raised to $390M+. Depressed price colliding with accelerating real order data, the specific setup that produced AVAV's move.",
      stop: 7.00,
      target: "Tiered on beat quality, not a single number.",
      catalyst: "Q2 earnings, informed estimate Aug 12-17, unconfirmed",
      note:
        "James flagged $6.00 as a pre-earnings entry consideration at S83 close. Stock never retraced that far. Entered on the standing probability thesis at $8.256 instead, per the E32 principle: do not wait for a specific price fantasy when the thesis itself is already actionable.",
    },
    {
      ticker: "KTOS",
      shares: 200,
      price: 50.00,
      strategy: "B",
      thesis:
        "FY26 guidance already raised to $1.70-1.76B ahead of the print itself. JPMorgan upgraded to Overweight in the same window, citing a new $446.8M Space Force OTA and continuing Valkyrie ramp. Stock had already round-tripped from $58.52 to a sharp break under $50 before this entry, not a chase.",
      stop: 46.00,
      target: "82 conservative (JPMorgan's own, trimmed for share weakness not thesis), 96-112 upside cluster",
      catalyst: "Q2 earnings, estimate ~Aug 6, unconfirmed",
      liveRisk:
        "$85-105M guided FY26 cash burn against a trailing P/E near 371x. A margin question, not a revenue question. Insiders net sold $48M trailing 12 months, flagged not vetoed.",
    },
    {
      ticker: "CEG",
      shares: 25,
      price: 240.041,
      strategy: "B",
      thesis:
        "Entered at a fresh 1-year low, below every prior marked low on the annual chart. Cause identified as sector rotation (10yr yield backing up on a JOLTS beat, repricing long-duration AI-adjacent names), not company deterioration. Q1 beat, a 15-year Walmart nuclear PPA, and a New York unit relicensing filing through 2049 all landed during the same six-month price decline, a genuine and unresolved divergence between fundamentals and price.",
      stop: 220.00,
      target: 360,
      rr: "6:1",
      conviction: "68%",
      catalyst: "Q2 earnings Aug 6",
      structuralNote:
        "The fund's own crash shopping list had a $200-220 zone for this name, gated on SPX breaking its 200-day moving average. That condition has not occurred. This entry did not use that zone or that gate. It was built as a standalone, fresh Stage 2 on the actual mechanism driving the decline. The register was corrected to reflect this distinction rather than silently borrowing a mismatched framework.",
    },
  ],

  reEntries: [
    {
      ticker: "KRMN",
      status: "GTC placed, unfilled at close",
      limit: 50.00,
      stop: 46.00,
      whatChanged:
        "The fund had deferred re-entry pending a PE sponsor lock-up assumed to open July 27-August 27. Direct research this session found TCFIII Spaceco SPV LP (Trive Capital) fully exited via a May 28-29 secondary offering and LP distribution, with new tiered lock-ups (360/720 days) landing on the newly distributed shares, dated from May 2026, meaning roughly May 2027 and May 2028, not this summer. The overhang the fund was waiting on had already occurred, already crashed the stock to $42.80 in early June, and already been absorbed into a month-long base. The gating condition was stale, corrected, and retired.",
    },
    {
      ticker: "CODA",
      status: "GTC placed, unfilled at close",
      limit: 9.50,
      stop: 8.75,
      whatChanged:
        "DAVD Navy approval and a NANO PIPE integration order confirmed as real, not narrative. Both the June 12 pre-earnings drop and the June 15 earnings-day drop were run down to specific causes (pre-earnings de-risking, a genuine revenue miss, Middle East-linked project delays), no leak or hidden deterioration found in either session. Entry placed inside the $9.55-9.80 favourable-fill zone identified before the open.",
    },
  ],

  structuralCorrections: [
    {
      item: "OKLO hard exit rule",
      before:
        "Register carried an unconditional 'hard exit July 7 close regardless' rule, written at entry with no stated rationale beyond calendar mechanics.",
      after:
        "Retired. Verified the rule was a house discipline pattern applied without OKLO-specific reasoning, and that the July 4 Groves criticality event belongs to Atomic Alchemy's Texas isotope test reactor, not the core Aurora-INL commercial reactor the fund's long-term thesis actually depends on. Replaced with a tightened stop near cost and the existing gap-up-sell-at-open rule, removing the forced same-day exit for a flat or modestly positive outcome.",
      lesson:
        "A standing rule inherited from a different position's structure (CAPR, KRMN) was applied to OKLO without re-deriving whether it fit. It didn't. Verify origin before defending or extending a rule, every time.",
    },
    {
      item: "ZS exit framework",
      before: "Guidance-dependent exit tied to the September earnings print.",
      after:
        "James overrode this mid-session after stating he no longer views ZS as a long-term holding. Replaced with a pure trailing stop, no fixed target, run to $200 or stop out. Logged as his override, not re-litigated.",
    },
    {
      item: "LEU stop tracking",
      before: "Flagged every session against a stale prior reference level.",
      after:
        "James is actively hand-trailing this stop upward. Instruction given mid-session: log the live level as fact each check, only flag a downward move. Applied for the remainder of S84 and going forward.",
    },
  ],

  flaggedNotConfirmed: [
    {
      item: "MSFT position and orders",
      detail:
        "Present in the S83 close register (50sh Buy Limit $360 GTC, paired Stop $345 GTC, unfilled). Absent entirely from both the S84 positions and orders screenshots. Not removed from the register, flagged for James to confirm at S85 open whether this was a deliberate cancellation or an unexplained drop.",
    },
    {
      item: "OKLO stop reversion",
      detail:
        "Raised to $50.50 mid-session specifically to lock a floor above the $50.28 average cost. S84 close screenshot shows $49.77, a reversion below cost. Logged as the current fact per James's instruction to take stops as given, but flagged distinctly since it reverses a specific decision made hours earlier in the same session, not an ongoing trailing adjustment.",
    },
    {
      item: "AIRJ stop reversion",
      detail:
        "Raised to $4.95 breakeven mid-session. S84 close screenshot shows $4.50. Same category of flag as OKLO above.",
    },
  ],

  newWatchlistItems: [
    {
      ticker: "MP",
      status: "Stage 2 COMPLETE, GO, not yet ordered",
      detail:
        "Q1 beat cleanly, record NdPr output, a real 15% DoD equity stake with a 10-year offtake and price floor already in place. CEO sold $26M+ into strength across April-June, weighed not ignored. Stop $52, target $76-82 using a recent-dated analyst cluster rather than a stale $16 outlier still dragging aggregator averages down. R/R 5:1, conviction 68%.",
    },
    {
      ticker: "WYY",
      status: "Structural watch only, not price-actionable",
      detail:
        "Won a $3.1B DHS re-compete June 25, more than double the prior contract ceiling, removing a risk that was 77-79% of revenue. Spiked to $32.85 then fully round-tripped to the pre-spike settle price the same session and has gone nowhere since. No base formed, Altman Z-score in distress territory, insiders selling not buying. The contract is real, the market hasn't rewarded it yet, and there's a legitimate balance sheet reason it might not.",
    },
  ],

  correctedFalsePremises: [
    {
      claim: "UAMY is connected to Trump family rare earth investments",
      finding:
        "Checked directly. No connection found to UAMY or antimony anywhere. The actual pattern (Trump Jr./1789 Capital in Vulcan Elements, Commerce Secretary Lutnick's son's firm placing USA Rare Earth's offering, direct government equity stakes in MP Materials, Lithium Americas, Trilogy Metals) lands on four specific named companies, none of which is UAMY. UAMY's re-rating case rests on execution and real contracts, not political proximity. Conviction held at 55%, not rounded up to the 70% asked for, given a confirmed 50%+ Q1 revenue miss against consensus that directly threatens the FY26 guidance the thesis depends on.",
    },
    {
      claim: "CODA had a duplicate stop-loss order on 600 shares",
      finding:
        "Apparent from a screenshot's row ordering. Resolved on closer reading: the two stop rows belonged to two different positions (CODA at $8.75, ONDS at $7.00) rendered adjacently, not one position with two live stops. No actual duplication existed.",
    },
  ],

  macroContext: {
    headline:
      "Broad rotation out of AI infrastructure and semiconductors into defense, enterprise software, and value, confirmed by breadth not inferred.",
    losers: "NBIS -12.25%, GLW -9.42%, LRCX -6.66%, POWL -6.56%, MU -5.47%, AMAT -5.30%, VRT -4.66%, STX -4.61%, CRDO -4.28%",
    winners: "RHM +4.86%, META +6.60%, PLTR +6.19%, MSTR +6.45%, CRM +4.51%",
    mechanism:
      "10yr yield 4.44-4.46%, climbing on a JOLTS beat and rising Fed hike odds, repricing long-duration growth names against a VIX that closed at just 16.45 the prior session, still calm. A rates and rotation story, not a volatility panic.",
    marketHealthCheckStatus:
      "Confirmed stale, last full recalculation June 16, still showing AMBER 12-13/24 when today's actual VIX and 10yr inputs would score GREEN under the file's own methodology. Full recalculation deferred to S85 at James's direction.",
  },

  processNotes: [
    "IBKR connector down for a second consecutive session despite a disconnect/reconnect attempt mid-session. Every position and order tonight came from screenshots, not autonomous pulls. This is now a pattern, not a one-off, and needs escalation beyond repeating the same reconnect step if it persists into S85.",
    "Wrong-tool error recurred twice this session (str_replace against the sandbox instead of filesystem:edit_file against Dropbox), the exact P52 failure mode already documented in LESSONS_LEARNED.md. Caught both times before anything was lost, but the recurrence itself is the finding worth sitting with, not the catches.",
    "Session open discipline broke down early: the mandatory journal read was skipped at the actual start of session and only completed nine hours in, after James asked directly why files hadn't been read at open. Everything reconstructed afterward was accurate, but the sequence was wrong, and the only reason it surfaced was persistent, direct challenge from James rather than the protocol catching itself.",
  ],

  jamesQuote:
    "This has been the best session to date, results off the back of trial and error and deep research and checks.",

  closingAssessment:
    "The strongest work today was reactive to challenge, not proactive: the OKLO hard-exit rule, the KRMN lock-up timeline, the UAMY Trump-family question, and the AI/semiconductor rotation read all improved specifically because James pushed on an answer that wasn't good enough the first time. The weakest moment was the file discipline gap at open, caught only because James asked why. The lesson to carry forward is not that the analysis was good under pressure, it's that the analysis should not have needed pressure to get there the first time.",
};

export default journal93;
