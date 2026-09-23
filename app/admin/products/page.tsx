"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Pencil,
  Trash2,
  X,
  Save,
  Package,
  Search,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { GlassCard } from "@/components/ui/GlassCard";
import { Product } from "@/types";
import { products as seedProducts } from "@/lib/data";

export default function AdminProductsPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [editing, setEditing] = useState<Product | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [query, setQuery] = useState("");

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

  const saved = localStorage.getItem("cyberProducts");
  if (saved) {
    setProducts(JSON.parse(saved));
  } else {
    setProducts(seedProducts);
    localStorage.setItem("cyberProducts", JSON.stringify(seedProducts));
  }
}, [router]);

  const saveAll = (list: Product[]) => {
    setProducts(list);
    localStorage.setItem("cyberProducts", JSON.stringify(list));
  };

  const handleDelete = (id: number) => {
    if (!confirm("Yakin hapus produk ini?")) return;
    saveAll(products.filter(p => p.id !== id));
  };

  const handleSave = (p: Product) => {
    const exists = products.find(x => x.id === p.id);
    if (exists) {
      saveAll(products.map(x => (x.id === p.id ? p : x)));
    } else {
      const newId = Math.max(0, ...products.map(x => x.id)) + 1;
      saveAll([...products, { ...p, id: newId }]);
    }
    setShowForm(false);
    setEditing(null);
  };

  const filtered = products.filter(p =>
    p.title.toLowerCase().includes(query.toLowerCase()) ||
    p.game.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20 pb-24">
        <div className="mx-auto max-w-[1300px] px-6">
          {/* Header */}
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs text-muted">
                <a href="/admin" className="hover:text-neon">Admin</a>
                <span>/</span>
                <span className="text-neon">Produk</span>
              </div>
              <h1 className="mt-2 text-3xl font-extrabold sm:text-4xl">
                Kelola Produk
              </h1>
              <p className="mt-1 text-sm text-muted">
                {products.length} produk terdaftar
              </p>
            </div>
            <button
              onClick={() => {
                setEditing(null);
                setShowForm(true);
              }}
              className="inline-flex items-center gap-2 rounded-full bg-neon px-6 py-3 text-sm font-bold text-bg shadow-[0_0_25px_rgba(0,224,255,0.35)] transition hover:-translate-y-0.5 hover:shadow-glow-lg"
            >
              <Plus size={16} /> Tambah Produk
            </button>
          </div>

          {/* Search */}
          <div className="relative mb-6 max-w-md">
            <Search
              size={16}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted"
            />
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Cari produk..."
              className="w-full rounded-xl border border-white/10 bg-white/[0.04] py-3 pl-11 pr-4 text-sm outline-none focus:border-neon"
            />
          </div>

          {/* List */}
          <div className="space-y-3">
            {filtered.map(p => (
              <GlassCard
                key={p.id}
                className="flex flex-wrap items-center gap-4 p-5"
                hover={false}
              >
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[rgba(0,224,255,0.08)] text-neon">
                  <Package size={22} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate font-bold">{p.title}</div>
                  <div className="text-xs text-neon">{p.game}</div>
                  <div className="mt-1 text-xs text-muted">
                    {p.category} · {p.version}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[0.65rem] uppercase tracking-wider text-muted">
                    Harga
                  </div>
                  <div className="font-bold">{p.priceLabel}</div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setEditing(p);
                      setShowForm(true);
                    }}
                    className="rounded-lg border border-white/10 p-2.5 text-muted transition hover:border-neon hover:text-neon"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="rounded-lg border border-white/10 p-2.5 text-muted transition hover:border-[#ff5050] hover:text-[#ff5050]"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </GlassCard>
            ))}

            {filtered.length === 0 && (
              <div className="py-16 text-center text-muted">
                Tidak ada produk yang cocok
              </div>
            )}
          </div>
        </div>
      </main>

      <AnimatePresence>
        {showForm && (
          <ProductForm
            initial={editing}
            onClose={() => {
              setShowForm(false);
              setEditing(null);
            }}
            onSave={handleSave}
          />
        )}
      </AnimatePresence>
    </>
  );
}

/* ---------- Form Modal ---------- */

