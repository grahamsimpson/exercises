/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        'kitty-pink': '#FF69B4',
        'kitty-hot': '#FF1493',
        'kitty-light': '#FFB6C1',
        'kitty-pale': '#FFF0F5',
        'kitty-purple': '#DA70D6',
        'kitty-gold': '#FFD700',
      },
      animation: {
        wiggle: 'wiggle 0.5s ease-in-out',
        pop: 'pop 0.3s ease-out',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-5deg)' },
          '50%': { transform: 'rotate(5deg)' },
        },
        pop: {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
