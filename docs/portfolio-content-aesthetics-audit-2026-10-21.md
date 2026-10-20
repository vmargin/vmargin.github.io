# Portfolio content and aesthetics audit

Date: October 21, 2026. Live target: https://vm.marginvalkenburgh.chatgpt.site/. Local surfaces: `src/App.tsx`, `src/ProjectCaseStudy.tsx`, `src/data/portfolio.json` and related styles.

## Confirmed user answers for implementation

The user answers the complete questionnaire. [Confirmed implementation inputs](implementation-inputs.md) now supersede the earlier pending questions and conflicting suggestions. These resolve facts and scope; website edits and verification still remain to be performed.

- Target junior general Software Developer roles, especially full-stack/web. Website name: **Valkenburgh Margin**, common name **Valk**.
- Feature **three projects only**. A fourth is planned for later and is not an implementation dependency.
- ARCTIC is genuine client-origin work based on real company requirements. It did not proceed further with the client, but is complete as a portfolio project. Use that nuance instead of describing the originating company as fictional or claiming adoption. The real branch count is unconfirmed; omit it as a company fact.
- CASH-G desktop and AssetHub original are hand-coded. CASH-G Web v2 uses AI-assisted redesign/development/deployment; AssetHub v2 uses AI-assisted frontend redesign/deployment; v3 uses AI-assisted redesign/development/deployment, with the user researching and choosing features. The user quality-checks missing features, expected outputs and behavior.
- The user confirms Claude, Codex, Opencode, Hermes Agent, Openclaw Agent, Cline, Cursor and Anti Gravity as overall workflow tools. Use the general list and supported version scopes; do not assign every tool to every project or invent other contributors.
- Java Programming NC III training is completed through TESDA and CIICC, July 6 to August 24, with 2026 supported by the supplied resume. Certificate issuance is pending: training text only, without a document CTA or awarded competency claim.
- The supplied genuine **AWS Cloud Quest: Cloud Practitioner Completion Certificate** is inspected and displays **September 5, 2026** and **Valkenburgh Margin**. It is retained at `artifacts/portfolio-prompt-review-2026-10-21/inputs/aws-cloud-quest-completion-original.pdf` for publication during implementation. It is not the AWS exam credential. The earlier live 404 remains an implementation task, not a missing-input blocker.
- Include Spring Valley Supervised Internship Learning (SIL), August 28 to September 15, 2026, associated with AWS Cloud Quest and focused on supervised workplace/cloud-services exposure.
- Use the confirmed fundamentals-training and AI-workflow learning narrative for About; no invented speed metrics are needed.
- Latest user-corrected URLs: `https://erlassethub.vercel.app` (AssetHub), `https://arcticaircon.vercel.app` (ARCTIC), `https://cashg.onrender.com` (CASH-G). Verify actual availability during implementation. Supabase pauses are a user-described dependency, not a verified explanation of earlier errors.
- Use **resume v4 unchanged** until the user provides a later file. Keep existing website contact details and current `vm.marginvalkenburgh.chatgpt.site` hosting. No resume rewrite or migration is requested.

No further questionnaire is required for the supported scope. Preserve dated observations below; do not confuse clarified facts with implemented repairs or freshly passing checks.

## Reviewed additions to planned work

The user's subsequent update prompt is reviewed for compatibility with this audit. Its direction is accepted as planned scope with the safeguards and factual dependencies in [the prompt review and implementation brief](portfolio-update-prompt-review-2026-10-21.md). This records proposed work; it does not mark website changes or existing findings as resolved.

Planned additions: a 1350px maximum centered layout; a restrained white pointer-responsive distorted-dot treatment inspired by the supplied reference; the supplied formal hero portrait and separate About image; Certifications and Resume navigation; genuine credential/training presentation; viewing the supplied resume v4 PDF unchanged through consistent View Resume actions; removal of the two About actions; more specific identity/About copy; three distinct projects; and concise, accurate AI transparency using the confirmed contribution scopes.

The portrait instructions intentionally supersede the earlier recommendation to retain the sunrise hero within that limited scope. Preserve the coherent font pairing, accent palette, project evidence, readable surfaces and working routes. Do not interpret “preserve identity” as forbidding the requested images or as permission to discard the audit's content repairs.

