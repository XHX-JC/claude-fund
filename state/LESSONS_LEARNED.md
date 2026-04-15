# LESSONS LEARNED — CLAUDE FUND
**Account:** U24936508 (IBKR Pro) | **Compiled through Session 19 (2026-04-15)**
**Journal version:** trading_journal29.jsx | **SIs:** 1–40

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
| E8 | Stale quote | Stale quote as live | Live price check mandatory before execution |
| E9 | GTC orphan | GTC persists after market sell — unintended short | Cancel stop BEFORE market sell or immediately on fill |
| E10 | Closed position scan | Closed position presented as live with active stop | Cross-reference SI-19 + positions[] before any scan table |
| E11 | 52-week high hallucination | Stating 52wk range from memory | MANDATORY: use EOD:get_us_live_extended_quotes for fiftyTwoWeekHigh/Low. Memory forbidden |
| E12 | Tool routing gap | Not knowing which tool provides which data | MMD=current price. EODHD extended quotes=52wk range, P/E, market cap. Never conflate |
| E13 | EODHD price delay | EODHD lastTradePrice may be 4-6 days stale | Use MMD for current session price. EODHD for fundamentals/52wk only |

---

## PERFORMANCE AUDIT FINDINGS (S16 — 23 Mar–12 Apr 2026)

| Metric | Value | Target | Status |
|--------|-------|--------|--------|
| Win rate | 41.7% | 50%+ | Below threshold |
| Profit factor | 0.27 | >1.0 | Critically low |
| Payoff ratio | 0.38 | >2.0 | Inverted |
| Expectancy/trade | -$245 | >$0 | Negative |
| Kelly fraction | -1.12 | >0 | Negative |
| Cash utilisation | 31.1% deployed | 55%+ | Underdeployed |
| Monthly return | ~-0.9% | 5% | Below target |
| Open unrealized | +$2,052 | — | Thesis working |

**Root causes (in priority order):**
1. Two oversized trades (KTOS $8,100, PLTR $7,920) destroyed entire closed book (-$2,911)
2. 68.9% cash idle at $0 return vs 5% monthly target
3. Payoff ratio inverted: winners cut at 4.2%, losers run to 10.7%
4. No dollar-risk sizing discipline
5. Speculative entries sized as thesis entries

---

## THESIS & STRATEGY LESSONS

### T1 — Supply Chain Premium > War Premium
Evolved from war premium to supply chain premium. Structural damage persists under toll regime. Unwind on SI-25 only.

### T2 — Toll Regime vs Full Closure Distinction
Toll regime resumes non-oil shipments including helium. Weakened Linde thesis.

### T3 — Exit Trigger Discipline
SI-25 ONLY: formal Hormuz reopening + oil -10% from peak. Ceasefire alone insufficient.

### T4 — Cash Reserve is Tactical, Not Passive
SI-40 deployment triggers must fire. Islamabad failure Apr 12 activated Trigger A.

### T5 — Mythos Miss (S13)
Anthropic model release caused PLTR -7%. Section K AI query NON-NEGOTIABLE every session.

### T6 — Target List Cross-Reference (S14)
Compare current price vs research reference price. Fallen names = improved entries.

### T7 — Barbell Deployment Framework (S14)
Pool A (thesis-correlated, event-gated). Pool B (quality compounders, non-correlated). Never conflate.

### T8 — Short Attack Protocol (S16)
Named short seller report: DO NOT ENTER if watchlist. If held: assess credibility, tighten stop.

### T9 — Leveraged BTC Proxy vs Spot (S16)
Direct spot BTC via IBKR Paxos preferred over MSTR.

### T10 — Thesis Is Not a Position Sizing Input (S16)
Thesis determines whether to enter. Stop distance determines how much. Separate entirely.

### T11 — Winners Need Room Equal to Losers (S16)
Average winner 4.2% vs average loser 10.7%. Hold thesis-intact positions to primary target.

