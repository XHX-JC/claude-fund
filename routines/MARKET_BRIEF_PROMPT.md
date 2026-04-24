# MARKET BRIEF ROUTINE — 05:30 UAE DAILY
# Runs via Claude Code.
# Output: SESSION_BRIEF.md → C:\Users\jcadb\claude-fund\state\
# NO GIT OPERATIONS — file is written to C drive only. Git backup via session-close.bat.

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
   Read only FUND_SESSION_STATE.md if you need the SI-25 WTI trigger level ($100.38).

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

Write the following to: C:\Users\jcadb\claude-fund\state\SESSION_BRIEF.md
Overwrite any existing file.

```
# SESSION BRIEF — [DATE] | Generated [TIME] UAE
# ═══════════════════════════════════════════════

## MACRO
WTI:        $[price]/bbl  | Prev close: $[prev]  | SI-25 gap: [X]% to $100.38
Brent:      $[price]/bbl
Futures:    S&P [+/-X%]  Nasdaq [+/-X%]  Dow [+/-X%]  (premarket)
DXY:        [level]
VIX:        [level]

## HORMUZ / GEOPOLITICAL
Status:     [ONE LINE — e.g. "BLOCKED — Iran seized 2 ships Apr 23, US blockade active"]
Ceasefire:  [ONE LINE — current status]
Escalation: [ONE LINE — any overnight development or "No change"]

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

Write SESSION_BRIEF.md to C:\Users\jcadb\claude-fund\state\SESSION_BRIEF.md

That is the final step. Do not run any git commands. Do not commit. Do not push.
Do not create branches. The file on the C drive is the deliverable. Stop here.

---

## DONE. STOP HERE.
