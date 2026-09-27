"use client";

import { ArrowDown01Icon, Cancel01Icon, LeftToRightListNumberIcon } from "@hugeicons/core-free-icons";
import { useCallback, useEffect, useRef, useState } from "react";
import { Icon } from "./Icon";

export type TocItem = { id: string; label: string };

/**
 * "On this page" with scrollspy.
 *  - lg+: sticky sidebar list; an accent indicator slides to the section in view
 *    and a rail fills with reading progress.
 *  - below lg: a floating glass bar at the bottom shows the current section and
 *    progress; tapping it opens an animated sheet with every section.
 */
export function LegalToc({ items }: { items: TocItem[] }) {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState(false);
  const [indicator, setIndicator] = useState({ top: 0, height: 0 });
  const [showBar, setShowBar] = useState(false);
  const links = useRef<(HTMLAnchorElement | null)[]>([]);
  const list = useRef<HTMLOListElement>(null);

  // Scrollspy: the active section is the last one whose top has passed a line just under the header.
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const line = Math.min(window.innerHeight * 0.3, 140);
      let idx = 0;
      items.forEach((it, i) => {
        const el = document.getElementById(it.id);
        if (el && el.getBoundingClientRect().top - line <= 0) idx = i;
      });
      const doc = document.documentElement;
      const atBottom = window.innerHeight + window.scrollY >= doc.scrollHeight - 4;
      if (atBottom) idx = items.length - 1;
      setActive(idx);

      const first = document.getElementById(items[0]?.id);
      const last = document.getElementById(items[items.length - 1]?.id);
      if (first && last) {
        const start = first.getBoundingClientRect().top + window.scrollY - line;
        const end = last.getBoundingClientRect().bottom + window.scrollY - window.innerHeight;
        const p = (window.scrollY - start) / Math.max(1, end - start);
        setProgress(Math.min(1, Math.max(0, atBottom ? 1 : p)));
        // Show once reading starts; get out of the way once the last section has scrolled past.
        const pastEnd = last.getBoundingClientRect().bottom < window.innerHeight * 0.35;
        setShowBar(window.scrollY > start - window.innerHeight * 0.4 && !pastEnd);
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [items]);

  // Slide the desktop indicator to the active link.
  const measure = useCallback(() => {
    const a = links.current[active];
    const l = list.current;
    if (!a || !l) return;
    setIndicator({ top: a.offsetTop, height: a.offsetHeight });
  }, [active]);
  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const jump = (e: React.MouseEvent, id: string, i: number) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    setActive(i);
    setOpen(false);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 88, behavior: reduced ? "auto" : "smooth" });
    history.replaceState(null, "", `#${id}`);
  };

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <>
      {/* Desktop sidebar */}
      <nav aria-label="On this page" className="hidden lg:sticky lg:top-24 lg:block">
        <div className="flex items-center justify-between">
          <p className="mono-label text-light-900">On this page</p>
          <p className="font-mono text-[11px] text-light-900" aria-hidden>
            <span className="text-accent-700">{pad(active + 1)}</span> / {pad(items.length)}
          </p>
        </div>
        <div className="relative mt-5 pl-4">
          {/* rail + reading progress */}
          <span aria-hidden className="absolute top-0 bottom-0 left-0 w-px bg-light-600" />
          <span
            aria-hidden
            className="absolute top-0 left-0 w-px origin-top bg-accent-300 transition-transform duration-300 ease-out"
            style={{ height: "100%", transform: `scaleY(${progress})` }}
          />
          {/* sliding active indicator */}
          <span
            aria-hidden
            className="absolute -left-px w-[3px] rounded-full bg-accent-500 transition-[top,height] duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)]"
            style={{ top: indicator.top, height: indicator.height }}
          />
          <ol ref={list} className="relative space-y-1 text-sm">
            {items.map((it, i) => (
              <li key={it.id}>
                <a
                  ref={(el) => {
                    links.current[i] = el;
                  }}
                  href={`#${it.id}`}
                  onClick={(e) => jump(e, it.id, i)}
                  aria-current={i === active ? "location" : undefined}
                  className={`flex gap-2 rounded-sm px-2 py-1.5 transition-[color,background-color,transform] duration-300 ${
                    i === active ? "translate-x-1 bg-accent-500/[0.07] font-medium text-dark-500" : "text-light-900 hover:text-dark-500"
                  }`}
                >
                  <span className={`font-mono text-[11px] leading-5 transition-colors ${i === active ? "text-accent-700" : "text-light-800"}`}>{pad(i + 1)}</span>
                  <span>{it.label}</span>
                </a>
              </li>
            ))}
          </ol>
        </div>
      </nav>

      {/* Mobile / tablet: floating bottom bar + sheet */}
      <div
        className={`fixed inset-x-3 bottom-3 z-40 transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] lg:hidden ${
          showBar ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
        }`}
      >
        <div className="glass glass-panel overflow-hidden rounded-lg border border-light-600">
          {/* Sheet */}
          <div
            id="toc-sheet"
            className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
          >
            <div className="overflow-hidden">
              <ol className="max-h-[55dvh] overflow-y-auto p-2" aria-label="On this page">
                {items.map((it, i) => (
                  <li
                    key={it.id}
                    style={{ transitionDelay: open ? `${i * 30}ms` : "0ms" }}
                    className={`transition-[opacity,transform] duration-300 ${open ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0"}`}
                  >
                    <a
                      href={`#${it.id}`}
                      onClick={(e) => jump(e, it.id, i)}
                      aria-current={i === active ? "location" : undefined}
                      className={`flex items-center gap-3 rounded-sm px-3 py-2.5 text-[15px] ${
                        i === active ? "bg-accent-500/[0.1] font-medium text-dark-500" : "text-dark-400 active:bg-dark-500/[0.05]"
                      }`}
                    >
                      <span className={`font-mono text-xs ${i === active ? "text-accent-700" : "text-light-900"}`}>{pad(i + 1)}</span>
                      {it.label}
                      {i === active && <span aria-hidden className="ml-auto h-1.5 w-1.5 rounded-full bg-accent-500" />}
                    </a>
                  </li>
                ))}
              </ol>
              <div className="mx-3 h-px bg-light-600" />
            </div>
          </div>

          {/* Bar */}
          <button
            type="button"
            aria-expanded={open}
            aria-controls="toc-sheet"
            onClick={() => setOpen((v) => !v)}
            className="flex w-full items-center gap-3 px-3.5 py-3 text-left"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-sm bg-dark-500 text-light-50">
              <Icon icon={open ? Cancel01Icon : LeftToRightListNumberIcon} size={17} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block font-mono text-[10.5px] tracking-wide text-light-900 uppercase">
                On this page · <span className="text-accent-700">{pad(active + 1)}</span> / {pad(items.length)}
              </span>
              <span key={active} className="animate-rise block truncate text-[14.5px] font-medium text-dark-500">
                {items[active]?.label}
              </span>
            </span>
            <Icon icon={ArrowDown01Icon} size={16} className={`text-light-900 transition-transform duration-300 ${open ? "" : "rotate-180"}`} />
          </button>
          <span aria-hidden className="block h-0.5 bg-light-600">
            <span className="block h-full origin-left bg-accent-500 transition-transform duration-200 ease-out" style={{ transform: `scaleX(${progress})` }} />
          </span>
        </div>
      </div>
    </>
  );
}
