const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./src/App.tsx",
    "./src/screens/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "selector",
  theme: {
    colors: {
      primary: "#7E1EED",
      "primary-dark": "#4B00A1",
      "primary-light": "#B87AFF",
      secondary: "#FF5F05",
      "secondary-dark": "#CC4B04",
      "secondary-light": "#FF8F47",
      slate: {
        50: "#f5f5f5",
        100: "#e7e7e7",
        200: "#d1d1d1",
        300: "#b0b0b0",
        400: "#888888",
        500: "#666666",
        600: "#4d4d4d",
        700: "#363636",
        800: "#1f1f1f",
        900: "#0f0f0f",
      }
    },
    fontFamily: {
      primary: ["Montserrat", "sans-serif"],
      secondary: ["Poppins", "sans-serif"],
    },
    screens: {
      lg: "1080px",
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
});
