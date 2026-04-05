import { AppShell } from "@/components/AppShell";
import { SectionCard } from "@/components/SectionCard";
import { StatusMessage } from "@/components/StatusMessage";

export default function Loading() {
  return (
    <AppShell>
      <SectionCard title="Upcoming events" subtitle="Discover">
        <p className="mb-4 text-sm leading-6 text-bark/70">
          Explore upcoming events at Suffolk Food Hall.
        </p>
        <StatusMessage variant="loading">Loading events...</StatusMessage>
      </SectionCard>
    </AppShell>
  );
}
