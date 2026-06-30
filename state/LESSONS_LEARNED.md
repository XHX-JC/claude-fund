## S83 AMENDMENTS — Tuesday 30 June 2026

Session character: Live session. MSFT high-conviction stock entry (sized, stopped, adjusted twice on James's instruction). LCII speculative entry on unverified network rumour, flagged but not blocked given disciplined sizing. ABVX history reconstructed from a prior session James referenced but that was never written into this file, a real documentation gap, closed this session. Full broker-statement backfill of TRACK_RECORD.csv (95 closed round trips, 9 open positions, fully reconciled against live IBKR). One new permanent lesson below, directly prompted by James reviewing the FAC history in the new track record and generalising it forward to SpaceX (SPCX).

### P62 — EARLY-INVESTOR DISCOUNT-BASIS OVERHANG SCREEN (S83)
Origin: T74 (PIPE Seller Distribution Pattern) and P42 (FAC Cooling-Off Rule) were both
written AFTER FAC had already cost the fund $7,579.38 across three entries in S64-S65.
Both lessons correctly diagnosed the mechanic, structured PIPE distribution from a $10.07
basis into a stock trading at $17-25, sellers sitting on 70-150% unrealised gains with no
lockup restricting them, systematic selling into every bid. But both lessons are reactive:
they teach how to recognise and trade around the pattern once it is already underway on a
name already held. Neither one is a PRE-ENTRY screen applied to a new candidate before any
capital is committed. Reviewing the newly-built TRACK_RECORD.csv this session, James named
the gap directly and generalised it: any name with a large cohort of early investors sitting
on outsized unrealised gains, with the ability to sell freely, is a structural distribution
risk regardless of whether the company is a SPAC, a PIPE deal, or a conventional IPO. SPCX
(SpaceX) was given as the live, current example, early backers sitting on what James assessed
as potentially billions in paper gains, with no reason to expect them to hold once any
unlock or lockup constraint lifts.

Rule: At Stage 1 research, for ANY new candidate, explicitly check and state:
  1. Does the company have a cohort (PIPE investors, pre-IPO venture rounds, SPAC sponsor
     shares, early employee/insider blocks) holding shares at a cost basis materially below
     the current trading price?
  2. Is that cohort's aggregate position large relative to free float?
  3. Is there an active lockup currently restricting their selling, and when does it expire
     (cross-reference STRATB_SOURCING_PROTOCOL.md category 3 for the dated mechanic)?
  4. If no lockup exists or it has already expired, treat the position as ALREADY under
     active or imminent distribution risk, not as a clean entry, regardless of how
     fundamentally attractive the thesis is.
If 1-2 are true and 3-4 indicate the cohort can sell now or imminently: PASS or DEFER until
T74's capitulation-volume signal (a single candle at 5-10x normal volume at session low,
followed by volume dry-up at that level) confirms the distribution has exhausted. This is
the same standard P42 imposed on FAC retroactively, applied here prospectively, before a
position exists, not after a loss creates one.

Application, SPCX specifically: do not enter SPCX, at any price, until (a) any operative
lockup on early investors and PIPE-style participants has fully expired, AND (b) a T74-style
capitulation/volume-dry-up signal confirms post-unlock distribution has actually finished.
The IPO quiet period already tracked on the forward calendar (~3 July, 25 days post-listing,
underwriter coverage initiation) is a DIFFERENT mechanic from an investor lockup and must not
be conflated with it, quiet period expiry can produce a genuine, separate bounce per category
1 of the sourcing protocol, while a lockup expiry on a name with this profile is a selling
event, not a buying one. Both dates need to be tracked on SPCX separately and explicitly
labelled as opposite-direction signals when they are identified.

This screen runs at Stage 1, before Stage 2 research time is spent, the same discipline as
checking cash runway or insider activity. Its absence on any new candidate where an early-
investor cohort plausibly exists at a discount basis is a protocol gap, not a judgement call.

---

## S80 AMENDMENTS — Friday 26 June 2026

Session character: Full live session. RHM Stage 2 complete (high conviction entry EUR880-945).
OKLO Strategy B entered $50.01 (200 shares, stop $46, hard exit July 7). TLRY Stage 2 PASS.
ZETA Stage 1 revoked after Palantir catalyst sold through base. Nuclear sector deep dive.
Multiple conviction assessments made and corrected mid-session after structural omissions
identified by James. V1 Conviction Verification Loop created to prevent recurrence.

### V1 — CONVICTION VERIFICATION LOOP (S80)
═══════════════════════════════════════════════════════════════════
Origin: OKLO conviction rating was stated as 55-60%, revised to 65%, revised to 70-75%
across three corrections in the same session. Each correction was triggered by James
identifying an omission — the Trump 10-plant nuclear announcement, the DOE construction
permit precedent, the $2.5B cash position from the Q1 earnings transcript. All three were
available in primary sources. All three were missed because the conviction assessment was
built reactively from secondary commentary (Motley Fool, Seeking Alpha) without first
completing a structured primary-source checklist.

Root cause: conviction ratings were being assembled from whatever was in context at the
time, not from a defined framework. This produces outputs that reflect recency bias and
source quality rather than completeness. An assessment built on incomplete information
always APPEARS complete — the gaps are invisible until a challenger surfaces them.

The fix is a visible output loop, not an internal check. The table below must appear in
the response before any conviction rating is stated. If any row cannot be filled with
a primary source finding, research continues until it can. The table appearing in the
response is the proof the loop ran. A conviction rating without the V1 table above it
is a protocol violation.
═══════════════════════════════════════════════════════════════════

V1 TABLE — MANDATORY BEFORE ANY CONVICTION RATING:

| V1 CHECK | Primary Source | Finding |
|----------|---------------|---------|
| 1. Cash and runway | 10-Q / 8-K balance sheet | |
| 2. Catalyst — named, dated, probability | Company IR / agency primary release | |
| 3. Regulatory pathway | Permit filings / agency docs | |
| 4. Sector policy backdrop | Government primary statements | |
| 5. Insider activity | Form 4 filings (SEC EDGAR) | |
| 6. Analyst consensus | Range, distribution, and recency | |
| 7. Technical setup | Chart per T71 (required) | |
| 8. Macro / sector headwinds | Named, sector-specific risks | |
| 9. Session cross-reference | What was established earlier today? | |
| 10. Challenge gate | What moves this 10pts either direction? | |

