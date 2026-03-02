import type { Config } from 'tailwindcss'

export default {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        canvas: '#f6f6f6',
        ink: '#1b1f24',
        muted: '#6b7280',
        card: '#ffffff',
        line: 'rgba(17, 24, 39, 0.08)',
        primary: {
          DEFAULT: '#22c55e',
          soft: 'rgba(34, 197, 94, 0.14)'
        },
        brand: {
          teal: '#8ed1c7',
          sky: '#8fc7e6',
          lime: '#a7d68a',
          sun: '#f4c76a',
          orange: '#ee9b59',
          coral: '#df5f50'
        }
      },
      boxShadow: {
        card: '0 10px 30px rgba(17, 24, 39, 0.06)',
        soft: '0 6px 18px rgba(17, 24, 39, 0.06)'
      },
      borderRadius: {
        xl2: '14px'
      },
      backgroundImage: {
        'grain': "radial-gradient(circle at 1px 1px, rgba(0,0,0,0.04) 1px, transparent 0)",
        'brand-wash': "linear-gradient(135deg, rgba(143,199,230,0.22), rgba(167,214,138,0.16), rgba(244,199,106,0.18), rgba(238,155,89,0.14), rgba(223,95,80,0.12))"
      }
    },
  },
  plugins: [],
} satisfies Config
