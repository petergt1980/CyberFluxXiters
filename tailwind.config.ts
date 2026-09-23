import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./context/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#050912",
        "bg-soft": "#0a101f",
        neon: "#00e0ff",
        "neon-dim": "rgba(0,224,255,0.25)",
        muted: "#8e9fb1",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 15px rgba(0,224,255,0.4)",
        "glow-lg": "0 0 45px rgba(0,224,255,0.6)",
        card: "0 18px 35px -12px rgba(0,200,255,0.15)",
      },
      backgroundImage: {
        grid: `
          linear-gradient(rgba(0,224,255,0.02) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,224,255,0.02) 1px, transparent 1px)
        `,
      },
      backgroundSize: {
        grid: "40px 40px",
      },
      keyframes: {
        pulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.4" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      animation: {
        pulse: "pulse 1.8s infinite",
        float: "float 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;