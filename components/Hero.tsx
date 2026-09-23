"use client";

import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Zap, Headset, Lock, Monitor, Apple, Smartphone, MessageCircle } from "lucide-react";
import Link from "next/link";
import { STORE } from "@/lib/data";

const indicators = [
  { icon: ShieldCheck, label: "Undetected" },
  { icon: Zap, label: "Instant Delivery" },
  { icon: Headset, label: "24/7 Support" },
  { icon: Lock, label: "Secure Payment" },
];

const platforms = [
  { icon: Monitor, label: "PC" },
  { icon: Apple, label: "iOS" },
  { icon: Smartphone, label: "Android" },
];

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-[90vh] items-center py-20"
    >
      {/* glow decorations */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/3 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-neon/5 blur-[120px]" />
        <div className="absolute right-10 top-20 h-72 w-72 rounded-full bg-[#0077ff]/5 blur-[100px]" />
      </div>

      <div className="relative mx-auto flex max-w-[1300px] flex-col items-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-[rgba(0,224,255,0.3)] bg-[rgba(0,224,255,0.08)] px-5 py-2 text-xs font-semibold tracking-widest text-neon"
        >
          <span className="h-2 w-2 animate-pulse rounded-full bg-[#00ffaa] shadow-[0_0_12px_#00ffaa]" />
          STATUS: UNDETECTED
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-7xl lg:text-[5.5rem]"
        >
          Dominate every
          <span className="mt-2 block text-[2rem] font-bold text-neon drop-shadow-[0_0_30px_rgba(0,224,255,0.4)] sm:text-4xl lg:text-5xl">
            {STORE.name}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-5 max-w-xl text-base text-muted sm:text-lg"
        >
          Temukan premium gaming products dengan fast delivery, constant updates dan dedicated support. Quality yang bisa lo percaya.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-9 flex flex-wrap justify-center gap-4"
        >
          <Link
            href="/#products"
            className="inline-flex items-center gap-2 rounded-full bg-neon px-8 py-4 text-sm font-bold text-bg shadow-[0_0_30px_rgba(0,224,255,0.35)] transition-all hover:-translate-y-0.5 hover:shadow-glow-lg"
          >
            <ArrowRight size={16} /> Buy Now
          </Link>
          <a
            href={STORE.social.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border-[1.5px] border-[rgba(0,224,255,0.4)] px-7 py-4 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:border-neon hover:bg-[rgba(0,224,255,0.06)]"
          >
            <MessageCircle size={16} /> Join Saluran WhatsApp
          </a>
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-14 flex flex-wrap justify-center gap-x-12 gap-y-4"
        >
          {indicators.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2.5 text-sm text-muted">
              <Icon size={18} className="text-neon" /> {label}
            </div>
          ))}
        </motion.div>

        {/* Platform badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 flex flex-wrap justify-center gap-3"
        >
          {platforms.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-2 rounded-full border border-[rgba(0,224,255,0.15)] bg-white/[0.03] px-5 py-2 text-xs font-semibold text-muted"
            >
              <Icon size={14} /> {label}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}