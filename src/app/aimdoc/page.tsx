import type { Metadata } from "next";
import { ArrowLink, Button } from "@/components/Button";
import { Faq } from "@/components/Faq";
import { BeforeAfter } from "@/components/home/BeforeAfter";
import { Benefits } from "@/components/home/Benefits";
import { FinalCta } from "@/components/home/FinalCta";
import { Problem } from "@/components/home/Problem";
import { steps } from "@/components/home/HowItWorks";
import { ProductPreview } from "@/components/home/ProductPreview";
import { JsonLd } from "@/components/JsonLd";
import { Heading, Section, SectionLabel } from "@/components/Section";
import { StepScreen } from "@/components/StepScreen";
import { getProject } from "@/lib/projects";
import { cta, securityPrinciples, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "AImdoc: AI care documentation for DSPs | AImbase",
  description:
    "Cut after-shift paperwork. AImdoc drafts professional, compliant notes from a few guided questions, with caregiver review on every note.",
};

const segments = [
  { title: "Home and community-based service agencies", body: "Directors, program managers, and compliance leads responsible for notes across many homes and shifts." },
  { title: "DSP teams", body: "Direct Support Professionals who document every meal, activity, and goal at the end of long shifts." },
  { title: "Group homes", body: "Houses where several caregivers support several people, and every shift ends with a note for each one." },
];

const features = [
  { title: "Guided shift questions tied to each individual's goals", body: "Plain-language questions, in the same order every shift, built from the person's plan." },
  { title: "Drafts in your agency's note format", body: "The structure your team and your auditors already expect, on every note." },
  { title: "Caregiver review and sign-off on every note", body: "The caregiver edits anything, then signs. Nothing is submitted without it." },
  { title: "Notes mapped goal by goal", body: "Each part of the note is tied to the goal it documents, so progress is easy to follow." },
  { title: "Written for the end of a 16-hour shift", body: "Short answers, big targets, no blank text box. If you can answer a text message, you can use it." },
];

const TOTAL = 10;

