# LESSONS LEARNED — CLAUDE FUND
**Account:** U24936508 (IBKR Pro) | **Compiled through Session 45 CLOSE (2026-05-16)**
**Journal version:** trading_journal59.jsx | **SIs:** 1–84
**Scanning:** SCANNING_FRAMEWORK.md v2.0 | **Weekly Review:** WEEKLY_REVIEW.md

---

## ERROR TAXONOMY (SI-17) — 29 CODIFIED ERROR TYPES
| # | Error | Description | Prevention |
|---|-------|-------------|-----------|
| E1 | Timezone | Wrong open/close times | NY=UTC-4, UAE=UTC+4. 17:30 UAE=09:30 NY open. LSE=11:00-19:30 UAE (BST). Milan/Frankfurt same. AMC earnings print after 00:00 UAE. NEVER assume a market is open without verifying clock time. |
| E2 | Stale position | Using journal prices vs IBKR | IBKR screenshot = ground truth always |
| E3 | Fill re-flag | Flagging executed orders as pending | Check IBKR fills before action items |
| E4 | Price verification | Acting on unverified prices | MMD primary, EODHD extended quotes for 52wk range |
| E5 | Market timing | Acting outside hours | LSE closes 19:30 UAE, NYSE 00:00 UAE |
| E6 | Dividend capture | Selling before ex-div | Hard lock on ex-div date from primary source |
| E7 | Session discipline | Thesis drift in fatigue | Re-read SI-25 before late-session trades |
| E8 | Stale quote | Using stale quote as live | Live price check mandatory before execution |
| E9 | GTC orphan | GTC stop persists after market sell. Also: standalone limit orders persist after stop fill. | Cancel ALL associated orders (stop AND standalone limits) on any position close. Check orders screen after every fill. |
| E10 | Closed position scan | Closed position in live scan with active stop | Cross-reference SI-19 + positions[] before any scan table |
| E11 | 52-week high hallucination | Stating 52wk range from memory | MANDATORY: use EOD:get_us_live_extended_quotes |
| E12 | Tool routing gap | Not knowing which tool provides which data | MMD=current price. EODHD extended=52wk range |
| E13 | EODHD price delay | EODHD lastTradePrice stale | Use MMD for current session price |
| E14 | Journal date discrepancy | Key event dates wrong | Cross-reference 2+ primary news sources |
| E15 | Exchange holiday blind spot | Assuming market open | Check exchange-specific holiday calendar every session |
| E16 | Stop staleness on winner | Stop drifts below cost basis | Review all stops >2 sessions old when position >10% above cost. T28 |
| E17 | Post-earnings entry implicit trade | Fill before earnings = implicit trade | Flag at fill — P24. Make explicit pre-earnings decision |
| E18 | Congressional scan narrow | Missing large filings in non-held names | Three-layer scan + sector clustering (SI-62 L4) |
| E19 | False CRITICAL flag | Flagging stopped-out position as live | Mandatory three-step reconciliation |
| E20 | Live price contradiction | Web search contradicts IBKR live | IBKR TWS is ONLY authoritative source during market hours |
| E21 | Commodity price staleness | Memory for commodity spot | Alpha Vantage API only. Never web search. State source + date |
| E22 | State media military claim | Iranian state media cited as military fact | CENTCOM/Western primary source required. Adversary media = unconfirmed until verified |
| E23 | EU energy scan omission | Core thesis sector not in formal scans | EU/UK energy transition is CORE THESIS. Section N MANDATORY. CWR +989% = cost of this error. |
| E24 | Session date drift | System prompt date used beyond session init | System prompt date = session initialization only. User statement is authoritative override. See I8. |
| E25 | Prior-year financial report misidentification | Cited prior-year results as current-year | Always verify company name AND fiscal year AND publication date. State fiscal year explicitly in every citation. |
| E26 | GTC cancel lag | 9-hour cancel window not used on adverse premarket news | Any GTC with >5% adverse premarket on material news = cancel before NYSE open (17:30 UAE). See I16. |
| E27 | Session state day-of-week error | Date labelled wrong day of week | Always verify day-of-week independently. Never trust session state day labels. |
| E28 | Stop widening on losing position | Requested to widen R3NK stop within €0.555 of trigger. Stop triggered same day. | Never widen a stop on a losing position within €1/$1 of triggering. If too tight, position was oversized — reduce shares, not stop quality. |
| E29 | Journal version overwrite | S41 content saved to v54 instead of creating v55 | Always create new file, increment version. Never overwrite. See I17. |

---

