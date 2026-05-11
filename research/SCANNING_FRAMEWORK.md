# SCANNING FRAMEWORK v1.0
**Established: Session 39 Pre-Open | Saturday 9 May 2026**
**Governs: SI-70 through SI-76 | Replaces/expands SI-45**

---

## PHILOSOPHY

Current positions require ~25% of session effort — thesis intact Y/N is usually answerable quickly.
>50% of session effort must be directed at opportunity finding. This is where compounding comes from.

The fund has three layers of data capability now mapped to specific tasks:
- **EOD**: Fundamentals, screener, bulk exchange data, sentiment, insider transactions
- **Alpha Vantage**: Options flow, institutional holdings, transcripts, earnings, macro
- **Web search / Apify**: Qualitative news, social sentiment, niche sources

---

## SESSION ZERO — Every Session (15 min max)

**Purpose:** Fast check — has anything material changed overnight? Binary answers only.

### 0A — Position news sweep
- One search per sector cluster (not per position) for material news
- Question is binary: thesis changed? If no, move on
- Do NOT read price moves as news — only actual developments

### 0B — Volume anomaly (EOD)
- `EOD:get_insider_transactions` — new Form 4 filings past 48h, thesis sectors only
- Flag any insider buy cluster (multiple executives in same sector buying same week)

### 0C — Top movers (Alpha)
- `Alpha: TOP_GAINERS_LOSERS` — scan for thesis-sector names in top movers
- Any watchlist name moving >5% without known catalyst = investigate immediately

### 0D — Commodity prices (Alpha — replaces E21 web search risk)
- `Alpha: WTI` and `Alpha: BRENT` for thesis macro
- Source is now API, not web search — eliminates E21 staleness risk

---

## WEEKLY SCREEN — First Session of Week (45-60 min)

*Existing Sections A-K plus Section N (EU Energy) remain. Additions below.*

### Section L — Earnings Revision Tracker (EOD + Alpha) [SI-71]
**What it catches:** Companies where analysts are raising estimates but price hasn't moved — the pre-re-rating signal.

Run: `EOD:get_earnings_trends` on 20-30 names across thesis sectors
Filter for: EPS revision upward (epsTrend.current > epsTrend.30daysAgo), analyst count stable/rising, price change <5% in same period

Flag anything with: estimates up >5% in 30 days, price flat = **immediate Stage 1 candidate**

### Section M — Options Sentiment (Alpha) [SI-72]
**What it catches:** Where informed money is positioning before news breaks.

Run: `Alpha: REALTIME_PUT_CALL_RATIO` on thesis sector universe (20-30 names)
- Ratio < 0.5 = strongly bullish options positioning → investigate why
- Ratio > 1.2 on current holding = warning flag, review thesis

Run: `Alpha: REALTIME_VOLUME_OPEN_INTEREST_RATIO` on same universe
- High ratio (volume >> open interest) = speculative activity building → look for catalyst

### Section O — New Significant Stakes [SI-73]
**What it catches:** External investors building 5%+ positions before the market notices.

Run: Web search "SEC 13D 13G filings this week [thesis sectors]" + EDGAR direct search
- Any 5%+ stake by non-index fund in thesis sector name = same-week Stage 1
- Activist filing = thesis read mandatory before deciding

---

## MONTHLY SCREEN — First Session of Month (2-3 hours)

### Monthly A — Bulk Fundamental Screen [SI-74]
**What it catches:** CWR-pattern names and SI-63 turnarounds across entire exchanges.

Run: `EOD:get_bulk_fundamentals` on LSE (UK small caps) and NASDAQ
Apply filters:
- Market cap £50M-£500M (CWR pattern) OR >$5B with >40% ATH drawdown (SI-63)
- Gross margin >35% (capital-light signal)
- Revenue growth positive (commercial stage confirmed)
- Price down >25% from 52wk high (undiscovered or sentiment-beaten)

Output: Shortlist of 10-20 names for manual review

### Monthly B — Institutional Holdings Monitor [SI-74]
**What it catches:** Institutions building positions before retail notices (quarterly 13F signal).

Run: `Alpha: INSTITUTIONAL_HOLDINGS` on current positions + Stage 1/2 pipeline
- New institutional position appearing = validation signal
- Institution reducing from 10%+ to <5% = thesis review trigger

### Monthly C — Earnings Call Transcript Analysis [SI-75]
**What it catches:** Management tone shifts that precede guidance changes.

