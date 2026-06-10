import { notFound } from "next/navigation";
import Image from "next/image";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";
import { PageContainer, Section, SectionHeading } from "@/components/ui/Section";
import { ProjectCard, SocialIconLinks, TagList } from "@/components/content/Cards";
import { getAllContent } from "@/lib/content/loaders";
import { withBasePath } from "@/lib/utils/paths";
import type { Affiliation } from "@/lib/validation/schemas";

function normalizeAffiliation(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function findAffiliationLogo(personAffiliation: string, affiliations: Affiliation[]) {
  const normalizedPersonAffiliation = normalizeAffiliation(personAffiliation);
  const aliases: Record<string, string[]> = {
    hcmut: ["ho chi minh university of science"],
    ptit: ["posts and telecommunications institute of technology"],
    "unc-charlotte": ["university of north carolina at charlotte"],
    "university-of-wisconsin-madison": ["university of wisconsin madison"],
  };

  return affiliations.find((affiliation) => {
    if (!affiliation.logo) return false;
    const normalizedName = normalizeAffiliation(affiliation.name);
    const normalizedAliases = (aliases[affiliation.slug] || []).map(normalizeAffiliation);
    return [normalizedName, ...normalizedAliases].some((name) => normalizedPersonAffiliation.includes(name));
  });
}

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
  const affiliationLogo = findAffiliationLogo(person.affiliation, content.affiliations);

  return (
    <>
      <SiteHeader site={content.site} navigation={content.navigation} />
      <main id="main-content">
        <Section className="pb-12 pt-28">
          <PageContainer>
            <div className={`grid gap-8 ${affiliationLogo ? "lg:grid-cols-[minmax(0,1fr)_340px] lg:items-center" : ""}`}>
              <div className="max-w-4xl">
                <p className="mb-4 text-sm font-black uppercase tracking-[0.18em] text-[var(--aima-deep-blue)]">Member profile</p>
                <h1 className="font-[var(--font-serif)] text-5xl font-bold leading-tight text-[var(--text-primary)] md:text-6xl">{person.name}</h1>
                <p className="mt-5 max-w-3xl text-lg font-medium leading-8 text-[var(--text-primary)]">{person.short_bio}</p>
              </div>
              {affiliationLogo ? (
                <div className="pointer-events-none flex justify-start opacity-90 lg:justify-end">
                  <Image
                    src={withBasePath(affiliationLogo.logo)}
                    alt={`${affiliationLogo.name} logo`}
                    width={460}
                    height={230}
                    className="max-h-36 w-full max-w-[320px] object-contain md:max-h-44 lg:max-w-[340px]"
                    priority
                  />
                </div>
              ) : null}
            </div>
          </PageContainer>
        </Section>
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
                  <p className="mt-3 inline-flex rounded-xl border border-[var(--aima-soft-blue)] bg-white px-4 py-2 text-sm font-black leading-5 text-[var(--aima-deep-blue)] shadow-sm">{person.affiliation}</p>
                </div>
                <div>
                  <h2 className="text-2xl font-black">Biography</h2>
                  <p className="mt-3 font-medium leading-8 text-[var(--text-primary)]">{person.full_bio}</p>
                </div>
                <div>
                  <h2 className="text-2xl font-black">Research interests</h2>
                  <div className="mt-4"><TagList tags={person.research_interests} /></div>
                </div>
                {person.links.length ? (
                  <div>
                    <h2 className="text-2xl font-black">Links</h2>
                    <div className="mt-4"><SocialIconLinks links={person.links} /></div>
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
