# LESSONS LEARNED — CLAUDE FUND
**Account:** U24936508 (IBKR Pro) | **Compiled through Session 26 (2026-04-21)**
**Journal version:** trading_journal37.jsx | **SIs:** 1–52

---

## ERROR TAXONOMY (SI-17) — 15 CODIFIED ERROR TYPES
| # | Error | Description | Prevention |
|---|-------|-------------|-----------|
| E1 | Timezone | Wrong open/close times | NY=UTC-4, UAE=UTC+4. 13:30 UAE=09:30 NY open. LSE=12:00-20:30 UAE |
| E2 | Stale position | Using journal prices vs IBKR | IBKR screenshot = ground truth always |
| E3 | Fill re-flag | Flagging executed orders as pending | Check IBKR fills before action items |
| E4 | Price verification | Acting on unverified prices | MMD primary, EODHD extended quotes for 52wk range |
| E5 | Market timing | Acting outside hours | LSE closes 20:30 UAE, NYSE 00:00 UAE |
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
| Open unrealized | ~+$5,505 | ~+$7,686 |
| Net Liquidity | ~$102,800 | $105,300 |
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
**AMENDMENT per SI-51:** T8 block lifts 30 days post-rebuttal for Tier 3 entries only. Full block remains for Tier 1 and 2.
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

### T25 — MAJOR CATALYST REQUIRES IMMEDIATE STOP REVIEW (NEW S26)
**ORIGIN:** ITM.L Rheinmetall Giga PtX announcement April 17 (+46% single day). Stop at 100p/98p SL was valid at the time it was set (~124p). By the time the IBKR screenshot was reviewed in S26, price was 141.15p — the stop had become -29% below market, leaving £830 of open gain unprotected.
**LESSON:** A >15% single-session move in any held position is a stop review trigger, regardless of whether the move is positive or negative. Positive moves that leave the stop far below market are just as dangerous as negative moves — they represent unrealised gains that are exposed unnecessarily. The current stop must be reassessed at the very next session open after any major catalyst move.
**APPLICATION:** Added to I3 session open protocol as step 2B: "Scan all positions for moves >15% since last stop review. Any such position requires immediate stop reassessment before proceeding with the wider scan." This is distinct from P10 (which triggers when price exceeds original target) — T25 triggers on move magnitude regardless of target proximity.

---

## POSITION-SPECIFIC LESSONS

### P1 — P22 [all previous lessons unchanged]

### P23 — STOP STALENESS AFTER CATALYST RE-RATING (NEW S26)
**ORIGIN:** ITM.L S26. After Rheinmetall announcement (+46%), the stop at 100p/98p SL had been set post-S22 trim at ~124p price. By S26, price was 141p — stop was -29% below market. Not reviewed until S26 IBKR screenshot, by which point it had been stale for 4 days.
**LESSON:** When a position receives a major binary catalyst that moves it >15% in a single session, the stop review cannot wait for the next scheduled session review. It must happen at the opening of the next trading session. Leaving a stop -29% below market on a +116% gain is not caution — it is negligence toward open profit.
**FIX:** ITM.L stop raised S26 from 100p/98p to 120p/118p SL. Locks in minimum £1,099 gain vs £1,521 current unrealised.
**TARGET REVISION:** ITM.L target revised from 150p to 175p primary / 200p stretch. Rheinmetall NATO e-fuel collaboration adds a defence/sovereign fuel demand layer to the original EU energy transition thesis. Dovetails with existing R3NK and CODA defence holdings. At 150p: raise stop to 130p and hold to 175p. At 175p: reassess with fresh Stage 1/2.

### P16 RECURRENCE — S26
AMPX stop was raised to $16.89 in S25 but journal recorded $15.79. Corrected in S26 via IBKR ground truth per P8. P16 governing rule: any stop adjustment on IBKR must be logged same session, confirmed in journal close block.

---

## SCAN PROTOCOL LESSONS