Run: `Alpha: EARNINGS_CALL_TRANSCRIPT` on Stage 1/2 pipeline candidates
Look for: increasing specificity in guidance, reduced hedging language, new market references, CEO confidence shift vs prior quarter

### Monthly D — CWR Pattern Screen [SI-74]
Explicit quarterly search for capital-light early-commercial European/AIM names.
Criteria: market cap £50M-£500M, gross margin >40%, named major industrial partner, dual-use clean energy or defence technology, price >30% off 12-month high.
Run: EOD bulk LSE + web search for recent partnership announcements in energy/defence tech.

### Monthly E — Rule Review [SI-69]
See RULES_FRAMEWORK.md

---

## EVENT-TRIGGERED SCREEN

Fires when: major geopolitical event, regulatory change, technology announcement, M&A wave.

**Protocol:**
1. Identify first-order beneficiaries (already priced in — do not chase)
2. Identify second-order beneficiaries (customers/suppliers of first-order)
3. Spend 70% of research time on **third-order beneficiaries** — companies solving the problem the event just created

Hormuz example in retrospect: first-order = oil majors (priced day 1). Second = LNG infrastructure. Third = EU energy transition technology (CWR, ITM, NCH2). Fund caught second-order, missed third-order almost entirely. T29/SI-67 exist because of this.

---

## PIPELINE DISCIPLINE [SI-76]

At all times the fund should maintain:
- **3-5 Stage 2 candidates** — fully researched, waiting for entry trigger
- **8-10 Stage 1 candidates** — initial thesis identified, research file started
- **15-20 Watch names** — pattern match, monitoring for Stage 1 qualification

Current state (S39): 8 watchlist names, most are re-entry candidates not new discoveries.
Pipeline is under-populated. Priority for S39-S42: build to full depth.

Stage progression criteria:
- **Watch → Stage 1:** Thesis identifiable, sector fits macro, one catalyst visible
- **Stage 1 → Stage 2:** Research file written, valuation range established, entry zone defined, stop level set, max loss calculated and within SI-35
- **Stage 2 → Entry:** Trigger event confirmed (earnings gate, price level, catalyst)

---

## TOOL REFERENCE MAP

### FREE TIER (WORKS NOW)
| Scan | Tool | Notes |
|------|------|-------|
| Session Zero news | Web search | Primary. Fast, flexible, no rate limit |
| Commodity prices | Web search → Alpha:WTI/BRENT | Alpha free tier: 25 calls/day total |
| 52-week range | EOD:get_us_live_extended_quotes | Works on free tier |
| 13D/13G filings | web_fetch → EDGAR free API | Free, no account needed |
| Options sentiment | web_fetch → Barchart/CBOE public pages | Free, parseable |
| Earnings revisions | Web search → Yahoo Finance/Seeking Alpha | Manual but zero cost |
| Insider transactions | Web search → OpenInsider.com | Free, well-structured |
| Earnings transcripts | Web search → Seeking Alpha/Motley Fool | Free summaries |
| CWR pattern scan | Web search + web_fetch → Stockopedia | Free tier accessible |
| Top movers | Web search | Adequate for session use |

### REQUIRES PAID UPGRADE
| Scan | Requires | Est. Cost |
|------|---------|----------|
| Bulk fundamentals (500 stocks/call) | EOD Extended Fundamentals | ~£20-40/month |
| Systematic screener | EOD paid tier | ~£20-40/month |
| Real-time options flow at scale | Alpha Premium | ~£50/month |
| Institutional holdings (13F bulk) | Alpha Premium | ~£50/month |
| Earnings call transcripts (API) | Alpha Premium | ~£50/month |
| Sentiment scoring at scale | EOD or Alpha paid | ~£20-50/month |

### UPGRADE RECOMMENDATION
Do nothing until net liquidity exceeds £150K.
At that point, upgrade EOD paid tier (£20-40/month) first — bulk fundamentals
and systematic screener deliver the highest scanning value per pound spent.

---

## TOOLS TO ADD (pending connectors)

| Tool | Purpose | Priority |
|------|---------|----------|
| Unusual Whales API | Market-wide unusual options flow sweep | High |
| Quiver Quantitative | Congressional trading + govt contracts + lobbying | High |
| EDGAR API (free) | Systematic 13D/13G + 8-K scanning | High |
| MarineTraffic API | Real-time Hormuz vessel tracking (SI-25 Condition 1) | Medium |
| Stockopedia API | UK/European small cap StockRank screening | Medium |

See WHAT_I_NEED_FROM_YOU.md for setup instructions.
