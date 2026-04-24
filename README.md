# Claude Fund — Private Trading Journal Repository

**Account:** IBKR Pro U24936508 | **Base:** UAE | **NAV:** ~$105K

## Directory Structure

```
claude-fund/
├── journal/          ← trading_journalNN.jsx (versioned per session)
├── state/            ← Session state, briefs, and lesson files
│   ├── FUND_SESSION_STATE.md     ← Primary portfolio state (written each session)
│   ├── LESSONS_LEARNED.md        ← Error taxonomy + standing instructions
│   ├── SESSION_BRIEF.md          ← AUTO-GENERATED 05:30 UAE daily (macro)
│   └── OPPORTUNITY_SCAN.md       ← AUTO-GENERATED 06:00 UAE daily (signals)
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
