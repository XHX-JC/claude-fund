# SESSION OPEN PROTOCOL — READ THESE FILES IN ORDER
# Claude reads this at the start of every morning session.
# This replaces loading the full journal at session open.
# Last updated: S59 WEEKEND | 6 June 2026 — BTC_PLAYBOOK integrated
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
5. C:\Users\James Cadbury\Dropbox\Claude-Fund\state\DECISION_REGISTER.md          <- HIGH CONVICTION DECISIONS <- MANDATORY
6. C:\Users\James Cadbury\Dropbox\Claude-Fund\routines\MARKET_HEALTH_CHECK.md     <- MARKET REGIME CHECK <- READ WHILE STATUS=ELEVATED
7. C:\Users\James Cadbury\Dropbox\Claude-Fund\state\BTC_PLAYBOOK.md               <- BTC CYCLE MONITOR <- READ ON FRIDAY OR WHEN BTC WITHIN 15% OF ENTRY ZONE

## ═══════════════════════════════════════════════════════════════════════════
## STEP 0D — MARKET HEALTH CHECK (MANDATORY WHILE STATUS = ELEVATED OR CRISIS)
## ═══════════════════════════════════════════════════════════════════════════
## Added S59 | 6 June 2026 | Trigger: VIX 15→26 in 48hrs, CAPE 39x, Fed hike odds 57%
##
## Read MARKET_HEALTH_CHECK.md and execute Step 1 autonomously:
##   - Pull WTI via EOD commodity API
##   - Pull SPX/SPY level via EOD or IBKR
##   - Web search: current VIX level + current 10yr yield + HYG price
##
## Then ask user for:
##   - VIX current (TradingView or IBKR)
##   - 10yr yield current (TradingView or IBKR)
##   - Any overnight macro news
##   - BTC price (when within 15% of $58K entry zone — also feeds BTC_PLAYBOOK)
##
## Calculate composite score (0-24) and state regime before any analysis.
##
## ENTRY GATE: While composite score >7, ALL new buy orders require the
## CRASH STRESS TEST documented in MARKET_HEALTH_CHECK.md before entry.
##
## BUY ORDER REVIEW: At every session open while score >7, review all pending
## limit BUY orders in IBKR. Flag any that would execute in a down-gap open.
## State: "PENDING BUY ORDERS — [list] — confirm keep or cancel before proceeding."
##
## SUSPEND CONDITION: Score returns to ≤7 for 5 consecutive sessions AND VIX
## holds below 18. Add suspension note to MARKET_HEALTH_CHECK.md history log.
## ═══════════════════════════════════════════════════════════════════════════

## ═══════════════════════════════════════════════════════════════════════════
## STEP 0E — BTC PLAYBOOK CHECK (FRIDAY SESSIONS + ANY SESSION WHEN BTC NEAR ZONE)
## ═══════════════════════════════════════════════════════════════════════════
## Added S59 WEEKEND | 6 June 2026
##
## BTC_PLAYBOOK.md is a standing cycle monitor for the fund's BTC entry thesis.
## Full path: C:\Users\James Cadbury\Dropbox\Claude-Fund\state\BTC_PLAYBOOK.md
##
## READ AND UPDATE when ANY of the following:
##   a. Friday weekly review session (always)
##   b. BTC price is within 15% of $58,000 (i.e. below ~$67,000)
##   c. BTC makes a decisive move of >5% in a session (up or down)
##   d. Any session where user mentions BTC
##
## At each check, Claude:
##   1. Pulls current BTC price via web search
##   2. Pulls Fear & Greed index via web search (alternative.me)
##   3. Pulls ETF flow direction via web search (Farside Investors)
##   4. Fills in the BTC_PLAYBOOK.md Cycle Log row for the week
##   5. Scores Scorecard A (bottom forming) and Scorecard B (not reached)
##   6. States: "BTC [X/3 conditions met] | Scorecard A: [X/9] | B: [X/9] | Phase: [X]"
##   7. If ALL conditions met (price + SPX + F&G + A≥6 + B≤4): escalate to ORDER REQUIRED
##
## Entry conditions summary:
##   Price:     BTC $53,000–$58,000
##   SPX:       Below 50-day MA (~7,156 currently)
##   F&G:       Sustained below 15 for ≥5 consecutive days
##   Scorecard: A ≥6/9 AND B ≤4/9
##   Sizing:    Max $22,000 (20% net liq, hard ceiling)
##
## Current BTC status (6 June 2026):
##   Price ~$61,200 | A: 1/9 | B: 4/9 | Phase: Capitulation/base-watch
##   Entry conditions: 0/3 met | STATUS: MONITOR
## ═══════════════════════════════════════════════════════════════════════════

