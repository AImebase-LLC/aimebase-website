import Link from "next/link";
import { categoryLabel, hasDetailPage, type Project } from "@/lib/projects";
import { canRender } from "@/lib/site";
import { Fill } from "./Placeholder";
import { ProjectCover } from "./ProjectCover";
import { StatusBadge } from "./StatusBadge";

/**
 * Project card, content spec §7.4. The title link stretches over the whole
 * card, so it stays one big click target while the live-site link sits above it.
 */
export function ProjectCard({ project }: { project: Project }) {
  const isResearch = project.status === "research";
  const linked = hasDetailPage(project);

  return (
    <article
      data-spotlight={linked ? "" : undefined}
      className={`group relative flex h-full flex-col overflow-hidden rounded-md border border-light-600 bg-light-50 transition-[border-color,box-shadow,transform] duration-300 ${
        linked ? "hover:-translate-y-0.5 hover:border-light-700 hover:shadow-[0_18px_40px_-20px_rgb(11_11_11/0.25)] focus-within:border-light-700" : ""
      }`}
    >
      {!isResearch && <ProjectCover project={project} className="border-b border-light-600" />}
      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center gap-2 text-light-900">
          <StatusBadge status={project.status} />
          {!isResearch && <span className="mono-label">· {categoryLabel(project.category)}</span>}
        </div>
        <h3 className="display mt-4 text-[22px] leading-tight">
          {linked ? (
            <Link
              href={`/projects/${project.slug}`}
              data-event="project_card_click"
              className="after:absolute after:inset-0 after:z-0 after:content-[''] focus-visible:outline-none"
            >
              {project.title}
              <span aria-hidden className="ml-1.5 inline-block text-accent-600 opacity-0 transition-[opacity,transform] duration-300 group-hover:translate-x-0.5 group-hover:opacity-100">→</span>
            </Link>
          ) : (
            project.title
          )}
        </h3>
        <p className="mt-2 line-clamp-2 text-[15px] leading-relaxed text-light-900">{project.summary}</p>
        {!isResearch && project.outcome_headline && canRender(project.outcome_headline) && (
          <p className="mt-4 text-[15px] font-medium text-accent-700">
            <span aria-hidden>▸ </span>
            <Fill text={project.outcome_headline} />
          </p>
        )}
        {!isResearch && (
          <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-5">
            <ul className="flex flex-wrap gap-1.5" aria-label="Tags">
              {project.tags.slice(0, 3).map((t) => (
                <li key={t} className="rounded-xs border border-light-600 bg-light-500 px-2 py-0.5 text-xs text-dark-400">
                  {t}
                </li>
              ))}
            </ul>
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                data-event="live_site_click"
                className="group/live relative z-10 inline-flex items-center gap-1 rounded-xs text-[13px] font-medium text-accent-700 hover:text-accent-800"
              >
                Live site
                <span aria-hidden className="transition-transform group-hover/live:-translate-y-0.5 group-hover/live:translate-x-0.5">↗</span>
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
