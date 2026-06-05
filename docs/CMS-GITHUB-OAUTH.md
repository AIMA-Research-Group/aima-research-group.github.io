# Decap CMS GitHub OAuth

This site is hosted on GitHub Pages, so Decap CMS cannot complete GitHub OAuth by itself. GitHub Pages is static and cannot safely store the GitHub OAuth client secret. You need a small OAuth proxy, then Decap can use the GitHub backend.

## 1. Deploy an OAuth proxy

Use a Cloudflare Worker proxy such as `sterlingwes/decap-proxy`.

1. Create or log in to a Cloudflare account.
2. Deploy the proxy worker.
3. Copy the Worker URL, for example:

```text
https://aima-decap-auth.<cloudflare-subdomain>.workers.dev
```

## 2. Create a GitHub OAuth App

Open GitHub Developer Settings and create a new OAuth App.

Use these values:

```text
Application name: AIMA Decap CMS
Homepage URL: https://aima-decap-auth.<cloudflare-subdomain>.workers.dev
Authorization callback URL: https://aima-decap-auth.<cloudflare-subdomain>.workers.dev/callback
```

After creating the app, copy:

- Client ID
- Client Secret

Store them as secrets in the OAuth proxy, not in this repository.

For `sterlingwes/decap-proxy`, the Worker secrets are:

```text
GITHUB_OAUTH_ID
GITHUB_OAUTH_SECRET
```

## 3. Update Decap config

Edit `public/admin/config.yml` and replace:

```yml
base_url: https://REPLACE_WITH_YOUR_DECAP_OAUTH_PROXY_URL
```

with the real Worker URL:

```yml
base_url: https://aima-decap-auth.<cloudflare-subdomain>.workers.dev
```

Keep:

```yml
backend:
  name: github
  repo: datct00/aima_homepage
  branch: main
  auth_endpoint: /auth
```

## 4. Test

Open:

```text
https://datct00.github.io/aima_homepage/admin/
```

Click login, authorize with a GitHub account that has write access to `datct00/aima_homepage`, then save a small content change.

If the login succeeds but saving fails, confirm the GitHub account has write access to the repository.
