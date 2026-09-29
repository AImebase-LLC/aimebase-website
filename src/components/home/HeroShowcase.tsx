"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ProjectArt } from "@/components/ProjectArt";
import { ArrowChip } from "@/components/Icon";
import { BrowserWindow } from "@/components/ui/browser-window";

export type ShowcaseItem = {
  slug: string;
  title: string;
  client: string;
  type: string;
  status: string;
  category: string;
  outcome: string;
  link: string;
  cover: string;
  coverAlt: string;
};

const statusStyle: Record<string, { label: string; cls: string }> = {
  live: { label: "Live", cls: "bg-status-live-bg text-status-live" },
  pilot: { label: "Pilot", cls: "bg-status-pilot-bg text-status-pilot" },
  "in-development": { label: "In development", cls: "bg-status-dev-bg text-status-dev" },
};

const DURATION = 5000;

/** Onyx liquid glass: monochrome black/gray, frosted and glossy, so the photo shows through. */
const t = {
  line: "border-white/10",
  tabOn: "bg-white/[0.08]",
  tabOff: "hover:bg-white/[0.04]",
  muted: "text-white/55",
  soft: "text-white/70",
  stage: "bg-gradient-to-b from-white/[0.03] to-black/20",
};

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
      className="relative w-full max-w-[640px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="liquid-glass lg-onyx overflow-hidden rounded-lg">
        {/* Tabs */}
        <div role="tablist" aria-label="Our work" className={`relative grid border-b ${t.line}`} style={{ gridTemplateColumns: `repeat(${items.length}, minmax(0,1fr))` }}>
          {items.map((it, n) => (
            <button
              key={it.slug}
              role="tab"
              aria-selected={n === i}
              aria-controls="showcase-panel"
              onClick={() => setI(n)}
              className={`group/tab relative cursor-pointer px-3 py-3 text-left transition-colors ${n === i ? t.tabOn : t.tabOff} ${n > 0 ? `border-l ${t.line}` : ""}`}
            >
              <span className={`block font-mono text-[10px] tracking-wide uppercase ${n === i ? "text-accent-300" : t.muted}`}>0{n + 1}</span>
              <span className={`mt-0.5 block truncate text-[12.5px] font-medium transition-colors ${n === i ? "text-white" : `${t.soft} group-hover/tab:text-white`}`}>
                <span className="xl:hidden">{short[it.type] ?? it.title.split(":").pop()?.trim()}</span>
                <span className="hidden xl:inline">{it.title.split(":").pop()?.trim()}</span>
              </span>
              {n === i && (
                <span aria-hidden className="absolute inset-x-0 bottom-0 h-0.5 bg-white/15">
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
        <div id="showcase-panel" role="tabpanel" aria-live="polite" className="relative">
          <div key={item.slug} className={`relative flex h-[230px] items-center justify-center overflow-hidden min-[420px]:h-[270px] sm:h-[360px] lg:h-[330px] xl:h-[380px] ${t.stage}`}>
            <div aria-hidden className="dot-field pointer-events-none absolute inset-0 opacity-50 [mask-image:radial-gradient(70%_70%_at_50%_50%,#000,transparent)]" />
            {item.cover ? (
              <div className="animate-rise relative flex h-full w-full items-start justify-center overflow-hidden px-2 pt-2 sm:px-3 sm:pt-3">
                <BrowserWindow size="compact" theme="dark" url={item.link || undefined} className="w-full">
                  <Image src={item.cover} alt={item.coverAlt} width={1485} height={812} sizes="(min-width: 1024px) 460px, 90vw" className="block h-auto w-full" />
                </BrowserWindow>
              </div>
            ) : (
              <div aria-hidden className="animate-rise relative flex w-full scale-[1.12] justify-center drop-shadow-[0_24px_40px_rgb(0_0_0/0.45)] sm:scale-[1.28]">
                <ProjectArt type={item.type} />
              </div>
            )}
          </div>
          <div key={`${item.slug}-meta`} className={`animate-rise relative flex flex-col gap-3 border-t p-5 sm:flex-row sm:items-end sm:justify-between ${t.line}`}>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className={`inline-flex items-center gap-1.5 rounded-xs px-1.5 py-0.5 font-mono text-[10px] tracking-wide uppercase ${s.cls}`}>
                  <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-current" />
                  {s.label}
                </span>
                <span className={`font-mono text-[10px] tracking-wide uppercase ${t.muted}`}>
                  {item.category === "product" ? "Product" : item.client}
                </span>
              </div>
              <p className="display mt-2 text-xl leading-snug text-white">{item.title.split(":").pop()?.trim()}</p>
              <p className="mt-1 text-[13.5px] font-medium text-accent-300">▸ {item.outcome}</p>
            </div>
            <div className="flex shrink-0 items-center gap-4">
              {item.link && (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-event="live_site_click"
                  className="inline-flex items-center gap-2 text-sm font-medium text-accent-300"
                >
                  <span className="link-sweep">Live site</span> <ArrowChip direction="up-right" size="sm" tone="dark" />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              )}
              <Link
                href={`/projects/${item.slug}`}
                data-event="project_card_click"
                className="inline-flex items-center gap-2 text-sm font-medium text-white"
              >
                <span className="link-sweep">Case study</span> <ArrowChip size="sm" tone="dark" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
