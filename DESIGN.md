# Portfolio v6: personal, practical, readable

Implemented direction: October 21, 2026, including the latest user update. Exact copy, neutral palette, landscape, navigation, and demo decisions are recorded in [the latest blueprint](docs/latest-update-blueprint-2026-10-21.md). Historical audits retain their original observations.

## Identity and composition

Valkenburgh Margin, also known as Valk, seeks junior Software Developer roles with a full-stack/web emphasis. Cormorant Garamond display type, Manrope body type, neutral black/charcoal surfaces, white text, and persistent dark/light themes carry the identity across home and three case studies. The palette reference supplies color guidance only; its inspected dark body is `#09090b`.

Content shares a centered 1350px maximum with responsive gutters. Narrative paragraphs use narrower measures. Meaningful supporting text and actions use 14px, body copy 16px, and incidental labels 12px. Mobile layouts allow actions to wrap or stack.

The desktop hero places identity, application focus, availability, and a project action on the left and the supplied transparent formal portrait on the right. Mobile presents the copy and action first, followed by the portrait. The About section uses a 4:5 frame and the supplied natural-color portraits. Light mode shows the black portrait and white bulb artwork; dark mode shows the white portrait and black bulb artwork. The native bulb button sits at the top-left with 22px rays in a transparent 44px target, an accessible pressed state, and a 2px rectangular keyboard focus ring. Hover and keyboard focus rotate the rays 45 degrees and scale them to 1.1 over 250ms, and show a small Switch appearance tooltip. Reduced motion and saved pause remove the transition. It shares the persisted theme preference with the header. Original portrait PNGs are retained in `assets/source/portraits/`; original bulb artwork is in `assets/source/controls/`; optimized WebP files are in the matching public image directories.

An original decorative dot field sits behind the content with a subtle white gradient. Mouse movement creates local displacement that settles; there is no perpetual animation loop. Touch visitors receive the static field. Pause, system reduced motion, and page visibility govern animation. Light mode uses neutral gray/white surfaces. The supplied closing landscape appears in full, at its natural 4:3 proportions, inside an editorial frame centered within a 1350px maximum. From 1024px, the photograph and caption occupy the left panel and contact text occupies the right panel. Below 1024px, the photo precedes the contact details. Contact controls retain a solid black backing in both themes. Durable source and 660/1080/1800/2700px derivatives preserve the photograph's colors; public derivatives omit source metadata.

## Reading order and interaction

Home progresses through the introduction, AssetHub/ARCTIC/CASH-G, About, AI workflow, toolkit, Certifications & Training, and contact. The hero headline, description, and three About paragraphs reproduce the latest supplied text exactly. Location reads Based in Antipolo, Rizal. Six compact toolkit groups show three core tools each; all seven filters and an expansion action expose the complete 31-item inventory.

Cards emphasize purpose, contribution, capture context, and the case-study action. The three categories and genuine captures distinguish equipment custody, service operations, and banking practice. Separate Try Demo and Quick preview actions sit outside the study link, with adjacent access notes. Quick previews contain one capture, a short contribution statement, and a readily accessible full-study action. Native dialogs preserve Escape, focus containment within the page, close controls, and return focus. Case-study galleries open an in-page viewer with fit/original-size controls. Screenshot dimensions reserve their intrinsic proportions; authentic application colors remain intact.

Case studies open with the problem, contribution, and one engineering decision, then show the gallery, supported version scopes, architecture, permissions, workflows, further decisions, focused sources, and consolidated verification limits. Architecture becomes a compact ordered sequence on mobile. Header/footer destinations use home-qualified anchors on project routes.

Navigation includes Certifications and Resume. Mobile selection focuses the chosen section; Escape restores the menu trigger. The hero has one View Projects action. Retained resume actions open the supplied unchanged v4 PDF. About has no resume/contact action row. The AWS action opens the supplied Cloud Quest completion certificate. Java training retains its confirmed dates without a certificate action. The latest request removes the SIL card.

## Evidence and delivery

Contribution statements distinguish hand-coded CASH-G desktop/AssetHub original from AI-assisted adaptations and redesigns. General AI tools appear once in a workflow section. ARCTIC uses confirmed client-origin requirements with portfolio completion and client non-progression stated together. Unsupported branch counts, adoption, tool mappings, version dates, and gallery-version assignments are omitted.

`src/data/portfolio.json` supplies the content. Build-time Zod validation checks structures, routes, IDs, URLs, and gallery dimensions. The same React components prerender all four routes and hydrate browser controls. Home/case-study modules load separately; the native animation module loads only when preferences permit it. Shared metadata construction prevents generation/client divergence. Sitemap, robots, and a portable static-host header file are generated. Current-host support and served headers require separate deployment verification.

See [the latest audit checklist](docs/latest-update-audit-2026-10-21.md) for checks and external limits. No deployment or linked-application repair is part of this implementation.
