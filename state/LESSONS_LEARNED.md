# LESSONS LEARNED — CLAUDE FUND
**Account:** U24936508 (IBKR Pro) | **Compiled through Session 21 (2026-04-16)**
**Journal version:** trading_journal31.jsx | **SIs:** 1–44

---

## ERROR TAXONOMY (SI-17) — 14 CODIFIED ERROR TYPES
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
| E9 | GTC orphan | GTC stop persists after market sell — unintended short | Cancel stop BEFORE market sell or IMMEDIATELY on fill confirmation |
| E10 | Closed position scan | Closed position in live scan with active stop | Cross-reference SI-19 + positions[] before any scan table |
| E11 | 52-week high hallucination | Stating 52wk range from memory | MANDATORY: use EOD:get_us_live_extended_quotes. Memory forbidden |
| E12 | Tool routing gap | Not knowing which tool provides which data | MMD=current price. EODHD extended=52wk range. Never conflate |
| E13 | EODHD price delay | EODHD lastTradePrice may be 4-6 days stale | Use MMD for current session price |
| E14 | Journal date discrepancy | Ceasefire expiry stated Apr 22 in journal; multiple primary sources state Apr 21 | Cross-reference key event dates with 2+ primary news sources. CONFIRMED: Apr 21. |

---

## PERFORMANCE AUDIT FINDINGS
*(Updated at S21)*
| Metric | S16 Baseline | S20 Update | S21 Update |
|--------|-------------|-----------|-----------|
| Net realized P&L | ~-$2,144 | ~-$2,073 (+$71 AVAV) | ~-$2,073 (no new closes) |
| Open unrealized | +$2,052 | ~+$5,505 | ~+$6,500 (est.) |
| Total P&L (realized + unrealized) | ~-$92 | ~+$3,432 | ~+$4,427 |
| Positions | 13 | 14 | 15 (added LLY) |

---

## THESIS & STRATEGY LESSONS

### T1 — Supply Chain Premium > War Premium
Evolved from war premium to supply chain premium. Structural damage persists under toll regime. Unwind on SI-25 only.

### T2 — Toll Regime vs Full Closure Distinction
Toll regime resumes non-oil shipments. Weakened Linde thesis.

### T3 — Exit Trigger Discipline
SI-25 ONLY: formal Hormuz reopening + oil -10% from peak. Ceasefire alone insufficient. Oil condition MET at ~$92 (trigger $100.38). Formal reopening still pending. Ceasefire extension CONTINGENT on Hormuz reopening — if deal struck, SI-25 may trigger simultaneously.

### T4 — Cash Reserve is Tactical, Not Passive
SI-40 deployment triggers must fire. Islamabad failure Apr 12 activated Trigger A. LLY entry S21 deployed correctly under SI-39 + SI-40.

### T5 — Mythos Miss (S13)
AI model release caused PLTR -7%. Section K AI query NON-NEGOTIABLE every session. S22: Claude Mythos Preview announced Apr 7 — most capable model yet. Not public. Relevant for AI infrastructure positioning.

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
Never chase premarket. $25.93 market order dressed as limit degrades R:R. Hold the $25.08.

### T15 — Broken Thesis Exit Discipline (S20)
**ORIGIN**: AVAV closed S20 at $197.945 (+$71.38) — near breakeven. Thesis broken by: (1) SCAR program $1.4B at risk, (2) Q3 FY2026 operating loss -$179M vs -$3.1M prior year, (3) Pomerantz securities investigation, (4) No near-term catalyst.

**LESSON**: When PRIMARY thesis driver impaired by confirmed new datapoint + position within 5% of breakeven → EXIT AT MARKET on next open. Do not wait for a bounce. Cancel GTC stops immediately after exit.

**WHAT THIS IS NOT**: Does not apply to thesis-intact positions in macro drawdowns (LNG, AMPX, CRML). Applies only when the specific thesis is structurally impaired.

---

## POSITION-SPECIFIC LESSONS

### P1 — CWR.L Momentum Trap
Entry only at 250-270p with confirmed re-rating. Revenue flat, losses widened.

### P2 — Linde Thesis Weakened
Toll regime resumes helium. Watch only.

### P3 — IAG.L Closed Correctly
Sold after peace dividend thesis broken.

