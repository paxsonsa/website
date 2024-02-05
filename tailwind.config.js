/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,tsx,jsx}",
        "./posts/**/*.{mdx,js,ts,tsx,jsx}",
        "./components/**/*.{js,ts,tsx,jsx}",
    ],
    theme: {
        extend: {},
    },
    plugins: [
      require('@tailwindcss/typography')
    ],
}
