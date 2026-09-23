"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingCart,
  Users,
  Package,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { GlassCard } from "@/components/ui/GlassCard";

export default function AdminAnalyticsPage() {
  const router = useRouter();
  const [ready, setReady] = useState(false);

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

  setReady(true);
}, [router]);

  if (!ready) return null;

  const stats = [
    {
      icon: DollarSign,
      label: "Total Revenue",
      value: "Rp 1.240.000",
      trend: "+12.5%",
      up: true,
    },
    {
      icon: ShoppingCart,
      label: "Total Orders",
      value: "47",
      trend: "+8.2%",
      up: true,
    },
    {
      icon: Users,
      label: "Customers",
      value: "128",
      trend: "+5.1%",
      up: true,
    },
    {
      icon: Package,
      label: "Products",
      value: "6",
      trend: "0%",
      up: true,
    },
  ];

  // Revenue chart data (simple bars)
  const revenueData = [
    { label: "Mon", value: 45 },
    { label: "Tue", value: 62 },
    { label: "Wed", value: 38 },
    { label: "Thu", value: 84 },
    { label: "Fri", value: 95 },
    { label: "Sat", value: 78 },
    { label: "Sun", value: 55 },
  ];

  // Top products
  const topProducts = [
    { name: "ANDROID PREMIUM", sales: 18, revenue: "Rp 360.000", pct: 82 },
    { name: "CS2 PREMIUM", sales: 12, revenue: "Rp 600.000", pct: 65 },
    { name: "ROBLOX PREMIUM", sales: 9, revenue: "Rp 135.000", pct: 45 },
    { name: "STANDOFF 2 PREMIUM", sales: 5, revenue: "Rp 250.000", pct: 30 },
    { name: "ANDROID STABILIZER", sales: 3, revenue: "Rp 150.000", pct: 18 },
  ];

  const maxRev = Math.max(...revenueData.map(d => d.value));

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20 pb-24">
        <div className="mx-auto max-w-[1300px] px-6">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 text-xs text-muted">
              <a href="/admin" className="hover:text-neon">Admin</a>
              <span>/</span>
              <span className="text-neon">Analytics</span>
            </div>
            <h1 className="mt-2 text-3xl font-extrabold sm:text-4xl">
              Analytics
            </h1>
            <p className="mt-1 text-sm text-muted">
              Ringkasan performa toko kamu
            </p>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map(({ icon: Icon, label, value, trend, up }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <GlassCard className="p-6" hover={false}>
                  <div className="flex items-start justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[rgba(0,224,255,0.2)] bg-[rgba(0,224,255,0.08)] text-neon">
                      <Icon size={18} />
                    </div>
                    <div
                      className={`flex items-center gap-1 text-xs font-bold ${
                        up ? "text-[#00ffaa]" : "text-[#ff5050]"
                      }`}
                    >
                      {up ? (
                        <ArrowUpRight size={12} />
                      ) : (
                        <ArrowDownRight size={12} />
                      )}
                      {trend}
                    </div>
                  </div>
                  <div className="mt-5 text-[0.65rem] uppercase tracking-wider text-muted">
                    {label}
                  </div>
                  <div className="mt-1 text-2xl font-extrabold">{value}</div>
                </GlassCard>
              </motion.div>
            ))}
          </div>

          {/* Charts row */}
          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Revenue chart */}
            <div className="lg:col-span-2">
              <GlassCard className="p-6" hover={false}>
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-bold">Revenue This Week</h2>
                    <p className="text-xs text-muted">
                      Total pendapatan 7 hari terakhir
                    </p>
                  </div>
                  <BarChart3 size={20} className="text-neon" />
                </div>

                <div className="flex h-52 items-end justify-between gap-3">
                  {revenueData.map(({ label, value }) => {
                    const height = (value / maxRev) * 100;
                    return (
                      <div
                        key={label}
                        className="flex flex-1 flex-col items-center gap-2"
                      >
                        <div className="relative w-full flex-1 flex items-end">
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: `${height}%` }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="w-full rounded-t-lg bg-gradient-to-t from-[#00e0ff] to-[#00e0ff]/40"
                            style={{ minHeight: 4 }}
                          />
                        </div>
                        <div className="text-[0.65rem] uppercase tracking-wider text-muted">
                          {label}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </GlassCard>
            </div>

            {/* Conversion */}
            <GlassCard className="p-6" hover={false}>
              <h2 className="text-lg font-bold">Conversion</h2>
              <p className="text-xs text-muted">Traffic to sale rate</p>

              <div className="mt-6 flex items-center justify-center">
                <div className="relative flex h-40 w-40 items-center justify-center">
                  <svg className="absolute inset-0 -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="rgba(255,255,255,0.06)"
                      strokeWidth="8"
                    />
                    <motion.circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#00e0ff"
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray={251.2}
                      initial={{ strokeDashoffset: 251.2 }}
                      animate={{ strokeDashoffset: 251.2 * (1 - 0.082) }}
                      transition={{ duration: 1, delay: 0.3 }}
                    />
                  </svg>
                  <div className="text-center">
                    <div className="text-3xl font-extrabold text-neon">8.2%</div>
                    <div className="mt-1 text-[0.65rem] uppercase tracking-wider text-muted">
                      Conv. Rate
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted">Visitors</span>
                  <span className="font-semibold">1.240</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Sales</span>
                  <span className="font-semibold">47</span>
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Top products */}
          <div className="mt-8">
            <GlassCard className="p-6" hover={false}>
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold">Top Products</h2>
                  <p className="text-xs text-muted">Produk paling laris</p>
                </div>
                <TrendingUp size={20} className="text-neon" />
              </div>

              <div className="space-y-5">
                {topProducts.map((p, i) => (
                  <motion.div
                    key={p.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <div className="mb-2 flex items-center justify-between gap-4">
                      <div className="min-w-0">
                        <div className="truncate text-sm font-semibold">
                          {p.name}
                        </div>
                        <div className="text-xs text-muted">
                          {p.sales} sales · {p.revenue}
                        </div>
                      </div>
                      <div className="text-sm font-bold text-neon">
                        {p.pct}%
                      </div>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-white/5">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${p.pct}%` }}
                        transition={{ duration: 0.8, delay: i * 0.08 }}
                        className="h-full rounded-full bg-gradient-to-r from-[#00e0ff] to-[#0077ff]"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </GlassCard>
          </div>
        </div>
      </main>
    </>
  );
}