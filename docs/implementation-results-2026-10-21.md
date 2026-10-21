# Portfolio implementation results

Historical first implementation pass. The subsequent user update and its current verification are recorded in [the latest audit checklist](latest-update-audit-2026-10-21.md), including the changed palette, copy, SIL removal, landscape, navigation, project order, and CASH-G URL.

October 21, 2026, Asia/Manila. Scope: local implementation and verification. Rollback commit: `cf8757e` (parent `a02a255`). The checkpoint adds a baseline record to the already committed handoff/audit/context tree before application changes. Unrelated `.codex/`, `.impeccable/`, and ignored inputs remain preserved. Nothing is pushed, deployed, or published.

## Completed scope

- Supplied transparent formal hero and opaque About portraits have durable original copies and optimized derivatives. Desktop uses a left introduction/right portrait; mobile stacks the content. Shared centered maximum is 1350px, with readable copy measures and supporting type.
- Original decorative dots respond locally to mouse movement and settle. Theme, pause, system reduced motion, and page visibility apply across routes. Native one-time section entrances replace the eager GSAP/Lenis graph; those unused dependencies are removed.
- Navigation and footers expose Certifications and View Resume. Mobile selections focus their sections; Escape restores the menu trigger. About's action row is removed. Contact copy/controls have local photo backing in both themes and useful clipboard success/failure messages.
- Exactly CASH-G, ARCTIC, and AssetHub remain. Confirmed identity, general junior/full-stack positioning, learning narrative, project/version contributions, client-origin ARCTIC nuance, and overall AI tool list replace unsupported or repetitive copy.
- Certifications & Training combines education, completed Java training with provider/dates, genuine AWS course completion, and Spring Valley SIL. Java has no document action or awarded assessment claim. AWS uses the supplied completion PDF; resume v4 retains its exact supplied bytes.
- ARCTIC's work-order caption/alt/context, AssetHub's unsubmitted checkout form, CASH-G's recipient-history test description, and inventory staff versus MEMBER wording are corrected. No unknown version dates, gallery mappings, contributor counts, branch counts, or adoption measurements are added.
- Previews are concise, galleries use native enlargement dialogs with original-size/fit controls, screenshots reserve intrinsic dimensions, and mobile architecture/toolkit layouts are compact. The complete 31-tool inventory remains available through seven filters and expansion.
- All four routes prerender readable React HTML and hydrate controls. Home/case-study modules load separately; direct case studies omit the home/motion scripts. Shared metadata covers generation and client fallback. Zod validation constrains data, URLs, gallery dimensions, supported IDs, unique routes, and output paths. Sitemap, robots, 404 output, and portable static-host headers are generated.

## Audit resolution checklist

| Finding                                   | Local status and evidence                                                                                                                                                     |
| ----------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| F1: missing AWS document                  | Resolved: supplied PDF returns 200/application/pdf, opens the Chromium viewer, and matches its source hash.                                                                   |
| F2: mobile destination focus              | Resolved: Projects/About/Stack/Certifications/Contact focus their selected sections; Escape restores the trigger.                                                             |
| F3: saved pause on case studies           | Resolved on direct loads of all routes, with both explicit pause and system reduced motion.                                                                                   |
| F4: eager route/animation imports         | Resolved: separate route chunks and conditional 474-byte native motion module; no home/motion script observed on case-study loads. No field-performance claim.                |
| F5: gallery layout reservation            | Resolved: intrinsic width/height in JSON and markup; build checks actual file dimensions. CLS is not measured.                                                                |
| F6: empty initial content                 | Resolved: all four HTML outputs contain their rendered page; JavaScript-disabled browser checks read the content.                                                             |
| F7: unchecked content contracts           | Resolved: Zod build checks and nine passing positive/rejection tests; TypeScript enables checked indexed access.                                                              |
| F8: divergent metadata                    | Resolved: one builder supplies title, canonical, description, Open Graph, Twitter image, and structured data.                                                                 |
| F9: hosting headers                       | Local configuration prepared; current-host recognition and production responses remain unverified. See limits below.                                                          |
| F10: discovery files                      | Resolved locally: four canonical sitemap entries and robots sitemap reference return successfully. Live responses remain unchanged until a separately authorized deployment.  |
| Content/aesthetic audit and updated brief | Implemented locally: confirmed scope, new portraits/dots, readable surfaces/actions, source corrections, ownership, preview/gallery behavior, and concise versioned evidence. |

## Verification

