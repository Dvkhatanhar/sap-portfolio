/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      colors: {
        obsidian: { 950: '#05080f', 900: '#0a0f1c', 800: '#111827', 700: '#1a2334' },
        sapphire: { 300: '#7cc4ff', 400: '#3ea8ff', 500: '#0a84ff', 600: '#0070f2', 700: '#0057c2' },
        cyan: { 300: '#67e8f9', 400: '#22d3ee' },
        gold: { 300: '#fcd77f', 400: '#f5b83d', 500: '#e8a317' },
      },
      keyframes: {
        'fade-up': { '0%': { opacity: 0, transform: 'translateY(12px)' }, '100%': { opacity: 1, transform: 'translateY(0)' } },
        blink: { '0%,100%': { opacity: 1 }, '50%': { opacity: 0 } },
      },
      animation: {
        'fade-up': 'fade-up .6s ease-out both',
        blink: 'blink 1s step-end infinite',
      },
    },
  },
  plugins: [],
};