Input inspection confirms both images and resume v4 exist. The hero has real transparency; the About image is opaque with a dark photographic background. Review copies are saved under ignored `artifacts/portfolio-prompt-review-2026-10-21/inputs/`, keeping temporary upload paths out of production.

The original review dependencies are superseded by the confirmed answers above. Remaining limits are safe omissions or implementation checks: omit unconfirmed real-company branch count and per-project tool mappings; show Java training without an unissued certificate; inspect the intended final URLs; preserve light-mode readability and cross-route motion preference; verify actual PDF viewing. Do not restore the deferred fourth-project requirement or re-ask resolved identity/credential questions.

The existing observed audit findings remain open until implemented and checked. The initial heuristic score is not reissued as proof that this planned scope is complete.

## Full click-through update

This report is expanded after the initial review to inspect the complete rendered pages and interactive content, rather than only their opening sections. The full walkthrough adds higher-priority cross-document findings. The earlier heuristic score describes the initial interface review; it is not a grade for the consistency of every subsequently opened document.

### Coverage

Playwright inspects home, CASH-G, ARCTIC and AssetHub at 1440px and 390px, in dark and light themes: 16 page variants. Every page is scrolled to load its images, its complete main text is saved, and every section is captured. The home has six sections and each case study has eight, producing 120 section captures across those variants, plus full-page images.

The main ledger contains 195 action records, including grouped interactions; these are not claimed as 195 distinct controls or a literal total of all mouse clicks. Supplementary coverage records 44 observations for preview endings, backdrop dismissal, keyboard skip links and intercepted email actions. Repeated links to the same external destination are grouped in the external ledger, with their source pages and labels retained.

| Surface | Click-through coverage |
| --- | --- |
| Home navigation | Project-card links, section actions, header/footer navigation, monogram, mobile menu open/close, all four mobile destinations, Escape dismissal and keyboard skip link |
| Quick previews | All three projects in both themes and widths; top and lower content, Close, Escape, backdrop dismissal and full-case-study action |
| Toolkit | All seven tabs, including All; all six filtered content groups in both themes and widths |
| Contact | Copy success, visibly simulated clipboard-unavailable feedback, social destinations and mailto click intent; external email-app launch is prevented and no message is sent |
| Preferences | Both theme buttons on all 16 page variants; motion pause/resume without system reduced-motion override |
| Case studies | Complete introductions, CASH-G version cards, all galleries, architecture, ARCTIC/AssetHub role models, workflow, decisions, selected source, verification, limits, next/back/home/footer paths |
| Gallery images | All nine distinct screenshot links are clicked in four desktop/mobile/theme configurations, producing 36 independently observed downloads; the nine original images are inspected |
| Documents and external evidence | 23 unique HTTP/document destinations are actually clicked, including resume, certificate, coursework, GitHub profile/repositories/files/records, LinkedIn and hosted application entry pages |

The main ledger's 26 initial automation failures require interpretation: eight are attempts to mouse-click keyboard-only skip links before focus, subsequently exercised through Tab and Enter; eighteen are attempts to read the title of a gallery popup that closes during image download, covering nine image destinations at two widths. They are not counted as 26 broken website links. The native skip destinations navigate, while screenshot viewing still has the expectation issue described below. No page JavaScript errors or unloaded/broken images are observed in the 16 settled page inventories.

### Newly elevated content findings

**1. Reconcile ARCTIC provenance across resume and case study.**

The downloaded, text-extracted and visually inspected one-page resume says “ARCTIC - AIRCON SERVICE MANAGER | Client Project” and “Gathered requirements from a four-branch air-conditioning company and mapped its booking-to-invoice workflow.” The case study says “The four-branch company is a modeled scenario; no production adoption or business-impact figures are claimed.”

These statements create different impressions of the work. Real requirements gathering could inform a modeled implementation without adoption, so this audit does not declare either account false. Clarify the factual relationship and use the same distinction across both documents. Until clarified, do not silently promote the project to client delivery or erase potentially real requirements work. This is the first content issue to resolve because visitors download the resume as part of the same hiring journey.

**2. Narrow the CASH-G test-evidence caption to its actual assertions.**

