/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        black: '#000',
        'liyel': '#fbf3db',
        'dayel': '#e8d28b',
      },
      // fontFamily: {
      //   beatrice: ['"Beatrice"', 'sans-serif'],
      fontFamily: {
        avenir: ['Avenir', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
