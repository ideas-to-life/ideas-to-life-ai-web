# Architecture

This document describes the current architecture of `ideas-to-life-ai-web`.
It is a factual reference for maintainers, contributors, and AI coding
assistants. It describes what exists today and separates current
implementation from conservative future evolution.

## 1. Purpose

`ideas-to-life-ai-web` is the public website for Ideas to Life. The site
publishes AI experiments, emerging products, weekly learnings, architecture
patterns, and visual architecture material.

The website acts as the public publishing layer for the wider Ideas to Life
ecosystem. It does not implement the AI systems themselves. Instead, it
documents and connects them through content collections, static pages,
architecture diagrams, generated cheat sheets, and reusable content templates.

The implementation is currently a static Astro site deployed to Cloudflare
Pages. It is optimized for publishing, navigation, and long-lived reference
content rather than runtime application behavior.

## 2. Architectural Principles

### Static-first

The Astro configuration uses `output: 'static'`. Pages are generated at build
time from `.astro` routes, Markdown/MDX content collections, and files in
`public/`. Dynamic routes use `getStaticPaths()` rather than runtime request
handling.

### Content-first

Most core site sections are driven by content collections under `src/content/`.
Experiments, learnings, patterns, products, and page copy are stored as
Markdown or MDX and validated through schemas in `src/content.config.ts`.

### Component-driven

Repeated UI structures are implemented as Astro components. Cards, navigation,
hero content, footer, and layouts are reused across route families. Pages
compose collections and components rather than embedding all display logic in
content files.

### Schema-backed publishing

Astro content collections use Zod schemas to constrain frontmatter. This makes
content shape part of the architecture. Required fields, status enums, draft
flags, and relationship fields are validated during content loading.

### Separation of content, presentation, and assets

Markdown content lives in `src/content/`, route composition lives in
`src/pages/`, reusable presentation lives in `src/components/` and
`src/layouts/`, global styling lives in `src/styles/`, and static assets live
in `public/`.

### Progressive enhancement

The site is primarily static HTML/CSS. Client-side JavaScript is limited and
used for enhancement, such as zooming architecture diagrams with
`medium-zoom`. The core content remains renderable without those enhancements.

### Performance-conscious publishing

The site avoids framework-level client hydration for normal content pages.
Images are static assets. Diagram pages use lazy loading for large SVG
diagrams. The architecture favors build-time work over client-side rendering.

## 3. Technology Stack

### Astro

Astro is the site framework. It provides file-based routing, layouts,
components, static generation, content collections, and RSS route support.

Current configuration:

- `output: 'static'`
- `site: 'https://ideas-to-life.ai'`
- Tailwind integration through `@astrojs/tailwind`
- Vite SSR externals for `node:fs` and `node:path`, used by build-time
  architecture diagram discovery pages

### TypeScript

TypeScript is used through Astro's strict TypeScript configuration. The
project extends `astro/tsconfigs/strict` and defines the `@/*` alias for
imports from `src/*`.

### Tailwind CSS

Tailwind is the primary styling system. Utility classes are used directly in
components and pages. The project extends Tailwind with custom colors, fonts,
and a hero background image token. The typography plugin supports prose styling
for Markdown-rendered pages.

### Markdown and MDX

Content collections load `*.md` and `*.mdx` files from `src/content/`.
Markdown is used for experiments, learnings, products, patterns, and page copy.
MDX is enabled by the collection loaders, though the current content inventory
is primarily Markdown.

### Astro Content Collections

`src/content.config.ts` defines the publishing contract for:

- `experiments`
- `pages`
- `learnings`
- `patterns`
- `products`

The schemas validate metadata, draft flags, statuses, relationships, dates,
images, and URLs.

### Cloudflare Pages and Wrangler

Deployment targets Cloudflare Pages. The committed deployment script builds
`dist` and runs:

```sh
npx wrangler pages deploy dist --project-name ideas-to-life-ai --branch main
```

Wrangler is a dev dependency. There is no committed `wrangler.toml` in the
repository.

### npm

npm manages dependencies and scripts. The committed `package-lock.json` pins
the dependency graph.

Key scripts:

- `npm run dev` / `npm start`: start Astro dev server
- `npm run build`: build the static site
- `npm run preview`: preview the built Astro site
- `npm run check:links`: validate internal links against `dist`
- `npm run check:content`: validate content cross-references
- `npm run check:site`: build, then run link and content checks

