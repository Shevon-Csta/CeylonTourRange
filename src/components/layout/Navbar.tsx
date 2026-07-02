"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Palmtree } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Container from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";

const navLinks = [
  { href: "/trails", label: "Explore Trails" },
  { href: "/plan", label: "Plan a Trip" },
  { href: "/trips", label: "My Trips" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-brand-dark/10 bg-brand-cream/90 backdrop-blur">
      <Container className="flex h-18 items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <Palmtree className="h-6 w-6 text-brand-primary" strokeWidth={1.75} />
          <span className="font-display text-lg font-semibold text-brand-dark">
            Ceylon Tour Range
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => {
            const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  active ? "text-brand-primary-dark" : "text-brand-dark/80 hover:text-brand-dark"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <ButtonLink href="/plan" className="ml-2">
            Start Planning
          </ButtonLink>
        </nav>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          className="flex h-10 w-10 items-center justify-center rounded-full text-brand-dark md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </Container>

      <AnimatePresence>
        {open ? (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden border-t border-brand-dark/10 md:hidden"
          >
            <Container className="flex flex-col gap-1 py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-2 py-2.5 text-sm font-medium text-brand-dark/80 hover:bg-brand-dark/5"
                >
                  {link.label}
                </Link>
              ))}
              <ButtonLink href="/plan" className="mt-2 w-full">
                Start Planning
              </ButtonLink>
            </Container>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
