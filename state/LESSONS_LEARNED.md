# LESSONS LEARNED — CLAUDE FUND
**Account:** U24936508 (IBKR Pro) | **Compiled through Session 40 FINAL (2026-05-11)**
**Journal version:** trading_journal54.jsx | **SIs:** 1–76

---

## ERROR TAXONOMY (SI-17) — 27 CODIFIED ERROR TYPES
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
| E21 | Commodity price staleness | Memory for commodity spot | Fastmarkets/Trading Economics/EIA only. State source + date |
| E22 | State media military claim | Iranian state media cited as military fact | CENTCOM/Western primary source required. Adversary media = unconfirmed until verified |
| E23 | EU energy scan omission | Core thesis sector not in formal scans despite repeated discussion | EU/UK energy transition is CORE THESIS. Section N MANDATORY in every full scan. CWR +989% = cost of this error. Codified as SI-67. |
| E24 | Session date drift | System prompt date used beyond session init; date inferred from prices instead of confirmed by user | System prompt date = session initialization only. **User statement is the authoritative override.** Never infer working date from price levels or news — only from explicit user confirmation or PC clock. See I8. |
| E25 | Prior-year financial report misidentification | Cited Q2 FY2024/25 NCH2 press release (published May 2025) as Q2 FY2025/26 current-year results. User placed real order. | Always verify BOTH company name AND fiscal year AND publication date when citing financial results. Prior-year press releases share identical URL patterns and titles. State the fiscal year explicitly in every citation. Never act on a result without confirming it is the current fiscal year. |
| E26 | GTC cancel lag | Recommendation to cancel IREN GTC given at 07:53 UAE on -9% premarket + $2B convertible news. NYSE opens 17:30 UAE — 9-hour window existed but order was not cancelled. Filled at $55.00. | Any GTC with >5% adverse premarket move on material news must be cancelled before NYSE open (17:30 UAE). See I16. |
| E27 | Session state day-of-week error | S39 session state labelled May 12 as "Monday" — it is Tuesday. NCH2 report consequently flagged for wrong day. | Always verify day-of-week independently. Never trust session state day labels without calendar check. |

---

## PERFORMANCE AUDIT
| Metric | S20 Baseline | S40 FINAL |
|--------|-------------|-----------|
| Net realized P&L (USD) | ~-$2,073 | ~+$716 (T40 R3NK -$136 added) |
| ITM programme realized | — | +$2,639 |
| Open unrealized | ~+$5,505 | +$3,249 |
| Net Liquidity | ~$102,800 | ~$104,200 |
| Positions | 14 | 22 active + 2 pending GTCs |
| Trades total | — | 44 rows (T40 closed T35, T41-T44 open) |

---

## THESIS & STRATEGY LESSONS

### T1 — Supply Chain Premium > War Premium
Structural damage persists under toll regime.

### T2 — Toll Regime vs Full Closure Distinction
Toll regime resumes non-oil shipments.

### T3 — Exit Trigger Discipline
SI-25 ONLY: formal PERMANENT Hormuz reopening + oil -10% from peak. Ceasefire alone insufficient.

### T4 — Cash Reserve is Tactical, Not Passive
Deployment triggers must fire. Cash above floor = deployable capital.

### T5 — Mythos Miss (S13)
AI model release caused PLTR -7%. Section K AI query NON-NEGOTIABLE every session.

### T6 — Target List Cross-Reference (S14)
Compare current price vs research reference price.

### T7 — Barbell Deployment Framework (S14)
Pool A (thesis-correlated, event-gated). Pool B (quality compounders). Never conflate.

### T8 — Short Attack Protocol (S16)
Named short seller report: DO NOT ENTER if watchlist.

### T9 — MSTR mNAV PREMIUM EXPANSION (AMENDED S35)
MSTR eligible as standalone when mNAV thesis documented. Kill: BTC weekly close <$70K.

### T10 — Thesis Is Not a Position Sizing Input
Thesis determines whether to enter. Stop distance determines how much.

### T11 — Winners Need Room Equal to Losers
Hold thesis-intact positions to primary target.

