"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { CartItem, Product } from "@/types";

interface CartContextValue {
  cart: CartItem[];
  addToCart: (p: Product) => void;
  removeFromCart: (id: number) => void;
  updateQty: (id: number, qty: number) => void;
  clearCart: () => void;
  subtotal: number;
  discount: number;
  total: number;
  discountPercent: number;
  applyCoupon: (code: string) => boolean;
  cartOpen: boolean;
  setCartOpen: (v: boolean) => void;
  count: number;
}

const CartContext = createContext<CartContextValue | null>(null);

export const COUPONS: Record<string, number> = {
  CYBER10: 10,
  CYBER20: 20,
  DOMINATE: 15,
};

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [discountPercent, setDiscountPercent] = useState(0);
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("cyberCart");
    if (saved) setCart(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("cyberCart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (p: Product) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === p.id);
      if (existing) {
        return prev.map(i => i.id === p.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...p, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(i => i.id !== id));
  };

  const updateQty = (id: number, qty: number) => {
    if (qty < 1) return removeFromCart(id);
    setCart(prev => prev.map(i => i.id === id ? { ...i, quantity: qty } : i));
  };

  const clearCart = () => {
    setCart([]);
    setDiscountPercent(0);
  };

  const subtotal = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const discount = Math.round((subtotal * discountPercent) / 100);
  const total = subtotal - discount;
  const count = cart.reduce((sum, i) => sum + i.quantity, 0);

  const applyCoupon = (code: string) => {
    const pct = COUPONS[code.toUpperCase()];
    if (pct) {
      setDiscountPercent(pct);
      return true;
    }
    return false;
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQty,
        clearCart,
        subtotal,
        discount,
        total,
        discountPercent,
        applyCoupon,
        cartOpen,
        setCartOpen,
        count,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}