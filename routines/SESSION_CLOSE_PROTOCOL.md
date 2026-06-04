# SESSION CLOSE PROTOCOL — MANDATORY STEPS AT EVERY SESSION END
# Claude executes ALL steps below at every session close, without exception.
# No step is optional. No step requires user instruction.
# Last updated: S55 | 2 June 2026 — DECISION_REGISTER update added as mandatory step
# ═══════════════════════════════════════════════════════════════════

## STEP 1 — PORTFOLIO RECONCILIATION VIA IBKR CONNECTOR
Pull live data autonomously — no user action required:
  a. get_account_positions  — final position count and unrealised P&L
  b. get_account_orders     — confirm all GTC stops live at correct levels
  c. get_account_balances   — USD/GBP/EUR cash confirms any fills
  d. get_account_trades(TODAY) — any fills executed during this session

Cross-check against session records:
  - Position count matches (stops triggered = position absent from IBKR)
  - Cash balance change confirms fills (buy reduces cash, sell increases)
  - All GTC stops present at levels discussed in session
  - Any new fills in trades tab reconciled against journal

SCREENSHOT STILL REQUIRED FOR:
  - Trades tab visual confirmation if a fill is ambiguous
  - IBKR connector returns error or empty data

REMINDER — CLAUDE TRADE AUTHORITY:
  Claude is READ-ONLY. create_order_instruction and delete_order_instruction are
  permanently prohibited.

## STEP 2 — RECONCILE IBKR DATA AGAINST JOURNAL
Cross-check:
- Position count
- Cash balances (USD/GBP/EUR)
- Stop orders at correct levels
- New fills reconciled

## STEP 2B — UPDATE DECISION_REGISTER.md (MANDATORY — added S55)
═══════════════════════════════════════════════════════════════════
File: C:\Users\James Cadbury\Dropbox\Claude-Fund\state\DECISION_REGISTER.md

This file MUST be updated at every session close before the journal is written.
It is never permitted to be more than one session stale.

For each name in the register, update:
  - Last session decision (what was discussed or decided today)
  - Current price vs entry zone
  - Status: ORDER REQUIRED / DEFERRED [condition + deadline] / ALERT SET
  - If a decision was made today (enter/pass/defer): move to ARCHIVE section

For any new name where Stage 2 was completed this session:
  - Add immediately to the register with all required fields
  - Do not wait for the next session to add it

For any name where an order was placed this session:
  - Mark as ENTERED and move to ARCHIVE

Failure to update DECISION_REGISTER.md at session close is an error class
violation equivalent to E30 (journal not written). Log in LESSONS_LEARNED.md.

Why this matters: HPE was in a watchlist note for 6 weeks at its entry zone
with no mechanism to escalate. DECISION_REGISTER prevents this recurring.
═══════════════════════════════════════════════════════════════════

## STEP 3 — DETERMINE NEXT JOURNAL FILE NUMBER
Read: C:\Users\James Cadbury\Dropbox\Claude-Fund\journal\
Last file in that folder = current version. New file = last number + 1.
NEVER guess the number. ALWAYS read the directory first.

## STEP 4 — WRITE NEW JOURNAL FILE DIRECTLY TO DROPBOX
Path: C:\Users\James Cadbury\Dropbox\Claude-Fund\journal\trading_journalNN.jsx
Tool: filesystem:write_file
This is a DIRECT WRITE. No download. No manual steps. No user action required.

CRITICAL RULES:
- I17: ALWAYS create a new file. NEVER overwrite the previous session file.
- processNotes.dropboxProtocol must read: "DIRECT WRITE CONFIRMED via filesystem MCP."

## STEP 5 — VERIFY THE WRITE
State to the user: "trading_journalNN.jsx written to Dropbox."

## STEP 6 — SESSION SUMMARY (brief, to user)
After Dropbox write confirmed, deliver:
- Net liquidity at close
- Daily P&L
- Position count
- Any stops triggered today
- Decision Register: names requiring action next session
- One critical action for next session open

## WHAT NEVER NEEDS USER INSTRUCTION
- Reading the journal directory to get the next file number
- Writing the new journal file to Dropbox
- Updating DECISION_REGISTER.md
- Confirming the write
- Stating the next session's file name

## ERROR RECORD
E30 (S48): Close protocol amnesia — journal not written.
E30-B (S55 equivalent): DECISION_REGISTER not updated at close.
Both are prevented by reading this file at session open.
