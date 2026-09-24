"use client";

import { useEffect, useRef, useState } from "react";

const qa = [
  { q: "How did the morning routine go?", a: "Dressed on his own. One reminder for meds." },
  { q: "What did he eat today?", a: "Most of lunch. Chose the soup himself." },
  { q: "Any progress on his community goal?", a: "Walked to the library, greeted staff." },
  { q: "How was his mood?", a: "Calm. A bit tired after the walk." },
  { q: "Anything the next shift should know?", a: "Inhaler refill requested." },
];

const note = [
  {
    goal: "Goal 1 · Daily living.",
    text: "He completed his morning routine independently and took his medication after one verbal reminder. He ate most of lunch and chose his meal himself.",
  },
  {
    goal: "Goal 2 · Community.",
    text: "He walked to the public library with staff support and greeted library staff on his own. Mood was calm; slightly tired afterward.",
  },
  { goal: "Handoff.", text: "Inhaler refill requested for the next shift." },
];

type Phase = "asking" | "drafting" | "writing" | "review" | "signed";

/**
 * The hero's live product demo: guided questions on the left fill in, then
 * the note drafts itself goal by goal and the caregiver signs off. Loops while
 * visible; shows the finished state for reduced-motion users.
 */
export function ProductPreview() {
  const ref = useRef<HTMLElement>(null);
  const [step, setStep] = useState(0); // question index being answered
  const [chars, setChars] = useState(0); // typed characters of current answer
  const [phase, setPhase] = useState<Phase>("asking");
  const [paras, setParas] = useState(0);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setStep(qa.length - 1);
      setChars(qa[qa.length - 1].a.length);
      setParas(note.length);
      setPhase("review");
      return;
    }
    let visible = false;
    const sync = () => setActive(visible && document.visibilityState !== "hidden");
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; sync(); }, { threshold: 0.2 });
    if (ref.current) io.observe(ref.current);
    document.addEventListener("visibilitychange", sync);
    return () => { io.disconnect(); document.removeEventListener("visibilitychange", sync); };
  }, []);

  useEffect(() => {
    if (!active) return;
    let t: ReturnType<typeof setTimeout>;
    if (phase === "asking") {
      const answer = qa[step].a;
      if (chars < answer.length) t = setTimeout(() => setChars((c) => c + 1), chars === 0 ? 420 : 24);
      else if (step < qa.length - 1) t = setTimeout(() => { setStep((s) => s + 1); setChars(0); }, 380);
      else t = setTimeout(() => setPhase("drafting"), 450);
    } else if (phase === "drafting") {
      t = setTimeout(() => { setPhase("writing"); setParas(1); }, 1000);
    } else if (phase === "writing") {
      if (paras < note.length) t = setTimeout(() => setParas((p) => p + 1), 650);
      else t = setTimeout(() => setPhase("review"), 500);
    } else if (phase === "review") {
      t = setTimeout(() => setPhase("signed"), 1600);
    } else {
      t = setTimeout(() => { setStep(0); setChars(0); setParas(0); setPhase("asking"); }, 3200);
    }
    return () => clearTimeout(t);
  }, [active, phase, step, chars, paras]);

  const answered = phase === "asking" ? step : qa.length;
  const progress = phase === "asking" ? (step + chars / qa[step].a.length) / qa.length : 1;

  return (
    <figure ref={ref} className="w-full max-w-[580px]" aria-label="AImdoc demo: guided answers become a finished care note">
      <div className="overflow-hidden rounded-lg border border-secondary-300 bg-light-50 shadow-[0_30px_70px_-30px_rgb(107_28_2/0.45)]">
        {/* Title bar */}
        <div className="flex items-center justify-between border-b border-light-600 px-4 py-2.5">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-accent-500 animate-pulse-ring" aria-hidden />
            <span className="text-[13px] font-medium">AImdoc</span>
            <span className="text-[13px] text-light-900">· Evening shift note</span>
          </div>
          <span className="font-mono text-[10px] text-light-900" aria-hidden>11:40 PM</span>
        </div>
        <div className="h-0.5 bg-light-600" aria-hidden>
          <div className="h-full bg-accent-500 transition-[width] duration-300 ease-out" style={{ width: `${progress * 100}%` }} />
        </div>

        <div className="grid sm:min-h-[340px] sm:grid-cols-[1fr_1.05fr]" aria-hidden>
          {/* Guided questions */}
          <div className="border-b border-light-600 p-4 sm:border-r sm:border-b-0">
            <p className="mono-label !text-[10px] text-light-900">
              Guided questions · {Math.min(answered + (phase === "asking" ? 1 : 0), qa.length)} of {qa.length}
            </p>
            <ol className="mt-3 space-y-2.5">
              {qa.map((x, i) => {
                const done = i < answered;
                const current = phase === "asking" && i === step;
                if (!done && !current) {
                  return (
                    <li key={i} className="flex items-center gap-2 text-[11.5px] text-light-700">
                      <span className="h-3.5 w-3.5 shrink-0 rounded-full border border-light-600" />
                      <span className="truncate">{x.q}</span>
                    </li>
                  );
                }
                return (
                  <li key={i} className={current ? "animate-rise" : ""}>
                    <div className="flex items-center gap-2 text-[11.5px] text-light-900">
                      <span
                        className={`flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full text-[8px] ${
                          done ? "bg-dark-500 text-light-50" : "border border-accent-500"
                        }`}
                      >
                        {done ? "✓" : ""}
                      </span>
                      <span className="truncate">{x.q}</span>
                    </div>
                    <p
                      className={`mt-1 ml-5.5 rounded-sm px-2 py-1 text-[12px] leading-snug ring-1 transition-colors ${
                        current ? "bg-secondary-50 text-dark-500 ring-accent-300" : "bg-light-500 text-dark-400 ring-light-600"
                      }`}
                    >
                      {current ? x.a.slice(0, chars) : x.a}
                      {current && <span className="ml-px inline-block h-3 w-px translate-y-0.5 bg-dark-500 animate-blink" />}
                    </p>
                  </li>
                );
              })}
            </ol>
          </div>

          {/* Draft note */}
          <div className="flex min-h-[260px] flex-col p-4">
            <div className="flex items-center justify-between">
              <p className="mono-label !text-[10px] text-light-900">Draft note</p>
              {phase === "drafting" && <span className="mono-label !text-[10px] text-accent-700">Drafting…</span>}
              {(phase === "review" || phase === "signed") && (
                <span className="mono-label animate-rise !text-[10px] text-status-live">Ready for review</span>
              )}
            </div>
            <div className="mt-3 flex-1 space-y-2.5 text-[12px] leading-relaxed text-dark-400">
              {phase === "asking" && (
                <div className="space-y-2 pt-1">
                  {[100, 92, 70, 0, 96, 60].map((w, i) => (
                    <div key={i} className="h-1.5 rounded-full bg-light-600/70" style={{ width: `${w}%` }} />
                  ))}
                </div>
              )}
              {phase === "drafting" && (
                <div className="space-y-2 pt-1">
                  {[100, 92, 70, 0, 96, 60].map((w, i) => (
                    <div key={i} className="h-1.5 animate-pulse rounded-full bg-accent-100" style={{ width: `${w}%`, animationDelay: `${i * 90}ms` }} />
                  ))}
                </div>
              )}
              {paras > 0 &&
                note.slice(0, paras).map((p) => (
                  <p key={p.goal} className="animate-rise">
                    <span className="font-medium text-dark-500">{p.goal}</span> {p.text}
                  </p>
                ))}
            </div>
            <div className="flex items-center justify-between gap-2 pt-4">
              <span className="text-[11px] text-light-900">
                {phase === "signed" ? "Signed by caregiver" : "Caregiver review required"}
              </span>
              <span
                className={`rounded-sm px-2.5 py-1.5 text-[12px] font-medium transition-colors duration-300 ${
                  phase === "signed"
                    ? "bg-status-live-bg text-status-live"
                    : phase === "review"
                      ? "bg-dark-500 text-light-50 ring-2 ring-accent-300 ring-offset-1"
                      : "bg-light-600 text-light-900"
                }`}
              >
                {phase === "signed" ? "✓ Signed" : "Review & sign"}
              </span>
            </div>
          </div>
        </div>
      </div>
      <figcaption className="mt-3 text-center font-mono text-[10px] text-secondary-900">
        Five answers in. A complete note out. The caregiver signs.
      </figcaption>
    </figure>
  );
}
