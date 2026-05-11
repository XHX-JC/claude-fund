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
| E9 | GTC orphan | GTC persists after market sell → unintended short | Cancel stop BEFORE market sell or immediately on fill |
| E10 | Closed position scan | Closed position presented as live with active stop | Cross-reference SI-19 + positions[] before any scan table. IBKR is final arbiter |

---

## PERFORMANCE AUDIT FINDINGS (S16 — 23 Mar–12 Apr 2026)
*These are permanent reference findings, not session-specific notes.*

| Metric | Value | Target | Status |
|--------|-------|--------|--------|
| Win rate | 41.7% | 50%+ | ❌ Below threshold |
| Profit factor | 0.27 | >1.0 | ❌ Critically low |
| Payoff ratio | 0.38 | >2.0 | ❌ Inverted |
| Expectancy/trade | -$245 | >$0 | ❌ Negative |
| Kelly fraction | -1.12 | >0 | ❌ Negative |
| Cash utilisation | 31.1% deployed | 55%+ | ❌ Underdeployed |
| Monthly return | ~-0.9% | 5% | ❌ Below target |
| Open unrealized | +$2,052 | — | ✅ Thesis working |

**Root causes (in priority order):**
1. Two oversized trades (KTOS $8,100, PLTR $7,920) destroyed entire closed book (-$2,911)
2. 68.9% cash idle at $0 return vs 5% monthly target
3. Payoff ratio inverted: winners cut at 4.2%, losers run to 10.7%
4. No dollar-risk sizing discipline — position sizes driven by conviction not risk math
5. Speculative entries (KTOS, PLTR) sized as thesis entries

---

## THESIS & STRATEGY LESSONS

### T1 — Supply Chain Premium > War Premium
Thesis evolved from war premium to supply chain premium. Structural damage to fertiliser seasons, EU energy independence, nuclear buildout persists even after US withdrawal under a toll regime. Do not unwind on ceasefire — unwind on SI-25 only.

### T2 — Toll Regime vs Full Closure Distinction
Toll regime likely resumes non-oil shipments including helium. This weakened the Linde thesis vs full closure. Always distinguish closure type.

### T3 — Exit Trigger Discipline
SI-25 is the ONLY valid exit trigger: formal Hormuz reopening + oil -10% from peak. Ceasefire announcement alone is NOT sufficient. Islamabad talks FAILED Apr 12 — further confirms thesis longevity.

### T4 — Cash Reserve is Tactical, Not Passive
Cash reserve is a tactical tool with coded deployment triggers (SI-40), not a permanent defensive posture. At 5% monthly target, $68K idle = -$113/day. Triggers must fire and be acted on. The Islamabad failure on Apr 12 activated Trigger A — LNG and RTX entry is mandated for Monday.

### T5 — Mythos Miss (S13 Critical)
Anthropic frontier model release caused PLTR -7%, MSFT sector drag. Section K AI query is NON-NEGOTIABLE every session.

### T6 — Target List Cross-Reference (S14)
Compare current price vs research reference price. Names that have fallen since memo was written represent improved entries where thesis is unchanged.

### T7 — Barbell Deployment Framework (S14)
Pool A (thesis-correlated, event-gated): deploy on confirmed ceasefire breakdown. Pool B (quality compounders, non-correlated): deploy regardless of event. Never conflate.

### T8 — Short Attack Protocol (S16)
When named short seller releases public report: DO NOT ENTER if watchlist. If held: assess credibility, consider stop tighten. Entry only resumes after management formal rebuttal or regulatory clearance. ZETA Culper report Apr 2026 is the founding example.

### T9 — Leveraged BTC Proxy vs Spot (S16)
MSTR adds equity-layer dilution risk, management complexity, premium to NAV. Direct spot BTC via IBKR Paxos (SI-20) is preferred. Only consider MSTR if mNAV compresses below 1.0x or spot vehicle unavailable.

### T10 — Thesis Is Not a Position Sizing Input (S16 — NEW)
The strength of the thesis determines whether to enter. It does NOT determine how much to deploy. Position size is a function of stop distance and maximum acceptable loss per trade (SI-35). KTOS was a strong thesis — $8,100 sizing was wrong regardless of thesis quality. Separate these decisions entirely.

### T11 — Winners Need Room Equal to Losers (S16 — NEW)
Average winner: 4.2%. Average loser: 10.7%. Losers are running further than winners are being allowed to run. When a position moves 4-5% in favour and the thesis is intact, the default action is to raise the stop to protect profit and hold for the primary target — not to exit. The mechanical stop-raise discipline (AMZN $212→$222→$228, CCJ $106→$108.37) is correct but needs to be matched by holding patience on the long side.

---

## POSITION-SPECIFIC LESSONS

### P1 — CWR.L Momentum Trap
Revenue flat ~£22M while losses widened; prior bubble to 27x sales. Entry only at 250-270p with confirmed re-rating evidence.

### P2 — Linde Thesis Weakened
Under toll regime, helium resumes. Linde is watch-only.

### P3 — IAG.L Closed Correctly
Sold after peace dividend thesis assessed broken under toll regime.

### P4 — ABVX Risk Profile (Grandfathered)
$5,188 deployed, +7.1% unrealized. Phase 3 Q2 binary. Stop $100. Do not add. Raise stop to $113 after Phase 3 data. New speculative entries capped at $1,500 per SI-37 but ABVX grandfathered.

### P5 — SHLD Stop/Sell Sequence Error (S14)
Stop not cancelled before market sell → unintended short created. E9 codified. Always cancel GTC stop FIRST, then sell.

