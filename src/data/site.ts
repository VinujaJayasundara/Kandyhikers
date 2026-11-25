// Single source of truth for brand + contact details.
// TODO: replace the placeholder email with the real one.
export const site = {
  name: "Kandy Hikers",
  tagline: "Guided hikes & adventure tours from Kandy",
  description:
    "Explore Kandy, Sri Lanka — a hub of scenic mountains, tea plantations and ancient heritage — with certified local guides.",
  address: "109 Ampitiya Road, Kandy, Sri Lanka",
  phone: "+94 71 429 3251",
  email: "hello@hikingsrilanka.com", // TODO
  whatsapp: "94714293251", // digits only, country code first
  leadGuide: "Major Ivor Jayasundara",
  socials: {
    facebook: "https://facebook.com/",
    instagram: "https://instagram.com/",
    x: "https://x.com/",
  },
};

export function whatsappLink(message?: string) {
  const text = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${site.whatsapp}${text}`;
}
