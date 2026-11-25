"use server";

import { headers } from "next/headers";
import { updateTag } from "next/cache";
import { trips } from "@/data/trips";
import { REQUIRE_APPROVAL, TESTIMONIALS_TAG, canSaveTestimonials, saveTestimonial } from "@/lib/testimonials";

export type TestimonialFormState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<Record<"name" | "country" | "rating" | "message" | "trip", string>>;
  values?: Record<string, string>;
};

// Simple per-visitor limit: at most 3 submissions per 10 minutes per IP.
// In-memory, so it resets when the server restarts. Good enough against casual spam.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 3;
const recent = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const hits = (recent.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (hits.length >= MAX_PER_WINDOW) return true;
  recent.set(ip, [...hits, now]);
  return false;
}

export async function addTestimonial(_prev: TestimonialFormState, formData: FormData): Promise<TestimonialFormState> {
  const str = (k: string) => String(formData.get(k) ?? "").trim();
  const values = { name: str("name"), country: str("country"), rating: str("rating"), message: str("message"), trip: str("trip") };

  // Honeypot: real people never see or fill this field.
  if (str("website")) return { status: "success", message: "Thank you for your review!" };

  const errors: TestimonialFormState["errors"] = {};
  if (values.name.length < 2 || values.name.length > 60) errors.name = "Please enter your name (2–60 characters).";
  if (values.country.length > 60) errors.country = "Keep this under 60 characters.";
  const rating = Number(values.rating);
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) errors.rating = "Please choose a star rating.";
  if (values.message.length < 20) errors.message = "Please write at least 20 characters.";
  if (values.message.length > 1000) errors.message = "Please keep it under 1,000 characters.";
  if (!trips.some((t) => t.slug === values.trip)) errors.trip = "Please choose the experience you did.";
  if (Object.keys(errors).length) return { status: "error", errors, values };

  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0].trim() || h.get("x-real-ip") || "unknown";
  if (rateLimited(ip)) {
    return { status: "error", message: "You've sent a few reviews already. Please try again later.", values };
  }

  if (!canSaveTestimonials) {
    console.error("Testimonials: no Redis configured on Vercel. Add Upstash for Redis in the Vercel dashboard.");
    return { status: "error", message: "Sorry, reviews can't be submitted right now. Please try again later.", values };
  }

  try {
    await saveTestimonial({
      trip: values.trip,
      name: values.name,
      country: values.country || undefined,
      rating,
      message: values.message,
    });
  } catch (err) {
    console.error("Could not save testimonial", err);
    return { status: "error", message: "Sorry, we couldn't save your review. Please try again later.", values };
  }

  updateTag(TESTIMONIALS_TAG);
  return {
    status: "success",
    message: REQUIRE_APPROVAL
      ? "Thank you! Your review will appear once we've checked it."
      : "Thank you! Your review has been added.",
  };
}
