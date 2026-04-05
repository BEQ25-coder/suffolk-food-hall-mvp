import { randomUUID } from "node:crypto";
import { services } from "@/lib/demo-data";
import { readJsonArrayFile, writeJsonArrayFile } from "@/lib/file-db";
import type { BookingRecord, BookingRequestInput, BookingStatus } from "@/lib/types";

const BOOKINGS_FILE_NAME = "bookings.json";

export async function readBookings(): Promise<BookingRecord[]> {
  return readJsonArrayFile<BookingRecord>(BOOKINGS_FILE_NAME);
}

export async function getSortedBookings(): Promise<BookingRecord[]> {
  const bookings = await readBookings();
  return [...bookings].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export async function insertBooking(
  input: BookingRequestInput
): Promise<BookingRecord> {
  const bookings = await readBookings();
  const now = new Date().toISOString();
  const selectedService = services.find((service) => service.id === input.serviceId);

  if (!selectedService) {
    throw new Error("Selected service not found.");
  }

  const booking: BookingRecord = {
    id: randomUUID(),
    serviceId: selectedService.id,
    serviceTitle: selectedService.title,
    partySize: Number.parseInt(input.partySize, 10),
    preferredTime: input.preferredTime.trim(),
    customerName: input.customerName.trim(),
    customerEmail: input.customerEmail.trim().toLowerCase(),
    customerPhone: input.customerPhone.trim(),
    notes: (input.notes ?? "").trim(),
    status: "pending",
    createdAt: now,
    updatedAt: now,
  };

  bookings.push(booking);
  await writeJsonArrayFile(BOOKINGS_FILE_NAME, bookings);

  return booking;
}

export async function updateBookingStatus(
  id: string,
  status: BookingStatus
): Promise<BookingRecord | null> {
  const bookings = await readBookings();
  const bookingIndex = bookings.findIndex((booking) => booking.id === id);

  if (bookingIndex === -1) {
    return null;
  }

  const updatedBooking: BookingRecord = {
    ...bookings[bookingIndex],
    status,
    updatedAt: new Date().toISOString(),
  };

  bookings[bookingIndex] = updatedBooking;
  await writeJsonArrayFile(BOOKINGS_FILE_NAME, bookings);

  return updatedBooking;
}
