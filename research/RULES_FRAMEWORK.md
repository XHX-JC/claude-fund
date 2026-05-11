# RULES FRAMEWORK — TIER CLASSIFICATION
**Established: Session 39 Pre-Open | Saturday 9 May 2026**
**Reviewed monthly per SI-69 — first session of each month**

---

## GOVERNING META-RULE

**T25 — Rule rigidity vs conviction (S35)**
Rules exist to prevent specific errors, not to be applied mechanically regardless of context.
When mechanical application contradicts intent, intent governs. Document override explicitly.
ALL rules below are subject to T25. No rule is exempt from logic testing.

---

## TIER 1 — HARD RULES
*Objective, factual, or catastrophic-risk-prevention. Non-negotiable. Not context-dependent.*

| Rule | Description |
|------|-------------|
| E1 | Timezone verification — market hours are facts, not interpretations |
| E2 | IBKR screenshot = ground truth. No memory or journal entry overrides live data |
| E8 / E20 | Live prices from IBKR only during market hours |
| E9 | Cancel GTC stop BEFORE market sell or immediately on fill confirmation |
| E11 | Never state 52-week range from memory. Use EOD:get_us_live_extended_quotes |
| E22 | Adversary state media requires CENTCOM/western primary source before journaling |
| SI-47 | State today's date explicitly. Step zero. Every session. |
| T22 | Critical minerals concentration ceiling: CRML + LAC + UUUU = maximum |
| T23 | No stop movement 48-72h before earnings. Accept the binary. |
| SI-68 | No session close files until user confirms complete + final IBKR screenshots provided |

---

## TIER 2 — STRONG GUIDANCE
*Sound rationale, default behaviour. Exceptions legitimate but require explicit documentation.*

| Rule | Description | Notes |
|------|-------------|-------|
| P20 (AMENDED) | Stop protection on winners — see amendment below | Activation threshold added |
| SI-35 | $500 max loss per trade | Scale to 0.5% net liquidity as portfolio grows |
| SI-37 | Speculative position cap $1,500 cost | Scale proportionally with SI-35 |
| T10 | Thesis determines entry. Stop distance determines sizing. Never conflate. | |
| T14 | Never chase premarket. Hold the limit. | |
| T15 | Broken thesis exit at market next open (within 5% of breakeven + impaired thesis) | "Impaired" must be defined at entry, not retroactively |
| T28 | Stop-out ≠ thesis break. A disciplined exit on noise does not change the investment case. | Most important anti-panic rule |
| T7 | Be honest about why you own each position. Don't let thesis excitement inflate count. | Replaces rigid Pool A/B framing |
| T8 | Named short seller report: do not enter the target | |
| SI-39 | Drawdown screener -15% to -20% from 52wk ATH. Every session. | |
| SI-45 | Weekly screener. First session of every week. Cannot be deferred. | See SCANNING_FRAMEWORK.md |
| SI-69 | Monthly rule review. First session of each month. | New S39 |

---

## TIER 3 — CONTEXTUAL GUIDANCE
*Useful principles from specific incidents. Apply judgment. Some will become obsolete.*

| Rule | Description | Status |
|------|-------------|--------|
| T1-T3, T17 | Hormuz/WTI specific rules | Will be removed session after SI-25 triggers |
| T9 | MSTR mNAV thesis | Position-specific. Remove when MSTR exited |
| T12 / T19 / SI-48 | ATH entry rules — CONSOLIDATED (see below) | Replaces three contradictory rules |
| T21 | Stop review triggers — superseded by amended P20 | Reference amended P20 instead |
| T26 | Tier-1 competitor investment: same-week Stage 1 (not same-session) | Amended S39 |
| T27 | Deep turnaround pattern recognition | Good guidance, not mandatory |
| P24 | V re-entry parameters | V-specific, will self-expire |
| T5-T8, T13 | Various session-specific lessons | Contextual reminders |

---

## P20 AMENDMENT — S39

**Original formula:** cost + ((current − cost) × 0.50) = minimum stop

**Problem:** Applied to small gains (< 10%), forces stops so tight they trigger on daily noise rather than thesis breaks. A 3% gain with 50% protection leaves 1.5% room — not meaningful protection.

**Amendment:**

| Gain from entry | P20 application |
|-----------------|----------------|
| < 10% | P20 does not apply. Stop held at entry-based technical level or cost protection. |
| 10–20% | P20 minimum applies, but stop must be at least 5% below current price |
| > 20% | Full P20: protect 50% of gain. No override except documented exceptions (P14, M&A) |

**Documented exceptions:** P14 (catalyst timing, deliberate), M&A holdouts (maximum room strategy)

**E16 update:** References to "stop staleness review" now use the amended P20 thresholds above.

---

## ATH ENTRY RULE — CONSOLIDATED (replaces T12, T19, SI-48)

**Principle:** Entry near 52-week or all-time highs requires explicit documentation of:
1. Why the current price is not the peak (valuation support or forward catalyst)
2. A meaningful entry zone below current with defined stop
3. Reduced position sizing proportional to distance from that zone

This applies universally. The AI carve-out (SI-48) is not a separate rule — it is an example of applying point 1 (valuation defensible + structural catalyst). All three prior rules are retired.

---

## SI-35 SCALING NOTE

Current cap: $500 max loss per trade = 0.47% of $105K portfolio.
The principle (risk per trade as % of portfolio) is correct. The fixed dollar amount should be reviewed when net liquidity exceeds $150K and reset to 0.5% of net liquidity at that point.
Congressional review trigger: first session after net liquidity crosses $150K.

---

## MONTHLY REVIEW PROTOCOL (SI-69)

First session of each month, alongside SI-65 (Milestone Calendar):

1. **Test rules that fired** — did the outcome validate the rule?
2. **Flag rules that didn't fire** — still relevant or now obsolete?
3. **Check for contradictions** — do any two rules say different things about the same situation?
4. **Sunset candidates** — any rule not fired in 3 months and not structurally essential → demote or remove
5. **Hormuz rules** — T1-T3, T17 flagged for removal after SI-25 triggers

Output: one paragraph in session notes, not a compliance table.