### T12 — ATH Entry Discipline (S19)
RTX removed from entry at $202 — thesis fully priced at ATH, 6.7% upside to consensus vs 12-18% downside on de-escalation. Never enter a war-premium stock at ATH with ceasefire expiry 7 days away.

### T13 — Missed Opportunity Capture (S19 — GOOGL at $280)
GOOGL hit -20% drawdown in March 2026 on Iran war fear. No protocol existed to flag it. Recovered +18.5% in 5 weeks. SI-39 created to prevent recurrence. Quality businesses sold on macro fear = best non-thesis entries.

### T14 — Limit Order Discipline Under Premarket Pressure (S19)
NOG premarket showed $25.90 suggesting upswing. Pressure to raise limit from $25.08 to $25.93. Resisted correctly. $25.93 = market order dressed as limit. $25.08 preserves 4.2:1 R:R. $25.93 degrades to 2.9:1 and adds $74 unnecessary risk. Never chase premarket.

---

## POSITION-SPECIFIC LESSONS

### P1 — CWR.L Momentum Trap
Revenue flat ~£22M, losses widened. Entry only at 250-270p with confirmed re-rating.

### P2 — Linde Thesis Weakened
Toll regime resumes helium. Watch only.

### P3 — IAG.L Closed Correctly
Sold after peace dividend thesis broken under toll regime.

### P4 — ABVX Risk Profile (Grandfathered)
$5,188 deployed, +7.1%. Stop $118.36. Do not add. Grandfathered above SI-37 $1,500 cap.

### P5 — SHLD Stop/Sell Sequence Error (S14)
Cancel GTC stop FIRST, then sell. Never reverse sequence.

### P6 — PLTR Entry Without Catalyst (S16)
5-session test had no fundamental anchor. Presidential Truth Social post is not a catalyst.

### P7 — AVAV Entry Timing (S13)
Entered $195 during ceasefire selloff. Stop raised $173.98 → $186.21 (S19). Still below cost $195.09 — raise to $196+ when confirmed close above $200 on volume.

### P8 — ITM Stop Discrepancy
IBKR is ground truth on stop prices always.

### P9 — AMZN Stop Limit Gap Mechanics
Limit price must be within ~1.5% of trigger for $200-$300 stocks.

### P10 — ITM Breakout Protocol Supersession
When current stop exceeds protocol target, apply the MORE protective stop. Never lower to match.

### P11 — Re-Entry Below Stop-Out Price
Re-entry only after price pulls back below stop-out level. ONDS: below $9.00. LDO: below €58.

### P12 — KTOS Sizing Error (S16)
$8,100 on KTOS = $1,604 loss. Correct size $2,525 = $594 max loss. Use SI-35.

### P13 — No Entry Near 52-Week Highs Without Catalyst (S16)
KTOS entered at $81 (within 10% ATH) on thesis alone. Do not enter within 5% of ATH without confirmed catalyst.

### P14 — CODA Stop Intentional Below Journal Level (S19)
Stop confirmed at IBKR level below journal $12.14. Intentional — mine clearance catalyst pending. Do not "correct" stops that are intentionally placed for catalyst timing. Verify intent before flagging as discrepancy.

### P15 — ORCL Entry Timing (S19)
ORCL at $163: fiduciary investigation filed Apr 14, FCF -$13B LTM, no earnings until June, OpenAI concentration risk. All four conditions must clear before entry. Watch only. Lesson: active legal filing = mandatory waiting period regardless of valuation.

---

## SCAN PROTOCOL LESSONS

### S1 — Full Scan = SI-14 Sections 0, A-K (v4.0)
Section 0 (SI-39 undervalued scanner) now runs FIRST before sections A-K. This prevents quality-stock drawdown opportunities being missed due to thesis-centric scan focus.

### S2 — Journal Rebuild: bracket-depth counting Node.js. Never regex on INITIAL_STATE.

### S3 — Congressional Trading: broad sweep ALL stocks >$50K.

