import { Section, SectionLabel } from "./Section";
import { site } from "@/lib/site";
import { LegalToc } from "./LegalToc";

export type LegalSection = { heading: string; body: React.ReactNode };

export function LegalPage({ title, updated, intro, sections }: { title: string; updated: string; intro: string; sections: LegalSection[] }) {
  return (
    <Section aria-labelledby="page-title" className="bg-light-50">
      <SectionLabel>Legal</SectionLabel>
      <div className="grid border-t border-light-600 lg:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="border-light-600 lg:border-r lg:px-8 lg:py-10">
          <LegalToc items={sections.map((sec, i) => ({ id: `s${i + 1}`, label: sec.heading }))} />
        </aside>
        <article className="px-6 pt-14 pb-32 md:px-10 md:pt-20 lg:pb-20">
          <h1 id="page-title" className="animate-rise display text-5xl md:text-6xl">{title}</h1>
          <p className="mt-4 font-mono text-xs text-light-900">
            {site.legalEntity} · {site.location} · Last updated {updated}
          </p>
          <p className="mt-8 max-w-[68ch] text-[17px] leading-relaxed text-dark-400">{intro}</p>
          <div className="mt-12 max-w-[68ch] space-y-10">
            {sections.map((s, i) => (
              <section key={s.heading} id={`s${i + 1}`} className="scroll-mt-24">
                <h2 className="display text-2xl">
                  {i + 1}. {s.heading}
                </h2>
                <div className="mt-3 space-y-3 text-[15px] leading-relaxed text-light-900 [&_a]:text-dark-500 [&_a]:underline [&_a]:underline-offset-4 [&_li]:ml-5 [&_li]:list-disc">
                  {s.body}
                </div>
              </section>
            ))}
          </div>
        </article>
      </div>
    </Section>
  );
}
