import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { ContentPlaceholder } from "@/components/ui/ContentPlaceholder";
import {
  FrameworkDiagramPlaceholder,
  MedicalImagePlaceholder,
  PublicationThumbnailPlaceholder,
  ResearchThemeVisualPlaceholder,
  ScientificFigurePlaceholder,
} from "@/components/visual/ScientificPlaceholders";
import type { CommunityNarrative, GalleryImage, Opportunity, Person, Project, Publication, ResearchTheme } from "@/lib/validation/schemas";
import { isPreviewMode } from "@/lib/utils/preview";

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
      <ThemeVisual type={theme.visual_type} />
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
  return (
    <article className="surface-card grid gap-5 p-5 transition duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-soft)] md:grid-cols-[220px_1fr]">
      <PublicationThumbnailPlaceholder />
      <div>
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
      <FrameworkDiagramPlaceholder />
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

export function PersonCard({ person }: { person: Person }) {
  return (
    <article className="surface-card p-5 transition duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-soft)]">
      <div className="flex aspect-square items-center justify-center rounded-2xl bg-[var(--surface-muted)] text-5xl font-black text-[var(--aima-deep-blue)]">{person.name.replace("[TODO: Add ", "").slice(0, 1) || "A"}</div>
      <div className="mt-5 flex flex-wrap gap-2">{person.placeholder && isPreviewMode() ? <Badge tone="muted">Placeholder profile</Badge> : null}<Badge>{person.group}</Badge></div>
      <h3 className="mt-4 text-xl font-black"><ContentPlaceholder value={person.name} fallback="Team member coming soon." /></h3>
      <p className="font-bold text-[var(--aima-deep-blue)]">{person.role}</p>
      <p className="mt-2 text-sm text-[var(--text-muted)]">{person.affiliation}</p>
      <p className="mt-4 leading-7 text-[var(--text-secondary)]">{person.short_bio}</p>
      <div className="mt-4"><TagList tags={person.research_interests} /></div>
    </article>
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
