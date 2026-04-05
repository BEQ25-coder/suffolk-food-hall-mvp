import { AdminBookingsList } from "@/components/AdminBookingsList";
import { AppShell } from "@/components/AppShell";
import { SectionCard } from "@/components/SectionCard";
import { StatusMessage } from "@/components/StatusMessage";
import { getSortedBookings } from "@/lib/bookings-store";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  try {
    const bookings = await getSortedBookings();

    return (
      <AppShell>
        <SectionCard title="Admin bookings" subtitle="Manage events and bookings">
          <p className="mb-4 text-sm leading-6 text-bark/70">
            Review booking requests and update their status.
          </p>

          <AdminBookingsList initialBookings={bookings} />
        </SectionCard>
      </AppShell>
    );
  } catch (error) {
    console.error("Failed to load admin bookings:", error);

    return (
      <AppShell>
        <SectionCard title="Admin bookings" subtitle="Manage events and bookings">
          <p className="mb-4 text-sm leading-6 text-bark/70">
            Review booking requests and update their status.
          </p>

          <StatusMessage variant="error">
            We’re unable to load booking requests right now. Please refresh and try again.
          </StatusMessage>
        </SectionCard>
      </AppShell>
    );
  }
}
