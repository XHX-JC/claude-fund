# Claude-Locai Project Index
**Created:** 2026-04-28  
**Owner:** Claude / jcadb  

---

## Project Goal
Produce two institutional-grade documents for Locai Labs Limited:
1. **Pitch Deck** — investor-facing, designed to close a £10M raise
2. **IM Two-Pager** — institutional information memorandum, suitable for family offices, SWFs, and regulated fund managers

A third-party deck is in parallel development. Our output will integrate the best of both into a final definitive version.

---

## Folder Structure

```
Claude-Locai/
├── README.md                          ← This file
├── sessions/
│   ├── session-001-foundation.md      ← Source material review, fact base, red flags
│   ├── messaging-framework.md         ← Core narrative, four pillars, competitor contrast
│   └── session-NNN-[topic].md         ← Future session logs
├── drafts/
│   ├── pitch-deck-v[N].pptx           ← Pitch deck iterations
│   ├── im-twopager-v[N].pptx/.docx    ← IM two-pager iterations
│   └── [third-party-deck].pptx        ← 3rd party draft when received
└── assets/
    ├── logos/                         ← Brand assets when supplied
    ├── images/                        ← Approved photography
    └── data/                          ← Charts, financial models
```

---

## Document Specifications

### Pitch Deck
- Format: .pptx, 16:9
- Slide count: Target 15–18 slides
- Audience: Institutional investors, family offices, sovereign wealth funds
- Design: Dark/premium palette, minimal copy, evidence-first
- Constraints: Max 5 bullets/slide, 14pt min body, 0.75" min margins, no overlapping elements

### IM Two-Pager  
- Format: .pptx or .docx, A4 / US Letter
- Length: 2 pages maximum
- Audience: Fund analysts, investment committees — will be printed and circulated
- Design: Professional, no gradient backgrounds, dense but readable
- Standard: Goldman/Rothschild-style layout

---

## Slide Structure (Pitch Deck) — Draft Outline

1. Cover — "The British Sovereign AI Company"  
2. The Problem — Geopolitical AI dependency in 2026  
3. The Moment — Why now (Trump/tariffs/EU AI Act/Gulf de-risking)  
4. The Solution — Locai's sovereign AI stack  
5. Technology — Forget-Me-Not™ + Project Mercury  
6. Products — GB1 / Enterprise LLMs / Developer API  
7. Business Model — Three revenue streams, margin profile  
8. Enterprise Offering — White-label B2B detail  
9. Traction — Signed customers + pipeline  
10. First Light Fusion Case Study  
11. Market Opportunity — $600B sovereign AI market  
12. Competitive Landscape — Why no one else does this  
13. Project Mercury — Infrastructure roadmap with Civo  
14. Team  
15. Financials — Projections + use of funds  
16. The Ask — £10M, use of proceeds  
17. Back Cover  

---

## IM Two-Pager Structure

**Page 1:**  
- Header: Company name, strapline, ask, date  
- Investment thesis (3–4 sentences)  
- Business model overview  
- Revenue streams + margin table  
- Traction snapshot  

**Page 2:**  
- Market size  
- Competitive differentiation  
- Team  
- Financial projections (ARR year 2 + year 4)  
- Use of proceeds  
- Contact / legal footer  

---

## Session Log

| Session | Date | Key Output |
|---|---|---|
| 001 | 2026-04-28 | Foundation review, fact base, messaging framework, project structure |
| 002 | TBD | Pitch deck build — slides 1–9 |
| 003 | TBD | Pitch deck build — slides 10–17 + QA |
| 004 | TBD | IM Two-Pager build |
| 005 | TBD | Third-party deck integration + final QA |

---

## Skills & Connectors Confirmed Operational

| Capability | Tool | Status |
|---|---|---|
| PPTX creation from scratch | PptxGenJS skill | ✅ Confirmed |
| PPTX visual QA (PDF render) | LibreOffice + Poppler | ✅ Confirmed |
| Word document creation | docx skill | ✅ Confirmed |
| File system read/write | Filesystem MCP | ✅ Confirmed — C:\Users\jcadb\claude-fund |
| PDF reading | In-context (project files) | ✅ Confirmed — both source docs read |
| Icon generation | react-icons + sharp | ✅ Confirmed |
| Web search | web_search tool | ✅ Confirmed — for market data verification |
| Image search | image_search tool | ✅ Confirmed — for asset sourcing |

### What's Missing / Needs Supplying
- Brand assets (logo files, approved colour hex values)  
- Third-party deck (when ready)  
- Current MRR/ARR confirmation  
- Independent benchmark validation for L1-Large  
- Exact McKinsey 2025 report citation for market size figures  
