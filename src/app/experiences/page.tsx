import type { Metadata } from "next";
import { Suspense } from "react";
import { IMG, destinations, toCard, trips } from "@/data/trips";
import { PageHero, TripCard } from "@/components/ui";
import { ExperiencesBrowser } from "./ExperiencesBrowser";
import { RecentReviews } from "@/components/testimonials/RecentReviews";

export const metadata: Metadata = {
  title: "Experiences",
  description: "Guided hikes, cultural tours, wildlife safaris and beach escapes across Sri Lanka.",
};

const cards = trips.map(toCard);

export default function ExperiencesPage() {
  return (
    <>
      <PageHero image={IMG.hikerValley} eyebrow="Experiences" title="Find your Sri Lankan adventure">
        <p className="mt-4 max-w-xl text-white/85">
          Hikes, cultural tours, safaris and coastal escapes, every one led by a certified local guide.
        </p>
      </PageHero>
      <section className="mx-auto max-w-[1400px] px-3 py-12 sm:px-6">
        {/* Filters read ?type= from the URL, so they render on the client. */}
        <Suspense
          fallback={
            <div className="grid gap-4 pt-28 sm:grid-cols-2 lg:grid-cols-3">
              {cards.map((t) => (
                <TripCard key={t.slug} trip={t} />
              ))}
            </div>
          }
        >
          <ExperiencesBrowser trips={cards} destinations={destinations} />
        </Suspense>
      </section>
      <RecentReviews />
    </>
  );
}
