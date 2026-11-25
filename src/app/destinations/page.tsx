import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { IMG, tripsFor } from "@/data/trips";
import { places, regions, seasons, type Region } from "@/data/destinations";
import { ButtonLink, PageHero, Tag } from "@/components/ui";
import { DestinationMap } from "./DestinationMap";

export const metadata: Metadata = {
  title: "Destinations",
  description: "Where we guide in Sri Lanka: Kandy, the Knuckles, Ella, Sigiriya, Yala, Galle and the coasts.",
};

const months = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const seasonStyle = ["bg-paper", "bg-moss-light/60", "bg-moss"];
const seasonLabel = ["Wetter / off-season", "Good", "Best"];

const placeTrips = Object.fromEntries(
  places.map((p) => [p.slug, tripsFor(p).map((t) => ({ slug: t.slug, title: t.title, duration: t.duration, difficulty: t.difficulty }))]),
);

export default function DestinationsPage() {
  return (
    <>
      <PageHero image={IMG.pekoeTrail} eyebrow="Destinations" title="Where we'll take you">
        <p className="mt-4 max-w-xl text-white/85">
          Every trip starts from Kandy, in the middle of the island. From here it&apos;s an hour to the cloud forest
          and a morning&apos;s drive to the coast.
        </p>
      </PageHero>

      {/* Interactive map */}
      <section className="mx-auto max-w-[1400px] px-3 py-3">
        <DestinationMap placeTrips={placeTrips} />
      </section>

      {/* By region */}
      {(Object.keys(regions) as Region[]).map((r) => {
        const inRegion = places.filter((p) => p.region === r);
        return (
          <section key={r} id={r} className="mx-auto max-w-[1400px] scroll-mt-24 px-3 pt-20 sm:px-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <Tag>{inRegion.length} {inRegion.length === 1 ? "place" : "places"}</Tag>
                <h2 className="display mt-4 text-4xl text-moss-dark sm:text-5xl">{regions[r].label}</h2>
              </div>
              <p className="max-w-sm text-sm text-muted">{regions[r].blurb}</p>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {inRegion.map((p) => {
                const list = tripsFor(p);
                return (
                  <article key={p.slug} id={p.slug} className="flex scroll-mt-24 flex-col overflow-hidden rounded-[var(--radius-panel)] bg-card">
                    <div className="relative aspect-[16/10]">
                      <Image src={p.image} alt={p.name} fill sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" className="object-cover" />
                      {p.base && (
                        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-ink">Our base</span>
                      )}
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <h3 className="font-display text-xl font-extrabold uppercase">{p.name}</h3>
                      <p className="mt-2 text-sm text-muted">{p.blurb}</p>
                      <p className="mt-4 text-xs text-muted">
                        {p.fromKandy} · Best {p.bestTime}
                      </p>
                      <ul className="mt-auto flex flex-wrap gap-2 pt-5">
                        {list.map((t) => (
                          <li key={t.slug}>
                            <Link
                              href={`/experiences/${t.slug}`}
                              className="inline-block rounded-full bg-paper px-3 py-1.5 text-xs font-semibold transition-colors hover:bg-moss hover:text-white"
                            >
                              {t.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        );
      })}

      {/* When to go */}
      <section className="mx-auto max-w-[1400px] px-3 py-20 sm:px-6">
        <div id="when-to-go" className="scroll-mt-24 rounded-[var(--radius-panel)] bg-card p-6 sm:p-10">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <Tag>When to go</Tag>
              <h2 className="display mt-4 text-3xl text-moss-dark sm:text-4xl">Two monsoons, one island</h2>
              <p className="mt-3 max-w-xl text-sm text-muted">
                When it rains in the south-west, the east coast is usually dry, and the other way round. There&apos;s
                always somewhere good to go.
              </p>
            </div>
            <ul className="flex flex-wrap gap-4 text-xs text-muted">
              {seasonLabel.map((l, i) => (
                <li key={l} className="flex items-center gap-2">
                  <span className={`h-3 w-3 rounded-sm ${seasonStyle[i]} ${i === 0 ? "border border-line" : ""}`} /> {l}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 overflow-x-auto">
            <table className="w-full min-w-[560px] border-separate border-spacing-1 text-sm">
              <thead>
                <tr>
                  <th className="w-44 text-left font-normal text-muted"><span className="sr-only">Area</span></th>
                  {months.map((m, i) => (
                    <th key={i} scope="col" className="text-center text-xs font-semibold text-muted">
                      <abbr title={monthNames[i]} className="no-underline">{m}</abbr>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {seasons.map((s) => (
                  <tr key={s.area}>
                    <th scope="row" className="pr-3 text-left text-sm font-semibold">{s.area}</th>
                    {s.months.map((v, i) => (
                      <td key={i} className={`h-9 rounded-md ${seasonStyle[v]}`} title={`${monthNames[i]}: ${seasonLabel[v]}`}>
                        <span className="sr-only">{seasonLabel[v]}</span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-xs text-muted">General guide only. Weather varies year to year, so ask us before you book.</p>
        </div>

        <div className="mt-3 flex flex-col items-start justify-between gap-6 rounded-[var(--radius-panel)] bg-moss p-8 text-white sm:flex-row sm:items-center sm:p-10">
          <div>
            <h2 className="display text-3xl">Not sure where to go?</h2>
            <p className="mt-2 max-w-lg text-sm text-white/80">
              Tell us your dates and what you enjoy, and we&apos;ll suggest a route that fits the season.
            </p>
          </div>
          <ButtonLink href="/contact" variant="light">Ask a local guide</ButtonLink>
        </div>
      </section>
    </>
  );
}