The selected “Transfer persistence test” detail says “Checks sender debit, recipient credit, and both history entries.” The opened GitHub file `JdbcTransferRepositoryTest.java` is fully rendered as 66 lines, including its closing class brace. It asserts sender/recipient balances and searches recipient history for `TRANSFER_RECEIVED`; it does not query sender history or assert both history rows. The separate implementation contains both transaction inserts, but implementation code and a test assertion are different evidence.

Recommended detail: “Checks sender and recipient balances and the recipient transfer-history entry.” No project tests are executed during this audit. Larger ARCTIC and AssetHub integration-test pages expose only opening excerpts in the inspected GitHub rendering; their full claimed coverage remains unverified here.

**3. Restore the unavailable AWS evidence action.**

Actual click on “View course completion” opens a browser-visible HTTP 404 for the promised PDF. Restore the genuine intended public document, or remove its action until available. This does not disprove course completion. Retain the explicit distinction between course completion and the certification exam.

**4. Align the resume's project versions with the current portfolio.**

The readable one-page resume describes AssetHub organization-scoped listing/update/delete operations and basic data-model setup. The current case study centers on checkout/return, retained history, audits and the AI-assisted 2026 rebuild. The resume's CASH-G content is desktop-only while the portfolio prominently displays Web v2. Add explicit version/contribution labels so the same project names do not imply identical scope. Preserve the resume's compact, conventional reading format; it does not need the website's photographic treatment.

**5. Make the coursework destination support the training context.**

“Java coursework” correctly reaches Java exercise folders, but the repository README opens with a general developer profile, calls AssetHub “Production-ready asset management,” and carries a July 2026 update label. That framing is stronger and less specific than the portfolio's educational scope. A coursework-specific opening, chapter/task index and related CASH-G link would make the destination more useful. The exercise repository itself does not prove course completion.

**6. Correct ARCTIC's second gallery caption and related verification description.**

The caption identifies “Service jobs · Branch-aware schedule and billing states in synthetic data,” the alt text describes a service-jobs table, and the verification paragraph says a “service-jobs list” was captured. The actual original image is a “Work order” detail dialog for a synthetic job, showing a technician, scheduled time, completed status and paid invoice. Update the caption, alt text and verification wording to describe that detail state. A suitable caption is “Work order details · Completed synthetic job with an assigned technician and paid invoice · Local demo captured October 8, 2026.” This is an image/content mismatch, not a claim that the application lacks a jobs list.

**7. Describe AssetHub's checkout image as a form, not a completed result.**

The caption says “Synthetic custodian and return details are recorded beside the asset history.” The original image shows an unsubmitted “Check out asset” form: a custodian is selected, Expected return is empty, the asset remains Available/Unassigned, and existing history shows the asset being added. Use “Checkout form · Preparing a synthetic asset checkout beside existing asset history,” or supply an authentic completed-result capture. Do not imply that the pictured checkout is already recorded.

**8. The offered public demos fail to deliver a preview in this run.**

One bounded follow-through is made for each application's explicitly offered synthetic demo. ARCTIC's “Explore demo workspace” leaves the visitor on its access page with “Internal server error.” AssetHub's “Fill demo credentials,” followed by Sign in using only the publicly supplied fictional demo identity, leaves the visitor on its access page with “Request could not be completed.” Neither reaches a first demo screen or application navigation. Both public access pages themselves load successfully.

This is a current observed content-journey failure, not a diagnosis of either backend or proof of permanent unavailability. Investigate before making a demo the primary review action; keep case-study screenshots as an available review path and provide accurate access expectations beside the hosted-app link. No retries, real-account authentication, account registration, business-record changes or messages occur. Evidence: `external-demo-1792525904873-results.json` and the corresponding error-screen captures.

### Newly confirmed visual and content-state findings

**Full-size screenshot links behave as downloads.** The gallery links promise “Open full-size screenshot,” but the live image response uses `Content-Type: application/octet-stream` and the Chromium popup closes during download. The images themselves load when embedded, so this is a viewing-expectation problem rather than a missing screenshot. Prefer an in-page enlargement with an explicit download option, or serve images with their correct media type and ensure the new tab presents a viewable image. Keep the complete, authentic images available.

