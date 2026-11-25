// All tours and hikes live here as one list of `Trip`s.
// Facts taken from the original site: prices for Sigiriya, Ella, Safari and Diving,
// and duration/difficulty for Alagalla and Brandy Rock.
// Everything marked `draft: true` holds estimated copy — confirm before launch.

import { IMG, type Category, type Difficulty } from "./catalog";
export { IMG, categories, formatPrice, type Category, type Difficulty } from "./catalog";


export interface Trip {
  slug: string;
  title: string;
  category: Category;
  destination: string;
  summary: string;
  overview: string;
  duration: string;
  difficulty: Difficulty;
  groupSize: string;
  priceFrom: number | null; // LKR per person; null = price on request
  priceNote?: string;
  groupDiscount?: string;
  highlights: string[];
  itinerary: { title: string; detail: string }[];
  included: string[];
  excluded: string[];
  bring: string[];
  images: string[];
  featured?: boolean;
  draft?: boolean;
}




const STD_BRING = ["Comfortable hiking shoes", "1.5–2 L of water", "Rain jacket", "Sun protection", "Light snacks"];

export const trips: Trip[] = [
  // ───────────── Tours ─────────────
  {
    slug: "sigiriya-rock-fortress",
    title: "Sigiriya Rock Fortress Tour",
    category: "cultural",
    destination: "Sigiriya",
    summary: "Climb the 5th-century Lion Rock past frescoes and the mirror wall to a summit palace.",
    overview:
      "A guided day at Sri Lanka's most famous UNESCO site. We start early to beat the heat and the crowds, climb through the water gardens and the Lion's Paw terrace, and finish on the summit with views across the central plains.",
    duration: "Full day",
    difficulty: "Moderate",
    groupSize: "2–12 guests",
    priceFrom: 7500,
    priceNote: "per person",
    groupDiscount: "Group discount for 4 or more guests",
    highlights: ["Lion's Paw terrace", "Sigiriya frescoes", "Summit palace ruins", "Water gardens"],
    itinerary: [
      { title: "Early pick-up", detail: "Hotel pick-up in Kandy and drive to Sigiriya." },
      { title: "Gardens & frescoes", detail: "Walk the royal water gardens and see the frescoes." },
      { title: "Summit", detail: "Climb past the Lion's Paw to the summit palace." },
      { title: "Lunch & return", detail: "Village lunch, then back to Kandy." },
    ],
    included: ["Certified guide", "Transport", "Bottled water"],
    excluded: ["Site entrance ticket", "Lunch", "Tips"],
    bring: STD_BRING,
    images: [IMG.sigiriya, IMG.pidurangala, IMG.forest],
    featured: true,
  },
  {
    slug: "ella-rock-scenic-hike",
    title: "Ella Rock Scenic Hike Tour",
    category: "hiking",
    destination: "Ella",
    summary: "Railway-track trail, tea estates and a cliff-top view over Ella Gap.",
    overview:
      "Follow the railway line out of Ella, cut through eucalyptus and tea, and climb to the Ella Rock viewpoint. We pass the Nine Arch Bridge on the way back if the train timings work in our favour.",
    duration: "Half day",
    difficulty: "Moderate",
    groupSize: "2–10 guests",
    priceFrom: 5500,
    priceNote: "per person",
    groupDiscount: "Group discount for 3 or more participants",
    highlights: ["Ella Gap viewpoint", "Tea estate trail", "Nine Arch Bridge"],
    itinerary: [
      { title: "Railway walk", detail: "Start along the tracks from Ella station." },
      { title: "Forest climb", detail: "Climb through eucalyptus to the summit." },
      { title: "Viewpoint", detail: "Breakfast with a view over Ella Gap." },
      { title: "Nine Arch Bridge", detail: "Optional stop on the way back." },
    ],
    included: ["Certified guide", "Breakfast pack", "Bottled water"],
    excluded: ["Transport to Ella", "Tips"],
    bring: STD_BRING,
    images: [IMG.nineArch, IMG.hikerValley, IMG.tea],
    featured: true,
  },
  {
    slug: "national-parks-safari",
    title: "National Parks Safari",
    category: "wildlife",
    destination: "Yala / Minneriya",
    summary: "Jeep safari for leopards, elephant herds and over 200 bird species.",
    overview:
      "A morning or afternoon game drive in one of Sri Lanka's national parks, chosen by season: Yala for leopards, Minneriya for the elephant gathering. We work with operators who keep a respectful distance from the animals.",
    duration: "Half or full day",
    difficulty: "Easy",
    groupSize: "Up to 6 per jeep",
    priceFrom: 9500,
    priceNote: "per person",
    groupDiscount: "Group and family packages available",
    highlights: ["Leopard tracking", "Elephant herds", "Birdwatching"],
    itinerary: [
      { title: "Pick-up", detail: "Early pick-up and drive to the park gate." },
      { title: "Game drive", detail: "3–4 hours tracking wildlife with a naturalist." },
      { title: "Return", detail: "Lunch stop and return." },
    ],
    included: ["Safari jeep", "Naturalist guide", "Bottled water"],
    excluded: ["Park entrance fees", "Meals", "Tips"],
    bring: ["Binoculars", "Neutral-coloured clothing", "Hat", "Sun protection"],
    images: [IMG.leopard, IMG.elephant, IMG.elephants],
    featured: true,
  },
  {
    slug: "sri-lanka-diving-experience",
    title: "Sri Lanka Diving Experience",
    category: "beach",
    destination: "South coast",
    summary: "A beginner-friendly reef dive with a certified instructor. No experience needed.",
    overview:
      "Try scuba diving on a shallow reef with a certified instructor. The session covers a pool or shore briefing, kit fitting and a guided dive. Certified divers can book deeper wreck and reef dives.",
    duration: "Half day",
    difficulty: "Easy",
    groupSize: "1–4 per instructor",
    priceFrom: 18000,
    priceNote: "per person (beginner dive)",
    highlights: ["Coral reef", "Tropical fish", "Certified instructor"],
    itinerary: [
      { title: "Briefing", detail: "Safety briefing and equipment fitting." },
      { title: "Shallow practice", detail: "Practise skills in calm, shallow water." },
      { title: "Reef dive", detail: "Guided dive on the reef." },
    ],
    included: ["Full dive equipment", "Instructor", "Boat transfer"],
    excluded: ["Transport to the coast", "Underwater photos"],
    bring: ["Swimwear", "Towel", "Reef-safe sunscreen"],
    images: [IMG.diver, IMG.beachWhite, IMG.boats],
  },
  {
    slug: "sacred-kandy-tour",
    title: "Sacred Kandy Tour",
    category: "cultural",
    destination: "Kandy",
    summary: "Temple of the Tooth (Sri Dalada Maligawa), the royal lake and a Kandyan dance show.",
    overview:
      "A half-day walk through Sri Lanka's hill capital: the Temple of the Sacred Tooth Relic, the Kandy Lake promenade, the royal botanical gardens at Peradeniya and an evening cultural show.",
    duration: "Half day",
    difficulty: "Easy",
    groupSize: "2–12 guests",
    priceFrom: null,
    highlights: ["Sri Dalada Maligawa", "Kandy Lake", "Peradeniya Gardens", "Kandyan dance"],
    itinerary: [
      { title: "Temple of the Tooth", detail: "Guided visit at puja time." },
      { title: "Lake walk", detail: "Stroll around Kandy Lake." },
      { title: "Cultural show", detail: "Evening Kandyan dance performance." },
    ],
    included: ["Certified guide", "Transport within Kandy"],
    excluded: ["Entrance tickets", "Tips"],
    bring: ["Clothing that covers shoulders and knees", "Socks for temple floors"],
    images: [IMG.kandy, IMG.tea, IMG.forest],
    draft: true,
  },
  {
    slug: "sri-lanka-beach-escapes",
    title: "Sri Lanka Beach Escapes",
    category: "beach",
    destination: "South & east coast",
    summary: "Unwind on palm-lined bays after your highland adventures.",
    overview:
      "A flexible coastal add-on. We arrange transfers and recommend stays on the south or east coast depending on the monsoon season, with optional snorkelling and whale-watching.",
    duration: "2–4 days",
    difficulty: "Easy",
    groupSize: "Any",
    priceFrom: null,
    highlights: ["Palm-lined bays", "Snorkelling", "Seasonal whale watching"],
    itinerary: [
      { title: "Transfer", detail: "Private transfer from Kandy to the coast." },
      { title: "Beach days", detail: "Free days with optional activities." },
    ],
    included: ["Transfers", "Trip planning"],
    excluded: ["Accommodation", "Activities"],
    bring: ["Swimwear", "Reef-safe sunscreen"],
    images: [IMG.beachPalms, IMG.beachWhite, IMG.boats],
    draft: true,
  },
  {
    slug: "galle-fort-heritage-tour",
    title: "Galle Fort Heritage Tour",
    category: "cultural",
    destination: "Galle",
    summary: "Walk the ramparts of a 17th-century Dutch fort on the southern coast.",
    overview:
      "A guided walk inside the UNESCO-listed Galle Fort: ramparts, the lighthouse, colonial churches and the boutique lanes, finishing with a sunset on the walls.",
    duration: "Half day",
    difficulty: "Easy",
    groupSize: "2–12 guests",
    priceFrom: null,
    highlights: ["Fort ramparts", "Lighthouse", "Colonial architecture", "Sunset on the walls"],
    itinerary: [
      { title: "Ramparts", detail: "Walk the fort walls." },
      { title: "Old town", detail: "Lanes, churches and museums." },
      { title: "Sunset", detail: "Sunset from Flag Rock." },
    ],
    included: ["Certified guide"],
    excluded: ["Transport to Galle", "Museum tickets"],
    bring: ["Hat", "Sun protection", "Water"],
    images: [IMG.boats, IMG.beachPalms, IMG.beachWhite],
    draft: true,
  },

  // ───────────── Hikes ─────────────
  {
    slug: "hanthana-mountain-range",
    title: "Hanthana Mountain Range",
    category: "hiking",
    destination: "Kandy",
    summary: "Seven peaks, misty grasslands and tea estates right on Kandy's doorstep.",
    overview:
      "The classic Kandy hike. The trail crosses grassland ridges and pine forest above the city, with views back over Kandy on clear mornings.",
    duration: "4–6 hrs",
    difficulty: "Moderate",
    groupSize: "2–12 guests",
    priceFrom: null,
    highlights: ["Ridge-top views over Kandy", "Pine forest", "Tea estates"],
    itinerary: [
      { title: "Trailhead", detail: "Start near the Hanthana tea estate." },
      { title: "Ridge walk", detail: "Cross the grassland peaks." },
      { title: "Descent", detail: "Return through pine forest." },
    ],
    included: ["Certified guide", "Bottled water", "Snack pack"],
    excluded: ["Transport", "Tips"],
    bring: STD_BRING,
    images: [IMG.mistyHiker, IMG.tea, IMG.forest],
    featured: true,
    draft: true,
  },
  {
    slug: "knuckles-mountain-range",
    title: "Knuckles Mountain Range",
    category: "hiking",
    destination: "Knuckles",
    summary: "Cloud forest, waterfalls and remote villages in a UNESCO biosphere.",
    overview:
      "A full-day trek in the Knuckles Conservation Forest north-east of Kandy, through cloud forest and cardamom plantations to ridge viewpoints and waterfalls.",
    duration: "Full day",
    difficulty: "Challenging",
    groupSize: "2–10 guests",
    priceFrom: null,
    highlights: ["Cloud forest", "Waterfalls", "Village lunch"],
    itinerary: [
      { title: "Drive", detail: "Early drive from Kandy to the reserve." },
      { title: "Trek", detail: "Guided trek through the cloud forest." },
      { title: "Village lunch", detail: "Home-cooked lunch in a village." },
    ],
    included: ["Certified guide", "Lunch", "Forest permit"],
    excluded: ["Tips"],
    bring: [...STD_BRING, "Leech socks"],
    images: [IMG.forest, IMG.trail, IMG.mountains],
    featured: true,
    draft: true,
  },
  {
    slug: "pekoe-trail",
    title: "Pekoe Trail",
    category: "hiking",
    destination: "Hill country",
    summary: "Sections of Sri Lanka's 300 km long-distance trail through tea country.",
    overview:
      "Walk one or more stages of the Pekoe Trail along old tea-estate roads, between colonial bungalows, factories and hill-country villages.",
    duration: "1 day per stage",
    difficulty: "Moderate",
    groupSize: "2–10 guests",
    priceFrom: null,
    highlights: ["Tea estates", "Colonial bungalows", "Hill-country villages"],
    itinerary: [
      { title: "Stage start", detail: "Transfer to the chosen stage." },
      { title: "Trail", detail: "Guided walk through tea country." },
      { title: "Finish", detail: "Pick-up at the stage end." },
    ],
    included: ["Certified guide", "Bottled water"],
    excluded: ["Accommodation", "Transport"],
    bring: STD_BRING,
    images: [IMG.pekoeTrail, IMG.tea, IMG.hikerValley],
    draft: true,
  },
  {
    slug: "hunasgiriya-hike",
    title: "Hunasgiriya Hike",
    category: "hiking",
    destination: "Knuckles",
    summary: "A steep, quieter summit with wide views across the Knuckles range.",
    overview:
      "Hunasgiriya is one of the less-visited peaks near the Knuckles range. Steep jungle trails open up to a rocky summit with long views.",
    duration: "5–6 hrs",
    difficulty: "Challenging",
    groupSize: "2–8 guests",
    priceFrom: null,
    highlights: ["Quiet trails", "Rocky summit", "Knuckles views"],
    itinerary: [
      { title: "Trailhead", detail: "Drive to the village trailhead." },
      { title: "Summit", detail: "Steep climb to the rocky summit." },
      { title: "Return", detail: "Descent and drive back to Kandy." },
    ],
    included: ["Certified guide", "Bottled water"],
    excluded: ["Transport", "Tips"],
    bring: STD_BRING,
    images: [IMG.mountains, IMG.trail, IMG.forest],
    draft: true,
  },
  {
    slug: "alagalla-mountain",
    title: "Alagalla Mountain",
    category: "hiking",
    destination: "Kadugannawa",
    summary: "Rock faces and forest above the Kandy railway line, with views over the Kadugannawa pass.",
    overview:
      "Alagalla rises above the Kadugannawa pass between Kandy and Colombo. The trail goes through forest and up exposed rock to views over the railway and the valleys below.",
    duration: "3.5–4.5 hrs",
    difficulty: "Moderate to Challenging",
    groupSize: "2–10 guests",
    priceFrom: null,
    highlights: ["Rock scrambles", "Railway views", "Forest trail"],
    itinerary: [
      { title: "Trailhead", detail: "Start from the village below Alagalla." },
      { title: "Climb", detail: "Forest trail and rock sections." },
      { title: "Summit & return", detail: "Views over the pass, then descent." },
    ],
    included: ["Certified guide", "Bottled water"],
    excluded: ["Transport", "Tips"],
    bring: STD_BRING,
    images: [IMG.trail, IMG.mistyHiker, IMG.mountains],
  },
  {
    slug: "brandy-rock",
    title: "Brandy Rock",
    category: "hiking",
    destination: "Kandy",
    summary: "A demanding climb to an exposed rock summit with big views.",
    overview:
      "Brandy Rock is a tough climb with steep, exposed sections, best for fit hikers. The reward is one of the widest summit views in the region.",
    duration: "4–5 hrs",
    difficulty: "Challenging",
    groupSize: "2–8 guests",
    priceFrom: null,
    highlights: ["Exposed rock summit", "Wide panoramic views", "Steep forest trail"],
    itinerary: [
      { title: "Trailhead", detail: "Early start to avoid the midday heat." },
      { title: "Ascent", detail: "Steep climb with rock sections." },
      { title: "Summit & return", detail: "Rest on the summit, then descend." },
    ],
    included: ["Certified guide", "Bottled water"],
    excluded: ["Transport", "Tips"],
    bring: STD_BRING,
    images: [IMG.peaksClouds, IMG.trail, IMG.hikerValley],
    featured: true,
  },
];

export const getTrip = (slug: string) => trips.find((t) => t.slug === slug);

export const destinations = Array.from(new Set(trips.map((t) => t.destination)));


/** Just the fields a trip card needs; use toCard() before passing trips to client components. */
export type TripCardData = Pick<
  Trip,
  "slug" | "title" | "category" | "destination" | "summary" | "duration" | "difficulty" | "groupSize" | "priceFrom" | "featured" | "images"
>;
export const toCard = (t: Trip): TripCardData => ({
  slug: t.slug,
  title: t.title,
  category: t.category,
  destination: t.destination,
  summary: t.summary,
  duration: t.duration,
  difficulty: t.difficulty,
  groupSize: t.groupSize,
  priceFrom: t.priceFrom,
  featured: t.featured,
  images: t.images.slice(0, 1),
});

/** Trips at a place on the destinations map. */
export const tripsFor = (place: { tripDestinations: string[] }) =>
  trips.filter((t) => place.tripDestinations.includes(t.destination));
