# FUND_SESSION_STATE_ARCHIVE.md
# Created S110 (Stage 3, Sub-stage B) as part of the FUND_SESSION_STATE.md restructuring into
# a single-current-snapshot live file, per the approved Stage 3 plan.
#
# Content below is moved VERBATIM from the live FUND_SESSION_STATE.md file, in its ORIGINAL
# PHYSICAL ORDER, starting from the "RE-BASELINE — 17 AUGUST 2026" section through the end of
# the file (the S96 TRUE final close, 14 July 2026). Nothing has been rewritten, resummarized,
# or reordered. This covers the 17 August re-baseline, the 17 July travel-period standing note,
# the S97 close snapshot (15 July), the weekend reconciliation (12 July), the S92 session (10
# July), and the S96 close sequence (14 July) -- the fund's full pre-21-August documented state
# history in this file.
#
# Retrieval: use fund-history to search this file when a past portfolio snapshot, reconciliation,
# or session-close state is relevant to a current question.
# ══════════════════════════════════════════════════════════════════════════════════════

## ══════════════════════════════════════════════════════════════════
## RE-BASELINE — 17 AUGUST 2026
## ══════════════════════════════════════════════════════════════════
# See trading_journal105.jsx for full narrative detail on this session (that file number was
# previously reserved for the 17 July reconciliation referenced below but was never actually
# written — confirmed absent from the journal directory 17 August, closed by writing it fresh
# with this session's content rather than attempting a retroactive 17 July reconstruction).

## ══════════════════════════════════════════════════════════════════
## RE-BASELINE — 17 AUGUST 2026, SUPERSEDES EVERYTHING BELOW AS THE CURRENT SNAPSHOT
## ══════════════════════════════════════════════════════════════════

James travelled 17 July to ~17 August, trading independently off his own ChatGPT alert system.
No session-open/close protocol ran and no journal was written for the entire period. 114
trades in the trailing 30 days per the IBKR Trades tab, realized P&L -$1,877.81 over that
window — meaning the account's real gain this period sits in unrealized profit on a handful
of winners (KTOS +42.9%, PDYN +25.4%, BKSY +32.7%, NPWR +28.5%, IONQ +23.6%), not in banked
realized P&L. Net liquidity $94.4K is roughly flat to the $95.4K documented at the 15 July
close despite that unrealized cushion, worth remembering: if the winners give back even half
their move, the month prints as a net loser.

Every position from the 17 July snapshot has turned over except PDYN. Full current book,
Stage 1/2 verification detail, the ORCL trim decision, the ADI pass, StratB alert
verification, and the market health recalculation all live in DECISION_REGISTER.md's own
RE-BASELINE section (added same session) — this file is not duplicating that table, see it
for the authoritative position-by-position detail. Summary only, here:

