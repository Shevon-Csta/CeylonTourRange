import type { Trail } from "@/lib/types";

export default function DayByDayPreview({ trail }: { trail: Trail }) {
  return (
    <ol className="flex flex-col gap-4">
      {trail.days.map((day) => (
        <li
          key={day.day}
          className="flex gap-4 rounded-xl border border-brand-dark/10 bg-white p-4"
        >
          <span
            className="flex h-9 w-16 shrink-0 items-center justify-center rounded-lg text-xs font-semibold text-white"
            style={{ backgroundColor: `var(--color-${trail.palette.base})` }}
          >
            {day.day}
          </span>
          <p className="text-sm text-foreground/80">{day.summary}</p>
        </li>
      ))}
    </ol>
  );
}
