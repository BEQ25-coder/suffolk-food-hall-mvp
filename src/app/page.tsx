import { AppShell } from "@/components/AppShell";
import { EventCard } from "@/components/EventCard";
import { HeroBanner } from "@/components/HeroBanner";
import { OfferCard } from "@/components/OfferCard";
import { QuickActionGrid } from "@/components/QuickActionGrid";
import { SectionCard } from "@/components/SectionCard";
import { featuredEvent, offers, openingHours } from "@/lib/demo-data";

export default function HomePage() {
  return (
    <AppShell>
      <HeroBanner />

      <SectionCard title="Quick actions" subtitle="Start here">
        <QuickActionGrid />
      </SectionCard>

      <SectionCard title="Opening hours" subtitle="Plan a visit">
        <div className="space-y-4">
          {openingHours.map((item) => (
            <div key={item.label} className="rounded-2xl border border-[#eee] bg-[#fffdf8] p-4 shadow-sm">
              <p className="text-sm font-semibold text-bark">{item.label}</p>
              <p className="mt-1 text-sm text-bark/70">{item.hours}</p>
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Featured event" subtitle="This season">
        <EventCard event={featuredEvent} />
      </SectionCard>

      <SectionCard title="Member offers" subtitle="Loyalty preview">
        <div className="space-y-4">
          {offers.slice(0, 2).map((offer) => (
            <OfferCard key={offer.id} offer={offer} />
          ))}
        </div>
      </SectionCard>
    </AppShell>
  );
}
