# LESSONS LEARNED — CLAUDE FUND
**Account:** U24936508 (IBKR Pro) | **Compiled through Session 36 FINAL (2026-05-05)**
**Journal version:** trading_journal51.jsx | **SIs:** 1–68

---

## ERROR TAXONOMY (SI-17) — 23 CODIFIED ERROR TYPES
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
| E9 | GTC orphan | GTC stop persists after market sell | Cancel stop BEFORE market sell or IMMEDIATELY on fill confirmation |
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

---

## PERFORMANCE AUDIT
| Metric | S20 Baseline | S36 FINAL |
|--------|-------------|-----------|
| Net realized P&L (USD) | ~-$2,073 | ~+$1,054 (IBKR 30-day incl. V +$117.58) |
| ITM programme realized | — | +$2,639 |
| Open unrealized | ~+$5,505 | +$4,475 |
| Net Liquidity | ~$102,800 | ~$105,600 |
| Positions | 14 | 22 active + 2 pending GTCs |
| Trades closed total | — | 32 (V stopped out S36) |

---

## THESIS & STRATEGY LESSONS

### T1 through T24 — [unchanged from S36 pre-final]

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

### T26 — TIER-1 COMPETITOR STRATEGIC INVESTMENT SIGNAL (S36)
When a direct competitor invests billions in another company via public SEC filing, it is disclosing private conviction in that company's strategic importance. Same-session Stage 1 required.

### T27 — DEEP TURNAROUND PATTERN RECOGNITION (S36)
Three-pattern convergence: >40% below ATH + 3+ consecutive guidance beats + improving revenue. Analysts' models are structurally stale. Re-rating coming. See SI-63, SI-66.

### T28 — STOP-OUT IS NOT THESIS BREAK (S36)
V stopped out at $321.823 on post-earnings positioning unwind, not fundamental deterioration. Stop was correct discipline — thin 1.87% clearance on a name that had already captured the earnings gain. Fundamentals intact (Q2 FY26 revenue +15%, EPS beat). Re-entry parameters: $305-315 zone, stop $292-295, do not chase back above exit price. This is distinct from T15 (broken thesis exit). A thin stop being triggered by market noise does not change the underlying investment case.

### T29 — EU ENERGY TRANSITION IS CORE THESIS — SCAN OMISSION COST REAL RETURNS (S36)
**Origin:** CWR (Ceres Power) gained +989% over 12 months. This was discussed as central thesis on multiple occasions. No formal scan section existed.
**Cost of omission:** CWR from 53.6p low to 739p = 1,279% from entry zone. P1 lesson set entry at 250-270p — even that entry would have delivered substantial returns. The scan never flagged it because Section N did not exist.
**Lesson:** When a sector is identified as CORE THESIS in multiple sessions, it requires a FORMAL SCAN SECTION with specific tickers, screening criteria, and quarterly review. A verbal discussion without formal codification is not the same as a scan. The thesis is: EU/UK energy transition is structurally accelerated by Hormuz blockade, EU LNG dependence crisis, NATO rearmament energy security, and von der Leyen's nuclear reversal. This creates a multi-year structural tailwind for clean energy technology, grid infrastructure, nuclear renaissance, and green hydrogen. Codified as SI-67, E23, and Section N.
**The next CWR pattern:** Capital-light technology licensor (not manufacturer), real validated IP with major corporate partners, multiple verticals, early commercial stage, LSE AIM or European small/mid cap. Screen quarterly using SI-67.

---

## POSITION-SPECIFIC LESSONS

### P1 — CWR.L UPDATED (S36)
Original lesson: entry only at 250-270p with confirmed re-rating. The re-rating DID occur — we failed to catch it. CWR is now at 739p (+989% year). Do not enter at these levels. Add to watch at 500p. The lesson is not that P1 was wrong — the 250-270p target was directionally correct. The error was not having Section N to track the ongoing thesis and update the entry target as evidence accumulated. See T29 and SI-67.

### P2 — Linde Thesis Weakened
Toll regime resumes helium.

### P3 — IAG.L Closed Correctly
Sold after peace dividend thesis broken.

### P4 — ABVX Risk Profile (Updated S36)
Royalty buyback May 5: sophisticated investors took equity at $111.57 vs cash. Valid M&A prep signal. Not confirmation. Hold 50sh, stop $109.93, maximum room strategy.

### P5 — SHLD Stop/Sell Sequence Error
Cancel GTC stop FIRST, then sell.

### P6 — PLTR Entry Without Catalyst
P6 test required before any momentum/narrative entry. PLTR SI-61 DORMANT Q2 July.

### P7 — AVAV Entry History
Re-entry S35: 15sh @$185.067, stop $155. June 30 Q4 gate.

