// TRADING JOURNAL S81 — Saturday 27 June 2026
// File: trading_journal90.jsx
// Session close: ~15:40 UAE
// Character: Saturday research and planning session. No live trades placed intra-session.
// UUUU stop confirmed executed during Friday 26 June NYSE session (post S80 close).
// Markets closed (weekend). NYSE opens Monday 30 June 17:30 UAE.

const journalS81 = {

  session: "S81",
  date: "Saturday 27 June 2026",
  closeTime: "15:40 UAE",
  marketStatus: "CLOSED — weekend",
  nextSession: "S82 — Monday 30 June 2026",
  nextJournal: "trading_journal91.jsx",

  ibkrReconciliation: {
    nlv: "$93,402.82",
    cashUSD: "$50,528.73",
    cashEUR: "-EUR19,339.92",
    cashGBP: "GBP2,117.11",
    unrealisedPnL: "+$1,339.84",
    realisedPnL: "-$492.83 (UUUU stop)",
    positionsHeld: 8,
    gtcPending: 3,
  },

  positionChanges: [
    {
      ticker: "UUUU",
      action: "STOPPED OUT",
      fill: "~$13.92",
      shares: 310,
      realisedLoss: "-$492.83",
      stopOrder: "1124369385 — EXECUTED and removed from order book",
      timing: "Friday 26 June NYSE session (after S80 closed at 14:30 UAE)",
      context: "$0.37 buffer at S80 close. Stop at $13.90 triggered during Friday NYSE session. Price bounced to $14.62 post-stop. Classic mechanics — stop handled the exit cleanly.",
      reEntryConditions: "Q2 July 31 earnings OR VAC acquisition update OR UAMY G7 bilateral confirmed + price holds $7+",
    },
  ],

  decisionsReached: [
    {
      name: "BTC Cycle Research",
      decision: "Scenario 0 (October 2026 Conviction Entry) established",
      detail: "ATH October 6 2025 at $126,296. Historical pattern 364-385 days → October 5-26 2026 bottom window. 50% conviction price level $42-46K (centroid $44K). ETF institutional floor prevents historical -77-84% drawdown. Current Scenario 2 INVALID (ETF outflows resumed $1.3B/week). Scenario 4 NOT triggered (BTC wicked to ~$57.5K but no daily close below $58K). CoinGlass API deferred to September 2026.",
    },
    {
      name: "MSFT Options Structure",
      decision: "2 × $380/$450 bull call spread, June 17 2027. Net debit $5,280. ORDER MONDAY pending V1 rows 5+7.",
      detail: "James conviction: $450 target, low conviction above $755. Burry Dec 2028 $700 calls NOT replicated (requires MSFT above $700 to profit — mismatch with $450 thesis). Bull call spread: break-even $406.40, max return $8,720 (+165%) at $450 cap. V1 rows 5 (Form 4 Nadella/Hood) and 7 (live chart) outstanding. MSFT regular session close ~$356 — Burry OTC move to $372 was extended hours only. Burry validates $349 stop: said '$350 is a good place to buy the stock.'",
    },
    {
      name: "LEU Strategy B",
      decision: "Pre-market entry Monday $165 limit Outside RTH. 33 shares. Stop $150.",
      detail: "DOE HALEU contract expires June 30. Two-year extension option (~$220M) is base case. Centrus-OKLO LOI signed June 25 raises extension probability to 90%. Retrospective trade principle applied: do not wait for announcement. Pre-catalyst entry at $165 vs post-announcement entry at $175-185+. Exit decision tree: (a) no announcement Monday → exit Tuesday; (b) negative → stop $150; (c) flat 1-year → exit bounce $175-180; (d) 2-year → hold, raise stop $160, target $190-210.",
    },
    {
      name: "GTBIF Funded Long / Catalyst Conversion",
      decision: "Stage 1 Monday. Structure decided pending price confirmation.",
      detail: "Adult-use cannabis Schedule III. DEA hearing June 29-July 15 hard deadline. ALJ recommendation 80-85% probability positive. Structure: 833sh at ~$6 = $5,000. Stop $4.50 event-based (same session negative ruling). Trim ~667sh at +25% bounce = recover $5,000. Free carry ~166sh at zero cost basis → Strategy A. Preferred vehicle over CRLBF (most % upside) because GTBIF has profitable floor ($76M Q1 operating CF, aggressive buybacks). Monday: IBKR OTC permissions + Stage 1 V1 table.",
    },
    {
      name: "Nuclear Sector Update",
      decision: "LEU promoted to Strategy B. CEG entry zone under review. NNE alert proximity flagged.",
      detail: "$17.5B AP1000 announcement June 23 (Westinghouse, 10 reactors) is large-reactor track — does not directly benefit OKLO or NNE. OKLO exit July 7 unchanged. NNE at $20.22, alert $18.93 (52-week low) is URGENT — Stage 2 mandatory same session if touched. CEG at $263 vs crash list $200-220: AP1000 announcement may require entry zone revision upward — assess next session.",
    },
    {
      name: "Macro Assessment",
      decision: "32% probability major market reset (>20% SPX drawdown) over 12 months.",
      detail: "CAPE 39.7 (148% above historical median). Goldman recession 30%, Moody's 45%, JPMorgan 35%. Iran war aftermath — stagflation risk but resolving. VIX 18.89 trending green. 10yr 4.375% green. Market AMBER trending GREEN. Burry is BUYING (MSFT LEAPs, FISV, JD, Adobe) — not positioned for imminent crash. Fund positions not changed based on macro; MSFT options max loss $5,280 is structurally contained.",
    },
    {
      name: "FISV Validation",
      decision: "HOLD confirmed. No action.",
      detail: "Michael Burry added FISV at $47.55 (fund entry $47.616 — within $0.07). World's most famous contrarian investor is co-investor in FISV at identical entry. Position confirmed $49.45 at S81. Q2 earnings July 22-29.",
    },
    {
      name: "CoinGlass API",
      decision: "DEFER to September 2026.",
      detail: "Hobbyist plan $348/year provides BTC derivatives scorecard data (funding rates, OI, liquidations). Free web tier covers same data manually. API adds programmatic access for Claude to query during sessions. Value proposition better when approaching October 2026 BTC entry window. Subscribe September.",
    },
  ],

  decisionsNotExecuted: [
    {
      name: "MSFT Options Order",
      decision: "PENDING MONDAY — V1 rows 5 and 7 required first",
      reason: "Form 4 SEC EDGAR check (Nadella, Hood 90-day) and live IBKR chart not yet completed. Protocol requires both before V1-GO block and order parameters can be finalised. Chain prices must be confirmed at Monday open — premiums will differ from Friday close.",
    },
    {
      name: "GTBIF Entry",
      decision: "PENDING MONDAY STAGE 1",
      reason: "Stage 1 research not yet run. IBKR OTC permissions not yet verified. Stage 1 V1 table required before any conviction rating or order. Structure decided; entry parameters require Monday price confirmation.",
    },
  ],

  mondayActionList: [
    "1. LEU — $165 limit Outside RTH before NYSE open 17:30 UAE. Stop $150 GTC immediately after fill. Monitor DOE announcement during session.",
    "2. UAMY G7 bilateral — deadline today June 30. Check DOE/State news. Re-entry if confirmed + UAMY holds $7+.",
    "3. TLRY — DEA hearing Day 1, 9:00 AM ET (17:00 UAE). Morning scan active. PASS maintained.",
    "4. GTBIF — IBKR OTC permissions check FIRST. Then Stage 1 V1 table from primary sources (10-K, 10-Q, Form 4 CEO buyback, analyst consensus).",
    "5. MSFT — Form 4 SEC EDGAR (Nadella, Hood, directors — 90-day lookback). Live IBKR chart (T71). Confirm chain prices. V1-GO block. Then order parameters.",
    "6. OKLO — Confirm stop $46 active. July 4 criticality is 4 days away. Raise stop to $50 if trades above $56.",
    "7. NNE — Alert $18.93. If touched: Stage 2 mandatory same session.",
    "8. GENB July 1 — GB-5267 Phase 1 first dosing. Minor positive, watch only.",
    "9. LEU announcement — Full decision tree per exit conditions. Time-critical response required.",
    "10. HNR1 stop — Confirm ONE stop only at session open S82.",
  ],

  portfolioSummary: {
    heldPositions: ["HNR1", "ZS", "FISV", "AGI", "AIRJ", "OKLO", "RHM", "XSG"],
    stoppedOut: ["UUUU — realised -$492.83"],
    gtcPending: ["ASTS $64.50", "KRMN $43.50", "RHM T2 EUR880"],
    strategyB: ["OKLO (active)", "LEU (Monday pre-market)"],
    plannedEntries: ["GTBIF Stage 1 Monday", "MSFT options Monday pending V1"],
  },

  notes: [
    "UUUU stop handled the exit mechanically as designed. $0.37 buffer at S80 close was correctly flagged as critical. No error in protocol.",
    "BTC October 2026 thesis is James's original instinct validated by cycle research. Historical 364-385 day pattern from ATH places the bottom window exactly in October.",
    "Burry's $700 strike Dec 2028 calls are NOT the fund's vehicle — require MSFT above $700 just to break even. Fund $380/$450 spread matches James's $450 conviction correctly.",
    "Retrospective trade lesson applied to LEU: pre-catalyst entry captures the re-rate that post-announcement entry misses.",
    "Cannabis sector: medical rescheduling is done. June 29 hearing is about adult-use only. TLRY is sentiment proxy, not direct economic beneficiary. GTBIF is the correct vehicle.",
  ],

};

export default journalS81;
