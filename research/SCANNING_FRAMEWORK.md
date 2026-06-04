# SCANNING FRAMEWORK v2.0
**Established:** Session 41 | Tuesday 12 May 2026
**Supersedes:** v1.0 (Session 39)
**Principle:** Discovery-first. Data surfaces patterns. Patterns suggest thesis. Never the reverse.

---

## THE CORE PROBLEM THIS VERSION FIXES

v1.0 was **thesis-siloed and reactive**: find names within known buckets (Hormuz, EU Energy, AI). This produced LDO and R3NK — both correct sectors, both entered after the primary re-rating was complete.

v2.0 is **discovery-first and proactive**: systematic broad data screens surface anomalies. Anomalies generate thesis candidates. The funnel runs from data → pattern → thesis → name, never thesis → name → data validation.

**Rule:** At least 50% of new position ideas must originate from broad scans, not from existing thesis expansion.

---

## OPERATING ARCHITECTURE — THREE LAYERS

### LAYER 1: BROAD WEEKLY DISCOVERY SCAN (no thesis filter)
*What the market is doing regardless of what we believe*

### LAYER 2: MACRO SIGNAL IDENTIFICATION
*What structural forces will drive sector moves in the next 3-12 months*

### LAYER 3: FOCUSED CONVERSION
*Taking the best Layer 1 & 2 candidates through Stage 1/2*

---

## THREE-TIER WATCHLIST SYSTEM (replaces single flat watchlist)

| Tier | Max Size | Definition | Review Frequency |
|------|----------|------------|-----------------|
| **ACTIVE** | 5 names | Stage 2 complete. Entry zone defined. Stop set. Catalyst identified. One of these gets entered this week or is removed. | Every session |
| **MONITORING** | 8 names | Stage 1 complete. Thesis documented. Entry zone approximate. Needs catalyst confirmation. | Weekly |
| **UNIVERSE** | Unlimited | Raw scan outputs. Named with one-line thesis only. Pending Stage 1. | Monthly cull |

**Discipline:** If ACTIVE tier has 5 names for 3+ sessions with no entry, something is wrong — either the entry criteria are too tight or the thesis isn't strong enough. Review and replace at least 2 names.

---

## SESSION ZERO — Every Session (15 min max)

**Purpose:** Binary check — has anything material changed? Not research. Not analysis. Binary.

### 0A — Position news sweep
Single search per sector cluster, not per position. Question: *thesis changed? Y/N*. If N, move on immediately.

### 0B — Active watchlist price check
Are any ACTIVE tier watchlist names at or near entry zones? If yes, execute — do not delay.

### 0C — Volume anomaly trigger
Any name in any tier moving >5% on unusual volume without a known catalyst = immediate cross-sector anomaly investigation (see Protocol below).

### 0D — Commodity prices
`Alpha: WTI` + `Alpha: BRENT` for thesis macro. Never web search for commodity prices (E21).

### 0E — BTC price (when MSTR held)
Quick check: BTC relative to $85K scale gate and $70K kill switch. 30 seconds.

---

## WEEKLY DISCOVERY SCAN — Every Friday Session (90 min)

*This is the most important session element. It is not deferrable. It runs before any portfolio management.*

---

### ⚡ MANDATORY FIRST STEP — IBKR SCREENER REQUEST (Added S53 — 1 June 2026)

**This is the primary discovery tool. It is free, real-time, covers the full US market, and takes under 5 minutes. Claude must issue this request BEFORE any web search, API call, or analysis.**

Claude issues this prompt verbatim at the start of every broad market scan:

> "Please open IBKR Trader Workstation → New Window → Screener and run the following saved screeners, screenshotting the top 25 results from each. All can be taken in one batch before we start:
>
> 1. **CF-SCREEN-D** — Volume Anomaly (run first — signals fade during the day)
> 2. **CF-SCREEN-A** — Revenue Momentum Unrecognised by Price
> 3. **CF-SCREEN-B** — Quality at 52-Week Lows
> 4. **CF-SCREEN-C** — Earnings Surprise Without Re-rating
> 5. **CF-SCREEN-M** — Unusual Options Flow
> 6. **CF-SCREEN-SI39** — Thesis Drawdown Watchlist
>
> Also run **CF-SCREEN-EU** on the first Friday/session of each month.
>
> Once you paste the screenshots in, I will analyse each and compile UNIVERSE candidates."