## PERFORMANCE AUDIT
| Metric | Inception | S43 CLOSE |
|--------|-----------|-----------|
| Net realized P&L (USD) | — | ~+$1,823 (no new closed trades S42-S43) |
| Top 2 trades contribution | — | ITM +$2,639 + AMZN +$1,882 = +$4,521 (248% of net realized) |
| Two worst trades | — | KTOS -$1,604 + PLTR -$1,307 = -$2,911 |
| Net Liquidity | ~$102,800 | ~$100,800 |
| Positions | 14 | 19 active + 2 GTCs |
| Trades total | — | 52 rows (45 closed + 7 open) |
| Key insight | — | Peace deal working: CCL +4.8%, NCLH +5.3% S43. LEU T52 entered as HALEU infrastructure toll road. |

---

## THESIS & STRATEGY LESSONS

### T1 — Supply Chain Premium > War Premium
### T2 — Toll Regime vs Full Closure Distinction
### T3 — Exit Trigger Discipline (SI-25 ONLY)
### T4 — Cash Reserve is Tactical, Not Passive
### T5 — Mythos Miss — AI model releases move positions
### T6 — Target List Cross-Reference
### T7 — Barbell Deployment Framework (Pool A: thesis-correlated. Pool B: quality compounders)
### T8 — Short Attack Protocol
### T9 — MSTR mNAV PREMIUM EXPANSION. Kill: BTC weekly close <$70K.
### T10 — Thesis Is Not a Position Sizing Input
### T11 — Winners Need Room Equal to Losers
### T12 — ATH Entry Discipline
### T13 — Missed Opportunity Capture / SI-39 Genesis
### T14 — Limit Order Discipline Under Premarket Pressure
### T15 — Broken Thesis Exit Discipline
### T16 — SI-45 Weekly Screener Cannot Be Deferred
### T17 — Conditional Reopening ≠ SI-25 Trigger
### T18 — Geopolitical Position Management: Verify Before Exiting
### T19 — ATH RULE IS THESIS-DEPENDENT
### T20 — Asymmetric Optionality Framing (not "next Nvidia")
### T21 — Stop Review Triggers (>8% gain + stop protecting <40%)
### T22 — Thesis Concentration Ceiling (CRML + LAC + UUUU = max critical minerals). LEU classified as nuclear INFRASTRUCTURE (enrichment technology) — does not count toward T22.
### T23 — Pre-Earnings Stop Management (no widening 48-72h before)
### T24 — Commercial Viability vs Strategic Necessity
### T25 — RULE RIGIDITY VS THESIS CONVICTION — rules prevent specific errors, not mechanically applied
### T26 — TIER-1 COMPETITOR STRATEGIC INVESTMENT SIGNAL (same-WEEK Stage 1)
### T27 — DEEP TURNAROUND PATTERN: >40% below ATH + 3+ guidance beats + improving revenue
### T28 — STOP-OUT IS NOT THESIS BREAK
### T29 — EU ENERGY TRANSITION IS CORE THESIS (CWR +989% missed)
### T30 — TACTICAL EXIT AND REBUY ON THESIS-INTACT NAMES
### T31 — STOP PLACEMENT ON 40%+ BELOW ATH NAMES (52W low is structural reference)
**Origin:** R3NK T35 stopped above 52W low €45.97. T41 stop set below at €44.00. T41 triggered €43.9925 — confirming thesis was broken, not a false stop-out. Rule vindicated.

### T32 — R/R FRAMEWORK: GROWTH THESIS vs EVENT BOUNCE (S41)
**Growth/thesis plays** (IonQ, MSTR, SNPS, PATH): buying a destination. 3:1 NOT required. Focus on conviction, stop at thesis break.
**Event bounce/depressed pricing** (CCL, TUI, Sixt, RYAAY): buying mean reversion. Upside defined. Catalyst binary. **Minimum 3:1 R/R required.**
Before evaluating ANY opportunity: classify it first. The framework follows from the classification. See SI-82.

### T33 — DISCOVERY-FIRST SCANNING (S41)
**The fund's consistent failure pattern:** Correct sector thesis, entered AFTER the primary re-rating (LDO, R3NK, EU defence broadly). The solution is not better sector analysis — it is earlier-stage discovery.
Scanning must run data → pattern → thesis → name. Never thesis → name → data validation. At least 50% of new ideas must originate from broad systematic screens, not from existing thesis expansion.
See SCANNING_FRAMEWORK.md v2.0.

### T34 — GOVERNANCE EVENT TRIAGE (S43)
When a governance flag fires on a speculative (SI-37) name, conduct 48-72h triage distinguishing structural vs operational governance failure before exiting.
**Re-entry at 50% SI-37 cap ($750) permitted if ALL five conditions met:**
1. Technology USP unchanged
2. Cash runway intact (>18 months)
3. Addressable market unchanged
4. Single correctable act (not pattern)
5. >30% sentiment-driven price dislocation
Full SI-37 cap resumes after one earnings print confirms revenue trajectory.

---

## POSITION-SPECIFIC LESSONS

