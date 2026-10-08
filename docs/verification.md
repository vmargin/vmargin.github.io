# Portfolio v6 · verification record

This record covers the evidence-first portfolio update on October 8, 2026. It separates checks performed on the portfolio from older or project-owned evidence.

## Portfolio checks

The October 8 update was built and checked against the local production preview before publication.

- `npm.cmd run build`, `npm.cmd run format:check`, `git diff --check`, and JSON parsing of `src/data/portfolio.json` passed.
- Playwright opened the home page and all three direct case-study routes. Each page returned its own title and canonical URL. The home page also returned the role-specific description and absolute Open Graph URLs.
- The home page and case studies fit 320 px and 390 px viewports without horizontal overflow. The 320 px quick-preview dialog measured 280 px wide with matching scroll width. Mobile case-study summary text rendered at 17 px and image captions at 15 px.
- All nine case-study gallery images loaded. The seven linked code and test files returned HTTP 200 through the GitHub API.
- Light and dark themes persisted after reload and selected the matching hero image. A fresh preview tab recorded no console warnings or errors.
- The native quick-preview dialog stayed within its modal focus boundary during Tab and Shift+Tab checks, closed with Escape, and returned focus to its opener. The mobile menu also closed with Escape and restored focus to its trigger.
- A rendered contrast sample of 89 text elements on the AssetHub case-study page found no solid-background text pair below 4.5:1 in either theme. Text over the hero and contact photographs uses overlays and was visually reviewed; this was not a complete assistive-technology audit.
- New local review screenshots were saved under the task's `outputs/evidence` folder; they are review artifacts, not files shipped with the Site.

## Project evidence limits

- CASH-G's published desktop README records 32 tests with 0 failures and notes that 6 database tests may be skipped when the local database is unavailable. The Web v2 repository documents its separate version and local H2 demo. Neither project suite was rerun for this portfolio update.
- ARCTIC's linked October 6 verification record reports the test and deployment checks it performed. On October 8, this portfolio update captured three views in an isolated local synthetic-data workspace. The public check confirmed sign-in and health responses only; no hosted authenticated workflow was exercised.
- AssetHub's linked October 7 record covers the project checks named on its case-study page. On October 8, the public check confirmed sign-in and health responses only; no authenticated hosted session was created as part of this portfolio update.

## Earlier portfolio baselines

The October 1 and October 2 entries in the Git history and hero reference analysis document earlier visual checks for the existing hero, themes, and motion. They are historical evidence and do not verify the new project cards, case-study routes, galleries, or project-specific metadata.
