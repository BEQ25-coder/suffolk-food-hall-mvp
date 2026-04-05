import { AppShell } from "@/components/AppShell";
import { BookingForm } from "@/components/BookingForm";
import { SectionCard } from "@/components/SectionCard";

export default function BookPage() {
  return (
    <AppShell>
      <SectionCard title="Book dining" subtitle="Booking request">
        <p className="mb-4 text-sm leading-6 text-bark/70">
          Submit a booking request for dining at Suffolk Food Hall.
        </p>
        <BookingForm />
      </SectionCard>
    </AppShell>
  );
}
