"use client";

import { memo, useEffect, useId, useRef } from "react";

const TWO_PI = Math.PI * 2;

export type DotFieldProps = {
  dotRadius?: number;
  dotSpacing?: number;
  cursorRadius?: number;
  cursorForce?: number;
  bulgeOnly?: boolean;
  bulgeStrength?: number;
  glowRadius?: number;
  sparkle?: boolean;
  waveAmplitude?: number;
  gradientFrom?: string;
  gradientTo?: string;
  glowColor?: string;
  className?: string;
};

/**
 * Interactive dot field (canvas). Dots bulge away from a moving cursor and a
 * soft glow follows it. Adapted for the site:
 *  - pauses its animation loop while off-screen (IntersectionObserver)
 *  - draws once and stays still for reduced-motion and touch-only devices
 *  - measures against the canvas rect, so scrolling never skews the cursor
 */
export const DotField = memo(function DotField({
  dotRadius = 1.5,
  dotSpacing = 14,
  cursorRadius = 500,
  cursorForce = 0.1,
  bulgeOnly = true,
  bulgeStrength = 67,
  glowRadius = 160,
  sparkle = false,
  waveAmplitude = 0,
  gradientFrom = "rgba(168, 85, 247, 0.35)",
  gradientTo = "rgba(180, 151, 207, 0.25)",
  glowColor = "#120F17",
  className = "",
}: DotFieldProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glowRef = useRef<SVGCircleElement>(null);
  // useId keeps the gradient id identical on server and client (no hydration mismatch).
  const glowId = `dot-field-glow-${useId().replace(/:/g, "")}`;
  const props = useRef({ dotRadius, dotSpacing, cursorRadius, cursorForce, bulgeOnly, bulgeStrength, sparkle, waveAmplitude, gradientFrom, gradientTo });
  props.current = { dotRadius, dotSpacing, cursorRadius, cursorForce, bulgeOnly, bulgeStrength, sparkle, waveAmplitude, gradientFrom, gradientTo };
  const rebuild = useRef<(() => void) | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    const glowEl = glowRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const interactive = !reduced && finePointer;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    type Dot = { ax: number; ay: number; sx: number; sy: number; vx: number; vy: number; x: number; y: number };
    let dots: Dot[] = [];
    let w = 0;
    let h = 0;
    const mouse = { x: -9999, y: -9999, prevX: -9999, prevY: -9999, speed: 0 };
    let engagement = 0;
    let glowOpacity = 0;
    let raf = 0;
    let frame = 0;
    let visible = false;
    let resizeTimer: ReturnType<typeof setTimeout> | undefined;

    const buildDots = () => {
      const p = props.current;
      const step = p.dotRadius + p.dotSpacing;
      const cols = Math.floor(w / step);
      const rows = Math.floor(h / step);
      const padX = (w % step) / 2;
      const padY = (h % step) / 2;
      dots = new Array(rows * cols);
      let i = 0;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const ax = padX + c * step + step / 2;
          const ay = padY + r * step + step / 2;
          dots[i++] = { ax, ay, sx: ax, sy: ay, vx: 0, vy: 0, x: ax, y: ay };
        }
      }
    };

    const draw = () => {
      frame++;
      const p = props.current;
      const t = frame * 0.02;

      const target = Math.min(mouse.speed / 5, 1);
      engagement += (target - engagement) * 0.06;
      if (engagement < 0.001) engagement = 0;
      glowOpacity += (engagement - glowOpacity) * 0.08;
      if (glowEl) {
        glowEl.setAttribute("cx", String(mouse.x));
        glowEl.setAttribute("cy", String(mouse.y));
        glowEl.style.opacity = String(glowOpacity);
      }

      ctx.clearRect(0, 0, w, h);
      const grad = ctx.createLinearGradient(0, 0, w, h);
      grad.addColorStop(0, p.gradientFrom);
      grad.addColorStop(1, p.gradientTo);
      ctx.fillStyle = grad;

      const cr = p.cursorRadius;
      const crSq = cr * cr;
      const rad = p.dotRadius / 2;
      ctx.beginPath();
      for (let i = 0; i < dots.length; i++) {
        const d = dots[i];
        const dx = mouse.x - d.ax;
        const dy = mouse.y - d.ay;
        const distSq = dx * dx + dy * dy;
        if (distSq < crSq && engagement > 0.01) {
          const dist = Math.sqrt(distSq) || 1;
          const angle = Math.atan2(dy, dx);
          if (p.bulgeOnly) {
            const k = 1 - dist / cr;
            const push = k * k * p.bulgeStrength * engagement;
            d.sx += (d.ax - Math.cos(angle) * push - d.sx) * 0.15;
            d.sy += (d.ay - Math.sin(angle) * push - d.sy) * 0.15;
          } else {
            const move = (500 / dist) * (mouse.speed * p.cursorForce);
            d.vx += Math.cos(angle) * -move;
            d.vy += Math.sin(angle) * -move;
          }
        } else if (p.bulgeOnly) {
          d.sx += (d.ax - d.sx) * 0.1;
          d.sy += (d.ay - d.sy) * 0.1;
        }
        if (!p.bulgeOnly) {
          d.vx *= 0.9;
          d.vy *= 0.9;
          d.x = d.ax + d.vx;
          d.y = d.ay + d.vy;
          d.sx += (d.x - d.sx) * 0.1;
          d.sy += (d.y - d.sy) * 0.1;
        }
        let x = d.sx;
        let y = d.sy;
        if (p.waveAmplitude > 0) {
          y += Math.sin(d.ax * 0.03 + t) * p.waveAmplitude;
          x += Math.cos(d.ay * 0.03 + t * 0.7) * p.waveAmplitude * 0.5;
        }
        const big = p.sparkle && ((((i * 2654435761) ^ (frame >> 3)) >>> 0) % 100) < 3;
        const r = big ? rad * 1.8 : rad;
        ctx.moveTo(x + r, y);
        ctx.arc(x, y, r, 0, TWO_PI);
      }
      ctx.fill();
    };

    const loop = () => {
      draw();
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (!interactive || raf || !visible) return;
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    const doResize = () => {
      const rect = wrap.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildDots();
      draw();
    };
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(doResize, 100);
    };

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const speedTimer = interactive
      ? setInterval(() => {
          const dx = mouse.prevX - mouse.x;
          const dy = mouse.prevY - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          mouse.speed += (dist - mouse.speed) * 0.5;
          if (mouse.speed < 0.001) mouse.speed = 0;
          mouse.prevX = mouse.x;
          mouse.prevY = mouse.y;
        }, 20)
      : undefined;

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    });
    io.observe(wrap);
    const ro = new ResizeObserver(onResize);
    ro.observe(wrap);

    doResize();
    if (interactive) window.addEventListener("mousemove", onMove, { passive: true });
    rebuild.current = () => {
      buildDots();
      draw();
    };

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      clearInterval(speedTimer);
      clearTimeout(resizeTimer);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  useEffect(() => {
    rebuild.current?.();
  }, [dotRadius, dotSpacing, gradientFrom, gradientTo]);

  return (
    <div ref={wrapRef} aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <svg className="pointer-events-none absolute inset-0 h-full w-full">
        <defs>
          <radialGradient id={glowId}>
            <stop offset="0%" stopColor={glowColor} />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
        <circle ref={glowRef} cx="-9999" cy="-9999" r={glowRadius} fill={`url(#${glowId})`} style={{ opacity: 0, willChange: "opacity" }} />
      </svg>
    </div>
  );
});
