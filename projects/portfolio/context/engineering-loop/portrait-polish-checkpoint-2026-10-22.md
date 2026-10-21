# Portrait and copy refinement checkpoint

## Completed work

- Grade the two About portraits from retained originals with `scripts/refine-about-portraits.mjs`. Use #F2EFE9 for the white portrait backdrop and #20252B for the black portrait backdrop. Compress sweater highlights, lift dark fabric shadows, and slightly soften orange rim lighting without changing facial geometry or skin tones.
- Use a 350ms crossfade with both image assets mounted in a reserved 4:5 frame. Switch bulb/focus colors at the midpoint. Preserve shared theme preferences, hover/focus tooltip, keyboard activation, motion preferences, and accessible active-image descriptions.
- Apply the requested location and role copy, education description, matching date typography, and #20252B contact panel.
- Verify production build/typecheck, 11 content contracts, and formatting. Three focused checks cover copy/date styles, portrait grading, responsive crossfade, persistence and reduced motion. Four existing portrait/layout checks and five bulb checks pass. The portrait/layout suite covers 1920/1440/1024/768/390/320px and both themes. Inspect portrait, education, and contact screenshots.
- Confirm the resume file matches its existing Git object, `7aeadb27afaad6c54bf2806a17789b680ff0a2df`.

## Scope and evidence

- Keep the pre-existing task-tracker edit and October 21 publication checkpoint outside this commit. Preserve unrelated `.codex/`, `.impeccable/`, and ignored artifacts.
- Evidence lives in ignored `artifacts/portrait-polish-2026-10-22/`. Preserve the initial contrast failure in `layout/`; final checks in `layout-final/` wait for the completed fade before sampling final-state contrast. The implementation also coordinates the bulb color at the fade midpoint.
- Existing original-host publication is documented in the pre-existing October 21 checkpoint. It supersedes the earlier report that this host could not be published.

## Publication and repository status

- Commit relevant portfolio changes as `6bcf8fbc3cc356f9b6f4d3626e55182590f4b2a8` before publication. Confirm GitHub visibility is private before pushing this source commit.
- GitHub returns HTTP 422: "Your current plan does not support GitHub Pages for this repository." The Pages URL returns 404 after the privacy change. Keep the repository private and disable its Pages workflow, which otherwise fails at `actions/configure-pages`. Do not change visibility to restore Pages.
- Publish the existing public Site successfully at https://vm.marginvalkenburgh.chatgpt.site/. Preserve project `appgprj_6abf6890ccec819183be545d4f5e5953`, its public audience, and the original URL. The separate Site source commit is `86f7ed6b429a4b1ccab531c5af51fa6f9350235e`.
- Save version `appgprj_6abf6890ccec819183be545d4f5e5953~appgver_6c5c0d6043fc819195eb5bb56c9773f0`; deployment `appgdep_6ad93ad25e808191819bfe99284f24d4` reports `succeeded`.
- The installed Sites plugin updates from 1.0.1 to 1.1.1 while starting the publisher. The first attempt fails before opening the source or saving a version because its old helper path disappears. Retry once with the current official helper. Use the previously verified source-build fallback for the Windows archive schema issue, with credentials kept in memory and passed through stdin.
- Verify the live homepage and all three project routes return HTTP 200 with correct canonicals, decoded images, and no application errors. Three focused browser checks pass against the public host at 1440/390/320px, covering the requested copy, dates, both themes, crossfade, keyboard activation, persistence, panel color, and reduced motion. Confirm the served portrait images and unchanged resume match the local bytes by SHA-256.
- Store the ignored native deployment receipt under `artifacts/portrait-polish-2026-10-22/publication/artifacts/sites-republish/receipt.json`. Public verification evidence is under `published/` and `published-verification.json` beside the local evidence.

## Next action

- No implementation or publication work remains for this update. Private-repository GitHub Pages remains unavailable under the current plan; the original public Site provides visitor access.
