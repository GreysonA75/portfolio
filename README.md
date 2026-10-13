# Greyson Alegria — Software Engineering Portfolio

A complete, static portfolio for software engineering, AI-powered applications, systems integration, and practical project work. No framework, package installation, or backend is required.

## Run and validate

```sh
npm run dev       # http://127.0.0.1:4173
npm run check     # JavaScript syntax, internal links, metadata, and asset checks
npm run build     # Validate, then create the production site in dist/
npm run preview   # Serve dist/ at http://127.0.0.1:4173
```

The scripts require Node.js 18+ and Python 3. You can also open `index.html` directly or use any static file server.

## Pages and content

- `index.html`: centralized portfolio content, all five projects, expandable technical notes, About, education, skills, experience, and contact.
- `resume.html`: original PDF viewing/downloading and the existing dedicated resume-site link.
- `style.css`: visual tokens, component styles, responsive layouts, print styles, and reduced-motion support.
- `script.js`: accessible mobile navigation, hero layer controls, active navigation, disclosure deep links, and footer year.
- `assets/`: original assets, optimized project previews, social preview, favicon, and the unchanged current resume PDF.
- `assets/fonts/`: locally hosted DM Sans, Space Grotesk, IBM Plex Mono, and their SIL Open Font Licenses.
- `scripts/`: dependency-free validation and static production packaging.

To update projects, edit their semantic `<article>` elements in `index.html`. Technical detail content uses native `<details>` so it stays usable without a routing framework. Replace the resume PDF in place when a new version is ready.

## Audit and design decisions

The original repository used plain HTML/CSS/JavaScript with no framework, package dependencies, build configuration, or deployment workflow. GitHub confirms Pages is enabled for `GreysonA75/portfolio`; the existing live portfolio is `https://greysona75.github.io/portfolio/`. The `/resume/` URL is a separate resume site.

The redesign preserves that static hosting model. It replaces the dark full-height student-profile hero, uniform project cards, repeated case-study prose, outdated experience dates, and overstated automation-platform status with a light editorial design and stronger project hierarchy. GJ Systems leads, followed by native mobile and interactive-systems work. C and Java are distinguished as core foundations; Python remains an area of growing practice.

Project descriptions are grounded in the supplied brief and current public resume; ReAppraise's public README, pricing implementation, and asynchronous image-analysis workflow were also inspected. Existing public social and project URLs are preserved. No private endpoints or client materials are included.

## Assets and project scope

- `assets/greyson-alegria-resume.pdf` is the original PDF downloaded from `https://greysona75.github.io/resume/output/pdf/greyson-alegria-resume.pdf` on October 12, 2026. Its SHA-256 matches the downloaded source: `d407ec1b17e89baed11cd37aac80c133f7c6eb36c8e1442078150b2882520201`.
- ReAppraise and the cafe use optimized copies of actual existing screenshots; originals remain intact.
- PAWNARCHY uses an explicitly labeled concept illustration because no gameplay screenshot was provided.
- ASG uses a text presentation because no approved client visual or public project URL was available.
- GJ Systems is an ongoing prototype/staging effort. Its demo returns a sign-in requirement and is labeled accordingly. The workflow visual illustrates the intake concept; the Python planning controller is described separately.
- No repository URLs were invented for GJ Systems, PAWNARCHY, or ASG.

## Deployment

Keep the existing GitHub Pages deployment configuration. The repository root remains directly deployable: commit and push the site changes to the branch already used by Pages when publication is authorized. A build is optional for branch-based Pages hosting.

For any artifact-based static deployment, run `npm run build` and publish the **contents of `dist/`**. All local asset and page URLs are relative, so they work under `/portfolio/` as well as a domain root. `.nojekyll` is included. No client-side router or rewrite rules are needed. Legacy project and background anchors are preserved.

If the canonical host or project path changes, update the canonical/Open Graph URLs in both HTML pages, `sitemap.xml`, and the sitemap URL in `robots.txt`. A crawler reads `robots.txt` at the domain root; the included file also supports hosts where this site is served at the root.

The implementation does not publish or modify hosting infrastructure.
