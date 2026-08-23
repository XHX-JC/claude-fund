# ANALYST WATCH — TOP TIER RATINGS TRACKING
# Created: S90 | 9 July 2026 | Claude via filesystem MCP, per James's explicit instruction
# Status: PERMANENT, checked at the start of every session, fast and cheap by design
# Read at: every session open, alongside SESSION_BRIEF.md and OPPORTUNITY_SCAN.md
# ═══════════════════════════════════════════════════════════════════

## ORIGIN

James's instruction, S90: track top tier analyst output as a standing input, not a one-off
check. Two distinct tracks, different cadence, same session-open habit.

## TRACK 1 — BERT HOCHFELD, WEEKLY

Seeking Alpha contributor, publishes roughly weekly, exclusively information technology,
enterprise software, and AI infrastructure names. Top 0.1% TipRanks ranked for IT stock
selection per his own Seeking Alpha bio. TipRanks blogger page independently shows 71.77%
success rate across 122 stocks covered. Formerly ran Hochfeld Independent Research Group
(clients included Fidelity, Columbia Asset, SAC Capital) and the Hepplewhite Fund, rated
best performing small cap fund for the five years ending 2011 by Hedge Fund Research. On
the record for completeness, not as a reason to discount current work: convicted in 2012
of misappropriating funds from a hedge fund he operated. Seeking Alpha continues to
publish him and TipRanks continues to independently verify a strong track record since.

CHECK: web search "Bert Hochfeld [current month year]" or fetch
seekingalpha.com/author/bert-hochfeld/analysis, once per week, not every session. Note any
new ticker, the direction of the call (buy/sell/contrarian), and whether it touches a name
already in DECISION_REGISTER.md or the fund's held book. Flag for investigation if either.

ACCESS CONFIRMED S90: tested directly, not assumed. The author listing page
(seekingalpha.com/author/bert-hochfeld/analysis) fetches cleanly, full headline, ticker,
and date history. Individual article pages are metered, not fully blocked: his summary
bullets (his actual thesis, three to four lines), his own position disclosure, and the
opening sentence or two come through, then the article cuts off behind Seeking Alpha's
subscription wall. Confirmed on a live MSFT piece same session: bullish call, Azure and
Copilot adoption plus an AI infrastructure backlog tied to OpenAI commitments, consensus
seen as understating MSFT's revenue trajectory, all visible from the free preview alone.
This is sufficient for the check as designed, ticker, direction, and one line of reasoning
is all Step 3G asks for. His own detailed reasoning was never going to anchor a conviction
rating regardless, same V1-S source hierarchy as everywhere else in this fund, his call is
a lead, primary sources (10-Q/8-K/agency releases) are what a rating gets built on.

Recent coverage pattern (as of S90, for reference, not a current recommendation): MSFT,
NOW, ORCL, NBIS, PGY, ESTC, PCOR, AXON, ANET, dynatrace/GTLB/JAMF era coverage further
back. Enterprise software and AI infra names is the consistent lane.

## TRACK 2 — TIPRANKS VERIFIED TOP ANALYSTS, EVERY SESSION

Source: TipRanks verified win rate ranking, screenshot provided by James S90. Check for
any NEW rating from these five, every session, fast, not a deep dive unless something
material turns up.

| Rank | Analyst | Firm | Sector bias | Success rate | Profitable ratings | Avg return |
|------|---------|------|-------------|---------------|---------------------|------------|
| 1 | Brian Brophy | Stifel Nicolaus | Engineering/construction/industrial (CORRECTED 21 Aug 2026 — TipRanks bio confirms actual coverage is MasTec/MTZ, MYR Group/MYRG, Quanta Services/PWR, not software/services as originally logged S90; source error, not a coverage change) | 85% | 127/149 | not fully visible in source |
| 2 | Asiya Merchant | Citi | Technology | 80% | 161/201 | +126.2% |
| 3 | Atif Malik | Citi | Semis/technology | 80% | 395/496 | +51.1% |
| 4 | Keith Horowitz | Citi | Financials | 79% | 218/275 | +16.6% |
| 5 | Timothy Arcuri | UBS | Semis/technology | 79% | 383/487 | profile shows 79%, recent articles around 50% avg return |