### P8 — ITM Stop Discrepancy
IBKR is ground truth on stop prices always.

### P9 — AMZN Stop Limit Gap Mechanics
Stop Limit structure provides execution guarantee on gap opens.

### P10 — ITM Breakout Protocol Supersession
Apply the MORE protective stop when current exceeds protocol target.

### P11 — Re-Entry Below Stop-Out Price (REVISED S35)
Re-entry permitted within 5% of stop-out level when thesis intact/strengthened. Requires: conviction statement, stop at/below original level, thesis documented.

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

### P20 — Stop Protection Percentage Review
Formula: cost + ((current − cost) × 0.50) minimum. Exception: M&A holdout positions.

### P21 — Critical Minerals Speculative Classification
Pre-production positions = strategic asymmetry with defined kill switch.

### P22 — MSTR mNAV ENTRY THESIS
Entry 15sh @$181.07. Scale: BTC >$85K. Kill: BTC <$70K weekly. Monitor Bitcoin Yield quarterly.

### P23 — UUUU PRE-EARNINGS ENTRY (S36)
Filled May 5 @$21.99, earnings May 6. P24 acknowledged and deliberate. FIRB cleared. Half-size. Scale gate post-print.

### P24 — V STOP-OUT AND RE-ENTRY PARAMETERS (S36)
Stopped @$321.823 (+$117.58 trade 32). Post-earnings positioning unwind — NOT thesis break. Fundamentals intact. Re-entry: $305-315 zone only. Do not re-enter above $321. Q3 FY2026 earnings July 28 = next catalyst. Ex-div May 12 $0.67/sh.

---

## SCAN PROTOCOL LESSONS

### S1 — Full Scan = SI-14 Sections 0, A-K, N (v5.0)
Section 0 (SI-39) runs FIRST. SI-45 weekly (first session of week). SI-65 Milestone Calendar (first session of month). **Section N (EU Energy Transition) runs QUARTERLY plus any session where geopolitical energy thesis developments occur.**

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

### S12 — THESIS-DEDICATED RESEARCH FILES
For multi-session research thesis with 10+ candidates: `research/<THESIS>_THESIS.md`.

### S13 — COMMODITY PRICE VERIFICATION
State price, source, and date explicitly before any commercial viability assessment.

### S14 — SI-45 WEEKLY SCREENER OUTPUT S35/S36
LMT GTC $522 FILLED @$516.73. AVAV filled S35. UUUU GTC $21.99 FILLED. AI infrastructure: zero SI-39 triggers.

### S15 — INTEL TURNAROUND RETROSPECTIVE
SI-62 to SI-66 created. Government stake + NVIDIA stake = public filings not caught.

### S16 — CWR SCAN OMISSION (S36)
CWR +989% over 12 months. EU/UK energy transition discussed as CORE THESIS multiple sessions. No formal scan existed. Cost: position-sized gain not captured. Prevention: SI-67 Section N mandatory in every full scan. First run required in S37.

---

## INFRASTRUCTURE LESSONS

### I1 — Local Filesystem MCP
READ AND WRITE ACCESS CONFIRMED S19-S36 FINAL.
Allowed paths: `C:\Users\jcadb\claude-fund`
Subdirectories: journal\, state\, research\

### I2 — Google Drive DEPRECATED

### I3 — Session Open Protocol (SI-32) v5.0
1. Read FUND_SESSION_STATE.md | 2. Read LESSONS_LEARNED.md | 3. Check journal lastUpdated
4. **SI-47: State today's date explicitly** | 5. IBKR screenshots (positions + orders reconciliation)
6. Section 0 SI-39 drawdown batch | 7. SI-45 weekly screener (first session of week)
8. SI-65 milestone calendar check (first session of month)
9. SI-14 scan A-K | 10. **Section N EU Energy Transition** (quarterly + thesis-triggered)
11. Check `research/` directory for pending Stage 2 tasks

### I4 — Session Close Protocol (SI-28)
1. Build session-close block | 2-4. Write journal + .md files to C drive
5. Update hormuz_log.md | 6. Update trade tracker if fills | 7-10. User actions.
**NOTE: Do NOT write journal until session is FULLY CLOSED with final IBKR screenshots.**

### I5 — Journal versioning
trading_journal51.jsx = current (Session 36 FINAL — 5 May 2026)

