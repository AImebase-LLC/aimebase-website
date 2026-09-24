import { Heading, Section, SectionLabel } from "@/components/Section";

const hours = Array.from({ length: 16 }, (_, i) => i);

/** Home §3 */
export function Problem({ index, total }: { index: number; total: number }) {
  return (
    <Section aria-labelledby="problem-title" className="bg-light-500">
      <SectionLabel index={index} total={total}>The problem</SectionLabel>
      <div className="grid border-t border-light-600 lg:grid-cols-2">
        <div className="px-6 py-14 md:px-10 lg:border-r lg:border-light-600 lg:py-20">
          <Heading id="problem-title" className="max-w-[16ch] text-4xl md:text-5xl">
            The work doesn&rsquo;t end when the shift does.
          </Heading>
          <p className="mt-6 max-w-[52ch] text-[17px] leading-relaxed text-light-900">
            After a long shift supporting people with disabilities, DSPs still have to read pages of client goals and
            document every meal, every activity, every moment. It&rsquo;s the most tiring hour of the day, and it&rsquo;s spent on
            a form instead of rest.
          </p>
          <figure data-reveal className="mt-10 flex max-w-md items-start gap-4 border-l-2 border-accent-500 pl-5">
            <span className="display shrink-0 text-5xl leading-none">10</span>
            <figcaption className="pt-1 text-[15px] leading-snug text-dark-400">
              paragraphs of client goals to read before writing a single line of the note.
            </figcaption>
          </figure>
        </div>

        <div className="flex items-center px-6 py-14 md:px-10 lg:py-20">
          <figure data-reveal className="w-full rounded-lg border border-light-600 bg-light-50 p-6">
            <div className="flex items-baseline justify-between">
              <p className="mono-label text-light-900">One 16-hour shift</p>
              <p className="font-mono text-xs text-light-900">16h</p>
            </div>
            <div className="mt-6 grid grid-cols-16 gap-1" style={{ gridTemplateColumns: "repeat(16, minmax(0, 1fr))" }} aria-hidden>
              {hours.map((h) => (
                <div
                  key={h}
                  style={{ transitionDelay: `${h * 45}ms` }}
                  className={`h-24 origin-bottom rounded-xs transition-transform duration-700 ease-out [html.js_[data-shown]_&]:scale-y-100 [html.js_&]:scale-y-0 ${
                    h === 15 ? "bg-accent-500" : "bg-secondary-100 ring-1 ring-inset ring-secondary-200"
                  }`}
                />
              ))}
            </div>
            <div className="mt-3 flex justify-between font-mono text-[11px] text-light-900" aria-hidden>
              <span>7:40 am</span>
              <span>11:40 pm</span>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-4 border-t border-light-600 pt-5 text-sm">
              <div className="flex items-start gap-2">
                <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-xs bg-secondary-200 ring-1 ring-secondary-300" aria-hidden />
                <span className="text-dark-400">Supporting the people they care for</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-xs bg-accent-500" aria-hidden />
                <span className="text-dark-400">Reading goals and writing the note</span>
              </div>
            </div>
            <figcaption className="sr-only">
              A 16-hour shift from 7:40 am to 11:40 pm. The final hour is spent on documentation.
            </figcaption>
          </figure>
        </div>
      </div>
    </Section>
  );
}
