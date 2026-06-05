import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CalendarDays, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { ContentPlaceholder } from "@/components/ui/ContentPlaceholder";
import {
  FrameworkDiagramPlaceholder,
  MedicalImagePlaceholder,
  PublicationThumbnailPlaceholder,
  ResearchThemeVisualPlaceholder,
  ScientificFigurePlaceholder,
} from "@/components/visual/ScientificPlaceholders";
import type { Affiliation, CommunityNarrative, GalleryImage, NewsItem, Opportunity, Person, Project, Publication, ResearchTheme } from "@/lib/validation/schemas";
import { isPreviewMode } from "@/lib/utils/preview";
import { withBasePath } from "@/lib/utils/paths";

export function TagList({ tags }: { tags: string[] }) {
  return <div className="flex flex-wrap gap-2">{tags.map((tag) => <span key={tag} className="rounded-full border border-[var(--border)] px-3 py-1 text-xs font-bold text-[var(--text-secondary)]">{tag}</span>)}</div>;
}

function ThemeVisual({ type }: { type: ResearchTheme["visual_type"] }) {
  if (type === "medical") return <MedicalImagePlaceholder />;
  if (type === "framework") return <FrameworkDiagramPlaceholder />;
  if (type === "scientific") return <ScientificFigurePlaceholder />;
  return <ResearchThemeVisualPlaceholder />;
}

export function ResearchThemeCard({ theme, projectCount, publicationCount }: { theme: ResearchTheme; projectCount: number; publicationCount: number }) {
  return (
    <article className="surface-card group overflow-hidden transition duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-soft)]">
      {theme.cover_image ? (
        <Image
          src={withBasePath(theme.cover_image)}
          alt={`${theme.title} visual summary`}
          width={900}
          height={540}
          className="aspect-[4/3] w-full object-cover"
        />
      ) : (
        <ThemeVisual type={theme.visual_type} />
      )}
      <div className="p-6">
        <div className="mb-4 flex flex-wrap gap-2"><Badge tone="teal">{theme.status}</Badge></div>
        <h3 className="text-2xl font-black">{theme.title}</h3>
        <p className="mt-3 leading-7 text-[var(--text-secondary)]">{theme.summary}</p>
        <p className="mt-5 text-sm font-bold text-[var(--text-muted)]">{projectCount} projects · {publicationCount} publications</p>
        <Link href={`/research/${theme.slug}`} className="mt-5 inline-flex items-center gap-2 font-bold text-[var(--aima-deep-blue)]">
          Explore theme <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  );
}

export function PublicationCard({ publication }: { publication: Publication }) {
  const visual = publication.figure || publication.thumbnail;
  return (
    <article className="surface-card grid gap-5 p-5 transition duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-soft)] md:grid-cols-[220px_1fr]">
      <div className="relative h-48 min-w-0 overflow-hidden rounded-2xl md:h-[165px] [&>*]:h-full [&>*]:min-h-0 [&>*]:w-full">
        {visual ? (
          <Image
            src={withBasePath(visual)}
            alt={`${publication.title} visual summary`}
            fill
            sizes="(min-width: 768px) 220px, 100vw"
            unoptimized={publication.media_type === "gif"}
            className="object-cover"
          />
        ) : (
          <PublicationThumbnailPlaceholder />
        )}
      </div>
      <div className="min-w-0">
        <div className="mb-3 flex flex-wrap gap-2">
          {publication.placeholder && isPreviewMode() ? <Badge>PLACEHOLDER PUBLICATION</Badge> : null}
          <Badge tone="muted">{publication.publication_type}</Badge>
        </div>
        <h3 className="text-xl font-black"><ContentPlaceholder value={publication.title} fallback="Selected publication will be added shortly." /></h3>
        <p className="mt-2 text-sm font-bold text-[var(--text-secondary)]">{publication.authors.join(", ")}</p>
        <p className="mt-1 text-sm text-[var(--text-muted)]">{publication.venue} · {publication.year}</p>
        <p className="mt-4 line-clamp-3 leading-7 text-[var(--text-secondary)]">{publication.abstract}</p>
        <div className="mt-4 flex flex-wrap gap-3">
          {publication.links.map((link) => <span key={link.label} className="inline-flex items-center gap-1 text-sm font-bold text-[var(--aima-deep-blue)]">{link.label}<ExternalLink className="h-3 w-3" /></span>)}
        </div>
      </div>
    </article>
  );
}

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="surface-card group overflow-hidden transition duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-soft)]">
      {project.cover_image ? (
        <Image
          src={withBasePath(project.cover_image)}
          alt={`${project.title} visual summary`}
          width={900}
          height={540}
          className="aspect-[4/3] w-full object-cover"
        />
      ) : (
        <FrameworkDiagramPlaceholder />
      )}
      <div className="p-6">
        <div className="mb-3 flex gap-2"><Badge>{project.status}</Badge>{project.placeholder && isPreviewMode() ? <Badge tone="muted">Placeholder</Badge> : null}</div>
        <h3 className="text-2xl font-black"><ContentPlaceholder value={project.title} fallback="Project details coming soon." /></h3>
        <p className="mt-3 leading-7 text-[var(--text-secondary)]">{project.problem_statement}</p>
        <p className="mt-4 text-sm font-bold text-[var(--aima-deep-blue)]">{project.research_direction}</p>
        <Link href={`/projects/${project.slug}`} className="mt-5 inline-flex items-center gap-2 font-bold text-[var(--aima-deep-blue)]">
          Explore project <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  );
}

