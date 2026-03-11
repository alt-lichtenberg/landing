import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://www.kiezblock-alt-lichtenberg.de',
  base: '/',
  output: 'static',
  vite: {
    plugins: [tailwindcss()],
  },
});
