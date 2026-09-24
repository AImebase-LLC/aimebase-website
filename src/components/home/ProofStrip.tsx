import { proofStrip } from "@/lib/site";

/** Home §2: proof strip. Every item is a fact from the content spec. */
export function ProofStrip() {
  return (
    <section aria-label="Proof" className="rule bg-light-500">
      <dl className="frame grid grid-cols-2 lg:grid-cols-4">
        {proofStrip.map((p, i) => (
          <div
            key={p.value}
            data-reveal
            style={{ "--d": i } as React.CSSProperties}
            className="flex flex-col-reverse justify-end gap-2 border-light-600 px-5 py-7 odd:border-r max-lg:[&:nth-child(-n+2)]:border-b md:px-8 lg:border-r lg:last:border-r-0"
          >
            <dt className="text-[13.5px] leading-snug text-light-900">{p.label}</dt>
            <dd className="display text-[26px] md:text-3xl">{p.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
