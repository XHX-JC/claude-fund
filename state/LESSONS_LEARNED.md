# LESSONS LEARNED — CLAUDE FUND
**Account:** U24936508 (IBKR Pro) | **Compiled through Session 25 (2026-04-20)**
**Journal version:** trading_journal36.jsx | **SIs:** 1–50

---

## ERROR TAXONOMY (SI-17) — 14 CODIFIED ERROR TYPES
| # | Error | Description | Prevention |
|---|-------|-------------|-----------|
| E1 | Timezone | Wrong open/close times | NY=UTC-4, UAE=UTC+4. 13:30 UAE=09:30 NY open. LSE=12:00-20:30 UAE |
| E2 | Stale position | Using journal prices vs IBKR | IBKR screenshot = ground truth always |
| E3 | Fill re-flag | Flagging executed orders as pending | Check IBKR fills before action items |
| E4 | Price verification | Acting on unverified prices | MMD primary, EODHD extended quotes for 52wk range |
| E5 | Market timing | Acting outside hours | LSE closes 20:30 UAE, NYSE 00:00 UAE |
| E6 | Dividend capture | Selling before ex-div | RR.L ex-div Wed Apr 23 — hard lock |
| E7 | Session discipline | Thesis drift in fatigue | Re-read SI-25 before late-session trades |
| E8 | Stale quote | Using stale quote as live | Live price check mandatory before execution |
| E9 | GTC orphan | GTC stop persists after market sell — unintended short | Cancel stop BEFORE market sell or IMMEDIATELY on fill confirmation |
| E10 | Closed position scan | Closed position in live scan with active stop | Cross-reference SI-19 + positions[] before any scan table |
| E11 | 52-week high hallucination | Stating 52wk range from memory | MANDATORY: use EOD:get_us_live_extended_quotes. Memory forbidden |
| E12 | Tool routing gap | Not knowing which tool provides which data | MMD=current price. EODHD extended=52wk range. Never conflate. SI-49 is authoritative routing guide |
| E13 | EODHD price delay | EODHD lastTradePrice may be 4-6 days stale | Use MMD for current session price |
| E14 | Journal date discrepancy | Key event dates wrong in journal | Cross-reference 2+ primary news sources before acting |
| E15 | AIM stop limitation | IBKR does not support stop/stop-limit order types for AIM-listed securities | Before any AIM entry: document that only Limit/Market/MoC/LoC are available. Set manual price alert. Log in position note. IES.L confirmed S25. |

---

## PERFORMANCE AUDIT
| Metric | S20 Baseline | S24 Update |
|--------|-------------|-----------|
| Net realized P&L (USD) | ~-$2,073 | ~-$2,460 (LNG -$397, PATK +$9) |
| ITM trim realized | — | +£652 |
| Open unrealized | ~+$5,505 | ~+$7,804 |
| Net Liquidity | ~$102,800 | $105,600 |
| Positions | 14 | 16 |

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

### T9 — Leveraged BTC Proxy vs Spot (S16)
Direct spot BTC via IBKR Paxos preferred.

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
When PRIMARY thesis driver impaired + position within 5% of breakeven → EXIT AT MARKET on next open.

### T16 — SI-45 Weekly Screener Cannot Be Deferred (S23)
NFLX missed at -27.4% drawdown. SI-45 first session of every week, no exceptions.

### T17 — Conditional Reopening ≠ SI-25 Trigger (S23)
Iran opened Hormuz conditionally Friday Apr 17 — closed again Saturday Apr 18.

### T18 — Geopolitical Position Management: Verify Before Exiting (S24)
For any geopolitical-driven DAY market order, build in a review step at session open to confirm the triggering event has not reversed overnight.

### T19 — ATH RULE IS THESIS-DEPENDENT (S24)
P13 (no entry within 5% of ATH without catalyst) is the DEFAULT rule. See SI-48 for the narrow AI-thesis exception.

