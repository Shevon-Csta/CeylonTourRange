import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: `About Us | ${SITE_NAME}`,
};

export default function AboutPage() {
  return (
    <Container className="flex flex-col gap-6 py-20">
      <SectionHeading
        eyebrow="About Us"
        title={`About ${SITE_NAME}`}
        description="Company story, mission, and team content goes here — content pending from Mayura."
      />
    </Container>
  );
}
