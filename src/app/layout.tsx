import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@/components/Analytics";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Interactions } from "@/components/Interactions";
import { JsonLd } from "@/components/JsonLd";
import { site } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "AImbase: AI software for frontline work · AImdoc",
    template: "%s",
  },
  description:
    "AImdoc turns short guided answers into complete, compliant care notes for DSPs and caregivers. Built in Maine by a former Direct Support Professional.",
  openGraph: {
    siteName: site.name,
    type: "website",
    locale: "en_US",
    // [OG IMAGE 1200×630] with the tagline and logo: add /public/og.png and set images here.
  },
};

/** ABC Diatype is licensed separately; load it only once the files are in /public/fonts. */
const diatype = [
  { file: "ABCDiatype-Regular.woff2", weight: 400 },
  { file: "ABCDiatype-Medium.woff2", weight: 500 },
].filter((f) => fs.existsSync(path.join(process.cwd(), "public", "fonts", f.file)));
const diatypeCss = diatype
  .map(
    (f) =>
      `@font-face{font-family:"ABC Diatype";src:url("/fonts/${f.file}") format("woff2");font-weight:${f.weight};font-style:normal;font-display:swap}`,
  )
  .join("");

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`} suppressHydrationWarning>
      <head>
        {/* Enables scroll-reveal styles only when JS is running. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        {diatypeCss && <style dangerouslySetInnerHTML={{ __html: diatypeCss }} />}
        {diatype.map((f) => (
          <link key={f.file} rel="preload" href={`/fonts/${f.file}`} as="font" type="font/woff2" crossOrigin="anonymous" />
        ))}
      </head>
      <body className="min-h-dvh" suppressHydrationWarning>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-sm focus:bg-dark-500 focus:px-3 focus:py-2 focus:text-light-50"
        >
          Skip to content
        </a>
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Organization",
            name: site.legalEntity,
            alternateName: site.name,
            url: site.url,
            slogan: site.tagline,
            description: site.oneLiner,
            founder: { "@type": "Person", name: site.founder },
            email: site.contactEmail,
            address: { "@type": "PostalAddress", addressLocality: "South Portland", addressRegion: "ME", addressCountry: "US" },
          }}
        />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <Analytics />
        <Interactions />
      </body>
    </html>
  );
}
