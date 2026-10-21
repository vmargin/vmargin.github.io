# Portfolio implementation standards

Latest exact-copy exception: preserve the user's supplied headline, description, and About paragraphs verbatim, including their em dash punctuation. The latest user request supersedes generic punctuation, palette, SIL-display, location, and resume-label rules from earlier context.

- Keep profile/project facts in validated JSON; use confirmed inputs and supplied assets.
- Preserve static React/Vite routes. Prerender the same components used by hydration.
- Keep browser APIs out of render-time server paths. Keep preferences shared and UI state local.
- Use strict TypeScript with checked indexed access and native semantic controls/dialogs.
- Run meaningful failing acceptance/contract checks before production changes, then verify the completed behavior with Playwright. This session explicitly requests verification; there is no invented `npm test` command.
- Do not infer source-project test execution, production adoption, client delivery, or live-host headers from local checks.
- Preserve unrelated/untracked/ignored inputs and keep work local. Never store real credentials in checkpoints.
