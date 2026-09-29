"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { BrowserWindow } from "@/components/ui/browser-window";

export type Screen = { src: string; label: string; caption: string; alt: string; path?: string };

const DURATION = 6000;

/** Real product screenshots in a browser frame, with tabs that auto-advance (pause on hover). */
export function ProductScreens({ screens, url }: { screens: Screen[]; url: string }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches), []);
  useEffect(() => {
    if (paused || reduced) return;
    const t = setTimeout(() => setI((n) => (n + 1) % screens.length), DURATION);
    return () => clearTimeout(t);
  }, [i, paused, reduced, screens.length]);

  const s = screens[i];
  return (
    <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}>
      <div role="tablist" aria-label="AImdoc screens" className="flex flex-wrap gap-2">
        {screens.map((sc, n) => (
          <button
            key={sc.src}
            role="tab"
            aria-selected={n === i}
            aria-controls="product-screen"
            onClick={() => setI(n)}
            className={`relative overflow-hidden rounded-sm border px-3.5 py-2 text-sm transition-colors ${
              n === i ? "border-dark-500 bg-dark-500 text-light-50" : "border-light-600 bg-light-50 text-dark-400 hover:border-light-700 hover:text-dark-500"
            }`}
          >
            <span className="mr-2 font-mono text-[11px] opacity-60">0{n + 1}</span>
            {sc.label}
            {n === i && !paused && !reduced && (
              <span aria-hidden className="absolute inset-x-0 bottom-0 h-0.5 bg-white/15">
                <span key={i} className="block h-full origin-left bg-accent-500" style={{ animation: `showcase-bar ${DURATION}ms linear forwards` }} />
              </span>
            )}
          </button>
        ))}
      </div>

      <figure id="product-screen" role="tabpanel" className="mt-4">
        <BrowserWindow variant="chrome" headerStyle="full" url={`${url}${s.path ?? ""}`}>
          <div className="relative aspect-[1485/812] bg-dark-500">
            {screens.map((sc, n) => (
              <Image
                key={sc.src}
                src={sc.src}
                alt={sc.alt}
                fill
                sizes="(min-width: 1200px) 1100px, 100vw"
                className={`object-cover object-left-top transition-opacity duration-500 ${n === i ? "opacity-100" : "opacity-0"}`}
                aria-hidden={n !== i}
              />
            ))}
          </div>
        </BrowserWindow>
        <figcaption key={i} className="animate-rise mt-3 text-[15px] text-light-900">
          <span className="font-medium text-dark-500">{s.label}.</span> {s.caption}
        </figcaption>
      </figure>
    </div>
  );
}