### T20 — "NEXT NVIDIA" FRAMING CORRECTION (S24)
Correct frame: find companies with modest valuation AND genuine IP/tech that will become instrumental for AI rollout. Not about replacing Nvidia.

---

## POSITION-SPECIFIC LESSONS

### P1 — CWR.L Momentum Trap
Entry only at 250-270p with confirmed re-rating.

### P2 — Linde Thesis Weakened
Toll regime resumes helium.

### P3 — IAG.L Closed Correctly
Sold after peace dividend thesis broken.

### P4 — ABVX Risk Profile (Grandfathered)
Stop below cost ($114.31 vs $117.913). Intentional M&A optionality. Max loss ~$158.

### P5 — SHLD Stop/Sell Sequence Error (S14)
Cancel GTC stop FIRST, then sell. Never reverse sequence.

### P6 — PLTR Entry Without Catalyst (S16)
Presidential Truth Social post is not a catalyst. Realised loss -$1,307. This lesson governs all entries where thesis depends on narrative momentum or multiple expansion rather than earnings growth.

### P7 — AVAV Entry and Exit (CLOSED S20)
Entered $195.09, sold $197.945 (+$71.38).

### P8 — ITM Stop Discrepancy
IBKR is ground truth on stop prices always.

### P9 — AMZN Stop Limit Gap Mechanics
Limit price must be within ~1.5% of trigger for $200-$300 stocks.

### P10 — ITM Breakout Protocol Supersession
Apply the MORE protective stop when current exceeds protocol target.

### P11 — Re-Entry Below Stop-Out Price
Re-entry only after price pulls back below stop-out level.

### P12 — KTOS Sizing Error (S16)
Use SI-35 dollar-risk sizing.

### P13 — No Entry Near 52-Week Highs Without Catalyst (S16)
Do not enter within 5% of ATH without confirmed catalyst. **AMENDMENT per SI-48:** This default rule applies to all theses EXCEPT where SI-48 exemption triggers within the AI infrastructure thesis.

### P14 — CODA Stop Intentional Below Journal Level (S19)
Do not "correct" stops that are intentionally placed for catalyst timing.

### P15 — ORCL Entry Timing (S19)
Active legal filing = mandatory waiting period.

### P16 — ISRG Stop Journal Staleness (S20)
Any stop raise executed on IBKR must be logged in journal SAME SESSION.

### P17 — PATK M&A Tip Entry Error (S23)
No entry on any M&A play until: (1) target fully analysed, (2) deal terms/probability/R:R logged, (3) joint entry decision confirmed.

### P18 — Orphaned Buy Order Risk (S24)
When cancelling a bracket order, explicitly confirm BOTH legs cancelled. "Pending" ≠ "Cancelled."

### P19 — AI THESIS CROWDED TRADE OBSERVATION (S24)
Roughly half of AI-exposed names at or near ATH. Edge comes from anomalous valuations (MU), drawn-down specialists (SNPS -31%), and spec-sized options (POET). Chasing ATH without SI-48 justification repeats P6.

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
Key event dates must be verified against 2+ primary sources.

### S11 — SI-45 Non-Deferral Rule (S23).
SI-45 executes first session of every trading week. Not optional.

### S12 — THESIS-DEDICATED RESEARCH FILES (S24)
For any multi-session research thesis with 10+ candidate names, create a dedicated file at `C:\Users\jcadb\claude-fund\research\<THESIS>_THESIS.md`.

### S13 — AUDIT CONNECTED TOOLS BEFORE PROPOSING NEW ONES (S24)
**ORIGIN:** Session 24 OpenBB discussion. A full audit of connected tools (EOD, MMD/Polygon, Alpha Vantage, Coupler.io) revealed that Alpha Vantage — already connected — provides income statements, balance sheets, cash flows, earnings estimates with revision history, earnings call transcripts (15+ years, US companies), institutional ownership (13F), insider transactions, and news sentiment. None of these had been systematically used in Stage 1 or Stage 2 research. Additionally, the SEC EDGAR API is completely free, no key required, and provides all XBRL-tagged financial facts for every US-listed company.
**LESSON:** Before proposing an external tool install, audit what is already connected. The routing gap (E12) is more common than the data gap. SI-49 is the authoritative tool routing guide — consult it before every Stage 2 session.
**APPLICATION:** Any Stage 2 research session must begin by routing data needs through SI-49, not by defaulting to web search or proposing new tools.

