import type { MetadataRoute } from "next";
import { getAllContent } from "@/lib/content/loaders";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const content = await getAllContent();
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";
  const staticRoutes = ["/", "/research", "/publications", "/projects", "/people", "/community", "/join-us", "/contact"];
  const dynamicRoutes = [
    ...content.researchThemes.map((item) => `/research/${item.slug}`),
    ...content.projects.map((item) => `/projects/${item.slug}`),
  ];
  return [...staticRoutes, ...dynamicRoutes].map((route) => ({ url: `${base}${route}`, lastModified: new Date() }));
}
