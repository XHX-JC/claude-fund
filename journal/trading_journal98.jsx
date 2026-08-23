// trading_journal98.jsx
// RETROSPECTIVE RECONSTRUCTION — written S89, 8 July 2026, covering S87 (Monday 6 July)
// and S88 (Tuesday 7 July), both full NYSE trading sessions whose journals were never
// written at close. This is E30 twice in a row on the same underlying failure the fund's
// own close protocol exists to prevent. Reconstructed from FUND_SESSION_STATE.md (updated
// S88), DECISION_REGISTER.md (updated S88), LESSONS_LEARNED.md (P67/P68, dated S87), and
// TRACK_RECORD.csv, cross-checked against IBKR screenshots taken S89 open. Not a substitute
// for a same-session journal — reconstructed after the fact, so intraday texture (exact
// timestamps, in-session reasoning as it happened) is thinner than a live-written entry.
// Flagged as reconstruction, not disguised as original, per James's explicit instruction.

export const journal98 = {
  session: "S87 + S88 (merged retrospective reconstruction)",
  date: "2026-07-06 / 2026-07-07",
  reconstructedOn: "2026-07-08 (S89 session)",
  reconstructionNote:
    "Both sessions were full NYSE trading days. Neither journal was written at close. " +
    "DECISION_REGISTER.md, FUND_SESSION_STATE.md, LESSONS_LEARNED.md, and TRACK_RECORD.csv " +
    "were all updated correctly at S88 close (7 July) — only the journal file itself was " +
    "skipped, both days running. This file reconstructs the trade and decision record from " +
    "those sources so the backbone has an entry for these two sessions, but it is not a " +
    "live account and should be read as such.",
  precedingJournal: "trading_journal97.jsx (S86W, 4 July 2026)",

  // ============================================================
  // S87 — MONDAY 6 JULY 2026 — full trading session, NYSE open
  // ============================================================
  s87: {
    headline:
      "OKLO gap-down whipsaw stopped the position out within minutes of the open, then " +
      "reversed hard and V-reversed to $52+ within 7 minutes same session, essentially " +
      "breakeven on the round trip. CRM filled on a favourable gap, better than the limit " +
      "submitted. A broad market-wide recovery rally ran through the AI-infrastructure/semis " +
      "complex that had sold off 1-2 July. A genuine process failure on a scanner name (SHAZ) " +
      "surfaced mid-session and was logged as P67.",

    tradesExecuted: [
      {
        ticker: "OKLO",
        action: "STOPPED OUT then re-evaluated",
        detail:
          "200sh position stopped out $50.483 (stop was $50.49) at the opening-bell whipsaw, " +
          "thin post-weekend liquidity, NOT a news-driven stop — no news confirmed either " +
          "direction at the open. Price V-reversed to $52+ within 7 minutes same session. " +
          "Realized P&L +$38.60 (+0.40%) per TRACK_RECORD.csv, essentially breakeven. " +
          "Reclassified Strategy B to A this session: Groves is a subsidiary milestone, not " +
          "the core Aurora-INL thesis, and the prior stop was sized for a short-duration " +
          "catalyst trade that this position was never actually structured as. Fresh resting " +
          "BUY order placed: 100sh limit $50.00 / stop $47.80 GTC, unfilled at S87 close.",
      },
      {
        ticker: "CRM",
        action: "FILLED",
        detail:
          "50sh filled pre-open at $163.15, better than the $165.00 limit submitted S86. " +
          "Stage 2 was completed S86: trailing P/E 18.9x, forward 12.0x, cheap for double-" +
          "digit RPO growth. $25B ASR funded by new debt not cash — flagged leverage risk. " +
          "Stop $149.80 GTC. R/R at actual fill 4.1:1 to $228, 5.9:1 to $255 target. " +
          "Conviction 55-60% at entry, medium not high.",
      },
    ],

    lessons: [
      {
        code: "P67",
        title: "Scanner-wide scrutiny must apply equally, not proportionally to what's already the focus",
        detail:
          "A premarket top-movers screenshot containing LRCX, SHAZ, IREN, EZJ among others " +
          "was reviewed the same morning a full V1 table was being built on LRCX specifically. " +
          "LRCX got complete Stage 2 treatment; SHAZ, in the same screenshot, got a single " +
          "dismissive clause with zero verification. SHAZ ran from roughly 8% to over 20% " +
          "intraday the same session. James flagged the inconsistency directly. No capital " +
          "lost (James confirmed he likely would not have entered SHAZ regardless) — cost " +
          "was informational, not financial, but the process gap is real: attention was " +
          "allocated to whichever name was already the session's focus, not applied uniformly " +
          "across a shared scan.",
      },
      {
        code: "P68",
        title: "Strategy B requires a 3-4 day reaction window, not merely a dated event months out",
        detail:
          "OKLO, KTOS, CEG, and ONDS were all carried as Strategy B despite three of the four " +
          "being entered as value/thematic positions with an earnings date used loosely as " +
          "justification. James corrected directly: 'StratB are short term trades based " +
          "around a particular short term rerating catalyst... buying low is stratA and " +
          "buying over a month away from earnings is not StratB.' Applying rigid one-" +
          "directional Strategy B stop discipline to what were actually Strategy A thematic " +
          "holds meant OKLO's stop sat 0.4% above cost, well inside the name's own single-" +
          "session volatility, and triggered on ordinary opening-bell noise. Register " +
          "corrected S87: OKLO, KTOS, CEG, ONDS all reclassified to A. Fund held zero live " +
          "Strategy B positions as of S87 close.",
      },
    ],

    marketContext:
      "Broad recovery rally through the AI-infrastructure/semis complex that had sold off " +
      "1-2 July, per LESSONS_LEARNED.md S87 session-character note.",
  },

  // ============================================================
  // S88 — TUESDAY 7 JULY 2026 — full trading session, NYSE open
  // ============================================================
  s88: {
    headline:
      "Two positions stopped out same session, both from the S87 Strategy B-to-A " +
      "reclassification batch: MP and KTOS. OKLO's fresh resting buy filled. MBOT entered " +
      "via full Stage 2, unfilled at close. GTBIF order rejected — no IBKR OTC/Pink Sheets " +
      "permission on the account, a risk the register had already named before the order " +
      "was placed.",

    tradesExecuted: [
      {
        ticker: "MP",
        action: "STOPPED OUT",
        detail:
          "100sh, entry $54.011 (S85), exit $49.946 (stop was $49.94, filled essentially at " +
          "level). Realized P&L per TRACK_RECORD.csv needed — not yet broken out individually " +
          "in the source files at time of this reconstruction, flagged as an open item below. " +
          "First of two stop-outs from the S87 reclassification batch, fired the very next " +
          "live session after being moved from Strategy B to A.",
      },
      {
        ticker: "KTOS",
        action: "STOPPED OUT",
        detail:
          "200sh, entry $50.006 (S84), exit $50.836 (stop was $50.92, $0.084 slippage below " +
          "trigger). Second of two same-batch stop-outs. Open question carried forward: " +
          "whether the S87 reclassification correctly sized stops for the four names it " +
          "touched, or underestimated near-term volatility — bears directly on CEG and ONDS, " +
          "the other two names in the same batch, which did NOT stop out this session.",
      },
      {
        ticker: "OKLO",
        action: "FILLED",
        detail:
          "100sh filled $50.011 via the resting order placed S87. Stop shows $44.51 in the " +
          "live Orders tab — $3.29 wider than the $47.80 James specified at placement. " +
          "Confirmed James's deliberate override same session: 'six month low, stop is " +
          "placed for a reason, log and move on' — not an error. Real max loss now ~$549, " +
          "not the ~$220 the original figure implied — above standard tier without a three-" +
          "point declaration ever being invoked, logged not re-argued.",
      },
      {
        ticker: "MBOT",
        action: "ENTERED (unfilled)",
        detail:
          "Full Stage 2 completed: entry zone $1.80-1.90 (three-times-tested support), " +
          "target bands $2.00-2.06 near-term / $2.50-3.00 base case tied to the Aug earnings " +
          "print. Buy limit 3,000sh $1.85 GTC, stop $1.70 GTC per the confirmed order " +
          "screenshot at entry. 0/3,000 filled at S88 close, resting below market. Company " +
          "balance sheet genuinely strong ($72.5M cash+securities vs ~$3.7M/quarter burn), " +
          "real regulatory exclusivity (only FDA-cleared single-use endovascular robot).",
      },
      {
        ticker: "GTBIF",
        action: "REJECTED",
        detail:
          "Order shows CANCELLED at S88 close — no IBKR OTC/Pink Sheets trading permission " +
          "on the account. The $1,500 no-stop conviction-thesis position James approved was " +
          "never established. This risk was flagged before order entry and was not resolved " +
          "before submission. James needs to enable OTC Markets trading permission in IBKR " +
          "Account Management before resubmission.",
      },
      {
        ticker: "FISV",
        action: "NO ACTION — mandatory review flagged",
        detail:
          "+6% premarket on confirmed Reuters/WSJ reporting of a STAR debit-network " +
          "divestiture exploration (JPMorgan, BofA, Wells Fargo, Principal Financial named), " +
          "early-stage, company did not confirm. Stop left unchanged at $47.93 per standing " +
          "instruction.",
      },
    ],

    otherWorkThisSession: [
      "ISRG S88 follow-up completed: SureForm 30 recall materiality resolved (Class I, " +
        "narrow to gray reloads only, immaterial per analysts). PASS on pre-earnings entry " +
        "stands at the higher $439.89 price; GO on standing thesis unchanged.",
      "RKLB fresh Stage 1 post-Iridium acquisition ($8bn EV, $3.6bn bridge loan, collared " +
        "exchange ratio $67.50-$112.50). PASS on Stage 2 — no stop can isolate thesis " +
        "collapse from routine RKLB volatility given an 18-month regulatory close window. " +
        "Two alerts set instead: $80.03 (technical) and $67.54 (collar-floor logic).",
      "SOUN reviewed a fourth session running, PASS unchanged. LivePerson merger collar " +
        "detail found ($7-12 VWAP band) — corrected mid-session: the floor caps further " +
        "dilution rather than compounding it.",
      "WULF and AVAV both rechecked intraday against fresh data, both held prior verdicts " +
        "with sharper reasoning.",
      "AUTONOMOUS_DEFENCE_SUPPLY_CHAIN_THESIS.md extended with a verified drone battery/" +
        "component section (AMPX confirmed stronger than an external report presented at " +
        "the time — this finding was later found S89 to conflict with the standing S86 " +
        "Manatee Research PASS on the same name, never reconciled between S88 and S89; " +
        "reconciled S89, see that session's record). KULR confirmed with an unflagged " +
        "Bitcoin-treasury complication. Seven other names logged unverified.",
    ],

    marketContext:
      "Full trading session, NYSE open. No macro regime change — GREEN, 6/24 composite " +
      "carried from the 2 July recalculation, no fresh full repull run this session per " +
      "the source files.",
  },

  // ============================================================
  // OPEN ITEMS — carried into S89 and beyond, per FUND_SESSION_STATE.md
  // ============================================================
  openItemsCarriedForward: [
    "MP and KTOS stop-outs — genuine scrutiny needed on whether the S87 reclassification " +
      "correctly sized stops for the four names it touched. Not resolved as of this " +
      "reconstruction; still an open question bearing on CEG and ONDS.",
    "MBOT stop discrepancy ($1.70 confirmed at placement vs $1.66 shown live S88 close) — " +
      "RESOLVED S88 per FUND_SESSION_STATE.md: James confirmed deliberate placement at " +
      "recent lows, not an error.",
    "GTBIF — IBKR OTC trading permission gap, unresolved as of this reconstruction.",
    "AIRJ stop discrepancy ($4.50 register vs $4.38 live) — RESOLVED S88: James confirmed " +
      "$4.38 directly, register corrected, closed after three sessions unconfirmed.",
    "Realized P&L split for MP/KTOS not yet individually broken out in TRACK_RECORD.csv " +
      "at the time of this reconstruction — flagged as a data gap below, not fabricated.",
  ],

  // ============================================================
  // PROTOCOL FAILURE — why this file didn't exist until now
  // ============================================================
  protocolFailureNote:
    "Two consecutive session closes (S87, S88) completed DECISION_REGISTER.md, " +
    "FUND_SESSION_STATE.md, LESSONS_LEARNED.md, and TRACK_RECORD.csv updates correctly, " +
    "but skipped Step 3 (determine next journal number) and Step 4 (write the journal file) " +
    "of SESSION_CLOSE_PROTOCOL.md entirely, both sessions running. See James's session-open " +
    "message S89 for the explicit instruction to reconstruct this, and the separate protocol " +
    "gap analysis delivered same session for why this happened and what changes as a result.",
};

export default journal98;
