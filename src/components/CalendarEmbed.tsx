import { site } from "@/lib/site";

/** Inline booking (§9). Renders only when NEXT_PUBLIC_CALENDAR_LINK is set. */
export function CalendarEmbed({ className = "" }: { className?: string }) {
  if (!site.calendarLink) return null;
  return (
    <iframe
      src={site.calendarLink}
      title="Book an AImdoc demo"
      className={`min-h-[680px] w-full rounded-md border border-light-600 bg-light-50 ${className}`}
      loading="lazy"
    />
  );
}
