/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        espresso: {
          bg: '#131211',
          sand: '#a88f6c',
          sage: '#3d633a',
          sageLight: '#6b9666',
          amber: '#db8f38',
          champagne: '#ebdcb8',
          linen: '#ede9e1',
        },
      },
    },
  },
  plugins: [],
}
