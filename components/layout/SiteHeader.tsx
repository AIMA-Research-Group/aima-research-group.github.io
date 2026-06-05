"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import type { NavigationItem, SiteSettings } from "@/lib/validation/schemas";
import { Button } from "@/components/ui/Button";
import { withBasePath } from "@/lib/utils/paths";

export function SiteHeader({ site, navigation }: { site: SiteSettings; navigation: NavigationItem[] }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const main = navigation.filter((item) => item.group === "main");
  const cta = navigation.find((item) => item.group === "cta");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className={`fixed inset-x-0 top-0 z-40 transition duration-200 ${scrolled || open ? "border-b border-[var(--border)] bg-[rgba(247,249,252,0.92)] shadow-sm backdrop-blur" : "bg-transparent"}`}>
      <div className="container-page flex min-h-20 items-center justify-between gap-5">
        <Link href="/" className="flex items-center gap-3" aria-label="AIMA home">
          <Image src={withBasePath(site.logo_full)} alt={`${site.site_name} logo`} width={178} height={54} priority className="hidden h-12 w-auto object-contain sm:block" />
          <Image src={withBasePath(site.logo_symbol)} alt="" width={42} height={42} priority className="h-10 w-10 object-contain sm:hidden" />
        </Link>
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Main navigation">
          {main.map((item) => {
            const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link key={item.href} href={item.href} className={`relative py-2 text-sm font-bold text-[var(--text-secondary)] transition hover:text-[var(--aima-deep-blue)] ${active ? "text-[var(--aima-deep-blue)] after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:bg-[var(--aima-blue)]" : ""}`}>
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="hidden lg:block">{cta ? <Button href="/research">Explore Our Research</Button> : null}</div>
        <button
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-[var(--border)] bg-white lg:hidden"
          type="button"
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open ? (
        <div className="fixed inset-x-0 top-20 h-[calc(100vh-5rem)] bg-[rgba(247,249,252,0.98)] px-6 py-8 lg:hidden">
          <nav className="grid gap-3" aria-label="Mobile navigation">
            {navigation.map((item) => (
              <Link key={item.href} href={item.href} className="rounded-2xl border border-[var(--border)] bg-white px-5 py-4 text-lg font-black" onClick={() => setOpen(false)}>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
