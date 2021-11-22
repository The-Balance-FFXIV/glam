const plugin = require('tailwindcss/plugin');

module.exports = {
    purge: {
        enabled: true,
        content: ['layouts/**/*.html', "themes/glam/layouts/**/*.html"]
    },
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      'sans': ['Roboto', 'sans-serif'],
      'head': ['Kumbh Sans', 'sans-serif']
    },
    extend: {
      dropShadow: {
        'lg': '2px 2px 3px #000000',
        'lg-healers': '2px 2px 3px #256A1D',
        'lg-tanks': '2px 2px 3px #1D3D6A',
        'lg-melee': '2px 2px 3px #6A1D1D',
        'lg-ranged': '2px 2px 3px #6A1D1D',
        'lg-casters': '2px 2px 3px #6A1D1D',
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
        'table-light': "#29292c",
        'table-divider-color': "#414141",
        'tanks': '#3A7AD6',
        'healers': '#47C168',
        'melee': '#D84D4D',
        'ranged': '#D84D4D',
        'casters': '#D84D4D',
        'page': '#222528',
        'gray': {
            'light': '#C9C9C9',
        }
      },
      width: {
        '100': '25rem', 
        '104': '26rem',
        '108': '27rem',
        '112': '28rem',
        '116': '29rem',
        '120': '30rem',
      },
      height: {
        '68': '17rem',
        '84': '21rem',
        '88': '22rem',
        '100': '25rem', 
        '104': '26rem',
        '108': '27rem',
        '112': '28rem',
        '116': '29rem',
        '120': '30rem',
      },
      zIndex: {
          '-1': '-1',
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
