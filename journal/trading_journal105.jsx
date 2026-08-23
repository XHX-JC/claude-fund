// trading_journal105.jsx
// 17 August 2026 — RE-BASELINE SESSION, first contact since S96 (14 July close) / the 17 July
// ad hoc reconciliation. Written directly via filesystem MCP. DIRECT WRITE CONFIRMED via
// filesystem MCP. This file number (105) was previously reserved in this fund's own files for
// the 17 July reconciliation but was never actually written — confirmed absent from the journal
// directory at this session's open. Rather than attempt a retroactive reconstruction of a
// session no longer fully reconstructable, this file documents today's re-baseline instead and
// notes the gap explicitly rather than leaving it silent.

processNotes.dropboxProtocol = "DIRECT WRITE CONFIRMED via filesystem MCP.";

const session = {
  date: "17 August 2026",
  type: "RE-BASELINE — first session after ~1 month of untracked, James-directed trading",
  priorSession: "S96 close, 14 July 2026 (trading_journal104.jsx). journal105 was reserved for a 17 July ad hoc reconciliation that was never written.",
};

const context = `
James travelled 17 July to ~17 August, trading independently off his own ChatGPT alert system.
No SESSION_OPEN_PROTOCOL or SESSION_CLOSE_PROTOCOL ran during that period, and no journal was
written. Confirmed via the account's own Trades tab: 114 trades in the trailing 30 days,
realized P&L -$1,877.81 over that window. James's explicit instruction this session: treat
today as a clean re-baseline, not a retroactive reconstruction. Do not attempt to recover the
original entry thesis for every trade made during the untracked month; run fresh Stage 1/2 work
against current price and current facts only, and only where the position size or risk profile
made it critical, to conserve tokens against a genuinely large task.
`;

const accountSnapshot = {
  netLiquidity: 94400,
  dailyPL: 249.16,
  dailyPLPct: 0.26,
  unrealizedPL: 5903.22,
  realizedPL_trailing30d: -1877.81,
  excessLiquidity: 66300,
  maintenanceMargin: 27900,
  initialMargin: 28000,
  availableFunds: 66200,
  buyingPower: 264900,
  costBasisSum_approx: 103300,
  note: "Cost basis (~$103.3K) exceeds net liquidity ($94.4K) — the book is running on margin, not unusual given $264.9K buying power and only $28K initial margin used, but worth remembering going into any further sizing decisions this month.",
  note2: "Net liq is roughly flat to the $95.4K documented at the 15 July close (S97) despite $5,903 of CURRENT unrealized gain sitting in the book. That gain lives almost entirely in five names (KTOS, PDYN, BKSY, NPWR, IONQ) that are all still open positions, not banked profit. If those give back even half their move, the month prints as a net loser rather than the flat-to-slightly-up picture the headline number implies.",
};

const positionTurnover = `
Every position documented at the 17 July snapshot has turned over except PDYN. The current
15-name book (KTOS, PDYN, IONQ, BKSY, NPWR, RKLB, FAC, RPD, AMAT, REKR, LNTH, AZN, RCAT, XSG,
AAON, plus ORCL) has no Stage 1/2 documentation for 12 of its 15 names. Full position-by-
position detail, including this session's verification work, now lives in DECISION_REGISTER.md
under its own RE-BASELINE section — not duplicated in full here.
`;

