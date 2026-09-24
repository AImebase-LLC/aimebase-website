import { Heading, Section, SectionLabel } from "@/components/Section";

const quick = ["Morning routine", "Meals", "Activities", "Community goal", "Anything else?"];

/** Home §5 */
export function BeforeAfter({ index, total }: { index: number; total: number }) {
  return (
    <Section aria-labelledby="ba-title" className="bg-light-500">
      <SectionLabel index={index} total={total}>Before / after</SectionLabel>
      <div className="flex flex-col gap-4 border-t border-light-600 px-6 py-14 md:flex-row md:items-end md:justify-between md:px-10 md:py-16">
        <Heading id="ba-title" className="max-w-[18ch] text-4xl md:text-5xl">
          Same shift. A different last hour.
        </Heading>
        <p className="max-w-[34ch] text-[15px] leading-relaxed text-light-900">Same caregiver, same person supported, same goals. Only the last hour changes.</p>
      </div>
      <div className="grid border-t border-light-600 md:grid-cols-2">
        {/* Before */}
        <div className="flex flex-col border-b border-light-600 px-6 py-10 md:border-r md:border-b-0 md:px-10">
          <div className="flex items-center justify-between">
            <p className="mono-label text-light-900">Before</p>
            <p className="font-mono text-sm text-dark-400">11:40 pm</p>
          </div>
          <div data-reveal className="mt-6 flex-1 rounded-lg border border-light-600 bg-light-50 p-5" aria-hidden>
            <p className="text-[12px] font-medium text-dark-400">Client goals · 10 paragraphs</p>
            <div className="mt-3 space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="space-y-1.5">
                  <div className="h-1.5 w-full rounded-full bg-light-600" />
                  <div className="h-1.5 w-11/12 rounded-full bg-light-600" />
                  <div className="h-1.5 w-3/5 rounded-full bg-light-600" />
                </div>
              ))}
            </div>
            <div className="mt-5 rounded-sm border border-light-600 bg-light-500 p-3">
              <p className="text-[11px] text-light-900">Shift note</p>
              <div className="mt-2 h-14">
                <span className="inline-block h-4 w-px animate-pulse bg-dark-500" />
              </div>
            </div>
          </div>
          <p className="mt-5 text-[15px] leading-relaxed text-light-900">
            10 paragraphs of client goals and a blank note field at 11:40 pm.
          </p>
        </div>

        {/* After */}
        <div className="flex flex-col bg-light-50 px-6 py-10 md:px-10">
          <div className="flex items-center justify-between">
            <p className="mono-label text-accent-700">After</p>
            <span className="rounded-xs bg-status-live-bg px-1.5 py-0.5 mono-label !text-[10px] text-status-live">Ready for review</span>
          </div>
          <div data-reveal style={{ "--d": 2 } as React.CSSProperties} className="mt-6 flex flex-1 flex-col rounded-lg border border-secondary-300 bg-secondary-50 p-5" aria-hidden>
            <p className="text-[12px] font-medium text-dark-400">5 quick answers</p>
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {quick.map((q, i) => (
                <li
                  key={q}
                  style={{ transitionDelay: `${400 + i * 120}ms` }}
                  className="flex items-center gap-1.5 rounded-xs bg-light-50 px-2 py-1 text-[11.5px] text-dark-400 ring-1 ring-secondary-200 transition-[opacity,transform] duration-500 [html.js_[data-shown]_&]:translate-y-0 [html.js_[data-shown]_&]:opacity-100 [html.js_&]:translate-y-1 [html.js_&]:opacity-0"
                >
                  <span className="text-status-live">✓</span>
                  {q}
                </li>
              ))}
            </ul>
            <div className="mt-5 flex flex-1 flex-col rounded-sm border border-secondary-200 bg-light-50 p-4">
              <div className="flex items-center justify-between">
                <p className="text-[11px] text-light-900">Shift note · draft</p>
                <p className="font-mono text-[10px] text-light-900">From 5 answers</p>
              </div>
              <div className="mt-3 space-y-2.5 text-[12.5px] leading-relaxed text-dark-400">
                <p><span className="font-medium text-dark-500">Goal 1 · Daily living.</span> Completed his morning routine independently; medication taken after one verbal reminder.</p>
                <p><span className="font-medium text-dark-500">Goal 2 · Community.</span> Walked to the public library with staff support and greeted staff on his own.</p>
                <p><span className="font-medium text-dark-500">Handoff.</span> Inhaler refill requested for the next shift.</p>
              </div>
              <div className="mt-auto flex items-center justify-between border-t border-light-600 pt-3">
                <span className="text-[11px] text-light-900">Caregiver review required</span>
                <span className="rounded-xs bg-dark-500 px-2 py-1 text-[11px] font-medium text-light-50">Review &amp; sign</span>
              </div>
            </div>
          </div>
          <p className="mt-5 text-[15px] leading-relaxed text-light-900">
            5 quick answers and a finished note, ready for review.
          </p>
        </div>
      </div>
    </Section>
  );
}
