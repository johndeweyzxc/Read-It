/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      screens: {
        laptop: {max: "970px"},
        tablet: {max: "600px"},
        stablet: {max: "500px"},
        phone: {max: "400px"},
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