### P1 — CWR.L — Do not enter above 500p
### P2 — Linde Thesis Weakened
### P3 — IAG.L Closed Correctly
### P4 — ABVX — M&A exception, maximum room strategy
### P5 — SHLD Stop/Sell Sequence Error (cancel GTC first, then sell)
### P6 — PLTR Entry Without Catalyst (P6 test required)
### P7 — AVAV Entry History
### P8 — ITM Stop Discrepancy (IBKR ground truth)
### P9 — AMZN Stop Mechanics (simple stops only for major US liquid names)
### P10 — ITM Breakout Protocol Supersession
### P11 — Re-Entry Below Stop-Out Price (permitted within 5% when thesis intact/strengthened AND with specific new development — thesis unchanged alone is insufficient)
### P12 — KTOS Sizing Error (origin of SI-35)
### P13 — No Entry Near 52-Week Highs Without Catalyst
### P14 — CODA Stop Intentional Below Journal Level
### P15 — ORCL Entry Timing (active legal filing = waiting period)
### P16 — ISRG Stop Journal Staleness
### P17 — PATK M&A Tip Entry Error
### P18 — Orphaned Buy Order Risk
### P19 — AI THESIS CROWDED TRADE OBSERVATION
### P20 — Stop Protection Percentage Review (P20 activates at >10% profit)
### P21 — Critical Minerals Speculative Classification
### P22 — MSTR mNAV ENTRY THESIS (Scale: BTC >$85K. Kill: <$70K weekly)
### P23 — UUUU PRE-EARNINGS ENTRY
### P24 — V STOP-OUT AND RE-ENTRY PARAMETERS ($305-315 only)
### P25 — NCH2 STAGE 2 GATE (deferred to Aug 2026, R/R 1.09:1 insufficient)
### P26 — R3NK CONVICTION SIZING (T41 vindicated stop discipline, net R3NK all trades: -$261)
### P27 — IREN ENTRY GATE BREACH (SI-37 sized, hold to stop, do not add)

### P28 — EU REARMAMENT STOCK SELECTION (S41)
LDO -$232. R3NK net -$261. Both entered post-primary re-rating (2022-2024).
**Rule:** EU rearmament thesis valid. Entry only when: (a) specific name NOT yet re-rated despite sector, or (b) >20% pullback from post-rearmament high. General sector thesis is not sufficient justification at current prices.
LDO: no re-entry without compelling specific catalyst. Not just rearmament.

### P29 — SPAC INVESTMENT THESIS DOCUMENTATION (S43)
**Origin:** S43. Analyst initially recommended redeeming CGCT shares, reversing on user pushback that the SPAC was held specifically for Factorial Inc. exposure, not as a cash equivalent.

**Error:** Recommending redemption of a SPAC position without first establishing WHY the position was held. A SPAC at trust floor provides asymmetric optionality: limited downside (can always redeem), open-ended upside if the merger target performs. Redeeming destroys this asymmetry for a negligible gain.

**Rule:** Before any recommendation on a SPAC position (redeem vs hold through merger), explicitly identify and state:
1. Was this SPAC held as a cash equivalent or for specific merger exposure?
2. Has the analyst reviewed the merger target's thesis independently?
3. Is the merger target thesis intact or broken?

**Prevention:** If the original investment thesis for a SPAC was specific merger exposure (documented or confirmed by the user), redemption is a thesis-break decision and requires the same rigour as stopping out of any other position. The trust floor protection does not mean the position should default to redemption — it means the downside is protected while upside optionality is preserved.

**Correct framework:** Hold through the merger unless: (a) merger target thesis is broken, (b) the fund needs the capital for a better opportunity, or (c) the user confirms the SPAC was held as cash equivalent only.

---

## SCAN PROTOCOL LESSONS

### S1 — Full Scan references SCANNING_FRAMEWORK.md v2.0 (supersedes all prior scan references)
### S2 — Journal Rebuild: bracket-depth counting Node.js
### S3 — Congressional Trading: broad sweep >$50K + sector clustering
### S4 — Source Quality: parallel search for geopolitical news
### S5 — Section 0 fires every session
### S6 — AMZN Pre-Execution: check IBKR orders screenshot FIRST
### S7 — Challenge Register Protocol
### S8 — Premarket Price Verification (MMD for current price)
### S9 — EOD API Failure Fallback
### S10 — Primary Source Verification for Binary Event Dates
### S11 — Weekly screen non-deferrable (now integrated into SI-77 Friday session)
### S12 — THESIS-DEDICATED RESEARCH FILES
### S13 — COMMODITY PRICE VERIFICATION (Alpha Vantage API, never memory)
### S15 — PRIMARY SOURCE DISCIPLINE
### S16 — Section N mandatory every full scan
### S17 — STAGE 2 GATE COMPLETENESS (include no material guidance revision clause)

---

