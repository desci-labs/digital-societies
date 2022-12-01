/** @type {import('tailwindcss').Config} */
// import defaultTheme from "tailwindcss/defaultTheme";

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/**/*.html"],
  darkMode: "class",
  theme: {
    extend: {
      animation: {
        gradient: "gradients 1s linear infinite",
        scaleIn: "scaleIn 100ms ease-out",
      },
      keyframes: {
        scaleIn: {
          "0%": {
            transform: "scale(1.5)",
            opacity: "0.2",
          },
          "100%": {
            transform: "scale(1)",
            opacity: "1",
          },
        },
        gradients: {
          "0%, 100%": {
            "background-position": "0% 30%",
          },
          "50%": {
            "background-position": "100% 40%",
          },
        },
      },
      colors: {
        dark: "#1F2128",
        white: "#FFFFFF",
        "regent-gray": "#8793A6",
        turquoise: "#42E2B8",
        "cornflower-blue": "#7B61FF",
        "curious-blue": "#2A8FD8",
        "wild-sand": "#F4F4F4",
        iron: "#CFD5D9",
        casal: "#2B6B5A",
        primary: "rgb(82, 168, 193)",
        "primary-hover": "#61DCF7",
        "neutrals-gray-1": "#272727",
        "neutrals-gray-2": "#333333",
        "neutrals-gray-3": "#525659",
        "neutrals-gray-4": "#757575",
        "neutrals-gray-5": "#969696",
        "neutrals-gray-6": "#C3C3C3",
        "neutrals-gray-7": "#D8D8D8",
        "neutrals-gray-8": "#EFEFEF",
        "neutrals-black": "#191B1C",
        "states-error": "#F41A56",
        "states-success": "#00A180",
        "tint-primary": "#28AAC4",
        "tint-primary-hover": "#77DDE4",
        "tint-primary-dark": "#238396",
        "light-gray": "#e9e9e9",
        "dark-gray": "rgb(35,35,35)",
        "medium-gray": "rgb(51, 51, 51)",
      },
      fontFamily: {
        heading: ["Montserrat", "serif"],
        body: ["Space Grotesk", "sans-serif"],
      },
      spacing: {
        12: "3rem",
        20: "5rem",
        32: "8rem",
        40: "10rem",
        48: "12rem",
        80: "80%",
        88: "22rem",
        104: "26rem",
        120: "30rem",
        160: "40rem",
        180: "45rem",
        200: "50rem",
      },
      minWidth: {
        12: "3rem",
        20: "5rem",
        32: "8rem",
        48: "12rem",
        88: "22rem",
        104: "26rem",
        120: "30rem",
        160: "40rem",
        180: "45rem",
        200: "50rem",
      },
      maxWidth: {
        500: "630px",
        80: "80%",
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ["disabled"],
      textColor: ["disabled"],
      translate: ["active"],
      display: ["hover", "group-hover"],
      opacity: ["hover", "group-hover"],
      brightness: ["hover", "group-hover"],
      transform: ["hover", "active"],
    },
  },
  plugins: ["tailwindcss", "postcss-flexbugs-fixes"],
};
