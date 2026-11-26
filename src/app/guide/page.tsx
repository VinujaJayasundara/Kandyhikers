import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Phone } from "lucide-react";
import { IMG, trips } from "@/data/trips";
import { culture, emergency, faq, fitnessLevels, gettingHere, guideSections, health, practical } from "@/data/guide";
import { Accordion } from "@/components/Accordion";
import { ButtonLink, PageHero, Tag } from "@/components/ui";
import { PackingChecklist } from "./PackingChecklist";

export const metadata: Metadata = {
  title: "Travel Guide & FAQ",
  description: "Practical advice for hiking and travelling in Sri Lanka: getting to Kandy, fitness levels, packing, temple etiquette, safety and booking.",
};

function Section({ id, eyebrow, title, children }: { id: string; eyebrow: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-28 border-t border-line pt-12 first:border-0 first:pt-0">
      <Tag>{eyebrow}</Tag>
      <h2 className="display mt-4 text-3xl text-moss-dark sm:text-4xl">{title}</h2>
      <div className="mt-6">{children}</div>
    </section>
  );
}

export default function GuidePage() {
  return (
    <>
      <PageHero image={IMG.tent} eyebrow="Travel guide" title="Before you hit the trail">
        <p className="mt-4 max-w-xl text-white/85">
          What our guides tell every group: how to get here, what to pack, how fit you need to be, and how things work
          when you book.
        </p>
      </PageHero>

      <div className="mx-auto grid max-w-[1400px] grid-cols-[minmax(0,1fr)] gap-10 px-3 py-12 sm:px-6 sm:py-16 lg:grid-cols-[220px_minmax(0,1fr)]">
        {/* Table of contents */}
        <nav aria-label="On this page" className="lg:sticky lg:top-28 lg:self-start print:hidden">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted">On this page</p>
          <ul className="mt-3 flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:gap-1 lg:overflow-visible">
            {guideSections.map((s) => (
              <li key={s.id} className="shrink-0">
                <a href={`#${s.id}`} className="block rounded-full bg-card px-4 py-2 text-sm font-medium hover:bg-white lg:rounded-xl">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="max-w-3xl space-y-12">
          <Section id="getting-here" eyebrow="Getting here" title="Arriving in Kandy">
            <div className="grid gap-3 sm:grid-cols-2">
              {gettingHere.map((g) => (
                <div key={g.title} className="rounded-[var(--radius-panel)] bg-card p-6">
                  <h3 className="font-display font-bold uppercase">{g.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{g.body}</p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-sm text-muted">
              Wondering when to come?{" "}
              <Link href="/destinations#when-to-go" className="font-semibold text-moss hover:underline">
                See the seasons chart
              </Link>
              .
            </p>
          </Section>

          <Section id="fitness" eyebrow="Fitness levels" title="How fit do I need to be?">
            <p className="text-sm leading-relaxed text-muted">
              Every experience has a difficulty grade. If you&apos;re unsure, tell us how much you usually walk and
              we&apos;ll suggest a route, or adjust the pace for your group.
            </p>
            <ol className="mt-6 space-y-3">
              {fitnessLevels.map((f, i) => {
                const list = trips.filter((t) => t.difficulty === f.level);
                return (
                  <li key={f.level} className="flex gap-5 rounded-[var(--radius-panel)] bg-card p-6">
                    <div className="flex shrink-0 gap-1 pt-1" aria-hidden>
                      {[0, 1, 2, 3].map((n) => (
                        <span key={n} className={`h-5 w-1.5 rounded-full ${n <= i ? "bg-moss" : "bg-line"}`} />
                      ))}
                    </div>
                    <div>
                      <h3 className="font-display font-bold uppercase">{f.level}</h3>
                      <p className="mt-1 text-sm text-muted">{f.body}</p>
                      {list.length > 0 && (
                        <ul className="mt-3 flex flex-wrap gap-2">
                          {list.map((t) => (
                            <li key={t.slug}>
                              <Link
                                href={`/experiences/${t.slug}`}
                                className="inline-block rounded-full bg-paper px-3 py-2 text-xs font-semibold hover:bg-moss hover:text-white"
                              >
                                {t.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </li>
                );
              })}
            </ol>
          </Section>

          <Section id="packing" eyebrow="Packing checklist" title="What to bring">
            <div className="rounded-[var(--radius-panel)] bg-card p-6 sm:p-8">
              <PackingChecklist />
            </div>
          </Section>

          <Section id="culture" eyebrow="Temples & culture" title="Respecting local customs">
            <ul className="grid gap-3 sm:grid-cols-2">
              {culture.map((c, i) => (
                <li key={c} className="flex gap-4 rounded-[var(--radius-panel)] bg-card p-5 text-sm">
                  <span className="display text-xl text-moss-light">{String(i + 1).padStart(2, "0")}</span>
                  <span className="leading-relaxed">{c}</span>
                </li>
              ))}
            </ul>
          </Section>

          <Section id="health" eyebrow="Health & safety" title="Staying well on the trail">
            <dl className="divide-y divide-line border-y border-line">
              {health.map((h) => (
                <div key={h.title} className="grid gap-1 py-4 sm:grid-cols-[160px_1fr] sm:gap-6">
                  <dt className="font-display text-sm font-bold uppercase">{h.title}</dt>
                  <dd className="text-sm leading-relaxed text-muted">{h.body}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-6 rounded-[var(--radius-panel)] bg-moss p-6 text-white">
              <p className="flex items-center gap-2 font-display text-sm font-bold uppercase">
                <Phone className="h-4 w-4" /> Emergency numbers in Sri Lanka
              </p>
              <dl className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {emergency.map((e) => (
                  <div key={e.label}>
                    <dt className="text-xs text-white/70">{e.label}</dt>
                    <dd>
                      <a href={`tel:${e.value}`} className="display text-2xl hover:underline">{e.value}</a>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </Section>

          <Section id="money" eyebrow="Money & practical" title="Good to know">
            <dl className="grid gap-3 sm:grid-cols-2">
              {practical.map((p) => (
                <div key={p.title} className="rounded-[var(--radius-panel)] bg-card p-5">
                  <dt className="font-display text-sm font-bold uppercase">{p.title}</dt>
                  <dd className="mt-1 text-sm leading-relaxed text-muted">{p.body}</dd>
                </div>
              ))}
            </dl>
          </Section>

          <Section id="faq" eyebrow="Booking FAQ" title="Questions we get asked">
            <Accordion
              items={faq.map((f) =>
                f.title.includes("cancellation")
                  ? {
                      title: f.title,
                      body: (
                        <>
                          See our{" "}
                          <Link href="/cancellation-policy" className="font-semibold text-moss underline">
                            cancellation policy
                          </Link>{" "}
                          for the details, or ask us when you enquire.
                        </>
                      ),
                    }
                  : f,
              )}
            />
          </Section>

          <div className="flex flex-col items-start justify-between gap-6 rounded-[var(--radius-panel)] bg-card p-8 sm:flex-row sm:items-center print:hidden">
            <div>
              <h2 className="display text-2xl">Still have a question?</h2>
              <p className="mt-1 text-sm text-muted">Message a guide directly. We usually reply within a few hours.</p>
            </div>
            <ButtonLink href="/contact">Ask us</ButtonLink>
          </div>

          <Link href="/experiences" className="inline-flex items-center gap-2 text-sm font-semibold text-moss hover:underline print:hidden">
            Ready? Browse experiences <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </>
  );
}