---

## INFRASTRUCTURE LESSONS

### I1 — Local Filesystem MCP
READ AND WRITE ACCESS CONFIRMED S19-S24.
Allowed paths: `C:\Users\jcadb\claude-fund`
New subdirectory S24: `C:\Users\jcadb\claude-fund\research\`

### I2 — Google Drive DEPRECATED
All state management via local filesystem MCP + Claude project.

### I3 — Session Open Protocol (SI-32)
1. Read FUND_SESSION_STATE.md
2. Read LESSONS_LEARNED.md
3. Check journal lastUpdated
4. **SI-47: State today's date explicitly** — STEP ZERO
5. IBKR screenshots
6. Section 0 EOD batch (SI-39 Tier 1 + AI Tier 2 watchlist)
7. SI-45 weekly (first session of week only)
8. SI-14 scan A-K
9. If any active thesis file in `research/` directory, check for pending Stage 2 tasks
10. **NEW S24: For any Stage 2 research task, route data needs through SI-49 before pulling any data**

### I4 — Session Close Protocol (SI-28)
1. Build session-close block | 2-4. Write journal + .md files to C drive
5. Update hormuz_log.md | 6. Update trade tracker if fills | 7-10. User actions.

### I5 — Journal versioning
trading_journal35.jsx = current (Session 24 supplementary — SI-49 added)

### I6 — Memory Hierarchy (SI-33)
Journal → FUND_SESSION_STATE → LESSONS_LEARNED → research/*.md → Trade Tracker
**Data routing:** SI-49 (authoritative tool routing guide) is the reference for all data source decisions.

### I7 — Trade Tracker Pending (S24)
1. AVAV +$71.38 (S20 — outstanding)
2. ITM trim +£652 (S22)
3. LNG -$396.54 (S23)
4. PATK +$9.34 (S23)
5. NOG — market sell cancelled, position held

### I8 — Date Verification Is Step Zero, Not a Reminder (S24)
System prompt date is the ONLY authoritative source. State explicitly at session start before any analysis.

### I9 — DAY Orders Require Pre-Open Review (S24)
DAY market orders submitted after hours must be reviewed at session open before fill.

### I10 — AI THESIS RESEARCH FILE LOCATION (S24)
`C:\Users\jcadb\claude-fund\research\AI_INFRASTRUCTURE_THESIS.md` contains full Stage 1 candidate list. Consult before any AI-thesis trade decision.

### I11 — Direct C Drive Write Confirmed (S19-S24)
filesystem:write_file writes directly to allowed directories.

### I12 — SEC EDGAR DIRECT API — FREE, NO KEY REQUIRED (NEW S24)
**The most underutilised free data source available.** Provides every financial metric a US-listed company has filed in structured XBRL format. No API key. No cost. Goes back 10+ years.

**Primary endpoints:**
- All filings for a company: `https://data.sec.gov/submissions/CIK{10-digit-zero-padded}.json`
- All financial facts (revenue, EPS, assets, etc.): `https://data.sec.gov/api/xbrl/companyfacts/CIK{10-digit-zero-padded}.json`
- Full-text filing search: `https://efts.sec.gov/LATEST/search-index?q={query}&dateRange=custom&startdt={YYYY-MM-DD}&enddt={YYYY-MM-DD}`
- CIK lookup: `https://www.sec.gov/cgi-bin/browse-edgar?company={name}&action=getcompany&output=atom`

**Example CIK numbers (common Stage 2 targets):**
- MU (Micron): 0000723125
- HPE: 0001645590
- SNPS (Synopsys): 0000883241
- CRDO (Credo): varies — look up via CIK lookup endpoint

