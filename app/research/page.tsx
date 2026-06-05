import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { PageContainer, PageHero, Section, SectionHeading } from "@/components/ui/Section";
import { ResearchThemeCard } from "@/components/content/Cards";
import { getAllContent } from "@/lib/content/loaders";

export const metadata = { title: "Research" };

export default async function ResearchPage() {
  const content = await getAllContent();
  return (
    <>
      <SiteHeader site={content.site} navigation={content.navigation} />
      <main id="main-content">
        <PageHero eyebrow="Research" title="AIMA research vision and themes" description="AIMA's research structure is organized around provisional themes that will be replaced with official lab directions as real content is added." />
        <Section className="pt-0">
          <PageContainer>
            <SectionHeading title={content.homepage.vision_title} description={content.homepage.vision_description} />
            {content.researchThemes.length ? <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">{content.researchThemes.map((theme) => <ResearchThemeCard key={theme.slug} theme={theme} projectCount={theme.related_project_slugs.length} publicationCount={theme.related_publication_slugs.length} />)}</div> : <EmptyState title="Research themes coming soon" description="Official AIMA research themes will be added shortly." />}
            <div className="mt-10 flex flex-wrap gap-3"><Button href="/publications">View Publications</Button><Button href="/projects" variant="secondary">View Projects</Button></div>
          </PageContainer>
        </Section>
      </main>
      <SiteFooter site={content.site} navigation={content.navigation} />
    </>
  );
}
