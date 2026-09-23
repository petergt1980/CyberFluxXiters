"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Youtube,
  Music2,
  Send,
  ShoppingCart,
  Menu,
  X,
  MessageCircle,
  User,
  LogOut,
  Radio,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { logout } from "@/lib/auth";
import { useSettings } from "@/lib/useSettings";

const navItems = [
  { label: "Home", href: "/#home" },
  { label: "Products", href: "/#products" },
  { label: "Affiliate", href: "/affiliate" },
  { label: "Terms", href: "/terms" },
  { label: "Cek Order", href: "/cek-order" },
];

export function Navbar() {
  const { count, setCartOpen } = useCart();
  const { settings } = useSettings();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setUser(localStorage.getItem("cyberUser"));
    setRole(localStorage.getItem("cyberRole"));
  }, []);

  const handleLogout = () => logout(router);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-[rgba(5,9,18,0.75)] border-b border-[rgba(0,224,255,0.08)]">
      <div className="mx-auto flex max-w-[1300px] items-center justify-between gap-4 px-6 py-3.5">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-[10px] shadow-[0_0_18px_rgba(0,224,255,0.5)]">
            <img
              src="/logo.png"
              alt="Logo"
              className="h-full w-full object-cover"
            />
          </div>
          <span className="text-gradient text-xl font-bold tracking-tight">
            {settings.storeName}
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-7 text-sm font-medium text-muted lg:flex">
          {navItems.map(i => (
            <Link
              key={i.label}
              href={i.href}
              className="transition hover:text-neon"
            >
              {i.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Social icons */}
          <div className="hidden items-center gap-2 sm:flex">
            {settings.youtube && (
              <a
                href={settings.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 text-white/70 transition hover:bg-white/10 hover:text-white"
                aria-label="YouTube"
              >
                <Youtube size={16} />
              </a>
            )}
            {settings.tiktok && (
              <a
                href={settings.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 text-white/70 transition hover:bg-white/10 hover:text-white"
                aria-label="TikTok"
              >
                <Music2 size={16} />
              </a>
            )}
            {settings.telegram && (
              <a
                href={settings.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 text-white/70 transition hover:bg-white/10 hover:text-white"
                aria-label="Telegram"
              >
                <Send size={15} />
              </a>
            )}
          </div>

          {/* WhatsApp Channel */}
          {settings.waChannel && (
            <a
              href={settings.waChannel}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-2 rounded-xl border border-[#25D366]/40 bg-[#25D366]/10 px-3 py-2 text-xs font-semibold text-[#25D366] transition hover:bg-[#25D366]/20 sm:flex"
            >
              <Radio size={14} />
              Saluran
            </a>
          )}

          {/* WhatsApp */}
          {settings.whatsapp && (
            <a
              href={settings.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-2 rounded-xl bg-[#25D366] px-4 py-2 text-sm font-semibold text-white shadow-[0_0_18px_rgba(37,211,102,0.35)] transition hover:bg-[#1ebe5a] sm:flex"
            >
              <MessageCircle size={16} />
              WhatsApp
            </a>
          )}

          {/* Cart */}
          <button
            onClick={() => setCartOpen(true)}
            className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 text-white transition hover:bg-white/10"
            aria-label="Cart"
          >
            <ShoppingCart size={18} />
            {count > 0 && (
              <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-neon text-[0.65rem] font-extrabold text-bg">
                {count}
              </span>
            )}
          </button>

          {/* User menu */}
          {user && (
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(v => !v)}
                className="flex h-9 items-center gap-2 rounded-xl bg-white/5 px-3 text-xs font-semibold text-white transition hover:bg-white/10"
              >
                <User size={14} />
                <span className="hidden sm:inline">{user}</span>
              </button>

              <AnimatePresence>
                {userMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="absolute right-0 top-12 w-48 overflow-hidden rounded-2xl border border-[rgba(0,224,255,0.2)] bg-[rgba(8,14,28,0.98)] backdrop-blur-xl"
                  >
                    <div className="border-b border-white/5 px-4 py-3">
                      <div className="text-xs text-muted">Logged as</div>
                      <div className="text-sm font-bold">{user}</div>
                      <div className="text-[0.65rem] uppercase tracking-wider text-neon">
                        {role}
                      </div>
                    </div>
                    {role === "admin" && (
                      <Link
                        href="/admin"
                        onClick={() => setUserMenuOpen(false)}
                        className="block px-4 py-2.5 text-sm text-muted transition hover:bg-white/5 hover:text-neon"
                      >
                        Dashboard Admin
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm text-[#ff5050] transition hover:bg-[rgba(255,80,80,0.08)]"
                    >
                      <LogOut size={14} /> Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* Mobile menu */}
          <button
            onClick={() => setMobileOpen(v => !v)}
            className="text-white lg:hidden"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-white/5 lg:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {navItems.map(i => (
                <Link
                  key={i.label}
                  href={i.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm text-muted transition hover:bg-white/5 hover:text-neon"
                >
                  {i.label}
                </Link>
              ))}
              {settings.whatsapp && (
                <a
                  href={settings.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-2.5 text-sm font-semibold"
                >
                  <MessageCircle size={16} /> WhatsApp
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}