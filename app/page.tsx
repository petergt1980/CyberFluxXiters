"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { TrustSection } from "@/components/TrustSection";
import { ProductSection } from "@/components/ProductSection";
import { FreeProducts } from "@/components/FreeProducts";
import { StaffSection } from "@/components/StaffSection";
import { Testimonials } from "@/components/Testimonials";
import { Footer } from "@/components/Footer";
import { FloatingButtons } from "@/components/FloatingButtons";
import { CartDrawer } from "@/components/CartDrawer";
import { Checkout } from "@/components/Checkout";
import { ProductDetail } from "@/components/ProductDetail";
import { Product } from "@/types";

export default function HomePage() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [selected, setSelected] = useState<Product | null>(null);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem("cyberAuth");
    if (auth !== "true") {
      router.replace("/login");
      return;
    }
    setReady(true);
  }, [router]);

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-sm text-muted">Memuat...</p>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TrustSection />
        <ProductSection onView={setSelected} />
        <FreeProducts onView={setSelected} />
        <StaffSection />
        <Testimonials />
      </main>
      <Footer />

      <FloatingButtons />
      <CartDrawer onCheckout={() => setCheckoutOpen(true)} />
      <Checkout open={checkoutOpen} onClose={() => setCheckoutOpen(false)} />
      <ProductDetail product={selected} onClose={() => setSelected(null)} />
    </>
  );
}