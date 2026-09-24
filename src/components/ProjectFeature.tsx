import Link from "next/link";
import { categoryLabel, clientLabel, type Project } from "@/lib/projects";
import { ProjectCover } from "./ProjectCover";
import { StatusBadge } from "./StatusBadge";

/** Wide project card: cover on one side, the story and numbers on the other. */
export function ProjectFeature({ project, extra }: { project: Project; extra?: React.ReactNode }) {
  const metrics = project.metrics.slice(0, 3);
  return (
    <article
      data-spotlight
      className="group grid h-full overflow-hidden rounded-lg border border-light-600 bg-light-50 transition-[border-color,box-shadow] duration-300 hover:border-light-700 hover:shadow-[0_18px_40px_-22px_rgb(11_11_11/0.28)] md:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]"
    >
      <Link href={`/projects/${project.slug}`} data-event="project_card_click" tabIndex={-1} aria-hidden className="block border-b border-light-600 md:border-r md:border-b-0">
        <ProjectCover project={project} large className="h-full min-h-64 !aspect-auto md:min-h-full" />
      </Link>
      <div className="flex flex-col p-6 md:p-8">
        <div className="flex flex-wrap items-center gap-2 text-light-900">
          <StatusBadge status={project.status} />
          <span className="mono-label">· {categoryLabel(project.category)}</span>
          <span className="mono-label hidden sm:inline">· {project.category === "product" ? "AImbase" : clientLabel(project)}</span>
        </div>
        <h3 className="display mt-5 text-3xl leading-tight">
          <Link href={`/projects/${project.slug}`} data-event="project_card_click" className="transition-colors hover:text-accent-700">
            {project.title}
          </Link>
        </h3>
        <p className="mt-3 text-[15px] leading-relaxed text-light-900">{project.summary}</p>
        <p className="mt-4 text-[15px] font-medium text-accent-700">▸ {project.outcome_headline}</p>
        {metrics.length > 0 && (
          <dl className="mt-6 grid grid-cols-3 gap-3 border-t border-light-600 pt-5">
            {metrics.map((m) => (
              <div key={m.label} className="flex flex-col-reverse gap-1">
                <dt className="text-[12px] leading-snug text-light-900">{m.label}</dt>
                <dd className="display text-2xl">{m.value}</dd>
              </div>
            ))}
          </dl>
        )}
        <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-3 pt-7">
          <Link
            href={`/projects/${project.slug}`}
            data-event="project_card_click"
            className="group/l inline-flex items-center gap-1.5 text-[15px] font-medium text-dark-500 hover:text-accent-700"
          >
            Read the case study <span aria-hidden className="transition-transform group-hover/l:translate-x-0.5">→</span>
          </Link>
          {extra}
        </div>
      </div>
    </article>
  );
}
