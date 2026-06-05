# Deployment Guide

Create or connect a GitHub repository for `aima_homepage_v3`.

Environment variables:

```bash
NEXT_PUBLIC_SITE_URL=<production-domain>
NEXT_PUBLIC_CONTENT_PREVIEW_MODE=false
```

For Vercel, set the project root to `aima_homepage_v3`, build command to `npm run build`, and install command to `npm install`.

Connect the production domain and update `content/settings/site.yml`, `content/settings/seo.yml`, sitemap, and robots through `NEXT_PUBLIC_SITE_URL`.

Use preview deployments for branches and production deployment from the main branch.

Rollback through the hosting provider or by reverting the Git commit and redeploying.

CMS authentication remains a manual follow-up task.
