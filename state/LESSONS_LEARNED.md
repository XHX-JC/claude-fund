# LESSONS LEARNED — CLAUDE FUND
**Account:** U24936508 (IBKR Pro) | **Compiled through Session 34 (2026-05-01)**
**Journal version:** trading_journal49.jsx | **SIs:** 1–48

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
| Metric | S20 Baseline | S34 Update |
|--------|-------------|-----------|
| Net realized P&L (USD) | ~-$2,073 | ~+$936 (IBKR 30-day tab) |
| ITM programme realized | — | +$2,639 (3 trims) |
| Open unrealized | ~+$5,505 | +$4,588 |
| Net Liquidity | ~$102,800 | $105,600 |
| Positions | 14 | 18 active + 3 pending GTCs |
| Trades closed (S34) | — | 31 total (Trade #31: NOG +$169) |

---

## THESIS & STRATEGY LESSONS

### T1 — Supply Chain Premium > War Premium
Structural damage persists under toll regime.

### T2 — Toll Regime vs Full Closure Distinction
Toll regime resumes non-oil shipments.

### T3 — Exit Trigger Discipline
SI-25 ONLY: formal PERMANENT Hormuz reopening + oil -10% from peak. Ceasefire alone insufficient. Iran opened Hormuz conditionally Friday Apr 17, then re-closed Saturday Apr 18. This confirmed the opening was never permanent and did not meet SI-25 threshold.

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
When PRIMARY thesis driver impaired by confirmed new datapoint + position within 5% of breakeven → EXIT AT MARKET on next open.

### T16 — SI-45 Weekly Screener Cannot Be Deferred (S23)
NFLX missed at -27.4% drawdown. SI-45 first session of every week, no exceptions.

### T17 — Conditional Reopening ≠ SI-25 Trigger (S23)
Iran opened Hormuz conditionally Friday Apr 17 — closed again Saturday Apr 18. Confirmed: ceasefire-linked opening is not a permanent reopening. Trump language inflates certainty. Verify against MarineTraffic data and IRGC statements, not political statements.

### T18 — Geopolitical Position Management: Verify Before Exiting (S24)
**ORIGIN**: NOG sell submitted Saturday on Hormuz opening news. Iran re-closed Hormuz Saturday evening. The exit rationale evaporated before markets even opened.
**LESSON**: When exiting a position on geopolitical news, verify the news is stable before the order executes — particularly for DAY orders submitted after hours. The 12-hour period between after-hours submission and market open is enough for the entire situation to reverse.
**APPLICATION**: For any geopolitical-driven DAY market order, review at session open before fill to confirm triggering event has not reversed overnight.

### T19 — ATH RULE IS THESIS-DEPENDENT (S24)
**ORIGIN**: AI infrastructure deep dive. ATH alone should not disqualify where valuation multiple anchors are defensible.
**LESSON**: P13 is the DEFAULT rule. Differentiate: ATH + expensive multiple + multiple expansion required → REJECT (P6). ATH + cheap multiple + earnings growth path + contracted backlog → potentially valid with reduced sizing.
**APPLICATION**: See SI-48 for the full AI-thesis-specific rule.

### T20 — "NEXT NVIDIA" FRAMING CORRECTION (S24)
**ORIGIN**: Correct frame is asymmetric optionality on genuine IP at reasonable valuation — not literal replacement of NVIDIA. Question: "Does this company have IP that becomes instrumental AND is the market mispricing the optionality?"

### T21 — Stop Review Triggers (S33/S34)
**ORIGIN**: V stop at $312.82 was protecting only 21% of the $212 unrealised gain. Was flagged by user as stale.
**LESSON**: Stop staleness review is not just for losing positions (T28). Winning positions require active stop management as they appreciate. A stop that was adequate at entry becomes inadequate at +8% gain.
**APPLICATION**: Any position with unrealised gain >8% and stop protecting <40% of that gain triggers a mandatory stop review. Raise to protect minimum 50% of unrealised gain while maintaining adequate clearance for normal volatility.

### T22 — Thesis Concentration Ceiling (S34)
**ORIGIN**: Critical minerals scan identified multiple attractive names (USAR, PPTA, ALB, LAC, UUUU) on top of existing CRML. Adding all would create correlated sector concentration.
**LESSON**: When a single macro thesis (China critical minerals monopoly, Hormuz blockade, AI infrastructure) generates multiple attractive names, the correlation between them means adding all does NOT diversify — it amplifies. Set an explicit ceiling per thesis and enforce it.
**APPLICATION**: Critical minerals ceiling: CRML + LAC + UUUU = maximum. Oil thesis: NOG + CODA = maximum at any time. AI thesis: MSFT + MRVL + SNPS + IBM = current holdings, no additions without exits first.

### T23 — Pre-Earnings Stop Management
T23 documented in journal. Do not widen stops in the 48-72 hours before earnings. Accept the binary outcome with existing protection.

### T24 — Commercial Viability vs Strategic Necessity (S34)
**ORIGIN**: LAC analysis initially concluded "state-propped only, financially unviable" based on $10-12/kg lithium price assumption. Lithium seaborne CJK was actually $18-20/kg — the project becomes commercially viable at $15/kg realised.
**LESSON**: For commodity-linked thesis analysis, the difference between "commercially viable" and "state-propped" can be a single commodity price input. Never use memory for commodity spot prices — always verify from primary source before forming commercial viability conclusions. A wrong price input inverts the investment case.
**APPLICATION**: E21 codified. For any speculative position where commercial viability is thesis-dependent, document the commodity price assumption and its source date explicitly in the journal entry.

---

## POSITION-SPECIFIC LESSONS

### P1 — CWR.L Momentum Trap
Entry only at 250-270p with confirmed re-rating.

### P2 — Linde Thesis Weakened
Toll regime resumes helium.

### P3 — IAG.L Closed Correctly
Sold after peace dividend thesis broken.

### P4 — ABVX Risk Profile (Updated S34)
Re-entered 50sh @$109.89 (S29). Stop $100. Current $118.10 (+7.5%). M&A optionality intact. Consider stop raise to $106 at S35 open.

### P5 — SHLD Stop/Sell Sequence Error (S14)
Cancel GTC stop FIRST, then sell. Never reverse sequence.

### P6 — PLTR Entry Without Catalyst (S16)
Presidential Truth Social post is not a catalyst. Realised loss -$1,307. This lesson governs all entries where thesis depends on narrative momentum or multiple expansion rather than earnings growth. PLTR now on SI-61 short watchlist.

### P7 — AVAV Entry and Exit (CLOSED S20)
Entered $195.09, sold $197.945 (+$71.38). Validate contractor concentration risk before entry.

### P8 — ITM Stop Discrepancy
IBKR is ground truth on stop prices always.

### P9 — AMZN Stop Limit Gap Mechanics
Limit price must be set appropriately below trigger for large-cap stocks. Stop Limit structure: trigger + limit floor $224 provides execution guarantee on gap opens.

### P10 — ITM Breakout Protocol Supersession
Apply the MORE protective stop when current exceeds protocol target.

### P11 — Re-Entry Below Stop-Out Price
Re-entry only after price pulls back below stop-out level. Active gates: NOG re-entry requires < $26.47.

### P12 — KTOS Sizing Error (S16)
Use SI-35 dollar-risk sizing.

### P13 — No Entry Near 52-Week Highs Without Catalyst (S16)
Do not enter within 5% of ATH without confirmed catalyst. **AMENDMENT per SI-48:** This default rule applies to all theses EXCEPT where SI-48 exemption triggers within the AI infrastructure thesis. See SI-48 for the narrow exception.

### P14 — CODA Stop Intentional Below Journal Level (S19)
Do not "correct" stops that are intentionally placed for catalyst timing.

### P15 — ORCL Entry Timing (S19)
Active legal filing = mandatory waiting period.

### P16 — ISRG Stop Journal Staleness (S20)
Any stop raise executed on IBKR must be logged in journal SAME SESSION.

### P17 — PATK M&A Tip Entry Error (S23)
No entry on any M&A play until: (1) target fully analysed, (2) deal terms/probability/R:R logged, (3) joint entry decision confirmed. A tip is not a thesis.

### P18 — Orphaned Buy Order Risk (S24)
When cancelling a bracket order (buy + stop), explicitly confirm BOTH legs are cancelled. An order showing "Pending" is not cancelled — confirm "Cancelled" status for each order separately.

### P19 — AI THESIS CROWDED TRADE OBSERVATION (S24)
Obvious picks-and-shovels AI names are crowded. Edge comes from anomalous valuations (MU fwd PE 7.9), drawn-down specialists with intact thesis (CRDO -25%, SNPS -31%), and pure-speculation sized per SI-37.

### P20 — Stop Protection Percentage Review (S34)
**ORIGIN**: V stop at $312.82 protecting only 21% of $212 unrealised gain. Raised to $321.83 protecting 56%.
**LESSON**: A stop that was "profit-locking" at entry becomes inadequate as the position appreciates. The correct metric is not absolute stop level but percentage of unrealised gain protected. Target minimum 50% protection.
**FORMULA**: Adequate stop = cost + ((current - cost) × 0.50) minimum. Review whenever unrealised gain exceeds 8%.

### P21 — Critical Minerals Speculative Classification (S34)
**ORIGIN**: LAC and UUUU research S34. Both are development/transformation stories with uncertain commercial timelines.
**LESSON**: For pre-production or pre-transformation positions, classify explicitly as "National Security Infrastructure" — held for strategic asymmetry with a defined kill switch, not near-term EBITDA. This classification determines hold discipline: do not exit on an earnings miss if the thesis kill switch hasn't triggered.
**KILL SWITCHES**: LAC = construction halt / DoE suspension / lithium sustained below $10/kg North American. UUUU = ASM deal failure / accelerated insider selling at board level.

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
For any multi-session research thesis with 10+ candidate names, create a dedicated file at `C:\Users\jcadb\claude-fund\research\<THESIS>_THESIS.md`. Journal references the file path; candidate list lives in the thesis file.

### S13 — COMMODITY PRICE VERIFICATION (S34)
**ORIGIN**: E21. Lithium carbonate price used in S34 analysis was stale by 6+ months.
**LESSON**: Before stating any commodity price in a thesis analysis, pull from primary source. Fastmarkets / Trading Economics / SMM for lithium. EIA / OilPrice.com for WTI. Never quote commodity prices from memory or undated search snippets.
**APPLICATION**: When assessing commercial viability of any commodity-linked company, state the price, the source, and the date of that source explicitly in the analysis.

---

## INFRASTRUCTURE LESSONS

### I1 — Local Filesystem MCP
READ AND WRITE ACCESS CONFIRMED S19-S34.
Allowed paths: `C:\Users\jcadb\claude-fund`
Subdirectories: journal\, state\, research\

### I2 — Google Drive DEPRECATED
All state management via local filesystem MCP + Claude project.

### I3 — Session Open Protocol (SI-32)
1. Read FUND_SESSION_STATE.md | 2. Read LESSONS_LEARNED.md | 3. Check journal lastUpdated
4. **SI-47: State today's date explicitly** | 5. IBKR screenshots | 6. Section 0 EOD batch | 7. SI-45 weekly (first session of week) | 8. SI-14 scan A-K
9. If any active thesis file in `research/` directory, check for pending Stage 2 tasks

### I4 — Session Close Protocol (SI-28)
1. Build session-close block | 2-4. Write journal + .md files to C drive
5. Update hormuz_log.md | 6. Update trade tracker if fills | 7-10. User actions.

### I5 — Journal versioning
trading_journal49.jsx = current (Session 34 — 1 May 2026)

### I6 — Memory Hierarchy (SI-33)
Journal → FUND_SESSION_STATE → LESSONS_LEARNED → research/*.md → Trade Tracker

### I7 — Trade Tracker Status (S34)
All 31 trades captured in trading_journal49.jsx tradeTracker. Trade #31: NOG +$169.36 (S34).

### I8 — Date Verification Is Step Zero, Not a Reminder (S24)
System prompt date is the ONLY authoritative source. State the date explicitly at the start of every session before any analysis. NON-NEGOTIABLE.

### I9 — DAY Orders Require Pre-Open Review (S24)
DAY market orders submitted after hours must be reviewed at session open — before fill — to confirm the triggering thesis is still intact.

### I10 — RESEARCH FILE LOCATIONS
- `research/AI_INFRASTRUCTURE_THESIS.md` — AI infrastructure Stage 1 candidates (40+ names)
- `research/CRITICAL_MINERALS_THESIS.md` — Critical minerals Stage 2: UUUU, LAC (created S34)

### I11 — Direct C Drive Write Confirmed (S19-S34)
filesystem:write_file writes directly to allowed directories.

### I12 — EXCHANGE HOLIDAY PROTOCOL (S34)
Before every session, explicitly check whether any held-position exchanges are closed for local holidays. Do not assume all markets follow US calendar. Confirmed closed dates this session: Frankfurt/Milan May 1 (Labour Day), LSE May 4 (UK Bank Holiday). R3NK and LDO stops were inactive on May 1 — no execution risk but must be flagged.

---

## STANDING INSTRUCTION REFERENCE — SI-48 (S24)

### SI-48 — AI THESIS ATH RULE AMENDMENT
**SCOPE:** AI infrastructure thesis candidates ONLY.
**RULE:** Entry may proceed at/near 52wk high if ALL FOUR tests pass in Stage 2:
1. Valuation reasonable: fwd PE below sector median OR PEG < 1.5
2. Structural catalyst path: multi-year contracted backlog/LTAs/order book visibility
3. No multiple expansion required: upside works from earnings growth alone
4. PLTR P6 test: if primary case is "narrative will continue" → REJECT
**CONSTRAINTS:** SI-41 catalyst window (8 weeks), SI-37 speculative cap, SI-35 sizing all still apply. Reduced position size vs drawdown entry.
**DOCUMENTATION:** Four tests must be explicitly logged before any SI-48 entry.

---

## 52-WEEK DATA PROTOCOL (E11-E13 PREVENTION)
- **Current price (US):** MMD /v2/aggs/ticker/{TICKER}/prev → use `c` field
- **52-week high/low (US):** EOD:get_us_live_extended_quotes → fiftyTwoWeekHigh/Low
- **EU/UK:** web_fetch Yahoo Finance or Stockopedia
- **Commodity prices:** Fastmarkets / Trading Economics / SMM / EIA — primary source, dated
- **NEVER use memory for 52-week range or commodity spot prices**

---

## PROHIBITED DATA SOURCES
- GuruFocus, PitchBook, Macroaxis
- Any search snippet price without verified publication date
- EODHD earnings endpoint (403 error)
- Memory estimates for 52-week high/low
- EODHD lastTradePrice for current session (may be 4-6 days stale)
- Journal-only sourcing for key external event dates without primary news verification
- Trump Truth Social posts as confirmation of geopolitical facts (T17)
- Session number, IBKR screenshots, or conversation context as source for current date (I8, SI-47)
- Web search / financial sites for live prices during NYSE/LSE market hours (E20) — IBKR TWS only
- Memory for commodity spot prices (E21) — primary source with date required
