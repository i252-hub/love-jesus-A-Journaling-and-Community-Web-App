/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: { customBrown: '#816F51',
                customYellow: '#F6E3B5',
                inputBrown: 'hsla(38, 23%, 41%, 0.63)',
                placeBrown: 'hsla(38, 23%, 41%, 0.77)',
                textBrownish: '#2A2424',
                textBlackish: '#332B2B'
       },
       fontFamily: { roboto: ['Roboto', 'sans-serif'],
                      belle: ['La Belle Aurore', 'cursive'],
                      annie: ['Annie Use Your Telescope', 'cursive'],
          },
       screens: { 
             'mobile': {'max': '641px'},
             'tablet': {'max': '1024px', 'min': '642px'},
             'desktop': {'min': '1025px'},
          },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.text-stroke-1': {
          '-webkit-text-stroke': '1px black',
        },
        '.text-stroke-2': {
          '-webkit-text-stroke': '1px #816F51',
        },
      });
    },
    require('tailwind-scrollbar')
  ],
}

