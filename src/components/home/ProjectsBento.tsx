import Link from "next/link";
import { ArrowLink, Button } from "@/components/Button";
import { ProjectCard } from "@/components/ProjectCard";
import { ProjectFeature } from "@/components/ProjectFeature";
import { Heading, Section, SectionLabel } from "@/components/Section";
import { getFeaturedProjects } from "@/lib/projects";
import { cta } from "@/lib/site";

/** Home centerpiece: what we've shipped, as a bento, ending in what's next. */
export function ProjectsBento({ index, total }: { index: number; total: number }) {
  const [lead, ...rest] = getFeaturedProjects();
  if (!lead) return null;
  return (
    <Section id="work" aria-labelledby="work-title" className="scroll-mt-16 bg-light-50">
      <SectionLabel index={index} total={total}>Our work</SectionLabel>
      <div className="flex flex-col gap-4 border-t border-light-600 px-6 py-14 md:flex-row md:items-end md:justify-between md:px-10 md:py-16">
        <div>
          <Heading id="work-title" className="text-4xl md:text-6xl">What we&rsquo;ve shipped</Heading>
          <p className="mt-4 max-w-[52ch] text-[17px] leading-relaxed text-light-900">
            Real software in production, built for real people. Each project started with one problem.
          </p>
        </div>
        <ArrowLink href="/projects">See all projects</ArrowLink>
      </div>

      <div className="grid gap-3 border-t border-light-600 p-3 md:p-4 lg:grid-cols-6">
        <div data-reveal className="lg:col-span-6">
          <ProjectFeature
            project={lead}
            extra={
              lead.category === "product" ? (
                <Link href="/aimdoc" className="group/p inline-flex items-center gap-1.5 text-[15px] font-medium text-accent-700 hover:text-accent-800">
                  Explore the product <span aria-hidden className="transition-transform group-hover/p:translate-x-0.5">→</span>
                </Link>
              ) : null
            }
          />
        </div>
        {rest.map((p, i) => (
          <div key={p.slug} data-reveal style={{ "--d": i + 1 } as React.CSSProperties} className="h-full lg:col-span-2">
            <ProjectCard project={p} />
          </div>
        ))}
        <div
          data-reveal
          style={{ "--d": 3 } as React.CSSProperties}
          className="relative flex flex-col justify-between gap-10 overflow-hidden rounded-md bg-dark-500 p-6 text-light-50 md:p-8 lg:col-span-2"
        >
          <div aria-hidden className="dot-field pointer-events-none absolute inset-0 [mask-image:radial-gradient(80%_70%_at_100%_0%,#000,transparent)]" />
          <div aria-hidden className="pointer-events-none absolute -right-16 -bottom-20 h-56 w-56 rounded-full bg-accent-500/25 blur-3xl" />
          <div className="relative">
            <span className="inline-flex items-center gap-1.5 rounded-xs bg-white/10 px-1.5 py-0.5 font-mono text-[10px] tracking-wide uppercase">
              <span aria-hidden className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent-500" /> What&rsquo;s next
            </span>
            <p className="display mt-6 text-2xl leading-snug">
              We&rsquo;re researching the next big problem to solve. When we find it, we&rsquo;ll go as deep on it as we did on
              documentation.
            </p>
          </div>
          <div className="relative">
            <p className="text-[14px] text-dark-100">Have a problem worth solving?</p>
            <Button href={cta.project.href} event={cta.project.event} className="mt-3">
              {cta.project.label}
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}
