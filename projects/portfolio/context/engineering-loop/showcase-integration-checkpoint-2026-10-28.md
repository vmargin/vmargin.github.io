# Project showcase integration checkpoint

## Completed work

- Integrate all three finished user-created films into `public/videos/` and record their metadata in `src/data/portfolio.json`.
- Add Watch showcase actions with measured durations to home project images. Use a native dialog with playback controls, keyboard focus containment and restoration, Escape and backdrop dismissal, and video cleanup.
- Place a full-width player after each case-study introduction and before its screenshot gallery. Use a real film frame as a lightweight 1280x720 WebP poster. No video element or MP4 request exists before an explicit watch action.
- Preserve the original edited picture and audio through FFmpeg stream copy, enable fast start, remove container metadata, and retain H.264/AAC at 1920x1080. Each file remains below 10 MB; poster files are approximately 29 to 40 KB.
- Provide workflow descriptions, inline mobile playback, native volume/seeking/fullscreen controls, buffering status, retry, and a direct video link on media failure.
- Extend Zod content validation and build-time asset checks. Add `scripts/showcase-contract.test.mjs`, `scripts/verify-showcases.mjs`, and `npm run verify:showcases`. Update README, DESIGN, token records, and component registry.

## Source films

| Project | Original source | Duration |
| --- | --- | --- |
| ERL AssetHub | `C:/Users/margi/Desktop/lockedIn/multi-tenant-asset-manager/video/assethub-promo/out/assethub-showcase-1080p.mp4` | 43.2 seconds |
| ARCTIC | `C:/Users/margi/Documents/ChatGPT/Aircon Service Management - remake/video/arctic-showcase/out/arctic-showcase.mp4` | 36 seconds |
| CASH-G | `C:/Users/margi/Desktop/lockedIn/banking-app-v2/video/cashg-showcase/out/cashg-showcase.mp4` | 40.811 seconds |

Sources are the completed films with music, rather than raw footage or effects-only alternates. Original project storyboards and audio provenance documents inform the supplied workflow descriptions. No source application or video project is edited.

## Verification

- Six showcase contract checks fail before implementation and pass after integration. The 12 existing content checks also pass.
- Final production build and TypeScript checks pass; all four routes prerender successfully. Formatting passes for the changed application, script, README, and DESIGN files. The repository-wide formatting command flags five untouched files: `src/portfolio-updates.css`, `docs/implementation-handoff.md`, `docs/implementation-inputs.md`, `docs/portfolio-content-aesthetics-audit-2026-10-21.md`, and `docs/portfolio-update-prompt-review-2026-10-21.md`.
- Nine showcase browser groups pass: no eager MP4 downloads or nested interactive controls; all three real videos play with verified dimensions and durations in dialogs and case studies; focus containment, Escape, close buttons, trigger restoration and playback cleanup; four widths in both themes; failure recovery with successful retry.
- Inspect the desktop card, mobile dialog, and decoded case-study poster visually. Screenshots and results live under `artifacts/portfolio-showcases-2026-10-28/`.
- The broader browser suite passes 44 of 45 checks. Its resume assertion expects SHA-256 `bade4049a4b7be0f0272659151f20f3c769f44cf90a010d6f74edb86a3f4361d`; the existing PDF has `d4b0ed03c43af3020d580e55a18222c28e519a6e914bc796245599ba76dc503b`. The current file and Git HEAD blob share the latter hash, confirming this mismatch predates the video integration. Preserve the supplied resume and unrelated assertion.

## Locked decisions and next action

Use project-specific placement so each film appears alongside its context. Preserve existing screenshots, case studies, demo links and quick previews. Reuse the portfolio's theme, typography, dimensions and native controls.

The user now explicitly requests a commit followed by GitHub Pages publication. The Pages production build passes, including all four prerendered routes and the canonical URL preparation for `https://vmargin.github.io/`. Commit only the showcase integration, push to the existing main branch, and verify the existing Publish Valk workflow and live video playback. Preserve unrelated existing changes in the task tracker, motion checkpoint, `.codex/`, `.impeccable/`, and temporary folders.

## Verified GitHub Pages publication

- Commit `862ceace85593018a154232d9cbf1bd412b35692` contains the showcase integration. Push it to `origin/main` before deployment. The existing [Publish Valk run 40580945042](https://github.com/vmargin/vmargin.github.io/actions/runs/40580945042) completes successfully for this exact commit.
- The updated portfolio is live at `https://vmargin.github.io/`. Home and all three case-study routes return HTTP 200 with correct GitHub Pages canonical URLs and showcase markup. Every poster returns HTTP 200. Every MP4 supports HTTP 206 byte ranges and the sampled bytes match its committed local file.
- Live browser checks confirm all three videos play in dialogs and case studies, native keyboard/focus/close behavior works, no MP4 downloads before the watch action, and both themes fit 320, 390, 768 and 1440px widths. The initial public run passes seven of nine groups; AssetHub's case-study start and the injected media-error check hit timing limits. Separate focused rechecks pass: AssetHub plays within three seconds with no page/request errors, and recovery shows the expected retry/direct-open actions and resumes playback after retry when navigation waits for initial loading to settle.
- Deployment, live assets, browser results, screenshots, and the two focused rechecks are saved under `artifacts/portfolio-showcases-2026-10-28/published/`. Record these receipts in a documentation-only follow-up with CI skipped; no application rebuild is required.

The requested commit and publication are complete. Preserve the unrelated existing workspace changes. Future work starts from user feedback.
