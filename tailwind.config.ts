import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: "#1B3B2B",
          dark: "#132B1F",
          deep: "#0B1D14",
          light: "#2C5540",
          muted: "#234433",
        },
        sand: {
          DEFAULT: "#C8A27B",
          dark: "#AD8560",
          light: "#E2CBAE",
          warm: "#D9BE9B",
        },
        cream: {
          DEFAULT: "#FDFBF7",
          pure: "#FFFFFF",
          warm: "#F7F4EC",
        },
        mist: {
          DEFAULT: "#EFEAE0",
          light: "#F4F0E8",
          dark: "#DED6C7",
        },
        charcoal: {
          DEFAULT: "#222222",
          light: "#3A3A3A",
          muted: "#555555",
        },
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        content: "1320px",
        wide: "1440px",
      },
      letterSpacing: {
        wideish: "0.04em",
        luxury: "0.15em",
        ultra: "0.25em",
      },
      boxShadow: {
        luxury: "0 10px 30px -10px rgba(19, 43, 31, 0.08)",
        "luxury-md": "0 20px 40px -15px rgba(19, 43, 31, 0.12)",
        "luxury-lg": "0 30px 60px -20px rgba(19, 43, 31, 0.18)",
        "luxury-card": "0 4px 20px 0 rgba(19, 43, 31, 0.06)",
        "luxury-float": "0 24px 48px -12px rgba(11, 29, 20, 0.25)",
      },
      transitionTimingFunction: {
        elegant: "cubic-bezier(0.16, 1, 0.3, 1)",
        smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        subtleZoom: {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.05)" },
        },
      },
      animation: {
        "fade-in-up": "fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "subtle-zoom": "subtleZoom 20s cubic-bezier(0.25, 1, 0.5, 1) infinite alternate",
      },
    },
  },
  plugins: [],
};

export default config;
