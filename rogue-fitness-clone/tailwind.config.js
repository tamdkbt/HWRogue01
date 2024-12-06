const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      keyframes: {
        bannerSlide: {
          '0%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-100%)' },
          '50%': { transform: 'translateX(-200%)' },
          '75%': { transform: 'translateX(-300%)' },
          '100%': { transform: 'translateX(-400%)' }
        }
      },
      animation: {
        'bannerSlide': 'bannerSlide 15s steps(1) infinite'
      }
    }
  },
  darkMode: "class",
  plugins: [nextui()]
}