### P6 — PLTR Entry Without Catalyst (S16)
5-session test had no fundamental anchor. Entered on sentiment during institutional selling (Burry puts). Presidential Truth Social post ≠ valid catalyst. Entry required confirmed catalyst per SI-39.

### P7 — AVAV Entry Timing (S13)
Entered $195 during ceasefire selloff. Thesis intact but -7.8%. Hold, do not add. Review if still below $190 post-RTX Apr 21.

### P8 — ITM Stop Discrepancy
IBKR is ground truth on stop prices — journal discrepancies accumulate when stops adjusted intra-session without rebuild.

### P9 — AMZN Stop Limit Gap Mechanics
IBKR rejects Stop Limit with gap >~1.5%. Rule: limit price ≤ 1.5% below trigger for $200-$300 stocks.

### P10 — ITM Breakout Protocol Supersession
When current stop already exceeds the SI-21 protocol target for a given price level, the protocol is superseded. Apply the MORE protective stop. Never lower a stop to match a lower protocol target.

### P11 — Re-Entry Below Stop-Out Price
After a stop-out, do NOT re-enter until price pulls back below the stop-out level. Re-entering above exit price = chasing. ONDS stopped $8.50: re-entry only below $9.00. LDO stopped €59.56: re-entry only below €58.

### P12 — KTOS Sizing Error (S16 — NEW, founding case for SI-35)
$8,100 deployed on KTOS with 19.8% stop = $1,604 maximum loss risk accepted. Dollar-risk at $500 max → correct size $2,525. Error: $5,575 over-deployed. Loss could have been $594 instead of $1,604. Position sizing must use SI-35 protocol, not conviction estimate.

### P13 — No Entry Near 52-Week Highs Without Catalyst (S16 — NEW, founding case for SI-39)
KTOS entered at $81, within 10% of ATH, on thesis alone. No imminent catalyst. Entry near ATH without a specific near-term catalyst is a momentum entry, not a thesis entry. SI-39 bars entry within 5% of 52wk high without confirmed catalyst.

---

## SCAN PROTOCOL LESSONS

### S1 — Full Scan = SI-14 Sections A-K (v3.0)
Mandatory 11-section sequence. K-scan (AI model search) NON-NEGOTIABLE.

### S2 — Journal Rebuild Method
Bracket-depth counting (Node.js). eval() → mutate → JSON.stringify → reconstruct. Bracket balance validation mandatory. Never use regex or str_replace on INITIAL_STATE.

### S3 — Congressional Trading Signals
Broad sweep ALL stocks >$50K. Not just held names.

### S4 — Source Quality Hierarchy
Apify + web search in parallel. Both required for geopolitical news.

### S5 — Docx File Access
Upload as attachment to Claude conversation; python-docx extracts content.

### S6 — AMZN Pre-Execution Check (S16)
Check IBKR orders screenshot FIRST before recommending stop changes to avoid flagging already-executed orders.

### S7 — Challenge Register Protocol (S16 — NEW)
Each session, Claude raises challenges on open decisions (challengeRegister[]). James decides. All challenge/decision pairs logged permanently. Challenge topics include: capital redeployment decisions, delayed entries past their trigger date, position sizing vs SI-37 breaches, R:R below SI-36 threshold on existing names. Challenges are a POSITIVE friction — they prevent drift and performance pressure-driven errors.

---

## INFRASTRUCTURE LESSONS

### I1 — Local Filesystem MCP
config: command = "C:\\Users\\jcadb\\AppData\\Roaming\\npm\\mcp-server-filesystem.cmd"
Path: C:\Users\jcadb\Claude Date File

### I2 — Google Drive DEPRECATED

### I3 — Session Open Protocol (SI-32)
1. FUND_SESSION_STATE.md → 2. LESSONS_LEARNED.md → 3. SESSION_RECAP.md (if exists) → 4. IBKR screenshots → 5. SI-14 scan A-K

### I4 — Session Close Protocol (SI-28)
Rebuild journal → Write STATE.md → Write LESSONS.md → Integrate/delete RECAP → Update trade tracker → present_files

### I5 — Journal Project Hygiene
Only latest journal in Claude project. Older journals in Claude Date File.

### I6 — Memory Hierarchy (SI-33)
SESSION_RECAP (temp) → LESSONS_LEARNED (permanent) → FUND_SESSION_STATE (dynamic) → Journal (structural) → Trade Tracker (append)

### I7 — Trade Tracker Protocol (SI-34)
Append one row per executed trade — never rebuild. IBKR fill confirmation only.

### I8 — Performance Metrics Permanently In Journal (S16 — NEW)
performanceMetrics{} section added to INITIAL_STATE. Updated every journal rebuild with: win rate, profit factor, payoff ratio, expectancy, Kelly fraction, capital utilisation. This creates a permanent performance record embedded in the journal that cannot be ignored or forgotten. Future Claude instances will have the audit data immediately available without searching session notes.

### I9 — Challenge Register Permanently In Journal (S16 — NEW)
challengeRegister[] section added to INITIAL_STATE. All open challenges logged with: id, date, session, topic, challenge, counterArgument, decision, status. Closed challenges marked CLOSED with outcome. This prevents decisions from disappearing between sessions. Every session open: read challengeRegister and flag any OPEN items for resolution before proceeding.

---

## PROHIBITED DATA SOURCES
- GuruFocus, PitchBook, Macroaxis — data quality issues
- Any search snippet price without verified publication date
- EODHD earnings endpoint (403 — use MMD or web search)
