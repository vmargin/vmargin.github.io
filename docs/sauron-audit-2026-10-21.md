# Sauron portfolio audit

Date: October 21, 2026, Asia/Manila. Target: https://vm.marginvalkenburgh.chatgpt.site/#home.

## Assessment

The portfolio has a coherent photographic identity, useful project evidence, working direct project routes, and a responsive homepage. The most actionable defect is a broken certificate link. Two reproduced interaction problems affect mobile keyboard navigation and saved motion preferences. Performance and crawlability improvements are opportunities supported by the implementation; their impact is not measured with Core Web Vitals.

No critical or high severity issue is confirmed within this audit. This is not a WCAG certification, penetration test, or claim of passing field performance metrics.

## Orchestration and scope

- Coordinator: live browser inspection, visual review, reproduction, prioritization, and report.
- Aragorn: React/Vite architecture, delivery cost, content contracts, maintainability.
- Boromir: deployment, security headers, dependencies, public links, metadata.
- Legolas: accessibility, keyboard behavior, motion, semantics.
- Skills: engineering-loop routing, ui-ux-principles, accessibility-auditor, frontend-development, react-principles, vite-principles, typescript-standards, and context-checkpoint for the session handoff.
- Sources: local repository, live HTTP responses, and Chromium browser observations. Agents perform read-only application audits. Only audit documents and local evidence artifacts are created.

## Confirmed visitor-facing findings

### F1. Broken AWS certificate link: medium, fix first

Evidence: `src/data/portfolio.json:60` points to `/documents/aws-cloud-quest-completion.pdf`. Ordinary live GET returns 404; the file is absent from `public/documents/`.

Impact: The training card invites visitors to verify a credential, then sends them to a missing page. This interrupts recruiter review.

Recommendation: Publish the authentic intended public certificate, or remove the certificate action while retaining accurate completion text. Do not substitute the resume or fabricate a credential.

Acceptance: The action opens the correct PDF with a successful response, or no certificate action appears while the document is unavailable.

### F2. Mobile section navigation returns keyboard focus to the menu: medium

Evidence: `src/App.tsx:393`. Live browser opens the mobile menu and selects Projects. The URL becomes `#projects`; after settling, the active element is the button named `Open menu`.

Impact: The viewport moves to the requested section while the next Tab continues from the header.

Recommendation: After choosing a destination, move focus to its heading or section using a programmatically focusable target. Keep Escape returning focus to the menu trigger.

Acceptance: Choosing Projects moves focus to its destination; Escape without choosing a destination restores the trigger.

### F3. Case studies ignore the saved motion pause: low

Evidence: `src/App.tsx:235`, `src/ProjectCaseStudy.tsx:60`, `src/styles.css:91`. With `v6-motion-paused=true`, the homepage has `data-motion=reduced` and computed scrolling `auto`. A fresh CASH-G route retains the storage value but has no `data-motion` attribute and computed scrolling `smooth`.

Impact: A visitor's explicit motion preference stops applying on another portfolio page.

Recommendation: Initialize the saved preference globally before either route renders, together with system reduced-motion handling.

Acceptance: The stored pause applies on all four routes, including fresh direct navigation.

## Architecture and delivery findings

### F4. Every route receives the shared eager dependency graph: medium

Evidence: `src/App.tsx:23` imports case studies, Toolkit, and the motion hook before selecting a route; `src/usePortfolioMotion.ts:2` imports GSAP, ScrollTrigger, and Lenis. Live homepage uses `assets/index-BvfSq4Tu.js`; one resource observation records 156,174 encoded bytes. The corresponding existing local build asset is 473,281 bytes uncompressed. These are different size measures, not two network transfer measurements.

Impact: Case-study readers and visitors with motion disabled can still download home animation dependencies. CPU and loading penalties remain unmeasured.

Recommendation: Split home and case-study modules and conditionally import animation dependencies. Compare loading traces before and after under the same conditions.

### F5. Project screenshots lack final layout space reservation: medium risk

Evidence: `src/ProjectCaseStudy.tsx:254` renders gallery images without dimensions; `src/case-study.css:163` supplies a minimum height rather than their final aspect ratio.

Impact: Images can move captions and subsequent content as they load. Actual CLS is not measured, so this is a supported risk rather than a demonstrated failing metric.

Recommendation: Store intrinsic dimensions and render width/height, or reserve the correct aspect ratio for each screenshot.

### F6. Generated HTML contains metadata but no rendered page content: medium

Evidence: `index.html:73`, `scripts/generate-project-pages.mjs:54`. Live home and project HTML contain an empty React root. The generator updates metadata without prerendering visible content.

Impact: Content depends on successful JavaScript loading. Crawlers that do not execute JavaScript cannot read the case studies from the initial response. This does not prove Google fails to index the site.

Recommendation: Prerender these four static pages and hydrate interactive controls. Preserve their working route-specific metadata.

### F7. Content editing can violate unchecked assumptions: low, maintenance

