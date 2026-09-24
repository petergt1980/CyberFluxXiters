"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ToastContainer } from "@/components/ui/Toast";
import { useToast } from "@/lib/useToast";
import {
  Search,
  ShoppingCart,
  Check,
  X,
  Eye,
  Package,
  Phone,
  Mail,
  User,
  Calendar,
  Loader2,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { GlassCard } from "@/components/ui/GlassCard";

type Status = "PENDING" | "PAID" | "PROCESSING" | "COMPLETED" | "CANCELLED";

interface OrderRow {
  _id: string;
  orderId: string;
  product: string;
  customer: string;
  whatsapp: string;
  email: string;
  total: string;
  date: string;
  status: Status;
  payment?: string;
}

const STATUS_COLORS: Record<Status, string> = {
  PENDING:
    "bg-[rgba(255,200,0,0.12)] text-[#ffd966] border-[rgba(255,200,0,0.3)]",
  PAID: "bg-[rgba(0,224,255,0.12)] text-neon border-[rgba(0,224,255,0.3)]",
  PROCESSING:
    "bg-[rgba(0,224,255,0.12)] text-neon border-[rgba(0,224,255,0.3)]",
  COMPLETED:
    "bg-[rgba(0,255,170,0.12)] text-[#00ffaa] border-[rgba(0,255,170,0.3)]",
  CANCELLED:
    "bg-[rgba(255,80,80,0.12)] text-[#ff5050] border-[rgba(255,80,80,0.3)]",
};

export default function AdminOrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<OrderRow[]>([]);
  const [filter, setFilter] = useState<Status | "ALL">("ALL");
  const [query, setQuery] = useState("");
  const [detail, setDetail] = useState<OrderRow | null>(null);
  const [loading, setLoading] = useState(true);

  const toast = useToast();

  useEffect(() => {
    const role = localStorage.getItem("cyberRole");
    const isAuth = localStorage.getItem("cyberAuth");

    if (isAuth !== "true") {
      router.replace("/login");
      return;
    }
    if (role !== "admin") {
      router.replace("/");
      return;
    }

    loadOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  async function loadOrders() {
    try {
      const res = await fetch("/api/orders", { cache: "no-store" });
      if (!res.ok) throw new Error("Fetch failed");
      const data = await res.json();
      setOrders(Array.isArray(data) ? data : []);
    } catch {
      toast.error("Gagal memuat order");
      setOrders([]);
    } finally {
      setLoading(false);
    }
  }

  async function updateStatus(id: string, status: Status) {
    try {
      const res = await fetch(`/api/orders/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error("Update failed");

      setOrders(prev =>
        prev.map(o => (o._id === id ? { ...o, status } : o))
      );
      toast.success(`Status diubah ke ${status}`);
    } catch {
      toast.error("Gagal update status");
    }
  }

  const filtered = orders.filter(o => {
    if (filter !== "ALL" && o.status !== filter) return false;
    if (query) {
      const q = query.toLowerCase();
      return (
        o.orderId?.toLowerCase().includes(q) ||
        o.customer?.toLowerCase().includes(q) ||
        o.product?.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const counts = {
    ALL: orders.length,
    PENDING: orders.filter(o => o.status === "PENDING").length,
    PAID: orders.filter(o => o.status === "PAID").length,
    PROCESSING: orders.filter(o => o.status === "PROCESSING").length,
    COMPLETED: orders.filter(o => o.status === "COMPLETED").length,
    CANCELLED: orders.filter(o => o.status === "CANCELLED").length,
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20 pb-24">
        <div className="mx-auto max-w-[1300px] px-6">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 text-xs text-muted">
              <a href="/admin" className="hover:text-neon">
                Admin
              </a>
              <span>/</span>
              <span className="text-neon">Orders</span>
            </div>
            <h1 className="mt-2 text-3xl font-extrabold sm:text-4xl">
              Manajemen Order
            </h1>
            <p className="mt-1 text-sm text-muted">
              Kelola & update status order customer
            </p>
          </div>

          {/* Filter tabs */}
          <div className="mb-6 flex flex-wrap gap-2">
            {(
              [
                "ALL",
                "PENDING",
                "PAID",
                "PROCESSING",
                "COMPLETED",
                "CANCELLED",
              ] as const
            ).map(s => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`rounded-full border px-4 py-2 text-xs font-semibold transition ${
                  filter === s
                    ? "border-neon bg-[rgba(0,224,255,0.1)] text-white"
                    : "border-white/10 text-muted hover:border-neon hover:text-white"
                }`}
              >
                {s} <span className="ml-1.5 opacity-60">({counts[s]})</span>
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative mb-6 max-w-md">
            <Search
              size={16}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted"
            />
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Cari Order ID / customer / produk..."
              className="w-full rounded-xl border border-white/10 bg-white/[0.04] py-3 pl-11 pr-4 text-sm outline-none focus:border-neon"
            />
          </div>

          {/* Loading */}
          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="animate-spin text-neon" size={32} />
            </div>
          ) : (
            <div className="space-y-3">
              {filtered.map(o => (
                <GlassCard key={o._id} className="p-5" hover={false}>
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[rgba(0,224,255,0.08)] text-neon">
                      <ShoppingCart size={20} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="font-mono text-[0.7rem] text-muted">
                        {o.orderId}
                      </div>
                      <div className="mt-0.5 font-bold">{o.product}</div>
                      <div className="mt-0.5 text-xs text-muted">
                        {o.customer} · {o.whatsapp}
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4">
                      <div className="text-right">
                        <div className="text-[0.65rem] uppercase tracking-wider text-muted">
                          Total
                        </div>
                        <div className="font-bold">{o.total}</div>
                      </div>
                      <div className="hidden text-right sm:block">
                        <div className="text-[0.65rem] uppercase tracking-wider text-muted">
                          Tanggal
                        </div>
                        <div className="text-sm">{o.date}</div>
                      </div>

                      {/* Status dropdown */}
                      <select
                        value={o.status}
                        onChange={e =>
                          updateStatus(o._id, e.target.value as Status)
                        }
                        className={`cursor-pointer rounded-full border px-4 py-2 text-xs font-bold ${STATUS_COLORS[o.status]}`}
                      >
                        <option value="PENDING">PENDING</option>
                        <option value="PAID">PAID</option>
                        <option value="PROCESSING">PROCESSING</option>
                        <option value="COMPLETED">COMPLETED</option>
                        <option value="CANCELLED">CANCELLED</option>
                      </select>

                      <button
                        onClick={() => setDetail(o)}
                        className="rounded-lg border border-white/10 p-2.5 text-muted transition hover:border-neon hover:text-neon"
                      >
                        <Eye size={16} />
                      </button>
                    </div>
                  </div>
                </GlassCard>
              ))}

              {filtered.length === 0 && (
                <div className="py-16 text-center text-muted">
                  {orders.length === 0
                    ? "Belum ada order. Order dari customer akan muncul di sini."
                    : "Tidak ada order yang cocok"}
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Detail Modal */}
      <AnimatePresence>
        {detail && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setDetail(null)}
            className="fixed inset-0 z-[400] flex items-center justify-center bg-black/70 p-4 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              onClick={e => e.stopPropagation()}
              className="w-full max-w-lg overflow-hidden rounded-3xl border border-[rgba(0,224,255,0.2)] bg-[rgba(8,14,28,0.98)]"
            >
              <div className="flex items-center justify-between border-b border-white/5 p-6">
                <h2 className="text-xl font-bold">Detail Order</h2>
                <button
                  onClick={() => setDetail(null)}
                  className="text-muted transition hover:text-neon"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-3 p-6">
                <DetailRow
                  icon={ShoppingCart}
                  label="Order ID"
                  value={detail.orderId}
                  mono
                />
                <DetailRow icon={Package} label="Produk" value={detail.product} />
                <DetailRow icon={User} label="Customer" value={detail.customer} />
                <DetailRow icon={Phone} label="WhatsApp" value={detail.whatsapp} />
                <DetailRow icon={Mail} label="Email" value={detail.email} />
                <DetailRow icon={Calendar} label="Tanggal" value={detail.date} />
                <DetailRow
                  icon={Check}
                  label="Total"
                  value={detail.total}
                  highlight
                />

                <div className="mt-6 rounded-2xl border border-[rgba(0,224,255,0.15)] bg-white/[0.02] p-4">
                  <div className="mb-2 text-xs uppercase tracking-wider text-muted">
                    Status
                  </div>
                  <div
                    className={`inline-flex rounded-full border px-4 py-2 text-xs font-bold ${STATUS_COLORS[detail.status]}`}
                  >
                    {detail.status}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <ToastContainer toasts={toast.toasts} onDismiss={toast.dismiss} />
    </>
  );
}

function DetailRow({
  icon: Icon,
  label,
  value,
  mono = false,
  highlight = false,
}: {
  icon: any;
  label: string;
  value: string;
  mono?: boolean;
  highlight?: boolean;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/5 text-muted">
        <Icon size={14} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-[0.65rem] uppercase tracking-wider text-muted">
          {label}
        </div>
        <div
          className={`mt-0.5 truncate text-sm font-semibold ${
            mono ? "font-mono" : ""
          } ${highlight ? "text-[#00ffaa]" : ""}`}
        >
          {value}
        </div>
      </div>
    </div>
  );
}