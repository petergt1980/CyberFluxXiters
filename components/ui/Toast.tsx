"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";
import { useEffect } from "react";

export type ToastType = "success" | "error" | "info";

export interface ToastData {
  id: number;
  type: ToastType;
  message: string;
}

interface ToastProps {
  toasts: ToastData[];
  onDismiss: (id: number) => void;
}

const ICONS = {
  success: CheckCircle2,
  error: AlertCircle,
  info: Info,
};

const COLORS = {
  success:
    "border-[rgba(0,255,170,0.3)] bg-[rgba(0,255,170,0.08)] text-[#00ffaa]",
  error:
    "border-[rgba(255,80,80,0.3)] bg-[rgba(255,80,80,0.08)] text-[#ff5050]",
  info: "border-[rgba(0,224,255,0.3)] bg-[rgba(0,224,255,0.08)] text-neon",
};

export function ToastContainer({ toasts, onDismiss }: ToastProps) {
  return (
    <div className="pointer-events-none fixed right-4 top-20 z-[600] flex w-full max-w-sm flex-col gap-2">
      <AnimatePresence>
        {toasts.map(t => {
          const Icon = ICONS[t.type];
          return (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, x: 60, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 60, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className={`pointer-events-auto flex items-start gap-3 rounded-2xl border p-4 backdrop-blur-xl ${COLORS[t.type]}`}
            >
              <Icon size={18} className="mt-0.5 shrink-0" />
              <p className="flex-1 text-sm font-medium text-white">
                {t.message}
              </p>
              <button
                onClick={() => onDismiss(t.id)}
                className="text-muted transition hover:text-white"
              >
                <X size={16} />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}