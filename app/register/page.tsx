"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { User, Lock, Mail, UserPlus } from "lucide-react";

interface StoredUser {
  username: string;
  email: string;
  password: string;
  role: "user";
  createdAt: string;
}

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const getUsers = (): StoredUser[] => {
    try {
      return JSON.parse(localStorage.getItem("cyberUsers") || "[]");
    } catch {
      return [];
    }
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const uname = form.username.trim();
    if (uname.length < 3) return setError("Username minimal 3 karakter.");
    if (!form.email.includes("@")) return setError("Email tidak valid.");
    if (form.password.length < 6)
      return setError("Password minimal 6 karakter.");
    if (form.password !== form.confirm)
      return setError("Konfirmasi password tidak cocok.");
    if (uname === "admin") return setError("Username tidak tersedia.");

    const users = getUsers();
    if (users.some(u => u.username === uname))
      return setError("Username sudah terdaftar.");

    const newUser: StoredUser = {
      username: uname,
      email: form.email,
      password: form.password,
      role: "user",
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem("cyberUsers", JSON.stringify([...users, newUser]));
    setSuccess("Registrasi berhasil! Mengalihkan ke login...");
    setTimeout(() => router.push("/login"), 1200);
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-16">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-neon/5 blur-[140px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass w-full max-w-md rounded-3xl p-8"
      >
        {/* Logo */}
        <div className="mb-6 text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl shadow-[0_0_30px_rgba(0,224,255,0.5)]">
            <img
              src="/logo.png"
              alt="Logo"
              className="h-full w-full object-cover"
            />
          </div>
          <h1 className="text-2xl font-extrabold">CYBER FLUX STORE</h1>
          <p className="mt-1 text-sm text-muted">Buat akun baru</p>
        </div>

        {error && (
          <div className="mb-4 rounded-xl border border-[rgba(255,80,80,0.3)] bg-[rgba(255,80,80,0.08)] px-4 py-3 text-sm text-[#ff8888]">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 rounded-xl border border-[rgba(0,255,170,0.3)] bg-[rgba(0,255,170,0.08)] px-4 py-3 text-sm text-[#00ffaa]">
            {success}
          </div>
        )}

        <form onSubmit={submit} className="space-y-4">
          <Input
            icon={User}
            label="Username"
            value={form.username}
            onChange={v => setForm({ ...form, username: v })}
            placeholder="minimal 3 karakter"
          />
          <Input
            icon={Mail}
            label="Email"
            type="email"
            value={form.email}
            onChange={v => setForm({ ...form, email: v })}
            placeholder="email@example.com"
          />
          <Input
            icon={Lock}
            label="Password"
            type="password"
            value={form.password}
            onChange={v => setForm({ ...form, password: v })}
            placeholder="minimal 6 karakter"
          />
          <Input
            icon={Lock}
            label="Konfirmasi Password"
            type="password"
            value={form.confirm}
            onChange={v => setForm({ ...form, confirm: v })}
            placeholder="ulangi password"
          />

          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-neon py-3.5 text-sm font-bold text-bg shadow-[0_0_25px_rgba(0,224,255,0.35)] transition hover:shadow-glow-lg"
          >
            <UserPlus size={16} /> Daftar
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-muted">
          Sudah punya akun?{" "}
          <Link
            href="/login"
            className="font-semibold text-neon hover:underline"
          >
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

function Input({
  icon: Icon,
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  icon: any;
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  type?: string;
}) {
  return (
    <div>
      <label className="text-xs font-semibold uppercase tracking-wider text-muted">
        {label}
      </label>
      <div className="relative mt-1.5">
        <Icon
          size={16}
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted"
        />
        <input
          required
          type={type}
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-xl border border-white/10 bg-white/[0.04] py-3 pl-11 pr-4 text-sm text-white outline-none focus:border-neon"
        />
      </div>
    </div>
  );
}