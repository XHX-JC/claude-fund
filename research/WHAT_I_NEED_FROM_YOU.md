# WHAT I NEED FROM YOU — CONNECTOR SETUP
**Created: Session 39 Pre-Open | Saturday 9 May 2026**

---

## 1. OPTIONS FLOW — COVERED BY EXISTING TOOLS (NO ADDITIONAL COST)

**Unusual Whales is NOT recommended.** Subscription $750 + API access $50/week ($2,600/year).
Pricing was not disclosed at point of purchase — pursue refund via credit card chargeback.

**What we use instead:**

**Alpha Vantage (already connected):**
- REALTIME_PUT_CALL_RATIO — bullish/bearish per ticker
- REALTIME_VOLUME_OPEN_INTEREST_RATIO — unusual speculative activity
- REALTIME_OPTIONS — full live options chain
Used across a defined 80-100 name universe each session. Covers the thesis-relevant universe.

**Barchart.com (free tier — no API key needed):**
- Unusual options activity feed, accessible via web_fetch
- Register at barchart.com for free API tier (400 requests/day)
- No cost, I can use this immediately for market-wide sweep

**CBOE daily statistics (completely free, no account):**
- Daily put-call ratios and most active options direct from exchange
- Fetched via web_fetch each session — zero cost

**Action needed from you:** None. This capability is already available.

---

## 2. QUIVER QUANTITATIVE — Congressional + Government (PRIORITY: HIGH)

**What it provides:**
- Congressional trading filings (real-time, political-mapped)
- Government contract awards (DoD, NIH, NASA, DHS) — who wins before the market knows
- Lobbying spend by company and sector
- Patent filing velocity

**How to connect:**
1. Go to https://www.quiverquant.com
2. Create account → navigate to API section
3. Free tier available with rate limits; Premium ~$20/month for full access
4. Generate API key, share it here: "My Quiver Quantitative key is: [KEY]"

---

## 3. SEC EDGAR FULL-TEXT SEARCH — 13D/13G + 8-K (PRIORITY: HIGH, FREE)

**What it provides:** Systematic scanning of all SEC filings — 13D/13G (new 5%+ stakes),
8-K (material events), specific language searches across all public company filings.

**How to connect:**
This is a free government API — no account or key required.
- URL: https://efts.sec.gov/LATEST/search-index?q="search term"&dateRange=custom&startdt=DATE
- I can call this directly via web_fetch in any session
- No setup required from you

**Action needed from you:** None. I can use this immediately.

---

## 4. MARINTRAFFIC API — Hormuz Monitoring (PRIORITY: MEDIUM)

**What it provides:** Real-time vessel tracking through the Strait of Hormuz.
Makes SI-25 Condition 1 monitoring objective (ship counts) rather than news-dependent.

**How to connect:**
1. Go to https://www.marinetraffic.com/en/p/api-services
2. Register for API access (pricing varies — basic vessel tracking ~$50/month)
3. Generate API key, share here: "My MarineTraffic key is: [KEY]"

**Note:** Given current conflict intensity, this is a medium priority.
Web search remains adequate for major Hormuz developments.

---

## 5. STOCKOPEDIA — UK/EU Small Cap Screening (PRIORITY: MEDIUM)

**What it provides:** StockRank system (quality + value + momentum combined) with strong
coverage of UK AIM and European small-mid caps — exactly the CWR-pattern universe.
Better depth on LSE AIM than EOD.

**How to connect:**
1. You may already have a Stockopedia account (it appeared in research during prior sessions)
2. If yes: Account → Settings → API → Generate key
3. Share here: "My Stockopedia key is: [KEY]"
4. If no account: https://www.stockopedia.com — plans from ~£30/month

---

## 6. CLAUDE PRO ACCOUNT — Token Usage (IMPORTANT)

**The address issue:** When you resolve the billing/address discrepancy,
upgrading to Claude Pro (or the appropriate business tier) significantly expands context
window and session length. This directly impacts:
- How many positions/screens can be reviewed in one session
- Depth of opportunity scanning possible per session
- Quality of end-of-session file writes

**In the interim — token conservation protocol:**
- Session Zero sweep kept to 15 minutes maximum
- Position reviews: sector-clustered not individual
- Opportunity scans: run 1-2 per session, not the full framework at once
- File writes: append-only where possible, no full rewrites
- If approaching token limit mid-session: prioritise writing state files over continued analysis

**The address error:** If the Claude.ai billing page shows an address mismatch,
try: Account → Billing → Update payment method → re-enter address exactly
matching your card billing address including postcode format.
Contact support at support.anthropic.com if it persists.

---

## 7. NO ACTION NEEDED — ALREADY AVAILABLE

These are fully operational now:
- EOD stock screener, bulk fundamentals, sentiment, earnings trends ✅
- Alpha Vantage: options flow (ticker-by-ticker), institutional holdings, transcripts ✅
- Coupler.io: ready for automated data flows if needed ✅
- EDGAR free API: usable immediately via web_fetch ✅
- Alpha commodity prices (WTI, Brent): replaces E21 web search risk ✅
