import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{ts,tsx,js,jsx}",
    "./components/**/*.{ts,tsx,js,jsx}",
    "./styles/**/*.{css}",
    "./lib/**/*.{ts,tsx,js,jsx}",
    "./hooks/**/*.{ts,tsx,js,jsx}",
  ],
  theme: { extend: {} },
  plugins: [],
} satisfies Config;
