import type { Metadata } from "next";
import { FinalCta } from "@/components/home/FinalCta";
import { LogoMark, WordmarkSvg } from "@/components/Wordmark";
import { FounderJourney } from "@/components/FounderJourney";
import { FounderPhoto, hasFounderPhoto } from "@/components/FounderPhoto";
import { Heading, Section, SectionLabel } from "@/components/Section";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About AImbase: It started with a 16-hour shift",
  description: "How a DSP and AI master's student in Maine built AImbase to make people superfast at their work.",
};

const story = [
  "I worked as a Direct Support Professional in Maine while pursuing my Master's in AI at Northeastern's Roux Institute. I did 16-hour shifts caring for people with disabilities. At the end of each shift, exhausted, I had to read through ten paragraphs of client goals and write detailed documentation of everything I did: every meal, every activity, every moment.",
  "I watched my coworkers struggle with the same thing. Great caregivers, exhausted, spending their last hour of a shift on paperwork instead of resting. I knew AI could fix this. That's how AImdoc was born.",
  "Then the Rwandan Community of Maine asked me to build a platform for their 2026 community election. I built it in a few days, and voters across Maine cast ballots online in both Kinyarwanda and English. Afterward, they asked me to build their community website, with recurring member contributions and donations.",
  "The industries will change. The mission won't: find one big problem, solve it well, and make people superfast at their work.",
];

const values = [
  { title: "Solve one thing at a time.", body: "Depth beats spread. We stay with one problem until it's solved well." },
  { title: "Real problems, real people.", body: "We build for workers on the ground: caregivers, community organizers, small business owners." },
  { title: "Faster, not replaced.", body: "AI should make people better at what they already do." },
  { title: "Ship it.", body: "Software in production beats a perfect roadmap." },
  { title: "Trust matters.", body: "Healthcare records, community votes, personal data: security and privacy are non-negotiable." },
];

const facts = [
  site.founder,
  "Born in Rwanda",
  "Studied in Italy",
  "Based in South Portland, Maine",
  "MS in AI, Roux Institute (Northeastern University)",
];

