/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        manrope: ["Manrope", "sans-serif"] 
      },
      colors:{
        'button': '#64748b',
        'subtext': '',
        'background': '#020617',
        'light-bg': '#0B1326',
        'border-gray': '#545E71',
        'border-blue': '#60a5fa99',
        'sub-text': '#94A3B8',
        'main-text': '#f8fafc',
        'select-tab': '#1F263B',
        txt: {
          'main': '#f8fafc',
          'link': '#81AAFF',
          'sub': '#94A3B8',
        },
        appbg: {
          section : '#1F263B'
        },
        button : {
          'primary': '#81AAFF'
        }
      }
    },
  },
  plugins: [],
}

