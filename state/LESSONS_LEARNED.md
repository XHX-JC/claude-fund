# LESSONS LEARNED — CLAUDE FUND
**Account:** U24936508 (IBKR Pro) | **Compiled through Session S50 CLOSE (2026-05-22)**
**Journal version:** trading_journal63.jsx | **SIs:** 1–85
**Scanning:** SCANNING_FRAMEWORK.md v2.0 | **Weekly Review:** WEEKLY_REVIEW.md

---

## ERROR TAXONOMY (SI-17) — 31 CODIFIED ERROR TYPES
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
| E30 | Earnings date verification failure | RYAAY earnings date carried as unverified guess for multiple sessions | Verify all catalyst dates against EOD:get_upcoming_earnings or web search at point of entry. Stale dates are an error class, not a minor oversight. |
| E31 | Sell limit above cost on declining hedge | Recommending a sell limit above cost basis on a position already below cost — if price reaches that level the macro driver is working, which is exactly when to hold, not sell | Exit decisions on macro hedges must be probability-weighted EV across scenarios, not price-target-based. If EV is negative, sell at market or accept current price. If EV is positive, hold. A limit above cost on a hedge is not a strategy, it is indecision. |

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

### T35 — STAGE 2 DEFERRAL HAS A CALCULABLE COST. ACTIVE REQUEST IS MANDATORY.
Origin: MU April-May 2026. MU designated Priority #1 Stage 2 on April 19 at $454. No session subsequently contained an active Stage 2 request. MU reached $778 before Stage 2 was attempted (+71% missed). This is the fund's largest single missed opportunity to date — approximately $700+ per share unrealised gain on a name with completed Stage 1 and clear thesis.
Rule: From point of Stage 2 designation, the analyst must actively request Stage 2 completion at the next session open and every session thereafter until completed or explicitly cancelled with stated reason. Silence is not deferral — it is an error. Priority 1 names: 3-session hard deadline. All other Stage 2 names: 5-session hard deadline. See SI-83.

### T36-T53 — (Filed in journals S41-S47)

### T54 — PROBABILITY-WEIGHTED FRAMEWORK FOR MACRO HEDGE DECISIONS (S50)
When evaluating whether to hold or exit a macro hedge position, the correct framework is to enumerate the key macro scenarios, assign approximate probabilities, and determine the expected value of the position across all scenarios. If the EV is negative — meaning the majority of probability-weighted outcomes work against the position — exit regardless of the nominal loss on cost basis.
**IAU case study (S50):** Rate hike probability 50-60% (negative for gold). Peace deal near-certain before midterms (risk-on = negative for gold). Macro crash probability 20-25% (positive for gold). Two of three key scenarios work against IAU. EV negative. Correct action: exit at small loss, recover capital.
**Rule:** A hedge that has lost its hedging function due to regime change (macro environment shift) should be treated identically to any other position with a broken thesis. Sunk cost is not a hold reason.

### T55 — SNPS STOPPED MAY 15 AT $496.65
8 shares stopped. Realized +$12.20. See S45.

### T56 — RR.L STOPPED MAY 15 AT 1149.20p
100 shares stopped. Realized +~£20.60. See S45.

### T57 — ALTERNATIVE ENERGY SECTOR RERATING DISCIPLINE (S50)
**Origin:** ITM Power and Ceres Power scan, S50. Both were previously identified as candidates for EU energy transition Section N. Both have since rerated dramatically — CWR +989%, ITM +400% — and now trade above analyst consensus targets (CWR 29% above analyst target, ITM 41% above analyst target). Entering these names after the primary rerating has already occurred is the same error class as T29 (EU rearmament post-rerating) and the broader T33 pattern.
**Rule:** Before entering any Section N name, verify analyst consensus target against current price. If current price is above analyst consensus, the rerating has already occurred and the name is NOT a Section N opportunity — it is a position requiring further appreciation beyond what analysts can currently justify. Wait for either: (a) a fundamental development that resets the analyst target higher, or (b) a price pullback below analyst consensus. Do not enter above analyst consensus on a thesis that already played out.