function ProductForm({
  initial,
  onClose,
  onSave,
}: {
  initial: Product | null;
  onClose: () => void;
  onSave: (p: Product) => void;
}) {
  const [form, setForm] = useState<Product>(
    initial || {
      id: 0,
      title: "",
      game: "",
      category: "free-fire",
      price: 0,
      priceLabel: "",
      features: ["", "", ""],
      status: "undetected",
      version: "v1.0.0",
      compatibility: "Android 8+",
      delivery: "Instan via WhatsApp",
      description: "",
    }
  );

  const update = <K extends keyof Product>(key: K, value: Product[K]) =>
    setForm(f => ({ ...f, [key]: value }));

  const updateFeature = (idx: number, val: string) => {
    const features = [...form.features];
    features[idx] = val;
    update("features", features);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const clean: Product = {
      ...form,
      features: form.features.filter(f => f.trim()),
      priceLabel:
        form.priceLabel || `Rp ${form.price.toLocaleString("id-ID")}`,
    };
    onSave(clean);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[400] flex items-center justify-center bg-black/70 p-4 backdrop-blur-md"
    >
      <motion.form
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        onClick={e => e.stopPropagation()}
        onSubmit={submit}
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-[rgba(0,224,255,0.2)] bg-[rgba(8,14,28,0.98)] p-8"
      >
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">
            {initial ? "Edit Produk" : "Tambah Produk"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-muted transition hover:text-neon"
          >
            <X size={22} />
          </button>
        </div>

        <div className="space-y-4">
          <Field label="Judul Produk">
            <input
              required
              value={form.title}
              onChange={e => update("title", e.target.value)}
              className="admin-input"
              placeholder="ANDROID PREMIUM"
            />
          </Field>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Game">
              <input
                required
                value={form.game}
                onChange={e => update("game", e.target.value)}
                className="admin-input"
                placeholder="Free Fire"
              />
            </Field>
            <Field label="Kategori">
              <select
                value={form.category}
                onChange={e => update("category", e.target.value as any)}
                className="admin-input"
              >
                <option value="free-fire">Free Fire</option>
                <option value="standoff-2">Standoff 2</option>
                <option value="cs2">CS2</option>
                <option value="roblox">Roblox</option>
                <option value="other">Other</option>
              </select>
            </Field>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Harga (angka)">
              <input
                type="number"
                required
                value={form.price}
                onChange={e => update("price", Number(e.target.value))}
                className="admin-input"
              />
            </Field>
            <Field label="Badge">
              <select
                value={form.badge || ""}
                onChange={e =>
                  update("badge", (e.target.value || undefined) as any)
                }
                className="admin-input"
              >
                <option value="">Tidak ada</option>
                <option value="best">★ BEST</option>
                <option value="new">NEW</option>
              </select>
            </Field>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Field label="Version">
              <input
                value={form.version}
                onChange={e => update("version", e.target.value)}
                className="admin-input"
              />
            </Field>
            <Field label="Compatibility">
              <input
                value={form.compatibility}
                onChange={e => update("compatibility", e.target.value)}
                className="admin-input"
              />
            </Field>
            <Field label="Delivery">
              <input
                value={form.delivery}
                onChange={e => update("delivery", e.target.value)}
                className="admin-input"
              />
            </Field>
          </div>

          <Field label="Fitur (3 baris)">
            {form.features.map((f, i) => (
              <input
                key={i}
                value={f}
                onChange={e => updateFeature(i, e.target.value)}
                className="admin-input mt-2"
                placeholder={`Feature ${i + 1}`}
              />
            ))}
          </Field>

          <Field label="Deskripsi">
            <textarea
              required
              value={form.description}
              onChange={e => update("description", e.target.value)}
              className="admin-input min-h-[100px]"
            />
          </Field>
        </div>

        <button
          type="submit"
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-neon py-3.5 text-sm font-bold text-bg shadow-[0_0_25px_rgba(0,224,255,0.35)] transition hover:shadow-glow-lg"
        >
          <Save size={16} /> Simpan
        </button>
      </motion.form>

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
        .admin-input option {
          background: #0a101f;
          color: white;
        }
      `}</style>
    </motion.div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="text-xs font-semibold uppercase tracking-wider text-muted">
        {label}
      </label>
      <div className="mt-1.5">{children}</div>
    </div>
  );
}