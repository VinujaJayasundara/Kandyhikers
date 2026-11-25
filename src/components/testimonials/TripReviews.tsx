import { getTestimonials } from "@/lib/testimonials";
import { Stars } from "./Stars";
import { TestimonialCard } from "./TestimonialCard";
import { TestimonialForm } from "./TestimonialForm";

/** Reviews block for a single trip page: summary, list, and the add-a-review form. */
export async function TripReviews({ trip, title }: { trip: string; title: string }) {
  const list = await getTestimonials(trip);
  const avg = list.length ? list.reduce((s, t) => s + t.rating, 0) / list.length : 0;

  return (
    <section id="reviews" className="mt-20 scroll-mt-24">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <h2 className="display text-3xl text-moss-dark">Traveller reviews</h2>
        {list.length > 0 && (
          <p className="flex items-center gap-2 text-sm text-muted">
            <Stars rating={avg} />
            <span className="font-semibold text-ink">{avg.toFixed(1)}</span> from {list.length}{" "}
            {list.length === 1 ? "review" : "reviews"}
          </p>
        )}
      </div>

      {list.length > 0 ? (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((t) => (
            <TestimonialCard key={t.id} t={t} />
          ))}
        </div>
      ) : (
        <p className="mt-6 rounded-[var(--radius-panel)] bg-card p-8 text-center text-sm text-muted">
          No reviews yet. Done the {title}? Be the first to share how it went.
        </p>
      )}

      <div className="mt-6 rounded-[var(--radius-panel)] bg-card p-6 sm:p-10">
        <h3 className="display text-2xl">Share your experience</h3>
        <p className="mt-2 text-sm text-muted">Your review helps other travellers choose their adventure.</p>
        <div className="mt-6">
          <TestimonialForm trip={trip} />
        </div>
      </div>
    </section>
  );
}
