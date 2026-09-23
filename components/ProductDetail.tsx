"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Gamepad2, ShoppingCart, Zap } from "lucide-react";
import { Button } from "./ui/Button";
import { Badge } from "./ui/Badge";
import { Product } from "@/types";
import { useCart } from "@/context/CartContext";

export function ProductDetail({
  product,
  onClose,
}: {
  product: Product | null;
  onClose: () => void;
}) {
  const { addToCart, setCartOpen } = useCart();

  if (!product) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-[300] flex items-center justify-center bg-black/70 p-4 backdrop-blur-md"
      >
        <motion.div
          initial={{ scale: 0.95, y: 20, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.95, y: 20, opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={e => e.stopPropagation()}
          className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-[rgba(0,224,255,0.2)] bg-[rgba(8,14,28,0.98)] p-8 backdrop-blur-2xl"
        >
          <button
            onClick={onClose}
            className="absolute right-5 top-5 text-2xl text-muted transition hover:text-neon"
          >
            <X size={22} />
          </button>

          <div className="mb-6 flex h-[220px] items-center justify-center rounded-2xl border border-[rgba(0,224,255,0.15)] bg-gradient-to-br from-[#0a1425] to-[#0e1a30]">
            <Gamepad2 size={64} className="text-[rgba(0,224,255,0.3)]" />
          </div>

          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-3xl font-extrabold">{product.title}</h2>
              <p className="mt-1 text-sm font-semibold text-neon">{product.game}</p>
            </div>
            <Badge variant="undetected">UNDETECTED</Badge>
          </div>

          <p className="mt-5 text-sm leading-relaxed text-muted">{product.description}</p>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="rounded-2xl border border-[rgba(0,224,255,0.1)] bg-white/[0.03] p-4">
              <div className="text-[0.65rem] uppercase tracking-widest text-muted">Version</div>
              <div className="mt-1 font-semibold">{product.version}</div>
            </div>
            <div className="rounded-2xl border border-[rgba(0,224,255,0.1)] bg-white/[0.03] p-4">
              <div className="text-[0.65rem] uppercase tracking-widest text-muted">Compatibility</div>
              <div className="mt-1 font-semibold">{product.compatibility}</div>
            </div>
            <div className="col-span-2 rounded-2xl border border-[rgba(0,224,255,0.1)] bg-white/[0.03] p-4">
              <div className="text-[0.65rem] uppercase tracking-widest text-muted">Delivery</div>
              <div className="mt-1 font-semibold">{product.delivery}</div>
            </div>
          </div>

          <div className="mt-6">
            <h4 className="mb-3 text-sm font-bold uppercase tracking-wider text-muted">Fitur</h4>
            <ul className="space-y-2">
              {product.features.map(f => (
                <li key={f} className="flex items-center gap-2 text-sm text-muted">
                  <span className="text-neon">✔</span> {f}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-7 text-3xl font-extrabold">{product.priceLabel}</div>

          <div className="mt-5 flex flex-wrap gap-3.5">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => {
                addToCart(product);
                onClose();
                setCartOpen(true);
              }}
            >
              <ShoppingCart size={16} /> Add to Cart
            </Button>
            <Button
              variant="primary"
              className="flex-1"
              onClick={() => {
                addToCart(product);
                onClose();
                setCartOpen(true);
              }}
            >
              <Zap size={16} /> Buy Now
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}