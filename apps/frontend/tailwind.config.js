/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/**/*.html'],
  theme: {
    extend: {
      animation: {
        gradient: 'gradients 3s linear infinite',
      },
      keyframes: {
        gradients: {
          '0%, 100%': {
            'background-position': '0% 50%',
          },
          '50%': {
            'background-position': '100% 50%',
          },
        },
      },
      transitionDuration: {
        150: '150ms',
      },
      backgroundSize: {
        '400p': '400%'
      },
      boxShadow: {
        'dark-inset':
          'inset 0px 0px 16px rgba(255,255,255,0.05), inset 0px 2px 2px rgba(255,255,255,0.15)',
      },
      colors: {
        dark: '#1F2128',
        white: '#FFFFFF',
        concrete: '#F3F3F3',
        alabaster: '#F9F9F9',
        silver: '#C6C6C6',
        violet: '#AD00FF',
        'silver-chalice': '#AAA9A9',
        slate: {
          100: 'rgb(241 245 249)',
          400: 'rgb(148 163 184)',
          500: 'rgb(100 116 139)',
          700: '#334155',
        },
        'regent-gray': '#8793A6',
        turquoise: '#42E2B8',
        'cornflower-blue': '#7B61FF',
        'blue-chalk': '#E5DFFF',
        crimson: '#EF233C',
        'pig-pink': '#FCD3D8',
        'athens-gray': '#F0F3F5',
        'cod-gray': '#1B1B1B',
        mercury: '#E5E5E5',
        'mountain-m': '#24CD72',
        'granny-apple': '#DEF8EA',
        'aqua-haze': '#EFF2F6',
        ecstasy: '#F6851B',
        'catskill-white': '#E8EFF3',
        mystic: '#EAEEF2',
        'black-squeeze': '#F7FAFC',
        'curious-blue': '#2A8FD8',
        'dusty-gray': '#969696',
        'wild-sand': '#F4F4F4',
        'bright-sun': '#FCD139',
        porcelain: '#E6EAEC',
        iron: '#CFD5D9',
        casal: '#2B6B5A',
      },
      fontFamily: {
        heading: ['Montserrat', 'serif'],
        body: ['Space Grotesk', 'sans-serif'],
      },
      gridTemplateColumns: {
        sidebar: 'minmax(230px, 265px) auto',
        content: 'auto minmax(260px, 295px)',
      },
      spacing: {
        '50.0': '50%',
        37.5: '37.5%',
        '90.0': '90%',
        100: '100px',
        246: '246px',
        250: '250px',
        '256px': '265px',
        '300px': '300px',
        300: '300px',
        400: '400px',
        '56px': '56px',
        '250px': '250px',
        '220px': '220px',
        230: '230px',
        '24px': '24px',
      },
      minWidth: {
        12: '12px',
        220: '220px',
        230: '230px',
        250: '250px',
        500: '630px',
      },
      maxWidth: {
        12: '12px',
        500: '630px',
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['disabled'],
      textColor: ['disabled'],
      translate: ['active'],
      display: ['hover', 'group-hover'],
      opacity: ['hover', 'group-hover'],
      brightness: ['hover', 'group-hover'],
      transform: ['hover', 'active'],
    },
  },
  plugins: [],
};
