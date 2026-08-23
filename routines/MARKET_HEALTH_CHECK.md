# MARKET HEALTH CHECK — MANDATORY MORNING PROTOCOL
# Created: S59 | 6 June 2026
# Last updated: S60 WEEKEND | 7 June 2026
#
# 21 AUGUST 2026 — FULL RECALCULATION, run on James's direct instruction at session open.
# CORRECTION LOGGED: an earlier version of this entry claimed to supersede a stale AMBER 11/24
# from 14 July — wrong. This file's own 17-19 Aug sequence was missed on the first read (tail
# read plus keyword grep landed on the old 14 July section, the intervening entries were in
# context but not surfaced). This recalc actually supersedes AMBER 9/24, confirmed 19 August,
# the file's genuine most recent entry. Triggered by an external Market Fragility Alert scan
# (James-supplied, score 8.0/10, action-change classification) — independently verified: SPX
# close 20 Aug 7,642-7,655 across sources (-0.5% to -0.9%), Dow -1.0 to -1.3% (WMT -8 to -9%,
# worst since 2022, the largest single drag), oil ~$87-88, VIX 16.01 (+7.5% same session).
# Treasury's larger-buyback signal (announced ahead of this) failed to hold even one session —
# long yields resumed rising same day, confirmed via Bloomberg. Net move from 9/24 (19 Aug) to
# 12/24: SPX vs 50d MA flips AMBER to RED (SPX now trading below, not just narrowing above, the
# 50d MA), VIX velocity flips AMBER to RED (a third-plus consecutive up-session becomes a
# genuine same-day spike, +7.5%), SPX vs 200d MA reassessed AMBER (cushion has compressed to
# under 1%). 10yr trend and CAPE were already RED on 19 Aug's own numbers, unchanged here. HY
# spreads unchanged GREEN (~270bp), consistent with the 19 Aug note that credit shows no stress
# at all — the entire deterioration remains a duration/term-premium and equity-technical story,
# not a credit event. Breadth: the file's own 18 Aug entry recorded a real upgrade to 68%/73%
# (Schwab, 14 Aug) that the 19 Aug entry then described as "still carrying the 7 Aug 58.3%/56.8%
# figure" — those two statements conflict and neither was reconciled before now. This recalc
# carries 58.3% as the more conservative of the two stale figures given three-plus SPX
# down-sessions since either reading, but the honest position is that neither breadth number is
# trustworthy today. Fresh pull owed before next session trusts AMBER-not-RED on that line.
#
# | # | Indicator | Current | Score |
# |---|-----------|---------|-------|
# | 1 | SPX vs 50d MA | 50d MA ~7,756 (Investing.com), SPX ~7,643-7,655 — now BELOW, flips from AMBER (19 Aug) to RED | RED (2) |
# | 2 | SPX vs 200d MA | 200d MA ~7,586, SPX ~0.7-0.9% above — sits below the 1% AMBER floor this table uses, one further bad session from flipping to below entirely | AMBER (1) |
# | 3 | SPX Fibonacci | Still above the 7,290 boundary carried from 14 Aug — NOT independently rebuilt this session, directionally fine given the size of the current gap | GREEN (0) |
# | 4 | VIX level | 16.01 (20 Aug close) | GREEN (0) |
# | 5 | VIX velocity | 14.25 (14 Aug) → 15.19 (17 Aug) → 15.84 (18 Aug) → 16.01 (20 Aug, +7.5% same session) — full sequence on file, flips from AMBER (19 Aug) to RED, a genuine spike on top of an already-building trend | RED (2) |
# | 6 | HY spreads | ~270bp, ICE BofA US HY OAS via FRED, 17 Aug | GREEN (0) |
# | 7 | 10yr yield | ~4.68% | AMBER (1) |
# | 8 | 10yr trend | RISING — Treasury's own buyback intervention reversed within 24 hours per Reuters, confirmed independently | RED (2) |
# | 9 | CAPE ratio | ~41-42x carried from 14 Aug, NOT repulled this session — net index move since then (~-1%) makes a material shift unlikely but this is a real data gap, not a fresh figure | RED (2) |
# | 10 | Fed direction | On hold, live hike/cut split (9-3 vote, 3 dissents favoring hike) carried from 14 Aug, no new information found | AMBER (1) |
# | 11 | WTI oil | ~$87-88, still under the $90 AMBER threshold but rising | GREEN (0) |
# | 12 | Market breadth | 58.3% above 50d MA carried from 7 Aug — the alert's own language ("widening equity participation in the sell-off") argues this has deteriorated further; NOT confirmed with a fresh sourced number, flagged not papered over | AMBER (1) |
#
# CURRENT COMPOSITE SCORE: 12/24
# REGIME: AMBER, near the RED boundary (14). Composition has shifted materially worse than the
# stale 11/24: four indicators now read RED (SPX vs 50d, VIX velocity, 10yr trend, CAPE) against
# three AMBER (SPX vs 200d, 10yr yield, Fed) and one AMBER on a stale, likely-optimistic number
# (breadth). CAPE and breadth are carried, not freshly sourced, and both are more likely to have
# moved against the regime than for it — treat 12/24 as a floor, not a settled reading. Tier 2
# AMBER protocol applies in full: DAY tif only on new entries, no resting GTC buys, crash stress
# test mandatory, raise stops on profitable positions (LITE already done), exit broken theses.
# Next full recalc owed once CAPE and breadth are freshly sourced, or sooner if the external
# scanner escalates again per the Market Turning Alert Protocol.
# ═══════════════════════════════════════════════════════════════════════════════════════