## STEP 2B — SI-88 DECISION REGISTER CHECK (MANDATORY — runs after IBKR reconciliation)
## ═══════════════════════════════════════════════════════════════════════════
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
## NOTE: While MARKET_HEALTH_CHECK score >7, STATUS defaults to:
##   DEFERRED — Market regime: Tier 2 active. No entries until score ≤7.
## Exception: crash stress test passed + sizing at 50% normal.
##
## ESCALATION: If a name is ORDER REQUIRED for 2 consecutive sessions with no
## action and no documented deferral, Claude states:
## "ESCALATION — [TICKER] ORDER REQUIRED [N] sessions. No action. No deferral.
## Confirm: ENTER / PASS / DEFER with condition and deadline before continuing."
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

Note while MARKET_HEALTH_CHECK score >7: Screen B (Quality at Lows) is PRIMARY.
The market regime is creating the entry opportunities. Flag every Screen B candidate
for Crash Stress Test evaluation before any entry decision.

## IBKR CONNECTOR PROTOCOL (SI-87)
The IBKR connector is the PRIMARY source for all portfolio data from S52 onwards.
Screenshots are the FALLBACK only.

USE IBKR CONNECTOR (autonomous):
- Session open position check     → get_account_positions
- Session open order/stop check   → get_account_orders
- Cash balance verification       → get_account_balances
- Net liquidity confirmation      → get_account_summary
- Overnight fill check            → get_account_trades (period: TODAY or DAYS_7)
- Stop proximity analysis         → get_price_snapshot
- 52-week range for any name      → get_price_snapshot (field: misc-statistics)
- Price history for chart review  → get_price_history
- Resolve ticker to contract_id   → search_contracts
- Realised P&L audit              → get_account_trades (period: DAYS_90)

PRICE SNAPSHOT STANDARD FIELD SET:
  ["last", "change", "prior-close", "misc-statistics", "year-to-date-change",
   "historical-vol", "avg-90d-usd-volume", "dividend-yield"]

## AFTER READING ALL FILES — STRUCTURED SESSION OPEN OUTPUT

Execute automatically — no user instruction required:

1. Pull live portfolio via IBKR connector:
   a. get_account_summary       → net liquidity
   b. get_account_positions     → live positions + unrealised P&L
   c. get_account_orders        → confirm all GTC stops live at correct levels
   d. get_account_trades(TODAY) → any overnight fills since last session

2. Cross-reference positions against FUND_SESSION_STATE.md

2b. SI-88 DECISION REGISTER PROXIMITY CHECK (see block above)

2c. MARKET HEALTH CHECK (see Step 0D — while status ELEVATED):
   - Pull WTI, SPX, VIX, 10yr autonomously
   - Ask user for VIX + 10yr + BTC price confirmation
   - Calculate composite score
   - State regime and entry gate status
   - Review all pending BUY orders

2d. BTC PLAYBOOK CHECK (see Step 0E — Friday sessions or BTC within 15% of zone):
   - Pull BTC price, Fear & Greed, ETF flow direction
   - Update Cycle Log in BTC_PLAYBOOK.md
   - Score Scorecards A and B
   - State BTC regime and entry condition status

3. Run stop proximity check on any position where clearance <5% from stop.

4. Report in structured summary — no prose:

DATE: [today]
NET LIQ: $[X] | UNREALISED: $[X]
CASH: USD $[X] | GBP £[X] | EUR €[X]
WTI: $[X] | SI-25 gap: [X]%
VIX: [X] | 10YR: [X]% | REGIME: [GREEN/AMBER/RED] score [X]/24
BTC: $[X] | Entry conditions: [X/3] | Scorecard A: [X/9] | Phase: [X]  ← Friday/near-zone only
OVERNIGHT FILLS: [None or details]
STOP FLAGS: [<5% clearance positions]
PENDING BUY ORDERS: [list — confirm keep or cancel]
DECISION REGISTER: [names in zone + status]
EARNINGS TODAY/TOMORROW: [from SESSION_BRIEF if available]
OVERNIGHT SIGNALS: [from SESSION_BRIEF + OPPORTUNITY_SCAN]
OPEN ACTIONS: [from FUND_SESSION_STATE MANDATORY FIRST ACTIONS]
SCREENERS: "Please run CF-SCREEN-D, A, B, C, SI39 + Options flow — screenshot top 25 each"
CLOSE PROTOCOL LOADED: YES — next journal: trading_journalNN.jsx

Then await screener screenshots before any analysis.
