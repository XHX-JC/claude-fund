# SESSION OPEN PROTOCOL — CLAUDE FUND
# Last updated: S80 | 26 June 2026 — V1 Conviction Verification Loop added to Step 6
# ═══════════════════════════════════════════════════════════════════════════════════════

## THE OPERATING PHILOSOPHY

The trading journal is the backbone and pillar of this fund.
It is the authoritative record of every decision, entry, exit, watchlist note,
lesson, key date, and strategic evolution. Without it, continuity is impossible.

Every session open begins by reading the most recent journal.
Every session close writes a new journal before anything else.
The journal number increments by one each session. Never skip. Never overwrite.

---

## STEP ZERO — DATE AND TIME (mandatory — execute before any statement)

Run this bash command. Do not state any date, time, or market status before running it.

```python
python3 -c "
from datetime import datetime, timezone, timedelta
utc = datetime.now(timezone.utc)
uae = utc + timedelta(hours=4)
h = uae.hour + uae.minute/60
print('DATE  :', uae.strftime('%A %d %B %Y'))
print('UAE   :', uae.strftime('%H:%M'))
print('UTC   :', utc.strftime('%H:%M'))
print()
print('LSE/EU:', 'OPEN' if 11.0 <= h < 19.5 else 'CLOSED', '(11:00-19:30 UAE)')
print('NYSE  :', 'OPEN' if 17.5 <= h < 24.0 else 'CLOSED', '(17:30-00:00 UAE)')
"
```

Compare computer date against system prompt date. If they differ — STOP and ask James
which is correct before proceeding. The computer clock is always authoritative.

---

## STEP 1 — READ THE MOST RECENT JOURNAL (THE BACKBONE)

```
Path: C:\Users\James Cadbury\Dropbox\Claude-Fund\journal\
Action: filesystem:list_directory → identify highest-numbered trading_journalNN.jsx → read it
```

The journal is the single source of truth for:
- What positions were held at last close and at what prices
- What trades were executed (entries, exits, stops triggered)
- What decisions were deferred and what conditions were set
- What lessons were noted
- What the next session's mandatory first actions are
- What the Strategy B trades are and what stops are in place
- What watchlist names are being tracked and at what zones

READ THE JOURNAL FULLY. Do not skip sections. The journal is not a summary document
— it is the authoritative record. Every position, every stop, every deferred decision
exists because it was written into a journal.

After reading, state: "Journal S[N] read. Last session: [date]. Positions: [count].
Strategy B active: [names or none]. Next journal: trading_journal[N+1].jsx."

---

## STEP 2 — IBKR CONNECTOR AUTHORITY (PERMANENT — READ EVERY SESSION)

Claude's authority is STRICTLY READ-ONLY.

PERMITTED (Claude executes autonomously):
  get_account_positions, get_account_orders, get_account_balances,
  get_account_summary, get_account_trades, get_price_snapshot,
  get_price_history, search_contracts

PROHIBITED (never under any circumstances):
  create_order_instruction, delete_order_instruction

If asked to place, cancel, or modify an order: decline, explain the restriction,
provide exact order parameters for James to enter manually.

---

## STEP 3 — READ THESE FILES (in one batch, after journal)

```
1. C:\Users\James Cadbury\Dropbox\Claude-Fund\routines\SESSION_CLOSE_PROTOCOL.md  <- MANDATORY
2. C:\Users\James Cadbury\Dropbox\Claude-Fund\routines\STRATEGY_FRAMEWORK.md      <- MANDATORY — SI-89
3. C:\Users\James Cadbury\Dropbox\Claude-Fund\routines\STRATB_SOURCING_PROTOCOL.md <- MANDATORY — SI-91, Strategy B catalyst sourcing method
4. C:\Users\James Cadbury\Dropbox\Claude-Fund\state\DECISION_REGISTER.md          <- MANDATORY — watchlist + register
5. C:\Users\James Cadbury\Dropbox\Claude-Fund\state\FUND_SESSION_STATE.md         <- current snapshot
6. C:\Users\James Cadbury\Dropbox\Claude-Fund\state\LESSONS_LEARNED.md            <- scan last 3 entries every session
7. C:\Users\James Cadbury\Dropbox\Claude-Fund\routines\MARKET_HEALTH_CHECK.md     <- while status ELEVATED or CRISIS
8. C:\Users\James Cadbury\Dropbox\Claude-Fund\state\BTC_PLAYBOOK.md               <- Fridays + when BTC within 15% of $58K
9. C:\Users\James Cadbury\Dropbox\Claude-Fund\state\SESSION_BRIEF.md              <- skip if absent
10. C:\Users\James Cadbury\Dropbox\Claude-Fund\state\OPPORTUNITY_SCAN.md           <- skip if absent
11. C:\Users\James Cadbury\Dropbox\Claude-Fund\routines\TRACK_RECORD_PROTOCOL.md  <- MANDATORY - SI-95, governs TRACK_RECORD.csv
```

