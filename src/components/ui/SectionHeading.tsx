interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

/**
 * The eyebrow / title / description pattern used at the top of most page
 * sections (Home, Trail Overview, etc.). One component so heading sizes
 * and spacing stay consistent across the site.
 */
export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  const alignment = align === "center" ? "items-center text-center" : "items-start text-left";

  return (
    <div className={`flex flex-col gap-3 ${alignment}`}>
      {eyebrow ? (
        <span className="text-sm font-semibold uppercase tracking-wider text-brand-primary-dark">
          {eyebrow}
        </span>
      ) : null}
      <h2 className="font-display text-3xl font-semibold text-brand-dark sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="max-w-2xl text-base text-foreground/70 sm:text-lg">{description}</p>
      ) : null}
    </div>
  );
}
