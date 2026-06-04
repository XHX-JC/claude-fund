# SI-88 — ACTIONABLE ORDER PROTOCOL
# Created: S55 | 2 June 2026 | Amended same session
# Origin: HPE missed +36% gap (third time), MU missed +71%, MRVL — separate lesson
# ═══════════════════════════════════════════════════════════════════

## THE RULE

When Stage 2 research is complete and an entry zone is defined with conviction,
a GTC limit order MUST be placed in the same session. No exceptions.

---

## VALID DEFERRAL REASONS — ONLY FOUR

**1. P24 — AMENDED S55**

P24 does NOT automatically block entry when Stage 2 is complete and conviction
is explicitly documented. P24 blocks entry only when:
  (a) Stage 2 is incomplete, OR
  (b) The thesis has not been specifically assessed against the upcoming earnings

When Stage 2 is complete and conviction is high, a pre-earnings entry is a
deliberate calculated decision, not a rule violation. The stop must be sized
for the worst-case thesis-break scenario, not a mechanical percentage.
The risk of a gap-down is accepted, sized, and stated explicitly.

Waiting for the post-earnings open risks losing the entry permanently on a gap-up.
HPE was at $26 in zone for weeks. Gap to $47 overnight. Entry zone gone forever.

When entering pre-earnings with conviction, state:
"Pre-earnings entry — Stage 2 complete — conviction confirmed — stop sized for
thesis break at [PRICE] — gap-down risk accepted and sized."

**2. Explicit documented thesis doubt**
State the specific doubt in writing. Vague uncertainty is not a valid deferral.

**3. Capital constraint**
SI-35 budget genuinely unavailable. State remaining deployable cash explicitly.

**4. Specific non-earnings trigger not yet met**
State the trigger explicitly. Examples:
  "Chart base not yet formed — require 3-5 sessions of stabilisation above [X]"
  "Awaiting confirmation that drawdown is market-driven not company-specific"
  "Conditional on peace deal signal per PEACE_DEAL_STRATEGY.md"

If none of these four reasons apply, the order goes in today, not next session.

---

## THE PROXIMITY CHECK — MANDATORY AT EVERY SESSION OPEN

After IBKR reconciliation (Step 2 of session open), Claude runs this check:

"Which MONITORING or ACTIVE tier names are within 5% of their entry zone?"

For each name within 5%, state:
  Name | Current price | Entry zone | Distance | Deferral reason or ORDER REQUIRED

If no valid deferral reason applies:
"ORDER REQUIRED — [TICKER] is [X]% from entry zone. No valid deferral.
GTC limit [PRICE], stop [PRICE], [N] shares. Confirm to place at [exchange] open."

This check is non-negotiable. It runs every session. It takes two minutes.

---

## THE DISTINCTION — NOISE vs SIGNAL

CRDO at $220 with entry zone $175-185: 9.2% above zone. No flag. No order.
Alert at $180. Wait. Do not generate noise when price is not in zone.

HPE at $26 with entry zone $25-27: IN zone. Stage 2 complete. SI-48 passed.
ORDER REQUIRED. Flag raised. Order placed same session or deferral stated.

The proximity check catches the HPE situation. It does not create CRDO noise.

---

## ON MRVL — A DIFFERENT LESSON (S55)

MRVL was entered at $152 in S30, held through its record May 27 earnings,
and exited in profit. This is an exit management lesson, not an entry failure.
Do not conflate it with HPE (entry missed) or MU (entry missed +71%).
The relevant MRVL lesson is: how to manage a winning position through a known
earnings catalyst when the thesis is intact. That is T30, not T62.

---

## PROXIMITY CHECK FORMAT — SESSION OPEN OUTPUT

PROXIMITY CHECK (SI-88):
[Ticker] — Zone [X-Y] | Current [Z] | Distance [N%] | [STATUS]

STATUS options:
  ORDER REQUIRED — [reason no deferral applies]
  DEFERRED — P24 pre-earnings, conviction [HIGH/MEDIUM], re-check [date]
  DEFERRED — Technical: [specific condition not yet met]
  DEFERRED — Capital: [$X deployable, need $Y for this position]
  ALERT SET — Price not yet in zone. Alert at [price].

---

## CURRENT PROXIMITY TABLE (S55 — 2 June 2026)

| Ticker | Zone | Current | Distance | Status |
|--------|------|---------|----------|--------|
| EXE | $88-92 | $92 | 0.5% | ORDER REQUIRED — chart check at 17:00 UAE |
| CEG | $262-268 | $268 | 0% | DEFERRED — Technical: confirm clean open above $268 at 17:30 |
| HNR1 | €220-228 | €223 | 0% | DEFERRED — Technical: chart base not formed, reset alert €220 |
| SAF.PA | €278-288 | €295 | 2.4% | ALERT SET — approaching zone, alert €285 |
| OKLO | $55-65 | $66 | 1.5% | ALERT SET — marginally outside zone, alert $60 |
| MP | $60-65 | $69 | 6.2% | ALERT SET — alert $65 |
| CRDO | $175-185 | $202 | 9.2% | ALERT SET — alert $180, assess before acting |
| NXPI | $270-285 | $307 | 7.7% | ALERT SET — alert $280, P24 gate 25 July |
| CHG | 460p | 481p | 4.6% | ORDER LIVE — GTC 460p/stop 440p confirmed |

---

## INTEGRATION WITH SESSION OPEN PROTOCOL

SESSION_OPEN_PROTOCOL.md Step 2b (to be added at S55 close):

"2b. SI-88 PROXIMITY CHECK — mandatory before any analysis.
For every MONITORING and ACTIVE tier name, check current price vs entry zone.
Flag any name within 5% of entry zone. Apply four deferral tests.
If no valid deferral: state ORDER REQUIRED and request confirmation.
This check runs every session without exception."

---

## LESSONS THAT CREATED THIS RULE

| Miss | Loss | Root cause |
|------|------|-----------|
| MU — missed +71% from $454 | Uncalculable | Stage 2 never completed. T35. |
| HPE — missed +36% from $26 | ~$5,000+ on reasonable position | Stage 2 complete. Entry zone reached. No order. No proximity check. |
| MRVL — different lesson | N/A | Entry made at $152. Held through earnings. Exit management lesson. |
| CRM — missed +24% EPS gap | ~$500+ | Stage 2 complete. Entry zone reached. No order. T62. |

Three of these four were preventable with a proximity check and the amended P24 rule.

---

*Written and amended: S55 | 2 June 2026 | Claude via filesystem MCP*
*Next review: S65 (one month) — assess whether proximity check is generating*
*correct signals or creating noise. Adjust 5% threshold if needed.*
