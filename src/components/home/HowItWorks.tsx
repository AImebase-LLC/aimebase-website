import { Heading, Section, SectionLabel } from "@/components/Section";
import { StepScreen } from "@/components/StepScreen";

export const steps = [
  {
    title: "Answer short guided questions.",
    body: "AImdoc asks about the shift in plain language, tied to each person's goals.",
  },
  {
    title: "Get a complete draft note.",
    body: "It writes a professional note that follows your agency's format and the client's plan.",
  },
  {
    title: "Review and submit.",
    body: "The caregiver checks the note, edits anything, and signs off. A human stays in control.",
  },
];

/** Home §4 */
export function HowItWorks({ index, total }: { index: number; total: number }) {
  return (
    <Section aria-labelledby="how-title" className="bg-light-50">
      <SectionLabel index={index} total={total}>How it works</SectionLabel>
      <div className="border-t border-light-600 px-6 py-14 md:px-10 md:py-16">
        <Heading id="how-title" className="max-w-[20ch] text-4xl md:text-5xl">
          How AImdoc works
        </Heading>
      </div>
      <ol className="grid border-t border-light-600 md:grid-cols-3">
        {steps.map((s, i) => (
          <li
            key={i}
            data-reveal
            data-spotlight
            style={{ "--d": i } as React.CSSProperties}
            className="group flex flex-col gap-8 border-b border-light-600 px-6 py-10 last:border-b-0 md:border-r md:border-b-0 md:px-8 md:last:border-r-0"
          >
            <span className="flex items-center gap-3 font-mono text-sm text-accent-700">
              0{i + 1}
              <span aria-hidden className="h-px flex-1 origin-left scale-x-[0.25] bg-light-600 transition-transform duration-500 group-hover:scale-x-100 group-hover:bg-accent-300" />
            </span>
            <div className="dot-grid -mx-2 flex min-h-[210px] items-center justify-center rounded-md bg-secondary-100 p-4 transition-transform duration-500 group-hover:-translate-y-1">
              <StepScreen i={i} compact />
            </div>
            <div>
              <h3 className="display text-xl">{s.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-light-900">{s.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