**Quick previews are longer than their job requires.** Their contribution text is useful, but long capture-process paragraphs delay the next step on mobile. CASH-G's preview says “The three Web v2 screenshots were captured…” while showing one preview image. AssetHub says “This page describes the current rebuild,” wording carried over from a full-page study. Use a singular preview caption, one concise contribution statement and a short demo-context note, with detailed verification retained in the study. The bottom CTA labels are visible in the coordinator's inspected captures and the full-study action succeeds in all 12 tested variants; no missing-CTA defect is asserted.

**Hosted-application links need adjacent access expectations.** ARCTIC and AssetHub arrive at public access pages rather than the workflows pictured in the galleries. Their detailed access limitations currently appear much later in the case studies. Put a concise “Opens sign-in” or verified public-demo qualifier beside the action. A public sign-in page does not prove an authenticated hosted workflow.

**The full article contains a repeated evidence layer.** Contribution panels, gallery context, role-model source links, selected-source cards and final verification sections repeat related explanations. Keep the useful precision, but connect each key decision directly to one supporting source and consolidate repeated check history. CASH-G needs one clear version explanation, not repository naming history in its opening plus another version explanation before the gallery.

**The full-case-study review adds specific page-level improvements.**

- CASH-G's “The version-specific code and tests are linked below” follows a mixture of desktop and web decisions, but the selected links below concern desktop v1. Label each decision and its evidence by version. Its fourth numbered workflow item concerns screenshot availability rather than product behavior; move that provenance note beside the gallery.
- ARCTIC's completed work-order and billing images can be paired directly with its terminal-job-state and auditable-payment decisions. Keep the useful explanation that a technician is an assignee, rather than another sign-in role.
- AssetHub's workflow says “Workspace members add equipment,” while the MEMBER role card describes viewing assets and reporting issues. Distinguish people generally from the uppercase permission role, for example “Staff with inventory permissions add equipment.” No implementation permission flaw is inferred.
- Mobile architecture flows expand four short stack labels into large vertical boxes; CASH-G has two such flows. A compact ordered sequence can preserve comprehension and leave more space for project-specific decisions.
- Use short project names in the closing next-study links to reduce wrapping. Keep source/verification/navigation focus outlines, which remain visible in inspected light and dark states.
- Full case-study narrative and decision copy are more comfortably sized than homepage metadata. Preserve that reading foundation; target the small metadata and photographic text problems rather than increasing every text size indiscriminately.

### External review limits and evidence

The external ledger records 23 unique HTTP/document attempts and one separately recorded mailto intent. LinkedIn's public profile is reachable in the browser with identity and About content; the earlier HEAD 405 is not evidence that this destination is unavailable. Most popup response events are not captured, so their numeric HTTP statuses remain null even when public content visibly opens; this report does not infer 200 for those records.

Published verification records are read as historical, author-published evidence. Some linked source files are inspected completely, while large integration files are limited to the visible GitHub excerpts. No suites are rerun and no private account is used. Explicit synthetic demo entry is attempted once per linked application and stops at the observed errors described above. The audit covers the portfolio and its linked public review journey; it does not claim a full audit of every linked application's authenticated screens.

Full evidence: `artifacts/sauron-full-clickthrough-2026-10-21/walkthrough.json`, `supplement.json`, per-page `.txt` captures, section/full images, preview/tab/feedback states, `external-1792525549689-assessed-results.json`, downloaded resume/text/render, and `case-review-*` gallery/section evidence. Raw evidence directories are ignored by Git. The scripts preserve each attempted outcome rather than replacing automation failures with an unconditional pass.

## Design read

A developer portfolio for recruiters and technical interviewers, with an established photographic, editorial identity. The home page introduces the person and helps visitors choose a project; case studies explain the work. The most valuable direction is clearer personal contribution and easier reading within the existing identity.

Advisory Taste settings: `DESIGN_VARIANCE=6`, `MOTION_INTENSITY=3`, `VISUAL_DENSITY=4`. These describe the proposed refinement direction, not a measured score of the current site.

## Method and evidence

