import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Button } from "@/components/ui/Button";
import { ContentPlaceholder } from "@/components/ui/ContentPlaceholder";
import { EmptyState } from "@/components/ui/EmptyState";
import { PageContainer, PageHero, Section, SectionHeading } from "@/components/ui/Section";
import { OpportunityCard } from "@/components/content/Cards";
import { getAllContent } from "@/lib/content/loaders";
import { isPreviewMode } from "@/lib/utils/preview";

export const metadata = { title: "Join Us" };

export default async function JoinUsPage() {
  const content = await getAllContent();
  const preview = isPreviewMode();
  const formUrl = content.site.google_form_url;
  const hasForm = !formUrl.includes("[TODO:");
  const contactEmails = content.site.contact_emails.length ? content.site.contact_emails : [content.site.email];
  return (
    <>
      <SiteHeader site={content.site} navigation={content.navigation} />
      <main id="main-content">
        <PageHero eyebrow="Join Us" title="Work with us" description="Join a research community that values scientific rigor, collaboration, and meaningful learning." />
        <Section className="pt-0">
          <PageContainer>
            <div className="grid gap-6 lg:grid-cols-3">
              {["Why join AIMA", "Who should apply", "What you can learn"].map((title) => <article key={title} className="surface-card p-6"><h2 className="text-2xl font-black">{title}</h2><p className="mt-3 leading-7 text-[var(--text-secondary)]">AIMA is for people who want to learn serious research practice: careful reading, strong questions, reproducible experiments, critique, and clear writing.</p></article>)}
            </div>
          </PageContainer>
        </Section>
        <Section className="bg-white"><PageContainer><SectionHeading title="Open opportunities" />{content.opportunities.length ? <div className="grid gap-6 md:grid-cols-2">{content.opportunities.map((item) => <OpportunityCard key={item.slug} opportunity={item} />)}</div> : <EmptyState title="New opportunities will be announced here" description="Check back later or use the contact fallback." />}</PageContainer></Section>
        <Section>
          <PageContainer>
            <div className="surface-card p-8 md:p-10">
              <SectionHeading title="Application process" description={content.opportunities[0]?.application_process || "Application process will be added soon."} />
              {hasForm ? <Button href={formUrl}>Open Google Form</Button> : preview ? <p className="font-bold text-[var(--aima-deep-blue)]"><ContentPlaceholder value={formUrl} /></p> : <Button href="/contact">Contact AIMA</Button>}
              <div className="mt-6 grid gap-2 text-[var(--text-secondary)]">
                {contactEmails.map((email) => <a key={email} className="font-bold text-[var(--aima-deep-blue)]" href={`mailto:${email}`}>{email}</a>)}
              </div>
            </div>
          </PageContainer>
        </Section>
      </main>
      <SiteFooter site={content.site} navigation={content.navigation} />
    </>
  );
}
