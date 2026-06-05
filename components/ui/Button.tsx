import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function Button({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
}) {
  const styles = {
    primary: "bg-[var(--aima-blue)] text-white hover:bg-[var(--aima-deep-blue)]",
    secondary: "border border-[var(--border)] bg-white text-[var(--text-primary)] hover:border-[var(--aima-blue)]",
    ghost: "text-[var(--aima-deep-blue)] hover:bg-[var(--aima-soft-blue)]",
  };
  return (
    <Link
      href={href}
      className={`group inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition duration-200 ${styles[variant]}`}
    >
      {children}
      <ArrowRight className="h-4 w-4 transition duration-200 group-hover:translate-x-1" aria-hidden="true" />
    </Link>
  );
}
