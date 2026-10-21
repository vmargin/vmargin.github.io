# Portfolio v6 · verification record

Current: [latest user update and complete audit review](latest-update-audit-2026-10-21.md). Its browser artifacts are saved separately under `artifacts/portfolio-latest-update-2026-10-21/`; earlier runs below retain their dates.

Latest: [October 21 implementation and verification results](implementation-results-2026-10-21.md). The October 9 entries below remain historical and do not describe the updated portraits, content, or delivery architecture.

This record distinguishes evidence for the portfolio from older checks owned by its projects.

## October 9 visual and content update

- The approved starting commit is `cac5d1d`; the local restore tag `checkpoint/approved-content-2026-10-09` points to it. Coursework/toolkit content was committed separately before the visual redesign.
- `npm.cmd run format:check`, `npm.cmd run typecheck`, `npm.cmd run build`, `npm.cmd audit`, and `git diff --check` pass. The dependency audit reports zero known vulnerabilities.
- The current homepage preserves all three project data objects byte-for-byte after JSON parsing. It adds four previously published coursework topics and 31 toolkit entries across six categories. The shadcn/Radix filters render all 31 items and filter to the selected category.
- Production Playwright checks cover the homepage at 320px and 390px in light and dark themes, with no horizontal overflow or broken images. The selected hero asset changes with the persistent color theme. The hero photographs remain WebP at 168,466 and 135,966 bytes.
- All three case-study routes load their own route titles and canonical URLs. CASH-G, ARCTIC and AssetHub each fit 1440px, 390px and 320px widths in both themes with no horizontal overflow (18 combinations).
- The previous, extended route loop exceeded the Playwright connector time limit. The completed bounded rerun returned all 18 case/page configurations without overflow. This is not a test of authenticated project workflows.
- Portfolio interactions verified: category filters, theme persistence, the quick-preview dialog closing on Escape and returning focus, mobile navigation closing on Escape and returning focus, and a system reduced-motion preference.
- A settled Playwright accessibility sweep passed on the homepage and all three case-study routes in light and dark themes (8 route/theme combinations): no unnamed visible controls (45 on the homepage and 22 per case study), missing image alt attributes, duplicate IDs, broken ARIA references, skipped heading levels, or contrast failures for text on solid-color backgrounds. Text over image and gradient backgrounds is excluded from the numerical contrast check and was visually reviewed in the settled captures.
- Final screenshots were taken after scrolling through every reveal-on-scroll section so the complete page is visible. The review set is in the Codex task outputs, outside the Site source: `homepage-desktop-light.webp`, `homepage-desktop-dark.webp`, `homepage-mobile-light.webp`, `homepage-mobile-top.webp`, `toolkit-mobile.webp`, `coursework-mobile.webp`, and one desktop light capture for each case study (`cash-g-desktop-light.webp`, `arctic-desktop-light.webp`, `assethub-desktop-light.webp`).

## Project evidence limits

- CASH-G's published desktop README records 32 tests with 0 failures and notes that 6 database tests may be skipped when the local database is unavailable. The Web v2 repository documents a separate version and local H2 demo. Neither project suite was rerun for this portfolio update.
- ARCTIC's linked October 6 verification record reports its project checks. Its portfolio captures use a local synthetic-data workspace; this check does not exercise a hosted authenticated workflow.
- AssetHub's linked October 7 verification record covers the project checks named on its case-study page. This check does not create an authenticated hosted session.

## Earlier portfolio baselines

Earlier entries in the Git history and hero reference analysis are historical evidence and do not independently reverify the current production UI or the workflows in the individual projects.
