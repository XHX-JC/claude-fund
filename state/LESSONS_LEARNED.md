# LESSONS LEARNED — CLAUDE FUND
**Account:** U24936508 (IBKR Pro) | **Compiled through Session 16 (2026-04-12)**
**Journal version:** trading_journal24.jsx | **SIs:** 1–40

---

## ERROR TAXONOMY (SI-17) — 10 CODIFIED ERROR TYPES
| # | Error | Description | Prevention |
|---|-------|-------------|-----------|
| E1 | Timezone | Wrong open/close times | NY=UTC-4, UAE=UTC+4. 16:30 UAE=08:30 NY open |
| E2 | Stale position | Using journal prices vs IBKR | IBKR screenshot = ground truth always |
| E3 | Fill re-flag | Flagging executed orders as pending | Check IBKR fills before action items |
| E4 | Price verification | Acting on unverified prices | EODHD/IBKR cross-reference mandatory |
| E5 | Market timing | Acting outside hours | LSE closes 17:30 UK, NYSE 16:00 NY |
| E6 | Dividend capture | Selling before ex-div | RR.L ex-div Apr 23 — hard lock |
| E7 | Session discipline | Thesis drift in fatigue | Re-read SI-25 before late-session trades |
| E8 | Stale quote | Stale quote as live | Live price check mandatory before execution |
| E9 | GTC orphan | GTC persists after market sell — unintended short | Cancel stop BEFORE market sell or immediately on fill |
| E10 | Closed position scan | Closed position presented as live with active stop | Cross-reference SI-19 + positions[] before any scan table. IBKR is final arbiter |

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

---

## POSITION-SPECIFIC LESSONS

### P1 — CWR.L Momentum Trap
Revenue flat ~£22M, losses widened. Entry only at 250-270p with confirmed re-rating.

### P2 — Linde Thesis Weakened
Toll regime resumes helium. Watch only.

### P3 — IAG.L Closed Correctly
Sold after peace dividend thesis broken under toll regime.

### P4 — ABVX Risk Profile (Grandfathered)
$5,188 deployed, +7.1%. Stop $113.70. Do not add. Grandfathered above SI-37 $1,500 cap.

### P5 — SHLD Stop/Sell Sequence Error (S14)
Cancel GTC stop FIRST, then sell. Never reverse sequence.

### P6 — PLTR Entry Without Catalyst (S16)
5-session test had no fundamental anchor. Presidential Truth Social post is not a catalyst.

### P7 — AVAV Entry Timing (S13)
Entered $195 during ceasefire selloff. Hold, do not add. Review if <$190 post-RTX Apr 21.

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
KTOS entered at $81 (within 10% ATH) on thesis alone. SI-39 bars entry within 5% of ATH without confirmed catalyst.

---

## SCAN PROTOCOL LESSONS

### S1 — Full Scan = SI-14 Sections A-K (v3.0)
### S2 — Journal Rebuild: bracket-depth counting Node.js. Never regex on INITIAL_STATE.
### S3 — Congressional Trading: broad sweep ALL stocks >$50K.
### S4 — Source Quality: Apify + web search in parallel for geopolitical news.
### S6 — AMZN Pre-Execution: check IBKR orders screenshot FIRST.
### S7 — Challenge Register Protocol (S16): raise challenges each session, log decisions permanently.

---

## INFRASTRUCTURE LESSONS

### I1 — Local Filesystem MCP
Allowed paths: C:\Users\jcadb\Claude Date File | C:\Users\jcadb\claude-fund

### I2 — Google Drive DEPRECATED

### I3 — Session Open Protocol (SI-32)
1. FUND_SESSION_STATE.md → 2. LESSONS_LEARNED.md → 3. SESSION_RECAP.md (if exists) → 4. IBKR screenshots → 5. SI-14 scan A-K

### I4 — Session Close Protocol (SI-28)
Rebuild journal → Write STATE.md → Write LESSONS.md → Integrate/delete RECAP → Update trade tracker → present_files → Write to claude-fund repo → user runs session-close.bat

### I5 — GitHub Repo Structure
C:\Users\jcadb\claude-fund\journal\ — journal JSX files
C:\Users\jcadb\claude-fund\state\ — FUND_SESSION_STATE.md + LESSONS_LEARNED.md
C:\Users\jcadb\claude-fund\tracker\ — Trade Tracker XLSX
C:\Users\jcadb\claude-fund\intelligence\ — hormuz_log.md + dated thesis notes
Run session-close.bat at end of every session to commit + push.

### I6 — Memory Hierarchy (SI-33)
SESSION_RECAP (temp) → LESSONS_LEARNED (permanent) → FUND_SESSION_STATE (dynamic) → Journal (structural) → Trade Tracker (append)

### I7 — Trade Tracker Protocol (SI-34)
Append one row per executed trade. IBKR fill confirmation only.

### I8 — Performance Metrics Permanently In Journal (S16)
performanceMetrics{} in INITIAL_STATE. Updated every rebuild.

### I9 — Challenge Register Permanently In Journal (S16)
challengeRegister[] in INITIAL_STATE. All open challenges logged and resolved each session.

### I10 — FRED Macro Data (S17)
web_fetch to fred.stlouisfed.org/graph/fredgraph.csv?id={SERIES_ID}
Key series: DCOILWTICO (WTI), DCOILBRENTEU (Brent), DGS10 (10Y yield), BAMLH0A0HYM2 (HY spread), WTISTOROS (crude inventory Wednesday)
Supplementary only — lags 1 business day. Never use as live price for execution.

---

## PROHIBITED DATA SOURCES
- GuruFocus, PitchBook, Macroaxis — data quality issues
- Any search snippet price without verified publication date
- EODHD earnings endpoint (403 — use MMD or web search)