### Why each file matters:

**SESSION_CLOSE_PROTOCOL.md** — Reading at open means close steps cannot be forgotten (E30 prevention).

**STRATEGY_FRAMEWORK.md** — SI-89. Governs Strategy A and Strategy B rules. Must be in context
for every trade decision. Strategy B in particular requires the three mandatory declarations
and the stop-only-moves-up rule to be active at all times.

**STRATB_SOURCING_PROTOCOL.md** — SI-91. Added S70-S72 catch-up after reactive news search
repeatedly surfaced already-moved names. Defines the leading-indicator catalyst taxonomy
(IPO quiet periods, index calendars, lockups, 13D filings, contract award dates, short
interest overlays) that Strategy B candidates should be sourced from, and the standing
forward calendar that must be checked and updated every session.

**DECISION_REGISTER.md** — The active watchlist. Every name the fund is tracking, its stage,
entry zone, stop level, and status. This is where stocks remain visible until entered or ruled out.
Names on this list must be reviewed at every session — not just when price is in zone.

**FUND_SESSION_STATE.md** — Current portfolio snapshot. Cross-reference against journal to confirm
no overnight changes have been missed.

**LESSONS_LEARNED.md** — Scan the LAST THREE ENTRIES every session. These are the most recent
errors and rules. The purpose is active prevention, not retrospective diagnosis. Reading them
regularly is the only way to ensure they are not repeated. Key permanent lessons:
  V1:  Conviction Verification Loop — mandatory table before any conviction rating
  V1-S: Source hierarchy — primary sources before conclusions
  V1-GO: Go/No-Go reassessment loop — runs fresh at every entry decision point
  P62: Early-investor discount-basis overhang screen — mandatory Stage 1 check on any
       candidate with a PIPE/pre-IPO/SPAC-sponsor cohort sitting on a deep discount basis
       (added S83, generalises T74/P42 from reactive to pre-entry; SPCX named example)
  T64: Chart price supersedes search data
  T65: HNR1 standalone stop — manual cancel required on any exit
  T66: Check all stops after any order cancellation
  T67: Every exit requires one of four stated conditions
  E30: Journal written at close only, never mid-session
  E31: Journal never overwritten — always new file

**MARKET_HEALTH_CHECK.md** — Current market regime score. Read while status is ELEVATED or CRISIS.
Governs entry gates and crash stress test requirements.

**BTC_PLAYBOOK.md** — Cycle monitor. Read on Fridays and any session when BTC is below $67,000.

---

## STEP 4 — SESSION TIMING (permanent facts — do not flag as errors)

Sessions close at 6-7pm UAE = 10-11am ET = mid US session.
NYSE does not close until 00:00 UAE.
Journal prices are ALWAYS intraday — never EOD. This is by design.
Price variances between journal and next-morning IBKR data are EXPECTED and NORMAL.
Morning stop proximity analysis uses EOD prices — this is the primary value of the morning session.

---

## STEP 5 — IBKR RECONCILIATION (autonomous — no user action required)

Pull live data:
  a. get_account_summary       → net liquidity
  b. get_account_positions     → live positions + unrealised P&L
  c. get_account_orders        → confirm all GTC stops live at correct levels
  d. get_account_trades(TODAY) → any overnight fills since last session

Cross-reference against journal. Flag any discrepancy immediately.

