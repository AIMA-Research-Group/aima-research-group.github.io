import { ExternalLink } from "lucide-react";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Button } from "@/components/ui/Button";
import { ContentPlaceholder } from "@/components/ui/ContentPlaceholder";
import { PageContainer, PageHero, Section } from "@/components/ui/Section";
import { getAllContent } from "@/lib/content/loaders";

export const metadata = { title: "Contact" };

export default async function ContactPage() {
  const content = await getAllContent();
  return (
    <>
      <SiteHeader site={content.site} navigation={content.navigation} />
      <main id="main-content">
        <PageHero eyebrow="Contact" title="Collaborate with AIMA" description="Use direct email for collaboration inquiries, research mentorship questions, and Join Us fallback contact." />
        <Section className="pt-0">
          <PageContainer>
            <div className="grid gap-6 md:grid-cols-2">
              <article className="surface-card p-6"><h2 className="text-2xl font-black">Email</h2><p className="mt-3 text-[var(--text-secondary)]">{content.site.email}</p><p className="mt-3 text-[var(--text-secondary)]"><ContentPlaceholder value={content.site.location} fallback="Location will be added soon." /></p></article>
              <article className="surface-card p-6"><h2 className="text-2xl font-black">Social links</h2><div className="mt-4 grid gap-3">{content.site.social_links.map((link) => <span key={link.label} className="inline-flex items-center gap-2 font-bold text-[var(--aima-deep-blue)]">{link.label}<ExternalLink className="h-4 w-4" /></span>)}</div></article>
            </div>
            <div className="mt-8 surface-card p-6"><h2 className="text-2xl font-black">Inquiry guidance</h2><p className="mt-3 leading-7 text-[var(--text-secondary)]">For collaboration inquiries, include a concise research context, relevant links, and the specific scientific question or mentorship topic you want to discuss.</p><div className="mt-5"><Button href="/join-us">Join Us</Button></div></div>
          </PageContainer>
        </Section>
      </main>
      <SiteFooter site={content.site} navigation={content.navigation} />
    </>
  );
}
