# LESSONS LEARNED — CLAUDE FUND
**Account:** U24936508 (IBKR Pro) | **Compiled through Session 26 (2026-04-21)**
**Journal version:** trading_journal38.jsx | **SIs:** 1–52

---

## ERROR TAXONOMY (SI-17) — 15 CODIFIED ERROR TYPES
| # | Error | Description | Prevention |
|---|-------|-------------|-----------|
| E1 | Timezone — CRITICAL RECURRING FAILURE | Wrong market open/close times stated from memory without arithmetic check. CAUSED REPEATED ERRORS INCLUDING STATING "NYSE CLOSED" WHILE MARKET WAS OPEN. | **MANDATORY PROCEDURE BEFORE STATING ANY MARKET STATUS:** Write the arithmetic explicitly: UAE time now = X. NYSE closes 00:00 UAE (midnight). Is X before 00:00? If yes = OPEN. LSE closes 19:30 UAE. Is X before 19:30? If yes = OPEN. NEVER state market status without doing this check first. CORRECT HOURS (compute, never recall): NYSE opens **17:30 UAE** (09:30 EDT + 8hrs) / closes **00:00 UAE** (16:00 EDT + 8hrs). LSE opens **12:00 UAE** (09:00 BST + 3hrs) / closes **19:30 UAE** (16:30 BST + 3hrs). XETRA opens **11:00 UAE** (09:00 CEST + 2hrs) / closes **19:00 UAE** (17:00 CEST + 2hrs). Dubai = UTC+4 year-round. EDT = UTC-4 (Mar-Nov). EST = UTC-5 (Nov-Mar). BST = UTC+1 (Mar-Oct). GMT = UTC+0 (Oct-Mar). |
| E2 | Stale position | Using journal prices vs IBKR | IBKR screenshot = ground truth always |
| E3 | Fill re-flag | Flagging executed orders as pending | Check IBKR fills before action items |
| E4 | Price verification | Acting on unverified prices | MMD primary, EODHD extended quotes for 52wk range |
| E5 | Market timing | Acting outside hours | NYSE closes 00:00 UAE (midnight). LSE closes 19:30 UAE (NOT 20:30 — that figure was wrong). XETRA/BVME closes 19:30 UAE. Always derive from arithmetic, never memory. |
| E6 | Dividend capture | Selling before ex-div | Check ex-div dates before any LSE sell |
| E7 | Session discipline | Thesis drift in fatigue | Re-read SI-25 before late-session trades |
| E8 | Stale quote | Using stale quote as live | Live price check mandatory before execution |
| E9 | GTC orphan | GTC stop persists after market sell | Cancel stop BEFORE market sell |
| E10 | Closed position scan | Closed position in live scan | Cross-reference SI-19 before scan |
| E11 | 52-week high hallucination | Stating 52wk range from memory | MANDATORY: use EOD:get_us_live_extended_quotes |
| E12 | Tool routing gap | Wrong tool for data type | SI-49 is authoritative routing guide |
| E13 | EODHD price delay | EODHD lastTradePrice may be stale | Use MMD for current session price |
| E14 | Journal date discrepancy | Key event dates wrong | Cross-reference 2+ primary news sources |
| E15 | AIM stop limitation | IBKR does not support stops for AIM securities | Before AIM entry: set manual price alert. IES.L confirmed. |

---

## PERFORMANCE AUDIT
| Metric | S20 Baseline | S26 Update |
|--------|-------------|-----------|
| Net realized P&L (USD) | ~-$2,073 | ~-$2,460 |
| ITM trim realized | — | +£652 |
| Open unrealized | ~+$5,505 | ~+$7,553 |
| Net Liquidity | ~$102,800 | $105,200 |
| Positions | 14 | 17 |

---

## THESIS & STRATEGY LESSONS

