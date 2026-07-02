"use client";

import { motion } from "motion/react";
import Container from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import PlaceholderImage from "@/components/ui/PlaceholderImage";

export default function Hero() {
  return (
    <section className="overflow-hidden pb-20 pt-14 sm:pt-20">
      <Container className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col gap-6"
        >
          <span className="w-fit rounded-full bg-brand-primary/10 px-4 py-1.5 text-sm font-semibold text-brand-primary-dark">
            Your Sri Lanka trip, planned around what you love
          </span>
          <h1 className="font-display text-4xl font-semibold leading-tight text-brand-dark sm:text-5xl lg:text-6xl">
            Pick a trail.
            <br />
            We&apos;ll build the trip.
          </h1>
          <p className="max-w-lg text-lg text-foreground/70">
            Tell us how many days you have in Sri Lanka, choose a themed trail —
            coastal, cultural, wild, or modern — and get a ready-made
            day-by-day itinerary with transport and stays already suggested.
          </p>
          <div className="flex flex-wrap gap-4">
            <ButtonLink href="/plan">Start Planning</ButtonLink>
            <ButtonLink href="/trails" variant="outline">
              Explore the Trails
            </ButtonLink>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
          className="grid grid-cols-2 gap-4"
        >
          <PlaceholderImage
            label="Coastal — Galle Fort"
            toneFrom="coastal"
            className="col-span-2 aspect-[16/9]"
          />
          <PlaceholderImage label="Heritage — Sigiriya" toneFrom="heritage" className="aspect-square" />
          <PlaceholderImage label="Wild — Udawalawe" toneFrom="wild" className="aspect-square" />
        </motion.div>
      </Container>
    </section>
  );
}
