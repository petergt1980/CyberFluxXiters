"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Package,
  CheckCircle2,
  Clock,
  XCircle,
  Loader2,
  Truck,
  CreditCard,
  Calendar,
  User,
  Phone,
  Mail,
  Hash,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingButtons } from "@/components/FloatingButtons";
import { GlassCard } from "@/components/ui/GlassCard";

/* ---------------- Types ---------------- */

type OrderStatus =
  | "PENDING"
  | "PAID"
  | "PROCESSING"
  | "COMPLETED"
  | "CANCELLED";

interface Order {
  orderId: string;
  product: string;
  game: string;
  status: OrderStatus;
  paymentStatus: string;
  deliveryStatus: string;
  purchaseDate: string;
  customer: string;
  whatsapp: string;
  email: string;
  total: string;
  price: string;
}

/* ---------------- Mock Data ---------------- */

const MOCK_ORDERS: Record<string, Order> = {
  "CYBER-20260115-A1B2C3": {
    orderId: "CYBER-20260115-A1B2C3",
    product: "ANDROID PREMIUM",
    game: "Free Fire",
    status: "COMPLETED",
    paymentStatus: "PAID",
    deliveryStatus: "DELIVERED",
    purchaseDate: "2026-01-15 14:32",
    customer: "Rizky Pratama",
    whatsapp: "0812-3456-7890",
    email: "rizky@example.com",
    total: "Rp 20.000",
    price: "Rp 20.000",
  },
  "CYBER-20260120-D4E5F6": {
    orderId: "CYBER-20260120-D4E5F6",
    product: "CS2 PREMIUM",
    game: "CS2",
    status: "PENDING",
    paymentStatus: "WAITING PAYMENT",
    deliveryStatus: "NOT STARTED",
    purchaseDate: "2026-01-20 09:15",
    customer: "Dewi Lestari",
    whatsapp: "0812-1111-2222",
    email: "dewi@example.com",
    total: "Rp 50.000",
    price: "Rp 50.000",
  },
  "CYBER-20260122-G7H8I9": {
    orderId: "CYBER-20260122-G7H8I9",
    product: "ROBLOX PREMIUM",
    game: "Roblox",
    status: "PROCESSING",
    paymentStatus: "PAID",
    deliveryStatus: "PROCESSING",
    purchaseDate: "2026-01-22 20:45",
    customer: "Andi Saputra",
    whatsapp: "0812-3333-4444",
    email: "andi@example.com",
    total: "Rp 15.000",
    price: "Rp 15.000",
  },
  "CYBER-20260125-J1K2L3": {
    orderId: "CYBER-20260125-J1K2L3",
    product: "STANDOFF 2 PREMIUM",
    game: "Standoff 2",
    status: "CANCELLED",
    paymentStatus: "REFUNDED",
    deliveryStatus: "CANCELLED",
    purchaseDate: "2026-01-25 11:20",
    customer: "Sari Wulandari",
    whatsapp: "0812-5555-6666",
    email: "sari@example.com",
    total: "Rp 50.000",
    price: "Rp 50.000",
  },
  "CYBER-20260128-M4N5O6": {
    orderId: "CYBER-20260128-M4N5O6",
    product: "ANDROID STABILIZER",
    game: "Free Fire",
    status: "PAID",
    paymentStatus: "PAID",
    deliveryStatus: "READY TO DELIVER",
    purchaseDate: "2026-01-28 16:08",
    customer: "Bagas Nugroho",
    whatsapp: "0812-7777-8888",
    email: "bagas@example.com",
    total: "Rp 50.000",
    price: "Rp 50.000",
  },
};

/* ---------------- Status Config ---------------- */

const STATUS_CONFIG: Record<
  OrderStatus,
  { label: string; className: string; icon: any }
> = {
  COMPLETED: {
    label: "COMPLETED",
    className:
      "bg-[rgba(0,255,170,0.12)] border border-[rgba(0,255,170,0.3)] text-[#00ffaa]",
    icon: CheckCircle2,
  },
  PROCESSING: {
    label: "PROCESSING",
    className:
      "bg-[rgba(0,224,255,0.12)] border border-[rgba(0,224,255,0.3)] text-neon",
    icon: Loader2,
  },
  PENDING: {
    label: "PENDING",
    className:
      "bg-[rgba(255,200,0,0.12)] border border-[rgba(255,200,0,0.3)] text-[#ffd966]",
    icon: Clock,
  },
  PAID: {
    label: "PAID",
    className:
      "bg-[rgba(0,224,255,0.12)] border border-[rgba(0,224,255,0.3)] text-neon",
    icon: CreditCard,
  },
  CANCELLED: {
    label: "CANCELLED",
    className:
      "bg-[rgba(255,80,80,0.12)] border border-[rgba(255,80,80,0.3)] text-[#ff5050]",
    icon: XCircle,
  },
};

