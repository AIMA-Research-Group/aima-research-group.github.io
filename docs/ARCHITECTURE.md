# Architecture

The website is content-driven. Editable content lives in `content/` and is validated with Zod schemas in `lib/validation`.

Routes use React Server Components by default. Client components are used for mobile navigation and filters.

Preview mode is controlled by `NEXT_PUBLIC_CONTENT_PREVIEW_MODE`. When true, TODO labels are visible. When false, placeholder publications, projects, and people are hidden.

Decap CMS is prepared at `/admin` and configured in `public/admin/config.yml`.

SEO is handled by App Router metadata, dynamic metadata for research/project detail pages, `sitemap.ts`, and `robots.ts`.

Scientific placeholders are reusable components in `components/visual`.

Future extension points:

- Real MDX long-form pages.
- More publication metadata.
- Project figures and datasets.
- Authenticated production CMS.
- Final brand assets.