### RSS

`@astrojs/rss` is used by `src/pages/rss.xml.ts` to publish a feed combining
learnings, experiments, and architecture patterns.

### medium-zoom

`medium-zoom` is used on architecture diagram pages for client-side zooming of
large diagrams marked with `data-zoomable`.

### GitHub Actions

Not evident from the current implementation. No committed `.github/workflows`
directory is present.

## 4. Repository Structure

The repository is organized around a static publishing site.

`src/pages/` contains route definitions. Top-level pages such as home, about,
experiments, products, learnings, architecture, RSS, and dynamic detail pages
are implemented here. Route files query content collections, sort or filter
entries, and compose layouts and components.

`src/content/` contains structured Markdown content. It is the main editorial
source of truth for the site. Each collection maps to a publishing domain:
experiments, learnings, pages, patterns, and products.

`src/content.config.ts` is the schema contract for content. It defines which
fields content authors must provide and how pages can safely consume them.

`src/components/` contains reusable Astro UI components. These are mostly
presentational components that accept typed content collection entries or simple
props.

`src/layouts/` contains shared document layouts. `BaseLayout.astro` owns the
HTML shell, global metadata, navigation, footer, font loading, and background
treatment. `PageLayout.astro` provides an immersive content-page shell for
Markdown-rendered detail pages.

`src/styles/` contains global Tailwind imports and small component-layer
utilities.

`public/` contains static assets copied directly into the final site. This
includes product and experiment images, architecture diagrams, static
cheatsheet HTML files, and diagram assets referenced by content frontmatter.

`scripts/` contains local validation scripts. These scripts enforce internal
link integrity and cross-content references after a build.

`prompts/` contains prompt files and generated prompt-related artifacts used by
the broader Ideas to Life workflow. Repository instructions state this folder
is an execution copy and should not be treated as the permanent source of truth
unless explicitly requested.

Root configuration files define build, TypeScript, Astro, Tailwind, npm, and
repository behavior.

## 5. Component Architecture

Components are simple Astro components with explicit props and minimal internal
state. The dominant pattern is:

1. A route queries one or more content collections.
2. The route filters, sorts, or groups entries.
3. The route renders cards or Markdown content inside a shared layout.

Reusable components include:

- `Navigation.astro`: fixed glass-style global navigation
- `Footer.astro`: global footer with site identity and RSS link
- `Hero.astro`: home page hero
- `ExperimentCard.astro`: collection-backed experiment summary card
- `ProductCard.astro`: collection-backed product summary card
- `PatternCard.astro`: collection-backed architecture pattern card
- `WeeklyLearningCard.astro`: collection-backed learning summary card

Layouts are responsible for cross-page structure:

- `BaseLayout.astro` defines the document shell and default SEO metadata.
- `PageLayout.astro` wraps Markdown-rendered detail pages in an immersive hero
  and prose container.

The current design philosophy favors direct composition over deep abstraction.
Pages contain some repeated grouping logic, especially for status sections, but
cards and global chrome are reusable.

## 6. Content Architecture

Content lives primarily in `src/content/` and is grouped by collection.

### Pages

`src/content/pages/` contains editable page copy for home and about pages. The
home route reads the `home` entry and maps frontmatter into hero, focus, why,
process, and join sections. The about route renders the `about` entry through
`PageLayout`.

### Experiments

`src/content/experiments/` contains experiment pages. Each experiment defines
title, description, summary, image, status, domain tags, optional deployment
links, optional repo/demo links, optional tags, and a draft flag.

Experiment routes:

- `/experiments`
- `/experiments/[slug]`

The listing groups experiments by status. Detail pages are statically generated
from collection entry IDs.

### Learnings

`src/content/learnings/` contains weekly learnings and thread-style learning
documents. The collection uses a discriminated union on `type`, defaulting
missing types to `weekly` for legacy entries.

Learning routes:

- `/learnings`
- `/learnings/[...slug]`

The catch-all route supports nested learning thread paths.

### Patterns

`src/content/patterns/` contains architecture pattern documents. Pattern
frontmatter includes a stable `patternId`, title, summary, date, tags, status,
confidence, domain, related experiments, related learnings, sources, and an
optional diagram path.

Pattern routes:

