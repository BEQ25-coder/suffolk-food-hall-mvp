import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { quickActions } from "@/lib/demo-data";

export function QuickActionGrid() {
  return (
    <div className="grid grid-cols-2 gap-4">
      {quickActions.map((action) => (
        <Link key={action.title} href={action.href} className="rounded-2xl border border-[#eee] bg-white p-4 shadow-sm">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h4 className="text-base font-medium text-bark">{action.title}</h4>
              <p className="mt-2 text-xs leading-5 text-bark/65">{action.description}</p>
            </div>
            <ArrowRight className="mt-0.5 h-4 w-4 text-moss" />
          </div>
        </Link>
      ))}
    </div>
  );
}
