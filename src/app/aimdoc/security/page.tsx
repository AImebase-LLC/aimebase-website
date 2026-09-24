import type { Metadata } from "next";
import { ArrowLink, Button } from "@/components/Button";
import { FinalCta } from "@/components/home/FinalCta";
import { Heading, Section, SectionLabel } from "@/components/Section";
import { cta, securityPrinciples, securityReview, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Security & privacy | AImdoc | AImbase",
  description:
    "How AImdoc treats the personal information of the people your agency supports, and what we review in writing with your compliance lead.",
};

export default function SecurityPage() {
  return (
    <>
      <section aria-labelledby="page-title" className="rule">
        <div className="frame">
          <SectionLabel>AImdoc · Security &amp; privacy</SectionLabel>
          <div className="grid border-t border-light-600 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
            <div className="px-6 py-16 md:px-10 md:py-24">
              <h1 id="page-title" className="animate-rise display max-w-[16ch] text-[40px] md:text-6xl">
                Trust is the foundation, not an add-on.
              </h1>
              <p className="animate-rise mt-6 max-w-[56ch] text-[17px] leading-relaxed text-light-900 [animation-delay:100ms] md:text-lg">
                The people our customers support trust them with their most personal information. We treat that trust as the
                foundation of the product, not an add-on. Here is exactly how AImdoc handles data.
              </p>
              <div className="animate-rise mt-9 flex flex-col items-start gap-5 [animation-delay:200ms] sm:flex-row sm:items-center sm:gap-7">
                <Button href={cta.demo.href} event={cta.demo.event} size="lg">{cta.demo.label}</Button>
                <ArrowLink href="#review">What we review with you</ArrowLink>
              </div>
            </div>
            <div className="relative flex items-center justify-center overflow-hidden border-t border-light-600 bg-dark-500 px-6 py-14 lg:border-t-0 lg:border-l">
              <div aria-hidden className="dot-field pointer-events-none absolute inset-0 [mask-image:radial-gradient(60%_60%_at_50%_50%,#000,transparent)]" />
              <div aria-hidden className="relative w-full max-w-sm space-y-2">
                {[
                  { k: "Drafted by", v: "AImdoc", tone: "text-dark-100" },
                  { k: "Reviewed by", v: "Caregiver", tone: "text-light-50" },
                  { k: "Signed by", v: "Caregiver", tone: "text-light-50" },
                  { k: "Submitted", v: "Only after sign-off", tone: "text-accent-300" },
                ].map((r, i) => (
                  <div
                    key={r.k}
                    data-reveal
                    style={{ "--d": i } as React.CSSProperties}
                    className="flex items-center justify-between rounded-md border border-white/10 bg-white/[0.03] px-4 py-3.5"
                  >
                    <span className="font-mono text-[11px] tracking-wide text-dark-200 uppercase">{r.k}</span>
                    <span className={`flex items-center gap-2 text-[15px] ${r.tone}`}>
                      {i > 0 && <span className="text-[#3ecf8e]">✓</span>}
                      {r.v}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Section aria-labelledby="principles-title" className="bg-light-50">
        <SectionLabel index={1} total={2}>Principles</SectionLabel>
        <div className="border-t border-light-600 px-6 py-14 md:px-10">
          <Heading id="principles-title" className="text-4xl md:text-5xl">How we think about your clients&rsquo; records</Heading>
        </div>
        <ul className="grid gap-3 border-t border-light-600 p-3 md:grid-cols-2 md:p-4">
          {securityPrinciples.map((p, i) => (
            <li
              key={p.title}
              data-reveal
              data-spotlight
              style={{ "--d": i } as React.CSSProperties}
              className="rounded-lg border border-light-600 bg-light-500 p-6 transition-colors hover:border-light-700 md:p-8"
            >
              <span className="font-mono text-xs text-accent-700">0{i + 1}</span>
              <h3 className="display mt-6 text-2xl">{p.title}</h3>
              <p className="mt-2 max-w-[48ch] text-[15px] leading-relaxed text-light-900">{p.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="review" aria-labelledby="review-title" className="bg-light-500">
        <SectionLabel index={2} total={2}>Compliance review</SectionLabel>
        <div className="grid border-t border-light-600 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)]">
          <div className="px-6 py-14 md:px-10 lg:border-r lg:border-light-600">
            <Heading id="review-title" className="text-4xl md:text-5xl">Answered in writing, before you share any data.</Heading>
            <p className="mt-6 max-w-[44ch] text-[15px] leading-relaxed text-light-900">
              Every agency&rsquo;s compliance lead asks the same careful questions. We answer each one specifically for your
              agency, on paper, as part of onboarding. Nothing here is a checkbox.
            </p>
          </div>
          <dl className="divide-y divide-light-600">
            {securityReview.map((r, i) => (
              <div key={r.label} data-reveal style={{ "--d": i } as React.CSSProperties} className="grid gap-1 px-6 py-6 sm:grid-cols-[220px_1fr] sm:gap-6 md:px-10">
                <dt className="font-medium">{r.label}</dt>
                <dd className="text-[15px] leading-relaxed text-light-900">{r.body}</dd>
              </div>
            ))}
            <div className="grid gap-1 px-6 py-6 sm:grid-cols-[220px_1fr] sm:gap-6 md:px-10">
              <dt className="font-medium">Security contact</dt>
              <dd className="text-[15px] leading-relaxed text-light-900">
                Questions or a concern to report?{" "}
                <a href={`mailto:${site.securityEmail}`} className="text-dark-500 underline underline-offset-4 hover:text-accent-700">
                  {site.securityEmail}
                </a>
              </dd>
            </div>
          </dl>
        </div>
      </Section>

      <FinalCta title="Bring your compliance lead to the demo." />
    </>
  );
}
