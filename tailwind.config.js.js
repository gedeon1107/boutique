/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Neutral ramp (OKLCH-inspired, even lightness steps)
        neutral: {
          950: '#0a0a0b',
          900: '#111113',
          800: '#1c1c1f',
          700: '#2a2a2e',
          600: '#3d3d42',
          500: '#5a5a62',
          400: '#7e7e88',
          300: '#a8a8b2',
          200: '#d0d0d8',
          100: '#ebebf0',
          50:  '#f7f7fa',
        },
        // Gold accent ramp
        gold: {
          950: '#2d2000',
          900: '#4a3500',
          800: '#6b4d00',
          700: '#8f6900',
          600: '#b38600',
          500: '#c9a84c',  // primary accent
          400: '#d9be7a',
          300: '#e8d4a6',
          200: '#f2e6cc',
          100: '#faf3e5',
        },
        // Burgundy for secondary accents / danger-adjacent
        burgundy: {
          900: '#2a0510',
          800: '#4a0e23',
          700: '#6b1535',
          600: '#8c1c45',
          500: '#a82355',
        },
        // Semantic tokens
        surface:      'var(--color-surface)',
        'surface-raised': 'var(--color-surface-raised)',
        border:       'var(--color-border)',
        'text-muted': 'var(--color-text-muted)',
        'text-body':  'var(--color-text-body)',
        accent:       'var(--color-accent)',
        'accent-hover': 'var(--color-accent-hover)',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'Georgia', 'serif'],
      },
      fontSize: {
        xs:   ['0.75rem',  { lineHeight: '1.6' }],
        sm:   ['0.875rem', { lineHeight: '1.6' }],
        base: ['1rem',     { lineHeight: '1.65' }],
        lg:   ['1.125rem', { lineHeight: '1.6' }],
        xl:   ['1.25rem',  { lineHeight: '1.5' }],
        '2xl':['1.5rem',   { lineHeight: '1.4' }],
        '3xl':['1.875rem', { lineHeight: '1.3' }],
        '4xl':['2.25rem',  { lineHeight: '1.2' }],
        '5xl':['3rem',     { lineHeight: '1.1' }],
        '6xl':['3.75rem',  { lineHeight: '1.05' }],
      },
      spacing: {
        // 4-unit base rhythm
        '0.5': '2px',
        '1':   '4px',
        '2':   '8px',
        '3':   '12px',
        '4':   '16px',
        '5':   '20px',
        '6':   '24px',
        '8':   '32px',
        '10':  '40px',
        '12':  '48px',
        '16':  '64px',
        '20':  '80px',
        '24':  '96px',
      },
      borderRadius: {
        sm: '4px',
        DEFAULT: '8px',
        lg: '12px',
        xl: '16px',
        '2xl': '24px',
        full: '9999px',
      },
      boxShadow: {
        sm:  '0 1px 2px 0 rgb(0 0 0 / 0.3), 0 0 0 1px rgb(255 255 255 / 0.04)',
        DEFAULT: '0 2px 8px 0 rgb(0 0 0 / 0.4), 0 0 0 1px rgb(255 255 255 / 0.06)',
        lg: '0 8px 24px 0 rgb(0 0 0 / 0.5), 0 0 0 1px rgb(255 255 255 / 0.08)',
        xl: '0 20px 48px 0 rgb(0 0 0 / 0.6)',
        gold: '0 0 0 2px #c9a84c',
      },
      maxWidth: {
        prose: '68ch',
        '8xl': '90rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.2s ease',
        'slide-up': 'slideUp 0.25s ease',
        'slide-in-right': 'slideInRight 0.25s ease',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          from: { opacity: '0', transform: 'translateX(24px)' },
          to:   { opacity: '1', transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
}