## CURRENT STATUS: AMBER, near the RED boundary (confirmed 21 August 2026, full recalculation
## — see indicator table and sourcing in the comment block immediately above this line. This
## supersedes the 19 August 9/24 reading, demoted to PRIOR STATUS immediately below.)
## COMPOSITE SCORE: 12/24 (AMBER). Four indicators RED (SPX vs 50d MA, VIX velocity, 10yr trend,
## CAPE), three AMBER (SPX vs 200d MA, 10yr yield, Fed), one AMBER on a stale, likely-optimistic
## breadth figure, four GREEN (SPX Fibonacci, VIX level, HY spreads, WTI). Treat 12/24 as a floor
## — CAPE and breadth are carried, not freshly re-sourced this pass, and both are more likely to
## move against the regime than for it at the next recalculation.
## CRASH_HEDGE_ACTION_PLAN.md APPLICABILITY (ADDED S110): this file is the sole source of the
## regime label above. state\CRASH_HEDGE_ACTION_PLAN.md is applicable this session whenever the
## CURRENT STATUS above reads AMBER, RED, or CRISIS, and not applicable while GREEN. This line
## only consumes the regime stated above — it does not restate or redefine the score bands.

## PRIOR STATUS: AMBER (confirmed 19 August 2026, full recalculation — score continued to build
## from 18 Aug's 8/24, driven by that session's live inputs, not a stale carry-forward at the time)
## PRIOR COMPOSITE SCORE: 9/24 (AMBER) — SUPERSEDED 21 August 2026 by the 12/24 reading above.
## Retained here as the immediately-prior recalculation and its supporting detail, not as a
## current reading.

## RECALCULATION NOTE, 19 AUGUST 2026 — 8/24 TO 9/24, THIRD CONSECUTIVE VIX UP-SESSION, 30YR YIELD
## GENUINE NEW DETERIORATION NOT PREVIOUSLY ON FILE
Score moved from 8/24 (18 Aug) to 9/24 driven by two real, dateable developments, not drift:
1. **VIX has now risen three consecutive sessions from its 2026 YTD low** — 14.25 (14 Aug) to
   15.19 (17 Aug, +6.60%) to 15.84 (18 Aug, +4.28%). Scored AMBER on velocity (was GREEN), not
   yet a spike but no longer a one-session blip either. BTIG's Krinsky note (17 Aug) explicitly
   flags this as a low-vol-complacency-into-a-seasonally-weak-window setup, not noise.
2. **30yr Treasury yield hit 5.31-5.33% intraday 17-18 Aug, its highest since July 2007 (19-year
   high)** — a genuine escalation from the 4.75%/19-month-high 10yr reading already on file, not
   the same fact restated. Drivers, independently verified across multiple sources: record $432B
   July federal deficit (cumulative FY26 deficit already $1.799T, exceeding all of FY25), foreign
   Treasury demand actively retreating (Japan -$26.4B, China -$25.9B, June), a 30yr auction that
   cleared at 5.216% (highest since 2001), and ~$192B in tech-sector corporate bond issuance
   (AI capex funding) competing for the same duration buyers. SPX fell three consecutive sessions
   into 18 Aug on this, not on a credit or growth scare. 10yr itself sits ~4.70-4.72%, unchanged
   from the AMBER band already scored, but 10yr trend and CAPE both stay RED.
3. **WTI $85.18, still under the $90 GREEN/AMBER line, scored GREEN unchanged** — but Brent has
   already cleared $90 on the same Iran/Hormuz dynamic (interim ceasefire MOU expired 17 Aug,
   talks stalled), worth flagging as a proximity risk, not yet a scored deterioration on the
   WTI-specific indicator this file tracks.
4. **HY spreads remain the one genuinely reassuring, freshly-verified indicator: 271bps (13 Aug),
   unchanged, GREEN.** This is the material divergence worth stating plainly: credit/default risk
   pricing shows no stress at all, the entire move is concentrated in Treasury duration/term
   premium (fiscal, issuance supply, foreign-buyer retreat) not in corporate default risk. HYG/LQD
   ratio (17 Aug) reads +3.07σ vs 1yr history, TIGHT regime, a risk-ON credit signal running
   directly alongside a risk-OFF government-bond signal. Do not let the 30yr headline imply a
   broad-based credit event, it is not one, yet.
5. **Direct portfolio relevance, not just macro colour: ORCL is a BBB- (one notch above junk)
   issuer with FY26 FCF of -$23.7B and CDS near an 18-year high, sitting inside a market where the
   marginal buyer of long-duration paper is retreating and the marginal seller (US Treasury plus
   AI-capex-funded tech issuers) is expanding supply. This is the mechanism, not a coincidence,
   behind ORCL's price action this week — see DECISION_REGISTER.md HELD POSITIONS for the live
   stop discrepancy that needs resolving first.**

Practical effect: AMBER discipline continues in full (crash stress test on all new entries, no
resting GTC buys). Market breadth (indicator 12) not freshly re-pulled today, still carrying the
7 Aug 58.3%/56.8% figure — three consecutive SPX down-sessions argues this may already be stale
in the RED direction, next session should re-pull before trusting AMBER on breadth specifically.

---

## HISTORICAL RECALCULATION, 18 AUGUST 2026 (superseded 19 August, then 21 August — see CURRENT
## STATUS at top of file for today's reading): AMBER, crossed from GREEN 7/24 the same session,
## driven by that session's live inputs at the time.
## SCORE AT THE TIME: 8/24 (AMBER, one point over the GREEN boundary)
## REGIME AT THE TIME: AMBER — Tier 2 protocol was in effect: no new BUY limit orders left resting GTC, crash stress test required on all new entries, raise stops on profitable positions, sizing gated on thesis quality/judgment not mechanical
## VIX AT CLOSE: 15.70 (18 Aug, +3.36% intraday — first uptick after a month-long decline, not yet a confirmed multi-session spike)
## BUY ORDERS IN MARKET: check current GTC pending table in DECISION_REGISTER.md/FUND_SESSION_STATE.md directly, not tracked redundantly here

