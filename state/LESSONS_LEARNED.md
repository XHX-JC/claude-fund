# LESSONS LEARNED — CLAUDE FUND
**Account:** U24936508 (IBKR Pro) | **Compiled through Session 28 (2026-04-23)**
**Journal version:** trading_journal40.jsx | **SIs:** 1–54

---

## ERROR TAXONOMY (SI-17) — 15 CODIFIED ERROR TYPES
| # | Error | Description | Prevention |
|---|-------|-------------|-----------|
| E1 | Timezone — CRITICAL RECURRING FAILURE | Wrong market open/close times stated from memory without arithmetic check. CAUSED REPEATED ERRORS INCLUDING STATING "NYSE CLOSED" WHILE MARKET WAS OPEN. | **MANDATORY PROCEDURE BEFORE STATING ANY MARKET STATUS:** Write the arithmetic explicitly: UAE time now = X. NYSE closes 00:00 UAE (midnight). Is X before 00:00? If yes = OPEN. LSE closes 19:30 UAE. Is X before 19:30? If yes = OPEN. NEVER state market status without doing this check first. CORRECT HOURS (compute, never recall): NYSE opens **17:30 UAE** (09:30 EDT + 8hrs) / closes **00:00 UAE** (16:00 EDT + 8hrs). LSE opens **12:00 UAE** (09:00 BST + 3hrs) / closes **19:30 UAE** (16:30 BST + 3hrs). XETRA opens **11:00 UAE** (09:00 CEST + 2hrs) / closes **19:00 UAE** (17:00 CEST + 2hrs). Dubai = UTC+4 year-round. EDT = UTC-4 (Mar-Nov). EST = UTC-5 (Nov-Mar). BST = UTC+1 (Mar-Oct). GMT = UTC+0 (Oct-Mar). |
| E2 | Stale position | Using journal prices vs IBKR | IBKR screenshot = ground truth always |
| E3 | Fill re-flag | Flagging executed orders as pending | Check IBKR fills before action items |
| E4 | Price verification | Acting on unverified prices | MMD primary, EODHD extended quotes for 52wk range |
| E5 | Market timing | Acting outside hours | NYSE closes 00:00 UAE (midnight). LSE closes 19:30 UAE. XETRA closes 19:00 UAE. Always derive from arithmetic, never memory. |
| E6 | Dividend capture | Selling before ex-div | Check ex-div dates before any LSE sell |
| E7 | Session discipline | Thesis drift in fatigue | Re-read SI-25 before late-session trades |
| E8 | Stale quote | Using stale quote as live | Live price check mandatory before execution |
| E9 | GTC orphan | GTC stop persists after market sell | Cancel stop BEFORE market sell |
| E10 | Closed position scan | Closed position in live scan | Cross-reference SI-19 before scan |
| E11 | 52-week high hallucination | Stating 52wk range from memory | MANDATORY: use EOD:get_us_live_extended_quotes |
| E12 | Tool routing gap | Wrong tool for data type | SI-49 is authoritative routing guide |
| E13 | EODHD price delay | EODHD lastTradePrice may be stale | Use MMD for current session price |
| E14 | Journal date discrepancy | Key event dates wrong | Cross-reference 2+ primary news sources |
| E15 | AIM stop limitation | IBKR does not support stops for AIM securities | Before AIM entry: set manual price alert. IES.L confirmed. |

---

## PERFORMANCE AUDIT
| Metric | S20 Baseline | S28 Update |
|--------|-------------|-----------|
| Net realized P&L (USD) | ~-$2,073 | ~-$2,460 |
| ITM trim realized | — | +£652 |
| RR.L stop-out | — | -£49.35 (S27, re-entry S28) |
| Open unrealized | ~+$5,505 | ~+$7,780 |
| Net Liquidity | ~$102,800 | $105,100 |
| Positions | 14 | 19 |

---

## THESIS & STRATEGY LESSONS

### T1 — Supply Chain Premium > War Premium
### T2 — Toll Regime vs Full Closure Distinction
### T3 — Exit Trigger Discipline (SI-25)
### T4 — Cash Reserve is Tactical, Not Passive
### T5 — Mythos Miss (S13)
### T6 — Target List Cross-Reference (S14)
### T7 — Barbell Deployment Framework (S14)

