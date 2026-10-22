# Implementation Blueprint: Portfolio motion refinement

Date: October 22, 2026.
Status: The user approves implementation with "implement". Local implementation and verification complete. See motion-implementation-checkpoint-2026-10-22.md for results.

## Objective and scope

Add purposeful animation and effects to the portfolio the user already likes. Preserve all current content, images, typography, colors, layout, section order, links, controls, project routes, and responsive composition. Treat the current implementation and DESIGN.md as authority. Do not apply older audit copy or redesign recommendations.

No production files change during this planning phase. Implementation stays local; publication is outside this request.

## Context and skills

Read the project architecture blueprint, current task tracker, portrait checkpoint, visual tokens, DESIGN.md, AGENTS.md, and anti-pattern catalog. The architecture blueprint links to the latest factual requirements rather than a separate product-requirements.md. The current user request freezes all those facts and visible content.

- Sauron engineering-loop and blueprint-session establish the plan before execution and approval gate.
- Designer routes to emil-design-eng and find-animation-opportunities for motion purpose, frequency, exact recipes, interruption, and restrained timing.
- Taste routes to design-taste-frontend for preserving the established visual language.
- Impeccable routes to its animate reference. Its context launcher runs once against src/App.tsx and permits narrow refinement using the incumbent implementation. No product interview or new visual world is needed.
- Project UI/UX principles supply keyboard, motion preference, and responsive constraints.
- UI/UX Pro Max is not found in the searched global Agent/Codex skill directories. Do not claim it is used.
- shadcn is already configured in components.json. Toolkit uses the existing local shadcn/Radix Tabs. Keep these primitives.

Design read: A developer portfolio for recruiters and technical reviewers, with a photographic, neutral editorial language. Give the existing introduction an authored entrance and keep subsequent interactions quick and readable.

Taste settings: DESIGN_VARIANCE=6, MOTION_INTENSITY=4, VISUAL_DENSITY=4. These are planning choices, not measured scores. Variance and density follow the incumbent; the motion budget concentrates on the hero.

## Terms

- Content freeze: Exact strings, facts, counts, images, destinations, and accessible labels remain authoritative.
- Focal sequence: One brief introduction connecting the existing two-line name, copy, project action, and formal portrait.
- Supporting transition: A short bridge for an existing state change or grouped contact details.
- Settled state: The current site's normal layout, with every temporary transform, mask, and opacity effect removed.
- Motion preference: Both system reduced motion and the site's saved pause setting govern every new effect. Retain this site's current static behavior when either applies.

## Findings and proposed effects

Use the existing --ease, cubic-bezier(0.23, 1, 0.32, 1), for arrivals. Existing section entrances retain their 360ms duration and cubic-bezier(.2,.8,.2,1). Avoid adding a second easing vocabulary.

| Priority and location                                  | Before                                                                                                                               | After                                                                                                                                                                                                                                                                                                                                                                              | Purpose and frequency                                            |
| ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| 1. Hero, src/App.tsx and src/portfolioMotion.ts        | Name, copy, action, and portrait have no entrance animation. Current browser captures show zero hero animations.                     | A restrained editorial name reveal uses existing name-line spans, 12px vertical travel, opacity 0.65 to 1, and a temporary line mask over 520ms with 50ms between name lines. Supporting copy settles over 360ms, with offsets capped at 160ms. Portrait uses opacity 0.8 to 1 and translateY(10px) to zero over 560ms, beginning at 80ms. All use --ease and finish within 700ms. | First-arrival delight and hierarchy; once per mounted home page. |
| 2. Toolkit, src/components/Toolkit.tsx and Toolkit.css | Pointer category changes replace the panel immediately. Existing shadcn/Radix tabs already provide semantics and keyboard operation. | Pointer-triggered panel entry uses opacity 0.75 to 1 and translateY(4px) to zero over 180ms with --ease. No sibling stagger on tab changes. Keyboard filtering remains immediate.                                                                                                                                                                                                  | Continuity for an occasional content change.                     |
| 3. Quick preview, src/App.tsx and shared styles        | The existing native dialog appears immediately.                                                                                      | Entry uses opacity 0.7 to 1 and scale(0.985) to 1 over 200ms with --ease, centered on the dialog. Fade the existing backdrop opacity over 160ms. Keep the current backdrop appearance, focus timing, close behavior, Escape, and return focus. Keyboard opening remains immediate. Dismissal is immediate.                                                                         | Spatial continuity for occasional pointer/touch previews.        |
| 4. Contact links, src/portfolioMotion.ts               | The contact group carries data-stagger, but startMotion only consumes data-reveal.                                                   | Reveal the existing contact blocks as a group on first viewport entry, opacity 0.65 to 1 and translateY(8px) to zero over 280ms with --ease. Use 45ms offsets, capped at 135ms for the entire group. Keep controls immediately usable.                                                                                                                                             | Group hierarchy once on arrival at the contact section.          |

The hero is the only pronounced sequence. Keep the existing project-card hover, buttons, arrow movement, dot field, About portrait crossfade, bulb interaction, and section reveals. There is no need to layer an additional animation onto those interactions.

## Responsive and rendering decisions

