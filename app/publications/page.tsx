import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { PublicationsBrowser } from "@/components/content/FilteredCollections";
import { PageContainer, PageHero, Section } from "@/components/ui/Section";
import { getAllContent } from "@/lib/content/loaders";

export const metadata = { title: "Publications" };

export default async function PublicationsPage() {
  const content = await getAllContent();
  return (
    <>
      <SiteHeader site={content.site} navigation={content.navigation} />
      <main id="main-content">
        <PageHero eyebrow="Publications" title="Selected publications" description="Search and filter AIMA publications by year, research theme, and publication type." />
        <Section className="pt-0"><PageContainer><PublicationsBrowser publications={content.publications} themes={content.researchThemes} /></PageContainer></Section>
      </main>
      <SiteFooter site={content.site} navigation={content.navigation} />
    </>
  );
}