LOOP RULE: If any row is blank, the rating cannot be published. Return to research,
fill the gap, re-run the table. The table must appear IN FULL in the session output.

### V1-S — SOURCE HIERARCHY RULE (S80)
Origin: The AP1000 announcement was characterised as a headwind for OKLO because
a Motley Fool article framed it that way. The actual DOE press release and Chris Wright's
quoted words ("all technologies", "dozens of these going forward") were never consulted.
The secondary source missed the primary signal entirely.

Rule: Secondary commentary (Motley Fool, Seeking Alpha, news articles, analyst notes)
is used to LOCATE information only. Conclusions are drawn from PRIMARY sources:
  - SEC filings (10-Q, 10-K, 8-K, Form 4)
  - Agency primary releases (DOE.gov, DEA.gov, NRC.gov, SAM.gov)
  - Company earnings call transcripts
  - Government official quoted statements (not press summaries)
  - Exchange filings (prospectuses, Form S-1, prospectus supplements)

If a primary source has not been read, any conclusion drawn from secondary sources
is marked PROVISIONAL until confirmed. Provisional conclusions cannot anchor a
conviction rating or a go/no-go entry decision.

### V1-GO — GO/NO-GO REASSESSMENT LOOP (S80)
═══════════════════════════════════════════════════════════════════
This is the enforcement mechanism for V1 at the point of actual entry decisions.
Every go/no-go decision on a conviction trade runs through this loop explicitly
before the order parameters are stated. It cannot be substituted by a prior V1
run earlier in the session — the loop runs fresh at the decision point.
═══════════════════════════════════════════════════════════════════

At the point of GO/NO-GO decision, explicitly state:

  GO/NO-GO REASSESSMENT — [TICKER]
  ─────────────────────────────────
  V1 table: COMPLETE / INCOMPLETE [if incomplete, state which rows and pause]
  Primary sources confirmed: [list the actual filings/releases read]
  Conviction at V1 completion: [X%]
  What I missed on first pass: [explicit statement — "none" only if genuinely verified]
  Does the omission change the rating? [YES/NO and direction]
  Revised conviction: [X%]
  Three declarations: DEC1 [complete/incomplete] DEC2 [complete/incomplete] DEC3 [complete/incomplete]
  GO / NO-GO: [state explicitly]

This block must appear in the session output before order parameters are given.
Its absence when a conviction trade is being discussed is a protocol violation
equivalent to missing T71 chart review.

Why both V1 and V1-GO exist: V1 runs during research. V1-GO runs at the decision point.
The gap between research and decision is where omissions get carried forward. Running
V1-GO forces a fresh challenge at the moment that matters.

---

## S79 AMENDMENTS — Thursday 25 June 2026

Session character: Full live session. MU Q3 FY2026 blowout (revenue $41.46B, EPS $25.11, Q4 guide $50B/86% GM, +19.33%). PCE May in-line (core 3.4% YoY). EU gap trades opened and closed (WAF -EUR390, ASM +EUR157, BESI -EUR171). AEHR Strategy B entered $100.04, stopped out $96.195 (-$771). LRCX entry window missed (Category 9 at $390). Heavy research session. BTC wick to $57,800 bounced. NLV -$1,949.48 on the day. Seven lessons recorded (five below from early session, P59 and T78 in S78 section from same extended session period). Note: str_replace was incorrectly used on this file during session close — caught and corrected via filesystem:write_file per P52.

### T80 — OUTSIDE RTH ON OFFICIAL EUROPEAN EXCHANGE PRE-OPENING: TICK IT ON CONFIRMED DIRECTIONAL CATALYSTS (S79)
Origin: James asked directly whether to tick Outside RTH on BESI and ASM (AEB/Euronext) orders during the pre-opening session. Advice given was do NOT tick it. James pushed back and asked again. Wrong advice was maintained. Result: BESI and ASM did not participate in the Euronext pre-opening auction (09:15-11:00 UAE), which ran with real volume and real price discovery. BESI moved EUR292.9 to EUR312+ during that window. ASM moved EUR969 to EUR1,018-1,056. WAF, where James correctly had Outside RTH ticked on IBIS/XETRA, filled at EUR91.75 during pre-opening at a better price. BESI and ASM filled at worse prices at regular session open. This lesson was identified and pushed for by James. The advice against it was wrong.

The distinction:
  WRONG (do NOT tick): US after-hours OTC routing before 4AM ET — Blue Ocean, dark pools, genuinely thin wide-spread venues.
  CORRECT (TICK): Official European exchange pre-opening sessions — AEB (Euronext Amsterdam), XETRA/IBIS (Frankfurt), LSE (London). These are the exchange's own official pre-opening auction, the same session visible on the chart. Not a dark pool.

The risk calculus James identified:
  Risk of NOT ticking on a hot confirmed catalyst: pre-opening moves away, fill at worse price at open, or miss trade entirely if pre-opening pushes stock past limit before auction.
  Risk of ticking on a hot confirmed catalyst: pre-market participants dump at regular session open into position.
  On a HOT, DIRECTIONAL, POST-EVENT catalyst (MU blowout, sector moving 7-9% overnight): first risk is HIGHER than second. Pre-market participants on a confirmed-catalyst stock at open are NOT dumping — they hold into institutional volume arriving at regular open. Regular session open brings buyers, not sellers, into a confirmed move. Ticking Outside RTH captures better pre-opening entry; regular session volume reinforces the position.
  On COLD, UNCERTAIN, or PRE-EVENT catalysts: second risk may be higher. Assess per situation.

