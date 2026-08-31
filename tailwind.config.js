/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        theme: {
          bg: 'var(--color-background)',
          'bg-subtle': 'var(--color-background-subtle)',
          card: 'var(--surface-card)',
          'card-hover': 'var(--surface-card-hover)',
          sidebar: 'var(--surface-sidebar)',
          header: 'var(--surface-header)',
          input: 'var(--surface-input)',
          muted: 'var(--surface-muted)',
          nested: 'var(--surface-nested)',
          'nested-hover': 'var(--surface-nested-hover)',
          'level-1': 'var(--surface-level-1)',
          'level-2': 'var(--surface-level-2)',
          'level-3': 'var(--surface-level-3)',
          'level-3-hover': 'var(--surface-level-3-hover)',
          primary: 'var(--color-primary)',
          'primary-hover': 'var(--color-primary-hover)',
          'primary-soft': 'var(--color-primary-soft)',
          'primary-subtle': 'var(--color-primary-subtle)',
          'text-main': 'var(--text-primary)',
          'text-secondary': 'var(--text-secondary)',
          'text-tertiary': 'var(--text-tertiary)',
          'text-muted': 'var(--text-muted)',
          border: 'var(--border-default)',
          'border-subtle': 'var(--border-subtle)',
          'border-strong': 'var(--border-strong)',
        },
        brand: {
          50: '#f0fdf4',
          100: '#dcfce7',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
        },
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'xs': 'var(--shadow-sm)',
        'soft': 'var(--shadow-sm)',
        'elevated': 'var(--shadow-md)',
        'glow': '0 0 20px -5px var(--color-primary)',
      },
      borderRadius: {
        'xs': 'var(--radius-xs)',
        'sm': 'var(--radius-sm)',
        'md': 'var(--radius-md)',
        'lg': 'var(--radius-lg)',
        'xl': 'var(--radius-xl)',
        '2xl': 'var(--radius-2xl)',
      },
      transitionProperty: {
        'theme': 'background-color, border-color, color, fill, stroke',
      },
    },
  },
  plugins: [],
}
