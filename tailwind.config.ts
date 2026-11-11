import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#14151A',
        graphite: '#1C1E25',
        bone: '#ECEDF0',
        mist: '#9096A6',
        electric: { DEFAULT: '#5A5CFF', soft: '#8F90FF', violet: '#9B6BFF' },
      },
      fontFamily: {
        display: ['"Syne Variable"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['"Hanken Grotesk Variable"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      transitionTimingFunction: { out: 'cubic-bezier(0.22, 1, 0.36, 1)' },
    },
  },
  plugins: [],
};
export default config;
