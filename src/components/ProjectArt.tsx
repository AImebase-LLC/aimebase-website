/**
 * Illustrated cover for a project with no cover image yet, drawn per `type`.
 * Every element is decorative; the wrapper carries the alt text.
 */
export function ProjectArt({ type }: { type: string }) {
  if (type === "voting-platform") return <Ballot />;
  if (type === "website" || type === "payments") return <Website />;
  return <Note />;
}

function Frame({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`w-[78%] max-w-[360px] rounded-md border border-secondary-300 bg-light-50 shadow-[0_18px_40px_-20px_rgb(107_28_2/0.4)] transition-transform duration-500 group-hover:-translate-y-1 group-hover:rotate-[-0.6deg] ${className}`}>
      {children}
    </div>
  );
}

function Note() {
  return (
    <Frame>
      <div className="flex items-center gap-1.5 border-b border-light-600 px-3 py-2">
        <span className="h-1.5 w-1.5 rounded-full bg-accent-500" />
        <span className="text-[10px] font-medium">Shift note</span>
        <span className="ml-auto rounded-xs bg-status-live-bg px-1 font-mono text-[8px] text-status-live">READY</span>
      </div>
      <div className="grid grid-cols-2 gap-2 p-3">
        <div className="space-y-1.5">
          {["Morning routine", "Meals", "Community goal"].map((q) => (
            <div key={q} className="rounded-xs bg-secondary-50 px-1.5 py-1 text-[8.5px] text-dark-400 ring-1 ring-secondary-200">✓ {q}</div>
          ))}
        </div>
        <div className="space-y-1.5 pt-0.5">
          <div className="h-1 w-2/3 rounded-full bg-dark-400" />
          <div className="h-1 w-full rounded-full bg-light-600" />
          <div className="h-1 w-11/12 rounded-full bg-light-600" />
          <div className="h-1 w-1/2 rounded-full bg-dark-400" />
          <div className="h-1 w-full rounded-full bg-light-600" />
          <div className="h-1 w-3/4 rounded-full bg-light-600" />
        </div>
      </div>
    </Frame>
  );
}

function Ballot() {
  return (
    <Frame>
      <div className="flex items-center justify-between border-b border-light-600 px-3 py-2">
        <span className="text-[10px] font-medium">Amatora 2026</span>
        <span className="flex overflow-hidden rounded-xs border border-light-600 font-mono text-[8px]">
          <span className="bg-dark-500 px-1 text-light-50">RW</span>
          <span className="px-1 text-dark-400">EN</span>
        </span>
      </div>
      <div className="space-y-1.5 p-3">
        {[true, false, false].map((sel, i) => (
          <div key={i} className={`flex items-center gap-2 rounded-xs px-2 py-1.5 ring-1 ${sel ? "bg-secondary-50 ring-accent-300" : "ring-light-600"}`}>
            <span className={`flex h-2.5 w-2.5 items-center justify-center rounded-full border ${sel ? "border-accent-500" : "border-light-700"}`}>
              {sel && <span className="h-1.5 w-1.5 rounded-full bg-accent-500" />}
            </span>
            <span className={`h-1 rounded-full ${sel ? "w-1/2 bg-dark-400" : "w-2/5 bg-light-600"}`} />
          </div>
        ))}
        <div className="flex justify-end pt-0.5">
          <span className="rounded-xs bg-dark-500 px-2 py-1 text-[8.5px] font-medium text-light-50">Tora · Cast vote</span>
        </div>
      </div>
    </Frame>
  );
}

function Website() {
  return (
    <Frame>
      <div className="flex items-center gap-1 border-b border-light-600 px-3 py-2">
        <span className="h-1.5 w-1.5 rounded-full bg-light-700" />
        <span className="h-1.5 w-1.5 rounded-full bg-light-700" />
        <span className="h-1.5 w-1.5 rounded-full bg-light-700" />
        <span className="ml-2 h-2.5 flex-1 rounded-xs bg-light-500 ring-1 ring-light-600" />
      </div>
      <div className="grid grid-cols-[1.3fr_1fr] gap-2 p-3">
        <div className="space-y-1.5">
          <div className="h-1.5 w-4/5 rounded-full bg-dark-400" />
          <div className="h-1 w-full rounded-full bg-light-600" />
          <div className="h-1 w-5/6 rounded-full bg-light-600" />
          <div className="mt-2 h-8 rounded-xs bg-secondary-100" />
        </div>
        <div className="space-y-1 rounded-xs bg-secondary-50 p-1.5 ring-1 ring-secondary-200">
          <span className="block text-[8px] font-medium text-dark-400">Monthly</span>
          <div className="grid grid-cols-3 gap-1">
            {["$10", "$25", "$50"].map((a, i) => (
              <span key={a} className={`rounded-xs py-0.5 text-center font-mono text-[7.5px] ${i === 1 ? "bg-accent-500 text-dark-500" : "bg-light-50 text-dark-400 ring-1 ring-light-600"}`}>{a}</span>
            ))}
          </div>
          <span className="block rounded-xs bg-dark-500 py-0.5 text-center text-[7.5px] text-light-50">Contribute</span>
        </div>
      </div>
    </Frame>
  );
}