const criticalWorkDoneThisSession = [
  {
    ticker: "ORCL",
    action: "TRIM RECOMMENDED, JAMES AGREED, ORDER PLACED — FILL UNCONFIRMED",
    detail: `Full Stage 1/2 run given 24% of net liquidity, the largest single concentration in
    the book. Real, live credit deterioration: S&P downgraded to BBB-, one notch above junk,
    9 July, FY26 free cash flow -$23.7B, 5yr CDS near an 18-year high, bond yields well above
    the BBB curve. Insider selling >$2.1B vs $1.1M bought trailing period. Against that:
    genuine backlog growth ($638B RPO, though ~50% concentrated in OpenAI per S&P's own note),
    revenue +17.35% YoY, a fresh $7B 10-year DoD contract. Beta 2.66, ~5% average daily
    volatility, against a stop only 2.6% below last — deliberately tight per James (this is a
    second bite on a name already profitably traded once). Recommended trimming roughly half
    rather than relying on a stop too tight for this name's demonstrated volatility to do the
    "less rope" job on its own. James agreed. SELL 75sh LIMIT $152 GTC placed 17 August.
    NO FILL HAS BEEN CONFIRMED — no Trades tab or IBKR connector check has verified execution.
    Per LESSONS_LEARNED P75 (order status must be read literally, "placed" is not "filled"),
    this is logged as a resting order only. Top priority check at next session open.`,
  },
  {
    ticker: "KTOS, AMAT, AAON, AZN",
    action: "HOLD, NO CHANGE",
    detail: `Full Stage 1/2 checks run on all four given meaningful position size and lack of
    prior documentation. All four verified sound: KTOS's pre-gap thesis reinforced by real Q2
    delivery (+19.1% organic revenue, raised guidance, new contract wins) rather than just
    price catching up to sentiment. AMAT and AAON both show entries timed into legitimate
    post-earnings-beat pullbacks (both companies beat and raised, both sold off anyway on
    cyclicality/margin caution, both drew fresh price-target raises from multiple desks) —
    sound entries, not chased dips. AZN's volatility explained by a real July trial failure
    and now-dead Bristol Myers merger chatter, not a deteriorating fundamental picture. No
    stop or sizing changes recommended on any of the four.`,
  },
  {
    ticker: "OKLO, MBOT",
    action: "LOGGED UNRESOLVED, NOT ASSUMED CLOSED",
    detail: `Both were live/pending in the last documented (17 July) state — OKLO 200sh held
    with two $44.51 GTC stops, MBOT a resting unfilled buy order. Neither appears anywhere in
    the 17 August Positions or Orders screenshots. No confirmation exists for what happened to
    either during the untracked month. Per P76 (a position's status is only as current as the
    last thing that actually checked it), this is logged as an open question in
    DECISION_REGISTER.md, not silently carried forward or silently assumed resolved either way.`,
  },
  {
    ticker: "ADI",
    action: "PASS on fresh entry, no position taken",
    detail: `James's ChatGPT StratB alert (11:21 GST, 17 Aug) was checked in full against
    primary sources: ADI's 19 August earnings date and EPS estimate, RDDT's 18 August S&P 500
    inclusion date, HD's 18 August earnings date and Ted Decker's medical leave, and AMAT's
    Friday close price all verified accurate against company IR pages, S&P DJI's own
    announcement, and independent price data. A genuine, notable change from this fund's prior
    experience with the same alert source (ULBI's fabricated EPS beat, LEVI's mis-framing).
    One real gap found and logged: the alert didn't surface ADI's broader insider-selling
    picture ($45.2M trailing three months across insiders per GuruFocus, beyond the routine,
    pre-scheduled Ray Stata 10b5-1 sale) or its 57.78x trailing P/E. On the actual decision:
    chart shows genuine OBV accumulation since the June-July decline, a real bullish signal,
    but price at $393 has already run through the alert's own $384-390 accumulation zone and
    its stated do-not-chase level of $397, two days ahead of the 19 August print. Passed —
    entering here is the weakest version of the trade available this week. Re-evaluate off the
    post-earnings reaction rather than pre-positioning into the binary.`,
  },
  {
    ticker: "MARKET_HEALTH_CHECK.md",
    action: "FULL RECALCULATION, WRITTEN BACK TO FILE",
    detail: `First recalculation since 14 July (S96, AMBER 11/24). New composite: GREEN 7/24,
    sitting exactly on the GREEN/AMBER boundary. All twelve indicators freshly sourced this
    session, including breadth (58.3% of US equities above their 50d MA per the most recent
    hard figure, 7 August — confirmed AMBER, not the Russell-2000 proxy used at first pass).
    Real de-escalation drove the move: VIX 17.16 to 14.25 over the full month (a trend, not one
    calm day), HY spreads tight at 271bps, SPX within 1% of its all-time high and comfortably
    above both key moving averages, WTI still under $90 despite an active Hormuz naval blockade
    story. Genuinely unresolved underneath the headline: CAPE ~41-42x, second-highest in the
    index's history after the Dec 1999 peak; 10yr yield 4.68%, near a 19-month high, rising;
    and a live Fed split (held rates on a 9-3 vote with three dissents favoring a hike,
    JPMorgan's own strategists have since shifted to expecting a September hike while Kalshi
    prices only 26% odds). This reads as acute stress fading while a structural valuation/rate
    risk sits underneath, unmoved — worth weighting alongside the score, not instead of it.`,
  },
];

