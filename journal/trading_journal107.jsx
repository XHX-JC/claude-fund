// trading_journal107.jsx
// 20-21 AUGUST 2026 — CONSOLIDATED DUAL SESSION. The 20 August close protocol was not run and
// this journal was never written that day (protocol gap, same failure class as the earlier
// S87/S88 skip). Caught at 21 Aug session open, James's explicit instruction: skip a standalone
// 20 Aug reconstruction, fold both days into one consolidated entry written at 21 Aug close.
// Written directly via filesystem MCP.

processNotes.dropboxProtocol = "DIRECT WRITE CONFIRMED via filesystem MCP.";

const session = {
  dates: "20-21 August 2026",
  type: "CONSOLIDATED DUAL SESSION — 20 Aug reconstructed from same-day DECISION_REGISTER.md entries (the journal file itself was never written), 21 Aug is a full session-open-to-close cycle",
  priorSession: "19 August full session (trading_journal106.jsx)",
};

// ============================================================
// 20 AUGUST 2026
// ============================================================

const macroContext20Aug = `
Continuation of the 19 Aug deterioration. WMT reported pre-market and collapsed hard at the
17:30 UAE/NYSE open — a single large red candle, its slowest comparable-sales growth in six
years. The 19 Aug WMT entry (100sh @ $115) sat directly in the path of that candle. Korea/Japan
and AI-hardware-complex stress from 19 Aug continued to work through positions opened around it
(COHR, CRDO order repricing this session reflects that ongoing pressure).
`;

const positionsExitedThisSession20Aug = [
  {
    ticker: "WMT",
    action: "STOPPED OUT, 100sh @ $115 entry (19 Aug). Exact fill price never confirmed by a Trades-tab screenshot — chart showed the stop taken out directly in the post-open collapse, price then $104.21.",
    detail: `James's own words on the exit: "It was a very tight stop and position, it either
    reclaimed or it did not. It did not." A deliberate, tight risk parameter doing exactly what
    it was set to do, not a process failure. TRACK_RECORD.csv row was left UNRESOLVED at the time
    pending a fill-price screenshot; still unresolved as of this consolidated entry.`,
  },
  {
    ticker: "TGT",
    action: "CLOSED, 75sh @ $156.25, avg cost $149.451, realized approximately +$509",
    detail: `Discretionary exit on declining rebound health/thesis, not the standing $158.04 GTC
    stop firing — exit price sits below that stop, confirming this was proactive, not mechanical.
    Resolves the orphaned overlapping sell-order structure flagged at the 19 Aug close (two
    independent 25sh limit sells sitting alongside a 100sh bracket against what was, by this
    point, a 75sh position) — full order stack confirmed cancelled/flat same session.`,
  },
  {
    ticker: "RARE",
    action: "CLOSED, 100sh @ $26.802, realized approximately +$111",
    detail: `Exit landed inside the raised $26.00-26.50 stop zone set following the GENGLYCOS
    approval catalyst. Clean, thesis-consistent exit.`,
  },
  {
    ticker: "IONQ",
    action: "CLOSED, 100sh @ $41.91, realized approximately +$414",
    detail: `No documented reasoning was on file for several days after this exit. Resolved 21
    Aug: James confirmed the stop was deliberately raised to force the exit while the position
    was bleeding out slowly — sector/company thesis intact, not a fit for a long-term hold given
    current macro and a many-months timeline to the payoff. Correct, deliberate exit.`,
  },
  {
    ticker: "DE",
    action: "Same-day scalp, 25sh bought $594.2408 / sold $594.01, realized approximately -$8.50",
    detail: `New name, no prior underwriting, logged per the standing mechanical-trade process
    rule rather than full Stage 1/2.`,
  },
];

const newPositionsThisSession20Aug = [
  {
    ticker: "LITE",
    action: "ENTERED, 10sh @ $852.92, protective stop $842.60 GTC",
    detail: `Genuine discretionary early entry, below the session's own documented $860-880
    re-engage condition. Not flagged as wrong, flagged as a real gap between the trigger that was
    written down and the entry actually taken. This one worked out well (see 21 Aug close).`,
  },
];

