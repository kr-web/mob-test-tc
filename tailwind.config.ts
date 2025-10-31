import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      mobile: { max: "767px" },
      laptop: "1440px",
      desktop: "1920px",
    },
    extend: {
      fontFamily: {
        sans: ["Pretendard", "sans-serif"],
        pretendardVar: ["Pretendard Variable", "sans-serif"],
      },
      colors: {
        primary: {
          navy: "#2A2F4C",
          gray: "#F1F4F7",
          blue: "#016DFF",
          green: "#99FF4B",
        },
        secondary: {
          purple: "#6920D0",
          orange: "#FF8D0C",
          red: "#E4383B",
          darkgray1: "#191E3C",
          darkgray2: "#3B4161",
          darkgray3: "#575E83",
          gray1: "#9FA3B7",
          gray2: "#B6B9CA",
          gray0: "#DFE2E9",
        },
        status: {
          false: "#E82160",
          error: "#FFCA0C",
          true: "#2CED6C",
        },
      },
      boxShadow: {
        soft: "0 0 8px rgba(0,0,0,0.1)",
        "soft-md": "0 0 10px rgba(0,0,0,0.25)",
      },
      screens: {
        "max-400": { max: "400px" },
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: true,
  },
} satisfies Config;
