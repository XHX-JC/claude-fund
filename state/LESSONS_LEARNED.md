# LESSONS LEARNED — CLAUDE FUND
**Account:** U24936508 (IBKR Pro) | **Compiled through Session 20 (2026-04-15)**
**Journal version:** trading_journal30.jsx | **SIs:** 1–43

---

## ERROR TAXONOMY (SI-17) — 13 CODIFIED ERROR TYPES
| # | Error | Description | Prevention |
|---|-------|-------------|-----------|
| E1 | Timezone | Wrong open/close times | NY=UTC-4, UAE=UTC+4. 17:30 UAE=09:30 NY open. LSE=12:00-20:30 UAE |
| E2 | Stale position | Using journal prices vs IBKR | IBKR screenshot = ground truth always |
| E3 | Fill re-flag | Flagging executed orders as pending | Check IBKR fills before action items |
| E4 | Price verification | Acting on unverified prices | MMD primary, EODHD extended quotes for 52wk range |
| E5 | Market timing | Acting outside hours | LSE closes 20:30 UAE, NYSE 00:00 UAE |
| E6 | Dividend capture | Selling before ex-div | RR.L ex-div Apr 23 — hard lock |
| E7 | Session discipline | Thesis drift in fatigue | Re-read SI-25 before late-session trades |
| E8 | Stale quote | Using stale quote as live | Live price check mandatory before execution |
| E9 | GTC orphan | GTC stop persists after market sell — unintended short | Cancel stop BEFORE market sell or IMMEDIATELY on fill confirmation. S20 instance: AVAV stop $186.21 — cancel confirmed required |
| E10 | Closed position scan | Closed position in live scan with active stop | Cross-reference SI-19 + positions[] before any scan table |
| E11 | 52-week high hallucination | Stating 52wk range from memory | MANDATORY: use EOD:get_us_live_extended_quotes. Memory forbidden |
| E12 | Tool routing gap | Not knowing which tool provides which data | MMD=current price. EODHD extended=52wk range. Never conflate |
| E13 | EODHD price delay | EODHD lastTradePrice may be 4-6 days stale | Use MMD for current session price |

---

## NEW ERROR — S20
| # | Error | Description | Prevention |
|---|-------|-------------|-----------|
| E14 | Journal date discrepancy | Ceasefire expiry stated Apr 22 in journal; multiple primary sources (Bloomberg, CNBC, CNN) state Apr 21. 1-day error on a binary event with position-sizing implications | Cross-reference key event dates with 2+ primary news sources at first mention. Do not rely solely on journal entry for time-sensitive external events. CONFIRMED CORRECTION: Apr 21. |

---

## PERFORMANCE AUDIT FINDINGS (S16 — baseline)
*(Updated at S20)*
| Metric | S16 Baseline | S20 Update |
|--------|-------------|-----------|
| Net realized P&L | ~-$2,144 | ~-$2,073 (+$71 AVAV) |
| Open unrealized | +$2,052 | ~+$5,505 |
| Total P&L (realized + unrealized) | ~-$92 | ~+$3,432 |
| Positions | 13 | 14 |

---

## THESIS & STRATEGY LESSONS

### T1 — Supply Chain Premium > War Premium
Evolved from war premium to supply chain premium. Structural damage persists under toll regime. Unwind on SI-25 only.

### T2 — Toll Regime vs Full Closure Distinction
Toll regime resumes non-oil shipments. Weakened Linde thesis.

### T3 — Exit Trigger Discipline
SI-25 ONLY: formal Hormuz reopening + oil -10% from peak. Ceasefire alone insufficient. S20: oil condition MET at $93. Alert posture elevated.

### T4 — Cash Reserve is Tactical, Not Passive
SI-40 deployment triggers must fire. Islamabad failure Apr 12 activated Trigger A.

### T5 — Mythos Miss (S13)
AI model release caused PLTR -7%. Section K AI query NON-NEGOTIABLE every session.

### T6 — Target List Cross-Reference (S14)
Compare current price vs research reference price. Fallen names = improved entries.

