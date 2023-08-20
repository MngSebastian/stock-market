/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  mode: "jit",

  theme: {
    extend: {
      colors: {
        primary: "#0C1C2C",
      },
      boxShadow: {
        lg: "rgba(0, 0, 0, 0.5) 0px 0px 3px",
      },
    },
  },
  plugins: [],
};
