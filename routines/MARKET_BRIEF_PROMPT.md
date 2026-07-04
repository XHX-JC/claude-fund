# MARKET BRIEF ROUTINE — 05:30 UAE DAILY
# Runs via Claude Code.
# Output: SESSION_BRIEF.md → see OUTPUT PATH RESOLUTION below. Dual-machine setup, corrected S86W
# 4 July 2026, same fix as OPPORTUNITY_SCAN_PROMPT.md: James runs this fund from a PC (user
# profile "James Cadbury") most of the time, and from a laptop (user profile "jcadb") for
# extended stretches, confirmed a month-long laptop period starting mid-July 2026. This file
# previously hardcoded C:\Users\jcadb\claude-fund\state\, a local non-Dropbox path unrelated
# to either machine's synced folder. Retired entirely, not used as a fallback.
# NO GIT OPERATIONS — file is written to a Dropbox path only. NOTE: routine-push.bat still
# hardcodes the old jcadb\claude-fund path for its git push step and is now orphaned relative
# to this fix — flagged separately, not corrected here, needs a direct decision on whether to
# repoint it or retire it now that Dropbox itself is the sync layer.

---

## OUTPUT PATH RESOLUTION — TRY IN ORDER, USE THE FIRST THAT RESOLVES

Same logic as OPPORTUNITY_SCAN_PROMPT.md, kept identical across both files deliberately so
they never drift out of sync with each other.

PATH A (PC, "James Cadbury" profile): C:\Users\James Cadbury\Dropbox\Claude-Fund\state\
PATH B (laptop, "jcadb" profile):     C:\Users\jcadb\Dropbox\Claude-Fund\state\

