import type { Metadata } from "next";
import { Fraunces, Noto_Serif_Bengali, Work_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { config } from "@/content/config";
import { site } from "@/content/site";
import "./globals.css";

// next/font downloads these at build time and serves them from our own origin.
const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces" });
const workSans = Work_Sans({ subsets: ["latin"], variable: "--font-work-sans" });
// Decorative Assamese word in the hero only - not preloaded so it never blocks first paint.
const bengali = Noto_Serif_Bengali({ subsets: ["bengali"], variable: "--font-noto-bengali", preload: false });

const title = `${site.name} - ${site.tagline}`;
const description = `${site.expansion}. ${site.hero.context}`;

export const metadata: Metadata = {
  metadataBase: new URL(config.url),
  title,
  description,
  alternates: { canonical: "/" },
  openGraph: { type: "website", url: "/", siteName: site.name, title, description, locale: "en_IN" },
  twitter: { card: "summary_large_image", title, description },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  alternateName: site.expansion,
  url: config.url,
  logo: `${config.url}/brand/logo-on-light.png`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Sivasagar",
    addressRegion: "Assam",
    addressCountry: "IN",
  },
  sameAs: config.socials.map((s) => s.url),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${fraunces.variable} ${workSans.variable} ${bengali.variable} antialiased`}>
      <body className="font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-cream focus:px-4 focus:py-2"
        >
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
