/** @type {import('tailwindcss').Config} */

const pxToRem = require('tailwindcss-preset-px-to-rem');

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
  presets: [pxToRem],
};