### S1–S15 [all previous lessons unchanged]

---

## INFRASTRUCTURE LESSONS

### I3 — Session Open Protocol (SI-32) — UPDATED S26
1. Read FUND_SESSION_STATE.md
2. Read LESSONS_LEARNED.md
3. Check journal lastUpdated
4. **SI-47: State today's date explicitly — STEP ZERO**
5. IBKR screenshots (positions + orders)
6. **2A: Cross-check all stops vs current prices — flag any stop >20% below current**
7. **2B: Scan all positions for moves >15% since last stop review (T25) — reassess before proceeding**
8. Section 0 SI-39 drawdown batch
9. Section 0-B Wide Net surface scan (SI-52) — 15 min max
10. SI-45 weekly (first session of week only)
11. SI-14 scan A-K
12. Active thesis file checks (research/*.md)
13. Route all data needs through SI-49

### I4–I12 [all previous lessons unchanged]

---

## STANDING INSTRUCTIONS REFERENCE

### SI-48 — AI THESIS ATH RULE AMENDMENT (S24)
[Unchanged]

### SI-49 — STAGE 2 DATA STACK ROUTING PROTOCOL (S24)
[Unchanged]

### SI-50 — TWICE-WEEKLY SCAN (S25)
Monday full + Thursday brief. First Thursday scan: April 24, 2026.

### SI-51 — TIER 3 FAST-TRACK PROTOCOL (S26)
Four tests: T8 cleared (30 days), binary catalyst within 60 days, spec allocation ≤15% NAV, SI-37 sizing. All four must pass. Documents four items in journal before entry.
**POET recheck date:** May 14 2026 (30 days post Wolfpack report April 14).

### SI-52 — WIDE NET SURFACE SCAN (S26)
Section 0-B daily. Steps: (1) Alpha:TOP_GAINERS_LOSERS — flag >8% moves. (2) 30-sec news filter per name. (3) 60-sec Stage 1 filter. 15-min budget. Do not skip.

---

## ITM.L STOP HISTORY
| Session | Stop | Context |
|---------|------|---------|
| S22 (post-trim) | 100p/98p SL | Set after trim at ~124p |
| **S26 (Apr 21 2026)** | **120p/118p SL** | **Rheinmetall NATO re-rating — P10 + P23** |

## ITM.L TARGET HISTORY
| Session | Target | Basis |
|---------|--------|-------|
| Original | 150p | EU energy transition thesis |
| **S26** | **175p primary / 200p stretch** | **Rheinmetall Giga PtX NATO deal** |

---

## PROHIBITED DATA SOURCES
[Unchanged from S25]

---

## SESSION CLOSE CHECKLIST — SESSION 26
```
SESSION CLOSE CHECKLIST — SESSION 26
==========================================
✅ 1. FUND_SESSION_STATE.md written
✅ 2. LESSONS_LEARNED.md updated — T25, P23, I3 updated, SI-51/52 confirmed
✅ 3. GOOGL BUY $315 + Stop $285 placed
✅ 4. BKR BUY $58.50 + Stop $53.50 placed
✅ 5. ITM.L stop raised: 100p/98p → 120p/118p SL (P10 + P23)
✅ 6. AMPX stop corrected: $15.79 → $16.89
✅ 7. LRCX Stage 1 complete — entry conditional on Wed post-earnings dip
✅ 8. ITM.L target revised: 150p → 175p/200p
✅ 9. ABVX: user conducting M&A intel — stop unchanged $114.31
⬜ 10. Write trading_journal38.jsx
⬜ 11. USER: Upload trading_journal38.jsx to Claude project
⬜ 12. USER: Run session-close.bat
⬜ 13. OVERNIGHT: ISRG earnings 00:30 UAE
⬜ 14. TOMORROW: AMZN + LRCX earnings AMC — entry plans ready
==========================================
```

*Updated: 2026-04-21 Session 26 close*
