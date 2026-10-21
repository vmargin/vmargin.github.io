# Valkenburgh Margin · Portfolio v6

A static React and TypeScript portfolio for junior software development roles, with evidence-led project pages for CASH-G, ARCTIC, and AssetHub.

## Run locally

```powershell
npm.cmd install
npm.cmd run dev
```

Vite serves the home page at `http://127.0.0.1:5176`. `npm.cmd run build` typechecks the application, creates the production bundle, validates the content, and prerenders home and the three direct project routes. `npm.cmd run preview` serves the built site at `http://127.0.0.1:4176`.

## Content and project evidence

- `src/data/portfolio.json` is the source for project descriptions, roles, stacks, screenshots, system paths, verification notes, and education/training.
- The home page introduces the developer and links to the three projects. Each project has a direct, reloadable case-study page with real application captures, a workflow, an architecture view, engineering decisions, role boundaries, source links, and evidence limits.
- CASH-G is presented as two separate applications: a Java Swing/JDBC desktop v1 and a Spring Boot/Thymeleaf web v2. The portfolio screenshots show only Web v2 and its local synthetic-data demo.
- ARCTIC captures show a local synthetic-data workspace. The latest public synthetic-demo entry reaches its hosted dashboard; no business record is edited and no full authenticated workflow suite is claimed.
- AssetHub distinguishes the hand-coded original, AI-assisted v2 frontend redesign/deployment, and AI-assisted v3 redesign/development/deployment with user research informing feature selection. Gallery captures have no unverified version labels.
- No employment history, customers, adoption, business impact, or live production workflow is invented. Verification records and their limits are linked on each case-study page.
- `docs/evidence-sources.md` records where the images came from and what they show.

## Design and accessibility

The portfolio pairs supplied formal/About portraits and a responsive lower landscape with editorial type, an original decorative dot field, and neutral dark/light themes. Project pages use shared design tokens and native screenshot-viewing dialogs. Theme and motion preferences persist on every route; mobile navigation focuses the chosen destination. Resume v4 and the AWS completion certificate are served as unchanged PDFs for viewing. Project cards have separate Try Demo links and accurate access notes.

The About bulb shares the header theme setting: light mode shows the black portrait and white bulb; dark mode shows the white portrait and black bulb. Small bare rays sit in a transparent 44px target. Hover and keyboard focus rotate/scale them over 250ms and show Switch appearance; reduced motion and pause remove the transition. The closing photo and contact details share a desktop split layout and stack below 1024px, within the centered 1350px maximum.

The shared metadata builder supplies page titles, descriptions, canonical URLs, social metadata, and structured data. Home/case-study modules load separately, while the same React components provide initial HTML through build-time prerendering. The build generates `sitemap.xml`, `robots.txt`, `404.html`, and portable `_headers` configuration. The current static-host configuration exposes only the output directory; recognition of `_headers` is unverified.

GitHub Pages publishes the user site at `https://vmargin.github.io/` through the `Publish Valk` workflow. It builds the root-domain copy, identifies its browser title as Valk, and rewrites canonical and discovery URLs for that host.

## Verification

```powershell
npm.cmd run typecheck
npm.cmd run build
npm.cmd run verify:content
npx.cmd playwright install chromium
# With the preview server running in a separate terminal:
npm.cmd run verify:browser
npm.cmd run verify:latest
npm.cmd run verify:portrait
npm.cmd run verify:bulb
npm.cmd run build:github-pages
npm.cmd run format:check
```

Playwright uses full Chromium (`channel: chromium`) so the built-in PDF viewer is available. Optional `PORTFOLIO_URL` and `CHROMIUM_PATH` environment variables override the local address and browser executable. Current browser evidence is saved to the ignored `artifacts/portfolio-latest-update-2026-10-21/` directory; the earlier implementation records remain preserved. Document checks compare served bytes with the recorded SHA-256 values of the supplied originals; they work without the ignored input backups.

See [`docs/latest-update-audit-2026-10-21.md`](docs/latest-update-audit-2026-10-21.md) for the full audit, [`docs/portrait-split-results-2026-10-21.md`](docs/portrait-split-results-2026-10-21.md) for the latest portrait/layout checks, and [`docs/verification.md`](docs/verification.md) for historical checks. The portrait/layout evidence lives in `artifacts/portfolio-portrait-split-2026-10-21/`. Set `PORTFOLIO_EVIDENCE` to that directory's `browser` subdirectory to reproduce the corresponding main regression record. Project images remain in `public/images/projects/`; supplied originals live in `assets/source/portraits/`, `assets/source/controls/`, and `assets/source/landscape/`. Regenerate image derivatives and screenshot dimensions with `node scripts/prepare-portfolio-assets.mjs`.

The existing hosted Site identity and static output directory are recorded in `.openai/hosting.json`.
