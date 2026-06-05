import { notFound } from "next/navigation";
import Image from "next/image";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { PageContainer, PageHero, Section, SectionHeading } from "@/components/ui/Section";
import { ProjectCard, PublicationCard } from "@/components/content/Cards";
import { getAllContent } from "@/lib/content/loaders";
import { withBasePath } from "@/lib/utils/paths";

export async function generateStaticParams() {
  const content = await getAllContent();
  return content.researchThemes.map((theme) => ({ slug: theme.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const content = await getAllContent();
  const theme = content.researchThemes.find((item) => item.slug === slug);
  return { title: theme?.title || "Research Theme", description: theme?.summary };
}

export default async function ResearchThemePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const content = await getAllContent();
  const theme = content.researchThemes.find((item) => item.slug === slug);
  if (!theme) notFound();
  const projects = content.projects.filter((project) => project.research_theme_slugs.includes(theme.slug));
  const publications = content.publications.filter((publication) => publication.research_theme_slugs.includes(theme.slug));

  return (
    <>
      <SiteHeader site={content.site} navigation={content.navigation} />
      <main id="main-content">
        <PageHero eyebrow="Research theme" title={theme.title} description={theme.summary} />
        <Section className="pt-0">
          <PageContainer>
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
              {theme.cover_image ? (
                <Image
                  src={withBasePath(theme.cover_image)}
                  alt={`${theme.title} visual summary`}
                  width={1100}
                  height={700}
                  className="aspect-[4/3] w-full rounded-[24px] border border-[var(--border)] object-cover shadow-[var(--shadow-soft)]"
                />
              ) : null}
              <div>
                <SectionHeading title="Theme vision" description={theme.vision} />
                <h2 className="text-2xl font-black">Scientific questions</h2>
                <ul className="mt-4 grid gap-3 text-[var(--text-secondary)]">{theme.scientific_questions.map((question) => <li key={question}>• {question}</li>)}</ul>
              </div>
            </div>
          </PageContainer>
        </Section>
        <Section className="bg-white">
          <PageContainer>
            <SectionHeading title="Related projects" />
            {projects.length ? <div className="grid gap-6 md:grid-cols-3">{projects.map((project) => <ProjectCard key={project.slug} project={project} />)}</div> : <EmptyState title="No related projects yet" description="Related projects will appear here." />}
          </PageContainer>
        </Section>
        <Section>
          <PageContainer>
            <SectionHeading title="Related publications" />
            {publications.length ? <div className="grid gap-5">{publications.map((publication) => <PublicationCard key={publication.slug} publication={publication} />)}</div> : <EmptyState title="No related publications yet" description="Selected publications will be added shortly." />}
            <div className="mt-10"><Button href="/join-us">Collaborate or Join Us</Button></div>
          </PageContainer>
        </Section>
      </main>
      <SiteFooter site={content.site} navigation={content.navigation} />
    </>
  );
}
