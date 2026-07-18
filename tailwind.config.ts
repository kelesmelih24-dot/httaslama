import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        graphite: "#15171A",
        steel: "#23262B",
        steel2: "#2E3339",
        metal: "#C8CDD2",
        metalDim: "#8A9096",
        spark: "#FF5A1F",
        ember: "#FFA630",
        paper: "#F4F3EF",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      backgroundImage: {
        "spark-gradient": "linear-gradient(90deg, #FF5A1F 0%, #FFA630 100%)",
        "brushed-metal":
          "repeating-linear-gradient(100deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 3px)",
      },
      keyframes: {
        spark: {
          "0%": { transform: "translateX(-10%) scale(0.6)", opacity: "0" },
          "50%": { opacity: "1" },
          "100%": { transform: "translateX(110%) scale(1)", opacity: "0" },
        },
        riseIn: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        spark: "spark 1.8s ease-in-out infinite",
        riseIn: "riseIn 0.6s ease-out both",
      },
    },
  },
  plugins: [],
};
export default config;
