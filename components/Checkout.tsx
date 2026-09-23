"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Button } from "./ui/Button";

export function Checkout({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { cart, total, clearCart } = useCart();
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({
    name: "",
    wa: "",
    email: "",
    payment: "QRIS",
  });

  const fmt = (n: number) => `Rp ${n.toLocaleString("id-ID")}`;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.wa || !form.email) return;
    setDone(true);
    setTimeout(() => {
      clearCart();
      setDone(false);
      onClose();
      setForm({ name: "", wa: "", email: "", payment: "QRIS" });
    }, 2200);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[400] flex items-center justify-center bg-black/70 p-4 backdrop-blur-md"
        >
          <motion.div
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl border border-[rgba(0,224,255,0.2)] bg-[rgba(8,14,28,0.98)] p-8 backdrop-blur-2xl"
          >
            <button
              onClick={onClose}
              className="absolute right-5 top-5 text-muted transition hover:text-neon"
            >
              <X size={22} />
            </button>

            {done ? (
              <div className="flex flex-col items-center py-12 text-center">
                <CheckCircle2 size={64} className="text-[#00ffaa]" />
                <h3 className="mt-4 text-2xl font-extrabold">Order Berhasil!</h3>
                <p className="mt-2 text-sm text-muted">
                  Tim kami akan menghubungi kamu via WhatsApp.
                </p>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-bold">Checkout</h2>
                <p className="mt-1 text-sm text-muted">
                  Lengkapi data untuk menyelesaikan pesanan.
                </p>

                <form onSubmit={submit} className="mt-6 space-y-4">
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted">
                      Nama
                    </label>
                    <input
                      required
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm outline-none focus:border-neon"
                      placeholder="Nama lengkap"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted">
                      WhatsApp
                    </label>
                    <input
                      required
                      value={form.wa}
                      onChange={e => setForm({ ...form, wa: e.target.value })}
                      className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm outline-none focus:border-neon"
                      placeholder="08xxxxxxxxxx"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted">
                      Email
                    </label>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                      className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm outline-none focus:border-neon"
                      placeholder="email@example.com"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted">
                      Metode Pembayaran
                    </label>
                    <select
                      value={form.payment}
                      onChange={e => setForm({ ...form, payment: e.target.value })}
                      className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm outline-none focus:border-neon"
                    >
                      <option value="QRIS">QRIS</option>
                      <option value="DANA">DANA</option>
                      <option value="OVO">OVO</option>
                      <option value="GoPay">GoPay</option>
                      <option value="Bank Transfer">Bank Transfer</option>
                    </select>
                  </div>

                  <div className="rounded-2xl border border-[rgba(0,224,255,0.1)] bg-white/[0.03] p-4">
                    <div className="mb-2 text-sm font-bold">Ringkasan Pesanan</div>
                    {cart.map(i => (
                      <div key={i.id} className="flex justify-between text-xs text-muted">
                        <span>
                          {i.title} × {i.quantity}
                        </span>
                        <span>{fmt(i.price * i.quantity)}</span>
                      </div>
                    ))}
                    <div className="mt-3 flex justify-between border-t border-white/5 pt-3 text-base font-extrabold">
                      <span>Total</span>
                      <span>{fmt(total)}</span>
                    </div>
                  </div>

                  <Button variant="primary" type="submit" className="w-full py-4">
                    Confirm Order
                  </Button>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}