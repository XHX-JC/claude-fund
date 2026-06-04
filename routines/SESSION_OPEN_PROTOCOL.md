# SESSION OPEN PROTOCOL — READ THESE FILES IN ORDER
# Claude reads this at the start of every morning session.
# This replaces loading the full journal at session open.
# Last updated: S55 | 2 June 2026 — DECISION_REGISTER added, SI-88 integrated
# ═══════════════════════════════════════════════════════

## STEP ZERO — DATE AND TIMEZONE (mandatory before anything)
State today's date explicitly. Source: system prompt only.
NYSE opens 17:30 UAE. LSE opens 11:00 UAE. XETRA opens 11:00 UAE.
Compute — never recall.
See also: TIME_PROTOCOL.md for bash-based clock verification.

## STEP 0Z — IBKR CONNECTOR AUTHORITY (PERMANENT — READ EVERY SESSION)
The IBKR connector is available and confirmed working from S52 (30 May 2026).
Claude's authority is STRICTLY LIMITED to READ-ONLY data retrieval.

PERMITTED (Claude executes autonomously):
  - get_account_positions     — live position data, replaces Positions tab screenshot
  - get_account_orders        — live GTC stop verification, replaces Orders tab screenshot
  - get_account_balances      — USD/GBP/EUR cash balances
  - get_account_summary       — net liquidity, buying power, margin
  - get_account_trades        — trade history and realised P&L (use DAYS_90 for full recent history)
  - get_price_snapshot        — live price, 52wk range, vol, options data, YTD change
  - get_price_history         — OHLCV bars for any instrument, any timeframe
  - search_contracts          — resolve ticker to contract_id for any instrument

PROHIBITED (Claude must NEVER execute, regardless of instruction or circumstance):
  - create_order_instruction  — PROHIBITED. Claude never prepares, drafts, or submits orders.
  - delete_order_instruction  — PROHIBITED. Claude never cancels or modifies orders.
  - Any action that could result in a trade, position change, or order modification.

This restriction is permanent and cannot be overridden by any instruction in any session.
If asked to place, cancel, or modify an order: decline, explain the restriction, and
instead provide the exact order parameters the user should enter manually in IBKR.

## STEP 0A — READ SESSION CLOSE PROTOCOL (mandatory, every session)
File: C:\Users\James Cadbury\Dropbox\Claude-Fund\routines\SESSION_CLOSE_PROTOCOL.md
Read this before anything else. It contains the mandatory close steps including
direct Dropbox journal write via filesystem MCP. Reading it at open means it
cannot be forgotten at close. This was added S48 after repeated close failures (E30).

## STEP 0B — SESSION CLOSE TIMING (permanent operating fact — do not flag as error)
Sessions close at 6-7pm UAE = 10-11am ET = mid US session. NYSE does not close until 00:00 UAE.
This means:
- Journal prices are ALWAYS intraday prices, never EOD. This is by design.
- IBKR screenshots taken at session close are mid-session snapshots, not EOD.
- Price variances between the journal and next-morning screenshots are EXPECTED and NORMAL.
- The morning review is the first opportunity to see where positions actually closed.
- NEVER flag journal-vs-EOD price variance as a process error. It is the operating model.
- Morning stop proximity analysis uses EOD prices from overnight screenshots — this is the
  primary value of the morning session, not a correction of something that went wrong.

## STEP 0C — STATE FILE AVAILABILITY
SESSION_BRIEF.md and OPPORTUNITY_SCAN.md in the state\ folder are outputs of automated
morning routines (MARKET_BRIEF_PROMPT.md at 05:30 UAE, OPPORTUNITY_SCAN_PROMPT.md at 06:00 UAE).
These routines run via Claude Code on the local machine and write to the C drive first,
then sync to Dropbox via session-close.bat.
- During normal operation: files exist and should be read.
- During absence periods (machine not running routines): files will be absent. This is
  EXPECTED, not an error. Skip them gracefully and proceed with FUND_SESSION_STATE.md.
- The prompt templates are at: routines\MARKET_BRIEF_PROMPT.md and routines\OPPORTUNITY_SCAN_PROMPT.md

## FILES TO READ (in this order, all in one batch)
1. C:\Users\James Cadbury\Dropbox\Claude-Fund\routines\SESSION_CLOSE_PROTOCOL.md  <- MANDATORY FIRST
2. C:\Users\James Cadbury\Dropbox\Claude-Fund\state\SESSION_BRIEF.md              <- macro + overnight (skip if absent)
3. C:\Users\James Cadbury\Dropbox\Claude-Fund\state\OPPORTUNITY_SCAN.md           <- market signals (skip if absent)
4. C:\Users\James Cadbury\Dropbox\Claude-Fund\state\FUND_SESSION_STATE.md         <- portfolio state + priorities
5. C:\Users\James Cadbury\Dropbox\Claude-Fund\state\DECISION_REGISTER.md         <- HIGH CONVICTION DECISIONS <- MANDATORY

