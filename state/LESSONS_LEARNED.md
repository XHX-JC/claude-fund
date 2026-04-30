# LESSONS LEARNED — CLAUDE FUND
**Account:** U24936508 (IBKR Pro) | **Compiled through Session 33 (2026-04-30)**
**Journal version:** trading_journal48.jsx | **SIs:** 1-61

---

## ERROR TAXONOMY (SI-17) — 20 CODIFIED ERROR TYPES

| # | Error | Description | Prevention |
|---|-------|-------------|-----------|
| E1 | Timezone / US earnings timing | Wrong open/close times or earnings drop timing | NYSE 17:30 UAE open / 00:00 UAE close. LSE 11:00 UAE (BST) / 19:30 UAE. US AMC earnings AFTER 00:00 UAE — market CLOSED at print. ALWAYS read TIMEZONE REFERENCE block at journal top before stating any time. NEVER calculate from memory. Recurred S30 and S32. |
| E2 | Stale position | Using journal price vs IBKR | IBKR screenshot = ground truth |
| E3 | Fill re-flag | Flagging executed orders as pending | Check fills before flagging |
| E4 | Price verification | Acting on unverified prices | MMD primary for prev close; IBKR for live |
| E5 | Market timing | Acting outside hours | Verify exchange and hours |
| E6 | Dividend capture | Selling before ex-div | Check calendar |
| E7 | Session discipline | Thesis drift in fatigue | Re-read SI-25 |
| E8 | Stale quote | Using stale price as live | MMD mandatory for close data |
| E9 | GTC orphan / accidental short | GTC stop persists after manual exit, fires into empty position | Cancel GTC BEFORE or IMMEDIATELY after manual exit. Verify FLAT in IBKR. Any negative quantity = SHORT = immediate review. Recurred S32: PDYN -250 short created, cover cost ~-$25. |
| E10 | Closed position scan | Closed name appearing in live scan | Cross-reference positions[] and closed log |
| E11 | 52wk hallucination | Stating 52wk range from memory | EODHD extended quotes mandatory. Memory forbidden. |
| E12 | Tool routing gap | Wrong tool for data type | MMD=current price. EODHD=52wk range. |
| E13 | EODHD delay | EODHD lastTradePrice 4-6 days stale | Use MMD for current session |
| E14 | Date discrepancy | Key event dates wrong | 2+ primary sources minimum |
| E15 | AIM stop limitation | IBKR cannot place stops on AIM stocks | Manual alert protocol |
| E16 | Tracker-Journal drift | Position data mismatch | Reconcile every session open |
| E17 | Stop modification sequencing | Stop fires while being debated | Cancel FIRST. Confirm Cancelled. Then debate. Then replace. |
| E18 | Negative position not checked | Short created and not caught at close | At session close: visually confirm ALL IBKR quantities ≥ 0. Any negative = short = resolve before leaving. |
| E19 | (Reserved) | Short without mandatory buy stop | Every short must have simultaneous GTC buy stop. Non-negotiable. |
| E20 | **Stale web data presented as live price during active session** | Web search / financial sites return PREVIOUS SESSION data during live market hours. Claude contradicted IBKR live price with stale web data. | **During NYSE hours (17:30-00:00 UAE) or LSE hours (11:00-19:30 UAE): IBKR TWS is the ONLY authoritative live price source. Web search = stale. MMD /prev = previous day close only. NEVER contradict IBKR live prices. Accept IBKR as ground truth during session. If price seems unusual, ask user to confirm on IBKR — do not run web search to verify.** Occurred S33: IBKR showed MSFT $401-403 post-earnings open. Web search returned yesterday's $414-424. IBKR was correct throughout. |

---

## THESIS & STRATEGY LESSONS

### T1-T22 — See prior sessions (S31 and earlier)

### T23 — DELIBERATE EXIT BEFORE EARNINGS BINARY (S32)
When clearance falls below 2% AND earnings binary within 7 days: evaluate deliberate exit + re-entry bracket vs stop-dependent hold. Stop does not protect against gaps.

### T24 — STOP RAISE LOGIC FOR SAME-DAY EARNINGS (S32)
Correct ceiling for earnings-day stop raise: ~3-3.5% below current price. Loose enough to survive pre-earnings afternoon volatility, tight enough to capture intraday drift.

### T25 — TRADING DOWN AS WELL AS UP: CORE FUND CAPABILITY (S33)
Market at structurally high valuations (Shiller P/E >40). AI capex $400B vs $15-20B revenues. WTI $108 with market pricing benign resolution. AI/tech names at 50-100x fwd PE have no earnings floor. Fund formally adopts short/put capability. Discipline is identical to longs: specific thesis, defined risk, within rules. SI-60 and SI-61 govern. P23 one-sentence test is the gate.

### T26 — POST-EARNINGS SELL-OFF PATTERN: BUY THE REPEAT (S33)
MSFT Q2 (Jan 28): beat on fundamentals, -10% on capex concern. Recovered to $424 by late April. MSFT Q3 (Apr 29): beat on fundamentals (Azure +40%), -5% on same capex concern ($190B). Pattern identical. Thesis intact. Stop protected the original position (+$940 profit). P11 re-entry at $403 captures the same recovery at lower cost. KEY: when a stock sells off on a repeated concern (not a new fundamental break), the sell-off is a mechanical re-entry opportunity, not a thesis review.

---

## POSITION-SPECIFIC LESSONS

### P1-P22 — See prior sessions

### P23 — OPTIONS AND SHORT ENTRY: THE ONE-SENTENCE TEST (S33)
Every short or put requires: specific company + specific valuation problem + specific catalyst — in one sentence. Index puts require 13-15% break-even on a diluted basket — poor R/R for this fund. Single-stock puts on overvalued names with imminent catalysts: correct vehicle. Math standard: minimum 2:1 upside on the expected scenario. QQQ Dec $600 put: risk $2,450 to earn $1,550 on -15% = FAIL. Declined correctly.

