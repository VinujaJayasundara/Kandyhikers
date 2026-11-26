import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import { policy, policyLinks } from "@/data/policies";
import { site } from "@/data/site";
import { Tag } from "./ui";

export interface PolicySection {
  id: string;
  title: string;
  content: React.ReactNode;
}

/** Shared layout for the legal pages: plain light header, contents list, readable text column. */
export function PolicyLayout({
  path,
  title,
  intro,
  sections,
}: {
  path: string;
  title: string;
  intro: React.ReactNode;
  sections: PolicySection[];
}) {
  return (
    <div className="mx-auto max-w-[1400px] px-3 pb-20 pt-28 sm:px-6">
      <header className="rounded-[var(--radius-panel)] bg-card p-6 min-[360px]:p-8 sm:p-12">
        <Tag>Policies</Tag>
        <h1 className="display mt-4 text-[1.85rem] text-moss-dark [overflow-wrap:anywhere] min-[360px]:text-4xl sm:text-6xl">{title}</h1>
        <p className="mt-3 text-sm text-muted">Last updated {policy.lastUpdated}</p>
        <nav aria-label="Policies" className="mt-6 flex flex-wrap gap-2">
          {policyLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={l.href === path ? "page" : undefined}
              className={`rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
                l.href === path ? "bg-ink text-white" : "bg-paper text-muted hover:text-ink"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </header>

      {policy.draft && (
        <div role="note" className="mt-3 flex gap-3 rounded-[var(--radius-panel)] border border-sun bg-sun/15 p-5 text-sm">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-ink" />
          <p>
            <strong>Draft.</strong> This policy is being finalised and may change. Please confirm the details with us
            before you book.
          </p>
        </div>
      )}

      <div className="mt-12 grid grid-cols-[minmax(0,1fr)] gap-10 lg:grid-cols-[220px_minmax(0,1fr)]">
        <nav aria-label="On this page" className="lg:sticky lg:top-28 lg:self-start">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted">On this page</p>
          <ol className="mt-3 space-y-1 text-sm">
            {sections.map((s, i) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="flex gap-2 rounded-lg px-2 py-1.5 text-muted hover:bg-card hover:text-ink">
                  <span className="tabular-nums">{i + 1}.</span> {s.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <article className="max-w-2xl">
          <div className="text-base leading-relaxed text-muted">{intro}</div>
          {sections.map((s, i) => (
            <section key={s.id} id={s.id} className="mt-12 scroll-mt-28">
              <h2 className="font-display text-xl font-extrabold uppercase text-ink">
                {i + 1}. {s.title}
              </h2>
              <div className="policy mt-4 space-y-4 text-sm leading-relaxed text-muted">{s.content}</div>
            </section>
          ))}

          <section className="mt-16 rounded-[var(--radius-panel)] bg-card p-6 text-sm">
            <h2 className="font-display font-bold uppercase text-ink">Questions?</h2>
            <p className="mt-2 text-muted">
              Contact {site.name} at{" "}
              <a href={`mailto:${site.email}`} className="font-semibold text-moss underline">{site.email}</a>, call{" "}
              {site.phone}, or write to us at {site.address}.
            </p>
          </section>
        </article>
      </div>
    </div>
  );
}
