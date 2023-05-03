module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      'xs': '475px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1234px',
      '2xl': '1440px',
    },
    fontSize: {
      sm: ['14px', '17px'],
      base: ['16px', '24px'],
      lg: ['20px', '24px'],
      xl: ['22px', '27px'],
      '2xl': ['24px', '32px'],
    }
  },
  plugins: [],
}