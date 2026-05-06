import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'flecto-green': '#004737',
        'flecto-green-dark': '#003329',
        'flecto-green-light': '#0A5A46',
        'flecto-cream': '#F5F0E8',
        'flecto-cream-dark': '#EDE8DF',
        'flecto-lime': '#C8F55A',
        'flecto-lime-hover': '#B8E84A',
        'flecto-text': '#0D1B17',
        'flecto-text-2': '#3D5249',
        'flecto-text-muted': '#7A9088',
        'bg-primary': '#F5F0E8',
        'bg-secondary': '#EDE8DF',
        'bg-dark': '#004737',
        'bg-card': '#FFFFFF',
        'bg-dark-card': '#0A5A46',
        'accent-primary': '#004737',
        'accent-hover': '#003329',
        'accent-lime': '#C8F55A',
        'accent-lime-hover': '#B8E84A',
        'border-flecto': '#DDD8CF',
        'border-dark': '#0A5A46',
      },
      fontFamily: {
        syne: ['var(--font-syne)', 'system-ui', 'sans-serif'],
        inter: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)',
        'card-hover': '0 10px 25px rgba(0,0,0,0.1), 0 4px 6px rgba(0,0,0,0.05)',
        navbar: '0 1px 3px rgba(0,0,0,0.08)',
        dropdown: '0 10px 40px rgba(0,0,0,0.12)',
        button: '0 1px 2px rgba(0,0,0,0.05)',
      },
    },
  },
  plugins: [],
};
export default config;
