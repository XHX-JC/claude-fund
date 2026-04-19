# LESSONS LEARNED — CLAUDE FUND
**Account:** U24936508 (IBKR Pro) | **Compiled through Session 24 (2026-04-19)**
**Journal version:** trading_journal33.jsx | **SIs:** 1–48

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
| E12 | Tool routing gap | Not knowing which tool provides which data | MMD=current price. EODHD extended=52wk range. Never conflate |
| E13 | EODHD price delay | EODHD lastTradePrice may be 4-6 days stale | Use MMD for current session price |
| E14 | Journal date discrepancy | Key event dates wrong in journal | Cross-reference 2+ primary news sources before acting |

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
**ORIGIN**: NOG sell submitted Saturday on Hormuz opening news. Iran re-closed Hormuz Saturday evening. The exit rationale evaporated before markets even opened. NOG sell cancelled Sunday.
**LESSON**: When exiting a position on geopolitical news, verify the news is stable before the order executes — particularly for DAY orders submitted after hours. A DAY market order for a geopolitical thesis exit should be reviewed at session open before fill to confirm the thesis driver is still intact. The 12-hour period between after-hours order submission and market open is enough for the entire situation to reverse.
**APPLICATION**: For any geopolitical-driven DAY market order, build in a review step at session open (pre-13:30 UAE for NYSE) to confirm the triggering event has not reversed overnight.

### T19 — ATH RULE IS THESIS-DEPENDENT (NEW S24)
**ORIGIN**: Session 24 AI infrastructure deep dive. User clarification that within the AI thesis, ATH alone should not disqualify — further analysis of upside potential must override. But the PLTR lesson (P6 — entry on narrative/multiple expansion, resulted in -$1,307 realised loss) remains the guardrail.
**LESSON**: P13 (no entry within 5% of 52wk high without catalyst) is the DEFAULT rule for position entry. But for specific theses where valuation multiple anchors are defensible — cheap-fwd-PE-at-ATH situations like HPE at fwd PE 10.7 — blanket application of P13 would cause missed opportunities. The discipline is to differentiate:
- ATH + expensive multiple + thesis requires multiple expansion → PLTR trap → REJECT (P6 lesson)
- ATH + cheap multiple + earnings growth path clear + contracted backlog → potentially VALID entry with reduced sizing
**APPLICATION**: See SI-48 for the full AI-thesis-specific rule. SI-48 is narrow in scope — it does NOT override P13 for any other thesis.

### T20 — "NEXT NVIDIA" FRAMING CORRECTION (NEW S24)
**ORIGIN**: Session 24 user clarification. Initial framing asked to "find the next Nvidia in scope and scale." Corrected framing: find companies with modest valuation AND genuine IP/tech that will become instrumental for AI rollout, not replacing NVIDIA or even necessarily in the chip sector.
**LESSON**: "Next Nvidia" as a literal search criterion is not possible from public markets at the fund's scale — a company capable of compounding 20x from $50B+ market cap is not the same as a $10B company with transformative IP. The correct frame is asymmetric optionality on genuine IP at reasonable valuation. Examples: POET (silicon photonics interposer, speculative), HPE (Juniper networking + AI server at cheap multiple), MU (HBM memory structural bottleneck at anomalous forward PE).
**APPLICATION**: When searching speculative positions, the question is not "will this become Nvidia" but "does this company have IP that becomes instrumental AND is the market currently mispricing the optionality?"

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
Entered $195.09, sold $197.945 (+$71.38). Validate contractor concentration risk before entry.

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
**ORIGIN**: SLV BUY $70 GTC was left "Pending" in IBKR when SLV SELL Stop $63 was cancelled S23. The decision was to cancel both legs. Only one was confirmed cancelled.
**LESSON**: When cancelling a bracket order (buy + stop), explicitly confirm BOTH legs are cancelled. Do not assume. Check IBKR orders tab for each leg individually. An order showing "Pending" is not cancelled — it is queued. Confirm "Cancelled" status for each order separately.
**APPLICATION**: Session open orders review must cross-check that cancelled orders show "Cancelled" status, not "Pending."

