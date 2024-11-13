/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: [
    "./screens/**/*.{js,jsx,ts,tsx}",
    "./App.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        "custom-purple": "#920a6c",
        "light-grey": "#AFAFAF",
      },
    },
  },
  plugins: [],
};
