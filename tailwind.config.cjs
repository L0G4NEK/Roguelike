/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
      './index.html',
      './public/**/*.{html,js}',
      './src/**/*.{html,js}'
  ],
  theme: {
    extend: {
        backgroundImage: {
            'sword': "url('/src/assets/sword.png')",
            'armor': "url('/src/assets/Armor.png')",
            'ring': "url('/src/assets/Ring.png')",
            'bg':"url('/public/img/bg.png')"
        }
    },
  },
  plugins: [],
}