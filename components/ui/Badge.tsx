export function Badge({ children, tone = "blue" }: { children: React.ReactNode; tone?: "blue" | "teal" | "muted" | "purple" | "amber" | "rose" | "slate" }) {
  const styles = {
    blue: "bg-[var(--aima-soft-blue)] text-[var(--aima-deep-blue)]",
    teal: "bg-[var(--scientific-teal-soft)] text-[#2f6f70]",
    muted: "bg-[var(--surface-muted)] text-[var(--text-secondary)]",
    purple: "bg-[#eee7ff] text-[#5d35a6]",
    amber: "bg-[#fff1c7] text-[#8a5a00]",
    rose: "bg-[#ffe4ec] text-[#a83258]",
    slate: "bg-[#e8eef5] text-[#39516b]",
  };
  return <span className={`inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase ${styles[tone]}`}>{children}</span>;
}