- `/architecture/patterns`
- `/architecture/patterns/[slug]`

Pattern pages can render related learning and experiment links by resolving
frontmatter IDs through content collections.

### Products

`src/content/products/` contains product pages. Product entries link back to an
originating experiment and expose a product URL, status, tags, and draft flag.

Product routes:

- `/products`
- `/products/[slug]`

### Assets and diagrams

General visual assets live under `public/assets/`. Architecture diagrams live
under `public/architecture/`. Static cheatsheet HTML files live under
`public/cheatsheets/`.

Architecture diagram pages discover `.drawio.svg` files from `public/` at build
time using `node:fs` and `node:path`. This makes the diagram directory
structure part of the routing model.

## 7. Styling Architecture

Tailwind utilities are the primary styling mechanism. Most layout, spacing,
responsive behavior, colors, borders, typography, transitions, and effects are
declared inline through Tailwind classes in Astro files.

The global stylesheet imports Tailwind base, components, and utilities. It also
defines:

- a dark body theme using `bg-midnight` and white text
- `.glass` as a reusable translucent bordered backdrop-blur surface
- `.container-custom` as an intended shared container utility

Tailwind theme extensions define:

- `midnight`
- `glass-white`
- `glass-border`
- `accent-blue`
- `accent-violet`
- `accent-sunset`
- `font-main`
- `font-display`
- `hero-gradient`

Typography conventions:

- Display headings use the `Outfit` font via `font-display`.
- Body text uses Inter through `font-main` and loaded Google Fonts.
- Markdown content uses Tailwind Typography's `prose` and `prose-invert`
  classes with additional prose modifiers.

Responsive behavior is mostly utility-driven with `md`, `lg`, and `xl`
breakpoints. Listings commonly use responsive grids such as one column on
mobile, two or three columns on medium/large screens, and four columns on wide
screens.

Visual language is implemented with a dark background, translucent glass
surfaces, high-contrast typography, restrained accent colors, large whitespace,
rounded cards, subtle hover transforms, gradients, and blurred background
lights.

## 8. Performance Strategy

The main performance strategy is static generation.

Current performance techniques:

- Static Astro output for all routes.
- Content rendered at build time from content collections.
- Dynamic routes generated with `getStaticPaths()`.
- Limited client-side JavaScript.
- No React/Vue/Svelte client islands in the current implementation.
- Static assets served from `public/`.
- Architecture diagrams use `loading="lazy"` on diagram images.
- RSS generation happens through a static endpoint at build time.
- Navigation and content pages use regular links and server-rendered HTML.

Hydration strategy is minimal. Most pages do not hydrate components on the
client. The main client enhancement is `medium-zoom` on architecture diagram
pages.

Image optimization is limited in the current implementation. Images are served
from `public/` and referenced with standard `<img>` tags. Astro's image
optimization pipeline is not currently a recurring implementation pattern.

Lighthouse considerations evident from the implementation:

- Static HTML should keep runtime JavaScript low.
- Explicit page titles and descriptions are set through `BaseLayout`.
- Large diagrams are lazy-loaded.
- The site uses external Google Fonts, which can affect performance but are
  preconnected in the base layout.

## 9. Accessibility Strategy

Accessibility is partially implemented through semantic HTML and image text.

Current accessibility practices:

- `BaseLayout` sets `<html lang="en">`.
- Pages use semantic elements such as `header`, `main`, `section`, `article`,
  `nav`, and `footer`.
- Images in reusable cards and detail pages generally include `alt` text based
  on content titles or diagram titles.
- Pattern SVGs in `public/architecture/patterns/` commonly include
  `role="img"` and `aria-label`.
- Focusable navigation uses native links.
- Content pages use real headings and prose markup generated from Markdown.
- Diagram zoom is progressive enhancement on top of an ordinary image.

Areas where accessibility intent is less complete:

- Some decorative icons and inline SVGs do not consistently include accessible
  labels or `aria-hidden`.
- External links are visually styled but do not consistently expose assistive
  text indicating that they open a new tab.
- There is no evident automated accessibility test suite.

## 10. SEO Strategy

SEO is centralized primarily in `BaseLayout.astro`.

Current SEO features:

