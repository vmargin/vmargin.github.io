# Valkenburgh Margin · Portfolio v6

A responsive developer portfolio shaped by the supplied visual references, using verified content and imagery from [sample-portfolio](https://github.com/vmargin) as its content source.

## Start the site

```powershell
npm.cmd install
npm.cmd run dev
```

Vite serves the site at `http://127.0.0.1:5176`. Run `npm.cmd run build` to typecheck and create the production bundle in `dist/`; run `npm.cmd run preview` to preview that bundle locally.

## Project structure

- `src/data/portfolio.json` is the content source, copied from `sample-portfolio` and updated with facts from the supplied résumé. It retains project details, evidence limits, education, training, and verified links.
- `src/App.tsx` composes the accessible one-page portfolio and owns navigation, project dialogs, contact actions, and the motion preference.
- `src/ProjectVisual.tsx` draws small, explicitly labeled workflow illustrations for the project cards and dialog.
- `src/usePortfolioMotion.ts` is the single owner of GSAP scroll and pointer interactions and Lenis lifecycle.
- `src/styles.css` defines the page, responsive layout, states, and reduced-motion behavior; `src/project-visuals.css` styles the code-rendered illustrations.
- `assets/source/` keeps the original portrait outside the deployable site. `public/images/` contains only optimized, local assets. To regenerate them, pass the hero, contact and portrait source paths to `node scripts/prepare-images.mjs`.
- `DESIGN.md` records decisions from the six design-engineering stages.

## Content boundaries

Project descriptions preserve the evidence and limitations recorded in the source portfolio. They do not promise that deployments or historic test results are current. The little screens in the project cards are workflow illustrations, not application screenshots. `public/documents/valkenburgh-margin-resume.pdf` is a clean portfolio download based on the supplied résumé. It omits the phone number and home-city line; the original PDF remains outside this repository.

## Accessibility and motion

Semantic section links work without an animation library. The project details use the browser's native modal dialog for focus containment and Escape behavior, with focus returned to the originating project. The compact mobile navigation has labeled controls and works with the keyboard. Copy-email errors have visible text and a live status.

Scroll reveals, the image mask, parallax, timeline drawing, pointer magnetism, and desktop scroll smoothing respect `prefers-reduced-motion` and the visitor's motion control. Pointer movement is limited to devices with a fine pointer and hover. Most text is visible before any animation starts.

## Rollback

The first v6 Git checkpoint is `3bdb5df` (`chore: initialize isolated portfolio v6`). The completed, verified build is committed as the next checkpoint; use `git revert HEAD` to roll that checkpoint back while keeping it in history.

## Verification

The strict TypeScript/Vite production build passes. The browser verification checklist is in `docs/verification.md`; visible page and responsive checks use Playwright in the Codex browser. Deployment and live services are out of scope.