### T58 — MACRO HEDGE EXIT: PROBABILITY-WEIGHTED EV SUPERSEDES COST BASIS (S50)
See T54 for the full framework. The specific IAU decision: do not set a limit sell above cost basis on a declining hedge position (see E31). The decision to hold or exit must be made on EV, then executed at current market price without waiting for a favourable print. The small loss on exit ($205 on IAU) is immaterial relative to the capital recovered ($14,844) and the strategic alignment of the portfolio with the dominant probability-weighted scenarios.

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
**Rule:** Before any recommendation on a SPAC position (redeem vs hold through merger), explicitly identify:
1. Was this SPAC held as a cash equivalent or for specific merger exposure?
2. Has the analyst reviewed the merger target's thesis independently?
3. Is the merger target thesis intact or broken?
The trust floor protection does not mean default to redemption — it means downside is protected while upside optionality is preserved.

### P30 — ATH CHART PLUS CREDIBLE VALUATION WARNING EQUALS UNIVERSE DEMOTION
Origin: ENGIE.PA May 2026. When credible valuation source AND chart pattern independently flag elevated price, name moves to UNIVERSE pending Stage 2 fundamental disproof.

### P31 — CGCT/FAC — SPAC MECHANICS AND AUTO-CONVERSION (S50)
**Origin:** S50. CGCT shares converting to FAC (Factorial Inc.) post-vote May 27 2026.
**Rule:** SPAC shares at trust value require no action from the shareholder. Upon vote approval, shares automatically convert to the combined entity ticker at 1:1 in IBKR — no manual steps. The only action requiring a deadline is redemption (if desired), which must be submitted 24-48 hours before the vote. Holding = automatic conversion. The trust floor ($9.50 for CGCT) means the stock trading at trust value is AT maximum downside, not trending toward it — this is the safest level to hold a SPAC, not an alarm signal.
**CGCT/FAC thesis:** Factorial Inc. solid-state battery developer. OEM validation: Mercedes-Benz EQS >1,200km range, Stellantis, Hyundai, Kia. Expanding into defense/drone/aerospace. $276M trust + $100M PIPE = $376M post-listing capital. New ticker FAC on NASDAQ. At $9.50 the market assigns near-zero EV above the cash — significant asymmetry if commercialisation proceeds.

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

### S18 — SCREEN E CANNOT BE DISPLACED (S50)
**Origin:** Screen E (congressional and institutional signals) was not run in S50 due to time pressure before the user's absence period. This screen has previously generated actionable intelligence (T26 thesis origin). It is now a fixed 15-minute block at the START of every Friday FULL SCAN — before position news sweep, before any other agenda item. It cannot be displaced by time pressure, by the volume of other work, or by the presence of more urgent-seeming tasks. If the session is time-limited, run Screen E first and compress other items. See SI-85.

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
8. **Friday session:** Screen E FIRST (SI-85), then run SCANNING_FRAMEWORK.md full weekly discovery scan (SI-77) + complete weekly review (SI-78)
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
trading_journal63.jsx = current (Session S50 CLOSE — 22 May 2026)
Next session creates trading_journal64.jsx. See I17.

