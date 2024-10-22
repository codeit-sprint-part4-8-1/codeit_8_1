import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/styles/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      height: {
        '240': '240px',
        '550': '550px',
      },
      screens: {
        pc: '1280px',
        tablet: '768px',
        tablet2: { max: '1279px' },
        mobile: { max: '767px' },
      },
      colors: {
        black: '#1B1B1B',
        nomadBlack: '#112211',
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
      backgroundImage: {
        'main-banner':
          'linear-gradient(to right, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.4) 100%)',
      },
      animation: {
        fadeIn: 'fadeIn 3s forwards',
        fadeOut: 'fadeOut 0.4s forwards',
        backgroundMove: 'backgroundMove 3s forwards',
        modalFadeIn: 'modalFadeIn 0.5s forwards',
        modalFadeOut: 'modalFadeOut 0.5s forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(110px)' },
          '50%': { opacity: '1', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeOut: {
          '0%': { opacity: '0' },
          '100%': { opacity: '0' },
        },
        backgroundMove: {
          '0%': { 'background-position': 'center center' },
          '50%': { 'background-position': 'center 70%' },
          '100%': { 'background-position': 'center center' },
        },
        modalFadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        modalFadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
      },
    },
  },
  plugins: [
    plugin(({ addUtilities }) => {
      const fontStyles = [
        { size: '12px', weights: [400, 500, 600], lineHeight: '18px' }, // Text-xs
        { size: '13px', weights: [500, 600], lineHeight: '22px' }, // Text-sm
        { size: '14px', weights: [400, 500, 600, 700], lineHeight: '24px' }, // Text-md
        { size: '16px', weights: [400, 500, 600, 700], lineHeight: '26px' }, // Text-lg
        { size: '18px', weights: [400, 500, 600, 700], lineHeight: '26px' }, // Text-2lg
        { size: '20px', weights: [400, 500, 600, 700], lineHeight: '32px' }, // Text-xl
        { size: '24px', weights: [400, 500, 600, 700], lineHeight: '32px' }, // Text-2xl
        { size: '32px', weights: [600, 700], lineHeight: '42px' }, // Text-3xl
        { size: '36px', weights: [700], lineHeight: '50px' }, // 추가된 크기
      ];

      const utilities = fontStyles.flatMap(({ size, weights, lineHeight }) => {
        return weights.map((weight) => {
          return {
            [`.text-${size.replace('px', '')}-${weight}`]: {
              fontSize: size,
              lineHeight: lineHeight,
              fontWeight: weight.toString(),
            },
          };
        });
      });

      addUtilities(utilities);
    }),
  ],
};

export default config;
