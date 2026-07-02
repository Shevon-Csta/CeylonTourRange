import Link from "next/link";
import { Palmtree } from "lucide-react";
import Container from "@/components/ui/Container";
import SocialLinks from "@/components/layout/SocialLinks";
import { trails } from "@/lib/data/trails";

const quickLinks = [
  { href: "/trails", label: "Explore Trails" },
  { href: "/plan", label: "Plan a Trip" },
  { href: "/trips", label: "My Trips" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="mt-24 bg-brand-dark text-brand-cream">
      <Container className="grid grid-cols-1 gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <Palmtree className="h-5 w-5 text-brand-primary" strokeWidth={1.75} />
            <span className="font-display text-base font-semibold">Ceylon Tour Range</span>
          </div>
          <p className="text-sm text-brand-cream/70">
            A themed trip planner for Sri Lanka — pick an experience, get a ready-made
            itinerary, make it your own.
          </p>
          <SocialLinks className="mt-2 text-brand-cream/80" />
        </div>

        <div className="flex flex-col gap-3">
          <span className="text-sm font-semibold uppercase tracking-wide text-brand-cream/50">
            Trails
          </span>
          {trails.map((trail) => (
            <Link
              key={trail.slug}
              href={`/trails/${trail.slug}`}
              className="text-sm text-brand-cream/80 hover:text-white"
            >
              {trail.name}
            </Link>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          <span className="text-sm font-semibold uppercase tracking-wide text-brand-cream/50">
            Quick Links
          </span>
          {quickLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm text-brand-cream/80 hover:text-white">
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          <span className="text-sm font-semibold uppercase tracking-wide text-brand-cream/50">
            Legal
          </span>
          <span className="text-sm text-brand-cream/50">Terms of Service — coming soon</span>
          <span className="text-sm text-brand-cream/50">Privacy Policy — coming soon</span>
        </div>
      </Container>

      <div className="border-t border-white/10 py-6">
        <Container className="flex flex-col items-center justify-between gap-2 text-xs text-brand-cream/50 sm:flex-row">
          <span>&copy; {new Date().getFullYear()} Ceylon Tour Range. All rights reserved.</span>
          <span>Built for Mr. Mayura.</span>
        </Container>
      </div>
    </footer>
  );
}