## RECALCULATION NOTE, 18 AUGUST 2026 — GREEN 7/24 TO AMBER 8/24, SAME-SESSION MOVE
Score moved from 7/24 (GREEN, 17 Aug re-baseline) to 8/24 (AMBER) driven by today's session, not
stale data: SPX gave back some of its cushion above the 50d MA (~7,706 post pullback/premarket vs
~7,500 50d MA, +2.7% vs 14 Aug's +3.8%, AMBER not GREEN), VIX had its first uptick in a month
(+3.36% to 15.70), and the 10yr yield pushed back to 4.73% testing its 19-month high again — all
live on the Trump/Iran/Oman Strait of Hormuz escalation and oil pushing to ~$84 from ~$81-82.
Market breadth improved and pulled the other way (68% above 50d MA / 73% above 200d MA per
Schwab, 14 Aug, real upgrade from the stale 58.3%/56.8% 7 Aug reading previously carried here) —
not enough to offset the other two moves. Fed direction unchanged AMBER classification but
directionally less hawkish than the 17 Aug entry implied: market-implied September hold
probability rose to 67% from under 50% a month ago. HY spreads (indicator 6) NOT re-pulled fresh
this session, carried at 271bps (12 Aug) — highest-value fix if AMBER holds into tomorrow. CAPE
unchanged ~41-42x, structurally static, does not need daily re-pulling.
OPEN ITEM: RARE (BUY 100 @ $26.40 DAY, stop $24.00 GTC) and LOW (BUY 50 @ $217.00 DAY, stop
$210.00 GTC) were both placed/reviewed earlier this session, before this recalculation confirmed
AMBER. Neither has a crash stress test logged, which the AMBER tier now requires for any new
entry. Both were sized and stopped with real thesis-collapse logic already (not sizing-only), and
neither is a live GTC buy (both DAY-tif, compliant with the AMBER no-resting-GTC-buy rule
regardless), but the formal stress test itself is still outstanding and should be run before either
fills further or before adding to either position.

## RECALCULATION NOTE, 17 AUGUST 2026 — WHAT MOVED AND WHAT DIDN'T
Score dropped from 11/24 (AMBER, 14 July) to 7/24 (GREEN boundary) over the ~1-month gap this
file was not touched. The move is real, not a stale-data artifact: VIX genuinely de-escalated
(17.16 to 14.25 over the full month, not one calm session), HY credit spreads are tight
(271bps per FRED/ICE BofA OAS, 12 Aug, well under the 350bp AMBER line), SPX closed 14 Aug at
7,785.76, within 1% of its 52-week/all-time high (7,816.70) and comfortably above both its 50d
and 200d moving averages, and WTI has stayed under the $90 AMBER threshold (~$81-82) despite
an active, ongoing Hormuz naval blockade story that has not yet moved price materially.

What has NOT improved, worth stating plainly rather than letting the headline GREEN imply
otherwise: Shiller CAPE sits at ~41-42x, second-highest reading in the index's history (only
the Dec 1999 dot-com peak of 44.2 is higher), scored RED here same as 14 July. The 10yr yield
closed 14 Aug at 4.68%, near a 19-month high of 4.75% touched mid-week, AMBER on level and RED
on trend, both unchanged in direction from 14 July, arguably worse. Fed stance is a live,
genuine split: held 3.50-3.75% at the 28-29 July meeting on a 9-3 vote with three members
dissenting in favor of a hike; JPMorgan Wealth Management's own strategists have since shifted
their base case to expect a 25bp September hike, while Kalshi's prediction market prices only
a 26% hike probability for the 15-16 September meeting. Real disagreement between a
professional desk and market-implied odds, scored AMBER, unchanged from 14 July.

This reads as an acute-stress episode fading (VIX velocity spike, active Iran-strike oil
shock, widening dispersion all easing) while a structural valuation and rate-path risk sits
underneath, essentially unmoved. The composite score captures the acute side well; it does
not capture CAPE/valuation risk beyond the single binary RED flag on indicator 9. Weight that
context alongside the number, not instead of it.

CAVEAT — indicator 12 (market breadth) is estimated this session, not freshly pulled from a
primary breadth source (e.g. % of S&P 500 above its 50d MA). Proxy evidence (Russell 2000 also
at a fresh all-time high alongside SPX, a broader-participation signal than a narrow mega-cap
rally) supports the AMBER-not-RED estimate used below, but a real number could move the
composite by ±1, which spans the entire distance between the current 7 (GREEN) and 8 (AMBER).
Pull HYG/breadth directly next session before treating GREEN as fully confirmed.

## STANDING RULE — MARKET TURNING ALERT PROTOCOL (James's direction, 14 July 2026)
James, verbatim: "I want to know as soon as you or the scanner believe the market is
turning, apply as you see best but know that the other alert is also running, you are
the back up, but only run when I am online which is the limiting factor with Claude,
the other is always running."

Division of labour, stated plainly rather than assumed: James's external Market
Fragility Alert scanner (ChatGPT-built, hourly, weekdays, always running) is PRIMARY
continuous coverage. Claude is BACKUP coverage only, and only exists within an active
conversation — there is no ability to monitor markets, run checks, or contact James
outside a live session. This is a structural limitation, not a design choice, and
should be stated plainly rather than implying broader coverage than actually exists.