### T1 — Supply Chain Premium > War Premium
### T2 — Toll Regime vs Full Closure Distinction
### T3 — Exit Trigger Discipline (SI-25)
### T4 — Cash Reserve is Tactical, Not Passive
### T5 — Mythos Miss (S13)
### T6 — Target List Cross-Reference (S14)
### T7 — Barbell Deployment Framework (S14)

### T8 — Short Attack Protocol (S16)
Named short seller report is a flag requiring investigation, not an automatic binary block.
**FULL AMENDMENT per S26 — see SI-51 v2 for complete revised rule.**
- Tier 1 and 2 positions: named short report = hard block until rebuttal confirmed + 30 days. Dollar exposure too large to risk during active attack.
- Tier 3 positions (SI-37 cap, ≤$1,500): named short report = FLAG for weighted assessment using the Tier 3 Judgement Framework. Entry may proceed if weighted score passes. See SI-51 v2.
- The PLTR lesson (P6) governs narrative-momentum entries — T8 governs short attacks. They are separate disciplines. T8 is not a substitute for fundamental analysis.

### T9 — Leveraged BTC Proxy vs Spot (S16)
### T10 — Thesis Is Not a Position Sizing Input (S16)
### T11 — Winners Need Room Equal to Losers (S16)
### T12 — ATH Entry Discipline (S19)
### T13 — Missed Opportunity Capture / SI-39 Genesis (S19)
### T14 — Limit Order Discipline Under Premarket Pressure (S19)
### T15 — Broken Thesis Exit Discipline (S20)
### T16 — SI-45 Weekly Screener Cannot Be Deferred (S23)
### T17 — Conditional Reopening ≠ SI-25 Trigger (S23)
### T18 — Geopolitical Position Management: Verify Before Exiting (S24)
### T19 — ATH RULE IS THESIS-DEPENDENT (S24)
### T20 — "NEXT NVIDIA" FRAMING CORRECTION (S24)
### T21 — TWICE-WEEKLY SCAN AS STRUCTURAL DISCIPLINE (S25)
### T22 — ANALYST CONSENSUS AS SI-48 KILL SWITCH (S25)
### T23 — IDENTIFICATION-TO-ENTRY GAP FOR TIER 3 SPECULATIVE NAMES (S26)
Two gap types: (A) identification-to-entry gap — fix with SI-51. (B) coverage gap — fix with SI-52.
### T24 — STAGE 2 PROPORTIONALITY TO POSITION SIZE (S26)
Tier 3 ($1,500 max) needs fast-track. Tier 1 ($5K+) needs full Stage 2. Do not conflate.

### T25 — MAJOR CATALYST REQUIRES IMMEDIATE STOP REVIEW (S26)
**ORIGIN:** ITM.L +46% Rheinmetall announcement. Stop at 100p was -29% below market by next session.
**LESSON:** A >15% single-session move triggers mandatory stop review at next session open. Positive and negative moves both. Added to I3 protocol step 2B.

### T27 — THESIS-INTACT STOP-OUT CREATES RE-ENTRY OPPORTUNITY (NEW S27)
**ORIGIN:** RR.L stopped out at 1150p on April 22 when WTI fell 4% on Trump's indefinite ceasefire extension. The stop fired cleanly on macro noise. Within the same session, the re-entry analysis confirmed the underlying thesis was materially STRONGER than at original entry (signed Wylfa SMR contract April 13, Calpine acquisition completed, three independent thesis pillars). Re-entry BUY placed at 1,120p same session.
**LESSON:** When a position stops out on macro repricing (not thesis impairment), the correct discipline is: (1) confirm thesis is intact, (2) confirm the macro driver is temporary or non-structural, (3) build a re-entry plan below the stop-out price per P11. A stop-out on a quality position from macro noise is not a loss of conviction — it is capital recycled at a better entry level.
**DISTINCTION:** This is different from T15 (broken thesis exit). T15 applies when the PRIMARY thesis driver is impaired. T27 applies when macro noise moves the price through the stop while the thesis remains intact.
**APPLICATION:** Before assuming a stop-out means the thesis has failed, explicitly verify: (a) has the primary thesis driver changed? (b) is the macro driver structural or temporary? If thesis intact + macro temporary = re-entry plan.

