# Claude Fund — Private Trading Journal Repository

**Account:** IBKR Pro U24936508 | **Base:** UAE | **NAV:** ~$99K

## Structure

```
claude-fund/
├── journal/          ← trading_journalNN.jsx files (versioned per session)
├── state/            ← FUND_SESSION_STATE.md + LESSONS_LEARNED.md
├── tracker/          ← Claude_Fund_Trade_Tracker.xlsx
├── intelligence/     ← Hormuz log, thesis developments, dated geopolitical notes
└── session-close.bat ← Run at end of every session to commit + push
```

## Session Close Protocol

1. Claude writes updated files to this repo via filesystem MCP
2. Run `session-close.bat` (double-click)
3. GitHub Desktop confirms push — done

## Price Hierarchy (SI-1)

EODHD → Alpha Vantage → MMD → IBKR screenshot (ground truth)

## Exit Trigger (SI-25)

Formal Hormuz reopening + WTI oil -10% from peak ($111.54) simultaneously.
Neither condition alone is sufficient.

---
*Private repository. Do not share.*