CHECK: web search each name plus "rating" or "price target" if a fast combined query
misses anything, batched into 1-2 searches per session, not five separate ones, cost
discipline applies here the same as everywhere else in this fund. Flag any rating that
touches a held position or a name already on DECISION_REGISTER.md.

## HOW THIS RUNS AT SESSION OPEN

0. **CORRECTION LOGGED 21 AUGUST 2026, James's explicit instruction:** this check exists to
   surface NEW names worth investigating, not to filter for names already on the fund's radar.
   An earlier session-open run screened out a fresh hit (MRVL) on the grounds it wasn't already
   a held or register name — wrong, that's the opposite of the point. Every fresh name goes
   through steps 3-4 below regardless of whether it touches existing coverage.
1. Every session: run the Track 2 batched search for the five named analysts.
2. Once a week (track the date below, don't re-run early): run the Track 1 Hochfeld check.
3. Anything that touches a held position or register name goes straight into that name's
   DECISION_REGISTER.md entry, same session, not deferred.
4. Anything on a fresh name gets logged in the table below and treated the same as an
   OPPORTUNITY_SCAN.md item, verify before acting, not before logging.
5. This must stay fast. If it starts taking real time or many search calls, that is itself
   a signal to simplify the method, not to skip the check.

LAST HOCHFELD CHECK RUN: S90 | 9 July 2026 (this entry, establishing the file, no prior
baseline to compare against)

## LOG

| Date | Analyst | Ticker | Call | Touches held/register name? | Action |
|------|---------|--------|------|------------------------------|--------|
| 21 Aug 2026 | Malik (Citi) | MU | Buy, $1,150 PT (cut from $1,400, 6 Aug, rating held) — DRAM/NAND tightness, AI memory demand | No, fresh name | Worth Stage 1 — real $475 spread vs. Arcuri's target same week is a live analyst disagreement, not consensus. Adjacent to existing AI-infra tilt (COHR/LITE/NBIS) via a different input (memory, not optics). Logged, not yet run. |
| 21 Aug 2026 | Arcuri (UBS) | MU | Buy, $1,625 PT, raised mid-Aug, ~88% implied upside | No, fresh name | Same MU entry above. |
| 21 Aug 2026 | Arcuri (UBS) | MRVL | Most recent call date unconfirmed — two sources disagree (Feb 2026 vs. 16 Aug 2026), rating/direction not captured either | No, fresh name | NOT actionable, data conflict unresolved. Needs one targeted follow-up search before promoting or dropping. |
| 21 Aug 2026 | Horowitz (Citi) | CFG | Buy, PT raised $50→$58, explicitly named his "favorite regional bank play" — forward-swap headwinds peak Q3, fixed-rate repricing tailwind into book-value growth | No, fresh name | Worth Stage 1 — single-analyst conviction call, not crowded/consensus, and a real macro pairing candidate against the fund's own rates-cycle thesis (AMBER regime, 10yr trend RED per today's MARKET_HEALTH_CHECK.md recalc). Logged, not yet run. |
| 21 Aug 2026 | Brophy (Stifel) | LMB | Buy maintained, PT cut $107→$86 (small-cap, mechanical/HVAC services) | No, fresh name | Lower priority, mixed signal (cut + hold rating), logged not pursued. |
| 21 Aug 2026 | Merchant (Citi) | SNDK | Hold, PT raised $33→$39 | No, fresh name | Low priority, Hold rating despite the raise, not a buy signal. Logged not pursued. |
| 9 Jul 2026 (S90) | N/A | N/A | File created this session, no live check run yet, next session open is the first real pass | N/A | N/A |

---

*Created: S90 | 9 July 2026 | Claude via filesystem MCP*
*Read and updated at every session open.*