/* ---------------- Page ---------------- */

export default function CekOrderPage() {
  const [query, setQuery] = useState("");
  const [searching, setSearching] = useState(false);
  const [result, setResult] = useState<Order | null>(null);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);

  const handleSearch = () => {
    const trimmed = query.trim().toUpperCase();
    if (!trimmed) {
      setError("Masukkan Order ID terlebih dahulu");
      return;
    }

    setSearching(true);
    setError("");
    setResult(null);
    setSearched(false);

    // Simulasi loading
    setTimeout(() => {
      const found = MOCK_ORDERS[trimmed];
      if (found) {
        setResult(found);
        setError("");
      } else {
        setError("Order ID tidak ditemukan. Periksa kembali kode kamu.");
      }
      setSearched(true);
      setSearching(false);
    }, 800);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };

  const StatusIcon = result ? STATUS_CONFIG[result.status].icon : null;

  return (
    <>
      <Navbar />

      <main className="relative min-h-screen overflow-hidden pt-20 pb-24">
        {/* background glow */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-40 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-neon/5 blur-[140px]" />
        </div>

        <div className="mx-auto max-w-[1300px] px-6">
          {/* ---------- HEADER ---------- */}
          <div className="flex flex-col items-center text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl border border-[rgba(0,224,255,0.25)] bg-[rgba(0,224,255,0.08)] text-neon shadow-[0_0_30px_rgba(0,224,255,0.15)]"
            >
              <Search size={28} />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl font-extrabold tracking-tight sm:text-5xl"
            >
              Cek Status Order
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="mt-4 max-w-xl text-sm text-muted sm:text-base"
            >
              Masukkan Order ID kamu untuk lihat detail & status pembelian.
            </motion.p>
          </div>

          {/* ---------- SEARCH BOX ---------- */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="mx-auto mt-12 max-w-2xl"
          >
            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="CYBER-XXXXXXXX-XXXXXXXX"
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 text-sm outline-none transition placeholder:text-muted/60 focus:border-neon focus:bg-white/[0.06] sm:text-base"
                />
              </div>
              <button
                onClick={handleSearch}
                disabled={searching}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-neon px-8 py-4 text-sm font-bold text-bg shadow-[0_0_25px_rgba(0,224,255,0.35)] transition-all hover:-translate-y-0.5 hover:shadow-glow-lg disabled:opacity-60 disabled:hover:translate-y-0"
              >
                {searching ? (
                  <>
                    <Loader2 size={16} className="animate-spin" /> Mencari...
                  </>
                ) : (
                  <>
                    <Search size={16} /> Cek
                  </>
                )}
              </button>
            </div>
          </motion.div>

          {/* ---------- RESULT AREA ---------- */}
          <div className="mx-auto mt-14 max-w-3xl">
            <AnimatePresence mode="wait">
              {/* Empty state */}
              {!searched && !searching && (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="flex flex-col items-center text-center"
                >
                  <div className="flex h-24 w-24 items-center justify-center rounded-full border border-white/5 bg-white/[0.02]">
                    <Search size={36} className="text-muted/30" />
                  </div>
                  <p className="mt-6 text-sm text-muted">
                    Masukkan Order ID kamu di atas
                  </p>
                  <p className="mt-2 max-w-md text-xs text-muted/60">
                    Order ID bisa ditemukan di email konfirmasi atau halaman
                    sukses bayar
                  </p>
                </motion.div>
              )}

              {/* Loading */}
              {searching && (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center py-10"
                >
                  <Loader2 size={40} className="animate-spin text-neon" />
                  <p className="mt-4 text-sm text-muted">Mencari pesanan...</p>
                </motion.div>
              )}

              {/* Error */}
              {error && !searching && (
                <motion.div
                  key="error"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="rounded-2xl border border-[rgba(255,80,80,0.3)] bg-[rgba(255,80,80,0.08)] p-6 text-center"
                >
                  <XCircle size={32} className="mx-auto text-[#ff5050]" />
                  <p className="mt-3 text-sm text-[#ff8888]">{error}</p>
                </motion.div>
              )}

              {/* Order result */}
              {result && !searching && !error && (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <GlassCard className="overflow-hidden p-0" hover={false}>
                    {/* Header */}
                    <div className="flex flex-col items-start gap-4 border-b border-white/5 p-6 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[rgba(0,224,255,0.2)] bg-[rgba(0,224,255,0.08)] text-neon">
                          <Package size={22} />
                        </div>
                        <div>
                          <div className="text-xs uppercase tracking-wider text-muted">
                            Order ID
                          </div>
                          <div className="font-mono text-sm font-bold sm:text-base">
                            {result.orderId}
                          </div>
                        </div>
                      </div>

                      <div
                        className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold tracking-wider ${STATUS_CONFIG[result.status].className}`}
                      >
                        {StatusIcon && (
                          <StatusIcon
                            size={14}
                            className={
                              result.status === "PROCESSING"
                                ? "animate-spin"
                                : ""
                            }
                          />
                        )}
                        {STATUS_CONFIG[result.status].label}
                      </div>
                    </div>

                    {/* Product row */}
                    <div className="border-b border-white/5 p-6">
                      <div className="text-xs uppercase tracking-wider text-muted">
                        Produk
                      </div>
                      <div className="mt-1 text-lg font-bold">
                        {result.product}
                      </div>
                      <div className="mt-0.5 text-sm font-semibold text-neon">
                        {result.game}
                      </div>
                    </div>

                    {/* Detail grid */}
                    <div className="grid grid-cols-1 gap-px bg-white/5 sm:grid-cols-2">
                      <DetailRow
                        icon={CreditCard}
                        label="Status Pembayaran"
                        value={result.paymentStatus}
                        highlight={result.paymentStatus === "PAID"}
                      />
                      <DetailRow
                        icon={Truck}
                        label="Status Pengiriman"
                        value={result.deliveryStatus}
                      />
                      <DetailRow
                        icon={Calendar}
                        label="Tanggal Pembelian"
                        value={result.purchaseDate}
                      />
                      <DetailRow
                        icon={Hash}
                        label="Total"
                        value={result.total}
                        highlight
                      />
                    </div>

                    {/* Customer info */}
                    <div className="border-t border-white/5 bg-white/[0.02] p-6">
                      <div className="mb-4 text-xs font-bold uppercase tracking-wider text-muted">
                        Informasi Customer
                      </div>
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                        <CustomerInfo
                          icon={User}
                          label="Nama"
                          value={result.customer}
                        />
                        <CustomerInfo
                          icon={Phone}
                          label="WhatsApp"
                          value={result.whatsapp}
                        />
                        <CustomerInfo
                          icon={Mail}
                          label="Email"
                          value={result.email}
                        />
                      </div>
                    </div>
                  </GlassCard>

                  {/* Help text */}
                  <p className="mt-6 text-center text-xs text-muted/60">
                    Ada masalah dengan pesanan? Hubungi tim support kami via
                    WhatsApp.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ---------- DEMO HINT ---------- */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mx-auto mt-16 max-w-2xl rounded-2xl border border-dashed border-white/10 bg-white/[0.02] p-5"
          >
            <p className="text-center text-xs text-muted/70">
              <span className="font-semibold text-neon">Demo IDs:</span>{" "}
              <span className="font-mono">CYBER-20260115-A1B2C3</span> ·{" "}
              <span className="font-mono">CYBER-20260120-D4E5F6</span> ·{" "}
              <span className="font-mono">CYBER-20260122-G7H8I9</span>
            </p>
          </motion.div>
        </div>
      </main>

      <Footer />
      <FloatingButtons />
    </>
  );
}

/* ---------------- Sub Components ---------------- */

function DetailRow({
  icon: Icon,
  label,
  value,
  highlight = false,
}: {
  icon: any;
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex items-center gap-3 bg-[rgba(8,14,28,0.4)] p-5">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[rgba(0,224,255,0.15)] bg-[rgba(0,224,255,0.05)] text-neon">
        <Icon size={16} />
      </div>
      <div className="min-w-0">
        <div className="text-[0.65rem] uppercase tracking-wider text-muted">
          {label}
        </div>
        <div
          className={`mt-0.5 truncate text-sm font-semibold ${
            highlight ? "text-[#00ffaa]" : "text-white"
          }`}
        >
          {value}
        </div>
      </div>
    </div>
  );
}

function CustomerInfo({
  icon: Icon,
  label,
  value,
}: {
  icon: any;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/5 text-muted">
        <Icon size={14} />
      </div>
      <div className="min-w-0">
        <div className="text-[0.65rem] uppercase tracking-wider text-muted">
          {label}
        </div>
        <div className="mt-0.5 truncate text-sm font-medium">{value}</div>
      </div>
    </div>
  );
}