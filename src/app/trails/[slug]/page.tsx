import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import TrailHero from "@/components/trails/TrailHero";
import DayByDayPreview from "@/components/trails/DayByDayPreview";
import { trails, getTrailBySlug } from "@/lib/data/trails";

type PageParams = Promise<{ slug: string }>;

export function generateStaticParams() {
  return trails.map((trail) => ({ slug: trail.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: PageParams;
}): Promise<Metadata> {
  const { slug } = await params;
  const trail = getTrailBySlug(slug);
  return { title: trail ? `${trail.name} | Ceylon Tour Range` : "Trail not found" };
}

export default async function TrailDetailPage({ params }: { params: PageParams }) {
  const { slug } = await params;
  const trail = getTrailBySlug(slug);
  if (!trail) notFound();

  return (
    <>
      <TrailHero trail={trail} />

      <Container className="grid grid-cols-1 gap-12 py-16 lg:grid-cols-3">
        <div className="flex flex-col gap-6 lg:col-span-2">
          <SectionHeading eyebrow="Sample route" title="Day by day" />
          <DayByDayPreview trail={trail} />
          {trail.note ? (
            <p className="rounded-xl border-l-4 border-brand-primary bg-brand-primary/5 p-4 text-sm italic text-foreground/70">
              {trail.note}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col gap-8">
          <div>
            <SectionHeading eyebrow="Highlights" title="Signature activities" />
            <ul className="mt-4 flex flex-col gap-2">
              {trail.activities.map((activity) => (
                <li
                  key={activity}
                  className="rounded-lg bg-white px-4 py-2.5 text-sm text-foreground/80 shadow-sm"
                >
                  {activity}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <SectionHeading eyebrow="Getting around" title="Vehicle profile" />
            <p className="mt-4 rounded-lg bg-white px-4 py-3 text-sm text-foreground/80 shadow-sm">
              {trail.vehicleProfile}
            </p>
          </div>

          <ButtonLink href="/plan" className="w-full justify-center">
            Take This Trail Into the Planner
          </ButtonLink>
        </div>
      </Container>
    </>
  );
}