const orderChangesThisSession20Aug = `
COHR: live resting order repriced, stop/limit moved $294.10/$293.50 -> $290.80/$290.10,
protective stop moved $289.00 -> $284.00. Logged per the standing rule (mechanical checks and
deliberate re-pricing get logged, not queried). This specific order was later cancelled outright
before it could fill and replaced 21 Aug at a fresh, higher level ($297.10/$296.40) — see 21 Aug.
CRDO: this session's resting order ($239.90/$239.25) expired unfilled. Status moved from ORDER
LIVE to WATCHING, re-engage condition unchanged.
WMT (separate from the 19 Aug position above): two same-day 200sh rebound-capture round trips in
the $104-106 range, net flat by close.
`;

const openItemsFrom20Aug = [
  "WMT 19 Aug entry exit price — never confirmed by a Trades-tab screenshot, TRACK_RECORD.csv left unresolved",
  "IONQ missing thesis documentation — RESOLVED 21 Aug, deliberate stop-forced exit, logged",
];

// ============================================================
// 21 AUGUST 2026
// ============================================================

const macroContext21Aug = `
Session opened against an external Market Fragility Alert (James-supplied, score 8.0/10,
action-change classification), independently verified against primary sources: SPX close 20 Aug
7,642-7,655 across sources (-0.5% to -0.9%), Dow -1.0 to -1.3% (WMT the largest single drag,
-8 to -9%, worst since 2022), oil ~$87-88, VIX 16.01 (+7.5% same session). Treasury's larger-
buyback signal failed to hold even one session — long yields resumed rising same day. Full
MARKET_HEALTH_CHECK.md recalculation run on James's instruction, correcting an initially
misattributed baseline (the file's own 19 Aug entry, AMBER 9/24, was missed on first read and
briefly misdescribed as superseding a stale 14 July 11/24 instead) — corrected composite score
is 12/24, AMBER, near the RED boundary (14), driven by SPX flipping below its 50d MA, VIX
velocity flipping to a genuine same-day spike, and 10yr yield/trend both reading adverse. Credit
(HY spreads ~270bp) stayed flat and calm throughout — this remains a duration/term-premium and
equity-technical story, not a credit event. CAPE and market breadth indicators were carried
forward, not freshly sourced, and flagged as a real (not manufactured) data gap.
`;

const researchCompletedThisSession21Aug = `
AVAV/KTOS/ONDS Stage 1 run per James's instruction. AVAV: PASS, real fundamental deterioration
(FY26 guidance now calls for the company's first-ever net loss, driven by an $89M goodwill
impairment and the BADGER/SCAR stop-work order), unresolved/expanding securities litigation,
forward P/E still 53-59x despite the stock down ~44% YTD — WATCHING only. KTOS: WATCHING,
fundamentals genuinely strong (Q2 revenue +30.5% YoY, book-to-bill 1.3x) but valuation rich
(P/E 348x) and the whole drone complex was hit by the Trump drone-tariff selloff mid-session —
re-entered later this same session on the pullback (see below). ONDS: WATCHING, most speculative
of the three (net income -247% YoY, serial acquirer, largest single-name volatility of the
group) — also entered later this same session (see below).
Analyst watch (five-name batch) run properly this session after a correction: an earlier pass
wrongly filtered out fresh names for not already being on the fund's radar, which is backwards —
the whole point of the check is discovery. Re-run surfaced MU (Malik/Citi $1,150 vs Arcuri/UBS
$1,625, a genuine $475 analyst disagreement) and CFG (Horowitz/Citi's named favorite regional
bank pick, PT raised $50->$58) as worth Stage 1. James's standing macro-fit instruction this
session: prioritize names that fare well in the current regime over story quality alone, be
careful with AI-capex-linked names given massive swings (MU and SNDK liked but treated
cautiously for this reason).
CFG Stage 1/2 run against James's own chart. Stage 1: PASS — real OBV-confirmed uptrend May
through mid-Aug, a genuine ~8.7% pullback since that is itself OBV-confirmed (real distribution,
not a low-volume gap), no CFG-specific negative catalyst found (Q2 earnings were fine, stock
flat immediately after reporting). One correction logged: the $58 Horowitz price target cited a
day earlier was already stale, price had been trading above it for weeks. Stage 2: NOT
CONFIRMED — OBV was still making fresh lows as of the most recent candle with no higher-low
print yet, fails the fund's own standing re-engage test. Crash stress test run per AMBER
protocol: honest read is that CFG would likely underperform the index in a genuine risk-off move
(regional-bank credit-cost sensitivity), a real limitation the repricing-tailwind thesis doesn't
fully offset.
`;

