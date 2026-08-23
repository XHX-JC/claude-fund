# SESSION CLOSE PROTOCOL — MANDATORY STEPS AT EVERY SESSION END
# Claude executes ALL steps below at every session close, without exception.
# No step is optional. No step requires user instruction.
# Last updated: S89 | 8 July 2026 — journal write moved earlier + mandatory completion
# checklist added, after S87 AND S88 both skipped the journal (Steps 3-4 as they existed
# then) while every other close-time file update completed normally. Root cause: the
# journal sat last in the sequence, after every file that gates the NEXT session's
# trading decisions. Nothing forced its completion the way DECISION_REGISTER's own
# read requirement forces that file to be current. A close interrupted or rushed after
# the trading-relevant files were done silently dropped the one file that doesn't block
# anything the next session needs — twice in a row. Two structural fixes below: the
# journal write moves to immediately after reconciliation, before the other file updates,
# so it survives even a partial/interrupted close; and a mandatory completion checklist
# is now required as the literal last thing stated before a close is considered done,
# mirroring the "CLOSE PROTOCOL LOADED: YES" confirmation SESSION_OPEN_PROTOCOL.md already
# requires at open. See trading_journal98.jsx for the retrospective reconstruction and
# S89 session record for the full incident.
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

## STEP 2A — DETERMINE NEXT JOURNAL FILE NUMBER AND WRITE IT (MANDATORY — moved here S89)
═══════════════════════════════════════════════════════════════════
MOVED FROM (old) STEPS 3-4 TO HERE, S89, 8 July 2026. This step now runs BEFORE the
DECISION_REGISTER, TRACK_RECORD, and state-file updates below it — not after them.

Origin of the move: S87 and S88 both completed DECISION_REGISTER.md, FUND_SESSION_STATE.md,
LESSONS_LEARNED.md, and TRACK_RECORD.csv updates correctly, then skipped the journal
entirely, two sessions running. The journal was last in sequence and didn't gate anything
the next session's open depends on, so nothing forced it to complete if a close was
interrupted, rushed, or simply ended early. Writing the journal FIRST, right after
mechanical reconciliation, means it survives even if the rest of the close never happens —
the reverse of what occurred at S87/S88, where everything else survived and the journal
didn't.

