# MARKET HEALTH CHECK — MANDATORY MORNING PROTOCOL
# Created: S59 | 6 June 2026
# Last updated: S60 WEEKEND | 7 June 2026
# Status: ACTIVE — runs every session while MARKET_HEALTH_STATUS = ELEVATED
# Pause condition: Composite score ≤7 for 5 consecutive sessions AND VIX below 18
# ═══════════════════════════════════════════════════════════════════════════════════════

## CURRENT STATUS: AMBER (updated S60 — softened from AMBER-RED)
## COMPOSITE SCORE: 13/24
## REGIME: ELEVATED CAUTION — pragmatic entry approach
## VIX AT CLOSE: 21.51 (Friday 5 June — spike day was intraday high 25.89, not close)
## BUY ORDERS IN MARKET: NONE

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

Score each indicator: GREEN=0, AMBER=1, RED=2
Maximum score = 24.

| # | Indicator | Green | Amber | Red | Current | Score |
|---|-----------|-------|-------|-----|---------|-------|
| 1 | SPX vs 50d MA | >3% above | 0-3% above | Below | +3.2% above | 1 |
| 2 | SPX vs 200d MA | >5% above | 1-5% above | Below | +7.5% above | 0 |
| 3 | SPX Fibonacci | Above 7,290 | 7,093-7,290 | Below 7,093 | ~7,346 | 1 |
| 4 | VIX level | <20 | 20-30 | 30+ | 21.51 (close) | 1 |
| 5 | VIX velocity | Falling | Flat | Spiking | Spiked then partially recovered | 1 |
| 6 | HY spreads | <350bp | 350-500bp | 500bp+ | ~285bp | 0 |
| 7 | 10yr yield | <4.5% | 4.5-5.0% | 5%+ | 4.55% | 1 |
| 8 | 10yr trend | Falling | Flat | Rising | Rising since Jan | 2 |
| 9 | CAPE ratio | <25x | 25-35x | 35x+ | ~39x | 2 |
| 10 | Fed direction | Cutting | On hold | Hiking | 57% hike odds | 1 |
| 11 | WTI oil | <$90 | $90-105 | $105+ | ~$96 | 1 |
| 12 | Market breadth | >65% | 40-65% | <40% | ~55% | 1 |

CURRENT COMPOSITE SCORE: 12/24
REGIME: AMBER — elevated caution, pragmatic entries permitted

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
  OKLO Stage 1 complete — DEFER, pre-revenue speculative, Tier 2 regime.

---
*Created: S59 | 6 June 2026 | Claude via filesystem MCP*
*Last updated: S60 WEEKEND | 7 June 2026*
*Read at: every session open, after DECISION_REGISTER.md, while status ELEVATED*
*Next review: Monday 9 June 2026 — update score based on VIX and SPX open*