## INFRASTRUCTURE LESSONS

### I1 — Local Filesystem MCP
Primary path: `C:\Users\James Cadbury\Dropbox\Claude-Fund`
Subdirectories: journal\, state\, research\, tracker\

### I2 — Google Drive DEPRECATED

### I3 — Session Open Protocol (SI-32) v6.0
1. Read FUND_SESSION_STATE.md
2. Read LESSONS_LEARNED.md (first session of week also read WEEKLY_REVIEW.md)
3. Check journal lastUpdated
4. SI-47: State today's date
5. IBKR screenshots
6. Section 0 (SI-70): position news sweep, active watchlist price check, volume anomaly, commodity prices
7. SI-39 drawdown screener
8. **Friday session:** Run SCANNING_FRAMEWORK.md full weekly discovery scan (SI-77) + complete weekly review (SI-78)
9. **First session of month:** Run SCANNING_FRAMEWORK.md monthly macro thesis session (SI-79)
10. SI-14 scan A-K
11. Section N EU Energy
12. Check research/ pending tasks

### I4 — Session Close Protocol (SI-28) v2.0
1. Wait for final IBKR screenshots (SI-68)
2. Update FUND_SESSION_STATE.md
3. Check highest journal number in journal\ folder
4. Create NEW file at N+1 (trading_journalNN.jsx) — never overwrite (I17)
5. **Friday session:** Complete WEEKLY_REVIEW.md before closing
6. Commit to Dropbox via filesystem MCP

### I5 — Journal versioning
trading_journal59.jsx = current (Session 45 CLOSE — 16 May 2026)
Next session creates trading_journal60.jsx. See I17.