### S4 — Source Quality: Apify + web search in parallel for geopolitical news.

### S5 — GOOGL Missed at $280 (S19 origin)
Full scan had no mechanism to flag quality large-caps in macro-driven drawdowns. SI-39 Section 0 now fires at every session open. Never again.

### S6 — AMZN Pre-Execution: check IBKR orders screenshot FIRST.

### S7 — Challenge Register Protocol (S16): raise challenges each session, log decisions permanently.

### S8 — Premarket Price Verification (S19)
EODHD previousCloseDate showed April 9 for session on April 15 — 6-day stale current price. Always use MMD /v2/aggs/ticker/{ticker}/prev for current session price. EODHD for fundamentals and 52wk range only. These are different tools for different purposes.

---

## 52-WEEK DATA PROTOCOL (E11-E13 PREVENTION)

**THIS SECTION IS MANDATORY READING BEFORE ANY DRAWDOWN CLAIM**

### Correct tool routing:
- **Current price (US stocks):** `MMD /v2/aggs/ticker/{TICKER}/prev` — returns T,v,vw,o,c,h,l,t,n. Use `c` field.
- **52-week high/low (US stocks):** `EOD:get_us_live_extended_quotes` with `symbols=['TICKER.US']` — returns `fiftyTwoWeekHigh` and `fiftyTwoWeekLow`. BATCH up to 9 symbols per call.
- **EU/UK 52-week range:** `web_fetch https://finance.yahoo.com/quote/{TICKER}/` or web_search `{TICKER} 52 week high 2026`. FT.com and Reuters also carry this.
- **NEVER use memory for 52-week range.** No exceptions.

### Session 19 errors corrected:
| Ticker | Wrong (memory) | Correct (EODHD) | Error magnitude |
|---|---|---|---|
| NVDA drawdown | -40% | -7.4% | 32.6 percentage points |
| NVDA price | ~$105 | $196.51 | $91.51 |
| ASML drawdown | -24% | -4.5% | 19.5 percentage points |
| META price | ~$570 | $662.49 | $92.49 |

### Verified Tier 1 data (EODHD confirmed S19):
| Ticker | 52wk High | 52wk Low | Price (MMD Apr 14) | Drawdown | Trigger |
|---|---|---|---|---|---|
| NVDA | $212.19 | $95.04 | $196.51 | -7.4% | -25% — below |
| META | $796.25 | $479.80 | $662.49 | -16.8% | -20% — approaching |
| GOOGL | $349.00 | $143.91 | $332.91 | -4.6% | -18% — below |
| AAPL | $288.62 | $171.89 | $258.83 | -10.3% | -15% — below |
| **V** | **$375.51** | **$293.89** | **$311.37** | **-17.1%** | **-15% — TRIGGERED** |
| LLY | $1,133.95 | $623.78 | $922.50 | -18.6% | -20% — near |
| TSM | $390.21 | $137.90 | $379.89 | -2.7% | -20% — below |
| COST | $1,067.08 | $844.06 | ~$999 | -6.4% | -15% — below |
| ASML | $1,547.22 | $606.87 | ~$1,478 | -4.5% | -20% — NOT drawdown |

---

## INFRASTRUCTURE LESSONS

### I1 — Local Filesystem MCP
**READ AND WRITE ACCESS CONFIRMED Session 19.**
Allowed paths: `C:\Users\jcadb\Claude Date File` | `C:\Users\jcadb\claude-fund`
Tools available: `filesystem:read_text_file`, `filesystem:write_file`, `filesystem:edit_file`, `filesystem:list_directory`
Claude CAN write directly to journal, state files, and intelligence files on C drive.
This eliminates the manual copy-paste step for journal and .md updates.

### I2 — Google Drive DEPRECATED
All state management via local filesystem MCP + Claude project.

