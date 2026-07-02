import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { Calendar, Compass, SlidersHorizontal, CircleCheck } from "lucide-react";

const steps = [
  {
    Icon: Calendar,
    title: "Tell us your dates",
    description: "How many days are you in Sri Lanka? That's all we need to start.",
  },
  {
    Icon: Compass,
    title: "Pick a trail",
    description: "Coastal, cultural, wild, or modern — or blend two for a longer trip.",
  },
  {
    Icon: SlidersHorizontal,
    title: "Make it yours",
    description: "Swap stops, change the vehicle, pick hotels and restaurants along the way.",
  },
  {
    Icon: CircleCheck,
    title: "Book and go",
    description: "Confirm your itinerary and everything is arranged before you land.",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-brand-sand/50 py-16">
      <Container className="flex flex-col gap-10">
        <SectionHeading align="center" title="How it works" />
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(({ Icon, title, description }, index) => (
            <div key={title} className="flex flex-col items-center gap-3 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-brand-primary shadow-sm">
                <Icon className="h-6 w-6" strokeWidth={1.75} />
              </div>
              <span className="text-xs font-semibold uppercase tracking-wide text-brand-primary-dark">
                Step {index + 1}
              </span>
              <h3 className="font-display text-lg font-semibold text-brand-dark">{title}</h3>
              <p className="text-sm text-foreground/70">{description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
