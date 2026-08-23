# CLAUDE FUND — DUAL STRATEGY FRAMEWORK
# SI-89 | Established: S61 | 9 June 2026
# Authored: James Cadbury + Claude
# Status: PERMANENT — governs all new position decisions from S62 onward
# Read at: every session open alongside DECISION_REGISTER.md
# ═══════════════════════════════════════════════════════════════════════

## ORIGIN

Established S61 following the validated SNPS bounce trade proof of concept.
The fund has been running a single implicit strategy — thesis-hold with stops.
This framework formalises two distinct, parallel strategies with separate rules,
separate capital allocation, and separate register tracking.

The key insight: SNPS demonstrated that a large, time-bounded, catalyst-driven
entry with a hard exit produces cleaner compounding than many small thesis-holds
waiting for rerating events that may take months to materialise.

---

## THE TWO STRATEGIES — DEFINED PRECISELY

### STRATEGY A — Core Thesis Positions
Long-duration, rerating thesis, fundamental catalyst required.
Smaller allocation per name. Patient hold with mechanical stop protection.
Examples: FRSH, AIP, NBIS, HWM, CEG, LMT, HNR1.

### STRATEGY B — Catalyst Trades
Short-duration, event-driven, large allocation, trailing stop only mechanism.
Time-bounded exit — the stop or the hard date, whichever comes first.
Examples: SNPS bounce trade (S60), peace deal basket (CCL/NCLH/UAL/AAL).

These two strategies NEVER mix. A Strategy B position does not become
Strategy A because it has not hit the target. A Strategy A position does
not get sized up to Strategy B levels because conviction has increased.
They are structurally separate from entry to exit.

---

## FUND ALLOCATION — TARGET SPLIT

| Strategy | Target Allocation | Max Positions | Character |
|----------|------------------|---------------|-----------|
| Strategy A | 50% of net liquidity | 8 positions maximum | Thesis-hold, patient |
| Strategy B | 50% of net liquidity | 3-4 positions, rotating | Event-driven, active |
| Cash reserve | Minimum 10% | — | Always maintained |

**FLAGGING CADENCE CHANGED 18 AUGUST 2026, JAMES'S EXPLICIT INSTRUCTION:** the 10% cash floor
remains the standing target above, but James has confirmed he understands it and does not need
it re-flagged as an urgent open item every session while it sits breached. Continue tracking it
as a normal balance-sheet fact (state the number when balances are pulled), but stop treating a
sub-10% cash reading as a standing mandatory-action flag the way the LNTH-style orphaned-order
checks are. Escalate again only if the breach deepens materially or James asks for the flag back.

At current net liquidity ~$103K:
  Strategy A target: ~$51,500 across maximum 8 positions
  Strategy B target: ~$51,500 across maximum 3-4 active trades
  Cash floor: ~$10,300 minimum at all times

Strategy B allocation rotates — capital returns to cash after each trade
closes, ready for the next catalyst opportunity.
Strategy B should be actively hunted every session. It is not secondary
to Strategy A — it is an equal and complementary capital engine.

---

## SECTOR CONCENTRATION POLICY (ADDED S86W, 4 July 2026, JAMES'S EXPLICIT DECISION)

No formal per-sector position cap. Raised three times in one session (nuclear/power:
OKLO+CEG, then defence-tech: CODA+ONDS+KTOS, then again with Kraken/AMSC as candidates) —
James's standing answer, stated directly: a hard cap is not required if the underlying
thesis and fundamentals are sound with genuine conviction on upside. Concentrating in a
hot sector during a rotation is a deliberate, accepted strategy, not an oversight to be
corrected. The discipline required is being mindful of the exposure if a concentrated
sector goes cold, not avoiding concentration in the first place.

OPERATIONAL TRIPWIRE, proposed by Claude, not yet confirmed adopted by James as a hard
rule — treat as a suggested mechanism until he explicitly confirms it, not as policy:
if aggregate exposure to a single thematic cluster (nuclear/power: OKLO+CEG; defence-tech:
CODA+ONDS+KTOS+any future adds) crosses roughly 25% of net liquidity, that should trigger
a mandatory correlation-risk review before the next add in that cluster, not a block on it.
This operationalises "stay mindful" into something checkable rather than a permanent good
intention. Do not present this tripwire as already-adopted policy in future sessions unless
James has separately confirmed it — as of this writing it is Claude's proposal only.

---

## STRATEGY A — RULES