### I6 — Memory Hierarchy (SI-33)
Journal → FUND_SESSION_STATE → LESSONS_LEARNED → SCANNING_FRAMEWORK → WEEKLY_REVIEW → research/*.md

### I7 — Trade Tracker Status (S50 CLOSE): T57=IAU closed -$205. T58 reserved. IES partial sell (1,500 at 31.8p) recorded in journal63 — not a full close (1,500 shares remain).

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

---

## STANDING INSTRUCTION REFERENCE

### SI-25 — EXIT TRIGGER (DUAL CONDITION — BOTH REQUIRED)
Condition 1: PERMANENT Hormuz reopening. Condition 2: WTI -10% from peak ($105.87 = $95.28).
Current S50: Condition 1 UNMET. WTI ~$97-101. Both conditions UNMET. Thesis INTACT.

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
Ceiling: 4 positions max. Current: 0/4 (IES is LSE-listed but classified as speculative, not Section N). All 4 slots available.
Priority: GTT.PA — June 17 ex-dividend approaching. Stage 1 required immediately on return.
DO NOT ENTER: CWR.L (already rerated +989%, above analyst targets), ITM.L (already rerated +400%, above analyst targets).
IES GBP proceeds (£477) available for Section N deployment once suitable pre-rerating name identified.

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

### SI-83 — STAGE 2 ACTIVE REQUEST PROTOCOL (NEW S44).
At session open Step 1b: state any Stage 2 overdue. Priority 1 names: 3-session deadline. All others: 5-session deadline. Silence is an error, not a deferral.

### SI-84 — CHART SCREENSHOT REQUEST PROTOCOL (NEW S44).
Proactively request TradingView or IBKR weekly chart (1-2 year view) before any MONITORING → ACTIVE elevation, for any position within 10% of stop, for any position up >20% from entry, and for any name described as near ATH.

### SI-85 — SCREEN E MANDATORY FIRST BLOCK ON FRIDAY SCANS (NEW S50)
Screen E (congressional and institutional signals — SI-73) must be the first item run in every Friday FULL SCAN, before position news sweep, before any other agenda item. It cannot be displaced by time pressure or competing priorities. If the Friday session is time-limited, Screen E is run first and other items are compressed. Origin: Screen E was not run in S50 due to time pressure — this is an error class, not an acceptable deferral. See S18.

### SI-86 — SGOV PERMANENTLY REMOVED FROM PLANNING
SGOV and all money market proxy positions are permanently excluded from fund planning. The fund mandate is opportunistic capital deployment. Cash held on IBKR earns adequate interest. Deploying to SGOV signals absence of ideas — the correct response to absent ideas is to hold cash and conduct better scanning, not to park in a yield proxy. If a session ends with cash and no conviction entries, cash is the correct position.

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
T52 LEU 15sh @~$191.90, stop $158.17. T34, P29 codified. CGCT hold through Factorial confirmed.

## S44 AMENDMENTS — Friday 15 May 2026
T35, P30, I16, SI-83, SI-84 codified. CRML +$230.38. ABVX +$550.95. CRM elevated to ACTIVE (conditional May 27 AMC). Warsh confirmed Fed Chair. CAPE 39.1x. Stagflation-adjacent macro.

## S45 AMENDMENTS — Saturday 16 May 2026
T55 SNPS +$12.20. T56 RR.L +$26.16. E30 codified. AVAV earnings corrected Jun 23. OKLO entry zone corrected.

## S47 AMENDMENTS — Monday 19 May 2026
Dropbox write protocol (permanent fix). E29 earnings date verification. E30 held position earnings monitoring. File write confirmation protocol.

## S50 AMENDMENTS — Friday 22 May 2026
**Trades:** IAU sold 175sh @$84.835 (-$205). IES 1,500sh sold @31.8p (+£211.65). Net combined +$78.04 USD.
**Stop updates:** IBM raised $219.78 → $229.88. ZETA raised $16.98 → $17.47.
**Watchlist:** BKNG elevated MONITORING → ACTIVE (conditional peace deal entry, 32sh, stop $148, R/R 7.4:1). INTU deferred to Jan 2027. ADBE, NOW, TTD added to UNIVERSE.
**CGCT/FAC:** Factorial Inc. confirmed as merger target. Auto-conversion to FAC on vote approval. Trust floor $9.50. P31 codified.
**Decisions:** SGOV permanently removed (SI-86). IAU exit on probability-weighted EV (T54, T58, E31 codified). CWR.L and ITM.L — DO NOT ENTER (already rerated).
**New lessons:** T54, T57, T58, E31, S18, P31, SI-85, SI-86.
**Kevin Warsh sworn in as Fed Chair 22 May 2026.** Rate hike probability 50-60%.