**Use for:** Verifying management guidance, confirming LTA language in 10-Q, checking actual gross margins and revenue by segment, validating forward PE calculations from first principles.
**This replaces manual web_fetch on SEC.gov pages for US companies.** See SI-49 for full routing.

---

## STANDING INSTRUCTION REFERENCE — SI-48 (S24)

### SI-48 — AI THESIS ATH RULE AMENDMENT
**SCOPE:** AI infrastructure thesis candidates ONLY.

**RULE:** Entry at ATH permitted if ALL FOUR pass in Stage 2:
1. Valuation reasonable (fwd PE below sector median OR PEG < 1.5)
2. Structural catalyst path (multi-year backlog, LTAs, order book visibility)
3. No multiple expansion required (upside from earnings growth alone)
4. PLTR P6 test: if "narrative will continue" is the case → REJECT

**CONSTRAINTS:** SI-41, SI-37, SI-35 all apply. Position size REDUCED vs drawdown entry.
**DOCUMENTATION:** Four tests logged in journal before any SI-48 entry.

**CURRENT PASSES:** HPE (fwd PE 10.74, Juniper + $5B backlog), MU (fwd PE 7.86, HBM LTAs)
**EXPLICIT FAILS:** VRT (PE 51.8), PRY.MI (+157% YoY), ALAB (PE 72.5), GEV (PE 67)

---

## STANDING INSTRUCTION REFERENCE — SI-49 (NEW S24)

### SI-49 — STAGE 2 DATA STACK ROUTING PROTOCOL

**PURPOSE:** Claude has multiple connected data tools. This SI is the authoritative routing guide. Consult before every Stage 2 session. Prevents E12 (tool routing gap) and eliminates unnecessary web_fetch for data already available via connected APIs.

**CONNECTED TOOLS AND THEIR ROLES:**

#### PRICE DATA — US
| Need | Tool | Notes |
|------|------|-------|
| Current price | `MMD: /v2/aggs/ticker/{TICKER}/prev` field `c` | Primary. Up to date. |
| 52wk high/low | `EOD:get_us_live_extended_quotes` | fiftyTwoWeekHigh/Low. ONLY authorised source. |
| Historical OHLCV | `EOD:get_historical_stock_prices` or `Alpha:TIME_SERIES_DAILY_ADJUSTED` | Adjusted for splits/dividends |
| Intraday | `MMD:call_api` or `Alpha:TIME_SERIES_INTRADAY` | MMD preferred for recency |
| Batch current prices | `EOD:get_us_live_extended_quotes` (comma-separated) | Up to 100 tickers per call |

#### PRICE DATA — EU / UK
| Need | Tool | Notes |
|------|------|-------|
| Current price + 52wk | `web_fetch https://finance.yahoo.com/quote/{TICKER}/` | MEMORY FORBIDDEN |
| Historical | `web_fetch https://stockanalysis.com/stocks/{ticker}/` | Clean and reliable |

#### FUNDAMENTALS — US (STAGE 2)
| Need | Tool | Notes |
|------|------|-------|
| Income statement history | `Alpha:INCOME_STATEMENT` | Annual + quarterly, GAAP normalised |
| Balance sheet history | `Alpha:BALANCE_SHEET` | Annual + quarterly |
| Cash flow history | `Alpha:CASH_FLOW` | Annual + quarterly |
| Company overview + key ratios | `Alpha:COMPANY_OVERVIEW` | PE, fwd PE, PEG, EPS, market cap |
| Earnings history + surprise | `Alpha:EARNINGS` | Actual vs estimate, quarterly + annual |
| EPS estimates + revisions | `Alpha:EARNINGS_ESTIMATES` | Consensus, analyst count, revision history |
| Earnings call transcript | `Alpha:EARNINGS_CALL_TRANSCRIPT` | 15+ years US coverage — USE THIS for Stage 2 |
| Institutional holders (13F) | `Alpha:INSTITUTIONAL_HOLDINGS` | Top holders, % float |
| Insider transactions | `Alpha:INSIDER_TRANSACTIONS` or `EOD:get_insider_transactions` | |
| News + sentiment scored | `Alpha:NEWS_SENTIMENT` | Per ticker, filterable by date |
| Analyst ratings summary | `EOD:get_fundamentals_data` sections=["AnalystRatings"] | |
| Full fundamentals pack | `EOD:get_fundamentals_data` | Slower but comprehensive fallback |