### P24 — SI-35 EXCEPTION DOCUMENTATION (S33)
MSFT re-entry: 25sh, stop $373, risk $750 vs $500 SI-35 rule. Exception documented because: (a) stop is at original cost basis floor $372.77, (b) 52-week low $356 provides further support, (c) trade #30 +$940 profit provides buffer. SI-35 exceptions must be explicitly documented in journal with rationale. Undocumented exceptions are protocol failures.

---

## SCAN PROTOCOL LESSONS

### S1-S14 — See prior sessions

### S15 — SCANS FEED THE SHORT WATCHLIST (S33)
SI-39 (every session) secondary output: fwd PE ≥ 3× sector median + deteriorating fundamentals → flag for SI-61. SI-45 (weekly) secondary output: near 52wk HIGH + fwd PE >50x + decelerating growth → flag for SI-61. Same scan, inverse lens. Takes 30 seconds at scan time. No separate process required.

---

## INFRASTRUCTURE LESSONS

### I1-I12 — See prior sessions

### I13 — LIVE PRICE SOURCE HIERARCHY (S33, E20)
**During live market hours:**
1. IBKR TWS — authoritative. Accept without verification.
2. MMD /v2/snapshot — may provide live data (test before relying on)
3. MMD /v2/aggs/ticker/{T}/prev — PREVIOUS DAY close only. Not intraday.
4. Web search — STALE. Returns cached/previous session data. Do not use for live prices.
5. Financial sites (Yahoo, Robinhood, Investing.com) — may show previous close. Do not trust intraday during active session.

**If a price seems unusual during session:** ask user to confirm on IBKR. Do NOT run web search to verify. IBKR is always right during live session.

---

## STANDING INSTRUCTIONS

### SI-25 — EXIT TRIGGER (UPDATED S33)
WTI $107.94 (30 Apr 2026). 52-week high $117.63. Corrected SI-25 exit threshold: $105.87 (-10% from $117.63). WTI currently ABOVE threshold but dual condition still unmet: requires PERMANENT Hormuz reopening + WTI -10% from peak. WTI moving UP does NOT trigger. Thesis intact. UAE OPEC exit accelerates post-peace oil collapse — tightens NOG exit timing on any peace deal announcement.

### SI-47 — DATE VERIFICATION STEP ZERO
System prompt date is authoritative. State before any analysis.

### SI-57 — P11 LOG (UPDATED S33)
CODA: stopped $11.42 (Apr 27). P11 met (low $11.07). Re-entry S33: 250sh @$11.10, stop $10.00.
MSFT: stopped $410.38 (S33 open). P11 met immediately ($403.01 < $410.38). Re-entry S33: 25sh @$403.01, stop $373. SI-35 exception documented (P24).
CCJ: deliberate exit $119.97 (Trade #27). Re-entry 50sh @$117.02, stop $110.

### SI-59 — STOP MODIFICATION SEQUENCING
Cancel existing stop FIRST. Confirm Cancelled status. Then debate. Then place new stop.

### SI-60 — SHORT SELLING AND OPTIONS PROTOCOL (S33)
Options Level 3 + US market confirmed active on IBKR Pro U24936508.
Max premium per options position: 2.5% NAV (~$2,600). Premium = stop.
Direct short max loss: SI-35 $500. Mandatory GTC buy stop before short order. Max short exposure: 5% NAV.
Borrow cost: reject if >5% APR.
Oil thesis correlation: acknowledge before entry.
Five entry criteria: (1) fwd PE ≥ 3× sector median (2) specific catalyst where consensus is too optimistic (3) no imminent squeeze catalyst (4) short interest <15% float (5) specific articulable problem.

### SI-61 — SHORT WATCHLIST (S33, scan-fed)
| Ticker | Thesis | Fwd PE | Trigger | Correlation |
|--------|--------|--------|---------|-------------|
| PLTR | 108x fwd PE vs 18x median; compresses on guidance miss | 108x | May 4 AMC print | Low |
| AAL | No fuel hedge, $36.5B debt, FY EPS -$0.40 to -$1.10 | Loss | Bounce $13-14 | HIGH — NOG |

Review every session alongside SI-39 and SI-45. Max 5 entries. Remove when catalyst passes or thesis breaks.

---

## SESSION CLOSE CHECKLIST — SESSION 33 FINAL
```
SESSION CLOSE CHECKLIST — SESSION 33
======================================
✅ 1. trading_journal48.jsx written — v48 FINAL
✅ 2. FUND_SESSION_STATE.md written — S33 final close
✅ 3. LESSONS_LEARNED.md updated — E20 added, T26/P24/I13 added
✅ 4. PDYN short cover confirmed — Trade #29 ~-$25
✅ 5. MSFT stop-out confirmed — Trade #30 +$940. Re-entry $403.01 live.
✅ 6. Stop raises confirmed: NOG $26.47, AMZN $249.88, V $312.82
✅ 7. CODA 250sh @$11.10, stop $10.00 confirmed
✅ 8. BAH GTC $76.50 + stop $69 submitted (bid $76.60 — imminent)
✅ 9. TXT GTC $88.00 + stop $79 submitted (needs pullback from $93.46)
✅ 10. BKR + GOOGL GTCs cancelled — confirmed in orders tab
✅ 11. SI-60/SI-61/P23/T25/T26/E20/I13 codified
⬜ 12. USER: run session-close.bat (GitHub backup)
⬜ 13. S34 check: is May 1 a US market holiday? (May Day is not a US holiday — NYSE open)
======================================
```
