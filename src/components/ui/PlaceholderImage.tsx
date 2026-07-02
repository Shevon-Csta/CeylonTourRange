import { Image as ImageIcon } from "lucide-react";

interface PlaceholderImageProps {
  label: string;
  toneFrom: string; // Tailwind color token, e.g. "coastal"
  toneTo?: string; // defaults to `${toneFrom}-dark`
  className?: string;
}

/**
 * Stand-in for real photography. This site is meant to be image-heavy
 * (hero shots, trail cards, day-by-day stops) but no licensed photography
 * exists yet — see README "Imagery" section for the plan to replace these.
 *
 * Swapping this out later is mechanical: replace <PlaceholderImage /> with
 * a Next <Image /> pointed at the real file in /public/images/trails/...,
 * same aspect ratio, same rounded corners. Nothing else about the layout
 * needs to change.
 */
export default function PlaceholderImage({
  label,
  toneFrom,
  toneTo,
  className = "",
}: PlaceholderImageProps) {
  const to = toneTo ?? `${toneFrom}-dark`;

  return (
    <div
      className={`placeholder-texture relative flex items-center justify-center overflow-hidden rounded-2xl ${className}`}
      style={{
        backgroundImage: `linear-gradient(135deg, var(--color-${toneFrom}), var(--color-${to}))`,
      }}
    >
      <div className="flex flex-col items-center gap-2 px-4 text-center text-white/90">
        <ImageIcon className="h-6 w-6" strokeWidth={1.5} />
        <span className="text-xs font-medium tracking-wide">{label}</span>
      </div>
    </div>
  );
}
