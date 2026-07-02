import type { Metadata } from "next";
import TripBuilder from "@/components/plan/TripBuilder";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: `Plan a Trip | ${SITE_NAME}`,
};

/**
 * Stage 1 note: this page is structural only. It proves out the layout —
 * day list, map area, day detail panel — with local placeholder state.
 * Stage 2 wires this up to real trail data (seed from a selected trail),
 * drag-to-reorder, and the hotel/restaurant suggestion panel described in
 * the reference doc.
 */
export default function PlanPage() {
  return <TripBuilder />;
}
