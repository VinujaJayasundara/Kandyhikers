// Places shown on /destinations. Each place lists the `trip.destination`
// values it covers, so trips are linked automatically from trips.ts.
// Drive times and seasons are general guidance — confirm before launch.

import { IMG } from "./catalog";

export type Region = "hills" | "triangle" | "south" | "east";

export const regions: Record<Region, { label: string; blurb: string }> = {
  hills: { label: "Hill country", blurb: "Misty ridges, tea estates and cloud forest around Kandy, our home base." },
  triangle: { label: "Cultural Triangle", blurb: "Ancient cities, rock fortresses and the island's best elephant parks." },
  south: { label: "South coast", blurb: "Colonial forts, palm-lined bays and calm reefs from November to April." },
  east: { label: "East & wild", blurb: "Surf, empty beaches and leopard country, at its best mid-year." },
};

export interface Place {
  slug: string;
  name: string;
  region: Region;
  lat: number;
  lon: number;
  label: "left" | "right"; // which side of the pin the map label sits
  blurb: string;
  fromKandy: string;
  bestTime: string;
  image: string;
  tripDestinations: string[];
  base?: boolean;
}

export const places: Place[] = [
  {
    slug: "kandy",
    name: "Kandy",
    region: "hills",
    lat: 7.29,
    lon: 80.63,
    label: "right",
    blurb: "The hill capital and home of the Temple of the Tooth. Hanthana and Brandy Rock start minutes from town.",
    fromKandy: "Our base",
    bestTime: "All year · driest Jan – Apr",
    image: IMG.kandy,
    tripDestinations: ["Kandy"],
    base: true,
  },
  {
    slug: "knuckles",
    name: "Knuckles Range",
    region: "hills",
    lat: 7.45,
    lon: 80.79,
    label: "right",
    blurb: "A UNESCO-listed cloud forest of knuckle-shaped peaks, remote villages and waterfalls.",
    fromKandy: "≈ 1.5 h drive",
    bestTime: "Jan – Apr",
    image: IMG.forest,
    tripDestinations: ["Knuckles"],
  },
  {
    slug: "alagalla",
    name: "Alagalla",
    region: "hills",
    lat: 7.25,
    lon: 80.52,
    label: "left",
    blurb: "A rocky ridge above the Kadugannawa pass, with views down the old railway line.",
    fromKandy: "≈ 45 min drive",
    bestTime: "Jan – Apr",
    image: IMG.mountains,
    tripDestinations: ["Kadugannawa"],
  },
  {
    slug: "tea-country",
    name: "Tea country",
    region: "hills",
    lat: 6.97,
    lon: 80.77,
    label: "right",
    blurb: "Rolling estates around Nuwara Eliya and the long-distance Pekoe Trail.",
    fromKandy: "≈ 3 h drive",
    bestTime: "Jan – Apr",
    image: IMG.tea,
    tripDestinations: ["Hill country"],
  },
  {
    slug: "ella",
    name: "Ella",
    region: "hills",
    lat: 6.87,
    lon: 81.05,
    label: "right",
    blurb: "A laid-back hill town known for Ella Rock, Little Adam's Peak and the Nine Arch Bridge.",
    fromKandy: "≈ 5 h drive or scenic train",
    bestTime: "Jan – Apr",
    image: IMG.nineArch,
    tripDestinations: ["Ella"],
  },
  {
    slug: "sigiriya",
    name: "Sigiriya",
    region: "triangle",
    lat: 7.96,
    lon: 80.76,
    label: "left",
    blurb: "The 5th-century Lion Rock fortress, with Pidurangala's sunrise view just next door.",
    fromKandy: "≈ 2.5 h drive",
    bestTime: "Jan – Apr, Jun – Sep",
    image: IMG.sigiriya,
    tripDestinations: ["Sigiriya"],
  },
  {
    slug: "minneriya",
    name: "Minneriya",
    region: "triangle",
    lat: 8.03,
    lon: 80.9,
    label: "right",
    blurb: "Home of 'The Gathering', when hundreds of elephants meet at the reservoir in the dry season.",
    fromKandy: "≈ 2.5 h drive",
    bestTime: "Jul – Oct",
    image: IMG.elephants,
    tripDestinations: ["Yala / Minneriya"],
  },
  {
    slug: "galle",
    name: "Galle",
    region: "south",
    lat: 6.03,
    lon: 80.22,
    label: "left",
    blurb: "A walled Dutch fort town of ramparts, lighthouses and quiet lanes.",
    fromKandy: "≈ 4.5 h drive",
    bestTime: "Dec – Mar",
    image: IMG.boats,
    tripDestinations: ["Galle"],
  },
  {
    slug: "mirissa",
    name: "Mirissa & south coast",
    region: "south",
    lat: 5.95,
    lon: 80.46,
    label: "right",
    blurb: "Palm-fringed bays, snorkelling, diving and whale watching.",
    fromKandy: "≈ 5 h drive",
    bestTime: "Nov – Apr",
    image: IMG.beachPalms,
    tripDestinations: ["South coast", "South & east coast"],
  },
  {
    slug: "yala",
    name: "Yala",
    region: "east",
    lat: 6.37,
    lon: 81.52,
    label: "left",
    blurb: "Sri Lanka's best-known park and one of the best places in the world to see leopards.",
    fromKandy: "≈ 6 h drive",
    bestTime: "Feb – Jul",
    image: IMG.leopard,
    tripDestinations: ["Yala / Minneriya"],
  },
  {
    slug: "arugam-bay",
    name: "Arugam Bay",
    region: "east",
    lat: 6.84,
    lon: 81.83,
    label: "left",
    blurb: "A surf village on the east coast, with lagoons and empty beaches nearby.",
    fromKandy: "≈ 6 h drive",
    bestTime: "May – Sep",
    image: IMG.beachWhite,
    tripDestinations: ["South & east coast"],
  },
];


/** Rough seasons by area: 2 = best, 1 = good, 0 = wetter / off-season. Jan → Dec. */
export const seasons: { area: string; months: (0 | 1 | 2)[] }[] = [
  { area: "Kandy & hill country", months: [2, 2, 2, 2, 1, 1, 1, 1, 1, 0, 0, 1] },
  { area: "Cultural Triangle", months: [2, 2, 2, 2, 1, 2, 2, 2, 2, 1, 0, 1] },
  { area: "South & west coast", months: [2, 2, 2, 1, 0, 0, 0, 0, 0, 0, 1, 2] },
  { area: "East coast", months: [0, 0, 0, 1, 2, 2, 2, 2, 2, 1, 0, 0] },
];
