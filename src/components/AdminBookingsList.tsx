"use client";

import { useState } from "react";
import { StatusMessage } from "@/components/StatusMessage";
import { formatDateTime } from "@/lib/formatters";
import { cn } from "@/lib/utils";
import type { BookingRecord, BookingStatus, BookingStatusApiResponse } from "@/lib/types";

const STATUSES: BookingStatus[] = ["pending", "confirmed", "rejected"];

function getStatusBadgeClasses(status: BookingStatus) {
  switch (status) {
    case "confirmed":
      return "border-green-200 bg-green-50 text-green-800";
    case "rejected":
      return "border-red-200 bg-red-50 text-red-700";
    case "pending":
    default:
      return "border-stone-200 bg-stone-50 text-stone-700";
  }
}

function getStatusButtonClasses(status: BookingStatus, isActive: boolean) {
  const base = "rounded-xl border px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] transition disabled:cursor-not-allowed disabled:opacity-50";

  if (isActive) {
    switch (status) {
      case "confirmed":
        return `${base} border-green-300 bg-green-100 text-green-800`;
      case "rejected":
        return `${base} border-red-300 bg-red-100 text-red-700`;
      case "pending":
      default:
        return `${base} border-stone-300 bg-stone-100 text-stone-700`;
    }
  }

  switch (status) {
    case "confirmed":
      return `${base} border-green-200 text-green-800 hover:bg-green-50`;
    case "rejected":
      return `${base} border-red-200 text-red-700 hover:bg-red-50`;
    case "pending":
    default:
      return `${base} border-stone-200 text-stone-700 hover:bg-stone-50`;
  }
}

type AdminBookingsListProps = {
  initialBookings: BookingRecord[];
};

export function AdminBookingsList({
  initialBookings,
}: AdminBookingsListProps) {
  const [bookings, setBookings] = useState(initialBookings);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [errorById, setErrorById] = useState<Record<string, string>>({});
  const [successById, setSuccessById] = useState<Record<string, string>>({});

  async function handleStatusChange(id: string, status: BookingStatus) {
    setUpdatingId(id);
    setErrorById((current) => ({ ...current, [id]: "" }));
    setSuccessById((current) => ({ ...current, [id]: "" }));

    try {
      const response = await fetch(`/api/bookings/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      const result = (await response.json()) as BookingStatusApiResponse;

      if (!response.ok || !result.success) {
        const message = result.success ? "Failed to update status" : result.error;
        throw new Error(message || "Failed to update status");
      }

      setBookings((current) =>
        current.map((booking) =>
          booking.id === id
            ? { ...booking, status, updatedAt: new Date().toISOString() }
            : booking
        )
      );
      setSuccessById((current) => ({
        ...current,
        [id]: `Status updated to ${status}.`,
      }));
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to update status";
      setErrorById((current) => ({ ...current, [id]: message }));
    } finally {
      setUpdatingId(null);
    }
  }

  if (bookings.length === 0) {
    return <StatusMessage variant="empty">No booking requests yet.</StatusMessage>;
  }

  return (
    <div className="space-y-6">
      {bookings.map((booking) => {
        const isUpdating = updatingId === booking.id;

        return (
          <article
            key={booking.id}
            className="rounded-2xl border border-[#eee] bg-[#fffdf8] p-4 shadow-sm"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-base font-medium text-bark">
                  {booking.customerName}
                </p>
                <p className="mt-1 text-sm text-bark/65">
                  {booking.serviceTitle}
                </p>
              </div>

              <span
                className={cn(
                  "rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em]",
                  getStatusBadgeClasses(booking.status)
                )}
              >
                {booking.status}
              </span>
            </div>

            <dl className="mt-4 space-y-3 text-sm text-bark/75">
              <div className="grid grid-cols-[110px_1fr] gap-3">
                <dt className="font-semibold text-bark">Party size</dt>
                <dd>{booking.partySize}</dd>
              </div>
              <div className="grid grid-cols-[110px_1fr] gap-3">
                <dt className="font-semibold text-bark">Preferred time</dt>
                <dd>{booking.preferredTime}</dd>
              </div>
              <div className="grid grid-cols-[110px_1fr] gap-3">
                <dt className="font-semibold text-bark">Email</dt>
                <dd className="break-all">{booking.customerEmail}</dd>
              </div>
              <div className="grid grid-cols-[110px_1fr] gap-3">
                <dt className="font-semibold text-bark">Phone</dt>
                <dd>{booking.customerPhone}</dd>
              </div>
              <div className="grid grid-cols-[110px_1fr] gap-3">
                <dt className="font-semibold text-bark">Notes</dt>
                <dd>{booking.notes || "No notes provided."}</dd>
              </div>
              <div className="grid grid-cols-[110px_1fr] gap-3">
                <dt className="font-semibold text-bark">Created</dt>
                <dd>{formatDateTime(booking.createdAt)}</dd>
              </div>
            </dl>

            <div className="mt-5 border-t border-[#efe8dc] pt-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-bark/60">
                Update status
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {STATUSES.map((status) => (
                  <button
                    key={status}
                    type="button"
                    onClick={() => handleStatusChange(booking.id, status)}
                    disabled={isUpdating || booking.status === status}
                    className={getStatusButtonClasses(
                      status,
                      booking.status === status
                    )}
                  >
                    {status}
                  </button>
                ))}
              </div>

              {isUpdating ? (
                <p className="mt-3 text-xs text-bark/60">Saving status update...</p>
              ) : null}

              {successById[booking.id] ? (
                <p className="mt-3 text-xs text-green-700">{successById[booking.id]}</p>
              ) : null}

              {errorById[booking.id] ? (
                <p className="mt-3 text-xs text-red-700">{errorById[booking.id]}</p>
              ) : null}
            </div>
          </article>
        );
      })}
    </div>
  );
}