const newPositionsThisSession21Aug = [
  {
    ticker: "APP",
    action: "Original 30sh position STOPPED OUT at $299.425, realized approximately -$469. RE-ENTERED same session, 50sh @ $303.00, very tight stop $301.91 GTC.",
    detail: `James's own framing: rebounded, then faded, stopped out, then bought back into the
    later rebound with deliberately tight risk. Position size on the re-entry (50sh) is larger
    than the original 30sh, with materially tighter protection relative to entry price.`,
  },
  {
    ticker: "KTOS",
    action: "RE-ENTERED, 100sh @ $57.56 (stop-limit fill), stop $56.94 GTC, target $62.50 GTC",
    detail: `Re-entry on the tariff-selloff pullback flagged as the right kind of setup during
    the earlier Stage 1 pass rather than chasing the prior run. R/R at entry approximately 8:1
    against the stated target, wide enough that the target should be treated as aspirational —
    trade clears the fund's floor easily even on a far more conservative level. HELD at close,
    small unrealized loss (-$10/-0.2%), one of "a couple that worked and are held" per James.`,
  },
  {
    ticker: "ONDS",
    action: "ENTERED, 500sh @ $8.6595 (stop-limit fill), stop $8.47 GTC",
    detail: `Entered following the same-session Stage 1 WATCHING call — a live, in-session
    decision to act on the pullback rather than wait further. NO PROFIT TARGET is attached to
    this order — flagged, same gap pattern as AVEX. HELD at close, small unrealized gain
    (+$18/+0.4%).`,
  },
  {
    ticker: "SPAI",
    action: "ENTERED, 1,000sh @ $5.30 (limit fill), stop $5.15 GTC",
    detail: `NEW NAME, not discussed or Stage 1/2'd in this session's conversation before the
    fill appeared in the account. Safe Pro Group Inc — micro-cap ($108M market cap), drone/AI
    threat-detection and protective-equipment maker riding the same Pentagon-domestic-drone-
    funding theme that moved the rest of the complex this week. Real financial red flags found
    on same-day research: FY2025 revenue fell 72% YoY to $606,681, losses widened 92.8% YoY to
    $14.32M. A real near-term catalyst exists (Innovation Day, 25 Aug, four days out), but this
    is a story/momentum microcap on essentially no revenue, not a fundamentals-supported entry.
    Position sized at roughly 5.9% of net liquidity. NO PROFIT TARGET attached, same gap as
    ONDS/AVEX. Flagged for a one-line confirmation from James, same treatment as the earlier
    IONQ gap — not urgent given the position is currently flat/marginally positive, but this is
    the least-documented position in the book right now and should not be left that way.`,
  },
];

const positionsExitedThisSession21Aug = [
  {
    ticker: "LRCX",
    action: "Round trip: BOUGHT 30sh @ $314.00, SOLD 30sh @ $310.78, realized approximately -$99",
    detail: `One of several rebound-format resting orders that filled, then faded same session —
    matches James's own read of the day ("many stocks rebounded well, then faded"). Order had
    been flagged pre-open as sitting slightly below where the market was already trading;
    triggered on the open, did not hold.`,
  },
  {
    ticker: "COHR",
    action: "Round trip: BOUGHT 50sh @ $295.76, SOLD 50sh @ $295.8805, realized approximately +$6 (near breakeven)",
    detail: `Same rebound-then-fade pattern as LRCX and BJ. Order was repriced from the earlier
    cancelled 20 Aug level to a fresh, higher entry ($297.10/$296.40) this session; triggered,
    faded almost immediately, stopped out for a marginal gain.`,
  },
  {
    ticker: "BJ",
    action: "Round trip: BOUGHT 100sh @ $93.70, SOLD 100sh @ $93.74, realized approximately +$4 (near breakeven)",
    detail: `Same rebound-then-fade pattern. R/R at entry had been calculated at 3.7:1 against a
    $100 target; the position never got the chance to work toward it, stopped near flat instead.`,
  },
  {
    ticker: "LITE",
    action: "STOPPED OUT (profit-taking trail), 10sh sold @ $897.36, realized approximately +$443",
    detail: `The 20 Aug discretionary early entry ($852.92) paid off cleanly. Stop was actively
    trailed upward through the rally (raised to $859.48 on 20 Aug per the standing rule, then
    further to $897.37 before triggering) — correct, disciplined profit capture on a position
    that was flagged at entry as ahead of its own documented trigger. One of "a couple that
    worked" per James's own close-of-day summary.`,
  },
];

