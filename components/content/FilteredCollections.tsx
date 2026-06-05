"use client";

import { FilterControls } from "@/components/ui/FilterControls";
import { EmptyState } from "@/components/ui/EmptyState";
import { ProjectCard, PublicationCard } from "@/components/content/Cards";
import type { Project, Publication, ResearchTheme } from "@/lib/validation/schemas";

export function PublicationsBrowser({ publications, themes }: { publications: Publication[]; themes: ResearchTheme[] }) {
  return (
    <FilterControls
      items={publications}
      searchFields={(item) => [item.title, item.venue, item.authors.join(" "), item.abstract]}
      filters={[
        { label: "Year", values: Array.from(new Set(publications.map((item) => String(item.year)))).sort().reverse(), getValue: (item) => String(item.year) },
        { label: "Theme", values: themes.map((item) => item.slug), getValue: (item) => item.research_theme_slugs[0] || "" },
        { label: "Type", values: Array.from(new Set(publications.map((item) => item.publication_type))), getValue: (item) => item.publication_type },
      ]}
      render={(items) => <div className="grid gap-5">{items.map((item) => <PublicationCard key={item.slug} publication={item} />)}</div>}
      empty={<EmptyState title="Selected publications will be added shortly." description="No publication matched the current filters." />}
    />
  );
}

export function ProjectsBrowser({ projects, themes }: { projects: Project[]; themes: ResearchTheme[] }) {
  return (
    <FilterControls
      items={projects}
      searchFields={(item) => [item.title, item.summary, item.problem_statement, item.research_direction]}
      filters={[
        { label: "Theme", values: themes.map((item) => item.slug), getValue: (item) => item.research_theme_slugs[0] || "" },
        { label: "Status", values: Array.from(new Set(projects.map((item) => item.status))), getValue: (item) => item.status },
      ]}
      render={(items) => <div className="grid gap-6 md:grid-cols-3">{items.map((item) => <ProjectCard key={item.slug} project={item} />)}</div>}
      empty={<EmptyState title="Projects will be added shortly." description="No project matched the current filters." />}
    />
  );
}
