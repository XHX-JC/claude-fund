# LESSONS LEARNED — CLAUDE FUND
**Account:** U24936508 (IBKR Pro) | **Compiled through Session 32 (2026-04-29)**
**Journal version:** trading_journal48.jsx | **SIs:** 1-59

---

## ERROR TAXONOMY (SI-17) — 17 CODIFIED ERROR TYPES
| # | Error | Description | Prevention |
|---|-------|-------------|-----------|
| E1 | Timezone | Wrong open/close times | NYSE 17:30 UAE open. LSE 11:00 UAE (BST) / 12:00 UAE (GMT). XETRA 19:00 UAE close. |
| E2 | Stale position | Using journal vs IBKR | IBKR screenshot = ground truth |
| E3 | Fill re-flag | Flagging executed orders as pending | Check fills first |
| E4 | Price verification | Acting on unverified prices | MMD primary |
| E5 | Market timing | Acting outside hours | Verify exchange |
| E6 | Dividend capture | Selling before ex-div | Check calendar |
| E7 | Session discipline | Thesis drift | Re-read SI-25 |
| E8 | Stale quote | Using stale price as live | MMD mandatory |
| E9 | GTC orphan | Stop persists after market sell | Cancel stop FIRST |
| E10 | Closed position scan | Closed position in live scan | Cross-reference positions[] |
| E11 | 52wk hallucination | Memory for 52wk range | EODHD extended quotes mandatory |
| E12 | Tool routing gap | Wrong tool for data | MMD=current. EODHD=52wk |
| E13 | EODHD delay | EODHD price stale 4-6 days | Use MMD |
| E14 | Date discrepancy | Wrong event dates | 2+ primary sources |
| E15 | AIM stop limitation | No IBKR stops on AIM | Manual alert protocol |
| E16 | Tracker-Journal drift | Positions mismatch | Reconcile every session open |
| E17 | Stop modification sequencing | Stop fires during discussion | Cancel FIRST, then debate |

---

## THESIS & STRATEGY LESSONS (T1-T22 — see S31 for full text)

### T23 — DELIBERATE EXIT BEFORE EARNINGS BINARY (NEW S32)
**ORIGIN:** CCJ at $119.27 pre-market with stop $116.96 (1.93% clearance) and May 5 earnings 6 days away. Decision to sell at market open ($119.97) and place re-entry bracket ($117/$110) rather than hold through the binary with inadequate clearance.
**LESSON:** When a position has drifted to within 2% of its stop AND a significant earnings binary is within one week, the disciplined action is often a deliberate exit at market rather than relying on the stop. The stop does not protect against earnings gaps. Selling deliberately at $119.97 banked $780 cleanly. The re-entry bracket at $117 captures the same thesis at a better price if the stock dips on earnings disappointment. The cost of missing a rally is the opportunity cost — acceptable vs the asymmetric gap risk.
**KEY DISTINCTION:** This is not stop-widening (which is prohibited) and not thesis-breaking (the nuclear thesis is intact). It is tactical position management to eliminate gap risk while preserving re-entry optionality.
**APPLICATION:** When clearance falls below 2% AND an earnings binary is within 7 days, evaluate deliberate exit + re-entry bracket as preferred alternative to stop-dependent hold.

### T24 — STOP RAISE LOGIC FOR SAME-DAY EARNINGS (NEW S32)
**ORIGIN:** MSFT discussion — user proposed raising stop before AMC earnings tonight. Analysis showed: (1) gap risk same at any stop level, (2) only scenario where higher stop helps is slow intraday drift before close, (3) raising too high creates pre-close stop-out risk on afternoon jitters.
**LESSON:** Raising a stop on earnings day has a narrow window of usefulness. The correct ceiling for a same-day earnings stop raise is approximately 3-3.5% below current price — tight enough to capture intraday drift protection but loose enough to survive pre-earnings afternoon volatility. Going above that threshold on earnings day introduces more risk than it removes.
**MSFT EXECUTION:** Stop raised $400.43 to $404.86 (3.3% below $419.75 pre-market). Locks $802 on 25sh. Within the defensible range.

---

## POSITION-SPECIFIC LESSONS (P1-P21 — see S31 for full text)

### P22 — SUPPLIER DRAG PERSISTENCE ON BUYER STOCK (NEW S32)
**ORIGIN:** MRVL continued declining from $158 to $149 across S31-S32 on POET/Celestial AI overhang — two days of consecutive pressure despite no new negative MRVL-specific news.
**LESSON:** When a stock declines on supplier relationship noise rather than fundamental news, the market often takes 3-5 sessions to fully digest and move on. The position may stay uncomfortable before recovering. The correct response is to verify the primary thesis remains intact (Google ASIC — confirmed), verify the stop is adequate (12% below current — confirmed), and hold without reacting to daily mark-to-market. Forced exits on sentiment noise rather than thesis breaks crystallise losses unnecessarily.
**APPLICATION:** For any position declining on secondary news, explicitly ask: (1) is the PRIMARY entry thesis broken? (2) is the stop at risk today? If both answers are no, hold and do not adjust stop downward.

---

## SCAN PROTOCOL LESSONS (S1-S13 — see S31 for full text)

### S14 — PRE-EARNINGS GAP RISK CANNOT BE STOP-MANAGED (NEW S32)
**ORIGIN:** CCJ and MSFT stop discussions S32. Multiple scenarios analysed where stops at different levels produce identical outcomes on earnings gaps.
**LESSON:** Stop orders are not gap protection instruments. For earnings events, the choice is binary: hold through the print (accept gap risk at any stop level) or exit deliberately before the print (eliminate gap risk entirely). Any attempt to "manage" earnings gap risk through stop placement is a false sense of security. The correct question before earnings is not "where should I set my stop" but "do I want to hold through this print at all?"
**APPLICATION:** Pre-earnings review for every position should explicitly state: (1) am I holding through the print? If yes, accept gap risk. If no, sell deliberately and set re-entry.

---

## INFRASTRUCTURE LESSONS (I1-I12 — see S31 for full text)

---

## STANDING INSTRUCTIONS REFERENCE

### SI-25 — EXIT TRIGGER
WTI ~$99. Trigger $100.38. Gap ~$1.40. NOT TRIGGERED. Condition: permanent Hormuz reopening + WTI -10% from $111.54.

### SI-47 — DATE VERIFICATION STEP ZERO
System prompt date is authoritative. State before any analysis.

### SI-57 — P11 LOG
LEU: stopped $170.26, GTC $168/stop $150.
CODA: stopped $11.42 actual, re-entry 250-300sh below $11.51, stop below $10.50. Reassess Thursday — 72hr elapsed.
CCJ: stopped N/A — deliberate exit $119.97. Re-entry GTC $117/stop $110/50sh. Not P11 — thesis intact exit.

### SI-59 — STOP MODIFICATION SEQUENCING
Cancel existing stop FIRST. Confirm Cancelled. Then debate. Then place new stop.

---

## SESSION CLOSE CHECKLIST — SESSION 32
- trading_journal48.jsx written
- FUND_SESSION_STATE.md written
- LESSONS_LEARNED.md updated (T23, T24, P22, S14)
- Trade 24 (ITM) and Trade 25 (CCJ) added to tracker
- MSFT stop confirmed $404.86
- CCJ re-entry bracket confirmed active
- User action: run session-close.bat (GitHub backup)
- Thursday: VST decision, NOG Q1, MSTR entry, post-earnings assessment
