"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { staffData } from "@/lib/data";

export function StaffSection() {
  return (
    <section id="staff" className="py-20">
      <div className="mx-auto max-w-[1300px] px-6">
        <p className="text-center text-xs font-bold uppercase tracking-[0.15em] text-neon">
          OUR STAFF
        </p>
        <h2 className="mt-3 text-center text-3xl font-extrabold tracking-tight sm:text-5xl">
          Sales Team
        </h2>
        <p className="mx-auto mt-4 max-w-md text-center text-muted">
          Hubungi representasi resmi store.
        </p>

        <div className="mt-14 grid grid-cols-2 gap-7 sm:grid-cols-3 lg:grid-cols-4">
          {staffData.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass glass-hover rounded-3xl p-6 text-center"
            >
              <div className="relative mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full border border-[rgba(0,224,255,0.3)] bg-gradient-to-br from-[#0a1a2e] to-[#0e2540] text-3xl font-bold text-neon">
                {s.initials}
                {s.online && (
                  <span className="absolute bottom-1 right-1 h-4 w-4 rounded-full border-2 border-bg bg-[#00ffaa] shadow-[0_0_12px_#00ffaa]" />
                )}
              </div>
              <div className="text-base font-bold">{s.name}</div>
              <div className="mt-0.5 text-xs text-muted">{s.role}</div>
              <a
                href={`https://wa.me/${s.wa}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-[#25D366] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#1ebe5a] hover:shadow-[0_0_18px_rgba(37,211,102,0.5)]"
              >
                <MessageCircle size={12} /> WhatsApp
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}