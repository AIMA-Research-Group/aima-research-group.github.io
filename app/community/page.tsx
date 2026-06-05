import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Button } from "@/components/ui/Button";
import { PageContainer, PageHero, Section, SectionHeading } from "@/components/ui/Section";
import { CommunityNarrativeCard, GalleryGrid } from "@/components/content/Cards";
import { getAllContent } from "@/lib/content/loaders";

export const metadata = { title: "Community" };

export default async function CommunityPage() {
  const content = await getAllContent();
  return (
    <>
      <SiteHeader site={content.site} navigation={content.navigation} />
      <main id="main-content">
        <PageHero eyebrow="Community" title="Beyond the papers" description="Research grows through collaboration, mentorship, training, and the shared journey behind every publication." />
        <Section className="pt-0"><PageContainer><div className="grid gap-6 md:grid-cols-3">{content.community.map((item) => <CommunityNarrativeCard key={item.slug} narrative={item} />)}</div></PageContainer></Section>
        <Section className="bg-white"><PageContainer><SectionHeading title="Community gallery" description="Authentic research and community photography will become the visual foundation for this page." /><GalleryGrid images={content.gallery} /></PageContainer></Section>
        <Section><PageContainer><div className="surface-card p-8 md:p-10"><h2 className="text-3xl font-black">Build research with us</h2><p className="mt-3 max-w-2xl text-[var(--text-secondary)]">AIMA welcomes people who value careful reading, rigorous experimentation, and collaborative growth.</p><div className="mt-6"><Button href="/join-us">Explore Opportunities</Button></div></div></PageContainer></Section>
      </main>
      <SiteFooter site={content.site} navigation={content.navigation} />
    </>
  );
}
