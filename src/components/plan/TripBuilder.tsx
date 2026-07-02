"use client";

import { useState } from "react";
import { Plus, Trash2, Car, Hotel, UtensilsCrossed, MapPin } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import PlaceholderImage from "@/components/ui/PlaceholderImage";

interface BuilderDay {
  id: string;
  label: string;
  stop: string;
}

let nextId = 1;
const makeDay = (stop = "Untitled stop"): BuilderDay => ({
  id: `day-${nextId++}`,
  label: `Day ${nextId - 1}`,
  stop,
});

const startingDays: BuilderDay[] = [
  makeDay("Arrive Colombo, transfer to first stop"),
  makeDay("Explore and settle in"),
  makeDay("Signature activity for the trail"),
];

/**
 * Structural proof-of-concept for the Trip Builder. Local state only —
 * no persistence, no real map, no trail seeding yet. The point of this
 * pass is to get the layout (day list / day detail / map) right so
 * Stage 2 can focus purely on wiring real data into it.
 */
export default function TripBuilder() {
  const [days, setDays] = useState<BuilderDay[]>(startingDays);
  const [selectedId, setSelectedId] = useState(startingDays[0]?.id ?? "");

  const selectedDay = days.find((day) => day.id === selectedId) ?? days[0];

  function addDay() {
    const day = makeDay("New stop");
    setDays((prev) => [...prev, day]);
    setSelectedId(day.id);
  }

  function removeDay(id: string) {
    setDays((prev) => {
      const next = prev.filter((day) => day.id !== id);
      if (id === selectedId) setSelectedId(next[0]?.id ?? "");
      return next;
    });
  }

  return (
    <Container className="flex flex-col gap-8 py-16">
      <SectionHeading
        eyebrow="Trip Builder"
        title="Your itinerary"
        description="Not seeded from a trail yet — Stage 2 pre-fills this from whichever trail you start from. For now this proves out the day list / detail / map layout."
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[280px_1fr]">
        {/* Day list */}
        <div className="flex flex-col gap-2">
          {days.map((day) => (
            <button
              key={day.id}
              onClick={() => setSelectedId(day.id)}
              className={`flex items-center justify-between rounded-xl border px-4 py-3 text-left text-sm transition-colors ${
                day.id === selectedDay?.id
                  ? "border-brand-primary bg-brand-primary/10 text-brand-dark"
                  : "border-brand-dark/10 bg-white text-foreground/70 hover:border-brand-primary/40"
              }`}
            >
              <span>
                <span className="block font-semibold">{day.label}</span>
                <span className="block text-xs text-foreground/50">{day.stop}</span>
              </span>
              <Trash2
                className="h-4 w-4 shrink-0 text-foreground/30 hover:text-heritage"
                onClick={(event) => {
                  event.stopPropagation();
                  removeDay(day.id);
                }}
              />
            </button>
          ))}
          <button
            onClick={addDay}
            className="flex items-center justify-center gap-2 rounded-xl border border-dashed border-brand-dark/20 px-4 py-3 text-sm font-medium text-brand-dark/60 hover:border-brand-primary hover:text-brand-primary"
          >
            <Plus className="h-4 w-4" /> Add a day
          </button>
        </div>

        {/* Day detail + map */}
        <div className="flex flex-col gap-6">
          <PlaceholderImage
            label="Route map — placeholder"
            toneFrom="coastal"
            className="aspect-[16/6] w-full"
          />

          {selectedDay ? (
            <div className="rounded-2xl border border-brand-dark/10 bg-white p-6">
              <h3 className="font-display text-xl font-semibold text-brand-dark">
                {selectedDay.label}
              </h3>
              <p className="mt-1 flex items-center gap-1.5 text-sm text-foreground/60">
                <MapPin className="h-4 w-4" /> {selectedDay.stop}
              </p>

              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="flex flex-col gap-2 rounded-xl bg-brand-sand/40 p-4">
                  <Car className="h-5 w-5 text-brand-primary" />
                  <span className="text-xs font-semibold uppercase text-foreground/50">Vehicle</span>
                  <span className="text-sm text-foreground/80">Driver-facilitated (change)</span>
                </div>
                <div className="flex flex-col gap-2 rounded-xl bg-brand-sand/40 p-4">
                  <Hotel className="h-5 w-5 text-brand-primary" />
                  <span className="text-xs font-semibold uppercase text-foreground/50">Stay</span>
                  <span className="text-sm text-foreground/80">Suggestions load here</span>
                </div>
                <div className="flex flex-col gap-2 rounded-xl bg-brand-sand/40 p-4">
                  <UtensilsCrossed className="h-5 w-5 text-brand-primary" />
                  <span className="text-xs font-semibold uppercase text-foreground/50">Dining</span>
                  <span className="text-sm text-foreground/80">Suggestions load here</span>
                </div>
              </div>
            </div>
          ) : (
            <p className="rounded-2xl border border-dashed border-brand-dark/20 p-6 text-center text-sm text-foreground/50">
              Add a day to get started.
            </p>
          )}
        </div>
      </div>
    </Container>
  );
}