### I6 — Memory Hierarchy (SI-33)
Journal → FUND_SESSION_STATE → LESSONS_LEARNED → SCANNING_FRAMEWORK → WEEKLY_REVIEW → research/*.md

### I7 — Trade Tracker Status (S45 CLOSE): 56 rows, 7 open (T39, T42, T43, T44, T47, T48, T52). T55=SNPS close +$12.20. T56=RR.L close +$26.16.

### I8 — Date Verification: User statement is authoritative override. Never infer from prices or news.

### I9 — DAY Orders Require Pre-Open Review

### I10 — RESEARCH FILE LOCATIONS
- `research/SCANNING_FRAMEWORK.md` ← primary scan reference v2.0
- `research/RULES_FRAMEWORK.md`
- `research/EU_ENERGY_TRANSITION_THESIS.md`
- `research/AI_INFRASTRUCTURE_THESIS.md`
- `state/WEEKLY_REVIEW.md` ← weekly performance review + improvement log

### I11 — Direct Dropbox Write Confirmed (filesystem MCP write_file working)
### I12 — EXCHANGE HOLIDAY PROTOCOL
### I13 — SESSION CLOSE TIMING (SI-68): Wait for final screenshots
### I14 — STOP-LIMIT RULE: Simple stops for major US liquid. Stop-limit for EU/UK volatile only.

### I15 — EOD EXTENDED QUOTES CONFIRMED WORKING
EOD:get_us_live_extended_quotes — live prices, 52W range, PE, market cap. E11 structurally solved.

### I16 — GTC CANCEL PROTOCOL ON ADVERSE PREMARKET
>5% adverse premarket on material news = cancel before NYSE open (17:30 UAE). 9-hour window available in UAE timezone. Cancel first, reassess after.

### I17 — JOURNAL VERSIONING: NEW FILE EVERY SESSION (S41)
**MANDATORY: Each session close = new file at N+1. Never overwrite.**
- Checklist: (1) Check highest journal number in journal\ folder (2) Create N+1 (3) Never touch existing files
- Why: Complete audit trail from v26 onwards. Overwriting destroys history.
- Error that created this: E29

---

## STANDING INSTRUCTION REFERENCE

### SI-25 — EXIT TRIGGER (DUAL CONDITION — BOTH REQUIRED)
Condition 1: PERMANENT Hormuz reopening. Condition 2: WTI -10% from peak ($105.87).
Current: Condition 1 UNMET. WTI ~$102. Thesis INTACT AND STRENGTHENING.

### SI-35 — DOLLAR-RISK SIZING. Max loss per trade = $500.
### SI-37 — SPECULATIVE POSITION CAP. Max $1,500.
### SI-39 — DRAWDOWN SCREENER. -15% to -20% from 52wk ATH. Every session.
### SI-45 — WEEKLY SCREENER. Integrated into SI-77 Friday session. Non-deferrable.
### SI-47 — DATE PROTOCOL. Step zero. State today's date explicitly.
### SI-48 — AI THESIS ATH RULE AMENDMENT. Narrow exception for AI infrastructure.
### SI-61 — SHORT WATCHLIST. PLTR dormant Q2 July. AAL watch. SNOW watch.
### SI-62 — TIER-1 STRATEGIC INVESTMENT MONITOR. Weekly SEC EDGAR.
### SI-63 — DEEP TURNAROUND SCREEN. Monthly.
### SI-64 — GOVERNMENT/NATIONAL SECURITY ASSET MONITOR. Quarterly + event-driven.
### SI-65 — TECHNOLOGY MILESTONE CALENDAR. Monthly review.
### SI-66 — NEW CEO CREDIBILITY PATTERN. Quarterly.

### SI-67 — EU/UK ENERGY TRANSITION SCAN — SECTION N
Frequency: First session each month + thesis-triggered.
Ceiling: 4 positions max. Current: 1/4 (RR.L). 3 slots available.
Priority: ENGIE.PA demoted to UNIVERSE (S44) — near ATH, Morningstar 235% premium, chart confirms distribution. Re-entry at €22-24 only. GTT.PA watch €170-175 post-ex-div June 17.

### SI-68 — JOURNAL CLOSE TIMING. No files until screenshots confirmed.
### SI-69 — MONTHLY RULE REVIEW. First session of month. No rule is permanent — sunset anything not earning its place.
### SI-70 — SESSION ZERO PROTOCOL. See SCANNING_FRAMEWORK.md v2.0 Section 0. 15 min max.
### SI-71 — WEEKLY EARNINGS REVISION TRACKER. Integrated into Friday weekly scan (SCANNING_FRAMEWORK Part 3, Section L).
### SI-72 — WEEKLY OPTIONS SENTIMENT. Integrated into Friday weekly scan (SCANNING_FRAMEWORK Part 3, Section M).
### SI-73 — WEEKLY SIGNIFICANT STAKES MONITOR. Integrated into Friday weekly scan (SCANNING_FRAMEWORK Part 1, Screen E).
### SI-74 — MONTHLY BULK FUNDAMENTAL SCREEN. Integrated into Monthly Macro Thesis session.
### SI-75 — MONTHLY EARNINGS CALL TRANSCRIPT ANALYSIS. Integrated into Monthly session.

### SI-76 — THREE-TIER WATCHLIST (Updated v2.0)
- **ACTIVE (max 5):** Stage 2 complete, entry trigger defined, stop set.
- **MONITORING (max 8):** Stage 1 complete, conviction building.
- **UNIVERSE (unlimited):** Raw scan outputs. One-line thesis only.

### SI-77 — BROAD WEEKLY DISCOVERY SCAN (NEW S41). Every Friday session. Non-deferrable.
### SI-78 — WEEKLY PERFORMANCE REVIEW (NEW S41). Every Friday session close. Complete WEEKLY_REVIEW.md.
### SI-79 — MONTHLY MACRO THESIS DEVELOPMENT SESSION (NEW S41). First session of month.
### SI-80 — CROSS-SECTOR ANOMALY RESPONSE (NEW S41). >5% move without catalyst = immediate full sector scan.
### SI-81 — CONTINUOUS IMPROVEMENT TRACKING (NEW S41). Every process change logged in WEEKLY_REVIEW.md.
### SI-82 — TRADE CLASSIFICATION BEFORE EVALUATION (NEW S41 — codifies T32). Growth/thesis vs event bounce. Classify first.

### SI-83 — STAGE 2 ACTIVE REQUEST PROTOCOL (NEW S44). At session open Step 1b: state any Stage 2 overdue. Priority 1 names: 3-session deadline. All others: 5-session deadline. Silence is an error, not a deferral. Format: "Stage 2 outstanding on [TICKER] — [X] sessions overdue. Complete now or defer with reason."

### SI-84 — CHART SCREENSHOT REQUEST PROTOCOL (NEW S44). Proactively request TradingView or IBKR weekly chart (1-2 year view) before any MONITORING → ACTIVE elevation, for any position within 10% of stop, for any position up >20% from entry, and for any name described as near ATH. User does not need to remember to provide them — analyst requests proactively.

---

## 52-WEEK DATA PROTOCOL
- **Current price (US):** EOD:get_us_live_extended_quotes or MMD
- **52-week high/low:** EOD:get_us_live_extended_quotes — NEVER from memory (E11)
- **EU/UK:** Stockopedia or Investing.com
- **Commodity prices:** Alpha Vantage API — never memory or web search (E21)

---

## PROHIBITED DATA SOURCES
- GuruFocus, PitchBook, Macroaxis
- EODHD earnings endpoint (403 error)
- Memory for 52-week range, commodity prices, or earnings dates
- EODHD lastTradePrice for current session
- Web search for live prices during market hours (E20)
- Trump Truth Social for geopolitical fact confirmation
- Iranian/adversary state media without CENTCOM verification (E22)
- McPhy Energy (ALMCP.PA) — IN LIQUIDATION
- Lhyfe (LHYFE.PA) — bankruptcy trajectory
- Prior-year press releases cited as current-year results (E25)

---

## S41 AMENDMENTS — Tuesday 12 May 2026
Framework v2.0 implemented. T32, T33, P28, E28, E29, I17, SI-77 through SI-82 codified.
T45 LDO -$232 | T41 R3NK -$543 | T46 AMZN +$1,882 | Net +$1,107

## S42 AMENDMENTS — Wednesday 13 May 2026
T49 MSFT -$24 | T50 CCJ -$243 | T51 BAH -$249 | Net -$516
T47 CCL 250sh @$24.70 | T48 NCLH 75sh @$15.90

## S43 AMENDMENTS — Thursday 14 May 2026

### NEW POSITION
T52 LEU 15sh @~$191.90, stop $159 GTC. Max loss $493. HALEU toll road thesis. Stage 2 completed.

### NEW LESSONS CODIFIED
T34 (governance event triage), P29 (SPAC investment thesis documentation)

### CGCT DECISION
Hold through Factorial merger confirmed. Shareholder vote May 27, 2026 at 10am ET. Post-merger ticker FAC. SPAC held specifically for Factorial exposure — redemption would defeat the investment thesis.

### KEY INTELLIGENCE
CCL +4.8%, NCLH +5.3% — peace deal portfolio working. LEU: $3.9B backlog, $900M DOE task order, OKLO JV, Russian ban Jan 2028. OKLO: UNIVERSE, July 4 Groves criticality watch. ABVX GTC orphan $114.90 — cancel S44. CLARITY result pending S44 check.

---

## S44 AMENDMENTS — Friday 15 May 2026

### CLOSED POSITIONS
CRML: 110sh stopped at $11.1744 (stop $11.20). Avg cost $9.08. Realized +$230.38. T22 ceiling blocks re-entry. P28 applies — no re-entry without specific new catalyst.
ABVX: 50sh sold at $120.909 (voluntary, M&A position). Avg cost $109.89. Realized +$550.95. Position fully closed.
Total realized S44: +$779.25.
LEU T52 fill confirmed at $191.63 (not $191.90 estimate). Stop in IBKR confirmed $158.17 (not $159.00 in journal — marginal SI-35 breach of $1.90, noted but not acted on).
ABVX GTC orphan $114.90: CONFIRMED CANCELLED in orders screen. E9 cleared.

### NEW LESSONS CODIFIED

**T35 — STAGE 2 DEFERRAL HAS A CALCULABLE COST. ACTIVE REQUEST IS MANDATORY.**
Origin: MU April-May 2026. MU designated Priority #1 Stage 2 on April 19 at $454. No session subsequently contained an active Stage 2 request. MU reached $778 before Stage 2 was attempted (+71% missed). This is the fund's largest single missed opportunity to date — approximately $700+ per share unrealised gain on a name with completed Stage 1 and clear thesis.
Rule: From point of Stage 2 designation, the analyst must actively request Stage 2 completion at the next session open and every session thereafter until completed or explicitly cancelled with stated reason. Silence is not deferral — it is an error. Priority 1 names: 3-session hard deadline. All other Stage 2 names: 5-session hard deadline. See SI-83.

**P30 — ATH CHART PLUS CREDIBLE VALUATION WARNING EQUALS UNIVERSE DEMOTION**
Origin: ENGIE.PA May 2026. Stage 1 research documented Morningstar 235% premium to fair value. Name remained in MONITORING. Chart screenshot at S44 revealed near-all-time-high price action (€12 to €29 in 5 years, with parabolic acceleration in 2025-2026) with distribution wicks at the top. When a credible valuation source AND chart pattern independently flag elevated price, the name moves to UNIVERSE pending Stage 2 fundamental disproof. It does not remain in MONITORING while the concern is unresolved. Re-entry condition: price pullback to prior consolidation zone (€22-24 for ENGIE) AND Stage 2 with specific Morningstar premium rebuttal.

**I16 UPDATE — CHART SCREENSHOTS ARE GROUND TRUTH FOR PRICE STRUCTURE**
In the same way IBKR screenshots are ground truth for positions and fills, chart screenshots are ground truth for price structure and entry zones. Stage 1 and Stage 2 research is incomplete without a chart review. No name is elevated from MONITORING to ACTIVE without a chart screenshot reviewed in that session or the immediately prior one. See SI-84 for the active request protocol.
Candlestick reading guide for reference: Green body = price closed above open (buyers won). Red body = closed below open (sellers won). Long wick above body = price tried higher, got rejected — that level is resistance. Long wick below body = buyers defended a level — that is support. Multiple wicks at the same price level across different weeks = strong contested zone. Vertical move with few pullbacks = momentum exhaustion risk, not a clean entry.

### WATCHLIST CHANGES
ENGIE.PA: DEMOTED from MONITORING to UNIVERSE. Chart shows near-ATH after rally from €12 to €29. Morningstar 235% premium unresolved. Re-entry zone €22-24 on pullback. Belgian nuclear asset sale resolution and UKPN close are the catalysts to watch. Stage 2 required before any re-elevation.
CRM: ELEVATED to ACTIVE (conditional). Entry contingent on May 27 AMC beat + Agentforce ARR >$1B. 12.6x forward PE is cheapest large-cap SaaS in market. T23 lock May 25.
MU: Added to MONITORING — but NOT ACTIVE. SI-35 prevents meaningful position at $778. Cyclical risk means forward PE of 8.18x is based on peak-cycle earnings, not normalised. July 1 earnings catalyst. Speculative 2-3 share entry only if chosen — treat as SI-37 allocation.

### NEW STANDING INSTRUCTIONS

**SI-83 — STAGE 2 ACTIVE REQUEST PROTOCOL (NEW S44)**
When any name is designated for Stage 2, the analyst must state the Stage 2 deadline at point of designation and actively request completion at every subsequent session open until done. Format at session open Step 1b: "Stage 2 outstanding on [TICKER] — designated [date], [X] sessions overdue. Complete now or defer with explicit reason stated."
Deadlines: Priority 1 names = 3 sessions. All others = 5 sessions. A designation that expires silently is an error, not a deferral.

**SI-84 — CHART SCREENSHOT REQUEST PROTOCOL (NEW S44)**
I will proactively request chart screenshots (TradingView or IBKR, weekly timeframe, 1-2 year view) in the following situations:
1. Any MONITORING name being evaluated for elevation to ACTIVE.
2. Any held position within 10% of its stop level.
3. Any held position up more than 20% from entry.
4. Any name described as "at ATH" or "near 52-week high" in research.
5. Any macro context suggesting sector rotation — request sector-level chart.
The user does not need to remember to provide charts — I will request them. A chart screenshot request is a standard part of ACTIVE tier evaluation, not an optional extra.

### KEY INTELLIGENCE S44
CLARITY Act passed Senate Banking Committee 15-9. Full Senate floor vote required, needs 60 votes (7+ Democrat crossovers). Positive for BTC medium-term. BTC ~$81K, $4K below $85K MSTR scale gate.
Trump-Xi Beijing summit: Joint statement confirms Strait of Hormuz "must remain open". Xi offered to broker peace, will not provide military equipment to Iran. SI-25 Condition 1 still UNMET — diplomatic language is not operational reopening. Ship seized near UAE same day.
WTI ~$101.56 (May 11). SI-25 Condition 2 trigger $95.28 — UNMET.
PATH: Intraday low $9.2002 on May 15 — new 52wk low. Stop $9.20 NOT triggered (confirmed orders screen). Earnings May 28.
First weekly review under v2.0 completed. Two process improvements identified and implemented (SI-83, SI-84).
Market macro risk: Shiller CAPE ~39.1x, 46% above 20yr average. Implied 10yr return 1.5%. Tighter entry standard applies — P6 test must be explicitly passed for all new positions.

---

## S45 AMENDMENTS — Saturday 16 May 2026

### JOURNAL CORRECTIONS (not in S44 — discovered from IBKR screenshots)

**T55 — SNPS stopped May 15 at $496.65**
8 shares. Stop $496.76. Fill $496.65 ($0.11 below stop — normal market execution). Avg cost $495.125. Realized +$12.20. SNPS recovered to $499.81 post-stop — do not chase. T23 lock May 25 ahead of May 27 AMC earnings. Position count corrected from 17 to 15.

**T56 — RR.L stopped May 15 at 1149.20p**
100 shares. Stop 1149.4p. Fill 1149.20p (0.20p below stop — normal DARK execution). Avg cost 1128.6p. Realized +~£20.60 (~$26.16 USD). RR.L fell further to 1140p close after stop — stop correctly protected additional loss. Re-entry after T19.

### DATA CORRECTIONS
AVAV earnings date: Corrected from Jun 30 to **Jun 23, 2026** (verified from Investing.com). Do not use Jun 30 date again.
OKLO entry zone: Corrected from "$12-13" to **"$50-55"** (post-criticality dip realistic range at current $62 price). The $12-13 entry was completely stale.

### CHART ANALYSIS (SI-84 — IBKR 1D and 15m charts reviewed)

**IREN (15m):** Stop $52.00 aligns with March-April 2026 structural support base. $52.86 daily low — stop within $0.86. $2B convertible notes offering + Q3 miss ($144.8M vs $220M est) + BTC $79K are proximate causes. Hold to stop. Do not widen.

**AVAV (15m):** Crash May 13 (news-driven gap). Failed recovery. Lower highs and lower lows pattern. Stop at $155 is structural floor — last area of support on daily chart. No buyers defending $157-158. Stop likely triggers this week. Rule confirmed: do not exit manually ahead of stop (E28).

**PATH (15m):** Capitulation confirmed. $9.2002 spike with maximum volume, immediate V-recovery to $10.37+. Higher lows forming since spike. Most constructive of the critical positions. Hold to stop or May 28 earnings.

**LEU (1D):** Stop at $158.17 confirmed below March 2026 structural base ($160-170 zone). Position declining from entry ($191.63) but stop well-placed with $23 buffer. Thesis intact.

**CRM (1D):** Clean base forming at $165-185 after downtrend from $300. 6-7 weeks of consolidation visible. $163.52 52wk low provides floor. Entry setup valid for conditional May 27 AMC play.

### MACRO REGIME CHANGE
Kevin Warsh confirmed as new Fed Chair (May 15 — Powell's term ended). More hawkish than Powell. 10-year yield at 4.416% multi-month high. Import prices +4.2% YoY April — highest since October 2022. Stagflation-adjacent: high oil ($102), rising yields, hawkish Fed, CAPE 39x. This is the most difficult macro environment for growth multiples since the fund's inception. P6 test must be applied rigorously to every new entry.

### AI THESIS VALIDATION
CSCO Q3 FY2026: Revenue $15.8B +12% YoY, AI hyperscaler orders raised $5B→$9B for FY26. Stock +13%. DELL Q4 FY2026: AI server revenue $9B +342%, $43B backlog, FY27 target $50B AI servers. Stock +22%. Both confirm AI infrastructure thesis direction. Both added to UNIVERSE — P13 applies to both (do not enter within 5% of post-earnings breakout).

### PROCESS IMPROVEMENT
Scans should be delivered as inline conversational responses, not as separate documents. Document creation for scan output adds no value — the content belongs in the conversation.

### KEY INTELLIGENCE S45
BTC fell $81K→$79K this week — moving away from $85K scale gate. MSTR kill switch $70K still $9K distant.
WTI rose to ~$102 — SI-25 Condition 2 further away than last week. Oil moving wrong direction.
NVDA earnings Wednesday May 20 — consensus $78B revenue. Not at SI-39 trigger ($159.14). Watch AI sector sentiment.
RYAAY FY earnings Wednesday May 21 — entry only at $52 or below. Current $53.70 fails 3:1 R/R minimum (T32).
CRM at $173.51 — in entry zone $165-185. T23 lock May 25. Conditional entry May 27 AMC on beat + ARR >$1B.
CGCT vote May 27 10am ET (2pm UAE) — confirm no-redemption with IBKR before May 25.
PATH T23 lock May 26 — do not touch stop. Earnings May 28 AMC.

---

### S47 LESSONS — 19 May 2026

**DROPBOX WRITE PROTOCOL (PERMANENT FIX)**
Files must be written directly to `C:\Users\James Cadbury\Dropbox\Claude-Fund\state\` using the filesystem MCP tool. Never write session state to /home/claude/ or /mnt/user-data/outputs/ — those locations are invisible to the user outside the chat session. At every session close, the first file write action must target the Dropbox path. Run filesystem:list_allowed_directories at session open if path is uncertain.

**EARNINGS DATE VERIFICATION (E29)**
RYAAY was recorded as "Thursday May 21 AMC" in S46 state. Actual earnings: Monday 18 May BMO. This is a category error — earnings dates must be verified against an actual calendar source (EOD:get_upcoming_earnings or web search) at point of entry into session state. Do not carry forward unverified dates. A missed gate because of a wrong date is the same failure as missing a stop. Add earnings date verification to SI-32 session open protocol for all ACTIVE watchlist names with pending catalyst dates.

**HELD POSITION EARNINGS MONITORING (E30)**
NCLH reported on May 4-5 with a major guidance cut (-3% to -5% net yield, EPS -31.9%). The thesis review was not formally completed until S47 — 11 sessions later. A held position that reports earnings must trigger an immediate thesis review in the same session or the next. Add to SI-32: at session open, check whether any held position reported earnings since last session. If yes, thesis review is Step 1b mandatory before any other agenda item.

**THIRD-PARTY RESEARCH INTEGRATION PROTOCOL**
The Apex Trading Tech World report (18 May 2026) provided useful external validation. Correct integration order: (1) check existing thesis validation — does the report confirm or contradict? (2) identify new UNIVERSE candidates from names mentioned. (3) do not adjust any position based on third-party view alone — all new names must go through Stage 1/2. The report's value is validation and discovery, not trading instruction.

**FILE WRITE CONFIRMATION**
At every session close, confirm filesystem write succeeded by checking the return value from filesystem:write_file. Do not assume success. If the write fails, retry before closing the session. The session state file in Dropbox is the only persistent record — if it is not written, the session did not close properly.
