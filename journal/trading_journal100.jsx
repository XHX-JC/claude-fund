// trading_journal100.jsx
// S90-S91 — Thursday 9 July 2026 — full session, one continuous trading day covered
// across two session labels, same convention as journal98.jsx merging S87+S88.
// S90 = session open through pre-market research and file infrastructure work.
// S91 = market open, four position closes, and the research that followed.

export const journal100 = {
  session: "S90-S91",
  date: "2026-07-09",
  headline:
    "Longest session on record. Opened by rebuilding the fund's external-intake " +
    "infrastructure after Cowork was fully scrapped (SESSION_BRIEF.md and " +
    "OPPORTUNITY_SCAN.md repurposed with real mechanics, ANALYST_WATCH.md created for " +
    "Bert Hochfeld plus five TipRanks-verified analysts), then ran a full comparative " +
    "workup on KTOS vs KRMN that James pushed back on hard and productively, correcting " +
    "the fund's own overstated Valkyrie/CCA framing (USAF Increment 1 went to General " +
    "Atomics and Anduril, not Kratos) and adding a new sourcing category for manufacturing " +
    "capacity signals. GTBIF entered pre-market via a resting limit, still unfilled. LEVI " +
    "entered mid-session off a verified ChatGPT-sourced scan. At market open, four " +
    "positions closed within the same few minutes: LEVI and RIVN stopped out (RIVN banked " +
    "a small gain, LEVI a small loss on what turned into a same-day right-call-wrong-stop " +
    "lesson once the stock ran to +2.49% after the exit), CRM stopped out on a real, " +
    "credible KeyBanc downgrade, AVAV stopped out on an RBC valuation downgrade for a " +
    "genuine loss that sat inside the risk band accepted when the stop was widened the " +
    "same session. A live account reconciliation found a real orphaned LEVI sell order " +
    "and a PDYN stop discrepancy, both flagged. Three new permanent lessons written " +
    "(P69, P70, P71) after a search-discipline failure on AEHR and a direct, fair critique " +
    "from James that the fund's own research had been shipping half-checked answers. " +
    "Six screener tabs reviewed in full. Fresh Stage 1 work completed on IONS (a real " +
    "trial failure with a genuinely nuanced subgroup signal underneath it) and DUOT (a " +
    "real business with a structurally repeating dilution problem, sourced originally " +
    "from an external trader's tip that never went through this fund's own process). " +
    "POWL and CRS both added to the watchlist off screener hits, neither actionable at " +
    "current prices.",

  externalIntakeInfrastructureRebuilt: {
    trigger:
      "James confirmed Cowork is fully scrapped, not just the hourly WATCHLIST_TICKERS.md " +
      "scan already retired at S86W. All external scanning now runs on his own ChatGPT " +
      "system, feeding this project rather than running inside it.",
    workDone: [
      "SESSION_BRIEF.md and OPPORTUNITY_SCAN.md, previously entries in the mandatory read " +
        "list marked skip-if-absent and never actually created, both written for real with " +
        "defined roles: SESSION_BRIEF.md is the raw, unverified landing zone James pastes " +
        "into, cleared at every close; OPPORTUNITY_SCAN.md is the permanent, append-only " +
        "verification ledger recording what happened to each item after checking it.",
      "ANALYST_WATCH.md created: Bert Hochfeld (Seeking Alpha, weekly check, 71.77% " +
        "verified TipRanks success rate across 122 stocks, his 2012 hedge-fund " +
        "misappropriation conviction logged for completeness) plus the five TipRanks " +
        "verified top analysts James named from a screenshot (Brophy/Stifel, Merchant/" +
        "Citi, Malik/Citi, Horowitz/Citi, Arcuri/UBS), checked every session.",
      "SESSION_OPEN_PROTOCOL.md and SESSION_CLOSE_PROTOCOL.md both updated with the new " +
        "Step 3G (analyst watch) and Step 2D (clear SESSION_BRIEF.md, confirm " +
        "OPPORTUNITY_SCAN.md current) respectively.",
      "Real-world test same session: a genuine ChatGPT-sourced Strategy B scan was pasted, " +
        "verified against primary sources rather than relayed on trust, and properly " +
        "closed out — PDYN's Air Force contract and preliminary Q2 results confirmed real, " +
        "LEVI's stated reason for its selloff confirmed accurate, DAL's oil-shock framing " +
        "flagged as incomplete (a real fuel-cost earnings risk sits underneath it). James " +
        "pushed back when the first pass only deep-checked the top three names — all " +
        "twelve remaining names were then verified, AMSC surfaced as the one genuinely " +
        "worth further work, already Stage-1-passed by this fund once before and never " +
        "finished.",
    ],
  },

  ktosKrmnDeepDiveAndCorrection: {
    trigger: "James's own comparative feedback on a full KTOS vs KRMN Stage 1/2 workup.",
    whereJamesWasRight:
      "KTOS should be the larger position on balance sheet strength (net cash vs KRMN's " +
      "$758M debt at SOFR+2.75%), manufacturing capacity announcements deserve to be a " +
      "weighted watchlist signal (Dayton and Huntsville expansions at AVAV became the " +
      "first live test of the new category same session), and KRMN's debt concern was " +
      "moved from a high-risk read to a moderate one given genuinely fast EBITDA growth " +
      "improving coverage mechanically.",
    whereTheFundWasCorrectedAndOwnedIt:
      "James's biggest pushback, that Valkyrie/CCA optionality alone could re-rate KTOS " +
      "from an $9B to a $20-30B platform company, was checked directly rather than argued " +
      "from memory. USAF's own CCA Increment 1, the flagship program, already went to " +
      "General Atomics (YFQ-42A) and Anduril (YFQ-44A). Kratos was not selected for it. " +
      "What's real: a Marine Corps program of record (MUX TACAIR, Kratos as airframe " +
      "subcontractor to Northrop Grumman, ~$231.5M OTA), a German Luftwaffe variant with " +
      "Airbus, and two sole-source undisclosed-customer pursuits. Genuine, growing, but " +
      "smaller than 'the entire CCA market,' and the $20-30B framing needs a USAF win " +
      "that hasn't happened. New Category 23 (manufacturing capacity/production " +
      "expansion signal) added to STRATB_SOURCING_PROTOCOL.md as a direct result.",
    outcome:
      "KTOS conviction revised to 8.5/10 (not 9.5), KRMN held near 7.5/10. Both remain " +
      "watchlist-only. James set his own live alert on KTOS at $46.50, will take a " +
      "position if touched within a month.",
  },

  gtbifAndTlryCarriedForward: {
    gtbif:
      "Resting buy limit 1,000sh $7.20 GTC, PINK.OTCQX, still 0/1,000 filled, price has " +
      "not pulled back into range. Bracket stop $6.49 GTC will only become live once/if " +
      "the parent fills. Separate discretionary thesis-break trigger logged: a close below " +
      "$7.00-7.03 (defended twice during the actual June 29-July 15 DEA hearing window) " +
      "is thesis collapse regardless of where the mechanical stop sits.",
    tlry:
      "Reconfirmed PASS with fresh reasoning, not just carried forward — Canadian LP, no " +
      "real US 280E exposure, chart made a fresh 52-week low during the actual hearing " +
      "window while GTBIF held support. GTBIF remains the fund's preferred vehicle for " +
      "this thesis.",
  },

  marketOpenFourCloses: {
    context:
      "All four fired within the same few minutes of the open, screenshots reviewed " +
      "directly rather than reconstructed from memory.",
    trades: [
      {
        ticker: "RIVN",
        action: "STOPPED OUT",
        detail:
          "500sh, entry $16.126, exit $16.50, realized +$181.73 net of commission. Full " +
          "position closed via the $16.50 stop, not the planned $17.00 partial (price " +
          "reversed before it could fill). Stop had already been raised above cost, so " +
          "the reversal banked a real gain rather than a loss even though the bullish " +
          "continuation target ($18.00-18.50) never played out.",
      },
      {
        ticker: "LEVI",
        action: "STOPPED OUT, same-day round trip",
        detail:
          "500sh, entry $22.90 (filled premarket via patient GTC limit outside RTH, a " +
          "T80 exception logged given the platform's stop-order constraints), exit " +
          "$22.502, realized -$204.33 net of commission. Full position closed via the " +
          "GTC stop before the planned $24.80 partial could fill. Stock then rallied to " +
          "$24.31, +2.49% on the day, confirming the underlying guidance-miss-overreaction " +
          "thesis was correct. New permanent lesson P71: the stop had been tightened from " +
          "$22.00 to $22.50 specifically to protect against a market-open fall, and ended " +
          "up sitting inside a normal opening shakeout zone rather than at genuine thesis " +
          "failure. James's own verdict, verbatim: 'right call, wrong stop.'",
      },
      {
        ticker: "CRM",
        action: "STOPPED OUT",
        detail:
          "50sh, entry $163.171, exit $157.57, realized -$280.17 net of confirmed sell " +
          "commission. KeyBanc's July 8 downgrade (Overweight to Sector Weight, price " +
          "target pulled) was a real, credible channel-check call, not noise, citing weak " +
          "customer conversations and no evidence Agentforce adoption is accelerating, " +
          "directly challenging the RPO-growth thesis this position was built on. James's " +
          "stance going in, stated plainly: 'if it hits it hits.' No re-entry case exists " +
          "until Agentforce itself shows real evidence of acceleration.",
      },
      {
        ticker: "AVAV",
        action: "STOPPED OUT",
        detail:
          "100sh, entry $161.011, exit $149.48 via stop-limit, realized -$1,155.43 net of " +
          "commission, within a few dollars of the max loss accepted when the stop was " +
          "widened from $155 to $150/$149.50 earlier the same session specifically to " +
          "survive normal volatility rather than sentiment. RBC's July 9 downgrade " +
          "(Outperform to Sector Perform, target $210 to $180) was explicitly a valuation " +
          "and timing call, not a fundamental one, RBC called competitive-risk concerns " +
          "overdone and stayed constructive on the underlying business. Position was " +
          "framed speculative at entry in James's own words, 'may be wrong' — a loss this " +
          "size sitting inside the pre-agreed risk band is the trade working as designed, " +
          "not a process failure. Re-entry watch set at $141 (near the 52-week low), " +
          "contingent on a confirmed base and no fresh negative catalyst, not a standing " +
          "green light on price alone.",
      },
    ],
  },

  liveAccountReconciliation: {
    trigger: "James shared live Positions, Orders, and Trades tab screenshots.",
    findings: [
      "ORPHANED ORDER, real risk: LEVI SELL Limit 250sh $24.80 GTC still showed Submitted " +
        "on the Orders tab despite the full 500sh position already being closed via stop. " +
        "Flagged to James for immediate cancellation to prevent an unintentional short if " +
        "price ever reached $24.80 again.",
      "PDYN's live stop shows $5.19 on the platform versus $5.33 logged in this file, " +
        "flagged directly to James, not yet confirmed which is correct, not assumed " +
        "either way.",
      "AVAV's actual fill was $149.48 per the Trades tab, not the $149.98 James initially " +
        "reported verbally — corrected using the Trades tab as the authoritative source, " +
        "changing the realized loss by about $50.",
      "EUR cash sits at -8,710, essentially the full HNR1 cost basis, meaning that " +
        "position is running on EUR margin rather than actual cash on hand and accruing " +
        "margin interest. Noted, not yet actioned.",
      "Eight remaining held positions (HNR1, FISV, PDYN, CEG, XSG, CODA, OKLO, ONDS) " +
        "confirmed matching the register exactly on the Positions tab. All other resting " +
        "stops confirmed matching on the Orders tab.",
    ],
  },

  researchDisciplineFailureAndThreeNewLessons: {
    trigger:
      "James asked whether an AEHR press release from the same day had been checked. The " +
      "first search run was a generic 'AEHR stock surge news' query, exactly the digest-" +
      "layer pattern this fund's own protocol already warns against, and it missed a " +
      "release that was, at the time, minutes old. A second, source-targeted query found " +
      "it immediately. James then raised a broader, direct concern: that the fund's own " +
      "research had been shipping half-checked answers with 'I need to look at this' " +
      "standing in for actually looking, and that a separate general-purpose tool had " +
      "been consistently finding things faster despite the volume of protocol built here.",
    p69:
      "A standing source-targeting rule already existed in STRATB_SOURCING_PROTOCOL.md and " +
      "was still skipped under normal working pressure — the same shape of failure as the " +
      "SCAR gap on AVAV back at S86. Fix made mechanical rather than another restated " +
      "reminder: the first search on any named company must now be source-targeted by " +
      "construction (company plus product/program name, or a direct IR page attempt), not " +
      "a generic query, before a negative conclusion can be stated at all.",
    p70:
      "Broader than P69 — about whether a check gets run at all before a response is sent, " +
      "not just how well it's constructed once run. Rule: if research is flagged as " +
      "needed, it gets completed in the same turn using whatever tools are already " +
      "available, not deferred with language that sounds like diligence without being it. " +
      "Self-check added: does this response contain a fact flagged as needing verification " +
      "but never actually verified.",
    p71:
      "Written same session after the LEVI stop-out reversed hard. A stop tightened " +
      "specifically to protect against expected open-session volatility is not the same " +
      "thing as a stop calibrated to genuine thesis failure, and conflating the two put " +
      "the LEVI stop exactly inside a normal opening shakeout zone. Rule: before " +
      "tightening a stop for anticipated open volatility, ask explicitly whether the new " +
      "level still represents thesis failure or has just moved into the noise band a name " +
      "with a big recent move commonly prints in its first 15-30 minutes.",
  },

  screenerReviewAndFreshStage1s: {
    screenersReviewed:
      "All six CF-SCREEN tabs shared and reviewed in full, not just headline numbers. " +
      "POWL found already past its own $235 alert (mandatory P44 decision, run same " +
      "session, PASS given no confirmed base and still-rich valuation even after a real " +
      "29% drawdown). IONS and CRS both surfaced from the earnings-surprise and revenue-" +
      "momentum screens respectively and taken to full research.",
    ionsStage1:
      "PASS, genuine thesis viability, not yet actionable. Same-day cause verified " +
      "primary-source: CARDIO-TTRansform (eplontersen/WAINUA with AstraZeneca) missed its " +
      "composite primary endpoint in ATTR-CM, but a prespecified subgroup showed a " +
      "genuinely positive monotherapy signal (HR 0.71), with no effect seen only in " +
      "patients already on background stabilizer therapy. Existing WAINUA polyneuropathy " +
      "approval untouched. Real, unaffected commercial engine underneath (TRYNGOLZA " +
      "expanding into a much larger sHTG population, DAWNZERA's second launch), $1.9B " +
      "cash, path to 2028 breakeven, deep pipeline beyond this one program. Only one firm " +
      "rated same-day (Stifel, Hold held at the pre-crash $84.46), more revisions likely " +
      "coming. Watching for a confirmed base above the day's low and the July 29 print.",
    duotStage1:
      "Sourced originally from an external trader's recommendation, never run through " +
      "this fund's own process — that gap explained directly by James rather than left " +
      "ambiguous. Real business, real anchor contract (Hydra Host GPU-as-a-Service, ~$176M " +
      "over 36 months, a genuine $15M customer deposit already paid), but revenue is " +
      "currently shrinking (Q1 2026 $2.72M versus $4.95M a year earlier) while funding an " +
      "unproven second-half ramp through a demonstrated pattern of large, repeating " +
      "dilutive offerings (at least $120M raised across two events in roughly 90 days), " +
      "each one averaging a -10.26% next-day reaction versus only -2.3% for earnings " +
      "prints themselves — the market is punishing the financing mechanism specifically, " +
      "not the business results. James's own $8.30 alert logged as a defensible technical " +
      "level, explicitly not an automatic entry trigger — mandatory fresh Stage 1 on touch " +
      "checking whether the shelf has gone quiet and whether a real base has formed.",
    marketNamesCheckedNotEntered:
      "MARA (+15% reported, verified news only supports about +4% on a real Texas HPC " +
      "land deal, gap between the two not resolved, high short interest a plausible " +
      "amplifier). CRS logged to the watchlist, real business (aerospace/defense specialty " +
      "metals supply chain, genuine multi-quarter beat-and-raise, structural pricing " +
      "power) but extremely extended technically with no base, alert set well below spot.",
  },

  openItemsCarriedForward: [
    "LEVI's orphaned $24.80 sell order — cancellation requested, not yet confirmed done.",
    "PDYN stop discrepancy ($5.19 live vs $5.33 logged) — not yet confirmed which is " +
      "correct.",
    "HNR1 running on EUR margin (-8,710 EUR cash) rather than cash on hand — noted, not " +
      "yet actioned, real ongoing margin-interest drag.",
    "GTBIF still unfilled, watching for a pullback into the $7.20 zone or the July 15 " +
      "hearing deadline, whichever comes first.",
    "KTOS alert $46.50 (James's own) and KRMN watchlist both live, neither touched.",
    "AVAV re-entry watch at $141, contingent on a confirmed base and no fresh negative " +
      "catalyst, not a standing order.",
    "IONS watching for a confirmed base above today's low and the July 29 print (date " +
      "resolved with medium-high confidence via historical cadence, not yet IR-confirmed).",
    "DUOT alert $8.30, mandatory fresh Stage 1 on touch, not automatic entry.",
    "POWL and CRS both watchlisted, neither actionable at current prices.",
    "T80 (Outside RTH) needs a written update to reflect the LEVI exception (patient " +
      "limit orders on Blue Ocean, reaffirmed after James referenced real prior fund " +
      "practice) — flagged twice this session, not yet actioned in the lesson file itself.",
  ],

  marketContextClose:
    "Four closes netted roughly -$1,458 realized on the day (RIVN +$181.73, LEVI " +
    "-$204.33, CRM -$280.17, AVAV -$1,155.43), close to the -$1,455.10 shown directly on " +
    "the Trades tab. Eight positions remain held (HNR1, FISV, PDYN, CEG, XSG, CODA, OKLO, " +
    "ONDS), all confirmed matching the live account. Net liquidity $93.3K per the last " +
    "screenshot. Probable AMBER macro regime flagged at session open (VIX and 10yr both " +
    "moving against risk assets on continued Iran escalation, JGB yields at a 29-year " +
    "high with real BOJ intervention risk layered on top) and never formally recalculated " +
    "this session — genuine open item for next open, current GREEN reading in " +
    "MARKET_HEALTH_CHECK.md should not be trusted at face value until that happens.",
};

