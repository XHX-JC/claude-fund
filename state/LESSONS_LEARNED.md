## S57 AMENDMENTS — Thursday 4 June 2026

Session character: Most consequential session in fund history. Three new positions across three currencies. T35 closed on MU. Nine research items completed. TSMC CEO validated AI thesis from AGM podium same afternoon as MU entry.

Trades: HNR1 40sh @EUR224.60 (IBIS 11:00). CEG 30sh @$267.30 (NASDAQ 17:30). MU 10sh @$987.31 (NASDAQ 18:02).

New lessons:

### T64 — CHART PRICE SUPERSEDES SEARCH DATA (S57)
Origin: CRDO price misread as $143 (stale March search result) when chart clearly showed $214.60.
Rule: When a chart is provided, read the price label on the right axis FIRST before any web search. Chart is always ground truth for current price. Web search results for stock prices can be stale by hours or days.

### T65 — HNR1 STANDALONE STOP MANUAL CANCEL REQUIRED (S57)
Origin: HNR1 GTC stop EUR213 is not bracket-linked. IBKR cancelled the original bracket when XSG DAY order was modified.
Rule: On any HNR1 exit by any mechanism, the EUR213 stop must be manually cancelled separately. Failure creates an unintentional short sell of 40 shares. This note appears at every session open while HNR1 is held.

### T66 — IBKR BRACKET STOPS CANCELLED BY UNRELATED ORDER ACTIONS (S57)
Origin: XSG DAY order cancellation caused IBKR to cancel the HNR1 bracket stop as collateral damage.
Rule: After any order cancellation or modification, immediately check all open stops to confirm no collateral cancellations.

### P37 — CALCULATED RISK FRAMEWORK FOR EXCEPTIONAL ENTRIES (S57)
Origin: MU entered at $987.31 with $873 max loss vs $500 SI-35 cap.
Rule: SI-35 is a discipline rule not an absolute ceiling. Override criteria: (1) exceptional business quality, (2) defined near-term catalyst, (3) thesis validated by external evidence, (4) stop placed at genuine thesis-break level. Document all four before overriding.

Next journal: trading_journal72.jsx

---

## S58 AMENDMENTS — Friday 5 June 2026

Session character: Broad market selloff -1.06%. No trades. Five UNIVERSE candidates from screeners — strongest discovery session since S41. IBKR connector outage documented. CCL at 2.3% buffer — stop is mechanism, do not widen. MU continues down, thesis intact, June 24 is the clock.

### E31 — JOURNAL WRITTEN MID-SESSION NOT AT CLOSE (S57 error, corrected S58)
Origin: trading_journal70.jsx was written mid-session during S57 as a partial record. trading_journal71.jsx was then written at close as the authoritative record.
Rule: The journal is ONLY written at session close. Never mid-session. Never as a partial record. One session = one journal file = written once at close. Mid-session journal writes are an error class violation equivalent to E30.

### E32 — IBKR MCP CONNECTOR OAUTH PERSISTENT FAILURE (S58)
Origin: Three consecutive OAuth failures on 5 June 2026 during reconnection attempts.
Error codes logged: ofid_1f57389873bf4af4 | ofid_225ea3e0ad41b0ef | ofid_a360356f4361fbc4
Diagnosis: IBKR MCP server rejecting Anthropic server-to-server callback. Not user configuration error.
Resolution: Resolved S60 Monday. Connector working cleanly from S60 onward.

Next journal: trading_journal73.jsx

---

## S60 AMENDMENTS — Monday 8 June 2026

### T67 — PREMATURE EXITS WITHOUT STATED THESIS COMPLETION (S60 retrospective)
Origin: MRVL exited at $160.02 on May 7 for modest +$78 gain. No exit rationale recorded. Thesis intact. No stop triggered. No target reached. MRVL peaked $316 on June 4. Missed gain: $1,565 on 10 shares.

Rule: Every exit must satisfy one of four conditions before execution:
  1. TARGET REACHED — price reached the stated thesis target.
  2. THESIS BROKEN — a specific thesis condition failed.
  3. STOP TRIGGERED — mechanical exit. Correct by definition.
  4. CEILING JUDGEMENT — re-rating appears complete, stated explicitly in writing with reasoning before exit.