- Sauron Gandalf reviews positioning and copy; Aragorn reviews project storytelling; Legolas reviews aesthetic consistency.
- Additional global skills: `designer` routes to Emil design engineering; `taste` routes to `design-taste-frontend`; `impecable` routes to `impeccable` and its critique playbook. Project UI/UX principles and design-tokens supply supporting criteria.
- The global Designer, Taste and Impeccable wrappers are found under `C:/Users/margi/.codex/skills/`; their source skills are under `C:/Users/margi/.agents/skills/`.
- UI/UX Pro Max is not found in the searched project, global agent/Codex skill directories, or Codex plugin skill paths. It is not claimed as used.
- Fresh live Chromium captures cover home hero, project section, toolkit and contact at 1440px and 390px in dark and light themes. All three case-study openings are visually inspected at desktop size. Existing 320px screenshots supplement the review.
- Computed typography and section heights are recorded in `artifacts/sauron-audit-2026-10-21/editorial-evidence.json`. Viewport screenshots avoid relying only on scaled full-page images.
- No production content, CSS, design brief or deployment is changed. Suggested copy is a draft grounded in the existing content, not a newly verified claim about the underlying applications.

## Overall assessment

The personal photography and Cormorant Garamond/Manrope pairing make the site recognizable. Dark mode is more resolved than light mode over photography. The largest content weakness is that project provenance and verification receive more emphasis than the user problem and the developer's decisions. The largest visual weakness is that expressive titles sit beside essential information rendered as small secondary text.

The work supports a more specific positioning: Java applications and React web tools for operational workflows. There is enough substance for that positioning without fabricated clients, adoption, experience, or business metrics.

## Priority findings

### 1. Clarify ownership of the featured CASH-G version

Priority: high for editorial clarity. Evidence: `portfolio.json:72`, `:132`, `:149`.

The featured interface is Web v2, while the clearest ownership statement and selected source evidence concern desktop v1. The page identifies the versions, but does not explain the developer's Web v2 contribution with equivalent precision. This is an attribution gap, not evidence of deception.

Recommendation: Label the visible version beside its screenshot and explain contributions separately for each version. Until Web v2 facts are supplied, retain the narrower desktop statement. Do not imply the displayed web interface proves desktop implementation work.

Safe interim draft:

> My desktop v1 contribution covers the Java interface, service logic, JDBC persistence, and tests. AI supported requirements, tooling, issue structure, and review. The screenshots show the separate Spring Boot Web v2 application.

Acceptance: A visitor can identify which version is pictured, which source opens, and what the developer contributed to that version without reconciling multiple paragraphs.

### 2. Give the hero a specific application focus

Priority: high. Evidence: `portfolio.json:5`; `App.tsx:437`.

Current role: “Software Developer / Web Developer.” Current description: “Real desktop and web projects, with source code, decisions, and verification you can review.” These state broad categories and documentation quality. They leave the visitor to infer the kinds of applications the developer builds.

Draft role:

> Software Developer | Java and React Applications

Draft description:

> I build desktop and web applications for banking simulations, service operations, and equipment management.

Retain the existing availability statement. Keep View Projects primary and Download Résumé secondary. Consider a more operational description after the title if the role label must remain unchanged.

### 3. Restore reliable reading surfaces over light-mode photographs

Priority: high for visual readability. Observed at 1440px and 390px. Evidence: `styles.css:81`, `:939`, `:1033`.

Light mode removes the hero and contact scrims. The hero description crosses vegetation and, on mobile, the subject's dark shirt. The contact copy-email action uses a subdued dark theme-derived color over a detailed city photograph, making it noticeably less prominent than adjacent contact text. Dark mode supplies protective gradients and reads more consistently.

Recommendation: First consider localized backing behind the copy and controls, leaving the rest of the photograph unobstructed. Alternatively adjust crop and text placement. A full photographic scrim would change the explicit unobstructed-photo direction in DESIGN.md, so treat it as a proposed design decision rather than a silent repair. Define photographic text/control tokens covering normal, hover, focus, success and failure states.

Acceptance: Hero description, availability, resume action, contact links and copy feedback remain legible at actual viewport size in both themes and responsive crops. Numerical contrast is not measured in this review; this finding is visual evidence, not a declared WCAG failure.

### 4. Increase the size of information needed to evaluate the work

Priority: high. Evidence: `styles.css:676`, `:704`, `:721`, `:1346`, `:1562`.