**Claude waits for screenshots before proceeding.** Web search and API calls are used only for Screen E (congressional/institutional filings) and macro signal identification — they do not replace the screener for Screens A through SI-39.

**Why this rule exists:** S53 (1 June 2026) — a full scan session ran entirely on web searches and API calls without requesting IBKR screenshots once. The screener was documented, configured, and ready. It was never requested. This is an error class equivalent to E30 (close protocol amnesia). Origin codified here to prevent recurrence.

---

### Part 1: BROAD MARKET SCREENS (30 min) [SI-77]

Run systematically, no thesis filter. IBKR screener screenshots (requested above) are the PRIMARY data source.

**Screen A — Revenue momentum unrecognised by price**
IBKR saved screener: CF-SCREEN-A — request screenshot, analyse output.
- Revenue growth >30% YoY (or sequential acceleration)
- Price down >20% from 52-week high
- P/E or P/S below sector average
- Rationale: market has not priced the growth

**Screen B — Quality at 52-week lows**
IBKR saved screener: CF-SCREEN-B — request screenshot, analyse output.
- Price within 10% of 52-week low
- Revenue growth positive (company not structurally impaired)
- Gross margin >35% (quality business, not value trap)
- Insider buying in past 90 days
- Rationale: temporary dislocation, not fundamental deterioration

**Screen C — Earnings surprise without re-rating**
IBKR saved screener: CF-SCREEN-C — request screenshot, analyse output.
- Beat consensus EPS by >15% in most recent quarter
- Stock up <5% post-beat (failed to re-rate)
- Guidance maintained or raised
- Rationale: the T27 turnaround pattern before it becomes obvious

**Screen D — Volume anomaly this week**
IBKR saved screener: CF-SCREEN-D — request screenshot, analyse output.
- Any name trading >3x its 30-day average volume with no obvious catalyst
- Concentrated across multiple sessions (not one-day spike)
- Rationale: something is being discovered before the catalyst is public

**Screen E — Congressional and institutional signal**
Web search "SEC 13D 13G filings this week" + EDGAR direct (this screen has no IBKR equivalent)
- Any activist or 5%+ stake filing in a small/mid-cap
- Any senator/congressman transaction >$100K in non-obvious name
- Rationale: informed money moving ahead of known catalysts

Output from Part 1: 3-6 flagged names with one-line rationale each → add to UNIVERSE tier.

---

### Part 2: MACRO SIGNAL IDENTIFICATION (20 min) [SI-79]

**The question:** What structural forces are forming RIGHT NOW that will drive sector re-ratings in the next 6-18 months? Before the consensus has identified them.

Run through these macro lenses every week:

**Geopolitical:** Any new conflict, treaty, sanction, or trade restriction this week? First-order beneficiaries are already priced. Focus on third-order — who benefits from the problem the event just created?

**Commodity shifts:** Any commodity moving >8% in a week without being in current thesis? What sector does that touch? What names are exposed?

**Policy/regulation:** Any government announcement, legislative hearing, or regulatory filing that changes the rules for a sector? AI regulation, nuclear permitting, drug approvals, defence procurement?

**Currency:** Any significant FX move (>2% in major pair in a week)? Who benefits and who's hurt?

**Technology:** Any new product announcement, IP filing, or scientific publication that changes the competitive landscape in any sector we watch?

Output from Part 2: 1-2 new macro themes worth exploring → note in UNIVERSE tier or elevate existing Monitoring names.

---

### Part 3: EXISTING SCREENS (40 min) [updates SI-45, SI-71, SI-72, SI-73]

**Section L — Earnings Revision Tracker**
`EOD:get_earnings_trends` on 20 names across thesis sectors.
Flag: EPS estimate revised up >5% in 30 days, price flat = immediate Stage 1 candidate.

**Section M — Options Sentiment**
IBKR saved screener: CF-SCREEN-M — request screenshot, analyse output.
Ratio <0.5 on any holding = bullish unusual positioning → investigate catalyst.
Ratio >1.2 on any holding = warning → thesis review.

**Section O — New Significant Stakes**
SEC 13D/13G scan. Any 5%+ non-index stake = same-week Stage 1 mandatory.

