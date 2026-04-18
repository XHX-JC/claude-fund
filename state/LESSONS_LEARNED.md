# LESSONS LEARNED — CLAUDE FUND
**Account:** U24936508 (IBKR Pro) | **Compiled through Session 23 (2026-04-18)**
**Journal version:** trading_journal32.jsx | **SIs:** 1–46

---

## ERROR TAXONOMY (SI-17) — 14 CODIFIED ERROR TYPES
| # | Error | Description | Prevention |
|---|-------|-------------|-----------|
| E1 | Timezone | Wrong open/close times | NY=UTC-4, UAE=UTC+4. 13:30 UAE=09:30 NY open. LSE=12:00-20:30 UAE |
| E2 | Stale position | Using journal prices vs IBKR | IBKR screenshot = ground truth always |
| E3 | Fill re-flag | Flagging executed orders as pending | Check IBKR fills before action items |
| E4 | Price verification | Acting on unverified prices | MMD primary, EODHD extended quotes for 52wk range |
| E5 | Market timing | Acting outside hours | LSE closes 20:30 UAE, NYSE 00:00 UAE |
| E6 | Dividend capture | Selling before ex-div | RR.L ex-div Apr 23 — hard lock |
| E7 | Session discipline | Thesis drift in fatigue | Re-read SI-25 before late-session trades |
| E8 | Stale quote | Using stale quote as live | Live price check mandatory before execution |
| E9 | GTC orphan | GTC stop persists after market sell — unintended short | Cancel stop BEFORE market sell or IMMEDIATELY on fill confirmation |
| E10 | Closed position scan | Closed position in live scan with active stop | Cross-reference SI-19 + positions[] before any scan table |
| E11 | 52-week high hallucination | Stating 52wk range from memory | MANDATORY: use EOD:get_us_live_extended_quotes. Memory forbidden |
| E12 | Tool routing gap | Not knowing which tool provides which data | MMD=current price. EODHD extended=52wk range. Never conflate |
| E13 | EODHD price delay | EODHD lastTradePrice may be 4-6 days stale | Use MMD for current session price |
| E14 | Journal date discrepancy | Key event dates wrong in journal | Cross-reference 2+ primary news sources. Ceasefire expiry: Apr 21 (journal) vs Apr 22 (CBS News) — still disputed S23 |

---

## PERFORMANCE AUDIT
| Metric | S20 Baseline | S23 Update |
|--------|-------------|-----------|
| Net realized P&L (USD) | ~-$2,073 | ~-$2,460 (LNG -$397, PATK +$9 added) |
| ITM trim realized | — | +£652 (GBP account) |
| Open unrealized | ~+$5,505 | ~+$7,809 |
| Net Liquidity | ~$102,800 | $105,600 |
| Positions | 14 | 15 (post-NOG exit Monday) |

---

## THESIS & STRATEGY LESSONS

### T1 — Supply Chain Premium > War Premium
Evolved from war premium to supply chain premium. Structural damage persists under toll regime.

### T2 — Toll Regime vs Full Closure Distinction
Toll regime resumes non-oil shipments. Weakened Linde thesis.

### T3 — Exit Trigger Discipline
SI-25 ONLY: formal PERMANENT Hormuz reopening + oil -10% from peak. Ceasefire alone insufficient. Conditional ceasefire-linked opening (Iran Apr 17) does NOT meet SI-25 threshold. S23: Oil condition exceeded at $83.85. Reopening condition not met — US port blockade continues.

### T4 — Cash Reserve is Tactical, Not Passive
SI-40 deployment triggers must fire. Cash above floor = deployable capital.

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
Never enter a war-premium stock at ATH with ceasefire expiry 7 days away.

### T13 — Missed Opportunity Capture / SI-39 Genesis (S19)
GOOGL hit -20% drawdown in March 2026. No protocol flagged it. SI-39 Section 0 created.

### T14 — Limit Order Discipline Under Premarket Pressure (S19)
Never chase premarket. Hold the limit.

### T15 — Broken Thesis Exit Discipline (S20)
When PRIMARY thesis driver impaired by confirmed new datapoint + position within 5% of breakeven → EXIT AT MARKET on next open. AVAV closed near breakeven. Lesson: calculus of $47 exit cost vs $500-800 downside is unambiguous.

