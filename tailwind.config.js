/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary
        'near-black': '#1a1a1a',
        'terracotta': '#c85a3a',
        'coral': '#ff6b4a',

        // Surface
        'parchment': '#f5f1ed',
        'ivory': '#faf8f5',
        'warm-sand': '#ede8e0',
        'pure-white': '#ffffff',

        // Dark Theme
        'dark-surface': '#2a2a2a',
        'deep-dark': '#1f1f1f',

        // Semantic
        'error-crimson': '#c41e3a',
        'focus-blue': '#0066cc',

        // Neutral
        'charcoal-warm': '#4a4a48',
        'stone-gray': '#8a8a88',
        'dark-warm': '#666663',
      },
      fontFamily: {
        serif: ['Georgia', 'serif'],
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['Menlo', 'Monaco', 'monospace'],
      },
      fontSize: {
        'display': '64px',
        'h1': '48px',
        'h2': '36px',
        'h3': '28px',
        'h4': '24px',
        'h5': '20px',
        'h6': '16px',
        'body': '14px',
        'label': '12px',
        'micro': '9.6px',
      },
      spacing: {
        xs: '4px',
        sm: '8px',
        md: '12px',
        lg: '16px',
        xl: '20px',
        '2xl': '24px',
        '3xl': '32px',
        '4xl': '40px',
        '5xl': '48px',
        '6xl': '56px',
        '7xl': '64px',
        '8xl': '80px',
        '9xl': '120px',
      },
      borderRadius: {
        'sharp': '4px',
        'sm': '6px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
        '2xl': '20px',
        '3xl': '24px',
        'max': '32px',
      },
      boxShadow: {
        'level-0': 'none',
        'level-1': '0px 1px 2px rgba(0, 0, 0, 0.05)',
        'level-2': '0px 0px 0px 1px rgba(0, 0, 0, 0.08)',
        'level-3': '0px 4px 8px rgba(0, 0, 0, 0.08)',
        'level-4': 'inset 0px 1px 2px rgba(0, 0, 0, 0.05)',
      },
      lineHeight: {
        tight: '1.10',
        snug: '1.20',
        normal: '1.40',
        relaxed: '1.60',
      },
    },
  },
  plugins: [],
}