function NewsCategoryBadge({ category }: { category: NewsItem["category"] }) {
  const labels: Record<NewsItem["category"], string> = {
    paper: "New paper",
    member: "New member",
    conference: "Conference",
    talk: "Talk",
    award: "Award",
    lab: "Lab update",
    other: "News",
  };
  return <Badge tone={category === "award" ? "teal" : "muted"}>{labels[category]}</Badge>;
}

function formatNewsDate(date: string) {
  return new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric" }).format(new Date(`${date}T00:00:00`));
}

export function NewsHighlights({ news }: { news: NewsItem[] }) {
  if (!news.length) return null;
  const [lead, ...rest] = news.slice(0, 5);

  return (
    <div className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
      <article className="relative overflow-hidden rounded-[24px] border border-[var(--aima-soft-blue)] bg-[var(--aima-deep-blue)] p-7 text-white shadow-[var(--shadow-soft)] md:p-9">
        <div className="absolute inset-0 subtle-grid opacity-20" />
        <div className="relative">
          <div className="mb-5 flex flex-wrap items-center gap-3">
            <NewsCategoryBadge category={lead.category} />
            {lead.pinned ? <Badge tone="teal">Pinned</Badge> : null}
            <span className="inline-flex items-center gap-2 text-sm font-bold text-white/75"><CalendarDays className="h-4 w-4" />{formatNewsDate(lead.date)}</span>
          </div>
          <h3 className="max-w-3xl font-[var(--font-serif)] text-3xl font-bold leading-tight md:text-4xl">{lead.title}</h3>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-white/82">{lead.summary}</p>
          {lead.description ? <p className="mt-4 max-w-2xl leading-7 text-white/70">{lead.description}</p> : null}
          {lead.link_url ? (
            <a href={withBasePath(lead.link_url)} className="mt-6 inline-flex items-center gap-2 font-bold text-white">
              {lead.link_label || "Read more"}<ExternalLink className="h-4 w-4" />
            </a>
          ) : null}
        </div>
      </article>

      <div className="grid gap-3">
        {rest.map((item) => (
          <article key={item.slug} className="surface-card p-5 transition duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-soft)]">
            <div className="mb-3 flex flex-wrap items-center gap-3">
              <NewsCategoryBadge category={item.category} />
              <span className="inline-flex items-center gap-2 text-sm font-bold text-[var(--text-muted)]"><CalendarDays className="h-4 w-4" />{formatNewsDate(item.date)}</span>
            </div>
            <h3 className="text-lg font-black leading-snug">{item.title}</h3>
            <p className="mt-2 line-clamp-2 leading-7 text-[var(--text-secondary)]">{item.summary}</p>
            {item.link_url ? (
              <a href={withBasePath(item.link_url)} className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-[var(--aima-deep-blue)]">
                {item.link_label || "Read more"}<ExternalLink className="h-3 w-3" />
              </a>
            ) : null}
          </article>
        ))}
      </div>
    </div>
  );
}