### I6 — Memory Hierarchy (SI-33)
Journal → FUND_SESSION_STATE → LESSONS_LEARNED → research/*.md → Trade Tracker

### I7 — Trade Tracker Status (S36 FINAL)
32 total closed trades. V stopped out S36 (+$117.58). All in trading_journal51.jsx tradeTracker.

### I8 — Date Verification Is Step Zero
System prompt date is ONLY authoritative source. Non-negotiable.

### I9 — DAY Orders Require Pre-Open Review
DAY market orders submitted after hours must be reviewed at session open before fill.

### I10 — RESEARCH FILE LOCATIONS
- `research/AI_INFRASTRUCTURE_THESIS.md` — AI infrastructure Stage 1 candidates
- `research/CRITICAL_MINERALS_THESIS.md` — Critical minerals Stage 2: UUUU, LAC
- `research/EU_ENERGY_TRANSITION_THESIS.md` — **TO BE CREATED S37** — EU/UK clean energy sector

### I11 — Direct C Drive Write Confirmed (S19-S36)

### I12 — EXCHANGE HOLIDAY PROTOCOL
Check exchange-specific holidays before every session. Never state a market is open without verifying time. E1 violation S36: stated LSE/Milan open at 08:25 UAE.

### I13 — SESSION CLOSE TIMING (S36)
Do not write session close files until the user confirms the session is finished and final IBKR screenshots are provided. Writing prematurely (as occurred in S36) requires a second rewrite with the correct final data. Wait for explicit close confirmation.

---

## STANDING INSTRUCTION REFERENCE

### SI-25 — EXIT TRIGGER (DUAL CONDITION)
1. PERMANENT Hormuz reopening confirmed
2. WTI -10% from $117.63 peak = $105.87
Current: Condition 1 UNMET. WTI ~$104. Thesis intact.

### SI-35 — DOLLAR-RISK SIZING
Maximum loss per trade = $500. LMT exception: $570 accepted per T25 — raise stop to $480 immediately post-fill.

### SI-37 — SPECULATIVE POSITION CAP
Maximum $1,500 cost. UUUU: $1,100/$1,500 used. LAC pending.

### SI-39 — DRAWDOWN SCREENER (SECTION 0)
-15% to -20% from 52-week ATH. Every session. LIMITATION: does not catch multi-year ATH drawdowns. SI-63 addresses this.

### SI-45 — WEEKLY SCREENER
First session of every week. Cannot be deferred. Sections A-K plus Section N.

### SI-47 — DATE PROTOCOL
State today's date explicitly. Step zero. Non-negotiable.

### SI-48 — AI THESIS ATH RULE AMENDMENT
AI infrastructure only. Entry near ATH if: (1) valuation reasonable, (2) structural catalyst, (3) no multiple expansion required, (4) PLTR P6 test passed.

### SI-61 — SHORT WATCHLIST (UPDATED S36)
- PLTR: DORMANT until Q2 July 2026
- AAL: Dead-cat bounce $13-14, WTI >$100 required
- CCL (NEW): Rally to $23-25 trigger
- SNOW (NEW): Earnings miss + guidance trim trigger

### SI-62 — TIER-1 STRATEGIC INVESTMENT MONITOR
Weekly SEC EDGAR SC 13D/13G/8-K scan. >$500M by competitor/sovereign/Tier-1. Same-session Stage 1.

### SI-63 — DEEP TURNAROUND SCREEN
Monthly. >40% below ALL-TIME HIGH + 3+ consecutive guidance beats + improving revenue. Market cap >$5B.

### SI-64 — GOVERNMENT/NATIONAL SECURITY ASSET MONITOR
Quarterly + event-driven. CHIPS Act equity, DoD Trusted Foundry, ITAR-critical.

### SI-65 — TECHNOLOGY MILESTONE CALENDAR
Quarterly build, monthly review. `research/MILESTONE_CALENDAR.md`

### SI-66 — NEW CEO CREDIBILITY PATTERN
Quarterly. New operating/technical CEO at >$5B company down >30% from 5yr high.

### SI-67 — EU/UK ENERGY TRANSITION SECTOR SCAN — SECTION N (NEW S36 FINAL)
**Origin:** CWR +989% missed. EU energy transition discussed as core thesis multiple sessions. No formal scan existed. E23 codified.

**Thesis context:** EU structurally forced to diversify away from LNG/O&G dependency. Hormuz blockade accelerates this. Von der Leyen nuclear reversal. NATO rearmament energy security. EU Grids Package summer 2026. This is a MULTI-DECADE structural transition creating explosive growth opportunities in specific technology niches.

**Scan frequency:** Full scan EVERY first session of each month. Supplementary scan any session with major Hormuz/EU energy news.

**Screening categories and key tickers:**

*Category 1 — Fuel Cell / Electrolyser Technology (capital-light model preferred):*
- CWR.L (LSE AIM): Solid oxide SOFC/SOEC licensor. Currently 739p — WATCH ONLY at 500p
- ITM.L (LSE AIM): PEM electrolyser manufacturer. Watch at 135-140p
- PCELL.ST (Nasdaq Stockholm): H2 PEM fuel cells, Bosch partner, marine + refrigeration. ~SEK 32-37. Stage 1 candidate
- AFC.L (LSE AIM): Alkaline H2 fuel cells, maritime/data centre/rail. Revenue too small currently — speculative watch

*Category 2 — Industrial Scale Green Hydrogen:*
- NCR.DE/1NUA.DE (Frankfurt): Thyssenkrupp Nucera. Alkaline electrolysers. 300MW Moeve + 700MW Stegra. Suppressed vs ATH. Stage 1 candidate
- ORSTED.CO (Copenhagen): World's largest offshore wind developer. 60% below ATH. Stage 1 candidate
- LHYFE.PA (Paris): France's largest RFNBO H2 producer. WARNING: analyst analysis suggests path to bankruptcy — speculative only, small position if at all

*Category 3 — Nuclear Renaissance:*
- RR.L (LSE): HELD. SMR + Rolls-Royce aero. Primary EU nuclear position
- CNA.L (LSE): Centrica. Sizewell C nuclear stake + UK retail gas. Morningstar "best UK nuclear play." Stage 1 candidate
- CEG (NYSE): HELD. US nuclear via Constellation Energy

*Category 4 — Grid Infrastructure:*
- PRY.MI (Milan): Prysmian. Subsea + grid cables for offshore wind. EU Grids Package summer 2026 catalyst. Stage 1 when capacity
- NG.L (LSE): National Grid. UK/US grid infrastructure. Large cap, income
- RWE.DE (Frankfurt): Europe's largest renewable energy capex investor. 37GW target by 2030. Stage 1 when capacity

*Category 5 — Offshore Wind:*
- ORSTED.CO (Copenhagen): See Category 2
- VWS.CO (Copenhagen): Vestas Wind Systems. Large cap offshore wind turbine manufacturer

**"Next CWR" screening criteria:**
Every quarterly Section N scan should specifically screen for companies matching ALL of:
1. UK AIM or European small/mid cap (£50M–£500M market cap)
2. Capital-light model: technology licensor, IP royalty, or platform-as-a-service (NOT primary manufacturer)
3. Major corporate validation: at least ONE blue-chip industrial partner (Bosch, Siemens, Doosan, Volvo, Rolls-Royce equivalent) with committed development contract
4. Dual-use technology: usable in both power generation AND green hydrogen (or two or more clean energy verticals)
5. EU energy independence alignment: product directly relevant to EU strategic energy shift
6. Stage of development: past proof-of-concept, early commercial revenue, not yet scaled

**Concentration ceiling:** EU energy transition maximum = 4 positions simultaneously (RR.L counts as 1/4, CEG counts as 1/4). Currently 2/4 occupied. Room for 2 new positions.

**Stage 1 candidates requiring research this session:**
1. PCELL.ST — PowerCell Sweden
2. NCR.DE — Thyssenkrupp Nucera
3. ORSTED.CO — Orsted
4. CNA.L — Centrica

### SI-68 — JOURNAL CLOSE TIMING PROTOCOL (NEW S36)
Do NOT write session close files (journal, FUND_SESSION_STATE.md, LESSONS_LEARNED.md) until user explicitly confirms session is complete and final IBKR screenshots have been provided. Premature write (as occurred in S36 before V stop-out and LMT/UUUU fills were confirmed) requires a full rewrite. The cost is redundant work and potential data errors. Wait. Always wait for final confirmation.

---

## 52-WEEK DATA PROTOCOL
- **Current price (US):** MMD /v2/aggs/ticker/{TICKER}/prev
- **52-week high/low:** EOD:get_us_live_extended_quotes
- **EU/UK:** Stockopedia or Yahoo Finance (UK) / Investing.com (EU)
- **All-time high:** Web search + EODHD historical. Required for SI-63
- **Commodity prices:** Fastmarkets / Trading Economics / EIA — primary source with date
- **NEVER use memory for 52-week range, commodity prices, or earnings dates**

---

## PROHIBITED DATA SOURCES
- GuruFocus, PitchBook, Macroaxis
- EODHD earnings endpoint (403 error)
- Memory for 52-week range, commodity spot prices, or earnings dates
- EODHD lastTradePrice for current session
- Web search for live prices during market hours (E20)
- Trump Truth Social for geopolitical fact confirmation
- Iranian/adversary state media for military claims without CENTCOM verification (E22)
- McPhy Energy (ALMCP.PA) — IN LIQUIDATION as of 2026
- Lhyfe (LHYFE.PA) — analyst analysis indicates bankruptcy trajectory; speculative only if at all
