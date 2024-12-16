/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: { customBrown: '#816F51',
                customYellow: '#F6E3B5'
       },
       fontFamily: { roboto: ['Roboto', 'sans-serif'],
                      belle: ['La Belle Aurore', 'cursive'],
                      annie: ['Annie Use Your Telescope', 'cursive'],
          },
       screens: { 
             'mobile': {'max': '641px'},
             'tablet': {'max': '769px', 'min': '642px'},
             'desktop': {'min': '770px'},
          },
    },
  },
  plugins: [],
}

