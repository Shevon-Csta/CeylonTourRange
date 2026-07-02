import type { Trail } from "@/lib/types";

/**
 * The four themed trails, fleshed out from Mayura's original ideas into
 * real, drivable routes around Sri Lanka.
 *
 * This is a first pass — see CTR_Trip_Planner_Reference.docx in the project
 * root's parent folder for the full write-up (day-by-day reasoning, trail
 * combinations, open questions). Treat these as editable content, not
 * fixed copy: everything here is designed to be tweaked without touching
 * component code.
 */
export const trails: Trail[] = [
  {
    slug: "coastal-ceylon",
    name: "Coastal Ceylon",
    givenName: "Water theme",
    tagline: "The south and west coast, at sea level.",
    description:
      "Forts, reefs, and whales — a route down Sri Lanka's coastline for travellers drawn to the ocean.",
    region:
      "Colombo → Bentota → Galle → Unawatuna / Koggala → Mirissa → Tangalle / Hambantota",
    palette: { base: "coastal", dark: "coastal-dark", light: "coastal-light" },
    days: [
      { day: "Day 1", summary: "Arrive Colombo, transfer to Bentota. Evening on the beach." },
      { day: "Day 2", summary: "Bentota water sports (optional), drive to Galle. Sunset on the Fort ramparts." },
      { day: "Day 3", summary: "Snorkeling or diving at Unawatuna / Hikkaduwa. Move on to Koggala." },
      { day: "Day 4", summary: "Stilt fishermen at Koggala, then on to Mirissa." },
      { day: "Day 5", summary: "Dawn whale and dolphin watching, Mirissa. Afternoon saltern visit near Hambantota." },
      { day: "Day 6", summary: "Free morning on the coast, transfer back toward Colombo." },
    ],
    activities: [
      "Galle Fort walking tour",
      "Diving and coral-reef snorkeling",
      "Whale and dolphin watching by boat",
      "Traditional stilt fishermen at Koggala",
      "Saltern (salt pan) visit",
      "Beach time at Bentota, Unawatuna, or Tangalle",
    ],
    vehicleProfile:
      "AC car or van with driver for the coast road; boat transfers for whale watching and diving booked as add-ons.",
    note: "“Brine fishing” has been read as the traditional stilt fishing seen along the Koggala/Ahangama coast.",
  },
  {
    slug: "heritage-ceylon",
    name: "Heritage Ceylon",
    givenName: "Cultural theme",
    tagline: "The Cultural Triangle: temples, ruins, and the Tooth Relic.",
    description:
      "Sri Lanka's sacred sites and ancient capitals, from Kandy inland to Anuradhapura.",
    region: "Colombo → Kandy → Dambulla / Sigiriya → Anuradhapura",
    palette: { base: "heritage", dark: "heritage-dark", light: "heritage-light" },
    days: [
      { day: "Day 1", summary: "Arrive Colombo, transfer to Kandy." },
      { day: "Day 2", summary: "Temple of the Sacred Tooth Relic, Kandy Lake walk, evening Kandyan dance show." },
      { day: "Day 3", summary: "Spice garden stop, then Dambulla Cave Temple." },
      { day: "Day 4", summary: "Sigiriya Rock Fortress and water gardens." },
      { day: "Day 5", summary: "Anuradhapura sacred city — Sri Maha Bodhi, Ruwanwelisaya." },
      { day: "Day 6", summary: "Optional Polonnaruwa detour, then back toward Kandy / Colombo." },
    ],
    activities: [
      "Temple of the Sacred Tooth Relic, Kandy",
      "Dambulla Cave Temple",
      "Sigiriya Rock Fortress",
      "Anuradhapura's ancient stupas",
      "Kandyan cultural dance performance",
      "Optional: Polonnaruwa ruins",
    ],
    vehicleProfile:
      "Comfortable sedan or van with a driver-guide — historical commentary matters more here than on the other trails.",
  },
  {
    slug: "wild-ceylon",
    name: "Wild Ceylon",
    givenName: "Adventurous theme",
    tagline: "Hill country and the national parks.",
    description:
      "Safaris, hikes, and nights outdoors — the most active of the four trails.",
    region: "Colombo → Udawalawe / Yala → Ella → Kitulgala / Knuckles",
    palette: { base: "wild", dark: "wild-dark", light: "wild-light" },
    days: [
      { day: "Day 1", summary: "Arrive Colombo, transfer toward Udawalawe." },
      { day: "Day 2", summary: "Morning jeep safari at Udawalawe. Afternoon at the Elephant Transit Home." },
      { day: "Day 3", summary: "Drive to Ella. Hike Little Adam's Peak, visit Nine Arch Bridge." },
      { day: "Day 4", summary: "Transfer to Kitulgala. Kayaking / white-water rafting on the Kelani River." },
      { day: "Day 5", summary: "Off-road 4x4 trail through the Knuckles range. Camp overnight." },
      { day: "Day 6", summary: "Morning trek, then transfer back to Colombo." },
    ],
    activities: [
      "Jeep safari at Udawalawe or Yala",
      "Off-roading through the Knuckles range",
      "Camping under the stars",
      "Kayaking / white-water rafting, Kitulgala",
      "Pinnawala Elephant Orphanage (optional)",
      "Hiking — Little Adam's Peak, Ella Rock",
    ],
    vehicleProfile:
      "4x4 for safaris and off-road stretches. Self-drive rental fits most naturally on this trail.",
  },
  {
    slug: "modern-ceylon",
    name: "Modern Ceylon",
    givenName: "Modern experience theme",
    tagline: "Colombo, done well.",
    description:
      "Design, dining, and the city after dark — the shortest trail, works as an add-on to any of the other three.",
    region: "Colombo — city-based",
    palette: { base: "modern", dark: "modern-dark", light: "modern-light" },
    days: [
      { day: "Day 1", summary: "Fort and Galle Face precinct. Galle Face Green at sunset." },
      { day: "Day 2", summary: "Colombo National Museum and Gangaramaya Temple. Afternoon boutique shopping." },
      { day: "Day 3", summary: "Fine dining in the evening; rooftop bar to close out the trip." },
    ],
    activities: [
      "Colombo National Museum",
      "Gangaramaya Temple",
      "Fine dining restaurants",
      "Rooftop bars and Galle Face sunset",
      "Boutique shopping",
      "Optional day trip to Negombo",
    ],
    vehicleProfile:
      "Private chauffeur or short ride-hailing style hops — most of this trail is walkable.",
  },
];

export function getTrailBySlug(slug: string): Trail | undefined {
  return trails.find((trail) => trail.slug === slug);
}
