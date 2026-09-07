/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,tsx,jsx}",
    "./components/**/*.{js,ts,tsx,jsx}",
    "./posts/**/*.{mdx,js,ts,tsx,jsx}",
    "./stories/**/*.{mdx,js,ts,tsx,jsx}",
  ],
  darkMode: ["selector", ".dark-mode"],
  theme: {
    extend: {
      fontFamily: {
        serif: ["var(--font-newsreader)", "Georgia", "serif"],
        mono: ["var(--font-overpass-mono)", "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [],
};