### T12 — ATH Entry Discipline (S19)
Never enter a war-premium stock at ATH with ceasefire expiry days away.

### T13 — Missed Opportunity Capture / SI-39 Genesis
GOOGL hit -20% drawdown with no protocol. SI-39 created.

### T14 — Limit Order Discipline Under Premarket Pressure
Never chase premarket. Hold the limit.

### T15 — Broken Thesis Exit Discipline
When PRIMARY thesis driver impaired + position within 5% of breakeven → EXIT AT MARKET on next open.

### T16 — SI-45 Weekly Screener Cannot Be Deferred
NFLX missed at -27.4% drawdown. SI-45 first session of every week, no exceptions.

### T17 — Conditional Reopening ≠ SI-25 Trigger
Verify via MarineTraffic and IRGC statements, not political statements.

### T18 — Geopolitical Position Management: Verify Before Exiting
12-hour window between submission and open enough for situation to reverse.

### T19 — ATH RULE IS THESIS-DEPENDENT
P13 is the DEFAULT rule. ATH + cheap multiple + earnings growth + contracted backlog → valid with reduced sizing.

### T20 — "NEXT NVIDIA" FRAMING CORRECTION
Frame: asymmetric optionality on genuine IP at reasonable valuation.

### T21 — Stop Review Triggers
Any position >8% gain with stop protecting <40% → mandatory review.

### T22 — Thesis Concentration Ceiling
Critical minerals: CRML + LAC + UUUU = maximum.

### T23 — Pre-Earnings Stop Management
No stop widening 48-72h before earnings. Accept the binary.

### T24 — Commercial Viability vs Strategic Necessity
Never use memory for commodity spot prices.

### T25 — RULE RIGIDITY VS THESIS CONVICTION (S35)
Rules exist to prevent specific errors, not to be applied mechanically regardless of context. When mechanical application contradicts intent, intent governs. Document override explicitly.

### T26 — TIER-1 COMPETITOR STRATEGIC INVESTMENT SIGNAL (S36, AMENDED S39)
When a direct competitor invests billions in another company via public SEC filing, it is disclosing private conviction in that company's strategic importance. Same-WEEK Stage 1 required (not same-session — urgency ≠ FOMO).

### T27 — DEEP TURNAROUND PATTERN RECOGNITION (S36)
Three-pattern convergence: >40% below ATH + 3+ consecutive guidance beats + improving revenue. Analysts' models are structurally stale. Re-rating coming. See SI-63, SI-66.

### T28 — STOP-OUT IS NOT THESIS BREAK (S36)
V stopped out at $321.823 on post-earnings positioning unwind, not fundamental deterioration. Stop was correct discipline. Fundamentals intact. Re-entry parameters: $305-315 zone, stop $292-295, do not chase back above exit price. Distinct from T15 (broken thesis exit).

### T29 — EU ENERGY TRANSITION IS CORE THESIS — SCAN OMISSION COST REAL RETURNS (S36)
CWR gained +989% over 12 months. Codified as SI-67, E23, and Section N.

### T30 — TACTICAL EXIT AND REBUY ON THESIS-INTACT NAMES (S37)
Selling a thesis-intact position on broad macro noise and immediately placing a GTC rebuy at a better level is valid capital efficiency. Requirements: (a) thesis intact and documented, (b) rebuy placed concurrently, (c) rebuy improves cost basis, (d) stop placed immediately.

### T31 — STOP PLACEMENT ON NAMES 40%+ BELOW ATH (S40)
**Origin:** R3NK T35 stopped at €47.010 because stop at €47 sat €1.03 ABOVE the 52W low of €45.97. The stop was triggered on a normal test of annual support, not a fundamental breakdown.
**Rule:** When a position is already 40%+ below its ATH, stop placement must use the 52W low as the structural reference point. The stop belongs BELOW the 52W low (if SI-35 budget allows) — not above it. A mechanical entry-minus-% stop on a high-range stock is structurally too tight.
**Application:** R3NK T41 rebuy: stop set at €44.00 (€1.97 below 52W low €45.97). Position sized to use full SI-35 budget at that stop distance.
**Override check:** Always verify that SI-35 budget permits a stop below the 52W low before applying this rule. If it does not, reduce position size, not the stop quality.

