/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'beer-bg': '#0d0d13',
        'beer-card': '#1a1a24',
        'beer-border': '#2d1d4d',
        'beer-accent-pink': '#ec4899',
        'beer-accent-cyan': '#06b6d4',
      }
    },
  },
  plugins: [],
}