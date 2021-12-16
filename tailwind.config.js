const colors = require('tailwindcss/colors');
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./client/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        sky: colors.sky,
        cyan: colors.cyan,
        electric: '#db00ff',
        ribbon: '#0047ff',
      },
    },
  },
  //variants: {
  //  opacity: ({ after }) => after(['disabled'])
  //},
  plugins: [require('@tailwindcss/forms')],
};