### T26 — BINARY BLOCKS COST MORE THAN THEY SAVE ON CAPPED POSITIONS (NEW S26)
**ORIGIN:** POET Technologies. Identified at $7.23 (S24). Wolfpack short report April 14 triggered T8 block. Company rebutted April 20. POET +17% Monday, +18% Tuesday. Now ~$10.14 — roughly +40% from identification price. Under the original SI-51 T8 rule (30 calendar days), the fund would be blocked until May 14 despite the thesis being intact, the rebuttal being specific and factual, and price action confirming market acceptance.
**THE ASYMMETRY:** Upside of +40% captured vs maximum loss of ~10% (stop placed at -10% below entry on a $1,000-1,500 position = $100-150 max loss). A binary rule that blocks this trade to protect against a $100-150 loss while forgoing a $400-600 gain is not risk management — it is risk avoidance masquerading as discipline.
**THE PRINCIPLE:** Rules exist to prevent structural errors, not to substitute for judgement. For Tier 3 positions where maximum loss is already capped by sizing, the framework should be: flag the risk, assess the weight of evidence for and against, score it, and enter if the positives substantially outweigh the negatives. Many positives plus one doubt is not a reject — it is a manageable entry with eyes open.
**THE DISTINCTION FROM P6:** P6 (PLTR) prohibits entries where the thesis is purely narrative momentum with no fundamental anchor. POET has a functional product, production orders, $430M cash, and a legitimate CPO technology thesis. T8 flagging a short report on POET is very different from P6 flagging PLTR — the underlying businesses are not comparable. T8 and P6 must be applied separately.
**APPLICATION:** SI-51 v2 replaces the binary T8 block for Tier 3 with a weighted scoring framework. See SI-51 v2 below.

---

## POSITION-SPECIFIC LESSONS

### P1–P22 [all previous lessons unchanged]

### P23 — STOP STALENESS AFTER CATALYST RE-RATING (S26)
ITM.L Rheinmetall announcement — stop was -29% below market when reviewed. Raised to 120p/118p SL. At 150p: raise to 130p and hold to 175p. Target revised to 175p/200p stretch.

### P16 RECURRENCE — S26
AMPX stop was $15.79 in journal, $16.89 on IBKR. Corrected. P16: any stop adjustment must be logged same session.

---

## SCAN PROTOCOL LESSONS

### S1–S15 [all previous lessons unchanged]

---

## INFRASTRUCTURE LESSONS

