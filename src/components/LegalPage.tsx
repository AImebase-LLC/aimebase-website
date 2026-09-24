import { Section, SectionLabel } from "./Section";
import { site } from "@/lib/site";

export type LegalSection = { heading: string; body: React.ReactNode };

export function LegalPage({ title, updated, intro, sections }: { title: string; updated: string; intro: string; sections: LegalSection[] }) {
  return (
    <Section aria-labelledby="page-title" className="bg-light-50">
      <SectionLabel>Legal</SectionLabel>
      <div className="grid border-t border-light-600 lg:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="border-b border-light-600 px-6 py-10 md:px-10 lg:border-r lg:border-b-0 lg:px-8">
          <div className="lg:sticky lg:top-24">
            <p className="mono-label text-light-900">On this page</p>
            <ol className="mt-4 space-y-2 text-sm">
              {sections.map((s, i) => (
                <li key={s.heading}>
                  <a href={`#s${i + 1}`} className="text-light-900 transition-colors hover:text-dark-500">
                    {i + 1}. {s.heading}
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </aside>
        <article className="px-6 py-14 md:px-10 md:py-20">
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
