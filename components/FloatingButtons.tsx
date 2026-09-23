"use client";

import { ShoppingCart, MessageCircle, ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import { STORE } from "@/lib/data";

export function FloatingButtons() {
  const { setCartOpen, count } = useCart();
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="glass fixed bottom-7 left-7 z-40 flex h-12 w-12 items-center justify-center rounded-full text-white transition hover:border-neon hover:shadow-glow"
        >
          <ArrowUp size={18} />
        </button>
      )}

      <a
        href={STORE.social.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-24 right-7 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-2xl text-white shadow-[0_0_30px_rgba(37,211,102,0.5)] transition hover:scale-110 hover:shadow-[0_0_45px_rgba(37,211,102,0.8)]"
      >
        <MessageCircle size={24} />
      </a>

      <button
        onClick={() => setCartOpen(true)}
        className="relative fixed bottom-7 right-7 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-neon text-xl text-bg shadow-[0_0_30px_rgba(0,224,255,0.5)] transition hover:scale-110 hover:shadow-glow-lg"
      >
        <ShoppingCart size={22} />
        {count > 0 && (
          <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-[#0a101f] text-[0.7rem] font-extrabold text-neon">
            {count}
          </span>
        )}
      </button>
    </>
  );
}