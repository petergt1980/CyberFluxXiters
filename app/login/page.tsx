"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Lock,
  Mail,
  Eye,
  EyeOff,
  ShieldCheck,
  UserPlus,
  LogIn,
} from "lucide-react";

/* ============ KONFIG ADMIN ============ */
const ADMIN_CRED = {
  username: "admin",
  password: "cyber2026",
};

/* ============ TYPES ============ */
interface StoredUser {
  username: string;
  email: string;
  password: string;
  role: "user";
  createdAt: string;
}

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // Login form
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Register form
  const [regUsername, setRegUsername] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regConfirm, setRegConfirm] = useState("");

  /* ============ REDIRECT KALAU SUDAH LOGIN ============ */
  useEffect(() => {
    const isAuth = localStorage.getItem("cyberAuth");
    const role = localStorage.getItem("cyberRole");
    if (isAuth === "true") {
      router.replace(role === "admin" ? "/admin" : "/");
    }
  }, [router]);

  /* ============ HELPERS ============ */
  const getUsers = (): StoredUser[] => {
    try {
      return JSON.parse(localStorage.getItem("cyberUsers") || "[]");
    } catch {
      return [];
    }
  };

  const saveUsers = (list: StoredUser[]) => {
    localStorage.setItem("cyberUsers", JSON.stringify(list));
  };

  /* ============ LOGIN ============ */
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    setTimeout(() => {
      const user = loginUsername.trim();
      const pass = loginPassword;

      // 1. Cek admin
      if (user === ADMIN_CRED.username && pass === ADMIN_CRED.password) {
        // Set localStorage
        localStorage.setItem("cyberAuth", "true");
        localStorage.setItem("cyberRole", "admin");
        localStorage.setItem("cyberUser", user);
        localStorage.setItem("cyberAdminAuth", "true");
        localStorage.setItem("cyberAdminUser", user);

        // Set cookie biar middleware bisa baca
        document.cookie = "cyberAuth=true; path=/; max-age=86400";
        document.cookie = "cyberRole=admin; path=/; max-age=86400";

        router.push("/admin");
        return;
      }

      // 2. Cek user biasa
      const users = getUsers();
      const found = users.find(
        u => u.username === user && u.password === pass
      );

      if (found) {
        localStorage.setItem("cyberAuth", "true");
        localStorage.setItem("cyberRole", "user");
        localStorage.setItem("cyberUser", found.username);

        document.cookie = "cyberAuth=true; path=/; max-age=86400";
        document.cookie = "cyberRole=user; path=/; max-age=86400";

        router.push("/");
        return;
      }

      setError("Username atau password salah.");
      setLoading(false);
    }, 500);
  };

  /* ============ REGISTER ============ */
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const uname = regUsername.trim();
    const email = regEmail.trim();

    if (uname.length < 3) {
      setError("Username minimal 3 karakter.");
      return;
    }
    if (!email.includes("@")) {
      setError("Email tidak valid.");
      return;
    }
    if (regPassword.length < 6) {
      setError("Password minimal 6 karakter.");
      return;
    }
    if (regPassword !== regConfirm) {
      setError("Konfirmasi password tidak cocok.");
      return;
    }
    if (uname === ADMIN_CRED.username) {
      setError("Username tidak tersedia.");
      return;
    }

    const users = getUsers();
    if (users.some(u => u.username === uname)) {
      setError("Username sudah terdaftar.");
      return;
    }

    const newUser: StoredUser = {
      username: uname,
      email,
      password: regPassword,
      role: "user",
      createdAt: new Date().toISOString(),
    };

    saveUsers([...users, newUser]);
    setSuccess("Registrasi berhasil! Silakan login.");
    setMode("login");
    setLoginUsername(uname);
    setLoginPassword("");
    setRegUsername("");
    setRegEmail("");
    setRegPassword("");
    setRegConfirm("");
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-16">
      {/* Background glow */}
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
          <p className="mt-1 text-sm text-muted">
            {mode === "login" ? "Login untuk akses store" : "Buat akun baru"}
          </p>
        </div>

        {/* Tab switch */}
        <div className="mb-6 flex rounded-2xl border border-white/10 bg-white/[0.03] p-1">
          <button
            onClick={() => {
              setMode("login");
              setError("");
              setSuccess("");
            }}
            className={`flex-1 rounded-xl py-2.5 text-sm font-semibold transition ${
              mode === "login"
                ? "bg-neon text-bg shadow-[0_0_20px_rgba(0,224,255,0.3)]"
                : "text-muted hover:text-white"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => {
              setMode("register");
              setError("");
              setSuccess("");
            }}
            className={`flex-1 rounded-xl py-2.5 text-sm font-semibold transition ${
              mode === "register"
                ? "bg-neon text-bg shadow-[0_0_20px_rgba(0,224,255,0.3)]"
                : "text-muted hover:text-white"
            }`}
          >
            Daftar
          </button>
        </div>

        {/* Alerts */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mb-4 rounded-xl border border-[rgba(255,80,80,0.3)] bg-[rgba(255,80,80,0.08)] px-4 py-3 text-sm text-[#ff8888]"
            >
              {error}
            </motion.div>
          )}
          {success && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mb-4 rounded-xl border border-[rgba(0,255,170,0.3)] bg-[rgba(0,255,170,0.08)] px-4 py-3 text-sm text-[#00ffaa]"
            >
              {success}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ============ LOGIN FORM ============ */}
        {mode === "login" && (
          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              icon={User}
              label="Username"
              placeholder="user"
              value={loginUsername}
              onChange={setLoginUsername}
            />

            <Input
              icon={Lock}
              label="Password"
              placeholder="••••••••"
              value={loginPassword}
              onChange={setLoginPassword}
              type={showPass ? "text" : "password"}
              trailing={
                <button
                  type="button"
                  onClick={() => setShowPass(v => !v)}
                  className="text-muted hover:text-neon"
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              }
            />

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-neon py-3.5 text-sm font-bold text-bg shadow-[0_0_25px_rgba(0,224,255,0.35)] transition hover:shadow-glow-lg disabled:opacity-60"
            >
              <LogIn size={16} />
              {loading ? "Memproses..." : "Login"}
            </button>
          </form>
        )}

        {/* ============ REGISTER FORM ============ */}
        {mode === "register" && (
          <form onSubmit={handleRegister} className="space-y-4">
            <Input
              icon={User}
              label="Username"
              placeholder="minimal 3 karakter"
              value={regUsername}
              onChange={setRegUsername}
            />

            <Input
              icon={Mail}
              label="Email"
              placeholder="email@example.com"
              value={regEmail}
              onChange={setRegEmail}
              type="email"
            />

            <Input
              icon={Lock}
              label="Password"
              placeholder="minimal 6 karakter"
              value={regPassword}
              onChange={setRegPassword}
              type="password"
            />

            <Input
              icon={Lock}
              label="Konfirmasi Password"
              placeholder="ulangi password"
              value={regConfirm}
              onChange={setRegConfirm}
              type="password"
            />

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-neon py-3.5 text-sm font-bold text-bg shadow-[0_0_25px_rgba(0,224,255,0.35)] transition hover:shadow-glow-lg"
            >
              <UserPlus size={16} /> Daftar
            </button>
          </form>
        )}

        {/* Link ke halaman register terpisah (opsional) */}
        {mode === "login" && (
          <p className="mt-5 text-center text-xs text-muted">
            Dont't Have Account?{" "}
            <Link
              href="/register"
              className="font-semibold text-neon hover:underline"
            >
              Register
            </Link>
          </p>
        )}

        {/* Admin icon hint */}
        <div className="mt-4 flex items-center justify-center gap-1.5 text-[0.65rem] text-muted/60">
          <ShieldCheck size={12} />
          Role-based auth: admin & user dipisah
        </div>
      </motion.div>
    </div>
  );
}

/* ============ REUSABLE INPUT ============ */
function Input({
  icon: Icon,
  label,
  placeholder,
  value,
  onChange,
  type = "text",
  trailing,
}: {
  icon: any;
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  trailing?: React.ReactNode;
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
          className="w-full rounded-xl border border-white/10 bg-white/[0.04] py-3 pl-11 pr-11 text-sm text-white outline-none transition focus:border-neon"
        />
        {trailing && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            {trailing}
          </div>
        )}
      </div>
    </div>
  );
}