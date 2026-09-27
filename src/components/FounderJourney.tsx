"use client";

import {
  BookOpen01Icon,
  Flag01Icon,
  GraduationCapIcon,
  HeartCheckIcon,
  PauseIcon,
  PlayIcon,
  Rocket01Icon,
} from "@hugeicons/core-free-icons";
import type { IconSvgElement } from "@hugeicons/react";
import { useEffect, useRef, useState } from "react";
import { founderJourney, site } from "@/lib/site";
import { Icon } from "./Icon";

const icons: IconSvgElement[] = [Flag01Icon, BookOpen01Icon, HeartCheckIcon, GraduationCapIcon, Rocket01Icon];
const STEP_MS = 4200;

/**
 * Rwanda → Italy → Maine → Roux → South Portland, as a timeline you can
 * click or arrow through. Auto-advances while on screen (pauses on hover,
 * focus, or the play/pause control), fills the rail up to the active stop,
 * and holds still for reduced-motion users.
 */
export function FounderJourney({ className = "", tone = "light" }: { className?: string; tone?: "light" | "peach" }) {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const last = founderJourney.length - 1;

  useEffect(() => {
    const r = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReduced(r);
    if (r) setPlaying(false);
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.35 });
    if (root.current) io.observe(root.current);
    return () => io.disconnect();
  }, []);

  const running = playing && visible && !hovered && !reduced;
  useEffect(() => {
    if (!running) return;
    const t = setTimeout(() => setActive((a) => (a >= last ? 0 : a + 1)), STEP_MS);
    return () => clearTimeout(t);
  }, [running, active, last]);

  const go = (i: number, focus = false) => {
    const n = (i + founderJourney.length) % founderJourney.length;
    setActive(n);
    if (focus) buttons.current[n]?.focus();
  };

  const fill = (active / last) * 100;

  return (
    <div
      ref={root}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setHovered(true)}
      onBlurCapture={() => setHovered(false)}
      className={`relative flex flex-col overflow-hidden rounded-lg border p-6 md:p-8 ${
        tone === "peach" ? "border-secondary-300 bg-secondary-50" : "border-light-600 bg-light-50"
      } ${className}`}
    >
      <div aria-hidden className="dot-grid pointer-events-none absolute inset-0 opacity-40 [mask-image:linear-gradient(to_bottom,#000,transparent_70%)]" />

      <div className="relative flex items-start justify-between gap-4">
        <div>
          <p className="mono-label text-light-900">Founder · the road here</p>
          <p className="display mt-3 text-3xl leading-tight">{site.founder}</p>
          <p className="mt-2 font-mono text-xs text-light-900">Former Direct Support Professional · MS in AI candidate</p>
        </div>
        {!reduced && (
          <button
            type="button"
            onClick={() => setPlaying((p) => !p)}
            aria-label={playing ? "Pause the timeline" : "Play the timeline"}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-sm border border-secondary-300 bg-light-50 text-dark-400 transition-colors hover:border-accent-500 hover:text-accent-700"
          >
            <Icon icon={playing ? PauseIcon : PlayIcon} size={16} strokeWidth={2} />
          </button>
        )}
      </div>

      <div
        role="tablist"
        aria-label="Founder timeline"
        aria-orientation="vertical"
        className="relative mt-8"
        onKeyDown={(e) => {
          if (e.key === "ArrowDown" || e.key === "ArrowRight") { e.preventDefault(); go(active + 1, true); }
          if (e.key === "ArrowUp" || e.key === "ArrowLeft") { e.preventDefault(); go(active - 1, true); }
          if (e.key === "Home") { e.preventDefault(); go(0, true); }
          if (e.key === "End") { e.preventDefault(); go(last, true); }
        }}
      >
        {/* Rail + animated fill */}
        <span aria-hidden className="absolute top-5 bottom-5 left-[19px] w-0.5 bg-secondary-300" />
        <span
          aria-hidden
          className="absolute top-5 left-[19px] w-0.5 origin-top bg-accent-500 transition-[height] duration-700 ease-out"
          style={{ height: `calc((100% - 2.5rem) * ${fill / 100})` }}
        />

        {founderJourney.map((j, i) => {
          const on = i === active;
          const done = i < active;
          return (
            <div key={j.place} className="relative">
              <button
                ref={(el) => {
                  buttons.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`journey-tab-${i}`}
                aria-selected={on}
                aria-controls={`journey-panel-${i}`}
                tabIndex={on ? 0 : -1}
                onClick={() => {
                  go(i);
                  setPlaying(false);
                }}
                className="group/step relative flex w-full items-center gap-4 py-2 text-left"
              >
                <span
                  className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 transition-[background-color,border-color,color,transform] duration-500 ${
                    on
                      ? "scale-110 border-accent-500 bg-accent-500 text-[#0b0b0b] shadow-[0_0_0_6px_rgb(255_67_5/0.15)]"
                      : done
                        ? "border-accent-500 bg-light-50 text-accent-700"
                        : "border-secondary-300 bg-light-50 text-light-900 group-hover/step:border-accent-300 group-hover/step:text-accent-700"
                  }`}
                >
                  <Icon icon={icons[i]} size={18} strokeWidth={on ? 2 : 1.8} />
                </span>
                <span className="min-w-0">
                  <span className={`block font-display text-lg font-medium tracking-[-0.02em] transition-colors ${on ? "text-dark-500" : "text-dark-400 group-hover/step:text-dark-500"}`}>
                    {j.place}
                  </span>
                  <span className="block text-[13px] text-light-900">{j.note}</span>
                </span>
              </button>

              {/* Detail, expanding under the active stop */}
              <div
                id={`journey-panel-${i}`}
                role="tabpanel"
                aria-labelledby={`journey-tab-${i}`}
                hidden={!on}
                className="grid"
              >
                <div className="animate-rise pb-3 pl-14">
                  <p className="rounded-md border border-secondary-200 bg-light-50/80 p-3.5 text-[14px] leading-relaxed text-dark-400 shadow-[0_10px_24px_-18px_rgb(107_28_2/0.5)]">
                    {j.detail}
                  </p>
                  {running && on && (
                    <span aria-hidden className="mt-2 block h-0.5 overflow-hidden rounded-full bg-secondary-200">
                      <span key={active} className="block h-full origin-left bg-accent-500" style={{ animation: `showcase-bar ${STEP_MS}ms linear forwards` }} />
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="relative mt-auto flex items-center justify-between pt-6 font-mono text-[11px] text-light-900">
        <span>
          {String(active + 1).padStart(2, "0")} / {String(founderJourney.length).padStart(2, "0")}
        </span>
        <span>{running ? "Playing" : "Click a stop"}</span>
      </div>
    </div>
  );
}
