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
Diagnosis: IBKR MCP server rejecting Anthropic server-to-server callback. Not user configuration error. Each attempt generated a fresh ofid code confirming new handshake attempts, all failing at the same server-side point.
Resolution path: Retry connector authentication at S59 Monday open. If fails, escalate to Anthropic support with all three error codes.
Anthropic support noted as low-responsiveness — retry before filing ticket.
Fallback protocol: IBKR TWS screenshots for positions and orders tab. Screeners unaffected. EOD price data available via EOD connector.
Impact: Portfolio verification relies on screenshots rather than autonomous connector pulls until resolved.

Next journal: trading_journal73.jsx

---

## S60 AMENDMENTS — Monday 8 June 2026

### T67 — PREMATURE EXITS WITHOUT STATED THESIS COMPLETION (S60 retrospective)
Origin: Fund retrospective analysis of January-June 2026 trade history. MRVL was exited at $160.02 on May 7 for a modest +$78 gain. No exit rationale was recorded in the journal. The AI networking thesis was intact. No stop was triggered. No target had been set or reached. MRVL subsequently peaked at $316 on June 4 — four weeks later. Missed gain: $1,565 on just 10 shares. On a properly sized position this would have been $10,000+.

Rule: Every exit must satisfy one of four conditions before execution:
  1. TARGET REACHED — price reached the stated thesis target. Acceptable.
  2. THESIS BROKEN — a specific thesis condition failed (catalyst missed, fundamentals deteriorated, sector re-rated without us). Acceptable.
  3. STOP TRIGGERED — mechanical exit. Correct by definition.
  4. CEILING JUDGEMENT — re-rating appears complete, stated explicitly in writing with reasoning before exit. Acceptable.

If none of the four conditions are met, the position stays.
"It is up, feels like a good exit" is not a valid exit condition.

Contrast — exits done correctly:
  IBM: Sold $309, now $280. Condition 4 — ceiling judgement, multiple at highs, no next catalyst.
  AMZN: Sold $264, now $246. Condition 4 — largest gain in fund history, peace deal thesis intact but WTI still elevated.
  ZETA: Sold $23, now $16. Condition 4 — multiple expanded, no clear next catalyst, losses 9x revenue.
  All three proved correct. All three had written reasoning.

MRVL had none of the four conditions met. The rules were not written clearly enough at the time to prevent it.

Prevention: Before any profitable exit, state in the session which of the four conditions is being satisfied.
If the answer is none, do not exit.

---

### SI-35 REVISION — CONVICTION-WEIGHTED SIZING (S60)
Origin: Fund retrospective confirmed position sizing has been too conservative on high-conviction entries. MRVL, FRSH, and recovery trades all identified as undersized relative to conviction level. SI-35 $500 max loss cap was set when fund was at $50K-$70K net liquidity. At $103K it artificially constrains high-conviction trades.

Revised SI-35 rule:
  STANDARD trades:        $500 maximum loss per trade — unchanged, this is the norm
  HIGH CONVICTION trades: $900 maximum loss per trade — exception, requires explicit declaration

High conviction declaration required at entry — all three must be stated:
  1. Why this qualifies as high conviction — one sentence
  2. Stop level and why that level represents genuine thesis failure, not noise
  3. Position size calculated from $900 ceiling and stop width

Without all three stated, the trade defaults to standard $500 sizing. No exceptions to the exception.

Example at 3% stop width:
  $500 max loss = ~$16,500 position size
  $900 max loss = ~$30,000 position size
  Stop must be placed at a level that represents real thesis failure — not arbitrary round numbers.

Concentration ceiling: No single position to exceed 30% of net liquidity regardless of conviction or stop width.
At $103K net liquidity: hard ceiling $30,900 per position.

Implementation: Applies to all new entries from S60 onward. Existing positions governed by original sizing at entry.
