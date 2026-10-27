# Portfolio current checkpoint

Latest update, October 28, 2026: all three supplied project showcase films are integrated. Home project images expose Watch showcase actions with durations; each case study places a poster-first video player before the gallery. Read `showcase-integration-checkpoint-2026-10-28.md` for source locations, implementation, verification, and the pre-existing resume hash assertion in the broader browser suite. The user explicitly authorizes a commit followed by GitHub Pages publication. The Pages production build passes; deployment verification follows the push.

Latest bulb refinement: replace the circular housing with bare 22px rays inside a transparent 44x44px native button at the existing 16px top/left inset. Hover and keyboard focus rotate 45 degrees and scale to 1.1 over 250ms; a small Switch appearance tooltip supports hover, focus, Escape dismissal, and automatic focus scrolling. A 2px rectangular focus outline stays visible; reduced motion and saved pause remove the transition. Shared portrait/theme mapping and persistence remain unchanged. Local verification passes five new grouped checks (`npm.cmd run verify:bulb`) and the four portrait/layout regression groups, build/typecheck, and formatting. Fresh evidence lives in `artifacts/portfolio-bulb-refinement-2026-10-21/`. The previous 52px circular-control description below is historical. No push, deployment, publication, resume edit, or unrelated cleanup occurs.

Latest follow-up: the About bulb and editorial contact split are implemented. Read `docs/portrait-split-blueprint-2026-10-21.md` and `docs/portrait-split-results-2026-10-21.md`. Light mode shows the supplied black portrait and white bulb; dark mode shows the supplied white portrait and black bulb. The 52px native toggle shares the header preference and preserves keyboard focus. Supplied originals are durable in `assets/source/portraits/` and `assets/source/controls/`. The complete landscape and contact details split from 1024px and stack below it within the centered 1350px maximum. This supersedes the older single-column photo placement described below.

Follow-up verification: four grouped Playwright checks cover keyboard/touch, theme synchronization and persistence, reduced/paused motion, control contrast, and both themes at 1920/1440/1024/768/390/320px. All 45 existing browser checks pass again, including the original audit's interaction/document checks. Eleven content-contract checks pass. Build/typecheck and formatting pass. Current evidence is `artifacts/portfolio-portrait-split-2026-10-21/`; earlier records stay preserved. Screenshot inspection catches and resolves an inherited negative z-index hiding the photo inside the new flex panel; the regression now checks that the photograph actually paints. Resume v4 remains unchanged. Work stays uncommitted after `cf8757e`; nothing is pushed, deployed, or published. External limits below remain the prior bounded observations.

Saved October 21, 2026 after the latest user update. All work stays local and reviewable. No push, deployment, publication, external repository edit, or resume rewrite occurs. The existing rollback commit remains `cf8757e`; application edits remain uncommitted. Unrelated `.codex/`, `.impeccable/`, and ignored input backups remain preserved.

## Completed

- Use neutral near-black `#09090b` and charcoal surfaces inspired only by the inspected reference palette. Preserve typography, portraits, optional light theme, route/motion controls, and authentic screenshot colors.
- Apply the exact latest hero headline/description and all three About paragraphs. Preserve supplied punctuation. Show Based in Antipolo, Rizal, label navigation Resume, remove the hero resume action, and remove the SIL card and residual supervised-learning introduction.
- Retain the supplied landscape original in `assets/source/landscape/`; generate four WebP variants without metadata. Display the complete 4:3 photo in a centered responsive container with a 1350px maximum, with readable black contact surfaces below it.
- Apply the existing card plan: AssetHub/ARCTIC/CASH-G order, distinct genuine captures and categories, contribution/capture context, and separate Try Demo/Quick preview actions. Use the exact latest URLs, including CASH-G's temporary `https://banking-app-v2.onrender.com/`.
- Inspect the public applications with Playwright. AssetHub and ARCTIC public synthetic entry reach populated dashboards. CASH-G opens but its public practice credentials receive the generic sign-in rejection; show that limitation beside its link without diagnosing Supabase.
- Complete applicable audit refinements: version-matched CASH-G decision sources and explicit tradeoffs, ARCTIC decision-to-gallery anchors, concise AI/toolkit disclosure, canonical verified repository redirects, and validated responsive image/gallery references.
- Save 45 passing main Playwright grouped checks, six passing latest-update checks, and 11 passing content-contract checks. Main browser coverage includes 24 route/width/theme combinations, navigation boundaries, all filters/previews/galleries, preferences, clipboard, metadata, initial HTML, semantic references, contrast, and actual PDF viewing. The latest checks include all three real Try Demo navigations and ARCTIC figure anchors. Build/typecheck and formatting checks complete the verification record. Resume v4's supplied hash stays unchanged.
- Update DESIGN, README, token/component records, input precedence, and the individual finding checklist in `docs/latest-update-audit-2026-10-21.md`. Earlier audit/implementation evidence remains historical; current raw artifacts live under `artifacts/portfolio-latest-update-2026-10-21/`.

## Locked decisions

The latest user message overrides older palette, hero/About copy, location, resume-label, SIL-display, and CASH-G URL choices. The exact copy is authoritative. Three projects only; unchanged resume v4 and existing contact destinations. No unknown real branch count, adoption, tool mappings, release dates, credentials, or project-suite execution is invented. A fourth project, resume revision, Java certificate issuance, and hosting migration remain deferred.

## Remaining external/deferred items

- CASH-G's practice authentication fails with “Unable to sign in”; no backend cause is confirmed and no linked-application repair occurs.
- Live hosting still lacks audited headers and serves 404 for robots/sitemap. Local output/config exists, but deployment and `_headers` support require separate authorization/verification.
- The coursework repository's general README/production-ready wording is outside this repository and remains unchanged.
- Older PDF provenance/version wording remains because v4 must stay unchanged; the website carries the confirmed nuance.
- LinkedIn returns HTTP 999/security verification to automation. Three GitHub HTML paths return 429; the corresponding public raw sources return 200 and are reviewed. These are not classified as broken profile/source URLs.

## Next action

Review the local site at `http://127.0.0.1:4176` while the preview server runs, or start it with `npm.cmd run preview`. Use the README verification commands to reproduce checks. Read `docs/latest-update-audit-2026-10-21.md` for every audit item's verified disposition and external limits. No confirmation question or further personal-facts questionnaire blocks local review.