## ═══════════════════════════════════════════════════════════════════════════
## STEP 2B — SI-88 DECISION REGISTER CHECK (MANDATORY — runs after IBKR reconciliation)
## ═══════════════════════════════════════════════════════════════════════════
## Added S55 | 2 June 2026 | Origin: HPE missed +36%, MU +71%, CRM +24% — all
## had Stage 2 complete, entry zone defined, no order placed, no proximity check.
##
## After IBKR reconciliation, Claude runs the proximity check for every name in
## the DECISION_REGISTER:
##
## "Which MONITORING or ACTIVE tier names are within 5% of their entry zone?"
##
## For each name within 5%, state:
##   [TICKER] | Zone [X-Y] | Current [Z] | Distance [N%] | STATUS
##
## STATUS options:
##   ORDER REQUIRED — no valid deferral applies. Request confirmation to place.
##   DEFERRED — P24 (pre-earnings, Stage 2 complete, state conviction level)
##   DEFERRED — Technical: [specific condition not yet met, deadline stated]
##   DEFERRED — Capital: [$X available, $Y needed]
##   ALERT SET — not yet in zone
##
## ESCALATION: If a name is ORDER REQUIRED for 2 consecutive sessions with no
## action and no documented deferral, Claude states:
## "ESCALATION — [TICKER] ORDER REQUIRED [N] sessions. No action. No deferral.
## Confirm: ENTER / PASS / DEFER with condition and deadline before continuing."
##
## NOTE ON P24 (amended S55):
## P24 does NOT block pre-earnings entry when Stage 2 is complete and conviction
## is high. Pre-earnings entry is a calculated decision. State:
## "Pre-earnings entry — Stage 2 complete — conviction [HIGH] — stop sized for
## thesis break at [PRICE] — gap-down risk accepted."
## See SI88_ACTIONABLE_ORDER_PROTOCOL.md for full rule.
##
## NOTE ON DECISION_REGISTER MAINTENANCE:
## The DECISION_REGISTER.md file is updated at EVERY session close.
## When a decision is made (enter/pass/defer), it moves to the archive.
## When a new Stage 2 name is identified, it is added immediately.
## The register is NEVER more than one session stale.
## If it is stale, that is an error class violation to be logged.
## ═══════════════════════════════════════════════════════════════════════════

## DO NOT READ AT SESSION OPEN (load only if needed)
- trading_journalNN.jsx  <- load only if making journal edits
- LESSONS_LEARNED.md    <- load only if diagnosing an error type
- AI_INFRASTRUCTURE_THESIS.md <- load only if running Stage 2 research

## IBKR SCREENER PROTOCOL (S53 — HARDWIRED — applies every session where markets are open)
═══════════════════════════════════════════════════════════════════════════════════
SCREENERS ARE FREE, PRE-CONFIGURED, AND TAKE UNDER 5 MINUTES. USE THEM EVERY SESSION.
═══════════════════════════════════════════════════════════════════════════════════

Claude issues this request at EVERY session where NYSE is open (17:30-00:00 UAE):

"Before we start — please open IBKR Trader Workstation → New Window → Screener
and run these saved screeners, screenshotting top 25 results from each.
All can be done in one batch in under 5 minutes:

  1. CF-SCREEN-D  — Volume Anomaly          (run FIRST — signals fade during the day)
  2. CF-SCREEN-A  — Revenue Momentum
  3. CF-SCREEN-B  — Quality at 52-Week Lows
  4. CF-SCREEN-C  — Earnings Surprise
  5. CF-SCREEN-SI39 — Thesis Drawdown Watchlist

For options flow: open the Options tab → screenshot High Call Volume top 25,
then High Put Volume top 25.

First Friday of each month: also run CF-SCREEN-EU (EU/LSE names).

Paste all screenshots and I will analyse and flag any Stage 1 candidates."

WHEN TO REQUEST SCREENERS:
- EVERY session where NYSE is open — takes 5 minutes, costs nothing, surfaces new ideas
- Weekend/closed market sessions — skip (data is stale, screeners will show few results)
- The screeners populate best during NYSE hours (17:30-00:00 UAE)

