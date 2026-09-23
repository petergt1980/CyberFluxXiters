"use client";

import { useEffect, useState } from "react";

export interface Settings {
  storeName: string;
  whatsapp: string;
  waChannel: string;
  youtube: string;
  tiktok: string;
  telegram: string;
  description: string;
}

const DEFAULT_SETTINGS: Settings = {
  storeName: "CYBER FLUX STORE",
  whatsapp: "",
  waChannel: "",
  youtube: "",
  tiktok: "",
  telegram: "",
  description:
    "Premium gaming digital store. Dominate every lobby dengan produk berkualitas dan support terbaik.",
};

export function useSettings() {
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/settings")
      .then(r => r.json())
      .then(data => {
        setSettings({
          storeName: data.storeName || DEFAULT_SETTINGS.storeName,
          whatsapp: data.whatsapp || "",
          waChannel: data.waChannel || "",
          youtube: data.youtube || "",
          tiktok: data.tiktok || "",
          telegram: data.telegram || "",
          description: data.description || DEFAULT_SETTINGS.description,
        });
      })
      .catch(() => {
        // Fallback ke default kalau API error
      })
      .finally(() => setLoading(false));
  }, []);

  return { settings, loading };
}