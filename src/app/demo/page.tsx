import type { Metadata } from "next";
import { ArrowLink } from "@/components/Button";
import { CalendarEmbed } from "@/components/CalendarEmbed";
import { ContactForm } from "@/components/ContactForm";
import { ProductPreview } from "@/components/home/ProductPreview";
import { SectionLabel } from "@/components/Section";
import { cta, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Book an AImdoc demo | AImbase",
  description: "See how AImdoc turns a few guided answers into a complete, compliant care note, with caregiver sign-off on every one.",
};

const agenda = [
  "A real shift note, drafted from five short answers",
  "Caregiver review and sign-off, step by step",
  "How AImdoc maps notes to your agency's format and each person's goals",
  "Data handling, in writing, for your compliance lead",
  "A quote based on your team size",
];

export default function DemoPage() {
  return (
    <>
      <section aria-labelledby="page-title" className="rule">
        <div className="frame">
          <SectionLabel>AImdoc demo</SectionLabel>
          <div className="grid border-t border-light-600 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]">
            <div className="px-6 py-14 md:px-10 md:py-20 lg:border-r lg:border-light-600">
              <h1 id="page-title" className="animate-rise display text-5xl md:text-6xl">Book an AImdoc demo</h1>
              <p className="animate-rise mt-6 max-w-[42ch] text-[17px] leading-relaxed text-light-900 [animation-delay:100ms]">
                AImdoc turns a few guided answers into complete, compliant care notes. Built by a former Direct Support
                Professional who worked that shift.
              </p>
              <p className="mono-label mt-10 text-light-900">What we&rsquo;ll cover</p>
              <ol className="mt-3 divide-y divide-light-600 border-y border-light-600">
                {agenda.map((s, i) => (
                  <li key={s} data-reveal style={{ "--d": i } as React.CSSProperties} className="flex gap-4 py-3.5 text-[15px]">
                    <span className="font-mono text-sm text-accent-700">0{i + 1}</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ol>
              <ArrowLink href={cta.project.href} event={cta.project.event} className="mt-10">
                Need something custom built? Start a project
              </ArrowLink>
            </div>
            <div className="bg-light-50 px-6 py-14 md:px-10 md:py-20">
              {site.calendarLink ? (
                <CalendarEmbed />
              ) : (
                <>
                  <h2 className="display text-3xl">Request a time</h2>
                  <p className="mt-2 mb-8 text-[15px] text-light-900">
                    Tell us a little about your agency and we&rsquo;ll email you to set up the demo.
                  </p>
                  <ContactForm initial="demo" lockInterest />
                </>
              )}
            </div>
          </div>
        </div>
      </section>
      <section aria-label="Preview" className="rule bg-secondary-100">
        <div className="frame dot-grid flex justify-center px-6 py-16 md:py-20">
          <ProductPreview />
        </div>
      </section>
    </>
  );
}
