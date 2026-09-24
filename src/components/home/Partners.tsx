import { LogoCloud } from "@/components/ui/logo-cloud";
import { partners } from "@/lib/site";

/** Home §2a: who we already build with, directly under the hero (firecrawl-style strip). */
export function Partners() {
  return (
    <section aria-labelledby="partners-title" className="rule bg-light-50">
      <div className="frame grid lg:grid-cols-[220px_minmax(0,1fr)]">
        <div className="flex items-center border-b border-light-600 px-6 py-5 md:px-10 lg:border-r lg:border-b-0 lg:px-8">
          <h2 id="partners-title" className="text-[15px] leading-snug text-dark-400">
            Built with and for
            <br />
            <span className="text-accent-700">real communities.</span>
          </h2>
        </div>
        <LogoCloud partners={partners} />
      </div>
    </section>
  );
}
