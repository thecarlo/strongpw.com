/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/index.html',
    './src/**/*.{ts,tsx}',
    '!coverage/**',
    '!dist/**',
    '!node_modules/**',
  ],
  theme: {
    extend: {
      fontFamily: {
        robotomono: ['Roboto Mono', 'monospace'],
      },
    },
  },
  plugins: [],
};
