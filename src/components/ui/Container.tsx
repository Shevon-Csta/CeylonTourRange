import type { ReactNode } from "react";

/**
 * Shared max-width / horizontal padding wrapper. Every page section should
 * be wrapped in this instead of repeating the same padding classes —
 * keeps page width consistent site-wide and gives us one place to change
 * it later.
 */
export default function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-6xl px-6 sm:px-8 ${className}`}>
      {children}
    </div>
  );
}
