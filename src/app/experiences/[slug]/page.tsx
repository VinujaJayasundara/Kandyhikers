import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, Clock, MapPin, Mountain, Users, X, MessageCircle, ChevronLeft } from "lucide-react";
import { categories, formatPrice, getTrip, trips } from "@/data/trips";
import { whatsappLink } from "@/data/site";
import { Gallery } from "@/components/Gallery";
import { Tag, TripCard } from "@/components/ui";
import { TripReviews } from "@/components/testimonials/TripReviews";

export function generateStaticParams() {
  return trips.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: PageProps<"/experiences/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const trip = getTrip(slug);
  if (!trip) return {};
  return { title: trip.title, description: trip.summary, openGraph: { images: [trip.images[0]] } };
}

export default async function TripPage({ params }: PageProps<"/experiences/[slug]">) {
  const { slug } = await params;
  const trip = getTrip(slug);
  if (!trip) notFound();

  const related = trips.filter((t) => t.category === trip.category && t.slug !== trip.slug).slice(0, 3);
  const facts = [
    { icon: Clock, label: "Duration", value: trip.duration },
    { icon: Mountain, label: "Difficulty", value: trip.difficulty },
    { icon: Users, label: "Group size", value: trip.groupSize },
    { icon: MapPin, label: "Destination", value: trip.destination },
  ];

  return (
    <article className="mx-auto max-w-[1400px] px-3 pb-20 pt-24 sm:px-6">
      <Link href="/experiences" className="inline-flex items-center gap-1 text-sm text-muted hover:text-ink">
        <ChevronLeft className="h-4 w-4" /> All experiences
      </Link>

      <header className="mt-4 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <Tag>{categories[trip.category].label}</Tag>
          <h1 className="display mt-4 max-w-4xl text-4xl text-moss-dark sm:text-6xl">{trip.title}</h1>
        </div>
      </header>

      <div className="mt-8">
        <Gallery images={trip.images} title={trip.title} />
      </div>

      <dl className="mt-3 grid grid-cols-2 gap-px overflow-hidden rounded-[var(--radius-panel)] bg-line md:grid-cols-4">
        {facts.map(({ icon: Icon, label, value }) => (
          <div key={label} className="flex items-center gap-3 bg-card p-5">
            <Icon className="h-5 w-5 shrink-0 text-moss" />
            <div>
              <dt className="text-xs text-muted">{label}</dt>
              <dd className="text-sm font-semibold">{value}</dd>
            </div>
          </div>
        ))}
      </dl>

      <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_380px]">
        <div className="space-y-14">
          <section>
            <h2 className="display text-2xl">Overview</h2>
            <p className="mt-4 max-w-2xl leading-relaxed text-muted">{trip.overview}</p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {trip.highlights.map((h) => (
                <li key={h} className="rounded-full bg-card px-4 py-2 text-sm">{h}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="display text-2xl">Itinerary</h2>
            <ol className="mt-6 space-y-0">
              {trip.itinerary.map((step, i) => (
                <li key={step.title} className="relative flex gap-5 pb-8 last:pb-0">
                  {i < trip.itinerary.length - 1 && <span className="absolute left-[15px] top-8 h-full w-px bg-line" aria-hidden />}
                  <span className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-moss text-xs font-bold text-white">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-display font-bold uppercase">{step.title}</h3>
                    <p className="mt-1 text-sm text-muted">{step.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-[var(--radius-panel)] bg-card p-6">
              <h2 className="font-display font-bold uppercase">Included</h2>
              <ul className="mt-4 space-y-2 text-sm">
                {trip.included.map((x) => (
                  <li key={x} className="flex gap-2"><Check className="h-4 w-4 shrink-0 text-moss" />{x}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-[var(--radius-panel)] bg-card p-6">
              <h2 className="font-display font-bold uppercase">Not included</h2>
              <ul className="mt-4 space-y-2 text-sm text-muted">
                {trip.excluded.map((x) => (
                  <li key={x} className="flex gap-2"><X className="h-4 w-4 shrink-0" />{x}</li>
                ))}
              </ul>
            </div>
          </section>

          <section>
            <h2 className="display text-2xl">What to bring</h2>
            <ul className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
              {trip.bring.map((x) => (
                <li key={x} className="flex gap-2"><Check className="h-4 w-4 shrink-0 text-moss" />{x}</li>
              ))}
            </ul>
          </section>
        </div>

        {/* Sticky enquiry box */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-[var(--radius-panel)] bg-card p-6 shadow-sm">
            {trip.priceFrom !== null && <p className="text-xs text-muted">From</p>}
            <p className="display text-3xl">{formatPrice(trip)}</p>
            {trip.priceNote && <p className="text-sm text-muted">{trip.priceNote}</p>}
            {trip.groupDiscount && (
              <p className="mt-4 rounded-xl bg-sand/50 px-4 py-3 text-sm">{trip.groupDiscount}</p>
            )}
            <a
              href={whatsappLink(`Hi! I'm interested in the ${trip.title}. Could you share availability?`)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 flex items-center justify-center gap-2 rounded-full bg-moss py-3.5 text-sm font-semibold text-white transition-colors hover:bg-moss-dark"
            >
              <MessageCircle className="h-4 w-4" /> Enquire on WhatsApp
            </a>
            <Link
              href={`/contact?trip=${trip.slug}`}
              className="mt-2 block rounded-full border border-ink py-3.5 text-center text-sm font-semibold transition-colors hover:bg-ink hover:text-white"
            >
              Send an enquiry
            </Link>
            <p className="mt-4 text-center text-xs text-muted">No payment needed to enquire.</p>
          </div>
        </aside>
      </div>

      <TripReviews trip={trip.slug} title={trip.title} />

      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="display text-3xl text-moss-dark">You might also like</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((t) => (
              <TripCard key={t.slug} trip={t} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
