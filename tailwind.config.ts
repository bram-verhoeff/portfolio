import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#0a0a0a",
          soft: "#45484c",
        },
        muted: {
          DEFAULT: "#767a80",
        },
        accent: {
          DEFAULT: "#00b4ff",
          text: "#0077b6",
          dim: "rgba(0, 180, 255, 0.12)",
        },
        surface: "#ffffff",
        "bg-soft": "#f3f4f5",
        dark: {
          DEFAULT: "#0a0d10",
          card: "#12161b",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "sans-serif"],
        display: ["var(--font-fraunces)", "Fraunces", "serif"],
        mono: ["Consolas", "Menlo", "Courier New", "monospace"],
      },
      borderRadius: {
        capsule: "50px",
        card: "20px",
      },
      boxShadow: {
        card: "0 1px 2px rgba(10,10,10,0.04), 0 20px 40px -20px rgba(10,10,10,0.18)",
        lift: "0 1px 2px rgba(10,10,10,0.05), 0 30px 60px -20px rgba(10,10,10,0.28)",
        cyan: "0 0 25px rgba(0, 180, 255, 0.35)",
        "cyan-lg": "0 0 45px rgba(0, 180, 255, 0.45)",
      },
    },
  },
  plugins: [],
};

export default config;
