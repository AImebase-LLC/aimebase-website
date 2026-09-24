import { ArrowLink, Button } from "@/components/Button";
import { getFeaturedProjects } from "@/lib/projects";
import { cta } from "@/lib/site";
import { HeroShowcase } from "./HeroShowcase";

/** Home hero: AImbase as a focused AI product studio. Split layout after rulebase.co. */
export function Hero() {
  const items = getFeaturedProjects().map((p) => ({
    slug: p.slug,
    title: p.title,
    client: p.client,
    type: p.type,
    status: p.status,
    category: p.category,
    outcome: p.outcome_headline,
  }));
  const inUse = getFeaturedProjects().filter((p) => p.status === "live" || p.status === "pilot").length;

  return (
    <section aria-labelledby="hero-title" className="rule">
      <div className="frame grid lg:min-h-[740px] lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]">
        <div className="relative flex flex-col justify-between gap-16 overflow-hidden bg-dark-500 px-6 pt-12 pb-12 md:px-10 lg:pt-14">
          <div aria-hidden className="dot-field pointer-events-none absolute inset-0 [mask-image:radial-gradient(70%_50%_at_0%_0%,#000,transparent)]" />
          <div className="animate-rise relative flex max-w-md items-center gap-3 rounded-md border border-dark-400 bg-dark-400/40 p-3">
            <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-status-live-bg">
              <span className="absolute h-2 w-2 animate-ping rounded-full bg-status-live/60" aria-hidden />
              <span className="relative h-2 w-2 rounded-full bg-status-live" aria-hidden />
            </span>
            <p className="text-[13px] leading-snug text-dark-100">
              <span className="text-light-50">{items.length} projects built in 2026,</span> {inUse} already in real use across Maine.
            </p>
          </div>

          <div className="animate-rise relative [animation-delay:120ms]">
            <p className="mono-label text-accent-300">AI product studio · South Portland, Maine</p>
            <h1 id="hero-title" className="display mt-5 max-w-[14ch] text-[42px] text-light-50 sm:text-[56px] xl:text-[64px]">
              AI that makes people superfast at the work they already do.
            </h1>
            <p className="mt-6 max-w-[48ch] text-[17px] leading-relaxed text-dark-100">
              We find one big problem where AI can save people time, solve it well, and ship it as real software. It started
              with care documentation. It won&rsquo;t end there.
            </p>
            <div className="mt-9 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-7">
              <Button href={cta.project.href} event={cta.project.event} size="lg">
                {cta.project.label}
              </Button>
              <ArrowLink href="#work" tone="dark">
                See what we&rsquo;ve shipped
              </ArrowLink>
            </div>
          </div>
        </div>

        <div className="dot-grid relative flex items-center justify-center overflow-hidden bg-secondary-100 px-4 py-12 md:px-10">
          <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-secondary-100 via-transparent to-secondary-100/60" />
          <div className="animate-rise relative flex w-full justify-center [animation-delay:250ms]">
            <HeroShowcase items={items} />
          </div>
        </div>
      </div>
    </section>
  );
}
