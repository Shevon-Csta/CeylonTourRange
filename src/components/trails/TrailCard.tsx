"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import PlaceholderImage from "@/components/ui/PlaceholderImage";
import type { Trail } from "@/lib/types";

export default function TrailCard({ trail }: { trail: Trail }) {
  return (
    <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.2, ease: "easeOut" }}>
      <Link
        href={`/trails/${trail.slug}`}
        className="group flex h-full flex-col gap-4 rounded-2xl border border-brand-dark/10 bg-white p-4 shadow-sm transition-shadow hover:shadow-lg"
      >
        <PlaceholderImage
          label={`${trail.name} hero image`}
          toneFrom={trail.palette.base}
          toneTo={trail.palette.dark}
          className="aspect-[4/3]"
        />
        <div className="flex flex-1 flex-col gap-2 px-1 pb-1">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-xl font-semibold text-brand-dark">{trail.name}</h3>
            <ArrowUpRight className="h-4 w-4 text-brand-dark/40 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand-primary" />
          </div>
          <p className="text-sm text-foreground/70">{trail.tagline}</p>
          <span
            className="mt-auto w-fit rounded-full px-3 py-1 text-xs font-semibold text-white"
            style={{ backgroundColor: `var(--color-${trail.palette.base})` }}
          >
            {trail.days.length} day core route
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
