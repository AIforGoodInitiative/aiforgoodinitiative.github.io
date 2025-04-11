import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        violetSans: ["VioletSans", "sans-serif"],
        farroRegular: ["FarroRegular", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
