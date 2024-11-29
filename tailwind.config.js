/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'text-color': 'var(--text-color)',
        'bg-color-dark': 'var(--bg-color-dark)',
        'bg-color-light1': 'var(--bg-color-light1)',
        'bg-color-light2': 'var(--bg-color-light2)',
      }
    },
  },
  plugins: [],
}