**Section N — EU Energy Transition**
IBKR saved screener: CF-SCREEN-EU — first Friday of month only.
Current slots: 0/4. All slots available.
Priority: GTT.PA at €175-185, post ex-div June 17.
DO NOT ENTER: CWR.L (+989% rerated), ITM.L (+400% rerated).

**SI-39 — Drawdown screener (SI-45 weekly extension)**
IBKR saved screener: CF-SCREEN-SI39 — request screenshot, analyse output.
Any thesis name now -15% to -20% from 52-week ATH not already researched = immediate Stage 1.

---

### Part 4: WEEKLY PERFORMANCE REVIEW (included in Friday session) [SI-78]

*This is the continuous improvement mechanism. Without this, the same mistakes recur.*

At every Friday session close, complete the WEEKLY_REVIEW.md template with:

1. **Performance delta this week:** Net liq change, realized P&L, unrealized change
2. **What worked:** Specific decisions that generated value — be granular
3. **What failed:** Missed opportunities, bad entries, wrong exits — be honest
4. **Scan effectiveness:** How many new candidates did broad screens surface? How many converted?
5. **Process improvement:** What one specific change would improve performance most next week?
6. **Thesis validity:** Is the core thesis evolving? Are we behind on any emerging theme?
7. **Watchlist audit:** Is the ACTIVE tier the genuinely best 5 opportunities available? If not, replace.
8. **Recommendation:** 3 specific actions for next week. These must be acted on or explained away.

**The standard:** If net liq is flat or down and the weekly review cannot identify at least 2 specific process improvements, the week was not adequately analysed. Do not move on until the review is complete.

---

## MONTHLY MACRO THESIS DEVELOPMENT SESSION [SI-79]

*First session of each month. 2-3 hours. No portfolio management. No existing thesis defence.*

**Purpose:** Identify what we are missing. Not what we own. What we're missing.

**Process:**

Step 1 — Run Monthly A (Bulk Fundamental Screen): `EOD:get_bulk_fundamentals` on LSE + NASDAQ.
Apply: Revenue growth positive, gross margin >35%, down >25% from 52-week high, market cap £50M-£500M OR >$5B with >40% drawdown.
Output: 15-25 names for manual review.

Step 2 — Run Monthly B (Institutional Holdings): `Alpha: INSTITUTIONAL_HOLDINGS` on names from Step 1.
Any new institutional position = validation signal.

Step 3 — THESIS CHALLENGE: For each existing thesis bucket (Hormuz, AI, Quantum, Nuclear, Peace Deal), ask:
- Is this thesis earlier or later in its cycle than 3 months ago?
- What's the strongest argument that this thesis is WRONG?
- What would the thesis' failure look like in price terms? (set a kill switch if not already set)

Step 4 — NEW THEME IDENTIFICATION: With no agenda, scan:
- What sectors are the smartest institutional investors moving into this quarter? (13F analysis)
- What technologies are governments globally spending money on? (legislative calendars, budget announcements)
- What commodities are tightening structurally? (not cyclically)
- Where are IPOs and private equity exits concentrated? (forward-looking indicator of sector momentum)

Output: 1-2 new macro themes added to UNIVERSE tier for investigation. At least one existing thesis reviewed for continued relevance.

---

## CROSS-SECTOR ANOMALY PROTOCOL [SI-81]

When ANY position or watchlist name moves >5% in a single session without a known catalyst:

1. **Do not treat it as isolated.** Sector moves affect peers.
2. **Immediately scan the full sector universe.** Not just the names we hold — ALL names in the sector.
3. **Identify which names in the sector have NOT moved yet.** This is the opportunity.
4. **Determine if the move is sector-wide or stock-specific.** If stock-specific, the sector peers may be mispriced.
5. **Check for thesis confirmation or break.** Does the move support or challenge the thesis?

*Example — S41 uranium selloff:* CCJ -5.73%, UUUU -9.26%. Correct protocol: immediately scan Cameco, Energy Fuels, NexGen, Denison, Uranium Energy Corp, Yellow Cake. Which hasn't moved as much? Why? Is there a relative value trade?

---

## EMERGING MACRO THEMES PIPELINE (Updated S41)

*These are thesis candidates that are pre-consensus. Research allocation priority below.*

