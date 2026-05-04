# LESSONS LEARNED — CLAUDE FUND
**Account:** U24936508 (IBKR Pro) | **Compiled through Session 35 (2026-05-04)**
**Journal version:** trading_journal50.jsx | **SIs:** 1–48

---

## ERROR TAXONOMY (SI-17) — 21 CODIFIED ERROR TYPES
| # | Error | Description | Prevention |
|---|-------|-------------|-----------|
| E1 | Timezone | Wrong open/close times | NY=UTC-4, UAE=UTC+4. 17:30 UAE=09:30 NY open. LSE=11:00-19:30 UAE (BST). AMC earnings print after 00:00 UAE — stop inactive until 17:30 UAE next session |
| E2 | Stale position | Using journal prices vs IBKR | IBKR screenshot = ground truth always |
| E3 | Fill re-flag | Flagging executed orders as pending | Check IBKR fills before action items |
| E4 | Price verification | Acting on unverified prices | MMD primary, EODHD extended quotes for 52wk range |
| E5 | Market timing | Acting outside hours | LSE closes 19:30 UAE, NYSE 00:00 UAE |
| E6 | Dividend capture | Selling before ex-div | Hard lock on ex-div date confirmed from primary source |
| E7 | Session discipline | Thesis drift in fatigue | Re-read SI-25 before late-session trades |
| E8 | Stale quote | Using stale quote as live | Live price check mandatory before execution |
| E9 | GTC orphan | GTC stop persists after market sell — unintended short | Cancel stop BEFORE market sell or IMMEDIATELY on fill confirmation |
| E10 | Closed position scan | Closed position in live scan with active stop | Cross-reference SI-19 + positions[] before any scan table |
| E11 | 52-week high hallucination | Stating 52wk range from memory | MANDATORY: use EOD:get_us_live_extended_quotes. Memory forbidden |
| E12 | Tool routing gap | Not knowing which tool provides which data | MMD=current price. EODHD extended=52wk range. Never conflate |
| E13 | EODHD price delay | EODHD lastTradePrice may be 4-6 days stale | Use MMD for current session price |
| E14 | Journal date discrepancy | Key event dates wrong in journal | Cross-reference 2+ primary news sources before acting |
| E15 | Exchange holiday blind spot | Assuming market open without checking calendar | Check exchange-specific holiday calendar before stating stops are active |
| E16 | Stop staleness on winner | Stop not raised as position appreciates — drift below cost basis | Review all stops >2 sessions old when position >10% above cost. T28 |
| E17 | Post-earnings entry implicit trade | Fill day before earnings creates earnings trade without explicit decision | Flag at fill — P24. Make explicit pre-earnings decision session close |
| E18 | Congressional scan narrow | Only cross-referencing held names, missing large filings in other names | Three-layer scan: all large transactions → held-name sweeps → committee intelligence |
| E19 | False CRITICAL flag | Flagging stopped-out position as live alert | Mandatory three-step reconciliation: check positions[], closed trades log, orders tab |
| E20 | Live price contradiction | Using web search to contradict IBKR live price during market hours | IBKR TWS is ONLY authoritative source during NYSE/LSE hours. Web search = stale. No exceptions |
| E21 | Commodity price staleness | Using memory or old data for commodity spot price in thesis analysis | Verify from primary source (Fastmarkets, Trading Economics, SMM, EIA) before stating. Memory forbidden for commodity prices |

---

## PERFORMANCE AUDIT
| Metric | S20 Baseline | S35 Update |
|--------|-------------|-----------|
| Net realized P&L (USD) | ~-$2,073 | ~+$936 (IBKR 30-day tab) |
| ITM programme realized | — | +$2,639 (3 trims) |
| Open unrealized | ~+$5,505 | +$4,690 |
| Net Liquidity | ~$102,800 | $105,700 |
| Positions | 14 | 21 active + 3 pending GTCs |
| Trades closed total | — | 31 (no new closes S35) |

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
**ORIGINAL:** Direct spot BTC via IBKR Paxos preferred over leveraged BTC proxy.
**AMENDED S35:** MSTR eligible as standalone position when specific mNAV premium-expansion thesis is documented. Separate BTC spot account held externally makes MSTR a distinct vehicle. Thesis requires: (1) documented mNAV at entry, (2) BTC price appreciation path, (3) premium mean-reversion justification, (4) quarterly Bitcoin Yield monitoring. Kill condition: BTC weekly close below $70K.

