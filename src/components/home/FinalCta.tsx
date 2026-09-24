import Link from "next/link";
import { Button } from "@/components/Button";
import { getFeaturedProjects } from "@/lib/projects";
import { cta, site } from "@/lib/site";

function Check() {
  return (
    <span aria-hidden className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-accent-500 text-dark-500">
      <svg width="9" height="9" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M2.5 6.5l2.5 2.5 4.5-5.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

function Badge({ children, outline = false, className = "" }: { children: React.ReactNode; outline?: boolean; className?: string }) {
  return (
    <span
      className={`inline-flex h-6 items-center gap-1.5 rounded-xs px-2 font-mono text-[10.5px] tracking-[0.06em] uppercase ${
        outline ? "border border-white/15 text-dark-100" : "bg-white/10 text-light-50"
      } ${className}`}
    >
      {children}
    </span>
  );
}

const card =
  "relative flex flex-col overflow-hidden rounded-md border border-white/10 bg-dark-500/60 backdrop-blur supports-[backdrop-filter]:bg-white/[0.02] transition-colors duration-300 hover:border-white/20";

function Checks({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-3.5 text-sm text-dark-100">
      {items.map((f) => (
        <li key={f} className="flex items-start gap-3">
          <span className="mt-0.5"><Check /></span>
          <span className="leading-relaxed">{f}</span>
        </li>
      ))}
    </ul>
  );
}

const statusDot: Record<string, string> = {
  live: "bg-[#3ecf8e]",
  pilot: "bg-[#6ea8ff]",
  "in-development": "bg-[#f5b544]",
};

/**
 * Closing CTA bento (Home §10 and every page end). Lead card carries the
 * page's one primary CTA; the others route to the secondary paths.
 * Surfaces: 12px dot field + top glow + diagonal light beams on the section,
 * 24px line surface on the lead card.
 */
export function FinalCta({
  title = "Give your caregivers their evenings back.",
  variant = "demo",
}: {
  title?: string;
  variant?: "demo" | "project" | "studio";
}) {
  const projects = getFeaturedProjects();
  const demoLead = variant === "demo";
  const studio = variant === "studio";

  const lead = demoLead
    ? {
        badge: "AImdoc demo",
        tag: "For agency leaders",
        button: <Button href={cta.demo.href} event={cta.demo.event}>{cta.demo.label}</Button>,
        items: [
          "Watch a real shift note come together from five short answers",
          "See caregiver review and sign-off, step by step",
          "Get straight answers on data handling for your compliance lead",
          "Leave with a quote based on your team size",
        ],
      }
    : studio
      ? {
          badge: "Work with us",
          tag: "Products and custom builds",
          button: <Button href={cta.project.href} event={cta.project.event}>{cta.project.label}</Button>,
          items: [
            "An intro call to understand the problem and the people it affects",
            "A short, plain-language plan with a clear timeline and price",
            "Working software early, so you can react to the real thing",
            "We stay on after launch, and go deep on what matters",
          ],
        }
      : {
        badge: "Custom build",
        tag: "For community organizations",
        button: <Button href={cta.project.href} event={cta.project.event}>{cta.project.label}</Button>,
        items: [
          "Talk: an intro call to understand the problem",
          "Scope: a short, plain-language plan with a clear timeline and price",
          "Build: working versions early, so you can react to real software",
          "Launch & support: we stay on after launch",
        ],
      };

  const second = demoLead && !studio
    ? {
        badge: "Custom builds",
        title: "Have a different problem?",
        button: <Button href={cta.project.href} event={cta.project.event} variant="outlineDark" size="sm">{cta.project.label}</Button>,
        items: ["Voting and election platforms", "Community websites and payments", "Internal tools with AI assistance"],
      }
    : {
        badge: "AImdoc",
        title: "Running a care agency?",
        button: <Button href={cta.demo.href} event={cta.demo.event} variant="outlineDark" size="sm">Book a demo</Button>,
        items: ["Guided questions tied to each person's goals", "Complete draft notes in your format", "Caregiver sign-off on every note"],
      };

  return (
    <section aria-labelledby="final-cta-title" className="rule rule-dark relative isolate overflow-hidden bg-dark-500">
      {/* Section surface: top glow, 12px dots, diagonal light beams */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(35%_80%_at_50%_0%,rgb(255_255_255/0.09),transparent)]" />
        <div className="dot-field absolute inset-0 [mask-image:radial-gradient(90%_70%_at_50%_30%,#000,transparent)]" />
        <div className="absolute top-0 left-0 h-[80rem] w-[35rem] -translate-y-[22rem] -rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,rgb(255_255_255/0.07)_0,rgb(255_255_255/0.02)_50%,rgb(255_255_255/0.01)_80%)] opacity-80" />
        <div className="absolute top-0 left-0 h-[80rem] w-60 [translate:5%_-50%] -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,rgb(255_255_255/0.05)_0,rgb(255_255_255/0.01)_80%,transparent_100%)] opacity-80" />
        <div className="absolute -right-32 -bottom-48 h-[28rem] w-[28rem] rounded-full bg-accent-500/20 blur-3xl" />
      </div>

      <div className="frame px-3 py-16 md:px-4 md:py-24">
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-8">
          {/* Lead card with the line surface */}
          <div data-reveal className={`${card} md:col-span-2 lg:col-span-5`}>
            <div aria-hidden className="pointer-events-none absolute top-0 left-1/2 -mt-2 -ml-20 h-full w-full [mask-image:linear-gradient(#000,transparent)]">
              <div className="absolute inset-0 bg-gradient-to-r from-white/[0.06] to-white/[0.02] [mask-image:radial-gradient(farthest-side_at_top,#000,transparent)]">
                <div className="line-surface absolute inset-0" />
              </div>
            </div>
            <div className="relative flex flex-wrap items-center gap-2 p-5 md:p-6">
              <Badge>{lead.badge}</Badge>
              <Badge outline className="hidden sm:inline-flex">
                <span className="h-1.5 w-1.5 rounded-full bg-accent-500" /> {lead.tag}
              </Badge>
              <div className="ml-auto hidden sm:block">{lead.button}</div>
            </div>
            <div className="relative flex flex-1 flex-col gap-8 p-5 pt-3 md:p-6 md:pt-4">
              <h2 id="final-cta-title" className="display max-w-[18ch] text-balance text-4xl text-light-50 md:text-[52px]">
                {title}
              </h2>
              <ul className="grid gap-x-8 gap-y-3.5 text-sm text-dark-100 sm:grid-cols-2">
                {lead.items.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <span className="mt-0.5"><Check /></span>
                    <span className="leading-relaxed">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative p-5 pt-0 sm:hidden">{lead.button}</div>
          </div>

          {/* Second path */}
          <div data-reveal style={{ "--d": 1 } as React.CSSProperties} className={`${card} lg:col-span-3`}>
            <div className="flex items-center gap-2 p-5 md:p-6">
              <Badge>{second.badge}</Badge>
              <div className="ml-auto">{second.button}</div>
            </div>
            <p className="display px-5 text-2xl text-light-50 md:px-6">{second.title}</p>
            <div className="p-5 md:p-6">
              <Checks items={second.items} />
            </div>
          </div>

          {/* Shipped work */}
          <div data-reveal style={{ "--d": 2 } as React.CSSProperties} className={`${card} lg:col-span-4`}>
            <div className="flex items-center gap-2 p-5 md:p-6">
              <Badge>Projects</Badge>
              <div className="ml-auto">
                <Button href="/projects" variant="outlineDark" size="sm">See all projects</Button>
              </div>
            </div>
            <p className="display px-5 text-2xl text-light-50 md:px-6">What we&rsquo;ve shipped</p>
            <ul className="grid gap-1 p-3 md:p-4">
              {projects.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/projects/${p.slug}`}
                    data-event="project_card_click"
                    className="group flex items-center gap-3 rounded-sm px-2 py-2 text-sm text-dark-100 transition-colors hover:bg-white/[0.05] hover:text-light-50"
                  >
                    <span aria-hidden className={`h-1.5 w-1.5 shrink-0 rounded-full ${statusDot[p.status] ?? "bg-dark-200"}`} />
                    <span className="min-w-0 truncate">{p.title.split(":").pop()?.trim()}</span>
                    <span aria-hidden className="ml-auto text-dark-200 transition-transform group-hover:translate-x-0.5 group-hover:text-accent-300">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Talk to us */}
          <div data-reveal style={{ "--d": 3 } as React.CSSProperties} className={`${card} lg:col-span-4`}>
            <div className="flex items-center gap-2 p-5 md:p-6">
              <Badge>Talk to us</Badge>
              <div className="ml-auto">
                <Button href="/about" variant="outlineDark" size="sm">Read our story</Button>
              </div>
            </div>
            <a
              href={`mailto:${site.contactEmail}`}
              data-event="contact_email_click"
              className="display px-5 text-2xl break-all text-light-50 underline-offset-8 transition-colors hover:text-accent-300 hover:underline md:px-6"
            >
              {site.contactEmail}
            </a>
            <div className="p-5 md:p-6">
              <Checks
                items={[
                  "Founded by a former Direct Support Professional",
                  `${site.legalEntity} · ${site.location}`,
                  `Maine charter ${site.charter}`,
                ]}
              />
            </div>
          </div>
        </div>

        <p className="mt-12 px-2 text-center font-display text-lg text-dark-100 italic">{site.tagline}</p>
      </div>
    </section>
  );
}
