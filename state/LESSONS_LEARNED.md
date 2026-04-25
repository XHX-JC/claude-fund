# LESSONS LEARNED — CLAUDE FUND
**Account:** U24936508 (IBKR Pro) | **Compiled through Session 29 Supp (2026-04-25)**
**Journal version:** trading_journal42.jsx | **SIs:** 1–54

---

## ERROR TAXONOMY (SI-17) — 15 CODIFIED ERROR TYPES
| # | Error | Description | Prevention |
|---|-------|-------------|-----------|
| E1 | Timezone — CRITICAL RECURRING FAILURE | Wrong market open/close times stated from memory without arithmetic check. | **MANDATORY:** Write UAE time now = X. NYSE closes 00:00 UAE. Is X before 00:00? LSE closes 19:30 UAE. Is X before 19:30? XETRA closes 19:00 UAE. COMPUTE — NEVER RECALL. NYSE opens 17:30 UAE / LSE 12:00 UAE / XETRA 11:00 UAE. Dubai = UTC+4 year-round. EDT = UTC-4 (Mar-Nov). |
| E2 | Stale position | Using journal prices vs IBKR | IBKR screenshot = ground truth always |
| E3 | Fill re-flag | Flagging executed orders as pending | Check IBKR fills before action items |
| E4 | Price verification | Acting on unverified prices | MMD primary, EODHD extended quotes for 52wk range |
| E5 | Market timing | Acting outside hours | NYSE closes 00:00 UAE (midnight). LSE 19:30. XETRA 19:00. Derive from arithmetic always. |
| E6 | Dividend capture | Selling before ex-div | Check ex-div dates before any LSE sell |
| E7 | Session discipline | Thesis drift in fatigue | Re-read SI-25 before late-session trades |
| E8 | Stale quote | Using stale quote as live | Live price check mandatory before execution |
| E9 | GTC orphan | GTC stop persists after market sell | Cancel stop BEFORE market sell |
| E10 | Closed position scan | Closed position in live scan | Cross-reference SI-19 before scan |
| E11 | 52-week high hallucination | Stating 52wk range from memory | MANDATORY: use EOD:get_us_live_extended_quotes |
| E12 | Tool routing gap | Wrong tool for data type | SI-49 is authoritative routing guide |
| E13 | EODHD price delay | EODHD lastTradePrice may be stale | Use MMD for current session price |
| E14 | Journal date discrepancy | Key event dates wrong in journal | Cross-reference 2+ primary news sources. **S29 SUPP EXAMPLE: ABBV earnings stated as Tue Apr 28 AMC in journal — correct date is Wed Apr 29 BMO (confirmed Zacks, TradingView, TIKR).** Earnings dates must be verified against primary sources at the time of writing, not assumed from memory or prior session notes. |
| E15 | AIM stop limitation | IBKR does not support stops for AIM securities | Manual price alert. IES.L confirmed. |

---

## PERFORMANCE AUDIT
| Metric | S20 Baseline | S29 Supp Update |
|--------|-------------|-----------------|
| Net realized P&L (USD) | ~-$2,073 | ~-$2,549 (LLY -$89.41 added) |
| ITM trim realized | — | +£1,261 combined (trims 1+2) |
| RR.L stop-out | — | -£49.35 (S27, re-entry S28) |
| Open unrealized | ~+$5,505 | ~+$7,469 |
| Net Liquidity | ~$102,800 | $105,700 |
| Positions | 14 | 18 |

---

## THESIS & STRATEGY LESSONS

### T1–T27 [unchanged from S28]

### T28 — STOPS DRIFT BELOW COST BASIS ON WINNING POSITIONS (S28)
At session start, flag any position where: (a) stop is below cost basis AND position is up >10%, OR (b) stop-to-current-price gap exceeds 20% on a position up >15%. Added to I3 session open protocol step 2A.

### T29 — WEEKEND RESEARCH SESSIONS PRESERVE SESSION TOKENS (NEW S29 SUPP)
**ORIGIN:** Session 29 supplementary research on Saturday April 25 — full scan, 5 Stage 2 analyses, order reviews, and earnings prep completed with no time pressure and ample tokens.
**LESSON:** When markets are closed and time is available, deep-dive research sessions are highly efficient. Stage 2 analyses that would consume a full trading session can be completed in advance, leaving Monday sessions free for execution and active monitoring rather than analysis under time pressure.
**APPLICATION:** Use weekend sessions for: (a) all pending Stage 2 research, (b) pending order reviews, (c) earnings prep for the coming week, (d) watchlist reassessment. Keep Monday sessions lean — execute, scan, monitor.

---

## POSITION-SPECIFIC LESSONS

### P1–P24 [unchanged from S28]

### P25 — WATCHLIST ENTRY PRICES BECOME STALE RAPIDLY IN MOMENTUM MARKETS (NEW S29 SUPP)
**ORIGIN:** CRDO was researched at $159.70 (-25% from ATH) as a SI-39 drawdown entry. Between research date (April 16) and Saturday April 25, CRDO ran to $194.69 — a 22% move in 9 days. The SI-39 drawdown trigger was run through completely while the position was in the research queue.
**LESSON:** When a name is in the Stage 2 research queue but entry has not yet been confirmed, the entry premise can expire quickly in high-momentum sectors. Watchlist prices require active monitoring even before a trade is placed. A name showing -25% drawdown one week may be at -9% the next.
**APPLICATION:** At each session open, before reviewing research queue: check watchlist names for price movement >15% since last assessment. If a name has rallied through its entry thesis, reassess immediately rather than proceeding with stale analysis. For CRDO specifically: new SI-39 trigger set at $181.73 (-15% from current ATH of $213.80).

