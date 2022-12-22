/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      sans: ['Fira Code'],
      serif: ['Fira Code']
    },
    extend: {
      colors: {
        'main-border': "#1E2D3D",
        'active-border': "#FEA55F",
      }
    },
  },
  plugins: [],
}
