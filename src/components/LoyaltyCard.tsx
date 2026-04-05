import { loyalty } from "@/lib/demo-data";

export function LoyaltyCard() {
  return (
    <div className="overflow-hidden rounded-2xl bg-[linear-gradient(135deg,#3d342c_0%,#5c6b4d_100%)] p-6 text-white shadow-soft">
      <p className="text-xs uppercase tracking-[0.25em] text-white/70">Digital loyalty wallet</p>
      <h3 className="mt-2 text-2xl font-semibold">{loyalty.memberName}</h3>
      <p className="mt-1 text-sm text-white/75">{loyalty.tier}</p>
      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="rounded-2xl bg-white/10 p-4">
          <p className="text-xs text-white/70">Points</p>
          <p className="mt-1 text-2xl font-semibold">{loyalty.points}</p>
        </div>
        <div className="rounded-2xl bg-white/10 p-4">
          <p className="text-xs text-white/70">Member no.</p>
          <p className="mt-1 text-sm font-medium">{loyalty.memberNumber}</p>
        </div>
      </div>
      <div className="mt-5 rounded-2xl bg-white px-3 py-3 text-center text-[10px] tracking-[0.35em] text-bark">
        || ||| ||| || |||| |||
      </div>
      <p className="mt-3 text-sm text-white/80">{loyalty.nextReward}</p>
    </div>
  );
}