### T7 — Barbell Deployment Framework (S14)
Pool A (thesis-correlated, event-gated). Pool B (quality compounders). Never conflate.

### T8 — Short Attack Protocol (S16)
Named short seller report: DO NOT ENTER if watchlist. If held: assess credibility, tighten stop.

### T9 — Leveraged BTC Proxy vs Spot (S16)
Direct spot BTC via IBKR Paxos preferred over MSTR.

### T10 — Thesis Is Not a Position Sizing Input (S16)
Thesis determines whether to enter. Stop distance determines how much. Separate entirely.

### T11 — Winners Need Room Equal to Losers (S16)
Average winner 4.2% vs average loser 10.7%. Hold thesis-intact positions to primary target.

### T12 — ATH Entry Discipline (S19)
Never enter a war-premium stock at ATH with ceasefire expiry 7 days away. RTX removed at $202.

### T13 — Missed Opportunity Capture / SI-39 Genesis (S19)
GOOGL hit -20% drawdown in March 2026. No protocol flagged it. Recovered +18.5% in 5 weeks. SI-39 Section 0 created to prevent recurrence.

### T14 — Limit Order Discipline Under Premarket Pressure (S19)
Never chase premarket. $25.93 market order dressed as limit degrades R:R and adds unnecessary risk. Hold the $25.08.

### T15 — Broken Thesis Exit Discipline (NEW S20)
**ORIGIN**: AVAV closed S20 at $197.945 (+$71.38) — essentially breakeven. Thesis broken by: (1) SCAR program $1.4B at risk (Raymond James Underperform Mar 2, stock -17.42%), (2) Q3 FY2026 operating loss -$179M vs -$3.1M prior year — not explained by amortisation alone, (3) Pomerantz securities investigation Apr 14, (4) Next catalyst 70 days away (June 23 earnings).

**LESSON**: When the PRIMARY thesis driver (not macro noise) is impaired by a confirmed new datapoint, and the position is within 5% of breakeven, EXIT AT MARKET on next open. Near-zero P&L today becomes a meaningful loss if thesis repair takes months. The $47 cost of exit vs the risk of $500-800 loss on continued deterioration — the calculus is unambiguous.

**EXECUTION**: Exit on open via market order. Do not wait for a bounce. Do not set a limit. Do not "wait for one more session." The decision to exit should precede the open — not react to what the open gives you.

**CANCEL GTC STOPS IMMEDIATELY** after confirming market order — E9 orphan prevention.

**WHAT THIS IS NOT**: This lesson does not apply to thesis-intact positions suffering temporary macro drawdowns (LNG, AMPX, CRML). It applies only when the specific investment thesis has been structurally impaired by a new, confirmed, material development.

---

## POSITION-SPECIFIC LESSONS

### P1 — CWR.L Momentum Trap
Entry only at 250-270p with confirmed re-rating. Revenue flat, losses widened.

### P2 — Linde Thesis Weakened
Toll regime resumes helium. Watch only.

### P3 — IAG.L Closed Correctly
Sold after peace dividend thesis broken.

### P4 — ABVX Risk Profile (Grandfathered)
+6.8% unrealized. Stop $118.36. Do not add. Grandfathered above SI-37 cap.

### P5 — SHLD Stop/Sell Sequence Error (S14)
Cancel GTC stop FIRST, then sell. Never reverse sequence.

### P6 — PLTR Entry Without Catalyst (S16)
Presidential Truth Social post is not a catalyst.

### P7 — AVAV Entry and Exit (CLOSED S20)
Entered $195.09 during ceasefire selloff. UAS demand thesis valid but SCAR program ($1.4B largest contract) put at risk by Raymond James Mar 2 downgrade. Q3 FY2026 operating loss -$179M sealed the exit decision. Sold $197.945 (+$71.38). Clean exit. Lesson: validate contractor concentration risk before entry — what % of revenue does a single contract represent?

### P8 — ITM Stop Discrepancy
IBKR is ground truth on stop prices always.

