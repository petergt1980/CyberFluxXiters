"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  DollarSign,
  UserPlus,
  Link2,
  TrendingUp,
  BarChart3,
  Wallet,
  Zap,
  ShieldCheck,
  ChevronDown,
  ArrowRight,
  ShoppingCart,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingButtons } from "@/components/FloatingButtons";
import { GlassCard } from "@/components/ui/GlassCard";

/* ---------------- Data ---------------- */

const steps = [
  {
    num: "01",
    icon: UserPlus,
    title: "Sign Up",
    desc: "Buat akun affiliate kamu dalam kurang dari 10 detik. 100% gratis.",
  },
  {
    num: "02",
    icon: Link2,
    title: "Get Your Link",
    desc: "Dapatkan link unik kamu yang tracking semua penjualan secara otomatis.",
  },
  {
    num: "03",
    icon: TrendingUp,
    title: "Promote",
    desc: "Share linkmu di social media, video, stream, atau di mana saja kamu mau.",
  },
  {
    num: "04",
    icon: BarChart3,
    title: "Track",
    desc: "Monitor klik, konversi, dan penghasilan secara real-time di dashboard.",
  },
  {
    num: "05",
    icon: Wallet,
    title: "Get Paid",
    desc: "Terima pembayaranmu via cryptocurrency dengan cepat dan aman.",
  },
];

const benefits = [
  {
    icon: DollarSign,
    title: "20% Commission",
    desc: "Dapatkan 20% dari setiap penjualan produk APAPUN. Tidak ada batasan penghasilan.",
  },
  {
    icon: Zap,
    title: "Fast Payments",
    desc: "Pembayaran dalam kurang dari 12 jam via QRIS atau cryptocurrency.",
  },
  {
    icon: ShieldCheck,
    title: "24/7 Support",
    desc: "Tim dedicated untuk membantu kamu memaksimalkan penjualan.",
  },
];

const faqs = [
  {
    q: "Gimana cara kerja komisi 20%?",
    a: "Setiap kali ada pembeli yang melakukan transaksi melalui link affiliate kamu, kamu otomatis mendapatkan 20% dari nilai penjualan. Komisi langsung masuk ke dashboard dan bisa dicairkan kapan saja.",
  },
  {
    q: "Kapan dan gimana aku dibayar?",
    a: "Pembayaran diproses dalam waktu kurang dari 12 jam setelah kamu request withdraw. Metode pembayaran tersedia via QRIS, transfer bank, atau cryptocurrency.",
  },
  {
    q: "Apakah perlu pengalaman sebelumnya?",
    a: "Tidak perlu. Program ini dirancang untuk siapa saja — baik content creator pemula maupun yang sudah berpengalaman. Kami menyediakan panduan lengkap untuk memulai.",
  },
  {
    q: "Produk apa yang bisa aku promosikan?",
    a: "SEMUA produk kami bisa kamu promosikan. Mulai dari Free Fire, Roblox, CS2, Standoff 2, hingga produk lainnya. Tidak ada batasan produk.",
  },
  {
    q: "Apakah ada biaya untuk bergabung?",
    a: "100% gratis. Tidak ada biaya pendaftaran, biaya bulanan, atau biaya tersembunyi lainnya. Kami hanya mengambil keuntungan dari penjualan.",
  },
];

const stats = [
  { icon: DollarSign, label: "Commission Earned", value: "Rp 47.2 JT" },
  { icon: TrendingUp, label: "Sales Made", value: "47" },
  { icon: BarChart3, label: "Conversion Rate", value: "8.2%" },
];

/* ---------------- FAQ Item ---------------- */

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="glass overflow-hidden rounded-2xl transition-all duration-300 hover:border-[rgba(0,224,255,0.25)]">
      <button
        onClick={() => setOpen(v => !v)}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span className="text-sm font-semibold sm:text-base">{q}</span>
        <ChevronDown
          size={18}
          className={`shrink-0 text-muted transition-transform duration-300 ${
            open ? "rotate-180 text-neon" : ""
          }`}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-5 text-sm leading-relaxed text-muted">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ---------------- Page ---------------- */