Given that limit, Claude's standing obligation going forward: at the START of every
conversation with James in this project, whether a scheduled session open or an ad hoc
chat on any topic, run a quick, quiet market pulse check before addressing whatever
James actually raised (VIX level, SPX vs 50d/200d MA and the Fibonacci levels below,
and the scanner's latest state if James has it to hand or mentions it). This is
lighter than the full Step 3 twelve indicator recalculation — a gate, not a recalc —
and should stay invisible unless it finds something. If anything in that check suggests
a turn, say so immediately and plainly, before anything else in the response, do not
bury it under whatever else the conversation was about.

MARKET TURNING ALERT is its own channel, deliberately separate from and faster than
both the formal 0-24 composite score (which stays disciplined and confirmation-gated
by design, see Step 3) and the scanner's own fragility score (see Step 2C). Either
Claude or the scanner independently believing the market is turning is enough to raise
it — it does not require the formal composite score to have moved first. This is a
deliberate low-precision, high-recall design: a false alarm that gets investigated and
dismissed costs little, a missed turn costs a lot.

If Claude and the scanner agree a turn is happening, treat that as materially higher
confidence than either alone and escalate accordingly. If they disagree, or if a pulse
check finds something the scanner has not flagged (or vice versa), say so explicitly
rather than defaulting to whichever reading is more reassuring — the same standing rule
already in force for Step 2B and Step 2C.

Not yet done: this same pulse-check habit has not been cross-checked against
SESSION_OPEN_PROTOCOL.md, which was not reread this session. Align the two next time
that file is opened, rather than assuming this note alone is sufficient going forward.

### S96 RECALCULATION — WRITES BACK THE FIGURE THIS FILE SHOULD HAVE CARRIED SINCE S92
DECISION_REGISTER.md and FUND_SESSION_STATE.md have both been carrying AMBER 9/24 (calculated S92, 10 July) for several sessions, while this file itself still showed the stale GREEN 6/24 from S85 — a real sync gap, flagged explicitly in FUND_SESSION_STATE.md's own S92 OPEN ITEMS list and never closed until now. This is not simply writing the old 9/24 figure back in — a fresh full recalculation was run S96 given genuine intervening news (renewed US-Iran strikes near the Strait of Hormuz over the weekend, oil whipping $71-79, VIX velocity spike, semiconductor-led equity weakness). Score moved from the carried 9/24 to 11/24, AMBER holds, but the composition has shifted: VIX velocity and the 10yr trend both moved against the regime since 10 July on real news, not drift.

---

### REGIME CLARIFICATION — S60 UPDATE
The VIX closing level on June 5 was 21.51, not 25.89. The 25.89 figure was the
intraday spike. This is material — it means the regime is AMBER not AMBER-RED.
Score remains 13/24 but Tier 2 hard rules (50% sizing, no new entries) are replaced
with a pragmatic caution framework: high-conviction entries with strong fundamentals,
insider signals, and crash stress test passes are eligible at normal sizing.
No mechanical sizing penalty. Use judgment and thesis quality as the gating factor.

---

## WHY THIS FILE EXISTS
VIX moved from 15 to 21.51 close (25.89 intraday) on 4-5 June 2026.
10yr Treasury yield at 4.55% — above amber threshold.
CAPE ratio ~39x — elevated.
Fed hike probability 57% by year-end. June 17 meeting (Warsh's first) is key risk.
Any new entry should be stress-tested. But caution must be pragmatic, not paralysing.

---

## STEP 1 — CLAUDE PULLS AUTONOMOUSLY (no user action needed)

Claude runs these at every session open before any portfolio discussion:

```
EOD: get_historical_commodity_prices(WTI, daily) → last 3 readings
EOD: get_us_live_extended_quotes(SPY.US) → proxy for SPX level
Web search: "VIX level today" + "10yr Treasury yield today"
Web search: "HYG ETF price today" → credit stress proxy
```

Report format:
  WTI:    $[X]  | Signal: [GREEN <$90 / AMBER $90-105 / RED $105+]
  SPX:    [X]   | vs 50d MA [X]: [above/below] | vs 200d MA [X]: [above/below]
  VIX:    [X]   | Signal: [GREEN <20 / AMBER 20-30 / RED 30+]
  10yr:   [X]%  | Signal: [GREEN <4.5% / AMBER 4.5-5.0% / RED 5%+]
  HYG:    $[X]  | Direction: [rising=GREEN / falling=AMBER / crashing=RED]

---

## STEP 2 — USER PROVIDES (takes 2 minutes)

At each morning session, paste or state:
  a. VIX current (from TradingView CBOE:VIX or IBKR)
  b. 10yr yield current (from TradingView TVC:TNX or IBKR)
  c. Any overnight macro news that feels significant

Optional:
  d. SPX futures level (if checking before NYSE open)
  e. BTC/USD (risk appetite proxy + BTC entry monitor)
  f. USD/JPY (yen carry unwind — break below 140 = crisis flag)

---

## STEP 3 — COMPOSITE SCORE (Claude calculates each session)

## STEP 2B — MANUAL FLAG: LEVERAGE AND FACTOR DIVERGENCE (ADDED S86W, 4 July 2026)
═══════════════════════════════════════════════════════════════════
Origin: James forwarded technical trader charts flagging a genuine leverage and factor
extreme that the 12 indicator composite score cannot see, because none of the 12
indicators measure margin debt growth or narrow factor unwind risk. On 4 July 2026 the
score read GREEN 6/24 while, two sessions earlier (1 to 2 July), the Goldman Sachs High
Beta Momentum index had its worst two day move since Covid (down almost 19%) with VIX
actually falling (16.59 to 16.15) and SPX roughly flat. A violent factor level unwind
occurred underneath a headline tape that looked calm. This is not captured by the
score, and will not be, until a real indicator is added.

MANUAL CHECK, run every session until a proper data feed is found, high confidence
this is currently informative:
  1. FINRA margin debt month over month growth rate (source: FINRA Margin Statistics,
     free, monthly). RED FLAG if two consecutive months show 5%+ MoM growth, or if
     margin debt to M2 approaches its record high of 6.35% (was 6.17% as of 2026 05 01,
     53.5% above its own long term average). Current reading, May 2026: $1.42 trillion,
     up 8.5% month over month, second consecutive record month, up 54% year over year.
     Real (inflation adjusted) margin debt has grown 550% since 1997 versus the market's
     358% over the same period, the widest gap on record. This is independently
     corroborated across multiple named sources (Kobeissi Letter, Advisor Perspectives,
     STL News), not a single source claim.
  2. Momentum or high beta factor divergence from broad index vol: if a named momentum,
     growth, or high beta index or basket (Goldman Sachs High Beta Momentum, or any
     comparable factor tracker found via web search) moves 10%+ over one to two sessions
     while VIX is flat or falling, log it explicitly as a leverage unwind signal
     independent of the composite score, regardless of what the score itself reads.
  3. US Total Market Cap divided by M2 money supply (source: MacroMicro, free): currently
     3.28 as of May 2026, an all time high across the full 50+ year series and above the
     2000 dot com peak (approximately 3.0). Treat any further increase as confirmation,
     not new information, until it reverses.
  4. Cross check margin debt to TOTAL MARKET CAP (not M2) before treating leverage as an
     outright extreme: this ratio was actually 0.5% BELOW its own long term average as
     of 2026 05 01 (1.87% vs 1.88% average). The M2 denominator, not runaway margin debt
     alone, is doing a meaningful share of the work in indicator 1's alarming reading.
     State both ratios together every time this check runs, never indicator 1 alone.
THIS BLOCK IS A MANUAL FLAG, NOT YET A SCORED INDICATOR. It does not change the 6/24
composite score or the GREEN regime designation on its own. Its purpose is to prevent
the composite score's blind spot from being mistaken for "nothing is wrong." If this
block and the composite score disagree, say so explicitly rather than defaulting to
whichever reads more reassuring.
════════════════════════════════════════════════════════════════════

## STEP 2C — MANUAL FLAG: DISPERSION AND SEASONAL CYCLE CONTEXT (ADDED S96W, 14 July 2026;
## DEFINITIONS SUPERSEDED S96W SAME EVENING BY JAMES'S EXTERNAL SCANNER BUILD)
═══════════════════════════════════════════════════════════════════
Origin: James forwarded technical trader charts (VIXEQ vs VIX gap, NDR 2026 Cycle
Composite). Same pattern as STEP 2B: a real signal the 12 indicator composite cannot
see, because none of the 12 indicators measure cross sectional dispersion or seasonal
positioning. Claude's own first-draft thresholds below were replaced the same evening
by James's external "Market Fragility Alert" scanner (ChatGPT-built, runs hourly on
weekdays), which added a dedicated dispersion/correlation module with materially more
precise definitions. That scanner is now the primary data source for Part A and the
calendar checks in Part B; this file records its logic so the fund's own reasoning
stays consistent with what is actually firing, and so this block is legible without
access to the scanner itself.

PART A — DISPERSION/CORRELATION TRANSITION MODULE (source: James's external Market
Fragility Alert scanner, hourly weekday cadence, updated 14 July 2026):
Covers DSPX, VIXEQ, VIXEQ−VIX, and COR3M (3-month implied correlation). Important
nuance carried over from the scanner build, worth keeping explicit: Cboe's own framing
is that DSPX is a forward-looking measure of idiosyncratic movement, and its
relationship with VIX is not mechanically bearish — an extreme reading on its own
reflects rotation into stock-specific risk, not an imminent index decline. DSPX is
also mathematically derived from VIX and VIXEQ (DSPX = sqrt(VIX² − VIXEQ²) per Cboe's
own methodology), so DSPX and the raw VIXEQ−VIX spread are the same underlying signal,
not two independent confirmations — the scanner correctly treats DSPX, VIXEQ−VIX, and
COR3M as one related signal complex rather than three separate votes, which this file
should also follow to avoid double counting.
Baseline as of 14 July 2026 (initial reference only, not a fixed anchor — the scanner
dynamically updates the rolling 252-session high going forward): DSPX ~44, VIXEQ−VIX
spread ~30-31 points, an all time high per Cboe's own reporting. COR3M near multi-year
lows (~8.2).
Warning states, in ascending order of confidence:
  DISPERSION EXTREME HOLDING — DSPX or VIXEQ−VIX within 10% of its own rolling
  252-session high. Latent fragility only, no automatic de-risking recommendation.
  This is the state as of 14 July 2026.
  PRELIMINARY UNWIND WATCH — either dispersion measure down 20%+ over five sessions
  while VIX merely rises (any amount). Needs additional breadth, credit, momentum, or
  term-structure deterioration before affecting the score materially.
  DISPERSION UNWIND RISK (durable version) — DSPX or VIXEQ−VIX down 20%+ over five
  sessions AND VIX up by at least the greater of 3 points or 15%. The magnitude
  requirement on VIX is deliberate, filters out weak signals where VIX is only
  trivially higher.
  CORRELATION REVERTING — COR3M above 15 is a confirmation warning; above 20, up 5
  points in a week, or up 50%+, is a strong confirmation.
  COMPOSITE ESCALATION — a dispersion unwind combined with correlation reversion is a
  high-quality transition warning, but normally still requires at least two further
  confirmations (worsening breadth, VIX backwardation, widening HY spreads, systematic
  deleveraging, or momentum liquidation) before producing a one-to-two-point change in
  the scanner's own fragility score. Two-session hysteresis applies before any warning
  state clears, to stop it flipping on and off around a threshold.
OPEN QUESTION, RESOLVED 14 July 2026 by James's direction (see the STANDING RULE at the
top of this file): the scanner's fragility score stays a separate, parallel score to
this file's own 0-24 composite, not integrated into it. Agreement between the two is
stronger evidence, disagreement is something to investigate, never mechanically merge
the scanner's point changes into the composite score above. Routine warning-state
changes get raised and logged at the next session open. Anything reaching DISPERSION
UNWIND RISK plus COMPOSITE ESCALATION together, or belief from either Claude or the
scanner that the market is genuinely turning, is now covered by the MARKET TURNING
ALERT protocol at the top of this file and does not wait for a scheduled session open.
Practical effect for the fund, unchanged from the original flag: VIX is not a reliable
proxy for single-name risk in a concentrated stock-picking book while extreme dispersion
holds. Size stops and position risk off individual name vol, not the index level.

