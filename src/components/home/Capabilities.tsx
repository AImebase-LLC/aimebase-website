import Link from "next/link";
import { Heading, Section, SectionLabel } from "@/components/Section";
import { capabilities } from "@/lib/site";

const icons = [
  // AI products: spark
  <path key="a" d="M10 2.5v4M10 13.5v4M2.5 10h4M13.5 10h4M5 5l2.2 2.2M12.8 12.8L15 15M15 5l-2.2 2.2M7.2 12.8L5 15" />,
  // ballot
  <g key="b"><rect x="4" y="3" width="12" height="14" rx="1.5" /><path d="M7 9l2 2 4-4M7 14h6" /></g>,
  // website
  <g key="c"><rect x="2.5" y="4" width="15" height="12" rx="1.5" /><path d="M2.5 7.5h15M9 12h4.5M6 12h1" /></g>,
  // tools
  <g key="d"><path d="M4 16l6-6M11.5 3.5a3.5 3.5 0 0 0 4.5 4.5l-2.5 2.5-4.5-4.5z" /></g>,
];

/** What we build: the product line and the kinds of custom work. */
export function Capabilities({ index, total }: { index: number; total: number }) {
  return (
    <Section aria-labelledby="build-title" className="bg-light-500">
      <SectionLabel index={index} total={total}>What we build</SectionLabel>
      <div className="flex flex-col gap-4 border-t border-light-600 px-6 py-14 md:flex-row md:items-end md:justify-between md:px-10 md:py-16">
        <Heading id="build-title" className="max-w-[18ch] text-4xl md:text-5xl">
          Products for whole industries. Builds for one community.
        </Heading>
        <p className="max-w-[40ch] text-[15px] leading-relaxed text-light-900">
          Some problems are shared by thousands of teams, so we build a product. Some belong to one organization, so we build
          exactly what it needs.
        </p>
      </div>
      <ul className="grid gap-3 border-t border-light-600 p-3 sm:grid-cols-2 lg:grid-cols-4 md:p-4">
        {capabilities.map((c, i) => (
          <li key={c.title} data-reveal style={{ "--d": i } as React.CSSProperties}>
            <Link
              href={c.href}
              data-spotlight
              className={`group flex h-full min-h-64 flex-col justify-between gap-10 rounded-lg border p-6 transition-[border-color,transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_36px_-22px_rgb(11_11_11/0.3)] ${
                i === 0 ? "border-dark-500 bg-dark-500 text-light-50" : "border-light-600 bg-light-50 hover:border-light-700"
              }`}
            >
              <div className="flex items-center justify-between">
                <span
                  aria-hidden
                  className={`flex h-10 w-10 items-center justify-center rounded-md ${i === 0 ? "bg-accent-500 text-dark-500" : "bg-secondary-100 text-accent-700"}`}
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    {icons[i]}
                  </svg>
                </span>
                <span className={`font-mono text-[10.5px] tracking-wide uppercase ${i === 0 ? "text-accent-300" : "text-light-900"}`}>
                  {i === 0 ? "Product line" : "Custom build"}
                </span>
              </div>
              <div>
                <h3 className="display text-xl leading-snug">{c.title}</h3>
                <p className={`mt-2 text-[14px] leading-relaxed ${i === 0 ? "text-dark-100" : "text-light-900"}`}>{c.body}</p>
                <p className={`mt-5 text-sm font-medium ${i === 0 ? "text-accent-300" : "text-accent-700"}`}>
                  {c.link} <span aria-hidden className="inline-block transition-transform group-hover:translate-x-0.5">→</span>
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}
