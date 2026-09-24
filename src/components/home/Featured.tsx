import { ArrowLink } from "@/components/Button";
import { ProjectCard } from "@/components/ProjectCard";
import { Heading, Section, SectionLabel } from "@/components/Section";
import { getFeaturedProjects } from "@/lib/projects";

/** Home §8: the three `featured: true` projects, sorted by `order`. */
export function Featured({ index, total }: { index: number; total: number }) {
  const projects = getFeaturedProjects();
  if (projects.length === 0) return null;
  return (
    <Section aria-labelledby="shipped-title" className="bg-light-50">
      <SectionLabel index={index} total={total}>Projects</SectionLabel>
      <div className="flex flex-col gap-4 border-t border-light-600 px-6 py-14 md:flex-row md:items-end md:justify-between md:px-10 md:py-16">
        <Heading id="shipped-title" className="text-4xl md:text-5xl">
          What we&rsquo;ve shipped
        </Heading>
        <ArrowLink href="/projects">See all projects</ArrowLink>
      </div>
      <div className="grid gap-3 border-t border-light-600 p-3 md:grid-cols-3 md:p-4">
        {projects.map((p, i) => (
          <div key={p.slug} data-reveal style={{ "--d": i } as React.CSSProperties} className="h-full">
            <ProjectCard project={p} />
          </div>
        ))}
      </div>
    </Section>
  );
}
