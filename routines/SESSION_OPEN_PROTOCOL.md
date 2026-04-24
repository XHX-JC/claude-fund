# SESSION OPEN PROTOCOL — READ THESE FILES IN ORDER
# Claude reads this at the start of every morning session.
# This replaces loading the full journal at session open.
# ═══════════════════════════════════════════════════════

## STEP ZERO — DATE AND TIMEZONE (mandatory before anything)
State today's date explicitly. Source: system prompt only.
NYSE opens 17:30 UAE. LSE opens 12:00 UAE. XETRA opens 11:00 UAE.
Compute — never recall.

## FILES TO READ (in this order, all in one batch)
1. C:\Users\jcadb\claude-fund\state\SESSION_BRIEF.md       ← macro + overnight
2. C:\Users\jcadb\claude-fund\state\OPPORTUNITY_SCAN.md    ← market signals
3. C:\Users\jcadb\claude-fund\state\FUND_SESSION_STATE.md  ← portfolio state + priorities

## DO NOT READ AT SESSION OPEN (load only if needed)
- trading_journalNN.jsx  ← load only if making journal edits
- LESSONS_LEARNED.md    ← load only if diagnosing an error type
- AI_INFRASTRUCTURE_THESIS.md ← load only if running Stage 2 research

## AFTER READING ALL THREE FILES
Report the following in a structured summary — no prose:

DATE: [today]
WTI: $[price] | SI-25 gap: [X]%
STOP FLAGS: [any position with clearance <5% from SESSION_BRIEF]
EARNINGS TODAY/TOMORROW: [from SESSION_BRIEF]
OVERNIGHT SIGNALS: [top 2 from SESSION_BRIEF + OPPORTUNITY_SCAN]
PRIORITY FLAG: [from OPPORTUNITY_SCAN]
OPEN ACTIONS: [from FUND_SESSION_STATE SESSION PRIORITIES list]

Then await instruction. Do not begin scanning positions until instructed.
