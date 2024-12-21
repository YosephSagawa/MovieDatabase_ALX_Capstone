/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
        raleway: ["Raleway", "sans-serif"],
        nunito: ["Nunito", "sans-serif"],
      },
      colors: {
        primary: "#1A1A1D",
        secondary: "#2A2E37",
        footer: "#212126",
        textreel: "#EDEDED",
        movietitle: "#00FFFF",
      },
    },
  },
  plugins: [],
};