**HNR1 STANDALONE STOP CHECK** (while HNR1 held):
Confirm only ONE GTC stop exists at EUR229.60 in Orders tab.
This stop is not bracket-linked. Manual cancel required on any HNR1 exit.
Failure to cancel creates an unintentional short sell of 40 EUR shares.

---

## STEP 6 — STRATEGY B CHECK (every session)

Read STRATEGY_FRAMEWORK.md before this step.

### PRE-CATALYST SCAN — RUN BEFORE NEWS SEARCH (added S79, P61)
Before scanning for current news catalysts, run this check on each name in the
DECISION_REGISTER with a pending catalyst:

  For EACH name with a credible time-bounded probability thesis:
  1. Pull primary source feeds DIRECTLY — not financial news aggregators:
     - Defense / contracts: GovConWire, SAM.gov, Breaking Defense
     - Mining / resources: company IR pages, Ontario/Nevada mining announcements
     - Space / defense: SpaceNews, Payload Space, NASASpaceflight
     - Biotech: Endpoints News, FierceBiotech (only if biotech approved)
     - Insider cluster buys: insider-monitor.com (rolling 2-week window)
  2. Ask: has the probability of the thesis materially increased or decreased?
  3. If probability has increased AND three declarations are now completable:
     ENTRY IS REQUIRED. Do not defer pending confirmation.
     Waiting for a press release AFTER declarations are completable = E32 violation.
  4. If probability has collapsed: close or reduce any existing position.

This check runs BEFORE any reactive news search or screener analysis.
The purpose is to find catalysts by probability shift, not by headline.
By the time a catalyst appears in financial media it is already priced.

### V1 — CONVICTION VERIFICATION LOOP (MANDATORY — added S80)
═══════════════════════════════════════════════════════════════════
Any conviction rating stated in this session requires the V1 table to appear
in the response BEFORE the rating is published. If any row cannot be filled
from a primary source, research continues until it can. A conviction rating
without a complete V1 table above it is a protocol violation.

Source rule (V1-S): secondary commentary (news articles, analyst summaries) is
used to LOCATE information only. Conclusions are drawn from primary sources:
SEC filings, agency releases (DOE/DEA/NRC), earnings transcripts, Form 4s.
If a primary source has not been read, any conclusion is marked PROVISIONAL.
Provisional conclusions cannot anchor a conviction rating or go/no-go decision.

SESSION CROSS-REFERENCE RULE: before publishing any conviction rating, explicitly
ask: "What was established earlier in this session that is relevant to this name?"
Research done hours earlier in the same session must be pulled forward — recency
bias within a session is the primary source of omission errors (see OKLO S80).
═══════════════════════════════════════════════════════════════════

V1 TABLE — must appear before any conviction rating:

| V1 CHECK | Primary Source | Finding |
|----------|---------------|---------|
| 1. Cash and runway | 10-Q / 8-K balance sheet | |
| 2. Catalyst — named, dated, probability | Company IR / agency primary release | |
| 3. Regulatory pathway | Permit filings / agency docs | |
| 4. Sector policy backdrop | Government primary statements | |
| 5. Insider activity | Form 4 filings (SEC EDGAR) | |
| 6. Analyst consensus | Range, distribution, and recency | |
| 7. Technical setup | Chart per T71 (required) | |
| 8. Macro / sector headwinds | Named, sector-specific risks | |
| 9. Session cross-reference | What was established earlier today? | |
| 10. Challenge gate | What moves this 10pts either direction? | |

### V1-GO — GO/NO-GO REASSESSMENT LOOP (MANDATORY at entry decision — added S80)
═══════════════════════════════════════════════════════════════════
This loop runs fresh at the point of every conviction trade entry decision.
It cannot be substituted by a V1 table run earlier in the session.
The loop must appear in the session output before order parameters are stated.
Its absence when a go/no-go is being discussed is a protocol violation.
═══════════════════════════════════════════════════════════════════

