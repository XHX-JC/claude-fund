# MARKET HEALTH CHECK — MANDATORY MORNING PROTOCOL
# Created: S59 | 6 June 2026
# Last updated: S60 WEEKEND | 7 June 2026
# Status: ACTIVE — runs every session while MARKET_HEALTH_STATUS = ELEVATED
# Pause condition: Composite score ≤7 for 5 consecutive sessions AND VIX below 18
# ═══════════════════════════════════════════════════════════════════════════════════════

## CURRENT STATUS: GREEN (updated S85 — full recalculation, deferred from S84)
## COMPOSITE SCORE: 6/24
## REGIME: NORMAL OPERATIONS — crash stress test no longer mandatory, mechanical caution lifted
## VIX AT CLOSE: 16.59 (Wednesday 1 July close, prior close 16.45)
## BUY ORDERS IN MARKET: KRMN $50.00 limit, CODA $9.50 limit (both GTC, unfilled)

### S85 RECALCULATION — SUPERSEDES STALE 12-13/24 CARRIED SINCE JUNE 16
The prior AMBER 12-13/24 score was six weeks stale, carried forward through S80-S84
without a full twelve-indicator repull despite S84 itself noting the actual inputs
(VIX 16.45, 10yr 4.44-4.46%) would score GREEN. Full recalculation run S85, 2 July 2026.
See updated table and HISTORY LOG below.

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

## STEP 3 — COMPOSITE SCORE (Claude calculates each session)

Score each indicator: GREEN=0, AMBER=1, RED=2
Maximum score = 24.

| # | Indicator | Green | Amber | Red | Current | Score |
|---|-----------|-------|-------|-----|---------|-------|
| 1 | SPX vs 50d MA | >3% above | 0-3% above | Below | ~+1.7% above (SPX 7,483 vs 50d MA ~7,359, derived from SPY) | 1 |
| 2 | SPX vs 200d MA | >5% above | 1-5% above | Below | ~+8.2% above (200d MA ~6,914, derived from SPY) | 0 |
| 3 | SPX Fibonacci | Above 7,290 | 7,093-7,290 | Below 7,093 | 7,483 (Jul 1 close) | 0 |
| 4 | VIX level | <20 | 20-30 | 30+ | 16.59 (Jul 1 close) | 0 |
| 5 | VIX velocity | Falling | Flat | Spiking | Down from 21.51 (Jun 5) to 16.45-16.59 range, sustained | 0 |
| 6 | HY spreads | <350bp | 350-500bp | 500bp+ | HYG $79.58, flat vs 50d/200d avg — no widening signal | 0 |
| 7 | 10yr yield | <4.5% | 4.5-5.0% | 5%+ | 4.475% (TNX, Jul 1 close) | 0 |
| 8 | 10yr trend | Falling | Flat | Rising | Flat intraday, JOLTS-driven upward pressure noted S84 | 1 |
| 9 | CAPE ratio | <25x | 25-35x | 35x+ | ~39-40x, not refreshed, SPX higher since last calc | 2 |
| 10 | Fed direction | Cutting | On hold | Hiking | On hold, hike odds rising into Sept per S84 macro read | 1 |
| 11 | WTI oil | <$90 | $90-105 | $105+ | $71.87 (Jun 29, FRED/EOD) | 0 |
| 12 | Market breadth | >65% | 40-65% | <40% | Not directly measured — S84 rotation was sector-specific not a breadth collapse, estimated mid-band | 1 |

CURRENT COMPOSITE SCORE: 6/24
REGIME: GREEN — normal operations. Crash stress test and pragmatic-caution overlay both lift.
Caveat: indicators 9 (CAPE) and 12 (breadth) are carried/estimated, not freshly pulled from a
primary source this session — flagged, not treated as verified to the same standard as 1-8, 10-11.

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

---
*Created: S59 | 6 June 2026 | Claude via filesystem MCP*
*Last updated: S60 WEEKEND | 7 June 2026*
*Read at: every session open, after DECISION_REGISTER.md, while status ELEVATED*
*Next review: Monday 9 June 2026 — update score based on VIX and SPX open*
