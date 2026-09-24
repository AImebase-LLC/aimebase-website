import { SectionLabel } from "./Section";

/** Inner-page hero: framed, left-aligned copy over a quiet line grid. */
export function PageHero({
  label,
  title,
  sub,
  children,
  aside,
}: {
  label: string;
  title: React.ReactNode;
  sub?: React.ReactNode;
  children?: React.ReactNode;
  aside?: React.ReactNode;
}) {
  return (
    <section aria-labelledby="page-title" className="rule">
      <div className="frame">
        <SectionLabel>{label}</SectionLabel>
        <div className={`grid border-t border-light-600 ${aside ? "lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]" : ""}`}>
          <div className="relative px-6 py-16 md:px-10 md:py-24">
            <h1 id="page-title" className="animate-rise display max-w-[18ch] text-[40px] md:text-6xl">
              {title}
            </h1>
            {sub && <p className="animate-rise mt-6 max-w-[56ch] [animation-delay:100ms] text-[17px] leading-relaxed text-light-900 md:text-lg">{sub}</p>}
            {children && <div className="animate-rise mt-9 flex [animation-delay:200ms] flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-7">{children}</div>}
          </div>
          {aside && (
            <div className="dot-grid relative flex items-center justify-center border-t border-light-600 bg-secondary-100 px-6 py-12 md:px-10 lg:border-t-0 lg:border-l"><div className="animate-rise flex w-full justify-center [animation-delay:250ms]">
              {aside}
            </div></div>
          )}
        </div>
      </div>
    </section>
  );
}
