module.exports = {
  purge: ['layouts/**/*.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'line-divide-color': '#2a3641',
        'link-orange': '#ff9956',
        'card-background-color' : '#323f4b',
        'card-even-color' : '#2a3641',
        'card-border-color' : '#3871c2',
        'card-header-text-color' : '#7b8794',
        'dark-block-color' : '#1F2933'
      },
      zIndex: {
          '-1': '-1',
      },
      dropShadow: {
          'lg': '4px 4px 2px rgba(0, 0, 0, 0.2)'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
