import { faq } from "@/lib/site";
import { Fill } from "./Placeholder";
import { Icon } from "./Icon";
import { PlusSignIcon } from "@hugeicons/core-free-icons";

/** FAQ bank (§6) as native disclosure widgets: accessible, no JS. */
export function Faq() {
  return (
    <div className="divide-y divide-light-600 border-t border-light-600">
      {faq.map((item) => (
        <details key={item.q} className="group px-6 md:px-10 [&_summary::-webkit-details-marker]:hidden">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-lg font-medium">
            {item.q}
            <span
              aria-hidden
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-sm border border-light-600 text-light-900 transition-[transform,background-color,color,border-color] duration-300 group-open:rotate-45 group-open:border-accent-500 group-open:bg-accent-500 group-open:text-[#0b0b0b]"
            >
              <Icon icon={PlusSignIcon} size={16} strokeWidth={2} />
            </span>
          </summary>
          <p className="max-w-[70ch] pb-6 text-[15px] leading-relaxed text-light-900">
            <Fill text={item.a} />
          </p>
        </details>
      ))}
    </div>
  );
}