If none of the four conditions are met, the position stays.
"It is up, feels like a good exit" is not a valid exit condition.

### T68 — NEWS CHECK MANDATORY BEFORE ANY ENTRY RECOMMENDATION (S60)
Origin: SNPS Elliott activist board seat and GAAP earnings collapse not flagged pre-entry S60.
Rule: Material overhangs must be stated before order confirmation screen. Run T68 news check on every new entry.

### SI-35 REVISION — CONVICTION-WEIGHTED SIZING (S60)
  STANDARD trades:        $500 maximum loss per trade — unchanged, this is the norm
  HIGH CONVICTION trades: $900 maximum loss per trade — exception, requires explicit declaration

High conviction declaration required at entry — all three must be stated:
  1. Why this qualifies as high conviction — one sentence
  2. Stop level and why that level represents genuine thesis failure, not noise
  3. Position size calculated from $900 ceiling and stop width

Concentration ceiling: No single position to exceed 30% of net liquidity regardless of conviction.

Next journal: trading_journal74.jsx

---

## S61/S62 AMENDMENTS — Tuesday 9 June 2026

Session character: Dual session day (two chats). Strategy B fully validated. SNPS +$206 S61. AAL +$130, UAL +$249 S62. EXE stopped out -$96. CCL stopped out +$568. FRSH entered $9.30. Strategy framework established and written to Dropbox. 2.5% realised gains in one day from Strategy B alone.

### SI-89 — DUAL STRATEGY FRAMEWORK ESTABLISHED (S61)
Origin: SNPS S60 proof of concept validated. Strategy B formalised alongside Strategy A.
Rule: Two parallel strategies, structurally separate from entry to exit.

STRATEGY A — Core thesis positions:
  Long-duration, rerating thesis, fundamental catalyst required.
  Max 8 positions. $500 standard / $900 high conviction max loss.
  GTC stops mandatory. Stop moves UP only (exception protocol documented).
  Exit requires one of T67 four conditions.

STRATEGY B — Catalyst trades:
  Short-duration, event-driven, large allocation ($10-20K per trade).
  Three mandatory declarations at entry: (1) named catalyst + days, (2) stop at thesis-break level, (3) hard exit date.
  Stop moves UP ONLY — never lowered, never widened, never "give it one more session."
  All Strategy B stops confirmed live in IBKR before session close. No exceptions.

Capital allocation: 50/50 split. ~$51,500 each. Cash floor 10%.
File: STRATEGY_FRAMEWORK.md — read at every session open.

### T69 — PREMARKET STOP LOGIC FOR STRATEGY B (S62)
Origin: AAL and UAL entries today. Stop placement relative to premarket price proven correct.
Rule: Premarket price = honest market assessment on thin volume. Set Strategy B stop just below premarket level — not at arbitrary percentage.
Logic: Fill above premarket on open enthusiasm = thesis working. Drop back through premarket = bid evaporated = exit signal.
Example: UAL premarket $106.70. Stop set $106.47. UAL filled $107.82, ran to $110.96. Stop raised systematically. Exited $109.48 with +$249.
Gap down risk: acknowledged and accepted. If stock gaps below stop on open, fills at market. This is the known risk on catalyst trades — acceptable given tight sizing.

### T70 — HIGH-ATR PREMARKET PRINTS UNRELIABLE WITHIN 10 MINS OF OPEN (S62)
Origin: NBIS showed $213 premarket (from $230) within 10 minutes of NYSE open. Opened $229-231. Bad print on thin liquidity confirmed.
Rule: On names with daily ATR >$15, a premarket move >$10 within 10 minutes of open may be a single large order on no liquidity — not a genuine price discovery event.
Action: With >15 minutes to open, pause and verify before cancelling. With <5 minutes to open and uncertainty, cancellation is the correct risk-managed call.
NBIS specific: premarket prints within 10 minutes of open are unreliable. Always verify against the opening auction before acting on premarket extremes.
Outcome: NBIS opened $229-231. Cancellation was correct given time pressure but pattern noted for future reference.

### E33 — CHAT CONGESTION PROTOCOL (S61/S62)
Origin: S61 first chat became too congested and error-prone, requiring a second chat session.
Rule: When a chat session generates repeated errors or becomes cognitively congested, start a new chat. One journal per calendar day regardless of how many chats. The second chat summarises the first at open and continues from there. State files are the continuity mechanism — always current, always authoritative.

