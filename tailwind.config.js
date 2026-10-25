/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#08131F',
        surface: {
          DEFAULT: '#101F30',
          elevated: '#172A3E',
          card: '#0D1927',
          subtle: '#142538'
        },
        border: {
          DEFAULT: '#1E354D',
          hover: '#2E4C6D',
          accent: '#396088'
        },
        teal: {
          DEFAULT: '#54D7C7',
          light: '#76E5D7',
          dark: '#34AFA0',
          glow: 'rgba(84, 215, 199, 0.25)'
        },
        accent: {
          blue: '#63A9F5',
          cyan: '#38BDF8',
          purple: '#A78BFA'
        },
        coral: {
          DEFAULT: '#FF8A70',
          light: '#FFA692',
          dark: '#E06B52',
          glow: 'rgba(255, 138, 112, 0.25)'
        },
        status: {
          b1: '#38BDF8',
          b2: '#FBBF24',
          b3: '#FB923C',
          npa: '#F43F5E',
          success: '#34D399'
        },
        text: {
          primary: '#EDF5F7',
          secondary: '#91A9BA',
          muted: '#627D98',
          bright: '#FFFFFF'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace']
      },
      boxShadow: {
        glow: '0 0 20px -5px rgba(84, 215, 199, 0.3)',
        'glow-coral': '0 0 20px -5px rgba(255, 138, 112, 0.3)',
        glass: '0 8px 32px 0 rgba(0, 0, 0, 0.37)'
      }
    },
  },
  plugins: [],
};
