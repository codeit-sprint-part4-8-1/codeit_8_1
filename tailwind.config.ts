import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/styles/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        black: '#1B1B1B',
        nomadBlack:'#112211',

        green: {
          100: '#CED8D5', 
          200: '#0B3B2D',
          300: '#00AC07', 
        },
        red: {
          100: '#FFC2BA',  
          200: '#FF472E',  
          300: '#FFE4E0',
        },
        orange: {
          100: '#FFF4E8',
          200: '#FF7C1D',
        },
        yellow: {
          100: '#FFC23D',
        },
        blue: {
          100: '#E5F3FF',
          200: '#0085FF',
          300: '#2EB4FF',
        },
        gray: {
          100: '#FAFAFA',
          200: '#EEEEEE',
          300: '#DDDDDD',
          400: '#CBC9CF',
          500: '#ADAEB8',
          600: '#A4A1AA',
          700: '#A1A1A1',
          800: '#4B4B4B',
          900: '#79747E',
        },
      },
    },
  },
  plugins: [],
};
export default config;
