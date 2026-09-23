"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Package,
  ShoppingCart,
  Users,
  LogOut,
  DollarSign,
  BarChart3,
  ArrowRight,
  ArrowUpRight,
  Settings,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { GlassCard } from "@/components/ui/GlassCard";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { logout } from "@/lib/auth";

export default function AdminDashboard() {
  const router = useRouter();
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState("");
  const [productCount, setProductCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [logoutOpen, setLogoutOpen] = useState(false);

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

    setAuth(true);
    setUser(localStorage.getItem("cyberUser") || "admin");

    const savedProducts = localStorage.getItem("cyberProducts");
    if (savedProducts) {
      try {
        setProductCount(JSON.parse(savedProducts).length);
      } catch {
        setProductCount(0);
      }
    }

    const savedOrders = localStorage.getItem("cyberOrders");
    if (savedOrders) {
      try {
        setOrderCount(JSON.parse(savedOrders).length);
      } catch {
        setOrderCount(0);
      }
    } else {
      setOrderCount(47);
    }
  }, [router]);

  const handleLogout = () => {
    setLogoutOpen(false);
    logout(router);
  };

  if (!auth) return null;

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
      label: "Orders",
      value: orderCount.toString(),
      trend: "+8.2%",
      up: true,
    },
    {
      icon: Package,
      label: "Products",
      value: productCount.toString(),
      trend: "0%",
      up: true,
    },
    {
      icon: Users,
      label: "Customers",
      value: "128",
      trend: "+5.1%",
      up: true,
    },
  ];

  const quickActions = [
    {
      label: "Kelola Produk",
      desc: "Tambah, edit, hapus produk",
      icon: Package,
      href: "/admin/products",
    },
    {
      label: "Lihat Order",
      desc: "Update status order",
      icon: ShoppingCart,
      href: "/admin/orders",
    },
    {
      label: "Analytics",
      desc: "Statistik & performa toko",
      icon: BarChart3,
      href: "/admin/analytics",
    },
    {
      label: "Pengaturan",
      desc: "Link sosial media & info",
      icon: Settings,
      href: "/admin/settings",
    },
  ];

  return (
    <>
      <Navbar />
      <main className="relative min-h-screen pt-20 pb-24">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/3 top-20 h-[400px] w-[400px] rounded-full bg-neon/5 blur-[140px]" />
        </div>

        <div className="mx-auto max-w-[1300px] px-6">
          <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-extrabold sm:text-4xl">
                Admin Dashboard
              </h1>
              <p className="mt-1 text-sm text-muted">
                Selamat datang, <span className="text-neon">{user}</span>
              </p>
            </div>
            <button
              onClick={() => setLogoutOpen(true)}
              className="inline-flex items-center gap-2 rounded-full border border-[rgba(255,80,80,0.3)] bg-[rgba(255,80,80,0.08)] px-5 py-2.5 text-sm font-semibold text-[#ff5050] transition hover:bg-[rgba(255,80,80,0.15)]"
            >
              <LogOut size={14} /> Logout
            </button>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map(({ icon: Icon, label, value, trend, up }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <GlassCard className="p-6" hover={false}>
                  <div className="flex items-center justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[rgba(0,224,255,0.2)] bg-[rgba(0,224,255,0.08)] text-neon">
                      <Icon size={18} />
                    </div>
                    <span
                      className={`flex items-center gap-1 text-xs font-semibold ${
                        up ? "text-[#00ffaa]" : "text-[#ff5050]"
                      }`}
                    >
                      {up && <ArrowUpRight size={12} />}
                      {trend}
                    </span>
                  </div>
                  <div className="mt-5 text-xs uppercase tracking-wider text-muted">
                    {label}
                  </div>
                  <div className="mt-1 text-2xl font-extrabold">{value}</div>
                </GlassCard>
              </motion.div>
            ))}
          </div>

          <div className="mt-12">
            <h2 className="mb-5 text-lg font-bold">Quick Actions</h2>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {quickActions.map(({ label, desc, icon: Icon, href }, i) => (
                <motion.a
                  key={label}
                  href={href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.08 }}
                  className="glass glass-hover group flex items-center gap-4 rounded-2xl p-5 transition"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[rgba(0,224,255,0.08)] text-neon">
                    <Icon size={18} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-semibold">{label}</div>
                    <div className="mt-0.5 truncate text-xs text-muted">
                      {desc}
                    </div>
                  </div>
                  <ArrowRight
                    size={16}
                    className="shrink-0 text-muted transition-transform group-hover:translate-x-1 group-hover:text-neon"
                  />
                </motion.a>
              ))}
            </div>
          </div>

          <div className="mt-10 rounded-2xl border border-dashed border-[rgba(0,224,255,0.2)] bg-[rgba(0,224,255,0.03)] p-6">
            <p className="text-sm text-muted">
              💡 <span className="font-semibold text-neon">Tips:</span> Semua
              perubahan (produk & order) tersimpan otomatis di browser kamu
              (localStorage). Untuk production, sambungkan ke database real
              seperti Supabase atau Prisma.
            </p>
          </div>
        </div>
      </main>
      <Footer />

      {/* Confirm Logout Dialog */}
      <ConfirmDialog
        open={logoutOpen}
        title="Logout dari Admin?"
        message="Kamu akan keluar dari dashboard admin. Yakin ingin lanjut?"
        confirmText="Ya, Logout"
        cancelText="Batal"
        variant="danger"
        onConfirm={handleLogout}
        onCancel={() => setLogoutOpen(false)}
      />
    </>
  );
}