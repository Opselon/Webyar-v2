/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1.5rem',
        sm: '2rem',
        lg: '3rem',
        xl: '4rem',
      },
    },
    extend: {
      colors: {
        brand: {
          50: '#f5f2ff',
          100: '#ede7ff',
          200: '#d8ceff',
          300: '#b9a5ff',
          400: '#9470ff',
          500: '#7448ff',
          600: '#5a2fd6',
          700: '#4624a8',
          800: '#331b7a',
          900: '#20114d',
        },
        accent: {
          50: '#eafff6',
          100: '#c8ffe8',
          200: '#9bffd5',
          300: '#63ffbf',
          400: '#2bfca9',
          500: '#06e390',
          600: '#00b474',
          700: '#00885a',
          800: '#005c40',
          900: '#003222',
        },
        midnight: '#0b1020',
        surface: {
          light: '#f7f8fc',
          DEFAULT: '#13192d',
          muted: '#0f1424',
        },
      },
      fontFamily: {
        sans: ['"Manrope"', '"Vazirmatn"', '"Cairo"', '"Inter"', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', '"Vazirmatn"', '"Cairo"', 'sans-serif'],
      },
      boxShadow: {
        glass: '0 25px 50px -12px rgba(80, 70, 180, 0.35)',
        neon: '0 0 20px rgba(43, 252, 169, 0.35)',
        soft: '0 15px 40px rgba(15, 20, 36, 0.12)',
      },
      backgroundImage: {
        'hero-grid':
          'linear-gradient(120deg, rgba(116,72,255,0.16) 0%, rgba(6,227,144,0.14) 60%, rgba(116,72,255,0.08) 100%), radial-gradient(circle at 20% 20%, rgba(43,252,169,0.18), transparent 55%), radial-gradient(circle at 80% 0%, rgba(116,72,255,0.28), transparent 45%)',
        'mesh-light':
          'radial-gradient(circle at 10% 20%, rgba(116,72,255,0.14), transparent 35%), radial-gradient(circle at 80% 0%, rgba(6,227,144,0.2), transparent 40%)',
        'mesh-dark':
          'radial-gradient(circle at 10% 20%, rgba(116,72,255,0.22), transparent 35%), radial-gradient(circle at 80% 0%, rgba(6,227,144,0.25), transparent 40%)',
      },
      transitionTimingFunction: {
        'in-expo': 'cubic-bezier(0.87, 0, 0.13, 1)',
      },
      rotate: {
        15: '15deg',
      },
    },
  },
  plugins: [],
};
