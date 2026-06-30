# TRACK RECORD PROTOCOL
# SI-95 | Created S83 | 30 June 2026 | James + Claude
# Status: PERMANENT — governs TRACK_RECORD.csv maintenance
# Read at: every session open and close, alongside DECISION_REGISTER.md

## PURPOSE

LESSONS_LEARNED.md and the trading_journal files stay narrative — they explain
reasoning, mistakes, and context. They are not built to answer "what is the
fund's actual win rate" or "what is the realized P/L on closed trades" without
manually reading through dozens of journal entries. TRACK_RECORD.csv exists to
answer exactly that question, in one file, at a glance.

This file is a LEDGER, not a narrative. One row per trade. No paragraphs.
If an entry needs more than ~8 words of context, that context belongs in the
journal or LESSONS_LEARNED, not here, referenced by date if needed.

## FILE LOCATION

C:\Users\James Cadbury\Dropbox\Claude-Fund\state\TRACK_RECORD.csv

## SCHEMA

Status,Ticker,Side,Qty,Open_Date,Close_Date,Entry,Exit,Realized_PL,Return_Pct,Strategy,Catalyst,Notes

- Status: OPEN or CLOSED
- Side: LONG or SHORT
- Open_Date / Close_Date: YYYY-MM-DD. Close_Date blank while OPEN.
- Entry / Exit: average fill price. Exit blank while OPEN.
- Realized_PL / Return_Pct: blank while OPEN. Computed at close.
- Strategy: A or B (per STRATEGY_FRAMEWORK.md). Blank only for pre-protocol
  backfilled rows where the original classification isn't known.
- Catalyst: ONE LINE, under 8 words. Not a thesis writeup. e.g. "ABTECT data
  positive but ADS dilution crushed stock" — not a paragraph.
- Notes: reserved for short structural flags only (e.g. "ticker recoded
  mid-position"), not commentary.

## STANDING RULE — UPDATE ON EVERY ENTRY AND EVERY EXIT

This is not a session-close-only task. The row is written or updated AT THE
MOMENT the order fills, in the same tool call sequence as confirming the fill
to James, not deferred to session close.

ON ENTRY (order confirmed filled):
  Append a new row. Status=OPEN, Ticker, Side, Qty, Open_Date, Entry,
  Strategy, Catalyst filled in. Close_Date/Exit/Realized_PL/Return_Pct blank.

ON EXIT (position closed, partial or full):
  Find the matching OPEN row for that ticker. Update Status=CLOSED,
  fill Close_Date, Exit, Realized_PL, Return_Pct. Do not append a duplicate
  row — edit the existing one in place.
  If a position is exited in multiple partial fills, wait until fully flat
  before closing the row, using volume-weighted average exit price across
  all fills, matching the round-trip logic already used in the backfill.

CORPORATE ACTIONS (ticker symbol changes mid-position, e.g. RR.->RRl in the
backfilled data): treat as the SAME position. Do not split into two rows.
Use original ticker, note the rename in Notes.

## WHAT THIS FILE IS NOT

- Not a replacement for DECISION_REGISTER.md (which governs whether to enter)
- Not a replacement for the journal (which governs session narrative)
- Not a place for thesis detail, R/R math, or stop reasoning — those live
  in DECISION_REGISTER.md and the journal at entry time
- Not to be reorganized, sorted, or restructured session to session — it is
  an append/edit ledger, chronological by close date for closed rows

## BACKFILL NOTE (S83)

94 historical round trips (95 after merging the RR./RRl ticker-rename pair)
were reconstructed directly from the IBKR activity statement
(U24936508_20260101_20260629.csv) covering 1 January - 29 June 2026, fully
matched against fill-level execution data, not estimated. All 9 open
positions reconciled exactly against the live IBKR portfolio as of S83.

Total realized P/L on closed stock trades over the period: -$9,619.12
across 95 round trips. Win rate: 42/95 closed trades profitable (44.2%).
This figure is REALIZED ONLY — it excludes unrealized P/L on the 9 still-open
positions, dividends, interest, commissions netted separately, and any
options/forex activity not captured in the Stocks trade extract.

Strategy (A/B) and Catalyst columns are blank on most backfilled rows because
that classification was not tracked at the time of those trades. Going
forward, every new row gets both fields populated at entry — this is now
non-negotiable per the standing rule above, not optional context.

A meaningful number of this backfill's losses cluster in two events worth
remembering without re-litigating in this file: FAC (three legs, -$7,579.38
combined, IPO-day volatility) and ABVX's three round trips (net -$1,419.69,
detailed catalyst-by-catalyst in the rows above). Full narrative on both
belongs in LESSONS_LEARNED.md if not already there — this file only carries
the one-line summary.
