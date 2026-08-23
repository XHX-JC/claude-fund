# LESSONS_LEARNED.md
# RESTRUCTURED S110 (Stage 3, Sub-stage A). Two layers per the approved permanent-index +
# recent-narrative architecture:
#   (1) PERMANENT INDEX (below) -- always live, always active, regardless of session recency.
#   (2) RECENT NARRATIVE -- the last 1-2 sessions only (S107 and the 20 Aug P78 ad hoc entry).
# Everything older (S64 through S91, plus P73-P77) has moved to LESSONS_LEARNED_ARCHIVE.md,
# verbatim, in its original physical order. Nothing has been deleted. Use fund-history to
# retrieve archived material -- no manual per-code index is maintained in this file.
# ══════════════════════════════════════════════════════════════════════════════════════

## PERMANENT INDEX -- ALWAYS ACTIVE, INDEPENDENT OF SESSION RECENCY

**V1 -- CONVICTION VERIFICATION LOOP.** Mandatory table before any conviction rating. Full
origin (OKLO S80, three uncorrected conviction revisions in one session) and the mandatory
table format are preserved verbatim in LESSONS_LEARNED_ARCHIVE.md, S80 AMENDMENTS section.

**V1-S -- SOURCE HIERARCHY RULE.** Secondary commentary locates information only; conclusions
are drawn from primary sources (SEC filings, agency releases, earnings transcripts, Form 4s).
Full origin (the OKLO AP1000/Motley Fool miss) preserved verbatim in the archive, S80 section.

**V1-GO -- GO/NO-GO REASSESSMENT LOOP.** Runs fresh at every entry decision point; cannot be
substituted by an earlier V1 table. Full origin and the mandatory output block preserved
verbatim in the archive, S80 section.

**P62 -- EARLY-INVESTOR DISCOUNT-BASIS OVERHANG SCREEN.** Mandatory Stage 1 check for any
candidate with a PIPE/pre-IPO/SPAC-sponsor cohort sitting on a deep discount basis (generalises
T74/P42 from reactive to pre-entry; SPCX named example). Full origin preserved verbatim in the
archive, S83 AMENDMENTS section.