Evidence: `src/components/Toolkit.tsx:15` and `:89` assume category IDs map to icons; `scripts/generate-project-pages.mjs:59` assumes a nonempty gallery. `tsconfig.json:15` omits checked indexed access. Generator route-to-output handling also lacks an explicit validated route contract.

Impact: A future unmapped category or empty gallery can break rendering or generation. Current content satisfies these assumptions; no present visitor failure is claimed.

Recommendation: Validate content at build time, require nonempty galleries and unique supported project routes, constrain category IDs, allowlist link protocols, and check generated paths remain within `dist/`.

### F8. Metadata implementations diverge: low, conditional

Evidence: `scripts/generate-project-pages.mjs:101` sets the Twitter image; `src/ProjectCaseStudy.tsx:73` omits that field. The component also hardcodes the profile name while generation reads the content source.

Impact: A future host serving generic SPA fallback HTML could leave inconsistent previews; current generated live project pages have correct metadata.

Recommendation: Share one metadata builder between generation and client updates.

## Hosting and discoverability

### F9. Defensive HTTP headers are absent: low, hosting hardening

Boromir's live homepage inspection finds no CSP, HSTS, X-Content-Type-Options, X-Frame-Options, or Referrer-Policy headers. Missing headers do not establish an exploitable vulnerability in this static site.

Recommendation: Check host configuration support. Add `nosniff`, an explicit referrer policy, an appropriate framing policy, and a CSP compatible with the inline theme initialization and hosting scripts. Use report-only evaluation before enforcing CSP. Enable HSTS only with verified HTTPS coverage and control of the intended scope.

### F10. Sitemap and robots discovery files return 404: low

Live `/sitemap.xml` and `/robots.txt` return 404. Missing robots.txt does not prohibit crawling.

Recommendation: Generate a sitemap of the home and three canonical project routes; reference it in robots.txt.

## Visual and content review

The photographic hero, serif headings, restrained palette, and genuine application screenshots create a consistent identity. The featured CASH-G card establishes a clear first project. Contribution and verification limits are unusually explicit and useful for technical review. Retain that evidence while improving scanning.

Recommendations below are editorial judgments, not reproduced defects:

- Add a short, specific value statement near the hero: the kinds of applications and workflows you build. The current role line and evidence statement explain identity and proof more clearly than specialization.
- Give each case study an opening summary of the problem, personal contribution, and observable result. Use existing evidence such as workflow coverage or documented checks; do not invent adoption or business impact.
- Keep implementation caveats readable but secondary to the project summary. A recruiter should understand the project before reading the detailed verification record.
- The 31-item toolkit occupies substantial mobile space. Consider showing a compact default selection with category browsing, while retaining project context for skills.
- Light mode removes the hero and contact scrims (`src/styles.css`). Text sits over photographs, so contrast depends on the responsive crop. Review text at actual pixel size in both themes before choosing a subtle text backing or scrim. No numerical image-background contrast failure is asserted here.

## Checks and limits

| Area | Result |
| --- | --- |
| Live homepage, dark, 1440/390/320px | No observed horizontal overflow, page errors, or broken images after scrolling to load lazy assets |
| Home and three case studies, 390px, dark/light | Eight route/theme checks: no observed overflow or broken images; correct titles, canonical URLs, and h1 content |
| Quick preview | Opens with focus on Close; Escape closes it and returns focus to its trigger |
| Toolkit Languages filter | Selection updates successfully |
| Mobile section selection | Reproduces F2 |
| Stored motion pause across routes | Reproduces F3 |
| Project routes | All three return 200 with project-specific metadata; unknown route returns 404 in agent inspection |
| Dependency advisory audit | Boromir reports zero known vulnerabilities across 266 dependencies at audit time |
| Public external URLs | Boromir reports 20 GitHub/application HEAD responses of 200; LinkedIn returns 405 and remains unverified |
| Credential pattern review | Agent finds no candidates in 27 current tracked text files, excluding lockfile; history and binaries are outside scope |

Browser evidence is in `artifacts/sauron-audit-2026-10-21/`: `browser-evidence.json`, `route-evidence.json`, `interaction-evidence.json`, screenshots, and the scripts used to gather them. This directory is ignored by Git. Lazy images are evaluated after scrolling; unloaded images on initial entry are not classified as broken.

No Lighthouse score, field LCP/INP/CLS, throttled benchmark, screen-reader session, full Tab traversal, or numerical photographic contrast audit is performed. Theme route checks use stored preferences followed by reload. Existing October 9 verification records are historical context, not fresh evidence. No production source, deployment, commits, or project application data are changed.

## Recommended sequence

1. Repair the certificate action, mobile destination focus, and shared motion preference.
2. Reserve screenshot dimensions and split route/animation delivery. Measure before claiming performance gains.
3. Improve the opening value statement and case-study summaries using existing evidence.
4. Add sitemap discovery, prerendered content, and supported hosting headers.
5. Validate the content contract and consolidate metadata generation.