Computed live values include 10px technology tags, an 11px availability statement, and a 12px mobile role line. Project role summaries use 12px. The display names and project headings dominate these details. Smaller text can be appropriate for incidental labels; personal contribution and primary actions deserve stronger treatment.

Suggested type roles: 15–16px body text, 13–14px meaningful supporting information, and 11–12px incidental labels. Keep the display serif but reduce the scale difference where needed. These are proposed visual defaults, not accessibility minimum-size rules.

Acceptance: Contribution, project purpose and case-study action are comfortably readable without zooming. Do not preserve a two-button row by shrinking labels to 10px on narrow screens.

### 5. Lead case studies with a problem and a decision

Priority: medium. Evidence: `ProjectCaseStudy.tsx:143`, `:207`, `:232`, `:336`; project overview fields.

Case-study introductions favor feature lists, version history and implementation terminology. In CASH-G, repository naming history appears in the opening overview and the version section precedes the first gallery. AssetHub's long title occupies three desktop lines. Engineering decisions arrive after the gallery, system architecture and access model.

Recommendation: Use a concise title and descriptive subtitle, then a short problem/contribution summary. Place one representative screen and the strongest decision early. Keep technical architecture and evidence available for deeper reading.

Recommended reading flow: problem and audience, contribution, representative workflow, two decisions with tradeoffs and adjacent evidence, delivered capability, verification context.

Acceptance: A visitor can explain the project, the developer's role and one engineering challenge after the opening section. This is a review criterion, not a timed user-research result.

## Per-project storytelling

| Project | Lead with | Strongest existing material | Missing detail |
| --- | --- | --- | --- |
| CASH-G | Practicing account and transfer workflows | Sender debit, recipient credit and ledger entries recorded together; deliberate money representation | Precise Web v2 contribution; a real implementation tradeoff |
| ARCTIC | Staff and managers coordinating a modeled four-branch service workflow | Terminal job states, branch scope and separately recorded refunds | One requirement translated into a rule; a clear cost/benefit explanation |
| AssetHub | Knowing who holds equipment, where it is and its history | One open checkout constraint, transactionally recorded history and stale audit rejection | Specific before/after contribution in the 2026 rebuild |

Draft openings:

**CASH-G:** “CASH-G is an educational banking simulator for practicing account and transfer workflows. I developed the desktop version's Java interface, services, persistence, and tests, focusing on consistent transfers and transaction history. The gallery shows the separate Spring Boot web version.”

**ARCTIC:** “ARCTIC models how staff and managers coordinate service work across four branches, from customer request and technician assignment to invoicing and collection. I defined requirements, workflows, data decisions, and deployment, with AI-assisted implementation.”

**AssetHub:** “AssetHub helps equipment managers track who holds an asset, where it is, and its lifecycle history across organization workspaces. I built the original version independently and rebuilt and expanded it with AI assistance in 2026.”

These drafts reorganize existing claims. The initial review does not independently inspect linked implementations. The full click-through expansion above subsequently inspects specific visible source files and records; reported test execution and project outcomes are not independently rerun or established.

## Further content improvements

- **Qualify the ARCTIC scenario on its card.** The four-branch setting is modeled, but that qualification currently appears in later limits (`portfolio.json:278`). Suggested card: “A portfolio application modeling requests, dispatch, work orders, inventory, and billing for a four-branch air-conditioning company.”
- **Consolidate verification prose.** Keep material limitations where relevant. Move repository-name history and older test-run accounting into a short provenance note. Replace “These are distinct runs and are not reconciled here” with one clearly attributed current record plus the fact that this update does not rerun the suite. Do not silently erase skipped-test qualifications.
- **Show contribution before AI tooling detail.** Preserve honest AI attribution and its precise scope. State the developer's actions first and keep the disclosure close to them. Repeating the disclosure in the toolkit and every preview adds less value than one clear statement per project.
- **Make About add current direction.** Replace the repeated project list with an explanation of the developer's focus on application logic, workflows and relational data. Label the education date “Graduated 2020.” Do not invent a 2020–2026 employment narrative or describe the developer as a recent graduate.
- **Use specific contact language.** “Email me about a role” explains the action more clearly than “Get in Touch.” Keep project inquiries welcome in the supporting sentence. “Open application sign-in” sets expectations more accurately for the hosted projects than an implied publicly usable demo.
- **Remove repeated credibility slogans.** “Real projects,” “real screens,” and “public source” appear repeatedly. Real screenshots, contribution statements and specific evidence already demonstrate these qualities.

