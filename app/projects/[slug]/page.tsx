import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";
import { PageContainer, PageHero, Section, SectionHeading } from "@/components/ui/Section";
import { PersonCard, PublicationCard } from "@/components/content/Cards";
import { FrameworkDiagramPlaceholder } from "@/components/visual/ScientificPlaceholders";
import { getAllContent } from "@/lib/content/loaders";

export async function generateStaticParams() {
  const content = await getAllContent();
  return content.projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const content = await getAllContent();
  const project = content.projects.find((item) => item.slug === slug);
  return { title: project?.title || "Project", description: project?.summary };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const content = await getAllContent();
  const project = content.projects.find((item) => item.slug === slug);
  if (!project) notFound();
  const team = content.people.filter((person) => project.member_slugs.includes(person.slug));
  const themes = content.researchThemes.filter((theme) => project.research_theme_slugs.includes(theme.slug));
  const publications = content.publications.filter((publication) => publication.related_project_slugs.includes(project.slug));

  return (
    <>
      <SiteHeader site={content.site} navigation={content.navigation} />
      <main id="main-content">
        <PageHero eyebrow="Project" title={project.title} description={project.summary} />
        <Section className="pt-0">
          <PageContainer>
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
              <FrameworkDiagramPlaceholder />
              <div className="grid gap-7">
                <Badge>{project.status}</Badge>
                <div><h2 className="text-2xl font-black">Problem statement</h2><p className="mt-3 leading-8 text-[var(--text-secondary)]">{project.problem_statement}</p></div>
                <div><h2 className="text-2xl font-black">Research direction</h2><p className="mt-3 leading-8 text-[var(--text-secondary)]">{project.research_direction}</p></div>
                <div><h2 className="text-2xl font-black">Approach</h2><p className="mt-3 leading-8 text-[var(--text-secondary)]">{project.approach}</p></div>
                <div className="flex flex-wrap gap-2">{themes.map((theme) => <Badge key={theme.slug} tone="teal">{theme.title}</Badge>)}</div>
              </div>
            </div>
          </PageContainer>
        </Section>
        <Section className="bg-white"><PageContainer><SectionHeading title="Team" />{team.length ? <div className="grid gap-6 md:grid-cols-4">{team.map((person) => <PersonCard key={person.slug} person={person} />)}</div> : <EmptyState title="Team coming soon" description="Project team members will be added here." />}</PageContainer></Section>
        <Section><PageContainer><SectionHeading title="Related publications" />{publications.length ? <div className="grid gap-5">{publications.map((publication) => <PublicationCard key={publication.slug} publication={publication} />)}</div> : <EmptyState title="Related publications coming soon" description="Publication records will be connected here." />}</PageContainer></Section>
      </main>
      <SiteFooter site={content.site} navigation={content.navigation} />
    </>
  );
}
