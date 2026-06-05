# AIMA Research Group Website

Production-oriented Next.js website for AIMA, AI VIETNAM RESEARCH LAB.

Visual direction: Scientific Humanist Lab. The site should feel academic, refined, modern, collaborative, and evidence-driven.

## Commands

```bash
npm install
npm run dev
npm run validate-content
npm run lint
npm run build
npm run check
npm run cms:local
```

Open the site at `http://localhost:3000`.
Open CMS at `http://localhost:3000/admin`.

## Preview And Production Mode

Local placeholder mode:

```bash
NEXT_PUBLIC_CONTENT_PREVIEW_MODE=true
```

Production mode:

```bash
NEXT_PUBLIC_CONTENT_PREVIEW_MODE=false
```

Preview mode shows explicit `[TODO: ...]` labels. Production mode hides placeholder publications, projects, and people and shows graceful empty states.

## Structure

- `app/`: App Router routes, metadata, sitemap, robots.
- `components/`: layout, UI, visual placeholders, content cards.
- `content/`: editable YAML and Markdown content.
- `lib/content/`: content loaders.
- `lib/validation/`: Zod schemas.
- `scripts/`: validation scripts.
- `public/admin/`: Decap CMS preparation.
- `docs/`: editor, deployment, brand, QA, and architecture docs.

## Manual Follow-up Tasks

- Add official AIMA logo files: `logo-full.svg`, `logo-wordmark.svg`, `logo-symbol.svg`, `favicon.svg`.
- Replace placeholder brand assets in `public/brand`.
- Add final domain and Google Form URL.
- Add real research vision, themes, publications, projects, people, and gallery photos.
- Configure production Decap CMS authentication.
- Deploy to Vercel or another production host.
