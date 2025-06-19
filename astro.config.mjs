import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import sharp from 'sharp';

// https://astro.build/config
export default defineConfig({
  site: 'https://quehayrich.github.io',
  base: process.env.NODE_ENV === 'production' ? '/hormonasyconducta-web/' : '',
  integrations: [tailwind(), react()],
  assets: {
    addSharpInstructions: true,
    services: [
      {
        name: 'sharp',
        constructor: sharp,
      },
    ],
  },
});