| Theme | Stage | Thesis Summary | Key Names | Priority |
|-------|-------|---------------|-----------|----------|
| Data Centre Power | Stage 1 | AI compute growing 40-50%/yr. Grid connection is the bottleneck. Power infrastructure is years behind. Nuclear + grid investment = structural underpricing. | Vistra (VST exited), NRG, Constellation, E.ON, National Grid | HIGH |
| Quantum Computing | Stage 1 COMPLETE | Trapped-ion moat (IonQ). Full-stack platform. Government contracts. +755% YoY revenue. Dip-buy $38-45. | IonQ (IONQ) | HIGH — in ACTIVE tier |
| SMR Nuclear | Stage 1 | Small Modular Reactors: US/UK/Canada/Poland all have active programmes. BWX Technologies, Rolls-Royce SMR division (embedded in RR.L), Oklo. Government-contracted, long-lead, pre-consensus. | BWXT, NuScale (SMRA), Oklo (OKLO) | MEDIUM |
| Post-War Reconstruction | Stage 1 | When Hormuz resolves: Saudi/UAE/Qatar infrastructure spend. Vision 2030 is $1.3T through 2030. Engineering contractors, modular construction, regional cement. | Jacobs (J), AECOM, Hill International | MEDIUM |
| Defence Tech Convergence | Stage 1 | OLD thesis: tanks/ships (re-rated). NEW thesis: autonomous systems, electronic warfare, quantum sensing, AI command-and-control. WHERE the next $500B of NATO spend goes. Anduril (IPO), L3Harris, Palantir. | L3Harris (LHX), Palantir (PLTR dormant), Anduril IPO watch | MEDIUM |
| Healthcare AI | Pre-Stage 1 | AI drug discovery at inflection. Recursion, Schrodinger, Absci. Fund has ZERO healthcare exposure. | RXRX, SDGR, ABSI | LOW — need Stage 1 |
| Water Infrastructure | Pre-Stage 1 | Global water stress structural crisis. Zero investor attention. Xylem, Veolia, Pentair. Secular demand, no thesis competition. | XYL, VIE.PA, PNR | LOW — need Stage 1 |
| Post-Quantum Cryptography | Pre-Stage 1 | Every bank, government, military needs to upgrade encryption before quantum computers break RSA. SandboxAQ (private), IBM (held), PQShield (private). Software solution urgency is building. | IBM (held), IONQ (held), listed pure-plays to research | MEDIUM |

---

## STAGE PROGRESSION CRITERIA (Updated v2.0)

