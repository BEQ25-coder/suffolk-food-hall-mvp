import { AppShell } from "@/components/AppShell";
import { SectionCard } from "@/components/SectionCard";
import { StatusMessage } from "@/components/StatusMessage";

export default function Loading() {
  return (
    <AppShell>
      <SectionCard title="Shop highlights" subtitle="Browse">
        <p className="mb-4 text-sm leading-6 text-bark/70">
          Browse a selection of seasonal products available at Suffolk Food Hall.
        </p>
        <StatusMessage variant="loading">Loading products...</StatusMessage>
      </SectionCard>
    </AppShell>
  );
}