Structural disadvantage of NOT ticking (James's point): a DAY limit order without Outside RTH only executes at the opening auction. If pre-opening pushes the IOP above the limit, the opening auction clears above the limit and the order does not fill at all. The trader who filled in pre-opening sits on a gain; the trader who waited has no position and must chase. The order designed to avoid pre-opening risk instead guarantees the worst outcome: no pre-opening fill AND potentially no regular-session fill either.

Rule: For EU exchange pre-opening sessions (AEB/Euronext, XETRA/IBIS, LSE), on a confirmed directional post-event catalyst:
  1. TICK Outside RTH.
  2. Set limit at maximum acceptable price (the ceiling, not current pre-opening price).
  3. Order fills at best available pre-opening price up to limit.
  4. Stop set at thesis-collapse level regardless of fill location.
For non-directional, uncertain, or pre-event entries: assess separately. Outside RTH is not automatically correct in those cases.

### P61 — CONFIRMATION BIAS IS STRUCTURALLY EMBEDDED IN THE THREE-DECLARATION FRAMEWORK (S79)
Origin: MU posted the strongest semiconductor quarter in history. The fund had high conviction on the beat. The vehicle chosen was CRDO — a four-hop indirect beneficiary with a concurrent index reconstitution thesis. LRCX, the single most direct MU beneficiary, was identified but not entered because the plan was to "enter after MU confirms the beat." By the time the beat was confirmed, LRCX had moved 9% in after-hours and the window was closed. The same pattern applies to CODA — the register condition "named mine-clearance contract" guarantees entry only after the stock has already re-rated on the announcement.

Root cause: Declaration 1 of the Strategy B framework requires a "named, identifiable event." This is interpreted in practice as a CONFIRMED event — a press release, an earnings print, a filing. By requiring confirmation before entry, the framework systematically produces post-catalyst entries disguised as pre-catalyst ones. The sourcing protocol (SI-91) was designed to fix this by sourcing catalysts by scheduled date rather than result. The execution reverts because the confirmation requirement overrides the sourcing discipline at the point of the entry decision.

Rule: Declaration 1 does NOT require a confirmed event. It requires a credible, time-bounded, assessable probability. "MU will beat based on supply constraint data and 26 of 27 analyst buys" is a valid Declaration 1. "Hormuz mine clearance is active and CODA supplies Northrop's mine hunting system" is a valid Declaration 1. The stop is set at the level where the probability thesis collapses — not at the level where the news has been confirmed and the market has already moved.

The three-declaration check now reads:
  Declaration 1: Named catalyst OR named probability thesis with time horizon. The catalyst does not need to have occurred. It needs to be specific, assessable, and time-bounded.
  Declaration 2: Stop at thesis collapse level. Not news reversal level — thesis collapse level.
  Declaration 3: Hard exit date regardless.

This is the single most important structural change in this file. Every other lesson in this file is downstream of failing to apply it.

### T79 — INDEX RECONSTITUTION EFFECTIVE DATES PRODUCE SUPPLY NOT DEMAND (S79)
Origin: RKLB on NDX inclusion (S69) and CRDO on Russell 2000 to 1000 reconstitution (S78-S79) both failed to produce positive price action on or near the effective date. Two explicit data points from this fund's own execution history confirm the pattern.

Mechanic: Smart money front-runs the announcement/confirmation of inclusion. Between announcement and effective date, speculative buyers build positions anticipating the mechanical buying. On the effective date, those speculative holders EXIT into the forced buying from index funds — creating supply that absorbs or overwhelms the mechanical inflow. The effective date is a distribution event for holders who entered on the announcement, not a demand event.

Rule: Index reconstitution ANNOUNCEMENT is the entry signal. Effective DATE is the exit signal for those who entered on announcement. The fund should never enter a position specifically targeting the effective date of an index change. The edge is in the announcement-to-effective-date window, not on the effective date itself. Any name added to the forward calendar under Category 2 of STRATB_SOURCING_PROTOCOL must carry an explicit note: ENTER ON ANNOUNCEMENT, EXIT BEFORE EFFECTIVE DATE. Failure to apply this is an error class violation.

Secondary note: CRDO on June 24 hit $259.72 intraday (both stops at $264 triggered) before recovering to $282+ post-MU results. The stop at $264 was correct given CRDO's $24 intraday range. The error was not the stop — it was choosing a name with 24-point intraday swings and setting a $6 stop width on it. Stop width must be calibrated to the name's actual intraday range, not to the desired max loss. If the required stop width produces an unacceptable max loss, the name is the wrong vehicle.

### E32 — PRE-POSITION ON HIGH-CONVICTION BINARY BEFORE THE EVENT (S79)
Origin: The fund had a near-certain thesis on MU's Q3 beat: 26 of 27 analysts rated Buy, structural supply deficit confirmed, prior quarter a record. The correct trade was LRCX, AMAT, or MU itself, held going INTO the announcement with stop at the thesis-collapse level. Instead, the plan was to enter LRCX after results confirmed. The after-hours move from $374 to $400+ closed the window before pre-market opened.

The math on what was left on the table: LRCX at $374 with stop at $363.50 = $10.50 max loss per share x 24 shares = $252 total risk. LRCX moved to $400+ = $26 gain per share x 24 shares = $624 minimum gain. R/R was 2.5:1 going into the event. We declined to take a 2.5:1 trade with strong thesis because we wanted to wait for confirmation. The confirmation delivered 0:1 — the window closed.

Rule: When conviction on a specific binary catalyst is high (>70% confidence) and a direct vehicle is identified:
  1. The position goes on BEFORE the event with a stop at thesis-collapse level.
  2. The downside of being wrong (position stopped at $252 loss) was trivial against the upside of being right ($624 minimum).
  3. Waiting for confirmation is not risk management. It is risk avoidance disguised as discipline. The actual risk is in the opportunity cost of inaction, not in the position.
  4. This rule applies to ANY name where the fund has done sufficient research to define a thesis-collapse stop level. If you can define the stop, you can take the position. Waiting for confirmation after that point is a failure mode, not a protocol.

### P60 — DIRECT CATALYST REQUIRES DIRECT VEHICLE (S79)
Origin: With high conviction on a MU beat, the fund chose CRDO (four hops from MU: MU revenue to HBM demand to CRDO connectivity need to CRDO price). LRCX is one hop (MU revenue to LRCX equipment orders to LRCX price). BESI is one hop (MU HBM ramp to BESI die-stacking equipment to BESI price). The four-hop vehicle performed worst. The one-hop vehicles moved most directly and predictably.

The specific failure: two simultaneous theses on CRDO (MU read-through + Russell reconstitution) created the illusion of higher conviction. In reality, two independent uncertain theses create two independent ways to be wrong. The stacking of theses on an indirect vehicle does not improve the trade — it amplifies the complexity and the failure modes.

Mandatory pre-entry check (added S79): Before committing to a Strategy B vehicle, answer explicitly in the session log: "What is the single most direct vehicle for this catalyst, and what is the specific reason we are not in that instead?" If the reason requires more than two sentences, the vehicle is probably wrong. This question must appear in the journal for every new Strategy B entry from S79 forward. Its absence is a protocol violation.

---

## S78 AMENDMENTS — Wednesday 24 June 2026

Session character: Most active session by trade count. Three stops triggered (KRMN -$491, UAMY -$398, CRDO first entry -$313). Three new positions entered (FISV, UUUU, CRDO re-entry). Comprehensive multi-name research. DHI +$27 intraday bounce missed. MU earnings pending 00:30 UAE. Two new lessons below.

### T78 — PRE-MARKET ENTRY DISCIPLINE (S78)
Origin: CRDO pre-market entry this morning. Alert triggered at $22.49 while CRDO was at $272 pre-market. Multiple attempts to enter at $280, $282, $284, $281.50 all failed to fill due to IBKR's reference price protection mechanism. The SMART router parks orders when the limit price diverges too far from the prior close reference price. By the time the issue was diagnosed, CRDO had moved $5 above the original target entry and R/R had deteriorated.

The attempted ARCA directed routing as a workaround was partially informative — the ARCA order at $281.50 also failed to fill, though in this case the likely cause was Blue Ocean ATS illiquidity (the session was before 4AM ET official pre-market open) rather than the reference price protection specifically. Both causes result in the same outcome: the order does not fill while the stock moves away.

Rule: The only viable pre-market entry on a volatile name is one placed before the directional move begins — ideally the prior evening or at the very start of official pre-market (12:00 UAE / 4AM ET) before volume picks up and reference price divergence triggers the protection mechanism. Once a stock is running in pre-market, chasing by raising the limit repeatedly introduces execution uncertainty and deteriorating R/R without improving fill probability. The correct response to a missed pre-market entry is a resting limit at a realistic dip level and patience. If the entry cannot be placed before movement, the fallback is NYSE open with a live chart and fresh R/R calculation. A resting limit at $270 (the dip target) ultimately filled correctly later the same session — validating the patient approach over the chase.

### P59 — DHI MISSED STRATEGY B — QUALITY OVERSOLD + SAME-DAY MACRO DATA = VALID STRATEGY B (S78)
Origin: DHI (DR Horton, largest US homebuilder) fell -10.95% at NYSE open on June 24 on May new home sales data. The CF-SCREEN-SI39 (thesis drawdown watchlist) screener caught it at $138.99 at 15:20 UAE — two hours before NYSE open. Full analysis was completed. The position was incorrectly assessed as Strategy A only (patient hold, Q3 earnings July 21) rather than as a valid same-day Strategy B bounce trade. DHI opened at approximately $138, held the intraday low, and closed near $165.84 — a $27 intraday move (19.4%) in one session.

The three declarations were completable at the time of the 15:20 UAE analysis:
(1) Catalyst: May new home sales data released that morning — named, specific, already known to be the cause of the -10.95% decline.
(2) Stop: Entry-session intraday low, approximately $129 — the level below which the macro data reaction became a structural breakdown rather than an overreaction.
(3) Hard exit: July 21 Q3 earnings — the next binary that could change the fundamental picture.

The fundamental quality threshold was met: P/E 14.1x (lowest in years for DHI), analyst consensus $165+ (>20% above the intraday low), $6B total liquidity, $2.5B buyback program, Q2 showed net sales orders +11% YoY. This was a quality business being repriced by rate fears, not a business in distress.

Rule: A quality name meeting ALL of the following constitutes a valid Strategy B structure when it falls >8% on a same-day macro data release:
  (1) QUALITY threshold: P/E below 15x (or equivalent for the sector), analyst consensus more than 20% above the distressed price, and demonstrably strong balance sheet (liquidity > 2 years of operations, no near-term debt maturity risk).
  (2) CATALYST: The specific named macro data release (e.g. May new home sales, PCE, non-farm payrolls, ISM) that caused the move must already have been released. The overreaction IS the catalyst — it is a known, dated event. Not a future expectation.
  (3) THREE DECLARATIONS completable: Stop at the intraday low of the entry session (thesis fails if it breaks that low). Hard exit at next earnings date (do not hold through a second binary without fundamental confirmation).
  (4) TIMING: Enter within the first 30 minutes of the NYSE session if the intraday low holds on contracting volume and price stabilises above that low.
  (5) SIZING: $10K standard Strategy B. This is not a speculative volatile-tier trade — it is a quality company at a macro-induced oversold level with high confidence of V-reversal given the published data.

This is categorically different from a vague "macro sentiment bounce." The distinguishing feature is the published, specific, named data release as the confirmed catalyst, combined with demonstrable quality thresholds that make the overreaction objectively identifiable as excessive relative to fundamentals.

DHI was the second instance of this pattern in the fund's history after the precedent of multiple quality names in the 2024-2025 rate-sensitivity periods. It will occur again whenever Fed hawkishness creates rate-fear selloffs in quality rate-sensitive names (homebuilders, REITs, utilities, financials) on macro data days. The P59 framework applies to all such occurrences.

---

## S76 AMENDMENTS — Monday 22 June 2026

Session character: First live NYSE session after a 4-day gap (Juneteenth + weekend). Four new positions opened (ZS, KRMN, AIRJ, UAMY), all filled at or below limits. Major sector research: critical minerals (G7 declaration), water/data centers (AIRJ thesis confirmed). CRDO Stage 1 complete. Key data integrity error identified and corrected (RKLB NDX flow timing). One new lesson below.

### P54 — EOD API PRICE DATA vs IBKR REGULAR SESSION CLOSE PRICE (S76)
Origin: S73 (trading_journal84.jsx) claimed RKLB's Thursday 18 June volume was 70.3M shares (2.6x normal average of 26.9M), and used this as evidence the NDX inclusion forced-buying flow had already fired on June 18, before the effective date. S75 stated this "70.3M volume claim did not reproduce against IBKR data." S76 EOD API pull again returned 70.3M for RKLB. When James observed RKLB at -2.55% pre-market on June 22 (the NDX effective date) — not the +X% one would expect from still-incoming forced buying — IBKR snapshot confirmed $104.52, down -2.54% from the $107.24 prior close reference. RKLB opened -2.6% at the NYSE open, definitively confirming no forced buying was arriving on the effective date.

The actual data integrity issue: EOD API volume and close fields can include Blue Ocean ATS/extended-hours data alongside or instead of the regular session 4pm close. The $107.24 "close" was confirmed as the actual June 18 regular session close (IBKR used it as the prior-close reference for the change calculation). But the 70.3M volume figure could not be verified as exclusively regular-session volume without a direct IBKR pull. The error was stating a flow conclusion as confirmed fact based on an EOD volume figure whose session composition had not been verified.

Rule: Do not use EOD API volume figures to assert that a dated mechanical event (NDX inclusion/exclusion MOC, S&P 500 inclusion MOC, Russell reconstitution MOC, any closing-auction rebalancing event) has or has not executed. Regular-session volume must be pulled directly from IBKR get_price_history or an equivalent per-session breakdown before any such claim is made as fact. EOD close prices may be reliable in many cases, but EOD volume composition (regular vs extended hours) cannot be assumed without verification. Cross-reference with IBKR is mandatory before stating any flow conclusion. Confidence ratings must be explicit when EOD is the sole source.

Secondary note: S75 stated the 70.3M "did not reproduce on IBKR data." S76 EOD confirmed 70.3M again. The most likely explanation is that IBKR weekend price-data pulls (when US markets are closed) can return different volume numbers than real-time session data — possibly due to consolidation timing, data-vendor lag, or ATS inclusion policies that differ between the two providers. Both claims were made in good faith. The lesson is: when two authoritative sources produce conflicting volume figures for the same session, treat the flow question as UNRESOLVED, not as confirmed or denied, until a third verification (intraday chart review or direct print-level check) is run.

---

## S75 AMENDMENTS — Sunday 21 June 2026

Session character: weekend research session, no trading (markets closed). Heavy Stage 1/Stage 2 work across nine names (FISV, MX confirmed, ZS, MRAM, GEV, BE, KGS, AIRJ) plus a corrected understanding of the Iran/Hormuz situation and a full RKLB Strategy B build. James directly questioned why the fund's own sourcing process had not found ZS's re-investigation trigger or AIRJ at all — this produced two new STRATB_SOURCING_PROTOCOL categories. One new lesson below.

### P53 — TWO DISCOVERY GAPS: STALE REGISTER NAMES AND NARRATIVE-DRIVEN MICROCAPS (S75)
Origin: James asked directly why ZS and AIRJ were not properly surfaced by the fund's existing process. Investigation found two distinct, real gaps, not one:

(1) ZS was never lost — it sat on DECISION_REGISTER the entire time, but under a stale "SUSPENDED, NDX removal headwind" label dating to before a 27 May 31% single-day earnings crash. The crash itself — a $8B market-cap, worst-day-in-company-history event on a name already tracked — never triggered any re-investigation. Only the much smaller, unrelated NDX-removal mechanical note got carried forward. The existing P44/P45 discipline (mandatory decision when a Stage-2-complete name sits IN ZONE) has no equivalent for a name sitting STALE after something material already happened to it. Fixed via new category 20 (Stale Register Re-trigger): any register name moving 15%+ in a single session, or any entry untouched for 3+ weeks, gets flagged for mandatory fresh review at next session open.

(2) AIRJ was never on the register at all and would not have been found by any of the existing 19 sourcing categories — it is not a dated-catalyst story (categories 1-13) and not a structural-mispricing story in the sense those categories mean (categories 14-19). It is a thematic/regulatory-narrative story: an escalating political fight over AI data center water and power use creating demand for a specific class of small-cap solution provider, well before that demand shows up in any conventional screener. It surfaced only because James personally knew of the company's UAE relationship — a valid channel, but one the fund's systematic process had zero equivalent coverage of. Fixed via new category 21 (Thematic/Regulatory Narrative Sourcing): when a political/regulatory narrative surfaces in the course of any other research, explicitly ask which small/microcap companies sit directly in its path as either a beneficiary of the restriction or a solution to the underlying problem, and run a dedicated search on that question before moving on.

Rule: both gaps are now covered by STRATB_SOURCING_PROTOCOL.md Part C (categories 20-21, SI-94). Category 20 runs as a cheap mechanical check every session open. Category 21 runs on the weekend deep-dive cadence alongside categories 14-19, since it requires unstructured research time. Neither replaces the value of James's own direct knowledge — that remains a real and valid sourcing channel — but the fund's systematic process should no longer be blind to either pattern type going forward.

---

## S70-S72 CATCH-UP AMENDMENTS — Friday 19 June 2026

Session character: no Claude session ran 17 or 18 June. James managed the book directly while unable to monitor continuously. Three positions (ORCL, FRSH, KRMN) closed via stops during the gap. Reconstructed entirely from IBKR trade history at this session's open, with the one judgment-call trade (KRMN, manually trailed stop) confirmed directly with James before being logged. Later in the same session, a structural flaw in Strategy B sourcing was identified and fixed. Three new lessons below.

### P49 — SESSION GAP RECONSTRUCTION (S70-S72 catch-up)
Origin: three live trading days passed with zero Claude session, zero journal entries, zero DECISION_REGISTER updates, despite three positions closing and one (KRMN) involving an active manual judgment call by James to trail a stop tighter than originally set. The trade itself was sound and fully compliant with the stops-only-up rule — the gap was purely in documentation. Without a full trade-history pull at this session's open and a direct question to James, the reasoning behind the KRMN exit would have been permanently lost, indistinguishable from a routine stop-out, with nothing to correct the fund's own record.

Rule: when a session gap is discovered at open (last journal older than the current date by more than one trading day), the FIRST action — before any new analysis — is a full get_account_trades pull spanning the gap, cross-referenced against the last known position state, to identify every fill that occurred unsupervised. Any fill that does not match a pre-existing GTC order at its original, unmodified level (i.e. any order that was replaced, trailed, or otherwise touched) must be raised directly with James as a specific question before being logged, not silently reconciled or silently assumed routine. Mechanical stop-outs at unchanged pre-set levels can be logged directly from trade history. Anything else needs the human who made the call.

### P50 — TIME_PROTOCOL HOLIDAY BLIND SPOT (S70-S72 catch-up)
Origin: the mandatory bash time-check script tests current UAE hour against standard NYSE/LSE trading windows only — it has no holiday calendar. On 19 June (Juneteenth, NYSE closed) the script reported NYSE OPEN because 22:08 UAE falls inside the normal 17:30-00:00 UAE window. Caught manually via a general market news check, not by the protocol itself. Had it not been caught, the session would have proceeded to request screeners against a closed exchange.

Rule: before treating NYSE as open for any live-trading purpose (screener requests, real-time order discussion, fill expectations), cross-check the date against known US market holidays (New Year's Day, MLK Day, Presidents Day, Good Friday, Memorial Day, Juneteenth, Independence Day, Labor Day, Thanksgiving, Christmas) for the current year, not just the bash clock's hour output. The bash script remains correct and mandatory for time-of-day and timezone arithmetic — it simply does not encode the holiday calendar and should not be relied on alone to answer "is NYSE open today."

### P51 — STRATEGY B SOURCING WAS STRUCTURALLY REACTIVE (S70-S72 catch-up)
Origin: asked to find fresh Strategy B candidates, every name surfaced — RKLB, INTC, SPCX/Cursor — came from searching "what already moved." By construction, a stock already in a headline for a 10%+ move has already absorbed the catalyst into its price. James correctly identified that this method can only ever find trades that are already over, and pushed for a fundamentally different approach rather than a better search query.

The fix, built and integrated this session as STRATB_SOURCING_PROTOCOL.md (SI-91): source candidates by the SCHEDULED DATE of a catalyst, before the outcome is known, instead of by the RESULT, after it's already priced. Ten categories defined, each with its own sourcing method — IPO quiet period expirations (validated academically, ~25 days post-IPO, real and dated), index reconstitution calendars, lockup/greenshoe expirations, strategic-alternatives/13D filings, FDA/regulatory decision dates, government contract award timelines, short-interest-plus-catalyst overlays, same-day sympathy plays, a hard re-entry discipline rule for names that already moved (rather than blanket avoidance), and options positioning as a confirm/deprioritize filter.

Immediate output: SPCX and FAC, both already in the fund's files, both IPO'd June 8, both have quiet period expiration ~July 3 — a real, dated, near-term catalyst on two names the fund already holds context on, found only once the sourcing method changed.

Rule: Strategy B hunting at every session open now runs through STRATB_SOURCING_PROTOCOL.md's forward calendar first. Reactive news search is retained only for same-day sympathy/second-order plays after a lead name has already fired — never as the primary discovery method.

### P52 — WRONG TOOL WROTE TO THE WRONG FILESYSTEM (S70-S72 catch-up)
Origin: STRATB_SOURCING_PROTOCOL.md was first created using the generic create_file tool (Claude's own sandbox container) instead of filesystem:write_file (the actual Dropbox MCP connector). The tool reported "File created successfully" — true, just for the wrong location. Two subsequent filesystem:edit_file calls to SESSION_OPEN_PROTOCOL.md and STRATEGY_FRAMEWORK.md succeeded and now reference a file that, at the time, did not exist anywhere in Dropbox. Caught only because a later filesystem:edit_file call against the same supposedly-existing file returned ENOENT, prompting a directory listing that confirmed the file was never there.

This is a close cousin of P47 (verify the right connector before concluding something is broken) but the inverse failure mode: P47 was using the wrong READ tool and wrongly concluding access was down; this is using the wrong WRITE tool and wrongly concluding a write had succeeded. Both are "tool selection," not "system failure."

Rule: any new file intended for the fund's Dropbox MUST be created with filesystem:write_file, never the generic create_file/str_replace/bash tools, which operate on Claude's own sandbox and will report false success against a Dropbox-shaped path. After creating any new (not edited) file claimed to be in Dropbox, verify with filesystem:list_directory on its parent folder before treating the write as confirmed — do not rely on the creation tool's own success message alone, the same way P47 requires verifying a read tool's output rather than trusting it blindly.

---

## S69 AMENDMENTS — Tuesday 16 June 2026

Session character: live trading session, James travelling. Two Strategy B stop outs (ASTS -$372.51, RKLB +$15.71), one new Strategy A entry (KRMN, high conviction tier, filled clean at the open). Extensive FAC and CODA diligence, both kept on watch with sharpened conditions rather than entered. HEI reviewed and passed on valuation. One new lesson below.

### P48 — UNDEFINED LABELS CARRIED FORWARD ACROSS SESSIONS (S69)
Origin: the FAC "Bell" catalyst had been referenced as a known, self-explanatory term across the register, the lessons file, and at least two journals for several sessions, with no file ever actually defining what it was. When James asked directly what it meant, the honest answer was that no definition existed anywhere in the fund's own files, only the label and a date. A web search resolved it in one call, it is the Nasdaq Opening Bell ceremony marking FAC's SPAC closing, a PR event, not a fundamental catalyst, but the fund had been carrying the term for days without anyone, including Claude, having actually verified what it referred to.

This is a close cousin of P46 and P47 but distinct from both: P46 is about misreading a chart that is in front of you, P47 is about checking the right tool before declaring something broken, this one is about jargon and shorthand terms persisting across sessions and being treated as understood simply because they appeared in a prior file. The risk is silent: nothing flags an undefined term as a problem until someone asks about it directly.

Rule: when introducing any named catalyst, event, or shorthand term into the fund's files for the first time, include a one line definition of what it actually is, not just a label and a date. When reading an existing file and encountering a term that is not self-evident and has no definition anywhere in the fund's files, treat that as a gap to close before relying on it, the same way a stale price or an unverified rumour would be treated, rather than assuming a prior session must have already verified it.

---

## S68/S69 AMENDMENTS — Monday 15 / Tuesday 16 June 2026

Session character: S68 was the most active live session since the worst-loss S64 — ASTS Strategy B entry, RKLB order adjustment and fill, LMT stop discipline rewarded, ORCL profit lock, peace basket correctly declined, FAC correctly held off. It was not written to Dropbox in real time because of a filesystem MCP access issue on the laptop, discovered and resolved at S69 open. Two new lessons below.

### P46 — CHART TIMESTAMP VERIFICATION (S68/S69)
Origin: multiple chart-reading errors across S68 and S69. A stale RKLB price sourced from a web search result was reported as current and contradicted by James's own TradingView screenshot. The ASTS daily/15m chart was misread three separate times in one session — a stale chart period treated as live, a 'post-launch reaction' article treated as describing an event that had not yet happened, and a weekly view's aggregate candle misread as a single day's candle. Separately, a launch date was mislabelled 'Tuesday 17 June' across five fund files when 17 June 2026 is a Wednesday — an error that persisted through several sessions before being caught.

Rule: before stating any verdict drawn from a chart (base/no base, trend direction, capitulation/no capitulation, which session a candle belongs to), state out loud which candle(s) are being read and their exact date/time label as shown on the chart's own axis or OHLC readout, cross-referenced first against the system clock (bash date check) for the current real date. If the chart's exchange has not opened yet relative to the current time (e.g. LSE before 11:00 UAE), say explicitly that the rightmost candle is from the prior session, not live. This is a verification step, not a one-time fix — apply it every time a chart is read, not only when something looks off.

### P47 — VERIFY ALL REGISTERED MCP CONNECTORS BEFORE DECLARING ACCESS DOWN (S69)
Origin: a capitalised 'Filesystem' MCP connector and a separate lowercase 'filesystem' MCP connector are both registered for this laptop. Early in S69, only the capitalised one was checked, it resolved to a stale local clone (C:\Users\jcadb\claude-fund, last journal 51), and Dropbox access was incorrectly reported as down. James asking 'check the MCP link, perhaps this is impaired' prompted a check of the second connector, which was live the whole time and correctly bound to C:\Users\jcadb\Dropbox\Claude-Fund. Nothing was actually broken between the Saturday S66W session and S68/S69 — the wrong tool was simply called.

Rule: if a filesystem/Dropbox/Drive-type tool reports an unexpected or stale result, check whether more than one similarly named connector is registered before concluding the underlying service is down. Call list_allowed_directories (or the equivalent capability-listing call) on every registered variant, compare the returned paths, and only report an outage if all variants point to the expected location and still fail. Do not generalise a single failed connector into 'access is impaired' language to the user without this check.

---

## S67 AMENDMENTS — Sunday 14 June 2026

Session character: No-trade Sunday research session. Opening protocol executed. Iran deal not signed (Iranian FM confirmed). Orders reconciled — all GTC stops confirmed Submitted. RKLB PENDING_CANCEL_REPLACE resolved to Submitted. AIP regime miss identified and documented. Protocol updated to prevent recurrence (P44/P45).

No trades executed. Journal written for record and protocol integrity.

### P44 — STAGE 2 IN-ZONE PASSIVE DEFERRAL FAILURE — SECOND HPE INSTANCE (S67)
Origin: AIP (Arteris Inc) had Stage 2 complete with entry zone $32-35. Deferred early June under condition "regime score less than or equal to 13." During S63-S65, AIP was at $34-37 — inside the entry zone — while sessions were dominated by FAC crisis and peace basket trades. No explicit binary decision was made on any of those days. The deferral label created implicit permission to skip escalation. By S67 (Sunday 14 June), AIP had rallied to $41.22, 18-28% above the entry zone. Window closed without a conscious pass or entry decision.

This is the second instance of the HPE failure pattern. HPE sat in zone for six weeks (S55 origin). DECISION_REGISTER.md was built specifically to prevent this. It failed because deferral status silenced the mandatory escalation check during high-activity sessions.

Rule: Any Stage 2 complete name within 5% of its entry zone MUST receive a MANDATORY BINARY DECISION at every session open — stated explicitly, above the proximity table, in a dedicated sub-header. A deferral label does NOT silence this requirement. Deferral must be actively renewed every session with a new condition and deadline stated in the session log. Passive carry-forward of a deferral is a protocol violation.

Regime note: At AMBER (score 8-13), Stage 2 complete + name in entry zone + crash stress test PASS = eligible for entry. Regime deferral applies to names where Stage 2 is incomplete or the crash stress test is marginal. It is not an appropriate gate for fully research-ready names. AIP would have passed the crash stress test at $34 (asset-light IP licensing, recurring revenue, no commodity sensitivity). The regime was the wrong gate. The crash stress test was the right gate, and AIP would have cleared it.

Implementation: SESSION_OPEN_PROTOCOL.md Step 7 updated with mandatory sub-step 7A. DECISION_REGISTER.md updated to prominently flag Stage 2 in-zone names.

### P45 — DEFERRAL RENEWAL REQUIREMENT (S67)
Companion rule to P44. A deferral is a one-session decision, not a standing state.

At every session open, any name with DEFERRED status must:
  (a) Be actively renewed: new condition stated, new deadline set, documented in session log
  (b) Or be escalated to ENTER or PASS

A name cannot carry "DEFERRED [condition]" across multiple sessions without active renewal at each one. If a deferral is not explicitly renewed in a session, it escalates to MANDATORY DECISION at the next open. No exceptions for high-activity sessions — if FAC is burning and a Stage 2 name is in zone, the binary decision still gets made first.

---

## S64 AMENDMENTS — Thursday 11 June 2026

Session character: Worst single-day loss in fund history. -$5,855 daily P&L. Two FAC entries. First entry correct thesis, execution failure. Second entry at session lows with tight stop, overnight thesis intact. SPCX prices tonight.

Trades: FAC 870sh @$24.97 (E35 error, -$5,122). FAC 800sh @$17.75 (open). LW +$47. ZENA stop +$115. ACM stop -$20.

New lessons:

### E35 — IBKR APP FREEZE STOP CANCELLATION PROTOCOL (S64)
Origin: IBKR app froze during the FAC open waterfall (price falling from $25 to $21). During the restart, the chart was watched first rather than immediately replacing the stop. The stop had been cancelled by the app during the freeze. By the time it was replaced at $19.50, the position was already -$4,000+ unrealised. The position eventually stopped out at $19.08 for -$5,122.

Rule: If IBKR app freezes during any active position, the SINGLE FIRST ACTION on restart is to verify and replace the stop. Not the chart. Not the price. Not the unrealised P&L. Stop first. Everything else second. This is non-negotiable and permanent.

Application: Applied immediately on the second FAC entry same session — stop placed simultaneously with entry order, confirmed visible on chart before any other action was taken.

### T73 — DE-SPAC ATH OPEN REJECTION PATTERN (S64)
Origin: FAC repeated the June 9 pattern on June 11 exactly. Opened at/near ATH ($25.20), violent rejection, waterfall sell to $17. This occurred on both day 2 (June 9) and day 4 (June 11) — both times FAC opened near ATH resistance.

Rule: Low-float de-SPAC names testing prior ATH resistance on open produce open-drive fake-outs as PIPE sellers distribute into the bid. The ATH break requires a DAILY CLOSE above resistance, not an intraday touch or premarket spike. Large position sizing on a de-SPAC at ATH resistance requires daily close confirmation. Intraday ATH touch = distribution opportunity for PIPE holders, not confirmation of breakout.

### T74 — PIPE SELLER DISTRIBUTION PATTERN (S64)
Origin: FAC's waterfall from $25 to $17 was structured PIPE seller distribution. PIPE basis $10.07, sellers sitting on 70-150% gains at $17-25. Systematic selling into every bid.

Identifiable by: unbroken lower highs and lower lows, no sustained bounces for more than 2-3 candles, consistent red volume throughout the session with bounces on minimal volume.

Rule: PIPE distribution cannot be fought by buying dips. Must be waited out. Recovery requires a capitulation volume spike (single candle with 5-10x normal volume at the session low) followed by volume dry-up at that level. This is the signal that PIPE sellers have finished for the day. The June 9 pattern produced this signal at $15.40 around 19:30 UAE. June 11 produced a partial signal at $17.40-17.70.

### P41 — MANAGEMENT QUALITY AS CONVICTION ANCHOR, NOT STOP OVERRIDE (S64)
Origin: FAC management known personally to James via his network. Institutional demand at $100+ confirmed. Backers: In-Q-Tel, Mercedes, Stellantis, Hyundai, Kia. This context strengthened thesis conviction and supported re-entry at session lows.

Rule: Management quality and institutional backing are legitimate inputs for thesis conviction and willingness to re-enter after a loss. They are NOT grounds for widening stops, cancelling stops, or holding through a stop level. The business quality makes the thesis worth re-entering at a better price — it does not make the current entry immune to loss.

### STRATEGY B SIZING WITH MAXIMUM ALLOCATION (S64 reinforcement)
Origin: both FAC entries were at or near maximum Strategy B allocation ($20K+). The first entry produced the largest single loss in fund history due to E35. The second entry reduced to $14K with a tighter stop ($0.95 stop width = $760 max loss).

Rule: Maximum Strategy B allocation ($20K) is reserved for names where the stop width produces a manageable max loss AND the stop can be mechanically protected. On a de-SPAC with demonstrated 40% intraday range, a $21.00 stop from a $24.97 entry is a $3.97 stop width = $3,455 max loss at 870 shares. That is above the $900 high conviction ceiling. The override was logged and accepted, but the lesson is: stop width x shares = max loss, and this must be calculated before sizing, not after.

---

## S65 AMENDMENTS — Friday 12 June 2026

Session character: Most active session in fund history. 4 exits (FAC -$1,551, RKLB +$221, CODA +$124), 2 entries (ORCL $20K conviction, FAC $10K). SPCX listing day. Iran ceasefire confirmation from both sides. Space sector crashed. ORCL entered as highest-conviction position in fund history.

Trades: FAC 579sh @$17.39 stopped $14.71 (-$1,551). RKLB 55sh stopped $114.56 (+$221). CODA 250sh stopped $11.60 (+$124). ORCL 108sh entered $184.51 (open, holding).

New lessons:

### T75 — DE-SPAC STOP SLIPPAGE RULE (S65)
Origin: Three FAC stops across S64-S65 all slipped significantly. First: $16.80 stop, $16.636 fill ($0.164 slippage). Second: $16.80 stop, $16.636 fill ($0.164 slippage). Third: $15.40 stop, $14.71 fill ($0.69 slippage). The third stop gapped entirely — price went through $15.40 with insufficient liquidity to fill, eventually filling at $14.71.

Rule: On de-SPAC names with 10-15M tradeable float, assume $0.50-0.70 stop slippage when calculating maximum loss. Actual max loss = (shares x stop width) + (shares x $0.60 slippage estimate). For 579 shares with $2.00 stop width: planned max = $1,158, actual max with slippage = $1,158 + $347 = $1,505. The S65 actual loss of $1,551 was within this adjusted range.

Application: all future low-float entries (de-SPACs, micro-caps, names with <20M tradeable shares) must calculate max loss INCLUDING the $0.50-0.70 slippage adjustment before sizing is confirmed.

### T76 — LIMIT/STOP COORDINATION ON HARD EXIT DAY (S65)
Origin: RKLB S65. Limit sell set at $139.98 (near ATH, aspirational). Stop at $114.57. The limit was cancelled (never reached) as SPCX sell-the-news crashed space stocks. The stop triggered at $114.56 for a +$221 gain instead of the potential +$1,619 at the limit.

Rule: On hard exit days, the profit-taking limit should be set at a REALISTIC level near current price, not at aspirational targets. A $125-130 limit might have filled on the premarket spike from $120; $139.98 was never realistic given SPCX sell-the-news dynamics. The limit exists to capture spikes within the probable range, not to set a target price at ATH. If in doubt, set the limit 5-8% above current price, not 15-20%.

### T77 — PREMARKET ENTRY VALIDATION (S65)
Origin: FAC premarket entry at $17.389 vs the $17.50 limit. James's instinct to enter premarket was correct on the mechanics. With a $15.40 stop giving $2+ of room, the $0.18 difference between premarket ($17.39) and potential open price ($17.50+) was immaterial to risk but could have been material to upside if the Day 2 pattern had played out.

Rule: On high-conviction Strategy A entries with wide stops (>$1.50 stop width), premarket entry is valid IF: (a) bid/ask spread is <$0.30, (b) limit is set at or near the ask, and (c) the Outside Regular Trading Hours box is checked. The traditional "wait 30 minutes" rule applies primarily to T73-class names (ATH open rejection patterns on de-SPACs), not to base-level entries with structural stops. This does not apply to Strategy B entries which should still observe the 30-minute rule due to tighter stops.

### P42 — FAC COOLING-OFF RULE (S65)
Origin: Three entries on FAC in S64-S65, three losses totalling -$7,564. Each entry was thesis-justified but each was made during active PIPE distribution from the $10.07 basis. The PIPE selling overwhelmed buying interest at every level between $14 and $25.

Rule: No fourth FAC entry without ALL of the following: (1) minimum one full session gap (no same-day re-entry), (2) fresh Stage 2 reassessment including PIPE distribution status and cash runway analysis, (3) confirmed PIPE exhaustion evidenced by volume dry-up at a tested base (not just a price level holding for 30 minutes), (4) price stable at a level for 2+ sessions (not just a single session bounce). The June 17 Bell catalyst alone does not override this rule.

Note: The thesis may be correct. The company may reach $50+. The error was not conviction — it was timing. PIPE distribution on a de-SPAC in its first trading week is a structural headwind that cannot be overcome by fundamental analysis. The correct entry is AFTER the PIPE sells exhaust, not during.

### P43 — IBKR MARKET DATA UPGRADE (S65)
Upgraded to US Securities Snapshot + US Equity/Options Streaming Bundle ($14.50/month). Live streaming Level 1 across NYSE/Nasdaq/AMEX. Replaces delayed/snapshot data. Standing operational note for all sessions.

Next journal: trading_journal79.jsx
