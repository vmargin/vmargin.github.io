# Portfolio v6 · verification record

Environment: local Vite development server, Playwright 1.63 Chromium, October 1, 2026.

## Theme and résumé verification

- The header Sun/Moon controls set the corresponding theme by mouse and keyboard, expose selection using `aria-pressed`, and persist it through reload under the `v6-theme` local-storage key. The saved theme is applied before React renders to avoid a flash of the default palette.
- Dark and light themes preserve page structure, content, artwork, and card geometry. Surfaces and foreground text/icons adapt for contrast.
- At 320px and 390px, both theme buttons and the mobile-menu button retain 44px hit targets, and neither theme introduces horizontal page overflow. The mobile menu still opens and closes with Escape.
- The résumé route serves the supplied PDF without modification. Source and served copy both have SHA-256 `D723636EC5B1E2DE562038CA082A34D9439F45AB1C6FF3A0791DFC3ECD5C8326` and are 79,800 bytes.

## Desktop

- The home, projects, about, process, learning journey, and contact sections all render with their supplied title and hierarchy.
- Separate sunrise and sunset hero plates and one transparent foreground portrait load as local assets. Switching themes crossfades the background plates while keeping the portrait's source, position, size, and filter unchanged. The generated dusk contact photo is lazy loaded.
- At 1280×720, Playwright measured the hero at 504px high. The enlarged foreground portrait starts near y=225 and is clipped at the hero edge, so its shoes are hidden in both themes. The projects section begins directly below the hero.
- The desktop hero follows the reference's subject position and crop, blue sunrise versus navy/coral sunset, dark left-hand title treatment, editorial serif type, quiet header, and paired actions. The cloud edges and distant park visitors still differ from the video.
- The three project workflow illustrations and case study cards fit the viewport without horizontal overflow.
- The first and subsequent project dialogs open and show their matching title and details; dialog state locks body scroll. Escape closes the native dialog and restores focus to the CASH-G launch button.
- Project hashes and the button links update the intended section. The project overview case study works without an external hosted demo.
- The full-page accessibility tree exposes landmarks, headings, labels, actions, and links.

## Responsive and interaction checks

- At 390px and 320px widths, confirm the layout has no horizontal overflow. The mobile menu opens, exposes its expanded state and navigation links, closes after an anchor is selected, and returns focus to the toggle. Escape also closes the menu and returns focus. The responsive project grid stays within the 320px viewport.
- Reduced motion toggles from the footer and changes `document.documentElement.dataset.motion` while preserving readable content and navigation. Playwright emulation of the system reduced-motion preference confirmed that hero photo transitions are disabled.
- All three illustrations and project details load. Escape closes the native case-study dialog, unlocks body scrolling and restores focus to the originating project card. The contact anchor copy fits at 390px, and the generated dusk image loads.
- The email copy control changes to its success status on click. The current page generated no browser console errors after a fresh reload.
- Playwright verified both theme images load, the background crossfade overlaps during the transition, the portrait bounds do not move between themes, and the selected theme persists after reload.
- The TypeScript/Vite production build and `git diff --check` pass. Changed files pass Prettier. The repository-wide format check still reports warnings in untouched `src/usePortfolioMotion.ts`, `DESIGN.md`, and `index.html`.

## Résumé update

- The résumé action points to `/documents/valkenburgh-margin-resume.pdf`; the local server returns HTTP 200 with `application/pdf`, and the portfolio buttons expose a download action.
- Playwright checks at 390px and 320px reported no horizontal overflow. The updated biography and education timeline expose the résumé's four-branch ARCTIC context and relevant coursework.
- The served résumé file is an exact copy of the supplied PDF. The portfolio does not rewrite or redact the document.

The existing social profiles, contact details, project descriptions, and dated project checks are taken from `src/data/portfolio.json`; the checks have not been repeated as part of the site build. The final contact photograph also loads as a local asset. No remote services, analytics, or deployment were added.

## October 1 video-reference refinement

- Compared the supplied video near its light and dark frames with the live hero, including person bounds, hero edge, sky/grass samples, and sun position. The measurements and remaining visual differences are in `docs/hero-reference-analysis.md`.
- Refined the separate sunrise and sunset plates from the supplied scene. The dark plate has deep navy clouds and a low coral sunset; the light plate has cool blue sky, pale warm horizon, and less green-looking grass. The live portrait remains a single unchanged image node above the shade in both themes.
- Playwright checked the crop at 1280px, 768px, 390px, and 320px, plus the 400/401px and 530/531px responsive handoffs. Shoes stay clipped and there is no horizontal overflow. On narrow phones, the head remains below the action buttons.
- Playwright confirmed both images loaded, theme selection persisted after reload, the animated crossfade completed when motion was enabled, the reduced-motion state showed no transition, and the page reported no console errors.