#### SEC FILINGS — US (FREE, NO KEY)
| Need | Tool | Notes |
|------|------|-------|
| All XBRL financial facts | `web_fetch https://data.sec.gov/api/xbrl/companyfacts/CIK{10-digit}.json` | Revenue, EPS, margins, assets — structured |
| Recent filings list | `web_fetch https://data.sec.gov/submissions/CIK{10-digit}.json` | Lists all 10-K, 10-Q, 8-K etc. |
| Full-text search | `web_fetch https://efts.sec.gov/LATEST/search-index?q={term}` | Search across all filings |
| Specific filing document | `web_fetch https://www.sec.gov/Archives/edgar/data/{CIK}/{accession}/{filename}.htm` | |

**CIK lookup:** `web_fetch https://www.sec.gov/cgi-bin/browse-edgar?company={name}&action=getcompany&output=atom`

**Known CIKs:**
- MU (Micron): 0000723125
- HPE: 0001645590
- SNPS (Synopsys): 0000883241
- AMZN: 0001018724
- MSFT: 0000789019
- NVDA: 0001045810

#### FUNDAMENTALS — EU / UK (STAGE 2)
| Need | Tool | Notes |
|------|------|-------|
| Income statement / ratios | `web_fetch https://stockanalysis.com/stocks/{ticker}/financials/` | Best free EU/UK source |
| Historical PE / margins | `web_fetch https://www.macrotrends.net/stocks/charts/{ticker}/{name}/price-earnings-ratio` | 20-year ratio history |
| Analyst estimates | `web_fetch https://finance.yahoo.com/quote/{ticker}/analysis/` | Consensus estimates |
| Recent news | `web_search {ticker} earnings Q1 2026` | |

#### SCREENING
| Need | Tool | Notes |
|------|------|-------|
| US broad screen | `EOD:stock_screener` | Multiple filters |
| Drawdown + fundamentals batch | `EOD:get_us_live_extended_quotes` | Batch up to 100 tickers |
| SQL on price data | `MMD:call_api store_as=` + `MMD:query_data` | For custom analysis |
| Top gainers/losers | `Alpha:TOP_GAINERS_LOSERS` | Daily US market |

#### CHARTING
**RULE: Offer a price chart for EVERY Stage 2 candidate. No exceptions.**

| Need | Tool | Notes |
|------|------|-------|
| Build inline chart | Pull `Alpha:TIME_SERIES_DAILY_ADJUSTED` then render with Visualizer | 1-year min, show 50d/200d MA |
| Quick reference | `web_fetch https://finance.yahoo.com/quote/{ticker}/chart` | Fallback if Visualizer not needed |

#### MACRO DATA — US
| Need | Tool | Notes |
|------|------|-------|
| GDP | `Alpha:REAL_GDP` | Quarterly, annual |
| CPI / Inflation | `Alpha:CPI`, `Alpha:INFLATION` | Monthly, semiannual |
| Federal funds rate | `Alpha:FEDERAL_FUNDS_RATE` | Daily/weekly/monthly |
| Treasury yields | `Alpha:TREASURY_YIELD` | By maturity (2y, 5y, 10y, 30y) |
| Unemployment | `Alpha:UNEMPLOYMENT` | Monthly |
| Nonfarm payrolls | `Alpha:NONFARM_PAYROLL` | Monthly |
| Country macro (non-US) | `EOD:get_macro_indicator` | GDP, inflation etc. for any country |