### T8 — Short Attack Protocol (S16)
Named short seller report is a flag requiring investigation, not an automatic binary block.
**FULL AMENDMENT per S26 — see SI-51 v2 for complete revised rule.**
- Tier 1 and 2 positions: named short report = hard block until rebuttal confirmed + 30 days.
- Tier 3 positions (SI-37 cap, ≤$1,500): named short report = FLAG for weighted assessment. See SI-51 v2.

### T9 — Leveraged BTC Proxy vs Spot (S16)
### T10 — Thesis Is Not a Position Sizing Input (S16)
### T11 — Winners Need Room Equal to Losers (S16)
### T12 — ATH Entry Discipline (S19)
### T13 — Missed Opportunity Capture / SI-39 Genesis (S19)
### T14 — Limit Order Discipline Under Premarket Pressure (S19)
### T15 — Broken Thesis Exit Discipline (S20)
### T16 — SI-45 Weekly Screener Cannot Be Deferred (S23)
### T17 — Conditional Reopening ≠ SI-25 Trigger (S23)
### T18 — Geopolitical Position Management: Verify Before Exiting (S24)
### T19 — ATH RULE IS THESIS-DEPENDENT (S24)
### T20 — "NEXT NVIDIA" FRAMING CORRECTION (S24)
### T21 — TWICE-WEEKLY SCAN AS STRUCTURAL DISCIPLINE (S25)
### T22 — ANALYST CONSENSUS AS SI-48 KILL SWITCH (S25)
### T23 — IDENTIFICATION-TO-ENTRY GAP FOR TIER 3 SPECULATIVE NAMES (S26)
### T24 — STAGE 2 PROPORTIONALITY TO POSITION SIZE (S26)
### T25 — MAJOR CATALYST REQUIRES IMMEDIATE STOP REVIEW (S26)
### T26 — BINARY BLOCKS COST MORE THAN THEY SAVE ON CAPPED POSITIONS (S26)
### T27 — THESIS-INTACT STOP-OUT CREATES RE-ENTRY OPPORTUNITY (S27)

### T28 — STOPS DRIFT BELOW COST BASIS ON WINNING POSITIONS (NEW S28)
**ORIGIN:** Session 28 stop audit. Three positions (CCJ, CRML, LLY) had stops either below cost basis or barely above it despite gains of 19-23%. CCJ at +22.7% still had stop only $4.35 above cost. CRML at +19% had stop below entry. LLY at +2% had stop $55 below cost basis.
**LESSON:** A winning position with a stop below cost basis offers zero protection of gains. Stops may be correctly placed at entry but become stale as price appreciates. Stop review is triggered not only by T25 (>15% single-session move) but also by gain magnitude over time. Any position up >15% from entry deserves a periodic stop review regardless of whether a large single-day move occurred.
**RULE:** At session start, flag any position where: (a) stop is below cost basis AND position is up >10%, OR (b) stop-to-current-price gap exceeds 20% on a position up >15%. Both conditions create unnecessary round-trip risk.
**APPLICATION:** Added to I3 session open protocol step 2A.

---

## POSITION-SPECIFIC LESSONS

### P1–P22 [all previous lessons unchanged]

### P23 — STOP STALENESS AFTER CATALYST RE-RATING (S26)
ITM.L Rheinmetall announcement — stop was -29% below market when reviewed. Raised to 120p/118p SL. At 150p: raise to 130p and hold to 175p. Target revised to 175p/200p stretch.

### P16 RECURRENCE — S26 AND S28
P16: any stop adjustment executed on IBKR must be logged in journal SAME SESSION. Three clean P16 executions in S28: CCJ $108.37→$114.99, CRML $8.34→$9.47, LLY $850→$875.86.

### P24 — EARNINGS-EVE ENTRY CREATES IMPLICIT EARNINGS TRADE (NEW S28)
**ORIGIN:** V BUY $307.125 filled April 23. V earnings are April 28 — next trading day. The position was entered as a SI-39 quality drawdown play, but filling the day before earnings makes it implicitly an earnings trade whether intended or not.
**LESSON:** When a GTC limit order fills within 48 hours of a known earnings date, the position character changes from a drawdown entry to an earnings trade at drawdown pricing. This is not necessarily bad, but it requires conscious acknowledgment of the earnings risk and a deliberate pre-earnings decision on stop positioning. Do not allow a fill to become an accidental earnings trade without a risk assessment.
**APPLICATION:** At session open on the day of or day before earnings: explicitly review stop level and decide whether to hold, tighten, or exit pre-earnings. Document the decision in session notes.