PART B — NDR 2026 CYCLE COMPOSITE, retained as context only, calendar definitions
now sourced from James's scanner rather than Claude's own looser first draft:
NDR's proprietary blend of one-year seasonal, four-year presidential, and ten-year
decennial cycles projects continued 2026 choppiness through Q3, a trough near early to
mid-October, then a sharp rally through November/December into 2027. Broadly consistent
with independently checked, non-proprietary midterm-year seasonality (roughly 87% of
midterm years finish positive historically, average near +19%, average 12-month forward
rally from midterm low to pre-election year high above 30%). Two live caveats found the
session this was first added, both still material: (1) one independent tracker shows
2026's actual path currently correlating poorly with the textbook midterm shape,
tracking closer to post-election and pre-election analogs instead, meaning the specific
October-low, November-December-rally shape should not be treated as scheduled; (2)
current S&P earnings growth (roughly 20 to 25% projected for 2026) has historically
correlated with weaker forward returns, not stronger, a genuine counterweight layered
on top of any seasonal tailwind, alongside AI-capex concentration risk and thin
positioning cushion flagged by multiple sources.
Not independently pullable without an NDR subscription. The scanner tracks the price
side precisely instead:
  CHECKPOINT 1 (1-15 October 2026): a fresh multi-month low is now objectively defined
  as a new 63-trading-day SPX closing low. Unconfirmed intraday lows logged separately,
  do not count as a confirmed checkpoint hit.
  CHECKPOINT 2 (1 November-31 December 2026): a rally is recorded when SPX either
  closes at least 5% above the October low for three consecutive sessions, or reclaims
  and holds its 50-day moving average for three consecutive sessions.
