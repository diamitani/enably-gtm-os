/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        obsidian: {
          950: '#06080F',
          900: '#0B0F19',
          850: '#0F1422',
          800: '#141B2D',
          750: '#1A233A',
          700: '#1F293D',
          600: '#2E3D5B',
          500: '#475A82',
          400: '#7387AC',
          300: '#A4B5D4',
          200: '#CBD7EB',
          100: '#E8EFF9',
        },
        brand: {
          cyan: '#00F0FF',
          blue: '#3B82F6',
          violet: '#8B5CF6',
          purple: '#A855F7',
          emerald: '#10B981',
          rose: '#F43F5E',
          amber: '#F59E0B',
        },
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      backgroundImage: {
        'glow-gradient': 'radial-gradient(circle at 50% -20%, rgba(0, 240, 255, 0.12), rgba(59, 130, 246, 0.05) 50%, transparent 80%)',
        'subtle-grid': 'radial-gradient(rgba(255, 255, 255, 0.06) 1px, transparent 1px)',
        'matrix-grid': 'linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)',
      },
      boxShadow: {
        'glow-cyan': '0 0 25px -5px rgba(0, 240, 255, 0.25)',
        'glow-blue': '0 0 25px -5px rgba(59, 130, 246, 0.25)',
        'glow-emerald': '0 0 25px -5px rgba(16, 185, 129, 0.25)',
        'glass-card': '0 8px 32px 0 rgba(0, 0, 0, 0.45)',
        'subtle-border': 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.08)',
      },
    },
  },
  plugins: [],
};
