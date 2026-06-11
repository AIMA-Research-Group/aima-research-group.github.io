import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Button } from "@/components/ui/Button";
import { ContentPlaceholder } from "@/components/ui/ContentPlaceholder";
import { EmptyState } from "@/components/ui/EmptyState";
import { PageContainer, PageHero, Section, SectionHeading } from "@/components/ui/Section";
import { OpportunityCard } from "@/components/content/Cards";
import { getAllContent } from "@/lib/content/loaders";
import { isPreviewMode } from "@/lib/utils/preview";
import { Mail } from "lucide-react";

export const metadata = { title: "Join Us" };

export default async function JoinUsPage() {
  const content = await getAllContent();
  const preview = isPreviewMode();
  const primaryOpportunity = content.opportunities[0];
  const formUrl = primaryOpportunity?.google_form_url || content.site.google_form_url;
  const hasForm = !formUrl.includes("[TODO:");
  const contactCards = [
    { label: "AIMA Research", email: "aima.research.aivn@gmail.com" },
    { label: "Thanh-Huy Nguyen", email: "thanhnguyen2031@u.northwestern.edu" },
  ];
  return (
    <>
      <SiteHeader site={content.site} navigation={content.navigation} />
      <main id="main-content">
        <PageHero eyebrow="Join Us" title="Work with us" description="Join a research community that values scientific rigor, collaboration, and meaningful learning." />
        <Section className="bg-white pt-0"><PageContainer><SectionHeading title="Open opportunities" />{content.opportunities.length ? <div className="grid gap-6 md:grid-cols-2">{content.opportunities.map((item) => <OpportunityCard key={item.slug} opportunity={item} />)}</div> : <EmptyState title="New opportunities will be announced here" description="Check back later or use the contact fallback." />}</PageContainer></Section>
        <Section>
          <PageContainer>
            <div className="rounded-[28px] border border-[var(--border)] bg-white p-7 shadow-[var(--shadow-soft)] md:p-9">
              <div className="grid gap-7 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
                <div>
                  <SectionHeading title="Contact Information" description={primaryOpportunity?.application_process || "Contact information will be added soon."} />
                  {hasForm ? <Button href={formUrl}>Open Google Form</Button> : preview ? <p className="font-bold text-[var(--aima-deep-blue)]"><ContentPlaceholder value={formUrl} /></p> : <Button href="/contact">Contact AIMA</Button>}
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  {contactCards.map((contact) => (
                    <a
                      key={contact.email}
                      href={`mailto:${contact.email}`}
                      className="group rounded-2xl border border-[var(--aima-soft-blue)] bg-[var(--surface-muted)] p-5 transition hover:-translate-y-0.5 hover:border-[var(--aima-blue)] hover:bg-white hover:shadow-[var(--shadow-soft)]"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--aima-soft-blue)] text-[var(--aima-deep-blue)]">
                        <Mail className="h-5 w-5" />
                      </div>
                      <p className="mt-4 text-sm font-black uppercase text-[var(--text-muted)]">{contact.label}</p>
                      <p className="mt-1 break-all text-base font-black text-[var(--aima-deep-blue)] group-hover:underline">{contact.email}</p>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </PageContainer>
        </Section>
      </main>
      <SiteFooter site={content.site} navigation={content.navigation} />
    </>
  );
}
