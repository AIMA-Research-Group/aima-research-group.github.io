import type { Metadata } from "next";
import { Inter, Source_Serif_4 } from "next/font/google";
import "./globals.css";
import { getSiteSettings } from "@/lib/content/loaders";
import { withBasePath } from "@/lib/utils/paths";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSiteSettings();
  const domain = site.domain.startsWith("http") ? site.domain : process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";

  return {
    metadataBase: new URL(domain),
    title: {
      default: `${site.short_name} | ${site.subtitle}`,
      template: `%s | ${site.short_name}`,
    },
    description: site.description,
    alternates: { canonical: "/" },
    openGraph: {
      title: site.site_name,
      description: site.description,
      type: "website",
      images: [site.default_og_image],
    },
    twitter: {
      card: "summary_large_image",
      title: site.site_name,
      description: site.description,
      images: [site.default_og_image],
    },
    icons: {
      icon: withBasePath(site.favicon),
    },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${sourceSerif.variable}`}>
      <body className="font-[var(--font-inter)] antialiased">
        <a className="skip-link" href="#main-content">Skip to content</a>
        {children}
      </body>
    </html>
  );
}