export default function AboutPage() {
  return (
    <>
      {/* 1. Hero */}
      <section aria-labelledby="page-title" className="rule">
        <div className="frame">
          <SectionLabel>About</SectionLabel>
          <div className="grid border-t border-light-600 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
            <div className="relative flex flex-col justify-between gap-16 overflow-hidden bg-dark-500 px-6 py-14 md:px-10 md:py-20 lg:min-h-[600px]">
              <div aria-hidden className="dot-field pointer-events-none absolute inset-0 [mask-image:radial-gradient(70%_60%_at_20%_20%,#000,transparent)]" />
              <p className="animate-rise relative mono-label text-accent-300">About AImbase</p>
              <div className="relative">
                <h1 id="page-title" className="animate-rise display max-w-[12ch] text-5xl text-light-50 [animation-delay:100ms] md:text-7xl">
                  It started with a 16-hour shift.
                </h1>
                <p className="animate-rise mt-6 max-w-[44ch] text-[17px] leading-relaxed text-dark-100 [animation-delay:200ms]">
                  {site.oneLiner}
                </p>
              </div>
            </div>
            <div className="bg-secondary-100 p-3 md:p-4">
              {hasFounderPhoto() ? (
                <FounderPhoto className="h-full min-h-80 w-full" />
              ) : (
                <FounderJourney tone="peach" className="h-full" />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 2. Origin story + 7. Founder facts */}
      <Section aria-labelledby="story-title" className="bg-light-50">
        <SectionLabel index={1} total={5}>Origin story</SectionLabel>
        <div className="grid border-t border-light-600 lg:grid-cols-[1fr_340px]">
          <div className="px-6 py-14 md:px-10 md:py-20 lg:border-r lg:border-light-600">
            <h2 id="story-title" className="sr-only">Origin story</h2>
            <div className="max-w-[62ch] space-y-6 text-lg leading-relaxed text-dark-400 md:text-xl md:leading-relaxed">
              {story.map((p, i) => (
                <p key={i} className={i === story.length - 1 ? "display text-2xl !leading-snug text-dark-500 md:text-3xl" : ""}>
                  {p}
                </p>
              ))}
            </div>
            <p className="mt-8 text-[15px] text-light-900">{site.founder}, Founder</p>
          </div>
          <aside aria-label="Founder facts" className="px-6 py-14 md:px-10 lg:px-8">
            <div className="rounded-lg border border-light-600 bg-light-500 p-6 lg:sticky lg:top-24">
              <p className="mono-label text-light-900">Founder facts</p>
              <ul className="mt-4 divide-y divide-light-600">
                {facts.map((f, i) => (
                  <li key={f} className={`py-3 text-[15px] ${i === 0 ? "font-medium" : "text-dark-400"}`}>{f}</li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </Section>

      {/* 3. Mission & vision */}
      <Section aria-label="Mission and vision" className="bg-light-500">
        <SectionLabel index={2} total={5}>Mission &amp; vision</SectionLabel>
        <div className="grid border-t border-light-600 md:grid-cols-2">
          {[
            { k: "Vision", v: site.vision },
            { k: "Mission", v: site.mission },
          ].map((x) => (
            <div key={x.k} className="border-b border-light-600 px-6 py-14 md:border-r md:border-b-0 md:last:border-r-0 md:px-10">
              <p className="mono-label text-accent-700">{x.k}</p>
              <p className="display mt-5 text-3xl leading-tight md:text-4xl">{x.v}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* 4. What we believe */}
      <Section aria-labelledby="values-title" className="bg-light-50">
        <SectionLabel index={3} total={5}>What we believe</SectionLabel>
        <div className="grid border-t border-light-600 md:grid-cols-[1fr_2fr]">
          <div className="px-6 py-14 md:border-r md:border-light-600 md:px-10">
            <Heading id="values-title" className="text-4xl md:text-5xl">What we believe</Heading>
          </div>
          <ol className="divide-y divide-light-600">
            {values.map((v, i) => (
              <li key={v.title} className="grid grid-cols-[48px_1fr] gap-4 px-6 py-8 md:px-10">
                <span className="font-mono text-sm text-accent-700">0{i + 1}</span>
                <div>
                  <h3 className="display text-2xl">{v.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-light-900">{v.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      {/* 5. The name + 6. What's next */}
      <Section aria-label="The name and what's next" className="bg-light-500">
        <div className="grid md:grid-cols-2">
          <div className="border-b border-light-600 md:border-r md:border-b-0">
            <SectionLabel index={4} total={5}>The name</SectionLabel>
            <div className="border-t border-light-600 px-6 py-14 md:px-10">
              <div className="flex items-center gap-6">
                <span className="flex h-20 w-20 shrink-0 items-center justify-center rounded-lg bg-dark-500">
                  <LogoMark className="h-10 w-auto" />
                </span>
                <div>
                  <WordmarkSvg className="h-8 w-auto md:h-10" />
                  <p className="mt-3 font-mono text-sm text-light-900">/ {site.pronunciation} /</p>
                </div>
              </div>
              <p className="mt-6 max-w-[48ch] text-[17px] leading-relaxed text-dark-400">
                The AI is capitalized because artificial intelligence is our foundation. <em>Base</em> means foundation,
                ground, home. Everything we build stands on it.
              </p>
            </div>
          </div>
          <div>
            <SectionLabel index={5} total={5}>What&rsquo;s next</SectionLabel>
            <div className="border-t border-light-600 px-6 py-14 md:px-10">
              <p className="display text-3xl leading-tight">
                We&rsquo;re researching the next big problem to solve. When we find it, we&rsquo;ll go as deep on it as we did on
                documentation.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <FinalCta />
    </>
  );
}
