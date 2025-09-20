/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#ffe9e9",
          100: "#ffd1d1",
          200: "#ffa8a8",
          300: "#ff7e7e",
          400: "#ff5a5a",
          500: "#ff385c", // smart rent system primary red
          600: "#e62e50",
          700: "#cc2048",
          800: "#b31638",
          900: "#99082c",
        },
        secondary: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
        },
        neutral: {
          50: "#f9fafb",
          100: "#f3f4f6",
          200: "#e5e7eb",
          300: "#d1d5db",
          400: "#9ca3af",
          500: "#6b7280",
          600: "#4b5563",
          700: "#374151",
          800: "#1f2937",
          900: "#111827",
        },
      },
      fontFamily: {
        sans: [
          "Circular",
          "Cereal",
          "-apple-system",
          "BlinkMacSystemFont",
          "Roboto",
          "Helvetica Neue",
          "sans-serif",
        ],
      },
      spacing: {
        128: "32rem",
      },
      boxShadow: {
        card: "0 6px 16px rgba(0, 0, 0, 0.12)",
        "card-hover": "0 8px 20px rgba(0, 0, 0, 0.15)",
        search: "0 4px 12px rgba(0, 0, 0, 0.1)",
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
