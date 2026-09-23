"use client";

import { clsx } from "clsx";
import { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "outline" | "ghost" | "whatsapp";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

export function Button({ variant = "primary", className, children, ...rest }: Props) {
  const styles: Record<Variant, string> = {
    primary:
      "bg-neon text-bg font-bold shadow-[0_0_25px_rgba(0,224,255,0.35)] hover:shadow-glow-lg hover:-translate-y-0.5",
    outline:
      "bg-transparent border-[1.5px] border-[rgba(0,224,255,0.4)] text-white hover:border-neon hover:bg-[rgba(0,224,255,0.06)] hover:shadow-glow",
    ghost:
      "bg-transparent text-white/70 hover:text-neon",
    whatsapp:
      "bg-[#25D366] text-white font-semibold hover:bg-[#1ebe5a] shadow-[0_0_18px_rgba(37,211,102,0.35)] hover:shadow-[0_0_25px_rgba(37,211,102,0.6)]",
  };

  return (
    <button
      {...rest}
      className={clsx(
        "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-200 disabled:opacity-50",
        styles[variant],
        className
      )}
    >
      {children}
    </button>
  );
}