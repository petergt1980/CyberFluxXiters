import { clsx } from "clsx";
import { ReactNode } from "react";

export function GlassCard({
  children,
  className,
  hover = true,
}: {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}) {
  return (
    <div
      className={clsx(
        "glass rounded-3xl",
        hover && "glass-hover",
        className
      )}
    >
      {children}
    </div>
  );
}