import Link from "next/link";
import { site } from "@/data/site";
import { LogoMark } from "./LogoMark";

/** Mark + two-line wordmark. Text uses currentColor, so it works on dark heroes and light pages. */
export function Logo({ className = "" }: { className?: string }) {
  // "Kandy Hikers" → "Kandy" / "Hikers"; works for any multi-word name.
  const [first, ...rest] = site.name.split(" ");

  return (
    <Link href="/" className={`group flex items-center gap-2.5 ${className}`} aria-label={`${site.name} home`}>
      <LogoMark className="h-10 w-10 shrink-0 drop-shadow-sm transition-transform duration-300 group-hover:-rotate-6" />
      <span className="font-display uppercase leading-[0.95]">
        <span className="block text-[15px] font-extrabold tracking-tight">{first}</span>
        <span className="block text-[11px] font-bold tracking-[0.18em] opacity-80">{rest.join(" ")}</span>
      </span>
    </Link>
  );
}