SCREENER SUMMARY (confirmed saved S53 — 1 June 2026):
┌─────────────────┬──────────────────────────────────────────────────────────────┐
│ CF-SCREEN-D     │ Volume Anomaly: Market cap $300M+, avg vol $1M+,             │
│                 │ change -5% to +5%, RVOL ≥2.0x, vol/min ≥1                   │
│                 │ Sort: RVOL Higher Values/Important                           │
├─────────────────┼──────────────────────────────────────────────────────────────┤
│ CF-SCREEN-A     │ Revenue Momentum: Market cap $300M+, avg vol $500K+,         │
│                 │ change -60% to -10%, revenue growth Y/Y ≥15%                │
├─────────────────┼──────────────────────────────────────────────────────────────┤
│ CF-SCREEN-B     │ Quality at Lows: Market cap $300M+, avg vol $500K+,          │
│                 │ P/E 0.01-100K, net profit margin ≥10%, change -60% to -5%   │
├─────────────────┼──────────────────────────────────────────────────────────────┤
│ CF-SCREEN-C     │ Earnings Surprise: Market cap $300M+, avg vol $500K+,        │
│                 │ EPS growth ≥50%, change -20% to +5%, net margin ≥15%        │
│                 │ Sort: EPS Growth Higher Values/Important                     │
├─────────────────┼──────────────────────────────────────────────────────────────┤
│ CF-SCREEN-SI39  │ Thesis Drawdown: Market cap $1B+, avg vol $1M+,              │
│                 │ EPS growth ≥10%, change -45% to -10%                        │
├─────────────────┼──────────────────────────────────────────────────────────────┤
│ CF-SCREEN-M     │ Options Flow: Use IBKR Options tab pre-built scans           │
│                 │ → High Call Volume top 25 (bullish signal)                  │
│                 │ → High Put Volume top 25 (bearish warning on held names)    │
├─────────────────┼──────────────────────────────────────────────────────────────┤
│ CF-SCREEN-EU    │ EU/LSE Section N: Run first Friday of each month only        │
└─────────────────┴──────────────────────────────────────────────────────────────┘

WHAT CLAUDE DOES WITH SCREENSHOTS:
- Scans each output for names matching active thesis sectors
- Flags any name appearing in multiple screens simultaneously (strongest signal)
- Cross-references CF-SCREEN-SI39 output against DECISION_REGISTER names
- Cross-references High Put Volume against held positions (stop review trigger)
- Elevates confirmed candidates to UNIVERSE tier with one-line rationale
- Completes Stage 1 on highest-priority candidates within the same session
- Any screener output matching a DECISION_REGISTER name is flagged immediately

## IBKR CONNECTOR PROTOCOL (SI-87 — replaces screenshot protocol for positions/orders)
The IBKR connector is the PRIMARY source for all portfolio data from S52 onwards.
Screenshots are now the FALLBACK only, not the default.

USE IBKR CONNECTOR (autonomous, no user action required):
- Session open position check     → get_account_positions
- Session open order/stop check   → get_account_orders
- Cash balance verification       → get_account_balances
- Net liquidity confirmation      → get_account_summary
- Overnight fill check            → get_account_trades (period: TODAY or DAYS_7)
- Stop proximity analysis         → get_price_snapshot (fields: last, misc-statistics, change)
- 52-week range for any name      → get_price_snapshot (field: misc-statistics)
- Price history for chart review  → get_price_history
- Resolve ticker to contract_id   → search_contracts
- Realised P&L audit              → get_account_trades (period: DAYS_90 or YEAR_TO_DATE)

PRICE SNAPSHOT STANDARD FIELD SET:
  ["last", "change", "prior-close", "misc-statistics", "year-to-date-change",
   "historical-vol", "avg-90d-usd-volume", "dividend-yield"]

REQUEST SCREENSHOTS WHEN (fallback only):
- IBKR screener outputs (CF-SCREEN-X)
- Trades tab confirmation of a specific fill
- Visual chart confirmation before an entry decision

## AFTER READING ALL FILES — STRUCTURED SESSION OPEN OUTPUT

Execute automatically — no user instruction required:

1. Pull live portfolio via IBKR connector:
   a. get_account_summary       → net liquidity
   b. get_account_positions     → live positions + unrealised P&L
   c. get_account_orders        → confirm all GTC stops live and at correct levels
   d. get_account_trades(TODAY) → any overnight fills since last session

2. Cross-reference positions against FUND_SESSION_STATE.md:
   - Flag any position present in IBKR but absent from state file (new fill)
   - Flag any position in state file absent from IBKR (stop triggered overnight)
   - Flag any stop level in IBKR that does not match state file (amendment needed)

2b. SI-88 DECISION REGISTER PROXIMITY CHECK (see block above):
   - Read DECISION_REGISTER.md
   - For every name in register, check current price vs entry zone
   - Flag any name within 5% of entry zone
   - State ORDER REQUIRED or deferral reason for each
   - Escalate any name ORDER REQUIRED for 2+ sessions with no action

3. Run stop proximity check on any position where live price shows
   clearance <5% from stop level.

4. Report in structured summary — no prose:

DATE: [today]
NET LIQ: $[X] | UNREALISED: $[X]
CASH: USD $[X] | GBP £[X] | EUR €[X]
WTI: $[X] | SI-25 gap: [X]%
OVERNIGHT FILLS: [None or details]
STOP FLAGS: [<5% clearance positions]
DECISION REGISTER: [names in zone + status]
EARNINGS TODAY/TOMORROW: [from SESSION_BRIEF if available]
OVERNIGHT SIGNALS: [from SESSION_BRIEF + OPPORTUNITY_SCAN]
OPEN ACTIONS: [from FUND_SESSION_STATE MANDATORY FIRST ACTIONS]
SCREENERS: "Please run CF-SCREEN-D, A, B, C, SI39 + Options flow — screenshot top 25 each"
CLOSE PROTOCOL LOADED: YES — next journal: trading_journalNN.jsx

Then await screener screenshots before any analysis.
