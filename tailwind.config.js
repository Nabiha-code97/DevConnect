/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary:    'rgb(var(--color-primary)    / <alpha-value>)',
        accent:     'rgb(var(--color-accent)     / <alpha-value>)',
        background: 'rgb(var(--color-background) / <alpha-value>)',
        surface:    'rgb(var(--color-surface)    / <alpha-value>)',
        card:       'rgb(var(--color-card)       / <alpha-value>)',
        foreground: 'rgb(var(--color-foreground) / <alpha-value>)',
        muted:      'rgb(var(--color-muted)      / <alpha-value>)',
        border:     'rgb(var(--color-border)     / <alpha-value>)',
      },
      fontFamily: {
        sans: ['Syne', 'system-ui', 'sans-serif'],
        mono: ['"Space Mono"', 'Consolas', 'monospace'],
      },
    },
  },
  plugins: [],
}
