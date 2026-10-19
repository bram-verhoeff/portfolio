import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "#0A0A0B",
        surface: "#111113",
        elevated: "#17171A",
        fg: "#EDEDEF",
        muted: "#8B8B94",
        subtle: "#55555E",
        accent: {
          // Defined once in app/globals.css (--accent-rgb)
          DEFAULT: "rgb(var(--accent-rgb) / <alpha-value>)",
          fg: "#0A0A0B",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "Menlo", "monospace"],
      },
      transitionTimingFunction: {
        expo: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