Source for Path B: DECISION_REGISTER.md standing note ("FILESYSTEM MCP — USE LOWERCASE
ONLY"). Medium-high confidence, sourced from the fund's own prior documentation, not
independently verified against the laptop itself as of this writing.

RESOLUTION LOGIC:
1. Confirm Path A resolves (state\ directory reachable, DECISION_REGISTER.md visible inside
   it as a sanity check this is the live fund folder, not an empty directory of the same name).
2. If Path A resolves, use it, write there, stop. This is a fallback, not a dual-write scheme.
3. If Path A does not resolve, attempt Path B with the same sanity check.
4. If neither resolves, do NOT guess a third location and do NOT write a partial/empty file.
   Surface the failure explicitly rather than silently producing nothing.
5. The FIRST LINE of the written SESSION_BRIEF.md must record which path was used, e.g.
   "# Written via PATH A (PC)" or "# Written via PATH B (laptop)".

---

## IDENTITY AND SCOPE

You are running an automated pre-market intelligence routine for a private investment fund
based in Dubai (UTC+4). The date and time will be provided by the system.

Your job is to gather broad market intelligence and write a structured flat-file brief.
You do NOT analyse the fund's portfolio positions — that happens in the morning session.
You do NOT make trade recommendations.
You output data only, in the exact format specified below.

---

## EXECUTION RULES — READ BEFORE STARTING

1. **PARALLEL ONLY**: All tool calls must be batched. You have THREE rounds maximum:
   - Round 1: All web searches simultaneously (max 5 searches in one batch)
   - Round 2: Any follow-up fetches simultaneously (max 3)
   - Round 3: Write file. Stop.

2. **NO SEQUENTIAL CALLS**: Do not run one search, read the result, then run the next.
   Launch all searches in the same turn.

3. **NO NARRATIVE**: Do not write prose explanations. Tables and single-line flags only.

4. **HARD LINE LIMIT**: SESSION_BRIEF.md must be under 55 lines total.

5. **NO JOURNAL LOAD**: Do not read the trading journal. Do not read LESSONS_LEARNED.md.
   DOWNGRADED S86W same day: do not read intelligence\hormuz_log.md daily any more, Hormuz
   is no longer a daily output item, James's call, oil has largely repriced and general macro
   fragility is the higher-priority read now. Instead read MARKET_HEALTH_CHECK.md Step 2B
   (margin debt growth, momentum/factor divergence, Market Cap/M2 ratio) and carry its current
   manual-flag reading into the new MARKET FRAGILITY section below.

6. **STOP AFTER WRITING THE FILE**: Once SESSION_BRIEF.md is written, stop immediately.
   Do not run git commands. Do not summarise. Do not reflect. Do not make additional calls.

---

## ROUND 1 — LAUNCH THESE FIVE SEARCHES SIMULTANEOUSLY

Search 1: "WTI crude oil price today [DATE] Hormuz Iran"
Search 2: "US stock market overnight futures premarket [DATE]"
Search 3: "earnings results yesterday after hours beats misses [DATE]"
Search 4: "congressional stock trades disclosed this week site:capitoltrades.com"
Search 5: "AI model release announcement this week 2026"

---

## ROUND 2 — FOLLOW-UP ONLY IF NEEDED

Only run Round 2 if critical data is missing from Round 1 results.
Maximum 3 searches. Only run if data is genuinely absent — not for completeness.

---

## OUTPUT FORMAT — COPY THIS TEMPLATE EXACTLY

Write the output to whichever path resolved in OUTPUT PATH RESOLUTION above, prefixed with the
PATH A/PATH B marker line as specified there.
Overwrite any existing file at that path.

```
# SESSION BRIEF — [DATE] | Generated [TIME] UAE
# ═══════════════════════════════════════════════

## MACRO
WTI:        $[price]/bbl  | Prev close: $[prev]
Brent:      $[price]/bbl
Futures:    S&P [+/-X%]  Nasdaq [+/-X%]  Dow [+/-X%]  (premarket)
DXY:        [level]
VIX:        [level]

## MARKET FRAGILITY (ADDED S86W — replaces daily Hormuz section, higher priority now)
Margin debt: [most recent FINRA MoM growth rate, flag if 5%+ two months running]
Factor risk: [any named momentum/high-beta index move 10%+ in 1-2 sessions with VIX flat/down]
Cap/M2:     [current US Total Market Cap / M2 ratio, flag if new high]
Read:       [ONE LINE — does this agree or disagree with MARKET_HEALTH_CHECK.md's composite
            score this week? State explicitly if they diverge, do not default to the more
            reassuring reading]

## HORMUZ (DOWNGRADED S86W — one line only, no longer a daily deep section)
Status:     [ONE LINE only — skip entirely if intelligence\hormuz_log.md's most recent entry
            is under 30 days old and nothing material changed, do not manufacture a line]

## EARNINGS RESULTS (past 24h — beats and misses only, >$5B market cap)
[TICKER]  [beat/miss]  EPS [actual] vs [est]  Rev [actual] vs [est]  AH [+/-X%]
[none if no relevant results]

## EARNINGS THIS WEEK (upcoming — fund-relevant only)
[DATE]  [TICKER]  [AMC/BMO]  [consensus EPS]  [note if held position]

## AI / TECH SIGNALS
[ONE LINE per item — model releases, major infra announcements, regulatory moves]
[none if nothing material]

## CONGRESSIONAL TRADES (past 72h, >$50K)
[REP/SEN NAME]  [BUY/SELL]  [TICKER]  [$RANGE]  [DATE FILED]
[none if nothing material]

## SECTOR FLAGS (moves >4% on volume — broad market only)
[SECTOR/TICKER]  [move]  [reason in 5 words max]
[none if nothing material]

## OPEN ACTIONS FROM PRIOR SESSION
[Read FUND_SESSION_STATE.md — copy SESSION PRIORITIES list verbatim, max 5 items]
```

---

## ROUND 3 — WRITE FILE THEN STOP

Write SESSION_BRIEF.md to the path resolved in OUTPUT PATH RESOLUTION above.

That is the final step. Do not run any git commands. Do not commit. Do not push.
Do not create branches. The file at the resolved Dropbox path is the deliverable. Stop here.

---

## DONE. STOP HERE.
