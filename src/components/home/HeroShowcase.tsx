"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ProjectArt } from "@/components/ProjectArt";

export type ShowcaseItem = {
  slug: string;
  title: string;
  client: string;
  type: string;
  status: string;
  category: string;
  outcome: string;
};

const statusStyle: Record<string, { label: string; cls: string }> = {
  live: { label: "Live", cls: "bg-status-live-bg text-status-live" },
  pilot: { label: "Pilot", cls: "bg-status-pilot-bg text-status-pilot" },
  "in-development": { label: "In development", cls: "bg-status-dev-bg text-status-dev" },
};

const DURATION = 5000;

const short: Record<string, string> = { documentation: "AImdoc", "voting-platform": "Election", website: "Website" };

/** Hero visual: the studio's work, rotating. Click a tab to jump; hover pauses. */
export function HeroShowcase({ items }: { items: ShowcaseItem[] }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches), []);

  useEffect(() => {
    if (paused || reduced || items.length < 2) return;
    const t = setTimeout(() => setI((n) => (n + 1) % items.length), DURATION);
    return () => clearTimeout(t);
  }, [i, paused, reduced, items.length]);

  const item = items[i];
  const s = statusStyle[item.status] ?? { label: item.status, cls: "bg-light-600 text-dark-400" };

  return (
    <div
      className="w-full max-w-[560px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="overflow-hidden rounded-lg border border-secondary-300 bg-light-50 shadow-[0_30px_70px_-30px_rgb(107_28_2/0.45)]">
        {/* Tabs */}
        <div role="tablist" aria-label="Our work" className="grid border-b border-light-600" style={{ gridTemplateColumns: `repeat(${items.length}, minmax(0,1fr))` }}>
          {items.map((it, n) => (
            <button
              key={it.slug}
              role="tab"
              aria-selected={n === i}
              aria-controls="showcase-panel"
              onClick={() => setI(n)}
              className={`relative px-3 py-3 text-left transition-colors ${n === i ? "bg-light-50" : "bg-light-500 hover:bg-light-50"} ${n > 0 ? "border-l border-light-600" : ""}`}
            >
              <span className={`block font-mono text-[10px] tracking-wide uppercase ${n === i ? "text-accent-700" : "text-light-900"}`}>0{n + 1}</span>
              <span className={`mt-0.5 block truncate text-[12.5px] font-medium ${n === i ? "text-dark-500" : "text-dark-400"}`}>
                <span className="sm:hidden">{short[it.type] ?? it.title.split(":").pop()?.trim()}</span>
                <span className="hidden sm:inline">{it.title.split(":").pop()?.trim()}</span>
              </span>
              {n === i && (
                <span aria-hidden className="absolute inset-x-0 bottom-0 h-0.5 bg-light-600">
                  <span
                    key={`${i}-${paused}`}
                    className="block h-full origin-left bg-accent-500"
                    style={{
                      animation: paused || reduced ? "none" : `showcase-bar ${DURATION}ms linear forwards`,
                      transform: paused || reduced ? "scaleX(1)" : undefined,
                    }}
                  />
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Panel */}
        <div id="showcase-panel" role="tabpanel" aria-live="polite">
          <div key={item.slug} className="dot-grid relative flex h-[250px] items-center justify-center overflow-hidden bg-secondary-100 sm:h-[290px]">
            <div aria-hidden className="animate-rise flex w-full scale-[1.12] justify-center sm:scale-[1.28]">
              <ProjectArt type={item.type} />
            </div>
          </div>
          <div key={`${item.slug}-meta`} className="animate-rise flex flex-col gap-3 p-5 sm:flex-row sm:items-end sm:justify-between">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className={`inline-flex items-center gap-1.5 rounded-xs px-1.5 py-0.5 font-mono text-[10px] tracking-wide uppercase ${s.cls}`}>
                  <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-current" />
                  {s.label}
                </span>
                <span className="font-mono text-[10px] tracking-wide text-light-900 uppercase">
                  {item.category === "product" ? "Product" : item.client}
                </span>
              </div>
              <p className="display mt-2 text-xl leading-snug">{item.title.split(":").pop()?.trim()}</p>
              <p className="mt-1 text-[13.5px] font-medium text-accent-700">▸ {item.outcome}</p>
            </div>
            <Link
              href={`/projects/${item.slug}`}
              data-event="project_card_click"
              className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-dark-500 hover:text-accent-700"
            >
              Case study <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
