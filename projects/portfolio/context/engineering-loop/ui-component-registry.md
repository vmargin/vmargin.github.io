# Portfolio component registry

October 21, 2026.

Latest user update: all active component surfaces use the neutral palette in `design-tokens.md`. Navigation says Resume; the hero has one project action; the SIL card is removed. The About bulb synchronizes both supplied portraits with the shared theme: black portrait/white bulb in light mode, white portrait/black bulb in dark mode. The lower landscape retains full 4:3 proportions within a centered 1350px maximum; photo and contact panels split from 1024px and stack below it. Project cards use the AssetHub/ARCTIC/CASH-G order and separate Try Demo/Quick preview actions, with access notes and capture labels. ARCTIC decision links target the matching gallery figures.

| Component             | Source                                      | Visual and interaction contract                                                                                                                                                                            |
| --------------------- | ------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Portrait hero         | `src/App.tsx`, `src/portfolio-updates.css`  | Shared page palette, serif identity, 14px actions, transparent portrait, responsive stacking                                                                                                               |
| About portrait        | `src/components/AboutPortrait.tsx`          | Two supplied 4:5 portraits, 18px frame, bare 22px rays in a transparent 44px native toggle at 16px top/left, 250ms hover/focus rotation and scale, accessible tooltip, pressed state and 2px focus outline |
| Theme/motion controls | `src/components/SitePreferences.tsx`        | Shared theme tokens, 44px targets, persisted choices on every route                                                                                                                                        |
| Ambient dots          | `src/components/DotField.tsx`               | Decorative white dot/gradient field, pointer events disabled on canvas, static on pause/reduced motion                                                                                                     |
| Screenshot viewer     | `src/components/ProjectGallery.tsx`         | Native modal, 16px radius, 20px desktop/12px mobile padding, original/fit controls, focus restoration                                                                                                      |
| Quick preview         | `src/App.tsx`                               | Native modal, concise contribution/capture context, visible study action                                                                                                                                   |
| Toolkit               | `src/components/Toolkit.tsx`, `Toolkit.css` | Seven Radix filters, 18 core items initially, complete inventory available, compact mobile rows, 14px item labels                                                                                          |
| Credentials           | `src/App.tsx`                               | Shared card surfaces and 14px metadata; genuine PDF action only for AWS                                                                                                                                    |
| Contact surfaces      | `src/App.tsx`, `src/portfolio-updates.css`  | Desktop 1.1:1 photo/contact panels, full uncropped photo with 8px radius, 12px caption, dark backing in both themes, stacked mobile layout, explicit clipboard feedback                                    |

Token values are recorded in `design-tokens.md`. `styles.css` supplies the established shared foundation; `portfolio-updates.css` supplies the current portrait composition and reading roles. Case-study CSS and its companion stylesheet own the reading pages and gallery viewer.

## Motion contracts: October 22, 2026

`src/portfolioMotion.ts` owns native, bounded effects, and `src/useNativeMotion.ts` owns preference-gated loading and React cleanup. No visible content or base styling changes.

- Portrait hero: Name-line reveal, supporting copy, and the formal portrait form one sequence finishing within 640ms on desktop. The offscreen mobile portrait waits for first viewport entry. Names retain their existing text nodes and accessible heading. Late enhancement skips the entrance. Played state survives preview and pause lifecycle changes.
- Toolkit: The existing shadcn/Radix tabs keep their full keyboard behavior, inventory, expansion control, and labels. Pointer/touch category changes enter over 180ms; keyboard changes cancel the prior panel effect and update immediately. Resuming motion does not replay the current panel.
- Quick preview: The native dialog keeps immediate focus, Escape, close, and return-focus behavior. Pointer/touch opening enters over 200ms, with a 160ms backdrop fade. Keyboard opening remains immediate. Dismissal never waits for animation.
- Contact: The existing `data-stagger` group reveals its existing blocks once, over 280ms with capped 45ms offsets. No new element or text is introduced.
- Shared lifecycle: Pause, system reduced motion, hiding, and teardown cancel effects to the existing settled state. Browser APIs remain inside effects and the dynamically imported motion module. All content remains readable when JavaScript is disabled.