export const journal100Addendum = {
  note:
    "Added after the S90-S91 close was already written and files saved. Real activity " +
    "continued past that close and needed logging, not left only in conversation.",
  items: [
    "GTBIF confirmed FILLED via live account screenshot, 1,000sh @ $7.20, moved from " +
      "GTC pending to held, added to TRACK_RECORD.csv (was never logged there while " +
      "unfilled). Stop discrepancy found ($6.49 logged vs $5.50 live) and resolved: " +
      "James confirmed $5.50 is the real, deliberate figure, logged and closed.",
    "PDYN's stop resolved at $5.10, the third figure surfaced this session ($5.33, then " +
      "$5.19, now $5.10), confirmed by James as the live, deliberate number, superseding " +
      "both earlier figures.",
    "LEVI's orphaned $24.80 sell order, flagged during the account reconciliation, " +
      "confirmed CANCELLED by James. No live exposure remains on this name.",
    "OKLO: the standing note that Groves 'has no further binary reaction window' was " +
      "found to be stale. DOE approved Groves' final safety analysis July 1, and it is " +
      "now targeting first criticality 'later this month,' a live, real catalyst. New " +
      "lesson P72 written after James corrected a recommendation to 'wait for " +
      "confirmation then add' — this fund's own standing rule says position ahead of a " +
      "confirmed high-conviction catalyst with a defined stop, not after it. James placed " +
      "a resting add, 100sh limit $48.58 GTC, same session on that corrected basis. The " +
      "existing $44.51 stop needs resizing from 100 to 200 shares once that fills.",
    "KTOS: full order planned and discussed but deliberately not placed tonight, watching " +
      "for the level to actually print rather than resting a live order into an unclear " +
      "open. 400sh limit $46.50 (James's own established level, corrected back to after " +
      "an initial $47.50 suggestion moved off it without good reason), stop $45.80 just " +
      "under the confirmed June 25-26 capitulation low. R:R roughly 12.9:1 to $55.50, " +
      "16.4:1 to a $59 stretch target at that entry.",
  ],
  filesUpdated: [
    "DECISION_REGISTER.md — GTBIF, PDYN, LEVI, OKLO, KTOS, GTC pending table",
    "TRACK_RECORD.csv — GTBIF added as OPEN",
    "LESSONS_LEARNED.md — P72 added",
  ],
};

export default journal100;
