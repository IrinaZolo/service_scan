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
      base: ['16px', '19px'],
      '2base': ['18px', '22px'],
      '3base': ['20px', '24px'],
      lg: ['22px', '27px'],
      '2lg': ['28px', '34px'],
      xl: ['30px', '36px'],
      '2xl': ['40px', '48px'],
    }
  },
  plugins: [],
}