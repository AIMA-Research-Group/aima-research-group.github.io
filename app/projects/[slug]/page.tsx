import { notFound } from "next/navigation";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";
import { PageContainer, PageHero, Section, SectionHeading } from "@/components/ui/Section";
import { PersonCard, PublicationCard } from "@/components/content/Cards";
import { getAllContent } from "@/lib/content/loaders";
import { withBasePath } from "@/lib/utils/paths";

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
  const visual = project.framework_figure || project.cover_image;

  return (
    <>
      <SiteHeader site={content.site} navigation={content.navigation} />
      <main id="main-content">
        <PageHero eyebrow="Project" title={project.title} description={project.summary} />
        <Section className="pt-0">
          <PageContainer>
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
              {visual ? (
                <Image
                  src={withBasePath(visual)}
                  alt={`${project.title} visual summary`}
                  width={1100}
                  height={700}
                  className="aspect-[4/3] w-full rounded-[24px] border border-[var(--border)] object-cover shadow-[var(--shadow-soft)]"
                />
              ) : null}
              <div className="grid gap-7">
                <Badge>{project.status}</Badge>
                <div><h2 className="text-2xl font-black">Problem statement</h2><p className="mt-3 leading-8 text-[var(--text-secondary)]">{project.problem_statement}</p></div>
                <div><h2 className="text-2xl font-black">Research direction</h2><p className="mt-3 leading-8 text-[var(--text-secondary)]">{project.research_direction}</p></div>
                <div><h2 className="text-2xl font-black">Approach</h2><p className="mt-3 leading-8 text-[var(--text-secondary)]">{project.approach}</p></div>
                <div className="flex flex-wrap gap-2">{themes.map((theme) => <Badge key={theme.slug} tone="teal">{theme.title}</Badge>)}</div>
                {project.links.length ? (
                  <div className="flex flex-wrap gap-3">
                    {project.links.map((link) => (
                      <a key={link.label} href={withBasePath(link.url)} className="inline-flex items-center gap-2 font-bold text-[var(--aima-deep-blue)]">
                        {link.label}<ExternalLink className="h-4 w-4" />
                      </a>
                    ))}
                  </div>
                ) : null}
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
