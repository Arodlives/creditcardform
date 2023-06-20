/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  Media: false,
  theme: {
    extend: {
      colors: {
        'card-bg': 'rgba(255, 255, 255, 0.1)',
      },
      backdropFilter: {
        'none': 'none',
        'blur': 'blur(20px)',
      },
      borderRadius: {
        'xl': '1rem',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba( 31, 38, 135, 0.37 )',
      },
      borderWidth: {
        '1': '1px'
      },
      borderColor: {
        'card-border': 'rgba(255, 255, 255, 0.18)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('tailwindcss-filters'),

  ],
}