### P4 — ABVX Risk Profile (Updated S21)
Stop LOWERED S21 to $114.31 (below cost $117.91 — intentional). Accepted ~$158 max loss for M&A event optionality. Q2 2026 Phase 3 ABTECT maintenance data is the primary catalyst. No M&A news confirmed. Grandfathered above SI-37 cap — do not add.

### P5 — SHLD Stop/Sell Sequence Error (S14)
Cancel GTC stop FIRST, then sell. Never reverse sequence.

### P6 — PLTR Entry Without Catalyst (S16)
Presidential Truth Social post is not a catalyst.

### P7 — AVAV Entry and Exit (CLOSED S20)
Entered $195.09 during ceasefire selloff. UAS demand thesis valid but SCAR program ($1.4B largest contract) at risk (Raymond James Underperform Mar 2). Q3 FY2026 operating loss -$179M sealed exit. Sold $197.945 (+$71.38). Lesson: validate contractor concentration risk before entry.

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
Active legal filing = mandatory waiting period regardless of valuation.

### P16 — ISRG Stop Journal Staleness (S20)
IBKR orders tab showed ISRG stop at $443.86 while journal recorded $420. Any stop raise executed on IBKR must be logged in journal SAME SESSION. Manual cross-reference required at every session open.

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

### S9 — EOD API Failure Fallback (S20)
EOD:get_us_live_extended_quotes returned error in S20. Fallback: supplement with MMD prev close + web search for 52wk range. S21: EOD API functional again — retry each session open.

### S10 — Primary Source Verification for Binary Event Dates (S20)
Journal recorded ceasefire expiry as Apr 22. Bloomberg, CNBC, CNN all stated Apr 21. Going forward: key event dates (ceasefire expiry, sanctions deadlines, earnings) must be verified against 2+ primary news sources, not taken from journal alone.

### S11 — Two-Stage Research Protocol: Scan vs Pre-Entry Deep Verification (S21)
**ORIGIN:** TLN write-up in S21 contained seven material errors — blended acquisition figures (closed 2025 Moxie deal conflated with pending 2026 Cornerstone deal), overstated analyst consensus ("12 of 13 Strong Buy" vs actual ~12 Buy/2 Hold/1 Sell), wrong earnings date (stated TBC; confirmed May 5 from IR calendar), inappropriate PE cited for a GAAP-loss company, incorrect moving average characterisation (stated stop "below 200-day" when stock was already below 200-day), oversimplified FERC regulatory history on the Amazon PPA, and macro-only characterisation of a pullback that also contained deal and regulatory risk. All seven errors shared the same root cause: scan-level research was written up with investment-recommendation confidence.

**THE TWO-STAGE RULE:**

**Stage 1 — Scan (correct for candidate list generation only):**
- Price and drawdown verified via tools
- Thesis described at sector level
- R:R estimated as directional, not precise
- Any specific figures (acquisition multiples, analyst counts, earnings dates) must be explicitly labelled: *"unverified — deep check required before entry"*
- Output: watchlist candidate, not investment recommendation

**Stage 2 — Pre-Entry Deep Verification (MANDATORY before any capital is committed):**
- Read most recent earnings release + guidance from SEC EDGAR or company IR website
- Confirm earnings date directly from company IR calendar
- Pull live analyst consensus from verified aggregator
- Check for active regulatory proceedings (FERC, FTC, DOJ, SEC litigation)
- Confirm acquisition status: open/pending/closed with correct accretion figures
- Verify valuation metric is appropriate: PE for profitable; EV/EBITDA + FCF for complex/leveraged; EV/Revenue for pre-profit
- State price vs 50-day vs 200-day — all three
- Cross-reference pullback drivers: macro vs company-specific vs deal/regulatory risk
- SI-35 dollar-risk sizing confirmed
- SI-36 R:R ≥2:1 verified
- SI-41 catalyst within 8 weeks confirmed
- Correlation with existing positions checked

**HARD RULE:** No specific acquisition multiple, analyst count, earnings date, regulatory status, or valuation figure from scan phase may appear in a recommendation without primary source verification. Scan-phase figures are hypotheses only.

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

### S21 corrections on record:
| Item | S20 Value | S21 Correct | Source |
|---|---|---|---|
| MSFT stop | $375.56 | $395.03 | IBKR orders tab + user confirmation |
| ABVX stop | $118.36 | $114.31 | IBKR orders tab (intentional lowering) |
| AMPX stop | $13.00 | $14.30 | IBKR orders tab |
| ITM stop | 84p/82.5p | 89.9p/88p | IBKR orders tab |
| TLN analyst consensus | "12/13 Strong Buy" (scan error) | ~12 Buy/2 Hold/1 Sell | Verified aggregator — S11 origin |