1. Preserve React 19, TypeScript, Vite, build-time prerendering, and existing shadcn/Radix components. Use CSS and the Web Animations API; add no dependency.
2. Keep default server-rendered content visible and readable. Do not put opacity-zero or clipped states in baseline HTML/CSS. Start effects only after preferences allow enhancement. Skip the entrance when initialization is late enough to visibly replay content the visitor has already read.
3. Reveal complete name lines without splitting characters, duplicating text, introducing a typewriter, or changing accessible names. Verify the italic surname's descenders and both line edges remain intact. Reserve sufficient mask bleed; remove the mask after completion. If masking cannot preserve the current glyph bounds, use an opacity/translate reveal instead.
4. Animate the existing hero portrait as a whole. Keep image dimensions, crop, grading, fetch priority, arch, and final position. Do not animate its geometry or add a halo. On mobile, initialize its entrance on first viewport entry instead of running the entire effect below the fold. Do not wait for image decoding to show hero text or controls.
5. Track played entrances per mounted scope so opening/closing a preview, pausing/resuming, or reinitializing observers does not replay the hero or previously visited groups. Persist this state across startMotion cleanup/restart for the same root.
6. Preserve native keyboard focus and immediate activation. No animation delays navigation, tab selection, dialog focus, Escape, or links. Pointer-only hover effects remain behind hover: hover and pointer: fine.
7. Cancel in-flight animations and settle to the current layout on pause, reduced-motion changes, teardown, or an interruption that invalidates the target. Remove temporary styles on completion/cancellation. Stop decorative work when the document is hidden; completed entrances stay completed when visibility returns.
8. Keep observers bounded and disconnect them on teardown. Avoid render-state updates per frame, perpetual requestAnimationFrame loops, permanent will-change, and animating layout-driving properties.

## Rejected candidates

- Perpetual portrait float, status-dot pulsing, bouncing scroll arrow, and shimmer loops fail the frequency/purpose gate. The hero only needs one authored entrance.
- Another cursor trail or spotlight duplicates the existing pointer-responsive dot field and adds runtime work without clarifying an interaction.
- Project-card tilt or extra lift duplicates established hover behavior and competes with genuine project screenshots.
- Scroll parallax, pinned sections, or scroll interception move content while it is being read and change the existing reading experience.
- Typewriter text, letter scrambling, animated counters, and new decorative labels conflict with the frozen content and the typography's editorial role.
- New shadcn components or Motion/GSAP dependencies add no capability required by these bounded effects.

## Implementation order

1. Record the approved scope. Capture a content/structure baseline and current layout bounds, with existing motion disabled, before production edits.
2. Add focused browser acceptance checks that fail for missing hero/contact effects and document those failures. Reuse the existing Playwright installation; no new test framework.
3. Extend portfolioMotion.ts for the hero sequence, first-entry mobile portrait, and contact stagger. Retain the hook's preference-gated loading. Preserve once-played state across cleanup and handle cancellation.
4. Add scoped toolkit and quick-preview transitions using their existing primitives. Keep keyboard operation immediate and rapid pointer changes interruptible.
5. Run the focused checks and existing regression checks. Inspect the desktop/mobile motion and settled frames in one batched browser pass, fix actual findings together, then confirm once if needed.
6. Update the design-token/component records with implemented motion values, run the Sauron code-inspection stage, and save a checkpoint. Report what actually runs and what is verified.

Expected production ownership: src/portfolioMotion.ts, src/useNativeMotion.ts only if lifecycle support requires it, animation hooks/attributes in src/App.tsx, scoped additions to existing shared styles, src/components/Toolkit.tsx, and src/components/Toolkit.css. Keep changes out of src/data/portfolio.json, images, documents, project case-study content, dependency manifests, and deployment configuration.

## Acceptance and verification

- All visible text, content JSON bytes, link destinations, image sources, accessible names, section order, three projects, toolkit inventory, and resume bytes match the pre-edit baseline.
- With motion paused or settled, key element bounds and layout match the baseline at 1440px, 390px, and 320px, in both themes. No horizontal overflow or clipped letters.
- Hero sequence runs once; mobile portrait runs at viewport entry; contact stagger completes with capped delay. Modal dismissal and pause/resume do not restart completed entrances.
- Pointer toolkit changes and preview opening animate without waiting to accept interaction. Rapid switching, Escape during entry, focus return, theme change during animation, document visibility, and preference changes settle correctly without stranded effects.
- Saved pause and system reduced motion suppress new motion on initial loads and during a running animation. Meaningful feedback remains visible immediately.
- JavaScript-disabled/prerendered output keeps all normal content readable. No page/hydration errors. Hero enhancement does not deliberately postpone image fetch, text, or the project action.
- Run npm.cmd run build, npm.cmd run typecheck, npm.cmd run verify:content, npm.cmd run verify:browser, npm.cmd run verify:bulb, and npm.cmd run format:check. Run the new focused motion runner against the fresh build. Existing broader checks are reused rather than duplicated.
- Run Impeccable's mechanical detector once on the changed UI after implementation. Treat unrelated findings as outside this frozen-design scope.

## Planning evidence and handoff

Fresh Playwright captures of the current local source use Vite at http://127.0.0.1:5176. Evidence: artifacts/motion-plan-2026-10-22/baseline.json plus desktop/mobile hero screenshots in both themes, and desktop toolkit/contact captures. Baseline reports no horizontal overflow in the four captures and zero hero animations after initial rendering. Desktop dark and mobile light hero captures receive visual inspection. These are baseline observations, not verification of proposed motion.

Verdict: The current design needs a deliberate introduction and three quiet supporting transitions. The hero delivers the largest improvement. Approval of this blueprint authorizes its local implementation and checks; publication remains a separate action.
