# Portfolio v6 · evidence before decoration

## Purpose and surface

This is a personal portfolio for junior software-development roles. Its main surface is an experience: identify the developer, understand the work, inspect evidence, and reach out. Project pages shift to a reading surface, where a recruiter or interviewer can scan a workflow and then inspect implementation details.

The established photographic hero, editorial serif display type, Manrope body type, dark/light palettes, and generous spacing remain the visual identity. The audit improves the project's evidence and reading path without introducing a new brand direction or unrelated interactions.

## Page progression

The home page moves from identity and role to three selected projects, an about section, technologies shown in project context, verified education and training, and contact. Each project card uses an actual product capture as its preview and offers a direct case-study route. The short modal remains an optional preview rather than the only way to access project information.

Each case-study page follows the same order: project scope and role, real screenshots, system shape, user workflow, engineering decisions, version history where needed, and verification with limitations. Its architecture view uses an ordered list so the flow remains understandable to assistive technology and on narrow screens.

## Content boundaries

- CASH-G desktop v1 and Spring Boot Web v2 are described separately. The Web v2 gallery uses its local H2 practice demo and synthetic data; it does not stand in for Swing v1.
- ARCTIC is a modeled four-branch service operation. Its portfolio captures use synthetic local records; a public sign-in page is not presented as proof of a hosted workflow.
- AssetHub distinguishes the earlier solo-built application from its AI-assisted 2026 rebuild. The current page describes the rebuild and does not claim unverified authorship of every implementation detail.
- Tests, deployment checks, and product claims name their source and date. This portfolio update does not treat an old result as a newly run check.
- No client, adoption, outcome metric, or professional employment claim is added without evidence.

## Interaction and accessibility

React and TypeScript own the portfolio surface. `portfolio.json` owns the content; the case-study component renders it, and a small build script creates static deep links with route-specific metadata. Native links, buttons, and ordered lists provide the default interactions. The screenshot gallery opens the underlying image in a new tab.

The existing dark/light choice persists in local storage. Focus indicators, semantic headings, descriptive screenshot alternatives, native modal behavior, and `prefers-reduced-motion` remain part of the implementation. Project pages and their architecture lists must stay readable at 320px without horizontal overflow.

## Verification

Run the TypeScript check and production build, then inspect the home page and all three direct case-study routes in Playwright. Verify image loads, page metadata, theme persistence, dialog Escape and focus return, and 320px/390px layouts. The current results and any untested production workflow are recorded in [`docs/verification.md`](docs/verification.md).
