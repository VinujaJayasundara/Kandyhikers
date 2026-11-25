"use client";

import { useState } from "react";
import { ExternalLink, MapPin } from "lucide-react";

/**
 * Google Maps loads ~60 requests / 600 KB and sets cookies, so we show a light
 * placeholder and only load the real map when the visitor asks for it.
 */
export function MapEmbed({ address }: { address: string }) {
  const [show, setShow] = useState(false);
  const q = encodeURIComponent(address);

  if (show) {
    return (
      <iframe
        title="Map of our office in Kandy"
        src={`https://www.google.com/maps?q=${q}&output=embed`}
        className="h-full min-h-[280px] w-full border-0"
        referrerPolicy="no-referrer-when-downgrade"
      />
    );
  }

  return (
    <div className="relative flex h-full min-h-[280px] flex-col items-center justify-center gap-4 overflow-hidden bg-sand/40 p-6 text-center">
      {/* Decorative contour lines */}
      <svg aria-hidden className="absolute inset-0 h-full w-full text-moss/15" preserveAspectRatio="none" viewBox="0 0 400 300">
        {[40, 80, 120, 160, 200, 240].map((r) => (
          <ellipse key={r} cx="200" cy="150" rx={r * 1.4} ry={r * 0.8} fill="none" stroke="currentColor" strokeWidth="1.5" />
        ))}
      </svg>
      <span className="relative flex h-12 w-12 items-center justify-center rounded-full bg-moss text-white shadow-lg">
        <MapPin className="h-6 w-6" />
      </span>
      <p className="relative max-w-xs text-sm font-semibold">{address}</p>
      <div className="relative flex flex-wrap justify-center gap-2">
        <button
          onClick={() => setShow(true)}
          className="rounded-full bg-ink px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-moss"
        >
          Show map
        </button>
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${q}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 rounded-full border border-ink px-4 py-2 text-xs font-semibold transition-colors hover:bg-ink hover:text-white"
        >
          Open in Google Maps <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>
      <p className="relative text-[11px] text-muted">The map is loaded from Google when you click.</p>
    </div>
  );
}
