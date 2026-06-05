export function PageContainer({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`container-page ${className}`}>{children}</div>;
}

export function Section({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <section className={`section-space ${className}`}>{children}</section>;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  center = false,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  center?: boolean;
}) {
  return (
    <div className={`mb-10 ${center ? "mx-auto max-w-3xl text-center" : "reading-width"}`}>
      {eyebrow ? <p className="mb-3 text-xs font-black uppercase tracking-[0.16em] text-[var(--aima-deep-blue)]">{eyebrow}</p> : null}
      <h2 className="font-[var(--font-inter)] text-[clamp(2rem,4vw,3rem)] font-black leading-tight">{title}</h2>
      {description ? <p className="mt-4 text-lg leading-8 text-[var(--text-secondary)]">{description}</p> : null}
    </div>
  );
}

export function PageHero({ eyebrow, title, description }: { eyebrow?: string; title: string; description: string }) {
  return (
    <Section className="pb-12 pt-28">
      <PageContainer>
        <div className="reading-width">
          {eyebrow ? <p className="mb-4 text-xs font-black uppercase tracking-[0.16em] text-[var(--aima-deep-blue)]">{eyebrow}</p> : null}
          <h1 className="font-[var(--font-serif)] text-[clamp(2.7rem,7vw,5.2rem)] font-bold leading-[1.03]">{title}</h1>
          <p className="mt-6 text-xl leading-9 text-[var(--text-secondary)]">{description}</p>
        </div>
      </PageContainer>
    </Section>
  );
}
