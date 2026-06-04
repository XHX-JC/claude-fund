## S57 AMENDMENTS — Thursday 4 June 2026

**Session character:** Most consequential session in fund history. Three new positions across three currencies. T35 closed on MU. Nine research items completed. TSMC CEO validated AI thesis from AGM podium same afternoon as MU entry.

**Trades:** HNR1 40sh @€224.60 (IBIS 11:00). CEG 30sh @$267.30 (NASDAQ 17:30). MU 10sh @$987.31 (NASDAQ 18:02).

**Order modifications:** EXE stop $80→$82.50 (SI-35 override closed). CEG limit $265→$268 (T62 lesson). HNR1 stop €213 placed post-fill (bracket cancelled by XSG order action — T66).

**Pending:** XSG 40,000sh GTC market order — fill attempt Monday LSE open. SNPS $455 limit approaching (~$462). CHG 460p — 8% above limit.

**Research completed:** MU Stage 1+2 (entered). CRDO Stage 2 (alert $185). POWL Stage 2 (alert $260). MTX.DE Stage 2 (alert €330). LRE Stage 1 (alert 560p, cyclical). SIVE Stage 1 (UNIVERSE, wait for US listing). XSG Stage 1 (entered SI-37). CWR assessed (skip). AVGO assessed (alert $379.78, Stage 2 on trigger).

**Scans run:** CF-SCREEN-EU-CONT (100 results), CF-SCREEN-EU-UK (170 results), CF-SCREEN-D (1 result — SPSK, no fit), CF-SCREEN-B (11 results — AI semi complex), CF-SCREEN-SI39 (3 results — AVGO, CLS, FIVE). New finds: LRE (MONITORING), CLS Celestica (UNIVERSE, Stage 1 Monday).

**Macro:** WTI $95.50. SI-25 C2 gap $0.22. Lebanon-Israel ceasefire June 3 — Iran blocking variable addressed. TSMC CEO June 4: "It will be a long time before we can meet customer demand." Split market — AVGO -15%, SMH +0.78%, MRVL +5.17%.

**New lessons:**

### T64 — CHART PRICE SUPERSEDES SEARCH DATA (S57)
**Origin:** CRDO price misread as $143 (stale March search result) when chart clearly showed $214.60. Used wrong data source for current price.
**Rule:** When a chart is provided by the user, read the price label on the right axis FIRST before any web search. Chart is always ground truth for current price. Web search results for stock prices can be stale by hours or days. Error was caught immediately on challenge — correct response. Prevention: price label first, search second.

### T65 — HNR1 STANDALONE STOP MANUAL CANCEL REQUIRED (S57)
**Origin:** HNR1 GTC stop €213 is not bracket-linked. IBKR cancelled the original bracket when XSG DAY order was modified. Replacement stop is standalone GTC.
**Rule:** On any HNR1 exit by any mechanism, the €213 stop must be manually cancelled separately. Failure creates an unintentional short sell of 40 EUR shares. This note appears at every session open while HNR1 is held. Generalisation: always verify bracket linkage on EU-listed stops — IBKR bracket behaviour on non-US exchanges can be unreliable.

### T66 — IBKR BRACKET STOPS CANCELLED BY UNRELATED ORDER ACTIONS (S57)
**Origin:** XSG DAY order cancellation caused IBKR to cancel the HNR1 bracket stop as collateral damage. Mechanism unclear.
**Rule:** After any order cancellation or modification, immediately check all open stops in the Orders tab to confirm no collateral cancellations. Add to session open cross-check: positions vs stops verification. Every position must have a confirmed stop or a documented reason for none (e.g. IES free ride).

### P37 — CALCULATED RISK FRAMEWORK FOR EXCEPTIONAL ENTRIES (S57)
**Origin:** MU entered at $987.31 with $873 max loss vs $500 SI-35 cap. Deliberate override on exceptional case justification.
**Rule:** SI-35 is a discipline rule not an absolute ceiling. Override criteria: (1) exceptional business quality, (2) defined near-term catalyst, (3) thesis validated by independent external evidence, (4) stop placed at genuine thesis-break level not arbitrary percentage. Document all four before overriding. The user's $900 stop suggestion was better than the advisor's $850 — tighter stop improves R/R on all targets and more honestly defines when the thesis is broken. When the user provides better risk thinking, acknowledge and adopt immediately.

**Next journal:** trading_journal72.jsx
