"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { MessageCircle, Mail } from "lucide-react";
import { site, whatsappLink } from "@/data/site";

/**
 * No backend yet: the form builds a message and hands it to WhatsApp or the
 * visitor's email app. Swap `send` for a POST to an API route / Formspree later.
 * `trips` is just slug + title, passed from the server page.
 */
export function EnquiryForm({ trips }: { trips: { slug: string; title: string }[] }) {
  const params = useSearchParams();
  const tripParam = params.get("trip");
  const initialTrip = trips.some((t) => t.slug === tripParam) ? tripParam! : "";

  const [form, setForm] = useState({
    name: "",
    email: "",
    trip: initialTrip,
    date: "",
    guests: "2",
    message: "",
  });
  const [error, setError] = useState("");

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const buildMessage = () => {
    const trip = trips.find((t) => t.slug === form.trip);
    return [
      `Hi, I'm ${form.name}.`,
      trip ? `I'm interested in: ${trip.title}.` : "I'd like help planning a trip.",
      form.date && `Preferred date: ${form.date}`,
      `Guests: ${form.guests}`,
      form.email && `Email: ${form.email}`,
      form.message && `\n${form.message}`,
    ]
      .filter(Boolean)
      .join("\n");
  };

  const send = (via: "whatsapp" | "email") => (e: React.MouseEvent) => {
    e.preventDefault();
    const formEl = (e.currentTarget as HTMLButtonElement).form!;
    if (!formEl.reportValidity()) return;
    if (!form.name.trim()) return setError("Please add your name.");
    setError("");
    const text = buildMessage();
    if (via === "whatsapp") {
      window.open(whatsappLink(text), "_blank", "noopener,noreferrer");
    } else {
      const subject = encodeURIComponent(`Trip enquiry from ${form.name}`);
      window.location.href = `mailto:${site.email}?subject=${subject}&body=${encodeURIComponent(text)}`;
    }
  };

  const field = "mt-1.5 w-full rounded-2xl border border-line bg-paper px-4 py-3 text-sm outline-none focus:border-moss";
  const label = "text-xs font-semibold uppercase tracking-widest text-muted";

  return (
    <form className="grid gap-5 sm:grid-cols-2" noValidate={false}>
      <div>
        <label htmlFor="c-name" className={label}>Name</label>
        <input id="c-name" required autoComplete="name" className={field} value={form.name} onChange={set("name")} />
      </div>
      <div>
        <label htmlFor="c-email" className={label}>Email (optional)</label>
        <input id="c-email" type="email" autoComplete="email" className={field} value={form.email} onChange={set("email")} />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="c-trip" className={label}>Experience</label>
        <select id="c-trip" className={field} value={form.trip} onChange={set("trip")}>
          <option value="">Not sure yet, help me choose</option>
          {trips.map((t) => (
            <option key={t.slug} value={t.slug}>{t.title}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="c-date" className={label}>Preferred date</label>
        <input id="c-date" type="date" className={field} value={form.date} onChange={set("date")} />
      </div>
      <div>
        <label htmlFor="c-guests" className={label}>Guests</label>
        <input id="c-guests" type="number" min={1} max={30} className={field} value={form.guests} onChange={set("guests")} />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="c-msg" className={label}>Anything we should know?</label>
        <textarea
          id="c-msg"
          rows={5}
          className={field}
          placeholder="Fitness level, pick-up hotel, dietary needs, questions…"
          value={form.message}
          onChange={set("message")}
        />
      </div>

      {error && <p className="text-sm text-red-700 sm:col-span-2" role="alert">{error}</p>}

      <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row">
        <button
          type="submit"
          onClick={send("whatsapp")}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-moss py-3.5 text-sm font-semibold text-white transition-colors hover:bg-moss-dark"
        >
          <MessageCircle className="h-4 w-4" /> Send on WhatsApp
        </button>
        <button
          type="button"
          onClick={send("email")}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-ink py-3.5 text-sm font-semibold transition-colors hover:bg-ink hover:text-white"
        >
          <Mail className="h-4 w-4" /> Send by email
        </button>
      </div>
      <p className="text-xs text-muted sm:col-span-2">No payment needed to enquire. We usually reply within a few hours.</p>
    </form>
  );
}
