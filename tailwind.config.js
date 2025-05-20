/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'royal-leaf-green': '#4A5A49',
        'herbal-cream': '#F8F6F2',
        'fresh-sage': '#8B9984',
        'sunbeam-yellow': '#F2E86D',
        'deep-charcoal': '#2E2E2E',
      },
      fontFamily: {
        heading: ['var(--font-playfair)'],
        body: ['var(--font-inter)'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
} 