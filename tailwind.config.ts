import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        graphite: "#0D0D0D",
        steel: "#181818",
        steel2: "#2B2B2B",
        metal: "#FFFFFF",
        metalDim: "#9A9A9A",
        spark: "#D8301F",
        ember: "#A8241A",
        paper: "#F4F3EF",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      backgroundImage: {
        "spark-gradient": "linear-gradient(90deg, #D8301F 0%, #A8241A 100%)",
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
