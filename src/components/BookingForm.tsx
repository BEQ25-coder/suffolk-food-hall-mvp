"use client";

import { useMemo, useState, type FormEvent } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { StatusMessage } from "@/components/StatusMessage";
import { services } from "@/lib/demo-data";
import type {
  BookingRequestApiResponse,
  BookingRequestFieldErrors,
  BookingRequestInput,
} from "@/lib/types";

type SubmissionState = "idle" | "submitting" | "success" | "error";

const INITIAL_FORM: BookingRequestInput = {
  serviceId: services[0].id,
  partySize: "2",
  preferredTime: services[0].times[0],
  customerName: "",
  customerEmail: "",
  customerPhone: "",
  notes: "",
};

function FieldError({ message }: { message?: string }) {
  if (!message) {
    return null;
  }

  return <p className="mt-2 text-xs text-red-700">{message}</p>;
}

export function BookingForm() {
  const [form, setForm] = useState<BookingRequestInput>(INITIAL_FORM);
  const [fieldErrors, setFieldErrors] = useState<BookingRequestFieldErrors>({});
  const [submissionState, setSubmissionState] = useState<SubmissionState>("idle");
  const [submissionMessage, setSubmissionMessage] = useState("");
  const [createdAt, setCreatedAt] = useState<string | null>(null);

  const selectedService = useMemo(
    () => services.find((service) => service.id === form.serviceId) ?? services[0],
    [form.serviceId]
  );
  const isSubmitting = submissionState === "submitting";

  function getFieldClassName(hasError: boolean) {
    return `w-full rounded-2xl border bg-white px-4 py-3 text-sm outline-none transition ${hasError ? "border-red-300 ring-1 ring-red-200" : "border-bark/10"} ${isSubmitting ? "cursor-not-allowed opacity-70" : ""}`;
  }

  function updateForm<K extends keyof BookingRequestInput>(
    key: K,
    value: BookingRequestInput[K]
  ) {
    setForm((current) => ({ ...current, [key]: value }));
    setFieldErrors((current) => ({ ...current, [key]: undefined }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmissionState("submitting");
    setSubmissionMessage("");
    setCreatedAt(null);
    setFieldErrors({});

    try {
      const response = await fetch("/api/booking-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const result = (await response.json()) as BookingRequestApiResponse;

      if (!response.ok || !result.success) {
        setSubmissionState("error");

        if (!result.success && result.fieldErrors) {
          setFieldErrors(result.fieldErrors);
        }

        setSubmissionMessage(
          result.success ? "We couldn’t submit your booking request. Please check your details and try again." : result.error
        );
        return;
      }

      setSubmissionState("success");
      setSubmissionMessage(result.message);
      setCreatedAt(result.data.createdAt);
      setForm((current) => ({
        ...INITIAL_FORM,
        serviceId: current.serviceId,
        preferredTime:
          services.find((service) => service.id === current.serviceId)?.times[0] ??
          INITIAL_FORM.preferredTime,
      }));
    } catch {
      setSubmissionState("error");
      setSubmissionMessage("We couldn’t submit your booking request. Please check your details and try again.");
    }
  }


  return (
    <form className="space-y-6" onSubmit={handleSubmit} noValidate>
      <div className="grid gap-3">
        {services.map((service) => {
          const active = service.id === form.serviceId;
          return (
            <button
              key={service.id}
              type="button"
              onClick={() => {
                updateForm("serviceId", service.id);
                updateForm("preferredTime", service.times[0]);
              }}
              disabled={isSubmitting}
              className={`rounded-2xl border border-[#eee] p-4 text-left transition shadow-sm disabled:cursor-not-allowed disabled:opacity-70 ${
                active ? "border-moss bg-[#f4f8f0]" : "border-bark/10 bg-white"
              }`}
            >
              <p className="text-base font-semibold text-bark">{service.title}</p>
              <p className="mt-2 text-sm leading-6 text-bark/70">{service.description}</p>
            </button>
          );
        })}
        <FieldError message={fieldErrors.serviceId} />
      </div>

      <div className="card-surface p-4">
        <label className="mb-2 block text-sm font-medium text-bark">Party size</label>
        <select
          value={form.partySize}
          onChange={(event) => updateForm("partySize", event.target.value)}
          className={getFieldClassName(Boolean(fieldErrors.partySize))}
          disabled={isSubmitting}
        >
          {[1, 2, 3, 4, 5, 6, 8].map((size) => (
            <option key={size} value={size}>{size} guests</option>
          ))}
        </select>
        <FieldError message={fieldErrors.partySize} />

        <label className="mb-2 mt-4 block text-sm font-medium text-bark">Preferred time</label>
        <select
          value={form.preferredTime}
          onChange={(event) => updateForm("preferredTime", event.target.value)}
          className={getFieldClassName(Boolean(fieldErrors.preferredTime))}
          disabled={isSubmitting}
        >
          {selectedService.times.map((slot) => (
            <option key={slot} value={slot}>{slot}</option>
          ))}
        </select>
        <FieldError message={fieldErrors.preferredTime} />

        <label className="mb-2 mt-4 block text-sm font-medium text-bark">Your name</label>
        <input
          type="text"
          value={form.customerName}
          onChange={(event) => updateForm("customerName", event.target.value)}
          placeholder="Jane Smith"
          className={getFieldClassName(Boolean(fieldErrors.customerName))}
          disabled={isSubmitting}
        />
        <FieldError message={fieldErrors.customerName} />

        <label className="mb-2 mt-4 block text-sm font-medium text-bark">Email address</label>
        <input
          type="email"
          value={form.customerEmail}
          onChange={(event) => updateForm("customerEmail", event.target.value)}
          placeholder="jane@example.com"
          className={getFieldClassName(Boolean(fieldErrors.customerEmail))}
          disabled={isSubmitting}
        />
        <FieldError message={fieldErrors.customerEmail} />

        <label className="mb-2 mt-4 block text-sm font-medium text-bark">Phone number</label>
        <input
          type="tel"
          value={form.customerPhone}
          onChange={(event) => updateForm("customerPhone", event.target.value)}
          placeholder="07700 900123"
          className={getFieldClassName(Boolean(fieldErrors.customerPhone))}
          disabled={isSubmitting}
        />
        <FieldError message={fieldErrors.customerPhone} />

        <label className="mb-2 mt-4 block text-sm font-medium text-bark">Dietary or allergen notes</label>
        <textarea
          value={form.notes}
          onChange={(event) => updateForm("notes", event.target.value)}
          placeholder="Add anything helpful for the team, such as nut allergies or celebration notes."
          className={`min-h-28 ${getFieldClassName(Boolean(fieldErrors.notes))}`}
          disabled={isSubmitting}
        />
        <FieldError message={fieldErrors.notes} />
      </div>

      <div className="card-surface p-4">
        <p className="section-kicker">Booking summary</p>
        <h3 className="mt-1 section-title">Request booking</h3>
        <ul className="mt-4 space-y-2 text-sm text-bark/75">
          <li><strong>Service:</strong> {selectedService.title}</li>
          <li><strong>Party size:</strong> {form.partySize} guests</li>
          <li><strong>Preferred time:</strong> {form.preferredTime}</li>
          <li><strong>Name:</strong> {form.customerName || "Not added yet"}</li>
          <li><strong>Email:</strong> {form.customerEmail || "Not added yet"}</li>
          <li><strong>Phone:</strong> {form.customerPhone || "Not added yet"}</li>
          <li><strong>Notes:</strong> {form.notes || "No notes added"}</li>
        </ul>

        <button
          type="submit"
          disabled={isSubmitting}
          aria-busy={isSubmitting}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-bark px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? "Submitting request..." : "Continue to booking"}
          <ArrowRight className="h-4 w-4" />
        </button>

        {submissionState === "success" ? (
          <div className="mt-4 rounded-2xl border border-moss/20 bg-[#f4f8f0] p-4 text-sm text-bark shadow-sm">
            <div className="flex items-center gap-2 font-medium text-moss">
              <CheckCircle2 className="h-4 w-4" />
              Booking request received
            </div>
            <p className="mt-2 leading-6 text-bark/75">
              {submissionMessage || "Your booking request has been received. Our team will be in touch shortly to confirm your reservation."}
            </p>
            {createdAt ? (
              <p className="mt-2 text-xs text-bark/60">
                Submitted: {new Date(createdAt).toLocaleString("en-GB")}
              </p>
            ) : null}
          </div>
        ) : null}

        {submissionState === "error" ? (
          <StatusMessage variant="error" className="mt-4">
            {submissionMessage}
          </StatusMessage>
        ) : null}
      </div>
    </form>
  );
}
