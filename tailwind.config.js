/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: [
      "./src/**/*.{html,js}",
      './index.html',
    ],
    theme: {
      extend: {
        colors: {
          primary: {
            500: '#9064d9'
          },
          secondary: {
            500: '#53b0be'
          }
        },
      },
    },
    plugins: [],
}