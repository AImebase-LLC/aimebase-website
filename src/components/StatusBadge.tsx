import { isPlaceholder } from "@/lib/site";
import { Ph } from "./Placeholder";

const map: Record<string, { label: string; cls: string }> = {
  live: { label: "Live", cls: "bg-status-live-bg text-status-live" },
  pilot: { label: "Pilot", cls: "bg-status-pilot-bg text-status-pilot" },
  "in-development": { label: "In development", cls: "bg-status-dev-bg text-status-dev" },
  research: { label: "What's next", cls: "bg-light-600 text-dark-400" },
};

/** Status colors per §7.4: live green, pilot blue, in-development amber, research gray. */
export function StatusBadge({ status }: { status: string }) {
  if (isPlaceholder(status)) return <Ph>{status}</Ph>;
  const s = map[status] ?? { label: status, cls: "bg-light-600 text-dark-400" };
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-xs px-1.5 py-0.5 mono-label !text-[10px] ${s.cls}`}>
      <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-current" />
      {s.label}
    </span>
  );
}
