import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import TrailCard from "@/components/trails/TrailCard";
import { trails } from "@/lib/data/trails";

export default function TrailShowcase() {
  return (
    <section className="py-16">
      <Container className="flex flex-col gap-10">
        <SectionHeading
          eyebrow="Four ways to see the island"
          title="Choose the experience that fits your trip"
          description="Every trail is a real, drivable route with its own pace and highlights. Start from a trail, then customize it once you're in the planner."
        />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {trails.map((trail) => (
            <TrailCard key={trail.slug} trail={trail} />
          ))}
        </div>
      </Container>
    </section>
  );
}
