// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'beer-primary': '#1a1a1a',
        'beer-secondary': '#2d2d3a',
        'beer-accent': {
          pink: '#ff69b4',
          cyan: '#40e0d0',
        }
      },
    },
  },
  plugins: [],
};

export default config;