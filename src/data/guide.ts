// Content for /guide. General travel advice — review before launch,
// especially visa, booking and cancellation wording.

import type { Difficulty } from "./trips";

export const guideSections = [
  { id: "getting-here", label: "Getting here" },
  { id: "fitness", label: "Fitness levels" },
  { id: "packing", label: "Packing checklist" },
  { id: "culture", label: "Temples & culture" },
  { id: "health", label: "Health & safety" },
  { id: "money", label: "Money & practical" },
  { id: "faq", label: "Booking FAQ" },
] as const;

export const gettingHere = [
  {
    title: "Fly into Colombo",
    body: "International flights land at Bandaranaike International Airport (CMB) near Negombo. Most visitors need an Electronic Travel Authorisation (ETA) before arrival; check the official Sri Lanka immigration website for the current rules.",
  },
  {
    title: "Airport to Kandy",
    body: "About 3–4 hours by road. We can arrange a private transfer straight to your hotel, which is the easiest option after a long flight.",
  },
  {
    title: "By train",
    body: "Trains run from Colombo Fort to Kandy in around 3 hours. The line from Kandy on to Ella is one of the most scenic rail journeys in the world, so book reserved seats early.",
  },
  {
    title: "Getting around",
    body: "Tuk-tuks are everywhere for short hops; agree the fare first or use a ride app. For day trips, we include pick-up from your Kandy hotel on most experiences.",
  },
];

export const fitnessLevels: { level: Difficulty; body: string }[] = [
  { level: "Easy", body: "Gentle walking on good paths, short climbs. Fine for families and anyone reasonably active." },
  { level: "Moderate", body: "2–5 hours on foot with some steep, uneven sections. You should be comfortable walking for half a day." },
  { level: "Moderate to Challenging", body: "Long days or sustained climbs, with rocky or muddy ground. Regular exercise beforehand helps." },
  { level: "Challenging", body: "Steep ascents, scrambling and full-day effort. For fit, confident hikers with good footwear." },
];

export const packingList: { group: string; items: string[] }[] = [
  {
    group: "On your feet",
    items: ["Broken-in hiking boots or trail shoes", "Hiking socks (plus a spare pair)", "Sandals for evenings", "Leech socks (forest trails, wet months)"],
  },
  {
    group: "Clothing",
    items: ["Quick-dry T-shirts", "Light long trousers", "Packable rain jacket", "Warm layer for early starts in the hills", "Clothes covering shoulders & knees (temples)"],
  },
  {
    group: "In your daypack",
    items: ["1.5–2 L water bottle", "Sunscreen & sunglasses", "Hat or cap", "Insect repellent", "Snacks", "Small towel", "Dry bag or phone pouch"],
  },
  {
    group: "Essentials",
    items: ["Passport (or a copy)", "Travel insurance details", "Some cash in rupees", "Personal medication", "Power bank", "Plug adapter (types D & G)"],
  },
];

export const culture = [
  "Remove shoes and hats before entering temples. Socks help on hot stone floors.",
  "Cover shoulders and knees at religious sites. A sarong or scarf is easy to carry.",
  "Never pose with your back to a Buddha statue, and don't touch or climb on statues.",
  "Ask before photographing people, and avoid flash inside shrines.",
  "Use your right hand to give or receive things, especially money.",
  "Modest dress goes a long way in villages, even if beachwear is fine at the coast.",
];

export const health = [
  { title: "Water & food", body: "Drink bottled or filtered water. Street food is generally good; pick busy stalls." },
  { title: "Sun & heat", body: "The sun is strong even when it's cloudy. Start hikes early and drink more than you think you need." },
  { title: "Mosquitoes", body: "Dengue is present, so use repellent, especially at dawn and dusk. Ask your doctor about vaccinations before you travel." },
  { title: "Leeches", body: "Common in wet forests. They're harmless but annoying; leech socks and salt or repellent keep them off." },
  { title: "Insurance", body: "Make sure your travel insurance covers hiking and trekking." },
];

export const emergency = [
  { label: "Police", value: "119" },
  { label: "Tourist police", value: "1912" },
  { label: "Ambulance (Suwa Seriya)", value: "1990" },
  { label: "Fire", value: "110" },
];

export const practical = [
  { title: "Currency", body: "Sri Lankan rupee (LKR). ATMs are easy to find in Kandy and towns; carry cash for villages, tuk-tuks and small shops." },
  { title: "Cards", body: "Accepted at hotels and larger restaurants, less so elsewhere." },
  { title: "Tipping", body: "Not compulsory but appreciated. Many restaurants add a 10% service charge; tipping guides and drivers is customary if you enjoyed the day." },
  { title: "Power", body: "230 V, mostly type D and G sockets." },
  { title: "SIM & data", body: "Local SIMs with data are cheap and sold at the airport. Coverage is good except deep in the forest." },
  { title: "Language", body: "Sinhala and Tamil, with English widely spoken in tourism. 'Ayubowan' is a warm hello." },
];

// TODO: confirm booking, payment and cancellation wording with the business.
export const faq = [
  {
    title: "How do I book?",
    body: "Send an enquiry through WhatsApp or the contact form. We'll confirm dates, pick-up and price with you, and only then ask you to book. Nothing is charged to enquire.",
  },
  {
    title: "Are trips private or shared?",
    body: "Both. Most experiences can be private for your group, or you can join others to share the cost. Groups are kept to 12 people at most.",
  },
  {
    title: "Do you pick up from my hotel?",
    body: "Yes, for most day trips we pick up from hotels in and around Kandy. For other areas, ask and we'll arrange a meeting point or transfer.",
  },
  {
    title: "I'm travelling solo. Can I join?",
    body: "Of course. We can run a private trip for one, or match you with another group on the same day.",
  },
  {
    title: "Can children come?",
    body: "Many easy and moderate trips suit children. Tell us their ages and we'll recommend a suitable route.",
  },
  {
    title: "What happens if it rains?",
    body: "Light rain is normal in the hills and we usually go ahead. If your guide decides conditions aren't safe, we'll offer another date or a different route.",
  },
  {
    title: "What is your cancellation policy?",
    body: "See our cancellation policy page for the details, or ask us when you enquire.",
  },
];
