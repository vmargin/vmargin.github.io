# Portfolio v6: cinematic, personal, considered

## Scope and design authority

This is an independent repository at `C:/Users/margi/Desktop/lockedIn/portfolio v6`.
The four supplied section comps define the visual direction. The supplied motion brief defines the motion budget. Other portfolio repositories are outside the write scope. No deployment or remote creation is requested.

## Stage 1: foundations

Surface mode: Experience, with a clear contact path. Root router: design-engineering. Primary execution route: visual-comp-image-to-code-converter. Supporting foundation: design-system-architecture-spec.

Single-page reading order: Home, Projects, About and strengths, Process, Learning journey, Contact. Native section links must work independently of decorative animation. Native dialogs own focus containment, Escape and project-detail reading. Mobile navigation is an inline disclosure. All targets are at least 44px. Meaningful information stays visible by default; motion progressively enhances it.

React + TypeScript + Vite, GSAP ScrollTrigger for coordinated animation, Lenis for optional desktop smoothing. CSS owns hover and focus feedback. No backend is needed for a portfolio with contact links.

## Stage 2: aesthetic specification

Extracted from supplied comps: ink navy #10161c, near-black #0b1015, warm ivory #f5f2ed, muted silver #b6bdc7, restrained blue #adc8fa. Display: Cormorant Garamond, 500 weight; body: Manrope, 400/500. Fonts are bundled locally.

Maximum content width 1440px with fluid 5.4vw gutters. Display sizes use clamp; desktop hero approximately 90px and section titles 56px. Thin translucent separators, 14px image radii, restrained card surfaces, pill CTAs. Bright sky and warm photographic light contrast with quiet dark content sections. Layout and font hierarchy take precedence over extra decoration.

## Stage 3: visual identity and assets

Reuse the four supplied comps as the already-approved individual section designs. Generate clean photographic assets from the hero and contact references through the built-in imagegen tool. Keep all final assets in public/images. A monogram, sunset photography, ivory serif headings and blue line icons form the identity. Do not invent a new brand moodboard.

Content provenance: reference project names and stacks are design concepts until verified. Do not present sample employment dates as actual history. Keep unconfirmed links and resume state explicit. No fabricated achievements, live deployments or client work.

## Stage 4: motion choreography

Hero: 0.11s text stagger, 0.9s power3.out masked rise; capped background parallax. Header: compact translucent surface after scrolling. Projects: stagger, 6px lift, slow image zoom, sibling dimming, and interruptible magnetism on primary CTAs. About: horizontal image mask reveal. Process: progressive connecting line and step activation. Journey: line growth and sequential milestones. Contact: parallax and staggered links.

Global timing: 180ms feedback, 400ms interface transition, 900ms editorial reveal. No bounce, neon, scroll locking between sections or endless floating. Preserve the normal cursor. Pointer enhancements only under hover:hover and pointer:fine. Reduced motion removes parallax, mask travel, stagger, smoothing and magnetic motion, with content fully visible. A visitor-facing motion toggle provides an additional override. Cleanup every observer, event handler, animation and ticker subscription.

## Stage 5: implementation

Data owns portfolio copy; section components own semantic structure; a single motion hook owns scroll effects and lifecycle. Native HTML/CSS renders the small concept interfaces. Project details include concept status and meaningful descriptions, not nonfunctional live-demo buttons. Contact interactions never report a message as sent.

## Stage 6: verification

Build and strict typecheck. Inspect desktop and 390px/320px mobile layouts in the browser, navigation, project details, Escape and focus return, contact interactions, motion toggle, reduced motion, and runtime errors. Review image readability, spacing and overflow against reference comps. Record proof and limitations in README.md. Local Git checkpoints before implementation and after verified delivery.

## Harness boundary

Sauron v1.2.0 `init --dry-run` executed in v6. It proposes 23 runtime adapter files. The installed design skills are read directly; global configuration and unrelated runtime adapters are not needed for this implementation.
