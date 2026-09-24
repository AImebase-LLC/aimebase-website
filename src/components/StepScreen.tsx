/** Product screens for the three AImdoc steps: ask, draft, review. Decorative. */
export function StepScreen({ i, compact = false }: { i: number; compact?: boolean }) {
  const shell = `w-full max-w-md rounded-lg border border-secondary-300 bg-light-50 shadow-[0_20px_50px_-28px_rgb(107_28_2/0.45)] ${compact ? "p-3.5" : "p-4"}`;
  if (i === 0)
    return (
      <div className={shell} aria-hidden>
        <p className="mono-label !text-[10px] text-light-900">Question 3 of 5 · Goal 2 · Community</p>
        <p className="display mt-3 text-xl">Any progress on his community goal?</p>
        <div className="mt-4 rounded-sm bg-secondary-50 px-3 py-2.5 text-[14px] ring-1 ring-accent-300">
          Walked to the library, greeted staff.<span className="ml-px inline-block h-4 w-px translate-y-0.5 bg-dark-500 animate-blink" />
        </div>
        <div className="mt-4 flex gap-1.5">
          {[1, 1, 1, 0, 0].map((d, k) => (
            <span key={k} className={`h-1 flex-1 rounded-full ${d ? "bg-accent-500" : "bg-light-600"}`} />
          ))}
        </div>
      </div>
    );
  if (i === 1)
    return (
      <div className={shell} aria-hidden>
        <div className="flex items-center justify-between">
          <p className="mono-label !text-[10px] text-light-900">Draft note</p>
          <span className="mono-label !text-[10px] text-status-live">Ready for review</span>
        </div>
        <div className="mt-3 space-y-3 text-[13px] leading-relaxed text-dark-400">
          <p><span className="font-medium text-dark-500">Goal 1 · Daily living.</span> He completed his morning routine independently and took his medication after one verbal reminder.</p>
          <p><span className="font-medium text-dark-500">Goal 2 · Community.</span> He walked to the public library with staff support and greeted library staff on his own.</p>
        </div>
      </div>
    );
  return (
    <div className={shell} aria-hidden>
      <p className="mono-label !text-[10px] text-light-900">Review</p>
      <p className="mt-3 text-[13px] leading-relaxed text-dark-400">
        He walked to the public library with staff support and greeted library staff on his own.{" "}
        <span className="rounded-xs bg-accent-50 px-0.5 text-dark-500 ring-1 ring-accent-200">Mood was calm; slightly tired afterward.</span>
      </p>
      <div className="mt-4 flex items-center justify-between rounded-sm bg-light-500 p-3 ring-1 ring-light-600">
        <span className="flex items-center gap-2 text-[13px] text-dark-400">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-status-live-bg text-[11px] text-status-live">✓</span>
          Edited and approved
        </span>
        <span className="rounded-xs bg-dark-500 px-2.5 py-1 text-[12px] text-light-50">Sign off</span>
      </div>
    </div>
  );
}
