/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50: 'var(--gold-50)',
          100: 'var(--gold-100)',
          200: 'var(--gold-200)',
          300: 'var(--gold-300)',
          400: 'var(--gold-400)',
          500: 'var(--gold-500)',
          600: 'var(--gold-600)',
          700: 'var(--gold-700)',
          800: 'var(--gold-800)',
          900: 'var(--gold-900)',
          950: 'var(--gold-950)',
        },
        dark: {
          50: 'var(--dark-50)',
          100: 'var(--dark-100)',
          200: 'var(--dark-200)',
          300: 'var(--dark-300)',
          400: 'var(--dark-400)',
          500: 'var(--dark-500)',
          600: 'var(--dark-600)',
          700: 'var(--dark-700)',
          800: 'var(--dark-800)',
          900: 'var(--dark-900)',
          950: 'var(--dark-950)',
        },
      },
      fontFamily: {
        display: ['Playfair Display', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-up': 'fadeUp 0.8s ease-out forwards',
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-in': 'slideIn 0.5s ease-out forwards',
        'slide-in-right': 'slideInRight 0.5s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s infinite linear',
        'scroll-reveal': 'scrollReveal 0.7s ease-out forwards',
        'scale-up': 'scaleUp 0.5s ease-out forwards',
        'marquee': 'marquee 30s linear infinite',
        'spin-slow': 'spin 8s linear infinite',
        'pulse-gold': 'pulseGold 2s ease-in-out infinite',
        'glow': 'glow 3s ease-in-out infinite alternate',
        'glow-strong': 'glowStrong 2s ease-in-out infinite alternate',
        'ken-burns': 'kenBurns 20s ease-in-out infinite alternate',
        'border-glow': 'borderGlow 3s ease-in-out infinite alternate',
        'reveal': 'reveal 0.7s ease-out forwards',
        'sparkle': 'sparkle 2s ease-in-out infinite',
        'gold-shine': 'goldShine 3s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        scrollReveal: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleUp: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        pulseGold: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(212, 175, 55, 0.5)' },
          '50%': { boxShadow: '0 0 0 20px rgba(212, 175, 55, 0)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(212, 175, 55, 0.15), 0 0 40px rgba(212, 175, 55, 0.08)' },
          '100%': { boxShadow: '0 0 40px rgba(212, 175, 55, 0.35), 0 0 80px rgba(212, 175, 55, 0.15)' },
        },
        glowStrong: {
          '0%': { boxShadow: '0 0 30px rgba(212, 175, 55, 0.25), 0 0 60px rgba(212, 175, 55, 0.12)' },
          '100%': { boxShadow: '0 0 60px rgba(212, 175, 55, 0.5), 0 0 120px rgba(212, 175, 55, 0.2)' },
        },
        kenBurns: {
          '0%': { transform: 'scale(1) translate(0, 0)' },
          '100%': { transform: 'scale(1.1) translate(-1%, -1%)' },
        },
        borderGlow: {
          '0%': { borderColor: 'rgba(212, 175, 55, 0.15)' },
          '100%': { borderColor: 'rgba(212, 175, 55, 0.5)' },
        },
        reveal: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        sparkle: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.2)' },
        },
        goldShine: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
