import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "About Us | Ceylon Tour Range",
};

export default function AboutPage() {
  return (
    <Container className="flex flex-col gap-6 py-20">
      <SectionHeading
        eyebrow="About Us"
        title="About Ceylon Tour Range"
        description="Company story, mission, and team content goes here — content pending from Mayura."
      />
    </Container>
  );
}
