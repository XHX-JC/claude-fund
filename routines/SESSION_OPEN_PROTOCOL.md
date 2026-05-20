# SESSION OPEN PROTOCOL — READ THESE FILES IN ORDER
# Claude reads this at the start of every morning session.
# This replaces loading the full journal at session open.
# ═══════════════════════════════════════════════════════

## STEP ZERO — DATE AND TIMEZONE (mandatory before anything)
State today's date explicitly. Source: system prompt only.
NYSE opens 17:30 UAE. LSE opens 12:00 UAE. XETRA opens 11:00 UAE.
Compute — never recall.

## STEP 0A — READ SESSION CLOSE PROTOCOL (mandatory, every session)
File: C:\Users\James Cadbury\Dropbox\Claude-Fund\routines\SESSION_CLOSE_PROTOCOL.md
Read this before anything else. It contains the mandatory close steps including
direct Dropbox journal write via filesystem MCP. Reading it at open means it
cannot be forgotten at close. This was added S48 after repeated close failures (E30).

## FILES TO READ (in this order, all in one batch)
1. C:\Users\James Cadbury\Dropbox\Claude-Fund\routines\SESSION_CLOSE_PROTOCOL.md  <- MANDATORY FIRST
2. C:\Users\James Cadbury\Dropbox\Claude-Fund\state\SESSION_BRIEF.md              <- macro + overnight
3. C:\Users\James Cadbury\Dropbox\Claude-Fund\state\OPPORTUNITY_SCAN.md           <- market signals
4. C:\Users\James Cadbury\Dropbox\Claude-Fund\state\FUND_SESSION_STATE.md         <- portfolio state + priorities

## DO NOT READ AT SESSION OPEN (load only if needed)
- trading_journalNN.jsx  <- load only if making journal edits
- LESSONS_LEARNED.md    <- load only if diagnosing an error type
- AI_INFRASTRUCTURE_THESIS.md <- load only if running Stage 2 research

## AFTER READING ALL FILES
Report the following in a structured summary — no prose:

DATE: [today]
WTI: $[price] | SI-25 gap: [X]%
STOP FLAGS: [any position with clearance <5% from SESSION_BRIEF]
EARNINGS TODAY/TOMORROW: [from SESSION_BRIEF]
OVERNIGHT SIGNALS: [top 2 from SESSION_BRIEF + OPPORTUNITY_SCAN]
PRIORITY FLAG: [from OPPORTUNITY_SCAN]
OPEN ACTIONS: [from FUND_SESSION_STATE SESSION PRIORITIES list]
CLOSE PROTOCOL LOADED: YES — next journal file will be trading_journalNN.jsx

Then await instruction. Do not begin scanning positions until instructed.
