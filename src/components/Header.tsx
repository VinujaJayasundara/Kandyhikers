"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { categories, type Category } from "@/data/catalog";

const nav = [
  { href: "/experiences", label: "Experiences", mega: true },
  { href: "/destinations", label: "Destinations" },
  { href: "/guide", label: "Travel Guide" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu whenever the route changes (adjust state during render, not in an effect).
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  // Pages that open with a dark photo hero get a transparent header at the top.
  const darkHero = ["/", "/experiences", "/destinations", "/guide", "/journal", "/about", "/contact"].includes(pathname);
  const solid = scrolled || open || !darkHero;

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3">
      <div
        className={`mx-auto flex h-16 max-w-[1400px] items-center justify-between rounded-2xl px-4 transition-colors duration-300 sm:px-6 ${
          solid ? "bg-paper/90 text-ink shadow-sm backdrop-blur-md" : "bg-transparent text-white"
        }`}
      >
        <Logo />

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => {
            const active = pathname.startsWith(item.href);
            const pill = `rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              active
                ? solid
                  ? "bg-ink text-white"
                  : "bg-white text-ink"
                : solid
                  ? "hover:bg-ink/5"
                  : "hover:bg-white/15"
            }`;
            if (!item.mega) {
              return (
                <Link key={item.href} href={item.href} className={pill}>
                  {item.label}
                </Link>
              );
            }
            return (
              <div key={item.href} className="group relative">
                <Link href={item.href} className={`${pill} inline-flex items-center gap-1`}>
                  {item.label}
                  <ChevronDown className="h-3.5 w-3.5 transition-transform group-hover:rotate-180 group-focus-within:rotate-180" />
                </Link>
                <div className="invisible absolute left-1/2 top-full w-[560px] -translate-x-1/2 pt-3 opacity-0 transition-all group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                  <div className="grid grid-cols-2 gap-2 rounded-2xl bg-card p-3 text-ink shadow-xl">
                    {(Object.keys(categories) as Category[]).map((c) => (
                      <Link
                        key={c}
                        href={`/experiences?type=${c}`}
                        className="rounded-xl p-3 transition-colors hover:bg-paper"
                      >
                        <span className="font-display text-sm font-bold uppercase">{categories[c].label}</span>
                        <span className="mt-1 block text-xs leading-relaxed text-muted">{categories[c].blurb}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/contact"
            className="hidden rounded-full bg-moss px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-moss-dark sm:inline-block"
          >
            Plan My Trip
          </Link>
          <button
            type="button"
            className="rounded-full p-2 lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-x-3 bottom-3 top-[5.5rem] overflow-y-auto rounded-2xl bg-paper p-6 text-ink shadow-xl lg:hidden">
          <nav aria-label="Mobile" className="flex flex-col">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="display border-b border-line py-4 text-3xl"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-6 grid grid-cols-2 gap-2">
            {(Object.keys(categories) as Category[]).map((c) => (
              <Link key={c} href={`/experiences?type=${c}`} className="rounded-xl bg-card p-3 text-sm font-semibold">
                {categories[c].label}
              </Link>
            ))}
          </div>
          <Link
            href="/contact"
            className="mt-6 block rounded-full bg-moss py-4 text-center font-semibold text-white"
          >
            Plan My Trip
          </Link>
        </div>
      )}
    </header>
  );
}
