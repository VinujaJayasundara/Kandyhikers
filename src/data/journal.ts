// Journal posts. Each body is a list of simple blocks, rendered by
// src/app/journal/[slug]/page.tsx. To add a post, add an object to `posts`.
// The starter posts below are drafts written for launch — review the facts
// and add your own stories and photos before publishing.

import { IMG } from "./trips";
import { site } from "./site";

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "list"; items: string[] }
  | { type: "tip"; text: string }
  | { type: "image"; src: string; alt: string; caption?: string };

export type PostCategory = "Trail guides" | "Culture" | "Planning" | "Wildlife";

export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  category: PostCategory;
  date: string; // ISO yyyy-mm-dd
  author: string;
  image: string;
  relatedTrips: string[]; // trip slugs
  body: Block[];
  draft?: boolean;
}

const TEAM = `${site.name} team`;

export const posts: Post[] = [
  {
    slug: "choosing-a-hike-near-kandy",
    title: "Hanthana, Knuckles or Alagalla? Choosing a hike near Kandy",
    excerpt: "Three very different mountains within easy reach of Kandy. Here's how to pick the one that suits your time, fitness and taste.",
    category: "Trail guides",
    date: "2026-11-10",
    author: TEAM,
    image: IMG.forest,
    relatedTrips: ["hanthana-mountain-range", "knuckles-mountain-range", "alagalla-mountain"],
    draft: true,
    body: [
      { type: "p", text: "One of the best things about staying in Kandy is how quickly you can leave the town behind. Within an hour you can be on a grassy ridge, deep in cloud forest or scrambling up a rocky peak. The question we get most often is simply: which one should I do?" },
      { type: "h2", text: "Hanthana: the easy escape" },
      { type: "p", text: "Hanthana rises right behind the city, so it's the quickest to reach. The trail crosses open grassland and a series of rounded peaks, with views back over Kandy and out across the hill country. It's a good half-day option if you only have a morning free, or if you want a moderate warm-up before something bigger." },
      { type: "h2", text: "Knuckles: the wild one" },
      { type: "p", text: "The Knuckles Range is part of the Central Highlands UNESCO World Heritage Site, and it feels remote in a way few places near a city do. Trails pass through cloud forest, small villages and waterfalls, and the weather can change fast. Plan a full day, bring a rain layer and expect to get muddy." },
      { type: "image", src: IMG.mountains, alt: "Forested mountain ridges under cloud", caption: "Cloud often sits on the higher ridges by mid-morning, so we start early." },
      { type: "h2", text: "Alagalla: the climber's choice" },
      { type: "p", text: "Alagalla sits above the Kadugannawa pass, west of Kandy. It's shorter than a full Knuckles trek but steeper, with rocky sections near the top. The reward is a wide view down the pass and the old railway line winding through it." },
      { type: "h2", text: "Quick comparison" },
      { type: "list", items: [
        "Short on time: Hanthana.",
        "Want forest, villages and wildlife: Knuckles.",
        "Want a steep, rocky summit: Alagalla.",
        "Travelling with children or beginners: Hanthana, at an easy pace.",
      ] },
      { type: "tip", text: "Whichever you pick, start early. Trails are cooler, views are clearer and you're back before the usual afternoon showers." },
    ],
  },
  {
    slug: "sigiriya-or-pidurangala",
    title: "Sunrise at Sigiriya or Pidurangala?",
    excerpt: "Lion Rock is the icon, but the best view of it is from next door. How to fit both into one day.",
    category: "Culture",
    date: "2026-10-22",
    author: TEAM,
    image: IMG.sigiriya,
    relatedTrips: ["sigiriya-rock-fortress"],
    draft: true,
    body: [
      { type: "p", text: "Sigiriya, the 5th-century rock fortress of King Kashyapa, is one of Sri Lanka's best-known sights and a UNESCO World Heritage Site. Just to the north is Pidurangala, a smaller rock with a Buddhist temple at its base and a famous view of Sigiriya from the top. Many visitors ask which one to climb. Our answer: both, in the right order." },
      { type: "h2", text: "Why Pidurangala for sunrise" },
      { type: "p", text: "Sigiriya's gates usually open after sunrise, while Pidurangala can be climbed in the dark with a guide and a torch. From the summit you watch the sun come up behind Lion Rock, which is the view on most postcards." },
      { type: "list", items: [
        "The path starts at the temple, so cover shoulders and knees and remove shoes where asked.",
        "The last section is a short scramble over boulders. Take it slowly.",
        "Bring water and a light layer; it can be breezy on top before dawn.",
      ] },
      { type: "image", src: IMG.pidurangala, alt: "Rock summit rising out of misty forest at dawn" },
      { type: "h2", text: "Then climb Sigiriya" },
      { type: "p", text: "After breakfast, head to Sigiriya when it opens. You'll walk through the royal water gardens, pass the frescoes and the mirror wall, and climb between the giant Lion's Paws to the palace ruins on the summit. Going early means fewer crowds and less heat on the stairs." },
      { type: "tip", text: "Midday on Sigiriya can be very hot and busy. If you can't go early, the late afternoon is the next best time." },
    ],
  },
  {
    slug: "hiking-sri-lanka-monsoons",
    title: "Hiking through Sri Lanka's two monsoons",
    excerpt: "Sri Lanka has two rainy seasons that hit different sides of the island. Here's how to plan around them.",
    category: "Planning",
    date: "2026-09-30",
    author: TEAM,
    image: IMG.mistyHiker,
    relatedTrips: ["ella-rock-scenic-hike", "pekoe-trail"],
    draft: true,
    body: [
      { type: "p", text: "People often ask when the 'dry season' is. The honest answer is that it depends where you're going. Sri Lanka has two main monsoons, and they bring rain to different parts of the island at different times of year." },
      { type: "h2", text: "The two monsoons" },
      { type: "list", items: [
        "South-west monsoon, roughly May to September: rain on the west and south coasts and the western hill slopes. The east coast is usually dry.",
        "North-east monsoon, roughly October to January: rain in the north and east, and often in the Knuckles and around Kandy. The south and west coasts dry out.",
      ] },
      { type: "p", text: "Between the two there are inter-monsoon periods, often with afternoon thunderstorms rather than all-day rain." },
      { type: "h2", text: "What this means for hiking" },
      { type: "p", text: "For the hill country around Kandy, Ella and the tea estates, January to April is usually the most reliable time, with clear mornings and cooler air. Outside those months you can still hike well; you just plan for early starts and keep a rain jacket handy." },
      { type: "tip", text: "Rain in the hills often comes in the afternoon. A sunrise start means most of your hike is done before the clouds roll in." },
      { type: "h2", text: "Pairing hikes with the coast" },
      { type: "p", text: "Because the monsoons alternate, you can almost always pair a hill-country hike with a dry beach: the south coast from December to March, or the east coast from May to September." },
    ],
  },
  {
    slug: "first-safari-sri-lanka",
    title: "Your first safari in Sri Lanka: leopards, elephants and etiquette",
    excerpt: "Which park to choose, when to go and how to be a good guest in the wild.",
    category: "Wildlife",
    date: "2026-08-18",
    author: TEAM,
    image: IMG.leopard,
    relatedTrips: ["national-parks-safari"],
    draft: true,
    body: [
      { type: "p", text: "A jeep safari is one of the easiest ways to see Sri Lanka's wildlife up close. Two parks stand out for first-timers, and they're good for very different animals." },
      { type: "h2", text: "Yala for leopards" },
      { type: "p", text: "Yala, in the south-east, is known worldwide for its leopards, and also has elephants, sloth bears, crocodiles and a huge variety of birds. It's popular, so going early and choosing a thoughtful driver makes a big difference." },
      { type: "h2", text: "Minneriya for elephants" },
      { type: "p", text: "Minneriya, in the Cultural Triangle, is famous for 'The Gathering', when large numbers of elephants come to the reservoir in the dry months, usually from around July to October. It's easy to combine with Sigiriya." },
      { type: "image", src: IMG.elephants, alt: "A herd of elephants grazing near water" },
      { type: "h2", text: "Being a good guest" },
      { type: "list", items: [
        "Stay inside the jeep at all times.",
        "Keep your voice down and never feed animals.",
        "Don't ask your driver to chase or crowd an animal; give it space and let it move on.",
        "Take your litter out with you.",
      ] },
      { type: "tip", text: "Bring binoculars, a hat and a light scarf. Park roads are dusty, and the best sightings are often at a distance." },
    ],
  },
];

export const sortedPosts = [...posts].sort((a, b) => b.date.localeCompare(a.date));
export const getPost = (slug: string) => posts.find((p) => p.slug === slug);

export function readingMinutes(post: Post) {
  const words = post.body
    .map((b) => (b.type === "list" ? b.items.join(" ") : b.type === "image" ? "" : b.text))
    .join(" ")
    .split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

export const formatDate = (iso: string) =>
  new Date(iso + "T00:00:00Z").toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