**T64 -- Chart price supersedes search data.**
**T65 -- HNR1 standalone stop: manual cancel required on any exit.** (Note: HNR1 position
itself closed S96 -- this specific application is now historical, but the general standalone-
stop-mechanics principle it embodies remains a live operational caution.)
**T66 -- Check all stops after any order cancellation.**
**T67 -- Every exit requires one of four stated conditions.**
**E30 -- Journal written at close only, never mid-session.**
**E31 -- Journal never overwritten -- always a new file.**
  -- For all six codes above: only this one-line summary is confirmed to exist. I read the
  full LESSONS_LEARNED.md and LESSONS_LEARNED_ARCHIVE.md content and could not locate a
  standalone full origin entry for any of these six codes -- they exist in this fund's records
  only as the summary line already carried in SESSION_OPEN_PROTOCOL.md. This is not fabricated
  or reconstructed here; it is stated as a known gap. If a fuller origin for any of these is
  ever located (an earlier archive, a journal entry, James's own memory), it should be added
  here rather than assumed lost.

---

## RECENT NARRATIVE

## S107 AMENDMENTS — Friday 21 August 2026 (21 Aug close, dual-session journal covering 20-21 Aug)

Session character: heavy file-reconciliation session (market health recalc, six new resting
orders, AVAV/KTOS/ONDS Stage 1, CFG Stage 1/2, analyst watch), two real process errors made and
caught within the same session rather than carried forward.

ERROR 1: MARKET_HEALTH_CHECK.md recalculation initially claimed to supersede a stale AMBER
11/24 from 14 July. Wrong — the file's own 19 August entry (AMBER 9/24) was the genuine most
recent baseline, sitting between the 14 July content and the top of the file. Root cause: a tail
read plus keyword grep landed on the old 14 July section; the intervening 17-19 Aug entries were
technically in the fetched context but never surfaced or read before the recalc was written and
saved. Caught immediately after the write, when the file's own content contradicted the just-
written "supersedes" claim. Corrected same session before it could propagate. Lesson: a keyword
grep against a large append-only log file is not a substitute for reading the top of the file in
full before writing a new entry that claims to supersede something — the two searches used
(tail, and grep for AMBER/GREEN/score-value) both happened to skip the exact section that
mattered. Structural fix for next time this pattern recurs: read the first ~150 lines of any
append-only state file in full before writing a superseding entry, don't rely on grep alone to
surface the most recent prior entry.

ERROR 2: the analyst-watch check (ANALYST_WATCH.md) was run in a way that filtered out a fresh
name (MRVL) on the grounds it didn't touch an existing held or register position. This inverts
the check's actual purpose — it exists to surface NEW names, not to confirm coverage of names
already being tracked. Caught by James directly ("don't cross reference and disregard because
they are not on our radar"), corrected same session, re-run properly, surfaced two genuine leads
(MU, CFG) that the first pass would have discarded. Root cause: applied the wrong filter by
default, reasoning that only overlap with existing coverage was actionable, when the file's own
stated purpose is the opposite. Structural fix logged directly into ANALYST_WATCH.md's own
"HOW THIS RUNS AT SESSION OPEN" section as step 0, so the correction is load-bearing at the next
session open rather than living only in this journal entry.

Common thread across both: neither error was a data-availability problem, both were a reasoning/
process default applied without checking it against the file's own stated purpose or content
first. Worth flagging as a pattern rather than two unrelated one-offs — before writing a
superseding entry to any state file, or before applying a filter to a search/scan step, check
what the file or step is actually for, not just what seems like the reasonable default.




## P78 — A GENUINE LONG-TERM FUNDAMENTAL CASE IS NOT AN ANSWER TO A NEAR-TERM TACTICAL TRADE QUESTION

20 August 2026, ad hoc. James asked, independent of fund mandate, whether there was an
argument to short MRNA after it surged 177% in a single session on real Phase 3 melanoma
data (intismeran/Keytruda, genuine platform validation, not hype). The answer given was
no — citing OBV holding through a consolidation, a real underlying catalyst rather than
manufactured hype, and squeeze/borrow risk given the stock had just inflicted a $5B loss
on short sellers. The next session MRNA fell roughly 12-13% intraday on profit-taking and
valuation concern, no new negative data, a move that would have been genuinely profitable
to short from the open. James's own framing, stated after the fact but describing his
reasoning at the time: the rally was huge, the hurdles to the payoff becoming real revenue
remained significant (no hazard ratios/OS data yet, a future medical-conference readout
still pending, years to monetization even if the data holds), and profit-taking into that
combination was the more obvious near-term read.

The mechanism: the question asked was "is there a trade here now" — a near-term, tactical
question. The answer given was built mostly from a long-term framework — is the underlying
science real, is the platform validated. That framework produced a correct answer to a
different question than the one asked. "The catalyst is real" and "the move is already
larger than the next few sessions can sustain, given how far away the payoff still is" are
two separate, both-legitimate questions, and a strong yes on the first was allowed to stand
in for the second rather than being weighed alongside it. The OBV read (flat/elevated
through a few hours of chop) was also over-extended into "confirmed stabilization" — OBV
not making a fresh low over a short consolidation window is a coincident read of the last
few hours, not a forward signal that a much larger giveback isn't still coming, particularly
on a name documented elsewhere the same day as having 51 moves >5% in the past year.

RULE: for any single-session move of roughly 50%+ in either direction, when asked whether a
near-term trade exists, answer TWO separate questions explicitly, not one standing in for
the other: (1) is the underlying catalyst genuine — this determines the long-term direction
and whether a durable re-rating is justified at all; (2) given how far away the actual
payoff still is (pending data, regulatory steps, years to revenue, execution risk), has
TODAY'S move already priced in more optimism than the next few sessions can sustain,
independent of whether the long-term case is real. A "yes" on (1) does not answer (2), and
should never be allowed to override a genuine, separate assessment of (2). Magnitude of the
move itself, and distance-to-payoff, are inputs on their own, not proxies for catalyst
quality. Apply this before any future assessment of a large single-session mover, long or
short side, real news or not.

Next journal: trading_journal107.jsx
