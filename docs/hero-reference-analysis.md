# Hero reference analysis

Source: the supplied screen recording, sampled near 1 s (sunrise) and 4 s (sunset), and its 1280 × 720 comparison frames. This records the visual target for the October 1 refinement; the portfolio copy remains based on the supplied résumé.

| Feature   | Video reference                                                                                                                  | Previous v6 render                                                   | Direction                                                                                                         |
| --------- | -------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| Hero edge | About y=500 in both modes                                                                                                        | y=504                                                                | Keep the existing hero height.                                                                                    |
| Person    | Head about x=775–839, top y=225; body about 75–82 px wide; shoes cropped at hero edge                                            | Head near x=782–820, top y=228; body about 59 px wide; shoes visible | Scale the one transparent portrait around the head to about 70vw at 1280px, and let the hero clip its lower legs. |
| Dark sky  | Near-black navy/indigo above a red/coral sunset; sampled top-left sky `#08121f`, upper-right sky `#161a2e`, coral band `#93453e` | Brown/gray clouds, turquoise patch and olive-gold horizon            | Replace the sunset plate with a deeper dusk edit, keeping the park scene and foreground portrait separate.        |
| Light sky | Powder-blue upper sky with cream cloud edges and a pale peach-yellow horizon; sampled sky `#aec7e2` and `#b4d1ed`                | Orange-gold across most of the sky                                   | Replace the sunrise plate with a cooler dawn edit.                                                                |

The reference plates and previous generated plates have different cloud shapes, so a CSS color filter alone cannot make them pixel-identical. Preserve one portrait asset above the background shade, with the same crop and exposure in both themes; only the background plates crossfade.

## Result

The final hero keeps the same 504px desktop boundary. At a 1280px viewport the portrait image is 896px wide, and its alpha bounds place the head near y=225 and the body around x=754–834. The shoes fall below the clipped hero. The portrait source, geometry, and `brightness(0.9)` remain identical when switching themes. The sunrise and sunset plates are separate edits of the Antipolo scene; the light-mode ground receives a warm shade, while the top-left sky stays cool blue.

Representative 11×11 median samples from the reference and final Playwright screenshots, using the same normalized viewport location:

| Mode and location                | Reference | Final render |
| -------------------------------- | --------- | ------------ |
| Dark upper-left sky (300, 80)    | `#08121f` | `#081120`    |
| Dark upper-middle sky (650, 80)  | `#2e3c5b` | `#263758`    |
| Dark coral band (1000, 250)      | `#93453e` | `#983e2c`    |
| Light upper-left sky (300, 80)   | `#aec7e2` | `#b1c7df`    |
| Light upper-middle sky (650, 80) | `#b4d1ed` | `#a9caec`    |
| Light grass (500, 460)           | `#927c40` | `#91834a`    |

The source screenshot contains UI and a different cloud arrangement, so the resulting clean photographic plates still differ in cloud edges, sun glow, and some distant park visitors. The important mode contrast, subject identity/crop, and light/dark placement now follow the video without baking its UI into the site.
