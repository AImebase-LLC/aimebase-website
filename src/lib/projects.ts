import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";
import { showPlaceholders } from "./site";

/** Frontmatter schema, content spec §7.2 */
export type ProjectStatus = "live" | "pilot" | "in-development" | "research";

export type Project = {
  title: string;
  slug: string;
  category: "product" | "custom";
  type: string;
  industry: string;
  client: string;
  client_public: boolean;
  status: string;
  date: string;
  featured: boolean;
  order: number;
  summary: string;
  problem: string;
  outcome_headline: string;
  metrics: { value: string; label: string }[];
  tags: string[];
  stack: string[];
  languages: string[];
  cover: string;
  cover_alt: string;
  coverExists: boolean;
  gallery: { src: string; alt: string }[];
  testimonial: { quote: string; name: string; role: string };
  link: string;
  cta: "demo" | "project" | "";
  bodyHtml: string;
};

const DIR = path.join(process.cwd(), "content", "projects");
const PUBLIC = path.join(process.cwd(), "public");

/**
 * With placeholders hidden, strip [BRACKETED] founder notes from the body and
 * drop any §7.3 section left with nothing real to say.
 */
function cleanBody(md: string): string {
  if (showPlaceholders) return md;
  const placeholder = /\[[^\]]+\](?!\()/g;
  return md
    .split(/^(?=## )/m)
    .map((section) => {
      const [heading, ...rest] = section.split("\n");
      if (!heading.startsWith("## ")) return section.replace(placeholder, "").trim();
      const body = rest.join("\n").replace(placeholder, "").replace(/[ \t]+$/gm, "").trim();
      return body ? `${heading}\n${body}` : "";
    })
    .filter(Boolean)
    .join("\n\n");
}

function load(file: string): Project {
  const raw = fs.readFileSync(path.join(DIR, file), "utf8");
  const { data, content } = matter(raw);
  const cover = String(data.cover ?? "");
  return {
    title: String(data.title ?? ""),
    slug: String(data.slug ?? file.replace(/\.md$/, "")),
    category: data.category === "product" ? "product" : "custom",
    type: String(data.type ?? ""),
    industry: String(data.industry ?? ""),
    client: String(data.client ?? ""),
    client_public: data.client_public !== false,
    status: String(data.status ?? ""),
    date: String(data.date ?? ""),
    featured: data.featured === true,
    order: typeof data.order === "number" ? data.order : 99,
    summary: String(data.summary ?? ""),
    problem: String(data.problem ?? ""),
    outcome_headline: String(data.outcome_headline ?? ""),
    metrics: Array.isArray(data.metrics) ? data.metrics.map((m: Record<string, unknown>) => ({ value: String(m.value ?? ""), label: String(m.label ?? "") })) : [],
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    stack: Array.isArray(data.stack) ? data.stack.map(String) : [],
    languages: Array.isArray(data.languages) ? data.languages.map(String) : [],
    cover,
    cover_alt: String(data.cover_alt ?? ""),
    coverExists: cover !== "" && fs.existsSync(path.join(PUBLIC, cover)),
    gallery: Array.isArray(data.gallery) ? data.gallery : [],
    testimonial: {
      quote: String(data.testimonial?.quote ?? ""),
      name: String(data.testimonial?.name ?? ""),
      role: String(data.testimonial?.role ?? ""),
    },
    link: String(data.link ?? ""),
    cta: data.cta === "demo" || data.cta === "project" ? data.cta : "",
    bodyHtml: marked.parse(cleanBody(content), { async: false }) as string,
  };
}

/** Sorted by `order`, then `date` descending (§5.5). `_template.md` is excluded. */
export function getProjects(): Project[] {
  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".md") && !f.startsWith("_"))
    .map(load)
    .sort((a, b) => a.order - b.order || b.date.localeCompare(a.date));
}

export function getFeaturedProjects(): Project[] {
  return getProjects().filter((p) => p.featured).slice(0, 3);
}

export function getProject(slug: string): Project | undefined {
  return getProjects().find((p) => p.slug === slug);
}

/** Research projects have no detail page until they move to in-development (§7.7). */
export const hasDetailPage = (p: Project) => p.status !== "research";

export const categoryLabel = (c: Project["category"]) => (c === "product" ? "Product" : "Custom build");

export const clientLabel = (p: Project) => (p.client_public ? p.client : p.industry);
