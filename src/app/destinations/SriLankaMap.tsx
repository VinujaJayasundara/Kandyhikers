import { places, type Place, type Region } from "@/data/destinations";

/* ───────────── Projection ─────────────
   Equirectangular is fine at Sri Lanka's size (≈1% distortion). */
const K = 160; // px per degree
const LON0 = 79.35;
const LAT0 = 10.0;
const W = 2.75 * K; // lon 79.35 → 82.10
const H = 4.35 * K; // lat 10.00 → 5.65
const px = (lon: number) => (lon - LON0) * K;
const py = (lat: number) => (LAT0 - lat) * K;

type LL = [number, number]; // [lon, lat]

/** Smooth path through points (Catmull-Rom → cubic Bézier). */
function smooth(pts: LL[], closed = true) {
  const p = pts.map(([lon, lat]) => [px(lon), py(lat)]);
  const n = p.length;
  const at = (i: number) => (closed ? p[(i + n) % n] : p[Math.max(0, Math.min(n - 1, i))]);
  let d = `M${p[0][0].toFixed(1)},${p[0][1].toFixed(1)}`;
  const last = closed ? n : n - 1;
  for (let i = 0; i < last; i++) {
    const [p0, p1, p2, p3] = [at(i - 1), at(i), at(i + 1), at(i + 2)];
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += `C${c1[0].toFixed(1)},${c1[1].toFixed(1)} ${c2[0].toFixed(1)},${c2[1].toFixed(1)} ${p2[0].toFixed(1)},${p2[1].toFixed(1)}`;
  }
  return closed ? d + "Z" : d;
}

/* ───────────── Geography (simplified, lon/lat) ───────────── */
const mainland: LL[] = [
  [80.24, 9.83], [80.32, 9.78], [80.42, 9.68], [80.55, 9.52], [80.66, 9.41], [80.78, 9.3], [80.83, 9.25],
  [80.91, 9.1], [80.99, 8.94], [81.09, 8.8], [81.16, 8.68], [81.23, 8.58], [81.27, 8.5], [81.33, 8.44],
  [81.37, 8.33], [81.43, 8.2], [81.51, 8.05], [81.59, 7.92], [81.66, 7.8], [81.71, 7.71], [81.78, 7.55],
  [81.83, 7.4], [81.86, 7.2], [81.87, 7.0], [81.84, 6.84], [81.78, 6.68], [81.7, 6.55], [81.6, 6.45],
  [81.48, 6.33], [81.34, 6.22], [81.2, 6.13], [81.08, 6.1], [80.94, 6.05], [80.8, 6.01], [80.68, 5.96],
  [80.59, 5.92], [80.5, 5.94], [80.42, 5.97], [80.32, 6.0], [80.22, 6.03], [80.14, 6.1], [80.08, 6.2],
  [80.03, 6.32], [79.99, 6.45], [79.95, 6.6], [79.9, 6.76], [79.86, 6.92], [79.84, 7.08], [79.83, 7.22],
  [79.81, 7.4], [79.79, 7.58], [79.79, 7.8], [79.76, 8.0], [79.71, 8.16], [79.7, 8.27], [79.78, 8.36],
  [79.86, 8.48], [79.89, 8.64], [79.92, 8.8], [79.96, 8.94], [80.04, 9.06], [80.09, 9.22], [80.1, 9.38],
  [80.05, 9.5], [79.95, 9.58], [79.9, 9.66], [79.95, 9.76], [80.05, 9.81], [80.14, 9.82],
];
const mannar: LL[] = [[79.72, 9.1], [79.8, 9.07], [79.9, 9.01], [79.94, 8.98], [79.9, 8.99], [79.8, 9.03], [79.73, 9.08]];
const delft: LL[] = [[79.66, 9.53], [79.72, 9.53], [79.73, 9.5], [79.67, 9.49]];

