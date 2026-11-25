"use client";

import { useActionState, useState } from "react";
import { CheckCircle2, Star } from "lucide-react";
import { addTestimonial, type TestimonialFormState } from "@/app/actions/testimonials";

const initial: TestimonialFormState = { status: "idle" };

/** Pass `trip` to fix the experience (trip pages); pass `tripOptions` to let the visitor choose. */
export function TestimonialForm({ trip, tripOptions }: { trip?: string; tripOptions?: { slug: string; title: string }[] }) {
  const [state, action, pending] = useActionState(addTestimonial, initial);
  // Remount (and clear) the fields after each successful submit.
  const [formKey, setFormKey] = useState(0);
  const [lastState, setLastState] = useState(state);
  if (state !== lastState) {
    setLastState(state);
    if (state.status === "success") setFormKey((k) => k + 1);
  }

  const v = state.status === "error" ? state.values ?? {} : {};
  const e = state.errors ?? {};
  const field = "mt-1.5 w-full rounded-2xl border bg-paper px-4 py-3 text-sm outline-none focus:border-moss";
  const border = (k: keyof typeof e) => (e[k] ? "border-red-600" : "border-line");
  const label = "text-xs font-semibold uppercase tracking-widest text-muted";
  const err = (k: keyof typeof e) =>
    e[k] && <p id={`${k}-err`} className="mt-1 text-xs text-red-700">{e[k]}</p>;

  return (
    <div>
      {state.status === "success" && (
        <p role="status" className="mb-6 flex items-center gap-2 rounded-2xl bg-moss/10 px-4 py-3 text-sm font-semibold text-moss-dark">
          <CheckCircle2 className="h-5 w-5" /> {state.message}
        </p>
      )}
      {state.status === "error" && state.message && (
        <p role="alert" className="mb-6 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-800">{state.message}</p>
      )}

      <form key={formKey} action={action} className="grid gap-5 sm:grid-cols-2" noValidate>
        {trip ? (
          <input type="hidden" name="trip" value={trip} />
        ) : (
          <div className="sm:col-span-2">
            <label htmlFor="t-trip" className={label}>Experience</label>
            <select id="t-trip" name="trip" defaultValue={v.trip ?? ""} className={`${field} ${border("trip")}`} aria-invalid={!!e.trip} aria-describedby={e.trip ? "trip-err" : undefined}>
              <option value="" disabled>Which experience did you do?</option>
              {tripOptions?.map((t) => (
                <option key={t.slug} value={t.slug}>{t.title}</option>
              ))}
            </select>
            {err("trip")}
          </div>
        )}

        <fieldset className="sm:col-span-2">
          <legend className={label}>Your rating</legend>
          <StarInput defaultValue={Number(v.rating) || 0} />
          {err("rating")}
        </fieldset>

        <div>
          <label htmlFor="t-name" className={label}>Name</label>
          <input id="t-name" name="name" autoComplete="name" maxLength={60} defaultValue={v.name} className={`${field} ${border("name")}`} aria-invalid={!!e.name} aria-describedby={e.name ? "name-err" : undefined} />
          {err("name")}
        </div>
        <div>
          <label htmlFor="t-country" className={label}>Country (optional)</label>
          <input id="t-country" name="country" autoComplete="country-name" maxLength={60} defaultValue={v.country} className={`${field} ${border("country")}`} />
          {err("country")}
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="t-message" className={label}>Your review</label>
          <textarea
            id="t-message"
            name="message"
            rows={5}
            maxLength={1000}
            defaultValue={v.message}
            placeholder="What did you enjoy? How was your guide? Any tips for future travellers?"
            className={`${field} ${border("message")}`}
            aria-invalid={!!e.message}
            aria-describedby={e.message ? "message-err" : undefined}
          />
          {err("message")}
        </div>

        {/* Honeypot: hidden from people, bots tend to fill it in. */}
        <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
          <label htmlFor="t-website">Website</label>
          <input id="t-website" name="website" tabIndex={-1} autoComplete="off" />
        </div>

        <div className="sm:col-span-2">
          <button
            type="submit"
            disabled={pending}
            className="rounded-full bg-moss px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-moss-dark disabled:opacity-60"
          >
            {pending ? "Sending…" : "Submit review"}
          </button>
        </div>
      </form>
    </div>
  );
}

function StarInput({ defaultValue }: { defaultValue: number }) {
  const [value, setValue] = useState(defaultValue);
  const [hover, setHover] = useState(0);
  const shown = hover || value;
  return (
    <div className="mt-2 flex gap-1" onMouseLeave={() => setHover(0)}>
      {[1, 2, 3, 4, 5].map((n) => (
        <label key={n} className="cursor-pointer" onMouseEnter={() => setHover(n)}>
          <input
            type="radio"
            name="rating"
            value={n}
            checked={value === n}
            onChange={() => setValue(n)}
            className="peer sr-only"
          />
          <span className="sr-only">{n} {n === 1 ? "star" : "stars"}</span>
          <Star
            aria-hidden
            className={`h-8 w-8 rounded transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-moss ${
              n <= shown ? "fill-sun text-sun" : "fill-line text-line"
            }`}
          />
        </label>
      ))}
    </div>
  );
}
