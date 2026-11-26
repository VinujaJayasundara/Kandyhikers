import type { Metadata } from "next";
import Image from "next/image";
import { ShieldCheck, Users, Leaf, Compass, HeartHandshake, Mountain } from "lucide-react";
import { IMG, trips } from "@/data/trips";
import { places } from "@/data/destinations";
import { site } from "@/data/site";
import { ButtonLink, PageHero, Tag } from "@/components/ui";

export const metadata: Metadata = {
  title: "About",
  description: `Meet the certified local guides behind ${site.name}, based in Kandy, Sri Lanka.`,
};

const values = [
  { icon: ShieldCheck, title: "Safety first", body: "Licensed guides with first-aid training, checked routes and a plan B for weather." },
  { icon: Users, title: "Small groups", body: "Private trips or groups of up to 12, so the pace suits you." },
  { icon: Leaf, title: "Leave no trace", body: "We carry out what we carry in and keep to marked trails." },
  { icon: HeartHandshake, title: "Local first", body: "Village guides, family-run guesthouses and local cooks wherever we can." },
  { icon: Compass, title: "Tailor-made", body: "Every route can be adjusted to your fitness, time and interests." },
  { icon: Mountain, title: "Know the hills", body: "We've walked these trails in every season, so we know when and where to go." },
];

// TODO: replace with real guide names, photos and bios.
const guides = [
  {
    name: site.leadGuide,
    role: "Founder & lead guide",
    bio: "Retired army officer who has led treks in the Knuckles and central hills for years. Plans every route personally.",
    image: IMG.mistyHiker,
  },
  {
    name: "Guide name",
    role: "Hiking guide · Knuckles & Hanthana",
    bio: "Grew up in a village on the edge of the Knuckles forest and knows its trails, birds and plants.",
    image: IMG.hikerValley,
  },
  {
    name: "Guide name",
    role: "Cultural & wildlife guide",
    bio: "Specialist in the Cultural Triangle and Yala, with a background in history and wildlife tracking.",
    image: IMG.trail,
  },
];

export default function AboutPage() {
  const stats = [
    { value: `${trips.length}`, label: "Guided experiences" },
    { value: `${places.length}`, label: "Destinations" },
    { value: "12", label: "Max group size" },
    { value: "Kandy", label: "Home base" },
  ];

  return (
    <>
      <PageHero image={IMG.campfire} eyebrow="About us" title="Local guides, from the hills of Kandy">
        <p className="mt-4 max-w-xl text-white/85">{site.description}</p>
      </PageHero>

      {/* Story */}
      <section className="mx-auto max-w-[1400px] px-3 py-14 sm:px-6 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <Tag>Our story</Tag>
            <h2 className="display mt-4 text-4xl text-moss-dark sm:text-5xl">Started by a guide who never stopped walking</h2>
            <div className="mt-6 space-y-4 text-sm leading-relaxed text-muted">
              <p>
                {site.name} was started in Kandy by {site.leadGuide}, who spent years leading people through the
                central hills and wanted visitors to see Sri Lanka the way locals do: on foot, at an easy pace, with
                someone who knows the way.
              </p>
              <p>
                Today we&apos;re a small team of certified guides. We plan hikes, cultural tours, safaris and coastal trips
                across the island, but Kandy is still home, and the misty ridges around it are where most of our
                adventures begin.
              </p>
            </div>
            <div className="mt-8">
              <ButtonLink href="/contact">Plan a trip with us</ButtonLink>
            </div>
          </div>
          <div className="relative h-[420px] overflow-hidden rounded-[var(--radius-panel)]">
            <Image src={IMG.tea} alt="Tea plantations in the Sri Lankan hill country" fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" />
          </div>
        </div>

        <dl className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-[var(--radius-panel)] bg-line md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-card p-8">
              <dd className="display text-4xl text-moss-dark sm:text-5xl">{s.value}</dd>
              <dt className="mt-2 text-sm text-muted">{s.label}</dt>
            </div>
          ))}
        </dl>
      </section>

      {/* Values */}
      <section className="mx-auto max-w-[1400px] px-3 pb-20 sm:px-6">
        <Tag>How we work</Tag>
        <h2 className="display mt-4 max-w-3xl text-4xl text-moss-dark sm:text-5xl">What you can count on</h2>
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {values.map(({ icon: Icon, title, body }) => (
            <div key={title} className="rounded-[var(--radius-panel)] bg-card p-8">
              <Icon className="h-7 w-7 text-moss" />
              <h3 className="mt-4 font-display text-lg font-bold uppercase">{title}</h3>
              <p className="mt-2 text-sm text-muted">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Guides */}
      <section id="guides" className="mx-auto max-w-[1400px] scroll-mt-24 px-3 pb-20 sm:px-6">
        <Tag>Our guides</Tag>
        <h2 className="display mt-4 text-4xl text-moss-dark sm:text-5xl">Meet the team</h2>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {guides.map((g, i) => (
            <article key={g.name + i} className="overflow-hidden rounded-[var(--radius-panel)] bg-card">
              <div className="relative aspect-[4/3]">
                <Image src={g.image} alt={g.name} fill sizes="(min-width:768px) 33vw, 100vw" className="object-cover" />
              </div>
              <div className="p-6">
                <h3 className="font-display text-lg font-extrabold uppercase">{g.name}</h3>
                <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-moss">{g.role}</p>
                <p className="mt-3 text-sm text-muted">{g.bio}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
