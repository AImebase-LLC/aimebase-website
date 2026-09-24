import { Heading, Section, SectionLabel } from "@/components/Section";
import { approach, site } from "@/lib/site";

/** How we work: the mission as a loop. */
export function Approach({ index, total }: { index: number; total: number }) {
  return (
    <Section aria-labelledby="approach-title" className="bg-light-50">
      <SectionLabel index={index} total={total}>How we work</SectionLabel>
      <div className="grid border-t border-light-600 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
        <div className="px-6 py-14 md:px-10 md:py-16 lg:border-r lg:border-light-600">
          <Heading id="approach-title" className="max-w-[20ch] text-4xl md:text-5xl">
            Find one big problem. Solve it well. Then find the next one.
          </Heading>
        </div>
        <div className="flex flex-col justify-end gap-4 border-t border-light-600 px-6 py-10 md:px-10 lg:border-t-0 lg:py-16">
          <p className="mono-label text-accent-700">Vision</p>
          <p data-reveal className="display text-2xl leading-snug">{site.vision}</p>
        </div>
      </div>
      <ol className="relative grid border-t border-light-600 sm:grid-cols-2 lg:grid-cols-4">
        {approach.map((s, i) => (
          <li
            key={s.title}
            data-reveal
            data-spotlight
            style={{ "--d": i } as React.CSSProperties}
            className="group flex flex-col gap-10 border-b border-light-600 px-6 py-10 sm:odd:border-r lg:border-r lg:border-b-0 lg:last:border-r-0 md:px-8"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-light-600 bg-light-500 font-mono text-xs text-accent-700 transition-colors duration-300 group-hover:border-accent-500 group-hover:bg-accent-500 group-hover:text-dark-500">
                0{i + 1}
              </span>
              <span aria-hidden className="h-px flex-1 bg-light-600" />
              <span aria-hidden className="font-mono text-xs text-light-800 transition-transform duration-300 group-hover:translate-x-1">
                {i === approach.length - 1 ? "↺" : "→"}
              </span>
            </div>
            <div>
              <h3 className="display text-2xl leading-snug">{s.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-light-900">{s.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
