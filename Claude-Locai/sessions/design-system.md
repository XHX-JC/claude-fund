# Locai Labs — Design System
**Approved:** Session 001 / 2026-04-28  
**Version:** 1.1 — Refined palette (less saturated, more sophisticated)

---

## Colour Palette — Refined British Institutional

| Role | Name | Hex | Usage |
|---|---|---|---|
| Primary dark | Ink Navy | `#0D1B2E` | Major type, dark slide backgrounds, card top borders |
| Secondary dark | Mid Navy | `#1E3A5F` | Dark card fills, right panel on cover, inner borders |
| Deep surface | Deep Card | `#162B42` | Cards on dark backgrounds |
| Accent | Deep Crimson | `#8B1A2E` | Logo dot, rules, featured card borders, pipeline dots, key words — used sparingly |
| Primary light | White | `#FFFFFF` | Content slide backgrounds, card surfaces |
| Surface | Off-White | `#F5F7FA` | Slide backgrounds for data/traction slides, left panel on split slides |
| Light panel | Ice | `#EEF2F7` | Pipeline/secondary panels |
| Body text | Slate | `#3E4E5E` | Body copy on white |
| Sidebar text | Steel Blue | `#6B8FAD` | Body copy on dark, card text on dark |
| Muted | Grey-Blue | `#7A8B99` | Labels, captions |
| Ghost | Pale Blue | `#DDE5EE` | Decorative pillar numbers |
| Border | Border Grey | `#D6DDE6` | Card outlines on white |
| Dark border | Dark Steel | `#1E3A5F` | Card outlines on dark backgrounds |
| Footnote | Dark Muted | `#2D4A65` | Source citations, footer text |

## Typography

| Element | Family | Size | Weight | Colour |
|---|---|---|---|---|
| Logo mark | Georgia / serif | 36px | 700 | White, crimson dot |
| Slide headline | Georgia / serif | 24–30px | 700 | White (dark slides) / Ink Navy (light slides) |
| Slide title | Georgia / serif | 18–20px | 700 | Ink Navy |
| Section/eyebrow label | Calibri / sans | 10px | 700 | Deep Crimson — ALL CAPS, 0.12em spacing |
| Pillar title | Georgia / serif | 13px | 700 | Ink Navy |
| Body copy | Calibri / sans | 11–12px | 400 | Slate `#3E4E5E` (on white) / Steel Blue (on dark) |
| Metric number | Georgia / serif | 28–30px | 700 | White (dark) / Ink Navy (light) |
| Metric superscript | Calibri | 13–14px | normal | Deep Crimson |
| Chip / pill | Calibri | 10px | 400 | `#6B8FAD` on `#162B42` |
| Footnote / source | Calibri | 10px | 400 | `#2D4A65` |

## Red Usage Rules — Strict Rationing

Red (`#8B1A2E`) appears in exactly these contexts and no others:
1. Logo dot
2. 36px rule line under main title / section label
3. Featured metric card's top border (one card per slide maximum)
4. Pipeline dots (4px circles)
5. Eyebrow/section labels (text colour only)
6. Patent-pending badge border
7. Key word emphasis in main headline (one word maximum per slide)

**Red must never appear as a background fill.** Never as a button colour. Never as a full sidebar.

## Layout Rules

- **16:9 aspect ratio** — all slides
- **Minimum margins:** 0.75" all sides
- **Maximum bullets per slide:** 5
- **Body copy minimum:** 11px rendered / 13pt in PPTX
- **Left accent bar:** 3px crimson, full height — appears on all split-layout slides
- **Card top borders:** 2px — Ink Navy standard, Deep Crimson for one featured card per slide
- **No gradients** — flat solid fills only
- **No decorative full-width header/footer bars**
- **No accent lines under slide titles** — use eyebrow labels + whitespace instead

## Slide Templates

| Type | Background | Structure |
|---|---|---|
| Cover | Ink Navy `#0D1B2E` | 60% left content panel / 40% right dark stats panel |
| Split content (pillars) | White | 3px red accent bar + 26% off-white head panel + white main |
| Full dark (FMN, geopolitics) | Ink Navy `#0D1B2E` | Full width, 4-card grid, footnote strip |
| Data/traction | Off-White `#F5F7FA` | 3-card metrics row + 2-column bottom (dark signed / light pipeline) |
| Full light | White | Full width, no sidebar |
| Section divider | Ink Navy `#0D1B2E` | Large ghost number + title |

---

## Forget-Me-Not™ — Verified Data (Sourced November 2025)

Source: cms.locailabs.com/technical-blog (L1-Large Technical Report, Sujith Aleshwaram, 11 Nov 2025)

| Claim | Value | Verification |
|---|---|---|
| Human annotation required | Zero | Technical report, self-improvement methodology |
| Inference throughput improvement | 2× | FP8 PTQ quantisation with self-generated calibration data |
| GPU infrastructure — entire 235B build | 8 × H200 (1 node) | Technical report, confirmed in multiple press articles |
| Arena Hard v2 improvement vs base Qwen | +2.1% | Technical report — evaluated with GPT-4.1 judge |
| AgentHarm safety improvement | +17% | Technical report |
| Benchmark evaluation method | GPT-4.1 as judge | Standard Arena Hard v2 methodology |
| Training method | LoRA / PEFT + parallelisation | Technical report |

**Key commercial framing:**
- Zero human annotation = eliminates the largest single recurring cost in enterprise AI deployment
- 2× throughput = directly halves inference running costs for deployed models
- 8 GPUs for 235B = proves the methodology is accessible at low capital cost — critical for white-label B2B scalability
- No retraining from scratch = enterprise models stay current without prohibitive compute cycles

**Benchmark caveat to include:**
Arena Hard v2 scores are Locai self-reported, evaluated using GPT-4.1 as judge per standard methodology. Not yet independently reproduced on a third-party leaderboard. Present as strong performance signal, not as absolute proof of superiority.

---

## Approved Slide Outline

1. Cover
2. The Moment — Geopolitical AI dependency in 2026
3. The Problem — What the world is being asked to accept
4. The Solution — Locai's sovereign AI stack
5. Four Pillars — What sets Locai apart
6. Forget-Me-Not™ — Zero-annotation self-improving AI
7. Project Mercury — Infrastructure roadmap (Civo partnership)
8. Products — GB1 / Enterprise LLMs / Developer API
9. Business Model — Three revenue streams + margin profile
10. White-Label B2B — The scalable revenue engine
11. Traction — Customers signed + pipeline
12. First Light Fusion — Case study
13. Market Opportunity — Sovereign AI $600B by 2030
14. Competitive Landscape
15. Team
16. Financials + Use of Proceeds
17. Back cover / contact

---
*Last updated: Session 001 v1.1 — 2026-04-28*