---

## POSITION-SPECIFIC LESSONS

### P1 — CWR.L UPDATED (S36)
Do not enter at current levels (~739p). Watch at 500p. See T29 and SI-67.

### P2 — Linde Thesis Weakened
Toll regime resumes helium.

### P3 — IAG.L Closed Correctly
Sold after peace dividend thesis broken.

### P4 — ABVX Risk Profile (Updated S36)
Royalty buyback: sophisticated investors took equity at $111.57. Hold 50sh, stop $109.93, maximum room strategy.

### P5 — SHLD Stop/Sell Sequence Error
Cancel GTC stop FIRST, then sell.

### P6 — PLTR Entry Without Catalyst
P6 test required before any momentum/narrative entry. PLTR SI-61 DORMANT Q2 July.

### P7 — AVAV Entry History
Re-entry S35: 15sh @$185.067, stop $155. June 30 Q4 gate.

### P8 — ITM Stop Discrepancy
IBKR is ground truth on stop prices always.

### P9 — AMZN Stop Mechanics
Major US liquid stocks use SIMPLE stops only. Stop-limit reserved for volatile/EU/UK small-mid caps.

### P10 — ITM Breakout Protocol Supersession
Apply the MORE protective stop when current exceeds protocol target.

### P11 — Re-Entry Below Stop-Out Price (REVISED S35)
Re-entry permitted within 5% of stop-out level when thesis intact/strengthened.

### P12 — KTOS Sizing Error
Use SI-35 dollar-risk sizing.

### P13 — No Entry Near 52-Week Highs Without Catalyst
Amendment per SI-48: narrow exception for AI infrastructure thesis where valuation defensible.

### P14 — CODA Stop Intentional Below Journal Level
Do not "correct" intentional stops placed for catalyst timing.

### P15 — ORCL Entry Timing
Active legal filing = mandatory waiting period.

### P16 — ISRG Stop Journal Staleness
Any stop raise on IBKR must be logged same session.

### P17 — PATK M&A Tip Entry Error
No entry on M&A play until: target analysed, deal terms logged, joint decision confirmed.

### P18 — Orphaned Buy Order Risk
Confirm BOTH legs cancelled individually.

### P19 — AI THESIS CROWDED TRADE OBSERVATION
Edge from anomalous valuations, drawn-down specialists, and SI-37-sized speculations.

### P20 — Stop Protection Percentage Review (AMENDED S39)
Formula: cost + ((current − cost) × 0.50) minimum. A stop below cost basis is never acceptable.
Activation: P20 only applies once position is >10% in profit. Below 10%: entry-based technical level. 10-20%: P20 minimum but stop ≥5% below current. >20%: full P20 applies.

### P21 — Critical Minerals Speculative Classification
Pre-production positions = strategic asymmetry with defined kill switch.

### P22 — MSTR mNAV ENTRY THESIS
Entry 15sh @$181.07. Scale: BTC >$85K. Kill: BTC <$70K weekly. CLARITY Act May 14 markup = gate event.

### P23 — UUUU PRE-EARNINGS ENTRY
Q1 FY2026: revenue $36M (2x YoY), FIRB cleared, ASM ~Jul 2026. SI-37 cap $1,500; $1,100 deployed.

### P24 — V STOP-OUT AND RE-ENTRY PARAMETERS (S36)
Stopped @$321.823. Re-entry: $305-315 zone only. Q3 FY2026 earnings July 28.

### P25 — NCH2 STAGE 2 GATE
Stage 2 analysis complete. Gate: Q2 FY2025/26 order intake >€150M — CLEARED at €316M. Full H1 report May 12 at 09:00 UAE. Read before entry. EBIT -€65M and US pilot cancellation require assessment.

