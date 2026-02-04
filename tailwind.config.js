/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "brand-black": "#111111",
        "brand-white": "#FFFFFF",
        "brand-offwhite": "#F9F9F9",
        "brand-gray": "#444444",
        "brand-red": "#E10600",
        "brand-red-dark": "#BE0500",
      },
      fontFamily: {
        sans: ["Inter", "Poppins", "sans-serif"],
      },
      boxShadow: {
        'premium': '0 10px 30px -10px rgba(0, 0, 0, 0.1)',
        'red-glow': '0 0 20px rgba(225, 6, 0, 0.1)',
      }
    },
  },
  plugins: [],
}
