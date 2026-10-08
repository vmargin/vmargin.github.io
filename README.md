# Valkenburgh Margin · Portfolio v6

A static React and TypeScript portfolio for junior software development roles, with evidence-led project pages for CASH-G, ARCTIC, and AssetHub.

## Run locally

```powershell
npm.cmd install
npm.cmd run dev
```

Vite serves the home page at `http://127.0.0.1:5176`. `npm.cmd run build` typechecks the application, creates the production bundle, and generates direct project routes under `dist/projects/`.

## Content and project evidence

- `src/data/portfolio.json` is the source for project descriptions, roles, stacks, screenshots, system paths, verification notes, and education/training.
- The home page introduces the developer and links to the three projects. Each project has a direct, reloadable case-study page with real application captures, a workflow, an architecture view, engineering decisions, role boundaries, source links, and evidence limits.
- CASH-G is presented as two separate applications: a Java Swing/JDBC desktop v1 and a Spring Boot/Thymeleaf web v2. The portfolio screenshots show only Web v2 and its local synthetic-data demo.
- ARCTIC captures show a local synthetic-data workspace. The hosted application link opens its sign-in page; this portfolio does not claim that a hosted authenticated workflow was tested.
- AssetHub copy distinguishes the earlier version built solo from the 2026 AI-assisted rebuild and feature expansion.
- No employment history, customers, adoption, business impact, or live production workflow is invented. Verification records and their limits are linked on each case-study page.
- `docs/evidence-sources.md` records where the images came from and what they show.

## Design and accessibility

The portfolio keeps its established photographic hero, editorial type, and dark/light themes. Project pages use the same design tokens, fit narrow screens, expose full-size screenshots through ordinary links, and retain keyboard-readable section order. The theme choice persists locally; animation continues to respect reduced-motion settings.

The content source and route generator keep page titles, descriptions, canonical URLs, social preview metadata, and structured data specific to each project route.

## Verification

See [`docs/verification.md`](docs/verification.md) for the latest build, browser checks, and limits. The project image derivatives are in `public/images/projects/`; user-supplied hero originals remain in `assets/source/hero-pair/`.

The existing hosted Site identity and static output directory are recorded in `.openai/hosting.json`.
