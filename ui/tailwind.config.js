/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      screens: {
        laptop: {max: "1280px"},
        btablet: {max: "920px"},
        tablet: {max: "820px"},
        stablet: {max: "540px"},
        phone: {max: "420px"},
        sphone: {max: "280px"},
      },
      fontFamily: {
        JetBrains: ["JetBrains mono", "sans-serif"],
      },
      colors: {
        Cherry: "#dd2476",
        Ponkan: "#ff512f",
        ShallowGrey: "#7c7c7c",
      },
    },
  },
  plugins: [],
};
