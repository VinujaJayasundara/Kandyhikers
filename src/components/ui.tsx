import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Clock, Mountain } from "lucide-react";
import { formatPrice } from "@/data/catalog";
import type { TripCardData } from "@/data/trips";

export function Tag({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium ${
        dark ? "border-white/30 text-white" : "border-line bg-card text-ink"
      }`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${dark ? "bg-white" : "bg-moss"}`} />
      {children}
    </span>
  );
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "light" | "outline";
}) {
  const styles = {
    primary: "bg-moss text-white hover:bg-moss-dark",
    light: "bg-white text-ink hover:bg-paper",
    outline: "border border-current hover:bg-ink/5",
  }[variant];
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${styles}`}
    >
      {children} <ArrowUpRight className="h-4 w-4" />
    </Link>
  );
}

/** Image card with title overlaid, as used on Home. */
export function TripPhotoCard({ trip, className = "", sizes }: { trip: TripCardData; className?: string; sizes: string }) {
  return (
    <Link
      href={`/experiences/${trip.slug}`}
      className={`group relative block overflow-hidden rounded-[var(--radius-panel)] bg-ink text-white ${className}`}
    >
      <Image
        src={trip.images[0]}
        alt={trip.title}
        fill
        sizes={sizes}
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/10 to-black/50" />
      <div className="relative flex h-full flex-col justify-between p-6">
        <h3 className="display max-w-md text-2xl sm:text-3xl">{trip.title}</h3>
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="rounded-full bg-white/15 px-3 py-1 backdrop-blur">{trip.destination}</span>
          <span className="rounded-full bg-white/15 px-3 py-1 backdrop-blur">{trip.duration}</span>
          <span className="rounded-full bg-white/15 px-3 py-1 backdrop-blur">{trip.difficulty}</span>
        </div>
      </div>
    </Link>
  );
}

/** Standard listing card. */
export function TripCard({ trip }: { trip: TripCardData }) {
  return (
    <Link
      href={`/experiences/${trip.slug}`}
      className="group flex flex-col overflow-hidden rounded-[var(--radius-panel)] bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={trip.images[0]}
          alt={trip.title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-ink">
          {trip.difficulty}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs font-medium uppercase tracking-widest text-muted">{trip.destination}</p>
        <h3 className="mt-2 font-display text-xl font-extrabold uppercase leading-tight">{trip.title}</h3>
        <p className="mt-2 line-clamp-2 text-sm text-muted">{trip.summary}</p>
        <div className="mt-4 flex items-center gap-4 text-xs text-muted">
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" /> {trip.duration}
          </span>
          <span className="inline-flex items-center gap-1">
            <Mountain className="h-3.5 w-3.5" /> {trip.groupSize}
          </span>
        </div>
        <div className="mt-auto flex items-end justify-between pt-6">
          <div>
            {trip.priceFrom !== null && <p className="text-xs text-muted">From</p>}
            <p className="font-semibold">{formatPrice(trip)}</p>
          </div>
          <span className="inline-flex items-center gap-1 rounded-full bg-ink px-4 py-2 text-xs font-semibold text-white transition-colors group-hover:bg-moss">
            View trip <ArrowUpRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}

/** Dark rounded hero panel shared by inner pages. */
export function PageHero({
  image,
  eyebrow,
  title,
  children,
}: {
  image: string;
  eyebrow?: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="px-3 pt-3">
      <div className="relative mx-auto flex min-h-[460px] max-w-[1400px] items-end overflow-hidden rounded-[var(--radius-panel)] bg-ink text-white">
        <Image src={image} alt="" fill fetchPriority="high" loading="eager" quality={60} sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/40" />
        <div className="relative w-full px-6 pb-10 pt-32 sm:px-12">
          {eyebrow && <Tag dark>{eyebrow}</Tag>}
          <h1 className="display mt-4 max-w-4xl text-5xl sm:text-7xl">{title}</h1>
          {children}
        </div>
      </div>
    </section>
  );
}
