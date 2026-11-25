"use client";

import { useEffect, useState } from "react";
import { Check, Printer, RotateCcw } from "lucide-react";
import { packingList } from "@/data/guide";

const KEY = "packing-checklist";

/** Tickable checklist; ticks are remembered in this browser only. */
export function PackingChecklist() {
  const [done, setDone] = useState<string[]>([]);

  // Load saved ticks after mount (localStorage isn't available on the server).
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(KEY) ?? "[]");
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (Array.isArray(saved)) setDone(saved);
    } catch {}
  }, []);

  const update = (next: string[]) => {
    setDone(next);
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch {}
  };
  const toggle = (item: string) => update(done.includes(item) ? done.filter((d) => d !== item) : [...done, item]);
  const total = packingList.reduce((n, g) => n + g.items.length, 0);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 print:hidden">
        <p className="text-sm text-muted" aria-live="polite">
          {done.length} of {total} packed
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => update([])}
            className="inline-flex items-center gap-1.5 rounded-full border border-line px-4 py-2 text-xs font-semibold hover:bg-paper"
          >
            <RotateCcw className="h-3.5 w-3.5" /> Reset
          </button>
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-xs font-semibold text-white hover:bg-moss"
          >
            <Printer className="h-3.5 w-3.5" /> Print
          </button>
        </div>
      </div>

      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-paper print:hidden">
        <div className="h-full rounded-full bg-moss transition-all" style={{ width: `${(done.length / total) * 100}%` }} />
      </div>

      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        {packingList.map((g) => (
          <fieldset key={g.group}>
            <legend className="font-display text-sm font-bold uppercase">{g.group}</legend>
            <ul className="mt-3 space-y-1">
              {g.items.map((item) => {
                const checked = done.includes(item);
                return (
                  <li key={item}>
                    <label className="flex cursor-pointer items-start gap-3 rounded-xl px-2 py-1.5 text-sm hover:bg-paper">
                      <input type="checkbox" className="peer sr-only" checked={checked} onChange={() => toggle(item)} />
                      <span
                        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-moss ${
                          checked ? "border-moss bg-moss text-white" : "border-line bg-white"
                        }`}
                      >
                        {checked && <Check className="h-3.5 w-3.5" />}
                      </span>
                      <span className={checked ? "text-muted line-through" : ""}>{item}</span>
                    </label>
                  </li>
                );
              })}
            </ul>
          </fieldset>
        ))}
      </div>
    </div>
  );
}
