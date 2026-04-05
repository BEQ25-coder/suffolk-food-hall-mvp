import { NextResponse } from "next/server";
import { events } from "@/lib/demo-data";
import type { EventsApiResponse } from "@/lib/types";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const response: EventsApiResponse = {
      success: true,
      data: events,
      empty: events.length === 0,
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("GET /api/events failed:", error);

    const response: EventsApiResponse = {
      success: false,
      data: [],
      empty: true,
      error: "Failed to fetch events",
    };

    return NextResponse.json(response, { status: 500 });
  }
}
