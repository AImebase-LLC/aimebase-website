import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FinalCta } from "@/components/home/FinalCta";
import { JsonLd } from "@/components/JsonLd";
import { Fill } from "@/components/Placeholder";
import { ProjectCard } from "@/components/ProjectCard";
import { ProjectCover } from "@/components/ProjectCover";
import { Section, SectionLabel } from "@/components/Section";
import { StatusBadge } from "@/components/StatusBadge";
import { categoryLabel, clientLabel, getProject, getProjects, hasDetailPage } from "@/lib/projects";
import { canRender, cta, isPlaceholder, site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getProjects().filter(hasDetailPage).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = getProject((await params).slug);
  if (!p) return {};
  return { title: `${p.title} | AImbase Projects`, description: p.summary };
}

/** Wraps [PLACEHOLDER] text inside rendered markdown so it reads as a placeholder. */
function markPlaceholders(html: string) {
  return html.replace(
    /\[([^\]<]+)\]/g,
    '<span class="rounded-xs border border-dashed border-accent-300 bg-accent-50/70 px-1 font-mono text-[0.85em] text-accent-800">[$1]</span>',
  );
}

export default async function ProjectPage({ params }: Props) {
  const project = getProject((await params).slug);
  if (!project || !hasDetailPage(project)) notFound();

  const metrics = project.metrics.filter((m) => canRender(m.value));
  const hasTestimonial = project.testimonial.quote !== "" && canRender(project.testimonial.quote);
  const more = getProjects()
    .filter((p) => p.slug !== project.slug && hasDetailPage(p))
    .sort((a, b) => Number(b.category === project.category) - Number(a.category === project.category))
    .slice(0, 2);

  const meta: [string, string][] = [
    ["Industry", project.industry],
    ["Type", project.type.replace(/-/g, " ")],
    ["Languages", project.languages.join(", ")],
    ["Tags", project.tags.join(", ")],
    ["Stack", project.stack.join(", ")],
  ];

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          name: project.title,
          abstract: project.summary,
          creator: { "@type": "Organization", name: site.legalEntity },
          ...(project.link && !isPlaceholder(project.link) ? { url: project.link } : {}),
        }}
      />

      {/* 1–2. Breadcrumb + hero */}
      <section aria-labelledby="page-title" className="rule">
        <div className="frame">
          <nav aria-label="Breadcrumb" className="px-6 py-5 md:px-10">
            <ol className="mono-label flex gap-2 text-light-900">
              <li><Link href="/projects" className="hover:text-dark-500">Projects</Link></li>
              <li aria-hidden>/</li>
              <li aria-current="page" className="truncate text-dark-500">{project.title}</li>
            </ol>
          </nav>
          <div className="grid border-t border-light-600 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
            <div className="flex flex-col justify-between gap-10 px-6 py-14 md:px-10 md:py-20">
              <div>
                <div className="flex flex-wrap items-center gap-2 text-light-900">
                  <StatusBadge status={project.status} />
                  <span className="mono-label">· {categoryLabel(project.category)}</span>
                </div>
                <h1 id="page-title" className="display mt-6 max-w-[20ch] text-4xl md:text-[52px]">{project.title}</h1>
                <p className="mt-6 max-w-[52ch] text-[17px] leading-relaxed text-light-900">{project.summary}</p>
              </div>
              <dl className="flex flex-wrap gap-x-10 gap-y-4 text-sm">
                <div>
                  <dt className="mono-label text-light-900">Client</dt>
                  <dd className={`mt-1 ${project.client_public ? "" : "capitalize"}`}>{clientLabel(project)}</dd>
                </div>
                {project.date && canRender(project.date) && (
                  <div>
                    <dt className="mono-label text-light-900">Date</dt>
                    <dd className="mt-1"><Fill text={project.date} /></dd>
                  </div>
                )}
              </dl>
            </div>
            <div className="border-t border-light-600 p-3 lg:border-t-0 lg:border-l md:p-4">
              <ProjectCover project={project} priority className="rounded-md lg:aspect-auto lg:h-full lg:min-h-[420px]" />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Metrics bar */}
      {metrics.length > 0 && (
        <Section aria-label="Results" className="bg-light-50">
          <dl className={`grid sm:grid-cols-2 ${["", "lg:grid-cols-1", "lg:grid-cols-2", "lg:grid-cols-3", "lg:grid-cols-4"][metrics.length]}`}>
            {metrics.map((m) => (
              <div key={m.label} data-reveal className="flex flex-col-reverse border-b border-light-600 px-6 py-8 last:border-b-0 sm:border-r lg:border-b-0 lg:last:border-r-0 md:px-10">
                <dt className="mt-1 text-sm text-light-900">{m.label}</dt>
                <dd className="display text-4xl"><Fill text={m.value} /></dd>
              </div>
            ))}
          </dl>
        </Section>
      )}

      {/* 4 + 7. Body sections with meta sidebar */}
      <Section aria-label="Case study" className="bg-light-500">
        <div className="grid lg:grid-cols-[1fr_320px]">
          <article
            className="prose-aim px-6 py-14 md:px-10 md:py-20 lg:border-r lg:border-light-600"
            dangerouslySetInnerHTML={{ __html: markPlaceholders(project.bodyHtml) }}
          />
          <aside className="border-t border-light-600 lg:border-t-0">
            <SectionLabel>Project details</SectionLabel>
            <dl className="border-t border-light-600">
              {meta
                .filter(([, v]) => v && canRender(v))
                .map(([k, v]) => (
                  <div key={k} className="border-b border-light-600 px-6 py-4 md:px-10 lg:px-6">
                    <dt className="mono-label text-light-900">{k}</dt>
                    <dd className="mt-1 text-[15px] capitalize"><Fill text={v} /></dd>
                  </div>
                ))}
              {project.link && canRender(project.link) && (
                <div className="px-6 py-4 md:px-10 lg:px-6">
                  <dt className="mono-label text-light-900">Live link</dt>
                  <dd className="mt-1 text-[15px]">
                    {isPlaceholder(project.link) ? <Fill text={project.link} /> : (
                      <a href={project.link} className="underline underline-offset-4 hover:text-accent-700" rel="noopener">
                        {project.link.replace(/^https?:\/\//, "")}
                      </a>
                    )}
                  </dd>
                </div>
              )}
            </dl>
          </aside>
        </div>
      </Section>

      {/* 5. Gallery */}
      {project.gallery.length > 0 && (
        <Section aria-label="Gallery" className="bg-light-50">
          <div className="grid gap-3 p-3 sm:grid-cols-2 md:p-4">
            {project.gallery.map((g) => (
              <div key={g.src} className="relative aspect-[16/10] overflow-hidden rounded-md border border-light-600">
                <Image src={g.src} alt={g.alt} fill sizes="(min-width: 640px) 50vw, 100vw" className="object-cover" />
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* 6. Testimonial */}
      {hasTestimonial && (
        <Section aria-label="Testimonial" className="bg-light-50">
          <figure className="px-6 py-16 md:px-10">
            <blockquote className="display max-w-[30ch] text-3xl leading-tight">
              &ldquo;<Fill text={project.testimonial.quote} />&rdquo;
            </blockquote>
            <figcaption className="mt-6 text-[15px] text-light-900">
              <Fill text={project.testimonial.name} />, <Fill text={project.testimonial.role} />
            </figcaption>
          </figure>
        </Section>
      )}

      {/* 8. CTA block */}
      {project.cta === "demo" ? (
        <FinalCta />
      ) : (
        <FinalCta title="Have a similar problem?" variant="project" />
      )}
      {/* 9. More projects */}
      {more.length > 0 && (
        <Section aria-labelledby="more-title" className="bg-light-500">
          <SectionLabel>More projects</SectionLabel>
          <h2 id="more-title" className="sr-only">More projects</h2>
          <div className="grid gap-3 border-t border-light-600 p-3 sm:grid-cols-2 md:p-4">
            {more.map((p) => <ProjectCard key={p.slug} project={p} />)}
          </div>
        </Section>
      )}

    </>
  );
}
