import { AffiliationLogoGrid } from "@/components/content/Cards";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { PageContainer, PageHero, Section } from "@/components/ui/Section";
import { getAllContent } from "@/lib/content/loaders";

export const metadata = { title: "Affiliations" };

export default async function AffiliationsPage() {
  const content = await getAllContent();
  const affiliations = content.officialAffiliations
    .map((item) => content.affiliations.find((affiliation) => affiliation.slug === item.slug))
    .filter((affiliation): affiliation is NonNullable<typeof affiliation> => Boolean(affiliation?.logo));

  return (
    <>
      <SiteHeader site={content.site} navigation={content.navigation} />
      <main id="main-content">
        <PageHero
          eyebrow="Affiliations"
          title="Academic network"
          description="Institutions represented across AIMA's research community and collaborations."
        />
        <Section className="pt-0">
          <PageContainer>
            <AffiliationLogoGrid affiliations={affiliations} />
          </PageContainer>
        </Section>
      </main>
      <SiteFooter site={content.site} navigation={content.navigation} />
    </>
  );
}