## Project order

The reviewers propose different valid defaults: one prefers AssetHub for its explicit original ownership; another prefers ARCTIC for its immediately understandable operational story. Their agreement is that order should match the job target.

Coordinator recommendation: for a general web-application application, consider AssetHub, ARCTIC, CASH-G, provided the current rebuild contribution is made specific. For Java roles, retain CASH-G first after resolving version attribution. This is an editorial recommendation; no order is changed and no hiring-conversion effect is measured.

## Composition, rhythm and imagery

- **Preserve the font pairing and photography.** They provide a personal identity and a coherent opening. Replacing them with stock graphics or a fashionable framework aesthetic would discard useful character.
- **Simplify mobile project cards.** Each currently contains a screenshot, number, category, status, large title, summary, role, tags, case-study action and preview strip. Prioritize purpose, contribution and the case-study action; reduce decorative numbering and combine related metadata.
- **Shorten the toolkit's default presentation.** At 390px it occupies about 1,600px; education/training adds about 1,442px before contact. Together they account for roughly 36% of the 8,461px home document in this capture. This is measured page geometry, not evidence of visitor abandonment. A short core stack tied to projects would communicate more than 31 unweighted tools. Retain a way to browse the complete inventory.
- **Keep recognizable screenshot evidence.** Homepage cropping can establish visual interest, but full screens should remain available in the study. Give bright and dark application captures consistent surrounding mats without recoloring the interfaces.
- **Assign each photo a job.** Environmental hero, closer personal About crop, atmospheric closing image. Repeated outdoor imagery creates cohesion; use framing to prevent repetition from flattening the page's progression.
- **Make case-study openings more compact.** The large AssetHub title delays the first application screenshot beyond the captured opening. A short project name plus a clear subtitle would retain character and expose more work early.
- **Tokenize meaningful roles.** Establish shared body, metadata and action type roles; section, card and internal spacing roles; and photographic control states. This improves consistency without forcing inventory cards and narrative sections into identical padding.

## Motion direction from Designer

Designer routes this review to Emil's design-engineering principles. Existing motion code uses one-time reveals, desktop-only parallax and reduced-motion gating. The site does not need more animation to express the work.

| Current treatment | Proposed direction | Reason |
| --- | --- | --- |
| Hero text reveal, 0.85s with 0.075s stagger (`usePortfolioMotion.ts:31`) | Keep essential identity/actions available promptly; reserve slower movement for the photograph | A recruiter can start reading while decorative motion continues |
| Most reveal sections animate over 0.75s (`usePortfolioMotion.ts:38`) | Use fewer reveal groups and evaluate shorter entrances | Reduce repeated waiting while browsing work |
| About image uses a 1.1s clip reveal (`usePortfolioMotion.ts:64`) | Compare against a simpler static reveal before retaining it | Its purpose is atmospheric; it does not explain an application workflow |
| Scroll smoothing and parallax | Keep restrained and honor the saved preference on every route | Reading and navigation should feel predictable |

These are source-based motion recommendations. No frame-time measurement or slow-motion feel assessment is performed. Decorative first-visit motion is not automatically a defect because its duration exceeds a UI feedback budget. Full motion approval is withheld pending that review and the previously reproduced cross-route preference defect.

## Preserve

Personal photographs; Cormorant Garamond and Manrope; blue accent; restrained card surfaces; genuine application captures; visible resume/contact paths; honest contribution boundaries; explicit training-versus-exam credential wording; accessible native preview dialog; complete case-study screenshots and focused source links.

## Impeccable heuristic assessment

Method: independent dual-agent assessment. A: `01a15ad0-ab9c-7143-9771-eb36f1374764`; B: `01a15ad0-adfc-7602-9411-4793db84c533`. Neither assessment consumes the other's output. Assessment A completes before the parent receives detector findings.