Neither calendar checkpoint can independently change the fragility score or this file's
own composite score.

THIS BLOCK IS CONTEXT AND A MANUAL FLAG, NOT A SCORED INDICATOR IN THIS FILE'S OWN 0-24
COMPOSITE. Part A is the higher confidence, more actionable half, now continuously
scanned hourly rather than checked only at session open, with direct relevance to
single name stop sizing in the current book. Part B is lower confidence, useful
background on why H2 might still skew positive despite Part A's caution, not a trading
signal on its own. If this block and the composite score disagree, or if Part A and
Part B point different directions, say so explicitly rather than defaulting to whichever
reads more reassuring, same standing rule as STEP 2B.
════════════════════════════════════════════════════════════════════

## STEP 3 — COMPOSITE SCORE (Claude calculates each session)

Score each indicator: GREEN=0, AMBER=1, RED=2
Maximum score = 24.

| # | Indicator | Green | Amber | Red | Current | Score |
|---|-----------|-------|-------|-----|---------|-------|
| 1 | SPX vs 50d MA | >3% above | 0-3% above | Below | ~+3.8% above (SPX 7,785.76 close 14 Aug vs 50d MA ~7,500) | 0 |
| 2 | SPX vs 200d MA | >5% above | 1-5% above | Below | ~+9.8% above (200d MA ~7,090) | 0 |
| 3 | SPX Fibonacci | Above 7,290 | 7,093-7,290 | Below 7,093 | 7,785.76 (14 Aug close, within 1% of 52wk/ATH 7,816.70) | 0 |
| 4 | VIX level | <20 | 20-30 | 30+ | 14.25 (14 Aug close, -2.60% that session) | 0 |
| 5 | VIX velocity | Falling | Flat | Spiking | Falling — 17.16 (13 Jul) to 14.25 (14 Aug), a full month trending down, not a single calm print | 0 |
| 6 | HY spreads | <350bp | 350-500bp | 500bp+ | 271bps (ICE BofA US HY OAS via FRED, 12 Aug) — freshly pulled, verified | 0 |
| 7 | 10yr yield | <4.5% | 4.5-5.0% | 5%+ | 4.68% (14 Aug close, tested 19-month high 4.75% mid-week) | 1 |
| 8 | 10yr trend | Falling | Flat | Rising | Rising — surged on Fed Chair Warsh commentary and renewed long-end aversion this week | 2 |
| 9 | CAPE ratio | <25x | 25-35x | 35x+ | ~41-42x (Aug 2026), second-highest reading in the index's history after Dec 1999 | 2 |
| 10 | Fed direction | Cutting | On hold | Hiking | On hold (held 3.50-3.75% 28-29 Jul, 9-3 vote, 3 dissents favoring hike); JPMorgan shifted base case to a Sept hike, Kalshi prices only 26% hike odds — genuine, live split | 1 |
| 11 | WTI oil | <$90 | $90-105 | $105+ | ~$81-82 (14 Aug), Hormuz naval blockade story remains active but has not moved price through the threshold | 0 |
| 12 | Market breadth | >65% | 40-65% | <40% | 58.3% of S&P 500/US equities above 50d MA (most recent hard figure, 7 Aug), 56.8% above 200d MA — confirmed AMBER with a real source, not the Russell-2000 proxy used at first pass. Likely modestly higher now given SPX's continued push to record highs since, but no more recent hard number found | 1 |

SCORE AS OF THIS TABLE'S LAST FULL REPULL (17 August 2026): 7/24, GREEN at the time — all twelve
inputs freshly sourced that session, including breadth. SUPERSEDED — see CURRENT STATUS at the
top of this file for today's authoritative score and regime. This table's per-indicator Green/
Amber/Red band DEFINITIONS remain the live scoring methodology; only the summary score/regime
below reflects the 17 August pull specifically, not today.
REGIME AT THAT PULL: GREEN (confirmed 17 Aug) — sat exactly on the GREEN/AMBER boundary by score;
judgment on new-entry sizing was advised to stay closer to AMBER-era discipline even then.
Caveat: indicator 12 was proxy-estimated at first pass that session, then confirmed against a real breadth source (58.3% above 50d MA, 7 Aug) within the same session.

Score thresholds:
  0-7:   GREEN — normal operations
  8-13:  AMBER — elevated caution, crash stress test required, thesis quality gating
  14-19: RED — no new entries, raise all stops, target 65-70% cash
  20-24: CRISIS — target 85-90% cash, crash shopping list only

---

## STEP 4 — TIER ACTION PROTOCOL

