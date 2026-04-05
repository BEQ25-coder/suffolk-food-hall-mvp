import Link from "next/link";

export function HeroBanner() {
  return (
    <section className="card-surface overflow-hidden bg-[radial-gradient(circle_at_top_right,_rgba(223,204,176,0.8),_rgba(255,255,255,0.9)_45%,_rgba(142,155,121,0.16)_100%)] p-6">
      <p className="section-kicker">Today at Suffolk Food Hall</p>
      <h2 className="mt-2 max-w-[15ch] text-3xl font-semibold tracking-tight text-bark">
        A warmer way to plan your next visit.
      </h2>
      <p className="mt-3 max-w-[30ch] text-sm leading-6 text-bark/75">
        Discover events, browse seasonal produce, and plan your visit to Suffolk Food Hall.
      </p>
      <div className="mt-6 flex gap-3">
        <Link href="/events" className="rounded-xl bg-bark px-4 py-2 text-sm font-medium text-white">
          Explore what's on
        </Link>
        <Link href="/loyalty" className="rounded-xl border border-bark/15 bg-white px-4 py-2 text-sm font-medium text-bark">
          View loyalty
        </Link>
      </div>
    </section>
  );
}
