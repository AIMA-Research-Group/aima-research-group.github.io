# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the AIMA (Artificial Intelligence in Medical Application) Research Group website — a Next.js static site that renders content from YAML files in the `content/` directory. The site uses Next.js 16 with App Router, TypeScript, Tailwind CSS v4, and Zod for content validation.

## Common Commands

### Development
```bash
npm run dev          # Start dev server (next dev)
npm run build        # Build for production (next build)
npm run start        # Start production server (next start)
```

### Code Quality & Validation
```bash
npm run lint                   # Run ESLint
npm run typecheck              # Run TypeScript compiler without emitting files
npm run validate-content       # Validate all YAML content files
npm run check                  # Run validate-content, lint, and build in sequence
```

### CMS (Optional)
```bash
npm run cms:local     # Start Decap CMS for local content editing (npx decap-server)
```

## Architecture

### Content System

The entire site is content-driven. All site data lives in `content/` as YAML files:

- **`settings/`** — Site configuration, SEO, navigation, homepage
- **`people/`** — Lab members (founder, leaders, mentors, collaborators)
- **`publications/`** — Papers and research outputs
- **`projects/`** — Active and completed research projects
- **`research-themes/`** — Core research areas
- **`news/`** — Lab updates and announcements
- **`affiliation/`** — Official institutional affiliations
- **`community/`** — Community narratives (training, collaboration, etc.)
- **`gallery/`** — Event and activity photos
- **`opportunities/`** — Open positions and opportunities

Content is loaded via `lib/content/loaders.ts`, which:
1. Parses YAML files (and Markdown for FAQ)
2. Validates against Zod schemas in `lib/validation/schemas.ts`
3. Returns typed collections sorted by `order` field

### Content Relationships

Content types are linked via `slug` references:
- `research_theme_slugs` on publications/projects → themes
- `related_project_slugs` on themes/publications → projects
- `member_slugs` on projects → people
- `affiliation_slugs` on people → affiliations
- `gallery_slugs` on community narratives → gallery images

The `bySlugs()` helper resolves these references and falls back to `featured` items if slugs don't match.

### Preview Mode

The site supports a preview mode controlled by `NEXT_PUBLIC_CONTENT_PREVIEW_MODE`:
- **Preview mode (true)**: Shows all content including placeholder records
- **Production mode (false/omitted)**: Hides records where `placeholder: true`

Use `placeholder: true` on content records that are incomplete or contain `[TODO]` markers.

### Static Export Configuration

The site builds as a static export (`output: "export"` in `next.config.ts`):
- All pages must be statically renderable
- Images use `unoptimized: true` for static compatibility
- `trailingSlash: true` ensures consistent URLs
- Assets in `public/` are served directly

### Asset Paths

All content assets (images, logos) should be in `public/uploads/`:
- `/uploads/members/` — People photos
- `/uploads/affiliations/` — Institution logos
- `/uploads/publications/` — Publication thumbnails/figures
- `/uploads/projects/` — Project images/framework figures
- `/brand/` — Site logos and banners

Asset paths in content are absolute (starting with `/`) and reference the `public/` directory.

## Adding Content

1. Create a new YAML file in the appropriate `content/` subdirectory
2. Ensure `slug` is unique across that content type
3. Set appropriate `order` for sorting
4. Set `placeholder: true` for incomplete content
5. Link to related content via `*_slugs` arrays
6. Run `npm run validate-content` before committing

Content validation checks for:
- Duplicate slugs
- Missing linked references (e.g., project slug that doesn't exist)
- Invalid URLs and missing assets
- Duplicate navigation orders

## TypeScript Path Aliases

The project uses `@/*` path aliases mapping to the project root, configured in `tsconfig.json`. Use this for imports:
```ts
import { getAllContent } from "@/lib/content/loaders";
```

## Page Structure

Pages are in `app/` using Next.js App Router conventions:
- Dynamic routes use `[slug].tsx` (e.g., `app/people/[slug]/page.tsx`)
- All pages are async server components that fetch content via `getAllContent()`
- Layout is in `app/layout.tsx` (metadata, fonts)
- Global styles in `app/globals.css`
