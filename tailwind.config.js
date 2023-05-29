/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      'genoa': {
        '50': '#effaf4',
        '100': '#d7f4e2',
        '200': '#b2e8c9',
        '300': '#80d5aa',
        '400': '#4cbb87',
        '500': '#29a06c',
        '600': '#1a7d54',
        '700': '#156747',
        '800': '#135239',
        '900': '#114331',
        '950': '#08261c',
    },
    'tabasco': {
      '50': '#fff3f1',
      '100': '#ffe5e1',
      '200': '#ffcfc8',
      '300': '#ffada1',
      '400': '#fe7d6b',
      '500': '#f7533c',
      '600': '#e4371e',
      '700': '#c02a15',
      '800': '#9e2615',
      '900': '#842518',
      '950': '#480f07',
  },
    },
    extend: {},
  },
  plugins: [],
}
