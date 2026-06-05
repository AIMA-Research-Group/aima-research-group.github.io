import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { EmptyState } from "@/components/ui/EmptyState";
import { PageContainer, PageHero, Section, SectionHeading } from "@/components/ui/Section";
import { PersonCard } from "@/components/content/Cards";
import { getAllContent } from "@/lib/content/loaders";

export const metadata = { title: "People" };

const groups = [
  ["founder", "Founder"],
  ["leader", "Leaders"],
  ["mentor", "Mentor"],
  ["core-member", "Core Member"],
  ["collaborator", "Collaborator"],
  ["affiliated-faculty", "Affiliated Faculty"],
] as const;

export default async function PeoplePage() {
  const content = await getAllContent();
  return (
    <>
      <SiteHeader site={content.site} navigation={content.navigation} />
      <main id="main-content">
        <PageHero eyebrow="People" title="The research community behind AIMA" description="AIMA brings together leaders, mentors, collaborators, affiliated faculty, and research members across institutions." />
        {groups.map(([key, label]) => {
          const people = content.people.filter((person) => person.group === key);
          return <Section key={key} className="py-12"><PageContainer><SectionHeading title={label} />{people.length ? <div className="grid gap-6 md:grid-cols-4">{people.map((person) => <PersonCard key={person.slug} person={person} />)}</div> : <EmptyState title={`${label} profiles coming soon`} description="This group will be updated with real AIMA profiles." />}</PageContainer></Section>;
        })}
      </main>
      <SiteFooter site={content.site} navigation={content.navigation} />
    </>
  );
}
