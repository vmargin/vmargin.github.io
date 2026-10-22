# Motion implementation checkpoint

## Completed work

The user approves the concrete motion blueprint with "implement". Implement all four approved opportunities locally:

- `src/portfolioMotion.ts`: Add the coordinated hero name/copy/portrait entrance, first-entry mobile portrait, contact stagger, and native toolkit/preview effects. Preserve existing section entrance timings. Track played elements per root with weak references. Cancel and settle effects on preferences, visibility, and teardown.
- `src/useNativeMotion.ts`: Keep motion loading preference-gated, suppress late hero playback, and add the shared entry hook. Interrupt changed panels and prevent replay of the same entry after preference changes.
- `src/App.tsx`: Pass motion preference and input origin to existing toolkit/dialog components. Preserve all copy, markup content, links, assets, and native dialog focus behavior.
- `src/components/Toolkit.tsx`: Track pointer versus keyboard selection using existing Radix tabs. Keep keyboard changes immediate.
- `scripts/verify-motion.mjs`: Record the pre-edit content/layout baseline and failing motion acceptance checks, then verify implemented behavior. Evidence stays under `artifacts/motion-implementation-2026-10-22/`.
- Append the implemented motion values and contracts to design-tokens.md and ui-component-registry.md. Record blueprint approval. Preserve the historical planning handoff.

No CSS, content JSON, images, document bytes, case-study content, dependency manifest, or deployment configuration changes. Native Web Animations API expresses the approved effects without a new library or component.

## Verification

- `npm.cmd run build`: Pass, including TypeScript, Vite, and all four prerendered routes.
- `npm.cmd run typecheck`: Pass.
- `npm.cmd run verify:content`: All 11 checks pass.
- `npm.cmd run verify:browser`: All 45 grouped browser checks pass, including every route at 1440/390/320px in both themes, tablet navigation, toolkit/preview/gallery journeys, preferences, real PDF viewing, clipboard outcomes, and content semantics.
- `npm.cmd run verify:bulb`: All five groups pass.
- `node scripts/verify-motion.mjs`: All 14 focused groups pass. The pre-edit baseline is captured with `PORTFOLIO_URL=http://127.0.0.1:5176` and `--baseline` before production edits; its missing-motion failures are retained in baseline-results.json. The final run uses the fresh production build at port 4176.
- Frozen SHA-256 fingerprints cover portfolio JSON, case-study source, resume PDF, and package manifests. Visible text, links, images, and ten key layout bounds match the pre-edit baseline exactly at all six width/theme combinations.
- Focused checks cover once-played hero/contact entrances, mobile viewport timing, pointer versus keyboard panels/previews, rapid filter changes, Escape and return focus, saved pause, dynamic reduced motion, delayed enhancement, touch, theme changes, and prerendered content without JavaScript. Visibility cancellation uses a synthetic visibilitychange event and overridden document.hidden in the browser.
- Inspect desktop dark and mobile light hero frames at 160ms and the existing native preview in the batched visual pass. Other captures include settled hero, toolkit, contact, and both themes at 1440/390/320px. No visual correction is needed. The initial toolkit assertion counts pre-existing tab CSS transitions; scope the assertion to the active panel, which confirms that the added effect cancels on keyboard selection.
- Run the Impeccable detector once on all four changed production files; it reports an empty findings array. Raw output is impeccable-detector.json.
- Formatting and diff whitespace checks pass. The final inspection report records blueprint, system, and production review.

## Locked decisions

The current content and visual identity are frozen. The hero is the single focal sequence. Supporting transitions remain brief, and all controls work immediately. System reduced motion and saved pause keep the site's static alternative. Browser rendering and interactions are verified in Chromium desktop and mobile emulation; no physical-device performance claim is made.

Preserve the pre-existing task-tracker edit, `.codex/`, `.impeccable/`, and earlier publication records. The user subsequently authorizes GitHub Pages publication. The repository is public, its Pages workflow deploys from `main`, and `npm.cmd run build:github-pages` prepares all eight HTML/XML/text files for `https://vmargin.github.io/`. Push the selected motion changes to `main` and verify the resulting Pages workflow before reporting publication as complete.

## Next action

After the requested Pages deployment succeeds, review `https://vmargin.github.io/`. The local implementation and checks are complete. To replay the first-arrival hero sequence, reload the homepage with motion enabled and system reduced motion off.
