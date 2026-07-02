import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import TrailCard from "@/components/trails/TrailCard";
import { trails } from "@/lib/data/trails";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: `Explore Trails | ${SITE_NAME}`,
};

export default function TrailsPage() {
  return (
    <Container className="flex flex-col gap-10 py-16">
      <SectionHeading
        eyebrow="Explore Trails"
        title="Four trails, one island"
        description="Each trail is a themed route with its own pace, palette, and highlights. Open one to see the full day-by-day, then take it into the planner."
      />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {trails.map((trail) => (
          <TrailCard key={trail.slug} trail={trail} />
        ))}
      </div>
    </Container>
  );
}