At the point of GO/NO-GO decision, explicitly output this block:

  GO/NO-GO REASSESSMENT — [TICKER]
  ─────────────────────────────────
  V1 table: COMPLETE / INCOMPLETE [if incomplete, state which rows and pause]
  Primary sources confirmed: [list the actual filings/releases read]
  Conviction at V1 completion: [X%]
  What I missed on first pass: [explicit statement — "none" only if genuinely verified]
  Does the omission change the rating? [YES/NO and direction]
  Revised conviction: [X%]
  Three declarations: DEC1 [complete/incomplete] DEC2 [complete/incomplete] DEC3 [complete/incomplete]
  GO / NO-GO: [state explicitly]

Ask: "What named catalyst exists in the next 1-7 days that could drive a 5-15% move
in a liquid name? Does it meet the three mandatory declarations?"

Current proven Strategy B categories:
  - Geopolitical resolution (peace deal, ceasefire): CCL, NCLH, RCL, UAL, DAL, AAL
  - Post-earnings bounce on quality name after contagion selloff: SNPS (proven S60)
  - IPO adjacency sentiment move: sector-adjacent names around major listing days
  - Index inclusion / institutional forced buying
  - Mega cap with specific short-term momentum catalyst

Check Strategy B positions live:
  - Are stops above cost basis on all Strategy B positions?
  - Has the hard exit date passed on any open Strategy B trade?
  - Has the catalyst resolved or failed on any open trade?

If a Strategy B trade is at hard exit date: flag for immediate market close at session open.

---

## STEP 7 — DECISION REGISTER PROXIMITY CHECK (SI-88) — Updated S67 P44/P45

### SUB-STEP 7A — STAGE 2 IN-ZONE MANDATORY DECISION (P44 — RUNS BEFORE ALL ELSE)

Before the proximity table, identify every name where Stage 2 is complete AND current
price is within 5% of the entry zone (above or below).

For EACH such name, output this block — in this format — before anything else:

  ⚠️  STAGE 2 IN ZONE — MANDATORY DECISION: [TICKER]
  Zone: [$X-$Y] | Current: [$Z] | Distance: [N%]
  Crash stress test: [PASS / FAIL / not yet run]
  Previous deferral condition: [state it]
  DECISION REQUIRED: ENTER / PASS / DEFER
  If DEFER: new condition must be stated + new deadline (session number or date)

This block CANNOT be skipped. It CANNOT be satisfied by a proximity table row.
It CANNOT be silenced by a prior deferral. A deferral label from a previous session
does NOT carry forward — it must be actively renewed here with a new condition and deadline.

If a session is dominated by active trades (crashes, exits, peace basket entries),
the Stage 2 in-zone decision is STILL made first. No exception. Thirty seconds of
"DEFER — reason X — deadline S[N]" is sufficient. The decision must be on record.

Origin P44: AIP had Stage 2 complete, was in zone at $34-37 across S63-S65.
No binary decision was made. Stock at $41.22 by S67. Second HPE instance.
This sub-step exists so that never happens again.

---

### SUB-STEP 7B — FULL REGISTER PROXIMITY TABLE

For every name in the DECISION_REGISTER, state status:

  [TICKER] | Zone [X-Y] | Current [Z] | Distance [N%] | Strategy A/B | STATUS

STATUS options:
  ORDER REQUIRED — no valid deferral. Request confirmation before proceeding.
  DEFERRED — [condition + deadline stated — must be renewed this session]
  ALERT SET — not yet in zone
  WATCHING — in zone but catalyst condition not yet met

DEFERRAL RENEWAL RULE (P45): A DEFERRED status is not a standing state. At each session
open, confirm or update the condition and deadline. If not renewed explicitly, it
escalates to MANDATORY DECISION at next open.

ESCALATION: Two consecutive sessions ORDER REQUIRED with no action and no documented
deferral triggers: "ESCALATION — [TICKER] ORDER REQUIRED [N] sessions. Confirm:
ENTER / PASS / DEFER before continuing."

---

## STEP 8 — MARKET HEALTH CHECK (while status ELEVATED or CRISIS)

Pull autonomously:
  - WTI via EOD commodity API
  - SPX/SPY via EOD or IBKR
  - VIX and 10yr yield via web search
  - HYG via web search

Calculate composite score (0-24). State regime before any trade discussion.

