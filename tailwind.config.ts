import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      primaryHover: "hsl(var(--ac-500))",
      primary: "hsl(var(--ac-500-hover))",
      medium: "hsl(var(--ac-300))",
      lighter: "hsl(var(--ac-100))",
      light: "hsl(var(--ac-200))",
      background: "hsl(var(--background))",
      gray: "hsl(var(--gray))",
      black: "hsl(var(--black))",
    },
    extend: {
      fontFamily: {
        Rubik: "'Rubik', sans-serif",
        Manrope: "'Manrope', sans-serif",
      },

      backgroundImage: {
        "svg-animation": "url('/public/images/background.svg')",
      },
    },
  },
  plugins: [],
};
export default config;