### T10 — Thesis Is Not a Position Sizing Input (S16)
Thesis determines whether to enter. Stop distance determines how much.

### T11 — Winners Need Room Equal to Losers (S16)
Hold thesis-intact positions to primary target.

### T12 — ATH Entry Discipline (S19)
Never enter a war-premium stock at ATH with ceasefire expiry days away.

### T13 — Missed Opportunity Capture / SI-39 Genesis (S19)
GOOGL hit -20% drawdown with no protocol. SI-39 created.

### T14 — Limit Order Discipline Under Premarket Pressure (S19)
Never chase premarket. Hold the limit.

### T15 — Broken Thesis Exit Discipline (S20)
When PRIMARY thesis driver impaired by confirmed new datapoint + position within 5% of breakeven → EXIT AT MARKET on next open.

### T16 — SI-45 Weekly Screener Cannot Be Deferred (S23)
NFLX missed at -27.4% drawdown. SI-45 first session of every week, no exceptions.

### T17 — Conditional Reopening ≠ SI-25 Trigger (S23)
Iran opened Hormuz conditionally Friday Apr 17 — closed again Saturday Apr 18. Ceasefire-linked opening is not a permanent reopening. Verify against MarineTraffic data and IRGC statements, not political statements.

### T18 — Geopolitical Position Management: Verify Before Exiting (S24)
When exiting a position on geopolitical news, verify the news is stable before the order executes. The 12-hour window between after-hours submission and market open is enough for the entire situation to reverse. For DAY market orders, review at session open before fill.

### T19 — ATH RULE IS THESIS-DEPENDENT (S24)
P13 is the DEFAULT rule. ATH + expensive multiple + multiple expansion required → REJECT (P6). ATH + cheap multiple + earnings growth path + contracted backlog → potentially valid with reduced sizing. See SI-48.

### T20 — "NEXT NVIDIA" FRAMING CORRECTION (S24)
Correct frame is asymmetric optionality on genuine IP at reasonable valuation. Question: "Does this company have IP that becomes instrumental AND is the market mispricing the optionality?"

### T21 — Stop Review Triggers (S33/S34)
Winning positions require active stop management as they appreciate. Any position with unrealised gain >8% and stop protecting <40% of that gain triggers a mandatory stop review. Raise to protect minimum 50% of unrealised gain.

### T22 — Thesis Concentration Ceiling (S34)
When a single macro thesis generates multiple attractive names, correlation means adding all amplifies rather than diversifies. Set an explicit ceiling per thesis and enforce it. Critical minerals ceiling: CRML + LAC + UUUU = maximum.

### T23 — Pre-Earnings Stop Management
Do not widen stops in the 48-72 hours before earnings. Accept the binary outcome with existing protection. T23 window opens 48-72h before earnings — flag at session open, no changes permitted until post-print.

### T24 — Commercial Viability vs Strategic Necessity (S34)
For commodity-linked thesis analysis, the difference between "commercially viable" and "state-propped" can be a single commodity price input. Never use memory for commodity spot prices — always verify from primary source before forming commercial viability conclusions.

### T25 — RULE RIGIDITY VS THESIS CONVICTION (NEW S35)
**ORIGIN:** NOG P11 gate at $26.47 vs price $26.70. Repeated mechanical application of a 0.86% gap rule caused consistent missed re-entries while thesis was strengthening in real time (Iran warship attack).
**LESSON:** Rules exist to prevent specific errors, not to be applied mechanically regardless of context. P11 was designed to prevent chasing a bounce on a broken thesis — not to prevent re-entry on a 23-cent gap when a warship has just been struck. When the rule's application directly contradicts its intent, the intent governs. Document the override explicitly and apply consistently.
**APPLICATION:** P11 revised to 5% flexibility band. Any other rule where mechanical application contradicts intent requires explicit documentation of the override rationale before acting.

