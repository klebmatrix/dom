// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}', // Para a pasta app/ no Next.js 13+
    './pages/**/*.{js,ts,jsx,tsx,mdx}', // Para a pasta pages/ no Next.js
    './components/**/*.{js,ts,jsx,tsx,mdx}', // Se você tiver uma pasta components
    './src/**/*.{js,ts,jsx,tsx,mdx}', // Uma opção mais genérica para o src
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}