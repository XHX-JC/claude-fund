# Claude Fund — Private Trading Journal Repository

**Account:** IBKR Pro U24936508 | **Base:** UAE | **NAV:** ~$105K

## Directory Structure

```
claude-fund/
├── journal/          ← trading_journalNN.jsx (versioned per session)
├── state/            ← Session state, decisions, briefs, and lesson files
│   ├── FUND_SESSION_STATE.md          ← LIVE. Sole authoritative source for current holdings,
│   │                                    cash, and orders. Overwritten in place at each session
│   │                                    close (S110) — always exactly one current snapshot, not
│   │                                    a running log.
│   ├── FUND_SESSION_STATE_ARCHIVE.md  ← HISTORICAL. One-time Stage 3B migration archive of the
│   │                                    pre-restructure snapshot history. Not routinely written to
│   │                                    at close — Git history, journals, and TRACK_RECORD.csv
│   │                                    cover ongoing history instead.
│   ├── DECISION_REGISTER.md           ← LIVE. Current decisions, active watchlist, live catalyst
│   │                                    dates, standing operational rules. Does NOT hold current
│   │                                    positions/cash — see FUND_SESSION_STATE.md for that.
│   ├── DECISION_REGISTER_ARCHIVE.md   ← HISTORICAL. Completed decisions, resolved catalysts,
│   │                                    superseded plans, and past research narrative, moved here
│   │                                    verbatim from DECISION_REGISTER.md (S110 split).
│   ├── LESSONS_LEARNED.md             ← LIVE. Permanent-index lessons (always active) + recent
│   │                                    narrative (last 1-2 sessions).
│   ├── LESSONS_LEARNED_ARCHIVE.md     ← HISTORICAL. Full session-by-session lesson history prior
│   │                                    to the S110 split, moved here verbatim.
│   ├── SESSION_BRIEF.md          ← AUTO-GENERATED 05:30 UAE daily (macro)
│   ├── OPPORTUNITY_SCAN.md       ← AUTO-GENERATED 06:00 UAE daily (signals)
│   └── CRASH_HEDGE_ACTION_PLAN.md ← Read only while MARKET_HEALTH_CHECK.md regime is AMBER/RED/CRISIS (S110)
├── routines/         ← Automated routine prompts and scripts
│   ├── MARKET_BRIEF_PROMPT.md    ← Prompt for 05:30 routine
│   ├── OPPORTUNITY_SCAN_PROMPT.md← Prompt for 06:00 routine
│   ├── SESSION_OPEN_PROTOCOL.md  ← What Claude reads at session start
│   └── routine-push.bat          ← Git push script for routines (main only)
├── tracker/          ← Trade tracker spreadsheet
├── intelligence/     ← Hormuz log, geopolitical thesis notes
├── research/         ← AI thesis, sector deep-dives
└── session-close.bat ← Run at end of every session (commits journal + state)
```

**Live vs. historical, at a glance:** `FUND_SESSION_STATE.md` and `DECISION_REGISTER.md` are
the only files Claude should treat as current at session open; both are kept deliberately
compact. `FUND_SESSION_STATE_ARCHIVE.md`, `DECISION_REGISTER_ARCHIVE.md`, and
`LESSONS_LEARNED_ARCHIVE.md` hold the full historical record moved out of those live files
during the S110 restructure — read them only when retrieving specific past material, not as
part of the routine session-open read.

## Daily Routine Schedule (UAE time)

| Time | Routine | Output |
|------|---------|--------|
| 05:30 UAE | MARKET_BRIEF | SESSION_BRIEF.md — macro, WTI, earnings, congressional trades |
| 06:00 UAE | OPPORTUNITY_SCAN | OPPORTUNITY_SCAN.md — movers, beat/drops, drawdowns, LSE signals |
| 07:00+ UAE | Morning session | Read SESSION_OPEN_PROTOCOL.md first — three files in one batch |

## Session Close Protocol

1. Claude writes updated files to repo via filesystem MCP
2. Run `session-close.bat` (double-click or terminal)
3. GitHub confirms push to main

## Git Rules

- **All pushes to `main` only** — no feature branches, no custom branches
- Routines push via `routine-push.bat` (state files only)
- Session close pushes via `session-close.bat` (all changes)
- If push fails: files are committed locally, push manually via GitHub Desktop

## Price Hierarchy

MMD (current session) → EODHD extended quotes (52wk range) → Yahoo Finance (EU/UK)
IBKR screenshot = ground truth for position prices always

## Exit Trigger (SI-25)

Formal permanent Hormuz reopening + WTI -10% from $111.54 peak = $100.38 trigger.
Neither condition alone is sufficient. Current WTI ~$94-96. Gap ~5-6%.

---
*Private repository. Do not share.*
