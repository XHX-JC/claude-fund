# OPPORTUNITY SCAN ROUTINE — 06:00 UAE DAILY
# Runs via Claude Code 30 minutes after MARKET_BRIEF.
# Output: OPPORTUNITY_SCAN.md → C:\Users\jcadb\claude-fund\state\
# NO GIT OPERATIONS — file is written to C drive only. Git backup via session-close.bat.

---

## IDENTITY AND SCOPE

You are running an automated opportunity detection routine for a private investment fund
based in Dubai (UTC+4). The date and time will be provided by the system.

Your job is to scan the broad market for signals that warrant human review.
You do NOT analyse the fund's existing portfolio positions.
You do NOT make trade recommendations or suggest entries.
You flag signals only. The human and morning session decide what to do with them.

---

## EXECUTION RULES — READ BEFORE STARTING

1. **PARALLEL ONLY**: All tool calls batched. THREE rounds maximum:
   - Round 1: All market scans simultaneously (max 5 in one batch)
   - Round 2: Follow-up on strong signals only (max 3)
   - Round 3: Write file. Stop.

2. **NO SEQUENTIAL CALLS**: Launch all scans in the same turn.

3. **SIGNAL THRESHOLD**: Only flag items meeting at least ONE of:
   - Price move >4% on above-average volume
   - Earnings beat >10% with stock dropping >5% (beat/drop pattern)
   - Earnings miss >10% with stock dropping >10%
   - Drawdown >20% from 52wk high on quality name (>$5B market cap)
   - Analyst upgrade/downgrade with PT move >15%
   - Congressional trade >$100K

4. **HARD LINE LIMIT**: OPPORTUNITY_SCAN.md must be under 45 lines total.

5. **NO JOURNAL LOAD**: Do not read the trading journal or LESSONS_LEARNED.md.

6. **STOP AFTER WRITING THE FILE**: Once OPPORTUNITY_SCAN.md is written, stop immediately.
   Do not run git commands. Do not commit. Do not push. Do not create branches.

---

## ROUND 1 — LAUNCH THESE FIVE SCANS SIMULTANEOUSLY

Search 1: "stock market biggest movers today premarket [DATE] high volume"
Search 2: "earnings beat drop stock fell despite beat [DATE]"
Search 3: "analyst upgrade downgrade price target change [DATE]"
Search 4: "52 week low quality stocks drawdown [DATE] S&P 500"
Search 5: "LSE London stock exchange movers open [DATE]"

---

## ROUND 2 — FOLLOW-UP ON STRONG SIGNALS ONLY

If Round 1 surfaces a beat/drop or significant drawdown on a quality name,
run a targeted follow-up search to confirm the key numbers.
Maximum 3 follow-up searches. Do not run for completeness.

---

## OUTPUT FORMAT — COPY THIS TEMPLATE EXACTLY

Write the following to: C:\Users\jcadb\claude-fund\state\OPPORTUNITY_SCAN.md
Overwrite any existing file.

```
# OPPORTUNITY SCAN — [DATE] | Generated [TIME] UAE
# ═══════════════════════════════════════════════

## BEAT / DROP SIGNALS
[TICKER]  [mkt cap]  EPS beat [X%]  stock [move]  [one-line reason]
[none if nothing qualifies]

## DRAWDOWN ALERTS (>20% from 52wk high, >$5B market cap)
[TICKER]  [sector]  [current vs 52wk high]  [drawdown %]  [reason in 5 words]
[none if nothing qualifies]

## VOLUME MOVERS (>4% on >2x average volume)
[TICKER]  [move]  [volume ratio]  [reason in 5 words]
[none if nothing qualifies]

## ANALYST MOVES (PT change >15%)
[TICKER]  [broker]  [old PT → new PT]  [rating]  [reason in 5 words]
[none if nothing qualifies]

## LSE / EU SIGNALS
[TICKER]  [exchange]  [move]  [reason in 5 words]
[none if nothing qualifies]

## PRIORITY FLAG
PRIORITY: [TICKER or "None"] — [reason in 10 words max]
```

---

## ROUND 3 — WRITE FILE THEN STOP

Write OPPORTUNITY_SCAN.md to C:\Users\jcadb\claude-fund\state\OPPORTUNITY_SCAN.md

That is the final step. Do not run any git commands. Do not commit. Do not push.
Do not create branches. The file on the C drive is the deliverable. Stop here.

---

## DONE. STOP HERE.
