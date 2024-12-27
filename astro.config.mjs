// @ts-check
import { defineConfig } from 'astro/config';
import netlify from '@astrojs/netlify/functions';

import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],
  devToolbar: {
    enabled: false
  },
  output:'server',
  adapter: netlify({
    edgeMiddleware: true
  })
});