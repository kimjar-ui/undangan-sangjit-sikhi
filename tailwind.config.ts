import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        maroon: {
          deep: "#3D0E1A",
          DEFAULT: "#6B1F2E",
          light: "#8C3245",
        },
        ivory: "#FBF6F0",
        blush: "#EFE1D8",
        gold: {
          DEFAULT: "#B08D57",
          light: "#D9B978",
        },
        ink: "#2A2020",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        body: ["var(--font-manrope)", "sans-serif"],
        script: ["var(--font-script)", "cursive"],
      },
      maxWidth: {
        content: "640px",
      },
      letterSpacing: {
        wide2: "0.08em",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
