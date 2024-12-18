const flowbite = require("flowbite-react/tailwind");


/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
     "./node_modules/flowbite/src/**/*.js",
    flowbite.content(),
  ],
  theme: {
    extend: {
      colors:{
        'text-color': '#3a4042',
        'bg-color-dark': '#0a0a0a',
        'bg-color-light1': '#F4F0EC',
        'bg-color-light2': '#E5E4E2',
      },
      
      
      fontSize:{
        'smaller':'0.7rem',
        1: '0.8rem',
        1.5:'0.9rem',
        2: '1rem',
        3: '1.125rem',
        4: '1.5rem',
        5: '2rem',
        6: '2.5rem',
        7:  '3rem',
        8: '3.5rem',

      },
    },
  },

  
  plugins: [
    flowbite.plugin(),
    require('flowbite/plugin'),
    require('@tailwindcss/typography'),
  ],

}