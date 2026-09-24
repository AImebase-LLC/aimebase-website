import Image from "next/image";
import type { Project } from "@/lib/projects";
import { ProjectArt } from "./ProjectArt";

/** Cover image (1600×1000). Until the file exists, an illustrated cover drawn for the project type. */
export function ProjectCover({ project, priority = false, className = "", large = false }: { project: Project; priority?: boolean; className?: string; large?: boolean }) {
  if (project.coverExists) {
    return (
      <div className={`relative aspect-[16/10] overflow-hidden bg-light-600 ${className}`}>
        <Image
          src={project.cover}
          alt={project.cover_alt}
          fill
          sizes="(min-width: 768px) 400px, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          priority={priority}
        />
      </div>
    );
  }
  return (
    <div
      role="img"
      aria-label={project.cover_alt || project.title}
      className={`dot-grid relative flex aspect-[16/10] items-center justify-center overflow-hidden bg-secondary-100 ${className}`}
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-secondary-100 via-transparent to-transparent" />
      <div aria-hidden className={`relative flex w-full justify-center ${large ? "scale-110 md:scale-[1.45]" : ""}`}>
        <ProjectArt type={project.type} />
      </div>
    </div>
  );
}
