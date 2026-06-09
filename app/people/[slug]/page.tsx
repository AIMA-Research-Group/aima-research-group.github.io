import { notFound } from "next/navigation";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";
import { PageContainer, PageHero, Section, SectionHeading } from "@/components/ui/Section";
import { ProjectCard, TagList } from "@/components/content/Cards";
import { getAllContent } from "@/lib/content/loaders";
import { withBasePath } from "@/lib/utils/paths";

export async function generateStaticParams() {
  const content = await getAllContent();
  return content.people.map((person) => ({ slug: person.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const content = await getAllContent();
  const person = content.people.find((item) => item.slug === slug);

  return {
    title: person?.name || "Member Profile",
    description: person?.short_bio,
    openGraph: person?.photo ? { images: [person.photo] } : undefined,
  };
}

export default async function PersonDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const content = await getAllContent();
  const person = content.people.find((item) => item.slug === slug);
  if (!person) notFound();

  const projects = content.projects.filter((project) => project.member_slugs.includes(person.slug));

  return (
    <>
      <SiteHeader site={content.site} navigation={content.navigation} />
      <main id="main-content">
        <PageHero eyebrow="Member profile" title={person.name} description={person.short_bio} />
        <Section className="pt-0">
          <PageContainer>
            <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
              <div>
                {person.photo ? (
                  <Image
                    src={withBasePath(person.photo)}
                    alt={`Portrait of ${person.name}`}
                    width={720}
                    height={720}
                    className="aspect-square w-full rounded-[24px] border border-[var(--border)] object-cover shadow-[var(--shadow-soft)]"
                  />
                ) : (
                  <div className="flex aspect-square w-full items-center justify-center rounded-[24px] border border-[var(--border)] bg-[var(--surface-muted)] text-6xl font-black text-[var(--aima-deep-blue)] shadow-[var(--shadow-soft)]">
                    {person.name.slice(0, 1)}
                  </div>
                )}
              </div>

              <div className="grid content-start gap-7">
                <div className="flex flex-wrap gap-2">
                  <Badge>{person.group}</Badge>
                  {person.active ? <Badge tone="teal">Active</Badge> : <Badge tone="muted">Inactive</Badge>}
                </div>
                <div>
                  <h2 className="text-2xl font-black">{person.role}</h2>
                  <p className="mt-2 text-[var(--text-secondary)]">{person.affiliation}</p>
                </div>
                <div>
                  <h2 className="text-2xl font-black">Biography</h2>
                  <p className="mt-3 leading-8 text-[var(--text-secondary)]">{person.full_bio}</p>
                </div>
                <div>
                  <h2 className="text-2xl font-black">Research interests</h2>
                  <div className="mt-4"><TagList tags={person.research_interests} /></div>
                </div>
                {person.links.length ? (
                  <div>
                    <h2 className="text-2xl font-black">Links</h2>
                    <div className="mt-4 flex flex-wrap gap-3">
                      {person.links.map((link) => (
                        <a key={link.label} href={withBasePath(link.url)} className="inline-flex items-center gap-2 font-bold text-[var(--aima-deep-blue)]">
                          {link.label}<ExternalLink className="h-4 w-4" />
                        </a>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </PageContainer>
        </Section>
        <Section className="bg-white">
          <PageContainer>
            <SectionHeading title="Related projects" />
            {projects.length ? <div className="grid gap-6 md:grid-cols-3">{projects.map((project) => <ProjectCard key={project.slug} project={project} />)}</div> : <EmptyState title="No related projects yet" description="Projects connected to this member will appear here." />}
          </PageContainer>
        </Section>
      </main>
      <SiteFooter site={content.site} navigation={content.navigation} />
    </>
  );
}
