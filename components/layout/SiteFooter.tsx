import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import type { NavigationItem, SiteSettings } from "@/lib/validation/schemas";
import { ContentPlaceholder } from "@/components/ui/ContentPlaceholder";

export function SiteFooter({ site, navigation }: { site: SiteSettings; navigation: NavigationItem[] }) {
  return (
    <footer className="bg-[var(--footer)] py-14 text-white">
      <div className="container-page grid gap-10 lg:grid-cols-[1.3fr_0.8fr_0.8fr_0.8fr]">
        <div>
          <Image src={site.logo_full} alt={`${site.site_name} logo`} width={210} height={70} className="h-16 w-auto rounded-xl bg-white object-contain p-2" />
          <p className="mt-5 max-w-lg leading-7 text-[var(--footer-muted)]"><ContentPlaceholder value={site.description} fallback="AIMA Research Group website content is being prepared." /></p>
        </div>
        <div>
          <h2 className="font-black">Navigation</h2>
          <div className="mt-4 grid gap-2 text-sm text-[var(--footer-muted)]">
            {navigation.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
          </div>
        </div>
        <div>
          <h2 className="font-black">Contact</h2>
          <div className="mt-4 grid gap-2 text-sm text-[var(--footer-muted)]">
            <span>{site.email}</span>
            <span><ContentPlaceholder value={site.location} fallback="Location will be added soon." /></span>
            <Link href="/join-us">Join Us</Link>
          </div>
        </div>
        <div>
          <h2 className="font-black">Social</h2>
          <div className="mt-4 grid gap-2 text-sm text-[var(--footer-muted)]">
            {site.social_links.map((link) => (
              <span key={link.label} className="inline-flex items-center gap-2">{link.label}<ExternalLink className="h-3 w-3" aria-hidden="true" /></span>
            ))}
          </div>
        </div>
      </div>
      <div className="container-page mt-10 border-t border-white/10 pt-6 text-sm text-[var(--footer-muted)]">
        © {new Date().getFullYear()} {site.site_name}. Placeholder content is controlled by preview mode.
      </div>
    </footer>
  );
}