### Entry requirements
- Stage 2 research complete
- R/R minimum 3:1 to target
- Crash stress test passed
- Entry zone defined with specific price range
- SI-25 conditions checked (peace deal thesis names)
- T71: CURRENT CHART REVIEWED before order parameters are finalised.
  Claude requests a chart screenshot before recommending any entry.
  If a screenshot is unavailable, IBKR get_price_history is the fallback,
  but a live chart with premarket data is the standard. No chart, no entry.

### Sizing
- Standard: $500 max loss per trade
- High conviction exception: $900 max loss — requires three-point declaration
- Concentration ceiling: no single A position exceeds 30% of net liquidity

### Position management
- GTC stops mandatory at all times
- Stops may be RAISED as price moves in favour — never lowered except under
  the exception protocol below
- Maximum 8 positions simultaneously — if at 8, one must exit before a new
  entry is permitted

### Stop modification protocol — Strategy A ONLY
Lowering a stop requires ALL of the following:
  1. Explicit discussion and agreement in session
  2. Named reason documented — thesis change, new data, or structural reread
  3. Hard floor stated — "no further lowering under any circumstances"
  4. Logged in Decision Register with session reference
CEG S61 is the standing example: stop lowered from $250 to $244.51,
reason documented (lock-up expiry context, razor-thin buffer, premarket
recovery to $252), hard floor stated. This was a legitimate exception.
Lowering a stop on the basis of "the thesis is still good" alone does not
meet the threshold.

### Exit conditions — Strategy A
One of four conditions required (T67):
  1. Target reached
  2. Thesis broken
  3. Stop triggered
  4. Ceiling judgement — multiple at highs, no next catalyst, stated in writing

---

## STRATEGY B — RULES

### The three mandatory declarations — REQUIRED BEFORE ANY ENTRY
All three must be stated explicitly at the point of entry decision.
Without all three the trade defaults to Strategy A standard sizing ($500 max loss).

  Declaration 1: Named catalyst OR named probability thesis with time horizon in DAYS.
                 The catalyst does NOT need to have occurred or been confirmed.
                 It needs to be specific, assessable, and time-bounded.
                 VALID: "MU will beat — 26/27 analysts Buy, structural supply deficit."
                 VALID: "Hormuz mine clearance active, CODA in Northrop mine hunting supply chain."
                 VALID: "LRCX equipment orders will rise if MU Q4 guides up — report in 6 hours."
                 INVALID: "Market sentiment" or "it looks ready to move."
                 The stop (Declaration 2) must be set at THESIS COLLAPSE level, not at
                 the level where the news fails to confirm. If you can define thesis collapse,
                 you can take the position before confirmation. See P61.

  Declaration 2: Stop at a genuine thesis-break level.
                 The entry-day low is the standard reference.
                 Not an arbitrary round number. Not "a few percent below entry."
                 The stop must represent: if price hits this, the catalyst thesis
                 has failed and holding further has no logic.

  Declaration 3: Hard exit date or condition — stated before entry.
                 Examples: "Friday close regardless," "72 hours from entry,"
                 "pre-earnings close Wednesday."
                 The exit is time-bounded. This is not negotiable at exit time.

  PRECONDITION TO ALL THREE DECLARATIONS — T71 (added S63, 10 June 2026):
  A current chart MUST be requested and reviewed before any Strategy B entry.
  The chart sets the stop level (Declaration 2), confirms the premarket
  reference (T69), and validates the base/invalidation structure.
  Stop placement from memory, stale data, or price feeds alone is prohibited.
  Origin: NBIS S62 cancellation and NCLH S63 exit were both decided correctly
  off charts; T64 established chart primacy. T71 makes the chart mandatory.

### Sizing — Strategy B
Target: $10,000-$20,000 per trade depending on conviction and catalyst quality
Maximum single trade: $20,000
Maximum simultaneous Strategy B capital deployed: ~$51,500 (50% allocation)
Maximum concurrent Strategy B positions: 3-4

### The stop protocol — ABSOLUTE
The stop on a Strategy B trade moves in ONE DIRECTION ONLY — UPWARD.
Never lowered. Never widened. Never "give it one more session."

Once the stop is set at entry-day low:
  - If price moves up: raise the trailing stop to lock in gains
  - If price moves sideways: stop stays at entry-day low
  - If price drops to stop: trade closes, no intervention

This is non-negotiable. It goes against the entire logic of the trade
to widen a Strategy B stop. The trade was entered because the catalyst
exists. If price is dropping toward the stop, the catalyst is not working.
Accepting the stop loss is the correct outcome.