export default function AimdocPage() {
  const project = getProject("aimdoc");
  const metrics = project?.metrics ?? [];

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "AImdoc",
          applicationCategory: "BusinessApplication",
          operatingSystem: "Web",
          description:
            "AImdoc turns short guided answers into professional, compliant notes, so DSPs spend less time writing and more time with the people they support.",
          publisher: { "@type": "Organization", name: site.legalEntity },
        }}
      />

      {/* Hero */}
      <section aria-labelledby="page-title" className="rule">
        <div className="frame">
          <SectionLabel>AImdoc</SectionLabel>
          <div className="grid border-t border-light-600 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
            <div className="flex flex-col justify-center px-6 py-16 md:px-10 md:py-24">
              <h1 id="page-title" className="animate-rise display max-w-[16ch] text-[40px] md:text-6xl">
                Care documentation that takes minutes, not the end of the shift.
              </h1>
              <p className="animate-rise mt-6 max-w-[52ch] text-[17px] leading-relaxed text-light-900 [animation-delay:100ms] md:text-lg">
                AImdoc turns short guided answers into professional, compliant notes, so DSPs spend less time writing and more
                time with the people they support.
              </p>
              <div className="animate-rise mt-9 flex flex-col items-start gap-5 [animation-delay:200ms] sm:flex-row sm:items-center sm:gap-7">
                <Button href={cta.demo.href} event={cta.demo.event} size="lg">{cta.demo.label}</Button>
                <ArrowLink href="#how">See how it works</ArrowLink>
              </div>
            </div>
            <div className="dot-grid flex items-center justify-center border-t border-light-600 bg-secondary-100 px-4 py-12 md:px-10 lg:border-t-0 lg:border-l">
              <ProductPreview />
            </div>
          </div>
        </div>
      </section>

      <Problem index={1} total={TOTAL} />

      {/* Who it's for */}
      <Section aria-labelledby="for-title" className="bg-light-50">
        <SectionLabel index={2} total={TOTAL}>Who it&rsquo;s for</SectionLabel>
        <div className="grid border-t border-light-600 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
          <div className="px-6 py-12 md:px-10 lg:border-r lg:border-light-600">
            <Heading id="for-title" className="text-3xl md:text-4xl">Built for the teams doing the work.</Heading>
            <p className="mt-4 max-w-[36ch] text-[15px] leading-relaxed text-light-900">
              Caregivers use AImdoc. Agency leaders choose it, because every note it helps write holds up.
            </p>
          </div>
          <div className="grid md:grid-cols-3">
            {segments.map((s, i) => (
              <div
                key={s.title}
                data-reveal
                style={{ "--d": i } as React.CSSProperties}
                className="border-t border-light-600 px-6 py-10 md:border-r md:last:border-r-0 md:px-8 lg:border-t-0"
              >
                <span className="font-mono text-xs text-accent-700">0{i + 1}</span>
                <p className="display mt-4 text-xl leading-snug">{s.title}</p>
                <p className="mt-2 text-[14px] leading-relaxed text-light-900">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* 2. How it works */}
      <Section id="how" aria-labelledby="steps-title" className="bg-light-500">
        <SectionLabel index={3} total={TOTAL}>How it works</SectionLabel>
        <div className="border-t border-light-600 px-6 py-14 md:px-10">
          <Heading id="steps-title" className="text-4xl md:text-5xl">How AImdoc works</Heading>
        </div>
        {steps.map((s, i) => (
          <div key={i} className="grid border-t border-light-600 md:grid-cols-2">
            <div data-reveal className={`flex flex-col justify-center px-6 py-12 md:px-10 ${i % 2 ? "md:order-2 md:border-l md:border-light-600" : "md:border-r md:border-light-600"}`}>
              <span className="font-mono text-sm text-accent-700">0{i + 1} / 03</span>
              <h3 className="display mt-4 text-3xl">{s.title}</h3>
              <p className="mt-3 max-w-[46ch] text-[17px] leading-relaxed text-light-900">{s.body}</p>
            </div>
            <div className="dot-grid flex items-center justify-center bg-secondary-100 px-6 py-12 md:px-10">
              <div data-reveal style={{ "--d": 1 } as React.CSSProperties} className="flex w-full justify-center">
                <StepScreen i={i} />
              </div>
            </div>
          </div>
        ))}
      </Section>

      <BeforeAfter index={4} total={TOTAL} />
      <Benefits index={5} total={TOTAL} />

      {/* Features */}
      <Section aria-labelledby="features-title" className="bg-light-50">
        <SectionLabel index={6} total={TOTAL}>Features</SectionLabel>
        <div className="border-t border-light-600 px-6 py-14 md:px-10">
          <Heading id="features-title" className="text-4xl md:text-5xl">What&rsquo;s in AImdoc</Heading>
        </div>
        <ul className="grid gap-3 border-t border-light-600 p-3 sm:grid-cols-2 lg:grid-cols-3 md:p-4">
          {features.map((f, i) => (
            <li
              key={f.title}
              data-reveal
              data-spotlight
              style={{ "--d": i % 3 } as React.CSSProperties}
              className="flex flex-col justify-between gap-10 rounded-lg border border-light-600 bg-light-500 p-6 transition-colors hover:border-light-700"
            >
              <span className="font-mono text-xs text-light-900">F/{String(i + 1).padStart(2, "0")}</span>
              <div>
                <p className="display text-xl leading-snug">{f.title}</p>
                <p className="mt-2 text-[14px] leading-relaxed text-light-900">{f.body}</p>
              </div>
            </li>
          ))}
          <li data-reveal style={{ "--d": 2 } as React.CSSProperties} className="relative flex flex-col justify-between gap-10 overflow-hidden rounded-lg bg-dark-500 p-6 text-light-50">
            <div aria-hidden className="dot-field pointer-events-none absolute inset-0 [mask-image:radial-gradient(80%_80%_at_100%_0%,#000,transparent)]" />
            <span className="relative mono-label text-accent-300">See it working</span>
            <div className="relative">
              <p className="display text-xl">Walk through a real shift note with us.</p>
              <Button href={cta.demo.href} event={cta.demo.event} className="mt-5">{cta.demo.label}</Button>
            </div>
          </li>
        </ul>
      </Section>

      {/* 4. Results from the pilot */}
      <Section aria-labelledby="results-title" className="bg-light-500">
        <SectionLabel index={7} total={TOTAL}>Results from the pilot</SectionLabel>
        <div className="grid border-t border-light-600 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
          <div className="px-6 py-14 md:px-10 lg:border-r lg:border-light-600">
            <Heading id="results-title" className="text-4xl md:text-5xl">In production, in Maine.</Heading>
            <p className="mt-4 max-w-[40ch] text-[15px] leading-relaxed text-light-900">
              AImdoc is in a production pilot with a care provider in Maine, used on real shifts by the kind of caregivers it
              was designed around.
            </p>
            <ArrowLink href="/projects/aimdoc" className="mt-6">Read the AImdoc case study</ArrowLink>
          </div>
          <dl className="grid sm:grid-cols-3">
            {metrics.map((m, i) => (
              <div
                key={m.label}
                data-reveal
                style={{ "--d": i } as React.CSSProperties}
                className="flex flex-col-reverse justify-end gap-2 border-t border-light-600 px-6 py-10 sm:border-r sm:last:border-r-0 md:px-8 lg:border-t-0"
              >
                <dt className="text-[14px] leading-snug text-light-900">{m.label}</dt>
                <dd className="display text-5xl">{m.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      {/* 5. Security summary */}
      <Section aria-labelledby="security-title" className="rule-dark bg-dark-500">
        <SectionLabel index={8} total={TOTAL} tone="dark">Security</SectionLabel>
        <div className="grid border-t border-dark-400 lg:grid-cols-2">
          <div className="px-6 py-14 md:px-10 lg:border-r lg:border-dark-400">
            <Heading id="security-title" className="text-4xl text-light-50 md:text-5xl">
              Your clients&rsquo; records are protected at every step.
            </Heading>
            <ArrowLink href="/aimdoc/security" tone="dark" className="mt-8">Here&rsquo;s how</ArrowLink>
          </div>
          <ul className="divide-y divide-dark-400">
            {securityPrinciples.map((p, i) => (
              <li key={p.title} data-reveal style={{ "--d": i } as React.CSSProperties} className="flex gap-4 px-6 py-6 md:px-10">
                <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-500" />
                <div>
                  <p className="font-medium text-light-50">{p.title}</p>
                  <p className="mt-1 text-[14px] leading-relaxed text-dark-100">{p.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* 6. FAQ */}
      <Section aria-labelledby="faq-title" className="bg-light-50">
        <SectionLabel index={9} total={TOTAL}>FAQ</SectionLabel>
        <div className="grid border-t border-light-600 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
          <div className="px-6 py-14 md:px-10 lg:border-r lg:border-light-600">
            <Heading id="faq-title" className="text-4xl md:text-5xl">Questions agencies ask</Heading>
            <p className="mt-4 max-w-[36ch] text-[15px] leading-relaxed text-light-900">
              Something we haven&rsquo;t covered?{" "}
              <a href={`mailto:${site.contactEmail}`} className="text-dark-500 underline underline-offset-4 hover:text-accent-700">
                Email us
              </a>
              .
            </p>
          </div>
          <Faq />
        </div>
      </Section>

      {/* 7. Pricing */}
      <Section aria-labelledby="pricing-title" className="bg-secondary-100">
        <SectionLabel index={10} total={TOTAL}>Pricing</SectionLabel>
        <div className="flex flex-col gap-6 border-t border-secondary-300 px-6 py-14 md:flex-row md:items-center md:justify-between md:px-10">
          <div>
            <Heading id="pricing-title" className="text-3xl md:text-4xl">Pricing based on team size.</Heading>
            <p className="mt-3 max-w-[52ch] text-[17px] text-dark-400">
              Book a demo for a quote. You&rsquo;ll get one price for your agency, based on how many caregivers will use AImdoc.
            </p>
          </div>
          <Button href={cta.demo.href} event={cta.demo.event} size="lg">{cta.demo.label}</Button>
        </div>
      </Section>

      <FinalCta />
    </>
  );
}
