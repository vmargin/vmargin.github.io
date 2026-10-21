# Portfolio evidence sources

Portrait/control follow-up: the supplied white portrait is retained unchanged as `assets/source/portraits/about-portrait-white-original.png` (SHA-256 `55aa509889efe7d0abbc5195ea4de6d6beedd428d34e47f7978764b5cd8286c5`). The supplied transparent light-ray artwork is retained as `assets/source/controls/theme-bulb-original.png` (SHA-256 `1b999fe3e6d05873ad205e288f07c1e5f5f63ec4276aa160e9528eaa5b6e2eb2`). The preparation script creates a metadata-free 800x1000 white portrait and a trimmed transparent 96x96 control derivative. Only the bulb artwork changes color in CSS; the portraits and landscape retain their natural colors. The existing black portrait original matches the latest supplied black PNG byte for byte.

Latest update, October 21: the supplied landscape is copied unchanged to `assets/source/landscape/contact-landscape-original.jpg` (SHA-256 `c2302da2789b97ebbb02b3ff2a2995fce910f13038bd2452e4bf72165586d472`). Public WebP variants preserve its full 4:3 composition and omit source metadata. Current live-demo checks, canonical repository redirects, and individual audit results are in [the latest checklist](latest-update-audit-2026-10-21.md); earlier availability observations below remain historical.

The case-study galleries use actual product captures, not reconstructed interface illustrations. The site serves optimized copies; captions identify the version, data type and capture context.

## Current implementation: October 21, 2026

- Confirmed profile, project/version contributions, credentials, and final public URLs come from `docs/implementation-inputs.md`. The unchanged resume remains a separate supplied document and retains its original wording.
- ARCTIC's second capture shows completed work-order details, not a jobs list. The originating requirements come from a real company; the client project does not proceed further, while the portfolio implementation is complete. No real branch count or adoption is established.
- AssetHub's checkout capture shows an unsubmitted form. It does not show a saved checkout. Confirmed contributions distinguish hand-coded original, AI-assisted v2 frontend redesign/deployment, and AI-assisted v3 redesign/development/deployment with user research informing features. The gallery is not assigned an unverified version or release date.
- CASH-G's gallery shows Web v2 only. Its focused desktop persistence test asserts balances and recipient `TRANSFER_RECEIVED` history; the portfolio caption now states that narrower scope.
- Supplied portrait originals are copied without changes to `assets/source/portraits/`. Hero source is 1024x1536 with partial alpha; About source is 1122x1402 and opaque. `scripts/prepare-portfolio-assets.mjs` generates 850x1275 transparent and 800x1000 opaque WebP derivatives and records gallery dimensions. Appearance and application screenshot colors are preserved.
- The public resume SHA-256 is `bade4049a4b7be0f0272659151f20f3c769f44cf90a010d6f74edb86a3f4361d`; the AWS completion PDF SHA-256 is `af0a095b69bec81f41ab9e534c6dc072476a5b2398eb4c2da59faf136a7d9a36`. Both match the retained supplied originals. These stable public assets do not depend on ignored input paths at runtime.
- The saved AWS PDF records AWS Cloud Quest: Cloud Practitioner course completion on September 5, 2026. It does not establish an AWS exam certification. Java training is text only, and Spring Valley SIL uses the confirmed dates and supervised-learning scope.

The inventory below records earlier source inspection; the current corrections above supersede its older jobs-list and rebuild descriptions.

| Project       | Source                                                                                                                     | Portfolio context                                                                                                                                               |
| ------------- | -------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CASH-G Web v2 | [Web v2 source repository](https://github.com/vmargin/banking-app-v2)                                                      | Dashboard, transfer review and receipt from the local Spring Boot/H2 practice demo. Records are synthetic. These images do not represent Swing desktop v1.      |
| ARCTIC        | [ARCTIC source repository](https://github.com/vmargin/aircon-service)                                                      | Dashboard, job list and invoices captured from an isolated local PostgreSQL demo using synthetic records. They do not evidence a hosted authenticated workflow. |
| AssetHub      | [Published project screenshots](https://github.com/vmargin/multi-tenant-asset-manager/tree/main/docs/overhaul/screenshots) | Genuine register, checkout and dashboard captures. The earlier application was built solo; the 2026 rebuild and feature expansion were AI-assisted.             |

## Coursework and toolkit · October 9, 2026

The four degree-coursework topics are restored from the previously published portfolio at `8034349:src/App.tsx`: object-oriented programming, data structures, relational databases and software engineering. These are broad study topics from that public record, not transcript-verified course titles or current-proficiency claims.

The 31-item inventory comes from the actual project manifests, build/deployment configuration and this portfolio's own manifest. It covers the languages, frameworks, database libraries, test/build tools and deployment tools used across the projects and current portfolio. It includes AI-assisted projects. It does not assign proficiency levels or infer desktop applications from this machine's installed software.

## Photography and icons

The two supplied hero photographs remain byte-for-byte in `assets/source/hero-pair/`. Their optimized theme assets, `public/images/projects/hero-sunrise.webp` and `hero-sunset.webp`, were already present: 168,466 and 135,966 bytes respectively. The app requests only the selected theme photo.

Technology marks are local Devicon SVG assets under `public/images/stack/`, sourced from the Devicon v2.17.0 release. Six additional marks for GSAP, npm, shadcn/ui, TanStack, Thymeleaf and Zod come from Tech Stack Icons v3.7.1, whose package metadata lists the MIT license and author Eugenio Ciccale. Their attribution and license are retained in `public/images/stack/TECH-STACK-ICONS-NOTICE.txt`. Java is used for Swing and JDBC, Node.js for Node.js Test Runner, and neutral category icons for SQL and H2 because those items do not have a distinct mark in the selected icon source. The logos identify technologies; they are not endorsements or performance evidence.
