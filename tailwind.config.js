/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Palette officielle SENINFLUENCEURS (#8d1864)
        brand: {
          50:  '#fdf2f8',
          100: '#fce7f3',
          200: '#fbcfe8',
          300: '#f472b6',
          400: '#c026d3',
          500: '#a21caf',
          600: '#8d1864',  // Couleur officielle #8d1864
          700: '#751352',
          800: '#5c0f41',
          900: '#450b30',
          950: '#2c051f',
          gold: '#C9A64A',
          dark: '#8d1864',
        },
        // Mode clair (blanc/gris très clair)
        light: {
          bg:      '#F9FAFB',
          surface: '#FFFFFF',
          card:    '#F3F4F6',
          border:  'rgba(0,0,0,0.08)',
          hover:   '#F0F1F3',
          text:    '#111827',
          muted:   '#6B7280',
        },
        // Mode sombre (obsidian)
        dark: {
          bg:      '#0A0B0E',
          surface: '#12141A',
          card:    '#181A22',
          border:  'rgba(255,255,255,0.08)',
          hover:   '#222530',
          text:    '#F3F4F6',
          muted:   '#9CA3AF',
        }
      },
      fontFamily: {
        sans:    ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
        serif:   ['Playfair Display', 'serif'],
      },
      animation: {
        'marquee':         'marquee 40s linear infinite',
        'marquee-reverse': 'marquee-reverse 40s linear infinite',
        'float':           'float 6s ease-in-out infinite',
        'fade-in':         'fadeIn 0.3s ease-out',
        'slide-up':        'slideUp 0.3s ease-out',
        'spin-slow':       'spin 8s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%':   { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%':   { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-8px)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
      }
    },
  },
  plugins: [],
}
