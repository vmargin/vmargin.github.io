# Portfolio v6 · verification record

Previous full-site baseline: local Vite development server, Playwright 1.63 Chromium, October 1, 2026. Hero integration rechecked on October 2, 2026; unrelated full-site checks below were not rerun.

## Theme and résumé verification

- The header Sun/Moon controls set the corresponding theme by mouse and keyboard, expose selection using `aria-pressed`, and persist it through reload under the `v6-theme` local-storage key. The saved theme is applied before React renders to avoid a flash of the default palette.
- Dark and light themes preserve page structure, content, artwork, and card geometry. Surfaces and foreground text/icons adapt for contrast.
- At 320px and 390px, both theme buttons and the mobile-menu button retain 44px hit targets, and neither theme introduces horizontal page overflow. The mobile menu still opens and closes with Escape.
- The résumé route serves the supplied PDF without modification. Source and served copy both have SHA-256 `D723636EC5B1E2DE562038CA082A34D9439F45AB1C6FF3A0791DFC3ECD5C8326` and are 79,800 bytes.

## Desktop

- The home, projects, about, process, learning journey, and contact sections all render with their supplied title and hierarchy.
- Two complete supplied sunrise/sunset photos load as the only hero image layers. Switching themes crossfades those photos; the figure is included in both. The generated dusk contact photo is lazy loaded.
- At 1280×720, Playwright measured the hero at 504px high and each photo at 1280×564.47, y=-30.23. Their shared crop places the head near y=228 and clips the feet below the hero. The projects section begins directly below the hero.
- The desktop hero follows the reference's subject position and crop, bright dawn versus navy/coral sunset, dark left-hand title treatment, editorial serif type, quiet header, and paired actions. The supplied photos have no shade or filter.
- The three project workflow illustrations and case study cards fit the viewport without horizontal overflow.
- The first and subsequent project dialogs open and show their matching title and details; dialog state locks body scroll. Escape closes the native dialog and restores focus to the CASH-G launch button.
- Project hashes and the button links update the intended section. The project overview case study works without an external hosted demo.
- The full-page accessibility tree exposes landmarks, headings, labels, actions, and links.

## Responsive and interaction checks

- At 390px and 320px widths, confirm the layout has no horizontal overflow. The mobile menu opens, exposes its expanded state and navigation links, closes after an anchor is selected, and returns focus to the toggle. Escape also closes the menu and returns focus. The responsive project grid stays within the 320px viewport.
- Reduced motion toggles from the footer and changes `document.documentElement.dataset.motion` while preserving readable content and navigation. Playwright emulation of the system reduced-motion preference confirmed that hero photo transitions are disabled.
- All three illustrations and project details load. Escape closes the native case-study dialog, unlocks body scrolling and restores focus to the originating project card. The contact anchor copy fits at 390px, and the generated dusk image loads.
- The email copy control changes to its success status on click. The current page generated no browser console errors after a fresh reload.
- Playwright verified both theme images load, their CSS boxes stay equal across themes, and the selected theme persists after reload. The previous separate-portrait comparison below records the October 1 implementation only.
- The TypeScript/Vite production build and `git diff --check` pass. Changed files pass Prettier. The repository-wide format check still flags the unchanged `index.html`.

## Résumé update

- The résumé action points to `/documents/valkenburgh-margin-resume.pdf`; the local server returns HTTP 200 with `application/pdf`, and the portfolio buttons expose a download action.
- Playwright checks at 390px and 320px reported no horizontal overflow. The updated biography and education timeline expose the résumé's four-branch ARCTIC context and relevant coursework.
- The served résumé file is an exact copy of the supplied PDF. The portfolio does not rewrite or redact the document.

The existing social profiles, contact details, project descriptions, and dated project checks are taken from `src/data/portfolio.json`; the checks have not been repeated as part of the site build. The final contact photograph also loads as a local asset. No remote services, analytics, or deployment were added.

## October 1 video-reference refinement (previous implementation)

- Compared the supplied video near its light and dark frames with the live hero, including person bounds, hero edge, sky/grass samples, and sun position. The measurements and remaining visual differences are in `docs/hero-reference-analysis.md`.
- Refined the separate sunrise and sunset plates from the supplied scene. The dark plate has deep navy clouds and a low coral sunset; the light plate has cool blue sky, pale warm horizon, and less green-looking grass. The live portrait remains a single unchanged image node above the shade in both themes.
- Playwright checked the crop at 1280px, 768px, 390px, and 320px, plus the 400/401px and 530/531px responsive handoffs. Shoes stay clipped and there is no horizontal overflow. On narrow phones, the head remains below the action buttons.
- Playwright confirmed both images loaded, theme selection persisted after reload, the animated crossfade completed when motion was enabled, the reduced-motion state showed no transition, and the page reported no console errors.

The October 1 composition used separate background plates and a portrait cutout. It was superseded by the user's complete photos on October 2; these checks do not describe the current image layers.

## October 2 supplied-photo integration

- Both October 2 PNGs are used byte-for-byte at 1672×941. Playwright at 1280×720 confirmed two loaded photo layers, one active per theme, equal 1280×564.47 boxes at y=-30.23, `object-fit: cover`, and `filter: none`. The hero has no portrait node or shade overlay.
- Playwright at 768×900, 390×844, and 320×780 confirmed the responsive crops, successful photo load, and no horizontal overflow. The figure remains near the video reference position at desktop, with feet below the hero edge.
- Theme switching keeps the hero and both image boxes fixed while the photos crossfade. The selected theme persists in local storage. Figure lighting differs because it is part of each source image.
- `npm run build` passes TypeScript and production bundling. Prettier passes on every changed file, and `git diff --check` passes. The repository-wide Prettier check still flags only the untouched `index.html`.
- Playwright observed the crossfade at 160ms with photo opacities 0.237/0.763 and equal image boxes; reduced-motion emulation reported no transition. Theme selection persisted through reload, both PNGs decoded, and the browser reported zero errors and warnings.
