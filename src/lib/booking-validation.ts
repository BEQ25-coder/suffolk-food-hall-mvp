import { services } from "@/lib/demo-data";
import type { BookingRequestInput } from "@/lib/types";

export type BookingValidationResult = {
  isValid: boolean;
  errors: Partial<Record<keyof BookingRequestInput, string>>;
};

const EMAIL_REGEX = /^[^\s@]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
const PHONE_ALLOWED_REGEX = /^[+()\d\s-]{7,20}$/;
const MIN_PHONE_DIGITS = 10;

export function validateBookingRequest(
  input: BookingRequestInput
): BookingValidationResult {
  const errors: BookingValidationResult["errors"] = {};

  const selectedService = services.find((service) => service.id === input.serviceId);
  const partySize = Number.parseInt(input.partySize, 10);
  const preferredTime = input.preferredTime.trim();
  const customerName = input.customerName.trim();
  const customerEmail = input.customerEmail.trim();
  const customerPhone = input.customerPhone.trim();
  const notes = (input.notes ?? "").trim();

  if (!selectedService) {
    errors.serviceId = "Please select a valid service.";
  }

  if (!Number.isInteger(partySize) || partySize < 1 || partySize > 8) {
    errors.partySize = "Party size must be between 1 and 8 guests.";
  }

  if (!preferredTime) {
    errors.preferredTime = "Please choose a preferred time.";
  } else if (selectedService && !selectedService.times.includes(preferredTime)) {
    errors.preferredTime = "Please choose a valid time for the selected service.";
  }

  if (!customerName || customerName.length < 2) {
    errors.customerName = "Please enter your full name.";
  }

  if (!customerEmail) {
    errors.customerEmail = "Please enter your email address.";
  } else if (
    !EMAIL_REGEX.test(customerEmail) ||
    customerEmail.includes("..") ||
    customerEmail.startsWith(".") ||
    customerEmail.endsWith(".") ||
    customerEmail.includes("@.") ||
    customerEmail.includes(".@")
  ) {
    errors.customerEmail = "Please enter a valid email address.";
  }

  if (!customerPhone) {
    errors.customerPhone = "Please enter your phone number.";
  } else {
    const phoneDigits = customerPhone.replace(/\D/g, "");

    if (
      !PHONE_ALLOWED_REGEX.test(customerPhone) ||
      phoneDigits.length < MIN_PHONE_DIGITS
    ) {
      errors.customerPhone = "Please enter a valid phone number.";
    }
  }

  if (notes.length > 500) {
    errors.notes = "Notes must be 500 characters or fewer.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