// Hill-country relief, outer → inner.
const relief: { pts: LL[]; tone: string }[] = [
  {
    tone: "var(--map-relief-1)",
    pts: [[80.42, 7.4], [80.5, 7.55], [80.62, 7.66], [80.75, 7.7], [80.88, 7.74], [80.98, 7.62], [81.04, 7.5], [81.06, 7.32], [81.12, 7.18], [81.16, 7.02], [81.13, 6.86], [81.05, 6.72], [80.95, 6.6], [80.82, 6.5], [80.68, 6.46], [80.55, 6.52], [80.44, 6.6], [80.36, 6.74], [80.33, 6.92], [80.36, 7.08], [80.38, 7.25]],
  },
  {
    tone: "var(--map-relief-2)",
    pts: [[80.52, 7.3], [80.6, 7.4], [80.7, 7.4], [80.8, 7.36], [80.9, 7.28], [80.97, 7.15], [81.03, 7.02], [81.02, 6.88], [80.96, 6.76], [80.86, 6.66], [80.74, 6.62], [80.62, 6.66], [80.52, 6.74], [80.46, 6.86], [80.47, 7.0], [80.5, 7.15]],
  },
  { tone: "var(--map-relief-2)", pts: [[80.68, 7.36], [80.72, 7.48], [80.78, 7.57], [80.86, 7.58], [80.93, 7.5], [80.94, 7.4], [80.88, 7.33], [80.78, 7.31]] },
  {
    tone: "var(--map-relief-3)",
    pts: [[80.64, 7.1], [80.72, 7.16], [80.82, 7.13], [80.9, 7.04], [80.92, 6.94], [80.88, 6.84], [80.8, 6.78], [80.7, 6.77], [80.62, 6.82], [80.58, 6.92], [80.6, 7.02]],
  },
  { tone: "var(--map-relief-3)", pts: [[80.47, 6.84], [80.53, 6.89], [80.58, 6.83], [80.52, 6.76]] },
  { tone: "var(--map-relief-3)", pts: [[80.75, 7.43], [80.79, 7.52], [80.86, 7.52], [80.88, 7.44], [80.82, 7.39]] },
];

// Lagoons drawn as water on top of the land.
const lagoons: LL[][] = [
  // Jaffna lagoon: separates the peninsula from the mainland
  [[79.97, 9.62], [80.12, 9.64], [80.28, 9.6], [80.42, 9.56], [80.34, 9.52], [80.16, 9.55], [80.0, 9.57]],
  // Puttalam lagoon
  [[79.79, 8.33], [79.84, 8.25], [79.83, 8.08], [79.8, 8.12], [79.79, 8.22]],
  // Batticaloa lagoon
  [[81.66, 7.78], [81.72, 7.66], [81.79, 7.5], [81.77, 7.49], [81.69, 7.64]],
];

// Mahaweli, the island's longest river: hill country → through Kandy → Trincomalee.
const mahaweli: LL[] = [
  [80.72, 6.95], [80.66, 7.1], [80.6, 7.22], [80.63, 7.3], [80.72, 7.33], [80.86, 7.38], [80.98, 7.48],
  [81.05, 7.66], [81.09, 7.9], [81.15, 8.15], [81.21, 8.35], [81.25, 8.47],
];

export const regionColor: Record<Region, string> = {
  hills: "#55613f",
  triangle: "#b4674c",
  south: "#c48a1c",
  east: "#3b7480",
};

/* ───────────── Pieces ───────────── */
function Pin({ p, on, hover }: { p: Place; on: boolean; hover: boolean }) {
  const x = px(p.lon);
  const y = py(p.lat);
  const color = regionColor[p.region];
  const s = on ? 1.35 : hover ? 1.15 : 1;
  const left = p.label === "left";

  return (
    <g>
      {on && (
        <>
          <circle cx={x} cy={y} r={10} fill={color} className="map-pulse" />
          <ellipse cx={x} cy={y + 1} rx={7} ry={2.5} fill="#000" opacity={0.18} />
        </>
      )}
      {/* Teardrop marker, tip on the location */}
      <g transform={`translate(${x} ${y}) scale(${s})`} className="transition-transform">
        <path
          d="M0 0 C-3 -6 -9 -10 -9 -17 A9 9 0 1 1 9 -17 C9 -10 3 -6 0 0Z"
          fill={color}
          stroke="#fff"
          strokeWidth={2}
          filter="url(#pin-shadow)"
        />
        {p.base ? (
          // Small house = home base
          <path d="M-4.5 -15.5 L0 -20 L4.5 -15.5 V-12 H-4.5Z" fill="#fff" />
        ) : (
          <circle cx={0} cy={-17} r={3.4} fill="#fff" />
        )}
      </g>
      <text
        x={left ? x - 12 : x + 12}
        y={y - 10}
        textAnchor={left ? "end" : "start"}
        className={`map-label ${on ? "font-bold" : hover ? "font-semibold" : "font-medium"}`}
        fontSize={on ? 14 : 12.5}
        fill={on || hover ? "var(--color-ink)" : "#4d5345"}
      >
        {p.name}
      </text>
      {p.base && (
        <text x={left ? x - 12 : x + 12} y={y + 4} textAnchor={left ? "end" : "start"} className="map-label" fontSize={10} fill="#6b705f" letterSpacing={1.5}>
          OUR BASE
        </text>
      )}
    </g>
  );
}