### STRATEGY B COMPOUNDING THESIS — CONFIRMED (S62)
Origin: 2.5% realised gain in one trading day from two Strategy B trades.
Observation: Short-duration catalyst trades with tight stops compound faster than long-term Strategy A holds that can be derailed by sentiment and macro. A 2-3% gain on $30K in 48 hours outperforms a 15% gain on $5K over 6 months.
Rule: Strategy B should be actively hunted every session. It is not opportunistic — it is an equal capital engine alongside Strategy A. The 50/50 allocation reflects this.
Reassessment trigger: After 10 Strategy B trades logged, review allocation split with full data. Do not change allocation on fewer than 10 trades.
Current log: SNPS +$206 (S60), AAL +$130 (S62), UAL +$249 (S62) = 3 trades, +$585 cumulative.

Next journal: trading_journal76.jsx

---

## S63 AMENDMENTS — Wednesday 10 June 2026

Session character: CPI day (benign: 4.2 in line, core 0.2 soft). Three exits: NCLH +$191 (C4), IES +£197 (C4), CEG −$690 (C3 hard floor). Two Strategy B entries into SPCX eve: LUNR 330 @ 27.65, RKLB 55 @ 110.52, both faded into close, stops at thesis levels, hard exit Thursday. Ten names researched, four UNIVERSE adds. T71 and SI-90 codified into STRATEGY_FRAMEWORK.md mid-session.

### T71 — CHART REQUIRED BEFORE ANY ENTRY (S63)
Rule: current chart requested and reviewed before order parameters are finalised, both strategies. No chart, no entry. Exits exempt. Codified in STRATEGY_FRAMEWORK.md (Strategy A entry requirements + Strategy B declarations precondition).

### T72 — MACRO PRINTS PASSED WITH LABELS AND VERIFIED (S63)
Origin: "4.43" — a typing timestamp (16:43) — was read as the CPI headline and the session briefly ran HOT protocols on it. The bond tape (10yr futures flush-and-recover, TLT flat) contradicted it within minutes and published data confirmed 4.2 in line / core 0.2 soft.
Rule: macro numbers passed between James and Claude carry explicit labels ("headline 4.2, core 0.2"). Any print that triggers a regime decision is verified against a second source AND the bond market reaction before protocols change. The bond tape is the fastest lie detector for a misread print.

### SI-90 — STANDALONE MERIT RULE (S63, per James)
Names are never rejected for failing to fit an existing theme. Valid rejection grounds only: fundamentals, valuation, correlation/concentration, entry timing, catalyst absence. Themes define where we hunt, not what we may own. Codified in STRATEGY_FRAMEWORK.md standing notes.

### P38 — RATE-SENSITIVE ENTRY TIMING (S63, CEG post-mortem)
Origin: CEG bought $267.33 on June 4 within days of its high, as the 10yr broke 4.5%, one lock-up cycle before known June 30 supply. Stopped $244.36 for −$690. Stop discipline after entry was clean; the entry paid top-of-range for a thesis whose two nearest events were both risks.
Rule: on rate-sensitive names, check the yield trend and any known supply events (lock-ups, offerings) before entry. A good thesis entered into rising yields and dated supply is a timing error, not bad luck.

### P39 — DUAL-ENTRY DEFINITIONS FOR CONSOLIDATION STRUCTURES (S63, ICHR miss)
Origin: ICHR assessed at $71-75 S63, zone set $63-66 only. Stock broke the $77 "triple top" next session, +10%. Misses: (1) ascending lows ($63→$65→$67) into static resistance is a compression that resolves up, not a range; (2) analyst PTs had migrated to/above the ceiling (avg $76.71, rising) after a +10%-above-consensus Q2 guide — fundamental estimates colliding with a technical ceiling makes the ceiling fuel, not a wall; (3) prior day's +7.3% close on max volume holding the full move = absorption at resistance, not rejection — real rejection gives the day back.
Rule: any consolidation-under-resistance with a live fundamental catalyst gets TWO defined entries — the floor zone AND a breakout trigger (daily close above resistance on elevated volume, stop below the breakout bar) — or an explicit statement of why only one applies. Refusing the mid-range chase remains correct; the error class is leaving the upper half of the playbook unwritten. Third instance of the late-entry pattern (LDO, R3NK sector-level; ICHR name-level).

