/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./client/index.html",
    "./client/src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'afya-primary': '#1a365d',
        'afya-secondary': '#4a5568',
        'afya-light': '#f7fafc',
        primary: {
          DEFAULT: '#0066cc',
          foreground: '#ffffff',
        },
        secondary: {
          DEFAULT: '#f1f5f9',
          foreground: '#0f172a',
        },
      },
    },
  },
  plugins: [],
}
