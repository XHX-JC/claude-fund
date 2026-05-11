# SESSION 14 RECAP — POST-JOURNAL CHANGES
**Date:** 2026-04-10 | **Integrate into journal v19 at Monday session open**
**Journal current version:** trading_journal19.jsx

---

## 1. SHLD — FINAL REALISED P&L (CORRECTED)

**What happened:**
- SHLD sold at market open: **69 shares @ $73.34** → realised +$90.74
- Old GTC Stop Limit ($73.37 trigger / $72.60 limit) was NOT cancelled before market sell
- Stop Limit also triggered and filled @ $73.21 → created unintended SHORT of -69 shares
- Short closed immediately: BUY 69 @ **$72.846** → short profit +$25.12
- **Total SHLD realised P&L: +$115.86**

**New SI-17 error type to add (E9):**
> Always cancel existing GTC stop/stop-limit orders IMMEDIATELY when a position is sold at market. GTC orders persist independently — selling the position does not remove the stop. Protocol: cancel stop FIRST, then place market sell — OR cancel stop the moment the market sell fill is confirmed.

**SHLD position status:** ZERO. Fully closed. No remaining exposure.

---

## 2. AMZN — STOP ORDER UPGRADED

**Old order (cancelled):** Stop $212.13 GTC
**New order (live, confirmed submitted):** Stop Limit — trigger **$222.00** / limit **$219.00** / GTC

Locks in minimum ~$630 profit on 30 shares if triggered vs ~$330 under old stop.
IBKR rejected $215 limit (gap too wide) — $219 accepted and submitted successfully.

---

## 3. CASH POSITION UPDATE

From IBKR screenshot post all trades:
- **USD Cash: $41,315**
- **Base Cash: $37,053**
- EUR Cash: €370
- GBP Cash: -£3,488
- Total Net Liquidity: ~$98,900

Cash is higher than v19 estimated ($36,272 USD) due to SHLD double-fill proceeds both landing. Update fund.cashUSD to $41,315 and fund.cash/cashBase accordingly.

---

## 4. POSITIONS — FINAL COUNT

**12 long positions.** SHLD fully closed (long sold + short covered).
All 12 GTC stops confirmed live from orders screenshot.
AMZN stop now Stop Limit $222/$219 (updated from plain Stop $212.13).

---

## 5. MONDAY DEPLOYMENT PLAN (CONFIRMED)

**Step 1:** Confirm SHLD fill details in IBKR Trades tab. Log exact prices.
**Step 2:** Update AMZN stop in journal to Stop Limit $222/$219.

**Pool A — deploy on Islamabad stall/breakdown signal:**
| Ticker | Entry | Stop | Size | Target |
|--------|-------|------|------|--------|
| RTX | $200–205 | $183 | $3,000–3,500 | $245 |
| LNG | $260–270 | $228 | $2,500–3,000 | $400 |
| OXY | $57–60 | $49 | $1,500–2,000 | $95 |
| STNG | $74–77 | $64 | $1,000–1,500 | $105 |

**Pool B — deploy regardless of outcome:**
| Ticker | Entry | Stop | Size | Target |
|--------|-------|------|------|--------|
| HIMS | $18–20 | $14 | $1,000–1,500 | $37 |
| ZETA | $14–17 | $11.50 | $2,000–2,500 | $30 |

**ONDS — add to active watchlist (elevated from MONITOR):**
| Entry | Stop | Size | Target | Catalyst |
|-------|------|------|--------|----------|
| $8.50–9.50 | $7.00 | $1,000–1,500 | $15–18 | May 18 Q1 earnings |

Note on ZETA sizing: upgraded from $1,000 to **$2,000–2,500** following full analysis.
Maximum total Monday deployment: **$10,000–12,000**. Hold $20K+ USD in reserve.

---

## 6. WATCHLIST ADDITIONS TO CONFIRM IN JOURNAL

New entries added to watchlistUS in v19: LNG, OXY, STNG, BKR, AER, BKNG, NVDA, HIMS, ZETA, TMDX, INOD.
ONDS status: change from `"status": "MONITOR"` to `"status": "WATCH — Entry $8.50-9.50 Monday"`.
ZETA: update positionSizeMax from `"$1,000"` to `"$2,000-2,500"`.

---

## 7. LESSONS LEARNED ADDITIONS

Add to LESSONS_LEARNED.md under SI-17:

**E9 — GTC Order Orphan (new, S14)**
When selling a position at market, existing GTC stops/stop-limits do NOT cancel automatically. They persist and will fill independently if the price level is reached.
Prevention: (1) Cancel all GTC stops on a position BEFORE placing market sell, OR (2) Cancel immediately on confirmation of market fill. Never assume a filled market sell has cleaned up the order book.

---

## 8. IBKR ORDER STATUS AT SESSION CLOSE

| Order | Status |
|-------|--------|
| AMZN Stop Limit $222/$219 GTC | ✅ Submitted |
| SHLD Market Sell 69 | ✅ Filled $73.34 |
| SHLD Stop Limit (old, triggered) | ✅ Filled $73.21 (unintended — closed) |
| SHLD Buy 69 (short cover) | ✅ Filled $72.846 |
| CCJ Stop $108.37 GTC | ✅ Submitted |
| ISRG Stop $420 GTC | ✅ Submitted |
| MSFT Stop $350 GTC | ✅ Submitted |
| VST Stop $145.02 GTC | ✅ Submitted |
| ABVX Stop $100 GTC | ✅ Submitted |
| ITM Stop 60p GTC | ✅ Submitted |
| AVAV Stop $165 GTC | ✅ Submitted |
| PDYN Stop $5.75 GTC | ✅ Submitted |
| AMPX Stop $13 GTC + Limit $32 GTC | ✅ Submitted |
| CODA Stop $10.49 GTC | ✅ Submitted |

---

*This file to be integrated into trading_journal19.jsx at Monday session open before running full scan.*