export function PersonCard({ person }: { person: Person }) {
  return (
    <article className="surface-card p-5 transition duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-soft)]">
      {person.photo ? (
        <Image
          src={withBasePath(person.photo)}
          alt={`Portrait of ${person.name}`}
          width={520}
          height={520}
          className="aspect-square w-full rounded-2xl object-cover"
        />
      ) : (
        <div className="flex aspect-square items-center justify-center rounded-2xl bg-[var(--surface-muted)] text-5xl font-black text-[var(--aima-deep-blue)]">{person.name.replace("[TODO: Add ", "").slice(0, 1) || "A"}</div>
      )}
      <div className="mt-5 flex flex-wrap gap-2">{person.placeholder && isPreviewMode() ? <Badge tone="muted">Placeholder profile</Badge> : null}<Badge>{person.group}</Badge></div>
      <h3 className="mt-4 text-xl font-black"><ContentPlaceholder value={person.name} fallback="Team member coming soon." /></h3>
      <p className="font-bold text-[var(--aima-deep-blue)]">{person.role}</p>
      <p className="mt-2 text-sm text-[var(--text-muted)]">{person.affiliation}</p>
      <p className="mt-4 leading-7 text-[var(--text-secondary)]">{person.short_bio}</p>
      <div className="mt-4"><TagList tags={person.research_interests} /></div>
    </article>
  );
}

export function AffiliationLogoGrid({ affiliations }: { affiliations: Affiliation[] }) {
  const logos = affiliations.filter((affiliation) => affiliation.logo);

  return (
    <div className="rounded-[32px] border-2 border-dashed border-[var(--text-primary)] bg-white px-5 py-7 md:px-8 md:py-9">
      <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-7 md:gap-x-10 md:gap-y-8">
      {logos.map((affiliation) => (
        <div
          key={affiliation.slug}
          className="flex h-20 min-w-28 max-w-[220px] flex-[1_1_150px] items-center justify-center md:h-24 md:flex-[1_1_170px]"
          title={affiliation.name}
        >
          <Image
            src={withBasePath(affiliation.logo)}
            alt={`${affiliation.name} logo`}
            width={320}
            height={160}
            className="max-h-full w-full object-contain"
          />
        </div>
      ))}
      </div>
    </div>
  );
}

export function CommunityNarrativeCard({ narrative }: { narrative: CommunityNarrative }) {
  return (
    <article className="surface-card p-6">
      <Badge tone="teal">Community</Badge>
      <h3 className="mt-4 text-2xl font-black">{narrative.title}</h3>
      <p className="mt-3 leading-7 text-[var(--text-secondary)]">{narrative.summary}</p>
      <p className="mt-4 text-sm text-[var(--text-muted)]"><ContentPlaceholder value={narrative.description} fallback="Narrative will be added soon." /></p>
    </article>
  );
}

export function GalleryGrid({ images }: { images: GalleryImage[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {images.map((image) => (
        <figure key={image.slug} className="group surface-card overflow-hidden p-3">
          <div className="subtle-grid aspect-[4/3] rounded-2xl bg-white transition duration-300 group-hover:scale-[1.02]" />
          <figcaption className="p-3 text-sm text-[var(--text-secondary)]">{image.caption}</figcaption>
        </figure>
      ))}
    </div>
  );
}

export function OpportunityCard({ opportunity }: { opportunity: Opportunity }) {
  return (
    <article className="surface-card p-6">
      <div className="flex flex-wrap gap-2"><Badge>{opportunity.status}</Badge><Badge tone="muted">{opportunity.audience}</Badge></div>
      <h3 className="mt-4 text-2xl font-black"><ContentPlaceholder value={opportunity.title} fallback="Opportunity details coming soon." /></h3>
      <p className="mt-3 leading-7 text-[var(--text-secondary)]">{opportunity.summary}</p>
      <div className="mt-5 grid gap-3 text-sm text-[var(--text-secondary)]">
        {opportunity.expectations.map((item) => <p key={item}>• {item}</p>)}
      </div>
    </article>
  );
}
