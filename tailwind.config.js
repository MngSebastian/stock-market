/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  mode: "jit",

  theme: {
    extend: {
      colors: {
        primary: "#0C1C2C",
      },
    },
  },
  plugins: [],
};
