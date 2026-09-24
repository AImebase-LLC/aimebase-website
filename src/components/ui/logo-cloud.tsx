import Image from "next/image";
import { InfiniteSlider } from "./infinite-slider";
import { ProgressiveBlur } from "./progressive-blur";

export type Partner = { name: string; role: string; logo?: string };

/**
 * Partner marquee, adapted from logo-cloud-4 to the AImbase grid: framed by
 * the column rails, edges fade into the page, and each partner shows its real
 * relationship. Supplied logo files replace the wordmark automatically.
 */
export function LogoCloud({ partners }: { partners: Partner[] }) {
  // Repeat short lists so one copy is always wider than the widest viewport.
  const reps = Math.max(1, Math.ceil(8 / partners.length));
  const items = Array.from({ length: reps }, () => partners).flat();
  return (
    <div className="relative overflow-hidden py-7">
      <ul className="sr-only">
        {partners.map((p) => (
          <li key={p.name + p.role}>
            {p.name}: {p.role}
          </li>
        ))}
      </ul>
      <InfiniteSlider gap={12} reverse speed={40} speedOnHover={12}>
        {items.map((p, i) => (
          <div
            key={i}
            aria-hidden
            className="group flex h-16 shrink-0 items-center gap-3.5 rounded-md border border-light-600 bg-light-50 pr-5 pl-3 transition-colors hover:border-light-700"
          >
            {p.logo ? (
              <Image src={p.logo} alt={`${p.name} logo`} width={120} height={32} className="h-6 w-auto grayscale transition group-hover:grayscale-0" />
            ) : (
              <span
                aria-hidden
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-secondary-100 font-display text-[13px] font-medium tracking-tight text-secondary-900 transition-colors group-hover:bg-accent-500 group-hover:text-dark-500"
              >
                {p.name
                  .replace(/^(The|A)\s+/, "")
                  .split(/\s+/)
                  .filter((w) => /^[A-Z]/.test(w))
                  .slice(0, 3)
                  .map((w) => w[0])
                  .join("")}
              </span>
            )}
            <span className="flex flex-col">
              <span className="whitespace-nowrap font-display text-[15px] font-medium tracking-[-0.02em] text-dark-500">{p.name}</span>
              <span className="whitespace-nowrap font-mono text-[10.5px] tracking-wide text-light-900">{p.role}</span>
            </span>
          </div>
        ))}
      </InfiniteSlider>
      <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-light-50 to-transparent md:w-40" />
      <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-light-50 to-transparent md:w-40" />
      <ProgressiveBlur blurIntensity={1} direction="left" className="pointer-events-none !absolute top-0 left-0 h-full w-24 md:w-40" />
      <ProgressiveBlur blurIntensity={1} direction="right" className="pointer-events-none !absolute top-0 right-0 h-full w-24 md:w-40" />
    </div>
  );
}
