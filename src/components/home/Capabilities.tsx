import Link from "next/link";
import { Heading, Section, SectionLabel } from "@/components/Section";
import { capabilities } from "@/lib/site";
import { ArrowChip, Icon } from "@/components/Icon";
import { AiBrain01Icon, VoteIcon, WebDesign01Icon, Wrench01Icon } from "@hugeicons/core-free-icons";

const icons = [AiBrain01Icon, VoteIcon, WebDesign01Icon, Wrench01Icon];

/** What we build: the product line and the kinds of custom work. */
export function Capabilities({ index, total, surface }: { index: number; total: number; surface?: string }) {
  return (
    <Section aria-labelledby="build-title" className={surface ?? "bg-light-500"}>
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
              data-cursor="explore"
              className={`group flex h-full min-h-64 flex-col justify-between gap-10 rounded-lg border p-6 transition-[border-color,transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_36px_-22px_rgb(11_11_11/0.3)] ${
                i === 0 ? "border-dark-500 bg-dark-500 text-light-50" : "border-light-600 bg-light-50 hover:border-light-700"
              }`}
            >
              <div className="flex items-center justify-between">
                <span
                  aria-hidden
                  className={`flex h-12 w-12 items-center justify-center rounded-sm ${i === 0 ? "bg-accent-500 text-dark-500" : "bg-secondary-100 text-accent-700"}`}
                >
                  <Icon icon={icons[i]} size={26} />
                </span>
                <span className={`font-mono text-[10.5px] tracking-wide uppercase ${i === 0 ? "text-accent-300" : "text-light-900"}`}>
                  {i === 0 ? "Product line" : "Custom build"}
                </span>
              </div>
              <div>
                <h3 className="display text-xl leading-snug">{c.title}</h3>
                <p className={`mt-2 text-[14px] leading-relaxed ${i === 0 ? "text-dark-100" : "text-light-900"}`}>{c.body}</p>
                <p className={`mt-5 text-sm font-medium ${i === 0 ? "text-accent-300" : "text-accent-700"}`}>
                  <span className="link-sweep">{c.link}</span> <ArrowChip size="sm" tone={i === 0 ? "dark" : "light"} className="ml-1.5 align-[-5px]" />
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}
