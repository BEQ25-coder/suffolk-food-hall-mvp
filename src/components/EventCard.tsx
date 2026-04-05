import { CalendarRange, Clock3, Ticket } from "lucide-react";
import type { EventItem } from "@/lib/types";

export function EventCard({ event }: { event: EventItem }) {
  return (
    <article className="rounded-2xl border border-[#eee] bg-[#fffdf8] p-4 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <span className="rounded-full bg-cream px-3 py-1 text-xs font-medium text-bark">{event.category}</span>
        <span className="text-xs text-bark/60">{event.price}</span>
      </div>
      <h4 className="mt-3 text-base font-medium text-bark">{event.title}</h4>
      <p className="mt-2 text-sm leading-6 text-bark/70">{event.description}</p>
      <div className="mt-4 grid gap-2 text-sm text-bark/75">
        <div className="flex items-center gap-2"><CalendarRange className="h-4 w-4" />{event.date}</div>
        <div className="flex items-center gap-2"><Clock3 className="h-4 w-4" />{event.time}</div>
      </div>
      <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-moss px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-50">
        <Ticket className="h-4 w-4" />
        {event.cta}
      </button>
    </article>
  );
}
