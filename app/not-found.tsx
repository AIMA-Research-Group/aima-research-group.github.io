import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--background)] px-6">
      <div className="surface-card max-w-xl p-8 text-center">
        <p className="text-sm font-black uppercase tracking-[0.16em] text-[var(--aima-deep-blue)]">404</p>
        <h1 className="mt-3 text-4xl font-black">Page not found</h1>
        <p className="mt-4 text-[var(--text-secondary)]">The page may have moved, or the content may not be published yet.</p>
        <Link className="mt-6 inline-flex rounded-full bg-[var(--aima-blue)] px-5 py-3 font-bold text-white" href="/">Return home</Link>
      </div>
    </main>
  );
}
