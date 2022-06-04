module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        grayish: '#808189',
        'error-red': '#CC1E1E',
        'main-green': '#0FBA68',
        'main-blue': '#2029F3',
        'text-dark': '#010414',
        'light-gray': '#E6E6E7',
        'border-gray': '#F6F6F7',
      },
      backgroundImage: {
        'input-success': "url('assets/images/Success.svg')",
      },
    },
    fontFamily: {
      Inter: ['Inter', 'sans-serif'],
    },
  },
  backgroundPosition: {
    'right-4': 'right 2rem',
  },
  plugins: [],
};
