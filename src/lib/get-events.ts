import type { EventsApiResponse } from "@/lib/types";

export async function getEvents() {
  try {
    const res = await fetch("/api/events", {
      method: "GET",
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("GET /api/events returned non-OK status", res.status);
      throw new Error(`Request failed with status ${res.status}`);
    }

    const json: EventsApiResponse = await res.json();

    if (!json.success) {
      console.error("GET /api/events returned unsuccessful payload", json.error);
      throw new Error(json.error || "API returned unsuccessful response");
    }

    const data = Array.isArray(json.data) ? json.data : [];

    return {
      ok: true as const,
      data,
      empty: data.length === 0,
    };
  } catch (error) {
    console.error("Failed to load events:", error);

    return {
      ok: false as const,
      data: [],
      empty: false,
    };
  }
}