While score >7: ALL new Strategy A entries require crash stress test.
Strategy B stops must be confirmed above cost before session close.

---

## STEP 9 — SESSION OPEN OUTPUT (structured, no prose)

DATE: [today from bash clock]
JOURNAL READ: S[N] — [date] | Next journal: trading_journal[N+1].jsx
NET LIQ: $[X] | UNREALISED: $[X] | DAILY P&L: $[X]
CASH: USD $[X] | GBP £[X] | EUR €[X]
POSITIONS: [count Strategy A] Strategy A | [count Strategy B] Strategy B
WTI: $[X] | VIX: [X] | 10YR: [X]% | REGIME: [score]/24
OVERNIGHT FILLS: [None or details]
STOP FLAGS: [positions <5% from stop]
STRATEGY B ACTIVE: [names, stop levels, hard exit dates]
STRATEGY B CATALYST HUNT: [any named catalyst in next 7 days?]
DECISION REGISTER: [names in zone or approaching]
LESSONS SCAN: [last 3 lessons confirmed active — V1/V1-S/V1-GO always listed]
PENDING BUY ORDERS: [list — confirm keep or cancel]
MANDATORY FIRST ACTIONS: [from journal and FUND_SESSION_STATE]
SCREENERS: "Please run CF-SCREEN-D, A, B, C, SI39 + Options — screenshot top 25 each"
CLOSE PROTOCOL LOADED: YES

Then await screener screenshots before any analysis.

---

## STEP 10 — IBKR SCREENER REQUEST (every session where NYSE is open)

"Before we start — please open IBKR Trader Workstation → New Window → Screener
and run these saved screeners, screenshotting top 25 results from each:

  1. CF-SCREEN-D  — Volume Anomaly          (FIRST — signals fade during the day)
  2. CF-SCREEN-A  — Revenue Momentum
  3. CF-SCREEN-B  — Quality at 52-Week Lows (PRIMARY while AMBER regime)
  4. CF-SCREEN-C  — Earnings Surprise
  5. CF-SCREEN-SI39 — Thesis Drawdown Watchlist
  Options tab: High Call Volume top 25, High Put Volume top 25
  First Friday of month: also run CF-SCREEN-EU

All can be done in one batch in under 5 minutes."

---

## WHAT THE JOURNAL MUST CONTAIN AT EVERY CLOSE

The journal is the backbone. It must capture at close:

POSITIONS: Every held position — ticker, shares, avg cost, last price, stop level,
           strategy (A or B), unrealised P&L, notes
TRADES: Every fill — symbol, side, qty, price, type, realised P&L, thesis statement
ORDERS LIVE: Every GTC stop and pending order with levels
STRATEGY B: Active trades — catalyst, stop level, hard exit date, current status
WATCHLIST: Any new names added, stage changes, alert levels set
DECISIONS: Every ENTER/PASS/DEFER decision made this session with reasoning
LESSONS: Any new T-codes, E-codes, or rules established
MACRO: WTI, VIX, 10yr, SPX, market health score
NEXT SESSION MANDATORY ACTIONS: Specific, numbered, actionable
NET LIQ / P&L: Final numbers at close

---

## PRICE NOTE (permanent)

Journal prices are ALWAYS intraday — session closes at 6-7pm UAE, mid-US session.
Morning review uses EOD prices. Variance between journal price and next-morning
IBKR data is EXPECTED and NORMAL. Never flag as an error.

---

*Written: S61 | 9 June 2026 | Supersedes all prior versions of SESSION_OPEN_PROTOCOL.md*
*Updated: S80 | 26 June 2026 — V1 Conviction Verification Loop and V1-GO Go/No-Go
Reassessment Loop added to Step 6. V1/V1-S/V1-GO added to Lessons Scan in Step 9.
Origin: OKLO S80 conviction rating required three corrections due to omissions from
primary sources and failure to cross-reference earlier session research. The V1 table
and V1-GO block are the visible enforcement mechanism. Their absence in any session
output where conviction or go/no-go is discussed is a protocol violation.*
*The journal is the backbone. Read it first. Write it last. Never skip. Never overwrite.*