### T16 — SI-45 Weekly Screener Cannot Be Deferred (NEW S23)
NFLX dropped 11.8% on earnings (Apr 17) to $97.31, -27.4% from 52wk high. Would have qualified for SI-39 threshold. SI-45 was flagged but not executed in S23 scan. The cost of missing a quality compounder at -27% drawdown far exceeds the cost of running the screener. SI-45 is non-negotiable: first session of every trading week, no exceptions.

### T17 — Conditional Reopening ≠ SI-25 Trigger (NEW S23)
Iran declared Hormuz open for ceasefire duration only (Apr 17). US blockade of Iranian ports continues. Iran parliament threatened re-closure if blockade persists. This is NOT a formal permanent reopening and does NOT trigger SI-25. Trump's Truth Social framing ("FULLY OPEN") overstated the reality — verified against NBC News, Al Jazeera, CBS News. SI-25 requires formal permanent reopening as verified by CENTCOM/shipping confirmation, not political statements. Lesson: always verify geopolitical binary events against multiple primary news sources before acting. Trump language inflates certainty.

---

## POSITION-SPECIFIC LESSONS

### P1 — CWR.L Momentum Trap
Entry only at 250-270p with confirmed re-rating.

### P2 — Linde Thesis Weakened
Toll regime resumes helium. Watch only.

### P3 — IAG.L Closed Correctly
Sold after peace dividend thesis broken.

### P4 — ABVX Risk Profile (Grandfathered)
Stop now below cost ($114.31 vs $117.913). Intentional M&A optionality. Max loss ~$158 accepted.

### P5 — SHLD Stop/Sell Sequence Error (S14)
Cancel GTC stop FIRST, then sell. Never reverse sequence.

### P6 — PLTR Entry Without Catalyst (S16)
Presidential Truth Social post is not a catalyst.

### P7 — AVAV Entry and Exit (CLOSED S20)
Entered $195.09, sold $197.945 (+$71.38). SCAR program, Q3 op loss, Pomerantz. Lesson: validate contractor concentration risk before entry.

### P8 — ITM Stop Discrepancy
IBKR is ground truth on stop prices always.

### P9 — AMZN Stop Limit Gap Mechanics
Limit price must be within ~1.5% of trigger for $200-$300 stocks.

### P10 — ITM Breakout Protocol Supersession
When current stop exceeds protocol target, apply the MORE protective stop.

### P11 — Re-Entry Below Stop-Out Price
Re-entry only after price pulls back below stop-out level.

### P12 — KTOS Sizing Error (S16)
Use SI-35 dollar-risk sizing.

### P13 — No Entry Near 52-Week Highs Without Catalyst (S16)
Do not enter within 5% of ATH without confirmed catalyst.

### P14 — CODA Stop Intentional Below Journal Level (S19)
Do not "correct" stops that are intentionally placed for catalyst timing.

### P15 — ORCL Entry Timing (S19)
Active legal filing = mandatory waiting period.

### P16 — ISRG Stop Journal Staleness (S20)
Any stop raise executed on IBKR must be logged in journal SAME SESSION.

### P17 — PATK M&A Tip Entry Error (NEW S23)
**ORIGIN**: PATK 25 shares entered on third-party tip about LCII/PATK merger before cross-session analysis complete. Immediately closed +$9.34. Joint analysis concluded "wait and watch" — proving entry was premature.
**LESSON**: No entry on any M&A play until: (1) target company fully analysed, (2) deal terms, probability and R:R explicitly logged, (3) joint entry decision confirmed. A tip is not a thesis.
**DISTINCTION from P6**: P6 = social media is not a catalyst. P17 = acting before your own analysis pipeline is complete, even when a legitimate analytical process is underway.

---

## SCAN PROTOCOL LESSONS

### S1 — Full Scan = SI-14 Sections 0, A-K (v4.0)
Section 0 (SI-39) runs FIRST. SI-45 weekly screener runs first session of each week before Section 0.

### S2 — Journal Rebuild: bracket-depth counting Node.js.

### S3 — Congressional Trading: broad sweep ALL stocks >$50K.

### S4 — Source Quality: Apify + web search in parallel for geopolitical news.

### S5 — GOOGL Missed at $280 (S19 origin)
SI-39 Section 0 now fires at every session open.

### S6 — AMZN Pre-Execution: check IBKR orders screenshot FIRST.

### S7 — Challenge Register Protocol (S16).

