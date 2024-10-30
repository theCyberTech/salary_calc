/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#F1F6FA',
          100: '#E1EBF5',
          200: '#B8D1E5',
          300: '#2B5D8C',
          400: '#1E3D5C',
        }
      }
    },
  },
  plugins: [],
};