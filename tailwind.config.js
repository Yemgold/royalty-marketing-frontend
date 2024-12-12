/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        '3xl': '1600px',
        mg: '1276px',
        slg: '1212px',
        nlg: '1205px',
        mlg: '1000px',
        cng: '1130px',
        cpg: '1070px',
        clg: '1025px',
        mmg: '900px',
        lmg: '650px',
        smm: '590px',
        mng: '641px',
        smn: '500px',
      },
      colors: {
        primary: '#5cafa9',
        secondary: '#fef7f0',
        col1: '#000000',
        col2: '#ffffff',
        col3: '#d5d3d3',
      },
    },
  },
  plugins: [],
};
