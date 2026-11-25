import { trips } from "@/data/trips";
import { getTestimonials } from "@/lib/testimonials";
import { Tag } from "@/components/ui";
import { Stars } from "./Stars";
import { TestimonialCard } from "./TestimonialCard";
import { TestimonialForm } from "./TestimonialForm";

/** Reviews across all trips, for the Experiences listing page. */
export async function RecentReviews() {
  const all = await getTestimonials();
  const latest = all.slice(0, 6);
  const avg = all.length ? all.reduce((s, t) => s + t.rating, 0) / all.length : 0;

  return (
    <section id="reviews" className="mx-auto max-w-[1400px] scroll-mt-24 px-3 pb-20 sm:px-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <Tag>Testimonials</Tag>
          <h2 className="display mt-4 text-4xl text-moss-dark sm:text-5xl">What travellers say</h2>
        </div>
        {all.length > 0 && (
          <p className="flex items-center gap-2 text-sm text-muted">
            <Stars rating={avg} />
            <span className="font-semibold text-ink">{avg.toFixed(1)}</span> average from {all.length}{" "}
            {all.length === 1 ? "review" : "reviews"}
          </p>
        )}
      </div>

      {latest.length > 0 ? (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {latest.map((t) => (
            <TestimonialCard key={t.id} t={t} showTrip />
          ))}
        </div>
      ) : (
        <p className="mt-8 rounded-[var(--radius-panel)] bg-card p-8 text-center text-sm text-muted">
          No reviews yet. Travelled with us? We&apos;d love to hear how it went.
        </p>
      )}

      <div className="mt-4 grid gap-8 rounded-[var(--radius-panel)] bg-card p-6 sm:p-10 lg:grid-cols-[1fr_1.6fr]">
        <div>
          <h3 className="display text-3xl">Travelled with us?</h3>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
            Tell other travellers about your hike or tour. Your review appears here and on the experience&apos;s page.
          </p>
        </div>
        <TestimonialForm tripOptions={trips.map((t) => ({ slug: t.slug, title: t.title }))} />
      </div>
    </section>
  );
}