### P26 — R3NK CONVICTION SIZING (S40)
T41: 200 shares (vs 25 in T35). Full SI-35 budget deployed. Stop below 52W low per T31. When thesis is intact, fundamentals are strong, and entry is below analyst floor — size accordingly. Undersizing a conviction thesis (T35 was 27% of SI-35 budget) fails to capture the return when the thesis plays out.

### P27 — IREN ENTRY GATE BREACH (S40)
T42: GTC filled at $55.00 despite gate condition (stabilise above $58 at Monday open) not being met. $2B convertible notes and 4th consecutive revenue miss were new material information identified pre-market. Gate breach was known; fill happened because cancel window was not used. Position is small (SI-37, 24sh, max loss $73). Thesis long-term intact (NVIDIA $3.4B deal). Hold to stop. Do not add.

---

## SCAN PROTOCOL LESSONS

### S1 — Full Scan = SI-14 Sections 0, A-K, N (v5.0)
Section 0 (SI-39) runs FIRST. SI-45 weekly (first session of week). SI-65 Milestone Calendar (first session of month). Section N (EU Energy Transition) quarterly + thesis-triggered.

### S2 — Journal Rebuild: bracket-depth counting Node.js.
### S3 — Congressional Trading: broad sweep ALL stocks >$50K + sector clustering.
### S4 — Source Quality: Apify + web search in parallel for geopolitical news.
### S5 — GOOGL Missed at $280. SI-39 Section 0 fires every session.
### S6 — AMZN Pre-Execution: check IBKR orders screenshot FIRST.
### S7 — Challenge Register Protocol.
### S8 — Premarket Price Verification. MMD for current price.
### S9 — EOD API Failure Fallback. MMD prev close + web search for 52wk range.
### S10 — Primary Source Verification for Binary Event Dates.
### S11 — SI-45 Non-Deferral Rule. First session of every week, mandatory.
### S12 — THESIS-DEDICATED RESEARCH FILES. For multi-session thesis: `research/<THESIS>_THESIS.md`.
### S13 — COMMODITY PRICE VERIFICATION. State price, source, date explicitly.
### S15 — PRIMARY SOURCE DISCIPLINE. Always verify FY and publication date of financial reports (E25). Earnings dates from primary source only.
### S16 — CWR SCAN OMISSION (S36). SI-67 Section N mandatory every full scan.
### S17 — STAGE 2 GATE COMPLETENESS. Gates must include clause: no material guidance revision since Stage 2 authorisation.

---

## INFRASTRUCTURE LESSONS

### I1 — Local Filesystem MCP (UPDATED S37)
Primary path: `C:\Users\James Cadbury\Dropbox\Claude-Fund`
Subdirectories: journal\, state\, research\, tracker\

### I2 — Google Drive DEPRECATED

### I3 — Session Open Protocol (SI-32) v5.0
1. Read FUND_SESSION_STATE.md | 2. Read LESSONS_LEARNED.md | 3. Check journal lastUpdated
4. SI-47: State today's date | 5. IBKR screenshots | 6. Section 0 SI-39 | 7. SI-45 weekly
8. SI-65 monthly | 9. SI-14 scan A-K | 10. Section N | 11. Check research/ pending tasks

### I4 — Session Close Protocol (SI-28)
Write journal + state .md files. Wait for final IBKR screenshots (SI-68).

### I5 — Journal versioning
trading_journal54.jsx = current (Session 40 FINAL — 11 May 2026)

