/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{html,js}",
  ],
  theme: {
    extend: {
      colors: {
        'mountain-blue': '#1a365d',
        'mountain-light': '#2c5282',
        'snow-white': '#f7fafc',
        'copper': '#c05621',
        'copper-light': '#dd6b20',
        'whatsapp': '#25D366',
      },
      fontFamily: {
        'display': ['Oswald', 'sans-serif'],
        'body': ['Source Sans 3', 'sans-serif'],
      },
      lineClamp: {
        1: '1',
        2: '2',
        3: '3',
        4: '4',
      },
    },
  },
  plugins: [],
}