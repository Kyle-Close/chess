/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme'

export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    screens: {
      ['2xs']: '350px',
      ['xs']: '400px',
      ...defaultTheme.screens,
    },
    extend: {
      spacing: {
        128: '32rem',
        160: '36rem',
      },
    },
  },
  plugins: [],
};
