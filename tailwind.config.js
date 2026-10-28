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
        background: 'rgb(var(--color-bg) / <alpha-value>)',
        surface: {
          DEFAULT: 'rgb(var(--color-surface) / <alpha-value>)',
          elevated: 'rgb(var(--color-surface-elevated) / <alpha-value>)',
          card: 'rgb(var(--color-surface-card) / <alpha-value>)',
          subtle: 'rgb(var(--color-surface-subtle) / <alpha-value>)'
        },
        border: {
          DEFAULT: 'rgb(var(--color-border) / <alpha-value>)',
          hover: 'rgb(var(--color-border-hover) / <alpha-value>)',
          accent: 'rgb(var(--color-border-accent) / <alpha-value>)'
        },
        // Blue & its shades (Primary / Action / Exposure)
        teal: {
          DEFAULT: 'rgb(var(--color-teal) / <alpha-value>)',
          light: 'rgb(var(--color-teal-light) / <alpha-value>)',
          dark: 'rgb(var(--color-teal-dark) / <alpha-value>)',
          glow: 'var(--color-teal-glow)'
        },
        blue: {
          DEFAULT: 'rgb(var(--color-teal) / <alpha-value>)',
          light: 'rgb(var(--color-teal-light) / <alpha-value>)',
          dark: 'rgb(var(--color-teal-dark) / <alpha-value>)',
          glow: 'var(--color-teal-glow)'
        },
        accent: {
          blue: 'rgb(var(--color-accent-blue) / <alpha-value>)',
          cyan: 'rgb(var(--color-accent-cyan) / <alpha-value>)',
          purple: 'rgb(var(--color-accent-purple) / <alpha-value>)'
        },
        // Orange & its shades (Alerts / Pressure / Focus)
        coral: {
          DEFAULT: 'rgb(var(--color-coral) / <alpha-value>)',
          light: 'rgb(var(--color-coral-light) / <alpha-value>)',
          dark: 'rgb(var(--color-coral-dark) / <alpha-value>)',
          glow: 'var(--color-coral-glow)'
        },
        orange: {
          DEFAULT: 'rgb(var(--color-coral) / <alpha-value>)',
          light: 'rgb(var(--color-coral-light) / <alpha-value>)',
          dark: 'rgb(var(--color-coral-dark) / <alpha-value>)',
          glow: 'var(--color-coral-glow)'
        },
        // Status shades strictly in Blue and Orange
        status: {
          b1: 'rgb(var(--color-status-b1) / <alpha-value>)',
          b2: 'rgb(var(--color-status-b2) / <alpha-value>)',
          b3: 'rgb(var(--color-status-b3) / <alpha-value>)',
          npa: 'rgb(var(--color-status-npa) / <alpha-value>)',
          success: 'rgb(var(--color-status-success) / <alpha-value>)'
        },
        text: {
          primary: 'rgb(var(--color-text-primary) / <alpha-value>)',
          secondary: 'rgb(var(--color-text-secondary) / <alpha-value>)',
          muted: 'rgb(var(--color-text-muted) / <alpha-value>)',
          bright: 'rgb(var(--color-text-bright) / <alpha-value>)'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace']
      },
      boxShadow: {
        glow: 'var(--shadow-glow)',
        'glow-coral': 'var(--shadow-glow-coral)',
        glass: 'var(--shadow-glass)'
      }
    },
  },
  plugins: [],
};
