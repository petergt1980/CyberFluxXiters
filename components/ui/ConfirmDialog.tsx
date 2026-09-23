"use client";

import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, X } from "lucide-react";
import { Button } from "./Button";

interface ConfirmDialogProps {
  open: boolean;
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "danger" | "primary";
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDialog({
  open,
  title = "Konfirmasi",
  message,
  confirmText = "Ya, Lanjutkan",
  cancelText = "Batal",
  variant = "danger",
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onCancel}
          className="fixed inset-0 z-[500] flex items-center justify-center bg-black/70 p-4 backdrop-blur-md"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={e => e.stopPropagation()}
            className="relative w-full max-w-md overflow-hidden rounded-3xl border border-[rgba(0,224,255,0.2)] bg-[rgba(8,14,28,0.98)] backdrop-blur-2xl"
          >
            {/* Glow top */}
            <div
              className={`absolute inset-x-0 top-0 h-1 ${
                variant === "danger"
                  ? "bg-gradient-to-r from-transparent via-[#ff5050] to-transparent"
                  : "bg-gradient-to-r from-transparent via-neon to-transparent"
              }`}
            />

            {/* Close button */}
            <button
              onClick={onCancel}
              className="absolute right-4 top-4 text-muted transition hover:text-neon"
            >
              <X size={18} />
            </button>

            <div className="p-7">
              {/* Icon */}
              <div
                className={`mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border ${
                  variant === "danger"
                    ? "border-[rgba(255,80,80,0.3)] bg-[rgba(255,80,80,0.1)] text-[#ff5050]"
                    : "border-[rgba(0,224,255,0.3)] bg-[rgba(0,224,255,0.1)] text-neon"
                }`}
              >
                <AlertTriangle size={24} />
              </div>

              {/* Text */}
              <h3 className="text-center text-lg font-bold">{title}</h3>
              <p className="mt-2 text-center text-sm text-muted">{message}</p>

              {/* Actions */}
              <div className="mt-7 flex gap-3">
                <button
                  onClick={onCancel}
                  className="flex-1 rounded-xl border border-white/10 bg-white/[0.03] py-3 text-sm font-semibold text-muted transition hover:border-white/20 hover:text-white"
                >
                  {cancelText}
                </button>
                <button
                  onClick={onConfirm}
                  className={`flex-1 rounded-xl py-3 text-sm font-bold transition ${
                    variant === "danger"
                      ? "bg-[#ff5050] text-white shadow-[0_0_25px_rgba(255,80,80,0.4)] hover:shadow-[0_0_35px_rgba(255,80,80,0.6)]"
                      : "bg-neon text-bg shadow-[0_0_25px_rgba(0,224,255,0.4)] hover:shadow-glow-lg"
                  }`}
                >
                  {confirmText}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}