#### COMMODITIES / FX
| Need | Tool | Notes |
|------|------|-------|
| WTI oil live | `Alpha:WTI` | Daily/weekly/monthly |
| Brent oil live | `Alpha:BRENT` | Daily/weekly/monthly |
| Gold / Silver | `Alpha:GOLD_SILVER_SPOT` (live), `Alpha:GOLD_SILVER_HISTORY` (historical) | |
| FX rate (any pair) | `Alpha:CURRENCY_EXCHANGE_RATE` | Real-time |
| BTC/crypto | `Alpha:DIGITAL_CURRENCY_DAILY` | |

#### OPTIONS
| Need | Tool | Notes |
|------|------|-------|
| US options chain (live) | `Alpha:REALTIME_OPTIONS` | Full chain by expiry |
| Put/call ratio | `Alpha:REALTIME_PUT_CALL_RATIO` | Bullish/bearish signal |
| Historical options + Greeks | `Alpha:HISTORICAL_OPTIONS` | 15+ years, IV, delta, gamma |

#### MISCELLANEOUS
| Need | Tool | Notes |
|------|------|-------|
| Short interest | `web_fetch https://www.finra.org/investors/learn-to-invest/advanced-investing/short-selling` | FINRA bi-monthly, free |
| IPO calendar | `Alpha:IPO_CALENDAR` | Next 3 months |
| Earnings calendar (US) | `Alpha:EARNINGS_CALENDAR` | Next 3/6/12 months |
| Market status | `Alpha:MARKET_STATUS` | Is NYSE open right now |
| Index data (SPX, NDX, VIX) | `Alpha:INDEX_DATA` | 200+ indices |

**WHAT SI-49 DOES NOT COVER (genuine remaining gaps):**
- EU/UK earnings call transcripts — use web_fetch Motley Fool or company IR pages
- EU/UK institutional ownership — use web_fetch Reuters or company AR documents
- Real-time options flow / unusual activity — no good free source; not relevant to current strategy
- Credit market data (CDS spreads, bond yields per issuer) — Bloomberg only; not needed currently

---

## NEW LESSONS — SESSION 25 (2026-04-20)

### T21 — TWICE-WEEKLY SCAN AS STRUCTURAL DISCIPLINE (NEW S25)
**ORIGIN**: S25. Fund entering deployment phase. User identified that catching quality stocks at discounted entry points requires faster scan cadence than weekly-only.
**LESSON**: Best entries come in the first 24-48 hours of a macro-driven selloff, before the market recovers. A weekly scan misses mid-week dislocations entirely. Thursday brief scan exists specifically to catch these windows.
**APPLICATION**: SI-50 formalises Monday full + Thursday brief scan. Critical discipline: dip classification rule — before flagging any drawdown as buy candidate, classify it as MACRO-DRIVEN DIP (fundamentals intact) vs BROKEN THESIS (guidance cut, earnings miss — avoid). Speed of classification is the edge; accuracy is the discipline.

### T22 — ANALYST CONSENSUS AS SI-48 KILL SWITCH (NEW S25)
**ORIGIN**: HPE Stage 2 S25. Stage 1 appeared compelling (fwd PE 10.74, AI backlog). Stage 2 found analyst target $26.43 vs current $26.44 — zero upside modelled.
**LESSON**: When analyst consensus target equals or is below current price, SI-48 Test 3 (no multiple expansion required) fails. If the entire sell-side sees no upside from current levels, the market has already priced in the thesis. Entering is buying at fair value with no margin of safety.
**APPLICATION**: In any Stage 2 review, if analystTarget <= currentPrice → stop analysis. Fails SI-48 regardless of Stage 1 thesis quality. HPE is the proof case.

