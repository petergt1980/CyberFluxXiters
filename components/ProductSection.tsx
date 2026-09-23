"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ProductCard } from "./ProductCard";
import { CATEGORIES } from "@/lib/data";
import { Product } from "@/types";
import { clsx } from "clsx";
import { Loader2 } from "lucide-react";

export function ProductSection({
  onView,
}: {
  onView: (p: Product) => void;
}) {
  const [active, setActive] = useState("all");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/products")
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data)) {
          setProducts(data);
        }
      })
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

  const filtered =
    active === "all"
      ? products
      : products.filter(p => p.category === active);

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

        {loading ? (
          <div className="mt-12 flex justify-center py-20">
            <Loader2 className="animate-spin text-neon" size={32} />
          </div>
        ) : filtered.length === 0 ? (
          <div className="mt-12 py-20 text-center">
            <p className="text-muted">
              {products.length === 0
                ? "Belum ada produk. Tambahkan produk di dashboard admin."
                : "Tidak ada produk di kategori ini."}
            </p>
          </div>
        ) : (
          <div className="mt-12 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p, i) => (
              <motion.div
                key={p._id || i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <ProductCard product={p} onView={onView} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}