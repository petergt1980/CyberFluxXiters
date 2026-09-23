"use client";

import { Gamepad2, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "./ui/Badge";
import { Product } from "@/types";

export function ProductCard({ product, onView }: { product: Product; onView: (p: Product) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -6 }}
      onClick={() => onView(product)}
      className="group glass cursor-pointer overflow-hidden rounded-3xl transition-all duration-300 hover:border-[rgba(0,224,255,0.4)] hover:shadow-card"
    >
      <div className="relative flex h-[170px] items-center justify-center border-b border-[rgba(0,224,255,0.1)] bg-gradient-to-br from-[#0a1425] to-[#0e1a30]">
        <Gamepad2
          size={56}
          className="text-[rgba(0,224,255,0.25)] transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute left-3 right-3 top-3 flex flex-wrap justify-between gap-1.5">
          <Badge variant="undetected">UNDETECTED</Badge>
          {product.badge === "best" && <Badge variant="best">★ BEST</Badge>}
          {product.badge === "new" && <Badge variant="new">NEW</Badge>}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-base font-bold">{product.title}</h3>
        <p className="mt-0.5 text-xs font-semibold tracking-wide text-neon">
          {product.game}
        </p>
        <ul className="mt-3.5 flex-1 space-y-1.5 text-xs text-muted">
          {product.features.map(f => (
            <li key={f} className="flex items-center gap-2">
              <span className="text-neon">▹</span> {f}
            </li>
          ))}
        </ul>

        <div className="mt-4 flex items-end justify-between">
          <div>
            <div className="text-[0.6rem] uppercase tracking-[0.12em] text-muted">
              MULAI DARI
            </div>
            <div className="text-2xl font-extrabold">{product.priceLabel}</div>
          </div>
          <button
            onClick={e => {
              e.stopPropagation();
              onView(product);
            }}
            className="inline-flex items-center gap-1.5 rounded-full border border-[rgba(0,224,255,0.35)] px-4 py-2 text-xs font-semibold transition hover:bg-[rgba(0,224,255,0.1)] hover:border-neon"
          >
            View <ArrowRight size={12} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}