**UNIVERSE → MONITORING (Stage 1 complete):**
- Thesis in one paragraph: what, why now, catalyst
- Sector not already re-rated (P13 check)
- Business not in structural decline
- Rough entry zone identified (doesn't need to be precise)
- One specific catalyst that would trigger re-rating

**MONITORING → ACTIVE (Stage 2 complete):**
- Detailed research file written
- Entry zone precise (±5%)
- Stop level set with SI-35 max loss calculation
- Catalyst date or condition defined
- P24 check (no imminent earnings)
- R/R calculated: growth thesis = conviction check; event bounce = minimum 3:1

**ACTIVE → ENTRY:**
- Price reaches entry zone
- Catalyst confirmed (not hoped for)
- SI-35/SI-37 budget available
- No conflicting position in same sector (concentration rules)
- Position is the BEST available use of capital today

---

## EVENT-TRIGGERED PROTOCOL (Updated v2.0)

When a major event occurs (geopolitical, regulatory, technology):
1. **First-order beneficiaries** — already priced day 1. Do not enter.
2. **Second-order beneficiaries** — sector re-rating, 2-5 days to recognise.
3. **Third-order beneficiaries** — solving the problem the event created. 2-8 weeks to recognise. **THIS IS WHERE WE FOCUS.**
4. **Fourth-order (contrarian)** — names incorrectly sold off due to sentiment, with intact fundamentals. Often best risk/reward.

*The fund has been consistently entering at second-order and missing third-order. The new watchlist system corrects this by tracking all four orders explicitly.*

---

## IBKR SCREENER CONFIGURATIONS — EXACT SETTINGS TO REQUEST EACH FRIDAY

The IBKR built-in screener (Trader Workstation → New Window → Screener) is institutional-grade,
real-time, and already paid for. Screeners are SAVED under the names below and can be run
with a single click. Claude requests the screenshot by saved screener name.

**Workflow once set up:**
Claude says: "Please run saved screener [NAME] and screenshot the results."
You click the saved screener, screenshot the output table, paste it.
Claude analyses the results and surfaces Stage 1 candidates.
Total time on your side per screen: under 60 seconds.

**SAVED SCREENER NAMES (save these in IBKR once configured):**
- CF-SCREEN-A (Revenue Momentum)
- CF-SCREEN-B (Quality at Lows)
- CF-SCREEN-C (Earnings Surprise)
- CF-SCREEN-D (Volume Anomaly)
- CF-SCREEN-M (Options Flow)
- CF-SCREEN-SI39 (Thesis Drawdown)
- CF-SCREEN-EU (EU/LSE Section N)

---

### SCREEN A — CF-SCREEN-A (Revenue Momentum Unrecognised by Price)
*Discovery: high-growth names the market has not re-rated yet*

IBKR Screener settings (save as CF-SCREEN-A):
- Product: Stocks | Region: United States
- Exchange: NYSE, AMEX, ARCA, NASDAQ
- Market Cap: $500M to $5,386B (filters micro-cap noise, no upper limit)
- Average Volume: 500K to 266M
- Change %: -50% to -20% (down meaningfully from recent levels)
- P/E Ratio: 0 to 30 (not yet priced for growth; omit filter for pre-profit names)
- Add Factor: Revenue Growth (YoY) > 20%
- Sort: Change % ascending (most beaten down first)

Screenshot request: "Please run CF-SCREEN-A and screenshot the top 25 results."
Target: 3-6 UNIVERSE candidates.

---

### SCREEN B — CF-SCREEN-B (Quality at 52-Week Lows)
*Discovery: temporarily dislocated quality businesses near structural floor*

IBKR Screener settings (save as CF-SCREEN-B):
- Product: Stocks | Region: United States
- Exchange: NYSE, AMEX, ARCA, NASDAQ
- Market Cap: $1B to $5,386B
- Average Volume: 300K to 266M
- Last ($): $10 to $710K (minimum price filter)
- Change %: -60% to -30% (meaningful drawdown from prior close)
- Add Factor: 52 Week High/Low % — price within 15% of 52W Low
- Add Factor: P/E > 0 (profitable business, not a value trap)
- Sort: 52W Low proximity ascending (closest to floor first)

Screenshot request: "Please run CF-SCREEN-B and screenshot the top 25 results."
Target: 2-4 UNIVERSE candidates.

---

### SCREEN C — CF-SCREEN-C (Earnings Surprise Without Re-rating)
*Discovery: T27 turnaround pattern — beat and raise not yet priced*

IBKR Screener settings (save as CF-SCREEN-C):
- Product: Stocks | Region: United States
- Exchange: NYSE, AMEX, ARCA, NASDAQ
- Market Cap: $300M to $5,386B
- Average Volume: 200K to 266M
- Change %: -10% to +10% (stock has not re-rated on the beat)
- Add Factor: Upcoming Earnings — exclude names reporting in next 7 days (avoid pre-earnings noise)
- Add Factor: After Hour Change % — flag any >+5% after-hours moves not yet reflected
- Sort: Average Volume descending (most liquid names first)

Note: EPS Surprise % filter may not be directly available in IBKR screener. If absent,
run without it and cross-reference against EOD:get_earnings_trends for the output list.

Screenshot request: "Please run CF-SCREEN-C and screenshot the top 25 results."
Target: 2-4 UNIVERSE candidates.

---

### SCREEN D — CF-SCREEN-D (Volume Anomaly / Informed Accumulation)
*Discovery: informed money moving before a catalyst is public*

IBKR Screener settings (save as CF-SCREEN-D):
- Product: Stocks | Region: United States
- Exchange: NYSE, AMEX, ARCA, NASDAQ
- Market Cap: $200M to $5,386B
- Average Volume ($): $421K to $52.7B (liquid names only — matches screenshot baseline)
- Change %: -5% to +5% (volume spike WITHOUT major price move = most interesting signal)
- Volume: set to > 3x Average Volume using Volume/Min or Trades/Min factor
- Add Factor: Trades/Min > baseline (real-time accumulation intensity — catches intraday building)
- Add Factor: Volume (today) — sort by volume ratio vs 90D average
- Sort: Volume descending (highest absolute volume first)

Key insight from live screenshot: Trades/Min is available as a factor in IBKR screener.
This is equivalent to what Unusual Whales charges for separately. Use it.

Screenshot request: "Please run CF-SCREEN-D and screenshot the top 25 results."
Target: 1-3 names with unexplained volume for immediate investigation.

---

### SCREEN M — CF-SCREEN-M (Unusual Options Flow)
*Weekly: put/call ratio anomalies on held positions and watchlist names*

IBKR Screener settings (save as CF-SCREEN-M):
- Product: Options | Region: United States
- Exchange: All US options exchanges
- Add Factor: Volume/Min or Trades/Min (options-specific)
- Add Factor: Volume vs Open Interest ratio > 2 (today's volume exceeds existing OI = new positioning)
- Filter to underlying names in ACTIVE + MONITORING watchlist where possible
- Alternatively: run on the Options tab of IBKR screener sorted by unusual volume

For each held position, also check via IBKR connector:
  get_price_snapshot fields: underlying-today-option-volume, underlying-avg-option-volume,
  implied-vol-underlying, implied-volatility-percentile

Flag: Put/Call ratio > 1.5 on a held long = warning, review thesis
Flag: Call/Put ratio > 3.0 = potential undisclosed catalyst, investigate immediately
Flag: IV Percentile > 80th = market pricing in a significant move

Screenshot request: "Please run CF-SCREEN-M (Options tab) and screenshot top 25 by volume."
Target: Any held or watchlist name with anomalous positioning flagged for same-session review.

---

### SCREEN SI-39 — CF-SCREEN-SI39 (Thesis Drawdown Watchlist)
*Weekly: catch thesis names that have pulled back into entry range*

IBKR Screener settings (save as CF-SCREEN-SI39):
- Product: Stocks | Region: United States
- Exchange: NYSE, AMEX, ARCA, NASDAQ
- Market Cap: $500M to $5,386B
- Average Volume: 500K to 266M
- Change % (from 52W High): -40% to -15% (in drawdown entry zone)
- Input saved watchlist of thesis names: MU, HPE, SNPS, CRDO, ALAB, VRT, ETN, AVGO,
  NVDA, TSM, META, CEG, MRVL, LEU, IONQ, NVO, MELI, CRM, OKTA, ON, SNOW, BKNG, ADBE, LULU
- Sort: % from 52W High ascending (most beaten down first)

Note: If IBKR screener does not support custom watchlist input as a filter,
run the broad screen and manually cross-reference output against thesis names.

Screenshot request: "Please run CF-SCREEN-SI39 and screenshot all results."
Target: Any thesis name now in drawdown entry zone not already in MONITORING or ACTIVE.

---

### SCREEN EU/LSE — CF-SCREEN-EU (EU and UK Names, Section N)
*Monthly: EU energy transition, defence, and macro thesis names pre-rerating*

IBKR Screener settings (save as CF-SCREEN-EU):
- Product: Stocks | Region: Europe (run separately for EUR Stocks and UK)
- Exchange: LSE (UK), XETRA (Germany), SBF (France), BVME (Italy)
- Market Cap: £50M / €100M minimum
- Average Volume: 100K minimum
- Change % (from 52W High): < -20%
- Sector: Energy, Industrials, Utilities (run each separately or combined)
- Sort: % from 52W High ascending

Screenshot request: "Please run CF-SCREEN-EU and screenshot top 20 results."
Target: Pre-rerating Section N candidates not yet on the radar.

---

## FRIDAY SCAN SCREENSHOT REQUEST SEQUENCE

At every Friday session (and any full scan session), Claude issues this request at the start:

1. "Please run CF-SCREEN-D (Volume Anomaly) and screenshot top 25 results." — first, volume signals fade intraday
2. "Please run CF-SCREEN-A (Revenue Momentum) and screenshot top 25 results."
3. "Please run CF-SCREEN-B (Quality at Lows) and screenshot top 25 results."
4. "Please run CF-SCREEN-C (Earnings Surprise) and screenshot top 25 results."
5. "Please run CF-SCREEN-M (Options Flow) and screenshot top 25 results."
6. "Please run CF-SCREEN-SI39 (Thesis Drawdown) and screenshot all results."
7. CF-SCREEN-EU only on first Friday/session of month.

All six screenshots can be taken in one batch before the session starts if preferred.
Claude will analyse each in sequence and compile UNIVERSE candidates at the end.
Claude does NOT proceed with web searches or API calls for discovery purposes until screenshots are received.

---

## TOOL REFERENCE MAP (Updated v2.5)

| Scan | Tool | Priority |
|------|------|----------|
| **Broad market screens A/B/C/D/M/SI-39** | **IBKR Screener screenshots (CF-SCREEN-X)** | **Every scan session — PRIMARY** |
| Position news sweep | Web search (sector clusters) | Every session |
| **Live prices — held positions** | **IBKR: get_price_snapshot** | **Every session — PRIMARY** |
| **52-week range — held positions** | **IBKR: get_price_snapshot (misc-statistics)** | **Every session — PRIMARY** |
| **52-week range — research names** | **IBKR: search_contracts + get_price_snapshot** | **Stage 1/2 research** |
| 52-week range fallback | EOD:get_us_live_extended_quotes | If IBKR unavailable |
| Commodity prices | Alpha Vantage WTI/BRENT | Every session |
| **Price history / chart review** | **IBKR: get_price_history** | **Any timeframe, any name** |
| **Overnight fills** | **IBKR: get_account_trades (TODAY)** | **Every session open** |
| **P&L audit** | **IBKR: get_account_trades (DAYS_90)** | **Weekly / on demand** |
| Screen E (congressional/institutional) | EDGAR free API + web search | Weekly — no IBKR equivalent |
| Macro signal identification | Web search + Alpha macro | Weekly |
| Earnings revision (Section L) | EOD:get_earnings_trends | Weekly |
| 13D/13G filings | web_fetch EDGAR CGI | Weekly (see Screen E protocol) |
| Institutional holdings | Alpha:INSTITUTIONAL_HOLDINGS | Monthly |
| Earnings transcripts | Alpha:EARNINGS_CALL_TRANSCRIPT | Monthly |
| Bulk fundamental screen | EOD:get_bulk_fundamentals | Monthly (requires paid tier) |

**IBKR CONNECTOR — READ-ONLY AUTHORITY (SI-87):**
Permitted: get_account_positions, get_account_orders, get_account_balances, get_account_summary, get_account_trades, get_price_snapshot, get_price_history, search_contracts.
Prohibited permanently: create_order_instruction, delete_order_instruction. Claude never places or modifies orders.

---

## WHAT GOOD LOOKS LIKE — WEEKLY BENCHMARK

Each week should produce:
- **At least 3 UNIVERSE tier candidates** from broad scans (not thesis-directed)
- **At least 1 Stage 1 completion** from monitoring tier
- **Weekly review completed** with specific recommendations
- **ACTIVE tier evaluated**: is each name still the best use of that slot?
- **At least one thesis question challenged**: what is the strongest case that our current thesis is wrong?

If a week produces none of these, the scanning process was not executed properly.

---

*v2.0 — Updated S41 | 12 May 2026 | Supersedes all v1.0 protocols*
*v2.1 — Updated S52 | 30 May 2026 | Screen E tooling update. SNOW removed SI-61. UNIVERSE additions (OKTA, MELI, ON, NVO, SNOW). Apify 13D actors deprecated.*
*v2.2 — Updated S52 | 30 May 2026 | IBKR connector integrated. Tool reference map updated. SI-87 read-only authority embedded.*
*v2.3 — Updated S52 | 30 May 2026 | IBKR Screener configurations added — exact filter settings for Screens A, B, C, D, M, SI-39, and EU/LSE. Screenshot protocol documented.*
*v2.4 — Updated S52 | 30 May 2026 | Screeners converted to saved format (CF-SCREEN-A through CF-SCREEN-EU). Filter parameters updated from live screenshot. Trades/Min factor added to Screen D. Friday scan sequence documented. All screens requestable by name in under 60 seconds.*
*v2.5 — Updated S53 | 1 June 2026 | MANDATORY IBKR SCREENER FIRST STEP added. Claude must request screenshots before any web search or API call during scan sessions. LULU added to CF-SCREEN-SI39 watchlist. Tool reference map updated — IBKR screener elevated to PRIMARY for all broad market screens.*