### S8 — Premarket Price Verification (S19)
Always use MMD for current price.

### S9 — EOD API Failure Fallback (S20)
Fallback: MMD prev close + web search for 52wk range.

### S10 — Primary Source Verification for Binary Event Dates (S20)
Key event dates must be verified against 2+ primary sources. Ceasefire expiry Apr 21 (journal) vs Apr 22 (CBS News) — still disputed S23. Verify Monday.

### S11 — SI-45 Non-Deferral Rule (NEW S23)
SI-45 weekly broad screener missed NFLX (-27.4% from 52wk high, earnings gap down Apr 17). The protocol was flagged but not executed. Going forward: SI-45 executes on first session of every trading week before Section 0. Not optional, not deferrable. A second consecutive miss would constitute a systematic protocol failure. If EOD screener is unavailable, run manual SI-39 extended batch with MMD.

---

## 52-WEEK DATA PROTOCOL (E11-E13 PREVENTION)
- **Current price (US):** MMD /v2/aggs/ticker/{TICKER}/prev → use `c` field
- **52-week high/low (US):** EOD:get_us_live_extended_quotes → fiftyTwoWeekHigh/Low
- **EU/UK:** web_fetch Yahoo Finance
- **NEVER use memory for 52-week range**

---

## INFRASTRUCTURE LESSONS

### I1 — Local Filesystem MCP
READ AND WRITE ACCESS CONFIRMED S19-S23.
Allowed paths: `C:\Users\jcadb\claude-fund`

### I2 — Google Drive DEPRECATED
All state management via local filesystem MCP + Claude project.

### I3 — Session Open Protocol (SI-32)
1. Read FUND_SESSION_STATE.md | 2. Read LESSONS_LEARNED.md | 3. Check journal lastUpdated
4. IBKR screenshots | 5. Section 0 EOD batch | 6. SI-45 weekly (first session of week) | 7. SI-14 scan A-K

### I4 — Session Close Protocol (SI-28)
1. Build session-close block | 2-4. Write journal + .md files to C drive
5. Update hormuz_log.md | 6. Update trade tracker if fills
7-10. User actions

### I5 — Journal versioning
trading_journal32.jsx = current (Session 23)

### I6 — Memory Hierarchy (SI-33)
Journal → FUND_SESSION_STATE → LESSONS_LEARNED → Trade Tracker

### I7 — Trade Tracker Pending (S23)
1. AVAV +$71.38 (S20 — still outstanding)
2. ITM trim +£652 (S22)
3. LNG -$396.54 (S23)
4. PATK +$9.34 (S23)
5. NOG exit TBC Monday

### I11 — Direct C Drive Write Confirmed (S19-S23)
filesystem:write_file writes directly to allowed directories.

---

## SESSION CLOSE CHECKLIST — SESSION 23
```
SESSION CLOSE CHECKLIST — SESSION 23
======================================
✅ 1. trading_journal32.jsx written to C:\Users\jcadb\claude-fund\journal\
✅ 2. FUND_SESSION_STATE.md written to C:\Users\jcadb\claude-fund\state\
✅ 3. LESSONS_LEARNED.md written to C:\Users\jcadb\claude-fund\state\
⬜ 4. hormuz_log.md — update: conditional opening declared, SI-25 not triggered, WTI $83.85
⬜ 5. Trade tracker — rows 1-4 pending. Row 5 (NOG) after Monday fill
⬜ 6. USER: Delete trading_journal31.jsx from Claude project
⬜ 7. USER: Upload trading_journal32.jsx to Claude project
⬜ 8. USER: Run session-close.bat (GitHub backup)
⬜ 9. USER: Verify Claude project shows Session 23 / Journal v32
⬜ 10. MONDAY: Verify ceasefire expiry date (Apr 21 vs Apr 22) — 2+ primary sources
⬜ 11. MONDAY: Confirm NOG market sell fill, add to trade tracker
======================================
```

---

## PROHIBITED DATA SOURCES
- GuruFocus, PitchBook, Macroaxis
- Any search snippet price without verified publication date
- EODHD earnings endpoint (403 error)
- Memory estimates for 52-week high/low
- EODHD lastTradePrice for current session (may be 4-6 days stale)
- Journal-only sourcing for key external event dates without primary news verification
- Trump Truth Social posts as confirmation of geopolitical facts (T17)
