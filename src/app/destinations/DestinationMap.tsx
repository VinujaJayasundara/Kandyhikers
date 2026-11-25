"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight, CalendarDays, Car } from "lucide-react";
import { places, regions, type Region } from "@/data/destinations";
import { SriLankaMap, regionColor } from "./SriLankaMap";

export type PlaceTrip = { slug: string; title: string; duration: string; difficulty: string };

const base = places.find((p) => p.base)!;

/** `placeTrips`: trips per place slug, prepared on the server. */
export function DestinationMap({ placeTrips }: { placeTrips: Record<string, PlaceTrip[]> }) {
  const [active, setActive] = useState(base.slug);
  const [hover, setHover] = useState<string | null>(null);
  const place = places.find((p) => p.slug === active)!;
  const list = placeTrips[place.slug] ?? [];

  return (
    <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
      {/* Map */}
      <div className="overflow-hidden rounded-[var(--radius-panel)] bg-card">
        <div className="bg-[var(--map-sea)]">
          <SriLankaMap active={active} hover={hover} onSelect={setActive} onHover={setHover} />
        </div>

        <div className="p-4 sm:p-6">
          {/* Legend */}
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted" aria-label="Map legend">
            {(Object.keys(regions) as Region[]).map((r) => (
              <li key={r} className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: regionColor[r] }} />
                {regions[r].label}
              </li>
            ))}
            <li className="flex items-center gap-1.5">
              <span className="h-2.5 w-4 rounded-sm" style={{ background: "var(--map-relief-3)" }} /> Highlands
            </li>
          </ul>

          {/* Accessible controls (and handy on small screens) */}
          <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Choose a destination">
            {places.map((p) => (
              <button
                key={p.slug}
                onClick={() => setActive(p.slug)}
                onMouseEnter={() => setHover(p.slug)}
                onMouseLeave={() => setHover(null)}
                aria-pressed={p.slug === active}
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                  p.slug === active ? "bg-ink text-white" : "bg-paper text-muted hover:text-ink"
                }`}
              >
                <span className="h-2 w-2 rounded-full" style={{ background: regionColor[p.region] }} />
                {p.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Details */}
      <div className="flex flex-col overflow-hidden rounded-[var(--radius-panel)] bg-card" aria-live="polite">
        <div className="relative h-64 shrink-0 sm:h-80">
          <Image key={place.image} src={place.image} alt={place.name} fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute bottom-0 p-6 text-white sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-white/75">{regions[place.region].label}</p>
            <h3 className="display mt-1 text-4xl sm:text-5xl">{place.name}</h3>
          </div>
        </div>
        <div className="flex flex-1 flex-col p-6 sm:p-8">
          <p className="text-sm leading-relaxed text-muted">{place.blurb}</p>
          <dl className="mt-6 grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-2xl bg-paper p-4">
              <dt className="flex items-center gap-1.5 text-xs text-muted"><Car className="h-3.5 w-3.5" /> From Kandy</dt>
              <dd className="mt-1 font-semibold">{place.fromKandy}</dd>
            </div>
            <div className="rounded-2xl bg-paper p-4">
              <dt className="flex items-center gap-1.5 text-xs text-muted"><CalendarDays className="h-3.5 w-3.5" /> Best time</dt>
              <dd className="mt-1 font-semibold">{place.bestTime}</dd>
            </div>
          </dl>

          <h4 className="mt-8 text-xs font-semibold uppercase tracking-widest text-muted">
            {list.length} {list.length === 1 ? "experience" : "experiences"} here
          </h4>
          <ul className="mt-3 space-y-2">
            {list.map((t) => (
              <li key={t.slug}>
                <Link
                  href={`/experiences/${t.slug}`}
                  className="group flex items-center justify-between gap-4 rounded-2xl border border-line px-4 py-3 transition-colors hover:border-moss hover:bg-white"
                >
                  <span>
                    <span className="block font-display text-sm font-bold uppercase">{t.title}</span>
                    <span className="text-xs text-muted">{t.duration} · {t.difficulty}</span>
                  </span>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-muted group-hover:text-moss" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
