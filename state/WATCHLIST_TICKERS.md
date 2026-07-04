# WATCHLIST TICKERS — CONTRACT/CATALYST SCAN LIST
# Purpose: lean input file for the hourly Cowork undated-catalyst scan.
# Do NOT expand this into thesis writeups — one line per group only.
# Full context lives in DECISION_REGISTER.md; this file is a pointer list.
#
# STRUCTURE: one search per GROUP, not per ticker. Most groups are a single
# ticker. The cannabis group is three tickers sharing one underlying event —
# search once, log a hit against all three if found. Do not search per-ticker
# within a group; that defeats the point of grouping.
#
# SCOPE RULE: only undated, event-driven catalysts belong here. Anything with
# a known earnings date belongs in DECISION_REGISTER.md's Forward Catalyst
# Calendar instead — that's checked every session open, no search needed.
#
# Claude keeps this in sync with DECISION_REGISTER.md at session close if
# names are added/removed from active monitoring, or if a group's shared
# event resolves (e.g. DEA ruling lands — collapse the group, drop or
# re-scope depending on outcome).
# Last updated: S85 | 2 July 2026

GROUP: BAH | TICKERS: BAH | QUERY: "Booz Allen Hamilton contract award" | FLAG: any named federal contract award or loss, any agency
GROUP: KRMN | TICKERS: KRMN | QUERY: "Karman Holdings contract award" | FLAG: government/defense contract award decision
GROUP: ASTS | TICKERS: ASTS | QUERY: "AST SpaceMobile contract OR FCC spectrum" | FLAG: FCC spectrum ruling or government/defense contract award
GROUP: RKLB | TICKERS: RKLB | QUERY: "Rocket Lab contract award" | FLAG: government/defense contract award decision
GROUP: CODA | TICKERS: CODA | QUERY: "Coda Octopus Navy contract" | FLAG: Navy or defense contract award (mine-hunting systems)
GROUP: XSG | TICKERS: XSG | QUERY: "Xeros XF3 launch OR Xeros Russell Hobbs MediaMarkt" | FLAG: XF3 UK/Europe retail launch confirmation, Donlim shipment/sales confirmation, or Laundry Care (XC1) JDA signing — not routine RNS (AGM, block listings, TR-1)
GROUP: CANNABIS_ALJ | TICKERS: GTBIF,TLRY,CRLBF | QUERY: "DEA ALJ cannabis rescheduling recommendation" | FLAG: DEA ALJ recommendation on adult-use rescheduling — ONE search, log against all three tickers if found
GROUP: NNE | TICKERS: NNE | QUERY: "NANO Nuclear NRC KRONOS permit" | FLAG: NRC decision on KRONOS MMR permit
GROUP: UAMY | TICKERS: UAMY | QUERY: "US Antimony G7 bilateral" | FLAG: G7 antimony bilateral resolution — deadline passed June 30 unresolved, could land any day
GROUP: LEU_CONTRACT | TICKERS: LEU | QUERY: "Centrus Energy DOE HALEU contract" | FLAG: RESOLVED 2 July 2026 — contract signed July 1, see DECISION_REGISTER.md. Group retained for now in case of follow-on news (contract value disputes, further DOE options exercised) but the original undated trigger has fired. Reassess at next weekly review whether this stays in the hourly rotation or moves to the weekly sourcing pass instead.
GROUP: FAC | TICKERS: FAC | QUERY: "Factorial Energy resale registration SEC" | FLAG: founders' (Huang/Yu) resale registration statement declared effective on EDGAR — the P42 lock-up wildcard
GROUP: KRAKEN | TICKERS: KRKNF | QUERY: "Kraken Robotics contract award OR TSX listing OR Q2 2026 earnings" | FLAG: new named Navy/allied UUV contract, confirmation of the pending TSX listing, or the late-August Q2 print (first with real post-Covelya margin data) — CORRECTED S86W same session: this is WATCH ONLY, not a Stage 2 candidate, per James's explicit instruction (no capital currently earmarked for new thematic entries, watch and wait for timing plus funding to align). Full corrected picture (chart, quality deterioration, analyst spread, entry/stop/target framework held for later) in AUTONOMOUS_DEFENCE_SUPPLY_CHAIN_THESIS.md. Do not treat this group as a live order candidate without a fresh capital-availability check first.
GROUP: AMSC | TICKERS: AMSC | QUERY: "AMSC American Superconductor contract award" | FLAG: new named Navy fleet resiliency contract, major grid/transformer contract, or insider Form 4 activity — Stage 1 PASSED S86W, see ELECTRICAL_INFRASTRUCTURE_SUPERCYCLE_THESIS.md, Stage 2 pending
GROUP: OUST_ALERT | TICKERS: OUST | QUERY: "Ouster stock price" | FLAG: ALERT ONLY, not a Stage 2 candidate at current levels — flag if price pulls back 25-30% off recent highs ($61-64 area as of 4 July 2026), high-beta momentum name that already ran hard into the same factor unwind flagged in MARKET_HEALTH_CHECK.md Step 2B, do not chase at current levels
