import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Bebas Neue", ...defaultTheme.fontFamily.sans],
        epilogue: ["Epilogue", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        grey: "#333333",
        "light-grey": "#999999",
        ...defaultTheme.colors,
      },
      screens: {
        xs: "425px",
        ...defaultTheme.screens,
      },
    },
  },
  plugins: [],
};
export default config;