---

## POSITION-SPECIFIC LESSONS

### P1 — CWR.L Momentum Trap
Entry only at 250-270p with confirmed re-rating.

### P2 — Linde Thesis Weakened
Toll regime resumes helium.

### P3 — IAG.L Closed Correctly
Sold after peace dividend thesis broken.

### P4 — ABVX Risk Profile (Updated S35)
Re-entered 50sh @$109.89 (S29). Stop $109.93 (4¢ above cost — M&A strategic exception, not P20 compliance). Thesis: ABVX confirmed most likely biotech acquisition target 2026 per Truist survey. Strategy: maximum room for takeout premium bid. No P20 obligation on M&A holdout positions where thesis is binary event, not price appreciation.

### P5 — SHLD Stop/Sell Sequence Error (S14)
Cancel GTC stop FIRST, then sell. Never reverse sequence.

### P6 — PLTR Entry Without Catalyst (S16)
Presidential Truth Social post is not a catalyst. Realised loss -$1,307. Governs all entries where thesis depends on narrative momentum or multiple expansion. PLTR now on SI-61 short watchlist.

### P7 — AVAV Entry History
First entry S20: 25sh @$195.09, closed $197.945 (+$71.38). Re-entry S35: 15sh @$185.067, stop $155. 52-week ATH $417.86, drawdown -55.7% from ATH at re-entry. Stage 2 gate: June 30 Q4 FY2026 — record revenue + margin recovery confirmation. Second tranche (+8sh) authorised on positive Q4 print.

### P8 — ITM Stop Discrepancy
IBKR is ground truth on stop prices always.

### P9 — AMZN Stop Limit Gap Mechanics
Stop Limit structure: trigger + limit floor $224 provides execution guarantee on gap opens for high-value stocks.

### P10 — ITM Breakout Protocol Supersession
Apply the MORE protective stop when current exceeds protocol target.

### P11 — Re-Entry Below Stop-Out Price (REVISED S35)
**Original:** Re-entry only after price pulls back strictly below stop-out level.
**Revised S35:** Re-entry permitted within 5% of stop-out level when thesis is intact OR materially strengthened. Requirements: (1) explicit conviction statement, (2) stop at or below original stop-out level, (3) thesis assessment documented. The 5% band removes mechanical precision that served no risk management purpose.

### P12 — KTOS Sizing Error (S16)
Use SI-35 dollar-risk sizing.

### P13 — No Entry Near 52-Week Highs Without Catalyst (S16)
Do not enter within 5% of ATH without confirmed catalyst. AMENDMENT per SI-48: narrow exception for AI infrastructure thesis where valuation is defensible.

### P14 — CODA Stop Intentional Below Journal Level (S19)
Do not "correct" stops that are intentionally placed for catalyst timing.

### P15 — ORCL Entry Timing (S19)
Active legal filing = mandatory waiting period.

### P16 — ISRG Stop Journal Staleness (S20)
Any stop raise executed on IBKR must be logged in journal SAME SESSION.

### P17 — PATK M&A Tip Entry Error (S23)
No entry on any M&A play until: (1) target fully analysed, (2) deal terms/probability/R:R logged, (3) joint entry decision confirmed. A tip is not a thesis.

### P18 — Orphaned Buy Order Risk (S24)
When cancelling a bracket order (buy + stop), explicitly confirm BOTH legs show "Cancelled" status in IBKR orders tab individually. An order showing "Pending" is not cancelled.

### P19 — AI THESIS CROWDED TRADE OBSERVATION (S24)
Edge comes from anomalous valuations (MU fwd PE 7.9), drawn-down specialists with intact thesis, and pure-speculation sized per SI-37. Do not chase obvious picks-and-shovels at ATH without SI-48 justification.

### P20 — Stop Protection Percentage Review (S34/S35)
**FORMULA:** Adequate stop = cost + ((current − cost) × 0.50) minimum.
**REVIEW TRIGGER:** Any position with unrealised gain >8% and stop protecting <40% of that gain.
**EXCEPTION:** M&A holdout positions (ABVX) where binary event thesis makes price-appreciation-based stop management inapplicable. Document exception explicitly.
**S35 APPLICATIONS:** CRML P20 violation found and corrected ($10.51→$11.50). MRVL P20 violation found and corrected ($135→$158.73). CODA below P20 minimum — deliberate on thesis day, must raise next session.

