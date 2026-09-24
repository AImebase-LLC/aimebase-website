import type { Metadata } from "next";
import Link from "next/link";
import { FinalCta } from "@/components/home/FinalCta";
import { PageHero } from "@/components/PageHero";
import { ProjectCard } from "@/components/ProjectCard";
import { ProjectFeature } from "@/components/ProjectFeature";
import { Section } from "@/components/Section";
import { StatusBadge } from "@/components/StatusBadge";
import { getProjects } from "@/lib/projects";
import { cta } from "@/lib/site";

export const metadata: Metadata = {
  title: "Projects | AImbase",
  description:
    "Software in production for caregivers and community organizations, including a bilingual election platform built in days.",
};

const filters = [
  { key: "all", label: "All" },
  { key: "product", label: "Products" },
  { key: "custom", label: "Custom builds" },
] as const;

type Search = { category?: string; industry?: string; type?: string };

function href(next: Search) {
  const q = new URLSearchParams(Object.entries(next).filter(([, v]) => v && v !== "all") as [string, string][]);
  const s = q.toString();
  return s ? `/projects?${s}` : "/projects";
}

export default async function ProjectsPage({ searchParams }: { searchParams: Promise<Search> }) {
  const sp = await searchParams;
  const category = sp.category ?? "all";
  const all = getProjects();
  const industries = [...new Set(all.map((p) => p.industry).filter(Boolean))].sort();

  const shown = all.filter(
    (p) =>
      (category === "all" || p.category === category) &&
      (!sp.industry || p.industry === sp.industry) &&
      (!sp.type || p.type === sp.type),
  );
  const research = shown.filter((p) => p.status === "research");
  const built = shown.filter((p) => p.status !== "research");

  const pill = (active: boolean) =>
    `inline-flex h-8 items-center rounded-sm border px-3 text-sm transition-colors ${
      active ? "border-dark-500 bg-dark-500 text-light-50" : "border-light-600 bg-light-50 text-dark-400 hover:border-light-700"
    }`;

  return (
    <>
      <PageHero
        label="Projects"
        title="What we’ve shipped"
        sub="Real software in production, built for real people. Each project started with one problem."
        aside={
          <dl className="grid w-full max-w-sm grid-cols-2 gap-3">
            {[
              { v: String(all.length), l: "projects built in 2026" },
              { v: String(all.filter((p) => p.status === "live" || p.status === "pilot").length), l: "in real use today" },
              { v: String(all.filter((p) => p.category === "product").length), l: "product, AImdoc" },
              { v: String(all.filter((p) => p.category === "custom").length), l: "custom builds" },
            ].map((x) => (
              <div key={x.l} className="flex flex-col-reverse gap-1 rounded-md border border-secondary-300 bg-light-50 p-4 shadow-[0_14px_30px_-22px_rgb(107_28_2/0.5)]">
                <dt className="text-[13px] leading-snug text-light-900">{x.l}</dt>
                <dd className="display text-4xl">{x.v}</dd>
              </div>
            ))}
            <div className="col-span-2 flex flex-wrap gap-2 pt-1">
              {["live", "pilot", "in-development", "research"].map((st) => (
                <StatusBadge key={st} status={st} />
              ))}
            </div>
          </dl>
        }
      />
      <Section aria-label="Project list" className="bg-light-50">
        <nav aria-label="Filter projects" className="flex flex-col gap-3 px-6 py-5 md:flex-row md:items-center md:justify-between md:px-10">
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <Link key={f.key} href={href({ ...sp, category: f.key, type: undefined })} aria-current={category === f.key ? "true" : undefined} className={pill(category === f.key)}>
                {f.label}
              </Link>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="mono-label text-light-900">Industry</span>
            <Link href={href({ ...sp, industry: undefined })} className={pill(!sp.industry)}>Any</Link>
            {industries.map((i) => (
              <Link key={i} href={href({ ...sp, industry: i })} aria-current={sp.industry === i ? "true" : undefined} className={`${pill(sp.industry === i)} capitalize`}>
                {i}
              </Link>
            ))}
          </div>
        </nav>
        {sp.type && (
          <div className="border-t border-light-600 px-6 py-3 text-sm text-light-900 md:px-10">
            Showing <span className="font-medium text-dark-500">{sp.type.replace(/-/g, " ")}</span> projects ·{" "}
            <Link href={href({ ...sp, type: undefined })} className="underline underline-offset-4 hover:text-dark-500">clear</Link>
          </div>
        )}
        <div className="grid gap-3 border-t border-light-600 p-3 sm:grid-cols-2 lg:grid-cols-3 md:p-4">
          {built.map((p, i) =>
            i === 0 ? (
              <div key={p.slug} data-reveal className="sm:col-span-2 lg:col-span-3">
                <ProjectFeature
                  project={p}
                  extra={
                    p.category === "product" ? (
                      <Link href="/aimdoc" className="inline-flex items-center gap-1.5 text-[15px] font-medium text-accent-700 hover:text-accent-800">
                        Explore the product <span aria-hidden>→</span>
                      </Link>
                    ) : null
                  }
                />
              </div>
            ) : (
              <div key={p.slug} data-reveal style={{ "--d": i } as React.CSSProperties} className="h-full">
                <ProjectCard project={p} />
              </div>
            ),
          )}
          {research.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
          {research.length === 0 && (category === "all" || category === "product") && !sp.type && (
            <article data-reveal className="relative flex min-h-80 flex-col justify-between gap-10 overflow-hidden rounded-md bg-dark-500 p-6 text-light-50 md:p-8">
              <div aria-hidden className="dot-field pointer-events-none absolute inset-0 [mask-image:radial-gradient(80%_70%_at_100%_0%,#000,transparent)]" />
              <div aria-hidden className="pointer-events-none absolute -right-16 -bottom-20 h-56 w-56 rounded-full bg-accent-500/25 blur-3xl" />
              <span className="relative inline-flex w-fit items-center gap-1.5 rounded-xs bg-white/10 px-1.5 py-0.5 font-mono text-[10px] tracking-wide uppercase">
                <span aria-hidden className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent-500" /> What&rsquo;s next
              </span>
              <div className="relative">
                <p className="display text-2xl leading-snug">
                  We&rsquo;re researching the next big problem to solve. When we find it, we&rsquo;ll go as deep on it as we did on
                  documentation.
                </p>
                <Link href={cta.project.href} data-event={cta.project.event} className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-accent-300 hover:text-accent-200">
                  Have a problem worth solving? <span aria-hidden>→</span>
                </Link>
              </div>
            </article>
          )}
          {built.length === 0 && research.length === 0 && (
            <p className="px-3 py-10 text-light-900">No projects match these filters yet.</p>
          )}
        </div>
      </Section>
      <FinalCta variant="studio" title="Have a problem worth solving?" />
    </>
  );
}
