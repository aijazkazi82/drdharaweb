/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        teal: {
          850: '#0c4854',
          900: '#0F5C6B',
        }
      }
    },
  },
  plugins: [],
}