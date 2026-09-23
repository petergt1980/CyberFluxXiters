import { clsx } from "clsx";
import { ReactNode } from "react";

type Variant = "undetected" | "best" | "new" | "neutral";

export function Badge({
  variant = "neutral",
  children,
  className,
}: {
  variant?: Variant;
  children: ReactNode;
  className?: string;
}) {
  const styles: Record<Variant, string> = {
    undetected:
      "bg-[rgba(0,255,170,0.12)] border border-[rgba(0,255,170,0.3)] text-[#00ffaa]",
    best:
      "bg-[rgba(255,200,0,0.12)] border border-[rgba(255,200,0,0.3)] text-[#ffd966]",
    new:
      "bg-[rgba(0,224,255,0.12)] border border-[rgba(0,224,255,0.3)] text-neon",
    neutral:
      "bg-white/5 border border-white/10 text-white/70",
  };

  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full px-3 py-1 text-[0.65rem] font-bold tracking-wide",
        styles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}