### Before session close — mandatory check
All Strategy B positions must have:
  [ ] GTC stop confirmed live in IBKR Orders tab
  [ ] Stop price above cost basis (as soon as the trade allows)
  [ ] Hard exit date noted in session log
If stops are not live and above cost before James closes the session,
the position must be exited at market before close. No exceptions.
This protects overnight positions during the limited monitoring window.

### Exit conditions — Strategy B
Priority order:
  1. Hard exit date/condition reached — SELL regardless of price
  2. Trailing stop triggered — SELL, no override
  3. Catalyst visibly fails (named event does not occur, news reverses) —
     EXIT immediately, do not wait for stop

### What Strategy B is NOT
- Not a replacement for Strategy A
- Not a reason to hold a losing Strategy A position at larger size
- Not applicable to names without a named, time-bounded catalyst
- Not a "let it run" strategy — the time boundary is the entire logic

---

## STRATEGY B — CATALYST CATEGORIES

The following catalyst types have proven or strong theoretical basis for
short-duration bounce trades. Actively scan for these every session.

### Category 1 — Geopolitical resolution (proven — S61)
Peace deal announcements, ceasefire confirmations, Hormuz reopening.
Vehicles: cruise operators (CCL, NCLH, RCL), airlines (UAL, DAL, AAL).
Trigger: WTI single-session drop >4% OR named ceasefire confirmation.
Duration: 72 hours maximum. Stop: entry-day low.

### Category 2 — Post-earnings bounce on quality name (proven — S60 SNPS)
A quality company that has sold off due to sector contagion or sentiment,
not fundamental deterioration, with a specific near-term recovery catalyst.
Three declarations must confirm the catalyst is specific and time-bounded.
Duration: days to first catalyst date. Stop: below the technical thesis base.

### Category 3 — SpaceX/IPO adjacency (framework — S61)
Major IPO or listing event creates sector sentiment catalyst.
Vehicles: sector-adjacent names with direct thematic connection.
Duration: 24-48 hours around listing day. Stop: entry-day low.

### Category 4 — Index inclusion / institutional forced buying
S&P 500 inclusion, MSCI rebalancing, or similar mechanical buying event.
Duration: 2-5 days around inclusion date. Stop: pre-announcement base.

### Category 5 — Mega cap with strong trend
Large liquid names (MSFT, AMZN, NVDA) where a specific catalyst
creates a defined short-term momentum window.
Stop starts tight at entry-day low. As trade moves into profit and
underlying trend remains intact, stop is raised — never lowered.
If conviction remains high after the initial catalyst period, the
stop doing its job IS the position management — do not interfere.
Duration: defined by catalyst, then stop-managed until triggered.

### MANDATORY VEHICLE SELECTION CHECK (added S79 — P60)
═══════════════════════════════════════════════════════════════════
Before any Strategy B entry, state in the session log:
  "Most direct vehicle: [NAME]. Reason not using it: [MAX TWO SENTENCES]."
  If the reason exceeds two sentences, the current vehicle is likely wrong.
  If the current vehicle IS the most direct — state that explicitly.
  This question must appear in the journal. Absence is a protocol violation.

Vehicle directness test: how many causal steps between the catalyst and the
vehicle's revenue? One step is correct. Two or more requires explicit justification.
  One hop:  MU beats → LRCX equipment orders (CORRECT)
  Four hops: MU beats → HBM demand → data centre connectivity → CRDO revenue (WRONG)
═══════════════════════════════════════════════════════════════════

### PRE-CATALYST PROBABILITY ENTRY FRAMEWORK (added S79 — P61 / E32)
═══════════════════════════════════════════════════════════════════
When the fund has conviction >70% on a specific binary catalyst and a direct
vehicle is identified, the position goes on BEFORE the event.

The protocol:
  1. Define Declaration 1 as a probability thesis, not a confirmed event.
  2. Define Declaration 2 as the thesis-COLLAPSE stop, not the news-fail stop.
     Thesis collapse = the level below which the underlying probability
     assessment is demonstrably broken, regardless of any announcement.
  3. Define Declaration 3 as the hard exit — event date or time horizon.
  4. Size at standard Strategy B sizing. The stop does the risk management.

Example (MU beat / LRCX, S79 correct approach):
  Dec 1: MU Q3 beat likely — 26/27 analysts Buy, structural supply deficit,
          prior quarter a record. LRCX is the primary DRAM equipment vendor.
  Dec 2: Stop $363.50 (Jun 23 session low — thesis collapse if LRCX breaks here).
  Dec 3: Hard exit 72 hours post-announcement.
  Entry: $374.80 (the night before MU reports). Not after MU confirms.