### P21 — Critical Minerals Speculative Classification (S34)
Pre-production or pre-transformation positions classified as "National Security Infrastructure" — held for strategic asymmetry with defined kill switch, not near-term EBITDA. Kill switches must be explicit.

### P22 — MSTR mNAV ENTRY THESIS (NEW S35)
**ORIGIN:** BTC breaks $80K ceiling May 4. MSTR at mNAV ~0.96x (essentially at asset value) with historical bull-phase premium 1.25-2.5x.
**LESSON:** MSTR's value as a trade is not the BTC exposure per se (separate account handles that) but the premium expansion that occurs when retail and institutional capital floods into BTC-adjacent equities. Two compounding variables: (1) BTC price appreciation, (2) mNAV premium reconstruction. Both must be present for the thesis to work.
**SIZING DISCIPLINE:** High beta (1.96). Scale into confirmed strength rather than front-loading. Entry 15sh @$181.07, scale-up gate BTC >$85K confirmed close.
**MONITORING:** Bitcoin Yield metric quarterly. If Yield negative = dilution outpacing BTC accumulation = exit signal regardless of BTC price.

---

## SCAN PROTOCOL LESSONS

### S1 — Full Scan = SI-14 Sections 0, A-K (v4.0)
Section 0 (SI-39) runs FIRST. SI-45 weekly screener runs first session of each week.

### S2 — Journal Rebuild: bracket-depth counting Node.js.

### S3 — Congressional Trading: broad sweep ALL stocks >$50K.

### S4 — Source Quality: Apify + web search in parallel for geopolitical news.

### S5 — GOOGL Missed at $280 (S19 origin). SI-39 Section 0 now fires every session.

### S6 — AMZN Pre-Execution: check IBKR orders screenshot FIRST.

### S7 — Challenge Register Protocol (S16).

### S8 — Premarket Price Verification (S19). Always use MMD for current price.

### S9 — EOD API Failure Fallback (S20). MMD prev close + web search for 52wk range.

### S10 — Primary Source Verification for Binary Event Dates (S20).

### S11 — SI-45 Non-Deferral Rule (S23). First session of every week, mandatory.

### S12 — THESIS-DEDICATED RESEARCH FILES (S24)
For any multi-session research thesis with 10+ candidates, create `research/<THESIS>_THESIS.md`.

### S13 — COMMODITY PRICE VERIFICATION (S34)
Before stating any commodity price, pull from primary source. State price, source, and date explicitly.

### S14 — SI-45 WEEKLY SCREENER OUTPUT S35
**LMT:** -25.9% drawdown, fwd PE 17.2x, $186.4B backlog, PAC-3/THAAD production ramp. Stage 2 complete — GTC $512.96 / stop $465 submitted. Q2 July catalyst (FCF recovery + backlog stabilisation).
**AVAV:** -55.7% drawdown from ATH, funded backlog $1.1B +51% YoY, book-to-bill 1.6. Filled S35 @$185.067. June 30 Q4 gate.
**AI infrastructure SI-39 screener:** ZERO new triggers — all names at or above ATH from S24 baseline.

---

## INFRASTRUCTURE LESSONS

### I1 — Local Filesystem MCP
READ AND WRITE ACCESS CONFIRMED S19-S35.
Allowed paths: `C:\Users\jcadb\claude-fund`
Subdirectories: journal\, state\, research\

### I2 — Google Drive DEPRECATED

### I3 — Session Open Protocol (SI-32)
1. Read FUND_SESSION_STATE.md | 2. Read LESSONS_LEARNED.md | 3. Check journal lastUpdated
4. **SI-47: State today's date explicitly** | 5. IBKR screenshots | 6. Section 0 EOD batch | 7. SI-45 weekly (first session of week) | 8. SI-14 scan A-K
9. If any active thesis file in `research/` directory, check for pending Stage 2 tasks

