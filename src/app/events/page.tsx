"use client";

import { useEffect, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { EventCard } from "@/components/EventCard";
import { SectionCard } from "@/components/SectionCard";
import { StatusMessage } from "@/components/StatusMessage";
import { getEvents } from "@/lib/get-events";
import type { EventItem } from "@/lib/types";

export default function EventsPage() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function loadEvents() {
      setIsLoading(true);
      setHasError(false);

      const result = await getEvents();

      if (!isMounted) {
        return;
      }

      if (!result.ok) {
        setEvents([]);
        setHasError(true);
        setIsLoading(false);
        return;
      }

      setEvents(result.data);
      setIsLoading(false);
    }

    loadEvents();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <AppShell>
      <SectionCard title="Upcoming events" subtitle="Discover">
        <p className="mb-4 text-sm leading-6 text-bark/70">
          Explore upcoming events at Suffolk Food Hall.
        </p>

        {isLoading ? (
          <StatusMessage variant="loading">Loading events...</StatusMessage>
        ) : null}

        {!isLoading && hasError ? (
          <StatusMessage variant="error">
            We’re having trouble loading events right now. Please try again shortly.
          </StatusMessage>
        ) : null}

        {!isLoading && !hasError && events.length === 0 ? (
          <StatusMessage variant="empty">
            No upcoming events at the moment. Please check back soon.
          </StatusMessage>
        ) : null}

        {!isLoading && !hasError && events.length > 0 ? (
          <div className="space-y-4">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : null}
      </SectionCard>
    </AppShell>
  );
}