const notDoneThisSession = `
Flagged explicitly rather than left to be discovered by their absence:
- PDYN, the one surviving pre-gap position, was NOT re-verified fresh this session. It was
  already extensively documented before the gap and nothing surfaced to doubt continuation,
  but this is a judgment call under time constraint, not a completed check — worth a dedicated
  look next session rather than continuing to assume.
- IONQ, BKSY, NPWR, REKR, LNTH, RCAT, RKLB, FAC (the seven/eight smallest positions) got a fast
  qualitative pass only, no red flags found, not a full Stage 1/2 given James's explicit
  instruction to conserve tokens and only go deep where critical. REKR and NPWR flagged as the
  two worth a real look eventually — sub-$3 price, no documented thesis, thinner analyst/news
  coverage if something goes wrong — not urgent, not actioned.
- TRACK_RECORD.csv was NOT reconciled against the month of untracked trades this session. This
  is a real, large gap (114 trades across 30 days) that the consolidated catch-up James has
  said he'll run separately will need to address. This session does not resolve it and should
  not be read as having done so.
- OPPORTUNITY_SCAN.md was not updated with the StratB alert verification outcome this session —
  logged here and in DECISION_REGISTER.md instead; worth carrying into that file at the next
  full session close if the standing workflow is resumed.
`;

const infrastructureNote = `
IBKR CONNECTOR STATUS UPDATE, 17 August 2026: the Claude-side connector remains unreliable,
absent from the tool registry again this session, consistent with the "cancelled" status James
reported 17 July. James's own IBKR link on the ChatGPT side is now more stable and is the
standing source for live account data going forward. Practical effect: reconciliation continues
via James's screenshots supplied in-session, the same method already in use through the travel
period, not a new gap to keep re-checking.
`;

const nextSessionMandatoryActions = [
  "Confirm ORCL 75sh SELL LIMIT $152 fill status via Trades tab screenshot — top priority, unconfirmed order sitting live.",
  "If filled, re-check the ORCL profit-take ladder (50@$189.85/50@$177.80/50@$165.00) against the reduced 75sh position — those orders were sized for 150sh.",
  "Resolve OKLO/MBOT status if James has any record of what happened during the untracked month; otherwise leave as closed open questions, not phantom positions.",
  "Re-verify PDYN fresh rather than continuing to carry it forward on pre-gap documentation alone.",
  "Pull a live breadth number rather than the 7 August figure once more current data exists, given the market health score sits exactly on the GREEN/AMBER boundary.",
  "ADI: check the post-19-August-earnings reaction before any fresh entry decision, not the pre-earnings price.",
];

