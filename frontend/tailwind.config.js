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
          light: '#f0f9ff',
          DEFAULT: '#0284c7', // Sky 600
          dark: '#0369a1',   // Sky 700
        },
        secondary: {
          light: '#ccfbf1',
          DEFAULT: '#0d9488', // Teal 600
          dark: '#0f766e',   // Teal 700
        }
      }
    },
  },
  plugins: [],
}
