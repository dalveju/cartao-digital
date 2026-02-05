/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // <--- MUDANÇA: Adicionei "/src/**/" aqui
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
