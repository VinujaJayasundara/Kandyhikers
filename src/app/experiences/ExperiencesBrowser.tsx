"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { categories, type Category, type Difficulty } from "@/data/catalog";
import type { TripCardData } from "@/data/trips";
import { TripCard } from "@/components/ui";

const difficulties: Difficulty[] = ["Easy", "Moderate", "Moderate to Challenging", "Challenging"];
type Sort = "featured" | "price-asc" | "price-desc";

/** `trips` are card-sized summaries from the server (see toCard), not full trip data. */
export function ExperiencesBrowser({ trips, destinations }: { trips: TripCardData[]; destinations: string[] }) {
  const router = useRouter();
  const params = useSearchParams();
  const typeParam = params.get("type") as Category | null;
  const type: Category | "all" = typeParam && typeParam in categories ? typeParam : "all";

  const [destination, setDestination] = useState("all");
  const [difficulty, setDifficulty] = useState<Difficulty | "all">("all");
  const [sort, setSort] = useState<Sort>("featured");

  const setType = (t: Category | "all") => {
    router.replace(t === "all" ? "/experiences" : `/experiences?type=${t}`, { scroll: false });
  };

  const results = useMemo(() => {
    const list = trips.filter(
      (t) =>
        (type === "all" || t.category === type) &&
        (destination === "all" || t.destination === destination) &&
        (difficulty === "all" || t.difficulty === difficulty),
    );
    if (sort === "featured") return [...list].sort((a, b) => Number(!!b.featured) - Number(!!a.featured));
    // Trips without a price go last.
    const p = (x: number | null) => x ?? (sort === "price-asc" ? Infinity : -Infinity);
    return [...list].sort((a, b) =>
      sort === "price-asc" ? p(a.priceFrom) - p(b.priceFrom) : p(b.priceFrom) - p(a.priceFrom),
    );
  }, [trips, type, destination, difficulty, sort]);

  const select = "w-full rounded-full border border-line bg-card py-2.5 pl-3.5 pr-2 text-sm sm:w-auto sm:px-4 sm:py-2";

  return (
    <div className="min-w-0">
      {/* One swipeable row on phones, wraps on larger screens */}
      <div className="relative -mx-3 flex gap-2 overflow-x-auto px-3 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 [&::-webkit-scrollbar]:hidden">
        {(["all", ...Object.keys(categories)] as (Category | "all")[]).map((k) => (
          <button
            key={k}
            onClick={() => setType(k)}
            aria-pressed={type === k}
            className={`shrink-0 whitespace-nowrap rounded-full px-5 py-2.5 text-xs font-semibold uppercase tracking-widest transition-colors sm:py-2 ${
              type === k ? "bg-ink text-white" : "bg-card text-muted hover:text-ink"
            }`}
          >
            {k === "all" ? "All" : categories[k].label}
          </button>
        ))}
      </div>

      <div className="relative mt-3 grid grid-cols-2 gap-2 sm:mt-4 sm:flex sm:flex-wrap sm:items-center sm:gap-3">
        <label className="sr-only" htmlFor="f-dest">Destination</label>
        <select id="f-dest" className={select} value={destination} onChange={(e) => setDestination(e.target.value)}>
          <option value="all">All destinations</option>
          {destinations.map((d) => (
            <option key={d}>{d}</option>
          ))}
        </select>
        <label className="sr-only" htmlFor="f-diff">Difficulty</label>
        <select
          id="f-diff"
          className={select}
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value as Difficulty | "all")}
        >
          <option value="all">Any difficulty</option>
          {difficulties.map((d) => (
            <option key={d}>{d}</option>
          ))}
        </select>
        <label className="sr-only" htmlFor="f-sort">Sort</label>
        <select id="f-sort" className={`${select} col-span-2 sm:ml-auto`} value={sort} onChange={(e) => setSort(e.target.value as Sort)}>
          <option value="featured">Sort: Popular</option>
          <option value="price-asc">Price: low to high</option>
          <option value="price-desc">Price: high to low</option>
        </select>
      </div>

      <p className="mt-6 text-sm text-muted" aria-live="polite">
        {results.length} {results.length === 1 ? "experience" : "experiences"}
      </p>

      {results.length > 0 ? (
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((t) => (
            <TripCard key={t.slug} trip={t} />
          ))}
        </div>
      ) : (
        <div className="mt-4 rounded-[var(--radius-panel)] bg-card p-12 text-center text-muted">
          No experiences match those filters.
          <button
            className="ml-2 font-semibold text-moss underline"
            onClick={() => {
              setDestination("all");
              setDifficulty("all");
              setType("all");
            }}
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
