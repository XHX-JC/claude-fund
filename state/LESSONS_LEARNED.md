# LESSONS LEARNED — CLAUDE FUND
**Account:** U24936508 (IBKR Pro) | **Compiled through Research Day 26 April 2026 FINAL**
**Journal version:** trading_journal44.jsx | **SIs:** 1–58

---

## ERROR TAXONOMY (SI-17) — 16 CODIFIED ERROR TYPES
| # | Error | Description | Prevention |
|---|-------|-------------|-----------|
| E1 | Timezone | Wrong open/close times | NY=UTC-4, UAE=UTC+4. COMPUTE always. |
| E2 | Stale position | Using journal prices vs IBKR | IBKR screenshot = ground truth |
| E3 | Fill re-flag | Flagging executed orders as pending | Check IBKR fills before action items |
| E4 | Price verification | Acting on unverified prices | MMD primary, EODHD extended for 52wk |
| E5 | Market timing | Acting outside hours | Compute, never recall |
| E6 | Dividend capture | Selling before ex-div | Check ex-div dates before any sale |
| E7 | Session discipline | Thesis drift in fatigue | Re-read SI-25 before late-session trades |
| E8 | Stale quote | Using stale quote as live | Live price check mandatory before execution |
| E9 | GTC orphan | GTC stop persists after market sell | Cancel stop BEFORE market sell |
| E10 | Closed position scan | Closed position in live scan | Cross-reference tracker before any scan |
| E11 | 52-week high hallucination | 52wk range from memory | MANDATORY: use EOD:get_us_live_extended_quotes |
| E12 | Tool routing gap | Wrong tool for data type | MMD=current price. EODHD=52wk range. |
| E13 | EODHD price delay | EODHD lastTradePrice 4-6 days stale | Use MMD for current session price |
| E14 | Journal date discrepancy | Key event dates wrong | Cross-reference 2+ primary sources |
| E15 | AIM stop limitation | No IBKR GTC stops for AIM stocks | Manual alert only for IES.L |
| E16 | Tracker-Journal drift | Position in journal but not tracker or vice versa | Cross-reference BOTH at session open AND close |

---

## THESIS & STRATEGY LESSONS

### T1–T20 — [See prior sessions]

### T21 — DISCOVERY SCAN METHODOLOGY
**ORIGIN**: First structured weekend discovery scan across 6 sector angles.
**LESSON**: Broad market scans use: (1) sector discount framework overlay, (2) 6 systematic angles, (3) P13/SI-39/T15/P11 applied immediately to every name. Results go to watchlist — no trades on discovery day.
**APPLICATION**: SI-55 created.

### T22 — DOGE FEAR VS FUNDAMENTAL IMPAIRMENT
**ORIGIN**: LDOS Stage 2 confirmed: actual DOGE cancellation = $560K on $146 stock. Market destroyed $8B of market cap on $560K of real contract loss.
**LESSON**: Before exiting or avoiding any defence/government IT name on DOGE narrative, verify: (1) book-to-bill ratio, (2) backlog level and trend, (3) whether affected contracts are mission-critical vs discretionary social programs. Mission-critical classified work cannot be unilaterally cancelled.
**APPLICATION**: T22 check is mandatory for any DOGE-narrative selloff in government IT names.

### T23 — GTC SIZING IS BASED ON WORST-CASE CASH FLOOR, NOT NET PENDING
**ORIGIN**: LDOS Stage 2 — initially reduced 45sh to 30sh due to netting pending GTC orders as if they were already deployed cash. This was wrong.
**LESSON**: GTC limit orders below current market price do NOT consume cash until filled. Cash floor check for sizing purposes = current cash base minus floor minimum. Pending GTC orders are theoretical, not real, until filled. If multiple GTC orders fill simultaneously on a large down day, review and cancel the least convicted name — but do not pre-shrink all positions based on this theoretical worst case. Size each position independently on its own merit and risk parameters.
**APPLICATION**: Position sizing uses SI-35 ($500 max loss) and cash floor rule ($27,669 - $10,570 = $17,099 available). Period.

---

## POSITION-SPECIFIC LESSONS

### P11 — Re-Entry Below Stop-Out Price [LEU active]
Re-entry only after price pulls back below stop-out level.
**LEU STATUS**: Stop-out $170.26 (Apr 7). Current $205.63 > $170.26. P11-compliant GTC $168, stop $150, 27sh.

### P21 — P11 Active Position Tracking
Before any re-entry recommendation, check tracker for prior positions. Flag P11 status immediately.

---

## SCAN PROTOCOL LESSONS

### S13 — Tracker-Journal Drift Is E16
LEU lost for 8 sessions. P11 nearly violated. Fix via SI-56.

