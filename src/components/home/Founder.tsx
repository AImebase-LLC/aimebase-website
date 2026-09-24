import { ArrowLink } from "@/components/Button";
import { FounderJourney } from "@/components/FounderJourney";
import { FounderPhoto, hasFounderPhoto } from "@/components/FounderPhoto";
import { Section, SectionLabel } from "@/components/Section";
import { founderMission, site } from "@/lib/site";

/** Home §9 */
export function Founder({ index, total }: { index: number; total: number }) {
  return (
    <Section aria-label="A note from the founder" className="bg-light-500">
      <SectionLabel index={index} total={total}>Founder note</SectionLabel>
      <div className="grid border-t border-light-600 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        <div className="border-b border-light-600 p-3 md:border-r md:border-b-0 md:p-4">
          {hasFounderPhoto() ? (
            <FounderPhoto className="aspect-[4/5] w-full" />
          ) : (
            <FounderJourney tone="peach" className="h-full" />
          )}
        </div>
        <figure data-reveal className="flex flex-col justify-center px-6 py-12 md:px-12 md:py-16">
          <p className="mono-label text-accent-700">It started with a 16-hour shift</p>
          <p className="mt-4 max-w-[52ch] text-[17px] leading-relaxed text-light-900">
            Our founder worked 16-hour shifts as a Direct Support Professional in Maine and watched great caregivers lose the
            end of every shift to paperwork. That became AImdoc. Then a community election became a platform, and the
            platform became a website.
          </p>
          <span aria-hidden className="display mt-10 text-6xl leading-none text-accent-500">&ldquo;</span>
          <blockquote className="display mt-2 text-2xl leading-[1.25] md:text-[34px] md:leading-[1.18]">
            {founderMission}
          </blockquote>
          <figcaption className="mt-8 flex flex-col gap-1">
            <span className="font-medium">{site.founder}</span>
            <span className="text-sm text-light-900">Founder, AImbase</span>
          </figcaption>
          <div className="mt-8">
            <ArrowLink href="/about">Read our story</ArrowLink>
          </div>
        </figure>
      </div>
    </Section>
  );
}
