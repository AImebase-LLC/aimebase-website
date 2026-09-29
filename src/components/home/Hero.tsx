import Image from "next/image";
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
    link: p.link,
    cover: p.coverExists ? p.cover : "",
    coverAlt: p.cover_alt,
  }));
  const inUse = getFeaturedProjects().filter((p) => p.status === "live" || p.status === "pilot").length;

  return (
    <section aria-labelledby="hero-title" className="rule">
      <div className="frame grid lg:min-h-[740px] lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
        <div className="relative flex flex-col justify-between gap-10 overflow-hidden bg-dark-500 px-5 pt-8 pb-10 sm:gap-14 sm:px-6 sm:pt-12 sm:pb-12 md:px-10 lg:pt-14">
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
            <h1 id="hero-title" className="display mt-5 max-w-[20ch] text-[36px] text-light-50 min-[360px]:text-[40px] sm:text-[52px] lg:text-[46px] xl:text-[54px]">
              We build AI products and custom AI software.
            </h1>
            <p className="mt-6 max-w-[48ch] text-[17px] leading-relaxed text-dark-100">
              Real tools, shipped fast, for any field. AImdoc turns a few quick answers into a finished care note. A bilingual
              election platform went live in days. We find the work that slows people down, then build the AI that fixes it.
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

        <div className="relative isolate flex items-center justify-center overflow-hidden bg-dark-500 px-3 py-10 sm:px-6 md:py-12 lg:px-5 xl:px-6">
          {/* Misty Maine pines at night, one lit cabin: the light at the end of the shift. */}
          <Image
            src="/images/image1.jpg"
            alt=""
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="-z-10 object-cover object-[45%_60%] scale-105 brightness-[1.35] saturate-[1.1] animate-[hero-drift_28s_ease-in-out_infinite_alternate]"
          />
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-dark-500/25 via-transparent to-dark-500/45" />
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(75%_65%_at_50%_55%,transparent,rgb(11_11_11/0.35))]" />
          <div aria-hidden className="dot-field pointer-events-none absolute inset-0 -z-10 opacity-40 [mask-image:linear-gradient(to_bottom,transparent,#000_80%)]" />
          {/* Transform-only entrance: an opacity animation here would stop the glass from blurring the photo. */}
          <div className="relative flex w-full justify-center animate-[rise-y_0.8s_cubic-bezier(0.2,0.7,0.2,1)_250ms_both]">
            <HeroShowcase items={items} />
          </div>
        </div>
      </div>
    </section>
  );
}
