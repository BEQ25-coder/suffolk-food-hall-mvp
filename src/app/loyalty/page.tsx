import { AppShell } from "@/components/AppShell";
import { LoyaltyCard } from "@/components/LoyaltyCard";
import { OfferCard } from "@/components/OfferCard";
import { SectionCard } from "@/components/SectionCard";
import { loyalty, offers } from "@/lib/demo-data";

export default function LoyaltyPage() {
  return (
    <AppShell>
      <LoyaltyCard />

      <SectionCard title="Member summary" subtitle="Account overview">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="rounded-2xl border border-[#eee] bg-[#fffdf8] p-4 shadow-sm">
            <p className="text-bark/60">Tier</p>
            <p className="mt-1 font-semibold text-bark">{loyalty.tier}</p>
          </div>
          <div className="rounded-2xl border border-[#eee] bg-[#fffdf8] p-4 shadow-sm">
            <p className="text-bark/60">Next reward</p>
            <p className="mt-1 font-semibold text-bark">£10 dining</p>
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Available offers" subtitle="Personalised perks">
        <div className="space-y-4">
          {offers.map((offer) => (
            <OfferCard key={offer.id} offer={offer} />
          ))}
        </div>
      </SectionCard>
    </AppShell>
  );
}
