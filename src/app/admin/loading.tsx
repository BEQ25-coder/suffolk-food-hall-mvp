import { AppShell } from "@/components/AppShell";
import { SectionCard } from "@/components/SectionCard";
import { StatusMessage } from "@/components/StatusMessage";

export default function Loading() {
  return (
    <AppShell>
      <SectionCard title="Admin bookings" subtitle="Manage events and bookings">
        <p className="mb-4 text-sm leading-6 text-bark/70">
          Review booking requests and update their status.
        </p>
        <StatusMessage variant="loading">Loading booking requests...</StatusMessage>
      </SectionCard>
    </AppShell>
  );
}
