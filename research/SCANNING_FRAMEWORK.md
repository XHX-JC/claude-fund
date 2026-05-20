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

### Part 1: BROAD MARKET SCREENS (30 min) [SI-77]

Run systematically, no thesis filter. These screens look for anomalies regardless of sector.

**Screen A — Revenue momentum unrecognised by price**
Using EOD or web search across NASDAQ/NYSE/LSE:
- Revenue growth >30% YoY (or sequential acceleration)
- Price down >20% from 52-week high
- P/E or P/S below sector average
- Rationale: market has not priced the growth

**Screen B — Quality at 52-week lows**
- Price within 10% of 52-week low
- Revenue growth positive (company not structurally impaired)
- Gross margin >35% (quality business, not value trap)
- Insider buying in past 90 days
- Rationale: temporary dislocation, not fundamental deterioration

**Screen C — Earnings surprise without re-rating**
- Beat consensus EPS by >15% in most recent quarter
- Stock up <5% post-beat (failed to re-rate)
- Guidance maintained or raised
- Rationale: the T27 turnaround pattern before it becomes obvious

**Screen D — Volume anomaly this week**
- Any name trading >3x its 30-day average volume with no obvious catalyst
- Concentrated across multiple sessions (not one-day spike)
- Rationale: something is being discovered before the catalyst is public

**Screen E — Congressional and institutional signal**
Web search "SEC 13D 13G filings this week" + EDGAR direct
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
Ratio <0.5 on any holding = bullish unusual positioning → investigate catalyst.
Ratio >1.2 on any holding = warning → thesis review.

**Section O — New Significant Stakes**
SEC 13D/13G scan. Any 5%+ non-index stake = same-week Stage 1 mandatory.

**Section N — EU Energy Transition**
Current slots: 1/4 (RR.L). 3 available.
Priority names: ENGIE.PA (Stage 1 required), GTT.PA (€170-175 zone watch).

**SI-39 — Drawdown screener (SI-45 weekly extension)**
Run on full position universe. Any name now -15% to -20% from 52-week ATH on the watchlist that isn't already researched = immediate Stage 1.

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

## TOOL REFERENCE MAP (Updated v2.0)

| Scan | Tool | Priority |
|------|------|----------|
| Position news sweep | Web search (sector clusters) | Every session |
| Commodity prices | Alpha Vantage WTI/BRENT | Every session |
| 52-week range | EOD:get_us_live_extended_quotes | Every session |
| Volume anomaly | Web search top movers | Every session |
| Broad market screens | EOD:get_bulk_fundamentals + web search | Weekly |
| Macro signal identification | Web search + Alpha macro | Weekly |
| Earnings revision | EOD:get_earnings_trends | Weekly |
| Options sentiment | Web search (Barchart free tier) | Weekly |
| Congressional trading | EDGAR free API + web search | Weekly |
| 13D/13G filings | web_fetch EDGAR | Weekly |
| Institutional holdings | Alpha:INSTITUTIONAL_HOLDINGS | Monthly |
| Earnings transcripts | Alpha:EARNINGS_CALL_TRANSCRIPT | Monthly |
| Bulk fundamental screen | EOD:get_bulk_fundamentals | Monthly |

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