Waiting for confirmation after three declarations are completable is a
protocol violation under E32. If you can define the stop, take the position.
═══════════════════════════════════════════════════════════════════

### Actively hunt for Strategy B opportunities every session.
Strategy B should not be passive. At every session open, the question
is asked: what named catalyst exists in the next 1-7 days that could
drive a 5-15% move in a liquid name? If one exists, evaluate the
three declarations. If all three pass, it is a candidate.

SOURCING METHOD (SI-91, added S70-S72): the question above is answered by
working through STRATB_SOURCING_PROTOCOL.md, not by searching the news for
stocks that have already moved. Reactive news search only ever finds
catalysts that have already fired and already been priced in. The sourcing
protocol's forward calendar (IPO quiet periods, index reconstitution dates,
lockup expirations, 13D filings, contract award timelines) is the primary
tool. Reactive search remains valid only for same-day sympathy/second-order
plays (Category 8 of that file) after a lead name has already moved.

---

## STRATEGY B — PROOF OF CONCEPT LOG

| Trade | Session | Catalyst | Vehicle | Outcome |
|-------|---------|---------|---------|---------|
| SNPS bounce | S60 | Broadcom contagion + SpaceX IPO pre-positioning | SNPS 41sh $466 | +$206 — framework validated |
| Peace deal basket | S61 (pending) | Iran-Israel ceasefire + WTI trigger | CCL/NCLH/UAL/AAL | TBD |

Every completed Strategy B trade is logged here as the evidence base.

---

## THE PORTFOLIO HEALTH CHECK — WEEKLY

Every Friday session, ask explicitly:

Strategy A:
  - How many positions? (target: ≤8)
  - How many have a clear next catalyst within 90 days? (should be all)
  - Any position where the thesis has changed but the stop has not been
    raised toward it? (flag for exit)
  - Is the 50% allocation target being respected?

Strategy B:
  - Any live catalyst opportunities for next 7 days?
  - Any live Strategy B positions — are stops above cost?
  - Has the 50% allocation been sitting idle too long? (idle cash in
    this bucket should be hunting, not waiting)

---

## INTERACTION BETWEEN STRATEGIES

Capital from closed Strategy B trades returns to the Strategy B pool first.
It does not automatically migrate to Strategy A positions.

If Strategy B pool is fully deployed and a Strategy A opportunity arises,
it draws from cash reserve above the 10% floor — not from Strategy B.

If Strategy A pool is under-deployed and a Strategy B opportunity arises
that is exceptional, a one-time cross-allocation is permitted with explicit
session discussion and documentation.

---

## STANDING NOTES

SI-90 — STANDALONE MERIT RULE (added S63, 10 June 2026, per James):
  A name is NEVER rejected because it does not fit an existing fund theme
  or thesis bucket. The fund's only goal is superior compounded growth.
  Valid rejection grounds are limited to: fundamentals, valuation,
  correlation/concentration with existing exposures, entry timing, or
  absence of a catalyst where the strategy requires one.
  Themes define where we hunt. They do not fence what we may own.
  Origin: Iran-crisis thesis was the founding lens; it is now one input
  among many. Consistent with SCANNING_FRAMEWORK v2.0 discovery-first rule.

On stop discipline:
  The fund's worst outcomes have come from stops that were not respected
  or were lowered on the basis of narrative conviction. The stop is the
  risk management tool. Narrative conviction is a reason to size up on
  entry — it is not a reason to move a stop after entry.

On Strategy B engagement:
  James has noted these trades are more engaging and interesting than
  Strategy A holds. This is a feature, not a problem. Active engagement
  with shorter-duration trades improves decision quality and generates
  faster learning loops. Strategy B should be given equal analytical
  attention to Strategy A, not treated as opportunistic additions.

On compounding:
  A correctly executed Strategy B trade at $15,000 allocation with 8%
  gain produces $1,200 in 72 hours. Four such trades per month produces
  $4,800 in monthly gross — a 4.7% monthly return on the Strategy B
  allocation. That compounds materially faster than eight Strategy A
  positions averaging 15% per year. The constraint is catalyst quality
  and discipline — not position size.

---

Last updated: S61 | 9 June 2026 | Claude via filesystem MCP
Next review: S70 | Scheduled framework review after 10 Strategy B trades logged