---

## SCAN PROTOCOL LESSONS

### S1–S12 [unchanged]

---

## INFRASTRUCTURE LESSONS

### I3 — Session Open Protocol (SI-32) — UPDATED S27, S28, S29 SUPP
1. Read FUND_SESSION_STATE.md
2. Read LESSONS_LEARNED.md
3. Check journal lastUpdated
4. **SI-47: State today's date explicitly — STEP ZERO**
5. **E1 CHECK: NYSE 17:30 UAE / LSE 12:00 UAE / XETRA 11:00 UAE. Compute — never recall.**
6. IBKR screenshots (positions + orders)
7. **2A: Cross-check all stops vs current prices. Flag: (a) stop below cost AND position up >10%, (b) stop-to-price gap >20% on position up >15% (T28)**
8. **2B: Scan watchlist names for moves >15% since last assessment (P25)**
9. Section 0 SI-39 drawdown batch
10. Section 0-B Wide Net surface scan (SI-52) — 15 min max
11. SI-45 weekly (first session of week only)
12. SI-14 scan A-K
13. Active thesis file checks (research/*.md)
14. Route all data needs through SI-49

### I4–I13 [unchanged from S28]

### I14 — WEEKEND RESEARCH PROTOCOL (NEW S29 SUPP)
**ORIGIN:** Session 29 supplementary Saturday research session.
**STANDARD:** When a weekend research session is conducted:
- All Stage 2 research outputs are written to FUND_SESSION_STATE.md with full entry parameters
- Pending orders (with exact prices, stops, share counts) are queued in state file
- Monday session open begins with EXECUTION of pre-approved decisions, not new analysis
- Research files (AI_INFRASTRUCTURE_THESIS.md etc.) updated with reassessment findings
- Three core journal files written at end of weekend session same as regular session close

---

## STANDING INSTRUCTIONS REFERENCE

### SI-25 — EXIT TRIGGER
WTI -10% from $111.54 peak = trigger at **$100.38**. WTI Fri close ~$94-95. Gap ~$5-6. NOT TRIGGERED. Weekend binary Pakistan talks: breakthrough = oil -$10-20, monitor. Ceasefire extension alone is NOT SI-25 trigger.

### SI-47 — DATE VERIFICATION — STEP ZERO
System prompt date is authoritative. State date before any analysis. Non-negotiable.

### SI-48 — AI THESIS ATH RULE AMENDMENT
Four tests: (1) fwd PE below sector or PEG<1.5, (2) structural catalyst path multi-year backlog, (3) no multiple expansion required, (4) PLTR P6 test. S29 SUPP: CEG passes all 4. SNPS borderline pass (PEG 2.07x but drawdown justifies). HPE passes (wait Jun 2). CRDO: entry missed — price ran through drawdown trigger.

### SI-51 v2 — TIER 3 WEIGHTED JUDGEMENT [Unchanged]
### SI-52 — WIDE NET SURFACE SCAN [Unchanged]
### SI-53 — ENERGY + NUCLEAR SCAN [Unchanged]
### SI-54 — AI NETWORKING SCAN [Unchanged]

**NOTE: SI-55 and SI-56 (Claude Code routine protocols) remain PENDING — add once routines confirmed working.**

---

## STAGE 2 RESEARCH LOG (S29 SUPP)

| Name | Date | Verdict | Entry | Stop | Shares | Catalyst |
|------|------|---------|-------|------|--------|---------|
| CEG | 2026-04-25 | ENTRY AUTHORISED | $308 GTC | $278 | 14 | May 11 Q1 |
| HPE | 2026-04-25 | WAIT JUN 2 | $25-27 post-Q2 | $23 | 125-150 | Jun 2 Q2 |
| SNPS | 2026-04-25 | ENTRY AUTHORISED | $495 GTC | $440 | 8 | May 20 Q2 |
| CRDO | 2026-04-25 | NO ENTRY — PRICE RAN | n/a | n/a | n/a | New trigger $181.73 |
| MRVL | 2026-04-25 | WATCHLIST | $152 GTC (verify Mon) | $135 | 10 | Late May Q1 FY27 |

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
- EODHD earnings endpoint (403 confirmed)
- Memory estimates for 52-week high/low
- EODHD lastTradePrice for current session
- Journal-only sourcing for key external event dates without primary news verification
- Trump Truth Social posts as geopolitical confirmation (T17)
- Session context as source for current date (I8, SI-47)
- Scan-phase fundamentals without Stage 2 verification (SI-44)
- **NEW S29 SUPP: Watchlist entry prices assumed valid without checking current price against last assessment date (P25)**

---

*Updated: 2026-04-25 Session 29 Supplementary Research — T29, P25, I14 added. E14 ABBV example added. Stage 2 log table added.*