---

## SCAN PROTOCOL LESSONS

### S1–S15 [all previous lessons unchanged]

---

## INFRASTRUCTURE LESSONS

### I3 — Session Open Protocol (SI-32) — UPDATED S27 + S28
1. Read FUND_SESSION_STATE.md
2. Read LESSONS_LEARNED.md
3. Check journal lastUpdated
4. **SI-47: State today's date explicitly — STEP ZERO**
5. **E1 CHECK: NYSE opens 17:30 UAE. LSE opens 12:00 UAE. XETRA 11:00 UAE. Compute — never recall.**
6. IBKR screenshots (positions + orders)
7. **2A: Cross-check all stops vs current prices. Flag: (a) stop below cost basis AND position up >10%, (b) stop-to-price gap >20% on position up >15% (T28)**
8. **2B: Scan all positions for moves >15% since last stop review (T25)**
9. Section 0 SI-39 drawdown batch
10. Section 0-B Wide Net surface scan (SI-52) — 15 min max
11. SI-45 weekly (first session of week only)
12. SI-14 scan A-K
13. Active thesis file checks (research/*.md)
14. Route all data needs through SI-49

### I4–I12 [all previous lessons unchanged]

### I13 — CLAUDE CODE ROUTINES — PENDING CONFIRMATION (NOTE S28)
Two Claude Code routines have been configured but NOT yet confirmed working due to API usage limits in S28. Will be tested and incorporated into journal in the first session of the week of April 27 2026. A saved Word document prompt will trigger the journal update once test runs are confirmed. Do not reference SI-55 or SI-56 until that confirmation session.

---

## STANDING INSTRUCTIONS REFERENCE

### SI-48 — AI THESIS ATH RULE AMENDMENT (S24) [Unchanged]
### SI-49 — STAGE 2 DATA STACK ROUTING PROTOCOL (S24) [Unchanged]
### SI-50 — TWICE-WEEKLY SCAN (S25) [Unchanged]
### SI-51 VERSION 2 — TIER 3 ENTRY FRAMEWORK (REVISED S26 EOD) [Unchanged]
### SI-52 — WIDE NET SURFACE SCAN (S26) [Unchanged]
### SI-53 — ENERGY + NUCLEAR SCAN PROTOCOL (S27) [Unchanged]
### SI-54 — AI NETWORKING SCAN PROTOCOL (S27) [Unchanged]

**NOTE: SI-55 and SI-56 (Claude Code routine protocols) are PENDING — will be added once routines are confirmed working. See I13 above.**

---

## ITM.L STOP AND TARGET HISTORY
| Session | Stop | Target | Context |
|---------|------|--------|---------|
| S22 | 100p/98p SL | 150p | Post-trim |
| S26 | 120p/118p SL | 175p/200p | Rheinmetall NATO re-rating |

---

## 52-WEEK DATA PROTOCOL (E11-E13 PREVENTION)
- **Current price (US):** MMD /v2/aggs/ticker/{TICKER}/prev → use `c` field
- **52-week high/low (US):** EOD:get_us_live_extended_quotes → fiftyTwoWeekHigh/Low
- **EU/UK:** web_fetch Yahoo Finance
- **NEVER use memory for 52-week range**

---

## PROHIBITED DATA SOURCES
- GuruFocus, PitchBook, Macroaxis
- Any search snippet price without verified publication date
- EODHD earnings endpoint (403 confirmed)
- Memory estimates for 52-week high/low
- EODHD lastTradePrice for current session
- Journal-only sourcing for key event dates
- Trump Truth Social posts as geopolitical confirmation (T17)
- Session context as source for current date (I8, SI-47)
- Scan-phase fundamentals without Stage 2 verification (SI-44)

---

*Updated: 2026-04-23 Session 28 — T28, P24 added. I13 note added (routines pending). SI-55/SI-56 deferred pending routine confirmation.*
