import type { OfferItem } from "@/lib/types";

export function OfferCard({ offer }: { offer: OfferItem }) {
  return (
    <article className="rounded-2xl border border-[#eee] bg-[#fffdf8] p-4 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-moss">Member offer</p>
      <h4 className="mt-2 text-base font-medium text-bark">{offer.title}</h4>
      <p className="mt-2 text-sm leading-6 text-bark/70">{offer.description}</p>
      <p className="mt-3 text-xs font-medium text-bark/50">{offer.expires}</p>
    </article>
  );
}
