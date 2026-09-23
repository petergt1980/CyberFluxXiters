"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "./ui/Button";
import { GlassCard } from "./ui/GlassCard";

interface OrderResult {
  orderId: string;
  product: string;
  paymentStatus: string;
  deliveryStatus: string;
  purchaseDate: string;
  customer: string;
  whatsapp: string;
  total: string;
  status: "COMPLETED" | "PROCESSING" | "PENDING";
}

const MOCK_ORDERS: Record<string, OrderResult> = {
  "CYBER-2026-001": {
    orderId: "CYBER-2026-001",
    product: "ANDROID PREMIUM",
    paymentStatus: "PAID",
    deliveryStatus: "DELIVERED",
    purchaseDate: "2026-01-15",
    customer: "Rizky",
    whatsapp: "0812-3456-7890",
    total: "Rp 20.000",
    status: "COMPLETED",
  },
  "CYBER-2026-002": {
    orderId: "CYBER-2026-002",
    product: "CS2 PREMIUM",
    paymentStatus: "PENDING",
    deliveryStatus: "WAITING PAYMENT",
    purchaseDate: "2026-01-20",
    customer: "Dewi",
    whatsapp: "0812-1111-2222",
    total: "Rp 50.000",
    status: "PENDING",
  },
  "CYBER-2026-003": {
    orderId: "CYBER-2026-003",
    product: "ROBLOX PREMIUM",
    paymentStatus: "PAID",
    deliveryStatus: "PROCESSING",
    purchaseDate: "2026-01-22",
    customer: "Andi",
    whatsapp: "0812-3333-4444",
    total: "Rp 15.000",
    status: "PROCESSING",
  },
};

export function OrderTracker() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<OrderResult | null>(null);
  const [error, setError] = useState("");

  const track = () => {
    const found = MOCK_ORDERS[query.trim().toUpperCase()];
    if (found) {
      setResult(found);
      setError("");
    } else {
      setResult(null);
      setError("Order ID tidak ditemukan. Coba: CYBER-2026-001");
    }
  };

  const statusClass =
    result?.status === "COMPLETED"
      ? "bg-[rgba(0,255,170,0.12)] border border-[rgba(0,255,170,0.3)] text-[#00ffaa]"
      : result?.status === "PROCESSING"
      ? "bg-[rgba(0,224,255,0.12)] border border-[rgba(0,224,255,0.3)] text-neon"
      : "bg-[rgba(255,200,0,0.12)] border border-[rgba(255,200,0,0.3)] text-[#ffd966]";

  return (
    <section className="py-20">
      <div className="mx-auto max-w-[1300px] px-6">
        <p className="text-center text-xs font-bold uppercase tracking-[0.15em] text-neon">
          CEK ORDER
        </p>
        <h2 className="mt-3 text-center text-3xl font-extrabold tracking-tight sm:text-5xl">
          Lacak Pesanan Kamu
        </h2>
        <p className="mx-auto mt-4 max-w-md text-center text-muted">
          Masukkan Order ID untuk melihat status pesanan.
        </p>

        <GlassCard className="mx-auto mt-10 max-w-xl p-8">
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={e => e.key === "Enter" && track()}
              placeholder="Contoh: CYBER-2026-001"
              className="flex-1 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 text-sm outline-none focus:border-neon"
            />
            <Button variant="primary" onClick={track} className="px-8 py-4">
              <Search size={16} /> Cek Order
            </Button>
          </div>

          {error && <p className="mt-3 text-sm text-red-400">{error}</p>}

          {result && (
            <div className="mt-6">
              <div className={`inline-block rounded-full px-5 py-1.5 text-xs font-bold tracking-wider ${statusClass}`}>
                {result.status}
              </div>
              <div className="mt-4 space-y-2">
                {[
                  ["Order ID", result.orderId],
                  ["Produk", result.product],
                  ["Status Pembayaran", result.paymentStatus],
                  ["Status Pengiriman", result.deliveryStatus],
                  ["Tanggal Pembelian", result.purchaseDate],
                  ["Nama Customer", result.customer],
                  ["WhatsApp", result.whatsapp],
                  ["Total", result.total],
                ].map(([k, v]) => (
                  <div
                    key={k}
                    className="flex justify-between border-b border-white/5 py-2.5 text-sm"
                  >
                    <span className="text-muted">{k}</span>
                    <span className="font-semibold">{v}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </GlassCard>
      </div>
    </section>
  );
}