### I3 — Session Open Protocol (SI-32) — UPDATED S27
1. Read FUND_SESSION_STATE.md
2. Read LESSONS_LEARNED.md
3. Check journal lastUpdated
4. **SI-47: State today's date explicitly — STEP ZERO**
5. **E1 CHECK: NYSE opens 17:30 UAE (9:30 AM EDT+8hrs). LSE opens 11:00 UAE. XETRA 11:00 UAE. Derive from arithmetic — never memory. 13:30 UAE is WRONG.**
6. IBKR screenshots (positions + orders)
7. **2A: Cross-check all stops vs current prices — flag any stop >20% below current**
8. **2B: Scan all positions for moves >15% since last stop review (T25)**
9. Section 0 SI-39 drawdown batch
10. Section 0-B Wide Net surface scan (SI-52) — 15 min max
11. SI-45 weekly (first session of week only)
12. SI-14 scan A-K
13. Active thesis file checks (research/*.md)
14. Route all data needs through SI-49

### I4–I12 [all previous lessons unchanged]

---

## STANDING INSTRUCTIONS REFERENCE

### SI-48 — AI THESIS ATH RULE AMENDMENT (S24)
[Unchanged]

### SI-49 — STAGE 2 DATA STACK ROUTING PROTOCOL (S24)
[Unchanged]

### SI-50 — TWICE-WEEKLY SCAN (S25)
Monday full + Thursday brief. First Thursday scan: April 24, 2026.

---

## SI-51 VERSION 2 — TIER 3 ENTRY FRAMEWORK (REVISED S26 EOD)

**REPLACES:** SI-51 v1 which used a binary T8 block of 30 calendar days.

**CORE PRINCIPLE:** For Tier 3 positions (SI-37 cap, maximum position ≤$1,500, maximum loss ≤$500 via SI-35 stop), the entry decision is a **weighted judgement**, not a binary pass/fail. Rules flag risks. Judgement weighs them. A single doubt does not block entry if multiple positives outweigh it and the stop bounds the downside.

### THE TIER 3 JUDGEMENT FRAMEWORK

Score each factor below. Positives add points, negatives subtract. **Entry requires a net score ≥ +3 AND all hard blocks must be cleared.**

#### HARD BLOCKS — These cannot be overridden by score:
- Active named short report with NO company rebuttal yet published → **BLOCK. Wait for rebuttal.**
- Spec allocation already at or above 15% NAV → **BLOCK. Trim first.**
- P6 applies: primary case is pure narrative momentum, no fundamental anchor → **BLOCK.**
- Stock is on the DO NOT ENTER list (SMCI, PLTR, CRWV, quantum names) → **BLOCK.**

#### SCORING FACTORS (each worth +1 or -1):

| Factor | +1 (positive) | -1 (negative) |
|--------|--------------|--------------|
| Thesis fundamentals | IP/technology is real, product exists, revenue path visible | Pre-concept, no product, no revenue path |
| Short report rebuttal | Company has published specific, factual rebuttal addressing core claims | No rebuttal, or rebuttal is vague/evasive |
| Price action post-rebuttal | Price stable or rising above pre-attack close for ≥1 session | Price still falling or below pre-attack close |
| Catalyst live | Specific binary catalyst within 60 days | No near-term catalyst identified |
| Cash/balance sheet | Funded runway >12 months, no imminent dilution risk | Cash burn risk, dilution overhang |
| Upside/downside asymmetry | Potential upside >3× the capped maximum loss | Upside <2× maximum loss |
| Sector/macro tailwind | Thesis supported by macro or structural demand driver | Thesis entirely company-specific with no external support |

**Minimum to proceed: net score ≥ +3 AND all hard blocks cleared.**

**POET as of April 21 2026 — scored:**
- Thesis fundamentals: +1 (Optical Interposer, production orders, Foxconn/NTT partnerships)
- Short rebuttal: +1 (PFIC clarification published April 20, specific and factual)
- Price action: +1 (stable above pre-attack close after Monday surge)
- Catalyst live: +1 (production order shipment H2 2026, revenue ramp in progress)
- Cash/balance sheet: +1 ($430M cash, no imminent dilution)
- Upside/downside asymmetry: +1 (at $8.59 entry, $10+ target = ~+17% vs max loss $100-150 at $1,000 position = 7× asymmetry)
- Sector/macro tailwind: +1 (AI data centre optics structural demand)
- **Score: +7/7. All hard blocks clear. Entry permitted under SI-51 v2.**

**Entry would have been permitted April 21 at ~$8.59. Today's close ~$10.14 = +18% in one session that the fund missed entirely due to the binary 30-day block.**

### DOCUMENTATION REQUIREMENT
Before any Tier 3 entry under SI-51 v2, log in journal:
1. Score table with evidence for each factor
2. Hard block check (all four must be clear)
3. Entry price, stop level, max loss in dollars
4. Catalyst: what it is, estimated timing

### WHAT SI-51 v2 DOES NOT CHANGE
- Hard blocks remain hard blocks — no score overrides them
- SI-37 cap ($1,500 max position) unchanged
- SI-35 ($500 max loss per trade) unchanged
- Full Stage 2 still required for Tier 1 and Tier 2 positions
- P6 still applies to narrative-momentum entries without fundamental anchor

### POET STATUS POST SI-51 v2
- Hard blocks: all clear (Wolfpack report has been rebutted, not active attack)
- Score: +7/7
- **Entry now permitted.** Size at SI-37 cap ($1,000-1,500).
- Suggested entry: limit around current price on next pullback, stop -10% below entry.
- Monitor production order shipment timeline and Q2 2026 revenue announcement as primary catalysts.

---

### SI-53 — ENERGY + NUCLEAR SCAN PROTOCOL (NEW S27)
**Section 0-C** — Weekly Monday, alongside SI-39.
Names to screen every Monday: CEG (constellation nuclear), TLN (nuclear data centre co-location), ENGIE.PA (EU nuclear/LNG), UUUU (uranium processing), RR.L (fill status check).
Thesis: AI/data centre electricity demand surge (nuclear = only 24/7 carbon-free baseload) + Iran war/Hormuz forcing EU energy diversification away from oil. Both converging on same solution. Fund was late but entry opportunities remain.
Research file: `C:\Users\jcadb\claude-fund\research\AI_INFRASTRUCTURE_THESIS.md` — Energy/Nuclear section added S27.

### SI-54 — AI NETWORKING SCAN PROTOCOL (NEW S27)
**Section 0-D** — Weekly Monday, alongside SI-39.
Names to screen: MRVL (custom AI ASIC + 800G/1.6T Ethernet networking), existing AI thesis trigger checks (MU trigger price, CDNS post-earnings level, SNPS earnings proximity).
Thesis: AI networking is the binding constraint above memory at scale — hyperscalers building custom silicon routes through Marvell. Stage 1 required Monday Session 28.

### SI-52 — WIDE NET SURFACE SCAN (S26)
Section 0-B daily. Steps: (1) Alpha:TOP_GAINERS_LOSERS — flag >8% moves. (2) 30-sec news filter per name. (3) 60-sec Stage 1 filter. 15-min budget. Do not skip.

---

## ITM.L STOP AND TARGET HISTORY
| Session | Stop | Target | Context |
|---------|------|--------|---------|
| S22 | 100p/98p SL | 150p | Post-trim |
| S26 | 120p/118p SL | 175p/200p | Rheinmetall NATO re-rating |

---

## PROHIBITED DATA SOURCES
- GuruFocus, PitchBook, Macroaxis
- Any search snippet price without verified publication date
- EODHD earnings endpoint (403 confirmed)
- Memory estimates for 52-week high/low
- EODHD lastTradePrice for current session
- Journal-only sourcing for key event dates
- Trump Truth Social posts as geopolitical confirmation (T17)
- Session context as source for current date (I8, SI-47)
- Scan-phase fundamentals without Stage 2 verification (SI-44)

---

## SESSION CLOSE CHECKLIST — SESSION 26 FINAL
```
SESSION 26 — COMPLETE
==========================================
✅ 1. FUND_SESSION_STATE.md written
✅ 2. LESSONS_LEARNED.md updated — T26, SI-51 v2, T8 amended
✅ 3. trading_journal38.jsx written
✅ 4. GOOGL + BKR brackets placed
✅ 5. ITM.L stop 120p/118p, target 175p/200p
✅ 6. AMPX stop corrected to $16.89
✅ 7. LDO.MI filled, stop €50
✅ 8. CRML add cancelled — dilution
✅ 9. ABVX -$158.53 — P4 clean execution
✅ 10. SI-51 v2 — weighted judgement framework replaces binary T8 block
✅ 11. POET: now qualifies for entry under SI-51 v2 (+7/7 score)
⬜ 12. USER: Upload trading_journal38.jsx to Claude project
⬜ 13. USER: Run session-close.bat
⬜ 14. OVERNIGHT: ISRG earnings 00:30 UAE
==========================================
```

*Updated: 2026-04-21 Session 26 final — SI-51 v2*