function Route({ to }: { to: Place }) {
  const base = places.find((p) => p.base)!;
  const [x1, y1, x2, y2] = [px(base.lon), py(base.lat), px(to.lon), py(to.lat)];
  // Gentle arc: control point offset perpendicular to the line.
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.hypot(dx, dy) || 1;
  const bend = Math.min(60, len * 0.25);
  const cx = mx - (dy / len) * bend;
  const cy = my + (dx / len) * bend;
  const d = `M${x1},${y1} Q${cx},${cy} ${x2},${y2}`;
  return (
    <g>
      <path d={d} fill="none" stroke="#fff" strokeWidth={5} strokeLinecap="round" opacity={0.8} />
      <path d={d} fill="none" stroke={regionColor[to.region]} strokeWidth={2.2} strokeLinecap="round" strokeDasharray="1 7" className="map-route" />
    </g>
  );
}

/* ───────────── Map ───────────── */
export function SriLankaMap({
  active,
  hover,
  onSelect,
  onHover,
}: {
  active: string;
  hover: string | null;
  onSelect: (slug: string) => void;
  onHover: (slug: string | null) => void;
}) {
  const activePlace = places.find((p) => p.slug === active)!;
  // Draw the active (and hovered) pin last so it sits on top.
  const ordered = [...places].sort((a, b) => Number(a.slug === active || a.slug === hover) - Number(b.slug === active || b.slug === hover));
  const scaleKm = 50;
  const scalePx = (scaleKm / 109.6) * K; // 1° lon ≈ 109.6 km at 7.5°N

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" role="img" aria-label="Illustrated map of Sri Lanka showing the places we guide in">
      <defs>
        <radialGradient id="sea" cx="55%" cy="45%" r="75%">
          <stop offset="0%" stopColor="var(--map-sea-light)" />
          <stop offset="100%" stopColor="var(--map-sea)" />
        </radialGradient>
        <pattern id="waves" width="34" height="18" patternUnits="userSpaceOnUse">
          <path d="M2 10 q4 -4 8 0 t8 0" fill="none" stroke="#fff" strokeWidth="1" opacity="0.45" />
        </pattern>
        <linearGradient id="land" x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0%" stopColor="var(--map-land-light)" />
          <stop offset="100%" stopColor="var(--map-land)" />
        </linearGradient>
        <filter id="coast-glow" x="-10%" y="-10%" width="120%" height="120%">
          <feMorphology in="SourceAlpha" operator="dilate" radius="5" result="grown" />
          <feGaussianBlur in="grown" stdDeviation="5" result="blur" />
          <feFlood floodColor="#fff" floodOpacity="0.55" />
          <feComposite in2="blur" operator="in" />
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="pin-shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="1.5" stdDeviation="1.5" floodOpacity="0.3" />
        </filter>
        <clipPath id="land-clip">
          <path d={smooth(mainland)} />
        </clipPath>
      </defs>

      {/* Sea */}
      <rect width={W} height={H} fill="url(#sea)" />
      <rect width={W} height={H} fill="url(#waves)" />

      {/* Graticule */}
      <g stroke="#fff" strokeOpacity={0.5} strokeDasharray="2 5" strokeWidth={1}>
        {[6, 7, 8, 9].map((lat) => (
          <line key={lat} x1={0} x2={W} y1={py(lat)} y2={py(lat)} />
        ))}
        {[80, 81, 82].map((lon) => (
          <line key={lon} y1={0} y2={H} x1={px(lon)} x2={px(lon)} />
        ))}
      </g>
      <g className="map-label" fontSize={9} fill="#5d7b80" letterSpacing={0.5}>
        {[6, 7, 8, 9].map((lat) => (
          <text key={lat} x={W - 6} y={py(lat) - 4} textAnchor="end">{lat}°N</text>
        ))}
        {[80, 81].map((lon) => (
          <text key={lon} x={px(lon) + 4} y={H - 8}>{lon}°E</text>
        ))}
      </g>

      {/* Sea names */}
      <g className="map-sea-label" fill="#5d7b80">
        <text x={px(81.35)} y={py(9.55)} textAnchor="middle" fontSize={12} letterSpacing={3}>BAY OF BENGAL</text>
        <text x={px(80.95)} y={py(5.78)} textAnchor="middle" fontSize={12} letterSpacing={4}>INDIAN OCEAN</text>
        <text x={px(79.5)} y={py(8.45)} fontSize={10} letterSpacing={2} transform={`rotate(-90 ${px(79.5)} ${py(8.45)})`}>GULF OF MANNAR</text>
        <text x={px(79.62)} y={py(9.9)} fontSize={10} letterSpacing={2}>PALK STRAIT</text>
      </g>

      {/* Land */}
      <g filter="url(#coast-glow)">
        <path d={smooth(mainland)} fill="url(#land)" stroke="var(--map-coast)" strokeWidth={1.4} strokeLinejoin="round" />
        <path d={smooth(mannar)} fill="url(#land)" stroke="var(--map-coast)" strokeWidth={1.2} />
        <path d={smooth(delft)} fill="url(#land)" stroke="var(--map-coast)" strokeWidth={1.2} />
      </g>

      {/* Relief + river, clipped to the coastline */}
      <g clipPath="url(#land-clip)">
        {relief.map((r, i) => (
          <path key={i} d={smooth(r.pts)} fill={r.tone} stroke="#fff" strokeOpacity={0.35} strokeWidth={1} />
        ))}
        <path d={smooth(mahaweli, false)} fill="none" stroke="var(--map-river)" strokeWidth={2} strokeLinecap="round" opacity={0.9} />
        {lagoons.map((l, i) => (
          <path key={i} d={smooth(l)} fill="var(--map-sea-light)" stroke="var(--map-coast)" strokeWidth={0.8} />
        ))}
      </g>

      {/* Landmarks (context only) */}
      <g className="map-label" fontSize={10} fill="#6b705f">
        {/* Adam's Peak */}
        <path d={`M${px(80.5)} ${py(6.81) - 6} l5 8 h-10Z`} fill="#6b705f" />
        <text x={px(80.5) - 8} y={py(6.81) + 2} textAnchor="end">Adam&apos;s Peak</text>
        {/* Colombo */}
        <circle cx={px(79.86)} cy={py(6.93)} r={3} fill="#fff" stroke="#6b705f" strokeWidth={1.5} />
        <text x={px(79.86) - 7} y={py(6.93) + 3.5} textAnchor="end">Colombo</text>
      </g>

      {/* Route + pins */}
      {!activePlace.base && <Route to={activePlace} />}
      {ordered.map((p) => (
        <g
          key={p.slug}
          className="cursor-pointer"
          onClick={() => onSelect(p.slug)}
          onMouseEnter={() => onHover(p.slug)}
          onMouseLeave={() => onHover(null)}
          aria-hidden
        >
          <Pin p={p} on={p.slug === active} hover={p.slug === hover} />
          {/* Generous invisible hit area */}
          <circle cx={px(p.lon)} cy={py(p.lat) - 14} r={18} fill="transparent" />
        </g>
      ))}

      {/* Compass */}
      <g transform={`translate(${W - 40} 44)`}>
        <circle r={22} fill="#fff" fillOpacity={0.75} stroke="#5d7b80" strokeOpacity={0.4} />
        <path d="M0 -17 L5 0 L0 -3 L-5 0Z" fill="var(--color-ink)" />
        <path d="M0 17 L5 0 L0 3 L-5 0Z" fill="#9aa59b" />
        <text y={-26} textAnchor="middle" className="map-label font-bold" fontSize={11} fill="var(--color-ink)">N</text>
      </g>

      {/* Scale bar */}
      <g transform={`translate(${W - 24 - scalePx} ${H - 26})`} className="map-label" fontSize={9} fill="#4d5345">
        <rect width={scalePx / 2} height={5} fill="var(--color-ink)" />
        <rect x={scalePx / 2} width={scalePx / 2} height={5} fill="#fff" stroke="var(--color-ink)" strokeWidth={0.8} />
        <text y={-5}>0</text>
        <text x={scalePx} y={-5} textAnchor="end">{scaleKm} km</text>
      </g>
    </svg>
  );
}
