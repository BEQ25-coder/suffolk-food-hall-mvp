import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        cream: "#f6f0e4",
        moss: "#5c6b4d",
        sage: "#8e9b79",
        bark: "#3d342c",
        wheat: "#dfccb0",
        copper: "#b87046"
      },
      boxShadow: {
        soft: "0 10px 35px rgba(61, 52, 44, 0.08)"
      },
      borderRadius: {
        xl2: "1.5rem"
      }
    }
  },
  plugins: []
};

export default config;
