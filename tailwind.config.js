/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FFCD4F',
        secondary: '#503C00',
        accent: '#775A00',
        background: {
          light: '#FFFFFF',
          dark: '#000000',
        },
        text: {
          light: '#000000',
          dark: '#FFFFFF',
        },
        border: '#C5C5D7',
        tint: {
          light: '#2f95dc',
          dark: '#FFFFFF',
        },
      },
    },
  },
  plugins: [],
}

