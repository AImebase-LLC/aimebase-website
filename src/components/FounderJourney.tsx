import { founderJourney, site } from "@/lib/site";

/** Rwanda → Italy → Maine. Stands in for the founder photo until one is supplied. */
export function FounderJourney({ className = "", tone = "light" }: { className?: string; tone?: "light" | "peach" }) {
  return (
    <div
      className={`relative flex flex-col justify-between overflow-hidden rounded-lg border p-6 md:p-8 ${
        tone === "peach" ? "border-secondary-300 bg-secondary-50" : "border-light-600 bg-light-50"
      } ${className}`}
    >
      <div aria-hidden className="dot-grid pointer-events-none absolute inset-0 opacity-40 [mask-image:linear-gradient(to_bottom,#000,transparent_70%)]" />
      <div className="relative">
        <p className="mono-label text-light-900">Founder</p>
        <p className="display mt-3 text-3xl leading-tight">{site.founder}</p>
        <p className="mt-2 font-mono text-xs text-light-900">Former Direct Support Professional · MS in AI candidate</p>
      </div>
      <ol className="relative mt-10">
        {founderJourney.map((j, i) => (
          <li
            key={j.place}
            data-reveal
            style={{ "--d": i } as React.CSSProperties}
            className="relative grid grid-cols-[20px_1fr] gap-3 pb-5 last:pb-0"
          >
            {i < founderJourney.length - 1 && (
              <span aria-hidden className="absolute top-4 left-[9px] h-full w-px bg-secondary-300" />
            )}
            <span
              aria-hidden
              className={`relative mt-1 h-[19px] w-[19px] rounded-full border-2 ${
                i === founderJourney.length - 1 ? "border-accent-500 bg-accent-500" : "border-secondary-400 bg-light-50"
              }`}
            />
            <div>
              <p className="font-display text-lg font-medium tracking-[-0.02em]">{j.place}</p>
              <p className="text-[13.5px] text-light-900">{j.note}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