### P40 — ABSORPTION AGAINST KNOWN SUPPLY = BULLISH SIGNAL, NOT A WARNING (S63 evening, FAC miss)
Origin: FAC +20% the session after we tightened its zone DOWN to $14-16 on PIPE-overhang logic. The prior day's tape showed price rising 7% into the close WHILE PIPE sellers were actively selling — absorption. Second instance of the identical misread inside 24 hours (ICHR +7.3% max-volume close at resistance, read as rejection). James's stated tape-read ('the market likes it') was overridden by structural logic instead of being weighed.
Rules:
1. ABSORPTION DEFINITION: identified supply hitting the tape (PIPE selling, lockup expiry, offering, overhead resistance) while price holds or rises on elevated volume = demand exceeding visible supply. This is a bullish confirmation signal, often violently so in low-float names. It is never, by itself, a reason to lower an entry zone.
2. FLOAT SYMMETRY: float analysis must be priced both ways — overhang risk AND scarcity fuel. Sub-20M float + demand confirmation = Strategy B accelerant. Writing only the bearish half is a structural analysis error.
3. WHEN ABSORPTION IS OBSERVED on a name we want: the output is a strength-confirmation entry design (trigger level, tight stop below the absorption bar, hard exit per Strategy B) — not a deferral to lower prices the absorption is telling us will not come.
4. OPERATOR TAPE-READ: when James's market-read and the structural analysis conflict, the conflict is stated explicitly and BOTH entry designs are written (pullback zone + confirmation trigger). The tape-read is data, not sentiment.
Guardrail: this does not license chasing +20% low-float days. Both FAC entries were definable BEFORE the surge; the lesson is pre-writing them, not buying surges retrospectively.

P39 SCOPE EXTENSION (same evening): the dual-entry rule applies not only to consolidation-under-resistance but to ANY name we want where only a pullback zone has been written. Every register entry that matters gets a floor zone AND a strength-confirmation trigger, or a stated reason why one side is excluded.

### STRATEGY B EXECUTION NOTES (S63)
- One-raise rule validated: RKLB limit raised once 109.29→110.52, vertical spike to 110.98 NOT chased, retrace filled the order. Chasing twice = being dragged.
- Ticket-at-trigger: building the ticket after the trigger fired cost ~$1.20/sh slippage on RKLB. When trigger and parameters are pre-agreed, build the ticket at the trigger.
- Noise-stop rule: never raise a stop to within ~1.5% of a high-beta name's price out of discomfort. Stops raise on strength (price moving in favour), never reposition into weakness. Two planned raises were correctly cancelled mid-session when the tape removed their buffers.
- Premarket relative-strength screen (CF-SCREEN-PRE, saved): TLT flat after a "hot" headline = bond market calling core soft — the single best pre-open tell of the day. Screen also surfaced the day's themes (insurer idiosyncratics, data-centre-power bid, junk-tier space speculation) before the open.
- Overnight override logged: both Strategy B stops below cost at close, contra the framework pre-close line; James's explicit decision, phone-monitored. "If the stop hits it hits."

### E34 — WRONG WRITE TOOL ON JOURNAL / FALSE VERIFY (S63)
Origin: the S63 close-protocol journal write used a container-local file tool instead of the filesystem MCP. The tool returned "success" — the file existed somewhere, but never reached Dropbox. Claude then stated "written to Dropbox" based on the success message alone. James caught the missing file ~30 minutes later. Journal rewritten via filesystem MCP and verified.
Rules:
1. ALL fund file writes use filesystem MCP tools only (filesystem:write_file / filesystem:edit_file). No other write tool touches fund files.
2. SESSION_CLOSE_PROTOCOL Step 5 (verify) means RE-LISTING THE JOURNAL DIRECTORY and confirming the new file appears in the listing. A write tool's success message is never sufficient verification.
3. Same verification standard applies to DECISION_REGISTER, FUND_SESSION_STATE, and LESSONS_LEARNED updates at close: the diff or re-read is the proof, not the return message.

Next journal: trading_journal77.jsx
