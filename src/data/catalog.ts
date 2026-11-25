// Small, client-safe pieces shared by server and client components.
// Keep heavy trip content in trips.ts so it never ships to the browser.

export type Category = "hiking" | "cultural" | "wildlife" | "beach";
export type Difficulty = "Easy" | "Moderate" | "Moderate to Challenging" | "Challenging";

const u = (id: string) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1800&q=80`;

export const IMG = {
  pidurangala: u("1588598198321-9735fd52455b"),
  sigiriya: u("1612862862126-865765df2ded"),
  nineArch: u("1566296314736-6eaac1ca0cb9"),
  forest: u("1473773508845-188df298d2d1"),
  campfire: u("1478131143081-80f7f84ca84d"),
  hikerValley: u("1501555088652-021faa106b9b"),
  tent: u("1504280390367-361c6d9f38f4"),
  mistyHiker: u("1533240332313-0db49b459ad6"),
  trail: u("1551632811-561732d1e306"),
  diver: u("1544551763-46a013bb70d5"),
  beachPalms: u("1580910527739-556eb89f9d65"),
  beachWhite: u("1586500036706-41963de24d8b"),
  boats: u("1552055568-f8c4fb8c6320"),
  leopard: u("1456926631375-92c8ce872def"),
  elephant: u("1557050543-4d5f4e07ef46"),
  elephants: u("1564760055775-d63b17a55c44"),
  // Real Sri Lanka photos from the business, served from /public/images.
  tea: "/images/tea-estate.jpg",
  kandy: "/images/kandy-temple-of-the-tooth.jpg",
  pekoeTrail: "/images/pekoe-trail-hike.jpg",
  peaksClouds: u("1506905925346-21bda4d32df4"),
  mountains: u("1464822759023-fed622ff2c3b"),
};

export const categories: Record<Category, { label: string; blurb: string; image: string }> = {
  hiking: {
    label: "Hikes & Treks",
    blurb: "Cloud forests, tea-country ridgelines and summit sunrises around Kandy and the hill country.",
    image: IMG.trail,
  },
  cultural: {
    label: "Cultural Tours",
    blurb: "Ancient rock fortresses, sacred temples and colonial forts with guides who grew up beside them.",
    image: IMG.sigiriya,
  },
  wildlife: {
    label: "Wildlife & Safari",
    blurb: "Leopards, elephants and birdlife in Sri Lanka's national parks, with responsible operators.",
    image: IMG.leopard,
  },
  beach: {
    label: "Beach & Diving",
    blurb: "Reef dives, quiet bays and coastal escapes to wind down after the mountains.",
    image: IMG.beachPalms,
  },
};

export function formatPrice(trip: { priceFrom: number | null }) {
  if (trip.priceFrom === null) return "Price on request";
  return `LKR ${trip.priceFrom.toLocaleString("en-US")}`;
}
