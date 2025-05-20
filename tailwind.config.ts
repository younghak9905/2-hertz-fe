import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        pretendard: ['var(--font-pretendard)'],
      },
      padding: {
        'safe-b': 'env(safe-area-inset-bottom)',
      },
      height: {
        'nav-safe': 'calc(3.5rem + env(safe-area-inset-bottom))',
      },
    },
  },
  plugins: [],
};

export default config;