const sessionCloseAddendum_secondHalf = {
  note: "Everything below happened AFTER trading_journal105.jsx was first written mid-session. Appended at actual session close rather than left undocumented.",

  ORCL: {
    status: "Trim order still resting, 0/75 filled, confirmed via live chart at close. James's decision: let price recover toward cost (~$150.16) before trimming, rather than trim at the worse intraday level. OBV climbed steadily off the ~17:45 intraday low ($145.11), price round-tripped to $148.69, a real recovery signal. Flagged directly to James: the original trim rationale was concentration risk (24% of net liq) independent of price, waiting for cost delays fixing that rather than fixing it, a deliberate trade-off, not an error, but one to revisit if price stalls below $150 again rather than letting the wait drift indefinitely.",
  },

  REKR: {
    status: "Full Stage 1/2 run, short-term catalyst check specifically requested. Found this session's most important single discovery: a LIVE Nasdaq minimum-bid-price deficiency notice (27 April 2026), compliance deadline 26 October 2026, confirmed via SEC 8-K/10-Q. No organic path to cure at current sub-$1 pricing, a reverse stock split is the realistic path, must complete by roughly mid-October if used. Real near-term structural risk to the existing 5,000sh position, not previously on file. ALSO CAUGHT: this position was never actually added to the 17 August re-baseline table when it was first built, a real omission, found and fixed at close, not before.",
  },

  AMTM: {
    status: "Assessed twice, first Claude's own Stage 1/2 off a chart screenshot (WATCH, real fundamentals underneath a falling chart, no confirmed base), then a James-supplied ChatGPT alert verified in full against primary sources (SEC 8-K, Q3 transcript, GovConWire), every figure checked out accurate. One thing the alert didn't have that Claude's verification added: management stated the NASA-insourced contracts are margin-dilutive, so the EBITDA hit is smaller than the revenue hit, a real mitigant on the one open structural question. Added to ACTIVE WATCHLIST with both the alert's specific levels and the combined fundamental picture, no resting order placed.",
  },

  APP: {
    status: "Full Stage 1/2 run, James pushed back with a specific, well-formed question (fundamentals vs price, leverage, half-size proposal) that led to genuine new research, not just repetition, verified via the actual 10-Q that AppLovin is NOT overleveraged (Debt/EBITDA 0.58x, net debt only ~$462M against $5.42B TTM EBITDA). Half-size framing agreed as the right way to reconcile a real valuation case against an unconfirmed technical base. ENTERED: 30sh @ $315, stop $300, standard $500-max-loss sizing, 3:1 target $360. Confirmed by James mid-session with price already at $310.77, about 28% of the way toward the stop on day one, not alarming given no base existed at entry, but the position to watch most closely next session.",
  },

  LNTH: {
    status: "Reassessed mid-session from 'small undocumented position, nothing distinguishing it' to its actual nature: a signed Curium cash M&A deal ($102.50 close plus a speculative CVR to $12.00 more), a ~1.5% spread-to-close arb on a 6-15 month timeline, not a growth position. James's call: exit, the sizing (30sh, ~$3K) was built for a stock pick, not a slow arb. MARKET SELL instructed for the open. NOT YET CONFIRMED FILLED as of session close, top priority to verify next session, along with confirming the old $94.85 stop is actually cancelled once the sell confirms.",
  },

  processGapsFoundAndFixedAtClose: [
    "REKR was missing from the HELD POSITIONS re-baseline table entirely, the session's own earlier claim of a complete 15-name re-baseline was not actually complete. Found and fixed at close, not before.",
    "LNTH's true status (M&A arb, not a growth stock) was only surfaced when directly asked to assess it a second time, the first-pass fast-pass classification had missed the single most important fact about the position.",
  ],

  outstandingForNextSession: [
    "ORCL trim fill status, top priority, resting at $152, James letting price recover toward cost first.",
    "APP, verify the $300 GTC stop is actually resting (unconfirmed placement), and watch price action given it is already tracking toward the stop.",
    "LNTH exit fill status, and confirm the old $94.85 stop is cancelled once it does.",
    "PDYN, the one surviving pre-gap position, still never re-verified fresh.",
    "OKLO/MBOT, still unresolved ghost positions, no record either way.",
    "TRACK_RECORD.csv, still not reconciled against the 114 untracked trades, the actual substance of the consolidated catch-up James has referenced twice now.",
    "StratB protocol, categories 23 (manufacturing capacity, KTOS/RCAT) and 14 (forced-seller, confirm the current null) are the two highest-value remaining categories.",
    "AMTM's next earnings date, not yet sourced.",
    "Cash floor, USD cash was negative $19,156 this morning, the fund's own 10% minimum reserve rule is currently breached, worth a conscious decision once the trim and exit settle.",
  ],
};

export const sessionCloseSecondHalf = sessionCloseAddendum_secondHalf;

export default {
  session,
  context,
  accountSnapshot,
  positionTurnover,
  criticalWorkDoneThisSession,
  notDoneThisSession,
  infrastructureNote,
  nextSessionMandatoryActions,
};
