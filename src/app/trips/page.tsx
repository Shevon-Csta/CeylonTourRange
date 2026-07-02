import type { Metadata } from "next";
import { MapPinned } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: `My Trips | ${SITE_NAME}`,
};

/**
 * Stage 1: empty-state only. Once accounts/auth exist (a backend-stage
 * concern), this becomes a list of the user's saved itineraries.
 */
export default function TripsPage() {
  return (
    <Container className="flex flex-col items-center gap-6 py-24 text-center">
      <SectionHeading align="center" eyebrow="My Trips" title="No saved trips yet" />
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-brand-primary/10 text-brand-primary">
        <MapPinned className="h-9 w-9" strokeWidth={1.5} />
      </div>
      <p className="max-w-md text-sm text-foreground/60">
        Once you build or save an itinerary, it will show up here alongside your booking
        history and notifications.
      </p>
      <ButtonLink href="/trails">Explore Trails to Get Started</ButtonLink>
    </Container>
  );
}
