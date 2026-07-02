import { Facebook, Instagram, Youtube, MessageCircle } from "lucide-react";

/**
 * Social access points, as requested — Mayura hasn't provided the real
 * handles yet, so every href below is a placeholder ("#"). Swap in real
 * URLs as soon as they're available; nothing else needs to change.
 */
const links = [
  { label: "Facebook", href: "#", Icon: Facebook },
  { label: "Instagram", href: "#", Icon: Instagram },
  { label: "YouTube", href: "#", Icon: Youtube },
  { label: "WhatsApp", href: "#", Icon: MessageCircle },
];

export default function SocialLinks({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {links.map(({ label, href, Icon }) => (
        <a
          key={label}
          href={href}
          aria-label={label}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-current/15 text-current transition-colors hover:bg-current/10"
        >
          <Icon className="h-4 w-4" strokeWidth={1.75} />
        </a>
      ))}
    </div>
  );
}