Assessment B scans `src/App.tsx` and `src/ProjectCaseStudy.tsx`: zero primary findings and zero advisories, with raw JSON `[]` saved in `artifacts/sauron-audit-2026-10-21/impeccable-detector.json`. No detector rules or locations are reported and there are no false-positive candidates. This does not invalidate the visual/content findings: the scanner does not measure recruiter comprehension, rendered photographic contrast or the usefulness of copy.

Fresh browser navigation covers home and all three case studies. Mutable injection preflight succeeds; the browser blocks the external detector script because the HTTPS site cannot access the localhost loopback address space. No browser detector result or user-visible overlay is claimed. The temporary background detector server is stopped and its process/listener absence confirmed by Assessment B. The review relies on screenshots, ordinary browser observations and the CLI scan for their respective scopes.

Assessment A independently scores the home browsing experience 28/32. The coordinator reduces User Control from 4 to 3 after incorporating the previously reproduced saved-motion defect on fresh case-study navigation. The resulting advisory score is 27/32. This is a rubric-based expert assessment, not a usability measurement, an accessibility certification or a hiring-success percentage.

| Heuristic | Score | Reason |
| --- | --- | --- |
| Visibility of system status | 3/4 | Selected theme, active navigation and copy feedback communicate state |
| Match with the real world | 3/4 | Hiring actions are familiar; project purpose competes with technical/provenance language |
| User control and freedom | 3/4 | Preview dismissal works; saved motion preference is not applied on fresh case-study loads |
| Consistency and standards | 3/4 | Coherent visual identity; contact labels and photographic states vary |
| Error prevention | 3/4 | Explicit labels and limitations set expectations, with room to clarify hosted sign-in links |
| Recognition rather than recall | 3/4 | Visible summaries help; version ownership and toolkit breadth require extra interpretation |
| Flexibility and efficiency | n/a | Not scored for the primary portfolio-browsing task |
| Aesthetic and minimalist design | 3/4 | Strong composition; some secondary sections receive disproportionate emphasis |
| Error recovery | 3/4 | Clipboard source includes actionable failure feedback; this review does not induce failure |
| Help and documentation | n/a | No separate help system is needed for basic portfolio browsing |
| Total | 27/32 | Eight applicable heuristics |

Cognitive load is moderate by the skill's checklist, concentrated in the toolkit's seven tabs and 31 entries. Counting choices alone does not prove confusion; the grouping is useful and these are optional browsing controls. The emotional progression moves from personal photographic introduction to software evidence, then a slower toolkit/training middle before contact.

Persona review: a recruiter needs a clearer application focus in the hero; a nontechnical first-time visitor needs plainer project problems; a mobile visitor benefits from readable contribution text and shorter supporting sections; an engineering interviewer benefits from explicit version ownership and decisions linked directly to evidence. These are expert walkthroughs, not observations of recruited participants.

## Recommended refinement order

1. Reconcile resume/case-study project provenance and versions; correct the ARCTIC/AssetHub image descriptions and CASH-G test-evidence caption; restore the genuine certificate action or remove its unavailable link; investigate the observed public-demo failures before promoting demo access.
2. Clarify CASH-G version ownership and sharpen hero positioning.
3. Improve light photographic readability, essential text sizing and full-size screenshot viewing.
4. Rewrite case-study openings, shorten preview provenance and bring the strongest decisions forward with version-matched evidence.
5. Simplify mobile cards, toolkit, architecture diagrams and education pacing; choose project order for the intended role.
6. Unify contact language, photographic component states and motion restraint.

## Evidence files and limitations

Evidence directory: `artifacts/sauron-audit-2026-10-21/` (ignored by Git). `editorial-theme-comparison.png` places dark hero, light hero and light contact mobile captures side by side. `editorial-evidence.json` contains live measurements, with viewport screenshots and case-study introduction crops alongside it.

This audit uses expert judgment, source content and browser captures. No recruiter interviews, conversion analytics, comparative hiring study, numerical photographic contrast measurement or independently verified project outcome is claimed. Length and small typography are assessed in context, not treated as universal design failures. No website implementation or release is performed.

Questions skipped: the user explicitly delegates audit and skill-selection decisions. Further attribution facts, such as precise Web v2 contribution, remain marked as unknown rather than inferred.
