import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ShieldCheck, Users, Leaf, Compass } from "lucide-react";
import { IMG, categories, getTrip, toCard, trips, type Category } from "@/data/trips";
import { places } from "@/data/destinations";
import { site } from "@/data/site";
import { ButtonLink, Tag, TripPhotoCard } from "@/components/ui";
import { CategoryExplorer } from "@/components/CategoryExplorer";
import { Accordion } from "@/components/Accordion";

const steps = [
  {
    n: "01",
    title: "Pick your adventure",
    body: "Browse hikes, cultural tours, safaris and coastal escapes, or tell us what you're after and we'll suggest a route.",
    bg: "bg-clay",
  },
  {
    n: "02",
    title: "Plan it with a local guide",
    body: "We confirm dates, group size, pick-up and fitness level over WhatsApp or email, with no payment until it's right.",
    bg: "bg-sand",
  },
  {
    n: "03",
    title: "Hit the trail",
    body: "Your certified guide meets you in Kandy or at your hotel. Water, permits and local know-how are sorted.",
    bg: "bg-moss text-white",
  },
];

const packing = [
  {
    title: "Footwear — grippy, broken-in, ankle support",
    body: "Trails around Kandy get muddy and rocky after rain. Trail runners work for easy walks; hiking boots for Knuckles, Alagalla and Brandy Rock.",
  },
  {
    title: "Rain layer — the hills make their own weather",
    body: "Afternoon showers are common in the hill country all year. A light, packable rain jacket is enough.",
  },
  {
    title: "Water, sun & snacks",
    body: "Carry 1.5–2 litres per person. Your guide brings extra water and a snack pack on most trips.",
  },
  {
    title: "Temple-ready clothing",
    body: "Cover shoulders and knees for temple visits like Sri Dalada Maligawa. Bring socks for hot stone floors.",
  },
  {
    title: "Leech socks for forest trails",
    body: "In wet months the Knuckles forests have leeches. They're harmless, but leech socks make the walk more comfortable.",
  },
];

const why = [
  { icon: ShieldCheck, title: "Certified guides", body: "Licensed, first-aid trained locals." },
  { icon: Users, title: "Small groups", body: "Private or up to 12 guests." },
  { icon: Leaf, title: "Responsible travel", body: "Leave-no-trace, local suppliers." },
  { icon: Compass, title: "Tailor-made", body: "Routes shaped to your fitness." },
];

const explorerGroups = Object.fromEntries(
  (Object.keys(categories) as Category[]).map((c) => [c, trips.filter((t) => t.category === c).slice(0, 4).map(toCard)]),
) as Record<Category, ReturnType<typeof toCard>[]>;

