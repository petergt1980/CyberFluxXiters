"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Gamepad2, ArrowRight } from "lucide-react";
import { Badge } from "./ui/Badge";
import { freeProducts } from "@/lib/data";
import { Product } from "@/types";

function useCountdown(target: number | null) {
  const [remaining, setRemaining] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  } | null>(null);

  useEffect(() => {
    if (target === null) return;
    const tick = () => {
      const diff = Math.max(0, target - Date.now());
      setRemaining({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, [target]);

  return remaining;
}

export function FreeProducts({ onView }: { onView: (p: Product) => void }) {
  const [target, setTarget] = useState<number | null>(null);

  useEffect(() => {
    // Set target hanya di client, setelah mount
    setTarget(Date.now() + (2 * 86400 + 14 * 3600 + 38 * 60) * 1000);
  }, []);

  const remaining = useCountdown(target);

  const pad = (n: number) => String(n).padStart(2, "0");

  const boxes = [
    { num: remaining ? pad(remaining.days) : "--", lbl: "Days" },
    { num: remaining ? pad(remaining.hours) : "--", lbl: "Hours" },
    { num: remaining ? pad(remaining.minutes) : "--", lbl: "Minutes" },
    { num: remaining ? pad(remaining.seconds) : "--", lbl: "Seconds" },
  ];

  return (
    <section id="free" className="py-20">
      <div className="mx-auto max-w-[1300px] px-6">
        <p className="text-center text-xs font-bold uppercase tracking-[0.15em] text-neon">
          FREE PRODUCTS
        </p>
        <h2 className="mt-3 text-center text-3xl font-extrabold tracking-tight sm:text-5xl">
          Try for Free
        </h2>
        <p className="mx-auto mt-4 max-w-md text-center text-muted">
          Mulai tanpa bayar apapun.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          {boxes.map(b => (
            <div
              key={b.lbl}
              className="glass min-w-[90px] rounded-2xl px-6 py-5 text-center"
            >
              <div className="text-4xl font-extrabold tabular-nums">{b.num}</div>
              <div className="mt-1.5 text-[0.65rem] uppercase tracking-[0.12em] text-muted">
                {b.lbl}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {freeProducts.map(p => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -6 }}
              onClick={() => onView(p)}
              className="group glass cursor-pointer overflow-hidden rounded-3xl transition-all hover:border-[rgba(0,224,255,0.4)] hover:shadow-card"
            >
              <div className="relative flex h-[170px] items-center justify-center border-b border-[rgba(0,224,255,0.1)] bg-gradient-to-br from-[#0a1425] to-[#0e1a30]">
                <Gamepad2
                  size={56}
                  className="text-[rgba(0,224,255,0.25)] transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute left-3 right-3 top-3 flex flex-wrap justify-between gap-1.5">
                  <Badge variant="undetected">UNDETECTED</Badge>
                  <Badge variant="new">NEW</Badge>
                </div>
              </div>
              <div className="flex flex-col p-5">
                <h3 className="text-base font-bold">{p.title}</h3>
                <p className="mt-0.5 text-xs font-semibold text-neon">{p.game}</p>
                <ul className="mt-3.5 space-y-1.5 text-xs text-muted">
                  {p.features.map(f => (
                    <li key={f} className="flex items-center gap-2">
                      <span className="text-neon">▹</span> {f}
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex items-end justify-between">
                  <div>
                    <div className="text-[0.6rem] uppercase tracking-[0.12em] text-muted">
                      HARGA
                    </div>
                    <div className="text-2xl font-extrabold text-[#00ffaa]">
                      {p.priceLabel}
                    </div>
                  </div>
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      onView(p);
                    }}
                    className="inline-flex items-center gap-1.5 rounded-full border border-[rgba(0,224,255,0.35)] px-4 py-2 text-xs font-semibold transition hover:bg-[rgba(0,224,255,0.1)] hover:border-neon"
                  >
                    View <ArrowRight size={12} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}