### P9 — AMZN Stop Limit Gap Mechanics
Limit price must be within ~1.5% of trigger for $200-$300 stocks.

### P10 — ITM Breakout Protocol Supersession
When current stop exceeds protocol target, apply the MORE protective stop.

### P11 — Re-Entry Below Stop-Out Price
Re-entry only after price pulls back below stop-out level.

### P12 — KTOS Sizing Error (S16)
Use SI-35 dollar-risk sizing. $8,100 on 20% stop = $1,604 loss. Correct was $2,525 max.

### P13 — No Entry Near 52-Week Highs Without Catalyst (S16)
Do not enter within 5% of ATH without confirmed catalyst.

### P14 — CODA Stop Intentional Below Journal Level (S19)
Do not "correct" stops that are intentionally placed for catalyst timing. Verify intent before flagging.

### P15 — ORCL Entry Timing (S19)
Active legal filing = mandatory waiting period regardless of valuation. All four ORCL conditions must clear.

### P16 — ISRG Stop Journal Staleness (NEW S20)
IBKR orders tab showed ISRG stop at $443.86 while journal recorded $420. The stop had been raised at IBKR level without journal update. This created a false picture of risk. Going forward: any stop raise executed on IBKR must be logged in journal SAME SESSION. IBKR stop raises do not automatically update the journal — manual cross-reference required at every session open.

---

## SCAN PROTOCOL LESSONS

### S1 — Full Scan = SI-14 Sections 0, A-K (v4.0)
Section 0 (SI-39 undervalued scanner) runs FIRST before A-K.

### S2 — Journal Rebuild: bracket-depth counting Node.js. Never regex on INITIAL_STATE.

### S3 — Congressional Trading: broad sweep ALL stocks >$50K.

### S4 — Source Quality: Apify + web search in parallel for geopolitical news.

### S5 — GOOGL Missed at $280 (S19 origin)
SI-39 Section 0 now fires at every session open.

### S6 — AMZN Pre-Execution: check IBKR orders screenshot FIRST.

### S7 — Challenge Register Protocol (S16): raise challenges each session.

### S8 — Premarket Price Verification (S19)
EODHD previousCloseDate showed April 9 for session on April 15. Always use MMD for current price.

### S9 — EOD API Failure Fallback (NEW S20)
EOD:get_us_live_extended_quotes returned error in S20. Fallback: supplement with MMD prev close for current prices + web search for 52wk range. Note in journal that S20 data was supplemented. Retry EOD batch at S21 open as first action.

### S10 — Primary Source Verification for Binary Event Dates (NEW S20)
Journal recorded ceasefire expiry as Apr 22. Bloomberg, CNBC, CNN all stated Apr 21. One-day error on a binary event. Going forward: key event dates (ceasefire expiry, sanctions deadlines, earnings) must be verified against 2+ primary news sources, not taken from journal alone. Dates can shift as negotiations evolve.

---

## 52-WEEK DATA PROTOCOL (E11-E13 PREVENTION)

### Correct tool routing:
- **Current price (US):** `MMD /v2/aggs/ticker/{TICKER}/prev` → use `c` field.
- **52-week high/low (US):** `EOD:get_us_live_extended_quotes` → `fiftyTwoWeekHigh`, `fiftyTwoWeekLow`. Batch up to 9 symbols.
- **EU/UK 52-week range:** `web_fetch https://finance.yahoo.com/quote/{TICKER}/`
- **NEVER use memory for 52-week range.**

### S19 errors on record:
| Ticker | Wrong (memory) | Correct (EODHD) | Error magnitude |
|---|---|---|---|
| NVDA drawdown | -40% | -7.4% | 32.6 percentage points |
| NVDA price | ~$105 | $196.51 | $91.51 |
| ASML drawdown | -24% | -4.5% | 19.5 percentage points |
| META price | ~$570 | $662.49 | $92.49 |

