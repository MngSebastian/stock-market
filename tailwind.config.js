/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  mode: "jit",

  theme: {
    extend: {
      colors: {
        primary: "#0C1C2C",
        offWhite: "#f2f2f2",
        white: "#F5F5F5",
      },
      boxShadow: {
        light: "rgba(155, 155, 155, .5) 0px 0px 2px",
        dark: "rgba(20, 20, 20, .5) 0px 0px 6px",
        CardLight: "rgba(180, 180, 180, .5) 0px 0px 8px",
        CardDark: "rgba(0, 0, 0, .5) 0px 0px 8px",

        moonShadowLight: "rgba(255, 255, 255, .6) 0px 0px 5px .6px",
        moonShadowDark: "rgba(0, 0, 0, .6) 0px 0px 5px .6px",
      },
    },
  },
  plugins: [],
};
