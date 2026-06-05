export function EmptyState({ title, description }: { title: string; description: string }) {
  return (
    <div className="surface-card subtle-grid p-8 text-center">
      <h3 className="text-2xl font-black">{title}</h3>
      <p className="mx-auto mt-3 max-w-xl text-[var(--text-secondary)]">{description}</p>
    </div>
  );
}
