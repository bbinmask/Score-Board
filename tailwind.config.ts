import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/styles/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        "3xl": "0px 0px 20px rgb(50,50,50);",
        low: "0 0 5px rgb(50, 50, 50);",
        full: "0 0 400px 200px rgb(0, 0, 0, 0.700);",
      },
      backgroundImage: {
        "purple-grad":
          "linear-gradient(to right, rgba(106, 17, 203, 1), rgba(37, 117, 252, 1))",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        brushMT: "Brush Script MT",
        brushScript: "Brush Script",
        roboto: "Roboto Mono",
      },
      fontSize: {
        "10xl": "5rem",
        "5xl": "2.5rem",
      },
      transitionDuration: {
        "ease-in-out": "",
      },
      animation: {
        heading: "transform 1s ease-in-out",
      },
      borderWidth: {
        "1": "1px",
      },
      width: {
        xl: "30rem",
        nearFull: "98%",
      },
      transitionProperty: {
        "5s": "none",
      },
      transitionDelay: {
        "1s": "1000ms",
      },
      transitionTimingFunction: {
        "5s": "ease-in-out",
      },
      transformOrigin: {
        "-translate-x-1/2": "-50%",
        "-translate-y-1/2": "-50%",
      },
    },
  },
  plugins: [],
};
export default config;
