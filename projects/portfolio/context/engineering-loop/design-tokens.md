# Implemented visual tokens

October 21, 2026, latest user update. Extracted from the implemented components and styles; these neutral values supersede the first implementation's blue palette.

| Role                      | Dark      | Light     |
| ------------------------- | --------- | --------- |
| Page                      | `#09090b` | `#fafafa` |
| Primary text              | `#fafafa` | `#18181b` |
| Secondary text            | `#c7c7ce` | `#3f3f46` |
| Supporting text           | `#b4b4bd` | `#52525b` |
| Accent                    | `#e4e4e7` | `#3f3f46` |
| Primary action background | `#f4f4f5` | `#18181b` |
| Primary action text       | `#18181b` | `#fafafa` |

Contact surfaces use solid `#20252B` beside the full landscape on desktop and beneath it on mobile, `#fafafa` text, and `#e4e4e7` secondary text in both themes. The photo panel uses `#141416`; its image has an 8px radius. Feedback backing is `#09090bf2`. Hover raises text to white; focus uses a visible light neutral outline. Success and failure messages share the readable contact text role. The image itself is not covered or recolored.

The About bulb control is 44x44px, inset 16px, with 22px artwork, transparent background, no border, and a pointer cursor. Black portrait/light mode uses white artwork; white portrait/dark mode uses black artwork. The keyboard focus ring uses the foreground color (`#fafafa` or `#09090b`) at 2px with a 2px offset and 6px corner radius. Hover and keyboard focus apply `rotate(45deg) scale(1.1)` with a 250ms transform transition using the shared easing. Pause/reduced motion removes the transition. The small Switch appearance tooltip uses 12px text, 6px/9px padding, 6px radius, an 8px gap, `#09090bf2` background, and `#fafafa` text. Tooltip hover remains available, Escape dismisses it, and keyboard focus keeps it visible through automatic scrolling. The transparent bulb source is filtered to white or black. Portrait grading and the crossfade are described below.

Typography: Cormorant Garamond display; Manrope body. Body 16px, meaningful metadata/actions 14px, incidental labels 12px. Headings use responsive display scales. Reading copy stays within approximately 65 characters.

October 22, 2026 update: the About portraits use the grading and motion below. Black portrait/light theme uses a `#20252B` backdrop, lifted sweater shadows, and slightly softened orange rim lighting. White portrait/dark theme uses a `#D8D0C4` backdrop and softened neutral sweater highlights. The original source portraits remain intact. The white image fades over the opaque black image with `opacity 350ms ease-in-out`; bulb and focus colors switch at 175ms to retain contrast. Paused motion and system reduced motion remove these transitions. Inactive image descriptions are hidden from assistive technology. All education/training dates inherit the Manrope body font and share the 14px metadata style.

Component radii: shared 18px, toolkit cards 16px on desktop, native image dialog 16px, image mats 6px. Spacing: 12/16/18/20/24/28/32/48/56px. Responsive page gutters range from 20px to 60px. Native section entrance duration is 360ms with `cubic-bezier(.2,.8,.2,1)`. UI state transitions use the existing 160/200ms durations and are disabled under pause/reduced motion.

## Applicable interaction states

| Control               | Normal/hover/focus                                                                                                        | Selected or active                                            | Disabled/loading                                                                        |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| Card demo and preview | Raised/page surfaces, hover surface change, visible neutral focus outline; 14px text and 48px minimum row                 | Native link activation or preview dialog                      | Links remain available with access notes; navigation loading belongs to the browser     |
| Theme buttons         | Neutral inactive foreground; visible focus/hover                                                                          | Inverted selected surface with aria-pressed                   | No asynchronous content state                                                           |
| Portrait bulb         | Bare 22px rays in 44px target; hover/focus rotate and scale over 250ms; tooltip and 2px focus outline; native Enter/Space | Shared dark-mode aria-pressed; paired portrait and bulb color | Motion transition disabled when paused/reduced; reserved 4:5 frame; no disabled control |
| Motion control        | Shared readable metadata/action role                                                                                      | Paused state persists and exposes aria-pressed                | Disabled under system reduced motion                                                    |
| Toolkit tabs          | Muted foreground, hover feedback, Radix focus ring                                                                        | Raised selected surface and aria-selected                     | Static data; no artificial loading state                                                |
| Gallery               | Authentic image mat, hover border, focus outline                                                                          | Native modal, original-size/fit action                        | Browser image loading reserves intrinsic dimensions; no disabled viewer action          |
| Clipboard             | Neutral contact text and focus outline                                                                                    | Explicit copied or actionable failure status                  | Actual clipboard promise; no persistent loading placeholder                             |

Latest card refinement: all three education/training cards use the Java card's 24px padding (20px at the smallest breakpoint), shared date/title/provider/detail type styles, and five corresponding subgrid rows. Education retains its degree metadata, description and four coursework items. Dates align at the top when they wrap. The warm muted portrait backdrop is #D8D0C4; skin tones remain natural and the section stays unchanged.

## Motion refinement: October 22, 2026

All existing colors, type, spacing, radii, assets, and settled positions remain unchanged. The native Web Animations API uses the existing `--ease: cubic-bezier(0.23, 1, 0.32, 1)` for the new effects. No new dependency or CSS override is needed.

| Surface                 | Implemented motion values                                                                                                                                                                                                                      |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Hero name lines         | 520ms each, 50ms line offset, opacity 0.65 to 1, translateY 12px to zero. Temporary clip insets move from `-35% -15% 18% -15%` to `-35% -15% -35% -15%`, preserving serif overhang and descenders. The effect releases its mask on completion. |
| Hero supporting content | 360ms, opacity 0.7 to 1, translateY 6px to zero. Sibling offsets use 40ms steps capped at 160ms.                                                                                                                                               |
| Hero portrait           | 560ms, opacity 0.8 to 1, translateY 10px to zero. Visible desktop entry starts at 80ms; an offscreen mobile portrait starts at first viewport entry.                                                                                           |
| Toolkit category panel  | 180ms, opacity 0.75 to 1, translateY 4px to zero; pointer/touch selection only. Keyboard selection remains immediate.                                                                                                                          |
| Quick preview           | 200ms, opacity 0.7 to 1, scale 0.985 to 1. Existing backdrop opacity enters over 160ms. Keyboard opening and every dismissal remain immediate.                                                                                                 |
| Contact blocks          | 280ms, opacity 0.65 to 1, translateY 8px to zero, 45ms sibling offsets capped at 135ms.                                                                                                                                                        |

Every effect releases temporary styles after completion and cancels on saved pause, system reduced motion, document hiding, or teardown. Played hero/scroll entrances do not restart when a preview closes or motion resumes. Hero enhancement skips already-read content when initialization arrives more than 900ms after first contentful paint; default content stays visible throughout. Existing 360ms section entrances retain their previous easing and now preserve played state across observer restarts.
