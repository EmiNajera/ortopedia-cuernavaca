/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class', 'class'],
  content: [
    './src/**/*.{js,jsx,ts,tsx,mdx}',
    './pages/**/*.{js,jsx,ts,tsx,mdx}',
    './app/**/*.{js,jsx,ts,tsx,mdx}',
    './components/**/*.{js,jsx,ts,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'var(--font-inter)',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],
        poppins: [
          'var(--font-poppins)',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],
      },
      screens: {
        xs: '480px',
        '3xl': '1536px',
        '4xl': '1920px',
      },
      spacing: {
        18: '4.5rem',
        88: '22rem',
        128: '32rem',
        144: '36rem',
      },
      fontSize: {
        xs: [
          '0.75rem',
          {
            lineHeight: '1rem',
          },
        ],
        sm: [
          '0.875rem',
          {
            lineHeight: '1.25rem',
          },
        ],
        base: [
          '1rem',
          {
            lineHeight: '1.5rem',
          },
        ],
        lg: [
          '1.125rem',
          {
            lineHeight: '1.75rem',
          },
        ],
        xl: [
          '1.25rem',
          {
            lineHeight: '1.75rem',
          },
        ],
        '2xl': [
          '1.5rem',
          {
            lineHeight: '2rem',
          },
        ],
        '3xl': [
          '1.875rem',
          {
            lineHeight: '2.25rem',
          },
        ],
        '4xl': [
          '2.25rem',
          {
            lineHeight: '2.5rem',
          },
        ],
        '5xl': [
          '3rem',
          {
            lineHeight: '1',
          },
        ],
        '6xl': [
          '3.75rem',
          {
            lineHeight: '1',
          },
        ],
        '7xl': [
          '4.5rem',
          {
            lineHeight: '1',
          },
        ],
        '8xl': [
          '6rem',
          {
            lineHeight: '1',
          },
        ],
        '9xl': [
          '8rem',
          {
            lineHeight: '1',
          },
        ],
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        chart: {
          1: 'hsl(var(--chart-1))',
          2: 'hsl(var(--chart-2))',
          3: 'hsl(var(--chart-3))',
          4: 'hsl(var(--chart-4))',
          5: 'hsl(var(--chart-5))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'mobile-bounce': 'mobileBounce 0.6s ease-out',
        marquee: 'marquee var(--duration) linear infinite',
        'marquee-vertical': 'marquee-vertical var(--duration) linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': {
            opacity: '0',
          },
          '100%': {
            opacity: '1',
          },
        },
        slideUp: {
          '0%': {
            transform: 'translateY(10px)',
            opacity: '0',
          },
          '100%': {
            transform: 'translateY(0)',
            opacity: '1',
          },
        },
        scaleIn: {
          '0%': {
            transform: 'scale(0.9)',
            opacity: '0',
          },
          '100%': {
            transform: 'scale(1)',
            opacity: '1',
          },
        },
        mobileBounce: {
          '0%': {
            transform: 'translateY(20px)',
            opacity: '0',
          },
          '50%': {
            transform: 'translateY(-5px)',
            opacity: '0.8',
          },
          '100%': {
            transform: 'translateY(0)',
            opacity: '1',
          },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(calc(-100% - var(--gap)))' },
        },
        'marquee-vertical': {
          from: { transform: 'translateY(0)' },
          to: { transform: 'translateY(calc(-100% - var(--gap)))' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('tailwindcss-animate'),
  ],
};
