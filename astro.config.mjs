import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],
  adapter: cloudflare({
    imageService: 'compile'
  }),
  site: 'https://ideas-to-life.ai',
  vite: {
    ssr: {
      external: ['node:fs', 'node:path']
    }
  }
});
