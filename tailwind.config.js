const plugin = require('tailwindcss/plugin');

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
        'card-lighter': '#1E1E1F',
        'card-light': '#19191A',
        'card-dark': '#101111',
        'card-border-color' : '#3871c2',
        'card-header-text-color' : '#7b8794',
        'tank': '#3A7AD6',
        'healer': '#47C168',
        'dps': '#D84D4D',
        'page': '#222528',
        'gray': {
            'light': '#C9C9C9',
        }
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
  plugins: [
    // Card Plugin
    plugin(({ addUtilities, theme, e }) => {
        const colors = theme('colors');

        const cardUtilityBorderColor = Object.keys(colors).reduce((acc, key) => {
            if (typeof colors[key] === 'string') {
                return {
                    ...acc,
                    [`.card-${e(key)}`]: {
                        '--tw-border-color': colors[key],
                    },
                };
            }

            const variants = Object.keys(colors[key]);

            return {
                ...acc,
                ...variants.reduce((a, variant) => ({
                    ...a,
                    [`.overlay-${e(key)}-${variant}`]: {
                        '--tw-border-color': colors[key][variant],
                    },
                }), {}),
            };
        }, {});

        const cardUtilityBase = {
            background: theme('colors.card-light'),
            padding: '1.25rem 1.5rem',
            borderLeft: `8px solid var(--tw-border-color, ${theme('colors.gray.600')})`,
        };

        const cardUtilities = {
            ...cardUtilityBorderColor,
            '.card': cardUtilityBase,
        };

        addUtilities(cardUtilities);
    }),
  ],
}
