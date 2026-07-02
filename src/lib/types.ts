/**
 * Shared domain types for the Trip Planner.
 *
 * Keeping these in one file means every component that touches trail or
 * itinerary data is working off the same shape — if the data model needs
 * to grow (e.g. adding pricing, or a fifth trail), this is the only file
 * that has to change first.
 */

export type TrailSlug =
  | "coastal-ceylon"
  | "heritage-ceylon"
  | "wild-ceylon"
  | "modern-ceylon";

/** The color tokens defined for a trail in globals.css (see @theme block). */
export interface TrailPalette {
  base: string; // e.g. "coastal" -> bg-coastal, text-coastal
  dark: string; // e.g. "coastal-dark"
  light: string; // e.g. "coastal-light"
}

export interface ItineraryDay {
  day: string; // "Day 1"
  summary: string;
}

export interface Trail {
  slug: TrailSlug;
  name: string; // "Coastal Ceylon"
  givenName: string; // client's original label, e.g. "Water theme"
  tagline: string;
  description: string;
  region: string;
  palette: TrailPalette;
  days: ItineraryDay[];
  activities: string[];
  vehicleProfile: string;
  note?: string; // flags an interpretation/assumption that needs confirming
}
