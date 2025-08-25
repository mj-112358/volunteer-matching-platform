/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'orange-25': '#fffbf5',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out infinite 2s',
        'float-slow': 'float 8s ease-in-out infinite',
        'spin-slow': 'spin 3s linear infinite',
        'program-1': 'fadeInUp 0.8s ease-out 0.2s forwards',
        'program-2': 'fadeInUp 0.8s ease-out 0.4s forwards',
        'program-3': 'fadeInUp 0.8s ease-out 0.6s forwards',
        'program-4': 'fadeInUp 0.8s ease-out 0.8s forwards',
        'volunteer-card': 'fadeInUp 0.8s ease-out 0.2s forwards',
        'donate-card': 'fadeInUp 0.8s ease-out 0.4s forwards',
        'in-trigger': 'fadeInUp 0.8s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};