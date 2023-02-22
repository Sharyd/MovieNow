/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      keyframes: {
        'animated-line': {
          '0%': { width: '0rem', opacity: '0' },
          '100%': { width: '-10rem', opacity: '1' },
        },
      },
      backgroundImage: {
        hero: "url('/public/images/movie-bg.jpg')",
      },
    },
  },
  plugins: [],
};
