module.exports = {
  purge: ['layouts/**/*.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      'sans': ['Roboto', 'sans-serif'],
    },
    extend: {
      dropShadow: {
        '3xl': '0 100px 100px rgba(0, 0, 0, 0.75)',
      },
      colors: {
        'line-divide-color': '#2a3641',
        'link-orange': '#FF9900',
        'card-light': '#19191A',
        'card-dark': '#101111',
        'card-border-color' : '#3871c2',
        'card-header-text-color' : '#7b8794',
        'tank': '#3A7AD6',
        'healer': '#47C168',
        'dps': '#D84D4D',
      },
      zIndex: {
          '-1': '-1',
      },
      dropShadow: {
          'lg': '2px 2px 5px rgba(0, 0, 0, 0.5)'
      },
      fontSize: {
        'base': '0.9375rem',
      },
    },
  },
  variants: {
    extend: {
        translate: ['group-hover'],
    },
},
  plugins: [],
}
