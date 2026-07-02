import type { SVGProps } from "react";

/**
 * Lucide 1.0 dropped all brand/logo icons (Facebook, Instagram, YouTube,
 * etc.) — see https://lucide.dev/guide/react/migration. Their own
 * migration guide recommends custom SVGs, so these three are hand-authored
 * to match Lucide's stroke style (same viewBox, strokeWidth, linecap) so
 * they sit next to the rest of the icon set without looking out of place.
 *
 * WhatsApp uses lucide-react's own `MessageCircle` directly (still a
 * generic icon, unaffected by the 1.0 change) — see SocialLinks.tsx.
 */

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function FacebookIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="3" width="18" height="18" rx="4" />
      <path d="M14 8.5h-1.5a2 2 0 0 0-2 2V12H9v2h1.5v4.5h2V14H14l.4-2h-1.9v-1.5a.5.5 0 0 1 .5-.5H14z" />
    </svg>
  );
}

export function InstagramIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="3.5" />
      <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function YoutubeIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="2.5" y="6" width="19" height="12" rx="4" />
      <polygon points="10.5 9.5 15.5 12 10.5 14.5" fill="currentColor" stroke="none" />
    </svg>
  );
}
