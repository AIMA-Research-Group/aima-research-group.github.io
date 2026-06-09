import Link from "next/link";
import Image from "next/image";
import type { SVGProps } from "react";
import { ArrowRight, CalendarDays, ExternalLink, Globe, GraduationCap, Mail } from "lucide-react";
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

function GitHubIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" {...props}>
      <path d="M12 2C6.48 2 2 6.59 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49 0-.24-.01-.88-.01-1.73-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.49-1.11-1.49-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05A9.3 9.3 0 0 1 12 7c.85 0 1.7.12 2.5.34 1.9-1.33 2.74-1.05 2.74-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.06.36.32.68.95.68 1.91 0 1.38-.01 2.49-.01 2.83 0 .27.18.59.69.49A10.15 10.15 0 0 0 22 12.25C22 6.59 17.52 2 12 2Z" />
    </svg>
  );
}

function LinkedInIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" {...props}>
      <path d="M5.34 8.76H2.67V21h2.67V8.76ZM4 3a1.55 1.55 0 1 0 0 3.1A1.55 1.55 0 0 0 4 3Zm17.33 10.57c0-3.28-1.75-4.8-4.08-4.8a3.52 3.52 0 0 0-3.17 1.74h-.04V8.76h-2.56V21h2.67v-6.05c0-1.6.3-3.14 2.28-3.14 1.95 0 1.98 1.82 1.98 3.24V21h2.67v-7.43h.25ZM9.12 8.76H6.45V21h2.67V8.76Z" />
    </svg>
  );
}

function getSocialIcon(label: string) {
  const normalized = label.toLowerCase();
  if (normalized.includes("github")) return GitHubIcon;
  if (normalized.includes("linkedin")) return LinkedInIcon;
  if (normalized.includes("scholar")) return GraduationCap;
  if (normalized.includes("email")) return Mail;
  if (normalized.includes("website")) return Globe;
  return Globe;
}

export function SocialIconLinks({ links, compact = false }: { links: Person["links"]; compact?: boolean }) {
  if (!links.length) return null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      {links.map((link) => {
        const isEmail = link.url.startsWith("mailto:") || link.label.toLowerCase().includes("email");
        if (isEmail) {
          const email = link.url.replace(/^mailto:/, "");
          return (
            <a
              key={`${link.label}-${link.url}`}
              href={link.url}
              className="rounded-full border border-[var(--border)] bg-white px-3 py-1.5 text-xs font-bold text-[var(--aima-deep-blue)] transition hover:border-[var(--aima-deep-blue)] hover:bg-[var(--surface-muted)]"
            >
              {email}
            </a>
          );
        }

        const Icon = getSocialIcon(link.label);
        return (
          <a
            key={`${link.label}-${link.url}`}
            href={withBasePath(link.url)}
            aria-label={link.label}
            title={link.label}
            className={`inline-flex items-center justify-center rounded-full border border-[var(--border)] bg-white text-[var(--aima-deep-blue)] transition hover:-translate-y-0.5 hover:border-[var(--aima-deep-blue)] hover:bg-[var(--surface-muted)] ${compact ? "h-8 w-8" : "h-10 w-10"}`}
          >
            <Icon className={compact ? "h-4 w-4" : "h-5 w-5"} />
          </a>
        );
      })}
    </div>
  );
}

function ThemeVisual({ type }: { type: ResearchTheme["visual_type"] }) {
  if (type === "medical") return <MedicalImagePlaceholder />;
  if (type === "framework") return <FrameworkDiagramPlaceholder />;
  if (type === "scientific") return <ScientificFigurePlaceholder />;
  return <ResearchThemeVisualPlaceholder />;
}

function publicationTypeTone(type: Publication["publication_type"]) {
  const tones: Record<Publication["publication_type"], "blue" | "teal" | "muted" | "purple" | "amber" | "rose" | "slate"> = {
    journal: "teal",
    conference: "blue",
    preprint: "slate",
    workshop: "purple",
    poster: "amber",
    thesis: "rose",
    other: "muted",
  };
  return tones[type];
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
          <Badge tone={publicationTypeTone(publication.publication_type)}>{publication.publication_type}</Badge>
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
    <article className="surface-card group p-5 transition duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-soft)]">
      <Link href={`/people/${person.slug}`} className="block">
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
        <p className="mt-3 rounded-xl border border-[var(--aima-soft-blue)] bg-[var(--surface-muted)] px-3 py-2 text-sm font-bold leading-5 text-[var(--aima-deep-blue)]">{person.affiliation}</p>
        <p className="mt-4 leading-7 text-[var(--text-secondary)]">{person.short_bio}</p>
        <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[var(--aima-deep-blue)]">
          View profile <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
        </span>
      </Link>
      <div className="mt-4">
        <SocialIconLinks links={person.links} compact />
      </div>
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
