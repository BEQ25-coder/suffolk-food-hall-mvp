import { Bell, MapPin } from "lucide-react";
import { siteMeta } from "@/lib/demo-data";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/50 bg-[#f8f3ea]/90 px-4 pb-3 pt-5 backdrop-blur">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="section-kicker">Plan your visit</p>
          <h1 className="mt-1 text-xl font-semibold tracking-tight text-bark">{siteMeta.name}</h1>
          <div className="mt-1 flex items-center gap-1 text-sm text-bark/70">
            <MapPin className="h-4 w-4" />
            <span>Wherstead, Suffolk</span>
          </div>
        </div>
        <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#eee] bg-white text-bark shadow-sm">
          <Bell className="h-5 w-5" />
        </button>
      </div>
    </header>
  );
}
