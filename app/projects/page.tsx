import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { ProjectsBrowser } from "@/components/content/FilteredCollections";
import { PageContainer, PageHero, Section } from "@/components/ui/Section";
import { getAllContent } from "@/lib/content/loaders";

export const metadata = { title: "Projects" };

export default async function ProjectsPage() {
  const content = await getAllContent();
  return (
    <>
      <SiteHeader site={content.site} navigation={content.navigation} />
      <main id="main-content">
        <PageHero eyebrow="Projects" title="Active research projects" description="Explore current, planned, and completed AIMA projects." />
        <Section className="pt-0"><PageContainer><ProjectsBrowser projects={content.projects} themes={content.researchThemes} /></PageContainer></Section>
      </main>
      <SiteFooter site={content.site} navigation={content.navigation} />
    </>
  );
}