### P20 — PRIMARY SOURCE CONFIRMATION BEFORE AI THESIS ENTRY (NEW S25)
**ORIGIN**: MU Stage 2 S25. Stage 1 claimed "HBM sold out" and "LTA-style agreements." Stage 2 primary source (Q2 FY26 earnings transcript) confirmed: five-year SCA signed, HBM4 in volume production, supply tightness "beyond calendar 2026."
**LESSON**: Stage 1 theses are built from secondary sources — often accurate but occasionally oversimplified. The specific claim for SI-48 Test 2 (structural catalyst) must be verified in a primary source. Without the SCA finding from the MU transcript, this would have remained Stage 1 only.
**APPLICATION**: SI-49 mandates Alpha:EARNINGS_CALL_TRANSCRIPT before SI-48 entry approval. Transcript must confirm: (1) contract structure and duration, (2) supply commitments, (3) management confidence language.

### P21 — STAGE 2 CAN AND SHOULD KILL STAGE 1 THESES (NEW S25)
**ORIGIN**: HPE killed by Stage 2. Stage 1 showed compelling metrics. Stage 2 revealed analyst target = current price, negative trailing EPS, -30% quarterly earnings growth, 12 holds vs 9 buys.
**LESSON**: Stage 1 identifies candidates. Stage 2 is where the work happens. When Stage 2 kills a thesis, that is the system working correctly — not a failure.
**APPLICATION**: No entry — even at SI-37 speculative cap — without Stage 2 primary source verification. HPE is the proof case.

### S13 — THURSDAY BRIEF SCAN PROTOCOL (NEW S25)
**ORIGIN**: SI-50. Monday full scan catches week-opening drawdowns. Earnings reactions and macro data releases happen Tuesday-Thursday. A mid-week dip in a quality name can represent the best entry of the week.
**APPLICATION**: Every Thursday: pull prices for flagged names (currently MU, CDNS, CRDO, OXY, NOG). Classify any significant moves using three-question dip classification rule. Target time: 15-20 minutes maximum. First Thursday scan: April 24, 2026.

### S14 — DIP CLASSIFICATION RULE (NEW S25)
**ORIGIN**: SI-50 protocol. Core skill: distinguishing macro-driven dip from broken thesis.
**RULE — three questions before any drawdown becomes a buy candidate:**
(A) Negative company-specific fundamental news this week (miss, guidance cut, structural issue)?
(B) Macro/geopolitical or company-specific drawdown?
(C) Forward guidance cut or next print materially threatened?
If answers are No / Macro / No → CANDIDATE for Stage 2 investigation.
If any answer differs → BROKEN THESIS — wait or pass.
**EXAMPLES**: SNPS -31% = China export shock (macro) → candidate. LNG exit = Hormuz thesis changed (company-specific trigger, P11 governs re-entry).

### E15 — AIM STOP LIMITATION (NEW S25)
**ORIGIN:** Session 25. IES.L (AIM-listed) entered. Attempt to place stop-limit order failed — IBKR threw error. Investigation confirmed IBKR does not support stop or stop-limit orders for any AIM-listed security.
**CONFIRMED:** Available order types for AIM: Limit, Market, Market on Close, Limit on Close only.
**PREVENTION:** Before entering any AIM-listed position:
1. Note in pre-entry checklist: "AIM — no IBKR stop orders"
2. Set IBKR price alert at intended stop level
3. On alert trigger: immediately place Market Sell for full position size
4. Document in journal position note as "Manual alert Xp (E15 — AIM no stop)"
**CURRENT APPLICATIONS:** IES.L — 3,000sh, manual alert 12.5p. Max loss £150.
**SCOPE:** Applies to all AIM-listed securities: IES.L, ITM.L, CWR.L and any future AIM entries.

### I12 — SI-50 TWICE-WEEKLY SCAN IMPLEMENTATION (NEW S25)
Monday full scan + Thursday brief scan confirmed as standing protocol. First Thursday scan: April 24, 2026. Thursday watchlist: MU, CDNS, CRDO, OXY, NOG.

---

