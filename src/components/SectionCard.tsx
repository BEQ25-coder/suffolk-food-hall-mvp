import type { ReactNode } from "react";

export function SectionCard({ title, subtitle, children }: { title: string; subtitle?: string; children: ReactNode }) {
  return (
    <section className="card-surface p-6">
      {subtitle ? <p className="section-kicker">{subtitle}</p> : null}
      <h3 className="mt-1 section-title">{title}</h3>
      <div className="mt-4">{children}</div>
    </section>
  );
}
