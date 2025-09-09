/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'background': '#F4E9D7',
        'surface': '#D9CBBF',
        'primary': '#072D42',
        'accent': '#F29E38',
        'text-main': '#464E59',
        'text-muted': '#9298A6',
        'stroke': '#BFAEA4'
      },
      // ESTA SECCIÓN ES CRUCIAL:
      // Le dice a Tailwind que existen las clases font-bodoni y font-miles.
      fontFamily: {
        'bodoni': ['Bodoni', 'serif'],
        'miles': ['Miles Light', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
