# TIME PROTOCOL — CLAUDE FUND
## Version 1.0 | Created S38, 08 May 2026
## Supersedes E1 timezone taxonomy for all market-hours verification

---

## THE ONLY RULE

**At the start of every session, run this bash command FIRST.
Do not state any date, time, or market status before running it.**

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

That output is the ground truth. Nothing else is.

---

## DATE CROSS-CHECK (MANDATORY — prevents NCH2-type incidents)

After running the command, compare the computer date against the system prompt date.

| Result | Action |
|--------|--------|
| Dates match | Proceed normally |
| Dates differ | STOP. State the discrepancy. Ask user which is correct before proceeding |

**The NCH2 near-miss (S37):** System prompt said May 13. Actual date was May 7.
An entry was almost triggered 5 days before the gate. The computer clock would have
caught this immediately. The system prompt date is a convenience reference only —
the computer clock is always authoritative.

---

## MARKET HOURS (UAE = UTC+4, no daylight saving)

| Exchange | Opens UAE | Closes UAE | Notes |
|----------|-----------|------------|-------|
| LSE | 11:00 | 19:30 | Winter (Oct-Mar): 12:00-20:30 |
| Frankfurt / Milan | 11:00 | 19:30 | Winter (Oct-Mar): 12:00-20:30 |
| NYSE / NASDAQ | 17:30 | 00:00 | Winter (Oct-Mar): 18:30-01:00 |

UAE does not observe daylight saving. The bash script uses UTC so handles
exchange clock changes automatically — no manual adjustment ever needed.

---

## WHY THE OLD PROTOCOL FAILED

The E1 taxonomy required mental arithmetic across UTC/BST/CEST/EDT offsets.
It was correct in content but wrong in method — it relied on memory calculation
rather than a real clock. This produced confident-sounding but fabricated
timestamps (e.g., "09:30 UAE — LSE OPEN" stated when LSE was actually closed).

The bash command eliminates the calculation entirely. One command, real output,
no mental arithmetic, no fabrication possible.

---

## SESSION OPEN — UPDATED STEP ZERO

Before any analysis, market comment, or order suggestion:

1. Run the bash command above
2. Read the output
3. State: "Computer date: [X]. System prompt date: [Y]. Match: YES/NO"
4. If NO match — stop and ask user before proceeding
5. State actual market open/closed status from the output

This replaces SI-47 date protocol and E1 market-hours verification.

---

*Written: S38 | 08 May 2026 | Filesystem path confirmed: Claude-Fund\state\TIME_PROTOCOL.md*
