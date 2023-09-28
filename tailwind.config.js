const defaultTheme = require('tailwindcss/defaultTheme')
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Bebas Neue', ...defaultTheme.fontFamily.sans],
        'epilogue': ['Epilogue', ...defaultTheme.fontFamily.sans],
      }, 
      colors: {
        'grey': '#333333',
        'light-grey': '#999999',
        ...defaultTheme.colors
      }, 
      screens: {
        'xs': '425px',
        ...defaultTheme.screens,
      },
    },
  },
  plugins: [],
}