- `npm.cmd run verify:content`: nine passing contract checks, including empty galleries, duplicate/traversing routes, unsafe URLs, unknown categories, missing dimensions, and invalid next projects. Meaningful failing acceptance checks precede production changes; the saved baseline reproduces the original focus, motion, static-content, and credentials gaps.
- `npm.cmd run verify:browser`: 45 passing grouped checks. The route matrix covers home and all three studies at 1440/390/320px in dark/light themes, plus navigation boundaries at 768/1023/1024px. There is no observed horizontal overflow, broken image, missing image reservation, page error, hydration error, duplicate ID, or broken ARIA reference in these checks.
- Six width/theme interaction configurations exercise all seven toolkit filters, inventory expansion, all three previews, all nine gallery images, Escape/close/backdrop behavior, return focus, and original-size/fit controls. Gallery viewing produces zero downloads. Native modal checks distinguish contained page focus from normal access to browser chrome.
- Twelve PDF actions cover visible home and case-study resume links, mobile resume navigation, and AWS course completion. Full Chromium's viewer frame and PDF plugin are observed, with rendered resume/certificate screenshots and zero automatic downloads. Both document hashes match supplied originals. No PDF content is rewritten.
- Explicit pause and reduced motion apply across all routes. The dot field changes after pointer input, settles to stable pixels, and stays static after pause. Clipboard success uses the actual browser clipboard; the denied branch deliberately simulates `NotAllowedError` and verifies the email fallback.
- Static text token pairs and conservative photo-backing composites exceed 4.5:1; the minimum sampled ratio is 5.48:1. Responsive captures receive visual review. This is not a full WCAG certification, screen-reader session, field Core Web Vitals study, or authenticated linked-application audit.
- `npm.cmd run build`, `npm.cmd run typecheck`, `npm.cmd run format:check`, and `git diff --check` pass after final formatting. Vite updates from 7.3.6 to patched 7.3.7; the current npm advisory audit reports zero known vulnerabilities.
- A final scoped smoke pass adds 16 passing checks after the last visual correction: document viewing/hashes, static content/assets/discovery, contrast/semantics, and clipboard success/denial surfaces at 1440/390/320px in both themes. Nonempty clipboard feedback receives the same local photo backing as the contact controls. Evidence is under `final-smoke/` within the artifact directory.

Raw evidence: `artifacts/portfolio-implementation-2026-10-21/`, including `baseline-acceptance.json`, `final-acceptance.json`, `route-observations.json`, `contrast-observations.json`, `documents.json`, browser screenshots, and external-link observations. Counts above are grouped checks/actions, not distinct-control totals or a universal test-coverage percentage.

## Public links and genuine external limits

Public checks on October 21, 2026:

| Confirmed URL                     | Observed result                                                                                                                                                                                                   |
| --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `https://cashg.onrender.com`      | HTTP 404, Not Found. The portfolio places this observed availability note beside the link and preserves screenshots/source access.                                                                                |
| `https://arcticaircon.vercel.app` | HTTP 200; redirects to ARCTIC sign-in with a synthetic-demo control. One public synthetic entry reaches the dashboard shell, still showing “Preparing your service day” after the bounded 6.5-second observation. |
| `https://erlassethub.vercel.app`  | HTTP 200; workspace-access page with public isolated-demo credentials. One supplied synthetic entry still shows “Signing you in” after the bounded 6.5-second observation.                                        |

These loading snapshots do not establish a backend failure, a Supabase pause, or completed authenticated workflows. No private account is used and no business record is edited. Application repair and additional workflow verification belong to those repositories.

The current `.openai/hosting.json` exposes a static output directory without a documented header mapping. The generated `_headers` uses common static-host syntax with nosniff, referrer/framing/permissions policies, report-only CSP with a theme-script hash, and inline PDF disposition. Its recognition by the current host is unknown. HSTS and enforcing CSP are not enabled based on local assumptions. Live headers, PDF disposition, discovery files, and route serving require deployment verification after separate authorization.

Java certificate issuance, a fourth project, a later resume, and a hosting migration are expressly deferred. They do not block the confirmed local implementation. Source-project test records remain attributed historical evidence; their suites are not rerun.

## Code inspection

Blueprint alignment: supported portfolio-local scope is implemented, with external boundaries recorded above. System integrity: one JSON content source, constrained output paths, shared metadata/preferences, route separation, and browser-safe prerendering remain consistent. Production readiness: observed browser/build checks cover the changed controls and routes; current-host behavior remains the documented external limit. No additional factual input or approval is needed to review this local implementation.