- **ORCL**: full Stage 1/2 run, 24% of net liq pre-trim on a name one notch above junk credit
  (S&P BBB-, July) with 5% average daily volatility against a 2.6% stop (deliberately tight,
  James's second bite after an earlier profitable round on this name). Recommended trimming
  roughly half; James agreed. **SELL 75sh LIMIT $152 GTC placed 17 August, fill UNCONFIRMED**
  — no Trades tab or IBKR connector confirmation exists yet. Top priority check next session.
- **KTOS, AMAT, AAON, AZN**: full Stage 1/2 checks, all four hold with no action needed —
  entries all read as sound in hindsight (mostly timed into legitimate post-earnings dips on
  names with real fundamental delivery, not chased momentum).
- **OKLO and MBOT**, both live/pending in the last documented (17 July) state, are **absent
  from the 17 August account entirely**. Logged in DECISION_REGISTER.md as UNRESOLVED, not
  assumed closed — no confirmation exists for what happened to either during the gap.
- **ADI**: full retrospective check on James's ChatGPT StratB alert, which verified accurate
  against primary sources across every checked claim (a real change from this fund's prior
  experience with the same source). PASS on a fresh entry regardless — price has already run
  through the alert's own accumulation zone and stated do-not-chase level two days ahead of
  19 August earnings. No position taken.
- **Market health**: full recalculation, first since 14 July. AMBER 11/24 → GREEN 7/24,
  exactly on the boundary. Real de-escalation (VIX, credit spreads, SPX near highs) sitting
  on top of unresolved structural risk (CAPE near dot-com-era highs, 10yr yield near a
  19-month high, a genuine Fed hike/hold split). Treat new-entry judgment as closer to
  AMBER-era discipline than unqualified GREEN complacency given the boundary proximity.

**IBKR CONNECTOR STATUS UPDATE, 17 August 2026**: the Claude-side connector remains
unreliable (absent from the tool registry again this session, consistent with the "cancelled"
status James reported 17 July). James's own IBKR link on the ChatGPT side is now more stable
and is the standing source for live account data going forward. Practical effect for this
fund unchanged from the travel-period method already in use: reconciliation runs on James's
screenshots supplied in-session, not on Claude pulling IBKR data directly. Not a transient gap
to keep re-checking each session, a standing infrastructure fact until James reports otherwise.

**Not done this session, flagged not silently skipped**: PDYN (the one surviving pre-gap
position) was not re-verified fresh, on the basis that it was already extensively documented
before the gap and nothing surfaced to doubt continuation — worth a dedicated check next
session rather than continuing to assume. The seven smallest positions (IONQ, BKSY, NPWR,
REKR, LNTH, RCAT, RKLB, FAC) got a fast pass only, no red flags found, not a full Stage 1/2 —
REKR and NPWR flagged as the two worth a real look eventually given no documented thesis and
thinner coverage if something goes wrong, not urgent. TRACK_RECORD.csv was not reconciled
against the month of untracked trades this session — a real, large gap (114 trades) that the
consolidated catch-up James referenced will need to address; this file does not resolve it.

---

**SESSION CLOSED 17 August 2026.** Two items resting unconfirmed at close, check first thing
next session: (1) ORCL 75sh trim, resting at $152, James is letting price recover toward the
$150.16 cost basis before trimming rather than trimming at the intraday low, not yet filled.
(2) LNTH 30sh market exit, instructed for the open, fill not yet confirmed, and the old $94.85
stop needs confirming cancelled once it does. APP (new position, 30sh @ $315, stop $300) was
already $4-5 against entry within hours of being placed, no confirmed base existed at entry,
worth checking first. REKR was found missing from this session's own re-baseline table and
fixed at close, not before, a real process gap worth remembering rather than assuming
completeness next time a table gets rebuilt. Full detail in trading_journal105.jsx, including
the second half appended at actual close.

**Not done for future sessions**

- **STANDING NOTE — TRAVEL / REDUCED-CADENCE PERIOD, 17 JULY 2026 ONWARD (~4 WEEKS) — HISTORICAL,
## SUPERSEDED BY THE RE-BASELINE ABOVE, RETAINED FOR AUDIT TRAIL

James confirmed 17 July: fund will be **monitored daily via mobile, not actively traded**,
for approximately the next 4 weeks. This is a distinct mode, not full session-open protocol
and not an unattended book. Read this section first at every check-in during this period.

**IBKR CONNECTOR STATUS UPDATE, 17 July 2026: CANCELLED, not merely down.** James confirmed
the connector itself has been cancelled on his side and could not be resolved; James's own
ChatGPT scouts/alerts system continues running independently as the external sourcing
channel. All reconciliation for the travel period runs on James's live TWS screenshots
(Positions, Orders, Trades tabs) supplied as and when available — treat this as the standing
method for the travel period, not a transient gap to keep re-checking the tool registry for.

**What daily monitoring should cover** (light touch, not a full session open):
1. Any stop-out or fill since the last check — via James's screenshots, per the above.
2. **GLW** — daily OBV check on James's own chart. Re-engage condition is a genuine higher
   low with OBV no longer making fresh lows, not a single green candle or calendar time.
   Not entered, not actionable as of 17 July (OBV still declining, premarket already below
   prior close). See DECISION_REGISTER.md GLW row.
3. **RKLB** — added to daily watch 17 July. Price ($67.35, premarket $66.65) sits almost
   exactly at the existing $67.54 collar-floor alert, but OBV has fallen steadily since
   13 July with only a slight, unconfirmed uptick on the last bar — not a base yet.
   Re-engage: a session holding a low at/above ~$67.50 with OBV stabilizing, not a single
   green candle. Stopped out $75.0105 15 July, do not chase back in on the level alone.
4. **KTOS** — added to daily watch 17 July. Price ($46.98, premarket $46.55) sits inside the
   register's own $46.50-48.00 "best first entry" zone, but OBV is still net declining
   through the zone — the same net-distribution pattern already flagged once before at S93
   on this exact name. Re-engage: a genuine higher low with OBV confirming, not price alone
   inside the zone. Stopped out (profitably) $48.5104 16 July, do not chase back in on the
   zone alone.
5. **V (Visa)** — quality-compounder hold, 50sh resting BUY $360 limit / stop **lowered to
   $345 GTC 17 July** per James's explicit instruction. Target ~$383 (5%) discussed, not yet
   placed as a resting GTC sell limit — needs confirmation. **28 July fiscal Q3 earnings is
   the one date worth a live check-in during travel**, not routine daily noise.
6. Any of the open items below with a dated trigger inside the coming week.
7. A quick VIX/SPX pulse per the standing MARKET TURNING ALERT protocol (see
   MARKET_HEALTH_CHECK.md) — light gate, escalate only on a genuine turn, not a full
   12-indicator recalc every day.

**What is suspended for this period, per James's standing instruction:**
Full session-open protocol (screener runs CF-SCREEN-A/B/C/D/SI39, proactive new-name
sourcing, weekly StratB deep dive) is paused. Reduced cadence, not the normal operating mode.
Resume in full once James confirms active management is back on.

**Open items carried from 17 July reconciliation, check off as resolved:**
- MBOT live stop shows $1.68 vs James's original $1.20 wide override — still unconfirmed
  as deliberate.
- RKLB stop-math error (P77, LESSONS_LEARNED.md) — logged as a lesson, no further action
  needed, informational.
- FISV earnings 22 or 29 July (date still unconfirmed between sources) — a mandatory
  catalyst-readiness check (Step 6B) was flagged but not run 17 July, worth doing at the
  next real check-in given it's now inside the 7-day window.
- GTBIF — DEA hearing concluded procedurally 15 July, no ruling. ALJ recommendation and the
  eventual DEA Administrator decision are the real resolving events, still ahead, no fresh
  date found.
- OKLO original 100sh tranche (S88, $50.011 cost, $44.51 stop) — not visible in the 17 July
  screenshots (separate from the 400sh tranche confirmed stopped out 15 July). Needs a
  direct confirmation, not assumed either way.
- NBIS — downgraded to watch-only 17 July, crash-stress-test FAIL (financing-dependent
  capex model, $140M+ trailing-90-day insider selling). No action expected; re-check only
  if insider selling stops or the 5 Aug print shows real cash-conversion evidence.

---

## S97 CLOSE SNAPSHOT — WEDNESDAY 15 JULY 2026 (live TWS screenshots, IBKR connector unavailable all session, 12th+ consecutive session)

Net Liquidity $95.4K | Daily P&L +$744.71 (+0.79%) | Unrealized P&L +$3,633.52 | Realized P&L -$221.31 (IBM stop-out, day total) | Excess Liq $64.9K | Maintenance $30.5K | Initial Margin $30.5K | Available Funds $64.9K | Buying Power $256.7K
Cash: USD -$1,506 (margin) | EUR $1,317 | GBP $2,117

LIVE POSITIONS (confirmed via screenshot, 13 names):
KTOS 250sh @ 47.206, last 52.20, stop $48.50 GTC, unrealized +$1,249 (+10.6%) — best performer
FISV 200sh @ 47.616, last 51.45, stop $47.93/$43.00 stop-limit, unrealized +$721 (+7.6%)
CEG 25sh @ 240.041, last 260.45, stop $247.40 GTC, unrealized +$510 (+8.5%)
CODA 600sh @ 9.506, last 10.47, stop $9.02 GTC, unrealized +$537 (+9.4%)
GTBIF 1,000sh @ 7.205, last 7.54, stop $7.08 GTC, unrealized +$333 (+4.6%)
RKLB 100sh @ 76.719, last 78.06, stop $75.02 GTC, unrealized +$189 (+2.5%)
UAMY 1,000sh @ 6.206, last 6.18, stop $5.88 GTC, unrealized +$90 (+1.5%) — rough day, -4.19%
OPXS 500sh @ 13.006, last 13.05, stop $12.09/$10.50 stop-limit, unrealized +$25 (+0.4%)
PDYN 1,000sh @ 5.306, last 5.32, stop $3.99 GTC, unrealized +$65 (+1.2%)
XSG 40,000sh (LSE, GBX) @ 1.5075, last 1.5000, unrealized -$3 (-0.5%)
LEVI 1,000sh @ 24.054, last 24.20, target $25.00 GTC / stop $23.94 DAY (FLAG: not GTC, see below), unrealized +$40 (+0.2%) — NEW S97
AISP 1,126sh @ 2.206, last 2.17, stop $1.95 GTC, unrealized -$17 (-0.7%)

UNFILLED RESTING ORDERS: OKLO (BUY 400 @ 45.30/stop 44.50, still 0/400), FAC (BUY 600 @ 4.50/stop 2.00, still 0/600), MBOT (BUY 1,336 @ 1.80/stop 1.20, still 0/1,336, confirmed correct per S92, not a discrepancy).

CLOSED THIS SESSION: NOW (retroactively, actually closed S96 same day as entry, realized +$227.10, corrected into the record this session) and IBM (StratB scout try-and-fail, realized -$218.80).

CANCELLED/NEVER FILLED THIS SESSION: JNJ, SOBR — both StratB scout attempts, zero capital deployed.

**OPEN FLAG, real and unresolved: LEVI's protective stop is DAY tif, not GTC.** Confirmed via the live Orders screenshot. Does not persist overnight unless resubmitted before next open. Top priority check next session.

No IBKR connector access this session, all figures above sourced from James's live screenshots (Positions tab, Orders tab, both dated 15 July).

---

## WEEKEND RECONCILIATION — SUNDAY 12 JULY 2026 (TWS screenshots, no session close run, no journal written, James's explicit instruction)

James provided two live TWS screenshots (Positions tab, Orders tab) for direct reconciliation against this file and DECISION_REGISTER.md. Markets closed both days, no fills possible, this is a documentation correction pass only, not a trading session. Full review and all decisions below deferred to Monday pre open per James.

CONFIRMED FACTS FROM SCREENSHOTS, not yet acted on:
- OPXS is FILLED, 500sh @ avg $13.006, live stop is $12.09/$10.50 stop-limit, not the $10.50/$11.00 previously documented. Tightest live buffer in the book, 4.2% at last price $12.62. Was never added to DECISION_REGISTER HELD POSITIONS table despite filling S92, added now.
- AISP is FULLY FILLED, 1,126/1,126 @ avg $2.206, matching the S93 correction already logged in DECISION_REGISTER but never carried into this file, which still showed a 200sh partial. Stop $1.95 GTC confirmed live, matches documented, no discrepancy there.
- PDYN stop discrepancy ($3.97 live vs $5.10 documented) CONFIRMED via screenshot, was previously only self-reported. Buffer at $3.97 is 24.8% against last $5.28, materially wider than the 3.4% the documented figure implies. Intent (deliberate wide stop vs needs correcting) not yet confirmed by James, decision deferred to Monday.
- OPTX live stop is $8.19/$7.50 stop-limit, not the $7.82/$7.50 documented. This is a raise (favourable direction). A new SELL Limit 500sh @ $10.50 GTC target order also exists live, previously undocumented anywhere. Both unconfirmed as deliberate, deferred to Monday.
- CEG live stop is $231.89, not the $220.00 documented. Also a raise (favourable direction), real documentation gap, not a risk increase. Unconfirmed as deliberate, deferred to Monday.
- PEP has a live SELL Limit 100sh @ $155.32 GTC target order, previously undocumented anywhere. Unconfirmed as deliberate, deferred to Monday.
- DAL is LIVE, not merely planned. BUY Stop Limit 200sh, stop $88.50/limit $89.25, protective SELL Stop $86.85 GTC, both submitted and resting. This directly bypasses the mandatory Monday T71 chart review and V1-GO reassessment set as a precondition S94, before the order should have gone live. Whether this was a deliberate override or went in on autopilot from Friday's groundwork is unconfirmed, deferred to Monday, treat as neither approved nor rejected until then.
- AQST CONFIRMED via screenshot as never placed, absent from both Positions and Orders tabs. Upgrades from "unconfirmed" to a settled fact. Go/no-go decision still open, deferred to Monday.
- USD cash live $12,734 vs documented $13,910, a $1,176 gap with no fills over the weekend to explain it. Flagged, not investigated further this pass, timing of when the prior figure was pulled is the likely explanation.
- Net Liquidity live $93.9K, Excess Liquidity live $65.8K, both close to but not identical to the last documented S92 figures ($93.6K / $67.7K), normal drift, not investigated further.

No file in this reconciliation pass records an intent decision on PDYN, OPTX, CEG, or DAL. Those are Monday's decisions to make, not mine to assume.

## 13 JULY 2026 UPDATE: James's stated overall priorities, three names, none yet actionable

James named three priorities this session: entry into KTOS, re-entry into AVAV at a better price, and CRCL. Status of each, so Monday's review starts from the real picture, not a wishlist:

- **KTOS:** no change needed, already Stage 2 complete, alert live at $46.50, best entry zone $46.50-48.00. Friday close $48.19, sitting at the very top edge of that zone, not yet inside it. Ready and waiting on price, nothing further to do.
- **AVAV:** real new information found, not a simple lower price. Round-tripped from the $190.89 post-earnings/Investor-Day high all the way back to $144.58 Friday, below where it originally stopped out. Two genuine new negatives since the S91 note: RBC's 9 July downgrade is a growth-durability concern (can the FY2030 targets from the 8 July Investor Day actually be hit), a different and more structural question than March's valuation/timing call; and a fresh securities fraud class action filed 6 July is built on a real 22 June restatement ($89.4M understatement of operational losses), not just old SCAR history. Full detail in DECISION_REGISTER.md's AVAV re-entry watch note. A full fresh Stage 2 has NOT been run, this needs to happen before treating $144.58 as anything but a number.
- **CRCL:** full Stage 1 complete, PASS on viability. Real growth (USDC circulation +28% YoY, transaction volume +263% YoY), but 94-98% of revenue is reserve income directly exposed to Fed rate policy, and the GENIUS Act that legitimized Circle also opened stablecoin issuance to JPMorgan, Bank of America, Wells Fargo, and a well-funded Stripe competitor, a real moat question. Valuation is genuinely bimodal across analysts, not a tight consensus. No entry criteria defined yet, Stage 2 required. James also asked to look at PYPL through the same lens: Stage 1 complete, PASS, but PYUSD is a small piece of a large diversified, cheap business, a fundamentally different shape of bet than CRCL, not a substitute for it.

None of the three are ready for an order tomorrow. KTOS is closest, purely on price. AVAV needs its Stage 2 rerun against real new information. CRCL and PYPL both need Stage 2 entry/stop/target work before either is anything but a watch.

## S92 SESSION — FRIDAY 10 JULY 2026 — full trading session

Opened with mandatory file reads and a full market health recalculation, overdue since
S91 flagged the prior GREEN reading as stale. New reading: **AMBER 9/24** (was GREEN
6/24), driven by the 10yr yield crossing into AMBER band, 10yr trend turning RED (JGB
29-yr highs), a VIX uptick, and real Iran-driven oil volatility (ceasefire declared over,
fresh US strikes). Crash stress test now mandatory on all new entries while AMBER holds.

Bulk of the session was sourcing and verification work across two large external
research documents James pre-ran via ChatGPT (a 5+3 small/mid-cap "pre-rerating"
screen, and separately two intraday StratB scout reports plus a large-cap tactical-
recovery brief), all run through the same primary-source verification discipline as an
internal thesis before anything reached the register. This caught a real, load-bearing
factual reversal in one report (ULBI: claimed "Q1 EPS beat," actual print was a loss and
a miss on both lines) and multiple smaller inaccuracies (LEVI mis-framed as a fresh
setup by two separate reports when it was the exact event the fund already traded and
closed on S91; PEP's EPS line reported backwards as a beat when it was a small miss;
OPXS backlog off by a few hundred thousand; CCC's prior-sale-attempt year off by one).

OBV (On-Balance Volume), checked across both short and long windows on every name
reviewed, was the single most decision-relevant tool used this session. Several of
Claude's own earlier verdicts were reversed once a longer window was actually pulled
(AREC: looked like a buy off intraday accumulation, reversed to PASS once 3 months of
net distribution was visible; TLS: looked weak off resistance alone, reversed to a
genuine bullish divergence once OBV was checked against price). Standing takeaway,
carried into future sessions: request both windows together, not sequentially.

Five new speculative/tactical entries built and (mostly) placed this session: MBOT,
AISP, OPXS, OPTX, PEP. A sixth, AQST, was fully reasoned through (including a real
timeline correction pushing the FDA binary from "this year" to a medium-confidence
Q1 2027 estimate, independently verified) but **never confirmed as a live order** —
flag this explicitly at next open. OKLO's resting add order filled, position now 200sh
correctly double-bracketed. FATE remained a watch-only name all session with its
entry/stop revised three times as the chart moved intraday; final resting order confirmed
by screenshot at close, unfilled.

Two genuine confusion incidents mid-session, both resolved via screenshot within the same
exchange: James briefly believed OPTX had stopped out (it hadn't, was confusion with
OKLO) and separately believed OKLO had stopped out (it hadn't, a tighter interim stop was
cancelled, not triggered). Neither led to any wrong action being taken.

James is travelling from next week with reduced session activity agreed for that period —
monitor and protect the existing book, no proactive new-name sourcing unless something is
specifically flagged to Claude.

## ACCOUNT SNAPSHOT
S92 close (last full IBKR-tool check): Net Liq ~$93.6K | Daily P&L -$204.79 (-0.22%) | Unrealized +$1,801.31 | Excess Liq $67.7K | Cash USD $13,910 / EUR -$8,710 / GBP $2,117
Sunday 12 July TWS screenshot (weekend reconciliation, no IBKR tool access): Net Liq $93.9K | Excess Liq $65.8K | Cash USD $12,734 / EUR -$8,710 / GBP $2,117 | Unrealized per position table sums to approximately $1,503, the header card itself displayed $0.00, read as a stale weekend display artifact not a real zeroing out, use the position-table sum. USD cash gap of $1,176 versus the S92 figure is unexplained by any known fill, flagged not investigated further this pass. HNR1 still running on EUR margin, unresolved, carried.

## IBKR CONNECTOR STATUS
Absent from the tool registry again this session, standing gap continuing (S84, S86,
S86W, S87, S90-91, S92). All reconciliation via James's live screenshots.

---

## HELD POSITIONS (confirmed against live screenshot, end of S92)

| Ticker | Shares | Avg Cost | Stop | Strategy | Notes |
|--------|--------|----------|------|----------|-------|
| HNR1 | 40 | EUR224.72 | EUR245.8 GTC STANDALONE | A | Unchanged. Running on EUR margin, real ongoing cost, still not addressed. |
| FISV | 200 | $47.616 | $47.93/$43.00 GTC | A | Unchanged. |
| PDYN | 1,000 | $5.306 | $3.97 GTC (live, CONFIRMED via TWS screenshot 12 July, documented figure of $5.10 was wrong) | A | **STOP DISCREPANCY CONFIRMED, INTENT UNCONFIRMED.** Real live protective level is $3.97, a 24.8% buffer against last $5.28, not the 3.4% the old $5.10 figure implied. Whether $3.97 is deliberate (in the spirit of MBOT's wide override) or needs raising toward $5.00-5.10 is a decision only James can make, deferred to Monday. Do not silently correct the file to $5.10, that would be assuming an answer that hasn't been given. |
| CEG | 25 | $240.041 | $231.89 GTC (live, per TWS 12 July, documented figure of $220.00 was wrong) | A | Live stop is a raise above the documented figure, favourable direction, real risk did not increase. Unconfirmed whether deliberate or a stale documentation error, deferred to Monday. |
| XSG | 40,000 | 1.5075p | None | A | Unchanged, micro position. |
| CODA | 600 | $9.506 | $7.90 GTC | A | Unchanged. |
| OKLO | 200 | $49.301 | TWO separate $44.51 GTC stops, 100sh each | A | Add tranche filled this session @ $48.58. Confirmed intentional double-bracket, not a merged stop. A tighter interim $47.50 stop appeared and was cancelled (not triggered) mid-session. |
| ONDS | 600 | $8.256 | $6.98 GTC | A | Buffer tightened further this session, last ~4.6-4.8%, down again on continued price weakness. No trigger, no new dilution news found this session — same known overhang. |
| GTBIF | 1,000 | $7.206 | $5.50 GTC | A | Unchanged. Separate discretionary thesis-break trigger still live: a close below $7.00-7.03 is treated as thesis collapse. Live price $7.11 (12 July), above the trigger, no action. |
| PEP | 100 | $135.741 | $134.50 GTC (confirmed matches live) | SPEC/TACTICAL | Filled $135.73, better than the $137 reference. Real fundamental caveat: guidance affirmed not raised, small EPS miss not beat, genuine North American softness tied by CEO to gas-price spikes during the Iran conflict. Chart-based entry, not a fundamentals-led one. **NEW 12 July: a live SELL Limit 100sh @ $155.32 GTC target order was found on the Orders tab, not previously documented anywhere in this file or DECISION_REGISTER. Unconfirmed as deliberate, deferred to Monday.** |
| AISP | 1,126 (FULLY FILLED, corrected 12 July, was incorrectly shown here as a 200sh partial) | $2.206 | $1.95 GTC | SPEC | Full fill confirmed via TWS screenshot 12 July and matches the S93 correction already in DECISION_REGISTER. Stop matches documented, no discrepancy. |
| OPTX | 500 | $8.706 | $8.19/$7.50 Stop-Limit GTC (live, per TWS 12 July, documented figure was $7.82/$7.50) | SPEC | Filled $8.71 on the confirmed OBV-divergence breakout trigger. FAILED the strict crash stress test, accepted only at small size with a hard exit already set: **17 July, no follow-through on the 16 July investor presentation = close regardless of price.** Live stop is a raise above the documented figure, favourable direction. **NEW 12 July: a live SELL Limit 500sh @ $10.50 GTC target order was found on the Orders tab, not previously documented anywhere. Both the stop level and the target order are unconfirmed as deliberate, deferred to Monday.** |
| OPXS | 500 | $13.006 | $12.09 GTC trigger / $10.50 limit, Stop-Limit (live, per TWS 12 July, documented figure was $10.50/$11.00, and this position was never added to this table despite filling S92) | SPEC | **ADDED 12 July, filled S92, full 500/500 @ $13.00, matches the S93 correction already in DECISION_REGISTER.** Tightest live buffer in the entire book, 4.2% at last price $12.62. Not an immediate concern given markets are closed through Monday, but the first thing to check at Monday's open, before anything else. |

---

## GTC PENDING / UNFILLED (confirmed against live Orders table, end of S92)

| Ticker | Shares | Limit | Stop | Notes |
|--------|--------|-------|------|-------|
| UAMY | 1,000 | $6.30 | $5.60 | Still unfilled, unchanged from prior sessions. |
| MBOT | 1,336 | $1.80 | $1.20 GTC, James's explicit wide override | **NEW S92.** 0/1,336 unfilled at close. No near-term dated catalyst confirmed (Q2 earnings ~August, exact date unconfirmed). |
| FATE | — | — | — | CLOSED, not pending. Triggered, filled, and exited same session (S92 post-close), full round trip +$255.76. No longer belongs in this table, retained as a strikethrough note only: ~~3,000 @ $2.90, stop $2.82~~ resolved. |
| AQST | — | ~$4.00 discussed, never placed | ~$3.55 discussed, never placed | **CONFIRMED NOT LIVE, 12 July, via TWS screenshot.** Absent from both Positions and Orders tabs. Upgraded from "unconfirmed" to a settled fact. Go/no-go on placing it fresh is a decision for Monday, not assumed either way. |
| DAL | 200 | $89.25 limit / $88.50 stop trigger (Stop Limit) | $86.85 GTC | **LIVE, confirmed 12 July via TWS screenshot, contrary to Friday's plan.** Friday's groundwork explicitly required a fresh T71 chart review and V1-GO reassessment at Monday's actual open before this became a live order, and specified manual reclaim-and-hold entry rather than a mechanical stop-limit that could fill on a single wick. The order sitting live now bypasses both conditions. Whether this was James's deliberate override or went in on autopilot from Friday's prepared order ticket is unconfirmed. Not approved, not rejected, deferred to Monday pre open. |

---

## OPEN ITEMS, MONDAY PRE OPEN DECISION QUEUE (rewritten 12 July, weekend reconciliation)

James's instruction: full review Monday before market open. These six need an actual decision, not just a look, in the order of urgency:

1. **OPXS stop, highest urgency** — live $12.09 trigger against last $12.62 is a 4.2% buffer, the tightest in the book. Decide whether it stays or needs adjusting before anything else on Monday.
2. **PDYN stop intent** — live $3.97 vs documented $5.10. Confirm deliberate or raise it.
3. **OPTX stop and target intent** — live stop $8.19 vs documented $7.82 (favourable direction), plus an undocumented $10.50 sell limit target. Confirm both deliberate.
4. **DAL live order review** — resting stop-limit order contradicts the Friday condition requiring a fresh T71/V1-GO reassessment before going live. Decide: keep as is, pull it, or run the reassessment against it first.
5. **CEG stop intent** — live $231.89 vs documented $220.00 (favourable direction). Lower urgency given the wider buffer, but still needs confirming.
6. **AQST go/no-go** — confirmed absent from the account. Simple yes or no on placing it fresh.

Also unresolved, separate from the above:
7. HNR1 running on EUR margin, not cash — still not addressed, several sessions running now.
8. ONDS stop buffer continuing to tighten on trend, not fundamentals — live $6.98 stop against last $7.26 is now a 3.9% buffer, tighter than the 4.6-4.8% noted S92. No new dilution news found, same known overhang, watch not act.
9. GTBIF hearing concludes July 15 — discretionary $7.00-7.03 thesis-break trigger, live price $7.11 as of 12 July, no action needed yet.
10. OPTX hard exit date **17 July** — no follow-through on the 16 July investor presentation means close regardless of price, unaffected by the stop/target questions above.
11. PEP target order intent — undocumented $155.32 sell limit found live, confirm deliberate.
12. USD cash gap, $12,734 live vs $13,910 documented — unexplained by any known fill, flagged not investigated further.
13. Reduced-cadence period begins this week (James travelling) — monitor and protect existing book, no proactive new-name sourcing unless flagged.
14. **Journal gap, separate question, not urgent for Monday's open but still unresolved:** trading_journal102.jsx has never been written despite S93/S94 content existing across DECISION_REGISTER.md, LESSONS_LEARNED.md, and this file. James has not yet said whether S93/S94 were sessions where a close was skipped, or edits made outside a formal session. That answer decides whether the journal gets reconstructed or the gap stands with a note. No journal written for this Sunday reconciliation either, per explicit instruction.
15. Weekly deep dive (STRATB_SOURCING_PROTOCOL categories 14-23) run S93/S94, 11-12 July, fully completed, all nine active categories closed with a stated disposition. Real findings: KTOS thesis reinforced (capacity expansion, category-19 RAFAEL/Prometheus JV angle, category-17 SOTP segment check showing KUS is the smaller, less profitable segment behind the growth narrative), AMSC given a full Stage 2 (WATCHING, fails crash stress test, double-confirmed unresolved margin question, not entered), BAH re-checked (no new contract award), WEX/HDSN insider clusters logged for reference, VPG's non-entry case reinforced, category 16 retired as a cold-scan category after a third test.
16. MARKET_HEALTH_CHECK.md's own file still shows the stale S85 GREEN 6/24 calculation, not the AMBER 9/24 figure S92 actually calculated and carried forward in this file and DECISION_REGISTER. Worth writing the AMBER figure back into that file directly next session, same sync-gap pattern as the journal issue, smaller in consequence.
17. IBKR connector remains absent from the tool registry, now nine consecutive sessions across multiple reconnection attempts. Treat as a standing infrastructure fault, not a retry-worthy transient, until James confirms a fix.
18. LESSONS_LEARNED P74 logged S93/S94 (instruction-completion discipline) — worth a deliberate self-check at the close of any future session that opened with an "all"/"every" scoped instruction, confirm every item got a stated disposition before calling the session done.

**Resolved this session:** PEP stop TIF corrected DAY→GTC. OKLO's apparent stop-out (was cancellation, not trigger) confirmed resolved. OPTX's apparent stop-out (was confusion with OKLO) confirmed resolved. OPTX Rule 201 warning icon confirmed benign (uptick-restriction flag, doesn't affect the long-side stop). AISP and OPXS fill statuses corrected to full fills, confirmed twice now (S93 self-report, 12 July TWS screenshot). FATE realized P&L corrected and confirmed closed. AQST confirmed absent from the account.

**Not resolved, deferred to Monday, do not treat as decided:** PDYN, OPTX, CEG, DAL, AQST all require an actual go/keep/change decision from James, listed in full in OPEN ITEMS above. This file records what is live, not what should be live.

---
## S96 SESSION CLOSE, 14 July 2026 — supersedes the Sunday 12 July snapshot above

**Full session close run.** trading_journal103.jsx written (journal102 gap from item 14 above was resolved between this snapshot and today — journal102 exists, covers S95, 13 July, confirmed present in the journal directory this session). DECISION_REGISTER.md, TRACK_RECORD.csv, OPPORTUNITY_SCAN.md, MARKET_HEALTH_CHECK.md, BTC_PLAYBOOK.md, and NUCLEAR_SMR_PLAYBOOK.md all updated this session. SESSION_BRIEF.md cleared to template. Full detail for every position and decision lives in DECISION_REGISTER.md — this file records only what changed against the stale queue above, not a full restated position table.

**Resolving the Monday pre-open queue from the 12 July snapshot**, item by item:
1. OPXS stop — unchanged, $12.09 trigger/$10.50 limit, still the tightest buffer in the book, no new action taken.
2-3. PDYN and OPTX stop/target questions from 12 July are moot: OPTX closed entirely S95 (stopped out $8.65) and its orphaned $10.50 target confirmed CANCELLED S96. PDYN stop unchanged at $3.97, no fresh confirmation sought this session.
4. DAL — the live order flagged 12 July as bypassing the required T71/V1-GO reassessment: not tracked further this session, status as of 12 July stands, needs a fresh check.
5. CEG stop intent — RESOLVED partially: found live at $244.95 as of 14 July (a further raise from the $231.89 noted 12 July), still not separately confirmed as deliberate by James, carried forward again.
6. AQST — still absent from the account as of the last check, no change.
7. HNR1 EUR margin question — MOOT, position closed S96 (+11.6%, see DECISION_REGISTER and TRACK_RECORD.csv).
8. ONDS stop buffer — MOOT, position closed S95 (stopped out $6.98).
9. GTBIF hearing — concludes no later than tomorrow, 15 July. Checked for news this session, nothing new found. Stop now $7.08 (raised from the $5.50 base level across several sessions), close to cost.
10. OPTX 17 July hard exit — MOOT, position already closed S95.
11. PEP $155.32 orphaned target — RESOLVED, confirmed cancelled prior to this session, current live orders are a $142.60 limit and $137.55 stop on the remaining 50sh.
12. USD cash gap — not re-investigated this session, carried as unresolved.
13. Reduced-cadence period — superseded, James has been actively trading all session.
14. Journal gap — RESOLVED, journal102 (S95) exists, journal103 (S96, this session) written at this close.
15. Weekly deep dive — a further, abbreviated StratB scan was run S96 (forward calendar + category 20 stale-register check only, given a tight pre-CPI time window), not the full 23-category treatment. MX surfaced as a genuine Stage-1-worthy name from that scan, full Stage 1 completed same session (PASS on net-cash floor, PASS on treating 29 July earnings as a clean positive catalyst given management's own disclosed H2 margin-compression guidance).
16. MARKET_HEALTH_CHECK.md sync gap — RESOLVED S96, fresh full recalculation to AMBER 11/24, written back to the file itself, not just carried in DECISION_REGISTER.
17. IBKR connector — still absent from the tool registry, confirmed via multiple separate checks throughout S96, now well past a dozen consecutive sessions. James reports it working in a freshly-opened chat elsewhere; the new chat this close is setting up should verify at its own open.
18. LESSONS_LEARNED P74 self-check — applied throughout S96 explicitly (see journal103's own structure), no new violation found this session on that specific discipline. A different, new error was caught instead: OKLO's reentry order was mislogged as "filled" when the Orders screenshot showed it resting/unfilled — corrected during this close, flagged as a possible new LESSONS_LEARNED candidate for next session's judgment, not written unilaterally.

**New items for next session, not carried from the stale queue:**
- OKLO 400sh @ $45.30/stop $44.50 — resting, unfilled as of the last screenshot. Check first.
- FAC $4.50/600sh override buy, $2.00 stop — resting, unfilled, well below current price.
- EUR/GBP conversion — recommended (EUR) and discussed (GBP, closer call), explicitly deferred by James, neither executed.
- CEG and CODA stop raises (to $244.95 and $8.47) found live but not separately confirmed as deliberate — same pattern as item 5 above, worth a direct confirmation rather than continuing to carry as unconfirmed indefinitely.

## S96 GENUINE FINAL CLOSE, same day, later — supersedes the "continues in a new chat" note below
James continued working in this same thread rather than moving to a new chat after the earlier close; that earlier close write-up above is retained for the record but this section is the actual final state. Since that point: CRWV and IBM both given full Stage 1/Stage 2 treatment (both PASS, no position), the VMAR miss (+46% same day after two passes) logged honestly without relitigating the original reasoning, NOW/SPRO scout pair reconciled (NOW filled and stopped up twice as it gained, SPRO never triggered), and a full final order-screenshot reconciliation caught PEP's stop-out plus a second orphaned-order naked-short risk (the $142.60 profit-take limit left resting on the now-closed PEP position, same pattern as OPTX earlier) and six stop-price changes across CEG/CODA/KTOS/RKLB/UAMY/NOW.

**Real process failure caught and corrected at this final close: trading_journal103.jsx was originally written using the wrong tool and never actually reached this Dropbox path**, despite being reported as saved. Caught only when attempting to update it and finding it absent via a directory listing. Re-written correctly via the filesystem MCP connector, with the full session folded into the single corrected file, per James's explicit instruction not to create a new journal. This is logged in the journal itself as the most serious error of the session, and separately here so it isn't missed on a state-file-only read next time.

**Final open items for next session, superseding the mid-session list above:**
1. OKLO 400sh @ $45.30/stop $44.50 — confirm filled, unfilled as of the last screenshot this session.
2. FAC $4.50/600sh override buy — confirm status, likely still resting.
3. PEP's orphaned $142.60 sell limit — confirm cancelled, real naked-short risk if not, flagged but not yet confirmed actioned.
4. GTBIF — DEA hearing concludes no later than 15 July, tomorrow. Check first thing.
5. EUR/GBP conversion — still unexecuted, still James's own deliberate deferral, not urgent.
6. IBKR connector — still broken even in a freshly-opened chat per James's own report (worked once, then stopped). Worth escalating to support directly rather than re-checking every session.

---
*Last updated: S96 TRUE final close, Tuesday 14 July 2026, journal103 error caught and corrected, full session folded into the single corrected journal file per James's explicit instruction.*
