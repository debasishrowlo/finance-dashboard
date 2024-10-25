import type { Config } from 'tailwindcss'

const pxToRem = (px:number, base = 16) => {
  return px / base
}

const generateFontSize = () => {
  const min = 12
  const max = 100
  const fontSize:{
    [key:string]: string,
  } = {}

  for (let i = min; i <= max; i += 2) {
    fontSize[i] = pxToRem(i) + "rem"
  }

  return fontSize
}

const generateBorderRadius = () => {
  const max = 24
  const borderRadius:{
    [key:string]: string,
  } = {}

  for (let i = 0; i <= max; i += 2) {
    borderRadius[i] = pxToRem(i) + "rem"
  }
  borderRadius["full"] = "9999px"

  return borderRadius
}

const generateSpacing = () => {
  const max = 5000
  const spacing:{
    [key:string]: string,
  } = {}

  for (let i = 0; i <= max; i++) {
    spacing[i] = pxToRem(i) + "rem"
  }

  return spacing
}
    
const spacing = generateSpacing()
const lineHeight = spacing

export default {
  future: {
    hoverOnlyWhenSupported: true,
  },
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    borderRadius: generateBorderRadius(),
    fontSize: generateFontSize(),
    spacing,
    lineHeight,
    colors: {
      beige: {
        100: "#F8F4F0",
        500: "#98908B",
      },
      grey: {
        100: "#F2F2F2",
        300: "#B3B3B3",
        500: "#696868",
        900: "#201F24",
      },
      green: "#277C78",
      yellow: "#F2CDAC",
      cyan: "#82C9D7",
      navy: "#626070",
      red: "#C94736",
      purple: "#826CB0",
      white: "#FFFFFF",
      black: "#000000",
      transparent: "transparent",
    },
    extend: {
      fontFamily: {
        "sans": ['"Public Sans", sans-serif'],
      },
      transitionDuration: {
        DEFAULT: "300ms",
      },
    },
  },
  plugins: [],
} satisfies Config