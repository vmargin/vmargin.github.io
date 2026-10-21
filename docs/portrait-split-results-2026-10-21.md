# Portrait control and editorial contact results

## Subsequent bulb refinement

The latest request supersedes the circular control described in the earlier result below. The current button has a transparent 44x44px target and small 22px rays, without a visible surrounding circle. It retains the 16px top/left inset and pointer cursor. Hover and keyboard focus rotate the rays 45 degrees and scale them to 1.1 over 250ms. A small Switch appearance tooltip remains hoverable and dismisses with Escape. Keyboard focus retains a visible 2px rectangular outline, and the tooltip remains visible when focus automatically scrolls the button into view. Pause/reduced motion removes the transition. Portrait mapping, saved preferences, and the lower split layout stay intact.

Fresh verification: `npm.cmd run verify:bulb` passes five grouped checks across both themes at 1440px and 320px, plus system reduced motion/saved pause. The four `verify:portrait` regression groups pass again, including keyboard/touch activation, header synchronization and persistence, portrait/bulb mapping, and the 12 landscape/theme/width combinations. Contrast checks now sample the actual photographs behind the transparent control, with measured minima of 8.49:1 and 9.94:1 in the checked states. Build/typecheck and formatting pass. The preceding 45-check full-suite run remains dated evidence from the prior pass; it is not rerun for this isolated refinement.

Evidence lives in `artifacts/portfolio-bulb-refinement-2026-10-21/`: `baseline-acceptance.json` records the five failing checks before changes; `final-acceptance.json` records the five passes; `portrait/final-acceptance.json` records the four regression passes. Desktop default/focus screenshots confirm the bare rays, tooltip, and focus indicator. All work remains local and the existing resume, assets, and unrelated files are preserved.

## Earlier split-layout implementation

October 21, 2026. Local follow-up to the [complete portfolio audit](latest-update-audit-2026-10-21.md). The [concise blueprint](portrait-split-blueprint-2026-10-21.md) records the intended scope. Existing unrelated/ignored files and rollback commit `cf8757e` remain preserved. No push, deployment, publication, external application change, or resume rewrite occurs.

## Implemented and verified

| Request                                       | Result                                                                                                                                                                                                                                                                                   |
| --------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Supplied bulb near the portrait's top-left    | Native 52px button inset 16px from both edges. Uses a trimmed transparent derivative of the supplied light-ray artwork, with contrasting circular housing. Original PNG is retained unchanged.                                                                                           |
| Black portrait with light site and white bulb | Verified through keyboard activation, header controls, reload, and direct-route preference persistence. The black original matches the supplied file byte for byte.                                                                                                                      |
| White portrait with dark site and black bulb  | Verified through the same shared theme state. The supplied white original is retained unchanged, with an optimized natural-color 800x1000 WebP.                                                                                                                                          |
| Keyboard usability and visibility             | Tab reaches the native button; Enter and Space activate it; focus remains on the button. Its stable name is Toggle dark mode, with an accurate pressed state and a concise accessible description. A 3px ring remains visible on either portrait. Touch activation also passes at 320px. |
| Motion preferences                            | The control remains usable with system reduced motion and saved pause. Theme changes add no portrait animation. Existing motion controls and saved settings pass regression checks.                                                                                                      |
| Editorial split                               | Photograph and caption occupy the left panel, contact details the right, from 1024px. Below that width they stack in reading order. The section stays centered with a 1350px maximum.                                                                                                    |
| Supplied landscape                            | The same original and responsive variants are reused. The complete 4:3 composition retains natural colors and has no text overlay. Browser checks verify actual painting, loading, natural proportions, and no horizontal overflow in both themes at 1920/1440/1024/768/390/320px.       |
| Existing actions and content                  | Three projects, exact hero/About copy, navigation, filters, previews, galleries, email/copy/social controls, and documents remain functional. Resume v4 retains SHA-256 `bade4049a4b7be0f0272659151f20f3c769f44cf90a010d6f74edb86a3f4361d`.                                              |

## Verification record

- `npm.cmd run verify:portrait`: four passing grouped Playwright checks. Evidence and screenshots are in `artifacts/portfolio-portrait-split-2026-10-21/`. `baseline-acceptance.json` records all four missing behaviors before production edits; `final-acceptance.json` records the implemented behaviors and measured geometry.
- `npm.cmd run verify:browser`, with `PORTFOLIO_EVIDENCE` set to the follow-up `browser` directory: all 45 grouped checks pass. This repeats all four routes in both themes at 1440/390/320px, navigation boundaries, all filters/previews/galleries, shared preferences, clipboard success/denial, metadata/static rendering, semantic references, contrast, actual document viewing, and dot-field behavior.
- `npm.cmd run verify:content`: all 11 contract checks pass. Build validation also checks actual dimensions for both About portraits and the bulb.
- `npm.cmd run build`, `npm.cmd run typecheck`, and `npm.cmd run format:check` pass.
- Visual inspection covers both portrait states and desktop/mobile contact screenshots. It catches an inherited negative image z-index that became active when the photo became a flex item. `paint-regression-red.json` records the reproduced failure; resetting the photo's z-index fixes it, and the new painting assertion passes.

The earlier six latest-copy/card/demo checks and live application observations remain dated evidence from the preceding pass; they are not claimed as new application authentication checks in this follow-up. The landscape geometry assertion in that suite now centers the containing section, consistent with the requested split composition.

## Accessibility inspection

| Check               | Result                                                                                                                                                                                                                                                                               |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Keyboard navigation | Pass. Native Tab, Enter, Space, persistent focus, touch target, and visible focus ring are checked in Chromium.                                                                                                                                                                      |
| Focus containment   | Pass for the existing native preview/gallery dialogs in the repeated regression suite. The portrait toggle opens no dialog and requires no focus trap.                                                                                                                               |
| Semantics           | Pass. A native button supplies keyboard behavior; stable accessible name and pressed state describe dark mode. Decorative bulb artwork has empty alt; each portrait has its own descriptive alt. The description ID resolves, and site-wide duplicate-ID/ARIA-reference checks pass. |
| Contrast            | Pass for checked pairs. Foreground/housing contrast is calculated against worst-case black and white underlays and exceeds 4.5:1 in both states. Focus visibility against both supplied portraits is also inspected in screenshots. Existing site text-pair checks pass.             |

This is rendered Chromium verification and source inspection, not a manual screen-reader certification. The implementation is in `src/components/AboutPortrait.tsx`; its native button is the accessibility remediation, without a custom keyboard handler or simulated button role. Inspection against the blueprint and local coding standards finds no remaining implementation issue in this follow-up.

## External limits

No new external blocker affects these two changes. The preceding audit's limits remain: CASH-G opens but its public practice sign-in fails with an unconfirmed backend cause; live-host headers/discovery require separately authorized deployment; automated profile/source access can encounter service restrictions; unchanged resume and external repository wording retain the documented provenance limits. This follow-up does not repeat those external application checks or mark them repaired.

Review locally at `http://127.0.0.1:4176` while the preview server runs.
