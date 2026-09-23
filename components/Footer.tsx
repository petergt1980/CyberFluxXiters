"use client";

import Link from "next/link";
import {
  Youtube,
  Music2,
  Send,
  MessageCircle,
  Radio,
} from "lucide-react";
import { useSettings } from "@/lib/useSettings";

export function Footer() {
  const { settings } = useSettings();

  return (
    <footer className="border-t border-[rgba(0,224,255,0.06)] bg-[rgba(3,6,12,0.9)] py-16">
      <div className="mx-auto max-w-[1300px] px-6">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-[10px] shadow-[0_0_18px_rgba(0,224,255,0.5)]">
                <img
                  src="/logo.png"
                  alt="Logo"
                  className="h-full w-full object-cover"
                />
              </div>
              <span className="text-gradient text-xl font-bold">
                {settings.storeName}
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm text-muted">
              {settings.description}
            </p>
          </div>

          {/* Menu */}
          <div>
            <h4 className="mb-4 text-xs font-bold uppercase tracking-[0.12em] text-muted">
              Menu
            </h4>
            <div className="space-y-2.5 text-sm">
              <Link
                href="/"
                className="block text-muted transition hover:text-neon"
              >
                Home
              </Link>
              <Link
                href="/#products"
                className="block text-muted transition hover:text-neon"
              >
                Products
              </Link>
              <Link
                href="/affiliate"
                className="block text-muted transition hover:text-neon"
              >
                Affiliate
              </Link>
              <Link
                href="/terms"
                className="block text-muted transition hover:text-neon"
              >
                Terms
              </Link>
              <Link
                href="/cek-order"
                className="block text-muted transition hover:text-neon"
              >
                Cek Order
              </Link>
            </div>
          </div>

          {/* Social — semua link diambil dari settings */}
          <div>
            <h4 className="mb-4 text-xs font-bold uppercase tracking-[0.12em] text-muted">
              Social
            </h4>
            <div className="space-y-2.5 text-sm">
              {settings.whatsapp && (
                <a
                  href={settings.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-muted transition hover:text-neon"
                >
                  <MessageCircle size={16} /> WhatsApp
                </a>
              )}

              {settings.waChannel && (
                <a
                  href={settings.waChannel}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-muted transition hover:text-neon"
                >
                  <Radio size={16} /> Saluran WhatsApp
                </a>
              )}

              {settings.telegram && (
                <a
                  href={settings.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-muted transition hover:text-neon"
                >
                  <Send size={16} /> Telegram
                </a>
              )}

              {settings.tiktok && (
                <a
                  href={settings.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-muted transition hover:text-neon"
                >
                  <Music2 size={16} /> TikTok
                </a>
              )}

              {settings.youtube && (
                <a
                  href={settings.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-muted transition hover:text-neon"
                >
                  <Youtube size={16} /> YouTube
                </a>
              )}

              {/* Kalau semua kosong — tampilkan placeholder */}
              {!settings.whatsapp &&
                !settings.waChannel &&
                !settings.telegram &&
                !settings.tiktok &&
                !settings.youtube && (
                  <p className="text-xs text-muted/60">
                    Link sosial belum diatur
                  </p>
                )}
            </div>
          </div>

          {/* Info */}
          <div>
            <h4 className="mb-4 text-xs font-bold uppercase tracking-[0.12em] text-muted">
              Info
            </h4>
            <p className="text-sm text-muted">
              Fast delivery, constant updates, dan dedicated support untuk
              semua gamers.
            </p>
          </div>
        </div>

        <div className="mt-12 border-t border-white/5 pt-6 text-center text-xs text-muted">
          © 2026 {settings.storeName}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}