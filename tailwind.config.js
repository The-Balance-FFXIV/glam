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
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
