"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { categories, type Category } from "@/data/catalog";
import type { TripCardData } from "@/data/trips";

const keys = Object.keys(categories) as Category[];

/** `groups`: up to 4 trips per category, prepared on the server so full trip data stays off the client. */
export function CategoryExplorer({ groups }: { groups: Record<Category, TripCardData[]> }) {
  const [active, setActive] = useState<Category>("hiking");
  const cat = categories[active];
  const list = groups[active];

  return (
    <div>
      <div role="tablist" aria-label="Experience types" className="flex flex-wrap justify-center gap-2">
        {keys.map((k) => (
          <button
            key={k}
            role="tab"
            aria-selected={active === k}
            onClick={() => setActive(k)}
            className={`rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-widest transition-colors ${
              active === k ? "bg-ink text-white" : "bg-card text-muted hover:text-ink"
            }`}
          >
            {categories[k].label}
          </button>
        ))}
      </div>

      <div role="tabpanel" className="mt-10 grid gap-4 lg:grid-cols-[1.1fr_1fr]">
        <div className="relative min-h-[360px] overflow-hidden rounded-[var(--radius-panel)] bg-ink text-white">
          <Image key={cat.image} src={cat.image} alt={cat.label} fill sizes="(min-width:1024px) 55vw, 100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute bottom-0 p-8">
            <h3 className="display text-4xl">{cat.label}</h3>
            <p className="mt-3 max-w-md text-sm text-white/85">{cat.blurb}</p>
          </div>
        </div>
        <ul className="flex flex-col gap-2">
          {list.map((t) => (
            <li key={t.slug}>
              <Link
                href={`/experiences/${t.slug}`}
                className="group flex items-center gap-4 rounded-2xl bg-card p-3 transition-colors hover:bg-white"
              >
                <div className="relative h-20 w-24 shrink-0 overflow-hidden rounded-xl">
                  <Image src={t.images[0]} alt="" fill sizes="96px" className="object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-display text-sm font-bold uppercase">{t.title}</p>
                  <p className="mt-1 text-xs text-muted">
                    {t.destination} · {t.duration} · {t.difficulty}
                  </p>
                </div>
                <ArrowUpRight className="mr-2 h-5 w-5 shrink-0 text-muted transition-colors group-hover:text-moss" />
              </Link>
            </li>
          ))}
          <li className="mt-auto pt-2">
            <Link
              href={`/experiences?type=${active}`}
              className="inline-flex items-center gap-2 text-sm font-semibold text-moss hover:underline"
            >
              See all {cat.label.toLowerCase()} <ArrowUpRight className="h-4 w-4" />
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
