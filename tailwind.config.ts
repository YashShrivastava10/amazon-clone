import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        white: "#FFFF",
        black: "#111111",
        lightBlue: "#F7FAFA",
        silver: "#D5D9D9",
        grey: "#767676",
        yellow: "#FFD814",
        red: "#cc0c39",
      },
      fontSize:{
        "11": "11px",
        "12": "12px",
        "13": "13px",
        "14": "14px",
        "17": "17px",
        "3xl": "28px"
      }
    },
  },
  plugins: [],
}
export default config
