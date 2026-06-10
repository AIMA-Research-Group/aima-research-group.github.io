import { z } from "zod";

export const linkSchema = z.object({
  label: z.string().min(1),
  url: z.string().min(1),
});

export const ctaSchema = z.object({
  label: z.string().min(1),
  href: z.string().min(1),
});

export const siteSettingsSchema = z.object({
  site_name: z.string().min(1),
  short_name: z.string().min(1),
  subtitle: z.string().min(1),
  tagline: z.string().min(1),
  description: z.string().min(1),
  logo_full: z.string().min(1),
  logo_symbol: z.string().min(1),
  favicon: z.string().min(1),
  default_og_image: z.string().min(1),
  email: z.string().email(),
  contact_emails: z.array(z.string().email()).optional().default([]),
  location: z.string().min(1),
  domain: z.string().min(1),
  social_links: z.array(linkSchema),
  google_form_url: z.string().min(1),
  preview_mode_note: z.string().min(1),
});

export const seoSettingsSchema = z.object({
  default_title: z.string().min(1),
  default_description: z.string().min(1),
  canonical_domain: z.string().min(1),
  noindex_routes: z.array(z.string()),
});

export const navigationItemSchema = z.object({
  label: z.string().min(1),
  href: z.string().min(1),
  order: z.number(),
  visible: z.boolean(),
  external: z.boolean(),
  group: z.string().min(1),
});

export const homepageSchema = z.object({
  hero_eyebrow: z.string().min(1),
  hero_title: z.string().min(1),
  hero_description: z.string().min(1),
  primary_cta: ctaSchema,
  secondary_cta: ctaSchema,
  vision_label: z.string().min(1),
  vision_title: z.string().min(1),
  vision_description: z.string().min(1),
  principles: z.array(z.object({ title: z.string().min(1), description: z.string().min(1) })).min(1),
  featured_research_theme_slugs: z.array(z.string()),
  featured_publication_slugs: z.array(z.string()),
  featured_project_slugs: z.array(z.string()),
  featured_people_slugs: z.array(z.string()),
  featured_gallery_slugs: z.array(z.string()),
  join_us_title: z.string().min(1),
  join_us_description: z.string().min(1),
  join_us_cta: ctaSchema,
});

export const researchThemeSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  order: z.number(),
  featured: z.boolean(),
  summary: z.string().min(1),
  vision: z.string().min(1),
  scientific_questions: z.array(z.string()).min(1),
  cover_image: z.string().optional().default(""),
  visual_type: z.enum(["scientific", "framework", "medical", "theme"]),
  related_project_slugs: z.array(z.string()),
  related_publication_slugs: z.array(z.string()),
  status: z.string().min(1),
});

export const publicationSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  year: z.number(),
  authors: z.union([
    z.array(z.string()).min(1),
    z.string().min(1).transform((value) => value.split(",").map((author) => author.trim()).filter(Boolean)),
  ]),
  venue: z.string().min(1),
  publication_type: z.enum(["journal", "conference", "preprint", "workshop", "poster", "thesis", "other"]),
  abstract: z.string().optional().default(""),
  impact_factor: z.string().optional().default(""),
  badges: z.array(z.enum(["Oral", "Highlight", "Best Paper Award"])).optional().default([]),
  thumbnail: z.string().optional().default(""),
  figure: z.string().optional().default(""),
  media_type: z.enum(["image", "gif", "none"]).optional().default("none"),
  research_theme_slugs: z.array(z.string()),
  related_project_slugs: z.array(z.string()),
  links: z.array(linkSchema),
  featured: z.boolean(),
  order: z.number().optional().default(0),
  status: z.string().min(1),
  placeholder: z.boolean(),
});

export const projectSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  order: z.number(),
  featured: z.boolean(),
  status: z.enum(["active", "completed", "planned", "archived"]),
  summary: z.string().min(1),
  problem_statement: z.string().min(1),
  research_direction: z.string().min(1),
  approach: z.string().min(1),
  cover_image: z.string().optional().default(""),
  framework_figure: z.string().optional().default(""),
  research_theme_slugs: z.array(z.string()),
  member_slugs: z.array(z.string()),
  links: z.array(linkSchema),
  start_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  end_date: z.string().optional().or(z.literal("")).default(""),
  placeholder: z.boolean(),
});

export const newsItemSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  category: z.enum(["paper", "member", "conference", "talk", "award", "lab", "other"]),
  summary: z.string().min(1),
  description: z.string().optional().default(""),
  link_label: z.string().optional().default(""),
  link_url: z.string().optional().default(""),
  order: z.number(),
  featured: z.boolean(),
  pinned: z.boolean(),
  placeholder: z.boolean(),
});

export const personSchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  order: z.number(),
  featured: z.boolean(),
  group: z.enum(["founder", "leader", "mentor", "core-member", "collaborator", "affiliated-faculty"]),
  role: z.string().min(1),
  affiliation: z.string().min(1),
  affiliation_slugs: z.array(z.string()).optional().default([]),
  short_bio: z.string().min(1),
  full_bio: z.string().min(1),
  research_interests: z.array(z.string()),
  photo: z.string().optional().default(""),
  links: z.array(linkSchema),
  active: z.boolean(),
  placeholder: z.boolean(),
});

export const affiliationSchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  logo: z.string().optional().default(""),
  url: z.string().optional().default(""),
  location: z.string().min(1),
});

export const officialAffiliationSchema = z.object({
  slug: z.string().min(1),
  order: z.number(),
});

export const communityNarrativeSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  order: z.number(),
  featured: z.boolean(),
  summary: z.string().min(1),
  description: z.string().min(1),
  cover_image: z.string().optional().default(""),
  gallery_slugs: z.array(z.string()),
  placeholder: z.boolean(),
});

export const galleryImageSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  category: z.enum(["conference", "workshop", "research-training", "collaboration", "group-photo", "presentation", "other"]),
  image: z.string().min(1),
  caption: z.string().min(1),
  alt: z.string().min(1),
  order: z.number(),
  featured: z.boolean(),
  placeholder: z.boolean(),
});

export const opportunitySchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  order: z.number(),
  status: z.enum(["open", "closed", "upcoming"]),
  audience: z.enum(["student", "mentee", "researcher", "mentor", "collaborator", "other"]),
  summary: z.string().min(1),
  description: z.string().min(1),
  expectations: z.array(z.string()),
  learning_outcomes: z.array(z.string()),
  application_process: z.string().min(1),
  google_form_url: z.string().min(1),
  featured: z.boolean(),
  placeholder: z.boolean(),
});

export type SiteSettings = z.infer<typeof siteSettingsSchema>;
export type SeoSettings = z.infer<typeof seoSettingsSchema>;
export type NavigationItem = z.infer<typeof navigationItemSchema>;
export type HomepageSettings = z.infer<typeof homepageSchema>;
export type ResearchTheme = z.infer<typeof researchThemeSchema>;
export type Publication = z.infer<typeof publicationSchema>;
export type Project = z.infer<typeof projectSchema>;
export type NewsItem = z.infer<typeof newsItemSchema>;
export type Person = z.infer<typeof personSchema>;
export type Affiliation = z.infer<typeof affiliationSchema>;
export type OfficialAffiliation = z.infer<typeof officialAffiliationSchema>;
export type CommunityNarrative = z.infer<typeof communityNarrativeSchema>;
export type GalleryImage = z.infer<typeof galleryImageSchema>;
export type Opportunity = z.infer<typeof opportunitySchema>;
