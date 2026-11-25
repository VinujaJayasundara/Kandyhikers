import type { Metadata } from "next";
import { Suspense } from "react";
import { Mail, MapPin, MessageCircle, Phone, Clock } from "lucide-react";
import { IMG, trips } from "@/data/trips";
import { site, whatsappLink } from "@/data/site";
import { PageHero } from "@/components/ui";
import { EnquiryForm } from "./EnquiryForm";
import { MapEmbed } from "./MapEmbed";

export const metadata: Metadata = {
  title: "Contact",
  description: "Plan your Sri Lanka hike or tour with a certified local guide in Kandy.",
};

const tripOptions = trips.map((t) => ({ slug: t.slug, title: t.title }));

export default function ContactPage() {
  const details = [
    { icon: MessageCircle, label: "WhatsApp", value: site.phone, href: whatsappLink() },
    { icon: Phone, label: "Phone", value: site.phone, href: `tel:${site.phone.replace(/\s/g, "")}` },
    { icon: Mail, label: "Email", value: site.email, href: `mailto:${site.email}` },
    { icon: MapPin, label: "Office", value: site.address },
    { icon: Clock, label: "Hours", value: "Every day, 7am – 9pm (Sri Lanka time)" },
  ];

  return (
    <>
      <PageHero image={IMG.kandy} eyebrow="Contact" title="Plan my trip">
        <p className="mt-4 max-w-xl text-white/85">
          Tell us what you&apos;d like to do and a local guide will get back to you with dates, a route and a price.
        </p>
      </PageHero>

      <section className="mx-auto grid max-w-[1400px] gap-3 px-3 py-3 lg:grid-cols-[1.4fr_1fr]">
        <div className="rounded-[var(--radius-panel)] bg-card p-6 sm:p-10">
          <h2 className="display text-3xl text-moss-dark">Send an enquiry</h2>
          <div className="mt-8">
            <Suspense fallback={<div className="h-[480px]" />}>
              <EnquiryForm trips={tripOptions} />
            </Suspense>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="rounded-[var(--radius-panel)] bg-moss p-6 text-white sm:p-10">
            <h2 className="display text-3xl">Talk to us directly</h2>
            <ul className="mt-6 space-y-5">
              {details.map(({ icon: Icon, label, value, href }) => (
                <li key={label} className="flex gap-4">
                  <Icon className="mt-0.5 h-5 w-5 shrink-0 text-white/70" />
                  <div>
                    <p className="text-xs uppercase tracking-widest text-white/60">{label}</p>
                    {href ? (
                      <a
                        href={href}
                        className="text-sm font-semibold hover:underline"
                        {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="text-sm font-semibold">{value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="min-h-[280px] flex-1 overflow-hidden rounded-[var(--radius-panel)] bg-line">
            <MapEmbed address={site.address} />
          </div>
        </div>
      </section>
    </>
  );
}
