import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        charcoal: {
          DEFAULT: '#1a1a1a',
          50: '#f5f5f5',
          100: '#e8e8e8',
          200: '#c4c4c4',
          300: '#9a9a9a',
          400: '#6b6b6b',
          500: '#4a4a4a',
          600: '#333333',
          700: '#262626',
          800: '#1a1a1a',
          900: '#121212',
        },
        accent: {
          DEFAULT: '#ff3b30',
          hover: '#e6352b',
          muted: 'rgba(255, 59, 48, 0.15)',
        },
        secondary: {
          DEFAULT: '#ff9500',
          hover: '#e68600',
          muted: 'rgba(255, 149, 0, 0.15)',
        },
        surface: {
          DEFAULT: '#222222',
          elevated: '#2a2a2a',
          border: 'rgba(255, 255, 255, 0.08)',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-inter-display)', 'var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        glow: '0 0 40px rgba(255, 59, 48, 0.25)',
        'glow-orange': '0 0 40px rgba(255, 149, 0, 0.25)',
        card: '0 8px 32px rgba(0, 0, 0, 0.4)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        shimmer: 'shimmer 2s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-overlay':
          'linear-gradient(180deg, rgba(18,18,18,0.4) 0%, rgba(26,26,26,0.85) 60%, #121212 100%)',
      },
      perspective: {
        '1000': '1000px',
      },
    },
  },
  plugins: [],
};

export default config;
