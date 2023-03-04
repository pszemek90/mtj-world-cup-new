/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
    darkMode: 'class',
  content: [
      "./index.html",
      "./src/**/*.{vue,js,ts,jsx,tsx}",
      "./node_modules/vue-tailwind-datepicker/**/*.js"
  ],
  theme: {
    extend: {
        colors: {
            light: "#cbd5e1", // slate-300
            dark: "#1f2937", // gray-800
            "vtd-primary": colors.slate,
            "vtd-secondary": colors.gray
        }
    },
    ripple: theme => ({
        colors: theme('colors')
    })
  },
  plugins: [
      require('@tailwindcss/forms'),
      require('tailwindcss-ripple')()
  ],
}