---

## INFRASTRUCTURE LESSONS

### I1 — Local Filesystem MCP
READ AND WRITE ACCESS CONFIRMED S19, S20, S21.
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
`journal\` — trading_journal31.jsx (current)
`state\` — FUND_SESSION_STATE.md + LESSONS_LEARNED.md
`tracker\` — Claude_Fund_Trade_Tracker.xlsx
`intelligence\` — hormuz_log.md

### I6 — Memory Hierarchy (SI-33)
Journal → FUND_SESSION_STATE → LESSONS_LEARNED → Trade Tracker

### I7 — Trade Tracker Protocol (SI-34)
Append one row per fill. IBKR confirmation only.
**S20/S21 PENDING**: Add AVAV — Apr 15 2026, AVAV, 25 shares, entry $195.09, exit $197.945, +$71.38, CLOSED.

### I8 — Performance Metrics Permanently In Journal (S16)
performanceMetrics{} in INITIAL_STATE.

### I9 — Challenge Register Permanently In Journal (S16)
challengeRegister[] in INITIAL_STATE.

### I10 — FRED Macro Data (S17)
web_fetch to fred.stlouisfed.org for WTI, Brent, 10Y yield. Supplementary only — lags 1 business day.

### I11 — Direct C Drive Write Confirmed (S19, S20, S21)
`Filesystem:write_file` writes directly to allowed directories. No manual copy-paste for .md files.

### I12 — C Drive State Lag Risk (S22)
C drive files were found at S20 state during S22 open — two sessions stale. Root cause: S21 session close protocol completed journal write but .md files were not confirmed written. Going forward: verify C drive write success explicitly at session close by reading back the first line of each .md file. Do not assume write succeeded.

---

## PRE-ENTRY RESEARCH STANDARDS (SEE ALSO: S11)

### Checklist — Required Before Any New Entry

| Check | Source | Mandatory? |
|-------|--------|------------|
| Earnings release + guidance read | SEC EDGAR / Company IR | ✅ Always |
| Earnings date confirmed | Company IR calendar directly | ✅ Always |
| Live analyst consensus pulled | Verified aggregator | ✅ Always |
| Active regulatory/litigation check | FERC / SEC / court dockets | ✅ Always |
| Acquisition status: open/pending/closed | SEC filings / press release | ✅ If M&A involved |
| Correct valuation metric for financial stage | PE (profitable only) / EV/EBITDA / FCF | ✅ Always |
| Price vs 50-day vs 200-day all stated | EOD / IBKR | ✅ Always |
| Pullback driver breakdown | News search + filings | ✅ Always |
| SI-35 dollar-risk sizing confirmed | Journal calculation | ✅ Always |
| SI-36 R:R minimum 2:1 verified | Entry/stop/target stated | ✅ Always |
| SI-41 catalyst within 8 weeks | Earnings / contract / technical | ✅ Always |
| Correlation with existing positions checked | Journal positions table | ✅ Always |

---

## SESSION CLOSE CHECKLIST (MANDATORY)

```
SESSION CLOSE CHECKLIST — SESSION 22 (template)
======================================
□ 1. Write trading_journal32.jsx → C:\Users\jcadb\claude-fund\journal\
□ 2. Write FUND_SESSION_STATE.md → C:\Users\jcadb\claude-fund\state\
□ 3. Write LESSONS_LEARNED.md → C:\Users\jcadb\claude-fund\state\
□ 4. Verify C drive writes: read back first line of each .md file (I12)
□ 5. Update hormuz_log.md if thesis changed → \intelligence\
□ 6. Update trade tracker if confirmed fills (AVAV row still pending)
□ 7. USER: Delete trading_journal31.jsx from Claude project
□ 8. USER: Upload trading_journal32.jsx to Claude project
□ 9. USER: Run session-close.bat (GitHub backup)
□ 10. USER: Verify Claude project shows correct session number
□ 11. CRITICAL: Confirm AVAV SELL Stop $186.21 GTC is CANCELLED on IBKR
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
- Scan-phase figures used as recommendation figures without Stage 2 verification (S11)
