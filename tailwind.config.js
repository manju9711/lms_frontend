module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        quicksand: ['Quicksand', 'sans-serif'],
      },
      keyframes: {
        floatX: {
          '0%, 100%': { transform: 'translateX(-50%)' },
          '50%': { transform: 'translateX(-47%)' }, // light float to right
        },
      },
      animation: {
        floatX: 'floatX 2s ease-in-out infinite',
      },

    },
  },
  plugins: [],
}
