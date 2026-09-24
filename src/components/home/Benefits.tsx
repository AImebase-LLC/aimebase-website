import { ArrowLink, Button } from "@/components/Button";
import { Heading, Section, SectionLabel } from "@/components/Section";
import { cta } from "@/lib/site";

function Card({ title, body, children, className = "", d = 0 }: { title: string; body: React.ReactNode; children?: React.ReactNode; className?: string; d?: number }) {
  return (
    <div
      data-reveal
      data-spotlight
      style={{ "--d": d } as React.CSSProperties}
      className={`flex flex-col justify-between gap-10 overflow-hidden rounded-lg border border-light-600 bg-light-50 p-6 transition-[border-color,box-shadow] duration-300 hover:border-light-700 hover:shadow-[0_16px_40px_-24px_rgb(11_11_11/0.25)] md:p-8 ${className}`}
    >
      {children}
      <div>
        <h3 className="display text-2xl">{title}</h3>
        <div className="mt-2 text-[15px] leading-relaxed text-light-900">{body}</div>
      </div>
    </div>
  );
}

/** Home §6: bento of buyer-facing benefits, followed by the mid-page demo CTA (§9). */
export function Benefits({ index, total }: { index: number; total: number }) {
  return (
    <Section aria-labelledby="why-title" className="bg-light-500">
      <SectionLabel index={index} total={total}>For agency leaders</SectionLabel>
      <div className="border-t border-light-600 px-6 py-14 md:px-10 md:py-16">
        <Heading id="why-title" className="text-4xl md:text-5xl">
          Why agencies choose AImdoc
        </Heading>
      </div>
      <div className="grid gap-3 border-t border-light-600 p-3 md:grid-cols-3 md:p-4">
        <Card
          className="md:col-span-2"
          title="Notes that hold up."
          body="Consistent structure mapped to client goals, ready for audits. Every note follows your agency's format and the person's plan, whoever wrote it and however late it was."
        >
          <div className="grid gap-2 sm:grid-cols-3" aria-hidden>
            {["Goal 1 · Daily living", "Goal 2 · Health", "Goal 3 · Community"].map((g) => (
              <div key={g} className="rounded-sm border border-light-600 bg-light-500 p-3">
                <div className="flex items-center justify-between">
                  <span className="text-[12px] font-medium text-dark-400">{g}</span>
                  <span className="text-[12px] text-status-live">✓</span>
                </div>
                <div className="mt-3 space-y-1.5">
                  <div className="h-1.5 w-full rounded-full bg-light-600" />
                  <div className="h-1.5 w-4/5 rounded-full bg-light-600" />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card
          d={1}
          title="Time back for your team."
          body="Less after-shift paperwork means less overtime and burnout. The last hour of the shift goes back to the people who worked it."
        >
          <div aria-hidden>
            <div className="flex items-end gap-1">
              {Array.from({ length: 16 }).map((_, h) => (
                <div
                  key={h}
                  className={`h-14 flex-1 rounded-xs ${h === 15 ? "bg-status-live-bg ring-1 ring-inset ring-status-live/30" : "bg-secondary-100"}`}
                />
              ))}
            </div>
            <div className="mt-2 flex justify-between font-mono text-[10px] text-light-900">
              <span>Shift</span>
              <span className="text-status-live">Last hour, back</span>
            </div>
          </div>
        </Card>

        <Card
          title="Built with care for sensitive data."
          d={2}
          body={
            <>
              A caregiver signs every note before it goes anywhere. Your compliance lead gets every answer in writing,
              before you share a single record.
              <span className="mt-4 block">
                <ArrowLink href="/aimdoc/security" className="!text-sm">How AImdoc handles data</ArrowLink>
              </span>
            </>
          }
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-md bg-secondary-100 text-accent-700" aria-hidden>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="4" y="9" width="12" height="8" rx="1.5" />
              <path d="M7 9V6.5a3 3 0 0 1 6 0V9" />
            </svg>
          </span>
        </Card>

        <Card
          d={3}
          className="md:col-span-2 !bg-dark-500 !border-dark-500 [&_h3]:text-light-50 [&_div]:text-dark-100"
          title="Made by someone who did the job."
          body="Designed from real DSP shifts, not guessed from the outside."
        >
          <div className="flex flex-col gap-6">
            <p className="mono-label !text-accent-300">Former Direct Support Professional · Maine</p>
            <p className="display max-w-[30ch] text-2xl leading-snug !text-light-50 md:text-[28px]">
              &ldquo;I did 16-hour shifts as a Direct Support Professional in Maine.&rdquo;
            </p>
            <ol className="flex flex-wrap items-center gap-2 font-mono text-[11px] tracking-wide uppercase" aria-label="Founder's path">
              {["Rwanda", "Italy", "DSP in Maine", "MS in AI, Roux", "AImbase"].map((p, i, a) => (
                <li key={p} className="flex items-center gap-2 !text-dark-100">
                  <span className={`rounded-xs border px-2 py-1 ${i === a.length - 1 ? "border-accent-500/50 !text-accent-300" : "border-white/10"}`}>{p}</span>
                  {i < a.length - 1 && <span aria-hidden className="!text-dark-300">→</span>}
                </li>
              ))}
            </ol>
          </div>
        </Card>
      </div>

      <div className="flex flex-col items-start gap-6 border-t border-light-600 bg-secondary-100 px-6 py-10 md:flex-row md:items-center md:justify-between md:px-10">
        <p className="display max-w-[30ch] text-2xl md:text-[28px]">
          Finish your notes in minutes, not the last hour of your shift.
        </p>
        <Button href={cta.demo.href} event={cta.demo.event} size="lg">
          {cta.demo.label}
        </Button>
      </div>
    </Section>
  );
}
