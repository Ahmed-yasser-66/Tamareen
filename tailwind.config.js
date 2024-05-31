/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    colors: {
      transparent: 'transparent',
      white: '#fff',
      'dark-gray': '#222831',
      'medium-gray': '#393e46',
      'bright-blue': '#0092ca',
      'light-blue': '#66c2e0',
      'light-gray': '#eeeeee',
    },
  },
  plugins: [],
};
