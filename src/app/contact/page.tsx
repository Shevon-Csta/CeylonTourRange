import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Contact | Ceylon Tour Range",
};

/** UI shell only — the form does not submit anywhere yet (no backend). */
export default function ContactPage() {
  return (
    <Container className="flex flex-col gap-8 py-20">
      <SectionHeading
        eyebrow="Contact"
        title="Get in touch"
        description="Form UI only for now — wiring it up to actually send a message is a backend-stage task."
      />
      <form className="flex max-w-lg flex-col gap-4">
        <input
          type="text"
          placeholder="Your name"
          className="rounded-lg border border-brand-dark/15 px-4 py-2.5 text-sm outline-none focus:border-brand-primary"
        />
        <input
          type="email"
          placeholder="Your email"
          className="rounded-lg border border-brand-dark/15 px-4 py-2.5 text-sm outline-none focus:border-brand-primary"
        />
        <textarea
          placeholder="Your message"
          rows={4}
          className="rounded-lg border border-brand-dark/15 px-4 py-2.5 text-sm outline-none focus:border-brand-primary"
        />
        <Button type="button" className="w-fit">
          Send Message
        </Button>
      </form>
    </Container>
  );
}
