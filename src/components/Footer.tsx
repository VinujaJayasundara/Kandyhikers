import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { IMG, categories, type Category } from "@/data/catalog";
import { site } from "@/data/site";
import { Logo } from "./Logo";

const columns = [
  {
    title: "Experiences",
    links: (Object.keys(categories) as Category[]).map((c) => ({
      href: `/experiences?type=${c}`,
      label: categories[c].label,
    })),
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About us" },
      { href: "/about#guides", label: "Our guides" },
      { href: "/destinations", label: "Destinations" },
      { href: "/journal", label: "Journal" },
    ],
  },
  {
    title: "Support",
    links: [
      { href: "/guide", label: "Travel guide & FAQ" },
      { href: "/terms", label: "Booking terms" },
      { href: "/cancellation-policy", label: "Cancellation policy" },
      { href: "/privacy", label: "Privacy" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="px-3 pb-3">
      {/* Closing CTA panel */}
      <section className="relative mx-auto max-w-[1400px] overflow-hidden rounded-t-[var(--radius-panel)] bg-moss text-white">
        <div className="relative z-10 flex flex-col gap-6 px-6 pb-40 pt-14 sm:px-12 md:flex-row md:items-start md:justify-between md:pb-56">
          <h2 className="display max-w-3xl text-5xl sm:text-7xl lg:text-8xl">Your next summit starts here</h2>
          <Link
            href="/contact"
            className="inline-flex shrink-0 items-center gap-2 self-start rounded-full bg-white px-6 py-3 text-sm font-semibold text-ink transition-transform hover:-translate-y-0.5"
          >
            Plan My Trip <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
        <Image
          src={IMG.peaksClouds}
          alt=""
          width={1800}
          height={700}
          className="absolute inset-x-0 bottom-0 h-56 w-full object-cover object-top opacity-80 mix-blend-luminosity md:h-72"
          style={{ maskImage: "linear-gradient(to bottom, transparent, black 45%)" }}
        />
      </section>

      <div className="mx-auto max-w-[1400px] rounded-b-[var(--radius-panel)] bg-ink px-6 py-12 text-white/80 sm:px-12">
        <div className="grid gap-10 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div className="space-y-4">
            <Logo className="text-white" />
            <p className="max-w-xs text-sm leading-relaxed">{site.description}</p>
            <p className="text-sm">{site.address}</p>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="mb-4 font-display text-xs font-bold uppercase tracking-widest text-white">{col.title}</h3>
              <ul className="space-y-2 text-sm">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="transition-colors hover:text-white">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 {site.name}. All rights reserved.</p>
          <div className="flex gap-5">
            <a href={site.socials.facebook} className="hover:text-white">Facebook</a>
            <a href={site.socials.instagram} className="hover:text-white">Instagram</a>
            <a href={site.socials.x} className="hover:text-white">X</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
