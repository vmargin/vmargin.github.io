# Card consistency and portrait glare refinement

## Latest scope

- Inspect the current published portfolio and the two latest supplied screenshots before editing. Keep the existing facts, resume, black portrait, theme controls, and unrelated working-tree files intact.
- The user's latest request explicitly restores public GitHub repository visibility and authorizes republication to GitHub Pages. This supersedes the private-repository requirement in the previous checkpoint. This update targets GitHub Pages.

## Completed implementation

- Use the Java training card's 24px padding and shared type scale for all three cards. Remove education-only padding, type, and alignment overrides and its decorative date icon.
- Give every card corresponding date, title, institution/provider, description, and final-content rows. CSS subgrid aligns the rows across neighboring cards while letting genuine content determine their height. Keep the smaller responsive padding and single-column mobile layout.
- Keep the existing degree label beneath the university name, use the same description style as the training cards, and retain all four coursework items. Keep the Java completion/certificate-pending wording, AWS course/exam distinction, original dates, and genuine links unchanged.
- Use warm muted #D8D0C4 for the light portrait backdrop. Compress neutral sweater highlights while preserving skin tones and warm edge lighting. Protect bright sweater fibers with the matching dark portrait's interior silhouette to avoid backdrop-mask patches; soften the protection boundary to retain natural edges.
- Keep the 350ms portrait crossfade, bulb, shared preferences, reduced motion, section background, and all other portfolio content unchanged.

## Verification

- Preserve inspected reference screenshots, live baseline captures and measurements, refined captures, and browser evidence under ignored `artifacts/card-portrait-refinement-2026-10-22/`.
- Confirm the new acceptance check fails before editing because education uses 44px padding while Java uses 24px. Confirm the previous portrait color also fails the new muted-background expectation.
- Pass four focused browser checks covering corresponding card rows/type/padding at 1440/1024/768/390/320px, retained copy and date typography, both portrait mappings, crossfade, keyboard activation, persistence, reduced motion, and graded image dimensions/backgrounds.
- Pass the Pages production build and formatting checks, plus all 11 existing content-contract checks. Inspect the final cards in both themes and the dark About section visually.
- The sampled face region's mean RGB channels differ by less than one level from the prior WebP; the sweater sample decreases by about 11 levels. No global section dimming or portrait-wide brightness filter is applied.
- Confirm the black portrait has no Git diff and resume v4 matches its existing object `7aeadb27afaad6c54bf2806a17789b680ff0a2df`. Portfolio JSON facts remain unchanged.

## Next action

- Commit only relevant files, restore the existing repository to public visibility, enable its Pages configuration/workflow, and push the verified portfolio commit.
- Verify the successful Actions deployment and the public routes with Playwright before reporting the live URL. Preserve the pre-existing task-tracker change, untracked October 21 publication checkpoint, `.codex/`, `.impeccable/`, and ignored artifacts.
