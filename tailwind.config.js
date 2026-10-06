/** @type {import('tailwindcss').Config} */
// 6th Agent design system: light mode, warm-neutral greys, single cobalt accent.
// NOTE: the `obsidian` scale is intentionally inverted (950 = page white, 100 = near-black ink)
// so legacy views built on the old dark tokens render correctly in light mode.
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#0B0B0C',
          soft: '#3A3A3F',
          muted: '#6B6B73',
          faint: '#9C9CA3',
        },
        paper: {
          DEFAULT: '#FFFFFF',
          50: '#FAFAF9',
          100: '#F4F4F2',
          200: '#EBEBE8',
          300: '#DEDEDA',
        },
        obsidian: {
          950: '#FFFFFF',
          900: '#FAFAF9',
          850: '#F6F6F4',
          800: '#F1F1EE',
          750: '#EAEAE6',
          700: '#E2E2DE',
          600: '#CFCFCA',
          500: '#A3A39D',
          400: '#6E6E6A',
          300: '#4E4E4B',
          200: '#2F2F2D',
          100: '#141414',
        },
        brand: {
          cyan: '#2F54EB', // primary accent (cobalt); legacy name kept for compatibility
          blue: '#2F54EB',
          violet: '#5B4BDB',
          purple: '#5B4BDB',
          emerald: '#0E9F6E',
          rose: '#E5484D',
          amber: '#D97706',
        },
        accent: {
          DEFAULT: '#2F54EB',
          soft: '#EEF2FF',
          ring: '#C7D2FE',
          ink: '#1D3BC2',
        },
      },
      fontFamily: {
        sans: ['Geist', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['Geist Mono', 'JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      backgroundImage: {
        'glow-gradient': 'radial-gradient(circle at 50% -20%, rgba(47, 84, 235, 0.08), transparent 70%)',
        'subtle-grid': 'radial-gradient(rgba(11, 11, 12, 0.07) 1px, transparent 1px)',
        'matrix-grid':
          'linear-gradient(to right, rgba(11,11,12,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(11,11,12,0.04) 1px, transparent 1px)',
      },
      boxShadow: {
        'glow-cyan': '0 6px 20px -8px rgba(47, 84, 235, 0.45)',
        'glow-blue': '0 6px 20px -8px rgba(47, 84, 235, 0.45)',
        'glow-emerald': '0 6px 20px -8px rgba(14, 159, 110, 0.4)',
        'glass-card': '0 1px 2px rgba(11,11,12,0.04), 0 12px 32px -12px rgba(11,11,12,0.12)',
        'subtle-border': 'inset 0 0 0 1px rgba(11,11,12,0.06)',
        card: '0 1px 2px rgba(11,11,12,0.04), 0 4px 16px -8px rgba(11,11,12,0.08)',
        float: '0 1px 2px rgba(11,11,12,0.05), 0 24px 48px -20px rgba(11,11,12,0.18)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-dot': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.35' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) both',
        'pulse-dot': 'pulse-dot 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