### AMBER — Score 8-13 (CURRENT)
- No new BUY limit orders left live GTC — live session entries only
- New entries require crash stress test — PASS = eligible, FAIL = universe only
- Raise stops on all profitable positions (done S59 weekend ✓)
- Exit positions where thesis has broken (PYPL ✓, SERV ✓, NVO ✓ Monday)
- Sizing: use judgment based on thesis conviction and insider signals
  — High conviction + crash stress test pass + strong insider signal = normal sizing
  — Weak thesis or fails stress test = reduce sizing or defer
- The 50% mechanical Tier 2 sizing rule is REMOVED. Judgment replaces it.
- BTC: monitor only — entry conditions not met

### RED — Score 14-19
- No new entries under any circumstances
- All stops mechanical — do not widen
- Target 65-70% cash
- Re-entry condition: score drops below 13 for 3 consecutive sessions

### CRISIS — Score 20-24
- Target 85-90% cash
- Crash shopping list entries only
- Re-entry: VIX below 25 AND SPX reclaims 200d MA with volume

---

## CRASH STRESS TEST — REQUIRED FOR ALL NEW ENTRIES WHILE SCORE >7

"CRASH STRESS TEST — [TICKER]
  Current price: $[X]
  If SPX drops 20%: what does [TICKER] do?
  If SPX drops 30%: what is the floor?
  Does the thesis survive a 12-month earnings recession?
  Quality compounder or momentum/narrative name?
  PASS / FAIL — reason stated"

PASS = eligible for entry at normal sizing, judgment applied
FAIL = universe only until score ≤7

---

## BTC ENTRY CONDITIONS MONITOR

Entry requires ALL THREE simultaneously:
  1. BTC price: $53,000–$58,000
  2. SPX: below 50-day MA (~7,156)
  3. Fear & Greed: sustained below 15 for ≥5 consecutive days

Current BTC: ~$60,949 — ~5% above entry zone ceiling
Current Scorecard B: ~5-6/9 — bearish, bottom likely not in
Strategy ETF outflows: 12 consecutive sessions — Scorecard B flag
Do NOT enter BTC on price alone. All conditions + scorecards required.

When BTC hits $58,000: run full three-condition check every session.

---

## KEY LEVELS TO WATCH

### SPX critical levels
  7,531 — prior wave high, first resistance
  7,290 — 0.236 Fibonacci, first real support
  7,093 — 0.382 Fibonacci, base case correction floor
  6,858 — 200-day moving average. Break = RED regime
  6,786 — 0.618 Fibonacci

### VIX levels
  20.0 — AMBER threshold
  25.0 — active alert level (breached intraday 5 June)
  30.0 — RED / crisis level

### 10yr Treasury yield
  4.50% — Amber threshold (breached)
  5.00% — RED threshold

