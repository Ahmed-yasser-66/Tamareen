/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        'custom-glow': '0 0 3px #fff, inset 0 0 3px #fff, 0 0 23px #0092ca',
      },
      animation: {
        'bounce-fast': 'bounce 0.5s linear infinite',
      },
    },
    colors: {
      transparent: 'transparent',
      white: '#fff',
      danger: '#dc2626',
      'dark-gray': '#222831',
      'medium-gray': '#393e46',
      'bright-blue': '#0092ca',
      'light-blue': '#66c2e0',
      'light-gray': '#eeeeee',
    },
  },
  plugins: [],
};
