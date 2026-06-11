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

## Field Value Reference

General field types:

```text
string: non-empty text
text: longer non-empty text
slug: lowercase id, no spaces, usually kebab-case
number: numeric value
boolean: true or false
date: YYYY-MM-DD
url: full URL such as https://example.com, mailto:name@email.com, or an internal path starting with /
image: path starting with /uploads/...
list: YAML list using - item
```

Shared fields used in many files:

```yml
slug: lowercase-id
order: 1
featured: true
placeholder: false
links:
  - label: Website
    url: https://example.com/
```

`slug` rules:

- Use lowercase letters, numbers, and hyphens.
- Do not use spaces.
- If you rename a slug, update every reference to that slug.

`image` rules:

- Upload images under `public/uploads/...`.
- The YAML value should start at `/uploads/...`.
- Example: `/uploads/members/name.jpg`.

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
photo: /uploads/members/huy.png
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

Valid People fields:

```text
name: string
slug: slug
order: number
featured: boolean
group: founder | leader | core-member | mentor | collaborator | affiliated-faculty
role: string
affiliation: string shown on the website
affiliation_slugs: list of slugs from content/settings/affiliations.yml
short_bio: text
full_bio: text
research_interests: list of strings
photo: image path or ""
links: list of { label, url }
active: boolean
placeholder: boolean
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

Valid Affiliation Registry fields:

```text
name: string
slug: slug
logo: image path or ""
url: url or ""
location: string, usually country/region such as USA, Vietnam, Taiwan
```

Valid Official Affiliation fields:

```text
slug: affiliation slug from content/settings/affiliations.yml
order: number
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
authors: First Author, Second Author
venue: Full Conference or Journal Name (SHORT)
publication_type: conference
impact_factor: ""
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

Valid Publication fields:

```text
title: string
slug: slug
year: number
authors: string, one line separated by commas
venue: string, venue name only; year is read from the year field
publication_type: journal | conference | preprint | workshop | poster | thesis | other
abstract: optional text, currently not displayed
impact_factor: string, only for journal papers, for example "7.6"
badges: Oral | Highlight | Best Paper Award
thumbnail: image path or ""
figure: image path or ""
media_type: image | gif | none
research_theme_slugs: list of research theme slugs
related_project_slugs: list of project slugs
links: list of { label, url }
featured: boolean
order: optional number, usually not needed
status: string
placeholder: boolean
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

Valid Homepage fields:

```text
hero_eyebrow: string
hero_title: string
hero_description: text
primary_cta: { label, href }
secondary_cta: { label, href }
vision_label: string
vision_title: string
vision_description: text
principles: list of { title, description }
featured_research_theme_slugs: list of research theme slugs
featured_publication_slugs: list of publication slugs
featured_project_slugs: list of project slugs
featured_people_slugs: list of people slugs
featured_gallery_slugs: list of gallery slugs
join_us_title: string
join_us_description: text
join_us_cta: { label, href }
```

Valid Site Settings fields:

```text
site_name: string
short_name: string
subtitle: string
tagline: string
description: text
logo_full: image path
logo_symbol: image path
favicon: image path
default_og_image: image path
email: valid email
contact_emails: list of valid emails
location: string
domain: url
social_links: list of { label, url }
google_form_url: url
preview_mode_note: text
```

Valid SEO fields:

```text
default_title: string
default_description: text
canonical_domain: url
noindex_routes: list of route paths
```

Valid Navigation fields:

```text
label: string
href: route path or external URL
order: number
visible: boolean
external: boolean
group: string, commonly main or cta
```

## Other Content

Research themes:

```text
content/research-themes/
```

Valid Research Theme fields:

```text
title: string
slug: slug
order: number
featured: boolean
summary: text
vision: text
scientific_questions: list of strings
cover_image: image path or ""
visual_type: scientific | framework | medical | theme
related_project_slugs: list of project slugs
related_publication_slugs: list of publication slugs
status: string
```

Projects:

```text
content/projects/
```

Valid Project fields:

```text
title: string
slug: slug
order: number
featured: boolean
status: active | completed | planned | archived
summary: text
problem_statement: text
research_direction: string
approach: text
cover_image: image path or ""
framework_figure: image path or ""
research_theme_slugs: list of research theme slugs
member_slugs: list of people slugs
links: list of { label, url }
start_date: YYYY-MM-DD
end_date: YYYY-MM-DD or ""
placeholder: boolean
```

News:

```text
content/news/
```

Valid News fields:

```text
title: string
slug: slug
date: YYYY-MM-DD
category: paper | member | conference | talk | award | lab | other
summary: text
description: text or ""
link_label: string or ""
link_url: url, internal path, or ""
order: number
featured: boolean
pinned: boolean
placeholder: boolean
```

Community:

```text
content/community/
```

Valid Community fields:

```text
title: string
slug: slug
order: number
featured: boolean
summary: text
description: text
cover_image: image path or ""
gallery_slugs: list of gallery slugs
placeholder: boolean
```

Opportunities:

```text
content/opportunities/
```

Valid Opportunity fields:

```text
title: string
slug: slug
order: number
status: open | closed | upcoming
audience: student | mentee | researcher | mentor | collaborator | other
summary: text
description: text
expectations: list of strings
learning_outcomes: list of strings
application_process: text
google_form_url: url
featured: boolean
placeholder: boolean
```

Gallery:

```text
content/gallery/
```

Valid Gallery fields:

```text
title: string
slug: slug
date: YYYY-MM-DD
category: conference | workshop | research-training | collaboration | group-photo | presentation | other
image: image path
caption: text
alt: text
order: number
featured: boolean
placeholder: boolean
```

## Important Rules

- Keep slugs lowercase.
- Do not use spaces in slugs.
- Image paths must start with `/uploads/...`.
- If you rename a slug, update every file that references that slug.
- After editing, check the deployed website after GitHub Pages finishes redeploying.
