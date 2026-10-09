# Portfolio v6 · a photographic case-study portfolio

## Direction

The home page introduces a software developer and web developer through personal sunrise and Antipolo photographs, then moves into three evidence-led case studies, a project-backed toolkit, coursework and training, and contact. The visual language pairs Cormorant Garamond display type with Manrope, a restrained blue accent and persisted dark/light themes. In light mode, the photography stays unobstructed and the contact text remains legible against the image. Toolkit and education cards share one quiet surface, while the mobile toolkit uses full-width category cards with more room between technology marks.

## Page progression

A framed photographic hero establishes identity, role and the primary project action. The three-card project grid gives CASH-G a larger first feature, then shows ARCTIC and AssetHub as supporting studies. The about section balances the approved introduction with a genuine personal photograph. The toolkit groups 31 items by discipline, with optional category tabs. Education puts four historically published computer-engineering coursework topics beside completed training. The closing photo and contact links retain the existing application paths.

Each case-study route remains a reading surface: contribution, real screenshots, system shape, workflow, engineering decisions, source/test evidence and verification limits. Architecture remains an ordered list for screen readers and narrow screens. Routes, anchors, case-study text, source links and per-project metadata stay intact.

## Design and motion

Dark and light palettes share one token system. The user-supplied sunrise/sunset WebP pair and existing portraits remain the only editorial photos; case-study cards and galleries use their actual product captures. shadcn/ui Tabs, Button and Badge provide accessible interaction patterns and are themed with the portfolio's own tokens. Radix powers tab semantics and keyboard behavior. Tailwind v4 provides shadcn utility styles without its global reset, so the established stylesheet owns layout and typography.

GSAP and ScrollTrigger orchestrate the hero entrance, one-time section reveals and restrained desktop image parallax. CSS handles button, link, image and focus feedback. Lenis remains gated to fine pointers. Motion can be paused, and system reduced-motion preferences disable it. Navigation stays usable without animation.

## Content and evidence boundaries

- CASH-G desktop v1 and Spring Boot Web v2 are separate applications. The homepage preview depicts Web v2 and its local synthetic-data practice demo.
- ARCTIC captures show isolated local synthetic records. A public sign-in route is not presented as a verified hosted workflow.
- AssetHub copy attributes the earlier asset manager to the developer alone and describes the 2026 rebuild and expansion as AI-assisted.
- Coursework is restored from an earlier published portfolio version. The course names were not transcript-verified; they are broad historical portfolio topics.
- The toolkit includes project technologies, even for AI-assisted implementation; it does not score proficiency or claim unaided mastery.
- Tests, deployment checks and project claims retain their existing dates, sources and limits. No clients, adoption, business impact, professional employment or unavailable demo are implied.

## Image handling

Both hero assets are already optimized WebP. The page requests the selected theme image. Originals stay in `assets/source/hero-pair/`. AssetHub marks, sourced from the Devicon project, are stored locally; product UI previews use the retained genuine screenshots.

## Verification

See [`docs/verification.md`](docs/verification.md) for fresh production-build, formatting, responsive, theme, route and browser-interaction checks. All three case studies remain static, deep-linkable pages with route-specific titles, canonical/social metadata and structured data.
