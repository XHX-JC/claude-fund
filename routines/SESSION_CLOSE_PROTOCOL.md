# SESSION CLOSE PROTOCOL — MANDATORY STEPS AT EVERY SESSION END
# Claude executes ALL steps below at every session close, without exception.
# No step is optional. No step requires user instruction.
# ═══════════════════════════════════════════════════════════════════

## STEP 1 — SCREENSHOT CONFIRMATION (SI-68)
Do not proceed to Step 2 until close-of-session IBKR screenshots are received.
Required: Positions tab + Orders tab.
If screenshots not provided: request them explicitly before writing journal.

## STEP 2 — RECONCILE SCREENSHOTS AGAINST JOURNAL
Cross-check:
- Position count (any stops triggered = positions absent from screenshot)
- Cash balances (USD/GBP/EUR cash change confirms any fills)
- Stop orders (confirm all GTC stops still submitted and at correct levels)
- New fills in Trades tab if any position changed

## STEP 3 — DETERMINE NEXT JOURNAL FILE NUMBER
Read: C:\Users\James Cadbury\Dropbox\Claude-Fund\journal\
Last file in that folder = current version. New file = last number + 1.
Example: if trading_journal61.jsx exists, next file is trading_journal62.jsx.
NEVER guess the number. ALWAYS read the directory first.

## STEP 4 — WRITE NEW JOURNAL FILE DIRECTLY TO DROPBOX
Path: C:\Users\James Cadbury\Dropbox\Claude-Fund\journal\trading_journalNN.jsx
Tool: filesystem:write_file
This is a DIRECT WRITE. No download. No manual steps. No user action required.
The filesystem MCP tool has confirmed write access to this directory every session.

CRITICAL RULES:
- I17: ALWAYS create a new file. NEVER overwrite the previous session file.
- The comment block at the top of every journal must state the correct Dropbox path.
- Remove any note saying "Claude cannot write to Dropbox" — this is false.
- processNotes.dropboxProtocol must read: "DIRECT WRITE CONFIRMED via filesystem MCP."

## STEP 5 — VERIFY THE WRITE
After filesystem:write_file completes:
Confirm the file appears in the journal directory by checking the success response.
State to the user: "trading_journalNN.jsx written to Dropbox."

## STEP 6 — SESSION SUMMARY (brief, to user)
After Dropbox write confirmed, deliver:
- Net liquidity at close
- Daily P&L
- Position count
- Any stops triggered today
- One critical action for next session open

## WHAT NEVER NEEDS USER INSTRUCTION
The following happen automatically at every close, no prompting required:
- Reading the journal directory to get the next file number
- Writing the new journal file to Dropbox
- Confirming the write
- Stating the next session's file name (e.g. "next: trading_journal62.jsx")

## ERROR RECORD
E30 (added S48): Close protocol amnesia. Claude repeatedly failed to write journal
directly to Dropbox despite filesystem MCP access being confirmed every session.
Root cause: no written close protocol existed. This file is the fix.
Prevention: Claude reads SESSION_CLOSE_PROTOCOL.md at session open alongside
SESSION_OPEN_PROTOCOL.md. Both are mandatory reads. See SESSION_OPEN_PROTOCOL.md Step 1.