export default function AffiliatePage() {
  return (
    <>
      <Navbar />

      <main className="relative overflow-hidden">
        {/* background glow */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-40 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-neon/5 blur-[140px]" />
        </div>

        {/* ---------- HERO ---------- */}
        <section className="relative pt-24 pb-16">
          <div className="mx-auto max-w-[1300px] px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mx-auto mb-8 inline-flex items-center gap-2 rounded-full border border-[rgba(255,200,0,0.3)] bg-[rgba(255,200,0,0.06)] px-5 py-2 text-xs font-bold tracking-widest text-[#ffd966]"
            >
              <DollarSign size={14} />
              AFFILIATE PROGRAM
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mx-auto max-w-4xl text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-6xl lg:text-7xl"
            >
              Make Money With Every Sale
              <span className="mt-2 block text-neon drop-shadow-[0_0_30px_rgba(0,224,255,0.4)]">
                20% Commission
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mx-auto mt-6 max-w-2xl text-base text-muted sm:text-lg"
            >
              Promosikan SEMUA produk kami dan dapatkan 20% dari setiap
              penjualan. Program eksklusif untuk content creators.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-10"
            >
              <a
                href="#join"
                className="inline-flex items-center gap-2 rounded-full bg-neon px-9 py-4 text-sm font-bold text-bg shadow-[0_0_30px_rgba(0,224,255,0.35)] transition-all hover:-translate-y-0.5 hover:shadow-glow-lg"
              >
                Become An Affiliate <ArrowRight size={16} />
              </a>
            </motion.div>

            {/* Stats row */}
            <div className="mx-auto mt-16 grid max-w-4xl grid-cols-1 gap-5 sm:grid-cols-3">
              {stats.map(({ icon: Icon, label, value }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <GlassCard className="p-6 text-left">
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted">
                      <Icon size={14} className="text-neon" />
                      {label}
                    </div>
                    <div className="mt-3 text-3xl font-extrabold tabular-nums">
                      {value}
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- HOW IT WORKS ---------- */}
        <section className="py-24">
          <div className="mx-auto max-w-[1300px] px-6">
            <h2 className="text-center text-3xl font-extrabold tracking-tight sm:text-5xl">
              How It Works
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-center text-muted">
              5 langkah simpel untuk mulai menghasilkan
            </p>

            <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
              {steps.map(({ num, icon: Icon, title, desc }, i) => (
                <motion.div
                  key={num}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <GlassCard className="h-full p-7">
                    <div className="text-4xl font-extrabold text-white/10">
                      {num}
                    </div>
                    <div className="mt-5 flex h-11 w-11 items-center justify-center rounded-xl border border-[rgba(0,224,255,0.2)] bg-[rgba(0,224,255,0.08)] text-neon">
                      <Icon size={20} />
                    </div>
                    <h3 className="mt-4 text-base font-bold">{title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {desc}
                    </p>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- WHY PROMOTE ---------- */}
        <section className="py-20">
          <div className="mx-auto max-w-[1300px] px-6">
            <h2 className="text-center text-3xl font-extrabold tracking-tight sm:text-5xl">
              Why Promote Our Products?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-center text-muted">
              Produk premium dengan konversi tinggi dan benefit terbaik untuk
              affiliates
            </p>

            <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
              {benefits.map(({ icon: Icon, title, desc }, i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <GlassCard className="h-full p-7">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[rgba(0,224,255,0.2)] bg-[rgba(0,224,255,0.08)] text-neon">
                      <Icon size={20} />
                    </div>
                    <h3 className="mt-5 text-lg font-bold">{title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {desc}
                    </p>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- FAQ ---------- */}
        <section className="py-24">
          <div className="mx-auto max-w-[1300px] px-6">
            <h2 className="text-center text-3xl font-extrabold tracking-tight sm:text-5xl">
              Frequently Asked Questions
            </h2>

            <div className="mx-auto mt-12 max-w-3xl space-y-3.5">
              {faqs.map(({ q, a }) => (
                <FaqItem key={q} q={q} a={a} />
              ))}
            </div>
          </div>
        </section>

        {/* ---------- CTA ---------- */}
        <section id="join" className="py-20">
          <div className="mx-auto max-w-[1300px] px-6 text-center">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-5xl">
              Ready to Get Started?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted">
              Daftar sekarang dan mulai hasilkan 20% dari setiap penjualan
            </p>
            <div className="mt-10">
              <a
                href="https://wa.me/6285604788705?text=Halo%2C%20saya%20ingin%20daftar%20affiliate"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-neon px-9 py-4 text-sm font-bold text-bg shadow-[0_0_30px_rgba(0,224,255,0.35)] transition-all hover:-translate-y-0.5 hover:shadow-glow-lg"
              >
                Become An Affiliate Now <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingButtons />
    </>
  );
}