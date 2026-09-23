"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Rocket, Headset, BadgeCheck, Lock, Clock, Zap, RefreshCw } from "lucide-react";
import { GlassCard } from "./ui/GlassCard";

const features = [
  { icon: ShieldCheck, title: "Keamanan Terpercaya", desc: "Akses dikirim dengan profesionalisme tinggi." },
  { icon: Rocket, title: "Fast Delivery", desc: "Proses cepat agar kamu bisa langsung mulai." },
  { icon: Headset, title: "Active Support", desc: "Bantuan melalui channel support utama." },
  { icon: BadgeCheck, title: "Safe Purchase", desc: "Pengalaman pembelian yang simpel dan jelas." },
];

const miniBadges = [
  { icon: Lock, label: "Secure Payments" },
  { icon: Clock, label: "24/7 Support" },
  { icon: Zap, label: "Instant Delivery" },
  { icon: RefreshCw, label: "Constant Updates" },
];

export function TrustSection() {
  return (
    <section id="trust" className="py-20">
      <div className="mx-auto max-w-[1300px] px-6">
        <p className="text-center text-xs font-bold uppercase tracking-[0.15em] text-neon">
          CYBER FLUX STANDARD
        </p>
        <h2 className="mt-3 text-center text-3xl font-extrabold tracking-tight sm:text-5xl">
          Beli dengan percaya diri,
          <br /> main dengan aman.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-center text-muted">
          Fast delivery, support responsif, dan layanan yang bisa diandalkan. Semua produk melalui quality control ketat.
        </p>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(({ icon: Icon, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <GlassCard className="h-full p-8">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-[rgba(0,224,255,0.2)] bg-[rgba(0,224,255,0.08)] text-neon">
                  <Icon size={22} />
                </div>
                <h3 className="text-lg font-bold">{title}</h3>
                <p className="mt-2 text-sm text-muted">{desc}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-3.5">
          {miniBadges.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-2 rounded-full border border-[rgba(0,224,255,0.15)] bg-[rgba(0,224,255,0.04)] px-5 py-2 text-xs text-muted"
            >
              <Icon size={14} /> {label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}