module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        grayish: '#808189',
        'text-dark': '#010414',
        'error-red': '#CC1E1E',
        'border-gray': '#F6F6F7',
        'main-green': '#0FBA68',
        'main-blue': '#2029F3',
        'main-purple': '#2029F3',
        'main-yellow': '#EAD621',
        'light-green': '#ecf9f3',
        'light-gray': '#E6E6E7',
        'light-purple': '#edeeff',
        'light-yellow': '#fdfced',
      },
      backgroundImage: {
        'input-success': "url('assets/images/Success.svg')",
        'input-search': "url('assets/images/Search.svg')",
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
