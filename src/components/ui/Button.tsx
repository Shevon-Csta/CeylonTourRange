import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

interface BaseProps {
  children: ReactNode;
  variant?: "primary" | "outline";
  className?: string;
}

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors duration-200";

const variants = {
  primary: "bg-brand-primary text-white hover:bg-brand-primary-dark",
  outline: "border border-brand-dark/20 text-brand-dark hover:bg-brand-dark/5",
};

/** Link-styled button — use for any primary/secondary call to action. */
export function ButtonLink({
  href,
  children,
  variant = "primary",
  className = "",
}: BaseProps & { href: string }) {
  return (
    <Link href={href} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </Link>
  );
}

/** Real <button> version, for actions that aren't navigation (form submit, etc.). */
export function Button({
  children,
  variant = "primary",
  className = "",
  ...rest
}: BaseProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...rest}>
      {children}
    </button>
  );
}
