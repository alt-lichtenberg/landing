import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://alt-lichtenberg.github.io',
  base: '/landing/',
  output: 'static',
  vite: {
    plugins: [tailwindcss()],
  },
});
