# Remote Editing Guide

Use this guide when editing the website directly on GitHub.

## Basic Workflow

1. Open the repository on GitHub.
2. Go to the file you want to edit.
3. Click the pencil icon.
4. Edit the YAML or Markdown content.
5. Click `Commit changes`.
6. Commit directly to `main`.
7. Wait a few minutes for GitHub Pages to redeploy.

Production URL:

```text
https://aima-research-group.github.io/
```

## People

Member files live in:

```text
content/people/
```

Common fields:

```yml
name: Thanh-Huy Nguyen
slug: thanh-huy-nguyen
group: founder
role: Founder
affiliation: PhD Student - Northwestern University, USA
affiliation_slugs:
  - nu
short_bio: Short description shown on cards.
full_bio: Full biography shown on the personal page.
photo: /uploads/members/huy.jpg
links:
  - label: Website
    url: https://example.com/
  - label: Google Scholar
    url: https://scholar.google.com/...
active: true
placeholder: false
```

Valid `group` values:

```text
founder
leader
core-member
mentor
collaborator
affiliated-faculty
```

Notes:

- `affiliation` is display text.
- `affiliation_slugs` controls which logos appear on the personal page.
- For `affiliated-faculty`, if a `Website` link exists, clicking the card opens that external website.
- Member images should be uploaded to:

```text
public/uploads/members/
```

## Affiliations

All available affiliation logos are stored in:

```text
content/settings/affiliations.yml
```

Example:

```yml
- name: Northwestern University
  slug: nu
  logo: /uploads/affiliations/nu.png
  url: ""
  location: USA
```

The affiliations shown on the Affiliations page are controlled by:

```text
content/affiliation/official-affiliations.yml
```

Example:

```yml
- slug: nu
  order: 1
```

Affiliation logos should be uploaded to:

```text
public/uploads/affiliations/
```

## Publications

Publication files live in:

```text
content/publications/
```

Common fields:

```yml
title: Paper title
slug: paper-slug
year: 2026
authors:
  - First Author
  - Second Author
venue: Full Conference or Journal Name (SHORT), 2026
publication_type: conference
badges:
  - Oral
thumbnail: /uploads/publications/example.png
figure: ""
media_type: image
links:
  - label: Paper
    url: https://...
  - label: Code
    url: https://...
  - label: Demo
    url: https://...
featured: true
order: 1
status: published
placeholder: false
```

Valid `publication_type` values:

```text
journal
conference
preprint
workshop
poster
thesis
other
```

Valid badge values:

```text
Oral
Highlight
Best Paper Award
```

Publication images should be uploaded to:

```text
public/uploads/publications/
```

## Homepage And Site Settings

Homepage content:

```text
content/settings/homepage.yml
```

General site settings:

```text
content/settings/site.yml
```

SEO settings:

```text
content/settings/seo.yml
```

Navigation:

```text
content/settings/navigation.yml
```

## Other Content

Research themes:

```text
content/research-themes/
```

Projects:

```text
content/projects/
```

News:

```text
content/news/
```

Community:

```text
content/community/
```

Opportunities:

```text
content/opportunities/
```

Gallery:

```text
content/gallery/
```

## Important Rules

- Keep slugs lowercase.
- Do not use spaces in slugs.
- Image paths must start with `/uploads/...`.
- If you rename a slug, update every file that references that slug.
- After editing, check the deployed website after GitHub Pages finishes redeploying.
