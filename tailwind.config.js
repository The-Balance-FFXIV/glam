const plugin = require('tailwindcss/plugin');

module.exports = {
  purge: ['layouts/**/*.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      'kumbhsans': ['Kumbh Sans', 'sans-serif'],
      'sans': ['Roboto', 'sans-serif'],
      'head': ['Kumbh Sans', 'sans-serif']
    },
    extend: {
      dropShadow: {
        'lg': '2px 2px 3px #000000',
        'lg-healer': '2px 2px 3px #256A1D',
        'lg-tank': '2px 2px 3px #1D3D6A',
        'lg-dps': '2px 2px 3px #6A1D1D',
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
      height: {
        '100': '25rem', 
      },
      zIndex: {
          '-1': '-1',
      },
      fontSize: {
        'base': '0.9375rem',
        'content': "15px"
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
                    [`.card-${e(key)}-${variant}`]: {
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
