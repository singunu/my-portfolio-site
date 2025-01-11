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
      backgroundImage: {
        'gradient': 'linear-gradient(135deg, var(--gradient-1) 0%, var(--gradient-2) 30%, var(--gradient-3) 70%, var(--gradient-4) 100%)',
      },
    },
  },
  plugins: [],
  // iOS 깜빡임 방지를 위한 추가 설정
  future: {
    hoverOnlyWhenSupported: true,
  },
}