"use client";

import { useEffect, useRef } from "react";

/**
 * Seamless marquee. Content is rendered twice and translated by exactly one
 * copy's width using the Web Animations API, so hovering can ease the speed
 * down (speedOnHover) without the jump a CSS animation-duration change causes.
 */
export function InfiniteSlider({
  children,
  gap = 16,
  speed = 60,
  speedOnHover,
  reverse = false,
  className = "",
}: {
  children: React.ReactNode;
  gap?: number;
  /** pixels per second */
  speed?: number;
  speedOnHover?: number;
  reverse?: boolean;
  className?: string;
}) {
  const track = useRef<HTMLDivElement>(null);
  const copy = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = track.current;
    const one = copy.current;
    if (!el || !one) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let anim: Animation | undefined;
    let raf = 0;
    const build = () => {
      anim?.cancel();
      const distance = one.offsetWidth + gap;
      if (!distance) return;
      const from = reverse ? -distance : 0;
      const to = reverse ? 0 : -distance;
      anim = el.animate([{ transform: `translateX(${from}px)` }, { transform: `translateX(${to}px)` }], {
        duration: (distance / speed) * 1000,
        iterations: Infinity,
        easing: "linear",
      });
    };
    build();

    const ease = (target: number) => {
      cancelAnimationFrame(raf);
      const step = () => {
        if (!anim) return;
        const next = anim.playbackRate + (target - anim.playbackRate) * 0.12;
        anim.playbackRate = Math.abs(next - target) < 0.01 ? target : next;
        if (anim.playbackRate !== target) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    };
    const slow = () => speedOnHover && ease(speedOnHover / speed);
    const resume = () => ease(1);
    el.addEventListener("pointerenter", slow);
    el.addEventListener("pointerleave", resume);

    const ro = new ResizeObserver(build);
    ro.observe(one);
    return () => {
      ro.disconnect();
      cancelAnimationFrame(raf);
      el.removeEventListener("pointerenter", slow);
      el.removeEventListener("pointerleave", resume);
      anim?.cancel();
    };
  }, [gap, speed, speedOnHover, reverse]);

  return (
    <div className={`overflow-hidden ${className}`}>
      <div ref={track} className="flex w-max will-change-transform" style={{ gap }}>
        <div ref={copy} className="flex shrink-0 items-center" style={{ gap }}>
          {children}
        </div>
        <div className="flex shrink-0 items-center" style={{ gap }} aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
