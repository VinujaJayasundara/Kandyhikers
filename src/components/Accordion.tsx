"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";

export function Accordion({
  items,
  defaultOpen = 0,
}: {
  items: { title: string; body: React.ReactNode }[];
  defaultOpen?: number | null;
}) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.title}>
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 py-5 text-left font-display text-sm font-bold uppercase tracking-tight"
              >
                {item.title}
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-line">
                  {isOpen ? <Minus className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
                </span>
              </button>
            </h3>
            <div className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr] pb-5" : "grid-rows-[0fr]"}`}>
              <div className="overflow-hidden text-sm leading-relaxed text-muted">{item.body}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
