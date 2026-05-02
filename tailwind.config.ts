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
        accent: {
          DEFAULT: '#1E6BFF',
          dark: '#1554CC',
          light: '#EBF2FF',
        },
        'text-primary': '#1A1A2E',
        'text-secondary': '#4A5568',
        'text-muted': '#9CA3AF',
        border: '#E5E7EB',
        'bg-primary': '#FFFFFF',
        'bg-secondary': '#F8F9FA',
      },
      fontFamily: {
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
