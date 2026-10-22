# Two-column journey and AI logo refinement

## Completed

- Group Education above Training in the left desktop column and retain the four project-experience entries in the right column. Keep a single desktop divider and use Education, Training, Experience as the mobile/DOM reading order below 1024px.
- Preserve all profile/project/credential copy, dates, links, hero, imagery, three featured cards, theme and motion preferences. Portfolio JSON remains unchanged.
- Supply actual local logos for Claude, Codex, OpenCode, Hermes Agent, OpenClaw Agent, Cline, Cursor and Anti Gravity. Use Lobe Icons source commit `453719ea68e6d480d0109a598c5a4cf80cda6a84`, retaining exact source URLs and the MIT license in `public/images/stack/LOBE-ICONS-NOTICE.txt`.
- Inspect downloaded SVG content for active scripts/external references before storing it. Use existing 22px desktop and 20px mobile glyph sizing, light backing, original colors and decorative images next to accessible tool labels. No dependency is added.
- Update the existing focused acceptance scripts, DESIGN and token/component records. Preserve unrelated motion/task-tracker changes and untracked workspace files.

## Verification

- All three updated focused groups fail before production edits, then pass against the final Pages build. Coverage includes two-column geometry, stacked foundations, all four project entries, keyboard/navigation behavior, original hero copy, and all eight logos loading at the existing 22px desktop/20px mobile sizes in both themes at 1440/1024/768/390/320px without document overflow.
- All four content-layout groups pass, retaining exact About/hero content, project-card details/technology lists, previews, verified credential details and responsive layout.
- All 12 content-contract tests pass. `npm.cmd run build:github-pages` passes typecheck, build, four prerendered routes and GitHub Pages preparation. Scoped formatting and whitespace checks pass.
- Inspect the final desktop layout in both themes and the actual AI-tool logo panel visually. Evidence and logo provenance are in ignored `artifacts/portfolio-journey-logos-2026-10-23/`. The four broader content-layout groups retain their existing artifact directory.
- Review finds the implementation matches the requested layout, reuses existing styles and keeps validated data/native interactions intact. No blocker remains in the scoped review.

## Publication

The verified refinement is ready for the ongoing authorized GitHub Pages publication. Append the deployment receipt and public verification after completion.
