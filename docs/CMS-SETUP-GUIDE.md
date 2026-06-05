# CMS Setup Guide

Local workflow:

```bash
npm run cms:local
npm run dev
```

Open `http://localhost:3000/admin`.

`local_backend: true` is enabled for local editing.

Production CMS authentication is not configured. Choose a Git provider workflow, such as Netlify Git Gateway or GitHub OAuth, then replace placeholders for repository name, branch name, backend provider, and auth configuration.

Do not expose write access publicly without authentication.

Rollback by reverting the Git commit that changed content.
