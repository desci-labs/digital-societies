/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/**/*.html"],
  theme: {
    extend: {
      animation: {
        gradient: "gradients 3s linear infinite",
      },
      keyframes: {
        gradients: {
          "0%, 100%": {
            "background-position": "0% 50%",
          },
          "50%": {
            "background-position": "100% 50%",
          },
        },
      },
      colors: {
        dark: "#1F2128",
        white: "#FFFFFF",
        "regent-gray": "#8793A6",
        turquoise: "#42E2B8",
        "cornflower-blue": "#7B61FF",
        crimson: "#EF233C",
        "curious-blue": "#2A8FD8",
        "wild-sand": "#F4F4F4",
        iron: "#CFD5D9",
        casal: "#2B6B5A",
        success: "#712DD3",
        error: "#DD0505",
      },
      fontFamily: {
        heading: ["Montserrat", "serif"],
        body: ["Space Grotesk", "sans-serif"],
      },
      spacing: {
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