WEEKEND VS ACTIVE TRADING DAY RULE (ADDED S95, 13 July 2026, James's explicit instruction):
On weekend or closed market check ins with no session close run, the journal write is
conditional: only write a new numbered journal file if the check in produced meaningful
content (a real reconciliation finding, a correction, a decision, a new discrepancy). A
pass that confirms nothing changed does not need a journal entry. This is why the Sunday
12 July reconciliation correctly wrote no journal, the content lived in FUND_SESSION_STATE.md
instead. On any ACTIVE TRADING DAY close, this conditionality does NOT apply. The journal
write is mandatory without exception, same as every other rule in this step, regardless of
how much or how little happened in the session. Do not extend the weekend exception to a
trading day close reasoning that "nothing much happened today."

a. Read: C:\Users\James Cadbury\Dropbox\Claude-Fund\journal\
   Last file in that folder = current version. New file = last number + 1.
   NEVER guess the number. ALWAYS read the directory first.
b. Path: C:\Users\James Cadbury\Dropbox\Claude-Fund\journal\trading_journalNN.jsx
   Tool: filesystem:write_file — DIRECT WRITE, no download, no manual steps.
c. I17: ALWAYS create a new file. NEVER overwrite the previous session file.
d. processNotes.dropboxProtocol must read: "DIRECT WRITE CONFIRMED via filesystem MCP."
e. State to the user: "trading_journalNN.jsx written to Dropbox." — do this now, not at
   the end of the session summary. If nothing else in this protocol completes after this
   point, the journal is still secured.

Note: at this point in the sequence the journal is being written from the session's live
context, before the register/track-record steps below have run. If those later steps
surface a correction (e.g. a fill confirmed only during TRACK_RECORD reconciliation),
update the just-written journal file's content accordingly before Step 5 verification —
do not leave the journal stale relative to the files written after it.
═══════════════════════════════════════════════════════════════════

## STEP 2B — UPDATE DECISION_REGISTER.md (MANDATORY — added S55, ARCHITECTURE REVISED S110)
═══════════════════════════════════════════════════════════════════
Live file: C:\Users\James Cadbury\Dropbox\Claude-Fund\state\DECISION_REGISTER.md
Archive file: C:\Users\James Cadbury\Dropbox\Claude-Fund\state\DECISION_REGISTER_ARCHIVE.md

ARCHITECTURE (S110): DECISION_REGISTER.md is now a compact, current-decisions-only file —
current decisions, active watch/decision states, live catalyst dates, and standing
operational rules. It does NOT contain a portfolio-position table and does NOT hold a
completed-decisions archive section within itself. Historical/completed decision material
(closed-out ENTER/PASS/DEFER outcomes, resolved catalysts, superseded plans, past session
narrative) belongs in DECISION_REGISTER_ARCHIVE.md, moved there verbatim, not summarised.

CURRENT HOLDINGS AND CASH: DECISION_REGISTER.md must NOT be used to track current
positions, cost basis, shares, or cash. state\FUND_SESSION_STATE.md is the SOLE
authoritative current-portfolio source — see Step 2E below. If a decision-register update
would otherwise restate a position's shares/cost/cash, point to FUND_SESSION_STATE.md
instead of duplicating the figures here.

This file MUST be updated at every session close. The journal (Step 2A) is now written
before this step, not after — update DECISION_REGISTER.md here, and if anything here
changes what the journal should say, correct the journal file too before Step 5.
This file is never permitted to be more than one session stale.

For each name in the register, update:
  - Last session decision (what was discussed or decided today)
  - Current price vs entry zone
  - Status: ORDER REQUIRED / DEFERRED [condition + deadline] / ALERT SET
  - If a decision was made today (enter/pass/defer): move the completed entry, verbatim,
    to DECISION_REGISTER_ARCHIVE.md's COMPLETED DECISIONS table — do not leave it in the
    live file and do not create a competing in-file archive section.

For any new name where Stage 2 was completed this session:
  - Add immediately to the register with all required fields
  - Do not wait for the next session to add it

For any name where an order was placed this session:
  - Mark as ENTERED in DECISION_REGISTER.md for this session, then move the completed
    decision to DECISION_REGISTER_ARCHIVE.md once resolved — live holding detail (shares,
    cost, stop) belongs in FUND_SESSION_STATE.md, not in either register file.

Failure to update DECISION_REGISTER.md at session close is an error class
violation equivalent to E30 (journal not written). Log in LESSONS_LEARNED.md.

Why this matters: HPE was in a watchlist note for 6 weeks at its entry zone
with no mechanism to escalate. DECISION_REGISTER prevents this recurring.
═══════════════════════════════════════════════════════════════════

## STEP 2C — RECONCILE TRACK_RECORD.csv (MANDATORY — added S83, SI-95)
═══════════════════════════════════════════════════════════════════
File: C:\Users\James Cadbury\Dropbox\Claude-Fund\state\TRACK_RECORD.csv
Protocol: C:\Users\James Cadbury\Dropbox\Claude-Fund\routines\TRACK_RECORD_PROTOCOL.md

The primary rule is that TRACK_RECORD.csv is updated AT THE MOMENT each entry or
exit fills, not deferred to close. This step is the safety net, not the primary
mechanism — confirm nothing was missed mid-session.

Cross-check get_account_trades(TODAY) against TRACK_RECORD.csv:
  - Every fill today has a corresponding row (new OPEN row, or an OPEN row updated
    to CLOSED with Exit/Realized_PL/Return_Pct filled in)
  - Strategy and Catalyst fields are populated on any row opened today — blank
    fields are only acceptable on pre-S83 backfilled rows
  - No duplicate rows for the same round trip

If any fill from today is missing a row, add or correct it now. Failure to keep this
file current is the same error class as a missed DECISION_REGISTER update.
═══════════════════════════════════════════════════════════════════

## STEP 2D — CLEAR SESSION_BRIEF.md, CONFIRM OPPORTUNITY_SCAN.md CURRENT (MANDATORY — added S90)
═══════════════════════════════════════════════════════════════════
File: C:\Users\James Cadbury\Dropbox\Claude-Fund\state\SESSION_BRIEF.md
File: C:\Users\James Cadbury\Dropbox\Claude-Fund\state\OPPORTUNITY_SCAN.md

SESSION_BRIEF.md is the raw, unverified landing zone for whatever James pastes in from his
ChatGPT alert system or any other source (see SESSION_OPEN_PROTOCOL.md, EXTERNAL SCAN
INTAKE section). If anything was pasted into it this session, confirm every item has been
either verified and logged in OPPORTUNITY_SCAN.md, or explicitly carried forward there as
NEEDS MORE WORK with a stated next step. Once that is confirmed, clear SESSION_BRIEF.md back
to its template (the file itself is never deleted, only its content reset) so it does not
carry stale, already processed material into the next session open.

If nothing was pasted into SESSION_BRIEF.md this session, confirm it is still at template
and move on, nothing further required.

OPPORTUNITY_SCAN.md itself is append only and is never cleared or rewritten at close, this
step only confirms today's items made it in before SESSION_BRIEF.md is wiped.
═══════════════════════════════════════════════════════════════════

## STEP 2E — UPDATE FUND_SESSION_STATE.md (MANDATORY — ARCHITECTURE REVISED S110)
═══════════════════════════════════════════════════════════════════
Live file: C:\Users\James Cadbury\Dropbox\Claude-Fund\state\FUND_SESSION_STATE.md
Migration archive: C:\Users\James Cadbury\Dropbox\Claude-Fund\state\FUND_SESSION_STATE_ARCHIVE.md

FUND_SESSION_STATE.md is the SOLE authoritative source for current holdings, cash, and
orders. DECISION_REGISTER.md does not compete with it (see Step 2B) — any current-position
figure belongs here and only here.

CLOSE BEHAVIOUR (S110, changed from prior append-a-dated-snapshot practice): at every
session close, OVERWRITE the existing current-state snapshot in FUND_SESSION_STATE.md IN
PLACE with tonight's close. Do not append a new dated section below the previous one and
do not leave the previous snapshot in the file. After this step, FUND_SESSION_STATE.md
should contain exactly ONE current-state snapshot — tonight's — not a running log of past
snapshots.

NO ROUTINE ROTATION TO THE ARCHIVE: this overwrite behaviour does NOT require rotating the
outgoing snapshot into FUND_SESSION_STATE_ARCHIVE.md at each close. Git history, the
journal directory, and TRACK_RECORD.csv already provide the ongoing historical record of
how the portfolio looked at any past close — that is sufficient, and is why this step does
not ask for a rotation step every session. FUND_SESSION_STATE_ARCHIVE.md itself is the
one-time Stage 3B migration archive (the pre-restructure snapshot history moved there when
this file was split) — it is not a destination this step writes to routinely. Only revisit
that file if a deliberate future cleanup is explicitly requested; that is a separate,
deliberate decision, not part of this close step.
═══════════════════════════════════════════════════════════════════

## STEP 3 — VERIFY THE JOURNAL WRITE FROM STEP 2A
Re-read the journal file just written (Step 2A) and confirm it reflects anything that
changed during Steps 2B/2C. If DECISION_REGISTER or TRACK_RECORD reconciliation surfaced
a correction, the journal must match it before this step is considered complete — a
journal that disagrees with the register it was supposed to summarize is its own error.

## STEP 4 — SESSION SUMMARY (brief, to user)
Deliver:
- Net liquidity at close
- Daily P&L
- Position count
- Any stops triggered today
- Decision Register: names requiring action next session
- One critical action for next session open

## STEP 5 — MANDATORY CLOSE COMPLETION CHECKLIST (ADDED S89 — LAST THING STATED, NO EXCEPTIONS)
═══════════════════════════════════════════════════════════════════
This is the literal final action of every session close, after the summary, before the
session ends. State it explicitly, filling in each line — do not paraphrase or skip lines
for time. This exists specifically because S87 and S88 both ended without anyone,
including Claude, checking whether the journal had actually been written. This checklist
makes that check unavoidable rather than assumed.

  CLOSE PROTOCOL COMPLETE:
    Journal written: [trading_journalNN.jsx — YES, filename stated / NO — state why]
    DECISION_REGISTER.md updated: [YES / NO — state why]
    TRACK_RECORD.csv reconciled: [YES / NO — state why]
    FUND_SESSION_STATE.md overwritten with tonight's single current-state snapshot (Step 2E): [YES / NO — state why]
    LESSONS_LEARNED.md — new lesson logged if applicable: [YES / NO / N/A]
    SESSION_BRIEF.md cleared / OPPORTUNITY_SCAN.md current (Step 2D): [YES / NO / N/A — nothing pasted this session]
    IBKR reconciliation completed or explicitly noted as unavailable: [YES / NO]

If any line reads NO, the session is NOT closed. Either complete the missing item now or
state explicitly to the user that the close is incomplete and why, before ending the
session. A close that ends with an unstated NO on this checklist is exactly the failure
mode that produced the S87/S88 gap — the checklist's only job is to make silence
impossible.
═══════════════════════════════════════════════════════════════════

## WHAT NEVER NEEDS USER INSTRUCTION
- Reading the journal directory to get the next file number
- Writing the new journal file to Dropbox
- Updating DECISION_REGISTER.md
- Confirming the write
- Stating the next session's file name
- Stating the Step 5 completion checklist in full

## ERROR RECORD
E30 (S48): Close protocol amnesia — journal not written.
E30-B (S55 equivalent): DECISION_REGISTER not updated at close.
E30-C (S87+S88, caught and fixed S89): journal not written for two consecutive sessions
despite every other close-time file completing normally. Root cause: journal sat last in
sequence with nothing forcing its completion. Fixed by moving the journal write to
Step 2A (immediately after reconciliation, before the other file updates) and adding the
Step 5 mandatory completion checklist as an unskippable final confirmation. Both changes
are prevented from recurring by reading this file at session open, same as before —
the difference is the failure mode itself has been redesigned out, not just documented.
