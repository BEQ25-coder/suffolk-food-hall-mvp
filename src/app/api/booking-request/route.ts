import { NextResponse } from "next/server";
import { insertBooking } from "@/lib/bookings-store";
import { validateBookingRequest } from "@/lib/booking-validation";
import type { BookingRequestApiResponse, BookingRequestInput } from "@/lib/types";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<BookingRequestInput>;

    const payload: BookingRequestInput = {
      serviceId: body.serviceId ?? "",
      partySize: body.partySize ?? "",
      preferredTime: body.preferredTime ?? "",
      customerName: body.customerName ?? "",
      customerEmail: body.customerEmail ?? "",
      customerPhone: body.customerPhone ?? "",
      notes: body.notes ?? "",
    };

    const validation = validateBookingRequest(payload);

    if (!validation.isValid) {
      const response: BookingRequestApiResponse = {
        success: false,
        error: "Please check your details and try again.",
        fieldErrors: validation.errors,
      };

      return NextResponse.json(response, { status: 400 });
    }

    const booking = await insertBooking(payload);

    const response: BookingRequestApiResponse = {
      success: true,
      message: "Your booking request has been received.",
      data: {
        id: booking.id,
        status: booking.status,
        createdAt: booking.createdAt,
      },
    };

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.error("POST /api/booking-request failed:", error);

    const response: BookingRequestApiResponse = {
      success: false,
      error: "We couldn’t submit your booking request. Please check your details and try again.",
    };

    return NextResponse.json(response, { status: 500 });
  }
}
