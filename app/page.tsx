import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Button } from "@/components/ui/Button";
import { ContentPlaceholder } from "@/components/ui/ContentPlaceholder";
import { PageContainer, Section, SectionHeading } from "@/components/ui/Section";
import { ScientificHeroCanvas } from "@/components/visual/ScientificPlaceholders";
import { AffiliationLogoGrid, CommunityNarrativeCard, GalleryGrid, PersonCard, ProjectCard, PublicationCard, ResearchThemeCard } from "@/components/content/Cards";
import { bySlugs, getAllContent } from "@/lib/content/loaders";

export default async function HomePage() {
  const content = await getAllContent();
  const themes = bySlugs(content.researchThemes, content.homepage.featured_research_theme_slugs);
  const publications = bySlugs(content.publications, content.homepage.featured_publication_slugs);
  const projects = bySlugs(content.projects, content.homepage.featured_project_slugs);
  const people = bySlugs(content.people, content.homepage.featured_people_slugs);
  const gallery = bySlugs(content.gallery, content.homepage.featured_gallery_slugs);

  return (
    <>
      <SiteHeader site={content.site} navigation={content.navigation} />
      <main id="main-content">
        <Section className="pt-32">
          <PageContainer>
            <div className="grid items-center gap-12 lg:grid-cols-[1fr_0.9fr]">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--aima-deep-blue)]">{content.homepage.hero_eyebrow}</p>
                <h1 className="mt-5 font-[var(--font-serif)] text-[clamp(2.8rem,7vw,5rem)] font-bold leading-[1.02]">{content.homepage.hero_title}</h1>
                <p className="mt-6 max-w-2xl text-xl leading-9 text-[var(--text-secondary)]">{content.homepage.hero_description}</p>
                <div className="mt-8 flex flex-wrap gap-3"><Button href={content.homepage.primary_cta.href}>{content.homepage.primary_cta.label}</Button><Button href={content.homepage.secondary_cta.href} variant="secondary">{content.homepage.secondary_cta.label}</Button></div>
                <p className="mt-6 text-sm font-bold text-[var(--text-muted)]">Scientific Humanist Lab · rigorous, collaborative, evidence-driven AI research</p>
              </div>
              <ScientificHeroCanvas />
            </div>
          </PageContainer>
        </Section>

        <Section>
          <PageContainer>
            <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--aima-deep-blue)]">{content.homepage.vision_label}</p>
              <div>
                <h2 className="font-[var(--font-serif)] text-[clamp(2.2rem,5vw,4rem)] font-bold leading-tight">{content.homepage.vision_title}</h2>
                <p className="mt-6 text-xl leading-9 text-[var(--text-secondary)]"><ContentPlaceholder value={content.homepage.vision_description} fallback="AIMA's full research vision will be added shortly." /></p>
                <div className="mt-10 grid gap-4 md:grid-cols-3">
                  {content.homepage.principles.map((principle) => <article key={principle.title} className="border-t border-[var(--border)] pt-5"><h3 className="text-xl font-black">{principle.title}</h3><p className="mt-3 leading-7 text-[var(--text-secondary)]">{principle.description}</p></article>)}
                </div>
              </div>
            </div>
          </PageContainer>
        </Section>

        <Section className="bg-white">
          <PageContainer>
            <SectionHeading eyebrow="Research themes" title="Scientific questions that shape the lab." description="These provisional themes establish the structure for AIMA's future research content." />
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">{themes.map((theme) => <ResearchThemeCard key={theme.slug} theme={theme} projectCount={theme.related_project_slugs.length} publicationCount={theme.related_publication_slugs.length} />)}</div>
          </PageContainer>
        </Section>

        <Section>
          <PageContainer>
            <SectionHeading eyebrow="Selected publications" title="Research outputs will anchor the site." description="Placeholder records are visible only in preview mode and are hidden from production mode." />
            <div className="grid gap-5">{publications.map((publication) => <PublicationCard key={publication.slug} publication={publication} />)}</div>
          </PageContainer>
        </Section>

        <Section className="bg-white">
          <PageContainer>
            <SectionHeading eyebrow="Featured projects" title="Active work with clear scientific direction." />
            <div className="grid gap-6 md:grid-cols-3">{projects.map((project) => <ProjectCard key={project.slug} project={project} />)}</div>
          </PageContainer>
        </Section>

        <Section>
          <PageContainer>
            <SectionHeading eyebrow="People" title="People behind the research." description="Founder, mentors, core members, and collaborators will appear here once real profiles are added." />
            <div className="grid gap-6 md:grid-cols-4">{people.map((person) => <PersonCard key={person.slug} person={person} />)}</div>
            <div className="mt-8"><Button href="/people" variant="secondary">Meet the Research Community</Button></div>
          </PageContainer>
        </Section>

        <Section className="bg-white">
          <PageContainer>
            <SectionHeading
              eyebrow="Academic network"
              title="Affiliations across the research community."
              description="AIMA connects students, mentors, collaborators, and affiliated faculty across universities and medical institutions."
            />
            <AffiliationLogoGrid affiliations={content.affiliations.filter((affiliation) => affiliation.featured)} />
          </PageContainer>
        </Section>

        <Section className="bg-white">
          <PageContainer>
            <SectionHeading eyebrow="Beyond the papers" title="Research grows through collaboration, mentorship, training, and the shared journey behind every publication." />
            <div className="grid gap-6 md:grid-cols-3">{content.community.map((item) => <CommunityNarrativeCard key={item.slug} narrative={item} />)}</div>
            <div className="mt-8"><GalleryGrid images={gallery} /></div>
          </PageContainer>
        </Section>

        <Section>
          <PageContainer>
            <div className="rounded-[28px] bg-[var(--aima-deep-blue)] p-8 text-white md:p-12">
              <h2 className="font-[var(--font-serif)] text-5xl font-bold">{content.homepage.join_us_title}</h2>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-white/80">{content.homepage.join_us_description}</p>
              <div className="mt-7"><Button href={content.homepage.join_us_cta.href} variant="secondary">{content.homepage.join_us_cta.label}</Button></div>
            </div>
          </PageContainer>
        </Section>
      </main>
      <SiteFooter site={content.site} navigation={content.navigation} />
    </>
  );
}
