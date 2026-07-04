# OPPORTUNITY SCAN ROUTINE — 06:00 UAE DAILY
# Runs via Claude Code 30 minutes after MARKET_BRIEF.
# Output: OPPORTUNITY_SCAN.md → see OUTPUT PATH RESOLUTION below. Dual-machine setup, added S86W
# second pass, 4 July 2026: James runs this fund from a PC (user profile "James Cadbury") most of
# the time, but works off a laptop (user profile "jcadb") for extended stretches, confirmed a
# month-long laptop period starting in two weeks. One hardcoded path breaks every time the machine
# changes. This file now tries both, in order, at every run.
# CORRECTED S86W, 4 July 2026: this file previously pointed to C:\Users\jcadb\claude-fund\state\,
# a local, non-Dropbox path with no relation to either machine's synced folder. That specific path
# is now retired entirely, not used as a fallback. Do not resurrect it.
# NO GIT OPERATIONS — file is written to a Dropbox path only. Git backup via session-close.bat
# if still applicable; confirm this still applies post-correction.

---

## OUTPUT PATH RESOLUTION — TRY IN ORDER, USE THE FIRST THAT RESOLVES

Before Round 3, resolve the output path. Do not assume which machine is running this task.

PATH A (PC, "James Cadbury" profile): C:\Users\James Cadbury\Dropbox\Claude-Fund\state\
PATH B (laptop, "jcadb" profile):     C:\Users\jcadb\Dropbox\Claude-Fund\state\

Source for Path B: DECISION_REGISTER.md standing note ("FILESYSTEM MCP — USE LOWERCASE ONLY"),
which states this is the real, live Dropbox-synced path on the jcadb profile, not a stale clone.
That note has not been independently re-verified against the laptop itself as of this writing.
Medium-high confidence, sourced from the fund's own prior documentation, not a fresh guess.
If it turns out wrong, correct it here and only here, do not let a second stale path accumulate.

RESOLUTION LOGIC:
1. Attempt to confirm Path A exists (the state\ directory is reachable, DECISION_REGISTER.md is
   visible inside it as a sanity check that this is genuinely the live fund folder, not an empty
   or wrong directory of the same name).
2. If Path A resolves, use it. Write there. Do not also write Path B, this is not a redundancy
   scheme, it is a fallback.
3. If Path A does not resolve, attempt Path B with the same sanity check.
4. If neither resolves, do NOT guess a third location and do NOT write a partial/empty file.
   Stop and surface the failure explicitly at the top of the next thing James reads, rather than
   silently producing nothing, which is indistinguishable from "ran clean, found no signals."
5. Whichever path is used, the FIRST LINE of the written OPPORTUNITY_SCAN.md must record which
   one, e.g. "# Written via PATH A (PC)" or "# Written via PATH B (laptop)". This is the only way
   anyone reading the file later can tell which machine actually ran the task, since the content
   format is otherwise identical either way.

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

Write the output to whichever path resolved in OUTPUT PATH RESOLUTION above, prefixed with the
PATH A/PATH B marker line as specified there.
Overwrite any existing file at that path.

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

Write OPPORTUNITY_SCAN.md to the path resolved in OUTPUT PATH RESOLUTION above.

That is the final step. Do not run any git commands. Do not commit. Do not push.
Do not create branches. The file at the resolved Dropbox path is the deliverable. Stop here.

---

## DONE. STOP HERE.
