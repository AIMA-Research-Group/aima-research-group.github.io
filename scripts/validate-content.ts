import fs from "node:fs";
import path from "node:path";
import { getAllContent } from "../lib/content/loaders";
import { isPreviewMode } from "../lib/utils/preview";

const publicRoot = path.join(process.cwd(), "public");
const errors: string[] = [];
const warnings: string[] = [];
const internalRoutes = new Set(["/", "/research", "/publications", "/projects", "/people", "/community", "/join-us", "/contact", "/admin"]);

function warn(message: string) { warnings.push(message); }
function fail(message: string) { errors.push(message); }

function duplicateSlugs(label: string, items: { slug: string }[]) {
  const seen = new Set<string>();
  for (const item of items) {
    if (seen.has(item.slug)) fail(`${label}: duplicate slug ${item.slug}`);
    seen.add(item.slug);
  }
}

function validUrl(label: string, value: string) {
  if (value.includes("[TODO:")) return warn(`${label}: placeholder URL`);
  if (value.startsWith("/")) return;
  try { new URL(value); } catch { fail(`${label}: invalid URL ${value}`); }
}

function validAsset(label: string, value?: string) {
  if (!value || value.startsWith("placeholder:")) return;
  if (!value.startsWith("/")) return fail(`${label}: image path must start with / or placeholder:`);
  const target = path.join(publicRoot, value.slice(1));
  if (!fs.existsSync(target)) fail(`${label}: missing asset ${value}`);
}

async function main() {
  const preview = isPreviewMode();
  const content = await getAllContent({ includePlaceholders: true });
  duplicateSlugs("research themes", content.researchThemes);
  duplicateSlugs("publications", content.publications);
  duplicateSlugs("projects", content.projects);
  duplicateSlugs("people", content.people);
  duplicateSlugs("community", content.community);
  duplicateSlugs("gallery", content.gallery);
  duplicateSlugs("opportunities", content.opportunities);

  const navOrders = new Set<number>();
  for (const item of content.navigation) {
    if (navOrders.has(item.order)) fail(`navigation: duplicate order ${item.order}`);
    navOrders.add(item.order);
    if (!item.external && !internalRoutes.has(item.href)) fail(`navigation: invalid internal link ${item.href}`);
  }

  validAsset("site.logo_full", content.site.logo_full);
  validAsset("site.logo_symbol", content.site.logo_symbol);
  validAsset("site.favicon", content.site.favicon);
  validAsset("site.default_og_image", content.site.default_og_image);
  validUrl("site.domain", content.site.domain);
  validUrl("site.google_form_url", content.site.google_form_url);
  content.site.social_links.forEach((link) => validUrl(`social.${link.label}`, link.url));

  const themeSlugs = new Set(content.researchThemes.map((item) => item.slug));
  const projectSlugs = new Set(content.projects.map((item) => item.slug));
  const publicationSlugs = new Set(content.publications.map((item) => item.slug));
  const personSlugs = new Set(content.people.map((item) => item.slug));
  const gallerySlugs = new Set(content.gallery.map((item) => item.slug));

  for (const theme of content.researchThemes) {
    validAsset(`theme.${theme.slug}.cover_image`, theme.cover_image);
    theme.related_project_slugs.forEach((slug) => !projectSlugs.has(slug) && fail(`theme.${theme.slug}: missing project ${slug}`));
    theme.related_publication_slugs.forEach((slug) => !publicationSlugs.has(slug) && fail(`theme.${theme.slug}: missing publication ${slug}`));
  }
  for (const project of content.projects) {
    validAsset(`project.${project.slug}.cover_image`, project.cover_image);
    validAsset(`project.${project.slug}.framework_figure`, project.framework_figure);
    project.research_theme_slugs.forEach((slug) => !themeSlugs.has(slug) && fail(`project.${project.slug}: missing theme ${slug}`));
    project.member_slugs.forEach((slug) => !personSlugs.has(slug) && fail(`project.${project.slug}: missing person ${slug}`));
    project.links.forEach((link) => validUrl(`project.${project.slug}.${link.label}`, link.url));
  }
  for (const publication of content.publications) {
    validAsset(`publication.${publication.slug}.thumbnail`, publication.thumbnail);
    publication.research_theme_slugs.forEach((slug) => !themeSlugs.has(slug) && fail(`publication.${publication.slug}: missing theme ${slug}`));
    publication.related_project_slugs.forEach((slug) => !projectSlugs.has(slug) && fail(`publication.${publication.slug}: missing project ${slug}`));
    publication.links.forEach((link) => validUrl(`publication.${publication.slug}.${link.label}`, link.url));
  }
  for (const person of content.people) {
    validAsset(`person.${person.slug}.photo`, person.photo);
    person.links.forEach((link) => validUrl(`person.${person.slug}.${link.label}`, link.url));
  }
  for (const narrative of content.community) {
    validAsset(`community.${narrative.slug}.cover_image`, narrative.cover_image);
    narrative.gallery_slugs.forEach((slug) => !gallerySlugs.has(slug) && fail(`community.${narrative.slug}: missing gallery image ${slug}`));
  }
  for (const image of content.gallery) validAsset(`gallery.${image.slug}.image`, image.image);
  for (const opportunity of content.opportunities) validUrl(`opportunity.${opportunity.slug}.google_form_url`, opportunity.google_form_url);

  if (!preview) {
    const placeholderCounts = {
      publications: content.publications.filter((item) => item.placeholder).length,
      projects: content.projects.filter((item) => item.placeholder).length,
      people: content.people.filter((item) => item.placeholder).length,
    };
    Object.entries(placeholderCounts).forEach(([label, count]) => count ? warn(`production mode: ${count} placeholder ${label} will be hidden`) : undefined);
  } else {
    warn("preview mode enabled: TODO placeholders are visible by design");
  }

  if (warnings.length) console.warn(`Content warnings:\n- ${warnings.join("\n- ")}`);
  if (errors.length) {
    console.error(`Content validation failed:\n- ${errors.join("\n- ")}`);
    process.exit(1);
  }
  console.log("Content validation passed.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
