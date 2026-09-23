"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProductCard } from "./ProductCard";
import { CATEGORIES, products } from "@/lib/data";
import { Product } from "@/types";
import { clsx } from "clsx";

export function ProductSection({ onView }: { onView: (p: Product) => void }) {
  const [active, setActive] = useState("all");

  const filtered =
    active === "all" ? products : products.filter(p => p.category === active);

  return (
    <section id="products" className="py-20">
      <div className="mx-auto max-w-[1300px] px-6">
        <p className="text-center text-xs font-bold uppercase tracking-[0.15em] text-neon">
          OUR PRODUCTS
        </p>
        <h2 className="mt-3 text-center text-3xl font-extrabold tracking-tight sm:text-5xl">
          Explore Our Products
        </h2>
        <p className="mx-auto mt-4 max-w-md text-center text-muted">
          Pilih produk yang kamu butuhkan dan mulai sekarang.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {CATEGORIES.map(c => (
            <button
              key={c.value}
              onClick={() => setActive(c.value)}
              className={clsx(
                "rounded-full border px-6 py-2 text-sm font-semibold transition",
                active === c.value
                  ? "border-neon bg-[rgba(0,224,255,0.1)] text-white shadow-[0_0_18px_rgba(0,224,255,0.15)]"
                  : "border-[rgba(0,224,255,0.2)] text-muted hover:border-neon hover:bg-[rgba(0,224,255,0.06)] hover:text-white"
              )}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div className="mt-12 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map(p => (
              <ProductCard key={p.id} product={p} onView={onView} />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}