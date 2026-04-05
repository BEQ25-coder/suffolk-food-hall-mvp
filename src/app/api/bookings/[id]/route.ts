import { NextResponse } from "next/server";
import { updateBookingStatus } from "@/lib/bookings-store";
import type { BookingStatus, BookingStatusApiResponse } from "@/lib/types";

export const dynamic = "force-dynamic";

const VALID_STATUSES: BookingStatus[] = ["pending", "confirmed", "rejected"];

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    if (!id?.trim()) {
      const response: BookingStatusApiResponse = {
        success: false,
        error: "Invalid booking ID",
      };

      return NextResponse.json(response, { status: 400 });
    }

    const body = (await request.json()) as { status?: string };
    const status = body.status;

    if (!status || !VALID_STATUSES.includes(status as BookingStatus)) {
      const response: BookingStatusApiResponse = {
        success: false,
        error: "Invalid status",
      };

      return NextResponse.json(response, { status: 400 });
    }

    const updatedBooking = await updateBookingStatus(id, status as BookingStatus);

    if (!updatedBooking) {
      const response: BookingStatusApiResponse = {
        success: false,
        error: "Booking not found",
      };

      return NextResponse.json(response, { status: 404 });
    }

    const response: BookingStatusApiResponse = {
      success: true,
      message: "Booking status updated",
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("PATCH /api/bookings/[id] failed:", error);

    const response: BookingStatusApiResponse = {
      success: false,
      error: "Failed to update booking status",
    };

    return NextResponse.json(response, { status: 500 });
  }
}
