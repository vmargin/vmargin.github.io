# Hero photo pair provenance and fit

## Current application pair

The October 2, 2026 photos supplied by the user are the selected hero artwork. Both are complete, opaque 1672 × 941 PNGs with the person embedded in the scene. The light source was already byte-identical to the file in `public/images`; the dark source replaced the October 1 generated candidate at the same filename. Neither source photo was edited, regenerated, filtered, or resized.

| Theme           | Supplied source                                                          | Application asset                        | SHA-256                                                            |
| --------------- | ------------------------------------------------------------------------ | ---------------------------------------- | ------------------------------------------------------------------ |
| Dark / sunset   | `C:/Users/margi/Desktop/BRIT/ChatGPT Image Oct 2, 2026, 03_07_47 PM.png` | `public/images/hero-full-sunset-v2.png`  | `4FB63B34EDA51CE87D50688C92B2DEDC6B8A6D569FF76130F4596CE5E454EF5E` |
| Light / sunrise | `C:/Users/margi/Desktop/BRIT/ChatGPT Image Oct 2, 2026, 03_07_33 PM.png` | `public/images/hero-full-sunrise-v2.png` | `41DBBC8119F7EF0BD74F39A5D72C33F8F2CDA4E09F0258B78C64135799F91FEF` |

The figure shares the same pose and position across the pair. Its lighting is part of each photo, so the figure's brightness and skin tones differ between themes. Keeping the supplied photos untouched preserves their detail and framing.

## Reference and responsive fit

The video reference is `D:/Games/VALO CLIPS/Outplayed/Screen recorder/Screen recorder_10-01-2026_12-26-13-106/Screen recorder_10-01-2026_12-26-45-572.mp4`. The comparison frames remain in `reference/`; the captured hero is about 994 × 389 within the 1280 × 720 video frame. At a 1280 × 720 browser viewport, the portfolio hero is 1280 × 504, an almost identical aspect ratio. Both source photos fill the same `object-fit: cover` box at the same position. The crop displays approximately source rows 131–790, keeping the head near the video's y≈225 placement and clipping the feet below the hero edge.

At tablet width, the photos use a 60% horizontal crop. On phones, they use 52% to preserve the face at the right of the copy; the paragraph narrows with the viewport to keep its last line clear of the embedded figure. Playwright at 768px, 390px, and 320px confirmed that the photos load and the page has no horizontal overflow.

Only the two complete photographs are in the hero. The theme transition remains a 0.75-second opacity crossfade; desktop parallax moves both photos together. No overlay, CSS filter, independent portrait, or extra image layer changes the supplied artwork. Reduced-motion handling remains active.

## Six-stage design-engineering record

1. **Foundations:** Retain the existing React/Vite portfolio structure, hero content, section order, and responsive/accessibility requirements.
2. **Aesthetic:** Match the video’s cool bright dawn and deep navy/coral dusk using the supplied pair as the visual authority.
3. **Identity:** Lock the October 2 photos as final artwork; do not generate or alter either image.
4. **Motion:** Keep the existing crossfade and parallax, with both photo layers sharing one motion target and respecting reduced motion.
5. **Implementation:** Use two decorative image elements with one shared crop; remove the separate portrait and photo shade.
6. **Audit:** Compare both themes in Playwright at desktop and phone sizes, check image geometry, controls, reduced-motion behavior, runtime output, and overflow.

## Earlier October 1 image-generation trial

This folder began as an image-generation experiment. Its prompts and comparison assets document that earlier work only; they do not describe the current application files. `prompts.json` preserves the old prompts and marks their selected files as historical. In `measurements.json`, `currentApplicationPair` contains the October 2 source hashes and current browser measurements; properties prefixed `october1` retain the old color and person-patch results. The October 1 portrait-alignment image and color samples must not be read as measurements of the new pair.
