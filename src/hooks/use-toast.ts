"use client";

import { useState, useCallback } from "react";

interface ToastProps {
  id?: number;
  title: string;
  description?: string;
  variant?: "default" | "destructive" | "success" | "warning" | "info";
  duration?: number;
}

export function useToast() {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  const toast = useCallback(
    ({
      title,
      description,
      variant = "default",
      duration = 5000,
    }: ToastProps) => {
      const id = Date.now();
      const newToast = { id, title, description, variant, duration };

      setToasts((prev) => [...prev, newToast]);

      // Auto remove toast after duration
      setTimeout(() => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
      }, duration);

      return id;
    },
    []
  );

  const dismiss = useCallback((id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return { toast, dismiss, toasts };
}