### S14 — ATH Table Staleness
Update ATH reference levels whenever a name hits new 52wk high. VRT/ETN/GEV/ANET/AVGO all above S24 reference levels — update mandatory at S30 open.

### S15 — Stage 2 Primary Source Discipline (NEW Research Day FINAL)
**ORIGIN**: LDOS Stage 1 scan cited 1.3x book-to-bill. Stage 2 primary source research (SEC filings, earnings release) confirmed the actual figure is 1.02x. The -25% net bookings decline was also missed in Stage 1.
**LESSON**: Stage 1 scan data from secondary sources (news aggregators, screeners) should never be treated as confirmed fundamental figures. Every key metric that drives a buy decision (book-to-bill, backlog growth rate, earnings beat rate, margins) must be sourced from primary documents in Stage 2 before entry is authorised. Stage 1 is hypothesis generation. Stage 2 is verification.
**APPLICATION**: Stage 2 checklist must explicitly note the data source for each key metric. If a Stage 1 figure cannot be confirmed in Stage 2, it is WRONG until proven otherwise.

---

## INFRASTRUCTURE LESSONS

### I17 — Tracker-Journal Sync Is Mandatory
SI-56 — cross-reference at every session close.

### I18 — C Drive Directory Structure Confirmed
- `C:\Users\jcadb\Claude Date File` — original files, old journals v01-v31
- `C:\Users\jcadb\claude-fund` — current: journal/, state/, tracker/, research/

### I19 — Research Day Protocol (NEW Research Day FINAL)
**ORIGIN**: Sunday 26 Apr — 5 Stage 2s completed in single research day.
**LESSON**: Structured research days (non-trading) are high-value sessions that should be treated with the same discipline as live trading sessions. Close protocol: (1) All Stage 2 verdicts logged in journal, (2) All watchlist entry triggers confirmed and priced, (3) Pending orders section updated with NOT YET PLACED entries, (4) All three files written to C Drive, (5) Tracker xlsx downloaded and saved manually. No work is "done" until the files are written.

---

## STANDING INSTRUCTIONS REFERENCE

### SI-55 — WEEKEND DISCOVERY SCAN PROTOCOL
Run SI-45 + 6-angle discovery scan on non-trading days. Apply P13/SI-39/T15/P11. No trades on discovery day. Results to watchlist.

### SI-56 — TRACKER-JOURNAL SYNC MANDATORY
Every session close: verify tracker matches journal. Any change requires same-session tracker update. E16 if drift detected.

### SI-57 — P11 APPLICATION LOG
**LEU**: stop-out $170.26 (Apr 7). P11-compliant GTC $168, stop $150, 27sh. Update when condition met (price below $170.26).

### SI-58 — EXTERNAL CAPITAL DEPLOYMENT RULES (NEW)
External capital into account only when ALL conditions met:
1. **≥75% conviction** — not standard SI-39 entries
2. **Verified primary thesis** — Stage 2 complete, no open questions
3. **Catalyst within 4 weeks** — not speculative
4. **Upside >30% to conservative (not consensus) target**
5. **Meaningful at fund scale** — not marginal add

**Current pipeline**: No names meet the 75% bar as of Research Day 26 Apr. LDOS is ~65% conviction — account cash, standard sizing. Cash floor rule ($10,570 minimum) always applies regardless.

---

## GTC POSITION SIZING RULES (SI-35 + T23)
- SI-35: Maximum $500 loss per trade (stop distance × shares)
- T23: GTC orders below market do not consume cash until filled. Size based on: (1) cash base minus floor ($17,099 available), (2) SI-35 loss limit. Do NOT reduce sizing due to theoretical simultaneous GTC fill.
- Worst case all 4 Monday GTC fill = $16,227 deployed, $11,442 remaining — above $10,570 floor

---

## 52-WEEK DATA PROTOCOL (E11-E13)
- **Current price (US):** MMD `/v2/aggs/ticker/{TICKER}/prev` → `c` field
- **52-week high/low:** EOD:get_us_live_extended_quotes
- **EU/UK:** web_fetch Yahoo Finance
- **NEVER use memory for price, range, or ATH levels**

---

## PROHIBITED DATA SOURCES
- EODHD lastTradePrice for current session (may be 4-6 days stale)
- Memory estimates for 52-week high/low or ATH levels
- Trump Truth Social posts as confirmation of geopolitical facts (T17)
- System prompt date from session context — system prompt only (SI-47)
- Stage 1 scan data as confirmed fundamental figures without Stage 2 primary source verification (S15)
- Prior journal version as ground truth for position state (IBKR is ground truth)