### Key dates
  June 17 2026 — Fed meeting (Warsh's first). Hike language = immediate RED risk.
  June 24 2026 — Micron earnings.
  July 30 2026 — CEG earnings. P24 gate June 30.
  Aug 4 2026  — FRSH earnings. Margin recovery confirmation.
  Aug 12 2026 — HNR1 Q2 results.
  Aug 18 2026 — OKLO earnings.

---

## ADDITIONAL INDICATORS (TradingView)
  HYG  — High yield bond ETF (credit stress — most important early warning)
  MOVE — Bond market volatility (leads equity vol by 3-5 days)
  BTC  — Risk appetite proxy + entry trigger monitor
  USDJPY — Yen carry signal (break below 140 = crisis flag)

Current TradingView confirmed: VIX (CBOE:VIX) and TNX (TVC:TNX)

---

## SUSPEND PROTOCOL
To suspend: composite score ≤7 for 5 consecutive sessions AND VIX below 18.
Reactivate immediately if VIX spikes above 20 again.

---

## HISTORY LOG
  6 June 2026 — FILE CREATED. Status: AMBER-RED. Score: 12/24.
  Trigger: VIX 15→21.51 close (25.89 intraday). Jobs report 172K vs 80K est.
  Fed hike odds 57%. Broadcom AI guidance miss. SPX -2.64% Friday. Nasdaq -4.18%.
  Actions: PYPL/SERV exits. SNPS/CHG buy orders cancelled. Stops raised across portfolio.

  7 June 2026 — S60 WEEKEND UPDATE. Status softened to AMBER.
  VIX closing level corrected to 21.51 (not 25.89 — that was intraday spike).
  Score updated to 12-13/24. Tier 2 mechanical 50% sizing rule removed.
  Pragmatic caution framework adopted: crash stress test required but
  high-conviction entries with strong fundamentals and insider signals
  eligible at normal sizing per James's direction.
  NVO exit confirmed for Monday — ADA catalyst failed.
  FRSH ORDER REQUIRED Monday — $2,500, stop $8.00, 265 shares approx.
  FRSH crash stress test: PASS (essential ITSM, $844M cash, non-cyclical).
  CLS Stage 2 complete — DEFER, price not in zone ($427 vs $340-355 zone).
  OKLO Stage 1 complete - DEFER, pre-revenue speculative, Tier 2 regime.

  16 June 2026 - S69 dated note (not a full recalculation, see DECISION_REGISTER.md OKLO note for the ~4/24 figure produced this session in a different context). VIX 16.1-16.2, described externally as a low vol bull regime. WTI under $83, a three month low. SPX above its 50 day MA. Directionally this points further toward GREEN than the 7/24 carried from S67/S68, but the full 12 indicator composite (HY spreads, 10yr, CAPE, breadth, Fed direction) was not re-pulled in full today. Recalculate properly at S70 open rather than carrying forward either the 7/24 or this directional note as a confirmed score. FOMC outcome Wednesday 17 June is the swing factor either way.

  2 July 2026 - S85 FULL RECALCULATION (deferred from S84 per James's direction). Score dropped
  to 6/24, regime GREEN. The prior AMBER 12-13/24 had been stale since 16 June, carried through
  five sessions without a full twelve-indicator repull. VIX 16.59 (Jul 1 close), 10yr 4.475%, WTI
  $71.87, SPX 7,483 (+1.7% above 50d MA, +8.2% above 200d MA), HYG flat with no spread-widening
  signal. CAPE (~39-40x) and market breadth were carried/estimated, not freshly sourced this
  session — the two weakest indicators in the recalc, flagged for a cleaner pull next session.
  Practical effect: crash stress test is no longer mandatory for new entries, and the AMBER
  pragmatic-caution overlay lifts. This does not itself trigger the formal five-consecutive-
  session suspend condition — only one session of a sub-8 score is confirmed so far.

  10 July 2026 - S92 RECALCULATION, real deterioration, never written back to this file (see
  S96 entry below for the correction). Score rose to AMBER 9/24, driven by the 10yr yield/trend
  crossing into AMBER band, a VIX uptick, and Iran-driven oil volatility. DECISION_REGISTER.md
  and FUND_SESSION_STATE.md both carried this figure correctly going forward; this file itself
  was never updated, a real sync gap flagged explicitly in FUND_SESSION_STATE.md's own S92 open
  items and left open for four sessions until S96.

  14 July 2026 - S96 FULL RECALCULATION, closes the S92 sync gap and reflects genuine intervening
  deterioration, not just a stale write-back. Score moved to AMBER 11/24. Drivers: VIX spiked to
  17.16 (+14.17% in one session, 13 July) on renewed US-Iran strikes near the Strait of Hormuz
  over the weekend and fresh Iranian retaliation against Kuwait/Jordan/Qatar; 10yr yield rose to
  4.58% on its third consecutive up session; oil whipsawed $71-79 on active blockade-threat
  headlines; SPX fell 0.79% Monday with real divergence underneath (Dow -0.26% vs Nasdaq -1.55%,
  SK Hynix -9.32%), narrowing breadth rather than a broad move. HY spreads, CAPE, and breadth
  remain carried/estimated rather than freshly pulled — HYG is the highest-value fix for the next
  full recalc. Crash stress test is mandatory again on all new entries while this AMBER regime
  holds.

  14 July 2026 - S96W, STEP 2C ADDED (same evening as the S96 recalc, ad hoc research chat, not a
  numbered session). James forwarded technical trader charts on VIXEQ/VIX dispersion and NDR's
  2026 Cycle Composite. Verified both independently: VIXEQ-VIX spread/DSPX at a record level (44,
  highest since April 2025) while VIX itself stays moderate, and confirmed this is because traders
  have rotated attention from Iran macro risk to AI/earnings stock-specific risk, not because risk
  has fallen — directly relevant to this file's own VIX-based scoring, which would currently read
  the tape as calmer than the single-name book actually is. NDR cycle composite context added as
  lower-confidence background, with an explicit caveat that one independent tracker shows 2026's
  actual path correlating poorly with the textbook midterm-year shape right now. Does not change
  the 11/24 composite score. See STEP 2C for full detail and the two forward checkpoints (October
  low window, November-December rally window).

  14 July 2026 - S96W, STEP 2C DEFINITIONS SUPERSEDED, same evening. James built the dispersion
  and correlation logic into his existing external "Market Fragility Alert" scanner (ChatGPT-
  built, hourly weekday cadence), with materially more precise definitions than Claude's own
  first draft: three-tier warning states (DISPERSION EXTREME HOLDING, PRELIMINARY UNWIND WATCH,
  DISPERSION UNWIND RISK), a magnitude requirement on the VIX move (greater of 3pts or 15%, not
  just "rises"), COR3M correlation confirmation, two-session hysteresis, and DSPX/VIXEQ-VIX/COR3M
  correctly treated as one signal complex rather than three separate votes (DSPX is mathematically
  derived from VIX and VIXEQ, confirmed against Cboe's own methodology). Calendar checkpoints also
  sharpened to objective definitions (63-trading-day closing low; 5% above the October low for 3
  sessions or a held 50dma reclaim for 3 sessions). STEP 2C rewritten to record this logic. Open
  item, not yet resolved: whether the scanner's own fragility score should ever be integrated into
  this file's 0-24 composite, or stay a deliberately independent cross-check — default is to keep
  them independent until James says otherwise. Handoff protocol added: routine fires get raised at
  next session open, anything reaching DISPERSION UNWIND RISK plus COMPOSITE ESCALATION together,
  or coinciding with this file's own score crossing a regime boundary, warrants an ad hoc session.

  14 July 2026 - S96W, MARKET TURNING ALERT PROTOCOL added as a standing rule at the top of the
  file, per James's direct instruction. Resolves the open question left by the previous entry:
  scanner (ChatGPT, hourly, always running) is PRIMARY continuous coverage, Claude is BACKUP,
  session-bound only, cannot monitor markets or reach James outside an active conversation, stated
  as a structural limitation rather than implied away. New standing obligation: a quiet pulse check
  (VIX, SPX vs key levels, scanner state if available) at the start of every conversation in this
  project, surfaced immediately and before anything else if it finds a possible turn. This channel
  is deliberately separate from and faster than both the 0-24 composite score and the scanner's own
  fragility score, either Claude or the scanner independently believing the market is turning is
  sufficient to raise it, no requirement for the formal score to move first. Not yet cross-checked
  against SESSION_OPEN_PROTOCOL.md, flagged for alignment next time that file is read.

---
*Created: S59 | 6 June 2026 | Claude via filesystem MCP*
*Last updated: S60 WEEKEND | 7 June 2026*
*Read at: every session open, after DECISION_REGISTER.md, while status AMBER, RED, or CRISIS
(S110: reconciled from the legacy "ELEVATED" term to this file's own current GREEN/AMBER/RED/
CRISIS vocabulary — wording only, the underlying conditional is unchanged)*
*Next review: Monday 9 June 2026 — update score based on VIX and SPX open*