### P19 — AI THESIS CROWDED TRADE OBSERVATION (NEW S24)
**ORIGIN**: Session 24 AI infrastructure deep dive. Scan of ~40 AI-exposed names showed roughly half at or within 5% of 52-week highs. VRT, ETN, GEV, ANET, MRVL, POWL, CLS, JBL, FN, COHR, LITE, MTSI all at or above ATH.
**LESSON**: The obvious picks-and-shovels names in AI infrastructure are crowded. The edge for the fund comes from structurally critical names trading at anomalous valuations (MU fwd PE 7.9), drawn-down specialists with intact thesis (CRDO -25%, SNPS -31%), and pure-speculation sized per SI-37. Chasing the obvious quality names at ATH without SI-48 justification repeats the P6 mistake.
**APPLICATION**: Before adding any AI infrastructure position, explicitly document (a) whether SI-48 applies (b) whether position is thesis-central or correlation-stacking with existing MSFT/AMZN exposure (c) what the realistic upside is without multiple expansion.

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
Key event dates must be verified against 2+ primary sources. Ceasefire expiry confirmed Tuesday Apr 21.

### S11 — SI-45 Non-Deferral Rule (S23).
SI-45 executes first session of every trading week. Not optional.

### S12 — THESIS-DEDICATED RESEARCH FILES (NEW S24)
**ORIGIN**: Session 24 AI infrastructure deep dive produced a 40+ ticker candidate list that would bloat the journal if stored inline. Separate thesis research files allow depth without cluttering core state.
**LESSON**: For any multi-session research thesis with 10+ candidate names, create a dedicated file at `C:\Users\jcadb\claude-fund\research\<THESIS>_THESIS.md` linked from the journal. Review at session open when relevant thesis is active.
**APPLICATION**: 
- `research/AI_INFRASTRUCTURE_THESIS.md` created S24 (40+ candidates)
- Future thesis research follows same pattern
- Journal references the file path; candidate list lives in the thesis file to avoid journal bloat

---

## INFRASTRUCTURE LESSONS

