import PlaceholderImage from "@/components/ui/PlaceholderImage";
import { ButtonLink } from "@/components/ui/Button";
import type { Trail } from "@/lib/types";

export default function TrailHero({ trail }: { trail: Trail }) {
  return (
    <section
      className="border-b border-brand-dark/10 py-14"
      style={{ backgroundColor: `var(--color-${trail.palette.light})` }}
    >
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-10 px-6 sm:px-8 lg:grid-cols-2">
        <div className="flex flex-col gap-4">
          <span
            className="w-fit rounded-full px-4 py-1.5 text-sm font-semibold text-white"
            style={{ backgroundColor: `var(--color-${trail.palette.base})` }}
          >
            {trail.givenName}
          </span>
          <h1 className="font-display text-4xl font-semibold text-brand-dark sm:text-5xl">
            {trail.name}
          </h1>
          <p className="max-w-lg text-lg text-foreground/70">{trail.description}</p>
          <p className="text-sm font-medium text-foreground/60">{trail.region}</p>
          <div className="flex flex-wrap gap-4 pt-2">
            <ButtonLink href="/plan">Start Planning This Trail</ButtonLink>
          </div>
        </div>
        <PlaceholderImage
          label={`${trail.name} hero image`}
          toneFrom={trail.palette.base}
          toneTo={trail.palette.dark}
          className="aspect-[4/3]"
        />
      </div>
    </section>
  );
}