export default function Home() {
  const big = getTrip("knuckles-mountain-range")!;
  const a = getTrip("hanthana-mountain-range")!;
  const b = getTrip("ella-rock-scenic-hike")!;

  return (
    <>
      {/* ───── Hero ───── */}
      <section className="px-3 pt-3">
        <div className="relative mx-auto flex min-h-[640px] max-w-[1400px] flex-col justify-end overflow-hidden rounded-[var(--radius-panel)] bg-ink text-white md:h-[calc(100svh-1.5rem)] md:max-h-[860px]">
          <Image
            src={IMG.pidurangala}
            alt="Misty rock summit rising above the Sri Lankan forest"
            fill
            fetchPriority="high"
            loading="eager"
            quality={60}
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-transparent to-black/60" />

          <div className="relative px-5 pb-6 sm:px-10">
            <p className="max-w-md text-sm text-white/85 sm:text-base">
              Guided hiking &amp; adventure tours across Sri Lanka, led by certified local experts from Kandy.
            </p>
            <h1 className="display mt-4 text-[17vw] leading-[0.82] sm:text-[15vw] xl:text-[13.5rem]">Sri Lanka</h1>

            <div className="mt-6 flex flex-col gap-6 border-t border-white/25 pt-5 text-xs sm:flex-row sm:items-end sm:justify-between">
              <div className="flex flex-wrap items-center gap-3">
                <ButtonLink href="/experiences" variant="light">
                  Explore experiences
                </ButtonLink>
                <span className="text-white/70">Based in Kandy · {site.phone}</span>
              </div>
              <dl className="grid grid-cols-3 gap-6 text-white/70 sm:min-w-[380px]">
                <div>
                  <dt>Base</dt>
                  <dd className="mt-1 font-semibold text-white">Kandy</dd>
                </div>
                <div>
                  <dt>Best season</dt>
                  <dd className="mt-1 font-semibold text-white">Dec – Apr</dd>
                </div>
                <div>
                  <dt>Highest peak</dt>
                  <dd className="mt-1 font-semibold text-white">2,524 m</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* ───── Intro bento ───── */}
      <section className="mx-auto max-w-[1400px] px-3 py-3">
        <div className="grid gap-3 md:grid-cols-4 md:grid-rows-[auto_auto]">
          <div className="flex flex-col justify-between rounded-[var(--radius-panel)] bg-moss p-8 text-white md:col-span-2">
            <Tag dark>About us</Tag>
            <div className="mt-10">
              <h2 className="display text-3xl sm:text-4xl">Your local partner for trails, temples &amp; wild places</h2>
              <p className="mt-4 max-w-lg text-sm leading-relaxed text-white/80">
                We&apos;re a team of certified Sri Lankan guides led by {site.leadGuide}. From misty ridge walks above
                Kandy to sunrise on Sigiriya, we plan small-group adventures that are safe, unhurried and good for the
                communities we pass through.
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-between rounded-[var(--radius-panel)] bg-card p-6">
            <p className="display text-6xl">{trips.length}</p>
            <div>
              <p className="text-sm text-muted">Guided experiences</p>
              <Link href="/experiences" className="mt-4 inline-flex items-center gap-1 rounded-full bg-paper px-4 py-2 text-xs font-semibold hover:bg-line">
                Browse all <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          <div className="flex flex-col justify-between rounded-[var(--radius-panel)] bg-card p-6">
            <p className="display text-6xl">{places.length}</p>
            <div>
              <p className="text-sm text-muted">Destinations island-wide</p>
              <Link href="/destinations" className="mt-4 inline-flex items-center gap-1 rounded-full bg-paper px-4 py-2 text-xs font-semibold hover:bg-line">
                See map <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          <div className="relative min-h-[260px] overflow-hidden rounded-[var(--radius-panel)] md:col-span-3">
            <Image src={IMG.campfire} alt="Hikers gathered around a campfire at dusk" fill sizes="(min-width:768px) 75vw, 100vw" className="object-cover" />
          </div>

          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-[var(--radius-panel)] bg-line md:grid-cols-1">
            {why.slice(0, 2).map(({ icon: Icon, title, body }) => (
              <div key={title} className="bg-card p-6">
                <Icon className="h-6 w-6 text-moss" />
                <p className="mt-3 font-display text-sm font-bold uppercase">{title}</p>
                <p className="mt-1 text-xs text-muted">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── Popular experiences ───── */}
      <section className="mx-auto max-w-[1400px] px-3 py-20 sm:px-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Tag>Popular experiences</Tag>
            <h2 className="display mt-4 max-w-3xl text-4xl text-moss-dark sm:text-5xl">
              Mountain trails &amp; hidden summits, guided by locals
            </h2>
          </div>
          <ButtonLink href="/experiences" variant="outline">
            View all
          </ButtonLink>
        </div>
        <div className="mt-10 grid gap-3 md:grid-cols-2">
          <TripPhotoCard trip={a} className="h-[380px]" sizes="(min-width:768px) 50vw, 100vw" />
          <TripPhotoCard trip={b} className="h-[380px]" sizes="(min-width:768px) 50vw, 100vw" />
          <TripPhotoCard trip={big} className="h-[460px] md:col-span-2" sizes="100vw" />
        </div>
      </section>

      {/* ───── Explore by type ───── */}
      <section className="mx-auto max-w-[1400px] px-3 py-16 sm:px-6">
        <div className="text-center">
          <Tag>Explore by type</Tag>
          <h2 className="display mx-auto mt-4 max-w-4xl text-4xl text-moss-dark sm:text-6xl">
            One island, every kind of adventure
          </h2>
        </div>
        <div className="mt-10">
          <CategoryExplorer groups={explorerGroups} />
        </div>
      </section>

      {/* ───── How it works — stacked cards ───── */}
      <section className="mx-auto max-w-[1400px] px-3 py-20 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Tag>How it works</Tag>
            <h2 className="display mt-4 text-4xl text-moss-dark sm:text-5xl">From first message to trailhead</h2>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
              No booking engine and no hidden fees. Talk to a real guide, agree on the plan, and go.
            </p>
            <div className="mt-6">
              <ButtonLink href="/contact">Start planning</ButtonLink>
            </div>
          </div>
          <ol className="relative">
            {steps.map((s, i) => (
              <li
                key={s.n}
                className={`sticky mb-4 rounded-[var(--radius-panel)] p-8 shadow-sm ${s.bg}`}
                style={{ top: `${7 + i * 1.5}rem` }}
              >
                <div className="flex items-start justify-between gap-6">
                  <h3 className="display text-3xl sm:text-4xl">{s.title}</h3>
                  <span className="display text-3xl opacity-60">{s.n}</span>
                </div>
                <p className="mt-6 max-w-md text-sm leading-relaxed opacity-80">{s.body}</p>
                {i === steps.length - 1 && (
                  <div className="relative mt-8 h-56 overflow-hidden rounded-2xl">
                    <Image src={IMG.trail} alt="Hikers on a mountain trail" fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" />
                  </div>
                )}
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ───── Packing guide (accordion) ───── */}
      <section className="mx-auto max-w-[1400px] px-3 py-20 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <Tag>Travel guide</Tag>
            <h2 className="display mt-4 text-4xl text-moss-dark sm:text-5xl">What to pack for a Sri Lankan trail</h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">
              Tropical heat at the trailhead, cool mist on the ridge, sometimes both in one morning. Here&apos;s what our
              guides tell every group.
            </p>
            <div className="relative mt-8 hidden h-72 overflow-hidden rounded-[var(--radius-panel)] lg:block">
              <Image src={IMG.tent} alt="View from a tent opening onto forest" fill sizes="50vw" className="object-cover" />
            </div>
          </div>
          <div className="lg:pt-16">
            <Accordion items={packing} />
            <Link href="/guide" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-moss hover:underline">
              Read the full travel guide <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ───── Why us strip ───── */}
      <section className="mx-auto max-w-[1400px] px-3 pb-20 sm:px-6">
        <div className="grid gap-px overflow-hidden rounded-[var(--radius-panel)] bg-line sm:grid-cols-2 lg:grid-cols-4">
          {why.map(({ icon: Icon, title, body }) => (
            <div key={title} className="bg-card p-8">
              <Icon className="h-7 w-7 text-moss" />
              <p className="mt-4 font-display text-base font-bold uppercase">{title}</p>
              <p className="mt-1 text-sm text-muted">{body}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