### I1 — Local Filesystem MCP
READ AND WRITE ACCESS CONFIRMED S19-S24.
Allowed paths: `C:\Users\jcadb\claude-fund`
New subdirectory S24: `C:\Users\jcadb\claude-fund\research\`

### I2 — Google Drive DEPRECATED
All state management via local filesystem MCP + Claude project.

### I3 — Session Open Protocol (SI-32)
1. Read FUND_SESSION_STATE.md | 2. Read LESSONS_LEARNED.md | 3. Check journal lastUpdated
4. **SI-47: State today's date explicitly** | 5. IBKR screenshots | 6. Section 0 EOD batch | 7. SI-45 weekly (first session of week) | 8. SI-14 scan A-K
9. **NEW S24: If any active thesis file in `research/` directory, check for pending Stage 2 tasks**

### I4 — Session Close Protocol (SI-28)
1. Build session-close block | 2-4. Write journal + .md files to C drive
5. Update hormuz_log.md | 6. Update trade tracker if fills | 7-10. User actions.

### I5 — Journal versioning
trading_journal33.jsx = current (Session 24 — updated with AI thesis candidate list and SI-48)

### I6 — Memory Hierarchy (SI-33)
Journal → FUND_SESSION_STATE → LESSONS_LEARNED → research/*.md → Trade Tracker

### I7 — Trade Tracker Pending (S24)
1. AVAV +$71.38 (S20 — outstanding)
2. ITM trim +£652 (S22)
3. LNG -$396.54 (S23)
4. PATK +$9.34 (S23)
5. NOG — market sell cancelled, position held

### I8 — Date Verification Is Step Zero, Not a Reminder (S24)
**ORIGIN**: S24 error — stated "cancel before 13:30 UAE today" on a Sunday. Date was inferred from session context rather than read from the authoritative source (system prompt).
**FIX — SI-47**: System prompt date is the ONLY authoritative source. State the date explicitly at the start of every session before any analysis.
**NON-NEGOTIABLE**: This is step zero. It runs before IBKR screenshots, before price pulls, before thesis review.

### I9 — DAY Orders Require Pre-Open Review (S24)
DAY market orders submitted after hours must be reviewed at session open — before fill — to confirm the triggering thesis is still intact. See T18.

### I10 — AI THESIS RESEARCH FILE LOCATION (NEW S24)
`C:\Users\jcadb\claude-fund\research\AI_INFRASTRUCTURE_THESIS.md` contains full Stage 1 candidate list (40+ names), ranked priorities, explicit open questions for Stage 2, and SI-48 rule definition. Consult this file before any AI-thesis-related trade decision.

### I11 — Direct C Drive Write Confirmed (S19-S24)
filesystem:write_file writes directly to allowed directories.

---

## STANDING INSTRUCTION REFERENCE — SI-48 (NEW S24)

### SI-48 — AI THESIS ATH RULE AMENDMENT

**SCOPE:** AI infrastructure thesis candidates ONLY. Does not modify P13 for any other thesis.

**RULE:** For an AI-thesis-tagged candidate at or near 52wk high, entry may proceed without SI-39 drawdown trigger if ALL FOUR tests pass in Stage 2:

1. **Valuation reasonable:** Forward PE below sector median OR PEG < 1.5
2. **Structural catalyst path:** Multi-year contracted backlog, LTAs, or order book visibility extending beyond next earnings print
3. **No multiple expansion required:** Upside case works from earnings growth alone; does not depend on market re-rating
4. **PLTR P6 test:** Explicit check — if primary case is "narrative will continue," REJECT

**ADDITIONAL CONSTRAINTS:**
- SI-41 catalyst window (8 weeks) still applies
- SI-37 speculative cap ($1,500) still applies to speculative names
- SI-35 dollar-risk sizing still applies ($500 max loss per trade)
- **Position size should be REDUCED vs a drawdown entry** to account for lower margin of safety at ATH

**DOCUMENTATION REQUIREMENT:** Before any SI-48 entry, the four tests must be explicitly logged in the trade tracker or journal entry. No unverified SI-48 entries.

**CURRENT SI-48 CANDIDATES (as of S24):**
- HPE ($26.44, at ATH, fwd PE 10.7) — passes all four tests on scan; awaits Stage 2
- MU ($454.20, -3.6% from ATH, anomalous fwd PE) — passes on scan; July 1 earnings catalyst
- ETN, AVGO — borderline, require Stage 2 fwd PE/growth analysis

**EXPLICITLY FAILS SI-48:**
- VRT (fwd PE 51.8) — thesis requires multiple expansion
- PRY.MI (+157% YoY, fwd PE 27.5) — multiple-expansion driven
- ALAB (fwd PE 72.5 even after -34% drawdown) — PLTR trap risk
- GEV (fwd PE 67 at ATH) — stretched

---

## SESSION CLOSE CHECKLIST — SESSION 24 (UPDATED)
```
SESSION CLOSE CHECKLIST — SESSION 24 POST-SUPPLEMENTARY
======================================
✅ 1. trading_journal33.jsx written to C:\Users\jcadb\claude-fund\journal\
✅ 2. FUND_SESSION_STATE.md written to C:\Users\jcadb\claude-fund\state\
✅ 3. LESSONS_LEARNED.md UPDATED with T19, T20, P19, S12, I10, SI-48
✅ 4. AI_INFRASTRUCTURE_THESIS.md created at C:\Users\jcadb\claude-fund\research\
⬜ 5. trading_journal33.jsx to be updated with AI thesis watchlist and SI-48
⬜ 6. hormuz_log.md — update: re-closure confirmed Saturday Apr 18
⬜ 7. Trade tracker — rows 1-4 still pending
⬜ 8. USER: Delete old journal from Claude project if replaced
⬜ 9. USER: Upload updated trading_journal33.jsx to Claude project
⬜ 10. USER: Run session-close.bat (GitHub backup)
⬜ 11. MONDAY APR 20: Resubmit NOG stop $22.50 GTC — FIRST ACTION before 13:30 UAE
⬜ 12. MONDAY APR 20: Confirm NOG sell + SLV buy cancellations show "Cancelled"
⬜ 13. SESSION 25: Begin Stage 2 research on MU, HPE, SNPS per AI_INFRASTRUCTURE_THESIS.md
======================================
```

---

## 52-WEEK DATA PROTOCOL (E11-E13 PREVENTION)
- **Current price (US):** MMD /v2/aggs/ticker/{TICKER}/prev → use `c` field
- **52-week high/low (US):** EOD:get_us_live_extended_quotes → fiftyTwoWeekHigh/Low
- **EU/UK:** web_fetch Yahoo Finance
- **NEVER use memory for 52-week range**

---

## PROHIBITED DATA SOURCES
- GuruFocus, PitchBook, Macroaxis
- Any search snippet price without verified publication date
- EODHD earnings endpoint (403 error — confirmed again S24)
- Memory estimates for 52-week high/low
- EODHD lastTradePrice for current session (may be 4-6 days stale)
- Journal-only sourcing for key external event dates without primary news verification
- Trump Truth Social posts as confirmation of geopolitical facts (T17)
- Session number, IBKR screenshots, or conversation context as source for current date (I8, SI-47)
- **NEW S24:** Scan-phase forward PE or growth numbers in AI thesis recommendations without Stage 2 primary-source verification (SI-44 reaffirmed)
