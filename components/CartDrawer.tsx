"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, Minus, Plus, Gamepad2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Button } from "./ui/Button";
import { ToastContainer } from "./ui/Toast";
import { useToast } from "@/lib/useToast";

export function CartDrawer({ onCheckout }: { onCheckout: () => void }) {
  const {
    cart,
    cartOpen,
    setCartOpen,
    removeFromCart,
    updateQty,
    subtotal,
    discount,
    total,
    applyCoupon,
    discountPercent,
  } = useCart();

  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const toast = useToast();

  const handleApply = () => {
    const ok = applyCoupon(code);
    if (ok) {
      setError("");
      setCode("");
      toast.success(`Kupon "${code.toUpperCase()}" berhasil dipakai!`);
    } else {
      setError("Kode tidak valid");
      toast.error("Kode kupon tidak valid.");
    }
  };

  const handleRemove = (id: number, title: string) => {
    removeFromCart(id);
    toast.info(`${title} dihapus dari keranjang`);
  };

  const fmt = (n: number) => `Rp ${n.toLocaleString("id-ID")}`;

  return (
    <>
      <AnimatePresence>
        {cartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setCartOpen(false)}
              className="fixed inset-0 z-[150] bg-black/60 backdrop-blur-sm"
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 250 }}
              className="fixed right-0 top-0 z-[200] flex h-screen w-full max-w-md flex-col border-l border-[rgba(0,224,255,0.15)] bg-[rgba(5,9,18,0.97)] p-6 backdrop-blur-2xl"
            >
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold">Keranjang</h2>
                <button
                  onClick={() => setCartOpen(false)}
                  className="text-2xl text-muted transition hover:text-neon"
                >
                  <X size={22} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto">
                {cart.length === 0 ? (
                  <div className="py-10 text-center text-muted">
                    Keranjang masih kosong
                  </div>
                ) : (
                  cart.map(item => (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 border-b border-white/5 py-4"
                    >
                      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[rgba(0,224,255,0.06)] text-neon">
                        <Gamepad2 size={22} />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-semibold">
                          {item.title}
                        </div>
                        <div className="text-xs font-semibold text-neon">
                          {item.priceLabel}
                        </div>
                        <div className="mt-1 flex items-center gap-2">
                          <button
                            onClick={() =>
                              updateQty(item.id, item.quantity - 1)
                            }
                            className="flex h-6 w-6 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-xs font-bold transition hover:border-neon"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="w-6 text-center text-sm font-semibold">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQty(item.id, item.quantity + 1)
                            }
                            className="flex h-6 w-6 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-xs font-bold transition hover:border-neon"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                      </div>
                      <button
                        onClick={() => handleRemove(item.id, item.title)}
                        className="text-muted transition hover:text-red-400"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))
                )}
              </div>

              <div className="mt-4">
                <div className="flex gap-2.5">
                  <input
                    value={code}
                    onChange={e => setCode(e.target.value)}
                    placeholder="Kode kupon"
                    className="flex-1 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none focus:border-neon"
                  />
                  <button
                    onClick={handleApply}
                    className="rounded-xl border border-[rgba(0,224,255,0.3)] bg-[rgba(0,224,255,0.1)] px-5 py-3 text-sm font-semibold text-neon transition hover:bg-[rgba(0,224,255,0.2)]"
                  >
                    Pakai
                  </button>
                </div>
                {error && (
                  <p className="mt-1 text-xs text-red-400">{error}</p>
                )}
                {discountPercent > 0 && (
                  <p className="mt-1 text-xs text-[#00ffaa]">
                    Kupon aktif: -{discountPercent}%
                  </p>
                )}
              </div>

              <div className="mt-5 border-t border-white/5 pt-5">
                <div className="flex justify-between text-sm text-muted">
                  <span>Subtotal</span>
                  <span>{fmt(subtotal)}</span>
                </div>
                <div className="mt-2 flex justify-between text-sm text-muted">
                  <span>Diskon</span>
                  <span>-{fmt(discount)}</span>
                </div>
                <div className="mt-3 flex justify-between text-xl font-extrabold">
                  <span>Total</span>
                  <span>{fmt(total)}</span>
                </div>
              </div>

              <Button
                variant="primary"
                className="mt-5 w-full py-4"
                disabled={cart.length === 0}
                onClick={() => {
                  setCartOpen(false);
                  onCheckout();
                }}
              >
                Proceed to Checkout
              </Button>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Toast - selalu render di luar AnimatePresence */}
      <ToastContainer toasts={toast.toasts} onDismiss={toast.dismiss} />
    </>
  );
}