### I6 — Memory Hierarchy (SI-33)
Journal → FUND_SESSION_STATE → LESSONS_LEARNED → research/*.md → Trade Tracker

### I7 — Trade Tracker Status (S40 FINAL)
44 trade rows. T40 closed T35 R3NK. T41 R3NK, T42 IREN, T43 ZETA, T44 PATH open. T39 PYPL open.

### I8 — Date Verification (AMENDED S37)
System prompt date = session initialization only. User explicit statement is the AUTHORITATIVE override. Never infer working date from prices or news. See E24, E25.

### I9 — DAY Orders Require Pre-Open Review.

### I10 — RESEARCH FILE LOCATIONS
- `research/CRITICAL_MINERALS_THESIS.md`
- `research/EU_ENERGY_TRANSITION_THESIS.md`
- `research/RULES_FRAMEWORK.md`
- `research/SCANNING_FRAMEWORK.md`

### I11 — Direct Dropbox Write Confirmed.

### I12 — EXCHANGE HOLIDAY PROTOCOL. Check exchange holidays every session.

### I13 — SESSION CLOSE TIMING (SI-68). Wait for final screenshots before writing.

### I14 — STOP-LIMIT RULE. Simple stops for major US liquid names. Stop-limit for volatile/EU/UK small-mid only.

### I15 — EOD EXTENDED QUOTES CONFIRMED WORKING (S40)
EOD:get_us_live_extended_quotes returns live prices, 52W range, PE, market cap for up to 15 tickers in one call. E11 (52W hallucination) is structurally solved. Call at every session open for full position sweep.

### I16 — GTC CANCEL PROTOCOL ON ADVERSE PREMARKET (S40)
If premarket shows >5% adverse move on material news (earnings miss, dilution announcement, guidance cut), the GTC entry order MUST be cancelled before NYSE open (17:30 UAE). The UAE timezone provides up to 9 hours between pre-market news and NYSE open — this is the cancel window. Do not wait for confirmation; cancel first, reassess after. See E26.

---

## STANDING INSTRUCTION REFERENCE

### SI-25 — EXIT TRIGGER (DUAL CONDITION)
Condition 1: PERMANENT Hormuz reopening. Condition 2: WTI -10% from peak ($105.87).
Current: Condition 1 UNMET. WTI ~$95. Thesis intact.

### SI-35 — DOLLAR-RISK SIZING. Max loss per trade = $500.

### SI-37 — SPECULATIVE POSITION CAP. Max $1,500. UUUU $1,100/$1,500. LAC pending. IREN $1,321/$1,500.

### SI-39 — DRAWDOWN SCREENER. -15% to -20% from 52wk ATH. Every session.

### SI-45 — WEEKLY SCREENER. First session every week. Non-deferrable.

### SI-47 — DATE PROTOCOL. State today's date explicitly. Step zero.

### SI-48 — AI THESIS ATH RULE AMENDMENT. Narrow exception for AI infrastructure.

### SI-61 — SHORT WATCHLIST. PLTR dormant Q2 July. AAL watch. CCL watch. SNOW watch.

### SI-62 — TIER-1 STRATEGIC INVESTMENT MONITOR. Weekly SEC EDGAR.

### SI-63 — DEEP TURNAROUND SCREEN. Monthly.

### SI-64 — GOVERNMENT/NATIONAL SECURITY ASSET MONITOR. Quarterly + event-driven.

### SI-65 — TECHNOLOGY MILESTONE CALENDAR. Monthly review.

### SI-66 — NEW CEO CREDIBILITY PATTERN. Quarterly.

### SI-67 — EU/UK ENERGY TRANSITION SCAN — SECTION N
Frequency: First session each month + Hormuz/EU energy news sessions.
Ceiling: 4 positions max. Current: RR.L (1/4). NCH2 Stage 2 done — gate May 12 H1 report.

### SI-68 — JOURNAL CLOSE TIMING. No files until user confirms session complete with final screenshots.

### SI-69 — MONTHLY RULE REVIEW. First session each month. Test/question/sunset rules.

### SI-70 — SESSION ZERO PROTOCOL. Position news sweep + insider filing check + top movers + commodity prices via API.

### SI-71 — WEEKLY SECTION L. Earnings revision tracker. First session each week.

### SI-72 — WEEKLY SECTION M. Options put-call ratio and volume-to-OI across thesis universe.

### SI-73 — WEEKLY SECTION O. 13D/13G significant stake radar (EDGAR + web search).

### SI-74 — MONTHLY BULK FUNDAMENTAL SCREEN. EOD:get_bulk_fundamentals LSE + NASDAQ.

### SI-75 — MONTHLY EARNINGS CALL TRANSCRIPT ANALYSIS. Alpha:EARNINGS_CALL_TRANSCRIPT on pipeline candidates.

### SI-76 — PIPELINE DISCIPLINE. Maintain 3-5 Stage 2, 8-10 Stage 1, 15-20 Watch at all times.

---

## 52-WEEK DATA PROTOCOL
- **Current price (US):** EOD:get_us_live_extended_quotes (confirmed working S40) or MMD
- **52-week high/low:** EOD:get_us_live_extended_quotes — NEVER from memory
- **EU/UK:** Stockopedia or Investing.com
- **Commodity prices:** Fastmarkets / Trading Economics / EIA — state source + date

---

## PROHIBITED DATA SOURCES
- GuruFocus, PitchBook, Macroaxis
- EODHD earnings endpoint (403 error)
- Memory for 52-week range, commodity spot prices, or earnings dates
- EODHD lastTradePrice for current session
- Web search for live prices during market hours (E20)
- Trump Truth Social for geopolitical fact confirmation
- Iranian/adversary state media without CENTCOM verification (E22)
- McPhy Energy (ALMCP.PA) — IN LIQUIDATION
- Lhyfe (LHYFE.PA) — bankruptcy trajectory
- Prior-year financial press releases cited as current-year without verifying publication date (E25)

---

## S39 AMENDMENTS — Saturday 9 May 2026

### RULES FRAMEWORK ESTABLISHED
Full tier classification written to research/RULES_FRAMEWORK.md. Three tiers: HARD, STRONG GUIDANCE, CONTEXTUAL. T25 is governing meta-rule.

### P20 AMENDMENT (S39)
Activation threshold added. P20 only applies once position is >10% in profit.

### ATH ENTRY RULE CONSOLIDATED (S39)
T12, T19, SI-48 consolidated into single principle in RULES_FRAMEWORK.md.

### T26 AMENDED (S39)
Same-WEEK Stage 1 (not same-session).

### NEW STANDING INSTRUCTIONS (S39)
SI-69 through SI-76 added. See above.

### S39 STOP CHANGES
- MSFT: $411.96 → $403.89 | CCJ: $114.21 → $112.14 | IBM: $208.00 → $210.08 | CODA: $10.90 → $9.95

---

## S40 AMENDMENTS — Monday 11 May 2026

### NEW TRADES
- T40: R3NK SELL 25sh @€47.010 (stop). T35 closed. Loss ~-$136.
- T41: R3NK BUY 200sh @€46.461. T31 applied. Stop €44.00. Conviction sizing.
- T42: IREN BUY 24sh @$55.042. Gate breach noted. SI-37. Stop $52.
- T43: ZETA BUY 191sh @$16.866. Stop $14.50.
- T44: PATH BUY 320sh @$10.726. Stop $9.20.

### STOP CHANGES (S40)
- AMZN: $259.88 → $263.93 (proximity to 52W high $278.56)

### NEW LESSONS CODIFIED
- **T31:** Stop placement on 40%+ below ATH names — 52W low is the structural reference. See full entry above.
- **P26:** R3NK conviction sizing principle. See full entry above.
- **P27:** IREN gate breach. See full entry above.
- **E26:** GTC cancel lag. See error taxonomy above.
- **E27:** Session state day-of-week error. See error taxonomy above.
- **I15:** EOD extended quotes confirmed working.
- **I16:** GTC cancel protocol on adverse premarket moves.

### KEY INTELLIGENCE (S40)
- CLARITY Act: Senate Banking Committee markup Thursday May 14. BTC $80K, MSTR scale gate $85K.
- NCH2 H1 report: Tuesday May 12 at 09:00 UAE. Gate met (€316M). EBIT -€65M needs assessment.
- Iran: Trump rejected counter-offer. Thesis intact. SI-25 Condition 1 unmet.
- LDO: €50.66 vs stop €50.00 — extremely thin. If stops, do not re-enter without compelling new catalyst.
- R3NK: T41 pending SI-35 compliance — raise stop to ≥€44.20 on first meaningful bounce.
