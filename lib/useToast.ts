"use client";

import { useState, useCallback } from "react";
import { ToastData, ToastType } from "@/components/ui/Toast";

export function useToast() {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const push = useCallback((message: string, type: ToastType = "info") => {
    const id = Date.now() + Math.random();
    setToasts(t => [...t, { id, type, message }]);

    setTimeout(() => {
      setToasts(t => t.filter(x => x.id !== id));
    }, 3500);
  }, []);

  const dismiss = useCallback((id: number) => {
    setToasts(t => t.filter(x => x.id !== id));
  }, []);

  return {
    toasts,
    dismiss,
    success: (msg: string) => push(msg, "success"),
    error: (msg: string) => push(msg, "error"),
    info: (msg: string) => push(msg, "info"),
  };
}