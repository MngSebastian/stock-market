/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  mode: "jit",

  theme: {
    extend: {
      colors: {
        primary: "#0C1C2C",
        offWhite: "#DEDEDE ",
        white: "#F5F5F5",
      },
      boxShadow: {
        custom: "rgba(155, 155, 155, .5) 0px 0px 2px",
        customHover: "rgba(180, 180, 180, .5) 0px 0px 8px",
      },
    },
  },
  plugins: [],
};