### I4 — Session Close Protocol (SI-28)
1. Build session-close block | 2-4. Write journal + .md files to C drive
5. Update hormuz_log.md | 6. Update trade tracker if fills | 7-10. User actions.

### I5 — Journal versioning
trading_journal50.jsx = current (Session 35 — 4 May 2026)

### I6 — Memory Hierarchy (SI-33)
Journal → FUND_SESSION_STATE → LESSONS_LEARNED → research/*.md → Trade Tracker

### I7 — Trade Tracker Status (S35)
31 total closed trades. No new closes S35. All in trading_journal50.jsx tradeTracker.

### I8 — Date Verification Is Step Zero (S24)
System prompt date is the ONLY authoritative source. Non-negotiable.

### I9 — DAY Orders Require Pre-Open Review (S24)
DAY market orders submitted after hours must be reviewed at session open before fill.

### I10 — RESEARCH FILE LOCATIONS
- `research/AI_INFRASTRUCTURE_THESIS.md` — AI infrastructure Stage 1 candidates
- `research/CRITICAL_MINERALS_THESIS.md` — Critical minerals Stage 2: UUUU, LAC

### I11 — Direct C Drive Write Confirmed (S19-S35)

### I12 — EXCHANGE HOLIDAY PROTOCOL (S34)
Check exchange-specific holidays before every session. LSE closed Mon May 4 — RR.L stop inactive.

---

## STANDING INSTRUCTION REFERENCE

### SI-25 — EXIT TRIGGER (DUAL CONDITION)
Both conditions must be simultaneously met:
1. PERMANENT Hormuz reopening confirmed (not conditional, not ceasefire-linked)
2. WTI -10% from $117.63 peak = $105.87

Current status: Condition 1 UNMET. Condition 2 price threshold was breached Friday $101.94 but Iran warship attack Monday restored WTI to ~$106. Both conditions remain unmet. Thesis intact.

### SI-35 — DOLLAR-RISK SIZING
Maximum loss per trade = $500. Working backwards from stop distance determines share count. Never size to a dollar amount — size to a risk amount.

### SI-37 — SPECULATIVE POSITION CAP
Maximum $1,500 cost for speculative (pre-revenue / pre-production) positions. LAC = SI-37 classified.

### SI-39 — DRAWDOWN SCREENER (SECTION 0)
SI-39 triggers at -15% to -20% drawdown from 52-week ATH for quality compounders. Runs every session as Section 0. Current: zero active triggers across AI infrastructure watchlist (all names at or above S24 ATH baselines).

### SI-47 — DATE PROTOCOL
State today's date explicitly from system prompt before any analysis. Non-negotiable. Step zero.

### SI-48 — AI THESIS ATH RULE AMENDMENT
SCOPE: AI infrastructure thesis only. Entry near ATH permitted if all four tests pass:
1. Valuation reasonable (fwd PE below sector median OR PEG < 1.5)
2. Structural catalyst path (contracted backlog/LTAs)
3. No multiple expansion required
4. PLTR P6 test passed

### SI-61 — SHORT WATCHLIST
- PLTR: 108x fwd PE. Reports tonight (Mon May 4 AMC). Only short on guidance cut. P23 test required.
- AAL: No fuel hedging, $36.5B debt. Entry on dead-cat bounce $13-14. WTI must stay >$100.

---

## 52-WEEK DATA PROTOCOL
- **Current price (US):** MMD /v2/aggs/ticker/{TICKER}/prev
- **52-week high/low:** EOD:get_us_live_extended_quotes
- **EU/UK:** Stockopedia or Yahoo Finance
- **Commodity prices:** Fastmarkets / Trading Economics / EIA — primary source with date
- **NEVER use memory for 52-week range or commodity prices**

---

## PROHIBITED DATA SOURCES
- GuruFocus, PitchBook, Macroaxis
- EODHD earnings endpoint (403 error)
- Memory for 52-week range, commodity spot prices, or earnings dates
- EODHD lastTradePrice for current session
- Web search for live prices during market hours (E20) — IBKR TWS only
- Trump Truth Social posts for geopolitical fact confirmation
