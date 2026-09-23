"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { testimonials } from "@/lib/data";

export function Testimonials() {
  return (
    <section id="testimonials" className="py-20">
      <div className="mx-auto max-w-[1300px] px-6">
        <p className="text-center text-xs font-bold uppercase tracking-[0.15em] text-neon">
          COMMUNITY FEEDBACK
        </p>
        <h2 className="mt-3 text-center text-3xl font-extrabold tracking-tight sm:text-5xl">
          What our players say
        </h2>
        <p className="mx-auto mt-4 max-w-md text-center text-muted">
          Feedback nyata dari komunitas kami.
        </p>

        <div className="mt-12 flex gap-6 overflow-x-auto pb-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="glass glass-hover min-w-[300px] max-w-[300px] flex-shrink-0 rounded-3xl p-6"
            >
              <div className="mb-3.5 flex items-center gap-3.5">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[rgba(0,224,255,0.25)] bg-[rgba(0,224,255,0.1)] text-lg font-bold text-neon">
                  {t.initials}
                </div>
                <div>
                  <div className="text-sm font-bold">{t.name}</div>
                  <div className="mt-0.5 flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <Star
                        key={idx}
                        size={12}
                        className={idx < t.stars ? "fill-[#ffc800] text-[#ffc800]" : "text-white/10"}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-muted">{t.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}