import { NextResponse } from "next/server";
import { getSortedBookings } from "@/lib/bookings-store";
import type { BookingsApiResponse } from "@/lib/types";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const bookings = await getSortedBookings();

    const response: BookingsApiResponse = {
      success: true,
      data: bookings,
      empty: bookings.length === 0,
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("GET /api/bookings failed:", error);

    const response: BookingsApiResponse = {
      success: false,
      error: "Failed to fetch bookings",
    };

    return NextResponse.json(response, { status: 500 });
  }
}
