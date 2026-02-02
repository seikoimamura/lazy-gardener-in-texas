import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Warm earth tones inspired by cottage gardens
        sage: {
          50: '#f6f7f4',
          100: '#e3e7de',
          200: '#c8d1bf',
          300: '#a5b396',
          400: '#849574',
          500: '#687a58',
          600: '#516144',
          700: '#414d38',
          800: '#363f30',
          900: '#2f362a',
        },
        terracotta: {
          50: '#fdf6f3',
          100: '#fceae3',
          200: '#fad6c9',
          300: '#f5b8a3',
          400: '#ed8f70',
          500: '#e26d49',
          600: '#cf5330',
          700: '#ad4227',
          800: '#8f3925',
          900: '#773324',
        },
        cream: {
          50: '#fefdfb',
          100: '#fcf9f3',
          200: '#f9f2e5',
          300: '#f3e6ce',
          400: '#ebd5af',
          500: '#e0c08e',
          600: '#d1a46b',
          700: '#b98856',
          800: '#976e49',
          900: '#7b5b3e',
        },
        rose: {
          50: '#fdf4f5',
          100: '#fce8eb',
          200: '#f9d4da',
          300: '#f4afbb',
          400: '#ec8096',
          500: '#df5472',
          600: '#c9335a',
          700: '#a9264a',
          800: '#8d2343',
          900: '#79213d',
        },
      },
      fontFamily: {
        display: ['Georgia', 'Cambria', 'Times New Roman', 'serif'],
        body: ['Verdana', 'Geneva', 'Tahoma', 'sans-serif'],
      },
      backgroundImage: {
        'botanical-pattern': "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23687a58' fill-opacity='0.06'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
