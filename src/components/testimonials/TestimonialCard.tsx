import Link from "next/link";
import { Quote } from "lucide-react";
import { getTrip } from "@/data/trips";
import type { Testimonial } from "@/lib/testimonials";
import { Stars } from "./Stars";

const fmt = (iso: string) => new Date(iso).toLocaleDateString("en-GB", { month: "long", year: "numeric", timeZone: "UTC" });

export function TestimonialCard({ t, showTrip = false }: { t: Testimonial; showTrip?: boolean }) {
  const trip = showTrip ? getTrip(t.trip) : undefined;
  return (
    <figure className="flex h-full flex-col rounded-[var(--radius-panel)] bg-card p-6">
      <div className="flex items-center justify-between">
        <Stars rating={t.rating} />
        <Quote className="h-6 w-6 text-moss-light" aria-hidden />
      </div>
      <blockquote className="mt-4 flex-1 whitespace-pre-line text-sm leading-relaxed text-ink/85">{t.message}</blockquote>
      <figcaption className="mt-6 border-t border-line pt-4 text-sm">
        <span className="font-semibold">{t.name}</span>
        {t.country && <span className="text-muted"> · {t.country}</span>}
        <span className="block text-xs text-muted">
          <time dateTime={t.createdAt}>{fmt(t.createdAt)}</time>
          {trip && (
            <>
              {" · "}
              <Link href={`/experiences/${trip.slug}#reviews`} className="font-semibold text-moss hover:underline">
                {trip.title}
              </Link>
            </>
          )}
        </span>
      </figcaption>
    </figure>
  );
}