- Per-page `title` and `description` props.
- Default title and description fallbacks.
- Canonical URL generation from `Astro.url.pathname` and `Astro.site`.
- `site` configured as `https://ideas-to-life.ai` in Astro config.
- `robots` meta tag set to `index, follow`.
- Open Graph title, description, URL, type, and image metadata.
- Twitter card, title, description, URL, and image metadata.
- RSS alternate link in the document head.
- RSS feed at `/rss.xml`.

OpenGraph image handling is present, but the default image path is
`/assets/social-share.png`; that file was not evident in the current
repository inventory.

Structured data is not evident from the current implementation. No recurring
JSON-LD or schema.org markup was found.

A committed `robots.txt` file is not evident from the current implementation.

A committed sitemap configuration is not evident from the current
implementation. The project does not currently include `@astrojs/sitemap` in
`package.json`.

## 11. Deployment Architecture

The deployment architecture is:

GitHub -> Cloudflare Pages -> production

Current committed flow:

1. Code and content live in the Git repository.
2. The site is built with `npm run build`, producing `dist/`.
3. `ideas-to-life-deploy.sh` removes the previous local `dist/`, runs the
   build, then deploys `dist/` to Cloudflare Pages with Wrangler.
4. The Wrangler command targets the `ideas-to-life-ai` Cloudflare Pages project
   and the `main` branch.

There is no committed GitHub Actions workflow, so automated CI/CD from GitHub
to Cloudflare Pages is not evident from the current implementation.

There is no committed `wrangler.toml`, so Cloudflare project configuration is
not versioned in this repository. Local `.wrangler/` state exists but should be
treated as generated local state, not architecture source.

## 12. Engineering Conventions

### Naming

Astro components use PascalCase filenames, for example `ExperimentCard.astro`
and `BaseLayout.astro`.

Routes use lowercase URL-oriented names, including dynamic route filenames such
as `[slug].astro` and `[...slug].astro`.

Content filenames use kebab-case for descriptive slugs and date-based names for
weekly learnings.

Content collection names are plural nouns: `experiments`, `learnings`,
`patterns`, `products`, and `pages`.

### Imports

Imports are generally relative from the route or component file. The TypeScript
config defines an `@/*` alias, but the current implementation mostly uses
relative imports.

### Content access

Routes use `getCollection()`, `getEntry()`, and `render()` from
`astro:content`. Detail pages usually pass collection entries through
`getStaticPaths()`.

### Draft handling

Collections with user-facing listings use `draft` flags. Listing routes filter
draft content out for experiments, products, and learnings. Some detail routes
generate paths from all entries in a collection and do not consistently filter
draft entries.

### Status grouping

Experiment and product listings group content by status enum. The grouping is
implemented directly in route files rather than through a shared helper.

### Code style

The codebase uses ESM, Astro frontmatter blocks, `const` declarations, inline
Tailwind classes, and explicit content sorting/filtering in route files. There
is no committed formatter or linter configuration evident beyond TypeScript and
Astro's own tooling.

### Commit style

Recent Git history mostly uses conventional-style prefixes such as `feat:`,
`fix:`, `docs:`, `chore:`, and `refactor:`. Some older commits use dotted
forms such as `feat.` and `fix.`.

## 13. Design Philosophy

The design language is dark, editorial, and architecture-oriented.

Supported observations:

- The site uses a dark canvas with white text and muted secondary copy.
- Reusable glass surfaces create a consistent card and panel treatment.
- Accent colors are blue, violet, and sunset orange.
- Layouts rely on large vertical spacing and centered content.
- Typography is prominent, with large display headings and prose styling for
  long-form content.
- Cards are used for repeated content summaries.
- Architecture diagrams and pattern pages are treated as first-class content,
  not secondary downloads.
- The home page and listings frame the site as a public lab, product foundry,
  learning archive, and architecture catalogue.

The implementation is not minimal in the strict visual sense; it uses gradients,
blurred background effects, rounded cards, hover transforms, and large hero
treatments. It is more accurately described as polished editorial publishing
with a technical architecture catalogue.

## 14. Extension Points

Current extension points include:

- Add a new experiment by creating a Markdown/MDX file in
  `src/content/experiments/` with valid frontmatter.
- Add a new learning by creating a Markdown/MDX file in `src/content/learnings/`
  or `src/content/learnings/threads/`.
- Add a new architecture pattern by creating content in `src/content/patterns/`
  and, optionally, a diagram in `public/architecture/patterns/`.
