"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Save,
  Youtube,
  Music2,
  Send,
  MessageCircle,
  Radio,
  Store,
  AlignLeft,
  Loader2,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { GlassCard } from "@/components/ui/GlassCard";
import { ToastContainer } from "@/components/ui/Toast";
import { useToast } from "@/lib/useToast";
import { Settings } from "@/lib/useSettings";

const EMPTY: Settings = {
  storeName: "",
  whatsapp: "",
  waChannel: "",
  youtube: "",
  tiktok: "",
  telegram: "",
  description: "",
};

export default function AdminSettingsPage() {
  const router = useRouter();
  const [form, setForm] = useState<Settings>(EMPTY);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const toast = useToast();

  useEffect(() => {
    const role = localStorage.getItem("cyberRole");
    const isAuth = localStorage.getItem("cyberAuth");

    if (isAuth !== "true") {
      router.replace("/login");
      return;
    }
    if (role !== "admin") {
      router.replace("/");
      return;
    }

    fetch("/api/settings")
      .then(r => r.json())
      .then(data => {
        setForm({
          storeName: data.storeName || "",
          whatsapp: data.whatsapp || "",
          waChannel: data.waChannel || "",
          youtube: data.youtube || "",
          tiktok: data.tiktok || "",
          telegram: data.telegram || "",
          description: data.description || "",
        });
      })
      .finally(() => setLoading(false));
  }, [router]);

  const update = <K extends keyof Settings>(key: K, value: Settings[K]) =>
    setForm(f => ({ ...f, [key]: value }));

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Gagal menyimpan");

      toast.success("Pengaturan berhasil disimpan!");
    } catch {
      toast.error("Gagal menyimpan pengaturan");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20 pb-24">
        <div className="mx-auto max-w-3xl px-6">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 text-xs text-muted">
              <a href="/admin" className="hover:text-neon">
                Admin
              </a>
              <span>/</span>
              <span className="text-neon">Pengaturan</span>
            </div>
            <h1 className="mt-2 text-3xl font-extrabold sm:text-4xl">
              Pengaturan Store
            </h1>
            <p className="mt-1 text-sm text-muted">
              Atur link sosial media & info toko
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="animate-spin text-neon" size={32} />
            </div>
          ) : (
            <form onSubmit={handleSave} className="space-y-6">
              {/* Store Info */}
              <GlassCard className="p-6" hover={false}>
                <h2 className="mb-5 text-lg font-bold">Info Toko</h2>

                <div className="space-y-4">
                  <Field icon={Store} label="Nama Toko">
                    <input
                      value={form.storeName}
                      onChange={e => update("storeName", e.target.value)}
                      placeholder="CYBER FLUX STORE"
                      className="admin-input"
                    />
                  </Field>

                  <Field icon={AlignLeft} label="Deskripsi">
                    <textarea
                      value={form.description}
                      onChange={e => update("description", e.target.value)}
                      placeholder="Premium gaming digital store..."
                      className="admin-input min-h-[80px]"
                    />
                  </Field>
                </div>
              </GlassCard>

              {/* Social Links */}
              <GlassCard className="p-6" hover={false}>
                <h2 className="mb-5 text-lg font-bold">Sosial Media</h2>

                <div className="space-y-4">
                  <Field icon={MessageCircle} label="WhatsApp (Link wa.me)">
                    <input
                      value={form.whatsapp}
                      onChange={e => update("whatsapp", e.target.value)}
                      placeholder="https://wa.me/6281234567890"
                      className="admin-input"
                    />
                  </Field>

                  <Field
                    icon={Radio}
                    label="Saluran WhatsApp (Channel)"
                  >
                    <input
                      value={form.waChannel}
                      onChange={e => update("waChannel", e.target.value)}
                      placeholder="https://whatsapp.com/channel/xxxxx"
                      className="admin-input"
                    />
                  </Field>

                  <Field icon={Youtube} label="YouTube">
                    <input
                      value={form.youtube}
                      onChange={e => update("youtube", e.target.value)}
                      placeholder="https://youtube.com/@channel"
                      className="admin-input"
                    />
                  </Field>

                  <Field icon={Music2} label="TikTok">
                    <input
                      value={form.tiktok}
                      onChange={e => update("tiktok", e.target.value)}
                      placeholder="https://tiktok.com/@username"
                      className="admin-input"
                    />
                  </Field>

                  <Field icon={Send} label="Telegram">
                    <input
                      value={form.telegram}
                      onChange={e => update("telegram", e.target.value)}
                      placeholder="https://t.me/channel"
                      className="admin-input"
                    />
                  </Field>
                </div>
              </GlassCard>

              {/* Save button */}
              <button
                type="submit"
                disabled={saving}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-neon py-4 text-sm font-bold text-bg shadow-[0_0_25px_rgba(0,224,255,0.35)] transition hover:shadow-glow-lg disabled:opacity-60"
              >
                {saving ? (
                  <>
                    <Loader2 size={16} className="animate-spin" /> Menyimpan...
                  </>
                ) : (
                  <>
                    <Save size={16} /> Simpan Pengaturan
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </main>

      <ToastContainer toasts={toast.toasts} onDismiss={toast.dismiss} />

      <style jsx global>{`
        .admin-input {
          width: 100%;
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(255, 255, 255, 0.04);
          padding: 12px 16px;
          font-size: 14px;
          color: white;
          outline: none;
        }
        .admin-input:focus {
          border-color: #00e0ff;
        }
      `}</style>
    </>
  );
}

function Field({
  icon: Icon,
  label,
  children,
}: {
  icon: any;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1.5 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted">
        <Icon size={14} className="text-neon" />
        {label}
      </label>
      {children}
    </div>
  );
}