const orderStatusEndOfSession21Aug = `
WMT re-entry bracket (trigger $104.55/cap $104.90, stop $103.25, target $110.00): left in place
unchanged on James's explicit instruction, despite sitting more than 10% below the current market
price ($116.29) after WMT's full round-trip recovery from the 20 Aug crash. Not a live setup as
currently priced; James's call to leave it given the market open was under an hour away and
prices could move.
AVEX: two resting orders reviewed, one cancelled per James's standing instruction (the breakout
leg, stop-limit $19.05/$19.20). The dip-buy leg (limit $18.10, stop $17.50) remains live,
unfilled at close, still with NO PROFIT TARGET attached — flagged twice this session, unresolved.
FAC: unrealized position continued to deteriorate intraday, from -4.1% at session open to -8.5%
at close ($4.58 last, sell-stop still resting 0/600 @ $4.05/$4.14, unchanged). Remains the
weakest name in the book on every axis.
XSG: unchanged, -5.2% unrealized, no stop, per the standing binary-thesis framework confirmed
21 Aug (tech/rollout failure is the only question that matters, price action is not tracked
tactically).
`;

const processNotesThisSession21Aug = `
Two real errors made and corrected in real time this session, logged plainly rather than buried:
(1) the MARKET_HEALTH_CHECK.md recalculation initially claimed to supersede a stale 14 July
11/24 composite that had, in fact, already been updated to 9/24 on 19 August — a fuller read of
the file's own recent history was missed on the first pass (tail read plus keyword grep landed
on old content, the intervening entries were in context but not surfaced). Corrected same
session before the file was left in a contradictory state. (2) the analyst-watch check was run
in a way that filtered out a fresh name (MRVL) for not already touching the existing book — the
opposite of the check's actual purpose, which is discovery of new candidates. Corrected on
James's direct instruction, re-run properly, surfaced MU and CFG as genuine leads. A new standing
rule was also added this session, James's explicit instruction: live stop changes found during
reconciliation are logged as fact by default, not flagged as open questions pending confirmation
— only genuine risk patterns (orphaned/naked-short risk, a stop below thesis-invalidation level,
inconsistency with a standing instruction) get raised as live concerns going forward. A second
standing rule was added: every watchlist name gets scanned each session open with a short
confirmation paragraph per name, whether or not anything new is found.
`;

export const journal107 = {
  session,
  day20August: {
    macroContext: macroContext20Aug,
    positionsExited: positionsExitedThisSession20Aug,
    newPositions: newPositionsThisSession20Aug,
    orderChanges: orderChangesThisSession20Aug,
    openItems: openItemsFrom20Aug,
  },
  day21August: {
    macroContext: macroContext21Aug,
    researchCompleted: researchCompletedThisSession21Aug,
    newPositions: newPositionsThisSession21Aug,
    positionsExited: positionsExitedThisSession21Aug,
    orderStatusEndOfSession: orderStatusEndOfSession21Aug,
    processNotes: processNotesThisSession21Aug,
  },
  closingAccountState21Aug: {
    netLiquidity: "90.3K",
    dailyPnL: "+140.48 (0.16%)",
    unrealizedPnL: "+1,610.33",
    realizedPnLToday: "-120.53",
    cashUSD: "29,005",
    positionsHeld: ["AZN", "PDYN", "ONDS", "KTOS", "SPAI", "APP", "XSG", "FAC"],
  },
  openItemsIntoNextSession: [
    "SPAI — no documented thesis existed before the fill, needs a one-line confirmation from James (real financial deterioration found on same-day research: revenue -72% YoY, losses +92.8% YoY)",
    "ONDS and AVEX (surviving leg) both still carry no profit target — same gap, now three occurrences today (AVEX, ONDS, SPAI)",
    "WMT re-entry bracket left unchanged, over 10% below current market — needs a decision once market conditions settle, not urgent",
    "CFG — Stage 2 not confirmed, needs OBV to stop making fresh lows and a genuine higher low before re-engage; send a fresh chart when that happens",
    "MU — logged as a Stage 1 candidate, not yet run, James's call given the stated AI-capex caution",
    "WMT 19 Aug entry exit price — still never confirmed by a Trades-tab screenshot (carried from 20 Aug, still open)",
    "CAPE and market breadth indicators in MARKET_HEALTH_CHECK.md still carried forward, not freshly sourced",
    "AVAV litigation status and Stage 2 refresh still outstanding if re-entry is ever reconsidered",
  ],
};