- Add a new product by creating content in `src/content/products/`.
- Add platform diagrams by placing `.drawio.svg` files in
  `public/architecture/platform/`.
- Add experiment architecture diagrams by creating a folder under
  `public/architecture/experiments/{experiment-slug}/`.
- Add sequence diagrams by placing `.drawio.svg` files under
  `public/architecture/experiments/{experiment-slug}/sequence/`.
- Extend metadata rules by updating `src/content.config.ts`.
- Reuse existing cards and layouts for additional route families.
- Use the validation scripts to enforce internal link and content reference
  consistency.

These extension points are already present in implementation. They do not
require a redesign.

## 15. Technical Debt

The following items are current implementation observations, not speculative
future requirements.

- `@astrojs/cloudflare` is listed as a dependency, and historical output refers
  to Cloudflare adapter behavior, but `astro.config.mjs` does not currently
  configure a Cloudflare adapter. The active config uses static output.
- No committed `wrangler.toml` exists, so Cloudflare Pages project settings are
  not versioned with the code.
- No committed GitHub Actions workflow exists, despite the deployment path being
  GitHub to Cloudflare Pages conceptually.
- `.astro/` files and `.DS_Store` files are present in the working tree even
  though `.gitignore` ignores them. They appear to be generated or local
  artifacts and should not be treated as architectural source.
- `src/styles/global.css` defines `.container-custom` with `max-width-[1100px]`,
  which does not match Tailwind's standard arbitrary max-width utility naming
  pattern (`max-w-[1100px]`).
- External links using `target="_blank"` do not consistently include
  `rel="noopener noreferrer"`.
- The default OpenGraph image path points to `/assets/social-share.png`, but
  that file is not evident in `public/assets/`.
- Some collection detail routes generate pages for all entries, while listing
  pages filter drafts. This can allow draft content to have generated detail
  routes.
- `README.md` currently reads like website copy rather than developer setup or
  architecture documentation.
- `AGENT.md` and `GEMINI.md` mention Astro v5, while `package.json` currently
  depends on Astro `^7.0.7`. The implementation should be treated as the source
  of truth unless those instruction files are updated.
- Content validation scripts parse frontmatter with a lightweight custom parser
  rather than the same parser/schema system used by Astro content collections.
  This works for the current checked fields but is narrower than the full
  content model.
- Sitemap, `robots.txt`, and structured data are not implemented as committed
  site artifacts.

## 16. Recommended Future Evolution

This section is intentionally separate from the current implementation.
Recommendations are conservative architectural improvements, not descriptions
of what exists today.

### Version deployment configuration

Add a committed Cloudflare configuration file if the project relies on settings
that should be reproducible across machines or CI environments.

### Add CI around the existing validation contract

Add a GitHub Actions workflow that runs:

```sh
npm ci
npm run check:site
```

This would formalize the current build, link-check, and content-reference
workflow without changing the application architecture.

### Align adapter dependencies with active deployment mode

Clarify whether the site needs the Cloudflare adapter or only Wrangler Pages
deployment of static output. If static output is the intended model, keep the
configuration explicit and remove unused adapter assumptions. If the adapter is
required, configure it intentionally.

### Introduce shared status-section helpers

Experiment and product listings repeat status grouping and section rendering
patterns. A small shared helper or component could reduce duplication while
preserving the current content model.

### Extract design tokens gradually

The project already has Tailwind theme extensions for colors and fonts. Future
work could consolidate repeated radius, spacing, surface, and status-color
patterns into named utilities or small components.

### Strengthen SEO artifacts

Add sitemap generation, a committed `robots.txt`, and structured data where the
content model supports it. This would extend the existing centralized metadata
strategy rather than replace it.

### Make draft routing consistent

Apply draft filtering consistently between listing routes and static detail
path generation if drafts should never be publicly routable.

### Improve content validation reuse

Consider using a YAML/frontmatter parser or Astro-compatible content utilities
inside validation scripts so repository checks follow the same parsing
semantics as the site build.

### Normalize agent instruction files

Update `AGENT.md` and `GEMINI.md` to reflect the current package versions and
deployment model. These files are important for AI coding assistants and should
not drift from the implementation.

### Add accessibility checks

Add lightweight automated accessibility checks for rendered pages and normalize
external link and SVG accessibility conventions. This would build on existing
semantic HTML rather than changing the visual system.
