import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/Button";
import { FinalCta } from "@/components/home/FinalCta";
import { PageHero } from "@/components/PageHero";
import { ProjectCard } from "@/components/ProjectCard";
import { Heading, Section, SectionLabel } from "@/components/Section";
import { getProjects } from "@/lib/projects";
import { cta } from "@/lib/site";

export const metadata: Metadata = {
  title: "Custom software for community organizations | AImbase",
  description:
    "We build voting platforms, websites, payments, and AI tools for community groups and nonprofits, and ship in days.",
};

const builds = [
  { title: "Voting and election platforms", type: "voting-platform", body: "Secure, bilingual ballots members can cast from anywhere." },
  { title: "Community websites", type: "website", body: "One home online for your organization, easy to keep current." },
  { title: "Member contributions and donations", type: "payments", body: "Recurring member contributions and one-time gifts, built in." },
  { title: "Internal tools with AI assistance", type: "internal-tool", body: "The manual work that slows your team down, handled with AI help." },
];

const process = [
  { title: "Talk", body: "An intro call to understand the problem, the people it affects, and any date you're working toward." },
  { title: "Scope", body: "A short, plain-language plan with a clear timeline and price, before any work starts." },
  { title: "Build", body: "Working versions early, so you can react to real software instead of documents." },
  { title: "Launch & support", body: "We stay on after launch to fix, adjust, and add what your community needs next." },
];

const TOTAL = 4;

export default function CustomPage() {
  const all = getProjects();
  const customProjects = all.filter((p) => p.category === "custom");
  // "Member contributions" maps to projects tagged Payments as well as type "payments".
  const matchFor = (type: string) =>
    all.find((p) => p.type === type || (type === "payments" && p.tags.includes("Payments")));

  return (
    <>
      <PageHero
        aside={
          <div className="grid w-full max-w-md gap-3">
            {getProjects().filter((p) => p.category === "custom").map((p) => (
              <div key={p.slug} className="rounded-md border border-secondary-300 bg-light-50 p-4 shadow-[0_16px_40px_-26px_rgb(107_28_2/0.5)]">
                <p className="mono-label !text-[10px] text-light-900">{p.client}</p>
                <p className="display mt-1.5 text-lg leading-snug">{p.title.split(":").pop()?.trim()}</p>
                <p className="mt-1 text-[13px] font-medium text-accent-700">▸ {p.outcome_headline}</p>
              </div>
            ))}
          </div>
        }
        label="Custom builds"
        title="Software for organizations that big tech doesn’t build for."
        sub="We build AI-powered and custom software for community groups, nonprofits, and small organizations. We ship working products in days, not quarters."
      >
        <Button href={cta.project.href} event={cta.project.event} size="lg">{cta.project.label}</Button>
      </PageHero>

      <Section aria-labelledby="build-title" className="bg-light-50">
        <SectionLabel index={1} total={TOTAL}>What we build</SectionLabel>
        <div className="border-t border-light-600 px-6 py-14 md:px-10">
          <Heading id="build-title" className="text-4xl md:text-5xl">What we build</Heading>
        </div>
        <ul className="grid gap-3 border-t border-light-600 p-3 sm:grid-cols-2 lg:grid-cols-4 md:p-4">
          {builds.map((b, i) => {
            const match = matchFor(b.type);
            const inner = (
              <>
                <span className="font-mono text-xs text-light-900">0{i + 1}</span>
                <div>
                  <p className="display text-xl leading-snug">{b.title}</p>
                  <p className="mt-2 text-[14px] leading-relaxed text-light-900">{b.body}</p>
                  {match && <p className="mt-4 text-sm font-medium text-accent-700">See the project <span aria-hidden className="inline-block transition-transform group-hover:translate-x-0.5">→</span></p>}
                </div>
              </>
            );
            const cls = "group flex h-full min-h-56 flex-col justify-between gap-8 rounded-lg border border-light-600 bg-light-500 p-6 transition-[border-color,transform,box-shadow] duration-300";
            return (
              <li key={b.type} data-reveal data-spotlight style={{ "--d": i } as React.CSSProperties} className="rounded-lg">
                {match ? (
                  <Link href={`/projects?type=${match.type}`} data-event="project_card_click" className={`${cls} hover:-translate-y-0.5 hover:border-light-700 hover:shadow-[0_16px_36px_-22px_rgb(11_11_11/0.3)]`}>{inner}</Link>
                ) : (
                  <div className={cls}>{inner}</div>
                )}
              </li>
            );
          })}
        </ul>
      </Section>

      <Section aria-labelledby="process-title" className="bg-light-500">
        <SectionLabel index={2} total={TOTAL}>How a project works</SectionLabel>
        <div className="border-t border-light-600 px-6 py-14 md:px-10">
          <Heading id="process-title" className="text-4xl md:text-5xl">How a project works</Heading>
        </div>
        <ol className="grid border-t border-light-600 sm:grid-cols-2 lg:grid-cols-4">
          {process.map((s, i) => (
            <li key={s.title} data-reveal style={{ "--d": i } as React.CSSProperties} className="border-b border-light-600 px-6 py-10 sm:odd:border-r lg:border-r lg:border-b-0 lg:last:border-r-0 md:px-8">
              <span className="font-mono text-sm text-accent-700">0{i + 1}</span>
              <h3 className="display mt-6 text-2xl">{s.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-light-900">{s.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      {customProjects.length > 0 && (
        <Section aria-labelledby="proof-title" className="bg-light-50">
          <SectionLabel index={3} total={TOTAL}>Proof</SectionLabel>
          <div className="border-t border-light-600 px-6 py-14 md:px-10">
            <Heading id="proof-title" className="text-4xl md:text-5xl">Built for communities</Heading>
          </div>
          <div className={`grid gap-3 border-t border-light-600 p-3 sm:grid-cols-2 md:p-4 ${customProjects.length > 2 ? "lg:grid-cols-3" : ""}`}>
            {customProjects.map((p, i) => (
              <div key={p.slug} data-reveal style={{ "--d": i } as React.CSSProperties} className="h-full">
                <ProjectCard project={p} />
              </div>
            ))}
          </div>
        </Section>
      )}

      <Section aria-labelledby="fit-title" className="bg-secondary-100">
        <SectionLabel index={4} total={TOTAL}>Fit check</SectionLabel>
        <div className="grid border-t border-secondary-300 md:grid-cols-2">
          <div className="px-6 py-14 md:border-r md:border-secondary-300 md:px-10">
            <Heading id="fit-title" className="text-4xl md:text-5xl">We&rsquo;re a good fit if:</Heading>
          </div>
          <ul className="divide-y divide-secondary-300">
            {["You serve a real community.", "You're slowed down by manual work.", "Generic tools haven't fit."].map((t) => (
              <li key={t} className="flex items-center gap-4 px-6 py-7 text-lg md:px-10">
                <span aria-hidden className="flex h-6 w-6 shrink-0 items-center justify-center rounded-sm bg-dark-500 text-xs text-light-50">✓</span>
                {t}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <FinalCta title="Tell us about the problem." variant="project" />
    </>
  );
}