### I3 — Session Open Protocol (SI-32)
1. Load journal from project (primary ground truth)
2. `filesystem:read_text_file` FUND_SESSION_STATE.md
3. `filesystem:read_text_file` LESSONS_LEARNED.md
4. IBKR screenshots (positions + orders tabs)
5. Section 0: SI-39 Tier 1 drawdown batch check (EOD:get_us_live_extended_quotes)
6. SI-14 scan Sections A-K

### I4 — Session Close Protocol (SI-28) — UPDATED S19
1. Produce session-close block using standard template
2. Write trading_journal[N+1].jsx to `C:\Users\jcadb\claude-fund\journal\`
3. Write FUND_SESSION_STATE.md to `C:\Users\jcadb\claude-fund\state\`
4. Write LESSONS_LEARNED.md to `C:\Users\jcadb\claude-fund\state\`
5. Update trade tracker if fills occurred
6. User uploads new journal to Claude project (delete old version first)
7. User runs session-close.bat to push to GitHub

### I5 — GitHub Repo Structure
`C:\Users\jcadb\claude-fund\journal\` — journal JSX files (current: trading_journal29.jsx)
`C:\Users\jcadb\claude-fund\state\` — FUND_SESSION_STATE.md + LESSONS_LEARNED.md
`C:\Users\jcadb\claude-fund\tracker\` — Trade Tracker XLSX
`C:\Users\jcadb\claude-fund\intelligence\` — hormuz_log.md + dated thesis notes
Run session-close.bat at end of every session to commit + push.

### I6 — Memory Hierarchy (SI-33)
Journal (structural, ground truth) → FUND_SESSION_STATE (dynamic session state) → LESSONS_LEARNED (permanent error record) → Trade Tracker (append-only fills)

### I7 — Trade Tracker Protocol (SI-34)
Append one row per executed trade. IBKR fill confirmation only.

### I8 — Performance Metrics Permanently In Journal (S16)
performanceMetrics{} in INITIAL_STATE. Updated every rebuild.

### I9 — Challenge Register Permanently In Journal (S16)
challengeRegister[] in INITIAL_STATE. All open challenges logged and resolved each session.

### I10 — FRED Macro Data (S17)
web_fetch to fred.stlouisfed.org/graph/fredgraph.csv?id={SERIES_ID}
Key series: DCOILWTICO (WTI), DCOILBRENTEU (Brent), DGS10 (10Y yield)
Supplementary only — lags 1 business day. Never use as live price for execution.

### I11 — Direct C Drive Write Confirmed (S19)
`filesystem:write_file` writes directly to allowed directories on C drive. 
Journal and .md files written by Claude at session close — no manual copy-paste required.
User only needs to: (1) upload new journal to Claude project, (2) run session-close.bat.

---

## SESSION CLOSE CHECKLIST (MANDATORY)

Claude executes this at every session close. User confirms completion before running batch file.

```
SESSION CLOSE CHECKLIST — SESSION [N]
======================================
□ 1. trading_journal[N+1].jsx written to C:\Users\jcadb\claude-fund\journal\
□ 2. FUND_SESSION_STATE.md written to C:\Users\jcadb\claude-fund\state\
□ 3. LESSONS_LEARNED.md written to C:\Users\jcadb\claude-fund\state\
□ 4. hormuz_log.md updated if thesis status changed
□ 5. Trade tracker updated if fills confirmed (IBKR ground truth only)
□ 6. USER ACTION: Delete old journal from Claude project
□ 7. USER ACTION: Upload trading_journal[N+1].jsx to Claude project
□ 8. USER ACTION: Run session-close.bat to push to GitHub
□ 9. Verify: Claude project shows correct session number in journal
======================================
```

---

## PROHIBITED DATA SOURCES
- GuruFocus, PitchBook, Macroaxis — data quality issues
- Any search snippet price without verified publication date
- EODHD earnings endpoint (403 — use MMD or web search)
- Memory estimates for 52-week high/low — use EOD:get_us_live_extended_quotes
- EODHD lastTradePrice for current session (may be 4-6 days stale) — use MMD
