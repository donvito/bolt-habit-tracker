/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        pink: {
          50: '#fff1f5',
          100: '#ffe4ed',
          500: '#ff4d8c',
          600: '#ff1a75',
          700: '#e6005c',
        },
      },
      boxShadow: {
        'pink': '0 4px 14px 0 rgba(255, 77, 140, 0.15)',
      },
    },
  },
  plugins: [],
};