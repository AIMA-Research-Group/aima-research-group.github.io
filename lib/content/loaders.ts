import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import YAML from "yaml";
import {
  communityNarrativeSchema,
  affiliationSchema,
  galleryImageSchema,
  homepageSchema,
  navigationItemSchema,
  opportunitySchema,
  personSchema,
  projectSchema,
  publicationSchema,
  researchThemeSchema,
  seoSettingsSchema,
  siteSettingsSchema,
  type CommunityNarrative,
  type Affiliation,
  type GalleryImage,
  type HomepageSettings,
  type NavigationItem,
  type Opportunity,
  type Person,
  type Project,
  type Publication,
  type ResearchTheme,
  type SeoSettings,
  type SiteSettings,
} from "@/lib/validation/schemas";
import { publicRecords } from "@/lib/utils/preview";

const contentRoot = path.join(process.cwd(), "content");

async function readYaml<T>(relativePath: string, schema: { parse: (value: unknown) => T }) {
  const raw = await fs.readFile(path.join(contentRoot, relativePath), "utf8");
  return schema.parse(YAML.parse(raw));
}

async function readCollection<T extends { order: number }>(folder: string, schema: { parse: (value: unknown) => T }) {
  const dir = path.join(contentRoot, folder);
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = entries.filter((entry) => entry.isFile() && /\.(ya?ml|md|mdx)$/.test(entry.name));
  const items = await Promise.all(
    files.map(async (file) => {
      const raw = await fs.readFile(path.join(dir, file.name), "utf8");
      const parsed = /\.(md|mdx)$/.test(file.name) ? matter(raw).data : YAML.parse(raw);
      return schema.parse(parsed);
    }),
  );
  return items.sort((a, b) => a.order - b.order);
}

export async function getSiteSettings(): Promise<SiteSettings> {
  return readYaml("settings/site.yml", siteSettingsSchema);
}

export async function getAllContent(options: { includePlaceholders?: boolean } = {}): Promise<{
  site: SiteSettings;
  seo: SeoSettings;
  navigation: NavigationItem[];
  homepage: HomepageSettings;
  researchThemes: ResearchTheme[];
  publications: Publication[];
  projects: Project[];
  people: Person[];
  affiliations: Affiliation[];
  community: CommunityNarrative[];
  gallery: GalleryImage[];
  opportunities: Opportunity[];
}> {
  const [site, seo, navigation, homepage, researchThemes, publications, projects, people, affiliations, community, gallery, opportunities] =
    await Promise.all([
      readYaml("settings/site.yml", siteSettingsSchema),
      readYaml("settings/seo.yml", seoSettingsSchema),
      readYaml("settings/navigation.yml", {
        parse: (value) => (value as unknown[]).map((item) => navigationItemSchema.parse(item)),
      }),
      readYaml("settings/homepage.yml", homepageSchema),
      readCollection("research-themes", researchThemeSchema),
      readCollection("publications", publicationSchema),
      readCollection("projects", projectSchema),
      readCollection("people", personSchema),
      readCollection("affiliations", affiliationSchema),
      readCollection("community", communityNarrativeSchema),
      readCollection("gallery", galleryImageSchema),
      readCollection("opportunities", opportunitySchema),
    ]);

  const maybePublic = <T extends { placeholder?: boolean }>(items: T[]) => options.includePlaceholders ? items : publicRecords(items);

  return {
    site,
    seo,
    navigation: navigation.filter((item) => item.visible).sort((a, b) => a.order - b.order),
    homepage,
    researchThemes,
    publications: maybePublic(publications),
    projects: maybePublic(projects),
    people: maybePublic(people),
    affiliations,
    community,
    gallery,
    opportunities,
  };
}

export function bySlugs<T extends { slug: string; featured?: boolean; order: number }>(items: T[], slugs: string[]) {
  const mapped = slugs.map((slug) => items.find((item) => item.slug === slug)).filter(Boolean) as T[];
  return mapped.length ? mapped : items.filter((item) => item.featured).sort((a, b) => a.order - b.order);
}
