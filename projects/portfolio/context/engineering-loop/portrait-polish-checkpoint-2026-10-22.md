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

## Next action

- Commit the relevant portfolio files before publishing.
- Change the currently public `vmargin/vmargin.github.io` repository to private before pushing updated source. Never restore public visibility to enable Pages. Verify whether this plan supports private-repository Pages and report the returned limitation if it does not.
- Use the installed Sites plugin to update the existing public portfolio at https://vm.marginvalkenburgh.chatgpt.site/. Preserve its project ID and public audience.
