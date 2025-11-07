
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#5946B2', // Plump Purple
        primaryDark: '#493b93',
        primaryLight: '#7b6bd1',
        ink: '#0f1115',
        graphite: '#1c1f26',
        slate: '#323644',
        ash: '#6b7280',
        fog: '#a1a1aa',
        cloud: '#e5e7eb',
        snow: '#f8fafc',
        accent: '#36B3A8', // supportive teal
        accent2: '#FFB703', // supportive warm accent
      },
      boxShadow: {
        soft: '0 8px 30px rgba(0,0,0,0.06)',
      },
      borderRadius: {
        xl: '0.9rem',
        '2xl': '1.2rem',
      },
    },
  },
  plugins: [],
}
export default config
