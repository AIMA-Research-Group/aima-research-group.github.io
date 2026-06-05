export function Badge({ children, tone = "blue" }: { children: React.ReactNode; tone?: "blue" | "teal" | "muted" }) {
  const styles = {
    blue: "bg-[var(--aima-soft-blue)] text-[var(--aima-deep-blue)]",
    teal: "bg-[var(--scientific-teal-soft)] text-[#2f6f70]",
    muted: "bg-[var(--surface-muted)] text-[var(--text-secondary)]",
  };
  return <span className={`inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase ${styles[tone]}`}>{children}</span>;
}