## SESSION CLOSE CHECKLIST — SESSION 25 EOD (v37)
```
SESSION CLOSE CHECKLIST — SESSION 25 EOD
==========================================
✅ 1. trading_journal37.jsx written (EOD) → C:\Users\jcadb\claude-fund\journal\
✅ 2. FUND_SESSION_STATE.md written → C:\Users\jcadb\claude-fund\state\
✅ 3. LESSONS_LEARNED.md updated — E15 added
✅ 4. IES.L: 3,000sh @ 17.39p, IBKR avg 17.49p, £525 cost, manual alert 12.5p
✅ 5. E15 documented permanently in error taxonomy
✅ 6. WTI EOD $88.36 +6.99% — ceasefire expires tomorrow
⬜ 7. hormuz_log.md update pending
⬜ 8. USER: Delete trading_journal36.jsx from Claude project
⬜ 9. USER: Upload trading_journal37.jsx to Claude project
⬜ 10. USER: Run session-close.bat
⬜ 11. TONIGHT: ISRG earnings 00:30 UAE + ceasefire expiry watch
==========================================
```

---

## SESSION CLOSE CHECKLIST — SESSION 24 (UPDATED v35)
```
SESSION CLOSE CHECKLIST — SESSION 24 + SI-49 ADDED
======================================
✅ 1. trading_journal35.jsx written to C:\Users\jcadb\claude-fund\journal\
✅ 2. FUND_SESSION_STATE.md written to C:\Users\jcadb\claude-fund\state\
✅ 3. LESSONS_LEARNED.md UPDATED — SI-49 added, S13, I12
✅ 4. AI_INFRASTRUCTURE_THESIS.md exists at C:\Users\jcadb\claude-fund\research\
⬜ 5. hormuz_log.md — update: re-closure confirmed Saturday Apr 18
⬜ 6. Trade tracker — rows 1-4 still pending
⬜ 7. USER: Delete trading_journal34.jsx from Claude project
⬜ 8. USER: Upload trading_journal35.jsx to Claude project
⬜ 9. USER: Run session-close.bat (GitHub backup)
⬜ 10. MONDAY APR 20: Resubmit NOG stop $22.50 GTC — FIRST ACTION before 13:30 UAE
⬜ 11. MONDAY APR 20: Confirm NOG sell + SLV buy cancellations show "Cancelled"
⬜ 12. SESSION 25: Begin Stage 2 on MU — use SI-49 routing (EDGAR CIK 0000723125, Alpha transcripts, Alpha earnings estimates)
======================================
```

---

## TOOL ROUTING QUICK REFERENCE (see SI-49 for full detail)
- **Current price US:** MMD prev close
- **52wk high/low US:** EOD:get_us_live_extended_quotes
- **Current price EU/UK:** web_fetch Yahoo Finance
- **Income statement / earnings:** Alpha:INCOME_STATEMENT, Alpha:EARNINGS
- **Earnings call transcript:** Alpha:EARNINGS_CALL_TRANSCRIPT
- **Institutional holders:** Alpha:INSTITUTIONAL_HOLDINGS
- **US SEC filings (structured):** data.sec.gov/api/xbrl/companyfacts/CIK{}.json (FREE)
- **EU/UK fundamentals:** stockanalysis.com, macrotrends.net via web_fetch
- **Inline price chart:** Alpha:TIME_SERIES_DAILY_ADJUSTED → Visualizer
- **NEVER:** Use EODHD earnings endpoint (403), use memory for 52wk range, use scan-phase figures without Stage 2 verification

---

## PROHIBITED DATA SOURCES
- GuruFocus, PitchBook, Macroaxis
- Any search snippet price without verified publication date
- EODHD earnings endpoint (403 error — confirmed S24)
- Memory estimates for 52-week high/low
- EODHD lastTradePrice for current session (may be 4-6 days stale)
- Journal-only sourcing for key event dates without primary news verification
- Trump Truth Social posts as confirmation of geopolitical facts (T17)
- Session number / conversation context as source for current date (I8, SI-47)
- Scan-phase forward PE or growth numbers in recommendations without Stage 2 verification (SI-44)
