# October 2 hero photo fit against the video

## Visual target

The screen recording remains the reference for framing and time-of-day contrast. Its page hero occupies approximately x=143–1137 and y=64–453 in a 1280 × 720 recording, or about 994 × 389. At a 1280 × 720 Playwright viewport, the v6 hero measures 1280 × 504, preserving nearly the same 2.54:1 frame. The supplied photographs are 1672 × 941 (1.78:1), so the wide hero necessarily crops vertically.

The recording shows a near-night navy/indigo sky with a coral sunset in dark mode and a cool, bright blue dawn with restrained peach light in the horizon in light mode. The two October 2 photos follow those distinct conditions while keeping the person near the same right-of-center position, looking upward, with feet below the hero boundary. The new pair is brighter and clearer than the video frame in places, which is inherent to the supplied source files and has not been graded with CSS.

## Fitted result

| Check      | Video reference                                  | Playwright render, 1280 × 720                              | Result                                                                            |
| ---------- | ------------------------------------------------ | ---------------------------------------------------------- | --------------------------------------------------------------------------------- |
| Hero frame | About 994 × 389 inside the recording             | 1280 × 504                                                 | Matching wide composition; page layout unchanged                                  |
| Person     | Head near x=775–839, y≈225 in the captured frame | Head around x=790–835, y≈228                               | Near the same position and scale; lower legs/feet stay clipped                    |
| Dark sky   | Deep navy/indigo above the coral sunset          | Supplied dark photo; no shade, filter, or color overlay    | Deep dusk remains, though some clouds are brighter and more orange than the video |
| Light sky  | Bright powder blue with pale warm horizon        | Supplied light photo; no shade, filter, or color overlay   | Cool dawn remains; cloud placement and local warmth differ from the video         |
| Theme swap | Person appears fixed as the environment changes  | Two same-sized complete photos crossfade in one shared box | Same figure pose and placement; the source lighting differs                       |

At desktop, each `<img>` measures 1280 × 564.47 at y=-30.23 with `object-fit: cover` and `object-position: 68% 45%`. The visible source slice is approximately y=131–790, matching the video’s head height and clipping the feet below the 504px hero boundary. Both theme layers report the same box and have no CSS filter. The old cutout portrait and hero shade are absent.

At 768 × 900, the photo uses `object-position: 60% 50%` and the figure stays clear of the wrapped title and body copy. At mobile sizes, it uses `object-position: 52% 50%`; the paragraph narrows to leave the embedded figure's face clear. Playwright checks at 768 × 900, 390 × 844, and 320 × 780 confirmed that the photo is loaded and `document.documentElement.scrollWidth` equals the viewport width. The scene remains intentionally cropped more tightly on phones than in the desktop video reference.

## Design-engineering pipeline decisions

1. **Foundations:** Preserve the current portfolio architecture, copy, page flow, theme control, and accessible/reduced-motion behavior.
2. **Aesthetic:** Use the supplied video to evaluate sunrise/sunset contrast and the two new photos as the final image authority.
3. **Identity:** Keep both user files byte-for-byte. They are complete photos containing the same figure and pose.
4. **Motion:** Crossfade the two full images and move them together for desktop parallax. Reduced-motion preferences continue to suppress movement and transitions.
5. **Implementation:** Replace the two background plates plus separate portrait with two full-photo layers; remove the hero color overlay and retain one responsive crop per breakpoint.
6. **Audit:** Compare dark and light browser renders with the reference, check desktop/mobile composition and overflow, and verify both sources load without filters.

The people are part of the supplied photos, so their lighting is baked in; their pixels are not identical between themes. Making the person pixel-identical would require altering the photos or reintroducing a separate portrait layer, neither of which is part of this integration. Cloud shapes, exact sun glow, and small park details also differ from the recording because the user-supplied photos are now locked as the artwork.

Source frames: `assets/hero-pair/reference/video-light.png` and `assets/hero-pair/reference/video-dark.png`. Exact image hashes and current browser measurements are in `assets/hero-pair/measurements.json`.
