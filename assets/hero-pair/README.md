# Full sunrise/sunset photo pair

Created October 1, 2026, with built-in image_gen. This is an image-only trial in portfolio v6; the site still uses its existing backgrounds and shared portrait.

## Selected files

- `../../public/images/hero-full-sunrise-v2.png`
- `../../public/images/hero-full-sunset-v2.png`

Both opaque PNGs are native **1672 × 941** pixels and contain the foreground person. They were not upscaled. The tool returned this size despite the initial 3840 × 2160 prompt. The dark photograph was edited from the selected complete light scene.

## Reference and crop

The supplied original 4032 × 3024 photograph was the identity/detail reference. The video is the background target, sampled at 1 s and 4 s. Saved frames are in `reference/`; their hero crop is approximately x=143, y=64, width=994, height=389. The supplied screenshots show the corresponding 1672 × 654 hero.

Playwright confirmed a 1280 × 504 desktop hero with a 1280 × 564.48 background element at y=-30.24, cover fit and 68% 45% object position. The displayed source slice is approximately y=131–790. The person's head begins near native y=428, displaying at y≈227; center is near 62–63% of width. Shoes stay beyond the visible crop.

## Verification and limits

Both PNGs decoded and loaded in Playwright with equal dimensions. `reference/pair-comparison.png` compares the actual desktop crop with the video. `reference/portrait-alignment.png` shows the person at 200% and in a 50% blend: pose and silhouette align without a conspicuous doubled outline at desktop size.

Light follows pale blue/cream morning colors; dark follows navy/indigo and coral/orange sunset with city lights. No green upper-sky cast was observed.

**This is a matched concept pair, not an exact reference copy or a pixel-identical person.** Dark skin remains slightly dimmer. Selected native interior-patch mean RGB differences are 3.8 for hair, 17.2 for face, 3.3 for shirt, 11.9 for arm and 2.6 for trousers on a 0–255 scale. These patches measure exposure/detail consistency, not identity. Hair, face, necklace and clothing details are generated rather than untouched pixels from the original.

Cloud shapes, sun placement, benches and hedge height differ from the reference. Grass microtexture remains visibly synthetic at full resolution. `measurements.json` records comparison data; samples landing on different scene objects cannot establish a literal color match.

The final exposure-only attempt over-brightened skin and returned 1671 × 941. It was rejected; the earlier equal-sized pair with better alignment was retained.

## Later integration

Application source, existing artwork and resume PDF were untouched. Later integration requires replacing the three-image hero with two photographs. Mobile currently positions the portrait independently, so the future image crop rules require responsive adjustment and testing. This generation trial does not verify that future implementation.

`prompts.json` records all prompts and selected paths. Source candidates remain in the tool's generated-images folder. Only the selected pair was added as new public hero assets. Reverting this asset-only commit preserves the previous hero implementation.