### S20 corrections on record:
| Item | Journal (wrong) | Correct | Source |
|---|---|---|---|
| ISRG stop | $420 | $443.86 | IBKR orders tab |
| SLV buy qty/price | 21 shares / $70.50 | 35 shares / $70.00 | IBKR orders tab + user confirmation |
| SLV stop | $64.50 | $63.00 | IBKR orders tab |
| Ceasefire expiry | Apr 22 | Apr 21 | Bloomberg / CNBC / CNN |
| WTI oil | ~$97 | ~$93 | Trading Economics / BSS/AFP |
| Gold | $5,003 | ~$4,760 | Yahoo Finance sidebar |

---

## INFRASTRUCTURE LESSONS

### I1 — Local Filesystem MCP
READ AND WRITE ACCESS CONFIRMED S19, S20.
Allowed paths: `C:\Users\jcadb\claude-fund` | `C:\Users\jcadb\Claude Date File`

### I2 — Google Drive DEPRECATED
All state management via local filesystem MCP + Claude project.

### I3 — Session Open Protocol (SI-32)
1. Load journal | 2. Read FUND_SESSION_STATE.md | 3. Read LESSONS_LEARNED.md
4. IBKR screenshots | 5. Section 0 EOD batch | 6. SI-14 scan A-K

### I4 — Session Close Protocol (SI-28)
1. Build session-close block | 2-4. Write journal + .md files to C drive
5. Update hormuz_log.md | 6. Update trade tracker if fills
7-10. User actions (upload journal, run batch)

### I5 — GitHub Repo Structure
`journal\` — trading_journal30.jsx (current)
`state\` — FUND_SESSION_STATE.md + LESSONS_LEARNED.md
`tracker\` — Claude_Fund_Trade_Tracker.xlsx
`intelligence\` — hormuz_log.md

### I6 — Memory Hierarchy (SI-33)
Journal → FUND_SESSION_STATE → LESSONS_LEARNED → Trade Tracker

### I7 — Trade Tracker Protocol (SI-34)
Append one row per fill. IBKR confirmation only.
**S20 PENDING**: Add AVAV — Trade#N, Apr 15 2026, AVAV, 25 shares, entry $195.09, exit $197.945, USD, +$71.38, CLOSED.

### I8 — Performance Metrics Permanently In Journal (S16)
performanceMetrics{} in INITIAL_STATE.

### I9 — Challenge Register Permanently In Journal (S16)
challengeRegister[] in INITIAL_STATE.

### I10 — FRED Macro Data (S17)
web_fetch to fred.stlouisfed.org for WTI, Brent, 10Y yield. Supplementary only — lags 1 business day.

### I11 — Direct C Drive Write Confirmed (S19, S20)
`Filesystem:write_file` writes directly to allowed directories. No manual copy-paste for .md files.

---

## SESSION CLOSE CHECKLIST (MANDATORY)

```
SESSION CLOSE CHECKLIST — SESSION 20
======================================
✅ 1. trading_journal30.jsx written to C:\Users\jcadb\claude-fund\journal\
✅ 2. FUND_SESSION_STATE.md written to C:\Users\jcadb\claude-fund\state\
✅ 3. LESSONS_LEARNED.md written to C:\Users\jcadb\claude-fund\state\
⬜ 4. hormuz_log.md — thesis escalated (SI-25 oil condition met). Update recommended.
⬜ 5. Trade tracker — AVAV row to append in S21 (confirmed fill $197.945)
⬜ 6. USER: Delete trading_journal29.jsx from Claude project
⬜ 7. USER: Upload trading_journal30.jsx to Claude project
⬜ 8. USER: Run session-close.bat (GitHub backup)
⬜ 9. USER: Verify Claude project shows Session 20 / Journal v30
⬜ 10. CRITICAL: Confirm AVAV SELL Stop $186.21 GTC is CANCELLED on IBKR
======================================
```

---

## PROHIBITED DATA SOURCES
- GuruFocus, PitchBook, Macroaxis — data quality issues
- Any search snippet price without verified publication date
- EODHD earnings endpoint (403 error)
- Memory estimates for 52-week high/low
- EODHD lastTradePrice for current session (may be 4-6 days stale)
- Journal-only sourcing for key external event dates without primary news verification
