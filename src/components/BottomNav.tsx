"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarDays, CreditCard, Home, ShoppingBag, UtensilsCrossed } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { href: "/", label: "Home", icon: Home },
  { href: "/events", label: "Events", icon: CalendarDays },
  { href: "/shop", label: "Shop", icon: ShoppingBag },
  { href: "/loyalty", label: "Loyalty", icon: CreditCard },
  { href: "/book", label: "Book", icon: UtensilsCrossed }
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-4 left-1/2 z-50 w-[calc(100%-1.5rem)] max-w-md -translate-x-1/2 rounded-full border border-white/70 bg-white/92 p-2 shadow-soft backdrop-blur">
      <div className="grid grid-cols-5 gap-1">
        {items.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex flex-col items-center justify-center rounded-full px-2 py-2 text-[11px] font-medium transition",
                active ? "bg-moss text-white" : "text-bark/70 hover:bg-cream"
              )}
            >
              <Icon className="mb-1 h-4 w-4" />
              <span>{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
